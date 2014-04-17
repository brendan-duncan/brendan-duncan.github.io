part of lights;

class InfiniteAreaLight extends Light {
  static InfiniteAreaLight Create(Transform light2world, ParamSet paramSet) {
    Spectrum L = paramSet.findOneSpectrum('L', new Spectrum(1.0));
    Spectrum sc = paramSet.findOneSpectrum('scale', new Spectrum(1.0));
    String texmap = paramSet.findOneFilename('mapname', '');
    int nSamples = paramSet.findOneInt('nsamples', 1);
    //if (PbrtOptions.quickRender) nSamples = max(1, nSamples / 4);
    return new InfiniteAreaLight(light2world, L * sc, nSamples, texmap);
  }

  InfiniteAreaLight(Transform light2world, Spectrum L, int ns,
                    String texmap) :
    super(light2world, ns) {
    if (texmap.isNotEmpty) {
      Completer completer = new Completer();
      ResourceManager.RequestImage(texmap, completer.future)
        .then((SpectrumImage img) {
          SpectrumImage texels = new SpectrumImage.from(img);
          int width = texels.width;
          int height = texels.height;
          for (int i = 0; i < width * height; ++i) {
            texels[i] *= L.toRGB();
          }

          _setRadianceMap(texels);

          completer.complete();
        });
    }

    SpectrumImage texels = new SpectrumImage(1, 1);
    texels[0] = L.toRGB();
    _setRadianceMap(texels);
  }

  Spectrum power(Scene scene) {
    Point worldCenter = new Point();
    double worldRadius = scene.worldBound.boundingSphere(worldCenter);
    return new Spectrum.from(radianceMap.lookup(0.5, 0.5, 0.5),
                             Spectrum.SPECTRUM_ILLUMINANT) *
           (Math.PI * worldRadius * worldRadius);
  }

  bool isDeltaLight() {
    return false;
  }

  Spectrum Le(RayDifferential r) {
    Vector wh = Vector.Normalize(worldToLight.transformVector(r.direction));
    double s = Vector.SphericalPhi(wh) * INV_TWOPI;
    double t = Vector.SphericalTheta(wh) * INV_PI;
    return new Spectrum.from(radianceMap.lookup(s, t),
                             Spectrum.SPECTRUM_ILLUMINANT);
  }

  Spectrum sampleLAtPoint(Point p, double pEpsilon, LightSample ls,
      double time, Vector wi, List<double> pdf, VisibilityTester visibility) {
    Stats.INFINITE_LIGHT_STARTED_SAMPLE();
    // Find $(u,v)$ sample coordinates in infinite light texture
    List<double> uv = [0.0, 0.0];
    List<double> mapPdf = [0.0];

    distribution.sampleContinuous(ls.uPos[0], ls.uPos[1], uv, mapPdf);
    if (mapPdf[0] == 0.0) {
      return new Spectrum(0.0);
    }

    // Convert infinite light sample point to direction
    double theta = uv[1] * Math.PI;
    double phi = uv[0] * 2.0 * Math.PI;
    double costheta = Math.cos(theta);
    double sintheta = Math.sin(theta);
    double sinphi = Math.sin(phi);
    double cosphi = Math.cos(phi);
    wi.copy(lightToWorld.transformVector(new Vector(sintheta * cosphi,
                                                    sintheta * sinphi,
                                                    costheta)));

    // Compute PDF for sampled infinite light direction
    if (sintheta == 0.0) {
      pdf[0] = 0.0;
    } else {
      pdf[0] = mapPdf[0] / (2.0 * Math.PI * Math.PI * sintheta);
    }

    // Return radiance value for infinite light direction
    visibility.setRay(p, pEpsilon, wi, time);

    Spectrum Ls = new Spectrum.from(radianceMap.lookup(uv[0], uv[1]),
                                    Spectrum.SPECTRUM_ILLUMINANT);

    Stats.INFINITE_LIGHT_FINISHED_SAMPLE();
    return Ls;
  }

  Spectrum sampleL(Scene scene, LightSample ls, double u1, double u2,
                    double time, Ray ray, Normal Ns, List<double> pdf) {
    Stats.INFINITE_LIGHT_STARTED_SAMPLE();
    // Compute direction for infinite light sample ray

    // Find $(u,v)$ sample coordinates in infinite light texture
    List<double> uv = [0.0, 0.0];
    List<double> mapPdf = [0.0];

    distribution.sampleContinuous(ls.uPos[0], ls.uPos[1], uv, mapPdf);
    if (mapPdf[0] == 0.0) {
      return new Spectrum(0.0);
    }

    double theta = uv[1] * Math.PI;
    double phi = uv[0] * 2.0 * Math.PI;
    double costheta = Math.cos(theta);
    double sintheta = Math.sin(theta);
    double sinphi = Math.sin(phi);
    double cosphi = Math.cos(phi);
    Vector d = -lightToWorld.transformVector(new Vector(sintheta * cosphi,
                                                        sintheta * sinphi,
                                                        costheta));
    Ns.copy(d);

    // Compute origin for infinite light sample ray
    Point worldCenter = new Point();
    double worldRadius = scene.worldBound.boundingSphere(worldCenter);
    Vector v1 = new Vector();
    Vector v2 = new Vector();
    Vector.CoordinateSystem(-d, v1, v2);
    List<double> d1 = [0.0];
    List<double> d2 = [0.0];
    ConcentricSampleDisk(u1, u2, d1, d2);
    Point Pdisk = worldCenter + (v1 * d1[0] + v2 * d2[0]) * worldRadius;
    ray.set(Pdisk + -d * worldRadius, d, 0.0, INFINITY, time);

    // Compute _InfiniteAreaLight_ ray PDF
    if (sintheta == 0.0) {
      pdf[0] = 0.0;
    } else {
      double directionPdf = mapPdf[0] / (2.0 * Math.PI * Math.PI * sintheta);
      double areaPdf = 1.0 / (Math.PI * worldRadius * worldRadius);
      pdf[0] = directionPdf * areaPdf;
    }

    Spectrum Ls = new Spectrum.from(radianceMap.lookup(uv[0], uv[1]),
                                    Spectrum.SPECTRUM_ILLUMINANT);

    Stats.INFINITE_LIGHT_FINISHED_SAMPLE();
    return Ls;
  }

