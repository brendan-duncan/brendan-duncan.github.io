/****************************************************************************
 *  Copyright (C) 2014 by Brendan Duncan.                                   *
 *                                                                          *
 *  This file is part of DartRay.                                           *
 *                                                                          *
 *  Licensed under the Apache License, Version 2.0 (the "License");         *
 *  you may not use this file except in compliance with the License.        *
 *  You may obtain a copy of the License at                                 *
 *                                                                          *
 *  http://www.apache.org/licenses/LICENSE-2.0                              *
 *                                                                          *
 *  Unless required by applicable law or agreed to in writing, software     *
 *  distributed under the License is distributed on an "AS IS" BASIS,       *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.*
 *  See the License for the specific language governing permissions and     *
 *  limitations under the License.                                          *
 *                                                                          *
 *   This project is based on PBRT v2 ; see http://www.pbrt.org             *
 *   pbrt2 source code Copyright(c) 1998-2010 Matt Pharr and Greg Humphreys.*
 ****************************************************************************/
part of core;

class FresnelBlend extends BxDF {
  FresnelBlend(Spectrum d, Spectrum s, this.distribution) :
    super(BSDF_REFLECTION | BSDF_GLOSSY),
    Rd = new Spectrum.from(d),
    Rs = new Spectrum.from(s);

  Spectrum f(Vector wo, Vector wi) {
    Spectrum diffuse = Rd * ((28.0 / (23.0 * Math.PI))) *
            (new Spectrum(1.0) - Rs) *
            ((1.0 - Math.pow(1.0 - 0.5 * Vector.AbsCosTheta(wi), 5)) *
             (1.0 - Math.pow(1.0 - 0.5 * Vector.AbsCosTheta(wo), 5)));

    Vector wh = wi + wo;
    if (wh.x == 0.0 && wh.y == 0.0 && wh.z == 0.0) {
      return new Spectrum(0.0);
    }

    wh = Vector.Normalize(wh);

    var a = new Spectrum(distribution.d(wh));
    var b = schlickFresnel(Vector.Dot(wi, wh));
    var c =  (4.0 * Vector.AbsDot(wi, wh) *
             Math.max(Vector.AbsCosTheta(wi), Vector.AbsCosTheta(wo)));

    Spectrum specular = a / b * c;

    return diffuse + specular;
  }

  Spectrum schlickFresnel(double costheta) {
    Spectrum one = new Spectrum(1.0);
    return Rs + (one - Rs) * (Math.pow(1.0 - costheta, 5.0));
  }

  Spectrum sample_f(Vector wi, Vector wo, double u1, double u2,
                    List<double> outPdf) {
    if (u1 < 0.5) {
      u1 = 2.0 * u1;
      // Cosine-sample the hemisphere, flipping the direction if necessary
      wi.copy(CosineSampleHemisphere(u1, u2));
      if (wo.z < 0.0) {
        wi.z *= -1.0;
      }
    } else {
      u1 = 2.0 * (u1 - 0.5);
      outPdf[0] = distribution.sample_f(wo, wi, u1, u2);
      if (!Vector.SameHemisphere(wo, wi)) {
        return new Spectrum(0.0);
      }
    }

    outPdf[0] = pdf(wo, wi);

    return f(wo, wi);
  }

  double pdf(Vector wi, Vector wo) {
    if (!Vector.SameHemisphere(wo, wi)) {
      return 0.0;
    }

    return 0.5 * (Vector.AbsCosTheta(wi) * INV_PI + distribution.pdf(wo, wi));
  }

  Spectrum Rd;
  Spectrum Rs;
  MicrofacetDistribution distribution;
}