(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
return y.__proto__&&y.__proto__.p===z.prototype.p}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$iso=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isU)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="o"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="static"){processStatics(init.statics[b1]=b2.static,b3)
delete b2.static}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.kd"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.kd"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.kd(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.eW=function(){}
var dart=[["","",,H,{
"^":"",
AF:{
"^":"o;a"}}],["","",,J,{
"^":"",
O:function(a){return void 0},
hi:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
he:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.kg==null){H.xP()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.l(new P.eI("Return interceptor for "+H.m(y(a,z))))}w=H.y3(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.jv
else return C.jw}return w},
U:{
"^":"o;",
B:function(a,b){return a===b},
gb2:function(a){return H.ck(a)},
K:["lI",function(a){return H.fz(a)}],
"%":"MediaError|MediaKeyError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|SVGAnimatedTransformList"},
qp:{
"^":"U;",
K:function(a){return String(a)},
gb2:function(a){return a?519018:218159},
$isaj:1},
ll:{
"^":"U;",
B:function(a,b){return null==b},
K:function(a){return"null"},
gb2:function(a){return 0}},
ln:{
"^":"U;",
gb2:function(a){return 0},
$isqq:1},
ry:{
"^":"ln;"},
fP:{
"^":"ln;",
K:function(a){return String(a)}},
en:{
"^":"U;",
hW:function(a,b){if(!!a.immutable$list)throw H.l(new P.ae(b))},
dW:function(a,b){if(!!a.fixed$length)throw H.l(new P.ae(b))},
H:function(a,b){this.dW(a,"add")
a.push(b)},
cs:function(a,b){this.dW(a,"removeAt")
if(b>=a.length)throw H.l(P.ez(b,null,null))
return a.splice(b,1)[0]},
bU:function(a,b,c){this.dW(a,"insert")
throw H.l(H.Y(b))},
pd:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.l(new P.bg(a))}v=z.length
if(v===y)return
this.sn(a,v)
for(x=0;x<z.length;++x)this.k(a,x,z[x])},
kc:function(a,b){var z,y
this.dW(a,"addAll")
for(z=b.length,y=0;y<z;++y)a.push(b[y])},
b1:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.l(new P.bg(a))}},
e6:function(a,b){return H.p(new H.iu(a,b),[null,null])},
bO:function(a,b){return H.fK(a,b,null,H.aV(a,0))},
bh:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
b5:function(a,b,c){if(b==null)H.T(H.Y(b))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.l(H.Y(b))
if(b<0||b>a.length)throw H.l(P.aA(b,0,a.length,null,null))
if(c==null)c=a.length
else{if(typeof c!=="number"||Math.floor(c)!==c)throw H.l(H.Y(c))
if(c<b||c>a.length)throw H.l(P.aA(c,b,a.length,null,null))}if(b===c)return H.p([],[H.aV(a,0)])
return H.p(a.slice(b,c),[H.aV(a,0)])},
gat:function(a){if(a.length>0)return a[0]
throw H.l(H.ce())},
gcQ:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.l(H.ce())},
aH:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
this.hW(a,"set range")
P.cJ(b,c,a.length,null,null,null)
z=J.h(c,b)
y=J.O(z)
if(y.B(z,0))return
if(J.K(e,0))H.T(P.aA(e,0,null,"skipCount",null))
x=J.O(d)
if(!!x.$isE){w=e
v=d}else{v=x.bO(d,e).d_(0,!1)
w=0}x=J.w(w)
u=J.D(v)
if(J.F(x.j(w,z),u.gn(v)))throw H.l(H.li())
if(x.U(w,b))for(t=y.l(z,1),y=J.w(b);s=J.y(t),s.av(t,0);t=s.l(t,1)){r=u.h(v,x.j(w,t))
a[y.j(b,t)]=r}else{if(typeof z!=="number")return H.b(z)
y=J.w(b)
t=0
for(;t<z;++t){r=u.h(v,x.j(w,t))
a[y.j(b,t)]=r}}},
cC:function(a,b,c,d){return this.aH(a,b,c,d,0)},
aF:function(a,b,c,d){var z,y
this.hW(a,"fill range")
P.cJ(b,c,a.length,null,null,null)
for(z=b;y=J.y(z),y.U(z,c);z=y.j(z,1))a[z]=d},
iN:function(a,b){this.hW(a,"sort")
H.eD(a,0,a.length-1,b)},
f0:function(a,b,c){var z
c=a.length-1
for(z=c;z>=0;--z){if(z>=a.length)return H.a(a,z)
if(J.i(a[z],b))return z}return-1},
f_:function(a,b){return this.f0(a,b,null)},
cJ:function(a,b){var z
for(z=0;z<a.length;++z)if(J.i(a[z],b))return!0
return!1},
ga6:function(a){return a.length===0},
gbd:function(a){return a.length!==0},
K:function(a){return P.fj(a,"[","]")},
gax:function(a){return new J.dw(a,a.length,0,null)},
gb2:function(a){return H.ck(a)},
gn:function(a){return a.length},
sn:function(a,b){this.dW(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.l(P.ea(b,"newLength",null))
if(b<0)throw H.l(P.aA(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.l(H.aU(a,b))
if(b>=a.length||b<0)throw H.l(H.aU(a,b))
return a[b]},
k:function(a,b,c){if(!!a.immutable$list)H.T(new P.ae("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.l(H.aU(a,b))
if(b>=a.length||b<0)throw H.l(H.aU(a,b))
a[b]=c},
E:function(a){return this.gn(a).$0()},
$iscC:1,
$isE:1,
$asE:null,
$isab:1,
static:{qo:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a||a<0)throw H.l(P.aD("Length must be a non-negative integer: "+H.m(a)))
z=H.p(new Array(a),[b])
z.fixed$length=Array
return z}}},
AE:{
"^":"en;"},
dw:{
"^":"o;a,b,c,d",
gas:function(){return this.d},
a9:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.l(new P.bg(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
eo:{
"^":"U;",
cm:function(a,b){var z
if(typeof b!=="number")throw H.l(H.Y(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gfQ(b)
if(this.gfQ(a)===z)return 0
if(this.gfQ(a))return-1
return 1}return 0}else if(isNaN(a)){if(this.gfP(b))return 0
return 1}else return-1},
gfQ:function(a){return a===0?1/a<0:a<0},
gfP:function(a){return isNaN(a)},
iv:function(a,b){return a%b},
aW:function(a){return Math.abs(a)},
I:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.l(new P.ae(""+a))},
pF:function(a){return this.I(Math.ceil(a))},
X:function(a){return this.I(Math.floor(a))},
bF:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.l(new P.ae(""+a))},
v:function(a,b,c){if(typeof b!=="number")throw H.l(H.Y(b))
if(typeof c!=="number")throw H.l(H.Y(c))
if(this.cm(b,c)>0)throw H.l(H.Y(b))
if(this.cm(a,b)<0)return b
if(this.cm(a,c)>0)return c
return a},
dw:function(a){return a},
f9:function(a,b){var z,y,x,w
H.wO(b)
if(b<2||b>36)throw H.l(P.aA(b,2,36,"radix",null))
z=a.toString(b)
if(C.i.bS(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.T(new P.ae("Unexpected toString result: "+z))
x=J.D(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.i.i("0",w)},
K:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gb2:function(a){return a&0x1FFFFFFF},
a2:function(a){return-a},
j:function(a,b){if(typeof b!=="number")throw H.l(H.Y(b))
return a+b},
l:function(a,b){if(typeof b!=="number")throw H.l(H.Y(b))
return a-b},
w:function(a,b){if(typeof b!=="number")throw H.l(H.Y(b))
return a/b},
i:function(a,b){if(typeof b!=="number")throw H.l(H.Y(b))
return a*b},
R:function(a,b){var z
if(typeof b!=="number")throw H.l(H.Y(b))
z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
ar:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else{if(typeof b!=="number")H.T(H.Y(b))
return this.I(a/b)}},
al:function(a,b){return(a|0)===a?a/b|0:this.I(a/b)},
u:function(a,b){if(typeof b!=="number")throw H.l(H.Y(b))
if(b<0)throw H.l(H.Y(b))
return b>31?0:a<<b>>>0},
W:function(a,b){return b>31?0:a<<b>>>0},
D:function(a,b){var z
if(typeof b!=="number")throw H.l(H.Y(b))
if(b<0)throw H.l(H.Y(b))
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
p:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
by:function(a,b){if(b<0)throw H.l(H.Y(b))
return b>31?0:a>>>b},
c5:function(a,b){return b>31?0:a>>>b},
T:function(a,b){if(typeof b!=="number")throw H.l(H.Y(b))
return(a&b)>>>0},
h8:function(a,b){if(typeof b!=="number")throw H.l(H.Y(b))
return(a|b)>>>0},
U:function(a,b){if(typeof b!=="number")throw H.l(H.Y(b))
return a<b},
a0:function(a,b){if(typeof b!=="number")throw H.l(H.Y(b))
return a>b},
ab:function(a,b){if(typeof b!=="number")throw H.l(H.Y(b))
return a<=b},
av:function(a,b){if(typeof b!=="number")throw H.l(H.Y(b))
return a>=b},
$isds:1},
lk:{
"^":"eo;",
$isa3:1,
$isds:1,
$isx:1},
lj:{
"^":"eo;",
$isa3:1,
$isds:1},
ep:{
"^":"U;",
bS:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.l(H.aU(a,b))
if(b<0)throw H.l(H.aU(a,b))
if(b>=a.length)throw H.l(H.aU(a,b))
return a.charCodeAt(b)},
j:function(a,b){if(typeof b!=="string")throw H.l(P.ea(b,null,null))
return a+b},
c9:function(a,b){var z,y
H.kc(b)
z=b.length
y=a.length
if(z>y)return!1
return b===this.ev(a,y-z)},
iP:function(a,b){return a.split(b)},
hb:function(a,b,c){var z
if(typeof b!=="number"||Math.floor(b)!==b)H.T(H.Y(b))
if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.T(H.Y(c))
z=J.y(b)
if(z.U(b,0))throw H.l(P.ez(b,null,null))
if(z.a0(b,c))throw H.l(P.ez(b,null,null))
if(J.F(c,a.length))throw H.l(P.ez(c,null,null))
return a.substring(b,c)},
ev:function(a,b){return this.hb(a,b,null)},
r8:function(a){return a.toLowerCase()},
ld:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.bS(z,0)===133){x=J.qr(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.bS(z,w)===133?J.qs(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
i:function(a,b){var z,y
if(typeof b!=="number")return H.b(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.l(C.aD)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
gko:function(a){return new H.ec(a)},
f0:function(a,b,c){var z,y
c=a.length
z=b.length
y=a.length
if(c+z>y)c=y-z
return a.lastIndexOf(b,c)},
f_:function(a,b){return this.f0(a,b,null)},
pM:function(a,b,c){if(c>a.length)throw H.l(P.aA(c,0,a.length,null,null))
return H.yF(a,b,c)},
ga6:function(a){return a.length===0},
gbd:function(a){return a.length!==0},
cm:function(a,b){var z
if(typeof b!=="string")throw H.l(H.Y(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
K:function(a){return a},
gb2:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gn:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.l(H.aU(a,b))
if(b>=a.length||b<0)throw H.l(H.aU(a,b))
return a[b]},
E:function(a){return this.gn(a).$0()},
$iscC:1,
$isaZ:1,
static:{lm:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 6158:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},qr:function(a,b){var z,y
for(z=a.length;b<z;){y=C.i.bS(a,b)
if(y!==32&&y!==13&&!J.lm(y))break;++b}return b},qs:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.i.bS(a,z)
if(y!==32&&y!==13&&!J.lm(y))break}return b}}}}],["","",,H,{
"^":"",
eU:function(a,b){var z=a.eR(b)
if(!init.globalState.d.cy)init.globalState.f.aU()
return z},
hh:function(){--init.globalState.f.b},
nI:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.O(y).$isE)throw H.l(P.aD("Arguments to main must be a List: "+H.m(y)))
y=new H.vQ(0,0,1,null,null,null,null,null,null,null,null,null,a)
y.op()
y.f=new H.vp(P.iq(null,H.dY),0)
y.z=P.cE(null,null,null,P.x,H.h7)
y.ch=P.cE(null,null,null,P.x,null)
if(y.x===!0){y.Q=new H.vP()
y.oq()}init.globalState=y
if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.cE(null,null,null,P.x,H.cK)
w=P.cf(null,null,null,P.x)
v=new H.cK(0,null,!1)
u=new H.h7(y,x,w,init.createNewIsolate(),v,new H.cb(H.e6()),new H.cb(H.e6()),!1,!1,[],P.cf(null,null,null,null),null,null,!1,!0,P.cf(null,null,null,null))
w.H(0,0)
u.ez(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.eX()
x=H.dq(y,[y]).dd(a)
if(x)u.eR(new H.yD(z,a))
else{y=H.dq(y,[y,y]).dd(a)
if(y)u.eR(new H.yE(z,a))
else u.eR(a)}init.globalState.f.aU()},
qd:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.qe()
return},
qe:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.l(new P.ae("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.l(new P.ae("Cannot extract URI from \""+H.m(z)+"\""))},
lf:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.h3(!0,[]).dk(b.data)
y=J.D(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:H.le(x)
v=y.h(z,"args")
u=new H.h3(!0,[]).dk(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.h3(!0,[]).dk(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.cE(null,null,null,P.x,H.cK)
p=P.cf(null,null,null,P.x)
o=new H.cK(0,null,!1)
n=new H.h7(y,q,p,init.createNewIsolate(),o,new H.cb(H.e6()),new H.cb(H.e6()),!1,!1,[],P.cf(null,null,null,null),null,null,!1,!0,P.cf(null,null,null,null))
p.H(0,0)
n.ez(0,o)
init.globalState.f.a.c3(new H.dY(n,new H.q9(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aU()
break
case"spawn-worker":if($.qf!=null)H.qg(z)
break
case"message":if(y.h(z,"port")!=null)J.bf(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.aU()
break
case"close":init.globalState.ch.cX(0,$.$get$ic().h(0,a))
a.terminate()
init.globalState.f.aU()
break
case"log":H.q8(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.av(["command","print","msg",z])
q=new H.bV(!0,P.bP(null,P.x)).be(q)
y.toString
self.postMessage(q)}else P.hj(y.h(z,"msg"))
break
case"error":throw H.l(y.h(z,"msg"))}},
qg:function(a){var z,y
z=J.D(a)
y=z.h(a,"replyPort")
H.qj(z.h(a,"functionName"),z.h(a,"uri"),z.h(a,"args"),z.h(a,"msg"),!1,z.h(a,"isSpawnUri"),z.h(a,"startPaused")).ec(new H.qh(y),new H.qi(y))},
q8:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.av(["command","log","msg",a])
x=new H.bV(!0,P.bP(null,P.x)).be(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.ap(w)
z=H.b4(w)
throw H.l(P.ee(z))}},
le:function(a){return init.globalFunctions[a]()},
qj:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t
if(b!=null&&J.bX(b,".dart"))b=J.c(b,".js")
z=$.fD
$.fD=z+1
y=new H.cK(z,null,!1)
x=init.globalState.d
x.ez(z,y)
x.eK()
w=new H.m3(y,null)
w.iX(y)
v=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
w.gat(w).ai(new H.qk(v))
u=new H.dZ(y,init.globalState.d.a)
if(init.globalState.y===!0&&!e){if(c!=null)c=P.aE(c,!0,P.aZ)
if(init.globalState.x===!0){z=init.globalState.Q
y=P.av(["command","spawn-worker","functionName",a,"args",c,"msg",d,"uri",b,"isSpawnUri",f,"startPaused",g,"replyPort",u])
y=new H.bV(!0,P.bP(null,P.x)).be(y)
z.toString
self.postMessage(y)}else{if(b==null)b=$.$get$ib()
t=new Worker(b)
t.onerror=function(h,i,j){return function(k){return h(k,i,j)}}(H.qm,b,new H.ql(v))
t.onmessage=function(h,i){return function(j){j.onerror=null
return h(i,j)}}(H.lf,t)
z=init.globalState.c++
$.$get$ic().k(0,t,z)
init.globalState.ch.k(0,z,t)
z=P.av(["command","start","id",z,"replyTo",new H.bV(!0,P.bP(null,P.x)).be(u),"args",c,"msg",new H.bV(!0,P.bP(null,P.x)).be(d),"isSpawnUri",f,"startPaused",g,"functionName",a])
t.postMessage(new H.bV(!0,P.bP(null,P.x)).be(z))}}else H.qb(a,b,c,d,f,g,u)
return v.a},
qb:function(a,b,c,d,e,f,g){var z,y,x,w,v,u
z={}
z.a=c
z.b=d
if(b!=null)throw H.l(new P.ae("Currently spawnUri is not supported without web workers."))
z.b=H.nk(d)
if(c!=null)z.a=P.aE(c,!0,P.aZ)
y=init.globalState.f
x=init.globalState.a++
w=P.cE(null,null,null,P.x,H.cK)
v=P.cf(null,null,null,P.x)
u=new H.cK(0,null,!1)
w=new H.h7(x,w,v,init.createNewIsolate(),u,new H.cb(H.e6()),new H.cb(H.e6()),!1,!1,[],P.cf(null,null,null,null),null,null,!1,!0,P.cf(null,null,null,null))
v.H(0,0)
w.ez(0,u)
y.a.c3(new H.dY(w,new H.qc(z,a,e,f,g),"nonworker start"))},
lg:function(a,b,c,d,e,f){var z,y,x
z=init.globalState.d
y=z.a
$.lP=$.lP+("_"+y)
$.lQ=$.lQ+("_"+y)
y=z.e.glr()
x=z.f
J.bf(f,["spawned",y,x,z.r])
y=new H.qa(a,b,c,d,z)
if(e===!0){z.ke(x,x)
init.globalState.f.a.c3(new H.dY(z,y,"start isolate"))}else y.$0()},
qm:function(a,b,c){var z
a.preventDefault()
z=a.message
c.$1(z==null?"Error spawning worker for "+H.m(b):"Error spawning worker for "+H.m(b)+" ("+z+")")
return!0},
nk:function(a){return new H.h3(!0,[]).dk(new H.bV(!1,P.bP(null,P.x)).be(a))},
yD:{
"^":"z:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
yE:{
"^":"z:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
vQ:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
op:function(){var z,y,x
z=self.window==null
y=self.Worker
x=z&&!!self.postMessage
this.x=x
if(!x)y=y!=null&&$.$get$ib()!=null
else y=!0
this.y=y
this.r=z&&!x},
oq:function(){self.onmessage=function(a,b){return function(c){a(b,c)}}(H.lf,this.Q)
self.dartPrint=self.dartPrint||function(a){return function(b){if(self.console&&self.console.log)self.console.log(b)
else self.postMessage(a(b))}}(H.vR)},
static:{vR:function(a){var z=P.av(["command","print","msg",a])
return new H.bV(!0,P.bP(null,P.x)).be(z)}}},
h7:{
"^":"o;a,b,c,qy:d<,pN:e<,f,r,qo:x?,qx:y<,pX:z<,Q,ch,cx,cy,db,dx",
ke:function(a,b){if(!this.f.B(0,a))return
if(this.Q.H(0,b)&&!this.y)this.y=!0
this.eK()},
qU:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.cX(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.a(z,0)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.a(v,w)
v[w]=x
if(w===y.c)y.jy();++y.d}this.y=!1}this.eK()},
pt:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.O(a),y=0;x=this.ch,y<x.length;y+=2)if(z.B(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.a(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
qT:function(a){var z,y,x
if(this.ch==null)return
for(z=J.O(a),y=0;x=this.ch,y<x.length;y+=2)if(z.B(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.T(new P.ae("removeRange"))
P.cJ(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
lz:function(a,b){if(!this.r.B(0,a))return
this.db=b},
qf:function(a,b,c){var z=J.O(b)
if(!z.B(b,0))z=z.B(b,1)&&!this.cy
else z=!0
if(z){J.bf(a,c)
return}z=this.cx
if(z==null){z=P.iq(null,null)
this.cx=z}z.c3(new H.vH(a,c))},
qd:function(a,b){var z
if(!this.r.B(0,a))return
z=J.O(b)
if(!z.B(b,0))z=z.B(b,1)&&!this.cy
else z=!0
if(z){this.ij()
return}z=this.cx
if(z==null){z=P.iq(null,null)
this.cx=z}z.c3(this.gqz())},
qg:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.hj(a)
if(b!=null)P.hj(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.ct(a)
y[1]=b==null?null:J.ct(b)
for(x=new P.lq(z,z.r,null,null),x.c=z.e;x.a9();)J.bf(x.d,y)},
eR:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.ap(u)
w=t
v=H.b4(u)
this.qg(w,v)
if(this.db===!0){this.ij()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gqy()
if(this.cx!=null)for(;t=this.cx,!t.ga6(t);)this.cx.l3().$0()}return y},
qc:function(a){var z=J.D(a)
switch(z.h(a,0)){case"pause":this.ke(z.h(a,1),z.h(a,2))
break
case"resume":this.qU(z.h(a,1))
break
case"add-ondone":this.pt(z.h(a,1),z.h(a,2))
break
case"remove-ondone":this.qT(z.h(a,1))
break
case"set-errors-fatal":this.lz(z.h(a,1),z.h(a,2))
break
case"ping":this.qf(z.h(a,1),z.h(a,2),z.h(a,3))
break
case"kill":this.qd(z.h(a,1),z.h(a,2))
break
case"getErrors":this.dx.H(0,z.h(a,1))
break
case"stopErrors":this.dx.cX(0,z.h(a,1))
break}},
ik:function(a){return this.b.h(0,a)},
ez:function(a,b){var z=this.b
if(z.O(a))throw H.l(P.ee("Registry: ports must be registered only once."))
z.k(0,a,b)},
eK:function(){var z=this.b
if(z.gn(z)-this.c.a>0||this.y||!this.x)init.globalState.z.k(0,this.a,this)
else this.ij()},
ij:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.di(0)
for(z=this.b,y=z.gbK(z),y=y.gax(y);y.a9();)y.gas().nd()
z.di(0)
this.c.di(0)
init.globalState.z.cX(0,this.a)
this.dx.di(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.a(z,v)
J.bf(w,z[v])}this.ch=null}},"$0","gqz",0,0,3]},
vH:{
"^":"z:3;a,b",
$0:function(){J.bf(this.a,this.b)}},
vp:{
"^":"o;a,b",
pY:function(){var z=this.a
if(z.b===z.c)return
return z.l3()},
la:function(){var z,y,x
z=this.pY()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.O(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.ga6(y)}else y=!1
else y=!1
else y=!1
if(y)H.T(P.ee("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.ga6(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.av(["command","close"])
x=new H.bV(!0,P.bP(null,P.x)).be(x)
y.toString
self.postMessage(x)}return!1}z.qP()
return!0},
jY:function(){if(self.window!=null)new H.vq(this).$0()
else for(;this.la(););},
aU:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.jY()
else try{this.jY()}catch(x){w=H.ap(x)
z=w
y=H.b4(x)
w=init.globalState.Q
v=P.av(["command","error","msg",H.m(z)+"\n"+H.m(y)])
v=new H.bV(!0,P.bP(null,P.x)).be(v)
w.toString
self.postMessage(v)}}},
vq:{
"^":"z:3;a",
$0:function(){if(!this.a.la())return
P.uw(C.a1,this)}},
dY:{
"^":"o;a,b,c",
qP:function(){if(this.a.gqx()){this.a.gpX().push(this)
return}this.a.eR(this.b)}},
vP:{
"^":"o;"},
q9:{
"^":"z:1;a,b,c,d,e,f",
$0:function(){H.lg(this.a,this.b,this.c,this.d,this.e,this.f)}},
qh:{
"^":"z:0;a",
$1:function(a){J.bf(this.a,a)}},
qi:{
"^":"z:11;a",
$1:function(a){J.bf(this.a,["spawn failed",a])}},
qk:{
"^":"z:0;a",
$1:function(a){var z,y
z=J.D(a)
y=this.a
if(J.i(z.h(a,0),"spawned"))y.aB(0,a)
else y.c8(z.h(a,1))}},
ql:{
"^":"z:11;a",
$1:function(a){return this.a.c8(a)}},
qc:{
"^":"z:1;a,b,c,d,e",
$0:function(){var z=this.a
H.lg(H.le(this.b),z.a,z.b,this.c,this.d,this.e)}},
qa:{
"^":"z:3;a,b,c,d,e",
$0:function(){var z,y,x
this.e.sqo(!0)
if(this.d!==!0)this.a.$1(this.c)
else{z=this.a
y=H.eX()
x=H.dq(y,[y,y]).dd(z)
if(x)z.$2(this.b,this.c)
else{y=H.dq(y,[y]).dd(z)
if(y)z.$1(this.b)
else z.$0()}}}},
mU:{
"^":"o;"},
dZ:{
"^":"mU;b,a",
fk:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gjC())return
x=H.nk(b)
if(J.i(z.gpN(),y)){z.qc(x)
return}y=init.globalState.f
w="receive "+H.m(b)
y.a.c3(new H.dY(z,new H.vT(this,x),w))},
B:function(a,b){if(b==null)return!1
return b instanceof H.dZ&&J.i(this.b,b.b)},
gb2:function(a){return this.b.ghE()}},
vT:{
"^":"z:1;a,b",
$0:function(){var z=this.a.b
if(!z.gjC())z.nc(this.b)}},
k4:{
"^":"mU;b,c,a",
fk:function(a,b){var z,y,x
z=P.av(["command","message","port",this,"msg",b])
y=new H.bV(!0,P.bP(null,P.x)).be(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
B:function(a,b){if(b==null)return!1
return b instanceof H.k4&&J.i(this.b,b.b)&&J.i(this.a,b.a)&&J.i(this.c,b.c)},
gb2:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.u()
y=this.a
if(typeof y!=="number")return y.u()
x=this.c
if(typeof x!=="number")return H.b(x)
return(z<<16^y<<8^x)>>>0}},
cK:{
"^":"o;hE:a<,b,jC:c<",
nd:function(){this.c=!0
this.b=null},
dX:function(a){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.cX(0,y)
z.c.cX(0,y)
z.eK()},
nc:function(a){if(this.c)return
this.nY(a)},
glr:function(){return new H.dZ(this,init.globalState.d.a)},
nY:function(a){return this.b.$1(a)},
$ist0:1},
m3:{
"^":"bu;a,b",
bi:function(a,b,c,d){var z=this.b
z.toString
return H.p(new P.jT(z),[H.aV(z,0)]).bi(a,b,c,d)},
fR:function(a,b,c){return this.bi(a,null,b,c)},
dX:[function(a){this.a.dX(0)
this.b.dX(0)},"$0","gpH",0,0,3],
iX:function(a){var z=P.u_(this.gpH(this),null,null,null,!0,null)
this.b=z
this.a.b=z.gpq(z)},
$asbu:I.eW},
us:{
"^":"o;a,b,c",
mV:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.c3(new H.dY(y,new H.uu(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.e5(new H.uv(this,b),0),a)}else throw H.l(new P.ae("Timer greater than 0."))},
static:{ut:function(a,b){var z=new H.us(!0,!1,null)
z.mV(a,b)
return z}}},
uu:{
"^":"z:3;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
uv:{
"^":"z:3;a,b",
$0:function(){this.a.c=null
H.hh()
this.b.$0()}},
cb:{
"^":"o;hE:a<",
gb2:function(a){var z=this.a
if(typeof z!=="number")return z.D()
z=C.b.p(z,0)^C.b.al(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
B:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.cb){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bV:{
"^":"o;a,b",
be:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.k(0,a,z.gn(z))
z=J.O(a)
if(!!z.$isiD)return["buffer",a]
if(!!z.$isfs)return["typed",a]
if(!!z.$iscC)return this.lv(a)
if(!!z.$isq3){x=this.gls()
w=a.gcP()
w=H.fn(w,x,H.aR(w,"b1",0),null)
w=P.aE(w,!0,H.aR(w,"b1",0))
z=z.gbK(a)
z=H.fn(z,x,H.aR(z,"b1",0),null)
return["map",w,P.aE(z,!0,H.aR(z,"b1",0))]}if(!!z.$isqq)return this.lw(a)
if(!!z.$isU)this.lg(a)
if(!!z.$ist0)this.fd(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isdZ)return this.lx(a)
if(!!z.$isk4)return this.ly(a)
if(!!z.$isz){v=a.$name
if(v==null)this.fd(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$iscb)return["capability",a.a]
if(!(a instanceof P.o))this.lg(a)
return["dart",init.classIdExtractor(a),this.lu(init.classFieldsExtractor(a))]},"$1","gls",2,0,0],
fd:function(a,b){throw H.l(new P.ae(H.m(b==null?"Can't transmit:":b)+" "+H.m(a)))},
lg:function(a){return this.fd(a,null)},
lv:function(a){var z=this.lt(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.fd(a,"Can't serialize indexable: ")},
lt:function(a){var z,y,x
z=[]
C.c.sn(z,a.length)
for(y=0;y<a.length;++y){x=this.be(a[y])
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
lu:function(a){var z
for(z=0;z<a.length;++z)C.c.k(a,z,this.be(a[z]))
return a},
lw:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.fd(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sn(y,z.length)
for(x=0;x<z.length;++x){w=this.be(a[z[x]])
if(x>=y.length)return H.a(y,x)
y[x]=w}return["js-object",z,y]},
ly:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
lx:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.ghE()]
return["raw sendport",a]}},
h3:{
"^":"o;a,b",
dk:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.l(P.aD("Bad serialized message: "+H.m(a)))
switch(C.c.gat(a)){case"ref":if(1>=a.length)return H.a(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.a(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=this.eP(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=this.eP(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return this.eP(x)
case"const":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=this.eP(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.q0(a)
case"sendport":return this.q1(a)
case"raw sendport":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.q_(a)
case"function":if(1>=a.length)return H.a(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.a(a,1)
return new H.cb(a[1])
case"dart":y=a.length
if(1>=y)return H.a(a,1)
w=a[1]
if(2>=y)return H.a(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.eP(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.l("couldn't deserialize: "+H.m(a))}},"$1","gpZ",2,0,0],
eP:function(a){var z,y,x
z=J.D(a)
y=0
while(!0){x=z.gn(a)
if(typeof x!=="number")return H.b(x)
if(!(y<x))break
z.k(a,y,this.dk(z.h(a,y)));++y}return a},
q0:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w=P.a5()
this.b.push(w)
y=J.nX(y,this.gpZ()).cu(0)
for(z=J.D(y),v=J.D(x),u=0;u<z.gn(y);++u){if(u>=y.length)return H.a(y,u)
w.k(0,y[u],this.dk(v.h(x,u)))}return w},
q1:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
if(3>=z)return H.a(a,3)
w=a[3]
if(J.i(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.ik(w)
if(u==null)return
t=new H.dZ(u,x)}else t=new H.k4(y,w,x)
this.b.push(t)
return t},
q_:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.D(y)
v=J.D(x)
u=0
while(!0){t=z.gn(y)
if(typeof t!=="number")return H.b(t)
if(!(u<t))break
w[z.h(y,u)]=this.dk(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
oy:function(){throw H.l(new P.ae("Cannot modify unmodifiable Map"))},
x3:function(a){return init.types[a]},
nB:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.O(a).$isd7},
m:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.ct(a)
if(typeof z!=="string")throw H.l(H.Y(a))
return z},
ck:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
iT:function(a,b){throw H.l(new P.l2(a,null,null))},
lS:function(a,b,c){var z,y,x,w,v,u
H.kc(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.iT(a,c)
if(3>=z.length)return H.a(z,3)
y=z[3]
if(b==null){if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.iT(a,c)}if(b<2||b>36)throw H.l(P.aA(b,2,36,"radix",null))
if(b===10&&y!=null)return parseInt(a,10)
if(b<10||y==null){x=b<=10?47+b:86+b
w=z[1]
for(v=w.length,u=0;u<v;++u)if((C.i.bS(w,u)|32)>x)return H.iT(a,c)}return parseInt(a,b)},
lO:function(a,b){throw H.l(new P.l2("Invalid double",a,null))},
c2:function(a,b){var z,y
H.kc(a)
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return H.lO(a,b)
z=parseFloat(a)
if(isNaN(z)){y=J.o3(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return H.lO(a,b)}return z},
lR:function(a){var z,y
z=C.a3(J.O(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.i.bS(z,0)===36)z=C.i.ev(z,1)
return(z+H.nC(H.hf(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
fz:function(a){return"Instance of '"+H.lR(a)+"'"},
Bu:[function(){return Date.now()},"$0","wv",0,0,53],
bQ:function(){var z,y
if($.bs!=null)return
$.bs=1000
$.dM=H.wv()
if(typeof window=="undefined")return
z=window
if(z==null)return
y=z.performance
if(y==null)return
if(typeof y.now!="function")return
$.bs=1e6
$.dM=new H.rD(y)},
lN:function(a){var z,y,x,w,v
z=a.length
if(z<=500)return String.fromCharCode.apply(null,a)
for(y="",x=0;x<z;x=w){w=x+500
v=w<z?w:z
y+=String.fromCharCode.apply(null,a.slice(x,v))}return y},
rE:function(a){var z,y,x,w
z=[]
z.$builtinTypeInfo=[P.x]
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.aw)(a),++x){w=a[x]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.l(H.Y(w))
if(w<=65535)z.push(w)
else if(w<=1114111){z.push(55296+(C.a.p(w-65536,10)&1023))
z.push(56320+(w&1023))}else throw H.l(H.Y(w))}return H.lN(z)},
lT:function(a){var z,y,x,w
for(z=a.length,y=0;x=a.length,y<x;x===z||(0,H.aw)(a),++y){w=a[y]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.l(H.Y(w))
if(w<0)throw H.l(H.Y(w))
if(w>65535)return H.rE(a)}return H.lN(a)},
rF:function(a,b,c){var z,y,x,w,v
z=J.y(c)
if(z.ab(c,500)&&b===0&&z.B(c,a.length))return String.fromCharCode.apply(null,a)
if(typeof c!=="number")return H.b(c)
y=b
x=""
for(;y<c;y=w){w=y+500
if(w<c)v=w
else v=c
x+=String.fromCharCode.apply(null,a.subarray(y,v))}return x},
cl:function(a){var z
if(typeof a!=="number")return H.b(a)
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.b.p(z,10))>>>0,(56320|z&1023)>>>0)}}throw H.l(P.aA(a,0,1114111,null,null))},
br:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
fy:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.l(H.Y(a))
return a[b]},
iU:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.l(H.Y(a))
a[b]=c},
b:function(a){throw H.l(H.Y(a))},
a:function(a,b){if(a==null)J.a0(a)
throw H.l(H.aU(a,b))},
aU:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.cv(!0,b,"index",null)
z=J.a0(a)
if(!(b<0)){if(typeof z!=="number")return H.b(z)
y=b>=z}else y=!0
if(y)return P.d6(b,a,"index",null,z)
return P.ez(b,"index",null)},
Y:function(a){return new P.cv(!0,a,null,null)},
v:function(a){if(typeof a!=="number")throw H.l(H.Y(a))
return a},
wO:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.l(H.Y(a))
return a},
kc:function(a){if(typeof a!=="string")throw H.l(H.Y(a))
return a},
l:function(a){var z
if(a==null)a=new P.iG()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.nK})
z.name=""}else z.toString=H.nK
return z},
nK:function(){return J.ct(this.dartException)},
T:function(a){throw H.l(a)},
aw:function(a){throw H.l(new P.bg(a))},
ap:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.zc(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.a.p(x,16)&8191)===10)switch(w){case 438:return z.$1(H.ih(H.m(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.m(y)+" (Error "+w+")"
return z.$1(new H.lH(v,null))}}if(a instanceof TypeError){u=$.$get$mv()
t=$.$get$mw()
s=$.$get$mx()
r=$.$get$my()
q=$.$get$mC()
p=$.$get$mD()
o=$.$get$mA()
$.$get$mz()
n=$.$get$mF()
m=$.$get$mE()
l=u.cb(y)
if(l!=null)return z.$1(H.ih(y,l))
else{l=t.cb(y)
if(l!=null){l.method="call"
return z.$1(H.ih(y,l))}else{l=s.cb(y)
if(l==null){l=r.cb(y)
if(l==null){l=q.cb(y)
if(l==null){l=p.cb(y)
if(l==null){l=o.cb(y)
if(l==null){l=r.cb(y)
if(l==null){l=n.cb(y)
if(l==null){l=m.cb(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.lH(y,l==null?null:l.method))}}return z.$1(new H.uD(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.mm()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.cv(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.mm()
return a},
b4:function(a){var z
if(a==null)return new H.nc(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.nc(a,null)},
yj:function(a){if(a==null||typeof a!='object')return J.aS(a)
else return H.ck(a)},
ny:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.k(0,a[y],a[x])}return b},
xR:function(a,b,c,d,e,f,g){var z=J.O(c)
if(z.B(c,0))return H.eU(b,new H.xS(a))
else if(z.B(c,1))return H.eU(b,new H.xT(a,d))
else if(z.B(c,2))return H.eU(b,new H.xU(a,d,e))
else if(z.B(c,3))return H.eU(b,new H.xV(a,d,e,f))
else if(z.B(c,4))return H.eU(b,new H.xW(a,d,e,f,g))
else throw H.l(P.ee("Unsupported number of arguments for wrapped closure"))},
e5:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.xR)
a.$identity=z
return z},
ow:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.O(c).$isE){z.$reflectionInfo=c
x=H.t4(z).r}else x=c
w=d?Object.create(new H.tW().constructor.prototype):Object.create(new H.ht(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.bZ
$.bZ=J.c(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.kH(a,z,t)
s.$reflectionInfo=c}else{w.$name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.x3(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.kD:H.hu
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.l("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.kH(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
ot:function(a,b,c,d){var z=H.hu
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
kH:function(a,b,c){var z,y,x,w,v,u
if(c)return H.ov(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ot(y,!w,z,b)
if(y===0){w=$.dy
if(w==null){w=H.f5("self")
$.dy=w}w="return function(){return this."+H.m(w)+"."+H.m(z)+"();"
v=$.bZ
$.bZ=J.c(v,1)
return new Function(w+H.m(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.dy
if(v==null){v=H.f5("self")
$.dy=v}v=w+H.m(v)+"."+H.m(z)+"("+u+");"
w=$.bZ
$.bZ=J.c(w,1)
return new Function(v+H.m(w)+"}")()},
ou:function(a,b,c,d){var z,y
z=H.hu
y=H.kD
switch(b?-1:a){case 0:throw H.l(new H.tp("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
ov:function(a,b){var z,y,x,w,v,u,t,s
z=H.ok()
y=$.kC
if(y==null){y=H.f5("receiver")
$.kC=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.ou(w,!u,x,b)
if(w===1){y="return function(){return this."+H.m(z)+"."+H.m(x)+"(this."+H.m(y)+");"
u=$.bZ
$.bZ=J.c(u,1)
return new Function(y+H.m(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.m(z)+"."+H.m(x)+"(this."+H.m(y)+", "+s+");"
u=$.bZ
$.bZ=J.c(u,1)
return new Function(y+H.m(u)+"}")()},
kd:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.O(c).$isE){c.fixed$length=Array
z=c}else z=c
return H.ow(a,b,z,!!d,e,f)},
zb:function(a){throw H.l(new P.oB("Cyclic initialization for static "+H.m(a)))},
dq:function(a,b,c){return new H.tq(a,b,c,null)},
eX:function(){return C.aC},
e6:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
p:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
hf:function(a){if(a==null)return
return a.$builtinTypeInfo},
nz:function(a,b){return H.kl(a["$as"+H.m(b)],H.hf(a))},
aR:function(a,b,c){var z=H.nz(a,b)
return z==null?null:z[c]},
aV:function(a,b){var z=H.hf(a)
return z==null?null:z[b]},
kk:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.nC(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.a.K(a)
else return},
nC:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.jn("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.m(H.kk(u,c))}return w?"":"<"+H.m(z)+">"},
kl:function(a,b){if(typeof a=="function"){a=H.kh(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.kh(a,null,b)}return b},
c7:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.hf(a)
y=J.O(a)
if(y[b]==null)return!1
return H.ns(H.kl(y[d],z),c)},
ns:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.bD(a[y],b[y]))return!1
return!0},
eV:function(a,b,c){return H.kh(a,b,H.nz(b,c))},
bD:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.nA(a,b)
if('func' in a)return b.builtin$cls==="ph"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.kk(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.m(H.kk(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.ns(H.kl(v,z),x)},
nr:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.bD(z,v)||H.bD(v,z)))return!1}return!0},
wF:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.bD(v,u)||H.bD(u,v)))return!1}return!0},
nA:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.bD(z,y)||H.bD(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.nr(x,w,!1))return!1
if(!H.nr(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.bD(o,n)||H.bD(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.bD(o,n)||H.bD(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.bD(o,n)||H.bD(n,o)))return!1}}return H.wF(a.named,b.named)},
kh:function(a,b,c){return a.apply(b,c)},
Dg:function(a){var z=$.ke
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
Dd:function(a){return H.ck(a)},
Dc:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
y3:function(a){var z,y,x,w,v,u
z=$.ke.$1(a)
y=$.hd[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.hg[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.nq.$2(a,z)
if(z!=null){y=$.hd[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.hg[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.ki(x)
$.hd[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.hg[z]=x
return x}if(v==="-"){u=H.ki(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.nE(a,x)
if(v==="*")throw H.l(new P.eI(z))
if(init.leafTags[z]===true){u=H.ki(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.nE(a,x)},
nE:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.hi(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
ki:function(a){return J.hi(a,!1,null,!!a.$isd7)},
y4:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.hi(z,!1,null,!!z.$isd7)
else return J.hi(z,c,null,null)},
xP:function(){if(!0===$.kg)return
$.kg=!0
H.xQ()},
xQ:function(){var z,y,x,w,v,u,t,s
$.hd=Object.create(null)
$.hg=Object.create(null)
H.xL()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.nG.$1(v)
if(u!=null){t=H.y4(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
xL:function(){var z,y,x,w,v,u,t
z=C.aF()
z=H.dp(C.aG,H.dp(C.aH,H.dp(C.a2,H.dp(C.a2,H.dp(C.aJ,H.dp(C.aI,H.dp(C.aK(C.a3),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.ke=new H.xM(v)
$.nq=new H.xN(u)
$.nG=new H.xO(t)},
dp:function(a,b){return a(b)||b},
yF:function(a,b,c){return a.indexOf(b,c)>=0},
kI:{
"^":"o;",
ga6:function(a){return J.i(this.gn(this),0)},
gbd:function(a){return!J.i(this.gn(this),0)},
K:function(a){return P.iv(this)},
k:function(a,b,c){return H.oy()},
$iset:1},
oz:{
"^":"kI;n:a>,b,c",
O:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
h:function(a,b){if(!this.O(b))return
return this.jo(b)},
jo:function(a){return this.b[a]},
b1:function(a,b){var z,y,x
z=this.c
for(y=0;y<z.length;++y){x=z[y]
b.$2(x,this.jo(x))}},
gcP:function(){return H.p(new H.vi(this),[H.aV(this,0)])},
E:function(a){return this.a.$0()}},
vi:{
"^":"b1;a",
gax:function(a){return J.cs(this.a.c)},
gn:function(a){return J.a0(this.a.c)},
E:function(a){return this.gn(this).$0()}},
pq:{
"^":"kI;a",
eE:function(){var z=this.$map
if(z==null){z=new H.er(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.ny(this.a,z)
this.$map=z}return z},
O:function(a){return this.eE().O(a)},
h:function(a,b){return this.eE().h(0,b)},
b1:function(a,b){this.eE().b1(0,b)},
gcP:function(){return this.eE().gcP()},
gn:function(a){var z=this.eE()
return z.gn(z)},
E:function(a){return this.gn(this).$0()}},
t3:{
"^":"o;a,A:b>,c,d,e,f,r,x",
static:{t4:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.t3(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
rD:{
"^":"z:1;a",
$0:function(){return C.b.I(Math.floor(1000*this.a.now()))}},
uB:{
"^":"o;a,b,c,d,e,f",
cb:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
static:{c5:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.uB(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},fO:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},mB:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
lH:{
"^":"b9;a,b",
K:function(a){var z=this.b
if(z==null)return"NullError: "+H.m(this.a)
return"NullError: method not found: '"+H.m(z)+"' on null"}},
qz:{
"^":"b9;a,b,c",
K:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.m(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.m(z)+"' ("+H.m(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.m(z)+"' on '"+H.m(y)+"' ("+H.m(this.a)+")"},
static:{ih:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.qz(a,y,z?null:b.receiver)}}},
uD:{
"^":"b9;a",
K:function(a){var z=this.a
return C.i.ga6(z)?"Error":"Error: "+z}},
zc:{
"^":"z:0;a",
$1:function(a){if(!!J.O(a).$isb9)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
nc:{
"^":"o;a,b",
K:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
xS:{
"^":"z:1;a",
$0:function(){return this.a.$0()}},
xT:{
"^":"z:1;a,b",
$0:function(){return this.a.$1(this.b)}},
xU:{
"^":"z:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
xV:{
"^":"z:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
xW:{
"^":"z:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
z:{
"^":"o;",
K:function(a){return"Closure '"+H.lR(this)+"'"},
glm:function(){return this},
glm:function(){return this}},
mq:{
"^":"z;"},
tW:{
"^":"mq;",
K:function(a){var z=this.$name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
ht:{
"^":"mq;a,b,c,d",
B:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.ht))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gb2:function(a){var z,y
z=this.c
if(z==null)y=H.ck(this.a)
else y=typeof z!=="object"?J.aS(z):H.ck(z)
z=H.ck(this.b)
if(typeof y!=="number")return y.lO()
return(y^z)>>>0},
K:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.m(this.d)+"' of "+H.fz(z)},
static:{hu:function(a){return a.a},kD:function(a){return a.c},ok:function(){var z=$.dy
if(z==null){z=H.f5("self")
$.dy=z}return z},f5:function(a){var z,y,x,w,v
z=new H.ht("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
tp:{
"^":"b9;a",
K:function(a){return"RuntimeError: "+this.a}},
m7:{
"^":"o;"},
tq:{
"^":"m7;a,b,c,d",
dd:function(a){var z=this.nM(a)
return z==null?!1:H.nA(z,this.ee())},
nM:function(a){var z=J.O(a)
return"$signature" in z?z.$signature():null},
ee:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.O(y)
if(!!x.$isCJ)z.void=true
else if(!x.$iskR)z.ret=y.ee()
y=this.b
if(y!=null&&y.length!==0)z.args=H.m6(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.m6(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.nx(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].ee()}z.named=w}return z},
K:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.m(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.m(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.nx(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.m(z[s].ee())+" "+s}x+="}"}}return x+(") -> "+H.m(this.a))},
static:{m6:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].ee())
return z}}},
kR:{
"^":"m7;",
K:function(a){return"dynamic"},
ee:function(){return}},
er:{
"^":"o;a,b,c,d,e,f,r",
gn:function(a){return this.a},
ga6:function(a){return this.a===0},
gbd:function(a){return!this.ga6(this)},
gcP:function(){return H.p(new H.qH(this),[H.aV(this,0)])},
gbK:function(a){return H.fn(this.gcP(),new H.qy(this),H.aV(this,0),H.aV(this,1))},
O:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.ja(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.ja(y,a)}else return this.qp(a)},
qp:function(a){var z=this.d
if(z==null)return!1
return this.eY(this.ci(z,this.eX(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.ci(z,b)
return y==null?null:y.gdn()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.ci(x,b)
return y==null?null:y.gdn()}else return this.qq(b)},
qq:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.ci(z,this.eX(a))
x=this.eY(y,a)
if(x<0)return
return y[x].gdn()},
k:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.hG()
this.b=z}this.j_(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.hG()
this.c=y}this.j_(y,b,c)}else this.qs(b,c)},
qs:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.hG()
this.d=z}y=this.eX(a)
x=this.ci(z,y)
if(x==null)this.hR(z,y,[this.hH(a,b)])
else{w=this.eY(x,a)
if(w>=0)x[w].sdn(b)
else x.push(this.hH(a,b))}},
cX:function(a,b){if(typeof b==="string")return this.jU(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.jU(this.c,b)
else return this.qr(b)},
qr:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.ci(z,this.eX(a))
x=this.eY(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.k9(w)
return w.gdn()},
di:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
b1:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.l(new P.bg(this))
z=z.c}},
j_:function(a,b,c){var z=this.ci(a,b)
if(z==null)this.hR(a,b,this.hH(b,c))
else z.sdn(c)},
jU:function(a,b){var z
if(a==null)return
z=this.ci(a,b)
if(z==null)return
this.k9(z)
this.jk(a,b)
return z.gdn()},
hH:function(a,b){var z,y
z=new H.qG(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
k9:function(a){var z,y
z=a.goH()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
eX:function(a){return J.aS(a)&0x3ffffff},
eY:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.i(a[y].gkF(),b))return y
return-1},
K:function(a){return P.iv(this)},
ci:function(a,b){return a[b]},
hR:function(a,b,c){a[b]=c},
jk:function(a,b){delete a[b]},
ja:function(a,b){return this.ci(a,b)!=null},
hG:function(){var z=Object.create(null)
this.hR(z,"<non-identifier-key>",z)
this.jk(z,"<non-identifier-key>")
return z},
E:function(a){return this.gn(this).$0()},
$isq3:1,
$iset:1},
qy:{
"^":"z:0;a",
$1:function(a){return this.a.h(0,a)}},
qG:{
"^":"o;kF:a<,dn:b@,c,oH:d<"},
qH:{
"^":"b1;a",
gn:function(a){return this.a.a},
ga6:function(a){return this.a.a===0},
gax:function(a){var z,y
z=this.a
y=new H.qI(z,z.r,null,null)
y.c=z.e
return y},
b1:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.l(new P.bg(z))
y=y.c}},
E:function(a){return this.gn(this).$0()},
$isab:1},
qI:{
"^":"o;a,b,c,d",
gas:function(){return this.d},
a9:function(){var z=this.a
if(this.b!==z.r)throw H.l(new P.bg(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
xM:{
"^":"z:0;a",
$1:function(a){return this.a(a)}},
xN:{
"^":"z:129;a",
$2:function(a,b){return this.a(a,b)}},
xO:{
"^":"z:11;a",
$1:function(a){return this.a(a)}}}],["","",,E,{
"^":"",
hw:{
"^":"f1;b,c7:c<,a",
aA:function(){return this.c},
b_:function(){return!0},
ae:function(a,b){var z,y,x,w
z=[0]
if(this.c.bV(a.fT(a.gil())))z[0]=a.c
else if(!this.c.ih(a,z))return!1
for(y=!1,x=0;w=this.b,x<w.length;++x)if(w[x].ae(a,b))y=!0
return y},
a5:function(a){var z,y
for(z=0;y=this.b,z<y.length;++z)if(y[z].a5(a))return!0
return!1},
m0:function(a){var z,y,x
$.t.$2(0,"Building Brute Force Acceleration Structures.")
z=J.D(a)
y=0
while(!0){x=z.gn(a)
if(typeof x!=="number")return H.b(x)
if(!(y<x))break
z.h(a,y).cN(this.b);++y}for(y=0;z=this.b,y<z.length;++y){x=this.c
z=z[y].aA()
this.c=new G.ax(new G.j(new Float32Array(H.n(x.a.a))),new G.j(new Float32Array(H.n(x.b.a)))).bk(z)}},
static:{ol:function(a){var z,y
z=G.a9(null,null)
y=$.aN
$.aN=y+1
y=new E.hw([],z,y)
y.m0(a)
return y},zv:[function(a,b){return E.ol(a)},"$2","wC",4,0,54]}},
hr:{
"^":"f1;b,c,d,e,a",
aA:function(){var z=this.e
if(z!=null){if(0>=z.length)return H.a(z,0)
z=z[0].a}else z=G.a9(null,null)
return z},
b_:function(){return!0},
ae:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
if(this.e==null)return!1
z=J.V(a.gbc())
if(typeof z!=="number")return H.b(z)
y=J.S(a.b)
if(typeof y!=="number")return H.b(y)
x=J.P(a.b)
if(typeof x!=="number")return H.b(x)
w=G.B(1/z,1/y,1/x)
z=w.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]<0?1:0
if(1>=y)return H.a(z,1)
v=z[1]<0?1:0
if(2>=y)return H.a(z,2)
u=[x,v,z[2]<0?1:0]
y=H.k(64)
t=new Uint32Array(y)
for(s=!1,r=0,q=0;!0;){z=this.e
if(q>>>0!==q||q>=z.length)return H.a(z,q)
p=z[q]
if(E.kz(p.a,a,w,u)){z=p.c
if(typeof z!=="number")return z.a0()
if(z>0){o=0
while(!0){z=p.c
if(typeof z!=="number")return H.b(z)
if(!(o<z))break
z=this.d
x=p.b
if(typeof x!=="number")return x.j()
x+=o
if(x>=z.length)return H.a(z,x)
z=z[x].ae(a,b)
x=this.d
v=p.b
if(z){if(typeof v!=="number")return v.j()
z=v+o
if(z>=x.length)return H.a(x,z)
s=!0}else{if(typeof v!=="number")return v.j()
z=v+o
if(z>=x.length)return H.a(x,z)}++o}if(r===0)break;--r
if(r<0||r>=y)return H.a(t,r)
q=t[r]}else{z=p.d
if(z>>>0!==z||z>=3)return H.a(u,z)
n=r+1;++q
if(u[z]!==0){if(r<0||r>=y)return H.a(t,r)
t[r]=q
q=p.b}else{z=p.b
if(r<0||r>=y)return H.a(t,r)
t[r]=z}r=n}}else{if(r===0)break;--r
if(r<0||r>=y)return H.a(t,r)
q=t[r]}}return s},
a5:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(this.e==null)return!1
z=J.V(a.b)
if(typeof z!=="number")return H.b(z)
y=J.S(a.b)
if(typeof y!=="number")return H.b(y)
x=J.P(a.b)
if(typeof x!=="number")return H.b(x)
w=G.B(1/z,1/y,1/x)
z=w.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]<0?1:0
if(1>=y)return H.a(z,1)
v=z[1]<0?1:0
if(2>=y)return H.a(z,2)
u=[x,v,z[2]<0?1:0]
y=H.k(64)
t=new Uint32Array(y)
for(s=0,r=0;!0;){z=this.e
if(r>>>0!==r||r>=z.length)return H.a(z,r)
q=z[r]
if(E.kz(q.a,a,w,u)){z=q.c
if(typeof z!=="number")return z.a0()
if(z>0){p=0
while(!0){z=q.c
if(typeof z!=="number")return H.b(z)
if(!(p<z))break
z=this.d
x=q.b
if(typeof x!=="number")return x.j()
x+=p
if(x>=z.length)return H.a(z,x)
z=z[x].a5(a)
x=this.d
v=q.b
if(z){if(typeof v!=="number")return v.j()
z=v+p
if(z>=x.length)return H.a(x,z)
return!0}else{if(typeof v!=="number")return v.j()
z=v+p
if(z>=x.length)return H.a(x,z)}++p}if(s===0)break;--s
if(s<0||s>=y)return H.a(t,s)
r=t[s]}else{z=q.d
if(z>>>0!==z||z>=3)return H.a(u,z)
o=s+1;++r
if(u[z]!==0){if(s<0||s>=y)return H.a(t,s)
t[s]=r
r=q.b}else{z=q.b
if(s<0||s>=y)return H.a(t,s)
t[s]=z}s=o}}else{if(s===0)break;--s
if(s<0||s>=y)return H.a(t,s)
r=t[s]}}return!1},
hP:function(a4,a5,a6,a7,a8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z={}
a7[0]=a7[0]+1
y=new E.vb(G.a9(null,null),[null,null],null,null,null)
x=G.a9(null,null)
for(w=a4.length,v=a5;v<a6;++v){if(v>=w)return H.a(a4,v)
u=a4[v].gc7()
x=new G.ax(new G.j(new Float32Array(H.n(x.a.a))),new G.j(new Float32Array(H.n(x.b.a)))).bk(u)}t=a6-a5
if(t===1){s=a8.length
for(v=a5;v<a6;++v){if(v>=w)return H.a(a4,v)
r=a4[v].gfW()
z=this.d
if(r>=z.length)return H.a(z,r)
a8.push(z[r])}y.d=s
y.e=t
z=y.a
z.a.L(x.a)
z.b.L(x.b)}else{q=G.a9(null,null)
z.a=q
for(u=q,v=a5;v<a6;++v,u=q){if(v>=w)return H.a(a4,v)
p=a4[v].gdh()
q=new G.ax(new G.j(new Float32Array(H.n(u.a.a))),new G.j(new Float32Array(H.n(u.b.a)))).aR(p)
z.a=q}o=u.f5()
n=C.a.al(a5+a6,2)
u=z.a
p=u.b.a
if(o>=p.length)return H.a(p,o)
p=p[o]
u=u.a.a
if(o>=u.length)return H.a(u,o)
u=u[o]
if(p===u){s=a8.length
for(v=a5;v<a6;++v){if(v>=w)return H.a(a4,v)
r=a4[v].gfW()
z=this.d
if(r>=z.length)return H.a(z,r)
a8.push(z[r])}y.d=s
y.e=t
z=y.a
z.a.L(x.a)
z.b.L(x.b)
return y}m=new E.od(o)
switch(this.c){case 0:l=G.kj(a4,new E.oe(o,0.5*(u+p)),a5,a6)
if(l!==a5&&l!==a6){n=l
break}G.eY(a4,a5,n,a6,m)
break
case 1:G.eY(a4,a5,n,a6,m)
break
case 2:if(t<=4)G.eY(a4,a5,n,a6,m)
else{k=H.p(Array(12),[E.h1])
for(u=k.length,v=0;v<12;++v){p=G.a9(null,null)
if(v>=u)return H.a(k,v)
k[v]=new E.h1(0,p)}for(v=a5;v<a6;++v){if(v>=w)return H.a(a4,v)
p=a4[v].gdh().a
if(o>=p.length)return H.a(p,o)
p=p[o]
m=z.a
j=m.a.a
if(o>=j.length)return H.a(j,o)
j=j[o]
m=m.b.a
if(o>=m.length)return H.a(m,o)
i=C.b.I(12*((p-j)/(m[o]-j)))
if(i===12)i=11
if(i<0||i>=u)return H.a(k,i)
p=k[i]
p.a=J.c(p.a,1)
p=k[i]
m=p.b
j=a4[v].gc7()
p.b=new G.ax(new G.j(new Float32Array(H.n(m.a.a))),new G.j(new Float32Array(H.n(m.b.a)))).bk(j)}h=G.a9(null,null)
g=G.a9(null,null)
p=H.k(11)
f=new Float32Array(p)
for(v=0;v<11;v=d){h.du(0)
g.du(0)
for(e=0,d=0;d<=v;++d){if(d>=u)return H.a(k,d)
m=k[d].b
h=new G.ax(new G.j(new Float32Array(H.n(h.a.a))),new G.j(new Float32Array(H.n(h.b.a)))).bk(m)
m=k[d].a
if(typeof m!=="number")return H.b(m)
e+=m}for(d=v+1,c=d,b=0;c<12;++c){if(c>=u)return H.a(k,c)
m=k[c].b
g=new G.ax(new G.j(new Float32Array(H.n(g.a.a))),new G.j(new Float32Array(H.n(g.b.a)))).bk(m)
m=k[c].a
if(typeof m!=="number")return H.b(m)
b+=m}m=h.dA()
j=g.dA()
a=x.dA()
if(v>=p)return H.a(f,v)
f[v]=0.125+(e*m+b*j)/a}if(0>=p)return H.a(f,0)
a0=f[0]
z.b=0
for(v=1;v<11;++v){if(v>=p)return H.a(f,v)
a1=f[v]
if(a1<a0){z.b=v
a0=a1}}if(t>this.b||a0<t)n=G.kj(a4,new E.kA(z,this,o,12),a5,a6)
else{s=a8.length
for(v=a5;v<a6;++v){if(v>=w)return H.a(a4,v)
r=a4[v].gfW()
z=this.d
if(r>=z.length)return H.a(z,r)
a8.push(z[r])}y.d=s
y.e=t
z=y.a
z.a.L(x.a)
z.b.L(x.b)
return y}}break
default:if(t<=4)G.eY(a4,a5,n,a6,m)
else{k=H.p(Array(12),[E.h1])
for(u=k.length,v=0;v<12;++v){p=G.a9(null,null)
if(v>=u)return H.a(k,v)
k[v]=new E.h1(0,p)}for(v=a5;v<a6;++v){if(v>=w)return H.a(a4,v)
p=a4[v].gdh().a
if(o>=p.length)return H.a(p,o)
p=p[o]
m=z.a
j=m.a.a
if(o>=j.length)return H.a(j,o)
j=j[o]
m=m.b.a
if(o>=m.length)return H.a(m,o)
i=C.b.I(12*((p-j)/(m[o]-j)))
if(i===12)i=11
if(i<0||i>=u)return H.a(k,i)
p=k[i]
p.a=J.c(p.a,1)
p=k[i]
m=p.b
j=a4[v].gc7()
p.b=new G.ax(new G.j(new Float32Array(H.n(m.a.a))),new G.j(new Float32Array(H.n(m.b.a)))).bk(j)}h=G.a9(null,null)
g=G.a9(null,null)
p=H.k(11)
f=new Float32Array(p)
for(v=0;v<11;v=d){h.du(0)
g.du(0)
for(e=0,d=0;d<=v;++d){if(d>=u)return H.a(k,d)
m=k[d].b
h=new G.ax(new G.j(new Float32Array(H.n(h.a.a))),new G.j(new Float32Array(H.n(h.b.a)))).bk(m)
m=k[d].a
if(typeof m!=="number")return H.b(m)
e+=m}for(d=v+1,c=d,b=0;c<12;++c){if(c>=u)return H.a(k,c)
m=k[c].b
g=new G.ax(new G.j(new Float32Array(H.n(g.a.a))),new G.j(new Float32Array(H.n(g.b.a)))).bk(m)
m=k[c].a
if(typeof m!=="number")return H.b(m)
b+=m}m=h.dA()
j=g.dA()
a=x.dA()
if(v>=p)return H.a(f,v)
f[v]=0.125+(e*m+b*j)/a}if(0>=p)return H.a(f,0)
a0=f[0]
z.b=0
for(v=1;v<11;++v){if(v>=p)return H.a(f,v)
a1=f[v]
if(a1<a0){z.b=v
a0=a1}}if(t>this.b||a0<t)n=G.kj(a4,new E.kA(z,this,o,12),a5,a6)
else{s=a8.length
for(v=a5;v<a6;++v){if(v>=w)return H.a(a4,v)
r=a4[v].gfW()
z=this.d
if(r>=z.length)return H.a(z,r)
a8.push(z[r])}y.d=s
y.e=t
z=y.a
z.a.L(x.a)
z.b.L(x.b)
return y}}break}a2=this.hP(a4,n,a6,a7,a8)
a3=this.hP(a4,a5,n,a7,a8)
z=y.b
w=z.length
if(0>=w)return H.a(z,0)
z[0]=a3
if(1>=w)return H.a(z,1)
z[1]=a2
z=a3.a
w=a2.a
y.a=G.bK(z).bk(w)
y.c=o
y.e=0}return y},
hx:function(a,b){var z,y,x,w
z=this.e
y=b[0]
if(y>=z.length)return H.a(z,y)
x=z[y]
x.a=a.gc7()
w=b[0]
b[0]=w+1
z=a.gim()
if(typeof z!=="number")return z.a0()
if(z>0){x.b=a.gqa()
x.c=a.e}else{x.d=a.giQ()
x.c=0
z=a.gaE(a)
if(0>=z.length)return H.a(z,0)
this.hx(z[0],b)
z=a.b
if(1>=z.length)return H.a(z,1)
x.b=this.hx(z[1],b)}return w},
lY:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
$.t.$2(0,"Building BVH Acceleration Structures.")
this.b=P.X(255,b)
z=J.D(a)
y=0
while(!0){x=z.gn(a)
if(typeof x!=="number")return H.b(x)
if(!(y<x))break
z.h(a,y).cN(this.d);++y}z="BVH: "+this.d.length+" Primitives"
$.t.$2(0,z)
z=this.d.length
if(z===0){this.e=null
return}w=H.p(Array(z),[E.cT])
for(z=w.length,y=0;x=this.d,v=x.length,y<v;++y){u=x[y].aA()
x=new E.cT(y,null,u)
if(u==null){v=G.a9(null,null)
x.c=v}else v=u
x.b=v.gkm()
if(y>=z)return H.a(w,y)
w[y]=x}t=[0]
s=[]
r=this.hP(w,0,v,t,s)
this.d=s
z="BVH created with "+t[0]+" nodes for "+this.d.length+" primitives"
$.t.$2(0,z)
z=H.p(Array(t[0]),[E.n4])
this.e=z
for(q=t[0],y=0;y<q;++y){if(y>=z.length)return H.a(z,y)
z[y]=new E.n4(null,null,null,null)}this.hx(r,[0])},
static:{ky:function(a,b,c){var z=$.aN
$.aN=z+1
z=new E.hr(null,c,[],null,z)
z.lY(a,b,c)
return z},kz:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p
z=J.D(a)
y=J.V(z.h(a,d[0]))
x=b.a.a
if(0>=x.length)return H.a(x,0)
x=J.h(y,x[0])
y=c.a
w=y.length
if(0>=w)return H.a(y,0)
v=J.d(x,y[0])
x=J.V(z.h(a,1-d[0]))
u=b.a.a
if(0>=u.length)return H.a(u,0)
t=J.d(J.h(x,u[0]),y[0])
u=J.S(z.h(a,d[1]))
x=b.a.a
if(1>=x.length)return H.a(x,1)
x=J.h(u,x[1])
if(1>=w)return H.a(y,1)
s=J.d(x,y[1])
x=J.S(z.h(a,1-d[1]))
u=b.a.a
if(1>=u.length)return H.a(u,1)
r=J.d(J.h(x,u[1]),y[1])
if(J.F(v,r)||J.F(s,t))return!1
if(J.F(s,v))v=s
if(J.K(r,t))t=r
x=J.P(z.h(a,d[2]))
u=b.a.a
if(2>=u.length)return H.a(u,2)
u=J.h(x,u[2])
if(2>=w)return H.a(y,2)
q=J.d(u,y[2])
z=J.P(z.h(a,1-d[2]))
u=b.a.a
if(2>=u.length)return H.a(u,2)
p=J.d(J.h(z,u[2]),y[2])
if(J.F(v,p)||J.F(q,t))return!1
if(J.F(q,v))v=q
if(J.K(p,t))t=p
return J.K(v,b.d)&&J.F(t,b.c)},zp:[function(a,b){var z,y,x,w
z=b.aO("splitmethod","sah")
y=b.V("maxnodeprims",4)
x=J.O(z)
if(x.B(z,"sah"))w=2
else if(x.B(z,"middle"))w=0
else{x=x.B(z,"equal")?1:2
w=x}return E.ky(a,y,w)},"$2","wB",4,0,55]}},
od:{
"^":"z:46;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.gdh().a
if(z>=y.length)return H.a(y,z)
y=y[z]
x=b.gdh().a
if(z>=x.length)return H.a(x,z)
return y<x[z]}},
oe:{
"^":"z:30;a,b",
$1:function(a){var z,y
z=this.a
y=a.gdh().a
if(z>=y.length)return H.a(y,z)
return y[z]<this.b}},
kA:{
"^":"z:30;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t
z=this.d
y=this.c
x=a.gdh().a
if(y>=x.length)return H.a(x,y)
x=x[y]
w=this.a
v=w.a
u=v.a.a
if(y>=u.length)return H.a(u,y)
u=u[y]
v=v.b.a
if(y>=v.length)return H.a(v,y)
t=C.b.I(Math.floor(z*((x-u)/(v[y]-u))))
if(t===z)t=z-1
return t<=w.b}},
cT:{
"^":"o;fW:a<,dh:b<,c7:c<"},
h1:{
"^":"o;a,c7:b<"},
vb:{
"^":"o;c7:a<,aE:b>,iQ:c<,qa:d<,im:e<"},
n4:{
"^":"o;c7:a<,az:b',im:c<,d"},
hV:{
"^":"f1;b,c,c7:d<,N:e>,f,r,a",
aA:function(){return G.bK(this.d)},
b_:function(){return!0},
ae:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=[0]
if(this.d.bV(a.fT(a.gil())))z[0]=a.c
else if(!this.d.ih(a,z))return!1
y=z[0]
y=new Float32Array(H.n(a.a.j(0,J.d(a.b,y)).a))
x=new G.j(y)
w=[0,0,0]
v=[0,0,0]
u=[0,0,0]
t=[0,0,0]
s=[0,0,0]
for(r=y.length,q=this.c,p=0;p<3;++p){s[p]=this.fU(x,p)
o=J.a7(J.e(a.b,p),0)
n=a.b
m=this.e
l=z[0]
k=s[p]
j=this.d
i=y[p]
if(o){o=j.a.a
if(p>=o.length)return H.a(o,p)
o=o[p]
m=m.a
if(p>=m.length)return H.a(m,p)
m=m[p]
if(p>=r)return H.a(y,p)
n=J.e(n,p)
if(typeof n!=="number")return H.b(n)
w[p]=J.c(l,(o+(k+1)*m-i)/n)
n=this.e.a
if(p>=n.length)return H.a(n,p)
n=n[p]
i=J.e(a.b,p)
if(typeof i!=="number")return H.b(i)
v[p]=n/i
u[p]=1
t[p]=q[p]}else{o=j.a.a
if(p>=o.length)return H.a(o,p)
o=o[p]
m=m.a
if(p>=m.length)return H.a(m,p)
m=m[p]
if(p>=r)return H.a(y,p)
n=J.e(n,p)
if(typeof n!=="number")return H.b(n)
w[p]=J.c(l,(o+k*m-i)/n)
n=this.e.a
if(p>=n.length)return H.a(n,p)
n=n[p]
i=J.e(a.b,p)
if(typeof i!=="number")return H.b(i)
v[p]=-n/i
u[p]=-1
t[p]=-1}}for(h=!1;!0;){y=this.r
r=s[0]
o=s[1]
n=s[2]
m=q[0]
r=n*m*q[1]+o*m+r
if(r>>>0!==r||r>=y.length)return H.a(y,r)
g=y[r]
y=g!=null
if(y);if(y)h=g.ae(a,b)?!0:h
y=J.K(w[0],w[1])?4:0
r=J.K(w[0],w[2])?2:0
o=J.K(w[1],w[2])?1:0
f=C.a5[y+r+o]
y=a.d
if(f>=3)return H.a(w,f)
if(J.K(y,w[f]))break
y=s[f]+u[f]
s[f]=y
if(y===t[f])break
w[f]=J.c(w[f],v[f])}return h},
a5:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=[0]
y=this.d
x=a.c
if(y.bV(new G.j(new Float32Array(H.n(a.a.j(0,J.d(a.b,x)).a)))))z[0]=a.c
else if(!this.d.ih(a,z))return!1
y=z[0]
y=new Float32Array(H.n(a.a.j(0,J.d(a.b,y)).a))
w=new G.j(y)
v=[0,0,0]
u=[0,0,0]
t=[0,0,0]
s=[0,0,0]
r=[0,0,0]
for(x=y.length,q=this.c,p=0;p<3;++p){r[p]=this.fU(w,p)
o=J.a7(J.e(a.b,p),0)
n=a.b
m=z[0]
l=y[p]
k=r[p]
j=this.e
i=this.d
if(o){o=i.a.a
if(p>=o.length)return H.a(o,p)
o=o[p]
j=j.a
if(p>=j.length)return H.a(j,p)
j=j[p]
if(p>=x)return H.a(y,p)
n=J.e(n,p)
if(typeof n!=="number")return H.b(n)
v[p]=J.c(m,(o+(k+1)*j-l)/n)
n=this.e.a
if(p>=n.length)return H.a(n,p)
n=n[p]
l=J.e(a.b,p)
if(typeof l!=="number")return H.b(l)
u[p]=n/l
t[p]=1
s[p]=q[p]}else{o=i.a.a
if(p>=o.length)return H.a(o,p)
o=o[p]
j=j.a
if(p>=j.length)return H.a(j,p)
j=j[p]
if(p>=x)return H.a(y,p)
n=J.e(n,p)
if(typeof n!=="number")return H.b(n)
v[p]=J.c(m,(o+k*j-l)/n)
n=this.e.a
if(p>=n.length)return H.a(n,p)
n=n[p]
l=J.e(a.b,p)
if(typeof l!=="number")return H.b(l)
u[p]=-n/l
t[p]=-1
s[p]=-1}}for(;!0;){y=r[0]
x=r[1]
o=r[2]
n=q[0]
h=o*n*q[1]+x*n+y
y=this.r
if(h>>>0!==h||h>=y.length)return H.a(y,h)
g=y[h]
y=g!=null
if(y);if(y&&g.a5(a))return!0
y=J.K(v[0],v[1])?4:0
x=J.K(v[0],v[2])?2:0
o=J.K(v[1],v[2])?1:0
f=C.a5[y+x+o]
y=a.d
if(f>=3)return H.a(v,f)
if(J.K(y,v[f]))break
y=r[f]+t[f]
r[f]=y
if(y===s[f])break
v[f]=J.c(v[f],u[f])}return!1},
fU:function(a,b){var z,y,x,w
z=a.a
if(b>=z.length)return H.a(z,b)
z=z[b]
y=this.d.a.a
if(b>=y.length)return H.a(y,b)
y=y[b]
x=this.f.a
if(b>=x.length)return H.a(x,b)
w=C.b.I((z-y)*x[b])
x=this.c
if(b>=3)return H.a(x,b)
return C.a.v(w,0,x[b]-1)},
md:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
$.t.$2(0,"Building Hierarchical Grid Acceleration Structures.")
z=J.D(a)
z.gn(a)
if(b===!0){y=0
while(!0){x=z.gn(a)
if(typeof x!=="number")return H.b(x)
if(!(y<x))break
z.h(a,y).cN(this.b);++y}}else this.b=a
y=0
while(!0){z=J.a0(this.b)
if(typeof z!=="number")return H.b(z)
if(!(y<z))break
z=this.d
x=J.e(this.b,y).aA()
this.d=new G.ax(new G.j(new Float32Array(H.n(z.a.a))),new G.j(new Float32Array(H.n(z.b.a)))).bk(x);++y}z=this.d
w=z.b.l(0,z.a)
v=this.d.f5()
z=w.a
x=z.length
if(v>=x)return H.a(z,v)
u=z[v]
t=J.a0(this.b)
H.v(t)
H.v(0.3333333333333333)
s=3*Math.pow(t,0.3333333333333333)*(1/u)
for(u=this.c,r=0;r<3;++r){if(r>=x)return H.a(z,r)
t=C.b.bF(z[r]*s)
u[r]=t
u[r]=C.a.v(t,1,64)}for(t=this.e.a,q=t.length,p=this.f,r=0;r<3;++r){if(r>=x)return H.a(z,r)
o=z[r]
n=u[r]
if(r>=q)return H.a(t,r)
t[r]=o/n
o=t[r]
o=o===0?0:1/o
n=p.a
if(r>=n.length)return H.a(n,r)
n[r]=o}this.r=H.p(Array(u[0]*u[1]*u[2]),[E.nf])
m=[0,0,0]
l=[0,0,0]
y=0
while(!0){z=J.a0(this.b)
if(typeof z!=="number")return H.b(z)
if(!(y<z))break
k=J.e(this.b,y)
j=k.aA()
for(r=0;r<3;++r){m[r]=this.fU(j.gbC(),r)
l[r]=this.fU(j.b,r)}for(i=m[2];i<=l[2];++i)for(h=m[1];h<=l[1];++h)for(g=m[0];g<=l[0];++g){z=u[0]
f=i*z*u[1]+h*z+g
z=this.r
if(f>>>0!==f||f>=z.length)return H.a(z,f)
x=z[f]
if(x==null){x=[]
t=new E.nf(x,null)
t.b=!1
x.push(k)
z[f]=t}else x.a.push(k)}++y}},
static:{hW:function(a,b){var z,y,x,w
z=G.a9(null,null)
y=G.B(0,0,0)
x=G.B(0,0,0)
w=$.aN
$.aN=w+1
w=new E.hV([],[0,0,0],z,y,x,null,w)
w.md(a,b)
return w},Ap:[function(a,b){return E.hW(a,b.bo("refineimmediately",!0))},"$2","wD",4,0,56]}},
nf:{
"^":"o;a,b",
ae:function(a,b){var z,y,x,w,v,u,t
z=this.a.length
if(!this.b){for(y=0;y<z;++y){x=this.a
if(y>=x.length)return H.a(x,y)
w=x[y]
if(!w.b_()){v=[]
w.cN(v)
x=v.length
u=this.a
if(x===1){if(0>=x)return H.a(v,0)
x=v[0]
if(y>=u.length)return H.a(u,y)
u[y]=x}else{x=E.hW(v,!1)
if(y>=u.length)return H.a(u,y)
u[y]=x}}}this.b=!0}for(t=!1,y=0;y<z;++y){x=this.a
if(y>=x.length)return H.a(x,y)
if(x[y].ae(a,b))t=!0}return t},
a5:function(a){var z,y,x,w,v
if(!this.b){for(z=0;y=this.a,z<y.length;++z){x=y[z]
if(!x.b_()){w=[]
x.cN(w)
y=w.length
v=this.a
if(y===1){if(0>=y)return H.a(w,0)
y=w[0]
if(z>=v.length)return H.a(v,z)
v[z]=y}else{y=E.hW(w,!1)
if(z>=v.length)return H.a(v,z)
v[z]=y}}}this.b=!0}for(z=0;y=this.a,z<y.length;++z)if(y[z].a5(a))return!0
return!1}},
ij:{
"^":"f1;b,c,d,e,f,r,x,y,c7:z<,a",
aA:function(){return this.z},
b_:function(){return!0},
ae:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=[0]
y=[0]
if(!this.z.b7(a,z,y))return!1
x=J.V(a.gbc())
if(typeof x!=="number")return H.b(x)
w=J.S(a.b)
if(typeof w!=="number")return H.b(w)
v=J.P(a.b)
if(typeof v!=="number")return H.b(v)
u=G.B(1/x,1/w,1/v)
t=H.p(Array(64),[E.h8])
v=this.x
if(0>=v.length)return H.a(v,0)
s=v[0]
for(x=t.length,w=u.a,v=w.length,r=0,q=!1,p=0;s!=null;){if(J.K(a.d,z[0]))break
o=s.a
n=o&3
if(n!==3){o=s.b
m=a.a.a
if(n>=m.length)return H.a(m,n)
m=m[n]
if(typeof o!=="number")return o.l()
if(n>=v)return H.a(w,n)
l=(o-m)*w[n]
if(!(m<o))k=m===o&&J.aG(J.e(a.b,n),0)
else k=!0
o=s.a
n=this.x
if(k){if(typeof p!=="number")return p.j()
j=p+1
m=n.length
if(j>=m)return H.a(n,j)
i=n[j]
h=C.a.p(o,2)
if(h>=m)return H.a(n,h)
g=n[h]}else{j=C.a.p(o,2)
o=n.length
if(j>=o)return H.a(n,j)
i=n[j]
if(typeof p!=="number")return p.j()
h=p+1
if(h>=o)return H.a(n,h)
g=n[h]}o=y[0]
if(typeof o!=="number")return H.b(o)
if(l>o||l<=0){s=i
p=j}else{n=z[0]
if(typeof n!=="number")return H.b(n)
if(l<n){s=g
p=h}else{if(r<0||r>=x)return H.a(t,r)
n=t[r]
if(n==null){n=new E.h8(null,null,null,null)
t[r]=n}n.b=h
n.a=g
n.c=l
n.d=o;++r
y[0]=l
s=i
p=j}}}else{o=C.a.p(o,2)
if(o===1){o=this.r
n=s.c
if(n>>>0!==n||n>=o.length)return H.a(o,n)
if(o[n].ae(a,b))q=!0}else if(o>1){f=s.c
for(n=J.D(f),e=0;e<o;++e){m=this.r
d=n.h(f,e)
if(d>=m.length)return H.a(m,d)
if(m[d].ae(a,b))q=!0}}if(r>0){--r
if(r>=x)return H.a(t,r)
o=t[r]
s=o.a
p=o.b
z[0]=o.c
y[0]=o.d}else break}}return q},
a5:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=[0]
y=[0]
if(!this.z.b7(a,z,y))return!1
x=J.V(a.b)
if(typeof x!=="number")return H.b(x)
w=J.S(a.b)
if(typeof w!=="number")return H.b(w)
v=J.P(a.b)
if(typeof v!=="number")return H.b(v)
u=G.B(1/x,1/w,1/v)
t=H.p(Array(64),[E.h8])
v=this.x
if(0>=v.length)return H.a(v,0)
s=v[0]
for(x=t.length,w=u.a,v=w.length,r=0,q=0;s!=null;){if(J.K(a.d,z[0]))break
p=s.a
o=p&3
if(o!==3){p=s.b
n=a.a.a
if(o>=n.length)return H.a(n,o)
n=n[o]
if(typeof p!=="number")return p.l()
if(o>=v)return H.a(w,o)
m=(p-n)*w[o]
if(!(n<p))l=n===p&&J.aG(J.e(a.b,o),0)
else l=!0
p=s.a
o=this.x
if(l){if(typeof q!=="number")return q.j()
k=q+1
n=o.length
if(k>=n)return H.a(o,k)
j=o[k]
i=C.a.p(p,2)
if(i>=n)return H.a(o,i)
h=o[i]}else{k=C.a.p(p,2)
p=o.length
if(k>=p)return H.a(o,k)
j=o[k]
if(typeof q!=="number")return q.j()
i=q+1
if(i>=p)return H.a(o,i)
h=o[i]}p=y[0]
if(typeof p!=="number")return H.b(p)
if(m>p||m<=0){s=j
q=k}else{o=z[0]
if(typeof o!=="number")return H.b(o)
if(m<o){s=h
q=i}else{if(r<0||r>=x)return H.a(t,r)
o=t[r]
if(o==null){o=new E.h8(null,null,null,null)
t[r]=o}o.a=h
o.b=i
o.c=m
o.d=p;++r
y[0]=m
s=j
q=k}}}else{p=C.a.p(p,2)
if(p===1){p=this.r
o=s.c
if(o>>>0!==o||o>=p.length)return H.a(p,o)
if(p[o].a5(a))return!0}else if(p>1){g=s.c
for(o=J.D(g),f=0;f<p;++f){n=this.r
e=o.h(g,f)
if(e>=n.length)return H.a(n,e)
if(n[e].a5(a))return!0}}if(r>0){--r
if(r>=x)return H.a(t,r)
p=t[r]
s=p.a
q=p.b
z[0]=p.c
y[0]=p.d}else break}}return!1},
hi:function(c0,c1,c2,c3,c4,c5,c6,c7,c8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9
z=c3.length
y=this.x
x=y==null
if(x||this.y===y.length){w=x?0:y.length
v=P.I(2*w,512)
u=H.p(Array(v),[E.n2])
for(y=this.x,x=u.length,t=0;t<w;++t){if(t>=y.length)return H.a(y,t)
s=y[t]
if(t>=x)return H.a(u,t)
u[t]=s}for(t=w;t<v;++t){if(t>=x)return H.a(u,t)
u[t]=new E.n2(0,null,null)}this.x=u}y=this.y
if(typeof y!=="number")return y.j()
this.y=y+1
y=this.d
if(typeof y!=="number")return H.b(y)
if(z<=y||J.i(c4,0)){y=J.h(this.e,c4)
x=$.$get$eF()
x.c=J.c(x.c,1)
$.eF=x
x=$.$get$ji()
x.c=P.I(x.c,z)
x=$.$get$jh()
x.c=P.I(x.c,y)
y=this.x
if(c0>>>0!==c0||c0>=y.length)return H.a(y,c0)
y[c0].kI(c3)
return}y=this.b
x=J.w(y)
r=x.i(y,z)
s=c1.b.l(0,c1.a).a
q=s.length
if(0>=q)return H.a(s,0)
p=s[0]
if(1>=q)return H.a(s,1)
o=s[1]
if(2>=q)return H.a(s,2)
n=s[2]
m=1/(2*(p*o+p*n+o*n))
if(p>o&&p>n)l=0
else l=o>n?1:2
for(k=2*z,p=this.c,o=J.w(p),j=this.f,n=c2.length,i=z*2,h=-1,g=-1,f=1/0,e=0;!0;){d=Array(i)
d.$builtinTypeInfo=[E.eP]
if(l<0||l>=3)return H.a(c5,l)
c5[l]=d
for(t=0,c=0;t<z;++t){b=c3[t]
if(b>=n)return H.a(c2,b)
a=c2[b]
d=c5[l]
a0=c+1
a1=a.gbC().a
if(l>=a1.length)return H.a(a1,l)
a1=a1[l]
a2=b<<1
if(c>=d.length)return H.a(d,c)
d[c]=new E.eP(a1,(0|a2)>>>0)
a1=c5[l]
c=a0+1
d=a.b.a
if(l>=d.length)return H.a(d,l)
d=d[l]
if(a0>=a1.length)return H.a(a1,a0)
a1[a0]=new E.eP(d,(1|a2)>>>0)}d=c5[l]
a1=new E.qC()
d.toString
if(typeof d!=="object"||d===null||!!d.immutable$list)H.T(new P.ae("sort"))
a2=d.length-1
if(a2-0<=32)H.mg(d,0,a2,a1)
else H.mf(d,0,a2,a1)
for(a3=z,a4=0,t=0;t<k;++t){d=c5[l]
if(t>=d.length)return H.a(d,t)
d=d[t]
if((d.b&1)===1)--a3
a5=d.a
d=c1.a.a
if(l>=d.length)return H.a(d,l)
d=d[l]
if(a5>d){a1=c1.b.a
if(l>=a1.length)return H.a(a1,l)
a1=a5<a1[l]}else a1=!1
if(a1){a6=C.H[l]
a7=C.b1[l]
if(a6>=q)return H.a(s,a6)
a1=s[a6]
if(a7>=q)return H.a(s,a7)
a2=s[a7]
a8=a1*a2
a2=a1+a2
a1=c1.b.a
if(l>=a1.length)return H.a(a1,l)
a1=a1[l]
a9=a3===0||a4===0?j:0
if(typeof a9!=="number")return H.b(a9)
b0=o.j(p,J.d(x.i(y,1-a9),2*(a8+(a5-d)*a2)*m*a4+2*(a8+(a1-a5)*a2)*m*a3))
if(J.K(b0,f)){f=b0
g=t
h=l}}d=c5[l]
if(t>=d.length)return H.a(d,t)
if((d[t].b&1)===0)++a4}if(h===-1&&e<2){++e
l=C.H[l]
continue}break}y=J.y(f)
if(y.a0(f,r))++c8
if(typeof r!=="number")return H.b(r)
if(y.a0(f,4*r)&&z<16||h===-1||c8===3){y=J.h(this.e,c4)
x=$.$get$eF()
x.c=J.c(x.c,1)
$.eF=x
x=$.$get$ji()
x.c=P.I(x.c,z)
x=$.$get$jh()
x.c=P.I(x.c,y)
y=this.x
if(c0>>>0!==c0||c0>=y.length)return H.a(y,c0)
y[c0].kI(c3)
return}for(y=c6.length,b1=0,t=0;t<g;++t){if(h<0||h>=3)return H.a(c5,h)
x=c5[h]
if(t>=x.length)return H.a(x,t)
x=x[t].b
if((x&1)===0){b2=b1+1
if(b1>=y)return H.a(c6,b1)
c6[b1]=x>>>1
b1=b2}}for(t=g+1,y=c7.length,b3=0;t<k;++t){if(h<0||h>=3)return H.a(c5,h)
x=c5[h]
if(t<0||t>=x.length)return H.a(x,t)
x=x[t].b
if((x&1)===1){b4=b3+1
if(b3>=y)return H.a(c7,b3)
c7[b3]=x>>>1
b3=b4}}if(h<0||h>=3)return H.a(c5,h)
y=c5[h]
if(g<0||g>=y.length)return H.a(y,g)
b5=y[g].a
y=$.$get$jg()
y.c=J.c(y.c,1)
$.jg=y
b6=G.bK(c1)
y=b6.b.a
if(h>=y.length)return H.a(y,h)
y[h]=b5
b7=G.bK(c1)
y=b7.a.a
if(h>=y.length)return H.a(y,h)
y[h]=b5
y=c6.buffer
b=(y&&C.e).dT(y,c6.byteOffset,b1)
y=c7.buffer
x=c7.byteOffset
if(typeof x!=="number")return x.j()
b8=(y&&C.e).dT(y,x+z*4,null)
if(typeof c0!=="number")return c0.j()
x=J.y(c4)
this.hi(c0+1,b6,c2,b,x.l(c4,1),c5,c6,b8,c8)
b9=this.y
y=this.x
if(c0>=y.length)return H.a(y,c0)
y=y[c0]
y.b=b5
y.a=h
if(typeof b9!=="number")return b9.u()
y.a=(h|b9<<2)>>>0
y=c7.buffer
this.hi(b9,b7,c2,(y&&C.e).dT(y,c7.byteOffset,b3),x.l(c4,1),c5,c6,b8,c8)},
nk:function(a,b,c,d,e,f,g,h){return this.hi(a,b,c,d,e,f,g,h,0)},
mp:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p
z=J.D(a)
z.gn(a)
$.t.$2(0,"Building Kd-Tree Acceleration Structures.")
y=0
while(!0){x=z.gn(a)
if(typeof x!=="number")return H.b(x)
if(!(y<x))break
z.h(a,y).cN(this.r);++y}this.y=0
if(J.aG(this.e,0)){z=Math.log(H.v(this.r.length))
x=$.$get$dk()
if(typeof x!=="number")return H.b(x)
this.e=C.b.bF(8+1.3*C.d.I(z*x))}this.z=G.a9(null,null)
w=H.p(Array(this.r.length),[G.ax])
for(z=w.length,y=0;x=this.r,y<x.length;++y){v=x[y].aA()
x=this.z
this.z=new G.ax(new G.j(new Float32Array(H.n(x.a.a))),new G.j(new Float32Array(H.n(x.b.a)))).bk(v)
if(y>=z)return H.a(w,y)
w[y]=v}u=Array(3)
for(y=0;y<3;++y){t=2*this.r.length
z=Array(t)
z.$builtinTypeInfo=[E.eP]
u[y]=z
for(s=0;s<t;++s){z=u[y]
if(s>=z.length)return H.a(z,s)
z[s]=new E.eP(0,1)}}r=new Uint32Array(H.k(this.r.length))
q=new Uint32Array(H.k(J.d(J.c(this.e,1),this.r.length)))
z=H.k(this.r.length)
p=new Uint32Array(z)
for(x=this.r.length,y=0;y<x;++y){if(y>=z)return H.a(p,y)
p[y]=y}this.nk(0,this.z,w,p,this.e,u,r,q)},
static:{qB:function(a,b,c,d,e,f){var z=$.aN
$.aN=z+1
z=new E.ij(b,c,e,f,d,[],null,null,null,z)
z.mp(a,b,c,d,e,f)
return z},AH:[function(a,b){return E.qB(a,b.V("intersectcost",80),b.V("traversalcost",1),b.m("emptybonus",0.5),b.V("maxprims",1),b.V("maxdepth",-1))},"$2","wE",4,0,57]}},
qC:{
"^":"z:7;",
$2:function(a,b){return J.K(a,b)?-1:1}},
h8:{
"^":"o;a,b,c,d"},
n2:{
"^":"o;a,b,c",
kI:function(a){var z=a.length
this.a=3
this.a=(3|z<<2)>>>0
if(z===0)this.c=0
else if(z===1){if(0>=z)return H.a(a,0)
this.c=a[0]}else this.c=new Uint32Array(H.n(a))},
gim:function(){return C.a.p(this.a,2)},
giQ:function(){return this.a&3},
iP:function(a,b){return this.b.$1(b)}},
eP:{
"^":"o;ix:a<,b",
U:function(a,b){var z,y
z=this.a
if(z===b.gix())return(this.b&1)<b.gaa(b)
else{y=b.gix()
if(typeof y!=="number")return H.b(y)
return z<y}},
gaa:function(a){return this.b&1}}}],["","",,T,{
"^":"",
x2:function(a,b){var z,y,x,w,v,u,t
z=b&65535
y=b>>>16
x=a.length
for(w=x,v=0;w>0;){u=3800>w?w:3800
w-=u
for(;--u,u>=0;v=t){t=v+1
if(v<0||v>=x)return H.a(a,v)
z+=a[v]&255
y+=z}z=C.a.R(z,65521)
y=C.a.R(y,65521)}return(y<<16|z)>>>0},
c8:function(a,b){var z,y,x,w
z=J.D(a)
y=z.gn(a)
b^=4294967295
for(x=0;y>=8;){w=x+1
b=C.r[(b^z.h(a,x))&255]^b>>>8
x=w+1
b=C.r[(b^z.h(a,w))&255]^b>>>8
w=x+1
b=C.r[(b^z.h(a,x))&255]^b>>>8
x=w+1
b=C.r[(b^z.h(a,w))&255]^b>>>8
w=x+1
b=C.r[(b^z.h(a,x))&255]^b>>>8
x=w+1
b=C.r[(b^z.h(a,w))&255]^b>>>8
w=x+1
b=C.r[(b^z.h(a,x))&255]^b>>>8
x=w+1
b=C.r[(b^z.h(a,w))&255]^b>>>8
y-=8}if(y>0)do{w=x+1
b=C.r[(b^z.h(a,x))&255]^b>>>8
if(--y,y>0){x=w
continue}else break}while(!0)
return(b^4294967295)>>>0},
ku:{
"^":"lh;ic:a>,b",
gn:function(a){return this.a.length},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
gat:function(a){return C.c.gat(this.a)},
ga6:function(a){return this.a.length===0},
gbd:function(a){return this.a.length!==0},
gax:function(a){var z=this.a
return new J.dw(z,z.length,0,null)},
E:function(a){return this.gn(this).$0()},
$aslh:function(){return[T.f2]},
$asb1:function(){return[T.f2]}},
f2:{
"^":"o;a3:a>,b,c,d,e,f,r,x,y,z,Q,ch,cx",
gdY:function(a){var z,y,x,w
z=this.cx
if(z==null){z=this.Q
y=this.ch
if(z===8){z=this.b
x=T.bh(C.z)
w=T.bh(C.F)
z=T.dI(0,z)
new T.dB(y,z,0,0,0,x,w).dJ()
w=z.c.buffer
z=(w&&C.e).ad(w,0,z.a)
this.cx=z}else{z=y.aD()
this.cx=z}this.Q=0}return z},
K:function(a){return this.a}},
on:{
"^":"o;a,b,c",
Z:function(a){var z,y,x,w
if(a===0)return 0
if(this.c===0){this.c=8
z=this.a
y=z.b
z.b=J.c(y,1)
this.b=J.e(z.a,y)}for(x=0;z=this.c,a>z;){y=C.a.u(x,z)
w=this.b
if(z>>>0!==z||z>=9)return H.a(C.l,z)
z=J.W(w,C.l[z])
if(typeof z!=="number")return H.b(z)
x=y+z
a-=this.c
this.c=8
z=this.a
y=z.b
z.b=J.c(y,1)
this.b=J.e(z.a,y)}if(a>0){if(z===0){this.c=8
z=this.a
y=z.b
z.b=J.c(y,1)
this.b=J.e(z.a,y)}z=C.a.u(x,a)
y=this.b
w=this.c-a
if(typeof y!=="number")return y.D()
y=C.b.D(y,w)
if(a>>>0!==a||a>=9)return H.a(C.l,a)
x=z+(y&C.l[a])
this.c=w}return x}},
kB:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4",
b6:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=T.dI(0,32768)
y=new T.on(a,0,0)
this.dx=0
this.dy=0
this.fr=0
this.fx=0
if(y.Z(8)!==66||y.Z(8)!==90||y.Z(8)!==104)throw H.l(new T.a8("Invalid Signature"))
x=y.Z(8)-48
this.a=x
if(x<0||x>9)throw H.l(new T.a8("Invalid BlockSize"))
this.b=new Uint32Array(H.k(x*1e5))
for(w=0;!0;){v=this.oO(y)
if(v===0){x=y.Z(8)
u=y.Z(8)
t=y.Z(8)
s=y.Z(8)
r=(this.oP(y,z)^4294967295)>>>0
if(b&&r!==((((0|x)<<8|u)<<8|t)<<8|s)>>>0)throw H.l(new T.a8("Invalid block checksum."))
w=((w<<1|w>>>31)&4294967295^r)>>>0}else if(v===2){q=((((0|y.Z(8))<<8|y.Z(8))<<8|y.Z(8))<<8|y.Z(8))>>>0
if(b&&q!==w)throw H.l(new T.a8("Invalid combined checksum: "+w+" : "+q))
x=z.c.buffer
return(x&&C.e).ad(x,0,z.a)}}return},
oO:function(a){var z,y,x,w
for(z=!0,y=!0,x=0;x<6;++x){w=a.Z(8)
if(w!==C.hO[x])y=!1
if(w!==C.hP[x])z=!1
if(!z&&!y)throw H.l(new T.a8("Invalid Block Signature"))}return y?0:2},
oP:function(c5,c6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4
z=c5.Z(1)
y=((c5.Z(8)<<8|c5.Z(8))<<8|c5.Z(8))>>>0
this.c=new Uint8Array(16)
for(x=0;x<16;++x)this.c[x]=c5.Z(1)
this.d=new Uint8Array(256)
for(x=0,w=0;x<16;++x,w+=16)if(this.c[x]!==0)for(v=0;v<16;++v){u=this.d
t=w+v
s=c5.Z(1)
u.length
if(t>=256)return H.a(u,t)
u[t]=s}this.oj()
u=this.k3
if(u===0)throw H.l(new T.a8("Data error"))
r=u+2
q=c5.Z(3)
if(q<2||q>6)throw H.l(new T.a8("Data error"))
u=c5.Z(15)
this.db=u
if(u<1)throw H.l(new T.a8("Data error"))
this.x=new Uint8Array(18002)
this.y=new Uint8Array(18002)
x=0
while(!0){u=this.db
if(typeof u!=="number")return H.b(u)
if(!(x<u))break
for(v=0;!0;){if(c5.Z(1)===0)break;++v
if(v>=q)throw H.l(new T.a8("Data error"))}u=this.x
u.length
if(x>=18002)return H.a(u,x)
u[x]=v;++x}p=new Uint8Array(6)
for(x=0;x<q;++x){if(x>=6)return H.a(p,x)
p[x]=x}u=this.db
if(typeof u!=="number")return H.b(u)
t=this.y
s=this.x
x=0
for(;x<u;++x){s.length
if(x>=18002)return H.a(s,x)
o=s[x]
if(o>=6)return H.a(p,o)
n=p[o]
for(;o>0;o=m){m=o-1
p[o]=p[m]}p[0]=n
t[x]=n}u=Array(6)
u.$builtinTypeInfo=[P.cp]
this.k2=u
for(l=0;l<q;++l){u=this.k2
t=new Uint8Array(258)
u.length
if(l>=6)return H.a(u,l)
u[l]=t
k=c5.Z(5)
for(x=0;x<r;++x){for(;!0;){if(k<1||k>20)throw H.l(new T.a8("Data error"))
if(c5.Z(1)===0)break
k=c5.Z(1)===0?k+1:k-1}u=this.k2[l]
u.length
if(x>=258)return H.a(u,x)
u[x]=k}}u=Array(6)
u.$builtinTypeInfo=[P.i6]
this.z=u
u=Array(6)
u.$builtinTypeInfo=[P.i6]
this.Q=u
u=Array(6)
u.$builtinTypeInfo=[P.i6]
this.ch=u
this.cx=new Int32Array(6)
for(l=0;l<q;++l){u=this.z
t=new Int32Array(258)
u.length
if(l>=6)return H.a(u,l)
u[l]=t
t=this.Q
t[l]=new Int32Array(258)
u=this.ch
u[l]=new Int32Array(258)
for(u=this.k2,j=32,i=0,x=0;x<r;++x){t=u[l]
t.length
if(x>=258)return H.a(t,x)
h=t[x]
if(h>i)i=h
if(h<j)j=h}this.o_(this.z[l],this.Q[l],this.ch[l],u[l],j,i,r)
this.cx[l]=j}g=this.k3+1
u=this.a
if(typeof u!=="number")return H.b(u)
f=1e5*u
this.cy=new Int32Array(256)
this.f=new Uint8Array(4096)
u=new Int32Array(16)
this.r=u
for(t=this.f,e=4095,d=15;d>=0;--d){for(s=d*16,c=15;c>=0;--c){t.length
if(e<0||e>=4096)return H.a(t,e)
t[e]=s+c;--e}if(d>=16)return H.a(u,d)
u[d]=e+1}this.dx=0
this.dy=-1
b=this.hz(c5)
for(a=0;!0;){if(b===g)break
if(b===0||b===1){a0=-1
a1=1
do{if(a1>=2097152)throw H.l(new T.a8("Data error"))
if(b===0)a0+=a1
else if(b===1)a0+=2*a1
a1*=2
b=this.hz(c5)}while(b===0||b===1);++a0
u=this.e
t=this.f
s=this.r
if(0>=s.length)return H.a(s,0)
s=s[0]
t.length
if(s<0||s>=4096)return H.a(t,s)
s=t[s]
u.length
if(s<0||s>=256)return H.a(u,s)
a2=u[s]
s=this.cy
s.length
if(a2>=256)return H.a(s,a2)
s[a2]=s[a2]+a0
for(u=this.b;a0>0;){if(a>=f)throw H.l(new T.a8("Data error"))
if(a<0||a>=u.length)return H.a(u,a)
u[a]=a2;++a;--a0}continue}else{if(a>=f)throw H.l(new T.a8("Data error"))
a3=b-1
u=this.r
t=this.f
if(a3<16){if(0>=u.length)return H.a(u,0)
a4=u[0]
u=a4+a3
t.length
if(u<0||u>=4096)return H.a(t,u)
a2=t[u]
for(;a3>3;){a5=a4+a3
u=a5-1
if(u<0||u>=4096)return H.a(t,u)
s=t[u]
if(a5<0||a5>=4096)return H.a(t,a5)
t[a5]=s
s=a5-2
if(s<0)return H.a(t,s)
t[u]=t[s]
u=a5-3
if(u<0)return H.a(t,u)
t[s]=t[u]
s=a5-4
if(s<0)return H.a(t,s)
t[u]=t[s]
a3-=4}for(;a3>0;){u=a4+a3
s=u-1
if(s<0||s>=4096)return H.a(t,s)
s=t[s]
if(u<0||u>=4096)return H.a(t,u)
t[u]=s;--a3}if(a4<0||a4>=4096)return H.a(t,a4)
t[a4]=a2}else{a6=C.a.al(a3,16)
a7=C.a.R(a3,16)
s=u.length
if(a6<0||a6>=s)return H.a(u,a6)
a4=u[a6]+a7
t.length
if(a4<0||a4>=4096)return H.a(t,a4)
a2=t[a4]
for(;a8=u[a6],a4>a8;a4=a9){a9=a4-1
if(a9<0)return H.a(t,a9)
a8=t[a9]
if(a4<0)return H.a(t,a4)
t[a4]=a8}u[a6]=a8+1
for(;a6>0;){if(a6>=s)return H.a(u,a6)
u[a6]=u[a6]-1
a8=u[a6];--a6
if(a6>=s)return H.a(u,a6)
b0=u[a6]+16-1
if(b0<0||b0>=4096)return H.a(t,b0)
b0=t[b0]
if(a8<0||a8>=4096)return H.a(t,a8)
t[a8]=b0}if(0>=s)return H.a(u,0)
u[0]=u[0]-1
a8=u[0]
if(a8<0||a8>=4096)return H.a(t,a8)
t[a8]=a2
if(u[0]===0)for(e=4095,d=15;d>=0;--d){for(c=15;c>=0;--c){if(d>=s)return H.a(u,d)
a8=u[d]+c
if(a8<0||a8>=4096)return H.a(t,a8)
a8=t[a8]
if(e<0||e>=4096)return H.a(t,e)
t[e]=a8;--e}if(d>=s)return H.a(u,d)
u[d]=e+1}}u=this.cy
t=this.e
t.length
if(a2<0||a2>=256)return H.a(t,a2)
s=t[a2]
u.length
if(s>=256)return H.a(u,s)
u[s]=u[s]+1
s=this.b
t=t[a2]
if(a<0||a>=s.length)return H.a(s,a)
s[a]=t;++a
b=this.hz(c5)
continue}}if(y>=a)throw H.l(new T.a8("Data error"))
for(u=this.cy,x=0;x<=255;++x){t=u[x]
if(t<0||t>a)throw H.l(new T.a8("Data error"))}u=new Int32Array(257)
this.k1=u
u[0]=0
for(t=this.cy,x=1;x<=256;++x)u[x]=t[x-1]
for(x=1;x<=256;++x)u[x]=u[x]+u[x-1]
for(x=0;x<=256;++x){t=u[x]
if(t<0||t>a)throw H.l(new T.a8("Data error"))}for(x=1;x<=256;++x)if(u[x-1]>u[x])throw H.l(new T.a8("Data error"))
for(t=this.b,x=0;x<a;++x){s=t.length
if(x>=s)return H.a(t,x)
a2=t[x]&255
a8=u[a2]
if(a8<0||a8>=s)return H.a(t,a8)
t[a8]=(t[a8]|x<<8)>>>0
u[a2]=u[a2]+1}b1=$.of
u=t.length
if(y>=u)return H.a(t,y)
b2=t[y]>>>8
s=z!==0
if(s){a8=this.a
if(typeof a8!=="number")return H.b(a8)
if(b2>=1e5*a8)throw H.l(new T.a8("Data error"))
if(b2>=u)return H.a(t,b2)
b2=t[b2]
b3=b2>>>8
b4=b2&255^0
b2=b3
b5=618
b6=1}else{a8=this.a
if(typeof a8!=="number")return H.b(a8)
if(b2>=1e5*a8)return b1
if(b2>=u)return H.a(t,b2)
b2=t[b2]
b4=b2&255
b2=b2>>>8
b5=0
b6=0}b7=a+1
if(s)for(b8=0,b9=0,c0=1;!0;b9=b4,b4=c2){for(u=b9&255;!0;){if(b8===0)break
if(c6.a===c6.c.length)c6.dE()
t=c6.c
s=c6.a++
if(s>>>0!==s||s>=t.length)return H.a(t,s)
t[s]=u
s=(b1>>>24&255^u)>>>0
if(s>=256)return H.a(C.o,s)
b1=((b1<<8^C.o[s])&4294967295)>>>0;--b8}if(c0===b7)return b1
if(c0>b7)throw H.l(new T.a8("Data error."))
u=this.b
t=u.length
if(b2<0||b2>=t)return H.a(u,b2)
b2=u[b2]
b3=b2>>>8
if(b5===0){if(b6>=512)return H.a(C.p,b6)
b5=C.p[b6];++b6
if(b6===512)b6=0}--b5
s=b5===1?1:0
c1=b2&255^s;++c0
if(c0===b7){c2=b4
b2=b3
b8=1
continue}if(c1!==b4){c2=c1
b2=b3
b8=1
continue}if(b3>=t)return H.a(u,b3)
b2=u[b3]
b3=b2>>>8
if(b5===0){if(b6>=512)return H.a(C.p,b6)
b5=C.p[b6];++b6
if(b6===512)b6=0}s=b5===1?1:0
c1=b2&255^s;++c0
if(c0===b7){c2=b4
b2=b3
b8=2
continue}if(c1!==b4){c2=c1
b2=b3
b8=2
continue}if(b3>=t)return H.a(u,b3)
b2=u[b3]
b3=b2>>>8
if(b5===0){if(b6>=512)return H.a(C.p,b6)
b5=C.p[b6];++b6
if(b6===512)b6=0}s=b5===1?1:0
c1=b2&255^s;++c0
if(c0===b7){c2=b4
b2=b3
b8=3
continue}if(c1!==b4){c2=c1
b2=b3
b8=3
continue}if(b3>=t)return H.a(u,b3)
b2=u[b3]
b3=b2>>>8
if(b5===0){if(b6>=512)return H.a(C.p,b6)
b5=C.p[b6];++b6
if(b6===512)b6=0}s=b5===1?1:0
b8=(b2&255^s)+4
if(b3>=t)return H.a(u,b3)
b2=u[b3]
b3=b2>>>8
if(b5===0){if(b6>=512)return H.a(C.p,b6)
b5=C.p[b6];++b6
if(b6===512)b6=0}u=b5===1?1:0
c2=b2&255^u
c0=c0+1+1
b2=b3}else for(c3=b4,b8=0,b9=0,c0=1;!0;b9=c3,c3=c4){if(b8>0){for(u=b9&255;!0;){if(b8===1)break
if(c6.a===c6.c.length)c6.dE()
t=c6.c
s=c6.a++
if(s>>>0!==s||s>=t.length)return H.a(t,s)
t[s]=u
s=(b1>>>24&255^u)>>>0
if(s>=256)return H.a(C.o,s)
b1=(b1<<8^C.o[s])&4294967295;--b8}if(c6.a===c6.c.length)c6.dE()
t=c6.c
s=c6.a++
if(s>>>0!==s||s>=t.length)return H.a(t,s)
t[s]=u
u=(b1>>>24&255^u)>>>0
if(u>=256)return H.a(C.o,u)
b1=((b1<<8^C.o[u])&4294967295)>>>0}if(c0>b7)throw H.l(new T.a8("Data error"))
if(c0===b7)return b1
u=this.a
if(typeof u!=="number")return H.b(u)
u=1e5*u
if(b2>=u)throw H.l(new T.a8("Data Error"))
t=this.b
s=t.length
if(b2<0||b2>=s)return H.a(t,b2)
b2=t[b2]
c1=b2&255
b2=b2>>>8;++c0
if(c1!==c3){if(c6.a===c6.c.length)c6.dE()
u=c6.c
t=c6.a++
s=c3&255
if(t>>>0!==t||t>=u.length)return H.a(u,t)
u[t]=s
s=(b1>>>24&255^s)>>>0
if(s>=256)return H.a(C.o,s)
b1=((b1<<8^C.o[s])&4294967295)>>>0
c4=c1
b8=0
continue}if(c0===b7){if(c6.a===c6.c.length)c6.dE()
u=c6.c
t=c6.a++
s=c3&255
if(t>>>0!==t||t>=u.length)return H.a(u,t)
u[t]=s
s=(b1>>>24&255^s)>>>0
if(s>=256)return H.a(C.o,s)
b1=((b1<<8^C.o[s])&4294967295)>>>0
c4=c3
b8=0
continue}if(b2>=u)throw H.l(new T.a8("Data Error"))
if(b2>=s)return H.a(t,b2)
b2=t[b2]
c1=b2&255
b2=b2>>>8;++c0
if(c0===b7){c4=c3
b8=2
continue}if(c1!==c3){c4=c1
b8=2
continue}if(b2>=u)throw H.l(new T.a8("Data Error"))
if(b2>=s)return H.a(t,b2)
b2=t[b2]
c1=b2&255
b2=b2>>>8;++c0
if(c0===b7){c4=c3
b8=3
continue}if(c1!==c3){c4=c1
b8=3
continue}if(b2>=u)throw H.l(new T.a8("Data Error"))
if(b2>=s)return H.a(t,b2)
b2=t[b2]
b3=b2>>>8
b8=(b2&255)+4
if(b3>=u)throw H.l(new T.a8("Data Error"))
if(b3>=s)return H.a(t,b3)
b2=t[b3]
c4=b2&255
b2=b2>>>8
c0=c0+1+1}return b1},
hz:function(a){var z,y,x,w
z=this.dx
if(z===0){z=++this.dy
y=this.db
if(typeof y!=="number")return H.b(y)
if(z>=y)throw H.l(new T.a8("Data error"))
this.dx=50
y=this.y
y.length
if(z<0||z>=18002)return H.a(y,z)
z=y[z]
this.fr=z
y=this.cx
y.length
if(z>=6)return H.a(y,z)
this.fx=y[z]
this.fy=this.z[z]
this.go=this.ch[z]
this.id=this.Q[z]
z=50}this.dx=z-1
x=this.fx
w=a.Z(x)
for(;!0;){if(x>20)throw H.l(new T.a8("Data error"))
z=this.fy
z.length
if(x>>>0!==x||x>=258)return H.a(z,x)
if(w<=z[x])break;++x
w=(w<<1|a.Z(1))>>>0}z=this.id
z.length
if(x>>>0!==x||x>=258)return H.a(z,x)
z=w-z[x]
if(z<0||z>=258)throw H.l(new T.a8("Data error"))
y=this.go
y.length
if(z>>>0!==z||z>=258)return H.a(y,z)
return y[z]},
o_:function(a,b,c,d,e,f,g){var z,y,x,w,v,u
for(z=e,y=0;z<=f;++z)for(x=0;x<g;++x){d.length
if(x>=258)return H.a(d,x)
if(d[x]===z){c.length
if(y<0||y>=258)return H.a(c,y)
c[y]=x;++y}}for(z=0;z<23;++z)b[z]=0
for(z=0;z<g;++z){d.length
if(z>=258)return H.a(d,z)
w=d[z]+1
b.length
if(w>>>0!==w||w>=258)return H.a(b,w)
b[w]=b[w]+1}for(z=1;z<23;++z)b[z]=b[z]+b[z-1]
for(z=0;z<23;++z)a[z]=0
for(z=e,v=0;z<=f;z=u){u=z+1
b.length
if(u>>>0!==u||u>=258)return H.a(b,u)
w=b[u]
if(z>>>0!==z||z>=258)return H.a(b,z)
v+=w-b[z]
a[z]=v-1
v=v<<1>>>0}for(z=e+1;z<=f;++z){w=z-1
a.length
if(w>>>0!==w||w>=258)return H.a(a,w)
w=a[w]
b.length
if(z>>>0!==z||z>=258)return H.a(b,z)
b[z]=(w+1<<1>>>0)-b[z]}},
oj:function(){var z,y,x
this.k3=0
this.e=new Uint8Array(H.k(256))
for(z=0;z<256;++z)if(this.d[z]!==0){y=this.e
x=this.k3++
y.length
if(x>=256)return H.a(y,x)
y[x]=z}}},
l5:{
"^":"o;",
b6:function(a,b){var z,y,x,w,v
if(a.t()!==35615)throw H.l(new T.a8("Invalid GZip Signature"))
z=a.a
y=a.b
a.b=J.c(y,1)
x=J.D(z)
if(!J.i(x.h(z,y),8))throw H.l(new T.a8("Invalid GZip Compression Methos"))
y=a.b
a.b=J.c(y,1)
w=x.h(z,y)
a.q()
y=a.b
a.b=J.c(y,1)
x.h(z,y)
y=a.b
a.b=J.c(y,1)
x.h(z,y)
z=J.y(w)
if(z.T(w,4)!==0)a.aP(a.t())
if(z.T(w,8)!==0)a.dt()
if(z.T(w,16)!==0)a.dt()
if(z.T(w,2)!==0)a.t()
z=T.bh(C.z)
y=T.bh(C.F)
x=T.dI(0,null)
new T.dB(a,x,0,0,0,z,y).dJ()
y=x.c.buffer
v=(y&&C.e).ad(y,0,x.a)
if(b){if(a.q()!==T.c8(v,0))throw H.l(new T.a8("Invalid CRC checksum"))
if(a.q()!==v.length)throw H.l(new T.a8("Size of decompressed file not correct"))}return v}},
ui:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr",
gdY:function(a){var z=this.fr
if(z==null){z=this.dy.aD()
this.fr=z}return z},
K:function(a){return"["+H.m(this.a)+", "+H.m(this.b)+", "+H.m(this.e)+"]"},
cG:function(a,b){var z=this.cH(a,b)
if(z.length===0)return 0
return H.lS(z,8,null)},
cH:function(a,b){var z,y
z=a.aP(b)
y=z.qm(0,0)
return C.i.ld(P.dT(z.bQ(0,J.K(y,0)?null:y).aD(),0,null))}},
uh:{
"^":"o;ic:a>",
b6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=[]
y=this.a
C.c.sn(y,0)
for(x=a.c,w=J.w(x),v=a.a,u=J.D(v);!J.a7(a.b,w.j(x,a.e));){if(J.i(u.h(v,J.c(a.b,0)),0)&&J.i(u.h(v,J.c(a.b,1)),0))break
t=new T.ui(null,644,0,0,0,0,0,"0",null,"","","","",0,0,"",null,null)
s=a.bQ(J.h(a.b,x),512)
a.b=J.c(a.b,J.h(s.e,J.h(s.b,s.c)))
t.a=t.cH(s,100)
t.b=t.cG(s,8)
t.c=t.cG(s,8)
t.d=t.cG(s,8)
t.e=t.cG(s,12)
t.f=t.cG(s,12)
t.r=t.cG(s,8)
t.x=t.cH(s,1)
t.y=t.cH(s,100)
r=t.cH(s,6)
t.z=r
if(r==="ustar"){t.Q=t.cH(s,2)
t.ch=t.cH(s,32)
t.cx=t.cH(s,32)
t.cy=t.cG(s,8)
t.db=t.cG(s,8)}r=t.e
s=a.bQ(J.h(a.b,x),r)
a.b=J.c(a.b,J.h(s.e,J.h(s.b,s.c)))
t.dy=s
if(t.x!=="5"&&J.F(t.e,0)){q=J.bW(t.e,512)
if(q!==0){if(typeof q!=="number")return H.b(q)
a.b=J.c(a.b,512-q)}}y.push(t)
r=t.a
p=t.e
o=t.dy
n=new T.f2(r,p,null,0,0,null,!0,null,null,!0,0,null,null)
r=H.c7(o,"$isE",[P.x],"$asE")
if(r){n.cx=o
n.ch=T.b5(o,0,null,0)}else if(o instanceof T.el){r=o.a
p=o.b
m=o.c
l=o.e
n.ch=new T.el(r,p,m,o.d,l)}n.c=t.b
n.d=t.c
n.e=t.d
n.f=t.f
n.r=t.x!=="5"
z.push(n)}return new T.ku(z,null)}},
a8:{
"^":"o;a",
K:function(a){return"ArchiveException: "+this.a}},
el:{
"^":"o;am:a>,az:b*,c,d,e",
gn:function(a){return J.h(this.e,J.h(this.b,this.c))},
h:function(a,b){return J.e(this.a,J.c(this.b,b))},
bQ:function(a,b){a=a==null?this.b:J.c(a,this.c)
if(b==null||J.K(b,0))b=J.h(this.e,J.h(a,this.c))
return T.b5(this.a,this.d,b,a)},
qn:function(a,b,c){var z,y,x,w,v,u
for(z=J.c(this.b,c),y=this.b,x=this.c,w=J.y(y),v=w.j(y,J.h(this.e,w.l(y,x))),y=this.a,w=J.D(y);u=J.y(z),u.U(z,v);z=u.j(z,1))if(J.i(w.h(y,z),b))return u.l(z,x)
return-1},
qm:function(a,b){return this.qn(a,b,0)},
bO:function(a,b){this.b=J.c(this.b,b)},
aP:function(a){var z=this.bQ(J.h(this.b,this.c),a)
this.b=J.c(this.b,J.h(z.e,J.h(z.b,z.c)))
return z},
aj:function(a){var z,y,x,w,v,u,t
if(a==null){z=[]
for(y=this.c,x=J.w(y),w=this.a,v=J.D(w);!J.a7(this.b,x.j(y,this.e));){u=this.b
this.b=J.c(u,1)
t=v.h(w,u)
if(J.i(t,0))return P.dT(z,0,null)
z.push(t)}throw H.l(new T.a8("EOF reached without finding string terminator"))}return P.dT(this.aP(a).aD(),0,null)},
dt:function(){return this.aj(null)},
t:function(){var z,y,x,w,v
z=this.a
y=this.b
this.b=J.c(y,1)
x=J.D(z)
w=J.W(x.h(z,y),255)
y=this.b
this.b=J.c(y,1)
v=J.W(x.h(z,y),255)
if(this.d===1){if(typeof w!=="number")return w.u()
if(typeof v!=="number")return H.b(v)
return(w<<8|v)>>>0}if(typeof v!=="number")return v.u()
if(typeof w!=="number")return H.b(w)
return(v<<8|w)>>>0},
q:function(){var z,y,x,w,v,u,t
z=this.a
y=this.b
this.b=J.c(y,1)
x=J.D(z)
w=J.W(x.h(z,y),255)
y=this.b
this.b=J.c(y,1)
v=J.W(x.h(z,y),255)
y=this.b
this.b=J.c(y,1)
u=J.W(x.h(z,y),255)
y=this.b
this.b=J.c(y,1)
t=J.W(x.h(z,y),255)
if(this.d===1){if(typeof w!=="number")return w.u()
if(typeof v!=="number")return v.u()
if(typeof u!=="number")return u.u()
if(typeof t!=="number")return H.b(t)
return(w<<24|v<<16|u<<8|t)>>>0}if(typeof t!=="number")return t.u()
if(typeof u!=="number")return u.u()
if(typeof v!=="number")return v.u()
if(typeof w!=="number")return H.b(w)
return(t<<24|u<<16|v<<8|w)>>>0},
bE:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
y=this.b
this.b=J.c(y,1)
x=J.D(z)
w=J.W(x.h(z,y),255)
y=this.b
this.b=J.c(y,1)
v=J.W(x.h(z,y),255)
y=this.b
this.b=J.c(y,1)
u=J.W(x.h(z,y),255)
y=this.b
this.b=J.c(y,1)
t=J.W(x.h(z,y),255)
y=this.b
this.b=J.c(y,1)
s=J.W(x.h(z,y),255)
y=this.b
this.b=J.c(y,1)
r=J.W(x.h(z,y),255)
y=this.b
this.b=J.c(y,1)
q=J.W(x.h(z,y),255)
y=this.b
this.b=J.c(y,1)
p=J.W(x.h(z,y),255)
if(this.d===1){if(typeof w!=="number")return w.u()
z=C.a.W(w,56)
if(typeof v!=="number")return v.u()
y=C.a.W(v,48)
if(typeof u!=="number")return u.u()
x=C.a.W(u,40)
if(typeof t!=="number")return t.u()
o=C.a.W(t,32)
if(typeof s!=="number")return s.u()
if(typeof r!=="number")return r.u()
if(typeof q!=="number")return q.u()
if(typeof p!=="number")return H.b(p)
return(z|y|x|o|s<<24|r<<16|q<<8|p)>>>0}if(typeof p!=="number")return p.u()
z=C.a.W(p,56)
if(typeof q!=="number")return q.u()
y=C.a.W(q,48)
if(typeof r!=="number")return r.u()
x=C.a.W(r,40)
if(typeof s!=="number")return s.u()
o=C.a.W(s,32)
if(typeof t!=="number")return t.u()
if(typeof u!=="number")return u.u()
if(typeof v!=="number")return v.u()
if(typeof w!=="number")return H.b(w)
return(z|y|x|o|t<<24|u<<16|v<<8|w)>>>0},
aD:function(){var z,y,x,w
z=J.h(this.e,J.h(this.b,this.c))
y=this.a
x=J.O(y)
if(!!x.$iscp)return J.hk(x.gam(y),this.b,z)
w=this.b
return new Uint8Array(H.n(x.b5(y,w,J.c(w,z))))},
mn:function(a,b,c,d){this.e=c==null?J.a0(this.a):c
this.b=d},
E:function(a){return this.gn(this).$0()},
static:{b5:function(a,b,c,d){var z=J.O(a)
if(!!z.$isom){z=z.gam(a)
z=(z&&C.e).ad(z,0,null)}else z=a
z=new T.el(z,null,d,b,null)
z.mn(a,b,c,d)
return z}}},
lJ:{
"^":"o;n:a*,b,c",
eo:function(){var z=this.c.buffer
return(z&&C.e).ad(z,0,this.a)},
rp:function(a,b){var z,y,x,w
b=a.length
for(;z=this.a,y=z+b,x=this.c,w=x.length,y>w;)this.hv(y-w)
C.j.cC(x,z,y,a)
this.a+=b},
iB:function(a){return this.rp(a,null)},
rq:function(a){var z,y,x,w
z=a.c
while(!0){y=this.a
x=J.h(a.e,J.h(a.b,z))
if(typeof x!=="number")return H.b(x)
w=this.c
if(!(y+x>w.length))break
y=this.a
x=J.h(a.e,J.h(a.b,z))
if(typeof x!=="number")return H.b(x)
this.hv(y+x-this.c.length)}y=this.a
x=J.h(a.e,J.h(a.b,z))
if(typeof x!=="number")return H.b(x)
C.j.aH(w,y,y+x,a.a,a.b)
x=this.a
z=J.h(a.e,J.h(a.b,z))
if(typeof z!=="number")return H.b(z)
this.a=x+z},
bQ:function(a,b){var z
if(a<0)a=this.a+a
if(b==null)b=this.a
else if(b<0)b=this.a+b
z=this.c.buffer
return(z&&C.e).ad(z,a,b-a)},
eu:function(a){return this.bQ(a,null)},
hv:function(a){var z,y,x
z=a!=null?a>32768?a:32768:32768
y=this.c.length+z
if(typeof y!=="number"||Math.floor(y)!==y)H.T(P.aD("Invalid length "+H.m(y)))
x=new Uint8Array(y)
y=this.c
C.j.cC(x,0,y.length,y)
this.c=x},
dE:function(){return this.hv(null)},
E:function(a){return this.a.$0()},
static:{dI:function(a,b){return new T.lJ(0,a,new Uint8Array(H.k(b==null?32768:b)))}}},
v_:{
"^":"o;a,b,c,d,e,f,r,x,y",
p8:function(a){var z,y,x,w,v,u,t,s,r
z=a.b
y=a.bQ(J.h(this.a,20),20)
if(y.q()!==117853008){a.b=z
return}y.q()
x=y.bE()
y.q()
a.b=x
if(a.q()!==101075792){a.b=z
return}a.bE()
a.t()
a.t()
w=a.q()
v=a.q()
u=a.bE()
t=a.bE()
s=a.bE()
r=a.bE()
this.b=w
this.c=v
this.d=u
this.e=t
this.f=s
this.r=r
a.b=z},
nO:function(a){var z,y,x
z=a.b
for(y=J.h(J.h(a.e,J.h(z,a.c)),4);x=J.y(y),x.a0(y,0);y=x.l(y,1)){a.b=y
if(a.q()===101010256){a.b=z
return y}}throw H.l(new T.a8("Could not find End of Central Directory Record"))},
n4:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.nO(a)
this.a=z
a.b=z
a.q()
this.b=a.t()
this.c=a.t()
this.d=a.t()
this.e=a.t()
this.f=a.q()
this.r=a.q()
y=a.t()
if(y>0)this.x=a.aj(y)
this.p8(a)
x=a.bQ(this.r,this.f)
for(z=x.c,w=J.w(z),v=this.y;!J.a7(x.b,w.j(z,x.e));){if(x.q()!==33639248)break
u=new T.v3(0,0,0,0,0,0,null,null,null,null,null,null,null,"",[],"",null)
u.a=x.t()
u.b=x.t()
u.c=x.t()
u.d=x.t()
u.e=x.t()
u.f=x.t()
u.r=x.q()
u.x=x.q()
u.y=x.q()
t=x.t()
s=x.t()
r=x.t()
u.z=x.t()
u.Q=x.t()
u.ch=x.q()
q=x.q()
u.cx=q
if(t>0)u.cy=x.aj(t)
if(s>0){p=x.bQ(J.h(x.b,z),s)
x.b=J.c(x.b,J.h(p.e,J.h(p.b,p.c)))
u.db=p.aD()
o=p.t()
n=p.t()
if(o===1){if(n>=8)u.y=p.bE()
if(n>=16)u.x=p.bE()
if(n>=24){q=p.bE()
u.cx=q}if(n>=28)u.z=p.q()}}if(r>0)u.dx=x.aj(r)
a.b=q
u.dy=T.v2(a,u)
v.push(u)}},
static:{v0:function(a){var z=new T.v_(-1,0,0,0,0,null,null,"",[])
z.n4(a)
return z}}},
v1:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
gdY:function(a){var z,y,x,w
z=this.cy
if(z==null){z=this.d
y=this.cx
if(z===8){z=this.y
x=T.bh(C.z)
w=T.bh(C.F)
z=T.dI(0,z)
new T.dB(y,z,0,0,0,x,w).dJ()
w=z.c.buffer
z=(w&&C.e).ad(w,0,z.a)
this.cy=z
this.d=0}else{z=y.aD()
this.cy=z}}return z},
K:function(a){return this.z},
n5:function(a,b){var z,y,x,w
z=a.q()
this.a=z
if(z!==67324752)throw H.l(new T.a8("Invalid Zip Signature"))
this.b=a.t()
this.c=a.t()
this.d=a.t()
this.e=a.t()
this.f=a.t()
this.r=a.q()
this.x=a.q()
this.y=a.q()
y=a.t()
x=a.t()
this.z=a.aj(y)
this.Q=a.aP(x).aD()
this.cx=a.aP(this.ch.x)
if((this.c&8)!==0){w=a.q()
if(w===134695760)this.r=a.q()
else this.r=w
this.x=a.q()
this.y=a.q()}},
static:{v2:function(a,b){var z=new T.v1(67324752,0,0,0,0,0,null,null,null,"",[],b,null,null,null)
z.n5(a,b)
return z}}},
v3:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
K:function(a){return this.cy}},
uZ:{
"^":"o;a",
b6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=T.v0(a)
this.a=z
y=[]
for(z=z.y,x=z.length,w=0;w<z.length;z.length===x||(0,H.aw)(z),++w){v=z[w].dy
if(b)if(T.c8(v.gdY(v),0)!==v.r)throw H.l(new T.a8("Invalid CRC for file in archive."))
u=v.cy
u=u!=null?u:v.cx
t=new T.f2(v.z,v.y,null,0,0,null,!0,null,null,!0,v.d,null,null)
s=H.c7(u,"$isE",[P.x],"$asE")
if(s){t.cx=u
t.ch=T.b5(u,0,null,0)}else if(u instanceof T.el){s=u.a
r=u.b
q=u.c
p=u.e
t.ch=new T.el(s,r,q,u.d,p)}t.x=v.r
y.push(t)}return new T.ku(y,null)}},
pJ:{
"^":"o;a,b,c",
mg:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.length
for(y=0;y<z;++y){x=a[y]
if(x>this.b)this.b=x
if(x<this.c)this.c=x}w=C.a.W(1,this.b)
x=H.k(w)
v=new Uint32Array(x)
this.a=v
for(u=this.b,t=a.length,s=1,r=0,q=2;s<=u;){for(p=s<<16,y=0;y<z;++y){if(y>=t)return H.a(a,y)
if(a[y]===s){for(o=r,n=0,m=0;m<s;++m){n=(n<<1|o&1)>>>0
o=o>>>1}for(l=(p|y)>>>0,m=n;m<w;m+=q){if(m<0||m>=x)return H.a(v,m)
v[m]=l}++r}}++s
r=r<<1>>>0
q=q<<1>>>0}},
static:{bh:function(a){var z=new T.pJ(null,0,2147483647)
z.mg(a)
return z}}},
dB:{
"^":"o;a,b,c,d,e,f,r",
eo:function(){var z,y
z=this.b
y=z.c.buffer
return(y&&C.e).ad(y,0,z.a)},
dJ:function(){this.c=0
this.d=0
for(;this.ou(););},
ou:function(){var z,y,x,w,v
z=this.a
if(J.a7(z.b,J.c(z.c,z.e)))return!1
y=this.bx(3)
x=y>>>1
switch(x){case 0:this.c=0
this.d=0
w=this.bx(16)
if(w===~this.bx(16)>>>0)H.T(new T.a8("Invalid uncompressed block header"))
z=this.a
z=J.h(z.e,J.h(z.b,z.c))
if(typeof z!=="number")return H.b(z)
if(w>z)H.T(new T.a8("Input buffer is broken"))
z=this.a
v=z.bQ(J.h(z.b,z.c),w)
z.b=J.c(z.b,J.h(v.e,J.h(v.b,v.c)))
this.b.rq(v)
break
case 1:this.jg(this.f,this.r)
break
case 2:this.ov()
break
default:throw H.l(new T.a8("unknown BTYPE: "+x))}return(y&1)===0},
bx:function(a){var z,y,x,w
if(a===0)return 0
for(;z=this.d,z<a;){z=this.a
if(J.a7(z.b,J.c(z.c,z.e)))throw H.l(new T.a8("input buffer is broken"))
z=this.a
y=z.a
x=z.b
z.b=J.c(x,1)
w=J.e(y,x)
x=this.c
y=this.d
if(typeof w!=="number")return w.u()
this.c=(x|C.b.u(w,y))>>>0
this.d=y+8}y=this.c
x=C.a.W(1,a)
this.c=C.a.c5(y,a)
this.d=z-a
return(y&x-1)>>>0},
hM:function(a){var z,y,x,w,v,u,t,s
z=a.a
y=a.b
for(;this.d<y;){x=this.a
if(J.a7(x.b,J.c(x.c,x.e)))break
x=this.a
w=x.a
v=x.b
x.b=J.c(v,1)
u=J.e(w,v)
v=this.c
w=this.d
if(typeof u!=="number")return u.u()
this.c=(v|C.b.u(u,w))>>>0
this.d=w+8}x=this.c
w=(x&C.a.W(1,y)-1)>>>0
if(w>=z.length)return H.a(z,w)
t=z[w]
s=t>>>16
this.c=C.a.c5(x,s)
this.d-=s
return t&65535},
ov:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.bx(5)+257
y=this.bx(5)+1
x=this.bx(4)+4
w=H.k(19)
v=new Uint8Array(w)
for(u=0;u<x;++u){if(u>=19)return H.a(C.aw,u)
t=C.aw[u]
s=this.bx(3)
if(t>=w)return H.a(v,t)
v[t]=s}r=T.bh(v)
q=new Uint8Array(H.k(z))
p=new Uint8Array(H.k(y))
o=this.je(z,r,q)
n=this.je(y,r,p)
this.jg(T.bh(o),T.bh(n))},
jg:function(a,b){var z,y,x,w,v,u,t,s
for(z=this.b;!0;){y=this.hM(a)
if(y>285)throw H.l(new T.a8("Invalid Huffman Code "+y))
if(y===256)break
if(y<256){if(z.a===z.c.length)z.dE()
x=z.c
w=z.a++
if(w>>>0!==w||w>=x.length)return H.a(x,w)
x[w]=y&255&255
continue}v=y-257
if(v<0||v>=29)return H.a(C.at,v)
u=C.at[v]+this.bx(C.eC[v])
t=this.hM(b)
if(t<=29){if(t>=30)return H.a(C.ap,t)
s=C.ap[t]+this.bx(C.dD[t])
for(x=-s;u>s;){z.iB(z.eu(x))
u-=s}if(u===s)z.iB(z.eu(x))
else z.iB(z.bQ(x,u-s))}else throw H.l(new T.a8("Illegal unused distance symbol"))}for(;z=this.d,z>=8;){this.d=z-8
z=this.a
z.b=J.h(z.b,1)}},
je:function(a,b,c){var z,y,x,w,v,u,t
for(z=c.length,y=0,x=0;x<a;){w=this.hM(b)
switch(w){case 16:v=3+this.bx(2)
for(;u=v-1,v>0;v=u,x=t){t=x+1
if(x<0||x>=z)return H.a(c,x)
c[x]=y}break
case 17:v=3+this.bx(3)
for(;u=v-1,v>0;v=u,x=t){t=x+1
if(x<0||x>=z)return H.a(c,x)
c[x]=0}y=0
break
case 18:v=11+this.bx(7)
for(;u=v-1,v>0;v=u,x=t){t=x+1
if(x<0||x>=z)return H.a(c,x)
c[x]=0}y=0
break
default:if(w>15)throw H.l(new T.a8("Invalid Huffman Code: "+w))
t=x+1
if(x<0||x>=z)return H.a(c,x)
c[x]=w
x=t
y=w
break}}return c},
mm:function(a,b){this.dJ()},
static:{pU:function(a,b){var z,y
z=T.bh(C.z)
y=T.bh(C.F)
y=new T.dB(T.b5(a,0,null,0),T.dI(0,b),0,0,0,z,y)
y.mm(a,b)
return y}}},
di:{
"^":"o;",
b6:function(a,b){var z,y,x,w,v,u,t,s
z=a.a
y=a.b
a.b=J.c(y,1)
x=J.D(z)
w=x.h(z,y)
y=a.b
a.b=J.c(y,1)
v=x.h(z,y)
u=J.y(w).T(w,8)
if(typeof w!=="number")return w.D()
C.b.p(w,3)
if(u!==8)throw H.l(new T.a8("Only DEFLATE compression supported: "+H.m(u)))
z=J.y(v)
z.T(v,16)
y=z.T(v,32)
if(typeof y!=="number")return y.D()
z=z.T(v,64)
if(typeof z!=="number")return z.D()
if(typeof v!=="number")return H.b(v)
if(C.b.R((w<<8>>>0)+v,31)!==0)throw H.l(new T.a8("Invalid FCHECK"))
if(y>>>5!==0){a.q()
throw H.l(new T.a8("FDICT Encoding not currently supported"))}z=T.bh(C.z)
y=T.bh(C.F)
x=T.dI(0,null)
new T.dB(a,x,0,0,0,z,y).dJ()
y=x.c.buffer
t=(y&&C.e).ad(y,0,x.a)
s=a.q()
if(b)if(s!==T.x2(t,1))throw H.l(new T.a8("Invalid adler-32 checksum"))
return t}}}],["","",,K,{
"^":"",
hJ:{
"^":"bp;a,b,c,d",
em:function(a,b){var z,y,x,w,v
z=a.b
if(typeof z!=="number")return H.b(z)
y=this.d
x=3.141592653589793*z/y.b
z=a.a
if(typeof z!=="number")return H.b(z)
w=6.283185307179586*z/y.a
v=G.B(Math.sin(H.v(x))*Math.cos(H.v(w)),Math.cos(H.v(x)),Math.sin(H.v(x))*Math.sin(H.v(w)))
y=new G.j(new Float32Array(H.k(3)))
y.C(0,0,0)
b.cA(y,v,0,1/0,a.e)
this.a.aK(b,b)
return 1},
static:{zU:[function(a,b,c){var z,y,x,w,v,u,t
z=a.m("shutteropen",0)
y=a.m("shutterclose",1)
if(J.K(y,z)){x="Shutter close time ["+H.m(y)+"] < shutter open ["+H.m(z)+"]. Swapping them."
$.t.$2(1,x)
w=y
y=z
z=w}v=a.m("frameaspectratio",c.gfe()/c.b)
u=a.bA("screenwindow")
if(u!=null&&J.i(J.a0(u),4));else{t=[0,0,0,0]
x=J.y(v)
if(x.a0(v,1)){t[0]=x.a2(v)
t[1]=v
t[2]=-1
t[3]=1}else{t[0]=-1
t[1]=1
if(typeof v!=="number")return H.b(v)
t[2]=-1/v
t[3]=1/v}}return new K.hJ(b,z,y,c)},"$3","wL",6,0,58]}},
iJ:{
"^":"lU;Q,ch,e,f,r,x,y,z,a,b,c,d",
em:function(a,b){var z,y,x,w,v,u,t,s,r
z=a.a
y=a.b
x=new G.j(new Float32Array(H.k(3)))
x.C(z,y,0)
w=new G.j(new Float32Array(H.k(3)))
w.C(0,0,0)
this.f.bI(x,w)
b.cA(w,G.B(0,0,1),0,1/0,a.e)
z=this.y
if(J.F(z,0)){v=[0]
u=[0]
G.cx(a.c,a.d,v,u)
y=v[0]
if(typeof z!=="number")return H.b(z)
v[0]=y*z
u[0]=u[0]*z
t=J.G(this.z,J.P(b.b))
z=new Float32Array(H.n(b.a.j(0,J.d(b.b,t)).a))
y=v[0]
s=u[0]
r=new G.j(new Float32Array(H.k(3)))
r.C(y,s,0)
b.a=r
r=new G.j(z).l(0,r)
b.b=r.w(0,r.E(0))}this.a.aK(b,b)
return 1},
en:function(a,b){var z,y,x,w,v,u,t,s,r
z=a.a
y=a.b
x=new G.j(new Float32Array(H.k(3)))
x.C(z,y,0)
w=new G.j(new Float32Array(H.k(3)))
w.C(0,0,0)
this.f.bI(x,w)
b.cA(w,G.B(0,0,1),0,1/0,a.e)
z=this.y
if(J.F(z,0)){v=[0]
u=[0]
G.cx(a.c,a.d,v,u)
y=v[0]
if(typeof z!=="number")return H.b(z)
v[0]=y*z
u[0]=u[0]*z
t=J.G(this.z,J.P(b.b))
z=new Float32Array(H.n(b.a.j(0,J.d(b.b,t)).a))
y=v[0]
s=u[0]
r=new G.j(new Float32Array(H.k(3)))
r.C(y,s,0)
b.a=r
r=new G.j(z).l(0,r)
b.b=r.w(0,r.E(0))}b.x=b.a.j(0,this.Q)
b.y=b.a.j(0,this.ch)
z=b.b
b.Q=z
b.z=z
b.r=!0
this.a.aK(b,b)
return 1},
static:{Bj:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=a.m("shutteropen",0)
y=a.m("shutterclose",1)
if(J.K(y,z)){x="Shutter close time ["+H.m(y)+"] < shutter open ["+H.m(z)+"].  Swapping them."
$.t.$2(1,x)
w=y
y=z
z=w}v=a.m("lensradius",0)
u=a.m("focaldistance",1e30)
t=a.m("frameaspectratio",c.gfe()/c.b)
s=a.bA("screenwindow")
if(s!=null&&J.i(J.a0(s),4))r=s
else{r=[0,0,0,0]
x=J.y(t)
if(x.a0(t,1)){r[0]=x.a2(t)
r[1]=t
r[2]=-1
r[3]=1}else{r[0]=-1
r[1]=1
if(typeof t!=="number")return H.b(t)
r[2]=-1/t
r[3]=1/t}}x=G.eH(1,1,1).i(0,G.cQ(G.B(0,0,-0.0)))
q=new K.iJ(null,null,x,null,null,null,v,u,b,z,y,c)
q.iW(b,x,r,z,y,v,u,c)
q.Q=q.f.ag(G.B(1,0,0))
q.ch=q.f.ag(G.B(0,1,0))
return q},"$3","wM",6,0,59]}},
iN:{
"^":"lU;Q,ch,e,f,r,x,y,z,a,b,c,d",
em:function(a,b){var z,y,x,w,v,u,t,s,r
z=a.a
y=a.b
x=new G.j(new Float32Array(H.k(3)))
x.C(z,y,0)
w=new G.j(new Float32Array(H.k(3)))
w.C(0,0,0)
this.f.bI(x,w)
y=new G.j(new Float32Array(H.k(3)))
y.C(0,0,0)
b.a=y
b.b=w.w(0,w.E(0))
b.c=0
b.d=1/0
z=this.y
if(J.F(z,0)){v=[0]
u=[0]
G.cx(a.c,a.d,v,u)
y=v[0]
if(typeof z!=="number")return H.b(z)
v[0]=y*z
u[0]=u[0]*z
t=J.G(this.z,J.P(b.b))
z=new Float32Array(H.n(b.a.j(0,J.d(b.b,t)).a))
y=v[0]
s=u[0]
r=new G.j(new Float32Array(H.k(3)))
r.C(y,s,0)
b.a=r
r=new G.j(z).l(0,r)
b.b=r.w(0,r.E(0))}b.e=a.e
this.a.aK(b,b)
return 1},
en:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.a
y=a.b
x=new G.j(new Float32Array(H.k(3)))
x.C(z,y,0)
w=new G.j(new Float32Array(H.k(3)))
w.C(0,0,0)
this.f.bI(x,w)
v=w.w(0,w.E(0))
y=new G.j(new Float32Array(H.k(3)))
y.C(0,0,0)
b.a=y
b.b=v
b.c=0
b.d=1/0
z=this.y
if(J.F(z,0)){u=[0]
t=[0]
G.cx(a.c,a.d,u,t)
y=u[0]
if(typeof z!=="number")return H.b(z)
u[0]=y*z
t[0]=t[0]*z
s=J.G(this.z,J.P(b.b))
z=new Float32Array(H.n(b.a.j(0,J.d(b.b,s)).a))
y=u[0]
r=t[0]
q=new G.j(new Float32Array(H.k(3)))
q.C(y,r,0)
b.a=q
q=new G.j(z).l(0,q)
b.b=q.w(0,q.E(0))}b.x=new G.j(new Float32Array(H.n(b.a.a)))
b.y=new G.j(new Float32Array(H.n(b.a.a)))
z=w.j(0,this.Q)
b.z=z.w(0,z.E(0))
z=w.j(0,this.ch)
b.Q=z.w(0,z.E(0))
b.e=a.e
this.a.fc(b,b)
b.r=!0
return 1},
static:{Bp:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=a.m("shutteropen",0)
y=a.m("shutterclose",1)
if(J.K(y,z)){x="Shutter close time ["+H.m(y)+"] < shutter open ["+H.m(z)+"].  Swapping them."
$.t.$2(1,x)
w=y
y=z
z=w}v=a.m("lensradius",0)
u=a.m("focaldistance",1e30)
t=a.m("frameaspectratio",c.gfe()/c.b)
s=a.bA("screenwindow")
if(s!=null&&J.i(J.a0(s),4))r=s
else{r=[0,0,0,0]
x=J.y(t)
if(x.a0(t,1)){r[0]=x.a2(t)
r[1]=t
r[2]=-1
r[3]=1}else{r[0]=-1
r[1]=1
if(typeof t!=="number")return H.b(t)
r[2]=-1/t
r[3]=1/t}}q=a.m("fov",60)
p=a.m("halffov",-1)
if(J.F(p,0)){if(typeof p!=="number")return H.b(p)
q=2*p}x=G.mt(q,0.01,1000)
o=new K.iN(null,null,x,null,null,null,v,u,b,z,y,c)
o.iW(b,x,r,z,y,v,u,c)
x=o.f
n=new G.j(new Float32Array(H.k(3)))
n.C(1,0,0)
n=x.a1(n)
x=o.f
m=new G.j(new Float32Array(H.k(3)))
m.C(0,0,0)
o.Q=n.l(0,x.a1(m))
m=o.f
x=new G.j(new Float32Array(H.k(3)))
x.C(0,1,0)
x=m.a1(x)
m=o.f
n=new G.j(new Float32Array(H.k(3)))
n.C(0,0,0)
o.ch=x.l(0,m.a1(n))
return o},"$3","wN",6,0,60]}}}],["","",,G,{
"^":"",
pi:function(a){var z=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
new G.pj(a,z).$1(null)
return z.a},
fd:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p
z=J.w(b)
y=d
x=1
while(!0){if(J.y(y).T(y,1)===0){if(typeof a!=="number")return H.b(a)
w=z.i(b,y)
if(typeof w!=="number")return H.b(w)
w=2*a*x<w}else w=!1
if(!w)break
if(typeof y!=="number")return y.D()
y=C.b.p(y,1)
x=x<<1>>>0}v=J.y(c).R(c,y)
if(typeof c!=="number")return c.ar()
if(typeof y!=="number")return H.b(y)
u=C.b.ar(c,y)
if(typeof v!=="number")return v.w()
t=v/y
s=(v+1)/y
r=u/x
q=(u+1)/x
w=J.w(a)
p=w.i(a,t)
if(typeof p!=="number")return H.b(p)
p=C.b.X(0*(1-t)+p)
if(0>=e.length)return H.a(e,0)
e[0]=p
w=w.i(a,s)
if(typeof w!=="number")return H.b(w)
w=P.X(C.b.X(0*(1-s)+w),a)
if(1>=e.length)return H.a(e,1)
e[1]=w
w=z.i(b,r)
if(typeof w!=="number")return H.b(w)
w=C.b.X(0*(1-r)+w)
if(2>=e.length)return H.a(e,2)
e[2]=w
z=z.i(b,q)
if(typeof z!=="number")return H.b(z)
z=P.X(C.b.X(0*(1-q)+z),b)
if(3>=e.length)return H.a(e,3)
e[3]=z},
aX:function(a){a=J.h(a,1)
if(typeof a!=="number")return a.D()
a|=C.b.p(a,1)
a|=a>>>2
a|=a>>>4
a|=a>>>8
return((a|a>>>16)>>>0)+1},
me:function(a,b,c){var z=C.d.v((c-a)/(b-a),0,1)
return z*z*(-2*z+3)},
c3:function(a,b,c,d,e){var z,y,x,w,v
if(typeof a!=="number")return H.b(a)
z=b*b-4*a*c
if(z<0)return!1
y=Math.sqrt(H.v(z))
x=b<0?-0.5*(b-y):-0.5*(b+y)
d[0]=x/a
w=c/x
if(0>=e.length)return H.a(e,0)
e[0]=w
if(J.F(d[0],w)){v=d[0]
if(0>=e.length)return H.a(e,0)
d[0]=e[0]
e[0]=v}return!0},
j7:function(a,b,c,d){var z=J.h(J.d(a[0],a[3]),J.d(a[1],a[2]))
if(J.K(J.af(z),1e-10))return!1
c[0]=J.G(J.h(J.d(a[3],b[0]),J.d(a[1],b[1])),z)
d[0]=J.G(J.h(J.d(a[0],b[1]),J.d(a[2],b[0])),z)
if(J.dv(c[0])||J.dv(d[0]))return!1
return!0},
eA:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=P.dT(a,0,null)
y=z.length
x=new G.t1(48,57)
w=new G.t2()
v=[]
for(u=0,t=!1,s="",r=0;u<y;){q=u+1
if(u<0)return H.a(z,u)
p=z[u]
if(p==="\n")++r
if(t){if(x.$1(p)===!0||p==="."||p==="e"||p==="-"||p==="+"){s+=p
t=!0}else{v.push(H.c2(s,null))
t=!1
s=""}u=q}else if(x.$1(p)===!0||p==="."||p==="-"||p==="+"){s+=p
u=q
t=!0}else{if(p==="#"){u=q
while(!0){q=u+1
if(u<0||u>=y)return H.a(z,u)
if(!(z[u]!=="\n"&&q<y))break
u=q}++r
u=q}else{if(w.$1(p)!==!0){o="Unexpected text found at line "+r+" of float file "+H.m(b)+": "+p
$.t.$2(1,o)}u=q}t=!1}}return v},
De:[function(a,b){return J.nQ(a,b)<0},"$2","nv",4,0,35],
kj:function(a,b,c,d){var z,y
for(z=a.length;c<d;){while(!0){if(c<0||c>=z)return H.a(a,c)
if(!(b.$1(a[c])===!0))break;++c
if(c===d)return c}do{--d
if(c===d)return c
if(d<0||d>=z)return H.a(a,d)}while(b.$1(a[d])!==!0)
y=a[c]
a[c]=a[d]
a[d]=y;++c}return c},
eY:function(a,b,c,d,e){var z,y,x,w,v
z=C.c.b5(a,b,d)
C.c.iN(z,new G.yi(e))
for(y=a.length,x=b,w=0;J.K(x,d);++x,++w){if(w>=z.length)return H.a(z,w)
v=z[w]
if(x>>>0!==x||x>=y)return H.a(a,x)
a[x]=v}},
nL:function(a,b,c,d,e){var z,y,x,w
if((a&&C.w).ga6(a))return-1
z=a.length
if(z===1)return 0
if(e==null)e=z
for(y=e;J.y(y).a0(y,0);){if(typeof y!=="number")return y.D()
x=C.b.p(y,1)
w=d+x
if(w<0||w>=z)return H.a(a,w)
if(c.$2(b,a[w])!==!0){++w
y-=x+1
d=w}else y=x}return d},
y5:function(a,b,c){var z,y,x,w
z=J.y(c)
if(J.K(z.l(c,b),2))return
y=z.l(c,b)
x=J.ac(J.h(y,2),2)
for(z=a.length;!0;){if(typeof x!=="number")return H.b(x)
w=b+x
if(w<0||w>=z)return H.a(a,w)
G.ni(a,b,x,y,a[w])
if(x===0)return;--x}},
ni:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
if(typeof c!=="number")return H.b(c)
z=2*c+2
if(typeof d!=="number")return H.b(d)
y=a.length
x=c
for(;z<d;x=z,z=v){w=b+z
if(w>>>0!==w||w>=y)return H.a(a,w)
w=a[w]
v=z-1
u=b+v
if(u>>>0!==u||u>=y)return H.a(a,u)
u=a[u]
t=w.b
s=u.b
r=J.O(t)
if(r.B(t,s)?J.K(J.aS(w.a),J.aS(u.a)):r.U(t,s))z=v
w=b+x
u=b+z
if(u>>>0!==u||u>=y)return H.a(a,u)
u=a[u]
if(w>>>0!==w||w>=y)return H.a(a,w)
a[w]=u
v=2*(z+1)}if(z===d){w=b+x
x=z-1
u=b+x
if(u>>>0!==u||u>=y)return H.a(a,u)
u=a[u]
if(w>>>0!==w||w>=y)return H.a(a,w)
a[w]=u}G.nl(a,b,x,c,e)},
nl:function(a,b,c,d,e){var z,y,x,w,v,u,t
z=J.ac(J.h(c,1),2)
y=a.length
while(!0){if(J.F(c,d)){if(typeof z!=="number")return H.b(z)
x=b+z
if(x<0||x>=y)return H.a(a,x)
x=a[x]
w=x.b
v=e.b
u=J.O(w)
x=u.B(w,v)?J.K(J.aS(x.a),J.aS(e.a)):u.U(w,v)}else x=!1
if(!x)break
if(typeof c!=="number")return H.b(c)
x=b+c
if(typeof z!=="number")return H.b(z)
w=b+z
if(w<0||w>=y)return H.a(a,w)
w=a[w]
if(x>>>0!==x||x>=y)return H.a(a,x)
a[x]=w
t=C.a.al(z-1,2)
c=z
z=t}if(typeof c!=="number")return H.b(c)
x=b+c
if(x>>>0!==x||x>=y)return H.a(a,x)
a[x]=e},
dE:function(a,b,c,d,e,f,g,h,i,j,k,l){var z,y,x,w,v,u,t,s,r,q,p
z=G.q(0)
for(y=a.b,x=k!=null,w=l!=null,v=0;v<y.length;++v){u=y[v]
if(x){if(v>=k.length)return H.a(k,v)
t=k[v].a}else t=1
s=G.q(0)
if(typeof t!=="number")return H.b(t)
r=0
for(;r<t;++r){if(x&&w){if(v>=k.length)return H.a(k,v)
q=G.lp(i,k[v],r)
if(v>=l.length)return H.a(l,v)
p=G.dx(i,l[v],r)}else{q=G.im(j)
p=G.ca(j)}s=s.j(0,G.fh(a,b,u,c,d,e,f,g,h,j,q,p,15))}z=z.j(0,s.w(0,C.b.dw(t)))}return z},
fi:function(a,b,c,d,e,f,g,h,i,j,k,l,m){var z,y,x,w,v,u
z=a.b
y=z.length
if(y===0)return G.q(0)
x=k!==-1?J.a_(J.d(J.e(J.e(i.gdq(),k),0),y)):C.b.I(Math.floor(j.bZ()*y))
x=P.X(x,y-1)
if(x>>>0!==x||x>=z.length)return H.a(z,x)
w=z[x]
if(l!=null&&m!=null){v=G.lp(i,l,0)
u=G.dx(i,m,0)}else{v=G.im(j)
u=G.ca(j)}return G.fh(a,b,w,c,d,e,f,g,h,j,v,u,15).i(0,y)},
fh:function(a,b,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=G.q(0)
y=new Float32Array(3)
x=new G.r(y)
if(0>=3)return H.a(y,0)
y[0]=0
if(1>=3)return H.a(y,1)
y[1]=0
if(2>=3)return H.a(y,2)
y[2]=0
w=[0]
v=[0]
u=new G.eO(null)
t=a0.bL(a1,a4,a8,a5,x,w,u)
if(w[0]>0&&!t.Y()){s=a6.i5(a3,x,b0)
if(!s.Y()){r=a.a.a5(u.a)
q=$.$get$az()
q.c=J.c(q.c,1)
$.az=q
q=!r}else q=!1
if(q){q=u.a
p=new Float32Array(3)
if(0>=3)return H.a(p,0)
p[0]=0
if(1>=3)return H.a(p,1)
p[1]=0
if(2>=3)return H.a(p,2)
p[2]=0
o=new Float32Array(3)
if(0>=3)return H.a(o,0)
o[0]=0
if(1>=3)return H.a(o,1)
o[1]=0
if(2>=3)return H.a(o,2)
o[2]=0
n=new Float32Array(3)
if(0>=3)return H.a(n,0)
n[0]=0
if(1>=3)return H.a(n,1)
n[1]=0
if(2>=3)return H.a(n,2)
n[2]=0
m=new Float32Array(3)
if(0>=3)return H.a(m,0)
m[0]=0
if(1>=3)return H.a(m,1)
m[1]=0
if(2>=3)return H.a(m,2)
m[2]=0
l=new Float32Array(H.n(q.a.a))
k=new Float32Array(H.n(J.N(q.b)))
j=q.c
i=q.d
h=q.e
q=q.f
l=new G.j(new Float32Array(H.n(l)))
k=new G.r(new Float32Array(H.n(k)))
t=J.d(t,b.bj(a,new G.as(!1,new G.j(p),new G.j(o),new G.r(n),new G.r(m),l,k,j,i,h,q),null,a7))
if(a0.cO()){q=s.i(0,t)
p=G.aq(x,a2)
o=w[0]
if(typeof p!=="number")return p.w()
z=z.j(0,q.i(0,p/o))}else{q=a6.kX(a3,x,b0)
if(0>=v.length)return H.a(v,0)
v[0]=q
g=G.fx(1,w[0],1,q)
q=s.i(0,t)
p=J.d(G.aq(x,a2),g)
o=w[0]
if(typeof p!=="number")return p.w()
z=z.j(0,q.i(0,p/o))}}}if(!a0.cO()){f=[0]
s=a6.d3(a3,x,a9,v,b0,f)
if(!s.Y()){if(0>=v.length)return H.a(v,0)
q=J.F(v[0],0)}else q=!1
if(q){q=f[0]
if(typeof q!=="number")return q.T()
if((q&16)===0){q=a0.ao(a1,x)
w[0]=q
if(q===0)return z
if(0>=v.length)return H.a(v,0)
g=G.fx(1,v[0],1,q)}else g=1
e=new G.b0(G.ag(),null,null,null,0,0,0)
t=G.q(0)
q=new Float32Array(3)
if(0>=3)return H.a(q,0)
q[0]=0
if(1>=3)return H.a(q,1)
q[1]=0
if(2>=3)return H.a(q,2)
q[2]=0
p=new Float32Array(3)
if(0>=3)return H.a(p,0)
p[0]=0
if(1>=3)return H.a(p,1)
p[1]=0
if(2>=3)return H.a(p,2)
p[2]=0
o=new Float32Array(3)
if(0>=3)return H.a(o,0)
o[0]=0
if(1>=3)return H.a(o,1)
o[1]=0
if(2>=3)return H.a(o,2)
o[2]=0
n=new Float32Array(3)
if(0>=3)return H.a(n,0)
n[0]=0
if(1>=3)return H.a(n,1)
n[1]=0
if(2>=3)return H.a(n,2)
n[2]=0
m=new G.j(new Float32Array(H.n(a1.a)))
l=new G.r(new Float32Array(H.n(y)))
d=new G.as(!1,new G.j(q),new G.j(p),new G.r(o),new G.r(n),m,l,a4,1/0,a5,0)
r=a.a.ae(d,e)
q=$.$get$ay()
q.c=J.c(q.c,1)
$.ay=q
if(r){if(J.i(e.b.d,a0)){q=y[0]
p=y[1]
y=y[2]
o=new Float32Array(3)
if(0>=3)return H.a(o,0)
o[0]=-q
if(1>=3)return H.a(o,1)
o[1]=-p
if(2>=3)return H.a(o,2)
o[2]=-y
c=e.b.d
if(c!=null){y=e.a
t=c.d6(y.a,y.b,new G.r(o))}else t=G.q(0)}}else t=a0.aS(d)
if(!t.Y()){y=s.i(0,t.i(0,b.bj(a,d,null,a7)))
q=J.d(G.aq(x,a2),g)
if(0>=v.length)return H.a(v,0)
p=v[0]
if(typeof q!=="number")return q.w()
if(typeof p!=="number")return H.b(p)
z=z.j(0,y.i(0,q/p))}}}return z},
dC:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=J.M(a.b)
y=G.B(0,0,0)
x=[0]
w=b.a
v=w.a
u=w.b
t=b.b3(z,y,G.ca(c),x,17)
s=G.q(0)
if(0>=x.length)return H.a(x,0)
if(J.F(x[0],0)&&!t.Y()&&!J.i(G.aq(y,u),0)){r=d.r
q=new G.j(new Float32Array(H.k(3)))
q.C(0,0,0)
p=new G.j(new Float32Array(H.k(3)))
p.C(0,0,0)
o=new G.as(!1,q,p,G.B(0,0,0),G.B(0,0,0),new G.j(new Float32Array(H.n(v.a))),new G.r(new Float32Array(H.n(y.a))),r,1/0,a.e,a.f+1)
if(a.r){o.r=!0
o.x=v.j(0,d.a.z)
o.y=v.j(0,d.a.Q)
n=w.x.i(0,w.ch).j(0,w.y.i(0,w.cx))
m=w.x.i(0,w.cy).j(0,w.y.i(0,w.db))
l=J.h(J.M(a.z),z)
k=J.h(J.M(a.Q),z)
j=J.c(G.J(l,u),G.J(z,n))
i=J.c(G.J(k,u),G.J(z,m))
w=J.w(u)
o.z=y.l(0,l).j(0,new G.r(new Float32Array(H.n(n.i(0,G.J(z,u)).j(0,w.i(u,j)).a))).i(0,2))
o.Q=y.l(0,k).j(0,new G.r(new Float32Array(H.n(m.i(0,G.J(z,u)).j(0,w.i(u,i)).a))).i(0,2))}w=$.$get$jj()
w.c=J.c(w.c,1)
$.jj=w
w=J.d(t,e.ew(f,o,g,c))
r=G.aq(y,u)
if(0>=x.length)return H.a(x,0)
q=x[0]
if(typeof r!=="number")return r.w()
if(typeof q!=="number")return H.b(q)
s=J.d(w,r/q)}return s},
dD:function(a,b,c,a0,a1,a2,a3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=J.M(a.b)
y=G.B(0,0,0)
x=[0]
w=b.a
v=w.a
u=w.b
t=b.b3(z,y,G.ca(c),x,18)
s=G.q(0)
if(0>=x.length)return H.a(x,0)
if(J.F(x[0],0)&&!t.Y()&&!J.i(G.aq(y,u),0)){r=a0.r
q=new G.j(new Float32Array(H.k(3)))
q.C(0,0,0)
p=new G.j(new Float32Array(H.k(3)))
p.C(0,0,0)
o=new G.as(!1,q,p,G.B(0,0,0),G.B(0,0,0),new G.j(new Float32Array(H.n(v.a))),new G.r(new Float32Array(H.n(y.a))),r,1/0,a.e,a.f+1)
if(a.r){o.r=!0
o.x=v.j(0,a0.a.z)
o.y=v.j(0,a0.a.Q)
n=b.b
m=J.M(z)
if(J.K(G.J(z,u),0)){if(typeof n!=="number")return H.b(n)
n=1/n}l=w.x.i(0,w.ch).j(0,w.y.i(0,w.cx))
k=w.x.i(0,w.cy).j(0,w.y.i(0,w.db))
j=J.h(J.M(a.z),z)
i=J.h(J.M(a.Q),z)
h=J.c(G.J(j,u),G.J(z,l))
g=J.c(G.J(i,u),G.J(z,k))
w=J.w(n)
f=J.h(w.i(n,G.J(m,u)),G.J(y,u))
e=J.d(w.l(n,J.G(J.d(w.i(n,n),G.J(m,u)),G.J(y,u))),h)
d=J.d(w.l(n,J.G(J.d(w.i(n,n),G.J(m,u)),G.J(y,u))),g)
w=J.w(u)
o.z=y.j(0,J.d(j,n)).l(0,new G.r(new Float32Array(H.n(l.i(0,f).j(0,w.i(u,e)).a))))
o.Q=y.j(0,J.d(i,n)).l(0,new G.r(new Float32Array(H.n(k.i(0,f).j(0,w.i(u,d)).a))))}w=$.$get$jk()
w.c=J.c(w.c,1)
$.jk=w
w=J.d(t,a1.ew(a2,o,a3,c))
r=G.aq(y,u)
if(0>=x.length)return H.a(x,0)
q=x[0]
if(typeof r!=="number")return r.w()
if(typeof q!=="number")return H.b(q)
s=J.d(w,r/q)}return s},
i7:function(a){var z,y,x,w,v,u
z=a.b
y=z.length
x=H.k(y)
w=new Float32Array(x)
for(v=0;v<y;++v){if(v>=z.length)return H.a(z,v)
u=z[v].ds(a).aC()
if(v>=x)return H.a(w,v)
w[v]=u}return G.f6(w,y)},
Bv:[function(a,b){if(a>=5)return H.a(C.Q,a)
P.hj(C.Q[a]+": "+H.m(b))
if(a===3)throw H.l(P.ee(b))},"$2","wV",4,0,21],
bG:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=new Float32Array(H.n(c.a.a))
y=new Float32Array(H.n(J.N(c.b)))
x=c.c
w=c.d
v=c.e
u=new Float32Array(H.n(J.N(c.f)))
t=new Float32Array(H.n(J.N(c.r)))
s=new Float32Array(H.n(c.x.a))
r=new Float32Array(H.n(c.y.a))
q=new Float32Array(H.n(c.z.a))
p=new Float32Array(H.n(c.Q.a))
o=c.ch
n=new G.kP(new G.j(z),new G.a1(y),x,w,v,new G.r(u),new G.r(t),new G.a1(s),new G.a1(r),new G.r(q),new G.r(p),o,c.cx,c.cy,c.db)
o=J.c(J.af(o),J.af(c.cy))
if(typeof o!=="number")return H.b(o)
m=0.5*o
if(m===0)m=0.01
n.a=c.a.j(0,J.d(c.f,m))
n.c=c.c+m
z=new G.a1(new Float32Array(H.n(G.aF(c.f,c.r).j(0,c.x.i(0,m)).a)))
z.cq(Math.sqrt(H.v(z.a_())))
n.b=z
l=a.J(n)
z=J.c(J.af(c.cx),J.af(c.db))
if(typeof z!=="number")return H.b(z)
k=0.5*z
if(k===0)k=0.01
n.a=c.a.j(0,J.d(c.r,k))
n.c=c.c
n.d=c.d+k
z=new G.a1(new Float32Array(H.n(G.aF(c.f,c.r).j(0,c.y.i(0,k)).a)))
z.cq(Math.sqrt(H.v(z.a_())))
n.b=z
j=a.J(n)
i=a.J(c)
d.L(c)
d.f=J.c(J.c(c.f,new G.r(new Float32Array(H.n(J.N(c.b)))).i(0,J.h(l,i)).w(0,m)),new G.r(new Float32Array(H.n(c.x.a))).i(0,i))
z=J.c(J.c(c.r,new G.r(new Float32Array(H.n(J.N(c.b)))).i(0,J.h(j,i)).w(0,k)),new G.r(new Float32Array(H.n(c.y.a))).i(0,i))
d.r=z
z=G.aF(d.f,z)
d.b=new G.a1(new Float32Array(H.n(z.w(0,z.E(0)).a)))
z=c.e
y=z.c
if((y===!0||z.d)&&!J.i(y,z.d))d.b=J.d(d.b,-1)
d.b=G.eu(d.b,b.b)},
bv:function(a,b){var z,y,x,w,v,u
if(typeof a!=="number")return H.b(a)
z=1-2*a
y=P.I(0,1-z*z)
x=Math.sqrt(y)
if(typeof b!=="number")return H.b(b)
w=6.283185307179586*b
y=Math.cos(w)
v=Math.sin(w)
u=new Float32Array(3)
if(0>=3)return H.a(u,0)
u[0]=x*y
if(1>=3)return H.a(u,1)
u[1]=x*v
if(2>=3)return H.a(u,2)
u[2]=z
return new G.r(u)},
mI:function(a,b,c){var z,y,x
if(typeof c!=="number")return H.b(c)
z=1-a+a*c
y=Math.sqrt(H.v(1-z*z))
x=b*2*3.141592653589793
return G.B(Math.cos(H.v(x))*y,Math.sin(H.v(x))*y,z)},
mJ:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r
z=c*(1-a)+a
y=Math.sqrt(1-z*z)
x=b*2*3.141592653589793
w=Math.cos(x)*y
v=d.a
u=v.length
if(0>=u)return H.a(v,0)
t=v[0]
if(1>=u)return H.a(v,1)
s=v[1]
if(2>=u)return H.a(v,2)
v=v[2]
u=new Float32Array(3)
if(0>=3)return H.a(u,0)
u[0]=t*w
if(1>=3)return H.a(u,1)
u[1]=s*w
if(2>=3)return H.a(u,2)
u[2]=v*w
w=Math.sin(x)*y
v=e.a
t=v.length
if(0>=t)return H.a(v,0)
s=v[0]
if(1>=t)return H.a(v,1)
r=v[1]
if(2>=t)return H.a(v,2)
v=v[2]
t=new Float32Array(3)
if(0>=3)return H.a(t,0)
t[0]=s*w
if(1>=3)return H.a(t,1)
t[1]=r*w
if(2>=3)return H.a(t,2)
t[2]=v*w
return new G.r(u).j(0,new G.r(t)).j(0,J.d(f,z))},
jA:function(a){if(typeof a!=="number")return H.b(a)
return 1/(6.283185307179586*(1-a))},
cx:function(a,b,c,d){var z,y,x,w
if(typeof a!=="number")return H.b(a)
z=2*a-1
if(typeof b!=="number")return H.b(b)
y=2*b-1
if(z===0&&y===0){c[0]=0
d[0]=0
return}x=-y
if(z>=x)if(z>y){w=y/z
w=y>0?w:8+w
x=z}else{w=2-z/y
x=y}else if(z<=y){x=-z
w=4-y/x}else w=6+z/x
w*=0.7853981633974483
c[0]=x*Math.cos(H.v(w))
d[0]=x*Math.sin(H.v(w))},
hz:function(a,b){var z,y,x,w,v,u
z=[0]
y=[0]
G.cx(a,b,z,y)
x=z[0]
w=y[0]
w=P.I(0,1-x*x-w*w)
v=Math.sqrt(w)
x=z[0]
w=y[0]
u=new Float32Array(3)
if(0>=3)return H.a(u,0)
u[0]=x
if(1>=3)return H.a(u,1)
u[1]=w
if(2>=3)return H.a(u,2)
u[2]=v
return new G.r(u)},
tZ:function(a,b,c,d){var z,y,x,w,v,u,t,s
if(typeof b!=="number")return H.b(b)
z=1/b
for(y=a.length,x=d===!0,w=0,v=0;w<b;++w,v=t){u=x?c.a.P():0.5
t=v+1
s=P.X((w+u)*z,0.9999999403953552)
if(v>=y)return H.a(a,v)
a[v]=s}},
eG:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
if(typeof b!=="number")return H.b(b)
z=1/b
if(typeof c!=="number")return H.b(c)
y=1/c
for(x=e===!0,w=0,v=0;v<c;++v)for(u=0;u<b;++u){t=x?d.bZ():0.5
s=x?d.bZ():0.5
r=w+1
q=P.X((u+t)*z,0.9999999403953552)
if(w<0||w>=a.length)return H.a(a,w)
a[w]=q
w=r+1
q=P.X((v+s)*y,0.9999999403953552)
if(r<0||r>=a.length)return H.a(a,r)
a[r]=q}},
cL:function(a,b,c,d,e){var z,y,x,w,v,u,t,s
if(typeof c!=="number")return H.b(c)
z=J.D(a)
y=0
for(;y<c;++y){x=C.a.R(e.a.aw(4294967295),c-y)
if(typeof d!=="number")return H.b(d)
w=b+d*y
x=b+d*(y+x)
v=0
for(;v<d;++v){u=w+v
t=z.h(a,u)
s=x+v
z.k(a,u,z.h(a,s))
z.k(a,s,t)}}},
fk:function(a,b,c,d){var z,y,x,w,v,u,t
if(typeof b!=="number")return H.b(b)
z=1/b
for(y=J.D(a),x=0;x<b;++x)for(w=c*x,v=0;v<c;++v)y.k(a,w+v,P.X((x+d.a.P())*z,0.9999999403953552))
for(x=0;x<c;++x)for(v=0;v<b;++v){w=C.a.R(d.a.aw(4294967295),b-v)
u=c*v+x
t=y.h(a,u)
w=c*(v+w)+x
y.k(a,u,y.h(a,w))
y.k(a,w,t)}},
cI:function(a,b){var z,y,x
z=1/b
for(y=z,x=0;a>0;){x+=C.a.R(a,b)*y
a=C.b.I(a*z)
y*=z}return x},
pr:function(a,b,c,d){var z,y
for(z=0;z<c;++z){y=b+z
if(y>=a.length)return H.a(a,y)
a[y]=z}G.cL(a,b,c,1,d)},
rw:function(a,b,c,d){var z,y,x,w
z=1/b
for(y=z,x=0;a>0;){w=d+C.a.R(a,b)
if(w>=c.length)return H.a(c,w)
w=J.d(c[w],y)
if(typeof w!=="number")return H.b(w)
x+=w
a=C.b.I(a*z)
y*=z}return x},
lo:function(a,b){var z,y,x,w,v
for(z=a.f,y=z.length,x=5,w=0;w<y;++w){v=z[w]
if(typeof v!=="number")return H.b(v)
x+=v}for(z=a.r,y=z.length,w=0;w<y;++w){v=z[w]
if(typeof v!=="number")return H.b(v)
x+=2*v}return J.d(b,x)},
ik:function(a0,a1,a2,a3,a4,a5,a6,a7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=a6.buffer
z.toString
y=H.fq(z,0,null)
if(typeof a4!=="number")return H.b(a4)
z=2*a4*4
x=0+z
w=a6.buffer
w.toString
v=H.fq(w,x,null)
x+=z
z=a6.buffer
z.toString
u=H.fq(z,x,null)
x+=a4*4
z=a5.length
if(0>=z)return H.a(a5,0)
w=a5[0]
t=w.f
s=t.length
r=w.r
q=r.length
t=s>0?t:null
r=q>0?r:null
p=H.p(Array(s),[P.fb])
o=H.p(Array(q),[P.fb])
for(w=p.length,n=0;n<s;++n){m=a6.buffer
m.toString
H.cr(m,x,null)
m=new Float32Array(m,x)
if(n>=w)return H.a(p,n)
p[n]=m
if(n>=t.length)return H.a(t,n)
m=J.d(J.d(t[n],a4),4)
if(typeof m!=="number")return H.b(m)
x+=m}for(m=o.length,n=0;n<q;++n){l=a6.buffer
l.toString
H.cr(l,x,null)
l=new Float32Array(l,x)
if(n>=m)return H.a(o,n)
o[n]=l
if(n>=r.length)return H.a(r,n)
l=r[n]
if(typeof l!=="number")return H.b(l)
x+=2*l*a4*4}G.d9(1,a4,y,a7)
G.d9(1,a4,v,a7)
G.d8(1,a4,u,a7)
for(n=0;n<s;++n){if(n>=t.length)return H.a(t,n)
l=t[n]
if(n>=w)return H.a(p,n)
G.d8(l,a4,p[n],a7)}for(n=0;n<q;++n){if(n>=r.length)return H.a(r,n)
l=r[n]
if(n>=m)return H.a(o,n)
G.d9(l,a4,o[n],a7)}for(l=y.length,k=u.length,j=J.w(a2),i=J.w(a3),h=v.length,n=0;n<a4;++n){if(n>=z)return H.a(a5,n)
g=a5[n]
f=2*n
if(f>=l)return H.a(y,f)
g.a=a0+y[f]
e=f+1
if(e>=l)return H.a(y,e)
g.b=a1+y[e]
if(n>=k)return H.a(u,n)
d=u[n]
g.e=J.c(j.i(a2,1-d),i.i(a3,d))
d=a5[n]
if(f>=h)return H.a(v,f)
d.c=v[f]
if(e>=h)return H.a(v,e)
d.d=v[e]
for(c=0;c<s;++c){if(c>=t.length)return H.a(t,c)
b=J.d(t[c],n)
g=J.w(b)
a=0
while(!0){if(c>=t.length)return H.a(t,c)
f=t[c]
if(typeof f!=="number")return H.b(f)
if(!(a<f))break
f=a5[n].x
if(c>=f.length)return H.a(f,c)
f=f[c]
if(c>=w)return H.a(p,c)
e=p[c]
d=g.j(b,a)
if(d>>>0!==d||d>=e.length)return H.a(e,d)
J.u(f,a,e[d]);++a}}for(c=0;c<q;++c){if(c>=r.length)return H.a(r,c)
g=r[c]
if(typeof g!=="number")return H.b(g)
b=2*g*n
for(a=0;a<2*g;++a){f=a5[n].y
if(c>=f.length)return H.a(f,c)
f=f[c]
if(c>=m)return H.a(o,c)
e=o[c]
d=b+a
if(d>>>0!==d||d>=e.length)return H.a(e,d)
d=e[d]
if(a>=f.length)return H.a(f,a)
f[a]=d}}}},
fx:function(a,b,c,d){var z,y,x
z=J.d(a,b)
y=J.d(c,d)
x=J.w(z)
return J.G(x.i(z,z),J.c(x.i(z,z),J.d(y,y)))},
c4:function(a,b){var z
for(z=2147483648;a!==0;a=a>>>1,z^=z>>>1)if((a&1)!==0)b=(b^z)>>>0
return P.X((C.a.p(b,8)&16777215)/16777216,0.9999999403953552)},
bB:function(a,b){a=a<<16|a>>>16
a=(a&16711935)<<8|(a&4278255360)>>>8
a=(a&252645135)<<4|(a&4042322160)>>>4
a=(a&858993459)<<2|(a&3435973836)>>>2
return P.X(((((a&1431655765)<<1|(a&2863311530)>>>1)^b)>>>8&16777215)/16777216,0.9999999403953552)},
d8:function(a,b,c,d){var z,y,x,w,v
z=d.e9()
y=J.w(a)
x=J.aQ(c)
w=0
while(!0){v=y.i(a,b)
if(typeof v!=="number")return H.b(v)
if(!(w<v))break
x.k(c,w,G.bB(w,z));++w}if(typeof b!=="number")return H.b(b)
w=0
for(;w<b;++w){if(typeof a!=="number")return H.b(a)
G.cL(c,w*a,a,1,d)}G.cL(c,0,b,a,d)},
d9:function(a,b,c,d){var z,y,x,w,v,u
z=[d.e9(),d.a.aw(4294967295)]
y=J.w(a)
x=0
while(!0){w=y.i(a,b)
if(typeof w!=="number")return H.b(w)
if(!(x<w))break
w=2*x
v=G.bB(x,z[0])
u=c.length
if(w>=u)return H.a(c,w)
c[w]=v;++w
v=G.c4(x,z[1])
if(w>=u)return H.a(c,w)
c[w]=v;++x}if(typeof b!=="number")return H.b(b)
x=0
for(;x<b;++x){if(typeof a!=="number")return H.b(a)
G.cL(c,2*x*a,a,2,d)}if(typeof a!=="number")return H.b(a)
G.cL(c,0,b,2*a,d)},
kv:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=b.a
if(2>=z.length)return H.a(z,2)
y=z[2]
x=J.C(a)
w=J.e(x.gA(a),2)
z=z[2]
z=P.I(0,1-z*z)
v=Math.sqrt(z)
z=J.d(J.e(x.gA(a),2),J.e(x.gA(a),2))
if(typeof z!=="number")return H.b(z)
z=P.I(0,1-z)
u=Math.sqrt(z)
z=b.gF(b)
t=b.gG(b)
s=Math.atan2(z,t)
r=s<0?s+6.283185307179586:s
z=x.gF(a)
x=x.gG(a)
if(typeof z!=="number")H.T(H.Y(z))
if(typeof x!=="number")H.T(H.Y(x))
s=Math.atan2(z,x)
q=r-(s<0?s+6.283185307179586:s)
if(q<0)q+=6.283185307179586
if(q>6.283185307179586)q-=6.283185307179586
if(q>3.141592653589793)q=6.283185307179586-q
if(typeof w!=="number")return H.b(w)
z=new Float32Array(3)
if(0>=3)return H.a(z,0)
z[0]=v*u
if(1>=3)return H.a(z,1)
z[1]=q/3.141592653589793
if(2>=3)return H.a(z,2)
z[2]=y*w
return new G.j(z)},
tF:function(){var z=$.dg
if(z===0)z=3
else z=z===1?3:4
return z},
q:function(a){var z,y
z=$.dg
if(z===0){z=new Float32Array(3)
y=new G.bt(z)
if(!J.i(a,0))C.w.aF(z,0,3,a)
z=y}else if(z===2){z=new Float32Array(4)
y=new G.ah(z)
if(!J.i(a,0))C.w.aF(z,0,4,a)
z=y}else if(z===1){z=new Float32Array(3)
y=new G.bC(z)
if(!J.i(a,0))C.w.aF(z,0,3,a)
z=y}else z=null
return z},
am:function(a,b){switch($.dg){case 0:return G.fC(a)
case 1:return G.mS(a)
case 2:return G.tr(a,b)}$.t.$2(3,"Invalid Spectrum type")
return},
cm:function(a,b,c){var z,y
z=$.dg
if(z===0)z=G.bR(a,b,c)
else if(z===2){z=new G.ah(new Float32Array(4))
z.cB(a,b,c)}else if(z===1){z=new Float32Array(3)
y=new G.bC(z)
G.fJ(a,b,c,z)
z=y}else z=null
return z},
tA:function(a){var z,y,x,w
if(typeof a!=="number")return H.b(a)
z=H.p(Array(a),[G.ai])
for(y=z.length,x=0;x<a;++x){w=G.q(0)
if(x>=y)return H.a(z,x)
z[x]=w}return z},
cn:function(a,b,c,d){var z
if(typeof a!=="number")return H.b(a)
if(typeof b!=="number")return H.b(b)
if(typeof c!=="number")return H.b(c)
z=d.length
if(0>=z)return H.a(d,0)
d[0]=3.240479*a-1.53715*b-0.498535*c
if(1>=z)return H.a(d,1)
d[1]=-0.969256*a+1.875991*b+0.041556*c
if(2>=z)return H.a(d,2)
d[2]=0.055648*a-0.204043*b+1.057311*c},
fJ:function(a,b,c,d){var z
if(typeof a!=="number")return H.b(a)
if(typeof b!=="number")return H.b(b)
if(typeof c!=="number")return H.b(c)
z=d.length
if(0>=z)return H.a(d,0)
d[0]=0.412453*a+0.35758*b+0.180423*c
if(1>=z)return H.a(d,1)
d[1]=0.212671*a+0.71516*b+0.072169*c
if(2>=z)return H.a(d,2)
d[2]=0.019334*a+0.119193*b+0.950227*c},
mi:function(a){var z,y,x,w
for(z=a.length-1,y=0;y<z;){x=a.length
if(y>=x)return H.a(a,y)
w=a[y];++y
if(y>=x)return H.a(a,y)
if(J.F(w,a[y]))return!1}return!0},
mh:function(a,b,c){var z,y,x,w,v,u
z=[]
y=a.length
for(x=0;x<y;++x){if(x>=a.length)return H.a(a,x)
w=a[x]
v=c+x
if(v<0||v>=b.length)return H.a(b,v)
z.push([w,b[v]])}C.c.iN(z,new G.tG())
for(w=J.aQ(a),v=J.aQ(b),x=0;x<y;++x){if(x>=z.length)return H.a(z,x)
u=z[x]
if(0>=u.length)return H.a(u,0)
w.k(a,x,u[0])
if(x>=z.length)return H.a(z,x)
u=z[x]
if(1>=u.length)return H.a(u,1)
v.k(b,c+x,u[1])}},
b2:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=a.length
if(0>=z)return H.a(a,0)
y=J.y(d)
if(y.ab(d,a[0])){if(e<0||e>=b.length)return H.a(b,e)
return b[e]}x=z-1
if(x<0||x>=a.length)return H.a(a,x)
w=J.y(c)
if(w.av(c,a[x])){y=e+z-1
if(y<0||y>=b.length)return H.a(b,y)
return b[y]}if(z===1){if(e<0||e>=b.length)return H.a(b,e)
return b[e]}if(0>=a.length)return H.a(a,0)
if(w.U(c,a[0])){if(e<0||e>=b.length)return H.a(b,e)
v=b[e]
if(0>=a.length)return H.a(a,0)
v=J.d(v,J.h(a[0],c))
if(typeof v!=="number")return H.b(v)
u=0+v}else u=0
if(x>=a.length)return H.a(a,x)
if(y.a0(d,a[x])){v=e+z-1
if(v<0||v>=b.length)return H.a(b,v)
v=b[v]
if(x>=a.length)return H.a(a,x)
x=J.d(v,y.l(d,a[x]))
if(typeof x!=="number")return H.b(x)
u+=x}t=0
while(!0){s=t+1
if(s>=a.length)return H.a(a,s)
if(!w.a0(c,a[s]))break
t=s}x=new G.tC(new G.tB(a,b,e))
while(!0){s=t+1
if(s<z){if(t>=a.length)return H.a(a,t)
w=y.av(d,a[t])}else w=!1
if(!w)break
if(t>=a.length)return H.a(a,t)
r=P.I(c,a[t])
if(s>=a.length)return H.a(a,s)
q=P.X(d,a[s])
w=J.d(x.$3(r,q,t),q-r)
if(typeof w!=="number")return H.b(w)
u+=w
t=s}y=y.l(d,c)
if(typeof y!=="number")return H.b(y)
return u/y},
tD:function(a,b,c){var z,y,x,w
if(J.aG(b,0)){for(z=0;z<471;++z)c[z]=0
return}y=Math.pow(555,5)
if(typeof b!=="number")return H.b(b)
x=y*(Math.exp(14388e3/(555*b))-1)
for(z=0;z<471;++z){y=a[z]
if(typeof y!=="number")H.T(H.Y(y))
y=Math.pow(y,5)
w=J.d(a[z],b)
if(typeof w!=="number")return H.b(w)
c[z]=x/(y*(Math.exp(14388e3/w)-1))}},
tE:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.length
if(0>=z)return H.a(a,0)
y=J.y(c)
if(y.ab(c,a[0])){if(d<0||d>=b.length)return H.a(b,d)
return b[d]}x=z-1
if(x<0||x>=a.length)return H.a(a,x)
if(y.av(c,a[x])){y=d+x
if(y<0||y>=b.length)return H.a(b,y)
return b[y]}for(w=0;w<x;++w){if(w>=a.length)return H.a(a,w)
if(y.av(c,a[w])){v=w+1
if(v>=a.length)return H.a(a,v)
v=y.ab(c,a[v])}else v=!1
if(v){if(w>=a.length)return H.a(a,w)
x=y.l(c,a[w])
v=w+1
u=a.length
if(v>=u)return H.a(a,v)
v=a[v]
if(w>=u)return H.a(a,w)
v=J.h(v,a[w])
if(typeof x!=="number")return x.w()
if(typeof v!=="number")return H.b(v)
t=x/v
v=d+w
x=b.length
if(v<0||v>=x)return H.a(b,v)
u=b[v];++v
if(v>=x)return H.a(b,v)
v=b[v]
return J.c(J.d(u,1-t),J.d(v,t))}}$.t.$2(3,"Fatal logic error in InterpolateSpectrumSamples()")
return 0},
bn:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=J.y(b)
if(z.a0(b,28))$.t.$2(3,"SHEvaluate() runs out of numerical precision for lmax > 28.If you need more bands, try recompiling using doubles.")
y=J.C(a)
G.tT(y.gS(a),b,c,d)
z=J.d(z.j(b,1),z.j(b,1))
if(typeof z!=="number")return H.b(z)
x=Array(z)
x.$builtinTypeInfo=[P.a3]
if(typeof b!=="number")return H.b(b)
z=x.length
w=0
for(;w<=b;++w)for(v=-w,u=w*w+w,t=(2*w+1)*0.07957747154594767;v<=w;++v){s=u+v
r=G.tS(w,v)
r=Math.sqrt(t*r)
if(s<0||s>=z)return H.a(x,s)
x[s]=r}u=b+1
q=Array(u)
q.$builtinTypeInfo=[P.a3]
p=Array(u)
p.$builtinTypeInfo=[P.a3]
t=J.d(y.gS(a),y.gS(a))
if(typeof t!=="number")return H.b(t)
t=P.I(0,1-t)
o=Math.sqrt(t)
if(o===0){for(y=q.length,n=0;n<=b;++n){if(n>=y)return H.a(q,n)
q[n]=0}for(y=p.length,n=0;n<=b;++n){if(n>=y)return H.a(p,n)
p[n]=1}}else G.ml(J.G(y.gF(a),o),J.G(y.gG(a),o),u,q,p)
m=Math.sqrt(2)
for(y=p.length,u=J.w(d),t=q.length,w=0;w<=b;++w){for(v=-w,s=w*w+w;v<0;++v){r=s+v
l=u.j(d,r)
if(r<0||r>=z)return H.a(x,r)
r=x[r]
if(typeof r!=="number")return H.b(r)
k=-v
j=u.j(d,s+k)
i=c.length
if(j>>>0!==j||j>=i)return H.a(c,j)
j=c[j]
if(typeof j!=="number")return H.b(j)
if(k<0||k>=t)return H.a(q,k)
k=q[k]
if(typeof k!=="number")return H.b(k)
if(l>>>0!==l||l>=i)return H.a(c,l)
c[l]=m*r*j*k}r=u.j(d,s)
if(r>>>0!==r||r>=c.length)return H.a(c,r)
l=c[r]
if(s>=z)return H.a(x,s)
l=J.d(l,x[s])
if(r>=c.length)return H.a(c,r)
c[r]=l
for(v=1;v<=w;++v){r=s+v
l=u.j(d,r)
if(l>>>0!==l||l>=c.length)return H.a(c,l)
k=c[l]
if(r>=z)return H.a(x,r)
r=x[r]
if(typeof r!=="number")return H.b(r)
if(v>=y)return H.a(p,v)
j=p[v]
if(typeof j!=="number")return H.b(j)
j=J.d(k,m*r*j)
if(l>=c.length)return H.a(c,l)
c[l]=j}}},
tN:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=J.w(d)
y=J.d(z.j(d,1),z.j(d,1))
if(typeof y!=="number")return H.b(y)
x=H.p(Array(y),[P.a3])
for(z=e.length,w=x.length,v=4/(c*c),u=0;u<c;++u){t=-1+2*(u+0.5)/c
for(s=0;s<c;++s){r=-1+2*(s+0.5)/c
q=new Float32Array(3)
p=new G.r(q)
if(0>=3)return H.a(q,0)
q[0]=t
if(1>=3)return H.a(q,1)
q[1]=r
if(2>=3)return H.a(q,2)
q[2]=1
G.bn(p.w(0,p.E(0)),d,x,0)
o=a.$4(u,s,b,p)
q=G.J(p,p)
if(typeof q!=="number")H.T(H.Y(q))
n=1/Math.pow(q,1.5)
for(q=J.w(o),m=0;m<y;++m){if(m>=z)return H.a(e,m)
l=e[m]
k=q.i(o,n)
if(m>=w)return H.a(x,m)
e[m]=J.c(l,J.d(J.d(k,x[m]),v))}q=new Float32Array(3)
p=new G.r(q)
if(0>=3)return H.a(q,0)
q[0]=t
if(1>=3)return H.a(q,1)
q[1]=r
if(2>=3)return H.a(q,2)
q[2]=-1
G.bn(p.w(0,p.E(0)),d,x,0)
o=a.$4(u,s,b,p)
for(q=J.w(o),m=0;m<y;++m){if(m>=z)return H.a(e,m)
l=e[m]
if(m>=w)return H.a(x,m)
e[m]=J.c(l,J.d(J.d(q.i(o,x[m]),n),v))}q=new Float32Array(3)
p=new G.r(q)
if(0>=3)return H.a(q,0)
q[0]=t
if(1>=3)return H.a(q,1)
q[1]=1
if(2>=3)return H.a(q,2)
q[2]=r
G.bn(p.w(0,p.E(0)),d,x,0)
o=a.$4(u,s,b,p)
for(q=J.w(o),m=0;m<y;++m){if(m>=z)return H.a(e,m)
l=e[m]
if(m>=w)return H.a(x,m)
e[m]=J.c(l,J.d(J.d(q.i(o,x[m]),n),v))}q=new Float32Array(3)
p=new G.r(q)
if(0>=3)return H.a(q,0)
q[0]=t
if(1>=3)return H.a(q,1)
q[1]=-1
if(2>=3)return H.a(q,2)
q[2]=r
G.bn(p.w(0,p.E(0)),d,x,0)
o=a.$4(u,s,b,p)
for(q=J.w(o),m=0;m<y;++m){if(m>=z)return H.a(e,m)
l=e[m]
if(m>=w)return H.a(x,m)
e[m]=J.c(l,J.d(J.d(q.i(o,x[m]),n),v))}q=new Float32Array(3)
p=new G.r(q)
if(0>=3)return H.a(q,0)
q[0]=1
if(1>=3)return H.a(q,1)
q[1]=t
if(2>=3)return H.a(q,2)
q[2]=r
G.bn(p.w(0,p.E(0)),d,x,0)
o=a.$4(u,s,b,p)
for(q=J.w(o),m=0;m<y;++m){if(m>=z)return H.a(e,m)
l=e[m]
if(m>=w)return H.a(x,m)
e[m]=J.c(l,J.d(J.d(q.i(o,x[m]),n),v))}q=new Float32Array(3)
p=new G.r(q)
if(0>=3)return H.a(q,0)
q[0]=-1
if(1>=3)return H.a(q,1)
q[1]=t
if(2>=3)return H.a(q,2)
q[2]=r
G.bn(p.w(0,p.E(0)),d,x,0)
o=a.$4(u,s,b,p)
for(q=J.w(o),m=0;m<y;++m){if(m>=z)return H.a(e,m)
l=e[m]
if(m>=w)return H.a(x,m)
e[m]=J.c(l,J.d(J.d(q.i(o,x[m]),n),v))}}}},
jd:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
z=J.w(f)
y=J.d(z.j(f,1),z.j(f,1))
if(typeof y!=="number")return H.b(y)
x=Array(y)
x.$builtinTypeInfo=[G.ai]
for(w=x.length,v=0;v<w;++v)x[v]=G.q(0)
for(z=d.b,v=0;v<z.length;++v){z[v].ha(a,b,f,d,e,c,g,x)
for(u=0;u<y;++u){if(u>=h.length)return H.a(h,u)
t=h[u]
if(u>=w)return H.a(x,u)
h[u]=t.j(0,x[u])}}G.tP(h,f,0.005)},
tO:function(a,b,c,d,e,a0,a1,a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=new G.fG([],[],[],[],0,0,0,0,0)
z.f=P.aE(e.f,!0,P.x)
z.r=P.aE(e.r,!0,P.x)
z.hg()
y=[a2.a.aw(4294967295),a2.a.aw(4294967295)]
a3=G.aX(a3)
x=J.w(a1)
w=J.d(x.j(a1,1),x.j(a1,1))
if(typeof w!=="number")return H.b(w)
v=Array(w)
v.$builtinTypeInfo=[P.a3]
for(x=a4.length,u=v.length,t=0.07957747154594767*a3,s=0;s<a3;++s){r=[0,0]
r[0]=G.bB(s,y[0])
q=G.c4(s,y[1])
r[1]=q
p=G.bv(r[0],q)
G.q(0)
q=new Float32Array(3)
if(0>=3)return H.a(q,0)
q[0]=0
if(1>=3)return H.a(q,1)
q[1]=0
if(2>=3)return H.a(q,2)
q[2]=0
o=new Float32Array(3)
if(0>=3)return H.a(o,0)
o[0]=0
if(1>=3)return H.a(o,1)
o[1]=0
if(2>=3)return H.a(o,2)
o[2]=0
n=new Float32Array(3)
if(0>=3)return H.a(n,0)
n[0]=0
if(1>=3)return H.a(n,1)
n[1]=0
if(2>=3)return H.a(n,2)
n[2]=0
m=new Float32Array(3)
if(0>=3)return H.a(m,0)
m[0]=0
if(1>=3)return H.a(m,1)
m[1]=0
if(2>=3)return H.a(m,2)
m[2]=0
l=new G.j(new Float32Array(H.n(a.a)))
k=new G.r(new Float32Array(H.n(p.a)))
z.e=c
for(j=0;j<z.f.length;++j){i=0
while(!0){h=z.f
if(j>=h.length)return H.a(h,j)
h=h[j]
if(typeof h!=="number")return H.b(h)
if(!(i<h))break
h=z.x
if(j>=h.length)return H.a(h,j)
J.u(h[j],i,a2.a.P());++i}}for(j=0;j<z.r.length;++j){i=0
while(!0){h=z.r
if(j>=h.length)return H.a(h,j)
h=h[j]
if(typeof h!=="number")return H.b(h)
if(!(i<2*h))break
h=z.y
if(j>=h.length)return H.a(h,j)
h=h[j]
g=a2.a.P()
if(i>=h.length)return H.a(h,i)
h[i]=g;++i}}f=d.ew(a0,new G.as(!1,new G.j(q),new G.j(o),new G.r(n),new G.r(m),l,k,b,1/0,c,0),z,a2)
G.bn(p,a1,v,0)
for(q=J.w(f),j=0;j<w;++j){if(j>=x)return H.a(a4,j)
o=a4[j]
if(j>=u)return H.a(v,j)
a4[j]=o.j(0,J.G(q.i(f,v[j]),t))}}},
tP:function(a,b,c){var z,y,x,w,v,u
if(typeof b!=="number")return H.b(b)
z=0
for(;z<=b;z=y){y=z+1
x=1/(1+c*z*z*y*y)
for(w=-z,v=z*z+z;w<=z;++w){u=v+w
if(u<0||u>=a.length)return H.a(a,u)
a[u].b4(0,x)}}},
je:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=b.length
if(0>=z)return H.a(b,0)
y=b[0]
x=a.length
if(0>=x)return H.a(a,0)
y.L(a[0])
y=J.O(d)
if(y.B(d,0))return
w=y.j(d,1)
if(typeof w!=="number")return H.b(w)
v=H.p(Array(w),[P.a3])
w=y.j(d,1)
if(typeof w!=="number")return H.b(w)
u=H.p(Array(w),[P.a3])
G.ml(Math.sin(H.v(c)),Math.cos(H.v(c)),y.j(d,1),u,v)
if(typeof d!=="number")return H.b(d)
y=v.length
w=u.length
t=1
for(;t<=d;++t){for(s=-t,r=t*t+t;s<0;++s){q=r+s
if(q<0||q>=x)return H.a(a,q)
p=a[q]
o=-s
if(o<0||o>=y)return H.a(v,o)
p=p.i(0,v[o])
n=r+o
if(n>=x)return H.a(a,n)
n=a[n]
if(o>=w)return H.a(u,o)
o=u[o]
if(typeof o!=="number")return o.a2()
o=p.j(0,n.i(0,-o))
if(q>=z)return H.a(b,q)
b[q]=o}if(r>=z)return H.a(b,r)
q=b[r]
if(r>=x)return H.a(a,r)
q.L(a[r])
for(s=1;s<=t;++s){q=r+s
if(q>=x)return H.a(a,q)
p=a[q]
if(s>=y)return H.a(v,s)
p=p.i(0,v[s])
o=r+-s
if(o<0||o>=x)return H.a(a,o)
o=a[o]
if(s>=w)return H.a(u,s)
o=p.j(0,o.i(0,u[s]))
if(q>=z)return H.a(b,q)
b[q]=o}}},
tQ:function(a,b,c){var z,y,x,w,v,u
G.mk(a,b,c)
if(typeof c!=="number")return H.b(c)
z=b.length
y=1
for(;y<=c;++y){x=(y&1)!==0?-1:1
w=y*y+y
if(w>=z)return H.a(b,w)
b[w].b4(0,x)
for(v=1;v<=y;++v){x=-x
u=w+v
if(u>=z)return H.a(b,u)
b[u].b4(0,x)
u=w+-v
if(u<0||u>=z)return H.a(b,u)
b[u].b4(0,-x)}}},
mk:function(a,b,c){var z,y,x,w
z=new G.tR(a)
if(0>=a.length)return H.a(a,0)
y=a[0]
x=b.length
if(0>=x)return H.a(b,0)
b[0]=y
y=J.y(c)
if(y.U(c,1))return
w=z.$2(1,0)
if(1>=x)return H.a(b,1)
b[1]=w
w=J.M(z.$2(1,-1))
if(2>=x)return H.a(b,2)
b[2]=w
w=z.$2(1,1)
if(3>=x)return H.a(b,3)
b[3]=w
if(y.U(c,2))return
w=z.$2(2,1)
if(4>=x)return H.a(b,4)
b[4]=w
w=J.M(z.$2(2,-1))
if(5>=x)return H.a(b,5)
b[5]=w
w=J.c(J.d(z.$2(2,0),-0.5),J.d(z.$2(2,2),-0.8660254037844386))
if(6>=x)return H.a(b,6)
b[6]=w
w=J.M(z.$2(2,-2))
if(7>=x)return H.a(b,7)
b[7]=w
w=J.c(J.d(z.$2(2,0),-0.8660254037844386),J.d(z.$2(2,2),0.5))
if(8>=x)return H.a(b,8)
b[8]=w
if(y.U(c,3))return
w=J.c(J.d(z.$2(3,0),-0.7905694150420949),J.d(z.$2(3,2),0.6123724356957945))
if(9>=x)return H.a(b,9)
b[9]=w
w=J.M(z.$2(3,-2))
if(10>=x)return H.a(b,10)
b[10]=w
w=J.c(J.d(z.$2(3,0),-0.6123724356957945),J.d(z.$2(3,2),-0.7905694150420949))
if(11>=x)return H.a(b,11)
b[11]=w
w=J.c(J.d(z.$2(3,-3),0.7905694150420949),J.d(z.$2(3,-1),0.6123724356957945))
if(12>=x)return H.a(b,12)
b[12]=w
w=J.c(J.d(z.$2(3,1),-0.25),J.d(z.$2(3,3),-0.9682458365518543))
if(13>=x)return H.a(b,13)
b[13]=w
w=J.c(J.d(z.$2(3,-3),-0.6123724356957945),J.d(z.$2(3,-1),0.7905694150420949))
if(14>=x)return H.a(b,14)
b[14]=w
w=J.c(J.d(z.$2(3,1),-0.9682458365518543),J.d(z.$2(3,3),0.25))
if(15>=x)return H.a(b,15)
b[15]=w
if(y.U(c,4))return
w=J.c(J.d(z.$2(4,1),-0.9354143466934853),J.d(z.$2(4,3),0.35355339059327373))
if(16>=x)return H.a(b,16)
b[16]=w
w=J.c(J.d(z.$2(4,-3),-0.75),J.d(z.$2(4,-1),0.6614378277661477))
if(17>=x)return H.a(b,17)
b[17]=w
w=J.c(J.d(z.$2(4,1),-0.35355339059327373),J.d(z.$2(4,3),-0.9354143466934853))
if(18>=x)return H.a(b,18)
b[18]=w
w=J.c(J.d(z.$2(4,-3),0.6614378277661477),J.d(z.$2(4,-1),0.75))
if(19>=x)return H.a(b,19)
b[19]=w
w=J.c(J.c(J.d(z.$2(4,0),0.375),J.d(z.$2(4,2),0.5590169943749475)),J.d(z.$2(4,4),0.739509972887452))
if(20>=x)return H.a(b,20)
b[20]=w
w=J.c(J.d(z.$2(4,-4),0.9354143466934853),J.d(z.$2(4,-2),0.35355339059327373))
if(21>=x)return H.a(b,21)
b[21]=w
w=J.c(J.c(J.d(z.$2(4,0),0.5590169943749475),J.d(z.$2(4,2),0.5)),J.d(z.$2(4,4),-0.6614378277661477))
if(22>=x)return H.a(b,22)
b[22]=w
w=J.c(J.d(z.$2(4,-4),-0.35355339059327373),J.d(z.$2(4,-2),0.9354143466934853))
if(23>=x)return H.a(b,23)
b[23]=w
w=J.c(J.c(J.d(z.$2(4,0),0.739509972887452),J.d(z.$2(4,2),-0.6614378277661477)),J.d(z.$2(4,4),0.125))
if(24>=x)return H.a(b,24)
b[24]=w
if(y.U(c,5))return
w=J.c(J.h(J.d(z.$2(5,0),0.701560760020114),J.d(z.$2(5,2),0.6846531968814576)),J.d(z.$2(5,4),0.19764235376052372))
if(25>=x)return H.a(b,25)
b[25]=w
w=J.c(J.d(z.$2(5,-4),-0.5),J.d(z.$2(5,-2),0.8660254037844386))
if(26>=x)return H.a(b,26)
b[26]=w
w=J.h(J.c(J.d(z.$2(5,0),0.5229125165837972),J.d(z.$2(5,2),0.30618621784789724)),J.d(z.$2(5,4),0.795495128834866))
if(27>=x)return H.a(b,27)
b[27]=w
w=J.c(J.d(z.$2(5,-4),0.8660254037844386),J.d(z.$2(5,-2),0.5))
if(28>=x)return H.a(b,28)
b[28]=w
w=J.c(J.c(J.d(z.$2(5,0),0.4841229182759271),J.d(z.$2(5,2),0.6614378277661477)),J.d(z.$2(5,4),0.57282196186948))
if(29>=x)return H.a(b,29)
b[29]=w
w=J.h(J.h(J.d(z.$2(5,-5),-0.701560760020114),J.d(z.$2(5,-3),0.5229125165837972)),J.d(z.$2(5,-1),0.4841229182759271))
if(30>=x)return H.a(b,30)
b[30]=w
w=J.c(J.c(J.d(z.$2(5,1),0.125),J.d(z.$2(5,3),0.4050462936504913)),J.d(z.$2(5,5),0.9057110466368399))
if(31>=x)return H.a(b,31)
b[31]=w
w=J.h(J.h(J.d(z.$2(5,-5),0.6846531968814576),J.d(z.$2(5,-3),0.30618621784789724)),J.d(z.$2(5,-1),0.6614378277661477))
if(32>=x)return H.a(b,32)
b[32]=w
w=J.h(J.c(J.d(z.$2(5,1),0.4050462936504913),J.d(z.$2(5,3),0.8125)),J.d(z.$2(5,5),0.4192627457812106))
if(33>=x)return H.a(b,33)
b[33]=w
w=J.h(J.c(J.d(z.$2(5,-5),-0.19764235376052372),J.d(z.$2(5,-3),0.795495128834866)),J.d(z.$2(5,-1),0.57282196186948))
if(34>=x)return H.a(b,34)
b[34]=w
w=J.c(J.h(J.d(z.$2(5,1),0.9057110466368399),J.d(z.$2(5,3),0.4192627457812106)),J.d(z.$2(5,5),0.0625))
if(35>=x)return H.a(b,35)
b[35]=w
if(y.U(c,6))return
w=J.c(J.h(J.d(z.$2(6,1),0.879452954966893),J.d(z.$2(6,3),0.46351240544347894)),J.d(z.$2(6,5),0.10825317547305482))
if(36>=x)return H.a(b,36)
b[36]=w
w=J.h(J.c(J.d(z.$2(6,-5),-0.3125),J.d(z.$2(6,-3),0.8028270361665706)),J.d(z.$2(6,-1),0.5077524002897476))
if(37>=x)return H.a(b,37)
b[37]=w
w=J.h(J.c(J.d(z.$2(6,1),0.4330127018922193),J.d(z.$2(6,3),0.6846531968814576)),J.d(z.$2(6,5),0.5863019699779287))
if(38>=x)return H.a(b,38)
b[38]=w
w=J.h(J.h(J.d(z.$2(6,-5),0.8028270361665706),J.d(z.$2(6,-3),0.0625)),J.d(z.$2(6,-1),0.5929270612815711))
if(39>=x)return H.a(b,39)
b[39]=w
w=J.c(J.c(J.d(z.$2(6,1),0.19764235376052372),J.d(z.$2(6,3),0.5625)),J.d(z.$2(6,5),0.8028270361665706))
if(40>=x)return H.a(b,40)
b[40]=w
w=J.h(J.h(J.d(z.$2(6,-5),-0.5077524002897476),J.d(z.$2(6,-3),0.5929270612815711)),J.d(z.$2(6,-1),0.625))
if(41>=x)return H.a(b,41)
b[41]=w
w=J.h(J.h(J.h(J.d(z.$2(6,0),-0.3125),J.d(z.$2(6,2),0.45285552331841994)),J.d(z.$2(6,4),0.49607837082461076)),J.d(z.$2(6,6),0.6716932893813962))
if(42>=x)return H.a(b,42)
b[42]=w
w=J.h(J.h(J.d(z.$2(6,-6),-0.879452954966893),J.d(z.$2(6,-4),0.4330127018922193)),J.d(z.$2(6,-2),0.19764235376052372))
if(43>=x)return H.a(b,43)
b[43]=w
w=J.c(J.h(J.h(J.d(z.$2(6,0),-0.45285552331841994),J.d(z.$2(6,2),0.53125)),J.d(z.$2(6,4),0.1711632992203644)),J.d(z.$2(6,6),0.6952686081652184))
if(44>=x)return H.a(b,44)
b[44]=w
w=J.h(J.h(J.d(z.$2(6,-6),0.46351240544347894),J.d(z.$2(6,-4),0.6846531968814576)),J.d(z.$2(6,-2),0.5625))
if(45>=x)return H.a(b,45)
b[45]=w
w=J.h(J.c(J.h(J.d(z.$2(6,0),-0.49607837082461076),J.d(z.$2(6,2),0.1711632992203644)),J.d(z.$2(6,4),0.8125)),J.d(z.$2(6,6),0.2538762001448738))
if(46>=x)return H.a(b,46)
b[46]=w
w=J.h(J.c(J.d(z.$2(6,-6),-0.10825317547305482),J.d(z.$2(6,-4),0.5863019699779287)),J.d(z.$2(6,-2),0.8028270361665706))
if(47>=x)return H.a(b,47)
b[47]=w
w=J.c(J.h(J.c(J.d(z.$2(6,0),-0.6716932893813962),J.d(z.$2(6,2),0.6952686081652184)),J.d(z.$2(6,4),0.2538762001448738)),J.d(z.$2(6,6),0.03125))
if(48>=x)return H.a(b,48)
b[48]=w
if(y.U(c,7))return
w=J.c(J.h(J.c(J.d(z.$2(7,0),-0.6472598492877494),J.d(z.$2(7,2),0.6991205412874092)),J.d(z.$2(7,4),0.2981060004427955)),J.d(z.$2(7,6),0.05846339666834283))
if(49>=x)return H.a(b,49)
b[49]=w
w=J.h(J.c(J.d(z.$2(7,-6),-0.1875),J.d(z.$2(7,-4),0.6373774391990981)),J.d(z.$2(7,-2),0.7473912964438374))
if(50>=x)return H.a(b,50)
b[50]=w
w=J.h(J.c(J.h(J.d(z.$2(7,0),-0.47495887979908324),J.d(z.$2(7,2),0.07328774624724109)),J.d(z.$2(7,4),0.78125)),J.d(z.$2(7,6),0.3983608994994363))
if(51>=x)return H.a(b,51)
b[51]=w
w=J.h(J.h(J.d(z.$2(7,-6),0.6373774391990981),J.d(z.$2(7,-4),0.5)),J.d(z.$2(7,-2),0.5863019699779287))
if(52>=x)return H.a(b,52)
b[52]=w
w=J.c(J.c(J.h(J.d(z.$2(7,0),-0.42961647140211),J.d(z.$2(7,2),0.41984465132951254)),J.d(z.$2(7,4),0.10364452469860624)),J.d(z.$2(7,6),0.7927281808728639))
if(53>=x)return H.a(b,53)
b[53]=w
w=J.h(J.h(J.d(z.$2(7,-6),-0.7473912964438374),J.d(z.$2(7,-4),0.5863019699779287)),J.d(z.$2(7,-2),0.3125))
if(54>=x)return H.a(b,54)
b[54]=w
w=J.h(J.h(J.h(J.d(z.$2(7,0),-0.41339864235384227),J.d(z.$2(7,2),0.5740991584648073)),J.d(z.$2(7,4),0.5385527481129402)),J.d(z.$2(7,6),0.4576818286211503))
if(55>=x)return H.a(b,55)
b[55]=w
w=J.c(J.c(J.c(J.d(z.$2(7,-7),0.6472598492877494),J.d(z.$2(7,-5),0.47495887979908324)),J.d(z.$2(7,-3),0.42961647140211)),J.d(z.$2(7,-1),0.41339864235384227))
if(56>=x)return H.a(b,56)
b[56]=w
w=J.h(J.h(J.h(J.d(z.$2(7,1),-0.078125),J.d(z.$2(7,3),0.24356964481437335)),J.d(z.$2(7,5),0.4487939567607835)),J.d(z.$2(7,7),0.8562442974262661))
if(57>=x)return H.a(b,57)
b[57]=w
w=J.c(J.c(J.c(J.d(z.$2(7,-7),-0.6991205412874092),J.d(z.$2(7,-5),0.07328774624724109)),J.d(z.$2(7,-3),0.41984465132951254)),J.d(z.$2(7,-1),0.5740991584648073))
if(58>=x)return H.a(b,58)
b[58]=w
w=J.c(J.h(J.h(J.d(z.$2(7,1),-0.24356964481437335),J.d(z.$2(7,3),0.609375)),J.d(z.$2(7,5),0.5700448858423344)),J.d(z.$2(7,7),0.4943528756111367))
if(59>=x)return H.a(b,59)
b[59]=w
w=J.c(J.h(J.h(J.d(z.$2(7,-7),0.2981060004427955),J.d(z.$2(7,-5),0.78125)),J.d(z.$2(7,-3),0.10364452469860624)),J.d(z.$2(7,-1),0.5385527481129402))
if(60>=x)return H.a(b,60)
b[60]=w
w=J.h(J.c(J.h(J.d(z.$2(7,1),-0.4487939567607835),J.d(z.$2(7,3),0.5700448858423344)),J.d(z.$2(7,5),0.671875)),J.d(z.$2(7,7),0.14905300022139775))
if(61>=x)return H.a(b,61)
b[61]=w
w=J.c(J.h(J.c(J.d(z.$2(7,-7),-0.05846339666834283),J.d(z.$2(7,-5),0.3983608994994363)),J.d(z.$2(7,-3),0.7927281808728639)),J.d(z.$2(7,-1),0.4576818286211503))
if(62>=x)return H.a(b,62)
b[62]=w
w=J.c(J.h(J.c(J.d(z.$2(7,1),-0.8562442974262661),J.d(z.$2(7,3),0.4943528756111367)),J.d(z.$2(7,5),0.14905300022139775)),J.d(z.$2(7,7),0.015625))
if(63>=x)return H.a(b,63)
b[63]=w
if(y.U(c,8))return
w=J.c(J.h(J.c(J.d(z.$2(8,1),-0.8356088723200586),J.d(z.$2(8,3),0.516334738808072)),J.d(z.$2(8,5),0.184877493221863)),J.d(z.$2(8,7),0.03125))
if(64>=x)return H.a(b,64)
b[64]=w
w=J.c(J.h(J.c(J.d(z.$2(8,-7),-0.109375),J.d(z.$2(8,-5),0.4621937330546575)),J.d(z.$2(8,-3),0.774502108212108)),J.d(z.$2(8,-1),0.4178044361600293))
if(65>=x)return H.a(b,65)
b[65]=w
w=J.h(J.c(J.h(J.d(z.$2(8,1),-0.4576818286211503),J.d(z.$2(8,3),0.47134697278119864)),J.d(z.$2(8,5),0.7088310138883598)),J.d(z.$2(8,7),0.2567449488305466))
if(66>=x)return H.a(b,66)
b[66]=w
w=J.c(J.h(J.h(J.d(z.$2(8,-7),0.4621937330546575),J.d(z.$2(8,-5),0.703125)),J.d(z.$2(8,-3),0.2181912506838897)),J.d(z.$2(8,-1),0.4943528756111367))
if(67>=x)return H.a(b,67)
b[67]=w
w=J.c(J.h(J.h(J.d(z.$2(8,1),-0.27421763710600383),J.d(z.$2(8,3),0.6051536478449089)),J.d(z.$2(8,5),0.33802043207474897)),J.d(z.$2(8,7),0.6665852814906732))
if(68>=x)return H.a(b,68)
b[68]=w
w=J.c(J.c(J.h(J.d(z.$2(8,-7),-0.774502108212108),J.d(z.$2(8,-5),0.2181912506838897)),J.d(z.$2(8,-3),0.265625)),J.d(z.$2(8,-1),0.5310201708739509))
if(69>=x)return H.a(b,69)
b[69]=w
w=J.h(J.h(J.h(J.d(z.$2(8,1),-0.1307281291459493),J.d(z.$2(8,3),0.38081430021731066)),J.d(z.$2(8,5),0.5908647000371574)),J.d(z.$2(8,7),0.6991205412874092))
if(70>=x)return H.a(b,70)
b[70]=w
w=J.c(J.c(J.c(J.d(z.$2(8,-7),0.4178044361600293),J.d(z.$2(8,-5),0.4943528756111367)),J.d(z.$2(8,-3),0.5310201708739509)),J.d(z.$2(8,-1),0.546875))
if(71>=x)return H.a(b,71)
b[71]=w
w=J.c(J.c(J.c(J.c(J.d(z.$2(8,0),0.2734375),J.d(z.$2(8,2),0.3921843874378479)),J.d(z.$2(8,4),0.4113264556590057)),J.d(z.$2(8,6),0.4576818286211503)),J.d(z.$2(8,8),0.626706654240044))
if(72>=x)return H.a(b,72)
b[72]=w
w=J.c(J.c(J.c(J.d(z.$2(8,-8),0.8356088723200586),J.d(z.$2(8,-6),0.4576818286211503)),J.d(z.$2(8,-4),0.27421763710600383)),J.d(z.$2(8,-2),0.1307281291459493))
if(73>=x)return H.a(b,73)
b[73]=w
w=J.h(J.c(J.c(J.d(z.$2(8,0),0.3921843874378479),J.d(z.$2(8,2),0.5)),J.d(z.$2(8,4),0.32775276505317236)),J.d(z.$2(8,8),0.6991205412874092))
if(74>=x)return H.a(b,74)
b[74]=w
w=J.c(J.c(J.c(J.d(z.$2(8,-8),-0.516334738808072),J.d(z.$2(8,-6),0.47134697278119864)),J.d(z.$2(8,-4),0.6051536478449089)),J.d(z.$2(8,-2),0.38081430021731066))
if(75>=x)return H.a(b,75)
b[75]=w
w=J.c(J.h(J.h(J.c(J.d(z.$2(8,0),0.4113264556590057),J.d(z.$2(8,2),0.32775276505317236)),J.d(z.$2(8,4),0.28125)),J.d(z.$2(8,6),0.7302075903467452)),J.d(z.$2(8,8),0.3332926407453366))
if(76>=x)return H.a(b,76)
b[76]=w
w=J.c(J.c(J.h(J.d(z.$2(8,-8),0.184877493221863),J.d(z.$2(8,-6),0.7088310138883598)),J.d(z.$2(8,-4),0.33802043207474897)),J.d(z.$2(8,-2),0.5908647000371574))
if(77>=x)return H.a(b,77)
b[77]=w
w=J.h(J.c(J.h(J.d(z.$2(8,0),0.4576818286211503),J.d(z.$2(8,4),0.7302075903467452)),J.d(z.$2(8,6),0.5)),J.d(z.$2(8,8),0.0855816496101822))
if(78>=x)return H.a(b,78)
b[78]=w
w=J.c(J.h(J.c(J.d(z.$2(8,-8),-0.03125),J.d(z.$2(8,-6),0.2567449488305466)),J.d(z.$2(8,-4),0.6665852814906732)),J.d(z.$2(8,-2),0.6991205412874092))
if(79>=x)return H.a(b,79)
b[79]=w
w=J.c(J.h(J.c(J.h(J.d(z.$2(8,0),0.626706654240044),J.d(z.$2(8,2),0.6991205412874092)),J.d(z.$2(8,4),0.3332926407453366)),J.d(z.$2(8,6),0.0855816496101822)),J.d(z.$2(8,8),0.0078125))
if(80>=x)return H.a(b,80)
b[80]=w
if(y.U(c,9))return
y=J.c(J.h(J.c(J.h(J.d(z.$2(9,0),0.6090493921755238),J.d(z.$2(9,2),0.6968469725305549)),J.d(z.$2(9,4),0.3615761395439417)),J.d(z.$2(9,6),0.11158481919598204)),J.d(z.$2(9,8),0.016572815184059706))
if(81>=x)return H.a(b,81)
b[81]=y
y=J.c(J.h(J.c(J.d(z.$2(9,-8),-0.0625),J.d(z.$2(9,-6),0.3156095293238149)),J.d(z.$2(9,-4),0.6817945071647321)),J.d(z.$2(9,-2),0.656993626300895))
if(82>=x)return H.a(b,82)
b[82]=y
y=J.h(J.c(J.h(J.h(J.d(z.$2(9,0),0.44314852502786806),J.d(z.$2(9,2),0.05633673867912483)),J.d(z.$2(9,4),0.6723290616859425)),J.d(z.$2(9,6),0.5683291712335379)),J.d(z.$2(9,8),0.1594400908746762))
if(83>=x)return H.a(b,83)
b[83]=y
y=J.c(J.c(J.h(J.d(z.$2(9,-8),0.3156095293238149),J.d(z.$2(9,-6),0.71875)),J.d(z.$2(9,-4),0.20252314682524564)),J.d(z.$2(9,-2),0.5854685623498499))
if(84>=x)return H.a(b,84)
b[84]=y
y=J.c(J.h(J.h(J.c(J.d(z.$2(9,0),0.39636409043643195),J.d(z.$2(9,2),0.25194555463432966)),J.d(z.$2(9,4),0.3921843874378479)),J.d(z.$2(9,6),0.6051536478449089)),J.d(z.$2(9,8),0.509312687906457))
if(85>=x)return H.a(b,85)
b[85]=y
y=J.c(J.c(J.c(J.d(z.$2(9,-8),-0.6817945071647321),J.d(z.$2(9,-6),0.20252314682524564)),J.d(z.$2(9,-4),0.5625)),J.d(z.$2(9,-2),0.4215855488510013))
if(86>=x)return H.a(b,86)
b[86]=y
y=J.h(J.h(J.c(J.c(J.d(z.$2(9,0),0.3754879637718099),J.d(z.$2(9,2),0.42961647140211)),J.d(z.$2(9,4),0.13799626353637262)),J.d(z.$2(9,6),0.2981060004427955)),J.d(z.$2(9,8),0.7526807559068452))
if(87>=x)return H.a(b,87)
b[87]=y
y=J.c(J.c(J.c(J.d(z.$2(9,-8),0.656993626300895),J.d(z.$2(9,-6),0.5854685623498499)),J.d(z.$2(9,-4),0.4215855488510013)),J.d(z.$2(9,-2),0.21875))
if(88>=x)return H.a(b,88)
b[88]=y
y=J.c(J.c(J.c(J.c(J.d(z.$2(9,0),0.36685490255855924),J.d(z.$2(9,2),0.5130142237306876)),J.d(z.$2(9,4),0.4943528756111367)),J.d(z.$2(9,6),0.4576818286211503)),J.d(z.$2(9,8),0.38519665736315783))
if(89>=x)return H.a(b,89)
b[89]=y
y=J.h(J.h(J.h(J.h(J.d(z.$2(9,-9),-0.6090493921755238),J.d(z.$2(9,-7),0.44314852502786806)),J.d(z.$2(9,-5),0.39636409043643195)),J.d(z.$2(9,-3),0.3754879637718099)),J.d(z.$2(9,-1),0.36685490255855924))
if(90>=x)return H.a(b,90)
b[90]=y
y=J.c(J.c(J.c(J.c(J.d(z.$2(9,1),0.0546875),J.d(z.$2(9,3),0.16792332234534904)),J.d(z.$2(9,5),0.2954323500185787)),J.d(z.$2(9,7),0.4624247721758373)),J.d(z.$2(9,9),0.8171255055356398))
if(91>=x)return H.a(b,91)
b[91]=y
y=J.h(J.h(J.h(J.c(J.d(z.$2(9,-9),0.6968469725305549),J.d(z.$2(9,-7),0.05633673867912483)),J.d(z.$2(9,-5),0.25194555463432966)),J.d(z.$2(9,-3),0.42961647140211)),J.d(z.$2(9,-1),0.5130142237306876))
if(92>=x)return H.a(b,92)
b[92]=y
y=J.h(J.c(J.c(J.c(J.d(z.$2(9,1),0.16792332234534904),J.d(z.$2(9,3),0.453125)),J.d(z.$2(9,5),0.577279787559724)),J.d(z.$2(9,7),0.387251054106054)),J.d(z.$2(9,9),0.5322256665703469))
if(93>=x)return H.a(b,93)
b[93]=y
y=J.h(J.h(J.c(J.c(J.d(z.$2(9,-9),-0.3615761395439417),J.d(z.$2(9,-7),0.6723290616859425)),J.d(z.$2(9,-5),0.3921843874378479)),J.d(z.$2(9,-3),0.13799626353637262)),J.d(z.$2(9,-1),0.4943528756111367))
if(94>=x)return H.a(b,94)
b[94]=y
y=J.c(J.h(J.c(J.c(J.d(z.$2(9,1),0.2954323500185787),J.d(z.$2(9,3),0.577279787559724)),J.d(z.$2(9,5),0.140625)),J.d(z.$2(9,7),0.7162405240429014)),J.d(z.$2(9,9),0.21608307321780204))
if(95>=x)return H.a(b,95)
b[95]=y
y=J.h(J.c(J.c(J.h(J.d(z.$2(9,-9),0.11158481919598204),J.d(z.$2(9,-7),0.5683291712335379)),J.d(z.$2(9,-5),0.6051536478449089)),J.d(z.$2(9,-3),0.2981060004427955)),J.d(z.$2(9,-1),0.4576818286211503))
if(96>=x)return H.a(b,96)
b[96]=y
y=J.h(J.c(J.h(J.c(J.d(z.$2(9,1),0.4624247721758373),J.d(z.$2(9,3),0.387251054106054)),J.d(z.$2(9,5),0.7162405240429014)),J.d(z.$2(9,7),0.34765625)),J.d(z.$2(9,9),0.048317644050206957))
if(97>=x)return H.a(b,97)
b[97]=y
y=J.h(J.c(J.h(J.c(J.d(z.$2(9,-9),-0.016572815184059706),J.d(z.$2(9,-7),0.1594400908746762)),J.d(z.$2(9,-5),0.509312687906457)),J.d(z.$2(9,-3),0.7526807559068452)),J.d(z.$2(9,-1),0.38519665736315783))
if(98>=x)return H.a(b,98)
b[98]=y
z=J.c(J.h(J.c(J.h(J.d(z.$2(9,1),0.8171255055356398),J.d(z.$2(9,3),0.5322256665703469)),J.d(z.$2(9,5),0.21608307321780204)),J.d(z.$2(9,7),0.048317644050206957)),J.d(z.$2(9,9),0.00390625))
if(99>=x)return H.a(b,99)
b[99]=z},
tM:function(a,b,c){var z,y,x,w,v,u,t,s,r
if(typeof a!=="number")return H.b(a)
z=c.length
y=b.length
x=0
for(;x<=a;++x)for(w=-x,v=x<18,u=x*x+x,t=12.566370614359172/(2*x+1);w<=x;++w){s=u+w
if(v){if(s<0||s>=y)return H.a(b,s)
r=b[s]
r=J.d(r,Math.sqrt(t)*C.dv[x])
if(s>=z)return H.a(c,s)
c[s]=r}else{if(s<0||s>=z)return H.a(c,s)
c[s].ce(0)}}},
tK:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.w(g)
y=J.d(z.j(g,1),z.j(g,1))
x=[e.e9(),e.a.aw(4294967295)]
if(typeof y!=="number")return H.b(y)
w=H.p(Array(y),[P.a3])
v=[0,0]
for(z=d.a,u=h.length,t=w.length,s=0.07957747154594767*f,r=0;r<f;++r){v[0]=G.bB(r,x[0])
q=G.c4(r,x[1])
v[1]=q
p=G.bv(v[0],q)
if(J.F(G.J(p,b),0)){q=new G.j(new Float32Array(H.n(a.a)))
o=new G.r(new Float32Array(H.n(p.a)))
n=z.a5(new G.aK(q,o,c,1/0,0,0))
o=$.$get$az()
o.c=J.c(o.c,1)
$.az=o
o=!n
q=o}else q=!1
if(q){G.bn(p,g,w,0)
for(m=0;m<y;++m){if(m>=u)return H.a(h,m)
q=h[m]
if(m>=t)return H.a(w,m)
h[m]=q.j(0,G.q(J.d(w[m],G.aq(p,b))).w(0,s))}}}},
tL:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=J.w(f)
y=J.d(z.j(f,1),z.j(f,1))
x=J.d(y,y)
if(typeof x!=="number")return H.b(x)
z=g.length
w=0
for(;w<x;++w){v=G.q(0)
if(w>=z)return H.a(g,w)
g[w]=v}u=[d.e9(),d.a.aw(4294967295)]
if(typeof y!=="number")return H.b(y)
t=H.p(Array(y),[P.a3])
s=[0,0]
for(v=c.a,r=t.length,q=0.07957747154594767*e,w=0;w<e;++w){s[0]=G.bB(w,u[0])
p=G.c4(w,u[1])
s[1]=p
o=G.bv(s[0],p)
p=new G.j(new Float32Array(H.n(a.a)))
n=new G.r(new Float32Array(H.n(o.a)))
m=v.a5(new G.aK(p,n,b,1/0,0,0))
n=$.$get$az()
n.c=J.c(n.c,1)
$.az=n
if(!m){G.bn(o,f,t,0)
for(l=0;l<y;++l)for(p=l*y,k=0;k<y;++k){n=p+k
if(n>>>0!==n||n>=z)return H.a(g,n)
j=g[n]
if(l>=r)return H.a(t,l)
i=t[l]
if(k>=r)return H.a(t,k)
g[n]=j.j(0,G.q(J.G(J.d(i,t[k]),q)))}}}},
tJ:function(a,b,a0,a1,a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=J.w(a3)
y=J.d(z.j(a3,1),z.j(a3,1))
z=J.w(y)
x=z.i(y,y)
if(typeof x!=="number")return H.b(x)
w=0
for(;w<x;++w){v=G.q(0)
if(w>=a4.length)return H.a(a4,w)
a4[w]=v}v=G.ag()
u=new G.j(new Float32Array(H.k(3)))
u.C(0,0,0)
t=G.B(1,0,0)
s=G.B(0,1,0)
r=new G.a1(new Float32Array(H.k(3)))
r.C(0,0,0)
q=new G.a1(new Float32Array(H.k(3)))
q.C(0,0,0)
p=v.bM(u,t,s,r,q,0,0,null)
q=new G.a1(new Float32Array(H.k(3)))
q.C(0,0,1)
o=G.bw(p,q,1)
q=G.dF(G.am(a,0))
r=o.x
s=o.r++
if(s>=8)return H.a(r,s)
r[s]=q
if(typeof a0!=="number")return H.b(a0)
q=G.d1(1/a0)
s=o.r++
if(s>=8)return H.a(r,s)
r[s]=new G.dd(b,q,new G.bO(1.5,1),9)
q=H.k(z.i(y,a2))
n=new Float32Array(q)
m=H.p(Array(a2),[G.r])
l=[a1.a.aw(4294967295),a1.a.aw(4294967295)]
k=[0,0]
for(v=m.length,w=0;w<a2;++w){k[0]=G.bB(w,l[0])
u=G.c4(w,l[1])
k[1]=u
u=G.bv(k[0],u)
if(w>=v)return H.a(m,w)
m[w]=u
G.bn(u,a3,n,z.i(y,w))}j=0.006332573977646112*a2*a2
for(i=0;i<a2;++i){if(i>=v)return H.a(m,i)
h=m[i]
for(g=0;g<a2;++g){if(g>=v)return H.a(m,g)
f=m[g]
e=o.ay(h,f)
if(!e.Y()){z=f.a
if(2>=z.length)return H.a(z,2)
e=e.i(0,C.b.aW(z[2])/j)
if(typeof y!=="number")return H.b(y)
z=g*y
u=i*y
w=0
for(;w<y;++w)for(t=w*y,s=u+w,d=0;d<y;++d){r=t+d
if(r>>>0!==r||r>=a4.length)return H.a(a4,r)
r=a4[r]
c=z+d
if(c>>>0!==c||c>=q)return H.a(n,c)
c=n[c]
if(s>>>0!==s||s>=q)return H.a(n,s)
r.H(0,e.i(0,J.d(c,n[s])))}}}}},
mj:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=J.w(d)
y=J.d(z.j(d,1),z.j(d,1))
if(typeof y!=="number")return H.b(y)
z=c.length
x=0
for(;x<y;++x){w=G.q(0)
if(x>=z)return H.a(c,x)
c[x]=w
for(v=y*x,u=0;u<y;++u,w=s){if(u>=b.length)return H.a(b,u)
t=b[u]
s=v+u
if(s>>>0!==s||s>=a.length)return H.a(a,s)
s=w.j(0,t.i(0,a[s]))
c[x]=s}}},
tT:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new G.tU(c,d)
y=J.w(d)
x=y.j(d,0)
if(x>>>0!==x||x>=c.length)return H.a(c,x)
c[x]=1
x=y.j(d,2)
if(x>>>0!==x||x>=c.length)return H.a(c,x)
c[x]=a
if(typeof b!=="number")return H.b(b)
w=2
for(;w<=b;++w){x=y.j(d,w*w+w)
if(typeof a!=="number")return H.b(a)
v=w-1
u=z.$2(v,0)
if(typeof u!=="number")return H.b(u)
t=z.$2(w-2,0)
if(typeof t!=="number")return H.b(t)
if(x>>>0!==x||x>=c.length)return H.a(c,x)
c[x]=((2*w-1)*a*u-v*t)/w}x=J.w(a)
v=x.i(a,a)
if(typeof v!=="number")return H.b(v)
s=Math.sqrt(H.v(P.I(0,1-v)))
for(r=s,q=-1,p=1,w=1;w<=b;++w){v=y.j(d,w*w+w+w)
if(v>>>0!==v||v>=c.length)return H.a(c,v)
c[v]=q*p*r
q*=-1
p*=2*w+1
r*=s}for(w=2;w<=b;++w){v=w-1
u=y.j(d,w*w+w+v)
v=J.d(x.i(a,2*w-1),z.$2(v,v))
if(u>>>0!==u||u>=c.length)return H.a(c,u)
c[u]=v}for(w=3;w<=b;++w)for(x=w-2,v=w*w+w,u=w-1,t=2*u+1,o=1;o<=x;++o){n=y.j(d,v+o)
if(typeof a!=="number")return H.b(a)
m=z.$2(u,o)
if(typeof m!=="number")return H.b(m)
l=z.$2(x,o)
if(typeof l!=="number")return H.b(l)
if(n>>>0!==n||n>=c.length)return H.a(c,n)
c[n]=(t*a*m-(u+o)*l)/(w-o)}},
tS:function(a,b){var z,y,x,w
if(b===0)return 1
z=Math.abs(b)
for(y=a-z+1,x=a+z,w=1;y<=x;++y)w*=y
return 1/w},
ml:function(a,b,c,d,e){var z,y,x,w,v,u
if(typeof c!=="number")return H.b(c)
z=d.length
y=e.length
x=0
w=1
v=0
for(;v<c;++v,x=u){if(v>=z)return H.a(d,v)
d[v]=x
if(v>=y)return H.a(e,v)
e[v]=w
if(typeof b!=="number")return H.b(b)
if(typeof a!=="number")return H.b(a)
u=x*b+w*a
w=w*b-x*a}},
tY:function(){var z,y,x,w,v
for(z=$.$get$jl(),y=z.length,x="",w=0;w<z.length;z.length===y||(0,H.aw)(z),++w){v=z[w]
x+=v.a+" | "+v.b+": "+H.m(v.c)+"\n"}return x},
qE:function(a,b){var z,y
a=Math.abs(a)
if(a<0.00001)return 1
if(a>1)return 0
a*=3.141592653589793
z=a*b
y=Math.sin(z)
return y/z*(Math.sin(a)/a)},
de:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=C.b.I(Math.floor(a))
y=C.b.I(Math.floor(b))
x=C.b.I(Math.floor(c))
w=a-z
v=b-y
u=c-x
z&=255
y&=255
x&=255
t=G.cV(z,y,x,w,v,u)
s=z+1
r=w-1
q=G.cV(s,y,x,r,v,u)
p=y+1
o=v-1
n=G.cV(z,p,x,w,o,u)
m=G.cV(s,p,x,r,o,u)
l=x+1
k=u-1
j=G.cV(z,y,l,w,v,k)
i=G.cV(s,y,l,r,v,k)
h=G.cV(z,p,l,w,o,k)
g=G.cV(s,p,l,r,o,k)
f=G.jZ(w)
e=G.jZ(v)
d=G.jZ(u)
k=1-f
o=1-e
return((t*k+q*f)*o+(n*k+m*f)*e)*(1-d)+((j*k+i*f)*o+(h*k+g*f)*e)*d},
f9:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
z=Math.log(H.v(P.I(b.a_(),c.a_())))
y=$.$get$dk()
if(typeof y!=="number")return H.b(y)
x=P.X(J.e8(e),P.I(0,-1-0.5*(z*y)))
w=C.b.X(x)
for(z=a.a,y=z.length,v=0,u=1,t=1,s=0;s<w;++s){if(0>=y)return H.a(z,0)
r=z[0]
if(1>=y)return H.a(z,1)
q=z[1]
if(2>=y)return H.a(z,2)
p=z[2]
o=new Float32Array(3)
if(0>=3)return H.a(o,0)
o[0]=r*u
if(1>=3)return H.a(o,1)
o[1]=q*u
if(2>=3)return H.a(o,2)
o[2]=p*u
o=G.de(o[0],o[1],o[2])
if(typeof o!=="number")return H.b(o)
v+=t*o
u*=1.99
if(typeof d!=="number")return H.b(d)
t*=d}z=G.me(0.3,0.7,x-w)
y=a.i(0,u).a
r=y.length
if(0>=r)return H.a(y,0)
q=y[0]
if(1>=r)return H.a(y,1)
p=y[1]
if(2>=r)return H.a(y,2)
y=G.de(q,p,y[2])
if(typeof y!=="number")return H.b(y)
return v+t*z*y},
uA:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=P.I(b.a_(),c.a_())
y=J.e8(e)
x=Math.log(H.v(z))
w=$.$get$dk()
if(typeof w!=="number")return H.b(w)
v=P.X(y,P.I(0,-1-0.5*(x*w)))
u=C.b.X(v)
for(y=a.a,x=y.length,t=0,s=1,r=1,q=0;q<u;++q){if(0>=x)return H.a(y,0)
w=y[0]
if(1>=x)return H.a(y,1)
p=y[1]
if(2>=x)return H.a(y,2)
o=y[2]
n=new Float32Array(3)
if(0>=3)return H.a(n,0)
n[0]=w*s
if(1>=3)return H.a(n,1)
n[1]=p*s
if(2>=3)return H.a(n,2)
n[2]=o*s
n=J.af(G.de(n[0],n[1],n[2]))
if(typeof n!=="number")return H.b(n)
t+=r*n
s*=1.99
if(typeof d!=="number")return H.b(d)
r*=d}y=G.me(0.3,0.7,v-u)
x=a.i(0,s).a
w=x.length
if(0>=w)return H.a(x,0)
p=x[0]
if(1>=w)return H.a(x,1)
o=x[1]
if(2>=w)return H.a(x,2)
x=J.af(G.de(p,o,x[2]))
if(typeof x!=="number")return H.b(x)
return t+r*y*x+(e-v)*0.2},
cV:function(a,b,c,d,e,f){var z,y,x,w
if(a>=512)return H.a(C.B,a)
z=C.B[a]+b
if(z>=512)return H.a(C.B,z)
z=C.B[z]+c
if(z>=512)return H.a(C.B,z)
y=C.B[z]&15
x=y<8||y===12||y===13?d:e
w=y<4||y===12||y===13?e:f
z=(y&1)!==0?-x:x
return z+((y&2)!==0?-w:w)},
jZ:function(a){var z,y
z=a*a*a
y=z*a
return 6*y*a-15*y+10*z},
eh:function(a){var z=J.y(a)
if(z.av(a,1)){z=z.i(a,a)
if(typeof z!=="number")return H.b(z)
if(typeof a!=="number")return H.b(a)
return-1.4399/z+0.7099/a+0.6681+0.0636*a}else{if(typeof a!=="number")return H.b(a)
z=a*a
return-0.4399+0.7099/a-0.3319/z+0.0636/(z*a)}},
k0:function(a,b){var z,y
z=Math.sqrt(3*(1-a))
y=Math.exp(-1.3333333333333333*b*z)
return a/2*(1+y)*Math.exp(-z)},
vX:function(a,b){var z,y,x,w,v,u,t
z=G.k0(0,b)
y=G.k0(1,b)
for(x=0,w=1,v=0;v<16;++v){u=(x+w)*0.5
t=G.k0(u,b)
if(t<a){z=t
x=u}else{y=t
w=u}}return(x+w)*0.5},
lM:function(a,b,c){var z,y,x
z=G.J(a,b)
y=J.w(c)
x=y.i(c,c)
if(typeof x!=="number")return H.b(x)
y=y.i(c,c)
if(typeof y!=="number")return H.b(y)
if(typeof c!=="number")return H.b(c)
if(typeof z!=="number")return H.b(z)
y=1+y-2*c*z
H.v(y)
H.v(1.5)
return 0.07957747154594767*(1-x)/Math.pow(y,1.5)},
pt:function(a,b,c){var z,y,x
if(!C.v.O(a))return!1
z=C.v.h(0,a)
if(1>=z.length)return H.a(z,1)
z=z[1][0]
y=C.v.h(0,a)
if(1>=y.length)return H.a(y,1)
y=y[1][1]
x=C.v.h(0,a)
if(2>=x.length)return H.a(x,2)
b.cB(z,y,x[2][2])
x=C.v.h(0,a)
if(0>=x.length)return H.a(x,0)
x=x[0][0]
y=C.v.h(0,a)
if(0>=y.length)return H.a(y,0)
y=y[0][1]
z=C.v.h(0,a)
if(0>=z.length)return H.a(z,0)
c.cB(x,y,z[0][2])
return!0},
uf:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p
z=(1+G.eh(c))/(1-G.eh(c))
y=a.a
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
if(1>=x)return H.a(y,1)
v=y[1]
if(2>=x)return H.a(y,2)
u=[w,v,y[2]]
t=H.p(Array(3),[P.a3])
s=H.p(Array(3),[P.a3])
for(r=0;r<3;++r){q=G.vX(u[r],z)
if(typeof b!=="number")return H.b(b)
p=1/b/Math.sqrt(3*(1-q))
y=q*p
t[r]=y
s[r]=p-y}d.cB(s[0],s[1],s[2])
e.cB(t[0],t[1],t[2])},
cu:{
"^":"o;a,b,c,d,e,f,r,x",
eZ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
if(!this.e||J.aG(a,this.a)){z=this.c
b.a=new G.aJ(new Float32Array(H.n(z.a.a)))
b.b=new G.aJ(new Float32Array(H.n(z.b.a)))
return}z=this.b
y=J.y(a)
if(y.av(a,z)){z=this.d
b.a=new G.aJ(new Float32Array(H.n(z.a.a)))
b.b=new G.aJ(new Float32Array(H.n(z.b.a)))
return}x=this.a
y=y.l(a,x)
x=J.h(z,x)
if(typeof y!=="number")return y.w()
if(typeof x!=="number")return H.b(x)
w=y/x
x=1-w
y=this.f[0].a
z=y.length
if(0>=z)return H.a(y,0)
v=y[0]
if(1>=z)return H.a(y,1)
u=y[1]
if(2>=z)return H.a(y,2)
y=y[2]
z=new Float32Array(3)
if(0>=3)return H.a(z,0)
z[0]=v*x
if(1>=3)return H.a(z,1)
z[1]=u*x
if(2>=3)return H.a(z,2)
z[2]=y*x
y=this.f[1].a
u=y.length
if(0>=u)return H.a(y,0)
v=y[0]
if(1>=u)return H.a(y,1)
t=y[1]
if(2>=u)return H.a(y,2)
y=y[2]
u=new Float32Array(3)
if(0>=3)return H.a(u,0)
u[0]=v*w
if(1>=3)return H.a(u,1)
u[1]=t*w
if(2>=3)return H.a(u,2)
u[2]=y*w
s=new G.r(z).j(0,new G.r(u))
u=this.r
r=G.rZ(w,u[0],u[1])
q=G.bH()
for(z=q.a,y=this.x,v=z.length,p=0;p<16;++p){u=y[0].a
if(p>=u.length)return H.a(u,p)
u=u[p]
t=y[1].a
if(p>=t.length)return H.a(t,p)
t=t[p]
if(p>=v)return H.a(z,p)
z[p]=u*x+t*w}z=G.cQ(s)
y=r.a.a
x=y.length
if(0>=x)return H.a(y,0)
v=y[0]
o=v*v
if(1>=x)return H.a(y,1)
u=y[1]
n=u*u
if(2>=x)return H.a(y,2)
y=y[2]
m=y*y
l=v*u
k=v*y
j=u*y
x=r.b
i=v*x
h=u*x
g=y*x
f=G.bH()
x=f.a
y=x.length
if(0>=y)return H.a(x,0)
x[0]=1-2*(n+m)
if(1>=y)return H.a(x,1)
x[1]=2*(l+g)
if(2>=y)return H.a(x,2)
x[2]=2*(k-h)
if(4>=y)return H.a(x,4)
x[4]=2*(l-g)
if(5>=y)return H.a(x,5)
x[5]=1-2*(o+m)
if(6>=y)return H.a(x,6)
x[6]=2*(j+i)
if(8>=y)return H.a(x,8)
x[8]=2*(k+h)
if(9>=y)return H.a(x,9)
x[9]=2*(j-i)
if(10>=y)return H.a(x,10)
x[10]=1-2*(o+n)
x=G.Z(G.fo(f),f)
z=G.Z(G.db(z.a,x.a),G.db(x.b,z.b))
x=G.Z(q,null)
z=G.Z(G.db(z.a,x.a),G.db(x.b,z.b))
b.a=new G.aJ(new Float32Array(H.n(z.a.a)))
b.b=new G.aJ(new Float32Array(H.n(z.b.a)))},
aK:function(a,b){var z
if(b==null)b=G.aO(null,null,0,1/0,0,0)
if(!this.e||J.aG(a.ged(),this.a))this.c.aK(a,b)
else if(J.a7(a.ged(),this.b))this.d.aK(a,b)
else{z=G.Z(null,null)
this.eZ(a.ged(),z)
z.aK(a,b)}b.e=a.ged()
return b},
eh:function(a){return this.aK(a,null)},
fc:function(a,b){var z
if(!this.e||J.aG(a.e,this.a))this.c.fc(a,b)
else if(J.a7(a.e,this.b))this.d.fc(a,b)
else{z=G.Z(null,null)
this.eZ(a.e,z)
z.fc(a,b)}b.e=a.e},
bI:function(a,b){var z
if(!this.e||J.aG(a,this.a))return this.c.a1(b)
else if(J.a7(a,this.b))return this.d.a1(b)
z=G.Z(null,null)
this.eZ(a,z)
return z.a1(b)},
qE:function(a,b){var z,y,x,w,v,u,t,s
if(!this.e){z=this.c
return G.Z(z.b,z.a).eg(a)}y=G.a9(null,null)
x=G.Z(null,null)
for(z=this.a,w=this.b,v=J.w(z),u=J.w(w),t=0;t<128;++t){s=t/127
this.eZ(J.c(v.i(z,1-s),u.i(w,s)),x)
if(b)x=G.Z(x.b,x.a)
s=x.eg(a)
y=new G.ax(new G.j(new Float32Array(H.n(y.a.a))),new G.j(new Float32Array(H.n(y.b.a)))).bk(s)}return y},
lS:function(a){var z,y
this.f[0]=new G.r(new Float32Array(H.n(a.f[0].a)))
this.f[1]=new G.r(new Float32Array(H.n(a.f[1].a)))
z=this.r
y=a.r
z[0]=G.bc(y[0])
z[1]=G.bc(y[1])
y=this.x
z=a.x
y[0]=new G.aJ(new Float32Array(H.n(z[0].a)))
y[1]=new G.aJ(new Float32Array(H.n(z[1].a)))},
lR:function(a,b,c,d){var z,y
z=this.r
y=this.x
G.kt(this.c.a,this.f[0],z[0],y[0])
G.kt(this.d.a,this.f[1],z[1],y[1])},
static:{hq:function(a,b,c,d){var z,y,x,w,v,u
z=G.B(0,0,0)
y=G.B(0,0,0)
x=G.B(0,0,0)
w=G.B(0,0,0)
v=G.bH()
u=G.bH()
u=new G.cu(b,d,G.aC(a),G.aC(c),!a.B(0,c),[z,y],[new G.dO(x,1),new G.dO(w,1)],[v,u])
u.lR(a,b,c,d)
return u},ks:function(a){var z,y,x,w,v,u
z=G.B(0,0,0)
y=G.B(0,0,0)
x=G.B(0,0,0)
w=G.B(0,0,0)
v=G.bH()
u=G.bH()
u=new G.cu(a.a,a.b,G.aC(a.c),G.aC(a.d),a.e,[z,y],[new G.dO(x,1),new G.dO(w,1)],[v,u])
u.lS(a)
return u},kt:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=a.a
y=z.length
if(3>=y)return H.a(z,3)
x=z[3]
w=b.a
v=w.length
if(0>=v)return H.a(w,0)
w[0]=x
if(7>=y)return H.a(z,7)
x=z[7]
if(1>=v)return H.a(w,1)
w[1]=x
if(11>=y)return H.a(z,11)
y=z[11]
if(2>=v)return H.a(w,2)
w[2]=y
z=new Float32Array(H.n(z))
for(y=z.length,u=0;u<3;++u){x=u*4+3
if(x>=y)return H.a(z,x)
z[x]=0
x=12+u
if(x>=y)return H.a(z,x)
z[x]=0}if(15>=y)return H.a(z,15)
z[15]=1
t=new G.aJ(new Float32Array(H.n(z)))
s=0
do{r=G.bH()
for(y=r.a,x=t.a,w=x.length,v=new G.aJ(new Float32Array(H.n(G.fo(t).a))).fO().a,q=v.length,p=y.length,u=0;u<16;++u){if(u>=w)return H.a(x,u)
o=x[u]
if(u>=q)return H.a(v,u)
n=v[u]
if(u>=p)return H.a(y,u)
y[u]=0.5*(o+n)}for(m=0,u=0,l=0;u<3;++u,l+=4){if(l>=w)return H.a(x,l)
v=x[l]
if(l>=p)return H.a(y,l)
q=y[l]
o=l+1
if(o>=w)return H.a(x,o)
n=x[o]
if(o>=p)return H.a(y,o)
o=y[o]
k=l+2
if(k>=w)return H.a(x,k)
j=x[k]
if(k>=p)return H.a(y,k)
m=P.I(m,Math.abs(v-q)+Math.abs(n-o)+Math.abs(j-y[k]))}++s
if(s<100&&m>0.0001){t=r
continue}else break}while(!0)
x=G.B(0,0,0)
w=new G.dO(x,1)
if(0>=p)return H.a(y,0)
v=y[0]
if(5>=p)return H.a(y,5)
q=y[5]
if(10>=p)return H.a(y,10)
o=y[10]
i=v+q+o
if(i>0){h=Math.sqrt(H.v(i+1))
w.b=h/2
h=0.5/h
v=y[9]
q=y[6]
x=x.a
p=x.length
if(0>=p)return H.a(x,0)
x[0]=(v-q)*h
q=y[2]
v=y[8]
if(1>=p)return H.a(x,1)
x[1]=(q-v)*h
v=y[4]
q=y[1]
if(2>=p)return H.a(x,2)
x[2]=(v-q)*h}else{g=[0,0,0]
u=q>v?1:0
v=u*4+u
if(v>=p)return H.a(y,v)
if(o>y[v])u=2
l=C.H[u]
if(l>=3)return H.a(C.H,l)
f=C.H[l]
v=u*4
q=v+u
if(q>=p)return H.a(y,q)
q=y[q]
o=l*4
n=o+l
if(n>=p)return H.a(y,n)
n=y[n]
k=f*4
j=k+f
if(j>=p)return H.a(y,j)
h=Math.sqrt(H.v(q-(n+y[j])+1))
g[u]=h*0.5
if(h!==0)h=0.5/h
q=k+l
if(q>=p)return H.a(y,q)
q=y[q]
n=o+f
if(n>=p)return H.a(y,n)
w.b=(q-y[n])*h
o+=u
if(o>=p)return H.a(y,o)
o=y[o]
n=v+l
if(n>=p)return H.a(y,n)
g[l]=(o+y[n])*h
k+=u
if(k>=p)return H.a(y,k)
k=y[k]
v+=f
if(v>=p)return H.a(y,v)
v=y[v]
if(f>=3)return H.a(g,f)
g[f]=(k+v)*h
v=g[0]
x=x.a
k=x.length
if(0>=k)return H.a(x,0)
x[0]=v
v=g[1]
if(1>=k)return H.a(x,1)
x[1]=v
v=g[2]
if(2>=k)return H.a(x,2)
x[2]=v}c.L(w)
d.L(G.db(new G.aJ(new Float32Array(H.n(y))).fO(),new G.aJ(z)))}}},
ax:{
"^":"o;bC:a<,f7:b<",
du:function(a){var z,y
z=this.a.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=1/0
if(1>=y)return H.a(z,1)
z[1]=1/0
if(2>=y)return H.a(z,2)
z[2]=1/0
z=this.b.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=-1/0
if(1>=y)return H.a(z,1)
z[1]=-1/0
if(2>=y)return H.a(z,2)
z[2]=-1/0},
L:function(a){this.a.L(a.gbC())
this.b.L(a.b)},
dU:function(a){a.L(this.a.i(0,0.5).j(0,this.b.i(0,0.5)))
return this.bV(a)?Math.sqrt(H.v(this.b.l(0,a).a_())):0},
gkm:function(){return this.a.i(0,0.5).j(0,this.b.i(0,0.5))},
h:function(a,b){return J.i(b,0)?this.a:this.b},
b7:function(a,b,c){var z,y,x,w,v,u,t,s,r
z=a.gil()
y=a.d
for(x=0;x<3;++x){w=J.e(a.b,x)
if(typeof w!=="number")return H.b(w)
v=1/w
w=this.a.a
if(x>=w.length)return H.a(w,x)
w=w[x]
u=a.a.a
if(x>=u.length)return H.a(u,x)
u=u[x]
t=(w-u)*v
w=this.b.a
if(x>=w.length)return H.a(w,x)
s=(w[x]-u)*v
if(t>s){r=s
s=t
t=r}if(typeof z!=="number")return H.b(z)
if(t>z)z=t
if(typeof y!=="number")return H.b(y)
if(s<y)y=s
if(z>y)return!1}if(b!=null)b[0]=z
if(c!=null)c[0]=y
return!0},
a5:function(a){return this.b7(a,null,null)},
ih:function(a,b){return this.b7(a,b,null)},
bV:function(a){var z,y,x,w,v,u,t
z=a.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=this.a.a
v=w.length
if(0>=v)return H.a(w,0)
if(x>=w[0]){u=this.b.a
t=u.length
if(0>=t)return H.a(u,0)
if(x<=u[0]){if(1>=y)return H.a(z,1)
x=z[1]
if(1>=v)return H.a(w,1)
if(x>=w[1]){if(1>=t)return H.a(u,1)
if(x<=u[1]){if(2>=y)return H.a(z,2)
z=z[2]
if(2>=v)return H.a(w,2)
if(z>=w[2]){if(2>=t)return H.a(u,2)
z=z<=u[2]}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
return z},
aR:function(a){var z,y
z=this.a.a
if(0>=z.length)return H.a(z,0)
y=J.C(a)
z[0]=P.X(z[0],y.gG(a))
z=this.a.a
if(1>=z.length)return H.a(z,1)
z[1]=P.X(z[1],y.gF(a))
z=this.a.a
if(2>=z.length)return H.a(z,2)
z[2]=P.X(z[2],y.gS(a))
z=this.b.a
if(0>=z.length)return H.a(z,0)
z[0]=P.I(z[0],y.gG(a))
z=this.b.a
if(1>=z.length)return H.a(z,1)
z[1]=P.I(z[1],y.gF(a))
z=this.b.a
if(2>=z.length)return H.a(z,2)
z[2]=P.I(z[2],y.gS(a))
return this},
bk:function(a){var z,y,x
z=this.a.a
if(0>=z.length)return H.a(z,0)
y=z[0]
x=a.gbC().a
if(0>=x.length)return H.a(x,0)
z[0]=P.X(y,x[0])
x=this.a.a
if(1>=x.length)return H.a(x,1)
y=x[1]
z=a.a.a
if(1>=z.length)return H.a(z,1)
x[1]=P.X(y,z[1])
z=this.a.a
if(2>=z.length)return H.a(z,2)
y=z[2]
x=a.a.a
if(2>=x.length)return H.a(x,2)
z[2]=P.X(y,x[2])
x=this.b.a
if(0>=x.length)return H.a(x,0)
y=x[0]
z=a.b.a
if(0>=z.length)return H.a(z,0)
x[0]=P.I(y,z[0])
z=this.b.a
if(1>=z.length)return H.a(z,1)
y=z[1]
x=a.b.a
if(1>=x.length)return H.a(x,1)
z[1]=P.I(y,x[1])
x=this.b.a
if(2>=x.length)return H.a(x,2)
y=x[2]
z=a.b.a
if(2>=z.length)return H.a(z,2)
x[2]=P.I(y,z[2])
return this},
i4:function(a,b){var z,y
z=this.a.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=z[0]-b
if(1>=y)return H.a(z,1)
z[1]=z[1]-b
if(2>=y)return H.a(z,2)
z[2]=z[2]-b
z=this.b.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=z[0]+b
if(1>=y)return H.a(z,1)
z[1]=z[1]+b
if(2>=y)return H.a(z,2)
z[2]=z[2]+b},
dA:function(){var z,y,x,w
z=this.b.l(0,this.a).a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
return 2*(x*w+x*z+w*z)},
li:function(a){var z,y,x,w
z=this.b.l(0,this.a).a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return x*w*z[2]},
f5:function(){var z,y,x,w
z=this.b.l(0,this.a).a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(x>w){if(2>=y)return H.a(z,2)
x=x>z[2]}else x=!1
if(x)return 0
else{if(2>=y)return H.a(z,2)
if(w>z[2])return 1
else return 2}},
kL:function(a,b,c){var z,y,x,w,v,u,t,s
z=this.a.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=this.b.a
v=w.length
if(0>=v)return H.a(w,0)
u=w[0]
if(1>=y)return H.a(z,1)
t=z[1]
if(1>=v)return H.a(w,1)
s=w[1]
if(2>=y)return H.a(z,2)
z=z[2]
if(2>=v)return H.a(w,2)
w=w[2]
v=new G.j(new Float32Array(H.k(3)))
v.C(x*(1-a)+u*a,t*(1-b)+s*b,z*(1-c)+w*c)
return v},
kS:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=b.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=this.a.a
v=w.length
if(0>=v)return H.a(w,0)
u=w[0]
t=this.b.a
s=t.length
if(0>=s)return H.a(t,0)
r=t[0]
if(1>=y)return H.a(z,1)
q=z[1]
if(1>=v)return H.a(w,1)
p=w[1]
if(1>=s)return H.a(t,1)
o=t[1]
if(2>=y)return H.a(z,2)
z=z[2]
if(2>=v)return H.a(w,2)
w=w[2]
if(2>=s)return H.a(t,2)
return G.B((x-u)/(r-u),(q-p)/(o-p),(z-w)/(t[2]-w))},
lT:function(a,b){var z,y,x,w,v,u
z=a==null
if(z&&b==null){z=new G.j(new Float32Array(H.k(3)))
z.C(1/0,1/0,1/0)
this.a=z
z=new G.j(new Float32Array(H.k(3)))
z.C(-1/0,-1/0,-1/0)
this.b=z}else{z=!z&&b!=null
y=J.C(a)
if(z){z=J.C(b)
x=P.X(y.gG(a),z.gG(b))
w=P.X(y.gF(a),z.gF(b))
v=P.X(y.gS(a),z.gS(b))
u=new G.j(new Float32Array(H.k(3)))
u.C(x,w,v)
this.a=u
u=P.I(y.gG(a),z.gG(b))
v=P.I(y.gF(a),z.gF(b))
z=P.I(y.gS(a),z.gS(b))
y=new G.j(new Float32Array(H.k(3)))
y.C(u,v,z)
this.b=y}else{this.a=new G.j(new Float32Array(H.n(y.gA(a))))
this.b=new G.j(new Float32Array(H.n(y.gA(a))))}}},
static:{a9:function(a,b){var z=new G.ax(null,null)
z.lT(a,b)
return z},bK:function(a){return new G.ax(new G.j(new Float32Array(H.n(a.gbC().a))),new G.j(new Float32Array(H.n(a.b.a))))}}},
bp:{
"^":"o;fK:a<,aZ:b<,d5:c<,b0:d<",
en:function(a,b){var z,y,x,w,v,u
z=this.em(a,b)
y=G.kF(a)
y.a=J.c(y.a,1)
x=G.aO(null,null,0,1/0,0,0)
w=this.em(y,x)
b.x=new G.j(new Float32Array(H.n(x.a.a)))
b.z=new G.r(new Float32Array(H.n(J.N(x.b))))
y.a=J.h(y.a,1)
y.b=J.c(y.b,1)
v=G.aO(null,null,0,1/0,0,0)
u=this.em(y,v)
b.y=new G.j(new Float32Array(H.n(v.a.a)))
b.Q=new G.r(new Float32Array(H.n(J.N(v.b))))
if(w===0||u===0)return 0
b.r=!0
return z}},
hx:{
"^":"o;a,b,c,d,e",
static:{oo:function(){return new G.hx(0,0,0,0,0)},kF:function(a){return new G.hx(a.a,a.b,a.c,a.d,a.e)}}},
pj:{
"^":"z:40;a,b",
$1:function(a){var z,y
z=this.a.$0()
y=this.b
if(z==null)y.aB(0,null)
else P.pm(new G.pk(z),null).ec(this,y.gkq())}},
pk:{
"^":"z:1;a",
$0:function(){return this.a}},
t1:{
"^":"z:37;a,b",
$1:function(a){var z=C.i.bS(a,0)
return z>=this.a&&z<=this.b}},
t2:{
"^":"z:37;",
$1:function(a){return a===" "||a==="\t"||a==="\n"||a==="\r"}},
yi:{
"^":"z:7;a",
$2:function(a,b){return this.a.$2(a,b)===!0?-1:1}},
kP:{
"^":"o;au:a>,kQ:b<,rg:c<,aL:d<,e,f,r,x,y,z,Q,ch,cx,cy,db",
bM:function(a,b,c,d,e,f,g,h){var z,y,x,w
this.a=a
this.f=b
this.r=c
this.x=d
this.y=e
z=new G.a1(new Float32Array(H.n(G.aF(b,c).a)))
z.cq(Math.sqrt(H.v(z.a_())))
this.b=z
this.c=f
this.d=g
this.e=h
this.ch=0
this.cx=0
this.cy=0
this.db=0
y=h!=null
x=y&&h.c===!0?1:0
w=y&&h.d?1:0
if(y&&(x^w)!==0)this.b=z.i(0,-1)
return this},
L:function(a){this.a.L(J.b8(a))
this.b.L(a.gkQ())
this.c=a.grg()
this.d=a.d
this.e=a.e
this.f.L(a.f)
this.r.L(a.r)
this.x.L(a.x)
this.y.L(a.y)
this.z.L(a.z)
this.Q.L(a.Q)
this.ch=a.ch
this.cx=a.cx
this.cy=a.cy
this.db=a.db},
kr:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
if(a.gkE()){z=this.b
y=this.a.a
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
if(1>=x)return H.a(y,1)
v=y[1]
if(2>=x)return H.a(y,2)
u=J.M(G.J(z,G.B(w,v,y[2])))
y=a.x.a
v=y.length
if(0>=v)return H.a(y,0)
w=y[0]
if(1>=v)return H.a(y,1)
z=y[1]
if(2>=v)return H.a(y,2)
t=G.B(w,z,y[2])
s=J.G(J.M(J.c(G.J(this.b,t),u)),G.J(this.b,a.z))
if(J.dv(s)){this.cx=0
this.ch=0
this.db=0
this.cy=0
this.z=G.B(0,0,0)
this.Q=G.B(0,0,0)
return}z=new Float32Array(H.n(a.x.j(0,J.d(a.z,s)).a))
y=new Float32Array(H.n(a.y.a))
r=J.G(J.M(J.c(G.J(this.b,new G.r(y)),u)),G.J(this.b,a.Q))
if(J.dv(r)){this.cx=0
this.ch=0
this.db=0
this.cy=0
this.z=G.B(0,0,0)
this.Q=G.B(0,0,0)
return}y=new Float32Array(H.n(a.y.j(0,J.d(a.Q,r)).a))
this.z=new G.j(z).l(0,this.a)
this.Q=new G.j(y).l(0,this.a)
q=H.p(Array(4),[P.a3])
p=H.p(Array(2),[P.a3])
o=H.p(Array(2),[P.a3])
x=Array(2)
x.fixed$length=Array
n=H.p(x,[P.x])
if(J.F(J.af(J.V(this.b)),J.af(J.S(this.b)))&&J.F(J.af(J.V(this.b)),J.af(J.P(this.b)))){n[0]=1
n[1]=2
x=1}else{if(J.F(J.af(J.S(this.b)),J.af(J.P(this.b)))){n[0]=0
n[1]=2}else{n[0]=0
n[1]=1}x=0}q[0]=J.e(this.f,x)
q[1]=J.e(this.r,n[0])
q[2]=J.e(this.f,n[1])
q[3]=J.e(this.r,n[1])
x=n[0]
w=z.length
if(x>>>0!==x||x>=w)return H.a(z,x)
v=z[x]
m=this.a.a
l=m.length
if(x>=l)return H.a(m,x)
p[0]=v-m[x]
x=n[1]
if(x>>>0!==x||x>=w)return H.a(z,x)
z=z[x]
if(x>=l)return H.a(m,x)
p[1]=z-m[x]
x=n[0]
z=y.length
if(x>>>0!==x||x>=z)return H.a(y,x)
w=y[x]
if(x>=l)return H.a(m,x)
o[0]=w-m[x]
x=n[1]
if(x>>>0!==x||x>=z)return H.a(y,x)
y=y[x]
if(x>=l)return H.a(m,x)
o[1]=y-m[x]
k=[0]
j=[0]
if(!G.j7(q,p,k,j)){this.ch=0
this.cx=0}else{this.ch=k[0]
this.cx=j[0]}if(!G.j7(q,o,k,j)){this.cy=0
this.db=0}else{this.cy=k[0]
this.db=j[0]}}else{this.cx=0
this.ch=0
this.db=0
this.cy=0
this.z=G.B(0,0,0)
this.Q=G.B(0,0,0)}},
b9:function(a,b,c,d,e){return this.a.$4(b,c,d,e)},
static:{ag:function(){var z,y,x,w,v,u
z=new G.j(new Float32Array(H.k(3)))
z.C(0,0,0)
y=new G.a1(new Float32Array(H.k(3)))
y.C(0,0,0)
x=G.B(0,0,0)
w=G.B(0,0,0)
v=new G.a1(new Float32Array(H.k(3)))
v.C(0,0,0)
u=new G.a1(new Float32Array(H.k(3)))
u.C(0,0,0)
return new G.kP(z,y,0,0,null,x,w,v,u,G.B(0,0,0),G.B(0,0,0),0,0,0,0)}}},
d3:{
"^":"o;fe:a<,ll:b<,lE:c?"},
d4:{
"^":"o;ff:a<,fg:b<,qu:c<,qv:d<"},
ld:{
"^":"o;",
cc:function(a,b,c){},
bs:function(a,b,c){}},
b0:{
"^":"o;ku:a<,b,lj:c<,kR:d<,iK:e<,qO:f?,f8:r<",
L:function(a){this.a=a.gku()
this.b=a.b
this.c=a.c
this.d=a.d
this.e=a.e
this.f=a.f
this.r=a.r},
ba:function(a){this.a.kr(a)
return this.b.aV(this.a,this.d)},
iD:function(a){this.a.kr(a)
return this.b.d0(this.a,this.d)},
aS:function(a){var z,y
z=this.b.d
if(z!=null){y=this.a
y=z.d6(y.a,y.b,a)}else y=G.q(0)
return y},
static:{em:function(){return new G.b0(G.ag(),null,null,null,0,0,0)}}},
qA:{
"^":"o;a,b,c,d",
bX:function(a,b,c){this.bl(0,a,b,c)},
hn:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=J.w(b)
if(J.i(z.j(b,1),c)){z=this.a
if(a<0||a>=z.length)return H.a(z,a)
z[a]=new G.jW(null,3,!1,536870911)
z=this.b
if(b>>>0!==b||b>=e.length)return H.a(e,b)
y=e[b]
if(y>>>0!==y||y>=d.length)return H.a(d,y)
y=d[y]
if(a>=z.length)return H.a(z,a)
z[a]=y
return}x=G.a9(null,null)
for(y=e.length,w=b;J.K(w,c);++w){if(w>>>0!==w||w>=y)return H.a(e,w)
v=e[w]
if(v>>>0!==v||v>=d.length)return H.a(d,v)
v=J.b8(d[v])
x=new G.ax(new G.j(new Float32Array(H.n(x.a.a))),new G.j(new Float32Array(H.n(x.b.a)))).aR(v)}u=x.f5()
t=J.ac(z.j(b,c),2)
G.eY(e,b,t,c,new G.vg(d,u))
v=this.a
if(t>>>0!==t||t>=y)return H.a(e,t)
y=e[t]
if(y>>>0!==y||y>=d.length)return H.a(d,y)
y=J.e(J.b8(d[y]),u)
if(a<0||a>=v.length)return H.a(v,a)
v[a]=new G.jW(y,u,!1,536870911)
y=this.b
v=e[t]
if(v>>>0!==v||v>=d.length)return H.a(d,v)
v=d[v]
if(a>=y.length)return H.a(y,a)
y[a]=v
if(z.U(b,t)){z=this.a
if(a>=z.length)return H.a(z,a)
z[a].c=!0
this.hn(this.d++,b,t,d,e)}z=t+1
if(typeof c!=="number")return H.b(c)
if(z<c){y=this.a
v=y.length
if(a>=v)return H.a(y,a)
s=y[a]
r=this.d++
s.d=r
if(a>=v)return H.a(y,a)
this.hn(r,z,c,d,e)}},
bl:function(a,b,c,d){var z,y,x,w,v,u
z=this.a
if(a<0||a>=z.length)return H.a(z,a)
y=z[a]
x=y.b
if(x!==3){z=J.D(b)
w=z.h(b,x)
v=y.a
u=J.d(J.h(w,v),J.h(z.h(b,x),v))
if(J.aG(z.h(b,x),v)){if(y.c)this.bl(a+1,b,c,d)
if(0>=d.length)return H.a(d,0)
if(J.K(u,d[0])){z=y.d
w=this.c
if(typeof w!=="number")return H.b(w)
w=z<w
z=w}else z=!1
if(z)this.bl(y.d,b,c,d)}else{z=y.d
w=this.c
if(typeof w!=="number")return H.b(w)
if(z<w)this.bl(z,b,c,d)
if(0>=d.length)return H.a(d,0)
if(J.K(u,d[0])&&y.c)this.bl(a+1,b,c,d)}}z=this.b
if(a>=z.length)return H.a(z,a)
u=J.h(b,J.b8(z[a])).a_()
if(0>=d.length)return H.a(d,0)
z=d[0]
if(typeof z!=="number")return H.b(z)
if(u<z){z=this.b
if(a>=z.length)return H.a(z,a)
c.$4(b,z[a],u,d)}},
mo:function(a){var z,y,x,w
z=a.length
this.c=z
this.d=1
this.a=H.p(Array(z),[G.jW])
z=this.c
if(typeof z!=="number")return H.b(z)
this.b=Array(z)
y=H.p(Array(z),[P.x])
z=this.c
if(typeof z!=="number")return H.b(z)
x=y.length
w=0
for(;w<z;++w){if(w>=x)return H.a(y,w)
y[w]=w}this.hn(0,0,z,a,y)},
static:{es:function(a){var z=new G.qA(null,null,null,null)
z.mo(a)
return z}}},
vg:{
"^":"o:35;A:a>,b",
$2:function(a,b){var z,y
z=this.a
if(a>>>0!==a||a>=z.length)return H.a(z,a)
z=J.e(J.b8(z[a]),this.b)
y=this.a
if(b>>>0!==b||b>=y.length)return H.a(y,b)
y=J.i(z,J.e(J.b8(y[b]),this.b))
z=this.a
if(y){if(a>=z.length)return H.a(z,a)
z=J.aS(z[a])
y=this.a
if(b>=y.length)return H.a(y,b)
y=J.K(z,J.aS(y[b]))
z=y}else{if(a>=z.length)return H.a(z,a)
z=J.e(J.b8(z[a]),this.b)
y=this.a
if(b>=y.length)return H.a(y,b)
y=J.K(z,J.e(J.b8(y[b]),this.b))
z=y}return z}},
jW:{
"^":"o;a,b,c,d"},
cD:{
"^":"o;br:c<",
aS:function(a){return G.q(0)},
ha:["lJ",function(a,b,c,d,e,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.w(c)
y=J.d(z.j(c,1),z.j(c,1))
if(typeof y!=="number")return H.b(y)
x=a2.length
w=0
for(;w<y;++w){v=G.q(0)
if(w>=x)return H.a(a2,w)
a2[w]=v}u=G.aX(this.c)
t=a1.a.aw(4294967295)
s=[a1.a.aw(4294967295),a1.a.aw(4294967295)]
v=H.k(J.d(z.j(c,1),z.j(c,1)))
r=new Float32Array(v)
q=[0,0]
p=[0]
for(o=d.a,w=0;w<u;++w){q[0]=G.bB(w,s[0])
n=G.c4(w,s[1])
q[1]=n
m=q[0]
l=G.bB(w,t)
k=new Float32Array(2)
if(0>=2)return H.a(k,0)
k[0]=m
if(1>=2)return H.a(k,1)
k[1]=n
n=new Float32Array(3)
j=new G.r(n)
if(0>=3)return H.a(n,0)
n[0]=0
if(1>=3)return H.a(n,1)
n[1]=0
if(2>=3)return H.a(n,2)
n[2]=0
i=new G.eO(null)
h=this.bL(a,b,new G.c0(k,l),a0,j,p,i)
if(!h.Y())if(p[0]>0)if(e){g=o.a5(i.a)
n=$.$get$az()
n.c=J.c(n.c,1)
$.az=n
n=!g}else n=!0
else n=!1
else n=!1
if(n){G.bn(j,c,r,0)
f=0
while(!0){n=J.d(z.j(c,1),z.j(c,1))
if(typeof n!=="number")return H.b(n)
if(!(f<n))break
if(f>=x)return H.a(a2,f)
n=a2[f]
if(f>=v)return H.a(r,f)
a2[f]=J.c(n,h.i(0,r[f]).w(0,p[0]*u));++f}}}}],
d7:function(a,b){if(this.b.qj())$.t.$2(1,"Scaling detected in world to light transformation! The system has numerous assumptions, implicit and explicit, that this transform will have no scale factors in it. Proceed at your own risk; your image may have errors or the system may crash as a result of this.")}},
o9:{
"^":"cD;"},
c0:{
"^":"o;a,lf:b<",
ms:function(a,b,c){var z,y,x,w,v
z=this.a
y=a.gle()
x=b.c
if(x>>>0!==x||x>=y.length)return H.a(y,x)
y=y[x]
w=2*c
if(w>=y.length)return H.a(y,w)
y=y[w]
v=z.length
if(0>=v)return H.a(z,0)
z[0]=y
y=a.y
if(x>=y.length)return H.a(y,x)
x=y[x];++w
if(w>=x.length)return H.a(x,w)
w=x[w]
if(1>=v)return H.a(z,1)
z[1]=w
w=a.x
z=b.b
if(z>>>0!==z||z>=w.length)return H.a(w,z)
this.b=J.e(w[z],c)},
mr:function(a){var z,y,x
z=this.a
y=a.bZ()
x=z.length
if(0>=x)return H.a(z,0)
z[0]=y
y=a.a.P()
if(1>=x)return H.a(z,1)
z[1]=y
this.b=a.a.P()},
static:{lp:function(a,b,c){var z=new G.c0(new Float32Array(H.k(2)),null)
z.ms(a,b,c)
return z},im:function(a){var z=new G.c0(new Float32Array(H.k(2)),null)
z.mr(a)
return z}}},
ba:{
"^":"o;br:a<,b,c",
mt:function(a,b){var z=this.a
C.c.H(b.f,z)
this.b=b.f.length-1
z=this.a
C.c.H(b.r,z)
this.c=b.r.length-1},
static:{qF:function(a,b){var z=new G.ba(a,null,null)
z.mt(a,b)
return z}}},
tx:{
"^":"o;a,bg:b<,c,d",
c1:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o
if(c==null){z=this.d.d2(a.b,null)
y=this.a
x=y.length
w=C.b.R(z,x)
if(w>>>0!==w||w>=x)return H.a(y,w)
y=y[w]
x=a.a
z=x.length
if(0>=z)return H.a(x,0)
v=x[0]
if(1>=z)return H.a(x,1)
return y.c1(v,x[1],b)}z=this.d.d2(a.b,null)
y=this.a
x=y.length
w=C.b.R(z,x)
if(w>>>0!==w||w>=x)return H.a(y,w)
x=y[w]
z=a.a
v=z.length
if(0>=v)return H.a(z,0)
u=z[0]
if(1>=v)return H.a(z,1)
t=G.aO(c,x.iG(c,u,z[1],b).l(0,c),0.001,1/0,0,0)
s=[0]
r=[1]
q=G.ag()
for(p=!1,o=0;o<y.length;++o)p=y[o].bW(t,r,s,q)||p
if(p)b.L(q.b)
z=r[0]
return new G.j(new Float32Array(H.n(t.a.j(0,J.d(t.b,z)).a)))},
h9:function(a,b){return this.c1(a,b,null)},
ao:function(a,b){var z,y,x,w,v
if(b!=null){for(z=this.a,y=this.c,x=0,w=0;w<z.length;++w){if(w>=y.length)return H.a(y,w)
v=J.d(y[w],z[w].kY(a,b))
if(typeof v!=="number")return H.b(v)
x+=v}z=this.b
if(typeof z!=="number")return H.b(z)
return x/z}for(z=this.a,y=this.c,x=0,w=0;w<z.length;++w){if(w>=y.length)return H.a(y,w)
v=J.d(y[w],z[w].is(a))
if(typeof v!=="number")return H.b(v)
x+=v}z=this.b
if(typeof z!=="number")return H.b(z)
return x/z},
is:function(a){return this.ao(a,null)},
mP:function(a){var z,y,x,w,v,u,t
z=[]
z.push(a)
for(y=this.a;z.length!==0;){x=C.c.gcQ(z)
if(0>=z.length)return H.a(z,0)
z.pop()
if(x.b_())y.push(x)
else x.cr(z)}w=y.length
if(w>64){w="Area light geometry turned into "+w+" shapes; may be very inefficient."
$.t.$2(1,w)}this.b=0
for(w=this.c,v=0;v<y.length;++v){u=y[v].c6()
w.push(u)
t=this.b
if(typeof t!=="number")return t.j()
if(typeof u!=="number")return H.b(u)
this.b=t+u}this.d=G.f6(w,w.length)},
static:{ty:function(a){var z=new G.tx([],null,[],null)
z.mP(a)
return z}}},
eO:{
"^":"o;a"},
bx:{
"^":"o;",
d0:function(a,b){return}},
aJ:{
"^":"o;A:a>",
B:function(a,b){var z,y,x,w
if(b==null)return!1
for(z=this.a,y=z.length,x=J.C(b),w=0;w<16;++w){if(w>=y)return H.a(z,w)
if(z[w]!==J.e(x.gA(b),w))return!1}return!0},
L:function(a){var z,y,x,w
z=this.a
y=J.C(a)
x=J.e(y.gA(a),0)
w=z.length
if(0>=w)return H.a(z,0)
z[0]=x
x=J.e(y.gA(a),1)
if(1>=w)return H.a(z,1)
z[1]=x
x=J.e(y.gA(a),2)
if(2>=w)return H.a(z,2)
z[2]=x
x=J.e(y.gA(a),3)
if(3>=w)return H.a(z,3)
z[3]=x
x=J.e(y.gA(a),4)
if(4>=w)return H.a(z,4)
z[4]=x
x=J.e(y.gA(a),5)
if(5>=w)return H.a(z,5)
z[5]=x
x=J.e(y.gA(a),6)
if(6>=w)return H.a(z,6)
z[6]=x
x=J.e(y.gA(a),7)
if(7>=w)return H.a(z,7)
z[7]=x
x=J.e(y.gA(a),8)
if(8>=w)return H.a(z,8)
z[8]=x
x=J.e(y.gA(a),9)
if(9>=w)return H.a(z,9)
z[9]=x
x=J.e(y.gA(a),10)
if(10>=w)return H.a(z,10)
z[10]=x
x=J.e(y.gA(a),11)
if(11>=w)return H.a(z,11)
z[11]=x
x=J.e(y.gA(a),12)
if(12>=w)return H.a(z,12)
z[12]=x
x=J.e(y.gA(a),13)
if(13>=w)return H.a(z,13)
z[13]=x
x=J.e(y.gA(a),14)
if(14>=w)return H.a(z,14)
z[14]=x
y=J.e(y.gA(a),15)
if(15>=w)return H.a(z,15)
z[15]=y
return this},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c
return c},
fO:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(4>=y)return H.a(z,4)
w=z[4]
if(8>=y)return H.a(z,8)
v=z[8]
if(12>=y)return H.a(z,12)
u=z[12]
t=z[1]
s=z[5]
r=z[9]
if(13>=y)return H.a(z,13)
q=z[13]
p=z[2]
o=z[6]
n=z[10]
if(14>=y)return H.a(z,14)
m=z[14]
l=z[3]
k=z[7]
j=z[11]
if(15>=y)return H.a(z,15)
i=z[15]
y=u*r
h=y*o
g=v*q
f=g*o
e=u*s
d=e*n
c=w*q
b=c*n
a=v*s
a0=a*m
a1=w*r
a2=a1*m
a3=y*p
a4=g*p
a5=u*t
a6=a5*n
a7=x*q
a8=a7*n
a9=v*t
b0=a9*m
b1=x*r
b2=b1*m
b3=e*p
b4=c*p
b5=a5*o
b6=a7*o
b7=w*t
b8=b7*m
b9=x*s
c0=b9*m
c1=a*p
c2=a1*p
c3=a9*o
c4=b1*o
c5=b7*n
c6=b9*n
c7=h*l-f*l-d*l+b*l+a0*l-a2*l-a3*k+a4*k+a6*k-a8*k-b0*k+b2*k+b3*j-b4*j-b5*j+b6*j+b8*j-c0*j-c1*i+c2*i+c3*i-c4*i-c5*i+c6*i
if(c7===0)return this
c8=1/c7
c9=r*m
d0=q*n
d1=q*o
d2=s*m
d3=r*o
d4=s*n
z[0]=(c9*k-d0*k+d1*j-d2*j-d3*i+d4*i)*c8
d5=u*n
d6=v*m
d7=u*o
d8=w*m
d9=v*o
e0=w*n
z[4]=(d5*k-d6*k-d7*j+d8*j+d9*i-e0*i)*c8
z[8]=(g*k-y*k+e*j-c*j-a*i+a1*i)*c8
z[12]=(h-f-d+b+a0-a2)*c8
a2=q*p
a0=t*m
b=r*p
d=t*n
z[1]=(d0*l-c9*l-a2*j+a0*j+b*i-d*i)*c8
c9=u*p
d0=x*m
f=v*p
h=x*n
z[5]=(d6*l-d5*l+c9*j-d0*j-f*i+h*i)*c8
z[9]=(y*l-g*l-a5*j+a7*j+a9*i-b1*i)*c8
z[13]=(a4-a3+a6-a8-b0+b2)*c8
b2=s*p
b0=t*o
z[2]=(d2*l-d1*l+a2*k-a0*k-b2*i+b0*i)*c8
a0=w*p
a2=x*o
z[6]=(d7*l-d8*l-c9*k+d0*k+a0*i-a2*i)*c8
z[10]=(c*l-e*l+a5*k-a7*k-b7*i+b9*i)*c8
z[14]=(b3-b4-b5+b6+b8-c0)*c8
z[3]=(d3*l-d4*l-b*k+d*k+b2*j-b0*j)*c8
z[7]=(e0*l-d9*l+f*k-h*k-a0*j+a2*j)*c8
z[11]=(a*l-a1*l-a9*k+b1*k+b7*j-b9*j)*c8
z[15]=(c2-c1+c3-c4-c5+c6)*c8
return this},
K:function(a){var z,y,x
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=H.m(z[0])+" "
if(1>=y)return H.a(z,1)
x=x+H.m(z[1])+" "
if(2>=y)return H.a(z,2)
x=x+H.m(z[2])+" "
if(3>=y)return H.a(z,3)
x=x+H.m(z[3])+" "
if(4>=y)return H.a(z,4)
x=x+H.m(z[4])+" "
if(5>=y)return H.a(z,5)
x=x+H.m(z[5])+" "
if(6>=y)return H.a(z,6)
x=x+H.m(z[6])+" "
if(7>=y)return H.a(z,7)
x=x+H.m(z[7])+" "
if(8>=y)return H.a(z,8)
x=x+H.m(z[8])+" "
if(9>=y)return H.a(z,9)
x=x+H.m(z[9])+" "
if(10>=y)return H.a(z,10)
x=x+H.m(z[10])+" "
if(11>=y)return H.a(z,11)
x=x+H.m(z[11])+" "
if(12>=y)return H.a(z,12)
x=x+H.m(z[12])+" "
if(13>=y)return H.a(z,13)
x=x+H.m(z[13])+" "
if(14>=y)return H.a(z,14)
x=x+H.m(z[14])+" "
if(15>=y)return H.a(z,15)
return x+H.m(z[15])},
mz:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=a
if(1>=y)return H.a(z,1)
z[1]=b
if(2>=y)return H.a(z,2)
z[2]=c
if(3>=y)return H.a(z,3)
z[3]=d
if(4>=y)return H.a(z,4)
z[4]=e
if(5>=y)return H.a(z,5)
z[5]=f
if(6>=y)return H.a(z,6)
z[6]=g
if(7>=y)return H.a(z,7)
z[7]=h
if(8>=y)return H.a(z,8)
z[8]=i
if(9>=y)return H.a(z,9)
z[9]=j
if(10>=y)return H.a(z,10)
z[10]=k
if(11>=y)return H.a(z,11)
z[11]=l
if(12>=y)return H.a(z,12)
z[12]=m
if(13>=y)return H.a(z,13)
z[13]=n
if(14>=y)return H.a(z,14)
z[14]=o
if(15>=y)return H.a(z,15)
z[15]=p},
my:function(){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=1
if(5>=y)return H.a(z,5)
z[5]=1
if(10>=y)return H.a(z,10)
z[10]=1
if(15>=y)return H.a(z,15)
z[15]=1},
static:{bH:function(){var z=new G.aJ(new Float32Array(H.k(16)))
z.my()
return z},cg:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z=new G.aJ(new Float32Array(H.k(16)))
z.mz(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p)
return z},fo:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=a.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(4>=y)return H.a(z,4)
w=z[4]
if(8>=y)return H.a(z,8)
v=z[8]
if(12>=y)return H.a(z,12)
u=z[12]
t=z[1]
s=z[5]
r=z[9]
if(13>=y)return H.a(z,13)
q=z[13]
p=z[2]
o=z[6]
n=z[10]
if(14>=y)return H.a(z,14)
m=z[14]
l=z[3]
k=z[7]
j=z[11]
if(15>=y)return H.a(z,15)
return G.cg(x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,z[15])},db:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=G.bH()
for(y=z.a,x=a.a,w=x.length,v=b.a,u=v.length,t=y.length,s=0,r=0;s<4;++s,r+=4)for(q=r+1,p=r+2,o=r+3,n=0;n<4;++n){m=r+n
if(r>=w)return H.a(x,r)
l=x[r]
if(n>=u)return H.a(v,n)
k=v[n]
if(q>=w)return H.a(x,q)
j=x[q]
i=4+n
if(i>=u)return H.a(v,i)
i=v[i]
if(p>=w)return H.a(x,p)
h=x[p]
g=8+n
if(g>=u)return H.a(v,g)
g=v[g]
if(o>=w)return H.a(x,o)
f=x[o]
e=12+n
if(e>=u)return H.a(v,e)
e=v[e]
if(m>=t)return H.a(y,m)
y[m]=l*k+j*i+h*g+f*e}return z}}},
qN:{
"^":"o;a,b,c,d,N:e>,M:f>,r",
bG:function(a,b,c){var z,y
z=this.d
if(a>>>0!==a||a>=z.length)return H.a(z,a)
y=z[a]
switch(this.c){case 0:z=y.a
if(typeof z!=="number")return H.b(z)
b=C.a.R(b,z)
z=y.b
if(typeof z!=="number")return H.b(z)
c=C.a.R(c,z)
break
case 2:b=C.a.v(b,0,J.h(y.a,1))
c=C.a.v(c,0,J.h(y.b,1))
break
case 1:if(b>=0){z=y.a
if(typeof z!=="number")return H.b(z)
if(!(b>=z))if(c>=0){z=y.b
if(typeof z!=="number")return H.b(z)
z=c>=z}else z=!0
else z=!0}else z=!0
if(z)return G.q(0)
break}z=y.a
if(typeof z!=="number")return H.b(z)
return y.h(0,c*z+b)},
bX:function(a,b,c){var z,y,x,w,v,u
z=this.r
if(typeof z!=="number")return z.l()
y=Math.log(H.v(P.I(c,1e-8)))
x=$.$get$dk()
if(typeof x!=="number")return H.b(x)
w=z-1+y*x
if(w<0)return this.c0(0,a,b)
else{z=this.r
if(typeof z!=="number")return z.l();--z
if(w>=z)return this.bG(z,0,0)
else{v=C.b.I(Math.floor(w))
u=w-v
return J.c(J.d(this.c0(v,a,b),1-u),J.d(this.c0(v+1,a,b),u))}}},
e5:function(a,b){return this.bX(a,b,0)},
qB:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q
if(this.a===!0)return this.bX(a,b,2*P.I(P.I(J.af(c),J.af(d)),P.I(J.af(e),J.af(f))))
if(J.K(J.c(J.d(c,c),J.d(d,d)),J.c(J.d(e,e),J.d(f,f)))){z=f
f=d
d=z
z=e
e=c
c=z}y=Math.sqrt(H.v(J.c(J.d(c,c),J.d(d,d))))
x=J.w(e)
w=J.w(f)
v=Math.sqrt(H.v(J.c(x.i(e,e),w.i(f,f))))
u=this.b
if(typeof u!=="number")return H.b(u)
u=v*u
if(u<y&&v>0){t=y/u
e=x.i(e,t)
f=w.i(f,t)
v*=t}if(v===0)return this.c0(0,a,b)
x=this.r
if(typeof x!=="number")return x.l()
w=Math.log(H.v(v))
u=$.$get$dk()
if(typeof u!=="number")return H.b(u)
s=P.I(0,x-1+w*u)
r=C.b.X(s)
q=s-r
return J.c(J.d(this.iT(r,a,b,c,d,e,f),1-q),J.d(this.iT(r+1,a,b,c,d,e,f),q))},
iT:function(a,b,c,d,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.r
if(typeof z!=="number")return H.b(z)
if(a>=z)return this.bG(z-1,0,0)
z=this.d
if(a<0||a>=z.length)return H.a(z,a)
b=J.h(J.d(b,z[a].a),0.5)
z=this.d
if(a>=z.length)return H.a(z,a)
c=J.h(J.d(c,z[a].b),0.5)
z=this.d
if(a>=z.length)return H.a(z,a)
d=J.d(d,z[a].a)
z=this.d
if(a>=z.length)return H.a(z,a)
a0=J.d(a0,z[a].b)
z=this.d
if(a>=z.length)return H.a(z,a)
a1=J.d(a1,z[a].a)
z=this.d
if(a>=z.length)return H.a(z,a)
a2=J.d(a2,z[a].b)
y=J.c(J.c(J.d(a0,a0),J.d(a2,a2)),1)
z=J.w(d)
x=J.w(a1)
a2=J.c(z.i(d,a0),x.i(a1,a2))
if(typeof a2!=="number")return H.b(a2)
w=-2*a2
v=J.c(J.c(z.i(d,d),x.i(a1,a1)),1)
x=J.w(y)
z=J.h(x.i(y,v),w*w*0.25)
if(typeof z!=="number")return H.b(z)
u=1/z
y=x.i(y,u)
w*=u
v=J.d(v,u)
if(typeof y!=="number")return H.b(y)
if(typeof v!=="number")return H.b(v)
t=-w*w+4*y*v
s=Math.sqrt(H.v(t*v))
r=Math.sqrt(H.v(y*t))
x=2*(1/t)
z=x*s
a2=J.y(b)
q=J.dt(a2.l(b,z))
p=J.a_(a2.j(b,z))
x*=r
z=J.y(c)
o=J.dt(z.l(c,x))
z=J.a_(z.j(c,x))
x=this.d
if(a>=x.length)return H.a(x,a)
n=J.i(x[a].c,1)?0:G.q(0)
for(m=o,l=0;m<=z;++m){if(typeof c!=="number")return H.b(c)
k=m-c
for(x=v*k*k,j=q;j<=p;++j){if(typeof b!=="number")return H.b(b)
i=j-b
h=y*i*i+w*i*k+x
if(h<1){g=$.fm
f=C.b.I(P.X(h*128,127))
g.length
if(f<0||f>=128)return H.a(g,f)
e=g[f]
n=J.c(n,J.d(this.bG(a,j,m),e))
l+=e}}}return J.G(n,l)},
c0:function(a,b,c){var z,y,x,w,v,u,t,s
z=this.r
if(typeof z!=="number")return z.l()
a=C.a.v(a,0,z-1)
z=this.d
if(a>>>0!==a||a>=z.length)return H.a(z,a)
b=J.h(J.d(b,z[a].a),0.5)
z=this.d
if(a>=z.length)return H.a(z,a)
c=J.h(J.d(c,z[a].b),0.5)
y=J.a_(b)
x=J.a_(c)
w=b-y
v=c-x
z=1-w
u=1-v
t=x+1
s=y+1
return J.c(J.c(J.c(J.d(this.bG(a,y,x),z*u),J.d(this.bG(a,y,t),z*v)),J.d(this.bG(a,s,x),w*u)),J.d(this.bG(a,s,t),w*v))},
jW:function(a,b){var z,y,x,w,v,u,t,s
z=H.p(Array(b),[G.n9])
for(y=z.length,x=0;x<b;++x){w=new G.n9(null,[0,0,0,0])
if(x>=y)return H.a(z,x)
z[x]=w
if(typeof a!=="number")return H.b(a)
v=(x+0.5)*a/b
w.a=C.b.I(Math.floor(v-2+0.5))
for(u=0;u<4;++u){w=z[x]
t=w.a
if(typeof t!=="number")return t.j()
w.b[u]=G.qE((t+u+0.5-v)/2,2)}w=z[x]
t=w.b
s=1/(t[0]+t[1]+t[2]+t[3])
for(u=0;u<4;++u){t=w.b
t[u]=t[u]*s}}return z},
mx:function(a1,a2,a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=J.C(a1)
y=z.gN(a1)
x=z.gM(a1)
w=J.y(y)
if(w.T(y,w.l(y,1))===0){v=J.y(x)
v=v.T(x,v.l(x,1))!==0}else v=!0
if(v){u=G.aX(y)
t=G.aX(x)
if(J.bE(a2)){v="Resizing Image "+H.m(a2)+" to "+u+" "+t
$.t.$2(0,v)}s=this.jW(y,u)
r=G.dR(u,t,a1.gcz())
q=J.i(a1.gcz(),1)?0:G.q(0)
if(typeof x!=="number")return H.b(x)
v=this.c
p=v===2
v=v===0
o=s.length
n=0
m=0
for(;n<x;++n)for(l=n*u,k=0;k<u;++k,++m){r.k(0,m,q)
for(j=l+k,i=0;i<4;++i){if(k>=o)return H.a(s,k)
h=s[k].a
if(typeof h!=="number")return h.j()
g=h+i
if(v){if(typeof y!=="number")return H.b(y)
g=C.a.R(g,y)}else if(p)g=C.a.v(g,0,w.l(y,1))
if(g>=0){if(typeof y!=="number")return H.b(y)
h=g<y}else h=!1
if(h){if(typeof y!=="number")return H.b(y)
f=J.d(z.h(a1,n*y+g),s[k].b[i])
r.k(0,j,J.c(r.h(0,j),f))}}}e=this.jW(x,t)
d=Array(t)
for(z=e.length,w=x-1,k=0;k<u;++k){for(n=0;n<t;++n){d[n]=J.i(a1.gcz(),3)?G.q(0):0
for(i=0;i<4;++i){if(n>=z)return H.a(e,n)
o=e[n].a
if(typeof o!=="number")return o.j()
c=o+i
if(v)c=C.a.R(c,x)
else if(p)c=C.a.v(c,0,w)
if(c>=0&&c<x){f=J.d(r.h(0,c*u+k),e[n].b[i])
d[n]=J.c(d[n],f)}}}for(n=0;n<t;++n)r.k(0,n*u+k,J.a4(d[n],0,1/0))}a1.ce(r)
x=t
y=u}this.e=y
this.f=x
z=Math.log(H.v(P.I(y,x)))
w=$.$get$dk()
if(typeof w!=="number")return H.b(w)
w=1+C.d.I(z*w)
this.r=w
this.d=H.p(Array(w),[G.cM])
z=J.D(a2)
if(z.gbd(a2)){w=this.r
if(typeof w!=="number")return w.a0()
w=w>1}else w=!1
if(w){w=H.m(a2)+": Generating "+H.m(this.r)+" MIPMap Levels"
$.t.$2(0,w)}w=this.d
v=G.j8(a1)
if(0>=w.length)return H.a(w,0)
w[0]=v
b=1
while(!0){w=this.r
if(typeof w!=="number")return H.b(w)
if(!(b<w))break
w=this.d
v=b-1
if(v>=w.length)return H.a(w,v)
a=P.I(1,J.ac(w[v].a,2))
w=this.d
if(v>=w.length)return H.a(w,v)
a0=P.I(1,J.ac(w[v].b,2))
w=this.d
p=a1.gcz()
if(typeof p!=="number")return H.b(p)
o=a*a0*p
if(typeof o!=="number"||Math.floor(o)!==o)H.T(P.aD("Invalid length "+H.m(o)))
o=new Float32Array(o)
if(b>=w.length)return H.a(w,b)
w[b]=new G.cM(a,a0,p,o)
for(n=0,m=0;n<a0;++n)for(w=2*n,p=w+1,k=0;k<a;++k,++m){o=this.d
if(b>=o.length)return H.a(o,b)
l=2*k
j=l+1
o[b].k(0,m,J.d(J.c(J.c(J.c(this.bG(v,l,w),this.bG(v,j,w)),this.bG(v,l,p)),this.bG(v,j,p)),0.25))}++b}if($.fm==null){$.fm=new Float32Array(H.k(128))
for(b=0;b<128;++b){w=$.fm
v=Math.exp(-2*(b/127))
w[b]=v-Math.exp(-2)}}if(z.gbd(a2)){z=this.r
if(typeof z!=="number")return z.a0()
z=z>1}else z=!1
if(z){z="Finished generating MIPMap for "+H.m(a2)
$.t.$2(0,z)}},
static:{fl:function(a,b,c,d,e,f,g){var z=b===!0?J.c(a,"_TRI:"+H.m(b)):a
if(!J.i(d,8))z=J.c(z,"_ANI:"+H.m(d))
if(g!==0)z=J.c(z,"_WRAP:"+g)
if(typeof e==="number"&&e!==1)z=J.c(z,"_SCALE:"+H.m(e))
if(e instanceof G.ai&&!e.kK(1))z=J.c(z,"_SCALE:"+H.m(e))
if(!J.i(c,1))z=J.c(z,"_GAMMA:"+H.m(c))
return!f?J.c(z,"_SPECTRUM:false"):z},dH:function(a,b,c,d,e){var z=new G.qN(c,d,e,null,null,null,null)
z.mx(a,b,c,d,e)
return z}}},
n9:{
"^":"o;a,b"},
oL:{
"^":"o;a,b,c,d",
iH:function(a,b,c){var z,y,x,w,v
z=P.I(0,G.nL(this.b,a,G.nv(),0,J.c(this.d,1))-1)
y=this.d
if(z===y)z=J.h(y,1)
if(c!=null)c[0]=z
y=this.b
x=J.c(z,1)
if(x>>>0!==x||x>=y.length)return H.a(y,x)
x=y[x]
y=this.b
if(z>>>0!==z||z>=y.length)return H.a(y,z)
y=y[z]
w=x-y
v=w!==0?(a-y)/w:0
y=this.a
if(z>=y.length)return H.a(y,z)
y=y[z]
x=this.c
if(typeof x!=="number")return H.b(x)
b[0]=y/x
y=this.d
if(typeof y!=="number")return H.b(y)
return(z+v)/y},
lo:function(a,b){return this.iH(a,b,null)},
d2:function(a,b){var z,y,x,w
z=P.I(0,G.nL(this.b,a,G.nv(),0,J.c(this.d,1))-1)
if(b!=null){y=this.a
if(z>>>0!==z||z>=y.length)return H.a(y,z)
y=y[z]
x=this.c
w=this.d
if(typeof x!=="number")return x.i()
if(typeof w!=="number")return H.b(w)
b[0]=y/(x*w)}return z},
m4:function(a,b){var z,y,x,w,v,u
z=new Float32Array(H.k(this.d))
this.a=z
C.w.cC(z,0,this.d,a)
z=H.k(J.c(this.d,1))
y=new Float32Array(z)
this.b=y
if(0>=z)return H.a(y,0)
y[0]=0
x=1
while(!0){z=J.c(this.d,1)
if(typeof z!=="number")return H.b(z)
if(!(x<z))break
z=this.b
y=x-1
w=z.length
if(y>=w)return H.a(z,y)
v=z[y]
u=this.a
if(y>=u.length)return H.a(u,y)
y=u[y]
u=this.d
if(typeof u!=="number")return H.b(u)
if(x>=w)return H.a(z,x)
z[x]=v+y/u;++x}z=this.b
y=this.d
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z=z[y]
this.c=z
if(z===0){z=y
x=1
while(!0){z=J.c(z,1)
if(typeof z!=="number")return H.b(z)
if(!(x<z))break
z=this.b
y=this.d
if(typeof y!=="number")return H.b(y)
if(x>=z.length)return H.a(z,x)
z[x]=x/y;++x
z=y}}else{x=1
while(!0){z=J.c(this.d,1)
if(typeof z!=="number")return H.b(z)
if(!(x<z))break
z=this.b
if(x>=z.length)return H.a(z,x)
y=z[x]
w=this.c
if(typeof w!=="number")return H.b(w)
z[x]=y/w;++x}}},
static:{f6:function(a,b){var z=new G.oL(null,null,null,b)
z.m4(a,b)
return z}}},
oM:{
"^":"o;a,b",
iI:function(a,b,c,d){var z,y,x,w,v
z=[0]
y=[0]
c[1]=this.b.iH(b,z,y)
x=z[0]
w=this.a
v=y[0]
if(v>>>0!==v||v>=w.length)return H.a(w,v)
c[0]=w[v].lo(a,z)
d[0]=z[0]*x},
ao:function(a,b){var z,y,x,w,v,u
z=this.a
if(0>=z.length)return H.a(z,0)
y=J.aW(J.d(a,z[0].d))
if(0>=z.length)return H.a(z,0)
x=C.a.v(y,0,J.h(z[0].d,1))
w=C.a.v(J.aW(J.d(b,this.b.d)),0,J.h(this.b.d,1))
if(w>>>0!==w||w>=z.length)return H.a(z,w)
z=z[w]
y=z.c
v=this.b
u=v.c
if(typeof y!=="number")return y.i()
if(typeof u!=="number")return H.b(u)
u=y*u
if(u===0)return 0
z=z.a
if(x>>>0!==x||x>=z.length)return H.a(z,x)
z=z[x]
v=v.a
if(w>=v.length)return H.a(v,w)
return z*v[w]/u},
m5:function(a,b,c){var z,y,x,w,v,u
if(typeof c!=="number")return H.b(c)
z=a.length
y=this.a
x=0
for(;x<c;++x){if(typeof b!=="number")return H.b(b)
w=x*b
y.push(G.f6(new Float32Array(a.subarray(w,C.w.c4(a,w,w+b,z))),b))}z=H.k(c)
v=new Float32Array(z)
for(w=y.length,x=0;x<c;++x){if(x>=w)return H.a(y,x)
u=y[x].c
if(x>=z)return H.a(v,x)
v[x]=u}this.b=G.f6(v,c)},
static:{oN:function(a,b,c){var z=new G.oM([],null)
z.m5(a,b,c)
return z}}},
ru:{
"^":"o;a,b,c",
h9:function(a,b){var z,y,x,w
z=this.a
if(typeof z!=="number")return H.b(z)
y=0
x=0
for(;x<z;++x){w=this.b
if(x>=w.length)return H.a(w,x)
w=P.X(G.rw(a,w[x],this.c,y),0.9999999403953552)
if(x>=6)return H.a(b,x)
b[x]=w
w=this.b
if(x>=w.length)return H.a(w,x)
y+=w[x]}},
mD:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=H.k(z)
x=new Uint32Array(y)
this.b=x
if(typeof z!=="number")return H.b(z)
w=0
v=0
for(;v<z;++v){if(v>=1000)return H.a(C.aj,v)
u=C.aj[v]
if(v>=y)return H.a(x,v)
x[v]=u
w+=x[v]}this.c=new Uint32Array(H.k(w))
for(t=0,v=0;v<z;++v){y=this.c
x=this.b
if(v>=x.length)return H.a(x,v)
G.pr(y,t,x[v],b)
x=this.b
if(v>=x.length)return H.a(x,v)
t+=x[v]}},
static:{rv:function(a,b){var z=new G.ru(a,null,null)
z.mD(a,b)
return z}}},
a1:{
"^":"r;a",
i:function(a,b){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof b!=="number")return H.b(b)
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
y=new G.a1(new Float32Array(H.k(3)))
y.C(x*b,w*b,z*b)
return y},
w:function(a,b){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof b!=="number")return H.b(b)
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
y=new G.a1(new Float32Array(H.k(3)))
y.C(x/b,w/b,z/b)
return y},
j:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.C(b)
v=w.gG(b)
if(typeof v!=="number")return H.b(v)
if(1>=y)return H.a(z,1)
u=z[1]
t=w.gF(b)
if(typeof t!=="number")return H.b(t)
if(2>=y)return H.a(z,2)
z=z[2]
w=w.gS(b)
if(typeof w!=="number")return H.b(w)
y=new G.a1(new Float32Array(H.k(3)))
y.C(x+v,u+t,z+w)
return y},
l:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.C(b)
v=w.gG(b)
if(typeof v!=="number")return H.b(v)
if(1>=y)return H.a(z,1)
u=z[1]
t=w.gF(b)
if(typeof t!=="number")return H.b(t)
if(2>=y)return H.a(z,2)
z=z[2]
w=w.gS(b)
if(typeof w!=="number")return H.b(w)
y=new G.a1(new Float32Array(H.k(3)))
y.C(x-v,u-t,z-w)
return y},
a2:function(a){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
y=new G.a1(new Float32Array(H.k(3)))
y.C(-x,-w,-z)
return y},
static:{r6:function(a,b,c){var z=new G.a1(new Float32Array(H.k(3)))
z.C(a,b,c)
return z},eu:function(a,b){var z,y,x,w,v
if(J.K(G.J(a,b),0)){z=J.C(a)
y=J.M(z.gG(a))
x=J.M(z.gF(a))
z=J.M(z.gS(a))
w=new Float32Array(3)
v=new G.a1(w)
if(0>=3)return H.a(w,0)
w[0]=y
if(1>=3)return H.a(w,1)
w[1]=x
if(2>=3)return H.a(w,2)
w[2]=z
z=v}else z=a
return z}}},
lI:{
"^":"o;a,b,c",
pr:function(a,b,c){var z=c.a
this.jb(this.c,this.b,b,c,c.b.l(0,z).a_())},
e5:function(a,b){var z=this.b
if(!z.bV(a))return
this.bl(this.c,z,a,b)},
jc:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(f!==this.a){z=b.a
z=b.b.l(0,z).a_()<e}else z=!0
if(z){J.nP(J.N(a),c)
return}z=b.a.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
y=new Float32Array(3)
if(0>=3)return H.a(y,0)
y[0]=x*0.5
if(1>=3)return H.a(y,1)
y[1]=w*0.5
if(2>=3)return H.a(y,2)
y[2]=z*0.5
z=b.b.a
w=z.length
if(0>=w)return H.a(z,0)
x=z[0]
if(1>=w)return H.a(z,1)
v=z[1]
if(2>=w)return H.a(z,2)
z=z[2]
w=new Float32Array(3)
if(0>=3)return H.a(w,0)
w[0]=x*0.5
if(1>=3)return H.a(w,1)
w[1]=v*0.5
if(2>=3)return H.a(w,2)
w[2]=z*0.5
u=new G.j(y).j(0,new G.j(w))
w=d.a.a
y=w.length
if(0>=y)return H.a(w,0)
z=w[0]
v=u.a
x=v.length
if(0>=x)return H.a(v,0)
t=v[0]
s=d.b.a
r=s.length
if(0>=r)return H.a(s,0)
q=[z<=t,s[0]>t]
if(1>=y)return H.a(w,1)
t=w[1]
if(1>=x)return H.a(v,1)
z=v[1]
if(1>=r)return H.a(s,1)
p=[t<=z,s[1]>z]
if(2>=y)return H.a(w,2)
w=w[2]
if(2>=x)return H.a(v,2)
v=v[2]
if(2>=r)return H.a(s,2)
o=[w<=v,s[2]>v]
z=q[0]
y=z&&p[0]&&o[0]
x=z&&p[0]&&o[1]
w=z&&p[1]&&o[0]
z=z&&p[1]&&o[1]
v=q[1]
t=v&&p[0]&&o[0]
s=v&&p[0]&&o[1]
r=v&&p[1]&&o[0]
n=[y,x,w,z,t,s,r,v&&p[1]&&o[1]]
for(z=f+1,y=J.C(a),m=0;m<8;++m){if(!n[m])continue
if(J.e(y.gaE(a),m)==null){x=y.gaE(a)
w=Array(8)
w.fixed$length=Array
w.$builtinTypeInfo=[G.ha]
J.u(x,m,new G.ha(w,[]))}l=G.ev(m,b,u)
this.jc(J.e(y.gaE(a),m),l,c,d,e,z)}},
jb:function(a,b,c,d,e){return this.jc(a,b,c,d,e,0)},
bl:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p
z=J.C(a)
y=0
while(!0){x=J.a0(z.gA(a))
if(typeof x!=="number")return H.b(x)
if(!(y<x))break
if(d.$1(J.e(z.gA(a),y))!==!0)return!1;++y}w=b.a.i(0,0.5).j(0,b.b.i(0,0.5))
x=c.a
v=x.length
if(0>=v)return H.a(x,0)
u=x[0]
t=w.a
s=t.length
if(0>=s)return H.a(t,0)
u=u>t[0]?4:0
if(1>=v)return H.a(x,1)
r=x[1]
if(1>=s)return H.a(t,1)
r=r>t[1]?2:0
if(2>=v)return H.a(x,2)
x=x[2]
if(2>=s)return H.a(t,2)
x=x>t[2]?1:0
q=u+r+x
if(J.e(z.gaE(a),q)==null)return!0
p=G.ev(q,b,w)
return this.bl(J.e(z.gaE(a),q),p,c,d)},
static:{ev:function(a,b,c){var z,y,x,w,v,u,t
z=G.a9(null,null)
y=z.a
x=(a&4)!==0
if(x){w=c.a
if(0>=w.length)return H.a(w,0)
w=w[0]}else{w=b.a.a
if(0>=w.length)return H.a(w,0)
w=w[0]}y=y.a
v=y.length
if(0>=v)return H.a(y,0)
y[0]=w
w=z.b
if(x){x=b.b.a
if(0>=x.length)return H.a(x,0)
x=x[0]}else{x=c.a
if(0>=x.length)return H.a(x,0)
x=x[0]}w=w.a
u=w.length
if(0>=u)return H.a(w,0)
w[0]=x
x=(a&2)!==0
if(x){t=c.a
if(1>=t.length)return H.a(t,1)
t=t[1]}else{t=b.a.a
if(1>=t.length)return H.a(t,1)
t=t[1]}if(1>=v)return H.a(y,1)
y[1]=t
if(x){x=b.b.a
if(1>=x.length)return H.a(x,1)
x=x[1]}else{x=c.a
if(1>=x.length)return H.a(x,1)
x=x[1]}if(1>=u)return H.a(w,1)
w[1]=x
x=(a&1)!==0
if(x){t=c.a
if(2>=t.length)return H.a(t,2)
t=t[2]}else{t=b.a.a
if(2>=t.length)return H.a(t,2)
t=t[2]}if(2>=v)return H.a(y,2)
y[2]=t
if(x){y=b.b.a
if(2>=y.length)return H.a(y,2)
y=y[2]}else{y=c.a
if(2>=y.length)return H.a(y,2)
y=y[2]}if(2>=u)return H.a(w,2)
w[2]=y
return z}}},
ha:{
"^":"o;aE:a>,A:b>",
static:{n6:function(){var z=Array(8)
z.fixed$length=Array
return new G.ha(H.p(z,[G.ha]),[])}}},
bi:{
"^":"o;N:a>,M:b>,c,d,e,f,r0:r<",
mB:function(a,b,c,d,e,f,g){if(this.e==null)this.e=c
if(this.f==null)this.f=d},
static:{rd:function(a,b,c,d,e,f,g){var z=new G.bi(c,d,a,b,e,f,g!=null?g:new Float32Array(H.k(J.d(J.d(c,d),3))))
z.mB(a,b,c,d,e,f,g)
return z}}},
A:{
"^":"o;pA:a<,b,c,d,e,f,r,x,y",
ct:function(){var z,y,x,w,v,u
z=P.a5()
for(y=this.a,x=y.length,w=0;w<y.length;y.length===x||(0,H.aw)(y),++w){v=y[w]
u=J.C(v)
z.k(0,"bool "+H.m(u.ga3(v)),u.gA(v))}for(y=this.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.aw)(y),++w){v=y[w]
u=J.C(v)
z.k(0,"int "+H.m(u.ga3(v)),u.gA(v))}for(y=this.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.aw)(y),++w){v=y[w]
u=J.C(v)
z.k(0,"float "+H.m(u.ga3(v)),u.gA(v))}for(y=this.d,x=y.length,w=0;w<y.length;y.length===x||(0,H.aw)(y),++w){v=y[w]
u=J.C(v)
z.k(0,"point "+H.m(u.ga3(v)),u.gA(v))}for(y=this.e,x=y.length,w=0;w<y.length;y.length===x||(0,H.aw)(y),++w){v=y[w]
u=J.C(v)
z.k(0,"vector "+H.m(u.ga3(v)),u.gA(v))}for(y=this.f,x=y.length,w=0;w<y.length;y.length===x||(0,H.aw)(y),++w){v=y[w]
u=J.C(v)
z.k(0,"normal "+H.m(u.ga3(v)),u.gA(v))}for(y=this.r,x=y.length,w=0;w<y.length;y.length===x||(0,H.aw)(y),++w){v=y[w]
u=J.C(v)
z.k(0,"color "+H.m(u.ga3(v)),u.gA(v))}for(y=this.x,x=y.length,w=0;w<y.length;y.length===x||(0,H.aw)(y),++w){v=y[w]
u=J.C(v)
z.k(0,"string "+H.m(u.ga3(v)),u.gA(v))}return z},
kd:function(a,b){a=J.aI(a)
this.i0(a)
C.c.H(this.c,new G.aB(a,b,!1))},
hU:function(a,b){a=J.aI(a)
this.i1(a)
C.c.H(this.b,new G.aB(a,b,!1))},
eL:function(a,b){var z,y,x,w,v,u,t,s,r
a=J.aI(a)
this.q4(a)
z=J.D(b)
y=z.h(b,0)
if(typeof y==="number"){x=J.ac(z.gn(b),3)
if(typeof x!=="number")return H.b(x)
w=Array(x)
w.fixed$length=Array
w.$builtinTypeInfo=[G.j]
for(v=0,u=0;v<x;++v,u+=3){y=z.h(b,u)
t=z.h(b,u+1)
s=z.h(b,u+2)
r=new Float32Array(3)
if(0>=3)return H.a(r,0)
r[0]=y
if(1>=3)return H.a(r,1)
r[1]=t
if(2>=3)return H.a(r,2)
r[2]=s
w[v]=new G.j(r)}C.c.H(this.d,new G.aB(a,w,!1))}else if(z.h(b,0) instanceof G.j)C.c.H(this.d,new G.aB(a,b,!1))},
kg:function(a,b){var z,y,x,w,v,u,t,s,r
a=J.aI(a)
this.q6(a)
z=J.D(b)
y=z.h(b,0)
if(typeof y==="number"){x=J.ac(z.gn(b),3)
if(typeof x!=="number")return H.b(x)
w=Array(x)
w.fixed$length=Array
w.$builtinTypeInfo=[G.r]
for(v=0,u=0;v<x;++v,u+=3){y=z.h(b,u)
t=z.h(b,u+1)
s=z.h(b,u+2)
r=new Float32Array(3)
if(0>=3)return H.a(r,0)
r[0]=y
if(1>=3)return H.a(r,1)
r[1]=t
if(2>=3)return H.a(r,2)
r[2]=s
w[v]=new G.r(r)}C.c.H(this.e,new G.aB(a,w,!1))}else if(z.h(b,0) instanceof G.r)C.c.H(this.e,new G.aB(a,b,!1))},
fJ:function(a,b){var z,y,x,w,v,u,t,s,r
a=J.aI(a)
this.q3(a)
z=J.D(b)
if(z.h(b,0) instanceof G.a1)C.c.H(this.f,new G.aB(a,b,!1))
else{y=z.h(b,0)
if(typeof y==="number"){x=J.ac(z.gn(b),3)
if(typeof x!=="number")return H.b(x)
w=Array(x)
w.fixed$length=Array
w.$builtinTypeInfo=[G.a1]
for(v=0,u=0;v<x;++v,u+=3){y=z.h(b,u)
t=z.h(b,u+1)
s=z.h(b,u+2)
r=new Float32Array(3)
if(0>=3)return H.a(r,0)
r[0]=y
if(1>=3)return H.a(r,1)
r[1]=t
if(2>=3)return H.a(r,2)
r[2]=s
w[v]=new G.a1(r)}C.c.H(this.f,new G.aB(a,w,!1))}}},
kf:function(a,b){var z,y,x,w,v
a=J.aI(a)
this.fM(a)
z=J.D(b)
y=J.ac(z.gn(b),3)
if(typeof y!=="number")return H.b(y)
x=Array(y)
x.fixed$length=Array
x.$builtinTypeInfo=[G.ai]
for(w=0,v=0;w<y;++w,v+=3)x[w]=G.cm(z.h(b,v),z.h(b,v+1),z.h(b,v+2))
C.c.H(this.r,new G.aB(a,x,!1))},
kh:function(a,b){var z,y,x,w,v,u,t,s,r,q
a=J.aI(a)
this.fM(a)
z=J.D(b)
y=J.ac(z.gn(b),3)
if(typeof y!=="number")return H.b(y)
x=Array(y)
x.fixed$length=Array
x.$builtinTypeInfo=[G.ai]
for(w=0,v=0;w<y;++w,v+=3){u=z.h(b,v)
t=z.h(b,v+1)
s=z.h(b,v+2)
r=$.dg
if(r===0)u=G.lZ(u,t,s)
else if(r===2){r=new G.ah(new Float32Array(4))
u=G.lZ(u,t,s).a
t=u.length
if(0>=t)return H.a(u,0)
s=u[0]
if(1>=t)return H.a(u,1)
q=u[1]
if(2>=t)return H.a(u,2)
r.cB(s,q,u[2])
u=r}else if(r===1){r=new Float32Array(3)
q=new G.bC(r)
if(0>=3)return H.a(r,0)
r[0]=u
if(1>=3)return H.a(r,1)
r[1]=t
if(2>=3)return H.a(r,2)
r[2]=s
u=q}else u=null
x[w]=u}C.c.H(this.r,new G.aB(a,x,!1))},
ps:function(a,b){var z,y,x,w,v,u,t,s,r
a=J.aI(a)
this.fM(a)
z=J.D(b)
y=J.ac(z.gn(b),2)
if(typeof y!=="number")return H.b(y)
x=Array(y)
x.fixed$length=Array
w=H.p(x,[G.ai])
v=new Float32Array(H.k(471))
for(x=w.length,u=0,t=0;u<y;++u,t+=2){G.tD(C.E,z.h(b,t),v)
s=new G.ah(new Float32Array(4))
s.bN(C.E,v,0)
r=G.am(s,0).i(0,z.h(b,t+1))
if(u>=x)return H.a(w,u)
w[u]=r}C.c.H(this.r,new G.aB(a,w,!1))},
px:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=J.D(b)
y=z.gn(b)
if(typeof y!=="number")return H.b(y)
y=Array(y)
y.fixed$length=Array
x=H.p(y,[G.ai])
w=[]
y=c==null
v=x.length
u=0
while(!0){t=z.gn(b)
if(typeof t!=="number")return H.b(t)
if(!(u<t))break
c$0:{s=z.h(b,u)
if($.au.c.O(s)){r=$.au.h5(s)
t=H.c7(r,"$isE",[P.x],"$asE")
if(!t)break c$0
q=G.eA(r,s)
p=q.length/2|0
o=new Float32Array(p)
n=new Float32Array(p)
for(t=q.length,m=0,l=0;m<p;++m){k=l+1
if(l>=t)return H.a(q,l)
o[m]=q[l]
l=k+1
if(k>=t)return H.a(q,k)
n[m]=q[k]}t=G.q(0)
t.bN(o,n,0)
if(u>=v)return H.a(x,u)
x[u]=t}else if(y){t="UNABLE TO LOAD SPECTRUM FILE "+H.m(s)
$.t.$2(4,t)}else{t="LOADING SPECTRUM FILE "+H.m(s)
$.t.$2(4,t)
t=new P.a2(0,$.Q,null)
t.$builtinTypeInfo=[null]
j=new P.al(t)
j.$builtinTypeInfo=[null]
$.au.eb(s,!0,null).ai(new G.re(x,u,s,j))
w.push(t)}}++u}if(y)C.c.H(this.r,new G.aB(a,x,!1))
else if(w.length===0)C.c.H(this.r,new G.aB(a,x,!1))
else{i=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
c.push(i.a)
P.fc(w,null,!1).ai(new G.rf(this,a,x,i))}},
pw:function(a,b){var z,y,x,w,v,u,t,s,r,q
this.fM(a)
z=J.D(b)
y=J.ac(z.gn(b),2)
x=H.k(y)
w=new Float32Array(x)
v=H.k(y)
u=new Float32Array(v)
if(typeof y!=="number")return H.b(y)
t=0
s=0
for(;t<y;++t){r=s+1
q=z.h(b,s)
if(t>=x)return H.a(w,t)
w[t]=q
s=r+1
q=z.h(b,r)
if(t>=v)return H.a(u,t)
u[t]=q}z=G.q(0)
z.bN(w,u,0)
C.c.H(this.r,new G.aB(a,[z],!1))},
i1:function(a){var z,y
for(z=this.b,y=0;y<z.length;++y)if(J.i(J.at(z[y]),a)){C.c.cs(z,y)
return!0}return!1},
kw:function(a){var z,y
for(z=this.a,y=0;y<z.length;++y)if(J.i(J.at(z[y]),a)){C.c.cs(z,y)
return!0}return!1},
i0:function(a){var z,y
for(z=this.c,y=0;y<z.length;++y)if(J.i(J.at(z[y]),a)){C.c.cs(z,y)
return!0}return!1},
q4:function(a){var z,y
for(z=this.d,y=0;y<z.length;++y)if(J.i(J.at(z[y]),a)){C.c.cs(z,y)
return!0}return!1},
q6:function(a){var z,y
for(z=this.e,y=0;y<z.length;++y)if(J.i(J.at(z[y]),a)){C.c.cs(z,y)
return!0}return!1},
q3:function(a){var z,y
for(z=this.f,y=0;y<z.length;++y)if(J.i(J.at(z[y]),a)){C.c.cs(z,y)
return!0}return!1},
fM:function(a){var z,y
for(z=this.r,y=0;y<z.length;++y)if(J.i(J.at(z[y]),a)){C.c.cs(z,y)
return!0}return!1},
i2:function(a){var z,y
for(z=this.x,y=0;y<z.length;++y)if(J.i(J.at(z[y]),a)){C.c.cs(z,y)
return!0}return!1},
q5:function(a){var z,y
for(z=this.y,y=0;y<z.length;++y)if(J.i(J.at(z[y]),a)){C.c.cs(z,y)
return!0}return!1},
m:function(a,b){var z,y,x
a=a.toLowerCase()
for(z=this.c,y=0;y<z.length;++y){if(J.i(J.at(z[y]),a)){if(y>=z.length)return H.a(z,y)
x=J.i(J.a0(J.N(z[y])),1)}else x=!1
if(x){if(y>=z.length)return H.a(z,y)
z[y].sb8(!0)
if(y>=z.length)return H.a(z,y)
return J.e(J.N(z[y]),0)}}return b},
V:function(a,b){var z,y,x
a=a.toLowerCase()
for(z=this.b,y=0;y<z.length;++y){if(J.i(J.at(z[y]),a)){if(y>=z.length)return H.a(z,y)
x=J.i(J.a0(J.N(z[y])),1)}else x=!1
if(x){if(y>=z.length)return H.a(z,y)
z[y].sb8(!0)
if(y>=z.length)return H.a(z,y)
return J.e(J.N(z[y]),0)}}return b},
bo:function(a,b){var z,y,x
a=a.toLowerCase()
for(z=this.a,y=0;y<z.length;++y){if(J.i(J.at(z[y]),a)){if(y>=z.length)return H.a(z,y)
x=J.i(J.a0(J.N(z[y])),1)}else x=!1
if(x){if(y>=z.length)return H.a(z,y)
z[y].sb8(!0)
if(y>=z.length)return H.a(z,y)
return J.e(J.N(z[y]),0)}}return b},
bq:function(a,b){var z,y,x
a=a.toLowerCase()
for(z=this.d,y=0;y<z.length;++y){if(J.i(J.at(z[y]),a)){if(y>=z.length)return H.a(z,y)
x=J.i(J.a0(J.N(z[y])),1)}else x=!1
if(x){if(y>=z.length)return H.a(z,y)
z[y].sb8(!0)
if(y>=z.length)return H.a(z,y)
return J.e(J.N(z[y]),0)}}return b},
af:function(a,b){var z,y,x
a=a.toLowerCase()
for(z=this.e,y=0;y<z.length;++y){if(J.i(J.at(z[y]),a)){if(y>=z.length)return H.a(z,y)
x=J.i(J.a0(J.N(z[y])),1)}else x=!1
if(x){if(y>=z.length)return H.a(z,y)
z[y].sb8(!0)
if(y>=z.length)return H.a(z,y)
return J.e(J.N(z[y]),0)}}return b},
a8:function(a,b){var z,y
a=a.toLowerCase()
for(z=this.r,y=0;y<z.length;++y)if(J.i(J.at(z[y]),a)){if(y>=z.length)return H.a(z,y)
z[y].sb8(!0)
if(y>=z.length)return H.a(z,y)
if(J.N(z[y])==null)return b
if(y>=z.length)return H.a(z,y)
if(J.i(J.a0(J.N(z[y])),1)){if(y>=z.length)return H.a(z,y)
z[y].sb8(!0)
if(y>=z.length)return H.a(z,y)
return J.e(J.N(z[y]),0)}}return b},
aO:function(a,b){var z,y,x
a=a.toLowerCase()
for(z=this.x,y=0;y<z.length;++y){if(J.i(J.at(z[y]),a)){if(y>=z.length)return H.a(z,y)
x=J.i(J.a0(J.N(z[y])),1)}else x=!1
if(x){if(y>=z.length)return H.a(z,y)
z[y].sb8(!0)
if(y>=z.length)return H.a(z,y)
return J.e(J.N(z[y]),0)}}return b},
bp:function(a,b){var z=this.aO(a.toLowerCase(),"")
if(J.i(z,""))return b
return z},
dm:function(a){var z,y,x
a=a.toLowerCase()
for(z=this.y,y=0;y<z.length;++y){if(J.i(J.at(z[y]),a)){if(y>=z.length)return H.a(z,y)
x=J.i(J.a0(J.N(z[y])),1)}else x=!1
if(x){if(y>=z.length)return H.a(z,y)
z[y].sb8(!0)
if(y>=z.length)return H.a(z,y)
return J.e(J.N(z[y]),0)}}return""},
bA:function(a){var z,y
a=a.toLowerCase()
for(z=this.c,y=0;y<z.length;++y)if(J.i(J.at(z[y]),a)){if(y>=z.length)return H.a(z,y)
z[y].sb8(!0)
if(y>=z.length)return H.a(z,y)
return J.N(z[y])}return},
kz:function(a){var z,y
a=a.toLowerCase()
for(z=this.b,y=0;y<z.length;++y)if(J.i(J.at(z[y]),a)){if(y>=z.length)return H.a(z,y)
z[y].sb8(!0)
if(y>=z.length)return H.a(z,y)
return J.N(z[y])}return},
ig:function(a){var z,y
a=a.toLowerCase()
for(z=this.d,y=0;y<z.length;++y)if(J.i(J.at(z[y]),a)){if(y>=z.length)return H.a(z,y)
z[y].sb8(!0)
if(y>=z.length)return H.a(z,y)
return J.N(z[y])}return},
q9:function(a){var z,y
a=a.toLowerCase()
for(z=this.e,y=0;y<z.length;++y)if(J.i(J.at(z[y]),a)){if(y>=z.length)return H.a(z,y)
z[y].sb8(!0)
if(y>=z.length)return H.a(z,y)
return J.N(z[y])}return},
q8:function(a){var z,y
a=a.toLowerCase()
for(z=this.f,y=0;y<z.length;++y)if(J.i(J.at(z[y]),a)){if(y>=z.length)return H.a(z,y)
z[y].sb8(!0)
if(y>=z.length)return H.a(z,y)
return J.N(z[y])}return},
kB:function(a){var z,y
a=a.toLowerCase()
for(z=this.x,y=0;y<z.length;++y)if(J.i(J.at(z[y]),a)){if(y>=z.length)return H.a(z,y)
z[y].sb8(!0)
if(y>=z.length)return H.a(z,y)
return J.N(z[y])}return},
ap:function(){this.ck(this.a)
this.ck(this.b)
this.ck(this.c)
this.ck(this.d)
this.ck(this.e)
this.ck(this.f)
this.ck(this.r)
this.ck(this.x)
this.ck(this.y)},
ck:function(a){var z,y
for(z=0;z<a.length;++z)if(!a[z].gb8()){if(z>=a.length)return H.a(a,z)
y="Parameter "+H.m(J.at(a[z]))+" not used"
$.t.$2(1,y)}},
K:function(a){var z,y,x,w,v,u,t,s
for(z=this.a,y=z.length,x="",w=0;w<z.length;z.length===y||(0,H.aw)(z),++w){v=z[w]
u=J.C(v)
x+="\"bool "+H.m(u.ga3(v))+"\" ["
t=0
while(!0){s=J.a0(u.gA(v))
if(typeof s!=="number")return H.b(s)
if(!(t<s))break
if(t!==0)x+=" "
x+=J.e(u.gA(v),t)===!0?1:0;++t}x+="] "}for(z=this.b,y=z.length,w=0;w<z.length;z.length===y||(0,H.aw)(z),++w)x+=this.dO("integer",z[w])
for(z=this.c,y=z.length,w=0;w<z.length;z.length===y||(0,H.aw)(z),++w)x+=this.dO("float",z[w])
for(z=this.d,y=z.length,w=0;w<z.length;z.length===y||(0,H.aw)(z),++w)x+=this.dO("point",z[w])
for(z=this.e,y=z.length,w=0;w<z.length;z.length===y||(0,H.aw)(z),++w)x+=this.dO("vector",z[w])
for(z=this.f,y=z.length,w=0;w<z.length;z.length===y||(0,H.aw)(z),++w)x+=this.dO("normals",z[w])
for(z=this.r,y=z.length,w=0;w<z.length;z.length===y||(0,H.aw)(z),++w)x+=this.dO("color",z[w])
for(z=this.x,y=z.length,w=0;w<z.length;z.length===y||(0,H.aw)(z),++w){v=z[w]
u=J.C(v)
x+="\"string "+H.m(u.ga3(v))+"\" ["
t=0
while(!0){s=J.a0(u.gA(v))
if(typeof s!=="number")return H.b(s)
if(!(t<s))break
if(t!==0)x+=" "
x+="\""+H.m(J.e(u.gA(v),t))+"\"";++t}x+="] "}for(z=this.y,y=z.length,w=0;w<z.length;z.length===y||(0,H.aw)(z),++w){v=z[w]
u=J.C(v)
x+="\"texture "+H.m(u.ga3(v))+"\" ["
t=0
while(!0){s=J.a0(u.gA(v))
if(typeof s!=="number")return H.b(s)
if(!(t<s))break
if(t!==0)x+=" "
x+="\""+H.m(J.e(u.gA(v),t))+"\"";++t}x+="] "}return x},
dO:function(a,b){var z,y,x,w
z=J.C(b)
y="\""+a+" "+H.m(z.ga3(b))+"\" ["
x=0
while(!0){w=J.a0(z.gA(b))
if(typeof w!=="number")return H.b(w)
if(!(x<w))break
if(x!==0)y+=" "
y+=H.m(J.e(z.gA(b),x));++x}return y+"] "},
mC:function(a){var z,y,x,w,v,u,t,s,r,q,p
for(z=J.cs(a.gcP()),y=this.x,x=this.a,w=this.b,v=this.c;z.a9();){u=z.gas()
t=a.h(0,u)
s=J.o1(u," ")
r=J.D(s)
if(!J.i(r.gn(s),2)){r="Invalid parameter declaration: '"+H.m(u)+"'. Should be 'type name'."
$.t.$2(2,r)
continue}q=r.h(s,0)
p=r.h(s,1)
r=J.O(q)
if(r.B(q,"float")){if(typeof t==="number")t=[C.b.dw(t)]
p=J.aI(p)
this.i0(p)
C.c.H(v,new G.aB(p,t,!1))}else if(r.B(q,"int")||r.B(q,"integer")){if(typeof t==="number")t=[C.b.I(t)]
p=J.aI(p)
this.i1(p)
C.c.H(w,new G.aB(p,t,!1))}else if(r.B(q,"bool")||r.B(q,"boolean")){if(typeof t==="boolean")t=[t]
p=J.aI(p)
this.kw(p)
C.c.H(x,new G.aB(p,t,!1))}else if(r.B(q,"point"))this.eL(p,t)
else if(r.B(q,"vector"))this.kg(p,t)
else if(r.B(q,"normal"))this.fJ(p,t)
else if(r.B(q,"string")){p=J.aI(p)
this.i2(p)
C.c.H(y,new G.aB(p,t,!1))}else if(r.B(q,"string")){p=J.aI(p)
this.i2(p)
C.c.H(y,new G.aB(p,t,!1))}else if(r.B(q,"rgb")||r.B(q,"color"))this.kf(p,t)
else if(r.B(q,"xyz"))this.kh(p,t)
else{r="Unhandled parameter type: "+H.m(q)
$.t.$2(2,r)}}},
static:{lK:function(a){return new G.A(P.aE(a.gpA(),!0,null),P.aE(a.b,!0,null),P.aE(a.c,!0,null),P.aE(a.d,!0,null),P.aE(a.e,!0,null),P.aE(a.f,!0,null),P.aE(a.r,!0,null),P.aE(a.x,!0,null),P.aE(a.y,!0,null))},c1:function(a){var z=new G.A([],[],[],[],[],[],[],[],[])
z.mC(a)
return z}}},
re:{
"^":"z:0;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.c
y="FINISHED SPECTRUM FILE "+H.m(z)
$.t.$2(4,y)
x=G.eA(a,z)
w=x.length/2|0
z=H.k(w)
v=new Float32Array(z)
y=H.k(w)
u=new Float32Array(y)
for(t=x.length,s=0,r=0;s<w;++s){q=r+1
if(r>=t)return H.a(x,r)
p=x[r]
if(s>=z)return H.a(v,s)
v[s]=p
r=q+1
if(q>=t)return H.a(x,q)
p=x[q]
if(s>=y)return H.a(u,s)
u[s]=p}z=this.a
y=this.b
t=G.q(0)
t.bN(v,u,0)
if(y>=z.length)return H.a(z,y)
z[y]=t
this.d.aM(0)}},
rf:{
"^":"z:0;a,b,c,d",
$1:function(a){C.c.H(this.a.r,new G.aB(this.b,this.c,!1))
this.d.aM(0)}},
aB:{
"^":"o;a3:a>,A:b>,b8:c@"},
bj:{
"^":"o;ca:a>,bH:b>,N:c>,M:d>",
cf:["hc",function(a,b,c,d){this.a=a
this.b=b
this.c=c
this.d=d}]},
j:{
"^":"r;a",
i:function(a,b){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof b!=="number")return H.b(b)
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
y=new G.j(new Float32Array(H.k(3)))
y.C(x*b,w*b,z*b)
return y},
w:function(a,b){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof b!=="number")return H.b(b)
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
y=new G.j(new Float32Array(H.k(3)))
y.C(x/b,w/b,z/b)
return y},
j:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.C(b)
v=J.e(w.gA(b),0)
if(typeof v!=="number")return H.b(v)
if(1>=y)return H.a(z,1)
u=z[1]
t=J.e(w.gA(b),1)
if(typeof t!=="number")return H.b(t)
if(2>=y)return H.a(z,2)
z=z[2]
w=J.e(w.gA(b),2)
if(typeof w!=="number")return H.b(w)
y=new G.j(new Float32Array(H.k(3)))
y.C(x+v,u+t,z+w)
return y},
l:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.C(b)
v=J.e(w.gA(b),0)
if(typeof v!=="number")return H.b(v)
if(1>=y)return H.a(z,1)
u=z[1]
t=J.e(w.gA(b),1)
if(typeof t!=="number")return H.b(t)
if(2>=y)return H.a(z,2)
z=z[2]
w=J.e(w.gA(b),2)
if(typeof w!=="number")return H.b(w)
y=new G.j(new Float32Array(H.k(3)))
y.C(x-v,u-t,z-w)
return y},
static:{rC:function(a,b,c){var z=new G.j(new Float32Array(H.k(3)))
z.C(a,b,c)
return z}}},
bI:{
"^":"o;",
b_:function(){return!0},
cr:function(a){$.t.$2(3,"Unimplemented Primitive.refine() method called!")},
cN:function(a){var z,y,x
z=[]
z.push(this)
for(y=J.aQ(a);z.length!==0;){x=C.c.gcQ(z)
if(0>=z.length)return H.a(z,0)
z.pop()
if(x.b_())y.H(a,x)
else x.cr(z)}}},
f1:{
"^":"bI;",
aV:function(a,b){$.t.$2(3,"Aggregate.getBSDF() methodcalled; should have gone to GeometricPrimitive")
return},
d0:function(a,b){$.t.$2(3,"Aggregate.getBSSRDF() methodcalled; should have gone to GeometricPrimitive")
return}},
ei:{
"^":"bI;b,c,d,a",
b_:function(){return this.b.b_()},
cr:function(a){var z,y,x,w,v,u
z=[]
this.b.cr(z)
for(y=0;y<z.length;++y){x=z[y]
w=this.c
v=this.d
u=$.aN
$.aN=u+1
a.push(new G.ei(x,w,v,u))}},
aA:function(){return this.b.aA()},
ae:function(a,b){var z,y
z=[0]
y=[0]
if(!this.b.bW(a,z,y,b.gku()))return!1
b.b=this
b.c=G.aC(this.b.glj())
b.d=G.aC(this.b.gkR())
b.e=this.b.giK()
b.f=this.a
b.r=y[0]
a.skO(z[0])
return!0},
a5:function(a){return this.b.a5(a)},
aV:function(a,b){var z=G.ag()
this.b.h6(b,a,z)
return this.c.aV(a,z)},
d0:function(a,b){var z=G.ag()
this.b.h6(b,a,z)
return this.c.d0(a,z)}},
mu:{
"^":"bI;b,c,a",
ae:function(a,b){var z,y,x,w,v
z=G.Z(null,null)
this.c.eZ(a.ged(),z)
y=z.eh(a)
if(!this.b.ae(y,b))return!1
a.skO(y.d)
b.sqO(this.a)
x=z.a.a
w=x.length
if(0>=w)return H.a(x,0)
if(x[0]===1){if(1>=w)return H.a(x,1)
if(x[1]===0){if(2>=w)return H.a(x,2)
if(x[2]===0){if(3>=w)return H.a(x,3)
if(x[3]===0){if(4>=w)return H.a(x,4)
if(x[4]===0){if(5>=w)return H.a(x,5)
if(x[5]===1){if(6>=w)return H.a(x,6)
if(x[6]===0){if(7>=w)return H.a(x,7)
if(x[7]===0){if(8>=w)return H.a(x,8)
if(x[8]===0){if(9>=w)return H.a(x,9)
if(x[9]===0){if(10>=w)return H.a(x,10)
if(x[10]===1){if(11>=w)return H.a(x,11)
if(x[11]===0){if(12>=w)return H.a(x,12)
if(x[12]===0){if(13>=w)return H.a(x,13)
if(x[13]===0){if(14>=w)return H.a(x,14)
if(x[14]===0){if(15>=w)return H.a(x,15)
x=x[15]===1}else x=!1}else x=!1}else x=!1}else x=!1}else x=!1}else x=!1}else x=!1}else x=!1}else x=!1}else x=!1}else x=!1}else x=!1}else x=!1}else x=!1}else x=!1
if(!x){x=b.c.i(0,z)
b.c=x
b.d=G.Z(x.b,x.a)
v=G.Z(z.b,z.a)
x=b.a
x.a=v.a1(x.a)
x=b.a
w=v.aQ(x.b)
x.b=w.w(0,w.E(0))
w=b.a
w.f=v.ag(w.f)
w=b.a
w.r=v.ag(w.r)
w=b.a
w.x=v.aQ(w.x)
w=b.a
w.y=v.aQ(w.y)}return!0},
a5:function(a){return this.b.a5(this.c.eh(a))},
aV:function(a,b){return},
d0:function(a,b){return},
aA:function(){return this.c.qE(this.b.aA(),!0)}},
lU:{
"^":"bp;",
iW:function(a,b,c,d,e,f,g,h){var z,y,x,w
z=G.eH(h.a,h.b,1)
y=J.D(c)
x=J.h(y.h(c,1),y.h(c,0))
if(typeof x!=="number")return H.b(x)
w=J.h(y.h(c,2),y.h(c,3))
if(typeof w!=="number")return H.b(w)
y=z.i(0,G.eH(1/x,1/w,1)).i(0,G.cQ(G.B(-J.e8(y.h(c,0)),-J.e8(y.h(c,3)),0)))
this.r=y
this.x=G.Z(y.b,y.a)
y=this.e
this.f=G.Z(y.b,y.a).i(0,this.x)}},
dO:{
"^":"o;aL:a<,iA:b<",
L:function(a){this.a=new G.r(new Float32Array(H.n(J.N(a.gaL()))))
this.b=a.giA()
return this},
H:function(a,b){this.a.H(0,b.gaL())
this.b=this.b+b.giA()
return this},
j:function(a,b){return G.bc(this).H(0,b)},
l:function(a,b){var z,y,x,w,v,u,t
z=G.bc(this)
y=z.a
x=b.gaL()
y=y.a
w=y.length
if(0>=w)return H.a(y,0)
v=y[0]
u=J.C(x)
t=J.e(u.gA(x),0)
if(typeof t!=="number")return H.b(t)
y[0]=v-t
if(1>=w)return H.a(y,1)
t=y[1]
v=J.e(u.gA(x),1)
if(typeof v!=="number")return H.b(v)
y[1]=t-v
if(2>=w)return H.a(y,2)
w=y[2]
x=J.e(u.gA(x),2)
if(typeof x!=="number")return H.b(x)
y[2]=w-x
z.b=z.b-b.giA()
return z},
i:function(a,b){var z,y
z=G.bc(this)
z.a.b4(0,b)
y=z.b
if(typeof b!=="number")return H.b(b)
z.b=y*b
return z},
w:function(a,b){var z,y
z=G.bc(this)
z.a.cq(b)
y=z.b
if(typeof b!=="number")return H.b(b)
z.b=y/b
return z},
static:{bc:function(a){return new G.dO(new G.r(new Float32Array(H.n(a.a.a))),a.b)},rZ:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=G.j0(b,c)
y=J.y(z)
if(y.a0(z,0.9995)){y=1-a
x=G.bc(b)
x.a.b4(0,y)
x.b*=y
y=G.bc(c)
y.a.b4(0,a)
y.b*=a
y=G.bc(x).H(0,y)
x=Math.sqrt(H.v(G.j0(y,y)))
y=G.bc(y)
y.a.cq(x)
y.b/=x
return y}else{w=Math.acos(H.v(y.v(z,-1,1)))*a
y=G.bc(b)
y.a.b4(0,z)
y.b*=z
x=G.bc(c)
v=x.a
u=y.a
v=v.a
t=v.length
if(0>=t)return H.a(v,0)
s=v[0]
u=u.a
r=u.length
if(0>=r)return H.a(u,0)
v[0]=s-u[0]
if(1>=t)return H.a(v,1)
s=v[1]
if(1>=r)return H.a(u,1)
v[1]=s-u[1]
if(2>=t)return H.a(v,2)
t=v[2]
if(2>=r)return H.a(u,2)
v[2]=t-u[2]
x.b=x.b-y.b
y=Math.sqrt(H.v(G.j0(x,x)))
q=G.bc(x)
q.a.cq(y)
q.b/=y
y=Math.cos(H.v(w))
x=G.bc(b)
x.a.b4(0,y)
x.b*=y
y=Math.sin(H.v(w))
u=G.bc(q)
u.a.b4(0,y)
u.b*=y
return G.bc(x).H(0,u)}},j0:function(a,b){return J.c(G.J(a.a,b.a),a.b*b.b)}}},
aK:{
"^":"o;dr:a>,bc:b<,il:c<,kO:d?,ed:e<,f",
cA:function(a,b,c,d,e){this.a=new G.j(new Float32Array(H.n(a.a)))
this.b=new G.r(new Float32Array(H.n(J.N(b))))
this.c=c
this.d=d
this.e=e},
fT:function(a){return new G.j(new Float32Array(H.n(this.a.j(0,J.d(this.b,a)).a)))},
bT:["lK",function(){return this.a.bT()||this.b.bT()||J.dv(this.c)||J.dv(this.d)}],
static:{aO:function(a,b,c,d,e,f){var z
if(a==null){z=new G.j(new Float32Array(H.k(3)))
z.C(0,0,0)}else z=new G.j(new Float32Array(H.n(J.N(a))))
return new G.aK(z,b==null?G.B(0,0,0):new G.r(new Float32Array(H.n(J.N(b)))),c,d,e,f)}}},
as:{
"^":"aK;kE:r<,x,y,z,Q,a,b,c,d,e,f",
L:function(a){this.a.L(J.nU(a))
this.b.L(a.gbc())
this.r=a.gkE()
this.x.L(a.x)
this.y.L(a.y)
this.z.L(a.z)
this.Q.L(a.Q)},
iJ:function(a){var z=this.a
this.x=new G.j(new Float32Array(H.n(z.j(0,this.x.l(0,z).i(0,a)).a)))
z=this.a
this.y=new G.j(new Float32Array(H.n(z.j(0,this.y.l(0,z).i(0,a)).a)))
z=this.b
this.z=J.c(z,J.d(J.h(this.z,z),a))
z=this.b
this.Q=J.c(z,J.d(J.h(this.Q,z),a))},
bT:function(){if(!this.lK())if(this.r)var z=this.x.bT()||this.y.bT()||this.z.bT()||this.Q.bT()
else z=!1
else z=!0
return z},
static:{m2:function(a){var z,y,x,w,v,u,t,s,r,q
z=new G.j(new Float32Array(H.k(3)))
z.C(0,0,0)
y=new G.j(new Float32Array(H.k(3)))
y.C(0,0,0)
x=G.B(0,0,0)
w=G.B(0,0,0)
v=new Float32Array(H.n(a.gdr(a).a))
u=new Float32Array(H.n(J.N(a.b)))
t=a.c
s=a.d
r=a.e
q=a.f
v=new G.j(new Float32Array(H.n(v)))
return new G.as(!1,z,y,x,w,v,new G.r(new Float32Array(H.n(u))),t,s,r,q)}}},
o8:{
"^":"lB;a,b",
pP:function(a){var z,y,x,w,v,u,t,s,r
z=J.C(a)
y=J.af(z.gS(a))
x=J.d(y,y)
if(typeof x!=="number")return H.b(x)
w=1-x
if(w===0)return 0
x=this.a
v=z.gG(a)
if(typeof x!=="number")return x.i()
if(typeof v!=="number")return H.b(v)
u=z.gG(a)
if(typeof u!=="number")return H.b(u)
t=this.b
s=z.gF(a)
if(typeof t!=="number")return t.i()
if(typeof s!=="number")return H.b(s)
z=z.gF(a)
if(typeof z!=="number")return H.b(z)
r=(x*v*u+t*s*z)/w
z=this.a
if(typeof z!=="number")return z.j()
s=this.b
if(typeof s!=="number")return s.j()
s=Math.sqrt(H.v((z+2)*(s+2)))
H.v(y)
H.v(r)
return s*0.15915494309189535*Math.pow(y,r)},
ao:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=J.c(a,b)
y=J.D(z)
x=y.w(z,y.E(z))
z=J.C(x)
w=J.af(J.e(z.gA(x),2))
y=J.d(w,w)
if(typeof y!=="number")return H.b(y)
v=1-y
if(v>0&&J.F(G.J(a,x),0)){y=this.a
u=z.gG(x)
if(typeof y!=="number")return y.i()
if(typeof u!=="number")return H.b(u)
t=z.gG(x)
if(typeof t!=="number")return H.b(t)
s=this.b
r=z.gF(x)
if(typeof s!=="number")return s.i()
if(typeof r!=="number")return H.b(r)
z=z.gF(x)
if(typeof z!=="number")return H.b(z)
q=(y*u*t+s*r*z)/v
z=this.a
if(typeof z!=="number")return z.j()
r=this.b
if(typeof r!=="number")return r.j()
r=Math.sqrt(H.v((z+1)*(r+1)))
H.v(w)
H.v(q)
z=Math.pow(w,q)
s=G.J(a,x)
if(typeof s!=="number")return H.b(s)
p=r*0.15915494309189535*z/(4*s)}else p=0
return p},
fi:function(a,b,c){var z,y,x,w,v
z=this.a
y=this.b
x=3.141592653589793*a
if(z==null?y==null:z===y){z=x*0.5
c[0]=z}else{if(typeof z!=="number")return z.j()
if(typeof y!=="number")return y.j()
z=Math.atan(H.v(Math.sqrt(H.v((z+1)/(y+1)))*Math.tan(H.v(x*0.5))))
c[0]=z}w=Math.cos(H.v(z))
v=Math.sin(H.v(c[0]))
z=this.a
if(typeof z!=="number")return z.i()
y=this.b
if(typeof y!=="number")return y.i()
y=1/(z*w*w+y*v*v+1)
H.v(b)
H.v(y)
c[1]=Math.pow(b,y)}},
oi:{
"^":"lB;a",
ao:function(a,b){var z,y,x,w,v,u
z=J.c(a,b)
y=J.D(z)
x=y.w(z,y.E(z))
w=J.af(J.e(J.N(x),2))
z=this.a
if(typeof z!=="number")return z.j()
H.v(w)
H.v(z)
y=Math.pow(w,z)
v=G.J(a,x)
if(typeof v!=="number")return H.b(v)
u=(z+1)*y/(25.132741228718345*v)
return J.aG(G.J(a,x),0)?0:u},
m_:function(a){var z=this.a
if(typeof z!=="number")return z.a0()
if(z>1e4||isNaN(z))this.a=1e4},
static:{d1:function(a){var z=new G.oi(a)
z.m_(a)
return z}}},
ob:{
"^":"bL;b,a",
ay:[function(a,b){return this.b.ay(a,G.B(b.gG(b),b.gF(b),-b.gS(b)))},"$2","gaN",4,0,5],
b3:function(a,b,c,d,e){var z,y,x,w,v
z=this.b.b3(a,b,c,d,e)
y=b.gG(b)
x=b.gF(b)
w=b.gS(b)
v=new Float32Array(3)
if(0>=3)return H.a(v,0)
v[0]=y
if(1>=3)return H.a(v,1)
v[1]=x
if(2>=3)return H.a(v,2)
v[2]=-w
b.L(new G.r(v))
return z},
cY:function(a,b,c){var z=J.C(a)
return this.b.cY(G.B(z.gG(a),z.gF(a),J.M(z.gS(a))),b,c)},
c_:function(a,b,c){return this.b.c_(a,b,c)},
ao:function(a,b){return this.b.ao(a,G.B(b.gG(b),b.gF(b),-b.gS(b)))},
static:{kw:function(a){var z=a.a
if(typeof z!=="number")return z.lO()
return new G.ob(a,(z^3)>>>0)}}},
oc:{
"^":"o;a,b,kQ:c<,d,e,f,r,x",
d3:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.cU(e)
if(z===0){J.u(d,0,0)
if(f!=null)f[0]=0
y=new G.bt(new Float32Array(H.k(3)))
y.a4(3,0)
return y}x=P.X(J.a_(J.d(c.glf(),z)),z-1)
y=this.x
v=x
u=0
while(!0){if(!(u<this.r)){w=null
break}if(u>=8)return H.a(y,u)
if(y[u].cS(e)){t=v-1
s=v===0
v=t}else s=!1
if(s){w=y[u]
break}++u}r=this.el(a)
q=G.B(0,0,0)
s=J.aQ(d)
s.k(d,0,0)
p=c.grh()
if(0>=p.length)return H.a(p,0)
p=p[0]
o=c.a
if(1>=o.length)return H.a(o,1)
n=w.b3(r,q,p,o[1],d)
if(J.i(s.h(d,0),0)){if(f!=null)f[0]=0
return G.q(0)}if(f!=null)f[0]=w.gaa(w)
b.L(this.f2(q))
p=w.gaa(w)
if(typeof p!=="number")return p.T()
if((p&16)===0&&z>1)for(u=0;u<this.r;++u){if(u>=8)return H.a(y,u)
if(!J.i(y[u],w)&&y[u].cS(e))s.k(d,0,J.c(s.h(d,0),y[u].ao(r,q)))}if(z>1)s.k(d,0,J.G(s.h(d,0),z))
s=w.a
if(typeof s!=="number")return s.T()
if((s&16)===0){n=G.q(0)
s=J.y(e)
e=J.F(J.d(G.J(b,this.d),G.J(a,this.d)),0)?s.T(e,4294967293):s.T(e,4294967294)
for(u=0;u<this.r;++u){if(u>=8)return H.a(y,u)
if(y[u].cS(e))n=n.j(0,y[u].ay(r,q))}}return n},
b3:function(a,b,c,d,e){return this.d3(a,b,c,d,e,null)},
lp:function(a,b,c,d){return this.d3(a,b,c,d,31,null)},
kX:function(a,b,c){var z,y,x,w,v,u,t
if(this.r===0)return 0
z=this.el(a)
y=this.el(b)
for(x=this.x,w=0,v=0,u=0;u<this.r;++u){if(u>=8)return H.a(x,u)
if(x[u].cS(c)){++v
t=x[u].ao(z,y)
if(typeof t!=="number")return H.b(t)
w+=t}}return v>0?w/v:0},
ao:function(a,b){return this.kX(a,b,31)},
H:function(a,b){var z,y
z=this.x
y=this.r++
if(y>=8)return H.a(z,y)
z[y]=b},
cU:function(a){var z,y,x
if(a==null)return this.r
for(z=this.x,y=0,x=0;x<this.r;++x){if(x>=8)return H.a(z,x)
if(z[x].cS(a))++y}return y},
io:function(){return this.cU(null)},
el:function(a){return G.B(G.J(a,this.e),G.J(a,this.f),G.J(a,this.c))},
f2:function(a){var z,y,x,w,v
z=J.V(this.e)
y=a.a
x=y.length
if(0>=x)return H.a(y,0)
z=J.d(z,y[0])
w=this.f.a
if(0>=w.length)return H.a(w,0)
w=w[0]
if(1>=x)return H.a(y,1)
w=J.c(z,w*y[1])
z=J.V(this.c)
if(2>=x)return H.a(y,2)
z=J.c(w,J.d(z,y[2]))
w=J.d(J.S(this.e),y[0])
x=this.f.a
if(1>=x.length)return H.a(x,1)
x=J.c(J.c(w,x[1]*y[1]),J.d(J.S(this.c),y[2]))
w=J.d(J.P(this.e),y[0])
v=this.f.a
if(2>=v.length)return H.a(v,2)
return G.B(z,x,J.c(J.c(w,v[2]*y[1]),J.d(J.P(this.c),y[2])))},
i5:[function(a,b,c){var z,y,x,w,v
z=this.el(b)
y=this.el(a)
c=J.F(J.d(G.J(b,this.d),G.J(a,this.d)),0)?c&4294967293:c&4294967294
x=G.q(0)
for(w=this.x,v=0;v<this.r;++v){if(v>=8)return H.a(w,v)
if(w[v].cS(c))x=x.j(0,w[v].ay(y,z))}return x},function(a,b){return this.i5(a,b,31)},"ay","$3","$2","gaN",4,2,62,1],
cY:function(a,b,c){var z,y,x,w,v,u,t
if(typeof c!=="number")return c.i()
z=c*c
y=2*z
x=Array(y)
x.fixed$length=Array
w=H.p(x,[P.a3])
G.eG(w,c,c,a,!0)
y=Array(y)
y.fixed$length=Array
v=H.p(y,[P.a3])
G.eG(v,c,c,a,!0)
u=G.q(0)
for(y=this.x,t=0;t<this.r;++t){if(t>=8)return H.a(y,t)
if(y[t].cS(b))u=u.j(0,y[t].c_(z,w,v))}return u},
l6:function(a,b){return this.cY(a,b,6)},
l7:function(a,b,c,d){var z,y,x,w,v
z=d*d
y=Array(2*z)
y.fixed$length=Array
x=H.p(y,[P.a3])
G.eG(x,d,d,b,!0)
w=G.q(0)
for(y=this.x,v=0;v<this.r;++v){if(v>=8)return H.a(y,v)
if(y[v].cS(c))w=w.j(0,y[v].cY(a,z,x))}return w},
c_:function(a,b,c){return this.l7(a,b,c,6)},
r3:function(a,b){return this.l7(a,b,31,6)},
lU:function(a,b,c){var z,y
this.d=b
z=this.a
this.c=z.b
z=z.f
y=J.D(z)
z=y.w(z,y.E(z))
this.e=z
this.f=G.aF(this.c,z)
this.r=0},
static:{bw:function(a,b,c){var z=Array(8)
z.fixed$length=Array
z=new G.oc(a,c,null,null,null,null,null,H.p(z,[G.bL]))
z.lU(a,b,c)
return z}}},
cw:{
"^":"o;rh:a<,lf:b<",
lW:function(a,b,c){var z,y,x,w,v
z=this.a
y=a.gle()
x=b.c
if(x<0||x>=y.length)return H.a(y,x)
y=y[x]
w=2*c
if(w>=y.length)return H.a(y,w)
y=y[w]
v=z.length
if(0>=v)return H.a(z,0)
z[0]=y
y=a.y
if(x>=y.length)return H.a(y,x)
x=y[x];++w
if(w>=x.length)return H.a(x,w)
w=x[w]
if(1>=v)return H.a(z,1)
z[1]=w
w=a.x
z=b.b
if(z<0||z>=w.length)return H.a(w,z)
this.b=J.e(w[z],c)},
lV:function(a){var z,y,x
z=this.a
y=a.bZ()
x=z.length
if(0>=x)return H.a(z,0)
z[0]=y
y=a.a.P()
if(1>=x)return H.a(z,1)
z[1]=y
this.b=a.a.P()},
static:{ca:function(a){var z=new G.cw(new Float32Array(H.k(2)),0)
z.lV(a)
return z},dx:function(a,b,c){var z=new G.cw(new Float32Array(H.k(2)),0)
z.lW(a,b,c)
return z}}},
b_:{
"^":"o;br:a<,b,c",
lX:function(a,b){var z=this.a
C.c.H(b.f,z)
this.b=b.f.length-1
z=this.a
C.c.H(b.r,z)
this.c=b.r.length-1},
static:{f3:function(a,b){var z=new G.b_(a,null,null)
z.lX(a,b)
return z}}},
kx:{
"^":"o;a,b,c"},
bL:{
"^":"o;aa:a>",
cS:function(a){var z=this.a
if(typeof z!=="number")return z.T()
if(typeof a!=="number")return H.b(a)
return(z&a)>>>0===z},
b3:function(a,b,c,d,e){var z
b.L(G.hz(c,d))
if(J.K(J.P(a),0)){z=b.a
if(2>=z.length)return H.a(z,2)
z[2]=z[2]*-1}J.u(e,0,this.ao(a,b))
return this.ay(a,b)},
cY:function(a,b,c){var z,y,x,w,v,u,t,s
z=G.q(0)
for(y=c.length,x=0;x<b;++x){w=new Float32Array(3)
if(0>=3)return H.a(w,0)
w[0]=0
if(1>=3)return H.a(w,1)
w[1]=0
if(2>=3)return H.a(w,2)
w[2]=0
v=[0]
u=2*x
if(u>=y)return H.a(c,u)
t=c[u];++u
if(u>=y)return H.a(c,u)
s=this.b3(a,new G.r(w),t,c[u],v)
if(0>=v.length)return H.a(v,0)
if(J.F(v[0],0)){w=C.b.aW(w[2])
if(0>=v.length)return H.a(v,0)
u=v[0]
if(typeof u!=="number")return H.b(u)
z=z.j(0,J.d(s,w/u))}}return z.w(0,b)},
c_:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=G.q(0)
for(y=c.length,x=b.length,w=0;w<a;++w){v=new Float32Array(3)
if(0>=3)return H.a(v,0)
v[0]=0
if(1>=3)return H.a(v,1)
v[1]=0
if(2>=3)return H.a(v,2)
v[2]=0
u=2*w
if(u>=x)return H.a(b,u)
t=b[u]
s=u+1
if(s>=x)return H.a(b,s)
r=b[s]
q=J.d(t,t)
if(typeof q!=="number")return H.b(q)
q=P.I(0,1-q)
p=Math.sqrt(q)
if(typeof r!=="number")return H.b(r)
o=6.283185307179586*r
r=Math.cos(o)
q=Math.sin(o)
n=new Float32Array(3)
if(0>=3)return H.a(n,0)
n[0]=p*r
if(1>=3)return H.a(n,1)
n[1]=p*q
if(2>=3)return H.a(n,2)
n[2]=t
m=[0]
if(u>=y)return H.a(c,u)
u=c[u]
if(s>=y)return H.a(c,s)
l=this.b3(new G.r(n),new G.r(v),u,c[s],m)
if(0>=m.length)return H.a(m,0)
if(J.F(m[0],0)){v=C.b.aW(v[2])
n=C.b.aW(n[2])
if(0>=m.length)return H.a(m,0)
u=m[0]
if(typeof u!=="number")return H.b(u)
z=z.j(0,J.d(l,v*n/(0.15915494309189535*u)))}}return z.w(0,3.141592653589793*a)},
ao:function(a,b){var z,y
z=J.P(a)
y=b.a
if(2>=y.length)return H.a(y,2)
return J.F(J.d(z,y[2]),0)?C.b.aW(y[2])*0.3183098861837907:0}},
hP:{
"^":"o;"},
pe:{
"^":"bL;b,c,d,a",
ay:[function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b.i(0,0.387507687528093)
y=$.$get$cN()
x=this.c
z=z.i(0,y.l(0,x))
w=b.a
if(2>=w.length)return H.a(w,2)
v=1-0.5*C.b.aW(w[2])
H.v(v)
H.v(5)
v=Math.pow(v,5)
u=J.C(a)
t=J.af(J.e(u.gA(a),2))
if(typeof t!=="number")return H.b(t)
t=1-0.5*t
H.v(t)
H.v(5)
s=z.i(0,(1-v)*(1-Math.pow(t,5)))
r=b.j(0,a)
z=r.a
v=z.length
if(0>=v)return H.a(z,0)
if(z[0]===0){if(1>=v)return H.a(z,1)
if(z[1]===0){if(2>=v)return H.a(z,2)
z=z[2]===0}else z=!1}else z=!1
if(z)return G.q(0)
r=r.w(0,r.E(0))
z=this.d.pP(r)
v=G.aq(b,r)
if(typeof v!=="number")return H.b(v)
u=P.I(C.b.aW(w[2]),J.af(J.e(u.gA(a),2)))
w=G.J(b,r)
y=y.l(0,x)
if(typeof w!=="number")return H.b(w)
w=1-w
H.v(w)
H.v(5)
return s.j(0,x.j(0,y.i(0,Math.pow(w,5))).i(0,z/(4*v*u)))},"$2","gaN",4,0,5],
b3:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=J.y(c)
if(z.U(c,0.5)){if(typeof c!=="number")return H.b(c)
b.L(G.hz(2*c,d))
if(J.K(J.P(a),0)){z=b.a
if(2>=z.length)return H.a(z,2)
z[2]=z[2]*-1}}else{z=z.l(c,0.5)
if(typeof z!=="number")return H.b(z)
c=2*z
z=this.d
y=[0,0]
if(c<0.25)z.fi(4*c,d,y)
else if(c<0.5){z.fi(4*(0.5-c),d,y)
y[0]=3.141592653589793-y[0]}else if(c<0.75){z.fi(4*(c-0.5),d,y)
y[0]=y[0]+3.141592653589793}else{z.fi(4*(1-c),d,y)
y[0]=6.283185307179586-y[0]}x=y[0]
w=y[1]
v=P.I(0,1-w*w)
u=Math.sqrt(v)
v=Math.cos(x)
t=Math.sin(x)
s=new Float32Array(3)
r=new G.r(s)
if(0>=3)return H.a(s,0)
s[0]=u*v
if(1>=3)return H.a(s,1)
s[1]=u*t
if(2>=3)return H.a(s,2)
s[2]=w
v=J.C(a)
if(!J.F(J.d(v.gS(a),s[2]),0)){t=s[0]
q=s[1]
s=s[2]
p=new Float32Array(3)
r=new G.r(p)
if(0>=3)return H.a(p,0)
p[0]=-t
if(1>=3)return H.a(p,1)
p[1]=-q
if(2>=3)return H.a(p,2)
p[2]=-s}t=v.a2(a)
s=r.a
q=s.length
if(0>=q)return H.a(s,0)
p=s[0]
if(1>=q)return H.a(s,1)
o=s[1]
if(2>=q)return H.a(s,2)
q=s[2]
n=new Float32Array(3)
if(0>=3)return H.a(n,0)
n[0]=p*2
if(1>=3)return H.a(n,1)
n[1]=o*2
if(2>=3)return H.a(n,2)
n[2]=q*2
q=G.J(a,r)
o=n[0]
if(typeof q!=="number")return H.b(q)
p=n[1]
n=n[2]
m=new Float32Array(3)
if(0>=3)return H.a(m,0)
m[0]=o*q
if(1>=3)return H.a(m,1)
m[1]=p*q
if(2>=3)return H.a(m,2)
m[2]=n*q
b.L(J.c(t,new G.r(m)))
l=C.b.aW(s[2])
k=1-l*l
if(k>0&&J.F(G.J(a,r),0)){t=z.a
q=s[0]
if(typeof t!=="number")return t.i()
z=z.b
s=s[1]
if(typeof z!=="number")return z.i()
p=Math.sqrt((t+1)*(z+1))
z=Math.pow(l,(t*q*q+z*s*s)/k)
t=G.J(a,r)
if(typeof t!=="number")return H.b(t)
j=p*0.15915494309189535*z/(4*t)}else j=0
J.u(e,0,j)
z=v.gS(a)
v=b.a
if(2>=v.length)return H.a(v,2)
if(!(z*v[2]>0))return G.q(0)}J.u(e,0,this.ao(a,b))
return this.ay(a,b)},
ao:function(a,b){var z,y
z=J.P(a)
y=b.a
if(2>=y.length)return H.a(y,2)
if(!J.F(J.d(z,y[2]),0))return 0
return 0.5*(C.b.aW(y[2])*0.3183098861837907+this.d.ao(a,b))}},
pf:{
"^":"hP;a,b",
J:function(a){var z,y,x,w,v,u,t,s,r
a=J.af(a)
z=J.w(a)
y=G.q(z.i(a,a))
x=this.a
w=this.b
v=x.i(0,x).j(0,w.i(0,w)).i(0,z.i(a,a))
if(typeof a!=="number")return H.b(a)
z=2*a
u=v.l(0,x.i(0,z))
t=$.$get$l3()
s=u.j(0,t).w(0,v.j(0,x.i(0,z)).j(0,t))
r=x.i(0,x).j(0,w.i(0,w))
return s.j(0,r.l(0,x.i(0,z)).j(0,y).w(0,r.j(0,x.i(0,z)).j(0,y))).w(0,2)},
static:{hQ:function(a,b){return new G.pf(G.am(a,0),G.am(b,0))}}},
bO:{
"^":"hP;a,b",
J:function(a){var z,y,x,w,v,u,t,s,r
a=J.a4(a,-1,1)
if(typeof a!=="number")return a.a0()
z=this.a
y=this.b
if(!(a>0)){x=y
y=z
z=x}w=J.y(z)
v=J.d(w.w(z,y),Math.sqrt(H.v(P.I(0,1-a*a))))
u=J.y(v)
if(u.av(v,1))return G.q(1)
u=u.i(v,v)
if(typeof u!=="number")return H.b(u)
t=Math.sqrt(H.v(P.I(0,1-u)))
a=Math.abs(a)
u=J.w(y)
s=J.G(J.h(u.i(y,a),w.i(z,t)),J.c(u.i(y,a),w.i(z,t)))
r=J.G(J.h(w.i(z,a),u.i(y,t)),J.c(w.i(z,a),u.i(y,t)))
return G.q(J.G(J.c(J.d(s,s),J.d(r,r)),2))}},
pg:{
"^":"hP;",
J:function(a){return G.q(1)}},
ia:{
"^":"o;au:a>,aL:b<",
b9:function(a,b,c,d,e){return this.a.$4(b,c,d,e)}},
q6:{
"^":"bL;b,a",
ay:[function(a,b){var z,y,x,w
z=G.kv(a,b)
for(y=this.b,x=0.001;!0;){w={}
w.a=G.q(0)
w.b=0
w.c=0
y.bX(z,new G.q7(w),[x])
if(w.c>2||x>1.5)return w.a.cl(0).w(0,w.b)
x*=2}},"$2","gaN",4,0,5]},
q7:{
"^":"z:69;a",
$4:function(a,b,c,d){var z,y
z=Math.exp(H.v(-100*c))
y=this.a
y.a=y.a.j(0,J.d(b.gaL(),z))
y.b+=z;++y.c}},
qD:{
"^":"bL;b,a",
ay:[function(a,b){return this.b.i(0,0.3183098861837907)},"$2","gaN",4,0,5],
cY:function(a,b,c){return this.b},
c_:function(a,b,c){return this.b},
static:{dF:function(a){return new G.qD(G.am(a,0),5)}}},
dd:{
"^":"bL;b,c,d,a",
ay:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.C(a)
y=J.af(J.e(z.gA(a),2))
x=b.a
if(2>=x.length)return H.a(x,2)
w=C.b.aW(x[2])
if(w===0||J.i(y,0))return G.q(0)
v=b.j(0,a)
u=v.a
t=u.length
if(0>=t)return H.a(u,0)
if(u[0]===0){if(1>=t)return H.a(u,1)
if(u[1]===0){if(2>=t)return H.a(u,2)
u=u[2]===0}else u=!1}else u=!1
if(u)return G.q(0)
v=v.w(0,v.E(0))
s=this.d.J(G.J(b,v))
u=this.c
t=v.a
if(2>=t.length)return H.a(t,2)
r=C.b.aW(t[2])
u=u.a
if(typeof u!=="number")return u.j()
H.v(r)
H.v(u)
q=Math.pow(r,u)
p=C.b.aW(t[2])
o=J.af(J.e(z.gA(a),2))
n=C.b.aW(x[2])
m=G.aq(a,v)
x=2*p
if(typeof o!=="number")return H.b(o)
if(typeof m!=="number")return H.b(m)
x=J.d(J.d(this.b,(u+2)*0.15915494309189535*q*P.X(1,P.X(x*o/m,x*n/m))),s)
if(typeof y!=="number")return H.b(y)
return J.G(x,4*w*y)},"$2","gaN",4,0,5],
b3:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.c
y=z.a
if(typeof y!=="number")return y.j()
if(typeof c!=="number")H.T(H.Y(c))
x=Math.pow(c,1/(y+1))
y=P.I(0,1-x*x)
w=Math.sqrt(y)
v=J.d(J.d(d,2),3.141592653589793)
y=typeof v!=="number"
if(y)H.T(H.Y(v))
u=Math.cos(v)
if(y)H.T(H.Y(v))
y=Math.sin(v)
t=new Float32Array(3)
s=new G.r(t)
if(0>=3)return H.a(t,0)
t[0]=w*u
if(1>=3)return H.a(t,1)
t[1]=w*y
if(2>=3)return H.a(t,2)
t[2]=x
y=J.C(a)
if(!J.F(J.d(y.gS(a),t[2]),0)){u=t[0]
r=t[1]
t=t[2]
q=new Float32Array(3)
s=new G.r(q)
if(0>=3)return H.a(q,0)
q[0]=-u
if(1>=3)return H.a(q,1)
q[1]=-r
if(2>=3)return H.a(q,2)
q[2]=-t}u=y.a2(a)
t=s.a
r=t.length
if(0>=r)return H.a(t,0)
q=t[0]
if(1>=r)return H.a(t,1)
p=t[1]
if(2>=r)return H.a(t,2)
t=t[2]
r=new Float32Array(3)
if(0>=3)return H.a(r,0)
r[0]=q*2
if(1>=3)return H.a(r,1)
r[1]=p*2
if(2>=3)return H.a(r,2)
r[2]=t*2
t=G.J(a,s)
p=r[0]
if(typeof t!=="number")return H.b(t)
q=r[1]
r=r[2]
o=new Float32Array(3)
if(0>=3)return H.a(o,0)
o[0]=p*t
if(1>=3)return H.a(o,1)
o[1]=q*t
if(2>=3)return H.a(o,2)
o[2]=r*t
b.L(J.c(u,new G.r(o)))
z=z.a
if(typeof z!=="number")return z.j()
u=Math.pow(x,z)
t=G.J(a,s)
if(typeof t!=="number")return H.b(t)
n=(z+1)*u/(25.132741228718345*t)
J.u(e,0,J.aG(G.J(a,s),0)?0:n)
z=y.gS(a)
y=b.a
if(2>=y.length)return H.a(y,2)
if(!(z*y[2]>0))return G.q(0)
return this.ay(a,b)},
ao:function(a,b){var z,y
z=J.P(a)
y=b.a
if(2>=y.length)return H.a(y,2)
if(!J.F(J.d(z,y[2]),0))return 0
return this.c.ao(a,b)}},
lB:{
"^":"o;"},
ra:{
"^":"bL;b,c,d,a",
ay:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=Math.sqrt(H.v(G.eM(b)))
y=Math.sqrt(H.v(G.eM(a)))
if(z>0.0001&&y>0.0001){x=G.jL(b)
w=G.jK(b)
v=G.jL(a)
u=P.I(0,J.c(J.d(w,G.jK(a)),J.d(x,v)))}else u=0
t=b.a
if(2>=t.length)return H.a(t,2)
s=C.b.aW(t[2])
r=J.C(a)
q=J.af(J.e(r.gA(a),2))
if(typeof q!=="number")return H.b(q)
if(s>q){p=z/C.b.aW(t[2])
o=y}else{t=J.af(J.e(r.gA(a),2))
if(typeof t!=="number")return H.b(t)
p=y/t
o=z}return this.b.i(0,0.3183098861837907*(this.c+this.d*u*o*p))},"$2","gaN",4,0,5]},
t5:{
"^":"bL;b,c,d,e,a",
ay:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=new G.r(new Float32Array(H.n(J.N(a))))
y=new G.r(new Float32Array(H.n(b.a)))
x=z.j(0,y)
w=x.a
if(2>=w.length)return H.a(w,2)
if(w[2]<0){z.a2(0)
y=y.a2(0)
x=x.a2(0)}w=x.a
v=w.length
if(0>=v)return H.a(w,0)
if(w[0]===0){if(1>=v)return H.a(w,1)
if(w[1]===0){if(2>=v)return H.a(w,2)
w=w[2]===0}else w=!1}else w=!1
if(w)return G.q(0)
x=x.w(0,x.E(0))
u=Math.acos(H.v(C.b.v(x.gS(x),-1,1)))
t=G.jK(x)
s=G.jL(x)
w=x.a
if(2>=w.length)return H.a(w,2)
r=w[2]
q=Math.sqrt(H.v(G.eM(x)))
w=J.w(s)
p=G.B(J.d(t,r),w.i(s,r),-q)
o=G.B(w.a2(s),t,0)
n=G.B(G.J(y,p),G.J(y,o),G.J(y,x))
m=Math.acos(H.v(C.b.v(n.gS(n),-1,1)))
l=G.eN(n)
if(l>3.141592653589793)l-=3.141592653589793
w=new G.t6()
k=w.$3(Math.sqrt(H.v(P.I(0,u/1.5707963267948966))),1,this.c)
j=w.$3(m,1.5707963267948966,this.d)
i=w.$3(l,3.141592653589793,this.e)
w=this.e
v=J.c(j,J.d(k,this.d))
if(typeof w!=="number")return w.i()
if(typeof v!=="number")return H.b(v)
h=this.b
v=3*J.c(i,w*v)
w=J.e(h,v)
g=v+1
if(g>>>0!==g||g>=h.length)return H.a(h,g)
g=h[g]
v+=2
if(v>>>0!==v||v>=h.length)return H.a(h,v)
return G.cm(w,g,h[v])},"$2","gaN",4,0,5]},
t6:{
"^":"z:70;",
$3:function(a,b,c){var z=C.d.I(a/b)
if(typeof c!=="number")return H.b(c)
return C.a.v(z*c,0,c-1)}},
m8:{
"^":"bL;b,c,a",
cY:function(a,b,c){return this.c.i(0,this.b.cY(a,b,c))},
c_:function(a,b,c){return this.c.i(0,this.b.c_(a,b,c))},
ay:[function(a,b){return this.c.i(0,this.b.ay(a,b))},"$2","gaN",4,0,5],
b3:function(a,b,c,d,e){return this.c.i(0,this.b.b3(a,b,c,d,e))}},
tH:{
"^":"bL;b,c,a",
ay:[function(a,b){return G.q(0)},"$2","gaN",4,0,5],
b3:function(a,b,c,d,e){var z,y,x,w
z=J.C(a)
y=J.M(z.gG(a))
x=b.a
w=x.length
if(0>=w)return H.a(x,0)
x[0]=y
y=J.M(z.gF(a))
if(1>=w)return H.a(x,1)
x[1]=y
y=z.gS(a)
if(2>=w)return H.a(x,2)
x[2]=y
J.u(e,0,1)
return this.c.J(J.e(z.gA(a),2)).i(0,this.b).w(0,C.b.aW(x[2]))},
ao:function(a,b){return 0},
static:{dS:function(a,b){return new G.tH(G.am(a,0),b,17)}}},
tI:{
"^":"bL;b,c,d,e,a",
ay:[function(a,b){return G.q(0)},"$2","gaN",4,0,5],
b3:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.C(a)
y=J.F(J.e(z.gA(a),2),0)
x=this.c
w=this.d
if(!y){v=w
w=x
x=v}u=J.d(J.e(z.gA(a),2),J.e(z.gA(a),2))
if(typeof u!=="number")return H.b(u)
t=P.I(0,1-u)
s=J.G(x,w)
u=J.w(s)
r=J.d(u.i(s,s),t)
if(J.a7(r,1))return G.q(0)
if(typeof r!=="number")return H.b(r)
q=P.I(0,1-r)
p=Math.sqrt(q)
if(y)p=-p
q=u.i(s,J.M(z.gG(a)))
o=b.a
n=o.length
if(0>=n)return H.a(o,0)
o[0]=q
u=u.i(s,J.M(z.gF(a)))
if(1>=n)return H.a(o,1)
o[1]=u
if(2>=n)return H.a(o,2)
o[2]=p
J.u(e,0,1)
m=this.e.J(J.e(z.gA(a),2))
return $.$get$cN().l(0,m).i(0,this.b).w(0,C.b.aW(o[2]))},
ao:function(a,b){return 0},
mQ:function(a,b,c){this.b=a
this.c=b
this.d=c},
static:{ja:function(a,b,c){var z=new G.tI(null,null,null,new G.bO(b,c),18)
z.mQ(a,b,c)
return z}}},
tk:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
static:{fE:function(){var z=$.fF
if(z!=null)return z.a
return!1},m5:function(){var z=$.fF
if(z!=null)return z.b
return 1},bS:function(){var z=$.fF
if(z!=null)return z.c
return 0}}},
eC:{
"^":"o;"},
tl:{
"^":"o;",
eb:function(a,b,c){var z,y,x
if(c!=null)this.b.push(c)
z=this.c
if(z.O(a)){if(!!J.O(z.h(0,a)).$isbq)return z.h(0,a)
y=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
y.aB(0,z.h(0,a))
return y.a}y=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
x=y.a
z.k(0,a,x)
this.kM(a).ai(new G.tm(this,a,b,y))
return x},
l5:function(a){return this.eb(a,!0,null)},
fX:function(a,b){var z,y,x,w
this.b.push(b)
z=this.c
if(z.O(a)){if(!!J.O(z.h(0,a)).$isbq)return z.h(0,a)
y=z.h(0,a)
x=H.c7(y,"$isE",[P.x],"$asE")
if(x)this.jh(a,z.h(0,a))
w=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[[P.E,P.x]])),[[P.E,P.x]])
w.aB(0,z.h(0,a))
return w.a}y="LOADING "+H.m(a)
$.t.$2(4,y)
w=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[G.cM])),[G.cM])
y=w.a
z.k(0,a,y)
this.kM(a).ai(new G.tn(this,a,w))
return y},
jh:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=U.x1(b)
if(z==null){this.c.k(0,a,null)
return}y=z.kt(b)
x=y.a
if(x.ga6(x))w=0
else{w=x.gbK(x)
w=J.d_(w.gat(w))}if(x.ga6(x))v=0
else{v=x.gbK(x)
v=J.cZ(v.gat(v))}u=G.dR(w,v,3)
t=0
s=0
while(!0){if(x.ga6(x))w=0
else{w=x.gbK(x)
w=J.cZ(w.gat(w))}if(typeof w!=="number")return H.b(w)
if(!(s<w))break
r=0
while(!0){if(x.ga6(x))w=0
else{w=x.gbK(x)
w=J.d_(w.gat(w))}if(typeof w!=="number")return H.b(w)
if(!(r<w))break
w=y.b
q=w!=null?w.d1(r,s):0
w=y.c
p=w!=null?w.d1(r,s):0
w=y.d
o=w!=null?w.d1(r,s):0
w=u.d
n=t+1
v=w.length
if(t<0||t>=v)return H.a(w,t)
w[t]=q
t=n+1
if(n<0||n>=v)return H.a(w,n)
w[n]=p
n=t+1
if(t<0||t>=v)return H.a(w,t)
w[t]=o;++r
t=n}++s}x="IMAGE LOADED "+H.m(a)
$.t.$2(4,x)
this.c.k(0,a,u)
return u},
rl:function(){var z=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
P.fc(this.b,null,!1).ai(new G.to(this,z))
return z.a},
h5:function(a){var z,y
z=this.c
if(!z.O(a))return
y=z.h(0,a)
if(this.jD(a)){y=this.jj(a,y)
this.d.k(0,a,!0)
z.k(0,a,y)}return y},
fh:function(a){var z=this.e
if(z.O(a))return z.h(0,a)
return},
jj:function(a,b){var z,y,x
try{if(J.bX(a,".gz"))b=new T.l5().b6(T.b5(b,0,null,0),!1)
else if(J.bX(a,".z"))b=new T.di().b6(T.b5(b,1,null,0),!1)
else if(J.bX(a,".bz2"))b=new T.kB(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,-1,0,0,null,null,null,null,null,0,null).b6(T.b5(b,1,null,0),!1)}catch(y){x=H.ap(y)
z=x
x="EXCEPTION "+H.m(z)
$.t.$2(4,x)}return b},
jD:function(a){var z=this.d
if(z.O(a))if(z.h(0,a)===!0)return!1
return J.dr(a).c9(a,".gz")||C.i.c9(a,".z")||C.i.c9(a,".bz2")}},
tm:{
"^":"z:0;a,b,c,d",
$1:function(a){var z,y
if(a==null){this.d.aB(0,null)
return}if(this.c&&this.a.jD(this.b)){z=this.a
y=this.b
a=z.jj(y,a)
z.d.k(0,y,!0)}this.a.c.k(0,this.b,a)
this.d.aB(0,a)}},
tn:{
"^":"z:0;a,b,c",
$1:function(a){var z
if(a==null){z="UNABLE TO LOAD "+H.m(this.b)
$.t.$2(0,z)
this.c.aB(0,null)
return}this.c.aB(0,this.a.jh(this.b,a))}},
to:{
"^":"z:0;a,b",
$1:function(a){C.c.sn(this.a.b,0)
this.b.aM(0)}},
bt:{
"^":"ai;a",
bN:function(a,b,c){var z,y,x,w,v,u,t,s
if(!G.mi(a))G.mh(a,b,c)
for(z=0,y=0,x=0,w=0,v=0;v<471;++v){w+=C.a_[v]
u=G.tE(a,b,C.E[v],c)
t=J.w(u)
s=t.i(u,C.ay[v])
if(typeof s!=="number")return H.b(s)
z+=s
s=t.i(u,C.a_[v])
if(typeof s!=="number")return H.b(s)
y+=s
t=t.i(u,C.ag[v])
if(typeof t!=="number")return H.b(t)
x+=t}G.cn(z/w,y/w,x/w,this.a)
return this},
fm:function(a,b){return this.bN(a,b,0)},
ef:function(){return G.mS(this)},
h_:function(){return this},
ce:function(a){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=a
if(1>=y)return H.a(z,1)
z[1]=a
if(2>=y)return H.a(z,2)
z[2]=a},
d4:function(a,b,c,d){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=a
if(1>=y)return H.a(z,1)
z[1]=b
if(2>=y)return H.a(z,2)
z[2]=c
return this},
cB:function(a,b,c){return this.d4(a,b,c,0)},
j:function(a,b){var z,y,x,w,v,u
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.e(b.gaI(),0)
if(typeof w!=="number")return H.b(w)
if(1>=y)return H.a(z,1)
v=z[1]
u=J.e(b.gaI(),1)
if(typeof u!=="number")return H.b(u)
if(2>=y)return H.a(z,2)
z=z[2]
y=J.e(b.gaI(),2)
if(typeof y!=="number")return H.b(y)
return G.bR(x+w,v+u,z+y)},
l:function(a,b){var z,y,x,w,v,u
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.e(b.gaI(),0)
if(typeof w!=="number")return H.b(w)
if(1>=y)return H.a(z,1)
v=z[1]
u=J.e(b.gaI(),1)
if(typeof u!=="number")return H.b(u)
if(2>=y)return H.a(z,2)
z=z[2]
y=J.e(b.gaI(),2)
if(typeof y!=="number")return H.b(y)
return G.bR(x-w,v-u,z-y)},
i:function(a,b){var z,y,x,w,v,u,t,s
if(typeof b==="number"){z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return G.bR(x*b,w*b,z[2]*b)}if(b instanceof G.bt){z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=b.a
v=w.length
if(0>=v)return H.a(w,0)
u=w[0]
if(1>=y)return H.a(z,1)
t=z[1]
if(1>=v)return H.a(w,1)
s=w[1]
if(2>=y)return H.a(z,2)
z=z[2]
if(2>=v)return H.a(w,2)
return G.bR(x*u,t*s,z*w[2])}$.t.$2(3,"RGBSpectrum or double expected.")
z=new G.bt(new Float32Array(H.k(3)))
z.a4(3,0)
return z},
w:function(a,b){var z,y,x,w,v,u,t,s
if(typeof b==="number"){z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return G.bR(x/b,w/b,z[2]/b)}if(b instanceof G.bt){z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=b.a
v=w.length
if(0>=v)return H.a(w,0)
u=w[0]
if(1>=y)return H.a(z,1)
t=z[1]
if(1>=v)return H.a(w,1)
s=w[1]
if(2>=y)return H.a(z,2)
z=z[2]
if(2>=v)return H.a(w,2)
return G.bR(x/u,t/s,z/w[2])}$.t.$2(3,"RGBSpectrum or double expected.")
z=new G.bt(new Float32Array(H.k(3)))
z.a4(3,0)
return z},
a2:function(a){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return G.bR(-x,-w,-z[2])},
aC:function(){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return 0.212671*x+0.71516*w+0.072169*z[2]},
Y:function(){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
if(z[0]===0){if(1>=y)return H.a(z,1)
if(z[1]===0){if(2>=y)return H.a(z,2)
z=z[2]!==0}else z=!0}else z=!0
if(z)return!1
return!0},
er:function(){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=Math.sqrt(H.v(z[0]))
if(1>=y)return H.a(z,1)
w=Math.sqrt(H.v(z[1]))
if(2>=y)return H.a(z,2)
return G.bR(x,w,Math.sqrt(H.v(z[2])))},
dl:function(){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=Math.exp(H.v(z[0]))
if(1>=y)return H.a(z,1)
w=Math.exp(H.v(z[1]))
if(2>=y)return H.a(z,2)
return G.bR(x,w,Math.exp(H.v(z[2])))},
v:function(a,b,c){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=C.b.v(z[0],b,c)
if(1>=y)return H.a(z,1)
w=C.b.v(z[1],b,c)
if(2>=y)return H.a(z,2)
return G.bR(x,w,C.b.v(z[2],b,c))},
cl:function(a){return this.v(a,0,1/0)},
K:function(a){var z,y,x
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=H.m(z[0])+" "
if(1>=y)return H.a(z,1)
x=x+H.m(z[1])+" "
if(2>=y)return H.a(z,2)
return x+H.m(z[2])},
mI:function(a){var z,y,x,w,v
z=J.O(a)
if(!!z.$isbt){z=this.a
y=a.a
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
v=z.length
if(0>=v)return H.a(z,0)
z[0]=w
if(1>=x)return H.a(y,1)
w=y[1]
if(1>=v)return H.a(z,1)
z[1]=w
if(2>=x)return H.a(y,2)
y=y[2]
if(2>=v)return H.a(z,2)
z[2]=y}else if(!!z.$isbC){z=a.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
G.cn(x,w,z[2],this.a)}else if(!!z.$isah){z=this.a
y=a.h_().a
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
v=z.length
if(0>=v)return H.a(z,0)
z[0]=w
if(1>=x)return H.a(y,1)
w=y[1]
if(1>=v)return H.a(z,1)
z[1]=w
if(2>=x)return H.a(y,2)
y=y[2]
if(2>=v)return H.a(z,2)
z[2]=y}},
mK:function(a,b,c){G.cn(a,b,c,this.a)},
mJ:function(a,b,c){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=a
if(1>=y)return H.a(z,1)
z[1]=b
if(2>=y)return H.a(z,2)
z[2]=c},
static:{t_:function(a){var z=new G.bt(new Float32Array(H.k(3)))
z.a4(3,a)
return z},bR:function(a,b,c){var z=new G.bt(new Float32Array(H.k(3)))
z.a4(3,0)
z.mJ(a,b,c)
return z},lZ:function(a,b,c){var z=new G.bt(new Float32Array(H.k(3)))
z.a4(3,0)
z.mK(a,b,c)
return z},fC:function(a){var z=new G.bt(new Float32Array(H.k(3)))
z.a4(3,0)
z.mI(a)
return z}}},
b6:{
"^":"o;a",
bZ:function(){return this.a.P()},
e9:function(){return this.a.aw(4294967295)}},
fG:{
"^":"hx;f,r,dq:x<,le:y<,a,b,c,d,e",
kv:function(a){var z,y,x,w
if(typeof a!=="number")return H.b(a)
z=H.p(Array(a),[G.fG])
for(y=z.length,x=0;x<a;++x){w=new G.fG([],[],[],[],0,0,0,0,0)
w.f=P.aE(this.f,!0,P.x)
w.r=P.aE(this.r,!0,P.x)
w.hg()
if(x>=y)return H.a(z,x)
z[x]=w}return z},
hg:function(){var z,y,x
this.x=H.p(Array(this.f.length),[P.fb])
this.y=H.p(Array(this.r.length),[P.fb])
for(z=0;y=this.f,z<y.length;++z){x=this.x
y=y[z]
if(typeof y!=="number"||Math.floor(y)!==y)H.T(P.aD("Invalid length "+H.m(y)))
y=new Float32Array(y)
if(z>=x.length)return H.a(x,z)
x[z]=y}for(z=0;y=this.r,z<y.length;++z){x=this.y
y=y[z]
if(typeof y!=="number")return H.b(y)
y=2*y
if(typeof y!=="number"||Math.floor(y)!==y)H.T(P.aD("Invalid length "+H.m(y)))
y=new Float32Array(y)
if(z>=x.length)return H.a(x,z)
x[z]=y}},
mN:function(a,b,c,d){if(b!=null)b.bs(a,this,d)
if(c!=null)c.bs(a,this,d)
this.hg()},
static:{fH:function(a,b,c,d){var z=new G.fG([],[],[],[],0,0,0,0,0)
z.mN(a,b,c,d)
return z}}},
ah:{
"^":"ai;a",
bN:function(a,b,c){var z,y,x,w,v,u
if(!G.mi(a))G.mh(a,b,c)
for(z=this.a,y=z.length,x=0;x<4;x=v){w=x/4
v=x+1
u=v/4
u=G.b2(a,b,400*(1-w)+700*w,400*(1-u)+700*u,c)
if(x>=y)return H.a(z,x)
z[x]=u}return this},
fm:function(a,b){return this.bN(a,b,0)},
j:function(a,b){var z,y,x,w,v,u,t,s
z=H.k(4)
y=new Float32Array(z)
x=new G.ah(y)
x.a4(4,0)
for(w=this.a,v=w.length,u=0;u<4;++u){if(u>=v)return H.a(w,u)
t=w[u]
s=J.e(b.gaI(),u)
if(typeof s!=="number")return H.b(s)
if(u>=z)return H.a(y,u)
y[u]=t+s}return x},
l:function(a,b){var z,y,x,w,v,u,t,s
z=H.k(4)
y=new Float32Array(z)
x=new G.ah(y)
x.a4(4,0)
for(w=this.a,v=w.length,u=0;u<4;++u){if(u>=v)return H.a(w,u)
t=w[u]
s=J.e(b.gaI(),u)
if(typeof s!=="number")return H.b(s)
if(u>=z)return H.a(y,u)
y[u]=t-s}return x},
i:function(a,b){var z,y,x,w,v,u,t,s,r,q
if(typeof b==="number"){z=H.k(4)
y=new Float32Array(z)
x=new G.ah(y)
x.a4(4,0)
for(w=this.a,v=w.length,u=0;u<4;++u){if(u>=v)return H.a(w,u)
t=w[u]
if(u>=z)return H.a(y,u)
y[u]=t*b}return x}if(b instanceof G.ah){z=H.k(4)
y=new Float32Array(z)
x=new G.ah(y)
x.a4(4,0)
for(w=this.a,v=w.length,t=b.a,s=t.length,u=0;u<4;++u){if(u>=v)return H.a(w,u)
r=w[u]
if(u>=s)return H.a(t,u)
q=t[u]
if(u>=z)return H.a(y,u)
y[u]=r*q}return x}$.t.$2(3,"SampledSpectrum or num expected.")
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
return z},
w:function(a,b){var z,y,x,w,v,u,t,s,r,q
if(typeof b==="number"){z=H.k(4)
y=new Float32Array(z)
x=new G.ah(y)
x.a4(4,0)
for(w=this.a,v=w.length,u=0;u<4;++u){if(u>=v)return H.a(w,u)
t=w[u]
if(u>=z)return H.a(y,u)
y[u]=t/b}return x}if(b instanceof G.ah){z=H.k(4)
y=new Float32Array(z)
x=new G.ah(y)
x.a4(4,0)
for(w=this.a,v=w.length,t=b.a,s=t.length,u=0;u<4;++u){if(u>=v)return H.a(w,u)
r=w[u]
if(u>=s)return H.a(t,u)
q=t[u]
if(u>=z)return H.a(y,u)
y[u]=r/q}return x}$.t.$2(3,"SampledSpectrum or double expected.")
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
return z},
d4:function(a,b,c,d){var z,y,x,w,v,u
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
if(d===0){y=J.y(a)
if(y.ab(a,b)&&y.ab(a,c)){z=z.j(0,$.$get$ao().d.i(0,a))
y=J.y(b)
x=J.y(c)
z=y.ab(b,c)?z.j(0,$.$get$ao().e.i(0,y.l(b,a))).j(0,$.$get$ao().z.i(0,x.l(c,b))):z.j(0,$.$get$ao().e.i(0,x.l(c,a))).j(0,$.$get$ao().y.i(0,y.l(b,c)))}else{x=J.y(b)
if(x.ab(b,a)&&x.ab(b,c)){z=z.j(0,$.$get$ao().d.i(0,b))
x=J.y(c)
z=y.ab(a,c)?z.j(0,$.$get$ao().f.i(0,y.l(a,b))).j(0,$.$get$ao().z.i(0,x.l(c,a))):z.j(0,$.$get$ao().f.i(0,x.l(c,b))).j(0,$.$get$ao().x.i(0,y.l(a,c)))}else{z=z.j(0,$.$get$ao().d.i(0,c))
z=y.ab(a,b)?z.j(0,$.$get$ao().r.i(0,y.l(a,c))).j(0,$.$get$ao().y.i(0,x.l(b,a))):z.j(0,$.$get$ao().r.i(0,x.l(b,c))).j(0,$.$get$ao().x.i(0,y.l(a,b)))}}z=z.i(0,0.94)}else{y=J.y(a)
if(y.ab(a,b)&&y.ab(a,c)){z=z.j(0,$.$get$ao().Q.i(0,a))
y=J.y(b)
x=J.y(c)
z=y.ab(b,c)?z.j(0,$.$get$ao().ch.i(0,y.l(b,a))).j(0,$.$get$ao().dy.i(0,x.l(c,b))):z.j(0,$.$get$ao().ch.i(0,x.l(c,a))).j(0,$.$get$ao().dx.i(0,y.l(b,c)))}else{x=J.y(b)
if(x.ab(b,a)&&x.ab(b,c)){z=z.j(0,$.$get$ao().Q.i(0,b))
x=J.y(c)
z=y.ab(a,c)?z.j(0,$.$get$ao().cx.i(0,y.l(a,b))).j(0,$.$get$ao().dy.i(0,x.l(c,a))):z.j(0,$.$get$ao().cx.i(0,x.l(c,b))).j(0,$.$get$ao().db.i(0,y.l(a,c)))}else{z=z.j(0,$.$get$ao().Q.i(0,c))
z=y.ab(a,b)?z.j(0,$.$get$ao().cy.i(0,y.l(a,c))).j(0,$.$get$ao().dx.i(0,x.l(b,a))):z.j(0,$.$get$ao().cy.i(0,x.l(b,c))).j(0,$.$get$ao().db.i(0,y.l(a,b)))}}z=z.i(0,0.86445)}y=this.a
x=z.a
w=x.length
if(0>=w)return H.a(x,0)
v=C.b.v(x[0],0,1/0)
u=y.length
if(0>=u)return H.a(y,0)
y[0]=v
if(1>=w)return H.a(x,1)
v=C.b.v(x[1],0,1/0)
if(1>=u)return H.a(y,1)
y[1]=v
if(2>=w)return H.a(x,2)
x=C.b.v(x[2],0,1/0)
if(2>=u)return H.a(y,2)
y[2]=x
return this},
cB:function(a,b,c){return this.d4(a,b,c,0)},
ef:function(){var z,y,x,w,v,u,t,s
z=H.k(3)
y=new Float32Array(z)
x=new G.bC(y)
x.a4(3,0)
if(0>=z)return H.a(y,0)
y[0]=0
if(1>=z)return H.a(y,1)
y[1]=0
if(2>=z)return H.a(y,2)
y[2]=0
for(z=this.a,w=z.length,v=0;v<4;++v){u=y[0]
t=$.$get$ao()
s=t.a.a
if(v>=s.length)return H.a(s,v)
s=s[v]
if(v>=w)return H.a(z,v)
y[0]=u+s*z[v]
s=y[1]
u=t.b.a
if(v>=u.length)return H.a(u,v)
y[1]=s+u[v]*z[v]
u=y[2]
t=t.c.a
if(v>=t.length)return H.a(t,v)
y[2]=u+t[v]*z[v]}y[0]=y[0]*0.7018732857622337
y[1]=y[1]*0.7018732857622337
y[2]=y[2]*0.7018732857622337
return x},
aC:function(){var z,y,x,w,v
for(z=this.a,y=z.length,x=0,w=0;w<4;++w){v=$.$get$ao().b.a
if(w>=v.length)return H.a(v,w)
v=v[w]
if(w>=y)return H.a(z,w)
x+=v*z[w]}return x*300/427.42758},
h_:function(){return G.fC(this.ef())},
v:function(a,b,c){var z,y,x,w,v,u,t
z=H.k(4)
y=new Float32Array(z)
x=new G.ah(y)
x.a4(4,0)
for(w=this.a,v=w.length,u=0;u<4;++u){if(u>=v)return H.a(w,u)
t=C.b.v(w[u],b,c)
if(u>=z)return H.a(y,u)
y[u]=t}return x},
cl:function(a){return this.v(a,0,1/0)},
mO:function(a,b){var z,y,x,w,v,u
z=J.O(a)
if(!!z.$isah)for(z=this.a,y=a.a,x=y.length,w=z.length,v=0;v<4;++v){if(v>=x)return H.a(y,v)
u=y[v]
if(v>=w)return H.a(z,v)
z[v]=u}else if(!!z.$isbt){z=a.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
this.d4(x,w,z[2],b)}else if(!!z.$isbC){z=G.fC(a).a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
this.d4(x,w,z[2],b)}},
static:{tr:function(a,b){var z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
z.mO(a,b)
return z}}},
w5:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
na:function(){var z,y,x,w,v,u
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.a=z
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.b=z
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.c=z
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.d=z
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.e=z
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.f=z
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.r=z
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.x=z
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.y=z
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.z=z
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.Q=z
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.ch=z
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.cx=z
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.cy=z
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.db=z
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.dx=z
z=new G.ah(new Float32Array(H.k(4)))
z.a4(4,0)
this.dy=z
for(y=0;y<4;y=w){z=y/4
x=400*(1-z)+700*z
w=y+1
z=w/4
v=400*(1-z)+700*z
z=this.a.a
u=G.b2(C.E,C.ay,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u
u=this.b.a
z=G.b2(C.E,C.a_,x,v,0)
if(y>=u.length)return H.a(u,y)
u[y]=z
z=this.c.a
u=G.b2(C.E,C.ag,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u}for(y=0;y<4;y=w){z=y/4
x=400*(1-z)+700*z
w=y+1
z=w/4
v=400*(1-z)+700*z
z=this.d.a
u=G.b2(C.k,C.eY,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u
u=this.e.a
z=G.b2(C.k,C.bV,x,v,0)
if(y>=u.length)return H.a(u,y)
u[y]=z
z=this.f.a
u=G.b2(C.k,C.d8,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u
u=this.r.a
z=G.b2(C.k,C.d5,x,v,0)
if(y>=u.length)return H.a(u,y)
u[y]=z
z=this.x.a
u=G.b2(C.k,C.de,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u
u=this.y.a
z=G.b2(C.k,C.ea,x,v,0)
if(y>=u.length)return H.a(u,y)
u[y]=z
z=this.z.a
u=G.b2(C.k,C.cK,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u
u=this.Q.a
z=G.b2(C.k,C.hg,x,v,0)
if(y>=u.length)return H.a(u,y)
u[y]=z
z=this.ch.a
u=G.b2(C.k,C.d7,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u
u=this.cx.a
z=G.b2(C.k,C.f4,x,v,0)
if(y>=u.length)return H.a(u,y)
u[y]=z
z=this.cy.a
u=G.b2(C.k,C.cJ,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u
u=this.db.a
z=G.b2(C.k,C.hA,x,v,0)
if(y>=u.length)return H.a(u,y)
u[y]=z
z=this.dx.a
u=G.b2(C.k,C.eB,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u
u=this.dy.a
z=G.b2(C.k,C.dR,x,v,0)
if(y>=u.length)return H.a(u,y)
u[y]=z}},
static:{w6:function(){var z=new G.w5(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.na()
return z}}},
dQ:{
"^":"o;ca:a>,bH:b>,N:c>,M:d>,aZ:e<,d5:f<,cz:r<",
l4:function(a,b,c,d,e){return!0}},
tu:{
"^":"o;a,b,c,d",
ae:function(a,b){var z,y
z=this.a.ae(a,b)
y=$.$get$ay()
y.c=J.c(y.c,1)
$.ay=y
return z},
a5:function(a){var z,y
z=this.a.a5(a)
y=$.$get$az()
y.c=J.c(y.c,1)
$.az=y
return z},
aA:function(){return this.d.$0()}},
bz:{
"^":"o;kR:a<,lj:b<,iK:e<",
aA:function(){return this.a.eg(this.bY())},
b_:function(){return!0},
cr:function(a){$.t.$2(3,"Unimplemented Shape.refine() method called")},
bW:function(a,b,c,d){$.t.$2(3,"Unimplemented Shape.intersect() method called")
return!1},
a5:function(a){$.t.$2(3,"Unimplemented Shape.intersectP() method called")
return!1},
h6:function(a,b,c){c.L(b)},
c6:[function(){$.t.$2(3,"Unimplemented Shape.area() method called")
return 0},"$0","gbg",0,0,6],
c1:function(a,b,c){var z
$.t.$2(3,"Unimplemented Shape::sample() method called")
z=new G.j(new Float32Array(H.k(3)))
z.C(0,0,0)
return z},
is:function(a){var z=this.c6()
if(typeof z!=="number")return H.b(z)
return 1/z},
iG:function(a,b,c,d){return this.c1(b,c,d)},
kY:["lL",function(a,b){var z,y,x,w,v,u
z=G.ag()
y=G.aO(a,b,0.001,1/0,0,0)
y.f=-1
x=[0]
if(!this.bW(y,x,[0],z))return 0
w=x[0]
w=new G.j(new Float32Array(H.n(y.a.j(0,J.d(y.b,w)).a))).l(0,a).a_()
v=J.d(G.aq(z.b,b.a2(0)),this.c6())
if(typeof v!=="number")return H.b(v)
u=w/v
return u==1/0||u==-1/0?0:u}]},
ai:{
"^":"o;aI:a<",
iy:function(a,b,c){return this.a},
cu:function(a){return this.iy(a,null,0)},
lA:function(a,b){var z,y,x,w
for(z=this.a,y=z.length,x=J.D(a),w=0;w<y;++w)z[w]=x.h(a,b+w)},
ce:function(a){var z,y,x
for(z=this.a,y=z.length,x=0;x<y;++x)z[x]=a},
L:function(a){var z,y,x
for(z=this.a,y=z.length,x=0;x<y;++x)z[x]=J.e(a.gaI(),x)},
bT:function(){var z,y,x
for(z=this.a,y=z.length,x=0;x<y;++x)if(isNaN(z[x]))return!0
return!1},
Y:function(){var z,y,x
for(z=this.a,y=z.length,x=0;x<y;++x)if(z[x]!==0)return!1
return!0},
kK:function(a){var z,y,x
for(z=this.a,y=z.length,x=0;x<y;++x)if(z[x]!==a)return!1
return!0},
j:function(a,b){var z,y,x,w,v,u,t
z=G.q(0)
for(y=this.a,x=y.length,w=0;w<x;++w){v=z.a
u=y[w]
t=J.e(b.gaI(),w)
if(typeof t!=="number")return H.b(t)
if(w>=v.length)return H.a(v,w)
v[w]=u+t}return z},
l:function(a,b){var z,y,x,w,v,u,t
z=G.q(0)
for(y=this.a,x=y.length,w=0;w<x;++w){v=z.a
u=y[w]
t=J.e(b.gaI(),w)
if(typeof t!=="number")return H.b(t)
if(w>=v.length)return H.a(v,w)
v[w]=u-t}return z},
i:function(a,b){var z,y,x,w,v,u,t,s,r
z=G.q(0)
if(typeof b==="number")for(y=this.a,x=y.length,w=0;w<x;++w){v=z.a
u=y[w]
if(w>=v.length)return H.a(v,w)
v[w]=u*b}else if(b instanceof G.ai)for(y=this.a,x=y.length,v=b.a,u=v.length,w=0;w<x;++w){t=z.a
s=y[w]
if(w>=u)return H.a(v,w)
r=v[w]
if(w>=t.length)return H.a(t,w)
t[w]=s*r}else $.t.$2(3,"Spectrum or double expected.")
return z},
w:function(a,b){var z,y,x,w,v,u,t,s,r
z=G.q(0)
if(typeof b==="number")for(y=this.a,x=y.length,w=0;w<x;++w){v=z.a
u=y[w]
if(w>=v.length)return H.a(v,w)
v[w]=u/b}else if(b instanceof G.ai)for(y=this.a,x=y.length,v=b.a,u=v.length,w=0;w<x;++w){t=z.a
s=y[w]
if(w>=u)return H.a(v,w)
r=v[w]
if(w>=t.length)return H.a(t,w)
t[w]=s/r}else $.t.$2(3,"Spectrum or double expected.")
return z},
a2:function(a){var z,y,x,w,v,u
z=G.q(0)
for(y=this.a,x=y.length,w=0;w<x;++w){v=z.a
u=y[w]
if(w>=v.length)return H.a(v,w)
v[w]=-u}return z},
b4:function(a,b){var z,y,x
for(z=this.a,y=z.length,x=0;x<y;++x)z[x]=z[x]*b},
H:function(a,b){var z,y,x,w,v
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
v=J.e(b.gaI(),x)
if(typeof v!=="number")return H.b(v)
z[x]=w+v}},
er:function(){var z,y,x,w,v,u
z=G.q(0)
for(y=this.a,x=y.length,w=0;w<x;++w){v=z.a
u=y[w]
u=Math.sqrt(u)
if(w>=v.length)return H.a(v,w)
v[w]=u}return z},
dl:function(){var z,y,x,w,v,u
z=G.q(0)
for(y=this.a,x=y.length,w=0;w<x;++w){v=z.a
u=y[w]
u=Math.exp(u)
if(w>=v.length)return H.a(v,w)
v[w]=u}return z},
v:function(a,b,c){var z,y,x,w,v,u
z=G.q(0)
for(y=this.a,x=y.length,w=0;w<x;++w){v=z.a
u=C.b.v(y[w],b,c)
if(w>=v.length)return H.a(v,w)
v[w]=u}return z},
cl:function(a){return this.v(a,0,1/0)},
K:function(a){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=H.m(z[0])
for(w=1;w<y;++w)x+=" "+H.m(z[w])
return x},
a4:function(a,b){if(!J.i(b,0))C.w.aF(this.a,0,a,b)},
static:{"^":"dg<"}},
tG:{
"^":"z:7;",
$2:function(a,b){return J.K(J.e(a,0),J.e(b,0))}},
tB:{
"^":"z:7;a,b,c",
$2:function(a,b){var z,y,x,w,v
z=this.a
y=z.length
if(b>=y)return H.a(z,b)
x=z[b]
if(typeof x!=="number")return H.b(x)
w=b+1
if(w>=y)return H.a(z,w)
w=J.h(z[w],x)
if(typeof w!=="number")return H.b(w)
w=(a-x)/w
x=this.b
z=this.c+b
y=x.length
if(z<0||z>=y)return H.a(x,z)
v=x[z];++z
if(z>=y)return H.a(x,z)
z=x[z]
return J.c(J.d(v,1-w),J.d(z,w))}},
tC:{
"^":"z:131;a",
$3:function(a,b,c){var z=this.a
z=J.c(z.$2(a,c),z.$2(b,c))
if(typeof z!=="number")return H.b(z)
return 0.5*z}},
cM:{
"^":"o;N:a>,M:b>,cz:c<,A:d>",
pO:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
if(a===this.c)return this
if(a===1){z=G.dR(this.a,this.b,1)
y=this.d
x=y.length
for(w=z.d,v=w.length,u=0,t=0;u<x;t=o,u=s){s=u+1
r=y[u]
u=s+1
if(s>=x)return H.a(y,s)
q=y[s]
s=u+1
if(u>=x)return H.a(y,u)
p=y[u]
o=t+1
if(t>=v)return H.a(w,t)
w[t]=0.212671*r+0.71516*q+0.072169*p}return z}z=G.dR(this.a,this.b,3)
y=this.d
x=y.length
for(w=z.d,v=w.length,u=0,t=0;u<x;t=o,u=s){s=u+1
n=y[u]
o=t+1
if(t>=v)return H.a(w,t)
w[t]=n
t=o+1
if(o>=v)return H.a(w,o)
w[o]=n
o=t+1
if(t>=v)return H.a(w,t)
w[t]=n}return z},
ce:function(a){this.d=J.N(a)
this.a=a.a
this.b=a.b},
h:function(a,b){var z,y,x,w,v
if(J.i(this.c,1)){z=this.d
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]}b=J.d(b,this.c)
z=$.$get$j9().a
y=this.d
x=y.length
if(b>>>0!==b||b>=x)return H.a(y,b)
w=y[b]
v=z.length
if(0>=v)return H.a(z,0)
z[0]=w
w=b+1
if(w>=x)return H.a(y,w)
w=y[w]
if(1>=v)return H.a(z,1)
z[1]=w
w=b+2
if(w>=y.length)return H.a(y,w)
w=y[w]
if(2>=z.length)return H.a(z,2)
z[2]=w
return $.$get$j9()},
k:function(a,b,c){var z,y,x
if(J.i(this.c,1)){z=this.d
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c
return}b=J.d(b,this.c)
z=this.d
y=J.e(c.gaI(),0)
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=y
y=this.d
z=b+1
x=J.e(c.gaI(),1)
if(z>=y.length)return H.a(y,z)
y[z]=x
x=this.d
z=b+2
y=J.e(c.gaI(),2)
if(z>=x.length)return H.a(x,z)
x[z]=y},
static:{dR:function(a,b,c){return new G.cM(a,b,c,new Float32Array(H.k(J.d(J.d(a,b),c))))},j8:function(a){var z=J.C(a)
return new G.cM(z.gN(a),z.gM(a),a.gcz(),new Float32Array(H.n(z.gA(a))))}}},
tR:{
"^":"z:7;a",
$2:function(a,b){var z,y
z=this.a
y=a*a+a+b
if(y<0||y>=z.length)return H.a(z,y)
return z[y]}},
tU:{
"^":"z:130;a,b",
$2:function(a,b){var z,y
z=this.a
y=J.c(this.b,a*a+a+b)
if(y>>>0!==y||y>=z.length)return H.a(z,y)
return z[y]}},
tV:{
"^":"o;a3:b>"},
tX:{
"^":"tV;c,a,b",
j:function(a,b){this.c=J.c(this.c,b)
return this},
K:function(a){return this.a+" | "+this.b+": "+H.m(this.c)},
static:{co:function(a,b){var z=new G.tX(0,a,b)
$.$get$jl().push(z)
return z}}},
bU:{
"^":"ld;"},
fL:{
"^":"o;au:a>,aY:b<,bg:c<,f8:d<",
b9:function(a,b,c,d,e){return this.a.$4(b,c,d,e)}},
b7:{
"^":"o;"},
cc:{
"^":"b7;a",
J:function(a){return this.a},
static:{zE:[function(a,b){return new G.cc(b.kA("value",G.q(1)))},"$2","wU",4,0,31],zD:[function(a,b){return new G.cc(b.ie("value",1))},"$2","wT",4,0,31]}},
cy:{
"^":"fM;a",
cR:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u
this.ho(b.a,c,d)
z=[0]
y=[0]
x=[0]
w=[0]
this.ho(b.a.j(0,b.z.i(0,0.01)),z,y)
v=z[0]
u=c[0]
if(typeof u!=="number")return H.b(u)
e[0]=(v-u)/0.01
u=J.G(J.h(y[0],d[0]),0.01)
f[0]=u
if(J.F(u,0.5)){v=f[0]
if(typeof v!=="number")return H.b(v)
f[0]=1-v}else if(J.K(f[0],-0.5))f[0]=J.M(J.c(f[0],1))
this.ho(b.a.j(0,b.Q.i(0,0.01)),x,w)
v=x[0]
u=c[0]
if(typeof u!=="number")return H.b(u)
g[0]=(v-u)/0.01
u=J.G(J.h(w[0],d[0]),0.01)
h[0]=u
if(J.F(u,0.5)){v=h[0]
if(typeof v!=="number")return H.b(v)
h[0]=1-v}else if(J.K(h[0],-0.5))h[0]=J.M(J.c(h[0],1))},
ho:function(a,b,c){var z,y,x
z=this.a.a1(a)
y=z.w(0,z.E(0))
z=y.gF(y)
x=y.gG(y)
b[0]=(3.141592653589793+Math.atan2(H.v(z),H.v(x)))/6.283185307179586
c[0]=y.gS(y)}},
cB:{
"^":"uk;a",
f4:function(a,b,c,d){var z=this.a
c.L(z.ag(b.z))
d.L(z.ag(b.Q))
return z.a1(b.a)}},
cG:{
"^":"fM;a,b,c,d",
cR:function(a,b,c,d,e,f,g,h){var z,y,x
z=b.a
y=this.a
c[0]=J.c(this.c,G.J(z,y))
x=this.b
d[0]=J.c(this.d,G.J(z,x))
e[0]=G.J(b.z,y)
f[0]=G.J(b.z,x)
g[0]=G.J(b.Q,y)
h[0]=G.J(b.Q,x)}},
cO:{
"^":"fM;a",
cR:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u
this.hT(b.a,c,d)
z=[0]
y=[0]
x=[0]
w=[0]
this.hT(b.a.j(0,b.z.i(0,0.1)),z,y)
v=z[0]
u=c[0]
if(typeof u!=="number")return H.b(u)
e[0]=(v-u)/0.1
u=y[0]
v=d[0]
if(typeof v!=="number")return H.b(v)
v=(u-v)/0.1
f[0]=v
if(v>0.5){v=f[0]
if(typeof v!=="number")return H.b(v)
f[0]=1-v}else if(J.K(f[0],-0.5))f[0]=J.M(J.c(f[0],1))
this.hT(b.a.j(0,b.Q.i(0,0.1)),x,w)
v=x[0]
u=c[0]
if(typeof u!=="number")return H.b(u)
g[0]=(v-u)/0.1
u=w[0]
v=d[0]
if(typeof v!=="number")return H.b(v)
v=(u-v)/0.1
h[0]=v
if(v>0.5){v=h[0]
if(typeof v!=="number")return H.b(v)
h[0]=1-v}else if(J.K(h[0],-0.5))h[0]=J.M(J.c(h[0],1))},
hT:function(a,b,c){var z,y,x,w
z=this.a.a1(a)
y=z.w(0,z.E(0))
x=Math.acos(H.v(C.b.v(y.gS(y),-1,1)))
w=G.eN(y)
b[0]=x*0.3183098861837907
c[0]=w*0.15915494309189535}},
fM:{
"^":"o;"},
uk:{
"^":"o;"},
bd:{
"^":"fM;a,b,c,d",
cR:function(a,b,c,d,e,f,g,h){var z,y,x,w
z=this.a
y=J.w(z)
c[0]=J.c(y.i(z,b.c),this.c)
x=this.b
w=J.w(x)
d[0]=J.c(w.i(x,b.d),this.d)
e[0]=y.i(z,b.ch)
f[0]=w.i(x,b.cx)
g[0]=y.i(z,b.cy)
h[0]=w.i(x,b.db)}},
a6:{
"^":"o;a,b,c,d",
ac:function(a,b){var z,y,x
z=this.c
y=z.dm(a)
if(J.f_(y)===!0)y=this.d.dm(a)
if(J.bE(y)){x=this.b
if(x.O(y))return x.h(0,y)
else{x="Couldn't find spectrum texture named '"+H.m(y)+"' for parameter '"+a+"'"
$.t.$2(1,x)}}return new G.cc(z.a8(a,this.d.a8(a,b)))},
aG:function(a,b){var z,y,x
z=this.c
y=z.dm(a)
if(J.i(y,""))y=this.d.dm(a)
if(!J.i(y,"")){x=this.a
if(x.O(y))return x.h(0,y)
else{x="Couldn't find float texture named '"+H.m(y)+"' for parameter '"+a+"'"
$.t.$2(1,x)}}return new G.cc(z.m(a,this.d.m(a,b)))},
bu:function(a){var z,y
z=this.c.dm(a)
if(J.i(z,""))z=this.d.dm(a)
if(J.i(z,""))return
y=this.a
if(y.O(z))return y.h(0,z)
else{y="Couldn't find float texture named '"+H.m(z)+"' for parameter '"+a+"'"
$.t.$2(1,y)
return}},
ie:function(a,b){return this.c.m(a,this.d.m(a,b))},
cM:function(a,b){return this.c.aO(a,this.d.aO(a,b))},
kB:function(a){return this.cM(a,"")},
eW:function(a,b){return this.c.V(a,this.d.V(a,b))},
kA:function(a,b){return this.c.a8(a,this.d.a8(a,b))},
ap:function(){this.c.ap()
this.d.ap()}},
H:{
"^":"o;f3:a<,an:b<",
L:function(a){this.a=new G.aJ(new Float32Array(H.n(a.gf3().a)))
this.b=new G.aJ(new Float32Array(H.n(a.b.a)))
return this},
B:function(a,b){if(b==null)return!1
return b.gf3().B(0,this.a)&&b.b.B(0,this.b)},
U:function(a,b){var z,y,x
for(z=0;z<16;++z){y=this.a.a
if(z>=y.length)return H.a(y,z)
y=y[z]
x=b.gf3().a
if(z>=x.length)return H.a(x,z)
if(y<x[z])return!0
y=this.a.a
if(z>=y.length)return H.a(y,z)
y=y[z]
x=b.a.a
if(z>=x.length)return H.a(x,z)
if(y>x[z])return!1}return!1},
i:function(a,b){return G.Z(G.db(this.a,b.gf3()),G.db(b.b,this.b))},
qj:function(){var z,y,x,w
z=this.ag(G.B(1,0,0)).a_()
y=this.ag(G.B(0,1,0)).a_()
x=this.ag(G.B(0,0,1)).a_()
if(!(z<0.999||z>1.001))w=y<0.999||y>1.001||x<0.999||x>1.001
else w=!0
return w},
bI:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
if(b==null){b=new G.j(new Float32Array(H.k(3)))
b.C(0,0,0)}z=J.C(a)
y=z.gG(a)
x=z.gF(a)
w=z.gS(a)
z=this.a.a
v=z.length
if(0>=v)return H.a(z,0)
u=z[0]
if(typeof y!=="number")return H.b(y)
if(1>=v)return H.a(z,1)
t=z[1]
if(typeof x!=="number")return H.b(x)
if(2>=v)return H.a(z,2)
s=z[2]
if(typeof w!=="number")return H.b(w)
if(3>=v)return H.a(z,3)
r=z[3]
q=b.a
p=q.length
if(0>=p)return H.a(q,0)
q[0]=u*y+t*x+s*w+r
if(4>=v)return H.a(z,4)
r=z[4]
if(5>=v)return H.a(z,5)
s=z[5]
if(6>=v)return H.a(z,6)
t=z[6]
if(7>=v)return H.a(z,7)
u=z[7]
if(1>=p)return H.a(q,1)
q[1]=r*y+s*x+t*w+u
if(8>=v)return H.a(z,8)
u=z[8]
if(9>=v)return H.a(z,9)
t=z[9]
if(10>=v)return H.a(z,10)
s=z[10]
if(11>=v)return H.a(z,11)
r=z[11]
if(2>=p)return H.a(q,2)
q[2]=u*y+t*x+s*w+r
if(12>=v)return H.a(z,12)
r=z[12]
if(13>=v)return H.a(z,13)
s=z[13]
if(14>=v)return H.a(z,14)
t=z[14]
if(15>=v)return H.a(z,15)
o=r*y+s*x+t*w+z[15]
if(o!==1)b.cq(o)
return b},
a1:function(a){return this.bI(a,null)},
h0:function(a,b){var z,y,x,w,v,u,t,s
if(b==null)b=G.B(0,0,0)
z=J.C(a)
y=z.gG(a)
x=z.gF(a)
w=z.gS(a)
z=this.a.a
v=z.length
if(0>=v)return H.a(z,0)
u=z[0]
if(typeof y!=="number")return H.b(y)
if(1>=v)return H.a(z,1)
t=z[1]
if(typeof x!=="number")return H.b(x)
if(2>=v)return H.a(z,2)
z=z[2]
if(typeof w!=="number")return H.b(w)
v=J.C(b)
v.sG(b,u*y+t*x+z*w)
z=this.a.a
t=z.length
if(4>=t)return H.a(z,4)
u=z[4]
if(5>=t)return H.a(z,5)
s=z[5]
if(6>=t)return H.a(z,6)
v.sF(b,u*y+s*x+z[6]*w)
z=this.a.a
s=z.length
if(8>=s)return H.a(z,8)
u=z[8]
if(9>=s)return H.a(z,9)
t=z[9]
if(10>=s)return H.a(z,10)
v.sS(b,u*y+t*x+z[10]*w)
return b},
ag:function(a){return this.h0(a,null)},
re:function(a,b){var z,y,x,w,v,u,t,s,r,q
b=new G.a1(new Float32Array(H.k(3)))
b.C(0,0,0)
z=J.C(a)
y=z.gG(a)
x=z.gF(a)
w=z.gS(a)
z=this.b.a
v=z.length
if(0>=v)return H.a(z,0)
u=z[0]
if(typeof y!=="number")return H.b(y)
if(4>=v)return H.a(z,4)
t=z[4]
if(typeof x!=="number")return H.b(x)
if(8>=v)return H.a(z,8)
s=z[8]
if(typeof w!=="number")return H.b(w)
r=b.a
q=r.length
if(0>=q)return H.a(r,0)
r[0]=u*y+t*x+s*w
s=z[1]
t=z[5]
if(9>=v)return H.a(z,9)
u=z[9]
if(1>=q)return H.a(r,1)
r[1]=s*y+t*x+u*w
u=z[2]
t=z[6]
if(10>=v)return H.a(z,10)
z=z[10]
if(2>=q)return H.a(r,2)
r[2]=u*y+t*x+z*w
return b},
aQ:function(a){return this.re(a,null)},
rb:function(a,b){var z,y,x,w
b=G.a9(null,null)
z=this.a1(a.gbC())
b.a.L(z)
b.b.L(z)
z=a.b.a
if(0>=z.length)return H.a(z,0)
z=z[0]
y=a.a.a
x=y.length
if(1>=x)return H.a(y,1)
w=y[1]
if(2>=x)return H.a(y,2)
y=y[2]
x=new G.j(new Float32Array(H.k(3)))
x.C(z,w,y)
b.aR(this.a1(x))
x=a.a.a
y=x.length
if(0>=y)return H.a(x,0)
w=x[0]
z=a.b.a
if(1>=z.length)return H.a(z,1)
z=z[1]
if(2>=y)return H.a(x,2)
x=x[2]
y=new G.j(new Float32Array(H.k(3)))
y.C(w,z,x)
b.aR(this.a1(y))
y=a.a.a
x=y.length
if(0>=x)return H.a(y,0)
z=y[0]
if(1>=x)return H.a(y,1)
y=y[1]
x=a.b.a
if(2>=x.length)return H.a(x,2)
x=x[2]
w=new G.j(new Float32Array(H.k(3)))
w.C(z,y,x)
b.aR(this.a1(w))
w=a.a.a
if(0>=w.length)return H.a(w,0)
w=w[0]
x=a.b.a
y=x.length
if(1>=y)return H.a(x,1)
z=x[1]
if(2>=y)return H.a(x,2)
x=x[2]
y=new G.j(new Float32Array(H.k(3)))
y.C(w,z,x)
b.aR(this.a1(y))
y=a.b.a
x=y.length
if(0>=x)return H.a(y,0)
z=y[0]
if(1>=x)return H.a(y,1)
y=y[1]
x=a.a.a
if(2>=x.length)return H.a(x,2)
x=x[2]
w=new G.j(new Float32Array(H.k(3)))
w.C(z,y,x)
b.aR(this.a1(w))
w=a.b.a
x=w.length
if(0>=x)return H.a(w,0)
y=w[0]
z=a.a.a
if(1>=z.length)return H.a(z,1)
z=z[1]
if(2>=x)return H.a(w,2)
w=w[2]
x=new G.j(new Float32Array(H.k(3)))
x.C(y,z,w)
b.aR(this.a1(x))
b.aR(this.a1(a.b))
return b},
eg:function(a){return this.rb(a,null)},
aK:function(a,b){if(b==null)b=G.aO(null,null,0,1/0,0,0)
this.bI(a.gdr(a),b.a)
this.h0(a.b,b.b)
if(b!==a){b.c=a.c
b.d=a.d
b.e=a.e
b.f=a.f}return b},
eh:function(a){return this.aK(a,null)},
fc:function(a,b){this.aK(a,b)
b.r=a.r
this.bI(a.x,b.x)
this.bI(a.y,b.y)
this.h0(a.z,b.z)
this.h0(a.Q,b.Q)
return b},
static:{Z:function(a,b){var z,y
z=a==null
y=z?G.bH():new G.aJ(new Float32Array(H.n(a.a)))
if(b==null)z=z?G.bH():new G.aJ(new Float32Array(H.n(a.a))).fO()
else z=new G.aJ(new Float32Array(H.n(b.a)))
return new G.H(y,z)},aC:function(a){return new G.H(new G.aJ(new Float32Array(H.n(a.gf3().a))),new G.aJ(new Float32Array(H.n(a.b.a))))},cQ:function(a){var z=J.C(a)
return G.Z(G.cg(1,0,0,z.gG(a),0,1,0,z.gF(a),0,0,1,z.gS(a),0,0,0,1),G.cg(1,0,0,J.M(z.gG(a)),0,1,0,J.M(z.gF(a)),0,0,1,J.M(z.gS(a)),0,0,0,1))},eH:function(a,b,c){var z=G.cg(a,0,0,0,0,b,0,0,0,0,c,0,0,0,0,1)
if(typeof a!=="number")return H.b(a)
if(typeof b!=="number")return H.b(b)
if(typeof c!=="number")return H.b(c)
return G.Z(z,G.cg(1/a,0,0,0,0,1/b,0,0,0,0,1/c,0,0,0,0,1))},mt:function(a,b,c){var z,y,x
if(typeof c!=="number")return c.l()
if(typeof b!=="number")return H.b(b)
z=c-b
y=G.cg(1,0,0,0,0,1,0,0,0,0,c/z,-c*b/z,0,0,1,0)
if(typeof a!=="number")return H.b(a)
x=1/Math.tan(H.v(0.017453292519943295*a/2))
return G.eH(x,x,1).i(0,G.Z(y,null))}}},
r:{
"^":"o;A:a>",
gG:function(a){var z=this.a
if(0>=z.length)return H.a(z,0)
return z[0]},
sG:function(a,b){var z=this.a
if(0>=z.length)return H.a(z,0)
z[0]=b
return b},
gF:function(a){var z=this.a
if(1>=z.length)return H.a(z,1)
return z[1]},
sF:function(a,b){var z=this.a
if(1>=z.length)return H.a(z,1)
z[1]=b
return b},
gS:function(a){var z=this.a
if(2>=z.length)return H.a(z,2)
return z[2]},
sS:function(a,b){var z=this.a
if(2>=z.length)return H.a(z,2)
z[2]=b
return b},
L:function(a){var z,y,x,w
z=this.a
y=J.C(a)
x=J.e(y.gA(a),0)
w=z.length
if(0>=w)return H.a(z,0)
z[0]=x
x=J.e(y.gA(a),1)
if(1>=w)return H.a(z,1)
z[1]=x
y=J.e(y.gA(a),2)
if(2>=w)return H.a(z,2)
z[2]=y},
j:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.C(b)
v=J.e(w.gA(b),0)
if(typeof v!=="number")return H.b(v)
if(1>=y)return H.a(z,1)
u=z[1]
t=J.e(w.gA(b),1)
if(typeof t!=="number")return H.b(t)
if(2>=y)return H.a(z,2)
z=z[2]
w=J.e(w.gA(b),2)
if(typeof w!=="number")return H.b(w)
return G.B(x+v,u+t,z+w)},
l:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.C(b)
v=J.e(w.gA(b),0)
if(typeof v!=="number")return H.b(v)
if(1>=y)return H.a(z,1)
u=z[1]
t=J.e(w.gA(b),1)
if(typeof t!=="number")return H.b(t)
if(2>=y)return H.a(z,2)
z=z[2]
w=J.e(w.gA(b),2)
if(typeof w!=="number")return H.b(w)
return G.B(x-v,u-t,z-w)},
i:function(a,b){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof b!=="number")return H.b(b)
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return G.B(x*b,w*b,z[2]*b)},
w:function(a,b){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof b!=="number")return H.b(b)
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return G.B(x/b,w/b,z[2]/b)},
a2:function(a){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return G.B(-x,-w,-z[2])},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c
return c},
a_:function(){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
return x*x+w*w+z*z},
E:[function(a){return Math.sqrt(H.v(this.a_()))},"$0","gn",0,0,6],
b4:function(a,b){var z,y,x
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof b!=="number")return H.b(b)
z[0]=x*b
if(1>=y)return H.a(z,1)
z[1]=z[1]*b
if(2>=y)return H.a(z,2)
z[2]=z[2]*b
return this},
cq:function(a){var z,y,x
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof a!=="number")return H.b(a)
z[0]=x/a
if(1>=y)return H.a(z,1)
z[1]=z[1]/a
if(2>=y)return H.a(z,2)
z[2]=z[2]/a
return this},
H:function(a,b){var z,y,x,w,v
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.C(b)
v=J.e(w.gA(b),0)
if(typeof v!=="number")return H.b(v)
z[0]=x+v
if(1>=y)return H.a(z,1)
v=z[1]
x=J.e(w.gA(b),1)
if(typeof x!=="number")return H.b(x)
z[1]=v+x
if(2>=y)return H.a(z,2)
y=z[2]
w=J.e(w.gA(b),2)
if(typeof w!=="number")return H.b(w)
z[2]=y+w
return this},
K:function(a){var z,y,x
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=H.m(z[0])+" "
if(1>=y)return H.a(z,1)
x=x+H.m(z[1])+" "
if(2>=y)return H.a(z,2)
return x+H.m(z[2])},
bT:function(){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
if(!isNaN(z[0])){if(1>=y)return H.a(z,1)
if(!isNaN(z[1])){if(2>=y)return H.a(z,2)
z=isNaN(z[2])}else z=!0}else z=!0
return z},
C:function(a,b,c){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=a
if(1>=y)return H.a(z,1)
z[1]=b
if(2>=y)return H.a(z,2)
z[2]=c},
static:{B:function(a,b,c){var z=new G.r(new Float32Array(H.k(3)))
z.C(a,b,c)
return z},eM:function(a){var z=J.C(a)
z=J.d(J.e(z.gA(a),2),J.e(z.gA(a),2))
if(typeof z!=="number")return H.b(z)
return P.I(0,1-z)},jK:function(a){var z=Math.sqrt(H.v(G.eM(a)))
if(z===0)return 1
return J.a4(J.G(J.e(J.N(a),0),z),-1,1)},jL:function(a){var z=Math.sqrt(H.v(G.eM(a)))
if(z===0)return 0
return J.a4(J.G(J.e(J.N(a),1),z),-1,1)},J:function(a,b){var z,y
z=J.C(a)
y=J.C(b)
return J.c(J.c(J.d(J.e(z.gA(a),0),J.e(y.gA(b),0)),J.d(J.e(z.gA(a),1),J.e(y.gA(b),1))),J.d(J.e(z.gA(a),2),J.e(y.gA(b),2)))},aq:function(a,b){var z,y
z=J.C(a)
y=J.C(b)
return J.af(J.c(J.c(J.d(J.e(z.gA(a),0),J.e(y.gA(b),0)),J.d(J.e(z.gA(a),1),J.e(y.gA(b),1))),J.d(J.e(z.gA(a),2),J.e(y.gA(b),2))))},aF:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=J.C(a)
y=J.e(z.gA(a),0)
x=J.e(z.gA(a),1)
w=J.e(z.gA(a),2)
z=J.C(b)
v=J.e(z.gA(b),0)
u=J.e(z.gA(b),1)
t=J.e(z.gA(b),2)
z=J.w(x)
s=J.w(w)
r=J.h(z.i(x,t),s.i(w,u))
q=J.w(y)
s=J.h(s.i(w,v),q.i(y,t))
z=J.h(q.i(y,u),z.i(x,v))
q=new Float32Array(3)
if(0>=3)return H.a(q,0)
q[0]=r
if(1>=3)return H.a(q,1)
q[1]=s
if(2>=3)return H.a(q,2)
q[2]=z
return new G.r(q)},eN:function(a){var z,y,x
z=J.C(a)
y=z.gF(a)
z=z.gG(a)
x=Math.atan2(H.v(y),H.v(z))
return x<0?x+6.283185307179586:x},cS:function(a,b,c){var z,y,x
z=J.C(a)
if(J.F(J.af(z.gG(a)),J.af(z.gF(a)))){y=J.c(J.d(J.e(z.gA(a),0),J.e(z.gA(a),0)),J.d(J.e(z.gA(a),2),J.e(z.gA(a),2)))
if(typeof y!=="number")H.T(H.Y(y))
x=1/Math.sqrt(y)
y=J.C(b)
J.u(y.gA(b),0,J.d(J.M(J.e(z.gA(a),2)),x))
J.u(y.gA(b),1,0)
J.u(y.gA(b),2,J.d(J.e(z.gA(a),0),x))}else{y=J.c(J.d(J.e(z.gA(a),1),J.e(z.gA(a),1)),J.d(J.e(z.gA(a),2),J.e(z.gA(a),2)))
if(typeof y!=="number")H.T(H.Y(y))
x=1/Math.sqrt(y)
y=J.C(b)
J.u(y.gA(b),0,0)
J.u(y.gA(b),1,J.d(J.e(z.gA(a),2),x))
J.u(y.gA(b),2,J.d(J.M(J.e(z.gA(a),1)),x))}c.L(G.aF(a,b))},fZ:function(a,b){var z,y,x,w,v
if(J.K(G.J(a,b),0)){z=J.C(a)
y=J.M(J.e(z.gA(a),0))
x=J.M(J.e(z.gA(a),1))
z=J.M(J.e(z.gA(a),2))
w=new Float32Array(3)
v=new G.r(w)
if(0>=3)return H.a(w,0)
w[0]=y
if(1>=3)return H.a(w,1)
w[1]=x
if(2>=3)return H.a(w,2)
w[2]=z
z=v}else z=a
return z}}},
o6:{
"^":"jN;a,b",
aA:function(){return this.b},
b7:function(a,b,c){var z,y,x,w,v
z=J.aQ(b)
z.k(b,0,1/0)
c[0]=-1/0
y=[0]
x=[0]
for(w=this.a,v=0;v<w.length;++v)if(w[v].b7(a,y,x)){z.k(b,0,P.X(z.h(b,0),y[0]))
c[0]=P.I(c[0],x[0])}return J.K(z.h(b,0),c[0])},
eq:function(a,b,c){var z,y,x
z=G.q(0)
for(y=this.a,x=0;x<y.length;++x)z=z.j(0,y[x].eq(a,b,c))
return z},
ex:function(a,b,c){var z,y,x
z=G.q(0)
for(y=this.a,x=0;x<y.length;++x)z=z.j(0,y[x].ex(a,b,c))
return z},
b9:[function(a,b,c,d,e){var z,y,x,w,v,u
for(z=this.a,y=0,x=0,w=0;w<z.length;++w){v=z[w].eq(b,c,e).aC()
x+=v
if(w>=z.length)return H.a(z,w)
u=J.nY(z[w],b,c,d,e)
if(typeof u!=="number")return H.b(u)
y+=v*u}return y/x},"$4","gau",8,0,12],
cZ:function(a,b,c){var z,y,x
z=G.q(0)
for(y=this.a,x=0;x<y.length;++x)z=z.j(0,y[x].cZ(a,b,c))
return z},
lQ:function(a){var z,y,x,w
for(z=this.a,y=0;y<z.length;++y){x=this.b
w=z[y].aA()
this.b=new G.ax(new G.j(new Float32Array(H.n(x.a.a))),new G.j(new Float32Array(H.n(x.b.a)))).bk(w)}},
static:{o7:function(a){var z=new G.o6(a,G.a9(null,null))
z.lQ(a)
return z}}},
kL:{
"^":"jN;",
eq:function(a,b,c){return this.b.i(0,this.fL(this.e.a1(a)))},
ex:function(a,b,c){return this.c.i(0,this.fL(this.e.a1(a)))},
b9:[function(a,b,c,d,e){return G.lM(c,d,this.d)},"$4","gau",8,0,12],
cZ:function(a,b,c){var z,y,x,w,v,u,t,s,r
z=[0]
y=[0]
x=J.nW(a.b)
if(J.i(x,0))return G.q(0)
w=G.aO(a.a,J.G(a.b,x),J.d(a.c,x),J.d(a.d,x),a.e,0)
if(!this.b7(w,z,y))return G.q(0)
v=G.q(0)
u=J.c(z[0],J.d(c,b))
z[0]=u
for(t=this.a,s=this.b,r=this.e;J.K(u,y[0]);){u=z[0]
u=new Float32Array(H.n(w.a.j(0,J.d(w.b,u)).a))
J.M(w.b)
v=v.j(0,t.j(0,s).i(0,this.fL(r.a1(new G.j(u)))))
u=J.c(z[0],b)
z[0]=u}return v.i(0,b)}},
jN:{
"^":"o;"},
mR:{
"^":"ld;"},
bC:{
"^":"ai;a",
gG:function(a){var z=this.a
if(0>=z.length)return H.a(z,0)
return z[0]},
sG:function(a,b){var z=this.a
if(0>=z.length)return H.a(z,0)
z[0]=b
return b},
gF:function(a){var z=this.a
if(1>=z.length)return H.a(z,1)
return z[1]},
sF:function(a,b){var z=this.a
if(1>=z.length)return H.a(z,1)
z[1]=b
return b},
gS:function(a){var z=this.a
if(2>=z.length)return H.a(z,2)
return z[2]},
sS:function(a,b){var z=this.a
if(2>=z.length)return H.a(z,2)
z[2]=b
return b},
aC:function(){var z=this.a
if(1>=z.length)return H.a(z,1)
return z[1]},
h_:function(){return G.fC(this)},
ef:function(){return this},
bN:function(a,b,c){var z,y,x,w
z=new G.bt(new Float32Array(H.k(3)))
z.a4(3,0)
z=z.bN(a,b,c).a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
G.fJ(x,w,z[2],this.a)
return this},
fm:function(a,b){return this.bN(a,b,0)},
d4:function(a,b,c,d){G.fJ(a,b,c,this.a)
return this},
cB:function(a,b,c){return this.d4(a,b,c,0)},
j:function(a,b){var z,y,x,w,v,u
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.e(b.gaI(),0)
if(typeof w!=="number")return H.b(w)
if(1>=y)return H.a(z,1)
v=z[1]
u=J.e(b.gaI(),1)
if(typeof u!=="number")return H.b(u)
if(2>=y)return H.a(z,2)
z=z[2]
y=J.e(b.gaI(),2)
if(typeof y!=="number")return H.b(y)
return G.dW(x+w,v+u,z+y)},
l:function(a,b){var z,y,x,w,v,u
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.e(b.gaI(),0)
if(typeof w!=="number")return H.b(w)
if(1>=y)return H.a(z,1)
v=z[1]
u=J.e(b.gaI(),1)
if(typeof u!=="number")return H.b(u)
if(2>=y)return H.a(z,2)
z=z[2]
y=J.e(b.gaI(),2)
if(typeof y!=="number")return H.b(y)
return G.dW(x-w,v-u,z-y)},
i:function(a,b){var z,y,x,w,v,u,t,s
if(typeof b==="number"){z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return G.dW(x*b,w*b,z[2]*b)}if(b instanceof G.bC){z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=b.a
v=w.length
if(0>=v)return H.a(w,0)
u=w[0]
if(1>=y)return H.a(z,1)
t=z[1]
if(1>=v)return H.a(w,1)
s=w[1]
if(2>=y)return H.a(z,2)
z=z[2]
if(2>=v)return H.a(w,2)
return G.dW(x*u,t*s,z*w[2])}$.t.$2(3,"XYZColor or double expected.")
z=new G.bC(new Float32Array(H.k(3)))
z.a4(3,0)
return z},
w:function(a,b){var z,y,x,w,v,u,t,s
if(typeof b==="number"){z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return G.dW(x/b,w/b,z[2]/b)}if(b instanceof G.bC){z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=b.a
v=w.length
if(0>=v)return H.a(w,0)
u=w[0]
if(1>=y)return H.a(z,1)
t=z[1]
if(1>=v)return H.a(w,1)
s=w[1]
if(2>=y)return H.a(z,2)
z=z[2]
if(2>=v)return H.a(w,2)
return G.dW(x/u,t/s,z/w[2])}$.t.$2(3,"XYZColor or double expected.")
z=new G.bC(new Float32Array(H.k(3)))
z.a4(3,0)
return z},
n2:function(a){var z,y,x,w,v
z=J.O(a)
if(!!z.$isbt){z=a.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
G.fJ(x,w,z[2],this.a)}else if(!!z.$isbC){z=this.a
y=a.a
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
v=z.length
if(0>=v)return H.a(z,0)
z[0]=w
if(1>=x)return H.a(y,1)
w=y[1]
if(1>=v)return H.a(z,1)
z[1]=w
if(2>=x)return H.a(y,2)
y=y[2]
if(2>=v)return H.a(z,2)
z[2]=y}else if(!!z.$isah){z=this.a
y=a.ef().a
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
v=z.length
if(0>=v)return H.a(z,0)
z[0]=w
if(1>=x)return H.a(y,1)
w=y[1]
if(1>=v)return H.a(z,1)
z[1]=w
if(2>=x)return H.a(y,2)
y=y[2]
if(2>=v)return H.a(z,2)
z[2]=y}},
n3:function(a,b,c){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=a
if(1>=y)return H.a(z,1)
z[1]=b
if(2>=y)return H.a(z,2)
z[2]=c},
static:{dW:function(a,b,c){var z=new G.bC(new Float32Array(H.k(3)))
z.a4(3,0)
z.n3(a,b,c)
return z},mS:function(a){var z=new G.bC(new Float32Array(H.k(3)))
z.a4(3,0)
z.n2(a)
return z}}}}],["","",,H,{
"^":"",
ce:function(){return new P.aY("No element")},
li:function(){return new P.aY("Too few elements")},
eD:function(a,b,c,d){if(c-b<=32)H.mg(a,b,c,d)
else H.mf(a,b,c,d)},
mg:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.D(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.F(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.k(a,w,y.h(a,v))
w=v}y.k(a,w,x)}},
mf:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.a.al(c-b+1,6)
y=b+z
x=c-z
w=C.a.al(b+c,2)
v=w-z
u=w+z
t=J.D(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.F(d.$2(s,r),0)){n=r
r=s
s=n}if(J.F(d.$2(p,o),0)){n=o
o=p
p=n}if(J.F(d.$2(s,q),0)){n=q
q=s
s=n}if(J.F(d.$2(r,q),0)){n=q
q=r
r=n}if(J.F(d.$2(s,p),0)){n=p
p=s
s=n}if(J.F(d.$2(q,p),0)){n=p
p=q
q=n}if(J.F(d.$2(r,o),0)){n=o
o=r
r=n}if(J.F(d.$2(r,q),0)){n=q
q=r
r=n}if(J.F(d.$2(p,o),0)){n=o
o=p
p=n}t.k(a,y,s)
t.k(a,w,q)
t.k(a,x,o)
t.k(a,v,t.h(a,b))
t.k(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.i(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.O(i)
if(h.B(i,0))continue
if(h.U(i,0)){if(k!==m){t.k(a,k,t.h(a,m))
t.k(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.y(i)
if(h.a0(i,0)){--l
continue}else{g=l-1
if(h.U(i,0)){t.k(a,k,t.h(a,m))
f=m+1
t.k(a,m,t.h(a,l))
t.k(a,l,j)
l=g
m=f
break}else{t.k(a,k,t.h(a,l))
t.k(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(J.K(d.$2(j,r),0)){if(k!==m){t.k(a,k,t.h(a,m))
t.k(a,m,j)}++m}else if(J.F(d.$2(j,p),0))for(;!0;)if(J.F(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.K(d.$2(t.h(a,l),r),0)){t.k(a,k,t.h(a,m))
f=m+1
t.k(a,m,t.h(a,l))
t.k(a,l,j)
m=f}else{t.k(a,k,t.h(a,l))
t.k(a,l,j)}l=g
break}}e=!1}h=m-1
t.k(a,b,t.h(a,h))
t.k(a,h,r)
h=l+1
t.k(a,c,t.h(a,h))
t.k(a,h,p)
H.eD(a,b,m-2,d)
H.eD(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.i(d.$2(t.h(a,m),r),0);)++m
for(;J.i(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.i(d.$2(j,r),0)){if(k!==m){t.k(a,k,t.h(a,m))
t.k(a,m,j)}++m}else if(J.i(d.$2(j,p),0))for(;!0;)if(J.i(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.K(d.$2(t.h(a,l),r),0)){t.k(a,k,t.h(a,m))
f=m+1
t.k(a,m,t.h(a,l))
t.k(a,l,j)
m=f}else{t.k(a,k,t.h(a,l))
t.k(a,l,j)}l=g
break}}H.eD(a,m,l,d)}else H.eD(a,m,l,d)},
ug:function(a){return a.grG()},
ec:{
"^":"mK;a",
gn:function(a){return this.a.length},
h:function(a,b){return C.i.bS(this.a,b)},
E:function(a){return this.gn(this).$0()},
$asmK:function(){return[P.x]},
$asda:function(){return[P.x]},
$asE:function(){return[P.x]}},
dG:{
"^":"b1;",
gax:function(a){return new H.lr(this,this.gn(this),0,null)},
b1:function(a,b){var z,y
z=this.gn(this)
for(y=0;y<z;++y){b.$1(this.bh(0,y))
if(z!==this.gn(this))throw H.l(new P.bg(this))}},
ga6:function(a){return this.gn(this)===0},
gat:function(a){if(this.gn(this)===0)throw H.l(H.ce())
return this.bh(0,0)},
e6:function(a,b){return H.p(new H.iu(this,b),[null,null])},
bO:function(a,b){return H.fK(this,b,null,H.aR(this,"dG",0))},
d_:function(a,b){var z,y,x
if(b){z=H.p([],[H.aR(this,"dG",0)])
C.c.sn(z,this.gn(this))}else z=H.p(Array(this.gn(this)),[H.aR(this,"dG",0)])
for(y=0;y<this.gn(this);++y){x=this.bh(0,y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
cu:function(a){return this.d_(a,!0)},
E:function(a){return this.gn(this).$0()},
$isab:1},
ue:{
"^":"dG;a,b,c",
gnJ:function(){var z=J.a0(this.a)
return z},
gpk:function(){var z,y
z=J.a0(this.a)
y=this.b
if(J.F(y,z))return z
return y},
gn:function(a){var z,y
z=J.a0(this.a)
y=this.b
if(J.a7(y,z))return 0
if(typeof y!=="number")return H.b(y)
return z-y},
bh:function(a,b){var z=J.c(this.gpk(),b)
if(J.K(b,0)||J.a7(z,this.gnJ()))throw H.l(P.d6(b,this,"index",null,null))
return J.ko(this.a,z)},
bO:function(a,b){var z
if(J.K(b,0))H.T(P.aA(b,0,null,"count",null))
z=J.c(this.b,b)
return H.fK(this.a,z,this.c,H.aV(this,0))},
d_:function(a,b){var z,y,x,w,v,u,t,s
z=this.b
y=this.a
x=J.D(y)
w=x.gn(y)
if(typeof z!=="number")return H.b(z)
v=w-z
if(v<0)v=0
if(b){u=H.p([],[H.aV(this,0)])
C.c.sn(u,v)}else u=H.p(Array(v),[H.aV(this,0)])
for(t=0;t<v;++t){s=x.bh(y,z+t)
if(t>=u.length)return H.a(u,t)
u[t]=s
if(x.gn(y)<w)throw H.l(new P.bg(this))}return u},
mS:function(a,b,c,d){var z=this.b
if(J.K(z,0))H.T(P.aA(z,0,null,"start",null))},
E:function(a){return this.gn(this).$0()},
static:{fK:function(a,b,c,d){var z=H.p(new H.ue(a,b,c),[d])
z.mS(a,b,c,d)
return z}}},
lr:{
"^":"o;a,b,c,d",
gas:function(){return this.d},
a9:function(){var z,y,x,w
z=this.a
y=J.D(z)
x=y.gn(z)
if(this.b!==x)throw H.l(new P.bg(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.bh(z,w);++this.c
return!0}},
lx:{
"^":"b1;a,b",
gax:function(a){var z=new H.qO(null,J.cs(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gn:function(a){return J.a0(this.a)},
ga6:function(a){return J.f_(this.a)},
gat:function(a){return this.da(J.nT(this.a))},
da:function(a){return this.b.$1(a)},
E:function(a){return this.gn(this).$0()},
$asb1:function(a,b){return[b]},
static:{fn:function(a,b,c,d){if(!!J.O(a).$isab)return H.p(new H.kS(a,b),[c,d])
return H.p(new H.lx(a,b),[c,d])}}},
kS:{
"^":"lx;a,b",
$isab:1},
qO:{
"^":"id;a,b,c",
a9:function(){var z=this.b
if(z.a9()){this.a=this.da(z.gas())
return!0}this.a=null
return!1},
gas:function(){return this.a},
da:function(a){return this.c.$1(a)}},
iu:{
"^":"dG;a,b",
gn:function(a){return J.a0(this.a)},
bh:function(a,b){return this.da(J.ko(this.a,b))},
da:function(a){return this.b.$1(a)},
E:function(a){return this.gn(this).$0()},
$asdG:function(a,b){return[b]},
$asb1:function(a,b){return[b]},
$isab:1},
uX:{
"^":"b1;a,b",
gax:function(a){var z=new H.uY(J.cs(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
uY:{
"^":"id;a,b",
a9:function(){for(var z=this.a;z.a9();)if(this.da(z.gas())===!0)return!0
return!1},
gas:function(){return this.a.gas()},
da:function(a){return this.b.$1(a)}},
mb:{
"^":"b1;a,b",
bO:function(a,b){var z,y
z=this.b
if(typeof z!=="number"||Math.floor(z)!==z)throw H.l(P.ea(z,"count is not an integer",null))
y=J.y(z)
if(y.U(z,0))H.T(P.aA(z,0,null,"count",null))
return H.mc(this.a,y.j(z,b),H.aV(this,0))},
gax:function(a){var z=new H.tz(J.cs(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
iY:function(a,b,c){var z=this.b
if(typeof z!=="number"||Math.floor(z)!==z)throw H.l(P.ea(z,"count is not an integer",null))
if(J.K(z,0))H.T(P.aA(z,0,null,"count",null))},
static:{md:function(a,b,c){var z
if(!!J.O(a).$isab){z=H.p(new H.oR(a,b),[c])
z.iY(a,b,c)
return z}return H.mc(a,b,c)},mc:function(a,b,c){var z=H.p(new H.mb(a,b),[c])
z.iY(a,b,c)
return z}}},
oR:{
"^":"mb;a,b",
gn:function(a){var z=J.h(J.a0(this.a),this.b)
if(J.a7(z,0))return z
return 0},
E:function(a){return this.gn(this).$0()},
$isab:1},
tz:{
"^":"id;a,b",
a9:function(){var z,y,x
z=this.a
y=0
while(!0){x=this.b
if(typeof x!=="number")return H.b(x)
if(!(y<x))break
z.a9();++y}this.b=0
return z.a9()},
gas:function(){return this.a.gas()}},
l1:{
"^":"o;",
sn:function(a,b){throw H.l(new P.ae("Cannot change the length of a fixed-length list"))},
H:function(a,b){throw H.l(new P.ae("Cannot add to a fixed-length list"))},
bU:function(a,b,c){throw H.l(new P.ae("Cannot add to a fixed-length list"))}},
uE:{
"^":"o;",
k:function(a,b,c){throw H.l(new P.ae("Cannot modify an unmodifiable list"))},
sn:function(a,b){throw H.l(new P.ae("Cannot change the length of an unmodifiable list"))},
H:function(a,b){throw H.l(new P.ae("Cannot add to an unmodifiable list"))},
bU:function(a,b,c){throw H.l(new P.ae("Cannot add to an unmodifiable list"))},
aH:function(a,b,c,d,e){throw H.l(new P.ae("Cannot modify an unmodifiable list"))},
aF:function(a,b,c,d){throw H.l(new P.ae("Cannot modify an unmodifiable list"))},
$isE:1,
$asE:null,
$isab:1},
mK:{
"^":"da+uE;",
$isE:1,
$asE:null,
$isab:1}}],["","",,H,{
"^":"",
nx:function(a){var z=H.p(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
v4:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.wG()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.e5(new P.v6(z),1)).observe(y,{childList:true})
return new P.v5(z,y,x)}else if(self.setImmediate!=null)return P.wH()
return P.wI()},
CU:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.e5(new P.v7(a),0))},"$1","wG",2,0,14],
CV:[function(a){++init.globalState.f.b
self.setImmediate(H.e5(new P.v8(a),0))},"$1","wH",2,0,14],
CW:[function(a){P.jr(C.a1,a)},"$1","wI",2,0,14],
k9:function(a,b){var z=H.eX()
z=H.dq(z,[z,z]).dd(a)
if(z){b.toString
return a}else{b.toString
return a}},
pm:function(a,b){var z,y,x,w,v
try{z=a.$0()
w=new P.a2(0,$.Q,null)
w.$builtinTypeInfo=[b]
w.d8(z)
return w}catch(v){w=H.ap(v)
y=w
x=H.b4(v)
return P.pl(y,x,b)}},
pn:function(a,b){var z=H.p(new P.a2(0,$.Q,null),[b])
z.d8(a)
return z},
pl:function(a,b,c){var z
a=a!=null?a:new P.iG()
z=$.Q
if(z!==C.h)z.toString
z=H.p(new P.a2(0,z,null),[c])
z.hh(a,b)
return z},
fc:function(a,b,c){var z,y,x,w,v,u
z={}
y=H.p(new P.a2(0,$.Q,null),[P.E])
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.pp(z,c,b,y)
for(w=a.length,v=0;v<a.length;a.length===w||(0,H.aw)(a),++v)a[v].ec(new P.po(z,c,b,y,z.b++),x)
x=z.b
if(x===0){z=H.p(new P.a2(0,$.Q,null),[null])
z.d8(C.eF)
return z}u=Array(x)
u.fixed$length=Array
z.a=u
return y},
ws:function(a,b,c){$.Q.toString
a.bw(b,c)},
ww:function(){var z,y
for(;z=$.dl,z!=null;){$.e3=null
y=z.ge8()
$.dl=y
if(y==null)$.e2=null
$.Q=z.grs()
z.pD()}},
Da:[function(){$.k7=!0
try{P.ww()}finally{$.Q=C.h
$.e3=null
$.k7=!1
if($.dl!=null)$.$get$jR().$1(P.nt())}},"$0","nt",0,0,3],
np:function(a){if($.dl==null){$.e2=a
$.dl=a
if(!$.k7)$.$get$jR().$1(P.nt())}else{$.e2.c=a
$.e2=a}},
nH:function(a){var z,y
z=$.Q
if(C.h===z){P.dn(null,null,C.h,a)
return}z.toString
if(C.h.gi3()===z){P.dn(null,null,z,a)
return}y=$.Q
P.dn(null,null,y,y.hV(a,!0))},
u_:function(a,b,c,d,e,f){return e?H.p(new P.wg(b,c,d,a,null,0,null),[f]):H.p(new P.v9(b,c,d,a,null,0,null),[f])},
ka:function(a){var z,y,x,w,v
if(a==null)return
try{z=a.$0()
if(!!J.O(z).$isbq)return z
return}catch(w){v=H.ap(w)
y=v
x=H.b4(w)
v=$.Q
v.toString
P.dm(null,null,v,y,x)}},
wx:[function(a,b){var z=$.Q
z.toString
P.dm(null,null,z,a,b)},function(a){return P.wx(a,null)},"$2","$1","wK",2,2,16,0],
Db:[function(){},"$0","wJ",0,0,3],
wz:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.ap(u)
z=t
y=H.b4(u)
$.Q.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.c9(x)
w=t
v=x.gcg()
c.$2(w,v)}}},
wn:function(a,b,c,d){var z=a.eN()
if(!!J.O(z).$isbq)z.ek(new P.wq(b,c,d))
else b.bw(c,d)},
wo:function(a,b){return new P.wp(a,b)},
nj:function(a,b,c){var z=a.eN()
if(!!J.O(z).$isbq)z.ek(new P.wr(b,c))
else b.dC(c)},
wm:function(a,b,c){$.Q.toString
a.he(b,c)},
uw:function(a,b){var z=$.Q
if(z===C.h){z.toString
return P.jr(a,b)}return P.jr(a,z.hV(b,!0))},
jr:function(a,b){var z=C.b.al(a.a,1000)
return H.ut(z<0?0:z,b)},
jQ:function(a){var z=$.Q
$.Q=a
return z},
dm:function(a,b,c,d,e){var z,y,x
z=new P.mT(new P.wy(d,e),C.h,null)
y=$.dl
if(y==null){P.np(z)
$.e3=$.e2}else{x=$.e3
if(x==null){z.c=y
$.e3=z
$.dl=z}else{z.c=x.c
x.c=z
$.e3=z
if(z.c==null)$.e2=z}}},
nm:function(a,b,c,d){var z,y
if($.Q===c)return d.$0()
z=P.jQ(c)
try{y=d.$0()
return y}finally{$.Q=z}},
no:function(a,b,c,d,e){var z,y
if($.Q===c)return d.$1(e)
z=P.jQ(c)
try{y=d.$1(e)
return y}finally{$.Q=z}},
nn:function(a,b,c,d,e,f){var z,y
if($.Q===c)return d.$2(e,f)
z=P.jQ(c)
try{y=d.$2(e,f)
return y}finally{$.Q=z}},
dn:function(a,b,c,d){var z=C.h!==c
if(z){d=c.hV(d,!(!z||C.h.gi3()===c))
c=C.h}P.np(new P.mT(d,c,null))},
v6:{
"^":"z:0;a",
$1:function(a){var z,y
H.hh()
z=this.a
y=z.a
z.a=null
y.$0()}},
v5:{
"^":"z:128;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
v7:{
"^":"z:1;a",
$0:function(){H.hh()
this.a.$0()}},
v8:{
"^":"z:1;a",
$0:function(){H.hh()
this.a.$0()}},
wi:{
"^":"d0;a,b",
K:function(a){var z,y
z="Uncaught Error: "+H.m(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.m(y)):z},
static:{wj:function(a,b){if(b!=null)return b
if(!!J.O(a).$isb9)return a.gcg()
return}}},
bq:{
"^":"o;"},
pp:{
"^":"z:127;a,b,c,d",
$2:function(a,b){var z,y
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.b)this.d.bw(a,b)
else{z.c=a
z.d=b}}else if(y===0&&!this.b)this.d.bw(z.c,z.d)}},
po:{
"^":"z:126;a,b,c,d,e",
$1:function(a){var z,y,x
z=this.a
y=--z.b
x=z.a
if(x!=null){z=this.e
if(z<0||z>=x.length)return H.a(x,z)
x[z]=a
if(y===0)this.d.hm(x)}else if(z.b===0&&!this.b)this.d.bw(z.c,z.d)}},
vh:{
"^":"o;kC:a<",
pK:[function(a,b){a=a!=null?a:new P.iG()
if(this.a.a!==0)throw H.l(new P.aY("Future already completed"))
$.Q.toString
this.bw(a,b)},function(a){return this.pK(a,null)},"c8","$2","$1","gkq",2,2,125,0]},
al:{
"^":"vh;a",
aB:function(a,b){var z=this.a
if(z.a!==0)throw H.l(new P.aY("Future already completed"))
z.d8(b)},
aM:function(a){return this.aB(a,null)},
bw:function(a,b){this.a.hh(a,b)}},
dj:{
"^":"o;jM:a<,r_:b>,c,d,e",
gdR:function(){return this.b.b},
gkD:function(){return(this.c&1)!==0},
gqi:function(){return this.c===6},
gqh:function(){return this.c===8},
gos:function(){return this.d},
gpp:function(){return this.d}},
a2:{
"^":"o;fF:a?,dR:b<,c",
gnZ:function(){return this.a===8},
so8:function(a){if(a)this.a=2
else this.a=0},
ec:function(a,b){var z,y
z=H.p(new P.a2(0,$.Q,null),[null])
y=z.b
if(y!==C.h){y.toString
if(b!=null)b=P.k9(b,y)}this.fp(new P.dj(null,z,b==null?1:3,a,b))
return z},
ai:function(a){return this.ec(a,null)},
pE:function(a,b){var z,y
z=H.p(new P.a2(0,$.Q,null),[null])
y=z.b
if(y!==C.h)a=P.k9(a,y)
this.fp(new P.dj(null,z,2,b,a))
return z},
dV:function(a){return this.pE(a,null)},
ek:function(a){var z,y
z=$.Q
y=new P.a2(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.h)z.toString
this.fp(new P.dj(null,y,8,a,null))
return y},
hF:function(){if(this.a!==0)throw H.l(new P.aY("Future already completed"))
this.a=1},
gpo:function(){return this.c},
geD:function(){return this.c},
k5:function(a){this.a=4
this.c=a},
k_:function(a){this.a=8
this.c=a},
ph:function(a,b){this.k_(new P.d0(a,b))},
fp:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.dn(null,null,z,new P.vt(this,a))}else{a.a=this.c
this.c=a}},
fE:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gjM()
z.a=y}return y},
dC:function(a){var z,y
z=J.O(a)
if(!!z.$isbq)if(!!z.$isa2)P.h5(a,this)
else P.jV(a,this)
else{y=this.fE()
this.k5(a)
P.cU(this,y)}},
hm:function(a){var z=this.fE()
this.k5(a)
P.cU(this,z)},
bw:[function(a,b){var z=this.fE()
this.k_(new P.d0(a,b))
P.cU(this,z)},function(a){return this.bw(a,null)},"ru","$2","$1","geA",2,2,16,0],
d8:function(a){var z
if(a==null);else{z=J.O(a)
if(!!z.$isbq){if(!!z.$isa2){z=a.a
if(z>=4&&z===8){this.hF()
z=this.b
z.toString
P.dn(null,null,z,new P.vv(this,a))}else P.h5(a,this)}else P.jV(a,this)
return}}this.hF()
z=this.b
z.toString
P.dn(null,null,z,new P.vw(this,a))},
hh:function(a,b){var z
this.hF()
z=this.b
z.toString
P.dn(null,null,z,new P.vu(this,a,b))},
$isbq:1,
static:{jV:function(a,b){var z,y,x,w
b.sfF(2)
try{a.ec(new P.vx(b),new P.vy(b))}catch(x){w=H.ap(x)
z=w
y=H.b4(x)
P.nH(new P.vz(b,z,y))}},h5:function(a,b){var z
b.a=2
z=new P.dj(null,b,0,null,null)
if(a.a>=4)P.cU(a,z)
else a.fp(z)},cU:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gnZ()
if(b==null){if(w){v=z.a.geD()
y=z.a.gdR()
x=J.c9(v)
u=v.gcg()
y.toString
P.dm(null,null,y,x,u)}return}for(;b.gjM()!=null;b=t){t=b.a
b.a=null
P.cU(z.a,b)}x.a=!0
s=w?null:z.a.gpo()
x.b=s
x.c=!1
y=!w
if(!y||b.gkD()||b.c===8){r=b.gdR()
if(w){u=z.a.gdR()
u.toString
if(u==null?r!=null:u!==r){u=u.gi3()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.geD()
y=z.a.gdR()
x=J.c9(v)
u=v.gcg()
y.toString
P.dm(null,null,y,x,u)
return}q=$.Q
if(q==null?r!=null:q!==r)$.Q=r
else q=null
if(y){if(b.gkD())x.a=new P.vB(x,b,s,r).$0()}else new P.vA(z,x,b,r).$0()
if(b.gqh())new P.vC(z,x,w,b,r).$0()
if(q!=null)$.Q=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.O(y).$isbq}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.a2)if(p.a>=4){o.a=2
z.a=p
b=new P.dj(null,o,0,null,null)
y=p
continue}else P.h5(p,o)
else P.jV(p,o)
return}}o=b.b
b=o.fE()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
vt:{
"^":"z:1;a,b",
$0:function(){P.cU(this.a,this.b)}},
vx:{
"^":"z:0;a",
$1:function(a){this.a.hm(a)}},
vy:{
"^":"z:17;a",
$2:function(a,b){this.a.bw(a,b)},
$1:function(a){return this.$2(a,null)}},
vz:{
"^":"z:1;a,b,c",
$0:function(){this.a.bw(this.b,this.c)}},
vv:{
"^":"z:1;a,b",
$0:function(){P.h5(this.b,this.a)}},
vw:{
"^":"z:1;a,b",
$0:function(){this.a.hm(this.b)}},
vu:{
"^":"z:1;a,b,c",
$0:function(){this.a.bw(this.b,this.c)}},
vB:{
"^":"z:124;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.fZ(this.b.gos(),this.c)
return!0}catch(x){w=H.ap(x)
z=w
y=H.b4(x)
this.a.b=new P.d0(z,y)
return!1}}},
vA:{
"^":"z:3;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.geD()
y=!0
r=this.c
if(r.gqi()){x=r.d
try{y=this.d.fZ(x,J.c9(z))}catch(q){r=H.ap(q)
w=r
v=H.b4(q)
r=J.c9(z)
p=w
o=(r==null?p==null:r===p)?z:new P.d0(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.eX()
p=H.dq(p,[p,p]).dd(r)
n=this.d
m=this.b
if(p)m.b=n.r6(u,J.c9(z),z.gcg())
else m.b=n.fZ(u,J.c9(z))}catch(q){r=H.ap(q)
t=r
s=H.b4(q)
r=J.c9(z)
p=t
o=(r==null?p==null:r===p)?z:new P.d0(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
vC:{
"^":"z:3;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.l8(this.d.gpp())
z.a=w
v=w}catch(u){z=H.ap(u)
y=z
x=H.b4(u)
if(this.c){z=J.c9(this.a.a.geD())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.geD()
else v.b=new P.d0(y,x)
v.a=!1
return}if(!!J.O(v).$isbq){t=this.d
s=t.gr_(t)
s.so8(!0)
this.b.c=!0
v.ec(new P.vD(this.a,s),new P.vE(z,s))}}},
vD:{
"^":"z:0;a,b",
$1:function(a){P.cU(this.a.a,new P.dj(null,this.b,0,null,null))}},
vE:{
"^":"z:17;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.a2)){y=H.p(new P.a2(0,$.Q,null),[null])
z.a=y
y.ph(a,b)}P.cU(z.a,new P.dj(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
mT:{
"^":"o;a,rs:b<,e8:c@",
pD:function(){return this.a.$0()}},
bu:{
"^":"o;",
e6:function(a,b){return H.p(new P.vS(b,this),[H.aR(this,"bu",0),null])},
b1:function(a,b){var z,y
z={}
y=H.p(new P.a2(0,$.Q,null),[null])
z.a=null
z.a=this.bi(new P.u5(z,this,b,y),!0,new P.u6(y),y.geA())
return y},
gn:function(a){var z,y
z={}
y=H.p(new P.a2(0,$.Q,null),[P.x])
z.a=0
this.bi(new P.u9(z),!0,new P.ua(z,y),y.geA())
return y},
ga6:function(a){var z,y
z={}
y=H.p(new P.a2(0,$.Q,null),[P.aj])
z.a=null
z.a=this.bi(new P.u7(z,y),!0,new P.u8(y),y.geA())
return y},
cu:function(a){var z,y
z=H.p([],[H.aR(this,"bu",0)])
y=H.p(new P.a2(0,$.Q,null),[[P.E,H.aR(this,"bu",0)]])
this.bi(new P.ub(this,z),!0,new P.uc(z,y),y.geA())
return y},
bO:function(a,b){var z=H.p(new P.w4(b,this),[null])
if(typeof b!=="number"||Math.floor(b)!==b||b<0)H.T(P.aD(b))
return z},
gat:function(a){var z,y
z={}
y=H.p(new P.a2(0,$.Q,null),[H.aR(this,"bu",0)])
z.a=null
z.a=this.bi(new P.u1(z,this,y),!0,new P.u2(y),y.geA())
return y},
E:function(a){return this.gn(this).$0()}},
u5:{
"^":"z;a,b,c,d",
$1:function(a){P.wz(new P.u3(this.c,a),new P.u4(),P.wo(this.a.a,this.d))},
$signature:function(){return H.eV(function(a){return{func:1,args:[a]}},this.b,"bu")}},
u3:{
"^":"z:1;a,b",
$0:function(){return this.a.$1(this.b)}},
u4:{
"^":"z:0;",
$1:function(a){}},
u6:{
"^":"z:1;a",
$0:function(){this.a.dC(null)}},
u9:{
"^":"z:0;a",
$1:function(a){++this.a.a}},
ua:{
"^":"z:1;a,b",
$0:function(){this.b.dC(this.a.a)}},
u7:{
"^":"z:0;a,b",
$1:function(a){P.nj(this.a.a,this.b,!1)}},
u8:{
"^":"z:1;a",
$0:function(){this.a.dC(!0)}},
ub:{
"^":"z;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.eV(function(a){return{func:1,args:[a]}},this.a,"bu")}},
uc:{
"^":"z:1;a,b",
$0:function(){this.b.dC(this.a)}},
u1:{
"^":"z;a,b,c",
$1:function(a){P.nj(this.a.a,this.c,a)},
$signature:function(){return H.eV(function(a){return{func:1,args:[a]}},this.b,"bu")}},
u2:{
"^":"z:1;a",
$0:function(){var z,y,x,w
try{x=H.ce()
throw H.l(x)}catch(w){x=H.ap(w)
z=x
y=H.b4(w)
P.ws(this.a,z,y)}}},
u0:{
"^":"o;"},
k2:{
"^":"o;fF:b?",
goF:function(){if((this.b&8)===0)return this.a
return this.a.gh1()},
hs:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.nd(null,null,0)
this.a=z}return z}y=this.a
y.gh1()
return y.gh1()},
gfG:function(){if((this.b&8)!==0)return this.a.gh1()
return this.a},
j3:function(){if((this.b&4)!==0)return new P.aY("Cannot add event after closing")
return new P.aY("Cannot add event while adding a stream")},
jn:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$l4():H.p(new P.a2(0,$.Q,null),[null])
this.c=z}return z},
H:[function(a,b){var z=this.b
if(z>=4)throw H.l(this.j3())
if((z&1)!==0)this.dQ(b)
else if((z&3)===0)this.hs().H(0,new P.h2(b,null))},"$1","gpq",2,0,function(){return H.eV(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"k2")}],
dX:function(a){var z=this.b
if((z&4)!==0)return this.jn()
if(z>=4)throw H.l(this.j3())
z|=4
this.b=z
if((z&1)!==0)this.eJ()
else if((z&3)===0)this.hs().H(0,C.U)
return this.jn()},
dB:function(a){var z=this.b
if((z&1)!==0)this.dQ(a)
else if((z&3)===0)this.hs().H(0,new P.h2(a,null))},
pl:function(a,b,c,d){var z,y,x,w
if((this.b&3)!==0)throw H.l(new P.aY("Stream has already been listened to."))
z=$.Q
y=H.p(new P.vj(this,null,null,null,z,d?1:0,null,null),[null])
y.fo(a,b,c,d)
x=this.goF()
z=this.b|=1
if((z&8)!==0){w=this.a
w.sh1(y)
w.fY()}else this.a=y
y.pi(x)
y.hC(new P.wb(this))
return y},
pa:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.eN()
this.a=null
this.b=this.b&4294967286|2
if(this.ghJ()!=null)if(z==null)try{z=this.dL()}catch(w){v=H.ap(w)
y=v
x=H.b4(w)
u=H.p(new P.a2(0,$.Q,null),[null])
u.hh(y,x)
z=u}else z=z.ek(this.ghJ())
v=new P.wa(this)
if(z!=null)z=z.ek(v)
else v.$0()
return z}},
wb:{
"^":"z:1;a",
$0:function(){P.ka(this.a.gjN())}},
wa:{
"^":"z:3;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.d8(null)}},
wh:{
"^":"o;",
dQ:function(a){this.gfG().dB(a)},
eJ:function(){this.gfG().j6()}},
va:{
"^":"o;",
dQ:function(a){this.gfG().ey(new P.h2(a,null))},
eJ:function(){this.gfG().ey(C.U)}},
v9:{
"^":"w8;jN:d<,dM:e<,dN:f<,hJ:r<,a,b,c",
dL:function(){return this.r.$0()}},
w8:{
"^":"k2+va;"},
wg:{
"^":"w9;jN:d<,dM:e<,dN:f<,hJ:r<,a,b,c",
dL:function(){return this.r.$0()}},
w9:{
"^":"k2+wh;"},
jT:{
"^":"wc;a",
eB:function(a,b,c,d){return this.a.pl(a,b,c,d)},
gb2:function(a){return(H.ck(this.a)^892482866)>>>0},
B:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.jT))return!1
return b.a===this.a}},
vj:{
"^":"jS;x,a,b,c,d,e,f,r",
dL:function(){return this.x.pa(this)},
hK:[function(){var z=this.x
if((z.b&8)!==0)z.a.iq(0)
P.ka(z.gdM())},"$0","gdM",0,0,3],
hL:[function(){var z=this.x
if((z.b&8)!==0)z.a.fY()
P.ka(z.gdN())},"$0","gdN",0,0,3]},
D0:{
"^":"o;"},
jS:{
"^":"o;a,b,c,dR:d<,fF:e?,f,r",
pi:function(a){if(a==null)return
this.r=a
if(!a.ga6(a)){this.e=(this.e|64)>>>0
this.r.fj(this)}},
ir:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.kl()
if((z&4)===0&&(this.e&32)===0)this.hC(this.gdM())},
iq:function(a){return this.ir(a,null)},
fY:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.ga6(z)}else z=!1
if(z)this.r.fj(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.hC(this.gdN())}}}},
eN:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.hj()
return this.f},
hj:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.kl()
if((this.e&32)===0)this.r=null
this.f=this.dL()},
dB:["lM",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.dQ(a)
else this.ey(new P.h2(a,null))}],
he:["lN",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.jZ(a,b)
else this.ey(new P.vn(a,b,null))}],
j6:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.eJ()
else this.ey(C.U)},
hK:[function(){},"$0","gdM",0,0,3],
hL:[function(){},"$0","gdN",0,0,3],
dL:function(){return},
ey:function(a){var z,y
z=this.r
if(z==null){z=new P.nd(null,null,0)
this.r=z}z.H(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.fj(this)}},
dQ:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.iw(this.a,a)
this.e=(this.e&4294967263)>>>0
this.hk((z&4)!==0)},
jZ:function(a,b){var z,y
z=this.e
y=new P.ve(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.hj()
z=this.f
if(!!J.O(z).$isbq)z.ek(y)
else y.$0()}else{y.$0()
this.hk((z&4)!==0)}},
eJ:function(){var z,y
z=new P.vd(this)
this.hj()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.O(y).$isbq)y.ek(z)
else z.$0()},
hC:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.hk((z&4)!==0)},
hk:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.ga6(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.ga6(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.hK()
else this.hL()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.fj(this)},
fo:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.k9(b==null?P.wK():b,z)
this.c=c==null?P.wJ():c},
static:{vc:function(a,b,c,d){var z=$.Q
z=new P.jS(null,null,null,z,d?1:0,null,null)
z.fo(a,b,c,d)
return z}}},
ve:{
"^":"z:3;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.eX()
x=H.dq(x,[x,x]).dd(y)
w=z.d
v=this.b
u=z.b
if(x)w.r7(u,v,this.c)
else w.iw(u,v)
z.e=(z.e&4294967263)>>>0}},
vd:{
"^":"z:3;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.l9(z.c)
z.e=(z.e&4294967263)>>>0}},
wc:{
"^":"bu;",
bi:function(a,b,c,d){return this.eB(a,d,c,!0===b)},
fR:function(a,b,c){return this.bi(a,null,b,c)},
eB:function(a,b,c,d){return P.vc(a,b,c,d)}},
mX:{
"^":"o;e8:a@"},
h2:{
"^":"mX;b,a",
it:function(a){a.dQ(this.b)}},
vn:{
"^":"mX;eQ:b>,cg:c<,a",
it:function(a){a.jZ(this.b,this.c)}},
vm:{
"^":"o;",
it:function(a){a.eJ()},
ge8:function(){return},
se8:function(a){throw H.l(new P.aY("No events after a done."))}},
vU:{
"^":"o;fF:a?",
fj:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.nH(new P.vV(this,a))
this.a=1},
kl:function(){if(this.a===1)this.a=3}},
vV:{
"^":"z:1;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.qe(this.b)}},
nd:{
"^":"vU;b,c,a",
ga6:function(a){return this.c==null},
H:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.se8(b)
this.c=b}},
qe:function(a){var z,y
z=this.b
y=z.ge8()
this.b=y
if(y==null)this.c=null
z.it(a)}},
wq:{
"^":"z:1;a,b,c",
$0:function(){return this.a.bw(this.b,this.c)}},
wp:{
"^":"z:123;a,b",
$2:function(a,b){return P.wn(this.a,this.b,a,b)}},
wr:{
"^":"z:1;a,b",
$0:function(){return this.a.dC(this.b)}},
eQ:{
"^":"bu;",
bi:function(a,b,c,d){return this.eB(a,d,c,!0===b)},
fR:function(a,b,c){return this.bi(a,null,b,c)},
eB:function(a,b,c,d){return P.vs(this,a,b,c,d,H.aR(this,"eQ",0),H.aR(this,"eQ",1))},
hD:function(a,b){b.dB(a)},
$asbu:function(a,b){return[b]}},
h4:{
"^":"jS;x,y,a,b,c,d,e,f,r",
dB:function(a){if((this.e&2)!==0)return
this.lM(a)},
he:function(a,b){if((this.e&2)!==0)return
this.lN(a,b)},
hK:[function(){var z=this.y
if(z==null)return
z.iq(0)},"$0","gdM",0,0,3],
hL:[function(){var z=this.y
if(z==null)return
z.fY()},"$0","gdN",0,0,3],
dL:function(){var z=this.y
if(z!=null){this.y=null
z.eN()}return},
rD:[function(a){this.x.hD(a,this)},"$1","gnV",2,0,function(){return H.eV(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"h4")}],
rF:[function(a,b){this.he(a,b)},"$2","gnX",4,0,122],
rE:[function(){this.j6()},"$0","gnW",0,0,3],
iZ:function(a,b,c,d,e,f,g){var z,y
z=this.gnV()
y=this.gnX()
this.y=this.x.a.fR(z,this.gnW(),y)},
static:{vs:function(a,b,c,d,e,f,g){var z=$.Q
z=H.p(new P.h4(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.fo(b,c,d,e)
z.iZ(a,b,c,d,e,f,g)
return z}}},
vS:{
"^":"eQ;b,a",
hD:function(a,b){var z,y,x,w,v
z=null
try{z=this.pm(a)}catch(w){v=H.ap(w)
y=v
x=H.b4(w)
P.wm(b,y,x)
return}b.dB(z)},
pm:function(a){return this.b.$1(a)}},
w7:{
"^":"h4;z,x,y,a,b,c,d,e,f,r",
gnq:function(){return this.z},
$ash4:function(a){return[a,a]}},
w4:{
"^":"eQ;b,a",
eB:function(a,b,c,d){var z,y,x
z=H.aV(this,0)
y=$.Q
x=d?1:0
x=new P.w7(this.b,this,null,null,null,null,y,x,null,null)
x.$builtinTypeInfo=this.$builtinTypeInfo
x.fo(a,b,c,d)
x.iZ(this,a,b,c,d,z,z)
return x},
hD:function(a,b){var z,y
z=b.gnq()
y=J.y(z)
if(y.a0(z,0)){b.z=y.l(z,1)
return}b.dB(a)},
$aseQ:function(a){return[a,a]},
$asbu:null},
d0:{
"^":"o;eQ:a>,cg:b<",
K:function(a){return H.m(this.a)},
$isb9:1},
wl:{
"^":"o;"},
wy:{
"^":"z:1;a,b",
$0:function(){var z=this.a
throw H.l(new P.wi(z,P.wj(z,this.b)))}},
vY:{
"^":"wl;",
gi3:function(){return this},
l9:function(a){var z,y,x,w
try{if(C.h===$.Q){x=a.$0()
return x}x=P.nm(null,null,this,a)
return x}catch(w){x=H.ap(w)
z=x
y=H.b4(w)
return P.dm(null,null,this,z,y)}},
iw:function(a,b){var z,y,x,w
try{if(C.h===$.Q){x=a.$1(b)
return x}x=P.no(null,null,this,a,b)
return x}catch(w){x=H.ap(w)
z=x
y=H.b4(w)
return P.dm(null,null,this,z,y)}},
r7:function(a,b,c){var z,y,x,w
try{if(C.h===$.Q){x=a.$2(b,c)
return x}x=P.nn(null,null,this,a,b,c)
return x}catch(w){x=H.ap(w)
z=x
y=H.b4(w)
return P.dm(null,null,this,z,y)}},
hV:function(a,b){if(b)return new P.vZ(this,a)
else return new P.w_(this,a)},
py:function(a,b){if(b)return new P.w0(this,a)
else return new P.w1(this,a)},
h:function(a,b){return},
l8:function(a){if($.Q===C.h)return a.$0()
return P.nm(null,null,this,a)},
fZ:function(a,b){if($.Q===C.h)return a.$1(b)
return P.no(null,null,this,a,b)},
r6:function(a,b,c){if($.Q===C.h)return a.$2(b,c)
return P.nn(null,null,this,a,b,c)}},
vZ:{
"^":"z:1;a,b",
$0:function(){return this.a.l9(this.b)}},
w_:{
"^":"z:1;a,b",
$0:function(){return this.a.l8(this.b)}},
w0:{
"^":"z:0;a,b",
$1:function(a){return this.a.iw(this.b,a)}},
w1:{
"^":"z:0;a,b",
$1:function(a){return this.a.fZ(this.b,a)}}}],["","",,P,{
"^":"",
a5:function(){return H.p(new H.er(0,null,null,null,null,null,0),[null,null])},
av:function(a){return H.ny(a,H.p(new H.er(0,null,null,null,null,null,0),[null,null]))},
qn:function(a,b,c){var z,y
if(P.k8(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$e4()
y.push(a)
try{P.wu(a,z)}finally{if(0>=y.length)return H.a(y,0)
y.pop()}y=P.mn(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
fj:function(a,b,c){var z,y,x
if(P.k8(a))return b+"..."+c
z=new P.jn(b)
y=$.$get$e4()
y.push(a)
try{x=z
x.a=P.mn(x.gdD(),a,", ")}finally{if(0>=y.length)return H.a(y,0)
y.pop()}y=z
y.a=y.gdD()+c
y=z.gdD()
return y.charCodeAt(0)==0?y:y},
k8:function(a){var z,y
for(z=0;y=$.$get$e4(),z<y.length;++z)if(a===y[z])return!0
return!1},
wu:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gax(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.a9())return
w=H.m(z.gas())
b.push(w)
y+=w.length+2;++x}if(!z.a9()){if(x<=5)return
if(0>=b.length)return H.a(b,0)
v=b.pop()
if(0>=b.length)return H.a(b,0)
u=b.pop()}else{t=z.gas();++x
if(!z.a9()){if(x<=4){b.push(H.m(t))
return}v=H.m(t)
if(0>=b.length)return H.a(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gas();++x
for(;z.a9();t=s,s=r){r=z.gas();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.a(b,0)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.m(t)
v=H.m(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.a(b,0)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
cE:function(a,b,c,d,e){return H.p(new H.er(0,null,null,null,null,null,0),[d,e])},
bP:function(a,b){return P.vM(a,b)},
ip:function(a,b,c){var z=P.cE(null,null,null,b,c)
a.b1(0,new P.qJ(z))
return z},
cf:function(a,b,c,d){return H.p(new P.vJ(0,null,null,null,null,null,0),[d])},
iv:function(a){var z,y,x
z={}
if(P.k8(a))return"{...}"
y=new P.jn("")
try{$.$get$e4().push(a)
x=y
x.a=x.gdD()+"{"
z.a=!0
J.nR(a,new P.qP(z,y))
z=y
z.a=z.gdD()+"}"}finally{z=$.$get$e4()
if(0>=z.length)return H.a(z,0)
z.pop()}z=y.gdD()
return z.charCodeAt(0)==0?z:z},
vL:{
"^":"er;a,b,c,d,e,f,r",
eX:function(a){return H.yj(a)&0x3ffffff},
eY:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gkF()
if(x==null?b==null:x===b)return y}return-1},
static:{vM:function(a,b){return H.p(new P.vL(0,null,null,null,null,null,0),[a,b])}}},
vJ:{
"^":"vF;a,b,c,d,e,f,r",
gax:function(a){var z=new P.lq(this,this.r,null,null)
z.c=this.e
return z},
gn:function(a){return this.a},
ga6:function(a){return this.a===0},
gbd:function(a){return this.a!==0},
cJ:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.no(b)},
no:function(a){var z=this.d
if(z==null)return!1
return this.fz(z[this.ft(a)],a)>=0},
ik:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.cJ(0,a)?a:null
else return this.nm(a)},
nm:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.ft(a)]
x=this.fz(y,a)
if(x<0)return
return J.e(y,x).gjm()},
b1:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.l(new P.bg(this))
z=z.b}},
gat:function(a){var z=this.e
if(z==null)throw H.l(new P.aY("No elements"))
return z.a},
H:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.j7(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.j7(x,b)}else return this.c3(b)},
c3:function(a){var z,y,x
z=this.d
if(z==null){z=P.vK()
this.d=z}y=this.ft(a)
x=z[y]
if(x==null)z[y]=[this.hl(a)]
else{if(this.fz(x,a)>=0)return!1
x.push(this.hl(a))}return!0},
cX:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.j8(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.j8(this.c,b)
else return this.pb(b)},
pb:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.ft(a)]
x=this.fz(y,a)
if(x<0)return!1
this.j9(y.splice(x,1)[0])
return!0},
di:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
j7:function(a,b){if(a[b]!=null)return!1
a[b]=this.hl(b)
return!0},
j8:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.j9(z)
delete a[b]
return!0},
hl:function(a){var z,y
z=new P.qK(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
j9:function(a){var z,y
z=a.gnn()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
ft:function(a){return J.aS(a)&0x3ffffff},
fz:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.i(a[y].gjm(),b))return y
return-1},
E:function(a){return this.gn(this).$0()},
$isab:1,
static:{vK:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qK:{
"^":"o;jm:a<,b,nn:c<"},
lq:{
"^":"o;a,b,c,d",
gas:function(){return this.d},
a9:function(){var z=this.a
if(this.b!==z.r)throw H.l(new P.bg(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
vF:{
"^":"tv;"},
lh:{
"^":"b1;"},
qJ:{
"^":"z:7;a",
$2:function(a,b){this.a.k(0,a,b)}},
da:{
"^":"r9;"},
r9:{
"^":"o+bF;",
$isE:1,
$asE:null,
$isab:1},
bF:{
"^":"o;",
gax:function(a){return new H.lr(a,this.gn(a),0,null)},
bh:function(a,b){return this.h(a,b)},
b1:function(a,b){var z,y
z=this.gn(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gn(a))throw H.l(new P.bg(a))}},
ga6:function(a){return this.gn(a)===0},
gbd:function(a){return!this.ga6(a)},
gat:function(a){if(this.gn(a)===0)throw H.l(H.ce())
return this.h(a,0)},
rm:function(a,b){return H.p(new H.uX(a,b),[H.aR(a,"bF",0)])},
e6:function(a,b){return H.p(new H.iu(a,b),[null,null])},
bO:function(a,b){return H.fK(a,b,null,H.aR(a,"bF",0))},
d_:function(a,b){var z,y,x
if(b){z=H.p([],[H.aR(a,"bF",0)])
C.c.sn(z,this.gn(a))}else z=H.p(Array(this.gn(a)),[H.aR(a,"bF",0)])
for(y=0;y<this.gn(a);++y){x=this.h(a,y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
cu:function(a){return this.d_(a,!0)},
H:function(a,b){var z=this.gn(a)
this.sn(a,z+1)
this.k(a,z,b)},
b5:function(a,b,c){var z,y,x,w,v,u
z=this.gn(a)
if(c==null)c=z
P.cJ(b,c,z,null,null,null)
y=J.h(c,b)
x=H.p([],[H.aR(a,"bF",0)])
C.c.sn(x,y)
if(typeof y!=="number")return H.b(y)
w=J.w(b)
v=0
for(;v<y;++v){u=this.h(a,w.j(b,v))
if(v>=x.length)return H.a(x,v)
x[v]=u}return x},
aF:function(a,b,c,d){var z,y
P.cJ(b,c,this.gn(a),null,null,null)
for(z=b;y=J.y(z),y.U(z,c);z=y.j(z,1))this.k(a,z,d)},
aH:["iS",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
P.cJ(b,c,this.gn(a),null,null,null)
z=J.h(c,b)
y=J.O(z)
if(y.B(z,0))return
if(J.K(e,0))H.T(P.aA(e,0,null,"skipCount",null))
x=J.O(d)
if(!!x.$isE){w=e
v=d}else{v=x.bO(d,e).d_(0,!1)
w=0}x=J.w(w)
u=J.D(v)
if(J.F(x.j(w,z),u.gn(v)))throw H.l(H.li())
if(x.U(w,b))for(t=y.l(z,1),y=J.w(b);s=J.y(t),s.av(t,0);t=s.l(t,1))this.k(a,y.j(b,t),u.h(v,x.j(w,t)))
else{if(typeof z!=="number")return H.b(z)
y=J.w(b)
t=0
for(;t<z;++t)this.k(a,y.j(b,t),u.h(v,x.j(w,t)))}}],
f0:function(a,b,c){var z
c=this.gn(a)-1
for(z=c;z>=0;--z)if(J.i(this.h(a,z),b))return z
return-1},
f_:function(a,b){return this.f0(a,b,null)},
bU:function(a,b,c){P.m1(b,0,this.gn(a),"index",null)
this.gn(a)
throw H.l(P.aD(b))},
K:function(a){return P.fj(a,"[","]")},
$isE:1,
$asE:null,
$isab:1},
qP:{
"^":"z:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.m(a)
z.a=y+": "
z.a+=H.m(b)}},
qL:{
"^":"b1;a,b,c,d",
gax:function(a){return new P.vN(this,this.c,this.d,this.b,null)},
b1:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.a(x,y)
b.$1(x[y])
if(z!==this.d)H.T(new P.bg(this))}},
ga6:function(a){return this.b===this.c},
gn:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gat:function(a){var z,y
z=this.b
if(z===this.c)throw H.l(H.ce())
y=this.a
if(z>=y.length)return H.a(y,z)
return y[z]},
H:function(a,b){this.c3(b)},
di:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.a(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
K:function(a){return P.fj(this,"{","}")},
l3:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.l(H.ce());++this.d
y=this.a
x=y.length
if(z>=x)return H.a(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
c3:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.a(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.jy();++this.d},
jy:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.p(z,[H.aV(this,0)])
z=this.a
x=this.b
w=z.length-x
C.c.aH(y,0,w,z,x)
C.c.aH(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
mu:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.p(z,[b])},
E:function(a){return this.gn(this).$0()},
$isab:1,
static:{iq:function(a,b){var z=H.p(new P.qL(null,0,0,0),[b])
z.mu(a,b)
return z}}},
vN:{
"^":"o;a,b,c,d,e",
gas:function(){return this.e},
a9:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.T(new P.bg(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.a(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
tw:{
"^":"o;",
ga6:function(a){return this.gn(this)===0},
gbd:function(a){return this.gn(this)!==0},
e6:function(a,b){return H.p(new H.kS(this,b),[H.aV(this,0),null])},
K:function(a){return P.fj(this,"{","}")},
b1:function(a,b){var z
for(z=this.gax(this);z.a9();)b.$1(z.d)},
bO:function(a,b){return H.md(this,b,H.aV(this,0))},
gat:function(a){var z=this.gax(this)
if(!z.a9())throw H.l(H.ce())
return z.d},
E:function(a){return this.gn(this).$0()},
$isab:1},
tv:{
"^":"tw;"}}],["","",,P,{
"^":"",
wA:function(a){return H.ug(a)},
ud:function(a,b,c){var z,y,x,w
if(b<0)throw H.l(P.aA(b,0,J.a0(a),null,null))
z=c==null
if(!z&&c<b)throw H.l(P.aA(c,b,J.a0(a),null,null))
y=J.cs(a)
for(x=0;x<b;++x)if(!y.a9())throw H.l(P.aA(b,0,x,null,null))
w=[]
if(z)for(;y.a9();)w.push(y.gas())
else for(x=b;x<c;++x){if(!y.a9())throw H.l(P.aA(c,b,x,null,null))
w.push(y.gas())}return H.lT(w)},
hK:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.ct(a)
if(typeof a==="string")return JSON.stringify(a)
return P.oS(a)},
oS:function(a){var z=J.O(a)
if(!!z.$isz)return z.K(a)
return H.fz(a)},
ee:function(a){return new P.vr(a)},
ls:function(a,b,c){var z,y,x
z=J.qo(a,c)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
aE:function(a,b,c){var z,y
z=H.p([],[c])
for(y=J.cs(a);y.a9();)z.push(y.gas())
if(b)return z
z.fixed$length=Array
return z},
hj:function(a){var z=H.m(a)
H.nF(z)},
dT:function(a,b,c){var z
if(typeof a==="object"&&a!==null&&a.constructor===Array){z=a.length
c=P.cJ(b,c,z,null,null,null)
return H.lT(b>0||J.K(c,z)?C.c.b5(a,b,c):a)}if(!!J.O(a).$isiF)return H.rF(a,b,P.cJ(b,c,a.length,null,null,null))
return P.ud(a,b,c)},
Be:{
"^":"z:121;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.wA(a)}},
aj:{
"^":"o;"},
"+bool":0,
hB:{
"^":"o;qD:a<,b",
B:function(a,b){if(b==null)return!1
if(!(b instanceof P.hB))return!1
return this.a===b.a&&this.b===b.b},
cm:function(a,b){return C.a.cm(this.a,b.gqD())},
gb2:function(a){return this.a},
K:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.oG(z?H.br(this).getUTCFullYear()+0:H.br(this).getFullYear()+0)
x=P.ed(z?H.br(this).getUTCMonth()+1:H.br(this).getMonth()+1)
w=P.ed(z?H.br(this).getUTCDate()+0:H.br(this).getDate()+0)
v=P.ed(z?H.br(this).getUTCHours()+0:H.br(this).getHours()+0)
u=P.ed(z?H.br(this).getUTCMinutes()+0:H.br(this).getMinutes()+0)
t=P.ed(z?H.br(this).getUTCSeconds()+0:H.br(this).getSeconds()+0)
s=P.oH(z?H.br(this).getUTCMilliseconds()+0:H.br(this).getMilliseconds()+0)
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
H:function(a,b){return P.kK(this.a+b.gql(),this.b)},
m1:function(a,b){if(Math.abs(a)>864e13)throw H.l(P.aD(a))},
static:{kK:function(a,b){var z=new P.hB(a,b)
z.m1(a,b)
return z},oG:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.m(z)
if(z>=10)return y+"00"+H.m(z)
return y+"000"+H.m(z)},oH:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},ed:function(a){if(a>=10)return""+a
return"0"+a}}},
a3:{
"^":"ds;"},
"+double":0,
bM:{
"^":"o;d9:a<",
j:function(a,b){return new P.bM(this.a+b.gd9())},
l:function(a,b){return new P.bM(this.a-b.gd9())},
i:function(a,b){if(typeof b!=="number")return H.b(b)
return new P.bM(C.b.bF(this.a*b))},
ar:function(a,b){if(J.i(b,0))throw H.l(new P.pV())
if(typeof b!=="number")return H.b(b)
return new P.bM(C.b.ar(this.a,b))},
U:function(a,b){return this.a<b.gd9()},
a0:function(a,b){return this.a>b.gd9()},
ab:function(a,b){return this.a<=b.gd9()},
av:function(a,b){return this.a>=b.gd9()},
gql:function(){return C.b.al(this.a,1000)},
B:function(a,b){if(b==null)return!1
if(!(b instanceof P.bM))return!1
return this.a===b.a},
gb2:function(a){return this.a&0x1FFFFFFF},
cm:function(a,b){return C.b.cm(this.a,b.gd9())},
K:function(a){var z,y,x,w,v
z=new P.oQ()
y=this.a
if(y<0)return"-"+new P.bM(-y).K(0)
x=z.$1(C.b.iv(C.b.al(y,6e7),60))
w=z.$1(C.b.iv(C.b.al(y,1e6),60))
v=new P.oP().$1(C.b.iv(y,1e6))
return H.m(C.b.al(y,36e8))+":"+H.m(x)+":"+H.m(w)+"."+H.m(v)},
aW:function(a){return new P.bM(Math.abs(this.a))},
a2:function(a){return new P.bM(-this.a)},
static:{bN:function(a,b,c,d,e,f){if(typeof c!=="number")return H.b(c)
return new P.bM(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
oP:{
"^":"z:18;",
$1:function(a){if(a>=1e5)return H.m(a)
if(a>=1e4)return"0"+H.m(a)
if(a>=1000)return"00"+H.m(a)
if(a>=100)return"000"+H.m(a)
if(a>=10)return"0000"+H.m(a)
return"00000"+H.m(a)}},
oQ:{
"^":"z:18;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
b9:{
"^":"o;",
gcg:function(){return H.b4(this.$thrownJsError)}},
iG:{
"^":"b9;",
K:function(a){return"Throw of null."}},
cv:{
"^":"b9;a,b,a3:c>,d",
ghu:function(){return"Invalid argument"+(!this.a?"(s)":"")},
ght:function(){return""},
K:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.m(z)+")":""
z=this.d
x=z==null?"":": "+H.m(z)
w=this.ghu()+y+x
if(!this.a)return w
v=this.ght()
u=P.hK(this.b)
return w+v+": "+H.m(u)},
static:{aD:function(a){return new P.cv(!1,null,null,a)},ea:function(a,b,c){return new P.cv(!0,a,b,c)},oa:function(a){return new P.cv(!0,null,a,"Must not be null")}}},
j4:{
"^":"cv;e,f,a,b,c,d",
ghu:function(){return"RangeError"},
ght:function(){var z,y,x,w
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.m(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.m(z)
else{w=J.y(x)
if(w.a0(x,z))y=": Not in range "+H.m(z)+".."+H.m(x)+", inclusive"
else y=w.U(x,z)?": Valid value range is empty":": Only valid value is "+H.m(z)}}return y},
static:{m0:function(a){return new P.j4(null,null,!1,null,null,a)},ez:function(a,b,c){return new P.j4(null,null,!0,a,b,"Value not in range")},aA:function(a,b,c,d,e){return new P.j4(b,c,!0,a,d,"Invalid value")},m1:function(a,b,c,d,e){if(typeof a!=="number")return a.U()
if(a<b||a>c)throw H.l(P.aA(a,b,c,d,e))},cJ:function(a,b,c,d,e,f){if(typeof a!=="number")return H.b(a)
if(0>a||a>c)throw H.l(P.aA(a,0,c,"start",f))
if(b!=null){if(typeof b!=="number")return H.b(b)
if(a>b||b>c)throw H.l(P.aA(b,a,c,"end",f))
return b}return c}}},
pR:{
"^":"cv;e,n:f>,a,b,c,d",
ghu:function(){return"RangeError"},
ght:function(){P.hK(this.e)
var z=": index should be less than "+H.m(this.f)
return J.K(this.b,0)?": index must not be negative":z},
E:function(a){return this.f.$0()},
static:{d6:function(a,b,c,d,e){var z=e!=null?e:J.a0(b)
return new P.pR(b,z,!0,a,c,"Index out of range")}}},
ae:{
"^":"b9;a",
K:function(a){return"Unsupported operation: "+this.a}},
eI:{
"^":"b9;a",
K:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.m(z):"UnimplementedError"}},
aY:{
"^":"b9;a",
K:function(a){return"Bad state: "+this.a}},
bg:{
"^":"b9;a",
K:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.m(P.hK(z))+"."}},
rb:{
"^":"o;",
K:function(a){return"Out of Memory"},
gcg:function(){return},
$isb9:1},
mm:{
"^":"o;",
K:function(a){return"Stack Overflow"},
gcg:function(){return},
$isb9:1},
oB:{
"^":"b9;a",
K:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
vr:{
"^":"o;a",
K:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.m(z)}},
l2:{
"^":"o;a,b,c",
K:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.m(z):"FormatException"
x=this.c
w=this.b
if(typeof w!=="string")return x!=null?y+(" (at offset "+H.m(x)+")"):y
if(x!=null)if(!(x<0)){z=J.a0(w)
if(typeof z!=="number")return H.b(z)
z=x>z}else z=!0
else z=!1
if(z)x=null
if(x==null){z=J.D(w)
if(J.F(z.gn(w),78))w=z.hb(w,0,75)+"..."
return y+"\n"+H.m(w)}for(z=J.D(w),v=1,u=0,t=null,s=0;s<x;++s){r=z.bS(w,s)
if(r===10){if(u!==s||t!==!0)++v
u=s+1
t=!1}else if(r===13){++v
u=s+1
t=!0}}y=v>1?y+(" (at line "+v+", character "+(x-u+1)+")\n"):y+(" (at character "+(x+1)+")\n")
q=z.gn(w)
s=x
while(!0){p=z.gn(w)
if(typeof p!=="number")return H.b(p)
if(!(s<p))break
r=z.bS(w,s)
if(r===10||r===13){q=s
break}++s}p=J.y(q)
if(J.F(p.l(q,u),78))if(x-u<75){o=u+75
n=u
m=""
l="..."}else{if(J.K(p.l(q,x),75)){n=p.l(q,75)
o=q
l=""}else{n=x-36
o=x+36
l="..."}m="..."}else{o=q
n=u
m=""
l=""}k=z.hb(w,n,o)
if(typeof n!=="number")return H.b(n)
return y+m+k+l+"\n"+C.i.i(" ",x-n+m.length)+"^\n"}},
pV:{
"^":"o;",
K:function(a){return"IntegerDivisionByZeroException"}},
oT:{
"^":"o;a3:a>",
K:function(a){return"Expando:"+H.m(this.a)},
h:function(a,b){var z=H.fy(b,"expando$values")
return z==null?null:H.fy(z,this.ju())},
k:function(a,b,c){var z=H.fy(b,"expando$values")
if(z==null){z=new P.o()
H.iU(b,"expando$values",z)}H.iU(z,this.ju(),c)},
ju:function(){var z,y
z=H.fy(this,"expando$key")
if(z==null){y=$.kT
$.kT=y+1
z="expando$key$"+y
H.iU(this,"expando$key",z)}return z}},
ph:{
"^":"o;"},
x:{
"^":"ds;"},
"+int":0,
b1:{
"^":"o;",
e6:function(a,b){return H.fn(this,b,H.aR(this,"b1",0),null)},
b1:function(a,b){var z
for(z=this.gax(this);z.a9();)b.$1(z.gas())},
d_:function(a,b){return P.aE(this,b,H.aR(this,"b1",0))},
cu:function(a){return this.d_(a,!0)},
gn:function(a){var z,y
z=this.gax(this)
for(y=0;z.a9();)++y
return y},
ga6:function(a){return!this.gax(this).a9()},
gbd:function(a){return this.ga6(this)!==!0},
bO:function(a,b){return H.md(this,b,H.aR(this,"b1",0))},
gat:function(a){var z=this.gax(this)
if(!z.a9())throw H.l(H.ce())
return z.gas()},
bh:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.l(P.oa("index"))
if(b<0)H.T(P.aA(b,0,null,"index",null))
for(z=this.gax(this),y=0;z.a9();){x=z.gas()
if(b===y)return x;++y}throw H.l(P.d6(b,this,"index",null,y))},
K:function(a){return P.qn(this,"(",")")},
E:function(a){return this.gn(this).$0()}},
id:{
"^":"o;"},
E:{
"^":"o;",
$asE:null,
$isab:1},
"+List":0,
et:{
"^":"o;"},
Bf:{
"^":"o;",
K:function(a){return"null"}},
"+Null":0,
ds:{
"^":"o;"},
"+num":0,
o:{
"^":";",
B:function(a,b){return this===b},
gb2:function(a){return H.ck(this)},
K:function(a){return H.fz(this)}},
rg:{
"^":"o;"},
cP:{
"^":"o;"},
bT:{
"^":"o;a,b",
bP:function(a){var z,y
z=this.a==null
if(!z&&this.b==null)return
y=$.dM
if(z)this.a=y.$0()
else{this.a=J.h(y.$0(),J.h(this.b,this.a))
this.b=null}},
lG:function(a){if(!(this.a!=null&&this.b==null))return
this.b=$.dM.$0()},
du:function(a){var z
if(this.a==null)return
z=$.dM.$0()
this.a=z
if(this.b!=null)this.b=z},
gbz:function(){var z,y
z=this.a
if(z==null)return 0
y=this.b
return y==null?J.h($.dM.$0(),this.a):J.h(y,z)}},
aZ:{
"^":"o;",
$isrg:1},
"+String":0,
jn:{
"^":"o;dD:a<",
gn:function(a){return this.a.length},
ga6:function(a){return this.a.length===0},
gbd:function(a){return this.a.length!==0},
K:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
E:function(a){return this.gn(this).$0()},
static:{mn:function(a,b,c){var z=J.cs(b)
if(!z.a9())return a
if(c.length===0){do a+=H.m(z.gas())
while(z.a9())}else{a+=H.m(z.gas())
for(;z.a9();)a=a+c+H.m(z.gas())}return a}}},
mp:{
"^":"o;"}}],["","",,W,{
"^":"",
pH:function(a,b,c,d,e,f,g,h){var z,y,x
z=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[W.i0])),[W.i0])
y=new XMLHttpRequest()
C.aE.qH(y,b,a,!0)
y.overrideMimeType(c)
x=H.p(new W.mY(y,"load",!1),[null])
H.p(new W.jU(0,x.a,x.b,W.kb(new W.pI(z,y)),x.c),[H.aV(x,0)]).fH()
x=H.p(new W.mY(y,"error",!1),[null])
H.p(new W.jU(0,x.a,x.b,W.kb(z.gkq()),x.c),[H.aV(x,0)]).fH()
y.send()
return z.a},
cW:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
n1:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
wt:function(a){if(a==null)return
return W.mW(a)},
e1:function(a){if(!!J.O(a).$iskQ)return a
return P.nu(a,!0)},
kb:function(a){var z=$.Q
if(z===C.h)return a
return z.py(a,!0)},
ar:{
"^":"cd;",
$isar:1,
$iscd:1,
$isaT:1,
$iso:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMarqueeElement|HTMLMeterElement|HTMLModElement|HTMLOptGroupElement|HTMLOptionElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
zm:{
"^":"ar;aa:type=,dr:origin=",
K:function(a){return String(a)},
$isU:1,
"%":"HTMLAnchorElement"},
zo:{
"^":"ar;dr:origin=",
K:function(a){return String(a)},
$isU:1,
"%":"HTMLAreaElement"},
oj:{
"^":"U;aa:type=",
"%":";Blob"},
zt:{
"^":"ar;",
$isU:1,
"%":"HTMLBodyElement"},
zw:{
"^":"ar;a3:name=,aa:type=",
"%":"HTMLButtonElement"},
zx:{
"^":"ar;M:height=,N:width=",
"%":"HTMLCanvasElement"},
zy:{
"^":"aT;A:data=,n:length=",
E:function(a){return a.length.$0()},
$isU:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
zB:{
"^":"mG;A:data=",
"%":"CompositionEvent"},
zG:{
"^":"cA;dS:alpha=",
"%":"DeviceOrientationEvent"},
kQ:{
"^":"aT;",
$iskQ:1,
"%":"Document|HTMLDocument|XMLDocument"},
zN:{
"^":"aT;",
gaE:function(a){if(a._docChildren==null)a._docChildren=H.p(new P.l0(a,new W.mV(a)),[null])
return a._docChildren},
$isU:1,
"%":"DocumentFragment|ShadowRoot"},
zO:{
"^":"U;a3:name=",
"%":"DOMError|FileError"},
zP:{
"^":"U;",
ga3:function(a){var z=a.name
if(P.kO()===!0&&z==="SECURITY_ERR")return"SecurityError"
if(P.kO()===!0&&z==="SYNTAX_ERR")return"SyntaxError"
return z},
K:function(a){return String(a)},
"%":"DOMException"},
oO:{
"^":"U;pB:bottom=,M:height=,ca:left=,r4:right=,bH:top=,N:width=,G:x=,F:y=",
K:function(a){return"Rectangle ("+H.m(a.left)+", "+H.m(a.top)+") "+H.m(this.gN(a))+" x "+H.m(this.gM(a))},
B:function(a,b){var z,y,x
if(b==null)return!1
z=J.O(b)
if(!z.$iseB)return!1
y=a.left
x=z.gca(b)
if(y==null?x==null:y===x){y=a.top
x=z.gbH(b)
if(y==null?x==null:y===x){y=this.gN(a)
x=z.gN(b)
if(y==null?x==null:y===x){y=this.gM(a)
z=z.gM(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gb2:function(a){var z,y,x,w
z=J.aS(a.left)
y=J.aS(a.top)
x=J.aS(this.gN(a))
w=J.aS(this.gM(a))
return W.n1(W.cW(W.cW(W.cW(W.cW(0,z),y),x),w))},
$iseB:1,
$aseB:I.eW,
"%":";DOMRectReadOnly"},
vf:{
"^":"da;a,b",
ga6:function(a){return this.a.firstElementChild==null},
gn:function(a){return this.b.length},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.a(z,b)
this.a.replaceChild(c,z[b])},
sn:function(a,b){throw H.l(new P.ae("Cannot resize element lists"))},
H:function(a,b){this.a.appendChild(b)
return b},
gax:function(a){var z=this.cu(this)
return new J.dw(z,z.length,0,null)},
aH:function(a,b,c,d,e){throw H.l(new P.eI(null))},
aF:function(a,b,c,d){throw H.l(new P.eI(null))},
bU:function(a,b,c){var z
if(b.U(0,0)||b.a0(0,this.b.length))throw H.l(P.aA(b,0,this.gn(this),null,null))
z=this.b
if(b>>>0!==b||b>=z.length)return H.a(z,b)
this.a.insertBefore(c,z[b])},
gat:function(a){var z=this.a.firstElementChild
if(z==null)throw H.l(new P.aY("No elements"))
return z},
E:function(a){return this.gn(this).$0()},
$asda:function(){return[W.cd]},
$asE:function(){return[W.cd]}},
cd:{
"^":"aT;",
gaE:function(a){return new W.vf(a,a.children)},
K:function(a){return a.localName},
$iscd:1,
$isaT:1,
$iso:1,
$isU:1,
"%":";Element"},
zS:{
"^":"ar;M:height=,a3:name=,aa:type=,N:width=",
"%":"HTMLEmbedElement"},
zV:{
"^":"cA;eQ:error=",
"%":"ErrorEvent"},
cA:{
"^":"U;aa:type=",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
f8:{
"^":"U;",
ne:function(a,b,c,d){return a.addEventListener(b,H.e5(c,1),d)},
pc:function(a,b,c,d){return a.removeEventListener(b,H.e5(c,1),d)},
"%":"MediaStream;EventTarget"},
Ag:{
"^":"ar;a3:name=,aa:type=",
"%":"HTMLFieldSetElement"},
hO:{
"^":"oj;a3:name=",
$iso:1,
"%":"File"},
Ah:{
"^":"q_;",
gn:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.l(P.d6(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.l(new P.ae("Cannot assign element of immutable List."))},
sn:function(a,b){throw H.l(new P.ae("Cannot resize immutable List."))},
gat:function(a){if(a.length>0)return a[0]
throw H.l(new P.aY("No elements"))},
bh:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
E:function(a){return this.gn(a).$0()},
$isE:1,
$asE:function(){return[W.hO]},
$isab:1,
$isd7:1,
$iscC:1,
"%":"FileList"},
pW:{
"^":"U+bF;",
$isE:1,
$asE:function(){return[W.hO]},
$isab:1},
q_:{
"^":"pW+fg;",
$isE:1,
$asE:function(){return[W.hO]},
$isab:1},
Ak:{
"^":"ar;n:length=,a3:name=",
E:function(a){return a.length.$0()},
"%":"HTMLFormElement"},
At:{
"^":"q0;",
gn:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.l(P.d6(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.l(new P.ae("Cannot assign element of immutable List."))},
sn:function(a,b){throw H.l(new P.ae("Cannot resize immutable List."))},
gat:function(a){if(a.length>0)return a[0]
throw H.l(new P.aY("No elements"))},
bh:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
E:function(a){return this.gn(a).$0()},
$isE:1,
$asE:function(){return[W.aT]},
$isab:1,
$isd7:1,
$iscC:1,
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
pX:{
"^":"U+bF;",
$isE:1,
$asE:function(){return[W.aT]},
$isab:1},
q0:{
"^":"pX+fg;",
$isE:1,
$asE:function(){return[W.aT]},
$isab:1},
i0:{
"^":"pG;",
gqZ:function(a){return W.e1(a.response)},
rO:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
qH:function(a,b,c,d){return a.open(b,c,d)},
fk:function(a,b){return a.send(b)},
$iso:1,
"%":"XMLHttpRequest"},
pI:{
"^":"z:0;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
y=z.status
if(typeof y!=="number")return y.av()
x=y>=200&&y<300
w=y>307&&y<400
y=x||y===0||y===304||w
v=this.a
if(y)v.aB(0,z)
else v.c8(a)}},
pG:{
"^":"f8;",
"%":";XMLHttpRequestEventTarget"},
Av:{
"^":"ar;M:height=,a3:name=,N:width=",
"%":"HTMLIFrameElement"},
Ax:{
"^":"ar;M:height=,N:width=",
"%":"HTMLImageElement"},
AC:{
"^":"ar;ic:files=,M:height=,a3:name=,aa:type=,N:width=",
$iscd:1,
$isU:1,
"%":"HTMLInputElement"},
AI:{
"^":"ar;a3:name=,aa:type=",
"%":"HTMLKeygenElement"},
AL:{
"^":"ar;aa:type=",
"%":"HTMLLinkElement"},
AO:{
"^":"ar;a3:name=",
"%":"HTMLMapElement"},
qV:{
"^":"ar;eQ:error=",
li:function(a){return a.volume.$0()},
"%":"HTMLAudioElement;HTMLMediaElement"},
AV:{
"^":"ar;aa:type=",
"%":"HTMLMenuElement"},
AW:{
"^":"ar;aa:type=",
"%":"HTMLMenuItemElement"},
AX:{
"^":"cA;dr:origin=",
gA:function(a){return P.nu(a.data,!0)},
"%":"MessageEvent"},
AY:{
"^":"ar;dY:content=,a3:name=",
"%":"HTMLMetaElement"},
B_:{
"^":"cA;A:data=",
"%":"MIDIMessageEvent"},
B0:{
"^":"qY;",
rt:function(a,b,c){return a.send(b,c)},
fk:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
qY:{
"^":"f8;a3:name=,aa:type=",
"%":"MIDIInput;MIDIPort"},
Bc:{
"^":"U;",
$isU:1,
"%":"Navigator"},
Bd:{
"^":"U;a3:name=",
"%":"NavigatorUserMediaError"},
mV:{
"^":"da;a",
gat:function(a){var z=this.a.firstChild
if(z==null)throw H.l(new P.aY("No elements"))
return z},
H:function(a,b){this.a.appendChild(b)},
bU:function(a,b,c){var z,y
if(b.U(0,0)||b.a0(0,this.a.childNodes.length))throw H.l(P.aA(b,0,this.gn(this),null,null))
z=this.a
y=z.childNodes
if(b>>>0!==b||b>=y.length)return H.a(y,b)
z.insertBefore(c,y[b])},
k:function(a,b,c){var z,y
z=this.a
y=z.childNodes
if(b>>>0!==b||b>=y.length)return H.a(y,b)
z.replaceChild(c,y[b])},
gax:function(a){return C.ju.gax(this.a.childNodes)},
aH:function(a,b,c,d,e){throw H.l(new P.ae("Cannot setRange on Node list"))},
aF:function(a,b,c,d){throw H.l(new P.ae("Cannot fillRange on Node list"))},
gn:function(a){return this.a.childNodes.length},
sn:function(a,b){throw H.l(new P.ae("Cannot set length on immutable List."))},
h:function(a,b){var z=this.a.childNodes
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
E:function(a){return this.gn(this).$0()},
$asda:function(){return[W.aT]},
$asE:function(){return[W.aT]}},
aT:{
"^":"f8;",
qS:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
qY:function(a,b){var z,y
try{z=a.parentNode
J.nO(z,b,a)}catch(y){H.ap(y)}return a},
K:function(a){var z=a.nodeValue
return z==null?this.lI(a):z},
pf:function(a,b,c){return a.replaceChild(b,c)},
$isaT:1,
$iso:1,
"%":";Node"},
r5:{
"^":"q1;",
gn:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.l(P.d6(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.l(new P.ae("Cannot assign element of immutable List."))},
sn:function(a,b){throw H.l(new P.ae("Cannot resize immutable List."))},
gat:function(a){if(a.length>0)return a[0]
throw H.l(new P.aY("No elements"))},
bh:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
E:function(a){return this.gn(a).$0()},
$isE:1,
$asE:function(){return[W.aT]},
$isab:1,
$isd7:1,
$iscC:1,
"%":"NodeList|RadioNodeList"},
pY:{
"^":"U+bF;",
$isE:1,
$asE:function(){return[W.aT]},
$isab:1},
q1:{
"^":"pY+fg;",
$isE:1,
$asE:function(){return[W.aT]},
$isab:1},
Bh:{
"^":"ar;aa:type=",
"%":"HTMLOListElement"},
Bi:{
"^":"ar;A:data=,M:height=,a3:name=,aa:type=,N:width=",
"%":"HTMLObjectElement"},
Bk:{
"^":"ar;a3:name=,aa:type=",
"%":"HTMLOutputElement"},
Bm:{
"^":"ar;a3:name=",
"%":"HTMLParamElement"},
Bx:{
"^":"cA;A:data=",
"%":"PushEvent"},
BD:{
"^":"ar;aa:type=",
"%":"HTMLScriptElement"},
BF:{
"^":"ar;n:length%,a3:name=,aa:type=",
E:function(a){return a.length.$0()},
"%":"HTMLSelectElement"},
BI:{
"^":"ar;aa:type=",
"%":"HTMLSourceElement"},
BJ:{
"^":"cA;eQ:error=",
"%":"SpeechRecognitionError"},
BK:{
"^":"cA;a3:name=",
"%":"SpeechSynthesisEvent"},
BO:{
"^":"ar;aa:type=",
"%":"HTMLStyleElement"},
BU:{
"^":"ar;dY:content=",
"%":"HTMLTemplateElement"},
BV:{
"^":"ar;a3:name=,aa:type=",
"%":"HTMLTextAreaElement"},
BW:{
"^":"mG;A:data=",
"%":"TextEvent"},
mG:{
"^":"cA;",
"%":"DragEvent|FocusEvent|KeyboardEvent|MSPointerEvent|MouseEvent|PointerEvent|SVGZoomEvent|TouchEvent|WheelEvent;UIEvent"},
CH:{
"^":"qV;M:height=,N:width=",
"%":"HTMLVideoElement"},
CP:{
"^":"f8;a3:name=",
gbH:function(a){return W.wt(a.top)},
$isU:1,
"%":"DOMWindow|Window"},
CX:{
"^":"aT;a3:name=",
"%":"Attr"},
CY:{
"^":"U;pB:bottom=,M:height=,ca:left=,r4:right=,bH:top=,N:width=",
K:function(a){return"Rectangle ("+H.m(a.left)+", "+H.m(a.top)+") "+H.m(a.width)+" x "+H.m(a.height)},
B:function(a,b){var z,y,x
if(b==null)return!1
z=J.O(b)
if(!z.$iseB)return!1
y=a.left
x=z.gca(b)
if(y==null?x==null:y===x){y=a.top
x=z.gbH(b)
if(y==null?x==null:y===x){y=a.width
x=z.gN(b)
if(y==null?x==null:y===x){y=a.height
z=z.gM(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gb2:function(a){var z,y,x,w
z=J.aS(a.left)
y=J.aS(a.top)
x=J.aS(a.width)
w=J.aS(a.height)
return W.n1(W.cW(W.cW(W.cW(W.cW(0,z),y),x),w))},
$iseB:1,
$aseB:I.eW,
"%":"ClientRect"},
CZ:{
"^":"aT;",
$isU:1,
"%":"DocumentType"},
D_:{
"^":"oO;",
gM:function(a){return a.height},
gN:function(a){return a.width},
gG:function(a){return a.x},
sG:function(a,b){a.x=b},
gF:function(a){return a.y},
sF:function(a,b){a.y=b},
"%":"DOMRect"},
D2:{
"^":"ar;",
$isU:1,
"%":"HTMLFrameSetElement"},
D5:{
"^":"q2;",
gn:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.l(P.d6(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.l(new P.ae("Cannot assign element of immutable List."))},
sn:function(a,b){throw H.l(new P.ae("Cannot resize immutable List."))},
gat:function(a){if(a.length>0)return a[0]
throw H.l(new P.aY("No elements"))},
bh:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
E:function(a){return this.gn(a).$0()},
$isE:1,
$asE:function(){return[W.aT]},
$isab:1,
$isd7:1,
$iscC:1,
"%":"MozNamedAttrMap|NamedNodeMap"},
pZ:{
"^":"U+bF;",
$isE:1,
$asE:function(){return[W.aT]},
$isab:1},
q2:{
"^":"pZ+fg;",
$isE:1,
$asE:function(){return[W.aT]},
$isab:1},
mY:{
"^":"bu;a,b,c",
bi:function(a,b,c,d){var z=new W.jU(0,this.a,this.b,W.kb(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.fH()
return z},
fR:function(a,b,c){return this.bi(a,null,b,c)}},
jU:{
"^":"u0;a,b,c,d,e",
eN:function(){if(this.b==null)return
this.ka()
this.b=null
this.d=null
return},
ir:function(a,b){if(this.b==null)return;++this.a
this.ka()},
iq:function(a){return this.ir(a,null)},
fY:function(){if(this.b==null||this.a<=0)return;--this.a
this.fH()},
fH:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.nM(x,this.c,z,this.e)}},
ka:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.nN(x,this.c,z,this.e)}}},
fg:{
"^":"o;",
gax:function(a){return new W.pc(a,this.gn(a),-1,null)},
H:function(a,b){throw H.l(new P.ae("Cannot add to immutable List."))},
bU:function(a,b,c){throw H.l(new P.ae("Cannot add to immutable List."))},
aH:function(a,b,c,d,e){throw H.l(new P.ae("Cannot setRange on immutable List."))},
aF:function(a,b,c,d){throw H.l(new P.ae("Cannot modify an immutable List."))},
$isE:1,
$asE:null,
$isab:1},
pc:{
"^":"o;a,b,c,d",
a9:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.e(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gas:function(){return this.d}},
vl:{
"^":"o;a",
gbH:function(a){return W.mW(this.a.top)},
$isU:1,
static:{mW:function(a){if(a===window)return a
else return new W.vl(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
zi:{
"^":"d5;",
$isU:1,
"%":"SVGAElement"},
zk:{
"^":"uj;",
$isU:1,
"%":"SVGAltGlyphElement"},
zn:{
"^":"an;",
$isU:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
zZ:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFEBlendElement"},
A_:{
"^":"an;aa:type=,M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFEColorMatrixElement"},
A0:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFEComponentTransferElement"},
A1:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFECompositeElement"},
A2:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFEConvolveMatrixElement"},
A3:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFEDiffuseLightingElement"},
A4:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFEDisplacementMapElement"},
A5:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFEFloodElement"},
A6:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFEGaussianBlurElement"},
A7:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFEImageElement"},
A8:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFEMergeElement"},
A9:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFEMorphologyElement"},
Aa:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFEOffsetElement"},
Ab:{
"^":"an;G:x=,F:y=,S:z=",
"%":"SVGFEPointLightElement"},
Ac:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFESpecularLightingElement"},
Ad:{
"^":"an;G:x=,F:y=,S:z=",
"%":"SVGFESpotLightElement"},
Ae:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFETileElement"},
Af:{
"^":"an;aa:type=,M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFETurbulenceElement"},
Ai:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGFilterElement"},
Aj:{
"^":"d5;M:height=,N:width=,G:x=,F:y=",
"%":"SVGForeignObjectElement"},
ps:{
"^":"d5;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
d5:{
"^":"an;",
$isU:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
Ay:{
"^":"d5;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGImageElement"},
AR:{
"^":"an;",
$isU:1,
"%":"SVGMarkerElement"},
AS:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGMaskElement"},
Bo:{
"^":"an;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGPatternElement"},
Bt:{
"^":"U;n:length=",
E:function(a){return a.length.$0()},
"%":"SVGPointList"},
BA:{
"^":"ps;M:height=,N:width=,G:x=,F:y=",
"%":"SVGRectElement"},
BE:{
"^":"an;aa:type=",
$isU:1,
"%":"SVGScriptElement"},
BP:{
"^":"an;aa:type=",
"%":"SVGStyleElement"},
an:{
"^":"cd;",
gaE:function(a){return H.p(new P.l0(a,new W.mV(a)),[W.cd])},
$isU:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGTitleElement|SVGVKernElement;SVGElement"},
BS:{
"^":"d5;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGSVGElement"},
BT:{
"^":"an;",
$isU:1,
"%":"SVGSymbolElement"},
mr:{
"^":"d5;",
"%":";SVGTextContentElement"},
BX:{
"^":"mr;",
$isU:1,
"%":"SVGTextPathElement"},
uj:{
"^":"mr;G:x=,F:y=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
C3:{
"^":"d5;M:height=,N:width=,G:x=,F:y=",
$isU:1,
"%":"SVGUseElement"},
CI:{
"^":"an;",
$isU:1,
"%":"SVGViewElement"},
D1:{
"^":"an;",
$isU:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
D6:{
"^":"an;",
$isU:1,
"%":"SVGCursorElement"},
D7:{
"^":"an;",
$isU:1,
"%":"SVGFEDropShadowElement"},
D8:{
"^":"an;",
$isU:1,
"%":"SVGGlyphRefElement"},
D9:{
"^":"an;",
$isU:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":""}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
op:{
"^":"o;"},
m9:{
"^":"o;",
$isop:1}}],["","",,P,{
"^":"",
D3:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
D4:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
X:function(a,b){if(typeof a!=="number")throw H.l(P.aD(a))
if(typeof b!=="number")throw H.l(P.aD(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0&&C.d.gfQ(b)||C.d.gfP(b))return b
return a}return a},
I:function(a,b){var z
if(typeof a!=="number")throw H.l(P.aD(a))
if(typeof b!=="number")throw H.l(P.aD(b))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(C.d.gfP(b))return b
return a}if(b===0)z=a===0?1/a<0:a<0
else z=!1
if(z)return b
return a},
y2:function(a){return Math.log(H.v(a))},
vI:{
"^":"o;",
aw:function(a){if(a<=0||a>4294967296)throw H.l(P.m0("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
P:function(){return Math.random()}},
vW:{
"^":"o;a,b",
cF:function(){var z,y,x,w,v,u
z=this.a
y=4294901760*z
x=(y&4294967295)>>>0
w=55905*z
v=(w&4294967295)>>>0
u=v+x+this.b
z=(u&4294967295)>>>0
this.a=z
this.b=(C.a.al(w-v+(y-x)+(u-z),4294967296)&4294967295)>>>0},
aw:function(a){var z,y,x
if(a<=0||a>4294967296)throw H.l(P.m0("max must be in range 0 < max \u2264 2^32, was "+a))
z=a-1
if((a&z)>>>0===0){this.cF()
return(this.a&z)>>>0}do{this.cF()
y=this.a
x=y%a}while(y-x+a>=4294967296)
return x},
P:function(){this.cF()
var z=this.a
this.cF()
return((z&67108863)*134217728+(this.a&134217727))/9007199254740992},
n9:function(a){var z,y,x,w,v,u,t,s
z=J.K(a,0)?-1:0
do{y=J.y(a)
x=y.T(a,4294967295)
y=y.l(a,x)
if(typeof y!=="number")return y.ar()
y=C.b.al(y,4294967296)
w=(y&4294967295)>>>0
a=C.b.al(y-w,4294967296)
if(typeof x!=="number")return x.u()
v=((~x&4294967295)>>>0)+(x<<21>>>0)
u=(v&4294967295)>>>0
w=(~w>>>0)+((w<<21|x>>>11)>>>0)+C.a.al(v-u,4294967296)&4294967295
v=((u^(u>>>24|w<<8))>>>0)*265
x=(v&4294967295)>>>0
w=((w^w>>>24)>>>0)*265+C.a.al(v-x,4294967296)&4294967295
v=((x^(x>>>14|w<<18))>>>0)*21
x=(v&4294967295)>>>0
w=((w^w>>>14)>>>0)*21+C.a.al(v-x,4294967296)&4294967295
x=(x^(x>>>28|w<<4))>>>0
w=(w^w>>>28)>>>0
v=(x<<31>>>0)+x
u=(v&4294967295)>>>0
y=C.a.al(v-u,4294967296)
v=this.a*1037
t=(v&4294967295)>>>0
this.a=t
s=(this.b*1037+C.a.al(v-t,4294967296)&4294967295)>>>0
this.b=s
t=(t^u)>>>0
this.a=t
y=(s^w+((w<<31|x>>>1)>>>0)+y&4294967295)>>>0
this.b=y}while(a!==z)
if(y===0&&t===0)this.a=23063
this.cF()
this.cF()
this.cF()
this.cF()},
static:{b3:function(a){var z=new P.vW(0,0)
z.n9(a)
return z}}}}],["","",,P,{
"^":"",
mH:function(a,b,c){return J.km(a,b,c)},
uC:function(a){throw H.l(new P.ae("Uint64List not supported by dart2js."))},
pd:function(a,b,c){a.toString
H.cr(a,b,c)
return new Float32Array(a,b)},
cp:{
"^":"o;",
$isE:1,
$asE:function(){return[P.x]},
$isab:1},
i6:{
"^":"o;",
$isE:1,
$asE:function(){return[P.x]},
$isab:1},
jz:{
"^":"o;",
$isE:1,
$asE:function(){return[P.x]},
$isab:1},
fb:{
"^":"o;",
$isE:1,
$asE:function(){return[P.a3]},
$isab:1}}],["","",,H,{
"^":"",
k:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.l(P.aD("Invalid length "+H.m(a)))
return a},
cr:function(a,b,c){if(typeof b!=="number"||Math.floor(b)!==b)throw H.l(P.aD("Invalid view offsetInBytes "+H.m(b)))
if(c!=null&&(typeof c!=="number"||Math.floor(c)!==c))throw H.l(P.aD("Invalid view length "+H.m(c)))},
n:function(a){var z,y,x,w,v
z=J.O(a)
if(!!z.$iscC)return a
y=z.gn(a)
if(typeof y!=="number")return H.b(y)
x=Array(y)
x.fixed$length=Array
y=x.length
w=0
while(!0){v=z.gn(a)
if(typeof v!=="number")return H.b(v)
if(!(w<v))break
v=z.h(a,w)
if(w>=y)return H.a(x,w)
x[w]=v;++w}return x},
fq:function(a,b,c){H.cr(a,b,c)
return new Float32Array(a,b)},
r0:function(a){return new Float32Array(a)},
r1:function(a){return new Int32Array(a)},
lC:function(a){return new Int8Array(a)},
r2:function(a){return new Uint16Array(a)},
r4:function(a){return new Uint32Array(a)},
ft:function(a){return new Uint8Array(a)},
iD:{
"^":"U;",
ad:function(a,b,c){H.cr(a,b,c)
return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
dT:function(a,b,c){H.cr(a,b,c)
return c==null?new Uint32Array(a,b):new Uint32Array(a,b,c)},
$isiD:1,
$iskE:1,
"%":"ArrayBuffer"},
fs:{
"^":"U;am:buffer=,kT:byteOffset=",
o5:function(a,b,c){if(typeof b!=="number"||Math.floor(b)!==b)throw H.l(P.ea(b,null,"Invalid list position"))
else throw H.l(P.aA(b,0,c,null,null))},
fs:function(a,b,c){if(b>>>0!==b||b>c)this.o5(a,b,c)},
c4:function(a,b,c,d){this.fs(a,b,d)
if(c==null)return d
this.fs(a,c,d)
if(J.F(b,c))throw H.l(P.aA(b,0,c,null,null))
return c},
$isfs:1,
"%":";ArrayBufferView;iE|lD|lF|fr|lE|lG|ch"},
B5:{
"^":"fs;",
$isom:1,
"%":"DataView"},
iE:{
"^":"fs;",
gn:function(a){return a.length},
k0:function(a,b,c,d,e){var z,y,x
z=a.length
this.fs(a,b,z)
this.fs(a,c,z)
if(J.F(b,c))throw H.l(P.aA(b,0,c,null,null))
y=J.h(c,b)
if(J.K(e,0))throw H.l(P.aD(e))
x=d.length
if(typeof e!=="number")return H.b(e)
if(typeof y!=="number")return H.b(y)
if(x-e<y)throw H.l(new P.aY("Not enough elements"))
if(e!==0||x!==y)d=d.subarray(e,e+y)
a.set(d,b)},
E:function(a){return this.gn(a).$0()},
$isd7:1,
$iscC:1},
fr:{
"^":"lF;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.T(H.aU(a,b))
return a[b]},
k:function(a,b,c){if(b>>>0!==b||b>=a.length)H.T(H.aU(a,b))
a[b]=c},
aH:function(a,b,c,d,e){if(!!J.O(d).$isfr){this.k0(a,b,c,d,e)
return}this.iS(a,b,c,d,e)},
cC:function(a,b,c,d){return this.aH(a,b,c,d,0)}},
lD:{
"^":"iE+bF;",
$isE:1,
$asE:function(){return[P.a3]},
$isab:1},
lF:{
"^":"lD+l1;"},
ch:{
"^":"lG;",
k:function(a,b,c){if(b>>>0!==b||b>=a.length)H.T(H.aU(a,b))
a[b]=c},
aH:function(a,b,c,d,e){if(!!J.O(d).$isch){this.k0(a,b,c,d,e)
return}this.iS(a,b,c,d,e)},
cC:function(a,b,c,d){return this.aH(a,b,c,d,0)},
$isE:1,
$asE:function(){return[P.x]},
$isab:1},
lE:{
"^":"iE+bF;",
$isE:1,
$asE:function(){return[P.x]},
$isab:1},
lG:{
"^":"lE+l1;"},
r_:{
"^":"fr;",
b5:function(a,b,c){return new Float32Array(a.subarray(b,this.c4(a,b,c,a.length)))},
$isE:1,
$asE:function(){return[P.a3]},
$isab:1,
"%":"Float32Array"},
B6:{
"^":"fr;",
b5:function(a,b,c){return new Float64Array(a.subarray(b,this.c4(a,b,c,a.length)))},
$isE:1,
$asE:function(){return[P.a3]},
$isab:1,
"%":"Float64Array"},
B7:{
"^":"ch;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.T(H.aU(a,b))
return a[b]},
b5:function(a,b,c){return new Int16Array(a.subarray(b,this.c4(a,b,c,a.length)))},
$isE:1,
$asE:function(){return[P.x]},
$isab:1,
"%":"Int16Array"},
B8:{
"^":"ch;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.T(H.aU(a,b))
return a[b]},
b5:function(a,b,c){return new Int32Array(a.subarray(b,this.c4(a,b,c,a.length)))},
$isE:1,
$asE:function(){return[P.x]},
$isab:1,
"%":"Int32Array"},
B9:{
"^":"ch;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.T(H.aU(a,b))
return a[b]},
b5:function(a,b,c){return new Int8Array(a.subarray(b,this.c4(a,b,c,a.length)))},
$isE:1,
$asE:function(){return[P.x]},
$isab:1,
"%":"Int8Array"},
Ba:{
"^":"ch;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.T(H.aU(a,b))
return a[b]},
b5:function(a,b,c){return new Uint16Array(a.subarray(b,this.c4(a,b,c,a.length)))},
$isE:1,
$asE:function(){return[P.x]},
$isab:1,
"%":"Uint16Array"},
r3:{
"^":"ch;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.T(H.aU(a,b))
return a[b]},
b5:function(a,b,c){return new Uint32Array(a.subarray(b,this.c4(a,b,c,a.length)))},
$isE:1,
$asE:function(){return[P.x]},
$isab:1,
"%":"Uint32Array"},
Bb:{
"^":"ch;",
gn:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.T(H.aU(a,b))
return a[b]},
b5:function(a,b,c){return new Uint8ClampedArray(a.subarray(b,this.c4(a,b,c,a.length)))},
E:function(a){return this.gn(a).$0()},
$isE:1,
$asE:function(){return[P.x]},
$isab:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
iF:{
"^":"ch;",
gn:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.T(H.aU(a,b))
return a[b]},
b5:function(a,b,c){return new Uint8Array(a.subarray(b,this.c4(a,b,c,a.length)))},
E:function(a){return this.gn(a).$0()},
$isiF:1,
$iscp:1,
$isE:1,
$asE:function(){return[P.x]},
$isab:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
nF:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,A,{
"^":"",
td:function(){if($.$get$by().h(0,"sphere")!=null)return
$.$get$df().k(0,"bvh",E.wB())
$.$get$df().k(0,"grid",E.wD())
$.$get$df().k(0,"kdtree",E.wE())
$.$get$df().k(0,"bruteforce",E.wC())
$.$get$dJ().k(0,"environment",K.wL())
$.$get$dJ().k(0,"orthographic",K.wM())
$.$get$dJ().k(0,"perspective",K.wN())
$.$get$fw().k(0,"image",R.wW())
$.$get$cH().k(0,"box",S.wX())
$.$get$cH().k(0,"gaussian",S.wY())
$.$get$cH().k(0,"sinc",S.wZ())
$.$get$cH().k(0,"mitchell",S.x_())
$.$get$cH().k(0,"triangle",S.x0())
$.$get$bb().k(0,"ambientocclusion",U.yG())
$.$get$bb().k(0,"diffuseprt",U.yH())
$.$get$bb().k(0,"directlighting",U.yJ())
$.$get$bb().k(0,"glossyprt",U.yK())
$.$get$bb().k(0,"igi",U.yL())
$.$get$bb().k(0,"irradiancecache",U.yM())
$.$get$bb().k(0,"path",U.yN())
$.$get$bb().k(0,"photonmap",U.nJ())
$.$get$bb().k(0,"exphotonmap",U.nJ())
$.$get$bb().k(0,"whitted",U.yP())
$.$get$bb().k(0,"useprobes",U.yO())
$.$get$bb().k(0,"dipolesubsurface",U.yI())
$.$get$ci().k(0,"distant",O.xX())
$.$get$ci().k(0,"point",O.y_())
$.$get$ci().k(0,"spot",O.y1())
$.$get$ci().k(0,"infinite",O.xZ())
$.$get$ci().k(0,"goniometric",O.xY())
$.$get$ci().k(0,"projection",O.y0())
$.$get$ew().k(0,"diffuse",O.nD())
$.$get$ew().k(0,"area",O.nD())
$.$get$bl().k(0,"glass",D.y6())
$.$get$bl().k(0,"kdsubsurface",D.y7())
$.$get$bl().k(0,"matte",D.y8())
$.$get$bl().k(0,"measured",D.y9())
$.$get$bl().k(0,"metal",D.ya())
$.$get$bl().k(0,"mirror",D.yb())
$.$get$bl().k(0,"plastic",D.yc())
$.$get$bl().k(0,"shinymetal",D.yd())
$.$get$bl().k(0,"substrate",D.ye())
$.$get$bl().k(0,"subsurface",D.yf())
$.$get$bl().k(0,"translucent",D.yg())
$.$get$bl().k(0,"uber",D.yh())
$.$get$dK().k(0,"linear",F.yk())
$.$get$dK().k(0,"random",F.yl())
$.$get$dK().k(0,"tile",F.ym())
$.$get$cj().k(0,"adaptive",U.yn())
$.$get$cj().k(0,"bestcandidate",U.yo())
$.$get$cj().k(0,"halton",U.yp())
$.$get$cj().k(0,"lowdiscrepancy",U.yq())
$.$get$cj().k(0,"random",U.yr())
$.$get$cj().k(0,"stratified",U.ys())
$.$get$by().k(0,"cone",M.yt())
$.$get$by().k(0,"cylinder",M.yu())
$.$get$by().k(0,"disk",M.yv())
$.$get$by().k(0,"heightfield",M.yw())
$.$get$by().k(0,"hyperboloid",M.yx())
$.$get$by().k(0,"loopsubdiv",M.yy())
$.$get$by().k(0,"nurbs",M.yz())
$.$get$by().k(0,"paraboloid",M.yA())
$.$get$by().k(0,"sphere",M.yB())
$.$get$by().k(0,"trianglemesh",M.yC())
$.$get$bk().k(0,"bilerp",G.yQ())
$.$get$bm().k(0,"bilerp",G.yR())
$.$get$bk().k(0,"checkerboard",G.yS())
$.$get$bm().k(0,"checkerboard",G.yT())
$.$get$bk().k(0,"constant",G.wT())
$.$get$bm().k(0,"constant",G.wU())
$.$get$bk().k(0,"dots",G.yU())
$.$get$bm().k(0,"dots",G.yV())
$.$get$bk().k(0,"fbm",G.yW())
$.$get$bm().k(0,"fbm",G.yX())
$.$get$bk().k(0,"imagemap",G.yY())
$.$get$bm().k(0,"imagemap",G.yZ())
$.$get$bk().k(0,"marble",G.z_())
$.$get$bm().k(0,"marble",G.z0())
$.$get$bk().k(0,"mix",G.z1())
$.$get$bm().k(0,"mix",G.z2())
$.$get$bk().k(0,"scale",G.z3())
$.$get$bm().k(0,"scale",G.z4())
$.$get$bk().k(0,"uv",G.z5())
$.$get$bm().k(0,"uv",G.z6())
$.$get$bk().k(0,"windy",G.z7())
$.$get$bm().k(0,"windy",G.z8())
$.$get$bk().k(0,"wrinkled",G.z9())
$.$get$bm().k(0,"wrinkled",G.za())
$.$get$ex().k(0,"emission",S.zd())
$.$get$ex().k(0,"single",S.ze())
$.$get$dL().k(0,"exponential",B.zf())
$.$get$dL().k(0,"homogeneous",B.zg())
$.$get$dL().k(0,"volumegrid",B.zh())},
kJ:{
"^":"o;a,b,c,d,e,f,r,jV:x<,y,z,Q,ch,cx",
qX:function(a,b){var z,y,x,w,v,u
H.bQ()
$.aL=$.bs
new P.bT(null,null).bP(0)
z=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[G.bi])),[G.bi])
this.b=b
if(b!=null){b.toString
w=P.a5()
v=b.a
if(v===!0)w.k(0,"quickRender",v)
v=b.b
if(v!=null)w.k(0,"resolutionScale",v)
v=b.c
if(v!=null)w.k(0,"samplingMode",v)
v=b.d
if(v!=null)w.k(0,"filter",P.av(["name",v,"params",b.e.ct()]))
v=b.f
if(v!=null)w.k(0,"film",P.av(["name",v,"params",b.r.ct()]))
v=b.x
if(v!=null)w.k(0,"pixelSampler",P.av(["name",v,"params",b.y.ct()]))
v=b.z
if(v!=null)w.k(0,"sampler",P.av(["name",v,"params",b.Q.ct()]))
v=b.ch
if(v!=null)w.k(0,"accelerator",P.av(["name",v,"params",b.cx.ct()]))
v=b.cy
if(v!=null)w.k(0,"renderer",P.av(["name",v,"params",b.db.ct()]))
v=b.dx
if(v!=null)w.k(0,"surfaceIntegrator",P.av(["name",v,"params",b.dy.ct()]))
v=b.fr
if(v!=null)w.k(0,"volumeIntegrator",P.av(["name",v,"params",b.fx.ct()]))
v=b.fy
if(v!=null)w.k(0,"camera",P.av(["name",v,"params",b.go.ct()]))
v="OVERRIDES: "+P.iv(w)
$.t.$2(4,v)}try{y=new A.rh(this,this.a)
y.qI(a).ai(new A.oC(this,z))}catch(u){v=H.ap(u)
x=v
v="EXCEPTION: "+H.m(x)
$.t.$2(2,v)
z.c8(x)}return z.gkC()},
qk:function(){for(var z=0;z<2;++z)if((this.f&C.a.W(1,z))!==0)this.e.a[z]=G.Z(null,null)},
rf:function(a,b,c,d){var z,y,x,w
for(z=0;z<2;++z)if((this.f&C.a.W(1,z))!==0){y=this.e.a
x=y[z]
w=new Float32Array(3)
if(0>=3)return H.a(w,0)
w[0]=b
if(1>=3)return H.a(w,1)
w[1]=c
if(2>=3)return H.a(w,2)
w[2]=d
y[z]=J.d(x,G.cQ(new G.r(w)))}},
ra:function(a,b){var z
for(z=0;z<2;++z)if((this.f&C.a.W(1,z))!==0)this.e.a[z]=G.Z(b,null)},
pL:function(a){var z,y
for(z=0;z<2;++z)if((this.f&C.a.W(1,z))!==0){y=this.e.a
y[z]=J.d(y[z],G.Z(a,null))}},
r5:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
for(z=0;z<2;++z)if((this.f&C.a.W(1,z))!==0){y=this.e.a
x=y[z]
w=new Float32Array(3)
v=new G.r(w)
if(0>=3)return H.a(w,0)
w[0]=c
if(1>=3)return H.a(w,1)
w[1]=d
if(2>=3)return H.a(w,2)
w[2]=e
u=v.w(0,v.E(0))
if(typeof b!=="number")return H.b(b)
v=0.017453292519943295*b
t=Math.sin(v)
s=Math.cos(v)
r=G.bH()
w=u.gG(u)
v=u.gG(u)
q=u.gG(u)
p=u.gG(u)
o=r.a
n=o.length
if(0>=n)return H.a(o,0)
o[0]=w*v+(1-q*p)*s
p=u.gG(u)
q=u.gF(u)
v=1-s
w=u.gS(u)
if(1>=n)return H.a(o,1)
o[1]=p*q*v-w*t
w=u.gG(u)
q=u.gS(u)
p=u.gF(u)
if(2>=n)return H.a(o,2)
o[2]=w*q*v+p*t
if(3>=n)return H.a(o,3)
o[3]=0
p=u.gG(u)
q=u.gF(u)
w=u.gS(u)
if(4>=n)return H.a(o,4)
o[4]=p*q*v+w*t
w=u.gF(u)
q=u.gF(u)
p=u.gF(u)
m=u.gF(u)
if(5>=n)return H.a(o,5)
o[5]=w*q+(1-p*m)*s
m=u.gF(u)
p=u.gS(u)
q=u.gG(u)
if(6>=n)return H.a(o,6)
o[6]=m*p*v-q*t
if(7>=n)return H.a(o,7)
o[7]=0
q=u.gG(u)
p=u.gS(u)
m=u.gF(u)
if(8>=n)return H.a(o,8)
o[8]=q*p*v-m*t
m=u.gF(u)
p=u.gS(u)
q=u.gG(u)
if(9>=n)return H.a(o,9)
o[9]=m*p*v+q*t
q=u.gS(u)
v=u.gS(u)
p=u.gS(u)
m=u.gS(u)
if(10>=n)return H.a(o,10)
o[10]=q*v+(1-p*m)*s
if(11>=n)return H.a(o,11)
o[11]=0
if(12>=n)return H.a(o,12)
o[12]=0
if(13>=n)return H.a(o,13)
o[13]=0
if(14>=n)return H.a(o,14)
o[14]=0
if(15>=n)return H.a(o,15)
o[15]=1
y[z]=J.d(x,G.Z(r,G.fo(r)))}},
lq:function(a,b,c,d){var z,y
for(z=0;z<2;++z)if((this.f&C.a.W(1,z))!==0){y=this.e.a
y[z]=J.d(y[z],G.eH(b,c,d))}},
qA:function(a,b,c,d,e,f,g,h,i){var z,y,x,w,v,u,t,s,r,q,p,o,n
for(z=0;z<2;++z)if((this.f&C.a.W(1,z))!==0){y=this.e.a
x=y[z]
w=new Float32Array(3)
if(0>=3)return H.a(w,0)
w[0]=a
if(1>=3)return H.a(w,1)
w[1]=b
if(2>=3)return H.a(w,2)
w[2]=c
v=new Float32Array(3)
if(0>=3)return H.a(v,0)
v[0]=d
if(1>=3)return H.a(v,1)
v[1]=e
if(2>=3)return H.a(v,2)
v[2]=f
u=new Float32Array(3)
t=new G.r(u)
if(0>=3)return H.a(u,0)
u[0]=g
if(1>=3)return H.a(u,1)
u[1]=h
if(2>=3)return H.a(u,2)
u[2]=i
s=G.bH()
u=w[0]
r=s.a
q=r.length
if(3>=q)return H.a(r,3)
r[3]=u
u=w[1]
if(7>=q)return H.a(r,7)
r[7]=u
u=w[2]
if(11>=q)return H.a(r,11)
r[11]=u
if(15>=q)return H.a(r,15)
r[15]=1
w=new G.j(v).l(0,new G.j(w))
p=w.w(0,w.E(0))
t=G.aF(t.w(0,t.E(0)),p)
o=t.w(0,t.E(0))
n=G.aF(p,o)
r[0]=o.gG(o)
r[4]=o.gF(o)
r[8]=o.gS(o)
r[12]=0
t=n.a
w=t.length
if(0>=w)return H.a(t,0)
r[1]=t[0]
if(1>=w)return H.a(t,1)
r[5]=t[1]
if(2>=w)return H.a(t,2)
r[9]=t[2]
r[13]=0
r[2]=p.gG(p)
r[6]=p.gF(p)
r[10]=p.gS(p)
r[14]=0
y[z]=J.d(x,G.Z(new G.aJ(new Float32Array(H.n(r))).fO(),s))}},
rN:[function(a,b){var z=this.x
z.f=b
z.e=a},"$2","gb0",4,0,71],
rn:function(){this.d=2
for(var z=0;z<2;++z)this.e.a[z]=G.Z(null,null)
this.f=3
this.r.k(0,"world",this.e)},
ki:function(){var z=this.y
P.a5()
P.a5()
P.a5()
this.z.push(new A.fe(P.ip(z.a,null,null),P.ip(z.b,null,null),G.lK(z.c),z.d,P.ip(z.e,null,null),z.f,G.lK(z.r),z.x,z.y))
this.Q.push(A.jt(this.e))
this.ch.push(this.f)},
kj:function(){var z,y
z=this.z
y=z.length
if(y===0){$.t.$2(1,"Unmatched attributeEnd() encountered. Ignoring it.")
return}if(0>=y)return H.a(z,0)
this.y=z.pop()
z=this.Q
if(0>=z.length)return H.a(z,0)
this.e=z.pop()
z=this.ch
if(0>=z.length)return H.a(z,0)
this.f=z.pop()},
rd:function(){var z,y
z=this.Q
y=z.length
if(y===0){$.t.$2(1,"Unmatched pbrtTransformEnd() encountered. Ignoring it.")
return}if(0>=y)return H.a(z,0)
this.e=z.pop()
z=this.ch
if(0>=z.length)return H.a(z,0)
this.f=z.pop()},
lB:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
if(!this.e.qw()){z=G.aC(this.e.h(0,0))
y=this.jG(b,z,G.Z(z.b,z.a),this.y.y,c)
if(y==null)return
x=this.jd(c)
c.ap()
w=!J.i(this.y.x,"")?this.od(this.y.x,this.e.h(0,0),this.y.r,y):null
v=$.aN
$.aN=v+1
u=new G.ei(y,x,w,v)}else{if(!J.i(this.y.x,""))$.t.$2(1,"Ignoring currently set area light when creating animated shape")
t=G.Z(null,null)
y=this.jG(b,t,t,this.y.y,c)
if(y==null)return
x=this.jd(c)
c.ap()
v=this.e.h(0,0)
s=G.Z(v.gan(),v.a)
v=this.e.h(0,1)
r=G.Z(v.gan(),v.a)
v=this.x
q=G.hq(s,v.a,r,v.b)
v=$.aN
$.aN=v+1
p=new G.ei(y,x,null,v)
if(!y.b_()){o=[]
p.cN(o)
v=o.length
if(v===0)return
p=v>1?E.ky(o,1,2):o[0]}v=G.ks(q)
n=$.aN
$.aN=n+1
u=new G.mu(p,v,n)
w=null}v=this.x
if(v.r1!=null){if(w!=null)$.t.$2(1,"Area lights not supported with object instancing")
v.r1.push(u)}else{v.k2.push(u)
if(w!=null)v.k1.push(w)}},
qG:function(a){var z,y,x,w,v,u,t,s,r
z=this.x
if(z.r1!=null){$.t.$2(1,"ObjectInstance can't be called inside instance definition")
return}y=z.k4
if(!y.O(a)){z="Unable to find instance named '"+H.m(a)+"'"
$.t.$2(1,z)
return}x=y.h(0,a)
y=x.length
if(y===0)return
if(y<=1){if(0>=y)return H.a(x,0)
y=!x[0].b_()}else y=!0
if(y){w=this.fC(z.ch,x,z.cx)
if(w==null)w=this.fC("bvh",x,new G.A([],[],[],[],[],[],[],[],[]))
if(w==null)$.t.$2(3,"Unable to create 'bvh' accelerator");(x&&C.c).sn(x,0)
x.push(w)}y=this.e.h(0,0)
v=G.Z(y.gan(),y.a)
y=this.e.h(0,1)
u=G.Z(y.gan(),y.a)
t=G.hq(v,z.a,u,z.b)
if(0>=x.length)return H.a(x,0)
y=x[0]
s=G.ks(t)
r=$.aN
$.aN=r+1
z.k2.push(new G.mu(y,s,r))},
ro:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3
z={}
for(y=this.z,x=this.Q;y.length!==0;){$.t.$2(1,"Missing end to pbrtAttributeBegin()")
if(0>=y.length)return H.a(y,0)
y.pop()
if(0>=x.length)return H.a(x,0)
x.pop()}for(;x.length!==0;){$.t.$2(1,"Missing end to pbrtTransformBegin()")
if(0>=x.length)return H.a(x,0)
x.pop()}y=this.x
w=this.og(y.c,y.d)
v=this.of(y.e,y.f,w,y.r)
if(v==null)$.t.$2(3,"Unable to create film.")
u=this.oe(y.fy,y.go,y.id,y.a,y.b,v)
if(u==null)$.t.$2(3,"Unable to create camera.")
t=y.cy
s=y.db
x=this.b
if(x!=null&&x.cy!=null){t=x.cy
s=x.db}x=J.O(t)
if(x.B(t,"createprobes")){r=this.jH(y.dx,y.dy)
if(r==null)$.t.$2(3,"Unable to create surface integrator.")
q=this.jI(y.fr,y.fx)
if(q==null)$.t.$2(3,"Unable to create volume integrator.")
p=s.bo("directlighting",!0)
o=s.bo("indirectlighting",!0)
n=s.V("lmax",4)
m=s.V("indirectsamples",512)
l=s.bA("bounds")
if(l!=null){x=J.D(l)
if(!J.i(x.gn(l),6)){$.t.$2(1,"Expecting six values [x0 y0 z0 x1 y1 z1] for bounds")
k=null}else{j=x.h(l,0)
i=x.h(l,1)
h=x.h(l,2)
g=new G.j(new Float32Array(H.k(3)))
g.C(j,i,h)
h=x.h(l,3)
i=x.h(l,4)
x=x.h(l,5)
j=new G.j(new Float32Array(H.k(3)))
j.C(h,i,x)
k=G.a9(g,j)}}else k=null
f=s.m("samplespacing",1)
e=new Y.oA(r,q,u,n,m,k,p,o,s.m("time",0),f,s.bp("filename","probes.out"))
s.ap()
if(y.k1.length===0)$.t.$2(1,"No light sources defined in scene; possibly rendering a black image.")}else if(x.B(t,"surfacepoints")){d=u.gfK().bI(u.gaZ(),$.$get$ey())
x=u.b
c=s.m("minsampledistance",0.25)
b=s.bp("filename","")
if(G.fE()===!0)c=J.d(c,4)
e=new Y.mo(c,x,d,b,[])
s.ap()}else if(x.B(t,"aggregatetest")){x=y.k2
e=Y.o5(s.V("niters",1e5),x)
s.ap()}else if(x.B(t,"metropolis")){x=y.r2
j=y.rx
a=s.m("largestepprobability",0.25)
a0=s.V("samplesperpixel",100)
a1=s.V("bootstrapsamples",1e5)
a2=s.V("directsamples",4)
a3=s.bo("dodirectseparately",!0)
a4=s.V("maxconsecutiverejects",512)
a5=s.V("maxdepth",7)
a6=s.bo("bidirectional",!0)
if(G.fE()===!0){a0=P.I(1,J.ac(a0,4))
a1=P.I(1,J.ac(a1,4))
a2=P.I(1,J.ac(a2,4))}e=new Y.qW(x,j,u,a6,a2,a0,a5,null,a1,a4,null)
x=P.I(1,G.aX(J.aW(J.d(a,a0))))
e.x=x
if(typeof a0!=="number")return H.b(a0)
if(x>=a0&&x>1){x=C.b.al(x,2)
e.x=x}if(C.b.R(a0,x)!==0){x=a0+(x-C.b.R(a0,x))
e.f=x
x="Rounding up to "+H.m(x)+" Metropolis samples per pixel (from "+H.m(a0)+")"
$.t.$2(1,x)}e.Q=a3===!0?$.$get$bb().h(0,"directlighting").$1(G.c1(P.av(["int maxdepth",[a5],"string strategy",["all"]]))):null
s.ap()
if(y.k1.length===0)$.t.$2(1,"No light sources defined in scene; possibly rendering a black image.")}else{if(!x.B(t,"sampler")){x="Renderer type '"+H.m(t)+"' unknown. Using 'sampler'."
$.t.$2(1,x)}s.ap()
a7=this.ok(y.x,y.y)
a8=this.ol(y.z,y.Q,u.gb0(),u,a7)
if(a8==null)$.t.$2(3,"Unable to create sampler.")
r=this.jH(y.dx,y.dy)
if(r==null)$.t.$2(3,"Unable to create surface integrator.")
q=this.jI(y.fr,y.fx)
if(q==null)$.t.$2(3,"Unable to create volume integrator.")
e=new Y.ts(y.r2,y.rx,a8,u,r,q)
if(y.k1.length===0)$.t.$2(1,"No light sources defined in scene; possibly rendering a black image.")}x=y.k3
j=x.length
if(j===0)a9=null
else if(j===1){if(0>=j)return H.a(x,0)
a9=x[0]}else a9=G.o7(x)
b0=this.fC(y.ch,y.k2,y.cx)
if(b0==null)b0=this.fC("bvh",y.k2,new G.A([],[],[],[],[],[],[],[],[]))
if(b0==null)$.t.$2(3,"Unable to create 'bvh' accelerator.")
j=y.k1
b1=new G.tu(b0,P.aE(j,!0,G.cD),a9,null)
i=b0.aA()
b1.d=i
if(a9!=null){h=a9.aA()
b1.d=G.bK(i).bk(h)}C.c.sn(y.k2,0)
C.c.sn(j,0)
C.c.sn(x,0)
z.a=null
b2=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
z.a=b2.a
this.a.rl().ai(new A.oF(z,this,e,b1,b2))
y=new A.fe(P.a5(),P.a5(),new G.A([],[],[],[],[],[],[],[],[]),null,P.a5(),null,new G.A([],[],[],[],[],[],[],[],[]),"",null)
y.d="matte"
y.y=!1
this.y=y
this.d=1
for(b3=0;b3<2;++b3)this.e.a[b3]=G.Z(null,null)
this.f=3
this.r.di(0)
return z.a},
jG:function(a,b,c,d,e){var z,y,x
z=$.$get$by().h(0,a)
if(z==null){y="Shape '"+H.m(a)+"' unknown."
$.t.$2(1,y)
return}x=z.$4(b,c,d,e)
e.ap()
return x},
jd:function(a){var z,y,x
z=this.y
y=new G.a6(z.a,z.b,a,z.c)
if(!J.i(z.f,"")){z=this.y
z=z.e.O(z.f)}else z=!1
if(z){z=this.y
x=z.e.h(0,z.f)}else x=null
if(x==null)x=this.eH(this.y.d,this.e.h(0,0),y)
if(x==null)x=this.eH("matte",this.e.h(0,0),y)
if(x==null)$.t.$2(3,"Unable to create 'matte' material?!")
return x},
eH:function(a,b,c){var z,y,x,w,v,u,t,s
if(J.i(a,"mix")){z=c.c
y=z.aO("namedmaterial1",c.d.aO("namedmaterial1",""))
x=z.aO("namedmaterial2",c.d.aO("namedmaterial2",""))
w=this.y.e.h(0,y)
v=this.y.e.h(0,x)
if(w==null){u="Named material '"+H.m(y)+"' undefined.  Using 'matte'"
$.t.$2(1,u)
w=this.eH("matte",this.e.h(0,0),c)}if(v==null){u="Named material '"+H.m(x)+"' undefined.  Using 'matte'"
$.t.$2(1,u)
v=this.eH("matte",this.e.h(0,0),c)}t=c.ac("amount",G.q(0.5))
z.ap()
c.d.ap()
return new D.qZ(w,v,t)}if($.$get$bl().h(0,a)==null){z="Material '"+H.m(a)+"' unknown."
$.t.$2(1,z)
return}s=$.$get$bl().h(0,a).$2(b,c)
c.c.ap()
c.d.ap()
return s},
oh:function(a,b,c){var z,y
if($.$get$bk().h(0,a)==null){z="Texture '"+H.m(a)+"' unknown."
$.t.$2(1,z)
return new G.cc(c.ie("value",1))}y=$.$get$bk().h(0,a).$2(b,c)
c.c.ap()
c.d.ap()
return y},
om:function(a,b,c){var z,y
if($.$get$bm().h(0,a)==null){z="Texture '"+H.m(a)+"' unknown."
$.t.$2(1,z)
return new G.cc(c.kA("value",G.q(1)))}y=$.$get$bm().h(0,a).$2(b,c)
c.c.ap()
c.d.ap()
return y},
oi:function(a,b,c){var z,y
if($.$get$ci().h(0,a)==null){z="Light '"+H.m(a)+"' unknown."
$.t.$2(1,z)
return}y=$.$get$ci().h(0,a).$2(b,c)
c.ap()
return y},
od:function(a,b,c,d){var z,y
if($.$get$ew().h(0,a)==null){z="Area Light '"+H.m(a)+"' unknown."
$.t.$2(1,z)
return}y=$.$get$ew().h(0,a).$3(b,c,d)
c.ap()
return y},
on:function(a,b,c){var z,y
if($.$get$dL().h(0,a)==null){z="Volume Region '"+H.m(a)+"' unknown."
$.t.$2(1,z)
return}y=$.$get$dL().h(0,a).$2(b,c)
c.ap()
return y},
jH:function(a,b){var z,y
z=this.b
if(z!=null&&z.fr!=null){a=z.dx
b=z.dy}if($.$get$bb().h(0,a)==null){z="Surface Integrator '"+H.m(a)+"' unknown."
$.t.$2(1,z)
return}y=$.$get$bb().h(0,a).$1(b)
b.ap()
return y},
jI:function(a,b){var z,y
z=this.b
if(z!=null&&z.fr!=null){a=z.fr
b=z.fx}if($.$get$ex().h(0,a)==null){z="Volume Integrator '"+H.m(a)+"' unknown."
$.t.$2(1,z)
return}y=$.$get$ex().h(0,a).$1(b)
b.ap()
return y},
fC:function(a,b,c){var z,y
z=this.b
if(z!=null&&z.ch!=null){a=z.ch
c=z.cx}if($.$get$df().h(0,a)==null){z="Accelerator '"+H.m(a)+"' unknown."
$.t.$2(1,z)
return}y=$.$get$df().h(0,a).$2(b,c)
c.ap()
return y},
oe:function(a,b,c,d,e,f){var z,y,x
z=this.b
if(z!=null&&z.fy!=null){a=z.fy
b=z.go}if($.$get$dJ().h(0,a)==null){z="Camera '"+H.m(a)+"' unknown."
$.t.$2(1,z)
return}y=G.hq(G.aC(c.h(0,0)),d,G.aC(c.h(0,1)),e)
x=$.$get$dJ().h(0,a).$3(b,y,f)
b.ap()
return x},
ok:function(a,b){var z,y
z=this.b
if(z!=null&&z.x!=null){a=z.x
b=z.y}if($.$get$dK().h(0,a)==null){z="PixelSampler '"+H.m(a)+"' unknown."
$.t.$2(1,z)
return}y=$.$get$dK().h(0,a).$1(b)
b.ap()
return y},
ol:function(a,b,c,d,e){var z,y,x,w,v
z=this.b
if(z!=null&&z.z!=null){a=z.z
b=z.Q}if($.$get$cj().h(0,a)==null){z="Sampler '"+H.m(a)+"' unknown."
$.t.$2(1,z)
return}y=[0,0,0,0]
c.iF(y)
z=this.x
G.fd(y[1]-y[0],y[3]-y[2],z.r2,z.rx,y)
x=y[1]-y[0]
w=y[3]-y[2]
z="SAMPLER: "+H.m(a)+" ["+H.m(y[0])+", "+H.m(y[2])+", "+H.m(x)+", "+H.m(w)+"]"
$.t.$2(0,z)
v=$.$get$cj().h(0,a).$7(b,y[0],y[2],x,w,d,e)
b.ap()
return v},
og:function(a,b){var z,y
z=this.b
if(z!=null&&z.d!=null){a=z.d
b=z.e}if($.$get$cH().h(0,a)==null){z="Filter '"+H.m(a)+"' unknown."
$.t.$2(1,z)
return}y=$.$get$cH().h(0,a).$1(b)
b.ap()
return y},
of:function(a,b,c,d){var z,y
z=this.b
if(z!=null&&z.f!=null){a=z.f
b=z.r}if($.$get$fw().h(0,a)==null){z="Film '"+H.m(a)+"' unknown."
$.t.$2(1,z)
return}y=$.$get$fw().h(0,a).$3(b,c,d)
b.ap()
return y}},
oC:{
"^":"z:0;a,b",
$1:function(a){this.b.aB(0,this.a.c)}},
oF:{
"^":"z:0;a,b,c,d,e",
$1:function(a){var z,y,x,w
try{y=this.c.ea(this.d)
this.a.a=y
x=this.e
y.ai(new A.oD(this.b,x)).dV(new A.oE(x))}catch(w){x=H.ap(w)
z=x
this.e.c8(z)}}},
oD:{
"^":"z:61;a,b",
$1:function(a){this.a.c=a
this.b.aM(0)}},
oE:{
"^":"z:0;a",
$1:function(a){this.a.c8(a)}},
fe:{
"^":"o;a,b,c,d,e,f,r,x,y"},
lL:{
"^":"o;o4:a<,b,c,d,nr:e<,f",
aJ:function(){var z,y,x,w,v
this.b=""
this.f=""
z=this.a
while(!0){y=this.d
x=J.O(y)
if(!(x.B(y,32)||x.B(y,9)||x.B(y,10)||x.B(y,13)))break
if(J.i(this.d,10))++C.c.gcQ(z).c
this.d=this.aX()}if(J.i(this.d,0)){this.e=-1
return-1}if(J.i(this.d,34)){z=this.aX()
this.d=z
while(!0){if(!(!J.i(z,34)&&!J.i(this.d,0)))break
z=this.b
y=H.cl(this.d)
if(z==null)return z.j()
this.b=z+y
y=this.aX()
this.d=y
z=y}this.f=this.b
this.e=-10
this.d=this.aX()
return this.e}if(J.i(this.d,39)){z=this.aX()
this.d=z
while(!0){if(!(!J.i(z,39)&&!J.i(this.d,0)))break
z=this.b
y=H.cl(this.d)
if(z==null)return z.j()
this.b=z+y
y=this.aX()
this.d=y
z=y}this.f=this.b
this.e=-10
this.d=this.aX()
return this.e}if(this.o7(this.d)){this.b=H.cl(this.d)
z=this.aX()
this.d=z
while(!0){if(!J.i(z,0)){z=this.d
y=J.y(z)
if(!(y.av(z,97)&&y.ab(z,122)))x=y.av(z,65)&&y.ab(z,90)
else x=!0
if(!x)z=y.av(z,48)&&y.ab(z,57)
else z=!0}else z=!1
if(!(z||J.i(this.d,46)||J.i(this.d,95)))break
z=this.b
y=H.cl(this.d)
if(z==null)return z.j()
this.b=z+y
y=this.aX()
this.d=y
z=y}this.f=this.b
this.e=-4
return-4}if(J.i(this.d,45)){z=this.jP()
y=J.y(z)
z=!(y.av(z,48)&&y.ab(z,57))&&!J.i(this.jP(),46)}else z=!1
if(z){this.e=45
this.f=H.cl(this.d)
return this.e}if(!J.i(this.d,45)){z=this.d
y=J.y(z)
z=y.av(z,48)&&y.ab(z,57)||J.i(this.d,46)}else z=!0
if(z){w=""
do{w+=H.cl(this.d)
z=this.aX()
this.d=z
if(J.i(z,101)||J.i(this.d,96)){w+=H.cl(this.d)
z=this.aX()
this.d=z
if(J.i(z,43)||J.i(this.d,45)){w+=H.cl(this.d)
this.d=this.aX()}}if(!J.i(this.d,0)){z=this.d
y=J.y(z)
z=y.av(z,48)&&y.ab(z,57)||J.i(this.d,46)}else z=!1}while(z)
this.f=w
this.c=H.c2(w,null)
this.e=-5
return-5}if(J.i(this.d,35)){do{z=this.aX()
this.d=z}while(!J.i(z,0)&&!J.i(this.d,10)&&!J.i(this.d,13))
if(!J.i(this.d,0)){z=this.aJ()
this.e=z
return z}}if(J.i(this.d,0)){this.e=-1
return-1}v=this.d
this.f=H.cl(v)
this.d=this.aX()
z=J.O(v)
if(z.B(v,61)&&J.i(this.d,61)){this.d=this.aX()
this.f="=="
this.e=-6
return-6}else if(z.B(v,33)&&J.i(this.d,61)){this.d=this.aX()
this.f="!="
this.e=-7
return-7}else if(z.B(v,124)&&J.i(this.d,124)){this.d=this.aX()
this.f="||"
this.e=-8
return-8}else if(z.B(v,38)&&J.i(this.d,38)){this.d=this.aX()
this.f="&&"
this.e=-9
return-9}this.e=v
return v},
aX:function(){var z,y,x
z=this.a
y=C.c.gcQ(z)
x=y.d
y=J.a0(y.a)
if(typeof y!=="number")return H.b(y)
if(x>=y){y=z.length
if(y===1)return 0
if(0>=y)return H.a(z,0)
z.pop()}z=C.c.gcQ(z)
return J.e(z.a,z.d++)},
jP:function(){var z,y,x,w,v,u
z=this.a
y=z.length
for(x=y>0,w=y-1;x;){if(w<0||w>=z.length)return H.a(z,w)
v=z[w]
u=v.d
v=J.a0(v.a)
if(typeof v!=="number")return H.b(v)
if(!(u>=v)){if(w>=z.length)return H.a(z,w)
x=z[w]
return J.e(x.a,x.d)}}return 0},
o7:function(a){var z=J.y(a)
if(!(z.av(a,97)&&z.ab(a,122)))z=z.av(a,65)&&z.ab(a,90)
else z=!0
return z}},
k_:{
"^":"o;a,b,c,d"},
rh:{
"^":"o;a,b",
qI:function(a){var z,y,x
z=new P.bT(null,null)
H.bQ()
$.aL=$.bs
z.bP(0)
y="LOADING Scene "+H.m(a)
$.t.$2(0,y)
x=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
this.b.l5(a).ai(new A.rt(this,a,z,x))
return x.a},
jE:function(a){var z,y
z=J.D(a)
y=z.f_(a,"/")
if(y===-1)y=z.f_(a,"\\")
if(y!==-1)a=z.ev(a,y+1)
return a==="scene.pbrt"||a==="scene.pbrt.z"||a==="scene.pbrt.gz"||a==="scene.pbrt.bz2"},
jB:function(a){return J.dr(a).c9(a,".zip")||C.i.c9(a,".tar")||C.i.c9(a,".tgz")||C.i.c9(a,".tbz")||C.i.c9(a,".tar.gz")||C.i.c9(a,".tar.bz2")},
jF:function(a,b){var z,y,x,w,v,u,t,s
z=[]
y=new A.lL(z,null,null,32,null,null)
z.push(new A.k_(a,b,0,0))
x=[]
w=[]
z=new P.a2(0,$.Q,null)
z.$builtinTypeInfo=[null]
v=new P.al(z)
v.$builtinTypeInfo=[null]
y.aJ()
for(;!J.i(y.e,-1);){u=this.jO(y,x)
if(u==null){y.aJ()
continue}if(J.aI(u.h(0,"name"))==="include"){t=u.h(0,"value")
if(!this.a.a.c.O(t)){z="LOADING INCLUDE "+H.m(t)
$.t.$2(4,z)
s=this.a.a.l5(t)
x.push(s)
w.push(u.h(0,"value"))
s.ai(new A.rk(this,u,t))}}}if(x.length!==0)P.fc(x,null,!1).ai(new A.rl(this,v)).dV(new A.rm(v))
else{z=v.a
if(z.a!==0)H.T(new P.aY("Future already completed"))
z.d8(null)}return v.a},
ot:function(a,b){var z,y,x,w,v
w="PARSING FILE "+H.m(b)
$.t.$2(4,w)
z=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
w=[]
w.push(new A.k_(a,b,0,0))
y=new A.lL(w,null,null,32,null,null)
try{G.pi(new A.ro(this,y)).ai(new A.rp(z)).dV(new A.rq(z))}catch(v){w=H.ap(v)
x=w
z.c8(x)
w="EXCEPTION: "+H.m(x)
$.t.$2(2,w)}return z.gkC()},
or:function(a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(J.i(a4.gnr(),-1))return
z=this.jO(a4,null)
if(z==null){a4.aJ()
k=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
k.aM(0)
return k.a}y=J.aI(J.e(z,"name"))
x=null
try{switch(y){case"accelerator":j=this.a
i=J.e(z,"type")
h=J.e(z,"params")
j=j.x
j.ch=i
j.cx=h
break
case"activetransform":if(J.i(J.e(z,"type"),"StartTime"))this.a.f=1
else if(J.i(J.e(z,"type"),"EndTime"))this.a.f=2
else if(J.i(J.e(z,"type"),"All"))this.a.f=3
break
case"arealightsource":j=this.a
i=J.e(z,"type")
h=J.e(z,"params")
j=j.y
j.x=i
j.r=h
break
case"attributebegin":this.a.ki()
break
case"attributeend":this.a.kj()
break
case"camera":j=this.a
i=J.e(z,"type")
h=J.e(z,"params")
g=j.x
g.fy=i
g.go=h
h=A.ux(j.e)
g.id=h
j.r.k(0,"camera",h)
break
case"coordinatesystem":j=this.a
j.r.k(0,J.e(z,"type"),j.e)
break
case"coordsystransform":j=this.a
i=J.e(z,"type")
h=j.r
if(h.O(i))j.e=A.jt(h.h(0,i))
else{j="Couldn't find named coordinate system '"+H.m(i)+"'"
$.t.$2(1,j)}break
case"concattransform":if(!z.O("values")||!J.i(J.a0(J.e(z,"values")),16)){j="ConcatTransform requires 16 values, "+H.m(J.a0(J.e(z,"values")))+" found."
$.t.$2(1,j)}else{w=J.e(z,"values")
v=G.fo(new G.aJ(new Float32Array(H.n(w))))
this.a.pL(v)}break
case"film":j=this.a
i=J.e(z,"type")
j=j.x
j.f=J.e(z,"params")
j.e=i
break
case"ident":case"identity":this.a.qk()
break
case"lightsource":j=this.a
i=J.e(z,"type")
h=J.e(z,"params")
f=j.oi(i,j.e.h(0,0),h)
if(f==null){j="pbrtLightSource: light type '"+H.m(i)+"' unknown."
$.t.$2(1,j)}else j.x.k1.push(f)
break
case"lookat":if(!z.O("values")||!J.i(J.a0(J.e(z,"values")),9))$.t.$2(1,"LookAt requires 9 values")
else{u=J.e(z,"values")
this.a.qA(J.e(u,0),J.e(u,1),J.e(u,2),J.e(u,3),J.e(u,4),J.e(u,5),J.e(u,6),J.e(u,7),J.e(u,8))}break
case"makenamedmaterial":j=this.a
i=J.e(z,"id")
h=J.e(z,"params")
g=j.y
e=g.c
d=h.aO("type",e.aO("type",""))
if(J.f_(d)===!0)$.t.$2(1,"No parameter string 'type' found in MakeNamedMaterial")
else{c=j.eH(d,j.e.h(0,0),new G.a6(g.a,g.b,h,e))
if(c!=null)j.y.e.k(0,i,c)}break
case"material":j=this.a
i=J.e(z,"type")
h=J.e(z,"params")
j=j.y
j.d=i
j.c=h
j.f=""
break
case"namedmaterial":j=this.a
i=J.e(z,"type")
j.y.f=i
break
case"objectbegin":j=this.a
i=J.e(z,"type")
j.ki()
j=j.x
if(j.r1!=null)$.t.$2(1,"ObjectBegin called inside of instance definition")
h=j.k4
h.k(0,i,H.p([],[G.bI]))
j.r1=h.h(0,i)
break
case"objectend":j=this.a
i=j.x
if(i.r1==null)$.t.$2(1,"ObjectEnd called outside of instance definition")
i.r1=null
j.kj()
break
case"objectinstance":this.a.qG(J.e(z,"type"))
break
case"pixelfilter":j=this.a
i=J.e(z,"type")
h=J.e(z,"params")
j=j.x
j.c=i
j.d=h
break
case"renderer":j=this.a
i=J.e(z,"type")
h=J.e(z,"params")
j=j.x
j.cy=i
j.db=h
break
case"reverseorientation":j=this.a.y
j.y=!j.y
break
case"rotate":if(!z.O("values")||!J.i(J.a0(J.e(z,"values")),4))$.t.$2(1,"Rotate requires 4 values")
else{t=J.e(z,"values")
this.a.r5(0,J.e(t,0),J.e(t,1),J.e(t,2),J.e(t,3))}break
case"pixels":j=this.a
i=J.e(z,"type")
h=J.e(z,"params")
j=j.x
j.x=i
j.y=h
break
case"sampler":j=this.a
i=J.e(z,"type")
h=J.e(z,"params")
j=j.x
j.z=i
j.Q=h
break
case"scale":if(!z.O("values")||!J.i(J.a0(J.e(z,"values")),3))$.t.$2(1,"Scale requires 3 values")
else{s=J.e(z,"values")
this.a.lq(0,J.e(s,0),J.e(s,1),J.e(s,2))}break
case"shape":this.a.lB(0,J.e(z,"type"),J.e(z,"params"))
break
case"surfaceintegrator":j=this.a
i=J.e(z,"type")
h=J.e(z,"params")
j=j.x
j.dx=i
j.dy=h
break
case"texture":j=this.a
i=J.e(z,"id")
h=J.e(z,"type")
g=J.e(z,"class")
e=J.e(z,"params")
b=j.y
a=new G.a6(b.a,b.b,e,e)
e=J.O(h)
if(e.B(h,"float")){if(j.y.a.O(i)){h="Texture '"+H.m(i)+"' being redefined"
$.t.$2(1,h)}a0=j.oh(g,j.e.h(0,0),a)
if(a0!=null)j.y.a.k(0,i,a0)}else if(e.B(h,"color")||e.B(h,"spectrum")){if(j.y.b.O(i)){h="Texture '"+H.m(i)+"' being redefined"
$.t.$2(1,h)}a1=j.om(g,j.e.h(0,0),a)
if(a1!=null)j.y.b.k(0,i,a1)}else{j="Texture type '"+H.m(h)+"' unknown."
$.t.$2(1,j)}break
case"translate":if(!z.O("values")||!J.i(J.a0(J.e(z,"values")),3))$.t.$2(1,"Translate requires 3 values")
else{r=J.e(z,"values")
this.a.rf(0,J.e(r,0),J.e(r,1),J.e(r,2))}break
case"transform":if(!z.O("values")||!J.i(J.a0(J.e(z,"values")),16))$.t.$2(1,"Transform requires 16 values")
else{q=J.e(z,"values")
p=G.cg(J.e(q,0),J.e(q,4),J.e(q,8),J.e(q,12),J.e(q,1),J.e(q,5),J.e(q,9),J.e(q,13),J.e(q,2),J.e(q,6),J.e(q,10),J.e(q,14),J.e(q,3),J.e(q,7),J.e(q,11),J.e(q,15))
this.a.ra(0,p)}break
case"transformbegin":j=this.a
j.Q.push(A.jt(j.e))
j.ch.push(j.f)
break
case"transformend":this.a.rd()
break
case"transformtimes":if(!z.O("values")||!J.i(J.a0(J.e(z,"values")),2))$.t.$2(1,"TransformTimes requires 2 values")
else{o=J.e(z,"values")
j=this.a
i=J.e(o,0)
h=J.e(o,1)
j=j.x
j.a=i
j.b=h}break
case"volume":j=this.a
i=J.e(z,"type")
h=J.e(z,"params")
a2=j.on(i,j.e.h(0,0),h)
if(a2!=null)j.x.k3.push(a2)
break
case"volumeintegrator":j=this.a
i=J.e(z,"type")
h=J.e(z,"params")
j=j.x
j.fr=i
j.fx=h
break
case"worldbegin":this.a.rn()
break
case"worldend":x=this.a.ro()
break
case"include":n=J.e(z,"value")
j="INCLUDE "+H.m(n)
$.t.$2(0,j)
if(!this.jB(n)){m=this.a.a.h5(J.e(z,"value"))
j=m
i=H.c7(j,"$isE",[P.x],"$asE")
if(i){j=J.e(z,"value")
a4.go4().push(new A.k_(m,j,0,0))}else{j="MISSING include: "+H.m(J.e(z,"value"))
$.t.$2(1,j)}}break
default:j="UNHANDLED command "+H.m(J.e(z,"name"))
$.t.$2(1,j)
break}}catch(a3){j=H.ap(a3)
l=j
j="EXCEPTION: "+H.m(l)
$.t.$2(2,j)}if(x==null){k=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
k.aM(0)
x=k.a}return x},
jO:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
if(!J.i(a.e,-4))return
z=P.a5()
z.k(0,"name",a.f)
y=J.aI(z.h(0,"name"))
if(y==="include"){a.aJ()
z.k(0,"value",a.f)
return z}if(y==="activetransform"){a.aJ()
z.k(0,"type",a.f)
a.aJ()
return z}x=[]
if(y==="texture"){a.aJ()
z.k(0,"id",a.f)
a.aJ()
z.k(0,"type",a.f)
a.aJ()
z.k(0,"class",a.f)
w=a.aJ()}else if(y==="makenamedmaterial"){a.aJ()
z.k(0,"id",a.f)
w=a.aJ()}else{w=a.aJ()
v=J.O(w)
if(v.B(w,-4))return z
if(v.B(w,-10)){z.k(0,"type",a.f)
w=a.aJ()}else if(v.B(w,91)){u=[]
w=a.aJ()
while(!0){if(!(!J.i(w,93)&&!J.i(a.e,-1)))break
v=a.c
if(v!=null)u.push(v)
else u.push(a.f)
w=a.aJ()}z.k(0,"values",u)}else if(v.B(w,-5)){u=[a.c]
w=a.aJ()
while(!0){if(!(J.i(w,-5)&&!J.i(a.e,-1)))break
u.push(a.c)
w=a.aJ()}z.k(0,"values",u)}}while(!0){if(!(J.i(w,-10)&&!J.i(a.e,-1)))break
t=a.f
if(J.i(a.aJ(),91)){s=[]
w=a.aJ()
while(!0){if(!(!J.i(w,93)&&!J.i(a.e,-1)))break
s.push(a.f)
w=a.aJ()}r=s}else r=[a.f]
q=t.split(" ")
C.c.pd(q,new A.rn(),!0)
v=q.length
if(v!==2){v=a.a
v=H.m(C.c.gcQ(v).b)+" ["+C.c.gcQ(v).c+"]: Expected Parameter \"Type Name\", found: \""+t+"\""
$.t.$2(1,v)
return z}if(0>=v)return H.a(q,0)
p=q[0]
if(1>=v)return H.a(q,1)
x.push(P.av(["type",p,"name",q[1],"value",r]))
w=a.aJ()}if(x.length!==0)z.k(0,"params",this.oz(x,b))
else z.k(0,"params",new G.A([],[],[],[],[],[],[],[],[]))
return z},
oz:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=[]
y=[]
x=[]
w=[]
v=[]
u=new G.A(z,y,x,[],[],[],[],w,v)
for(t=a.length,s=0;s<a.length;a.length===t||(0,H.aw)(a),++s){r=a[s]
switch(r.h(0,"type")){case"float":q=r.h(0,"value")
p=J.D(q)
o=p.gn(q)
if(typeof o!=="number")return H.b(o)
n=0
for(;n<o;++n)p.k(q,n,H.c2(p.h(q,n),null))
m=J.aI(r.h(0,"name"))
u.i0(m)
x.push(new G.aB(m,q,!1))
break
case"integer":q=r.h(0,"value")
p=J.D(q)
o=p.gn(q)
if(typeof o!=="number")return H.b(o)
n=0
for(;n<o;++n)p.k(q,n,H.lS(p.h(q,n),null,null))
m=J.aI(r.h(0,"name"))
u.i1(m)
y.push(new G.aB(m,q,!1))
break
case"rgb":case"color":q=r.h(0,"value")
p=J.D(q)
o=p.gn(q)
if(typeof o!=="number")return H.b(o)
n=0
for(;n<o;++n)p.k(q,n,H.c2(p.h(q,n),null))
u.kf(r.h(0,"name"),q)
break
case"point":q=r.h(0,"value")
p=J.D(q)
o=p.gn(q)
if(typeof o!=="number")return H.b(o)
n=0
for(;n<o;++n)p.k(q,n,H.c2(p.h(q,n),null))
u.eL(r.h(0,"name"),q)
break
case"normal":q=r.h(0,"value")
p=J.D(q)
o=p.gn(q)
if(typeof o!=="number")return H.b(o)
n=0
for(;n<o;++n)p.k(q,n,H.c2(p.h(q,n),null))
u.fJ(r.h(0,"name"),q)
break
case"vector":q=r.h(0,"value")
p=J.D(q)
o=p.gn(q)
if(typeof o!=="number")return H.b(o)
n=0
for(;n<o;++n)p.k(q,n,H.c2(p.h(q,n),null))
u.kg(r.h(0,"name"),q)
break
case"string":p=r.h(0,"name")
l=r.h(0,"value")
m=J.aI(p)
u.i2(m)
w.push(new G.aB(m,l,!1))
break
case"texture":p=r.h(0,"name")
l=r.h(0,"value")
m=J.aI(p)
u.q5(m)
v.push(new G.aB(m,l,!1))
break
case"spectrum":q=r.h(0,"value")
p=J.D(q)
if(p.gbd(q)){l=p.h(q,0)
if(typeof l==="string")u.px(r.h(0,"name"),q,b)
else{if(J.bW(p.gn(q),2)!==0){l="Non-even number of values given with sampled spectrum parameter \""+H.m(r.h(0,"name"))+"\". Ignoring extra."
$.t.$2(1,l)}o=p.gn(q)
if(typeof o!=="number")return H.b(o)
n=0
for(;n<o;++n)p.k(q,n,H.c2(p.h(q,n),null))
u.pw(r.h(0,"name"),q)}}break
case"xyz":q=r.h(0,"value")
p=J.D(q)
o=p.gn(q)
if(typeof o!=="number")return H.b(o)
n=0
for(;n<o;++n)p.k(q,n,H.c2(p.h(q,n),null))
u.kh(r.h(0,"name"),q)
break
case"blackbody":q=r.h(0,"value")
p=J.D(q)
if(p.gbd(q)){o=p.gn(q)
if(typeof o!=="number")return H.b(o)
n=0
for(;n<o;++n)p.k(q,n,H.c2(p.h(q,n),null))
u.ps(r.h(0,"name"),q)}break
case"bool":q=r.h(0,"value")
p=J.D(q)
o=p.gn(q)
if(typeof o!=="number")return H.b(o)
n=0
for(;n<o;++n)if(J.aI(p.h(q,n))==="false")p.k(q,n,!1)
else if(J.aI(p.h(q,n))==="true")p.k(q,n,!0)
else{l="Invalid boolean value \""+H.m(p.h(q,n))+"\"."
$.t.$2(1,l)
p.k(q,n,!1)}m=J.aI(r.h(0,"name"))
u.kw(m)
z.push(new G.aB(m,q,!1))
break
default:p="Unhandled parameter type "+H.m(r.h(0,"type"))
$.t.$2(1,p)
break}}return u},
hp:function(a,b){var z,y,x,w,v,u,t,s
if(!this.jB(a))return b
try{if(J.bX(a,".tgz")||J.bX(a,".tar.gz")){b=new T.l5().b6(T.b5(b,0,null,0),!1)
a=J.c(a,".tar")}else if(J.bX(a,".tbz")||J.bX(a,".tar.bz2")){b=new T.kB(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,-1,0,0,null,null,null,null,null,0,null).b6(T.b5(b,1,null,0),!1)
a=J.c(a,".tar")}if(J.bX(a,".zip")){u="Decoding Zip Archive: "+H.m(a)
$.t.$2(0,u)
z=new T.uZ(null).b6(T.b5(b,0,null,0),!1)
b=null
for(u=J.kp(z),u=new J.dw(u,u.length,0,null),t=this.b.c;u.a9();){y=u.d
this.hp(J.at(y),J.e7(y))
if(this.jE(J.at(y)))b=J.e7(y)
t.k(0,J.at(y),J.e7(y))}}else if(J.bX(a,".tar")){u="Decoding Tar Archive: "+H.m(a)
$.t.$2(0,u)
x=new T.uh([]).b6(T.b5(b,0,null,0),!1)
b=null
for(u=J.kp(x),u=new J.dw(u,u.length,0,null),t=this.b.c;u.a9();){w=u.d
if(this.jE(J.at(w)))b=J.e7(w)
t.k(0,J.at(w),J.e7(w))}}}catch(s){u=H.ap(s)
v=u
u="EXCEPTION: "+H.m(v)
$.t.$2(2,u)}return b}},
rt:{
"^":"z:19;a,b,c,d",
$1:function(a){var z,y,x,w
z={}
z.a=a
y=this.a
x=this.b
a=y.hp(x,a)
z.a=a
w="FINISHED Loading "+H.m(x)+". Scanning for includes."
$.t.$2(4,w)
y.jF(a,x).ai(new A.rs(z,y,x,this.c,this.d))}},
rs:{
"^":"z:0;a,b,c,d,e",
$1:function(a){$.t.$2(4,"FINISHED Includes.")
this.b.ot(this.a.a,this.c).ai(new A.rr(this.d,this.e))}},
rr:{
"^":"z:0;a,b",
$1:function(a){var z=this.a
z.lG(0)
z="FINISHED Parsing Scene: "+P.bN(0,0,J.ac(J.d(z.gbz(),1e6),$.aL),0,0,0).K(0)
$.t.$2(0,z)
this.b.aM(0)}},
rk:{
"^":"z:19;a,b,c",
$1:function(a){var z
this.a.hp(this.c,a)
z="FINISHED LOADING INCLUDE "+H.m(this.b.h(0,"value"))
$.t.$2(4,z)}},
rl:{
"^":"z:20;a,b",
$1:function(a){var z,y,x,w,v,u
$.t.$2(4,"LOADING SUB-INCLUDES")
z=[]
y=J.D(a)
if(y.gbd(a)){x=this.a
w=0
while(!0){v=y.gn(a)
if(typeof v!=="number")return H.b(v)
if(!(w<v))break
u=y.h(a,w)
if(u!=null&&J.bE(u))z.push(x.jF(u,"@"));++w}y=this.b
P.fc(z,null,!1).ai(new A.ri(y)).dV(new A.rj(y))}else this.b.aM(0)}},
ri:{
"^":"z:20;a",
$1:function(a){$.t.$2(4,"FINISHED SUB-INCLUDES")
this.a.aM(0)}},
rj:{
"^":"z:0;a",
$1:function(a){$.t.$2(2,a)
this.a.c8(a)}},
rm:{
"^":"z:0;a",
$1:function(a){var z=J.ct(a)
$.t.$2(2,z)
this.a.c8(a)}},
ro:{
"^":"z:1;a,b",
$0:function(){return this.a.or(this.b)}},
rp:{
"^":"z:0;a",
$1:function(a){this.a.aM(0)}},
rq:{
"^":"z:0;a",
$1:function(a){var z
this.a.c8(a)
z="EXCEPTION: "+H.m(a)
$.t.$2(2,z)}},
rn:{
"^":"z:0;",
$1:function(a){return J.f_(a)}},
t7:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q",
lF:function(a,b){var z,y,x
$.t=this.gob()
this.d=this.a
z=$.fD
$.fD=z+1
y=new H.cK(z,null,!1)
x=init.globalState.d
x.ez(z,y)
x.eK()
x=new H.m3(y,null)
x.iX(y)
this.r=x
this.x=b
J.bf(b,new H.dZ(y,init.globalState.d.a))
this.d=this.b
y=this.r.b
y.toString
H.p(new P.jT(y),[H.aV(y,0)]).bi(new A.ta(this),null,null,null)},
oo:function(a){var z,y,x,w,v,u,t,s,r
if(!!J.O(a).$iset){if(a.O("cmd")===!0){y=J.e(a,"cmd")
x=J.O(y)
if(x.B(y,"request")){w=J.e(a,"id")
x=this.Q
if(x.O(w)){v=x.h(0,w)
x.cX(0,w)
v.aB(0,J.e(a,"data"))}}else if(x.B(y,"render")){this.e=a.O("taskNum")===!0?J.e(a,"taskNum"):0
this.f=a.O("taskCount")===!0?J.e(a,"taskCount"):1
u=a.O("scene")===!0?J.e(a,"scene"):""
t=a.O("preview")===!0&&J.e(a,"preview")
z=null
try{if(a.O("overrides")===!0){x=J.e(a,"overrides")
s=new G.tk(!1,1,0,null,new G.A([],[],[],[],[],[],[],[],[]),null,new G.A([],[],[],[],[],[],[],[],[]),null,new G.A([],[],[],[],[],[],[],[],[]),null,new G.A([],[],[],[],[],[],[],[],[]),null,new G.A([],[],[],[],[],[],[],[],[]),null,new G.A([],[],[],[],[],[],[],[],[]),null,new G.A([],[],[],[],[],[],[],[],[]),null,new G.A([],[],[],[],[],[],[],[],[]),null,new G.A([],[],[],[],[],[],[],[],[]))
$.fF=s
if(x.O("quickRender")===!0)s.a=x.h(0,"quickRender")
if(x.O("resolutionScale")===!0)s.b=x.h(0,"resolutionScale")
if(x.O("samplingMode")===!0)s.c=x.h(0,"samplingMode")
if(x.O("filter")===!0){s.d=J.e(x.h(0,"filter"),"name")
s.e=G.c1(J.e(x.h(0,"filter"),"params"))}if(x.O("film")===!0){s.f=J.e(x.h(0,"film"),"name")
s.r=G.c1(J.e(x.h(0,"film"),"params"))}if(x.O("pixelSampler")===!0){s.x=J.e(x.h(0,"pixelSampler"),"name")
s.y=G.c1(J.e(x.h(0,"pixelSampler"),"params"))}if(x.O("sampler")===!0){s.z=J.e(x.h(0,"sampler"),"name")
s.Q=G.c1(J.e(x.h(0,"sampler"),"params"))}if(x.O("accelerator")===!0){s.ch=J.e(x.h(0,"accelerator"),"name")
s.cx=G.c1(J.e(x.h(0,"accelerator"),"params"))}if(x.O("renderer")===!0){s.cy=J.e(x.h(0,"renderer"),"name")
s.db=G.c1(J.e(x.h(0,"renderer"),"params"))}if(x.O("surfaceIntegrator")===!0){s.dx=J.e(x.h(0,"surfaceIntegrator"),"name")
s.dy=G.c1(J.e(x.h(0,"surfaceIntegrator"),"params"))}if(x.O("volumeIntegrator")===!0){s.fr=J.e(x.h(0,"volumeIntegrator"),"name")
s.fx=G.c1(J.e(x.h(0,"volumeIntegrator"),"params"))}if(x.O("camera")===!0){s.fy=J.e(x.h(0,"camera"),"name")
s.go=G.c1(J.e(x.h(0,"camera"),"params"))}}else s=null
z=s}catch(r){H.ap(r)
z=null}this.pe(u,this.e,this.f,t,z)}}}else if(J.i(a,"pause")){x="Isolate "+H.m(this.e)+"/"+H.m(this.f)+" PAUSE"
$.t.$2(0,x)}else if(J.i(a,"resume")){x="Isolate "+H.m(this.e)+"/"+H.m(this.f)+" RESUME"
$.t.$2(0,x)}else if(J.i(a,"stop")){x="Isolate "+H.m(this.e)+"/"+H.m(this.f)+" STOP"
$.t.$2(0,x)
this.d=this.c
x=this.r
x.a.dX(0)
x.b.dX(0)}},
oc:[function(a,b){var z,y
z=C.i.ev(new P.hB(Date.now(),!1).K(0),11)
y=this.x
if(a>=5)return H.a(C.Q,a)
J.bf(y,C.Q[a]+" [THREAD "+H.m(J.c(this.e,1))+"/"+H.m(this.f)+"]: "+z+" : "+H.m(b))},"$2","gob",4,0,21],
pe:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
v="RENDER THREAD STARTED "+H.m(J.c(b,1))+" / "+H.m(c)
$.t.$2(0,v)
u=new P.bT(null,null)
H.bQ()
$.aL=$.bs
u.bP(0)
z=u
v=A.js()
t=P.a5()
s=A.m4()
r=new A.fe(P.a5(),P.a5(),new G.A([],[],[],[],[],[],[],[],[]),null,P.a5(),null,new G.A([],[],[],[],[],[],[],[],[]),"",null)
r.d="matte"
r.y=!1
y=new A.kJ(this.y,null,null,1,v,3,t,s,r,[],[],[],[])
x=[0,0,0,0]
if(d===!0)y.gjV().r=new A.t8(this,b,c,x)
try{v=y
v.gjV().r2=b
v.x.rx=c
y.qX(a,e).ai(new A.t9(this,b,c,z,x))}catch(q){v=H.ap(q)
w=v
v="ERROR: "+H.m(w)
$.t.$2(2,v)
J.bf(this.x,P.av(["cmd","error","msg",J.ct(w)]))}}},
ta:{
"^":"z:0;a",
$1:function(a){this.a.oo(a)}},
t8:{
"^":"z:45;a,b,c,d",
$1:function(a){var z,y
z=J.C(a)
y=this.d
G.fd(z.gN(a),z.gM(a),this.b,this.c,y)
J.bf(this.a.x,P.av(["cmd","preview","res",[z.gN(a),z.gM(a)],"extents",y,"image",a.eo()]))}},
t9:{
"^":"z:0;a,b,c,d,e",
$1:function(a){var z,y,x
z=this.a
z.oc(0,"FINISHED: "+P.bN(0,0,J.ac(J.d(this.d.gbz(),1e6),$.aL),0,0,0).K(0))
y=this.b
x="["+H.m(y)+"] STATS:\n"+G.tY()
$.t.$2(0,x)
x=this.e
G.fd(J.d_(a),J.cZ(a),y,this.c,x)
J.bf(z.x,P.av(["cmd","final","output",a.gr0(),"res",[J.d_(a),J.cZ(a)],"extents",x]))}},
tc:{
"^":"tl;"},
tj:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,fK:id<,k1,k2,k3,k4,r1,r2,rx",
mM:function(){this.a=0
this.b=1
this.c="box"
this.e="image"
this.x="tile"
this.z="lowdiscrepancy"
this.ch="bvh"
this.cy="sampler"
this.dx="directlighting"
this.fr="emission"
this.fy="perspective"
this.r1=null
this.r2=0
this.rx=1},
static:{m4:function(){var z=new A.tj(null,null,null,new G.A([],[],[],[],[],[],[],[],[]),null,new G.A([],[],[],[],[],[],[],[],[]),null,null,new G.A([],[],[],[],[],[],[],[],[]),null,new G.A([],[],[],[],[],[],[],[],[]),null,new G.A([],[],[],[],[],[],[],[],[]),null,new G.A([],[],[],[],[],[],[],[],[]),null,new G.A([],[],[],[],[],[],[],[],[]),null,new G.A([],[],[],[],[],[],[],[],[]),null,new G.A([],[],[],[],[],[],[],[],[]),null,[],[],[],P.a5(),[],null,null)
z.mM()
return z}}},
ms:{
"^":"o;ix:a<",
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=2)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=2)return H.a(z,b)
z[b]=c},
qw:function(){var z,y,x
for(z=this.a,y=0;y<1;y=x){x=y+1
if(!J.i(z[y],z[x]))return!0}return!1},
mW:function(){var z,y
for(z=this.a,y=0;y<2;++y)z[y]=G.Z(null,null)},
mX:function(a){var z,y
z=this.a
y=a.a
z[0]=G.aC(y[0])
z[1]=G.aC(y[1])},
static:{js:function(){var z=Array(2)
z.fixed$length=Array
z=new A.ms(H.p(z,[G.H]))
z.mW()
return z},jt:function(a){var z=Array(2)
z.fixed$length=Array
z=new A.ms(H.p(z,[G.H]))
z.mX(a)
return z},ux:function(a){var z,y,x,w,v
z=A.js()
for(y=z.a,x=a.a,w=0;w<2;++w){v=x[w]
y[w]=G.Z(v.gan(),v.a)}return z}}}}],["","",,Q,{
"^":"",
Df:[function(a,b){var z,y,x,w,v,u,t
try{y=new T.tb(null,null,"",null,null,[],[],P.a5(),P.a5(),P.a5())
$.au=y
A.td()
x=A.js()
w=P.a5()
v=A.m4()
u=new A.fe(P.a5(),P.a5(),new G.A([],[],[],[],[],[],[],[],[]),null,P.a5(),null,new G.A([],[],[],[],[],[],[],[],[]),"",null)
u.d="matte"
u.y=!1
y.f=new A.kJ(y,null,null,1,x,3,w,v,u,[],[],[],[])
u=b
if(u!=null){x=new A.t7(1,2,3,null,0,1,null,null,y,C.V,P.a5())
y.r=x
x.lF(0,u)}}catch(t){y=H.ap(t)
z=y
J.bf(b,"ERROR: "+H.m(z))}},"$2","nw",4,0,91]},1],["","",,T,{
"^":"",
tb:{
"^":"tc;f,r,x,y,z,a,b,c,d,e",
kM:function(a){var z,y
z="REQUEST FILE "+H.m(a)
$.t.$2(4,z)
y=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[[P.E,P.x]])),[[P.E,P.x]])
this.oa(a).ai(new T.th(a,y)).dV(new T.ti(y))
return y.a},
oa:function(a){var z,y,x,w,v,u
z={}
z.a=a
y=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[[P.E,P.x]])),[[P.E,P.x]])
x=this.r
if(x!=null){z=P.av(["cmd","file","path",a])
w=x.z.aw(4294967295)
v=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
u=P.av(["cmd","request","id",w,"msg",z])
J.bf(x.x,u)
x.Q.k(0,w,v)
v.a.ai(new T.te(y))}else{a=this.x+"/"+H.m(a)
z.a=a
W.pH(a,"GET","text/plain; charset=x-user-defined",null,null,null,null,null).ai(new T.tf(y)).dV(new T.tg(z))}return y.a}},
th:{
"^":"z:0;a,b",
$1:function(a){var z="LOADED FILE "+H.m(this.a)
$.t.$2(4,z)
this.b.aB(0,a)}},
ti:{
"^":"z:0;a",
$1:function(a){var z=J.ct(a)
$.t.$2(2,z)
this.a.aB(0,null)}},
te:{
"^":"z:0;a",
$1:function(a){var z
if(typeof a==="string"){this.a.aB(0,new Uint8Array(H.n(C.i.gko(a))))
return}else{z=J.O(a)
if(!!z.$iskE){this.a.aB(0,z.ad(a,0,null))
return}else{z=H.c7(a,"$isE",[P.x],"$asE")
if(z){this.a.aB(0,a)
return}else $.t.$2(2,"Unknown HttpRequest response type")}}}},
tf:{
"^":"z:0;a",
$1:function(a){var z,y
z=J.nV(a)
if(typeof z==="string"){this.a.aB(0,new Uint8Array(H.n(J.nS(W.e1(a.response)))))
return}else if(!!J.O(W.e1(a.response)).$iskE){this.a.aB(0,J.hk(W.e1(a.response),0,null))
return}else{z=W.e1(a.response)
y=H.c7(z,"$isE",[P.x],"$asE")
if(y){this.a.aB(0,W.e1(a.response))
return}else $.t.$2(2,"Unknown HttpRequest response type")}}},
tg:{
"^":"z:0;a",
$1:function(a){var z="Error Loading Resource "+H.m(this.a.a)
$.t.$2(2,z)}}}],["","",,R,{
"^":"",
i3:{
"^":"d3;d,e,f,r,x,y,z,ca:Q>,bH:ch>,N:cx>,M:cy>,db,dx,dy,fr,fx,fy,a,b,c",
pv:function(a7,a8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
z=J.h(a7.a,0.5)
y=J.h(a7.b,0.5)
x=J.y(z)
w=J.dt(x.l(z,this.z.gff()))
v=J.a_(x.j(z,this.z.gff()))
x=J.y(y)
u=J.dt(x.l(y,this.z.gfg()))
t=J.a_(x.j(y,this.z.gfg()))
w=P.I(w,this.Q)
v=P.X(v,this.Q+this.cx-1)
u=P.I(u,this.ch)
t=P.X(t,this.ch+this.cy-1)
x=v-w
if(x<0||t-u<0)return
s=a8.ef().cu(0)
x=H.k(x+1)
r=new Int32Array(x)
for(q=w;q<=v;++q){if(typeof z!=="number")return H.b(z)
p=q-w
o=P.X(C.b.I(Math.floor(Math.abs((q-z)*this.z.gqu()*16))),15)
if(p>>>0!==p||p>=x)return H.a(r,p)
r[p]=o}p=H.k(t-u+1)
n=new Int32Array(p)
for(m=u;m<=t;++m){if(typeof y!=="number")return H.b(y)
o=m-u
l=P.X(C.b.I(Math.floor(Math.abs((m-y)*this.z.gqv()*16))),15)
if(o>>>0!==o||o>=p)return H.a(n,o)
n[o]=l}o=this.db.x.buffer
k=(o&&C.e).ad(o,0,null)
j=[0,0,0]
i=[0,0,0]
for(o=this.fy,l=k.length,h=s.length,m=u;m<=t;++m){g=(u*this.cx+w)*4
for(f=m-u,q=w;q<=v;++q,g+=4){if(f>>>0!==f||f>=p)return H.a(n,f)
e=n[f]
d=q-w
if(d>>>0!==d||d>=x)return H.a(r,d)
c=e*16+r[d]
d=this.fx
if(c>>>0!==c||c>=d.length)return H.a(d,c)
b=d[c]
a=(m-this.ch)*this.cx+(q-this.Q)
a0=a*3
d=this.dx
if(a0>>>0!==a0||a0>=d.length)return H.a(d,a0)
e=d[a0]
if(0>=h)return H.a(s,0)
a1=J.w(b)
a2=a1.i(b,s[0])
if(typeof a2!=="number")return H.b(a2)
d[a0]=e+a2
a2=this.dx
e=a0+1
if(e>=a2.length)return H.a(a2,e)
d=a2[e]
if(1>=h)return H.a(s,1)
a3=a1.i(b,s[1])
if(typeof a3!=="number")return H.b(a3)
a2[e]=d+a3
a3=this.dx
d=a0+2
if(d>=a3.length)return H.a(a3,d)
a2=a3[d]
if(2>=h)return H.a(s,2)
a1=a1.i(b,s[2])
if(typeof a1!=="number")return H.b(a1)
a3[d]=a2+a1
a1=this.fr
if(a>>>0!==a||a>=a1.length)return H.a(a1,a)
a2=a1[a]
if(typeof b!=="number")return H.b(b)
a1[a]=a2+b
a2=this.dx
a1=a2.length
if(a0>=a1)return H.a(a2,a0)
a3=a2[a0]
if(e>=a1)return H.a(a2,e)
a4=a2[e]
if(d>=a1)return H.a(a2,d)
G.cn(a3,a4,a2[d],j)
a2=this.fr
if(a>=a2.length)return H.a(a2,a)
a5=a2[a]
if(a5!==0){a6=1/a5
j[0]=P.I(0,j[0]*a6)
j[1]=P.I(0,j[1]*a6)
j[2]=P.I(0,j[2]*a6)}a1=this.dy
a2=a1.length
if(a0>=a2)return H.a(a1,a0)
a3=a1[a0]
if(e>=a2)return H.a(a1,e)
e=a1[e]
if(d>=a2)return H.a(a1,d)
G.cn(a3,e,a1[d],i)
d=j[0]
a1=i[0]
e=this.c
if(typeof e!=="number")return H.b(e)
a1=d+a1*e
j[0]=a1
j[1]=j[1]+i[1]*e
j[2]=j[2]+i[2]*e
a1=C.a.v(C.b.I(Math.floor(a1*255)),0,255)
if(a1>>>0!==a1||a1>=256)return H.a(o,a1)
a1=o[a1]
if(g>>>0!==g||g>=l)return H.a(k,g)
k[g]=a1
a1=g+1
e=C.a.v(C.b.I(Math.floor(j[1]*255)),0,255)
if(e>>>0!==e||e>=256)return H.a(o,e)
e=o[e]
if(a1>=l)return H.a(k,a1)
k[a1]=e
e=g+2
a1=C.a.v(C.b.I(Math.floor(j[2]*255)),0,255)
if(a1>>>0!==a1||a1>=256)return H.a(o,a1)
a1=o[a1]
if(e>=l)return H.a(k,e)
k[e]=a1
a1=g+3
if(a1>=l)return H.a(k,a1)
k[a1]=255}}x=++this.x
if(this.f!=null&&C.a.R(x,this.y)===0)this.fV(this.db)},
iO:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
if(b.bT()){$.t.$2(1,"ImageFilm ignoring splatted spectrum with NaN values")
return}z=b.ef().cu(0)
y=J.a_(a.a)
x=J.a_(a.b)
w=this.Q
if(y>=w)if(!(y-w>=this.cx)){v=this.ch
v=x<v||x-v>=this.cy}else v=!0
else v=!0
if(v)return
u=(x-this.ch)*this.cx+(y-w)
t=u*3
w=this.dy
v=w.length
if(t>>>0!==t||t>=v)return H.a(w,t)
s=w[t]
r=z.length
if(0>=r)return H.a(z,0)
w[t]=s+z[0]
s=t+1
if(s>=v)return H.a(w,s)
q=w[s]
if(1>=r)return H.a(z,1)
w[s]=q+z[1]
q=t+2
if(q>=v)return H.a(w,q)
v=w[q]
if(2>=r)return H.a(z,2)
w[q]=v+z[2]
p=[0,0,0]
o=[0,0,0]
v=this.dx
w=v.length
if(t>=w)return H.a(v,t)
r=v[t]
if(s>=w)return H.a(v,s)
n=v[s]
if(q>=w)return H.a(v,q)
G.cn(r,n,v[q],p)
v=this.fr
if(u>>>0!==u||u>=v.length)return H.a(v,u)
m=v[u]
if(m!==0){l=1/m
if(0>=p.length)return H.a(p,0)
w=P.I(0,J.d(p[0],l))
v=p.length
if(0>=v)return H.a(p,0)
p[0]=w
if(1>=v)return H.a(p,1)
v=P.I(0,J.d(p[1],l))
w=p.length
if(1>=w)return H.a(p,1)
p[1]=v
if(2>=w)return H.a(p,2)
w=P.I(0,J.d(p[2],l))
if(2>=p.length)return H.a(p,2)
p[2]=w}w=this.dy
v=w.length
if(t>=v)return H.a(w,t)
r=w[t]
if(s>=v)return H.a(w,s)
s=w[s]
if(q>=v)return H.a(w,q)
G.cn(r,s,w[q],o)
if(0>=p.length)return H.a(p,0)
q=p[0]
w=o[0]
s=this.c
if(typeof s!=="number")return H.b(s)
s=J.c(q,w*s)
w=p.length
if(0>=w)return H.a(p,0)
p[0]=s
if(1>=w)return H.a(p,1)
w=p[1]
s=o[1]
q=this.c
if(typeof q!=="number")return H.b(q)
q=J.c(w,s*q)
s=p.length
if(1>=s)return H.a(p,1)
p[1]=q
if(2>=s)return H.a(p,2)
s=p[2]
q=o[2]
w=this.c
if(typeof w!=="number")return H.b(w)
w=J.c(s,q*w)
if(2>=p.length)return H.a(p,2)
p[2]=w
w=this.db.x.buffer
k=(w&&C.e).ad(w,0,null)
j=u*4
w=this.fy
if(0>=p.length)return H.a(p,0)
q=C.a.v(J.a_(J.d(p[0],255)),0,255)
if(q>>>0!==q||q>=256)return H.a(w,q)
q=w[q]
s=k.length
if(j>=s)return H.a(k,j)
k[j]=q
q=j+1
if(1>=p.length)return H.a(p,1)
r=C.a.v(J.a_(J.d(p[1],255)),0,255)
if(r>>>0!==r||r>=256)return H.a(w,r)
r=w[r]
if(q>=s)return H.a(k,q)
k[q]=r
r=j+2
if(2>=p.length)return H.a(p,2)
q=C.a.v(J.a_(J.d(p[2],255)),0,255)
if(q>>>0!==q||q>=256)return H.a(w,q)
q=w[q]
if(r>=s)return H.a(k,r)
k[r]=q
q=j+3
if(q>=s)return H.a(k,q)
k[q]=255
q=++this.x
if(this.f!=null&&C.a.R(q,this.y)===0)this.fV(this.db)},
iF:function(a){var z,y,x
z=this.Q
y=this.z.gff()
if(typeof y!=="number")return H.b(y)
a[0]=C.b.I(Math.floor(z+0.5-y))
y=this.Q
z=this.cx
x=this.z.gff()
if(typeof x!=="number")return H.b(x)
a[1]=C.b.I(Math.ceil(y+0.5+z+x))
x=this.ch
z=this.z.gfg()
if(typeof z!=="number")return H.b(z)
a[2]=C.b.I(Math.floor(x+0.5-z))
z=this.ch
x=this.cy
y=this.z.gfg()
if(typeof y!=="number")return H.b(y)
a[3]=C.b.I(Math.ceil(z+0.5+x+y))},
ln:function(a){var z,y,x
z=this.Q
y=a.length
if(0>=y)return H.a(a,0)
a[0]=z
x=this.cx
if(1>=y)return H.a(a,1)
a[1]=z+x
x=this.ch
if(2>=y)return H.a(a,2)
a[2]=x
z=this.cy
if(3>=y)return H.a(a,3)
a[3]=x+z},
lh:function(a,b,c,d,e){if(this.f!=null)this.fV(this.db)},
ri:function(a,b,c,d){return this.lh(a,b,c,d,1)},
lk:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=[0,0,0]
y=[0,0,0]
for(x=J.w(a),w=0,v=0,u=0;u<this.cy;++u)for(t=0;t<this.cx;++t,++w,v+=3){s=this.dx
r=s.length
if(v<0||v>=r)return H.a(s,v)
q=s[v]
p=v+1
if(p>=r)return H.a(s,p)
o=s[p]
n=v+2
if(n>=r)return H.a(s,n)
G.cn(q,o,s[n],z)
s=this.fr
if(w<0||w>=s.length)return H.a(s,w)
m=s[w]
if(m!==0){l=1/m
J.u(this.r.r,v,P.I(0,z[0]*l))
J.u(this.r.r,p,P.I(0,z[1]*l))
J.u(this.r.r,n,P.I(0,z[2]*l))}s=this.dy
r=s.length
if(v>=r)return H.a(s,v)
q=s[v]
if(p>=r)return H.a(s,p)
o=s[p]
if(n>=r)return H.a(s,n)
G.cn(q,o,s[n],y)
s=this.r.r
o=J.D(s)
o.k(s,v,J.c(o.h(s,v),x.i(a,y[0])))
s=this.r.r
o=J.D(s)
o.k(s,p,J.c(o.h(s,p),x.i(a,y[1])))
p=this.r.r
s=J.D(p)
s.k(p,n,J.c(s.h(p,n),x.i(a,y[2])))}return this.r},
iC:function(){return this.lk(1)},
mj:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q
for(z=this.fy,y=0;y<256;++y)z[y]=C.a.v(C.b.I(Math.floor(Math.pow(y/255,0.45454545454545453)*255)),0,255)
z=this.a
x=this.d
w=J.D(x)
v=w.h(x,0)
if(typeof v!=="number")return H.b(v)
this.Q=C.b.I(Math.ceil(z*v))
v=w.h(x,1)
if(typeof v!=="number")return H.b(v)
this.cx=P.I(1,C.b.I(Math.ceil(z*v))-this.Q)
v=this.b
z=w.h(x,2)
if(typeof z!=="number")return H.b(z)
this.ch=C.b.I(Math.ceil(v*z))
x=w.h(x,3)
if(typeof x!=="number")return H.b(x)
x=P.I(1,C.b.I(Math.ceil(v*x))-this.ch)
this.cy=x
v=this.cx
this.y=v*12
this.dx=new Float32Array(H.k(v*x*3))
this.dy=new Float32Array(H.k(this.cx*this.cy*3))
this.fr=new Float32Array(H.k(this.cx*this.cy))
this.fx=new Float32Array(H.k(256))
for(u=0,t=0;t<16;++t){z=this.z.gfg()
if(typeof z!=="number")return H.b(z)
s=(t+0.5)*z/16
for(r=0;r<16;++r,u=q){z=this.z.gff()
if(typeof z!=="number")return H.b(z)
x=this.fx
q=u+1
z=this.z.eS((r+0.5)*z/16,s)
if(u<0||u>=x.length)return H.a(x,u)
x[u]=z}}z=U.c_(this.cx,this.cy,4)
this.db=z
z=z.x
C.x.aF(z,0,z.length,4287137928)
z="FILM "+this.Q+" "+this.ch+" "+H.m(this.cx)+" "+H.m(this.cy)
$.t.$2(0,z)
z=this.Q
x=this.ch
w=this.cx
v=this.cy
this.r=G.rd(z,x,w,v,w,v,null)
if(this.f!=null)this.fV(this.db)},
fV:function(a){return this.f.$1(a)},
static:{pO:function(a,b,c,d,e,f){var z=new R.i3(d,e,f,null,0,null,c,null,null,null,null,null,null,null,null,null,new Uint8Array(H.k(256)),a,b,1)
z.mj(a,b,c,d,e,f)
return z},pP:[function(a,b,c){var z,y,x,w
z=a.V("xresolution",640)
y=a.V("yresolution",480)
x=a.aO("filename","")
w=a.bA("cropwindow")
if(w==null)w=[0,1,0,1]
return R.pO(J.aW(J.d(z,G.m5())),J.aW(J.d(y,G.m5())),b,w,x,c)},function(a,b){return R.pP(a,b,null)},"$3","$2","wW",4,2,63,0]}}}],["","",,S,{
"^":"",
hv:{
"^":"d4;a,b,c,d",
eS:function(a,b){return 1},
static:{zu:[function(a){var z,y
z=a.m("xwidth",0.5)
y=a.m("ywidth",0.5)
if(typeof z!=="number")return H.b(z)
if(typeof y!=="number")return H.b(y)
return new S.hv(z,y,1/z,1/y)},"$1","wX",2,0,64]}},
hR:{
"^":"d4;dS:e>,f,r,a,b,c,d",
eS:function(a,b){return this.jp(a,this.f)*this.jp(b,this.r)},
jp:function(a,b){return P.I(0,Math.exp(H.v(J.d(J.d(J.M(this.e),a),a)))-b)},
static:{Al:[function(a){var z,y,x,w,v
z=a.m("xwidth",2)
y=a.m("ywidth",2)
x=a.m("alpha",2)
w=J.y(x)
v=Math.exp(H.v(J.d(J.d(w.a2(x),z),z)))
w=Math.exp(H.v(J.d(J.d(w.a2(x),y),y)))
if(typeof z!=="number")return H.b(z)
if(typeof y!=="number")return H.b(y)
return new S.hR(x,v,w,z,y,1/z,1/y)},"$1","wY",2,0,65]}},
il:{
"^":"d4;e,a,b,c,d",
eS:function(a,b){return this.k6(a*this.c)*this.k6(b*this.d)},
k6:function(a){var z,y
a=Math.abs(a)
if(a<0.00001)return 1
if(a>1)return 0
a*=3.141592653589793
z=Math.sin(H.v(a))
y=this.e
if(typeof y!=="number")return H.b(y)
y=a*y
return z/a*(Math.sin(H.v(y))/y)},
cZ:function(a,b,c){return this.e.$3(a,b,c)},
static:{AJ:[function(a){var z,y,x
z=a.m("xwidth",4)
y=a.m("ywidth",4)
x=a.m("tau",3)
if(typeof z!=="number")return H.b(z)
if(typeof y!=="number")return H.b(y)
return new S.il(x,z,y,1/z,1/y)},"$1","wZ",2,0,66]}},
iC:{
"^":"d4;e,aI:f<,a,b,c,d",
eS:function(a,b){return J.d(this.jJ(a*this.c),this.jJ(b*this.d))},
jJ:function(a){var z,y,x
a=Math.abs(2*a)
z=this.e
if(a>1){z=J.M(z)
y=this.f
if(typeof y!=="number")return H.b(y)
y=J.d(J.d(J.d(J.h(z,6*y),a),a),a)
z=this.e
if(typeof z!=="number")return H.b(z)
x=this.f
if(typeof x!=="number")return H.b(x)
x=J.c(y,(6*z+30*x)*a*a)
z=this.e
if(typeof z!=="number")return H.b(z)
y=this.f
if(typeof y!=="number")return H.b(y)
y=J.c(x,(-12*z-48*y)*a)
z=this.e
if(typeof z!=="number")return H.b(z)
x=this.f
if(typeof x!=="number")return H.b(x)
return J.d(J.c(y,8*z+24*x),0.16666666666666666)}else{if(typeof z!=="number")return H.b(z)
y=this.f
if(typeof y!=="number")return H.b(y)
y=6*y
return((12-9*z-y)*a*a*a+(-18+12*z+y)*a*a+(6-2*z))*0.16666666666666666}},
static:{B2:[function(a){var z,y,x,w
z=a.m("xwidth",2)
y=a.m("ywidth",2)
x=a.m("B",0.3333333333333333)
w=a.m("C",0.3333333333333333)
if(typeof z!=="number")return H.b(z)
if(typeof y!=="number")return H.b(y)
return new S.iC(x,w,z,y,1/z,1/y)},"$1","x_",2,0,67]}},
jv:{
"^":"d4;a,b,c,d",
eS:function(a,b){return P.I(0,J.h(this.a,Math.abs(a)))*P.I(0,J.h(this.b,Math.abs(b)))},
static:{C_:[function(a){var z,y
z=a.m("xwidth",2)
y=a.m("ywidth",2)
if(typeof z!=="number")return H.b(z)
if(typeof y!=="number")return H.b(y)
return new S.jv(z,y,1/z,1/y)},"$1","x0",2,0,68]}}}],["","",,P,{
"^":"",
nu:function(a,b){var z=[]
return new P.wR(b,new P.wP([],z),new P.wQ(z),new P.wS(z)).$1(a)},
kO:function(){var z=$.kN
if(z==null){z=$.kM
if(z==null){z=J.kn(window.navigator.userAgent,"Opera",0)
$.kM=z}z=z!==!0&&J.kn(window.navigator.userAgent,"WebKit",0)
$.kN=z}return z},
wP:{
"^":"z:44;a,b",
$1:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y}},
wQ:{
"^":"z:43;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.a(z,a)
return z[a]}},
wS:{
"^":"z:39;a",
$2:function(a,b){var z=this.a
if(a>=z.length)return H.a(z,a)
z[a]=b}},
wR:{
"^":"z:0;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t,s,r
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.kK(a.getTime(),!0)
if(a instanceof RegExp)throw H.l(new P.eI("structured clone of RegExp"))
z=Object.getPrototypeOf(a)
if(z===Object.prototype||z===null){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
x=P.a5()
this.d.$2(y,x)
for(w=Object.keys(a),v=w.length,u=0;u<w.length;w.length===v||(0,H.aw)(w),++u){t=w[u]
x.k(0,t,this.$1(a[t]))}return x}if(a instanceof Array){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
w=J.D(a)
s=w.gn(a)
x=this.a?new Array(s):a
this.d.$2(y,x)
if(typeof s!=="number")return H.b(s)
v=J.aQ(x)
r=0
for(;r<s;++r)v.k(x,r,this.$1(w.h(a,r)))
return x}return a}},
l0:{
"^":"da;a,b",
gdc:function(){var z=this.b
return P.aE(z.rm(z,new P.pa()),!0,H.aV(this,0))},
b1:function(a,b){C.c.b1(this.gdc(),b)},
k:function(a,b,c){var z=this.gdc()
if(b>>>0!==b||b>=z.length)return H.a(z,b)
J.o_(z[b],c)},
sn:function(a,b){var z=this.gdc().length
if(b>=z)return
else if(b<0)throw H.l(P.aD("Invalid list length"))
this.qV(0,b,z)},
H:function(a,b){this.b.a.appendChild(b)},
aH:function(a,b,c,d,e){throw H.l(new P.ae("Cannot setRange on filtered list"))},
aF:function(a,b,c,d){throw H.l(new P.ae("Cannot fillRange on filtered list"))},
qV:function(a,b,c){C.c.b1(C.c.b5(this.gdc(),b,c),new P.pb())},
bU:function(a,b,c){this.b.bU(0,b,c)},
gn:function(a){return this.gdc().length},
h:function(a,b){var z=this.gdc()
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
gax:function(a){var z=this.gdc()
return new J.dw(z,z.length,0,null)},
E:function(a){return this.gn(this).$0()}},
pa:{
"^":"z:0;",
$1:function(a){return!!J.O(a).$iscd}},
pb:{
"^":"z:0;",
$1:function(a){return J.nZ(a)}}}],["","",,U,{
"^":"",
kV:function(a,b,c,d){var z
switch(a){case 1:return new U.p8(null,c,0,0,b)
case 2:z=d==null?1:d
return new U.l_(new T.di(),c,z,null,0,0,b)
case 3:z=d==null?16:d
return new U.l_(new T.di(),c,z,null,0,0,b)
case 4:return U.p6(b,c,d==null?32:d)
case 5:z=d==null?16:d
return new U.p7(new T.di(),c,z,null,0,0,b)
case 6:return new U.kU(c,d==null?32:d,!1,0,0,b)
case 7:return new U.kU(c,d==null?32:d,!0,0,0,b)
default:throw H.l(new U.L("Invalid compression type: "+H.m(a)))}},
p0:function(a,b,c,d){var z,y,x,w,v,u,t,s
if(b===0){if(d!==0)throw H.l(new U.L("Incomplete huffman data"))
return}z=a.d
y=a.q()
x=a.q()
a.d=J.c(a.d,4)
w=a.q()
if(y<65537)v=x>=65537
else v=!0
if(v)throw H.l(new U.L("Invalid huffman table size"))
a.d=J.c(a.d,4)
v=Array(65537)
v.fixed$length=Array
u=H.p(v,[P.x])
C.c.aF(u,0,65537,0)
t=H.p(Array(16384),[U.kW])
for(s=0;s<16384;++s)t[s]=new U.kW(0,0,null)
U.p1(a,b-20,y,x,u)
v=J.h(a.d,z)
if(typeof v!=="number")return H.b(v)
if(w>8*(b-v))throw H.l(new U.L("Error in header for Huffman-encoded data (invalid number of bits)."))
U.oY(u,y,x,t)
U.p_(u,t,a,w,x,d,c)},
p_:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p
z=[0,0]
y=J.c(c.d,C.a.al(d+7,8))
for(x=0;J.K(c.d,y);){U.hM(z,c)
for(;w=z[1],w>=14;){v=b[C.b.D(z[0],w-14)&16383]
u=v.a
if(u!==0){z[1]=w-u
x=U.hN(v.b,e,z,c,g,x,f)}else{if(v.c==null)throw H.l(new U.L("Error in Huffman-encoded data (invalid code)."))
for(t=0;t<v.b;++t){w=v.c
if(t>=w.length)return H.a(w,t)
w=w[t]
if(w>>>0!==w||w>=65537)return H.a(a,w)
s=J.W(a[w],63)
if(typeof s!=="number")return H.b(s)
while(!0){if(!(z[1]<s&&J.K(c.d,y)))break
U.hM(z,c)}w=z[1]
if(w>=s){u=v.c
if(t>=u.length)return H.a(u,t)
r=u[t]
if(r>>>0!==r||r>=65537)return H.a(a,r)
r=a[r]
if(typeof r!=="number")return r.D()
w-=s
if(C.b.p(r,6)===(C.b.D(z[0],w)&C.a.W(1,s)-1)>>>0){z[1]=w
q=U.hN(u[t],e,z,c,g,x,f)
x=q
break}}}if(t===v.b)throw H.l(new U.L("Error in Huffman-encoded data (invalid code)."))}}}p=8-d&7
z[0]=C.b.p(z[0],p)
z[1]=z[1]-p
for(;w=z[1],w>0;){v=b[C.b.u(z[0],14-w)&16383]
u=v.a
if(u!==0){z[1]=w-u
x=U.hN(v.b,e,z,c,g,x,f)}else throw H.l(new U.L("Error in Huffman-encoded data (invalid code)."))}if(x!==f)throw H.l(new U.L("Error in Huffman-encoded data (decoded data are shorter than expected)."))},
hN:function(a,b,c,d,e,f,g){var z,y,x,w,v,u
if(J.i(a,b)){if(c[1]<8)U.hM(c,d)
z=c[1]-8
c[1]=z
y=C.b.D(c[0],z)&255
if(f+y>g)throw H.l(new U.L("Error in Huffman-encoded data (decoded data are longer than expected)."))
z=f-1
x=e.length
if(z<0||z>=x)return H.a(e,z)
w=e[z]
for(;v=y-1,y>0;y=v,f=u){u=f+1
if(f>=x)return H.a(e,f)
e[f]=w}}else{if(f<g){u=f+1
if(f>=e.length)return H.a(e,f)
e[f]=a}else throw H.l(new U.L("Error in Huffman-encoded data (decoded data are longer than expected)."))
f=u}return f},
oY:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
for(;b<=c;++b){if(b>=65537)return H.a(a,b)
z=a[b]
if(typeof z!=="number")return z.D()
y=C.b.p(z,6)
x=z&63
if(C.a.c5(y,x)!==0)throw H.l(new U.L("Error in Huffman-encoded data (invalid code table entry)."))
if(x>14){z=C.a.by(y,x-14)
if(z>=16384)return H.a(d,z)
w=d[z]
if(w.a!==0)throw H.l(new U.L("Error in Huffman-encoded data (invalid code table entry)."))
z=++w.b
y=w.c
if(y!=null){v=Array(z)
v.fixed$length=Array
v.$builtinTypeInfo=[P.x]
w.c=v
for(u=w.b-1,t=0;t<u;++t){if(t>=y.length)return H.a(y,t)
s=y[t]
if(t>=z)return H.a(v,t)
v[t]=s}}else w.c=[0]
z=w.c
y=w.b-1
if(y<0||y>=z.length)return H.a(z,y)
z[y]=b}else if(x!==0){z=14-x
r=C.a.u(y,z)
if(r>=16384)return H.a(d,r)
for(t=C.a.u(1,z);t>0;--t,++r){if(r>=16384)return H.a(d,r)
w=d[r]
if(w.a!==0||w.c!=null)throw H.l(new U.L("Error in Huffman-encoded data (invalid code table entry)."))
w.a=x
w.b=b}}}},
p1:function(a,b,c,d,e){var z,y,x,w,v,u,t
z=a.d
y=[0,0]
for(x=d+1;c<=d;++c){if(J.F(J.h(a.d,z),b))throw H.l(new U.L("Error in Huffman-encoded data (unexpected end of code table data)."))
w=U.kX(6,y,a)
if(c<0||c>=65537)return H.a(e,c)
e[c]=w
if(w===63){if(J.F(J.h(a.d,z),b))throw H.l(new U.L("Error in Huffman-encoded data (unexpected end of code table data)."))
v=U.kX(8,y,a)+6
if(c+v>x)throw H.l(new U.L("Error in Huffman-encoded data (code table is longer than expected)."))
for(;u=v-1,v!==0;v=u,c=t){t=c+1
if(c>=65537)return H.a(e,c)
e[c]=0}--c}else if(w>=59){v=w-59+2
if(c+v>x)throw H.l(new U.L("Error in Huffman-encoded data (code table is longer than expected)."))
for(;u=v-1,v!==0;v=u,c=t){t=c+1
if(c>=65537)return H.a(e,c)
e[c]=0}--c}}U.oZ(e)},
oZ:function(a){var z,y,x,w,v,u
z=Array(59)
z.fixed$length=Array
y=H.p(z,[P.x])
C.c.aF(y,0,59,0)
for(x=0;x<65537;++x){z=a[x]
if(z>>>0!==z||z>=59)return H.a(y,z)
y[z]=J.c(y[z],1)}for(w=0,x=58;x>0;--x,w=v){z=y[x]
if(typeof z!=="number")return H.b(z)
v=C.b.p(w+z,1)
y[x]=w}for(x=0;x<65537;++x){u=a[x]
if(J.F(u,0)){if(u>>>0!==u||u>=59)return H.a(y,u)
z=y[u]
y[u]=J.c(z,1)
if(typeof z!=="number")return z.u()
a[x]=(u|z<<6)>>>0}}},
hM:function(a,b){var z,y,x
z=a[0]
y=b.a
x=b.d
b.d=J.c(x,1)
x=J.e(y,x)
if(typeof x!=="number")return H.b(x)
a[0]=((z<<8|x)&-1)>>>0
a[1]=(a[1]+8&-1)>>>0},
kX:function(a,b,c){var z,y,x
for(;z=b[1],z<a;){z=b[0]
y=c.a
x=c.d
c.d=J.c(x,1)
x=J.e(y,x)
if(typeof x!=="number")return H.b(x)
b[0]=((z<<8|x)&-1)>>>0
b[1]=(b[1]+8&-1)>>>0}z-=a
b[1]=z
return(C.a.D(b[0],z)&C.a.W(1,a)-1)>>>0},
p9:function(a0,a1,a2,a3,a4,a5,a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=a6<16384
if(typeof a2!=="number")return a2.a0()
if(typeof a4!=="number")return H.b(a4)
if(a2>a4)y=a4
else y=a2
for(x=1;x<=y;)x=x<<1>>>0
x=x>>>1
w=x>>>1
v=[0,0]
for(u=a0.length,t=x,x=w;x>=1;t=x,x=w){s=a1+a5*(a4-t)
r=a5*x
q=a5*t
if(typeof a3!=="number")return a3.i()
p=a3*x
o=a3*t
for(n=(a2&x)>>>0!==0,m=a3*(a2-t),l=a1,k=null,j=null,i=null,h=null;l<=s;l+=q){g=l+m
for(f=l;f<=g;f+=o){e=f+p
d=f+r
c=d+p
b=a0[d]
a=a0[f]
if(z){if(f<0||f>=u)return H.a(a0,f)
if(d<0||d>=u)return H.a(a0,d)
U.dA(a,b,v)
k=v[0]
i=v[1]
if(e<0||e>=u)return H.a(a0,e)
b=a0[e]
if(c<0||c>=u)return H.a(a0,c)
U.dA(b,a0[c],v)
j=v[0]
h=v[1]
U.dA(k,j,v)
a0[f]=v[0]
a0[e]=v[1]
U.dA(i,h,v)
a0[d]=v[0]
a0[c]=v[1]}else{if(f<0||f>=u)return H.a(a0,f)
if(d<0||d>=u)return H.a(a0,d)
U.eg(a,b,v)
k=v[0]
i=v[1]
if(e<0||e>=u)return H.a(a0,e)
b=a0[e]
if(c<0||c>=u)return H.a(a0,c)
U.eg(b,a0[c],v)
j=v[0]
h=v[1]
U.eg(k,j,v)
a0[f]=v[0]
a0[e]=v[1]
U.eg(i,h,v)
a0[d]=v[0]
a0[c]=v[1]}}if(n){d=f+r
b=a0[f]
a=a0[d]
if(z){if(f<0||f>=u)return H.a(a0,f)
if(d<0||d>=u)return H.a(a0,d)
U.dA(b,a,v)
k=v[0]
a0[d]=v[1]}else{if(f<0||f>=u)return H.a(a0,f)
if(d<0||d>=u)return H.a(a0,d)
U.eg(b,a,v)
k=v[0]
a0[d]=v[1]}if(f<0||f>=u)return H.a(a0,f)
a0[f]=k}}if((a4&x)>>>0!==0){g=l+m
for(f=l;f<=g;f+=o){e=f+p
if(f<0||f>=u)return H.a(a0,f)
n=a0[f]
if(e<0||e>=u)return H.a(a0,e)
U.dA(n,a0[e],v)
k=v[0]
a0[e]=v[1]
if(f<0||f>=u)return H.a(a0,f)
a0[f]=k}}w=x>>>1}},
dA:function(a,b,c){var z,y,x,w,v,u
z=$.$get$eR()
z[0]=a
y=$.$get$hc()
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
z[0]=b
if(0>=x)return H.a(y,0)
v=y[0]
u=w+(v&1)+C.a.p(v,1)
c[0]=u
c[1]=u-v},
eg:function(a,b,c){var z
if(typeof b!=="number")return b.D()
z=J.W(J.h(a,C.b.p(b,1)),65535)
if(typeof z!=="number")return H.b(z)
c[1]=z
c[0]=b+z-32768&65535},
x1:function(a){var z,y,x,w,v
z=new Uint8Array(H.n(a))
U.aa(z,!0,null,0)
if(new U.ie(null,null,null,null,null,null,Array(4),[],[],[],[],0,0).rk(z))return new U.qu(null,null,null)
y=new U.rz(null,0,0,null,null,0,1,null)
if(y.ii(z))return y
x=new U.pv(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
x.c=U.aa(z,!1,null,0)
x.b=new U.l7(0,null,!1,[],0,0,4294967295)
if(x.js())return x
w=new U.uS(null,null,null)
if(w.ii(z))return w
v=new U.um(null,null,null)
if(v.jS(U.aa(z,!1,null,0))!=null)return v
if(U.lW(z).d===943870035)return new U.rL(null,null)
if(U.p3(z))return new U.oX(null,1,null,null,null,null,null)
return},
CM:[function(a,b,c,d,e,f){U.uU(f,a,b,c,d,e,!0,f)},"$6","xJ",12,0,10],
CN:[function(a,b,c,d,e,f){U.uV(f,a,b,c,d,e,!0,f)},"$6","xK",12,0,10],
CL:[function(a,b,c,d,e,f){U.uT(f,a,b,c,d,e,!0,f)},"$6","xI",12,0,10],
dh:function(a,b,c,d,e){var z,y
if(e){if(typeof d!=="number")return H.b(d)
z=0
for(;z<d;++z){y=J.c(J.e(a.a,J.c(a.d,z)),J.e(b.a,J.c(b.d,z)))
J.u(c.a,J.c(c.d,z),y)}}else{if(typeof d!=="number")return H.b(d)
z=0
for(;z<d;++z){y=J.h(J.e(a.a,J.c(a.d,z)),J.e(b.a,J.c(b.d,z)))
J.u(c.a,J.c(c.d,z),y)}}},
uU:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(typeof d!=="number")return H.b(d)
z=e*d
if(typeof f!=="number")return H.b(f)
y=e+f
x=U.aa(a,!1,null,z)
w=U.aa(a,!1,null,z)
v=U.R(g?w:x,null,0)
if(e===0){u=J.e(x.a,J.c(x.d,0))
J.u(w.a,J.c(w.d,0),u)
U.dh(U.R(x,null,1),v,U.R(w,null,1),J.h(b,1),g)
v.d=J.c(v.d,d)
x.d=J.c(x.d,d)
w.d=J.c(w.d,d)
e=1}for(u=-d,t=J.y(b);e<y;){U.dh(x,U.R(v,null,u),w,1,g)
U.dh(U.R(x,null,1),v,U.R(w,null,1),t.l(b,1),g);++e
v.d=J.c(v.d,d)
x.d=J.c(x.d,d)
w.d=J.c(w.d,d)}},
uV:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u
if(typeof d!=="number")return H.b(d)
z=e*d
if(typeof f!=="number")return H.b(f)
y=e+f
x=U.aa(a,!1,null,z)
w=U.aa(h,!1,null,z)
v=U.R(g?w:x,null,0)
if(e===0){u=J.e(x.a,J.c(x.d,0))
J.u(w.a,J.c(w.d,0),u)
U.dh(U.R(x,null,1),v,U.R(w,null,1),J.h(b,1),g)
x.d=J.c(x.d,d)
w.d=J.c(w.d,d)
e=1}else v.d=J.h(v.d,d)
for(;e<y;){U.dh(x,v,w,b,g);++e
v.d=J.c(v.d,d)
x.d=J.c(x.d,d)
w.d=J.c(w.d,d)}},
uT:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t,s,r,q,p,o
if(typeof d!=="number")return H.b(d)
z=e*d
if(typeof f!=="number")return H.b(f)
y=e+f
x=U.aa(a,!1,null,z)
w=U.aa(h,!1,null,z)
v=U.R(g?w:x,null,0)
if(e===0){u=J.e(x.a,J.c(x.d,0))
J.u(w.a,J.c(w.d,0),u)
U.dh(U.R(x,null,1),v,U.R(w,null,1),J.h(b,1),g)
v.d=J.c(v.d,d)
x.d=J.c(x.d,d)
w.d=J.c(w.d,d)
e=1}for(u=-d;e<y;){U.dh(x,U.R(v,null,u),w,1,g)
if(typeof b!=="number")return H.b(b)
t=1
for(;t<b;++t){s=J.e(v.a,J.c(v.d,t-1))
r=t-d
q=J.e(v.a,J.c(v.d,r))
r=J.e(v.a,J.c(v.d,r-1))
p=J.h(J.c(s,q),r)
if(J.W(p,4294967040)===0)o=p
else{if(typeof p!=="number")return p.U()
o=p<0?0:255}s=J.e(x.a,J.c(x.d,t))
if(g)r=o
else{if(typeof o!=="number")return o.a2()
r=-o}r=J.c(s,r)
J.u(w.a,J.c(w.d,t),r)}++e
v.d=J.c(v.d,d)
x.d=J.c(x.d,d)
w.d=J.c(w.d,d)}},
pA:function(a){var z,y,x,w
if($.ff==null)U.l9()
$.$get$k5()[0]=a
z=$.$get$ng()
if(0>=z.length)return H.a(z,0)
y=z[0]
if(a===0)return y>>>16
x=y>>>23&511
z=$.l8
if(x>=z.length)return H.a(z,x)
x=z[x]
if(x!==0){w=y&8388607
return x+(w+4095+(w>>>13&1)>>>13)}return U.pB(y)},
pB:function(a){var z,y,x,w,v,u
z=a>>>16&32768
y=(a>>>23&255)-112
x=a&8388607
if(y<=0){if(y<-10)return z
x|=8388608
w=14-y
return(z|C.a.D(x+(C.a.u(1,w-1)-1)+(C.a.by(x,w)&1),w))>>>0}else if(y===143){v=z|31744
if(x===0)return v
else{x=x>>>13
u=x===0?1:0
return v|x|u}}else{x=x+4095+(x>>>13&1)
if((x&8388608)!==0){++y
x=0}if(y>30)return z|31744
return(z|y<<10|x>>>13)>>>0}},
l9:function(){var z,y,x,w,v,u
if($.hX!=null)return
z=new Uint32Array(H.k(65536))
$.hX=z
z=z.buffer
z.toString
$.ff=H.fq(z,0,null)
z=H.k(512)
y=new Uint16Array(z)
$.l8=y
for(x=0;x<256;++x){w=(x&255)-112
v=w<=0||w>=30
u=(x|256)>>>0
if(v){if(x>=z)return H.a(y,x)
y[x]=0
if(u>=z)return H.a(y,u)
y[u]=0}else{v=w<<10>>>0
if(x>=z)return H.a(y,x)
y[x]=v
if(u>=z)return H.a(y,u)
y[u]=(v|32768)>>>0}}for(x=0;x<65536;++x){z=$.hX
y=U.pC(x)
if(x>=z.length)return H.a(z,x)
z[x]=y}},
pC:function(a){var z,y,x,w
z=a>>>15&1
y=a>>>10&31
x=a&1023
if(y===0)if(x===0)return z<<31>>>0
else{for(;(x&1024)===0;){x=x<<1;--y}++y
x&=4294966271}else if(y===31){w=z<<31
if(x===0)return(w|2139095040)>>>0
else return(w|2139095040|x<<13)>>>0}return(z<<31|y+112<<23|x<<13)>>>0},
x4:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=new U.x5(new U.x6())
y=a.a
if(y.ga6(y))x=0
else{x=y.gbK(y)
x=J.d_(x.gat(x))}if(y.ga6(y))w=0
else{w=y.gbK(y)
w=J.cZ(w.gat(w))}v=U.c_(x,w,4)
w=v.x.buffer
u=(w&&C.e).ad(w,0,null)
if(!(a.b!=null||a.c!=null||a.d!=null))throw H.l(new U.L("Only RGB[A] images are currently supported."))
x=C.b.v(b+2.47393,-20,20)
H.v(2)
H.v(x)
t=Math.pow(2,x)
x=u.length
s=0
r=0
while(!0){if(y.ga6(y))w=0
else{w=y.gbK(y)
w=J.cZ(w.gat(w))}if(typeof w!=="number")return H.b(w)
if(!(s<w))break
q=0
while(!0){if(y.ga6(y))w=0
else{w=y.gbK(y)
w=J.d_(w.gat(w))}if(typeof w!=="number")return H.b(w)
if(!(q<w))break
w=a.b
p=w!=null?w.d1(q,s):0
w=a.c
o=w!=null?w.d1(q,s):0
w=a.d
n=w!=null?w.d1(q,s):0
if(p==1/0||p==-1/0||isNaN(p))p=0
if(o==1/0||o==-1/0||isNaN(o))o=0
if(n==1/0||n==-1/0||isNaN(n))n=0
m=z.$2(p,t)
l=z.$2(o,t)
k=z.$2(n,t)
j=P.I(m,P.I(l,k))
if(j>255){m=255*J.G(m,j)
l=255*J.G(l,j)
k=255*J.G(k,j)}i=r+1
w=C.a.v(J.aW(m),0,255)
if(r<0||r>=x)return H.a(u,r)
u[r]=w
r=i+1
w=C.a.v(J.aW(l),0,255)
if(i<0||i>=x)return H.a(u,i)
u[i]=w
i=r+1
w=C.a.v(J.aW(k),0,255)
if(r<0||r>=x)return H.a(u,r)
u[r]=w
w=a.e
if(w!=null){h=w.d1(q,s)
if(h==1/0||h==-1/0||isNaN(h))h=1
r=i+1
w=C.a.v(C.b.I(h*255),0,255)
if(i<0||i>=x)return H.a(u,i)
u[i]=w}else{r=i+1
if(i<0||i>=x)return H.a(u,i)
u[i]=255}++q}++s}return v},
dz:{
"^":"o;N:a>,M:b>"},
d2:{
"^":"o;",
hZ:function(a,b){var z=this.dj(a,b)
if(z==null)return
return U.pD(z)},
kt:function(a){return this.hZ(a,0)}},
oU:{
"^":"o;a3:a>,aa:b>,c,A:d>"},
kU:{
"^":"ef;d,e,f,a,b,c",
f6:function(){return this.e},
bJ:function(a,b,c,d,e){throw H.l(new U.L("B44 compression not yet supported."))},
ei:function(a,b,c){return this.bJ(a,b,c,null,null)}},
oV:{
"^":"o;a3:a>,aa:b>,c,d,e,f",
m6:function(a){var z,y
z=a.dt()
this.a=z
if(z.length===0){this.a=null
return}this.b=a.q()
z=a.a
y=a.d
a.d=J.c(y,1)
this.d=J.i(J.e(z,y),1)
a.d=J.c(a.d,3)
this.e=a.q()
this.f=a.q()
z=this.b
switch(z){case 0:this.c=4
break
case 1:this.c=2
break
case 2:this.c=4
break
default:throw H.l(new U.L("EXR Invalid pixel type: "+H.m(z)))}},
static:{oW:function(a){var z=new U.oV(null,null,null,null,null,null)
z.m6(a)
return z}}},
ef:{
"^":"o;",
bJ:function(a,b,c,d,e){throw H.l(new U.L("Unsupported compression type"))},
ei:function(a,b,c){return this.bJ(a,b,c,null,null)},
hI:function(a,b,c){var z,y,x
z=C.a.ar(b,a)
y=C.b.ar(c,a)
x=z*a<b?0:1
return y-z+x}},
kW:{
"^":"o;a,b,au:c>",
b9:function(a,b,c,d,e){return this.c.$4(b,c,d,e)}},
p2:{
"^":"dz;d,e,f,a,b,c",
oX:function(a){var z,y,x,w,v,u,t,s,r
J.W(this.f,16)
for(z=this.d,y=0;y<z.length;++y){x=z[y]
w=x.a
for(v=w.a,u=0;t=x.b,u<t.length;++u){s=t[u]
if(!v.O(s.a)){t=x.f
this.a=t
r=x.r
this.b=r
w.eM(U.ej(s.a,t,r,s.b))}}if(x.id)this.p6(y,a)
else this.p5(y,a)}},
p6:function(b2,b3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1
z=this.d
if(b2>=z.length)return H.a(z,b2)
y=z[b2]
x=J.W(this.f,16)!==0
w=y.fr
v=y.dx
z=y.b.length
new Uint32Array(z)
u=U.R(b3,null,0)
z=y.a.a
t=0
s=0
while(!0){r=y.ry
if(typeof r!=="number")return H.b(r)
if(!(t<r))break
q=0
while(!0){r=y.rx
if(typeof r!=="number")return H.b(r)
if(!(q<r))break
r=s!==0
p=0
o=0
while(!0){n=y.r2
if(t>=n.length)return H.a(n,t)
n=n[t]
if(typeof n!=="number")return H.b(n)
if(!(p<n))break
m=0
while(!0){n=y.r1
if(q>=n.length)return H.a(n,q)
n=n[q]
if(typeof n!=="number")return H.b(n)
if(!(m<n))break
if(r)break
if(s<0||s>=v.length)return H.a(v,s)
n=v[s]
if(o<0||o>=n.length)return H.a(n,o)
u.d=n[o]
if(x)if(u.q()!==b2)throw H.l(new U.L("Invalid Image Data"))
l=u.q()
k=u.q()
u.q()
u.q()
j=u.q()
i=J.c(u.d,0)
n=u.a
h=u.e
g=J.c(i,j)
u.d=J.c(u.d,J.h(g,i))
f=y.k2
if(typeof f!=="number")return H.b(f)
e=k*f
f=y.k1
if(typeof f!=="number")return H.b(f)
d=l*f
c=w.a
b=w.b
f=this.a
if(typeof f!=="number")return H.b(f)
if(d+c>f);f=this.b
if(typeof f!=="number")return H.b(f)
if(e+b>f);a=w.bJ(new U.ak(n,i,g,i,h),d,e,y.k1,y.k2)
c=w.a
b=w.b
a0=a.length
a1=y.b.length
a2=0
a3=0
while(!0){if(a3<b){n=this.b
if(typeof n!=="number")return H.b(n)
n=e<n}else n=!1
if(!n)break
for(a4=0;a4<a1;++a4){n=y.b
if(a4>=n.length)return H.a(n,a4)
a5=n[a4]
n=z.h(0,a5.a).e.buffer
a6=(n&&C.e).ad(n,0,null)
if(a2>=a0)break
n=y.k1
if(typeof n!=="number")return H.b(n)
d=l*n
for(n=a5.c,h=y.f,g=y.r,f=a6.length,a7=0;a7<c;++a7,++d){if(typeof n!=="number")return H.b(n)
a8=0
for(;a8<n;++a8,a2=b0){if(typeof h!=="number")return H.b(h)
if(d<h){if(typeof g!=="number")return H.b(g)
a9=e<g}else a9=!1
b0=a2+1
if(a9){b1=(e*h+d)*n+a8
if(a2<0||a2>=a0)return H.a(a,a2)
a9=a[a2]
if(b1<0||b1>=f)return H.a(a6,b1)
a6[b1]=a9}}}}++a3;++e}++m;++o}++p}++q;++s}++t}},
p5:function(a6,a7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
z=this.d
if(a6>=z.length)return H.a(z,a6)
y=z[a6]
x=J.W(this.f,16)!==0
w=y.fr
z=y.dx
if(0>=z.length)return H.a(z,0)
v=z[0]
y.e[3]
u=y.fx
if(typeof u!=="number")return H.b(u)
z=y.b.length
t=new Uint32Array(z)
s=U.R(a7,null,0)
for(r=v.length,q=y.a.a,p=w!=null,o=0,n=0;n<r;++n){s.d=v[n]
if(x)if(s.q()!==a6)throw H.l(new U.L("Invalid Image Data"))
m=s.q()
l=$.$get$bJ()
l[0]=m
m=$.$get$e_()
if(0>=m.length)return H.a(m,0)
m[0]
l[0]=s.q()
if(0>=m.length)return H.a(m,0)
k=m[0]
j=J.c(s.d,0)
m=s.a
l=s.e
i=J.c(j,k)
h=new U.ak(m,j,i,j,l)
s.d=J.c(s.d,J.h(i,j))
g=p?w.ei(h,0,o):h.aD()
f=g.length
e=y.b.length
d=0
while(!0){if(d<u){m=this.b
if(typeof m!=="number")return H.b(m)
m=o<m}else m=!1
if(!m)break
m=y.go
if(o<0||o>=m.length)return H.a(m,o)
c=m[o]
if(c>=f)break
for(b=0;b<e;++b){m=y.b
if(b>=m.length)return H.a(m,b)
a=m[b]
m=q.h(0,a.a).e.buffer
a0=(m&&C.e).ad(m,0,null)
if(c>=f)break
m=y.f
if(typeof m!=="number")return H.b(m)
l=a.c
i=a0.length
a1=0
for(;a1<m;++a1){if(typeof l!=="number")return H.b(l)
a2=0
for(;a2<l;++a2,c=a4){if(b>=z)return H.a(t,b)
a3=t[b]
t[b]=a3+1
a4=c+1
if(c>>>0!==c||c>=f)return H.a(g,c)
a5=g[c]
if(a3>=i)return H.a(a0,a3)
a0[a3]=a5}}}++d;++o}}},
m7:function(a){var z,y,x,w,v
z=U.aa(a,!1,null,0)
if(z.q()!==20000630)throw H.l(new U.L("File is not an OpenEXR image file."))
y=z.a
x=z.d
z.d=J.c(x,1)
x=J.e(y,x)
this.e=x
if(!J.i(x,2))throw H.l(new U.L("Cannot read version "+H.m(this.e)+" image files."))
y=z.bD()
this.f=y
if(J.W(y,4294967289)!==0)throw H.l(new U.L("The file format version number's flag field contains unrecognized flags."))
if(J.W(this.f,16)===0){w=U.kZ(J.W(this.f,2)!==0,z)
if(w.f!=null)this.d.push(w)}else for(y=this.d;!0;){w=U.kZ(J.W(this.f,2)!==0,z)
if(w.f==null)break
y.push(w)}y=this.d
x=y.length
if(x===0)throw H.l(new U.L("Error reading image header"))
for(v=0;v<y.length;y.length===x||(0,H.aw)(y),++v)y[v].p1(z)
this.oX(z)},
static:{kY:function(a){var z=new U.p2([],null,null,0,0,4294967295)
z.m7(a)
return z},p3:function(a){var z,y,x
z=U.aa(a,!1,null,0)
if(z.q()!==20000630)return!1
y=z.a
x=z.d
z.d=J.c(x,1)
if(!J.i(J.e(y,x),2))return!1
if(J.W(z.bD(),4294967289)!==0)return!1
return!0}}},
p4:{
"^":"o;a,b,c,d,e,N:f>,M:r>,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1",
gca:function(a){return this.e[0]},
gbH:function(a){return this.e[1]},
fA:function(a){var z
for(z=0;a>1;){++z
a=C.b.p(a,1)}return z},
fq:function(a){var z,y
for(z=0,y=0;a>1;){if((a&1)!==0)y=1;++z
a=C.b.p(a,1)}return z+y},
p1:function(a){var z,y,x,w,v
if(this.id)for(z=0;z<this.dx.length;++z){y=0
while(!0){x=this.dx
if(z>=x.length)return H.a(x,z)
x=x[z]
if(!(y<x.length))break
x[y]=a.bE();++y}}else{x=this.dx
if(0>=x.length)return H.a(x,0)
w=x[0].length
for(z=0;z<w;++z){x=this.dx
if(0>=x.length)return H.a(x,0)
x=x[0]
v=a.bE()
if(z>=x.length)return H.a(x,z)
x[z]=v}}},
nl:function(){var z,y,x,w,v,u
for(z=this.b,y=z.length,x=0,w=0;v=z.length,w<v;v===y||(0,H.aw)(z),++w){u=z[w].c
if(typeof u!=="number")return H.b(u)
x+=u}return x},
j5:function(a,b,c,d,e,f){var z,y,x,w,v,u
if(typeof b!=="number")return H.b(b)
z=f===1
y=d-c+1
x=0
for(;x<b;++x){w=C.a.W(1,x)
v=C.a.ar(y,w)
u=P.I(z&&v*w<y?v+1:v,1)
if(typeof e!=="number")return H.b(e)
u=C.b.ar(u+e-1,e)
if(x>=a.length)return H.a(a,x)
a[x]=u}},
m8:function(a2,a3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
z=this.id
this.cx=z?1:0
for(y=this.c;!0;){x=a3.dt()
if(x.length===0)break
w=a3.dt()
v=a3.q()
u=J.c(a3.d,0)
t=a3.a
s=a3.e
r=J.c(u,v)
q=new U.ak(t,u,r,u,s)
a3.d=J.c(a3.d,J.h(r,u))
y.k(0,x,new U.oU(x,w,v,q))
switch(x){case"channels":for(;!0;){p=U.oW(q)
if(p.a==null)break
this.b.push(p)}break
case"chromaticities":t=new Float32Array(8)
this.ch=t
s=q.q()
r=$.$get$bJ()
r[0]=s
s=$.$get$eS()
if(0>=s.length)return H.a(s,0)
t[0]=s[0]
t=this.ch
r[0]=q.q()
if(0>=s.length)return H.a(s,0)
t[1]=s[0]
t=this.ch
r[0]=q.q()
if(0>=s.length)return H.a(s,0)
t[2]=s[0]
t=this.ch
r[0]=q.q()
if(0>=s.length)return H.a(s,0)
t[3]=s[0]
t=this.ch
r[0]=q.q()
if(0>=s.length)return H.a(s,0)
t[4]=s[0]
t=this.ch
r[0]=q.q()
if(0>=s.length)return H.a(s,0)
t[5]=s[0]
t=this.ch
r[0]=q.q()
if(0>=s.length)return H.a(s,0)
t[6]=s[0]
t=this.ch
r[0]=q.q()
if(0>=s.length)return H.a(s,0)
t[7]=s[0]
break
case"compression":t=q.a
s=q.d
q.d=J.c(s,1)
s=J.e(t,s)
this.db=s
if(J.F(s,7))throw H.l(new U.L("EXR Invalid compression type"))
break
case"dataWindow":t=q.q()
s=$.$get$bJ()
s[0]=t
t=$.$get$e_()
if(0>=t.length)return H.a(t,0)
r=t[0]
s[0]=q.q()
if(0>=t.length)return H.a(t,0)
o=t[0]
s[0]=q.q()
if(0>=t.length)return H.a(t,0)
n=t[0]
s[0]=q.q()
if(0>=t.length)return H.a(t,0)
t=[r,o,n,t[0]]
this.e=t
this.f=t[2]-t[0]+1
this.r=t[3]-t[1]+1
break
case"displayWindow":t=q.q()
s=$.$get$bJ()
s[0]=t
t=$.$get$e_()
if(0>=t.length)return H.a(t,0)
r=t[0]
s[0]=q.q()
if(0>=t.length)return H.a(t,0)
o=t[0]
s[0]=q.q()
if(0>=t.length)return H.a(t,0)
n=t[0]
s[0]=q.q()
if(0>=t.length)return H.a(t,0)
this.d=[r,o,n,t[0]]
break
case"lineOrder":t=q.a
s=q.d
q.d=J.c(s,1)
this.cy=J.e(t,s)
break
case"pixelAspectRatio":t=q.q()
$.$get$bJ()[0]=t
t=$.$get$eS()
if(0>=t.length)return H.a(t,0)
this.x=t[0]
break
case"screenWindowCenter":t=q.q()
s=$.$get$bJ()
s[0]=t
t=$.$get$eS()
if(0>=t.length)return H.a(t,0)
this.y=t[0]
s[0]=q.q()
if(0>=t.length)return H.a(t,0)
this.z=t[0]
break
case"screenWindowWidth":t=q.q()
$.$get$bJ()[0]=t
t=$.$get$eS()
if(0>=t.length)return H.a(t,0)
this.Q=t[0]
break
case"tiles":this.k1=q.q()
this.k2=q.q()
t=q.a
s=q.d
q.d=J.c(s,1)
m=J.e(t,s)
this.k3=J.y(m).T(m,15)
if(typeof m!=="number")return m.D()
this.k4=C.b.p(m,4)&15
break
case"type":l=q.dt()
if(l==="deepscanline")this.cx=2
else if(l==="deeptile")this.cx=3
else throw H.l(new U.L("EXR Invalid type: "+l))
break
default:break}}if(z){z=this.e
y=z[0]
t=z[2]
s=z[1]
z=z[3]
switch(this.k3){case 0:k=1
break
case 1:z=P.I(t-y+1,z-s+1)
k=(this.k4===0?this.fA(z):this.fq(z))+1
break
case 2:j=t-y+1
k=(this.k4===0?this.fA(j):this.fq(j))+1
break
default:H.T(new U.L("Unknown LevelMode format."))
k=0}this.rx=k
z=this.e
y=z[0]
t=z[2]
s=z[1]
z=z[3]
switch(this.k3){case 0:k=1
break
case 1:z=P.I(t-y+1,z-s+1)
k=(this.k4===0?this.fA(z):this.fq(z))+1
break
case 2:i=z-s+1
k=(this.k4===0?this.fA(i):this.fq(i))+1
break
default:H.T(new U.L("Unknown LevelMode format."))
k=0}this.ry=k
if(this.k3!==2)this.ry=1
z=this.rx
if(typeof z!=="number")return H.b(z)
this.r1=H.p(Array(z),[P.x])
z=this.ry
if(typeof z!=="number")return H.b(z)
this.r2=H.p(Array(z),[P.x])
z=this.r1
y=this.rx
t=this.e
this.j5(z,y,t[0],t[2],this.k1,this.k4)
t=this.r2
y=this.ry
z=this.e
this.j5(t,y,z[1],z[3],this.k2,this.k4)
z=this.nl()
this.x1=z
y=this.k1
if(typeof y!=="number")return H.b(y)
y=z*y
this.x2=y
z=this.k2
if(typeof z!=="number")return H.b(z)
this.y1=y*z
this.fr=U.kV(this.db,this,y,z)
z=this.rx
y=this.ry
if(typeof z!=="number")return z.i()
if(typeof y!=="number")return H.b(y)
this.dx=H.p(Array(z*y),[P.jz])
h=0
g=0
while(!0){z=this.ry
if(typeof z!=="number")return H.b(z)
if(!(h<z))break
f=0
while(!0){z=this.rx
if(typeof z!=="number")return H.b(z)
if(!(f<z))break
z=this.dx
y=this.r1
if(f>=y.length)return H.a(y,f)
y=y[f]
t=this.r2
if(h>=t.length)return H.a(t,h)
t=t[h]
if(typeof y!=="number")return y.i()
if(typeof t!=="number")return H.b(t)
y=new Uint32Array(y*t)
if(g<0||g>=z.length)return H.a(z,g)
z[g]=y;++f;++g}++h}}else{z=this.r
if(typeof z!=="number")return z.j()
this.dy=new Uint32Array(H.k(z+1))
for(z=this.b,y=z.length,e=0;t=z.length,e<t;t===y||(0,H.aw)(z),++e){d=z[e]
s=d.c
r=this.f
if(typeof s!=="number")return s.i()
if(typeof r!=="number")return H.b(r)
c=C.a.ar(s*r,d.e)
s=this.r
if(typeof s!=="number")return H.b(s)
r=this.e
o=d.f
n=this.dy
b=0
for(;b<s;++b)if(C.a.R(b+r[1],o)===0){if(b>=n.length)return H.a(n,b)
n[b]=n[b]+c}}a=0
b=0
while(!0){z=this.r
if(typeof z!=="number")return H.b(z)
if(!(b<z))break
z=this.dy
if(b>=z.length)return H.a(z,b)
a=P.I(a,z[b]);++b}z=U.kV(this.db,this,a,null)
this.fr=z
z=z.f6()
this.fx=z
this.fy=a*z
z=H.k(this.dy.length)
y=new Uint32Array(z)
this.go=y
for(t=this.dy,s=t.length-1,r=this.fx,a0=0,a1=0;a1<=s;++a1){if(typeof r!=="number")return H.b(r)
if(C.a.R(a1,r)===0)a0=0
if(a1>=z)return H.a(y,a1)
y[a1]=a0
a0+=t[a1]}z=this.r
if(typeof z!=="number")return z.j()
if(typeof r!=="number")return H.b(r)
this.dx=[new Uint32Array(H.k(C.a.ar(z+r,r)-1))]}},
static:{kZ:function(a,b){var z=new U.p4(new U.lb(P.a5(),null,null,null,null,null),[],P.a5(),null,null,null,null,1,0,0,1,null,null,0,0,null,null,null,null,null,null,a,null,null,null,null,null,null,null,null,null,null,null)
z.m8(a,b)
return z}}},
p5:{
"^":"ef;d,e,f,r,x,a,b,c",
f6:function(){return this.f},
bJ:function(a,b,c,d,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(d==null)d=this.c.f
if(a0==null)a0=this.c.fx
if(typeof d!=="number")return H.b(d)
z=b+d-1
if(typeof a0!=="number")return H.b(a0)
y=c+a0-1
x=this.c
w=x.f
if(typeof w!=="number")return H.b(w)
if(z>w)z=w-1
w=x.r
if(typeof w!=="number")return H.b(w)
if(y>w)y=w-1
this.a=z-b+1
this.b=y-c+1
v=x.b
u=v.length
for(t=0,s=0;s<u;++s){if(s>=v.length)return H.a(v,s)
r=v[s]
x=this.r
if(s>=x.length)return H.a(x,s)
q=x[s]
q.a=t
q.b=t
q.c=this.hI(r.e,b,z)
x=this.hI(r.f,c,y)
q.d=x
q.e=r.f
w=r.c
if(typeof w!=="number")return w.ar()
w=w/2|0
q.f=w
p=q.c
if(typeof p!=="number")return p.i()
t+=p*x*w}o=a.t()
n=a.t()
if(n>=8192)throw H.l(new U.L("Error in header for PIZ-compressed data (invalid bitmap size)."))
x=H.k(8192)
m=new Uint8Array(x)
if(o<=n){l=a.aP(n-o+1)
k=J.h(l.c,l.d)
if(typeof k!=="number")return H.b(k)
j=o
s=0
for(;s<k;++s,j=i){i=j+1
w=J.e(l.a,J.c(l.d,s))
if(j>=x)return H.a(m,j)
m[j]=w}}h=new Uint16Array(H.k(65536))
g=this.pg(m,h)
U.p0(a,a.q(),this.x,t)
for(s=0;s<u;++s){x=this.r
if(s>=x.length)return H.a(x,s)
q=x[s]
j=0
while(!0){x=q.f
if(typeof x!=="number")return H.b(x)
if(!(j<x))break
w=this.x
p=q.a
if(typeof p!=="number")return p.j()
f=q.c
e=q.d
if(typeof f!=="number")return f.i()
U.p9(w,p+j,f,x,e,f*x,g);++j}}this.nf(h,this.x,t)
x=this.d
if(x==null){x=this.e
if(typeof x!=="number")return x.i()
x=U.iK(!1,x*this.f+73728)
this.d=x}x.a=0
for(;c<=y;++c)for(s=0;s<u;++s){x=this.r
if(s>=x.length)return H.a(x,s)
q=x[s]
x=q.e
if(typeof x!=="number")return H.b(x)
if(C.a.R(c,x)!==0)continue
x=q.c
w=q.f
if(typeof x!=="number")return x.i()
if(typeof w!=="number")return H.b(w)
b=x*w
for(;b>0;--b){x=this.d
w=this.x
p=q.b
if(typeof p!=="number")return p.j()
q.b=p+1
if(p<0||p>=w.length)return H.a(w,p)
x.rr(w[p])}}x=this.d
w=x.c.buffer
return(w&&C.e).ad(w,0,x.a)},
ei:function(a,b,c){return this.bJ(a,b,c,null,null)},
nf:function(a,b,c){var z,y,x
for(z=b.length,y=0;y<c;++y){if(y>=z)return H.a(b,y)
x=b[y]
if(x>>>0!==x||x>=65536)return H.a(a,x)
b[y]=a[x]}},
pg:function(a,b){var z,y,x,w,v
for(z=0,y=0;y<65536;++y){if(y!==0){x=y>>>3
if(x>=8192)return H.a(a,x)
x=J.W(a[x],C.a.W(1,y&7))!==0}else x=!0
if(x){w=z+1
if(z>=65536)return H.a(b,z)
b[z]=y
z=w}}for(w=z;w<65536;w=v){v=w+1
b[w]=0}return z-1},
m9:function(a,b,c){var z,y,x
z=H.p(Array(a.b.length),[U.n7])
this.r=z
for(y=z.length,x=0;x<y;++x)z[x]=new U.n7(null,null,null,null,null,null)
z=this.e
if(typeof z!=="number")return z.i()
this.x=new Uint16Array(H.k(C.b.al(z*this.f,2)))},
static:{p6:function(a,b,c){var z=new U.p5(null,b,c,null,null,0,0,a)
z.m9(a,b,c)
return z}}},
n7:{
"^":"o;a,b,c,d,e,f"},
p7:{
"^":"ef;d,e,f,r,a,b,c",
f6:function(){return this.f},
bJ:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.d.b6(T.b5(a.aD(),1,null,0),!1)
y=this.r
if(y==null){y=this.e
if(typeof y!=="number")return H.b(y)
y=U.iK(!1,this.f*y)
this.r=y}y.a=0
x=[0,0,0,0]
y=H.k(1)
w=new Uint32Array(y)
v=w.buffer
u=(v&&C.e).ad(v,0,null)
if(d==null)d=this.c.f
if(e==null)e=this.c.fx
if(typeof d!=="number")return H.b(d)
t=b+d-1
if(typeof e!=="number")return H.b(e)
s=c+e-1
v=this.c
r=v.f
if(typeof r!=="number")return H.b(r)
if(t>r)t=r-1
r=v.r
if(typeof r!=="number")return H.b(r)
if(s>r)s=r-1
this.a=t-b+1
this.b=s-c+1
q=v.b.length
for(r=u.length,p=z.length,o=c,n=0;o<=s;++o)for(m=0;m<q;++m){l=v.b
if(m>=l.length)return H.a(l,m)
k=l[m]
if(C.a.R(c,k.f)!==0)continue
j=this.hI(k.e,b,t)
if(0>=y)return H.a(w,0)
w[0]=0
switch(k.b){case 0:x[0]=n
l=n+j
x[1]=l
l+=j
x[2]=l
n=l+j
for(i=0;i<j;++i){l=x[0]
x[0]=l+1
if(l<0||l>=p)return H.a(z,l)
l=z[l]
h=x[1]
x[1]=h+1
if(h<0||h>=p)return H.a(z,h)
h=z[h]
g=x[2]
x[2]=g+1
if(g<0||g>=p)return H.a(z,g)
g=z[g]
w[0]=w[0]+((l<<24|h<<16|g<<8)>>>0)
for(f=0;f<4;++f){l=this.r
if(f>=r)return H.a(u,f)
h=u[f]
if(l.a===l.c.length)l.dI()
g=l.c
l=l.a++
if(l>=g.length)return H.a(g,l)
g[l]=h&255}}break
case 1:x[0]=n
l=n+j
x[1]=l
n=l+j
for(i=0;i<j;++i){l=x[0]
x[0]=l+1
if(l<0||l>=p)return H.a(z,l)
l=z[l]
h=x[1]
x[1]=h+1
if(h<0||h>=p)return H.a(z,h)
h=z[h]
w[0]=w[0]+((l<<8|h)>>>0)
for(f=0;f<2;++f){l=this.r
if(f>=r)return H.a(u,f)
h=u[f]
if(l.a===l.c.length)l.dI()
g=l.c
l=l.a++
if(l>=g.length)return H.a(g,l)
g[l]=h&255}}break
case 2:x[0]=n
l=n+j
x[1]=l
l+=j
x[2]=l
n=l+j
for(i=0;i<j;++i){l=x[0]
x[0]=l+1
if(l<0||l>=p)return H.a(z,l)
l=z[l]
h=x[1]
x[1]=h+1
if(h<0||h>=p)return H.a(z,h)
h=z[h]
g=x[2]
x[2]=g+1
if(g<0||g>=p)return H.a(z,g)
g=z[g]
w[0]=w[0]+((l<<24|h<<16|g<<8)>>>0)
for(f=0;f<4;++f){l=this.r
if(f>=r)return H.a(u,f)
h=u[f]
if(l.a===l.c.length)l.dI()
g=l.c
l=l.a++
if(l>=g.length)return H.a(g,l)
g[l]=h&255}}break}}y=this.r
v=y.c.buffer
return(v&&C.e).ad(v,0,y.a)},
ei:function(a,b,c){return this.bJ(a,b,c,null,null)}},
p8:{
"^":"ef;d,e,a,b,c",
f6:function(){return 1},
bJ:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=a.c
y=U.iK(!1,J.d(J.h(z,a.d),2))
if(d==null)d=this.c.f
if(e==null)e=this.c.fx
if(typeof d!=="number")return H.b(d)
x=b+d-1
if(typeof e!=="number")return H.b(e)
w=c+e-1
v=this.c
u=v.f
if(typeof u!=="number")return H.b(u)
if(x>u)x=u-1
v=v.r
if(typeof v!=="number")return H.b(v)
if(w>v)w=v-1
this.a=x-b+1
this.b=w-c+1
for(;!J.a7(a.d,z);){v=a.a
u=a.d
a.d=J.c(u,1)
u=J.e(v,u)
$.$get$e0()[0]=u
u=$.$get$eT()
if(0>=u.length)return H.a(u,0)
t=u[0]
if(t<0){s=-t
for(;r=s-1,s>0;s=r){v=a.a
u=a.d
a.d=J.c(u,1)
u=J.e(v,u)
if(y.a===y.c.length)y.dI()
v=y.c
q=y.a++
u=J.W(u,255)
if(q>=v.length)return H.a(v,q)
v[q]=u}}else for(s=t;r=s-1,s>=0;s=r){v=a.a
u=a.d
a.d=J.c(u,1)
u=J.e(v,u)
if(y.a===y.c.length)y.dI()
v=y.c
q=y.a++
u=J.W(u,255)
if(q>=v.length)return H.a(v,q)
v[q]=u}}z=y.c.buffer
p=(z&&C.e).ad(z,0,y.a)
for(o=p.length,n=1;n<o;++n)p[n]=p[n-1]+p[n]-128
z=this.d
if(z==null||z.length!==o){z=new Uint8Array(H.k(o))
this.d=z}v=C.a.al(o+1,2)
for(m=0,l=0;!0;v=i,m=j){if(l<o){k=l+1
j=m+1
if(m>=o)return H.a(p,m)
u=p[m]
q=z.length
if(l>=q)return H.a(z,l)
z[l]=u}else break
if(k<o){l=k+1
i=v+1
if(v>=o)return H.a(p,v)
v=p[v]
if(k>=q)return H.a(z,k)
z[k]=v}else break}return z},
ei:function(a,b,c){return this.bJ(a,b,c,null,null)}},
l_:{
"^":"ef;d,e,f,r,a,b,c",
f6:function(){return this.f},
bJ:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.d.b6(T.b5(a.aD(),1,null,0),!1)
if(d==null)d=this.c.f
if(e==null)e=this.c.fx
if(typeof d!=="number")return H.b(d)
y=b+d-1
if(typeof e!=="number")return H.b(e)
x=c+e-1
w=this.c
v=w.f
if(typeof v!=="number")return H.b(v)
if(y>v)y=v-1
w=w.r
if(typeof w!=="number")return H.b(w)
if(x>w)x=w-1
this.a=y-b+1
this.b=x-c+1
for(u=z.length,t=1;t<u;++t)z[t]=z[t-1]+z[t]-128
w=this.r
if(w==null||w.length!==u){w=new Uint8Array(H.k(u))
this.r=w}v=C.a.al(u+1,2)
for(s=0,r=0;!0;v=m,s=p){if(r<u){q=r+1
p=s+1
if(s>=u)return H.a(z,s)
o=z[s]
n=w.length
if(r>=n)return H.a(w,r)
w[r]=o}else break
if(q<u){r=q+1
m=v+1
if(v>=u)return H.a(z,v)
v=z[v]
if(q>=n)return H.a(w,q)
w[q]=v}else break}return w},
ei:function(a,b,c){return this.bJ(a,b,c,null,null)}},
oX:{
"^":"d2;b,c,d,e,f,r,a",
co:function(a){var z=this.b
if(z==null)return
z=z.d
if(a>=z.length)return H.a(z,a)
return U.x4(z[a].a,this.c)},
pU:function(a){var z=this.b
if(z==null)return
z=z.d
if(a>=z.length)return
return z[a].a},
dj:function(a,b){this.b=U.kY(a)
return this.co(b)},
hZ:function(a,b){this.b=U.kY(a)
return this.pU(b)},
kt:function(a){return this.hZ(a,0)}},
pu:{
"^":"o;a,b,c,d",
h:function(a,b){var z=this.d
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.d
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c
return c},
rI:[function(a,b){return 255},"$1","gdS",2,0,38],
ng:function(a){var z
for(z=1;z<=8;++z)if(C.a.W(1,z)>=a)return z
return 0},
ma:function(a){this.a=this.ng(a)},
static:{l6:function(a){var z=new U.pu(null,a,null,new Uint8Array(H.k(a*3)))
z.ma(a)
return z}}},
pw:{
"^":"o;G:a*,F:b*,N:c>,M:d>,e,hX:f<,i_:r',kn:x?,y",
mb:function(a){var z,y,x,w,v,u,t,s,r
this.a=a.t()
this.b=a.t()
this.c=a.t()
this.d=a.t()
z=a.a
y=a.d
a.d=J.c(y,1)
x=J.e(z,y)
y=J.y(x)
w=J.c(y.T(x,7),1)
this.e=y.T(x,64)!==0
if(y.T(x,128)!==0){if(typeof w!=="number")return H.b(w)
this.f=U.l6(C.a.u(1,w))
for(v=0;z=this.f,v<z.b;++v){y=a.a
u=a.d
a.d=J.c(u,1)
u=J.e(y,u)
y=a.a
t=a.d
a.d=J.c(t,1)
t=J.e(y,t)
y=a.a
s=a.d
a.d=J.c(s,1)
s=J.e(y,s)
r=v*3
z=z.d
y=z.length
if(r>=y)return H.a(z,r)
z[r]=u
u=r+1
if(u>=y)return H.a(z,u)
z[u]=t
t=r+2
if(t>=y)return H.a(z,t)
z[t]=s}}this.y=J.h(a.d,a.b)},
static:{px:function(a){var z=new U.pw(null,null,null,null,null,null,80,!0,null)
z.mb(a)
return z}}},
l7:{
"^":"dz;d,e,f,r,a,b,c"},
pv:{
"^":"d2;b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,a",
es:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
this.c=U.aa(a,!1,null,0)
this.b=new U.l7(0,null,!1,[],0,0,4294967295)
if(!this.js())return
try{for(;q=this.c,!J.a7(q.d,q.c);){q=this.c
p=q.a
o=q.d
q.d=J.c(o,1)
z=J.e(p,o)
switch(z){case 44:y=this.k7()
if(y==null){q=this.b
return q}this.b.r.push(y)
break
case 33:q=this.c
p=q.a
o=q.d
q.d=J.c(o,1)
x=J.e(p,o)
if(J.i(x,249)){q=this.c
p=q.a
o=q.d
q.d=J.c(o,1)
J.e(p,o)
o=this.c
p=o.a
q=o.d
o.d=J.c(q,1)
w=J.e(p,q)
v=this.c.t()
q=this.c
p=q.a
o=q.d
q.d=J.c(o,1)
u=J.e(p,o)
o=this.c
p=o.a
q=o.d
o.d=J.c(q,1)
J.e(p,q)
q=w
if(typeof q!=="number")return q.D()
t=C.b.p(q,3)&7
q=w
if(typeof q!=="number")return q.D()
C.b.p(q,1)
s=J.W(w,1)
q=this.c
n=J.c(q.d,0)
p=q.a
q.e
z=J.e(p,J.c(n,0))
if(J.i(z,44)){q=this.c
q.d=J.c(q.d,1)
r=this.k7()
if(r==null){q=this.b
return q}J.o0(r,v)
r.skn(J.i(t,2))
if(!J.i(s,0))if(r.ghX()!=null)r.ghX().c=u
else{q=this.b.e
if(q!=null)q.c=u}this.b.r.push(r)}}else this.hS()
break
case 59:q=this.b
this.e=q.r.length
return q
default:break}}}catch(m){H.ap(m)}q=this.b
this.e=q.r.length
return q},
co:function(a){var z,y,x,w
z=this.c
if(z==null||this.b==null)return
y=this.b.r
x=y.length
if(a>=x||!1)return
this.d=a
if(a>=x)return H.a(y,a)
w=y[a]
z.d=w.y
if(a>=x)return H.a(y,a)
return this.o1(w)},
dj:function(a,b){if(this.es(a)==null)return
this.d=0
this.e=1
return this.co(b)},
k7:function(){var z,y
z=this.c
if(J.a7(z.d,z.c))return
y=U.px(this.c)
z=this.c
z.d=J.c(z.d,1)
this.hS()
return y},
o1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(this.f==null){this.f=new Uint8Array(H.k(256))
this.r=new Uint8Array(H.k(4095))
this.x=new Uint8Array(H.k(4096))
this.y=new Uint32Array(H.k(4096))}z=this.c
y=z.a
x=z.d
z.d=J.c(x,1)
x=J.e(y,x)
this.z=x
if(typeof x!=="number")return H.b(x)
y=C.a.u(1,x)
this.go=y;++y
this.fy=y
this.fx=y+1;++x
this.fr=x
this.dy=C.a.u(1,x)
this.cy=0
this.dx=4098
this.cx=0
this.ch=0
this.f[0]=0
x=this.y;(x&&C.x).aF(x,0,x.length,4098)
w=a.c
v=a.d
z=a.a
y=this.b.a
if(typeof y!=="number")return H.b(y)
if(z+w>y||J.F(J.c(a.b,v),this.b.b))return
u=a.f
u=u!=null?u:this.b.e
this.Q=w*v
t=U.c_(w,v,4)
s=new Uint8Array(H.k(w))
if(a.e){r=a.b
for(z=J.w(r),q=0,p=0;q<4;++q)for(o=z.j(r,C.aU[q]);y=J.y(o),y.U(o,z.j(r,v));o=y.j(o,C.bB[q]),++p){if(!this.jv(s))return t
this.kb(t,o,u,s)}}else for(o=0;o<v;++o){if(!this.jv(s))return t
this.kb(t,o,u,s)}return t},
kb:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
if(c!=null)for(z=d.length,y=c.d,x=y.length,w=a.a,v=J.w(b),u=a.b,t=a.x,s=t.length,r=0;r<z;++r){q=d[r]
if(typeof q!=="number")return q.i()
p=q*3
o=q===c.c?0:255
if(p>=x)return H.a(y,p)
q=y[p]
n=p+1
if(n>=x)return H.a(y,n)
n=y[n]
m=p+2
if(m>=x)return H.a(y,m)
m=y[m]
l=C.a.v(o,0,255)
m=J.a4(m,0,255)
if(typeof m!=="number")return m.u()
n=J.a4(n,0,255)
if(typeof n!=="number")return n.u()
q=J.a4(q,0,255)
if(typeof q!=="number")return H.b(q)
if(typeof w!=="number")return H.b(w)
k=r<w&&v.av(b,0)&&v.U(b,u)
if(k){k=J.c(v.i(b,w),r)
if(k>>>0!==k||k>=s)return H.a(t,k)
t[k]=(l<<24|m<<16|n<<8|q)>>>0}}},
js:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.c.aj(6)
if(z!=="GIF87a"&&z!=="GIF89a")return!1
this.b.a=this.c.t()
this.b.b=this.c.t()
y=this.c
x=y.a
w=y.d
y.d=J.c(w,1)
v=J.e(x,w)
w=this.b
x=J.y(v)
y=J.c(x.T(v,112),1)
if(typeof y!=="number")return y.D()
w.d=C.b.p(y,4)+1
u=J.c(x.T(v,7),1)
y=this.b
w=this.c
t=w.a
s=w.d
w.d=J.c(s,1)
y.c=J.e(t,s)
s=this.c
s.d=J.c(s.d,1)
if(x.T(v,128)!==0){y=this.b
if(typeof u!=="number")return H.b(u)
y.e=U.l6(C.a.u(1,u))
for(r=0;r<this.b.e.b;++r){y=this.c
x=y.a
w=y.d
y.d=J.c(w,1)
q=J.e(x,w)
w=this.c
x=w.a
y=w.d
w.d=J.c(y,1)
p=J.e(x,y)
y=this.c
x=y.a
w=y.d
y.d=J.c(w,1)
v=J.e(x,w)
o=r*3
w=this.b.e.d
x=w.length
if(o>=x)return H.a(w,o)
w[o]=q
y=o+1
if(y>=x)return H.a(w,y)
w[y]=p
y=o+2
if(y>=x)return H.a(w,y)
w[y]=v}}this.b.f=z==="GIF89a"
return!0},
jv:function(a){var z=this.Q
if(typeof z!=="number")return z.l()
this.Q=z-a.length
if(!this.nE(a))return!1
if(this.Q===0)this.hS()
return!0},
hS:function(){var z,y,x,w
z=this.c
if(J.a7(z.d,z.c))return!0
z=this.c
y=z.a
x=z.d
z.d=J.c(x,1)
w=J.e(y,x)
while(!0){if(!J.i(w,0)){z=this.c
z=!J.a7(z.d,z.c)}else z=!1
if(!z)break
z=this.c
z.d=J.c(z.d,w)
z=this.c
if(J.a7(z.d,z.c))return!0
z=this.c
y=z.a
x=z.d
z.d=J.c(x,1)
w=J.e(y,x)}return!0},
nE:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.cy
if(typeof z!=="number")return z.a0()
if(z>4095)return!1
y=a.length
if(z!==0){x=0
while(!0){if(!(z!==0&&x<y))break
w=x+1
v=this.r;--z
this.cy=z
v.length
if(z<0)return H.a(v,z)
v=v[z]
if(x>=y)return H.a(a,x)
a[x]=v
x=w}}else x=0
for(u=null;x<y;){z=this.nD()
this.db=z
if(z==null)return!1
v=this.fy
if(z==null?v==null:z===v)return!1
t=this.go
if(z==null?t==null:z===t){for(z=this.y,s=0;s<=4095;++s){if(s>=z.length)return H.a(z,s)
z[s]=4098}if(typeof v!=="number")return v.j()
this.fx=v+1
z=J.c(this.z,1)
this.fr=z
if(typeof z!=="number")return H.b(z)
this.dy=C.a.u(1,z)
this.dx=4098}else{if(typeof z!=="number")return z.U()
if(typeof t!=="number")return H.b(t)
if(z<t){w=x+1
if(x<0)return H.a(a,x)
a[x]=z
x=w}else{v=this.y
if(z>=v.length)return H.a(v,z)
if(v[z]===4098){r=this.fx
if(typeof r!=="number")return r.l()
r-=2
if(z===r){u=this.dx
z=this.x
q=this.r
p=this.cy
if(typeof p!=="number")return p.j()
this.cy=p+1
t=this.hB(v,u,t)
q.length
if(p<0||p>=4095)return H.a(q,p)
q[p]=t
if(r<0||r>=z.length)return H.a(z,r)
z[r]=t}else return!1}else u=z
s=0
while(!0){o=s+1
if(s<=4095){z=this.go
if(typeof u!=="number")return u.a0()
if(typeof z!=="number")return H.b(z)
z=u>z&&u<=4095}else z=!1
if(!z)break
z=this.r
v=this.cy
if(typeof v!=="number")return v.j()
this.cy=v+1
t=this.x
if(u>>>0!==u||u>=t.length)return H.a(t,u)
t=t[u]
z.length
if(v<0||v>=4095)return H.a(z,v)
z[v]=t
t=this.y
if(u>=t.length)return H.a(t,u)
u=t[u]
s=o}if(o<4095){if(typeof u!=="number")return u.a0()
z=u>4095}else z=!0
if(z)return!1
z=this.r
v=this.cy
if(typeof v!=="number")return v.j()
t=v+1
this.cy=t
z.length
if(v<0||v>=4095)return H.a(z,v)
z[v]=u
v=t
while(!0){if(!(v!==0&&x<y))break
w=x+1;--v
this.cy=v
z.length
if(v<0||v>=4095)return H.a(z,v)
t=z[v]
if(x<0||x>=y)return H.a(a,x)
a[x]=t
x=w}}z=this.dx
if(z!==4098){v=this.y
t=this.fx
if(typeof t!=="number")return t.l()
t-=2
if(t<0||t>=v.length)return H.a(v,t)
t=v[t]===4098
v=t}else v=!1
if(v){v=this.y
t=this.fx
if(typeof t!=="number")return t.l()
t-=2
if(t<0||t>=v.length)return H.a(v,t)
v[t]=z
r=this.db
q=this.x
p=this.go
if(r===t){z=this.hB(v,z,p)
if(t>=q.length)return H.a(q,t)
q[t]=z}else{z=this.hB(v,r,p)
if(t>=q.length)return H.a(q,t)
q[t]=z}}this.dx=this.db}}return!0},
nD:function(){var z,y,x,w,v,u
if(J.F(this.fr,12))return
while(!0){z=this.cx
y=this.fr
if(typeof z!=="number")return z.U()
if(typeof y!=="number")return H.b(y)
if(!(z<y))break
x=this.nh()
z=this.ch
y=this.cx
if(typeof x!=="number")return x.u()
if(typeof y!=="number")return H.b(y)
w=C.a.u(x,y)
if(typeof z!=="number")return z.h8()
this.ch=(z|w)>>>0
this.cx=y+8}w=this.ch
if(y>>>0!==y||y>=13)return H.a(C.af,y)
v=C.af[y]
if(typeof w!=="number")return w.T()
this.ch=C.a.c5(w,y)
this.cx=z-y
z=this.fx
if(typeof z!=="number")return z.U()
if(z<4097){++z
this.fx=z
u=this.dy
if(typeof u!=="number")return H.b(u)
z=z>u&&y<12}else z=!1
if(z){z=this.dy
if(typeof z!=="number")return z.u()
this.dy=z<<1>>>0
this.fr=J.c(this.fr,1)}return w&v},
hB:function(a,b,c){var z,y,x
z=0
while(!0){if(typeof b!=="number")return b.a0()
if(typeof c!=="number")return H.b(c)
if(b>c){y=z+1
x=z<=4095
z=y}else x=!1
if(!x)break
if(b>4095)return 4098
if(b>=a.length)return H.a(a,b)
b=a[b]}return b},
nh:function(){var z,y,x,w,v,u,t,s
z=this.f
y=z[0]
if(y===0){y=this.c
x=y.a
w=y.d
y.d=J.c(w,1)
z[0]=J.e(x,w)
z=this.f
y=z[0]
if(y===0)return
x=this.c
v=J.c(x.d,0)
w=x.a
u=x.e
t=J.c(v,y)
x.d=J.c(x.d,J.h(t,v));(z&&C.j).cC(z,1,1+y,new U.ak(w,v,t,v,u).aD())
u=this.f
s=u[1]
u[1]=2
u[0]=u[0]-1}else{x=z[1]
z[1]=x+1
if(x>=256)return H.a(z,x)
s=z[x]
z[0]=y-1}return s}},
qt:{
"^":"o;a,b,c,d"},
eq:{
"^":"o;a,aL:b<,c,d,e,f,r,x,y,z"},
ie:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
rk:function(a){var z,y,x,w
this.b=U.aa(a,!0,null,0)
if(!J.i(this.dK(),216))return!1
z=this.dK()
y=!1
x=!1
while(!0){if(!J.i(z,217)){w=this.b
w=!J.a7(w.d,w.c)}else w=!1
if(!w)break
this.pj()
switch(z){case 192:case 193:case 194:y=!0
break
case 218:x=!0
break}z=this.dK()}return y&&x},
l1:function(a){var z,y,x,w,v,u,t,s
this.b=U.aa(a,!0,null,0)
this.oM()
if(this.x.length!==1)throw H.l(new U.L("Only single frame JPEGs supported"))
this.ch=0
this.cx=0
for(z=0;y=this.e,x=y.Q,z<x.length;++z){w=y.z.h(0,x[z])
y=this.ch
x=w.f
if(typeof x!=="number")return H.b(x)
this.ch=y+x}for(y=this.Q,z=0;x=this.e,v=x.Q,z<v.length;++z){w=x.z.h(0,v[z])
x=w.a
v=this.e
u=v.f
t=w.b
s=v.r
if(typeof t!=="number")return t.w()
if(typeof s!=="number")return H.b(s)
y.push(P.av(["scaleX",x/u,"scaleY",t/s,"lines",this.ni(v,w)]))}},
gN:function(a){return this.e.e},
gM:function(a){return this.e.d},
iE:function(b9,c0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8
z=this.Q
y=H.k(J.d(J.d(b9,c0),z.length))
x=new Uint8Array(y)
w=z.length
switch(w){case 1:if(0>=w)return H.a(z,0)
v=z[0]
if(typeof c0!=="number")return H.b(c0)
u=0
t=null
s=0
for(;s<c0;++s){z=v.h(0,"lines")
w=v.h(0,"scaleY")
if(typeof w!=="number")return H.b(w)
r=J.e(z,C.b.I(s*w))
if(typeof b9!=="number")return H.b(b9)
z=J.D(r)
q=0
for(;q<b9;++q,u=p){w=v.h(0,"scaleX")
if(typeof w!=="number")return H.b(w)
t=z.h(r,C.b.I(q*w))
p=u+1
if(u<0||u>=y)return H.a(x,u)
x[u]=t}}break
case 2:if(0>=w)return H.a(z,0)
v=z[0]
if(1>=w)return H.a(z,1)
o=z[1]
if(typeof c0!=="number")return H.b(c0)
u=0
t=null
s=0
for(;s<c0;++s){z=v.h(0,"lines")
w=v.h(0,"scaleY")
if(typeof w!=="number")return H.b(w)
r=J.e(z,s*w)
w=o.h(0,"lines")
z=o.h(0,"scaleY")
if(typeof z!=="number")return H.b(z)
n=J.e(w,s*z)
if(typeof b9!=="number")return H.b(b9)
z=J.D(r)
w=J.D(n)
q=0
for(;q<b9;++q){m=v.h(0,"scaleX")
if(typeof m!=="number")return H.b(m)
t=z.h(r,C.b.I(q*m))
p=u+1
if(u<0||u>=y)return H.a(x,u)
x[u]=t
m=o.h(0,"scaleX")
if(typeof m!=="number")return H.b(m)
t=w.h(n,C.b.I(q*m))
u=p+1
if(p<0||p>=y)return H.a(x,p)
x[p]=t}}break
case 3:if(0>=w)return H.a(z,0)
v=z[0]
if(1>=w)return H.a(z,1)
o=z[1]
if(2>=w)return H.a(z,2)
l=z[2]
z=v.h(0,"scaleY")
if(typeof z!=="number")return z.i()
w=o.h(0,"scaleY")
if(typeof w!=="number")return w.i()
m=l.h(0,"scaleY")
if(typeof m!=="number")return m.i()
k=v.h(0,"scaleX")
if(typeof k!=="number")return k.i()
j=o.h(0,"scaleX")
if(typeof j!=="number")return j.i()
i=l.h(0,"scaleX")
if(typeof i!=="number")return i.i()
h=v.h(0,"lines")
g=o.h(0,"lines")
f=l.h(0,"lines")
if(typeof c0!=="number")return H.b(c0)
e=J.D(h)
d=J.D(g)
c=J.D(f)
u=0
t=null
b=null
a=null
a0=null
a1=null
a2=null
s=0
for(;s<c0;++s){r=e.h(h,C.b.I(s*z))
n=d.h(g,C.b.I(s*w))
a3=c.h(f,C.b.I(s*m))
if(typeof b9!=="number")return H.b(b9)
a4=J.D(r)
a5=J.D(n)
a6=J.D(a3)
q=0
for(;q<b9;++q){t=a4.h(r,C.b.I(q*k))
b=a5.h(n,C.b.I(q*j))
a=a6.h(a3,C.b.I(q*i))
if(t>>>0!==t||t>=256)return H.a(C.a9,t)
a7=C.a9[t]
if(a>>>0!==a||a>=256)return H.a(C.ai,a)
a0=a7+C.ai[a]
if(b>>>0!==b||b>=256)return H.a(C.an,b)
a1=a7-C.an[b]-C.f5[a]
a2=a7+C.ed[b]
p=u+1
if(a0>0){a7=C.a.p(a0,4)
if(a7>255)a7=255}else a7=0
if(u<0||u>=y)return H.a(x,u)
x[u]=a7
u=p+1
if(a1>0){a7=C.a.p(a1,4)
if(a7>255)a7=255}else a7=0
if(p<0||p>=y)return H.a(x,p)
x[p]=a7
p=u+1
if(a2>0){a7=C.a.p(a2,4)
if(a7>255)a7=255}else a7=0
if(u<0||u>=y)return H.a(x,u)
x[u]=a7
u=p}}break
case 4:w=this.d
if(w==null)throw H.l(new U.L("Unsupported color mode (4 components)"))
a8=!J.i(w.d,0)&&!0
w=z.length
if(0>=w)return H.a(z,0)
v=z[0]
if(1>=w)return H.a(z,1)
o=z[1]
if(2>=w)return H.a(z,2)
l=z[2]
if(3>=w)return H.a(z,3)
a9=z[3]
z=v.h(0,"scaleX")
if(typeof z!=="number")return z.i()
w=o.h(0,"scaleX")
if(typeof w!=="number")return w.i()
m=l.h(0,"scaleX")
if(typeof m!=="number")return m.i()
k=a9.h(0,"scaleX")
if(typeof k!=="number")return k.i()
j=v.h(0,"scaleY")
if(typeof j!=="number")return j.i()
i=o.h(0,"scaleY")
if(typeof i!=="number")return i.i()
e=l.h(0,"scaleY")
if(typeof e!=="number")return e.i()
d=a9.h(0,"scaleY")
if(typeof d!=="number")return d.i()
if(typeof c0!=="number")return H.b(c0)
c=!a8
u=0
t=null
b=null
a=null
b0=null
b1=null
b2=null
b3=null
s=0
for(;s<c0;++s){r=J.e(v.h(0,"lines"),C.b.I(s*j))
n=J.e(o.h(0,"lines"),C.b.I(s*i))
a3=J.e(l.h(0,"lines"),C.b.I(s*e))
b4=J.e(a9.h(0,"lines"),C.b.I(s*d))
if(typeof b9!=="number")return H.b(b9)
a4=J.D(r)
a5=J.D(n)
a6=J.D(a3)
a7=J.D(b4)
q=0
for(;q<b9;++q){b5=q*w
b6=q*z
b7=q*m
b8=q*k
if(c){b1=a4.h(r,C.b.I(b6))
b2=a5.h(n,C.b.I(b5))
b3=a6.h(a3,C.b.I(b7))
b0=a7.h(b4,C.b.I(b8))}else{t=a4.h(r,C.b.I(b6))
b=a5.h(n,C.b.I(b5))
a=a6.h(a3,C.b.I(b7))
b0=a7.h(b4,C.b.I(b8))
b5=J.y(a)
b6=b5.l(a,128)
if(typeof b6!=="number")return H.b(b6)
b7=J.w(t)
b6=J.aW(b7.j(t,1.402*b6))
if(b6<0)b6=0
else if(b6>255)b6=255
b1=255-b6
b6=J.y(b)
b8=b6.l(b,128)
if(typeof b8!=="number")return H.b(b8)
b8=b7.l(t,0.3441363*b8)
b5=b5.l(a,128)
if(typeof b5!=="number")return H.b(b5)
b5=J.aW(J.h(b8,0.71413636*b5))
if(b5<0)b5=0
else if(b5>255)b5=255
b2=255-b5
b6=b6.l(b,128)
if(typeof b6!=="number")return H.b(b6)
b6=J.aW(b7.j(t,1.772*b6))
if(b6<0)b5=0
else b5=b6>255?255:b6
b3=255-b5}p=u+1
if(u<0||u>=y)return H.a(x,u)
x[u]=b1
u=p+1
if(p<0||p>=y)return H.a(x,p)
x[p]=b2
p=u+1
if(u<0||u>=y)return H.a(x,u)
x[u]=b3
u=p+1
if(p<0||p>=y)return H.a(x,p)
x[p]=b0}}break
default:throw H.l(new U.L("Unsupported color mode"))}return x},
oM:function(){var z,y,x,w,v,u,t,s,r
if(!J.i(this.dK(),216))throw H.l(new U.L("Start Of Image marker not found."))
z=this.dK()
while(!0){y=J.O(z)
if(!y.B(z,217)){x=this.b
x=!J.a7(x.d,x.c)}else x=!1
if(!x)break
w=this.oN()
switch(z){case 224:case 225:case 226:case 227:case 228:case 229:case 230:case 231:case 232:case 233:case 234:case 235:case 236:case 237:case 238:case 239:case 254:if(y.B(z,224))if(J.i(J.e(w.a,J.c(w.d,0)),74)&&J.i(J.e(w.a,J.c(w.d,1)),70)&&J.i(J.e(w.a,J.c(w.d,2)),73)&&J.i(J.e(w.a,J.c(w.d,3)),70)&&J.i(J.e(w.a,J.c(w.d,4)),0)){x=new U.qw(null,null,null,null,null,null,null,null)
this.c=x
x.a=J.e(w.a,J.c(w.d,5))
this.c.b=J.e(w.a,J.c(w.d,6))
this.c.c=J.e(w.a,J.c(w.d,7))
this.c.d=J.be(J.d(J.e(w.a,J.c(w.d,8)),256),J.e(w.a,J.c(w.d,9)))
this.c.e=J.be(J.d(J.e(w.a,J.c(w.d,10)),256),J.e(w.a,J.c(w.d,11)))
this.c.f=J.e(w.a,J.c(w.d,12))
this.c.r=J.e(w.a,J.c(w.d,13))
x=this.c
v=x.f
if(typeof v!=="number")return H.b(v)
u=x.r
if(typeof u!=="number")return H.b(u)
t=J.c(w.d,14)
s=w.a
r=w.e
x.x=new U.ak(s,t,J.c(t,14+3*v*u),t,r)}if(y.B(z,238))if(J.i(J.e(w.a,J.c(w.d,0)),65)&&J.i(J.e(w.a,J.c(w.d,1)),100)&&J.i(J.e(w.a,J.c(w.d,2)),111)&&J.i(J.e(w.a,J.c(w.d,3)),98)&&J.i(J.e(w.a,J.c(w.d,4)),101)&&J.i(J.e(w.a,J.c(w.d,5)),0)){y=new U.qt(null,null,null,null)
this.d=y
y.a=J.e(w.a,J.c(w.d,6))
this.d.b=J.be(J.d(J.e(w.a,J.c(w.d,7)),256),J.e(w.a,J.c(w.d,8)))
this.d.c=J.be(J.d(J.e(w.a,J.c(w.d,9)),256),J.e(w.a,J.c(w.d,10)))
this.d.d=J.e(w.a,J.c(w.d,11))}break
case 219:this.oR(w)
break
case 192:case 193:case 194:this.oS(z,w)
break
case 195:case 197:case 198:case 199:case 200:case 201:case 202:case 203:case 205:case 206:case 207:throw H.l(new U.L("Unhandled frame type "+y.f9(z,16)))
case 196:this.oQ(w)
break
case 221:this.f=w.t()
break
case 218:this.p4(w)
break
default:x=this.b
if(J.i(J.e(x.a,J.c(x.d,-3)),255)){x=this.b
if(J.a7(J.e(x.a,J.c(x.d,-2)),192)){x=this.b
x=J.aG(J.e(x.a,J.c(x.d,-2)),254)}else x=!1}else x=!1
if(x){y=this.b
y.d=J.h(y.d,3)
break}if(!y.B(z,0))throw H.l(new U.L("Unknown JPEG marker "+y.f9(z,16)))
break}z=this.dK()}},
pj:function(){var z,y
z=this.b.t()
if(z<2)throw H.l(new U.L("Invalid Block"))
y=this.b
y.d=J.c(y.d,z-2)},
oN:function(){var z,y,x,w,v,u
z=this.b.t()
if(z<2)throw H.l(new U.L("Invalid Block"))
y=this.b
x=J.c(y.d,0)
w=y.a
v=y.e
u=J.c(x,z-2)
y.d=J.c(y.d,J.h(u,x))
return new U.ak(w,x,u,x,v)},
dK:function(){var z,y,x,w
z=this.b
if(J.a7(z.d,z.c))return 0
do{do{z=this.b
y=z.a
x=z.d
z.d=J.c(x,1)
if(!J.i(J.e(y,x),255)){z=this.b
z=!J.a7(z.d,z.c)}else z=!1}while(z)
do{z=this.b
y=z.a
x=z.d
z.d=J.c(x,1)
w=J.e(y,x)
z=J.O(w)
if(z.B(w,255)){y=this.b
y=!J.a7(y.d,y.c)}else y=!1}while(y)
if(z.B(w,0)){z=this.b
z=!J.a7(z.d,z.c)}else z=!1}while(z)
return w},
oR:function(a){var z,y,x,w,v,u,t,s,r,q
for(z=a.c,y=this.r;!J.a7(a.d,z);){x=a.a
w=a.d
a.d=J.c(w,1)
v=J.e(x,w)
u=J.a_(J.G(v,16))
if(typeof v!=="number")return v.T()
v&=15
if(v>=4)throw H.l(new U.L("Invalid number of quantization tables"))
x=y[v]
if(x==null){x=new Int32Array(64)
y[v]=x}for(w=u!==0,t=0;t<64;++t){if(w)s=a.t()
else{r=a.a
q=a.d
a.d=J.c(q,1)
s=J.e(r,q)}r=C.u[t]
x.length
if(r>=64)return H.a(x,r)
x[r]=s}}if(!J.a7(a.d,z))throw H.l(new U.L("Bad length for DQT block"))},
oS:function(a,b){var z,y,x,w,v,u,t,s,r
if(this.e!=null)throw H.l(new U.L("Duplicate JPG frame data found."))
z=P.a5()
y=[]
y.$builtinTypeInfo=[P.x]
z=new U.qv(null,null,null,null,null,0,0,null,null,z,y)
this.e=z
y=J.O(a)
z.a=y.B(a,193)
this.e.b=y.B(a,194)
y=this.e
z=b.a
x=b.d
b.d=J.c(x,1)
y.c=J.e(z,x)
this.e.d=b.t()
this.e.e=b.t()
x=b.a
z=b.d
b.d=J.c(z,1)
w=J.e(x,z)
if(typeof w!=="number")return H.b(w)
z=this.r
v=0
for(;v<w;++v){y=b.a
x=b.d
b.d=J.c(x,1)
u=J.e(y,x)
x=b.a
y=b.d
b.d=J.c(y,1)
t=J.e(x,y)
y=J.a_(J.G(t,16))
if(typeof t!=="number")return t.T()
x=b.a
s=b.d
b.d=J.c(s,1)
r=J.e(x,s)
this.e.Q.push(u)
this.e.z.k(0,u,new U.eq(y&15,t&15,z,r,null,null,null,null,null,null))}this.e.qL()
this.x.push(this.e)},
oQ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=a.c,y=this.z,x=this.y;!J.a7(a.d,z);){w=a.a
v=a.d
a.d=J.c(v,1)
u=J.e(w,v)
t=new Uint8Array(16)
for(s=0,r=0;r<16;++r){w=a.a
v=a.d
a.d=J.c(v,1)
t[r]=J.e(w,v)
v=t[r]
if(typeof v!=="number")return H.b(v)
s+=v}if(typeof s!=="number"||Math.floor(s)!==s)H.T(P.aD("Invalid length "+H.m(s)))
q=new Uint8Array(s)
for(w=q.length,r=0;r<s;++r){v=a.a
p=a.d
a.d=J.c(p,1)
p=J.e(v,p)
if(r>=w)return H.a(q,r)
q[r]=p}w=J.y(u)
if(w.T(u,16)!==0){u=w.l(u,16)
o=x}else o=y
w=o.length
if(typeof u!=="number")return H.b(u)
if(w<=u)C.c.sn(o,u+1)
w=this.nj(t,q)
if(u>>>0!==u||u>=o.length)return H.a(o,u)
o[u]=w}},
p4:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=a.a
y=a.d
a.d=J.c(y,1)
x=J.e(z,y)
z=J.y(x)
if(z.U(x,1)||z.a0(x,4))throw H.l(new U.L("Invalid SOS block"))
if(typeof x!=="number")return H.b(x)
w=Array(x)
for(z=this.y,y=this.z,v=w.length,u=0;u<x;++u){t=a.a
s=a.d
a.d=J.c(s,1)
r=J.e(t,s)
s=a.a
t=a.d
a.d=J.c(t,1)
q=J.e(s,t)
if(!this.e.z.O(r))throw H.l(new U.L("Invalid Component in SOS block"))
p=this.e.z.h(0,r)
if(u>=v)return H.a(w,u)
w[u]=p
o=J.a_(J.G(q,16))&15
if(typeof q!=="number")return q.T()
n=q&15
t=y.length
if(o<t){if(o>=t)return H.a(y,o)
p.x=y[o]}t=z.length
if(n<t){if(n>=t)return H.a(z,n)
p.y=z[n]}}z=a.a
y=a.d
a.d=J.c(y,1)
m=J.e(z,y)
y=a.a
z=a.d
a.d=J.c(z,1)
l=J.e(y,z)
z=a.a
y=a.d
a.d=J.c(y,1)
k=J.e(z,y)
y=J.a_(J.G(k,16))
if(typeof k!=="number")return k.T()
z=this.b
v=this.e
y=new U.qx(z,v,null,null,null,null,null,null,null,w,this.f,m,l,y&15,k&15,0,0,0,0,null)
y.c=v.c
y.d=v.e
y.e=v.d
y.f=v.x
y.r=v.b
y.x=v.f
y.y=v.r
y.cn()},
nj:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=[]
y=16
while(!0){if(!(y>0&&J.i(a[y-1],0)))break;--y}z.push(P.av(["children",[],"index",0]))
if(0>=z.length)return H.a(z,0)
x=z[0]
for(w=b.length,v=0,u=null,t=0;t<y;){s=0
while(!0){r=a[t]
if(typeof r!=="number")return H.b(r)
if(!(s<r))break
if(0>=z.length)return H.a(z,0)
x=z.pop()
r=J.a0(x.h(0,"children"))
q=x.h(0,"index")
if(typeof q!=="number")return H.b(q)
if(r<=q){r=x.h(0,"children")
q=x.h(0,"index")
if(typeof q!=="number")return q.j()
J.hm(r,q+1)}r=x.h(0,"children")
q=x.h(0,"index")
if(v<0||v>=w)return H.a(b,v)
J.u(r,q,b[v])
while(!0){r=x.h(0,"index")
if(typeof r!=="number")return r.a0()
if(!(r>0))break
if(0>=z.length)return H.a(z,0)
x=z.pop()}r=x.h(0,"index")
if(typeof r!=="number")return r.j()
x.k(0,"index",r+1)
z.push(x)
for(;z.length<=t;x=u){u=P.av(["children",[],"index",0])
z.push(u)
if(J.aG(J.a0(x.h(0,"children")),x.h(0,"index")))J.hm(x.h(0,"children"),J.c(x.h(0,"index"),1))
J.u(x.h(0,"children"),x.h(0,"index"),u.h(0,"children"))}++v;++s}++t
if(t<y){u=P.av(["children",[],"index",0])
z.push(u)
if(J.aG(J.a0(x.h(0,"children")),x.h(0,"index")))J.hm(x.h(0,"children"),J.c(x.h(0,"index"),1))
J.u(x.h(0,"children"),x.h(0,"index"),u.h(0,"children"))
x=u}}if(0>=z.length)return H.a(z,0)
return z[0].h(0,"children")},
ni:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=b.e
y=b.f
if(typeof z!=="number")return z.i()
x=z*8
w=new Int32Array(64)
v=new Uint8Array(64)
if(typeof y!=="number")return y.i()
u=y*8
t=Array(u)
t.fixed$length=Array
for(s=b.c,r=b.d,q=0,p=0;p<y;++p){o=p*8
for(n=0;n<8;++n,q=m){m=q+1
l=new Uint8Array(x)
if(q<0||q>=u)return H.a(t,q)
t[q]=l}for(k=0;k<z;++k){if(r>>>0!==r||r>=4)return H.a(s,r)
l=s[r]
j=b.r
if(p>=j.length)return H.a(j,p)
j=j[p]
if(k>=j.length)return H.a(j,k)
this.oL(l,j[k],v,w)
i=k*8
for(h=0,g=0;g<8;++g){l=o+g
if(l>=u)return H.a(t,l)
f=t[l]
for(l=J.aQ(f),n=0;n<8;++n,h=e){e=h+1
if(h<0||h>=64)return H.a(v,h)
l.k(f,i+n,v[h])}}}}return t},
oL:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if($.ig==null){z=new Uint8Array(768)
$.ig=z
for(y=-256;y<0;++y){x=256+y
if(x>=768)return H.a(z,x)
z[x]=0}for(y=0;y<256;++y){x=256+y
if(x>=768)return H.a(z,x)
z[x]=y}for(y=256;y<512;++y){x=256+y
if(x>=768)return H.a(z,x)
z[x]=255}}for(y=0;y<64;++y){z=b[y]
x=a[y]
if(typeof x!=="number")return H.b(x)
d[y]=z*x}for(w=0,y=0;y<8;++y,w+=8){z=1+w
if(z>=64)return H.a(d,z)
if(d[z]===0){x=2+w
if(x>=64)return H.a(d,x)
if(d[x]===0){x=3+w
if(x>=64)return H.a(d,x)
if(d[x]===0){x=4+w
if(x>=64)return H.a(d,x)
if(d[x]===0){x=5+w
if(x>=64)return H.a(d,x)
if(d[x]===0){x=6+w
if(x>=64)return H.a(d,x)
if(d[x]===0){x=7+w
if(x>=64)return H.a(d,x)
x=d[x]===0}else x=!1}else x=!1}else x=!1}else x=!1}else x=!1}else x=!1
if(x){if(w>=64)return H.a(d,w)
v=C.d.X((5793*d[w]+512)/1024)
d[w]=v
z=w+1
if(z>=64)return H.a(d,z)
d[z]=v
z=w+2
if(z>=64)return H.a(d,z)
d[z]=v
z=w+3
if(z>=64)return H.a(d,z)
d[z]=v
z=w+4
if(z>=64)return H.a(d,z)
d[z]=v
z=w+5
if(z>=64)return H.a(d,z)
d[z]=v
z=w+6
if(z>=64)return H.a(d,z)
d[z]=v
z=w+7
if(z>=64)return H.a(d,z)
d[z]=v
continue}if(w>=64)return H.a(d,w)
u=C.d.X((5793*d[w]+128)/256)
x=4+w
if(x>=64)return H.a(d,x)
t=C.d.X((5793*d[x]+128)/256)
s=2+w
if(s>=64)return H.a(d,s)
r=d[s]
q=6+w
if(q>=64)return H.a(d,q)
p=d[q]
o=d[z]
n=7+w
if(n>=64)return H.a(d,n)
m=C.d.X((2896*(o-d[n])+128)/256)
l=C.d.X((2896*(d[z]+d[n])+128)/256)
o=3+w
if(o>=64)return H.a(d,o)
k=d[o]*16
j=5+w
if(j>=64)return H.a(d,j)
i=d[j]*16
v=C.d.X((u-t+1)/2)
u=C.d.X((u+t+1)/2)
h=C.d.X((r*3784+p*1567+128)/256)
r=C.d.X((r*1567-p*3784+128)/256)
g=C.d.X((m-i+1)/2)
m=C.d.X((m+i+1)/2)
f=C.d.X((l+k+1)/2)
k=C.d.X((l-k+1)/2)
e=C.d.X((u-h+1)/2)
u=C.d.X((u+h+1)/2)
h=C.d.X((v-r+1)/2)
t=C.d.X((v+r+1)/2)
v=C.d.X((m*2276+f*3406+2048)/4096)
m=C.d.X((m*3406-f*2276+2048)/4096)
f=C.d.X((k*799+g*4017+2048)/4096)
k=C.d.X((k*4017-g*799+2048)/4096)
d[w]=u+v
d[n]=u-v
d[z]=t+f
d[q]=t-f
d[s]=h+k
d[j]=h-k
d[o]=e+m
d[x]=e-m}for(y=0;y<8;++y){z=8+y
if(d[z]===0&&d[16+y]===0&&d[24+y]===0&&d[32+y]===0&&d[40+y]===0&&d[48+y]===0&&d[56+y]===0){v=C.d.X((5793*d[y]+8192)/16384)
d[y]=v
d[z]=v
d[16+y]=v
d[24+y]=v
d[32+y]=v
d[40+y]=v
d[48+y]=v
d[56+y]=v
continue}u=C.d.X((5793*d[y]+2048)/4096)
x=32+y
t=C.d.X((5793*d[x]+2048)/4096)
s=16+y
r=d[s]
q=48+y
p=d[q]
o=56+y
m=C.d.X((2896*(d[z]-d[o])+2048)/4096)
l=C.d.X((2896*(d[z]+d[o])+2048)/4096)
n=24+y
k=d[n]
j=40+y
i=d[j]
v=C.d.X((u-t+1)/2)
u=C.d.X((u+t+1)/2)
h=C.d.X((r*3784+p*1567+2048)/4096)
r=C.d.X((r*1567-p*3784+2048)/4096)
g=C.d.X((m-i+1)/2)
m=C.d.X((m+i+1)/2)
f=C.d.X((l+k+1)/2)
k=C.d.X((l-k+1)/2)
e=C.d.X((u-h+1)/2)
u=C.d.X((u+h+1)/2)
h=C.d.X((v-r+1)/2)
t=C.d.X((v+r+1)/2)
v=C.d.X((m*2276+f*3406+2048)/4096)
m=C.d.X((m*3406-f*2276+2048)/4096)
f=C.d.X((k*799+g*4017+2048)/4096)
k=C.d.X((k*4017-g*799+2048)/4096)
d[y]=u+v
d[o]=u-v
d[z]=t+f
d[q]=t-f
d[s]=h+k
d[j]=h-k
d[n]=e+m
d[x]=e-m}for(y=0;y<64;++y){z=$.ig
x=384+C.d.X((d[y]+8)/16)
if(x<0||x>=z.length)return H.a(z,x)
c[y]=z[x]}}},
qv:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q",
qL:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
for(z=this.z,y=z.gcP(),y=y.gax(y);y.a9();){x=z.h(0,y.gas())
w=this.f
v=x.a
if(w<v)this.f=v
w=this.r
v=x.b
if(typeof w!=="number")return w.U()
if(typeof v!=="number")return H.b(v)
if(w<v)this.r=v}y=this.e
if(typeof y!=="number")return y.w()
this.x=C.b.I(Math.ceil(y/8/this.f))
y=this.d
if(typeof y!=="number")return y.w()
w=this.r
if(typeof w!=="number")return H.b(w)
this.y=C.b.I(Math.ceil(y/8/w))
for(y=z.gcP(),y=y.gax(y);y.a9();){x=z.h(0,y.gas())
w=this.e
if(typeof w!=="number")return w.w()
w=C.b.I(Math.ceil(w/8))
v=x.a
u=C.b.I(Math.ceil(w*v/this.f))
w=this.d
if(typeof w!=="number")return w.w()
w=C.b.I(Math.ceil(w/8))
t=x.b
if(typeof t!=="number")return H.b(t)
s=this.r
if(typeof s!=="number")return H.b(s)
r=C.b.I(Math.ceil(w*t/s))
s=this.x
if(typeof s!=="number")return s.i()
q=s*v
v=this.y
s=x.b
if(typeof v!=="number")return v.i()
if(typeof s!=="number")return H.b(s)
p=v*s
o=Array(p)
for(n=0;n<p;++n){m=Array(q)
for(l=0;l<q;++l)m[l]=new Int32Array(64)
if(n>=p)return H.a(o,n)
o[n]=m}x.e=u
x.f=r
x.r=o}}},
qw:{
"^":"o;a,b,c,d,e,f,r,x"},
qx:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy",
cn:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.z
y=z.length
if(this.r===!0)if(J.i(this.ch,0))x=this.cy===0?this.gny():this.gnz()
else x=this.cy===0?this.gns():this.gnt()
else x=this.gnw()
w=y===1
if(w){if(0>=y)return H.a(z,0)
v=z[0]
u=v.e
v=v.f
if(typeof u!=="number")return u.i()
if(typeof v!=="number")return H.b(v)
t=u*v}else{v=this.f
u=this.b.y
if(typeof v!=="number")return v.i()
if(typeof u!=="number")return H.b(u)
t=v*u}v=this.Q
if(v==null||v===0)this.Q=t
for(s=null,r=0,q=null,p=null;r<t;){for(o=0;o<y;++o)z[o].z=0
this.fr=0
if(w){if(0>=y)return H.a(z,0)
s=z[0]
n=0
while(!0){v=this.Q
if(typeof v!=="number")return H.b(v)
if(!(n<v))break
v=s.e
if(typeof v!=="number")return H.b(v)
m=C.a.ar(r,v)
l=C.a.R(r,v)
v=s.r
if(m<0||m>=v.length)return H.a(v,m)
v=v[m]
if(l<0||l>=v.length)return H.a(v,l)
x.$2(s,v[l]);++r;++n}}else{n=0
while(!0){v=this.Q
if(typeof v!=="number")return H.b(v)
if(!(n<v))break
for(o=0;o<y;++o){s=z[o]
q=s.a
p=s.b
if(typeof p!=="number")return H.b(p)
k=0
for(;k<p;++k)for(j=0;j<q;++j){v=this.f
if(typeof v!=="number")return H.b(v)
i=C.a.ar(r,v)
h=C.a.R(r,v)
v=s.b
if(typeof v!=="number")return H.b(v)
m=i*v+k
l=h*q+j
v=s.r
if(m<0||m>=v.length)return H.a(v,m)
v=v[m]
if(l<0||l>=v.length)return H.a(v,l)
x.$2(s,v[l])}}++r;++n}}this.dy=0
v=this.a
g=J.e(v.a,J.c(v.d,0))
v=this.a
f=J.e(v.a,J.c(v.d,1))
if(J.i(g,255)){v=J.y(f)
if(v.av(f,208)&&v.ab(f,215)){v=this.a
v.d=J.c(v.d,2)}else break}}},
dP:function(){var z,y,x,w
z=this.dy
if(z>0){--z
this.dy=z
y=this.dx
if(typeof y!=="number")return y.D()
return C.b.D(y,z)&1}z=this.a
y=z.a
x=z.d
z.d=J.c(x,1)
x=J.e(y,x)
this.dx=x
if(J.i(x,255)){z=this.a
y=z.a
x=z.d
z.d=J.c(x,1)
w=J.e(y,x)
if(!J.i(w,0)){z=this.dx
if(typeof z!=="number")return z.u()
if(typeof w!=="number")return H.b(w)
throw H.l(new U.L("unexpected marker: "+C.a.f9((z<<8|w)>>>0,16)))}}this.dy=7
z=this.dx
if(typeof z!=="number")return z.D()
return C.b.p(z,7)},
eF:function(a){var z,y
for(z=a;y=this.dP(),!0;){z=J.e(z,y)
if(typeof z==="number")return C.b.I(z)}return},
hO:function(a){var z,y
z=0
while(!0){if(typeof a!=="number")return a.a0()
if(!(a>0))break
y=this.dP()
z=(z<<1|y)>>>0;--a}return z},
eI:function(a){var z,y
z=this.hO(a)
if(typeof a!=="number")return a.l()
y=C.a.u(1,a-1)
if(typeof z!=="number")return z.av()
if(z>=y)return z
return z+C.a.u(-1,a)+1},
rz:[function(a,b){var z,y,x,w,v,u,t,s
z=this.eF(a.x)
y=z===0?0:this.eI(z)
x=a.z
if(typeof x!=="number")return x.j()
x+=y
a.z=x
b[0]=x
for(w=1;w<64;){v=this.eF(a.y)
if(typeof v!=="number")return v.T()
u=v&15
t=C.a.p(v,4)
if(u===0){if(t<15)break
w+=16
continue}w+=t
if(w<0||w>=80)return H.a(C.u,w)
s=C.u[w]
x=this.eI(u)
if(s>=64)return H.a(b,s)
b[s]=x;++w}},"$2","gnw",4,0,8],
rA:[function(a,b){var z,y,x,w
z=this.eF(a.x)
if(z===0)y=0
else{x=this.eI(z)
w=this.db
if(typeof w!=="number")return H.b(w)
y=C.a.W(x,w)}x=a.z
if(typeof x!=="number")return x.j()
x+=y
a.z=x
b[0]=x},"$2","gny",4,0,8],
rB:[function(a,b){var z,y,x
z=b[0]
y=this.dP()
x=this.db
if(typeof x!=="number")return H.b(x)
b[0]=(z|C.a.W(y,x))>>>0},"$2","gnz",4,0,8],
rv:[function(a,b){var z,y,x,w,v,u,t,s,r
z=this.fr
if(z>0){this.fr=z-1
return}y=this.ch
x=this.cx
for(z=this.db;w=J.y(y),w.ab(y,x);){v=this.eF(a.y)
if(typeof v!=="number")return v.T()
u=v&15
t=C.a.p(v,4)
if(u===0){if(t<15){z=this.hO(t)
w=C.a.W(1,t)
if(typeof z!=="number")return z.j()
this.fr=z+w-1
break}y=w.j(y,16)
continue}y=w.j(y,t)
if(y>>>0!==y||y>=80)return H.a(C.u,y)
s=C.u[y]
w=this.eI(u)
if(typeof z!=="number")return H.b(z)
r=C.a.W(1,z)
b.length
if(s>=64)return H.a(b,s)
b[s]=w*r;++y}},"$2","gns",4,0,8],
rw:[function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.ch
y=this.cx
for(x=this.db,w=0;J.aG(z,y);){if(z>>>0!==z||z>=80)return H.a(C.u,z)
v=C.u[z]
u=this.fx
switch(u){case 0:t=this.eF(a.y)
if(typeof t!=="number")return t.T()
s=t&15
r=C.a.p(t,4)
if(s===0)if(r<15){u=this.hO(r)
q=C.a.W(1,r)
if(typeof u!=="number")return u.j()
this.fr=u+q
this.fx=4}else this.fx=1
else{if(s!==1)throw H.l(new U.L("invalid ACn encoding"))
this.fy=this.eI(s)
this.fx=r!==0?2:3}continue
case 1:case 2:b.length
if(v>=64)return H.a(b,v)
q=b[v]
if(q!==0){u=this.dP()
if(typeof x!=="number")return H.b(x)
b[v]=q+C.a.W(u,x)}else{--w
if(w===0)this.fx=u===2?3:0}break
case 3:b.length
if(v>=64)return H.a(b,v)
u=b[v]
if(u!==0){q=this.dP()
if(typeof x!=="number")return H.b(x)
b[v]=u+C.a.W(q,x)}else{u=this.fy
if(typeof u!=="number")return u.u()
if(typeof x!=="number")return H.b(x)
b[v]=C.a.W(u,x)
this.fx=0}break
case 4:b.length
if(v>=64)return H.a(b,v)
u=b[v]
if(u!==0){q=this.dP()
if(typeof x!=="number")return H.b(x)
b[v]=u+C.a.W(q,x)}break}++z}if(this.fx===4)if(--this.fr===0)this.fx=0},"$2","gnt",4,0,41]},
qu:{
"^":"d2;b,c,a",
dj:function(a,b){var z,y,x
z=[]
y=new U.ie(null,null,null,null,null,null,Array(4),z,[],[],[],0,0)
y.a=this.a
y.l1(a)
if(z.length!==1)throw H.l(new U.L("only single frame JPEGs supported"))
z=y.e
x=U.c_(z.e,z.d,3)
this.np(y,x)
return x},
np:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=b.a
y=b.b
x=a.iE(z,y)
switch(a.Q.length){case 1:if(typeof y!=="number")return H.b(y)
w=x.length
v=b.x
u=v.length
t=0
s=0
r=0
for(;r<y;++r){if(typeof z!=="number")return H.b(z)
q=0
for(;q<z;++q,s=n,t=p){p=t+1
if(t<0||t>=w)return H.a(x,t)
o=x[t]
n=s+1
m=C.a.v(255,0,255)
l=J.y(o)
k=l.v(o,0,255)
if(typeof k!=="number")return k.u()
j=l.v(o,0,255)
if(typeof j!=="number")return j.u()
l=l.v(o,0,255)
if(typeof l!=="number")return H.b(l)
if(s<0||s>=u)return H.a(v,s)
v[s]=(m<<24|k<<16|j<<8|l)>>>0}}break
case 3:if(typeof y!=="number")return H.b(y)
w=x.length
v=b.x
u=v.length
t=0
s=0
r=0
for(;r<y;++r){if(typeof z!=="number")return H.b(z)
q=0
for(;q<z;++q,s=n,t=p){p=t+1
if(t<0||t>=w)return H.a(x,t)
i=x[t]
t=p+1
if(p<0||p>=w)return H.a(x,p)
h=x[p]
p=t+1
if(t<0||t>=w)return H.a(x,t)
g=x[t]
m=C.a.v(255,0,255)
l=J.a4(g,0,255)
if(typeof l!=="number")return l.u()
k=J.a4(h,0,255)
if(typeof k!=="number")return k.u()
j=J.a4(i,0,255)
if(typeof j!=="number")return H.b(j)
n=s+1
if(s<0||s>=u)return H.a(v,s)
v[s]=(m<<24|l<<16|k<<8|j)>>>0}}break
case 4:if(typeof y!=="number")return H.b(y)
w=x.length
v=b.x
u=v.length
t=0
s=0
r=0
for(;r<y;++r){if(typeof z!=="number")return H.b(z)
q=0
for(;q<z;++q,s=n){p=t+1
if(t<0||t>=w)return H.a(x,t)
f=x[t]
t=p+1
if(p<0||p>=w)return H.a(x,p)
e=x[p]
p=t+1
if(t<0||t>=w)return H.a(x,t)
o=x[t]
t=p+1
if(p<0||p>=w)return H.a(x,p)
d=x[p]
m=J.d(f,d)
if(typeof m!=="number")return m.D()
m=C.b.p(m,8)
l=J.d(e,d)
if(typeof l!=="number")return l.D()
l=C.b.p(l,8)
k=J.d(o,d)
if(typeof k!=="number")return k.D()
k=C.b.p(k,8)
n=s+1
j=C.a.v(255,0,255)
k=C.a.v(k,0,255)
l=C.a.v(l,0,255)
m=C.a.v(m,0,255)
if(s<0||s>=u)return H.a(v,s)
v[s]=(j<<24|k<<16|l<<8|m)>>>0}}break
default:throw H.l("Unsupported color mode")}}},
rA:{
"^":"o;a,N:b>,M:c>,d,e,f,r,x,y,z"},
rB:{
"^":"dz;d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c"},
rz:{
"^":"d2;b,c,d,e,f,r,x,a",
ii:function(a){var z,y
z=U.aa(a,!0,null,0).aP(8)
for(y=0;y<8;++y)if(!J.i(J.e(z.a,J.c(z.d,y)),C.a4[y]))return!1
return!0},
es:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=U.aa(a,!0,null,0)
this.e=z
y=z.aP(8)
for(x=0;x<8;++x)if(!J.i(J.e(y.a,J.c(y.d,x)),C.a4[x]))return
for(;!0;){z=this.e
w=J.h(z.d,z.b)
v=this.e.q()
u=this.e.aj(4)
switch(u){case"IHDR":z=this.e
t=J.c(z.d,0)
s=z.a
r=z.e
q=J.c(t,v)
z.d=J.c(z.d,J.h(q,t))
p=U.R(new U.ak(s,t,q,t,r),null,0)
o=p.aD()
r=new U.rB(null,null,null,null,null,null,null,null,null,16777215,1,0,[],[],0,0,4294967295)
this.b=r
r.a=p.q()
this.b.b=p.q()
r=this.b
q=p.a
s=p.d
p.d=J.c(s,1)
r.d=J.e(q,s)
s=this.b
q=p.a
r=p.d
p.d=J.c(r,1)
s.e=J.e(q,r)
r=this.b
q=p.a
s=p.d
p.d=J.c(s,1)
r.f=J.e(q,s)
s=this.b
q=p.a
r=p.d
p.d=J.c(r,1)
s.r=J.e(q,r)
r=this.b
q=p.a
s=p.d
p.d=J.c(s,1)
r.x=J.e(q,s)
if(!C.c.cJ([0,2,3,4,6],this.b.e))return
if(!J.i(this.b.r,0))return
z=this.b
switch(z.e){case 0:if(!C.c.cJ([1,2,4,8,16],z.d))return
break
case 2:if(!C.c.cJ([8,16],z.d))return
break
case 3:if(!C.c.cJ([1,2,4,8],z.d))return
break
case 4:if(!C.c.cJ([8,16],z.d))return
break
case 6:if(!C.c.cJ([8,16],z.d))return
break}if(this.e.q()!==T.c8(o,T.c8(new H.ec(u),0)))throw H.l(new U.L("Invalid "+u+" checksum"))
break
case"PLTE":z=this.b
s=this.e
t=J.c(s.d,0)
r=s.a
q=s.e
n=J.c(t,v)
s.d=J.c(s.d,J.h(n,t))
z.y=new U.ak(r,t,n,t,q).aD()
if(this.e.q()!==T.c8(this.b.y,T.c8(new H.ec(u),0)))throw H.l(new U.L("Invalid "+u+" checksum"))
break
case"tRNS":z=this.b
s=this.e
t=J.c(s.d,0)
r=s.a
q=s.e
n=J.c(t,v)
s.d=J.c(s.d,J.h(n,t))
z.z=new U.ak(r,t,n,t,q).aD()
if(this.e.q()!==T.c8(this.b.z,T.c8(new H.ec(u),0)))throw H.l(new U.L("Invalid "+u+" checksum"))
break
case"IEND":z=this.e
z.d=J.c(z.d,4)
break
case"gAMA":if(v!==4)throw H.l(new U.L("Invalid gAMA chunk"))
m=this.e.q()
z=this.e
z.d=J.c(z.d,4)
if(m!==1e5)this.b.ch=m/1e5
break
case"IDAT":this.b.dy.push(w)
z=this.e
z.d=J.c(z.d,v)
z=this.e
z.d=J.c(z.d,4)
break
case"acTL":this.b.cy=this.e.q()
this.b.db=this.e.q()
z=this.e
z.d=J.c(z.d,4)
break
case"fcTL":l=new U.rA(null,null,null,null,null,null,null,null,null,[])
this.b.dx.push(l)
l.a=this.e.q()
l.b=this.e.q()
l.c=this.e.q()
l.d=this.e.q()
l.e=this.e.q()
l.f=this.e.t()
l.r=this.e.t()
z=this.e
s=z.a
r=z.d
z.d=J.c(r,1)
l.x=J.e(s,r)
r=this.e
s=r.a
z=r.d
r.d=J.c(z,1)
l.y=J.e(s,z)
z=this.e
z.d=J.c(z.d,4)
break
case"fdAT":this.e.q()
C.c.gcQ(this.b.dx).z.push(w)
z=this.e
z.d=J.c(z.d,v-4)
z=this.e
z.d=J.c(z.d,4)
break
case"bKGD":z=this.e
z.d=J.c(z.d,v)
z=this.e
z.d=J.c(z.d,4)
break
default:z=this.e
z.d=J.c(z.d,v)
z=this.e
z.d=J.c(z.d,4)
break}if(u==="IEND")break
z=this.e
if(J.a7(z.d,z.c))return}return this.b},
co:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.b
if(z==null)return
y=[]
x=z.a
w=z.b
v=z.dx
u=v.length
if(u===0||a===0)for(t=z.dy.length,s=0;s<t;++s){z=this.e
v=this.b.dy
if(s>=v.length)return H.a(v,s)
z.d=v[s]
r=z.q()
q=this.e.aj(4)
z=this.e
p=J.c(z.d,0)
v=z.a
u=z.e
o=J.c(p,r)
z.d=J.c(z.d,J.h(o,p))
n=new U.ak(v,p,o,p,u).aD()
C.c.kc(y,n)
if(this.e.q()!==T.c8(n,T.c8(new H.ec(q),0)))throw H.l(new U.L("Invalid "+q+" checksum"))}else{if(a>=u)throw H.l(new U.L("Invalid Frame Number: "+a))
if(a>=u)return H.a(v,a)
m=v[a]
x=m.b
w=m.c
for(z=m.z,s=0;s<z.length;++s){v=this.e
v.d=z[s]
r=v.q()
this.e.aj(4)
v=this.e
v.d=J.c(v.d,4)
v=this.e
p=J.c(v.d,0)
u=v.a
o=v.e
l=J.c(p,r)
v.d=J.c(v.d,J.h(l,p))
C.c.kc(y,new U.ak(u,p,l,p,o).aD())}this.r=a
this.x=this.b.cy}k=U.c_(x,w,J.i(this.b.e,4)||J.i(this.b.e,6)||this.b.z!=null?4:3)
j=U.aa(new T.di().b6(T.b5(y,1,null,0),!1),!0,null,0)
this.c=0
this.d=0
z=this.b
if(z.Q==null){z.Q=H.p(Array(256),[P.x])
for(s=0;s<256;++s){z=this.b.ch
if(z!=null){if(typeof z!=="number")H.T(H.Y(z))
i=C.b.I(Math.pow(s/255,z)*255)}else i=s
this.b.Q[s]=i}z=this.b
v=z.y
if(v!=null&&z.ch!=null)for(u=v.length,s=0;s<u;++s){o=z.Q
l=v[s]
o.length
if(l>=256)return H.a(o,l)
v[s]=o[l]}}z=this.b
h=z.a
g=z.b
z.a=x
z.b=w
this.f=0
if(!J.i(z.x,0)){z=J.w(x)
v=z.j(x,7)
if(typeof v!=="number")return v.D()
v=C.b.p(v,3)
u=J.w(w)
o=u.j(w,7)
if(typeof o!=="number")return o.D()
this.de(j,k,0,0,8,8,v,C.b.p(o,3))
o=z.j(x,3)
if(typeof o!=="number")return o.D()
o=C.b.p(o,3)
v=u.j(w,7)
if(typeof v!=="number")return v.D()
this.de(j,k,4,0,8,8,o,C.b.p(v,3))
v=z.j(x,3)
if(typeof v!=="number")return v.D()
v=C.b.p(v,2)
o=u.j(w,3)
if(typeof o!=="number")return o.D()
this.de(j,k,0,4,4,8,v,C.b.p(o,3))
o=z.j(x,1)
if(typeof o!=="number")return o.D()
o=C.b.p(o,2)
v=u.j(w,3)
if(typeof v!=="number")return v.D()
this.de(j,k,2,0,4,4,o,C.b.p(v,2))
z=z.j(x,1)
if(typeof z!=="number")return z.D()
z=C.b.p(z,1)
v=u.j(w,1)
if(typeof v!=="number")return v.D()
this.de(j,k,0,2,2,4,z,C.b.p(v,2))
if(typeof x!=="number")return x.D()
v=C.b.p(x,1)
u=u.j(w,1)
if(typeof u!=="number")return u.D()
this.de(j,k,1,0,2,2,v,C.b.p(u,1))
if(typeof w!=="number")return w.D()
this.de(j,k,0,1,1,2,x,C.b.p(w,1))}else this.oI(j,k)
z=this.b
z.a=h
z.b=g
return k},
dj:function(a,b){if(this.es(a)==null)return
return this.co(b)},
de:function(a2,a3,a4,a5,a6,a7,a8,a9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
if(J.i(this.b.e,4))z=2
else if(J.i(this.b.e,2))z=3
else{y=J.i(this.b.e,6)?4:1
z=y}y=this.b.d
if(typeof y!=="number")return H.b(y)
x=z*y
w=C.b.p(x+7,3)
v=C.b.p(x*a8+7,3)
u=P.ls(v,0,P.x)
t=[u,u]
s=[0,0,0,0]
y=a3.a
r=a3.b
q=a3.x
p=q.length
o=a6>1
n=a6-a4
m=a5
l=0
k=0
while(l<a9){j=a2.a
i=a2.d
a2.d=J.c(i,1)
h=J.e(j,i)
g=J.c(a2.d,0)
j=a2.a
i=a2.e
f=J.c(g,v)
a2.d=J.c(a2.d,J.h(f,g))
i=new U.ak(j,g,f,g,i).aD()
if(k<0||k>=2)return H.a(t,k)
t[k]=i
k=1-k
this.k8(h,w,i,t[k])
this.c=0
this.d=0
e=new U.ak(i,0,i.length,0,!0)
P.X(m+a6,this.b.b)
for(j=n<=1,d=a4,c=0;c<a8;++c,d+=a6){this.jT(e,s)
b=this.jq(s)
if(typeof y!=="number")return H.b(y)
if(d<y){if(typeof r!=="number")return H.b(r)
i=m<r}else i=!1
if(i){if(typeof y!=="number")return H.b(y)
i=m*y+d
if(i>>>0!==i||i>=p)return H.a(q,i)
q[i]=b}if(!j||o){P.X(d+n,this.b.a)
for(a=0;a<a6;++a)for(a0=0;a0<n;++a0){i=d+a0
f=m+a0
if(typeof y!=="number")return H.b(y)
if(i<y){if(typeof r!=="number")return H.b(r)
a1=f<r}else a1=!1
if(a1){if(typeof y!=="number")return H.b(y)
i=f*y+i
if(i>>>0!==i||i>=p)return H.a(q,i)
q[i]=b}}}}++l
m+=a7
j=this.f
if(typeof j!=="number")return j.j()
this.f=j+1}},
oI:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
if(J.i(this.b.e,4))z=2
else if(J.i(this.b.e,2))z=3
else{y=J.i(this.b.e,6)?4:1
z=y}y=this.b
x=y.d
if(typeof x!=="number")return H.b(x)
w=z*x
v=y.a
u=y.b
y=J.c(J.d(v,w),7)
if(typeof y!=="number")return y.D()
y=C.b.p(y,3)
t=C.b.p(w+7,3)
s=P.ls(y,0,P.x)
r=[s,s]
q=[0,0,0,0]
if(typeof u!=="number")return H.b(u)
x=b.x
p=x.length
o=0
n=0
m=0
for(;o<u;++o,m=g){l=a.a
k=a.d
a.d=J.c(k,1)
j=J.e(l,k)
i=J.c(a.d,0)
l=a.a
k=a.e
h=J.c(i,y)
a.d=J.c(a.d,J.h(h,i))
k=new U.ak(l,i,h,i,k).aD()
if(m<0||m>=2)return H.a(r,m)
r[m]=k
g=1-m
this.k8(j,t,k,r[g])
this.c=0
this.d=0
k=r[m]
f=new U.ak(k,0,k.length,0,!0)
if(typeof v!=="number")return H.b(v)
e=0
for(;e<v;++e,n=d){this.jT(f,q)
d=n+1
l=this.jq(q)
if(n<0||n>=p)return H.a(x,n)
x[n]=l}}},
k8:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=c.length
switch(a){case 0:break
case 1:for(y=z,x=b;x<z;++x,y=w){if(x>=y)return H.a(c,x)
w=c[x]
v=x-b
if(v<0||v>=y)return H.a(c,v)
v=J.W(J.c(w,c[v]),255)
w=c.length
if(x>=w)return H.a(c,x)
c[x]=v}break
case 2:for(y=z,x=0;x<z;++x,y=w){if(x>=y)return H.a(c,x)
y=c[x]
if(x>=d.length)return H.a(d,x)
y=J.W(J.c(y,d[x]),255)
w=c.length
if(x>=w)return H.a(c,x)
c[x]=y}break
case 3:for(y=z,x=0;x<z;++x){if(x<b)u=0
else{w=x-b
if(w<0||w>=y)return H.a(c,w)
u=c[w]}if(x>=d.length)return H.a(d,x)
t=d[x]
if(x>=y)return H.a(c,x)
y=c[x]
w=J.c(u,t)
if(typeof w!=="number")return w.D()
w=J.W(J.c(y,C.b.p(w,1)),255)
y=c.length
if(x>=y)return H.a(c,x)
c[x]=w}break
case 4:for(y=z,x=0;x<z;++x,y=w){w=x<b
if(w)u=0
else{v=x-b
if(v<0||v>=y)return H.a(c,v)
u=c[v]}y=d.length
if(x>=y)return H.a(d,x)
t=d[x]
if(w)s=0
else{w=x-b
if(w<0||w>=y)return H.a(d,w)
s=d[w]}r=J.h(J.c(u,t),s)
y=J.y(r)
q=J.af(y.l(r,u))
p=J.af(y.l(r,t))
o=J.af(y.l(r,s))
y=J.y(q)
if(y.ab(q,p)&&y.ab(q,o))n=u
else n=J.aG(p,o)?t:s
if(x>=c.length)return H.a(c,x)
y=J.W(J.c(c[x],n),255)
w=c.length
if(x>=w)return H.a(c,x)
c[x]=y}break
default:throw H.l(new U.L("Invalid filter value: "+H.m(a)))}},
bR:function(a,b){var z,y,x,w,v
z=J.O(b)
if(z.B(b,0))return 0
if(z.B(b,8)){z=a.a
y=a.d
a.d=J.c(y,1)
return J.e(z,y)}if(z.B(b,16))return a.t()
if(typeof b!=="number")return H.b(b)
z=a.c
for(;y=this.d,y<b;){if(J.a7(a.d,z))throw H.l(new U.L("Invalid PNG data."))
y=a.a
x=a.d
a.d=J.c(x,1)
w=J.e(y,x)
x=this.d
if(typeof w!=="number")return w.u()
this.c=C.b.u(w,x)
this.d=x+8}if(b===1)v=1
else if(b===2)v=3
else{if(b===4)z=15
else if(b===8)z=255
else z=b===16?65535:0
v=z}z=y-b
y=C.a.by(this.c,z)
this.d=z
return y&v},
jT:function(a,b){var z,y
z=this.b
y=z.e
switch(y){case 0:b[0]=this.bR(a,z.d)
return
case 2:b[0]=this.bR(a,z.d)
b[1]=this.bR(a,this.b.d)
b[2]=this.bR(a,this.b.d)
return
case 3:b[0]=this.bR(a,z.d)
return
case 4:b[0]=this.bR(a,z.d)
b[1]=this.bR(a,this.b.d)
return
case 6:b[0]=this.bR(a,z.d)
b[1]=this.bR(a,this.b.d)
b[2]=this.bR(a,this.b.d)
b[3]=this.bR(a,this.b.d)
return}throw H.l(new U.L("Invalid color type: "+H.m(y)+"."))},
jq:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.b
y=z.e
switch(y){case 0:switch(z.d){case 1:x=J.i(a[0],0)?0:255
break
case 2:x=J.d(a[0],85)
break
case 4:z=a[0]
if(typeof z!=="number")return z.u()
x=z<<4>>>0
break
case 8:x=a[0]
break
case 16:z=a[0]
if(typeof z!=="number")return z.D()
x=C.b.p(z,8)
break
default:x=null}z=this.b
y=z.Q
y.length
if(x>>>0!==x||x>=256)return H.a(y,x)
x=y[x]
z=z.z
if(z!=null){y=z.length
if(0>=y)return H.a(z,0)
w=z[0]
if(1>=y)return H.a(z,1)
z=z[1]
if(J.i(a[0],((w&255)<<24|z&255)>>>0))return(C.a.v(0,0,255)<<24|J.y(x).v(x,0,255)<<16|C.a.v(x,0,255)<<8|C.a.v(x,0,255))>>>0}return(C.a.v(255,0,255)<<24|J.y(x).v(x,0,255)<<16|C.a.v(x,0,255)<<8|C.a.v(x,0,255))>>>0
case 2:switch(z.d){case 1:v=J.i(a[0],0)?0:255
x=J.i(a[1],0)?0:255
u=J.i(a[2],0)?0:255
break
case 2:v=J.d(a[0],85)
x=J.d(a[1],85)
u=J.d(a[2],85)
break
case 4:z=a[0]
if(typeof z!=="number")return z.u()
v=z<<4>>>0
z=a[1]
if(typeof z!=="number")return z.u()
x=z<<4>>>0
z=a[2]
if(typeof z!=="number")return z.u()
u=z<<4>>>0
break
case 8:v=a[0]
x=a[1]
u=a[2]
break
case 16:z=a[0]
if(typeof z!=="number")return z.D()
v=C.b.p(z,8)
z=a[1]
if(typeof z!=="number")return z.D()
x=C.b.p(z,8)
z=a[2]
if(typeof z!=="number")return z.D()
u=C.b.p(z,8)
break
default:v=null
x=null
u=null}z=this.b
y=z.Q
y.length
if(v>>>0!==v||v>=256)return H.a(y,v)
v=y[v]
if(x>>>0!==x||x>=256)return H.a(y,x)
x=y[x]
if(u>>>0!==u||u>=256)return H.a(y,u)
u=y[u]
z=z.z
if(z!=null){y=z.length
if(0>=y)return H.a(z,0)
w=z[0]
if(1>=y)return H.a(z,1)
t=z[1]
if(2>=y)return H.a(z,2)
s=z[2]
if(3>=y)return H.a(z,3)
r=z[3]
if(4>=y)return H.a(z,4)
q=z[4]
if(5>=y)return H.a(z,5)
z=z[5]
if(J.i(a[0],((w&255)<<8|t&255)>>>0)&&J.i(a[1],((s&255)<<8|r&255)>>>0)&&J.i(a[2],((q&255)<<8|z&255)>>>0))return(C.a.v(0,0,255)<<24|J.a4(u,0,255)<<16|J.a4(x,0,255)<<8|J.a4(v,0,255))>>>0}return(C.a.v(255,0,255)<<24|J.a4(u,0,255)<<16|J.a4(x,0,255)<<8|J.a4(v,0,255))>>>0
case 3:p=J.d(a[0],3)
z=this.b.z
if(z!=null&&J.K(a[0],z.length)){z=this.b.z
y=a[0]
if(y>>>0!==y||y>=z.length)return H.a(z,y)
o=z[y]}else o=255
if(J.a7(p,this.b.y.length))return(C.a.v(o,0,255)<<24|C.a.v(255,0,255)<<16|C.a.v(255,0,255)<<8|C.a.v(255,0,255))>>>0
z=this.b
y=z.Q
z=z.y
w=z.length
if(p>>>0!==p||p>=w)return H.a(z,p)
t=z[p]
y.length
if(t>=256)return H.a(y,t)
v=y[t]
t=p+1
if(t>=w)return H.a(z,t)
t=z[t]
if(t>=256)return H.a(y,t)
x=y[t]
t=p+2
if(t>=w)return H.a(z,t)
t=z[t]
if(t>=256)return H.a(y,t)
u=y[t]
return(C.a.v(o,0,255)<<24|J.a4(u,0,255)<<16|J.a4(x,0,255)<<8|J.a4(v,0,255))>>>0
case 4:switch(z.d){case 1:x=J.i(a[0],0)?0:255
o=J.i(a[1],0)?0:255
break
case 2:x=J.d(a[0],85)
o=J.d(a[1],85)
break
case 4:z=a[0]
if(typeof z!=="number")return z.u()
x=z<<4>>>0
z=a[1]
if(typeof z!=="number")return z.u()
o=z<<4>>>0
break
case 8:x=a[0]
o=a[1]
break
case 16:z=a[0]
if(typeof z!=="number")return z.D()
x=C.b.p(z,8)
z=a[1]
if(typeof z!=="number")return z.D()
o=C.b.p(z,8)
break
default:x=null
o=null}z=this.b.Q
z.length
if(x>>>0!==x||x>=256)return H.a(z,x)
x=z[x]
if(o>>>0!==o||o>=256)return H.a(z,o)
return(J.a4(z[o],0,255)<<24|J.y(x).v(x,0,255)<<16|C.a.v(x,0,255)<<8|C.a.v(x,0,255))>>>0
case 6:switch(z.d){case 1:v=J.i(a[0],0)?0:255
x=J.i(a[1],0)?0:255
u=J.i(a[2],0)?0:255
o=J.i(a[3],0)?0:255
break
case 2:v=J.d(a[0],85)
x=J.d(a[1],85)
u=J.d(a[2],85)
o=J.d(a[3],85)
break
case 4:z=a[0]
if(typeof z!=="number")return z.u()
v=z<<4>>>0
z=a[1]
if(typeof z!=="number")return z.u()
x=z<<4>>>0
z=a[2]
if(typeof z!=="number")return z.u()
u=z<<4>>>0
z=a[3]
if(typeof z!=="number")return z.u()
o=z<<4>>>0
break
case 8:v=a[0]
x=a[1]
u=a[2]
o=a[3]
break
case 16:z=a[0]
if(typeof z!=="number")return z.D()
v=C.b.p(z,8)
z=a[1]
if(typeof z!=="number")return z.D()
x=C.b.p(z,8)
z=a[2]
if(typeof z!=="number")return z.D()
u=C.b.p(z,8)
z=a[3]
if(typeof z!=="number")return z.D()
o=C.b.p(z,8)
break
default:v=null
x=null
u=null
o=null}z=this.b.Q
z.length
if(v>>>0!==v||v>=256)return H.a(z,v)
v=z[v]
if(x>>>0!==x||x>=256)return H.a(z,x)
x=z[x]
if(u>>>0!==u||u>=256)return H.a(z,u)
u=z[u]
if(o>>>0!==o||o>=256)return H.a(z,o)
return(J.a4(z[o],0,255)<<24|J.a4(u,0,255)<<16|J.a4(x,0,255)<<8|J.a4(v,0,255))>>>0}throw H.l(new U.L("Invalid color type: "+H.m(y)+"."))}},
rI:{
"^":"dN;c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,a,b"},
rM:{
"^":"dN;c,d,e,f,r,x,y,z,Q,a,b"},
dN:{
"^":"o;"},
rP:{
"^":"dN;c,d,e,f,r,x,y,a,b"},
rQ:{
"^":"dN;c,d,e,f,r,x,y,z,Q,a,b"},
rX:{
"^":"dN;c,d,e,f,r,x,a,b"},
rY:{
"^":"dN;c,d,e,f,a,b"},
rT:{
"^":"lY;A:b>,a"},
rV:{
"^":"lY;aa:b>,c,d,a"},
rJ:{
"^":"o;a,b,c,d,e,f,r,x",
mF:function(a){var z,y,x,w
this.a=a.t()
this.b=a.t()
this.c=a.t()
this.d=a.t()
z=J.ac(J.h(a.c,a.d),8)
if(J.F(z,0)){this.e=new Uint16Array(H.k(z))
this.f=new Uint16Array(H.k(z))
this.r=new Uint16Array(H.k(z))
this.x=new Uint16Array(H.k(z))
if(typeof z!=="number")return H.b(z)
y=0
for(;y<z;++y){x=this.e
w=a.t()
if(y>=x.length)return H.a(x,y)
x[y]=w
w=this.f
x=a.t()
if(y>=w.length)return H.a(w,y)
w[y]=x
x=this.r
w=a.t()
if(y>=x.length)return H.a(x,y)
x[y]=w
w=this.x
x=a.t()
if(y>=w.length)return H.a(w,y)
w[y]=x}}},
static:{rK:function(a){var z=new U.rJ(null,null,null,null,null,null,null,null)
z.mF(a)
return z}}},
lV:{
"^":"o;a,b,A:c>",
l2:function(a,b,c,d,e,f,g){if(e==null)e=a.t()
switch(e){case 0:this.p3(a,b,c,d)
break
case 1:this.p2(a,b,c,d,f==null?this.p_(a,c):f,g)
break
default:throw H.l(new U.L("Unsupported compression: "+H.m(e)))}},
qR:function(a,b,c,d){return this.l2(a,b,c,d,null,null,0)},
p_:function(a,b){var z,y,x,w
z=H.k(b)
y=new Uint16Array(z)
if(typeof b!=="number")return H.b(b)
x=0
for(;x<b;++x){w=a.t()
if(x>=z)return H.a(y,x)
y[x]=w}return y},
p3:function(a,b,c,d){var z,y
z=J.d(b,c)
if(d===16)z=J.d(z,2)
if(J.F(z,J.h(a.c,a.d))){y=new Uint8Array(H.k(z))
this.c=y
C.j.aF(y,0,z,255)
return}this.c=a.aP(z).aD()},
p2:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q
z=J.d(b,c)
y=H.k(d===16?J.d(z,2):z)
x=new Uint8Array(y)
this.c=x
if(typeof c!=="number")return H.b(c)
w=f*c
v=e.length
if(w>=v){C.j.aF(x,0,y,255)
return}for(u=0,t=0;t<c;++t,w=s){s=w+1
if(w>>>0!==w||w>=v)return H.a(e,w)
z=e[w]
r=J.c(a.d,0)
y=a.a
x=a.e
q=J.c(r,z)
a.d=J.c(a.d,J.h(q,r))
this.nA(new U.ak(y,r,q,r,x),this.c,u)
if(typeof b!=="number")return H.b(b)
u+=b}},
nA:function(a,b,c){var z,y,x,w,v,u,t
for(z=a.c;!J.a7(a.d,z);){y=a.a
x=a.d
a.d=J.c(x,1)
x=J.e(y,x)
$.$get$e0()[0]=x
x=$.$get$eT()
if(0>=x.length)return H.a(x,0)
w=x[0]
if(w<0){w=1-w
y=a.a
x=a.d
a.d=J.c(x,1)
v=J.e(y,x)
for(u=0;u<w;++u,c=t){t=c+1
if(c>>>0!==c||c>=b.length)return H.a(b,c)
b[c]=v}}else{++w
for(u=0;u<w;++u,c=t){t=c+1
y=a.a
x=a.d
a.d=J.c(x,1)
x=J.e(y,x)
if(c>>>0!==c||c>=b.length)return H.a(b,c)
b[c]=x}}}}},
rN:{
"^":"dz;d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,a,b,c",
cn:function(){if(this.d!==943870035||this.cy==null)return!1
this.oY()
this.oZ()
this.p0()
this.cy=null
this.db=null
this.dx=null
this.dy=null
this.fr=null
return!0},
pV:function(){if(!this.cn())return
return this.qW()},
qW:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
z=this.Q
if(z!=null)return z
z=U.c_(this.a,this.b,4)
this.Q=z
z=z.x
C.x.aF(z,0,z.length,0)
z=this.Q.x.buffer
y=(z&&C.e).ad(z,0,null)
for(z=y.length,x=0;w=this.y,x<w.length;++x){v=w[x]
if(J.W(v.z,2)!==0)continue
u=J.G(v.x,255)
t=v.r
if(this.r===16);w=v.fx.x.buffer
s=(w&&C.e).ad(w,0,null)
for(r=v.a,w=s.length,q=0,p=0;q<v.f;++q,++r){o=v.a
n=this.a
if(typeof n!=="number")return H.b(n)
m=v.b
l=(o+q)*n*4+m*4
for(o=r>=0,k=0;k<v.e;++k,++m){j=p+1
if(p<0||p>=w)return H.a(s,p)
i=s[p]
p=j+1
if(j<0||j>=w)return H.a(s,j)
h=s[j]
j=p+1
if(p<0||p>=w)return H.a(s,p)
g=s[p]
p=j+1
if(j<0||j>=w)return H.a(s,j)
f=s[j]
if(m>=0){n=this.a
if(typeof n!=="number")return H.b(n)
if(m<n)if(o){n=this.b
if(typeof n!=="number")return H.b(n)
n=r<n}else n=!1
else n=!1}else n=!1
if(n){if(l>>>0!==l||l>=z)return H.a(y,l)
e=y[l]
n=l+1
if(n>=z)return H.a(y,n)
d=y[n]
c=l+2
if(c>=z)return H.a(y,c)
b=y[c]
c=l+3
if(c>=z)return H.a(y,c)
a=y[c]
if(typeof u!=="number")return H.b(u)
a0=f/255*u
switch(t){case 1885434739:a1=a
a2=b
a3=d
a4=e
break
case 1852797549:a1=f
a2=g
a3=h
a4=i
break
case 1684632435:a1=f
a2=g
a3=h
a4=i
break
case 1684107883:a4=P.X(e,i)
a3=P.X(d,h)
a2=P.X(b,g)
a1=f
break
case 1836411936:a4=e*i>>>8
a3=d*h>>>8
a2=b*g>>>8
a1=f
break
case 1768188278:a4=U.fA(e,i)
a3=U.fA(d,h)
a2=U.fA(b,g)
a1=f
break
case 1818391150:a4=C.a.v(e+i-255,0,255)
a3=C.a.v(d+h-255,0,255)
a2=C.a.v(b+g-255,0,255)
a1=f
break
case 1684751212:a1=f
a2=g
a3=h
a4=i
break
case 1818850405:a4=P.I(e,i)
a3=P.I(d,h)
a2=P.I(b,g)
a1=f
break
case 1935897198:a4=C.a.v(255-(255-i)*(255-e),0,255)
a3=C.a.v(255-(255-h)*(255-d),0,255)
a2=C.a.v(255-(255-g)*(255-b),0,255)
a1=f
break
case 1684633120:a4=U.fB(e,i)
a3=U.fB(d,h)
a2=U.fB(b,g)
a1=f
break
case 1818518631:a4=i+e>255?255:e+i
a3=h+d>255?255:d+h
a2=g+b>255?255:b+g
a1=f
break
case 1818706796:a1=f
a2=g
a3=h
a4=i
break
case 1870030194:a4=U.iY(e,i,a,f)
a3=U.iY(d,h,a,f)
a2=U.iY(b,g,a,f)
a1=f
break
case 1934387572:a4=U.iZ(e,i)
a3=U.iZ(d,h)
a2=U.iZ(b,g)
a1=f
break
case 1749838196:a4=U.iW(e,i)
a3=U.iW(d,h)
a2=U.iW(b,g)
a1=f
break
case 1984719220:a4=U.j_(e,i)
a3=U.j_(d,h)
a2=U.j_(b,g)
a1=f
break
case 1816947060:a4=U.iX(e,i)
a3=U.iX(d,h)
a2=U.iX(b,g)
a1=f
break
case 1884055924:a4=i<128?P.X(e,2*i):P.I(e,2*(i-128))
a3=h<128?P.X(d,2*h):P.I(d,2*(h-128))
a2=g<128?P.X(b,2*g):P.I(b,2*(g-128))
a1=f
break
case 1749903736:a4=i<255-e?0:255
a3=h<255-d?0:255
a2=g<255-b?0:255
a1=f
break
case 1684629094:a4=Math.abs(i-e)
a3=Math.abs(h-d)
a2=Math.abs(g-b)
a1=f
break
case 1936553316:a4=C.b.bF(i+e-2*i*e/255)
a3=C.b.bF(h+d-2*h*d/255)
a2=C.b.bF(g+b-2*g*b/255)
a1=f
break
case 1718842722:a1=f
a2=g
a3=h
a4=i
break
case 1717856630:a1=f
a2=g
a3=h
a4=i
break
case 1752524064:a1=f
a2=g
a3=h
a4=i
break
case 1935766560:a1=f
a2=g
a3=h
a4=i
break
case 1668246642:a1=f
a2=g
a3=h
a4=i
break
case 1819634976:a1=f
a2=g
a3=h
a4=i
break
default:a1=f
a2=g
a3=h
a4=i}c=1-a0
a4=C.b.I(e*c+a4*a0)
a3=C.b.I(d*c+a3*a0)
a2=C.b.I(b*c+a2*a0)
a1=C.b.I(a*c+a1*a0)
y[l]=a4
a5=n+1
y[n]=a3
a6=a5+1
if(a5>=z)return H.a(y,a5)
y[a5]=a2
if(a6>=z)return H.a(y,a6)
y[a6]=a1}l+=4}}}return this.Q},
oT:function(){var z,y,x
this.d=this.cy.q()
z=this.cy.t()
this.e=z
if(z!==1){this.d=0
return}y=this.cy.aP(6)
for(x=0;x<6;++x)if(!J.i(J.e(y.a,J.c(y.d,x)),0)){this.d=0
return}this.f=this.cy.t()
this.b=this.cy.q()
this.a=this.cy.q()
this.r=this.cy.t()
this.x=this.cy.t()},
oY:function(){var z,y,x,w,v,u,t,s,r,q
z=this.dx
z.d=z.b
for(z=this.ch;y=this.dx,!J.a7(y.d,y.c);){x=this.dx.q()
w=this.dx.t()
y=this.dx
v=y.a
u=y.d
y.d=J.c(u,1)
t=J.e(v,u)
s=this.dx.aj(t)
if(J.W(t,1)===0){y=this.dx
y.d=J.c(y.d,1)}t=this.dx.q()
y=this.dx
r=J.c(y.d,0)
v=y.a
u=y.e
q=J.c(r,t)
y.d=J.c(y.d,J.h(q,r))
if((t&1)===1){y=this.dx
y.d=J.c(y.d,1)}if(x===943868237)z.k(0,w,new U.rO(w,s,new U.ak(v,r,q,r,u)))}},
oZ:function(){var z,y,x,w,v,u,t,s
z=this.dy
z.d=z.b
y=z.q()
if((y&1)!==0)++y
x=this.dy.aP(y)
this.y=[]
if(y>0){z=x.t()
$.$get$eR()[0]=z
z=$.$get$hc()
if(0>=z.length)return H.a(z,0)
w=z[0]
if(w<0){this.cx=!0
w=-w}for(v=0;v<w;++v){u=U.rS(x)
this.y.push(u)}}for(v=0;z=this.y,v<z.length;++v)z[v].qQ(x,this)
y=this.dy.q()
t=this.dy.aP(y)
if(y>0){t.t()
t.t()
t.t()
t.t()
t.t()
t.t()
z=t.a
s=t.d
t.d=J.c(s,1)
J.e(z,s)}},
p0:function(){var z,y,x,w,v,u,t
z=this.fr
z.d=z.b
y=z.t()
if(y===1){x=J.d(this.b,this.f)
z=H.k(x)
w=new Uint16Array(z)
if(typeof x!=="number")return H.b(x)
v=0
for(;v<x;++v){u=this.fr.t()
if(v>=z)return H.a(w,v)
w[v]=u}}else w=null
this.z=[]
v=0
while(!0){z=this.f
if(typeof z!=="number")return H.b(z)
if(!(v<z))break
z=this.z
u=this.fr
t=v===3?-1:v
t=new U.lV(t,null,null)
t.l2(u,this.a,this.b,this.r,y,w,v)
z.push(t);++v}this.Q=U.lX(this.x,this.r,this.a,this.b,this.z)},
mG:function(a){var z,y
this.cy=U.aa(a,!0,null,0)
this.oT()
if(this.d!==943870035)return
z=this.cy.q()
this.db=this.cy.aP(z)
z=this.cy.q()
this.dx=this.cy.aP(z)
z=this.cy.q()
this.dy=this.cy.aP(z)
y=this.cy
this.fr=y.aP(J.h(y.c,y.d))},
static:{lW:function(a){var z=new U.rN(null,null,null,null,null,null,null,null,P.a5(),!1,null,null,null,null,null,0,0,4294967295)
z.mG(a)
return z},iY:function(a,b,c,d){var z,y,x,w,v,u
z=a/255
y=b/255
x=c/255
w=d/255
v=1-x
u=1-w
return C.a.v(C.b.I((2*z<x?2*y*z+y*v+z*u:w*x-2*(x-z)*(w-y)+y*v+z*u)*255),0,255)},fA:function(a,b){if(b===0)return 0
return C.a.v(C.b.I(255*(1-(1-a/255)/(b/255))),0,255)},fB:function(a,b){if(b===255)return 255
return C.a.v(C.d.I(a/255/(1-b/255)*255),0,255)},iZ:function(a,b){var z,y,x
z=a/255
y=b/255
x=1-y
return C.b.bF(255*(x*y*z+y*(1-x*(1-z))))},iW:function(a,b){var z,y
z=b/255
y=a/255
if(y<0.5)return C.b.bF(510*z*y)
else return C.b.bF(255*(1-2*(1-z)*(1-y)))},j_:function(a,b){if(b<128)return U.fA(a,2*b)
else return U.fB(a,2*(b-128))},iX:function(a,b){var z
if(b<128)return C.a.v(a+2*b-255,0,255)
else{z=2*(b-128)
return z+a>255?255:a+z}},lX:function(b6,b7,b8,b9,c0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5
z=U.c_(b8,b9,4)
y=z.x.buffer
x=(y&&C.e).ad(y,0,null)
w=P.a5()
for(y=c0.length,v=0;u=c0.length,v<u;c0.length===y||(0,H.aw)(c0),++v){t=c0[v]
w.k(0,t.a,t)}if(b7===8)s=1
else s=b7===16?2:-1
if(s===-1)throw H.l(new U.L("PSD: unsupported bit depth: "+H.m(b7)))
if(typeof b9!=="number")return H.b(b9)
y=x.length
r=u>=5
q=s===1
p=u===4
o=u>=2
u=u>=4
n=0
m=0
l=0
for(;n<b9;++n){if(typeof b8!=="number")return H.b(b8)
k=0
for(;k<b8;++k,l+=s)switch(b6){case 3:j=m+1
i=J.N(w.h(0,0))
h=J.D(i)
if(q)i=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.u()
i=h.h(i,l+1)
if(typeof i!=="number")return H.b(i)
i=(g<<8|i)>>>8}if(m<0||m>=y)return H.a(x,m)
x[m]=i
f=j+1
i=J.N(w.h(0,1))
h=J.D(i)
if(q)i=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.u()
i=h.h(i,l+1)
if(typeof i!=="number")return H.b(i)
i=(g<<8|i)>>>8}if(j<0||j>=y)return H.a(x,j)
x[j]=i
e=f+1
i=J.N(w.h(0,2))
h=J.D(i)
if(q)i=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.u()
i=h.h(i,l+1)
if(typeof i!=="number")return H.b(i)
i=(g<<8|i)>>>8}if(f<0||f>=y)return H.a(x,f)
x[f]=i
f=e+1
if(u){i=J.N(w.h(0,-1))
h=J.D(i)
if(q)i=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.u()
i=h.h(i,l+1)
if(typeof i!=="number")return H.b(i)
i=(g<<8|i)>>>8}}else i=255
if(e<0||e>=y)return H.a(x,e)
x[e]=i
d=x[m]
c=x[j]
i=m+2
if(i>=y)return H.a(x,i)
b=x[i]
h=m+3
if(h>=y)return H.a(x,h)
a=x[h]
if(a!==0){x[m]=C.a.ar((d+a-255)*255,a)
x[j]=C.a.ar((c+a-255)*255,a)
x[i]=C.a.ar((b+a-255)*255,a)}m=f
break
case 9:i=J.N(w.h(0,0))
h=J.D(i)
if(q)i=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.u()
i=h.h(i,l+1)
if(typeof i!=="number")return H.b(i)
i=(g<<8|i)>>>8}i=J.d(i,100)
if(typeof i!=="number")return i.D()
i=C.b.p(i,8)
h=J.N(w.h(0,1))
g=J.D(h)
if(q)h=g.h(h,l)
else{a0=g.h(h,l)
if(typeof a0!=="number")return a0.u()
h=g.h(h,l+1)
if(typeof h!=="number")return H.b(h)
h=(a0<<8|h)>>>8}a=J.h(h,128)
h=J.N(w.h(0,2))
g=J.D(h)
if(q)h=g.h(h,l)
else{a0=g.h(h,l)
if(typeof a0!=="number")return a0.u()
h=g.h(h,l+1)
if(typeof h!=="number")return H.b(h)
h=(a0<<8|h)>>>8}b=J.h(h,128)
if(u){h=J.N(w.h(0,-1))
g=J.D(h)
if(q){h=g.h(h,l)
a1=h}else{a0=g.h(h,l)
if(typeof a0!=="number")return a0.u()
h=g.h(h,l+1)
if(typeof h!=="number")return H.b(h)
h=(a0<<8|h)>>>8
a1=h}}else a1=255
a2=(i+16)/116
a3=J.c(J.G(a,500),a2)
i=J.G(b,200)
if(typeof i!=="number")return H.b(i)
a4=a2-i
a5=Math.pow(a2,3)
a2=a5>0.008856?a5:(a2-0.13793103448275862)/7.787
if(typeof a3!=="number")H.T(H.Y(a3))
a6=Math.pow(a3,3)
a3=a6>0.008856?a6:J.G(J.h(a3,0.13793103448275862),7.787)
a7=Math.pow(a4,3)
a4=a7>0.008856?a7:(a4-0.13793103448275862)/7.787
a3=J.G(J.d(a3,95.047),100)
a2=a2*100/100
a4=a4*108.883/100
i=J.w(a3)
a8=J.c(J.c(i.i(a3,3.2406),a2*-1.5372),a4*-0.4986)
a9=J.c(J.c(i.i(a3,-0.9689),a2*1.8758),a4*0.0415)
b0=J.c(J.c(i.i(a3,0.0557),a2*-0.204),a4*1.057)
if(J.F(a8,0.0031308)){if(typeof a8!=="number")H.T(H.Y(a8))
a8=1.055*Math.pow(a8,0.4166666666666667)-0.055}else{if(typeof a8!=="number")return H.b(a8)
a8=12.92*a8}if(J.F(a9,0.0031308)){if(typeof a9!=="number")H.T(H.Y(a9))
a9=1.055*Math.pow(a9,0.4166666666666667)-0.055}else{if(typeof a9!=="number")return H.b(a9)
a9=12.92*a9}if(J.F(b0,0.0031308)){if(typeof b0!=="number")H.T(H.Y(b0))
b0=1.055*Math.pow(b0,0.4166666666666667)-0.055}else{if(typeof b0!=="number")return H.b(b0)
b0=12.92*b0}b1=[C.a.v(C.d.I(a8*255),0,255),C.a.v(C.d.I(a9*255),0,255),C.a.v(C.d.I(b0*255),0,255)]
j=m+1
i=b1[0]
if(m<0||m>=y)return H.a(x,m)
x[m]=i
m=j+1
i=b1[1]
if(j<0||j>=y)return H.a(x,j)
x[j]=i
j=m+1
i=b1[2]
if(m<0||m>=y)return H.a(x,m)
x[m]=i
m=j+1
if(j<0||j>=y)return H.a(x,j)
x[j]=a1
break
case 1:i=J.N(w.h(0,0))
h=J.D(i)
if(q)b2=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.u()
i=h.h(i,l+1)
if(typeof i!=="number")return H.b(i)
b2=(g<<8|i)>>>8}if(o){i=J.N(w.h(0,-1))
h=J.D(i)
if(q){i=h.h(i,l)
a1=i}else{g=h.h(i,l)
if(typeof g!=="number")return g.u()
i=h.h(i,l+1)
if(typeof i!=="number")return H.b(i)
i=(g<<8|i)>>>8
a1=i}}else a1=255
j=m+1
if(m<0||m>=y)return H.a(x,m)
x[m]=b2
m=j+1
if(j<0||j>=y)return H.a(x,j)
x[j]=b2
j=m+1
if(m<0||m>=y)return H.a(x,m)
x[m]=b2
m=j+1
if(j<0||j>=y)return H.a(x,j)
x[j]=a1
break
case 4:i=J.N(w.h(0,0))
h=J.D(i)
if(q)b3=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.u()
i=h.h(i,l+1)
if(typeof i!=="number")return H.b(i)
b3=(g<<8|i)>>>8}i=J.N(w.h(0,1))
h=J.D(i)
if(q)b4=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.u()
i=h.h(i,l+1)
if(typeof i!=="number")return H.b(i)
b4=(g<<8|i)>>>8}i=J.N(w.h(0,2))
h=J.D(i)
if(q)a2=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.u()
i=h.h(i,l+1)
if(typeof i!=="number")return H.b(i)
a2=(g<<8|i)>>>8}i=J.N(w.h(0,p?-1:3))
h=J.D(i)
if(q)b5=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.u()
i=h.h(i,l+1)
if(typeof i!=="number")return H.b(i)
b5=(g<<8|i)>>>8}if(r){i=J.N(w.h(0,-1))
h=J.D(i)
if(q){i=h.h(i,l)
a1=i}else{g=h.h(i,l)
if(typeof g!=="number")return g.u()
i=h.h(i,l+1)
if(typeof i!=="number")return H.b(i)
i=(g<<8|i)>>>8
a1=i}}else a1=255
if(typeof b3!=="number")return H.b(b3)
if(typeof b4!=="number")return H.b(b4)
if(typeof a2!=="number")return H.b(a2)
if(typeof b5!=="number")return H.b(b5)
i=1-(255-b5)/255
b1=[C.b.bF(255*(1-(255-b3)/255)*i),C.b.bF(255*(1-(255-b4)/255)*i),C.b.bF(255*(1-(255-a2)/255)*i)]
j=m+1
i=b1[0]
if(m<0||m>=y)return H.a(x,m)
x[m]=i
m=j+1
i=b1[1]
if(j<0||j>=y)return H.a(x,j)
x[j]=i
j=m+1
i=b1[2]
if(m<0||m>=y)return H.a(x,m)
x[m]=i
m=j+1
if(j<0||j>=y)return H.a(x,j)
x[j]=a1
break
default:throw H.l(new U.L("Unhandled color mode: "+H.m(b6)))}}return z}}},
rO:{
"^":"o;a,a3:b>,A:c>"},
rR:{
"^":"o;bH:a>,ca:b>,c,d,N:e>,M:f>,r,x,y,z,Q,a3:ch>,cx,cy,db,dx,aE:dy>,fr,fx,fy",
rP:[function(a){var z,y
z=this.dx
if(z.O("lsct")){y=z.h(0,"lsct")
return y.gaa(y)}return 0},"$0","gaa",0,0,42],
qQ:function(a,b){var z,y
for(z=0;y=this.cx,z<y.length;++z)y[z].qR(a,this.e,this.f,b.r)
this.fx=U.lX(b.x,b.r,this.e,this.f,y)},
mH:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=a.q()
y=$.$get$bJ()
y[0]=z
z=$.$get$e_()
if(0>=z.length)return H.a(z,0)
this.a=z[0]
y[0]=a.q()
if(0>=z.length)return H.a(z,0)
this.b=z[0]
y[0]=a.q()
if(0>=z.length)return H.a(z,0)
this.c=z[0]
y[0]=a.q()
if(0>=z.length)return H.a(z,0)
z=z[0]
this.d=z
this.e=z-this.b
this.f=this.c-this.a
this.cx=[]
x=a.t()
for(w=0;w<x;++w){z=a.t()
$.$get$eR()[0]=z
z=$.$get$hc()
if(0>=z.length)return H.a(z,0)
v=z[0]
u=a.q()
this.cx.push(new U.lV(v,u,null))}t=a.q()
if(t!==943868237)throw H.l(new U.L("Invalid PSD layer signature: "+C.a.f9(t,16)))
this.r=a.q()
z=a.a
y=a.d
a.d=J.c(y,1)
this.x=J.e(z,y)
y=a.a
z=a.d
a.d=J.c(z,1)
this.y=J.e(y,z)
z=a.a
y=a.d
a.d=J.c(y,1)
this.z=J.e(z,y)
y=a.a
z=a.d
a.d=J.c(z,1)
if(!J.i(J.e(y,z),0))throw H.l(new U.L("Invalid PSD layer data"))
u=a.q()
s=a.aP(u)
if(u>0){u=s.q()
if(u>0){r=s.aP(u)
z=new U.rW(null,null,null,null,null,null,0)
u=J.h(r.c,r.d)
z.a=r.q()
z.b=r.q()
z.c=r.q()
z.d=r.q()
y=r.a
q=r.d
r.d=J.c(q,1)
z.e=J.e(y,q)
q=r.a
y=r.d
r.d=J.c(y,1)
z.f=J.e(q,y)
y=J.i(u,20)
q=r.d
if(y)r.d=J.c(q,2)
else{y=r.a
r.d=J.c(q,1)
z.f=J.e(y,q)
q=r.a
y=r.d
r.d=J.c(y,1)
z.e=J.e(q,y)
z.a=r.q()
z.b=r.q()
z.c=r.q()
z.d=r.q()}this.cy=z}u=s.q()
if(u>0)this.db=U.rK(s.aP(u))
z=s.a
y=s.d
s.d=J.c(y,1)
u=J.e(z,y)
this.ch=s.aj(u)
y=J.bW(u,4)
if(typeof y!=="number")return H.b(y)
p=4-y-1
if(p>0)s.d=J.c(s.d,p)
for(z=s.c,y=this.dx,q=this.fy;!J.a7(s.d,z);){t=s.q()
if(t!==943868237)throw H.l(new U.L("PSD invalid signature for layer additional data: "+C.a.f9(t,16)))
o=s.aj(4)
u=s.q()
n=J.c(s.d,0)
m=s.a
l=s.e
k=J.c(n,u)
j=J.c(s.d,J.h(k,n))
s.d=j
if((u&1)===1)s.d=J.c(j,1)
y.k(0,o,U.rU(o,new U.ak(m,n,k,n,l)))
if(o==="lrFX"){i=y.h(0,"lrFX")
h=U.R(i.gA(i),null,0)
h.t()
g=h.t()
for(f=0;f<g;++f){h.aj(4)
e=h.aj(4)
d=h.q()
if(e==="dsdw"){c=new U.rM(null,null,null,null,null,null,null,null,null,null,null)
q.push(c)
c.a=h.q()
c.c=h.q()
c.d=h.q()
c.e=h.q()
c.f=h.q()
c.r=[h.t(),h.t(),h.t(),h.t(),h.t()]
c.x=h.aj(8)
m=h.a
l=h.d
h.d=J.c(l,1)
c.b=!J.i(J.e(m,l),0)
l=h.a
m=h.d
h.d=J.c(m,1)
c.y=!J.i(J.e(l,m),0)
m=h.a
l=h.d
h.d=J.c(l,1)
c.z=J.e(m,l)
c.Q=[h.t(),h.t(),h.t(),h.t(),h.t()]}else if(e==="isdw"){c=new U.rQ(null,null,null,null,null,null,null,null,null,null,null)
q.push(c)
c.a=h.q()
c.c=h.q()
c.d=h.q()
c.e=h.q()
c.f=h.q()
c.r=[h.t(),h.t(),h.t(),h.t(),h.t()]
c.x=h.aj(8)
m=h.a
l=h.d
h.d=J.c(l,1)
c.b=!J.i(J.e(m,l),0)
l=h.a
m=h.d
h.d=J.c(m,1)
c.y=!J.i(J.e(l,m),0)
m=h.a
l=h.d
h.d=J.c(l,1)
c.z=J.e(m,l)
c.Q=[h.t(),h.t(),h.t(),h.t(),h.t()]}else if(e==="oglw"){c=new U.rX(null,null,null,null,null,null,null,null)
q.push(c)
c.a=h.q()
c.c=h.q()
c.d=h.q()
c.e=[h.t(),h.t(),h.t(),h.t(),h.t()]
c.f=h.aj(8)
m=h.a
l=h.d
h.d=J.c(l,1)
c.b=!J.i(J.e(m,l),0)
l=h.a
m=h.d
h.d=J.c(m,1)
c.r=J.e(l,m)
if(c.a===2)c.x=[h.t(),h.t(),h.t(),h.t(),h.t()]}else if(e==="iglw"){c=new U.rP(null,null,null,null,null,null,null,null,null)
q.push(c)
c.a=h.q()
c.c=h.q()
c.d=h.q()
c.e=[h.t(),h.t(),h.t(),h.t(),h.t()]
c.f=h.aj(8)
m=h.a
l=h.d
h.d=J.c(l,1)
c.b=!J.i(J.e(m,l),0)
l=h.a
m=h.d
h.d=J.c(m,1)
c.r=J.e(l,m)
if(c.a===2){m=h.a
l=h.d
h.d=J.c(l,1)
c.x=!J.i(J.e(m,l),0)
c.y=[h.t(),h.t(),h.t(),h.t(),h.t()]}}else if(e==="bevl"){c=new U.rI(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
q.push(c)
c.a=h.q()
c.c=h.q()
c.d=h.q()
c.e=h.q()
c.f=h.aj(8)
c.r=h.aj(8)
c.x=[h.t(),h.t(),h.t(),h.t(),h.t()]
c.y=[h.t(),h.t(),h.t(),h.t(),h.t()]
m=h.a
l=h.d
h.d=J.c(l,1)
c.z=J.e(m,l)
l=h.a
m=h.d
h.d=J.c(m,1)
c.Q=J.e(l,m)
m=h.a
l=h.d
h.d=J.c(l,1)
c.ch=J.e(m,l)
l=h.a
m=h.d
h.d=J.c(m,1)
c.b=!J.i(J.e(l,m),0)
m=h.a
l=h.d
h.d=J.c(l,1)
c.cx=!J.i(J.e(m,l),0)
l=h.a
m=h.d
h.d=J.c(m,1)
c.cy=J.e(l,m)
if(c.a===2){c.db=[h.t(),h.t(),h.t(),h.t(),h.t()]
c.dx=[h.t(),h.t(),h.t(),h.t(),h.t()]}}else if(e==="sofi"){c=new U.rY(null,null,null,null,null,null)
q.push(c)
c.a=h.q()
c.c=h.aj(4)
c.d=[h.t(),h.t(),h.t(),h.t(),h.t()]
m=h.a
l=h.d
h.d=J.c(l,1)
c.e=J.e(m,l)
l=h.a
m=h.d
h.d=J.c(m,1)
c.b=!J.i(J.e(l,m),0)
c.f=[h.t(),h.t(),h.t(),h.t(),h.t()]}else h.d=J.c(h.d,d)}}}}},
static:{rS:function(a){var z=new U.rR(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,P.a5(),[],null,null,[])
z.mH(a)
return z}}},
lY:{
"^":"o;a",
static:{rU:function(a,b){var z,y,x
switch(a){case"lsct":z=new U.rV(null,null,0,a)
y=J.h(b.c,b.d)
z.b=b.q()
x=J.y(y)
if(x.av(y,12)){if(b.aj(4)!=="8BIM")H.T(new U.L("Invalid key in layer additional data"))
z.c=b.aj(4)}if(x.av(y,16))z.d=b.q()
return z
default:return new U.rT(b,a)}}}},
rW:{
"^":"o;bH:a>,ca:b>,c,d,e,f,r"},
rL:{
"^":"d2;b,a",
dj:function(a,b){this.b=U.lW(a)
return this.co(b)},
co:function(a){var z=this.b
if(z==null)return
return z.pV()}},
ul:{
"^":"o;a,b,c",
Z:function(a){var z,y,x,w
if(a===0)return 0
if(this.c===0){this.c=8
z=this.a
y=z.a
x=z.d
z.d=J.c(x,1)
this.b=J.e(y,x)}for(w=0;z=this.c,a>z;){y=C.a.u(w,z)
x=this.b
if(z<0||z>=9)return H.a(C.l,z)
z=J.W(x,C.l[z])
if(typeof z!=="number")return H.b(z)
w=y+z
a-=this.c
this.c=8
z=this.a
y=z.a
x=z.d
z.d=J.c(x,1)
this.b=J.e(y,x)}if(a>0){if(z===0){this.c=8
z=this.a
y=z.a
x=z.d
z.d=J.c(x,1)
this.b=J.e(y,x)}z=C.a.u(w,a)
y=this.b
x=this.c-a
if(typeof y!=="number")return y.D()
y=C.b.D(y,x)
if(a>=9)return H.a(C.l,a)
w=z+(y&C.l[a])
this.c=x}return w}},
un:{
"^":"o;a,aa:b>,c,d",
K:function(a){var z=this.a
if(C.aB.O(z))return H.m(C.aB.h(0,z))+": "+this.b+" "+this.c
return"<"+z+">: "+this.b+" "+this.c},
iu:function(a){var z,y,x
a.d=this.d
z=[]
for(y=this.c,x=0;x<y;++x)z.push(this.cj(a))
return z},
cj:function(a){var z,y,x,w
switch(this.b){case 1:case 2:z=a.a
y=a.d
a.d=J.c(y,1)
return J.e(z,y)
case 3:return a.t()
case 4:return a.q()
case 5:x=a.q()
w=a.q()
if(w===0)return 0
return x/w
case 6:throw H.l(new U.L("Unhandled value type: SBYTE"))
case 7:z=a.a
y=a.d
a.d=J.c(y,1)
return J.e(z,y)
case 8:throw H.l(new U.L("Unhandled value type: SSHORT"))
case 9:throw H.l(new U.L("Unhandled value type: SLONG"))
case 10:throw H.l(new U.L("Unhandled value type: SRATIONAL"))
case 11:throw H.l(new U.L("Unhandled value type: FLOAT"))
case 12:throw H.l(new U.L("Unhandled value type: DOUBLE"))}return 0}},
uo:{
"^":"o;N:a>,M:b>,c,d,e,f,A:r>,x,y,z,Q,ch,cx,dq:cy<",
pS:function(a,b,c,d){var z,y,x
this.r=b
this.x=0
this.y=0
z=J.ac(J.c(this.a,7),8)
if(typeof d!=="number")return H.b(d)
y=0
x=0
for(;x<d;++x){this.hr(a,y,c)
if(typeof z!=="number")return H.b(z)
y+=z}},
hr:function(a,b,c){var z,y,x,w,v,u,t,s,r
this.d=0
z=0
y=0
x=0
w=null
v=null
u=null
t=!0
while(!0){s=this.a
if(typeof s!=="number")return H.b(s)
if(!(c<s))break
for(;t;){w=this.cE(10)
if(w>=1024)return H.a(C.R,w)
v=C.R[w]
x=v&1
z=C.a.p(v,1)&15
if(z===12){u=this.bf(2)
w=(w<<2&12|u)>>>0
if(w>=16)return H.a(C.t,w)
v=C.t[w]
z=C.a.p(v,1)&7
y=C.a.p(v,4)&4095
c+=y
this.aT(4-z)}else if(z===0)throw H.l(new U.L("TIFFFaxDecoder0"))
else if(z===15)throw H.l(new U.L("TIFFFaxDecoder1"))
else{y=C.a.p(v,5)&2047
c+=y
this.aT(10-z)
if(x===0){s=this.f
r=this.d++
if(r>=s.length)return H.a(s,r)
s[r]=c
t=!1}}}if(c===this.a){if(this.Q===2)if(this.x!==0){s=this.y
if(typeof s!=="number")return s.j()
this.y=s+1
this.x=0}break}for(;!t;){w=this.bf(4)
if(w>=16)return H.a(C.L,w)
v=C.L[w]
x=v&1
z=v>>>1&15
y=v>>>5&2047
if(y===100){w=this.cE(9)
if(w>=512)return H.a(C.T,w)
v=C.T[w]
x=v&1
z=C.a.p(v,1)&15
y=C.a.p(v,5)&2047
if(z===12){this.aT(5)
w=this.bf(4)
if(w>=16)return H.a(C.t,w)
v=C.t[w]
z=C.a.p(v,1)&7
y=C.a.p(v,4)&4095
this.bm(a,b,c,y)
c+=y
this.aT(4-z)}else if(z===15)throw H.l(new U.L("TIFFFaxDecoder2"))
else{this.bm(a,b,c,y)
c+=y
this.aT(9-z)
if(x===0){s=this.f
r=this.d++
if(r>=s.length)return H.a(s,r)
s[r]=c
t=!0}}}else{if(y===200){w=this.bf(2)
if(w>=4)return H.a(C.K,w)
v=C.K[w]
y=v>>>5&2047
z=v>>>1&15
this.bm(a,b,c,y)
c+=y
this.aT(2-z)
s=this.f
r=this.d++
if(r>=s.length)return H.a(s,r)
s[r]=c}else{this.bm(a,b,c,y)
c+=y
this.aT(4-z)
s=this.f
r=this.d++
if(r>=s.length)return H.a(s,r)
s[r]=c}t=!0}}if(c===this.a){if(this.Q===2)if(this.x!==0){s=this.y
if(typeof s!=="number")return s.j()
this.y=s+1
this.x=0}break}}s=this.f
r=this.d++
if(r>=s.length)return H.a(s,r)
s[r]=c},
pT:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
this.r=b
this.Q=3
this.x=0
this.y=0
z=J.ac(J.c(this.a,7),8)
y=H.p(Array(2),[P.x])
x=J.y(e)
this.cy=x.T(e,1)
w=x.T(e,2)
if(typeof w!=="number")return w.D()
this.ch=w>>>1
x=x.T(e,4)
if(typeof x!=="number")return x.D()
this.cx=x>>>2
if(this.jR()!==1)throw H.l(new U.L("TIFFFaxDecoder3"))
this.hr(a,0,c)
if(typeof z!=="number")return H.b(z)
if(typeof d!=="number")return H.b(d)
v=z
u=null
t=null
s=null
r=null
q=null
p=null
o=null
n=null
m=0
l=null
k=null
j=1
for(;j<d;++j){if(this.jR()===0){l=this.e
this.e=this.f
this.f=l
this.z=0
for(k=c,u=-1,n=!0,m=0;x=J.y(k),x.U(k,this.a);){this.jw(u,n,y)
s=y[0]
r=y[1]
q=this.bf(7)
if(q>=128)return H.a(C.M,q)
q=C.M[q]&255
p=(q&120)>>>3
o=q&7
if(p===0){if(!n)this.bm(a,v,k,J.h(r,k))
this.aT(7-o)
k=r
u=k}else if(p===1){this.aT(7-o)
i=m+1
if(n){k=x.j(k,this.fv())
x=this.f
if(m>=x.length)return H.a(x,m)
x[m]=k
h=this.fu()
this.bm(a,v,k,h)
k=J.c(k,h)
x=this.f
m=i+1
if(i>=x.length)return H.a(x,i)
x[i]=k}else{h=this.fu()
this.bm(a,v,k,h)
k=x.j(k,h)
x=this.f
if(m>=x.length)return H.a(x,m)
x[m]=k
k=J.c(k,this.fv())
x=this.f
m=i+1
if(i>=x.length)return H.a(x,i)
x[i]=k}u=k}else{if(p<=8){t=J.c(s,p-5)
x=this.f
i=m+1
if(m>=x.length)return H.a(x,m)
x[m]=t
n=!n
if(n)this.bm(a,v,k,J.h(t,k))
this.aT(7-o)}else throw H.l(new U.L("TIFFFaxDecoder4"))
k=t
m=i
u=k}}x=this.f
i=m+1
if(m>=x.length)return H.a(x,m)
x[m]=k
this.d=i
m=i}else this.hr(a,v,c)
v+=z}},
pW:function(a,b,c,d,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
this.r=b
this.Q=4
this.x=0
this.y=0
z=J.ac(J.c(this.a,7),8)
y=H.p(Array(2),[P.x])
x=J.W(a0,2)
if(typeof x!=="number")return x.D()
this.ch=x>>>1
w=this.f
this.d=0
this.d=1
x=this.a
v=w.length
if(0>=v)return H.a(w,0)
w[0]=x
this.d=2
if(1>=v)return H.a(w,1)
w[1]=x
if(typeof d!=="number")return H.b(d)
u=null
t=null
s=null
r=null
q=null
p=null
o=0
n=0
for(;n<d;++n){m=this.e
this.e=this.f
this.f=m
this.z=0
for(x=m.length,l=c,k=-1,j=!0,i=0;v=J.y(l),v.U(l,this.a);){this.jw(k,j,y)
t=y[0]
s=y[1]
r=this.bf(7)
if(r>=128)return H.a(C.M,r)
r=C.M[r]&255
q=(r&120)>>>3
p=r&7
if(q===0){if(!j)this.bm(a,o,l,J.h(s,l))
this.aT(7-p)
l=s
k=l}else if(q===1){this.aT(7-p)
h=i+1
if(j){l=v.j(l,this.fv())
if(i<0||i>=x)return H.a(m,i)
m[i]=l
g=this.fu()
this.bm(a,o,l,g)
l=J.c(l,g)
i=h+1
if(h<0||h>=x)return H.a(m,h)
m[h]=l}else{g=this.fu()
this.bm(a,o,l,g)
l=v.j(l,g)
if(i<0||i>=x)return H.a(m,i)
m[i]=l
l=J.c(l,this.fv())
i=h+1
if(h<0||h>=x)return H.a(m,h)
m[h]=l}k=l}else if(q<=8){u=J.c(t,q-5)
h=i+1
if(i<0||i>=x)return H.a(m,i)
m[i]=u
j=!j
if(j)this.bm(a,o,l,J.h(u,l))
this.aT(7-p)
l=u
i=h
k=l}else if(q===11){if(this.bf(3)!==7)throw H.l(new U.L("TIFFFaxDecoder5"))
for(f=0,e=!1;!e;){for(;this.bf(1)!==1;)++f
if(f>5){f-=6
if(!j&&f>0){h=i+1
if(i<0||i>=x)return H.a(m,i)
m[i]=l
i=h}l=J.c(l,f)
if(f>0)j=!0
if(this.bf(1)===0){if(!j){h=i+1
if(i<0||i>=x)return H.a(m,i)
m[i]=l
i=h}j=!0}else{if(j){h=i+1
if(i<0||i>=x)return H.a(m,i)
m[i]=l
i=h}j=!1}e=!0}if(f===5){if(!j){h=i+1
if(i<0||i>=x)return H.a(m,i)
m[i]=l
i=h}l=J.c(l,f)
j=!0}else{l=J.c(l,f)
h=i+1
if(i<0||i>=x)return H.a(m,i)
m[i]=l
this.bm(a,o,l,1)
l=J.c(l,1)
i=h
j=!1}}}else throw H.l(new U.L("TIFFFaxDecoder5 "+q))}if(i<0||i>=x)return H.a(m,i)
m[i]=l
this.d=i+1
if(typeof z!=="number")return H.b(z)
o+=z}},
fv:function(){var z,y,x,w,v,u,t
for(z=null,y=0,x=!0;x;){w=this.cE(10)
if(w>=1024)return H.a(C.R,w)
v=C.R[w]
u=C.a.p(v,1)&15
if(u===12){z=this.bf(2)
w=(w<<2&12|z)>>>0
if(w>=16)return H.a(C.t,w)
v=C.t[w]
t=C.a.p(v,1)
y+=C.a.p(v,4)&4095
this.aT(4-(t&7))}else if(u===0)throw H.l(new U.L("TIFFFaxDecoder0"))
else if(u===15)throw H.l(new U.L("TIFFFaxDecoder1"))
else{y+=C.a.p(v,5)&2047
this.aT(10-u)
if((v&1)===0)x=!1}}return y},
fu:function(){var z,y,x,w,v,u,t
for(z=0,y=!1;!y;){x=this.bf(4)
if(x>=16)return H.a(C.L,x)
w=C.L[x]
v=w>>>5&2047
if(v===100){x=this.cE(9)
if(x>=512)return H.a(C.T,x)
w=C.T[x]
u=C.a.p(w,1)&15
t=C.a.p(w,5)
if(u===12){this.aT(5)
x=this.bf(4)
if(x>=16)return H.a(C.t,x)
w=C.t[x]
t=C.a.p(w,1)
z+=C.a.p(w,4)&4095
this.aT(4-(t&7))}else if(u===15)throw H.l(new U.L("TIFFFaxDecoder2"))
else{z+=t&2047
this.aT(9-u)
if((w&1)===0)y=!0}}else{if(v===200){x=this.bf(2)
if(x>=4)return H.a(C.K,x)
w=C.K[x]
z+=w>>>5&2047
this.aT(2-(w>>>1&15))}else{z+=v
this.aT(4-(w>>>1&15))}y=!0}}return z},
jR:function(){var z,y,x
z=this.cx
if(z===0){if(this.cE(12)!==1)throw H.l(new U.L("TIFFFaxDecoder6"))}else if(z===1){z=this.x
if(typeof z!=="number")return H.b(z)
y=8-z
if(this.cE(y)!==0)throw H.l(new U.L("TIFFFaxDecoder8"))
if(y<4)if(this.cE(8)!==0)throw H.l(new U.L("TIFFFaxDecoder8"))
for(;x=this.cE(8),x!==1;)if(x!==0)throw H.l(new U.L("TIFFFaxDecoder8"))}if(this.cy===0)return 1
else return this.bf(1)},
jw:function(a,b,c){var z,y,x,w,v,u,t
z=this.e
y=this.d
x=this.z
w=x>0?x-1:0
w=b?(w&4294967294)>>>0:(w|1)>>>0
for(x=z.length,v=w;v<y;v+=2){if(v>=x)return H.a(z,v)
u=z[v]
if(J.F(u,a)){this.z=v
c[0]=u
break}}t=v+1
if(t<y){if(t>=x)return H.a(z,t)
c[1]=z[t]}},
bm:function(a,b,c,d){var z,y,x,w,v,u,t,s
if(typeof c!=="number")return H.b(c)
z=8*b+c
if(typeof d!=="number")return H.b(d)
y=z+d
x=C.b.p(z,3)
w=z&7
if(w>0){v=C.a.u(1,7-w)
u=J.e(a.a,J.c(a.d,x))
while(!0){if(!(v>0&&z<y))break
u=J.be(u,v)
v=v>>>1;++z}J.u(a.a,J.c(a.d,x),u)}x=C.b.p(z,3)
for(t=y-7;z<t;x=s){s=x+1
J.u(a.a,J.c(a.d,x),255)
z+=8}for(;z<y;){x=C.b.p(z,3)
t=J.be(J.e(a.a,J.c(a.d,x)),C.a.u(1,7-(z&7)))
J.u(a.a,J.c(a.d,x),t);++z}},
cE:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.r
y=J.h(J.h(z.c,z.d),1)
x=this.y
if(J.i(this.c,1)){z=this.r
w=J.e(z.a,J.c(z.d,x))
if(x==null?y==null:x===y){v=0
u=0}else{if(typeof x!=="number")return x.j()
z=x+1
t=this.r
if(z===y){v=J.e(t.a,J.c(t.d,z))
u=0}else{v=J.e(t.a,J.c(t.d,z))
z=this.r
u=J.e(z.a,J.c(z.d,x+2))}}}else if(J.i(this.c,2)){z=this.r
z=J.W(J.e(z.a,J.c(z.d,x)),255)
if(z>>>0!==z||z>=256)return H.a(C.m,z)
w=C.m[z]
if(x==null?y==null:x===y){v=0
u=0}else{if(typeof x!=="number")return x.j()
z=x+1
t=this.r
if(z===y){z=J.W(J.e(t.a,J.c(t.d,z)),255)
if(z>>>0!==z||z>=256)return H.a(C.m,z)
v=C.m[z]
u=0}else{z=J.W(J.e(t.a,J.c(t.d,z)),255)
if(z>>>0!==z||z>=256)return H.a(C.m,z)
v=C.m[z]
z=this.r
z=J.W(J.e(z.a,J.c(z.d,x+2)),255)
if(z>>>0!==z||z>=256)return H.a(C.m,z)
u=C.m[z]}}}else throw H.l(new U.L("TIFFFaxDecoder7"))
z=this.x
if(typeof z!=="number")return H.b(z)
s=8-z
r=a-s
if(r>8){q=r-8
p=8}else{p=r
q=0}z=this.y
if(typeof z!=="number")return z.j()
this.y=z+1
if(s<0||s>=9)return H.a(C.l,s)
z=J.W(w,C.l[s])
if(typeof z!=="number")return z.u()
z=C.a.u(z,r)
if(p<0||p>=9)return H.a(C.G,p)
t=J.W(v,C.G[p])
if(typeof t!=="number")return t.D()
o=C.a.by(t,8-p)
if(q!==0){o=C.a.u(o,q)
if(q>=9)return H.a(C.G,q)
t=J.W(u,C.G[q])
if(typeof t!=="number")return t.D()
o|=C.a.by(t,8-q)
t=this.y
if(typeof t!=="number")return t.j()
this.y=t+1
this.x=q}else if(p===8){this.x=0
t=this.y
if(typeof t!=="number")return t.j()
this.y=t+1}else this.x=p
return(z|o)>>>0},
bf:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.r
y=J.h(J.h(z.c,z.d),1)
x=this.y
if(J.i(this.c,1)){z=this.r
w=J.e(z.a,J.c(z.d,x))
if(x==null?y==null:x===y)v=0
else{z=this.r
if(typeof x!=="number")return x.j()
v=J.e(z.a,J.c(z.d,x+1))}}else if(J.i(this.c,2)){z=this.r
z=J.W(J.e(z.a,J.c(z.d,x)),255)
if(z>>>0!==z||z>=256)return H.a(C.m,z)
w=C.m[z]
if(x==null?y==null:x===y)v=0
else{z=this.r
if(typeof x!=="number")return x.j()
z=J.W(J.e(z.a,J.c(z.d,x+1)),255)
if(z>>>0!==z||z>=256)return H.a(C.m,z)
v=C.m[z]}}else throw H.l(new U.L("TIFFFaxDecoder7"))
z=this.x
if(typeof z!=="number")return H.b(z)
u=8-z
t=a-u
s=u-a
z=J.y(w)
r=C.l[u]
if(s>=0){if(u<0||u>=9)return H.a(C.l,u)
z=z.T(w,r)
if(typeof z!=="number")return z.D()
q=C.a.by(z,s)
z=this.x
if(typeof z!=="number")return z.j()
z+=a
this.x=z
if(z===8){this.x=0
z=this.y
if(typeof z!=="number")return z.j()
this.y=z+1}}else{if(u<0||u>=9)return H.a(C.l,u)
z=z.T(w,r)
if(typeof z!=="number")return z.u()
z=C.a.u(z,-s)
if(t<0||t>=9)return H.a(C.G,t)
r=J.W(v,C.G[t])
if(typeof r!=="number")return r.D()
q=(z|C.a.by(r,8-t))>>>0
r=this.y
if(typeof r!=="number")return r.j()
this.y=r+1
this.x=t}return q},
aT:function(a){var z,y
z=this.x
if(typeof z!=="number")return z.l()
y=z-a
if(y<0){z=this.y
if(typeof z!=="number")return z.l()
this.y=z-1
this.x=8+y}else this.x=y},
mT:function(a,b,c){var z=this.a
if(typeof z!=="number")return H.b(z)
this.e=H.p(Array(z),[P.x])
z=this.a
if(typeof z!=="number")return H.b(z)
z=Array(z)
z.fixed$length=Array
this.f=H.p(z,[P.x])},
static:{jq:function(a,b,c){var z=new U.uo(b,c,a,0,null,null,null,null,null,0,2,0,0,null)
z.mT(a,b,c)
return z}}},
up:{
"^":"o;a,N:b>,M:c>,d,e,pz:f<,cz:r<,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,hX:k3<,k4,r1,r2,rx",
pQ:function(a){var z,y,x,w
this.rx=U.c_(this.b,this.c,4)
z=0
y=0
while(!0){x=this.fx
if(typeof x!=="number")return H.b(x)
if(!(z<x))break
w=0
while(!0){x=this.fr
if(typeof x!=="number")return H.b(x)
if(!(w<x))break
this.nB(a,w,z);++w;++y}++z}return this.rx},
nB:function(a9,b0,b1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
if(this.x===0){this.nx(a9,b0,b1)
return}w=this.fr
if(typeof w!=="number")return H.b(w)
v=b1*w+b0
w=this.dx
if(v<0||v>=w.length)return H.a(w,v)
J.f0(a9,w[v])
w=this.cy
if(typeof w!=="number")return H.b(w)
u=b0*w
t=this.db
if(typeof t!=="number")return H.b(t)
s=b1*t
r=this.dy
if(v>=r.length)return H.a(r,v)
z=r[v]
r=this.r
if(typeof r!=="number")return H.b(r)
q=w*t*r
if(J.i(this.f,16))q*=2
y=null
if(J.i(this.f,8)||J.i(this.f,16)){if(J.i(this.e,1))y=a9
else if(J.i(this.e,5)){if(typeof q!=="number"||Math.floor(q)!==q)H.T(P.aD("Invalid length "+H.m(q)))
w=new Uint8Array(q)
y=new U.ak(w,0,w.length,0,!1)
x=new U.lw(9,0,0,0,0,null,null,null,null,new Uint8Array(4096),null,null,null,null)
try{x.ks(U.R(a9,z,0),J.eZ(y))}catch(p){H.ap(p)}if(J.i(this.z,2)){o=0
while(!0){w=this.db
if(typeof w!=="number")return H.b(w)
if(!(o<w))break
w=this.r
t=this.cy
if(typeof t!=="number")return H.b(t)
n=J.d(w,o*t+1)
for(m=this.r,l=J.d(this.cy,m);w=J.y(m),w.U(m,l);m=w.j(m,1)){t=y
r=J.C(t)
k=J.e(r.gam(t),J.c(r.gaz(t),n))
j=y
i=J.y(n)
h=i.l(n,this.r)
g=J.C(j)
h=J.c(k,J.e(g.gam(j),J.c(g.gaz(j),h)))
J.u(r.gam(t),J.c(r.gaz(t),n),h)
n=i.j(n,1)}++o}}}else if(J.i(this.e,32773)){if(typeof q!=="number"||Math.floor(q)!==q)H.T(P.aD("Invalid length "+H.m(q)))
w=new Uint8Array(q)
y=new U.ak(w,0,w.length,0,!1)
this.ji(a9,q,J.eZ(y))}else if(J.i(this.e,32946)){f=J.e9(a9,0,z)
w=T.bh(C.z)
t=T.bh(C.F)
r=T.b5(f,0,null,0)
k=new T.lJ(0,0,new Uint8Array(32768))
new T.dB(r,k,0,0,0,w,t).dJ()
t=k.c.buffer
e=(t&&C.e).ad(t,0,k.a)
y=new U.ak(e,0,e.length,0,!1)}else if(J.i(this.e,8)){e=new T.di().b6(T.b5(J.e9(a9,0,z),1,null,0),!1)
y=new U.ak(e,0,e.length,0,!1)}else if(J.i(this.e,6)){d=new U.ie(null,null,null,null,null,null,Array(4),[],[],[],[],0,0)
d.l1(J.e9(a9,0,z))
this.o9(d,this.rx,u,s,this.cy,this.db)
return}else throw H.l(new U.L("Unsupported Compression Type: "+H.m(this.e)))
if(y==null)return
c=s
b=0
a=0
while(!0){w=this.db
if(typeof w!=="number")return H.b(w)
if(a<w){w=this.c
if(typeof w!=="number")return H.b(w)
w=c<w}else w=!1
if(!w)break
w=c>=0
a0=u
a1=0
while(!0){t=this.cy
if(typeof t!=="number")return H.b(t)
if(a1<t){t=this.b
if(typeof t!=="number")return H.b(t)
t=a0<t}else t=!1
if(!t)break
if(J.i(this.r,1)){t=y
a2=b+1
r=J.C(t)
a3=J.e(r.gam(t),J.c(r.gaz(t),b))
b=J.i(this.f,16)?a2+1:a2
if(J.i(this.d,3)&&this.k3!=null){t=this.k3
r=this.k4
if(typeof r!=="number")return r.j()
if(typeof a3!=="number")return H.b(a3)
r+=a3
k=t.length
if(r>>>0!==r||r>=k)return H.a(t,r)
r=t[r]
j=this.r1
if(typeof j!=="number")return j.j()
j+=a3
if(j>>>0!==j||j>=k)return H.a(t,j)
j=t[j]
i=this.r2
if(typeof i!=="number")return i.j()
i+=a3
if(i>>>0!==i||i>=k)return H.a(t,i)
i=t[i]
t=C.a.v(255,0,255)
i=J.a4(i,0,255)
if(typeof i!=="number")return i.u()
j=J.a4(j,0,255)
if(typeof j!=="number")return j.u()
r=J.a4(r,0,255)
if(typeof r!=="number")return H.b(r)
a4=(t<<24|i<<16|j<<8|r)>>>0}else{t=C.a.v(255,0,255)
r=J.y(a3)
k=r.v(a3,0,255)
if(typeof k!=="number")return k.u()
j=r.v(a3,0,255)
if(typeof j!=="number")return j.u()
r=r.v(a3,0,255)
if(typeof r!=="number")return H.b(r)
a4=(t<<24|k<<16|j<<8|r)>>>0}t=this.rx
t.toString
if(a0>=0){r=t.a
if(typeof r!=="number")return H.b(r)
if(a0<r)if(w){r=t.b
if(typeof r!=="number")return H.b(r)
r=c<r}else r=!1
else r=!1}else r=!1
if(r){r=t.x
t=t.a
if(typeof t!=="number")return H.b(t)
t=c*t+a0
if(t>>>0!==t||t>=r.length)return H.a(r,t)
r[t]=a4}}else if(J.i(this.r,2)){t=y
a2=b+1
r=J.C(t)
a3=J.e(r.gam(t),J.c(r.gaz(t),b))
b=J.i(this.f,16)?a2+1:a2
t=y
a2=b+1
r=J.C(t)
a5=J.e(r.gam(t),J.c(r.gaz(t),b))
b=J.i(this.f,16)?a2+1:a2
t=J.a4(a5,0,255)
if(typeof t!=="number")return t.u()
r=J.y(a3)
k=r.v(a3,0,255)
if(typeof k!=="number")return k.u()
j=r.v(a3,0,255)
if(typeof j!=="number")return j.u()
r=r.v(a3,0,255)
if(typeof r!=="number")return H.b(r)
i=this.rx
i.toString
if(a0>=0){h=i.a
if(typeof h!=="number")return H.b(h)
if(a0<h)if(w){h=i.b
if(typeof h!=="number")return H.b(h)
h=c<h}else h=!1
else h=!1}else h=!1
if(h){h=i.x
i=i.a
if(typeof i!=="number")return H.b(i)
i=c*i+a0
if(i>>>0!==i||i>=h.length)return H.a(h,i)
h[i]=(t<<24|k<<16|j<<8|r)>>>0}}else if(J.i(this.r,3)){a2=b+1
if(J.i(this.f,16)){t=y
r=J.C(t)
a6=J.e(r.gam(t),J.c(r.gaz(t),b))
b=a2+1
t=y
r=J.C(t)
a7=J.e(r.gam(t),J.c(r.gaz(t),b))
b=b+1+1
t=y
r=J.C(t)
a8=J.e(r.gam(t),J.c(r.gaz(t),b))
b=b+1+1
t=C.a.v(255,0,255)
r=J.a4(a8,0,255)
if(typeof r!=="number")return r.u()
k=J.a4(a7,0,255)
if(typeof k!=="number")return k.u()
j=J.a4(a6,0,255)
if(typeof j!=="number")return H.b(j)
i=this.rx
i.toString
if(a0>=0){h=i.a
if(typeof h!=="number")return H.b(h)
if(a0<h)if(w){h=i.b
if(typeof h!=="number")return H.b(h)
h=c<h}else h=!1
else h=!1}else h=!1
if(h){h=i.x
i=i.a
if(typeof i!=="number")return H.b(i)
i=c*i+a0
if(i>>>0!==i||i>=h.length)return H.a(h,i)
h[i]=(t<<24|r<<16|k<<8|j)>>>0}}else{t=y
r=J.C(t)
t=J.e(r.gam(t),J.c(r.gaz(t),b))
r=y
b=a2+1
k=J.C(r)
r=J.e(k.gam(r),J.c(k.gaz(r),a2))
k=y
a2=b+1
j=J.C(k)
k=J.e(j.gam(k),J.c(j.gaz(k),b))
j=C.a.v(255,0,255)
k=J.a4(k,0,255)
if(typeof k!=="number")return k.u()
r=J.a4(r,0,255)
if(typeof r!=="number")return r.u()
t=J.a4(t,0,255)
if(typeof t!=="number")return H.b(t)
i=this.rx
i.toString
if(a0>=0){h=i.a
if(typeof h!=="number")return H.b(h)
if(a0<h)if(w){h=i.b
if(typeof h!=="number")return H.b(h)
h=c<h}else h=!1
else h=!1}else h=!1
if(h){h=i.x
i=i.a
if(typeof i!=="number")return H.b(i)
i=c*i+a0
if(i>>>0!==i||i>=h.length)return H.a(h,i)
h[i]=(j<<24|k<<16|r<<8|t)>>>0}b=a2}}else if(J.a7(this.r,4)){a2=b+1
if(J.i(this.f,16)){t=y
r=J.C(t)
a6=J.e(r.gam(t),J.c(r.gaz(t),b))
b=a2+1
t=y
r=J.C(t)
a7=J.e(r.gam(t),J.c(r.gaz(t),b))
b=b+1+1
t=y
r=J.C(t)
a8=J.e(r.gam(t),J.c(r.gaz(t),b))
b=b+1+1
t=y
r=J.C(t)
a2=b+1+1
t=J.a4(J.e(r.gam(t),J.c(r.gaz(t),b)),0,255)
if(typeof t!=="number")return t.u()
r=J.a4(a8,0,255)
if(typeof r!=="number")return r.u()
k=J.a4(a7,0,255)
if(typeof k!=="number")return k.u()
j=J.a4(a6,0,255)
if(typeof j!=="number")return H.b(j)
i=this.rx
i.toString
if(a0>=0){h=i.a
if(typeof h!=="number")return H.b(h)
if(a0<h)if(w){h=i.b
if(typeof h!=="number")return H.b(h)
h=c<h}else h=!1
else h=!1}else h=!1
if(h){h=i.x
i=i.a
if(typeof i!=="number")return H.b(i)
i=c*i+a0
if(i>>>0!==i||i>=h.length)return H.a(h,i)
h[i]=(t<<24|r<<16|k<<8|j)>>>0}b=a2}else{t=y
r=J.C(t)
t=J.e(r.gam(t),J.c(r.gaz(t),b))
r=y
b=a2+1
k=J.C(r)
r=J.e(k.gam(r),J.c(k.gaz(r),a2))
k=y
a2=b+1
j=J.C(k)
k=J.e(j.gam(k),J.c(j.gaz(k),b))
j=y
b=a2+1
i=J.C(j)
j=J.a4(J.e(i.gam(j),J.c(i.gaz(j),a2)),0,255)
if(typeof j!=="number")return j.u()
k=J.a4(k,0,255)
if(typeof k!=="number")return k.u()
r=J.a4(r,0,255)
if(typeof r!=="number")return r.u()
t=J.a4(t,0,255)
if(typeof t!=="number")return H.b(t)
i=this.rx
i.toString
if(a0>=0){h=i.a
if(typeof h!=="number")return H.b(h)
if(a0<h)if(w){h=i.b
if(typeof h!=="number")return H.b(h)
h=c<h}else h=!1
else h=!1}else h=!1
if(h){h=i.x
i=i.a
if(typeof i!=="number")return H.b(i)
i=c*i+a0
if(i>>>0!==i||i>=h.length)return H.a(h,i)
h[i]=(j<<24|k<<16|r<<8|t)>>>0}}}++a1;++a0}++a;++c}}else throw H.l(new U.L("Unsupported bitsPerSample: "+H.m(this.f)))},
o9:function(a,b,c,d,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=a.iE(a0,a1)
switch(a.Q.length){case 1:if(typeof a1!=="number")return H.b(a1)
y=z.length
x=0
w=0
for(;w<a1;++w){if(typeof a0!=="number")return H.b(a0)
v=w+d
u=v>=0
t=0
for(;t<a0;++t,x=s){s=x+1
if(x<0||x>=y)return H.a(z,x)
r=z[x]
q=t+c
p=C.a.v(255,0,255)
o=J.y(r)
n=o.v(r,0,255)
if(typeof n!=="number")return n.u()
m=o.v(r,0,255)
if(typeof m!=="number")return m.u()
o=o.v(r,0,255)
if(typeof o!=="number")return H.b(o)
b.toString
if(q>=0){l=b.a
if(typeof l!=="number")return H.b(l)
if(q<l)if(u){l=b.b
if(typeof l!=="number")return H.b(l)
l=v<l}else l=!1
else l=!1}else l=!1
if(l){l=b.x
k=b.a
if(typeof k!=="number")return H.b(k)
q=v*k+q
if(q>>>0!==q||q>=l.length)return H.a(l,q)
l[q]=(p<<24|n<<16|m<<8|o)>>>0}}}break
case 3:if(typeof a1!=="number")return H.b(a1)
y=z.length
x=0
w=0
for(;w<a1;++w){if(typeof a0!=="number")return H.b(a0)
v=w+d
u=v>=0
t=0
for(;t<a0;++t,x=s){s=x+1
if(x<0||x>=y)return H.a(z,x)
j=z[x]
x=s+1
if(s<0||s>=y)return H.a(z,s)
i=z[s]
s=x+1
if(x<0||x>=y)return H.a(z,x)
h=z[x]
q=C.a.v(255,0,255)
p=J.a4(h,0,255)
if(typeof p!=="number")return p.u()
o=J.a4(i,0,255)
if(typeof o!=="number")return o.u()
n=J.a4(j,0,255)
if(typeof n!=="number")return H.b(n)
m=t+c
b.toString
if(m>=0){l=b.a
if(typeof l!=="number")return H.b(l)
if(m<l)if(u){l=b.b
if(typeof l!=="number")return H.b(l)
l=v<l}else l=!1
else l=!1}else l=!1
if(l){l=b.x
k=b.a
if(typeof k!=="number")return H.b(k)
m=v*k+m
if(m>>>0!==m||m>=l.length)return H.a(l,m)
l[m]=(q<<24|p<<16|o<<8|n)>>>0}}}break
case 4:if(typeof a1!=="number")return H.b(a1)
y=z.length
x=0
w=0
for(;w<a1;++w){if(typeof a0!=="number")return H.b(a0)
v=w+d
u=v>=0
t=0
for(;t<a0;++t){s=x+1
if(x<0||x>=y)return H.a(z,x)
g=z[x]
x=s+1
if(s<0||s>=y)return H.a(z,s)
f=z[s]
s=x+1
if(x<0||x>=y)return H.a(z,x)
r=z[x]
x=s+1
if(s<0||s>=y)return H.a(z,s)
e=z[s]
q=J.y(e)
p=q.ar(e,255)
if(typeof p!=="number")return H.b(p)
p=J.c(J.d(g,1-p),e)
o=J.y(p)
if(o.U(p,0))p=0
else if(o.a0(p,255))p=255
if(typeof p!=="number")return H.b(p)
o=q.ar(e,255)
if(typeof o!=="number")return H.b(o)
o=J.c(J.d(f,1-o),e)
n=J.y(o)
if(n.U(o,0))o=0
else if(n.a0(o,255))o=255
if(typeof o!=="number")return H.b(o)
q=q.ar(e,255)
if(typeof q!=="number")return H.b(q)
q=J.c(J.d(r,1-q),e)
n=J.y(q)
if(n.U(q,0))q=0
else if(n.a0(q,255))q=255
if(typeof q!=="number")return H.b(q)
n=t+c
m=C.a.v(255,0,255)
q=C.b.v(255-q,0,255)
o=C.b.v(255-o,0,255)
p=C.b.v(255-p,0,255)
b.toString
if(n>=0){l=b.a
if(typeof l!=="number")return H.b(l)
if(n<l)if(u){l=b.b
if(typeof l!=="number")return H.b(l)
l=v<l}else l=!1
else l=!1}else l=!1
if(l){l=b.x
k=b.a
if(typeof k!=="number")return H.b(k)
n=v*k+n
if(n>>>0!==n||n>=l.length)return H.a(l,n)
l[n]=(m<<24|q<<16|o<<8|p)>>>0}}}break
default:throw H.l("Unsupported color mode")}},
nx:function(a,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
y=this.fr
if(typeof y!=="number")return H.b(y)
x=a1*y+a0
y=this.dx
if(x<0||x>=y.length)return H.a(y,x)
J.f0(a,y[x])
y=this.cy
if(typeof y!=="number")return H.b(y)
w=a0*y
y=this.db
if(typeof y!=="number")return H.b(y)
v=a1*y
y=this.dy
if(x>=y.length)return H.a(y,x)
u=y[x]
z=null
if(J.i(this.e,32773)){y=J.bW(this.cy,8)
t=this.cy
s=y===0?J.d(J.ac(t,8),this.db):J.d(J.c(J.ac(t,8),1),this.db)
z=U.aa(new Uint8Array(H.k(J.d(this.cy,this.db))),!1,null,0)
this.ji(a,s,J.eZ(z))}else if(J.i(this.e,5)){z=U.aa(new Uint8Array(H.k(J.d(this.cy,this.db))),!1,null,0)
new U.lw(9,0,0,0,0,null,null,null,null,new Uint8Array(H.k(4096)),null,null,null,null).ks(U.R(a,u,0),J.eZ(z))
if(J.i(this.z,2)){r=0
while(!0){y=this.c
if(typeof y!=="number")return H.b(y)
if(!(r<y))break
y=this.r
t=this.b
if(typeof t!=="number")return H.b(t)
q=J.d(y,r*t+1)
for(p=this.r;y=J.y(p),y.U(p,J.d(this.b,this.r));p=y.j(p,1)){t=z
o=J.C(t)
n=J.e(o.gam(t),J.c(o.gaz(t),q))
m=z
l=J.y(q)
k=l.l(q,this.r)
j=J.C(m)
k=J.c(n,J.e(j.gam(m),J.c(j.gaz(m),k)))
J.u(o.gam(t),J.c(o.gaz(t),q),k)
q=l.j(q,1)}++r}}}else if(J.i(this.e,2)){z=U.aa(new Uint8Array(H.k(J.d(this.cy,this.db))),!1,null,0)
try{U.jq(this.go,this.cy,this.db).pS(z,a,0,this.db)}catch(i){H.ap(i)}}else if(J.i(this.e,3)){z=U.aa(new Uint8Array(H.k(J.d(this.cy,this.db))),!1,null,0)
try{U.jq(this.go,this.cy,this.db).pT(z,a,0,this.db,this.id)}catch(i){H.ap(i)}}else if(J.i(this.e,4)){z=U.aa(new Uint8Array(H.k(J.d(this.cy,this.db))),!1,null,0)
try{U.jq(this.go,this.cy,this.db).pW(z,a,0,this.db,this.k1)}catch(i){H.ap(i)}}else if(J.i(this.e,8))z=U.aa(new T.di().b6(T.b5(J.e9(a,0,u),1,null,0),!1),!1,null,0)
else if(J.i(this.e,32946)){y=T.pU(J.e9(a,0,u),null).b
t=y.c.buffer
z=U.aa((t&&C.e).ad(t,0,y.a),!1,null,0)}else if(J.i(this.e,1))z=a
else throw H.l(new U.L("Unsupported Compression Type: "+H.m(this.e)))
if(z==null)return
h=new U.ul(z,0,0)
y=this.y
g=y?4278190080:4294967295
f=y?4294967295:4278190080
e=v
d=0
while(!0){y=this.db
if(typeof y!=="number")return H.b(y)
if(!(d<y))break
y=e>=0
c=w
b=0
while(!0){t=this.cy
if(typeof t!=="number")return H.b(t)
if(!(b<t))break
t=h.Z(1)
o=this.rx
if(t===0){o.toString
if(c>=0){t=o.a
if(typeof t!=="number")return H.b(t)
if(c<t)if(y){t=o.b
if(typeof t!=="number")return H.b(t)
t=e<t}else t=!1
else t=!1}else t=!1
if(t){t=o.x
o=o.a
if(typeof o!=="number")return H.b(o)
o=e*o+c
if(o>>>0!==o||o>=t.length)return H.a(t,o)
t[o]=f}}else{o.toString
if(c>=0){t=o.a
if(typeof t!=="number")return H.b(t)
if(c<t)if(y){t=o.b
if(typeof t!=="number")return H.b(t)
t=e<t}else t=!1
else t=!1}else t=!1
if(t){t=o.x
o=o.a
if(typeof o!=="number")return H.b(o)
o=e*o+c
if(o>>>0!==o||o>=t.length)return H.a(t,o)
t[o]=g}}++b;++c}h.c=0;++d;++e}},
ji:function(a,b,c){var z,y,x,w,v,u,t,s,r
if(typeof b!=="number")return H.b(b)
z=J.aQ(c)
y=0
x=0
for(;x<b;){w=y+1
v=J.e(a.a,J.c(a.d,y))
$.$get$e0()[0]=v
v=$.$get$eT()
if(0>=v.length)return H.a(v,0)
u=v[0]
if(u>=0&&u<=127)for(v=u+1,y=w,t=0;t<v;++t,x=s,y=w){s=x+1
w=y+1
z.k(c,x,J.e(a.a,J.c(a.d,y)))}else{v=u<=-1&&u>=-127
y=w+1
if(v){r=J.e(a.a,J.c(a.d,w))
for(v=-u+1,t=0;t<v;++t,x=s){s=x+1
z.k(c,x,r)}}}}},
df:function(a,b,c){var z=this.a
if(!z.O(b))return c
z=z.h(0,b)
a.d=z.d
return z.cj(a)},
hN:function(a,b){return this.df(a,b,0)},
fD:function(a,b){var z=this.a
if(!z.O(b))return
return z.h(0,b).iu(a)},
mU:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=U.R(a,null,0)
y=a.t()
for(x=this.a,w=0;w<y;++w){v=a.t()
u=a.t()
t=a.q()
s=new U.un(v,u,t,null)
if(u<13&&u>0){if(u>=14)return H.a(C.az,u)
r=C.az[u]}else r=0
if(t*r>4)s.d=a.q()
else{r=a.d
s.d=r
a.d=J.c(r,4)}x.k(0,v,s)
if(v===256){z.d=s.d
this.b=s.cj(z)}else if(v===257){z.d=s.d
this.c=s.cj(z)}else if(v===262){z.d=s.d
this.d=s.cj(z)}else if(v===259){z.d=s.d
this.e=s.cj(z)}else if(v===258){z.d=s.d
this.f=s.cj(z)}else if(v===277){z.d=s.d
this.r=s.cj(z)}else if(v===317){z.d=s.d
this.z=s.cj(z)}else if(v===320){q=s.iu(z)
this.k3=q
this.k4=0
r=q.length/3|0
this.r1=r
this.r2=r*2}}if(this.b==null||this.c==null||this.f==null||this.e==null)return
if(this.k3!=null&&J.i(this.f,8))for(r=this.k3,p=r.length,w=0;w<p;++w){o=r[w]
if(typeof o!=="number")return o.D()
r[w]=C.b.p(o,8)}if(J.i(this.d,0))this.y=!0
if(x.O(324)){this.cx=!0
this.cy=this.hN(z,322)
this.db=this.hN(z,323)
this.dx=this.fD(z,324)
this.dy=this.fD(z,325)}else{this.cx=!1
this.cy=this.df(z,322,this.b)
if(!x.O(278))this.db=this.df(z,323,this.c)
else{n=this.hN(z,278)
if(J.i(n,-1))this.db=this.c
else this.db=n}this.dx=this.fD(z,273)
this.dy=this.fD(z,279)}this.fr=J.ac(J.h(J.c(this.b,this.cy),1),this.cy)
this.fx=J.ac(J.h(J.c(this.c,this.db),1),this.db)
this.fy=J.d(J.d(this.cy,this.db),this.r)
this.go=this.df(z,266,1)
this.id=this.df(z,292,0)
this.k1=this.df(z,293,0)
this.k2=this.df(z,338,0)
switch(this.d){case 0:case 1:if(J.i(this.f,1)&&J.i(this.r,1))this.x=0
else if(J.i(this.f,4)&&J.i(this.r,1))this.x=1
else if(J.bW(this.f,8)===0)if(J.i(this.r,1))this.x=2
else if(J.i(this.r,2))this.x=3
else this.x=8
break
case 2:if(J.bW(this.f,8)===0)if(J.i(this.r,3))this.x=5
else if(J.i(this.r,4))this.x=6
else this.x=8
break
case 3:if(J.i(this.r,1))x=J.i(this.f,4)||J.i(this.f,8)||J.i(this.f,16)
else x=!1
if(x)this.x=4
break
case 4:if(J.i(this.f,1)&&J.i(this.r,1))this.x=0
break
case 6:if(J.i(this.e,7)&&J.i(this.f,8)&&J.i(this.r,3))this.x=5
else{if(x.O(530)){m=x.h(0,530).iu(z)
x=m.length
if(0>=x)return H.a(m,0)
r=m[0]
this.Q=r
if(1>=x)return H.a(m,1)
x=m[1]
this.ch=x
l=r
r=x
x=l}else{this.Q=2
this.ch=2
x=2
r=2}if(J.i(J.d(x,r),1))this.x=8
else if(J.i(this.f,8)&&J.i(this.r,3))this.x=7}break
default:if(J.bW(this.f,8)===0)this.x=8
break}},
static:{uq:function(a){var z=new U.up(P.a5(),null,null,null,1,1,1,-1,!1,1,null,null,!1,null,null,null,null,null,null,null,1,0,0,null,null,null,null,null,null)
z.mU(a)
return z}}},
ur:{
"^":"dz;d,e,f,r,a,b,c"},
lw:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy",
ks:function(a,b){var z,y,x,w,v,u,t,s,r
this.x=b
z=J.a0(b)
this.y=0
y=a.a
this.f=y
this.r=J.a0(y)
this.b=a.d
if(J.i(J.e(this.f,0),0)&&J.i(J.e(this.f,1),1))throw H.l(new U.L("Invalid LZW Data"))
this.jA()
this.c=0
this.d=0
this.e=0
x=this.hA()
w=0
v=0
while(!0){if(x!==257){y=this.y
if(typeof y!=="number")return y.U()
if(typeof z!=="number")return H.b(z)
y=y<z}else y=!1
if(!y)break
if(x===256){this.jA();++v
x=this.hA()
this.cy=0
if(x===257)break
y=this.x
u=this.y
if(typeof u!=="number")return u.j()
this.y=u+1
J.u(y,u,x)
w=x}else{y=this.cx
if(typeof y!=="number")return H.b(y)
if(x<y){this.jx(x)
y=this.cy
if(typeof y!=="number")return y.l()
t=y-1
for(;t>=0;--t){y=this.x
u=this.y
if(typeof u!=="number")return u.j()
this.y=u+1
s=this.z
if(t>=4096)return H.a(s,t)
J.u(y,u,s[t])}y=this.z
u=this.cy
if(typeof u!=="number")return u.l();--u
if(u<0||u>=4096)return H.a(y,u)
this.j0(w,y[u])}else{this.jx(w)
y=this.cy
if(typeof y!=="number")return y.l()
t=y-1
for(;t>=0;--t){y=this.x
u=this.y
if(typeof u!=="number")return u.j()
this.y=u+1
s=this.z
if(t>=4096)return H.a(s,t)
J.u(y,u,s[t])}y=this.x
u=this.y
if(typeof u!=="number")return u.j()
this.y=u+1
s=this.z
r=this.cy
if(typeof r!=="number")return r.l();--r
if(r<0||r>=4096)return H.a(s,r)
J.u(y,u,s[r])
r=this.z
s=this.cy
if(typeof s!=="number")return s.l();--s
if(s<0||s>=4096)return H.a(r,s)
this.j0(w,r[s])}w=x}++v
x=this.hA()}},
j0:function(a,b){var z,y
z=this.Q
y=this.cx
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=b
z=this.ch
if(y>=z.length)return H.a(z,y)
z[y]=a;++y
this.cx=y
if(y===511)this.a=10
else if(y===1023)this.a=11
else if(y===2047)this.a=12},
jx:function(a){var z,y,x,w,v,u,t
this.cy=0
z=this.z
this.cy=1
y=this.Q
if(a>=y.length)return H.a(y,a)
z[0]=y[a]
x=this.ch
if(a>=x.length)return H.a(x,a)
w=x[a]
for(v=1;w!==4098;v=u){u=v+1
this.cy=u
if(w<0||w>=y.length)return H.a(y,w)
t=y[w]
if(v>=4096)return H.a(z,v)
z[v]=t
if(w>=x.length)return H.a(x,w)
w=x[w]}},
hA:function(){var z,y,x
if(J.a7(this.b,this.r))return 257
for(;z=this.e,y=this.a,z<y;){if(J.a7(this.b,this.r))return 257
z=this.d
y=this.f
x=this.b
this.b=J.c(x,1)
x=J.e(y,x)
if(typeof x!=="number")return H.b(x)
this.d=((z<<8>>>0)+x&4294967295)>>>0
this.e+=8}z-=y
this.e=z
z=C.a.by(this.d,z)
y-=9
if(y<0||y>=4)return H.a(C.a8,y)
return z&C.a8[y]},
jA:function(){var z,y
this.Q=new Uint8Array(4096)
z=new Uint32Array(4096)
this.ch=z
C.x.aF(z,0,4096,4098)
for(z=this.Q,y=0;y<256;++y){if(y>=z.length)return H.a(z,y)
z[y]=y}this.a=9
this.cx=258}},
um:{
"^":"d2;b,c,a",
dj:function(a,b){var z,y,x
z=U.aa(new Uint8Array(H.n(a)),!1,null,0)
y=this.jS(z)
if(y==null)return
x=y.r
if(b>=x.length)return H.a(x,b)
return x[b].pQ(z)},
jS:function(a){var z,y,x,w,v,u,t,s,r
x=[]
w=new U.ur(null,null,null,x,0,0,4294967295)
v=a.t()
if(v!==18761&&v!==19789)return
if(v===19789){a.e=!0
w.d=!0}else{a.e=!1
w.d=!1}u=a.t()
w.e=u
if(u!==42)return
t=a.q()
w.f=t
z=U.R(a,null,0)
J.f0(z,t)
for(;t!==0;){y=null
try{y=U.uq(z)
u=y
s=J.C(u)
if(!(s.gN(u)!=null&&s.gM(u)!=null&&u.gcz()!=null&&u.gpz()!=null&&u.e!=null))break}catch(r){H.ap(r)
break}x.push(y)
u=x.length
if(u===1){if(0>=u)return H.a(x,0)
s=x[0]
w.a=s.b
if(0>=u)return H.a(x,0)
w.b=s.c}t=z.q()
if(t!==0)J.f0(z,t)}return x.length>0?w:null}},
jC:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,dZ,e_,e0,cp,bn,i6,i7,i8,eT,eU,eV,e1,rJ,e2,e3,e4,cL,i9,ky,ia,rK,ib,rL,rM",
eO:function(){var z,y,x
z=this.a.bD()
if(J.W(z,1)!==0)return!1
if(typeof z!=="number")return z.D()
if((z>>>1&7)>3)return!1
y=z>>>4&1
if(y===0)return!1
x=this.f
x.a=(z&1)===0
x.b=z>>>1&7
x.c=y
x.d=z>>>5
if(this.a.bD()!==2752925)return!1
y=this.b
y.a=this.a.t()
y.b=this.a.t()
return!0},
cn:function(){if(!this.nR())return
var z=this.b
this.d=U.c_(z.a,z.b,4)
if(!this.o3())return
if(!this.ox())return
return this.d},
nR:function(){var z,y,x,w,v
if(!this.eO())return!1
this.k3=U.uP()
for(z=this.k2,y=0;y<4;++y){x=new Int32Array(2)
w=new Int32Array(2)
z[y]=new U.fY(x,w,new Int32Array(2),null,null)}z=this.r
x=this.b
w=x.a
z.a=w
v=x.b
z.b=v
if(typeof w!=="number")return w.D()
z.c=C.b.p(w,8)>>>6
if(typeof v!=="number")return v.D()
z.d=C.b.p(v,8)>>>6
this.ch=0
this.z=0
this.Q=w
this.cx=v
this.cy=C.b.p(w+15,4)
x=J.c(x.b,15)
if(typeof x!=="number")return x.D()
this.db=C.b.p(x,4)
this.ry=0
x=this.f
this.c=U.mM(this.a.eu(x.d))
w=this.a
x=x.d
w.d=J.c(w.d,x)
z.e=this.c.a7(1)
z.f=this.c.a7(1)
if(!this.oE(this.y,this.k3))return!1
if(!this.ow())return!1
if(!this.oA(this.a))return!1
this.oC()
this.c.a7(1)
this.oB()
return!0},
oE:function(a,b){var z,y,x,w
z=this.c.a7(1)!==0
a.a=z
if(z){a.b=this.c.a7(1)!==0
if(this.c.a7(1)!==0){a.c=this.c.a7(1)!==0
for(z=a.d,y=0;y<4;++y){if(this.c.a7(1)!==0){x=this.c
w=x.a7(7)
x=x.a7(1)===1?-w:w}else x=0
z[y]=x}for(z=a.e,y=0;y<4;++y){if(this.c.a7(1)!==0){x=this.c
w=x.a7(6)
x=x.a7(1)===1?-w:w}else x=0
z[y]=x}}if(a.b)for(y=0;y<3;++y){z=b.a
z[y]=this.c.a7(1)!==0?this.c.a7(8):255}}else a.b=!1
return!0},
ow:function(){var z,y,x,w,v
z=this.x
z.a=this.c.a7(1)!==0
z.b=this.c.a7(6)
z.c=this.c.a7(3)
y=this.c.a7(1)!==0
z.d=y
if(y)if(this.c.a7(1)!==0){for(y=z.e,x=0;x<4;++x)if(this.c.a7(1)!==0){w=this.c
v=w.a7(6)
y[x]=w.a7(1)===1?-v:v}for(y=z.f,x=0;x<4;++x)if(this.c.a7(1)!==0){w=this.c
v=w.a7(6)
y[x]=w.a7(1)===1?-v:v}}if(z.b===0)y=0
else y=z.a===!0?1:2
this.cL=y
return!0},
oA:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=J.h(a.c,a.d)
y=C.a.W(1,this.c.a7(2))
this.fy=y
x=y-1
w=x*3
y=J.y(z)
if(y.U(z,w))return!1
for(v=this.go,u=0,t=0;t<x;++t,w=o){s=J.c(a.d,u)
r=a.a
q=J.e(r,J.c(s,0))
p=J.e(r,J.c(s,1))
if(typeof p!=="number")return p.u()
p=J.be(q,p<<8>>>0)
r=J.e(r,J.c(s,2))
if(typeof r!=="number")return r.u()
o=J.c(w,J.be(p,r<<16>>>0))
if(J.F(o,z))o=z
r=J.h(o,w)
s=J.c(J.c(a.b,w),0)
q=a.a
p=a.e
r=new U.eJ(new U.ak(q,s,r==null?J.a0(q):J.c(s,r),s,p),null,null,null,!1)
r.b=254
r.c=0
r.d=-8
if(t>=8)return H.a(v,t)
v[t]=r
u+=3}y=U.mM(a.dz(y.l(z,w),J.c(J.h(a.d,a.b),w)))
if(x<0||x>=8)return H.a(v,x)
v[x]=y
return J.K(w,z)&&!0},
oC:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.c.a7(7)
y=this.c.a7(1)!==0?this.c.ep(4):0
x=this.c.a7(1)!==0?this.c.ep(4):0
w=this.c.a7(1)!==0?this.c.ep(4):0
v=this.c.a7(1)!==0?this.c.ep(4):0
u=this.c.a7(1)!==0?this.c.ep(4):0
t=this.y
for(s=this.k2,r=t.d,q=0;q<4;++q){if(t.a){p=r[q]
if(!t.c)p+=z}else{if(q>0){s[q]=s[0]
continue}p=z}o=s[q]
n=o.a
m=p+y
if(m<0)m=0
else if(m>127)m=127
if(m>=128)return H.a(C.C,m)
n[0]=C.C[m]
if(p<0)m=0
else m=p>127?127:p
if(m>=128)return H.a(C.D,m)
n[1]=C.D[m]
m=o.b
n=p+x
if(n<0)n=0
else if(n>127)n=127
if(n>=128)return H.a(C.C,n)
m[0]=C.C[n]*2
n=p+w
if(n<0)n=0
else if(n>127)n=127
if(n>=128)return H.a(C.D,n)
m[1]=C.D[n]*101581>>>16
if(m[1]<8)m[1]=8
n=o.c
m=p+v
if(m<0)m=0
else if(m>117)m=117
if(m>=128)return H.a(C.C,m)
n[0]=C.C[m]
m=p+u
if(m<0)l=0
else l=m>127?127:m
if(l>=128)return H.a(C.D,l)
n[1]=C.D[l]
o.d=m}},
oB:function(){var z,y,x,w,v,u,t
z=this.k3
for(y=0;y<4;++y)for(x=0;x<8;++x)for(w=0;w<3;++w)for(v=0;v<11;++v){u=this.c.aq(C.cL[y][x][w][v])!==0?this.c.a7(8):C.dc[y][x][w][v]
z.b[y][x].a[w][v]=u}t=this.c.a7(1)!==0
this.k4=t
if(t)this.r1=this.c.a7(8)},
oG:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.cL
if(typeof z!=="number")return z.a0()
if(z>0){y=this.x
for(z=y.e[0],x=y.f[0],w=this.y,v=w.e,u=0;u<4;++u){if(w.a){t=v[u]
if(!w.c){s=y.b
if(typeof s!=="number")return H.b(s)
t+=s}}else t=y.b
for(r=0;r<=1;++r){q=this.i9[u][r]
if(y.d===!0){if(typeof t!=="number")return t.j()
p=t+z
if(r!==0)p+=x}else p=t
if(typeof p!=="number")return p.U()
if(p<0)p=0
else if(p>63)p=63
if(p>0){s=y.c
if(typeof s!=="number")return s.a0()
if(s>0){o=s>4?C.a.p(p,2):C.a.p(p,1)
n=9-s
if(o>n)o=n}else o=p
if(o<1)o=1
q.b=o
q.a=2*p+o
if(p>=40)s=2
else s=p>=15?1:0
q.d=s}else q.a=0
q.c=r!==0}}}},
o3:function(){var z,y,x,w,v,u,t,s,r,q
z=this.b
y=z.db
if(y!=null)this.ia=y
y=H.p(Array(4),[[P.E,U.fQ]])
this.i9=y
for(x=0;x<4;++x)y[x]=[new U.fQ(0,0,!1,0),new U.fQ(0,0,!1,0)]
y=this.cy
if(typeof y!=="number")return H.b(y)
this.x1=H.p(Array(y),[U.mP])
x=0
while(!0){y=this.cy
if(typeof y!=="number")return H.b(y)
if(!(x<y))break
y=this.x1
w=new Uint8Array(16)
v=new Uint8Array(8)
u=new Uint8Array(8)
if(x>=y.length)return H.a(y,x)
y[x]=new U.mP(w,v,u);++x}this.y2=new Uint8Array(H.k(832))
y=this.cy
if(typeof y!=="number")return H.b(y)
this.r2=new Uint8Array(H.k(4*y))
y=this.cy
if(typeof y!=="number")return H.b(y)
w=16*y
this.cp=w
y=8*y
this.bn=y
v=this.cL
if(v>>>0!==v||v>=3)return H.a(C.y,v)
t=C.y[v]
s=t*w
r=(t/2|0)*y
this.dZ=U.aa(new Uint8Array(H.k(16*w+s)),!1,null,s)
w=this.bn
if(typeof w!=="number")return H.b(w)
this.e_=U.aa(new Uint8Array(H.k(8*w+r)),!1,null,r)
w=this.bn
if(typeof w!=="number")return H.b(w)
this.e0=U.aa(new Uint8Array(H.k(8*w+r)),!1,null,r)
this.i6=U.aa(new Uint8Array(H.k(z.a)),!1,null,0)
z=J.c(z.a,1)
if(typeof z!=="number")return z.D()
z=C.b.p(z,1)
this.i7=U.aa(new Uint8Array(H.k(z)),!1,null,0)
this.i8=U.aa(new Uint8Array(H.k(z)),!1,null,0)
z=this.cL
if(z>>>0!==z||z>=3)return H.a(C.y,z)
q=C.y[z]
if(z===2){this.dx=0
this.dy=0}else{z=this.z
if(typeof z!=="number")return z.l()
z=C.a.al(z-q,16)
this.dx=z
y=this.ch
if(typeof y!=="number")return y.l()
y=C.a.al(y-q,16)
this.dy=y
if(z<0)this.dx=0
if(y<0)this.dy=0}this.fx=J.ac(J.c(J.c(this.cx,15),q),16)
z=J.ac(J.c(J.c(this.Q,15),q),16)
this.fr=z
if(J.F(z,this.cy))this.fr=this.cy
if(J.F(this.fx,this.db))this.fx=this.db
z=this.cy
if(typeof z!=="number")return z.j()
this.x2=H.p(Array(z+1),[U.jH])
z=this.cy
if(typeof z!=="number")return H.b(z)
this.e4=H.p(Array(z),[U.mO])
z=this.cy
if(typeof z!=="number")return H.b(z)
this.y1=H.p(Array(z),[U.fQ])
x=0
while(!0){z=this.cy
if(typeof z!=="number")return H.b(z)
if(!(x<z))break
z=this.x2
if(x>=z.length)return H.a(z,x)
z[x]=new U.jH(0,0)
z=this.e4
y=new Int16Array(384)
w=new Uint8Array(16)
if(x>=z.length)return H.a(z,x)
z[x]=new U.mO(y,null,w,null,null,null,null);++x}y=this.x2
if(z>=y.length)return H.a(y,z)
y[z]=new U.jH(0,0)
this.oG()
U.uJ()
this.e=new U.uI()
return!0},
ox:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
this.e3=0
z=this.rx
y=this.y
x=this.go
w=0
while(!0){v=this.fx
if(typeof v!=="number")return H.b(v)
if(!(w<v))break
v=this.fy
if(typeof v!=="number")return v.l()
v=(w&v-1)>>>0
if(v<0||v>=8)return H.a(x,v)
u=x[v]
while(!0){w=this.e2
v=this.cy
if(typeof v!=="number")return H.b(v)
if(!(w<v))break
v=this.x2
t=v.length
if(0>=t)return H.a(v,0)
s=v[0]
r=1+w
if(r>=t)return H.a(v,r)
q=v[r]
r=this.e4
if(w>=r.length)return H.a(r,w)
p=r[w]
if(y.b){w=this.c.aq(this.k3.a[0])
v=this.c
t=this.k3
this.ry=w===0?v.aq(t.a[1]):2+v.aq(t.a[2])}o=this.k4===!0&&this.c.aq(this.r1)!==0
this.oy()
if(!o)o=this.oD(q,u)
else{q.a=0
s.a=0
if(p.b!==!0){q.b=0
s.b=0}p.e=0
p.f=0}w=this.cL
if(typeof w!=="number")return w.a0()
if(w>0){w=this.y1
v=this.e2
t=this.i9
r=this.ry
t.length
if(r>>>0!==r||r>=4)return H.a(t,r)
r=t[r]
t=r[p.b===!0?1:0]
if(v>=w.length)return H.a(w,v)
w[v]=t
n=w[v]
n.c=n.c||!o}++this.e2}w=this.x2
if(0>=w.length)return H.a(w,0)
s=w[0]
s.a=0
s.b=0
C.j.aF(z,0,4,0)
this.e2=0
this.p9()
w=this.cL
if(typeof w!=="number")return w.a0()
if(w>0){w=this.e3
v=this.dy
if(typeof v!=="number")return H.b(v)
if(w>=v){v=this.fx
if(typeof v!=="number")return H.b(v)
v=w<=v
m=v}else m=!1}else m=!1
if(!this.nP(m))return!1
w=++this.e3}return!0},
p9:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=this.e3
y=U.aa(this.y2,!1,null,40)
x=U.aa(this.y2,!1,null,584)
w=U.aa(this.y2,!1,null,600)
v=z>0
u=0
while(!0){t=this.cy
if(typeof t!=="number")return H.b(t)
if(!(u<t))break
t=this.e4
if(u>=t.length)return H.a(t,u)
s=t[u]
if(u>0){for(r=-1;r<16;++r){t=r*32
y.bB(t-4,4,y,t+12)}for(r=-1;r<8;++r){t=r*32
q=t-4
t+=4
x.bB(q,4,x,t)
w.bB(q,4,w,t)}}else{for(r=0;r<16;++r)J.u(y.a,J.c(y.d,r*32-1),129)
for(r=0;r<8;++r){t=r*32-1
J.u(x.a,J.c(x.d,t),129)
J.u(w.a,J.c(w.d,t),129)}if(v){J.u(w.a,J.c(w.d,-33),129)
J.u(x.a,J.c(x.d,-33),129)
J.u(y.a,J.c(y.d,-33),129)}}t=this.x1
if(u>=t.length)return H.a(t,u)
p=t[u]
o=s.a
n=s.e
if(v){y.cT(-32,16,p.a)
x.cT(-32,8,p.b)
w.cT(-32,8,p.c)}else if(u===0){J.bY(y.a,J.c(y.d,-33),J.c(J.c(y.d,-33),21),127)
J.bY(x.a,J.c(x.d,-33),J.c(J.c(x.d,-33),9),127)
J.bY(w.a,J.c(w.d,-33),J.c(J.c(w.d,-33),9),127)}if(s.b===!0){m=U.R(y,null,-16)
l=m.fa()
if(v){t=this.cy
if(typeof t!=="number")return t.l()
if(u>=t-1){t=J.e(p.a,15)
J.bY(m.a,J.c(m.d,0),J.c(J.c(m.d,0),4),t)}else{t=this.x1
q=u+1
if(q>=t.length)return H.a(t,q)
m.cT(0,4,t[q].a)}}t=l.length
if(0>=t)return H.a(l,0)
k=l[0]
if(96>=t)return H.a(l,96)
l[96]=k
l[64]=k
l[32]=k
t=s.c
j=0
while(j<16){i=U.R(y,null,C.ak[j])
q=t[j]
if(q>=10)return H.a(C.av,q)
C.av[q].$1(i)
q=j*16
this.jl(n,new U.ak(o,q,384,q,!1),i);++j
if(typeof n!=="number")return n.u()
n=(n<<2&4294967295)>>>0}}else{h=U.mQ(u,z,s.c[0])
if(h>>>0!==h||h>=7)return H.a(C.ab,h)
C.ab[h].$1(y)
if(n!==0){j=0
while(j<16){i=U.R(y,null,C.ak[j])
t=j*16
this.jl(n,new U.ak(o,t,384,t,!1),i);++j
if(typeof n!=="number")return n.u()
n=(n<<2&4294967295)>>>0}}}g=s.f
f=U.mQ(u,z,s.d)
if(f>>>0!==f||f>=7)return H.a(C.W,f)
C.W[f].$1(x)
C.W[f].$1(w)
e=new U.ak(o,256,384,256,!1)
if(typeof g!=="number")return g.T()
if((g&255)!==0){t=this.e
if((g&170)!==0){t.cv(e,x)
t.cv(U.R(e,null,16),U.R(x,null,4))
q=U.R(e,null,32)
d=U.R(x,null,128)
t.cv(q,d)
t.cv(U.R(q,null,16),U.R(d,null,4))}else t.lc(e,x)}c=new U.ak(o,320,384,320,!1)
t=g>>>8
if((t&255)!==0){q=this.e
if((t&170)!==0){q.cv(c,w)
q.cv(U.R(c,null,16),U.R(w,null,4))
t=U.R(c,null,32)
d=U.R(w,null,128)
q.cv(t,d)
q.cv(U.R(t,null,16),U.R(d,null,4))}else q.lc(c,w)}t=this.db
if(typeof t!=="number")return t.l()
if(z<t-1){J.hn(p.a,0,16,y.aD(),480)
C.j.aH(p.b,0,8,x.aD(),224)
C.j.aH(p.c,0,8,w.aD(),224)}b=u*16
a=u*8
for(r=0;r<16;++r){t=this.cp
if(typeof t!=="number")return H.b(t)
this.dZ.bB(b+r*t,16,y,r*32)}for(r=0;r<8;++r){t=this.bn
if(typeof t!=="number")return H.b(t)
q=r*32
this.e_.bB(a+r*t,8,x,q)
t=this.bn
if(typeof t!=="number")return H.b(t)
this.e0.bB(a+r*t,8,w,q)}++u}},
jl:function(a,b,c){var z,y,x,w,v,u
if(typeof a!=="number")return a.D()
switch(a>>>30){case 3:this.e.cv(b,c)
break
case 2:this.e.toString
z=J.c(J.e(b.a,J.c(b.d,0)),4)
y=J.a_(J.G(J.d(J.e(b.a,J.c(b.d,4)),35468),65536))
x=J.a_(J.G(J.d(J.e(b.a,J.c(b.d,4)),85627),65536))
w=J.a_(J.G(J.d(J.e(b.a,J.c(b.d,1)),35468),65536))
v=J.a_(J.G(J.d(J.e(b.a,J.c(b.d,1)),85627),65536))
u=J.w(z)
U.fT(c,0,u.j(z,x),v,w)
U.fT(c,1,u.j(z,y),v,w)
U.fT(c,2,u.l(z,y),v,w)
U.fT(c,3,u.l(z,x),v,w)
break
case 1:this.e.fb(b,c)
break
default:break}},
nG:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.cp
y=this.y1
if(a<0||a>=y.length)return H.a(y,a)
x=y[a]
w=U.R(this.dZ,null,a*16)
v=x.b
u=x.a
if(u===0)return
if(this.cL===1){if(a>0)this.e.iL(w,z,u+4)
if(x.c)this.e.lC(w,z,u)
if(b>0)this.e.iM(w,z,u+4)
if(x.c)this.e.lD(w,z,u)}else{t=this.bn
y=a*8
s=U.R(this.e_,null,y)
r=U.R(this.e0,null,y)
q=x.d
if(a>0){y=u+4
this.e.dG(w,1,z,16,y,v,q)
p=this.e
p.dG(s,1,t,8,y,v,q)
p.dG(r,1,t,8,y,v,q)}if(x.c){this.e.qb(w,z,u,v,q)
y=this.e
y.toString
o=U.R(s,null,4)
n=U.R(r,null,4)
y.dF(o,1,t,8,u,v,q)
y.dF(n,1,t,8,u,v,q)}if(b>0){y=u+4
this.e.dG(w,z,1,16,y,v,q)
p=this.e
p.dG(s,t,1,8,y,v,q)
p.dG(r,t,1,8,y,v,q)}if(x.c){this.e.rj(w,z,u,v,q)
y=this.e
y.toString
if(typeof t!=="number")return H.b(t)
p=4*t
o=U.R(s,null,p)
n=U.R(r,null,p)
y.dF(o,t,1,8,u,v,q)
y.dF(n,t,1,8,u,v,q)}}},
nN:function(){var z,y
z=this.dx
while(!0){y=this.fr
if(typeof z!=="number")return z.U()
if(typeof y!=="number")return H.b(y)
if(!(z<y))break
this.nG(z,this.e3);++z}},
nP:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=this.cL
if(z>>>0!==z||z>=3)return H.a(C.y,z)
y=C.y[z]
z=this.cp
if(typeof z!=="number")return H.b(z)
x=y*z
z=this.bn
if(typeof z!=="number")return H.b(z)
w=(y/2|0)*z
z=-x
v=U.R(this.dZ,null,z)
u=-w
t=U.R(this.e_,null,u)
s=U.R(this.e0,null,u)
r=this.e3
q=J.h(this.fx,1)
if(typeof q!=="number")return H.b(q)
p=r*16
o=(r+1)*16
if(a)this.nN()
if(this.id);if(r!==0){p-=y
this.eT=U.R(v,null,0)
this.eU=U.R(t,null,0)
this.eV=U.R(s,null,0)}else{this.eT=U.R(this.dZ,null,0)
this.eU=U.R(this.e_,null,0)
this.eV=U.R(this.e0,null,0)}q=!(r>=q)
if(q)o-=y
n=this.cx
if(typeof n!=="number")return H.b(n)
if(o>n)o=n
this.e1=null
if(this.ia!=null&&p<o){n=this.nC(p,o-p)
this.e1=n
if(n==null)return!1}n=this.ch
if(typeof n!=="number")return H.b(n)
if(p<n){m=n-p
l=this.eT
k=l.d
j=this.cp
if(typeof j!=="number")return j.i()
l.d=J.c(k,j*m)
j=this.eU
k=j.d
l=this.bn
i=C.a.p(m,1)
if(typeof l!=="number")return l.i()
j.d=J.c(k,l*i)
l=this.eV
k=l.d
j=this.bn
if(typeof j!=="number")return j.i()
l.d=J.c(k,j*i)
l=this.e1
if(l!=null)l.d=J.c(l.d,J.d(this.b.a,m))
p=n}if(p<o){n=this.eT
n.d=J.c(n.d,this.z)
n=this.eU
l=n.d
k=this.z
if(typeof k!=="number")return k.D()
n.d=J.c(l,k>>>1)
k=this.eV
l=k.d
n=this.z
if(typeof n!=="number")return n.D()
k.d=J.c(l,n>>>1)
n=this.e1
if(n!=null)n.d=J.c(n.d,this.z)
n=this.ch
if(typeof n!=="number")return H.b(n)
this.oK(p-n,J.h(this.Q,this.z),o-p)}if(q){q=this.dZ
n=this.cp
if(typeof n!=="number")return H.b(n)
q.bB(z,x,v,16*n)
n=this.e_
z=this.bn
if(typeof z!=="number")return H.b(z)
n.bB(u,w,t,8*z)
z=this.e0
n=this.bn
if(typeof n!=="number")return H.b(n)
z.bB(u,w,s,8*n)}return!0},
oK:function(a,b,c){if(J.aG(b,0)||J.aG(c,0))return!1
this.nI(a,b,c)
this.nH(a,b,c)
return!0},
fI:function(a,b,c,d,a0,a1,a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=new U.uQ()
y=J.h(a4,1)
if(typeof y!=="number")return y.D()
y=C.b.p(y,1)
x=z.$2(J.e(c.a,J.c(c.d,0)),J.e(d.a,J.c(d.d,0)))
w=z.$2(J.e(a0.a,J.c(a0.d,0)),J.e(a1.a,J.c(a1.d,0)))
if(typeof x!=="number")return H.b(x)
if(typeof w!=="number")return H.b(w)
v=C.b.p(3*x+w+131074,2)
u=J.e(a.a,J.c(a.d,0))
t=v&255
s=v>>>16
if(typeof u!=="number")return H.b(u)
u=19077*u
r=u+26149*s+-3644112
if((r&-4194304)>>>0===0)q=C.b.p(r,14)
else q=r<0?0:255
J.u(a2.a,J.c(a2.d,0),q)
s=u-6419*t-13320*s+2229552
if((s&-4194304)>>>0===0)q=C.b.p(s,14)
else q=s<0?0:255
J.u(a2.a,J.c(a2.d,1),q)
u=u+33050*t+-4527440
if((u&-4194304)>>>0===0)q=C.b.p(u,14)
else q=u<0?0:255
J.u(a2.a,J.c(a2.d,2),q)
J.u(a2.a,J.c(a2.d,3),255)
u=b!=null
if(u){v=C.b.p(3*w+x+131074,2)
t=J.e(b.a,J.c(b.d,0))
s=v&255
r=v>>>16
if(typeof t!=="number")return H.b(t)
t=19077*t
p=t+26149*r+-3644112
if((p&-4194304)>>>0===0)q=C.b.p(p,14)
else q=p<0?0:255
J.u(a3.a,J.c(a3.d,0),q)
r=t-6419*s-13320*r+2229552
if((r&-4194304)>>>0===0)q=C.b.p(r,14)
else q=r<0?0:255
J.u(a3.a,J.c(a3.d,1),q)
t=t+33050*s+-4527440
if((t&-4194304)>>>0===0)q=C.b.p(t,14)
else q=t<0?0:255
J.u(a3.a,J.c(a3.d,2),q)
J.u(a3.a,J.c(a3.d,3),255)}for(o=1;o<=y;++o,w=m,x=n){n=z.$2(J.e(c.a,J.c(c.d,o)),J.e(d.a,J.c(d.d,o)))
m=z.$2(J.e(a0.a,J.c(a0.d,o)),J.e(a1.a,J.c(a1.d,o)))
t=J.w(x)
l=J.c(J.c(J.c(t.j(x,n),w),m),524296)
s=J.c(n,w)
if(typeof s!=="number")return H.b(s)
r=J.w(l)
s=r.j(l,2*s)
if(typeof s!=="number")return s.D()
s=C.b.p(s,3)
t=t.j(x,m)
if(typeof t!=="number")return H.b(t)
t=r.j(l,2*t)
if(typeof t!=="number")return t.D()
t=C.b.p(t,3)
if(typeof x!=="number")return H.b(x)
v=C.b.p(s+x,1)
if(typeof n!=="number")return H.b(n)
k=C.b.p(t+n,1)
r=2*o
p=r-1
j=J.e(a.a,J.c(a.d,p))
i=v&255
h=v>>>16
g=p*4
f=U.R(a2,null,g)
if(typeof j!=="number")return H.b(j)
j=19077*j
e=j+26149*h+-3644112
if((e&-4194304)>>>0===0)q=C.b.p(e,14)
else q=e<0?0:255
J.u(f.a,J.c(f.d,0),q)
h=j-6419*i-13320*h+2229552
if((h&-4194304)>>>0===0)q=C.b.p(h,14)
else q=h<0?0:255
J.u(f.a,J.c(f.d,1),q)
j=j+33050*i+-4527440
if((j&-4194304)>>>0===0)q=C.b.p(j,14)
else q=j<0?0:255
J.u(f.a,J.c(f.d,2),q)
J.u(f.a,J.c(f.d,3),255)
j=r-0
i=J.e(a.a,J.c(a.d,j))
h=k&255
f=k>>>16
j=U.R(a2,null,j*4)
if(typeof i!=="number")return H.b(i)
i=19077*i
e=i+26149*f+-3644112
if((e&-4194304)>>>0===0)q=C.b.p(e,14)
else q=e<0?0:255
J.u(j.a,J.c(j.d,0),q)
f=i-6419*h-13320*f+2229552
if((f&-4194304)>>>0===0)q=C.b.p(f,14)
else q=f<0?0:255
J.u(j.a,J.c(j.d,1),q)
i=i+33050*h+-4527440
if((i&-4194304)>>>0===0)q=C.b.p(i,14)
else q=i<0?0:255
J.u(j.a,J.c(j.d,2),q)
J.u(j.a,J.c(j.d,3),255)
if(u){if(typeof w!=="number")return H.b(w)
v=C.b.p(t+w,1)
if(typeof m!=="number")return H.b(m)
k=C.b.p(s+m,1)
t=J.e(b.a,J.c(b.d,p))
s=v&255
p=v>>>16
g=U.R(a3,null,g)
if(typeof t!=="number")return H.b(t)
t=19077*t
j=t+26149*p+-3644112
if((j&-4194304)>>>0===0)q=C.b.p(j,14)
else q=j<0?0:255
J.u(g.a,J.c(g.d,0),q)
p=t-6419*s-13320*p+2229552
if((p&-4194304)>>>0===0)q=C.b.p(p,14)
else q=p<0?0:255
J.u(g.a,J.c(g.d,1),q)
t=t+33050*s+-4527440
if((t&-4194304)>>>0===0)q=C.b.p(t,14)
else q=t<0?0:255
J.u(g.a,J.c(g.d,2),q)
J.u(g.a,J.c(g.d,3),255)
t=J.e(b.a,J.c(b.d,r))
s=k&255
p=k>>>16
r=U.R(a3,null,r*4)
if(typeof t!=="number")return H.b(t)
t=19077*t
j=t+26149*p+-3644112
if((j&-4194304)>>>0===0)q=C.b.p(j,14)
else q=j<0?0:255
J.u(r.a,J.c(r.d,0),q)
p=t-6419*s-13320*p+2229552
if((p&-4194304)>>>0===0)q=C.b.p(p,14)
else q=p<0?0:255
J.u(r.a,J.c(r.d,1),q)
t=t+33050*s+-4527440
if((t&-4194304)>>>0===0)q=C.b.p(t,14)
else q=t<0?0:255
J.u(r.a,J.c(r.d,2),q)
J.u(r.a,J.c(r.d,3),255)}}if(typeof a4!=="number")return a4.T()
if((a4&1)===0){if(typeof x!=="number")return H.b(x)
if(typeof w!=="number")return H.b(w)
v=C.b.p(3*x+w+131074,2)
z=a4-1
y=J.e(a.a,J.c(a.d,z))
t=v&255
s=v>>>16
r=z*4
p=U.R(a2,null,r)
if(typeof y!=="number")return H.b(y)
y=19077*y
j=y+26149*s+-3644112
if((j&-4194304)>>>0===0)q=C.b.p(j,14)
else q=j<0?0:255
J.u(p.a,J.c(p.d,0),q)
s=y-6419*t-13320*s+2229552
if((s&-4194304)>>>0===0)q=C.b.p(s,14)
else q=s<0?0:255
J.u(p.a,J.c(p.d,1),q)
y=y+33050*t+-4527440
if((y&-4194304)>>>0===0)q=C.b.p(y,14)
else q=y<0?0:255
J.u(p.a,J.c(p.d,2),q)
J.u(p.a,J.c(p.d,3),255)
if(u){v=C.b.p(3*w+x+131074,2)
z=J.e(b.a,J.c(b.d,z))
y=v&255
u=v>>>16
r=U.R(a3,null,r)
if(typeof z!=="number")return H.b(z)
z=19077*z
t=z+26149*u+-3644112
if((t&-4194304)>>>0===0)q=C.b.p(t,14)
else q=t<0?0:255
J.u(r.a,J.c(r.d,0),q)
u=z-6419*y-13320*u+2229552
if((u&-4194304)>>>0===0)q=C.b.p(u,14)
else q=u<0?0:255
J.u(r.a,J.c(r.d,1),q)
z=z+33050*y+-4527440
if((z&-4194304)>>>0===0)q=C.b.p(z,14)
else q=z<0?0:255
J.u(r.a,J.c(r.d,2),q)
J.u(r.a,J.c(r.d,3),255)}}},
nH:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
if(this.e1==null)return
z=this.b
y=J.d(z.a,4)
x=U.R(this.e1,null,0)
if(a===0){w=J.h(c,1)
v=a}else{v=a-1
x.d=J.h(x.d,z.a)
w=c}u=this.d.x.buffer
u=(u&&C.e).ad(u,0,null)
if(typeof y!=="number")return H.b(y)
t=U.aa(u,!1,null,v*y+3)
u=this.ch
if(typeof u!=="number")return u.j()
if(typeof c!=="number")return H.b(c)
s=this.cx
if(u+a+c===s)w=J.h(J.h(s,u),v)
if(typeof w!=="number")return H.b(w)
r=0
for(;r<w;++r){if(typeof b!=="number")return H.b(b)
q=0
for(;q<b;++q){u=J.W(J.e(x.a,J.c(x.d,q)),255)
J.u(t.a,J.c(t.d,4*q),u)}x.d=J.c(x.d,z.a)
t.d=J.c(t.d,y)}},
nI:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.d.x.buffer
z=(z&&C.e).ad(z,0,null)
y=this.b
x=y.a
if(typeof x!=="number")return H.b(x)
w=U.aa(z,!1,null,a*x*4)
v=U.R(this.eT,null,0)
u=U.R(this.eU,null,0)
t=U.R(this.eV,null,0)
if(typeof c!=="number")return H.b(c)
s=a+c
x=J.c(b,1)
if(typeof x!=="number")return x.D()
x=C.b.p(x,1)
r=J.d(y.a,4)
q=U.R(this.i7,null,0)
p=U.R(this.i8,null,0)
y.ch
if(a===0){this.fI(v,null,u,t,u,t,w,null,b)
o=c}else{this.fI(this.i6,v,q,p,u,t,U.R(w,null,J.M(r)),w,b)
o=c+1}q.a=u.a
p.a=t.a
for(n=a;n+=2,n<s;){q.d=u.d
p.d=t.d
u.d=J.c(u.d,this.bn)
t.d=J.c(t.d,this.bn)
z=w.d
if(typeof r!=="number")return H.b(r)
w.d=J.c(z,2*r)
z=v.d
y=this.cp
if(typeof y!=="number")return H.b(y)
v.d=J.c(z,2*y)
y=this.cp
if(typeof y!=="number")return y.a2()
this.fI(U.R(v,null,-y),v,q,p,u,t,U.R(w,null,-r),w,b)}v.d=J.c(v.d,this.cp)
z=this.ch
if(typeof z!=="number")return z.j()
y=this.cx
if(typeof y!=="number")return H.b(y)
if(z+s<y){this.i6.cT(0,b,v)
this.i7.cT(0,x,u)
this.i8.cT(0,x,t);--o}else if((s&1)===0)this.fI(v,null,u,t,u,t,U.R(w,null,r),null,b)
return o},
nC:function(a,b){var z,y,x,w,v,u,t,s
z=this.b
y=z.a
x=z.b
if(a>=0)if(!J.aG(b,0)){if(typeof b!=="number")return H.b(b)
if(typeof x!=="number")return H.b(x)
z=a+b>x}else z=!0
else z=!0
if(z)return
if(a===0){this.ib=new Uint8Array(H.k(J.d(y,x)))
z=this.ia
w=new U.uR(z,y,x,0,0,0,1,!1,null,!1)
v=z.a
u=z.d
z.d=J.c(u,1)
t=J.e(v,u)
w.d=J.y(t).T(t,3)
if(typeof t!=="number")return t.D()
w.e=C.b.p(t,2)&3
w.f=C.b.p(t,4)&3
w.r=C.b.p(t,6)&3
if(w.gkJ()){z=w.d
if(z===0){s=J.d(w.b,w.c)
z=w.a
if(J.K(J.h(z.c,z.d),s))w.r=1}else if(z===1){if(!w.nv())w.r=1}else w.r=1}this.ky=w}z=this.ky
if(!z.x)if(!z.pR(a,b,this.ib))return
z=this.ib
if(typeof y!=="number")return H.b(y)
return U.aa(z,!1,null,a*y)},
oD:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.k3.b
y=this.k2
x=this.ry
if(x>>>0!==x||x>=4)return H.a(y,x)
w=y[x]
x=this.e4
y=this.e2
if(y>=x.length)return H.a(x,y)
v=x[y]
u=U.aa(v.a,!1,null,0)
y=this.x2
if(0>=y.length)return H.a(y,0)
t=y[0]
u.qC(0,J.h(u.c,u.d),0)
if(v.b!==!0){s=U.aa(new Int16Array(H.k(16)),!1,null,0)
y=a.b
x=t.b
r=this.hy(b,z[1],y+x,w.b,0,s)
y=r>0?1:0
t.b=y
a.b=y
if(r>1)this.pn(s,u)
else{y=J.c(J.e(s.a,J.c(s.d,0)),3)
if(typeof y!=="number")return y.D()
y=C.b.p(y,3)
for(q=0;q<256;q+=16)J.u(u.a,J.c(u.d,q),y)}p=z[0]
o=1}else{p=z[3]
o=0}n=a.a&15
m=t.a&15
for(l=0,k=0;k<4;++k){j=m&1
for(i=0,h=0;h<4;++h,i=g){r=this.hy(b,p,j+(n&1),w.a,o,u)
j=r>o?1:0
n=n>>>1|j<<7
y=!J.i(J.e(u.a,J.c(u.d,0)),0)?1:0
if(r>3)y=3
else if(r>1)y=2
g=i<<2|y
u.d=J.c(u.d,16)}n=n>>>4
m=m>>>1|j<<7
l=(l<<8|i)>>>0}f=m>>>4
for(e=n,d=0,c=0;c<4;c+=2){y=4+c
n=C.a.c5(a.a,y)
m=C.a.c5(t.a,y)
for(i=0,k=0;k<2;++k){j=m&1
for(h=0;h<2;++h,i=g){r=this.hy(b,z[2],j+(n&1),w.c,0,u)
j=r>0?1:0
n=n>>>1|j<<3
y=!J.i(J.e(u.a,J.c(u.d,0)),0)?1:0
if(r>3)y=3
else if(r>1)y=2
g=(i<<2|y)>>>0
u.d=J.c(u.d,16)}n=n>>>2
m=m>>>1|j<<5}d=(d|C.a.W(i,4*c))>>>0
e=(e|C.a.W(n<<4>>>0,c))>>>0
f=(f|C.a.W(m&240,c))>>>0}a.a=e
t.a=f
v.e=l
v.f=d
v.r=(d&43690)!==0?0:w.e
return(l|d)>>>0===0},
pn:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=H.k(16)
y=new Int32Array(z)
for(x=0;x<4;++x){w=12+x
v=J.c(J.e(a.a,J.c(a.d,x)),J.e(a.a,J.c(a.d,w)))
u=4+x
t=8+x
s=J.c(J.e(a.a,J.c(a.d,u)),J.e(a.a,J.c(a.d,t)))
r=J.h(J.e(a.a,J.c(a.d,u)),J.e(a.a,J.c(a.d,t)))
q=J.h(J.e(a.a,J.c(a.d,x)),J.e(a.a,J.c(a.d,w)))
p=J.w(v)
o=p.j(v,s)
if(x>=z)return H.a(y,x)
y[x]=o
p=p.l(v,s)
if(t>=z)return H.a(y,t)
y[t]=p
p=J.w(q)
t=p.j(q,r)
if(u>=z)return H.a(y,u)
y[u]=t
p=p.l(q,r)
if(w>=z)return H.a(y,w)
y[w]=p}for(n=0,x=0;x<4;++x){w=x*4
if(w>=z)return H.a(y,w)
m=J.c(y[w],3)
u=3+w
if(u>=z)return H.a(y,u)
t=J.w(m)
v=t.j(m,y[u])
p=1+w
if(p>=z)return H.a(y,p)
o=y[p]
w=2+w
if(w>=z)return H.a(y,w)
s=J.c(o,y[w])
r=J.h(y[p],y[w])
q=t.l(m,y[u])
u=J.w(v)
t=u.j(v,s)
if(typeof t!=="number")return t.D()
t=C.b.p(t,3)
J.u(b.a,J.c(b.d,n),t)
t=J.w(q)
w=t.j(q,r)
if(typeof w!=="number")return w.D()
w=C.b.p(w,3)
J.u(b.a,J.c(b.d,n+16),w)
u=u.l(v,s)
if(typeof u!=="number")return u.D()
u=C.b.p(u,3)
J.u(b.a,J.c(b.d,n+32),u)
t=t.l(q,r)
if(typeof t!=="number")return t.D()
t=C.b.p(t,3)
J.u(b.a,J.c(b.d,n+48),t)
n+=64}},
nS:function(a,b){var z,y,x,w,v,u,t
if(a.aq(b[3])===0)z=a.aq(b[4])===0?2:3+a.aq(b[5])
else if(a.aq(b[6])===0)z=a.aq(b[7])===0?5+a.aq(159):7+2*a.aq(165)+a.aq(145)
else{y=a.aq(b[8])
x=9+y
if(x>=11)return H.a(b,x)
w=2*y+a.aq(b[x])
if(w>=4)return H.a(C.au,w)
v=C.au[w]
for(u=v.length,z=0,t=0;t<u;++t)z+=z+a.aq(v[t])
z+=3+C.a.W(8,w)}return z},
hy:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r
b.length
if(e>=8)return H.a(b,e)
z=b[e].a
if(c>=3)return H.a(z,c)
y=z[c]
for(;e<16;e=x){if(a.aq(y[0])===0)return e
for(;a.aq(y[1])===0;){++e
if(e<0||e>=17)return H.a(C.O,e)
z=C.O[e]
if(z>=8)return H.a(b,z)
y=b[z].a[0]
if(e===16)return 16}x=e+1
if(x<0||x>=17)return H.a(C.O,x)
z=C.O[x]
if(z>=8)return H.a(b,z)
w=b[z].a
if(a.aq(y[2])===0){y=w[1]
v=1}else{v=this.nS(a,y)
y=w[2]}if(e<0||e>=16)return H.a(C.al,e)
z=C.al[e]
u=a.j4(C.a.p(a.b,1))
t=a.b
if(t<0||t>=128)return H.a(C.N,t)
s=C.N[t]
a.b=C.ax[t]
a.d-=s
t=u!==0?-v:v
r=d[e>0?1:0]
J.u(f.a,J.c(f.d,z),t*r)}return 16},
oy:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.e2
y=4*z
x=this.r2
w=this.rx
v=this.e4
if(z>=v.length)return H.a(v,z)
u=v[z]
z=this.c.aq(145)===0
u.b=z
if(!z){if(this.c.aq(156)!==0)t=this.c.aq(128)!==0?1:3
else t=this.c.aq(163)!==0?2:0
u.c[0]=t;(x&&C.j).aF(x,y,y+4,t)
C.j.aF(w,0,4,t)}else{s=u.c
for(r=0,q=0;q<4;++q,r=l){t=w[q]
for(p=0;p<4;++p){z=y+p
if(z>=x.length)return H.a(x,z)
v=x[z]
if(v>=10)return H.a(C.aa,v)
v=C.aa[v]
if(t<0||t>=10)return H.a(v,t)
o=v[t]
n=this.c.aq(o[0])
if(n>=18)return H.a(C.S,n)
m=C.S[n]
for(;m>0;){v=this.c
if(m>=9)return H.a(o,m)
v=2*m+v.aq(o[m])
if(v<0||v>=18)return H.a(C.S,v)
m=C.S[v]}t=-m
x[z]=t}l=r+4
C.j.aH(s,r,l,x,y)
w[q]=t}}if(this.c.aq(142)===0)z=0
else if(this.c.aq(114)===0)z=2
else z=this.c.aq(183)!==0?1:3
u.d=z},
static:{mQ:function(a,b,c){if(c===0)if(a===0)return b===0?6:5
else return b===0?4:0
return c}}},
uQ:{
"^":"z:13;",
$2:function(a,b){if(typeof b!=="number")return b.u()
return J.be(a,b<<16>>>0)}},
eJ:{
"^":"o;a,b,c,d,e",
a7:function(a){var z,y
for(z=0;y=a-1,a>0;a=y)z=(z|C.a.u(this.aq(128),y))>>>0
return z},
ep:function(a){var z=this.a7(a)
return this.a7(1)===1?-z:z},
aq:function(a){var z,y,x
z=this.b
if(typeof a!=="number")return H.b(a)
y=this.j4(C.a.p(z*a,8))
z=this.b
if(z<=126){if(z<0)return H.a(C.N,z)
x=C.N[z]
this.b=C.ax[z]
this.d-=x}return y},
j4:function(a){var z,y,x,w,v
if(this.d<0){z=this.a
if(J.a7(J.h(z.c,z.d),1)){z=this.a
y=z.a
x=z.d
z.d=J.c(x,1)
w=J.e(y,x)
x=this.c
if(typeof x!=="number")return x.u()
this.c=J.be(w,x<<8>>>0)
this.d+=8}else{z=this.a
if(!J.a7(z.d,z.c)){z=this.a
y=z.a
x=z.d
z.d=J.c(x,1)
x=J.e(y,x)
y=this.c
if(typeof y!=="number")return y.u()
this.c=J.be(x,y<<8>>>0)
this.d+=8}else if(!this.e){z=this.c
if(typeof z!=="number")return z.u()
this.c=z<<8>>>0
this.d+=8
this.e=!0}}}v=this.d
z=this.c
if(typeof z!=="number")return z.D()
if(C.b.D(z,v)>a){y=a+1
this.b=this.b-y
this.c=z-C.a.u(y,v)
return 1}else{this.b=a
return 0}},
n0:function(a){this.b=254
this.c=0
this.d=-8},
static:{mM:function(a){var z=new U.eJ(a,null,null,null,!1)
z.n0(a)
return z}}},
uI:{
"^":"o;",
iM:function(a,b,c){var z,y
z=U.R(a,null,0)
for(y=0;y<16;++y){z.d=J.c(a.d,y)
if(this.jK(z,b,c))this.fw(z,b)}},
iL:function(a,b,c){var z,y,x
z=U.R(a,null,0)
for(y=0;y<16;++y){x=a.d
if(typeof b!=="number")return H.b(b)
z.d=J.c(x,y*b)
if(this.jK(z,1,c))this.fw(z,1)}},
lD:function(a,b,c){var z,y,x
z=U.R(a,null,0)
for(y=3;y>0;--y){x=z.d
if(typeof b!=="number")return H.b(b)
z.d=J.c(x,4*b)
this.iM(z,b,c)}},
lC:function(a,b,c){var z,y
z=U.R(a,null,0)
for(y=3;y>0;--y){z.d=J.c(z.d,4)
this.iL(z,b,c)}},
rj:function(a,b,c,d,e){var z,y,x
z=U.R(a,null,0)
for(y=3;y>0;--y){x=z.d
if(typeof b!=="number")return H.b(b)
z.d=J.c(x,4*b)
this.dF(z,b,1,16,c,d,e)}},
qb:function(a,b,c,d,e){var z,y
z=U.R(a,null,0)
for(y=3;y>0;--y){z.d=J.c(z.d,4)
this.dF(z,1,b,16,c,d,e)}},
dG:function(a,b,c,d,e,f,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=U.R(a,null,0)
for(;y=d-1,d>0;d=y){if(this.jL(z,b,e,f))if(this.jz(z,b,a0))this.fw(z,b)
else{if(typeof b!=="number")return H.b(b)
x=-3*b
w=J.e(z.a,J.c(z.d,x))
v=-2*b
u=J.e(z.a,J.c(z.d,v))
t=-b
s=J.e(z.a,J.c(z.d,t))
r=J.e(z.a,J.c(z.d,0))
q=J.e(z.a,J.c(z.d,b))
p=2*b
o=J.e(z.a,J.c(z.d,p))
n=$.$get$eL()
m=J.h(r,s)
if(typeof m!=="number")return H.b(m)
l=$.$get$eL()
if(typeof u!=="number")return H.b(u)
if(typeof q!=="number")return H.b(q)
k=1020+u-q
if(k>>>0!==k||k>=l.length)return H.a(l,k)
k=1020+3*m+l[k]
if(k>>>0!==k||k>=n.length)return H.a(n,k)
j=n[k]
i=C.d.X((27*j+63)/128)
h=C.d.X((18*j+63)/128)
g=C.d.X((9*j+63)/128)
k=$.$get$bo()
if(typeof w!=="number")return H.b(w)
n=255+w+g
if(n>>>0!==n||n>=k.length)return H.a(k,n)
n=k[n]
J.u(z.a,J.c(z.d,x),n)
n=$.$get$bo()
x=255+u+h
if(x>>>0!==x||x>=n.length)return H.a(n,x)
x=n[x]
J.u(z.a,J.c(z.d,v),x)
x=$.$get$bo()
if(typeof s!=="number")return H.b(s)
v=255+s+i
if(v>>>0!==v||v>=x.length)return H.a(x,v)
v=x[v]
J.u(z.a,J.c(z.d,t),v)
v=$.$get$bo()
if(typeof r!=="number")return H.b(r)
t=255+r-i
if(t>>>0!==t||t>=v.length)return H.a(v,t)
t=v[t]
J.u(z.a,J.c(z.d,0),t)
t=$.$get$bo()
v=255+q-h
if(v>>>0!==v||v>=t.length)return H.a(t,v)
v=t[v]
J.u(z.a,J.c(z.d,b),v)
v=$.$get$bo()
if(typeof o!=="number")return H.b(o)
t=255+o-g
if(t>>>0!==t||t>=v.length)return H.a(v,t)
t=v[t]
J.u(z.a,J.c(z.d,p),t)}z.d=J.c(z.d,c)}},
dF:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=U.R(a,null,0)
for(;y=d-1,d>0;d=y){if(this.jL(z,b,e,f))if(this.jz(z,b,g))this.fw(z,b)
else{if(typeof b!=="number")return H.b(b)
x=-2*b
w=J.e(z.a,J.c(z.d,x))
v=-b
u=J.e(z.a,J.c(z.d,v))
t=J.e(z.a,J.c(z.d,0))
s=J.e(z.a,J.c(z.d,b))
r=J.h(t,u)
if(typeof r!=="number")return H.b(r)
q=3*r
r=$.$get$dV()
p=112+C.d.X((q+4)/8)
if(p<0||p>=r.length)return H.a(r,p)
o=r[p]
p=$.$get$dV()
r=112+C.d.X((q+3)/8)
if(r<0||r>=p.length)return H.a(p,r)
n=p[r]
m=C.d.X((o+1)/2)
r=$.$get$bo()
if(typeof w!=="number")return H.b(w)
p=255+w+m
if(p>>>0!==p||p>=r.length)return H.a(r,p)
p=r[p]
J.u(z.a,J.c(z.d,x),p)
p=$.$get$bo()
if(typeof u!=="number")return H.b(u)
x=255+u+n
if(x>>>0!==x||x>=p.length)return H.a(p,x)
x=p[x]
J.u(z.a,J.c(z.d,v),x)
x=$.$get$bo()
if(typeof t!=="number")return H.b(t)
v=255+t-o
if(v>>>0!==v||v>=x.length)return H.a(x,v)
v=x[v]
J.u(z.a,J.c(z.d,0),v)
v=$.$get$bo()
if(typeof s!=="number")return H.b(s)
x=255+s-m
if(x>>>0!==x||x>=v.length)return H.a(v,x)
x=v[x]
J.u(z.a,J.c(z.d,b),x)}z.d=J.c(z.d,c)}},
fw:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
if(typeof b!=="number")return H.b(b)
z=J.e(a.a,J.c(a.d,-2*b))
y=-b
x=J.e(a.a,J.c(a.d,y))
w=J.e(a.a,J.c(a.d,0))
v=J.e(a.a,J.c(a.d,b))
u=J.h(w,x)
if(typeof u!=="number")return H.b(u)
t=$.$get$eL()
if(typeof z!=="number")return H.b(z)
if(typeof v!=="number")return H.b(v)
s=1020+z-v
if(s>>>0!==s||s>=t.length)return H.a(t,s)
r=3*u+t[s]
s=$.$get$dV()
t=112+C.d.X((r+4)/8)
if(t<0||t>=s.length)return H.a(s,t)
q=s[t]
t=$.$get$dV()
s=112+C.d.X((r+3)/8)
if(s<0||s>=t.length)return H.a(t,s)
p=t[s]
s=$.$get$bo()
if(typeof x!=="number")return H.b(x)
t=255+x+p
if(t>>>0!==t||t>=s.length)return H.a(s,t)
t=s[t]
J.u(a.a,J.c(a.d,y),t)
t=$.$get$bo()
if(typeof w!=="number")return H.b(w)
y=255+w-q
if(y>>>0!==y||y>=t.length)return H.a(t,y)
y=t[y]
J.u(a.a,J.c(a.d,0),y)},
jz:function(a,b,c){var z,y,x,w,v,u,t
if(typeof b!=="number")return H.b(b)
z=J.e(a.a,J.c(a.d,-2*b))
y=J.e(a.a,J.c(a.d,-b))
x=J.e(a.a,J.c(a.d,0))
w=J.e(a.a,J.c(a.d,b))
v=$.$get$eK()
if(typeof z!=="number")return H.b(z)
if(typeof y!=="number")return H.b(y)
u=255+z-y
t=v.length
if(u>>>0!==u||u>=t)return H.a(v,u)
if(v[u]<=c){if(typeof w!=="number")return H.b(w)
if(typeof x!=="number")return H.b(x)
u=255+w-x
if(u>>>0!==u||u>=t)return H.a(v,u)
u=v[u]>c
v=u}else v=!0
return v},
jK:function(a,b,c){var z,y,x,w,v,u,t
if(typeof b!=="number")return H.b(b)
z=J.e(a.a,J.c(a.d,-2*b))
y=J.e(a.a,J.c(a.d,-b))
x=J.e(a.a,J.c(a.d,0))
w=J.e(a.a,J.c(a.d,b))
v=$.$get$eK()
if(typeof y!=="number")return H.b(y)
if(typeof x!=="number")return H.b(x)
u=255+y-x
if(u>>>0!==u||u>=v.length)return H.a(v,u)
u=v[u]
v=$.$get$fU()
if(typeof z!=="number")return H.b(z)
if(typeof w!=="number")return H.b(w)
t=255+z-w
if(t>>>0!==t||t>=v.length)return H.a(v,t)
return 2*u+v[t]<=c},
jL:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
if(typeof b!=="number")return H.b(b)
z=J.e(a.a,J.c(a.d,-4*b))
y=J.e(a.a,J.c(a.d,-3*b))
x=J.e(a.a,J.c(a.d,-2*b))
w=J.e(a.a,J.c(a.d,-b))
v=J.e(a.a,J.c(a.d,0))
u=J.e(a.a,J.c(a.d,b))
t=J.e(a.a,J.c(a.d,2*b))
s=J.e(a.a,J.c(a.d,3*b))
r=$.$get$eK()
if(typeof w!=="number")return H.b(w)
if(typeof v!=="number")return H.b(v)
q=255+w-v
p=r.length
if(q>>>0!==q||q>=p)return H.a(r,q)
q=r[q]
o=$.$get$fU()
if(typeof x!=="number")return H.b(x)
n=255+x
if(typeof u!=="number")return H.b(u)
m=n-u
if(m>>>0!==m||m>=o.length)return H.a(o,m)
if(2*q+o[m]>c)return!1
if(typeof z!=="number")return H.b(z)
if(typeof y!=="number")return H.b(y)
q=255+z-y
if(q>>>0!==q||q>=p)return H.a(r,q)
if(r[q]<=d){q=255+y-x
if(q>>>0!==q||q>=p)return H.a(r,q)
if(r[q]<=d){q=n-w
if(q>>>0!==q||q>=p)return H.a(r,q)
if(r[q]<=d){if(typeof s!=="number")return H.b(s)
if(typeof t!=="number")return H.b(t)
q=255+s-t
if(q>>>0!==q||q>=p)return H.a(r,q)
if(r[q]<=d){q=255+t-u
if(q>>>0!==q||q>=p)return H.a(r,q)
if(r[q]<=d){q=255+u-v
if(q>>>0!==q||q>=p)return H.a(r,q)
q=r[q]<=d
r=q}else r=!1}else r=!1}else r=!1}else r=!1}else r=!1
return r},
cv:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=H.k(16)
y=new Int32Array(z)
for(x=0,w=0,v=0;v<4;++v){u=x+8
t=J.c(J.e(a.a,J.c(a.d,x)),J.e(a.a,J.c(a.d,u)))
s=J.h(J.e(a.a,J.c(a.d,x)),J.e(a.a,J.c(a.d,u)))
u=x+4
r=x+12
q=J.a_(J.G(J.d(J.e(a.a,J.c(a.d,u)),35468),65536))-J.a_(J.G(J.d(J.e(a.a,J.c(a.d,r)),85627),65536))
p=J.a_(J.G(J.d(J.e(a.a,J.c(a.d,u)),85627),65536))+J.a_(J.G(J.d(J.e(a.a,J.c(a.d,r)),35468),65536))
o=w+1
r=J.w(t)
u=r.j(t,p)
if(w>=z)return H.a(y,w)
y[w]=u
w=o+1
u=J.w(s)
n=u.j(s,q)
if(o>=z)return H.a(y,o)
y[o]=n
o=w+1
u=u.l(s,q)
if(w>=z)return H.a(y,w)
y[w]=u
w=o+1
r=r.l(t,p)
if(o>=z)return H.a(y,o)
y[o]=r;++x}for(m=0,w=0,v=0;v<4;++v){if(w>=z)return H.a(y,w)
l=J.c(y[w],4)
u=w+8
if(u>=z)return H.a(y,u)
r=J.w(l)
t=r.j(l,y[u])
s=r.l(l,y[u])
u=w+4
if(u>=z)return H.a(y,u)
r=J.a_(J.G(J.d(y[u],35468),65536))
n=w+12
if(n>=z)return H.a(y,n)
q=r-J.a_(J.G(J.d(y[n],85627),65536))
p=J.a_(J.G(J.d(y[u],85627),65536))+J.a_(J.G(J.d(y[n],35468),65536))
n=J.w(t)
U.cq(b,m,0,0,n.j(t,p))
u=J.w(s)
U.cq(b,m,1,0,u.j(s,q))
U.cq(b,m,2,0,u.l(s,q))
U.cq(b,m,3,0,n.l(t,p));++w
m+=32}},
fb:function(a,b){var z,y,x
z=J.c(J.e(a.a,J.c(a.d,0)),4)
for(y=0;y<4;++y)for(x=0;x<4;++x)U.cq(b,0,x,y,z)},
lc:function(a,b){if(!J.i(J.e(a.a,J.c(a.d,0)),0))this.fb(a,b)
if(!J.i(J.e(a.a,J.c(a.d,16)),0))this.fb(U.R(a,null,16),U.R(b,null,4))
if(!J.i(J.e(a.a,J.c(a.d,32)),0))this.fb(U.R(a,null,32),U.R(b,null,128))
if(!J.i(J.e(a.a,J.c(a.d,48)),0))this.fb(U.R(a,null,48),U.R(b,null,132))},
static:{ad:function(a,b,c){if(typeof b!=="number")return H.b(b)
return J.a_(J.G(J.c(J.c(J.c(a,2*b),c),2),4))},Cp:[function(a){var z,y
z=[U.ad(J.e(a.a,J.c(a.d,-33)),J.e(a.a,J.c(a.d,-32)),J.e(a.a,J.c(a.d,-31))),U.ad(J.e(a.a,J.c(a.d,-32)),J.e(a.a,J.c(a.d,-31)),J.e(a.a,J.c(a.d,-30))),U.ad(J.e(a.a,J.c(a.d,-31)),J.e(a.a,J.c(a.d,-30)),J.e(a.a,J.c(a.d,-29))),U.ad(J.e(a.a,J.c(a.d,-30)),J.e(a.a,J.c(a.d,-29)),J.e(a.a,J.c(a.d,-28)))]
for(y=0;y<4;++y)a.cT(y*32,4,z)},"$1","xr",2,0,2],Cg:[function(a){var z,y,x,w,v,u,t,s
z=J.e(a.a,J.c(a.d,-33))
y=J.e(a.a,J.c(a.d,-1))
x=J.e(a.a,J.c(a.d,31))
w=J.e(a.a,J.c(a.d,63))
v=J.e(a.a,J.c(a.d,95))
u=U.R(a,null,0)
t=u.fa()
s=U.ad(z,y,x)
if(0>=t.length)return H.a(t,0)
t[0]=16843009*s
u.d=J.c(u.d,32)
s=u.fa()
t=U.ad(y,x,w)
if(0>=s.length)return H.a(s,0)
s[0]=16843009*t
u.d=J.c(u.d,32)
t=u.fa()
s=U.ad(x,w,v)
if(0>=t.length)return H.a(t,0)
t[0]=16843009*s
u.d=J.c(u.d,32)
s=u.fa()
t=U.ad(w,v,v)
if(0>=s.length)return H.a(s,0)
s[0]=16843009*t},"$1","xi",2,0,2],C9:[function(a){var z,y,x
for(z=4,y=0;y<4;++y){x=J.c(J.e(a.a,J.c(a.d,y-32)),J.e(a.a,J.c(a.d,-1+y*32)))
if(typeof x!=="number")return H.b(x)
z+=x}z=C.b.p(z,3)
for(y=0;y<4;++y){x=y*32
J.bY(a.a,J.c(a.d,x),J.c(J.c(a.d,x),4),z)}},"$1","xb",2,0,2],jE:function(a,b){var z,y,x,w,v,u,t
z=J.e(a.a,J.c(a.d,-33))
if(typeof z!=="number")return H.b(z)
y=255-z
for(x=0,w=0;w<b;++w){z=J.e(a.a,J.c(a.d,x-1))
if(typeof z!=="number")return H.b(z)
v=y+z
for(u=0;u<b;++u){z=$.$get$bo()
t=J.e(a.a,J.c(a.d,-32+u))
if(typeof t!=="number")return H.b(t)
t=v+t
if(t>>>0!==t||t>=z.length)return H.a(z,t)
t=z[t]
J.u(a.a,J.c(a.d,x+u),t)}x+=32}},Cm:[function(a){U.jE(a,4)},"$1","xo",2,0,2],Cn:[function(a){U.jE(a,8)},"$1","xp",2,0,2],Cl:[function(a){U.jE(a,16)},"$1","xn",2,0,2],Ck:[function(a){var z,y,x,w,v,u,t,s,r,q
z=J.e(a.a,J.c(a.d,-1))
y=J.e(a.a,J.c(a.d,31))
x=J.e(a.a,J.c(a.d,63))
w=J.e(a.a,J.c(a.d,95))
v=J.e(a.a,J.c(a.d,-33))
u=J.e(a.a,J.c(a.d,-32))
t=J.e(a.a,J.c(a.d,-31))
s=J.e(a.a,J.c(a.d,-30))
r=J.e(a.a,J.c(a.d,-29))
q=U.ad(y,x,w)
J.u(a.a,J.c(a.d,96),q)
q=U.ad(z,y,x)
J.u(a.a,J.c(a.d,97),q)
J.u(a.a,J.c(a.d,64),q)
q=U.ad(v,z,y)
J.u(a.a,J.c(a.d,98),q)
J.u(a.a,J.c(a.d,65),q)
J.u(a.a,J.c(a.d,32),q)
q=U.ad(u,v,z)
J.u(a.a,J.c(a.d,99),q)
J.u(a.a,J.c(a.d,66),q)
J.u(a.a,J.c(a.d,33),q)
J.u(a.a,J.c(a.d,0),q)
q=U.ad(t,u,v)
J.u(a.a,J.c(a.d,67),q)
J.u(a.a,J.c(a.d,34),q)
J.u(a.a,J.c(a.d,1),q)
q=U.ad(s,t,u)
J.u(a.a,J.c(a.d,35),q)
J.u(a.a,J.c(a.d,2),q)
q=U.ad(r,s,t)
J.u(a.a,J.c(a.d,3),q)},"$1","xm",2,0,2],Cj:[function(a){var z,y,x,w,v,u,t,s,r
z=J.e(a.a,J.c(a.d,-32))
y=J.e(a.a,J.c(a.d,-31))
x=J.e(a.a,J.c(a.d,-30))
w=J.e(a.a,J.c(a.d,-29))
v=J.e(a.a,J.c(a.d,-28))
u=J.e(a.a,J.c(a.d,-27))
t=J.e(a.a,J.c(a.d,-26))
s=J.e(a.a,J.c(a.d,-25))
r=U.ad(z,y,x)
J.u(a.a,J.c(a.d,0),r)
r=U.ad(y,x,w)
J.u(a.a,J.c(a.d,32),r)
J.u(a.a,J.c(a.d,1),r)
r=U.ad(x,w,v)
J.u(a.a,J.c(a.d,64),r)
J.u(a.a,J.c(a.d,33),r)
J.u(a.a,J.c(a.d,2),r)
r=U.ad(w,v,u)
J.u(a.a,J.c(a.d,96),r)
J.u(a.a,J.c(a.d,65),r)
J.u(a.a,J.c(a.d,34),r)
J.u(a.a,J.c(a.d,3),r)
r=U.ad(v,u,t)
J.u(a.a,J.c(a.d,97),r)
J.u(a.a,J.c(a.d,66),r)
J.u(a.a,J.c(a.d,35),r)
r=U.ad(u,t,s)
J.u(a.a,J.c(a.d,98),r)
J.u(a.a,J.c(a.d,67),r)
r=U.ad(t,s,s)
J.u(a.a,J.c(a.d,99),r)},"$1","xl",2,0,2],Cs:[function(a){var z,y,x,w,v,u,t,s,r
z=J.e(a.a,J.c(a.d,-1))
y=J.e(a.a,J.c(a.d,31))
x=J.e(a.a,J.c(a.d,63))
w=J.e(a.a,J.c(a.d,-33))
v=J.e(a.a,J.c(a.d,-32))
u=J.e(a.a,J.c(a.d,-31))
t=J.e(a.a,J.c(a.d,-30))
s=J.e(a.a,J.c(a.d,-29))
r=J.a_(J.G(J.c(J.c(w,v),1),2))
J.u(a.a,J.c(a.d,65),r)
J.u(a.a,J.c(a.d,0),r)
r=J.a_(J.G(J.c(J.c(v,u),1),2))
J.u(a.a,J.c(a.d,66),r)
J.u(a.a,J.c(a.d,1),r)
r=J.a_(J.G(J.c(J.c(u,t),1),2))
J.u(a.a,J.c(a.d,67),r)
J.u(a.a,J.c(a.d,2),r)
r=J.a_(J.G(J.c(J.c(t,s),1),2))
J.u(a.a,J.c(a.d,3),r)
r=U.ad(x,y,z)
J.u(a.a,J.c(a.d,96),r)
r=U.ad(y,z,w)
J.u(a.a,J.c(a.d,64),r)
r=U.ad(z,w,v)
J.u(a.a,J.c(a.d,97),r)
J.u(a.a,J.c(a.d,32),r)
r=U.ad(w,v,u)
J.u(a.a,J.c(a.d,98),r)
J.u(a.a,J.c(a.d,33),r)
r=U.ad(v,u,t)
J.u(a.a,J.c(a.d,99),r)
J.u(a.a,J.c(a.d,34),r)
r=U.ad(u,t,s)
J.u(a.a,J.c(a.d,35),r)},"$1","xu",2,0,2],Cr:[function(a){var z,y,x,w,v,u,t,s,r
z=J.e(a.a,J.c(a.d,-32))
y=J.e(a.a,J.c(a.d,-31))
x=J.e(a.a,J.c(a.d,-30))
w=J.e(a.a,J.c(a.d,-29))
v=J.e(a.a,J.c(a.d,-28))
u=J.e(a.a,J.c(a.d,-27))
t=J.e(a.a,J.c(a.d,-26))
s=J.e(a.a,J.c(a.d,-25))
r=J.a_(J.G(J.c(J.c(z,y),1),2))
J.u(a.a,J.c(a.d,0),r)
r=J.a_(J.G(J.c(J.c(y,x),1),2))
J.u(a.a,J.c(a.d,64),r)
J.u(a.a,J.c(a.d,1),r)
r=J.a_(J.G(J.c(J.c(x,w),1),2))
J.u(a.a,J.c(a.d,65),r)
J.u(a.a,J.c(a.d,2),r)
r=J.a_(J.G(J.c(J.c(w,v),1),2))
J.u(a.a,J.c(a.d,66),r)
J.u(a.a,J.c(a.d,3),r)
r=U.ad(z,y,x)
J.u(a.a,J.c(a.d,32),r)
r=U.ad(y,x,w)
J.u(a.a,J.c(a.d,96),r)
J.u(a.a,J.c(a.d,33),r)
r=U.ad(x,w,v)
J.u(a.a,J.c(a.d,97),r)
J.u(a.a,J.c(a.d,34),r)
r=U.ad(w,v,u)
J.u(a.a,J.c(a.d,98),r)
J.u(a.a,J.c(a.d,35),r)
r=U.ad(v,u,t)
J.u(a.a,J.c(a.d,67),r)
r=U.ad(u,t,s)
J.u(a.a,J.c(a.d,99),r)},"$1","xt",2,0,2],Ci:[function(a){var z,y,x,w,v
z=J.e(a.a,J.c(a.d,-1))
y=J.e(a.a,J.c(a.d,31))
x=J.e(a.a,J.c(a.d,63))
w=J.e(a.a,J.c(a.d,95))
v=J.a_(J.G(J.c(J.c(z,y),1),2))
J.u(a.a,J.c(a.d,0),v)
v=J.a_(J.G(J.c(J.c(y,x),1),2))
J.u(a.a,J.c(a.d,32),v)
J.u(a.a,J.c(a.d,2),v)
v=J.a_(J.G(J.c(J.c(x,w),1),2))
J.u(a.a,J.c(a.d,64),v)
J.u(a.a,J.c(a.d,34),v)
v=U.ad(z,y,x)
J.u(a.a,J.c(a.d,1),v)
v=U.ad(y,x,w)
J.u(a.a,J.c(a.d,33),v)
J.u(a.a,J.c(a.d,3),v)
v=U.ad(x,w,w)
J.u(a.a,J.c(a.d,65),v)
J.u(a.a,J.c(a.d,35),v)
J.u(a.a,J.c(a.d,99),w)
J.u(a.a,J.c(a.d,98),w)
J.u(a.a,J.c(a.d,97),w)
J.u(a.a,J.c(a.d,96),w)
J.u(a.a,J.c(a.d,66),w)
J.u(a.a,J.c(a.d,67),w)},"$1","xk",2,0,2],Ce:[function(a){var z,y,x,w,v,u,t,s,r
z=J.e(a.a,J.c(a.d,-1))
y=J.e(a.a,J.c(a.d,31))
x=J.e(a.a,J.c(a.d,63))
w=J.e(a.a,J.c(a.d,95))
v=J.e(a.a,J.c(a.d,-33))
u=J.e(a.a,J.c(a.d,-32))
t=J.e(a.a,J.c(a.d,-31))
s=J.e(a.a,J.c(a.d,-30))
r=J.a_(J.G(J.c(J.c(z,v),1),2))
J.u(a.a,J.c(a.d,34),r)
J.u(a.a,J.c(a.d,0),r)
r=J.a_(J.G(J.c(J.c(y,z),1),2))
J.u(a.a,J.c(a.d,66),r)
J.u(a.a,J.c(a.d,32),r)
r=J.a_(J.G(J.c(J.c(x,y),1),2))
J.u(a.a,J.c(a.d,98),r)
J.u(a.a,J.c(a.d,64),r)
r=J.a_(J.G(J.c(J.c(w,x),1),2))
J.u(a.a,J.c(a.d,96),r)
r=U.ad(u,t,s)
J.u(a.a,J.c(a.d,3),r)
r=U.ad(v,u,t)
J.u(a.a,J.c(a.d,2),r)
r=U.ad(z,v,u)
J.u(a.a,J.c(a.d,35),r)
J.u(a.a,J.c(a.d,1),r)
r=U.ad(y,z,v)
J.u(a.a,J.c(a.d,67),r)
J.u(a.a,J.c(a.d,33),r)
r=U.ad(x,y,z)
J.u(a.a,J.c(a.d,99),r)
J.u(a.a,J.c(a.d,65),r)
r=U.ad(w,x,y)
J.u(a.a,J.c(a.d,97),r)},"$1","xg",2,0,2],Co:[function(a){var z
for(z=0;z<16;++z)a.bB(z*32,16,a,-32)},"$1","xq",2,0,2],Cf:[function(a){var z,y,x
for(z=0,y=16;y>0;--y){x=J.e(a.a,J.c(a.d,z-1))
J.bY(a.a,J.c(a.d,z),J.c(J.c(a.d,z),16),x)
z+=32}},"$1","xh",2,0,2],fR:function(a,b){var z,y
for(z=0;z<16;++z){y=z*32
J.bY(b.a,J.c(b.d,y),J.c(J.c(b.d,y),16),a)}},C5:[function(a){var z,y,x
for(z=16,y=0;y<16;++y){x=J.c(J.e(a.a,J.c(a.d,-1+y*32)),J.e(a.a,J.c(a.d,y-32)))
if(typeof x!=="number")return H.b(x)
z+=x}U.fR(C.b.p(z,5),a)},"$1","x7",2,0,2],C7:[function(a){var z,y,x
for(z=8,y=0;y<16;++y){x=J.e(a.a,J.c(a.d,-1+y*32))
if(typeof x!=="number")return H.b(x)
z+=x}U.fR(C.b.p(z,4),a)},"$1","x9",2,0,2],C6:[function(a){var z,y,x
for(z=8,y=0;y<16;++y){x=J.e(a.a,J.c(a.d,y-32))
if(typeof x!=="number")return H.b(x)
z+=x}U.fR(C.b.p(z,4),a)},"$1","x8",2,0,2],C8:[function(a){U.fR(128,a)},"$1","xa",2,0,2],Cq:[function(a){var z
for(z=0;z<8;++z)a.bB(z*32,8,a,-32)},"$1","xs",2,0,2],Ch:[function(a){var z,y,x
for(z=0,y=0;y<8;++y){x=J.e(a.a,J.c(a.d,z-1))
J.bY(a.a,J.c(a.d,z),J.c(J.c(a.d,z),8),x)
z+=32}},"$1","xj",2,0,2],fS:function(a,b){var z,y
for(z=0;z<8;++z){y=z*32
J.bY(b.a,J.c(b.d,y),J.c(J.c(b.d,y),8),a)}},Ca:[function(a){var z,y,x
for(z=8,y=0;y<8;++y){x=J.c(J.e(a.a,J.c(a.d,y-32)),J.e(a.a,J.c(a.d,-1+y*32)))
if(typeof x!=="number")return H.b(x)
z+=x}U.fS(C.b.p(z,4),a)},"$1","xc",2,0,2],Cb:[function(a){var z,y,x
for(z=4,y=0;y<8;++y){x=J.e(a.a,J.c(a.d,y-32))
if(typeof x!=="number")return H.b(x)
z+=x}U.fS(C.b.p(z,3),a)},"$1","xd",2,0,2],Cc:[function(a){var z,y,x
for(z=4,y=0;y<8;++y){x=J.e(a.a,J.c(a.d,-1+y*32))
if(typeof x!=="number")return H.b(x)
z+=x}U.fS(C.b.p(z,3),a)},"$1","xe",2,0,2],Cd:[function(a){U.fS(128,a)},"$1","xf",2,0,2],cq:function(a,b,c,d,e){var z,y
z=b+c+d*32
y=J.e(a.a,J.c(a.d,z))
if(typeof e!=="number")return e.D()
y=J.c(y,C.b.p(e,3))
if(J.W(y,-256)===0);else{if(typeof y!=="number")return y.U()
y=y<0?0:255}J.u(a.a,J.c(a.d,z),y)},fT:function(a,b,c,d,e){var z=J.w(c)
U.cq(a,0,0,b,z.j(c,d))
U.cq(a,0,1,b,z.j(c,e))
U.cq(a,0,2,b,z.l(c,e))
U.cq(a,0,3,b,z.l(c,d))},uJ:function(){var z,y,x,w,v
if(!$.mN){for(z=-255;z<=255;++z){y=$.$get$eK()
x=255+z
w=z<0?-z:z
v=y.length
if(x>=v)return H.a(y,x)
y[x]=w
w=$.$get$fU()
if(x>=v)return H.a(y,x)
y=C.a.p(y[x],1)
if(x>=w.length)return H.a(w,x)
w[x]=y}for(z=-1020;z<=1020;++z){y=$.$get$eL()
x=1020+z
if(z<-128)w=-128
else w=z>127?127:z
if(x>=y.length)return H.a(y,x)
y[x]=w}for(z=-112;z<=112;++z){y=$.$get$dV()
x=112+z
if(z<-16)w=-16
else w=z>15?15:z
if(x>=y.length)return H.a(y,x)
y[x]=w}for(z=-255;z<=510;++z){y=$.$get$bo()
x=255+z
if(z<0)w=0
else w=z>255?255:z
if(x>=y.length)return H.a(y,x)
y[x]=w}$.mN=!0}}}},
jF:{
"^":"o;a,b,c,d"},
jI:{
"^":"o;N:a>,M:b>,c,d,e,f"},
jJ:{
"^":"o;a,b,c,d,e"},
mL:{
"^":"o;a",
n_:function(){var z,y
for(z=this.a,y=0;y<3;++y)z[y]=new Uint8Array(11)},
static:{uH:function(){var z=new U.mL(H.p(Array(3),[P.cp]))
z.n_()
return z}}},
uO:{
"^":"o;a,b",
n1:function(){var z,y,x,w
for(z=this.b,y=0;y<4;++y){x=Array(8)
x.$builtinTypeInfo=[U.mL]
z[y]=x
for(w=0;w<8;++w)z[y][w]=U.uH()}C.j.aF(this.a,0,3,255)},
static:{uP:function(){var z=new U.uO(new Uint8Array(H.k(3)),Array(4))
z.n1()
return z}}},
jD:{
"^":"o;a,b,c,d,e,f"},
fQ:{
"^":"o;a,b,c,d"},
jH:{
"^":"o;a,b"},
fY:{
"^":"o;a,b,c,d,e"},
mO:{
"^":"o;a,b,c,d,e,f,r"},
mP:{
"^":"o;F:a*,b,aL:c<"},
uK:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id",
eO:function(){if(this.b.Z(8)!==47)return!1
var z=this.c
z.f=2
z.a=this.b.Z(14)+1
z.b=this.b.Z(14)+1
z.d=this.b.Z(1)!==0
if(this.b.Z(3)!==0)return!1
return!0},
cn:function(){var z,y,x
this.e=0
if(!this.eO())return
z=this.c
this.eC(z.a,z.b,!0)
this.j1()
this.d=U.c_(z.a,z.b,4)
y=this.dy
x=z.a
z=z.b
if(!this.hq(y,x,z,z,this.goJ()))return
return this.d},
j1:function(){var z,y,x,w,v,u
z=this.c
y=J.d(z.a,z.b)
x=z.a
w=J.d(x,16)
z=J.w(y)
v=new Uint32Array(H.k(J.c(z.j(y,x),w)))
this.dy=v
u=v.buffer
this.fr=(u&&C.e).ad(u,0,null)
this.fx=z.j(y,x)
return!0},
p7:function(a){var z,y,x,w,v,u,t,s
z=this.b.Z(2)
y=this.dx
x=C.a.W(1,z)
if((y&x)>>>0!==0)return!1
this.dx=(y|x)>>>0
w=new U.uN(0,0,0,null,0)
this.db.push(w)
w.a=z
w.b=a[0]
w.c=a[1]
switch(z){case 0:case 1:y=this.b.Z(3)+2
w.e=y
x=J.h(J.c(w.b,C.a.W(1,y)),1)
if(typeof x!=="number")return x.D()
y=C.b.p(x,y)
x=w.c
v=w.e
x=J.h(J.c(x,C.a.W(1,v)),1)
if(typeof x!=="number")return x.D()
w.d=this.eC(y,C.b.p(x,v),!1)
u=!0
break
case 3:t=this.b.Z(8)+1
if(t>16)s=0
else if(t>4)s=1
else{y=t>2?2:3
s=y}y=J.h(J.c(w.b,C.a.W(1,s)),1)
if(typeof y!=="number")return y.D()
a[0]=C.b.p(y,s)
w.e=s
w.d=this.eC(t,1,!1)
u=this.nK(t,w)
break
case 2:u=!0
break
default:throw H.l(new U.L("Invalid WebP tranform type: "+z))}return u},
eC:function(a,b,c){var z,y,x,w,v,u,t,s,r
if(c){for(z=b,y=a;this.b.Z(1)!==0;){x=[y,z]
if(!this.p7(x))throw H.l(new U.L("Invalid Transform"))
y=x[0]
z=x[1]}c=!0}else{z=b
y=a}if(this.b.Z(1)!==0){w=this.b.Z(4)
if(!(w>=1&&w<=11))throw H.l(new U.L("Invalid Color Cache"))}else w=0
if(!this.oW(y,z,w,c))throw H.l(new U.L("Invalid Huffman Codes"))
if(w>0){v=C.a.W(1,w)
this.r=v
this.x=new U.uM(new Uint32Array(H.k(v)),32-w)}else this.r=0
v=this.c
v.a=y
v.b=z
u=this.z
v=C.a.W(1,u)
t=J.w(y)
s=J.h(t.j(y,v),1)
if(typeof s!=="number")return s.D()
this.Q=C.b.p(s,u)
this.y=u===0?4294967295:v-1
if(c){this.e=0
return}r=new Uint32Array(H.k(t.i(y,z)))
if(!this.hq(r,y,z,z,null))throw H.l(new U.L("Failed to decode image data."))
this.e=0
return r},
hq:function(a,b,c,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.e
if(typeof b!=="number")return H.b(b)
y=C.a.ar(z,b)
x=C.a.R(z,b)
w=this.dH(x,y)
v=this.e
if(typeof c!=="number")return H.b(c)
u=b*c
if(typeof a0!=="number")return H.b(a0)
t=b*a0
z=this.r
s=280+z
r=z>0?this.x:null
q=this.y
z=a1!=null
p=v
while(!0){o=this.b
n=o.b
if(!(!(J.a7(n.d,n.c)&&o.a>=64)&&v<t))break
if((x&q)>>>0===0)w=this.dH(x,y)
o=this.b
if(o.a>=32)o.dg()
o=w.a
m=o[0].cW(this.b)
if(m<256){l=o[1].cW(this.b)
n=this.b
if(n.a>=32)n.dg()
k=o[2].cW(this.b)
j=o[3].cW(this.b)
o=a.length
if(v<0||v>=o)return H.a(a,v)
a[v]=(j<<24|l<<16|m<<8|k)>>>0;++v;++x
if(x>=b){++y
if(C.b.R(y,16)===0&&z)a1.$1(y)
if(r!=null)for(;p<v;){if(p<0)return H.a(a,p)
r.fN(0,a[p]);++p}x=0}}else if(m<280){i=this.fB(m-256)
h=o[4].cW(this.b)
o=this.b
if(o.a>=32)o.dg()
g=this.jQ(b,this.fB(h))
if(v<g||u-v<i)return!1
else{for(f=0;f<i;++f){o=v+f
n=v+(f-g)
e=a.length
if(n>>>0!==n||n>=e)return H.a(a,n)
n=a[n]
if(o<0||o>=e)return H.a(a,o)
a[o]=n}v+=i}x+=i
for(;x>=b;){x-=b;++y
if(C.b.R(y,16)===0&&z)a1.$1(y)}if(v<t){if((x&q)>>>0!==0)w=this.dH(x,y)
if(r!=null)for(;p<v;){if(p<0||p>=a.length)return H.a(a,p)
r.fN(0,a[p]);++p}}}else if(m<s){d=m-280
for(;p<v;){if(p<0||p>=a.length)return H.a(a,p)
r.fN(0,a[p]);++p}o=r.a
if(d>=o.length)return H.a(o,d)
o=o[d]
n=a.length
if(v<0||v>=n)return H.a(a,v)
a[v]=o;++v;++x
if(x>=b){++y
if(C.b.R(y,16)===0&&z)a1.$1(y)
for(;p<v;){if(p<0)return H.a(a,p)
r.fN(0,a[p]);++p}x=0}}else return!1}if(z)a1.$1(y)
z=this.b
o=z.b
if(J.a7(o.d,o.c)&&z.a>=64&&v<u)return!1
this.e=v
return!0},
o6:function(){var z,y,x,w,v
if(this.r>0)return!1
for(z=this.cx,y=this.cy,x=y.length,w=0;w<z;++w){if(w>=x)return H.a(y,w)
v=y[w].a
if(v[1].f>1)return!1
if(v[2].f>1)return!1
if(v[3].f>1)return!1}return!0},
rC:[function(a){var z,y,x,w,v,u,t,s,r,q
z=this.f
y=a-z
if(y<=0)return
x=this.c
this.j2(y,J.d(x.a,z))
w=x.a
x=J.w(w)
v=x.i(w,y)
u=x.i(w,this.f)
t=U.aa(this.dy,!1,null,this.fx)
if(typeof v!=="number")return H.b(v)
z=J.w(u)
s=0
for(;s<v;++s){x=this.fy
r=z.j(u,s)
q=J.e(t.a,J.c(t.d,s))
if(typeof q!=="number")return q.D()
q=C.b.p(q,8)
if(r>>>0!==r||r>=x.length)return H.a(x,r)
x[r]=q&255}this.f=a},"$1","gnL",2,0,36],
nu:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.e
if(typeof a!=="number")return H.b(a)
y=C.a.ar(z,a)
x=C.a.R(z,a)
w=this.dH(x,y)
v=this.e
if(typeof b!=="number")return H.b(b)
u=a*b
t=a*c
s=this.y
while(!0){z=this.b
r=z.b
if(!(!(J.a7(r.d,r.c)&&z.a>=64)&&v<t))break
if((x&s)>>>0===0)w=this.dH(x,y)
z=this.b
if(z.a>=32)z.dg()
z=w.a
q=z[0].cW(this.b)
if(q<256){z=this.fr
if(v<0||v>=z.length)return H.a(z,v)
z[v]=q;++v;++x
if(x>=a){++y
if(C.b.R(y,16)===0)this.hw(y)
x=0}}else if(q<280){p=this.fB(q-256)
o=z[4].cW(this.b)
z=this.b
if(z.a>=32)z.dg()
n=this.jQ(a,this.fB(o))
if(v>=n&&u-v>=p)for(z=this.fr,m=0;m<p;++m){r=v+m
l=r-n
k=z.length
if(l>>>0!==l||l>=k)return H.a(z,l)
l=z[l]
if(r<0||r>=k)return H.a(z,r)
z[r]=l}else{this.e=v
return!0}v+=p
x+=p
for(;x>=a;){x-=a;++y
if(C.b.R(y,16)===0)this.hw(y)}if(v<t&&(x&s)>>>0!==0)w=this.dH(x,y)}else return!1}this.hw(y)
this.e=v
return!0},
hw:function(a){var z,y,x,w,v,u,t,s,r
z=this.f
y=a-z
x=this.fr
z=J.d(this.c.a,z)
w=x.length
if(y>0){v=this.f
u=this.fy
t=J.d(this.go,v)
s=u.length
r=this.db
if(0>=r.length)return H.a(r,0)
r[0].pI(v,v+y,new U.ak(x,z,w,z,!1),new U.ak(u,t,s,t,!1))}this.f=a},
rH:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.c
y=J.d(z.a,this.f)
x=a-this.f
if(x<=0)return
this.j2(x,y)
for(w=this.fx,v=this.f,u=0;u<x;++u,++v){t=v>=0
s=0
while(!0){r=z.a
if(typeof r!=="number")return H.b(r)
if(!(s<r))break
r=this.dy
if(w>>>0!==w||w>=r.length)return H.a(r,w)
q=r[w]
r=this.d
p=C.a.v(q>>>24&255,0,255)
o=C.a.v(q&255,0,255)
n=C.a.v(q>>>8&255,0,255)
m=C.a.v(q>>>16&255,0,255)
l=r.a
if(typeof l!=="number")return H.b(l)
if(s<l)if(t){l=r.b
if(typeof l!=="number")return H.b(l)
l=v<l}else l=!1
else l=!1
if(l){l=r.x
r=r.a
if(typeof r!=="number")return H.b(r)
r=v*r+s
if(r>>>0!==r||r>=l.length)return H.a(l,r)
l[r]=(p<<24|o<<16|n<<8|m)>>>0}++s;++w}}this.f=a},"$1","goJ",2,0,36],
j2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.db
y=z.length
x=J.d(this.c.a,a)
w=this.f
v=w+a
u=this.fx
t=this.dy
s=J.w(u);(t&&C.x).aH(t,u,s.j(u,x),this.dy,b)
for(t=v-w,r=t-1,q=b;p=y-1,y>0;q=u,y=p){if(p<0||p>=z.length)return H.a(z,p)
o=z[p]
n=this.dy
m=o.b
switch(o.a){case 2:if(typeof m!=="number")return H.b(m)
o.pu(n,u,s.j(u,t*m))
break
case 0:o.qK(w,v,n,u)
if(v!==o.c){l=s.l(u,m)
k=J.c(l,m)
if(typeof m!=="number")return H.b(m);(n&&C.x).aH(n,l,k,n,s.j(u,r*m))}break
case 1:o.pJ(w,v,n,u)
break
case 3:if(J.i(q,u)&&o.e>0){if(typeof m!=="number")return H.b(m)
j=o.b
i=o.e
j=J.h(J.c(j,C.a.W(1,i)),1)
if(typeof j!=="number")return j.D()
h=t*C.b.p(j,i)
g=J.h(s.j(u,t*m),h);(n&&C.x).aH(n,g,J.c(g,h),n,u)
o.kp(w,v,n,g,n,u)}else o.kp(w,v,n,q,n,u)
break}}},
oW:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o
if(d&&this.b.Z(1)!==0){z=this.b.Z(3)+2
y=C.a.W(1,z)
x=J.h(J.c(a,y),1)
if(typeof x!=="number")return x.D()
x=C.b.p(x,z)
y=J.h(J.c(b,y),1)
if(typeof y!=="number")return y.D()
y=C.b.p(y,z)
w=x*y
v=this.eC(x,y,!1)
this.z=z
for(u=1,t=0;t<w;++t){if(t>=v.length)return H.a(v,t)
s=v[t]>>>8&65535
v[t]=s
if(s>=u)u=s+1}}else{v=null
u=1}r=H.p(Array(u),[U.mZ])
for(y=r.length,x=c>0,t=0;t<u;++t){q=U.n_()
if(t>=y)return H.a(r,t)
r[t]=q
for(p=0;p<5;++p){o=C.i2[p]
if(p===0&&x)o+=C.a.W(1,c)
if(!this.oU(o,r[t].a[p]))return!1}}this.ch=v
this.cx=u
this.cy=r
return!0},
oU:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
if(this.b.Z(1)!==0){z=[0,0]
y=[0,0]
x=[0,0]
w=this.b.Z(1)+1
v=this.b.Z(1)
u=this.b
z[0]=u.Z(v===0?1:8)
y[0]=0
u=w-1
x[0]=u
if(w===2){z[1]=this.b.Z(8)
y[1]=1
x[1]=u}t=b.pC(x,y,z,a,w)}else{s=new Int32Array(19)
r=this.b.Z(4)+4
if(r>19)return!1
x=new Int32Array(a)
for(q=0;q<r;++q){u=C.hl[q]
p=this.b.Z(3)
if(u>=19)return H.a(s,u)
s[u]=p}t=this.oV(s,a,x)
if(t)t=b.kk(x,a)}return t},
oV:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new U.h6(new Uint8Array(H.k(128)),new Int16Array(H.k(128)),new Int16Array(H.k(128)),null,0,0)
z.eG(0)
if(!z.kk(a,19))return!1
if(this.b.Z(1)!==0){y=this.b.Z(3)
x=2+this.b.Z(2+2*y)
if(x>b)return!1}else x=b
for(y=c.length,w=0,v=8;w<b;x=u){u=x-1
if(x===0)break
t=this.b
if(t.a>=32)t.dg()
s=z.cW(this.b)
if(s<16){r=w+1
if(w<0||w>=y)return H.a(c,w)
c[w]=s
if(s!==0)v=s
w=r}else{q=s-16
if(q>=3)return H.a(C.a6,q)
p=C.a6[q]
o=C.be[q]
n=this.b.Z(p)+o
if(w+n>b)return!1
else{m=s===16?v:0
for(;l=n-1,n>0;n=l,w=r){r=w+1
if(w<0||w>=y)return H.a(c,w)
c[w]=m}}}}return!0},
fB:function(a){var z
if(a<4)return a+1
z=C.a.p(a-2,1)
return C.a.W(2+(a&1),z)+this.b.Z(z)+1},
jQ:function(a,b){var z,y,x
if(b>120)return b-120
else{z=b-1
if(z<0)return H.a(C.ac,z)
y=C.ac[z]
if(typeof a!=="number")return H.b(a)
x=(y>>>4)*a+(8-(y&15))
return x>=1?x:1}},
nK:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=C.a.W(1,C.a.c5(8,b.e))
y=H.k(z)
x=new Uint32Array(y)
w=b.d.buffer
v=(w&&C.e).ad(w,0,null)
w=x.buffer
u=(w&&C.e).ad(w,0,null)
w=b.d
if(0>=w.length)return H.a(w,0)
w=w[0]
if(0>=y)return H.a(x,0)
x[0]=w
t=4*a
for(y=v.length,w=u.length,s=4;s<t;++s){if(s>=y)return H.a(v,s)
r=v[s]
q=s-4
if(q>=w)return H.a(u,q)
q=u[q]
if(s>=w)return H.a(u,s)
u[s]=r+q&255}for(t=4*z;s<t;++s){if(s>=w)return H.a(u,s)
u[s]=0}b.d=x
return!0},
nT:function(a,b,c,d,e){var z
if(c===0)return 0
z=b*C.a.p(e,c)+C.b.p(d,c)
if(z>=a.length)return H.a(a,z)
return a[z]},
dH:function(a,b){var z,y,x
z=this.nT(this.ch,this.Q,this.z,a,b)
y=this.cy
if(z>=y.length)return H.a(y,z)
if(y[z]==null){x=U.n_()
if(z>=y.length)return H.a(y,z)
y[z]=x}y=this.cy
if(z>=y.length)return H.a(y,z)
return y[z]},
static:{fV:function(a,b){var z,y,x,w
z=new Uint32Array(H.k(2))
y=new U.uL(0,a,z,null)
z=z.buffer
z=(z&&C.e).ad(z,0,null)
y.d=z
x=a.a
w=a.d
a.d=J.c(w,1)
w=J.e(x,w)
if(0>=z.length)return H.a(z,0)
z[0]=w
w=a.a
x=a.d
a.d=J.c(x,1)
x=J.e(w,x)
if(1>=z.length)return H.a(z,1)
z[1]=x
x=a.a
w=a.d
a.d=J.c(w,1)
w=J.e(x,w)
if(2>=z.length)return H.a(z,2)
z[2]=w
w=a.a
x=a.d
a.d=J.c(x,1)
x=J.e(w,x)
if(3>=z.length)return H.a(z,3)
z[3]=x
x=a.a
w=a.d
a.d=J.c(w,1)
w=J.e(x,w)
if(4>=z.length)return H.a(z,4)
z[4]=w
w=a.a
x=a.d
a.d=J.c(x,1)
x=J.e(w,x)
if(5>=z.length)return H.a(z,5)
z[5]=x
x=a.a
w=a.d
a.d=J.c(w,1)
w=J.e(x,w)
if(6>=z.length)return H.a(z,6)
z[6]=w
w=a.a
x=a.d
a.d=J.c(x,1)
x=J.e(w,x)
if(7>=z.length)return H.a(z,7)
z[7]=x
return new U.uK(a,y,b,null,0,0,0,null,0,0,0,null,0,[],[],0,null,null,null,null,null,null)}}},
uL:{
"^":"o;a,b,c,d",
l_:function(){var z,y,x,w
z=this.a
if(z<32){y=this.c
x=C.a.by(y[0],z)
y=y[1]
if(z<0)return H.a(C.I,z)
w=x+((y&C.I[z])>>>0)*(C.I[32-z]+1)}else{y=this.c
w=z===32?y[1]:C.a.by(y[1],z-32)}return w},
Z:function(a){var z,y
z=this.b
if(!(J.a7(z.d,z.c)&&this.a>=64)&&a<25){z=this.l_()
if(a>=33)return H.a(C.I,a)
y=C.I[a]
this.a+=a
this.dg()
return(z&y)>>>0}else throw H.l(new U.L("Not enough data in input."))},
dg:function(){var z,y,x,w
while(!0){if(this.a>=8){z=this.b
z=!J.a7(z.d,z.c)}else z=!1
if(!z)break
z=this.b
y=z.a
x=z.d
z.d=J.c(x,1)
w=J.e(y,x)
x=this.c
y=x[0]
z=x[1]
x[0]=(y>>>8)+(z&255)*16777216
x[1]=z>>>8
z=x[1]
y=J.d(w,16777216)
if(typeof y!=="number")return H.b(y)
x[1]=(z|y)>>>0
this.a-=8}}},
uM:{
"^":"o;a,b",
fN:function(a,b){var z,y
z=C.a.by((b*506832829&4294967295)>>>0,this.b)
y=this.a
if(z>=y.length)return H.a(y,z)
y[z]=b},
ik:function(a){var z=this.a
if(a>>>0!==a||a>=z.length)return H.a(z,a)
return z[a]}},
uN:{
"^":"o;aa:a>,b,c,A:d>,e",
pI:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q
z=this.e
y=C.a.c5(8,z)
x=this.b
w=this.d
if(y<8){v=C.a.W(1,z)-1
u=C.a.W(1,y)-1
for(t=a;t<b;++t){if(typeof x!=="number")return H.b(x)
s=0
r=0
for(;r<x;++r){if((r&v)>>>0===0){s=J.e(c.a,J.c(c.d,0))
c.d=J.c(c.d,1)}z=J.y(s).T(s,u)
if(z>>>0!==z||z>=w.length)return H.a(w,z)
z=w[z]
J.u(d.a,J.c(d.d,0),z>>>8&255)
d.d=J.c(d.d,1)
if(typeof s!=="number")return s.D()
s=C.b.p(s,y)}}}else for(t=a;t<b;++t){if(typeof x!=="number")return H.b(x)
r=0
for(;r<x;++r){q=J.e(c.a,J.c(c.d,0))
c.d=J.c(c.d,1)
if(q>>>0!==q||q>=w.length)return H.a(w,q)
z=w[q]
J.u(d.a,J.c(d.d,0),z>>>8&255)
d.d=J.c(d.d,1)}}},
kp:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p
z=this.e
y=C.a.c5(8,z)
x=this.b
w=this.d
if(y<8){v=C.a.W(1,z)-1
u=C.a.W(1,y)-1
for(t=a;t<b;++t){if(typeof x!=="number")return H.b(x)
s=0
r=0
for(;r<x;++r,f=p){if((r&v)>>>0===0){q=J.c(d,1)
if(d>>>0!==d||d>=c.length)return H.a(c,d)
s=c[d]>>>8&255
d=q}p=J.c(f,1)
z=s&u
if(z<0||z>=w.length)return H.a(w,z)
z=w[z]
if(f>>>0!==f||f>=e.length)return H.a(e,f)
e[f]=z
s=C.a.c5(s,y)}}}else for(t=a;t<b;++t){if(typeof x!=="number")return H.b(x)
r=0
for(;r<x;++r,f=p,d=q){p=J.c(f,1)
q=J.c(d,1)
if(d>>>0!==d||d>=c.length)return H.a(c,d)
z=c[d]>>>8&255
if(z>=w.length)return H.a(w,z)
z=w[z]
if(f>>>0!==f||f>=e.length)return H.a(e,f)
e[f]=z}}},
pJ:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.b
y=this.e
x=C.a.W(1,y)
w=x-1
x=J.h(J.c(z,x),1)
if(typeof x!=="number")return x.D()
y=C.b.p(x,y)
v=C.a.p(a,this.e)*y
for(u=a;u<b;){x=new Uint8Array(3)
t=new U.wk(x)
if(typeof z!=="number")return H.b(z)
s=J.w(d)
r=v
q=0
for(;q<z;++q){if((q&w)>>>0===0){p=this.d
o=r+1
if(r>=p.length)return H.a(p,r)
p=p[r]
x[0]=p>>>0&255
x[1]=p>>>8&255
x[2]=p>>>16&255
r=o}p=s.j(d,q)
n=s.j(d,q)
m=c.length
if(n>>>0!==n||n>=m)return H.a(c,n)
n=c[n]
l=n>>>8&255
k=(n>>>16&255)+t.hY(x[0],l)&4294967295&255
j=(((n&255)+t.hY(x[1],l)&4294967295)>>>0)+t.hY(x[2],k)&4294967295&255
if(p>>>0!==p||p>=m)return H.a(c,p)
c[p]=(n&4278255360|k<<16&4294967295|j)>>>0}d=s.j(d,z);++u
if((u&w)>>>0===0)v+=y}},
qK:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.b
if(a===0){y=J.y(d)
x=y.l(d,1)
w=c.length
if(x>>>0!==x||x>=w)return H.a(c,x)
c[x]
U.fW(c,d,4278190080)
if(typeof z!=="number")return H.b(z)
v=1
for(;v<z;++v){x=J.h(y.j(d,v),1)
if(x>>>0!==x||x>=w)return H.a(c,x)
u=c[x]
U.fW(c,y.j(d,v),u)}d=y.j(d,z);++a}y=this.e
x=C.a.W(1,y)
t=x-1
x=J.h(J.c(z,x),1)
if(typeof x!=="number")return x.D()
y=C.b.p(x,y)
s=C.a.p(a,this.e)*y
for(r=a;r<b;){x=J.y(d)
w=x.l(d,1)
q=c.length
if(w>>>0!==w||w>=q)return H.a(c,w)
c[w]
w=x.l(d,z)
if(w>>>0!==w||w>=q)return H.a(c,w)
U.fW(c,d,c[w])
w=this.d
p=s+1
if(s>=w.length)return H.a(w,s)
w=w[s]
o=$.$get$jG()[w>>>8&15]
if(typeof z!=="number")return H.b(z)
v=1
for(;v<z;++v){if((v&t)>>>0===0){w=this.d
n=p+1
if(p>=w.length)return H.a(w,p)
w=w[p]
o=$.$get$jG()[w>>>8&15]
p=n}w=J.h(x.j(d,v),1)
if(w>>>0!==w||w>=q)return H.a(c,w)
m=o.$3(c,c[w],J.h(x.j(d,v),z))
U.fW(c,x.j(d,v),m)}d=x.j(d,z);++r
if((r&t)>>>0===0)s+=y}},
pu:function(a,b,c){var z,y,x
for(;J.K(b,c);b=x){if(b>>>0!==b||b>=a.length)return H.a(a,b)
z=a[b]
y=z>>>8&255
x=b+1
a[b]=(z&4278255360|(z&16711935)+((y<<16|y)>>>0)&16711935)>>>0}},
static:{fW:function(a,b,c){var z,y,x
if(b>>>0!==b||b>=a.length)return H.a(a,b)
z=a[b]
y=J.y(c)
x=y.T(c,4278255360)
if(typeof x!=="number")return H.b(x)
y=y.T(c,16711935)
if(typeof y!=="number")return H.b(y)
a[b]=(((z&4278255360)>>>0)+x&4278255360|(z&16711935)+y&16711935)>>>0},c6:function(a,b){return(((a^b)&4278124286)>>>1)+((a&b)>>>0)},cR:function(a){if(a<0)return 0
if(a>255)return 255
return a},fX:function(a,b,c){return Math.abs(b-c)-Math.abs(a-c)},Ct:[function(a,b,c){return 4278190080},"$3","kf",6,0,4],Cu:[function(a,b,c){return b},"$3","xv",6,0,4],Cz:[function(a,b,c){if(c>>>0!==c||c>=a.length)return H.a(a,c)
return a[c]},"$3","xA",6,0,4],CA:[function(a,b,c){var z=J.c(c,1)
if(z>>>0!==z||z>=a.length)return H.a(a,z)
return a[z]},"$3","xB",6,0,4],CB:[function(a,b,c){var z=J.h(c,1)
if(z>>>0!==z||z>=a.length)return H.a(a,z)
return a[z]},"$3","xC",6,0,4],CC:[function(a,b,c){var z,y,x
z=a.length
if(c>>>0!==c||c>=z)return H.a(a,c)
y=a[c]
x=c+1
if(x>=z)return H.a(a,x)
return U.c6(U.c6(b,a[x]),y)},"$3","xD",6,0,4],CD:[function(a,b,c){var z=J.h(c,1)
if(z>>>0!==z||z>=a.length)return H.a(a,z)
return U.c6(b,a[z])},"$3","xE",6,0,4],CE:[function(a,b,c){if(c>>>0!==c||c>=a.length)return H.a(a,c)
return U.c6(b,a[c])},"$3","xF",6,0,4],CF:[function(a,b,c){var z,y
z=J.h(c,1)
y=a.length
if(z>>>0!==z||z>=y)return H.a(a,z)
z=a[z]
if(c>>>0!==c||c>=y)return H.a(a,c)
return U.c6(z,a[c])},"$3","xG",6,0,4],CG:[function(a,b,c){var z,y,x
z=a.length
if(c>>>0!==c||c>=z)return H.a(a,c)
y=a[c]
x=c+1
if(x>=z)return H.a(a,x)
return U.c6(y,a[x])},"$3","xH",6,0,4],Cv:[function(a,b,c){var z,y,x,w
z=J.h(c,1)
y=a.length
if(z>>>0!==z||z>=y)return H.a(a,z)
z=a[z]
if(c>>>0!==c||c>=y)return H.a(a,c)
x=a[c]
w=c+1
if(w>=y)return H.a(a,w)
w=a[w]
return U.c6(U.c6(b,z),U.c6(x,w))},"$3","xw",6,0,4],Cw:[function(a,b,c){var z,y,x
z=a.length
if(c>>>0!==c||c>=z)return H.a(a,c)
y=a[c]
x=c-1
if(x<0)return H.a(a,x)
x=a[x]
return U.fX(y>>>24,b>>>24,x>>>24)+U.fX(y>>>16&255,b>>>16&255,x>>>16&255)+U.fX(y>>>8&255,b>>>8&255,x>>>8&255)+U.fX(y&255,b&255,x&255)<=0?y:b},"$3","xx",6,0,4],Cx:[function(a,b,c){var z,y,x
z=a.length
if(c>>>0!==c||c>=z)return H.a(a,c)
y=a[c]
x=c-1
if(x<0)return H.a(a,x)
x=a[x]
return(U.cR((b>>>24)+(y>>>24)-(x>>>24))<<24|U.cR((b>>>16&255)+(y>>>16&255)-(x>>>16&255))<<16|U.cR((b>>>8&255)+(y>>>8&255)-(x>>>8&255))<<8|U.cR((b&255)+(y&255)-(x&255)))>>>0},"$3","xy",6,0,4],Cy:[function(a,b,c){var z,y,x,w,v,u
z=a.length
if(c>>>0!==c||c>=z)return H.a(a,c)
y=a[c]
x=c-1
if(x<0)return H.a(a,x)
x=a[x]
w=U.c6(b,y)
y=w>>>24
z=w>>>16&255
v=w>>>8&255
u=w>>>0&255
return(U.cR(y+C.a.al(y-(x>>>24),2))<<24|U.cR(z+C.a.al(z-(x>>>16&255),2))<<16|U.cR(v+C.a.al(v-(x>>>8&255),2))<<8|U.cR(u+C.a.al(u-(x>>>0&255),2)))>>>0},"$3","xz",6,0,4]}},
wk:{
"^":"o;A:a>",
hY:function(a,b){var z,y,x,w,v
z=$.$get$e0()
z[0]=a
y=$.$get$eT()
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
z[0]=b
if(0>=x)return H.a(y,0)
v=y[0]
$.$get$k6()[0]=w*v
y=$.$get$nh()
if(0>=y.length)return H.a(y,0)
return y[0]>>>5}},
uR:{
"^":"o;a,N:b>,M:c>,d,e,f,r,x,y,z",
gkJ:function(){var z=this.d
if(typeof z!=="number")return z.U()
z=z>1||this.e>=4||this.f>1||this.r!==0
if(z)return!1
return!0},
pR:function(a,b,c){var z,y,x,w,v,u,t
if(!this.gkJ())return!1
z=this.e
if(z>=4)return H.a(C.ad,z)
y=C.ad[z]
if(this.d===0){z=this.b
if(typeof z!=="number")return H.b(z)
x=a*z
w=J.d(b,z)
z=this.a;(c&&C.j).aH(c,x,w,z.a,J.c(J.h(z.d,z.b),x))}else{if(typeof b!=="number")return H.b(b)
z=a+b
v=this.y
v.fy=c
if(this.z){u=v.c
z=v.nu(u.a,u.b,z)}else{u=v.dy
t=v.c
v=v.hq(u,t.a,t.b,z,v.gnL())
z=v}if(!z)return!1}if(y!=null){z=this.b
y.$6(z,this.c,z,a,b,c)}if(this.f===1)if(!this.nF(c,this.b,this.c,a,b))return!1
if(typeof b!=="number")return H.b(b)
if(a+b===this.c)this.x=!0
return!0},
nF:function(a,b,c,d,e){var z
if(a!=null)if(!J.aG(b,0))if(!J.aG(c,0))if(d>=0)if(!J.K(e,0)){if(typeof e!=="number")return H.b(e)
if(typeof c!=="number")return H.b(c)
z=d+e>c}else z=!0
else z=!0
else z=!0
else z=!0
else z=!0
if(z)return!1
return!0},
nv:function(){var z,y,x,w,v
z=new U.jO(!1,!1,0,"","","",0,[],null,null,null,null,null,null,null,0,0,4294967295)
z.a=this.b
z.b=this.c
y=U.fV(this.a,z)
this.y=y
y.go=this.b
y.id=this.c
y.eC(z.a,z.b,!0)
y=this.y
x=y.db
w=x.length
if(w===1){if(0>=w)return H.a(x,0)
y=x[0].a===3&&y.o6()}else y=!1
if(y){this.z=!0
y=this.y
x=y.c
v=J.d(x.a,x.b)
y.fx=0
x=J.y(v)
w=x.R(v,4)
if(typeof w!=="number")return H.b(w)
w=new Uint8Array(H.k(x.j(v,4-w)))
y.fr=w
w=w.buffer
y.dy=(w&&C.e).dT(w,0,null)}else{this.z=!1
this.y.j1()}return!0}},
uW:{
"^":"o;G:a*,F:b*,N:c>,M:d>,i_:e',kn:f?,r,x,y"},
h6:{
"^":"o;a,b,c,d,e,f",
eG:function(a){var z,y
if(a===0)return!1
z=(a<<1>>>0)-1
this.e=z
z=H.k(z<<1>>>0)
y=new Int32Array(z)
this.d=y
if(1>=z)return H.a(y,1)
y[1]=-1
this.f=1
C.j.aF(this.a,0,128,255)
return!0},
kk:function(a,b){var z,y,x,w,v,u,t
for(z=a.length,y=0,x=0,w=0;w<b;++w){if(w>=z)return H.a(a,w)
if(a[w]>0){++y
x=w}}if(!this.eG(y))return!1
if(y===1){if(x<0||x>=b)return!1
return this.hf(x,0,0)}v=H.k(b)
u=new Int32Array(v)
if(!this.o0(a,b,u))return!1
for(w=0;w<b;++w){if(w>=z)return H.a(a,w)
t=a[w]
if(t>0){if(w>=v)return H.a(u,w)
if(!this.hf(w,u[w],t))return!1}}return this.f===this.e},
pC:function(a,b,c,d,e){var z,y,x
if(!this.eG(e))return!1
for(z=0;z<e;++z){if(z>=2)return H.a(b,z)
y=b[z]
if(y!==-1){x=c[z]
if(x>=d)return this.f===this.e
if(!this.hf(x,y,a[z]))return this.f===this.e}}return this.f===this.e},
cW:function(a){var z,y,x,w,v,u,t,s,r
z=a.l_()
y=a.a
x=z&127
w=this.a[x]
if(w<=7){a.a=y+w
return this.b[x]}v=this.c[x]
y+=7
z=z>>>7
u=this.d
do{t=(v<<1>>>0)+1
s=u.length
if(t>=s)return H.a(u,t)
v=v+u[t]+(z&1)
z=z>>>1;++y
t=v<<1>>>0
r=t+1
if(r>=s)return H.a(u,r)}while(u[r]!==0)
a.a=y
u=this.d
if(t>=u.length)return H.a(u,t)
return u[t]},
hf:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o
if(c<=7){z=this.jX(b,c)
for(y=C.a.u(1,7-c),x=this.b,w=this.a,v=0;v<y;++v){u=(z|C.a.u(v,c))>>>0
if(u>=128)return H.a(x,u)
x[u]=a
w[u]=c}}else z=this.jX(C.a.D(b,c-7),7)
for(y=this.c,t=7,s=0;r=c-1,c>0;c=r){x=this.e
if(s>=x)return!1
w=this.d
q=(s<<1>>>0)+1
p=w.length
if(q>=p)return H.a(w,q)
o=w[q]
if(o<0){o=this.f
if(o===x)return!1
w[q]=o-s
this.f=o+2
x=(o<<1>>>0)+1
if(x>=p)return H.a(w,x)
w[x]=-1
o=(o+1<<1>>>0)+1
if(o>=p)return H.a(w,o)
w[o]=-1}else if(o===0)return!1
if(q>=p)return H.a(w,q)
s+=w[q]+(C.a.D(b,r)&1);--t
if(t===0){if(z>=128)return H.a(y,z)
y[z]=s}}y=this.d
x=s<<1>>>0
w=x+1
q=y.length
if(w>=q)return H.a(y,w)
p=y[w]
if(p<0)y[w]=0
else if(p!==0)return!1
if(x>=q)return H.a(y,x)
y[x]=a
return!0},
jX:function(a,b){var z,y
z=C.Z[a&15]
y=C.a.p(a,4)
if(y>=16)return H.a(C.Z,y)
return C.a.by((z<<4|C.Z[y])>>>0,8-b)},
o0:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o
z=H.k(16)
y=new Int32Array(z)
x=H.k(16)
w=new Int32Array(x)
for(v=a.length,u=0,t=0;u<b;++u){if(u>=v)return H.a(a,u)
s=a[u]
if(s>t)t=s}if(t>15)return!1
for(u=0;u<b;++u){if(u>=v)return H.a(a,u)
r=a[u]
if(r<0||r>=z)return H.a(y,r)
y[r]=y[r]+1}if(0>=z)return H.a(y,0)
y[0]=0
if(0>=x)return H.a(w,0)
w[0]=-1
for(q=1,p=0;q<=t;++q){r=q-1
if(r>=z)return H.a(y,r)
p=p+y[r]<<1>>>0
if(q>=x)return H.a(w,q)
w[q]=p}for(z=c.length,u=0;u<b;++u){if(u>=v)return H.a(a,u)
r=a[u]
if(r>0){if(r>=x)return H.a(w,r)
o=w[r]
w[r]=o+1
if(u>=z)return H.a(c,u)
c[u]=o}else{if(u>=z)return H.a(c,u)
c[u]=-1}}return!0}},
mZ:{
"^":"o;a",
h:function(a,b){var z,y
z=this.a
if(b>>>0!==b||b>=5)return H.a(z,b)
y=z[b]
if(y==null){y=new U.h6(new Uint8Array(H.k(128)),new Int16Array(H.k(128)),new Int16Array(H.k(128)),null,0,0)
y.eG(0)
z[b]=y
z=y}else z=y
return z},
n6:function(){var z,y,x,w
for(z=this.a,y=0;y<5;++y){x=new Uint8Array(128)
w=new Int16Array(128)
x=new U.h6(x,w,new Int16Array(128),null,0,0)
x.eG(0)
z[y]=x}},
static:{n_:function(){var z=new U.mZ(H.p(Array(5),[U.h6]))
z.n6()
return z}}},
jO:{
"^":"dz;d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,a,b,c"},
uS:{
"^":"d2;b,c,a",
ii:function(a){var z=U.aa(a,!1,null,0)
this.c=z
if(!this.jr(z))return!1
return!0},
es:function(a){var z,y
z=U.aa(a,!1,null,0)
this.c=z
if(!this.jr(z))return
z=new U.jO(!1,!1,0,"","","",0,[],null,null,null,null,null,null,null,0,0,4294967295)
this.b=z
if(!this.jt(this.c,z))return
z=this.b
z.ch=this.a
switch(z.f){case 3:return z
case 2:y=this.c
y.d=z.dy
if(!U.fV(y,z).eO())return
return this.b
case 1:y=this.c
y.d=z.dy
if(!new U.jC(y,z,null,null,null,new U.jF(null,null,null,null),new U.jI(null,null,null,null,null,null),new U.jD(null,null,null,null,new Int32Array(H.k(4)),new Int32Array(H.k(4))),new U.jJ(!1,!1,!0,new Int8Array(H.k(4)),new Int8Array(H.k(4))),null,null,null,null,null,null,null,null,null,null,null,H.p(Array(8),[U.eJ]),!1,null,H.p(Array(4),[U.fY]),null,null,null,null,new Uint8Array(H.k(4)),null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,null,null,null,null,null,null,null,null,null).eO())return
return this.b}return},
co:function(a){var z,y,x,w
z=this.c
if(z==null||this.b==null)return
y=this.b
if(y.e){y=y.Q
x=y.length
if(a>=x||!1)return
if(a>=x)return H.a(y,a)
w=y[a]
return this.jf(z.dz(w.y,w.x),a)}x=y.f
if(x===2)return U.fV(z.dz(y.fr,y.dy),this.b).cn()
else if(x===1)return new U.jC(z.dz(y.fr,y.dy),this.b,null,null,null,new U.jF(null,null,null,null),new U.jI(null,null,null,null,null,null),new U.jD(null,null,null,null,new Int32Array(H.k(4)),new Int32Array(H.k(4))),new U.jJ(!1,!1,!0,new Int8Array(H.k(4)),new Int8Array(H.k(4))),null,null,null,null,null,null,null,null,null,null,null,H.p(Array(8),[U.eJ]),!1,null,H.p(Array(4),[U.fY]),null,null,null,null,new Uint8Array(H.k(4)),null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,null,null,null,null,null,null,null,null,null).cn()
return},
dj:function(a,b){var z
this.es(a)
z=this.b
z.cx=0
z.cy=1
return this.co(b)},
jf:function(a,b){var z,y,x,w,v
z=[]
y=new U.jO(!1,!1,0,"","","",0,z,null,null,null,null,null,null,null,0,0,4294967295)
if(!this.jt(a,y))return
if(y.f===0)return
x=this.b
y.cx=x.cx
y.cy=x.cy
y.ch=this.a
if(y.e){x=z.length
if(b>=x||!1)return
if(b>=x)return H.a(z,b)
w=z[b]
return this.jf(a.dz(w.y,w.x),b)}else{v=a.dz(y.fr,y.dy)
z=y.f
if(z===2)return U.fV(v,y).cn()
else if(z===1)return new U.jC(v,y,null,null,null,new U.jF(null,null,null,null),new U.jI(null,null,null,null,null,null),new U.jD(null,null,null,null,new Int32Array(H.k(4)),new Int32Array(H.k(4))),new U.jJ(!1,!1,!0,new Int8Array(H.k(4)),new Int8Array(H.k(4))),null,null,null,null,null,null,null,null,null,null,null,H.p(Array(8),[U.eJ]),!1,null,H.p(Array(4),[U.fY]),null,null,null,null,new Uint8Array(H.k(4)),null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,null,null,null,null,null,null,null,null,null).cn()}return},
jr:function(a){if(a.aj(4)!=="RIFF")return!1
a.q()
if(a.aj(4)!=="WEBP")return!1
return!0},
jt:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!1
while(!0){if(!(!J.a7(a.d,a.c)&&!z))break
y=a.aj(4)
x=a.q()
w=x+1>>>1<<1>>>0
v=a.d
u=a.b
t=J.h(v,u)
switch(y){case"VP8X":if(!this.nU(a,b))return!1
break
case"VP8 ":b.dy=J.h(a.d,u)
b.fr=x
b.f=1
z=!0
break
case"VP8L":b.dy=J.h(a.d,u)
b.fr=x
b.f=2
z=!0
break
case"ALPH":v=a.a
s=a.e
v=new U.ak(v,0,J.a0(v),0,s)
b.db=v
v.d=a.d
b.dx=x
a.d=J.c(a.d,w)
break
case"ANIM":b.f=3
r=a.q()
b.z=a.t()
b.c=(C.a.v(r&255,0,255)<<24|C.a.v(r>>>24&255,0,255)<<16|C.a.v(r>>>16&255,0,255)<<8|C.a.v(r>>>8&255,0,255))>>>0
break
case"ANMF":if(!this.nQ(a,b,x))return!1
break
case"ICCP":b.r=a.aj(x)
break
case"EXIF":b.x=a.aj(x)
break
case"XMP ":b.y=a.aj(x)
break
default:q="UNKNOWN WEBP TAG: "+y
H.nF(q)
a.d=J.c(a.d,w)
break}v=J.h(J.h(a.d,u),t)
if(typeof v!=="number")return H.b(v)
p=w-v
if(p>0)a.d=J.c(a.d,p)}if(!b.d)b.d=b.db!=null
return b.f!==0},
nU:function(a,b){var z,y,x,w,v
z=a.a
y=a.d
a.d=J.c(y,1)
x=J.e(z,y)
if(J.y(x).T(x,192)!==0)return!1
if(typeof x!=="number")return x.D()
C.b.p(x,5)
z=C.b.p(x,4)
C.b.p(x,3)
C.b.p(x,2)
y=C.b.p(x,1)
if((x&1)!==0)return!1
if(a.bD()!==0)return!1
w=J.c(a.bD(),1)
v=J.c(a.bD(),1)
b.a=w
b.b=v
b.e=(y&1)!==0
b.d=(z&1)!==0
return!0},
nQ:function(a,b,c){var z,y,x,w
z=new U.uW(null,null,null,null,null,null,1,null,null)
z.a=J.d(a.bD(),2)
z.b=J.d(a.bD(),2)
z.c=J.c(a.bD(),1)
z.d=J.c(a.bD(),1)
z.e=a.bD()
y=a.a
x=a.d
a.d=J.c(x,1)
w=J.e(y,x)
x=J.y(w)
y=x.T(w,127)
if(typeof y!=="number")return y.D()
y=y>>>7
z.r=y
z.f=x.T(w,1)!==0
z.x=J.h(a.d,a.b)
z.y=c-16
if(y!==0)return!1
b.Q.push(z)
return!0}},
lb:{
"^":"o;a,b,c,d,dS:e>,f",
gN:function(a){var z=this.a
if(z.ga6(z))z=0
else{z=z.gbK(z)
z=J.d_(z.gat(z))}return z},
gM:function(a){var z=this.a
if(z.ga6(z))z=0
else{z=z.gbK(z)
z=J.cZ(z.gat(z))}return z},
h:function(a,b){return this.a.h(0,b)},
eM:function(a){var z=a.a
this.a.k(0,z,a)
switch(z){case"R":this.b=a
break
case"G":this.c=a
break
case"B":this.d=a
break
case"A":this.e=a
break
case"Z":this.f=a
break}},
mf:function(a){var z,y,x,w,v,u,t,s,r
z=a.a
y=a.b
this.eM(U.ej("R",z,y,1))
this.eM(U.ej("G",z,y,1))
this.eM(U.ej("B",z,y,1))
if(a.y===4)this.eM(U.ej("A",z,y,1))
x=a.x.buffer
w=(x&&C.e).ad(x,0,null)
if(typeof y!=="number")return H.b(y)
x=w.length
v=0
u=0
for(;v<y;++v){if(typeof z!=="number")return H.b(z)
t=0
for(;t<z;++t){s=this.b
r=u+1
if(u<0||u>=x)return H.a(w,u)
s.fl(t,v,w[u]/255)
s=this.c
u=r+1
if(r<0||r>=x)return H.a(w,r)
s.fl(t,v,w[r]/255)
s=this.d
r=u+1
if(u<0||u>=x)return H.a(w,u)
s.fl(t,v,w[u]/255)
s=this.e
if(s!=null){u=r+1
if(r<0||r>=x)return H.a(w,r)
s.fl(t,v,w[r]/255)}else u=r}}},
static:{pD:function(a){var z=new U.lb(P.a5(),null,null,null,null,null)
z.mf(a)
return z}}},
pE:{
"^":"o;a3:a>,N:b>,M:c>,aa:d>,A:e>",
eo:function(){var z=this.e.buffer
return(z&&C.e).ad(z,0,null)},
d1:function(a,b){var z,y,x,w
z=this.b
if(typeof z!=="number")return H.b(z)
y=b*z+a
z=this.e
if(this.d===1){if(y>>>0!==y||y>=z.length)return H.a(z,y)
z=z[y]
if($.ff==null)U.l9()
x=$.ff
if(z>>>0!==z||z>=x.length)return H.a(x,z)
w=x[z]}else{if(y>>>0!==y||y>=z.length)return H.a(z,y)
w=z[y]}return w},
fl:function(a,b,c){var z,y,x
z=this.b
if(typeof z!=="number")return H.b(z)
y=b*z+a
z=this.d
if(z===2){z=this.e
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=c}else if(z===1){z=this.e
x=U.pA(c)
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=x}},
static:{ej:function(a,b,c,d){var z
if(d===1)z=new Uint16Array(H.k(J.d(b,c)))
else{z=J.w(b)
z=d===2?new Float32Array(H.k(z.i(b,c))):new Uint32Array(H.k(z.i(b,c)))}return new U.pE(a,b,c,d,z)}}},
x6:{
"^":"z:15;",
$2:function(a,b){return Math.log(H.v(a*b+1))/b}},
x5:{
"^":"z:15;a",
$2:function(a,b){var z,y
z=P.I(0,a*b)
if(z>1){y=this.a.$2(z-1,0.184874)
if(typeof y!=="number")return H.b(y)
z=1+y}H.v(z)
H.v(0.4545)
return Math.pow(z,0.4545)*84.66}},
ek:{
"^":"o;N:a>,M:b>,c,d,i_:e',f,r,A:x>,y",
eo:function(){var z=this.x.buffer
return(z&&C.e).ad(z,0,null)},
j:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.b
y=J.C(b)
x=P.X(z,y.gM(b))
w=this.a
v=P.X(w,y.gN(b))
for(y=this.x,u=y.length,t=0;t<x;++t)for(s=0;s<v;++s){if(typeof w!=="number")return H.b(w)
if(s<w){if(typeof z!=="number")return H.b(z)
r=t<z}else r=!1
if(r){if(typeof w!=="number")return H.b(w)
r=t*w+s
if(r>>>0!==r||r>=u)return H.a(y,r)
q=y[r]}else q=0
p=b.bb(s,t)
if(typeof p!=="number")return p.T()
r=C.a.v((q>>>24&255)+(p>>>24&255),0,255)
o=C.a.v((q>>>16&255)+(p>>>16&255),0,255)
n=C.a.v((q>>>8&255)+(p>>>8&255),0,255)
m=C.a.v((q&255)+(p&255),0,255)
if(typeof w!=="number")return H.b(w)
if(s<w){if(typeof z!=="number")return H.b(z)
l=t<z}else l=!1
if(l){if(typeof w!=="number")return H.b(w)
l=t*w+s
if(l>>>0!==l||l>=u)return H.a(y,l)
y[l]=(r<<24|o<<16|n<<8|m)>>>0}}return this},
l:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.b
y=J.C(b)
x=P.X(z,y.gM(b))
w=this.a
v=P.X(w,y.gN(b))
for(y=this.x,u=y.length,t=0;t<x;++t)for(s=0;s<v;++s){if(typeof w!=="number")return H.b(w)
if(s<w){if(typeof z!=="number")return H.b(z)
r=t<z}else r=!1
if(r){if(typeof w!=="number")return H.b(w)
r=t*w+s
if(r>>>0!==r||r>=u)return H.a(y,r)
q=y[r]}else q=0
p=b.bb(s,t)
if(typeof p!=="number")return p.T()
r=C.a.v((q>>>24&255)-(p>>>24&255),0,255)
o=C.a.v((q>>>16&255)-(p>>>16&255),0,255)
n=C.a.v((q>>>8&255)-(p>>>8&255),0,255)
m=C.a.v((q&255)-(p&255),0,255)
if(typeof w!=="number")return H.b(w)
if(s<w){if(typeof z!=="number")return H.b(z)
l=t<z}else l=!1
if(l){if(typeof w!=="number")return H.b(w)
l=t*w+s
if(l>>>0!==l||l>=u)return H.a(y,l)
y[l]=(r<<24|o<<16|n<<8|m)>>>0}}return this},
i:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.b
y=J.C(b)
x=P.X(z,y.gM(b))
w=this.a
v=P.X(w,y.gN(b))
for(y=this.x,u=y.length,t=0;t<x;++t)for(s=0;s<v;++s){if(typeof w!=="number")return H.b(w)
if(s<w){if(typeof z!=="number")return H.b(z)
r=t<z}else r=!1
if(r){if(typeof w!=="number")return H.b(w)
r=t*w+s
if(r>>>0!==r||r>=u)return H.a(y,r)
q=y[r]}else q=0
p=b.bb(s,t)
if(typeof p!=="number")return p.T()
r=C.a.v((q>>>24&255)*(p>>>24&255),0,255)
o=C.a.v((q>>>16&255)*(p>>>16&255),0,255)
n=C.a.v((q>>>8&255)*(p>>>8&255),0,255)
m=C.a.v((q&255)*(p&255),0,255)
if(typeof w!=="number")return H.b(w)
if(s<w){if(typeof z!=="number")return H.b(z)
l=t<z}else l=!1
if(l){if(typeof w!=="number")return H.b(w)
l=t*w+s
if(l>>>0!==l||l>=u)return H.a(y,l)
y[l]=(r<<24|o<<16|n<<8|m)>>>0}}return this},
h8:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.b
y=J.C(b)
x=P.X(z,y.gM(b))
w=this.a
v=P.X(w,y.gN(b))
for(y=this.x,u=y.length,t=0;t<x;++t)for(s=0;s<v;++s){if(typeof w!=="number")return H.b(w)
if(s<w){if(typeof z!=="number")return H.b(z)
r=t<z}else r=!1
if(r){if(typeof w!=="number")return H.b(w)
r=t*w+s
if(r>>>0!==r||r>=u)return H.a(y,r)
q=y[r]}else q=0
p=b.bb(s,t)
if(typeof p!=="number")return p.T()
r=C.a.v(q>>>24&255|p>>>24&255,0,255)
o=C.a.v(q>>>16&255|p>>>16&255,0,255)
n=C.a.v(q>>>8&255|p>>>8&255,0,255)
m=C.a.v((q&255|p&255)>>>0,0,255)
if(typeof w!=="number")return H.b(w)
if(s<w){if(typeof z!=="number")return H.b(z)
l=t<z}else l=!1
if(l){if(typeof w!=="number")return H.b(w)
l=t*w+s
if(l>>>0!==l||l>=u)return H.a(y,l)
y[l]=(r<<24|o<<16|n<<8|m)>>>0}}return this},
T:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.b
y=J.C(b)
x=P.X(z,y.gM(b))
w=this.a
v=P.X(w,y.gN(b))
for(y=this.x,u=y.length,t=0;t<x;++t)for(s=0;s<v;++s){if(typeof w!=="number")return H.b(w)
if(s<w){if(typeof z!=="number")return H.b(z)
r=t<z}else r=!1
if(r){if(typeof w!=="number")return H.b(w)
r=t*w+s
if(r>>>0!==r||r>=u)return H.a(y,r)
q=y[r]}else q=0
p=b.bb(s,t)
if(typeof p!=="number")return p.T()
r=C.a.v(q>>>24&255&p>>>24&255,0,255)
o=C.a.v(q>>>16&255&p>>>16&255,0,255)
n=C.a.v(q>>>8&255&p>>>8&255,0,255)
m=C.a.v((q&255&p&255)>>>0,0,255)
if(typeof w!=="number")return H.b(w)
if(s<w){if(typeof z!=="number")return H.b(z)
l=t<z}else l=!1
if(l){if(typeof w!=="number")return H.b(w)
l=t*w+s
if(l>>>0!==l||l>=u)return H.a(y,l)
y[l]=(r<<24|o<<16|n<<8|m)>>>0}}return this},
R:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.b
y=J.C(b)
x=P.X(z,y.gM(b))
w=this.a
v=P.X(w,y.gN(b))
for(y=this.x,u=y.length,t=0;t<x;++t)for(s=0;s<v;++s){if(typeof w!=="number")return H.b(w)
if(s<w){if(typeof z!=="number")return H.b(z)
r=t<z}else r=!1
if(r){if(typeof w!=="number")return H.b(w)
r=t*w+s
if(r>>>0!==r||r>=u)return H.a(y,r)
q=y[r]}else q=0
p=b.bb(s,t)
if(typeof p!=="number")return p.T()
r=C.a.R(q&255,p&255)
o=C.a.R(q>>>8&255,p>>>8&255)
n=C.a.R(q>>>16&255,p>>>16&255)
m=C.a.v(C.a.R(q>>>24&255,p>>>24&255),0,255)
n=C.a.v(n,0,255)
o=C.a.v(o,0,255)
r=C.a.v(r,0,255)
if(typeof w!=="number")return H.b(w)
if(s<w){if(typeof z!=="number")return H.b(z)
l=t<z}else l=!1
if(l){if(typeof w!=="number")return H.b(w)
l=t*w+s
if(l>>>0!==l||l>=u)return H.a(y,l)
y[l]=(m<<24|n<<16|o<<8|r)>>>0}}return this},
gn:function(a){return this.x.length},
h:function(a,b){var z=this.x
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.x
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c},
bb:function(a,b){var z,y
z=this.a
if(typeof z!=="number")return H.b(z)
if(a<z){if(typeof b!=="number")return b.av()
z=this.b
if(typeof z!=="number")return H.b(z)
z=b<z}else z=!1
if(z){z=this.x
y=this.a
if(typeof b!=="number")return b.i()
if(typeof y!=="number")return H.b(y)
y=b*y+a
if(y>>>0!==y||y>=z.length)return H.a(z,y)
y=z[y]
z=y}else z=0
return z},
E:function(a){return this.gn(this).$0()},
static:{c_:function(a,b,c){return new U.ek(a,b,0,0,0,1,1,new Uint32Array(H.k(J.d(a,b))),c)}}},
L:{
"^":"o;a",
K:function(a){return"ImageException: "+this.a}},
ak:{
"^":"o;am:a>,b,c,az:d*,e",
gn:function(a){return J.h(this.c,this.d)},
h:function(a,b){return J.e(this.a,J.c(this.d,b))},
k:function(a,b,c){J.u(this.a,J.c(this.d,b),c)
return c},
bB:function(a,b,c,d){var z,y
z=this.a
y=this.d
if(c instanceof U.ak)J.hn(z,J.c(y,a),J.c(J.c(this.d,a),b),c.a,J.c(c.d,d))
else J.hn(z,J.c(y,a),J.c(J.c(this.d,a),b),c,d)},
cT:function(a,b,c){return this.bB(a,b,c,0)},
qC:function(a,b,c){J.bY(this.a,J.c(this.d,a),J.c(J.c(this.d,a),b),c)},
iR:function(a,b,c){var z=J.c(c!=null?J.c(this.b,c):this.d,b)
return U.aa(this.a,this.e,a,z)},
eu:function(a){return this.iR(a,0,null)},
dz:function(a,b){return this.iR(a,0,b)},
bO:function(a,b){this.d=J.c(this.d,b)},
aP:function(a){var z=this.eu(a)
this.d=J.c(this.d,J.h(z.c,z.d))
return z},
aj:function(a){var z,y,x,w,v
if(a==null){z=[]
for(y=this.c;!J.a7(this.d,y);){x=this.a
w=this.d
this.d=J.c(w,1)
v=J.e(x,w)
if(J.i(v,0))return P.dT(z,0,null)
z.push(v)}throw H.l(new U.L("EOF reached without finding string terminator"))}return P.dT(this.aP(a).aD(),0,null)},
dt:function(){return this.aj(null)},
t:function(){var z,y,x,w
z=this.a
y=this.d
this.d=J.c(y,1)
x=J.W(J.e(z,y),255)
y=this.a
z=this.d
this.d=J.c(z,1)
w=J.W(J.e(y,z),255)
if(this.e){if(typeof x!=="number")return x.u()
if(typeof w!=="number")return H.b(w)
return(x<<8|w)>>>0}if(typeof w!=="number")return w.u()
if(typeof x!=="number")return H.b(x)
return(w<<8|x)>>>0},
bD:function(){var z,y,x,w,v
z=this.a
y=this.d
this.d=J.c(y,1)
x=J.W(J.e(z,y),255)
y=this.a
z=this.d
this.d=J.c(z,1)
w=J.W(J.e(y,z),255)
z=this.a
y=this.d
this.d=J.c(y,1)
v=J.W(J.e(z,y),255)
if(this.e){if(typeof w!=="number")return w.u()
z=J.be(v,w<<8>>>0)
if(typeof x!=="number")return x.u()
return J.be(z,x<<16>>>0)}if(typeof w!=="number")return w.u()
z=J.be(x,w<<8>>>0)
if(typeof v!=="number")return v.u()
return J.be(z,v<<16>>>0)},
q:function(){var z,y,x,w,v,u
z=this.a
y=this.d
this.d=J.c(y,1)
x=J.W(J.e(z,y),255)
y=this.a
z=this.d
this.d=J.c(z,1)
w=J.W(J.e(y,z),255)
z=this.a
y=this.d
this.d=J.c(y,1)
v=J.W(J.e(z,y),255)
y=this.a
z=this.d
this.d=J.c(z,1)
u=J.W(J.e(y,z),255)
if(this.e){if(typeof x!=="number")return x.u()
if(typeof w!=="number")return w.u()
if(typeof v!=="number")return v.u()
if(typeof u!=="number")return H.b(u)
return(x<<24|w<<16|v<<8|u)>>>0}if(typeof u!=="number")return u.u()
if(typeof v!=="number")return v.u()
if(typeof w!=="number")return w.u()
if(typeof x!=="number")return H.b(x)
return(u<<24|v<<16|w<<8|x)>>>0},
bE:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
y=this.d
this.d=J.c(y,1)
x=J.W(J.e(z,y),255)
y=this.a
z=this.d
this.d=J.c(z,1)
w=J.W(J.e(y,z),255)
z=this.a
y=this.d
this.d=J.c(y,1)
v=J.W(J.e(z,y),255)
y=this.a
z=this.d
this.d=J.c(z,1)
u=J.W(J.e(y,z),255)
z=this.a
y=this.d
this.d=J.c(y,1)
t=J.W(J.e(z,y),255)
y=this.a
z=this.d
this.d=J.c(z,1)
s=J.W(J.e(y,z),255)
z=this.a
y=this.d
this.d=J.c(y,1)
r=J.W(J.e(z,y),255)
y=this.a
z=this.d
this.d=J.c(z,1)
q=J.W(J.e(y,z),255)
if(this.e){if(typeof x!=="number")return x.u()
z=C.a.W(x,56)
if(typeof w!=="number")return w.u()
y=C.a.W(w,48)
if(typeof v!=="number")return v.u()
p=C.a.W(v,40)
if(typeof u!=="number")return u.u()
o=C.a.W(u,32)
if(typeof t!=="number")return t.u()
if(typeof s!=="number")return s.u()
if(typeof r!=="number")return r.u()
if(typeof q!=="number")return H.b(q)
return(z|y|p|o|t<<24|s<<16|r<<8|q)>>>0}if(typeof q!=="number")return q.u()
z=C.a.W(q,56)
if(typeof r!=="number")return r.u()
y=C.a.W(r,48)
if(typeof s!=="number")return s.u()
p=C.a.W(s,40)
if(typeof t!=="number")return t.u()
o=C.a.W(t,32)
if(typeof u!=="number")return u.u()
if(typeof v!=="number")return v.u()
if(typeof w!=="number")return w.u()
if(typeof x!=="number")return H.b(x)
return(z|y|p|o|u<<24|v<<16|w<<8|x)>>>0},
iy:function(a,b,c){var z,y
if(!!J.O(this.a).$iscp)return this.lb(b,c)
z=J.c(J.c(this.b,this.d),b)
y=J.aG(c,0)?this.c:J.c(z,c)
return J.o2(this.a,z,y)},
lb:function(a,b){var z,y,x,w
z=b!=null?b:J.h(J.h(this.c,this.d),a)
y=this.a
x=J.O(y)
if(!!x.$iscp){w=x.gam(y)
y=x.gkT(y)
x=this.d
if(typeof y!=="number")return y.j()
if(typeof x!=="number")return H.b(x)
return J.hk(w,y+x+a,z)}return new Uint8Array(H.n(x.b5(y,J.c(this.d,a),J.c(J.c(this.d,a),z))))},
aD:function(){return this.lb(0,null)},
r9:function(a){var z,y,x
z=this.a
y=J.O(z)
if(!!y.$iscp){x=y.gam(z)
z=y.gkT(z)
y=this.d
if(typeof z!=="number")return z.j()
if(typeof y!=="number")return H.b(y)
return J.km(x,z+y+a,null)}z=this.aD().buffer
return(z&&C.e).dT(z,0,null)},
fa:function(){return this.r9(0)},
E:function(a){return this.gn(this).$0()},
static:{aa:function(a,b,c,d){return new U.ak(a,d,c==null?J.a0(a):J.c(d,c),d,b)},R:function(a,b,c){var z,y,x,w
z=a.a
y=J.c(a.d,c)
x=a.b
w=b==null?a.c:J.c(J.c(a.d,c),b)
return new U.ak(z,x,w,y,a.e)}}},
rc:{
"^":"o;n:a*,b,c",
eo:function(){var z=this.c.buffer
return(z&&C.e).ad(z,0,this.a)},
h3:function(a){var z,y,x
if(this.a===this.c.length)this.dI()
z=this.c
y=this.a++
x=J.W(a,255)
if(y>=z.length)return H.a(z,y)
z[y]=x},
rr:function(a){if(this.b){if(typeof a!=="number")return a.D()
this.h3(C.b.p(a,8)&255)
this.h3(a&255)
return}this.h3(J.y(a).T(a,255))
if(typeof a!=="number")return a.D()
this.h3(C.b.p(a,8)&255)},
o2:function(a){var z,y
z=this.c
y=new Uint8Array(z.length+32768)
z=this.c
C.j.cC(y,0,z.length,z)
this.c=y},
dI:function(){return this.o2(null)},
E:function(a){return this.a.$0()},
static:{iK:function(a,b){return new U.rc(0,a,new Uint8Array(H.k(b==null?32768:b)))}}}}],["","",,O,{
"^":"",
hC:{
"^":"o9;d,e,bg:f<,a,b,c",
d6:function(a,b,c){return J.F(G.J(b,c),0)?this.d:G.q(0)},
ds:function(a){return this.d.i(0,this.f).i(0,3.141592653589793)},
cO:function(){return!1},
ao:function(a,b){return this.e.ao(a,b)},
bL:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t
z=new Float32Array(3)
y=new G.a1(z)
if(0>=3)return H.a(z,0)
z[0]=0
if(1>=3)return H.a(z,1)
z[1]=0
if(2>=3)return H.a(z,2)
z[2]=0
z=this.e
x=z.c1(c,y,a)
w=x.l(0,a)
e.L(w.w(0,w.E(0)))
f[0]=z.ao(a,e)
z=x.l(0,a).a_()
v=Math.sqrt(z)
z=x.l(0,a).a
w=z.length
if(0>=w)return H.a(z,0)
u=z[0]
if(1>=w)return H.a(z,1)
t=z[1]
if(2>=w)return H.a(z,2)
z=z[2]
w=new Float32Array(3)
if(0>=3)return H.a(w,0)
w[0]=u/v
if(1>=3)return H.a(w,1)
w[1]=t/v
if(2>=3)return H.a(w,2)
w[2]=z/v
if(a==null){z=new Float32Array(3)
u=new G.j(z)
if(0>=3)return H.a(z,0)
z[0]=0
if(1>=3)return H.a(z,1)
z[1]=0
if(2>=3)return H.a(z,2)
z[2]=0
z=u}else z=new G.j(new Float32Array(H.n(J.N(a))))
w=new G.r(new Float32Array(H.n(w)))
g.a=new G.aK(z,w,b,v*0.999,d,0)
w=e.a
z=w.length
if(0>=z)return H.a(w,0)
u=w[0]
if(1>=z)return H.a(w,1)
t=w[1]
if(2>=z)return H.a(w,2)
w=w[2]
z=new Float32Array(3)
if(0>=3)return H.a(z,0)
z[0]=-u
if(1>=3)return H.a(z,1)
z[1]=-t
if(2>=3)return H.a(z,2)
z[2]=-w
return J.F(G.J(y,new G.r(z)),0)?this.d:G.q(0)},
cd:function(a,b,c,d,e,f,g,h){var z,y,x
z=this.e
y=z.h9(b,g)
x=G.bv(c,d)
if(J.K(G.J(x,g),0))x=x.i(0,-1)
f.a=y
f.b=x
f.c=0.001
f.d=1/0
f.e=e
z=z.is(y)
if(0>=h.length)return H.a(h,0)
h[0]=z*0.15915494309189535
return J.F(G.J(g,x),0)?this.d:G.q(0)},
static:{zH:[function(a,b,c){var z,y,x,w,v,u
z=b.a8("L",G.q(1))
y=b.a8("scale",G.q(1))
x=b.V("nsamples",1)
w=G.am(J.d(z,y),0)
v=G.ty(c)
u=P.I(1,x)
u=new O.hC(w,v,null,G.aC(a),G.aC(G.Z(a.gan(),a.a)),u)
u.d7(a,x)
u.f=v.b
return u},"$3","nD",6,0,72]}},
hH:{
"^":"cD;d,e,a,b,c",
cO:function(){return!0},
ds:function(a){var z,y
z=new G.j(new Float32Array(H.k(3)))
z.C(0,0,0)
y=a.d.dU(z)
return J.d(J.d(J.d(this.e,3.141592653589793),y),y)},
bL:function(a,b,c,d,e,f,g){var z,y
e.L(this.d)
f[0]=1
if(a==null){z=new Float32Array(3)
y=new G.j(z)
if(0>=3)return H.a(z,0)
z[0]=0
if(1>=3)return H.a(z,1)
z[1]=0
if(2>=3)return H.a(z,2)
z[2]=0
z=y}else z=new G.j(new Float32Array(H.n(J.N(a))))
y=new G.r(new Float32Array(H.n(e.a)))
g.a=new G.aK(z,y,b,1/0,d,0)
return this.e},
cd:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t,s,r
z=new G.j(new Float32Array(H.k(3)))
z.C(0,0,0)
y=a.d.dU(z)
x=G.B(0,0,0)
w=G.B(0,0,0)
G.cS(this.d,x,w)
v=[0]
u=[0]
t=b.a
s=t.length
if(0>=s)return H.a(t,0)
r=t[0]
if(1>=s)return H.a(t,1)
G.cx(r,t[1],v,u)
f.cA(z.j(0,x.i(0,v[0]).j(0,w.i(0,u[0])).i(0,y)).j(0,J.d(this.d,y)),J.M(this.d),0,1/0,e)
g.L(f.b)
if(0>=h.length)return H.a(h,0)
h[0]=1/(3.141592653589793*y*y)
return this.e},
ao:function(a,b){return 0},
d6:function(a,b,c){return this.e.$3(a,b,c)},
static:{zM:[function(a,b){var z,y,x,w,v,u,t
z=b.a8("L",G.q(1))
y=b.a8("scale",G.q(1))
x=new G.j(new Float32Array(H.k(3)))
x.C(0,0,0)
w=b.bq("from",x)
x=new G.j(new Float32Array(H.k(3)))
x.C(0,0,1)
v=J.h(w,b.bq("to",x))
x=J.d(z,y)
u=P.I(1,1)
t=G.aC(a)
u=new O.hH(null,null,t,G.aC(G.Z(a.gan(),a.a)),u)
u.d7(a,1)
t=t.ag(v)
u.d=t.w(0,t.E(0))
u.e=x
return u},"$2","xX",4,0,73]}},
hU:{
"^":"cD;d,e,f,a,b,c",
bL:function(a,b,c,d,e,f,g){var z,y,x,w,v,u
z=this.d.l(0,a)
e.L(z.w(0,z.E(0)))
f[0]=1
z=this.d
y=z.l(0,a).a_()
x=Math.sqrt(y)
z=z.l(0,a).a
y=z.length
if(0>=y)return H.a(z,0)
w=z[0]
if(1>=y)return H.a(z,1)
v=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
y=new Float32Array(3)
if(0>=3)return H.a(y,0)
y[0]=w/x
if(1>=3)return H.a(y,1)
y[1]=v/x
if(2>=3)return H.a(y,2)
y[2]=z/x
if(a==null){z=new Float32Array(3)
w=new G.j(z)
if(0>=3)return H.a(z,0)
z[0]=0
if(1>=3)return H.a(z,1)
z[1]=0
if(2>=3)return H.a(z,2)
z[2]=0
z=w}else z=new G.j(new Float32Array(H.n(J.N(a))))
y=new G.r(new Float32Array(H.n(y)))
g.a=new G.aK(z,y,b,x,d,0)
y=this.e
z=e.a
w=z.length
if(0>=w)return H.a(z,0)
v=z[0]
if(1>=w)return H.a(z,1)
u=z[1]
if(2>=w)return H.a(z,2)
z=z[2]
w=new Float32Array(3)
if(0>=3)return H.a(w,0)
w[0]=-v
if(1>=3)return H.a(w,1)
w[1]=-u
if(2>=3)return H.a(w,2)
w[2]=-z
return J.G(J.d(y,this.b4(0,new G.r(w))),J.h(a,this.d).a_())},
cO:function(){return!0},
b4:function(a,b){var z,y,x,w,v
z=this.b.ag(b)
y=z.w(0,z.E(0))
x=y.gF(y)
y.sF(0,y.gS(y))
y.sS(0,x)
w=Math.acos(H.v(C.b.v(y.gS(y),-1,1)))
v=G.eN(y)
z=this.f
return z==null?1:G.am(z.e5(v*0.15915494309189535,w*0.3183098861837907),1)},
ds:function(a){var z,y
z=J.d(this.e,12.566370614359172)
y=this.f
return J.d(z,G.am(y!=null?y.bX(0.5,0.5,0.5):G.q(1),1))},
cd:function(a,b,c,d,e,f,g,h){var z,y,x,w
z=this.d
y=b.a
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
if(1>=x)return H.a(y,1)
f.cA(z,G.bv(w,y[1]),0,1/0,e)
g.L(f.b)
if(0>=h.length)return H.a(h,0)
h[0]=0.07957747154594767
return J.d(this.e,this.b4(0,f.b))},
ao:function(a,b){return 0},
mc:function(a,b,c){var z,y
z=new G.j(new Float32Array(H.k(3)))
z.C(0,0,0)
this.d=this.a.a1(z)
if(J.bE(c)){y=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
$.au.fX(c,y.a).ai(new O.pz(this,c,y))}},
static:{py:function(a,b,c){var z=P.I(1,1)
z=new O.hU(null,b,null,G.aC(a),G.aC(G.Z(a.gan(),a.a)),z)
z.d7(a,1)
z.mc(a,b,c)
return z},Ao:[function(a,b){var z,y,x
z=b.a8("I",G.q(1))
y=b.a8("scale",G.q(1))
x=b.bp("mapname","")
return O.py(a,J.d(z,y),x)},"$2","xY",4,0,74]}},
pz:{
"^":"z:9;a,b,c",
$1:function(a){var z,y,x
z=this.b
y=G.fl(z,!1,1,8,1,!0,0)
x=this.a
if($.au.e.O(y))x.f=$.au.fh(y)
else{z=G.dH(a,z,!1,8,0)
x.f=z
$.au.e.k(0,y,z)}this.c.aM(0)}},
i5:{
"^":"cD;d,e,f,a,b,c",
ds:function(a){var z,y
z=new G.j(new Float32Array(H.k(3)))
z.C(0,0,0)
y=a.d.dU(z)
return G.am(J.d(this.e.bX(0.5,0.5,0.5),this.d),1).i(0,3.141592653589793*y*y)},
cO:function(){return!1},
aS:function(a){var z,y,x
z=this.b.ag(a.gbc())
y=z.w(0,z.E(0))
z=G.eN(y)
x=Math.acos(H.v(C.b.v(y.gS(y),-1,1)))
return G.am(J.d(this.e.bX(z*0.15915494309189535,x*0.3183098861837907,0),this.d),1)},
bL:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o
z=[0,0]
y=[0]
x=this.f
w=c.a
v=w.length
if(0>=v)return H.a(w,0)
u=w[0]
if(1>=v)return H.a(w,1)
x.iI(u,w[1],z,y)
if(y[0]===0)return G.q(0)
t=J.d(z[1],3.141592653589793)
s=J.d(J.d(z[0],2),3.141592653589793)
x=typeof t!=="number"
if(x)H.T(H.Y(t))
r=Math.cos(t)
if(x)H.T(H.Y(t))
q=Math.sin(t)
x=typeof s!=="number"
if(x)H.T(H.Y(s))
p=Math.sin(s)
if(x)H.T(H.Y(s))
o=Math.cos(s)
x=new Float32Array(3)
if(0>=3)return H.a(x,0)
x[0]=q*o
if(1>=3)return H.a(x,1)
x[1]=q*p
if(2>=3)return H.a(x,2)
x[2]=r
e.L(this.a.ag(new G.r(x)))
if(q===0)f[0]=0
else f[0]=y[0]/(19.739208802178716*q)
if(a==null){x=new Float32Array(3)
w=new G.j(x)
if(0>=3)return H.a(x,0)
x[0]=0
if(1>=3)return H.a(x,1)
x[1]=0
if(2>=3)return H.a(x,2)
x[2]=0
x=w}else x=new G.j(new Float32Array(H.n(J.N(a))))
w=new G.r(new Float32Array(H.n(e.a)))
g.a=new G.aK(x,w,b,1/0,d,0)
w=z[0]
x=z[1]
return G.am(J.d(this.e.bX(w,x,0),this.d),1)},
cd:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=[0,0]
y=[0]
x=this.f
w=b.a
v=w.length
if(0>=v)return H.a(w,0)
u=w[0]
if(1>=v)return H.a(w,1)
x.iI(u,w[1],z,y)
if(y[0]===0)return G.q(0)
t=J.d(z[1],3.141592653589793)
s=J.d(J.d(z[0],2),3.141592653589793)
r=Math.cos(H.v(t))
q=Math.sin(H.v(t))
p=Math.sin(H.v(s))
o=this.a.ag(G.B(q*Math.cos(H.v(s)),q*p,r)).a2(0)
g.L(o)
n=new G.j(new Float32Array(H.k(3)))
n.C(0,0,0)
m=a.d.dU(n)
l=G.B(0,0,0)
k=G.B(0,0,0)
G.cS(o.a2(0),l,k)
j=[0]
i=[0]
G.cx(c,d,j,i)
f.cA(n.j(0,l.i(0,j[0]).j(0,k.i(0,i[0])).i(0,m)).j(0,o.a2(0).i(0,m)),o,0,1/0,e)
x=h.length
if(q===0){if(0>=x)return H.a(h,0)
h[0]=0}else{w=y[0]
if(0>=x)return H.a(h,0)
h[0]=w/(19.739208802178716*q)*(1/(3.141592653589793*m*m))}x=z[0]
w=z[1]
return G.am(J.d(this.e.bX(x,w,0),this.d),1)},
ao:function(a,b){var z,y,x,w
z=this.b.ag(b)
y=Math.acos(H.v(J.a4(z.gS(z),-1,1)))
x=G.eN(z)
w=Math.sin(H.v(y))
if(w===0)return 0
return this.f.ao(x*0.15915494309189535,y*0.3183098861837907)/(19.739208802178716*w)},
ha:function(a,b,a0,a1,a2,a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
if(a2){this.lJ(a,b,a0,a1,!0,a3,a4,a5)
return}z=J.w(a0)
y=J.d(z.j(a0,1),z.j(a0,1))
if(typeof y!=="number")return H.b(y)
z=a5.length
x=0
for(;x<y;++x){w=G.q(0)
if(x>=z)return H.a(a5,x)
a5[x]=w}w=this.e
v=w.f
u=w.e
if(P.X(v,u)>50){if(typeof v!=="number")return H.b(v)
if(typeof u!=="number")return H.b(u)
w=H.k(2*v+2*u)
t=new Float32Array(w)
s=0+v
r=s+v
q=r+u
for(p=0;p<v;++p){o=(p+0.5)/v*3.141592653589793
n=Math.sin(o)
if(p>=w)return H.a(t,p)
t[p]=n
n=s+p
o=Math.cos(o)
if(n>>>0!==n||n>=w)return H.a(t,n)
t[n]=o}for(m=0;m<u;++m){o=r+m
n=(m+0.5)/u*2*3.141592653589793
l=Math.sin(n)
if(o>>>0!==o||o>=w)return H.a(t,o)
t[o]=l
l=q+m
o=Math.cos(n)
if(l>>>0!==l||l>=w)return H.a(t,l)
t[l]=o}o=H.k(y)
k=new Float32Array(o)
j=3.141592653589793/v*(6.283185307179586/u)
for(n=this.a,p=0;p<v;++p)for(l=s+p,m=0;m<u;++m){if(p>=w)return H.a(t,p)
i=t[p]
h=q+m
if(h>>>0!==h||h>=w)return H.a(t,h)
h=t[h]
g=r+m
if(g>>>0!==g||g>=w)return H.a(t,g)
g=t[g]
if(l>>>0!==l||l>=w)return H.a(t,l)
f=t[l]
e=new Float32Array(3)
if(0>=3)return H.a(e,0)
e[0]=i*h
if(1>=3)return H.a(e,1)
e[1]=i*g
if(2>=3)return H.a(e,2)
e[2]=f
e=n.ag(new G.r(e))
d=e.w(0,e.E(0))
c=G.am(this.e.bG(0,m,p),1)
G.bn(d,a0,k,0)
for(x=0;x<y;++x){if(x>=z)return H.a(a5,x)
i=a5[x]
if(x>=o)return H.a(k,x)
a5[x]=J.c(i,c.i(0,J.d(J.d(k[x],t[p]),j)))}}}else G.tN(new O.vG(this,a1,a3,b,!1),a,200,a0,a5)},
hQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=a.e
y=a.f
this.e=a
x=1/P.I(z,y)
w=H.k(J.d(z,y))
v=new Float32Array(w)
if(typeof y!=="number")return H.b(y)
u=0
for(;u<y;++u){if(typeof z!=="number")return H.b(z)
t=u*z
s=u/y
r=Math.sin(3.141592653589793*(u+0.5)/y)
for(q=0;q<z;++q){p=q+t
o=J.d(this.e.bX(q/z,s,x),this.d).aC()
if(p>>>0!==p||p>=w)return H.a(v,p)
v[p]=o
v[p]=v[p]*r}}this.f=G.oN(v,z,y)},
ml:function(a,b,c,d){var z,y
if(J.bE(d)){z=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
$.au.fX(d,z.a).ai(new O.pT(this,d,z))}y=G.dR(1,1,3)
y.k(0,0,G.q(1))
this.hQ(G.dH(y,d,!1,8,0),d)},
d6:function(a,b,c){return this.d.$3(a,b,c)},
static:{pS:function(a,b,c,d){var z=P.I(1,c)
z=new O.i5(b,null,null,G.aC(a),G.aC(G.Z(a.gan(),a.a)),z)
z.d7(a,c)
z.ml(a,b,c,d)
return z},AB:[function(a,b){var z,y,x,w
z=b.a8("L",G.q(1))
y=b.a8("scale",G.q(1))
x=b.bp("mapname","")
w=b.V("nsamples",1)
return O.pS(a,J.d(z,y),w,x)},"$2","xZ",4,0,75]}},
pT:{
"^":"z:9;a,b,c",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.b
y=this.a
x=G.fl(z,!1,1,8,y.d,!0,0)
if($.au.e.O(x))y.hQ($.au.fh(x),z)
else{w=G.j8(a)
v=w.a
u=w.b
t=J.w(v)
s=0
while(!0){r=t.i(v,u)
if(typeof r!=="number")return H.b(r)
if(!(s<r))break
w.k(0,s,J.d(w.h(0,s),y.d.h_()));++s}q=G.dH(w,z,!1,8,0)
$.au.e.k(0,x,q)
y.hQ(q,z)}this.c.aM(0)}},
vG:{
"^":"o:47;a,b,c,d,e",
$2:function(a,b){var z=G.aO(a,b,this.d,1/0,this.c,0)
if(!this.e||!this.b.a5(z))return this.a.aS(G.m2(z))
return G.q(0)}},
iS:{
"^":"cD;d,e,a,b,c",
bL:function(a,b,c,d,e,f,g){var z,y,x,w,v
z=this.d.l(0,a)
e.L(z.w(0,z.E(0)))
f[0]=1
z=this.d
y=z.l(0,a).a_()
x=Math.sqrt(y)
z=z.l(0,a).a
y=z.length
if(0>=y)return H.a(z,0)
w=z[0]
if(1>=y)return H.a(z,1)
v=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
y=new Float32Array(3)
if(0>=3)return H.a(y,0)
y[0]=w/x
if(1>=3)return H.a(y,1)
y[1]=v/x
if(2>=3)return H.a(y,2)
y[2]=z/x
if(a==null){z=new Float32Array(3)
w=new G.j(z)
if(0>=3)return H.a(z,0)
z[0]=0
if(1>=3)return H.a(z,1)
z[1]=0
if(2>=3)return H.a(z,2)
z[2]=0
z=w}else z=new G.j(new Float32Array(H.n(J.N(a))))
y=new G.r(new Float32Array(H.n(y)))
g.a=new G.aK(z,y,b,x,d,0)
return J.G(this.e,J.h(a,this.d).a_())},
ds:function(a){return J.d(this.e,12.566370614359172)},
cO:function(){return!0},
cd:function(a,b,c,d,e,f,g,h){var z,y,x
f.a=new G.j(new Float32Array(H.n(this.d.a)))
z=b.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
z=G.bv(x,z[1])
f.b=z
f.c=0
f.d=1/0
f.e=e
g.L(z)
if(0>=h.length)return H.a(h,0)
h[0]=0.07957747154594767
return G.am(this.e,0)},
ao:function(a,b){return 0},
ha:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t,s
z=J.w(c)
y=h.length
x=0
while(!0){w=J.d(z.j(c,1),z.j(c,1))
if(typeof w!=="number")return H.b(w)
if(!(x<w))break
w=G.q(0)
if(x>=y)return H.a(h,x)
h[x]=w;++x}if(e){w=this.d.l(0,a)
w=d.a5(G.aO(a,w.w(0,w.E(0)),b,Math.sqrt(H.v(a.l(0,this.d).a_())),f,0))}else w=!1
if(w)return
w=J.d(z.j(c,1),z.j(c,1))
if(typeof w!=="number")return H.b(w)
v=H.p(Array(w),[P.a3])
w=this.d.l(0,a)
G.bn(w.w(0,w.E(0)),c,v,0)
u=J.G(this.e,a.l(0,this.d).a_())
w=v.length
t=J.w(u)
x=0
while(!0){s=J.d(z.j(c,1),z.j(c,1))
if(typeof s!=="number")return H.b(s)
if(!(x<s))break
if(x>=w)return H.a(v,x)
s=t.i(u,v[x])
if(x>=y)return H.a(h,x)
h[x]=s;++x}},
static:{Bs:[function(a,b){var z,y,x,w
z=b.a8("I",G.q(1))
y=b.a8("scale",G.q(1))
x=new G.j(new Float32Array(H.k(3)))
x.C(0,0,0)
w=G.cQ(b.bq("from",x)).i(0,a)
a=J.d(z,y)
x=P.I(1,1)
x=new O.iS(null,a,G.aC(w),G.aC(G.Z(w.b,w.a)),x)
x.d7(w,1)
a=new G.j(new Float32Array(H.k(3)))
a.C(0,0,0)
x.d=w.a1(a)
return x},"$2","y_",4,0,76]}},
iV:{
"^":"cD;d,e,f,r,x,y,z,Q,ch,cx,cy,a,b,c",
bL:function(a,b,c,d,e,f,g){var z,y,x,w,v,u
z=this.e.l(0,a)
e.L(z.w(0,z.E(0)))
f[0]=1
z=this.e
y=z.l(0,a).a_()
x=Math.sqrt(y)
z=z.l(0,a).a
y=z.length
if(0>=y)return H.a(z,0)
w=z[0]
if(1>=y)return H.a(z,1)
v=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
y=new Float32Array(3)
if(0>=3)return H.a(y,0)
y[0]=w/x
if(1>=3)return H.a(y,1)
y[1]=v/x
if(2>=3)return H.a(y,2)
y[2]=z/x
if(a==null){z=new Float32Array(3)
w=new G.j(z)
if(0>=3)return H.a(z,0)
z[0]=0
if(1>=3)return H.a(z,1)
z[1]=0
if(2>=3)return H.a(z,2)
z[2]=0
z=w}else z=new G.j(new Float32Array(H.n(J.N(a))))
y=new G.r(new Float32Array(H.n(y)))
g.a=new G.aK(z,y,b,x,d,0)
y=this.f
z=e.a
w=z.length
if(0>=w)return H.a(z,0)
v=z[0]
if(1>=w)return H.a(z,1)
u=z[1]
if(2>=w)return H.a(z,2)
z=z[2]
w=new Float32Array(3)
if(0>=3)return H.a(w,0)
w[0]=-v
if(1>=3)return H.a(w,1)
w[1]=-u
if(2>=3)return H.a(w,2)
w[2]=-z
return J.G(J.d(y,this.l0(new G.r(w))),J.h(a,this.e).a_())},
cO:function(){return!0},
l0:function(a){var z,y,x,w,v,u,t
z=this.b.ag(a)
if(J.K(z.gS(z),this.x))return G.q(0)
y=this.r.a1(new G.j(new Float32Array(H.n(z.gA(z))))).a
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
v=this.z
if(typeof v!=="number")return H.b(v)
if(!(w<v)){u=this.Q
if(typeof u!=="number")return H.b(u)
if(!(w>u)){if(1>=x)return H.a(y,1)
u=y[1]
t=this.ch
if(typeof t!=="number")return H.b(t)
if(!(u<t)){t=this.cx
if(typeof t!=="number")return H.b(t)
t=u>t
u=t}else u=!0}else u=!0}else u=!0
if(u)return G.q(0)
if(this.d==null)return G.q(1)
u=J.h(this.Q,v)
if(typeof u!=="number")return H.b(u)
if(1>=x)return H.a(y,1)
y=y[1]
x=this.ch
if(typeof x!=="number")return H.b(x)
t=this.cx
if(typeof t!=="number")return t.l()
return G.am(this.d.e5((w-v)/u,(y-x)/(t-x)),1)},
ds:function(a){var z,y
z=this.d
z=z!=null?G.am(z.bX(0.5,0.5,0.5),1):G.q(1)
z=z.i(0,this.f)
y=this.cy
if(typeof y!=="number")return H.b(y)
return z.i(0,6.283185307179586*(1-y))},
cd:function(a,b,c,d,e,f,g,h){var z,y,x,w
z=b.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=G.mI(x,z[1],this.cy)
f.cA(this.e,this.a.ag(w),0,1/0,e)
g.L(f.b)
z=G.jA(this.cy)
if(0>=h.length)return H.a(h,0)
h[0]=z
return J.d(this.f,this.l0(f.b))},
ao:function(a,b){return 0},
mE:function(a,b,c,d){var z,y
z=new G.j(new Float32Array(H.k(3)))
z.C(0,0,0)
this.e=this.a.a1(z)
if(J.bE(c)){y=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
$.au.fX(c,y.a).ai(new O.rH(this,c,d,y))}this.z=-1
this.Q=1
this.ch=-1
this.cx=1
this.x=0.001
this.y=1e30
this.r=G.mt(d,0.001,1e30)
if(typeof d!=="number")return H.b(d)
this.cy=Math.cos(H.v(Math.atan(H.v(Math.tan(H.v(0.017453292519943295*d/2))*Math.sqrt(H.v(2))))))},
static:{rG:function(a,b,c,d){var z=P.I(1,1)
z=new O.iV(null,null,b,null,null,null,null,null,null,null,null,G.aC(a),G.aC(G.Z(a.gan(),a.a)),z)
z.d7(a,1)
z.mE(a,b,c,d)
return z},Bw:[function(a,b){var z,y,x,w
z=b.a8("I",G.q(1))
y=b.a8("scale",G.q(1))
x=b.m("fov",45)
w=b.bp("mapname","")
return O.rG(a,J.d(z,y),w,x)},"$2","y0",4,0,77]}},
rH:{
"^":"z:9;a,b,c,d",
$1:function(a){var z,y,x,w,v,u
z=this.b
y=G.fl(z,!1,1,8,1,!0,0)
x=this.a
if($.au.e.O(y))x.d=$.au.fh(y)
else{z=G.dH(a,z,!1,8,0)
x.d=z
$.au.e.k(0,y,z)}z=J.C(a)
w=J.G(z.gN(a),z.gM(a))
z=J.y(w)
if(z.a0(w,1)){x.z=z.a2(w)
x.Q=w
x.ch=-1
x.cx=1}else{x.z=-1
x.Q=1
if(typeof w!=="number")return H.b(w)
x.ch=-1/w
x.cx=1/w}v=this.c
if(typeof v!=="number")return H.b(v)
u=Math.tan(H.v(0.017453292519943295*v/2))
z=z.i(w,w)
if(typeof z!=="number")return H.b(z)
x.cy=Math.cos(H.v(Math.atan(H.v(u*Math.sqrt(H.v(1+1/z))))))
this.d.aM(0)}},
jf:{
"^":"cD;d,e,f,r,a,b,c",
cO:function(){return!0},
kx:function(a){var z,y,x,w,v
z=this.b.ag(a)
y=z.w(0,z.E(0))
x=y.gS(y)
z=this.f
if(x<z)return 0
w=this.r
if(x>w)return 1
v=(x-z)/(w-z)
return v*v*v*v},
ds:function(a){return J.d(J.d(J.d(this.e,2),3.141592653589793),1-0.5*(this.r+this.f))},
bL:function(a,b,c,d,e,f,g){var z,y,x,w,v,u
z=this.d.l(0,a)
e.L(z.w(0,z.E(0)))
f[0]=1
z=this.d
y=z.l(0,a).a_()
x=Math.sqrt(y)
z=z.l(0,a).a
y=z.length
if(0>=y)return H.a(z,0)
w=z[0]
if(1>=y)return H.a(z,1)
v=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
y=new Float32Array(3)
if(0>=3)return H.a(y,0)
y[0]=w/x
if(1>=3)return H.a(y,1)
y[1]=v/x
if(2>=3)return H.a(y,2)
y[2]=z/x
if(a==null){z=new Float32Array(3)
w=new G.j(z)
if(0>=3)return H.a(z,0)
z[0]=0
if(1>=3)return H.a(z,1)
z[1]=0
if(2>=3)return H.a(z,2)
z[2]=0
z=w}else z=new G.j(new Float32Array(H.n(J.N(a))))
y=new G.r(new Float32Array(H.n(y)))
g.a=new G.aK(z,y,b,x,d,0)
y=this.e
z=e.a
w=z.length
if(0>=w)return H.a(z,0)
v=z[0]
if(1>=w)return H.a(z,1)
u=z[1]
if(2>=w)return H.a(z,2)
z=z[2]
w=new Float32Array(3)
if(0>=3)return H.a(w,0)
w[0]=-v
if(1>=3)return H.a(w,1)
w[1]=-u
if(2>=3)return H.a(w,2)
w[2]=-z
return J.G(J.d(y,this.kx(new G.r(w))),J.h(a,this.d).a_())},
cd:function(a,b,c,d,e,f,g,h){var z,y,x,w
z=b.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=G.mI(x,z[1],this.f)
f.cA(this.d,this.a.ag(w),0,1/0,e)
g.L(f.b)
z=G.jA(this.f)
if(0>=h.length)return H.a(h,0)
h[0]=z
return J.d(this.e,this.kx(f.b))},
ao:function(a,b){return 0},
static:{BM:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=b.a8("I",G.q(1))
y=b.a8("scale",G.q(1))
x=b.m("coneangle",30)
w=b.m("conedeltaangle",5)
v=new G.j(new Float32Array(H.k(3)))
v.C(0,0,0)
u=b.bq("from",v)
v=new G.j(new Float32Array(H.k(3)))
v.C(0,0,1)
v=J.h(b.bq("to",v),u)
t=J.D(v)
s=t.w(v,t.E(v))
r=G.B(0,0,0)
q=G.B(0,0,0)
G.cS(s,r,q)
v=r.a
t=v.length
if(0>=t)return H.a(v,0)
p=v[0]
if(1>=t)return H.a(v,1)
o=v[1]
if(2>=t)return H.a(v,2)
v=v[2]
t=q.a
n=t.length
if(0>=n)return H.a(t,0)
m=t[0]
if(1>=n)return H.a(t,1)
l=t[1]
if(2>=n)return H.a(t,2)
n=J.C(s)
k=G.Z(G.cg(p,o,v,0,m,l,t[2],0,n.gG(s),n.gF(s),n.gS(s),0,0,0,0,1),null)
n=J.C(u)
j=J.d(J.d(a,G.cQ(G.B(n.gG(u),n.gF(u),n.gS(u)))),G.Z(k.b,k.a))
n=J.d(z,y)
t=J.h(x,w)
l=P.I(1,1)
m=G.aC(j)
l=new O.jf(null,null,null,null,m,G.aC(G.Z(j.gan(),j.a)),l)
l.d7(j,1)
j=new G.j(new Float32Array(H.k(3)))
j.C(0,0,0)
l.d=m.a1(j)
l.e=n
if(typeof x!=="number")return H.b(x)
l.f=Math.cos(H.v(0.017453292519943295*x))
if(typeof t!=="number")return H.b(t)
l.r=Math.cos(H.v(0.017453292519943295*t))
return l},"$2","y1",4,0,78]}}}],["","",,D,{
"^":"",
hS:{
"^":"bx;a,b,c,d",
aV:function(a,b){var z,y,x,w,v,u,t,s
z=this.d
if(z!=null){y=G.ag()
G.bG(z,a,b,y)}else y=b
x=this.c.J(y)
w=G.bw(y,a.b,x)
v=J.aH(this.a.J(y))
u=J.aH(this.b.J(y))
if(!v.Y()){z=G.dS(v,new G.bO(1,x))
t=w.x
s=w.r++
if(s>=8)return H.a(t,s)
t[s]=z}if(!u.Y()){z=G.ja(u,1,x)
t=w.x
s=w.r++
if(s>=8)return H.a(t,s)
t[s]=z}return w},
static:{Am:[function(a,b){return new D.hS(b.ac("Kr",G.q(1)),b.ac("Kt",G.q(1)),b.aG("index",1.5),b.bu("bumpmap"))},"$2","y6",4,0,79]}},
ii:{
"^":"bx;a,b,c,d,e",
aV:function(a,b){var z,y,x,w,v,u,t
z=this.e
if(z!=null){y=G.ag()
G.bG(z,a,b,y)}else y=b
x=G.bw(y,a.b,1)
w=J.aH(this.b.J(y))
v=this.d.J(y)
if(!w.Y()){z=G.dS(w,new G.bO(1,v))
u=x.x
t=x.r++
if(t>=8)return H.a(u,t)
u[t]=z}return x},
d0:function(a,b){var z,y,x,w,v
z=this.d.J(b)
y=this.c.J(b)
x=J.aH(this.a.J(b))
w=G.q(0)
v=G.q(0)
G.uf(x,y,z,w,v)
return new G.kx(z,G.am(w,0),G.am(v,0))},
static:{AG:[function(a,b){var z,y,x
z=b.ac("Kd",G.q(0.5))
y=b.aG("meanfreepath",1)
x=b.aG("index",1.3)
return new D.ii(z,b.ac("Kr",G.q(1)),y,x,b.bu("bumpmap"))},"$2","y7",4,0,80]}},
ix:{
"^":"bx;a,b,c",
aV:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.c
if(z!=null){y=G.ag()
G.bG(z,a,b,y)}else y=b
x=G.bw(y,a.b,1)
w=J.aH(this.a.J(y))
v=J.a4(this.b.J(y),0,90)
if(!w.Y()){z=x.x
if(v===0){u=G.dF(w)
t=x.r++
if(t>=8)return H.a(z,t)
z[t]=u}else{u=new G.ra(G.am(w,0),null,null,5)
if(typeof v!=="number")return H.b(v)
s=0.017453292519943295*v
r=s*s
u.c=1-r/(2*(r+0.33))
u.d=0.45*r/(r+0.09)
t=x.r++
if(t>=8)return H.a(z,t)
z[t]=u}}return x},
static:{AT:[function(a,b){return new D.ix(b.ac("Kd",G.q(0.5)),b.aG("sigma",0),b.bu("bumpmap"))},"$2","y8",4,0,81]}},
iy:{
"^":"bx;a,b,c,d,e,f",
aV:function(a,b){var z,y,x,w,v,u,t,s
z=this.f
if(z!=null){y=G.ag()
G.bG(z,a,b,y)}else y=b
x=G.bw(y,a.b,1)
z=this.b
if(z!=null){w=this.c
v=this.d
u=this.e
t=x.x
s=x.r++
if(s>=8)return H.a(t,s)
t[s]=new G.t5(z,w,v,u,9)}else{z=this.a
if(z!=null){w=x.x
v=x.r++
if(v>=8)return H.a(w,v)
w[v]=new G.q6(z,9)}}return x},
mA:function(a,b){var z,y,x
z=J.D(a)
y=z.ev(a,z.f_(a,".")).toLowerCase()
if(y.length===0){z="No suffix in measured BRDF filename \""+a+"\". Can't determine file type (.brdf / .merl)"
$.t.$2(2,z)
return}if(y===".brdf"){if($.$get$cF().O(a)){if(!!J.O($.$get$cF().h(0,a)).$isbq){$.$get$cF().h(0,a).ai(new D.qR(this,a))
return}this.a=$.$get$cF().h(0,a)
return}x=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
z=x.a
$.$get$cF().k(0,a,z)
$.au.eb(a,!0,z).ai(new D.qS(this,a,x))}else{this.c=90
this.d=90
this.e=180
if($.$get$dc().O(a)){if(!!J.O($.$get$dc().h(0,a)).$isbq){$.$get$dc().h(0,a).ai(new D.qT(this,a))
return}this.b=$.$get$dc().h(0,a)
return}x=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
z=x.a
$.$get$dc().k(0,a,z)
$.au.eb(a,!0,z).ai(new D.qU(this,a,x))}},
static:{qQ:function(a,b){var z=new D.iy(null,null,null,null,null,b)
z.mA(a,b)
return z},AU:[function(a,b){var z=b.bu("bumpmap")
return D.qQ(b.c.bp("filename",b.d.bp("filename","")),z)},"$2","y9",4,0,82]}},
qR:{
"^":"z:0;a,b",
$1:function(a){this.a.a=$.$get$cF().h(0,this.b)}},
qS:{
"^":"z:0;a,b,c",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.b
y=G.eA(a,z)
if(0>=y.length)return H.a(y,0)
x=J.aW(y[0])
if(C.a.R(y.length-1-x,4+x)!==0){z="Excess or insufficient data in theta, phi BRDF file \""+z+"\""
$.t.$2(2,z)
this.c.aM(0)
return}w=H.k(x)
v=new Float32Array(w)
for(u=y.length,t=1,s=0;s<x;++s,t=r){r=t+1
if(t>=u)return H.a(y,t)
q=y[t]
if(s>=w)return H.a(v,s)
v[s]=q}p=G.a9(null,null)
o=[]
for(;w=y.length,t<w;){r=t+1
if(t<0)return H.a(y,t)
n=y[t]
t=r+1
if(r<0||r>=w)return H.a(y,r)
m=y[r]
r=t+1
if(t<0||t>=w)return H.a(y,t)
l=y[t]
t=r+1
if(r<0||r>=w)return H.a(y,r)
k=y[r]
w=typeof l!=="number"
if(w)H.T(H.Y(l))
u=Math.sin(l)
if(w)H.T(H.Y(l))
w=Math.cos(l)
q=typeof k!=="number"
if(q)H.T(H.Y(k))
j=Math.cos(k)
if(q)H.T(H.Y(k))
q=Math.sin(k)
i=new Float32Array(3)
if(0>=3)return H.a(i,0)
i[0]=u*j
if(1>=3)return H.a(i,1)
i[1]=u*q
if(2>=3)return H.a(i,2)
i[2]=w
w=typeof n!=="number"
if(w)H.T(H.Y(n))
u=Math.sin(n)
if(w)H.T(H.Y(n))
w=Math.cos(n)
q=typeof m!=="number"
if(q)H.T(H.Y(m))
j=Math.cos(m)
if(q)H.T(H.Y(m))
q=Math.sin(m)
h=new Float32Array(3)
if(0>=3)return H.a(h,0)
h[0]=u*j
if(1>=3)return H.a(h,1)
h[1]=u*q
if(2>=3)return H.a(h,2)
h[2]=w
g=G.q(0)
g.bN(v,y,t)
t+=x
f=G.kv(new G.r(i),new G.r(h))
o.push(new G.ia(new G.j(new Float32Array(H.n(f.a))),G.am(g,0)))
p=new G.ax(new G.j(new Float32Array(H.n(p.a.a))),new G.j(new Float32Array(H.n(p.b.a)))).aR(f)}w=$.$get$cF()
u=G.es(o)
this.a.a=u
w.k(0,z,u)
this.c.aM(0)}},
qT:{
"^":"z:0;a,b",
$1:function(a){this.a.b=$.$get$dc().h(0,this.b)}},
qU:{
"^":"z:0;a,b,c",
$1:function(a){var z,y,x,w,v,u,t,s,r
z=U.aa(a,!1,null,0)
y=z.q()
x=$.$get$bJ()
x[0]=y
y=$.$get$e_()
if(0>=y.length)return H.a(y,0)
w=y[0]
x[0]=z.q()
if(0>=y.length)return H.a(y,0)
v=y[0]
x[0]=z.q()
if(0>=y.length)return H.a(y,0)
u=w*v*y[0]
y=this.a
x=y.c
t=y.d
if(typeof x!=="number")return x.i()
if(typeof t!=="number")return H.b(t)
s=y.e
if(typeof s!=="number")return H.b(s)
if(u!==x*t*s){$.t.$2(2,"Dimensions don't match")
this.c.aM(0)
return}y.b=new Float32Array(H.k(3*u))
y=y.e
if(typeof y!=="number")return H.b(y)
r=2*y
new Float32Array(H.k(r))
C.a.ar(u,r)
P.uC(1)}},
iz:{
"^":"bx;a,b,c,d",
aV:function(a,b){var z,y,x,w,v,u,t,s
z=this.d
if(z!=null){y=G.ag()
G.bG(z,a,b,y)}else y=b
x=G.bw(y,a.b,1)
w=this.c.J(y)
if(typeof w!=="number")return H.b(w)
v=G.d1(1/w)
u=G.hQ(this.a.J(y),this.b.J(y))
z=G.q(1)
t=x.x
s=x.r++
if(s>=8)return H.a(t,s)
t[s]=new G.dd(z,v,u,9)
return x},
static:{AZ:[function(a,b){return new D.iz(b.ac("eta",$.$get$lz()),b.ac("k",$.$get$ly()),b.aG("roughness",0.01),b.bu("bumpmap"))},"$2","ya",4,0,83]}},
iB:{
"^":"bx;a,b",
aV:function(a,b){var z,y,x,w,v,u
z=this.b
if(z!=null){y=G.ag()
G.bG(z,a,b,y)}else y=b
x=G.bw(y,a.b,1)
w=J.aH(this.a.J(y))
if(!w.Y()){z=G.dS(w,new G.pg())
v=x.x
u=x.r++
if(u>=8)return H.a(v,u)
v[u]=z}return x},
static:{B1:[function(a,b){return new D.iB(b.ac("Kr",G.q(0.9)),b.bu("bumpmap"))},"$2","yb",4,0,84]}},
qZ:{
"^":"bx;a,b,c",
aV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.a.aV(a,b)
y=this.b.aV(a,b)
x=J.aH(this.c.J(b))
w=$.$get$cN().l(0,x).cl(0)
v=z.io()
u=y.io()
for(t=z.x,s=0;s<v;++s){if(s>=8)return H.a(t,s)
r=t[s]
t[s]=new G.m8(r,G.am(x,0),J.kq(r))}for(r=y.x,s=0;s<u;++s){if(s>=8)return H.a(r,s)
q=r[s]
p=G.am(w,0)
o=J.kq(q)
n=z.r++
if(n>=8)return H.a(t,n)
t[n]=new G.m8(q,p,o)}return z}},
iR:{
"^":"bx;a,b,c,d",
aV:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.d
if(z!=null){y=G.ag()
G.bG(z,a,b,y)}else y=b
x=G.bw(y,a.b,1)
w=J.aH(this.a.J(y))
if(!w.Y()){v=G.dF(w)
z=x.x
u=x.r++
if(u>=8)return H.a(z,u)
z[u]=v}t=J.aH(this.b.J(y))
if(!t.Y()){s=this.c.J(y)
if(typeof s!=="number")return H.b(s)
z=G.d1(1/s)
u=x.x
r=x.r++
if(r>=8)return H.a(u,r)
u[r]=new G.dd(t,z,new G.bO(1.5,1),9)}return x},
static:{Br:[function(a,b){return new D.iR(b.ac("Kd",G.q(0.25)),b.ac("Ks",G.q(0.25)),b.aG("roughness",0.1),b.bu("bumpmap"))},"$2","yc",4,0,85]}},
j5:{
"^":"bx;a,b,c,d",
aV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.d
if(z!=null){y=G.ag()
G.bG(z,a,b,y)}else y=b
x=G.bw(y,a.b,1)
w=J.aH(this.a.J(y))
v=this.c.J(y)
u=J.aH(this.b.J(y))
if(typeof v!=="number")return H.b(v)
t=G.d1(1/v)
s=G.q(0)
if(!w.Y()){r=G.hQ(D.ma(w),s)
z=G.q(1)
q=x.x
p=x.r++
if(p>=8)return H.a(q,p)
q[p]=new G.dd(z,t,r,9)}if(!u.Y()){o=G.hQ(D.ma(u),s)
z=G.dS(G.q(1),o)
q=x.x
p=x.r++
if(p>=8)return H.a(q,p)
q[p]=z}return x},
static:{ma:function(a){var z,y
z=a.v(0,0,0.999).er()
y=$.$get$cN()
return y.j(0,z).w(0,y.l(0,z))},BG:[function(a,b){var z=b.ac("Kr",G.q(1))
return new D.j5(b.ac("Ks",G.q(1)),z,b.aG("roughness",0.1),b.bu("bumpmap"))},"$2","yd",4,0,86]}},
jo:{
"^":"bx;a,b,c,d,e",
aV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=this.e
if(z!=null){y=G.ag()
G.bG(z,a,b,y)}else y=b
x=G.bw(y,a.b,1)
w=J.aH(this.a.J(y))
v=J.aH(this.b.J(y))
u=this.c.J(y)
t=this.d.J(y)
if(!w.Y()||!v.Y()){if(typeof u!=="number")return H.b(u)
z=1/u
if(typeof t!=="number")return H.b(t)
s=1/t
r=new G.o8(z,s)
if(z>1e4||isNaN(z))r.a=1e4
if(s>1e4||isNaN(s))r.b=1e4
z=G.am(w,0)
s=G.am(v,0)
q=x.x
p=x.r++
if(p>=8)return H.a(q,p)
q[p]=new G.pe(z,s,r,9)}return x},
static:{BQ:[function(a,b){return new D.jo(b.ac("Kd",G.q(0.5)),b.ac("Ks",G.q(0.5)),b.aG("uroughness",0.1),b.aG("vroughness",0.1),b.bu("bumpmap"))},"$2","ye",4,0,87]}},
jp:{
"^":"bx;a,b,c,d,e,f",
aV:function(a,b){var z,y,x,w,v,u,t
z=this.f
if(z!=null){y=G.ag()
G.bG(z,a,b,y)}else y=b
x=G.bw(y,a.b,1)
w=J.aH(this.b.J(y))
v=this.e.J(y)
if(!w.Y()){z=G.dS(w,new G.bO(1,v))
u=x.x
t=x.r++
if(t>=8)return H.a(u,t)
u[t]=z}return x},
d0:function(a,b){var z,y,x
z=this.e.J(b)
y=this.a
x=J.d(this.c.J(b),y)
y=J.d(this.d.J(b),y)
return new G.kx(z,G.am(x,0),G.am(y,0))},
static:{BR:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=[0.0011,0.0024,0.014]
y=[2.55,3.21,3.77]
x=G.cm(z[0],z[1],z[2])
w=G.cm(y[0],y[1],y[2])
v=b.kB("name")
u=G.pt(v,x,w)
if(J.bE(v)&&!u){t="Named material '"+H.m(v)+"' not found.  Using defaults."
$.t.$2(1,t)}s=b.ie("scale",1)
r=b.ac("sigma_a",x)
q=b.ac("sigma_prime_s",w)
p=b.aG("index",1.3)
return new D.jp(s,b.ac("Kr",G.q(1)),r,q,p,b.bu("bumpmap"))},"$2","yf",4,0,88]}},
ju:{
"^":"bx;a,b,c,d,e,f",
aV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=this.f
if(z!=null){y=G.ag()
G.bG(z,a,b,y)}else y=b
x=G.bw(y,a.b,1.5)
w=J.aH(this.d.J(y))
v=J.aH(this.e.J(y))
if(w.Y()&&v.Y())return x
u=J.aH(this.a.J(y))
if(!u.Y()){if(!w.Y()){z=G.dF(w.i(0,u))
t=x.x
s=x.r++
if(s>=8)return H.a(t,s)
t[s]=z}if(!v.Y()){z=G.kw(G.dF(v.i(0,u)))
t=x.x
s=x.r++
if(s>=8)return H.a(t,s)
t[s]=z}}r=J.aH(this.b.J(y))
if(!r.Y()){q=this.c.J(y)
if(!w.Y()){z=w.i(0,r)
if(typeof q!=="number")return H.b(q)
t=G.d1(1/q)
s=x.x
p=x.r++
if(p>=8)return H.a(s,p)
s[p]=new G.dd(z,t,new G.bO(1.5,1),9)}if(!v.Y()){z=v.i(0,r)
if(typeof q!=="number")return H.b(q)
z=G.kw(new G.dd(z,G.d1(1/q),new G.bO(1.5,1),9))
t=x.x
s=x.r++
if(s>=8)return H.a(t,s)
t[s]=z}}return x},
static:{BZ:[function(a,b){var z,y,x,w
z=b.ac("Kd",G.q(0.25))
y=b.ac("Ks",G.q(0.25))
x=b.ac("reflect",G.q(0.5))
w=b.ac("transmit",G.q(0.5))
return new D.ju(z,y,b.aG("roughness",0.1),x,w,b.bu("bumpmap"))},"$2","yg",4,0,89]}},
jy:{
"^":"bx;a,b,c,d,e,f,r,x",
aV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.x
if(z!=null){y=G.ag()
G.bG(z,a,b,y)}else y=b
x=G.bw(y,a.b,1)
w=J.aH(this.e.J(y))
if(!w.kK(1)){v=G.ja(w.a2(0).j(0,$.$get$cN()),1,1)
z=x.x
u=x.r++
if(u>=8)return H.a(z,u)
z[u]=v}t=w.i(0,J.aH(this.a.J(y)))
if(!t.Y()){s=G.dF(t)
z=x.x
u=x.r++
if(u>=8)return H.a(z,u)
z[u]=s}r=this.r.J(y)
q=w.i(0,J.aH(this.b.J(y)))
if(!q.Y()){p=this.f.J(y)
if(typeof p!=="number")return H.b(p)
z=G.d1(1/p)
u=x.x
o=x.r++
if(o>=8)return H.a(u,o)
u[o]=new G.dd(q,z,new G.bO(r,1),9)}n=w.i(0,J.aH(this.c.J(y)))
if(!n.Y()){z=G.dS(n,new G.bO(r,1))
u=x.x
o=x.r++
if(o>=8)return H.a(u,o)
u[o]=z}m=w.i(0,J.aH(this.d.J(y)))
if(!m.Y()){z=G.ja(m,r,1)
u=x.x
o=x.r++
if(o>=8)return H.a(u,o)
u[o]=z}return x},
static:{C2:[function(a,b){var z,y,x,w,v,u
z=b.ac("Kd",G.q(0.25))
y=b.ac("Ks",G.q(0.25))
x=b.ac("Kr",G.q(0))
w=b.ac("Kt",G.q(0))
v=b.aG("roughness",0.1)
u=b.aG("index",1.5)
return new D.jy(z,y,x,w,b.ac("opacity",G.q(1)),v,u,b.bu("bumpmap"))},"$2","yh",4,0,90]}}}],["","",,F,{
"^":"",
io:{
"^":"bj;e,f,a,b,c,d",
cf:function(a,b,c,d){var z,y,x,w,v,u
this.hc(a,b,c,d)
this.f=new Int32Array(H.k(J.d(J.d(c,d),2)))
for(b=this.b,z=0;y=J.y(b),y.ab(b,J.h(J.c(this.b,this.d),1));b=y.j(b,1))for(a=this.a;x=J.y(a),x.ab(a,J.h(J.c(this.a,this.c),1));a=x.j(a,1)){w=this.f
v=z+1
u=w.length
if(z<0||z>=u)return H.a(w,z)
w[z]=a
z=v+1
if(v<0||v>=u)return H.a(w,v)
w[v]=b}this.e=this.f.length/2|0},
cV:function(){return this.e},
bb:function(a,b){var z,y
a*=2
z=this.f
if(a>=z.length-1)return
J.u(b,0,z[a])
z=this.f
y=a+1
if(y>=z.length)return H.a(z,y)
y=z[y]
if(1>=b.length)return H.a(b,1)
b[1]=y},
static:{AK:[function(a){return new F.io(null,null,null,null,null,null)},"$1","yk",2,0,137]}},
j2:{
"^":"bj;e,f,a,b,c,d",
cf:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o
this.hc(a,b,c,d)
this.f=new Int32Array(H.k(J.d(J.d(c,d),2)))
for(b=this.b,z=0;y=J.y(b),y.ab(b,J.h(J.c(this.b,this.d),1));b=y.j(b,1))for(a=this.a;x=J.y(a),x.ab(a,J.h(J.c(this.a,this.c),1));a=x.j(a,1)){w=this.f
v=z+1
u=w.length
if(z<0||z>=u)return H.a(w,z)
w[z]=a
z=v+1
if(v<0||v>=u)return H.a(w,v)
w[v]=b}t=new G.b6(P.b3(5489))
y=this.f.length/2|0
this.e=y
s=0
r=0
while(!0){if(typeof y!=="number")return H.b(y)
if(!(s<y))break
y=t.a.aw(4294967295)
x=this.e
if(typeof x!=="number")return H.b(x)
q=C.a.R(y,x)*2
y=this.f
w=y.length
if(r>=w)return H.a(y,r)
p=y[r]
if(q<0||q>=w)return H.a(y,q)
y[r]=y[q]
y[q]=p
u=r+1
if(u>=w)return H.a(y,u)
p=y[u]
o=q+1
if(o>=w)return H.a(y,o)
y[u]=y[o]
y[o]=p;++s
r+=2
y=x}},
cV:function(){return this.e},
bb:function(a,b){var z,y
a*=2
z=this.f
if(a>=z.length-1)return
J.u(b,0,z[a])
z=this.f
y=a+1
if(y>=z.length)return H.a(z,y)
y=z[y]
if(1>=b.length)return H.a(b,1)
b[1]=y},
static:{By:[function(a){return new F.j2(null,null,null,null,null,null)},"$1","yl",2,0,92]}},
dU:{
"^":"bj;e,f,r,x,a,b,c,d",
cf:function(a1,a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
this.hc(a1,a2,a3,a4)
z=J.w(a3)
y=z.i(a3,a4)
this.r=y
this.x=new Int32Array(H.k(J.d(y,2)))
y=this.e
z=z.ar(a3,y)
if(typeof a3!=="number")return a3.R()
if(typeof y!=="number")return H.b(y)
x=J.c(z,C.b.R(a3,y)===0?0:1)
z=J.y(a4).ar(a4,y)
if(typeof a4!=="number")return a4.R()
w=J.c(z,C.b.R(a4,y)===0?0:1)
z=H.k(J.d(J.d(x,w),2))
v=new Int32Array(z)
if(typeof w!=="number")return H.b(w)
u=0
t=0
for(;u<w;++u){if(typeof x!=="number")return H.b(x)
s=0
for(;s<x;++s){r=t+1
if(t<0||t>=z)return H.a(v,t)
v[t]=s
t=r+1
if(r<0||r>=z)return H.a(v,r)
v[r]=u}}q=z/2|0
if(this.f===!0){p=new G.b6(P.b3(5489))
for(t=1;t<q;++t){o=t*2
n=o+1
m=C.a.R(p.a.aw(4294967295),q)*2
l=m+1
if(o>=z)return H.a(v,o)
k=v[o]
if(m<0||m>=z)return H.a(v,m)
v[o]=v[m]
v[m]=k
if(n>=z)return H.a(v,n)
k=v[n]
if(l<0||l>=z)return H.a(v,l)
v[n]=v[l]
v[l]=k}}for(j=0,i=0,t=0;i<q;++i){r=t+1
if(t>=z)return H.a(v,t)
h=v[t]
t=r+1
if(r>=z)return H.a(v,r)
g=v[r]
f=J.c(this.a,h*y)
e=J.c(this.b,g*y)
for(d=J.w(f),c=J.w(e),u=0;u<y;++u){a2=c.j(e,u)
if(J.F(a2,J.h(J.c(this.b,this.d),1)))break
for(s=0;s<y;++s){a1=d.j(f,s)
if(J.F(a1,J.h(J.c(this.a,this.c),1)))break
b=this.x
a=j+1
a0=b.length
if(j<0||j>=a0)return H.a(b,j)
b[j]=a1
j=a+1
if(a<0||a>=a0)return H.a(b,a)
b[a]=a2}}}},
cV:function(){return this.r},
bb:function(a,b){var z,y
a*=2
z=this.x
if(a>=z.length-1)return
J.u(b,0,z[a])
z=this.x
y=a+1
if(y>=z.length)return H.a(z,y)
y=z[y]
if(1>=b.length)return H.a(b,1)
b[1]=y},
static:{BY:[function(a){return new F.dU(a.V("tilesize",32),a.bo("randomize",!0),null,null,null,null,null,null)},"$1","ym",2,0,93]}}}],["","",,Y,{
"^":"",
o4:{
"^":"eC;a,b,c",
ea:function(a3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
z=new G.b6(P.b3(5489))
y=G.bK(a3.d)
x=y.b
w=y.f5()
x=x.a
if(w>=x.length)return H.a(x,w)
w=x[w]
x=y.a
v=y.f5()
x=x.a
if(v>=x.length)return H.a(x,v)
y.i4(0,w-x[v])
x=this.a
if(typeof x!=="number")return H.b(x)
w=this.c
v=a3.a
u=null
t=0
s=0
for(;s<x;++s){r=z.a.P()
q=y.a.a
if(0>=q.length)return H.a(q,0)
q=q[0]
p=y.b.a
if(0>=p.length)return H.a(p,0)
p=p[0]
o=z.a.P()
n=y.a.a
if(1>=n.length)return H.a(n,1)
n=n[1]
m=y.b.a
if(1>=m.length)return H.a(m,1)
m=m[1]
l=z.a.P()
k=y.a.a
if(2>=k.length)return H.a(k,2)
k=k[2]
j=y.b.a
if(2>=j.length)return H.a(j,2)
j=j[2]
i=new Float32Array(3)
h=new G.j(i)
if(0>=3)return H.a(i,0)
i[0]=q*(1-r)+p*r
if(1>=3)return H.a(i,1)
i[1]=n*(1-o)+m*o
if(2>=3)return H.a(i,2)
i[2]=k*(1-l)+j*l
if(C.a.R(z.a.aw(4294967295),4)===0)h=u
g=G.bv(z.a.P(),z.a.P())
if(C.a.R(z.a.aw(4294967295),32)===0){r=g.a
if(1>=r.length)return H.a(r,1)
r[1]=0
r[0]=0}else if(C.a.R(z.a.aw(4294967295),32)===0){r=g.a
if(2>=r.length)return H.a(r,2)
r[2]=0
r[0]=0}else if(C.a.R(z.a.aw(4294967295),32)===0){r=g.a
if(2>=r.length)return H.a(r,2)
r[2]=0
r[1]=0}if(z.a.P()<0.25)f=t
else f=z.a.P()<0.25?0.001:0
if(h==null){r=new Float32Array(3)
q=new G.j(r)
if(0>=3)return H.a(r,0)
r[0]=0
if(1>=3)return H.a(r,1)
r[1]=0
if(2>=3)return H.a(r,2)
r[2]=0
r=q}else r=new G.j(new Float32Array(H.n(h.a)))
q=new G.r(new Float32Array(H.n(g.a)))
e=new G.aK(r,q,f,1/0,0,0)
d=new G.aK(new G.j(new Float32Array(H.n(r.a))),new G.r(new Float32Array(H.n(q.a))),f,1/0,0,0)
q=G.ag()
c=new G.b0(G.ag(),null,null,null,0,0,0)
b=v.ae(e,new G.b0(q,null,null,null,0,0,0))
q=$.$get$ay()
q.c=J.c(q.c,1)
$.ay=q
for(a=!1,a0=!1,a1=0;a1<this.b.length;++a1){if(a1>=w.length)return H.a(w,a1)
if(w[a1].a5(d)){r=this.b
if(a1>=r.length)return H.a(r,a1)
a=r[a1].ae(d,c)||a}else{r=this.b
if(a1>=r.length)return H.a(r,a1)
if(r[a1].ae(d,c))a0=!0}}if(!a0)r=b!==a||!J.i(e.d,d.d)
else r=!1
if(r){r="Disagreement: t accel "+H.m(e.d)+" ["+H.m(d.d)+"] t exhaustive "+H.m(e.d)+"] ["+H.m(d.d)+"], Ray: org ["
q=d.a.a
p=q.length
if(0>=p)return H.a(q,0)
o=H.m(q[0])+" "
if(1>=p)return H.a(q,1)
o=o+H.m(q[1])+" "
if(2>=p)return H.a(q,2)
q=r+(o+H.m(q[2]))+"], dir ["+H.m(d.b)+"], mint = "+H.m(d.c)
$.t.$2(1,q)}if(a){r=d.d
u=new G.j(new Float32Array(H.n(d.a.j(0,J.d(d.b,r)).a)))
t=c.r}}a2=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[G.bi])),[G.bi])
a2.aB(0,null)
return a2.a},
ak:function(a,b,c,d,e,f){return G.q(0)},
lP:function(a,b){var z,y,x
for(z=0;z<b.length;++z)b[z].cN(this.b)
for(y=this.c,z=0;x=this.b,z<x.length;++z)y.push(x[z].aA())},
static:{o5:function(a,b){var z=new Y.o4(a,[],[])
z.lP(a,b)
return z}}},
oA:{
"^":"eC;a,b,c,d,e,f,r,x,ed:y<,z,Q",
ea:function(b1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0
$.t.$2(0,"Starting CreateProbesRenderer")
z=this.f.gbC().a
if(0>=z.length)return H.a(z,0)
z=z[0]
y=this.f.gf7().a
if(0>=y.length)return H.a(y,0)
if(z>y[0])this.f=b1.d
z=this.a
y=this.c
z.cc(b1,y,this)
x=this.b
x.cc(b1,y,this)
w=G.fH(null,z,x,b1)
v=[0,0,0]
for(z=this.f.gf7().l(0,this.f.gbC()).a,x=z.length,u=this.z,t=0;t<3;++t){if(t>=x)return H.a(z,t)
s=z[t]
if(typeof u!=="number")return H.b(u)
v[t]=P.I(1,C.b.I(Math.ceil(s/u)))}r=v[0]*v[1]*v[2]
q=H.p(Array(r),[[P.E,G.ai]])
for(z=q.length,t=0;t<r;++t){x=this.d
u=J.w(x)
x=J.d(u.j(x,1),u.j(x,1))
if(typeof x!=="number")return H.b(x)
x=Array(x)
x.$builtinTypeInfo=[G.ai]
if(t>=z)return H.a(q,t)
q[t]=x}p=new G.j(new Float32Array(H.k(3)))
p.C(0,0,0)
o=b1.d.dU(p)
x=$.$get$ey()
n=G.cQ(p.l(0,x))
m=M.jc(n,G.Z(n.b,n.a),!0,o,-o,o,360)
u=$.aN
$.aN=u+1
l=new G.ei(m,null,null,u)
k=[]
j=y.gfK().bI(y.gaZ(),x)
k.push(j)
i=new G.b6(P.b3(5489))
for(y=b1.a;k.length<32768;){h=G.bv(i.a.P(),i.a.P())
for(g=j,f=0,t=0;t<32;++t){x=this.y
u=new G.j(new Float32Array(H.n(g.a)))
if(h==null){s=new Float32Array(3)
e=new G.r(s)
if(0>=3)return H.a(s,0)
s[0]=0
if(1>=3)return H.a(s,1)
s[1]=0
if(2>=3)return H.a(s,2)
s[2]=0
s=e}else s=new G.r(new Float32Array(H.n(J.N(h))))
d=new G.aK(u,s,f,1/0,x,0)
c=new G.b0(G.ag(),null,null,null,0,0,0)
b=y.ae(d,c)
x=$.$get$ay()
x.c=J.c(x.c,1)
$.ay=x
if(!b&&!l.ae(d,c))break
x=d.d
k.push(new G.j(new Float32Array(H.n(d.a.j(0,J.d(d.b,x)).a))))
a=c.a
g=a.a
f=c.r
x=a.b
if(J.K(G.J(x,J.M(d.b)),0)){u=J.C(x)
s=J.M(u.gG(x))
e=J.M(u.gF(x))
x=J.M(u.gS(x))
u=new Float32Array(3)
a0=new G.a1(u)
if(0>=3)return H.a(u,0)
u[0]=s
if(1>=3)return H.a(u,1)
u[1]=e
if(2>=3)return H.a(u,2)
u[2]=x
x=a0}a.b=x
h=G.fZ(G.bv(i.a.P(),i.a.P()),a.b)}}for(y=this.e,t=0;t<r;++t){x=this.y
u=this.f
s=this.d
e=this.r
a0=this.x
if(t>=z)return H.a(q,t)
a1=q[t]
new Y.vk(t,P.aE(v,!0,P.x),u,s,y,x,e,a0,w,this,b1,k,a1).aU()}y=v[0]
x=v[1]
u=v[2]
s=this.d
e=J.w(s)
s=J.d(e.j(s,1),e.j(s,1))
if(typeof s!=="number")return H.b(s)
s=H.k(15+y*x*u*s*G.tF())
a2=new Float32Array(s)
u=J.e8(this.d)
if(0>=s)return H.a(a2,0)
a2[0]=u
y=this.r===!0?1:0
if(1>=s)return H.a(a2,1)
a2[1]=y
y=this.x===!0?1:0
if(2>=s)return H.a(a2,2)
a2[2]=y
y=C.b.dw(v[0])
if(3>=s)return H.a(a2,3)
a2[3]=y
y=C.b.dw(v[1])
if(4>=s)return H.a(a2,4)
a2[4]=y
y=C.b.dw(v[2])
if(5>=s)return H.a(a2,5)
a2[5]=y
y=this.f.gbC().a
if(0>=y.length)return H.a(y,0)
y=y[0]
if(6>=s)return H.a(a2,6)
a2[6]=y
y=this.f.gbC().a
if(1>=y.length)return H.a(y,1)
y=y[1]
if(7>=s)return H.a(a2,7)
a2[7]=y
y=this.f.gbC().a
if(2>=y.length)return H.a(y,2)
y=y[2]
if(8>=s)return H.a(a2,8)
a2[8]=y
y=this.f.gf7().a
if(0>=y.length)return H.a(y,0)
y=y[0]
if(9>=s)return H.a(a2,9)
a2[9]=y
y=this.f.gf7().a
if(1>=y.length)return H.a(y,1)
y=y[1]
if(10>=s)return H.a(a2,10)
a2[10]=y
y=this.f.gf7().a
if(2>=y.length)return H.a(y,2)
y=y[2]
if(11>=s)return H.a(a2,11)
a2[11]=y
for(a3=v[0]*v[1]*v[2],a4=12,t=0;t<a3;++t){y=this.d
x=J.w(y)
a5=J.d(x.j(y,1),x.j(y,1))
if(typeof a5!=="number")return H.b(a5)
a6=0
for(;a6<a5;++a6){if(t>=z)return H.a(q,t)
y=q[t]
if(a6>=y.length)return H.a(y,a6)
a7=C.J.cu(y[a6])
for(a8=0;C.a.U(a8,a7.gn(a7));++a8,a4=a9){a9=a4+1
y=a7.h(0,a8)
if(a4<0||a4>=s)return H.a(a2,a4)
a2[a4]=y}}}z=this.Q
$.au.c.k(0,z,a2)
b0=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[G.bi])),[G.bi])
b0.aB(0,null)
return b0.a},
ak:function(a,b,c,d,e,f){var z,y,x,w
if(f==null)f=G.q(0)
if(e==null)e=G.em()
z=G.q(0)
if(a.ae(b,e))z=this.a.ak(a,this,b,e,c,d)
else for(y=a.b,x=0;x<y.length;++x)z=z.j(0,y[x].aS(b))
w=this.b.ak(a,this,b,c,d,f)
return J.c(J.d(f,z),w)},
ew:function(a,b,c,d){return this.ak(a,b,c,d,null,null)},
hd:function(a,b,c,d,e){return this.ak(a,b,c,d,e,null)},
bj:function(a,b,c,d){return this.b.iz(a,this,b,c,d)}},
vk:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
aU:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
z=this.a
y=this.b
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
if(typeof w!=="number")return H.b(w)
v=C.a.R(z,w)
u=C.a.ar(z,w)
if(1>=x)return H.a(y,1)
x=y[1]
if(typeof x!=="number")return H.b(x)
t=C.b.R(u,x)
s=C.a.ar(z,w*x)
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
if(typeof w!=="number")return H.b(w)
if(1>=x)return H.a(y,1)
u=y[1]
if(typeof u!=="number")return H.b(u)
if(2>=x)return H.a(y,2)
y=y[2]
if(typeof y!=="number")return H.b(y)
r=G.a9(this.c.kL(v/w,t/u,s/y),this.c.kL((v+1)/w,(t+1)/u,(s+1)/y))
y=this.d
u=J.w(y)
q=J.d(u.j(y,1),u.j(y,1))
p=new G.b6(P.b3(z))
if(typeof q!=="number")return H.b(q)
o=H.p(Array(q),[G.ai])
for(z=this.Q,y=this.ch,x=o.length,w=this.z,u=this.y,n=this.e,m=0,l=0,k=0;k<256;){if(m===32)break;++k
j=G.cI(k,2)
i=G.cI(k,3)
h=G.cI(k,5)
g=r.a.a
f=g.length
if(0>=f)return H.a(g,0)
e=g[0]
d=r.b.a
c=d.length
if(0>=c)return H.a(d,0)
b=d[0]
if(1>=f)return H.a(g,1)
a=g[1]
if(1>=c)return H.a(d,1)
a0=d[1]
if(2>=f)return H.a(g,2)
g=g[2]
if(2>=c)return H.a(d,2)
d=d[2]
f=new Float32Array(3)
a1=new G.j(f)
if(0>=3)return H.a(f,0)
f[0]=e*(1-j)+b*j
if(1>=3)return H.a(f,1)
f[1]=a*(1-i)+a0*i
if(2>=3)return H.a(f,2)
f[2]=g*(1-h)+d*h
if(l<0||l>=y.length)return H.a(y,l)
g=y[l]
f=a1.l(0,g)
e=this.f
g=new G.j(new Float32Array(H.n(g.a)))
f=new G.r(new Float32Array(H.n(f.a)))
d=z.a
a2=d.a5(new G.aK(g,f,0.0001,1,e,0))
e=$.$get$az()
e.c=J.c(e.c,1)
$.az=e
if(a2){for(a3=0;a3<y.length;++a3){g=y[a3]
f=a1.l(0,g)
e=this.f
g=new G.j(new Float32Array(H.n(g.a)))
f=new G.r(new Float32Array(H.n(f.a)))
a2=d.a5(new G.aK(g,f,0.0001,1,e,0))
e=$.$get$az()
e.c=J.c(e.c,1)
$.az=e
if(!a2){l=a3
break}}if(a3===y.length)continue}++m
if(this.r===!0){for(a4=0;a4<q;++a4){g=G.q(0)
if(a4>=x)return H.a(o,a4)
o[a4]=g}G.jd(a1,0,this.f,z,!0,this.d,p,o)
for(a4=0;a4<q;++a4){g=this.cx
if(a4>=g.length)return H.a(g,a4)
f=g[a4]
if(a4>=x)return H.a(o,a4)
g[a4]=C.J.j(f,o[a4])}}if(this.x===!0){for(a4=0;a4<q;++a4){g=G.q(0)
if(a4>=x)return H.a(o,a4)
o[a4]=g}G.tO(a1,0,this.f,w,u,z,this.d,p,n,o)
for(a4=0;a4<q;++a4){g=this.cx
if(a4>=g.length)return H.a(g,a4)
f=g[a4]
if(a4>=x)return H.a(o,a4)
g[a4]=C.J.j(f,o[a4])}}}if(m>0)for(k=0;k<q;++k){z=this.cx
if(k>=z.length)return H.a(z,k)
z[k]=C.J.w(z[k],m)}}},
qW:{
"^":"eC;a,b,c,d,e,f,r,x,y,z,Q",
ea:function(a9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
z=this.c
y="Starting MetropolisRenderer: "+z.gb0().gfe()+"x"+z.gb0().gll()
$.t.$2(0,y)
if(a9.b.length>0){x=[0,0,0,0]
z.gb0().ln(x)
w=z.gaZ()
v=z.c
u=G.i7(a9)
if(this.Q!=null){t=new P.bT(null,null)
H.bQ()
$.aL=$.bs
t.bP(0)
$.t.$2(0,"Metropolis: Starting Direct Lighting Render")
y=this.e
if(J.F(y,0)){s=x.length
if(0>=s)return H.a(x,0)
r=x[0]
if(2>=s)return H.a(x,2)
s=x[2]
q=J.h(x[1],r)
if(3>=x.length)return H.a(x,3)
p=U.lv(r,s,q,J.h(x[3],x[2]),w,v,new F.dU(32,!0,null,null,null,null,null,null),y)
new Y.nb(a9,this,z,p,G.fH(p,this.Q,null,a9),this.a,this.b).aU()}z.d.iC()
y="Metropolis:Finished Direct Lighting Render: "+P.bN(0,0,J.ac(J.d(t.gbz(),1e6),$.aL),0,0,0).K(0)
$.t.$2(0,y)}t=new P.bT(null,null)
H.bQ()
$.aL=$.bs
t.bP(0)
y=this.y
s="Metropolis: Starting Bootstrap: "+H.m(y)
$.t.$2(0,s)
s=this.a
o=new G.b6(s==null?C.V:P.b3(s))
if(1>=x.length)return H.a(x,1)
s=J.c(J.h(x[1],x[0]),1)
if(3>=x.length)return H.a(x,3)
G.fd(s,J.c(J.h(x[3],x[2]),1),this.a,this.b,x)
s="RENDER EXTENT "+H.m(x)
$.t.$2(0,s)
s=this.r
if(typeof s!=="number")return H.b(s)
n=H.p(Array(s),[Y.cY])
s=this.r
if(typeof s!=="number")return H.b(s)
m=H.p(Array(s),[Y.cY])
s=m.length
r=n.length
l=0
while(!0){q=this.r
if(typeof q!=="number")return H.b(q)
if(!(l<q))break
q=G.ag()
k=new Float32Array(3)
if(0>=3)return H.a(k,0)
k[0]=0
if(1>=3)return H.a(k,1)
k[1]=0
if(2>=3)return H.a(k,2)
k[2]=0
j=new Float32Array(3)
if(0>=3)return H.a(j,0)
j[0]=0
if(1>=3)return H.a(j,1)
j[1]=0
if(2>=3)return H.a(j,2)
j[2]=0
i=G.q(0)
if(l>=r)return H.a(n,l)
n[l]=new Y.cY(new G.b0(q,null,null,null,0,0,0),new G.r(k),new G.r(j),null,null,null,i)
i=G.ag()
q=new Float32Array(3)
if(0>=3)return H.a(q,0)
q[0]=0
if(1>=3)return H.a(q,1)
q[1]=0
if(2>=3)return H.a(q,2)
q[2]=0
k=new Float32Array(3)
if(0>=3)return H.a(k,0)
k[0]=0
if(1>=3)return H.a(k,1)
k[1]=0
if(2>=3)return H.a(k,2)
k[2]=0
j=G.q(0)
if(l>=s)return H.a(m,l)
m[l]=new Y.cY(new G.b0(i,null,null,null,0,0,0),new G.r(q),new G.r(k),null,null,null,j);++l}s=H.k(y)
h=new Float32Array(s)
g=Y.jY(this.r)
if(typeof y!=="number")return H.b(y)
r=this.d
f=0
l=0
for(;l<y;++l){q=o.a.P()
k=x.length
if(0>=k)return H.a(x,0)
j=x[0]
if(1>=k)return H.a(x,1)
k=x[1]
e=J.c(J.d(j,1-q),J.d(k,q))
q=o.a.P()
k=x.length
if(2>=k)return H.a(x,2)
j=x[2]
if(3>=k)return H.a(x,3)
k=x[3]
d=J.c(J.d(j,1-q),J.d(k,q))
Y.iA(o,g,this.r,e,d,w,v,r)
c=this.ip(g,a9,z,u,n,m,o).aC()
f+=c
if(l>=s)return H.a(h,l)
h[l]=c}b=f/y
q="Metropolis: Finished Bootstrap: "+P.bN(0,0,J.ac(J.d(t.gbz(),1e6),$.aL),0,0,0).K(0)
$.t.$2(0,q)
q="MLT computed b = "+H.m(b)
$.t.$2(0,q)
a=o.a.P()*f
o.a=P.b3(0)
a0=Y.jY(this.r)
for(f=0,l=0;l<y;++l){q=o.a.P()
k=x.length
if(0>=k)return H.a(x,0)
j=x[0]
if(1>=k)return H.a(x,1)
k=x[1]
e=J.c(J.d(j,1-q),J.d(k,q))
q=o.a.P()
k=x.length
if(2>=k)return H.a(x,2)
j=x[2]
if(3>=k)return H.a(x,3)
k=x[3]
d=J.c(J.d(j,1-q),J.d(k,q))
Y.iA(o,a0,this.r,e,d,w,v,r)
if(l>=s)return H.a(h,l)
f+=h[l]
if(f>a)break}a1=this.x
a2=J.ac(this.f,a1)
y="MLT running "+H.m(a1)+" tasks, large step rate "+H.m(a2)
$.t.$2(0,y)
a3=[o.a.aw(4294967295),o.a.aw(4294967295)]
if(typeof a1!=="number")return H.b(a1)
l=0
for(;l<a1;l=a4){t=new P.bT(null,null)
H.bQ()
$.aL=$.bs
t.bP(0)
a4=l+1
y="Metropolis: Task "+a4+" / "+H.m(a1)
$.t.$2(0,y)
a5=[0,0]
a5[0]=G.bB(0,a3[0])
y=G.c4(0,a3[1])
a5[1]=y
s=a5[0]
r=x.length
if(0>=r)return H.a(x,0)
q=x[0]
if(1>=r)return H.a(x,1)
k=x[1]
if(2>=r)return H.a(x,2)
j=x[2]
if(3>=r)return H.a(x,3)
a6=new Y.vO(l,s,y,null,q,k,j,x[3],w,v,b,a0,a9,z,this,u)
a6.d=0
a6.aU()
j="Metropolis: Finished Task "+a4+" / "+H.m(a1)+": "
k=J.ac(J.d(t.gbz(),1e6),$.aL)
if(typeof k!=="number")return H.b(k)
k=j+new P.bM(k).K(0)
$.t.$2(0,k)}}a7=z.gb0().iC()
a8=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[G.bi])),[G.bi])
a8.aB(0,a7)
return a8.a},
ak:function(a,b,c,d,e,f){var z,y,x,w
z=G.em()
if(e==null)e=z
y=G.q(0)
if(a.ae(b,e))y=this.Q.ak(a,this,b,e,c,d)
else for(x=a.b,w=0;w<x.length;++w)y=y.j(0,x[w].aS(b))
return y},
ew:function(a,b,c,d){return this.ak(a,b,c,d,null,null)},
hd:function(a,b,c,d,e){return this.ak(a,b,c,d,e,null)},
bj:function(a,b,c,d){return G.q(1)},
ip:function(a,b,c,d,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=a.a
y=$.$get$eE()
y.c=J.c(y.c,1)
$.eE=y
y=new Float32Array(3)
if(0>=3)return H.a(y,0)
y[0]=0
if(1>=3)return H.a(y,1)
y[1]=0
if(2>=3)return H.a(y,2)
y[2]=0
x=new Float32Array(3)
if(0>=3)return H.a(x,0)
x[0]=0
if(1>=3)return H.a(x,1)
x[1]=0
if(2>=3)return H.a(x,2)
x[2]=0
w=new Float32Array(3)
if(0>=3)return H.a(w,0)
w[0]=0
if(1>=3)return H.a(w,1)
w[1]=0
if(2>=3)return H.a(w,2)
w[2]=0
v=new Float32Array(3)
if(0>=3)return H.a(v,0)
v[0]=0
if(1>=3)return H.a(v,1)
v[1]=0
if(2>=3)return H.a(v,2)
v[2]=0
u=new Float32Array(3)
t=new G.j(u)
if(0>=3)return H.a(u,0)
u[0]=0
if(1>=3)return H.a(u,1)
u[1]=0
if(2>=3)return H.a(u,2)
u[2]=0
u=t
t=new Float32Array(3)
s=new G.r(t)
if(0>=3)return H.a(t,0)
t[0]=0
if(1>=3)return H.a(t,1)
t[1]=0
if(2>=3)return H.a(t,2)
t[2]=0
t=s
r=new G.as(!1,new G.j(y),new G.j(x),new G.r(w),new G.r(v),u,t,0,1/0,0,0)
q=c.en(z,r)
t=this.f
if(typeof t!=="number")H.T(H.Y(t))
r.iJ(1/Math.sqrt(t))
y=new Float32Array(3)
if(0>=3)return H.a(y,0)
y[0]=0
if(1>=3)return H.a(y,1)
y[1]=0
if(2>=3)return H.a(y,2)
y[2]=0
x=new Float32Array(3)
if(0>=3)return H.a(x,0)
x[0]=0
if(1>=3)return H.a(x,1)
x[1]=0
if(2>=3)return H.a(x,2)
x[2]=0
w=new Float32Array(3)
if(0>=3)return H.a(w,0)
w[0]=0
if(1>=3)return H.a(w,1)
w[1]=0
if(2>=3)return H.a(w,2)
w[2]=0
v=new Float32Array(3)
if(0>=3)return H.a(v,0)
v[0]=0
if(1>=3)return H.a(v,1)
v[1]=0
if(2>=3)return H.a(v,2)
v[2]=0
u=new Float32Array(3)
t=new G.j(u)
if(0>=3)return H.a(u,0)
u[0]=0
if(1>=3)return H.a(u,1)
u[1]=0
if(2>=3)return H.a(u,2)
u[2]=0
u=t
t=new Float32Array(3)
s=new G.r(t)
if(0>=3)return H.a(t,0)
t[0]=0
if(1>=3)return H.a(t,1)
t[1]=0
if(2>=3)return H.a(t,2)
t[2]=0
t=s
p=new G.as(!1,new G.j(y),new G.j(x),new G.r(w),new G.r(v),u,t,0,1/0,0,0)
o=G.q(0)
n=Y.lA(r,G.q(q),b,a.d,a0,p,o)
if(this.d!==!0)return this.iU(b,a0,n,a.f,a2,z.e,d,p,o)
else{m=[0]
l=[0]
k=d.d2(a.b,m)
y=b.b
if(k>>>0!==k||k>=y.length)return H.a(y,k)
j=y[k]
y=new Float32Array(3)
x=new G.j(y)
if(0>=3)return H.a(y,0)
y[0]=0
if(1>=3)return H.a(y,1)
y[1]=0
if(2>=3)return H.a(y,2)
y[2]=0
y=x
x=new Float32Array(3)
w=new G.r(x)
if(0>=3)return H.a(x,0)
x[0]=0
if(1>=3)return H.a(x,1)
x[1]=0
if(2>=3)return H.a(x,2)
x[2]=0
x=w
i=new G.aK(y,x,0,1/0,0,0)
y=new Float32Array(3)
if(0>=3)return H.a(y,0)
y[0]=0
if(1>=3)return H.a(y,1)
y[1]=0
if(2>=3)return H.a(y,2)
y[2]=0
x=a.c
w=x.length
if(0>=w)return H.a(x,0)
v=x[0]
if(1>=w)return H.a(x,1)
u=x[1]
if(2>=w)return H.a(x,2)
t=x[2]
s=new Float32Array(2)
if(0>=2)return H.a(s,0)
s[0]=v
if(1>=2)return H.a(s,1)
s[1]=u
if(3>=w)return H.a(x,3)
u=x[3]
if(4>=w)return H.a(x,4)
h=j.cd(b,new G.c0(s,t),u,x[4],z.e,i,new G.a1(y),l)
if(h.Y()||l[0]===0)return this.iU(b,a0,n,a.f,a2,z.e,d,p,o)
else{y=new Float32Array(H.n(y))
x=new G.a1(y)
w=x.a_()
w=Math.sqrt(w)
v=y.length
if(0>=v)return H.a(y,0)
y[0]=y[0]/w
if(1>=v)return H.a(y,1)
y[1]=y[1]/w
if(2>=v)return H.a(y,2)
y[2]=y[2]/w
x=G.aq(x,i.b)
w=m[0]
y=l[0]
if(typeof x!=="number")return x.w()
h=h.i(0,x/(w*y))
y=new Float32Array(3)
if(0>=3)return H.a(y,0)
y[0]=0
if(1>=3)return H.a(y,1)
y[1]=0
if(2>=3)return H.a(y,2)
y[2]=0
x=new Float32Array(3)
if(0>=3)return H.a(x,0)
x[0]=0
if(1>=3)return H.a(x,1)
x[1]=0
if(2>=3)return H.a(x,2)
x[2]=0
w=new Float32Array(3)
if(0>=3)return H.a(w,0)
w[0]=0
if(1>=3)return H.a(w,1)
w[1]=0
if(2>=3)return H.a(w,2)
w[2]=0
v=new Float32Array(3)
if(0>=3)return H.a(v,0)
v[0]=0
if(1>=3)return H.a(v,1)
v[1]=0
if(2>=3)return H.a(v,2)
v[2]=0
u=new Float32Array(H.n(i.a.a))
t=new Float32Array(H.n(J.N(i.b)))
s=i.c
g=i.d
f=i.e
e=i.f
u=new G.j(new Float32Array(H.n(u)))
t=new G.r(new Float32Array(H.n(t)))
return this.mq(b,a0,n,a1,Y.lA(new G.as(!1,new G.j(y),new G.j(x),new G.r(w),new G.r(v),u,t,s,g,f,e),h,b,a.e,a1,null,null),a.f,a2,z.e,d,p,o)}}},
iU:function(a,b,c,d,e,f,g,h,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=G.q(0)
for(y=b.length,x=a.b,w=!0,v=!0,u=0;u<c;++u){if(u>=y)return H.a(b,u)
t=b[u]
s=t.d.a
r=s.a
q=s.b
if(w===!0)s=this.Q==null||!v
else s=!1
if(s){s=t.r
p=t.a
o=t.b
n=p.b.d
if(n!=null){p=p.a
o=n.d6(p.a,p.b,o)
p=o}else p=G.q(0)
z=z.j(0,s.i(0,p))}m=G.q(0)
if(this.Q==null||!v){if(u>=d.length)return H.a(d,u)
l=d[u]
k=[0]
j=g.d2(l.gf1(),k)
if(j>>>0!==j||j>=x.length)return H.a(x,j)
i=x[j]
m=t.r.i(0,G.fh(a,this,i,r,q,t.b,t.a.r,f,t.d,e,l.c,l.a,15)).w(0,k[0])}w=t.e
v=v&&w===!0
z=z.j(0,m)}if(!a0.Y())if(w===!0)y=this.Q==null||!v
else y=!1
else y=!1
if(y)for(u=0;u<x.length;++u)z=z.j(0,a0.i(0,x[u].aS(h)))
return z},
mq:function(a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
z=G.q(0)
y=H.k(a8+b0+2)
x=new Uint32Array(y)
for(w=a7.length,v=a9.length,u=0;u<a8;++u)for(t=0;t<b0;++t){if(u>=w)return H.a(a7,u)
if(a7[u].e!==!0){if(t>=v)return H.a(a9,t)
s=a9[t].e===!0}else s=!0
if(s){s=u+t+2
if(s>=y)return H.a(x,s)
x[s]=x[s]+1}}for(s=a6.b,r=a6.a,q=!0,p=!0,u=0;u<a8;u=c){if(u>=w)return H.a(a7,u)
o=a7[u]
n=o.d.a
m=n.a
l=n.b
if(q===!0)n=this.Q==null||!p
else n=!1
if(n){n=o.r
k=o.a
j=o.b
i=k.b.d
if(i!=null){k=k.a
j=i.d6(k.a,k.b,j)
k=j}else k=G.q(0)
z=z.j(0,n.i(0,k))}h=G.q(0)
if(this.Q==null||!p){if(u>=b1.length)return H.a(b1,u)
g=b1[u]
f=[0]
e=b4.d2(g.gf1(),f)
if(e>>>0!==e||e>=s.length)return H.a(s,e)
d=s[e]
h=o.r.i(0,G.fh(a6,this,d,m,l,o.b,o.a.r,b3,o.d,b2,g.c,g.a,15)).w(0,f[0])}q=o.e
p=p&&q===!0
c=u+1
if(c>=y)return H.a(x,c)
z=z.j(0,h.w(0,c-x[c]))
if(o.e!==!0)for(t=0;t<b0;++t){if(t>=v)return H.a(a9,t)
b=a9[t]
n=b.d.a
a=n.a
a0=n.b
if(b.e!==!0){n=a.l(0,m)
a1=n.w(0,n.E(0))
n=o.d.ay(o.b,a1)
k=o.f
if(typeof k!=="number")return H.b(k)
a2=n.i(0,1+k)
k=b.d.ay(a1.a2(0),b.b)
n=b.f
if(typeof n!=="number")return H.b(n)
a3=k.i(0,1+n)
if(a2.Y()||a3.Y())continue
n=a.l(0,m)
k=new G.j(new Float32Array(H.n(m.a)))
n=new G.r(new Float32Array(H.n(n.a)))
a4=r.a5(new G.aK(k,n,0.001,0.999,b3,0))
n=$.$get$az()
n.c=J.c(n.c,1)
$.az=n
if(!a4){n=u+t+2
if(n>=y)return H.a(x,n)
k=x[n]
j=J.d(G.aq(l,a1),G.aq(a0,a1))
a5=m.l(0,a).a_()
if(typeof j!=="number")return j.w()
z=z.j(0,o.r.i(0,a2).i(0,j/a5).i(0,a3).i(0,b.r).i(0,1/(n-k)))}}}}if(!b6.Y())if(q===!0)y=this.Q==null||!p
else y=!1
else y=!1
if(y)for(u=0;u<s.length;++u)z=z.j(0,b6.i(0,s[u].aS(b5)))
return z},
static:{iA:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u
z=b.a
z.a=d
z.b=e
y=a.a.P()
z.e=J.c(J.d(f,1-y),J.d(g,y))
z.c=a.a.P()
z.d=a.a.P()
if(typeof c!=="number")return H.b(c)
x=0
for(;x<c;++x){g=b.d
if(x>=g.length)return H.a(g,x)
w=g[x]
w.gah().b=a.a.P()
g=w.gah().a
z=a.a.P()
if(0>=g.length)return H.a(g,0)
g[0]=z
z=w.gah().a
g=a.a.P()
if(1>=z.length)return H.a(z,1)
z[1]=g
w.sdv(a.a.P())
g=b.f
if(x>=g.length)return H.a(g,x)
v=g[x]
v.gah().b=a.a.P()
g=v.gah().a
z=a.a.P()
if(0>=g.length)return H.a(g,0)
g[0]=z
z=v.gah().a
g=a.a.P()
if(1>=z.length)return H.a(z,1)
z[1]=g
v.sf1(a.a.P())
g=v.c
g.b=a.a.P()
g=g.a
z=a.a.P()
y=g.length
if(0>=y)return H.a(g,0)
g[0]=z
z=a.a.P()
if(1>=y)return H.a(g,1)
g[1]=z}if(h===!0){b.b=a.a.P()
for(g=b.c,z=g.length,x=0;x<5;++x){y=a.a.P()
if(x>=z)return H.a(g,x)
g[x]=y}for(g=b.e,x=0;x<c;++x){if(x>=g.length)return H.a(g,x)
u=g[x]
u.gah().b=a.a.P()
z=u.gah().a
y=a.a.P()
if(0>=z.length)return H.a(z,0)
z[0]=y
y=u.gah().a
z=a.a.P()
if(1>=y.length)return H.a(y,1)
y[1]=z
u.sdv(a.a.P())}}},aM:function(a,b,c,d){var z,y,x,w,v,u
z=J.O(c)
if(z.B(c,d))return c
y=Math.log(16)
x=J.y(d)
w=J.d(x.l(d,c),0.015625)
v=a.a.P()
u=J.d(w,Math.exp(-y*v))
y=J.w(b)
if(a.a.P()<0.5){b=y.j(b,u)
y=J.y(b)
if(y.av(b,d))b=z.j(c,y.l(b,d))}else{b=y.l(b,u)
if(J.K(b,c))b=x.l(d,z.l(c,b))}z=J.y(b)
return z.U(b,c)||z.av(b,d)?c:b},qX:function(a,b,c,d,e,f,g,h,i,j){var z,y,x,w,v,u
z=b.a
z.a=Y.aM(a,z.a,d,e)
z.b=Y.aM(a,z.b,f,g)
z.e=Y.aM(a,z.e,h,i)
z.c=Y.aM(a,z.c,0,1)
z.d=Y.aM(a,z.d,0,1)
if(typeof c!=="number")return H.b(c)
y=0
for(;y<c;++y){i=b.d
if(y>=i.length)return H.a(i,y)
x=i[y]
x.gah().b=Y.aM(a,x.gah().b,0,1)
i=x.gah().a
z=x.gah().a
if(0>=z.length)return H.a(z,0)
z=Y.aM(a,z[0],0,1)
if(0>=i.length)return H.a(i,0)
i[0]=z
z=x.gah().a
i=x.gah().a
if(1>=i.length)return H.a(i,1)
i=Y.aM(a,i[1],0,1)
if(1>=z.length)return H.a(z,1)
z[1]=i
x.b=Y.aM(a,x.gdv(),0,1)
i=b.f
if(y>=i.length)return H.a(i,y)
w=i[y]
w.gah().b=Y.aM(a,w.gah().b,0,1)
i=w.gah().a
z=w.gah().a
if(0>=z.length)return H.a(z,0)
z=Y.aM(a,z[0],0,1)
if(0>=i.length)return H.a(i,0)
i[0]=z
z=w.gah().a
i=w.gah().a
if(1>=i.length)return H.a(i,1)
i=Y.aM(a,i[1],0,1)
if(1>=z.length)return H.a(z,1)
z[1]=i
w.b=Y.aM(a,w.gf1(),0,1)
i=w.c
i.b=Y.aM(a,i.b,0,1)
i=i.a
z=i.length
if(0>=z)return H.a(i,0)
i[0]=Y.aM(a,i[0],0,1)
if(1>=z)return H.a(i,1)
i[1]=Y.aM(a,i[1],0,1)}if(j===!0){b.b=Y.aM(a,b.b,0,1)
for(i=b.c,z=i.length,y=0;y<5;++y){if(y>=z)return H.a(i,y)
i[y]=Y.aM(a,i[y],0,1)}for(i=b.e,y=0;y<c;++y){if(y>=i.length)return H.a(i,y)
v=i[y]
v.gah().b=Y.aM(a,v.gah().b,0,1)
z=v.gah().a
u=v.gah().a
if(0>=u.length)return H.a(u,0)
u=Y.aM(a,u[0],0,1)
if(0>=z.length)return H.a(z,0)
z[0]=u
u=v.gah().a
z=v.gah().a
if(1>=z.length)return H.a(z,1)
z=Y.aM(a,z[1],0,1)
if(1>=u.length)return H.a(u,1)
u[1]=z
v.b=Y.aM(a,v.gdv(),0,1)}}},lA:function(a,b,c,d,e,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=a1!=null
if(z)a1.ce(0)
for(y=c.a,x=e.length,w=b,v=a,u=0;u<d.length;++u){if(u>=x)return H.a(e,u)
t=e[u]
s=t.a
r=y.ae(v,s)
q=$.$get$ay()
q.c=J.c(q.c,1)
$.ay=q
if(!r){if(z)a1.L(w)
if(a0!=null)a0.L(v)
break}t.r=w
p=s.ba(v)
t.d=p
t.b=J.M(v.b)
o=[0]
n=[0]
q=J.M(v.b)
m=t.c
if(u>=d.length)return H.a(d,u)
l=p.d3(q,m,d[u].gah(),o,31,n)
q=n[0]
if(typeof q!=="number")return q.T()
t.e=(q&16)!==0
t.f=p.cU(19)
if(!l.Y()){if(0>=o.length)return H.a(o,0)
q=J.i(o[0],0)}else q=!0
if(q)return u+1
q=p.a
k=q.a
q=l.i(0,G.aq(m,q.b))
if(0>=o.length)return H.a(o,0)
j=q.w(0,o[0])
i=P.X(1,j.aC())
if(u>=d.length)return H.a(d,u)
if(J.F(d[u].gdv(),i))return u+1
w=w.i(0,j.w(0,i))
s=s.r
q=new Float32Array(3)
if(0>=3)return H.a(q,0)
q[0]=0
if(1>=3)return H.a(q,1)
q[1]=0
if(2>=3)return H.a(q,2)
q[2]=0
h=new Float32Array(3)
if(0>=3)return H.a(h,0)
h[0]=0
if(1>=3)return H.a(h,1)
h[1]=0
if(2>=3)return H.a(h,2)
h[2]=0
g=new Float32Array(3)
if(0>=3)return H.a(g,0)
g[0]=0
if(1>=3)return H.a(g,1)
g[1]=0
if(2>=3)return H.a(g,2)
g[2]=0
f=new Float32Array(3)
if(0>=3)return H.a(f,0)
f[0]=0
if(1>=3)return H.a(f,1)
f[1]=0
if(2>=3)return H.a(f,2)
f[2]=0
v=new G.as(!1,new G.j(q),new G.j(h),new G.r(g),new G.r(f),new G.j(new Float32Array(H.n(k.a))),new G.r(new Float32Array(H.n(m.a))),s,1/0,v.e,v.f+1)}return u}}},
cX:{
"^":"o;ah:a<,dv:b@"},
h9:{
"^":"o;ah:a<,f1:b@,c"},
cY:{
"^":"o;a,b,c,d,e,f,dS:r>"},
jX:{
"^":"o;a,b,c,d,e,f",
n7:function(a){var z,y,x,w,v,u
if(typeof a!=="number")return H.b(a)
z=this.f
y=this.e
x=this.d
w=0
for(;w<a;++w){v=new Float32Array(2)
if(0>=2)return H.a(v,0)
v[0]=0
if(1>=2)return H.a(v,1)
v[1]=0
if(w>=x.length)return H.a(x,w)
x[w]=new Y.cX(new G.cw(v,0),0)
v=new Float32Array(2)
if(0>=2)return H.a(v,0)
v[0]=0
if(1>=2)return H.a(v,1)
v[1]=0
if(w>=y.length)return H.a(y,w)
y[w]=new Y.cX(new G.cw(v,0),0)
v=new Float32Array(2)
if(0>=2)return H.a(v,0)
v[0]=0
if(1>=2)return H.a(v,1)
v[1]=0
u=new Float32Array(2)
if(0>=2)return H.a(u,0)
u[0]=0
if(1>=2)return H.a(u,1)
u[1]=0
if(w>=z.length)return H.a(z,w)
z[w]=new Y.h9(new G.cw(v,0),0,new G.c0(u,0))}},
n8:function(a){var z,y,x,w,v,u,t
for(z=this.d,y=0;y<z.length;++y){x=z[y]
w=x.gah()
v=new Float32Array(H.n(w.a))
w=w.b
x=x.gdv()
if(y>=z.length)return H.a(z,y)
z[y]=new Y.cX(new G.cw(v,w),x)}for(z=this.e,y=0;y<z.length;++y){x=z[y]
w=x.gah()
v=new Float32Array(H.n(w.a))
w=w.b
x=x.gdv()
if(y>=z.length)return H.a(z,y)
z[y]=new Y.cX(new G.cw(v,w),x)}for(z=this.f,y=0;y<z.length;++y){x=z[y]
w=x.gah()
v=new Float32Array(H.n(w.a))
w=w.b
u=x.gf1()
x=x.c
t=new Float32Array(H.n(x.a))
x=x.b
if(y>=z.length)return H.a(z,y)
z[y]=new Y.h9(new G.cw(v,w),u,new G.c0(t,x))}},
static:{jY:function(a){var z,y
z=new Float32Array(H.k(5))
y=G.oo()
if(typeof a!=="number")return H.b(a)
z=new Y.jX(y,0,z,H.p(Array(a),[Y.cX]),H.p(Array(a),[Y.cX]),H.p(Array(a),[Y.h9]))
z.n7(a)
return z},n5:function(a){var z
new Float32Array(H.k(5))
z=new Y.jX(G.kF(a.a),a.b,new Float32Array(H.n(a.c)),P.aE(a.d,!0,Y.cX),P.aE(a.e,!0,Y.cX),P.aE(a.f,!0,Y.h9))
z.n8(a)
return z}}},
vO:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
aU:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7
z=this.f
y=this.e
x=J.y(z)
w=this.x
v=this.r
u=J.d(x.l(z,y),J.h(w,v))
t=this.db
s=t.f
r=J.ac(s,t.x)
q=J.w(u)
p=q.i(u,r)
o=this.a
n=q.i(u,s)
if(typeof p!=="number")return H.b(p)
m=J.G(n,(o+1)*p)
o=this.cy
o.gb0().slE(m)
q=this.a
l=new G.b6(P.b3(q))
q=t.r
if(typeof q!=="number")return H.b(q)
k=H.p(Array(q),[Y.cY])
q=t.r
if(typeof q!=="number")return H.b(q)
j=H.p(Array(q),[Y.cY])
q=j.length
i=k.length
h=0
while(!0){g=t.r
if(typeof g!=="number")return H.b(g)
if(!(h<g))break
g=G.ag()
f=new Float32Array(3)
if(0>=3)return H.a(f,0)
f[0]=0
if(1>=3)return H.a(f,1)
f[1]=0
if(2>=3)return H.a(f,2)
f[2]=0
e=new Float32Array(3)
if(0>=3)return H.a(e,0)
e[0]=0
if(1>=3)return H.a(e,1)
e[1]=0
if(2>=3)return H.a(e,2)
e[2]=0
d=G.q(0)
if(h>=i)return H.a(k,h)
k[h]=new Y.cY(new G.b0(g,null,null,null,0,0,0),new G.r(f),new G.r(e),null,null,null,d)
d=G.ag()
g=new Float32Array(3)
if(0>=3)return H.a(g,0)
g[0]=0
if(1>=3)return H.a(g,1)
g[1]=0
if(2>=3)return H.a(g,2)
g[2]=0
f=new Float32Array(3)
if(0>=3)return H.a(f,0)
f[0]=0
if(1>=3)return H.a(f,1)
f[1]=0
if(2>=3)return H.a(f,2)
f[2]=0
e=G.q(0)
if(h>=q)return H.a(j,h)
j[h]=new Y.cY(new G.b0(d,null,null,null,0,0,0),new G.r(g),new G.r(f),null,null,null,e);++h}c=H.p(Array(2),[Y.jX])
for(h=0;h<2;++h)c[h]=Y.jY(t.r)
b=H.p(Array(2),[G.ai])
q=H.k(2)
a=new Float32Array(q)
i=this.ch
c[0]=Y.n5(i)
g=this.cx
f=this.dx
i=t.ip(i,g,o,f,k,j,l)
b[0]=i
i=i.aC()
if(0>=q)return H.a(a,0)
a[0]=i
i=H.k(u)
a0=new Uint32Array(i)
if(typeof u!=="number")return H.b(u)
h=0
for(;h<u;++h){if(h>=i)return H.a(a0,h)
a0[h]=h}G.cL(a0,0,u,1,l)
for(e=t.z,d=this.y,a1=this.z,a2=t.d,a3=J.w(y),a4=J.w(v),a5=this.b,a6=this.c,a7=0,a8=0,a9=1,b0=0,b1=0;b1<p;++b1){if(a8<0||a8>=2)return H.a(c,a8)
b2=Y.n5(c[a8])
if(a9<0||a9>=2)return H.a(c,a9)
c[a9]=b2
if(typeof r!=="number")return H.b(r)
if(C.a.R(b1,r)===0){if(b0>=i)return H.a(a0,b0)
b3=a3.j(y,J.bW(a0[b0],x.l(z,y)))
b4=a4.j(v,J.ac(a0[b0],x.l(z,y)))
Y.iA(l,c[a9],t.r,J.c(b3,a5),J.c(b4,a6),d,a1,a2);++b0}else Y.qX(l,b2,t.r,y,z,v,w,d,a1,a2)
b2=t.ip(c[a9],g,o,f,k,j,l)
b[a9]=b2
b2=b2.aC()
if(a9>=q)return H.a(a,a9)
a[a9]=b2
b2=a[a9]
if(a8>=q)return H.a(a,a8)
b5=P.X(1,b2/a[a8])
b2=a[a8]
if(b2>0)if(isFinite(1/b2)){b2=b[a8]
b6=this.Q
if(typeof s!=="number")return H.b(s)
b7=b2.i(0,b6/s).w(0,a[a8])
o.gb0().iO(c[a8].a,b7.i(0,1-b5))}b2=a[a9]
if(b2>0)if(isFinite(1/b2)){b2=b[a9]
b6=this.Q
if(typeof s!=="number")return H.b(s)
b7=b2.i(0,b6/s).w(0,a[a9])
o.gb0().iO(c[a9].a,b7.i(0,b5))}if(typeof e!=="number")return H.b(e)
if(a7>=e||l.a.P()<b5){a8^=1
a9^=1
a7=0}else ++a7}o.gb0().lh(y,v,z,w,m)
o.gb0().lk(m)}},
ts:{
"^":"eC;a,b,c,d,e,f",
ea:function(a){var z,y,x,w,v,u
z=this.d
y="Starting SamplerRenderer: "+z.gb0().gfe()+"x"+z.gb0().gll()
$.t.$2(0,y)
y=this.e
y.cc(a,z,this)
x=this.f
x.cc(a,z,this)
w=this.c
v=G.fH(w,y,x,a)
x=this.a
y=this.b
u=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[G.bi])),[G.bi])
new Y.nb(a,this,z,w,v,x,y).aU().ai(new Y.tt(this,u))
return u.a},
ak:function(a,b,c,d,e,f){var z,y,x,w,v,u
if(f==null)f=G.q(0)
z=this.f
y=z==null
if(y)f.ce(1)
if(e==null)e=G.em()
if(a.ae(b,e))x=this.e.ak(a,this,b,e,c,d)
else{x=G.q(0)
for(w=a.b,v=0;v<w.length;++v)x=x.j(0,w[v].aS(b))}u=y?G.q(0):z.ak(a,this,b,c,d,f)
return J.c(J.d(f,x),u)},
ew:function(a,b,c,d){return this.ak(a,b,c,d,null,null)},
hd:function(a,b,c,d,e){return this.ak(a,b,c,d,e,null)},
bj:function(a,b,c,d){return this.f.iz(a,this,b,c,d)}},
tt:{
"^":"z:0;a,b",
$1:function(a){this.b.aB(0,this.a.d.gb0().iC())}},
nb:{
"^":"o;a,b,c,d,e,f,r",
aU:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
y=this.d
if(y==null){z.aM(0)
return z.a}x=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
w=J.C(y)
w="SamplerRender "+H.m(this.f)+" / "+H.m(this.r)+": ["+H.m(w.gca(y))+" "+H.m(w.gbH(y))+" "+H.m(w.gN(y))+" "+H.m(w.gM(y))+"]"
$.t.$2(0,w)
w=this.f
v=new G.b6(w==null?C.V:P.b3(w))
u=y.e7()
t=this.e.kv(u)
if(typeof u!=="number")return H.b(u)
s=H.p(Array(u),[G.as])
r=H.p(Array(u),[G.ai])
q=H.p(Array(u),[G.ai])
p=H.p(Array(u),[G.b0])
for(w=s.length,o=r.length,n=q.length,m=p.length,l=0;l<u;++l){k=new Float32Array(3)
if(0>=3)return H.a(k,0)
k[0]=0
if(1>=3)return H.a(k,1)
k[1]=0
if(2>=3)return H.a(k,2)
k[2]=0
j=new Float32Array(3)
if(0>=3)return H.a(j,0)
j[0]=0
if(1>=3)return H.a(j,1)
j[1]=0
if(2>=3)return H.a(j,2)
j[2]=0
i=new Float32Array(3)
if(0>=3)return H.a(i,0)
i[0]=0
if(1>=3)return H.a(i,1)
i[1]=0
if(2>=3)return H.a(i,2)
i[2]=0
h=new Float32Array(3)
if(0>=3)return H.a(h,0)
h[0]=0
if(1>=3)return H.a(h,1)
h[1]=0
if(2>=3)return H.a(h,2)
h[2]=0
g=new Float32Array(3)
f=new G.j(g)
if(0>=3)return H.a(g,0)
g[0]=0
if(1>=3)return H.a(g,1)
g[1]=0
if(2>=3)return H.a(g,2)
g[2]=0
g=f
f=new Float32Array(3)
e=new G.r(f)
if(0>=3)return H.a(f,0)
f[0]=0
if(1>=3)return H.a(f,1)
f[1]=0
if(2>=3)return H.a(f,2)
f[2]=0
f=e
if(l>=w)return H.a(s,l)
s[l]=new G.as(!1,new G.j(k),new G.j(j),new G.r(i),new G.r(h),g,f,0,1/0,0,0)
f=G.q(0)
if(l>=o)return H.a(r,l)
r[l]=f
f=G.q(0)
if(l>=n)return H.a(q,l)
q[l]=f
f=G.ag()
if(l>=m)return H.a(p,l)
p[l]=new G.b0(f,null,null,null,0,0,0)}for(k=t.length,j=this.c,i=this.b,h=this.a;!0;){d=y.bv(t,v)
if(J.i(d,0)){w=x.a
if(w.a!==0)H.T(new P.aY("Future already completed"))
w.d8(null)
break}if(typeof d!=="number")return H.b(d)
l=0
for(;l<d;++l){if(l>=k)return H.a(t,l)
g=$.$get$eE()
g.c=J.c(g.c,1)
$.eE=g
g=t[l]
if(l>=w)return H.a(s,l)
c=j.en(g,s[l])
g=s[l]
f=y.r
if(typeof f!=="number")H.T(H.Y(f))
g.iJ(1/Math.sqrt(f))
if(c>0){g=s[l]
f=t[l]
if(l>=m)return H.a(p,l)
e=p[l]
if(l>=n)return H.a(q,l)
e=J.d(i.ak(h,g,f,v,e,q[l]),c)
if(l>=o)return H.a(r,l)
r[l]=e}else{g=G.q(0)
if(l>=o)return H.a(r,l)
r[l]=g
g=G.q(1)
if(l>=n)return H.a(q,l)
q[l]=g}if(l>=o)return H.a(r,l)
if(r[l].bT()){$.t.$2(1,"Not-a-number radiance value returned for image sample. Setting to black.")
r[l]=G.q(0)}else if(r[l].aC()<-0.00001){g="Negative luminance value, "+H.m(r[l].aC())+", returnedfor image sample. Setting to black."
$.t.$2(1,g)
r[l]=G.q(0)}else{g=r[l].aC()
if(g==1/0||g==-1/0){$.t.$2(1,"Infinite luminance value returnedfor image sample. Setting to black.")
r[l]=G.q(0)}}}if(y.l4(t,s,r,p,d))for(l=0;l<d;++l){if(l>=k)return H.a(t,l)
if(l>=w)return H.a(s,l)
if(l>=o)return H.a(r,l)
if(l>=n)return H.a(q,l)
j.gb0().pv(t[l],r[l])}}x.a.ai(new Y.w3(this,z,y))
return z.a}},
w3:{
"^":"z:0;a,b,c",
$1:function(a){var z=this.c
this.a.c.gb0().ri(z.a,z.b,z.c,z.d)
this.b.aM(0)}},
mo:{
"^":"eC;a,b,c,d,e",
ea:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=new P.bT(null,null)
H.bQ()
$.aL=$.bs
z.bP(0)
$.t.$2(0,"Starting SurfacePointsRenderer. This may take a few minutes...")
y=a.d
x=J.C(y)
w=x.li(y)
H.v(w)
H.v(0.3333333333333333)
x.i4(y,0.001*Math.pow(w,0.3333333333333333))
v=new G.lI(16,G.bK(y),G.n6())
u=new G.j(new Float32Array(H.k(3)))
u.C(0,0,0)
t=a.d.dU(u)
s=G.cQ(u.l(0,$.$get$ey()))
r=M.jc(s,G.Z(s.b,s.a),!0,t,-t,t,360)
w=$.aN
$.aN=w+1
q=new G.ei(r,null,null,w)
p=new Y.we(0,0,0,0,0)
o=G.fE()===!0?P.I(10,200):2000
for(x=this.c,w=this.a,n=this.e,m=0;m<1;++m)new Y.wf(m,a,x,this.b,w,o,p,q,v,n).aU()
x="FINISHED SurfacePointsRenderer, "+n.length+" points : "+P.bN(0,0,J.ac(J.d(z.gbz(),1e6),$.aL),0,0,0).K(0)
$.t.$2(0,x)
if(J.bE(this.d)){x=H.k(n.length*8)
l=new Float32Array(x)
for(w=n.length,k=0,m=0;m<w;++m){j=n[m]
i=k+1
h=j.a.a
g=h.length
if(0>=g)return H.a(h,0)
f=h[0]
if(k>=x)return H.a(l,k)
l[k]=f
k=i+1
if(1>=g)return H.a(h,1)
f=h[1]
if(i>=x)return H.a(l,i)
l[i]=f
i=k+1
if(2>=g)return H.a(h,2)
h=h[2]
if(k>=x)return H.a(l,k)
l[k]=h
k=i+1
h=j.b.a
g=h.length
if(0>=g)return H.a(h,0)
f=h[0]
if(i>=x)return H.a(l,i)
l[i]=f
i=k+1
if(1>=g)return H.a(h,1)
f=h[1]
if(k>=x)return H.a(l,k)
l[k]=f
k=i+1
if(2>=g)return H.a(h,2)
h=h[2]
if(i>=x)return H.a(l,i)
l[i]=h
i=k+1
if(k>=x)return H.a(l,k)
l[k]=j.c
k=i+1
if(i>=x)return H.a(l,i)
l[i]=j.d}x=this.d
$.au.c.k(0,x,l)}e=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[G.bi])),[G.bi])
e.aB(0,null)
return e.a},
ak:function(a,b,c,d,e,f){return G.q(0)}},
we:{
"^":"o;a,b,c,d,e"},
n8:{
"^":"o:48;a,b,au:c>",
$1:function(a){var z,y
z=J.b8(a)
z=this.c.l(0,z).a_()
y=this.a
if(typeof y!=="number")return H.b(y)
if(z<y){this.b=!0
return!1}return!0},
b9:function(a,b,c,d,e){return this.c.$4(b,c,d,e)}},
wf:{
"^":"o;a,b,dr:c>,d,e,f,r,x,y,z",
aU:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=this.a
y=new G.b6(P.b3(37*z))
x=[]
w=G.em()
for(z=this.r,v=this.z,u=this.f,t=this.b.a,s=this.x;!0;){for(r=0,q=0;r<2e4;++r){p=G.bv(y.a.P(),y.a.P())
o=this.c
n=this.d
o=new G.j(new Float32Array(H.n(o.a)))
m=new G.r(new Float32Array(H.n(p.a)))
l=new G.aK(o,m,0,1/0,n,0)
for(;l.f<30;){++q
k=t.ae(l,w)
o=$.$get$ay()
o.c=J.c(o.c,1)
$.ay=o
if(!k){if(!s.ae(l,w))break
j=!0}else j=!1
i=w.a
o=i.b
if(J.K(G.J(o,J.M(l.b)),0)){n=J.C(o)
m=J.M(n.gG(o))
h=J.M(n.gF(o))
o=J.M(n.gS(o))
n=new Float32Array(3)
g=new G.a1(n)
if(0>=3)return H.a(n,0)
n[0]=m
if(1>=3)return H.a(n,1)
n[1]=h
if(2>=3)return H.a(n,2)
n[2]=o
o=g}i.b=o
if(!j)if(l.f>=3){o=new Float32Array(3)
if(0>=3)return H.a(o,0)
o[0]=0
if(1>=3)return H.a(o,1)
o[1]=0
if(2>=3)return H.a(o,2)
o[2]=0
n=new Float32Array(3)
if(0>=3)return H.a(n,0)
n[0]=0
if(1>=3)return H.a(n,1)
n[1]=0
if(2>=3)return H.a(n,2)
n[2]=0
m=new Float32Array(3)
if(0>=3)return H.a(m,0)
m[0]=0
if(1>=3)return H.a(m,1)
m[1]=0
if(2>=3)return H.a(m,2)
m[2]=0
h=new Float32Array(3)
if(0>=3)return H.a(h,0)
h[0]=0
if(1>=3)return H.a(h,1)
h[1]=0
if(2>=3)return H.a(h,2)
h[2]=0
g=new Float32Array(H.n(l.a.a))
f=new Float32Array(H.n(J.N(l.b)))
e=l.c
d=l.d
c=l.e
b=l.f
g=new G.j(new Float32Array(H.n(g)))
f=new G.r(new Float32Array(H.n(f)))
b=w.iD(new G.as(!1,new G.j(o),new G.j(n),new G.r(m),new G.r(h),g,f,e,d,c,b))!=null
o=b}else o=!1
else o=!1
if(o){o=J.G(this.e,2)
if(typeof o!=="number")return H.b(o)
n=J.G(this.e,2)
if(typeof n!=="number")return H.b(n)
m=i.a
h=i.b
g=w.r
x.push(new G.fL(new G.j(new Float32Array(H.n(m.a))),new G.a1(new Float32Array(H.n(J.N(h)))),3.141592653589793*o*n,g))}p=G.fZ(G.bv(y.a.P(),y.a.P()),i.b)
o=i.a
n=w.r
l=new G.aK(new G.j(new Float32Array(H.n(o.a))),new G.r(new Float32Array(H.n(J.N(p)))),n,1/0,l.e,l.f+1)}}a=[]
for(a0=0;a0<x.length;++a0){o=this.e
n=x[a0]
a1=new Y.n8(J.d(o,o),!1,n.a)
n=this.y
if(a0>=x.length)return H.a(x,a0)
n.e5(x[a0].a,a1)
a.push(a1.b)}if(z.a>=u)return
z.c+=r
z.d+=q
for(a0=0;a0<x.length;++a0){if(a0>=a.length)return H.a(a,a0)
if(a[a0]){o=++z.a
z.b=P.I(z.b,o)
if(z.a>=u)return}else{a2=x[a0]
o=this.e
n=a2.a
a1=new Y.n8(J.d(o,o),!1,n)
this.y.e5(n,a1)
if(a1.b){o=++z.a
z.b=P.I(z.b,o)
if(z.a>=u)return}else{++z.e
z.a=0
o=this.e
m=new Float32Array(3)
a3=new G.r(m)
if(0>=3)return H.a(m,0)
m[0]=o
if(1>=3)return H.a(m,1)
m[1]=o
if(2>=3)return H.a(m,2)
m[2]=o
o=this.y
n=G.a9(n.l(0,a3),n.j(0,a3))
m=n.a
o.jb(o.c,o.b,a2,n,n.b.l(0,m).a_())
v.push(a2)}}}if(z.c>5e4&&z.e===0){$.t.$2(1,"There don't seem to be any objects with BSSRDFs in this scene. Giving up.")
return}C.c.sn(x,0)}}}}],["","",,U,{
"^":"",
ho:{
"^":"dQ;x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r",
bt:function(a){return G.aX(a)},
e7:function(){return this.ch},
bv:function(a,b){var z,y,x
if(this.dy===0&&this.dx!=null){z=this.dx.bv(a,b)
if(!J.i(z,0))return z;++this.dy}y=this.cx
if(y==null){if(0>=a.length)return H.a(a,0)
y=new Float32Array(H.k(G.lo(a[0],this.ch)))
this.cx=y}if(this.db){x=this.y
G.ik(x[0],x[1],this.e,this.f,this.ch,a,y,b)
return this.ch}else{y=this.z
x=this.x.cV()
if(typeof x!=="number")return H.b(x)
if(y>=x)return 0
y=this.y
G.ik(y[0],y[1],this.e,this.f,this.Q,a,this.cx,b)
return this.Q}},
l4:function(a,b,c,d,e){var z,y,x
if(this.dy===0&&this.dx!=null)return!0
if(this.db){this.db=!1
z=this.z
y=this.x
x=y.cV()
if(typeof x!=="number")return H.b(x)
if(z<x)y.bb(++this.z,this.y)
return!0}else if(this.qF(a,b,c,d,e)){this.db=!0
return!1}else{z=this.z
y=this.x
x=y.cV()
if(typeof x!=="number")return H.b(x)
if(z<x)y.bb(++this.z,this.y)
return!0}},
qF:function(a,b,c,d,e){var z,y,x,w,v,u,t
switch(this.cy){case 0:z=J.y(e)
y=d.length
x=0
while(!0){w=z.l(e,1)
if(typeof w!=="number")return H.b(w)
if(!(x<w))break
if(x>=y)return H.a(d,x)
w=d[x]
v=w.e;++x
if(x>=y)return H.a(d,x)
u=d[x]
if(v!==u.e||w.f!==u.f)return!0}return!1
case 1:if(typeof e!=="number")return H.b(e)
z=c.length
t=0
x=0
for(;x<e;++x){if(x>=z)return H.a(c,x)
t+=c[x].aC()}t/=e
for(x=0;x<e;++x){if(x>=z)return H.a(c,x)
if(Math.abs(c[x].aC()-t)/t>0.5)return!0}return!1}return!1},
static:{zj:[function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p
z=a.V("minsamples",4)
y=a.V("maxsamples",32)
x=a.aO("method","contrast")
w=J.O(x)
if(w.B(x,"contrast"))v=1
else v=w.B(x,"shapeid")?0:-1
if(v===-1){w="Adaptive sampling metric '"+H.m(x)+"' unknown. Using 'contrast'."
$.t.$2(1,w)}w=f.gaZ()
u=f.gd5()
t=new Int32Array(H.k(2))
s=new U.ho(g,t,null,null,null,null,null,null,null,null,b,c,d,e,w,u,G.aX(P.I(z,y)))
if(g==null)$.t.$2(3,"A PixelSampler is required by AdaptiveSampler")
g.cf(b,c,d,e)
s.z=0
s.db=!1
g.bb(0,t)
if(J.F(z,y)){r=z
q=y}else{r=y
q=z}t=J.y(q)
if(t.T(q,t.l(q,1))!==0){$.t.$2(1,"Minimum pixel samples being rounded up to power of 2")
t=G.aX(q)
s.Q=t}else{s.Q=q
t=q}p=J.y(r)
if(p.T(r,p.l(r,1))!==0){$.t.$2(1,"Maximum pixel samples being rounded up to power of 2")
p=G.aX(r)
s.ch=p}else{s.ch=r
p=r}if(typeof t!=="number")return t.U()
if(t<2){$.t.$2(1,"Adaptive sampler needs at least two initial pixel samples. Using two.")
s.Q=2
t=2}if(t===p){p=J.d(p,2)
s.ch=p
p="Adaptive sampler must have more maximum samples than minimum. Using "+H.m(t)+" - "+H.m(p)
$.t.$2(1,p)}s.dy=0
if(J.i(G.bS(),1)||J.i(G.bS(),2))s.dx=U.dP(b,c,d,e,w,u,g,1)
return s},"$7","yn",14,0,94]}},
hs:{
"^":"dQ;x,y,z,Q,ch,cx,cy,db,dx,dy,fr,a,b,c,d,e,f,r",
bt:function(a){return G.aX(a)},
e7:function(){return 1},
bv:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(this.fr===0&&this.dy!=null){z=this.dy.bv(a,b)
if(!J.i(z,0))return z
y=this.fr
if(typeof y!=="number")return y.j()
this.fr=y+1}if(0>=a.length)return H.a(a,0)
x=a[0]
for(y=this.dx,w=this.e,v=this.f,u=J.w(w),t=J.w(v),s=!0;s;){if(this.y===4096){this.y=0
r=this.cy
if(typeof r!=="number")return r.j();++r
this.cy=r
q=this.Q
if(typeof q!=="number")return H.b(q)
if(r>q){r=this.z
this.cy=r
q=this.db
if(typeof q!=="number")return q.j();++q
this.db=q
p=this.cx
if(typeof p!=="number")return H.b(p)
if(q>p)return 0}q=this.db
if(typeof q!=="number")return q.u()
o=new G.b6(P.b3(r+(q<<8>>>0)))
for(n=0;n<3;++n)y[n]=o.a.P()}r=new U.oh()
q=this.y
if(typeof q!=="number")return q.i()
m=q*5
q=this.cy
if(m>=20480)return H.a(C.q,m)
p=C.q[m]
if(typeof q!=="number")return q.j()
l=this.x
x.a=(q+p)*l
p=this.db
q=m+1
if(q>=20480)return H.a(C.q,q)
q=C.q[q]
if(typeof p!=="number")return p.j()
x.b=(p+q)*l
l=y[0]
q=m+2
if(q>=20480)return H.a(C.q,q)
q=r.$1(l+C.q[q])
if(typeof q!=="number")return H.b(q)
x.e=J.c(u.i(w,1-q),t.i(v,q))
q=y[1]
l=m+3
if(l>=20480)return H.a(C.q,l)
x.c=r.$1(q+C.q[l])
l=y[2]
q=m+4
if(q>=20480)return H.a(C.q,q)
x.d=r.$1(l+C.q[q])
if(J.K(x.a,this.a)||J.F(x.a,J.h(J.c(this.a,this.c),1))||J.K(x.b,this.a)||J.F(x.b,J.h(J.c(this.a,this.c),1))){r=this.y
if(typeof r!=="number")return r.j()
this.y=r+1
s=!0
continue}s=!1}for(n=0;y=x.f,n<y.length;++n){y=y[n]
w=x.x
if(n>=w.length)return H.a(w,n)
G.d8(y,1,w[n],b)}for(n=0;y=x.r,n<y.length;++n){y=y[n]
w=x.y
if(n>=w.length)return H.a(w,n)
G.d9(y,1,w[n],b)}y=this.y
if(typeof y!=="number")return y.j()
this.y=y+1
return 1},
lZ:function(a,b,c,d,e,f,g){var z,y,x,w,v
z=64/Math.sqrt(H.v(g))
this.x=z
this.z=J.a_(J.G(this.a,z))
this.Q=J.a_(J.G(J.h(J.c(this.a,this.c),1),this.x))
this.ch=J.a_(J.G(this.b,this.x))
this.cx=J.a_(J.G(J.h(J.c(this.b,this.d),1),this.x))
z=this.z
this.cy=z
y=this.ch
this.db=y
this.y=0
if(typeof y!=="number")return y.u()
x=new G.b6(P.b3(z+(y<<8>>>0)))
for(z=this.dx,w=0;w<3;++w)z[w]=x.a.P()
this.fr=0
if(J.i(G.bS(),1)||J.i(G.bS(),2)){v=new F.dU(32,!0,null,null,null,null,null,null)
v.cf(a,b,c,d)
this.dy=U.dP(a,b,c,d,e,f,v,1)}},
static:{og:function(a,b,c,d,e,f,g){var z=new U.hs(null,null,null,null,null,null,null,null,[0,0,0],null,null,a,b,c,d,e,f,g)
z.lZ(a,b,c,d,e,f,g)
return z},zq:[function(a,b,c,d,e,f,g){var z=a.V("pixelsamples",4)
return U.og(b,c,d,e,f.gaZ(),f.gd5(),z)},"$7","yo",14,0,95]}},
oh:{
"^":"z:0;",
$1:function(a){return a>1?a-1:a}},
hY:{
"^":"dQ;x,y,z,Q,a,b,c,d,e,f,r",
e7:function(){return 1},
bv:function(a,b){var z,y,x,w,v,u,t,s,r,q
if(this.Q===0&&this.z!=null){z=this.z.bv(a,b)
if(!J.i(z,0))return z;++this.Q}for(y=a.length;!0;){x=this.y
w=this.x
if(typeof w!=="number")return H.b(w)
if(x>=w)return 0
v=G.cI(x,3)
u=G.cI(this.y,2)
t=C.b.dw(P.I(this.c,this.d))
if(0>=y)return H.a(a,0)
x=a[0]
w=this.a
s=J.w(w)
r=s.j(w,t)
x.a=J.c(s.i(w,1-v),J.d(r,v))
r=a[0]
w=this.b
s=J.w(w)
x=s.j(w,t)
r.b=J.c(s.i(w,1-u),J.d(x,u));++this.y
if(J.F(a[0].a,J.h(J.c(this.a,this.c),1))||J.F(a[0].b,J.h(J.c(this.b,this.d),1)))continue
break}if(0>=y)return H.a(a,0)
a[0].c=G.cI(this.y,5)
a[0].d=G.cI(this.y,7)
y=a[0]
x=G.cI(this.y,11)
y.e=J.c(J.d(this.e,1-x),J.d(this.f,x))
for(q=0;y=a[0],x=y.f,q<x.length;++q){y=y.x
if(q>=y.length)return H.a(y,q)
G.fk(y[q],x[q],1,b)}for(q=0;y=a[0],x=y.r,q<x.length;++q){y=y.y
if(q>=y.length)return H.a(y,q)
G.fk(y[q],x[q],2,b)}return 1},
bt:function(a){return a},
me:function(a,b,c,d,e,f,g){var z,y
z=P.I(c,d)
this.x=J.d(J.d(this.r,z),z)
this.y=0
this.Q=0
if(J.i(G.bS(),1)||J.i(G.bS(),2)){y=new F.dU(32,!0,null,null,null,null,null,null)
y.cf(a,b,c,d)
this.z=U.dP(a,b,c,d,e,f,y,1)}},
static:{la:function(a,b,c,d,e,f,g){var z=new U.hY(null,null,null,null,a,b,c,d,e,f,g)
z.me(a,b,c,d,e,f,g)
return z},Aq:[function(a,b,c,d,e,f,g){var z=a.V("pixelsamples",4)
return U.la(b,c,d,e,f.gaZ(),f.gd5(),z)},"$7","yp",14,0,96]}},
it:{
"^":"dQ;x,y,z,Q,ch,cx,cy,a,b,c,d,e,f,r",
bt:function(a){return G.aX(a)},
bv:function(a,b){var z,y,x,w
if(this.cy===0&&this.cx!=null){z=this.cx.bv(a,b)
if(!J.i(z,0))return z;++this.cy}y=this.z
x=this.x
w=x.cV()
if(typeof w!=="number")return H.b(w)
if(y>=w)return 0
if(this.ch==null){if(0>=a.length)return H.a(a,0)
this.ch=new Float32Array(H.k(G.lo(a[0],this.Q)))}y=this.y
x.bb(this.z++,y)
G.ik(y[0],y[1],this.e,this.f,this.Q,a,this.ch,b)
return this.Q},
e7:function(){return this.Q},
mw:function(a,b,c,d,e,f,g,h){var z,y
z=this.x
if(z==null)$.t.$2(3,"A PixelSampler is required by LowDiscrepencySampler")
z.cf(a,b,c,d)
this.z=0
y=J.y(h)
if(y.T(h,y.l(h,1))!==0){this.Q=G.aX(h)
y="Pixel samples being rounded up to power of 2: "+H.m(h)+" => "+H.m(this.Q)
$.t.$2(1,y)}else this.Q=h
this.ch=null
this.cy=0
if(J.i(G.bS(),1)||J.i(G.bS(),2))this.cx=U.dP(a,b,c,d,e,f,z,1)},
static:{lv:function(a,b,c,d,e,f,g,h){var z=new U.it(g,new Int32Array(H.k(2)),null,null,null,null,null,a,b,c,d,e,f,G.aX(h))
z.mw(a,b,c,d,e,f,g,h)
return z},AN:[function(a,b,c,d,e,f,g){var z=a.V("pixelsamples",4)
return U.lv(b,c,d,e,f.gaZ(),f.gd5(),g,z)},"$7","yq",14,0,97]}},
j3:{
"^":"dQ;x,y,z,Q,a,b,c,d,e,f,r",
e7:function(){return this.r},
bv:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.x
y=this.z
x=z.cV()
if(typeof x!=="number")return H.b(x)
if(y>=x){y=++this.Q
x=this.r
if(typeof x!=="number")return H.b(x)
if(y>=x)return 0
this.z=0}y=this.y
z.bb(this.z++,y)
w=G.bS()
x=J.O(w)
if(x.B(w,2))v=1
else if(x.B(w,0)){x=this.r
v=x}else{x=this.Q===0?1:J.h(this.r,1)
v=x}if(typeof v!=="number")return H.b(v)
x=a.length
u=this.e
t=this.f
s=J.w(u)
r=J.w(t)
q=0
for(;q<v;++q){if(q>=x)return H.a(a,q)
p=a[q]
o=b.a.P()
n=y[0]
if(typeof n!=="number")return H.b(n)
p.a=o+n
n=a[q]
o=b.a.P()
p=y[1]
if(typeof p!=="number")return H.b(p)
n.b=o+p
a[q].c=b.a.P()
a[q].d=b.a.P()
p=a[q]
o=b.a.P()
p.e=J.c(s.i(u,1-o),r.i(t,o))
for(m=0;p=a[q],m<p.f.length;++m){l=0
while(!0){p=a[q]
o=p.f
if(m>=o.length)return H.a(o,m)
o=o[m]
if(typeof o!=="number")return H.b(o)
if(!(l<o))break
p=p.x
if(m>=p.length)return H.a(p,m)
J.u(p[m],l,b.a.P());++l}}for(m=0;m<p.r.length;++m){l=0
while(!0){p=a[q]
o=p.r
if(m>=o.length)return H.a(o,m)
o=o[m]
if(typeof o!=="number")return H.b(o)
if(!(l<2*o))break
p=p.y
if(m>=p.length)return H.a(p,m)
p=p[m]
o=b.a.P()
if(l>=p.length)return H.a(p,l)
p[l]=o;++l}}}return v},
bt:function(a){return a},
mL:function(a,b,c,d,e,f,g,h){var z=this.x
if(z==null)$.t.$2(3,"A PixelSampler is required by RandomSampler")
z.cf(a,b,c,d)
this.z=0
this.Q=0},
static:{dP:function(a,b,c,d,e,f,g,h){var z=new U.j3(g,new Int32Array(H.k(2)),null,null,a,b,c,d,e,f,h)
z.mL(a,b,c,d,e,f,g,h)
return z},Bz:[function(a,b,c,d,e,f,g){var z=a.V("pixelsamples",10)
return U.dP(b,c,d,e,f.gaZ(),f.gd5(),g,z)},"$7","yr",14,0,98]}},
jm:{
"^":"dQ;x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,a,b,c,d,e,f,r",
bt:function(a){return a},
bv:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
if(this.fx===0&&this.fr!=null){z=this.fr.bv(a,b)
if(!J.i(z,0))return z;++this.fx}y=this.cy
x=this.ch
w=x.cV()
if(typeof w!=="number")return H.b(w)
if(y>=w)return 0
y=this.z
if(typeof y!=="number")return H.b(y)
y=this.Q
G.eG(this.db,this.x,this.y,b,y)
G.eG(this.dx,this.x,this.y,b,y)
G.tZ(this.dy,J.d(this.x,this.y),b,y)
y=this.cx
x.bb(this.cy++,y)
x=this.x
if(typeof x!=="number")return H.b(x)
w=this.y
if(typeof w!=="number")return H.b(w)
v=2*x*w
u=this.db
t=u.length
s=0
for(;s<v;s+=2){if(s>=t)return H.a(u,s)
u[s]=u[s]+y[0]
r=s+1
if(r>=t)return H.a(u,r)
u[r]=u[r]+y[1]}G.cL(this.dx,0,x*w,2,b)
G.cL(this.dy,0,J.d(this.x,this.y),1,b)
y=a.length
x=this.e
w=this.f
v=J.w(x)
u=J.w(w)
q=0
while(!0){t=this.z
if(typeof t!=="number")return H.b(t)
if(!(q<t))break
if(q>=y)return H.a(a,q)
t=a[q]
r=this.db
p=2*q
o=r.length
if(p>=o)return H.a(r,p)
t.a=r[p]
n=p+1
if(n>=o)return H.a(r,n)
t.b=r[n]
r=this.dx
o=r.length
if(p>=o)return H.a(r,p)
t.c=r[p]
if(n>=o)return H.a(r,n)
t.d=r[n]
n=this.dy
if(q>=n.length)return H.a(n,q)
n=n[q]
if(typeof n!=="number")return H.b(n)
t.e=J.c(v.i(x,1-n),u.i(w,n))
for(m=0;t=a[q],r=t.f,m<r.length;++m){t=t.x
if(m>=t.length)return H.a(t,m)
G.fk(t[m],r[m],1,b)}for(m=0;t=a[q],r=t.r,m<r.length;++m){t=t.y
if(m>=t.length)return H.a(t,m)
G.fk(t[m],r[m],2,b)}++q}return t},
e7:function(){return this.z},
static:{BN:[function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s
z=a.bo("jitter",!0)
y=a.V("pixelsamples",null)
if(y!=null){x=y
w=x}else{w=a.V("xsamples",2)
x=a.V("ysamples",2)}v=f.gaZ()
u=f.gd5()
t=new U.jm(null,null,null,z,g,new Int32Array(H.k(2)),null,null,null,null,null,null,b,c,d,e,v,u,J.d(w,x))
if(g==null)$.t.$2(3,"A PixelSampler is required by StratifiedSampler")
g.cf(b,c,d,e)
t.cy=0
t.x=w
t.y=x
s=J.d(w,x)
t.z=s
if(typeof s!=="number")return H.b(s)
t.db=new Float32Array(H.k(2*s))
t.dx=new Float32Array(H.k(2*s))
t.dy=new Float32Array(H.k(J.d(w,x)))
t.fx=0
if(J.i(G.bS(),1)||J.i(G.bS(),2))t.fr=U.dP(b,c,d,e,v,u,g,1)
return t},"$7","ys",14,0,99]}}}],["","",,M,{
"^":"",
hy:{
"^":"bz;f,M:r>,x,a,b,c,d,e",
bY:function(){var z,y,x,w,v
z=this.f
y=J.y(z)
x=y.a2(z)
y=y.a2(z)
w=new G.j(new Float32Array(H.k(3)))
w.C(x,y,0)
y=this.r
v=new G.j(new Float32Array(H.k(3)))
v.C(z,z,y)
return G.a9(w,v)},
bW:function(a3,a4,a5,a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
z=G.aO(null,null,0,1/0,0,0)
this.b.aK(a3,z)
y=J.G(this.f,this.r)
y=J.d(y,y)
x=J.w(y)
w=J.h(J.c(J.d(J.V(z.b),J.V(z.b)),J.d(J.S(z.b),J.S(z.b))),J.d(x.i(y,J.P(z.b)),J.P(z.b)))
v=J.V(z.b)
u=z.a.a
if(0>=u.length)return H.a(u,0)
u=J.d(v,u[0])
v=J.S(z.b)
t=z.a.a
if(1>=t.length)return H.a(t,1)
t=J.c(u,J.d(v,t[1]))
v=x.i(y,J.P(z.b))
u=z.a.a
if(2>=u.length)return H.a(u,2)
u=u[2]
s=this.r
if(typeof s!=="number")return H.b(s)
s=J.h(t,J.d(v,u-s))
if(typeof s!=="number")return H.b(s)
u=z.a.a
v=u.length
if(0>=v)return H.a(u,0)
t=u[0]
if(1>=v)return H.a(u,1)
r=u[1]
if(2>=v)return H.a(u,2)
u=u[2]
v=this.r
if(typeof v!=="number")return H.b(v)
v=x.i(y,u-v)
u=z.a.a
if(2>=u.length)return H.a(u,2)
u=u[2]
x=this.r
if(typeof x!=="number")return H.b(x)
x=J.d(v,u-x)
if(typeof x!=="number")return H.b(x)
q=[0]
p=[0]
if(!G.c3(w,2*s,t*t+r*r-x,q,p))return!1
if(J.F(q[0],z.d)||J.K(p[0],z.c))return!1
o=q[0]
if(J.K(o,z.c)){o=p[0]
if(J.F(o,z.d))return!1}x=new Float32Array(H.n(z.a.j(0,J.d(z.b,o)).a))
n=new G.j(x)
v=x.length
if(1>=v)return H.a(x,1)
u=x[1]
t=x[0]
m=Math.atan2(H.v(u),H.v(t))
if(m<0)m+=6.283185307179586
if(2>=v)return H.a(x,2)
x=x[2]
if(!(x<0)){v=this.r
if(typeof v!=="number")return H.b(v)
x=x>v||m>this.x}else x=!0
if(x){if(J.i(o,p[0]))return!1
o=p[0]
if(J.F(o,z.d))return!1
x=new Float32Array(H.n(z.a.j(0,J.d(z.b,o)).a))
n=new G.j(x)
v=x.length
if(1>=v)return H.a(x,1)
u=x[1]
t=x[0]
m=Math.atan2(H.v(u),H.v(t))
if(m<0)m+=6.283185307179586
if(2>=v)return H.a(x,2)
x=x[2]
if(!(x<0)){v=this.r
if(typeof v!=="number")return H.b(v)
x=x>v||m>this.x}else x=!0
if(x)return!1}x=this.x
v=n.a
if(2>=v.length)return H.a(v,2)
u=v[2]
t=this.r
if(typeof t!=="number")return H.b(t)
l=u/t
k=G.B(-x*v[1],x*v[0],0)
t=1-l
j=G.B(-v[0]/t,-v[1]/t,this.r)
u=G.B(v[0],v[1],0)
s=this.x
i=u.i(0,-s*s)
h=G.B(v[1],-v[0],0).i(0,this.x/t)
g=G.B(0,0,0)
f=G.J(k,k)
e=G.J(k,j)
d=G.J(j,j)
t=G.aF(k,j)
c=t.w(0,t.E(0))
b=G.J(c,i)
a=G.J(c,h)
a0=G.J(c,g)
t=J.h(J.d(f,d),J.d(e,e))
if(typeof t!=="number")return H.b(t)
a1=1/t
t=J.w(a)
v=J.w(b)
v=new Float32Array(H.n(k.i(0,J.d(J.h(t.i(a,e),v.i(b,d)),a1)).j(0,j.i(0,J.d(J.h(v.i(b,e),t.i(a,f)),a1))).a))
s=J.w(a0)
s=new Float32Array(H.n(k.i(0,J.d(J.h(s.i(a0,e),t.i(a,d)),a1)).j(0,j.i(0,J.d(J.h(t.i(a,e),s.i(a0,f)),a1))).a))
a2=this.a
a6.bM(a2.a1(n),a2.ag(k),a2.ag(j),a2.aQ(new G.a1(v)),a2.aQ(new G.a1(s)),m/x,l,this)
a4[0]=o
if(typeof o!=="number")return H.b(o)
a5[0]=0.0005*o
return!0},
a5:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=G.aO(null,null,0,1/0,0,0)
this.b.aK(a,z)
y=J.G(this.f,this.r)
y=J.d(y,y)
x=J.w(y)
w=J.h(J.c(J.d(J.V(z.b),J.V(z.b)),J.d(J.S(z.b),J.S(z.b))),J.d(x.i(y,J.P(z.b)),J.P(z.b)))
v=J.V(z.b)
u=z.a.a
if(0>=u.length)return H.a(u,0)
u=J.d(v,u[0])
v=J.S(z.b)
t=z.a.a
if(1>=t.length)return H.a(t,1)
t=J.c(u,J.d(v,t[1]))
v=x.i(y,J.P(z.b))
u=z.a.a
if(2>=u.length)return H.a(u,2)
u=u[2]
s=this.r
if(typeof s!=="number")return H.b(s)
s=J.h(t,J.d(v,u-s))
if(typeof s!=="number")return H.b(s)
u=z.a.a
v=u.length
if(0>=v)return H.a(u,0)
t=u[0]
if(1>=v)return H.a(u,1)
r=u[1]
if(2>=v)return H.a(u,2)
u=u[2]
v=this.r
if(typeof v!=="number")return H.b(v)
v=x.i(y,u-v)
u=z.a.a
if(2>=u.length)return H.a(u,2)
u=u[2]
x=this.r
if(typeof x!=="number")return H.b(x)
x=J.d(v,u-x)
if(typeof x!=="number")return H.b(x)
q=[0]
p=[0]
if(!G.c3(w,2*s,t*t+r*r-x,q,p))return!1
if(J.F(q[0],z.d)||J.K(p[0],z.c))return!1
o=q[0]
if(J.K(o,z.c)){o=p[0]
if(J.F(o,z.d))return!1}x=new Float32Array(H.n(z.a.j(0,J.d(z.b,o)).a))
v=x.length
if(1>=v)return H.a(x,1)
u=x[1]
t=x[0]
n=Math.atan2(H.v(u),H.v(t))
if(n<0)n+=6.283185307179586
if(2>=v)return H.a(x,2)
x=x[2]
if(!(x<0)){v=this.r
if(typeof v!=="number")return H.b(v)
x=x>v||n>this.x}else x=!0
if(x){if(J.i(o,p[0]))return!1
o=p[0]
if(J.F(o,z.d))return!1
x=new Float32Array(H.n(z.a.j(0,J.d(z.b,o)).a))
v=x.length
if(1>=v)return H.a(x,1)
u=x[1]
t=x[0]
n=Math.atan2(H.v(u),H.v(t))
if(n<0)n+=6.283185307179586
if(2>=v)return H.a(x,2)
x=x[2]
if(!(x<0)){v=this.r
if(typeof v!=="number")return H.b(v)
x=x>v||n>this.x}else x=!0
if(x)return!1}return!0},
c6:[function(){var z,y,x
z=this.f
y=this.r
x=J.w(z)
return J.G(J.d(x.i(z,Math.sqrt(H.v(J.c(J.d(y,y),x.i(z,z))))),this.x),2)},"$0","gbg",0,0,6],
static:{zC:[function(a,b,c,d){var z,y,x,w,v
z=d.m("radius",1)
y=d.m("height",1)
x=d.m("phimax",360)
w=$.aP
$.aP=w+1
w=new M.hy(z,y,null,a,b,c,!1,w)
v=J.a4(x,0,360)
if(typeof v!=="number")return H.b(v)
w.x=0.017453292519943295*v
return w},"$4","yt",8,0,100]}},
hA:{
"^":"bz;f,r,x,y,a,b,c,d,e",
bY:function(){var z,y,x,w,v,u
z=this.f
y=J.y(z)
x=y.a2(z)
y=y.a2(z)
w=this.r
v=new G.j(new Float32Array(H.k(3)))
v.C(x,y,w)
w=this.x
u=new G.j(new Float32Array(H.k(3)))
u.C(z,z,w)
return G.a9(v,u)},
bW:function(a3,a4,a5,a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
z=G.aO(null,null,0,1/0,0,0)
this.b.aK(a3,z)
y=J.c(J.d(J.V(z.b),J.V(z.b)),J.d(J.S(z.b),J.S(z.b)))
x=J.V(z.b)
w=z.a.a
if(0>=w.length)return H.a(w,0)
w=J.d(x,w[0])
x=J.S(z.b)
v=z.a.a
if(1>=v.length)return H.a(v,1)
v=J.c(w,J.d(x,v[1]))
if(typeof v!=="number")return H.b(v)
x=z.a.a
w=x.length
if(0>=w)return H.a(x,0)
u=x[0]
if(1>=w)return H.a(x,1)
x=x[1]
w=this.f
w=J.d(w,w)
if(typeof w!=="number")return H.b(w)
t=[0]
s=[0]
if(!G.c3(y,2*v,u*u+x*x-w,t,s))return!1
r=t[0]
x=s[0]
w=J.y(r)
if(w.a0(r,z.d)||J.K(x,z.c))return!1
if(w.U(r,z.c)){if(J.F(x,z.d))return!1
q=x}else q=r
w=new Float32Array(H.n(z.a.j(0,J.d(z.b,q)).a))
p=new G.j(w)
v=w.length
if(1>=v)return H.a(w,1)
u=w[1]
o=w[0]
n=Math.atan2(H.v(u),H.v(o))
if(n<0)n+=6.283185307179586
if(2>=v)return H.a(w,2)
w=w[2]
v=this.r
if(w<v||w>this.x||n>this.y){if(J.i(q,x))return!1
if(J.F(x,z.d))return!1
w=new Float32Array(H.n(z.a.j(0,J.d(z.b,x)).a))
p=new G.j(w)
v=w.length
if(1>=v)return H.a(w,1)
u=w[1]
o=w[0]
n=Math.atan2(H.v(u),H.v(o))
if(n<0)n+=6.283185307179586
if(2>=v)return H.a(w,2)
w=w[2]
v=this.r
if(w<v||w>this.x||n>this.y)return!1
q=x
x=v}else x=v
w=this.y
v=p.a
if(2>=v.length)return H.a(v,2)
u=v[2]
o=this.x
m=G.B(-w*v[1],w*v[0],0)
l=G.B(0,0,this.x-this.r)
v=G.B(v[0],v[1],0)
k=this.y
j=v.i(0,-k*k)
i=G.B(0,0,0)
h=G.B(0,0,0)
g=G.J(m,m)
f=G.J(m,l)
e=G.J(l,l)
k=G.aF(m,l)
d=k.w(0,k.E(0))
c=G.J(d,j)
b=G.J(d,i)
a=G.J(d,h)
k=J.h(J.d(g,e),J.d(f,f))
if(typeof k!=="number")return H.b(k)
a0=1/k
k=J.w(b)
v=J.w(c)
v=new Float32Array(H.n(m.i(0,J.d(J.h(k.i(b,f),v.i(c,e)),a0)).j(0,l.i(0,J.d(J.h(v.i(c,f),k.i(b,g)),a0))).a))
a1=J.w(a)
a1=new Float32Array(H.n(m.i(0,J.d(J.h(a1.i(a,f),k.i(b,e)),a0)).j(0,l.i(0,J.d(J.h(k.i(b,f),a1.i(a,g)),a0))).a))
a2=this.a
a6.bM(a2.a1(p),a2.ag(m),a2.ag(l),a2.aQ(new G.a1(v)),a2.aQ(new G.a1(a1)),n/w,(u-x)/(o-x),this)
a4[0]=q
if(typeof q!=="number")return H.b(q)
a5[0]=0.0005*q
return!0},
a5:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=G.aO(null,null,0,1/0,0,0)
this.b.aK(a,z)
y=J.c(J.d(J.V(z.b),J.V(z.b)),J.d(J.S(z.b),J.S(z.b)))
x=J.V(z.b)
w=z.a.a
if(0>=w.length)return H.a(w,0)
w=J.d(x,w[0])
x=J.S(z.b)
v=z.a.a
if(1>=v.length)return H.a(v,1)
v=J.c(w,J.d(x,v[1]))
if(typeof v!=="number")return H.b(v)
x=z.a.a
w=x.length
if(0>=w)return H.a(x,0)
u=x[0]
if(1>=w)return H.a(x,1)
x=x[1]
w=this.f
w=J.d(w,w)
if(typeof w!=="number")return H.b(w)
t=[0]
s=[0]
if(!G.c3(y,2*v,u*u+x*x-w,t,s))return!1
r=t[0]
x=s[0]
w=J.y(r)
if(w.a0(r,z.d)||J.K(x,z.c))return!1
if(w.U(r,z.c)){if(J.F(x,z.d))return!1
q=x}else q=r
w=new Float32Array(H.n(z.a.j(0,J.d(z.b,q)).a))
v=w.length
if(1>=v)return H.a(w,1)
u=w[1]
p=w[0]
o=Math.atan2(H.v(u),H.v(p))
if(o<0)o+=6.283185307179586
if(2>=v)return H.a(w,2)
w=w[2]
if(w<this.r||w>this.x||o>this.y){if(J.i(q,x))return!1
if(J.F(x,z.d))return!1
x=new Float32Array(H.n(z.a.j(0,J.d(z.b,x)).a))
w=x.length
if(1>=w)return H.a(x,1)
v=x[1]
u=x[0]
o=Math.atan2(H.v(v),H.v(u))
if(o<0)o+=6.283185307179586
if(2>=w)return H.a(x,2)
x=x[2]
if(x<this.r||x>this.x||o>this.y)return!1}return!0},
c6:[function(){var z,y,x,w
z=this.x
y=this.r
x=this.y
w=this.f
if(typeof w!=="number")return H.b(w)
return(z-y)*x*w},"$0","gbg",0,0,6],
c1:function(a,b,c){var z,y,x,w,v,u,t,s,r
z=this.r
y=this.x
x=b*this.y
w=this.f
v=J.w(w)
u=v.i(w,Math.cos(H.v(x)))
w=v.i(w,Math.sin(H.v(x)))
v=H.k(3)
t=new Float32Array(v)
s=new G.j(t)
s.C(u,w,z*(1-a)+y*a)
y=this.a
if(0>=v)return H.a(t,0)
z=t[0]
if(1>=v)return H.a(t,1)
t=t[1]
v=new G.a1(new Float32Array(H.k(3)))
v.C(z,t,0)
r=y.aQ(v)
c.L(r.w(0,r.E(0)))
if(this.c===!0)c.b4(0,-1)
return y.a1(s)},
static:{zF:[function(a,b,c,d){var z,y,x,w,v,u
z=d.m("radius",1)
y=d.m("zmin",-1)
x=d.m("zmax",1)
w=d.m("phimax",360)
v=$.aP
$.aP=v+1
v=new M.hA(z,null,null,null,a,b,c,!1,v)
v.r=P.X(y,x)
v.x=P.I(y,x)
u=J.a4(w,0,360)
if(typeof u!=="number")return H.b(u)
v.y=0.017453292519943295*u
return v},"$4","yu",8,0,101]}},
hG:{
"^":"bz;M:f>,r,x,y,a,b,c,d,e",
bY:function(){var z,y,x,w,v
z=this.r
y=J.y(z)
x=y.a2(z)
y=y.a2(z)
w=this.f
v=new G.j(new Float32Array(H.k(3)))
v.C(x,y,w)
w=this.f
y=new G.j(new Float32Array(H.k(3)))
y.C(z,z,w)
return G.a9(v,y)},
bW:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
this.b.aK(a,$.$get$cz())
if(J.K(J.af(J.P($.$get$cz().b)),1e-7))return!1
z=this.f
y=$.$get$cz().a.a
if(2>=y.length)return H.a(y,2)
x=J.G(J.h(z,y[2]),J.P($.$get$cz().b))
z=J.y(x)
if(z.U(x,$.$get$cz().c)||z.a0(x,$.$get$cz().d))return!1
z=$.$get$cz()
z=new Float32Array(H.n(z.a.j(0,J.d(z.b,x)).a))
y=z.length
if(0>=y)return H.a(z,0)
w=z[0]
if(1>=y)return H.a(z,1)
y=z[1]
v=w*w+y*y
y=this.r
w=J.w(y)
u=w.i(y,y)
if(typeof u!=="number")return H.b(u)
if(!(v>u)){u=this.x
u=J.d(u,u)
if(typeof u!=="number")return H.b(u)
u=v<u}else u=!0
if(u)return!1
u=z[1]
t=z[0]
s=Math.atan2(H.v(u),H.v(t))
if(s<0)s+=6.283185307179586
u=this.y
if(typeof u!=="number")return H.b(u)
if(s>u)return!1
t=Math.sqrt(H.v(v))
r=this.x
if(typeof r!=="number")return H.b(r)
q=w.l(y,r)
if(typeof q!=="number")return H.b(q)
p=(t-r)/q
o=p>0?1/p:0
n=G.B(J.d(J.M(this.y),z[1]),J.d(this.y,z[0]),0)
m=G.B(-z[0]*o,-z[1]*o,0)
n=n.i(0,J.d(this.y,0.15915494309189535))
m=m.i(0,J.G(w.l(y,r),y))
l=new G.a1(new Float32Array(H.k(3)))
l.C(0,0,0)
k=new G.a1(new Float32Array(H.k(3)))
k.C(0,0,0)
j=this.a
d.bM(j.a1(new G.j(z)),j.ag(n),j.ag(m),j.aQ(l),j.aQ(k),s/u,1-p,this)
b[0]=x
if(typeof x!=="number")return H.b(x)
c[0]=0.0005*x
return!0},
a5:function(a){var z,y,x,w,v,u,t
z=G.aO(null,null,0,1/0,0,0)
this.b.aK(a,z)
if(J.K(J.af(J.P(z.b)),1e-7))return!1
y=this.f
x=z.a.a
if(2>=x.length)return H.a(x,2)
w=J.G(J.h(y,x[2]),J.P(z.b))
y=J.y(w)
if(y.U(w,z.c)||y.a0(w,z.d))return!1
y=new Float32Array(H.n(z.a.j(0,J.d(z.b,w)).a))
x=y.length
if(0>=x)return H.a(y,0)
v=y[0]
if(1>=x)return H.a(y,1)
x=y[1]
u=v*v+x*x
x=this.r
x=J.d(x,x)
if(typeof x!=="number")return H.b(x)
if(!(u>x)){x=this.x
x=J.d(x,x)
if(typeof x!=="number")return H.b(x)
x=u<x}else x=!0
if(x)return!1
x=y[1]
y=y[0]
t=Math.atan2(H.v(x),H.v(y))
if(t<0)t+=6.283185307179586
y=this.y
if(typeof y!=="number")return H.b(y)
if(t>y)return!1
return!0},
c6:[function(){var z,y
z=this.r
y=this.x
return J.d(J.d(this.y,0.5),J.h(J.d(z,z),J.d(y,y)))},"$0","gbg",0,0,6],
c1:function(a,b,c){var z,y,x,w,v,u
z=[0]
y=[0]
G.cx(a,b,z,y)
x=z[0]
w=this.r
if(typeof w!=="number")return H.b(w)
y=y[0]
v=this.f
u=new G.j(new Float32Array(H.k(3)))
u.C(x*w,y*w,v)
v=this.a
w=new G.a1(new Float32Array(H.k(3)))
w.C(0,0,1)
c.L(v.aQ(w))
c.cq(Math.sqrt(H.v(c.a_())))
if(this.c===!0)c.b4(0,-1)
return v.a1(u)},
static:{zL:[function(a,b,c,d){var z,y,x,w,v,u
z=d.m("height",0)
y=d.m("radius",1)
x=d.m("innerradius",0)
w=d.m("phimax",360)
v=$.aP
$.aP=v+1
v=new M.hG(z,y,x,w,a,b,c,!1,v)
u=J.a4(w,0,360)
if(typeof u!=="number")return H.b(u)
v.y=0.017453292519943295*u
return v},"$4","yv",8,0,102]}},
hZ:{
"^":"bz;S:f*,r,x,a,b,c,d,e",
b_:function(){return!1},
cr:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=J.h(this.r,1)
if(typeof z!=="number")return H.b(z)
y=J.h(this.x,1)
if(typeof y!=="number")return H.b(y)
y=H.k(3*(2*z*y))
x=new Uint32Array(y)
z=J.d(this.r,this.x)
if(typeof z!=="number")return H.b(z)
z=Array(z)
z.fixed$length=Array
w=H.p(z,[G.j])
z=this.r
if(typeof z!=="number")return H.b(z)
v=this.x
if(typeof v!=="number")return H.b(v)
v=H.k(2*z*v)
u=new Float32Array(v)
J.d(this.r,this.x)
z=w.length
t=0
s=0
r=0
while(!0){q=this.x
if(typeof q!=="number")return H.b(q)
if(!(t<q))break
p=0
while(!0){q=this.r
if(typeof q!=="number")return H.b(q)
if(!(p<q))break
if(r<0||r>=v)return H.a(u,r)
u[r]=p/(q-1)
q=r+1
o=J.h(this.x,1)
if(typeof o!=="number")return H.b(o)
if(q>=v)return H.a(u,q)
u[q]=t/o
o=u[r]
q=u[q]
n=J.e(this.f,s)
m=new Float32Array(3)
if(0>=3)return H.a(m,0)
m[0]=o
if(1>=3)return H.a(m,1)
m[1]=q
if(2>=3)return H.a(m,2)
m[2]=n
if(s<0||s>=z)return H.a(w,s)
w[s]=new G.j(m);++p;++s
r+=2}++t}z=new M.pF(this)
l=0
t=0
while(!0){v=J.h(this.x,1)
if(typeof v!=="number")return H.b(v)
if(!(t<v))break
k=t+1
p=0
while(!0){v=J.h(this.r,1)
if(typeof v!=="number")return H.b(v)
if(!(p<v))break
j=l+1
v=z.$2(p,t)
if(l<0||l>=y)return H.a(x,l)
x[l]=v
l=j+1
i=p+1
v=z.$2(i,t)
if(j<0||j>=y)return H.a(x,j)
x[j]=v
j=l+1
v=z.$2(i,k)
if(l<0||l>=y)return H.a(x,l)
x[l]=v
l=j+1
v=z.$2(p,t)
if(j<0||j>=y)return H.a(x,j)
x[j]=v
j=l+1
v=z.$2(i,k)
if(l<0||l>=y)return H.a(x,l)
x[l]=v
l=j+1
v=z.$2(p,k)
if(j<0||j>=y)return H.a(x,j)
x[j]=v
p=i}t=k}h=new G.A([],[],[],[],[],[],[],[],[])
h.hU("indices",x)
h.kd("uv",u)
h.eL("P",w)
a.push(M.fN(this.a,this.b,this.c,h,null))},
bY:function(){var z,y,x,w,v
z=J.e(this.f,0)
y=J.e(this.f,0)
x=1
while(!0){w=J.d(this.r,this.x)
if(typeof w!=="number")return H.b(w)
if(!(x<w))break
if(J.K(J.e(this.f,x),z))z=J.e(this.f,x)
if(J.F(J.e(this.f,x),y))y=J.e(this.f,x);++x}w=new G.j(new Float32Array(H.k(3)))
w.C(0,0,z)
v=new G.j(new Float32Array(H.k(3)))
v.C(1,1,y)
return G.a9(w,v)},
static:{Ar:[function(a,b,c,d){var z,y,x,w
z=d.V("nu",-1)
y=d.V("nv",-1)
x=d.bA("Pz")
w=$.aP
$.aP=w+1
return new M.hZ(x,z,y,a,b,c,!1,w)},"$4","yw",8,0,103]}},
pF:{
"^":"z:13;a",
$2:function(a,b){var z=this.a.r
if(typeof z!=="number")return H.b(z)
return a+b*z}},
i1:{
"^":"bz;f,r,x,y,z,Q,ch,aI:cx<,a,b,c,d,e",
bY:function(){var z,y,x,w
z=-this.Q
y=this.x
x=new G.j(new Float32Array(H.k(3)))
x.C(z,z,y)
y=this.Q
z=this.y
w=new G.j(new Float32Array(H.k(3)))
w.C(y,y,z)
return G.a9(x,w)},
bW:function(c0,c1,c2,c3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9
z=G.aO(null,null,0,1/0,0,0)
this.b.aK(c0,z)
y=this.ch
x=J.V(z.b)
if(typeof y!=="number")return y.i()
if(typeof x!=="number")return H.b(x)
w=J.V(z.b)
if(typeof w!=="number")return H.b(w)
v=this.ch
u=J.S(z.b)
if(typeof v!=="number")return v.i()
if(typeof u!=="number")return H.b(u)
t=J.S(z.b)
if(typeof t!=="number")return H.b(t)
s=this.cx
r=J.P(z.b)
if(typeof s!=="number")return s.i()
if(typeof r!=="number")return H.b(r)
q=J.P(z.b)
if(typeof q!=="number")return H.b(q)
p=this.ch
o=J.V(z.b)
if(typeof p!=="number")return p.i()
if(typeof o!=="number")return H.b(o)
n=z.a.a
if(0>=n.length)return H.a(n,0)
n=n[0]
m=this.ch
l=J.S(z.b)
if(typeof m!=="number")return m.i()
if(typeof l!=="number")return H.b(l)
k=z.a.a
if(1>=k.length)return H.a(k,1)
k=k[1]
j=this.cx
i=J.P(z.b)
if(typeof j!=="number")return j.i()
if(typeof i!=="number")return H.b(i)
h=z.a.a
if(2>=h.length)return H.a(h,2)
g=h[2]
f=this.ch
e=h[0]
if(typeof f!=="number")return f.i()
h=h[1]
d=this.cx
if(typeof d!=="number")return d.i()
c=[0]
b=[0]
if(!G.c3(y*x*w+v*u*t-s*r*q,2*(p*o*n+m*l*k-j*i*g),f*e*e+f*h*h-d*g*g-1,c,b))return!1
if(J.F(c[0],z.d)||J.K(b[0],z.c))return!1
a=c[0]
if(J.K(a,z.c)){a=b[0]
if(J.F(a,z.d))return!1}y=new Float32Array(H.n(z.a.j(0,J.d(z.b,a)).a))
a0=new G.j(y)
if(2>=y.length)return H.a(y,2)
x=y[2]
w=J.P(this.f)
if(typeof w!=="number")return H.b(w)
v=J.h(J.P(this.r),J.P(this.f))
if(typeof v!=="number")return H.b(v)
a1=(x-w)/v
a2=J.c(J.d(this.f,1-a1),J.d(this.r,a1))
v=J.C(a2)
w=J.d(v.gG(a2),y[1])
x=y[0]
u=v.gF(a2)
if(typeof u!=="number")return H.b(u)
u=J.h(w,x*u)
x=y[0]
w=v.gG(a2)
if(typeof w!=="number")return H.b(w)
t=y[1]
v=v.gF(a2)
if(typeof v!=="number")return H.b(v)
a3=Math.atan2(H.v(u),H.v(x*w+t*v))
if(a3<0)a3+=6.283185307179586
y=y[2]
if(y<this.x||y>this.y||a3>this.z){if(J.i(a,b[0]))return!1
a=b[0]
if(J.F(a,z.d))return!1
y=new Float32Array(H.n(z.a.j(0,J.d(z.b,a)).a))
a0=new G.j(y)
if(2>=y.length)return H.a(y,2)
x=y[2]
w=J.P(this.f)
if(typeof w!=="number")return H.b(w)
v=J.h(J.P(this.r),J.P(this.f))
if(typeof v!=="number")return H.b(v)
a1=(x-w)/v
a2=J.c(J.d(this.f,1-a1),J.d(this.r,a1))
v=J.C(a2)
w=J.d(v.gG(a2),y[1])
x=y[0]
u=v.gF(a2)
if(typeof u!=="number")return H.b(u)
u=J.h(w,x*u)
x=y[0]
w=v.gG(a2)
if(typeof w!=="number")return H.b(w)
t=y[1]
v=v.gF(a2)
if(typeof v!=="number")return H.b(v)
a3=Math.atan2(H.v(u),H.v(x*w+t*v))
if(a3<0)a3+=6.283185307179586
y=y[2]
if(y<this.x||y>this.y||a3>this.z)return!1}y=this.z
a4=Math.cos(H.v(a3))
a5=Math.sin(H.v(a3))
x=this.z
w=a0.a
if(1>=w.length)return H.a(w,1)
a6=G.B(-x*w[1],x*w[0],0)
a7=G.B(J.h(J.d(J.h(J.V(this.r),J.V(this.f)),a4),J.d(J.h(J.S(this.r),J.S(this.f)),a5)),J.c(J.d(J.h(J.V(this.r),J.V(this.f)),a5),J.d(J.h(J.S(this.r),J.S(this.f)),a4)),J.h(J.P(this.r),J.P(this.f)))
w=G.B(w[0],w[1],0)
x=this.z
a8=w.i(0,-x*x)
x=a7.a
if(1>=x.length)return H.a(x,1)
a9=G.B(-x[1],x[0],0).i(0,this.z)
b0=G.B(0,0,0)
b1=G.J(a6,a6)
b2=G.J(a6,a7)
b3=G.J(a7,a7)
x=G.aF(a6,a7)
b4=x.w(0,x.E(0))
b5=G.J(b4,a8)
b6=G.J(b4,a9)
b7=G.J(b4,b0)
x=J.h(J.d(b1,b3),J.d(b2,b2))
if(typeof x!=="number")return H.b(x)
b8=1/x
x=J.w(b6)
w=J.w(b5)
w=new Float32Array(H.n(a6.i(0,J.d(J.h(x.i(b6,b2),w.i(b5,b3)),b8)).j(0,a7.i(0,J.d(J.h(w.i(b5,b2),x.i(b6,b1)),b8))).a))
v=J.w(b7)
v=new Float32Array(H.n(a6.i(0,J.d(J.h(v.i(b7,b2),x.i(b6,b3)),b8)).j(0,a7.i(0,J.d(J.h(x.i(b6,b2),v.i(b7,b1)),b8))).a))
b9=this.a
c3.bM(b9.a1(a0),b9.ag(a6),b9.ag(a7),b9.aQ(new G.a1(w)),b9.aQ(new G.a1(v)),a3/y,a1,this)
c1[0]=a
if(typeof a!=="number")return H.b(a)
c2[0]=0.0005*a
return!0},
a5:function(a3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
z=G.aO(null,null,0,1/0,0,0)
this.b.aK(a3,z)
y=this.ch
x=J.V(z.b)
if(typeof y!=="number")return y.i()
if(typeof x!=="number")return H.b(x)
w=J.V(z.b)
if(typeof w!=="number")return H.b(w)
v=this.ch
u=J.S(z.b)
if(typeof v!=="number")return v.i()
if(typeof u!=="number")return H.b(u)
t=J.S(z.b)
if(typeof t!=="number")return H.b(t)
s=this.cx
r=J.P(z.b)
if(typeof s!=="number")return s.i()
if(typeof r!=="number")return H.b(r)
q=J.P(z.b)
if(typeof q!=="number")return H.b(q)
p=this.ch
o=J.V(z.b)
if(typeof p!=="number")return p.i()
if(typeof o!=="number")return H.b(o)
n=z.a.a
if(0>=n.length)return H.a(n,0)
n=n[0]
m=this.ch
l=J.S(z.b)
if(typeof m!=="number")return m.i()
if(typeof l!=="number")return H.b(l)
k=z.a.a
if(1>=k.length)return H.a(k,1)
k=k[1]
j=this.cx
i=J.P(z.b)
if(typeof j!=="number")return j.i()
if(typeof i!=="number")return H.b(i)
h=z.a.a
if(2>=h.length)return H.a(h,2)
g=h[2]
f=this.ch
e=h[0]
if(typeof f!=="number")return f.i()
h=h[1]
d=this.cx
if(typeof d!=="number")return d.i()
c=[0]
b=[0]
if(!G.c3(y*x*w+v*u*t-s*r*q,2*(p*o*n+m*l*k-j*i*g),f*e*e+f*h*h-d*g*g-1,c,b))return!1
if(J.F(c[0],z.d)||J.K(b[0],z.c))return!1
a=c[0]
if(J.K(a,z.c)){a=b[0]
if(J.F(a,z.d))return!1}y=new Float32Array(H.n(z.a.j(0,J.d(z.b,a)).a))
if(2>=y.length)return H.a(y,2)
x=y[2]
w=J.P(this.f)
if(typeof w!=="number")return H.b(w)
v=J.h(J.P(this.r),J.P(this.f))
if(typeof v!=="number")return H.b(v)
a0=(x-w)/v
a1=J.c(J.d(this.f,1-a0),J.d(this.r,a0))
v=J.C(a1)
w=J.d(v.gG(a1),y[1])
x=y[0]
u=v.gF(a1)
if(typeof u!=="number")return H.b(u)
u=J.h(w,x*u)
x=y[0]
w=v.gG(a1)
if(typeof w!=="number")return H.b(w)
t=y[1]
v=v.gF(a1)
if(typeof v!=="number")return H.b(v)
a2=Math.atan2(H.v(u),H.v(x*w+t*v))
if(a2<0)a2+=6.283185307179586
y=y[2]
if(y<this.x||y>this.y||a2>this.z){if(J.i(a,b[0]))return!1
a=b[0]
if(J.F(a,z.d))return!1
y=new Float32Array(H.n(z.a.j(0,J.d(z.b,a)).a))
if(2>=y.length)return H.a(y,2)
x=y[2]
w=J.P(this.f)
if(typeof w!=="number")return H.b(w)
v=J.h(J.P(this.r),J.P(this.f))
if(typeof v!=="number")return H.b(v)
a0=(x-w)/v
a1=J.c(J.d(this.f,1-a0),J.d(this.r,a0))
v=J.C(a1)
w=J.d(v.gG(a1),y[1])
x=y[0]
u=v.gF(a1)
if(typeof u!=="number")return H.b(u)
u=J.h(w,x*u)
x=y[0]
w=v.gG(a1)
if(typeof w!=="number")return H.b(w)
t=y[1]
v=v.gF(a1)
if(typeof v!=="number")return H.b(v)
a2=Math.atan2(H.v(u),H.v(x*w+t*v))
if(a2<0)a2+=6.283185307179586
y=y[2]
if(y<this.x||y>this.y||a2>this.z)return!1}return!0},
c6:[function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=new M.pM()
y=new M.pL()
x=this.z
w=y.$1(J.V(this.f))
if(typeof w!=="number")return H.b(w)
v=J.V(this.f)
if(typeof v!=="number")return H.b(v)
u=J.V(this.f)
if(typeof u!=="number")return H.b(u)
t=J.V(this.f)
if(typeof t!=="number")return H.b(t)
s=J.V(this.r)
if(typeof s!=="number")return H.b(s)
y=y.$1(J.V(this.r))
if(typeof y!=="number")return H.b(y)
r=J.c(J.c(J.d(J.S(this.f),J.S(this.f)),J.d(J.S(this.f),J.S(this.r))),J.d(J.S(this.r),J.S(this.r)))
if(typeof r!=="number")return H.b(r)
q=J.c(z.$1(J.h(J.S(this.f),J.S(this.r))),z.$1(J.h(J.P(this.f),J.P(this.r))))
if(typeof q!=="number")return H.b(q)
p=J.d(J.V(this.r),J.V(this.r))
o=J.S(this.f)
if(typeof o!=="number")return H.b(o)
n=J.S(this.f)
if(typeof n!=="number")return H.b(n)
m=J.S(this.f)
if(typeof m!=="number")return H.b(m)
l=J.S(this.r)
if(typeof l!=="number")return H.b(l)
k=J.S(this.r)
if(typeof k!=="number")return H.b(k)
j=J.S(this.r)
if(typeof j!=="number")return H.b(j)
i=z.$1(J.h(J.P(this.f),J.P(this.r)))
if(typeof i!=="number")return H.b(i)
i=J.d(p,5*o*n+2*m*l-4*k*j+2*i)
if(typeof i!=="number")return H.b(i)
j=J.d(J.V(this.f),J.V(this.f))
k=J.S(this.f)
if(typeof k!=="number")return H.b(k)
l=J.S(this.f)
if(typeof l!=="number")return H.b(l)
m=J.S(this.f)
if(typeof m!=="number")return H.b(m)
n=J.S(this.r)
if(typeof n!=="number")return H.b(n)
o=J.S(this.r)
if(typeof o!=="number")return H.b(o)
p=J.S(this.r)
if(typeof p!=="number")return H.b(p)
z=z.$1(J.h(J.P(this.f),J.P(this.r)))
if(typeof z!=="number")return H.b(z)
z=J.d(j,-4*k*l+2*m*n+5*o*p+2*z)
if(typeof z!=="number")return H.b(z)
p=J.V(this.f)
if(typeof p!=="number")return H.b(p)
o=J.V(this.r)
if(typeof o!=="number")return H.b(o)
n=J.h(J.d(J.V(this.r),J.V(this.r)),J.d(J.S(this.f),J.S(this.f)))
m=J.S(this.f)
if(typeof m!=="number")return H.b(m)
l=J.S(this.r)
if(typeof l!=="number")return H.b(l)
l=J.h(J.h(J.c(n,5*m*l),J.d(J.S(this.r),J.S(this.r))),J.d(J.P(this.f),J.P(this.f)))
m=J.P(this.f)
if(typeof m!=="number")return H.b(m)
n=J.P(this.r)
if(typeof n!=="number")return H.b(n)
n=J.h(J.c(l,2*m*n),J.d(J.P(this.r),J.P(this.r)))
if(typeof n!=="number")return H.b(n)
return x/6*(2*w-2*v*u*t*s+2*y+2*r*q+i+z-2*p*o*n)},"$0","gbg",0,0,6],
mh:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q
this.Q=P.I(Math.sqrt(H.v(J.c(J.d(J.V(this.f),J.V(this.f)),J.d(J.S(this.f),J.S(this.f))))),Math.sqrt(H.v(J.c(J.d(J.V(this.r),J.V(this.r)),J.d(J.S(this.r),J.S(this.r))))))
this.x=P.X(J.P(this.f),J.P(this.r))
this.y=P.I(J.P(this.f),J.P(this.r))
z=J.a4(f,0,360)
if(typeof z!=="number")return H.b(z)
this.z=0.017453292519943295*z
if(J.i(J.P(this.r),0)){y=this.f
this.f=this.r
this.r=y}x=new G.j(new Float32Array(H.n(J.N(this.f))))
do{x=x.j(0,J.d(J.h(this.r,this.f),2))
z=x.a
w=z.length
if(0>=w)return H.a(z,0)
v=z[0]
if(1>=w)return H.a(z,1)
u=z[1]
t=v*v+u*u
s=J.c(J.d(J.V(this.r),J.V(this.r)),J.d(J.S(this.r),J.S(this.r)))
if(2>=w)return H.a(z,2)
w=z[2]
u=J.P(this.r)
if(typeof u!=="number")return H.b(u)
v=J.P(this.r)
if(typeof v!=="number")return H.b(v)
z=J.d(J.d(s,z[2]),z[2])
r=J.P(this.r)
if(typeof r!=="number")return H.b(r)
q=J.P(this.r)
if(typeof q!=="number")return H.b(q)
q=J.G(z,t*r*q)
if(typeof q!=="number")return H.b(q)
q=(1/t-w*w/(t*u*v))/(1-q)
this.ch=q
if(typeof s!=="number")return H.b(s)
v=J.d(J.P(this.r),J.P(this.r))
if(typeof v!=="number")return H.b(v)
this.cx=(q*s-1)/v
z=this.ch
z.toString}while(z==1/0||z==-1/0||isNaN(z))},
static:{pK:function(a,b,c,d,e,f){var z=$.aP
$.aP=z+1
z=new M.i1(d,e,null,null,null,null,null,null,a,b,c,!1,z)
z.mh(a,b,c,d,e,f)
return z},Au:[function(a,b,c,d){var z,y
z=new G.j(new Float32Array(H.k(3)))
z.C(0,0,0)
y=d.bq("p1",z)
z=new G.j(new Float32Array(H.k(3)))
z.C(1,1,1)
return M.pK(a,b,c,y,d.bq("p2",z),d.m("phimax",360))},"$4","yx",8,0,104]}},
pM:{
"^":"z:0;",
$1:function(a){return J.d(a,a)}},
pL:{
"^":"z:0;",
$1:function(a){return J.d(J.d(J.d(a,a),a),a)}},
ir:{
"^":"bz;f,r,x,a,b,c,d,e",
b_:function(){return!1},
cr:function(a8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
z=this.x
y=this.r
x=this.f
if(typeof x!=="number")return H.b(x)
w=0
for(;w<x;++w,y=u,z=v){v=[]
u=[]
for(t=0;t<y.length;++t){s=y[t]
r=new M.hb(null,null,null,!1,!1)
s.c=r
r.d=s.d
r.e=s.e
u.push(r)}for(t=0;t<z.length;++t)for(q=0;q<4;++q){if(t>=z.length)return H.a(z,t)
J.u(J.du(z[t]),q,new M.k1([null,null,null],[null,null,null],[null,null,null,null]))
if(t>=z.length)return H.a(z,t)
v.push(J.e(J.du(z[t]),q))}for(t=0;t<y.length;++t){s=y[t]
if(!s.e)if(s.d)s.c.a=M.is(s,0.0625)
else s.c.a=M.is(s,M.lt(s.ej()))
else s.c.a=M.lu(s,0.125)}s=P.a5()
p=new M.na(s)
for(t=0;t<z.length;++t){o=z[t]
for(q=0;q<3;q=m){n=J.e(o.gaL(),q)
m=q+1
l=J.e(o.gaL(),C.a.R(m,3))
if(p.h4(n,l)==null){k=new M.hb(null,null,null,!1,!1)
u.push(k)
k.d=!0
k.e=J.e(o.gaN(),q)==null
k.b=J.e(J.du(o),3)
if(k.e)k.a=J.c(J.d(n.gc2(),0.5),J.d(l.gc2(),0.5))
else{r=J.c(J.d(n.gc2(),0.375),J.d(l.gc2(),0.375))
k.a=r
r=J.c(r,J.d(o.kW(n,l).gc2(),0.125))
k.a=r
j=o.b
if(q>=j.length)return H.a(j,q)
k.a=J.c(r,J.d(j[q].kW(n,l).gc2(),0.125))}if(!s.O(n))s.k(0,n,P.cE(null,null,null,null,null))
J.u(s.h(0,n),l,k)}}}for(t=0;t<y.length;++t){k=y[t]
i=k.b.cw(k)
k.c.b=J.e(J.du(k.b),i)}for(t=0;t<z.length;++t){o=z[t]
for(s=J.C(o),q=0;q<3;q=m){r=J.e(s.gaE(o),3).gaN()
j=s.gaE(o)
m=q+1
h=C.a.R(m,3)
J.u(r,q,J.e(j,h))
J.u(J.e(s.gaE(o),q).gaN(),h,J.e(s.gaE(o),3))
g=J.e(o.gaN(),q)
h=J.e(s.gaE(o),q).gaN()
J.u(h,q,g!=null?J.e(J.du(g),g.cw(J.e(o.gaL(),q))):null)
r=o.gaN()
j=C.a.R(q+2,3)
g=J.e(r,j)
r=J.e(s.gaE(o),q).gaN()
J.u(r,j,g!=null?J.e(J.du(g),g.cw(J.e(o.gaL(),q))):null)}}for(t=0;t<z.length;++t){o=z[t]
for(s=J.C(o),q=0;q<3;q=m){J.u(J.e(s.gaE(o),q).gaL(),q,J.e(o.gaL(),q).gpG())
n=J.e(o.gaL(),q)
r=o.gaL()
m=q+1
j=C.a.R(m,3)
k=p.h4(n,J.e(r,j))
J.u(J.e(s.gaE(o),q).gaL(),j,k)
J.u(J.e(s.gaE(o),j).gaL(),q,k)
J.u(J.e(s.gaE(o),3).gaL(),q,k)}}}x=Array(y.length)
x.fixed$length=Array
f=H.p(x,[G.j])
for(x=f.length,w=0;s=y.length,w<s;++w){s=y[w]
if(s.e){s=M.lu(s,0.2)
if(w>=x)return H.a(f,w)
f[w]=s}else{r=s.ej()
r=M.is(s,1/(r+3/(8*M.lt(r))))
if(w>=x)return H.a(f,w)
f[w]=r}}for(w=0;w<s;++w){r=y[w]
if(w>=x)return H.a(f,w)
r.a=f[w]}e=[]
d=H.p([],[G.j])
C.c.sn(d,16)
for(w=0;w<y.length;++w){k=y[w]
x=new Float32Array(3)
c=new G.r(x)
if(0>=3)return H.a(x,0)
x[0]=0
if(1>=3)return H.a(x,1)
x[1]=0
if(2>=3)return H.a(x,2)
x[2]=0
x=new Float32Array(3)
b=new G.r(x)
if(0>=3)return H.a(x,0)
x[0]=0
if(1>=3)return H.a(x,1)
x[1]=0
if(2>=3)return H.a(x,2)
x[2]=0
a=k.ej()
if(a>d.length)C.c.sn(d,a)
k.kV(d,0)
if(!k.e)for(q=0;q<a;++q){if(q>=d.length)return H.a(d,q)
x=d[q]
s=6.283185307179586*q/a
c=c.j(0,J.d(x,Math.cos(s)))
if(q>=d.length)return H.a(d,q)
x=d[q]
b=b.j(0,J.d(x,Math.sin(s)))}else{x=a-1
s=d.length
if(x<0||x>=s)return H.a(d,x)
r=d[x]
if(0>=s)return H.a(d,0)
c=J.h(r,d[0])
if(a===2){x=d.length
if(0>=x)return H.a(d,0)
s=d[0]
if(1>=x)return H.a(d,1)
b=J.h(J.c(s,d[1]),J.d(k.a,2))}else if(a===3){if(1>=d.length)return H.a(d,1)
b=J.h(d[1],k.a)}else{s=d.length
r=d[0]
if(a===4){if(0>=s)return H.a(d,0)
x=J.d(r,-1)
if(1>=d.length)return H.a(d,1)
x=J.c(x,J.d(d[1],2))
if(2>=d.length)return H.a(d,2)
x=J.c(x,J.d(d[2],2))
if(3>=d.length)return H.a(d,3)
b=J.c(J.c(x,J.d(d[3],-1)),J.d(k.a,-2))}else{a0=3.141592653589793/x
if(0>=s)return H.a(d,0)
if(x>=s)return H.a(d,x)
s=J.c(r,d[x])
b=J.d(s,Math.sin(a0))
for(q=1;q<x;++q){s=Math.cos(a0)
r=Math.sin(q*a0)
if(q>=d.length)return H.a(d,q)
b=J.c(b,J.d(d[q],(2*s-2)*r))}b=J.M(b)}}}e.push(new G.a1(new Float32Array(H.n(G.aF(c,b).a))))}a1=z.length
x=H.k(3*a1)
a2=new Uint32Array(x)
a3=y.length
a4=P.a5()
for(w=0;w<a3;++w){if(w>=y.length)return H.a(y,w)
a4.k(0,y[w],w)}for(a5=0,w=0;w<a1;++w)for(t=0;t<3;++t,a5=a6){a6=a5+1
if(w>=z.length)return H.a(z,w)
s=a4.h(0,J.e(z[w].gaL(),t))
if(a5<0||a5>=x)return H.a(a2,a5)
a2[a5]=s}a7=new G.A([],[],[],[],[],[],[],[],[])
a7.hU("indices",a2)
a7.eL("P",f)
a7.fJ("N",e)
a8.push(M.fN(this.a,this.b,this.c,a7,null))},
bY:function(){var z,y,x,w,v
z=G.a9(null,null)
for(y=this.r,x=y.length,w=0;w<x;++w){v=y[w].a
z=new G.ax(new G.j(new Float32Array(H.n(z.a.a))),new G.j(new Float32Array(H.n(z.b.a)))).aR(v)}return z},
aA:function(){var z,y,x,w,v,u
z=G.a9(null,null)
for(y=this.r,x=y.length,w=this.a,v=0;v<x;++v){u=w.a1(y[v].a)
z=new G.ax(new G.j(new Float32Array(H.n(z.a.a))),new G.j(new Float32Array(H.n(z.b.a)))).aR(u)}return z},
mv:function(a,b,c,d,e,f,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
if(typeof e!=="number")return H.b(e)
z=this.r
y=J.D(a0)
x=z.length
w=0
for(;w<e;++w){v=y.h(a0,w)
if(w>=x)return H.a(z,w)
z[w]=new M.hb(v,null,null,!1,!1)}if(typeof d!=="number")return H.b(d)
y=this.x
v=y.length
u=J.D(f)
w=0
t=0
for(;w<d;++w,t=q){s=[null,null,null]
r=new M.k1(s,[null,null,null],[null,null,null,null])
if(w>=v)return H.a(y,w)
y[w]=r
q=t+1
p=u.h(f,t)
if(p>>>0!==p||p>=x)return H.a(z,p)
o=z[p]
if(0>=s.length)return H.a(s,0)
s[0]=o
o.b=r
t=q+1
p=u.h(f,q)
if(p>>>0!==p||p>=x)return H.a(z,p)
o=z[p]
if(1>=s.length)return H.a(s,1)
s[1]=o
o.b=r
q=t+1
p=u.h(f,t)
if(p>>>0!==p||p>=x)return H.a(z,p)
o=z[p]
if(2>=s.length)return H.a(s,2)
s[2]=o
o.b=r}u=P.a5()
n=new M.na(u)
for(w=0;w<d;++w){if(w>=v)return H.a(y,w)
r=y[w]
for(m=0;m<3;m=k){s=r.a
p=s.length
if(m>=p)return H.a(s,m)
l=s[m]
k=m+1
j=C.a.R(k,3)
if(j>=p)return H.a(s,j)
i=s[j]
h=n.h4(l,i)
if(h==null){s=[null,null]
p=[null,null]
h=new M.w2(s,p,null)
j=s.length
if(0>=j)return H.a(s,0)
s[0]=l
if(1>=j)return H.a(s,1)
s[1]=i
h.c=-1
if(0>=p.length)return H.a(p,0)
p[0]=r
h.c=m
if(!u.O(l))u.k(0,l,P.cE(null,null,null,null,null))
J.u(u.h(0,l),i,h)}else{J.u(J.e(h.gaN(),0).gaN(),h.gq7(),r)
s=r.b
p=h.b
if(0>=p.length)return H.a(p,0)
p=p[0]
if(m>=s.length)return H.a(s,m)
s[m]=p}}}for(w=0;w<e;++w){if(w>=x)return H.a(z,w)
o=z[w]
r=o.b
do{r=r.fS(o)
y=r==null}while(!y&&!J.i(r,o.b))
o.e=y
g=o.ej()
y=o.e
if(!y&&g===6)o.d=!0
else if(y&&g===4)o.d=!0
else o.d=!1}},
static:{qM:function(a,b,c,d,e,f,g,h){var z,y,x
if(typeof e!=="number")return H.b(e)
z=H.p(Array(e),[M.hb])
if(typeof d!=="number")return H.b(d)
y=H.p(Array(d),[M.k1])
x=$.aP
$.aP=x+1
x=new M.ir(h,z,y,a,b,c,!1,x)
x.mv(a,b,c,d,e,f,g,h)
return x},lt:function(a){if(a===3)return 0.1875
return 3/(8*a)},is:function(a,b){var z,y,x,w
z=a.ej()
y=Array(z)
y.$builtinTypeInfo=[G.j]
a.kU(y)
x=J.d(a.a,1-z*b)
for(w=0;w<z;++w)x=J.c(x,J.d(y[w],b))
return x},lu:function(a,b){var z,y,x,w
z=a.ej()
y=Array(z)
y.$builtinTypeInfo=[G.j]
a.kU(y)
x=J.d(a.a,1-2*b)
if(0>=z)return H.a(y,0)
x=J.c(x,J.d(y[0],b))
w=z-1
if(w<0)return H.a(y,w)
return J.c(x,J.d(y[w],b))},AM:[function(a,b,c,d){var z,y,x
z=d.V("nlevels",1)
y=d.kz("indices")
x=d.ig("P")
if(y==null||x==null)return
return M.qM(a,b,c,J.ac(J.a0(y),3),J.a0(x),y,x,z)},"$4","yy",8,0,105]}},
na:{
"^":"o;a",
h4:function(a,b){var z=this.a
if(z.O(a))if(z.h(0,a).O(b))return z.h(0,a).h(0,b)
if(z.O(b))if(z.h(0,b).O(a))return z.h(0,b).h(0,a)
return}},
hb:{
"^":"o;c2:a<,b,pG:c<,d,e",
ej:function(){var z,y
z=this.b
if(!this.e){for(y=1;z=z.fS(this),!J.i(z,this.b);)++y
return y}else{for(y=1;z=z.fS(this),z!=null;)++y
z=this.b
for(;z=z.qM(this),z!=null;)++y
return y+1}},
kV:function(a,b){var z,y,x,w,v
z=this.e
y=this.b
if(!z){do{x=b+1
z=y.kP(this).gc2()
if(b>=a.length)return H.a(a,b)
a[b]=z
z=y.b
w=y.cw(this)
if(w<0||w>=z.length)return H.a(z,w)
y=z[w]
if(!J.i(y,this.b)){b=x
continue}else break}while(!0)}else{for(;v=y.fS(this),v!=null;y=v);x=b+1
z=y.kP(this).gc2()
if(b>=a.length)return H.a(a,b)
a[b]=z
b=x
do{x=b+1
z=y.qN(this).gc2()
if(b>=a.length)return H.a(a,b)
a[b]=z
z=y.b
w=C.a.R(y.cw(this)+2,3)
if(w>=z.length)return H.a(z,w)
y=z[w]
if(y!=null){b=x
continue}else break}while(!0)}},
kU:function(a){return this.kV(a,0)}},
k1:{
"^":"o;aL:a<,aN:b<,aE:c>",
cw:function(a){var z,y
for(z=this.a,y=0;y<3;++y){if(y>=z.length)return H.a(z,y)
if(J.i(z[y],a))return y}$.t.$2(3,"Basic logic error in SDFace::vnum()")
return-1},
fS:function(a){var z,y
z=this.b
y=this.cw(a)
if(y<0||y>=z.length)return H.a(z,y)
return z[y]},
qM:function(a){var z,y
z=this.b
y=C.a.R(this.cw(a)+2,3)
if(y>=z.length)return H.a(z,y)
return z[y]},
kP:function(a){var z,y
z=this.a
y=C.a.R(this.cw(a)+1,3)
if(y>=z.length)return H.a(z,y)
return z[y]},
qN:function(a){var z,y
z=this.a
y=C.a.R(this.cw(a)+2,3)
if(y>=z.length)return H.a(z,y)
return z[y]},
kW:function(a,b){var z,y,x
for(z=this.a,y=0;y<3;++y){if(y>=z.length)return H.a(z,y)
if(!J.i(z[y],a)){if(y>=z.length)return H.a(z,y)
x=!J.i(z[y],b)}else x=!1
if(x){if(y>=z.length)return H.a(z,y)
return z[y]}}$.t.$2(3,"Basic logic error in SDVertex::otherVert()")
return},
ay:function(a,b){return this.b.$2(a,b)}},
w2:{
"^":"o;aL:a<,aN:b<,q7:c<",
ay:function(a,b){return this.b.$2(a,b)}},
iH:{
"^":"bz;f,r,x,y,z,Q,ch,cx,cy,db,dx,c2:dy<,a,b,c,d,e",
bY:function(){var z,y,x,w,v,u,t,s,r,q
if(!this.dx){z=G.a9(null,null)
y=this.f
x=this.x
w=J.w(y)
v=0
u=0
while(!0){t=w.i(y,x)
if(typeof t!=="number")return H.b(t)
if(!(v<t))break
t=J.e(this.dy,u)
s=J.e(this.dy,u+1)
r=J.e(this.dy,u+2)
q=new Float32Array(3)
if(0>=3)return H.a(q,0)
q[0]=t
if(1>=3)return H.a(q,1)
q[1]=s
if(2>=3)return H.a(q,2)
q[2]=r
z=new G.ax(new G.j(new Float32Array(H.n(z.a.a))),new G.j(new Float32Array(H.n(z.b.a)))).aR(new G.j(q));++v
u+=3}return z}else{z=G.a9(null,null)
y=this.f
x=this.x
w=J.w(y)
v=0
u=0
while(!0){t=w.i(y,x)
if(typeof t!=="number")return H.b(t)
if(!(v<t))break
t=u+3
s=J.G(J.e(this.dy,u),J.e(this.dy,t))
r=J.G(J.e(this.dy,u+1),J.e(this.dy,t))
t=J.G(J.e(this.dy,u+2),J.e(this.dy,t))
q=new Float32Array(3)
if(0>=3)return H.a(q,0)
q[0]=s
if(1>=3)return H.a(q,1)
q[1]=r
if(2>=3)return H.a(q,2)
q[2]=t
z=new G.ax(new G.j(new Float32Array(H.n(z.a.a))),new G.j(new Float32Array(H.n(z.b.a)))).aR(new G.j(q));++v
u+=4}return z}},
aA:function(){var z,y,x,w,v,u,t,s,r,q,p
if(!this.dx){z=G.a9(null,null)
y=this.f
x=this.x
w=J.w(y)
v=this.a
u=0
t=0
while(!0){s=w.i(y,x)
if(typeof s!=="number")return H.b(s)
if(!(u<s))break
s=J.e(this.dy,t)
r=J.e(this.dy,t+1)
q=J.e(this.dy,t+2)
p=new Float32Array(3)
if(0>=3)return H.a(p,0)
p[0]=s
if(1>=3)return H.a(p,1)
p[1]=r
if(2>=3)return H.a(p,2)
p[2]=q
p=v.a1(new G.j(p))
z=new G.ax(new G.j(new Float32Array(H.n(z.a.a))),new G.j(new Float32Array(H.n(z.b.a)))).aR(p);++u
t+=3}return z}else{z=G.a9(null,null)
y=this.f
x=this.x
w=J.w(y)
v=this.a
u=0
t=0
while(!0){s=w.i(y,x)
if(typeof s!=="number")return H.b(s)
if(!(u<s))break
s=t+3
r=J.G(J.e(this.dy,t),J.e(this.dy,s))
q=J.G(J.e(this.dy,t+1),J.e(this.dy,s))
s=J.G(J.e(this.dy,t+2),J.e(this.dy,s))
p=new Float32Array(3)
if(0>=3)return H.a(p,0)
p[0]=r
if(1>=3)return H.a(p,1)
p[1]=q
if(2>=3)return H.a(p,2)
p[2]=s
p=v.a1(new G.j(p))
z=new G.ax(new G.j(new Float32Array(H.n(z.a.a))),new G.j(new Float32Array(H.n(z.b.a)))).aR(p);++u
t+=4}return z}},
b_:function(){return!1},
cr:function(b1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0
z=H.k(30)
y=new Float32Array(z)
x=H.k(30)
w=new Float32Array(x)
v=Array(900)
v.fixed$length=Array
u=H.p(v,[G.j])
v=Array(900)
v.fixed$length=Array
t=H.p(v,[G.a1])
for(v=this.z,s=this.Q,r=J.w(v),q=J.w(s),p=0;p<30;++p){o=p/29
o=J.c(r.i(v,1-o),q.i(s,o))
if(p>=z)return H.a(y,p)
y[p]=o}for(v=this.ch,s=this.cx,r=J.w(v),q=J.w(s),p=0;p<30;++p){o=p/29
o=J.c(r.i(v,1-o),q.i(s,o))
if(p>=x)return H.a(w,p)
w[p]=o}v=H.k(1800)
n=new Float32Array(v)
m=this.dy
if(!this.dx){s=this.f
r=this.x
q=J.w(s)
o=H.k(J.d(q.i(s,r),4))
m=new Float32Array(o)
p=0
l=0
k=0
while(!0){j=q.i(s,r)
if(typeof j!=="number")return H.b(j)
if(!(p<j))break
i=k+1
h=l+1
j=J.e(this.dy,l)
if(k>=o)return H.a(m,k)
m[k]=j
k=i+1
l=h+1
j=J.e(this.dy,h)
if(i>=o)return H.a(m,i)
m[i]=j
i=k+1
h=l+1
j=J.e(this.dy,l)
if(k>=o)return H.a(m,k)
m[k]=j
k=i+1
if(i>=o)return H.a(m,i)
m[i]=1;++p
l=h}}for(s=t.length,r=this.r,q=this.cy,o=this.f,j=this.y,g=this.db,f=this.x,e=u.length,d=0,l=0;d<30;++d)for(c=0;c<30;++c,++l){b=2*l
if(c>=z)return H.a(y,c)
a=y[c]
if(b>=v)return H.a(n,b)
n[b]=a;++b
if(d>=x)return H.a(w,d)
a=w[d]
if(b>=v)return H.a(n,b)
n[b]=a
b=new Float32Array(3)
a0=new G.r(b)
if(0>=3)return H.a(b,0)
b[0]=0
if(1>=3)return H.a(b,1)
b[1]=0
if(2>=3)return H.a(b,2)
b[2]=0
b=new Float32Array(3)
a1=new G.r(b)
if(0>=3)return H.a(b,0)
b[0]=0
if(1>=3)return H.a(b,1)
b[1]=0
if(2>=3)return H.a(b,2)
b[2]=0
a2=M.r7(r,q,o,y[c],j,g,f,w[d],m,a0,a1)
if(l<0||l>=e)return H.a(u,l)
u[l]=a2
b=new Float32Array(H.n(G.aF(a0,a1).a))
a=new G.a1(b)
a3=a.a_()
a3=Math.sqrt(a3)
a4=b.length
if(0>=a4)return H.a(b,0)
b[0]=b[0]/a3
if(1>=a4)return H.a(b,1)
b[1]=b[1]/a3
if(2>=a4)return H.a(b,2)
b[2]=b[2]/a3
if(l>=s)return H.a(t,l)
t[l]=a}z=H.k(5046)
a5=new Int32Array(z)
x=new M.r8(30)
for(a6=0,d=0;d<29;d=a7)for(a7=d+1,c=0;c<29;c=a9){a8=a6+1
v=x.$2(c,d)
if(a6<0||a6>=z)return H.a(a5,a6)
a5[a6]=v
a6=a8+1
a9=c+1
v=x.$2(a9,d)
if(a8<0||a8>=z)return H.a(a5,a8)
a5[a8]=v
a8=a6+1
v=x.$2(a9,a7)
if(a6<0||a6>=z)return H.a(a5,a6)
a5[a6]=v
a6=a8+1
v=x.$2(c,d)
if(a8<0||a8>=z)return H.a(a5,a8)
a5[a8]=v
a8=a6+1
v=x.$2(a9,a7)
if(a6<0||a6>=z)return H.a(a5,a6)
a5[a6]=v
a6=a8+1
v=x.$2(c,a7)
if(a8<0||a8>=z)return H.a(a5,a8)
a5[a8]=v}b0=new G.A([],[],[],[],[],[],[],[],[])
b0.hU("indices",a5)
b0.eL("P",u)
b0.kd("uv",n)
b0.fJ("N",t)
b1.push(M.fN(this.a,this.b,this.c,b0,null))},
static:{r7:function(a,b,c,d,e,f,g,h,i,j,k){var z,y,x,w,v,u,t,s,r,q,p,o
z=P.I(a,e)*4
if(typeof z!=="number"||Math.floor(z)!==z)H.T(P.aD("Invalid length "+H.m(z)))
y=new Float32Array(z)
x=J.c(J.h(M.iI(b,a,c,d),a),1)
if(typeof a!=="number")return H.b(a)
z=J.w(x)
w=y.length
v=0
u=0
for(;v<a;++v){t=M.fv(e,f,i,J.d(z.j(x,v),4),g,c,h,null)
s=u+1
r=t[0]
if(u>=w)return H.a(y,u)
y[u]=r
u=s+1
r=t[1]
if(s>=w)return H.a(y,s)
y[s]=r
s=u+1
r=t[2]
if(u>=w)return H.a(y,u)
y[u]=r
u=s+1
r=t[3]
if(s>=w)return H.a(y,s)
y[s]=r}q=J.c(J.h(M.iI(f,e,g,h),e),1)
p=M.fv(a,b,y,J.d(z.a2(x),4),c,1,d,j)
if(typeof e!=="number")return H.b(e)
z=J.w(q)
v=0
u=0
for(;v<e;++v){t=M.fv(a,b,i,J.d(J.d(z.j(q,v),c),4),c,1,d,null)
s=u+1
r=t[0]
if(u>=w)return H.a(y,u)
y[u]=r
u=s+1
r=t[1]
if(s>=w)return H.a(y,s)
y[s]=r
s=u+1
r=t[2]
if(u>=w)return H.a(y,u)
y[u]=r
u=s+1
r=t[3]
if(s>=w)return H.a(y,s)
y[s]=r}M.fv(e,f,y,J.d(z.a2(q),4),g,1,h,k)
z=J.G(p[0],p[3])
w=J.G(p[1],p[3])
r=J.G(p[2],p[3])
o=new Float32Array(3)
if(0>=3)return H.a(o,0)
o[0]=z
if(1>=3)return H.a(o,1)
o[1]=w
if(2>=3)return H.a(o,2)
o[2]=r
return new G.j(o)},fv:function(a3,a4,a5,a6,a7,a8,a9,b0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
z=M.iI(a4,a3,a7,a9)
y=J.y(z)
x=J.c(y.l(z,a3),1)
if(typeof a3!=="number")return H.b(a3)
w=4*a3
if(typeof w!=="number"||Math.floor(w)!==w)H.T(P.aD("Invalid length "+H.m(w)))
v=new Float32Array(w)
for(w=v.length,u=J.w(x),t=J.w(a6),s=J.D(a5),r=0;r<w;){q=t.j(a6,J.d(u.j(x,r),a8))
p=r+1
o=J.c(q,1)
v[r]=s.h(a5,q)
r=p+1
q=J.c(o,1)
n=s.h(a5,o)
if(p>=w)return H.a(v,p)
v[p]=n
p=r+1
o=J.c(q,1)
n=s.h(a5,q)
if(r>=w)return H.a(v,r)
v[r]=n
r=p+1
J.c(o,1)
n=s.h(a5,o)
if(p>=w)return H.a(v,p)
v[p]=n}for(u=a3-2,t=a3-1,s=J.D(a4),r=0;r<u;++r)for(n=t-r,q=0,m=0,l=4;q<n;m+=4,l+=4,q=o){k=J.G(J.h(s.h(a4,J.c(y.j(z,1),q)),a9),J.h(s.h(a4,J.c(y.j(z,1),q)),s.h(a4,J.c(J.h(J.c(y.j(z,q),2),a3),r))))
if(q>=w)return H.a(v,q)
j=J.d(v[q],k)
if(l>=w)return H.a(v,l)
i=v[l]
if(typeof k!=="number")return H.b(k)
h=1-k
i=J.c(j,J.d(i,h))
if(m>=w)return H.a(v,m)
v[m]=i
i=m+1
o=q+1
if(o>=w)return H.a(v,o)
j=J.d(v[o],k)
g=l+1
if(g>=w)return H.a(v,g)
g=J.c(j,J.d(v[g],h))
if(i>=w)return H.a(v,i)
v[i]=g
g=m+2
i=q+2
if(i>=w)return H.a(v,i)
i=J.d(v[i],k)
j=l+2
if(j>=w)return H.a(v,j)
j=J.c(i,J.d(v[j],h))
if(g>=w)return H.a(v,g)
v[g]=j
j=m+3
g=q+3
if(g>=w)return H.a(v,g)
g=J.d(v[g],k)
i=l+3
if(i>=w)return H.a(v,i)
h=J.c(g,J.d(v[i],h))
if(j>=w)return H.a(v,j)
v[j]=h}k=J.G(J.h(s.h(a4,y.j(z,1)),a9),J.h(s.h(a4,y.j(z,1)),s.h(a4,y.j(z,0))))
if(0>=w)return H.a(v,0)
u=J.d(v[0],k)
if(4>=w)return H.a(v,4)
n=v[4]
if(typeof k!=="number")return H.b(k)
j=1-k
f=J.c(u,J.d(n,j))
n=J.d(v[1],k)
if(5>=w)return H.a(v,5)
e=J.c(n,J.d(v[5],j))
n=J.d(v[2],k)
if(6>=w)return H.a(v,6)
d=J.c(n,J.d(v[6],j))
n=J.d(v[3],k)
if(7>=w)return H.a(v,7)
c=J.c(n,J.d(v[7],j))
if(b0!=null){y=J.h(s.h(a4,y.j(z,1)),s.h(a4,z))
if(typeof y!=="number")return H.b(y)
b=t/y
a=J.d(J.h(v[4],v[0]),b)
a0=J.d(J.h(v[5],v[1]),b)
a1=J.d(J.h(v[6],v[2]),b)
a2=J.d(J.h(v[7],v[3]),b)
y=J.w(c)
t=J.h(J.G(a,c),J.G(J.d(f,a2),y.i(c,c)))
w=b0.a
u=w.length
if(0>=u)return H.a(w,0)
w[0]=t
t=J.h(J.G(a0,c),J.G(J.d(e,a2),y.i(c,c)))
if(1>=u)return H.a(w,1)
w[1]=t
y=J.h(J.G(a1,c),J.G(J.d(d,a2),y.i(c,c)))
if(2>=u)return H.a(w,2)
w[2]=y}return[f,e,d,c]},iI:function(a,b,c,d){var z,y,x,w,v
z=J.h(b,1)
for(y=J.D(a),x=J.y(d),w=z;v=J.w(w),x.a0(d,y.h(a,v.j(w,1)));)w=v.j(w,1)
return w},Bg:[function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=d.V("nu",-1)
y=d.V("uorder",-1)
x=d.bA("uknots")
w=J.D(x)
v=d.m("u0",w.h(x,J.h(y,1)))
u=d.m("u1",w.h(x,z))
t=d.V("nv",-1)
s=d.V("vorder",-1)
r=d.bA("vknots")
w=J.D(r)
q=d.m("v0",w.h(r,J.h(s,1)))
p=d.m("v1",w.h(r,t))
o=d.ig("P")
if(o!=null){w=J.D(o)
n=H.k(J.d(w.gn(o),3))
m=new Float32Array(n)
l=0
k=0
while(!0){j=w.gn(o)
if(typeof j!=="number")return H.b(j)
if(!(l<j))break
i=k+1
j=J.V(w.h(o,l))
if(k>=n)return H.a(m,k)
m[k]=j
k=i+1
j=J.S(w.h(o,l))
if(i>=n)return H.a(m,i)
m[i]=j
i=k+1
j=J.P(w.h(o,l))
if(k>=n)return H.a(m,k)
m[k]=j;++l
k=i}h=n/3|0
g=!1}else{m=d.bA("Pw")
if(m==null){$.t.$2(2,"Must provide control points via 'P' or 'Pw' parameter to NURBS shape.")
return}w=J.D(m)
if(J.bW(w.gn(m),4)!==0){$.t.$2(2,"Number of 'Pw' control points provided to NURBS shape must be multiple of four")
return}h=J.ac(w.gn(m),4)
g=!0}w=J.w(z)
if(!J.i(h,w.i(z,t))){w="NURBS shape was expecting "+H.m(z)+"*"+H.m(t)+"="+H.m(w.i(z,t))+" control points, was given "+H.m(J.a0(m))
$.t.$2(2,w)
return}w=$.aP
$.aP=w+1
return new M.iH(z,y,t,s,v,u,q,p,x,r,g,m,a,b,c,!1,w)},"$4","yz",8,0,106]}},
r8:{
"^":"z:13;a",
$2:function(a,b){return b*this.a+a}},
iL:{
"^":"bz;f,r,x,y,a,b,c,d,e",
bY:function(){var z,y,x,w,v,u
z=this.f
y=J.y(z)
x=y.a2(z)
y=y.a2(z)
w=this.r
v=new G.j(new Float32Array(H.k(3)))
v.C(x,y,w)
w=this.x
u=new G.j(new Float32Array(H.k(3)))
u.C(z,z,w)
return G.a9(v,u)},
bW:function(a2,a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
z=G.aO(null,null,0,1/0,0,0)
this.b.aK(a2,z)
y=this.x
x=this.f
x=J.d(x,x)
if(typeof x!=="number")return H.b(x)
w=y/x
x=J.c(J.d(J.V(z.b),J.V(z.b)),J.d(J.S(z.b),J.S(z.b)))
if(typeof x!=="number")return H.b(x)
y=J.V(z.b)
v=z.a.a
if(0>=v.length)return H.a(v,0)
v=J.d(y,v[0])
y=J.S(z.b)
u=z.a.a
if(1>=u.length)return H.a(u,1)
u=J.c(v,J.d(y,u[1]))
if(typeof u!=="number")return H.b(u)
y=J.P(z.b)
if(typeof y!=="number")return H.b(y)
v=z.a.a
t=v.length
if(0>=t)return H.a(v,0)
s=v[0]
if(1>=t)return H.a(v,1)
r=v[1]
if(2>=t)return H.a(v,2)
q=[0]
p=[0]
if(!G.c3(w*x,2*w*u-y,w*(s*s+r*r)-v[2],q,p))return!1
if(J.F(q[0],z.d)||J.K(p[0],z.c))return!1
o=q[0]
if(J.K(o,z.c)){o=p[0]
if(J.F(o,z.d))return!1}y=new Float32Array(H.n(z.a.j(0,J.d(z.b,o)).a))
n=new G.j(y)
x=y.length
if(1>=x)return H.a(y,1)
v=y[1]
u=y[0]
m=Math.atan2(H.v(v),H.v(u))
if(m<0)m+=6.283185307179586
if(2>=x)return H.a(y,2)
y=y[2]
x=this.r
if(y<x||y>this.x||m>this.y){if(J.i(o,p[0]))return!1
o=p[0]
if(J.F(o,z.d))return!1
y=new Float32Array(H.n(z.a.j(0,J.d(z.b,o)).a))
n=new G.j(y)
x=y.length
if(1>=x)return H.a(y,1)
v=y[1]
u=y[0]
m=Math.atan2(H.v(v),H.v(u))
if(m<0)m+=6.283185307179586
if(2>=x)return H.a(y,2)
y=y[2]
x=this.r
if(y<x||y>this.x||m>this.y)return!1
y=x}else y=x
x=this.y
v=n.a
if(2>=v.length)return H.a(v,2)
u=v[2]
t=this.x
l=G.B(-x*v[1],x*v[0],0)
s=v[0]
r=2*v[2]
k=G.B(s/r,v[1]/r,1).i(0,this.x-this.r)
r=G.B(v[0],v[1],0)
s=this.y
j=r.i(0,-s*s)
s=v[1]
r=2*v[2]
i=G.B(-s/r,v[0]/r,0).i(0,this.x-this.r).i(0,this.y)
r=v[0]
s=v[2]
s=4*s*s
s=G.B(r/s,v[1]/s,0)
v=this.x-this.r
h=s.i(0,-v*v)
g=G.J(l,l)
f=G.J(l,k)
e=G.J(k,k)
v=G.aF(l,k)
d=v.w(0,v.E(0))
c=G.J(d,j)
b=G.J(d,i)
a=G.J(d,h)
v=J.h(J.d(g,e),J.d(f,f))
if(typeof v!=="number")return H.b(v)
a0=1/v
v=J.w(b)
s=J.w(c)
s=new Float32Array(H.n(l.i(0,J.d(J.h(v.i(b,f),s.i(c,e)),a0)).j(0,k.i(0,J.d(J.h(s.i(c,f),v.i(b,g)),a0))).a))
r=J.w(a)
r=new Float32Array(H.n(l.i(0,J.d(J.h(r.i(a,f),v.i(b,e)),a0)).j(0,k.i(0,J.d(J.h(v.i(b,f),r.i(a,g)),a0))).a))
a1=this.a
a5.bM(a1.a1(n),a1.ag(l),a1.ag(k),a1.aQ(new G.a1(s)),a1.aQ(new G.a1(r)),m/x,(u-y)/(t-y),this)
a3[0]=o
if(typeof o!=="number")return H.b(o)
a4[0]=0.0005*o
return!0},
a5:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=G.aO(null,null,0,1/0,0,0)
this.b.aK(a,z)
y=this.x
x=this.f
x=J.d(x,x)
if(typeof x!=="number")return H.b(x)
w=y/x
x=J.c(J.d(J.V(z.b),J.V(z.b)),J.d(J.S(z.b),J.S(z.b)))
if(typeof x!=="number")return H.b(x)
y=J.V(z.b)
v=z.a.a
if(0>=v.length)return H.a(v,0)
v=J.d(y,v[0])
y=J.S(z.b)
u=z.a.a
if(1>=u.length)return H.a(u,1)
u=J.c(v,J.d(y,u[1]))
if(typeof u!=="number")return H.b(u)
y=J.P(z.b)
if(typeof y!=="number")return H.b(y)
v=z.a.a
t=v.length
if(0>=t)return H.a(v,0)
s=v[0]
if(1>=t)return H.a(v,1)
r=v[1]
if(2>=t)return H.a(v,2)
q=[0]
p=[0]
if(!G.c3(w*x,2*w*u-y,w*(s*s+r*r)-v[2],q,p))return!1
if(J.F(q[0],z.d)||J.K(p[0],z.c))return!1
o=q[0]
if(J.K(o,z.c)){o=p[0]
if(J.F(o,z.d))return!1}y=new Float32Array(H.n(z.a.j(0,J.d(z.b,o)).a))
x=y.length
if(1>=x)return H.a(y,1)
v=y[1]
u=y[0]
n=Math.atan2(H.v(v),H.v(u))
if(n<0)n+=6.283185307179586
if(2>=x)return H.a(y,2)
y=y[2]
if(y<this.r||y>this.x||n>this.y){if(J.i(o,p[0]))return!1
o=p[0]
if(J.F(o,z.d))return!1
y=new Float32Array(H.n(z.a.j(0,J.d(z.b,o)).a))
x=y.length
if(1>=x)return H.a(y,1)
v=y[1]
u=y[0]
n=Math.atan2(H.v(v),H.v(u))
if(n<0)n+=6.283185307179586
if(2>=x)return H.a(y,2)
y=y[2]
if(y<this.r||y>this.x||n>this.y)return!1}return!0},
c6:[function(){var z,y,x
z=this.y
y=1+4*this.r
H.v(y)
H.v(1.5)
y=Math.pow(y,1.5)
x=1+4*this.x
H.v(x)
H.v(1.5)
return z/12*(y-Math.pow(x,1.5))},"$0","gbg",0,0,6],
static:{Bl:[function(a,b,c,d){var z,y,x,w,v,u
z=d.m("radius",1)
y=d.m("zmin",0)
x=d.m("zmax",1)
w=d.m("phimax",360)
v=$.aP
$.aP=v+1
v=new M.iL(z,null,null,null,a,b,c,!1,v)
v.r=P.X(y,x)
v.x=P.I(y,x)
u=J.a4(w,0,360)
if(typeof u!=="number")return H.b(u)
v.y=0.017453292519943295*u
return v},"$4","yA",8,0,107]}},
jb:{
"^":"bz;f,r,x,y,z,Q,a,b,c,d,e",
bY:function(){var z,y,x,w,v
z=this.f
y=J.y(z)
x=y.a2(z)
y=y.a2(z)
w=this.x
v=new G.j(new Float32Array(H.k(3)))
v.C(x,y,w)
w=this.y
y=new G.j(new Float32Array(H.k(3)))
y.C(z,z,w)
return G.a9(v,y)},
bW:function(a7,a8,a9,b0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
new G.j(new Float32Array(H.k(3))).C(0,0,0)
z=G.aO(null,null,0,1/0,0,0)
this.b.aK(a7,z)
y=J.c(J.c(J.d(J.V(z.b),J.V(z.b)),J.d(J.S(z.b),J.S(z.b))),J.d(J.P(z.b),J.P(z.b)))
x=J.V(z.b)
w=z.a.a
if(0>=w.length)return H.a(w,0)
w=J.d(x,w[0])
x=J.S(z.b)
v=z.a.a
if(1>=v.length)return H.a(v,1)
v=J.c(w,J.d(x,v[1]))
x=J.P(z.b)
w=z.a.a
if(2>=w.length)return H.a(w,2)
w=J.c(v,J.d(x,w[2]))
if(typeof w!=="number")return H.b(w)
x=z.a.a
v=x.length
if(0>=v)return H.a(x,0)
u=x[0]
if(1>=v)return H.a(x,1)
t=x[1]
if(2>=v)return H.a(x,2)
x=x[2]
v=this.f
s=J.w(v)
r=s.i(v,v)
if(typeof r!=="number")return H.b(r)
q=[0]
p=[0]
if(!G.c3(y,2*w,u*u+t*t+x*x-r,q,p))return!1
if(J.F(q[0],z.d)||J.K(p[0],z.c))return!1
o=q[0]
if(J.K(o,z.c)){o=p[0]
if(J.F(o,z.d))return!1}x=new Float32Array(H.n(z.a.j(0,J.d(z.b,o)).a))
n=new G.j(x)
w=x.length
if(0>=w)return H.a(x,0)
if(x[0]===0){if(1>=w)return H.a(x,1)
u=x[1]===0}else u=!1
if(u){if(typeof v!=="number")return H.b(v)
x[0]=0.00001*v}if(1>=w)return H.a(x,1)
u=x[1]
t=x[0]
m=Math.atan2(H.v(u),H.v(t))
if(m<0)m+=6.283185307179586
u=this.x
t=s.a2(v)
if(typeof t!=="number")return H.b(t)
if(u>t){if(2>=w)return H.a(x,2)
u=x[2]<this.x}else u=!1
if(!u){u=this.y
if(typeof v!=="number")return H.b(v)
if(u<v){if(2>=w)return H.a(x,2)
x=x[2]>u}else x=!1
x=x||m>this.r}else x=!0
if(x){if(J.i(o,p[0]))return!1
if(J.F(p[0],z.d))return!1
o=p[0]
x=new Float32Array(H.n(z.a.j(0,J.d(z.b,o)).a))
n=new G.j(x)
w=x.length
if(0>=w)return H.a(x,0)
if(x[0]===0){if(1>=w)return H.a(x,1)
u=x[1]===0}else u=!1
if(u){if(typeof v!=="number")return H.b(v)
x[0]=0.00001*v}if(1>=w)return H.a(x,1)
u=x[1]
t=x[0]
m=Math.atan2(H.v(u),H.v(t))
if(m<0)m+=6.283185307179586
u=this.x
s=s.a2(v)
if(typeof s!=="number")return H.b(s)
if(u>s){if(2>=w)return H.a(x,2)
u=x[2]<this.x}else u=!1
if(!u){u=this.y
if(typeof v!=="number")return H.b(v)
if(u<v){if(2>=w)return H.a(x,2)
x=x[2]>u}else x=!1
x=x||m>this.r}else x=!0
if(x)return!1}x=this.r
w=n.a
if(2>=w.length)return H.a(w,2)
u=w[2]
if(typeof v!=="number")return H.b(v)
l=Math.acos(H.v(C.d.v(u/v,-1,1)))
u=this.z
t=this.Q
s=w[0]
r=w[1]
k=1/Math.sqrt(H.v(s*s+r*r))
r=w[0]
j=r*k
s=w[1]
i=s*k
h=this.r
g=G.B(-h*s,h*r,0)
r=w[2]
f=G.B(r*j,r*i,-v*Math.sin(H.v(l))).i(0,this.Q-this.z)
e=G.B(w[0],w[1],0).i(0,-this.r).i(0,this.r)
d=G.B(-i,j,0).i(0,this.Q-this.z).i(0,w[2]).i(0,this.r)
c=G.B(w[0],w[1],w[2]).i(0,-(this.Q-this.z)).i(0,this.Q-this.z)
b=G.J(g,g)
a=G.J(g,f)
a0=G.J(f,f)
w=G.aF(g,f)
a1=w.w(0,w.E(0))
a2=G.J(a1,e)
a3=G.J(a1,d)
a4=G.J(a1,c)
w=J.h(J.d(b,a0),J.d(a,a))
if(typeof w!=="number")return H.b(w)
a5=1/w
w=J.w(a3)
v=J.w(a2)
v=new Float32Array(H.n(g.i(0,J.h(w.i(a3,a),v.i(a2,a0))).i(0,a5).j(0,f.i(0,J.h(v.i(a2,a),w.i(a3,b))).i(0,a5)).a))
r=J.w(a4)
r=new Float32Array(H.n(g.i(0,J.h(r.i(a4,a),w.i(a3,a0))).i(0,a5).j(0,f.i(0,J.h(w.i(a3,a),r.i(a4,b))).i(0,a5)).a))
a6=this.a
b0.bM(a6.a1(n),a6.ag(g),a6.ag(f),a6.aQ(new G.a1(v)),a6.aQ(new G.a1(r)),m/x,(l-u)/(t-u),this)
a8[0]=o
if(typeof o!=="number")return H.b(o)
a9[0]=0.0005*o
return!0},
a5:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=G.aO(null,null,0,1/0,0,0)
this.b.aK(a,z)
y=J.c(J.c(J.d(J.V(z.b),J.V(z.b)),J.d(J.S(z.b),J.S(z.b))),J.d(J.P(z.b),J.P(z.b)))
x=J.V(z.b)
w=z.a.a
if(0>=w.length)return H.a(w,0)
w=J.d(x,w[0])
x=J.S(z.b)
v=z.a.a
if(1>=v.length)return H.a(v,1)
v=J.c(w,J.d(x,v[1]))
x=J.P(z.b)
w=z.a.a
if(2>=w.length)return H.a(w,2)
w=J.c(v,J.d(x,w[2]))
if(typeof w!=="number")return H.b(w)
x=z.a.a
v=x.length
if(0>=v)return H.a(x,0)
u=x[0]
if(1>=v)return H.a(x,1)
t=x[1]
if(2>=v)return H.a(x,2)
x=x[2]
v=this.f
s=J.w(v)
r=s.i(v,v)
if(typeof r!=="number")return H.b(r)
q=[0]
p=[0]
if(!G.c3(y,2*w,u*u+t*t+x*x-r,q,p))return!1
if(!J.F(q[0],z.d)){if(0>=p.length)return H.a(p,0)
x=J.K(p[0],z.c)}else x=!0
if(x)return!1
o=q[0]
if(J.K(o,z.c)){if(0>=p.length)return H.a(p,0)
o=p[0]
if(J.F(o,z.d))return!1}x=new Float32Array(H.n(z.a.j(0,J.d(z.b,o)).a))
w=x.length
if(0>=w)return H.a(x,0)
if(x[0]===0){if(1>=w)return H.a(x,1)
u=x[1]===0}else u=!1
if(u){if(typeof v!=="number")return H.b(v)
x[0]=0.00001*v}if(1>=w)return H.a(x,1)
u=x[1]
t=x[0]
n=Math.atan2(H.v(u),H.v(t))
if(n<0)n+=6.283185307179586
u=this.x
t=s.a2(v)
if(typeof t!=="number")return H.b(t)
if(u>t){if(2>=w)return H.a(x,2)
u=x[2]<this.x}else u=!1
if(!u){u=this.y
if(typeof v!=="number")return H.b(v)
if(u<v){if(2>=w)return H.a(x,2)
x=x[2]>u}else x=!1
x=x||n>this.r}else x=!0
if(x){if(J.i(o,p))return!1
if(0>=p.length)return H.a(p,0)
if(J.F(p[0],z.d))return!1
if(0>=p.length)return H.a(p,0)
o=p[0]
x=new Float32Array(H.n(z.a.j(0,J.d(z.b,o)).a))
w=x.length
if(0>=w)return H.a(x,0)
if(x[0]===0){if(1>=w)return H.a(x,1)
u=x[1]===0}else u=!1
if(u){if(typeof v!=="number")return H.b(v)
x[0]=0.00001*v}if(1>=w)return H.a(x,1)
u=x[1]
t=x[0]
n=Math.atan2(H.v(u),H.v(t))
if(n<0)n+=6.283185307179586
u=this.x
s=s.a2(v)
if(typeof s!=="number")return H.b(s)
if(u>s){if(2>=w)return H.a(x,2)
u=x[2]<this.x}else u=!1
if(!u){u=this.y
if(typeof v!=="number")return H.b(v)
if(u<v){if(2>=w)return H.a(x,2)
x=x[2]>u}else x=!1
x=x||n>this.r}else x=!0
if(x)return!1}return!0},
c6:[function(){var z,y
z=this.r
y=this.f
if(typeof y!=="number")return H.b(y)
return z*y*(this.y-this.x)},"$0","gbg",0,0,6],
c1:function(a,b,c){var z,y,x,w,v,u
z=new G.j(new Float32Array(H.k(3)))
z.C(0,0,0)
y=z.j(0,G.bv(a,b).i(0,this.f))
z=this.a
x=y.a
w=x.length
if(0>=w)return H.a(x,0)
v=x[0]
if(1>=w)return H.a(x,1)
u=x[1]
if(2>=w)return H.a(x,2)
x=x[2]
w=new G.a1(new Float32Array(H.k(3)))
w.C(v,u,x)
c.L(z.aQ(w))
c.cq(Math.sqrt(H.v(c.a_())))
if(this.c===!0){x=c.a
w=x.length
if(0>=w)return H.a(x,0)
x[0]=-x[0]
if(1>=w)return H.a(x,1)
x[1]=-x[1]
if(2>=w)return H.a(x,2)
x[2]=-x[2]}return z.a1(y)},
iG:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=new G.j(new Float32Array(H.k(3)))
z.C(0,0,0)
y=this.a.a1(z)
z=y.l(0,a)
x=z.w(0,z.E(0))
w=G.B(0,0,0)
v=G.B(0,0,0)
G.cS(x,w,v)
z=y.l(0,a).a_()
u=this.f
t=J.w(u)
s=t.i(u,u)
if(typeof s!=="number")return H.b(s)
if(z-s<0.0001)return this.c1(b,c,d)
r=J.G(t.i(u,u),y.l(0,a).a_())
if(typeof r!=="number")return H.b(r)
q=Math.sqrt(H.v(P.I(0,1-r)))
p=G.ag()
o=[0]
new G.j(new Float32Array(H.k(3))).C(0,0,0)
n=G.aO(a,G.mJ(b,c,q,w,v,x),0.001,1/0,0,0)
if(!this.bW(n,o,[0],p)){z=y.l(0,a)
u=n.b
t=J.D(u)
o[0]=G.J(z,t.w(u,t.E(u)))}z=o[0]
m=new G.j(new Float32Array(H.n(n.a.j(0,J.d(n.b,z)).a)))
z=m.l(0,y)
d.L(z.w(0,z.E(0)))
if(this.c===!0){z=d.a
u=z.length
if(0>=u)return H.a(z,0)
z[0]=-z[0]
if(1>=u)return H.a(z,1)
z[1]=-z[1]
if(2>=u)return H.a(z,2)
z[2]=-z[2]}return m},
kY:function(a,b){var z,y,x,w,v,u
z=new G.j(new Float32Array(H.k(3)))
z.C(0,0,0)
y=this.a.a1(z)
z=y.l(0,a).a_()
x=this.f
w=J.w(x)
v=w.i(x,x)
if(typeof v!=="number")return H.b(v)
if(z-v<0.0001)return this.lL(a,b)
u=J.G(w.i(x,x),y.l(0,a).a_())
if(typeof u!=="number")return H.b(u)
return G.jA(Math.sqrt(H.v(P.I(0,1-u))))},
mR:function(a,b,c,d,e,f,g){var z,y
z=this.f
y=J.y(z)
this.x=C.b.v(P.X(e,f),y.a2(z),z)
this.y=C.b.v(P.I(e,f),y.a2(z),z)
y=this.x
if(typeof z!=="number")return H.b(z)
this.z=Math.acos(H.v(C.d.v(y/z,-1,1)))
this.Q=Math.acos(H.v(C.d.v(this.y/z,-1,1)))
z=J.a4(g,0,360)
if(typeof z!=="number")return H.b(z)
this.r=0.017453292519943295*z},
static:{jc:function(a,b,c,d,e,f,g){var z=$.aP
$.aP=z+1
z=new M.jb(d,null,null,null,null,null,a,b,c,!1,z)
z.mR(a,b,c,d,e,f,g)
return z},BL:[function(a,b,c,d){var z=d.m("radius",1)
return M.jc(a,b,c,z,d.m("zmin",J.M(z)),d.m("zmax",z),d.m("phimax",360))},"$4","yB",8,0,108]}},
uy:{
"^":"bz;f,r,a,b,c,d,e",
bY:function(){var z,y,x,w,v,u,t
z=this.f
y=z.y
x=this.r
w=y.length
if(x>=w)return H.a(y,x)
v=y[x]
u=x+1
if(u>=w)return H.a(y,u)
u=y[u]
x+=2
if(x>=w)return H.a(y,x)
t=z.c0(v,u,y[x])
x=this.b
y=G.a9(x.a1(t[0]),x.a1(t[1]))
x=x.a1(t[2])
return G.bK(y).aR(x)},
aA:function(){var z,y,x,w,v,u,t
z=this.f
y=z.y
x=this.r
w=y.length
if(x>=w)return H.a(y,x)
v=y[x]
u=x+1
if(u>=w)return H.a(y,u)
u=y[u]
x+=2
if(x>=w)return H.a(y,x)
t=z.c0(v,u,y[x])
x=G.a9(t[0],t[1])
y=t[2]
return G.bK(x).aR(y)},
bW:function(c3,c4,c5,c6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2
z=this.f
y=z.y
x=this.r
w=y.length
if(x>=w)return H.a(y,x)
v=y[x]
u=x+1
if(u>=w)return H.a(y,u)
u=y[u]
x+=2
if(x>=w)return H.a(y,x)
t=z.c0(v,u,y[x])
s=t[0]
r=t[1]
q=t[2]
x=r.a
y=x.length
if(0>=y)return H.a(x,0)
u=x[0]
v=s.a
w=v.length
if(0>=w)return H.a(v,0)
p=v[0]
o=u-p
if(1>=y)return H.a(x,1)
u=x[1]
if(1>=w)return H.a(v,1)
n=v[1]
m=u-n
if(2>=y)return H.a(x,2)
x=x[2]
if(2>=w)return H.a(v,2)
w=v[2]
l=x-w
x=q.a
y=x.length
if(0>=y)return H.a(x,0)
k=x[0]-p
if(1>=y)return H.a(x,1)
j=x[1]-n
if(2>=y)return H.a(x,2)
i=x[2]-w
h=J.h(J.d(J.S(c3.gbc()),i),J.d(J.P(c3.b),j))
g=J.h(J.d(J.P(c3.b),k),J.d(J.V(c3.b),i))
f=J.h(J.d(J.V(c3.b),j),J.d(J.S(c3.b),k))
e=J.c(J.c(J.d(h,o),J.d(g,m)),J.d(f,l))
if(J.i(e,0))return!1
if(typeof e!=="number")return H.b(e)
d=1/e
y=c3.a.a
x=y.length
if(0>=x)return H.a(y,0)
c=y[0]-v[0]
if(1>=x)return H.a(y,1)
b=y[1]-v[1]
if(2>=x)return H.a(y,2)
a=y[2]-v[2]
if(typeof h!=="number")return H.b(h)
if(typeof g!=="number")return H.b(g)
if(typeof f!=="number")return H.b(f)
a0=(c*h+b*g+a*f)*d
if(a0<0||a0>1)return!1
a1=b*l-a*m
a2=a*o-c*l
a3=c*m-b*o
a4=J.d(J.c(J.c(J.d(J.V(c3.b),a1),J.d(J.S(c3.b),a2)),J.d(J.P(c3.b),a3)),d)
if(!J.K(a4,0)){if(typeof a4!=="number")return H.b(a4)
y=a0+a4>1}else y=!0
if(y)return!1
a5=(k*a1+j*a2+i*a3)*d
y=c3.c
if(typeof y!=="number")return H.b(y)
if(!(a5<y)){y=c3.d
if(typeof y!=="number")return H.b(y)
y=a5>y}else y=!0
if(y)return!1
this.h7($.$get$bA())
y=$.$get$bA()
a6=J.h(y[0],y[4])
y=$.$get$bA()
a7=J.h(y[2],y[4])
y=$.$get$bA()
a8=J.h(y[1],y[5])
y=$.$get$bA()
a9=J.h(y[3],y[5])
b0=s.l(0,q)
b1=r.l(0,q)
b2=J.h(J.d(a6,a9),J.d(a8,a7))
if(J.i(b2,0)){b3=G.B(0,0,0)
b4=G.B(0,0,0)
b5=j*l-i*m
b6=i*o-k*l
b7=k*m-j*o
b8=Math.sqrt(H.v(b5*b5+b6*b6+b7*b7))
G.cS(G.B(b5/b8,b6/b8,b7/b8),b3,b4)}else{if(typeof b2!=="number")return H.b(b2)
b9=1/b2
b3=b0.i(0,a9).l(0,b1.i(0,a8)).i(0,b9)
b4=b0.i(0,J.M(a7)).j(0,b1.i(0,a6)).i(0,b9)}if(typeof a4!=="number")return H.b(a4)
c0=1-a0-a4
y=$.$get$bA()
x=y[0]
if(typeof x!=="number")return H.b(x)
w=y[2]
if(typeof w!=="number")return H.b(w)
v=y[4]
if(typeof v!=="number")return H.b(v)
c1=c0*x+a0*w+a4*v
v=y[1]
if(typeof v!=="number")return H.b(v)
w=y[3]
if(typeof w!=="number")return H.b(w)
y=y[5]
if(typeof y!=="number")return H.b(y)
c2=c0*v+a0*w+a4*y
if(c3.f!==-1){z=z.cy
if(z!=null){y=G.ag()
x=new Float32Array(H.n(c3.a.j(0,J.d(c3.b,a5)).a))
w=$.$get$fu()
if(J.i(z.J(y.bM(new G.j(x),b3,b4,w,w,c1,c2,this)),0))return!1}}z=new Float32Array(H.n(c3.a.j(0,J.d(c3.b,a5)).a))
y=$.$get$fu()
c6.bM(new G.j(z),b3,b4,y,y,c1,c2,this)
c4[0]=a5
c5[0]=0.001*a5
return!0},
a5:function(a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
z=this.f
y=z.y
x=this.r
w=y.length
if(x>=w)return H.a(y,x)
v=y[x]
u=x+1
if(u>=w)return H.a(y,u)
u=y[u]
x+=2
if(x>=w)return H.a(y,x)
t=z.c0(v,u,y[x])
s=t[1].l(0,t[0])
r=t[2].l(0,t[0])
q=G.aF(a6.b,r)
p=G.J(q,s)
if(J.i(p,0))return!1
if(typeof p!=="number")return H.b(p)
o=1/p
n=a6.a.l(0,t[0])
m=J.d(G.J(n,q),o)
y=J.y(m)
if(y.U(m,0)||y.a0(m,1))return!1
l=G.aF(n,s)
k=J.d(G.J(a6.b,l),o)
if(J.K(k,0)||J.F(y.j(m,k),1))return!1
j=J.d(G.J(r,l),o)
y=J.y(j)
if(y.U(j,a6.c)||y.a0(j,a6.d))return!1
if(a6.f!==-1&&z.cy!=null){this.h7($.$get$bA())
y=$.$get$bA()
i=J.h(y[0],y[4])
y=$.$get$bA()
h=J.h(y[2],y[4])
y=$.$get$bA()
g=J.h(y[1],y[5])
y=$.$get$bA()
f=J.h(y[3],y[5])
e=t[0].l(0,t[2])
d=t[1].l(0,t[2])
c=J.h(J.d(i,f),J.d(g,h))
if(J.i(c,0)){b=G.B(0,0,0)
a=G.B(0,0,0)
y=G.aF(r,s)
G.cS(y.w(0,y.E(0)),b,a)}else{if(typeof c!=="number")return H.b(c)
a0=1/c
b=e.i(0,f).l(0,d.i(0,g)).i(0,a0)
a=e.i(0,J.M(h)).j(0,d.i(0,i)).i(0,a0)}if(typeof m!=="number")return H.b(m)
if(typeof k!=="number")return H.b(k)
a1=1-m-k
y=$.$get$bA()
x=y[0]
if(typeof x!=="number")return H.b(x)
w=y[2]
if(typeof w!=="number")return H.b(w)
v=y[4]
if(typeof v!=="number")return H.b(v)
u=y[1]
if(typeof u!=="number")return H.b(u)
a2=y[3]
if(typeof a2!=="number")return H.b(a2)
y=y[5]
if(typeof y!=="number")return H.b(y)
a3=G.ag()
a4=new Float32Array(H.n(a6.a.j(0,J.d(a6.b,j)).a))
a5=$.$get$fu()
if(J.i(z.cy.J(a3.bM(new G.j(a4),b,a,a5,a5,a1*x+m*w+k*v,a1*u+m*a2+k*y,this)),0))return!1}return!0},
rQ:[function(a){var z,y
z=this.f.y
y=this.r+a
if(y>=z.length)return H.a(z,y)
return z[y]},"$1","gaL",2,0,38],
h7:function(a){var z,y,x,w,v,u,t
z=this.f
y=z.cx
if(y!=null){z=z.y
x=this.r
w=z.length
if(x>=w)return H.a(z,x)
v=2*z[x]
u=y.length
if(v>=u)return H.a(y,v)
a[0]=y[v]
v=2*z[x]+1
if(v>=u)return H.a(y,v)
a[1]=y[v]
v=x+1
if(v>=w)return H.a(z,v)
t=2*z[v]
if(t>=u)return H.a(y,t)
a[2]=y[t]
v=2*z[v]+1
if(v>=u)return H.a(y,v)
a[3]=y[v]
x+=2
if(x>=w)return H.a(z,x)
w=2*z[x]
if(w>=u)return H.a(y,w)
a[4]=y[w]
x=2*z[x]+1
if(x>=u)return H.a(y,x)
a[5]=y[x]}else{a[0]=0
a[1]=0
a[2]=1
a[3]=0
a[4]=1
a[5]=1}},
c6:[function(){var z,y,x,w,v,u,t
z=this.f
y=z.y
x=this.r
w=y.length
if(x>=w)return H.a(y,x)
v=y[x]
u=x+1
if(u>=w)return H.a(y,u)
u=y[u]
x+=2
if(x>=w)return H.a(y,x)
t=z.c0(v,u,y[x])
return 0.5*Math.sqrt(H.v(G.aF(t[1].l(0,t[0]),t[2].l(0,t[0])).a_()))},"$0","gbg",0,0,6],
h6:function(a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
z=this.f
y=z.Q
x=y==null
if(x&&z.ch==null){a4.L(a3)
return}w=[0]
v=[0]
u=Array(6)
u.fixed$length=Array
t=H.p(u,[P.a3])
this.h7(t)
u=J.h(t[2],t[0])
s=J.h(t[4],t[0])
r=J.h(t[3],t[1])
q=J.h(t[5],t[1])
p=a3.c
o=t[0]
if(typeof o!=="number")return H.b(o)
n=a3.d
m=t[1]
if(typeof m!=="number")return H.b(m)
if(!G.j7([u,s,r,q],[p-o,n-m],w,v)){v[0]=0.3333333333333333
w[0]=0.3333333333333333
l=0.3333333333333333}else{u=w[0]
if(typeof u!=="number")return H.b(u)
s=v[0]
if(typeof s!=="number")return H.b(s)
l=1-u-s}x=!x
if(x){u=z.y
s=this.r
r=u.length
if(s>=r)return H.a(u,s)
q=J.D(y)
s=J.d(q.h(y,u[s]),l)
p=this.r+1
if(p>=r)return H.a(u,p)
p=J.c(s,J.d(q.h(y,u[p]),w[0]))
s=this.r+2
if(s>=r)return H.a(u,s)
s=a2.aQ(J.c(p,J.d(q.h(y,u[s]),v[0])))
k=s.w(0,s.E(0))}else k=new G.a1(new Float32Array(H.n(J.N(a3.b))))
u=z.ch
if(u!=null){s=z.y
r=this.r
q=s.length
if(r>=q)return H.a(s,r)
p=J.D(u)
r=J.d(p.h(u,s[r]),l)
o=this.r+1
if(o>=q)return H.a(s,o)
o=J.c(r,J.d(p.h(u,s[o]),w[0]))
r=this.r+2
if(r>=q)return H.a(s,r)
r=a2.ag(J.c(o,J.d(p.h(u,s[r]),v[0])))
j=r.w(0,r.E(0))}else{u=a3.f
s=J.D(u)
j=s.w(u,s.E(u))}i=G.aF(j,k)
if(i.a_()>0){i=i.w(0,i.E(0))
j=G.aF(i,k)}else G.cS(k,j,i)
if(x){h=J.h(t[0],t[4])
g=J.h(t[2],t[4])
f=J.h(t[1],t[5])
e=J.h(t[3],t[5])
z=z.y
x=this.r
u=z.length
if(x>=u)return H.a(z,x)
s=J.D(y)
x=s.h(y,z[x])
r=this.r+2
if(r>=u)return H.a(z,r)
d=J.h(x,s.h(y,z[r]))
r=this.r+1
if(r>=u)return H.a(z,r)
r=s.h(y,z[r])
x=this.r+2
if(x>=u)return H.a(z,x)
c=J.h(r,s.h(y,z[x]))
b=J.h(J.d(h,e),J.d(f,g))
if(J.i(b,0)){a=new G.a1(new Float32Array(H.k(3)))
a.C(0,0,0)
a0=new G.a1(new Float32Array(H.k(3)))
a0.C(0,0,0)}else{if(typeof b!=="number")return H.b(b)
a1=1/b
z=J.w(d)
y=J.w(c)
a=J.d(J.h(z.i(d,e),y.i(c,f)),a1)
a0=J.d(J.c(z.i(d,J.M(g)),y.i(c,h)),a1)}}else{a=new G.a1(new Float32Array(H.k(3)))
a.C(0,0,0)
a0=new G.a1(new Float32Array(H.k(3)))
a0.C(0,0,0)}z=this.a
a4.bM(a3.a,j,i,z.aQ(a),z.aQ(a0),a3.c,a3.d,a3.e)
a4.ch=a3.ch
a4.cx=a3.cx
a4.cy=a3.cy
a4.db=a3.db
a4.z=a3.z
a4.Q=a3.Q},
c1:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o
z=[0]
y=[0]
x=Math.sqrt(H.v(a))
z[0]=1-x
y[0]=b*x
w=this.f
v=w.y
u=this.r
t=v.length
if(u>=t)return H.a(v,u)
s=v[u]
r=u+1
if(r>=t)return H.a(v,r)
r=v[r]
u+=2
if(u>=t)return H.a(v,u)
q=w.c0(s,r,v[u])
p=q[0].i(0,z[0]).j(0,q[1].i(0,y[0])).j(0,q[2].i(0,1-z[0]-y[0]))
o=G.aF(q[1].l(0,q[0]),q[2].l(0,q[0]))
c.L(o.w(0,o.E(0)))
if(this.c===!0){w=c.a
v=w.length
if(0>=v)return H.a(w,0)
w[0]=w[0]*-1
if(1>=v)return H.a(w,1)
w[1]=w[1]*-1
if(2>=v)return H.a(w,2)
w[2]=w[2]*-1}return p}},
jw:{
"^":"bz;f,r,x,y,z,aY:Q<,ch,cx,cy,a,b,c,d,e",
kZ:function(a){var z,y,x,w,v,u
z=a*3
y=this.z
x=y.length
if(z>=x)return H.a(y,z)
w=y[z]
v=z+1
if(v>=x)return H.a(y,v)
v=y[v]
u=z+2
if(u>=x)return H.a(y,u)
u=y[u]
y=new Float32Array(3)
if(0>=3)return H.a(y,0)
y[0]=w
if(1>=3)return H.a(y,1)
y[1]=v
if(2>=3)return H.a(y,2)
y[2]=u
return new G.j(y)},
c0:function(a,b,c){var z,y,x,w,v,u,t
z=a*3
y=this.f
x=y[0].a
w=this.z
v=w.length
if(z>=v)return H.a(w,z)
u=w[z]
t=x.length
if(0>=t)return H.a(x,0)
x[0]=u
u=z+1
if(u>=v)return H.a(w,u)
u=w[u]
if(1>=t)return H.a(x,1)
x[1]=u
u=z+2
if(u>=v)return H.a(w,u)
u=w[u]
if(2>=t)return H.a(x,2)
x[2]=u
z=b*3
u=y[1].a
if(z>=v)return H.a(w,z)
x=w[z]
t=u.length
if(0>=t)return H.a(u,0)
u[0]=x
x=z+1
if(x>=v)return H.a(w,x)
x=w[x]
if(1>=t)return H.a(u,1)
u[1]=x
x=z+2
if(x>=v)return H.a(w,x)
x=w[x]
if(2>=t)return H.a(u,2)
u[2]=x
z=c*3
x=y[2].a
if(z>=v)return H.a(w,z)
u=w[z]
t=x.length
if(0>=t)return H.a(x,0)
x[0]=u
u=z+1
if(u>=v)return H.a(w,u)
u=w[u]
if(1>=t)return H.a(x,1)
x[1]=u
u=z+2
if(u>=v)return H.a(w,u)
u=w[u]
if(2>=t)return H.a(x,2)
x[2]=u
return y},
bY:function(){var z,y,x,w,v
z=G.a9(null,null)
y=this.x
if(typeof y!=="number")return H.b(y)
x=this.b
w=0
for(;w<y;++w){v=x.a1(this.kZ(w))
z=new G.ax(new G.j(new Float32Array(H.n(z.a.a))),new G.j(new Float32Array(H.n(z.b.a)))).aR(v)}return z},
aA:function(){var z,y,x,w
z=G.a9(null,null)
y=this.x
if(typeof y!=="number")return H.b(y)
x=0
for(;x<y;++x){w=this.kZ(x)
z=new G.ax(new G.j(new Float32Array(H.n(z.a.a))),new G.j(new Float32Array(H.n(z.b.a)))).aR(w)}return z},
b_:function(){return!1},
cr:function(a){var z,y,x,w,v,u
for(z=this.r,y=this.a,x=this.b,w=0;w<z;++w){v=this.c
u=$.aP
$.aP=u+1
u=new M.uy(this,w,y,x,v,!1,u)
u.r=w*3
a.push(u)}},
mY:function(a,b,c,d,e,f,g,h,i,j,k){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.x
this.z=new Float32Array(H.k(J.d(z,3)))
if(typeof z!=="number")return H.b(z)
y=this.a
x=J.D(g)
w=0
v=0
for(;w<z;++w,v=s){u=y.a1(x.h(g,w))
t=this.z
s=v+1
r=u.a
q=r.length
if(0>=q)return H.a(r,0)
p=r[0]
o=t.length
if(v>=o)return H.a(t,v)
t[v]=p
v=s+1
if(1>=q)return H.a(r,1)
p=r[1]
if(s>=o)return H.a(t,s)
t[s]=p
s=v+1
if(2>=q)return H.a(r,2)
r=r[2]
if(v>=o)return H.a(t,v)
t[v]=r}},
static:{uz:function(a,b,c,d,e,f,g,h,i,j,k){var z,y,x,w
z=new G.j(new Float32Array(H.k(3)))
z.C(0,0,0)
y=new G.j(new Float32Array(H.k(3)))
y.C(0,0,0)
x=new G.j(new Float32Array(H.k(3)))
x.C(0,0,0)
w=$.aP
$.aP=w+1
w=new M.jw([z,y,x],d,e,f,null,h,i,j,k,a,b,c,!1,w)
w.mY(a,b,c,d,e,f,g,h,i,j,k)
return w},fN:[function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=d.kz("indices")
y=d.ig("P")
x=d.bA("uv")
if(x==null)x=d.bA("st")
if(z==null||y==null)return
z=new Uint32Array(H.n(z))
if(x!=null)x=new Float32Array(H.n(x))
w=d.bo("discarddegenerateUVs",!1)
if(x!=null){v=J.D(y)
u=v.gn(y)
t=J.D(x)
s=t.gn(x)
r=t.gn(x)
q=v.gn(y)
if(typeof q!=="number")return H.b(q)
if(r<2*q){if(typeof u!=="number")return H.b(u)
v="Not enough of 'uv's for triangle mesh. Expencted "+H.m(2*u)+", found "+H.m(s)+".  Discarding."
$.t.$2(1,v)
x=null}else{t=t.gn(x)
v=v.gn(y)
if(typeof v!=="number")return H.b(v)
if(t>2*v){if(typeof u!=="number")return H.b(u)
v="More 'uv's provided than will be used for triangle mesh.  ("+H.m(2*u)+" expcted, "+H.m(s)+" found)"
$.t.$2(1,v)}}}p=d.q9("S")
if(p!=null&&!J.i(J.a0(p),J.a0(y))){$.t.$2(1,"Number of 'S's for triangle mesh must match 'P's")
p=null}o=d.q8("N")
if(o!=null&&!J.i(J.a0(o),J.a0(y))){$.t.$2(1,"Number of 'N's for triangle mesh must match 'P's")
o=null}if(w===!0&&x!=null&&o!=null){n=J.a0(o)
if(typeof n!=="number")return H.b(n)
v=z.length
t=J.D(x)
r=J.D(y)
m=0
l=0
for(;l<n;l+=3,m+=3){if(m>=v)return H.a(z,m)
q=r.h(y,z[m])
k=m+1
if(k>=v)return H.a(z,k)
q=J.h(q,r.h(y,z[k]))
j=m+2
if(j>=v)return H.a(z,j)
q=G.aF(q,J.h(r.h(y,z[j]),r.h(y,z[k]))).a_()
if(0.5*Math.sqrt(q)<1e-7)continue
q=t.h(x,2*z[m])
i=t.h(x,2*z[k])
if(q==null?i==null:q===i){q=t.h(x,2*z[m]+1)
i=t.h(x,2*z[k]+1)
i=q==null?i==null:q===i
q=i}else q=!1
if(!q){q=t.h(x,2*z[k])
i=t.h(x,2*z[j])
if(q==null?i==null:q===i){q=t.h(x,2*z[k]+1)
k=t.h(x,2*z[j]+1)
k=q==null?k==null:q===k
q=k}else q=!1
if(!q){q=t.h(x,2*z[j])
k=t.h(x,2*z[m])
if(q==null?k==null:q===k){q=t.h(x,2*z[j]+1)
k=t.h(x,2*z[m]+1)
k=q==null?k==null:q===k
q=k}else q=!1}else q=!0}else q=!0
if(q){$.t.$2(1,"Degenerate uv coordinates in triangle mesh. Discarding all uvs.")
x=null
break}}}v=J.D(y)
u=v.gn(y)
for(n=z.length,l=0;l<n;++l){t=z[l]
if(typeof u!=="number")return H.b(u)
if(t>=u){v="TriangleMesh has out of-bounds vertex index "+t+" ("+H.m(u)+" 'P' values were given"
$.t.$2(1,v)
return}}h=d.dm("alpha")
if(!J.i(h,""))if(e.O(h)===!0)g=e.h(0,h)
else{t="Couldn't find float texture '"+H.m(h)+"' for 'alpha' parameter"
$.t.$2(1,t)
g=null}else g=J.i(d.m("alpha",1),0)?new G.cc(0):null
return M.uz(a,b,c,n/3|0,v.gn(y),z,y,o,p,x,g)},function(a,b,c,d){return M.fN(a,b,c,d,null)},"$5","$4","yC",8,2,109,0]}}}],["","",,U,{
"^":"",
n3:function(a,b,c,d,e,f,g,h,i){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=G.q(0)
if(a!=null&&e.cU(15)>0){y=new U.iQ(d,c,0)
a.bl(0,g.a.a,y,i)
x=y.c
w=G.eu(e.a.b,h)
if(e.cU(11)>0)for(v=d.length,u=0;u<x;++u){if(u>=v)return H.a(d,u)
t=d[u].a
s=g.a.a
if(0>=i.length)return H.a(i,0)
r=i[0]
s=s.l(0,J.b8(t)).a_()
if(typeof r!=="number")return H.b(r)
q=1-s/r
r=e.ay(h,t.gh2()).i(0,t.b)
if(0>=i.length)return H.a(i,0)
s=i[0]
if(typeof s!=="number")return H.b(s)
z=z.j(0,r.i(0,0.954929658551372*q*q/(b*s)))}else{p=G.q(0)
o=G.q(0)
for(v=d.length,u=0;u<x;++u){if(u>=v)return H.a(d,u)
s=J.F(G.J(w,d[u].a.gh2()),0)
r=i[0]
n=g.a
m=d[u]
l=i.length
if(s){s=m.a
n=n.a
if(0>=l)return H.a(i,0)
s=n.l(0,J.b8(s)).a_()
if(typeof r!=="number")return H.b(r)
q=1-s/r
r=J.hl(d[u].a)
if(0>=i.length)return H.a(i,0)
s=i[0]
if(typeof s!=="number")return H.b(s)
p=p.j(0,J.d(r,0.954929658551372*q*q/(b*s)))}else{s=m.a
n=n.a
if(0>=l)return H.a(i,0)
s=n.l(0,J.b8(s)).a_()
if(typeof r!=="number")return H.b(r)
q=1-s/r
r=J.hl(d[u].a)
if(0>=i.length)return H.a(i,0)
s=i[0]
if(typeof s!=="number")return H.b(s)
o=o.j(0,J.d(r,0.954929658551372*q*q/(b*s)))}}z=z.j(0,p.i(0,e.c_(h,f,29)).i(0,0.3183098861837907).j(0,o.i(0,e.c_(h,f,30)).i(0,0.3183098861837907)))}}return z},
dX:function(a,b,c,d,e,f,g){var z,y,x,w,v
if(a==null)return G.q(0)
z=new U.iQ(d,c,0)
if(0>=e.length)return H.a(e,0)
y=[e[0]]
a.bl(0,f,z,y)
if(z.c===0)return G.q(0)
x=G.q(0)
for(w=d.length,v=0;v<z.c;++v){if(v>=w)return H.a(d,v)
if(J.F(G.J(g,d[v].a.gh2()),0))x=x.j(0,J.hl(d[v].a))}if(0>=y.length)return H.a(y,0)
w=y[0]
if(typeof w!=="number")return H.b(w)
return x.w(0,b*w*3.141592653589793)},
hp:{
"^":"bU;br:a<,b,kN:c<",
ak:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=d.ba(c).a.a
y=G.eu(d.a.b,J.M(c.gbc()))
x=[f.e9(),f.a.aw(4294967295)]
w=[0,0]
for(v=a.a,u=this.b,t=this.c,s=0,r=0;q=this.a,r<q;++r){w[0]=G.bB(r,x[0])
q=G.c4(r,x[1])
w[1]=q
p=G.bv(w[0],q)
if(J.K(G.J(p,y),0)){q=p.a
o=q.length
if(0>=o)return H.a(q,0)
n=q[0]
if(1>=o)return H.a(q,1)
m=q[1]
if(2>=o)return H.a(q,2)
q=q[2]
o=new Float32Array(3)
p=new G.r(o)
if(0>=3)return H.a(o,0)
o[0]=-n
if(1>=3)return H.a(o,1)
o[1]=-m
if(2>=3)return H.a(o,2)
o[2]=-q}q=new G.j(new Float32Array(H.n(z.a)))
o=new G.r(new Float32Array(H.n(p.a)))
l=v.a5(new G.aK(q,o,u,t,0,0))
q=$.$get$az()
q.c=J.c(q.c,1)
$.az=q
if(!l)++s}return G.q(s/q)},
static:{zl:[function(a){var z,y,x
z=a.V("nsamples",2048)
y=a.m("maxdist",1/0)
x=new U.hp(null,a.m("mindist",0.0001),y)
x.a=G.aX(z)
return x},"$1","yG",2,0,110]}},
hD:{
"^":"bU;a,br:b<,c",
cc:function(a,b,c){var z,y,x
z=a.d
y=z.gbC().i(0,0.5).j(0,z.b.i(0,0.5))
x=P.b3(5489)
G.jd(y,0,b.gaZ(),a,!1,this.a,new G.b6(x),this.c)},
bs:function(a,b,c){},
ak:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=G.q(0)
y=J.M(c.gbc())
z=z.j(0,d.aS(y))
x=d.ba(c)
w=x.a
v=w.a
u=w.b
w=this.a
t=J.w(w)
s=J.d(t.j(w,1),t.j(w,1))
if(typeof s!=="number")return H.b(s)
r=H.p(Array(s),[G.ai])
for(q=r.length,p=0;p<q;++p)r[p]=G.q(0)
G.tK(v,G.eu(u,y),d.r,a,f,this.b,w,r)
o=x.c_(y,f,29).i(0,0.3183098861837907)
n=G.q(0)
m=J.d(t.j(w,1),t.j(w,1))
if(typeof m!=="number")return H.b(m)
w=this.c
t=w.length
p=0
for(;p<m;++p){if(p>=t)return H.a(w,p)
s=w[p]
if(p>=q)return H.a(r,p)
n=n.j(0,s.i(0,r[p]))}return z.j(0,o.i(0,n.cl(0)))},
m2:function(a,b){var z,y,x
for(z=this.c,y=z.length,x=0;x<y;++x)z[x]=G.q(0)},
static:{oI:function(a,b){var z,y
z=G.aX(b)
y=J.w(a)
y=J.d(y.j(a,1),y.j(a,1))
if(typeof y!=="number")return H.b(y)
y=new U.hD(a,z,H.p(Array(y),[G.ai]))
y.m2(a,b)
return y},zI:[function(a){return U.oI(a.V("lmax",4),a.V("nsamples",4096))},"$1","yH",2,0,111]}},
hE:{
"^":"bU;a,b,c,d,e,f,r,x,y",
ak:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=G.q(0)
y=J.M(c.gbc())
z=z.j(0,d.aS(y))
x=d.ba(c)
w=x.a
v=w.a
u=w.b
t=d.iD(c)
if(t!=null&&this.r!=null){s=t.b
r=t.c
if(!r.j(0,s).Y()){w=t.a
q=new U.vo(null,null,null,null,null,null)
p=(1+G.eh(w))/(1-G.eh(w))
q.f=p
o=s.j(0,r)
q.c=o
q.d=s.i(0,o).i(0,3).er()
q.e=r.w(0,o)
n=$.$get$cN()
o=n.w(0,o)
q.a=o
q.b=o.a2(0).i(0,1+1.3333333333333333*p)
m=this.r.iV(this.f,v,q,this.b)
l=n.l(0,new G.bO(1,w).J(G.aq(y,u)))
w=G.eh(w)
z=z.j(0,l.i(0,0.3183098861837907).i(0,J.d(m,1-w)))}}z=z.j(0,G.dE(a,b,v,u,y,d.r,c.e,x,e,f,this.x,this.y))
w=c.f
p=this.a
if(typeof p!=="number")return H.b(p)
return w<p?z.j(0,G.dC(c,x,f,d,b,a,e)).j(0,G.dD(c,x,f,d,b,a,e)):z},
bs:function(a,b,c){var z,y,x,w,v,u,t
z=c.b
y=z.length
this.x=H.p(Array(y),[G.ba])
this.y=H.p(Array(y),[G.b_])
for(x=a!=null,w=0;w<y;++w){if(w>=z.length)return H.a(z,w)
v=z[w].gbr()
if(x)v=a.bt(v)
u=this.x
t=new G.ba(v,null,null)
C.c.H(b.f,v)
t.b=b.f.length-1
C.c.H(b.r,v)
t.c=b.r.length-1
if(w>=u.length)return H.a(u,w)
u[w]=t
u=this.y
t=new G.b_(v,null,null)
C.c.H(b.f,v)
t.b=b.f.length-1
C.c.H(b.r,v)
t.c=b.r.length-1
if(w>=u.length)return H.a(u,w)
u[w]=t}},
cc:function(b1,b2,b3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0
z=b1.b
if(z.length===0)return
y=new P.bT(null,null)
H.bQ()
$.aL=$.bs
y.bP(0)
$.t.$2(0,"STARTING DipoleSubsurface Preprocessing. This may take a while.")
x=[]
if(J.bE(this.d)){w=this.d
v=$.au.h5(w)
if(v!=null){w=J.D(v)
if(J.bW(w.gn(v),8)!==0){u="Excess values ("+H.m(w.gn(v))+") in points file '"+H.m(this.d)+"'"
$.t.$2(2,u)}t=0
while(!0){u=w.gn(v)
if(typeof u!=="number")return H.b(u)
if(!(t<u))break
u=w.h(v,t)
s=w.h(v,t+1)
r=w.h(v,t+2)
q=new Float32Array(3)
if(0>=3)return H.a(q,0)
q[0]=u
if(1>=3)return H.a(q,1)
q[1]=s
if(2>=3)return H.a(q,2)
q[2]=r
r=w.h(v,t+3)
s=w.h(v,t+4)
u=w.h(v,t+5)
p=new Float32Array(3)
if(0>=3)return H.a(p,0)
p[0]=r
if(1>=3)return H.a(p,1)
p[1]=s
if(2>=3)return H.a(p,2)
p[2]=u
u=w.h(v,t+6)
s=w.h(v,t+7)
x.push(new G.fL(new G.j(new Float32Array(H.n(q))),new G.a1(new Float32Array(H.n(p))),u,s))
t+=8}}}if(x.length===0){o=b2.gfK().bI(b2.gaZ(),$.$get$ey())
w=b2.b
u=[]
new Y.mo(this.c,w,o,"",u).ea(b1)
C.c.sn(x,0)
C.c.dW(x,"insertAll")
P.m1(0,0,x.length,"index",null)
n=u.length
C.c.sn(x,x.length+n)
C.c.aH(x,n,x.length,x,0)
C.c.cC(x,0,n,u)}m=new G.b6(P.b3(5489))
l=[0,0]
for(w=this.e,u=b1.a,t=0;t<x.length;++t){k=x[t]
j=G.q(0)
for(s=J.C(k),i=0;i<z.length;++i){h=z[i]
g=G.q(0)
f=G.aX(h.gbr())
e=[m.a.aw(4294967295),m.a.aw(4294967295)]
d=m.a.aw(4294967295)
for(c=0;c<f;++c){l[0]=G.bB(c,e[0])
l[1]=G.c4(c,e[1])
b=G.bB(c,d)
r=l[0]
q=l[1]
p=new Float32Array(2)
if(0>=2)return H.a(p,0)
p[0]=r
if(1>=2)return H.a(p,1)
p[1]=q
r=new Float32Array(3)
a=new G.r(r)
if(0>=3)return H.a(r,0)
r[0]=0
if(1>=3)return H.a(r,1)
r[1]=0
if(2>=3)return H.a(r,2)
r[2]=0
a0=[0]
a1=new G.eO(null)
a2=h.bL(s.gau(k),k.gf8(),new G.c0(p,b),b2.gaZ(),a,a0,a1)
if(J.aG(G.J(a,k.gaY()),0))continue
if(a2.Y()||a0[0]===0)continue
r=a1.a
q=new Float32Array(3)
if(0>=3)return H.a(q,0)
q[0]=0
if(1>=3)return H.a(q,1)
q[1]=0
if(2>=3)return H.a(q,2)
q[2]=0
p=new Float32Array(3)
if(0>=3)return H.a(p,0)
p[0]=0
if(1>=3)return H.a(p,1)
p[1]=0
if(2>=3)return H.a(p,2)
p[2]=0
a3=new Float32Array(3)
if(0>=3)return H.a(a3,0)
a3[0]=0
if(1>=3)return H.a(a3,1)
a3[1]=0
if(2>=3)return H.a(a3,2)
a3[2]=0
a4=new Float32Array(3)
if(0>=3)return H.a(a4,0)
a4[0]=0
if(1>=3)return H.a(a4,1)
a4[1]=0
if(2>=3)return H.a(a4,2)
a4[2]=0
a5=new Float32Array(H.n(r.a.a))
a6=new Float32Array(H.n(J.N(r.b)))
a7=r.c
a8=r.d
a9=r.e
r=r.f
a5=new G.j(new Float32Array(H.n(a5)))
a6=new G.r(new Float32Array(H.n(a6)))
a2=a2.i(0,b3.bj(b1,new G.as(!1,new G.j(q),new G.j(p),new G.r(a3),new G.r(a4),a5,a6,a7,a8,a9,r),null,m))
b0=u.a5(a1.a)
r=$.$get$az()
r.c=J.c(r.c,1)
$.az=r
if(!b0)g=g.j(0,a2.i(0,G.aq(a,k.gaY())).w(0,a0[0]))}j=j.j(0,g.w(0,f))}w.push(new U.n0(s.gau(k),k.gaY(),j,k.gbg(),k.gf8()))}this.r=U.k3()
z=G.a9(null,null)
this.f=z
for(t=0;t<w.length;++t,z=u){u=w[t].a
u=new G.ax(new G.j(new Float32Array(H.n(z.a.a))),new G.j(new Float32Array(H.n(z.b.a)))).aR(u)
this.f=u}for(t=0;t<w.length;++t)this.r.bU(0,this.f,w[t])
this.r.kH()
z="FINISHED DipoleSubsurface Preprocessing: "+P.bN(0,0,J.ac(J.d(y.gbz(),1e6),$.aL),0,0,0).K(0)
$.t.$2(0,z)},
m3:function(a,b,c,d){var z,y
this.a=a
this.b=b
this.c=c
this.d=d
this.r=null
z=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
if(J.bE(this.d)){y=this.d
$.au.eb(y,!0,z.a).ai(new U.oK(this,z))}},
static:{oJ:function(a,b,c,d){var z=new U.hE(null,null,null,null,[],null,null,null,null)
z.m3(a,b,c,d)
return z},zJ:[function(a){var z,y,x,w
z=a.V("maxdepth",5)
y=a.m("maxerror",0.05)
x=a.m("minsampledistance",0.25)
w=a.bp("pointsfile","")
if(G.fE()===!0){y=J.d(y,4)
x=J.d(x,4)}return U.oJ(z,y,x,w)},"$1","yI",2,0,112]}},
oK:{
"^":"z:0;a,b",
$1:function(a){var z,y
z=H.c7(a,"$isE",[P.x],"$asE")
if(z){z=this.a
y=G.eA(a,z.d)
z=z.d
$.au.c.k(0,z,y)}this.b.aM(0)}},
wd:{
"^":"o;au:a>,b,cD:c<,lH:d<,aE:e>,f",
bU:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o
z=b.a.j(0,b.b).i(0,0.5)
if(this.b){for(y=this.f,x=0;x<8;++x)if(y[x]==null){y[x]=c
return}this.b=!1
w=H.p(Array(8),[U.n0])
for(y=this.f,v=this.e,x=0;x<8;++x){w[x]=y[x]
v[x]=null}for(y=z.a,u=y.length,x=0;x<8;++x){t=w[x]
s=J.C(t)
r=J.V(s.gau(t))
if(0>=u)return H.a(y,0)
r=r>y[0]?4:0
q=J.S(s.gau(t))
if(1>=u)return H.a(y,1)
q=q>y[1]?2:0
s=J.P(s.gau(t))
if(2>=u)return H.a(y,2)
s=s>y[2]?1:0
p=r+q+s
if(v[p]==null)v[p]=U.k3()
o=G.ev(p,b,z)
J.kr(v[p],o,t)}}y=J.C(c)
v=J.V(y.gau(c))
u=z.a
s=u.length
if(0>=s)return H.a(u,0)
v=v>u[0]?4:0
r=J.S(y.gau(c))
if(1>=s)return H.a(u,1)
r=r>u[1]?2:0
y=J.P(y.gau(c))
if(2>=s)return H.a(u,2)
y=y>u[2]?1:0
p=v+r+y
y=this.e
if(y[p]==null)y[p]=U.k3()
o=G.ev(p,b,z)
J.kr(y[p],o,c)},
kH:function(){var z,y,x,w,v,u
if(this.b){for(z=0,y=0;y<8;++y){x=this.f[y]
if(x==null)break
w=x.gcD().aC()
this.c=this.c.j(0,this.f[y].gcD())
this.a=this.a.j(0,J.d(J.b8(this.f[y]),w))
z+=w
x=this.d
v=this.f[y].gbg()
if(typeof v!=="number")return H.b(v)
this.d=x+v}if(z>0)this.a=this.a.w(0,z)
if(y!==0)this.c=this.c.w(0,y)}else{for(x=this.e,z=0,u=0,y=0;y<8;++y){v=x[y]
if(v==null)continue;++u
v.kH()
w=x[y].gcD().aC()
this.c=this.c.j(0,x[y].gcD())
this.a=this.a.j(0,J.d(J.b8(x[y]),w))
z+=w
this.d=this.d+x[y].glH()}if(z>0)this.a=this.a.w(0,z)
this.c=this.c.w(0,u)}},
iV:function(a,b,c,d){var z,y,x,w,v,u,t
z=this.d
y=this.a.l(0,b).a_()
if(typeof d!=="number")return H.b(d)
if(z/y<d&&!a.bV(b))return J.d(J.d(c.$1(this.a.l(0,b).a_()),this.c),this.d)
x=G.q(0)
if(this.b)for(w=0;w<8;++w){z=this.f[w]
if(z==null)break
x=x.j(0,J.d(J.d(c.$1(J.h(J.b8(z),b).a_()),this.f[w].gcD()),this.f[w].gbg()))}else{v=a.a.j(0,a.b).i(0,0.5)
for(z=this.e,u=0;u<8;++u){if(z[u]==null)continue
t=G.ev(u,a,v)
x=x.j(0,z[u].iV(t,b,c,d))}}return x},
nb:function(){var z,y
this.b=!0
this.d=0
z=this.e
this.f=z
for(y=0;y<8;++y)z[y]=null},
b9:function(a,b,c,d,e){return this.a.$4(b,c,d,e)},
static:{k3:function(){var z,y,x
z=new G.j(new Float32Array(H.k(3)))
z.C(0,0,0)
y=G.q(0)
x=Array(8)
x.fixed$length=Array
x=new U.wd(z,null,y,null,x,null)
x.nb()
return x}}},
vo:{
"^":"o:49;a,b,c,d,e,f",
$1:function(a){var z,y,x,w,v,u
z=G.q(a)
y=this.a
x=z.j(0,y.i(0,y)).er()
y=G.q(a)
z=this.b
w=y.j(0,z.i(0,z)).er()
z=this.e.w(0,12.566370614359172)
y=this.a
v=x.i(0,this.d)
u=$.$get$cN()
return z.i(0,y.i(0,v.j(0,u)).i(0,this.d.a2(0).i(0,x).dl()).w(0,x.i(0,x).i(0,x)).l(0,this.b.i(0,w.i(0,this.d).j(0,u)).i(0,this.d.a2(0).i(0,w).dl()).w(0,w.i(0,w).i(0,w)))).cl(0)}},
n0:{
"^":"o;au:a>,aY:b<,cD:c<,bg:d<,f8:e<",
b9:function(a,b,c,d,e){return this.a.$4(b,c,d,e)}},
hF:{
"^":"bU;a,b,c,d,e",
ak:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q
z=G.q(0)
y=d.ba(c)
x=J.M(c.gbc())
w=y.a
v=w.a
u=w.b
z=z.j(0,d.aS(x))
if(a.b.length>0)switch(this.a){case 0:z=z.j(0,G.dE(a,b,v,u,x,d.r,c.e,y,e,f,this.c,this.d))
break
case 1:w=d.r
t=c.e
s=this.e
r=this.c
if(0>=r.length)return H.a(r,0)
r=r[0]
q=this.d
if(0>=q.length)return H.a(q,0)
z=z.j(0,G.fi(a,b,v,u,x,w,t,y,e,f,s,r,q[0]))
break}w=c.f
t=this.b
if(typeof t!=="number")return H.b(t)
return w+1<t?z.j(0,G.dC(c,y,f,d,b,a,e)).j(0,G.dD(c,y,f,d,b,a,e)):z},
bs:function(a,b,c){var z,y,x,w,v,u,t
if(this.a===0){z=c.b
y=z.length
this.c=H.p(Array(y),[G.ba])
this.d=H.p(Array(y),[G.b_])
for(x=a!=null,w=0;w<y;++w){if(w>=z.length)return H.a(z,w)
v=z[w].gbr()
if(x)v=a.bt(v)
u=this.c
t=new G.ba(v,null,null)
C.c.H(b.f,v)
t.b=b.f.length-1
C.c.H(b.r,v)
t.c=b.r.length-1
if(w>=u.length)return H.a(u,w)
u[w]=t
u=this.d
t=new G.b_(v,null,null)
C.c.H(b.f,v)
t.b=b.f.length-1
C.c.H(b.r,v)
t.c=b.r.length-1
if(w>=u.length)return H.a(u,w)
u[w]=t}this.e=-1}else{z=H.p(Array(1),[G.ba])
this.c=z
x=G.qF(1,b)
if(0>=1)return H.a(z,0)
z[0]=x
C.c.H(b.f,1)
this.e=b.f.length-1
x=H.p(Array(1),[G.b_])
this.d=x
z=G.f3(1,b)
if(0>=1)return H.a(x,0)
x[0]=z}},
static:{zK:[function(a){var z,y,x,w
z=a.V("maxdepth",5)
y=a.aO("strategy","all")
x=J.O(y)
if(x.B(y,"one"))w=1
else{if(x.B(y,"all"));else{x="Strategy '"+H.m(y)+"' for direct lighting unknown. Using 'all'."
$.t.$2(1,x)}w=0}return new U.hF(w,z,null,null,null)},"$1","yJ",2,0,113]}},
hT:{
"^":"bU;a,b,c,d,br:e<,f,r",
cc:function(a,b,c){var z,y,x,w,v,u,t,s
z=new P.bT(null,null)
H.bQ()
$.aL=$.bs
z.bP(0)
$.t.$2(4,"STARTING GlossyPRT Preprocess")
y=a.d.gkm()
x=new G.b6(P.b3(5489))
w=this.d
v=J.w(w)
u=J.d(v.j(w,1),v.j(w,1))
if(typeof u!=="number")return H.b(u)
w=H.p(Array(u),[G.ai])
this.f=w
for(t=w.length,s=0;s<t;++s){w=this.f
v=G.q(0)
if(s>=w.length)return H.a(w,s)
w[s]=v}G.jd(y,0,b.gaZ(),a,!1,this.d,x,this.f)
w=H.p(Array(u*u),[G.ai])
this.r=w
G.tJ(this.a,this.b,this.c,x,1024,this.d,w)
w="FINISH GlossyPRT Preprocess: "+P.bN(0,0,J.ac(J.d(z.gbz(),1e6),$.aL),0,0,0).K(0)
$.t.$2(4,w)},
bs:function(a,b,c){},
ak:function(a8,a9,b0,b1,b2,b3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
z=G.q(0)
y=J.M(b0.gbc())
x=this.d
w=J.w(x)
v=J.d(w.j(x,1),w.j(x,1))
z=z.j(0,b1.aS(y))
u=b1.ba(b0)
t=u.a.a
if(typeof v!=="number")return H.b(v)
s=H.p(Array(v),[G.ai])
r=H.p(Array(v*v),[G.ai])
G.tL(t,b1.r,a8,b3,this.e,this.d,r)
G.mj(r,this.f,s,this.d)
q=u.f2(G.B(1,0,0))
p=u.f2(G.B(0,1,0))
x=new Float32Array(H.n(u.f2(G.B(0,0,1)).a))
w=q.a
o=w.length
if(0>=o)return H.a(w,0)
n=w[0]
m=p.a
l=m.length
if(0>=l)return H.a(m,0)
k=m[0]
j=x.length
if(0>=j)return H.a(x,0)
i=x[0]
if(1>=o)return H.a(w,1)
h=w[1]
if(1>=l)return H.a(m,1)
g=m[1]
if(1>=j)return H.a(x,1)
f=x[1]
if(2>=o)return H.a(w,2)
w=w[2]
if(2>=l)return H.a(m,2)
m=m[2]
if(2>=j)return H.a(x,2)
e=G.cg(n,k,i,0,h,g,f,0,w,m,x[2],0,0,0,0,1)
d=H.p(Array(v),[G.ai])
for(c=d.length,b=0;b<c;++b)d[b]=G.q(0)
x=this.d
a=[0]
a0=[0]
a1=[0]
w=e.a
o=w.length
if(9>=o)return H.a(w,9)
n=w[9]
m=w[8]
a2=Math.sqrt(H.v(n*n+m*m))
if(a2>0.00000190734864){n=w[6]
m=w[2]
a1[0]=-Math.atan2(H.v(n),H.v(-m))
if(10>=o)return H.a(w,10)
o=w[10]
a0[0]=-Math.atan2(H.v(a2),H.v(o))
o=w[9]
w=w[8]
a[0]=-Math.atan2(H.v(o),H.v(w))}else{a1[0]=0
if(10>=o)return H.a(w,10)
o=w[10]
a0[0]=-Math.atan2(H.v(a2),H.v(o))
o=w[4]
w=w[5]
a[0]=-Math.atan2(H.v(-o),H.v(w))}w=J.w(x)
a3=G.tA(J.d(w.j(x,1),w.j(x,1)))
G.je(s,d,a1[0],x)
G.mk(d,a3,x)
G.je(a3,d,a0[0],x)
G.tQ(d,a3,x)
G.je(a3,d,a[0],x)
a4=H.p(Array(v),[G.ai])
G.mj(this.r,d,a4,this.d)
a5=u.el(y)
x=H.k(v)
a6=new Float32Array(x)
G.bn(a5,this.d,a6,0)
a7=G.q(0)
for(w=a4.length,b=0;b<v;++b){if(b>=w)return H.a(a4,b)
o=a4[b]
if(b>=x)return H.a(a6,b)
a7=a7.j(0,o.i(0,a6[b]))}return z.j(0,a7.cl(0))},
static:{An:[function(a){var z,y
z=a.V("lmax",4)
y=a.V("nsamples",4096)
return new U.hT(a.a8("Kd",G.q(0.5)),a.a8("Ks",G.q(0.25)),a.m("roughness",0.1),z,G.aX(y),null,null)},"$1","yK",2,0,114]}},
i2:{
"^":"bU;a,b,c,d,e,f,r,x,y,z,Q",
ak:function(a6,a7,a8,a9,b0,b1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
z=G.q(0)
y=J.M(a8.gbc())
z=z.j(0,a9.aS(y))
x=a9.ba(a8)
w=x.a
v=w.a
u=w.b
z=z.j(0,G.dE(a6,a7,v,u,y,a9.r,a8.e,x,b0,b1,this.a,this.b))
w=J.aW(J.d(J.e(J.e(b0.gdq(),this.y),0),this.d))
t=this.d
if(typeof t!=="number")return t.l()
s=P.X(w,t-1)
w=a6.a
t=v.a
r=0
while(!0){q=this.Q
if(s>>>0!==s||s>=q.length)return H.a(q,s)
q=q[s]
if(!(r<q.length))break
c$0:{p=q[r]
o=p.a.l(0,v).a_()
q=p.a.l(0,v)
n=q.w(0,q.E(0))
q=J.d(G.aq(n,u),G.aq(n,p.b))
if(typeof q!=="number")return q.w()
m=P.X(q/o,this.e)
l=x.ay(y,n)
if(m===0||l.Y())break c$0
k=l.i(0,m).i(0,p.c).w(0,this.c)
q=a9.r
j=Math.sqrt(o)
i=p.d
h=new Float32Array(3)
if(0>=3)return H.a(h,0)
h[0]=0
if(1>=3)return H.a(h,1)
h[1]=0
if(2>=3)return H.a(h,2)
h[2]=0
g=new Float32Array(3)
if(0>=3)return H.a(g,0)
g[0]=0
if(1>=3)return H.a(g,1)
g[1]=0
if(2>=3)return H.a(g,2)
g[2]=0
f=new Float32Array(3)
if(0>=3)return H.a(f,0)
f[0]=0
if(1>=3)return H.a(f,1)
f[1]=0
if(2>=3)return H.a(f,2)
f[2]=0
e=new Float32Array(3)
if(0>=3)return H.a(e,0)
e[0]=0
if(1>=3)return H.a(e,1)
e[1]=0
if(2>=3)return H.a(e,2)
e[2]=0
d=new G.as(!1,new G.j(h),new G.j(g),new G.r(f),new G.r(e),new G.j(new Float32Array(H.n(t))),new G.r(new Float32Array(H.n(n.a))),q,j*(1-i),a8.e,a8.f+1)
k=k.i(0,a7.bj(a6,d,null,b1))
q=k.aC()
j=this.r
if(typeof j!=="number")return H.b(j)
if(q<j){if(b1.bZ()>0.1)break c$0
k=k.w(0,0.1)}c=w.a5(d)
q=$.$get$az()
q.c=J.c(q.c,1)
$.az=q
if(!c)z=z.j(0,k)}++r}w=a8.f
q=this.x
if(typeof q!=="number")return H.b(q)
if(w<q){b=w===0?this.f:1
a=[0]
if(typeof b!=="number")return H.b(b)
r=0
for(;r<b;++r){w=new Float32Array(3)
n=new G.r(w)
if(0>=3)return H.a(w,0)
w[0]=0
if(1>=3)return H.a(w,1)
w[1]=0
if(2>=3)return H.a(w,2)
w[2]=0
l=x.b3(y,n,a8.f===0?G.dx(b0,this.z,r):G.ca(b1),a,15)
if(!l.Y()){if(0>=a.length)return H.a(a,0)
q=J.F(a[0],0)}else q=!1
if(q){q=G.aq(n,u)
j=this.e
if(typeof q!=="number")return q.w()
if(typeof j!=="number")return H.b(j)
a0=Math.sqrt(q/j)
q=a9.r
j=new Float32Array(3)
if(0>=3)return H.a(j,0)
j[0]=0
if(1>=3)return H.a(j,1)
j[1]=0
if(2>=3)return H.a(j,2)
j[2]=0
i=new Float32Array(3)
if(0>=3)return H.a(i,0)
i[0]=0
if(1>=3)return H.a(i,1)
i[1]=0
if(2>=3)return H.a(i,2)
i[2]=0
h=new Float32Array(3)
if(0>=3)return H.a(h,0)
h[0]=0
if(1>=3)return H.a(h,1)
h[1]=0
if(2>=3)return H.a(h,2)
h[2]=0
g=new Float32Array(3)
if(0>=3)return H.a(g,0)
g[0]=0
if(1>=3)return H.a(g,1)
g[1]=0
if(2>=3)return H.a(g,2)
g[2]=0
f=new Float32Array(H.n(t))
e=new Float32Array(H.n(w))
a1=a8.e
a2=a8.f
a3=new G.b0(G.ag(),null,null,null,0,0,0)
a4=a7.hd(a6,new G.as(!1,new G.j(j),new G.j(i),new G.r(h),new G.r(g),new G.j(f),new G.r(e),q,a0,a1,a2+1),b0,b1,a3)
if(a4.Y())continue
q=G.aq(n,u)
j=w[0]
i=w[1]
w=w[2]
h=new Float32Array(3)
if(0>=3)return H.a(h,0)
h[0]=-j
if(1>=3)return H.a(h,1)
h[1]=-i
if(2>=3)return H.a(h,2)
h[2]=-w
h=J.d(q,G.aq(new G.r(h),a3.a.b))
q=a3.a.a.l(0,v).a_()
if(typeof h!=="number")return h.w()
a5=h/q
w=this.e
if(typeof w!=="number")return H.b(w)
if(a5-w>0&&isFinite(a5)){w=this.e
if(typeof w!=="number")return H.b(w)
q=l.i(0,a4)
w=J.d(G.aq(n,u),(a5-w)/a5)
if(0>=a.length)return H.a(a,0)
j=a[0]
if(typeof j!=="number")return H.b(j)
if(typeof w!=="number")return w.w()
z=z.j(0,q.i(0,w/(b*j)))}}}}w=a8.f
t=this.x
if(typeof t!=="number")return H.b(t)
if(w+1<t){G.B(0,0,0)
z=z.j(0,G.dC(a8,x,b1,a9,a7,a6,b0)).j(0,G.dD(a8,x,b1,a9,a7,a6,b0))}return z},
bs:function(a,b,c){var z,y,x,w,v,u,t
z=c.b
y=z.length
this.a=H.p(Array(y),[G.ba])
this.b=H.p(Array(y),[G.b_])
for(x=a!=null,w=0;w<y;++w){if(w>=z.length)return H.a(z,w)
v=z[w].gbr()
if(x)v=a.bt(v)
u=this.a
t=new G.ba(v,null,null)
C.c.H(b.f,v)
t.b=b.f.length-1
C.c.H(b.r,v)
t.c=b.r.length-1
if(w>=u.length)return H.a(u,w)
u[w]=t
u=this.b
t=new G.b_(v,null,null)
C.c.H(b.f,v)
t.b=b.f.length-1
C.c.H(b.r,v)
t.c=b.r.length-1
if(w>=u.length)return H.a(u,w)
u[w]=t}C.c.H(b.f,1)
this.y=b.f.length-1
if(x)this.f=a.bt(this.f)
this.z=G.f3(this.f,b)},
cc:function(b5,b6,b7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4
z=b5.b
if(z.length===0)return
y=new G.b6(P.b3(5489))
x=this.c
w=this.d
if(typeof w!=="number")return H.b(w)
w=H.k(x*w)
v=new Float32Array(w)
x=this.c
u=this.d
if(typeof u!=="number")return H.b(u)
u=H.k(2*x*u)
t=new Float32Array(u)
x=this.c
s=this.d
if(typeof s!=="number")return H.b(s)
s=H.k(x*s)
r=new Float32Array(s)
x=this.c
q=this.d
if(typeof q!=="number")return H.b(q)
q=H.k(2*x*q)
p=new Float32Array(q)
G.d8(this.c,this.d,v,y)
G.d9(this.c,this.d,t,y)
G.d8(this.c,this.d,r,y)
G.d9(this.c,this.d,p,y)
o=G.i7(b5)
n=[0]
m=[0]
x=b5.a
l=0
while(!0){k=this.d
if(typeof k!=="number")return H.b(k)
if(!(l<k))break
for(j=0;k=this.c,j<k;++j){i=l*k+j
if(i>=w)return H.a(v,i)
h=o.d2(v[i],n)
if(h>>>0!==h||h>=z.length)return H.a(z,h)
g=z[h]
k=new Float32Array(3)
if(0>=3)return H.a(k,0)
k[0]=0
if(1>=3)return H.a(k,1)
k[1]=0
if(2>=3)return H.a(k,2)
k[2]=0
f=new Float32Array(3)
if(0>=3)return H.a(f,0)
f[0]=0
if(1>=3)return H.a(f,1)
f[1]=0
if(2>=3)return H.a(f,2)
f[2]=0
e=new Float32Array(3)
if(0>=3)return H.a(e,0)
e[0]=0
if(1>=3)return H.a(e,1)
e[1]=0
if(2>=3)return H.a(e,2)
e[2]=0
d=new Float32Array(3)
if(0>=3)return H.a(d,0)
d[0]=0
if(1>=3)return H.a(d,1)
d[1]=0
if(2>=3)return H.a(d,2)
d[2]=0
c=new Float32Array(3)
b=new G.j(c)
if(0>=3)return H.a(c,0)
c[0]=0
if(1>=3)return H.a(c,1)
c[1]=0
if(2>=3)return H.a(c,2)
c[2]=0
c=b
b=new Float32Array(3)
a=new G.r(b)
if(0>=3)return H.a(b,0)
b[0]=0
if(1>=3)return H.a(b,1)
b[1]=0
if(2>=3)return H.a(b,2)
b[2]=0
b=a
a0=new G.as(!1,new G.j(k),new G.j(f),new G.r(e),new G.r(d),c,b,0,1/0,0,0)
b=2*i
if(b>=u)return H.a(t,b)
c=t[b]
d=b+1
if(d>=u)return H.a(t,d)
e=t[d]
if(i>=s)return H.a(r,i)
f=r[i]
k=new Float32Array(2)
if(0>=2)return H.a(k,0)
k[0]=c
if(1>=2)return H.a(k,1)
k[1]=e
e=new Float32Array(3)
a1=new G.a1(e)
if(0>=3)return H.a(e,0)
e[0]=0
if(1>=3)return H.a(e,1)
e[1]=0
if(2>=3)return H.a(e,2)
e[2]=0
if(b>=q)return H.a(p,b)
b=p[b]
if(d>=q)return H.a(p,d)
a2=g.cd(b5,new G.c0(k,f),b,p[d],b6.gaZ(),a0,a1,m)
if(0>=m.length)return H.a(m,0)
if(J.i(m[0],0)||a2.Y())continue
k=J.d(a2,G.aq(a1,a0.b))
if(0>=m.length)return H.a(m,0)
a2=J.G(k,J.d(m[0],n[0]))
a3=new G.b0(G.ag(),null,null,null,0,0,0)
while(!0){a4=x.ae(a0,a3)
k=$.$get$ay()
k.c=J.c(k.c,1)
$.ay=k
if(!(a4&&!a2.Y()))break
k=new Float32Array(3)
if(0>=3)return H.a(k,0)
k[0]=0
if(1>=3)return H.a(k,1)
k[1]=0
if(2>=3)return H.a(k,2)
k[2]=0
f=new Float32Array(3)
if(0>=3)return H.a(f,0)
f[0]=0
if(1>=3)return H.a(f,1)
f[1]=0
if(2>=3)return H.a(f,2)
f[2]=0
e=new Float32Array(3)
if(0>=3)return H.a(e,0)
e[0]=0
if(1>=3)return H.a(e,1)
e[1]=0
if(2>=3)return H.a(e,2)
e[2]=0
d=new Float32Array(3)
if(0>=3)return H.a(d,0)
d[0]=0
if(1>=3)return H.a(d,1)
d[1]=0
if(2>=3)return H.a(d,2)
d[2]=0
c=new Float32Array(H.n(a0.a.a))
b=new Float32Array(H.n(J.N(a0.b)))
a=a0.c
a5=a0.d
a6=a0.e
a7=a0.f
c=new G.j(new Float32Array(H.n(c)))
b=new G.r(new Float32Array(H.n(b)))
a2=J.d(a2,b7.bj(b5,new G.as(!1,new G.j(k),new G.j(f),new G.r(e),new G.r(d),c,b,a,a5,a6,a7),null,y))
a8=J.M(a0.b)
a9=a3.ba(a0)
a7=J.w(a2)
b0=J.G(a7.i(a2,a9.r3(a8,y)),3.141592653589793)
a6=this.Q
if(l>=a6.length)return H.a(a6,l)
a6=a6[l]
a5=a3.a
a6.push(new U.ne(a5.a,a5.b,b0,a3.r))
k=new Float32Array(3)
b1=new G.r(k)
if(0>=3)return H.a(k,0)
k[0]=0
if(1>=3)return H.a(k,1)
k[1]=0
if(2>=3)return H.a(k,2)
k[2]=0
b2=a9.lp(a8,b1,G.ca(y),m)
if(b2.Y()||!1)break
f=b2.i(0,G.aq(b1,a9.a.b))
if(0>=m.length)return H.a(m,0)
b3=f.w(0,m[0])
b4=P.X(1,b3.aC())
if(y.a.P()>b4)break
a2=a7.i(a2,b3.w(0,b4))
f=a3.a.a
e=a3.r
d=new Float32Array(3)
if(0>=3)return H.a(d,0)
d[0]=0
if(1>=3)return H.a(d,1)
d[1]=0
if(2>=3)return H.a(d,2)
d[2]=0
c=new Float32Array(3)
if(0>=3)return H.a(c,0)
c[0]=0
if(1>=3)return H.a(c,1)
c[1]=0
if(2>=3)return H.a(c,2)
c[2]=0
b=new Float32Array(3)
if(0>=3)return H.a(b,0)
b[0]=0
if(1>=3)return H.a(b,1)
b[1]=0
if(2>=3)return H.a(b,2)
b[2]=0
a=new Float32Array(3)
if(0>=3)return H.a(a,0)
a[0]=0
if(1>=3)return H.a(a,1)
a[1]=0
if(2>=3)return H.a(a,2)
a[2]=0
a0=new G.as(!1,new G.j(d),new G.j(c),new G.r(b),new G.r(a),new G.j(new Float32Array(H.n(f.a))),new G.r(new Float32Array(H.n(k))),e,1/0,a0.e,a0.f+1)}}++l}},
mi:function(a,b,c,d,e,f){var z,y,x
this.c=G.aX(a)
z=G.aX(b)
this.d=z
this.r=c
this.x=d
this.Q=Array(z)
this.e=e
this.f=f
y=0
while(!0){z=this.d
if(typeof z!=="number")return H.b(z)
if(!(y<z))break
z=this.Q
x=[]
x.$builtinTypeInfo=[U.ne]
if(y>=z.length)return H.a(z,y)
z[y]=x;++y}},
static:{pN:function(a,b,c,d,e,f){var z=new U.i2(null,null,null,null,null,null,null,null,null,null,null)
z.mi(a,b,c,d,e,f)
return z},Aw:[function(a){return U.pN(a.V("nlights",64),a.V("nsets",4),a.m("rrthreshold",0.0001),a.V("maxdepth",5),a.m("glimit",10),a.V("gathersamples",16))},"$1","yL",2,0,115]}},
ne:{
"^":"o;au:a>,aY:b<,c,f8:d<",
b9:function(a,b,c,d,e){return this.a.$4(b,c,d,e)}},
i8:{
"^":"bU;a,b,c,d,br:e<,f,r,x,y,z",
ak:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r
z=G.q(0)
y=d.ba(c)
x=J.M(c.gbc())
w=y.a
v=w.a
u=w.b
z=z.j(0,d.aS(x)).j(0,G.dE(a,b,v,u,x,d.r,c.e,y,e,f,this.x,this.y))
w=c.f
t=this.f
if(typeof t!=="number")return H.b(t)
if(w+1<t)z=z.j(0,G.dC(c,y,f,d,b,a,e)).j(0,G.dD(c,y,f,d,b,a,e))
s=G.eu(d.a.b,x)
w=d.a
r=Math.sqrt(H.v(Math.sqrt(H.v(G.aF(w.z,w.Q).a_()))))
return z.j(0,this.kG(v,s,r,x,d.r,y,13,f,a,b)).j(0,this.kG(v,J.M(s),r,x,d.r,y,14,f,a,b))},
bs:function(a,b,c){var z,y,x,w,v,u,t
z=c.b
y=z.length
this.x=H.p(Array(y),[G.ba])
this.y=H.p(Array(y),[G.b_])
for(x=a!=null,w=0;w<y;++w){if(w>=z.length)return H.a(z,w)
v=z[w].gbr()
if(x)v=a.bt(v)
u=this.x
t=new G.ba(v,null,null)
C.c.H(b.f,v)
t.b=b.f.length-1
C.c.H(b.r,v)
t.c=b.r.length-1
if(w>=u.length)return H.a(u,w)
u[w]=t
u=this.y
t=new G.b_(v,null,null)
C.c.H(b.f,v)
t.b=b.f.length-1
C.c.H(b.r,v)
t.c=b.r.length-1
if(w>=u.length)return H.a(u,w)
u[w]=t}},
cc:function(a,b,c){var z,y,x,w
z=G.bK(a.d)
y=z.b.l(0,z.a).i(0,0.01)
z.a=z.a.l(0,y)
z.b=z.b.j(0,y)
this.z=new G.lI(16,G.bK(z),G.n6())
this.c=J.d(this.c,1.5)
x=[0,0,0,0]
b.gb0().iF(x)
w=U.la(x[0],x[1],x[2],x[3],b.gaZ(),b.c,1)
new U.q5(a,b,c,w,G.fH(w,this,null,a),this).aU()
this.c=J.G(this.c,1.5)},
kG:function(a,b,c,d,e,f,g,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
if(f.cU(g)===0)return G.q(0)
z=G.q(0)
y=G.B(0,0,0)
if(!this.qt(a1,a,b,z,y)){x=[a0.e9(),a0.a.aw(4294967295)]
w=G.B(0,0,0)
v=G.q(0)
u=[0,0]
t=1/0
s=0
while(!0){r=this.e
if(typeof r!=="number")return H.b(r)
if(!(s<r))break
u[0]=G.bB(s,x[0])
r=G.c4(s,x[1])
u[1]=r
r=f.f2(G.hz(u[0],r))
q=new Float32Array(3)
if(0>=3)return H.a(q,0)
q[0]=0
if(1>=3)return H.a(q,1)
q[1]=0
if(2>=3)return H.a(q,2)
q[2]=0
p=new Float32Array(3)
if(0>=3)return H.a(p,0)
p[0]=0
if(1>=3)return H.a(p,1)
p[1]=0
if(2>=3)return H.a(p,2)
p[2]=0
o=new Float32Array(3)
if(0>=3)return H.a(o,0)
o[0]=0
if(1>=3)return H.a(o,1)
o[1]=0
if(2>=3)return H.a(o,2)
o[2]=0
n=new Float32Array(3)
if(0>=3)return H.a(n,0)
n[0]=0
if(1>=3)return H.a(n,1)
n[1]=0
if(2>=3)return H.a(n,2)
n[2]=0
m=new G.j(new Float32Array(H.n(a.a)))
r=new G.r(new Float32Array(H.n(r.a)))
l=new G.as(!1,new G.j(q),new G.j(p),new G.r(o),new G.r(n),m,r,e,1/0,0,0)
l.b=G.fZ(r,b)
k=this.qJ(l,a1,a2,a0)
v=v.j(0,k)
w=w.j(0,J.d(l.b,k.aC()))
t=P.X(t,l.d);++s}z=v.i(0,3.141592653589793/r)
j=J.d(this.b,c)
i=C.d.v(t/2,J.d(this.a,c),j)
h=G.a9(a,null)
h.i4(0,i)
this.z.pr(0,new U.i9(z,b,a,w,i),h)
y=w}if(y.a_()===0)return G.q(0)
return f.i5(d,y.w(0,y.E(0)),g).i(0,z)},
qt:function(a,b,c,d,e){var z,y,x
if(this.z==null)return!1
z=new U.q4(b,c,this.c,this.d,null,null,null,null)
z.f=0
z.e=0
z.r=G.q(0)
z.x=G.B(0,0,0)
this.z.e5(b,z)
y=z.e
x=z.c
if(typeof x!=="number")return H.b(x)
x=y>=x
if(x);if(!x)return!1
d.L(z.r.w(0,y))
e.L(z.x)
return!0},
qJ:function(a2,a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
z=G.q(0)
y=G.q(1)
x=new Float32Array(3)
if(0>=3)return H.a(x,0)
x[0]=0
if(1>=3)return H.a(x,1)
x[1]=0
if(2>=3)return H.a(x,2)
x[2]=0
w=new Float32Array(3)
if(0>=3)return H.a(w,0)
w[0]=0
if(1>=3)return H.a(w,1)
w[1]=0
if(2>=3)return H.a(w,2)
w[2]=0
v=new Float32Array(3)
if(0>=3)return H.a(v,0)
v[0]=0
if(1>=3)return H.a(v,1)
v[1]=0
if(2>=3)return H.a(v,2)
v[2]=0
u=new Float32Array(3)
if(0>=3)return H.a(u,0)
u[0]=0
if(1>=3)return H.a(u,1)
u[1]=0
if(2>=3)return H.a(u,2)
u[2]=0
t=new Float32Array(H.n(a2.a.a))
s=new Float32Array(H.n(J.N(a2.b)))
r=a2.c
q=a2.d
p=a2.e
o=a2.f
t=new G.j(new Float32Array(H.n(t)))
s=new G.r(new Float32Array(H.n(s)))
n=new G.as(!1,new G.j(x),new G.j(w),new G.r(v),new G.r(u),t,s,r,q,p,o)
for(x=this.r,w=a3.a,m=!1,l=0;!0;l=d){k=new G.b0(G.ag(),null,null,null,0,0,0)
j=w.ae(n,k)
v=$.$get$ay()
v.c=J.c(v.c,1)
$.ay=v
if(!j)break
if(l===0)a2.d=n.d
y=y.i(0,a4.bj(a3,n,null,a5))
if(m){v=J.M(n.b)
i=k.b.d
if(i!=null){u=k.a
v=i.d6(u.a,u.b,v)}else v=G.q(0)
z=z.j(0,y.i(0,v))}h=k.ba(n)
v=h.a
g=v.a
f=v.b
e=J.M(n.b)
z=z.j(0,y.i(0,G.fi(a3,a4,g,f,e,k.r,n.e,h,null,a5,-1,null,null)))
d=l+1
if(d===x)break
v=new Float32Array(3)
c=new G.r(v)
if(0>=3)return H.a(v,0)
v[0]=0
if(1>=3)return H.a(v,1)
v[1]=0
if(2>=3)return H.a(v,2)
v[2]=0
b=[0]
a=[0]
a0=h.d3(e,c,G.ca(a5),b,31,a)
if(!a0.Y()){if(0>=b.length)return H.a(b,0)
u=J.i(b[0],0)}else u=!0
if(u)break
u=a[0]
if(typeof u!=="number")return u.T()
m=(u&16)!==0
u=a0.i(0,G.aq(c,f))
if(0>=b.length)return H.a(b,0)
y=y.i(0,u.w(0,b[0]))
u=k.r
t=new Float32Array(3)
if(0>=3)return H.a(t,0)
t[0]=0
if(1>=3)return H.a(t,1)
t[1]=0
if(2>=3)return H.a(t,2)
t[2]=0
s=new Float32Array(3)
if(0>=3)return H.a(s,0)
s[0]=0
if(1>=3)return H.a(s,1)
s[1]=0
if(2>=3)return H.a(s,2)
s[2]=0
r=new Float32Array(3)
if(0>=3)return H.a(r,0)
r[0]=0
if(1>=3)return H.a(r,1)
r[1]=0
if(2>=3)return H.a(r,2)
r[2]=0
q=new Float32Array(3)
if(0>=3)return H.a(q,0)
q[0]=0
if(1>=3)return H.a(q,1)
q[1]=0
if(2>=3)return H.a(q,2)
q[2]=0
n=new G.as(!1,new G.j(t),new G.j(s),new G.r(r),new G.r(q),new G.j(new Float32Array(H.n(g.a))),new G.r(new Float32Array(H.n(v))),u,1/0,n.e,n.f+1)
if(l>2){a1=P.X(1,y.aC())
if(a5.a.P()>a1)break
y=y.w(0,a1)}}return z},
static:{AD:[function(a){var z,y,x,w,v,u,t
z=a.m("minweight",0.5)
y=a.m("minpixelspacing",2.5)
x=a.m("maxpixelspacing",15)
w=a.m("maxangledifference",10)
v=a.V("maxspeculardepth",5)
u=a.V("maxindirectdepth",3)
t=new U.i8(y,x,z,null,a.V("nsamples",4096),v,u,null,null,null)
if(typeof w!=="number")return H.b(w)
t.d=Math.cos(H.v(57.29577951308232*w))
return t},"$1","yM",2,0,116]}},
i9:{
"^":"o;cD:a<,aY:b<,au:c>,d,kN:e<",
b9:function(a,b,c,d,e){return this.c.$4(b,c,d,e)}},
q5:{
"^":"o;a,b,c,d,e,f",
aU:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=new G.b6(P.b3(29))
y=this.e.kv(1)
for(x=this.d,w=this.a,v=w.a,u=this.b,t=y.length,s=this.f,r=this.c;q=x.bv(y,z),J.F(q,0);){if(typeof q!=="number")return H.b(q)
p=0
for(;p<q;++p){o=new Float32Array(3)
if(0>=3)return H.a(o,0)
o[0]=0
if(1>=3)return H.a(o,1)
o[1]=0
if(2>=3)return H.a(o,2)
o[2]=0
n=new Float32Array(3)
if(0>=3)return H.a(n,0)
n[0]=0
if(1>=3)return H.a(n,1)
n[1]=0
if(2>=3)return H.a(n,2)
n[2]=0
m=new Float32Array(3)
if(0>=3)return H.a(m,0)
m[0]=0
if(1>=3)return H.a(m,1)
m[1]=0
if(2>=3)return H.a(m,2)
m[2]=0
l=new Float32Array(3)
if(0>=3)return H.a(l,0)
l[0]=0
if(1>=3)return H.a(l,1)
l[1]=0
if(2>=3)return H.a(l,2)
l[2]=0
k=new Float32Array(3)
j=new G.j(k)
if(0>=3)return H.a(k,0)
k[0]=0
if(1>=3)return H.a(k,1)
k[1]=0
if(2>=3)return H.a(k,2)
k[2]=0
k=j
j=new Float32Array(3)
i=new G.r(j)
if(0>=3)return H.a(j,0)
j[0]=0
if(1>=3)return H.a(j,1)
j[1]=0
if(2>=3)return H.a(j,2)
j[2]=0
j=i
h=new G.as(!1,new G.j(o),new G.j(n),new G.r(m),new G.r(l),k,j,0,1/0,0,0)
if(p>=t)return H.a(y,p)
u.en(y[p],h)
g=new G.b0(G.ag(),null,null,null,0,0,0)
f=v.ae(h,g)
o=$.$get$ay()
o.c=J.c(o.c,1)
$.ay=o
if(f)s.ak(w,r,h,g,y[p],z)}}}},
q4:{
"^":"o:50;au:a>,aY:b<,c,d,e,f,cD:r<,x",
$1:function(a){var z,y,x,w,v
z=this.a
z=Math.sqrt(H.v(J.h(J.b8(a),z).a_()))
y=a.gkN()
if(typeof y!=="number")return H.b(y)
x=G.J(this.b,a.gaY())
if(typeof x!=="number")return H.b(x)
w=P.I(z/y,Math.sqrt(H.v((1-x)/(1-this.d))))
if(w<1){++this.f
v=1-w
this.r=this.r.j(0,a.a.i(0,v))
this.x=this.x.j(0,a.d.i(0,v))
this.e+=v}return!0},
b9:function(a,b,c,d,e){return this.a.$4(b,c,d,e)}},
iM:{
"^":"bU;a,b,c,d,e",
ak:function(a0,a1,a2,a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=G.q(1)
y=G.q(0)
x=G.m2(a2)
w=G.em()
v=G.B(0,0,0)
u=[0]
t=[0]
for(s=a0.a,r=v.a,q=this.e,p=a3,o=!1,n=0;!0;++n,p=w){if(n===0||o)y=y.j(0,z.i(0,p.aS(J.M(x.b))))
m=p.ba(x)
l=m.a
k=l.a
j=l.b
i=J.M(x.b)
l=n<3
h=x.e
g=p.r
y=l?y.j(0,z.i(0,G.fi(a0,a1,k,j,i,g,h,m,a4,a5,this.c[n],this.b[n],this.d[n]))):y.j(0,z.i(0,G.fi(a0,a1,k,j,i,g,h,m,a4,a5,-1,null,null)))
f=m.d3(i,v,l?G.dx(a4,q[n],0):G.ca(a5),u,31,t)
if(!f.Y()){if(0>=u.length)return H.a(u,0)
l=J.i(u[0],0)}else l=!0
if(l)break
l=t[0]
if(typeof l!=="number")return l.T()
o=(l&16)!==0
l=f.i(0,G.aq(v,j))
if(0>=u.length)return H.a(u,0)
z=z.i(0,l.w(0,u[0]))
l=p.r
h=new Float32Array(3)
if(0>=3)return H.a(h,0)
h[0]=0
if(1>=3)return H.a(h,1)
h[1]=0
if(2>=3)return H.a(h,2)
h[2]=0
g=new Float32Array(3)
if(0>=3)return H.a(g,0)
g[0]=0
if(1>=3)return H.a(g,1)
g[1]=0
if(2>=3)return H.a(g,2)
g[2]=0
e=new Float32Array(3)
if(0>=3)return H.a(e,0)
e[0]=0
if(1>=3)return H.a(e,1)
e[1]=0
if(2>=3)return H.a(e,2)
e[2]=0
d=new Float32Array(3)
if(0>=3)return H.a(d,0)
d[0]=0
if(1>=3)return H.a(d,1)
d[1]=0
if(2>=3)return H.a(d,2)
d[2]=0
x=new G.as(!1,new G.j(h),new G.j(g),new G.r(e),new G.r(d),new G.j(new Float32Array(H.n(k.a))),new G.r(new Float32Array(H.n(r))),l,1/0,x.e,x.f+1)
if(n>3){c=P.X(0.5,z.aC())
if(a5.bZ()>c)break
z=z.w(0,c)}if(n===this.a)break
b=s.ae(x,w)
l=$.$get$ay()
l.c=J.c(l.c,1)
$.ay=l
if(!b){if(o)for(s=a0.b,a=0;a<s.length;++a)y=y.j(0,z.i(0,s[a].aS(x)))
break}z=z.i(0,a1.bj(a0,x,null,a5))}return y},
bs:function(a,b,c){var z,y,x,w,v
for(z=this.e,y=0;y<3;++y){x=this.b
w=new G.ba(1,null,null)
C.c.H(b.f,1)
w.b=b.f.length-1
C.c.H(b.r,1)
w.c=b.r.length-1
x[y]=w
x=this.c
C.c.H(b.f,1)
w=b.f
x[y]=w.length-1
x=this.d
v=new G.b_(1,null,null)
C.c.H(w,1)
v.b=b.f.length-1
C.c.H(b.r,1)
v.c=b.r.length-1
x[y]=v
x=new G.b_(1,null,null)
C.c.H(b.f,1)
x.b=b.f.length-1
C.c.H(b.r,1)
x.c=b.r.length-1
z[y]=x}},
static:{Bn:[function(a){return new U.iM(a.V("maxdepth",5),H.p(Array(3),[G.ba]),H.p(Array(3),[P.x]),H.p(Array(3),[G.b_]),H.p(Array(3),[G.b_]))},"$1","yN",2,0,117]}},
iP:{
"^":"bU;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr",
ak:function(b3,b4,b5,b6,b7,b8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2
z=G.q(0)
y=J.M(b5.gbc())
z=z.j(0,b6.aS(y))
x=b6.ba(b5)
w=x.a
v=w.a
u=w.b
z=z.j(0,G.dE(b3,b4,v,u,y,b6.r,b5.e,x,b7,b8,this.z,this.Q))
w=this.c
if(typeof w!=="number")return H.b(w)
t=H.p(Array(w),[U.eb])
s=this.d
z=z.j(0,U.n3(this.dx,this.cy,w,t,x,b8,b6,y,s))
if(this.r===!0&&this.dy!=null){if(x.cU(15)>0){r=new U.iQ(H.p(Array(50),[U.eb]),50,0)
if(0>=s.length)return H.a(s,0)
q=s[0]
for(;r.c<50;){r.c=0
this.dy.bl(0,v,r,[q])
q=J.d(q,2)}p=H.p(Array(50),[G.r])
for(w=r.a,s=w.length,o=p.length,n=0;n<50;++n){if(n>=s)return H.a(w,n)
m=w[n].a.gh2()
if(n>=o)return H.a(p,n)
p[n]=m}l=G.q(0)
w=b3.a
s=v.a
m=this.y
k=0.999*m
j=1/(6.283185307179586*(1-m))
n=0
while(!0){i=this.x
if(typeof i!=="number")return H.b(i)
if(!(n<i))break
c$0:{i=new Float32Array(3)
h=new G.r(i)
if(0>=3)return H.a(i,0)
i[0]=0
if(1>=3)return H.a(i,1)
i[1]=0
if(2>=3)return H.a(i,2)
i[2]=0
g=[0]
f=x.b3(y,h,G.dx(b7,this.ch,n),g,15)
if(!f.Y()){if(0>=g.length)return H.a(g,0)
e=J.i(g[0],0)}else e=!0
if(e)break c$0
e=b6.r
d=new Float32Array(3)
if(0>=3)return H.a(d,0)
d[0]=0
if(1>=3)return H.a(d,1)
d[1]=0
if(2>=3)return H.a(d,2)
d[2]=0
c=new Float32Array(3)
if(0>=3)return H.a(c,0)
c[0]=0
if(1>=3)return H.a(c,1)
c[1]=0
if(2>=3)return H.a(c,2)
c[2]=0
b=new Float32Array(3)
if(0>=3)return H.a(b,0)
b[0]=0
if(1>=3)return H.a(b,1)
b[1]=0
if(2>=3)return H.a(b,2)
b[2]=0
a=new Float32Array(3)
if(0>=3)return H.a(a,0)
a[0]=0
if(1>=3)return H.a(a,1)
a[1]=0
if(2>=3)return H.a(a,2)
a[2]=0
a0=new G.as(!1,new G.j(d),new G.j(c),new G.r(b),new G.r(a),new G.j(new Float32Array(H.n(s))),new G.r(new Float32Array(H.n(i))),e,1/0,b5.e,b5.f+1)
a1=new G.b0(G.ag(),null,null,null,0,0,0)
a2=w.ae(a0,a1)
i=$.$get$ay()
i.c=J.c(i.c,1)
$.ay=i
if(a2){a3=G.q(0)
a4=a1.a.b
if(J.K(G.J(a4,J.M(a0.b)),0)){i=J.C(a4)
e=J.M(i.gG(a4))
d=J.M(i.gF(a4))
i=J.M(i.gS(a4))
c=new Float32Array(3)
a4=new G.a1(c)
if(0>=3)return H.a(c,0)
c[0]=e
if(1>=3)return H.a(c,1)
c[1]=d
if(2>=3)return H.a(c,2)
c[2]=i}r=new U.m_(a4,null)
this.fr.bl(0,a1.a.a,r,[1/0])
i=r.b
if(i!=null)a3=i.gfn()
a3=a3.i(0,b4.bj(b3,a0,null,b8))
for(a5=0,a6=0;a6<50;++a6){if(a6>=o)return H.a(p,a6)
if(J.F(G.J(p[a6],h),k))a5+=j}i=this.x
if(0>=g.length)return H.a(g,0)
a7=G.fx(i,g[0],i,a5/50)
i=f.i(0,a3)
e=J.d(G.aq(h,u),a7)
if(0>=g.length)return H.a(g,0)
d=g[0]
if(typeof e!=="number")return e.w()
if(typeof d!=="number")return H.b(d)
l=l.j(0,i.i(0,e/d))}}++n}z=z.j(0,l.w(0,i))
l=G.q(0)
n=0
while(!0){i=this.x
if(typeof i!=="number")return H.b(i)
if(!(n<i))break
c$0:{a8=G.dx(b7,this.cx,n)
a9=P.X(49,J.a_(J.d(a8.b,50)))
i=new Float32Array(3)
b0=new G.r(i)
if(0>=3)return H.a(i,0)
i[0]=0
if(1>=3)return H.a(i,1)
i[1]=0
if(2>=3)return H.a(i,2)
i[2]=0
i=new Float32Array(3)
b1=new G.r(i)
if(0>=3)return H.a(i,0)
i[0]=0
if(1>=3)return H.a(i,1)
i[1]=0
if(2>=3)return H.a(i,2)
i[2]=0
if(a9>>>0!==a9||a9>=o)return H.a(p,a9)
G.cS(p[a9],b0,b1)
i=a8.a
e=i.length
if(0>=e)return H.a(i,0)
d=i[0]
if(1>=e)return H.a(i,1)
h=G.mJ(d,i[1],m,b0,b1,p[a9])
f=x.ay(y,h)
if(f.Y())break c$0
i=b6.r
e=new Float32Array(3)
if(0>=3)return H.a(e,0)
e[0]=0
if(1>=3)return H.a(e,1)
e[1]=0
if(2>=3)return H.a(e,2)
e[2]=0
d=new Float32Array(3)
if(0>=3)return H.a(d,0)
d[0]=0
if(1>=3)return H.a(d,1)
d[1]=0
if(2>=3)return H.a(d,2)
d[2]=0
c=new Float32Array(3)
if(0>=3)return H.a(c,0)
c[0]=0
if(1>=3)return H.a(c,1)
c[1]=0
if(2>=3)return H.a(c,2)
c[2]=0
b=new Float32Array(3)
if(0>=3)return H.a(b,0)
b[0]=0
if(1>=3)return H.a(b,1)
b[1]=0
if(2>=3)return H.a(b,2)
b[2]=0
a0=new G.as(!1,new G.j(e),new G.j(d),new G.r(c),new G.r(b),new G.j(new Float32Array(H.n(s))),new G.r(new Float32Array(H.n(h.a))),i,1/0,b5.e,b5.f+1)
a1=new G.b0(G.ag(),null,null,null,0,0,0)
a2=w.ae(a0,a1)
i=$.$get$ay()
i.c=J.c(i.c,1)
$.ay=i
if(a2){a3=G.q(0)
a4=a1.a.b
if(J.K(G.J(a4,J.M(a0.b)),0)){i=J.C(a4)
e=J.M(i.gG(a4))
d=J.M(i.gF(a4))
i=J.M(i.gS(a4))
c=new Float32Array(3)
a4=new G.a1(c)
if(0>=3)return H.a(c,0)
c[0]=e
if(1>=3)return H.a(c,1)
c[1]=d
if(2>=3)return H.a(c,2)
c[2]=i}r=new U.m_(a4,null)
this.fr.bl(0,a1.a.a,r,[1/0])
i=r.b
if(i!=null)a3=i.gfn()
a3=a3.i(0,b4.bj(b3,a0,null,b8))
for(a5=0,a6=0;a6<50;++a6){if(a6>=o)return H.a(p,a6)
if(J.F(G.J(p[a6],h),k))a5+=j}a5/=50
b2=x.ao(y,h)
i=this.x
a7=G.fx(i,a5,i,b2)
l=l.j(0,f.i(0,a3).i(0,G.aq(h,u)).i(0,a7).w(0,a5))}}++n}z=z.j(0,l.w(0,i))}}else z=z.j(0,U.n3(this.dy,this.db,w,t,x,b8,b6,y,s))
w=b5.f
s=this.e
if(typeof s!=="number")return H.b(s)
if(w+1<s){G.B(0,0,0)
z=z.j(0,G.dC(b5,x,b8,b6,b4,b3,b7)).j(0,G.dD(b5,x,b8,b6,b4,b3,b7))}return z},
bs:function(a,b,c){var z,y,x,w,v,u,t
z=c.b
y=z.length
this.z=H.p(Array(y),[G.ba])
this.Q=H.p(Array(y),[G.b_])
for(x=a!=null,w=0;w<y;++w){if(w>=z.length)return H.a(z,w)
v=z[w].gbr()
if(x)v=a.bt(v)
u=this.z
t=new G.ba(v,null,null)
C.c.H(b.f,v)
t.b=b.f.length-1
C.c.H(b.r,v)
t.c=b.r.length-1
if(w>=u.length)return H.a(u,w)
u[w]=t
u=this.Q
t=new G.b_(v,null,null)
C.c.H(b.f,v)
t.b=b.f.length-1
C.c.H(b.r,v)
t.c=b.r.length-1
if(w>=u.length)return H.a(u,w)
u[w]=t}if(this.r===!0){z=P.I(1,J.ac(this.x,2))
this.x=z
if(x){z=a.bt(z)
this.x=z}this.ch=G.f3(z,b)
this.cx=G.f3(this.x,b)}},
cc:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
if(a.b.length===0)return
z=new P.bT(null,null)
H.bQ()
$.aL=$.bs
z.bP(0)
$.t.$2(0,"COMPUTING Photon Map")
y=[0]
x=[]
w=[]
v=[]
u=[]
t=[]
s=[]
r=G.i7(a)
q=b!=null?b.gaZ():0
new U.rx(0,q,this,[!1],y,w,v,x,u,t,s,[0],r,a,c).aU()
p=new P.bT(null,null)
H.bQ()
$.aL=$.bs
p.bP(0)
$.t.$2(0,"BUILDING Photon Map KdTree")
o=w.length!==0?G.es(w):null
if(x.length!==0)this.dx=G.es(x)
if(v.length!==0)this.dy=G.es(v)
q="FINISHED Photon Map KdTree: "+P.bN(0,0,J.ac(J.d(p.gbz(),1e6),$.aL),0,0,0).K(0)
$.t.$2(0,q)
if(this.r===!0&&u.length!==0){p.du(0)
$.t.$2(0,"COMPUTING PhotonMap FinalGather")
q=y[0]
n=this.db
m=this.dy
new U.ox(0,1,u,t,s,this.c,this.d,q,n,this.cy,o,m,this.dx).aU()
m="FINISHED PhotonMap FinalGather: "+P.bN(0,0,J.ac(J.d(p.gbz(),1e6),$.aL),0,0,0).K(0)
$.t.$2(0,m)
p.du(0)
$.t.$2(0,"BUILDING PhotonMap FinalGather KdTree")
this.fr=G.es(u)
m="FINISHED PhotonMap FinalGather KdTree: "+P.bN(0,0,J.ac(J.d(p.gbz(),1e6),$.aL),0,0,0).K(0)
$.t.$2(0,m)}q="FINISHED Photon Map: "+P.bN(0,0,J.ac(J.d(z.gbz(),1e6),$.aL),0,0,0).K(0)
$.t.$2(0,q)},
static:{Bq:[function(a){var z,y,x,w,v,u,t,s,r,q
z=a.V("causticphotons",2e4)
y=a.V("indirectphotons",1e5)
x=a.V("nused",50)
w=a.V("maxspeculardepth",5)
v=a.V("maxphotondepth",5)
u=a.bo("finalgather",!0)
t=a.V("finalgathersamples",32)
s=a.m("maxdist",0.1)
r=a.m("gatherangle",10)
q=J.d(s,s)
if(typeof r!=="number")return H.b(r)
return new U.iP(z,y,x,[q],w,v,u,t,Math.cos(H.v(0.017453292519943295*r)),null,null,null,null,0,0,null,null,null)},"$1","nJ",2,0,118]}},
iO:{
"^":"o;au:a>,dS:b>,h2:c<",
b9:function(a,b,c,d,e){return this.a.$4(b,c,d,e)}},
j1:{
"^":"o;au:a>,aY:b<,fn:c<",
b9:function(a,b,c,d,e){return this.a.$4(b,c,d,e)}},
rx:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
aU:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8
z=this.a
y=new G.b6(P.b3(31*z))
x=[]
w=[]
v=[]
u=[]
z=this.c
t=z.a
s=J.i(t,0)
r=z.b
q=J.i(r,0)
p=G.rv(6,y)
o=[]
n=[]
m=[0,0,0,0,0,0]
l=[0]
for(k=this.Q,j=this.z,i=this.y,h=this.ch,g=this.d,f=this.cy,e=this.cx,d=f.b,c=f.a,b=z.f,a=this.db,a0=z.r===!0,a1=this.x,a2=this.r,a3=this.f,a4=this.e,a5=0,a6=0;!0;){for(a7=!q,a8=!s,a9=0;a9<4096;++a9){++a5
p.h9(a5,m)
b0=e.d2(m[0],l)
if(b0>>>0!==b0||b0>=d.length)return H.a(d,b0)
b1=d[b0]
b2=new Float32Array(3)
if(0>=3)return H.a(b2,0)
b2[0]=0
if(1>=3)return H.a(b2,1)
b2[1]=0
if(2>=3)return H.a(b2,2)
b2[2]=0
b3=new Float32Array(3)
if(0>=3)return H.a(b3,0)
b3[0]=0
if(1>=3)return H.a(b3,1)
b3[1]=0
if(2>=3)return H.a(b3,2)
b3[2]=0
b4=new Float32Array(3)
if(0>=3)return H.a(b4,0)
b4[0]=0
if(1>=3)return H.a(b4,1)
b4[1]=0
if(2>=3)return H.a(b4,2)
b4[2]=0
b5=new Float32Array(3)
if(0>=3)return H.a(b5,0)
b5[0]=0
if(1>=3)return H.a(b5,1)
b5[1]=0
if(2>=3)return H.a(b5,2)
b5[2]=0
b6=new Float32Array(3)
b7=new G.j(b6)
if(0>=3)return H.a(b6,0)
b6[0]=0
if(1>=3)return H.a(b6,1)
b6[1]=0
if(2>=3)return H.a(b6,2)
b6[2]=0
b6=b7
b7=new Float32Array(3)
b8=new G.r(b7)
if(0>=3)return H.a(b7,0)
b7[0]=0
if(1>=3)return H.a(b7,1)
b7[1]=0
if(2>=3)return H.a(b7,2)
b7[2]=0
b7=b8
b9=new G.as(!1,new G.j(b2),new G.j(b3),new G.r(b4),new G.r(b5),b6,b7,0,1/0,0,0)
c0=[0]
b7=m[1]
b6=m[2]
b5=m[3]
b2=new Float32Array(2)
if(0>=2)return H.a(b2,0)
b2[0]=b7
if(1>=2)return H.a(b2,1)
b2[1]=b6
b3=new Float32Array(3)
c1=new G.a1(b3)
if(0>=3)return H.a(b3,0)
b3[0]=0
if(1>=3)return H.a(b3,1)
b3[1]=0
if(2>=3)return H.a(b3,2)
b3[2]=0
c2=b1.cd(f,new G.c0(b2,b5),m[4],m[5],this.b,b9,c1,c0)
if(c0[0]===0||c2.Y())continue
c3=J.G(J.d(c2,G.aq(c1,b9.b)),c0[0]*l[0])
if(!c3.Y()){c4=new G.b0(G.ag(),null,null,null,0,0,0)
for(c5=!0,c6=0;c7=c.ae(b9,c4),b2=$.$get$ay(),b2.c=J.c(b2.c,1),$.ay=b2,c7;){++c6
c3=c3.i(0,a.bj(f,b9,null,y))
c8=c4.ba(b9)
b2=c8.io()
b3=c8.cU(19)
c9=J.M(b9.b)
if(b2>b3){d0=new U.iO(c4.a.a,c3,c9)
if(c5&&c6>1)if(a8){v.push(d0)
d1=!0}else d1=!1
else if(c6===1&&a7&&a0){x.push(d0)
d1=!0}else if(c6>1&&a7){w.push(d0)
d1=!0}else d1=!1
if(d1&&a0&&y.a.P()<0.125){d2=c4.a.b
if(J.K(G.J(d2,J.M(b9.b)),0)){b2=J.C(d2)
b3=J.M(b2.gG(d2))
b4=J.M(b2.gF(d2))
b2=J.M(b2.gS(d2))
b5=new Float32Array(3)
d2=new G.a1(b5)
if(0>=3)return H.a(b5,0)
b5[0]=b3
if(1>=3)return H.a(b5,1)
b5[1]=b4
if(2>=3)return H.a(b5,2)
b5[2]=b2}u.push(new U.j1(c4.a.a,d2,G.q(0)))
o.push(c8.l6(y,29))
n.push(c8.l6(y,30))}}if(typeof b!=="number")return H.b(b)
if(c6>=b)break
b2=new Float32Array(3)
d3=new G.r(b2)
if(0>=3)return H.a(b2,0)
b2[0]=0
if(1>=3)return H.a(b2,1)
b2[1]=0
if(2>=3)return H.a(b2,2)
b2[2]=0
c0=[0]
d4=[0]
d5=c8.d3(c9,d3,G.ca(y),c0,31,d4)
if(!d5.Y()){if(0>=c0.length)return H.a(c0,0)
b3=J.i(c0[0],0)}else b3=!0
if(b3)break
b3=c3.i(0,d5).i(0,G.aq(d3,c8.a.b))
if(0>=c0.length)return H.a(c0,0)
d6=b3.w(0,c0[0])
d7=P.X(1,d6.aC()/c3.aC())
if(y.a.P()>d7)break
c3=d6.w(0,d7)
if(c5){b3=d4[0]
if(typeof b3!=="number")return b3.T()
c5=(b3&16)!==0}else c5=!1
if(q&&!c5)break
b3=c4.a.a
b4=c4.r
b5=new Float32Array(3)
if(0>=3)return H.a(b5,0)
b5[0]=0
if(1>=3)return H.a(b5,1)
b5[1]=0
if(2>=3)return H.a(b5,2)
b5[2]=0
b6=new Float32Array(3)
if(0>=3)return H.a(b6,0)
b6[0]=0
if(1>=3)return H.a(b6,1)
b6[1]=0
if(2>=3)return H.a(b6,2)
b6[2]=0
b7=new Float32Array(3)
if(0>=3)return H.a(b7,0)
b7[0]=0
if(1>=3)return H.a(b7,1)
b7[1]=0
if(2>=3)return H.a(b7,2)
b7[2]=0
b8=new Float32Array(3)
if(0>=3)return H.a(b8,0)
b8[0]=0
if(1>=3)return H.a(b8,1)
b8[1]=0
if(2>=3)return H.a(b8,2)
b8[2]=0
b9=new G.as(!1,new G.j(b5),new G.j(b6),new G.r(b7),new G.r(b8),new G.j(new Float32Array(H.n(b3.a))),new G.r(new Float32Array(H.n(b2))),b4,1/0,b9.e,b9.f+1)}}}if(g[0])return
b2=h[0]
if(b2>5e5){b3=a1.length
if(typeof t!=="number")return H.b(t)
if(b3<t)b3=b3===0||b3<4
else b3=!1
if(!b3){b3=a2.length
if(typeof r!=="number")return H.b(r)
if(b3<r)b3=b3===0||b3<4
else b3=!1}else b3=!0}else b3=!1
if(b3){$.t.$2(2,"Unable to store enough photons. Giving up.\n")
C.c.sn(a1,0)
C.c.sn(a2,0)
C.c.sn(i,0)
g[0]=!0
return}h[0]=b2+4096
if(a7){z.db+=4096
for(a9=0;a9<w.length;++a9)a2.push(w[a9])
C.c.sn(w,0)
a7=a2.length
if(typeof r!=="number")return H.b(r)
q=a7>=r&&!0
d8=a6+1
if(a6>1000){a7="Indirect Photons: "+a7+" / "+H.m(r)
$.t.$2(4,a7)
a6=0}else a6=d8
a4[0]=a4[0]+4096
for(a9=0;a9<x.length;++a9)a3.push(x[a9])
C.c.sn(x,0)}if(a8){z.cy+=4096
for(a9=0;a9<v.length;++a9)a1.push(v[a9])
C.c.sn(v,0)
a7=a1.length
if(typeof t!=="number")return H.b(t)
s=a7>=t&&!0}for(a9=0;a9<u.length;++a9)i.push(u[a9])
C.c.sn(u,0)
for(a9=0;a9<o.length;++a9)j.push(o[a9])
C.c.sn(o,0)
for(a9=0;a9<n.length;++a9)k.push(n[a9])
C.c.sn(n,0)
if(q&&s)break}}},
ox:{
"^":"o;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
aU:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=this.c
y=z.length
x=this.b
w=C.a.ar(y,x)
v=C.a.R(y,x)
u=P.X(this.a,v)*(w+1)+P.I(0,this.a-v)*w
y=this.a
t=y<v?1:0
s=u+w+t
if(y===x-1);y=this.f
if(typeof y!=="number")return H.b(y)
r=H.p(Array(y),[U.eb])
for(x=this.d,t=this.e,q=this.Q,p=this.x,o=this.r,n=u;n<s;++n){if(n>>>0!==n||n>=z.length)return H.a(z,n)
m=z[n]
if(n>=x.length)return H.a(x,n)
l=x[n]
if(n>=t.length)return H.a(t,n)
k=t[n]
if(!l.Y()){j=J.C(m)
i=U.dX(q,p,y,r,o,j.gau(m),m.gaY()).j(0,U.dX(this.ch,this.y,y,r,o,j.gau(m),m.gaY())).j(0,U.dX(this.cx,this.z,y,r,o,j.gau(m),m.gaY()))
m.c=m.gfn().j(0,l.i(0,i).i(0,0.3183098861837907))}if(!k.Y()){j=J.C(m)
i=U.dX(q,p,y,r,o,j.gau(m),J.M(m.gaY())).j(0,U.dX(this.ch,this.y,y,r,o,j.gau(m),J.M(m.gaY()))).j(0,U.dX(this.cx,this.z,y,r,o,j.gau(m),J.M(m.gaY())))
m.c=m.gfn().j(0,k.i(0,i).i(0,0.3183098861837907))}}}},
eb:{
"^":"o;a,q2:b<",
U:function(a,b){var z,y
z=this.b
y=J.O(z)
return y.B(z,b.gq2())?J.K(J.aS(this.a),J.aS(b.a)):y.U(z,b.b)}},
iQ:{
"^":"o:51;a,b,c",
$4:function(a,b,c,d){var z,y,x,w,v,u
z=this.c
y=this.b
if(typeof y!=="number")return H.b(y)
x=this.a
if(z<y){w=z+1
this.c=w
v=x.length
if(z>=v)return H.a(x,z)
x[z]=new U.eb(b,c)
if(w===y){G.y5(x,0,y)
if(0>=v)return H.a(x,0)
J.u(d,0,x[0].b)}}else{z=y-1
w=y-1
v=x.length
if(w>>>0!==w||w>=v)return H.a(x,w)
w=x[w]
if(0>=v)return H.a(x,0)
u=x[0]
if(z>>>0!==z||z>=v)return H.a(x,z)
x[z]=u
G.ni(x,0,0,y-1-0,w)
w=y-1
if(w>>>0!==w||w>=v)return H.a(x,w)
x[w]=new U.eb(b,c)
w=y-1
if(w>>>0!==w||w>=v)return H.a(x,w)
G.nl(x,0,y-0-1,0,x[w])
J.u(d,0,x[0].b)}}},
m_:{
"^":"o:52;aY:a<,b",
$4:function(a,b,c,d){if(J.F(G.J(b.gaY(),this.a),0)){this.b=b
J.u(d,0,c)}}},
jB:{
"^":"bU;a,b,c,d,e,f,r,x",
bs:function(a,b,c){var z,y,x,w,v,u,t
z=c.b
y=z.length
this.r=H.p(Array(y),[G.ba])
this.x=H.p(Array(y),[G.b_])
for(x=a!=null,w=0;w<y;++w){if(w>=z.length)return H.a(z,w)
v=z[w].gbr()
if(x)v=a.bt(v)
u=this.r
t=new G.ba(v,null,null)
C.c.H(b.f,v)
t.b=b.f.length-1
C.c.H(b.r,v)
t.c=b.r.length-1
if(w>=u.length)return H.a(u,w)
u[w]=t
u=this.x
t=new G.b_(v,null,null)
C.c.H(b.f,v)
t.b=b.f.length-1
C.c.H(b.r,v)
t.c=b.r.length-1
if(w>=u.length)return H.a(u,w)
u[w]=t}},
ak:function(c4,c5,c6,c7,c8,c9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3
z=G.q(0)
y=J.M(c6.gbc())
z=z.j(0,c7.aS(y))
x=c7.ba(c6)
w=x.a
v=w.a
u=w.b
if(this.c===0)z=z.j(0,G.dE(c4,c5,v,u,y,c7.r,c6.e,x,c8,c9,this.r,this.x))
w=this.a.kS(0,v).a
t=w.length
if(0>=t)return H.a(w,0)
s=this.e
r=w[0]*s[0]-0.5
if(1>=t)return H.a(w,1)
q=w[1]*s[1]-0.5
if(2>=t)return H.a(w,2)
p=w[2]*s[2]-0.5
o=C.b.I(Math.floor(r))
n=C.b.I(Math.floor(q))
m=C.b.I(Math.floor(p))
l=r-o
k=q-n
j=p-m
i=this.cI(this.b,o,n,m)
s=o+1
h=this.cI(this.b,s,n,m)
w=n+1
g=this.cI(this.b,o,w,m)
f=this.cI(this.b,s,w,m)
t=m+1
e=this.cI(this.b,o,n,t)
d=this.cI(this.b,s,n,t)
c=this.cI(this.b,o,w,t)
b=this.cI(this.b,s,w,t)
t=this.b
if(typeof t!=="number")return t.j();++t
a=t*t
a0=H.p(Array(a),[G.ai])
for(w=J.w(i),t=J.w(h),s=1-l,a1=J.w(g),a2=J.w(f),a3=J.w(e),a4=J.w(d),a5=J.w(c),a6=J.w(b),a7=1-k,a8=1-j,a9=a0.length,b0=0;b0<a;++b0){b1=this.f
b2=w.j(i,b0)
if(b2>>>0!==b2||b2>=b1.length)return H.a(b1,b2)
b2=b1[b2]
b1=this.f
b3=t.j(h,b0)
if(b3>>>0!==b3||b3>=b1.length)return H.a(b1,b3)
b3=b1[b3]
b4=b2.i(0,s).j(0,b3.i(0,l))
b3=this.f
b2=a1.j(g,b0)
if(b2>>>0!==b2||b2>=b3.length)return H.a(b3,b2)
b2=b3[b2]
b3=this.f
b1=a2.j(f,b0)
if(b1>>>0!==b1||b1>=b3.length)return H.a(b3,b1)
b1=b3[b1]
b5=b2.i(0,s).j(0,b1.i(0,l))
b1=this.f
b2=a3.j(e,b0)
if(b2>>>0!==b2||b2>=b1.length)return H.a(b1,b2)
b2=b1[b2]
b1=this.f
b3=a4.j(d,b0)
if(b3>>>0!==b3||b3>=b1.length)return H.a(b1,b3)
b3=b1[b3]
b6=b2.i(0,s).j(0,b3.i(0,l))
b3=this.f
b2=a5.j(c,b0)
if(b2>>>0!==b2||b2>=b3.length)return H.a(b3,b2)
b2=b3[b2]
b3=this.f
b1=a6.j(b,b0)
if(b1>>>0!==b1||b1>=b3.length)return H.a(b3,b1)
b1=b3[b1]
b7=b2.i(0,s).j(0,b1.i(0,l))
b8=b4.i(0,a7).j(0,b5.i(0,k))
b9=b6.i(0,a7).j(0,b7.i(0,k))
b1=b8.i(0,a8).j(0,b9.i(0,j))
if(b0>=a9)return H.a(a0,b0)
a0[b0]=b1}c0=H.p(Array(a),[G.ai])
G.tM(this.b,a0,c0)
c1=x.c_(y,c9,29)
w=H.k(a)
c2=new Float32Array(w)
G.bn(G.fZ(u,y),this.b,c2,0)
c3=G.q(0)
for(t=c0.length,b0=0;b0<a;++b0){if(b0>=t)return H.a(c0,b0)
s=c0[b0]
if(b0>=w)return H.a(c2,b0)
c3=c3.j(0,J.d(s,c2[b0]))}return z.j(0,c1.i(0,0.3183098861837907).i(0,c3.cl(0)))},
cI:function(a,b,c,d){var z,y,x
z=this.e
b=C.a.v(b,0,z[0]-1)
c=C.a.v(c,0,z[1]-1)
d=C.a.v(d,0,z[2]-1)
y=z[0]
z=z[1]
if(typeof a!=="number")return a.j()
x=a+1
return x*x*(b+c*y+d*y*z)},
mZ:function(a){var z=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
if(J.bE(a))$.au.eb(a,!0,z.a).ai(new U.uG(this,a,z))},
static:{uF:function(a){var z=new U.jB(G.a9(null,null),null,null,null,[0,0,0],null,null,null)
z.mZ(a)
return z},C4:[function(a){return U.uF(a.bp("filename","probes.out"))},"$1","yO",2,0,119]}},
uG:{
"^":"z:0;a,b,c",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.c7(a,"$isE",[P.x],"$asE")
if(z){z=this.b
y=G.eA(a,z)
$.au.c.k(0,z,y)}else{z=H.c7(a,"$isE",[P.a3],"$asE")
y=z?a:null}z=this.a
x=J.D(y)
z.b=J.aW(x.h(y,0))
z.c=J.aW(x.h(y,1))
z.d=J.aW(x.h(y,2))
w=z.e
w[0]=J.aW(x.h(y,3))
w[1]=J.aW(x.h(y,4))
w[2]=J.aW(x.h(y,5))
v=z.a.a
u=x.h(y,6)
v=v.a
if(0>=v.length)return H.a(v,0)
v[0]=u
u=z.a.a
v=x.h(y,7)
u=u.a
if(1>=u.length)return H.a(u,1)
u[1]=v
v=z.a.a
u=x.h(y,8)
v=v.a
if(2>=v.length)return H.a(v,2)
v[2]=u
u=z.a.b
v=x.h(y,9)
u=u.a
if(0>=u.length)return H.a(u,0)
u[0]=v
v=z.a.b
u=x.h(y,10)
v=v.a
if(1>=v.length)return H.a(v,1)
v[1]=u
u=z.a.b
x=x.h(y,11)
u=u.a
if(2>=u.length)return H.a(u,2)
u[2]=x
x=z.b
if(typeof x!=="number")return x.j();++x
t=x*x
s=w[0]*w[1]*w[2]
z.f=H.p(Array(t*s),[G.ai])
for(r=12,q=0,p=0;p<s;++p)for(o=0;o<t;++o,q=n){x=z.f
n=q+1
w=G.q(0)
w.lA(y,r)
if(q<0||q>=x.length)return H.a(x,q)
x[q]=w
x=$.dg
if(x===0)x=3
else x=x===1?3:4
r+=x}this.c.aM(0)}},
jP:{
"^":"bU;a",
ak:function(a,a0,a1,a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
z=G.q(0)
y=a2.ba(a1)
x=y.a
w=x.a
v=x.b
u=J.M(a1.gbc())
z=z.j(0,a2.aS(u))
for(x=a.b,t=a.a,s=0;s<x.length;++s){r=new Float32Array(3)
q=new G.r(r)
if(0>=3)return H.a(r,0)
r[0]=0
if(1>=3)return H.a(r,1)
r[1]=0
if(2>=3)return H.a(r,2)
r[2]=0
p=[0]
o=new G.eO(null)
if(s>=x.length)return H.a(x,s)
n=x[s].bL(w,a2.r,G.im(a4),a1.e,q,p,o)
if(n.Y()||p[0]===0)continue
m=y.ay(u,q)
if(!m.Y()){l=t.a5(o.a)
r=$.$get$az()
r.c=J.c(r.c,1)
$.az=r
r=!l}else r=!1
if(r){r=m.i(0,n).i(0,G.aq(q,v))
k=o.a
j=new Float32Array(3)
if(0>=3)return H.a(j,0)
j[0]=0
if(1>=3)return H.a(j,1)
j[1]=0
if(2>=3)return H.a(j,2)
j[2]=0
i=new Float32Array(3)
if(0>=3)return H.a(i,0)
i[0]=0
if(1>=3)return H.a(i,1)
i[1]=0
if(2>=3)return H.a(i,2)
i[2]=0
h=new Float32Array(3)
if(0>=3)return H.a(h,0)
h[0]=0
if(1>=3)return H.a(h,1)
h[1]=0
if(2>=3)return H.a(h,2)
h[2]=0
g=new Float32Array(3)
if(0>=3)return H.a(g,0)
g[0]=0
if(1>=3)return H.a(g,1)
g[1]=0
if(2>=3)return H.a(g,2)
g[2]=0
f=new Float32Array(H.n(k.a.a))
e=new Float32Array(H.n(J.N(k.b)))
d=k.c
c=k.d
b=k.e
k=k.f
f=new G.j(new Float32Array(H.n(f)))
e=new G.r(new Float32Array(H.n(e)))
z=z.j(0,r.i(0,a0.bj(a,new G.as(!1,new G.j(j),new G.j(i),new G.r(h),new G.r(g),f,e,d,c,b,k),a3,a4)).w(0,p[0]))}}x=a1.f
t=this.a
if(typeof t!=="number")return H.b(t)
return x+1<t?z.j(0,G.dC(a1,y,a4,a2,a0,a,a3)).j(0,G.dD(a1,y,a4,a2,a0,a,a3)):z},
static:{CO:[function(a){return new U.jP(a.V("maxdepth",5))},"$1","yP",2,0,120]}}}],["","",,G,{
"^":"",
f4:{
"^":"b7;a,b,c,d,e",
J:function(a){var z,y,x,w,v,u
z=[0]
y=[0]
this.a.cR(0,a,z,y,[0],[0],[0],[0])
x=z[0]
w=y[0]
if(typeof x!=="number")return H.b(x)
v=1-x
if(typeof w!=="number")return H.b(w)
u=1-w
return J.c(J.c(J.c(J.d(this.b,v*u),J.d(J.d(this.c,v),w)),J.d(J.d(this.d,x),u)),J.d(J.d(this.e,x),w))},
static:{zr:[function(a,b){var z,y,x,w,v,u
z=b.cM("mapping","uv")
y=J.O(z)
if(y.B(z,"uv")){y=b.c
x=new G.bd(y.m("uscale",b.d.m("uscale",1)),y.m("vscale",b.d.m("vscale",1)),y.m("udelta",b.d.m("udelta",0)),y.m("vdelta",b.d.m("vdelta",0)))}else if(y.B(z,"spherical"))x=new G.cO(G.Z(a.gan(),a.a))
else if(y.B(z,"cylindrical"))x=new G.cy(G.Z(a.gan(),a.a))
else if(y.B(z,"planar")){y=G.B(1,0,0)
w=b.c
y=w.af("v1",b.d.af("v1",y))
v=G.B(0,1,0)
v=w.af("v2",b.d.af("v2",v))
u=w.m("udelta",b.d.m("udelta",0))
w=w.m("vdelta",b.d.m("vdelta",0))
x=new G.cG(new G.r(new Float32Array(H.n(J.N(y)))),new G.r(new Float32Array(H.n(J.N(v)))),u,w)}else{y="2D texture mapping '"+H.m(z)+"' unknown"
$.t.$2(2,y)
x=new G.bd(1,1,0,0)}y=b.c
return new G.f4(x,y.m("v00",b.d.m("v00",0)),y.m("v01",b.d.m("v01",1)),y.m("v10",b.d.m("v10",0)),y.m("v11",b.d.m("v11",1)))},"$2","yQ",4,0,28],zs:[function(a,b){var z,y,x,w,v,u,t
z=b.cM("mapping","uv")
y=J.O(z)
if(y.B(z,"uv")){y=b.c
x=new G.bd(y.m("uscale",b.d.m("uscale",1)),y.m("vscale",b.d.m("vscale",1)),y.m("udelta",b.d.m("udelta",0)),y.m("vdelta",b.d.m("vdelta",0)))}else if(y.B(z,"spherical"))x=new G.cO(G.Z(a.gan(),a.a))
else if(y.B(z,"cylindrical"))x=new G.cy(G.Z(a.gan(),a.a))
else if(y.B(z,"planar")){y=G.B(1,0,0)
w=b.c
y=w.af("v1",b.d.af("v1",y))
v=G.B(0,1,0)
v=w.af("v2",b.d.af("v2",v))
u=w.m("udelta",b.d.m("udelta",0))
w=w.m("vdelta",b.d.m("vdelta",0))
x=new G.cG(new G.r(new Float32Array(H.n(J.N(y)))),new G.r(new Float32Array(H.n(J.N(v)))),u,w)}else{y="2D texture mapping '"+H.m(z)+"' unknown"
$.t.$2(2,y)
x=new G.bd(1,1,0,0)}y=G.q(0)
w=b.c
y=w.a8("v00",b.d.a8("v00",y))
v=G.q(1)
v=w.a8("v01",b.d.a8("v01",v))
u=G.q(0)
u=w.a8("v10",b.d.a8("v10",u))
t=G.q(1)
return new G.f4(x,y,v,u,w.a8("v11",b.d.a8("v11",t)))},"$2","yR",4,0,28]}},
oq:{
"^":"b7;a,b,c",
J:function(a){var z,y,x,w
z=this.a.f4(0,a,G.B(0,0,0),G.B(0,0,0)).a
y=z.length
if(0>=y)return H.a(z,0)
x=C.b.I(Math.floor(z[0]))
if(1>=y)return H.a(z,1)
w=C.b.I(Math.floor(z[1]))
if(2>=y)return H.a(z,2)
if(C.a.R(x+w+C.b.I(Math.floor(z[2])),2)===0)return this.b.J(a)
else return this.c.J(a)}},
or:{
"^":"b7;a,b,c,d",
J:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=[0]
y=[0]
x=[0]
w=[0]
v=[0]
u=[0]
this.a.cR(0,a,z,y,x,w,v,u)
t=z[0]
s=y[0]
r=x[0]
q=v[0]
p=w[0]
o=u[0]
if(this.d===0){if(C.a.R(J.a_(t)+J.a_(s),2)===0)return this.b.J(a)
return this.c.J(a)}else{n=P.I(J.af(r),J.af(q))
m=P.I(J.af(p),J.af(o))
l=J.y(t)
k=l.l(t,n)
j=l.j(t,n)
i=J.y(s)
h=i.l(s,m)
g=i.j(s,m)
if(J.a_(k)===J.a_(j)&&J.a_(h)===J.a_(g)){if(C.a.R(l.X(t)+i.X(s),2)===0)return this.b.J(a)
return this.c.J(a)}l=new G.os()
f=J.h(l.$1(j),l.$1(k))/(2*n)
e=J.h(l.$1(g),l.$1(h))/(2*m)
d=f+e-2*f*e
if(n>1||m>1)d=0.5
return J.c(J.d(this.b.J(a),1-d),J.d(this.c.J(a),d))}},
static:{zz:[function(a,b){return G.kG(a,b,b.aG("tex1",1),b.aG("tex2",0))},"$2","yS",4,0,27],zA:[function(a,b){return G.kG(a,b,b.ac("tex1",G.q(1)),b.ac("tex2",G.q(0)))},"$2","yT",4,0,27],kG:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q
z=b.c
y=z.V("dimension",b.d.V("dimension",2))
x=J.O(y)
if(!x.B(y,2)&&!x.B(y,3)){z=H.m(y)+" dimensional checkerboard texture not supported"
$.t.$2(1,z)
return}if(x.B(y,2)){w=z.aO("mapping",b.d.aO("mapping","uv"))
x=J.O(w)
if(x.B(w,"uv"))v=new G.bd(z.m("uscale",b.d.m("uscale",1)),z.m("vscale",b.d.m("vscale",1)),z.m("udelta",b.d.m("udelta",0)),z.m("vdelta",b.d.m("vdelta",0)))
else if(x.B(w,"spherical"))v=new G.cO(G.Z(a.gan(),a.a))
else if(x.B(w,"cylindrical"))v=new G.cy(G.Z(a.gan(),a.a))
else if(x.B(w,"planar")){x=G.B(1,0,0)
x=z.af("v1",b.d.af("v1",x))
u=G.B(0,1,0)
u=z.af("v2",b.d.af("v2",u))
t=z.m("udelta",b.d.m("udelta",0))
s=z.m("vdelta",b.d.m("vdelta",0))
v=new G.cG(new G.r(new Float32Array(H.n(J.N(x)))),new G.r(new Float32Array(H.n(J.N(u)))),t,s)}else{x="2D texture mapping '"+H.m(w)+"' unknown"
$.t.$2(1,x)
v=new G.bd(1,1,0,0)}r=z.aO("aamode",b.d.aO("aamode","closedform"))
z=J.O(r)
if(z.B(r,"none"))q=0
else{if(z.B(r,"closedform"));else{z="Antialiasing mode '"+H.m(r)+"' not understood by Checkerboard2DTexture; using 'closedform'"
$.t.$2(1,z)}q=1}return new G.or(v,c,d,q)}else return new G.oq(new G.cB(a),c,d)}}},
os:{
"^":"z:0;",
$1:function(a){var z=J.y(a)
return J.a_(z.w(a,2))+2*P.I(J.h(J.h(z.w(a,2),J.a_(z.w(a,2))),0.5),0)}},
f7:{
"^":"b7;a,b,c",
J:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=[0]
y=[0]
this.a.cR(0,a,z,y,[0],[0],[0],[0])
x=z[0]
w=y[0]
v=J.w(x)
u=J.a_(v.j(x,0.5))
t=J.w(w)
s=J.a_(t.j(w,0.5))
if(J.F(G.de(u+0.5,s+0.5,0.5),0)){r=G.de(u+1.5,s+2.8,0.5)
if(typeof r!=="number")return H.b(r)
q=G.de(u+4.5,s+9.8,0.5)
if(typeof q!=="number")return H.b(q)
p=v.l(x,u+0.15000000000000002*r)
o=t.l(w,s+0.15000000000000002*q)
if(J.K(J.c(J.d(p,p),J.d(o,o)),0.12249999999999998))return this.c.J(a)}return this.b.J(a)},
static:{zQ:[function(a,b){var z,y,x,w,v,u
z=b.cM("mapping","uv")
y=J.O(z)
if(y.B(z,"uv")){y=b.c
x=new G.bd(y.m("uscale",b.d.m("uscale",1)),y.m("vscale",b.d.m("vscale",1)),y.m("udelta",b.d.m("udelta",0)),y.m("vdelta",b.d.m("vdelta",0)))}else if(y.B(z,"spherical"))x=new G.cO(G.Z(a.gan(),a.a))
else if(y.B(z,"cylindrical"))x=new G.cy(G.Z(a.gan(),a.a))
else if(y.B(z,"planar")){y=G.B(1,0,0)
w=b.c
y=w.af("v1",b.d.af("v1",y))
v=G.B(0,1,0)
v=w.af("v2",b.d.af("v2",v))
u=w.m("udelta",b.d.m("udelta",0))
w=w.m("vdelta",b.d.m("vdelta",0))
x=new G.cG(new G.r(new Float32Array(H.n(J.N(y)))),new G.r(new Float32Array(H.n(J.N(v)))),u,w)}else{y="2D texture mapping '"+H.m(z)+"' unknown"
$.t.$2(2,y)
x=new G.bd(1,1,0,0)}return new G.f7(x,b.aG("inside",1),b.aG("outside",0))},"$2","yU",4,0,26],zR:[function(a,b){var z,y,x,w,v,u
z=b.cM("mapping","uv")
y=J.O(z)
if(y.B(z,"uv")){y=b.c
x=new G.bd(y.m("uscale",b.d.m("uscale",1)),y.m("vscale",b.d.m("vscale",1)),y.m("udelta",b.d.m("udelta",0)),y.m("vdelta",b.d.m("vdelta",0)))}else if(y.B(z,"spherical"))x=new G.cO(G.Z(a.gan(),a.a))
else if(y.B(z,"cylindrical"))x=new G.cy(G.Z(a.gan(),a.a))
else if(y.B(z,"planar")){y=G.B(1,0,0)
w=b.c
y=w.af("v1",b.d.af("v1",y))
v=G.B(0,1,0)
v=w.af("v2",b.d.af("v2",v))
u=w.m("udelta",b.d.m("udelta",0))
w=w.m("vdelta",b.d.m("vdelta",0))
x=new G.cG(new G.r(new Float32Array(H.n(J.N(y)))),new G.r(new Float32Array(H.n(J.N(v)))),u,w)}else{y="2D texture mapping '"+H.m(z)+"' unknown"
$.t.$2(2,y)
x=new G.bd(1,1,0,0)}return new G.f7(x,b.ac("inside",G.q(1)),b.ac("outside",G.q(0)))},"$2","yV",4,0,26]}},
fa:{
"^":"b7;a,b,c,d",
J:function(a){var z,y,x
z=G.B(0,0,0)
y=G.B(0,0,0)
x=G.f9(this.d.f4(0,a,z,y),z,y,this.a,this.b)
return this.c?G.q(x):x},
static:{zX:[function(a,b){var z=b.eW("octaves",8)
return new G.fa(b.c.m("roughness",b.d.m("roughness",0.5)),z,!1,new G.cB(a))},"$2","yW",4,0,25],zY:[function(a,b){var z=b.eW("octaves",8)
return new G.fa(b.c.m("roughness",b.d.m("roughness",0.5)),z,!0,new G.cB(a))},"$2","yX",4,0,25]}},
i4:{
"^":"b7;a,b",
J:function(a){var z,y,x,w,v,u
z=[0]
y=[0]
x=[0]
w=[0]
v=[0]
u=[0]
this.b.cR(0,a,z,y,x,w,v,u)
return this.a.qB(z[0],y[0],x[0],w[0],v[0],u[0])},
mk:function(a,b,c,d,e,f,g,h){var z,y,x
if(J.bE(b)){z=H.p(new P.al(H.p(new P.a2(0,$.Q,null),[null])),[null])
$.au.fX(b,z.a).ai(new G.pQ(this,b,c,d,e,f,g,h,z))}H.v(f)
H.v(g)
y=Math.pow(f,g)
x=G.dR(1,1,h?3:1)
if(h)x.k(0,0,G.q(y))
else x.k(0,0,y)
this.a=G.dH(x,"",!1,8,0)},
static:{lc:function(a,b,c,d,e,f,g,h){var z=new G.i4(null,a)
z.mk(a,b,c,d,e,f,g,h)
return z},Az:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=b.cM("mapping","uv")
y=J.O(z)
if(y.B(z,"uv")){y=b.c
x=new G.bd(y.m("uscale",b.d.m("uscale",1)),y.m("vscale",b.d.m("vscale",1)),y.m("udelta",b.d.m("udelta",0)),y.m("vdelta",b.d.m("vdelta",0)))}else if(y.B(z,"spherical"))x=new G.cO(G.Z(a.gan(),a.a))
else if(y.B(z,"cylindrical"))x=new G.cy(G.Z(a.gan(),a.a))
else if(y.B(z,"planar")){y=G.B(1,0,0)
w=b.c
y=w.af("v1",b.d.af("v1",y))
v=G.B(0,1,0)
v=w.af("v2",b.d.af("v2",v))
u=w.m("udelta",b.d.m("udelta",0))
w=w.m("vdelta",b.d.m("vdelta",0))
x=new G.cG(new G.r(new Float32Array(H.n(J.N(y)))),new G.r(new Float32Array(H.n(J.N(v)))),u,w)}else{y="2D texture mapping '"+H.m(z)+"' unknown"
$.t.$2(2,y)
x=new G.bd(1,1,0,0)}y=b.c
t=y.m("maxanisotropy",b.d.m("maxanisotropy",8))
s=y.bo("trilinear",b.d.bo("trilinear",!1))
r=y.aO("wrap",b.d.aO("wrap","repeat"))
w=J.O(r)
if(w.B(r,"black"))q=1
else q=w.B(r,"clamp")?2:0
p=y.m("scale",b.d.m("scale",1))
o=y.m("gamma",b.d.m("gamma",1))
return G.lc(x,y.bp("filename",b.d.bp("filename","")),s,t,q,p,o,!1)},"$2","yY",4,0,22],AA:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=b.cM("mapping","uv")
y=J.O(z)
if(y.B(z,"uv")){y=b.c
x=new G.bd(y.m("uscale",b.d.m("uscale",1)),y.m("vscale",b.d.m("vscale",1)),y.m("udelta",b.d.m("udelta",0)),y.m("vdelta",b.d.m("vdelta",0)))}else if(y.B(z,"spherical"))x=new G.cO(G.Z(a.gan(),a.a))
else if(y.B(z,"cylindrical"))x=new G.cy(G.Z(a.gan(),a.a))
else if(y.B(z,"planar")){y=G.B(1,0,0)
w=b.c
y=w.af("v1",b.d.af("v1",y))
v=G.B(0,1,0)
v=w.af("v2",b.d.af("v2",v))
u=w.m("udelta",b.d.m("udelta",0))
w=w.m("vdelta",b.d.m("vdelta",0))
x=new G.cG(new G.r(new Float32Array(H.n(J.N(y)))),new G.r(new Float32Array(H.n(J.N(v)))),u,w)}else{y="2D texture mapping '"+H.m(z)+"' unknown"
$.t.$2(2,y)
x=new G.bd(1,1,0,0)}y=b.c
t=y.m("maxanisotropy",b.d.m("maxanisotropy",8))
s=y.bo("trilinear",b.d.bo("trilinear",!1))
r=y.aO("wrap",b.d.aO("wrap","repeat"))
w=J.O(r)
if(w.B(r,"black"))q=1
else q=w.B(r,"clamp")?2:0
p=y.m("scale",b.d.m("scale",1))
o=y.m("gamma",b.d.m("gamma",1))
return G.lc(x,y.bp("filename",b.d.bp("filename","")),s,t,q,p,o,!0)},"$2","yZ",4,0,22]}},
pQ:{
"^":"z:9;a,b,c,d,e,f,r,x,y",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.b
y=this.c
x=this.d
w=this.e
v=this.f
u=this.r
t=this.x
s=G.fl(z,y,u,x,v,t,w)
r="TEXTURE "+H.m(s)
$.t.$2(4,r)
if($.au.e.O(s)){this.a.a=$.au.fh(s)
this.y.aM(0)
return}if(a!=null){a=!t?a.pO(1):G.j8(a)
if(!J.i(v,1)||!J.i(u,1))for(q=J.N(a).length,p=0;p<q;++p){t=a.d
if(p>=t.length)return H.a(t,p)
r=t[p]
if(typeof v!=="number")return H.b(v)
if(typeof u!=="number")H.T(H.Y(u))
t[p]=Math.pow(r*v,u)}z=G.dH(a,z,y,x,w)
this.a.a=z
$.au.e.k(0,s,z)}this.y.aM(0)}},
iw:{
"^":"b7;a,b,c,d,e",
J:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=G.B(0,0,0)
y=G.B(0,0,0)
x=this.c
w=this.e.f4(0,a,z,y).i(0,x)
v=w.a
if(1>=v.length)return H.a(v,1)
v=v[1]
x=J.d(this.d,G.f9(w,z.i(0,x),y.i(0,x),this.b,this.a))
if(typeof x!=="number")return H.b(x)
x=(0.5+0.5*Math.sin(H.v(v+x)))*6
u=C.b.I(Math.floor(x))
t=x-u
s=u*3
if(s<0||s>=27)return H.a(C.f,s)
x=C.f[s]
v=s+1
if(v>=27)return H.a(C.f,v)
v=C.f[v]
r=s+2
if(r>=27)return H.a(C.f,r)
q=G.cm(x,v,C.f[r])
r=s+3
if(r>=27)return H.a(C.f,r)
r=C.f[r]
v=s+4
if(v>=27)return H.a(C.f,v)
v=C.f[v]
x=s+5
if(x>=27)return H.a(C.f,x)
p=G.cm(r,v,C.f[x])
x=s+6
if(x>=27)return H.a(C.f,x)
x=C.f[x]
v=s+7
if(v>=27)return H.a(C.f,v)
v=C.f[v]
r=s+8
if(r>=27)return H.a(C.f,r)
o=G.cm(x,v,C.f[r])
r=s+9
if(r>=27)return H.a(C.f,r)
r=C.f[r]
v=s+10
if(v>=27)return H.a(C.f,v)
v=C.f[v]
x=s+11
if(x>=27)return H.a(C.f,x)
n=G.cm(r,v,C.f[x])
x=1-t
m=q.i(0,x).j(0,p.i(0,t))
l=p.i(0,x).j(0,o.i(0,t))
k=o.i(0,x).j(0,n.i(0,t))
m=m.i(0,x).j(0,l.i(0,t))
l=l.i(0,x).j(0,k.i(0,t))
return m.i(0,x).j(0,l.i(0,t)).i(0,1.5)},
static:{AP:[function(a,b){return},"$2","z_",4,0,34],AQ:[function(a,b){var z,y
z=b.eW("octaves",8)
y=b.c
return new G.iw(z,y.m("roughness",b.d.m("roughness",0.5)),y.m("scale",b.d.m("scale",1)),y.m("variation",b.d.m("variation",0.2)),new G.cB(a))},"$2","z0",4,0,34]}},
fp:{
"^":"b7;a,b,c",
J:function(a){var z,y,x
z=this.a.J(a)
y=this.b.J(a)
x=this.c.J(a)
if(typeof x!=="number")return H.b(x)
return J.c(J.d(z,1-x),J.d(y,x))},
static:{B3:[function(a,b){return new G.fp(b.aG("tex1",0),b.aG("tex2",1),b.aG("amount",0.5))},"$2","z1",4,0,33],B4:[function(a,b){return new G.fp(b.ac("tex1",G.q(0)),b.ac("tex2",G.q(1)),b.aG("amount",0.5))},"$2","z2",4,0,33]}},
fI:{
"^":"b7;a,b",
J:function(a){var z,y
z=this.a.J(a)
y=this.b.J(a)
if(typeof z==="number")return J.d(y,z)
return J.d(z,y)},
static:{BB:[function(a,b){return new G.fI(b.aG("tex1",1),b.aG("tex2",1))},"$2","z3",4,0,32],BC:[function(a,b){return new G.fI(b.ac("tex1",G.q(1)),b.ac("tex2",G.q(1)))},"$2","z4",4,0,32]}},
jx:{
"^":"b7;a",
J:function(a){var z,y,x,w
z=[0]
y=[0]
this.a.cR(0,a,z,y,[0],[0],[0],[0])
x=z[0]
w=y[0]
return G.cm(x-J.a_(x),w-J.a_(w),0)},
static:{C0:[function(a,b){return},"$2","z5",4,0,29],C1:[function(a,b){var z,y,x,w,v,u
z=b.cM("mapping","uv")
y=J.O(z)
if(y.B(z,"uv")){y=b.c
x=new G.bd(y.m("uscale",b.d.m("uscale",1)),y.m("vscale",b.d.m("vscale",1)),y.m("udelta",b.d.m("udelta",0)),y.m("vdelta",b.d.m("vdelta",0)))}else if(y.B(z,"spherical"))x=new G.cO(G.Z(a.gan(),a.a))
else if(y.B(z,"cylindrical"))x=new G.cy(G.Z(a.gan(),a.a))
else if(y.B(z,"planar")){y=G.B(1,0,0)
w=b.c
y=w.af("v1",b.d.af("v1",y))
v=G.B(0,1,0)
v=w.af("v2",b.d.af("v2",v))
u=w.m("udelta",b.d.m("udelta",0))
w=w.m("vdelta",b.d.m("vdelta",0))
x=new G.cG(new G.r(new Float32Array(H.n(J.N(y)))),new G.r(new Float32Array(H.n(J.N(v)))),u,w)}else{y="2D texture mapping '"+H.m(z)+"' unknown"
$.t.$2(2,y)
x=new G.bd(1,1,0,0)}return new G.jx(x)},"$2","z6",4,0,29]}},
h_:{
"^":"b7;a,b",
J:function(a){var z,y,x,w
z=G.B(0,0,0)
y=G.B(0,0,0)
x=this.a.f4(0,a,z,y)
w=Math.abs(G.f9(x.i(0,0.1),z.i(0,0.1),y.i(0,0.1),0.5,3))*G.f9(x,z,y,0.5,6)
if(this.b)return G.q(w)
return w},
static:{CQ:[function(a,b){return new G.h_(new G.cB(a),!1)},"$2","z7",4,0,24],CR:[function(a,b){return new G.h_(new G.cB(a),!0)},"$2","z8",4,0,24]}},
h0:{
"^":"b7;a,b,c,d",
J:function(a){var z,y,x
z=G.B(0,0,0)
y=G.B(0,0,0)
x=G.uA(this.d.f4(0,a,z,y),z,y,this.a,this.b)
return this.c?G.q(x):x},
static:{CS:[function(a,b){var z=b.eW("octaves",8)
return new G.h0(b.c.m("roughness",b.d.m("roughness",0.5)),z,!1,new G.cB(a))},"$2","z9",4,0,23],CT:[function(a,b){var z=b.eW("octaves",8)
return new G.h0(b.c.m("roughness",b.d.m("roughness",0.5)),z,!0,new G.cB(a))},"$2","za",4,0,23]}}}],["","",,S,{
"^":"",
hI:{
"^":"mR;a,b,c",
bs:function(a,b,c){var z
C.c.H(b.f,1)
z=b.f
this.b=z.length-1
C.c.H(z,1)
this.c=b.f.length-1},
ak:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.c
y=[0]
x=[0]
if(z==null||!z.b7(c,y,x)||J.i(J.h(x[0],y[0]),0)){f.ce(1)
return G.q(0)}w=G.q(0)
v=this.a
u=J.dt(J.G(J.h(x[0],y[0]),v))
t=J.G(J.h(x[0],y[0]),u)
s=G.q(1)
r=c.fT(y[0])
new G.j(new Float32Array(H.k(3))).C(0,0,0)
q=J.M(c.b)
x=J.c(y[0],J.d(J.e(J.e(d.gdq(),this.c),0),t))
y[0]=x
for(p=0;p<u;++p,x=J.c(y[0],t),y[0]=x,r=o){o=new G.j(new Float32Array(H.n(c.a.j(0,J.d(c.b,x)).a)))
x=o.l(0,r)
n=c.e
m=c.f
l=new G.j(new Float32Array(H.n(r.a)))
x=new G.r(new Float32Array(H.n(x.a)))
if(typeof v!=="number")return H.b(v)
s=s.i(0,J.M(z.cZ(new G.aK(l,x,0,1,n,m),0.5*v,e.bZ())).dl())
if(s.aC()<0.001){if(e.a.P()>0.5){s.ce(0)
break}s=s.w(0,0.5)}w=w.j(0,s.i(0,z.ex(o,q,c.e)))}f.L(s)
return w.i(0,t)},
iz:function(a,b,c,d,e){var z,y,x
z=a.c
if(z==null)return G.q(1)
y=this.a
if(d!=null)x=J.e(J.e(d.gdq(),this.b),0)
else{if(typeof y!=="number")return H.b(y)
y=4*y
x=e.bZ()}return J.M(z.cZ(c,y,x)).dl()},
static:{zT:[function(a){return new S.hI(a.m("stepsize",1),null,null)},"$1","zd",2,0,132]}},
j6:{
"^":"mR;a,b,c",
iz:function(a,b,c,d,e){var z,y,x
z=a.c
if(z==null)return G.q(1)
y=this.a
if(d!=null)x=J.e(J.e(d.gdq(),this.b),0)
else{if(typeof y!=="number")return H.b(y)
y=4*y
x=e.bZ()}return J.M(z.cZ(c,y,x)).dl()},
bs:function(a,b,c){var z
C.c.H(b.f,1)
z=b.f
this.b=z.length-1
C.c.H(z,1)
this.c=b.f.length-1},
ak:function(b4,b5,b6,b7,b8,b9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3
z=b4.c
y=[0]
x=[0]
if(z==null||!z.b7(b6,y,x)||J.i(J.h(x[0],y[0]),0)){b9.ce(1)
return G.q(0)}w=G.q(0)
v=this.a
u=J.dt(J.G(J.h(x[0],y[0]),v))
t=J.G(J.h(x[0],y[0]),u)
s=G.q(1)
r=b6.fT(y[0])
q=J.M(b6.b)
y[0]=J.c(y[0],J.d(J.e(J.e(b7.gdq(),this.c),0),t))
x=H.k(u)
p=new Float32Array(x)
G.d8(1,u,p,b8)
o=H.k(u)
n=new Float32Array(o)
G.d8(1,u,n,b8)
m=H.k(2*u)
l=new Float32Array(m)
G.d9(1,u,l,b8)
for(k=b4.b,j=b4.a,i=0,h=0;h<u;++h,y[0]=J.c(y[0],t),r=f){g=y[0]
f=new G.j(new Float32Array(H.n(b6.a.j(0,J.d(b6.b,g)).a)))
g=f.l(0,r)
e=b6.e
d=b6.f
c=new G.j(new Float32Array(H.n(r.a)))
g=new G.r(new Float32Array(H.n(g.a)))
if(typeof v!=="number")return H.b(v)
s=s.i(0,J.M(z.cZ(new G.aK(c,g,0,1,e,d),0.5*v,b8.bZ())).dl())
if(s.aC()<0.001){if(b8.a.P()>0.5){s=G.q(0)
break}s=s.w(0,0.5)}w=w.j(0,s.i(0,z.ex(f,q,b6.e)))
b=z.eq(f,q,b6.e)
if(!b.Y()&&k.length!==0){a=k.length
if(i>=x)return H.a(p,i)
a0=P.X(J.a_(J.d(p[i],a)),a-1)
if(a0>>>0!==a0||a0>=k.length)return H.a(k,a0)
a1=k[a0]
a2=[0]
a3=new G.eO(null)
g=new Float32Array(3)
if(0>=3)return H.a(g,0)
g[0]=0
if(1>=3)return H.a(g,1)
g[1]=0
if(2>=3)return H.a(g,2)
g[2]=0
if(i>=o)return H.a(n,i)
e=n[i]
d=2*i
if(d>=m)return H.a(l,d)
c=l[d];++d
if(d>=m)return H.a(l,d)
d=l[d]
a4=new Float32Array(2)
if(0>=2)return H.a(a4,0)
a4[0]=e
if(1>=2)return H.a(a4,1)
a4[1]=c
a5=a1.bL(f,0,new G.c0(a4,d),b6.e,new G.r(g),a2,a3)
if(!a5.Y())if(a2[0]>0){a6=j.a5(a3.a)
e=$.$get$az()
e.c=J.c(e.c,1)
$.az=e
e=!a6}else e=!1
else e=!1
if(e){e=a3.a
d=new Float32Array(3)
if(0>=3)return H.a(d,0)
d[0]=0
if(1>=3)return H.a(d,1)
d[1]=0
if(2>=3)return H.a(d,2)
d[2]=0
c=new Float32Array(3)
if(0>=3)return H.a(c,0)
c[0]=0
if(1>=3)return H.a(c,1)
c[1]=0
if(2>=3)return H.a(c,2)
c[2]=0
a4=new Float32Array(3)
if(0>=3)return H.a(a4,0)
a4[0]=0
if(1>=3)return H.a(a4,1)
a4[1]=0
if(2>=3)return H.a(a4,2)
a4[2]=0
a7=new Float32Array(3)
if(0>=3)return H.a(a7,0)
a7[0]=0
if(1>=3)return H.a(a7,1)
a7[1]=0
if(2>=3)return H.a(a7,2)
a7[2]=0
a8=new Float32Array(H.n(e.a.a))
a9=new Float32Array(H.n(J.N(e.b)))
b0=e.c
b1=e.d
b2=e.e
e=e.f
a8=new G.j(new Float32Array(H.n(a8)))
a9=new G.r(new Float32Array(H.n(a9)))
b3=a5.i(0,b5.bj(b4,new G.as(!1,new G.j(d),new G.j(c),new G.r(a4),new G.r(a7),a8,a9,b0,b1,b2,e),null,b8))
e=s.i(0,b)
b2=g[0]
b1=g[1]
g=g[2]
d=new Float32Array(3)
if(0>=3)return H.a(d,0)
d[0]=-b2
if(1>=3)return H.a(d,1)
d[1]=-b1
if(2>=3)return H.a(d,2)
d[2]=-g
w=w.j(0,e.i(0,z.b9(0,f,q,new G.r(d),b6.e)).i(0,b3).i(0,a).w(0,a2[0]))}}++i}b9.L(s)
return w.i(0,t)},
static:{BH:[function(a){return new S.j6(a.m("stepsize",1),null,null)},"$1","ze",2,0,133]}}}],["","",,B,{
"^":"",
hL:{
"^":"kL;f,r,x,y,a,b,c,d,e",
aA:function(){var z=this.e
return G.Z(z.b,z.a).eg(this.f)},
b7:function(a,b,c){return this.f.b7(this.e.eh(a),b,c)},
fL:function(a){var z,y
z=this.f
if(!z.bV(a))return 0
y=G.J(a.l(0,z.a),this.y)
return J.d(this.r,Math.exp(H.v(J.d(J.M(this.x),y))))},
static:{zW:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=b.a8("sigma_a",G.q(0))
y=b.a8("sigma_s",G.q(0))
x=b.m("g",0)
w=b.a8("Le",G.q(0))
v=new G.j(new Float32Array(H.k(3)))
v.C(0,0,0)
u=b.bq("p0",v)
v=new G.j(new Float32Array(H.k(3)))
v.C(1,1,1)
t=b.bq("p1",v)
s=b.m("a",1)
r=b.m("b",1)
q=b.af("updir",G.B(0,1,0))
v=new B.hL(G.a9(u,t),s,r,null,G.am(z,0),G.am(y,0),G.am(w,0),x,G.Z(a.gan(),a.a))
p=J.D(q)
v.y=p.w(q,p.E(q))
return v},"$2","zf",4,0,134]}},
i_:{
"^":"jN;a,b,c,d,e,f",
aA:function(){var z=this.f
return G.Z(z.b,z.a).eg(this.e)},
b7:function(a,b,c){return this.e.b7(this.f.eh(a),b,c)},
eq:function(a,b,c){return this.e.bV(this.f.a1(a))?this.b:G.q(0)},
ex:function(a,b,c){return this.e.bV(this.f.a1(a))?this.c:G.q(0)},
b9:[function(a,b,c,d,e){if(!this.e.bV(this.f.a1(b)))return 0
return G.lM(c,d,this.d)},"$4","gau",8,0,12],
cZ:function(a,b,c){var z,y,x
z=[0]
y=[0]
if(!this.b7(a,z,y))return G.q(0)
x=J.c(this.a,this.b)
z=z[0]
z=new Float32Array(H.n(a.a.j(0,J.d(a.b,z)).a))
y=y[0]
return J.d(x,Math.sqrt(H.v(new G.j(new Float32Array(H.n(a.a.j(0,J.d(a.b,y)).a))).l(0,new G.j(z)).a_())))},
static:{As:[function(a,b){var z,y,x,w,v,u
z=b.a8("sigma_a",G.q(0))
y=b.a8("sigma_s",G.q(0))
x=b.m("g",0)
w=b.a8("Le",G.q(0))
v=new G.j(new Float32Array(H.k(3)))
v.C(0,0,0)
u=b.bq("p0",v)
v=new G.j(new Float32Array(H.k(3)))
v.C(1,1,1)
return new B.i_(z,y,w,x,G.a9(u,b.bq("p1",v)),G.Z(a.gan(),a.a))},"$2","zg",4,0,135]}},
jM:{
"^":"kL;f,r,x,y,z,a,b,c,d,e",
aA:function(){var z=this.e
return G.Z(z.b,z.a).eg(this.z)},
b7:function(a,b,c){return this.z.b7(this.e.eh(a),b,c)},
fL:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.z
if(!z.bV(a))return 0
z=z.kS(0,a).a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=this.r
if(typeof w!=="number")return H.b(w)
z[0]=x*w-0.5
if(1>=y)return H.a(z,1)
w=z[1]
x=this.x
if(typeof x!=="number")return H.b(x)
z[1]=w*x-0.5
if(2>=y)return H.a(z,2)
y=z[2]
x=this.y
if(typeof x!=="number")return H.b(x)
z[2]=y*x-0.5
v=C.b.I(Math.floor(z[0]))
u=C.b.I(Math.floor(z[1]))
t=C.b.I(Math.floor(z[2]))
s=z[0]-v
r=z[1]-u
q=z[2]-t
z=v+1
x=1-s
y=u+1
w=t+1
p=1-r
return((this.cK(v,u,t)*x+this.cK(z,u,t)*s)*p+(this.cK(v,y,t)*x+this.cK(z,y,t)*s)*r)*(1-q)+((this.cK(v,u,w)*x+this.cK(z,u,w)*s)*p+(this.cK(v,y,w)*x+this.cK(z,y,w)*s)*r)*q},
cK:function(a,b,c){var z,y,x
a=C.a.v(a,0,J.h(this.r,1))
b=C.a.v(b,0,J.h(this.x,1))
c=C.a.v(c,0,J.h(this.y,1))
z=this.f
y=this.r
if(typeof y!=="number")return H.b(y)
x=this.x
if(typeof x!=="number")return H.b(x)
y=c*y*x+b*y+a
if(y>>>0!==y||y>=z.length)return H.a(z,y)
return z[y]},
static:{CK:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=b.a8("sigma_a",G.q(0))
y=b.a8("sigma_s",G.q(0))
x=b.m("g",0)
w=b.a8("Le",G.q(0))
v=new G.j(new Float32Array(H.k(3)))
v.C(0,0,0)
u=b.bq("p0",v)
v=new G.j(new Float32Array(H.k(3)))
v.C(1,1,1)
t=b.bq("p1",v)
s=b.bA("density")
if(s==null){$.t.$2(2,"No 'density' values provided for volume grid?")
return}r=b.V("nx",1)
q=b.V("ny",1)
p=b.V("nz",1)
v=J.D(s)
o=J.w(r)
if(!J.i(v.gn(s),J.d(o.i(r,q),p))){v="VolumeGridDensity has "+H.m(v.gn(s))+" density values but nx*ny*nz = "+H.m(J.d(o.i(r,q),p))
$.t.$2(2,v)
return}v=G.a9(u,t)
return new B.jM(new Float64Array(H.n(s)),r,q,p,v,G.am(z,0),G.am(y,0),G.am(w,0),x,G.Z(a.gan(),a.a))},"$2","zh",4,0,136]}}}]]
setupProgram(dart,0)
J.O=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.lk.prototype
return J.lj.prototype}if(typeof a=="string")return J.ep.prototype
if(a==null)return J.ll.prototype
if(typeof a=="boolean")return J.qp.prototype
if(a.constructor==Array)return J.en.prototype
if(typeof a!="object")return a
if(a instanceof P.o)return a
return J.he(a)}
J.D=function(a){if(typeof a=="string")return J.ep.prototype
if(a==null)return a
if(a.constructor==Array)return J.en.prototype
if(typeof a!="object")return a
if(a instanceof P.o)return a
return J.he(a)}
J.aQ=function(a){if(a==null)return a
if(a.constructor==Array)return J.en.prototype
if(typeof a!="object")return a
if(a instanceof P.o)return a
return J.he(a)}
J.y=function(a){if(typeof a=="number")return J.eo.prototype
if(a==null)return a
if(!(a instanceof P.o))return J.fP.prototype
return a}
J.w=function(a){if(typeof a=="number")return J.eo.prototype
if(typeof a=="string")return J.ep.prototype
if(a==null)return a
if(!(a instanceof P.o))return J.fP.prototype
return a}
J.dr=function(a){if(typeof a=="string")return J.ep.prototype
if(a==null)return a
if(!(a instanceof P.o))return J.fP.prototype
return a}
J.C=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.o)return a
return J.he(a)}
J.c=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.w(a).j(a,b)}
J.W=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a&b)>>>0
return J.y(a).T(a,b)}
J.G=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.y(a).w(a,b)}
J.i=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.O(a).B(a,b)}
J.a7=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>=b
return J.y(a).av(a,b)}
J.F=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.y(a).a0(a,b)}
J.aG=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<=b
return J.y(a).ab(a,b)}
J.K=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.y(a).U(a,b)}
J.bW=function(a,b){return J.y(a).R(a,b)}
J.d=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.w(a).i(a,b)}
J.M=function(a){if(typeof a=="number")return-a
return J.y(a).a2(a)}
J.be=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a|b)>>>0
return J.y(a).h8(a,b)}
J.h=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.y(a).l(a,b)}
J.ac=function(a,b){return J.y(a).ar(a,b)}
J.e=function(a,b){if(a.constructor==Array||typeof a=="string"||H.nB(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.D(a).h(a,b)}
J.u=function(a,b,c){if((a.constructor==Array||H.nB(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.aQ(a).k(a,b,c)}
J.nM=function(a,b,c,d){return J.C(a).ne(a,b,c,d)}
J.nN=function(a,b,c,d){return J.C(a).pc(a,b,c,d)}
J.nO=function(a,b,c){return J.C(a).pf(a,b,c)}
J.af=function(a){return J.y(a).aW(a)}
J.nP=function(a,b){return J.aQ(a).H(a,b)}
J.km=function(a,b,c){return J.C(a).dT(a,b,c)}
J.hk=function(a,b,c){return J.C(a).ad(a,b,c)}
J.dt=function(a){return J.y(a).pF(a)}
J.aH=function(a){return J.y(a).cl(a)}
J.a4=function(a,b,c){return J.y(a).v(a,b,c)}
J.nQ=function(a,b){return J.w(a).cm(a,b)}
J.kn=function(a,b,c){return J.D(a).pM(a,b,c)}
J.ko=function(a,b){return J.aQ(a).bh(a,b)}
J.bX=function(a,b){return J.dr(a).c9(a,b)}
J.bY=function(a,b,c,d){return J.aQ(a).aF(a,b,c,d)}
J.a_=function(a){return J.y(a).X(a)}
J.nR=function(a,b){return J.aQ(a).b1(a,b)}
J.hl=function(a){return J.C(a).gdS(a)}
J.eZ=function(a){return J.C(a).gam(a)}
J.du=function(a){return J.C(a).gaE(a)}
J.nS=function(a){return J.dr(a).gko(a)}
J.e7=function(a){return J.C(a).gdY(a)}
J.N=function(a){return J.C(a).gA(a)}
J.c9=function(a){return J.C(a).geQ(a)}
J.kp=function(a){return J.C(a).gic(a)}
J.nT=function(a){return J.aQ(a).gat(a)}
J.aS=function(a){return J.O(a).gb2(a)}
J.cZ=function(a){return J.C(a).gM(a)}
J.f_=function(a){return J.D(a).ga6(a)}
J.dv=function(a){return J.y(a).gfP(a)}
J.bE=function(a){return J.D(a).gbd(a)}
J.cs=function(a){return J.aQ(a).gax(a)}
J.a0=function(a){return J.D(a).gn(a)}
J.at=function(a){return J.C(a).ga3(a)}
J.nU=function(a){return J.C(a).gdr(a)}
J.b8=function(a){return J.C(a).gau(a)}
J.nV=function(a){return J.C(a).gqZ(a)}
J.kq=function(a){return J.C(a).gaa(a)}
J.d_=function(a){return J.C(a).gN(a)}
J.V=function(a){return J.C(a).gG(a)}
J.S=function(a){return J.C(a).gF(a)}
J.P=function(a){return J.C(a).gS(a)}
J.kr=function(a,b,c){return J.aQ(a).bU(a,b,c)}
J.nW=function(a){return J.D(a).E(a)}
J.nX=function(a,b){return J.aQ(a).e6(a,b)}
J.nY=function(a,b,c,d,e){return J.C(a).b9(a,b,c,d,e)}
J.nZ=function(a){return J.aQ(a).qS(a)}
J.o_=function(a,b){return J.C(a).qY(a,b)}
J.bf=function(a,b){return J.C(a).fk(a,b)}
J.o0=function(a,b){return J.C(a).si_(a,b)}
J.hm=function(a,b){return J.D(a).sn(a,b)}
J.f0=function(a,b){return J.C(a).saz(a,b)}
J.hn=function(a,b,c,d,e){return J.aQ(a).aH(a,b,c,d,e)}
J.o1=function(a,b){return J.dr(a).iP(a,b)}
J.o2=function(a,b,c){return J.aQ(a).b5(a,b,c)}
J.e8=function(a){return J.y(a).dw(a)}
J.aW=function(a){return J.y(a).I(a)}
J.e9=function(a,b,c){return J.aQ(a).iy(a,b,c)}
J.aI=function(a){return J.dr(a).r8(a)}
J.ct=function(a){return J.O(a).K(a)}
J.o3=function(a){return J.dr(a).ld(a)}
I.f=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.aE=W.i0.prototype
C.c=J.en.prototype
C.d=J.lj.prototype
C.a=J.lk.prototype
C.J=J.ll.prototype
C.b=J.eo.prototype
C.i=J.ep.prototype
C.e=H.iD.prototype
C.w=H.r_.prototype
C.x=H.r3.prototype
C.j=H.iF.prototype
C.ju=W.r5.prototype
C.jv=J.ry.prototype
C.jw=J.fP.prototype
C.aC=new H.kR()
C.aD=new P.rb()
C.U=new P.vm()
C.V=new P.vI()
C.h=new P.vY()
C.a1=new P.bM(0)
C.aF=function() {
C.a2=function(hooks) { return hooks; }
C.aG=function(hooks) {
C.aH=function(hooks) {
C.aI=function(hooks) {
C.aJ=function(hooks) {
C.a3=function getTagFallback(o) {
C.aK=function(getTagFallback) {
C.W=I.f([U.xc(),U.xp(),U.xs(),U.xj(),U.xe(),U.xd(),U.xf()])
C.y=I.f([0,2,8])
C.aU=I.f([0,4,2,1])
C.H=I.f([1,2,0])
C.K=I.f([292,260,226,226])
C.z=I.f([8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8])
C.a5=I.f([2,1,2,1,2,2,0,0])
C.a4=I.f([137,80,78,71,13,10,26,10])
C.b1=I.f([2,0,1])
C.a6=I.f([2,3,7])
C.B=I.f([151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180,151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180])
C.be=I.f([3,3,11])
C.a8=I.f([511,1023,2047,4095])
C.a9=I.f([0,16,32,48,64,80,96,112,128,144,160,176,192,208,224,240,256,272,288,304,320,336,352,368,384,400,416,432,448,464,480,496,512,528,544,560,576,592,608,624,640,656,672,688,704,720,736,752,768,784,800,816,832,848,864,880,896,912,928,944,960,976,992,1008,1024,1040,1056,1072,1088,1104,1120,1136,1152,1168,1184,1200,1216,1232,1248,1264,1280,1296,1312,1328,1344,1360,1376,1392,1408,1424,1440,1456,1472,1488,1504,1520,1536,1552,1568,1584,1600,1616,1632,1648,1664,1680,1696,1712,1728,1744,1760,1776,1792,1808,1824,1840,1856,1872,1888,1904,1920,1936,1952,1968,1984,2000,2016,2032,2048,2064,2080,2096,2112,2128,2144,2160,2176,2192,2208,2224,2240,2256,2272,2288,2304,2320,2336,2352,2368,2384,2400,2416,2432,2448,2464,2480,2496,2512,2528,2544,2560,2576,2592,2608,2624,2640,2656,2672,2688,2704,2720,2736,2752,2768,2784,2800,2816,2832,2848,2864,2880,2896,2912,2928,2944,2960,2976,2992,3008,3024,3040,3056,3072,3088,3104,3120,3136,3152,3168,3184,3200,3216,3232,3248,3264,3280,3296,3312,3328,3344,3360,3376,3392,3408,3424,3440,3456,3472,3488,3504,3520,3536,3552,3568,3584,3600,3616,3632,3648,3664,3680,3696,3712,3728,3744,3760,3776,3792,3808,3824,3840,3856,3872,3888,3904,3920,3936,3952,3968,3984,4000,4016,4032,4048,4064,4080])
C.dl=I.f([231,120,48,89,115,113,120,152,112])
C.i4=I.f([152,179,64,126,170,118,46,70,95])
C.i5=I.f([175,69,143,80,85,82,72,155,103])
C.i6=I.f([56,58,10,171,218,189,17,13,152])
C.ii=I.f([114,26,17,163,44,195,21,10,173])
C.iu=I.f([121,24,80,195,26,62,44,64,85])
C.iF=I.f([144,71,10,38,171,213,144,34,26])
C.iQ=I.f([170,46,55,19,136,160,33,206,71])
C.j0=I.f([63,20,8,114,114,208,12,9,226])
C.jb=I.f([81,40,11,96,182,84,29,16,36])
C.hh=I.f([C.dl,C.i4,C.i5,C.i6,C.ii,C.iu,C.iF,C.iQ,C.j0,C.jb])
C.jm=I.f([134,183,89,137,98,101,106,165,148])
C.jo=I.f([72,187,100,130,157,111,32,75,80])
C.i7=I.f([66,102,167,99,74,62,40,234,128])
C.ff=I.f([41,53,9,178,241,141,26,8,107])
C.i8=I.f([74,43,26,146,73,166,49,23,157])
C.i9=I.f([65,38,105,160,51,52,31,115,128])
C.eq=I.f([104,79,12,27,217,255,87,17,7])
C.ia=I.f([87,68,71,44,114,51,15,186,23])
C.ib=I.f([47,41,14,110,182,183,21,17,194])
C.ic=I.f([66,45,25,102,197,189,23,18,22])
C.cI=I.f([C.jm,C.jo,C.i7,C.ff,C.i8,C.i9,C.eq,C.ia,C.ib,C.ic])
C.id=I.f([88,88,147,150,42,46,45,196,205])
C.ie=I.f([43,97,183,117,85,38,35,179,61])
C.ig=I.f([39,53,200,87,26,21,43,232,171])
C.ih=I.f([56,34,51,104,114,102,29,93,77])
C.ij=I.f([39,28,85,171,58,165,90,98,64])
C.ik=I.f([34,22,116,206,23,34,43,166,73])
C.il=I.f([107,54,32,26,51,1,81,43,31])
C.im=I.f([68,25,106,22,64,171,36,225,114])
C.io=I.f([34,19,21,102,132,188,16,76,124])
C.ip=I.f([62,18,78,95,85,57,50,48,51])
C.bX=I.f([C.id,C.ie,C.ig,C.ih,C.ij,C.ik,C.il,C.im,C.io,C.ip])
C.iq=I.f([193,101,35,159,215,111,89,46,111])
C.ir=I.f([60,148,31,172,219,228,21,18,111])
C.er=I.f([112,113,77,85,179,255,38,120,114])
C.fg=I.f([40,42,1,196,245,209,10,25,109])
C.is=I.f([88,43,29,140,166,213,37,43,154])
C.it=I.f([61,63,30,155,67,45,68,1,209])
C.iv=I.f([100,80,8,43,154,1,51,26,71])
C.fh=I.f([142,78,78,16,255,128,34,197,171])
C.iw=I.f([41,40,5,102,211,183,4,1,221])
C.ix=I.f([51,50,17,168,209,192,23,25,82])
C.cD=I.f([C.iq,C.ir,C.er,C.fg,C.is,C.it,C.iv,C.fh,C.iw,C.ix])
C.fi=I.f([138,31,36,171,27,166,38,44,229])
C.iy=I.f([67,87,58,169,82,115,26,59,179])
C.iz=I.f([63,59,90,180,59,166,93,73,154])
C.iA=I.f([40,40,21,116,143,209,34,39,175])
C.iB=I.f([47,15,16,183,34,223,49,45,183])
C.iC=I.f([46,17,33,183,6,98,15,32,183])
C.iD=I.f([57,46,22,24,128,1,54,17,37])
C.iE=I.f([65,32,73,115,28,128,23,128,205])
C.iG=I.f([40,3,9,115,51,192,18,6,223])
C.iH=I.f([87,37,9,115,59,77,64,21,47])
C.hx=I.f([C.fi,C.iy,C.iz,C.iA,C.iB,C.iC,C.iD,C.iE,C.iG,C.iH])
C.iI=I.f([104,55,44,218,9,54,53,130,226])
C.iJ=I.f([64,90,70,205,40,41,23,26,57])
C.iK=I.f([54,57,112,184,5,41,38,166,213])
C.iL=I.f([30,34,26,133,152,116,10,32,134])
C.fj=I.f([39,19,53,221,26,114,32,73,255])
C.iM=I.f([31,9,65,234,2,15,1,118,73])
C.es=I.f([75,32,12,51,192,255,160,43,51])
C.iN=I.f([88,31,35,67,102,85,55,186,85])
C.iO=I.f([56,21,23,111,59,205,45,37,192])
C.iP=I.f([55,38,70,124,73,102,1,34,98])
C.aL=I.f([C.iI,C.iJ,C.iK,C.iL,C.fj,C.iM,C.es,C.iN,C.iO,C.iP])
C.iR=I.f([125,98,42,88,104,85,117,175,82])
C.iS=I.f([95,84,53,89,128,100,113,101,45])
C.iT=I.f([75,79,123,47,51,128,81,171,1])
C.iU=I.f([57,17,5,71,102,57,53,41,49])
C.iV=I.f([38,33,13,121,57,73,26,1,85])
C.iW=I.f([41,10,67,138,77,110,90,47,114])
C.et=I.f([115,21,2,10,102,255,166,23,6])
C.iX=I.f([101,29,16,10,85,128,101,196,26])
C.iY=I.f([57,18,10,102,102,213,34,20,43])
C.iZ=I.f([117,20,15,36,163,128,68,1,26])
C.dM=I.f([C.iR,C.iS,C.iT,C.iU,C.iV,C.iW,C.et,C.iX,C.iY,C.iZ])
C.eT=I.f([102,61,71,37,34,53,31,243,192])
C.j_=I.f([69,60,71,38,73,119,28,222,37])
C.eU=I.f([68,45,128,34,1,47,11,245,171])
C.j1=I.f([62,17,19,70,146,85,55,62,70])
C.j2=I.f([37,43,37,154,100,163,85,160,1])
C.j3=I.f([63,9,92,136,28,64,32,201,85])
C.eu=I.f([75,15,9,9,64,255,184,119,16])
C.ev=I.f([86,6,28,5,64,255,25,248,1])
C.ew=I.f([56,8,17,132,137,255,55,116,128])
C.j4=I.f([58,15,20,82,135,57,26,121,40])
C.bq=I.f([C.eT,C.j_,C.eU,C.j1,C.j2,C.j3,C.eu,C.ev,C.ew,C.j4])
C.j5=I.f([164,50,31,137,154,133,25,35,218])
C.j6=I.f([51,103,44,131,131,123,31,6,158])
C.j7=I.f([86,40,64,135,148,224,45,183,128])
C.j8=I.f([22,26,17,131,240,154,14,1,209])
C.j9=I.f([45,16,21,91,64,222,7,1,197])
C.ja=I.f([56,21,39,155,60,138,23,102,213])
C.ex=I.f([83,12,13,54,192,255,68,47,28])
C.jc=I.f([85,26,85,85,128,128,32,146,171])
C.jd=I.f([18,11,7,63,144,171,4,4,246])
C.je=I.f([35,27,10,146,174,171,12,26,128])
C.dN=I.f([C.j5,C.j6,C.j7,C.j8,C.j9,C.ja,C.ex,C.jc,C.jd,C.je])
C.jf=I.f([190,80,35,99,180,80,126,54,45])
C.jg=I.f([85,126,47,87,176,51,41,20,32])
C.jh=I.f([101,75,128,139,118,146,116,128,85])
C.ji=I.f([56,41,15,176,236,85,37,9,62])
C.ey=I.f([71,30,17,119,118,255,17,18,138])
C.jj=I.f([101,38,60,138,55,70,43,26,142])
C.ez=I.f([146,36,19,30,171,255,97,27,20])
C.jk=I.f([138,45,61,62,219,1,81,188,64])
C.jl=I.f([32,41,20,117,151,142,20,21,163])
C.jn=I.f([112,19,12,61,195,128,48,4,24])
C.d9=I.f([C.jf,C.jg,C.jh,C.ji,C.ey,C.jj,C.ez,C.jk,C.jl,C.jn])
C.aa=I.f([C.hh,C.cI,C.bX,C.cD,C.hx,C.aL,C.dM,C.bq,C.dN,C.d9])
C.L=I.f([3226,6412,200,168,38,38,134,134,100,100,100,100,68,68,68,68])
C.bB=I.f([8,8,4,2])
C.ab=I.f([U.x7(),U.xn(),U.xq(),U.xh(),U.x9(),U.x8(),U.xa()])
C.C=I.f([4,5,6,7,8,9,10,10,11,12,13,14,15,16,17,17,18,19,20,20,21,21,22,22,23,23,24,25,25,26,27,28,29,30,31,32,33,34,35,36,37,37,38,39,40,41,42,43,44,45,46,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,76,77,78,79,80,81,82,83,84,85,86,87,88,89,91,93,95,96,98,100,101,102,104,106,108,110,112,114,116,118,122,124,126,128,130,132,134,136,138,140,143,145,148,151,154,157])
C.N=I.f([7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0])
C.M=I.f([80,88,23,71,30,30,62,62,4,4,4,4,4,4,4,4,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41])
C.bI=I.f([1.400313,1.38,1.358438,1.34,1.329063,1.325,1.3325,1.34,1.334375,1.325,1.317812,1.31,1.300313,1.29,1.281563,1.27,1.249062,1.225,1.2,1.18,1.174375,1.175,1.1775,1.18,1.178125,1.175,1.172812,1.17,1.165312,1.16,1.155312,1.15,1.142812,1.135,1.131562,1.12,1.092437,1.04,0.950375,0.826,0.645875,0.468,0.35125,0.272,0.230813,0.214,0.20925,0.213,0.21625,0.223,0.2365,0.25,0.254188,0.26,0.28,0.3])
C.ac=I.f([24,7,23,25,40,6,39,41,22,26,38,42,56,5,55,57,21,27,54,58,37,43,72,4,71,73,20,28,53,59,70,74,36,44,88,69,75,52,60,3,87,89,19,29,86,90,35,45,68,76,85,91,51,61,104,2,103,105,18,30,102,106,34,46,84,92,67,77,101,107,50,62,120,1,119,121,83,93,17,31,100,108,66,78,118,122,33,47,117,123,49,63,99,109,82,94,0,116,124,65,79,16,32,98,110,48,115,125,81,95,64,114,126,97,111,80,113,127,96,112])
C.u=I.f([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63])
C.D=I.f([4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,119,122,125,128,131,134,137,140,143,146,149,152,155,158,161,164,167,170,173,177,181,185,189,193,197,201,205,209,213,217,221,225,229,234,239,245,249,254,259,264,269,274,279,284])
C.r=I.f([0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918e3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117])
C.bV=I.f([1.041462802142675,1.0328661533771188,1.0126146228964314,1.035046052483621,1.0078661447098567,1.042228038508128,1.0442596738499825,1.0535238290294409,1.018077622693812,1.0442729908727713,1.052936254192075,1.0537034271160244,1.053390186921597,1.0537782700979574,1.0527093770467102,1.0530449040446797,1.0550554640191208,1.055367361072482,1.0454306634683976,0.623489506392308,0.18038071613188977,-0.007630375920198454,-0.00015217847035781367,-0.007510225734725831,-0.002170863932849147,0.0006591946660236964,0.01227881531853978,-0.004466977563720803,0.017119799082865147,0.00492110897597598,0.0058762925143334985,0.02525939941555008])
C.I=I.f([0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535,131071,262143,524287,1048575,2097151,4194303,8388607,16777215,33554431,67108863,134217727,268435455,536870911,1073741823,2147483647,4294967295])
C.o=I.f([0,79764919,159529838,222504665,319059676,398814059,445009330,507990021,638119352,583659535,797628118,726387553,890018660,835552979,1015980042,944750013,1276238704,1221641927,1167319070,1095957929,1595256236,1540665371,1452775106,1381403509,1780037320,1859660671,1671105958,1733955601,2031960084,2111593891,1889500026,1952343757,2552477408,2632100695,2443283854,2506133561,2334638140,2414271883,2191915858,2254759653,3190512472,3135915759,3081330742,3009969537,2905550212,2850959411,2762807018,2691435357,3560074640,3505614887,3719321342,3648080713,3342211916,3287746299,3467911202,3396681109,4063920168,4143685023,4223187782,4286162673,3779000052,3858754371,3904687514,3967668269,881225847,809987520,1023691545,969234094,662832811,591600412,771767749,717299826,311336399,374308984,453813921,533576470,25881363,88864420,134795389,214552010,2023205639,2086057648,1897238633,1976864222,1804852699,1867694188,1645340341,1724971778,1587496639,1516133128,1461550545,1406951526,1302016099,1230646740,1142491917,1087903418,2896545431,2825181984,2770861561,2716262478,3215044683,3143675388,3055782693,3001194130,2326604591,2389456536,2200899649,2280525302,2578013683,2640855108,2418763421,2498394922,3769900519,3832873040,3912640137,3992402750,4088425275,4151408268,4197601365,4277358050,3334271071,3263032808,3476998961,3422541446,3585640067,3514407732,3694837229,3640369242,1762451694,1842216281,1619975040,1682949687,2047383090,2127137669,1938468188,2001449195,1325665622,1271206113,1183200824,1111960463,1543535498,1489069629,1434599652,1363369299,622672798,568075817,748617968,677256519,907627842,853037301,1067152940,995781531,51762726,131386257,177728840,240578815,269590778,349224269,429104020,491947555,4046411278,4126034873,4172115296,4234965207,3794477266,3874110821,3953728444,4016571915,3609705398,3555108353,3735388376,3664026991,3290680682,3236090077,3449943556,3378572211,3174993278,3120533705,3032266256,2961025959,2923101090,2868635157,2813903052,2742672763,2604032198,2683796849,2461293480,2524268063,2284983834,2364738477,2175806836,2238787779,1569362073,1498123566,1409854455,1355396672,1317987909,1246755826,1192025387,1137557660,2072149281,2135122070,1912620623,1992383480,1753615357,1816598090,1627664531,1707420964,295390185,358241886,404320391,483945776,43990325,106832002,186451547,266083308,932423249,861060070,1041341759,986742920,613929101,542559546,756411363,701822548,3316196985,3244833742,3425377559,3370778784,3601682597,3530312978,3744426955,3689838204,3819031489,3881883254,3928223919,4007849240,4037393693,4100235434,4180117107,4259748804,2310601993,2373574846,2151335527,2231098320,2596047829,2659030626,2470359227,2550115596,2947551409,2876312838,2788305887,2733848168,3165939309,3094707162,3040238851,2985771188])
C.p=I.f([619,720,127,481,931,816,813,233,566,247,985,724,205,454,863,491,741,242,949,214,733,859,335,708,621,574,73,654,730,472,419,436,278,496,867,210,399,680,480,51,878,465,811,169,869,675,611,697,867,561,862,687,507,283,482,129,807,591,733,623,150,238,59,379,684,877,625,169,643,105,170,607,520,932,727,476,693,425,174,647,73,122,335,530,442,853,695,249,445,515,909,545,703,919,874,474,882,500,594,612,641,801,220,162,819,984,589,513,495,799,161,604,958,533,221,400,386,867,600,782,382,596,414,171,516,375,682,485,911,276,98,553,163,354,666,933,424,341,533,870,227,730,475,186,263,647,537,686,600,224,469,68,770,919,190,373,294,822,808,206,184,943,795,384,383,461,404,758,839,887,715,67,618,276,204,918,873,777,604,560,951,160,578,722,79,804,96,409,713,940,652,934,970,447,318,353,859,672,112,785,645,863,803,350,139,93,354,99,820,908,609,772,154,274,580,184,79,626,630,742,653,282,762,623,680,81,927,626,789,125,411,521,938,300,821,78,343,175,128,250,170,774,972,275,999,639,495,78,352,126,857,956,358,619,580,124,737,594,701,612,669,112,134,694,363,992,809,743,168,974,944,375,748,52,600,747,642,182,862,81,344,805,988,739,511,655,814,334,249,515,897,955,664,981,649,113,974,459,893,228,433,837,553,268,926,240,102,654,459,51,686,754,806,760,493,403,415,394,687,700,946,670,656,610,738,392,760,799,887,653,978,321,576,617,626,502,894,679,243,440,680,879,194,572,640,724,926,56,204,700,707,151,457,449,797,195,791,558,945,679,297,59,87,824,713,663,412,693,342,606,134,108,571,364,631,212,174,643,304,329,343,97,430,751,497,314,983,374,822,928,140,206,73,263,980,736,876,478,430,305,170,514,364,692,829,82,855,953,676,246,369,970,294,750,807,827,150,790,288,923,804,378,215,828,592,281,565,555,710,82,896,831,547,261,524,462,293,465,502,56,661,821,976,991,658,869,905,758,745,193,768,550,608,933,378,286,215,979,792,961,61,688,793,644,986,403,106,366,905,644,372,567,466,434,645,210,389,550,919,135,780,773,635,389,707,100,626,958,165,504,920,176,193,713,857,265,203,50,668,108,645,990,626,197,510,357,358,850,858,364,936,638])
C.O=I.f([0,1,2,3,6,4,5,6,6,6,6,6,6,6,6,7,0])
C.ad=I.f([null,U.xJ(),U.xK(),U.xI()])
C.k=I.f([380,390.967743,401.935486,412.903229,423.870972,434.838715,445.806458,456.7742,467.741943,478.709686,489.677429,500.645172,511.612915,522.580627,533.54834,544.516052,555.483765,566.451477,577.419189,588.386902,599.354614,610.322327,621.290039,632.257751,643.225464,654.193176,665.160889,676.128601,687.096313,698.064026,709.031738,720])
C.cJ=I.f([0.002775695896581197,0.003967382099064661,-0.0001460693678860675,0.00036198394557748065,-0.00025819258699309733,-0.000050133191628082274,-0.00024437242866157116,-0.00007806141994803895,0.04969030120754092,0.48515973574763166,1.029572585436059,1.0333210878457741,1.0368102644026933,1.0364884018886333,1.0365427939411784,1.036859540285454,1.0365645405660555,1.0363938240707142,1.0367205578770746,1.036523932944605,1.0361531226427443,1.0348785007827348,1.0042729660717318,0.8421848643235428,0.7375939489480157,0.6585315450029464,0.6053168244406628,0.5954979413242074,0.5941926127844314,0.5651768232663427,0.5606118601496856,0.5822861038101872])
C.cK=I.f([0.9920977146972068,0.9887642605936913,0.9953904074450564,0.9952931735300822,0.9918144741163395,1.0002584039673432,0.9996847843734251,0.9998812076665717,0.9850401214637043,0.7902984905303128,0.5608219861746397,0.3313345851399653,0.13692410840839175,0.01891490655966415,-0.000005112977093255089,-0.00042395493167891873,-0.00041934593101534273,0.0017473028136486615,0.0037999160177631316,-0.0005510147490658864,-0.000043716662898480967,0.00758745017487328,0.02579565078055402,0.03816837653250055,0.04948958640803083,0.049595992290102905,0.04981481950581225,0.03984091106497802,0.03050102493723387,0.02124305476524108,0.00695965321043564,0.0041733649330980525])
C.t=I.f([28679,28679,31752,-32759,-31735,-30711,-29687,-28663,29703,29703,30727,30727,-27639,-26615,-25591,-24567])
C.n=I.f([255,255,255,255,255,255,255,255,255,255,255])
C.A=I.f([C.n,C.n,C.n])
C.fE=I.f([176,246,255,255,255,255,255,255,255,255,255])
C.dn=I.f([223,241,252,255,255,255,255,255,255,255,255])
C.fX=I.f([249,253,253,255,255,255,255,255,255,255,255])
C.ca=I.f([C.fE,C.dn,C.fX])
C.fy=I.f([255,244,252,255,255,255,255,255,255,255,255])
C.hb=I.f([234,254,254,255,255,255,255,255,255,255,255])
C.as=I.f([253,255,255,255,255,255,255,255,255,255,255])
C.eK=I.f([C.fy,C.hb,C.as])
C.fz=I.f([255,246,254,255,255,255,255,255,255,255,255])
C.hC=I.f([239,253,254,255,255,255,255,255,255,255,255])
C.ah=I.f([254,255,254,255,255,255,255,255,255,255,255])
C.d_=I.f([C.fz,C.hC,C.ah])
C.aq=I.f([255,248,254,255,255,255,255,255,255,255,255])
C.hD=I.f([251,255,254,255,255,255,255,255,255,255,255])
C.jp=I.f([C.aq,C.hD,C.n])
C.a0=I.f([255,253,254,255,255,255,255,255,255,255,255])
C.fA=I.f([251,254,254,255,255,255,255,255,255,255,255])
C.bN=I.f([C.a0,C.fA,C.ah])
C.eE=I.f([255,254,253,255,254,255,255,255,255,255,255])
C.hv=I.f([250,255,254,255,254,255,255,255,255,255,255])
C.P=I.f([254,255,255,255,255,255,255,255,255,255,255])
C.bf=I.f([C.eE,C.hv,C.P])
C.ht=I.f([C.A,C.ca,C.eK,C.d_,C.jp,C.bN,C.bf,C.A])
C.cO=I.f([217,255,255,255,255,255,255,255,255,255,255])
C.fs=I.f([225,252,241,253,255,255,254,255,255,255,255])
C.hs=I.f([234,250,241,250,253,255,253,254,255,255,255])
C.cb=I.f([C.cO,C.fs,C.hs])
C.Y=I.f([255,254,255,255,255,255,255,255,255,255,255])
C.hc=I.f([223,254,254,255,255,255,255,255,255,255,255])
C.aM=I.f([238,253,254,254,255,255,255,255,255,255,255])
C.dk=I.f([C.Y,C.hc,C.aM])
C.cj=I.f([249,254,255,255,255,255,255,255,255,255,255])
C.hy=I.f([C.aq,C.cj,C.n])
C.fY=I.f([255,253,255,255,255,255,255,255,255,255,255])
C.ck=I.f([247,254,255,255,255,255,255,255,255,255,255])
C.cq=I.f([C.fY,C.ck,C.n])
C.cP=I.f([252,255,255,255,255,255,255,255,255,255,255])
C.h2=I.f([C.a0,C.cP,C.n])
C.ar=I.f([255,254,254,255,255,255,255,255,255,255,255])
C.fN=I.f([C.ar,C.as,C.n])
C.cl=I.f([255,254,253,255,255,255,255,255,255,255,255])
C.ae=I.f([250,255,255,255,255,255,255,255,255,255,255])
C.aZ=I.f([C.cl,C.ae,C.P])
C.bT=I.f([C.cb,C.dk,C.hy,C.cq,C.h2,C.fN,C.aZ,C.A])
C.dp=I.f([186,251,250,255,255,255,255,255,255,255,255])
C.aN=I.f([234,251,244,254,255,255,255,255,255,255,255])
C.cB=I.f([251,251,243,253,254,255,254,255,255,255,255])
C.hr=I.f([C.dp,C.aN,C.cB])
C.dq=I.f([236,253,254,255,255,255,255,255,255,255,255])
C.bG=I.f([251,253,253,254,254,255,255,255,255,255,255])
C.eA=I.f([C.a0,C.dq,C.bG])
C.hd=I.f([254,254,254,255,255,255,255,255,255,255,255])
C.eL=I.f([C.ar,C.hd,C.n])
C.fF=I.f([254,254,255,255,255,255,255,255,255,255,255])
C.d4=I.f([C.Y,C.fF,C.P])
C.aA=I.f([C.n,C.P,C.n])
C.d6=I.f([C.hr,C.eA,C.eL,C.d4,C.aA,C.A,C.A,C.A])
C.cQ=I.f([248,255,255,255,255,255,255,255,255,255,255])
C.bM=I.f([250,254,252,254,255,255,255,255,255,255,255])
C.fG=I.f([248,254,249,253,255,255,255,255,255,255,255])
C.eS=I.f([C.cQ,C.bM,C.fG])
C.fZ=I.f([255,253,253,255,255,255,255,255,255,255,255])
C.cR=I.f([246,253,253,255,255,255,255,255,255,255,255])
C.aO=I.f([252,254,251,254,254,255,255,255,255,255,255])
C.aP=I.f([C.fZ,C.cR,C.aO])
C.fB=I.f([255,254,252,255,255,255,255,255,255,255,255])
C.fH=I.f([248,254,253,255,255,255,255,255,255,255,255])
C.fu=I.f([253,255,254,254,255,255,255,255,255,255,255])
C.bR=I.f([C.fB,C.fH,C.fu])
C.hE=I.f([255,251,254,255,255,255,255,255,255,255,255])
C.hF=I.f([245,251,254,255,255,255,255,255,255,255,255])
C.hG=I.f([253,253,254,255,255,255,255,255,255,255,255])
C.hi=I.f([C.hE,C.hF,C.hG])
C.h_=I.f([255,251,253,255,255,255,255,255,255,255,255])
C.dr=I.f([252,253,254,255,255,255,255,255,255,255,255])
C.hk=I.f([C.h_,C.dr,C.Y])
C.cm=I.f([255,252,255,255,255,255,255,255,255,255,255])
C.hH=I.f([249,255,254,255,255,255,255,255,255,255,255])
C.hI=I.f([255,255,254,255,255,255,255,255,255,255,255])
C.bh=I.f([C.cm,C.hH,C.hI])
C.h0=I.f([255,255,253,255,255,255,255,255,255,255,255])
C.jq=I.f([C.h0,C.ae,C.n])
C.bw=I.f([C.eS,C.aP,C.bR,C.hi,C.hk,C.bh,C.jq,C.aA])
C.cL=I.f([C.ht,C.bT,C.d6,C.bw])
C.f=I.f([0.58,0.58,0.6,0.58,0.58,0.6,0.58,0.58,0.6,0.5,0.5,0.5,0.6,0.59,0.58,0.58,0.58,0.6,0.58,0.58,0.6,0.2,0.2,0.33,0.58,0.58,0.6])
C.d5=I.f([0.005574062292492087,-0.004798283163144679,-0.00525365642986138,-0.006457148004449971,-0.005969351465800701,-0.002183671603768672,0.016781120601055327,0.09609635542906264,0.21217357081986446,0.3616913329068507,0.5396101154323253,0.7440881049217151,0.9220957114839405,1.0460304298411225,1.0513824989063714,1.0511991822135085,1.0510530911991052,1.051739723036051,1.0516043086790485,1.051194403206146,1.0511590325868068,1.051661246548303,1.0514038526836869,1.0515941029228475,1.051146043696084,1.0515123758830476,1.0508871369510702,1.050892370810238,1.0477492815668303,1.0493272144017338,1.0435963333422726,1.0392280772051465])
C.d7=I.f([1.1334479663682135,1.1266762330194116,1.1346827504710164,1.1357395805744794,1.1356371830149636,1.1361152989346193,1.1362179057706772,1.1364819652587022,1.1355107110714324,1.1364060941199556,1.1360363621722465,1.1360122641141395,1.135426688246703,1.1363099407179136,1.1355450412632506,1.1353732327376378,1.1349496420726002,1.1111113947168556,0.9059874042972714,0.6116078078746533,0.29539752170999634,0.0959542006711501,-0.011650792030826267,-0.012144633073395025,-0.011148167569748318,-0.011997606668458151,-0.005050685547539485,-0.007998274581954215,-0.009472281770823642,-0.0055329541006658815,-0.004542891402827449,-0.012541015360921132])
C.d8=I.f([0.9942213815123685,0.9898693712297568,0.9829365828611696,0.9962786839985931,1.0198955019000133,1.016639550121036,1.0220913178757398,0.9965166604068244,1.0097766178917882,1.0215422470827016,0.6403195338779096,0.0025012379477078184,0.006533993955576994,0.0028334080462675826,-51209675389074505e-27,-0.009059229164664638,0.00339367183233312,-0.0030638741121828406,0.22203936168286292,0.6314114002481197,0.9748098557650096,0.9720956233359057,1.017377030286815,0.9987519432273413,0.9470172573960224,0.852586231543548,0.9489779858166084,0.9475187609652149,0.9959894419105979,0.8630135150380908,0.8915098785352314,0.8486649265284508])
C.af=I.f([0,1,3,7,15,31,63,127,255,511,1023,2047,4095])
C.X=I.f([128,128,128,128,128,128,128,128,128,128,128])
C.ao=I.f([C.X,C.X,C.X])
C.ec=I.f([253,136,254,255,228,219,128,128,128,128,128])
C.dU=I.f([189,129,242,255,227,213,255,219,128,128,128])
C.i_=I.f([106,126,227,252,214,209,255,255,128,128,128])
C.hY=I.f([C.ec,C.dU,C.i_])
C.cs=I.f([1,98,248,255,236,226,255,255,128,128,128])
C.ej=I.f([181,133,238,254,221,234,255,154,128,128,128])
C.dV=I.f([78,134,202,247,198,180,255,219,128,128,128])
C.eZ=I.f([C.cs,C.ej,C.dV])
C.cM=I.f([1,185,249,255,243,255,128,128,128,128,128])
C.f_=I.f([184,150,247,255,236,224,128,128,128,128,128])
C.c3=I.f([77,110,216,255,236,230,128,128,128,128,128])
C.dw=I.f([C.cM,C.f_,C.c3])
C.cN=I.f([1,101,251,255,241,255,128,128,128,128,128])
C.hJ=I.f([170,139,241,252,236,209,255,255,128,128,128])
C.dG=I.f([37,116,196,243,228,255,255,255,128,128,128])
C.co=I.f([C.cN,C.hJ,C.dG])
C.aY=I.f([1,204,254,255,245,255,128,128,128,128,128])
C.c4=I.f([207,160,250,255,238,128,128,128,128,128,128])
C.f0=I.f([102,103,231,255,211,171,128,128,128,128,128])
C.bj=I.f([C.aY,C.c4,C.f0])
C.hn=I.f([1,152,252,255,240,255,128,128,128,128,128])
C.f1=I.f([177,135,243,255,234,225,128,128,128,128,128])
C.c5=I.f([80,129,211,255,194,224,128,128,128,128,128])
C.bA=I.f([C.hn,C.f1,C.c5])
C.a7=I.f([1,1,255,128,128,128,128,128,128,128,128])
C.b2=I.f([246,1,255,128,128,128,128,128,128,128,128])
C.aV=I.f([255,128,128,128,128,128,128,128,128,128,128])
C.dh=I.f([C.a7,C.b2,C.aV])
C.b_=I.f([C.ao,C.hY,C.eZ,C.dw,C.co,C.bj,C.bA,C.dh])
C.b3=I.f([198,35,237,223,193,187,162,160,145,155,62])
C.b0=I.f([131,45,198,221,172,176,220,157,252,221,1])
C.fa=I.f([68,47,146,208,149,167,221,162,255,223,128])
C.bP=I.f([C.b3,C.b0,C.fa])
C.h3=I.f([1,149,241,255,221,224,255,255,128,128,128])
C.dW=I.f([184,141,234,253,222,220,255,199,128,128,128])
C.fm=I.f([81,99,181,242,176,190,249,202,255,255,128])
C.cp=I.f([C.h3,C.dW,C.fm])
C.fS=I.f([1,129,232,253,214,197,242,196,255,255,128])
C.ek=I.f([99,121,210,250,201,198,255,202,128,128,128])
C.fn=I.f([23,91,163,242,170,187,247,210,255,255,128])
C.jr=I.f([C.fS,C.ek,C.fn])
C.ho=I.f([1,200,246,255,234,255,128,128,128,128,128])
C.dI=I.f([109,178,241,255,231,245,255,255,128,128,128])
C.ct=I.f([44,130,201,253,205,192,255,255,128,128,128])
C.d3=I.f([C.ho,C.dI,C.ct])
C.fL=I.f([1,132,239,251,219,209,255,165,128,128,128])
C.cu=I.f([94,136,225,251,218,190,255,255,128,128,128])
C.dX=I.f([22,100,174,245,186,161,255,199,128,128,128])
C.eX=I.f([C.fL,C.cu,C.dX])
C.hU=I.f([1,182,249,255,232,235,128,128,128,128,128])
C.f2=I.f([124,143,241,255,227,234,128,128,128,128,128])
C.dY=I.f([35,77,181,251,193,211,255,205,128,128,128])
C.ha=I.f([C.hU,C.f2,C.dY])
C.du=I.f([1,157,247,255,236,231,255,255,128,128,128])
C.h4=I.f([121,141,235,255,225,227,255,255,128,128,128])
C.dZ=I.f([45,99,188,251,195,217,255,224,128,128,128])
C.bH=I.f([C.du,C.h4,C.dZ])
C.hV=I.f([1,1,251,255,213,255,128,128,128,128,128])
C.ee=I.f([203,1,248,255,255,128,128,128,128,128,128])
C.hp=I.f([137,1,177,255,224,255,128,128,128,128,128])
C.ds=I.f([C.hV,C.ee,C.hp])
C.cr=I.f([C.bP,C.cp,C.jr,C.d3,C.eX,C.ha,C.bH,C.ds])
C.fV=I.f([253,9,248,251,207,208,255,192,128,128,128])
C.eN=I.f([175,13,224,243,193,185,249,198,255,255,128])
C.fb=I.f([73,17,171,221,161,179,236,167,255,234,128])
C.aQ=I.f([C.fV,C.eN,C.fb])
C.h5=I.f([1,95,247,253,212,183,255,255,128,128,128])
C.h6=I.f([239,90,244,250,211,209,255,255,128,128,128])
C.i0=I.f([155,77,195,248,188,195,255,255,128,128,128])
C.db=I.f([C.h5,C.h6,C.i0])
C.fM=I.f([1,24,239,251,218,219,255,205,128,128,128])
C.c6=I.f([201,51,219,255,196,186,128,128,128,128,128])
C.e_=I.f([69,46,190,239,201,218,255,228,128,128,128])
C.eR=I.f([C.fM,C.c6,C.e_])
C.bD=I.f([1,191,251,255,255,128,128,128,128,128,128])
C.hW=I.f([223,165,249,255,213,255,128,128,128,128,128])
C.ef=I.f([141,124,248,255,255,128,128,128,128,128,128])
C.bZ=I.f([C.bD,C.hW,C.ef])
C.eg=I.f([1,16,248,255,255,128,128,128,128,128,128])
C.hq=I.f([190,36,230,255,236,255,128,128,128,128,128])
C.b4=I.f([149,1,255,128,128,128,128,128,128,128,128])
C.dB=I.f([C.eg,C.hq,C.b4])
C.b5=I.f([1,226,255,128,128,128,128,128,128,128,128])
C.cE=I.f([247,192,255,128,128,128,128,128,128,128,128])
C.b6=I.f([240,128,255,128,128,128,128,128,128,128,128])
C.hM=I.f([C.b5,C.cE,C.b6])
C.eh=I.f([1,134,252,255,255,128,128,128,128,128,128])
C.ei=I.f([213,62,250,255,255,128,128,128,128,128,128])
C.b7=I.f([55,93,255,128,128,128,128,128,128,128,128])
C.cX=I.f([C.eh,C.ei,C.b7])
C.cU=I.f([C.aQ,C.db,C.eR,C.bZ,C.dB,C.hM,C.cX,C.ao])
C.dK=I.f([202,24,213,235,186,191,220,160,240,175,255])
C.fc=I.f([126,38,182,232,169,184,228,174,255,187,128])
C.fd=I.f([61,46,138,219,151,178,240,170,255,216,128])
C.hN=I.f([C.dK,C.fc,C.fd])
C.fo=I.f([1,112,230,250,199,191,247,159,255,255,128])
C.el=I.f([166,109,228,252,211,215,255,174,128,128,128])
C.fp=I.f([39,77,162,232,172,180,245,178,255,255,128])
C.dt=I.f([C.fo,C.el,C.fp])
C.fq=I.f([1,52,220,246,198,199,249,220,255,255,128])
C.fT=I.f([124,74,191,243,183,193,250,221,255,255,128])
C.fr=I.f([24,71,130,219,154,170,243,182,255,255,128])
C.eW=I.f([C.fq,C.fT,C.fr])
C.e0=I.f([1,182,225,249,219,240,255,224,128,128,128])
C.em=I.f([149,150,226,252,216,205,255,171,128,128,128])
C.dE=I.f([28,108,170,242,183,194,254,223,255,255,128])
C.cY=I.f([C.e0,C.em,C.dE])
C.en=I.f([1,81,230,252,204,203,255,192,128,128,128])
C.cv=I.f([123,102,209,247,188,196,255,233,128,128,128])
C.e1=I.f([20,95,153,243,164,173,255,203,128,128,128])
C.bS=I.f([C.en,C.cv,C.e1])
C.c7=I.f([1,222,248,255,216,213,128,128,128,128,128])
C.cy=I.f([168,175,246,252,235,205,255,255,128,128,128])
C.cw=I.f([47,116,215,255,211,212,255,255,128,128,128])
C.dg=I.f([C.c7,C.cy,C.cw])
C.cx=I.f([1,121,236,253,212,214,255,255,128,128,128])
C.eo=I.f([141,84,213,252,201,202,255,219,128,128,128])
C.ep=I.f([42,80,160,240,162,185,255,205,128,128,128])
C.hX=I.f([C.cx,C.eo,C.ep])
C.b8=I.f([244,1,255,128,128,128,128,128,128,128,128])
C.b9=I.f([238,1,255,128,128,128,128,128,128,128,128])
C.d0=I.f([C.a7,C.b8,C.b9])
C.hj=I.f([C.hN,C.dt,C.eW,C.cY,C.bS,C.dg,C.hX,C.d0])
C.dc=I.f([C.b_,C.cr,C.cU,C.hj])
C.ag=I.f([0.0006061,0.0006808792,0.0007651456,0.0008600124,0.0009665928,0.001086,0.001220586,0.001372729,0.001543579,0.001734286,0.001946,0.002177777,0.002435809,0.002731953,0.003078064,0.003486,0.003975227,0.00454088,0.00515832,0.005802907,0.006450001,0.007083216,0.007745488,0.008501152,0.009414544,0.01054999,0.0119658,0.01365587,0.01558805,0.01773015,0.02005001,0.02251136,0.02520288,0.02827972,0.03189704,0.03621,0.04143771,0.04750372,0.05411988,0.06099803,0.06785001,0.07448632,0.08136156,0.08915364,0.09854048,0.1102,0.1246133,0.1417017,0.1613035,0.1832568,0.2074,0.2336921,0.2626114,0.2947746,0.3307985,0.3713,0.4162091,0.4654642,0.5196948,0.5795303,0.6456,0.7184838,0.7967133,0.8778459,0.959439,1.0390501,1.1153673,1.1884971,1.2581233,1.3239296,1.3856,1.4426352,1.4948035,1.5421903,1.5848807,1.62296,1.6564048,1.6852959,1.7098745,1.7303821,1.74706,1.7600446,1.7696233,1.7762637,1.7804334,1.7826,1.7829682,1.7816998,1.7791982,1.7758671,1.77211,1.7682589,1.764039,1.7589438,1.7524663,1.7441,1.7335595,1.7208581,1.7059369,1.6887372,1.6692,1.6475287,1.6234127,1.5960223,1.564528,1.5281,1.4861114,1.4395215,1.3898799,1.3387362,1.28764,1.2374223,1.1878243,1.1387611,1.090148,1.0419,0.9941976,0.9473473,0.9014531,0.8566193,0.8129501,0.7705173,0.7294448,0.6899136,0.6521049,0.6162,0.5823286,0.5504162,0.5203376,0.4919673,0.46518,0.4399246,0.4161836,0.3938822,0.3729459,0.3533,0.3348578,0.3175521,0.3013375,0.2861686,0.272,0.2588171,0.2464838,0.2347718,0.2234533,0.2123,0.2011692,0.1901196,0.1792254,0.1685608,0.1582,0.1481383,0.1383758,0.1289942,0.1200751,0.1117,0.1039048,0.09666748,0.08998272,0.08384531,0.07824999,0.07320899,0.06867816,0.06456784,0.06078835,0.05725001,0.05390435,0.05074664,0.04775276,0.04489859,0.04216,0.03950728,0.03693564,0.03445836,0.03208872,0.02984,0.02771181,0.02569444,0.02378716,0.02198925,0.0203,0.01871805,0.01724036,0.01586364,0.01458461,0.0134,0.01230723,0.01130188,0.01037792,0.009529306,0.008749999,0.0080352,0.0073816,0.0067854,0.0062428,0.005749999,0.0053036,0.0048998,0.0045342,0.0042024,0.0039,0.0036232,0.0033706,0.0031414,0.0029348,0.002749999,0.0025852,0.0024386,0.0023094,0.0021968,0.0021,0.002017733,0.0019482,0.0018898,0.001840933,0.0018,0.001766267,0.0017378,0.0017112,0.001683067,0.001650001,0.001610133,0.0015644,0.0015136,0.001458533,0.0014,0.001336667,0.00127,0.001205,0.001146667,0.0011,0.0010688,0.0010494,0.0010356,0.0010212,0.001,0.00096864,0.00092992,0.00088688,0.00084256,0.0008,0.00076096,0.00072368,0.00068592,0.00064544,0.0006,0.0005478667,0.0004916,0.0004354,0.0003834667,0.00034,0.0003072533,0.00028316,0.00026544,0.0002518133,0.00024,0.0002295467,0.00022064,0.00021196,0.0002021867,0.00019,0.0001742133,0.00015564,0.00013596,0.0001168533,0.0001,0.00008613333,0.0000746,0.000065,0.00005693333,0.00004999999,0.00004416,0.00003948,0.00003572,0.00003264,0.00003,0.00002765333,0.00002556,0.00002364,0.00002181333,0.00002,0.00001813333,0.0000162,0.0000142,0.00001213333,0.00001,0.000007733333,0.0000054,0.0000032,0.000001333333,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
C.de=I.f([0.1657560486708618,0.11846442802747797,0.12408293329637447,0.11371272058349924,0.07899243451889913,0.03220560359310655,-0.010798365407877875,0.018051975516730392,0.005340719659873053,0.013654918729501336,-0.005956421354564284,-0.0018444365067353252,-0.010571884361529504,-0.002937552107800001,-0.010790476271835936,-0.008022430669750363,-0.002266916770249594,0.007020024049470663,-0.00815284690002993,0.6077286696925279,0.988315608654324,0.9939169104407882,1.0039338994753197,0.9923449986116712,0.9992653085885552,1.008462155761727,0.9835829682744122,1.0085023660099048,0.974511383265687,0.9854326957005994,0.9349576398096204,0.987139077923194])
C.E=I.f([360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528,529,530,531,532,533,534,535,536,537,538,539,540,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,599,600,601,602,603,604,605,606,607,608,609,610,611,612,613,614,615,616,617,618,619,620,621,622,623,624,625,626,627,628,629,630,631,632,633,634,635,636,637,638,639,640,641,642,643,644,645,646,647,648,649,650,651,652,653,654,655,656,657,658,659,660,661,662,663,664,665,666,667,668,669,670,671,672,673,674,675,676,677,678,679,680,681,682,683,684,685,686,687,688,689,690,691,692,693,694,695,696,697,698,699,700,701,702,703,704,705,706,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745,746,747,748,749,750,751,752,753,754,755,756,757,758,759,760,761,762,763,764,765,766,767,768,769,770,771,772,773,774,775,776,777,778,779,780,781,782,783,784,785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,801,802,803,804,805,806,807,808,809,810,811,812,813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830])
C.Q=I.f(["INFO","WARNING","ERROR","SEVERE","DEBUG"])
C.ai=I.f([-2872,-2849,-2827,-2804,-2782,-2760,-2737,-2715,-2692,-2670,-2647,-2625,-2603,-2580,-2558,-2535,-2513,-2490,-2468,-2446,-2423,-2401,-2378,-2356,-2333,-2311,-2289,-2266,-2244,-2221,-2199,-2176,-2154,-2132,-2109,-2087,-2064,-2042,-2019,-1997,-1975,-1952,-1930,-1907,-1885,-1862,-1840,-1817,-1795,-1773,-1750,-1728,-1705,-1683,-1660,-1638,-1616,-1593,-1571,-1548,-1526,-1503,-1481,-1459,-1436,-1414,-1391,-1369,-1346,-1324,-1302,-1279,-1257,-1234,-1212,-1189,-1167,-1145,-1122,-1100,-1077,-1055,-1032,-1010,-988,-965,-943,-920,-898,-875,-853,-830,-808,-786,-763,-741,-718,-696,-673,-651,-629,-606,-584,-561,-539,-516,-494,-472,-449,-427,-404,-382,-359,-337,-315,-292,-270,-247,-225,-202,-180,-158,-135,-113,-90,-68,-45,-23,0,22,44,67,89,112,134,157,179,201,224,246,269,291,314,336,358,381,403,426,448,471,493,515,538,560,583,605,628,650,672,695,717,740,762,785,807,829,852,874,897,919,942,964,987,1009,1031,1054,1076,1099,1121,1144,1166,1188,1211,1233,1256,1278,1301,1323,1345,1368,1390,1413,1435,1458,1480,1502,1525,1547,1570,1592,1615,1637,1659,1682,1704,1727,1749,1772,1794,1816,1839,1861,1884,1906,1929,1951,1974,1996,2018,2041,2063,2086,2108,2131,2153,2175,2198,2220,2243,2265,2288,2310,2332,2355,2377,2400,2422,2445,2467,2489,2512,2534,2557,2579,2602,2624,2646,2669,2691,2714,2736,2759,2781,2804,2826,2848])
C.dv=I.f([0.8862268925,1.0233267546,0.495415926,0,-0.110778369,0,0.0499271341,0,-0.0285469331,0,0.0185080823,0,-0.0129818395,0,0.0096125342,0,-0.0074057109,0])
C.R=I.f([6430,6400,6400,6400,3225,3225,3225,3225,944,944,944,944,976,976,976,976,1456,1456,1456,1456,1488,1488,1488,1488,718,718,718,718,718,718,718,718,750,750,750,750,750,750,750,750,1520,1520,1520,1520,1552,1552,1552,1552,428,428,428,428,428,428,428,428,428,428,428,428,428,428,428,428,654,654,654,654,654,654,654,654,1072,1072,1072,1072,1104,1104,1104,1104,1136,1136,1136,1136,1168,1168,1168,1168,1200,1200,1200,1200,1232,1232,1232,1232,622,622,622,622,622,622,622,622,1008,1008,1008,1008,1040,1040,1040,1040,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,1712,1712,1712,1712,1744,1744,1744,1744,846,846,846,846,846,846,846,846,1264,1264,1264,1264,1296,1296,1296,1296,1328,1328,1328,1328,1360,1360,1360,1360,1392,1392,1392,1392,1424,1424,1424,1424,686,686,686,686,686,686,686,686,910,910,910,910,910,910,910,910,1968,1968,1968,1968,2000,2000,2000,2000,2032,2032,2032,2032,16,16,16,16,10257,10257,10257,10257,12305,12305,12305,12305,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,878,878,878,878,878,878,878,878,1904,1904,1904,1904,1936,1936,1936,1936,-18413,-18413,-16365,-16365,-14317,-14317,-10221,-10221,590,590,590,590,590,590,590,590,782,782,782,782,782,782,782,782,1584,1584,1584,1584,1616,1616,1616,1616,1648,1648,1648,1648,1680,1680,1680,1680,814,814,814,814,814,814,814,814,1776,1776,1776,1776,1808,1808,1808,1808,1840,1840,1840,1840,1872,1872,1872,1872,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,14353,14353,14353,14353,16401,16401,16401,16401,22547,22547,24595,24595,20497,20497,20497,20497,18449,18449,18449,18449,26643,26643,28691,28691,30739,30739,-32749,-32749,-30701,-30701,-28653,-28653,-26605,-26605,-24557,-24557,-22509,-22509,-20461,-20461,8207,8207,8207,8207,8207,8207,8207,8207,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,524,524,524,524,524,524,524,524,524,524,524,524,524,524,524,524,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,492,492,492,492,492,492,492,492,492,492,492,492,492,492,492,492,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232])
C.m=I.f([0,-128,64,-64,32,-96,96,-32,16,-112,80,-48,48,-80,112,-16,8,-120,72,-56,40,-88,104,-24,24,-104,88,-40,56,-72,120,-8,4,-124,68,-60,36,-92,100,-28,20,-108,84,-44,52,-76,116,-12,12,-116,76,-52,44,-84,108,-20,28,-100,92,-36,60,-68,124,-4,2,-126,66,-62,34,-94,98,-30,18,-110,82,-46,50,-78,114,-14,10,-118,74,-54,42,-86,106,-22,26,-102,90,-38,58,-70,122,-6,6,-122,70,-58,38,-90,102,-26,22,-106,86,-42,54,-74,118,-10,14,-114,78,-50,46,-82,110,-18,30,-98,94,-34,62,-66,126,-2,1,-127,65,-63,33,-95,97,-31,17,-111,81,-47,49,-79,113,-15,9,-119,73,-55,41,-87,105,-23,25,-103,89,-39,57,-71,121,-7,5,-123,69,-59,37,-91,101,-27,21,-107,85,-43,53,-75,117,-11,13,-115,77,-51,45,-83,109,-19,29,-99,93,-35,61,-67,125,-3,3,-125,67,-61,35,-93,99,-29,19,-109,83,-45,51,-77,115,-13,11,-117,75,-53,43,-85,107,-21,27,-101,91,-37,59,-69,123,-5,7,-121,71,-57,39,-89,103,-25,23,-105,87,-41,55,-73,119,-9,15,-113,79,-49,47,-81,111,-17,31,-97,95,-33,63,-65,127,-1])
C.F=I.f([5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5])
C.dD=I.f([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13])
C.S=I.f([-0.0,1,-1,2,-2,3,4,6,-3,5,-4,-5,-6,7,-7,8,-8,-9])
C.dR=I.f([1.0570490759328752,1.05384669128513,1.055049425814067,1.0530407754701832,1.0579930596460185,1.057843949481237,1.0583132387180239,1.0579712943137616,1.0561884233578465,1.057139928542649,1.0425795187752152,0.326030843740561,-0.0019255628442412243,-0.0012959221137046478,-0.0014357356276938696,-0.0012963697250337886,-0.00192270811623739,0.0012621152526221778,-0.0016095249003578276,-0.0013029983817879568,-0.0017666600873954916,-0.001232528114028005,0.010316809673254932,0.03128451264835436,0.08877387988174648,0.1387362174023654,0.15535067531939065,0.1487847717823703,0.16624255403475907,0.16997613960634927,0.15769743995852967,0.19069090525482305])
C.aj=I.f([2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997,1009,1013,1019,1021,1031,1033,1039,1049,1051,1061,1063,1069,1087,1091,1093,1097,1103,1109,1117,1123,1129,1151,1153,1163,1171,1181,1187,1193,1201,1213,1217,1223,1229,1231,1237,1249,1259,1277,1279,1283,1289,1291,1297,1301,1303,1307,1319,1321,1327,1361,1367,1373,1381,1399,1409,1423,1427,1429,1433,1439,1447,1451,1453,1459,1471,1481,1483,1487,1489,1493,1499,1511,1523,1531,1543,1549,1553,1559,1567,1571,1579,1583,1597,1601,1607,1609,1613,1619,1621,1627,1637,1657,1663,1667,1669,1693,1697,1699,1709,1721,1723,1733,1741,1747,1753,1759,1777,1783,1787,1789,1801,1811,1823,1831,1847,1861,1867,1871,1873,1877,1879,1889,1901,1907,1913,1931,1933,1949,1951,1973,1979,1987,1993,1997,1999,2003,2011,2017,2027,2029,2039,2053,2063,2069,2081,2083,2087,2089,2099,2111,2113,2129,2131,2137,2141,2143,2153,2161,2179,2203,2207,2213,2221,2237,2239,2243,2251,2267,2269,2273,2281,2287,2293,2297,2309,2311,2333,2339,2341,2347,2351,2357,2371,2377,2381,2383,2389,2393,2399,2411,2417,2423,2437,2441,2447,2459,2467,2473,2477,2503,2521,2531,2539,2543,2549,2551,2557,2579,2591,2593,2609,2617,2621,2633,2647,2657,2659,2663,2671,2677,2683,2687,2689,2693,2699,2707,2711,2713,2719,2729,2731,2741,2749,2753,2767,2777,2789,2791,2797,2801,2803,2819,2833,2837,2843,2851,2857,2861,2879,2887,2897,2903,2909,2917,2927,2939,2953,2957,2963,2969,2971,2999,3001,3011,3019,3023,3037,3041,3049,3061,3067,3079,3083,3089,3109,3119,3121,3137,3163,3167,3169,3181,3187,3191,3203,3209,3217,3221,3229,3251,3253,3257,3259,3271,3299,3301,3307,3313,3319,3323,3329,3331,3343,3347,3359,3361,3371,3373,3389,3391,3407,3413,3433,3449,3457,3461,3463,3467,3469,3491,3499,3511,3517,3527,3529,3533,3539,3541,3547,3557,3559,3571,3581,3583,3593,3607,3613,3617,3623,3631,3637,3643,3659,3671,3673,3677,3691,3697,3701,3709,3719,3727,3733,3739,3761,3767,3769,3779,3793,3797,3803,3821,3823,3833,3847,3851,3853,3863,3877,3881,3889,3907,3911,3917,3919,3923,3929,3931,3943,3947,3967,3989,4001,4003,4007,4013,4019,4021,4027,4049,4051,4057,4073,4079,4091,4093,4099,4111,4127,4129,4133,4139,4153,4157,4159,4177,4201,4211,4217,4219,4229,4231,4241,4243,4253,4259,4261,4271,4273,4283,4289,4297,4327,4337,4339,4349,4357,4363,4373,4391,4397,4409,4421,4423,4441,4447,4451,4457,4463,4481,4483,4493,4507,4513,4517,4519,4523,4547,4549,4561,4567,4583,4591,4597,4603,4621,4637,4639,4643,4649,4651,4657,4663,4673,4679,4691,4703,4721,4723,4729,4733,4751,4759,4783,4787,4789,4793,4799,4801,4813,4817,4831,4861,4871,4877,4889,4903,4909,4919,4931,4933,4937,4943,4951,4957,4967,4969,4973,4987,4993,4999,5003,5009,5011,5021,5023,5039,5051,5059,5077,5081,5087,5099,5101,5107,5113,5119,5147,5153,5167,5171,5179,5189,5197,5209,5227,5231,5233,5237,5261,5273,5279,5281,5297,5303,5309,5323,5333,5347,5351,5381,5387,5393,5399,5407,5413,5417,5419,5431,5437,5441,5443,5449,5471,5477,5479,5483,5501,5503,5507,5519,5521,5527,5531,5557,5563,5569,5573,5581,5591,5623,5639,5641,5647,5651,5653,5657,5659,5669,5683,5689,5693,5701,5711,5717,5737,5741,5743,5749,5779,5783,5791,5801,5807,5813,5821,5827,5839,5843,5849,5851,5857,5861,5867,5869,5879,5881,5897,5903,5923,5927,5939,5953,5981,5987,6007,6011,6029,6037,6043,6047,6053,6067,6073,6079,6089,6091,6101,6113,6121,6131,6133,6143,6151,6163,6173,6197,6199,6203,6211,6217,6221,6229,6247,6257,6263,6269,6271,6277,6287,6299,6301,6311,6317,6323,6329,6337,6343,6353,6359,6361,6367,6373,6379,6389,6397,6421,6427,6449,6451,6469,6473,6481,6491,6521,6529,6547,6551,6553,6563,6569,6571,6577,6581,6599,6607,6619,6637,6653,6659,6661,6673,6679,6689,6691,6701,6703,6709,6719,6733,6737,6761,6763,6779,6781,6791,6793,6803,6823,6827,6829,6833,6841,6857,6863,6869,6871,6883,6899,6907,6911,6917,6947,6949,6959,6961,6967,6971,6977,6983,6991,6997,7001,7013,7019,7027,7039,7043,7057,7069,7079,7103,7109,7121,7127,7129,7151,7159,7177,7187,7193,7207,7211,7213,7219,7229,7237,7243,7247,7253,7283,7297,7307,7309,7321,7331,7333,7349,7351,7369,7393,7411,7417,7433,7451,7457,7459,7477,7481,7487,7489,7499,7507,7517,7523,7529,7537,7541,7547,7549,7559,7561,7573,7577,7583,7589,7591,7603,7607,7621,7639,7643,7649,7669,7673,7681,7687,7691,7699,7703,7717,7723,7727,7741,7753,7757,7759,7789,7793,7817,7823,7829,7841,7853,7867,7873,7877,7879,7883,7901,7907,7919])
C.al=I.f([0,1,4,8,5,2,3,6,9,12,13,10,7,11,14,15])
C.ak=I.f([0,4,8,12,128,132,136,140,256,260,264,268,384,388,392,396])
C.Z=I.f([0,8,4,12,2,10,6,14,1,9,5,13,3,11,7,15])
C.ea=I.f([0.0026494153587602255,-0.005017501342973224,-0.012547236272489583,-0.009455496430838867,-0.012526086181600525,-0.007917069776043777,-0.007995573520417569,-0.009355943344446907,0.0654686119829993,0.3957287551763414,0.7524402229988666,0.9637647869021856,0.9985443385516233,0.9999297702528792,0.9993908675114045,0.999943722670714,0.9993912181341867,0.9991123731042448,0.9601958487827158,0.6318627933843244,0.2579740102876347,0.009401488852733564,-0.0030798345608649747,-0.0045230367033685034,-0.006893341038827404,-0.00903521955390154,-0.008591366716534021,-0.00836908691202894,-0.007868583233875431,-0.000008365757871108513,0.005430122544281718,-0.0027745589759259194])
C.ed=I.f([-3630,-3601,-3573,-3544,-3516,-3488,-3459,-3431,-3403,-3374,-3346,-3318,-3289,-3261,-3233,-3204,-3176,-3148,-3119,-3091,-3063,-3034,-3006,-2977,-2949,-2921,-2892,-2864,-2836,-2807,-2779,-2751,-2722,-2694,-2666,-2637,-2609,-2581,-2552,-2524,-2495,-2467,-2439,-2410,-2382,-2354,-2325,-2297,-2269,-2240,-2212,-2184,-2155,-2127,-2099,-2070,-2042,-2013,-1985,-1957,-1928,-1900,-1872,-1843,-1815,-1787,-1758,-1730,-1702,-1673,-1645,-1617,-1588,-1560,-1532,-1503,-1475,-1446,-1418,-1390,-1361,-1333,-1305,-1276,-1248,-1220,-1191,-1163,-1135,-1106,-1078,-1050,-1021,-993,-964,-936,-908,-879,-851,-823,-794,-766,-738,-709,-681,-653,-624,-596,-568,-539,-511,-482,-454,-426,-397,-369,-341,-312,-284,-256,-227,-199,-171,-142,-114,-86,-57,-29,0,28,56,85,113,141,170,198,226,255,283,311,340,368,396,425,453,481,510,538,567,595,623,652,680,708,737,765,793,822,850,878,907,935,963,992,1020,1049,1077,1105,1134,1162,1190,1219,1247,1275,1304,1332,1360,1389,1417,1445,1474,1502,1531,1559,1587,1616,1644,1672,1701,1729,1757,1786,1814,1842,1871,1899,1927,1956,1984,2012,2041,2069,2098,2126,2154,2183,2211,2239,2268,2296,2324,2353,2381,2409,2438,2466,2494,2523,2551,2580,2608,2636,2665,2693,2721,2750,2778,2806,2835,2863,2891,2920,2948,2976,3005,3033,3062,3090,3118,3147,3175,3203,3232,3260,3288,3317,3345,3373,3402,3430,3458,3487,3515,3544,3572,3600])
C.am=I.f([298.7570554,302.4004341,306.1337728,309.960445,313.8839949,317.9081487,322.036826,326.2741526,330.6244747,335.092373,339.6826795,344.4004944,349.2512056,354.2405086,359.374429,364.6593471,370.1020239,375.7096303,381.4897785,387.4505563,393.6005651,399.9489613,406.5055016,413.2805933,420.2853492,427.5316483,435.0322035,442.8006357,450.8515564,459.2006593,467.8648226,476.8622231,486.2124627,495.936712,506.0578694,516.6007417,527.5922468,539.0616435,551.0407911,563.5644455,576.6705953,590.4008476,604.8008683,619.92089,635.8162974,652.5483053,670.1847459,688.8009889,708.4810171,729.3186941,751.4192606,774.9011125,799.8979226,826.5611867,855.0632966,885.6012714])
C.eB=I.f([0.02516838875551463,0.03942743816942372,0.006205957159642579,0.007112085980742955,0.0002176004464913943,7327183998429021e-27,-0.0216230662171817,0.015670209409407512,0.002801960318863622,0.32494773799897647,1.0164917292316602,1.0329476657890369,1.032158696299155,1.0358667411948619,1.015123547683494,1.0338076690093119,1.0371372378155013,1.0361377027692558,1.022982243255721,0.9691032733565232,-0.005178592389987857,0.001113126197106143,0.006667550303301177,0.0007402431568600196,0.021591567633473925,0.005148162005621723,0.0014561928645728216,0.00016414511045291513,-0.006463076496845329,0.010250854718507939,0.042387394733956134,0.02125271692686162])
C.eC=I.f([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0])
C.eF=I.f([])
C.an=I.f([-705,-700,-694,-689,-683,-678,-672,-667,-661,-656,-650,-645,-639,-634,-628,-623,-617,-612,-606,-601,-595,-590,-584,-579,-573,-568,-562,-557,-551,-546,-540,-535,-529,-524,-518,-513,-507,-502,-496,-491,-485,-480,-474,-469,-463,-458,-452,-447,-441,-435,-430,-424,-419,-413,-408,-402,-397,-391,-386,-380,-375,-369,-364,-358,-353,-347,-342,-336,-331,-325,-320,-314,-309,-303,-298,-292,-287,-281,-276,-270,-265,-259,-254,-248,-243,-237,-232,-226,-221,-215,-210,-204,-199,-193,-188,-182,-177,-171,-166,-160,-155,-149,-144,-138,-133,-127,-122,-116,-111,-105,-100,-94,-89,-83,-78,-72,-67,-61,-56,-50,-45,-39,-34,-28,-23,-17,-12,-6,0,5,11,16,22,27,33,38,44,49,55,60,66,71,77,82,88,93,99,104,110,115,121,126,132,137,143,148,154,159,165,170,176,181,187,192,198,203,209,214,220,225,231,236,242,247,253,258,264,269,275,280,286,291,297,302,308,313,319,324,330,335,341,346,352,357,363,368,374,379,385,390,396,401,407,412,418,423,429,434,440,446,451,457,462,468,473,479,484,490,495,501,506,512,517,523,528,534,539,545,550,556,561,567,572,578,583,589,594,600,605,611,616,622,627,633,638,644,649,655,660,666,671,677,682,688,693,699])
C.ap=I.f([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577])
C.eY=I.f([1.0618958571272863,1.0615019980348779,1.0614335379927147,1.0622711654692485,1.0622036218416742,1.0625059965187085,1.0623938486985884,1.0624706448043137,1.0625048144827762,1.0624366131308856,1.0620694238892607,1.0613167586932164,1.061033402937702,1.0613868564828413,1.0614215366116762,1.0620336151299086,1.062549745480505,1.0624317487992085,1.062524914055448,1.0624277664486914,1.062474985409077,1.0625538581025402,1.0625326910104864,1.0623922312225325,1.062365098035413,1.0625256476715284,1.0612277619533155,1.0594262608698046,1.0599810758292072,1.0602547314449409,1.0601263046243634,1.0606565756823634])
C.f4=I.f([1.0371892935878366,1.0587542891035364,1.0767271213688903,1.0762706844110288,1.0795289105258212,1.0743644742950074,1.0727028691194342,1.0732447452056488,1.0823760816041414,1.0840545681409282,0.9560756752630666,0.5519789685506467,0.08419109488724758,0.000087940070557041,-0.002308640833507125,-0.0011248136628651192,-7729761275498959e-26,-0.00027270769006770834,0.014466473094035592,0.2588311602716948,0.5290799982756673,0.9096662409710516,1.0690571327307956,1.0887326064796272,1.0637622289511852,1.020181291809426,1.0262196688979945,1.078308556061319,0.9833384962321887,1.070724634280262,1.0634247770423768,1.0150875475729566])
C.f5=I.f([-1463,-1452,-1440,-1429,-1417,-1406,-1394,-1383,-1372,-1360,-1349,-1337,-1326,-1315,-1303,-1292,-1280,-1269,-1257,-1246,-1235,-1223,-1212,-1200,-1189,-1177,-1166,-1155,-1143,-1132,-1120,-1109,-1097,-1086,-1075,-1063,-1052,-1040,-1029,-1017,-1006,-995,-983,-972,-960,-949,-937,-926,-915,-903,-892,-880,-869,-857,-846,-835,-823,-812,-800,-789,-777,-766,-755,-743,-732,-720,-709,-697,-686,-675,-663,-652,-640,-629,-618,-606,-595,-583,-572,-560,-549,-538,-526,-515,-503,-492,-480,-469,-458,-446,-435,-423,-412,-400,-389,-378,-366,-355,-343,-332,-320,-309,-298,-286,-275,-263,-252,-240,-229,-218,-206,-195,-183,-172,-160,-149,-138,-126,-115,-103,-92,-80,-69,-58,-46,-35,-23,-12,0,11,22,34,45,57,68,79,91,102,114,125,137,148,159,171,182,194,205,217,228,239,251,262,274,285,297,308,319,331,342,354,365,377,388,399,411,422,434,445,457,468,479,491,502,514,525,537,548,559,571,582,594,605,617,628,639,651,662,674,685,696,708,719,731,742,754,765,776,788,799,811,822,834,845,856,868,879,891,902,914,925,936,948,959,971,982,994,1005,1016,1028,1039,1051,1062,1074,1085,1096,1108,1119,1131,1142,1154,1165,1176,1188,1199,1211,1222,1234,1245,1256,1268,1279,1291,1302,1314,1325,1336,1348,1359,1371,1382,1393,1405,1416,1428,1439,1451])
C.G=I.f([0,128,192,224,240,248,252,254,255])
C.l=I.f([0,1,3,7,15,31,63,127,255])
C.T=I.f([62,62,30,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,588,588,588,588,588,588,588,588,1680,1680,20499,22547,24595,26643,1776,1776,1808,1808,-24557,-22509,-20461,-18413,1904,1904,1936,1936,-16365,-14317,782,782,782,782,814,814,814,814,-12269,-10221,10257,10257,12305,12305,14353,14353,16403,18451,1712,1712,1744,1744,28691,30739,-32749,-30701,-28653,-26605,2061,2061,2061,2061,2061,2061,2061,2061,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,750,750,750,750,1616,1616,1648,1648,1424,1424,1456,1456,1488,1488,1520,1520,1840,1840,1872,1872,1968,1968,8209,8209,524,524,524,524,524,524,524,524,556,556,556,556,556,556,556,556,1552,1552,1584,1584,2000,2000,2032,2032,976,976,1008,1008,1040,1040,1072,1072,1296,1296,1328,1328,718,718,718,718,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,490,490,490,490,490,490,490,490,490,490,490,490,490,490,490,490,4113,4113,6161,6161,848,848,880,880,912,912,944,944,622,622,622,622,654,654,654,654,1104,1104,1136,1136,1168,1168,1200,1200,1232,1232,1264,1264,686,686,686,686,1360,1360,1392,1392,12,12,12,12,12,12,12,12,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390])
C.at=I.f([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258])
C.a_=I.f([0.000003917,0.000004393581,0.000004929604,0.000005532136,0.000006208245,0.000006965,0.000007813219,0.000008767336,0.000009839844,0.00001104323,0.00001239,0.00001388641,0.00001555728,0.00001744296,0.00001958375,0.00002202,0.00002483965,0.00002804126,0.00003153104,0.00003521521,0.000039,0.0000428264,0.0000469146,0.0000515896,0.0000571764,0.000064,0.00007234421,0.00008221224,0.00009350816,0.0001061361,0.00012,0.000134984,0.000151492,0.000170208,0.000191816,0.000217,0.0002469067,0.00028124,0.00031852,0.0003572667,0.000396,0.0004337147,0.000473024,0.000517876,0.0005722187,0.00064,0.00072456,0.0008255,0.00094116,0.00106988,0.00121,0.001362091,0.001530752,0.001720368,0.001935323,0.00218,0.0024548,0.002764,0.0031178,0.0035264,0.004,0.00454624,0.00515932,0.00582928,0.00654616,0.0073,0.008086507,0.00890872,0.00976768,0.01066443,0.0116,0.01257317,0.01358272,0.01462968,0.01571509,0.01684,0.01800736,0.01921448,0.02045392,0.02171824,0.023,0.02429461,0.02561024,0.02695857,0.02835125,0.0298,0.03131083,0.03288368,0.03452112,0.03622571,0.038,0.03984667,0.041768,0.043766,0.04584267,0.048,0.05024368,0.05257304,0.05498056,0.05745872,0.06,0.06260197,0.06527752,0.06804208,0.07091109,0.0739,0.077016,0.0802664,0.0836668,0.0872328,0.09098,0.09491755,0.09904584,0.1033674,0.1078846,0.1126,0.117532,0.1226744,0.1279928,0.1334528,0.13902,0.1446764,0.1504693,0.1564619,0.1627177,0.1693,0.1762431,0.1835581,0.1912735,0.199418,0.20802,0.2171199,0.2267345,0.2368571,0.2474812,0.2586,0.2701849,0.2822939,0.2950505,0.308578,0.323,0.3384021,0.3546858,0.3716986,0.3892875,0.4073,0.4256299,0.4443096,0.4633944,0.4829395,0.503,0.5235693,0.544512,0.56569,0.5869653,0.6082,0.6293456,0.6503068,0.6708752,0.6908424,0.71,0.7281852,0.7454636,0.7619694,0.7778368,0.7932,0.8081104,0.8224962,0.8363068,0.8494916,0.862,0.8738108,0.8849624,0.8954936,0.9054432,0.9148501,0.9237348,0.9320924,0.9399226,0.9472252,0.954,0.9602561,0.9660074,0.9712606,0.9760225,0.9803,0.9840924,0.9874812,0.9903128,0.9928116,0.9949501,0.9967108,0.9980983,0.999112,0.9997482,1,0.9998567,0.9993046,0.9983255,0.9968987,0.995,0.9926005,0.9897426,0.9864444,0.9827241,0.9786,0.9740837,0.9691712,0.9638568,0.9581349,0.952,0.9454504,0.9384992,0.9311628,0.9234576,0.9154,0.9070064,0.8982772,0.8892048,0.8797816,0.87,0.8598613,0.849392,0.838622,0.8275813,0.8163,0.8047947,0.793082,0.781192,0.7691547,0.757,0.7447541,0.7324224,0.7200036,0.7074965,0.6949,0.6822192,0.6694716,0.6566744,0.6438448,0.631,0.6181555,0.6053144,0.5924756,0.5796379,0.5668,0.5539611,0.5411372,0.5283528,0.5156323,0.503,0.4904688,0.4780304,0.4656776,0.4534032,0.4412,0.42908,0.417036,0.405032,0.393032,0.381,0.3689184,0.3568272,0.3447768,0.3328176,0.321,0.3093381,0.2978504,0.2865936,0.2756245,0.265,0.2547632,0.2448896,0.2353344,0.2260528,0.217,0.2081616,0.1995488,0.1911552,0.1829744,0.175,0.1672235,0.1596464,0.1522776,0.1451259,0.1382,0.1315003,0.1250248,0.1187792,0.1127691,0.107,0.1014762,0.09618864,0.09112296,0.08626485,0.0816,0.07712064,0.07282552,0.06871008,0.06476976,0.061,0.05739621,0.05395504,0.05067376,0.04754965,0.04458,0.04175872,0.03908496,0.03656384,0.03420048,0.032,0.02996261,0.02807664,0.02632936,0.02470805,0.0232,0.02180077,0.02050112,0.01928108,0.01812069,0.017,0.01590379,0.01483718,0.01381068,0.01283478,0.01192,0.01106831,0.01027339,0.009533311,0.008846157,0.00821,0.007623781,0.007085424,0.006591476,0.006138485,0.005723,0.005343059,0.004995796,0.004676404,0.004380075,0.004102,0.003838453,0.003589099,0.003354219,0.003134093,0.002929,0.002738139,0.002559876,0.002393244,0.002237275,0.002091,0.001953587,0.00182458,0.00170358,0.001590187,0.001484,0.001384496,0.001291268,0.001204092,0.001122744,0.001047,0.0009765896,0.0009111088,0.0008501332,0.0007932384,0.00074,0.0006900827,0.00064331,0.000599496,0.0005584547,0.00052,0.0004839136,0.0004500528,0.0004183452,0.0003887184,0.0003611,0.0003353835,0.0003114404,0.0002891656,0.0002684539,0.0002492,0.0002313019,0.0002146856,0.0001992884,0.0001850475,0.0001719,0.0001597781,0.0001486044,0.0001383016,0.0001287925,0.00012,0.0001118595,0.0001043224,0.0000973356,0.00009084587,0.0000848,0.00007914667,0.000073858,0.000068916,0.00006430267,0.00006,0.00005598187,0.0000522256,0.0000487184,0.00004544747,0.0000424,0.00003956104,0.00003691512,0.00003444868,0.00003214816,0.00003,0.00002799125,0.00002611356,0.00002436024,0.00002272461,0.0000212,0.00001977855,0.00001845285,0.00001721687,0.00001606459,0.00001499,0.00001398728,0.00001305155,0.00001217818,0.00001136254,0.0000106,0.000009885877,0.000009217304,0.000008592362,0.000008009133,0.0000074657,0.000006959567,0.000006487995,0.000006048699,0.000005639396,0.0000052578,0.000004901771,0.00000456972,0.000004260194,0.000003971739,0.0000037029,0.000003452163,0.000003218302,0.0000030003,0.000002797139,0.0000026078,0.00000243122,0.000002266531,0.000002113013,0.000001969943,0.0000018366,0.00000171223,0.000001596228,0.00000148809,0.000001387314,0.0000012934,0.00000120582,0.000001124143,0.000001048009,9770578e-13,91093e-11,8492513e-13,7917212e-13,7380904e-13,6881098e-13,64153e-11,5980895e-13,5575746e-13,519808e-12,4846123e-13,45181e-11])
C.aW=I.f([173,148,140])
C.aX=I.f([176,155,140,135])
C.i3=I.f([180,157,141,134,130])
C.ba=I.f([254,254,243,230,196,177,153,140,133,130,129])
C.au=I.f([C.aW,C.aX,C.i3,C.ba])
C.hg=I.f([1.1565232050369776,1.156722500011914,1.1566203150243823,1.1555782088080084,1.15621755092157,1.1567674012207332,1.156802319480863,1.156767744548552,1.156356318295283,1.1567054702510189,1.1565134139372772,1.1564336176499312,1.1568023181530034,1.1473147688514642,1.1339317140561065,1.1293876490671435,1.1290515328639648,1.0504864823782283,1.0459696042230884,0.9936668716859569,0.9560166926539394,0.924674820335118,0.9149994470205176,0.8993946765845346,0.8954252075133111,0.8887056669381475,0.8822284381422811,0.8799831137382668,0.8763524461224458,0.8800036833170911,0.8806566542844112,0.883047064602769])
C.av=I.f([U.xb(),U.xo(),U.xr(),U.xi(),U.xm(),U.xu(),U.xl(),U.xt(),U.xg(),U.xk()])
C.hl=I.f([17,18,0,1,2,3,4,5,16,6,7,8,9,10,11,12,13,14,15])
C.aw=I.f([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15])
C.hA=I.f([0.05471118715729184,0.0556090664983034,0.060755873790918236,0.05623294861596237,0.04616994053570868,0.038012808167818095,0.02442422575667034,0.003898358058159218,-0.0005608225217273444,0.0009649387125519465,0.0003734119805151037,-0.000433673890931352,-0.00009353396225689203,-0.00012354967412842033,-0.0001452454808168746,-0.0002004769191554373,-0.0004993858769469367,0.027255083540032476,0.1606740590629706,0.35069788873150953,0.5735746553841896,0.7639209189071895,0.8914446674038152,0.9639460990957489,0.9887946427601628,0.998974499662272,0.9860514040356416,0.995325028053452,0.9743347837730537,0.9913436461687141,0.9886628777217475,0.9971385608973553])
C.ax=I.f([127,127,191,127,159,191,223,127,143,159,175,191,207,223,239,127,135,143,151,159,167,175,183,191,199,207,215,223,231,239,247,127,131,135,139,143,147,151,155,159,163,167,171,175,179,183,187,191,195,199,203,207,211,215,219,223,227,231,235,239,243,247,251,127,129,131,133,135,137,139,141,143,145,147,149,151,153,155,157,159,161,163,165,167,169,171,173,175,177,179,181,183,185,187,189,191,193,195,197,199,201,203,205,207,209,211,213,215,217,219,221,223,225,227,229,231,233,235,237,239,241,243,245,247,249,251,253,127])
C.ay=I.f([0.0001299,0.000145847,0.0001638021,0.0001840037,0.0002066902,0.0002321,0.000260728,0.000293075,0.000329388,0.000369914,0.0004149,0.0004641587,0.000518986,0.000581854,0.0006552347,0.0007416,0.0008450296,0.0009645268,0.001094949,0.001231154,0.001368,0.00150205,0.001642328,0.001802382,0.001995757,0.002236,0.002535385,0.002892603,0.003300829,0.003753236,0.004243,0.004762389,0.005330048,0.005978712,0.006741117,0.00765,0.008751373,0.01002888,0.0114217,0.01286901,0.01431,0.01570443,0.01714744,0.01878122,0.02074801,0.02319,0.02620736,0.02978248,0.03388092,0.03846824,0.04351,0.0489956,0.0550226,0.0617188,0.069212,0.07763,0.08695811,0.09717672,0.1084063,0.1207672,0.13438,0.1493582,0.1653957,0.1819831,0.198611,0.21477,0.2301868,0.2448797,0.2587773,0.2718079,0.2839,0.2949438,0.3048965,0.3137873,0.3216454,0.3285,0.3343513,0.3392101,0.3431213,0.3461296,0.34828,0.3495999,0.3501474,0.350013,0.349287,0.34806,0.3463733,0.3442624,0.3418088,0.3390941,0.3362,0.3331977,0.3300411,0.3266357,0.3228868,0.3187,0.3140251,0.308884,0.3032904,0.2972579,0.2908,0.2839701,0.2767214,0.2689178,0.2604227,0.2511,0.2408475,0.2298512,0.2184072,0.2068115,0.19536,0.1842136,0.1733273,0.1626881,0.1522833,0.1421,0.1321786,0.1225696,0.1132752,0.1042979,0.09564,0.08729955,0.07930804,0.07171776,0.06458099,0.05795001,0.05186211,0.04628152,0.04115088,0.03641283,0.03201,0.0279172,0.0241444,0.020687,0.0175404,0.0147,0.01216179,0.00991996,0.00796724,0.006296346,0.0049,0.003777173,0.00294532,0.00242488,0.002236293,0.0024,0.00292552,0.00383656,0.00517484,0.00698208,0.0093,0.01214949,0.01553588,0.01947752,0.02399277,0.0291,0.03481485,0.04112016,0.04798504,0.05537861,0.06327,0.07163501,0.08046224,0.08973996,0.09945645,0.1096,0.1201674,0.1311145,0.1423679,0.1538542,0.1655,0.1772571,0.18914,0.2011694,0.2133658,0.2257499,0.2383209,0.2510668,0.2639922,0.2771017,0.2904,0.3038912,0.3175726,0.3314384,0.3454828,0.3597,0.3740839,0.3886396,0.4033784,0.4183115,0.4334499,0.4487953,0.464336,0.480064,0.4959713,0.5120501,0.5282959,0.5446916,0.5612094,0.5778215,0.5945,0.6112209,0.6279758,0.6447602,0.6615697,0.6784,0.6952392,0.7120586,0.7288284,0.7455188,0.7621,0.7785432,0.7948256,0.8109264,0.8268248,0.8425,0.8579325,0.8730816,0.8878944,0.9023181,0.9163,0.9297995,0.9427984,0.9552776,0.9672179,0.9786,0.9893856,0.9995488,1.0090892,1.0180064,1.0263,1.0339827,1.040986,1.047188,1.0524667,1.0567,1.0597944,1.0617992,1.0628068,1.0629096,1.0622,1.0607352,1.0584436,1.0552244,1.0509768,1.0456,1.0390369,1.0313608,1.0226662,1.0130477,1.0026,0.9913675,0.9793314,0.9664916,0.9528479,0.9384,0.923194,0.907244,0.890502,0.87292,0.8544499,0.835084,0.814946,0.794186,0.772954,0.7514,0.7295836,0.7075888,0.6856022,0.6638104,0.6424,0.6215149,0.6011138,0.5811052,0.5613977,0.5419,0.5225995,0.5035464,0.4847436,0.4661939,0.4479,0.4298613,0.412098,0.394644,0.3775333,0.3608,0.3444563,0.3285168,0.3130192,0.2980011,0.2835,0.2695448,0.2561184,0.2431896,0.2307272,0.2187,0.2070971,0.1959232,0.1851708,0.1748323,0.1649,0.1553667,0.14623,0.13749,0.1291467,0.1212,0.1136397,0.106465,0.09969044,0.09333061,0.0874,0.08190096,0.07680428,0.07207712,0.06768664,0.0636,0.05980685,0.05628216,0.05297104,0.04981861,0.04677,0.04378405,0.04087536,0.03807264,0.03540461,0.0329,0.03056419,0.02838056,0.02634484,0.02445275,0.0227,0.02108429,0.01959988,0.01823732,0.01698717,0.01584,0.01479064,0.01383132,0.01294868,0.0121292,0.01135916,0.01062935,0.009938846,0.009288422,0.008678854,0.008110916,0.007582388,0.007088746,0.006627313,0.006195408,0.005790346,0.005409826,0.005052583,0.004717512,0.004403507,0.004109457,0.003833913,0.003575748,0.003334342,0.003109075,0.002899327,0.002704348,0.00252302,0.002354168,0.002196616,0.00204919,0.00191096,0.001781438,0.00166011,0.001546459,0.001439971,0.001340042,0.001246275,0.001158471,0.00107643,0.0009999493,0.0009287358,0.0008624332,0.0008007503,0.000743396,0.0006900786,0.0006405156,0.0005945021,0.0005518646,0.000512429,0.0004760213,0.0004424536,0.0004115117,0.0003829814,0.0003566491,0.0003323011,0.0003097586,0.0002888871,0.0002695394,0.0002515682,0.0002348261,0.000219171,0.0002045258,0.0001908405,0.0001780654,0.0001661505,0.0001550236,0.0001446219,0.0001349098,0.000125852,0.000117413,0.0001095515,0.0001022245,0.00009539445,0.0000890239,0.00008307527,0.00007751269,0.00007231304,0.00006745778,0.00006292844,0.00005870652,0.00005477028,0.00005109918,0.00004767654,0.00004448567,0.00004150994,0.00003873324,0.00003614203,0.00003372352,0.00003146487,0.00002935326,0.00002737573,0.00002552433,0.00002379376,0.0000221787,0.00002067383,0.00001927226,0.0000179664,0.00001674991,0.00001561648,0.00001455977,0.00001357387,0.00001265436,0.00001179723,0.00001099844,0.00001025398,0.000009559646,0.000008912044,0.000008308358,0.000007745769,0.000007221456,0.000006732475,0.000006276423,0.000005851304,0.000005455118,0.000005085868,0.000004741466,0.000004420236,0.000004120783,0.000003841716,0.000003581652,0.000003339127,0.000003112949,0.000002902121,0.000002705645,0.000002522525,0.000002351726,0.000002192415,0.000002043902,0.000001905497,0.000001776509,0.000001656215,0.000001544022,0.00000143944,0.000001341977,0.000001251141])
C.hO=I.f([49,65,89,38,83,89])
C.hP=I.f([23,114,69,56,80,144])
C.hR=I.f([1.662125,1.687,1.703313,1.72,1.744563,1.77,1.791625,1.81,1.822125,1.834,1.85175,1.872,1.89425,1.916,1.931688,1.95,1.972438,2.015,2.121562,2.21,2.177188,2.13,2.160063,2.21,2.249938,2.289,2.326,2.362,2.397625,2.433,2.469187,2.504,2.535875,2.564,2.589625,2.605,2.595562,2.583,2.5765,2.599,2.678062,2.809,3.01075,3.24,3.458187,3.67,3.863125,4.05,4.239563,4.43,4.619563,4.817,5.034125,5.26,5.485625,5.717])
C.i2=I.f([280,256,256,256,40])
C.az=I.f([0,1,1,2,4,8,1,1,2,4,8,4,8,0])
C.bc=I.f(["Apple","Chicken1","Chicken2","Cream","Ketchup","Marble","Potato","Skimmilk","Skin1","Skin2","Spectralon","Wholemilk","Lowfat Milk","Reduced Milk","Regular Milk","Espresso","Mint Mocha Coffee","Lowfat Soy Milk","Regular Soy Milk","Lowfat Chocolate Milk","Regular Chocolate Milk","Coke","Pepsi","Sprite","Gatorade","Chardonnay","White Zinfandel","Merlot","Budweiser Beer","Coors Light Beer","Clorox","Apple Juice","Cranberry Juice","Grape Juice","Ruby Grapefruit Juice","White Grapefruit Juice","Shampoo","Strawberry Shampoo","Head & Shoulders Shampoo","Lemon Tea","Orange Juice Powder","Pink Lemonade","Cappuccino Powder","Salt Powder","Sugar Powder","Suisse Mocha","Pacific Ocean Surface Water"])
C.fx=I.f([2.29,2.39,1.97])
C.hQ=I.f([0.003,0.0034,0.046])
C.eJ=I.f([C.fx,C.hQ])
C.c9=I.f([0.15,0.21,0.38])
C.cS=I.f([0.015,0.077,0.19])
C.he=I.f([C.c9,C.cS])
C.fU=I.f([0.19,0.25,0.32])
C.dS=I.f([0.018,0.088,0.2])
C.di=I.f([C.fU,C.dS])
C.bu=I.f([7.38,5.47,3.15])
C.bo=I.f([0.0002,0.0028,0.0163])
C.i1=I.f([C.bu,C.bo])
C.cW=I.f([0.18,0.07,0.03])
C.dJ=I.f([0.061,0.97,1.45])
C.fQ=I.f([C.cW,C.dJ])
C.d2=I.f([2.19,2.62,3])
C.aR=I.f([0.0021,0.0041,0.0071])
C.hK=I.f([C.d2,C.aR])
C.bK=I.f([0.68,0.7,0.55])
C.bv=I.f([0.0024,0.009,0.12])
C.bb=I.f([C.bK,C.bv])
C.cd=I.f([0.7,1.22,1.9])
C.dL=I.f([0.0014,0.0025,0.0142])
C.ch=I.f([C.cd,C.dL])
C.e6=I.f([0.74,0.88,1.01])
C.f6=I.f([0.032,0.17,0.48])
C.fJ=I.f([C.e6,C.f6])
C.dj=I.f([1.09,1.59,1.79])
C.eI=I.f([0.013,0.07,0.145])
C.fP=I.f([C.dj,C.eI])
C.aS=I.f([11.6,20.4,14.9])
C.aT=I.f([0,0,0])
C.e2=I.f([C.aS,C.aT])
C.eP=I.f([2.55,3.21,3.77])
C.bm=I.f([0.0011,0.0024,0.014])
C.hZ=I.f([C.eP,C.bm])
C.fk=I.f([0.9126,1.0748,1.25])
C.eO=I.f([0.0002,0.0004,0.0008])
C.e5=I.f([C.fk,C.eO])
C.fe=I.f([1.075,1.2213,1.3941])
C.fW=I.f([0.0002,0.0004,0.001])
C.cV=I.f([C.fe,C.fW])
C.bd=I.f([1.1874,1.3296,1.4602])
C.dF=I.f([0.0001,0.0003,0.0013])
C.e8=I.f([C.bd,C.dF])
C.h9=I.f([0.4376,0.5115,0.6048])
C.fl=I.f([0.1669,0.2287,0.3078])
C.bs=I.f([C.h9,C.fl])
C.hL=I.f([0.19,0.26,0.35])
C.da=I.f([0.0984,0.1519,0.204])
C.hu=I.f([C.hL,C.da])
C.fw=I.f([0.1419,0.1625,0.274])
C.dm=I.f([0.0001,0.0005,0.0025])
C.cf=I.f([C.fw,C.dm])
C.dx=I.f([0.2434,0.2719,0.4597])
C.c_=I.f([0.0001,0.0005,0.0034])
C.bY=I.f([C.dx,C.c_])
C.eb=I.f([0.4282,0.5014,0.5791])
C.c2=I.f([0.0005,0.0016,0.0068])
C.fD=I.f([C.eb,C.c2])
C.eQ=I.f([0.7359,0.9172,1.0688])
C.hB=I.f([0.0007,0.003,0.01])
C.jt=I.f([C.eQ,C.hB])
C.h8=I.f([0.7143,1.1688,1.7169])
C.hT=I.f([0.6966,1.148,1.7169])
C.bi=I.f([C.h8,C.hT])
C.br=I.f([0.6433,0.999,1.442])
C.c0=I.f([0.6375,0.9849,1.442])
C.bQ=I.f([C.br,C.c0])
C.bk=I.f([0.1299,0.1283,0.1395])
C.bW=I.f([0.123,0.1194,0.1306])
C.fK=I.f([C.bk,C.bW])
C.eM=I.f([0.4009,0.4185,0.4324])
C.bt=I.f([0.1617,0.1258,0.0579])
C.hw=I.f([C.eM,C.bt])
C.bp=I.f([0.1577,0.1748,0.3512])
C.dT=I.f([0.1547,0.1701,0.3443])
C.dA=I.f([C.bp,C.dT])
C.fI=I.f([0.1763,0.237,0.2913])
C.dd=I.f([0.1732,0.2322,0.2847])
C.cG=I.f([C.fI,C.dd])
C.bF=I.f([0.7639,1.6429,1.9196])
C.fR=I.f([0.7586,1.6429,1.9196])
C.cC=I.f([C.bF,C.fR])
C.bL=I.f([0.1486,0.321,0.736])
C.c1=I.f([0.1449,0.3141,0.7286])
C.eV=I.f([C.bL,C.c1])
C.bx=I.f([0.0295,0.0663,0.1521])
C.e9=I.f([0.0268,0.0608,0.1521])
C.js=I.f([C.bx,C.e9])
C.f3=I.f([0.16,0.25,0.33])
C.bE=I.f([0.0175,0.0777,0.1372])
C.cZ=I.f([C.f3,C.bE])
C.hz=I.f([0.1215,0.2101,0.4407])
C.e4=I.f([0.1014,0.1858,0.4084])
C.e3=I.f([C.hz,C.e4])
C.ft=I.f([0.27,0.63,0.83])
C.eH=I.f([0.2572,0.6145,0.8104])
C.dP=I.f([C.ft,C.eH])
C.cz=I.f([0.55,1.25,1.53])
C.bl=I.f([0.5428,1.25,1.53])
C.bC=I.f([C.cz,C.bl])
C.eG=I.f([0.2513,0.3517,0.4305])
C.by=I.f([0.0896,0.1911,0.2636])
C.hf=I.f([C.eG,C.by])
C.cF=I.f([0.3609,0.38,0.5632])
C.dy=I.f([0.0096,0.0131,0.0395])
C.ce=I.f([C.cF,C.dy])
C.bn=I.f([0.0288,0.071,0.0952])
C.dz=I.f([0.0184,0.0596,0.0805])
C.cA=I.f([C.bn,C.dz])
C.f9=I.f([0.0217,0.0788,0.1022])
C.f7=I.f([0.0189,0.0756,0.0989])
C.bU=I.f([C.f9,C.f7])
C.cT=I.f([0.3674,0.4527,0.5211])
C.bg=I.f([0.0883,0.1637,0.2125])
C.cg=I.f([C.cT,C.bg])
C.bz=I.f([0.34,0.58,0.88])
C.h7=I.f([0.2602,0.4902,0.7727])
C.d1=I.f([C.bz,C.h7])
C.fO=I.f([0.3377,0.5573,1.0122])
C.dQ=I.f([0.1449,0.3441,0.7863])
C.cc=I.f([C.fO,C.dQ])
C.dC=I.f([0.24,0.37,0.45])
C.dH=I.f([0.1165,0.2366,0.3195])
C.fC=I.f([C.dC,C.dH])
C.ci=I.f([0.2574,0.3536,0.484])
C.h1=I.f([0.192,0.2654,0.3272])
C.df=I.f([C.ci,C.h1])
C.f8=I.f([0.76,0.8685,0.9363])
C.e7=I.f([0.5115,0.5863,0.6147])
C.dO=I.f([C.f8,C.e7])
C.bJ=I.f([0.0795,0.1759,0.278])
C.hm=I.f([0.065,0.1597,0.2578])
C.eD=I.f([C.bJ,C.hm])
C.cH=I.f([0.5098,0.6476,0.7944])
C.hS=I.f([0.1875,0.2893,0.3796])
C.bO=I.f([C.cH,C.hS])
C.fv=I.f([3.3645,3.3158,3.2428])
C.cn=I.f([3.1845,3.1324,3.0147])
C.c8=I.f([C.fv,C.cn])
C.v=new H.oz(47,{Apple:C.eJ,Chicken1:C.he,Chicken2:C.di,Cream:C.i1,Ketchup:C.fQ,Marble:C.hK,Potato:C.bb,Skimmilk:C.ch,Skin1:C.fJ,Skin2:C.fP,Spectralon:C.e2,Wholemilk:C.hZ,"Lowfat Milk":C.e5,"Reduced Milk":C.cV,"Regular Milk":C.e8,Espresso:C.bs,"Mint Mocha Coffee":C.hu,"Lowfat Soy Milk":C.cf,"Regular Soy Milk":C.bY,"Lowfat Chocolate Milk":C.fD,"Regular Chocolate Milk":C.jt,Coke:C.bi,Pepsi:C.bQ,Sprite:C.fK,Gatorade:C.hw,Chardonnay:C.dA,"White Zinfandel":C.cG,Merlot:C.cC,"Budweiser Beer":C.eV,"Coors Light Beer":C.js,Clorox:C.cZ,"Apple Juice":C.e3,"Cranberry Juice":C.dP,"Grape Juice":C.bC,"Ruby Grapefruit Juice":C.hf,"White Grapefruit Juice":C.ce,Shampoo:C.cA,"Strawberry Shampoo":C.bU,"Head & Shoulders Shampoo":C.cg,"Lemon Tea":C.d1,"Orange Juice Powder":C.cc,"Pink Lemonade":C.fC,"Cappuccino Powder":C.df,"Salt Powder":C.dO,"Sugar Powder":C.eD,"Suisse Mocha":C.bO,"Pacific Ocean Surface Water":C.c8},C.bc)
C.aB=new H.pq([315,"artist",258,"bitsPerSample",265,"cellLength",264,"cellWidth",320,"colorMap",259,"compression",306,"dateTime",34665,"exifIFD",338,"extraSamples",266,"fillOrder",289,"freeByteCounts",288,"freeOffsets",291,"grayResponseCurve",290,"grayResponseUnit",316,"hostComputer",34675,"iccProfile",270,"imageDescription",257,"imageLength",256,"imageWidth",33723,"iptc",271,"make",281,"maxSampleValue",280,"minSampleValue",272,"model",254,"newSubfileType",274,"orientation",262,"photometricInterpretation",34377,"photoshop",284,"planarConfiguration",317,"predictor",296,"resolutionUnit",278,"rowsPerStrip",277,"samplesPerPixel",305,"software",279,"stripByteCounts",273,"stropOffsets",255,"subfileType",292,"t4Options",293,"t6Options",263,"thresholding",322,"tileWidth",323,"tileLength",324,"tileOffsets",325,"tileByteCounts",700,"xmp",282,"xResolution",283,"yResolution",529,"yCbCrCoefficients",530,"yCbCrSubsampling",531,"yCbCrPositioning"])
$.qf=null
$.fD=1
$.lP="$cachedFunction"
$.lQ="$cachedInvocation"
$.bs=null
$.dM=null
$.bZ=0
$.dy=null
$.kC=null
$.ke=null
$.nq=null
$.nG=null
$.hd=null
$.hg=null
$.kg=null
$.of=4294967295
$.t=G.wV()
$.fm=null
$.aN=1
$.fF=null
$.au=null
$.aP=1
$.dg=0
$.dl=null
$.e2=null
$.e3=null
$.k7=!1
$.Q=C.h
$.kT=0
$.aL=null
$.kM=null
$.kN=null
$.ig=null
$.mN=!1
$.hX=null
$.ff=null
$.l8=null
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["ib","$get$ib",function(){return H.qd()},"ic","$get$ic",function(){return new P.oT(null)},"mv","$get$mv",function(){return H.c5(H.fO({toString:function(){return"$receiver$"}}))},"mw","$get$mw",function(){return H.c5(H.fO({$method$:null,toString:function(){return"$receiver$"}}))},"mx","$get$mx",function(){return H.c5(H.fO(null))},"my","$get$my",function(){return H.c5(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"mC","$get$mC",function(){return H.c5(H.fO(void 0))},"mD","$get$mD",function(){return H.c5(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"mA","$get$mA",function(){return H.c5(H.mB(null))},"mz","$get$mz",function(){return H.c5(function(){try{null.$method$}catch(z){return z.message}}())},"mF","$get$mF",function(){return H.c5(H.mB(void 0))},"mE","$get$mE",function(){return H.c5(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dk","$get$dk",function(){return 1/P.y2(2)},"fu","$get$fu",function(){return G.r6(0,0,0)},"df","$get$df",function(){return P.a5()},"dJ","$get$dJ",function(){return P.a5()},"fw","$get$fw",function(){return P.a5()},"cH","$get$cH",function(){return P.a5()},"bb","$get$bb",function(){return P.a5()},"ex","$get$ex",function(){return P.a5()},"ci","$get$ci",function(){return P.a5()},"ew","$get$ew",function(){return P.a5()},"bl","$get$bl",function(){return P.a5()},"cj","$get$cj",function(){return P.a5()},"dK","$get$dK",function(){return P.a5()},"by","$get$by",function(){return P.a5()},"bk","$get$bk",function(){return P.a5()},"bm","$get$bm",function(){return P.a5()},"dL","$get$dL",function(){return P.a5()},"ey","$get$ey",function(){return G.rC(0,0,0)},"l3","$get$l3",function(){return G.q(1)},"ao","$get$ao",function(){return G.w6()},"cN","$get$cN",function(){return G.q(1)},"j9","$get$j9",function(){return G.t_(0)},"jl","$get$jl",function(){return[]},"eE","$get$eE",function(){return G.co("Rays","Camera Rays Traced")},"jj","$get$jj",function(){return G.co("Rays","Specular Reflection Rays Traced")},"jk","$get$jk",function(){return G.co("Rays","Specular Refraction Rays Traced")},"az","$get$az",function(){return G.co("Rays","Shadow Rays Traced")},"ay","$get$ay",function(){return G.co("Rays","Total Non-Shadow Rays Traced")},"jg","$get$jg",function(){return G.co("Kd-Tree","Interior Nodes Created")},"eF","$get$eF",function(){return G.co("Kd-Tree","Leaf Nodes Created")},"ji","$get$ji",function(){return G.co("Kd-Tree","Maximum Primitives in Leaf")},"jh","$get$jh",function(){return G.co("Kd-Tree","Maximum Depth of Leaf Nodes")},"jR","$get$jR",function(){return P.v4()},"l4","$get$l4",function(){return P.pn(null,null)},"e4","$get$e4",function(){return[]},"eK","$get$eK",function(){return H.ft(H.k(511))},"fU","$get$fU",function(){return H.ft(H.k(511))},"eL","$get$eL",function(){return H.lC(H.k(2041))},"dV","$get$dV",function(){return H.lC(H.k(225))},"bo","$get$bo",function(){return H.ft(H.k(766))},"jG","$get$jG",function(){return[U.kf(),U.xv(),U.xA(),U.xB(),U.xC(),U.xD(),U.xE(),U.xF(),U.xG(),U.xH(),U.xw(),U.xx(),U.xy(),U.xz(),U.kf(),U.kf()]},"e0","$get$e0",function(){return H.ft(H.k(1))},"eT","$get$eT",function(){var z=$.$get$e0().buffer
z.toString
H.cr(z,0,null)
return new Int8Array(z,0)},"eR","$get$eR",function(){return H.r2(H.k(1))},"hc","$get$hc",function(){var z=$.$get$eR().buffer
z.toString
H.cr(z,0,null)
return new Int16Array(z,0)},"bJ","$get$bJ",function(){return H.r4(H.k(1))},"e_","$get$e_",function(){var z=$.$get$bJ().buffer
z.toString
H.cr(z,0,null)
return new Int32Array(z,0)},"eS","$get$eS",function(){return P.pd($.$get$bJ().buffer,0,null)},"k6","$get$k6",function(){return H.r1(H.k(1))},"nh","$get$nh",function(){return P.mH($.$get$k6().buffer,0,null)},"k5","$get$k5",function(){return H.r0(H.k(1))},"ng","$get$ng",function(){return P.mH($.$get$k5().buffer,0,null)},"dc","$get$dc",function(){return P.a5()},"cF","$get$cF",function(){return P.a5()},"lz","$get$lz",function(){return G.q(0).fm(C.am,C.bI)},"ly","$get$ly",function(){return G.q(0).fm(C.am,C.hR)},"cz","$get$cz",function(){return G.aO(null,null,0,1/0,0,0)},"bA","$get$bA",function(){var z=Array(6)
z.fixed$length=Array
return H.p(z,[P.a3])}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,31]
init.types=[{func:1,args:[,]},{func:1},{func:1,void:true,args:[U.ak]},{func:1,void:true},{func:1,ret:P.x,args:[P.jz,P.x,P.x]},{func:1,ret:G.ai,args:[G.r,G.r]},{func:1,ret:P.a3},{func:1,args:[,,]},{func:1,void:true,args:[U.eq,P.E]},{func:1,args:[G.cM]},{func:1,void:true,args:[P.x,P.x,P.x,P.x,P.x,P.cp]},{func:1,args:[P.aZ]},{func:1,ret:P.a3,args:[G.j,G.r,G.r,P.a3]},{func:1,ret:P.x,args:[P.x,P.x]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,ret:P.a3,args:[P.a3,P.a3]},{func:1,void:true,args:[,],opt:[P.cP]},{func:1,args:[,],opt:[,]},{func:1,ret:P.aZ,args:[P.x]},{func:1,args:[[P.E,P.x]]},{func:1,args:[P.E]},{func:1,void:true,args:[P.x,P.aZ]},{func:1,ret:G.i4,args:[G.H,G.a6]},{func:1,ret:G.h0,args:[G.H,G.a6]},{func:1,ret:G.h_,args:[G.H,G.a6]},{func:1,ret:G.fa,args:[G.H,G.a6]},{func:1,ret:G.f7,args:[G.H,G.a6]},{func:1,ret:G.b7,args:[G.H,G.a6]},{func:1,ret:G.f4,args:[G.H,G.a6]},{func:1,ret:G.jx,args:[G.H,G.a6]},{func:1,ret:P.aj,args:[E.cT]},{func:1,ret:G.cc,args:[G.H,G.a6]},{func:1,ret:G.fI,args:[G.H,G.a6]},{func:1,ret:G.fp,args:[G.H,G.a6]},{func:1,ret:G.iw,args:[G.H,G.a6]},{func:1,ret:P.aj,args:[,,]},{func:1,void:true,args:[P.x]},{func:1,ret:P.aj,args:[P.aZ]},{func:1,ret:P.x,args:[P.x]},{func:1,args:[P.x,,]},{func:1,void:true,args:[,]},{func:1,void:true,args:[U.eq,,]},{func:1,ret:P.x},{func:1,args:[P.x]},{func:1,ret:P.x,args:[,]},{func:1,args:[U.ek]},{func:1,ret:P.aj,args:[E.cT,E.cT]},{func:1,ret:G.ai,args:[G.j,G.r]},{func:1,ret:P.aj,args:[G.fL]},{func:1,ret:G.ai,args:[P.a3]},{func:1,ret:P.aj,args:[U.i9]},{func:1,void:true,args:[G.j,U.iO,P.a3,[P.E,P.a3]]},{func:1,void:true,args:[G.j,U.j1,P.a3,[P.E,P.a3]]},{func:1,ret:P.ds},{func:1,ret:E.hw,args:[[P.E,G.bI],G.A]},{func:1,ret:E.hr,args:[[P.E,G.bI],G.A]},{func:1,ret:E.hV,args:[[P.E,G.bI],G.A]},{func:1,ret:E.ij,args:[[P.E,G.bI],G.A]},{func:1,ret:K.hJ,args:[G.A,G.cu,G.d3]},{func:1,ret:K.iJ,args:[G.A,G.cu,G.d3]},{func:1,ret:K.iN,args:[G.A,G.cu,G.d3]},{func:1,args:[G.bi]},{func:1,ret:G.ai,args:[G.r,G.r],opt:[P.x]},{func:1,ret:R.i3,args:[G.A,G.d4],opt:[{func:1,args:[U.ek]}]},{func:1,ret:S.hv,args:[G.A]},{func:1,ret:S.hR,args:[G.A]},{func:1,ret:S.il,args:[G.A]},{func:1,ret:S.iC,args:[G.A]},{func:1,ret:S.jv,args:[G.A]},{func:1,void:true,args:[G.j,G.ia,P.a3,P.a3]},{func:1,ret:P.x,args:[,,,]},{func:1,void:true,args:[P.aZ,G.A]},{func:1,ret:O.hC,args:[G.H,G.A,G.bz]},{func:1,ret:O.hH,args:[G.H,G.A]},{func:1,ret:O.hU,args:[G.H,G.A]},{func:1,ret:O.i5,args:[G.H,G.A]},{func:1,ret:O.iS,args:[G.H,G.A]},{func:1,ret:O.iV,args:[G.H,G.A]},{func:1,ret:O.jf,args:[G.H,G.A]},{func:1,ret:D.hS,args:[G.H,G.a6]},{func:1,ret:D.ii,args:[G.H,G.a6]},{func:1,ret:D.ix,args:[G.H,G.a6]},{func:1,ret:D.iy,args:[G.H,G.a6]},{func:1,ret:D.iz,args:[G.H,G.a6]},{func:1,ret:D.iB,args:[G.H,G.a6]},{func:1,ret:D.iR,args:[G.H,G.a6]},{func:1,ret:D.j5,args:[G.H,G.a6]},{func:1,ret:D.jo,args:[G.H,G.a6]},{func:1,ret:D.jp,args:[G.H,G.a6]},{func:1,ret:D.ju,args:[G.H,G.a6]},{func:1,ret:D.jy,args:[G.H,G.a6]},{func:1,void:true,args:[[P.E,P.aZ],P.m9]},{func:1,ret:F.j2,args:[G.A]},{func:1,ret:F.dU,args:[G.A]},{func:1,ret:U.ho,args:[G.A,P.x,P.x,P.x,P.x,G.bp,G.bj]},{func:1,ret:U.hs,args:[G.A,P.x,P.x,P.x,P.x,G.bp,G.bj]},{func:1,ret:U.hY,args:[G.A,P.x,P.x,P.x,P.x,G.bp,G.bj]},{func:1,ret:U.it,args:[G.A,P.x,P.x,P.x,P.x,G.bp,G.bj]},{func:1,ret:U.j3,args:[G.A,P.x,P.x,P.x,P.x,G.bp,G.bj]},{func:1,ret:U.jm,args:[G.A,P.x,P.x,P.x,P.x,G.bp,G.bj]},{func:1,ret:M.hy,args:[G.H,G.H,P.aj,G.A]},{func:1,ret:M.hA,args:[G.H,G.H,P.aj,G.A]},{func:1,ret:M.hG,args:[G.H,G.H,P.aj,G.A]},{func:1,ret:M.hZ,args:[G.H,G.H,P.aj,G.A]},{func:1,ret:M.i1,args:[G.H,G.H,P.aj,G.A]},{func:1,ret:M.ir,args:[G.H,G.H,P.aj,G.A]},{func:1,ret:M.iH,args:[G.H,G.H,P.aj,G.A]},{func:1,ret:M.iL,args:[G.H,G.H,P.aj,G.A]},{func:1,ret:M.jb,args:[G.H,G.H,P.aj,G.A]},{func:1,ret:M.jw,args:[G.H,G.H,P.aj,G.A],opt:[[P.et,P.aZ,G.b7]]},{func:1,ret:U.hp,args:[G.A]},{func:1,ret:U.hD,args:[G.A]},{func:1,ret:U.hE,args:[G.A]},{func:1,ret:U.hF,args:[G.A]},{func:1,ret:U.hT,args:[G.A]},{func:1,ret:U.i2,args:[G.A]},{func:1,ret:U.i8,args:[G.A]},{func:1,ret:U.iM,args:[G.A]},{func:1,ret:U.iP,args:[G.A]},{func:1,ret:U.jB,args:[G.A]},{func:1,ret:U.jP,args:[G.A]},{func:1,args:[P.mp,,]},{func:1,void:true,args:[,P.cP]},{func:1,args:[,P.cP]},{func:1,ret:P.aj},{func:1,void:true,args:[P.o],opt:[P.cP]},{func:1,args:[P.o]},{func:1,void:true,args:[,,]},{func:1,args:[{func:1,void:true}]},{func:1,args:[,P.aZ]},{func:1,args:[P.x,P.x]},{func:1,args:[,,,]},{func:1,ret:S.hI,args:[G.A]},{func:1,ret:S.j6,args:[G.A]},{func:1,ret:B.hL,args:[G.H,G.A]},{func:1,ret:B.i_,args:[G.H,G.A]},{func:1,ret:B.jM,args:[G.H,G.A]},{func:1,ret:F.io,args:[G.A]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.zb(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.f=a.f
Isolate.eW=a.eW
return Isolate}}!function(){function intern(a){var u={}
u[a]=1
return Object.keys(convertToFastObject(u))[0]}init.getIsolateTag=function(a){return intern("___dart_"+a+init.isolateTag)}
var z="___dart_isolate_tags_"
var y=Object[z]||(Object[z]=Object.create(null))
var x="_ZxYxX"
for(var w=0;;w++){var v=intern(x+"_"+w+"_")
if(!(v in y)){y[v]=1
init.isolateTag=v
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(document.currentScript){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.nI(Q.nw(),b)},[])
else (function(b){H.nI(Q.nw(),b)})([])})})()