  double pdf(Point p, Vector w) {
    Stats.INFINITE_LIGHT_STARTED_PDF();
    Vector wi = worldToLight.transformVector(w);
    double theta = Vector.SphericalTheta(wi);
    double phi = Vector.SphericalPhi(wi);
    double sintheta = Math.sin(theta);
    if (sintheta == 0.0) {
      return 0.0;
    }

    double p = distribution.pdf(phi * INV_TWOPI, theta * INV_PI) /
           (2.0 * Math.PI * Math.PI * sintheta);

    Stats.INFINITE_LIGHT_FINISHED_PDF();
    return p;
  }

  void shProject(Point p, double pEpsilon, int lmax, Scene scene,
                 bool computeLightVis, double time, RNG rng,
                 List<Spectrum> coeffs) {
    // Project _InfiniteAreaLight_ to SH using Monte Carlo if visibility needed
    if (computeLightVis) {
      super.shProject(p, pEpsilon, lmax, scene, computeLightVis,
                      time, rng, coeffs);
      return;
    }

    for (int i = 0; i < SphericalHarmonics.Terms(lmax); ++i) {
      coeffs[i] = new Spectrum(0.0);
    }

    int ntheta = radianceMap.height;
    int nphi = radianceMap.width;

    if (Math.min(ntheta, nphi) > 50) {
      // Project _InfiniteAreaLight_ to SH from lat-long representation

      // Precompute $\theta$ and $\phi$ values for lat-long map projection
      Float32List buf = new Float32List(2 * ntheta + 2 * nphi);
      int bufp = 0;
      int sintheta = bufp;
      bufp += ntheta;
      int costheta = bufp;
      bufp += ntheta;
      int sinphi = bufp;
      bufp += nphi;
      int cosphi = bufp;


      for (int theta = 0; theta < ntheta; ++theta) {
        buf[sintheta + theta] = Math.sin((theta + 0.5) / ntheta * Math.PI);
        buf[costheta + theta] = Math.cos((theta + 0.5) / ntheta * Math.PI);
      }

      for (int phi = 0; phi < nphi; ++phi) {
        buf[sinphi + phi] = Math.sin((phi + 0.5) / nphi * 2.0 * Math.PI);
        buf[cosphi + phi] = Math.cos((phi + 0.5) / nphi * 2.0 * Math.PI);
      }

      Float32List Ylm = new Float32List(SphericalHarmonics.Terms(lmax));

      for (int theta = 0; theta < ntheta; ++theta) {
        for (int phi = 0; phi < nphi; ++phi) {
          // Add _InfiniteAreaLight_ texel's contribution to SH coefficients
          Vector w = new Vector(buf[sintheta + theta] * buf[cosphi + phi],
                                buf[sintheta + theta] * buf[sinphi + phi],
                                buf[costheta + theta]);
          w = Vector.Normalize(lightToWorld.transformVector(w));
          Spectrum Le = new Spectrum.from(radianceMap.texel(0, phi, theta),
                                          Spectrum.SPECTRUM_ILLUMINANT);
          SphericalHarmonics.Evaluate(w, lmax, Ylm);
          for (int i = 0; i < SphericalHarmonics.Terms(lmax); ++i) {
            coeffs[i] += Le * Ylm[i] * buf[sintheta + theta] *
                         (Math.PI / ntheta) * (2.0 * Math.PI / nphi);
          }
        }
      }
    } else {
      // Project _InfiniteAreaLight_ to SH from cube map sampling
      SphericalHarmonics.ProjectCube(new _InfiniteAreaCube(this, scene, time,
                                                           computeLightVis,
                                                           pEpsilon),
                                     p, 200, lmax, coeffs);
    }
  }

  void _setRadianceMap(SpectrumImage texels) {
    int width = texels.width;
    int height = texels.height;
    radianceMap = new MIPMap.texture(texels);

    // Initialize sampling PDFs for infinite area light

    // Compute scalar-valued image _img_ from environment map
    double filter = 1.0 / Math.max(width, height);
    Float32List img = new Float32List(width * height);

    for (int v = 0; v < height; ++v) {
      int vw = v * width;
      double vp = v / height;
      double sinTheta = Math.sin(Math.PI * (v + 0.5) / height);
      for (int u = 0; u < width; ++u) {
        double up = u / width;
        img[u + vw] = radianceMap.lookup(up, vp, filter).y;
        img[u + vw] *= sinTheta;
      }
    }

    // Compute sampling distributions for rows and columns of image
    distribution = new Distribution2D(img, width, height);
  }

  MIPMap radianceMap;
  Distribution2D distribution;
}


class _InfiniteAreaCube {
  _InfiniteAreaCube(this.light, this.scene,
                    this.time, this.computeVis, this.pEpsilon);

  Spectrum call(Point p, Vector w) {
    Ray ray = new Ray(p, w, pEpsilon, INFINITY, time);
    if (!computeVis || !scene.intersectP(ray)) {
      return light.Le(new RayDifferential.fromRay(ray));
    }
    return new Spectrum(0.0);
  }

  InfiniteAreaLight light;
  Scene scene;
  double time;
  double pEpsilon;
  bool computeVis;
}