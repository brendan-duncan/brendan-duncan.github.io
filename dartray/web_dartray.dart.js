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
b5.$isj=b4
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
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isE)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
var d=supportsDirectProtoAccess&&b1!="j"
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.id"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.id"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.id(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.dy=function(){}
var dart=[["","",,H,{
"^":"",
xD:{
"^":"j;a"}}],["","",,J,{
"^":"",
B:function(a){return void 0},
eN:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
eJ:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.ih==null){H.uH()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.f(new P.dm("Return interceptor for "+H.l(y(a,z))))}w=H.uW(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.jF
else return C.jG}return w},
E:{
"^":"j;",
A:function(a,b){return a===b},
gav:function(a){return H.bs(a)},
E:["iX",function(a){return H.e1(a)}],
"%":"MediaError|MediaKeyError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|SVGAnimatedTransformList"},
nO:{
"^":"E;",
E:function(a){return String(a)},
gav:function(a){return a?519018:218159},
$isab:1},
nP:{
"^":"E;",
A:function(a,b){return null==b},
E:function(a){return"null"},
gav:function(a){return 0}},
jb:{
"^":"E;",
gav:function(a){return 0},
$isnQ:1},
oD:{
"^":"jb;"},
ei:{
"^":"jb;",
E:function(a){return String(a)}},
d9:{
"^":"E;",
f3:function(a,b){if(!!a.immutable$list)throw H.f(new P.a_(b))},
dQ:function(a,b){if(!!a.fixed$length)throw H.f(new P.a_(b))},
a4:function(a,b){this.dQ(a,"add")
a.push(b)},
e6:function(a,b){this.dQ(a,"removeAt")
if(b>=a.length)throw H.f(P.dh(b,null,null))
return a.splice(b,1)[0]},
hV:function(a,b){var z,y
this.dQ(a,"addAll")
for(z=b.length,y=0;y<z;++y)a.push(b[y])},
aH:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.f(new P.aN(a))}},
cE:function(a,b){return H.p(new H.dS(a,b),[null,null])},
b3:function(a,b){return H.ec(a,b,null,H.ar(a,0))},
aJ:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
ay:function(a,b,c){if(b==null)H.K(H.N(b))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.N(b))
if(b<0||b>a.length)throw H.f(P.ae(b,0,a.length,null,null))
if(c==null)c=a.length
else{if(typeof c!=="number"||Math.floor(c)!==c)throw H.f(H.N(c))
if(c<b||c>a.length)throw H.f(P.ae(c,b,a.length,null,null))}if(b===c)return H.p([],[H.ar(a,0)])
return H.p(a.slice(b,c),[H.ar(a,0)])},
gac:function(a){if(a.length>0)return a[0]
throw H.f(H.aJ())},
gaw:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.f(H.aJ())},
aj:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
this.f3(a,"set range")
P.bu(b,c,a.length,null,null,null)
z=J.m(c,b)
y=J.B(z)
if(y.A(z,0))return
if(J.a7(e,0))H.K(P.ae(e,0,null,"skipCount",null))
x=J.B(d)
if(!!x.$isw){w=e
v=d}else{v=x.b3(d,e).bQ(0,!1)
w=0}x=J.G(w)
u=J.y(v)
if(J.V(x.i(w,z),u.gm(v)))throw H.f(H.j7())
if(x.I(w,b))for(t=y.p(z,1),y=J.G(b);s=J.u(t),s.a9(t,0);t=s.p(t,1)){r=u.h(v,x.i(w,t))
a[y.i(b,t)]=r}else{if(typeof z!=="number")return H.c(z)
y=J.G(b)
t=0
for(;t<z;++t){r=u.h(v,x.i(w,t))
a[y.i(b,t)]=r}}},
ag:function(a,b,c,d){var z,y
this.f3(a,"fill range")
P.bu(b,c,a.length,null,null,null)
for(z=b;y=J.u(z),y.I(z,c);z=y.i(z,1))a[z]=d},
fF:function(a,b){this.f3(a,"sort")
H.dj(a,0,a.length-1,b)},
dd:function(a,b,c){var z
c=a.length-1
for(z=c;z>=0;--z){if(z>=a.length)return H.a(a,z)
if(J.k(a[z],b))return z}return-1},
e_:function(a,b){return this.dd(a,b,null)},
b6:function(a,b){var z
for(z=0;z<a.length;++z)if(J.k(a[z],b))return!0
return!1},
gY:function(a){return a.length===0},
gbe:function(a){return a.length!==0},
E:function(a){return P.dP(a,"[","]")},
gad:function(a){return new J.eU(a,a.length,0,null)},
gav:function(a){return H.bs(a)},
gm:function(a){return a.length},
sm:function(a,b){this.dQ(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(P.d0(b,"newLength",null))
if(b<0)throw H.f(P.ae(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.aq(a,b))
if(b>=a.length||b<0)throw H.f(H.aq(a,b))
return a[b]},
k:function(a,b,c){if(!!a.immutable$list)H.K(new P.a_("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.aq(a,b))
if(b>=a.length||b<0)throw H.f(H.aq(a,b))
a[b]=c},
S:function(a){return this.gm(a).$0()},
$isbC:1,
$isw:1,
$asw:null,
$isW:1,
static:{nN:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a||a<0)throw H.f(P.ak("Length must be a non-negative integer: "+H.l(a)))
z=H.p(new Array(a),[b])
z.fixed$length=Array
return z}}},
xC:{
"^":"d9;"},
eU:{
"^":"j;a,b,c,d",
ga8:function(){return this.d},
W:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.f(new P.aN(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
da:{
"^":"E;",
f6:function(a,b){var z
if(typeof b!=="number")throw H.f(H.N(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdY(b)
if(this.gdY(a)===z)return 0
if(this.gdY(a))return-1
return 1}return 0}else if(isNaN(a)){if(this.gff(b))return 0
return 1}else return-1},
gdY:function(a){return a===0?1/a<0:a<0},
gff:function(a){return isNaN(a)},
e5:function(a,b){return a%b},
hT:function(a){return Math.abs(a)},
F:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.f(new P.a_(""+a))},
O:function(a){return this.F(Math.floor(a))},
b_:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.f(new P.a_(""+a))},
v:function(a,b,c){if(typeof b!=="number")throw H.f(H.N(b))
if(typeof c!=="number")throw H.f(H.N(c))
if(this.f6(b,c)>0)throw H.f(H.N(b))
if(this.f6(a,b)<0)return b
if(this.f6(a,c)>0)return c
return a},
nO:function(a){return a},
dj:function(a,b){var z,y,x,w
H.ic(b)
if(b<2||b>36)throw H.f(P.ae(b,2,36,"radix",null))
z=a.toString(b)
if(C.c.P(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.K(new P.a_("Unexpected toString result: "+z))
x=J.y(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.c.q("0",w)},
E:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gav:function(a){return a&0x1FFFFFFF},
aa:function(a){return-a},
i:function(a,b){if(typeof b!=="number")throw H.f(H.N(b))
return a+b},
p:function(a,b){if(typeof b!=="number")throw H.f(H.N(b))
return a-b},
au:function(a,b){if(typeof b!=="number")throw H.f(H.N(b))
return a/b},
q:function(a,b){if(typeof b!=="number")throw H.f(H.N(b))
return a*b},
R:function(a,b){var z
if(typeof b!=="number")throw H.f(H.N(b))
z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
ak:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else{if(typeof b!=="number")H.K(H.N(b))
return this.F(a/b)}},
a3:function(a,b){return(a|0)===a?a/b|0:this.F(a/b)},
n:function(a,b){if(typeof b!=="number")throw H.f(H.N(b))
if(b<0)throw H.f(H.N(b))
return b>31?0:a<<b>>>0},
H:function(a,b){return b>31?0:a<<b>>>0},
w:function(a,b){var z
if(typeof b!=="number")throw H.f(H.N(b))
if(b<0)throw H.f(H.N(b))
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
l:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aR:function(a,b){if(b<0)throw H.f(H.N(b))
return b>31?0:a>>>b},
bm:function(a,b){return b>31?0:a>>>b},
L:function(a,b){if(typeof b!=="number")throw H.f(H.N(b))
return(a&b)>>>0},
cO:function(a,b){if(typeof b!=="number")throw H.f(H.N(b))
return(a|b)>>>0},
I:function(a,b){if(typeof b!=="number")throw H.f(H.N(b))
return a<b},
T:function(a,b){if(typeof b!=="number")throw H.f(H.N(b))
return a>b},
a6:function(a,b){if(typeof b!=="number")throw H.f(H.N(b))
return a<=b},
a9:function(a,b){if(typeof b!=="number")throw H.f(H.N(b))
return a>=b},
$iscl:1},
j9:{
"^":"da;",
$isau:1,
$iscl:1,
$iso:1},
j8:{
"^":"da;",
$isau:1,
$iscl:1},
db:{
"^":"E;",
P:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.aq(a,b))
if(b<0)throw H.f(H.aq(a,b))
if(b>=a.length)throw H.f(H.aq(a,b))
return a.charCodeAt(b)},
i:function(a,b){if(typeof b!=="string")throw H.f(P.d0(b,null,null))
return a+b},
dT:function(a,b){var z,y
H.eH(b)
z=b.length
y=a.length
if(z>y)return!1
return b===this.dt(a,y-z)},
iV:function(a,b,c){var z
H.ic(c)
if(c>a.length)throw H.f(P.ae(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
fH:function(a,b){return this.iV(a,b,0)},
as:function(a,b,c){var z
if(typeof b!=="number"||Math.floor(b)!==b)H.K(H.N(b))
if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.K(H.N(c))
z=J.u(b)
if(z.I(b,0))throw H.f(P.dh(b,null,null))
if(z.T(b,c))throw H.f(P.dh(b,null,null))
if(J.V(c,a.length))throw H.f(P.dh(c,null,null))
return a.substring(b,c)},
dt:function(a,b){return this.as(a,b,null)},
nR:function(a){return a.toLowerCase()},
nW:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.P(z,0)===133){x=J.nR(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.P(z,w)===133?J.nS(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
q:function(a,b){var z,y
if(typeof b!=="number")return H.c(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.f(C.aI)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
gmq:function(a){return new H.bU(a)},
n7:function(a,b,c){if(c<0||c>a.length)throw H.f(P.ae(c,0,a.length,null,null))
return a.indexOf(b,c)},
dd:function(a,b,c){var z,y
c=a.length
z=b.length
y=a.length
if(c+z>y)c=y-z
return a.lastIndexOf(b,c)},
e_:function(a,b){return this.dd(a,b,null)},
i5:function(a,b,c){if(c>a.length)throw H.f(P.ae(c,0,a.length,null,null))
return H.vA(a,b,c)},
b6:function(a,b){return this.i5(a,b,0)},
gY:function(a){return a.length===0},
gbe:function(a){return a.length!==0},
E:function(a){return a},
gav:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gm:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.aq(a,b))
if(b>=a.length||b<0)throw H.f(H.aq(a,b))
return a[b]},
S:function(a){return this.gm(a).$0()},
$isbC:1,
$isam:1,
static:{ja:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 6158:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},nR:function(a,b){var z,y
for(z=a.length;b<z;){y=C.c.P(a,b)
if(y!==32&&y!==13&&!J.ja(y))break;++b}return b},nS:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.c.P(a,z)
if(y!==32&&y!==13&&!J.ja(y))break}return b}}}}],["","",,H,{
"^":"",
dx:function(a,b){var z=a.d7(b)
if(!init.globalState.d.cy)init.globalState.f.dh()
return z},
eM:function(){--init.globalState.f.b},
lj:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.B(y).$isw)throw H.f(P.ak("Arguments to main must be a List: "+H.l(y)))
y=new H.rM(0,0,1,null,null,null,null,null,null,null,null,null,a)
y.lh()
y.f=new H.rm(P.fI(null,H.cL),0)
y.z=P.c2(null,null,null,P.o,H.eC)
y.ch=P.c2(null,null,null,P.o,null)
if(y.x===!0){y.Q=new H.rL()
y.li()}init.globalState=y
if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.c2(null,null,null,P.o,H.bG)
w=P.bp(null,null,null,P.o)
v=new H.bG(0,null,!1)
u=new H.eC(y,x,w,init.createNewIsolate(),v,new H.bn(H.cV()),new H.bn(H.cV()),!1,!1,[],P.bp(null,null,null,null),null,null,!1,!0,P.bp(null,null,null,null))
w.a4(0,0)
u.dw(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.dz()
x=H.cj(y,[y]).c0(a)
if(x)u.d7(new H.vy(z,a))
else{y=H.cj(y,[y,y]).c0(a)
if(y)u.d7(new H.vz(z,a))
else u.d7(a)}init.globalState.f.dh()},
nC:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.nD()
return},
nD:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.f(new P.a_("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.f(new P.a_("Cannot extract URI from \""+H.l(z)+"\""))},
j3:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.ex(!0,[]).c6(b.data)
y=J.y(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:H.j2(x)
v=y.h(z,"args")
u=new H.ex(!0,[]).c6(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.ex(!0,[]).c6(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.c2(null,null,null,P.o,H.bG)
p=P.bp(null,null,null,P.o)
o=new H.bG(0,null,!1)
n=new H.eC(y,q,p,init.createNewIsolate(),o,new H.bn(H.cV()),new H.bn(H.cV()),!1,!1,[],P.bp(null,null,null,null),null,null,!1,!0,P.bp(null,null,null,null))
p.a4(0,0)
n.dw(0,o)
init.globalState.f.a.bk(new H.cL(n,new H.ny(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.dh()
break
case"spawn-worker":if($.j5!=null)H.nE(z)
break
case"message":if(y.h(z,"port")!=null)J.by(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.dh()
break
case"close":init.globalState.ch.cc(0,$.$get$fz().h(0,a))
a.terminate()
init.globalState.f.dh()
break
case"log":H.nx(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.aP(["command","print","msg",z])
q=new H.bb(!0,P.b8(null,P.o)).aN(q)
y.toString
self.postMessage(q)}else P.dB(y.h(z,"msg"))
break
case"error":throw H.f(y.h(z,"msg"))}},
nE:function(a){var z,y
z=J.y(a)
y=z.h(a,"replyPort")
H.j6(z.h(a,"functionName"),z.h(a,"uri"),z.h(a,"args"),z.h(a,"msg"),!1,z.h(a,"isSpawnUri"),z.h(a,"startPaused")).di(new H.nF(y),new H.nG(y))},
nx:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.aP(["command","log","msg",a])
x=new H.bb(!0,P.b8(null,P.o)).aN(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.ad(w)
z=H.at(w)
throw H.f(P.cu(z))}},
j2:function(a){return init.globalFunctions[a]()},
j6:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t
if(b!=null&&J.dC(b,".dart"))b=J.b(b,".js")
z=$.e6
$.e6=z+1
y=new H.bG(z,null,!1)
x=init.globalState.d
x.dw(z,y)
x.d1()
w=new H.jI(y,null)
w.jH(y)
v=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[null])),[null])
w.gac(w).at(new H.nH(v))
u=new H.cM(y,init.globalState.d.a)
if(init.globalState.y===!0&&!e){if(c!=null)c=P.cx(c,!0,P.am)
if(init.globalState.x===!0){z=init.globalState.Q
y=P.aP(["command","spawn-worker","functionName",a,"args",c,"msg",d,"uri",b,"isSpawnUri",f,"startPaused",g,"replyPort",u])
y=new H.bb(!0,P.b8(null,P.o)).aN(y)
z.toString
self.postMessage(y)}else{if(b==null)b=$.$get$fy()
t=new Worker(b)
t.onerror=function(h,i,j){return function(k){return h(k,i,j)}}(H.nJ,b,new H.nI(v))
t.onmessage=function(h,i){return function(j){j.onerror=null
return h(i,j)}}(H.j3,t)
z=init.globalState.c++
$.$get$fz().k(0,t,z)
init.globalState.ch.k(0,z,t)
z=P.aP(["command","start","id",z,"replyTo",new H.bb(!0,P.b8(null,P.o)).aN(u),"args",c,"msg",new H.bb(!0,P.b8(null,P.o)).aN(d),"isSpawnUri",f,"startPaused",g,"functionName",a])
t.postMessage(new H.bb(!0,P.b8(null,P.o)).aN(z))}}else H.nA(a,b,c,d,f,g,u)
return v.a},
nA:function(a,b,c,d,e,f,g){var z,y,x,w,v,u
z={}
z.a=c
z.b=d
if(b!=null)throw H.f(new P.a_("Currently spawnUri is not supported without web workers."))
z.b=H.kW(d)
if(c!=null)z.a=P.cx(c,!0,P.am)
y=init.globalState.f
x=init.globalState.a++
w=P.c2(null,null,null,P.o,H.bG)
v=P.bp(null,null,null,P.o)
u=new H.bG(0,null,!1)
w=new H.eC(x,w,v,init.createNewIsolate(),u,new H.bn(H.cV()),new H.bn(H.cV()),!1,!1,[],P.bp(null,null,null,null),null,null,!1,!0,P.bp(null,null,null,null))
v.a4(0,0)
w.dw(0,u)
y.a.bk(new H.cL(w,new H.nB(z,a,e,f,g),"nonworker start"))},
j4:function(a,b,c,d,e,f){var z,y,x
z=init.globalState.d
y=z.a
$.jy=$.jy+("_"+y)
$.jz=$.jz+("_"+y)
y=z.e.giG()
x=z.f
J.by(f,["spawned",y,x,z.r])
y=new H.nz(a,b,c,d,z)
if(e===!0){z.hY(x,x)
init.globalState.f.a.bk(new H.cL(z,y,"start isolate"))}else y.$0()},
nJ:function(a,b,c){var z
a.preventDefault()
z=a.message
c.$1(z==null?"Error spawning worker for "+H.l(b):"Error spawning worker for "+H.l(b)+" ("+z+")")
return!0},
kW:function(a){return new H.ex(!0,[]).c6(new H.bb(!1,P.b8(null,P.o)).aN(a))},
vy:{
"^":"r:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
vz:{
"^":"r:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
rM:{
"^":"j;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
lh:function(){var z,y,x
z=self.window==null
y=self.Worker
x=z&&!!self.postMessage
this.x=x
if(!x)y=y!=null&&$.$get$fy()!=null
else y=!0
this.y=y
this.r=z&&!x},
li:function(){self.onmessage=function(a,b){return function(c){a(b,c)}}(H.j3,this.Q)
self.dartPrint=self.dartPrint||function(a){return function(b){if(self.console&&self.console.log)self.console.log(b)
else self.postMessage(a(b))}}(H.rN)},
static:{rN:function(a){var z=P.aP(["command","print","msg",a])
return new H.bb(!0,P.b8(null,P.o)).aN(z)}}},
eC:{
"^":"j;a,b,c,ni:d<,i6:e<,f,r,n8:x?,ng:y<,z,Q,ch,cx,cy,db,dx",
hY:function(a,b){if(!this.f.A(0,a))return
if(this.Q.a4(0,b)&&!this.y)this.y=!0
this.d1()},
nB:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.cc(0,a)
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
if(w===y.c)y.hl();++y.d}this.y=!1}this.d1()},
mg:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.B(a),y=0;x=this.ch,y<x.length;y+=2)if(z.A(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.a(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
nA:function(a){var z,y,x
if(this.ch==null)return
for(z=J.B(a),y=0;x=this.ch,y<x.length;y+=2)if(z.A(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.K(new P.a_("removeRange"))
P.bu(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
iQ:function(a,b){if(!this.r.A(0,a))return
this.db=b},
n0:function(a,b,c){var z=J.B(b)
if(!z.A(b,0))z=z.A(b,1)&&!this.cy
else z=!0
if(z){J.by(a,c)
return}z=this.cx
if(z==null){z=P.fI(null,null)
this.cx=z}z.bk(new H.rF(a,c))},
mZ:function(a,b){var z
if(!this.r.A(0,a))return
z=J.B(b)
if(!z.A(b,0))z=z.A(b,1)&&!this.cy
else z=!0
if(z){this.fh()
return}z=this.cx
if(z==null){z=P.fI(null,null)
this.cx=z}z.bk(this.gnj())},
n1:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.dB(a)
if(b!=null)P.dB(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.bS(a)
y[1]=b==null?null:J.bS(b)
for(x=new P.jc(z,z.r,null,null),x.c=z.e;x.W();)J.by(x.d,y)},
d7:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.ad(u)
w=t
v=H.at(u)
this.n1(w,v)
if(this.db===!0){this.fh()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gni()
if(this.cx!=null)for(;t=this.cx,!t.gY(t);)this.cx.iv().$0()}return y},
mY:function(a){var z=J.y(a)
switch(z.h(a,0)){case"pause":this.hY(z.h(a,1),z.h(a,2))
break
case"resume":this.nB(z.h(a,1))
break
case"add-ondone":this.mg(z.h(a,1),z.h(a,2))
break
case"remove-ondone":this.nA(z.h(a,1))
break
case"set-errors-fatal":this.iQ(z.h(a,1),z.h(a,2))
break
case"ping":this.n0(z.h(a,1),z.h(a,2),z.h(a,3))
break
case"kill":this.mZ(z.h(a,1),z.h(a,2))
break
case"getErrors":this.dx.a4(0,z.h(a,1))
break
case"stopErrors":this.dx.cc(0,z.h(a,1))
break}},
fj:function(a){return this.b.h(0,a)},
dw:function(a,b){var z=this.b
if(z.X(a))throw H.f(P.cu("Registry: ports must be registered only once."))
z.k(0,a,b)},
d1:function(){var z=this.b
if(z.gm(z)-this.c.a>0||this.y||!this.x)init.globalState.z.k(0,this.a,this)
else this.fh()},
fh:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.cC(0)
for(z=this.b,y=z.gb1(z),y=y.gad(y);y.W();)y.ga8().k5()
z.cC(0)
this.c.cC(0)
init.globalState.z.cc(0,this.a)
this.dx.cC(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.a(z,v)
J.by(w,z[v])}this.ch=null}},"$0","gnj",0,0,3]},
rF:{
"^":"r:3;a,b",
$0:function(){J.by(this.a,this.b)}},
rm:{
"^":"j;a,b",
mE:function(){var z=this.a
if(z.b===z.c)return
return z.iv()},
iy:function(){var z,y,x
z=this.mE()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.X(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gY(y)}else y=!1
else y=!1
else y=!1
if(y)H.K(P.cu("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gY(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aP(["command","close"])
x=new H.bb(!0,P.b8(null,P.o)).aN(x)
y.toString
self.postMessage(x)}return!1}z.nu()
return!0},
hE:function(){if(self.window!=null)new H.rn(this).$0()
else for(;this.iy(););},
dh:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.hE()
else try{this.hE()}catch(x){w=H.ad(x)
z=w
y=H.at(x)
w=init.globalState.Q
v=P.aP(["command","error","msg",H.l(z)+"\n"+H.l(y)])
v=new H.bb(!0,P.b8(null,P.o)).aN(v)
w.toString
self.postMessage(v)}}},
rn:{
"^":"r:3;a",
$0:function(){if(!this.a.iy())return
P.qh(C.a2,this)}},
cL:{
"^":"j;a,b,c",
nu:function(){var z=this.a
if(z.gng()){z.z.push(this)
return}z.d7(this.b)}},
rL:{
"^":"j;"},
ny:{
"^":"r:1;a,b,c,d,e,f",
$0:function(){H.j4(this.a,this.b,this.c,this.d,this.e,this.f)}},
nF:{
"^":"r:0;a",
$1:function(a){J.by(this.a,a)}},
nG:{
"^":"r:9;a",
$1:function(a){J.by(this.a,["spawn failed",a])}},
nH:{
"^":"r:0;a",
$1:function(a){var z,y
z=J.y(a)
y=this.a
if(J.k(z.h(a,0),"spawned"))y.aA(0,a)
else y.dS(z.h(a,1))}},
nI:{
"^":"r:9;a",
$1:function(a){return this.a.dS(a)}},
nB:{
"^":"r:1;a,b,c,d,e",
$0:function(){var z=this.a
H.j4(H.j2(this.b),z.a,z.b,this.c,this.d,this.e)}},
nz:{
"^":"r:3;a,b,c,d,e",
$0:function(){var z,y,x
this.e.sn8(!0)
if(this.d!==!0)this.a.$1(this.c)
else{z=this.a
y=H.dz()
x=H.cj(y,[y,y]).c0(z)
if(x)z.$2(this.b,this.c)
else{y=H.cj(y,[y]).c0(z)
if(y)z.$1(this.b)
else z.$0()}}}},
kA:{
"^":"j;",
$ishm:1},
cM:{
"^":"kA;b,a",
ce:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.ghq())return
x=H.kW(b)
if(J.k(z.gi6(),y)){z.mY(x)
return}y=init.globalState.f
w="receive "+H.l(b)
y.a.bk(new H.cL(z,new H.rP(this,x),w))},
A:function(a,b){if(b==null)return!1
return b instanceof H.cM&&J.k(this.b,b.b)},
gav:function(a){return this.b.geJ()},
$ishm:1},
rP:{
"^":"r:1;a,b",
$0:function(){var z=this.a.b
if(!z.ghq())z.k0(this.b)}},
i5:{
"^":"kA;b,c,a",
ce:function(a,b){var z,y,x
z=P.aP(["command","message","port",this,"msg",b])
y=new H.bb(!0,P.b8(null,P.o)).aN(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
A:function(a,b){if(b==null)return!1
return b instanceof H.i5&&J.k(this.b,b.b)&&J.k(this.a,b.a)&&J.k(this.c,b.c)},
gav:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.n()
y=this.a
if(typeof y!=="number")return y.n()
x=this.c
if(typeof x!=="number")return H.c(x)
return(z<<16^y<<8^x)>>>0},
$ishm:1},
bG:{
"^":"j;eJ:a<,b,hq:c<",
k5:function(){this.c=!0
this.b=null},
dR:function(a){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.cc(0,y)
z.c.cc(0,y)
z.d1()},
k0:function(a){if(this.c)return
this.l0(a)},
giG:function(){return new H.cM(this,init.globalState.d.a)},
l0:function(a){return this.b.$1(a)},
$isp8:1},
jI:{
"^":"aC;a,b",
aL:function(a,b,c,d){var z=this.b
z.toString
return H.p(new P.hX(z),[H.ar(z,0)]).aL(a,b,c,d)},
e0:function(a,b,c){return this.aL(a,null,b,c)},
dR:[function(a){this.a.dR(0)
this.b.dR(0)},"$0","gi3",0,0,3],
jH:function(a){var z=P.jZ(this.gi3(this),null,null,null,!0,null)
this.b=z
this.a.b=z.ghU(z)},
$asaC:I.dy},
qd:{
"^":"j;a,b,c",
jP:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.bk(new H.cL(y,new H.qf(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.cU(new H.qg(this,b),0),a)}else throw H.f(new P.a_("Timer greater than 0."))},
static:{qe:function(a,b){var z=new H.qd(!0,!1,null)
z.jP(a,b)
return z}}},
qf:{
"^":"r:3;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
qg:{
"^":"r:3;a,b",
$0:function(){this.a.c=null
H.eM()
this.b.$0()}},
bn:{
"^":"j;eJ:a<",
gav:function(a){var z=this.a
if(typeof z!=="number")return z.w()
z=C.b.l(z,0)^C.b.a3(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.bn){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bb:{
"^":"j;a,b",
aN:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.k(0,a,z.gm(z))
z=J.B(a)
if(!!z.$isfU)return["buffer",a]
if(!!z.$isdV)return["typed",a]
if(!!z.$isbC)return this.iK(a)
if(!!z.$isnv){x=this.giH()
w=a.gdZ()
w=H.dR(w,x,H.an(w,"aI",0),null)
w=P.cx(w,!0,H.an(w,"aI",0))
z=z.gb1(a)
z=H.dR(z,x,H.an(z,"aI",0),null)
return["map",w,P.cx(z,!0,H.an(z,"aI",0))]}if(!!z.$isnQ)return this.iL(a)
if(!!z.$isE)this.iD(a)
if(!!z.$isp8)this.dm(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscM)return this.iM(a)
if(!!z.$isi5)return this.iN(a)
if(!!z.$isr){v=a.$name
if(v==null)this.dm(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbn)return["capability",a.a]
if(!(a instanceof P.j))this.iD(a)
return["dart",init.classIdExtractor(a),this.iJ(init.classFieldsExtractor(a))]},"$1","giH",2,0,0],
dm:function(a,b){throw H.f(new P.a_(H.l(b==null?"Can't transmit:":b)+" "+H.l(a)))},
iD:function(a){return this.dm(a,null)},
iK:function(a){var z=this.iI(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.dm(a,"Can't serialize indexable: ")},
iI:function(a){var z,y,x
z=[]
C.e.sm(z,a.length)
for(y=0;y<a.length;++y){x=this.aN(a[y])
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
iJ:function(a){var z
for(z=0;z<a.length;++z)C.e.k(a,z,this.aN(a[z]))
return a},
iL:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.dm(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.e.sm(y,z.length)
for(x=0;x<z.length;++x){w=this.aN(a[z[x]])
if(x>=y.length)return H.a(y,x)
y[x]=w}return["js-object",z,y]},
iN:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
iM:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.geJ()]
return["raw sendport",a]}},
ex:{
"^":"j;a,b",
c6:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.f(P.ak("Bad serialized message: "+H.l(a)))
switch(C.e.gac(a)){case"ref":if(1>=a.length)return H.a(a,1)
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
y=this.d5(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=this.d5(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return this.d5(x)
case"const":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=this.d5(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.mH(a)
case"sendport":return this.mI(a)
case"raw sendport":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.mG(a)
case"function":if(1>=a.length)return H.a(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.a(a,1)
return new H.bn(a[1])
case"dart":y=a.length
if(1>=y)return H.a(a,1)
w=a[1]
if(2>=y)return H.a(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.d5(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.f("couldn't deserialize: "+H.l(a))}},"$1","gmF",2,0,0],
d5:function(a){var z,y,x
z=J.y(a)
y=0
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.c(x)
if(!(y<x))break
z.k(a,y,this.c6(z.h(a,y)));++y}return a},
mH:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w=P.Z()
this.b.push(w)
y=J.lz(y,this.gmF()).cG(0)
for(z=J.y(y),v=J.y(x),u=0;u<z.gm(y);++u){if(u>=y.length)return H.a(y,u)
w.k(0,y[u],this.c6(v.h(x,u)))}return w},
mI:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
if(3>=z)return H.a(a,3)
w=a[3]
if(J.k(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.fj(w)
if(u==null)return
t=new H.cM(u,x)}else t=new H.i5(y,w,x)
this.b.push(t)
return t},
mG:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.y(y)
v=J.y(x)
u=0
while(!0){t=z.gm(y)
if(typeof t!=="number")return H.c(t)
if(!(u<t))break
w[z.h(y,u)]=this.c6(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
m3:function(){throw H.f(new P.a_("Cannot modify unmodifiable Map"))},
tW:function(a){return init.types[a]},
lc:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.B(a).$isc0},
l:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.bS(a)
if(typeof z!=="string")throw H.f(H.N(a))
return z},
bs:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
h9:function(a,b){throw H.f(new P.d6(a,null,null))},
jB:function(a,b,c){var z,y,x,w,v,u
H.eH(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.h9(a,c)
if(3>=z.length)return H.a(z,3)
y=z[3]
if(b==null){if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.h9(a,c)}if(b<2||b>36)throw H.f(P.ae(b,2,36,"radix",null))
if(b===10&&y!=null)return parseInt(a,10)
if(b<10||y==null){x=b<=10?47+b:86+b
w=z[1]
for(v=w.length,u=0;u<v;++u)if((C.c.P(w,u)|32)>x)return H.h9(a,c)}return parseInt(a,b)},
jx:function(a,b){throw H.f(new P.d6("Invalid double",a,null))},
oK:function(a,b){var z,y
H.eH(a)
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return H.jx(a,b)
z=parseFloat(a)
if(isNaN(z)){y=J.lG(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return H.jx(a,b)}return z},
jA:function(a){var z,y
z=C.a4(J.B(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.c.P(z,0)===36)z=C.c.dt(z,1)
return(z+H.ld(H.eK(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
e1:function(a){return"Instance of '"+H.jA(a)+"'"},
yn:[function(){return Date.now()},"$0","tm",0,0,38],
oI:function(){var z,y
if($.e2!=null)return
$.e2=1000
$.dg=H.tm()
if(typeof window=="undefined")return
z=window
if(z==null)return
y=z.performance
if(y==null)return
if(typeof y.now!="function")return
$.e2=1e6
$.dg=new H.oJ(y)},
jw:function(a){var z,y,x,w,v
z=a.length
if(z<=500)return String.fromCharCode.apply(null,a)
for(y="",x=0;x<z;x=w){w=x+500
v=w<z?w:z
y+=String.fromCharCode.apply(null,a.slice(x,v))}return y},
oL:function(a){var z,y,x,w
z=[]
z.$builtinTypeInfo=[P.o]
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.aA)(a),++x){w=a[x]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.f(H.N(w))
if(w<=65535)z.push(w)
else if(w<=1114111){z.push(55296+(C.a.l(w-65536,10)&1023))
z.push(56320+(w&1023))}else throw H.f(H.N(w))}return H.jw(z)},
jC:function(a){var z,y,x,w
for(z=a.length,y=0;x=a.length,y<x;x===z||(0,H.aA)(a),++y){w=a[y]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.f(H.N(w))
if(w<0)throw H.f(H.N(w))
if(w>65535)return H.oL(a)}return H.jw(a)},
oM:function(a,b,c){var z,y,x,w,v
z=J.u(c)
if(z.a6(c,500)&&b===0&&z.A(c,a.length))return String.fromCharCode.apply(null,a)
if(typeof c!=="number")return H.c(c)
y=b
x=""
for(;y<c;y=w){w=y+500
if(w<c)v=w
else v=c
x+=String.fromCharCode.apply(null,a.subarray(y,v))}return x},
cE:function(a){var z
if(typeof a!=="number")return H.c(a)
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.b.l(z,10))>>>0,(56320|z&1023)>>>0)}}throw H.f(P.ae(a,0,1114111,null,null))},
aQ:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
e0:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.N(a))
return a[b]},
ha:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.N(a))
a[b]=c},
c:function(a){throw H.f(H.N(a))},
a:function(a,b){if(a==null)J.M(a)
throw H.f(H.aq(a,b))},
aq:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.bz(!0,b,"index",null)
z=J.M(a)
if(!(b<0)){if(typeof z!=="number")return H.c(z)
y=b>=z}else y=!0
if(y)return P.c_(b,a,"index",null,z)
return P.dh(b,"index",null)},
N:function(a){return new P.bz(!0,a,null,null)},
T:function(a){if(typeof a!=="number")throw H.f(H.N(a))
return a},
ic:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.f(H.N(a))
return a},
eH:function(a){if(typeof a!=="string")throw H.f(H.N(a))
return a},
f:function(a){var z
if(a==null)a=new P.fX()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.ll})
z.name=""}else z.toString=H.ll
return z},
ll:function(){return J.bS(this.dartException)},
K:function(a){throw H.f(a)},
aA:function(a){throw H.f(new P.aN(a))},
ad:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.w9(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.a.l(x,16)&8191)===10)switch(w){case 438:return z.$1(H.fD(H.l(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.l(y)+" (Error "+w+")"
return z.$1(new H.js(v,null))}}if(a instanceof TypeError){u=$.$get$k4()
t=$.$get$k5()
s=$.$get$k6()
r=$.$get$k7()
q=$.$get$kb()
p=$.$get$kc()
o=$.$get$k9()
$.$get$k8()
n=$.$get$ke()
m=$.$get$kd()
l=u.br(y)
if(l!=null)return z.$1(H.fD(y,l))
else{l=t.br(y)
if(l!=null){l.method="call"
return z.$1(H.fD(y,l))}else{l=s.br(y)
if(l==null){l=r.br(y)
if(l==null){l=q.br(y)
if(l==null){l=p.br(y)
if(l==null){l=o.br(y)
if(l==null){l=r.br(y)
if(l==null){l=n.br(y)
if(l==null){l=m.br(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.js(y,l==null?null:l.method))}}return z.$1(new H.qo(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.jW()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.bz(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.jW()
return a},
at:function(a){var z
if(a==null)return new H.kM(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.kM(a,null)},
ve:function(a){if(a==null||typeof a!='object')return J.aG(a)
else return H.bs(a)},
l8:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.k(0,a[y],a[x])}return b},
uJ:function(a,b,c,d,e,f,g){var z=J.B(c)
if(z.A(c,0))return H.dx(b,new H.uK(a))
else if(z.A(c,1))return H.dx(b,new H.uL(a,d))
else if(z.A(c,2))return H.dx(b,new H.uM(a,d,e))
else if(z.A(c,3))return H.dx(b,new H.uN(a,d,e,f))
else if(z.A(c,4))return H.dx(b,new H.uO(a,d,e,f,g))
else throw H.f(P.cu("Unsupported number of arguments for wrapped closure"))},
cU:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.uJ)
a.$identity=z
return z},
m1:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.B(c).$isw){z.$reflectionInfo=c
x=H.pc(z).r}else x=c
w=d?Object.create(new H.pK().constructor.prototype):Object.create(new H.eX(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.bf
$.bf=J.b(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.iy(a,z,t)
s.$reflectionInfo=c}else{w.$name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.tW(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.iw:H.eY
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.f("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.iy(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
lZ:function(a,b,c,d){var z=H.eY
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
iy:function(a,b,c){var z,y,x,w,v,u
if(c)return H.m0(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.lZ(y,!w,z,b)
if(y===0){w=$.cs
if(w==null){w=H.dI("self")
$.cs=w}w="return function(){return this."+H.l(w)+"."+H.l(z)+"();"
v=$.bf
$.bf=J.b(v,1)
return new Function(w+H.l(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.cs
if(v==null){v=H.dI("self")
$.cs=v}v=w+H.l(v)+"."+H.l(z)+"("+u+");"
w=$.bf
$.bf=J.b(w,1)
return new Function(v+H.l(w)+"}")()},
m_:function(a,b,c,d){var z,y
z=H.eY
y=H.iw
switch(b?-1:a){case 0:throw H.f(new H.pw("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
m0:function(a,b){var z,y,x,w,v,u,t,s
z=H.lR()
y=$.iv
if(y==null){y=H.dI("receiver")
$.iv=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.m_(w,!u,x,b)
if(w===1){y="return function(){return this."+H.l(z)+"."+H.l(x)+"(this."+H.l(y)+");"
u=$.bf
$.bf=J.b(u,1)
return new Function(y+H.l(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.l(z)+"."+H.l(x)+"(this."+H.l(y)+", "+s+");"
u=$.bf
$.bf=J.b(u,1)
return new Function(y+H.l(u)+"}")()},
id:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.B(c).$isw){c.fixed$length=Array
z=c}else z=c
return H.m1(a,b,z,!!d,e,f)},
w8:function(a){throw H.f(new P.m6("Cyclic initialization for static "+H.l(a)))},
cj:function(a,b,c){return new H.px(a,b,c,null)},
dz:function(){return C.aH},
cV:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
p:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
eK:function(a){if(a==null)return
return a.$builtinTypeInfo},
la:function(a,b){return H.im(a["$as"+H.l(b)],H.eK(a))},
an:function(a,b,c){var z=H.la(a,b)
return z==null?null:z[c]},
ar:function(a,b){var z=H.eK(a)
return z==null?null:z[b]},
il:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.ld(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.a.E(a)
else return},
ld:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bN("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.l(H.il(u,c))}return w?"":"<"+H.l(z)+">"},
im:function(a,b){if(typeof a=="function"){a=H.ii(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.ii(a,null,b)}return b},
ck:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.eK(a)
y=J.B(a)
if(y[b]==null)return!1
return H.l3(H.im(y[d],z),c)},
l3:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.aX(a[y],b[y]))return!1
return!0},
cT:function(a,b,c){return H.ii(a,b,H.la(b,c))},
aX:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.lb(a,b)
if('func' in a)return b.builtin$cls==="mL"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.il(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.l(H.il(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.l3(H.im(v,z),x)},
l2:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.aX(z,v)||H.aX(v,z)))return!1}return!0},
tx:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.aX(v,u)||H.aX(u,v)))return!1}return!0},
lb:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.aX(z,y)||H.aX(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.l2(x,w,!1))return!1
if(!H.l2(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.aX(o,n)||H.aX(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.aX(o,n)||H.aX(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.aX(o,n)||H.aX(n,o)))return!1}}return H.tx(a.named,b.named)},
ii:function(a,b,c){return a.apply(b,c)},
A9:function(a){var z=$.ie
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
A7:function(a){return H.bs(a)},
A6:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
uW:function(a){var z,y,x,w,v,u
z=$.ie.$1(a)
y=$.eI[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.eL[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.l1.$2(a,z)
if(z!=null){y=$.eI[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.eL[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.ij(x)
$.eI[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.eL[z]=x
return x}if(v==="-"){u=H.ij(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.lf(a,x)
if(v==="*")throw H.f(new P.dm(z))
if(init.leafTags[z]===true){u=H.ij(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.lf(a,x)},
lf:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.eN(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
ij:function(a){return J.eN(a,!1,null,!!a.$isc0)},
v0:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.eN(z,!1,null,!!z.$isc0)
else return J.eN(z,c,null,null)},
uH:function(){if(!0===$.ih)return
$.ih=!0
H.uI()},
uI:function(){var z,y,x,w,v,u,t,s
$.eI=Object.create(null)
$.eL=Object.create(null)
H.uD()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.lh.$1(v)
if(u!=null){t=H.v0(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
uD:function(){var z,y,x,w,v,u,t
z=C.aL()
z=H.ci(C.aM,H.ci(C.aN,H.ci(C.a3,H.ci(C.a3,H.ci(C.aP,H.ci(C.aO,H.ci(C.aQ(C.a4),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.ie=new H.uE(v)
$.l1=new H.uF(u)
$.lh=new H.uG(t)},
ci:function(a,b){return a(b)||b},
vA:function(a,b,c){return a.indexOf(b,c)>=0},
vB:function(a,b,c,d){var z=a.indexOf(b,d)
if(z<0)return a
return H.vC(a,z,z+b.length,c)},
vC:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+d+y},
iz:{
"^":"j;",
gY:function(a){return J.k(this.gm(this),0)},
gbe:function(a){return!J.k(this.gm(this),0)},
E:function(a){return P.jj(this)},
k:function(a,b,c){return H.m3()},
$iscz:1},
m4:{
"^":"iz;m:a>,b,c",
X:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
h:function(a,b){if(!this.X(b))return
return this.ha(b)},
ha:function(a){return this.b[a]},
aH:function(a,b){var z,y,x
z=this.c
for(y=0;y<z.length;++y){x=z[y]
b.$2(x,this.ha(x))}},
S:function(a){return this.a.$0()}},
mP:{
"^":"iz;a",
dI:function(){var z=this.$map
if(z==null){z=new H.dd(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.l8(this.a,z)
this.$map=z}return z},
X:function(a){return this.dI().X(a)},
h:function(a,b){return this.dI().h(0,b)},
aH:function(a,b){this.dI().aH(0,b)},
gm:function(a){var z=this.dI()
return z.gm(z)},
S:function(a){return this.gm(this).$0()}},
pb:{
"^":"j;a,B:b>,c,d,e,f,r,x",
static:{pc:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.pb(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
oJ:{
"^":"r:1;a",
$0:function(){return C.b.F(Math.floor(1000*this.a.now()))}},
qm:{
"^":"j;a,b,c,d,e,f",
br:function(a){var z,y,x
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
static:{bi:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.qm(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},eh:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},ka:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
js:{
"^":"aB;a,b",
E:function(a){var z=this.b
if(z==null)return"NullError: "+H.l(this.a)
return"NullError: method not found: '"+H.l(z)+"' on null"}},
nZ:{
"^":"aB;a,b,c",
E:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.l(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.l(z)+"' ("+H.l(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.l(z)+"' on '"+H.l(y)+"' ("+H.l(this.a)+")"},
static:{fD:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.nZ(a,y,z?null:b.receiver)}}},
qo:{
"^":"aB;a",
E:function(a){var z=this.a
return C.c.gY(z)?"Error":"Error: "+z}},
w9:{
"^":"r:0;a",
$1:function(a){if(!!J.B(a).$isaB)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
kM:{
"^":"j;a,b",
E:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
uK:{
"^":"r:1;a",
$0:function(){return this.a.$0()}},
uL:{
"^":"r:1;a,b",
$0:function(){return this.a.$1(this.b)}},
uM:{
"^":"r:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
uN:{
"^":"r:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
uO:{
"^":"r:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
r:{
"^":"j;",
E:function(a){return"Closure '"+H.jA(this)+"'"},
giE:function(){return this},
giE:function(){return this}},
k1:{
"^":"r;"},
pK:{
"^":"k1;",
E:function(a){var z=this.$name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
eX:{
"^":"k1;a,b,c,d",
A:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.eX))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gav:function(a){var z,y
z=this.c
if(z==null)y=H.bs(this.a)
else y=typeof z!=="object"?J.aG(z):H.bs(z)
z=H.bs(this.b)
if(typeof y!=="number")return y.o6()
return(y^z)>>>0},
E:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.l(this.d)+"' of "+H.e1(z)},
static:{eY:function(a){return a.a},iw:function(a){return a.c},lR:function(){var z=$.cs
if(z==null){z=H.dI("self")
$.cs=z}return z},dI:function(a){var z,y,x,w,v
z=new H.eX("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
pw:{
"^":"aB;a",
E:function(a){return"RuntimeError: "+this.a}},
jM:{
"^":"j;"},
px:{
"^":"jM;a,b,c,d",
c0:function(a){var z=this.kI(a)
return z==null?!1:H.lb(z,this.cH())},
kI:function(a){var z=J.B(a)
return"$signature" in z?z.$signature():null},
cH:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.B(y)
if(!!x.$iszD)z.void=true
else if(!x.$isiI)z.ret=y.cH()
y=this.b
if(y!=null&&y.length!==0)z.args=H.jL(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.jL(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.l7(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].cH()}z.named=w}return z},
E:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.l(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.l(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.l7(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.l(z[s].cH())+" "+s}x+="}"}}return x+(") -> "+H.l(this.a))},
static:{jL:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].cH())
return z}}},
iI:{
"^":"jM;",
E:function(a){return"dynamic"},
cH:function(){return}},
dd:{
"^":"j;a,b,c,d,e,f,r",
gm:function(a){return this.a},
gY:function(a){return this.a===0},
gbe:function(a){return!this.gY(this)},
gdZ:function(){return H.p(new H.o6(this),[H.ar(this,0)])},
gb1:function(a){return H.dR(this.gdZ(),new H.nY(this),H.ar(this,0),H.ar(this,1))},
X:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.h0(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.h0(y,a)}else return this.na(a)},
na:function(a){var z=this.d
if(z==null)return!1
return this.dc(this.bw(z,this.da(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.bw(z,b)
return y==null?null:y.gc8()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.bw(x,b)
return y==null?null:y.gc8()}else return this.nb(b)},
nb:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.bw(z,this.da(a))
x=this.dc(y,a)
if(x<0)return
return y[x].gc8()},
k:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.eL()
this.b=z}this.fN(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.eL()
this.c=y}this.fN(y,b,c)}else this.nd(b,c)},
nd:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.eL()
this.d=z}y=this.da(a)
x=this.bw(z,y)
if(x==null)this.eY(z,y,[this.eM(a,b)])
else{w=this.dc(x,a)
if(w>=0)x[w].sc8(b)
else x.push(this.eM(a,b))}},
cc:function(a,b){if(typeof b==="string")return this.hB(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.hB(this.c,b)
else return this.nc(b)},
nc:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.bw(z,this.da(a))
x=this.dc(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.hP(w)
return w.gc8()},
cC:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
aH:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.f(new P.aN(this))
z=z.c}},
fN:function(a,b,c){var z=this.bw(a,b)
if(z==null)this.eY(a,b,this.eM(b,c))
else z.sc8(c)},
hB:function(a,b){var z
if(a==null)return
z=this.bw(a,b)
if(z==null)return
this.hP(z)
this.h6(a,b)
return z.gc8()},
eM:function(a,b){var z,y
z=new H.o5(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
hP:function(a){var z,y
z=a.glw()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
da:function(a){return J.aG(a)&0x3ffffff},
dc:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.k(a[y].gib(),b))return y
return-1},
E:function(a){return P.jj(this)},
bw:function(a,b){return a[b]},
eY:function(a,b,c){a[b]=c},
h6:function(a,b){delete a[b]},
h0:function(a,b){return this.bw(a,b)!=null},
eL:function(){var z=Object.create(null)
this.eY(z,"<non-identifier-key>",z)
this.h6(z,"<non-identifier-key>")
return z},
S:function(a){return this.gm(this).$0()},
$isnv:1,
$iscz:1},
nY:{
"^":"r:0;a",
$1:function(a){return this.a.h(0,a)}},
o5:{
"^":"j;ib:a<,c8:b@,c,lw:d<"},
o6:{
"^":"aI;a",
gm:function(a){return this.a.a},
gY:function(a){return this.a.a===0},
gad:function(a){var z,y
z=this.a
y=new H.o7(z,z.r,null,null)
y.c=z.e
return y},
aH:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.f(new P.aN(z))
y=y.c}},
S:function(a){return this.gm(this).$0()},
$isW:1},
o7:{
"^":"j;a,b,c,d",
ga8:function(){return this.d},
W:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.aN(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
uE:{
"^":"r:0;a",
$1:function(a){return this.a(a)}},
uF:{
"^":"r:33;a",
$2:function(a,b){return this.a(a,b)}},
uG:{
"^":"r:9;a",
$1:function(a){return this.a(a)}}}],["","",,E,{
"^":"",
f_:{
"^":"dG;b,bn:c<,a",
aI:function(){return this.c},
b5:function(){return!0},
j2:function(a){var z,y,x
$.A.$2(0,"Building Brute Force Acceleration Structures.")
z=J.y(a)
y=0
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.c(x)
if(!(y<x))break
z.h(a,y).dV(this.b);++y}for(y=0;z=this.b,y<z.length;++y){x=this.c
z=z[y].aI()
this.c=new G.ah(new G.t(new Float32Array(H.D(x.a.a))),new G.t(new Float32Array(H.D(x.b.a)))).bg(z)}},
static:{lS:function(a){var z,y
z=G.a0(null,null)
y=$.bF
$.bF=y+1
y=new E.f_([],z,y)
y.j2(a)
return y},ws:[function(a,b){return E.lS(a)},"$2","tt",4,0,39]}},
eV:{
"^":"dG;b,c,d,e,a",
aI:function(){var z=this.e
if(z!=null){if(0>=z.length)return H.a(z,0)
z=z[0].a}else z=G.a0(null,null)
return z},
b5:function(){return!0},
ej:function(a4,a5,a6,a7,a8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z={}
a7[0]=a7[0]+1
y=new E.rb(G.a0(null,null),[null,null],null,null,null)
x=G.a0(null,null)
for(w=a4.length,v=a5;v<a6;++v){if(v>=w)return H.a(a4,v)
u=a4[v].gbn()
x=new G.ah(new G.t(new Float32Array(H.D(x.a.a))),new G.t(new Float32Array(H.D(x.b.a)))).bg(u)}t=a6-a5
if(t===1){s=a8.length
for(v=a5;v<a6;++v){if(v>=w)return H.a(a4,v)
r=a4[v].ge4()
z=this.d
if(r>=z.length)return H.a(z,r)
a8.push(z[r])}y.d=s
y.e=t
z=y.a
z.a.b7(x.a)
z.b.b7(x.b)}else{q=G.a0(null,null)
z.a=q
for(u=q,v=a5;v<a6;++v,u=q){if(v>=w)return H.a(a4,v)
p=a4[v].gc4()
q=new G.ah(new G.t(new Float32Array(H.D(u.a.a))),new G.t(new Float32Array(H.D(u.b.a)))).ar(p)
z.a=q}o=u.fl()
n=C.a.a3(a5+a6,2)
u=z.a
p=u.b.a
if(o>=p.length)return H.a(p,o)
p=p[o]
u=u.a.a
if(o>=u.length)return H.a(u,o)
u=u[o]
if(p===u){s=a8.length
for(v=a5;v<a6;++v){if(v>=w)return H.a(a4,v)
r=a4[v].ge4()
z=this.d
if(r>=z.length)return H.a(z,r)
a8.push(z[r])}y.d=s
y.e=t
z=y.a
z.a.b7(x.a)
z.b.b7(x.b)
return y}m=new E.lL(o)
switch(this.c){case 0:l=G.ik(a4,new E.lM(o,0.5*(u+p)),a5,a6)
if(l!==a5&&l!==a6){n=l
break}G.dA(a4,a5,n,a6,m)
break
case 1:G.dA(a4,a5,n,a6,m)
break
case 2:if(t<=4)G.dA(a4,a5,n,a6,m)
else{k=H.p(Array(12),[E.ev])
for(u=k.length,v=0;v<12;++v){p=G.a0(null,null)
if(v>=u)return H.a(k,v)
k[v]=new E.ev(0,p)}for(v=a5;v<a6;++v){if(v>=w)return H.a(a4,v)
p=a4[v].gc4().a
if(o>=p.length)return H.a(p,o)
p=p[o]
m=z.a
j=m.a.a
if(o>=j.length)return H.a(j,o)
j=j[o]
m=m.b.a
if(o>=m.length)return H.a(m,o)
i=C.b.F(12*((p-j)/(m[o]-j)))
if(i===12)i=11
if(i<0||i>=u)return H.a(k,i)
p=k[i];++p.a
m=p.b
j=a4[v].gbn()
p.b=new G.ah(new G.t(new Float32Array(H.D(m.a.a))),new G.t(new Float32Array(H.D(m.b.a)))).bg(j)}h=G.a0(null,null)
g=G.a0(null,null)
p=H.i(11)
f=new Float32Array(p)
for(v=0;v<11;v=d){h.e8(0)
g.e8(0)
for(e=0,d=0;d<=v;++d){if(d>=u)return H.a(k,d)
m=k[d].b
h=new G.ah(new G.t(new Float32Array(H.D(h.a.a))),new G.t(new Float32Array(H.D(h.b.a)))).bg(m)
e+=k[d].a}for(d=v+1,c=d,b=0;c<12;++c){if(c>=u)return H.a(k,c)
m=k[c].b
g=new G.ah(new G.t(new Float32Array(H.D(g.a.a))),new G.t(new Float32Array(H.D(g.b.a)))).bg(m)
b+=k[c].a}m=h.ci()
j=g.ci()
a=x.ci()
if(v>=p)return H.a(f,v)
f[v]=0.125+(e*m+b*j)/a}if(0>=p)return H.a(f,0)
a0=f[0]
z.b=0
for(v=1;v<11;++v){if(v>=p)return H.a(f,v)
a1=f[v]
if(a1<a0){z.b=v
a0=a1}}if(t>this.b||a0<t)n=G.ik(a4,new E.iu(z,this,o,12),a5,a6)
else{s=a8.length
for(v=a5;v<a6;++v){if(v>=w)return H.a(a4,v)
r=a4[v].ge4()
z=this.d
if(r>=z.length)return H.a(z,r)
a8.push(z[r])}y.d=s
y.e=t
z=y.a
z.a.b7(x.a)
z.b.b7(x.b)
return y}}break
default:if(t<=4)G.dA(a4,a5,n,a6,m)
else{k=H.p(Array(12),[E.ev])
for(u=k.length,v=0;v<12;++v){p=G.a0(null,null)
if(v>=u)return H.a(k,v)
k[v]=new E.ev(0,p)}for(v=a5;v<a6;++v){if(v>=w)return H.a(a4,v)
p=a4[v].gc4().a
if(o>=p.length)return H.a(p,o)
p=p[o]
m=z.a
j=m.a.a
if(o>=j.length)return H.a(j,o)
j=j[o]
m=m.b.a
if(o>=m.length)return H.a(m,o)
i=C.b.F(12*((p-j)/(m[o]-j)))
if(i===12)i=11
if(i<0||i>=u)return H.a(k,i)
p=k[i];++p.a
m=p.b
j=a4[v].gbn()
p.b=new G.ah(new G.t(new Float32Array(H.D(m.a.a))),new G.t(new Float32Array(H.D(m.b.a)))).bg(j)}h=G.a0(null,null)
g=G.a0(null,null)
p=H.i(11)
f=new Float32Array(p)
for(v=0;v<11;v=d){h.e8(0)
g.e8(0)
for(e=0,d=0;d<=v;++d){if(d>=u)return H.a(k,d)
m=k[d].b
h=new G.ah(new G.t(new Float32Array(H.D(h.a.a))),new G.t(new Float32Array(H.D(h.b.a)))).bg(m)
e+=k[d].a}for(d=v+1,c=d,b=0;c<12;++c){if(c>=u)return H.a(k,c)
m=k[c].b
g=new G.ah(new G.t(new Float32Array(H.D(g.a.a))),new G.t(new Float32Array(H.D(g.b.a)))).bg(m)
b+=k[c].a}m=h.ci()
j=g.ci()
a=x.ci()
if(v>=p)return H.a(f,v)
f[v]=0.125+(e*m+b*j)/a}if(0>=p)return H.a(f,0)
a0=f[0]
z.b=0
for(v=1;v<11;++v){if(v>=p)return H.a(f,v)
a1=f[v]
if(a1<a0){z.b=v
a0=a1}}if(t>this.b||a0<t)n=G.ik(a4,new E.iu(z,this,o,12),a5,a6)
else{s=a8.length
for(v=a5;v<a6;++v){if(v>=w)return H.a(a4,v)
r=a4[v].ge4()
z=this.d
if(r>=z.length)return H.a(z,r)
a8.push(z[r])}y.d=s
y.e=t
z=y.a
z.a.b7(x.a)
z.b.b7(x.b)
return y}}break}a2=this.ej(a4,n,a6,a7,a8)
a3=this.ej(a4,a5,n,a7,a8)
z=y.b
w=z.length
if(0>=w)return H.a(z,0)
z[0]=a3
if(1>=w)return H.a(z,1)
z[1]=a2
z=a3.a
w=a2.a
y.a=G.cr(z).bg(w)
y.c=o
y.e=0}return y},
eB:function(a,b){var z,y,x,w
z=this.e
y=b[0]
if(y>=z.length)return H.a(z,y)
x=z[y]
x.a=a.gbn()
w=b[0]
b[0]=w+1
z=a.gfm()
if(typeof z!=="number")return z.T()
if(z>0){x.b=a.gmW()
x.c=a.e}else{x.d=a.gfG()
x.c=0
z=a.gaz(a)
if(0>=z.length)return H.a(z,0)
this.eB(z[0],b)
z=a.b
if(1>=z.length)return H.a(z,1)
x.b=this.eB(z[1],b)}return w},
j0:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
$.A.$2(0,"Building BVH Acceleration Structures.")
this.b=P.a6(255,b)
z=J.y(a)
y=0
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.c(x)
if(!(y<x))break
z.h(a,y).dV(this.d);++y}z="BVH: "+this.d.length+" Primitives"
$.A.$2(0,z)
z=this.d.length
if(z===0){this.e=null
return}w=H.p(Array(z),[E.bP])
for(z=w.length,y=0;x=this.d,v=x.length,y<v;++y){u=x[y].aI()
x=new E.bP(y,null,u)
if(u==null){v=G.a0(null,null)
x.c=v}else v=u
x.b=v.gmo()
if(y>=z)return H.a(w,y)
w[y]=x}t=[0]
s=[]
r=this.ej(w,0,v,t,s)
this.d=s
z="BVH created with "+t[0]+" nodes for "+this.d.length+" primitives"
$.A.$2(0,z)
z=H.p(Array(t[0]),[E.kI])
this.e=z
for(q=t[0],y=0;y<q;++y){if(y>=z.length)return H.a(z,y)
z[y]=new E.kI(null,null,null,null)}this.eB(r,[0])},
static:{lK:function(a,b,c){var z=$.bF
$.bF=z+1
z=new E.eV(null,c,[],null,z)
z.j0(a,b,c)
return z},wm:[function(a,b){var z,y,x,w
z=b.aV("splitmethod","sah")
y=b.N("maxnodeprims",4)
x=J.B(z)
if(x.A(z,"sah"))w=2
else if(x.A(z,"middle"))w=0
else{x=x.A(z,"equal")?1:2
w=x}return E.lK(a,y,w)},"$2","ts",4,0,40]}},
lL:{
"^":"r:114;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.gc4().a
if(z>=y.length)return H.a(y,z)
y=y[z]
x=b.gc4().a
if(z>=x.length)return H.a(x,z)
return y<x[z]}},
lM:{
"^":"r:13;a,b",
$1:function(a){var z,y
z=this.a
y=a.gc4().a
if(z>=y.length)return H.a(y,z)
return y[z]<this.b}},
iu:{
"^":"r:13;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t
z=this.d
y=this.c
x=a.gc4().a
if(y>=x.length)return H.a(x,y)
x=x[y]
w=this.a
v=w.a
u=v.a.a
if(y>=u.length)return H.a(u,y)
u=u[y]
v=v.b.a
if(y>=v.length)return H.a(v,y)
t=C.b.F(Math.floor(z*((x-u)/(v[y]-u))))
if(t===z)t=z-1
return t<=w.b}},
bP:{
"^":"j;e4:a<,c4:b<,bn:c<"},
ev:{
"^":"j;a,bn:b<"},
rb:{
"^":"j;bn:a<,az:b>,fG:c<,mW:d<,fm:e<"},
kI:{
"^":"j;bn:a<,af:b',fm:c<,d"},
fk:{
"^":"dG;b,c,bn:d<,D:e>,f,r,a",
aI:function(){return G.cr(this.d)},
b5:function(){return!0},
iq:function(a,b){var z,y,x,w
z=a.a
if(b>=z.length)return H.a(z,b)
z=z[b]
y=this.d.a.a
if(b>=y.length)return H.a(y,b)
y=y[b]
x=this.f.a
if(b>=x.length)return H.a(x,b)
w=C.b.F((z-y)*x[b])
x=this.c
if(b>=3)return H.a(x,b)
return C.a.v(w,0,x[b]-1)},
jf:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
$.A.$2(0,"Building Hierarchical Grid Acceleration Structures.")
z=J.y(a)
z.gm(a)
if(b===!0){y=0
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.c(x)
if(!(y<x))break
z.h(a,y).dV(this.b);++y}}else this.b=a
y=0
while(!0){z=J.M(this.b)
if(typeof z!=="number")return H.c(z)
if(!(y<z))break
z=this.d
x=J.e(this.b,y).aI()
this.d=new G.ah(new G.t(new Float32Array(H.D(z.a.a))),new G.t(new Float32Array(H.D(z.b.a)))).bg(x);++y}z=this.d
w=z.b.p(0,z.a)
v=this.d.fl()
z=w.a
x=z.length
if(v>=x)return H.a(z,v)
u=z[v]
t=J.M(this.b)
H.T(t)
H.T(0.3333333333333333)
s=3*Math.pow(t,0.3333333333333333)*(1/u)
for(u=this.c,r=0;r<3;++r){if(r>=x)return H.a(z,r)
t=C.b.b_(z[r]*s)
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
n[r]=o}this.r=H.p(Array(u[0]*u[1]*u[2]),[E.kS])
m=[0,0,0]
l=[0,0,0]
y=0
while(!0){z=J.M(this.b)
if(typeof z!=="number")return H.c(z)
if(!(y<z))break
k=J.e(this.b,y)
j=k.aI()
for(r=0;r<3;++r){m[r]=this.iq(j.gdf(),r)
l[r]=this.iq(j.b,r)}for(i=m[2];i<=l[2];++i)for(h=m[1];h<=l[1];++h)for(g=m[0];g<=l[0];++g){z=u[0]
f=i*z*u[1]+h*z+g
z=this.r
if(f>>>0!==f||f>=z.length)return H.a(z,f)
x=z[f]
if(x==null){x=[]
t=new E.kS(x,null)
t.b=!1
x.push(k)
z[f]=t}else x.a.push(k)}++y}},
static:{mZ:function(a,b){var z,y,x,w
z=G.a0(null,null)
y=G.a5(0,0,0)
x=G.a5(0,0,0)
w=$.bF
$.bF=w+1
w=new E.fk([],[0,0,0],z,y,x,null,w)
w.jf(a,b)
return w},xn:[function(a,b){return E.mZ(a,b.bC("refineimmediately",!0))},"$2","tu",4,0,32]}},
kS:{
"^":"j;a,b"},
fF:{
"^":"dG;b,c,d,e,f,r,x,y,bn:z<,a",
aI:function(){return this.z},
b5:function(){return!0},
ei:function(c0,c1,c2,c3,c4,c5,c6,c7,c8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9
z=c3.length
y=this.x
x=y==null
if(x||this.y===y.length){w=x?0:y.length
v=P.O(2*w,512)
u=H.p(Array(v),[E.kH])
for(y=this.x,x=u.length,t=0;t<w;++t){if(t>=y.length)return H.a(y,t)
s=y[t]
if(t>=x)return H.a(u,t)
u[t]=s}for(t=w;t<v;++t){if(t>=x)return H.a(u,t)
u[t]=new E.kH(0,null,null)}this.x=u}y=this.y
if(typeof y!=="number")return y.i()
this.y=y+1
y=this.d
if(typeof y!=="number")return H.c(y)
if(z<=y||J.k(c4,0)){y=J.m(this.e,c4)
x=$.$get$dk();++x.c
$.dk=x
x=$.$get$hv()
x.c=P.O(x.c,z)
x=$.$get$hu()
x.c=P.O(x.c,y)
y=this.x
if(c0>>>0!==c0||c0>=y.length)return H.a(y,c0)
y[c0].ic(c3)
return}y=this.b
x=J.G(y)
r=x.q(y,z)
s=c1.b.p(0,c1.a).a
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
for(k=2*z,p=this.c,o=J.G(p),j=this.f,n=c2.length,i=z*2,h=-1,g=-1,f=1/0,e=0;!0;){d=Array(i)
d.$builtinTypeInfo=[E.ds]
if(l<0||l>=3)return H.a(c5,l)
c5[l]=d
for(t=0,c=0;t<z;++t){b=c3[t]
if(b>=n)return H.a(c2,b)
a=c2[b]
d=c5[l]
a0=c+1
a1=a.gdf().a
if(l>=a1.length)return H.a(a1,l)
a1=a1[l]
a2=b<<1
if(c>=d.length)return H.a(d,c)
d[c]=new E.ds(a1,(0|a2)>>>0)
a1=c5[l]
c=a0+1
d=a.b.a
if(l>=d.length)return H.a(d,l)
d=d[l]
if(a0>=a1.length)return H.a(a1,a0)
a1[a0]=new E.ds(d,(1|a2)>>>0)}d=c5[l]
a1=new E.o2()
d.toString
if(typeof d!=="object"||d===null||!!d.immutable$list)H.K(new P.a_("sort"))
a2=d.length-1
if(a2-0<=32)H.jR(d,0,a2,a1)
else H.jQ(d,0,a2,a1)
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
if(a1){a6=C.a5[l]
a7=C.b7[l]
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
if(typeof a9!=="number")return H.c(a9)
b0=o.i(p,J.h(x.q(y,1-a9),2*(a8+(a5-d)*a2)*m*a4+2*(a8+(a1-a5)*a2)*m*a3))
if(J.a7(b0,f)){f=b0
g=t
h=l}}d=c5[l]
if(t>=d.length)return H.a(d,t)
if((d[t].b&1)===0)++a4}if(h===-1&&e<2){++e
l=C.a5[l]
continue}break}y=J.u(f)
if(y.T(f,r))++c8
if(typeof r!=="number")return H.c(r)
if(y.T(f,4*r)&&z<16||h===-1||c8===3){y=J.m(this.e,c4)
x=$.$get$dk();++x.c
$.dk=x
x=$.$get$hv()
x.c=P.O(x.c,z)
x=$.$get$hu()
x.c=P.O(x.c,y)
y=this.x
if(c0>>>0!==c0||c0>=y.length)return H.a(y,c0)
y[c0].ic(c3)
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
y=$.$get$ht();++y.c
$.ht=y
b6=G.cr(c1)
y=b6.b.a
if(h>=y.length)return H.a(y,h)
y[h]=b5
b7=G.cr(c1)
y=b7.a.a
if(h>=y.length)return H.a(y,h)
y[h]=b5
y=c6.buffer
b=(y&&C.f).bM(y,c6.byteOffset,b1)
y=c7.buffer
x=c7.byteOffset
if(typeof x!=="number")return x.i()
b8=(y&&C.f).bM(y,x+z*4,null)
if(typeof c0!=="number")return c0.i()
x=J.u(c4)
this.ei(c0+1,b6,c2,b,x.p(c4,1),c5,c6,b8,c8)
b9=this.y
y=this.x
if(c0>=y.length)return H.a(y,c0)
y=y[c0]
y.b=b5
y.a=h
if(typeof b9!=="number")return b9.n()
y.a=(h|b9<<2)>>>0
y=c7.buffer
this.ei(b9,b7,c2,(y&&C.f).bM(y,c7.byteOffset,b3),x.p(c4,1),c5,c6,b8,c8)},
k6:function(a,b,c,d,e,f,g,h){return this.ei(a,b,c,d,e,f,g,h,0)},
jr:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p
z=J.y(a)
z.gm(a)
$.A.$2(0,"Building Kd-Tree Acceleration Structures.")
y=0
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.c(x)
if(!(y<x))break
z.h(a,y).dV(this.r);++y}this.y=0
if(J.aY(this.e,0)){z=Math.log(H.T(this.r.length))
x=$.$get$eF()
if(typeof x!=="number")return H.c(x)
this.e=C.b.b_(8+1.3*C.d.F(z*x))}this.z=G.a0(null,null)
w=H.p(Array(this.r.length),[G.ah])
for(z=w.length,y=0;x=this.r,y<x.length;++y){v=x[y].aI()
x=this.z
this.z=new G.ah(new G.t(new Float32Array(H.D(x.a.a))),new G.t(new Float32Array(H.D(x.b.a)))).bg(v)
if(y>=z)return H.a(w,y)
w[y]=v}u=Array(3)
for(y=0;y<3;++y){t=2*this.r.length
z=Array(t)
z.$builtinTypeInfo=[E.ds]
u[y]=z
for(s=0;s<t;++s){z=u[y]
if(s>=z.length)return H.a(z,s)
z[s]=new E.ds(0,1)}}r=new Uint32Array(H.i(this.r.length))
q=new Uint32Array(H.i(J.h(J.b(this.e,1),this.r.length)))
z=H.i(this.r.length)
p=new Uint32Array(z)
for(x=this.r.length,y=0;y<x;++y){if(y>=z)return H.a(p,y)
p[y]=y}this.k6(0,this.z,w,p,this.e,u,r,q)},
static:{o1:function(a,b,c,d,e,f){var z=$.bF
$.bF=z+1
z=new E.fF(b,c,e,f,d,[],null,null,null,z)
z.jr(a,b,c,d,e,f)
return z},xF:[function(a,b){return E.o1(a,b.N("intersectcost",80),b.N("traversalcost",1),b.j("emptybonus",0.5),b.N("maxprims",1),b.N("maxdepth",-1))},"$2","tv",4,0,42]}},
o2:{
"^":"r:5;",
$2:function(a,b){return J.a7(a,b)?-1:1}},
kH:{
"^":"j;a,b,c",
ic:function(a){var z=a.length
this.a=3
this.a=(3|z<<2)>>>0
if(z===0)this.c=0
else if(z===1){if(0>=z)return H.a(a,0)
this.c=a[0]}else this.c=new Uint32Array(H.D(a))},
gfm:function(){return C.a.l(this.a,2)},
gfG:function(){return this.a&3}},
ds:{
"^":"j;fv:a<,b",
I:function(a,b){var z,y
z=this.a
if(z===b.gfv())return(this.b&1)<b.gnX(b)
else{y=b.gfv()
if(typeof y!=="number")return H.c(y)
return z<y}},
gnX:function(a){return this.b&1}}}],["","",,T,{
"^":"",
l9:function(a,b){var z,y,x,w,v,u,t
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
bc:function(a,b){var z,y,x,w,v
z=J.y(a)
y=z.gm(a)
b^=4294967295
for(x=0;y>=8;){w=x+1
v=z.h(a,x)
if(typeof v!=="number")return H.c(v)
b=C.p[(b^v)&255]^b>>>8
x=w+1
v=z.h(a,w)
if(typeof v!=="number")return H.c(v)
b=C.p[(b^v)&255]^b>>>8
w=x+1
v=z.h(a,x)
if(typeof v!=="number")return H.c(v)
b=C.p[(b^v)&255]^b>>>8
x=w+1
v=z.h(a,w)
if(typeof v!=="number")return H.c(v)
b=C.p[(b^v)&255]^b>>>8
w=x+1
v=z.h(a,x)
if(typeof v!=="number")return H.c(v)
b=C.p[(b^v)&255]^b>>>8
x=w+1
v=z.h(a,w)
if(typeof v!=="number")return H.c(v)
b=C.p[(b^v)&255]^b>>>8
w=x+1
v=z.h(a,x)
if(typeof v!=="number")return H.c(v)
b=C.p[(b^v)&255]^b>>>8
x=w+1
v=z.h(a,w)
if(typeof v!=="number")return H.c(v)
b=C.p[(b^v)&255]^b>>>8
y-=8}if(y>0)do{w=x+1
v=z.h(a,x)
if(typeof v!=="number")return H.c(v)
b=C.p[(b^v)&255]^b>>>8
if(--y,y>0){x=w
continue}else break}while(!0)
return(b^4294967295)>>>0},
aE:function(a,b){if(typeof a!=="number")return a.a9()
if(a>=0)return C.b.w(a,b)
else return C.b.w(a,b)+C.a.H(2,(~b>>>0)+65536&65535)},
lV:{
"^":"j;a,b,c",
J:function(a){var z,y,x,w
if(a===0)return 0
if(this.c===0){this.c=8
z=this.a
y=z.b
z.b=J.b(y,1)
this.b=J.e(z.a,y)}for(x=0;z=this.c,a>z;){y=C.a.n(x,z)
w=this.b
if(z>>>0!==z||z>=9)return H.a(C.k,z)
z=J.J(w,C.k[z])
if(typeof z!=="number")return H.c(z)
x=y+z
a-=this.c
this.c=8
z=this.a
y=z.b
z.b=J.b(y,1)
this.b=J.e(z.a,y)}if(a>0){if(z===0){this.c=8
z=this.a
y=z.b
z.b=J.b(y,1)
this.b=J.e(z.a,y)}z=C.a.n(x,a)
y=this.b
w=this.c-a
if(typeof y!=="number")return y.w()
y=C.b.w(y,w)
if(a>>>0!==a||a>=9)return H.a(C.k,a)
x=z+(y&C.k[a])
this.c=w}return x}},
lN:{
"^":"j;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4",
bp:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=T.cB(0,32768)
y=new T.lV(a,0,0)
this.dx=0
this.dy=0
this.fr=0
this.fx=0
if(y.J(8)!==66||y.J(8)!==90||y.J(8)!==104)throw H.f(new T.R("Invalid Signature"))
x=y.J(8)-48
this.a=x
if(x<0||x>9)throw H.f(new T.R("Invalid BlockSize"))
this.b=new Uint32Array(H.i(x*1e5))
for(w=0;!0;){v=this.lE(y)
if(v===0){x=y.J(8)
u=y.J(8)
t=y.J(8)
s=y.J(8)
r=(this.lG(y,z)^4294967295)>>>0
if(b&&r!==((((0|x)<<8|u)<<8|t)<<8|s)>>>0)throw H.f(new T.R("Invalid block checksum."))
w=((w<<1|w>>>31)&4294967295^r)>>>0}else if(v===2){q=((((0|y.J(8))<<8|y.J(8))<<8|y.J(8))<<8|y.J(8))>>>0
if(b&&q!==w)throw H.f(new T.R("Invalid combined checksum: "+w+" : "+q))
x=z.c.buffer
return(x&&C.f).a0(x,0,z.a)}}return},
lE:function(a){var z,y,x,w
for(z=!0,y=!0,x=0;x<6;++x){w=a.J(8)
if(w!==C.hW[x])y=!1
if(w!==C.hX[x])z=!1
if(!z&&!y)throw H.f(new T.R("Invalid Block Signature"))}return y?0:2},
lG:function(c5,c6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4
z=c5.J(1)
y=((c5.J(8)<<8|c5.J(8))<<8|c5.J(8))>>>0
this.c=new Uint8Array(16)
for(x=0;x<16;++x)this.c[x]=c5.J(1)
this.d=new Uint8Array(256)
for(x=0,w=0;x<16;++x,w+=16)if(this.c[x]!==0)for(v=0;v<16;++v){u=this.d
t=w+v
s=c5.J(1)
u.length
if(t>=256)return H.a(u,t)
u[t]=s}this.lg()
u=this.k3
if(u===0)throw H.f(new T.R("Data error"))
r=u+2
q=c5.J(3)
if(q<2||q>6)throw H.f(new T.R("Data error"))
u=c5.J(15)
this.db=u
if(u<1)throw H.f(new T.R("Data error"))
this.x=new Uint8Array(18002)
this.y=new Uint8Array(18002)
x=0
while(!0){u=this.db
if(typeof u!=="number")return H.c(u)
if(!(x<u))break
for(v=0;!0;){if(c5.J(1)===0)break;++v
if(v>=q)throw H.f(new T.R("Data error"))}u=this.x
u.length
if(x>=18002)return H.a(u,x)
u[x]=v;++x}p=new Uint8Array(6)
for(x=0;x<q;++x){if(x>=6)return H.a(p,x)
p[x]=x}u=this.db
if(typeof u!=="number")return H.c(u)
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
u.$builtinTypeInfo=[P.bj]
this.k2=u
for(l=0;l<q;++l){u=this.k2
t=new Uint8Array(258)
u.length
if(l>=6)return H.a(u,l)
u[l]=t
k=c5.J(5)
for(x=0;x<r;++x){for(;!0;){if(k<1||k>20)throw H.f(new T.R("Data error"))
if(c5.J(1)===0)break
k=c5.J(1)===0?k+1:k-1}u=this.k2[l]
u.length
if(x>=258)return H.a(u,x)
u[x]=k}}u=Array(6)
u.$builtinTypeInfo=[P.fw]
this.z=u
u=Array(6)
u.$builtinTypeInfo=[P.fw]
this.Q=u
u=Array(6)
u.$builtinTypeInfo=[P.fw]
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
if(h<j)j=h}this.l2(this.z[l],this.Q[l],this.ch[l],u[l],j,i,r)
this.cx[l]=j}g=this.k3+1
u=this.a
if(typeof u!=="number")return H.c(u)
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
b=this.eE(c5)
for(a=0;!0;){if(b===g)break
if(b===0||b===1){a0=-1
a1=1
do{if(a1>=2097152)throw H.f(new T.R("Data error"))
if(b===0)a0+=a1
else if(b===1)a0+=2*a1
a1*=2
b=this.eE(c5)}while(b===0||b===1);++a0
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
for(u=this.b;a0>0;){if(a>=f)throw H.f(new T.R("Data error"))
if(a<0||a>=u.length)return H.a(u,a)
u[a]=a2;++a;--a0}continue}else{if(a>=f)throw H.f(new T.R("Data error"))
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
t[a4]=a2}else{a6=C.a.a3(a3,16)
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
b=this.eE(c5)
continue}}if(y>=a)throw H.f(new T.R("Data error"))
for(u=this.cy,x=0;x<=255;++x){t=u[x]
if(t<0||t>a)throw H.f(new T.R("Data error"))}u=new Int32Array(257)
this.k1=u
u[0]=0
for(t=this.cy,x=1;x<=256;++x)u[x]=t[x-1]
for(x=1;x<=256;++x)u[x]=u[x]+u[x-1]
for(x=0;x<=256;++x){t=u[x]
if(t<0||t>a)throw H.f(new T.R("Data error"))}for(x=1;x<=256;++x)if(u[x-1]>u[x])throw H.f(new T.R("Data error"))
for(t=this.b,x=0;x<a;++x){s=t.length
if(x>=s)return H.a(t,x)
a2=t[x]&255
a8=u[a2]
if(a8<0||a8>=s)return H.a(t,a8)
t[a8]=(t[a8]|x<<8)>>>0
u[a2]=u[a2]+1}b1=$.lO
u=t.length
if(y>=u)return H.a(t,y)
b2=t[y]>>>8
s=z!==0
if(s){a8=this.a
if(typeof a8!=="number")return H.c(a8)
if(b2>=1e5*a8)throw H.f(new T.R("Data error"))
if(b2>=u)return H.a(t,b2)
b2=t[b2]
b3=b2>>>8
b4=b2&255^0
b2=b3
b5=618
b6=1}else{a8=this.a
if(typeof a8!=="number")return H.c(a8)
if(b2>=1e5*a8)return b1
if(b2>=u)return H.a(t,b2)
b2=t[b2]
b4=b2&255
b2=b2>>>8
b5=0
b6=0}b7=a+1
if(s)for(b8=0,b9=0,c0=1;!0;b9=b4,b4=c2){for(u=b9&255;!0;){if(b8===0)break
if(c6.a===c6.c.length)c6.bZ()
t=c6.c
s=c6.a++
if(s>>>0!==s||s>=t.length)return H.a(t,s)
t[s]=u
s=(b1>>>24&255^u)>>>0
if(s>=256)return H.a(C.n,s)
b1=((b1<<8^C.n[s])&4294967295)>>>0;--b8}if(c0===b7)return b1
if(c0>b7)throw H.f(new T.R("Data error."))
u=this.b
t=u.length
if(b2<0||b2>=t)return H.a(u,b2)
b2=u[b2]
b3=b2>>>8
if(b5===0){if(b6>=512)return H.a(C.o,b6)
b5=C.o[b6];++b6
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
if(b5===0){if(b6>=512)return H.a(C.o,b6)
b5=C.o[b6];++b6
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
if(b5===0){if(b6>=512)return H.a(C.o,b6)
b5=C.o[b6];++b6
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
if(b5===0){if(b6>=512)return H.a(C.o,b6)
b5=C.o[b6];++b6
if(b6===512)b6=0}s=b5===1?1:0
b8=(b2&255^s)+4
if(b3>=t)return H.a(u,b3)
b2=u[b3]
b3=b2>>>8
if(b5===0){if(b6>=512)return H.a(C.o,b6)
b5=C.o[b6];++b6
if(b6===512)b6=0}u=b5===1?1:0
c2=b2&255^u
c0=c0+1+1
b2=b3}else for(c3=b4,b8=0,b9=0,c0=1;!0;b9=c3,c3=c4){if(b8>0){for(u=b9&255;!0;){if(b8===1)break
if(c6.a===c6.c.length)c6.bZ()
t=c6.c
s=c6.a++
if(s>>>0!==s||s>=t.length)return H.a(t,s)
t[s]=u
s=(b1>>>24&255^u)>>>0
if(s>=256)return H.a(C.n,s)
b1=(b1<<8^C.n[s])&4294967295;--b8}if(c6.a===c6.c.length)c6.bZ()
t=c6.c
s=c6.a++
if(s>>>0!==s||s>=t.length)return H.a(t,s)
t[s]=u
u=(b1>>>24&255^u)>>>0
if(u>=256)return H.a(C.n,u)
b1=((b1<<8^C.n[u])&4294967295)>>>0}if(c0>b7)throw H.f(new T.R("Data error"))
if(c0===b7)return b1
u=this.a
if(typeof u!=="number")return H.c(u)
u=1e5*u
if(b2>=u)throw H.f(new T.R("Data Error"))
t=this.b
s=t.length
if(b2<0||b2>=s)return H.a(t,b2)
b2=t[b2]
c1=b2&255
b2=b2>>>8;++c0
if(c1!==c3){if(c6.a===c6.c.length)c6.bZ()
u=c6.c
t=c6.a++
s=c3&255
if(t>>>0!==t||t>=u.length)return H.a(u,t)
u[t]=s
s=(b1>>>24&255^s)>>>0
if(s>=256)return H.a(C.n,s)
b1=((b1<<8^C.n[s])&4294967295)>>>0
c4=c1
b8=0
continue}if(c0===b7){if(c6.a===c6.c.length)c6.bZ()
u=c6.c
t=c6.a++
s=c3&255
if(t>>>0!==t||t>=u.length)return H.a(u,t)
u[t]=s
s=(b1>>>24&255^s)>>>0
if(s>=256)return H.a(C.n,s)
b1=((b1<<8^C.n[s])&4294967295)>>>0
c4=c3
b8=0
continue}if(b2>=u)throw H.f(new T.R("Data Error"))
if(b2>=s)return H.a(t,b2)
b2=t[b2]
c1=b2&255
b2=b2>>>8;++c0
if(c0===b7){c4=c3
b8=2
continue}if(c1!==c3){c4=c1
b8=2
continue}if(b2>=u)throw H.f(new T.R("Data Error"))
if(b2>=s)return H.a(t,b2)
b2=t[b2]
c1=b2&255
b2=b2>>>8;++c0
if(c0===b7){c4=c3
b8=3
continue}if(c1!==c3){c4=c1
b8=3
continue}if(b2>=u)throw H.f(new T.R("Data Error"))
if(b2>=s)return H.a(t,b2)
b2=t[b2]
b3=b2>>>8
b8=(b2&255)+4
if(b3>=u)throw H.f(new T.R("Data Error"))
if(b3>=s)return H.a(t,b3)
b2=t[b3]
c4=b2&255
b2=b2>>>8
c0=c0+1+1}return b1},
eE:function(a){var z,y,x,w
z=this.dx
if(z===0){z=++this.dy
y=this.db
if(typeof y!=="number")return H.c(y)
if(z>=y)throw H.f(new T.R("Data error"))
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
w=a.J(x)
for(;!0;){if(x>20)throw H.f(new T.R("Data error"))
z=this.fy
z.length
if(x>>>0!==x||x>=258)return H.a(z,x)
if(w<=z[x])break;++x
w=(w<<1|a.J(1))>>>0}z=this.id
z.length
if(x>>>0!==x||x>=258)return H.a(z,x)
z=w-z[x]
if(z<0||z>=258)throw H.f(new T.R("Data error"))
y=this.go
y.length
if(z>>>0!==z||z>=258)return H.a(y,z)
return y[z]},
l2:function(a,b,c,d,e,f,g){var z,y,x,w,v,u
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
lg:function(){var z,y,x
this.k3=0
this.e=new Uint8Array(H.i(256))
for(z=0;z<256;++z)if(this.d[z]!==0){y=this.e
x=this.k3++
y.length
if(x>=256)return H.a(y,x)
y[x]=z}}},
mO:{
"^":"j;",
bp:function(a,b){var z,y,x,w,v
if(a.u()!==35615)throw H.f(new T.R("Invalid GZip Signature"))
z=a.a
y=a.b
a.b=J.b(y,1)
x=J.y(z)
if(!J.k(x.h(z,y),8))throw H.f(new T.R("Invalid GZip Compression Methos"))
y=a.b
a.b=J.b(y,1)
w=x.h(z,y)
a.t()
y=a.b
a.b=J.b(y,1)
x.h(z,y)
y=a.b
a.b=J.b(y,1)
x.h(z,y)
z=J.u(w)
if(z.L(w,4)!==0)a.ax(a.u())
if(z.L(w,8)!==0)a.ca()
if(z.L(w,16)!==0)a.ca()
if(z.L(w,2)!==0)a.u()
z=T.b7(C.G)
y=T.b7(C.P)
x=T.cB(0,null)
new T.dO(a,x,0,0,0,z,y).dJ()
y=x.c.buffer
v=(y&&C.f).a0(y,0,x.a)
if(b){if(a.t()!==T.bc(v,0))throw H.f(new T.R("Invalid CRC checksum"))
if(a.t()!==v.length)throw H.f(new T.R("Size of decompressed file not correct"))}return v}},
R:{
"^":"j;a",
E:function(a){return"ArchiveException: "+this.a}},
nl:{
"^":"j;a5:a>,af:b*,c,d,e",
gm:function(a){return J.m(this.e,J.m(this.b,this.c))},
h:function(a,b){return J.e(this.a,J.b(this.b,b))},
cf:function(a,b){a=a==null?this.b:J.b(a,this.c)
if(b==null||J.a7(b,0))b=J.m(this.e,J.m(a,this.c))
return T.b_(this.a,this.d,b,a)},
b3:function(a,b){this.b=J.b(this.b,b)},
ax:function(a){var z=this.cf(J.m(this.b,this.c),a)
this.b=J.b(this.b,J.m(z.e,J.m(z.b,z.c)))
return z},
ae:function(a){var z,y,x,w,v,u,t
if(a==null){z=[]
for(y=this.c,x=J.G(y),w=this.a,v=J.y(w);!J.U(this.b,x.i(y,this.e));){u=this.b
this.b=J.b(u,1)
t=v.h(w,u)
if(J.k(t,0))return P.c9(z,0,null)
z.push(t)}throw H.f(new T.R("EOF reached without finding string terminator"))}return P.c9(this.ax(a).aq(),0,null)},
ca:function(){return this.ae(null)},
u:function(){var z,y,x,w,v
z=this.a
y=this.b
this.b=J.b(y,1)
x=J.y(z)
w=J.J(x.h(z,y),255)
y=this.b
this.b=J.b(y,1)
v=J.J(x.h(z,y),255)
if(this.d===1){if(typeof w!=="number")return w.n()
if(typeof v!=="number")return H.c(v)
return(w<<8|v)>>>0}if(typeof v!=="number")return v.n()
if(typeof w!=="number")return H.c(w)
return(v<<8|w)>>>0},
t:function(){var z,y,x,w,v,u,t
z=this.a
y=this.b
this.b=J.b(y,1)
x=J.y(z)
w=J.J(x.h(z,y),255)
y=this.b
this.b=J.b(y,1)
v=J.J(x.h(z,y),255)
y=this.b
this.b=J.b(y,1)
u=J.J(x.h(z,y),255)
y=this.b
this.b=J.b(y,1)
t=J.J(x.h(z,y),255)
if(this.d===1){if(typeof w!=="number")return w.n()
if(typeof v!=="number")return v.n()
if(typeof u!=="number")return u.n()
if(typeof t!=="number")return H.c(t)
return(w<<24|v<<16|u<<8|t)>>>0}if(typeof t!=="number")return t.n()
if(typeof u!=="number")return u.n()
if(typeof v!=="number")return v.n()
if(typeof w!=="number")return H.c(w)
return(t<<24|u<<16|v<<8|w)>>>0},
aq:function(){var z,y,x,w
z=J.m(this.e,J.m(this.b,this.c))
y=this.a
x=J.B(y)
if(!!x.$isbj)return J.eO(x.ga5(y),this.b,z)
w=this.b
return new Uint8Array(H.D(x.ay(y,w,J.b(w,z))))},
jp:function(a,b,c,d){this.e=c==null?J.M(this.a):c
this.b=d},
S:function(a){return this.gm(this).$0()},
static:{b_:function(a,b,c,d){var z=J.B(a)
if(!!z.$islU){z=z.ga5(a)
z=(z&&C.f).a0(z,0,null)}else z=a
z=new T.nl(z,null,d,b,null)
z.jp(a,b,c,d)
return z}}},
jt:{
"^":"j;m:a*,b,c",
ab:function(a){var z,y
if(this.a===this.c.length)this.bZ()
z=this.c
y=this.a++
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=a&255},
ef:function(a,b){var z,y,x,w
if(b==null)b=a.length
if(typeof b!=="number")return H.c(b)
for(;z=this.a,y=z+b,x=this.c,w=x.length,y>w;)this.ey(y-w)
C.h.bi(x,z,y,a)
this.a+=b},
bR:function(a){return this.ef(a,null)},
o0:function(a){var z,y,x,w
z=a.c
while(!0){y=this.a
x=J.m(a.e,J.m(a.b,z))
if(typeof x!=="number")return H.c(x)
w=this.c
if(!(y+x>w.length))break
y=this.a
x=J.m(a.e,J.m(a.b,z))
if(typeof x!=="number")return H.c(x)
this.ey(y+x-this.c.length)}y=this.a
x=J.m(a.e,J.m(a.b,z))
if(typeof x!=="number")return H.c(x)
C.h.aj(w,y,y+x,a.a,a.b)
x=this.a
z=J.m(a.e,J.m(a.b,z))
if(typeof z!=="number")return H.c(z)
this.a=x+z},
cM:function(a){if(this.b===1){this.ab(a>>>24&255)
this.ab(a>>>16&255)
this.ab(a>>>8&255)
this.ab(a&255)
return}this.ab(a&255)
this.ab(a>>>8&255)
this.ab(a>>>16&255)
this.ab(a>>>24&255)},
cf:function(a,b){var z
if(a<0)a=this.a+a
if(b==null)b=this.a
else if(b<0)b=this.a+b
z=this.c.buffer
return(z&&C.f).a0(z,a,b-a)},
cR:function(a){return this.cf(a,null)},
ey:function(a){var z,y,x
z=a!=null?a>32768?a:32768:32768
y=this.c.length+z
if(typeof y!=="number"||Math.floor(y)!==y)H.K(P.ak("Invalid length "+H.l(y)))
x=new Uint8Array(y)
y=this.c
C.h.bi(x,0,y.length,y)
this.c=x},
bZ:function(){return this.ey(null)},
S:function(a){return this.a.$0()},
static:{cB:function(a,b){return new T.jt(0,a,new Uint8Array(H.i(b==null?32768:b)))}}},
ma:{
"^":"j;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,aB,b8,b9,aX,aE,c7,aS,ba,bN,bA,bB,aK,d9,aC,aT,bb,aP,aF,aG",
l6:function(a,b,c,d,e){var z,y,x
if(a===-1)a=6
$.d3=this.kT(a)
if(b>=1)if(b<=9)if(c===8)if(e>=9)if(e<=15)if(a<=9)z=d>2
else z=!0
else z=!0
else z=!0
else z=!0
else z=!0
else z=!0
if(z)throw H.f(new T.R("Invalid Deflate parameter"))
this.y1=new Uint16Array(H.i(1146))
this.y2=new Uint16Array(H.i(122))
this.aB=new Uint16Array(H.i(78))
this.ch=e
z=C.a.H(1,e)
this.Q=z
this.cx=z-1
y=b+7
this.fy=y
x=C.a.H(1,y)
this.fx=x
this.go=x-1
this.id=C.a.a3(y+3-1,3)
this.cy=new Uint8Array(H.i(z*2))
this.dx=new Uint16Array(H.i(this.Q))
this.dy=new Uint16Array(H.i(this.fx))
z=C.a.H(1,b+6)
this.bB=z
this.d=new Uint8Array(H.i(z*4))
z=this.bB
if(typeof z!=="number")return z.q()
this.e=z*4
this.d9=z
this.bA=3*z
this.x1=a
this.x2=d
this.y=c
this.r=0
this.f=0
this.c=113
this.z=0
z=this.b8
z.a=this.y1
z.c=$.$get$kP()
z=this.b9
z.a=this.y2
z.c=$.$get$kO()
z=this.aX
z.a=this.aB
z.c=$.$get$kN()
this.aF=0
this.aG=0
this.aP=8
this.ho()
this.ld()},
l5:function(a){return this.l6(a,8,8,0,15)},
kx:function(a){var z,y,x,w
if(a>4||!1)throw H.f(new T.R("Invalid Deflate Parameter"))
this.z=a
if(this.r!==0)this.bv()
z=this.a
if(J.U(z.b,J.b(z.c,z.e)))if(this.rx===0)z=a!==0&&this.c!==666
else z=!0
else z=!0
if(z){switch($.d3.e){case 0:y=this.kA(a)
break
case 1:y=this.ky(a)
break
case 2:y=this.kz(a)
break
default:y=-1
break}z=y===2
if(z||y===3)this.c=666
if(y===0||z)return 0
if(y===1){if(a===1){this.al(2,3)
this.eW(256,C.Q)
this.hZ()
z=this.aP
if(typeof z!=="number")return H.c(z)
x=this.aG
if(typeof x!=="number")return H.c(x)
if(1+z+10-x<9){this.al(2,3)
this.eW(256,C.Q)
this.hZ()}this.aP=7}else{this.hN(0,0,!1)
if(a===3){z=this.fx
if(typeof z!=="number")return H.c(z)
x=this.dy
w=0
for(;w<z;++w){if(w>=x.length)return H.a(x,w)
x[w]=0}}}this.bv()}}if(a!==4)return 0
return 1},
ld:function(){var z,y,x,w
z=this.Q
if(typeof z!=="number")return H.c(z)
this.db=2*z
z=this.dy
y=this.fx
if(typeof y!=="number")return y.p();--y
x=z.length
if(y<0||y>=x)return H.a(z,y)
z[y]=0
for(w=0;w<y;++w){if(w>=x)return H.a(z,w)
z[w]=0}this.r1=0
this.k1=0
this.rx=0
this.ry=2
this.k2=2
this.k4=0
this.fr=0},
ho:function(){var z,y,x,w
for(z=this.y1,y=0;y<286;++y){x=y*2
if(x>=z.length)return H.a(z,x)
z[x]=0}for(x=this.y2,y=0;y<30;++y){w=y*2
if(w>=x.length)return H.a(x,w)
x[w]=0}for(x=this.aB,y=0;y<19;++y){w=y*2
if(w>=x.length)return H.a(x,w)
x[w]=0}if(512>=z.length)return H.a(z,512)
z[512]=1
this.aT=0
this.aC=0
this.bb=0
this.aK=0},
eR:function(a,b){var z,y,x,w,v,u,t
z=this.c7
y=z.length
if(b<0||b>=y)return H.a(z,b)
x=z[b]
w=b<<1>>>0
v=this.bN
while(!0){u=this.aS
if(typeof u!=="number")return H.c(u)
if(!(w<=u))break
if(w<u){u=w+1
if(u<0||u>=y)return H.a(z,u)
u=z[u]
if(w<0||w>=y)return H.a(z,w)
u=T.iC(a,u,z[w],v)}else u=!1
if(u)++w
if(w<0||w>=y)return H.a(z,w)
if(T.iC(a,x,z[w],v))break
u=z[w]
if(b<0||b>=y)return H.a(z,b)
z[b]=u
t=w<<1>>>0
b=w
w=t}if(b<0||b>=y)return H.a(z,b)
z[b]=x},
hF:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(y===0){x=138
w=3}else{x=7
w=4}if(typeof b!=="number")return b.i()
v=(b+1)*2+1
if(v<0||v>=z)return H.a(a,v)
a[v]=65535
for(v=this.aB,u=0,t=-1,s=0;u<=b;y=q){++u
r=u*2+1
if(r>=z)return H.a(a,r)
q=a[r];++s
if(s<x&&y===q)continue
else if(s<w){r=y*2
if(r>=v.length)return H.a(v,r)
v[r]=v[r]+s}else if(y!==0){if(y!==t){r=y*2
if(r>=v.length)return H.a(v,r)
v[r]=v[r]+1}if(32>=v.length)return H.a(v,32)
v[32]=v[32]+1}else if(s<=10){if(34>=v.length)return H.a(v,34)
v[34]=v[34]+1}else{if(36>=v.length)return H.a(v,36)
v[36]=v[36]+1}if(q===0){x=138
w=3}else if(y===q){x=6
w=3}else{x=7
w=4}t=y
s=0}},
kb:function(){var z,y,x
this.hF(this.y1,this.b8.b)
this.hF(this.y2,this.b9.b)
this.aX.eo(this)
for(z=this.aB,y=18;y>=3;--y){x=C.E[y]*2+1
if(x>=z.length)return H.a(z,x)
if(z[x]!==0)break}z=this.aC
if(typeof z!=="number")return z.i()
this.aC=z+(3*(y+1)+5+5+4)
return y},
m5:function(a,b,c){var z,y,x,w
this.al(a-257,5)
z=b-1
this.al(z,5)
this.al(c-4,4)
for(y=0;y<c;++y){x=this.aB
if(y>=19)return H.a(C.E,y)
w=C.E[y]*2+1
if(w>=x.length)return H.a(x,w)
this.al(x[w],3)}this.hH(this.y1,a-1)
this.hH(this.y2,z)},
hH:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(y===0){x=138
w=3}else{x=7
w=4}for(v=0,u=-1,t=0;v<=b;y=r){++v
s=v*2+1
if(s>=z)return H.a(a,s)
r=a[s];++t
if(t<x&&y===r)continue
else if(t<w){s=y*2
q=s+1
do{p=this.aB
o=p.length
if(s>=o)return H.a(p,s)
n=p[s]
if(q>=o)return H.a(p,q)
this.al(n&65535,p[q]&65535)}while(--t,t!==0)}else if(y!==0){if(y!==u){s=this.aB
q=y*2
p=s.length
if(q>=p)return H.a(s,q)
o=s[q];++q
if(q>=p)return H.a(s,q)
this.al(o&65535,s[q]&65535);--t}s=this.aB
q=s.length
if(32>=q)return H.a(s,32)
p=s[32]
if(33>=q)return H.a(s,33)
this.al(p&65535,s[33]&65535)
this.al(t-3,2)}else{s=this.aB
if(t<=10){q=s.length
if(34>=q)return H.a(s,34)
p=s[34]
if(35>=q)return H.a(s,35)
this.al(p&65535,s[35]&65535)
this.al(t-3,3)}else{q=s.length
if(36>=q)return H.a(s,36)
p=s[36]
if(37>=q)return H.a(s,37)
this.al(p&65535,s[37]&65535)
this.al(t-11,7)}}if(r===0){x=138
w=3}else if(y===r){x=6
w=3}else{x=7
w=4}u=y
t=0}},
lA:function(a,b,c){var z,y
if(c===0)return
z=this.d
y=this.r
if(typeof y!=="number")return y.i();(z&&C.h).aj(z,y,y+c,a,b)
y=this.r
if(typeof y!=="number")return y.i()
this.r=y+c},
eW:function(a,b){var z,y,x
z=a*2
y=b.length
if(z>=y)return H.a(b,z)
x=b[z];++z
if(z>=y)return H.a(b,z)
this.al(x&65535,b[z]&65535)},
al:function(a,b){var z,y,x
z=this.aG
if(typeof z!=="number")return z.T()
y=this.aF
if(z>16-b){z=C.a.n(a,z)
if(typeof y!=="number")return y.cO()
z=(y|z&65535)>>>0
this.aF=z
y=this.d
x=this.r
if(typeof x!=="number")return x.i()
this.r=x+1
if(x>>>0!==x||x>=y.length)return H.a(y,x)
y[x]=z
z=T.aE(z,8)
x=this.d
y=this.r
if(typeof y!=="number")return y.i()
this.r=y+1
if(y>>>0!==y||y>=x.length)return H.a(x,y)
x[y]=z
z=this.aG
if(typeof z!=="number")return H.c(z)
this.aF=T.aE(a,16-z)
z=this.aG
if(typeof z!=="number")return z.i()
this.aG=z+(b-16)}else{x=C.a.n(a,z)
if(typeof y!=="number")return y.cO()
this.aF=(y|x&65535)>>>0
this.aG=z+b}},
d_:function(a,b){var z,y,x,w,v,u
z=this.d
y=this.d9
x=this.aK
if(typeof x!=="number")return x.q()
if(typeof y!=="number")return y.i()
x=y+x*2
y=T.aE(a,8)
if(x>=z.length)return H.a(z,x)
z[x]=y
y=this.d
x=this.d9
z=this.aK
if(typeof z!=="number")return z.q()
if(typeof x!=="number")return x.i()
x=x+z*2+1
w=y.length
if(x>=w)return H.a(y,x)
y[x]=a
x=this.bA
if(typeof x!=="number")return x.i()
x+=z
if(x>=w)return H.a(y,x)
y[x]=b
this.aK=z+1
if(a===0){z=this.y1
y=b*2
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=z[y]+1}else{z=this.bb
if(typeof z!=="number")return z.i()
this.bb=z+1;--a
z=this.y1
if(b>>>0!==b||b>=256)return H.a(C.Y,b)
y=(C.Y[b]+256+1)*2
if(y>=z.length)return H.a(z,y)
z[y]=z[y]+1
y=this.y2
if(a<256){if(a>>>0!==a||a>=512)return H.a(C.r,a)
z=C.r[a]}else{z=256+T.aE(a,7)
if(z>=512)return H.a(C.r,z)
z=C.r[z]}z*=2
if(z>=y.length)return H.a(y,z)
y[z]=y[z]+1}z=this.aK
if(typeof z!=="number")return z.L()
if((z&8191)===0){y=this.x1
if(typeof y!=="number")return y.T()
y=y>2}else y=!1
if(y){v=z*8
z=this.r1
y=this.k1
if(typeof z!=="number")return z.p()
if(typeof y!=="number")return H.c(y)
for(x=this.y2,u=0;u<30;++u){w=u*2
if(w>=x.length)return H.a(x,w)
v+=x[w]*(5+C.D[u])}v=T.aE(v,3)
x=this.bb
w=this.aK
if(typeof w!=="number")return w.au()
if(typeof x!=="number")return x.I()
if(x<w/2&&v<(z-y)/2)return!0
z=w}y=this.bB
if(typeof y!=="number")return y.p()
return z===y-1},
h_:function(a,b){var z,y,x,w,v,u,t,s,r
if(this.aK!==0){z=0
y=null
x=null
do{w=this.d
v=this.d9
if(typeof v!=="number")return v.i()
v+=z*2
u=w.length
if(v>=u)return H.a(w,v)
t=w[v];++v
if(v>=u)return H.a(w,v)
s=t<<8&65280|w[v]&255
v=this.bA
if(typeof v!=="number")return v.i()
v+=z
if(v>=u)return H.a(w,v)
r=w[v]&255;++z
if(s===0){w=r*2
v=a.length
if(w>=v)return H.a(a,w)
u=a[w];++w
if(w>=v)return H.a(a,w)
this.al(u&65535,a[w]&65535)}else{y=C.Y[r]
w=(y+256+1)*2
v=a.length
if(w>=v)return H.a(a,w)
u=a[w];++w
if(w>=v)return H.a(a,w)
this.al(u&65535,a[w]&65535)
if(y>=29)return H.a(C.a_,y)
x=C.a_[y]
if(x!==0)this.al(r-C.hb[y],x);--s
if(s<256){if(s<0)return H.a(C.r,s)
y=C.r[s]}else{w=256+T.aE(s,7)
if(w>=512)return H.a(C.r,w)
y=C.r[w]}w=y*2
v=b.length
if(w>=v)return H.a(b,w)
u=b[w];++w
if(w>=v)return H.a(b,w)
this.al(u&65535,b[w]&65535)
if(y>=30)return H.a(C.D,y)
x=C.D[y]
if(x!==0)this.al(s-C.dI[y],x)}w=this.aK
if(typeof w!=="number")return H.c(w)}while(z<w)}this.eW(256,a)
if(513>=a.length)return H.a(a,513)
this.aP=a[513]},
iP:function(){var z,y,x,w,v
for(z=this.y1,y=0,x=0;y<7;){w=y*2
if(w>=z.length)return H.a(z,w)
x+=z[w];++y}for(v=0;y<128;){w=y*2
if(w>=z.length)return H.a(z,w)
v+=z[w];++y}for(;y<256;){w=y*2
if(w>=z.length)return H.a(z,w)
x+=z[w];++y}this.x=x>T.aE(v,2)?0:1},
hZ:function(){var z,y,x
z=this.aG
if(z===16){z=this.aF
y=this.d
x=this.r
if(typeof x!=="number")return x.i()
this.r=x+1
if(x>>>0!==x||x>=y.length)return H.a(y,x)
y[x]=z
z=T.aE(z,8)
x=this.d
y=this.r
if(typeof y!=="number")return y.i()
this.r=y+1
if(y>>>0!==y||y>=x.length)return H.a(x,y)
x[y]=z
this.aF=0
this.aG=0}else{if(typeof z!=="number")return z.a9()
if(z>=8){z=this.aF
y=this.d
x=this.r
if(typeof x!=="number")return x.i()
this.r=x+1
if(x>>>0!==x||x>=y.length)return H.a(y,x)
y[x]=z
this.aF=T.aE(z,8)
z=this.aG
if(typeof z!=="number")return z.p()
this.aG=z-8}}},
fS:function(){var z,y,x
z=this.aG
if(typeof z!=="number")return z.T()
if(z>8){z=this.aF
y=this.d
x=this.r
if(typeof x!=="number")return x.i()
this.r=x+1
if(x>>>0!==x||x>=y.length)return H.a(y,x)
y[x]=z
z=T.aE(z,8)
x=this.d
y=this.r
if(typeof y!=="number")return y.i()
this.r=y+1
if(y>>>0!==y||y>=x.length)return H.a(x,y)
x[y]=z}else if(z>0){z=this.aF
y=this.d
x=this.r
if(typeof x!=="number")return x.i()
this.r=x+1
if(x>>>0!==x||x>=y.length)return H.a(y,x)
y[x]=z}this.aF=0
this.aG=0},
eC:function(a){var z,y,x
z=this.k1
if(typeof z!=="number")return z.a9()
if(z>=0)y=z
else y=-1
x=this.r1
if(typeof x!=="number")return x.p()
this.cA(y,x-z,a)
this.k1=this.r1
this.bv()},
kA:function(a){var z,y,x,w,v,u
z=this.e
if(typeof z!=="number")return z.p()
y=z-5
y=65535>y?y:65535
for(z=a===0;!0;){x=this.rx
if(typeof x!=="number")return x.a6()
if(x<=1){this.eA()
x=this.rx
w=x===0
if(w&&z)return 0
if(w)break}w=this.r1
if(typeof w!=="number")return w.i()
if(typeof x!=="number")return H.c(x)
x=w+x
this.r1=x
this.rx=0
w=this.k1
if(typeof w!=="number")return w.i()
v=w+y
if(x>=v){this.rx=x-v
this.r1=v
if(w>=0)x=w
else x=-1
this.cA(x,v-w,!1)
this.k1=this.r1
this.bv()}x=this.r1
w=this.k1
if(typeof x!=="number")return x.p()
if(typeof w!=="number")return H.c(w)
x-=w
u=this.Q
if(typeof u!=="number")return u.p()
if(x>=u-262){if(w>=0);else w=-1
this.cA(w,x,!1)
this.k1=this.r1
this.bv()}}z=a===4
this.eC(z)
return z?3:1},
hN:function(a,b,c){var z,y,x,w,v
this.al(c?1:0,3)
this.fS()
this.aP=8
z=this.d
y=this.r
if(typeof y!=="number")return y.i()
this.r=y+1
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=b
y=T.aE(b,8)
z=this.d
x=this.r
if(typeof x!=="number")return x.i()
w=x+1
this.r=w
v=z.length
if(x>>>0!==x||x>=v)return H.a(z,x)
z[x]=y
y=(~b>>>0)+65536&65535
this.r=w+1
if(w>>>0!==w||w>=v)return H.a(z,w)
z[w]=y
y=T.aE(y,8)
w=this.d
z=this.r
if(typeof z!=="number")return z.i()
this.r=z+1
if(z>>>0!==z||z>=w.length)return H.a(w,z)
w[z]=y
this.lA(this.cy,a,b)},
cA:function(a,b,c){var z,y,x,w,v
z=this.x1
if(typeof z!=="number")return z.T()
if(z>0){if(this.x===2)this.iP()
this.b8.eo(this)
this.b9.eo(this)
y=this.kb()
z=this.aC
if(typeof z!=="number")return z.i()
x=T.aE(z+3+7,3)
z=this.aT
if(typeof z!=="number")return z.i()
w=T.aE(z+3+7,3)
if(w<=x)x=w}else{w=b+5
x=w
y=0}if(b+4<=x&&a!==-1)this.hN(a,b,c)
else if(w===x){this.al(2+(c?1:0),3)
this.h_(C.Q,C.at)}else{this.al(4+(c?1:0),3)
z=this.b8.b
if(typeof z!=="number")return z.i()
v=this.b9.b
if(typeof v!=="number")return v.i()
this.m5(z+1,v+1,y+1)
this.h_(this.y1,this.y2)}this.ho()
if(c)this.fS()},
eA:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.a
y=z.c
x=J.G(y)
do{w=this.db
v=this.rx
if(typeof w!=="number")return w.p()
if(typeof v!=="number")return H.c(v)
u=this.r1
if(typeof u!=="number")return H.c(u)
t=w-v-u
if(t===0&&u===0&&v===0)t=this.Q
else{w=this.Q
if(typeof w!=="number")return w.i()
if(u>=w+w-262){v=this.cy;(v&&C.h).aj(v,0,w,v,w)
w=this.r2
v=this.Q
if(typeof v!=="number")return H.c(v)
this.r2=w-v
w=this.r1
if(typeof w!=="number")return w.p()
this.r1=w-v
w=this.k1
if(typeof w!=="number")return w.p()
this.k1=w-v
s=this.fx
w=this.dy
r=s
do{if(typeof r!=="number")return r.p();--r
if(r<0||r>=w.length)return H.a(w,r)
q=w[r]&65535
w[r]=q>=v?q-v:0
if(typeof s!=="number")return s.p();--s}while(s!==0)
w=this.dx
r=v
s=r
do{--r
if(r<0||r>=w.length)return H.a(w,r)
q=w[r]&65535
w[r]=q>=v?q-v:0}while(--s,s!==0)
t+=v}}if(J.U(z.b,x.i(y,z.e)))return
w=this.cy
v=this.r1
u=this.rx
if(typeof v!=="number")return v.i()
if(typeof u!=="number")return H.c(u)
s=this.lF(w,v+u,t)
u=this.rx
if(typeof u!=="number")return u.i()
if(typeof s!=="number")return H.c(s)
u+=s
this.rx=u
if(u>=3){w=this.cy
v=this.r1
p=w.length
if(v>>>0!==v||v>=p)return H.a(w,v)
o=w[v]&255
this.fr=o
n=this.id
if(typeof n!=="number")return H.c(n)
n=C.a.n(o,n);++v
if(v>=p)return H.a(w,v)
v=w[v]
w=this.go
if(typeof w!=="number")return H.c(w)
this.fr=((n^v&255)&w)>>>0}}while(u<262&&!J.U(z.b,x.i(y,z.e)))},
ky:function(a){var z,y,x,w,v,u,t,s,r,q
for(z=a===0,y=0;!0;){x=this.rx
if(typeof x!=="number")return x.I()
if(x<262){this.eA()
x=this.rx
if(typeof x!=="number")return x.I()
if(x<262&&z)return 0
if(x===0)break}if(typeof x!=="number")return x.a9()
if(x>=3){x=this.fr
w=this.id
if(typeof x!=="number")return x.n()
if(typeof w!=="number")return H.c(w)
w=C.a.n(x,w)
x=this.cy
v=this.r1
if(typeof v!=="number")return v.i()
u=v+2
if(u>>>0!==u||u>=x.length)return H.a(x,u)
u=x[u]
x=this.go
if(typeof x!=="number")return H.c(x)
x=((w^u&255)&x)>>>0
this.fr=x
u=this.dy
if(x>=u.length)return H.a(u,x)
w=u[x]
y=w&65535
t=this.dx
s=this.cx
if(typeof s!=="number")return H.c(s)
s=(v&s)>>>0
if(s<0||s>=t.length)return H.a(t,s)
t[s]=w
u[x]=v}if(y!==0){x=this.r1
if(typeof x!=="number")return x.p()
w=this.Q
if(typeof w!=="number")return w.p()
w=(x-y&65535)<=w-262
x=w}else x=!1
if(x)if(this.x2!==2)this.k2=this.hr(y)
x=this.k2
if(typeof x!=="number")return x.a9()
w=this.r1
if(x>=3){v=this.r2
if(typeof w!=="number")return w.p()
r=this.d_(w-v,x-3)
x=this.rx
v=this.k2
if(typeof x!=="number")return x.p()
if(typeof v!=="number")return H.c(v)
x-=v
this.rx=x
if(v<=$.d3.b&&x>=3){x=v-1
this.k2=x
do{w=this.r1
if(typeof w!=="number")return w.i();++w
this.r1=w
v=this.fr
u=this.id
if(typeof v!=="number")return v.n()
if(typeof u!=="number")return H.c(u)
u=C.a.n(v,u)
v=this.cy
t=w+2
if(t>>>0!==t||t>=v.length)return H.a(v,t)
t=v[t]
v=this.go
if(typeof v!=="number")return H.c(v)
v=((u^t&255)&v)>>>0
this.fr=v
t=this.dy
if(v>=t.length)return H.a(t,v)
u=t[v]
y=u&65535
s=this.dx
q=this.cx
if(typeof q!=="number")return H.c(q)
q=(w&q)>>>0
if(q<0||q>=s.length)return H.a(s,q)
s[q]=u
t[v]=w}while(--x,this.k2=x,x!==0)
x=w+1
this.r1=x}else{x=this.r1
if(typeof x!=="number")return x.i()
v=x+v
this.r1=v
this.k2=0
x=this.cy
w=x.length
if(v>>>0!==v||v>=w)return H.a(x,v)
u=x[v]&255
this.fr=u
t=this.id
if(typeof t!=="number")return H.c(t)
t=C.a.n(u,t)
u=v+1
if(u>=w)return H.a(x,u)
u=x[u]
x=this.go
if(typeof x!=="number")return H.c(x)
this.fr=((t^u&255)&x)>>>0
x=v}}else{x=this.cy
if(w>>>0!==w||w>=x.length)return H.a(x,w)
r=this.d_(0,x[w]&255)
w=this.rx
if(typeof w!=="number")return w.p()
this.rx=w-1
w=this.r1
if(typeof w!=="number")return w.i();++w
this.r1=w
x=w}if(r){w=this.k1
if(typeof w!=="number")return w.a9()
if(w>=0)v=w
else v=-1
this.cA(v,x-w,!1)
this.k1=this.r1
this.bv()}}z=a===4
this.eC(z)
return z?3:1},
kz:function(a){var z,y,x,w,v,u,t,s,r,q,p
for(z=a===0,y=0,x=null;!0;){w=this.rx
if(typeof w!=="number")return w.I()
if(w<262){this.eA()
w=this.rx
if(typeof w!=="number")return w.I()
if(w<262&&z)return 0
if(w===0)break}if(typeof w!=="number")return w.a9()
if(w>=3){w=this.fr
v=this.id
if(typeof w!=="number")return w.n()
if(typeof v!=="number")return H.c(v)
v=C.a.n(w,v)
w=this.cy
u=this.r1
if(typeof u!=="number")return u.i()
t=u+2
if(t>>>0!==t||t>=w.length)return H.a(w,t)
t=w[t]
w=this.go
if(typeof w!=="number")return H.c(w)
w=((v^t&255)&w)>>>0
this.fr=w
t=this.dy
if(w>=t.length)return H.a(t,w)
v=t[w]
y=v&65535
s=this.dx
r=this.cx
if(typeof r!=="number")return H.c(r)
r=(u&r)>>>0
if(r<0||r>=s.length)return H.a(s,r)
s[r]=v
t[w]=u}w=this.k2
this.ry=w
this.k3=this.r2
this.k2=2
if(y!==0){v=$.d3.b
if(typeof w!=="number")return w.I()
if(w<v){w=this.r1
if(typeof w!=="number")return w.p()
v=this.Q
if(typeof v!=="number")return v.p()
v=(w-y&65535)<=v-262
w=v}else w=!1}else w=!1
if(w){if(this.x2!==2){w=this.hr(y)
this.k2=w}else w=2
if(typeof w!=="number")return w.a6()
if(w<=5)if(this.x2!==1)if(w===3){v=this.r1
u=this.r2
if(typeof v!=="number")return v.p()
u=v-u>4096
v=u}else v=!1
else v=!0
else v=!1
if(v){this.k2=2
w=2}}else w=2
v=this.ry
if(typeof v!=="number")return v.a9()
if(v>=3&&w<=v){w=this.r1
u=this.rx
if(typeof w!=="number")return w.i()
if(typeof u!=="number")return H.c(u)
q=w+u-3
u=this.k3
if(typeof u!=="number")return H.c(u)
x=this.d_(w-1-u,v-3)
v=this.rx
u=this.ry
if(typeof u!=="number")return u.p()
if(typeof v!=="number")return v.p()
this.rx=v-(u-1)
u-=2
this.ry=u
w=u
do{v=this.r1
if(typeof v!=="number")return v.i();++v
this.r1=v
if(v<=q){u=this.fr
t=this.id
if(typeof u!=="number")return u.n()
if(typeof t!=="number")return H.c(t)
t=C.a.n(u,t)
u=this.cy
s=v+2
if(s>>>0!==s||s>=u.length)return H.a(u,s)
s=u[s]
u=this.go
if(typeof u!=="number")return H.c(u)
u=((t^s&255)&u)>>>0
this.fr=u
s=this.dy
if(u>=s.length)return H.a(s,u)
t=s[u]
y=t&65535
r=this.dx
p=this.cx
if(typeof p!=="number")return H.c(p)
p=(v&p)>>>0
if(p<0||p>=r.length)return H.a(r,p)
r[p]=t
s[u]=v}}while(--w,this.ry=w,w!==0)
this.k4=0
this.k2=2
w=v+1
this.r1=w
if(x){v=this.k1
if(typeof v!=="number")return v.a9()
if(v>=0)u=v
else u=-1
this.cA(u,w-v,!1)
this.k1=this.r1
this.bv()}}else if(this.k4!==0){w=this.cy
v=this.r1
if(typeof v!=="number")return v.p();--v
if(v>>>0!==v||v>=w.length)return H.a(w,v)
x=this.d_(0,w[v]&255)
if(x){w=this.k1
if(typeof w!=="number")return w.a9()
if(w>=0)v=w
else v=-1
u=this.r1
if(typeof u!=="number")return u.p()
this.cA(v,u-w,!1)
this.k1=this.r1
this.bv()}w=this.r1
if(typeof w!=="number")return w.i()
this.r1=w+1
w=this.rx
if(typeof w!=="number")return w.p()
this.rx=w-1}else{this.k4=1
w=this.r1
if(typeof w!=="number")return w.i()
this.r1=w+1
w=this.rx
if(typeof w!=="number")return w.p()
this.rx=w-1}}if(this.k4!==0){z=this.cy
w=this.r1
if(typeof w!=="number")return w.p();--w
if(w>>>0!==w||w>=z.length)return H.a(z,w)
this.d_(0,z[w]&255)
this.k4=0}z=a===4
this.eC(z)
return z?3:1},
hr:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=$.d3
y=z.d
x=this.r1
w=this.ry
v=this.Q
if(typeof v!=="number")return v.p()
v-=262
if(typeof x!=="number")return x.T()
u=x>v?x-v:0
t=z.c
s=this.cx
r=x+258
v=this.cy
if(typeof w!=="number")return H.c(w)
q=x+w
p=q-1
o=v.length
if(p>>>0!==p||p>=o)return H.a(v,p)
n=v[p]
if(q>>>0!==q||q>=o)return H.a(v,q)
m=v[q]
if(w>=z.a)y=y>>>2
z=this.rx
if(typeof z!=="number")return H.c(z)
if(t>z)t=z
l=r-258
k=null
do{c$0:{z=this.cy
v=a+w
q=z.length
if(v>>>0!==v||v>=q)return H.a(z,v)
if(z[v]===m){--v
if(v<0)return H.a(z,v)
if(z[v]===n){if(a<0||a>=q)return H.a(z,a)
v=z[a]
if(x>>>0!==x||x>=q)return H.a(z,x)
if(v===z[x]){j=a+1
if(j>=q)return H.a(z,j)
v=z[j]
p=x+1
if(p>=q)return H.a(z,p)
p=v!==z[p]
v=p}else{j=a
v=!0}}else{j=a
v=!0}}else{j=a
v=!0}if(v)break c$0
x+=2;++j
do{++x
if(x>>>0!==x||x>=q)return H.a(z,x)
v=z[x];++j
if(j<0||j>=q)return H.a(z,j)
if(v===z[j]){++x
if(x>=q)return H.a(z,x)
v=z[x];++j
if(j>=q)return H.a(z,j)
if(v===z[j]){++x
if(x>=q)return H.a(z,x)
v=z[x];++j
if(j>=q)return H.a(z,j)
if(v===z[j]){++x
if(x>=q)return H.a(z,x)
v=z[x];++j
if(j>=q)return H.a(z,j)
if(v===z[j]){++x
if(x>=q)return H.a(z,x)
v=z[x];++j
if(j>=q)return H.a(z,j)
if(v===z[j]){++x
if(x>=q)return H.a(z,x)
v=z[x];++j
if(j>=q)return H.a(z,j)
if(v===z[j]){++x
if(x>=q)return H.a(z,x)
v=z[x];++j
if(j>=q)return H.a(z,j)
if(v===z[j]){++x
if(x>=q)return H.a(z,x)
v=z[x];++j
if(j>=q)return H.a(z,j)
v=v===z[j]&&x<r}else v=!1}else v=!1}else v=!1}else v=!1}else v=!1}else v=!1}else v=!1}while(v)
k=258-(r-x)
if(k>w){this.r2=a
if(k>=t){w=k
break}z=this.cy
v=l+k
q=v-1
p=z.length
if(q>>>0!==q||q>=p)return H.a(z,q)
n=z[q]
if(v>>>0!==v||v>=p)return H.a(z,v)
m=z[v]
w=k}x=l}z=this.dx
if(typeof s!=="number")return H.c(s)
v=a&s
if(v<0||v>=z.length)return H.a(z,v)
a=z[v]&65535
if(a>u){--y
z=y!==0}else z=!1}while(z)
z=this.rx
if(typeof z!=="number")return H.c(z)
if(w<=z)return w
return z},
lF:function(a,b,c){var z,y,x,w
z=this.a
y=z.c
x=J.m(z.e,J.m(z.b,y))
if(J.V(x,c))x=c
if(J.k(x,0))return 0
w=z.cf(J.m(z.b,y),x)
z.b=J.b(z.b,J.m(w.e,J.m(w.b,w.c)))
if(typeof x!=="number")return H.c(x);(a&&C.h).bi(a,b,b+x,w.aq())
return x},
bv:function(){var z,y
z=this.r
this.b.ef(this.d,z)
y=this.f
if(typeof y!=="number")return y.i()
if(typeof z!=="number")return H.c(z)
this.f=y+z
y=this.r
if(typeof y!=="number")return y.p()
y-=z
this.r=y
if(y===0)this.f=0},
kT:function(a){switch(a){case 0:return new T.bl(0,0,0,0,0)
case 1:return new T.bl(4,4,8,4,1)
case 2:return new T.bl(4,5,16,8,1)
case 3:return new T.bl(4,6,32,32,1)
case 4:return new T.bl(4,4,16,16,2)
case 5:return new T.bl(8,16,32,32,2)
case 6:return new T.bl(8,16,128,128,2)
case 7:return new T.bl(8,32,128,256,2)
case 8:return new T.bl(32,128,258,1024,2)
case 9:return new T.bl(32,258,258,4096,2)}return},
static:{iC:function(a,b,c,d){var z,y,x
z=b*2
y=a.length
if(z>=y)return H.a(a,z)
z=a[z]
x=c*2
if(x>=y)return H.a(a,x)
x=a[x]
if(z>=x)if(z===x){z=d.length
if(b>=z)return H.a(d,b)
y=d[b]
if(c>=z)return H.a(d,c)
y=y<=d[c]
z=y}else z=!1
else z=!0
return z}}},
bl:{
"^":"j;a,b,c,d,e"},
i_:{
"^":"j;a,b,c",
kR:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.a
y=this.c
x=y.a
w=y.b
v=y.c
u=y.e
for(y=a.aE,t=y.length,s=0;s<=15;++s){if(s>=t)return H.a(y,s)
y[s]=0}r=a.c7
q=a.ba
p=r.length
if(q>>>0!==q||q>=p)return H.a(r,q)
o=r[q]*2+1
n=z.length
if(o>=n)return H.a(z,o)
z[o]=0
for(m=q+1,q=x!=null,o=w.length,l=null,k=null,j=0;m<573;++m){if(m>=p)return H.a(r,m)
i=r[m]
h=i*2
g=h+1
if(g>=n)return H.a(z,g)
f=z[g]*2+1
if(f>=n)return H.a(z,f)
s=z[f]+1
if(s>u){++j
s=u}z[g]=s
f=this.b
if(typeof f!=="number")return H.c(f)
if(i>f)continue
if(s>=t)return H.a(y,s)
y[s]=y[s]+1
if(i>=v){f=i-v
if(f<0||f>=o)return H.a(w,f)
l=w[f]}else l=0
if(h>=n)return H.a(z,h)
k=z[h]
h=a.aC
if(typeof h!=="number")return h.i()
a.aC=h+k*(s+l)
if(q){h=a.aT
if(g>=x.length)return H.a(x,g)
g=x[g]
if(typeof h!=="number")return h.i()
a.aT=h+k*(g+l)}}if(j===0)return
s=u-1
do{e=s
while(!0){if(e<0||e>=t)return H.a(y,e)
q=y[e]
if(!(q===0))break;--e}y[e]=q-1
q=e+1
if(q>=t)return H.a(y,q)
y[q]=y[q]+2
if(u>=t)return H.a(y,u)
y[u]=y[u]-1
j-=2}while(j>0)
for(s=u,d=null;s!==0;--s){if(s<0||s>=t)return H.a(y,s)
i=y[s]
for(;i!==0;){--m
if(m<0||m>=p)return H.a(r,m)
d=r[m]
q=this.b
if(typeof q!=="number")return H.c(q)
if(d>q)continue
q=d*2
o=q+1
if(o>=n)return H.a(z,o)
h=z[o]
if(h!==s){g=a.aC
if(q>=n)return H.a(z,q)
q=z[q]
if(typeof g!=="number")return g.i()
a.aC=g+(s-h)*q
z[o]=s}--i}}},
eo:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=this.a
y=this.c
x=y.a
w=y.d
a.aS=0
a.ba=573
for(y=a.c7,v=y.length,u=a.bN,t=u.length,s=0,r=-1;s<w;++s){q=s*2
p=z.length
if(q>=p)return H.a(z,q)
if(z[q]!==0){q=a.aS
if(typeof q!=="number")return q.i();++q
a.aS=q
if(q<0||q>=v)return H.a(y,q)
y[q]=s
if(s>=t)return H.a(u,s)
u[s]=0
r=s}else{++q
if(q>=p)return H.a(z,q)
z[q]=0}}q=x!=null
while(!0){p=a.aS
if(typeof p!=="number")return p.I()
if(!(p<2))break;++p
a.aS=p
if(r<2){++r
o=r}else o=0
if(p<0||p>=v)return H.a(y,p)
y[p]=o
p=o*2
if(p<0||p>=z.length)return H.a(z,p)
z[p]=1
if(o>=t)return H.a(u,o)
u[o]=0
n=a.aC
if(typeof n!=="number")return n.p()
a.aC=n-1
if(q){n=a.aT;++p
if(p>=x.length)return H.a(x,p)
p=x[p]
if(typeof n!=="number")return n.p()
a.aT=n-p}}this.b=r
for(s=C.a.a3(p,2);s>=1;--s)a.eR(z,s)
if(1>=v)return H.a(y,1)
o=w
do{s=y[1]
q=a.aS
if(typeof q!=="number")return q.p()
a.aS=q-1
if(q<0||q>=v)return H.a(y,q)
y[1]=y[q]
a.eR(z,1)
m=y[1]
q=a.ba
if(typeof q!=="number")return q.p();--q
a.ba=q
if(q<0||q>=v)return H.a(y,q)
y[q]=s;--q
a.ba=q
if(q<0||q>=v)return H.a(y,q)
y[q]=m
q=o*2
p=s*2
n=z.length
if(p>=n)return H.a(z,p)
l=z[p]
k=m*2
if(k>=n)return H.a(z,k)
j=z[k]
if(q>=n)return H.a(z,q)
z[q]=l+j
if(s>=t)return H.a(u,s)
j=u[s]
if(m>=t)return H.a(u,m)
l=u[m]
q=j>l?j:l
if(o>=t)return H.a(u,o)
u[o]=q+1;++p;++k
if(k>=n)return H.a(z,k)
z[k]=o
if(p>=n)return H.a(z,p)
z[p]=o
i=o+1
y[1]=o
a.eR(z,1)
q=a.aS
if(typeof q!=="number")return q.a9()
if(q>=2){o=i
continue}else break}while(!0)
u=a.ba
if(typeof u!=="number")return u.p();--u
a.ba=u
t=y[1]
if(u<0||u>=v)return H.a(y,u)
y[u]=t
this.kR(a)
T.rD(z,r,a.aE)},
static:{rD:function(a,b,c){var z,y,x,w,v,u,t,s,r
z=H.i(16)
y=new Uint16Array(z)
for(x=c.length,w=0,v=1;v<=15;++v){u=v-1
if(u>=x)return H.a(c,u)
w=w+c[u]<<1>>>0
if(v>=z)return H.a(y,v)
y[v]=w}for(x=a.length,t=0;t<=b;++t){u=t*2
s=u+1
if(s>=x)return H.a(a,s)
r=a[s]
if(r===0)continue
if(r>=z)return H.a(y,r)
s=y[r]
y[r]=s+1
s=T.rE(s,r)
if(u>=x)return H.a(a,u)
a[u]=s}},rE:function(a,b){var z,y
z=0
do{y=T.aE(a,1)
z=(z|a&1)<<1>>>0
if(--b,b>0){a=y
continue}else break}while(!0)
return T.aE(z,1)}}},
i3:{
"^":"j;a,b,c,d,e"},
n9:{
"^":"j;a,b,c",
ji:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.length
for(y=0;y<z;++y){x=a[y]
if(x>this.b)this.b=x
if(x<this.c)this.c=x}w=C.a.H(1,this.b)
x=H.i(w)
v=new Uint32Array(x)
this.a=v
for(u=this.b,t=a.length,s=1,r=0,q=2;s<=u;){for(p=s<<16,y=0;y<z;++y){if(y>=t)return H.a(a,y)
if(a[y]===s){for(o=r,n=0,m=0;m<s;++m){n=(n<<1|o&1)>>>0
o=o>>>1}for(l=(p|y)>>>0,m=n;m<w;m+=q){if(m<0||m>=x)return H.a(v,m)
v[m]=l}++r}}++s
r=r<<1>>>0
q=q<<1>>>0}},
static:{b7:function(a){var z=new T.n9(null,0,2147483647)
z.ji(a)
return z}}},
dO:{
"^":"j;a,b,c,d,e,f,r",
dJ:function(){this.c=0
this.d=0
for(;this.lk(););},
lk:function(){var z,y,x,w,v
z=this.a
if(J.U(z.b,J.b(z.c,z.e)))return!1
y=this.aW(3)
x=y>>>1
switch(x){case 0:this.c=0
this.d=0
w=this.aW(16)
if(w===~this.aW(16)>>>0)H.K(new T.R("Invalid uncompressed block header"))
z=this.a
z=J.m(z.e,J.m(z.b,z.c))
if(typeof z!=="number")return H.c(z)
if(w>z)H.K(new T.R("Input buffer is broken"))
z=this.a
v=z.cf(J.m(z.b,z.c),w)
z.b=J.b(z.b,J.m(v.e,J.m(v.b,v.c)))
this.b.o0(v)
break
case 1:this.h3(this.f,this.r)
break
case 2:this.ll()
break
default:throw H.f(new T.R("unknown BTYPE: "+x))}return(y&1)===0},
aW:function(a){var z,y,x,w
if(a===0)return 0
for(;z=this.d,z<a;){z=this.a
if(J.U(z.b,J.b(z.c,z.e)))throw H.f(new T.R("input buffer is broken"))
z=this.a
y=z.a
x=z.b
z.b=J.b(x,1)
w=J.e(y,x)
x=this.c
y=this.d
if(typeof w!=="number")return w.n()
this.c=(x|C.b.n(w,y))>>>0
this.d=y+8}y=this.c
x=C.a.H(1,a)
this.c=C.a.bm(y,a)
this.d=z-a
return(y&x-1)>>>0},
eS:function(a){var z,y,x,w,v,u,t,s
z=a.a
y=a.b
for(;this.d<y;){x=this.a
if(J.U(x.b,J.b(x.c,x.e)))break
x=this.a
w=x.a
v=x.b
x.b=J.b(v,1)
u=J.e(w,v)
v=this.c
w=this.d
if(typeof u!=="number")return u.n()
this.c=(v|C.b.n(u,w))>>>0
this.d=w+8}x=this.c
w=(x&C.a.H(1,y)-1)>>>0
if(w>=z.length)return H.a(z,w)
t=z[w]
s=t>>>16
this.c=C.a.bm(x,s)
this.d-=s
return t&65535},
ll:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.aW(5)+257
y=this.aW(5)+1
x=this.aW(4)+4
w=H.i(19)
v=new Uint8Array(w)
for(u=0;u<x;++u){if(u>=19)return H.a(C.E,u)
t=C.E[u]
s=this.aW(3)
if(t>=w)return H.a(v,t)
v[t]=s}r=T.b7(v)
q=new Uint8Array(H.i(z))
p=new Uint8Array(H.i(y))
o=this.h1(z,r,q)
n=this.h1(y,r,p)
this.h3(T.b7(o),T.b7(n))},
h3:function(a,b){var z,y,x,w,v,u,t,s
for(z=this.b;!0;){y=this.eS(a)
if(y>285)throw H.f(new T.R("Invalid Huffman Code "+y))
if(y===256)break
if(y<256){if(z.a===z.c.length)z.bZ()
x=z.c
w=z.a++
if(w>>>0!==w||w>=x.length)return H.a(x,w)
x[w]=y&255&255
continue}v=y-257
if(v<0||v>=29)return H.a(C.az,v)
u=C.az[v]+this.aW(C.eH[v])
t=this.eS(b)
if(t<=29){if(t>=30)return H.a(C.as,t)
s=C.as[t]+this.aW(C.D[t])
for(x=-s;u>s;){z.bR(z.cR(x))
u-=s}if(u===s)z.bR(z.cR(x))
else z.bR(z.cf(x,u-s))}else throw H.f(new T.R("Illegal unused distance symbol"))}for(;z=this.d,z>=8;){this.d=z-8
z=this.a
z.b=J.m(z.b,1)}},
h1:function(a,b,c){var z,y,x,w,v,u,t
for(z=c.length,y=0,x=0;x<a;){w=this.eS(b)
switch(w){case 16:v=3+this.aW(2)
for(;u=v-1,v>0;v=u,x=t){t=x+1
if(x<0||x>=z)return H.a(c,x)
c[x]=y}break
case 17:v=3+this.aW(3)
for(;u=v-1,v>0;v=u,x=t){t=x+1
if(x<0||x>=z)return H.a(c,x)
c[x]=0}y=0
break
case 18:v=11+this.aW(7)
for(;u=v-1,v>0;v=u,x=t){t=x+1
if(x<0||x>=z)return H.a(c,x)
c[x]=0}y=0
break
default:if(w>15)throw H.f(new T.R("Invalid Huffman Code: "+w))
t=x+1
if(x<0||x>=z)return H.a(c,x)
c[x]=w
x=t
y=w
break}}return c},
jo:function(a,b){this.dJ()},
static:{nk:function(a,b){var z,y
z=T.b7(C.G)
y=T.b7(C.P)
y=new T.dO(T.b_(a,0,null,0),T.cB(0,b),0,0,0,z,y)
y.jo(a,b)
return y}}},
cc:{
"^":"j;",
bp:function(a,b){var z,y,x,w,v,u,t,s
z=a.a
y=a.b
a.b=J.b(y,1)
x=J.y(z)
w=x.h(z,y)
y=a.b
a.b=J.b(y,1)
v=x.h(z,y)
u=J.u(w).L(w,8)
if(typeof w!=="number")return w.w()
C.b.l(w,3)
if(u!==8)throw H.f(new T.R("Only DEFLATE compression supported: "+H.l(u)))
z=J.u(v)
z.L(v,16)
y=z.L(v,32)
if(typeof y!=="number")return y.w()
z=z.L(v,64)
if(typeof z!=="number")return z.w()
if(typeof v!=="number")return H.c(v)
if(C.b.R((w<<8>>>0)+v,31)!==0)throw H.f(new T.R("Invalid FCHECK"))
if(y>>>5!==0){a.t()
throw H.f(new T.R("FDICT Encoding not currently supported"))}z=T.b7(C.G)
y=T.b7(C.P)
x=T.cB(0,null)
new T.dO(a,x,0,0,0,z,y).dJ()
y=x.c.buffer
t=(y&&C.f).a0(y,0,x.a)
s=a.t()
if(b)if(s!==T.l9(t,1))throw H.f(new T.R("Invalid adler-32 checksum"))
return t}},
r3:{
"^":"j;",
mK:function(a,b){var z,y,x,w,v,u
z=T.cB(1,32768)
z.ab(120)
for(y=0;x=(0|y)>>>0,C.a.R(30720+x,31)!==0;)++y
z.ab(x)
w=T.l9(a,1)
v=T.b_(a,1,null,0)
x=T.cB(0,32768)
u=new T.ma(v,x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,null,null,null,null,null,null,null,new T.i_(null,null,null),new T.i_(null,null,null),new T.i_(null,null,null),new Uint16Array(H.i(16)),new Uint32Array(H.i(573)),null,null,new Uint8Array(H.i(573)),null,null,null,null,null,null,null,null,null,null)
u.l5(b)
u.kx(4)
u.bv()
u=x.c.buffer
z.bR((u&&C.f).a0(u,0,x.a))
z.cM(w)
x=z.c.buffer
return(x&&C.f).a0(x,0,z.a)}}}],["","",,K,{
"^":"",
fa:{
"^":"aM;a,b,c,d",
static:{wS:[function(a,b,c){var z,y,x,w,v,u,t
z=a.j("shutteropen",0)
y=a.j("shutterclose",1)
if(J.a7(y,z)){x="Shutter close time ["+H.l(y)+"] < shutter open ["+H.l(z)+"]. Swapping them."
$.A.$2(1,x)
w=y
y=z
z=w}v=a.j("frameaspectratio",c.gfA()/c.b)
u=a.bc("screenwindow")
if(u!=null&&J.k(J.M(u),4));else{t=[0,0,0,0]
x=J.u(v)
if(x.T(v,1)){t[0]=x.aa(v)
t[1]=v
t[2]=-1
t[3]=1}else{t[0]=-1
t[1]=1
if(typeof v!=="number")return H.c(v)
t[2]=-1/v
t[3]=1/v}}return new K.fa(b,z,y,c)},"$3","tD",6,0,43]}},
h_:{
"^":"jD;Q,ch,e,f,r,x,y,z,a,b,c,d",
static:{yc:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=a.j("shutteropen",0)
y=a.j("shutterclose",1)
if(J.a7(y,z)){x="Shutter close time ["+H.l(y)+"] < shutter open ["+H.l(z)+"].  Swapping them."
$.A.$2(1,x)
w=y
y=z
z=w}v=a.j("lensradius",0)
u=a.j("focaldistance",1e30)
t=a.j("frameaspectratio",c.gfA()/c.b)
s=a.bc("screenwindow")
if(s!=null&&J.k(J.M(s),4))r=s
else{r=[0,0,0,0]
x=J.u(t)
if(x.T(t,1)){r[0]=x.aa(t)
r[1]=t
r[2]=-1
r[3]=1}else{r[0]=-1
r[1]=1
if(typeof t!=="number")return H.c(t)
r[2]=-1/t
r[3]=1/t}}x=G.ee(1,1,1).q(0,G.ef(G.a5(0,0,-0.0)))
q=new K.h_(null,null,x,null,null,null,v,u,b,z,y,c)
q.fK(b,x,r,z,y,v,u,c)
q.Q=q.f.cI(G.a5(1,0,0))
q.ch=q.f.cI(G.a5(0,1,0))
return q},"$3","tE",6,0,44]}},
h3:{
"^":"jD;Q,ch,e,f,r,x,y,z,a,b,c,d",
static:{yi:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=a.j("shutteropen",0)
y=a.j("shutterclose",1)
if(J.a7(y,z)){x="Shutter close time ["+H.l(y)+"] < shutter open ["+H.l(z)+"].  Swapping them."
$.A.$2(1,x)
w=y
y=z
z=w}v=a.j("lensradius",0)
u=a.j("focaldistance",1e30)
t=a.j("frameaspectratio",c.gfA()/c.b)
s=a.bc("screenwindow")
if(s!=null&&J.k(J.M(s),4))r=s
else{r=[0,0,0,0]
x=J.u(t)
if(x.T(t,1)){r[0]=x.aa(t)
r[1]=t
r[2]=-1
r[3]=1}else{r[0]=-1
r[1]=1
if(typeof t!=="number")return H.c(t)
r[2]=-1/t
r[3]=1/t}}q=a.j("fov",60)
p=a.j("halffov",-1)
if(J.V(p,0)){if(typeof p!=="number")return H.c(p)
q=2*p}x=G.k3(q,0.01,1000)
o=new K.h3(null,null,x,null,null,null,v,u,b,z,y,c)
o.fK(b,x,r,z,y,v,u,c)
x=o.f
n=new G.t(new Float32Array(H.i(3)))
n.G(1,0,0)
n=x.ai(n)
x=o.f
m=new G.t(new Float32Array(H.i(3)))
m.G(0,0,0)
o.Q=n.p(0,x.ai(m))
m=o.f
x=new G.t(new Float32Array(H.i(3)))
x.G(0,1,0)
x=m.ai(x)
m=o.f
n=new G.t(new Float32Array(H.i(3)))
n.G(0,0,0)
o.ch=x.p(0,m.ai(n))
return o},"$3","tF",6,0,45]}}}],["","",,G,{
"^":"",
b4:function(a){a=J.m(a,1)
if(typeof a!=="number")return a.w()
a|=C.b.l(a,1)
a|=a>>>2
a|=a>>>4
a|=a>>>8
return((a|a>>>16)>>>0)+1},
hl:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=P.c9(a,0,null)
y=z.length
x=new G.p9(48,57)
w=new G.pa()
v=[]
for(u=0,t=!1,s="",r=0;u<y;){q=u+1
if(u<0)return H.a(z,u)
p=z[u]
if(p==="\n")++r
if(t){if(x.$1(p)===!0||p==="."||p==="e"||p==="-"||p==="+"){s+=p
t=!0}else{v.push(H.oK(s,null))
t=!1
s=""}u=q}else if(x.$1(p)===!0||p==="."||p==="-"||p==="+"){s+=p
u=q
t=!0}else{if(p==="#"){u=q
while(!0){q=u+1
if(u<0||u>=y)return H.a(z,u)
if(!(z[u]!=="\n"&&q<y))break
u=q}++r
u=q}else{if(w.$1(p)!==!0){o="Unexpected text found at line "+r+" of float file "+H.l(b)+": "+p
$.A.$2(1,o)}u=q}t=!1}}return v},
ik:function(a,b,c,d){var z,y
for(z=a.length;c<d;){while(!0){if(c<0||c>=z)return H.a(a,c)
if(!(b.$1(a[c])===!0))break;++c
if(c===d)return c}do{--d
if(c===d)return c
if(d<0||d>=z)return H.a(a,d)}while(b.$1(a[d])!==!0)
y=a[c]
a[c]=a[d]
a[d]=y;++c}return c},
dA:function(a,b,c,d,e){var z,y,x,w,v
z=C.e.ay(a,b,d)
C.e.fF(z,new G.vd(e))
for(y=a.length,x=b,w=0;J.a7(x,d);++x,++w){if(w>=z.length)return H.a(z,w)
v=z[w]
if(x>>>0!==x||x>=y)return H.a(a,x)
a[x]=v}},
yo:[function(a,b){if(a>=5)return H.a(C.al,a)
P.dB(C.al[a]+": "+H.l(b))
if(a===3)throw H.f(P.cu(b))},"$2","tN",4,0,46],
lJ:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=b.a
if(2>=z.length)return H.a(z,2)
y=z[2]
x=J.z(a)
w=J.e(x.gB(a),2)
z=z[2]
z=P.O(0,1-z*z)
v=Math.sqrt(z)
z=J.h(J.e(x.gB(a),2),J.e(x.gB(a),2))
if(typeof z!=="number")return H.c(z)
z=P.O(0,1-z)
u=Math.sqrt(z)
z=b.gK(b)
t=b.gM(b)
s=Math.atan2(z,t)
r=s<0?s+6.283185307179586:s
z=x.gK(a)
x=x.gM(a)
if(typeof z!=="number")H.K(H.N(z))
if(typeof x!=="number")H.K(H.N(x))
s=Math.atan2(z,x)
q=r-(s<0?s+6.283185307179586:s)
if(q<0)q+=6.283185307179586
if(q>6.283185307179586)q-=6.283185307179586
if(q>3.141592653589793)q=6.283185307179586-q
if(typeof w!=="number")return H.c(w)
z=new Float32Array(3)
if(0>=3)return H.a(z,0)
z[0]=v*u
if(1>=3)return H.a(z,1)
z[1]=q/3.141592653589793
if(2>=3)return H.a(z,2)
z[2]=y*w
return new G.t(z)},
F:function(a){var z,y
z=$.ea
if(z===0){z=new Float32Array(3)
y=new G.b3(z)
if(!J.k(a,0))C.B.ag(z,0,3,a)
z=y}else if(z===2){z=new Float32Array(4)
y=new G.a4(z)
if(!J.k(a,0))C.B.ag(z,0,4,a)
z=y}else if(z===1){z=new Float32Array(3)
y=new G.b5(z)
if(!J.k(a,0))C.B.ag(z,0,3,a)
z=y}else z=null
return z},
bK:function(a,b){switch($.ea){case 0:return G.e5(a)
case 1:return G.r2(a)
case 2:return G.py(a,b)}$.A.$2(3,"Invalid Spectrum type")
return},
jT:function(a,b,c){var z,y
z=$.ea
if(z===0)z=G.bt(a,b,c)
else if(z===2){z=new G.a4(new Float32Array(4))
z.cP(a,b,c)}else if(z===1){z=new Float32Array(3)
y=new G.b5(z)
G.e9(a,b,c,z)
z=y}else z=null
return z},
jV:function(a,b,c,d){var z
if(typeof a!=="number")return H.c(a)
if(typeof b!=="number")return H.c(b)
if(typeof c!=="number")return H.c(c)
z=d.length
if(0>=z)return H.a(d,0)
d[0]=3.240479*a-1.53715*b-0.498535*c
if(1>=z)return H.a(d,1)
d[1]=-0.969256*a+1.875991*b+0.041556*c
if(2>=z)return H.a(d,2)
d[2]=0.055648*a-0.204043*b+1.057311*c},
e9:function(a,b,c,d){var z
if(typeof a!=="number")return H.c(a)
if(typeof b!=="number")return H.c(b)
if(typeof c!=="number")return H.c(c)
z=d.length
if(0>=z)return H.a(d,0)
d[0]=0.412453*a+0.35758*b+0.180423*c
if(1>=z)return H.a(d,1)
d[1]=0.212671*a+0.71516*b+0.072169*c
if(2>=z)return H.a(d,2)
d[2]=0.019334*a+0.119193*b+0.950227*c},
jU:function(a){var z,y,x,w
for(z=a.length-1,y=0;y<z;){x=a.length
if(y>=x)return H.a(a,y)
w=a[y];++y
if(y>=x)return H.a(a,y)
if(J.V(w,a[y]))return!1}return!0},
jS:function(a,b,c){var z,y,x,w,v,u
z=[]
y=a.length
for(x=0;x<y;++x){if(x>=a.length)return H.a(a,x)
w=a[x]
v=c+x
if(v<0||v>=b.length)return H.a(b,v)
z.push([w,b[v]])}C.e.fF(z,new G.pH())
for(w=J.as(a),v=J.as(b),x=0;x<y;++x){if(x>=z.length)return H.a(z,x)
u=z[x]
if(0>=u.length)return H.a(u,0)
w.k(a,x,u[0])
if(x>=z.length)return H.a(z,x)
u=z[x]
if(1>=u.length)return H.a(u,1)
v.k(b,c+x,u[1])}},
ax:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
z=a.length
if(0>=z)return H.a(a,0)
y=J.u(d)
if(y.a6(d,a[0])){if(e<0||e>=b.length)return H.a(b,e)
return b[e]}x=z-1
if(x<0||x>=a.length)return H.a(a,x)
w=J.u(c)
if(w.a9(c,a[x])){y=e+z-1
if(y<0||y>=b.length)return H.a(b,y)
return b[y]}if(z===1){if(e<0||e>=b.length)return H.a(b,e)
return b[e]}if(0>=a.length)return H.a(a,0)
if(w.I(c,a[0])){if(e<0||e>=b.length)return H.a(b,e)
v=b[e]
if(0>=a.length)return H.a(a,0)
v=J.h(v,J.m(a[0],c))
if(typeof v!=="number")return H.c(v)
u=0+v}else u=0
if(x>=a.length)return H.a(a,x)
if(y.T(d,a[x])){v=e+z-1
if(v<0||v>=b.length)return H.a(b,v)
v=b[v]
if(x>=a.length)return H.a(a,x)
x=J.h(v,y.p(d,a[x]))
if(typeof x!=="number")return H.c(x)
u+=x}t=0
while(!0){s=t+1
if(s>=a.length)return H.a(a,s)
if(!w.T(c,a[s]))break
t=s}x=new G.pF(new G.pE(a,b,e))
while(!0){s=t+1
if(s<z){if(t>=a.length)return H.a(a,t)
w=y.a9(d,a[t])}else w=!1
if(!w)break
if(t>=a.length)return H.a(a,t)
r=P.O(c,a[t])
if(s>=a.length)return H.a(a,s)
q=P.a6(d,a[s])
w=J.h(x.$3(r,q,t),q-r)
if(typeof w!=="number")return H.c(w)
u+=w
t=s}y=y.p(d,c)
if(typeof y!=="number")return H.c(y)
return u/y},
pG:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.length
if(0>=z)return H.a(a,0)
y=J.u(c)
if(y.a6(c,a[0])){if(d<0||d>=b.length)return H.a(b,d)
return b[d]}x=z-1
if(x<0||x>=a.length)return H.a(a,x)
if(y.a9(c,a[x])){y=d+x
if(y<0||y>=b.length)return H.a(b,y)
return b[y]}for(w=0;w<x;++w){if(w>=a.length)return H.a(a,w)
if(y.a9(c,a[w])){v=w+1
if(v>=a.length)return H.a(a,v)
v=y.a6(c,a[v])}else v=!1
if(v){if(w>=a.length)return H.a(a,w)
x=y.p(c,a[w])
v=w+1
u=a.length
if(v>=u)return H.a(a,v)
v=a[v]
if(w>=u)return H.a(a,w)
v=J.m(v,a[w])
if(typeof x!=="number")return x.au()
if(typeof v!=="number")return H.c(v)
t=x/v
v=d+w
x=b.length
if(v<0||v>=x)return H.a(b,v)
u=b[v];++v
if(v>=x)return H.a(b,v)
v=b[v]
return J.b(J.h(u,1-t),J.h(v,t))}}$.A.$2(3,"Fatal logic error in InterpolateSpectrumSamples()")
return 0},
jX:function(){var z,y,x,w,v
for(z=$.$get$hw(),y=z.length,x="",w=0;w<z.length;z.length===y||(0,H.aA)(z),++w){v=z[w]
x+=v.a+" | "+v.b+": "+H.l(v.c)+"\n"}return x},
o3:function(a,b){var z,y
a=Math.abs(a)
if(a<0.00001)return 1
if(a>1)return 0
a*=3.141592653589793
z=a*b
y=Math.sin(z)
return y/z*(Math.sin(a)/a)},
ju:function(a,b,c){var z,y,x
z=G.qU(a,b)
y=J.G(c)
x=y.q(c,c)
if(typeof x!=="number")return H.c(x)
y=y.q(c,c)
if(typeof y!=="number")return H.c(y)
if(typeof c!=="number")return H.c(c)
if(typeof z!=="number")return H.c(z)
y=1+y-2*c*z
H.T(y)
H.T(1.5)
return 0.07957747154594767*(1-x)/Math.pow(y,1.5)},
mR:function(a,b,c){var z,y,x
if(!C.v.X(a))return!1
z=C.v.h(0,a)
if(1>=z.length)return H.a(z,1)
z=z[1][0]
y=C.v.h(0,a)
if(1>=y.length)return H.a(y,1)
y=y[1][1]
x=C.v.h(0,a)
if(2>=x.length)return H.a(x,2)
b.cP(z,y,x[2][2])
x=C.v.h(0,a)
if(0>=x.length)return H.a(x,0)
x=x[0][0]
y=C.v.h(0,a)
if(0>=y.length)return H.a(y,0)
y=y[0][1]
z=C.v.h(0,a)
if(0>=z.length)return H.a(z,0)
c.cP(x,y,z[0][2])
return!0},
cq:{
"^":"j;"},
ah:{
"^":"j;df:a<,b",
e8:function(a){var z,y
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
gmo:function(){return this.a.q(0,0.5).i(0,this.b.q(0,0.5))},
h:function(a,b){return J.k(b,0)?this.a:this.b},
n9:function(a){var z,y,x,w,v,u,t
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
ar:function(a){var z,y
z=this.a.a
if(0>=z.length)return H.a(z,0)
y=J.z(a)
z[0]=P.a6(z[0],y.gM(a))
z=this.a.a
if(1>=z.length)return H.a(z,1)
z[1]=P.a6(z[1],y.gK(a))
z=this.a.a
if(2>=z.length)return H.a(z,2)
z[2]=P.a6(z[2],y.gao(a))
z=this.b.a
if(0>=z.length)return H.a(z,0)
z[0]=P.O(z[0],y.gM(a))
z=this.b.a
if(1>=z.length)return H.a(z,1)
z[1]=P.O(z[1],y.gK(a))
z=this.b.a
if(2>=z.length)return H.a(z,2)
z[2]=P.O(z[2],y.gao(a))
return this},
bg:function(a){var z,y,x
z=this.a.a
if(0>=z.length)return H.a(z,0)
y=z[0]
x=a.gdf().a
if(0>=x.length)return H.a(x,0)
z[0]=P.a6(y,x[0])
x=this.a.a
if(1>=x.length)return H.a(x,1)
y=x[1]
z=a.a.a
if(1>=z.length)return H.a(z,1)
x[1]=P.a6(y,z[1])
z=this.a.a
if(2>=z.length)return H.a(z,2)
y=z[2]
x=a.a.a
if(2>=x.length)return H.a(x,2)
z[2]=P.a6(y,x[2])
x=this.b.a
if(0>=x.length)return H.a(x,0)
y=x[0]
z=a.b.a
if(0>=z.length)return H.a(z,0)
x[0]=P.O(y,z[0])
z=this.b.a
if(1>=z.length)return H.a(z,1)
y=z[1]
x=a.b.a
if(1>=x.length)return H.a(x,1)
z[1]=P.O(y,x[1])
x=this.b.a
if(2>=x.length)return H.a(x,2)
y=x[2]
z=a.b.a
if(2>=z.length)return H.a(z,2)
x[2]=P.O(y,z[2])
return this},
ci:function(){var z,y,x,w
z=this.b.p(0,this.a).a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
return 2*(x*w+x*z+w*z)},
fl:function(){var z,y,x,w
z=this.b.p(0,this.a).a
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
j_:function(a,b){var z,y,x,w,v,u
z=a==null
if(z&&b==null){z=new G.t(new Float32Array(H.i(3)))
z.G(1/0,1/0,1/0)
this.a=z
z=new G.t(new Float32Array(H.i(3)))
z.G(-1/0,-1/0,-1/0)
this.b=z}else{z=!z&&b!=null
y=J.z(a)
if(z){z=J.z(b)
x=P.a6(y.gM(a),z.gM(b))
w=P.a6(y.gK(a),z.gK(b))
v=P.a6(y.gao(a),z.gao(b))
u=new G.t(new Float32Array(H.i(3)))
u.G(x,w,v)
this.a=u
u=P.O(y.gM(a),z.gM(b))
v=P.O(y.gK(a),z.gK(b))
z=P.O(y.gao(a),z.gao(b))
y=new G.t(new Float32Array(H.i(3)))
y.G(u,v,z)
this.b=y}else{this.a=new G.t(new Float32Array(H.D(y.gB(a))))
this.b=new G.t(new Float32Array(H.D(y.gB(a))))}}},
static:{a0:function(a,b){var z=new G.ah(null,null)
z.j_(a,b)
return z},cr:function(a){return new G.ah(new G.t(new Float32Array(H.D(a.gdf().a))),new G.t(new Float32Array(H.D(a.b.a))))}}},
aM:{
"^":"j;bW:b<,bV:c<"},
p9:{
"^":"r:14;a,b",
$1:function(a){var z=C.c.P(a,0)
return z>=this.a&&z<=this.b}},
pa:{
"^":"r:14;",
$1:function(a){return a===" "||a==="\t"||a==="\n"||a==="\r"}},
vd:{
"^":"r:5;a",
$2:function(a,b){return this.a.$2(a,b)===!0?-1:1}},
bX:{
"^":"j;fA:a<"},
bY:{
"^":"j;o2:a<,o3:b<"},
j0:{
"^":"j;"},
o_:{
"^":"j;a,b,c,d",
eV:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=J.G(b)
if(J.k(z.i(b,1),c)){z=this.a
if(a<0||a>=z.length)return H.a(z,a)
z[a]=new G.i0(null,3,!1,536870911)
z=this.b
if(b>>>0!==b||b>=e.length)return H.a(e,b)
y=e[b]
if(y>>>0!==y||y>=d.length)return H.a(d,y)
y=d[y]
if(a>=z.length)return H.a(z,a)
z[a]=y
return}x=G.a0(null,null)
for(y=e.length,w=b;J.a7(w,c);++w){if(w>>>0!==w||w>=y)return H.a(e,w)
v=e[w]
if(v>>>0!==v||v>=d.length)return H.a(d,v)
v=J.cp(d[v])
x=new G.ah(new G.t(new Float32Array(H.D(x.a.a))),new G.t(new Float32Array(H.D(x.b.a)))).ar(v)}u=x.fl()
t=J.av(z.i(b,c),2)
G.dA(e,b,t,c,new G.rg(d,u))
v=this.a
if(t>>>0!==t||t>=y)return H.a(e,t)
y=e[t]
if(y>>>0!==y||y>=d.length)return H.a(d,y)
y=J.e(J.cp(d[y]),u)
if(a<0||a>=v.length)return H.a(v,a)
v[a]=new G.i0(y,u,!1,536870911)
y=this.b
v=e[t]
if(v>>>0!==v||v>=d.length)return H.a(d,v)
v=d[v]
if(a>=y.length)return H.a(y,a)
y[a]=v
if(z.I(b,t)){z=this.a
if(a>=z.length)return H.a(z,a)
z[a].c=!0
this.eV(this.d++,b,t,d,e)}z=t+1
if(typeof c!=="number")return H.c(c)
if(z<c){y=this.a
v=y.length
if(a>=v)return H.a(y,a)
s=y[a]
r=this.d++
s.d=r
if(a>=v)return H.a(y,a)
this.eV(r,z,c,d,e)}},
jq:function(a){var z,y,x,w
z=a.length
this.c=z
this.d=1
this.a=H.p(Array(z),[G.i0])
z=this.c
if(typeof z!=="number")return H.c(z)
this.b=Array(z)
y=H.p(Array(z),[P.o])
z=this.c
if(typeof z!=="number")return H.c(z)
x=y.length
w=0
for(;w<z;++w){if(w>=x)return H.a(y,w)
y[w]=w}this.eV(0,0,z,a,y)},
static:{o0:function(a){var z=new G.o_(null,null,null,null)
z.jq(a)
return z}}},
rg:{
"^":"j:41;B:a>,b",
$2:function(a,b){var z,y
z=this.a
if(a>>>0!==a||a>=z.length)return H.a(z,a)
z=J.e(J.cp(z[a]),this.b)
y=this.a
if(b>>>0!==b||b>=y.length)return H.a(y,b)
y=J.k(z,J.e(J.cp(y[b]),this.b))
z=this.a
if(y){if(a>=z.length)return H.a(z,a)
z=J.aG(z[a])
y=this.a
if(b>=y.length)return H.a(y,b)
y=J.a7(z,J.aG(y[b]))
z=y}else{if(a>=z.length)return H.a(z,a)
z=J.e(J.cp(z[a]),this.b)
y=this.a
if(b>=y.length)return H.a(y,b)
y=J.a7(z,J.e(J.cp(y[b]),this.b))
z=y}return z}},
i0:{
"^":"j;a,b,c,d"},
c1:{
"^":"j;",
bX:function(a,b){if(this.b.n4())$.A.$2(1,"Scaling detected in world to light transformation! The system has numerous assumptions, implicit and explicit, that this transform will have no scale factors in it. Proceed at your own risk; your image may have errors or the system may crash as a result of this.")}},
lH:{
"^":"c1;"},
o4:{
"^":"j;"},
pB:{
"^":"j;a,b,c,d",
jK:function(a){var z,y,x,w,v,u,t
z=[]
z.push(a)
for(y=this.a;z.length!==0;){x=C.e.gaw(z)
if(0>=z.length)return H.a(z,0)
z.pop()
if(x.b5())y.push(x)
else x.cb(z)}w=y.length
if(w>64){w="Area light geometry turned into "+w+" shapes; may be very inefficient."
$.A.$2(1,w)}this.b=0
for(w=this.c,v=0;v<y.length;++v){u=y[v].bL()
w.push(u)
t=this.b
if(typeof t!=="number")return t.i()
if(typeof u!=="number")return H.c(u)
this.b=t+u}this.d=G.f8(w,w.length)},
static:{pC:function(a){var z=new G.pB([],null,[],null)
z.jK(a)
return z}}},
b1:{
"^":"j;"},
c4:{
"^":"j;B:a>",
A:function(a,b){var z,y,x,w
if(b==null)return!1
for(z=this.a,y=z.length,x=J.z(b),w=0;w<16;++w){if(w>=y)return H.a(z,w)
if(z[w]!==J.e(x.gB(b),w))return!1}return!0},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c
return c},
nf:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0
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
E:function(a){var z,y,x
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=H.l(z[0])+" "
if(1>=y)return H.a(z,1)
x=x+H.l(z[1])+" "
if(2>=y)return H.a(z,2)
x=x+H.l(z[2])+" "
if(3>=y)return H.a(z,3)
x=x+H.l(z[3])+" "
if(4>=y)return H.a(z,4)
x=x+H.l(z[4])+" "
if(5>=y)return H.a(z,5)
x=x+H.l(z[5])+" "
if(6>=y)return H.a(z,6)
x=x+H.l(z[6])+" "
if(7>=y)return H.a(z,7)
x=x+H.l(z[7])+" "
if(8>=y)return H.a(z,8)
x=x+H.l(z[8])+" "
if(9>=y)return H.a(z,9)
x=x+H.l(z[9])+" "
if(10>=y)return H.a(z,10)
x=x+H.l(z[10])+" "
if(11>=y)return H.a(z,11)
x=x+H.l(z[11])+" "
if(12>=y)return H.a(z,12)
x=x+H.l(z[12])+" "
if(13>=y)return H.a(z,13)
x=x+H.l(z[13])+" "
if(14>=y)return H.a(z,14)
x=x+H.l(z[14])+" "
if(15>=y)return H.a(z,15)
return x+H.l(z[15])},
jx:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
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
jw:function(){var z,y
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
static:{fO:function(){var z=new G.c4(new Float32Array(H.i(16)))
z.jw()
return z},cA:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z=new G.c4(new Float32Array(H.i(16)))
z.jx(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p)
return z},jk:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=G.fO()
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
od:{
"^":"j;a,b,c,d,D:e>,C:f>,r",
bD:function(a,b,c){var z,y
z=this.d
if(a>>>0!==a||a>=z.length)return H.a(z,a)
y=z[a]
switch(this.c){case 0:z=y.a
if(typeof z!=="number")return H.c(z)
b=C.a.R(b,z)
z=y.b
if(typeof z!=="number")return H.c(z)
c=C.a.R(c,z)
break
case 2:b=C.a.v(b,0,J.m(y.a,1))
c=C.a.v(c,0,J.m(y.b,1))
break
case 1:if(b>=0){z=y.a
if(typeof z!=="number")return H.c(z)
if(!(b>=z))if(c>=0){z=y.b
if(typeof z!=="number")return H.c(z)
z=c>=z}else z=!0
else z=!0}else z=!0
if(z)return G.F(0)
break}z=y.a
if(typeof z!=="number")return H.c(z)
return y.h(0,c*z+b)},
nk:function(a,b,c){var z,y,x,w,v,u
z=this.r
if(typeof z!=="number")return z.p()
y=Math.log(H.T(P.O(c,1e-8)))
x=$.$get$eF()
if(typeof x!=="number")return H.c(x)
w=z-1+y*x
if(w<0)return this.cd(0,a,b)
else{z=this.r
if(typeof z!=="number")return z.p();--z
if(w>=z)return this.bD(z,0,0)
else{v=C.b.F(Math.floor(w))
u=w-v
return J.b(J.h(this.cd(v,a,b),1-u),J.h(this.cd(v+1,a,b),u))}}},
cd:function(a,b,c){var z,y,x,w,v,u,t,s
z=this.r
if(typeof z!=="number")return z.p()
a=C.a.v(a,0,z-1)
z=this.d
if(a>>>0!==a||a>=z.length)return H.a(z,a)
b=J.m(J.h(b,z[a].a),0.5)
z=this.d
if(a>=z.length)return H.a(z,a)
c=J.m(J.h(c,z[a].b),0.5)
y=J.Y(b)
x=J.Y(c)
w=b-y
v=c-x
z=1-w
u=1-v
t=x+1
s=y+1
return J.b(J.b(J.b(J.h(this.bD(a,y,x),z*u),J.h(this.bD(a,y,t),z*v)),J.h(this.bD(a,s,x),w*u)),J.h(this.bD(a,s,t),w*v))},
hC:function(a,b){var z,y,x,w,v,u,t,s
z=H.p(Array(b),[G.kK])
for(y=z.length,x=0;x<b;++x){w=new G.kK(null,[0,0,0,0])
if(x>=y)return H.a(z,x)
z[x]=w
if(typeof a!=="number")return H.c(a)
v=(x+0.5)*a/b
w.a=C.b.F(Math.floor(v-2+0.5))
for(u=0;u<4;++u){w=z[x]
t=w.a
if(typeof t!=="number")return t.i()
w.b[u]=G.o3((t+u+0.5-v)/2,2)}w=z[x]
t=w.b
s=1/(t[0]+t[1]+t[2]+t[3])
for(u=0;u<4;++u){t=w.b
t[u]=t[u]*s}}return z},
jv:function(a1,a2,a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=J.z(a1)
y=z.gD(a1)
x=z.gC(a1)
w=J.u(y)
if(w.L(y,w.p(y,1))===0){v=J.u(x)
v=v.L(x,v.p(x,1))!==0}else v=!0
if(v){u=G.b4(y)
t=G.b4(x)
if(J.bx(a2)){v="Resizing Image "+H.l(a2)+" to "+u+" "+t
$.A.$2(0,v)}s=this.hC(y,u)
r=G.cI(u,t,a1.gbG())
q=J.k(a1.gbG(),1)?0:G.F(0)
if(typeof x!=="number")return H.c(x)
v=this.c
p=v===2
v=v===0
o=s.length
n=0
m=0
for(;n<x;++n)for(l=n*u,k=0;k<u;++k,++m){r.k(0,m,q)
for(j=l+k,i=0;i<4;++i){if(k>=o)return H.a(s,k)
h=s[k].a
if(typeof h!=="number")return h.i()
g=h+i
if(v){if(typeof y!=="number")return H.c(y)
g=C.a.R(g,y)}else if(p)g=C.a.v(g,0,w.p(y,1))
if(g>=0){if(typeof y!=="number")return H.c(y)
h=g<y}else h=!1
if(h){if(typeof y!=="number")return H.c(y)
f=J.h(z.h(a1,n*y+g),s[k].b[i])
r.k(0,j,J.b(r.h(0,j),f))}}}e=this.hC(x,t)
d=Array(t)
for(z=e.length,w=x-1,k=0;k<u;++k){for(n=0;n<t;++n){d[n]=J.k(a1.gbG(),3)?G.F(0):0
for(i=0;i<4;++i){if(n>=z)return H.a(e,n)
o=e[n].a
if(typeof o!=="number")return o.i()
c=o+i
if(v)c=C.a.R(c,x)
else if(p)c=C.a.v(c,0,w)
if(c>=0&&c<x){f=J.h(r.h(0,c*u+k),e[n].b[i])
d[n]=J.b(d[n],f)}}}for(n=0;n<t;++n)r.k(0,n*u+k,J.P(d[n],0,1/0))}a1.iO(r)
x=t
y=u}this.e=y
this.f=x
z=Math.log(H.T(P.O(y,x)))
w=$.$get$eF()
if(typeof w!=="number")return H.c(w)
w=1+C.d.F(z*w)
this.r=w
this.d=H.p(Array(w),[G.bJ])
z=J.y(a2)
if(z.gbe(a2)){w=this.r
if(typeof w!=="number")return w.T()
w=w>1}else w=!1
if(w){w=H.l(a2)+": Generating "+H.l(this.r)+" MIPMap Levels"
$.A.$2(0,w)}w=this.d
v=G.hp(a1)
if(0>=w.length)return H.a(w,0)
w[0]=v
b=1
while(!0){w=this.r
if(typeof w!=="number")return H.c(w)
if(!(b<w))break
w=this.d
v=b-1
if(v>=w.length)return H.a(w,v)
a=P.O(1,J.av(w[v].a,2))
w=this.d
if(v>=w.length)return H.a(w,v)
a0=P.O(1,J.av(w[v].b,2))
w=this.d
p=a1.gbG()
if(typeof p!=="number")return H.c(p)
o=a*a0*p
if(typeof o!=="number"||Math.floor(o)!==o)H.K(P.ak("Invalid length "+H.l(o)))
o=new Float32Array(o)
if(b>=w.length)return H.a(w,b)
w[b]=new G.bJ(a,a0,p,o)
for(n=0,m=0;n<a0;++n)for(w=2*n,p=w+1,k=0;k<a;++k,++m){o=this.d
if(b>=o.length)return H.a(o,b)
l=2*k
j=l+1
o[b].k(0,m,J.h(J.b(J.b(J.b(this.bD(v,l,w),this.bD(v,j,w)),this.bD(v,l,p)),this.bD(v,j,p)),0.25))}++b}if($.fM==null){$.fM=new Float32Array(H.i(128))
for(b=0;b<128;++b){w=$.fM
v=Math.exp(-2*(b/127))
w[b]=v-Math.exp(-2)}}if(z.gbe(a2)){z=this.r
if(typeof z!=="number")return z.T()
z=z>1}else z=!1
if(z){z="Finished generating MIPMap for "+H.l(a2)
$.A.$2(0,z)}},
static:{dQ:function(a,b,c,d,e,f,g){var z=b===!0?J.b(a,"_TRI:"+H.l(b)):a
if(!J.k(d,8))z=J.b(z,"_ANI:"+H.l(d))
if(g!==0)z=J.b(z,"_WRAP:"+g)
if(typeof e==="number"&&e!==1)z=J.b(z,"_SCALE:"+H.l(e))
if(e instanceof G.bI&&!e.nh(1))z=J.b(z,"_SCALE:"+H.l(e))
if(!J.k(c,1))z=J.b(z,"_GAMMA:"+H.l(c))
return!f?J.b(z,"_SPECTRUM:false"):z},cy:function(a,b,c,d,e){var z=new G.od(c,d,e,null,null,null,null)
z.jv(a,b,c,d,e)
return z}}},
kK:{
"^":"j;a,b"},
me:{
"^":"j;a,b,c,d",
j6:function(a,b){var z,y,x,w,v,u
z=new Float32Array(H.i(this.d))
this.a=z
C.B.bi(z,0,this.d,a)
z=H.i(J.b(this.d,1))
y=new Float32Array(z)
this.b=y
if(0>=z)return H.a(y,0)
y[0]=0
x=1
while(!0){z=J.b(this.d,1)
if(typeof z!=="number")return H.c(z)
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
if(typeof u!=="number")return H.c(u)
if(x>=w)return H.a(z,x)
z[x]=v+y/u;++x}z=this.b
y=this.d
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z=z[y]
this.c=z
if(z===0){z=y
x=1
while(!0){z=J.b(z,1)
if(typeof z!=="number")return H.c(z)
if(!(x<z))break
z=this.b
y=this.d
if(typeof y!=="number")return H.c(y)
if(x>=z.length)return H.a(z,x)
z[x]=x/y;++x
z=y}}else{x=1
while(!0){z=J.b(this.d,1)
if(typeof z!=="number")return H.c(z)
if(!(x<z))break
z=this.b
if(x>=z.length)return H.a(z,x)
y=z[x]
w=this.c
if(typeof w!=="number")return H.c(w)
z[x]=y/w;++x}}},
static:{f8:function(a,b){var z=new G.me(null,null,null,b)
z.j6(a,b)
return z}}},
mf:{
"^":"j;a,b",
j7:function(a,b,c){var z,y,x,w,v,u
if(typeof c!=="number")return H.c(c)
z=a.length
y=this.a
x=0
for(;x<c;++x){if(typeof b!=="number")return H.c(b)
w=x*b
y.push(G.f8(new Float32Array(a.subarray(w,C.B.bl(a,w,w+b,z))),b))}z=H.i(c)
v=new Float32Array(z)
for(w=y.length,x=0;x<c;++x){if(x>=w)return H.a(y,x)
u=y[x].c
if(x>=z)return H.a(v,x)
v[x]=u}this.b=G.f8(v,c)},
static:{mg:function(a,b,c){var z=new G.mf([],null)
z.j7(a,b,c)
return z}}},
b9:{
"^":"ac;a",
q:function(a,b){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof b!=="number")return H.c(b)
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
y=new G.b9(new Float32Array(H.i(3)))
y.G(x*b,w*b,z*b)
return y},
au:function(a,b){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof b!=="number")return H.c(b)
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
y=new G.b9(new Float32Array(H.i(3)))
y.G(x/b,w/b,z/b)
return y},
i:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.z(b)
v=w.gM(b)
if(typeof v!=="number")return H.c(v)
if(1>=y)return H.a(z,1)
u=z[1]
t=w.gK(b)
if(typeof t!=="number")return H.c(t)
if(2>=y)return H.a(z,2)
z=z[2]
w=w.gao(b)
if(typeof w!=="number")return H.c(w)
y=new G.b9(new Float32Array(H.i(3)))
y.G(x+v,u+t,z+w)
return y},
p:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.z(b)
v=w.gM(b)
if(typeof v!=="number")return H.c(v)
if(1>=y)return H.a(z,1)
u=z[1]
t=w.gK(b)
if(typeof t!=="number")return H.c(t)
if(2>=y)return H.a(z,2)
z=z[2]
w=w.gao(b)
if(typeof w!=="number")return H.c(w)
y=new G.b9(new Float32Array(H.i(3)))
y.G(x-v,u-t,z-w)
return y},
aa:function(a){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
y=new G.b9(new Float32Array(H.i(3)))
y.G(-x,-w,-z)
return y}},
c6:{
"^":"j;D:a>,C:b>,fz:c<,fB:d<,dW:e<,n5:f<,ea:r<",
nP:function(a){var z,y,x,w,v,u,t,s,r,q
z=U.aZ(this.a,this.b,4)
y=z.x.buffer
x=(y&&C.f).a0(y,0,null)
y=this.r
w=J.y(y)
v=w.gm(y)
if(typeof v!=="number")return H.c(v)
u=x.length
t=0
s=0
for(;t<v;t+=3,s+=4){r=C.a.v(J.Y(J.h(w.h(y,t),255)),0,255)
if(s>=u)return H.a(x,s)
x[s]=r
r=s+1
q=C.a.v(J.Y(J.h(w.h(y,t+1),255)),0,255)
if(r>=u)return H.a(x,r)
x[r]=q
q=s+2
r=C.a.v(J.Y(J.h(w.h(y,t+2),255)),0,255)
if(q>=u)return H.a(x,q)
x[q]=r
r=s+3
if(r>=u)return H.a(x,r)
x[r]=255}return U.tw(z,null,null,null,null,null,1/a,null,null,null,null)},
jz:function(a,b,c,d,e,f,g){if(this.e==null)this.e=c
if(this.f==null)this.f=d},
static:{h0:function(a,b,c,d,e,f,g){var z=new G.c6(c,d,a,b,e,f,g!=null?g:new Float32Array(H.i(J.h(J.h(c,d),3))))
z.jz(a,b,c,d,e,f,g)
return z}}},
q:{
"^":"j;a,b,c,d,e,f,r,x,y",
hW:function(a,b){a=J.dF(a)
this.mM(a)
C.e.a4(this.c,new G.cC(a,b,!1))},
f0:function(a,b){a=J.dF(a)
this.mN(a)
C.e.a4(this.b,new G.cC(a,b,!1))},
f1:function(a,b){var z,y,x,w,v,u,t,s,r
a=J.dF(a)
this.mP(a)
z=J.y(b)
y=z.h(b,0)
if(typeof y==="number"){x=J.av(z.gm(b),3)
if(typeof x!=="number")return H.c(x)
w=Array(x)
w.fixed$length=Array
w.$builtinTypeInfo=[G.t]
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
w[v]=new G.t(r)}C.e.a4(this.d,new G.cC(a,w,!1))}else if(z.h(b,0) instanceof G.t)C.e.a4(this.d,new G.cC(a,b,!1))},
hX:function(a,b){var z,y,x,w,v,u,t,s,r
a=J.dF(a)
this.mO(a)
z=J.y(b)
if(z.h(b,0) instanceof G.b9)C.e.a4(this.f,new G.cC(a,b,!1))
else{y=z.h(b,0)
if(typeof y==="number"){x=J.av(z.gm(b),3)
if(typeof x!=="number")return H.c(x)
w=Array(x)
w.fixed$length=Array
w.$builtinTypeInfo=[G.b9]
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
w[v]=new G.b9(r)}C.e.a4(this.f,new G.cC(a,w,!1))}}},
mN:function(a){var z,y
for(z=this.b,y=0;y<z.length;++y)if(J.k(J.aw(z[y]),a)){C.e.e6(z,y)
return!0}return!1},
mM:function(a){var z,y
for(z=this.c,y=0;y<z.length;++y)if(J.k(J.aw(z[y]),a)){C.e.e6(z,y)
return!0}return!1},
mP:function(a){var z,y
for(z=this.d,y=0;y<z.length;++y)if(J.k(J.aw(z[y]),a)){C.e.e6(z,y)
return!0}return!1},
mO:function(a){var z,y
for(z=this.f,y=0;y<z.length;++y)if(J.k(J.aw(z[y]),a)){C.e.e6(z,y)
return!0}return!1},
j:function(a,b){var z,y,x
a=a.toLowerCase()
for(z=this.c,y=0;y<z.length;++y){if(J.k(J.aw(z[y]),a)){if(y>=z.length)return H.a(z,y)
x=J.k(J.M(J.L(z[y])),1)}else x=!1
if(x){if(y>=z.length)return H.a(z,y)
z[y].saM(!0)
if(y>=z.length)return H.a(z,y)
return J.e(J.L(z[y]),0)}}return b},
N:function(a,b){var z,y,x
a=a.toLowerCase()
for(z=this.b,y=0;y<z.length;++y){if(J.k(J.aw(z[y]),a)){if(y>=z.length)return H.a(z,y)
x=J.k(J.M(J.L(z[y])),1)}else x=!1
if(x){if(y>=z.length)return H.a(z,y)
z[y].saM(!0)
if(y>=z.length)return H.a(z,y)
return J.e(J.L(z[y]),0)}}return b},
bC:function(a,b){var z,y,x
a=a.toLowerCase()
for(z=this.a,y=0;y<z.length;++y){if(J.k(J.aw(z[y]),a)){if(y>=z.length)return H.a(z,y)
x=J.k(J.M(J.L(z[y])),1)}else x=!1
if(x){if(y>=z.length)return H.a(z,y)
z[y].saM(!0)
if(y>=z.length)return H.a(z,y)
return J.e(J.L(z[y]),0)}}return b},
aU:function(a,b){var z,y,x
a=a.toLowerCase()
for(z=this.d,y=0;y<z.length;++y){if(J.k(J.aw(z[y]),a)){if(y>=z.length)return H.a(z,y)
x=J.k(J.M(J.L(z[y])),1)}else x=!1
if(x){if(y>=z.length)return H.a(z,y)
z[y].saM(!0)
if(y>=z.length)return H.a(z,y)
return J.e(J.L(z[y]),0)}}return b},
a2:function(a,b){var z,y,x
a=a.toLowerCase()
for(z=this.e,y=0;y<z.length;++y){if(J.k(J.aw(z[y]),a)){if(y>=z.length)return H.a(z,y)
x=J.k(J.M(J.L(z[y])),1)}else x=!1
if(x){if(y>=z.length)return H.a(z,y)
z[y].saM(!0)
if(y>=z.length)return H.a(z,y)
return J.e(J.L(z[y]),0)}}return b},
a1:function(a,b){var z,y
a=a.toLowerCase()
for(z=this.r,y=0;y<z.length;++y)if(J.k(J.aw(z[y]),a)){if(y>=z.length)return H.a(z,y)
z[y].saM(!0)
if(y>=z.length)return H.a(z,y)
if(J.L(z[y])==null)return b
if(y>=z.length)return H.a(z,y)
if(J.k(J.M(J.L(z[y])),1)){if(y>=z.length)return H.a(z,y)
z[y].saM(!0)
if(y>=z.length)return H.a(z,y)
return J.e(J.L(z[y]),0)}}return b},
aV:function(a,b){var z,y,x
a=a.toLowerCase()
for(z=this.x,y=0;y<z.length;++y){if(J.k(J.aw(z[y]),a)){if(y>=z.length)return H.a(z,y)
x=J.k(J.M(J.L(z[y])),1)}else x=!1
if(x){if(y>=z.length)return H.a(z,y)
z[y].saM(!0)
if(y>=z.length)return H.a(z,y)
return J.e(J.L(z[y]),0)}}return b},
bd:function(a,b){var z=this.aV(a.toLowerCase(),"")
if(J.k(z,""))return b
return z},
mU:function(a){var z,y,x
a=a.toLowerCase()
for(z=this.y,y=0;y<z.length;++y){if(J.k(J.aw(z[y]),a)){if(y>=z.length)return H.a(z,y)
x=J.k(J.M(J.L(z[y])),1)}else x=!1
if(x){if(y>=z.length)return H.a(z,y)
z[y].saM(!0)
if(y>=z.length)return H.a(z,y)
return J.e(J.L(z[y]),0)}}return""},
bc:function(a){var z,y
a=a.toLowerCase()
for(z=this.c,y=0;y<z.length;++y)if(J.k(J.aw(z[y]),a)){if(y>=z.length)return H.a(z,y)
z[y].saM(!0)
if(y>=z.length)return H.a(z,y)
return J.L(z[y])}return},
i9:function(a){var z,y
a=a.toLowerCase()
for(z=this.b,y=0;y<z.length;++y)if(J.k(J.aw(z[y]),a)){if(y>=z.length)return H.a(z,y)
z[y].saM(!0)
if(y>=z.length)return H.a(z,y)
return J.L(z[y])}return},
fd:function(a){var z,y
a=a.toLowerCase()
for(z=this.d,y=0;y<z.length;++y)if(J.k(J.aw(z[y]),a)){if(y>=z.length)return H.a(z,y)
z[y].saM(!0)
if(y>=z.length)return H.a(z,y)
return J.L(z[y])}return},
mV:function(a){var z,y
a=a.toLowerCase()
for(z=this.e,y=0;y<z.length;++y)if(J.k(J.aw(z[y]),a)){if(y>=z.length)return H.a(z,y)
z[y].saM(!0)
if(y>=z.length)return H.a(z,y)
return J.L(z[y])}return},
mS:function(a){var z,y
a=a.toLowerCase()
for(z=this.f,y=0;y<z.length;++y)if(J.k(J.aw(z[y]),a)){if(y>=z.length)return H.a(z,y)
z[y].saM(!0)
if(y>=z.length)return H.a(z,y)
return J.L(z[y])}return},
mT:function(a){var z,y
a=a.toLowerCase()
for(z=this.x,y=0;y<z.length;++y)if(J.k(J.aw(z[y]),a)){if(y>=z.length)return H.a(z,y)
z[y].saM(!0)
if(y>=z.length)return H.a(z,y)
return J.L(z[y])}return},
E:function(a){var z,y,x,w,v,u,t,s
for(z=this.a,y=z.length,x="",w=0;w<z.length;z.length===y||(0,H.aA)(z),++w){v=z[w]
u=J.z(v)
x+="\"bool "+H.l(u.gZ(v))+"\" ["
t=0
while(!0){s=J.M(u.gB(v))
if(typeof s!=="number")return H.c(s)
if(!(t<s))break
if(t!==0)x+=" "
x+=J.e(u.gB(v),t)===!0?1:0;++t}x+="] "}for(z=this.b,y=z.length,w=0;w<z.length;z.length===y||(0,H.aA)(z),++w)x+=this.cv("integer",z[w])
for(z=this.c,y=z.length,w=0;w<z.length;z.length===y||(0,H.aA)(z),++w)x+=this.cv("float",z[w])
for(z=this.d,y=z.length,w=0;w<z.length;z.length===y||(0,H.aA)(z),++w)x+=this.cv("point",z[w])
for(z=this.e,y=z.length,w=0;w<z.length;z.length===y||(0,H.aA)(z),++w)x+=this.cv("vector",z[w])
for(z=this.f,y=z.length,w=0;w<z.length;z.length===y||(0,H.aA)(z),++w)x+=this.cv("normals",z[w])
for(z=this.r,y=z.length,w=0;w<z.length;z.length===y||(0,H.aA)(z),++w)x+=this.cv("color",z[w])
for(z=this.x,y=z.length,w=0;w<z.length;z.length===y||(0,H.aA)(z),++w){v=z[w]
u=J.z(v)
x+="\"string "+H.l(u.gZ(v))+"\" ["
t=0
while(!0){s=J.M(u.gB(v))
if(typeof s!=="number")return H.c(s)
if(!(t<s))break
if(t!==0)x+=" "
x+="\""+H.l(J.e(u.gB(v),t))+"\"";++t}x+="] "}for(z=this.y,y=z.length,w=0;w<z.length;z.length===y||(0,H.aA)(z),++w){v=z[w]
u=J.z(v)
x+="\"texture "+H.l(u.gZ(v))+"\" ["
t=0
while(!0){s=J.M(u.gB(v))
if(typeof s!=="number")return H.c(s)
if(!(t<s))break
if(t!==0)x+=" "
x+="\""+H.l(J.e(u.gB(v),t))+"\"";++t}x+="] "}return x},
cv:function(a,b){var z,y,x,w
z=J.z(b)
y="\""+a+" "+H.l(z.gZ(b))+"\" ["
x=0
while(!0){w=J.M(z.gB(b))
if(typeof w!=="number")return H.c(w)
if(!(x<w))break
if(x!==0)y+=" "
y+=H.l(J.e(z.gB(b),x));++x}return y+"] "}},
cC:{
"^":"j;Z:a>,B:b>,aM:c?"},
aK:{
"^":"j;D:c>,C:d>",
bs:["eh",function(a,b,c,d){this.a=a
this.b=b
this.c=c
this.d=d}]},
t:{
"^":"ac;a",
q:function(a,b){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof b!=="number")return H.c(b)
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
y=new G.t(new Float32Array(H.i(3)))
y.G(x*b,w*b,z*b)
return y},
au:function(a,b){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof b!=="number")return H.c(b)
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
y=new G.t(new Float32Array(H.i(3)))
y.G(x/b,w/b,z/b)
return y},
i:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.z(b)
v=J.e(w.gB(b),0)
if(typeof v!=="number")return H.c(v)
if(1>=y)return H.a(z,1)
u=z[1]
t=J.e(w.gB(b),1)
if(typeof t!=="number")return H.c(t)
if(2>=y)return H.a(z,2)
z=z[2]
w=J.e(w.gB(b),2)
if(typeof w!=="number")return H.c(w)
y=new G.t(new Float32Array(H.i(3)))
y.G(x+v,u+t,z+w)
return y},
p:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.z(b)
v=J.e(w.gB(b),0)
if(typeof v!=="number")return H.c(v)
if(1>=y)return H.a(z,1)
u=z[1]
t=J.e(w.gB(b),1)
if(typeof t!=="number")return H.c(t)
if(2>=y)return H.a(z,2)
z=z[2]
w=J.e(w.gB(b),2)
if(typeof w!=="number")return H.c(w)
y=new G.t(new Float32Array(H.i(3)))
y.G(x-v,u-t,z-w)
return y}},
br:{
"^":"j;",
b5:function(){return!0},
cb:function(a){$.A.$2(3,"Unimplemented Primitive.refine() method called!")},
dV:function(a){var z,y,x
z=[]
z.push(this)
for(y=J.as(a);z.length!==0;){x=C.e.gaw(z)
if(0>=z.length)return H.a(z,0)
z.pop()
if(x.b5())y.a4(a,x)
else x.cb(z)}}},
dG:{
"^":"br;"},
jD:{
"^":"aM;",
fK:function(a,b,c,d,e,f,g,h){var z,y,x,w
z=G.ee(h.a,h.b,1)
y=J.y(c)
x=J.m(y.h(c,1),y.h(c,0))
if(typeof x!=="number")return H.c(x)
w=J.m(y.h(c,2),y.h(c,3))
if(typeof w!=="number")return H.c(w)
y=z.q(0,G.ee(1/x,1/w,1)).q(0,G.ef(G.a5(-J.is(y.h(c,0)),-J.is(y.h(c,3)),0)))
this.r=y
this.x=G.a1(y.b,y.a)
y=this.e
this.f=G.a1(y.b,y.a).q(0,this.x)}},
yr:{
"^":"j;"},
yu:{
"^":"j;"},
it:{
"^":"j;"},
wu:{
"^":"j;"},
nw:{
"^":"j;e3:a>,aD:b<"},
po:{
"^":"j;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
nQ:function(){var z=P.Z()
if(this.a)z.k(0,"quickRender",!0)
z.k(0,"resolutionScale",this.b)
z.k(0,"samplingMode",this.c)
return z},
static:{pp:function(){var z=$.e7
if(z!=null)return z.a
return!1},jJ:function(){var z=$.e7
if(z!=null)return z.b
return 1},bh:function(){var z=$.e7
if(z!=null)return z.c
return 0}}},
pt:{
"^":"j;",
dg:function(a,b,c){var z,y,x
if(c!=null)this.b.push(c)
z=this.c
if(z.X(a)){if(!!J.B(z.h(0,a)).$isaO)return z.h(0,a)
y=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[null])),[null])
y.aA(0,z.h(0,a))
return y.a}y=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[null])),[null])
x=y.a
z.k(0,a,x)
this.ig(a).at(new G.pu(this,a,b,y))
return x},
e7:function(a,b){var z,y,x,w
this.b.push(b)
z=this.c
if(z.X(a)){if(!!J.B(z.h(0,a)).$isaO)return z.h(0,a)
y=z.h(0,a)
x=H.ck(y,"$isw",[P.o],"$asw")
if(x)this.h4(a,z.h(0,a))
w=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[[P.w,P.o]])),[[P.w,P.o]])
w.aA(0,z.h(0,a))
return w.a}y="LOADING "+H.l(a)
$.A.$2(4,y)
w=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[G.bJ])),[G.bJ])
y=w.a
z.k(0,a,y)
this.ig(a).at(new G.pv(this,a,w))
return y},
h4:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=U.tU(b)
if(z==null){this.c.k(0,a,null)
return}y=z.i8(b)
x=y.a
if(x.gY(x))w=0
else{w=x.gb1(x)
w=J.cZ(w.gac(w))}if(x.gY(x))v=0
else{v=x.gb1(x)
v=J.cY(v.gac(v))}u=G.cI(w,v,3)
t=0
s=0
while(!0){if(x.gY(x))w=0
else{w=x.gb1(x)
w=J.cY(w.gac(w))}if(typeof w!=="number")return H.c(w)
if(!(s<w))break
r=0
while(!0){if(x.gY(x))w=0
else{w=x.gb1(x)
w=J.cZ(w.gac(w))}if(typeof w!=="number")return H.c(w)
if(!(r<w))break
w=y.b
q=w!=null?w.bS(r,s):0
w=y.c
p=w!=null?w.bS(r,s):0
w=y.d
o=w!=null?w.bS(r,s):0
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
t=n}++s}x="IMAGE LOADED "+H.l(a)
$.A.$2(4,x)
this.c.k(0,a,u)
return u},
dn:function(a){var z=this.e
if(z.X(a))return z.h(0,a)
return},
kt:function(a,b){var z,y,x
try{if(J.dC(a,".gz"))b=new T.mO().bp(T.b_(b,0,null,0),!1)
else if(J.dC(a,".z"))b=new T.cc().bp(T.b_(b,1,null,0),!1)
else if(J.dC(a,".bz2"))b=new T.lN(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,-1,0,0,null,null,null,null,null,0,null).bp(T.b_(b,1,null,0),!1)}catch(y){x=H.ad(y)
z=x
x="EXCEPTION "+H.l(z)
$.A.$2(4,x)}return b},
lb:function(a){var z=this.d
if(z.X(a))if(z.h(0,a)===!0)return!1
return J.bw(a).dT(a,".gz")||C.c.dT(a,".z")||C.c.dT(a,".bz2")}},
pu:{
"^":"r:0;a,b,c,d",
$1:function(a){var z,y
if(a==null){this.d.aA(0,null)
return}if(this.c&&this.a.lb(this.b)){z=this.a
y=this.b
a=z.kt(y,a)
z.d.k(0,y,!0)}this.a.c.k(0,this.b,a)
this.d.aA(0,a)}},
pv:{
"^":"r:0;a,b,c",
$1:function(a){var z
if(a==null){z="UNABLE TO LOAD "+H.l(this.b)
$.A.$2(0,z)
this.c.aA(0,null)
return}this.c.aA(0,this.a.h4(this.b,a))}},
b3:{
"^":"bI;a",
bU:function(a,b,c){var z,y,x,w,v,u,t,s
if(!G.jU(a))G.jS(a,b,c)
for(z=0,y=0,x=0,w=0,v=0;v<471;++v){w+=C.a0[v]
u=G.pG(a,b,C.N[v],c)
t=J.G(u)
s=t.q(u,C.aD[v])
if(typeof s!=="number")return H.c(s)
z+=s
s=t.q(u,C.a0[v])
if(typeof s!=="number")return H.c(s)
y+=s
t=t.q(u,C.aj[v])
if(typeof t!=="number")return H.c(t)
x+=t}G.jV(z/w,y/w,x/w,this.a)
return this},
ds:function(a,b){return this.bU(a,b,0)},
ec:function(){return this},
bT:function(a,b,c,d){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=a
if(1>=y)return H.a(z,1)
z[1]=b
if(2>=y)return H.a(z,2)
z[2]=c
return this},
cP:function(a,b,c){return this.bT(a,b,c,0)},
i:function(a,b){var z,y,x,w,v,u
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.e(b.gan(),0)
if(typeof w!=="number")return H.c(w)
if(1>=y)return H.a(z,1)
v=z[1]
u=J.e(b.gan(),1)
if(typeof u!=="number")return H.c(u)
if(2>=y)return H.a(z,2)
z=z[2]
y=J.e(b.gan(),2)
if(typeof y!=="number")return H.c(y)
return G.bt(x+w,v+u,z+y)},
p:function(a,b){var z,y,x,w,v,u
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.e(b.gan(),0)
if(typeof w!=="number")return H.c(w)
if(1>=y)return H.a(z,1)
v=z[1]
u=J.e(b.gan(),1)
if(typeof u!=="number")return H.c(u)
if(2>=y)return H.a(z,2)
z=z[2]
y=J.e(b.gan(),2)
if(typeof y!=="number")return H.c(y)
return G.bt(x-w,v-u,z-y)},
q:function(a,b){var z,y,x,w,v,u,t,s
if(typeof b==="number"){z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return G.bt(x*b,w*b,z[2]*b)}if(b instanceof G.b3){z=this.a
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
return G.bt(x*u,t*s,z*w[2])}$.A.$2(3,"RGBSpectrum or double expected.")
z=new G.b3(new Float32Array(H.i(3)))
z.U(3,0)
return z},
au:function(a,b){var z,y,x,w,v,u,t,s
if(typeof b==="number"){z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return G.bt(x/b,w/b,z[2]/b)}if(b instanceof G.b3){z=this.a
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
return G.bt(x/u,t/s,z/w[2])}$.A.$2(3,"RGBSpectrum or double expected.")
z=new G.b3(new Float32Array(H.i(3)))
z.U(3,0)
return z},
aa:function(a){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return G.bt(-x,-w,-z[2])},
fk:function(){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return 0.212671*x+0.71516*w+0.072169*z[2]},
v:function(a,b,c){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=C.b.v(z[0],b,c)
if(1>=y)return H.a(z,1)
w=C.b.v(z[1],b,c)
if(2>=y)return H.a(z,2)
return G.bt(x,w,C.b.v(z[2],b,c))},
E:function(a){var z,y,x
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=H.l(z[0])+" "
if(1>=y)return H.a(z,1)
x=x+H.l(z[1])+" "
if(2>=y)return H.a(z,2)
return x+H.l(z[2])},
jF:function(a,b,c){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=a
if(1>=y)return H.a(z,1)
z[1]=b
if(2>=y)return H.a(z,2)
z[2]=c},
jE:function(a){var z,y,x,w,v
z=J.B(a)
if(!!z.$isb3){z=this.a
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
z[2]=y}else if(!!z.$isb5){z=a.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
G.jV(x,w,z[2],this.a)}else if(!!z.$isa4){z=this.a
y=a.ec().a
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
static:{p5:function(a){var z=new G.b3(new Float32Array(H.i(3)))
z.U(3,a)
return z},bt:function(a,b,c){var z=new G.b3(new Float32Array(H.i(3)))
z.U(3,0)
z.jF(a,b,c)
return z},e5:function(a){var z=new G.b3(new Float32Array(H.i(3)))
z.U(3,0)
z.jE(a)
return z}}},
hh:{
"^":"j;a"},
a4:{
"^":"bI;a",
bU:function(a,b,c){var z,y,x,w,v,u
if(!G.jU(a))G.jS(a,b,c)
for(z=this.a,y=z.length,x=0;x<4;x=v){w=x/4
v=x+1
u=v/4
u=G.ax(a,b,400*(1-w)+700*w,400*(1-u)+700*u,c)
if(x>=y)return H.a(z,x)
z[x]=u}return this},
ds:function(a,b){return this.bU(a,b,0)},
i:function(a,b){var z,y,x,w,v,u,t,s
z=H.i(4)
y=new Float32Array(z)
x=new G.a4(y)
x.U(4,0)
for(w=this.a,v=w.length,u=0;u<4;++u){if(u>=v)return H.a(w,u)
t=w[u]
s=J.e(b.gan(),u)
if(typeof s!=="number")return H.c(s)
if(u>=z)return H.a(y,u)
y[u]=t+s}return x},
p:function(a,b){var z,y,x,w,v,u,t,s
z=H.i(4)
y=new Float32Array(z)
x=new G.a4(y)
x.U(4,0)
for(w=this.a,v=w.length,u=0;u<4;++u){if(u>=v)return H.a(w,u)
t=w[u]
s=J.e(b.gan(),u)
if(typeof s!=="number")return H.c(s)
if(u>=z)return H.a(y,u)
y[u]=t-s}return x},
q:function(a,b){var z,y,x,w,v,u,t,s,r,q
if(typeof b==="number"){z=H.i(4)
y=new Float32Array(z)
x=new G.a4(y)
x.U(4,0)
for(w=this.a,v=w.length,u=0;u<4;++u){if(u>=v)return H.a(w,u)
t=w[u]
if(u>=z)return H.a(y,u)
y[u]=t*b}return x}if(b instanceof G.a4){z=H.i(4)
y=new Float32Array(z)
x=new G.a4(y)
x.U(4,0)
for(w=this.a,v=w.length,t=b.a,s=t.length,u=0;u<4;++u){if(u>=v)return H.a(w,u)
r=w[u]
if(u>=s)return H.a(t,u)
q=t[u]
if(u>=z)return H.a(y,u)
y[u]=r*q}return x}$.A.$2(3,"SampledSpectrum or num expected.")
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
return z},
au:function(a,b){var z,y,x,w,v,u,t,s,r,q
if(typeof b==="number"){z=H.i(4)
y=new Float32Array(z)
x=new G.a4(y)
x.U(4,0)
for(w=this.a,v=w.length,u=0;u<4;++u){if(u>=v)return H.a(w,u)
t=w[u]
if(u>=z)return H.a(y,u)
y[u]=t/b}return x}if(b instanceof G.a4){z=H.i(4)
y=new Float32Array(z)
x=new G.a4(y)
x.U(4,0)
for(w=this.a,v=w.length,t=b.a,s=t.length,u=0;u<4;++u){if(u>=v)return H.a(w,u)
r=w[u]
if(u>=s)return H.a(t,u)
q=t[u]
if(u>=z)return H.a(y,u)
y[u]=r/q}return x}$.A.$2(3,"SampledSpectrum or double expected.")
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
return z},
bT:function(a,b,c,d){var z,y,x,w,v,u
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
if(d===0){y=J.u(a)
if(y.a6(a,b)&&y.a6(a,c)){z=z.i(0,$.$get$a9().d.q(0,a))
y=J.u(b)
x=J.u(c)
z=y.a6(b,c)?z.i(0,$.$get$a9().e.q(0,y.p(b,a))).i(0,$.$get$a9().z.q(0,x.p(c,b))):z.i(0,$.$get$a9().e.q(0,x.p(c,a))).i(0,$.$get$a9().y.q(0,y.p(b,c)))}else{x=J.u(b)
if(x.a6(b,a)&&x.a6(b,c)){z=z.i(0,$.$get$a9().d.q(0,b))
x=J.u(c)
z=y.a6(a,c)?z.i(0,$.$get$a9().f.q(0,y.p(a,b))).i(0,$.$get$a9().z.q(0,x.p(c,a))):z.i(0,$.$get$a9().f.q(0,x.p(c,b))).i(0,$.$get$a9().x.q(0,y.p(a,c)))}else{z=z.i(0,$.$get$a9().d.q(0,c))
z=y.a6(a,b)?z.i(0,$.$get$a9().r.q(0,y.p(a,c))).i(0,$.$get$a9().y.q(0,x.p(b,a))):z.i(0,$.$get$a9().r.q(0,x.p(b,c))).i(0,$.$get$a9().x.q(0,y.p(a,b)))}}z=z.q(0,0.94)}else{y=J.u(a)
if(y.a6(a,b)&&y.a6(a,c)){z=z.i(0,$.$get$a9().Q.q(0,a))
y=J.u(b)
x=J.u(c)
z=y.a6(b,c)?z.i(0,$.$get$a9().ch.q(0,y.p(b,a))).i(0,$.$get$a9().dy.q(0,x.p(c,b))):z.i(0,$.$get$a9().ch.q(0,x.p(c,a))).i(0,$.$get$a9().dx.q(0,y.p(b,c)))}else{x=J.u(b)
if(x.a6(b,a)&&x.a6(b,c)){z=z.i(0,$.$get$a9().Q.q(0,b))
x=J.u(c)
z=y.a6(a,c)?z.i(0,$.$get$a9().cx.q(0,y.p(a,b))).i(0,$.$get$a9().dy.q(0,x.p(c,a))):z.i(0,$.$get$a9().cx.q(0,x.p(c,b))).i(0,$.$get$a9().db.q(0,y.p(a,c)))}else{z=z.i(0,$.$get$a9().Q.q(0,c))
z=y.a6(a,b)?z.i(0,$.$get$a9().cy.q(0,y.p(a,c))).i(0,$.$get$a9().dx.q(0,x.p(b,a))):z.i(0,$.$get$a9().cy.q(0,x.p(b,c))).i(0,$.$get$a9().db.q(0,y.p(a,b)))}}z=z.q(0,0.86445)}y=this.a
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
cP:function(a,b,c){return this.bT(a,b,c,0)},
iB:function(){var z,y,x,w,v,u,t,s
z=H.i(3)
y=new Float32Array(z)
x=new G.b5(y)
x.U(3,0)
if(0>=z)return H.a(y,0)
y[0]=0
if(1>=z)return H.a(y,1)
y[1]=0
if(2>=z)return H.a(y,2)
y[2]=0
for(z=this.a,w=z.length,v=0;v<4;++v){u=y[0]
t=$.$get$a9()
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
fk:function(){var z,y,x,w,v
for(z=this.a,y=z.length,x=0,w=0;w<4;++w){v=$.$get$a9().b.a
if(w>=v.length)return H.a(v,w)
v=v[w]
if(w>=y)return H.a(z,w)
x+=v*z[w]}return x*300/427.42758},
ec:function(){return G.e5(this.iB())},
v:function(a,b,c){var z,y,x,w,v,u,t
z=H.i(4)
y=new Float32Array(z)
x=new G.a4(y)
x.U(4,0)
for(w=this.a,v=w.length,u=0;u<4;++u){if(u>=v)return H.a(w,u)
t=C.b.v(w[u],b,c)
if(u>=z)return H.a(y,u)
y[u]=t}return x},
jJ:function(a,b){var z,y,x,w,v,u
z=J.B(a)
if(!!z.$isa4)for(z=this.a,y=a.a,x=y.length,w=z.length,v=0;v<4;++v){if(v>=x)return H.a(y,v)
u=y[v]
if(v>=w)return H.a(z,v)
z[v]=u}else if(!!z.$isb3){z=a.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
this.bT(x,w,z[2],b)}else if(!!z.$isb5){z=G.e5(a).a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
this.bT(x,w,z[2],b)}},
static:{py:function(a,b){var z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
z.jJ(a,b)
return z}}},
t_:{
"^":"j;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
k_:function(){var z,y,x,w,v,u
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.a=z
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.b=z
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.c=z
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.d=z
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.e=z
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.f=z
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.r=z
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.x=z
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.y=z
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.z=z
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.Q=z
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.ch=z
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.cx=z
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.cy=z
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.db=z
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.dx=z
z=new G.a4(new Float32Array(H.i(4)))
z.U(4,0)
this.dy=z
for(y=0;y<4;y=w){z=y/4
x=400*(1-z)+700*z
w=y+1
z=w/4
v=400*(1-z)+700*z
z=this.a.a
u=G.ax(C.N,C.aD,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u
u=this.b.a
z=G.ax(C.N,C.a0,x,v,0)
if(y>=u.length)return H.a(u,y)
u[y]=z
z=this.c.a
u=G.ax(C.N,C.aj,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u}for(y=0;y<4;y=w){z=y/4
x=400*(1-z)+700*z
w=y+1
z=w/4
v=400*(1-z)+700*z
z=this.d.a
u=G.ax(C.j,C.f2,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u
u=this.e.a
z=G.ax(C.j,C.c0,x,v,0)
if(y>=u.length)return H.a(u,y)
u[y]=z
z=this.f.a
u=G.ax(C.j,C.de,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u
u=this.r.a
z=G.ax(C.j,C.db,x,v,0)
if(y>=u.length)return H.a(u,y)
u[y]=z
z=this.x.a
u=G.ax(C.j,C.dk,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u
u=this.y.a
z=G.ax(C.j,C.ef,x,v,0)
if(y>=u.length)return H.a(u,y)
u[y]=z
z=this.z.a
u=G.ax(C.j,C.cQ,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u
u=this.Q.a
z=G.ax(C.j,C.hn,x,v,0)
if(y>=u.length)return H.a(u,y)
u[y]=z
z=this.ch.a
u=G.ax(C.j,C.dd,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u
u=this.cx.a
z=G.ax(C.j,C.f9,x,v,0)
if(y>=u.length)return H.a(u,y)
u[y]=z
z=this.cy.a
u=G.ax(C.j,C.cP,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u
u=this.db.a
z=G.ax(C.j,C.hI,x,v,0)
if(y>=u.length)return H.a(u,y)
u[y]=z
z=this.dx.a
u=G.ax(C.j,C.eG,x,v,0)
if(y>=z.length)return H.a(z,y)
z[y]=u
u=this.dy.a
z=G.ax(C.j,C.dW,x,v,0)
if(y>=u.length)return H.a(u,y)
u[y]=z}},
static:{t0:function(){var z=new G.t_(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.k_()
return z}}},
cH:{
"^":"j;D:c>,C:d>,bW:e<,bV:f<,bG:r<"},
aW:{
"^":"j;",
aI:function(){return this.a.ed(this.bf())},
b5:function(){return!0},
cb:function(a){$.A.$2(3,"Unimplemented Shape.refine() method called")},
bL:function(){$.A.$2(3,"Unimplemented Shape.area() method called")
return 0}},
bI:{
"^":"j;an:a<",
iz:function(a,b,c){return this.a},
iR:function(a,b){var z,y,x,w
for(z=this.a,y=z.length,x=J.y(a),w=0;w<y;++w)z[w]=x.h(a,b+w)},
nh:function(a){var z,y,x
for(z=this.a,y=z.length,x=0;x<y;++x)if(z[x]!==a)return!1
return!0},
i:function(a,b){var z,y,x,w,v,u,t
z=G.F(0)
for(y=this.a,x=y.length,w=0;w<x;++w){v=z.a
u=y[w]
t=J.e(b.gan(),w)
if(typeof t!=="number")return H.c(t)
if(w>=v.length)return H.a(v,w)
v[w]=u+t}return z},
p:function(a,b){var z,y,x,w,v,u,t
z=G.F(0)
for(y=this.a,x=y.length,w=0;w<x;++w){v=z.a
u=y[w]
t=J.e(b.gan(),w)
if(typeof t!=="number")return H.c(t)
if(w>=v.length)return H.a(v,w)
v[w]=u-t}return z},
q:function(a,b){var z,y,x,w,v,u,t,s,r
z=G.F(0)
if(typeof b==="number")for(y=this.a,x=y.length,w=0;w<x;++w){v=z.a
u=y[w]
if(w>=v.length)return H.a(v,w)
v[w]=u*b}else if(b instanceof G.bI)for(y=this.a,x=y.length,v=b.a,u=v.length,w=0;w<x;++w){t=z.a
s=y[w]
if(w>=u)return H.a(v,w)
r=v[w]
if(w>=t.length)return H.a(t,w)
t[w]=s*r}else $.A.$2(3,"Spectrum or double expected.")
return z},
au:function(a,b){var z,y,x,w,v,u,t,s,r
z=G.F(0)
if(typeof b==="number")for(y=this.a,x=y.length,w=0;w<x;++w){v=z.a
u=y[w]
if(w>=v.length)return H.a(v,w)
v[w]=u/b}else if(b instanceof G.bI)for(y=this.a,x=y.length,v=b.a,u=v.length,w=0;w<x;++w){t=z.a
s=y[w]
if(w>=u)return H.a(v,w)
r=v[w]
if(w>=t.length)return H.a(t,w)
t[w]=s/r}else $.A.$2(3,"Spectrum or double expected.")
return z},
aa:function(a){var z,y,x,w,v,u
z=G.F(0)
for(y=this.a,x=y.length,w=0;w<x;++w){v=z.a
u=y[w]
if(w>=v.length)return H.a(v,w)
v[w]=-u}return z},
a4:function(a,b){var z,y,x,w,v
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
v=J.e(b.gan(),x)
if(typeof v!=="number")return H.c(v)
z[x]=w+v}},
v:function(a,b,c){var z,y,x,w,v,u
z=G.F(0)
for(y=this.a,x=y.length,w=0;w<x;++w){v=z.a
u=C.b.v(y[w],b,c)
if(w>=v.length)return H.a(v,w)
v[w]=u}return z},
E:function(a){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=H.l(z[0])
for(w=1;w<y;++w)x+=" "+H.l(z[w])
return x},
U:function(a,b){if(!J.k(b,0))C.B.ag(this.a,0,a,b)}},
pH:{
"^":"r:5;",
$2:function(a,b){return J.a7(J.e(a,0),J.e(b,0))}},
pE:{
"^":"r:5;a,b,c",
$2:function(a,b){var z,y,x,w,v
z=this.a
y=z.length
if(b>=y)return H.a(z,b)
x=z[b]
if(typeof x!=="number")return H.c(x)
w=b+1
if(w>=y)return H.a(z,w)
w=J.m(z[w],x)
if(typeof w!=="number")return H.c(w)
w=(a-x)/w
x=this.b
z=this.c+b
y=x.length
if(z<0||z>=y)return H.a(x,z)
v=x[z];++z
if(z>=y)return H.a(x,z)
z=x[z]
return J.b(J.h(v,1-w),J.h(z,w))}},
pF:{
"^":"r:57;a",
$3:function(a,b,c){var z=this.a
z=J.b(z.$2(a,c),z.$2(b,c))
if(typeof z!=="number")return H.c(z)
return 0.5*z}},
bJ:{
"^":"j;D:a>,C:b>,bG:c<,B:d>",
f7:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
if(a===this.c)return this
if(a===1){z=G.cI(this.a,this.b,1)
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
w[t]=0.212671*r+0.71516*q+0.072169*p}return z}z=G.cI(this.a,this.b,3)
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
iO:function(a){this.d=J.L(a)
this.a=a.a
this.b=a.b},
h:function(a,b){var z,y,x,w,v
if(J.k(this.c,1)){z=this.d
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]}b=J.h(b,this.c)
z=$.$get$hq().a
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
return $.$get$hq()},
k:function(a,b,c){var z,y,x
if(J.k(this.c,1)){z=this.d
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c
return}b=J.h(b,this.c)
z=this.d
y=J.e(c.gan(),0)
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=y
y=this.d
z=b+1
x=J.e(c.gan(),1)
if(z>=y.length)return H.a(y,z)
y[z]=x
x=this.d
z=b+2
y=J.e(c.gan(),2)
if(z>=x.length)return H.a(x,z)
x[z]=y},
static:{cI:function(a,b,c){return new G.bJ(a,b,c,new Float32Array(H.i(J.h(J.h(a,b),c))))},hp:function(a){var z=J.z(a)
return new G.bJ(z.gD(a),z.gC(a),a.gbG(),new Float32Array(H.D(z.gB(a))))}}},
pJ:{
"^":"j;Z:b>"},
pL:{
"^":"pJ;c,a,b",
i:function(a,b){var z=this.c
if(typeof b!=="number")return H.c(b)
this.c=z+b
return this},
E:function(a){return this.a+" | "+this.b+": "+H.l(this.c)},
static:{eb:function(a,b){var z=new G.pL(0,a,b)
$.$get$hw().push(z)
return z}}},
ba:{
"^":"j0;"},
az:{
"^":"j;"},
d1:{
"^":"az;a",
static:{wD:[function(a,b){return new G.d1(b.om("value",G.F(1)))},"$2","tM",4,0,21],wC:[function(a,b){return new G.d1(b.mR("value",1))},"$2","tL",4,0,21]}},
bA:{
"^":"ed;a"},
bB:{
"^":"q5;a"},
bE:{
"^":"ed;a,b,c,d"},
bL:{
"^":"ed;a"},
ed:{
"^":"j;"},
q5:{
"^":"j;"},
aD:{
"^":"ed;a,b,c,d"},
Q:{
"^":"j;"},
v:{
"^":"j;e1:a<,ah:b<",
A:function(a,b){if(b==null)return!1
return b.ge1().A(0,this.a)&&b.b.A(0,this.b)},
I:function(a,b){var z,y,x
for(z=0;z<16;++z){y=this.a.a
if(z>=y.length)return H.a(y,z)
y=y[z]
x=b.ge1().a
if(z>=x.length)return H.a(x,z)
if(y<x[z])return!0
y=this.a.a
if(z>=y.length)return H.a(y,z)
y=y[z]
x=b.a.a
if(z>=x.length)return H.a(x,z)
if(y>x[z])return!1}return!1},
q:function(a,b){return G.a1(G.jk(this.a,b.ge1()),G.jk(b.b,this.b))},
n4:function(){var z,y,x,w
z=this.cI(G.a5(1,0,0)).c9()
y=this.cI(G.a5(0,1,0)).c9()
x=this.cI(G.a5(0,0,1)).c9()
if(!(z<0.999||z>1.001))w=y<0.999||y>1.001||x<0.999||x>1.001
else w=!0
return w},
nU:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
if(b==null){b=new G.t(new Float32Array(H.i(3)))
b.G(0,0,0)}z=J.z(a)
y=z.gM(a)
x=z.gK(a)
w=z.gao(a)
z=this.a.a
v=z.length
if(0>=v)return H.a(z,0)
u=z[0]
if(typeof y!=="number")return H.c(y)
if(1>=v)return H.a(z,1)
t=z[1]
if(typeof x!=="number")return H.c(x)
if(2>=v)return H.a(z,2)
s=z[2]
if(typeof w!=="number")return H.c(w)
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
if(o!==1)b.ne(o)
return b},
ai:function(a){return this.nU(a,null)},
nV:function(a,b){var z,y,x,w,v,u,t,s
if(b==null)b=G.a5(0,0,0)
z=J.z(a)
y=z.gM(a)
x=z.gK(a)
w=z.gao(a)
z=this.a.a
v=z.length
if(0>=v)return H.a(z,0)
u=z[0]
if(typeof y!=="number")return H.c(y)
if(1>=v)return H.a(z,1)
t=z[1]
if(typeof x!=="number")return H.c(x)
if(2>=v)return H.a(z,2)
z=z[2]
if(typeof w!=="number")return H.c(w)
v=J.z(b)
v.sM(b,u*y+t*x+z*w)
z=this.a.a
t=z.length
if(4>=t)return H.a(z,4)
u=z[4]
if(5>=t)return H.a(z,5)
s=z[5]
if(6>=t)return H.a(z,6)
v.sK(b,u*y+s*x+z[6]*w)
z=this.a.a
s=z.length
if(8>=s)return H.a(z,8)
u=z[8]
if(9>=s)return H.a(z,9)
t=z[9]
if(10>=s)return H.a(z,10)
v.sao(b,u*y+t*x+z[10]*w)
return b},
cI:function(a){return this.nV(a,null)},
nT:function(a,b){var z,y,x,w
b=G.a0(null,null)
z=this.ai(a.gdf())
b.a.b7(z)
b.b.b7(z)
z=a.b.a
if(0>=z.length)return H.a(z,0)
z=z[0]
y=a.a.a
x=y.length
if(1>=x)return H.a(y,1)
w=y[1]
if(2>=x)return H.a(y,2)
y=y[2]
x=new G.t(new Float32Array(H.i(3)))
x.G(z,w,y)
b.ar(this.ai(x))
x=a.a.a
y=x.length
if(0>=y)return H.a(x,0)
w=x[0]
z=a.b.a
if(1>=z.length)return H.a(z,1)
z=z[1]
if(2>=y)return H.a(x,2)
x=x[2]
y=new G.t(new Float32Array(H.i(3)))
y.G(w,z,x)
b.ar(this.ai(y))
y=a.a.a
x=y.length
if(0>=x)return H.a(y,0)
z=y[0]
if(1>=x)return H.a(y,1)
y=y[1]
x=a.b.a
if(2>=x.length)return H.a(x,2)
x=x[2]
w=new G.t(new Float32Array(H.i(3)))
w.G(z,y,x)
b.ar(this.ai(w))
w=a.a.a
if(0>=w.length)return H.a(w,0)
w=w[0]
x=a.b.a
y=x.length
if(1>=y)return H.a(x,1)
z=x[1]
if(2>=y)return H.a(x,2)
x=x[2]
y=new G.t(new Float32Array(H.i(3)))
y.G(w,z,x)
b.ar(this.ai(y))
y=a.b.a
x=y.length
if(0>=x)return H.a(y,0)
z=y[0]
if(1>=x)return H.a(y,1)
y=y[1]
x=a.a.a
if(2>=x.length)return H.a(x,2)
x=x[2]
w=new G.t(new Float32Array(H.i(3)))
w.G(z,y,x)
b.ar(this.ai(w))
w=a.b.a
x=w.length
if(0>=x)return H.a(w,0)
y=w[0]
z=a.a.a
if(1>=z.length)return H.a(z,1)
z=z[1]
if(2>=x)return H.a(w,2)
w=w[2]
x=new G.t(new Float32Array(H.i(3)))
x.G(y,z,w)
b.ar(this.ai(x))
b.ar(this.ai(a.b))
return b},
ed:function(a){return this.nT(a,null)},
static:{a1:function(a,b){var z,y
z=a==null
y=z?G.fO():new G.c4(new Float32Array(H.D(a.a)))
if(b==null)z=z?G.fO():new G.c4(new Float32Array(H.D(a.a))).nf()
else z=new G.c4(new Float32Array(H.D(b.a)))
return new G.v(y,z)},aR:function(a){return new G.v(new G.c4(new Float32Array(H.D(a.ge1().a))),new G.c4(new Float32Array(H.D(a.b.a))))},ef:function(a){var z=J.z(a)
return G.a1(G.cA(1,0,0,z.gM(a),0,1,0,z.gK(a),0,0,1,z.gao(a),0,0,0,1),G.cA(1,0,0,J.bd(z.gM(a)),0,1,0,J.bd(z.gK(a)),0,0,1,J.bd(z.gao(a)),0,0,0,1))},ee:function(a,b,c){var z=G.cA(a,0,0,0,0,b,0,0,0,0,c,0,0,0,0,1)
if(typeof a!=="number")return H.c(a)
if(typeof b!=="number")return H.c(b)
if(typeof c!=="number")return H.c(c)
return G.a1(z,G.cA(1/a,0,0,0,0,1/b,0,0,0,0,1/c,0,0,0,0,1))},k3:function(a,b,c){var z,y,x
if(typeof c!=="number")return c.p()
if(typeof b!=="number")return H.c(b)
z=c-b
y=G.cA(1,0,0,0,0,1,0,0,0,0,c/z,-c*b/z,0,0,1,0)
if(typeof a!=="number")return H.c(a)
x=1/Math.tan(H.T(0.017453292519943295*a/2))
return G.ee(x,x,1).q(0,G.a1(y,null))}}},
ac:{
"^":"j;B:a>",
gM:function(a){var z=this.a
if(0>=z.length)return H.a(z,0)
return z[0]},
sM:function(a,b){var z=this.a
if(0>=z.length)return H.a(z,0)
z[0]=b
return b},
gK:function(a){var z=this.a
if(1>=z.length)return H.a(z,1)
return z[1]},
sK:function(a,b){var z=this.a
if(1>=z.length)return H.a(z,1)
z[1]=b
return b},
gao:function(a){var z=this.a
if(2>=z.length)return H.a(z,2)
return z[2]},
sao:function(a,b){var z=this.a
if(2>=z.length)return H.a(z,2)
z[2]=b
return b},
b7:function(a){var z,y,x,w
z=this.a
y=J.z(a)
x=J.e(y.gB(a),0)
w=z.length
if(0>=w)return H.a(z,0)
z[0]=x
x=J.e(y.gB(a),1)
if(1>=w)return H.a(z,1)
z[1]=x
y=J.e(y.gB(a),2)
if(2>=w)return H.a(z,2)
z[2]=y},
i:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.z(b)
v=J.e(w.gB(b),0)
if(typeof v!=="number")return H.c(v)
if(1>=y)return H.a(z,1)
u=z[1]
t=J.e(w.gB(b),1)
if(typeof t!=="number")return H.c(t)
if(2>=y)return H.a(z,2)
z=z[2]
w=J.e(w.gB(b),2)
if(typeof w!=="number")return H.c(w)
return G.a5(x+v,u+t,z+w)},
p:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.z(b)
v=J.e(w.gB(b),0)
if(typeof v!=="number")return H.c(v)
if(1>=y)return H.a(z,1)
u=z[1]
t=J.e(w.gB(b),1)
if(typeof t!=="number")return H.c(t)
if(2>=y)return H.a(z,2)
z=z[2]
w=J.e(w.gB(b),2)
if(typeof w!=="number")return H.c(w)
return G.a5(x-v,u-t,z-w)},
q:function(a,b){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof b!=="number")return H.c(b)
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return G.a5(x*b,w*b,z[2]*b)},
au:function(a,b){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof b!=="number")return H.c(b)
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return G.a5(x/b,w/b,z[2]/b)},
aa:function(a){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return G.a5(-x,-w,-z[2])},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c
return c},
c9:function(){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
return x*x+w*w+z*z},
S:[function(a){return Math.sqrt(H.T(this.c9()))},"$0","gm",0,0,110],
ne:function(a){var z,y,x
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof a!=="number")return H.c(a)
z[0]=x/a
if(1>=y)return H.a(z,1)
z[1]=z[1]/a
if(2>=y)return H.a(z,2)
z[2]=z[2]/a
return this},
a4:function(a,b){var z,y,x,w,v
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.z(b)
v=J.e(w.gB(b),0)
if(typeof v!=="number")return H.c(v)
z[0]=x+v
if(1>=y)return H.a(z,1)
v=z[1]
x=J.e(w.gB(b),1)
if(typeof x!=="number")return H.c(x)
z[1]=v+x
if(2>=y)return H.a(z,2)
y=z[2]
w=J.e(w.gB(b),2)
if(typeof w!=="number")return H.c(w)
z[2]=y+w
return this},
E:function(a){var z,y,x
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=H.l(z[0])+" "
if(1>=y)return H.a(z,1)
x=x+H.l(z[1])+" "
if(2>=y)return H.a(z,2)
return x+H.l(z[2])},
G:function(a,b,c){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=a
if(1>=y)return H.a(z,1)
z[1]=b
if(2>=y)return H.a(z,2)
z[2]=c},
static:{a5:function(a,b,c){var z=new G.ac(new Float32Array(H.i(3)))
z.G(a,b,c)
return z},qU:function(a,b){var z,y
z=J.z(a)
y=J.z(b)
return J.b(J.b(J.h(J.e(z.gB(a),0),J.e(y.gB(b),0)),J.h(J.e(z.gB(a),1),J.e(y.gB(b),1))),J.h(J.e(z.gB(a),2),J.e(y.gB(b),2)))},dr:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=J.z(a)
y=J.e(z.gB(a),0)
x=J.e(z.gB(a),1)
w=J.e(z.gB(a),2)
z=J.z(b)
v=J.e(z.gB(b),0)
u=J.e(z.gB(b),1)
t=J.e(z.gB(b),2)
z=J.G(x)
s=J.G(w)
r=J.m(z.q(x,t),s.q(w,u))
q=J.G(y)
s=J.m(s.q(w,v),q.q(y,t))
z=J.m(q.q(y,u),z.q(x,v))
q=new Float32Array(3)
if(0>=3)return H.a(q,0)
q[0]=r
if(1>=3)return H.a(q,1)
q[1]=s
if(2>=3)return H.a(q,2)
q[2]=z
return new G.ac(q)},qT:function(a,b,c){var z,y,x
z=J.z(a)
if(J.V(J.cW(z.gM(a)),J.cW(z.gK(a)))){y=J.b(J.h(J.e(z.gB(a),0),J.e(z.gB(a),0)),J.h(J.e(z.gB(a),2),J.e(z.gB(a),2)))
if(typeof y!=="number")H.K(H.N(y))
x=1/Math.sqrt(y)
y=J.z(b)
J.n(y.gB(b),0,J.h(J.bd(J.e(z.gB(a),2)),x))
J.n(y.gB(b),1,0)
J.n(y.gB(b),2,J.h(J.e(z.gB(a),0),x))}else{y=J.b(J.h(J.e(z.gB(a),1),J.e(z.gB(a),1)),J.h(J.e(z.gB(a),2),J.e(z.gB(a),2)))
if(typeof y!=="number")H.K(H.N(y))
x=1/Math.sqrt(y)
y=J.z(b)
J.n(y.gB(b),0,0)
J.n(y.gB(b),1,J.h(J.e(z.gB(a),2),x))
J.n(y.gB(b),2,J.h(J.bd(J.e(z.gB(a),1)),x))}c.b7(G.dr(a,b))}}},
iD:{
"^":"ky;",
np:[function(a,b,c,d,e){return G.ju(c,d,this.d)},"$4","ge3",8,0,15]},
ky:{
"^":"j;"},
kx:{
"^":"j0;"},
b5:{
"^":"bI;a",
gM:function(a){var z=this.a
if(0>=z.length)return H.a(z,0)
return z[0]},
sM:function(a,b){var z=this.a
if(0>=z.length)return H.a(z,0)
z[0]=b
return b},
gK:function(a){var z=this.a
if(1>=z.length)return H.a(z,1)
return z[1]},
sK:function(a,b){var z=this.a
if(1>=z.length)return H.a(z,1)
z[1]=b
return b},
gao:function(a){var z=this.a
if(2>=z.length)return H.a(z,2)
return z[2]},
sao:function(a,b){var z=this.a
if(2>=z.length)return H.a(z,2)
z[2]=b
return b},
fk:function(){var z=this.a
if(1>=z.length)return H.a(z,1)
return z[1]},
ec:function(){return G.e5(this)},
bU:function(a,b,c){var z,y,x,w
z=new G.b3(new Float32Array(H.i(3)))
z.U(3,0)
z=z.bU(a,b,c).a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
G.e9(x,w,z[2],this.a)
return this},
ds:function(a,b){return this.bU(a,b,0)},
bT:function(a,b,c,d){G.e9(a,b,c,this.a)
return this},
cP:function(a,b,c){return this.bT(a,b,c,0)},
i:function(a,b){var z,y,x,w,v,u
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.e(b.gan(),0)
if(typeof w!=="number")return H.c(w)
if(1>=y)return H.a(z,1)
v=z[1]
u=J.e(b.gan(),1)
if(typeof u!=="number")return H.c(u)
if(2>=y)return H.a(z,2)
z=z[2]
y=J.e(b.gan(),2)
if(typeof y!=="number")return H.c(y)
return G.cK(x+w,v+u,z+y)},
p:function(a,b){var z,y,x,w,v,u
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=J.e(b.gan(),0)
if(typeof w!=="number")return H.c(w)
if(1>=y)return H.a(z,1)
v=z[1]
u=J.e(b.gan(),1)
if(typeof u!=="number")return H.c(u)
if(2>=y)return H.a(z,2)
z=z[2]
y=J.e(b.gan(),2)
if(typeof y!=="number")return H.c(y)
return G.cK(x-w,v-u,z-y)},
q:function(a,b){var z,y,x,w,v,u,t,s
if(typeof b==="number"){z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return G.cK(x*b,w*b,z[2]*b)}if(b instanceof G.b5){z=this.a
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
return G.cK(x*u,t*s,z*w[2])}$.A.$2(3,"XYZColor or double expected.")
z=new G.b5(new Float32Array(H.i(3)))
z.U(3,0)
return z},
au:function(a,b){var z,y,x,w,v,u,t,s
if(typeof b==="number"){z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
return G.cK(x/b,w/b,z[2]/b)}if(b instanceof G.b5){z=this.a
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
return G.cK(x/u,t/s,z/w[2])}$.A.$2(3,"XYZColor or double expected.")
z=new G.b5(new Float32Array(H.i(3)))
z.U(3,0)
return z},
jX:function(a,b,c){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=a
if(1>=y)return H.a(z,1)
z[1]=b
if(2>=y)return H.a(z,2)
z[2]=c},
jW:function(a){var z,y,x,w,v
z=J.B(a)
if(!!z.$isb3){z=a.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
G.e9(x,w,z[2],this.a)}else if(!!z.$isb5){z=this.a
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
z[2]=y}else if(!!z.$isa4){z=this.a
y=a.iB().a
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
static:{cK:function(a,b,c){var z=new G.b5(new Float32Array(H.i(3)))
z.U(3,0)
z.jX(a,b,c)
return z},r2:function(a){var z=new G.b5(new Float32Array(H.i(3)))
z.U(3,0)
z.jW(a)
return z}}}}],["","",,M,{
"^":"",
rj:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=a.length
if(z===0)return""
y=b?"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_":"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
x=C.a.e5(z,3)
w=z-x
v=x>0?4:0
u=(z/3|0)*4+v
if(c)u+=C.a.a3(u-1,76)<<1>>>0
v=Array(u)
v.fixed$length=Array
t=H.p(v,[P.o])
for(v=t.length,s=u-2,r=0,q=0,p=0;q<w;q=o){o=q+1
if(q>=z)return H.a(a,q)
n=a[q]
q=o+1
if(o>=z)return H.a(a,o)
m=a[o]
o=q+1
if(q>=z)return H.a(a,q)
l=n<<16&16777215|m<<8&16777215|a[q]
k=r+1
m=C.c.P(y,l>>>18)
if(r>=v)return H.a(t,r)
t[r]=m
r=k+1
m=C.c.P(y,l>>>12&63)
if(k>=v)return H.a(t,k)
t[k]=m
k=r+1
m=C.c.P(y,l>>>6&63)
if(r>=v)return H.a(t,r)
t[r]=m
r=k+1
m=C.c.P(y,l&63)
if(k>=v)return H.a(t,k)
t[k]=m
if(c){++p
n=p===19&&r<s}else n=!1
if(n){k=r+1
if(r>=v)return H.a(t,r)
t[r]=13
r=k+1
if(k>=v)return H.a(t,k)
t[k]=10
p=0}}if(x===1){if(q>=z)return H.a(a,q)
l=a[q]
k=r+1
s=C.c.P(y,l>>>2)
if(r>=v)return H.a(t,r)
t[r]=s
r=k+1
s=C.c.P(y,l<<4&63)
if(k>=v)return H.a(t,k)
t[k]=s
k=r+1
if(r>=v)return H.a(t,r)
t[r]=61
if(k>=v)return H.a(t,k)
t[k]=61}else if(x===2){if(q>=z)return H.a(a,q)
l=a[q]
s=q+1
if(s>=z)return H.a(a,s)
j=a[s]
k=r+1
s=C.c.P(y,l>>>2)
if(r>=v)return H.a(t,r)
t[r]=s
r=k+1
s=C.c.P(y,(l<<4|j>>>4)&63)
if(k>=v)return H.a(t,k)
t[k]=s
k=r+1
s=C.c.P(y,j<<2&63)
if(r>=v)return H.a(t,r)
t[r]=s
if(k>=v)return H.a(t,k)
t[k]=61}return P.c9(t,0,null)}}],["","",,H,{
"^":"",
aJ:function(){return new P.aj("No element")},
j7:function(){return new P.aj("Too few elements")},
dj:function(a,b,c,d){if(c-b<=32)H.jR(a,b,c,d)
else H.jQ(a,b,c,d)},
jR:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.y(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.V(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.k(a,w,y.h(a,v))
w=v}y.k(a,w,x)}},
jQ:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.a.a3(c-b+1,6)
y=b+z
x=c-z
w=C.a.a3(b+c,2)
v=w-z
u=w+z
t=J.y(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.V(d.$2(s,r),0)){n=r
r=s
s=n}if(J.V(d.$2(p,o),0)){n=o
o=p
p=n}if(J.V(d.$2(s,q),0)){n=q
q=s
s=n}if(J.V(d.$2(r,q),0)){n=q
q=r
r=n}if(J.V(d.$2(s,p),0)){n=p
p=s
s=n}if(J.V(d.$2(q,p),0)){n=p
p=q
q=n}if(J.V(d.$2(r,o),0)){n=o
o=r
r=n}if(J.V(d.$2(r,q),0)){n=q
q=r
r=n}if(J.V(d.$2(p,o),0)){n=o
o=p
p=n}t.k(a,y,s)
t.k(a,w,q)
t.k(a,x,o)
t.k(a,v,t.h(a,b))
t.k(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.k(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.B(i)
if(h.A(i,0))continue
if(h.I(i,0)){if(k!==m){t.k(a,k,t.h(a,m))
t.k(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.u(i)
if(h.T(i,0)){--l
continue}else{g=l-1
if(h.I(i,0)){t.k(a,k,t.h(a,m))
f=m+1
t.k(a,m,t.h(a,l))
t.k(a,l,j)
l=g
m=f
break}else{t.k(a,k,t.h(a,l))
t.k(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(J.a7(d.$2(j,r),0)){if(k!==m){t.k(a,k,t.h(a,m))
t.k(a,m,j)}++m}else if(J.V(d.$2(j,p),0))for(;!0;)if(J.V(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.a7(d.$2(t.h(a,l),r),0)){t.k(a,k,t.h(a,m))
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
H.dj(a,b,m-2,d)
H.dj(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.k(d.$2(t.h(a,m),r),0);)++m
for(;J.k(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.k(d.$2(j,r),0)){if(k!==m){t.k(a,k,t.h(a,m))
t.k(a,m,j)}++m}else if(J.k(d.$2(j,p),0))for(;!0;)if(J.k(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.a7(d.$2(t.h(a,l),r),0)){t.k(a,k,t.h(a,m))
f=m+1
t.k(a,m,t.h(a,l))
t.k(a,l,j)
m=f}else{t.k(a,k,t.h(a,l))
t.k(a,l,j)}l=g
break}}H.dj(a,m,l,d)}else H.dj(a,m,l,d)},
q3:function(a){return a.goh()},
bU:{
"^":"kh;a",
gm:function(a){return this.a.length},
h:function(a,b){return C.c.P(this.a,b)},
S:function(a){return this.gm(this).$0()},
$askh:function(){return[P.o]},
$asc3:function(){return[P.o]},
$asw:function(){return[P.o]}},
cw:{
"^":"aI;",
gad:function(a){return new H.jd(this,this.gm(this),0,null)},
aH:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){b.$1(this.aJ(0,y))
if(z!==this.gm(this))throw H.f(new P.aN(this))}},
gY:function(a){return this.gm(this)===0},
gac:function(a){if(this.gm(this)===0)throw H.f(H.aJ())
return this.aJ(0,0)},
gaw:function(a){if(this.gm(this)===0)throw H.f(H.aJ())
return this.aJ(0,this.gm(this)-1)},
cE:function(a,b){return H.p(new H.dS(this,b),[null,null])},
b3:function(a,b){return H.ec(this,b,null,H.an(this,"cw",0))},
bQ:function(a,b){var z,y,x
if(b){z=H.p([],[H.an(this,"cw",0)])
C.e.sm(z,this.gm(this))}else z=H.p(Array(this.gm(this)),[H.an(this,"cw",0)])
for(y=0;y<this.gm(this);++y){x=this.aJ(0,y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
cG:function(a){return this.bQ(a,!0)},
S:function(a){return this.gm(this).$0()},
$isW:1},
q2:{
"^":"cw;a,b,c",
gkF:function(){var z=J.M(this.a)
return z},
gm9:function(){var z,y
z=J.M(this.a)
y=this.b
if(J.V(y,z))return z
return y},
gm:function(a){var z,y
z=J.M(this.a)
y=this.b
if(J.U(y,z))return 0
if(typeof y!=="number")return H.c(y)
return z-y},
aJ:function(a,b){var z=J.b(this.gm9(),b)
if(J.a7(b,0)||J.U(z,this.gkF()))throw H.f(P.c_(b,this,"index",null,null))
return J.iq(this.a,z)},
b3:function(a,b){var z
if(J.a7(b,0))H.K(P.ae(b,0,null,"count",null))
z=J.b(this.b,b)
return H.ec(this.a,z,this.c,H.ar(this,0))},
bQ:function(a,b){var z,y,x,w,v,u,t,s
z=this.b
y=this.a
x=J.y(y)
w=x.gm(y)
if(typeof z!=="number")return H.c(z)
v=w-z
if(v<0)v=0
if(b){u=H.p([],[H.ar(this,0)])
C.e.sm(u,v)}else u=H.p(Array(v),[H.ar(this,0)])
for(t=0;t<v;++t){s=x.aJ(y,z+t)
if(t>=u.length)return H.a(u,t)
u[t]=s
if(x.gm(y)<w)throw H.f(new P.aN(this))}return u},
jM:function(a,b,c,d){var z=this.b
if(J.a7(z,0))H.K(P.ae(z,0,null,"start",null))},
S:function(a){return this.gm(this).$0()},
static:{ec:function(a,b,c,d){var z=H.p(new H.q2(a,b,c),[d])
z.jM(a,b,c,d)
return z}}},
jd:{
"^":"j;a,b,c,d",
ga8:function(){return this.d},
W:function(){var z,y,x,w
z=this.a
y=J.y(z)
x=y.gm(z)
if(this.b!==x)throw H.f(new P.aN(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.aJ(z,w);++this.c
return!0}},
ji:{
"^":"aI;a,b",
gad:function(a){var z=new H.oe(null,J.co(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gm:function(a){return J.M(this.a)},
gY:function(a){return J.lu(this.a)},
gac:function(a){return this.bI(J.lt(this.a))},
gaw:function(a){return this.bI(J.ir(this.a))},
bI:function(a){return this.b.$1(a)},
S:function(a){return this.gm(this).$0()},
$asaI:function(a,b){return[b]},
static:{dR:function(a,b,c,d){if(!!J.B(a).$isW)return H.p(new H.iJ(a,b),[c,d])
return H.p(new H.ji(a,b),[c,d])}}},
iJ:{
"^":"ji;a,b",
$isW:1},
oe:{
"^":"fA;a,b,c",
W:function(){var z=this.b
if(z.W()){this.a=this.bI(z.ga8())
return!0}this.a=null
return!1},
ga8:function(){return this.a},
bI:function(a){return this.c.$1(a)}},
dS:{
"^":"cw;a,b",
gm:function(a){return J.M(this.a)},
aJ:function(a,b){return this.bI(J.iq(this.a,b))},
bI:function(a){return this.b.$1(a)},
S:function(a){return this.gm(this).$0()},
$ascw:function(a,b){return[b]},
$asaI:function(a,b){return[b]},
$isW:1},
r0:{
"^":"aI;a,b",
gad:function(a){var z=new H.r1(J.co(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
r1:{
"^":"fA;a,b",
W:function(){for(var z=this.a;z.W();)if(this.bI(z.ga8())===!0)return!0
return!1},
ga8:function(){return this.a.ga8()},
bI:function(a){return this.b.$1(a)}},
jN:{
"^":"aI;a,b",
b3:function(a,b){var z,y
z=this.b
if(typeof z!=="number"||Math.floor(z)!==z)throw H.f(P.d0(z,"count is not an integer",null))
y=J.u(z)
if(y.I(z,0))H.K(P.ae(z,0,null,"count",null))
return H.jO(this.a,y.i(z,b),H.ar(this,0))},
gad:function(a){var z=new H.pD(J.co(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
fL:function(a,b,c){var z=this.b
if(typeof z!=="number"||Math.floor(z)!==z)throw H.f(P.d0(z,"count is not an integer",null))
if(J.a7(z,0))H.K(P.ae(z,0,null,"count",null))},
static:{jP:function(a,b,c){var z
if(!!J.B(a).$isW){z=H.p(new H.ml(a,b),[c])
z.fL(a,b,c)
return z}return H.jO(a,b,c)},jO:function(a,b,c){var z=H.p(new H.jN(a,b),[c])
z.fL(a,b,c)
return z}}},
ml:{
"^":"jN;a,b",
gm:function(a){var z=J.m(J.M(this.a),this.b)
if(J.U(z,0))return z
return 0},
S:function(a){return this.gm(this).$0()},
$isW:1},
pD:{
"^":"fA;a,b",
W:function(){var z,y,x
z=this.a
y=0
while(!0){x=this.b
if(typeof x!=="number")return H.c(x)
if(!(y<x))break
z.W();++y}this.b=0
return z.W()},
ga8:function(){return this.a.ga8()}},
iT:{
"^":"j;",
sm:function(a,b){throw H.f(new P.a_("Cannot change the length of a fixed-length list"))},
a4:function(a,b){throw H.f(new P.a_("Cannot add to a fixed-length list"))}},
qp:{
"^":"j;",
k:function(a,b,c){throw H.f(new P.a_("Cannot modify an unmodifiable list"))},
sm:function(a,b){throw H.f(new P.a_("Cannot change the length of an unmodifiable list"))},
a4:function(a,b){throw H.f(new P.a_("Cannot add to an unmodifiable list"))},
aj:function(a,b,c,d,e){throw H.f(new P.a_("Cannot modify an unmodifiable list"))},
ag:function(a,b,c,d){throw H.f(new P.a_("Cannot modify an unmodifiable list"))},
$isw:1,
$asw:null,
$isW:1},
kh:{
"^":"c3+qp;",
$isw:1,
$asw:null,
$isW:1}}],["","",,H,{
"^":"",
l7:function(a){var z=H.p(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
r4:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.ty()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.cU(new P.r6(z),1)).observe(y,{childList:true})
return new P.r5(z,y,x)}else if(self.setImmediate!=null)return P.tz()
return P.tA()},
zO:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.cU(new P.r7(a),0))},"$1","ty",2,0,10],
zP:[function(a){++init.globalState.f.b
self.setImmediate(H.cU(new P.r8(a),0))},"$1","tz",2,0,10],
zQ:[function(a){P.hB(C.a2,a)},"$1","tA",2,0,10],
ia:function(a,b){var z=H.dz()
z=H.cj(z,[z,z]).c0(a)
if(z){b.toString
return a}else{b.toString
return a}},
mN:function(a,b){var z=H.p(new P.a2(0,$.H,null),[b])
z.em(a)
return z},
mM:function(a,b,c){var z
a=a!=null?a:new P.fX()
z=$.H
if(z!==C.i)z.toString
z=H.p(new P.a2(0,z,null),[c])
z.en(a,b)
return z},
kX:function(a,b,c){$.H.toString
a.bu(b,c)},
tn:function(){var z,y
for(;z=$.cf,z!=null;){$.cR=null
y=z.gcF()
$.cf=y
if(y==null)$.cQ=null
$.H=z.go4()
z.mm()}},
A4:[function(){$.i8=!0
try{P.tn()}finally{$.H=C.i
$.cR=null
$.i8=!1
if($.cf!=null)$.$get$hV().$1(P.l4())}},"$0","l4",0,0,3],
l0:function(a){if($.cf==null){$.cQ=a
$.cf=a
if(!$.i8)$.$get$hV().$1(P.l4())}else{$.cQ.c=a
$.cQ=a}},
li:function(a){var z,y
z=$.H
if(C.i===z){P.ch(null,null,C.i,a)
return}z.toString
if(C.i.gfa()===z){P.ch(null,null,z,a)
return}y=$.H
P.ch(null,null,y,y.f2(a,!0))},
jZ:function(a,b,c,d,e,f){return e?H.p(new P.t7(b,c,d,a,null,0,null),[f]):H.p(new P.r9(b,c,d,a,null,0,null),[f])},
ib:function(a){var z,y,x,w,v
if(a==null)return
try{z=a.$0()
if(!!J.B(z).$isaO)return z
return}catch(w){v=H.ad(w)
y=v
x=H.at(w)
v=$.H
v.toString
P.cg(null,null,v,y,x)}},
to:[function(a,b){var z=$.H
z.toString
P.cg(null,null,z,a,b)},function(a){return P.to(a,null)},"$2","$1","tC",2,2,16,0],
A5:[function(){},"$0","tB",0,0,3],
tq:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.ad(u)
z=t
y=H.at(u)
$.H.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.bm(x)
w=t
v=x.gbt()
c.$2(w,v)}}},
tg:function(a,b,c,d){var z=a.d3()
if(!!J.B(z).$isaO)z.cL(new P.tj(b,c,d))
else b.bu(c,d)},
th:function(a,b){return new P.ti(a,b)},
kV:function(a,b,c){var z=a.d3()
if(!!J.B(z).$isaO)z.cL(new P.tk(b,c))
else b.bY(c)},
tf:function(a,b,c){$.H.toString
a.ek(b,c)},
qh:function(a,b){var z=$.H
if(z===C.i){z.toString
return P.hB(a,b)}return P.hB(a,z.f2(b,!0))},
hB:function(a,b){var z=C.b.a3(a.a,1000)
return H.qe(z<0?0:z,b)},
hU:function(a){var z=$.H
$.H=a
return z},
cg:function(a,b,c,d,e){var z,y,x
z=new P.kz(new P.tp(d,e),C.i,null)
y=$.cf
if(y==null){P.l0(z)
$.cR=$.cQ}else{x=$.cR
if(x==null){z.c=y
$.cR=z
$.cf=z}else{z.c=x.c
x.c=z
$.cR=z
if(z.c==null)$.cQ=z}}},
kY:function(a,b,c,d){var z,y
if($.H===c)return d.$0()
z=P.hU(c)
try{y=d.$0()
return y}finally{$.H=z}},
l_:function(a,b,c,d,e){var z,y
if($.H===c)return d.$1(e)
z=P.hU(c)
try{y=d.$1(e)
return y}finally{$.H=z}},
kZ:function(a,b,c,d,e,f){var z,y
if($.H===c)return d.$2(e,f)
z=P.hU(c)
try{y=d.$2(e,f)
return y}finally{$.H=z}},
ch:function(a,b,c,d){var z=C.i!==c
if(z){d=c.f2(d,!(!z||C.i.gfa()===c))
c=C.i}P.l0(new P.kz(d,c,null))},
r6:{
"^":"r:0;a",
$1:function(a){var z,y
H.eM()
z=this.a
y=z.a
z.a=null
y.$0()}},
r5:{
"^":"r:116;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
r7:{
"^":"r:1;a",
$0:function(){H.eM()
this.a.$0()}},
r8:{
"^":"r:1;a",
$0:function(){H.eM()
this.a.$0()}},
t9:{
"^":"bT;a,b",
E:function(a){var z,y
z="Uncaught Error: "+H.l(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.l(y)):z},
static:{ta:function(a,b){if(b!=null)return b
if(!!J.B(a).$isaB)return a.gbt()
return}}},
aO:{
"^":"j;"},
rh:{
"^":"j;",
mu:[function(a,b){a=a!=null?a:new P.fX()
if(this.a.a!==0)throw H.f(new P.aj("Future already completed"))
$.H.toString
this.bu(a,b)},function(a){return this.mu(a,null)},"dS","$2","$1","gmt",2,2,117,0]},
ay:{
"^":"rh;a",
aA:function(a,b){var z=this.a
if(z.a!==0)throw H.f(new P.aj("Future already completed"))
z.em(b)},
bo:function(a){return this.aA(a,null)},
bu:function(a,b){this.a.en(a,b)}},
cd:{
"^":"j;hv:a<,nJ:b>,c,d,e",
gcB:function(){return this.b.b},
gia:function(){return(this.c&1)!==0},
gn3:function(){return this.c===6},
gn2:function(){return this.c===8},
glj:function(){return this.d},
gmf:function(){return this.d}},
a2:{
"^":"j;dN:a?,cB:b<,c",
gl1:function(){return this.a===8},
sla:function(a){if(a)this.a=2
else this.a=0},
di:function(a,b){var z,y
z=H.p(new P.a2(0,$.H,null),[null])
y=z.b
if(y!==C.i){y.toString
if(b!=null)b=P.ia(b,y)}this.dv(new P.cd(null,z,b==null?1:3,a,b))
return z},
at:function(a){return this.di(a,null)},
mn:function(a,b){var z,y
z=H.p(new P.a2(0,$.H,null),[null])
y=z.b
if(y!==C.i)a=P.ia(a,y)
this.dv(new P.cd(null,z,2,b,a))
return z},
i1:function(a){return this.mn(a,null)},
cL:function(a){var z,y
z=$.H
y=new P.a2(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.i)z.toString
this.dv(new P.cd(null,y,8,a,null))
return y},
eK:function(){if(this.a!==0)throw H.f(new P.aj("Future already completed"))
this.a=1},
gme:function(){return this.c},
gcV:function(){return this.c},
hK:function(a){this.a=4
this.c=a},
hI:function(a){this.a=8
this.c=a},
m6:function(a,b){this.hI(new P.bT(a,b))},
dv:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ch(null,null,z,new P.rq(this,a))}else{a.a=this.c
this.c=a}},
dM:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.ghv()
z.a=y}return y},
bY:function(a){var z,y
z=J.B(a)
if(!!z.$isaO)if(!!z.$isa2)P.eA(a,this)
else P.hZ(a,this)
else{y=this.dM()
this.hK(a)
P.bQ(this,y)}},
fZ:function(a){var z=this.dM()
this.hK(a)
P.bQ(this,z)},
bu:[function(a,b){var z=this.dM()
this.hI(new P.bT(a,b))
P.bQ(this,z)},function(a){return this.bu(a,null)},"o7","$2","$1","gck",2,2,16,0],
em:function(a){var z
if(a==null);else{z=J.B(a)
if(!!z.$isaO){if(!!z.$isa2){z=a.a
if(z>=4&&z===8){this.eK()
z=this.b
z.toString
P.ch(null,null,z,new P.rs(this,a))}else P.eA(a,this)}else P.hZ(a,this)
return}}this.eK()
z=this.b
z.toString
P.ch(null,null,z,new P.rt(this,a))},
en:function(a,b){var z
this.eK()
z=this.b
z.toString
P.ch(null,null,z,new P.rr(this,a,b))},
$isaO:1,
static:{hZ:function(a,b){var z,y,x,w
b.sdN(2)
try{a.di(new P.ru(b),new P.rv(b))}catch(x){w=H.ad(x)
z=w
y=H.at(x)
P.li(new P.rw(b,z,y))}},eA:function(a,b){var z
b.a=2
z=new P.cd(null,b,0,null,null)
if(a.a>=4)P.bQ(a,z)
else a.dv(z)},bQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.gl1()
if(b==null){if(w){v=z.a.gcV()
y=z.a.gcB()
x=J.bm(v)
u=v.gbt()
y.toString
P.cg(null,null,y,x,u)}return}for(;b.ghv()!=null;b=t){t=b.a
b.a=null
P.bQ(z.a,b)}x.a=!0
s=w?null:z.a.gme()
x.b=s
x.c=!1
y=!w
if(!y||b.gia()||b.c===8){r=b.gcB()
if(w){u=z.a.gcB()
u.toString
if(u==null?r!=null:u!==r){u=u.gfa()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gcV()
y=z.a.gcB()
x=J.bm(v)
u=v.gbt()
y.toString
P.cg(null,null,y,x,u)
return}q=$.H
if(q==null?r!=null:q!==r)$.H=r
else q=null
if(y){if(b.gia())x.a=new P.ry(x,b,s,r).$0()}else new P.rx(z,x,b,r).$0()
if(b.gn2())new P.rz(z,x,w,b,r).$0()
if(q!=null)$.H=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.B(y).$isaO}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.a2)if(p.a>=4){o.a=2
z.a=p
b=new P.cd(null,o,0,null,null)
y=p
continue}else P.eA(p,o)
else P.hZ(p,o)
return}}o=b.b
b=o.dM()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
rq:{
"^":"r:1;a,b",
$0:function(){P.bQ(this.a,this.b)}},
ru:{
"^":"r:0;a",
$1:function(a){this.a.fZ(a)}},
rv:{
"^":"r:17;a",
$2:function(a,b){this.a.bu(a,b)},
$1:function(a){return this.$2(a,null)}},
rw:{
"^":"r:1;a,b,c",
$0:function(){this.a.bu(this.b,this.c)}},
rs:{
"^":"r:1;a,b",
$0:function(){P.eA(this.b,this.a)}},
rt:{
"^":"r:1;a,b",
$0:function(){this.a.fZ(this.b)}},
rr:{
"^":"r:1;a,b,c",
$0:function(){this.a.bu(this.b,this.c)}},
ry:{
"^":"r:47;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.eb(this.b.glj(),this.c)
return!0}catch(x){w=H.ad(x)
z=w
y=H.at(x)
this.a.b=new P.bT(z,y)
return!1}}},
rx:{
"^":"r:3;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gcV()
y=!0
r=this.c
if(r.gn3()){x=r.d
try{y=this.d.eb(x,J.bm(z))}catch(q){r=H.ad(q)
w=r
v=H.at(q)
r=J.bm(z)
p=w
o=(r==null?p==null:r===p)?z:new P.bT(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.dz()
p=H.cj(p,[p,p]).c0(r)
n=this.d
m=this.b
if(p)m.b=n.nL(u,J.bm(z),z.gbt())
else m.b=n.eb(u,J.bm(z))}catch(q){r=H.ad(q)
t=r
s=H.at(q)
r=J.bm(z)
p=t
o=(r==null?p==null:r===p)?z:new P.bT(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
rz:{
"^":"r:3;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.iw(this.d.gmf())
z.a=w
v=w}catch(u){z=H.ad(u)
y=z
x=H.at(u)
if(this.c){z=J.bm(this.a.a.gcV())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gcV()
else v.b=new P.bT(y,x)
v.a=!1
return}if(!!J.B(v).$isaO){t=this.d
s=t.gnJ(t)
s.sla(!0)
this.b.c=!0
v.di(new P.rA(this.a,s),new P.rB(z,s))}}},
rA:{
"^":"r:0;a,b",
$1:function(a){P.bQ(this.a.a,new P.cd(null,this.b,0,null,null))}},
rB:{
"^":"r:17;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.a2)){y=H.p(new P.a2(0,$.H,null),[null])
z.a=y
y.m6(a,b)}P.bQ(z.a,new P.cd(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
kz:{
"^":"j;a,o4:b<,cF:c@",
mm:function(){return this.a.$0()}},
aC:{
"^":"j;",
cE:function(a,b){return H.p(new P.rO(b,this),[H.an(this,"aC",0),null])},
aH:function(a,b){var z,y
z={}
y=H.p(new P.a2(0,$.H,null),[null])
z.a=null
z.a=this.aL(new P.pS(z,this,b,y),!0,new P.pT(y),y.gck())
return y},
gm:function(a){var z,y
z={}
y=H.p(new P.a2(0,$.H,null),[P.o])
z.a=0
this.aL(new P.pY(z),!0,new P.pZ(z,y),y.gck())
return y},
gY:function(a){var z,y
z={}
y=H.p(new P.a2(0,$.H,null),[P.ab])
z.a=null
z.a=this.aL(new P.pU(z,y),!0,new P.pV(y),y.gck())
return y},
cG:function(a){var z,y
z=H.p([],[H.an(this,"aC",0)])
y=H.p(new P.a2(0,$.H,null),[[P.w,H.an(this,"aC",0)]])
this.aL(new P.q_(this,z),!0,new P.q0(z,y),y.gck())
return y},
b3:function(a,b){var z=H.p(new P.rZ(b,this),[null])
if(typeof b!=="number"||Math.floor(b)!==b||b<0)H.K(P.ak(b))
return z},
gac:function(a){var z,y
z={}
y=H.p(new P.a2(0,$.H,null),[H.an(this,"aC",0)])
z.a=null
z.a=this.aL(new P.pO(z,this,y),!0,new P.pP(y),y.gck())
return y},
gaw:function(a){var z,y
z={}
y=H.p(new P.a2(0,$.H,null),[H.an(this,"aC",0)])
z.a=null
z.b=!1
this.aL(new P.pW(z,this),!0,new P.pX(z,y),y.gck())
return y},
S:function(a){return this.gm(this).$0()}},
pS:{
"^":"r;a,b,c,d",
$1:function(a){P.tq(new P.pQ(this.c,a),new P.pR(),P.th(this.a.a,this.d))},
$signature:function(){return H.cT(function(a){return{func:1,args:[a]}},this.b,"aC")}},
pQ:{
"^":"r:1;a,b",
$0:function(){return this.a.$1(this.b)}},
pR:{
"^":"r:0;",
$1:function(a){}},
pT:{
"^":"r:1;a",
$0:function(){this.a.bY(null)}},
pY:{
"^":"r:0;a",
$1:function(a){++this.a.a}},
pZ:{
"^":"r:1;a,b",
$0:function(){this.b.bY(this.a.a)}},
pU:{
"^":"r:0;a,b",
$1:function(a){P.kV(this.a.a,this.b,!1)}},
pV:{
"^":"r:1;a",
$0:function(){this.a.bY(!0)}},
q_:{
"^":"r;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.cT(function(a){return{func:1,args:[a]}},this.a,"aC")}},
q0:{
"^":"r:1;a,b",
$0:function(){this.b.bY(this.a)}},
pO:{
"^":"r;a,b,c",
$1:function(a){P.kV(this.a.a,this.c,a)},
$signature:function(){return H.cT(function(a){return{func:1,args:[a]}},this.b,"aC")}},
pP:{
"^":"r:1;a",
$0:function(){var z,y,x,w
try{x=H.aJ()
throw H.f(x)}catch(w){x=H.ad(w)
z=x
y=H.at(w)
P.kX(this.a,z,y)}}},
pW:{
"^":"r;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$signature:function(){return H.cT(function(a){return{func:1,args:[a]}},this.b,"aC")}},
pX:{
"^":"r:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.bY(x.a)
return}try{x=H.aJ()
throw H.f(x)}catch(w){x=H.ad(w)
z=x
y=H.at(w)
P.kX(this.b,z,y)}}},
pN:{
"^":"j;"},
i4:{
"^":"j;dN:b?",
glu:function(){if((this.b&8)===0)return this.a
return this.a.gee()},
ev:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.kQ(null,null,0)
this.a=z}return z}y=this.a
y.gee()
return y.gee()},
gdO:function(){if((this.b&8)!==0)return this.a.gee()
return this.a},
fR:function(){if((this.b&4)!==0)return new P.aj("Cannot add event after closing")
return new P.aj("Cannot add event while adding a stream")},
h9:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$iU():H.p(new P.a2(0,$.H,null),[null])
this.c=z}return z},
a4:[function(a,b){var z=this.b
if(z>=4)throw H.f(this.fR())
if((z&1)!==0)this.cz(b)
else if((z&3)===0)this.ev().a4(0,new P.ew(b,null))},"$1","ghU",2,0,function(){return H.cT(function(a){return{func:1,void:true,args:[a]}},this.$receiver,"i4")}],
dR:function(a){var z=this.b
if((z&4)!==0)return this.h9()
if(z>=4)throw H.f(this.fR())
z|=4
this.b=z
if((z&1)!==0)this.cZ()
else if((z&3)===0)this.ev().a4(0,C.U)
return this.h9()},
cj:function(a){var z=this.b
if((z&1)!==0)this.cz(a)
else if((z&3)===0)this.ev().a4(0,new P.ew(a,null))},
ma:function(a,b,c,d){var z,y,x,w
if((this.b&3)!==0)throw H.f(new P.aj("Stream has already been listened to."))
z=$.H
y=H.p(new P.ri(this,null,null,null,z,d?1:0,null,null),[null])
y.du(a,b,c,d)
x=this.glu()
z=this.b|=1
if((z&8)!==0){w=this.a
w.see(y)
w.e9()}else this.a=y
y.m7(x)
y.eH(new P.t5(this))
return y},
m0:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.d3()
this.a=null
this.b=this.b&4294967286|2
if(this.geO()!=null)if(z==null)try{z=this.cs()}catch(w){v=H.ad(w)
y=v
x=H.at(w)
u=H.p(new P.a2(0,$.H,null),[null])
u.en(y,x)
z=u}else z=z.cL(this.geO())
v=new P.t4(this)
if(z!=null)z=z.cL(v)
else v.$0()
return z}},
t5:{
"^":"r:1;a",
$0:function(){P.ib(this.a.ghw())}},
t4:{
"^":"r:3;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.em(null)}},
t8:{
"^":"j;",
cz:function(a){this.gdO().cj(a)},
cZ:function(){this.gdO().fV()}},
ra:{
"^":"j;",
cz:function(a){this.gdO().cS(new P.ew(a,null))},
cZ:function(){this.gdO().cS(C.U)}},
r9:{
"^":"t2;hw:d<,ct:e<,cu:f<,eO:r<,a,b,c",
cs:function(){return this.r.$0()}},
t2:{
"^":"i4+ra;"},
t7:{
"^":"t3;hw:d<,ct:e<,cu:f<,eO:r<,a,b,c",
cs:function(){return this.r.$0()}},
t3:{
"^":"i4+t8;"},
hX:{
"^":"t6;a",
cT:function(a,b,c,d){return this.a.ma(a,b,c,d)},
gav:function(a){return(H.bs(this.a)^892482866)>>>0},
A:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.hX))return!1
return b.a===this.a}},
ri:{
"^":"hW;x,a,b,c,d,e,f,r",
cs:function(){return this.x.m0(this)},
eP:[function(){var z=this.x
if((z.b&8)!==0)z.a.fn(0)
P.ib(z.gct())},"$0","gct",0,0,3],
eQ:[function(){var z=this.x
if((z.b&8)!==0)z.a.e9()
P.ib(z.gcu())},"$0","gcu",0,0,3]},
zV:{
"^":"j;"},
hW:{
"^":"j;a,b,c,cB:d<,dN:e?,f,r",
m7:function(a){if(a==null)return
this.r=a
if(!a.gY(a)){this.e=(this.e|64)>>>0
this.r.dq(this)}},
fo:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.i0()
if((z&4)===0&&(this.e&32)===0)this.eH(this.gct())},
fn:function(a){return this.fo(a,null)},
e9:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gY(z)}else z=!1
if(z)this.r.dq(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.eH(this.gcu())}}}},
d3:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.ep()
return this.f},
ep:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.i0()
if((this.e&32)===0)this.r=null
this.f=this.cs()},
cj:["iY",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cz(a)
else this.cS(new P.ew(a,null))}],
ek:["iZ",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.hG(a,b)
else this.cS(new P.rl(a,b,null))}],
fV:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cZ()
else this.cS(C.U)},
eP:[function(){},"$0","gct",0,0,3],
eQ:[function(){},"$0","gcu",0,0,3],
cs:function(){return},
cS:function(a){var z,y
z=this.r
if(z==null){z=new P.kQ(null,null,0)
this.r=z}z.a4(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.dq(this)}},
cz:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.fu(this.a,a)
this.e=(this.e&4294967263)>>>0
this.eq((z&4)!==0)},
hG:function(a,b){var z,y
z=this.e
y=new P.re(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.ep()
z=this.f
if(!!J.B(z).$isaO)z.cL(y)
else y.$0()}else{y.$0()
this.eq((z&4)!==0)}},
cZ:function(){var z,y
z=new P.rd(this)
this.ep()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.B(y).$isaO)y.cL(z)
else z.$0()},
eH:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.eq((z&4)!==0)},
eq:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gY(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gY(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.eP()
else this.eQ()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.dq(this)},
du:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.ia(b==null?P.tC():b,z)
this.c=c==null?P.tB():c},
static:{rc:function(a,b,c,d){var z=$.H
z=new P.hW(null,null,null,z,d?1:0,null,null)
z.du(a,b,c,d)
return z}}},
re:{
"^":"r:3;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.dz()
x=H.cj(x,[x,x]).c0(y)
w=z.d
v=this.b
u=z.b
if(x)w.nM(u,v,this.c)
else w.fu(u,v)
z.e=(z.e&4294967263)>>>0}},
rd:{
"^":"r:3;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.ix(z.c)
z.e=(z.e&4294967263)>>>0}},
t6:{
"^":"aC;",
aL:function(a,b,c,d){return this.cT(a,d,c,!0===b)},
e0:function(a,b,c){return this.aL(a,null,b,c)},
cT:function(a,b,c,d){return P.rc(a,b,c,d)}},
kC:{
"^":"j;cF:a@"},
ew:{
"^":"kC;b,a",
fp:function(a){a.cz(this.b)}},
rl:{
"^":"kC;d6:b>,bt:c<,a",
fp:function(a){a.hG(this.b,this.c)}},
rk:{
"^":"j;",
fp:function(a){a.cZ()},
gcF:function(){return},
scF:function(a){throw H.f(new P.aj("No events after a done."))}},
rQ:{
"^":"j;dN:a?",
dq:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.li(new P.rR(this,a))
this.a=1},
i0:function(){if(this.a===1)this.a=3}},
rR:{
"^":"r:1;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.n_(this.b)}},
kQ:{
"^":"rQ;b,c,a",
gY:function(a){return this.c==null},
a4:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.scF(b)
this.c=b}},
n_:function(a){var z,y
z=this.b
y=z.gcF()
this.b=y
if(y==null)this.c=null
z.fp(a)}},
tj:{
"^":"r:1;a,b,c",
$0:function(){return this.a.bu(this.b,this.c)}},
ti:{
"^":"r:48;a,b",
$2:function(a,b){return P.tg(this.a,this.b,a,b)}},
tk:{
"^":"r:1;a,b",
$0:function(){return this.a.bY(this.b)}},
dt:{
"^":"aC;",
aL:function(a,b,c,d){return this.cT(a,d,c,!0===b)},
e0:function(a,b,c){return this.aL(a,null,b,c)},
cT:function(a,b,c,d){return P.rp(this,a,b,c,d,H.an(this,"dt",0),H.an(this,"dt",1))},
eI:function(a,b){b.cj(a)},
$asaC:function(a,b){return[b]}},
ez:{
"^":"hW;x,y,a,b,c,d,e,f,r",
cj:function(a){if((this.e&2)!==0)return
this.iY(a)},
ek:function(a,b){if((this.e&2)!==0)return
this.iZ(a,b)},
eP:[function(){var z=this.y
if(z==null)return
z.fn(0)},"$0","gct",0,0,3],
eQ:[function(){var z=this.y
if(z==null)return
z.e9()},"$0","gcu",0,0,3],
cs:function(){var z=this.y
if(z!=null){this.y=null
z.d3()}return},
oe:[function(a){this.x.eI(a,this)},"$1","gkY",2,0,function(){return H.cT(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"ez")}],
og:[function(a,b){this.ek(a,b)},"$2","gl_",4,0,55],
of:[function(){this.fV()},"$0","gkZ",0,0,3],
fM:function(a,b,c,d,e,f,g){var z,y
z=this.gkY()
y=this.gl_()
this.y=this.x.a.e0(z,this.gkZ(),y)},
static:{rp:function(a,b,c,d,e,f,g){var z=$.H
z=H.p(new P.ez(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.du(b,c,d,e)
z.fM(a,b,c,d,e,f,g)
return z}}},
rO:{
"^":"dt;b,a",
eI:function(a,b){var z,y,x,w,v
z=null
try{z=this.mb(a)}catch(w){v=H.ad(w)
y=v
x=H.at(w)
P.tf(b,y,x)
return}b.cj(z)},
mb:function(a){return this.b.$1(a)}},
t1:{
"^":"ez;z,x,y,a,b,c,d,e,f,r",
gki:function(){return this.z},
$asez:function(a){return[a,a]}},
rZ:{
"^":"dt;b,a",
cT:function(a,b,c,d){var z,y,x
z=H.ar(this,0)
y=$.H
x=d?1:0
x=new P.t1(this.b,this,null,null,null,null,y,x,null,null)
x.$builtinTypeInfo=this.$builtinTypeInfo
x.du(a,b,c,d)
x.fM(this,a,b,c,d,z,z)
return x},
eI:function(a,b){var z,y
z=b.gki()
y=J.u(z)
if(y.T(z,0)){b.z=y.p(z,1)
return}b.cj(a)},
$asdt:function(a){return[a,a]},
$asaC:null},
bT:{
"^":"j;d6:a>,bt:b<",
E:function(a){return H.l(this.a)},
$isaB:1},
te:{
"^":"j;"},
tp:{
"^":"r:1;a,b",
$0:function(){var z=this.a
throw H.f(new P.t9(z,P.ta(z,this.b)))}},
rT:{
"^":"te;",
gfa:function(){return this},
ix:function(a){var z,y,x,w
try{if(C.i===$.H){x=a.$0()
return x}x=P.kY(null,null,this,a)
return x}catch(w){x=H.ad(w)
z=x
y=H.at(w)
return P.cg(null,null,this,z,y)}},
fu:function(a,b){var z,y,x,w
try{if(C.i===$.H){x=a.$1(b)
return x}x=P.l_(null,null,this,a,b)
return x}catch(w){x=H.ad(w)
z=x
y=H.at(w)
return P.cg(null,null,this,z,y)}},
nM:function(a,b,c){var z,y,x,w
try{if(C.i===$.H){x=a.$2(b,c)
return x}x=P.kZ(null,null,this,a,b,c)
return x}catch(w){x=H.ad(w)
z=x
y=H.at(w)
return P.cg(null,null,this,z,y)}},
f2:function(a,b){if(b)return new P.rU(this,a)
else return new P.rV(this,a)},
mi:function(a,b){if(b)return new P.rW(this,a)
else return new P.rX(this,a)},
h:function(a,b){return},
iw:function(a){if($.H===C.i)return a.$0()
return P.kY(null,null,this,a)},
eb:function(a,b){if($.H===C.i)return a.$1(b)
return P.l_(null,null,this,a,b)},
nL:function(a,b,c){if($.H===C.i)return a.$2(b,c)
return P.kZ(null,null,this,a,b,c)}},
rU:{
"^":"r:1;a,b",
$0:function(){return this.a.ix(this.b)}},
rV:{
"^":"r:1;a,b",
$0:function(){return this.a.iw(this.b)}},
rW:{
"^":"r:0;a,b",
$1:function(a){return this.a.fu(this.b,a)}},
rX:{
"^":"r:0;a,b",
$1:function(a){return this.a.eb(this.b,a)}}}],["","",,P,{
"^":"",
Z:function(){return H.p(new H.dd(0,null,null,null,null,null,0),[null,null])},
aP:function(a){return H.l8(a,H.p(new H.dd(0,null,null,null,null,null,0),[null,null]))},
nM:function(a,b,c){var z,y
if(P.i9(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$cS()
y.push(a)
try{P.tl(a,z)}finally{if(0>=y.length)return H.a(y,0)
y.pop()}y=P.k_(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
dP:function(a,b,c){var z,y,x
if(P.i9(a))return b+"..."+c
z=new P.bN(b)
y=$.$get$cS()
y.push(a)
try{x=z
x.a=P.k_(x.gcl(),a,", ")}finally{if(0>=y.length)return H.a(y,0)
y.pop()}y=z
y.a=y.gcl()+c
y=z.gcl()
return y.charCodeAt(0)==0?y:y},
i9:function(a){var z,y
for(z=0;y=$.$get$cS(),z<y.length;++z)if(a===y[z])return!0
return!1},
tl:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gad(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.W())return
w=H.l(z.ga8())
b.push(w)
y+=w.length+2;++x}if(!z.W()){if(x<=5)return
if(0>=b.length)return H.a(b,0)
v=b.pop()
if(0>=b.length)return H.a(b,0)
u=b.pop()}else{t=z.ga8();++x
if(!z.W()){if(x<=4){b.push(H.l(t))
return}v=H.l(t)
if(0>=b.length)return H.a(b,0)
u=b.pop()
y+=v.length+2}else{s=z.ga8();++x
for(;z.W();t=s,s=r){r=z.ga8();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.a(b,0)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.l(t)
v=H.l(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.a(b,0)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
c2:function(a,b,c,d,e){return H.p(new H.dd(0,null,null,null,null,null,0),[d,e])},
b8:function(a,b){return P.rJ(a,b)},
bp:function(a,b,c,d){return H.p(new P.rG(0,null,null,null,null,null,0),[d])},
jj:function(a){var z,y,x
z={}
if(P.i9(a))return"{...}"
y=new P.bN("")
try{$.$get$cS().push(a)
x=y
x.a=x.gcl()+"{"
z.a=!0
J.lq(a,new P.of(z,y))
z=y
z.a=z.gcl()+"}"}finally{z=$.$get$cS()
if(0>=z.length)return H.a(z,0)
z.pop()}z=y.gcl()
return z.charCodeAt(0)==0?z:z},
rI:{
"^":"dd;a,b,c,d,e,f,r",
da:function(a){return H.ve(a)&0x3ffffff},
dc:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gib()
if(x==null?b==null:x===b)return y}return-1},
static:{rJ:function(a,b){return H.p(new P.rI(0,null,null,null,null,null,0),[a,b])}}},
rG:{
"^":"rC;a,b,c,d,e,f,r",
gad:function(a){var z=new P.jc(this,this.r,null,null)
z.c=this.e
return z},
gm:function(a){return this.a},
gY:function(a){return this.a===0},
gbe:function(a){return this.a!==0},
b6:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.kg(b)},
kg:function(a){var z=this.d
if(z==null)return!1
return this.dF(z[this.dB(a)],a)>=0},
fj:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.b6(0,a)?a:null
else return this.lf(a)},
lf:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.dB(a)]
x=this.dF(y,a)
if(x<0)return
return J.e(y,x).gh8()},
aH:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.f(new P.aN(this))
z=z.b}},
gac:function(a){var z=this.e
if(z==null)throw H.f(new P.aj("No elements"))
return z.a},
gaw:function(a){var z=this.f
if(z==null)throw H.f(new P.aj("No elements"))
return z.a},
a4:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.fW(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.fW(x,b)}else return this.bk(b)},
bk:function(a){var z,y,x
z=this.d
if(z==null){z=P.rH()
this.d=z}y=this.dB(a)
x=z[y]
if(x==null)z[y]=[this.er(a)]
else{if(this.dF(x,a)>=0)return!1
x.push(this.er(a))}return!0},
cc:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.fX(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.fX(this.c,b)
else return this.m1(b)},
m1:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.dB(a)]
x=this.dF(y,a)
if(x<0)return!1
this.fY(y.splice(x,1)[0])
return!0},
cC:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
fW:function(a,b){if(a[b]!=null)return!1
a[b]=this.er(b)
return!0},
fX:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.fY(z)
delete a[b]
return!0},
er:function(a){var z,y
z=new P.o8(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
fY:function(a){var z,y
z=a.gkf()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
dB:function(a){return J.aG(a)&0x3ffffff},
dF:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.k(a[y].gh8(),b))return y
return-1},
S:function(a){return this.gm(this).$0()},
$isW:1,
static:{rH:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
o8:{
"^":"j;h8:a<,b,kf:c<"},
jc:{
"^":"j;a,b,c,d",
ga8:function(){return this.d},
W:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.aN(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
rC:{
"^":"pz;"},
c3:{
"^":"oy;"},
oy:{
"^":"j+b0;",
$isw:1,
$asw:null,
$isW:1},
b0:{
"^":"j;",
gad:function(a){return new H.jd(a,this.gm(a),0,null)},
aJ:function(a,b){return this.h(a,b)},
aH:function(a,b){var z,y
z=this.gm(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gm(a))throw H.f(new P.aN(a))}},
gY:function(a){return this.gm(a)===0},
gbe:function(a){return!this.gY(a)},
gac:function(a){if(this.gm(a)===0)throw H.f(H.aJ())
return this.h(a,0)},
gaw:function(a){if(this.gm(a)===0)throw H.f(H.aJ())
return this.h(a,this.gm(a)-1)},
o_:function(a,b){return H.p(new H.r0(a,b),[H.an(a,"b0",0)])},
cE:function(a,b){return H.p(new H.dS(a,b),[null,null])},
b3:function(a,b){return H.ec(a,b,null,H.an(a,"b0",0))},
bQ:function(a,b){var z,y,x
if(b){z=H.p([],[H.an(a,"b0",0)])
C.e.sm(z,this.gm(a))}else z=H.p(Array(this.gm(a)),[H.an(a,"b0",0)])
for(y=0;y<this.gm(a);++y){x=this.h(a,y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
cG:function(a){return this.bQ(a,!0)},
a4:function(a,b){var z=this.gm(a)
this.sm(a,z+1)
this.k(a,z,b)},
ay:function(a,b,c){var z,y,x,w,v,u
z=this.gm(a)
if(c==null)c=z
P.bu(b,c,z,null,null,null)
y=J.m(c,b)
x=H.p([],[H.an(a,"b0",0)])
C.e.sm(x,y)
if(typeof y!=="number")return H.c(y)
w=J.G(b)
v=0
for(;v<y;++v){u=this.h(a,w.i(b,v))
if(v>=x.length)return H.a(x,v)
x[v]=u}return x},
ag:function(a,b,c,d){var z,y
P.bu(b,c,this.gm(a),null,null,null)
for(z=b;y=J.u(z),y.I(z,c);z=y.i(z,1))this.k(a,z,d)},
aj:["fJ",function(a,b,c,d,e){var z,y,x,w,v,u,t,s
P.bu(b,c,this.gm(a),null,null,null)
z=J.m(c,b)
y=J.B(z)
if(y.A(z,0))return
if(J.a7(e,0))H.K(P.ae(e,0,null,"skipCount",null))
x=J.B(d)
if(!!x.$isw){w=e
v=d}else{v=x.b3(d,e).bQ(0,!1)
w=0}x=J.G(w)
u=J.y(v)
if(J.V(x.i(w,z),u.gm(v)))throw H.f(H.j7())
if(x.I(w,b))for(t=y.p(z,1),y=J.G(b);s=J.u(t),s.a9(t,0);t=s.p(t,1))this.k(a,y.i(b,t),u.h(v,x.i(w,t)))
else{if(typeof z!=="number")return H.c(z)
y=J.G(b)
t=0
for(;t<z;++t)this.k(a,y.i(b,t),u.h(v,x.i(w,t)))}}],
dd:function(a,b,c){var z
c=this.gm(a)-1
for(z=c;z>=0;--z)if(J.k(this.h(a,z),b))return z
return-1},
e_:function(a,b){return this.dd(a,b,null)},
E:function(a){return P.dP(a,"[","]")},
$isw:1,
$asw:null,
$isW:1},
of:{
"^":"r:5;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.l(a)
z.a=y+": "
z.a+=H.l(b)}},
o9:{
"^":"aI;a,b,c,d",
gad:function(a){return new P.rK(this,this.c,this.d,this.b,null)},
aH:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.a(x,y)
b.$1(x[y])
if(z!==this.d)H.K(new P.aN(this))}},
gY:function(a){return this.b===this.c},
gm:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gac:function(a){var z,y
z=this.b
if(z===this.c)throw H.f(H.aJ())
y=this.a
if(z>=y.length)return H.a(y,z)
return y[z]},
gaw:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.f(H.aJ())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.a(z,y)
return z[y]},
a4:function(a,b){this.bk(b)},
cC:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.a(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
E:function(a){return P.dP(this,"{","}")},
iv:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.f(H.aJ());++this.d
y=this.a
x=y.length
if(z>=x)return H.a(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
bk:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.a(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.hl();++this.d},
hl:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.p(z,[H.ar(this,0)])
z=this.a
x=this.b
w=z.length-x
C.e.aj(y,0,w,z,x)
C.e.aj(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
js:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.p(z,[b])},
S:function(a){return this.gm(this).$0()},
$isW:1,
static:{fI:function(a,b){var z=H.p(new P.o9(null,0,0,0),[b])
z.js(a,b)
return z}}},
rK:{
"^":"j;a,b,c,d,e",
ga8:function(){return this.e},
W:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.K(new P.aN(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.a(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
pA:{
"^":"j;",
gY:function(a){return this.gm(this)===0},
gbe:function(a){return this.gm(this)!==0},
cE:function(a,b){return H.p(new H.iJ(this,b),[H.ar(this,0),null])},
E:function(a){return P.dP(this,"{","}")},
aH:function(a,b){var z
for(z=this.gad(this);z.W();)b.$1(z.d)},
b3:function(a,b){return H.jP(this,b,H.ar(this,0))},
gac:function(a){var z=this.gad(this)
if(!z.W())throw H.f(H.aJ())
return z.d},
gaw:function(a){var z,y
z=this.gad(this)
if(!z.W())throw H.f(H.aJ())
do y=z.d
while(z.W())
return y},
S:function(a){return this.gm(this).$0()},
$isW:1},
pz:{
"^":"pA;"}}],["","",,P,{
"^":"",
m2:{
"^":"j;"},
m5:{
"^":"j;"},
mn:{
"^":"m2;"},
qH:{
"^":"mn;a",
gZ:function(a){return"utf-8"},
gmL:function(){return new P.qI()}},
qI:{
"^":"m5;",
mw:function(a,b,c){var z,y,x,w
z=C.a.gm(a)
P.bu(b,c,z,null,null,null)
y=z.p(0,b)
x=new Uint8Array(H.i(y.q(0,3)))
w=new P.tb(0,0,x)
w.kJ(a,b,z)
w.hS(C.a.P(a,z.p(0,1)),0)
return C.h.ay(x,0,w.b)},
f7:function(a){return this.mw(a,0,null)}},
tb:{
"^":"j;a,b,c",
hS:function(a,b){var z,y,x,w,v
z=this.c
y=this.b
if((b&64512)===56320){x=65536+((a&1023)<<10>>>0)|b&1023
w=y+1
this.b=w
v=z.length
if(y>=v)return H.a(z,y)
z[y]=(240|x>>>18)>>>0
y=w+1
this.b=y
if(w>=v)return H.a(z,w)
z[w]=128|x>>>12&63
w=y+1
this.b=w
if(y>=v)return H.a(z,y)
z[y]=128|x>>>6&63
this.b=w+1
if(w>=v)return H.a(z,w)
z[w]=128|x&63
return!0}else{w=y+1
this.b=w
v=z.length
if(y>=v)return H.a(z,y)
z[y]=224|a>>>12
y=w+1
this.b=y
if(w>=v)return H.a(z,w)
z[w]=128|a>>>6&63
this.b=y+1
if(y>=v)return H.a(z,y)
z[y]=128|a&63
return!1}},
kJ:function(a,b,c){var z,y,x,w,v,u,t,s
if(b!==c&&(J.eP(a,J.m(c,1))&64512)===55296)c=J.m(c,1)
if(typeof c!=="number")return H.c(c)
z=this.c
y=z.length
x=J.bw(a)
w=b
for(;w<c;++w){v=x.P(a,w)
if(v<=127){u=this.b
if(u>=y)break
this.b=u+1
z[u]=v}else if((v&64512)===55296){if(this.b+3>=y)break
t=w+1
if(this.hS(v,C.c.P(a,t)))w=t}else if(v<=2047){u=this.b
s=u+1
if(s>=y)break
this.b=s
if(u>=y)return H.a(z,u)
z[u]=192|v>>>6
this.b=s+1
z[s]=128|v&63}else{u=this.b
if(u+2>=y)break
s=u+1
this.b=s
if(u>=y)return H.a(z,u)
z[u]=224|v>>>12
u=s+1
this.b=u
if(s>=y)return H.a(z,s)
z[s]=128|v>>>6&63
this.b=u+1
if(u>=y)return H.a(z,u)
z[u]=128|v&63}}return w}}}],["","",,P,{
"^":"",
tr:function(a){return H.q3(a)},
q1:function(a,b,c){var z,y,x,w
if(b<0)throw H.f(P.ae(b,0,J.M(a),null,null))
z=c==null
if(!z&&c<b)throw H.f(P.ae(c,b,J.M(a),null,null))
y=J.co(a)
for(x=0;x<b;++x)if(!y.W())throw H.f(P.ae(b,0,x,null,null))
w=[]
if(z)for(;y.W();)w.push(y.ga8())
else for(x=b;x<c;++x){if(!y.W())throw H.f(P.ae(c,b,x,null,null))
w.push(y.ga8())}return H.jC(w)},
fb:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.bS(a)
if(typeof a==="string")return JSON.stringify(a)
return P.mo(a)},
mo:function(a){var z=J.B(a)
if(!!z.$isr)return z.E(a)
return H.e1(a)},
cu:function(a){return new P.ro(a)},
je:function(a,b,c){var z,y,x
z=J.nN(a,c)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
cx:function(a,b,c){var z,y
z=H.p([],[c])
for(y=J.co(a);y.W();)z.push(y.ga8())
if(b)return z
z.fixed$length=Array
return z},
dB:function(a){var z=H.l(a)
H.lg(z)},
c9:function(a,b,c){var z
if(typeof a==="object"&&a!==null&&a.constructor===Array){z=a.length
c=P.bu(b,c,z,null,null,null)
return H.jC(b>0||J.a7(c,z)?C.e.ay(a,b,c):a)}if(!!J.B(a).$isfW)return H.oM(a,b,P.bu(b,c,a.length,null,null,null))
return P.q1(a,b,c)},
y8:{
"^":"r:56;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.tr(a)}},
ab:{
"^":"j;"},
"+bool":0,
iA:{
"^":"j;a,b",
A:function(a,b){if(b==null)return!1
if(!(b instanceof P.iA))return!1
return this.a===b.a&&this.b===b.b},
gav:function(a){return this.a},
E:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.m8(z?H.aQ(this).getUTCFullYear()+0:H.aQ(this).getFullYear()+0)
x=P.d2(z?H.aQ(this).getUTCMonth()+1:H.aQ(this).getMonth()+1)
w=P.d2(z?H.aQ(this).getUTCDate()+0:H.aQ(this).getDate()+0)
v=P.d2(z?H.aQ(this).getUTCHours()+0:H.aQ(this).getHours()+0)
u=P.d2(z?H.aQ(this).getUTCMinutes()+0:H.aQ(this).getMinutes()+0)
t=P.d2(z?H.aQ(this).getUTCSeconds()+0:H.aQ(this).getSeconds()+0)
s=P.m9(z?H.aQ(this).getUTCMilliseconds()+0:H.aQ(this).getMilliseconds()+0)
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
a4:function(a,b){return P.iB(this.a+b.gn6(),this.b)},
j3:function(a,b){if(Math.abs(a)>864e13)throw H.f(P.ak(a))},
static:{iB:function(a,b){var z=new P.iA(a,b)
z.j3(a,b)
return z},m8:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.l(z)
if(z>=10)return y+"00"+H.l(z)
return y+"000"+H.l(z)},m9:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},d2:function(a){if(a>=10)return""+a
return"0"+a}}},
au:{
"^":"cl;"},
"+double":0,
bg:{
"^":"j;cm:a<",
i:function(a,b){return new P.bg(this.a+b.gcm())},
p:function(a,b){return new P.bg(this.a-b.gcm())},
q:function(a,b){if(typeof b!=="number")return H.c(b)
return new P.bg(C.b.b_(this.a*b))},
ak:function(a,b){if(J.k(b,0))throw H.f(new P.nm())
if(typeof b!=="number")return H.c(b)
return new P.bg(C.b.ak(this.a,b))},
I:function(a,b){return this.a<b.gcm()},
T:function(a,b){return this.a>b.gcm()},
a6:function(a,b){return this.a<=b.gcm()},
a9:function(a,b){return this.a>=b.gcm()},
gn6:function(){return C.b.a3(this.a,1000)},
A:function(a,b){if(b==null)return!1
if(!(b instanceof P.bg))return!1
return this.a===b.a},
gav:function(a){return this.a&0x1FFFFFFF},
E:function(a){var z,y,x,w,v
z=new P.mk()
y=this.a
if(y<0)return"-"+new P.bg(-y).E(0)
x=z.$1(C.b.e5(C.b.a3(y,6e7),60))
w=z.$1(C.b.e5(C.b.a3(y,1e6),60))
v=new P.mj().$1(C.b.e5(y,1e6))
return H.l(C.b.a3(y,36e8))+":"+H.l(x)+":"+H.l(w)+"."+H.l(v)},
hT:function(a){return new P.bg(Math.abs(this.a))},
aa:function(a){return new P.bg(-this.a)},
static:{mi:function(a,b,c,d,e,f){if(typeof c!=="number")return H.c(c)
return new P.bg(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
mj:{
"^":"r:18;",
$1:function(a){if(a>=1e5)return H.l(a)
if(a>=1e4)return"0"+H.l(a)
if(a>=1000)return"00"+H.l(a)
if(a>=100)return"000"+H.l(a)
if(a>=10)return"0000"+H.l(a)
return"00000"+H.l(a)}},
mk:{
"^":"r:18;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
aB:{
"^":"j;",
gbt:function(){return H.at(this.$thrownJsError)}},
fX:{
"^":"aB;",
E:function(a){return"Throw of null."}},
bz:{
"^":"aB;a,b,Z:c>,d",
gex:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gew:function(){return""},
E:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.l(z)+")":""
z=this.d
x=z==null?"":": "+H.l(z)
w=this.gex()+y+x
if(!this.a)return w
v=this.gew()
u=P.fb(this.b)
return w+v+": "+H.l(u)},
static:{ak:function(a){return new P.bz(!1,null,null,a)},d0:function(a,b,c){return new P.bz(!0,a,b,c)},lI:function(a){return new P.bz(!0,null,a,"Must not be null")}}},
hk:{
"^":"bz;e,f,a,b,c,d",
gex:function(){return"RangeError"},
gew:function(){var z,y,x,w
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.l(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.l(z)
else{w=J.u(x)
if(w.T(x,z))y=": Not in range "+H.l(z)+".."+H.l(x)+", inclusive"
else y=w.I(x,z)?": Valid value range is empty":": Only valid value is "+H.l(z)}}return y},
static:{p6:function(a){return new P.hk(null,null,!1,null,null,a)},dh:function(a,b,c){return new P.hk(null,null,!0,a,b,"Value not in range")},ae:function(a,b,c,d,e){return new P.hk(b,c,!0,a,d,"Invalid value")},p7:function(a,b,c,d,e){if(typeof a!=="number")return a.I()
if(a<b||a>c)throw H.f(P.ae(a,b,c,d,e))},bu:function(a,b,c,d,e,f){if(typeof a!=="number")return H.c(a)
if(0>a||a>c)throw H.f(P.ae(a,0,c,"start",f))
if(b!=null){if(typeof b!=="number")return H.c(b)
if(a>b||b>c)throw H.f(P.ae(b,a,c,"end",f))
return b}return c}}},
nh:{
"^":"bz;e,m:f>,a,b,c,d",
gex:function(){return"RangeError"},
gew:function(){P.fb(this.e)
var z=": index should be less than "+H.l(this.f)
return J.a7(this.b,0)?": index must not be negative":z},
S:function(a){return this.f.$0()},
static:{c_:function(a,b,c,d,e){var z=e!=null?e:J.M(b)
return new P.nh(b,z,!0,a,c,"Index out of range")}}},
a_:{
"^":"aB;a",
E:function(a){return"Unsupported operation: "+this.a}},
dm:{
"^":"aB;a",
E:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.l(z):"UnimplementedError"}},
aj:{
"^":"aB;a",
E:function(a){return"Bad state: "+this.a}},
aN:{
"^":"aB;a",
E:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.l(P.fb(z))+"."}},
oA:{
"^":"j;",
E:function(a){return"Out of Memory"},
gbt:function(){return},
$isaB:1},
jW:{
"^":"j;",
E:function(a){return"Stack Overflow"},
gbt:function(){return},
$isaB:1},
m6:{
"^":"aB;a",
E:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
ro:{
"^":"j;a",
E:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.l(z)}},
d6:{
"^":"j;a,b,c",
E:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.l(z):"FormatException"
x=this.c
w=this.b
if(typeof w!=="string")return x!=null?y+(" (at offset "+H.l(x)+")"):y
if(x!=null)if(!(x<0)){z=J.M(w)
if(typeof z!=="number")return H.c(z)
z=x>z}else z=!0
else z=!1
if(z)x=null
if(x==null){z=J.y(w)
if(J.V(z.gm(w),78))w=z.as(w,0,75)+"..."
return y+"\n"+H.l(w)}for(z=J.y(w),v=1,u=0,t=null,s=0;s<x;++s){r=z.P(w,s)
if(r===10){if(u!==s||t!==!0)++v
u=s+1
t=!1}else if(r===13){++v
u=s+1
t=!0}}y=v>1?y+(" (at line "+v+", character "+(x-u+1)+")\n"):y+(" (at character "+(x+1)+")\n")
q=z.gm(w)
s=x
while(!0){p=z.gm(w)
if(typeof p!=="number")return H.c(p)
if(!(s<p))break
r=z.P(w,s)
if(r===10||r===13){q=s
break}++s}p=J.u(q)
if(J.V(p.p(q,u),78))if(x-u<75){o=u+75
n=u
m=""
l="..."}else{if(J.a7(p.p(q,x),75)){n=p.p(q,75)
o=q
l=""}else{n=x-36
o=x+36
l="..."}m="..."}else{o=q
n=u
m=""
l=""}k=z.as(w,n,o)
if(typeof n!=="number")return H.c(n)
return y+m+k+l+"\n"+C.c.q(" ",x-n+m.length)+"^\n"}},
nm:{
"^":"j;",
E:function(a){return"IntegerDivisionByZeroException"}},
mp:{
"^":"j;Z:a>",
E:function(a){return"Expando:"+H.l(this.a)},
h:function(a,b){var z=H.e0(b,"expando$values")
return z==null?null:H.e0(z,this.hh())},
k:function(a,b,c){var z=H.e0(b,"expando$values")
if(z==null){z=new P.j()
H.ha(b,"expando$values",z)}H.ha(z,this.hh(),c)},
hh:function(){var z,y
z=H.e0(this,"expando$key")
if(z==null){y=$.iK
$.iK=y+1
z="expando$key$"+y
H.ha(this,"expando$key",z)}return z}},
mL:{
"^":"j;"},
o:{
"^":"cl;"},
"+int":0,
aI:{
"^":"j;",
cE:function(a,b){return H.dR(this,b,H.an(this,"aI",0),null)},
aH:function(a,b){var z
for(z=this.gad(this);z.W();)b.$1(z.ga8())},
bQ:function(a,b){return P.cx(this,b,H.an(this,"aI",0))},
cG:function(a){return this.bQ(a,!0)},
gm:function(a){var z,y
z=this.gad(this)
for(y=0;z.W();)++y
return y},
gY:function(a){return!this.gad(this).W()},
gbe:function(a){return this.gY(this)!==!0},
b3:function(a,b){return H.jP(this,b,H.an(this,"aI",0))},
gac:function(a){var z=this.gad(this)
if(!z.W())throw H.f(H.aJ())
return z.ga8()},
gaw:function(a){var z,y
z=this.gad(this)
if(!z.W())throw H.f(H.aJ())
do y=z.ga8()
while(z.W())
return y},
aJ:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(P.lI("index"))
if(b<0)H.K(P.ae(b,0,null,"index",null))
for(z=this.gad(this),y=0;z.W();){x=z.ga8()
if(b===y)return x;++y}throw H.f(P.c_(b,this,"index",null,y))},
E:function(a){return P.nM(this,"(",")")},
S:function(a){return this.gm(this).$0()}},
fA:{
"^":"j;"},
w:{
"^":"j;",
$asw:null,
$isW:1},
"+List":0,
cz:{
"^":"j;"},
y9:{
"^":"j;",
E:function(a){return"null"}},
"+Null":0,
cl:{
"^":"j;"},
"+num":0,
j:{
"^":";",
A:function(a,b){return this===b},
gav:function(a){return H.bs(this)},
E:function(a){return H.e1(this)}},
oC:{
"^":"j;"},
bM:{
"^":"j;"},
pM:{
"^":"j;a,b",
iU:function(a){var z,y
z=this.a==null
if(!z&&this.b==null)return
y=$.dg
if(z)this.a=y.$0()
else{this.a=J.m(y.$0(),J.m(this.b,this.a))
this.b=null}},
iW:function(a){if(!(this.a!=null&&this.b==null))return
this.b=$.dg.$0()},
gmJ:function(){var z,y
z=this.a
if(z==null)return 0
y=this.b
return y==null?J.m($.dg.$0(),this.a):J.m(y,z)}},
am:{
"^":"j;",
$isoC:1},
"+String":0,
bN:{
"^":"j;cl:a<",
gm:function(a){return this.a.length},
gY:function(a){return this.a.length===0},
gbe:function(a){return this.a.length!==0},
E:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
S:function(a){return this.gm(this).$0()},
static:{k_:function(a,b,c){var z=J.co(b)
if(!z.W())return a
if(c.length===0){do a+=H.l(z.ga8())
while(z.W())}else{a+=H.l(z.ga8())
for(;z.W();)a=a+c+H.l(z.ga8())}return a}}},
k0:{
"^":"j;"},
ki:{
"^":"j;a,b,c,d,e,f,r,x,y",
gfe:function(a){var z=this.a
if(z==null)return""
if(J.bw(z).fH(z,"["))return C.c.as(z,1,z.length-1)
return z},
gfq:function(a){var z=this.b
if(z==null)return P.kj(this.d)
return z},
E:function(a){var z,y,x,w
z=this.d
y=""!==z?z+":":""
x=this.a
w=x==null
if(!w||C.c.fH(this.c,"//")||z==="file"){z=y+"//"
y=this.e
if(y.length!==0)z=z+y+"@"
if(!w)z+=H.l(x)
y=this.b
if(y!=null)z=z+":"+H.l(y)}else z=y
z+=this.c
y=this.f
if(y!=null)z=z+"?"+H.l(y)
y=this.r
if(y!=null)z=z+"#"+H.l(y)
return z.charCodeAt(0)==0?z:z},
A:function(a,b){var z,y,x,w
if(b==null)return!1
z=J.B(b)
if(!z.$iski)return!1
if(this.d===b.d)if(this.a!=null===(b.a!=null))if(this.e===b.e){y=this.gfe(this)
x=z.gfe(b)
if(y==null?x==null:y===x){y=this.gfq(this)
z=z.gfq(b)
if(y==null?z==null:y===z)if(this.c===b.c){z=this.f
y=z==null
x=b.f
w=x==null
if(!y===!w){if(y)z=""
if(z==null?(w?"":x)==null:z===(w?"":x)){z=this.r
y=z==null
x=b.r
w=x==null
if(!y===!w){if(y)z=""
z=z==null?(w?"":x)==null:z===(w?"":x)}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
else z=!1
return z},
gav:function(a){var z,y,x,w,v
z=new P.qx()
y=this.gfe(this)
x=this.gfq(this)
w=this.f
if(w==null)w=""
v=this.r
return z.$2(this.d,z.$2(this.e,z.$2(y,z.$2(x,z.$2(this.c,z.$2(w,z.$2(v==null?"":v,1)))))))},
static:{kj:function(a){if(a==="http")return 80
if(a==="https")return 443
return 0},qy:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=c
z.b=""
z.c=""
z.d=null
z.e=null
z.a=a.length
z.f=b
z.r=-1
w=b
while(!0){v=z.a
if(typeof v!=="number")return H.c(v)
if(!(w<v)){y=b
x=0
break}u=C.c.P(a,w)
z.r=u
if(u===63||u===35){y=b
x=0
break}if(u===47){x=w===b?2:1
y=b
break}if(u===58){if(w===b)P.ca(a,b,"Invalid empty scheme")
z.b=P.qt(a,b,w);++w
if(w===z.a){z.r=-1
x=0}else{u=C.c.P(a,w)
z.r=u
if(u===63||u===35)x=0
else x=u===47?2:1}y=w
break}++w
z.r=-1}z.f=w
if(x===2){t=w+1
z.f=t
if(t===z.a){z.r=-1
x=0}else{u=C.c.P(a,t)
z.r=u
if(u===47){v=z.f
if(typeof v!=="number")return v.i()
z.f=v+1
new P.qE(z,a,-1).$0()
y=z.f}v=z.r
x=v===63||v===35||v===-1?0:1}}if(x===1)while(!0){v=z.f
if(typeof v!=="number")return v.i()
t=v+1
z.f=t
v=z.a
if(typeof v!=="number")return H.c(v)
if(!(t<v))break
u=C.c.P(a,t)
z.r=u
if(u===63||u===35)break
z.r=-1}v=z.b
s=z.d
r=P.qr(a,y,z.f,null,s!=null,v==="file")
v=z.r
if(v===63){v=z.f
if(typeof v!=="number")return v.i()
w=v+1
while(!0){v=z.a
if(typeof v!=="number")return H.c(v)
if(!(w<v)){q=-1
break}if(C.c.P(a,w)===35){q=w
break}++w}v=z.f
if(q<0){if(typeof v!=="number")return v.i()
p=P.ko(a,v+1,z.a,null)
o=null}else{if(typeof v!=="number")return v.i()
p=P.ko(a,v+1,q,null)
o=P.kn(a,q+1,z.a)}}else{if(v===35){v=z.f
if(typeof v!=="number")return v.i()
o=P.kn(a,v+1,z.a)}else o=null
p=null}v=z.b
s=z.c
return new P.ki(z.d,z.e,r,v,s,p,o,null,null)},ca:function(a,b,c){throw H.f(new P.d6(c,a,b))},qs:function(a,b){if(a!=null&&a===P.kj(b))return
return a},qq:function(a,b,c,d){var z,y
if(b==null?c==null:b===c)return""
if(C.c.P(a,b)===91){if(typeof c!=="number")return c.p()
z=c-1
if(C.c.P(a,z)!==93)P.ca(a,b,"Missing end `]` to match `[` in host")
if(typeof b!=="number")return b.i()
P.kq(a,b+1,z)
return C.c.as(a,b,c).toLowerCase()}if(!d){y=b
while(!0){if(typeof y!=="number")return y.I()
if(typeof c!=="number")return H.c(c)
if(!(y<c))break
if(C.c.P(a,y)===58){P.kq(a,b,c)
return"["+a+"]"}++y}}return P.qv(a,b,c)},qv:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=b
y=z
x=null
w=!0
while(!0){if(typeof z!=="number")return z.I()
if(typeof c!=="number")return H.c(c)
if(!(z<c))break
c$0:{v=C.c.P(a,z)
if(v===37){u=P.kp(a,z,!0)
t=u==null
if(t&&w){z+=3
break c$0}if(x==null)x=new P.bN("")
s=C.c.as(a,y,z)
if(!w)s=s.toLowerCase()
x.a=x.a+s
if(t){u=C.c.as(a,z,z+3)
r=3}else if(u==="%"){u="%25"
r=1}else r=3
x.a+=u
z+=r
y=z
w=!0}else{if(v<127){t=v>>>4
if(t>=8)return H.a(C.ay,t)
t=(C.ay[t]&C.a.H(1,v&15))!==0}else t=!1
if(t){if(w&&65<=v&&90>=v){if(x==null)x=new P.bN("")
if(typeof y!=="number")return y.I()
if(y<z){t=C.c.as(a,y,z)
x.a=x.a+t
y=z}w=!1}++z}else{if(v<=93){t=v>>>4
if(t>=8)return H.a(C.H,t)
t=(C.H[t]&C.a.H(1,v&15))!==0}else t=!1
if(t)P.ca(a,z,"Invalid character")
else{if((v&64512)===55296&&z+1<c){q=C.c.P(a,z+1)
if((q&64512)===56320){v=(65536|(v&1023)<<10|q&1023)>>>0
r=2}else r=1}else r=1
if(x==null)x=new P.bN("")
s=C.c.as(a,y,z)
if(!w)s=s.toLowerCase()
x.a=x.a+s
x.a+=P.kk(v)
z+=r
y=z}}}}}if(x==null)return C.c.as(a,b,c)
if(typeof y!=="number")return y.I()
if(y<c){s=C.c.as(a,y,c)
x.a+=!w?s.toLowerCase():s}t=x.a
return t.charCodeAt(0)==0?t:t},qt:function(a,b,c){var z,y,x,w,v
if(b===c)return""
z=C.c.P(a,b)
y=z>=97
if(!(y&&z<=122))x=z>=65&&z<=90
else x=!0
if(!x)P.ca(a,b,"Scheme not starting with alphabetic character")
for(w=b;w<c;++w){v=C.c.P(a,w)
if(v<128){x=v>>>4
if(x>=8)return H.a(C.ag,x)
x=(C.ag[x]&C.a.H(1,v&15))!==0}else x=!1
if(!x)P.ca(a,w,"Illegal scheme character")
if(v<97||v>122)y=!1}a=C.c.as(a,b,c)
return!y?a.toLowerCase():a},qu:function(a,b,c){return P.ej(a,b,c,C.eU)},qr:function(a,b,c,d,e,f){var z=P.ej(a,b,c,C.hc)
if(z.length===0){if(f)return"/"}else if((f||e)&&C.c.P(z,0)!==47)return"/"+z
return z},ko:function(a,b,c,d){return P.ej(a,b,c,C.ae)},kn:function(a,b,c){return P.ej(a,b,c,C.ae)},km:function(a){if(57>=a)return 48<=a
a|=32
return 97<=a&&102>=a},kl:function(a){if(57>=a)return a-48
return(a|32)-87},kp:function(a,b,c){var z,y,x,w
z=b+2
if(z>=a.length)return"%"
y=C.c.P(a,b+1)
x=C.c.P(a,z)
if(!P.km(y)||!P.km(x))return"%"
w=P.kl(y)*16+P.kl(x)
if(w<127){z=C.a.l(w,4)
if(z>=8)return H.a(C.aw,z)
z=(C.aw[z]&C.a.H(1,w&15))!==0}else z=!1
if(z)return H.cE(c&&65<=w&&90>=w?(w|32)>>>0:w)
if(y>=97||x>=97)return C.c.as(a,b,b+3).toUpperCase()
return},kk:function(a){var z,y,x,w,v,u,t,s
if(a<128){z=Array(3)
z.fixed$length=Array
z[0]=37
z[1]=C.c.P("0123456789ABCDEF",a>>>4)
z[2]=C.c.P("0123456789ABCDEF",a&15)}else{if(a>2047)if(a>65535){y=240
x=4}else{y=224
x=3}else{y=192
x=2}w=3*x
z=Array(w)
z.fixed$length=Array
for(v=0;--x,x>=0;y=128){u=C.a.aR(a,6*x)&63|y
if(v>=w)return H.a(z,v)
z[v]=37
t=v+1
s=C.c.P("0123456789ABCDEF",u>>>4)
if(t>=w)return H.a(z,t)
z[t]=s
s=v+2
t=C.c.P("0123456789ABCDEF",u&15)
if(s>=w)return H.a(z,s)
z[s]=t
v+=3}}return P.c9(z,0,null)},ej:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=b
y=z
x=null
while(!0){if(typeof z!=="number")return z.I()
if(typeof c!=="number")return H.c(c)
if(!(z<c))break
c$0:{w=C.c.P(a,z)
if(w<127){v=w>>>4
if(v>=8)return H.a(d,v)
v=(d[v]&C.a.H(1,w&15))!==0}else v=!1
if(v)++z
else{if(w===37){u=P.kp(a,z,!1)
if(u==null){z+=3
break c$0}if("%"===u){u="%25"
t=1}else t=3}else{if(w<=93){v=w>>>4
if(v>=8)return H.a(C.H,v)
v=(C.H[v]&C.a.H(1,w&15))!==0}else v=!1
if(v){P.ca(a,z,"Invalid character")
u=null
t=null}else{if((w&64512)===55296){v=z+1
if(v<c){s=C.c.P(a,v)
if((s&64512)===56320){w=(65536|(w&1023)<<10|s&1023)>>>0
t=2}else t=1}else t=1}else t=1
u=P.kk(w)}}if(x==null)x=new P.bN("")
v=C.c.as(a,y,z)
x.a=x.a+v
x.a+=H.l(u)
if(typeof t!=="number")return H.c(t)
z+=t
y=z}}}if(x==null)return C.c.as(a,b,c)
if(typeof y!=="number")return y.I()
if(y<c)x.a+=C.c.as(a,y,c)
v=x.a
return v.charCodeAt(0)==0?v:v},qz:function(a){var z,y
z=new P.qB()
y=a.split(".")
if(y.length!==4)z.$1("IPv4 address should contain exactly 4 parts")
return H.p(new H.dS(y,new P.qA(z)),[null,null]).cG(0)},kq:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
if(c==null)c=J.M(a)
z=new P.qC(a)
y=new P.qD(a,z)
if(J.M(a)<2)z.$1("address is too short")
x=[]
w=b
u=b
t=!1
while(!0){s=c
if(typeof u!=="number")return u.I()
if(typeof s!=="number")return H.c(s)
if(!(u<s))break
if(J.eP(a,u)===58){if(u===b){++u
if(J.eP(a,u)!==58)z.$2("invalid start colon.",u)
w=u}if(u===w){if(t)z.$2("only one wildcard `::` is allowed",u)
J.cX(x,-1)
t=!0}else J.cX(x,y.$2(w,u))
w=u+1}++u}if(J.M(x)===0)z.$1("too few parts")
r=J.k(w,c)
q=J.k(J.ir(x),-1)
if(r&&!q)z.$2("expected a part after last `:`",c)
if(!r)try{J.cX(x,y.$2(w,c))}catch(p){H.ad(p)
try{v=P.qz(J.lF(a,w,c))
s=J.e(v,0)
if(typeof s!=="number")return s.n()
o=J.e(v,1)
if(typeof o!=="number")return H.c(o)
J.cX(x,(s<<8|o)>>>0)
o=J.e(v,2)
if(typeof o!=="number")return o.n()
s=J.e(v,3)
if(typeof s!=="number")return H.c(s)
J.cX(x,(o<<8|s)>>>0)}catch(p){H.ad(p)
z.$2("invalid end of IPv6 address.",w)}}if(t){if(J.M(x)>7)z.$1("an address with a wildcard must have less than 7 parts")}else if(J.M(x)!==8)z.$1("an address without a wildcard must contain exactly 8 parts")
n=Array(16)
n.$builtinTypeInfo=[P.o]
u=0
m=0
while(!0){s=J.M(x)
if(typeof s!=="number")return H.c(s)
if(!(u<s))break
l=J.e(x,u)
if(J.B(l).A(l,-1)){k=9-J.M(x)
for(j=0;j<k;++j){if(m<0||m>=16)return H.a(n,m)
n[m]=0
s=m+1
if(s>=16)return H.a(n,s)
n[s]=0
m+=2}}else{if(typeof l!=="number")return l.w()
s=C.b.l(l,8)
if(m<0||m>=16)return H.a(n,m)
n[m]=s
s=m+1
if(s>=16)return H.a(n,s)
n[s]=l&255
m+=2}++u}return n},yX:function(a,b,c,d){var z,y,x,w,v,u,t
z=new P.qw()
y=new P.bN("")
x=c.gmL().f7(b)
for(w=x.length,v=0;v<w;++v){u=x[v]
if(u<128){t=u>>>4
if(t>=8)return H.a(a,t)
t=(a[t]&C.a.H(1,u&15))!==0}else t=!1
if(t)y.a+=H.cE(u)
else if(d&&u===32)y.a+=H.cE(43)
else{y.a+=H.cE(37)
z.$2(u,y)}}z=y.a
return z.charCodeAt(0)==0?z:z}}},
qE:{
"^":"r:3;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a
y=z.f
x=z.a
if(y==null?x==null:y===x){z.r=this.c
return}x=this.b
z.r=C.c.P(x,y)
w=this.c
v=-1
u=-1
while(!0){t=z.f
s=z.a
if(typeof t!=="number")return t.I()
if(typeof s!=="number")return H.c(s)
if(!(t<s))break
r=C.c.P(x,t)
z.r=r
if(r===47||r===63||r===35)break
if(r===64){u=z.f
v=-1}else if(r===58)v=z.f
else if(r===91){t=z.f
if(typeof t!=="number")return t.i()
q=C.c.n7(x,"]",t+1)
if(q===-1){z.f=z.a
z.r=w
v=-1
break}else z.f=q
v=-1}t=z.f
if(typeof t!=="number")return t.i()
z.f=t+1
z.r=w}p=z.f
if(typeof u!=="number")return u.a9()
if(u>=0){z.c=P.qu(x,y,u)
y=u+1}if(typeof v!=="number")return v.a9()
if(v>=0){o=v+1
t=z.f
if(typeof t!=="number")return H.c(t)
if(o<t){n=0
while(!0){t=z.f
if(typeof t!=="number")return H.c(t)
if(!(o<t))break
m=C.c.P(x,o)
if(48>m||57<m)P.ca(x,o,"Invalid port number")
n=n*10+(m-48);++o}}else n=null
z.e=P.qs(n,z.b)
p=v}z.d=P.qq(x,y,p,!0)
t=z.f
s=z.a
if(typeof t!=="number")return t.I()
if(typeof s!=="number")return H.c(s)
if(t<s)z.r=C.c.P(x,t)}},
qx:{
"^":"r:107;",
$2:function(a,b){return b*31+J.aG(a)&1073741823}},
qB:{
"^":"r:108;",
$1:function(a){throw H.f(new P.d6("Illegal IPv4 address, "+a,null,null))}},
qA:{
"^":"r:0;a",
$1:function(a){var z,y
z=H.jB(a,null,null)
y=J.u(z)
if(y.I(z,0)||y.T(z,255))this.a.$1("each part must be in the range of `0..255`")
return z}},
qC:{
"^":"r:109;a",
$2:function(a,b){throw H.f(new P.d6("Illegal IPv6 address, "+a,this.a,b))},
$1:function(a){return this.$2(a,null)}},
qD:{
"^":"r:6;a,b",
$2:function(a,b){var z,y
if(typeof a!=="number")return H.c(a)
if(b-a>4)this.b.$2("an IPv6 part can only contain a maximum of 4 hex digits",a)
z=H.jB(C.c.as(this.a,a,b),16,null)
y=J.u(z)
if(y.I(z,0)||y.T(z,65535))this.b.$2("each part must be in the range of `0x0..0xFFFF`",a)
return z}},
qw:{
"^":"r:5;",
$2:function(a,b){b.a+=H.cE(C.c.P("0123456789ABCDEF",a>>>4))
b.a+=H.cE(C.c.P("0123456789ABCDEF",a&15))}}}],["","",,W,{
"^":"",
n7:function(a,b,c,d,e,f,g,h){var z,y,x
z=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[W.fp])),[W.fp])
y=new XMLHttpRequest()
C.aK.nn(y,b,a,!0)
y.overrideMimeType(c)
x=H.p(new W.hY(y,"load",!1),[null])
H.p(new W.ey(0,x.a,x.b,W.eG(new W.n8(z,y)),x.c),[H.ar(x,0)]).d0()
x=H.p(new W.hY(y,"error",!1),[null])
H.p(new W.ey(0,x.a,x.b,W.eG(z.gmt()),x.c),[H.ar(x,0)]).d0()
y.send()
return z.a},
oz:function(a,b,c,d){return new Option(a,b,c,d)},
bR:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
kG:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
cP:function(a){if(!!J.B(a).$isiH)return a
return P.l5(a,!0)},
eG:function(a){var z=$.H
if(z===C.i)return a
return z.mi(a,!0)},
af:{
"^":"bo;",
$isaf:1,
$isbo:1,
$isap:1,
$isj:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
wj:{
"^":"af;",
E:function(a){return String(a)},
$isE:1,
"%":"HTMLAnchorElement"},
wl:{
"^":"af;",
E:function(a){return String(a)},
$isE:1,
"%":"HTMLAreaElement"},
lQ:{
"^":"E;",
"%":";Blob"},
wq:{
"^":"af;",
$isE:1,
"%":"HTMLBodyElement"},
wt:{
"^":"af;Z:name=",
"%":"HTMLButtonElement"},
wv:{
"^":"af;C:height=,D:width=",
gmv:function(a){return a.getContext("2d")},
"%":"HTMLCanvasElement"},
lW:{
"^":"E;",
nw:function(a,b,c,d,e,f,g,h){a.putImageData(P.tG(b),c,d)
return},
nv:function(a,b,c,d){return this.nw(a,b,c,d,null,null,null,null)},
"%":"CanvasRenderingContext2D"},
wx:{
"^":"ap;B:data=,m:length=",
S:function(a){return a.length.$0()},
$isE:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
wA:{
"^":"kf;B:data=",
"%":"CompositionEvent"},
iH:{
"^":"ap;",
$isiH:1,
"%":"Document|HTMLDocument|XMLDocument"},
wL:{
"^":"ap;",
gaz:function(a){if(a._docChildren==null)a._docChildren=H.p(new P.iS(a,new W.kB(a)),[null])
return a._docChildren},
$isE:1,
"%":"DocumentFragment|ShadowRoot"},
wM:{
"^":"E;Z:name=",
"%":"DOMError|FileError"},
wN:{
"^":"E;",
gZ:function(a){var z=a.name
if(P.iG()===!0&&z==="SECURITY_ERR")return"SecurityError"
if(P.iG()===!0&&z==="SYNTAX_ERR")return"SyntaxError"
return z},
E:function(a){return String(a)},
"%":"DOMException"},
mh:{
"^":"E;mk:bottom=,C:height=,fi:left=,nK:right=,fw:top=,D:width=,M:x=,K:y=",
E:function(a){return"Rectangle ("+H.l(a.left)+", "+H.l(a.top)+") "+H.l(this.gD(a))+" x "+H.l(this.gC(a))},
A:function(a,b){var z,y,x
if(b==null)return!1
z=J.B(b)
if(!z.$isdi)return!1
y=a.left
x=z.gfi(b)
if(y==null?x==null:y===x){y=a.top
x=z.gfw(b)
if(y==null?x==null:y===x){y=this.gD(a)
x=z.gD(b)
if(y==null?x==null:y===x){y=this.gC(a)
z=z.gC(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gav:function(a){var z,y,x,w
z=J.aG(a.left)
y=J.aG(a.top)
x=J.aG(this.gD(a))
w=J.aG(this.gC(a))
return W.kG(W.bR(W.bR(W.bR(W.bR(0,z),y),x),w))},
$isdi:1,
$asdi:I.dy,
"%":";DOMRectReadOnly"},
rf:{
"^":"c3;a,b",
gY:function(a){return this.a.firstElementChild==null},
gm:function(a){return this.b.length},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.a(z,b)
this.a.replaceChild(c,z[b])},
sm:function(a,b){throw H.f(new P.a_("Cannot resize element lists"))},
a4:function(a,b){this.a.appendChild(b)
return b},
gad:function(a){var z=this.cG(this)
return new J.eU(z,z.length,0,null)},
aj:function(a,b,c,d,e){throw H.f(new P.dm(null))},
ag:function(a,b,c,d){throw H.f(new P.dm(null))},
gac:function(a){var z=this.a.firstElementChild
if(z==null)throw H.f(new P.aj("No elements"))
return z},
gaw:function(a){var z=this.a.lastElementChild
if(z==null)throw H.f(new P.aj("No elements"))
return z},
S:function(a){return this.gm(this).$0()},
$asc3:function(){return[W.bo]},
$asw:function(){return[W.bo]}},
bo:{
"^":"ap;",
gaz:function(a){return new W.rf(a,a.children)},
E:function(a){return a.localName},
gik:function(a){return H.p(new W.kD(a,"change",!1),[null])},
$isbo:1,
$isap:1,
$isj:1,
$isE:1,
"%":";Element"},
wQ:{
"^":"af;C:height=,Z:name=,bH:src},D:width=",
"%":"HTMLEmbedElement"},
wT:{
"^":"bW;d6:error=",
"%":"ErrorEvent"},
bW:{
"^":"E;",
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
dK:{
"^":"E;",
k7:function(a,b,c,d){return a.addEventListener(b,H.cU(c,1),d)},
m2:function(a,b,c,d){return a.removeEventListener(b,H.cU(c,1),d)},
"%":"MediaStream;EventTarget"},
xe:{
"^":"af;Z:name=",
"%":"HTMLFieldSetElement"},
ff:{
"^":"lQ;Z:name=",
$isj:1,
"%":"File"},
xf:{
"^":"nr;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.c_(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.f(new P.a_("Cannot assign element of immutable List."))},
sm:function(a,b){throw H.f(new P.a_("Cannot resize immutable List."))},
gac:function(a){if(a.length>0)return a[0]
throw H.f(new P.aj("No elements"))},
gaw:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.f(new P.aj("No elements"))},
aJ:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
S:function(a){return this.gm(a).$0()},
$isw:1,
$asw:function(){return[W.ff]},
$isW:1,
$isc0:1,
$isbC:1,
"%":"FileList"},
nn:{
"^":"E+b0;",
$isw:1,
$asw:function(){return[W.ff]},
$isW:1},
nr:{
"^":"nn+dN;",
$isw:1,
$asw:function(){return[W.ff]},
$isW:1},
xi:{
"^":"af;m:length=,Z:name=",
S:function(a){return a.length.$0()},
"%":"HTMLFormElement"},
xr:{
"^":"ns;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.c_(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.f(new P.a_("Cannot assign element of immutable List."))},
sm:function(a,b){throw H.f(new P.a_("Cannot resize immutable List."))},
gac:function(a){if(a.length>0)return a[0]
throw H.f(new P.aj("No elements"))},
gaw:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.f(new P.aj("No elements"))},
aJ:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
S:function(a){return this.gm(a).$0()},
$isw:1,
$asw:function(){return[W.ap]},
$isW:1,
$isc0:1,
$isbC:1,
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
no:{
"^":"E+b0;",
$isw:1,
$asw:function(){return[W.ap]},
$isW:1},
ns:{
"^":"no+dN;",
$isw:1,
$asw:function(){return[W.ap]},
$isW:1},
fp:{
"^":"n6;",
gnI:function(a){return W.cP(a.response)},
on:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
nn:function(a,b,c,d){return a.open(b,c,d)},
ce:function(a,b){return a.send(b)},
$isj:1,
"%":"XMLHttpRequest"},
n8:{
"^":"r:0;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
y=z.status
if(typeof y!=="number")return y.a9()
x=y>=200&&y<300
w=y>307&&y<400
y=x||y===0||y===304||w
v=this.a
if(y)v.aA(0,z)
else v.dS(a)}},
n6:{
"^":"dK;",
"%":";XMLHttpRequestEventTarget"},
xt:{
"^":"af;C:height=,Z:name=,bH:src},D:width=",
"%":"HTMLIFrameElement"},
fs:{
"^":"E;B:data=,C:height=,D:width=",
$isfs:1,
"%":"ImageData"},
xv:{
"^":"af;C:height=,bH:src},D:width=",
"%":"HTMLImageElement"},
xA:{
"^":"af;C:height=,Z:name=,bH:src},D:width=",
$isbo:1,
$isE:1,
"%":"HTMLInputElement"},
xG:{
"^":"af;Z:name=",
"%":"HTMLKeygenElement"},
oa:{
"^":"E;",
gno:function(a){if("origin" in a)return a.origin
return H.l(a.protocol)+"//"+H.l(a.host)},
E:function(a){return String(a)},
"%":"Location"},
xL:{
"^":"af;Z:name=",
"%":"HTMLMapElement"},
ol:{
"^":"af;d6:error=,bH:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
xS:{
"^":"bW;",
gB:function(a){return P.l5(a.data,!0)},
"%":"MessageEvent"},
xT:{
"^":"af;Z:name=",
"%":"HTMLMetaElement"},
xV:{
"^":"bW;B:data=",
"%":"MIDIMessageEvent"},
xW:{
"^":"om;",
o5:function(a,b,c){return a.send(b,c)},
ce:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
om:{
"^":"dK;Z:name=",
"%":"MIDIInput;MIDIPort"},
y6:{
"^":"E;",
$isE:1,
"%":"Navigator"},
y7:{
"^":"E;Z:name=",
"%":"NavigatorUserMediaError"},
kB:{
"^":"c3;a",
gac:function(a){var z=this.a.firstChild
if(z==null)throw H.f(new P.aj("No elements"))
return z},
gaw:function(a){var z=this.a.lastChild
if(z==null)throw H.f(new P.aj("No elements"))
return z},
a4:function(a,b){this.a.appendChild(b)},
k:function(a,b,c){var z,y
z=this.a
y=z.childNodes
if(b>>>0!==b||b>=y.length)return H.a(y,b)
z.replaceChild(c,y[b])},
gad:function(a){return C.jE.gad(this.a.childNodes)},
aj:function(a,b,c,d,e){throw H.f(new P.a_("Cannot setRange on Node list"))},
ag:function(a,b,c,d){throw H.f(new P.a_("Cannot fillRange on Node list"))},
gm:function(a){return this.a.childNodes.length},
sm:function(a,b){throw H.f(new P.a_("Cannot set length on immutable List."))},
h:function(a,b){var z=this.a.childNodes
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
S:function(a){return this.gm(this).$0()},
$asc3:function(){return[W.ap]},
$asw:function(){return[W.ap]}},
ap:{
"^":"dK;nN:textContent=",
nz:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
nH:function(a,b){var z,y
try{z=a.parentNode
J.lp(z,b,a)}catch(y){H.ad(y)}return a},
E:function(a){var z=a.nodeValue
return z==null?this.iX(a):z},
m3:function(a,b,c){return a.replaceChild(b,c)},
$isap:1,
$isj:1,
"%":";Node"},
ov:{
"^":"nt;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.c_(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.f(new P.a_("Cannot assign element of immutable List."))},
sm:function(a,b){throw H.f(new P.a_("Cannot resize immutable List."))},
gac:function(a){if(a.length>0)return a[0]
throw H.f(new P.aj("No elements"))},
gaw:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.f(new P.aj("No elements"))},
aJ:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
S:function(a){return this.gm(a).$0()},
$isw:1,
$asw:function(){return[W.ap]},
$isW:1,
$isc0:1,
$isbC:1,
"%":"NodeList|RadioNodeList"},
np:{
"^":"E+b0;",
$isw:1,
$asw:function(){return[W.ap]},
$isW:1},
nt:{
"^":"np+dN;",
$isw:1,
$asw:function(){return[W.ap]},
$isW:1},
yb:{
"^":"af;B:data=,C:height=,Z:name=,D:width=",
"%":"HTMLObjectElement"},
yd:{
"^":"af;Z:name=",
"%":"HTMLOutputElement"},
yf:{
"^":"af;Z:name=",
"%":"HTMLParamElement"},
yq:{
"^":"bW;B:data=",
"%":"PushEvent"},
yy:{
"^":"af;bH:src}",
"%":"HTMLScriptElement"},
yA:{
"^":"af;m:length%,Z:name=,iF:selectedIndex=",
S:function(a){return a.length.$0()},
"%":"HTMLSelectElement"},
yD:{
"^":"af;bH:src}",
"%":"HTMLSourceElement"},
yE:{
"^":"bW;d6:error=",
"%":"SpeechRecognitionError"},
yF:{
"^":"bW;Z:name=",
"%":"SpeechSynthesisEvent"},
yN:{
"^":"af;Z:name=",
"%":"HTMLTextAreaElement"},
yO:{
"^":"kf;B:data=",
"%":"TextEvent"},
yR:{
"^":"af;bH:src}",
"%":"HTMLTrackElement"},
kf:{
"^":"bW;",
"%":"DragEvent|FocusEvent|KeyboardEvent|MSPointerEvent|MouseEvent|PointerEvent|SVGZoomEvent|TouchEvent|WheelEvent;UIEvent"},
zB:{
"^":"ol;C:height=,D:width=",
"%":"HTMLVideoElement"},
zJ:{
"^":"dK;Z:name=",
$isE:1,
"%":"DOMWindow|Window"},
zR:{
"^":"ap;Z:name=",
"%":"Attr"},
zS:{
"^":"E;mk:bottom=,C:height=,fi:left=,nK:right=,fw:top=,D:width=",
E:function(a){return"Rectangle ("+H.l(a.left)+", "+H.l(a.top)+") "+H.l(a.width)+" x "+H.l(a.height)},
A:function(a,b){var z,y,x
if(b==null)return!1
z=J.B(b)
if(!z.$isdi)return!1
y=a.left
x=z.gfi(b)
if(y==null?x==null:y===x){y=a.top
x=z.gfw(b)
if(y==null?x==null:y===x){y=a.width
x=z.gD(b)
if(y==null?x==null:y===x){y=a.height
z=z.gC(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gav:function(a){var z,y,x,w
z=J.aG(a.left)
y=J.aG(a.top)
x=J.aG(a.width)
w=J.aG(a.height)
return W.kG(W.bR(W.bR(W.bR(W.bR(0,z),y),x),w))},
$isdi:1,
$asdi:I.dy,
"%":"ClientRect"},
zT:{
"^":"ap;",
$isE:1,
"%":"DocumentType"},
zU:{
"^":"mh;",
gC:function(a){return a.height},
gD:function(a){return a.width},
gM:function(a){return a.x},
sM:function(a,b){a.x=b},
gK:function(a){return a.y},
sK:function(a,b){a.y=b},
"%":"DOMRect"},
zX:{
"^":"af;",
$isE:1,
"%":"HTMLFrameSetElement"},
A_:{
"^":"nu;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.c_(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.f(new P.a_("Cannot assign element of immutable List."))},
sm:function(a,b){throw H.f(new P.a_("Cannot resize immutable List."))},
gac:function(a){if(a.length>0)return a[0]
throw H.f(new P.aj("No elements"))},
gaw:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.f(new P.aj("No elements"))},
aJ:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
S:function(a){return this.gm(a).$0()},
$isw:1,
$asw:function(){return[W.ap]},
$isW:1,
$isc0:1,
$isbC:1,
"%":"MozNamedAttrMap|NamedNodeMap"},
nq:{
"^":"E+b0;",
$isw:1,
$asw:function(){return[W.ap]},
$isW:1},
nu:{
"^":"nq+dN;",
$isw:1,
$asw:function(){return[W.ap]},
$isW:1},
hY:{
"^":"aC;a,b,c",
aL:function(a,b,c,d){var z=new W.ey(0,this.a,this.b,W.eG(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.d0()
return z},
e0:function(a,b,c){return this.aL(a,null,b,c)}},
kD:{
"^":"hY;a,b,c"},
ey:{
"^":"pN;a,b,c,d,e",
d3:function(){if(this.b==null)return
this.hQ()
this.b=null
this.d=null
return},
fo:function(a,b){if(this.b==null)return;++this.a
this.hQ()},
fn:function(a){return this.fo(a,null)},
e9:function(){if(this.b==null||this.a<=0)return;--this.a
this.d0()},
d0:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.ln(x,this.c,z,this.e)}},
hQ:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.lo(x,this.c,z,this.e)}}},
dN:{
"^":"j;",
gad:function(a){return new W.mJ(a,this.gm(a),-1,null)},
a4:function(a,b){throw H.f(new P.a_("Cannot add to immutable List."))},
aj:function(a,b,c,d,e){throw H.f(new P.a_("Cannot setRange on immutable List."))},
ag:function(a,b,c,d){throw H.f(new P.a_("Cannot modify an immutable List."))},
$isw:1,
$asw:null,
$isW:1},
mJ:{
"^":"j;a,b,c,d",
W:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.e(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
ga8:function(){return this.d}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
wf:{
"^":"bZ;",
$isE:1,
"%":"SVGAElement"},
wh:{
"^":"q4;",
$isE:1,
"%":"SVGAltGlyphElement"},
wk:{
"^":"aa;",
$isE:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
wX:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFEBlendElement"},
wY:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFEColorMatrixElement"},
wZ:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFEComponentTransferElement"},
x_:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFECompositeElement"},
x0:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFEConvolveMatrixElement"},
x1:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFEDiffuseLightingElement"},
x2:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFEDisplacementMapElement"},
x3:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFEFloodElement"},
x4:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFEGaussianBlurElement"},
x5:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFEImageElement"},
x6:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFEMergeElement"},
x7:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFEMorphologyElement"},
x8:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFEOffsetElement"},
x9:{
"^":"aa;M:x=,K:y=,ao:z=",
"%":"SVGFEPointLightElement"},
xa:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFESpecularLightingElement"},
xb:{
"^":"aa;M:x=,K:y=,ao:z=",
"%":"SVGFESpotLightElement"},
xc:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFETileElement"},
xd:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFETurbulenceElement"},
xg:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGFilterElement"},
xh:{
"^":"bZ;C:height=,D:width=,M:x=,K:y=",
"%":"SVGForeignObjectElement"},
mQ:{
"^":"bZ;",
"%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
bZ:{
"^":"aa;",
$isE:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
xw:{
"^":"bZ;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGImageElement"},
xO:{
"^":"aa;",
$isE:1,
"%":"SVGMarkerElement"},
xP:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGMaskElement"},
yh:{
"^":"aa;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGPatternElement"},
ym:{
"^":"E;m:length=",
S:function(a){return a.length.$0()},
"%":"SVGPointList"},
yv:{
"^":"mQ;C:height=,D:width=,M:x=,K:y=",
"%":"SVGRectElement"},
yz:{
"^":"aa;",
$isE:1,
"%":"SVGScriptElement"},
aa:{
"^":"bo;",
gaz:function(a){return H.p(new P.iS(a,new W.kB(a)),[W.bo])},
gik:function(a){return H.p(new W.kD(a,"change",!1),[null])},
$isE:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
yL:{
"^":"bZ;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGSVGElement"},
yM:{
"^":"aa;",
$isE:1,
"%":"SVGSymbolElement"},
k2:{
"^":"bZ;",
"%":";SVGTextContentElement"},
yP:{
"^":"k2;",
$isE:1,
"%":"SVGTextPathElement"},
q4:{
"^":"k2;M:x=,K:y=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
yY:{
"^":"bZ;C:height=,D:width=,M:x=,K:y=",
$isE:1,
"%":"SVGUseElement"},
zC:{
"^":"aa;",
$isE:1,
"%":"SVGViewElement"},
zW:{
"^":"aa;",
$isE:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
A0:{
"^":"aa;",
$isE:1,
"%":"SVGCursorElement"},
A1:{
"^":"aa;",
$isE:1,
"%":"SVGFEDropShadowElement"},
A2:{
"^":"aa;",
$isE:1,
"%":"SVGGlyphRefElement"},
A3:{
"^":"aa;",
$isE:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":""}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
nL:{
"^":"r:0;",
$1:function(a){return new P.j1(J.e(a,1),J.e(a,2),J.e(a,3))}},
ww:{
"^":"j;"},
j1:{
"^":"j;i6:a<,b,c",
static:{nK:function(a,b,c,d,e,f){var z,y,x,w,v,u
try{w=b
v=H.ck(w,"$isw",[P.am],"$asw")
if(v)for(z=0;J.a7(z,J.M(b));z=J.b(z,1)){w=J.e(b,z)
if(typeof w!=="string"){w=P.ak("Args must be a list of Strings "+H.l(b))
throw H.f(w)}}else if(b!=null){w=P.ak("Args must be a list of Strings "+H.l(b))
throw H.f(w)}$.j5=!0
w=H.j6(null,J.bS(a),b,c,!1,!0,f).at(new P.nL())
return w}catch(u){w=H.ad(u)
y=w
x=H.at(u)
return P.mM(y,x,P.j1)}}}}}],["","",,P,{
"^":"",
zY:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
zZ:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
a6:function(a,b){if(typeof a!=="number")throw H.f(P.ak(a))
if(typeof b!=="number")throw H.f(P.ak(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0&&C.d.gdY(b)||C.d.gff(b))return b
return a}return a},
O:function(a,b){var z
if(typeof a!=="number")throw H.f(P.ak(a))
if(typeof b!=="number")throw H.f(P.ak(b))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(C.d.gff(b))return b
return a}if(b===0)z=a===0?1/a<0:a<0
else z=!1
if(z)return b
return a},
uV:function(a){return Math.log(H.T(a))},
rS:{
"^":"j;a,b",
bK:function(){var z,y,x,w,v,u
z=this.a
y=4294901760*z
x=(y&4294967295)>>>0
w=55905*z
v=(w&4294967295)>>>0
u=v+x+this.b
z=(u&4294967295)>>>0
this.a=z
this.b=(C.a.a3(w-v+(y-x)+(u-z),4294967296)&4294967295)>>>0},
ih:function(a){var z,y,x
if(a<=0||a>4294967296)throw H.f(P.p6("max must be in range 0 < max \u2264 2^32, was "+a))
z=a-1
if((a&z)>>>0===0){this.bK()
return(this.a&z)>>>0}do{this.bK()
y=this.a
x=y%a}while(y-x+a>=4294967296)
return x},
nm:function(){this.bK()
var z=this.a
this.bK()
return((z&67108863)*134217728+(this.a&134217727))/9007199254740992},
jZ:function(a){var z,y,x,w,v,u,t,s
z=a<0?-1:0
do{y=(a&4294967295)>>>0
a=C.a.a3(a-y,4294967296)
x=(a&4294967295)>>>0
a=C.a.a3(a-x,4294967296)
w=((~y&4294967295)>>>0)+(y<<21>>>0)
v=(w&4294967295)>>>0
x=(~x>>>0)+((x<<21|y>>>11)>>>0)+C.a.a3(w-v,4294967296)&4294967295
w=((v^(v>>>24|x<<8))>>>0)*265
y=(w&4294967295)>>>0
x=((x^x>>>24)>>>0)*265+C.a.a3(w-y,4294967296)&4294967295
w=((y^(y>>>14|x<<18))>>>0)*21
y=(w&4294967295)>>>0
x=((x^x>>>14)>>>0)*21+C.a.a3(w-y,4294967296)&4294967295
y=(y^(y>>>28|x<<4))>>>0
x=(x^x>>>28)>>>0
w=(y<<31>>>0)+y
v=(w&4294967295)>>>0
u=C.a.a3(w-v,4294967296)
w=this.a*1037
t=(w&4294967295)>>>0
this.a=t
s=(this.b*1037+C.a.a3(w-t,4294967296)&4294967295)>>>0
this.b=s
t=(t^v)>>>0
this.a=t
u=(s^x+((x<<31|y>>>1)>>>0)+u&4294967295)>>>0
this.b=u}while(a!==z)
if(u===0&&t===0)this.a=23063
this.bK()
this.bK()
this.bK()
this.bK()},
static:{i1:function(a){var z=new P.rS(0,0)
z.jZ(a)
return z}}}}],["","",,P,{
"^":"",
kg:function(a,b,c){return J.io(a,b,c)},
qn:function(a){throw H.f(new P.a_("Uint64List not supported by dart2js."))},
mK:function(a,b,c){a.toString
H.ce(a,b,c)
return new Float32Array(a,b)},
bj:{
"^":"j;",
$isw:1,
$asw:function(){return[P.o]},
$isW:1},
fw:{
"^":"j;",
$isw:1,
$asw:function(){return[P.o]},
$isW:1},
hH:{
"^":"j;",
$isw:1,
$asw:function(){return[P.o]},
$isW:1}}],["","",,H,{
"^":"",
i:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.f(P.ak("Invalid length "+H.l(a)))
return a},
ce:function(a,b,c){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(P.ak("Invalid view offsetInBytes "+H.l(b)))
if(c!=null&&(typeof c!=="number"||Math.floor(c)!==c))throw H.f(P.ak("Invalid view length "+H.l(c)))},
D:function(a){var z,y,x,w,v
z=J.B(a)
if(!!z.$isbC)return a
y=z.gm(a)
if(typeof y!=="number")return H.c(y)
x=Array(y)
x.fixed$length=Array
y=x.length
w=0
while(!0){v=z.gm(a)
if(typeof v!=="number")return H.c(v)
if(!(w<v))break
v=z.h(a,w)
if(w>=y)return H.a(x,w)
x[w]=v;++w}return x},
oo:function(a,b,c){H.ce(a,b,c)
return new Float32Array(a,b)},
op:function(a){return new Float32Array(a)},
oq:function(a){return new Int32Array(a)},
jn:function(a){return new Int8Array(a)},
or:function(a){return new Uint16Array(a)},
ot:function(a){return new Uint32Array(a)},
dW:function(a){return new Uint8Array(a)},
fU:{
"^":"E;",
a0:function(a,b,c){H.ce(a,b,c)
return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
bM:function(a,b,c){H.ce(a,b,c)
return c==null?new Uint32Array(a,b):new Uint32Array(a,b,c)},
$isfU:1,
$islT:1,
"%":"ArrayBuffer"},
dV:{
"^":"E;a5:buffer=,ij:byteOffset=",
l8:function(a,b,c){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(P.d0(b,null,"Invalid list position"))
else throw H.f(P.ae(b,0,c,null,null))},
dA:function(a,b,c){if(b>>>0!==b||b>c)this.l8(a,b,c)},
bl:function(a,b,c,d){this.dA(a,b,d)
if(c==null)return d
this.dA(a,c,d)
if(J.V(b,c))throw H.f(P.ae(b,0,c,null,null))
return c},
$isdV:1,
"%":";ArrayBufferView;fV|jo|jq|dU|jp|jr|bq"},
y0:{
"^":"dV;",
$islU:1,
"%":"DataView"},
fV:{
"^":"dV;",
gm:function(a){return a.length},
hJ:function(a,b,c,d,e){var z,y,x
z=a.length
this.dA(a,b,z)
this.dA(a,c,z)
if(J.V(b,c))throw H.f(P.ae(b,0,c,null,null))
y=J.m(c,b)
if(J.a7(e,0))throw H.f(P.ak(e))
x=d.length
if(typeof e!=="number")return H.c(e)
if(typeof y!=="number")return H.c(y)
if(x-e<y)throw H.f(new P.aj("Not enough elements"))
if(e!==0||x!==y)d=d.subarray(e,e+y)
a.set(d,b)},
S:function(a){return this.gm(a).$0()},
$isc0:1,
$isbC:1},
dU:{
"^":"jq;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.K(H.aq(a,b))
return a[b]},
k:function(a,b,c){if(b>>>0!==b||b>=a.length)H.K(H.aq(a,b))
a[b]=c},
aj:function(a,b,c,d,e){if(!!J.B(d).$isdU){this.hJ(a,b,c,d,e)
return}this.fJ(a,b,c,d,e)},
bi:function(a,b,c,d){return this.aj(a,b,c,d,0)}},
jo:{
"^":"fV+b0;",
$isw:1,
$asw:function(){return[P.au]},
$isW:1},
jq:{
"^":"jo+iT;"},
bq:{
"^":"jr;",
k:function(a,b,c){if(b>>>0!==b||b>=a.length)H.K(H.aq(a,b))
a[b]=c},
aj:function(a,b,c,d,e){if(!!J.B(d).$isbq){this.hJ(a,b,c,d,e)
return}this.fJ(a,b,c,d,e)},
bi:function(a,b,c,d){return this.aj(a,b,c,d,0)},
$isw:1,
$asw:function(){return[P.o]},
$isW:1},
jp:{
"^":"fV+b0;",
$isw:1,
$asw:function(){return[P.o]},
$isW:1},
jr:{
"^":"jp+iT;"},
on:{
"^":"dU;",
ay:function(a,b,c){return new Float32Array(a.subarray(b,this.bl(a,b,c,a.length)))},
$isw:1,
$asw:function(){return[P.au]},
$isW:1,
"%":"Float32Array"},
y1:{
"^":"dU;",
ay:function(a,b,c){return new Float64Array(a.subarray(b,this.bl(a,b,c,a.length)))},
$isw:1,
$asw:function(){return[P.au]},
$isW:1,
"%":"Float64Array"},
y2:{
"^":"bq;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.K(H.aq(a,b))
return a[b]},
ay:function(a,b,c){return new Int16Array(a.subarray(b,this.bl(a,b,c,a.length)))},
$isw:1,
$asw:function(){return[P.o]},
$isW:1,
"%":"Int16Array"},
y3:{
"^":"bq;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.K(H.aq(a,b))
return a[b]},
ay:function(a,b,c){return new Int32Array(a.subarray(b,this.bl(a,b,c,a.length)))},
$isw:1,
$asw:function(){return[P.o]},
$isW:1,
"%":"Int32Array"},
y4:{
"^":"bq;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.K(H.aq(a,b))
return a[b]},
ay:function(a,b,c){return new Int8Array(a.subarray(b,this.bl(a,b,c,a.length)))},
$isw:1,
$asw:function(){return[P.o]},
$isW:1,
"%":"Int8Array"},
y5:{
"^":"bq;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.K(H.aq(a,b))
return a[b]},
ay:function(a,b,c){return new Uint16Array(a.subarray(b,this.bl(a,b,c,a.length)))},
$isw:1,
$asw:function(){return[P.o]},
$isW:1,
"%":"Uint16Array"},
os:{
"^":"bq;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.K(H.aq(a,b))
return a[b]},
ay:function(a,b,c){return new Uint32Array(a.subarray(b,this.bl(a,b,c,a.length)))},
$isw:1,
$asw:function(){return[P.o]},
$isW:1,
"%":"Uint32Array"},
ou:{
"^":"bq;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.K(H.aq(a,b))
return a[b]},
ay:function(a,b,c){return new Uint8ClampedArray(a.subarray(b,this.bl(a,b,c,a.length)))},
S:function(a){return this.gm(a).$0()},
$isw:1,
$asw:function(){return[P.o]},
$isW:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
fW:{
"^":"bq;",
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.K(H.aq(a,b))
return a[b]},
ay:function(a,b,c){return new Uint8Array(a.subarray(b,this.bl(a,b,c,a.length)))},
S:function(a){return this.gm(a).$0()},
$isfW:1,
$isbj:1,
$isw:1,
$asw:function(){return[P.o]},
$isW:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
lg:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,A,{
"^":"",
pf:function(){if($.$get$b2().h(0,"sphere")!=null)return
$.$get$df().k(0,"bvh",E.ts())
$.$get$df().k(0,"grid",E.tu())
$.$get$df().k(0,"kdtree",E.tv())
$.$get$df().k(0,"bruteforce",E.tt())
$.$get$dY().k(0,"environment",K.tD())
$.$get$dY().k(0,"orthographic",K.tE())
$.$get$dY().k(0,"perspective",K.tF())
$.$get$jv().k(0,"image",R.tO())
$.$get$cD().k(0,"box",S.tP())
$.$get$cD().k(0,"gaussian",S.tQ())
$.$get$cD().k(0,"sinc",S.tR())
$.$get$cD().k(0,"mitchell",S.tS())
$.$get$cD().k(0,"triangle",S.tT())
$.$get$aV().k(0,"ambientocclusion",U.vD())
$.$get$aV().k(0,"diffuseprt",U.vE())
$.$get$aV().k(0,"directlighting",U.vG())
$.$get$aV().k(0,"glossyprt",U.vH())
$.$get$aV().k(0,"igi",U.vI())
$.$get$aV().k(0,"irradiancecache",U.vJ())
$.$get$aV().k(0,"path",U.vK())
$.$get$aV().k(0,"photonmap",U.lk())
$.$get$aV().k(0,"exphotonmap",U.lk())
$.$get$aV().k(0,"whitted",U.vM())
$.$get$aV().k(0,"useprobes",U.vL())
$.$get$aV().k(0,"dipolesubsurface",U.vF())
$.$get$c7().k(0,"distant",O.uP())
$.$get$c7().k(0,"point",O.uS())
$.$get$c7().k(0,"spot",O.uU())
$.$get$c7().k(0,"infinite",O.uR())
$.$get$c7().k(0,"goniometric",O.uQ())
$.$get$c7().k(0,"projection",O.uT())
$.$get$h6().k(0,"diffuse",O.le())
$.$get$h6().k(0,"area",O.le())
$.$get$aT().k(0,"glass",D.v1())
$.$get$aT().k(0,"kdsubsurface",D.v2())
$.$get$aT().k(0,"matte",D.v3())
$.$get$aT().k(0,"measured",D.v4())
$.$get$aT().k(0,"metal",D.v5())
$.$get$aT().k(0,"mirror",D.v6())
$.$get$aT().k(0,"plastic",D.v7())
$.$get$aT().k(0,"shinymetal",D.v8())
$.$get$aT().k(0,"substrate",D.v9())
$.$get$aT().k(0,"subsurface",D.va())
$.$get$aT().k(0,"translucent",D.vb())
$.$get$aT().k(0,"uber",D.vc())
$.$get$dZ().k(0,"linear",F.vf())
$.$get$dZ().k(0,"random",F.vg())
$.$get$dZ().k(0,"tile",F.vh())
$.$get$c8().k(0,"adaptive",U.vi())
$.$get$c8().k(0,"bestcandidate",U.vj())
$.$get$c8().k(0,"halton",U.vk())
$.$get$c8().k(0,"lowdiscrepancy",U.vl())
$.$get$c8().k(0,"random",U.vm())
$.$get$c8().k(0,"stratified",U.vn())
$.$get$b2().k(0,"cone",M.vo())
$.$get$b2().k(0,"cylinder",M.vp())
$.$get$b2().k(0,"disk",M.vq())
$.$get$b2().k(0,"heightfield",M.vr())
$.$get$b2().k(0,"hyperboloid",M.vs())
$.$get$b2().k(0,"loopsubdiv",M.vt())
$.$get$b2().k(0,"nurbs",M.vu())
$.$get$b2().k(0,"paraboloid",M.vv())
$.$get$b2().k(0,"sphere",M.vw())
$.$get$b2().k(0,"trianglemesh",M.vx())
$.$get$aS().k(0,"bilerp",G.vN())
$.$get$aU().k(0,"bilerp",G.vO())
$.$get$aS().k(0,"checkerboard",G.vP())
$.$get$aU().k(0,"checkerboard",G.vQ())
$.$get$aS().k(0,"constant",G.tL())
$.$get$aU().k(0,"constant",G.tM())
$.$get$aS().k(0,"dots",G.vR())
$.$get$aU().k(0,"dots",G.vS())
$.$get$aS().k(0,"fbm",G.vT())
$.$get$aU().k(0,"fbm",G.vU())
$.$get$aS().k(0,"imagemap",G.vV())
$.$get$aU().k(0,"imagemap",G.vW())
$.$get$aS().k(0,"marble",G.vX())
$.$get$aU().k(0,"marble",G.vY())
$.$get$aS().k(0,"mix",G.vZ())
$.$get$aU().k(0,"mix",G.w_())
$.$get$aS().k(0,"scale",G.w0())
$.$get$aU().k(0,"scale",G.w1())
$.$get$aS().k(0,"uv",G.w2())
$.$get$aU().k(0,"uv",G.w3())
$.$get$aS().k(0,"windy",G.w4())
$.$get$aU().k(0,"windy",G.w5())
$.$get$aS().k(0,"wrinkled",G.w6())
$.$get$aU().k(0,"wrinkled",G.w7())
$.$get$h7().k(0,"emission",S.wa())
$.$get$h7().k(0,"single",S.wb())
$.$get$e_().k(0,"exponential",B.wc())
$.$get$e_().k(0,"homogeneous",B.wd())
$.$get$e_().k(0,"volumegrid",B.we())},
m7:{
"^":"j;a,b,c,d,e,f,r,x,y,z,Q,ch,cx"},
mY:{
"^":"j;a,b,c,d,e,f,r,x,y"},
pe:{
"^":"pt;",
nF:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s
z={}
$.A=c
if(C.c.b6(a,"/")){y=C.c.e_(a,"/")
this.x=C.c.as(a,0,y)
a=C.c.dt(a,y+1)}x=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[G.c6])),[G.c6])
z.a=d
this.z=H.p(Array(d),[A.jK])
for(y=0;y<d;++y){w=this.z
v=$.e6
$.e6=v+1
u=new H.bG(v,null,!1)
t=init.globalState.d
s=t.b
if(s.X(v))H.K(P.cu("Registry: ports must be registered only once."))
s.k(0,v,u)
t.d1()
v=new H.jI(u,null)
t=P.jZ(v.gi3(v),null,null,null,!0,null)
v.b=t
u.b=t.ghU(t)
if(y>=w.length)return H.a(w,y)
w[y]=new A.jK(1,v,null,f,null,y,d)
v=this.z
if(y>=v.length)return H.a(v,y)
v[y].nD(a,b,e).di(new A.pg(z,this,d,x),new A.ph(z,x,y))}return x.a},
nE:function(a,b,c,d,e){return this.nF(a,b,c,1,d,e)}},
pg:{
"^":"r:0;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
if(this.c>1){z=this.b
y=z.y
if(y==null||!J.k(y.gdW(),a.gdW())||!J.k(z.y.gn5(),a.f))z.y=G.h0(0,0,a.gdW(),a.f,null,null,null)
y=J.z(a)
x=0
while(!0){w=y.gC(a)
if(typeof w!=="number")return H.c(w)
if(!(x<w))break
v=J.b(J.h(J.h(J.b(a.gfB(),x),z.y.gdW()),3),J.h(a.gfz(),3))
u=0
while(!0){w=y.gD(a)
if(typeof w!=="number")return H.c(w)
if(!(u<w))break
J.n(z.y.gea(),v,J.e(a.gea(),v))
w=z.y.gea()
t=J.G(v)
s=t.i(v,1)
r=a.r
q=J.y(r)
J.n(w,s,q.h(r,t.i(v,1)))
J.n(z.y.gea(),t.i(v,2),q.h(r,t.i(v,2)));++u
v=t.i(v,3)}++x}}else this.b.y=a
if(--this.a.a===0)this.d.aA(0,this.b.y)}},
ph:{
"^":"r:0;a,b,c",
$1:function(a){var z="ERROR Thread "+this.c+": "+H.l(a)
$.A.$2(2,z);--this.a.a
z=this.b
if(z.a.a===0)z.aA(0,null)}},
pm:{
"^":"j;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx",
jI:function(){this.a=0
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
static:{pn:function(){var z=new A.pm(null,null,null,new G.q([],[],[],[],[],[],[],[],[]),null,new G.q([],[],[],[],[],[],[],[],[]),null,null,new G.q([],[],[],[],[],[],[],[],[]),null,new G.q([],[],[],[],[],[],[],[],[]),null,new G.q([],[],[],[],[],[],[],[],[]),null,new G.q([],[],[],[],[],[],[],[],[]),null,new G.q([],[],[],[],[],[],[],[],[]),null,new G.q([],[],[],[],[],[],[],[],[]),null,new G.q([],[],[],[],[],[],[],[],[]),null,[],[],[],P.Z(),[],null,null)
z.jI()
return z}}},
jK:{
"^":"j;a,b,c,d,e,f,r",
nD:function(a,b,c){var z,y
z=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[G.c6])),[G.c6])
this.e=c
y=this.b
P.nK(P.qy(b,0,null),["_"],new H.cM(y.a,init.globalState.d.a),null,null,!1).at(new A.pr())
y=y.b
y.toString
H.p(new P.hX(y),[H.ar(y,0)]).aL(new A.ps(this,a,z),null,null,null)
return z.a},
md:function(a,b){var z,y,x,w,v,u,t,s
z=J.B(b)
if(!!z.$isbj){z=z.ga5(b)
y=(z&&C.f).bM(z,0,null)}else{z=H.ck(b,"$isw",[P.o],"$asw")
if(z){z=new Uint8Array(H.D(b)).buffer
y=(z&&C.f).bM(z,0,null)}else return}x=$.bH.x
z=J.y(a)
w=J.m(z.h(a,1),z.h(a,0))
v=J.b(J.h(z.h(a,2),$.bH.a),z.h(a,0))
for(u=z.h(a,2);t=J.u(u),t.I(u,z.h(a,3));u=t.i(u,1),v=s.i(v,$.bH.a)){s=J.G(v)
C.q.aj(x,v,s.i(v,w),y,v)}},
fs:function(a){return this.d.$1(a)}},
pr:{
"^":"r:0;",
$1:function(a){}},
ps:{
"^":"r:0;a,b,c",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.a
y=z.a
if(y===1){if(!!J.B(a).$ishm){z.c=a
z.a=2
y=z.f
x=z.r
w=P.aP(["cmd","render","scene",this.b,"taskNum",y,"taskCount",x,"preview",!0])
y=z.e
if(y!=null)w.k(0,"overrides",y.nQ())
z.c.ce(0,w)}}else if(y===2){y=J.B(a)
if(!!y.$iscz&&a.X("cmd")===!0){w=y.h(a,"cmd")
x=J.B(w)
if(x.A(w,"request")){v=y.h(a,"id")
u=y.h(a,"msg")
y=J.B(u)
if(!!y.$iscz&&u.X("cmd")===!0)if(J.k(y.h(u,"cmd"),"file")){t=y.h(u,"path")
$.ai.dg(t,!1,null).at(new A.pq(z,v))}return}else if(x.A(w,"preview")&&a.X("image")===!0){s=y.h(a,"image")
r=y.h(a,"extents")
q=y.h(a,"res")
if(q==null)return
y=$.bH
if(y!=null){x=J.y(q)
y=!J.k(y.a,x.h(q,0))||!J.k($.bH.b,x.h(q,1))}else y=!0
if(y){y=J.y(q)
y=U.aZ(y.h(q,0),y.h(q,1),4)
$.bH=y
y=y.x
C.q.ag(y,0,y.length,U.tV(128,128,128,255))}if(z.r>1)z.md(r,s)
else{y=$.bH.x.buffer
C.h.bi((y&&C.f).a0(y,0,null),0,J.M(s),s)}z.fs($.bH)
return}else if(x.A(w,"error")){z="ERROR: "+H.l(y.h(a,"msg"))
$.A.$2(0,z)
this.c.dS(y.h(a,"msg"))
return}else if(x.A(w,"final")&&a.X("output")===!0){p=y.h(a,"output")
r=y.h(a,"extents")
q=y.h(a,"res")
z=J.y(r)
o=J.m(z.h(r,1),z.h(r,0))
n=J.m(z.h(r,3),z.h(r,2))
y=J.y(q)
this.c.aA(0,G.h0(z.h(r,0),z.h(r,2),o,n,y.h(q,0),y.h(q,1),p))
return}}z=y.E(a)
$.A.$2(0,z)}}},
pq:{
"^":"r:0;a,b",
$1:function(a){var z=P.aP(["cmd","request","id",this.b,"data",a])
this.a.c.ce(0,z)}},
qi:{
"^":"j;fv:a<",
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=2)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=2)return H.a(z,b)
z[b]=c},
jQ:function(){var z,y
for(z=this.a,y=0;y<2;++y)z[y]=G.a1(null,null)},
static:{qj:function(){var z=Array(2)
z.fixed$length=Array
z=new A.qi(H.p(z,[G.v]))
z.jQ()
return z}}}}],["","",,T,{
"^":"",
pd:{
"^":"pe;f,r,x,y,z,a,b,c,d,e",
ig:function(a){var z,y
z="REQUEST FILE "+H.l(a)
$.A.$2(4,z)
y=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[[P.w,P.o]])),[[P.w,P.o]])
this.le(a).at(new T.pk(a,y)).i1(new T.pl(y))
return y.a},
le:function(a){var z,y
z={}
z.a=a
y=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[[P.w,P.o]])),[[P.w,P.o]])
a=this.x+"/"+H.l(a)
z.a=a
W.n7(a,"GET","text/plain; charset=x-user-defined",null,null,null,null,null).at(new T.pi(y)).i1(new T.pj(z))
return y.a}},
pk:{
"^":"r:0;a,b",
$1:function(a){var z="LOADED FILE "+H.l(this.a)
$.A.$2(4,z)
this.b.aA(0,a)}},
pl:{
"^":"r:0;a",
$1:function(a){var z=J.bS(a)
$.A.$2(2,z)
this.a.aA(0,null)}},
pi:{
"^":"r:0;a",
$1:function(a){var z,y
z=J.lw(a)
if(typeof z==="string"){this.a.aA(0,new Uint8Array(H.D(J.lr(W.cP(a.response)))))
return}else if(!!J.B(W.cP(a.response)).$islT){this.a.aA(0,J.eO(W.cP(a.response),0,null))
return}else{z=W.cP(a.response)
y=H.ck(z,"$isw",[P.o],"$asw")
if(y){this.a.aA(0,W.cP(a.response))
return}else $.A.$2(2,"Unknown HttpRequest response type")}}},
pj:{
"^":"r:0;a",
$1:function(a){var z="Error Loading Resource "+H.l(this.a.a)
$.A.$2(2,z)}}}],["","",,R,{
"^":"",
ft:{
"^":"bX;d,e,f,r,x,y,z,Q,ch,D:cx>,C:cy>,db,dx,dy,fr,fx,fy,a,b,c",
jl:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q
for(z=this.fy,y=0;y<256;++y)z[y]=C.a.v(C.b.F(Math.floor(Math.pow(y/255,0.45454545454545453)*255)),0,255)
z=this.a
x=this.d
w=J.y(x)
v=w.h(x,0)
if(typeof v!=="number")return H.c(v)
this.Q=C.b.F(Math.ceil(z*v))
v=w.h(x,1)
if(typeof v!=="number")return H.c(v)
this.cx=P.O(1,C.b.F(Math.ceil(z*v))-this.Q)
v=this.b
z=w.h(x,2)
if(typeof z!=="number")return H.c(z)
this.ch=C.b.F(Math.ceil(v*z))
x=w.h(x,3)
if(typeof x!=="number")return H.c(x)
x=P.O(1,C.b.F(Math.ceil(v*x))-this.ch)
this.cy=x
v=this.cx
this.y=v*12
this.dx=new Float32Array(H.i(v*x*3))
this.dy=new Float32Array(H.i(this.cx*this.cy*3))
this.fr=new Float32Array(H.i(this.cx*this.cy))
this.fx=new Float32Array(H.i(256))
for(u=0,t=0;t<16;++t){z=this.z.go3()
if(typeof z!=="number")return H.c(z)
s=(t+0.5)*z/16
for(r=0;r<16;++r,u=q){z=this.z.go2()
if(typeof z!=="number")return H.c(z)
x=this.fx
q=u+1
z=this.z.d8((r+0.5)*z/16,s)
if(u<0||u>=x.length)return H.a(x,u)
x[u]=z}}z=U.aZ(this.cx,this.cy,4)
this.db=z
z=z.x
C.q.ag(z,0,z.length,4287137928)
z="FILM "+this.Q+" "+this.ch+" "+H.l(this.cx)+" "+H.l(this.cy)
$.A.$2(0,z)
z=this.Q
x=this.ch
w=this.cx
v=this.cy
this.r=G.h0(z,x,w,v,w,v,null)
if(this.f!=null)this.fs(this.db)},
fs:function(a){return this.f.$1(a)},
static:{ne:function(a,b,c,d,e,f){var z=new R.ft(d,e,f,null,0,null,c,null,null,null,null,null,null,null,null,null,new Uint8Array(H.i(256)),a,b,1)
z.jl(a,b,c,d,e,f)
return z},nf:[function(a,b,c){var z,y,x,w
z=a.N("xresolution",640)
y=a.N("yresolution",480)
x=a.aV("filename","")
w=a.bc("cropwindow")
if(w==null)w=[0,1,0,1]
return R.ne(J.aH(J.h(z,G.jJ())),J.aH(J.h(y,G.jJ())),b,w,x,c)},function(a,b){return R.nf(a,b,null)},"$3","$2","tO",4,2,49,0]}}}],["","",,S,{
"^":"",
eZ:{
"^":"bY;a,b,c,d",
d8:function(a,b){return 1},
static:{wr:[function(a){var z,y
z=a.j("xwidth",0.5)
y=a.j("ywidth",0.5)
if(typeof z!=="number")return H.c(z)
if(typeof y!=="number")return H.c(y)
return new S.eZ(z,y,1/z,1/y)},"$1","tP",2,0,50]}},
fg:{
"^":"bY;e,f,r,a,b,c,d",
d8:function(a,b){return this.hc(a,this.f)*this.hc(b,this.r)},
hc:function(a,b){return P.O(0,Math.exp(H.T(J.h(J.h(J.bd(this.e),a),a)))-b)},
static:{xj:[function(a){var z,y,x,w,v
z=a.j("xwidth",2)
y=a.j("ywidth",2)
x=a.j("alpha",2)
w=J.u(x)
v=Math.exp(H.T(J.h(J.h(w.aa(x),z),z)))
w=Math.exp(H.T(J.h(J.h(w.aa(x),y),y)))
if(typeof z!=="number")return H.c(z)
if(typeof y!=="number")return H.c(y)
return new S.fg(x,v,w,z,y,1/z,1/y)},"$1","tQ",2,0,51]}},
fG:{
"^":"bY;e,a,b,c,d",
d8:function(a,b){return this.hL(a*this.c)*this.hL(b*this.d)},
hL:function(a){var z,y
a=Math.abs(a)
if(a<0.00001)return 1
if(a>1)return 0
a*=3.141592653589793
z=Math.sin(H.T(a))
y=this.e
if(typeof y!=="number")return H.c(y)
y=a*y
return z/a*(Math.sin(H.T(y))/y)},
static:{xH:[function(a){var z,y,x
z=a.j("xwidth",4)
y=a.j("ywidth",4)
x=a.j("tau",3)
if(typeof z!=="number")return H.c(z)
if(typeof y!=="number")return H.c(y)
return new S.fG(x,z,y,1/z,1/y)},"$1","tR",2,0,52]}},
fT:{
"^":"bY;e,an:f<,a,b,c,d",
d8:function(a,b){return J.h(this.hs(a*this.c),this.hs(b*this.d))},
hs:function(a){var z,y,x
a=Math.abs(2*a)
z=this.e
if(a>1){z=J.bd(z)
y=this.f
if(typeof y!=="number")return H.c(y)
y=J.h(J.h(J.h(J.m(z,6*y),a),a),a)
z=this.e
if(typeof z!=="number")return H.c(z)
x=this.f
if(typeof x!=="number")return H.c(x)
x=J.b(y,(6*z+30*x)*a*a)
z=this.e
if(typeof z!=="number")return H.c(z)
y=this.f
if(typeof y!=="number")return H.c(y)
y=J.b(x,(-12*z-48*y)*a)
z=this.e
if(typeof z!=="number")return H.c(z)
x=this.f
if(typeof x!=="number")return H.c(x)
return J.h(J.b(y,8*z+24*x),0.16666666666666666)}else{if(typeof z!=="number")return H.c(z)
y=this.f
if(typeof y!=="number")return H.c(y)
y=6*y
return((12-9*z-y)*a*a*a+(-18+12*z+y)*a*a+(6-2*z))*0.16666666666666666}},
static:{xY:[function(a){var z,y,x,w
z=a.j("xwidth",2)
y=a.j("ywidth",2)
x=a.j("B",0.3333333333333333)
w=a.j("C",0.3333333333333333)
if(typeof z!=="number")return H.c(z)
if(typeof y!=="number")return H.c(y)
return new S.fT(x,w,z,y,1/z,1/y)},"$1","tS",2,0,53]}},
hD:{
"^":"bY;a,b,c,d",
d8:function(a,b){return P.O(0,J.m(this.a,Math.abs(a)))*P.O(0,J.m(this.b,Math.abs(b)))},
static:{yT:[function(a){var z,y
z=a.j("xwidth",2)
y=a.j("ywidth",2)
if(typeof z!=="number")return H.c(z)
if(typeof y!=="number")return H.c(y)
return new S.hD(z,y,1/z,1/y)},"$1","tT",2,0,54]}}}],["","",,P,{
"^":"",
l5:function(a,b){var z=[]
return new P.tJ(b,new P.tH([],z),new P.tI(z),new P.tK(z)).$1(a)},
l6:function(a){var z,y
z=J.B(a)
if(!!z.$isfs){y=z.gB(a)
if(y.constructor===Array)if(typeof CanvasPixelArray!=="undefined"){y.constructor=CanvasPixelArray
y.BYTES_PER_ELEMENT=1}return a}return new P.kR(a.data,a.height,a.width)},
tG:function(a){if(a instanceof P.kR)return{data:a.a,height:a.b,width:a.c}
return a},
iG:function(){var z=$.iF
if(z==null){z=$.iE
if(z==null){z=J.ip(window.navigator.userAgent,"Opera",0)
$.iE=z}z=z!==!0&&J.ip(window.navigator.userAgent,"WebKit",0)
$.iF=z}return z},
tH:{
"^":"r:111;a,b",
$1:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y}},
tI:{
"^":"r:112;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.a(z,a)
return z[a]}},
tK:{
"^":"r:113;a",
$2:function(a,b){var z=this.a
if(a>=z.length)return H.a(z,a)
z[a]=b}},
tJ:{
"^":"r:0;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t,s,r
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.iB(a.getTime(),!0)
if(a instanceof RegExp)throw H.f(new P.dm("structured clone of RegExp"))
z=Object.getPrototypeOf(a)
if(z===Object.prototype||z===null){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
x=P.Z()
this.d.$2(y,x)
for(w=Object.keys(a),v=w.length,u=0;u<w.length;w.length===v||(0,H.aA)(w),++u){t=w[u]
x.k(0,t,this.$1(a[t]))}return x}if(a instanceof Array){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
w=J.y(a)
s=w.gm(a)
x=this.a?new Array(s):a
this.d.$2(y,x)
if(typeof s!=="number")return H.c(s)
v=J.as(x)
r=0
for(;r<s;++r)v.k(x,r,this.$1(w.h(a,r)))
return x}return a}},
kR:{
"^":"j;B:a>,C:b>,D:c>",
$isfs:1,
$isE:1},
iS:{
"^":"c3;a,b",
gc_:function(){var z=this.b
return P.cx(z.o_(z,new P.mH()),!0,H.ar(this,0))},
aH:function(a,b){C.e.aH(this.gc_(),b)},
k:function(a,b,c){var z=this.gc_()
if(b>>>0!==b||b>=z.length)return H.a(z,b)
J.lB(z[b],c)},
sm:function(a,b){var z=this.gc_().length
if(b>=z)return
else if(b<0)throw H.f(P.ak("Invalid list length"))
this.nC(0,b,z)},
a4:function(a,b){this.b.a.appendChild(b)},
aj:function(a,b,c,d,e){throw H.f(new P.a_("Cannot setRange on filtered list"))},
ag:function(a,b,c,d){throw H.f(new P.a_("Cannot fillRange on filtered list"))},
nC:function(a,b,c){C.e.aH(C.e.ay(this.gc_(),b,c),new P.mI())},
gm:function(a){return this.gc_().length},
h:function(a,b){var z=this.gc_()
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
gad:function(a){var z=this.gc_()
return new J.eU(z,z.length,0,null)},
S:function(a){return this.gm(this).$0()}},
mH:{
"^":"r:0;",
$1:function(a){return!!J.B(a).$isbo}},
mI:{
"^":"r:0;",
$1:function(a){return J.lA(a)}}}],["","",,U,{
"^":"",
tV:function(a,b,c,d){var z,y,x,w
z=J.P(d,0,255)
if(typeof z!=="number")return z.n()
y=J.P(c,0,255)
if(typeof y!=="number")return y.n()
x=J.P(b,0,255)
if(typeof x!=="number")return x.n()
w=J.P(a,0,255)
if(typeof w!=="number")return H.c(w)
return(z<<24|y<<16|x<<8|w)>>>0},
tw:function(a,b,c,d,e,f,g,h,i,j,k){var z,y,x,w,v,u,t,s,r,q,p
z=a.x.buffer
y=(z&&C.f).a0(z,0,null)
for(x=y.length,w=0;w<x;w+=4){v=y[w]/255
z=w+1
if(z>=x)return H.a(y,z)
u=y[z]/255
t=w+2
if(t>=x)return H.a(y,t)
s=y[t]/255
r=s
q=u
p=v
p=Math.pow(p,g)
q=Math.pow(q,g)
r=Math.pow(r,g)
y[w]=C.a.v(C.b.F(p*255),0,255)
y[z]=C.a.v(C.b.F(q*255),0,255)
y[t]=C.a.v(C.b.F(r*255),0,255)}return a},
iM:function(a,b,c,d){var z
switch(a){case 1:return new U.mF(null,c,0,0,b)
case 2:z=d==null?1:d
return new U.iR(new T.cc(),c,z,null,0,0,b)
case 3:z=d==null?16:d
return new U.iR(new T.cc(),c,z,null,0,0,b)
case 4:return U.mD(b,c,d==null?32:d)
case 5:z=d==null?16:d
return new U.mE(new T.cc(),c,z,null,0,0,b)
case 6:return new U.iL(c,d==null?32:d,!1,0,0,b)
case 7:return new U.iL(c,d==null?32:d,!0,0,0,b)
default:throw H.f(new U.x("Invalid compression type: "+H.l(a)))}},
mx:function(a,b,c,d){var z,y,x,w,v,u,t,s
if(b===0){if(d!==0)throw H.f(new U.x("Incomplete huffman data"))
return}z=a.d
y=a.t()
x=a.t()
a.d=J.b(a.d,4)
w=a.t()
if(y<65537)v=x>=65537
else v=!0
if(v)throw H.f(new U.x("Invalid huffman table size"))
a.d=J.b(a.d,4)
v=Array(65537)
v.fixed$length=Array
u=H.p(v,[P.o])
C.e.ag(u,0,65537,0)
t=H.p(Array(16384),[U.iN])
for(s=0;s<16384;++s)t[s]=new U.iN(0,0,null)
U.my(a,b-20,y,x,u)
v=J.m(a.d,z)
if(typeof v!=="number")return H.c(v)
if(w>8*(b-v))throw H.f(new U.x("Error in header for Huffman-encoded data (invalid number of bits)."))
U.mu(u,y,x,t)
U.mw(u,t,a,w,x,d,c)},
mw:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p
z=[0,0]
y=J.b(c.d,C.a.a3(d+7,8))
for(x=0;J.a7(c.d,y);){U.fd(z,c)
for(;w=z[1],w>=14;){v=b[C.b.w(z[0],w-14)&16383]
u=v.a
if(u!==0){z[1]=w-u
x=U.fe(v.b,e,z,c,g,x,f)}else{if(v.c==null)throw H.f(new U.x("Error in Huffman-encoded data (invalid code)."))
for(t=0;t<v.b;++t){w=v.c
if(t>=w.length)return H.a(w,t)
w=w[t]
if(w>>>0!==w||w>=65537)return H.a(a,w)
s=J.J(a[w],63)
if(typeof s!=="number")return H.c(s)
while(!0){if(!(z[1]<s&&J.a7(c.d,y)))break
U.fd(z,c)}w=z[1]
if(w>=s){u=v.c
if(t>=u.length)return H.a(u,t)
r=u[t]
if(r>>>0!==r||r>=65537)return H.a(a,r)
r=a[r]
if(typeof r!=="number")return r.w()
w-=s
if(C.b.l(r,6)===(C.b.w(z[0],w)&C.a.H(1,s)-1)>>>0){z[1]=w
q=U.fe(u[t],e,z,c,g,x,f)
x=q
break}}}if(t===v.b)throw H.f(new U.x("Error in Huffman-encoded data (invalid code)."))}}}p=8-d&7
z[0]=C.b.l(z[0],p)
z[1]=z[1]-p
for(;w=z[1],w>0;){v=b[C.b.n(z[0],14-w)&16383]
u=v.a
if(u!==0){z[1]=w-u
x=U.fe(v.b,e,z,c,g,x,f)}else throw H.f(new U.x("Error in Huffman-encoded data (invalid code)."))}if(x!==f)throw H.f(new U.x("Error in Huffman-encoded data (decoded data are shorter than expected)."))},
fe:function(a,b,c,d,e,f,g){var z,y,x,w,v,u
if(J.k(a,b)){if(c[1]<8)U.fd(c,d)
z=c[1]-8
c[1]=z
y=C.b.w(c[0],z)&255
if(f+y>g)throw H.f(new U.x("Error in Huffman-encoded data (decoded data are longer than expected)."))
z=f-1
x=e.length
if(z<0||z>=x)return H.a(e,z)
w=e[z]
for(;v=y-1,y>0;y=v,f=u){u=f+1
if(f>=x)return H.a(e,f)
e[f]=w}}else{if(f<g){u=f+1
if(f>=e.length)return H.a(e,f)
e[f]=a}else throw H.f(new U.x("Error in Huffman-encoded data (decoded data are longer than expected)."))
f=u}return f},
mu:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
for(;b<=c;++b){if(b>=65537)return H.a(a,b)
z=a[b]
if(typeof z!=="number")return z.w()
y=C.b.l(z,6)
x=z&63
if(C.a.bm(y,x)!==0)throw H.f(new U.x("Error in Huffman-encoded data (invalid code table entry)."))
if(x>14){z=C.a.aR(y,x-14)
if(z>=16384)return H.a(d,z)
w=d[z]
if(w.a!==0)throw H.f(new U.x("Error in Huffman-encoded data (invalid code table entry)."))
z=++w.b
y=w.c
if(y!=null){v=Array(z)
v.fixed$length=Array
v.$builtinTypeInfo=[P.o]
w.c=v
for(u=w.b-1,t=0;t<u;++t){if(t>=y.length)return H.a(y,t)
s=y[t]
if(t>=z)return H.a(v,t)
v[t]=s}}else w.c=[0]
z=w.c
y=w.b-1
if(y<0||y>=z.length)return H.a(z,y)
z[y]=b}else if(x!==0){z=14-x
r=C.a.n(y,z)
if(r>=16384)return H.a(d,r)
for(t=C.a.n(1,z);t>0;--t,++r){if(r>=16384)return H.a(d,r)
w=d[r]
if(w.a!==0||w.c!=null)throw H.f(new U.x("Error in Huffman-encoded data (invalid code table entry)."))
w.a=x
w.b=b}}}},
my:function(a,b,c,d,e){var z,y,x,w,v,u,t
z=a.d
y=[0,0]
for(x=d+1;c<=d;++c){if(J.V(J.m(a.d,z),b))throw H.f(new U.x("Error in Huffman-encoded data (unexpected end of code table data)."))
w=U.iO(6,y,a)
if(c<0||c>=65537)return H.a(e,c)
e[c]=w
if(w===63){if(J.V(J.m(a.d,z),b))throw H.f(new U.x("Error in Huffman-encoded data (unexpected end of code table data)."))
v=U.iO(8,y,a)+6
if(c+v>x)throw H.f(new U.x("Error in Huffman-encoded data (code table is longer than expected)."))
for(;u=v-1,v!==0;v=u,c=t){t=c+1
if(c>=65537)return H.a(e,c)
e[c]=0}--c}else if(w>=59){v=w-59+2
if(c+v>x)throw H.f(new U.x("Error in Huffman-encoded data (code table is longer than expected)."))
for(;u=v-1,v!==0;v=u,c=t){t=c+1
if(c>=65537)return H.a(e,c)
e[c]=0}--c}}U.mv(e)},
mv:function(a){var z,y,x,w,v,u
z=Array(59)
z.fixed$length=Array
y=H.p(z,[P.o])
C.e.ag(y,0,59,0)
for(x=0;x<65537;++x){z=a[x]
if(z>>>0!==z||z>=59)return H.a(y,z)
y[z]=J.b(y[z],1)}for(w=0,x=58;x>0;--x,w=v){z=y[x]
if(typeof z!=="number")return H.c(z)
v=C.b.l(w+z,1)
y[x]=w}for(x=0;x<65537;++x){u=a[x]
if(J.V(u,0)){if(u>>>0!==u||u>=59)return H.a(y,u)
z=y[u]
y[u]=J.b(z,1)
if(typeof z!=="number")return z.n()
a[x]=(u|z<<6)>>>0}}},
fd:function(a,b){var z,y,x
z=a[0]
y=b.a
x=b.d
b.d=J.b(x,1)
x=J.e(y,x)
if(typeof x!=="number")return H.c(x)
a[0]=((z<<8|x)&-1)>>>0
a[1]=(a[1]+8&-1)>>>0},
iO:function(a,b,c){var z,y,x
for(;z=b[1],z<a;){z=b[0]
y=c.a
x=c.d
c.d=J.b(x,1)
x=J.e(y,x)
if(typeof x!=="number")return H.c(x)
b[0]=((z<<8|x)&-1)>>>0
b[1]=(b[1]+8&-1)>>>0}z-=a
b[1]=z
return(C.a.w(b[0],z)&C.a.H(1,a)-1)>>>0},
mG:function(a0,a1,a2,a3,a4,a5,a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=a6<16384
if(typeof a2!=="number")return a2.T()
if(typeof a4!=="number")return H.c(a4)
if(a2>a4)y=a4
else y=a2
for(x=1;x<=y;)x=x<<1>>>0
x=x>>>1
w=x>>>1
v=[0,0]
for(u=a0.length,t=x,x=w;x>=1;t=x,x=w){s=a1+a5*(a4-t)
r=a5*x
q=a5*t
if(typeof a3!=="number")return a3.q()
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
U.cv(a,b,v)
k=v[0]
i=v[1]
if(e<0||e>=u)return H.a(a0,e)
b=a0[e]
if(c<0||c>=u)return H.a(a0,c)
U.cv(b,a0[c],v)
j=v[0]
h=v[1]
U.cv(k,j,v)
a0[f]=v[0]
a0[e]=v[1]
U.cv(i,h,v)
a0[d]=v[0]
a0[c]=v[1]}else{if(f<0||f>=u)return H.a(a0,f)
if(d<0||d>=u)return H.a(a0,d)
U.d5(a,b,v)
k=v[0]
i=v[1]
if(e<0||e>=u)return H.a(a0,e)
b=a0[e]
if(c<0||c>=u)return H.a(a0,c)
U.d5(b,a0[c],v)
j=v[0]
h=v[1]
U.d5(k,j,v)
a0[f]=v[0]
a0[e]=v[1]
U.d5(i,h,v)
a0[d]=v[0]
a0[c]=v[1]}}if(n){d=f+r
b=a0[f]
a=a0[d]
if(z){if(f<0||f>=u)return H.a(a0,f)
if(d<0||d>=u)return H.a(a0,d)
U.cv(b,a,v)
k=v[0]
a0[d]=v[1]}else{if(f<0||f>=u)return H.a(a0,f)
if(d<0||d>=u)return H.a(a0,d)
U.d5(b,a,v)
k=v[0]
a0[d]=v[1]}if(f<0||f>=u)return H.a(a0,f)
a0[f]=k}}if((a4&x)>>>0!==0){g=l+m
for(f=l;f<=g;f+=o){e=f+p
if(f<0||f>=u)return H.a(a0,f)
n=a0[f]
if(e<0||e>=u)return H.a(a0,e)
U.cv(n,a0[e],v)
k=v[0]
a0[e]=v[1]
if(f<0||f>=u)return H.a(a0,f)
a0[f]=k}}w=x>>>1}},
cv:function(a,b,c){var z,y,x,w,v,u
z=$.$get$du()
z[0]=a
y=$.$get$eE()
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
z[0]=b
if(0>=x)return H.a(y,0)
v=y[0]
u=w+(v&1)+C.a.l(v,1)
c[0]=u
c[1]=u-v},
d5:function(a,b,c){var z
if(typeof b!=="number")return b.w()
z=J.J(J.m(a,C.b.l(b,1)),65535)
if(typeof z!=="number")return H.c(z)
c[1]=z
c[0]=b+z-32768&65535},
tU:function(a){var z,y,x,w,v
z=new Uint8Array(H.D(a))
U.S(z,!0,null,0)
if(new U.fB(null,null,null,null,null,null,Array(4),[],[],[],[],0,0).nZ(z))return new U.nU(null,null,null)
y=new U.oE(null,0,0,null,null,0,1,null)
if(y.fg(z))return y
x=new U.mT(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
x.c=U.S(z,!1,null,0)
x.b=new U.iW(0,null,!1,[],0,0,4294967295)
if(x.hf())return x
w=new U.qW(null,null,null)
if(w.fg(z))return w
v=new U.q7(null,null,null)
if(v.hz(U.S(z,!1,null,0))!=null)return v
if(U.jF(z).d===943870035)return new U.oS(null,null)
if(U.mA(z))return new U.mt(null,1,null,null,null,null,null)
return},
zG:[function(a,b,c,d,e,f){U.qY(f,a,b,c,d,e,!0,f)},"$6","uB",12,0,11],
zH:[function(a,b,c,d,e,f){U.qZ(f,a,b,c,d,e,!0,f)},"$6","uC",12,0,11],
zF:[function(a,b,c,d,e,f){U.qX(f,a,b,c,d,e,!0,f)},"$6","uA",12,0,11],
cb:function(a,b,c,d,e){var z,y
if(e){if(typeof d!=="number")return H.c(d)
z=0
for(;z<d;++z){y=J.b(J.e(a.a,J.b(a.d,z)),J.e(b.a,J.b(b.d,z)))
J.n(c.a,J.b(c.d,z),y)}}else{if(typeof d!=="number")return H.c(d)
z=0
for(;z<d;++z){y=J.m(J.e(a.a,J.b(a.d,z)),J.e(b.a,J.b(b.d,z)))
J.n(c.a,J.b(c.d,z),y)}}},
qY:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(typeof d!=="number")return H.c(d)
z=e*d
if(typeof f!=="number")return H.c(f)
y=e+f
x=U.S(a,!1,null,z)
w=U.S(a,!1,null,z)
v=U.C(g?w:x,null,0)
if(e===0){u=J.e(x.a,J.b(x.d,0))
J.n(w.a,J.b(w.d,0),u)
U.cb(U.C(x,null,1),v,U.C(w,null,1),J.m(b,1),g)
v.d=J.b(v.d,d)
x.d=J.b(x.d,d)
w.d=J.b(w.d,d)
e=1}for(u=-d,t=J.u(b);e<y;){U.cb(x,U.C(v,null,u),w,1,g)
U.cb(U.C(x,null,1),v,U.C(w,null,1),t.p(b,1),g);++e
v.d=J.b(v.d,d)
x.d=J.b(x.d,d)
w.d=J.b(w.d,d)}},
qZ:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u
if(typeof d!=="number")return H.c(d)
z=e*d
if(typeof f!=="number")return H.c(f)
y=e+f
x=U.S(a,!1,null,z)
w=U.S(h,!1,null,z)
v=U.C(g?w:x,null,0)
if(e===0){u=J.e(x.a,J.b(x.d,0))
J.n(w.a,J.b(w.d,0),u)
U.cb(U.C(x,null,1),v,U.C(w,null,1),J.m(b,1),g)
x.d=J.b(x.d,d)
w.d=J.b(w.d,d)
e=1}else v.d=J.m(v.d,d)
for(;e<y;){U.cb(x,v,w,b,g);++e
v.d=J.b(v.d,d)
x.d=J.b(x.d,d)
w.d=J.b(w.d,d)}},
qX:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t,s,r,q,p,o
if(typeof d!=="number")return H.c(d)
z=e*d
if(typeof f!=="number")return H.c(f)
y=e+f
x=U.S(a,!1,null,z)
w=U.S(h,!1,null,z)
v=U.C(g?w:x,null,0)
if(e===0){u=J.e(x.a,J.b(x.d,0))
J.n(w.a,J.b(w.d,0),u)
U.cb(U.C(x,null,1),v,U.C(w,null,1),J.m(b,1),g)
v.d=J.b(v.d,d)
x.d=J.b(x.d,d)
w.d=J.b(w.d,d)
e=1}for(u=-d;e<y;){U.cb(x,U.C(v,null,u),w,1,g)
if(typeof b!=="number")return H.c(b)
t=1
for(;t<b;++t){s=J.e(v.a,J.b(v.d,t-1))
r=t-d
q=J.e(v.a,J.b(v.d,r))
r=J.e(v.a,J.b(v.d,r-1))
p=J.m(J.b(s,q),r)
if(J.J(p,4294967040)===0)o=p
else{if(typeof p!=="number")return p.I()
o=p<0?0:255}s=J.e(x.a,J.b(x.d,t))
if(g)r=o
else{if(typeof o!=="number")return o.aa()
r=-o}r=J.b(s,r)
J.n(w.a,J.b(w.d,t),r)}++e
v.d=J.b(v.d,d)
x.d=J.b(x.d,d)
w.d=J.b(w.d,d)}},
n_:function(a){var z,y,x,w
if($.dM==null)U.iY()
$.$get$i6()[0]=a
z=$.$get$kT()
if(0>=z.length)return H.a(z,0)
y=z[0]
if(a===0)return y>>>16
x=y>>>23&511
z=$.iX
if(x>=z.length)return H.a(z,x)
x=z[x]
if(x!==0){w=y&8388607
return x+(w+4095+(w>>>13&1)>>>13)}return U.n0(y)},
n0:function(a){var z,y,x,w,v,u
z=a>>>16&32768
y=(a>>>23&255)-112
x=a&8388607
if(y<=0){if(y<-10)return z
x|=8388608
w=14-y
return(z|C.a.w(x+(C.a.n(1,w-1)-1)+(C.a.aR(x,w)&1),w))>>>0}else if(y===143){v=z|31744
if(x===0)return v
else{x=x>>>13
u=x===0?1:0
return v|x|u}}else{x=x+4095+(x>>>13&1)
if((x&8388608)!==0){++y
x=0}if(y>30)return z|31744
return(z|y<<10|x>>>13)>>>0}},
iY:function(){var z,y,x,w,v,u
if($.fl!=null)return
z=new Uint32Array(H.i(65536))
$.fl=z
z=z.buffer
z.toString
$.dM=H.oo(z,0,null)
z=H.i(512)
y=new Uint16Array(z)
$.iX=y
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
y[u]=(v|32768)>>>0}}for(x=0;x<65536;++x){z=$.fl
y=U.n1(x)
if(x>=z.length)return H.a(z,x)
z[x]=y}},
n1:function(a){var z,y,x,w
z=a>>>15&1
y=a>>>10&31
x=a&1023
if(y===0)if(x===0)return z<<31>>>0
else{for(;(x&1024)===0;){x=x<<1;--y}++y
x&=4294966271}else if(y===31){w=z<<31
if(x===0)return(w|2139095040)>>>0
else return(w|2139095040|x<<13)>>>0}return(z<<31|y+112<<23|x<<13)>>>0},
tX:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=new U.tY(new U.tZ())
y=a.a
if(y.gY(y))x=0
else{x=y.gb1(y)
x=J.cZ(x.gac(x))}if(y.gY(y))w=0
else{w=y.gb1(y)
w=J.cY(w.gac(w))}v=U.aZ(x,w,4)
w=v.x.buffer
u=(w&&C.f).a0(w,0,null)
if(!(a.b!=null||a.c!=null||a.d!=null))throw H.f(new U.x("Only RGB[A] images are currently supported."))
x=C.b.v(b+2.47393,-20,20)
H.T(2)
H.T(x)
t=Math.pow(2,x)
x=u.length
s=0
r=0
while(!0){if(y.gY(y))w=0
else{w=y.gb1(y)
w=J.cY(w.gac(w))}if(typeof w!=="number")return H.c(w)
if(!(s<w))break
q=0
while(!0){if(y.gY(y))w=0
else{w=y.gb1(y)
w=J.cZ(w.gac(w))}if(typeof w!=="number")return H.c(w)
if(!(q<w))break
w=a.b
p=w!=null?w.bS(q,s):0
w=a.c
o=w!=null?w.bS(q,s):0
w=a.d
n=w!=null?w.bS(q,s):0
if(p==1/0||p==-1/0||isNaN(p))p=0
if(o==1/0||o==-1/0||isNaN(o))o=0
if(n==1/0||n==-1/0||isNaN(n))n=0
m=z.$2(p,t)
l=z.$2(o,t)
k=z.$2(n,t)
j=P.O(m,P.O(l,k))
if(j>255){m=255*J.I(m,j)
l=255*J.I(l,j)
k=255*J.I(k,j)}i=r+1
w=C.a.v(J.aH(m),0,255)
if(r<0||r>=x)return H.a(u,r)
u[r]=w
r=i+1
w=C.a.v(J.aH(l),0,255)
if(i<0||i>=x)return H.a(u,i)
u[i]=w
i=r+1
w=C.a.v(J.aH(k),0,255)
if(r<0||r>=x)return H.a(u,r)
u[r]=w
w=a.e
if(w!=null){h=w.bS(q,s)
if(h==1/0||h==-1/0||isNaN(h))h=1
r=i+1
w=C.a.v(C.b.F(h*255),0,255)
if(i<0||i>=x)return H.a(u,i)
u[i]=w}else{r=i+1
if(i<0||i>=x)return H.a(u,i)
u[i]=255}++q}++s}return v},
ct:{
"^":"j;D:a>,C:b>"},
bV:{
"^":"j;",
f8:function(a,b){var z=this.c5(a,b)
if(z==null)return
return U.n3(z)},
i8:function(a){return this.f8(a,0)}},
mm:{
"^":"j;"},
mq:{
"^":"j;Z:a>,b,c,B:d>"},
iL:{
"^":"d4;d,e,f,a,b,c",
de:function(){return this.e},
b0:function(a,b,c,d,e){throw H.f(new U.x("B44 compression not yet supported."))},
cJ:function(a,b,c){return this.b0(a,b,c,null,null)}},
mr:{
"^":"j;Z:a>,b,c,d,e,f",
j8:function(a){var z,y
z=a.ca()
this.a=z
if(z.length===0){this.a=null
return}this.b=a.t()
z=a.a
y=a.d
a.d=J.b(y,1)
this.d=J.k(J.e(z,y),1)
a.d=J.b(a.d,3)
this.e=a.t()
this.f=a.t()
z=this.b
switch(z){case 0:this.c=4
break
case 1:this.c=2
break
case 2:this.c=4
break
default:throw H.f(new U.x("EXR Invalid pixel type: "+H.l(z)))}},
static:{ms:function(a){var z=new U.mr(null,null,null,null,null,null)
z.j8(a)
return z}}},
d4:{
"^":"j;",
b0:function(a,b,c,d,e){throw H.f(new U.x("Unsupported compression type"))},
cJ:function(a,b,c){return this.b0(a,b,c,null,null)},
eN:function(a,b,c){var z,y,x
z=C.a.ak(b,a)
y=C.b.ak(c,a)
x=z*a<b?0:1
return y-z+x}},
iN:{
"^":"j;a,b,e3:c>"},
mz:{
"^":"ct;d,e,f,a,b,c",
lO:function(a){var z,y,x,w,v,u,t,s,r
J.J(this.f,16)
for(z=this.d,y=0;y<z.length;++y){x=z[y]
w=x.a
for(v=w.a,u=0;t=x.b,u<t.length;++u){s=t[u]
if(!v.X(s.a)){t=x.f
this.a=t
r=x.r
this.b=r
w.d2(U.d7(s.a,t,r,s.b))}}if(x.id)this.lY(y,a)
else this.lX(y,a)}},
lY:function(b2,b3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1
z=this.d
if(b2>=z.length)return H.a(z,b2)
y=z[b2]
x=J.J(this.f,16)!==0
w=y.fr
v=y.dx
z=y.b.length
new Uint32Array(z)
u=U.C(b3,null,0)
z=y.a.a
t=0
s=0
while(!0){r=y.ry
if(typeof r!=="number")return H.c(r)
if(!(t<r))break
q=0
while(!0){r=y.rx
if(typeof r!=="number")return H.c(r)
if(!(q<r))break
r=s!==0
p=0
o=0
while(!0){n=y.r2
if(t>=n.length)return H.a(n,t)
n=n[t]
if(typeof n!=="number")return H.c(n)
if(!(p<n))break
m=0
while(!0){n=y.r1
if(q>=n.length)return H.a(n,q)
n=n[q]
if(typeof n!=="number")return H.c(n)
if(!(m<n))break
if(r)break
if(s<0||s>=v.length)return H.a(v,s)
n=v[s]
if(o<0||o>=n.length)return H.a(n,o)
u.d=n[o]
if(x)if(u.t()!==b2)throw H.f(new U.x("Invalid Image Data"))
l=u.t()
k=u.t()
u.t()
u.t()
j=u.t()
i=J.b(u.d,0)
n=u.a
h=u.e
g=J.b(i,j)
u.d=J.b(u.d,J.m(g,i))
f=y.k2
if(typeof f!=="number")return H.c(f)
e=k*f
f=y.k1
if(typeof f!=="number")return H.c(f)
d=l*f
c=w.a
b=w.b
f=this.a
if(typeof f!=="number")return H.c(f)
if(d+c>f);f=this.b
if(typeof f!=="number")return H.c(f)
if(e+b>f);a=w.b0(new U.a3(n,i,g,i,h),d,e,y.k1,y.k2)
c=w.a
b=w.b
a0=a.length
a1=y.b.length
a2=0
a3=0
while(!0){if(a3<b){n=this.b
if(typeof n!=="number")return H.c(n)
n=e<n}else n=!1
if(!n)break
for(a4=0;a4<a1;++a4){n=y.b
if(a4>=n.length)return H.a(n,a4)
a5=n[a4]
n=z.h(0,a5.a).e.buffer
a6=(n&&C.f).a0(n,0,null)
if(a2>=a0)break
n=y.k1
if(typeof n!=="number")return H.c(n)
d=l*n
for(n=a5.c,h=y.f,g=y.r,f=a6.length,a7=0;a7<c;++a7,++d){if(typeof n!=="number")return H.c(n)
a8=0
for(;a8<n;++a8,a2=b0){if(typeof h!=="number")return H.c(h)
if(d<h){if(typeof g!=="number")return H.c(g)
a9=e<g}else a9=!1
b0=a2+1
if(a9){b1=(e*h+d)*n+a8
if(a2<0||a2>=a0)return H.a(a,a2)
a9=a[a2]
if(b1<0||b1>=f)return H.a(a6,b1)
a6[b1]=a9}}}}++a3;++e}++m;++o}++p}++q;++s}++t}},
lX:function(a6,a7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
z=this.d
if(a6>=z.length)return H.a(z,a6)
y=z[a6]
x=J.J(this.f,16)!==0
w=y.fr
z=y.dx
if(0>=z.length)return H.a(z,0)
v=z[0]
y.e[3]
u=y.fx
if(typeof u!=="number")return H.c(u)
z=y.b.length
t=new Uint32Array(z)
s=U.C(a7,null,0)
for(r=v.length,q=y.a.a,p=w!=null,o=0,n=0;n<r;++n){s.d=v[n]
if(x)if(s.t()!==a6)throw H.f(new U.x("Invalid Image Data"))
m=s.t()
l=$.$get$b6()
l[0]=m
m=$.$get$cN()
if(0>=m.length)return H.a(m,0)
m[0]
l[0]=s.t()
if(0>=m.length)return H.a(m,0)
k=m[0]
j=J.b(s.d,0)
m=s.a
l=s.e
i=J.b(j,k)
h=new U.a3(m,j,i,j,l)
s.d=J.b(s.d,J.m(i,j))
g=p?w.cJ(h,0,o):h.aq()
f=g.length
e=y.b.length
d=0
while(!0){if(d<u){m=this.b
if(typeof m!=="number")return H.c(m)
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
a0=(m&&C.f).a0(m,0,null)
if(c>=f)break
m=y.f
if(typeof m!=="number")return H.c(m)
l=a.c
i=a0.length
a1=0
for(;a1<m;++a1){if(typeof l!=="number")return H.c(l)
a2=0
for(;a2<l;++a2,c=a4){if(b>=z)return H.a(t,b)
a3=t[b]
t[b]=a3+1
a4=c+1
if(c>>>0!==c||c>=f)return H.a(g,c)
a5=g[c]
if(a3>=i)return H.a(a0,a3)
a0[a3]=a5}}}++d;++o}}},
j9:function(a){var z,y,x,w,v
z=U.S(a,!1,null,0)
if(z.t()!==20000630)throw H.f(new U.x("File is not an OpenEXR image file."))
y=z.a
x=z.d
z.d=J.b(x,1)
x=J.e(y,x)
this.e=x
if(!J.k(x,2))throw H.f(new U.x("Cannot read version "+H.l(this.e)+" image files."))
y=z.aZ()
this.f=y
if(J.J(y,4294967289)!==0)throw H.f(new U.x("The file format version number's flag field contains unrecognized flags."))
if(J.J(this.f,16)===0){w=U.iQ(J.J(this.f,2)!==0,z)
if(w.f!=null)this.d.push(w)}else for(y=this.d;!0;){w=U.iQ(J.J(this.f,2)!==0,z)
if(w.f==null)break
y.push(w)}y=this.d
x=y.length
if(x===0)throw H.f(new U.x("Error reading image header"))
for(v=0;v<y.length;y.length===x||(0,H.aA)(y),++v)y[v].lT(z)
this.lO(z)},
static:{iP:function(a){var z=new U.mz([],null,null,0,0,4294967295)
z.j9(a)
return z},mA:function(a){var z,y,x
z=U.S(a,!1,null,0)
if(z.t()!==20000630)return!1
y=z.a
x=z.d
z.d=J.b(x,1)
if(!J.k(J.e(y,x),2))return!1
if(J.J(z.aZ(),4294967289)!==0)return!1
return!0}}},
mB:{
"^":"j;a,b,c,d,e,D:f>,C:r>,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1",
dG:function(a){var z
for(z=0;a>1;){++z
a=C.b.l(a,1)}return z},
dz:function(a){var z,y
for(z=0,y=0;a>1;){if((a&1)!==0)y=1;++z
a=C.b.l(a,1)}return z+y},
lT:function(a){var z,y,x,w,v
if(this.id)for(z=0;z<this.dx.length;++z){y=0
while(!0){x=this.dx
if(z>=x.length)return H.a(x,z)
x=x[z]
if(!(y<x.length))break
x[y]=a.iu();++y}}else{x=this.dx
if(0>=x.length)return H.a(x,0)
w=x[0].length
for(z=0;z<w;++z){x=this.dx
if(0>=x.length)return H.a(x,0)
x=x[0]
v=a.iu()
if(z>=x.length)return H.a(x,z)
x[z]=v}}},
ke:function(){var z,y,x,w,v,u
for(z=this.b,y=z.length,x=0,w=0;v=z.length,w<v;v===y||(0,H.aA)(z),++w){u=z[w].c
if(typeof u!=="number")return H.c(u)
x+=u}return x},
fU:function(a,b,c,d,e,f){var z,y,x,w,v,u
if(typeof b!=="number")return H.c(b)
z=f===1
y=d-c+1
x=0
for(;x<b;++x){w=C.a.H(1,x)
v=C.a.ak(y,w)
u=P.O(z&&v*w<y?v+1:v,1)
if(typeof e!=="number")return H.c(e)
u=C.b.ak(u+e-1,e)
if(x>=a.length)return H.a(a,x)
a[x]=u}},
ja:function(a2,a3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
z=this.id
this.cx=z?1:0
for(y=this.c;!0;){x=a3.ca()
if(x.length===0)break
w=a3.ca()
v=a3.t()
u=J.b(a3.d,0)
t=a3.a
s=a3.e
r=J.b(u,v)
q=new U.a3(t,u,r,u,s)
a3.d=J.b(a3.d,J.m(r,u))
y.k(0,x,new U.mq(x,w,v,q))
switch(x){case"channels":for(;!0;){p=U.ms(q)
if(p.a==null)break
this.b.push(p)}break
case"chromaticities":t=new Float32Array(8)
this.ch=t
s=q.t()
r=$.$get$b6()
r[0]=s
s=$.$get$dv()
if(0>=s.length)return H.a(s,0)
t[0]=s[0]
t=this.ch
r[0]=q.t()
if(0>=s.length)return H.a(s,0)
t[1]=s[0]
t=this.ch
r[0]=q.t()
if(0>=s.length)return H.a(s,0)
t[2]=s[0]
t=this.ch
r[0]=q.t()
if(0>=s.length)return H.a(s,0)
t[3]=s[0]
t=this.ch
r[0]=q.t()
if(0>=s.length)return H.a(s,0)
t[4]=s[0]
t=this.ch
r[0]=q.t()
if(0>=s.length)return H.a(s,0)
t[5]=s[0]
t=this.ch
r[0]=q.t()
if(0>=s.length)return H.a(s,0)
t[6]=s[0]
t=this.ch
r[0]=q.t()
if(0>=s.length)return H.a(s,0)
t[7]=s[0]
break
case"compression":t=q.a
s=q.d
q.d=J.b(s,1)
s=J.e(t,s)
this.db=s
if(J.V(s,7))throw H.f(new U.x("EXR Invalid compression type"))
break
case"dataWindow":t=q.t()
s=$.$get$b6()
s[0]=t
t=$.$get$cN()
if(0>=t.length)return H.a(t,0)
r=t[0]
s[0]=q.t()
if(0>=t.length)return H.a(t,0)
o=t[0]
s[0]=q.t()
if(0>=t.length)return H.a(t,0)
n=t[0]
s[0]=q.t()
if(0>=t.length)return H.a(t,0)
t=[r,o,n,t[0]]
this.e=t
this.f=t[2]-t[0]+1
this.r=t[3]-t[1]+1
break
case"displayWindow":t=q.t()
s=$.$get$b6()
s[0]=t
t=$.$get$cN()
if(0>=t.length)return H.a(t,0)
r=t[0]
s[0]=q.t()
if(0>=t.length)return H.a(t,0)
o=t[0]
s[0]=q.t()
if(0>=t.length)return H.a(t,0)
n=t[0]
s[0]=q.t()
if(0>=t.length)return H.a(t,0)
this.d=[r,o,n,t[0]]
break
case"lineOrder":t=q.a
s=q.d
q.d=J.b(s,1)
this.cy=J.e(t,s)
break
case"pixelAspectRatio":t=q.t()
$.$get$b6()[0]=t
t=$.$get$dv()
if(0>=t.length)return H.a(t,0)
this.x=t[0]
break
case"screenWindowCenter":t=q.t()
s=$.$get$b6()
s[0]=t
t=$.$get$dv()
if(0>=t.length)return H.a(t,0)
this.y=t[0]
s[0]=q.t()
if(0>=t.length)return H.a(t,0)
this.z=t[0]
break
case"screenWindowWidth":t=q.t()
$.$get$b6()[0]=t
t=$.$get$dv()
if(0>=t.length)return H.a(t,0)
this.Q=t[0]
break
case"tiles":this.k1=q.t()
this.k2=q.t()
t=q.a
s=q.d
q.d=J.b(s,1)
m=J.e(t,s)
this.k3=J.u(m).L(m,15)
if(typeof m!=="number")return m.w()
this.k4=C.b.l(m,4)&15
break
case"type":l=q.ca()
if(l==="deepscanline")this.cx=2
else if(l==="deeptile")this.cx=3
else throw H.f(new U.x("EXR Invalid type: "+l))
break
default:break}}if(z){z=this.e
y=z[0]
t=z[2]
s=z[1]
z=z[3]
switch(this.k3){case 0:k=1
break
case 1:z=P.O(t-y+1,z-s+1)
k=(this.k4===0?this.dG(z):this.dz(z))+1
break
case 2:j=t-y+1
k=(this.k4===0?this.dG(j):this.dz(j))+1
break
default:H.K(new U.x("Unknown LevelMode format."))
k=0}this.rx=k
z=this.e
y=z[0]
t=z[2]
s=z[1]
z=z[3]
switch(this.k3){case 0:k=1
break
case 1:z=P.O(t-y+1,z-s+1)
k=(this.k4===0?this.dG(z):this.dz(z))+1
break
case 2:i=z-s+1
k=(this.k4===0?this.dG(i):this.dz(i))+1
break
default:H.K(new U.x("Unknown LevelMode format."))
k=0}this.ry=k
if(this.k3!==2)this.ry=1
z=this.rx
if(typeof z!=="number")return H.c(z)
this.r1=H.p(Array(z),[P.o])
z=this.ry
if(typeof z!=="number")return H.c(z)
this.r2=H.p(Array(z),[P.o])
z=this.r1
y=this.rx
t=this.e
this.fU(z,y,t[0],t[2],this.k1,this.k4)
t=this.r2
y=this.ry
z=this.e
this.fU(t,y,z[1],z[3],this.k2,this.k4)
z=this.ke()
this.x1=z
y=this.k1
if(typeof y!=="number")return H.c(y)
y=z*y
this.x2=y
z=this.k2
if(typeof z!=="number")return H.c(z)
this.y1=y*z
this.fr=U.iM(this.db,this,y,z)
z=this.rx
y=this.ry
if(typeof z!=="number")return z.q()
if(typeof y!=="number")return H.c(y)
this.dx=H.p(Array(z*y),[P.hH])
h=0
g=0
while(!0){z=this.ry
if(typeof z!=="number")return H.c(z)
if(!(h<z))break
f=0
while(!0){z=this.rx
if(typeof z!=="number")return H.c(z)
if(!(f<z))break
z=this.dx
y=this.r1
if(f>=y.length)return H.a(y,f)
y=y[f]
t=this.r2
if(h>=t.length)return H.a(t,h)
t=t[h]
if(typeof y!=="number")return y.q()
if(typeof t!=="number")return H.c(t)
y=new Uint32Array(y*t)
if(g<0||g>=z.length)return H.a(z,g)
z[g]=y;++f;++g}++h}}else{z=this.r
if(typeof z!=="number")return z.i()
this.dy=new Uint32Array(H.i(z+1))
for(z=this.b,y=z.length,e=0;t=z.length,e<t;t===y||(0,H.aA)(z),++e){d=z[e]
s=d.c
r=this.f
if(typeof s!=="number")return s.q()
if(typeof r!=="number")return H.c(r)
c=C.a.ak(s*r,d.e)
s=this.r
if(typeof s!=="number")return H.c(s)
r=this.e
o=d.f
n=this.dy
b=0
for(;b<s;++b)if(C.a.R(b+r[1],o)===0){if(b>=n.length)return H.a(n,b)
n[b]=n[b]+c}}a=0
b=0
while(!0){z=this.r
if(typeof z!=="number")return H.c(z)
if(!(b<z))break
z=this.dy
if(b>=z.length)return H.a(z,b)
a=P.O(a,z[b]);++b}z=U.iM(this.db,this,a,null)
this.fr=z
z=z.de()
this.fx=z
this.fy=a*z
z=H.i(this.dy.length)
y=new Uint32Array(z)
this.go=y
for(t=this.dy,s=t.length-1,r=this.fx,a0=0,a1=0;a1<=s;++a1){if(typeof r!=="number")return H.c(r)
if(C.a.R(a1,r)===0)a0=0
if(a1>=z)return H.a(y,a1)
y[a1]=a0
a0+=t[a1]}z=this.r
if(typeof z!=="number")return z.i()
if(typeof r!=="number")return H.c(r)
this.dx=[new Uint32Array(H.i(C.a.ak(z+r,r)-1))]}},
static:{iQ:function(a,b){var z=new U.mB(new U.iZ(P.Z(),null,null,null,null,null),[],P.Z(),null,null,null,null,1,0,0,1,null,null,0,0,null,null,null,null,null,null,a,null,null,null,null,null,null,null,null,null,null,null)
z.ja(a,b)
return z}}},
mC:{
"^":"d4;d,e,f,r,x,a,b,c",
de:function(){return this.f},
b0:function(a,b,c,d,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(d==null)d=this.c.f
if(a0==null)a0=this.c.fx
if(typeof d!=="number")return H.c(d)
z=b+d-1
if(typeof a0!=="number")return H.c(a0)
y=c+a0-1
x=this.c
w=x.f
if(typeof w!=="number")return H.c(w)
if(z>w)z=w-1
w=x.r
if(typeof w!=="number")return H.c(w)
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
q.c=this.eN(r.e,b,z)
x=this.eN(r.f,c,y)
q.d=x
q.e=r.f
w=r.c
if(typeof w!=="number")return w.ak()
w=w/2|0
q.f=w
p=q.c
if(typeof p!=="number")return p.q()
t+=p*x*w}o=a.u()
n=a.u()
if(n>=8192)throw H.f(new U.x("Error in header for PIZ-compressed data (invalid bitmap size)."))
x=H.i(8192)
m=new Uint8Array(x)
if(o<=n){l=a.ax(n-o+1)
k=J.m(l.c,l.d)
if(typeof k!=="number")return H.c(k)
j=o
s=0
for(;s<k;++s,j=i){i=j+1
w=J.e(l.a,J.b(l.d,s))
if(j>=x)return H.a(m,j)
m[j]=w}}h=new Uint16Array(H.i(65536))
g=this.m4(m,h)
U.mx(a,a.t(),this.x,t)
for(s=0;s<u;++s){x=this.r
if(s>=x.length)return H.a(x,s)
q=x[s]
j=0
while(!0){x=q.f
if(typeof x!=="number")return H.c(x)
if(!(j<x))break
w=this.x
p=q.a
if(typeof p!=="number")return p.i()
f=q.c
e=q.d
if(typeof f!=="number")return f.q()
U.mG(w,p+j,f,x,e,f*x,g);++j}}this.k8(h,this.x,t)
x=this.d
if(x==null){x=this.e
if(typeof x!=="number")return x.q()
x=U.de(!1,x*this.f+73728)
this.d=x}x.a=0
for(;c<=y;++c)for(s=0;s<u;++s){x=this.r
if(s>=x.length)return H.a(x,s)
q=x[s]
x=q.e
if(typeof x!=="number")return H.c(x)
if(C.a.R(c,x)!==0)continue
x=q.c
w=q.f
if(typeof x!=="number")return x.q()
if(typeof w!=="number")return H.c(w)
b=x*w
for(;b>0;--b){x=this.d
w=this.x
p=q.b
if(typeof p!=="number")return p.i()
q.b=p+1
if(p<0||p>=w.length)return H.a(w,p)
x.o1(w[p])}}x=this.d
w=x.c.buffer
return(w&&C.f).a0(w,0,x.a)},
cJ:function(a,b,c){return this.b0(a,b,c,null,null)},
k8:function(a,b,c){var z,y,x
for(z=b.length,y=0;y<c;++y){if(y>=z)return H.a(b,y)
x=b[y]
if(x>>>0!==x||x>=65536)return H.a(a,x)
b[y]=a[x]}},
m4:function(a,b){var z,y,x,w,v
for(z=0,y=0;y<65536;++y){if(y!==0){x=y>>>3
if(x>=8192)return H.a(a,x)
x=J.J(a[x],C.a.H(1,y&7))!==0}else x=!0
if(x){w=z+1
if(z>=65536)return H.a(b,z)
b[z]=y
z=w}}for(w=z;w<65536;w=v){v=w+1
b[w]=0}return z-1},
jb:function(a,b,c){var z,y,x
z=H.p(Array(a.b.length),[U.kJ])
this.r=z
for(y=z.length,x=0;x<y;++x)z[x]=new U.kJ(null,null,null,null,null,null)
z=this.e
if(typeof z!=="number")return z.q()
this.x=new Uint16Array(H.i(C.b.a3(z*this.f,2)))},
static:{mD:function(a,b,c){var z=new U.mC(null,b,c,null,null,0,0,a)
z.jb(a,b,c)
return z}}},
kJ:{
"^":"j;a,b,c,d,e,f"},
mE:{
"^":"d4;d,e,f,r,a,b,c",
de:function(){return this.f},
b0:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.d.bp(T.b_(a.aq(),1,null,0),!1)
y=this.r
if(y==null){y=this.e
if(typeof y!=="number")return H.c(y)
y=U.de(!1,this.f*y)
this.r=y}y.a=0
x=[0,0,0,0]
y=H.i(1)
w=new Uint32Array(y)
v=w.buffer
u=(v&&C.f).a0(v,0,null)
if(d==null)d=this.c.f
if(e==null)e=this.c.fx
if(typeof d!=="number")return H.c(d)
t=b+d-1
if(typeof e!=="number")return H.c(e)
s=c+e-1
v=this.c
r=v.f
if(typeof r!=="number")return H.c(r)
if(t>r)t=r-1
r=v.r
if(typeof r!=="number")return H.c(r)
if(s>r)s=r-1
this.a=t-b+1
this.b=s-c+1
q=v.b.length
for(r=u.length,p=z.length,o=c,n=0;o<=s;++o)for(m=0;m<q;++m){l=v.b
if(m>=l.length)return H.a(l,m)
k=l[m]
if(C.a.R(c,k.f)!==0)continue
j=this.eN(k.e,b,t)
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
if(l.a===l.c.length)l.cq()
g=l.c
l=l.a++
if(l<0||l>=g.length)return H.a(g,l)
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
if(l.a===l.c.length)l.cq()
g=l.c
l=l.a++
if(l<0||l>=g.length)return H.a(g,l)
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
if(l.a===l.c.length)l.cq()
g=l.c
l=l.a++
if(l<0||l>=g.length)return H.a(g,l)
g[l]=h&255}}break}}y=this.r
v=y.c.buffer
return(v&&C.f).a0(v,0,y.a)},
cJ:function(a,b,c){return this.b0(a,b,c,null,null)}},
mF:{
"^":"d4;d,e,a,b,c",
de:function(){return 1},
b0:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=a.c
y=U.de(!1,J.h(J.m(z,a.d),2))
if(d==null)d=this.c.f
if(e==null)e=this.c.fx
if(typeof d!=="number")return H.c(d)
x=b+d-1
if(typeof e!=="number")return H.c(e)
w=c+e-1
v=this.c
u=v.f
if(typeof u!=="number")return H.c(u)
if(x>u)x=u-1
v=v.r
if(typeof v!=="number")return H.c(v)
if(w>v)w=v-1
this.a=x-b+1
this.b=w-c+1
for(;!J.U(a.d,z);){v=a.a
u=a.d
a.d=J.b(u,1)
u=J.e(v,u)
$.$get$cO()[0]=u
u=$.$get$dw()
if(0>=u.length)return H.a(u,0)
t=u[0]
if(t<0){s=-t
for(;r=s-1,s>0;s=r){v=a.a
u=a.d
a.d=J.b(u,1)
u=J.e(v,u)
if(y.a===y.c.length)y.cq()
v=y.c
q=y.a++
u=J.J(u,255)
if(q<0||q>=v.length)return H.a(v,q)
v[q]=u}}else for(s=t;r=s-1,s>=0;s=r){v=a.a
u=a.d
a.d=J.b(u,1)
u=J.e(v,u)
if(y.a===y.c.length)y.cq()
v=y.c
q=y.a++
u=J.J(u,255)
if(q<0||q>=v.length)return H.a(v,q)
v[q]=u}}z=y.c.buffer
p=(z&&C.f).a0(z,0,y.a)
for(o=p.length,n=1;n<o;++n)p[n]=p[n-1]+p[n]-128
z=this.d
if(z==null||z.length!==o){z=new Uint8Array(H.i(o))
this.d=z}v=C.a.a3(o+1,2)
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
cJ:function(a,b,c){return this.b0(a,b,c,null,null)}},
iR:{
"^":"d4;d,e,f,r,a,b,c",
de:function(){return this.f},
b0:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.d.bp(T.b_(a.aq(),1,null,0),!1)
if(d==null)d=this.c.f
if(e==null)e=this.c.fx
if(typeof d!=="number")return H.c(d)
y=b+d-1
if(typeof e!=="number")return H.c(e)
x=c+e-1
w=this.c
v=w.f
if(typeof v!=="number")return H.c(v)
if(y>v)y=v-1
w=w.r
if(typeof w!=="number")return H.c(w)
if(x>w)x=w-1
this.a=y-b+1
this.b=x-c+1
for(u=z.length,t=1;t<u;++t)z[t]=z[t-1]+z[t]-128
w=this.r
if(w==null||w.length!==u){w=new Uint8Array(H.i(u))
this.r=w}v=C.a.a3(u+1,2)
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
cJ:function(a,b,c){return this.b0(a,b,c,null,null)}},
mt:{
"^":"bV;b,c,d,e,f,r,a",
bz:function(a){var z=this.b
if(z==null)return
z=z.d
if(a>=z.length)return H.a(z,a)
return U.tX(z[a].a,this.c)},
mB:function(a){var z=this.b
if(z==null)return
z=z.d
if(a>=z.length)return
return z[a].a},
c5:function(a,b){this.b=U.iP(a)
return this.bz(b)},
f8:function(a,b){this.b=U.iP(a)
return this.mB(b)},
i8:function(a){return this.f8(a,0)}},
mS:{
"^":"j;a,b,c,d",
h:function(a,b){var z=this.d
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.d
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c
return c},
k9:function(a){var z
for(z=1;z<=8;++z)if(C.a.H(1,z)>=a)return z
return 0},
jc:function(a){this.a=this.k9(a)},
static:{iV:function(a){var z=new U.mS(null,a,null,new Uint8Array(H.i(a*3)))
z.jc(a)
return z}}},
mU:{
"^":"j;M:a*,K:b*,D:c>,C:d>,e,f4:f<,f9:r',i2:x?,y",
jd:function(a){var z,y,x,w,v,u,t,s,r
this.a=a.u()
this.b=a.u()
this.c=a.u()
this.d=a.u()
z=a.a
y=a.d
a.d=J.b(y,1)
x=J.e(z,y)
y=J.u(x)
w=J.b(y.L(x,7),1)
this.e=y.L(x,64)!==0
if(y.L(x,128)!==0){if(typeof w!=="number")return H.c(w)
this.f=U.iV(C.a.n(1,w))
for(v=0;z=this.f,v<z.b;++v){y=a.a
u=a.d
a.d=J.b(u,1)
u=J.e(y,u)
y=a.a
t=a.d
a.d=J.b(t,1)
t=J.e(y,t)
y=a.a
s=a.d
a.d=J.b(s,1)
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
z[t]=s}}this.y=J.m(a.d,a.b)},
static:{mV:function(a){var z=new U.mU(null,null,null,null,null,null,80,!0,null)
z.jd(a)
return z}}},
iW:{
"^":"ct;d,e,f,r,a,b,c"},
mT:{
"^":"bV;b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,a",
cQ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
this.c=U.S(a,!1,null,0)
this.b=new U.iW(0,null,!1,[],0,0,4294967295)
if(!this.hf())return
try{for(;q=this.c,!J.U(q.d,q.c);){q=this.c
p=q.a
o=q.d
q.d=J.b(o,1)
z=J.e(p,o)
switch(z){case 44:y=this.hM()
if(y==null){q=this.b
return q}this.b.r.push(y)
break
case 33:q=this.c
p=q.a
o=q.d
q.d=J.b(o,1)
x=J.e(p,o)
if(J.k(x,249)){q=this.c
p=q.a
o=q.d
q.d=J.b(o,1)
J.e(p,o)
o=this.c
p=o.a
q=o.d
o.d=J.b(q,1)
w=J.e(p,q)
v=this.c.u()
q=this.c
p=q.a
o=q.d
q.d=J.b(o,1)
u=J.e(p,o)
o=this.c
p=o.a
q=o.d
o.d=J.b(q,1)
J.e(p,q)
q=w
if(typeof q!=="number")return q.w()
t=C.b.l(q,3)&7
q=w
if(typeof q!=="number")return q.w()
C.b.l(q,1)
s=J.J(w,1)
q=this.c
n=J.b(q.d,0)
p=q.a
q.e
z=J.e(p,J.b(n,0))
if(J.k(z,44)){q=this.c
q.d=J.b(q.d,1)
r=this.hM()
if(r==null){q=this.b
return q}J.lC(r,v)
r.si2(J.k(t,2))
if(!J.k(s,0))if(r.gf4()!=null)r.gf4().c=u
else{q=this.b.e
if(q!=null)q.c=u}this.b.r.push(r)}}else this.eZ()
break
case 59:q=this.b
this.e=q.r.length
return q
default:break}}}catch(m){H.ad(m)}q=this.b
this.e=q.r.length
return q},
bz:function(a){var z,y,x,w
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
return this.l4(w)},
c5:function(a,b){if(this.cQ(a)==null)return
this.d=0
this.e=1
return this.bz(b)},
hM:function(){var z,y
z=this.c
if(J.U(z.d,z.c))return
y=U.mV(this.c)
z=this.c
z.d=J.b(z.d,1)
this.eZ()
return y},
l4:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(this.f==null){this.f=new Uint8Array(H.i(256))
this.r=new Uint8Array(H.i(4095))
this.x=new Uint8Array(H.i(4096))
this.y=new Uint32Array(H.i(4096))}z=this.c
y=z.a
x=z.d
z.d=J.b(x,1)
x=J.e(y,x)
this.z=x
if(typeof x!=="number")return H.c(x)
y=C.a.n(1,x)
this.go=y;++y
this.fy=y
this.fx=y+1;++x
this.fr=x
this.dy=C.a.n(1,x)
this.cy=0
this.dx=4098
this.cx=0
this.ch=0
this.f[0]=0
x=this.y;(x&&C.q).ag(x,0,x.length,4098)
w=a.c
v=a.d
z=a.a
y=this.b.a
if(typeof y!=="number")return H.c(y)
if(z+w>y||J.V(J.b(a.b,v),this.b.b))return
u=a.f
u=u!=null?u:this.b.e
this.Q=w*v
t=U.aZ(w,v,4)
s=new Uint8Array(H.i(w))
if(a.e){r=a.b
for(z=J.G(r),q=0,p=0;q<4;++q)for(o=z.i(r,C.b_[q]);y=J.u(o),y.I(o,z.i(r,v));o=y.i(o,C.bH[q]),++p){if(!this.hi(s))return t
this.hR(t,o,u,s)}}else for(o=0;o<v;++o){if(!this.hi(s))return t
this.hR(t,o,u,s)}return t},
hR:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
if(c!=null)for(z=d.length,y=c.d,x=y.length,w=a.a,v=J.G(b),u=a.b,t=a.x,s=t.length,r=0;r<z;++r){q=d[r]
if(typeof q!=="number")return q.q()
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
m=J.P(m,0,255)
if(typeof m!=="number")return m.n()
n=J.P(n,0,255)
if(typeof n!=="number")return n.n()
q=J.P(q,0,255)
if(typeof q!=="number")return H.c(q)
if(typeof w!=="number")return H.c(w)
k=r<w&&v.a9(b,0)&&v.I(b,u)
if(k){k=J.b(v.q(b,w),r)
if(k>>>0!==k||k>=s)return H.a(t,k)
t[k]=(l<<24|m<<16|n<<8|q)>>>0}}},
hf:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.c.ae(6)
if(z!=="GIF87a"&&z!=="GIF89a")return!1
this.b.a=this.c.u()
this.b.b=this.c.u()
y=this.c
x=y.a
w=y.d
y.d=J.b(w,1)
v=J.e(x,w)
w=this.b
x=J.u(v)
y=J.b(x.L(v,112),1)
if(typeof y!=="number")return y.w()
w.d=C.b.l(y,4)+1
u=J.b(x.L(v,7),1)
y=this.b
w=this.c
t=w.a
s=w.d
w.d=J.b(s,1)
y.c=J.e(t,s)
s=this.c
s.d=J.b(s.d,1)
if(x.L(v,128)!==0){y=this.b
if(typeof u!=="number")return H.c(u)
y.e=U.iV(C.a.n(1,u))
for(r=0;r<this.b.e.b;++r){y=this.c
x=y.a
w=y.d
y.d=J.b(w,1)
q=J.e(x,w)
w=this.c
x=w.a
y=w.d
w.d=J.b(y,1)
p=J.e(x,y)
y=this.c
x=y.a
w=y.d
y.d=J.b(w,1)
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
hi:function(a){var z=this.Q
if(typeof z!=="number")return z.p()
this.Q=z-a.length
if(!this.kw(a))return!1
if(this.Q===0)this.eZ()
return!0},
eZ:function(){var z,y,x,w
z=this.c
if(J.U(z.d,z.c))return!0
z=this.c
y=z.a
x=z.d
z.d=J.b(x,1)
w=J.e(y,x)
while(!0){if(!J.k(w,0)){z=this.c
z=!J.U(z.d,z.c)}else z=!1
if(!z)break
z=this.c
z.d=J.b(z.d,w)
z=this.c
if(J.U(z.d,z.c))return!0
z=this.c
y=z.a
x=z.d
z.d=J.b(x,1)
w=J.e(y,x)}return!0},
kw:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.cy
if(typeof z!=="number")return z.T()
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
for(u=null;x<y;){z=this.kv()
this.db=z
if(z==null)return!1
v=this.fy
if(z==null?v==null:z===v)return!1
t=this.go
if(z==null?t==null:z===t){for(z=this.y,s=0;s<=4095;++s){if(s>=z.length)return H.a(z,s)
z[s]=4098}if(typeof v!=="number")return v.i()
this.fx=v+1
z=J.b(this.z,1)
this.fr=z
if(typeof z!=="number")return H.c(z)
this.dy=C.a.n(1,z)
this.dx=4098}else{if(typeof z!=="number")return z.I()
if(typeof t!=="number")return H.c(t)
if(z<t){w=x+1
if(x<0)return H.a(a,x)
a[x]=z
x=w}else{v=this.y
if(z>=v.length)return H.a(v,z)
if(v[z]===4098){r=this.fx
if(typeof r!=="number")return r.p()
r-=2
if(z===r){u=this.dx
z=this.x
q=this.r
p=this.cy
if(typeof p!=="number")return p.i()
this.cy=p+1
t=this.eG(v,u,t)
q.length
if(p<0||p>=4095)return H.a(q,p)
q[p]=t
if(r<0||r>=z.length)return H.a(z,r)
z[r]=t}else return!1}else u=z
s=0
while(!0){o=s+1
if(s<=4095){z=this.go
if(typeof u!=="number")return u.T()
if(typeof z!=="number")return H.c(z)
z=u>z&&u<=4095}else z=!1
if(!z)break
z=this.r
v=this.cy
if(typeof v!=="number")return v.i()
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
s=o}if(o<4095){if(typeof u!=="number")return u.T()
z=u>4095}else z=!0
if(z)return!1
z=this.r
v=this.cy
if(typeof v!=="number")return v.i()
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
if(typeof t!=="number")return t.p()
t-=2
if(t<0||t>=v.length)return H.a(v,t)
t=v[t]===4098
v=t}else v=!1
if(v){v=this.y
t=this.fx
if(typeof t!=="number")return t.p()
t-=2
if(t<0||t>=v.length)return H.a(v,t)
v[t]=z
r=this.db
q=this.x
p=this.go
if(r===t){z=this.eG(v,z,p)
if(t>=q.length)return H.a(q,t)
q[t]=z}else{z=this.eG(v,r,p)
if(t>=q.length)return H.a(q,t)
q[t]=z}}this.dx=this.db}}return!0},
kv:function(){var z,y,x,w,v,u
if(J.V(this.fr,12))return
while(!0){z=this.cx
y=this.fr
if(typeof z!=="number")return z.I()
if(typeof y!=="number")return H.c(y)
if(!(z<y))break
x=this.ka()
z=this.ch
y=this.cx
if(typeof x!=="number")return x.n()
if(typeof y!=="number")return H.c(y)
w=C.a.n(x,y)
if(typeof z!=="number")return z.cO()
this.ch=(z|w)>>>0
this.cx=y+8}w=this.ch
if(y>>>0!==y||y>=13)return H.a(C.ai,y)
v=C.ai[y]
if(typeof w!=="number")return w.L()
this.ch=C.a.bm(w,y)
this.cx=z-y
z=this.fx
if(typeof z!=="number")return z.I()
if(z<4097){++z
this.fx=z
u=this.dy
if(typeof u!=="number")return H.c(u)
z=z>u&&y<12}else z=!1
if(z){z=this.dy
if(typeof z!=="number")return z.n()
this.dy=z<<1>>>0
this.fr=J.b(this.fr,1)}return w&v},
eG:function(a,b,c){var z,y,x
z=0
while(!0){if(typeof b!=="number")return b.T()
if(typeof c!=="number")return H.c(c)
if(b>c){y=z+1
x=z<=4095
z=y}else x=!1
if(!x)break
if(b>4095)return 4098
if(b>=a.length)return H.a(a,b)
b=a[b]}return b},
ka:function(){var z,y,x,w,v,u,t,s
z=this.f
y=z[0]
if(y===0){y=this.c
x=y.a
w=y.d
y.d=J.b(w,1)
z[0]=J.e(x,w)
z=this.f
y=z[0]
if(y===0)return
x=this.c
v=J.b(x.d,0)
w=x.a
u=x.e
t=J.b(v,y)
x.d=J.b(x.d,J.m(t,v));(z&&C.h).bi(z,1,1+y,new U.a3(w,v,t,v,u).aq())
u=this.f
s=u[1]
u[1]=2
u[0]=u[0]-1}else{x=z[1]
z[1]=x+1
if(x>=256)return H.a(z,x)
s=z[x]
z[0]=y-1}return s}},
nT:{
"^":"j;a,b,c,d"},
dc:{
"^":"j;a,aD:b<,c,d,e,f,r,x,y,z"},
fB:{
"^":"j;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
nZ:function(a){var z,y,x,w
this.b=U.S(a,!0,null,0)
if(!J.k(this.cr(),216))return!1
z=this.cr()
y=!1
x=!1
while(!0){if(!J.k(z,217)){w=this.b
w=!J.U(w.d,w.c)}else w=!1
if(!w)break
this.m8()
switch(z){case 192:case 193:case 194:y=!0
break
case 218:x=!0
break}z=this.cr()}return y&&x},
is:function(a){var z,y,x,w,v,u,t,s
this.b=U.S(a,!0,null,0)
this.lC()
if(this.x.length!==1)throw H.f(new U.x("Only single frame JPEGs supported"))
this.ch=0
this.cx=0
for(z=0;y=this.e,x=y.Q,z<x.length;++z){w=y.z.h(0,x[z])
y=this.ch
x=w.f
if(typeof x!=="number")return H.c(x)
this.ch=y+x}for(y=this.Q,z=0;x=this.e,v=x.Q,z<v.length;++z){w=x.z.h(0,v[z])
x=w.a
v=this.e
u=v.f
t=w.b
s=v.r
if(typeof t!=="number")return t.au()
if(typeof s!=="number")return H.c(s)
y.push(P.aP(["scaleX",x/u,"scaleY",t/s,"lines",this.kc(v,w)]))}},
gD:function(a){return this.e.e},
gC:function(a){return this.e.d},
fC:function(b9,c0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8
z=this.Q
y=H.i(J.h(J.h(b9,c0),z.length))
x=new Uint8Array(y)
w=z.length
switch(w){case 1:if(0>=w)return H.a(z,0)
v=z[0]
if(typeof c0!=="number")return H.c(c0)
u=0
t=null
s=0
for(;s<c0;++s){z=v.h(0,"lines")
w=v.h(0,"scaleY")
if(typeof w!=="number")return H.c(w)
r=J.e(z,C.b.F(s*w))
if(typeof b9!=="number")return H.c(b9)
z=J.y(r)
q=0
for(;q<b9;++q,u=p){w=v.h(0,"scaleX")
if(typeof w!=="number")return H.c(w)
t=z.h(r,C.b.F(q*w))
p=u+1
if(u<0||u>=y)return H.a(x,u)
x[u]=t}}break
case 2:if(0>=w)return H.a(z,0)
v=z[0]
if(1>=w)return H.a(z,1)
o=z[1]
if(typeof c0!=="number")return H.c(c0)
u=0
t=null
s=0
for(;s<c0;++s){z=v.h(0,"lines")
w=v.h(0,"scaleY")
if(typeof w!=="number")return H.c(w)
r=J.e(z,s*w)
w=o.h(0,"lines")
z=o.h(0,"scaleY")
if(typeof z!=="number")return H.c(z)
n=J.e(w,s*z)
if(typeof b9!=="number")return H.c(b9)
z=J.y(r)
w=J.y(n)
q=0
for(;q<b9;++q){m=v.h(0,"scaleX")
if(typeof m!=="number")return H.c(m)
t=z.h(r,C.b.F(q*m))
p=u+1
if(u<0||u>=y)return H.a(x,u)
x[u]=t
m=o.h(0,"scaleX")
if(typeof m!=="number")return H.c(m)
t=w.h(n,C.b.F(q*m))
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
if(typeof z!=="number")return z.q()
w=o.h(0,"scaleY")
if(typeof w!=="number")return w.q()
m=l.h(0,"scaleY")
if(typeof m!=="number")return m.q()
k=v.h(0,"scaleX")
if(typeof k!=="number")return k.q()
j=o.h(0,"scaleX")
if(typeof j!=="number")return j.q()
i=l.h(0,"scaleX")
if(typeof i!=="number")return i.q()
h=v.h(0,"lines")
g=o.h(0,"lines")
f=l.h(0,"lines")
if(typeof c0!=="number")return H.c(c0)
e=J.y(h)
d=J.y(g)
c=J.y(f)
u=0
t=null
b=null
a=null
a0=null
a1=null
a2=null
s=0
for(;s<c0;++s){r=e.h(h,C.b.F(s*z))
n=d.h(g,C.b.F(s*w))
a3=c.h(f,C.b.F(s*m))
if(typeof b9!=="number")return H.c(b9)
a4=J.y(r)
a5=J.y(n)
a6=J.y(a3)
q=0
for(;q<b9;++q){t=a4.h(r,C.b.F(q*k))
b=a5.h(n,C.b.F(q*j))
a=a6.h(a3,C.b.F(q*i))
if(t>>>0!==t||t>=256)return H.a(C.aa,t)
a7=C.aa[t]
if(a>>>0!==a||a>=256)return H.a(C.am,a)
a0=a7+C.am[a]
if(b>>>0!==b||b>=256)return H.a(C.aq,b)
a1=a7-C.aq[b]-C.fa[a]
a2=a7+C.ei[b]
p=u+1
if(a0>0){a7=C.a.l(a0,4)
if(a7>255)a7=255}else a7=0
if(u<0||u>=y)return H.a(x,u)
x[u]=a7
u=p+1
if(a1>0){a7=C.a.l(a1,4)
if(a7>255)a7=255}else a7=0
if(p<0||p>=y)return H.a(x,p)
x[p]=a7
p=u+1
if(a2>0){a7=C.a.l(a2,4)
if(a7>255)a7=255}else a7=0
if(u<0||u>=y)return H.a(x,u)
x[u]=a7
u=p}}break
case 4:w=this.d
if(w==null)throw H.f(new U.x("Unsupported color mode (4 components)"))
a8=!J.k(w.d,0)&&!0
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
if(typeof z!=="number")return z.q()
w=o.h(0,"scaleX")
if(typeof w!=="number")return w.q()
m=l.h(0,"scaleX")
if(typeof m!=="number")return m.q()
k=a9.h(0,"scaleX")
if(typeof k!=="number")return k.q()
j=v.h(0,"scaleY")
if(typeof j!=="number")return j.q()
i=o.h(0,"scaleY")
if(typeof i!=="number")return i.q()
e=l.h(0,"scaleY")
if(typeof e!=="number")return e.q()
d=a9.h(0,"scaleY")
if(typeof d!=="number")return d.q()
if(typeof c0!=="number")return H.c(c0)
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
for(;s<c0;++s){r=J.e(v.h(0,"lines"),C.b.F(s*j))
n=J.e(o.h(0,"lines"),C.b.F(s*i))
a3=J.e(l.h(0,"lines"),C.b.F(s*e))
b4=J.e(a9.h(0,"lines"),C.b.F(s*d))
if(typeof b9!=="number")return H.c(b9)
a4=J.y(r)
a5=J.y(n)
a6=J.y(a3)
a7=J.y(b4)
q=0
for(;q<b9;++q){b5=q*w
b6=q*z
b7=q*m
b8=q*k
if(c){b1=a4.h(r,C.b.F(b6))
b2=a5.h(n,C.b.F(b5))
b3=a6.h(a3,C.b.F(b7))
b0=a7.h(b4,C.b.F(b8))}else{t=a4.h(r,C.b.F(b6))
b=a5.h(n,C.b.F(b5))
a=a6.h(a3,C.b.F(b7))
b0=a7.h(b4,C.b.F(b8))
b5=J.u(a)
b6=b5.p(a,128)
if(typeof b6!=="number")return H.c(b6)
b7=J.G(t)
b6=J.aH(b7.i(t,1.402*b6))
if(b6<0)b6=0
else if(b6>255)b6=255
b1=255-b6
b6=J.u(b)
b8=b6.p(b,128)
if(typeof b8!=="number")return H.c(b8)
b8=b7.p(t,0.3441363*b8)
b5=b5.p(a,128)
if(typeof b5!=="number")return H.c(b5)
b5=J.aH(J.m(b8,0.71413636*b5))
if(b5<0)b5=0
else if(b5>255)b5=255
b2=255-b5
b6=b6.p(b,128)
if(typeof b6!=="number")return H.c(b6)
b6=J.aH(b7.i(t,1.772*b6))
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
default:throw H.f(new U.x("Unsupported color mode"))}return x},
lC:function(){var z,y,x,w,v,u,t,s,r
if(!J.k(this.cr(),216))throw H.f(new U.x("Start Of Image marker not found."))
z=this.cr()
while(!0){y=J.B(z)
if(!y.A(z,217)){x=this.b
x=!J.U(x.d,x.c)}else x=!1
if(!x)break
w=this.lD()
switch(z){case 224:case 225:case 226:case 227:case 228:case 229:case 230:case 231:case 232:case 233:case 234:case 235:case 236:case 237:case 238:case 239:case 254:if(y.A(z,224))if(J.k(J.e(w.a,J.b(w.d,0)),74)&&J.k(J.e(w.a,J.b(w.d,1)),70)&&J.k(J.e(w.a,J.b(w.d,2)),73)&&J.k(J.e(w.a,J.b(w.d,3)),70)&&J.k(J.e(w.a,J.b(w.d,4)),0)){x=new U.nW(null,null,null,null,null,null,null,null)
this.c=x
x.a=J.e(w.a,J.b(w.d,5))
this.c.b=J.e(w.a,J.b(w.d,6))
this.c.c=J.e(w.a,J.b(w.d,7))
this.c.d=J.aF(J.h(J.e(w.a,J.b(w.d,8)),256),J.e(w.a,J.b(w.d,9)))
this.c.e=J.aF(J.h(J.e(w.a,J.b(w.d,10)),256),J.e(w.a,J.b(w.d,11)))
this.c.f=J.e(w.a,J.b(w.d,12))
this.c.r=J.e(w.a,J.b(w.d,13))
x=this.c
v=x.f
if(typeof v!=="number")return H.c(v)
u=x.r
if(typeof u!=="number")return H.c(u)
t=J.b(w.d,14)
s=w.a
r=w.e
x.x=new U.a3(s,t,J.b(t,14+3*v*u),t,r)}if(y.A(z,238))if(J.k(J.e(w.a,J.b(w.d,0)),65)&&J.k(J.e(w.a,J.b(w.d,1)),100)&&J.k(J.e(w.a,J.b(w.d,2)),111)&&J.k(J.e(w.a,J.b(w.d,3)),98)&&J.k(J.e(w.a,J.b(w.d,4)),101)&&J.k(J.e(w.a,J.b(w.d,5)),0)){y=new U.nT(null,null,null,null)
this.d=y
y.a=J.e(w.a,J.b(w.d,6))
this.d.b=J.aF(J.h(J.e(w.a,J.b(w.d,7)),256),J.e(w.a,J.b(w.d,8)))
this.d.c=J.aF(J.h(J.e(w.a,J.b(w.d,9)),256),J.e(w.a,J.b(w.d,10)))
this.d.d=J.e(w.a,J.b(w.d,11))}break
case 219:this.lI(w)
break
case 192:case 193:case 194:this.lJ(z,w)
break
case 195:case 197:case 198:case 199:case 200:case 201:case 202:case 203:case 205:case 206:case 207:throw H.f(new U.x("Unhandled frame type "+y.dj(z,16)))
case 196:this.lH(w)
break
case 221:this.f=w.u()
break
case 218:this.lW(w)
break
default:x=this.b
if(J.k(J.e(x.a,J.b(x.d,-3)),255)){x=this.b
if(J.U(J.e(x.a,J.b(x.d,-2)),192)){x=this.b
x=J.aY(J.e(x.a,J.b(x.d,-2)),254)}else x=!1}else x=!1
if(x){y=this.b
y.d=J.m(y.d,3)
break}if(!y.A(z,0))throw H.f(new U.x("Unknown JPEG marker "+y.dj(z,16)))
break}z=this.cr()}},
m8:function(){var z,y
z=this.b.u()
if(z<2)throw H.f(new U.x("Invalid Block"))
y=this.b
y.d=J.b(y.d,z-2)},
lD:function(){var z,y,x,w,v,u
z=this.b.u()
if(z<2)throw H.f(new U.x("Invalid Block"))
y=this.b
x=J.b(y.d,0)
w=y.a
v=y.e
u=J.b(x,z-2)
y.d=J.b(y.d,J.m(u,x))
return new U.a3(w,x,u,x,v)},
cr:function(){var z,y,x,w
z=this.b
if(J.U(z.d,z.c))return 0
do{do{z=this.b
y=z.a
x=z.d
z.d=J.b(x,1)
if(!J.k(J.e(y,x),255)){z=this.b
z=!J.U(z.d,z.c)}else z=!1}while(z)
do{z=this.b
y=z.a
x=z.d
z.d=J.b(x,1)
w=J.e(y,x)
z=J.B(w)
if(z.A(w,255)){y=this.b
y=!J.U(y.d,y.c)}else y=!1}while(y)
if(z.A(w,0)){z=this.b
z=!J.U(z.d,z.c)}else z=!1}while(z)
return w},
lI:function(a){var z,y,x,w,v,u,t,s,r,q
for(z=a.c,y=this.r;!J.U(a.d,z);){x=a.a
w=a.d
a.d=J.b(w,1)
v=J.e(x,w)
u=J.Y(J.I(v,16))
if(typeof v!=="number")return v.L()
v&=15
if(v>=4)throw H.f(new U.x("Invalid number of quantization tables"))
x=y[v]
if(x==null){x=new Int32Array(64)
y[v]=x}for(w=u!==0,t=0;t<64;++t){if(w)s=a.u()
else{r=a.a
q=a.d
a.d=J.b(q,1)
s=J.e(r,q)}r=C.u[t]
x.length
if(r>=64)return H.a(x,r)
x[r]=s}}if(!J.U(a.d,z))throw H.f(new U.x("Bad length for DQT block"))},
lJ:function(a,b){var z,y,x,w,v,u,t,s,r
if(this.e!=null)throw H.f(new U.x("Duplicate JPG frame data found."))
z=P.Z()
y=[]
y.$builtinTypeInfo=[P.o]
z=new U.nV(null,null,null,null,null,0,0,null,null,z,y)
this.e=z
y=J.B(a)
z.a=y.A(a,193)
this.e.b=y.A(a,194)
y=this.e
z=b.a
x=b.d
b.d=J.b(x,1)
y.c=J.e(z,x)
this.e.d=b.u()
this.e.e=b.u()
x=b.a
z=b.d
b.d=J.b(z,1)
w=J.e(x,z)
if(typeof w!=="number")return H.c(w)
z=this.r
v=0
for(;v<w;++v){y=b.a
x=b.d
b.d=J.b(x,1)
u=J.e(y,x)
x=b.a
y=b.d
b.d=J.b(y,1)
t=J.e(x,y)
y=J.Y(J.I(t,16))
if(typeof t!=="number")return t.L()
x=b.a
s=b.d
b.d=J.b(s,1)
r=J.e(x,s)
this.e.Q.push(u)
this.e.z.k(0,u,new U.dc(y&15,t&15,z,r,null,null,null,null,null,null))}this.e.nr()
this.x.push(this.e)},
lH:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=a.c,y=this.z,x=this.y;!J.U(a.d,z);){w=a.a
v=a.d
a.d=J.b(v,1)
u=J.e(w,v)
t=new Uint8Array(16)
for(s=0,r=0;r<16;++r){w=a.a
v=a.d
a.d=J.b(v,1)
t[r]=J.e(w,v)
v=t[r]
if(typeof v!=="number")return H.c(v)
s+=v}if(typeof s!=="number"||Math.floor(s)!==s)H.K(P.ak("Invalid length "+H.l(s)))
q=new Uint8Array(s)
for(w=q.length,r=0;r<s;++r){v=a.a
p=a.d
a.d=J.b(p,1)
p=J.e(v,p)
if(r>=w)return H.a(q,r)
q[r]=p}w=J.u(u)
if(w.L(u,16)!==0){u=w.p(u,16)
o=x}else o=y
w=o.length
if(typeof u!=="number")return H.c(u)
if(w<=u)C.e.sm(o,u+1)
w=this.kd(t,q)
if(u>>>0!==u||u>=o.length)return H.a(o,u)
o[u]=w}},
lW:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=a.a
y=a.d
a.d=J.b(y,1)
x=J.e(z,y)
z=J.u(x)
if(z.I(x,1)||z.T(x,4))throw H.f(new U.x("Invalid SOS block"))
if(typeof x!=="number")return H.c(x)
w=Array(x)
for(z=this.y,y=this.z,v=w.length,u=0;u<x;++u){t=a.a
s=a.d
a.d=J.b(s,1)
r=J.e(t,s)
s=a.a
t=a.d
a.d=J.b(t,1)
q=J.e(s,t)
if(!this.e.z.X(r))throw H.f(new U.x("Invalid Component in SOS block"))
p=this.e.z.h(0,r)
if(u>=v)return H.a(w,u)
w[u]=p
o=J.Y(J.I(q,16))&15
if(typeof q!=="number")return q.L()
n=q&15
t=y.length
if(o<t){if(o>=t)return H.a(y,o)
p.x=y[o]}t=z.length
if(n<t){if(n>=t)return H.a(z,n)
p.y=z[n]}}z=a.a
y=a.d
a.d=J.b(y,1)
m=J.e(z,y)
y=a.a
z=a.d
a.d=J.b(z,1)
l=J.e(y,z)
z=a.a
y=a.d
a.d=J.b(y,1)
k=J.e(z,y)
y=J.Y(J.I(k,16))
if(typeof k!=="number")return k.L()
z=this.b
v=this.e
y=new U.nX(z,v,null,null,null,null,null,null,null,w,this.f,m,l,y&15,k&15,0,0,0,0,null)
y.c=v.c
y.d=v.e
y.e=v.d
y.f=v.x
y.r=v.b
y.x=v.f
y.y=v.r
y.by()},
kd:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=[]
y=16
while(!0){if(!(y>0&&J.k(a[y-1],0)))break;--y}z.push(P.aP(["children",[],"index",0]))
if(0>=z.length)return H.a(z,0)
x=z[0]
for(w=b.length,v=0,u=null,t=0;t<y;){s=0
while(!0){r=a[t]
if(typeof r!=="number")return H.c(r)
if(!(s<r))break
if(0>=z.length)return H.a(z,0)
x=z.pop()
r=J.M(x.h(0,"children"))
q=x.h(0,"index")
if(typeof q!=="number")return H.c(q)
if(r<=q){r=x.h(0,"children")
q=x.h(0,"index")
if(typeof q!=="number")return q.i()
J.eQ(r,q+1)}r=x.h(0,"children")
q=x.h(0,"index")
if(v<0||v>=w)return H.a(b,v)
J.n(r,q,b[v])
while(!0){r=x.h(0,"index")
if(typeof r!=="number")return r.T()
if(!(r>0))break
if(0>=z.length)return H.a(z,0)
x=z.pop()}r=x.h(0,"index")
if(typeof r!=="number")return r.i()
x.k(0,"index",r+1)
z.push(x)
for(;z.length<=t;x=u){u=P.aP(["children",[],"index",0])
z.push(u)
if(J.aY(J.M(x.h(0,"children")),x.h(0,"index")))J.eQ(x.h(0,"children"),J.b(x.h(0,"index"),1))
J.n(x.h(0,"children"),x.h(0,"index"),u.h(0,"children"))}++v;++s}++t
if(t<y){u=P.aP(["children",[],"index",0])
z.push(u)
if(J.aY(J.M(x.h(0,"children")),x.h(0,"index")))J.eQ(x.h(0,"children"),J.b(x.h(0,"index"),1))
J.n(x.h(0,"children"),x.h(0,"index"),u.h(0,"children"))
x=u}}if(0>=z.length)return H.a(z,0)
return z[0].h(0,"children")},
kc:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=b.e
y=b.f
if(typeof z!=="number")return z.q()
x=z*8
w=new Int32Array(64)
v=new Uint8Array(64)
if(typeof y!=="number")return y.q()
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
this.lB(l,j[k],v,w)
i=k*8
for(h=0,g=0;g<8;++g){l=o+g
if(l>=u)return H.a(t,l)
f=t[l]
for(l=J.as(f),n=0;n<8;++n,h=e){e=h+1
if(h<0||h>=64)return H.a(v,h)
l.k(f,i+n,v[h])}}}}return t},
lB:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if($.fC==null){z=new Uint8Array(768)
$.fC=z
for(y=-256;y<0;++y){x=256+y
if(x>=768)return H.a(z,x)
z[x]=0}for(y=0;y<256;++y){x=256+y
if(x>=768)return H.a(z,x)
z[x]=y}for(y=256;y<512;++y){x=256+y
if(x>=768)return H.a(z,x)
z[x]=255}}for(y=0;y<64;++y){z=b[y]
x=a[y]
if(typeof x!=="number")return H.c(x)
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
v=C.d.O((5793*d[w]+512)/1024)
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
u=C.d.O((5793*d[w]+128)/256)
x=4+w
if(x>=64)return H.a(d,x)
t=C.d.O((5793*d[x]+128)/256)
s=2+w
if(s>=64)return H.a(d,s)
r=d[s]
q=6+w
if(q>=64)return H.a(d,q)
p=d[q]
o=d[z]
n=7+w
if(n>=64)return H.a(d,n)
m=C.d.O((2896*(o-d[n])+128)/256)
l=C.d.O((2896*(d[z]+d[n])+128)/256)
o=3+w
if(o>=64)return H.a(d,o)
k=d[o]*16
j=5+w
if(j>=64)return H.a(d,j)
i=d[j]*16
v=C.d.O((u-t+1)/2)
u=C.d.O((u+t+1)/2)
h=C.d.O((r*3784+p*1567+128)/256)
r=C.d.O((r*1567-p*3784+128)/256)
g=C.d.O((m-i+1)/2)
m=C.d.O((m+i+1)/2)
f=C.d.O((l+k+1)/2)
k=C.d.O((l-k+1)/2)
e=C.d.O((u-h+1)/2)
u=C.d.O((u+h+1)/2)
h=C.d.O((v-r+1)/2)
t=C.d.O((v+r+1)/2)
v=C.d.O((m*2276+f*3406+2048)/4096)
m=C.d.O((m*3406-f*2276+2048)/4096)
f=C.d.O((k*799+g*4017+2048)/4096)
k=C.d.O((k*4017-g*799+2048)/4096)
d[w]=u+v
d[n]=u-v
d[z]=t+f
d[q]=t-f
d[s]=h+k
d[j]=h-k
d[o]=e+m
d[x]=e-m}for(y=0;y<8;++y){z=8+y
if(d[z]===0&&d[16+y]===0&&d[24+y]===0&&d[32+y]===0&&d[40+y]===0&&d[48+y]===0&&d[56+y]===0){v=C.d.O((5793*d[y]+8192)/16384)
d[y]=v
d[z]=v
d[16+y]=v
d[24+y]=v
d[32+y]=v
d[40+y]=v
d[48+y]=v
d[56+y]=v
continue}u=C.d.O((5793*d[y]+2048)/4096)
x=32+y
t=C.d.O((5793*d[x]+2048)/4096)
s=16+y
r=d[s]
q=48+y
p=d[q]
o=56+y
m=C.d.O((2896*(d[z]-d[o])+2048)/4096)
l=C.d.O((2896*(d[z]+d[o])+2048)/4096)
n=24+y
k=d[n]
j=40+y
i=d[j]
v=C.d.O((u-t+1)/2)
u=C.d.O((u+t+1)/2)
h=C.d.O((r*3784+p*1567+2048)/4096)
r=C.d.O((r*1567-p*3784+2048)/4096)
g=C.d.O((m-i+1)/2)
m=C.d.O((m+i+1)/2)
f=C.d.O((l+k+1)/2)
k=C.d.O((l-k+1)/2)
e=C.d.O((u-h+1)/2)
u=C.d.O((u+h+1)/2)
h=C.d.O((v-r+1)/2)
t=C.d.O((v+r+1)/2)
v=C.d.O((m*2276+f*3406+2048)/4096)
m=C.d.O((m*3406-f*2276+2048)/4096)
f=C.d.O((k*799+g*4017+2048)/4096)
k=C.d.O((k*4017-g*799+2048)/4096)
d[y]=u+v
d[o]=u-v
d[z]=t+f
d[q]=t-f
d[s]=h+k
d[j]=h-k
d[n]=e+m
d[x]=e-m}for(y=0;y<64;++y){z=$.fC
x=384+C.d.O((d[y]+8)/16)
if(x<0||x>=z.length)return H.a(z,x)
c[y]=z[x]}}},
nV:{
"^":"j;a,b,c,d,e,f,r,x,y,z,Q",
nr:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
for(z=this.z,y=z.gdZ(),y=y.gad(y);y.W();){x=z.h(0,y.ga8())
w=this.f
v=x.a
if(w<v)this.f=v
w=this.r
v=x.b
if(typeof w!=="number")return w.I()
if(typeof v!=="number")return H.c(v)
if(w<v)this.r=v}y=this.e
if(typeof y!=="number")return y.au()
this.x=C.b.F(Math.ceil(y/8/this.f))
y=this.d
if(typeof y!=="number")return y.au()
w=this.r
if(typeof w!=="number")return H.c(w)
this.y=C.b.F(Math.ceil(y/8/w))
for(y=z.gdZ(),y=y.gad(y);y.W();){x=z.h(0,y.ga8())
w=this.e
if(typeof w!=="number")return w.au()
w=C.b.F(Math.ceil(w/8))
v=x.a
u=C.b.F(Math.ceil(w*v/this.f))
w=this.d
if(typeof w!=="number")return w.au()
w=C.b.F(Math.ceil(w/8))
t=x.b
if(typeof t!=="number")return H.c(t)
s=this.r
if(typeof s!=="number")return H.c(s)
r=C.b.F(Math.ceil(w*t/s))
s=this.x
if(typeof s!=="number")return s.q()
q=s*v
v=this.y
s=x.b
if(typeof v!=="number")return v.q()
if(typeof s!=="number")return H.c(s)
p=v*s
o=Array(p)
for(n=0;n<p;++n){m=Array(q)
for(l=0;l<q;++l)m[l]=new Int32Array(64)
if(n>=p)return H.a(o,n)
o[n]=m}x.e=u
x.f=r
x.r=o}}},
nW:{
"^":"j;a,b,c,d,e,f,r,x"},
nX:{
"^":"j;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy",
by:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.z
y=z.length
if(this.r===!0)if(J.k(this.ch,0))x=this.cy===0?this.gkp():this.gkq()
else x=this.cy===0?this.gkj():this.gkk()
else x=this.gkn()
w=y===1
if(w){if(0>=y)return H.a(z,0)
v=z[0]
u=v.e
v=v.f
if(typeof u!=="number")return u.q()
if(typeof v!=="number")return H.c(v)
t=u*v}else{v=this.f
u=this.b.y
if(typeof v!=="number")return v.q()
if(typeof u!=="number")return H.c(u)
t=v*u}v=this.Q
if(v==null||v===0)this.Q=t
for(s=null,r=0,q=null,p=null;r<t;){for(o=0;o<y;++o)z[o].z=0
this.fr=0
if(w){if(0>=y)return H.a(z,0)
s=z[0]
n=0
while(!0){v=this.Q
if(typeof v!=="number")return H.c(v)
if(!(n<v))break
v=s.e
if(typeof v!=="number")return H.c(v)
m=C.a.ak(r,v)
l=C.a.R(r,v)
v=s.r
if(m<0||m>=v.length)return H.a(v,m)
v=v[m]
if(l<0||l>=v.length)return H.a(v,l)
x.$2(s,v[l]);++r;++n}}else{n=0
while(!0){v=this.Q
if(typeof v!=="number")return H.c(v)
if(!(n<v))break
for(o=0;o<y;++o){s=z[o]
q=s.a
p=s.b
if(typeof p!=="number")return H.c(p)
k=0
for(;k<p;++k)for(j=0;j<q;++j){v=this.f
if(typeof v!=="number")return H.c(v)
i=C.a.ak(r,v)
h=C.a.R(r,v)
v=s.b
if(typeof v!=="number")return H.c(v)
m=i*v+k
l=h*q+j
v=s.r
if(m<0||m>=v.length)return H.a(v,m)
v=v[m]
if(l<0||l>=v.length)return H.a(v,l)
x.$2(s,v[l])}}++r;++n}}this.dy=0
v=this.a
g=J.e(v.a,J.b(v.d,0))
v=this.a
f=J.e(v.a,J.b(v.d,1))
if(J.k(g,255)){v=J.u(f)
if(v.a9(f,208)&&v.a6(f,215)){v=this.a
v.d=J.b(v.d,2)}else break}}},
cw:function(){var z,y,x,w
z=this.dy
if(z>0){--z
this.dy=z
y=this.dx
if(typeof y!=="number")return y.w()
return C.b.w(y,z)&1}z=this.a
y=z.a
x=z.d
z.d=J.b(x,1)
x=J.e(y,x)
this.dx=x
if(J.k(x,255)){z=this.a
y=z.a
x=z.d
z.d=J.b(x,1)
w=J.e(y,x)
if(!J.k(w,0)){z=this.dx
if(typeof z!=="number")return z.n()
if(typeof w!=="number")return H.c(w)
throw H.f(new U.x("unexpected marker: "+C.a.dj((z<<8|w)>>>0,16)))}}this.dy=7
z=this.dx
if(typeof z!=="number")return z.w()
return C.b.l(z,7)},
cW:function(a){var z,y
for(z=a;y=this.cw(),!0;){z=J.e(z,y)
if(typeof z==="number")return C.b.F(z)}return},
eU:function(a){var z,y
z=0
while(!0){if(typeof a!=="number")return a.T()
if(!(a>0))break
y=this.cw()
z=(z<<1|y)>>>0;--a}return z},
cY:function(a){var z,y
z=this.eU(a)
if(typeof a!=="number")return a.p()
y=C.a.n(1,a-1)
if(typeof z!=="number")return z.a9()
if(z>=y)return z
return z+C.a.n(-1,a)+1},
oa:[function(a,b){var z,y,x,w,v,u,t,s
z=this.cW(a.x)
y=z===0?0:this.cY(z)
x=a.z
if(typeof x!=="number")return x.i()
x+=y
a.z=x
b[0]=x
for(w=1;w<64;){v=this.cW(a.y)
if(typeof v!=="number")return v.L()
u=v&15
t=C.a.l(v,4)
if(u===0){if(t<15)break
w+=16
continue}w+=t
if(w<0||w>=80)return H.a(C.u,w)
s=C.u[w]
x=this.cY(u)
if(s>=64)return H.a(b,s)
b[s]=x;++w}},"$2","gkn",4,0,7],
ob:[function(a,b){var z,y,x,w
z=this.cW(a.x)
if(z===0)y=0
else{x=this.cY(z)
w=this.db
if(typeof w!=="number")return H.c(w)
y=C.a.H(x,w)}x=a.z
if(typeof x!=="number")return x.i()
x+=y
a.z=x
b[0]=x},"$2","gkp",4,0,7],
oc:[function(a,b){var z,y,x
z=b[0]
y=this.cw()
x=this.db
if(typeof x!=="number")return H.c(x)
b[0]=(z|C.a.H(y,x))>>>0},"$2","gkq",4,0,7],
o8:[function(a,b){var z,y,x,w,v,u,t,s,r
z=this.fr
if(z>0){this.fr=z-1
return}y=this.ch
x=this.cx
for(z=this.db;w=J.u(y),w.a6(y,x);){v=this.cW(a.y)
if(typeof v!=="number")return v.L()
u=v&15
t=C.a.l(v,4)
if(u===0){if(t<15){z=this.eU(t)
w=C.a.H(1,t)
if(typeof z!=="number")return z.i()
this.fr=z+w-1
break}y=w.i(y,16)
continue}y=w.i(y,t)
if(y>>>0!==y||y>=80)return H.a(C.u,y)
s=C.u[y]
w=this.cY(u)
if(typeof z!=="number")return H.c(z)
r=C.a.H(1,z)
b.length
if(s>=64)return H.a(b,s)
b[s]=w*r;++y}},"$2","gkj",4,0,7],
o9:[function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.ch
y=this.cx
for(x=this.db,w=0;J.aY(z,y);){if(z>>>0!==z||z>=80)return H.a(C.u,z)
v=C.u[z]
u=this.fx
switch(u){case 0:t=this.cW(a.y)
if(typeof t!=="number")return t.L()
s=t&15
r=C.a.l(t,4)
if(s===0)if(r<15){u=this.eU(r)
q=C.a.H(1,r)
if(typeof u!=="number")return u.i()
this.fr=u+q
this.fx=4}else this.fx=1
else{if(s!==1)throw H.f(new U.x("invalid ACn encoding"))
this.fy=this.cY(s)
this.fx=r!==0?2:3}continue
case 1:case 2:b.length
if(v>=64)return H.a(b,v)
q=b[v]
if(q!==0){u=this.cw()
if(typeof x!=="number")return H.c(x)
b[v]=q+C.a.H(u,x)}else{--w
if(w===0)this.fx=u===2?3:0}break
case 3:b.length
if(v>=64)return H.a(b,v)
u=b[v]
if(u!==0){q=this.cw()
if(typeof x!=="number")return H.c(x)
b[v]=u+C.a.H(q,x)}else{u=this.fy
if(typeof u!=="number")return u.n()
if(typeof x!=="number")return H.c(x)
b[v]=C.a.H(u,x)
this.fx=0}break
case 4:b.length
if(v>=64)return H.a(b,v)
u=b[v]
if(u!==0){q=this.cw()
if(typeof x!=="number")return H.c(x)
b[v]=u+C.a.H(q,x)}break}++z}if(this.fx===4)if(--this.fr===0)this.fx=0},"$2","gkk",4,0,115]},
nU:{
"^":"bV;b,c,a",
c5:function(a,b){var z,y,x
z=[]
y=new U.fB(null,null,null,null,null,null,Array(4),z,[],[],[],0,0)
y.a=this.a
y.is(a)
if(z.length!==1)throw H.f(new U.x("only single frame JPEGs supported"))
z=y.e
x=U.aZ(z.e,z.d,3)
this.kh(y,x)
return x},
kh:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=b.a
y=b.b
x=a.fC(z,y)
switch(a.Q.length){case 1:if(typeof y!=="number")return H.c(y)
w=x.length
v=b.x
u=v.length
t=0
s=0
r=0
for(;r<y;++r){if(typeof z!=="number")return H.c(z)
q=0
for(;q<z;++q,s=n,t=p){p=t+1
if(t<0||t>=w)return H.a(x,t)
o=x[t]
n=s+1
m=C.a.v(255,0,255)
l=J.u(o)
k=l.v(o,0,255)
if(typeof k!=="number")return k.n()
j=l.v(o,0,255)
if(typeof j!=="number")return j.n()
l=l.v(o,0,255)
if(typeof l!=="number")return H.c(l)
if(s<0||s>=u)return H.a(v,s)
v[s]=(m<<24|k<<16|j<<8|l)>>>0}}break
case 3:if(typeof y!=="number")return H.c(y)
w=x.length
v=b.x
u=v.length
t=0
s=0
r=0
for(;r<y;++r){if(typeof z!=="number")return H.c(z)
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
l=J.P(g,0,255)
if(typeof l!=="number")return l.n()
k=J.P(h,0,255)
if(typeof k!=="number")return k.n()
j=J.P(i,0,255)
if(typeof j!=="number")return H.c(j)
n=s+1
if(s<0||s>=u)return H.a(v,s)
v[s]=(m<<24|l<<16|k<<8|j)>>>0}}break
case 4:if(typeof y!=="number")return H.c(y)
w=x.length
v=b.x
u=v.length
t=0
s=0
r=0
for(;r<y;++r){if(typeof z!=="number")return H.c(z)
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
m=J.h(f,d)
if(typeof m!=="number")return m.w()
m=C.b.l(m,8)
l=J.h(e,d)
if(typeof l!=="number")return l.w()
l=C.b.l(l,8)
k=J.h(o,d)
if(typeof k!=="number")return k.w()
k=C.b.l(k,8)
n=s+1
j=C.a.v(255,0,255)
k=C.a.v(k,0,255)
l=C.a.v(l,0,255)
m=C.a.v(m,0,255)
if(s<0||s>=u)return H.a(v,s)
v[s]=(j<<24|k<<16|l<<8|m)>>>0}}break
default:throw H.f("Unsupported color mode")}}},
oG:{
"^":"j;a,D:b>,C:c>,fz:d<,fB:e<,f,r,x,y,z"},
oH:{
"^":"ct;d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c"},
oE:{
"^":"bV;b,c,d,e,f,r,x,a",
fg:function(a){var z,y
z=U.S(a,!0,null,0).ax(8)
for(y=0;y<8;++y)if(!J.k(J.e(z.a,J.b(z.d,y)),C.a6[y]))return!1
return!0},
cQ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=U.S(a,!0,null,0)
this.e=z
y=z.ax(8)
for(x=0;x<8;++x)if(!J.k(J.e(y.a,J.b(y.d,x)),C.a6[x]))return
for(;!0;){z=this.e
w=J.m(z.d,z.b)
v=this.e.t()
u=this.e.ae(4)
switch(u){case"IHDR":z=this.e
t=J.b(z.d,0)
s=z.a
r=z.e
q=J.b(t,v)
z.d=J.b(z.d,J.m(q,t))
p=U.C(new U.a3(s,t,q,t,r),null,0)
o=p.aq()
r=new U.oH(null,null,null,null,null,null,null,null,null,16777215,1,0,[],[],0,0,4294967295)
this.b=r
r.a=p.t()
this.b.b=p.t()
r=this.b
q=p.a
s=p.d
p.d=J.b(s,1)
r.d=J.e(q,s)
s=this.b
q=p.a
r=p.d
p.d=J.b(r,1)
s.e=J.e(q,r)
r=this.b
q=p.a
s=p.d
p.d=J.b(s,1)
r.f=J.e(q,s)
s=this.b
q=p.a
r=p.d
p.d=J.b(r,1)
s.r=J.e(q,r)
r=this.b
q=p.a
s=p.d
p.d=J.b(s,1)
r.x=J.e(q,s)
if(!C.e.b6([0,2,3,4,6],this.b.e))return
if(!J.k(this.b.r,0))return
z=this.b
switch(z.e){case 0:if(!C.e.b6([1,2,4,8,16],z.d))return
break
case 2:if(!C.e.b6([8,16],z.d))return
break
case 3:if(!C.e.b6([1,2,4,8],z.d))return
break
case 4:if(!C.e.b6([8,16],z.d))return
break
case 6:if(!C.e.b6([8,16],z.d))return
break}if(this.e.t()!==T.bc(o,T.bc(new H.bU(u),0)))throw H.f(new U.x("Invalid "+u+" checksum"))
break
case"PLTE":z=this.b
s=this.e
t=J.b(s.d,0)
r=s.a
q=s.e
n=J.b(t,v)
s.d=J.b(s.d,J.m(n,t))
z.y=new U.a3(r,t,n,t,q).aq()
if(this.e.t()!==T.bc(this.b.y,T.bc(new H.bU(u),0)))throw H.f(new U.x("Invalid "+u+" checksum"))
break
case"tRNS":z=this.b
s=this.e
t=J.b(s.d,0)
r=s.a
q=s.e
n=J.b(t,v)
s.d=J.b(s.d,J.m(n,t))
z.z=new U.a3(r,t,n,t,q).aq()
if(this.e.t()!==T.bc(this.b.z,T.bc(new H.bU(u),0)))throw H.f(new U.x("Invalid "+u+" checksum"))
break
case"IEND":z=this.e
z.d=J.b(z.d,4)
break
case"gAMA":if(v!==4)throw H.f(new U.x("Invalid gAMA chunk"))
m=this.e.t()
z=this.e
z.d=J.b(z.d,4)
if(m!==1e5)this.b.ch=m/1e5
break
case"IDAT":this.b.dy.push(w)
z=this.e
z.d=J.b(z.d,v)
z=this.e
z.d=J.b(z.d,4)
break
case"acTL":this.b.cy=this.e.t()
this.b.db=this.e.t()
z=this.e
z.d=J.b(z.d,4)
break
case"fcTL":l=new U.oG(null,null,null,null,null,null,null,null,null,[])
this.b.dx.push(l)
l.a=this.e.t()
l.b=this.e.t()
l.c=this.e.t()
l.d=this.e.t()
l.e=this.e.t()
l.f=this.e.u()
l.r=this.e.u()
z=this.e
s=z.a
r=z.d
z.d=J.b(r,1)
l.x=J.e(s,r)
r=this.e
s=r.a
z=r.d
r.d=J.b(z,1)
l.y=J.e(s,z)
z=this.e
z.d=J.b(z.d,4)
break
case"fdAT":this.e.t()
C.e.gaw(this.b.dx).z.push(w)
z=this.e
z.d=J.b(z.d,v-4)
z=this.e
z.d=J.b(z.d,4)
break
case"bKGD":z=this.e
z.d=J.b(z.d,v)
z=this.e
z.d=J.b(z.d,4)
break
default:z=this.e
z.d=J.b(z.d,v)
z=this.e
z.d=J.b(z.d,4)
break}if(u==="IEND")break
z=this.e
if(J.U(z.d,z.c))return}return this.b},
bz:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
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
r=z.t()
q=this.e.ae(4)
z=this.e
p=J.b(z.d,0)
v=z.a
u=z.e
o=J.b(p,r)
z.d=J.b(z.d,J.m(o,p))
n=new U.a3(v,p,o,p,u).aq()
C.e.hV(y,n)
if(this.e.t()!==T.bc(n,T.bc(new H.bU(q),0)))throw H.f(new U.x("Invalid "+q+" checksum"))}else{if(a>=u)throw H.f(new U.x("Invalid Frame Number: "+a))
if(a>=u)return H.a(v,a)
m=v[a]
x=m.b
w=m.c
for(z=m.z,s=0;s<z.length;++s){v=this.e
v.d=z[s]
r=v.t()
this.e.ae(4)
v=this.e
v.d=J.b(v.d,4)
v=this.e
p=J.b(v.d,0)
u=v.a
o=v.e
l=J.b(p,r)
v.d=J.b(v.d,J.m(l,p))
C.e.hV(y,new U.a3(u,p,l,p,o).aq())}this.r=a
this.x=this.b.cy}k=U.aZ(x,w,J.k(this.b.e,4)||J.k(this.b.e,6)||this.b.z!=null?4:3)
j=U.S(new T.cc().bp(T.b_(y,1,null,0),!1),!0,null,0)
this.c=0
this.d=0
z=this.b
if(z.Q==null){z.Q=H.p(Array(256),[P.o])
for(s=0;s<256;++s){z=this.b.ch
if(z!=null){if(typeof z!=="number")H.K(H.N(z))
i=C.b.F(Math.pow(s/255,z)*255)}else i=s
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
if(!J.k(z.x,0)){z=J.G(x)
v=z.i(x,7)
if(typeof v!=="number")return v.w()
v=C.b.l(v,3)
u=J.G(w)
o=u.i(w,7)
if(typeof o!=="number")return o.w()
this.c1(j,k,0,0,8,8,v,C.b.l(o,3))
o=z.i(x,3)
if(typeof o!=="number")return o.w()
o=C.b.l(o,3)
v=u.i(w,7)
if(typeof v!=="number")return v.w()
this.c1(j,k,4,0,8,8,o,C.b.l(v,3))
v=z.i(x,3)
if(typeof v!=="number")return v.w()
v=C.b.l(v,2)
o=u.i(w,3)
if(typeof o!=="number")return o.w()
this.c1(j,k,0,4,4,8,v,C.b.l(o,3))
o=z.i(x,1)
if(typeof o!=="number")return o.w()
o=C.b.l(o,2)
v=u.i(w,3)
if(typeof v!=="number")return v.w()
this.c1(j,k,2,0,4,4,o,C.b.l(v,2))
z=z.i(x,1)
if(typeof z!=="number")return z.w()
z=C.b.l(z,1)
v=u.i(w,1)
if(typeof v!=="number")return v.w()
this.c1(j,k,0,2,2,4,z,C.b.l(v,2))
if(typeof x!=="number")return x.w()
v=C.b.l(x,1)
u=u.i(w,1)
if(typeof u!=="number")return u.w()
this.c1(j,k,1,0,2,2,v,C.b.l(u,1))
if(typeof w!=="number")return w.w()
this.c1(j,k,0,1,1,2,x,C.b.l(w,1))}else this.lx(j,k)
z=this.b
z.a=h
z.b=g
return k},
c5:function(a,b){if(this.cQ(a)==null)return
return this.bz(b)},
c1:function(a2,a3,a4,a5,a6,a7,a8,a9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
if(J.k(this.b.e,4))z=2
else if(J.k(this.b.e,2))z=3
else{y=J.k(this.b.e,6)?4:1
z=y}y=this.b.d
if(typeof y!=="number")return H.c(y)
x=z*y
w=C.b.l(x+7,3)
v=C.b.l(x*a8+7,3)
u=P.je(v,0,P.o)
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
a2.d=J.b(i,1)
h=J.e(j,i)
g=J.b(a2.d,0)
j=a2.a
i=a2.e
f=J.b(g,v)
a2.d=J.b(a2.d,J.m(f,g))
i=new U.a3(j,g,f,g,i).aq()
if(k<0||k>=2)return H.a(t,k)
t[k]=i
k=1-k
this.hO(h,w,i,t[k])
this.c=0
this.d=0
e=new U.a3(i,0,i.length,0,!0)
P.a6(m+a6,this.b.b)
for(j=n<=1,d=a4,c=0;c<a8;++c,d+=a6){this.hA(e,s)
b=this.hd(s)
if(typeof y!=="number")return H.c(y)
if(d<y){if(typeof r!=="number")return H.c(r)
i=m<r}else i=!1
if(i){if(typeof y!=="number")return H.c(y)
i=m*y+d
if(i>>>0!==i||i>=p)return H.a(q,i)
q[i]=b}if(!j||o){P.a6(d+n,this.b.a)
for(a=0;a<a6;++a)for(a0=0;a0<n;++a0){i=d+a0
f=m+a0
if(typeof y!=="number")return H.c(y)
if(i<y){if(typeof r!=="number")return H.c(r)
a1=f<r}else a1=!1
if(a1){if(typeof y!=="number")return H.c(y)
i=f*y+i
if(i>>>0!==i||i>=p)return H.a(q,i)
q[i]=b}}}}++l
m+=a7
j=this.f
if(typeof j!=="number")return j.i()
this.f=j+1}},
lx:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
if(J.k(this.b.e,4))z=2
else if(J.k(this.b.e,2))z=3
else{y=J.k(this.b.e,6)?4:1
z=y}y=this.b
x=y.d
if(typeof x!=="number")return H.c(x)
w=z*x
v=y.a
u=y.b
y=J.b(J.h(v,w),7)
if(typeof y!=="number")return y.w()
y=C.b.l(y,3)
t=C.b.l(w+7,3)
s=P.je(y,0,P.o)
r=[s,s]
q=[0,0,0,0]
if(typeof u!=="number")return H.c(u)
x=b.x
p=x.length
o=0
n=0
m=0
for(;o<u;++o,m=g){l=a.a
k=a.d
a.d=J.b(k,1)
j=J.e(l,k)
i=J.b(a.d,0)
l=a.a
k=a.e
h=J.b(i,y)
a.d=J.b(a.d,J.m(h,i))
k=new U.a3(l,i,h,i,k).aq()
if(m<0||m>=2)return H.a(r,m)
r[m]=k
g=1-m
this.hO(j,t,k,r[g])
this.c=0
this.d=0
k=r[m]
f=new U.a3(k,0,k.length,0,!0)
if(typeof v!=="number")return H.c(v)
e=0
for(;e<v;++e,n=d){this.hA(f,q)
d=n+1
l=this.hd(q)
if(n<0||n>=p)return H.a(x,n)
x[n]=l}}},
hO:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=c.length
switch(a){case 0:break
case 1:for(y=z,x=b;x<z;++x,y=w){if(x>=y)return H.a(c,x)
w=c[x]
v=x-b
if(v<0||v>=y)return H.a(c,v)
v=J.J(J.b(w,c[v]),255)
w=c.length
if(x>=w)return H.a(c,x)
c[x]=v}break
case 2:for(y=z,x=0;x<z;++x,y=w){if(x>=y)return H.a(c,x)
y=c[x]
if(x>=d.length)return H.a(d,x)
y=J.J(J.b(y,d[x]),255)
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
w=J.b(u,t)
if(typeof w!=="number")return w.w()
w=J.J(J.b(y,C.b.l(w,1)),255)
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
s=d[w]}r=J.m(J.b(u,t),s)
y=J.u(r)
q=J.cW(y.p(r,u))
p=J.cW(y.p(r,t))
o=J.cW(y.p(r,s))
y=J.u(q)
if(y.a6(q,p)&&y.a6(q,o))n=u
else n=J.aY(p,o)?t:s
if(x>=c.length)return H.a(c,x)
y=J.J(J.b(c[x],n),255)
w=c.length
if(x>=w)return H.a(c,x)
c[x]=y}break
default:throw H.f(new U.x("Invalid filter value: "+H.l(a)))}},
b4:function(a,b){var z,y,x,w,v
z=J.B(b)
if(z.A(b,0))return 0
if(z.A(b,8)){z=a.a
y=a.d
a.d=J.b(y,1)
return J.e(z,y)}if(z.A(b,16))return a.u()
if(typeof b!=="number")return H.c(b)
z=a.c
for(;y=this.d,y<b;){if(J.U(a.d,z))throw H.f(new U.x("Invalid PNG data."))
y=a.a
x=a.d
a.d=J.b(x,1)
w=J.e(y,x)
x=this.d
if(typeof w!=="number")return w.n()
this.c=C.b.n(w,x)
this.d=x+8}if(b===1)v=1
else if(b===2)v=3
else{if(b===4)z=15
else if(b===8)z=255
else z=b===16?65535:0
v=z}z=y-b
y=C.a.aR(this.c,z)
this.d=z
return y&v},
hA:function(a,b){var z,y
z=this.b
y=z.e
switch(y){case 0:b[0]=this.b4(a,z.d)
return
case 2:b[0]=this.b4(a,z.d)
b[1]=this.b4(a,this.b.d)
b[2]=this.b4(a,this.b.d)
return
case 3:b[0]=this.b4(a,z.d)
return
case 4:b[0]=this.b4(a,z.d)
b[1]=this.b4(a,this.b.d)
return
case 6:b[0]=this.b4(a,z.d)
b[1]=this.b4(a,this.b.d)
b[2]=this.b4(a,this.b.d)
b[3]=this.b4(a,this.b.d)
return}throw H.f(new U.x("Invalid color type: "+H.l(y)+"."))},
hd:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.b
y=z.e
switch(y){case 0:switch(z.d){case 1:x=J.k(a[0],0)?0:255
break
case 2:x=J.h(a[0],85)
break
case 4:z=a[0]
if(typeof z!=="number")return z.n()
x=z<<4>>>0
break
case 8:x=a[0]
break
case 16:z=a[0]
if(typeof z!=="number")return z.w()
x=C.b.l(z,8)
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
if(J.k(a[0],((w&255)<<24|z&255)>>>0))return(C.a.v(0,0,255)<<24|J.u(x).v(x,0,255)<<16|C.a.v(x,0,255)<<8|C.a.v(x,0,255))>>>0}return(C.a.v(255,0,255)<<24|J.u(x).v(x,0,255)<<16|C.a.v(x,0,255)<<8|C.a.v(x,0,255))>>>0
case 2:switch(z.d){case 1:v=J.k(a[0],0)?0:255
x=J.k(a[1],0)?0:255
u=J.k(a[2],0)?0:255
break
case 2:v=J.h(a[0],85)
x=J.h(a[1],85)
u=J.h(a[2],85)
break
case 4:z=a[0]
if(typeof z!=="number")return z.n()
v=z<<4>>>0
z=a[1]
if(typeof z!=="number")return z.n()
x=z<<4>>>0
z=a[2]
if(typeof z!=="number")return z.n()
u=z<<4>>>0
break
case 8:v=a[0]
x=a[1]
u=a[2]
break
case 16:z=a[0]
if(typeof z!=="number")return z.w()
v=C.b.l(z,8)
z=a[1]
if(typeof z!=="number")return z.w()
x=C.b.l(z,8)
z=a[2]
if(typeof z!=="number")return z.w()
u=C.b.l(z,8)
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
if(J.k(a[0],((w&255)<<8|t&255)>>>0)&&J.k(a[1],((s&255)<<8|r&255)>>>0)&&J.k(a[2],((q&255)<<8|z&255)>>>0))return(C.a.v(0,0,255)<<24|J.P(u,0,255)<<16|J.P(x,0,255)<<8|J.P(v,0,255))>>>0}return(C.a.v(255,0,255)<<24|J.P(u,0,255)<<16|J.P(x,0,255)<<8|J.P(v,0,255))>>>0
case 3:p=J.h(a[0],3)
z=this.b.z
if(z!=null&&J.a7(a[0],z.length)){z=this.b.z
y=a[0]
if(y>>>0!==y||y>=z.length)return H.a(z,y)
o=z[y]}else o=255
if(J.U(p,this.b.y.length))return(C.a.v(o,0,255)<<24|C.a.v(255,0,255)<<16|C.a.v(255,0,255)<<8|C.a.v(255,0,255))>>>0
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
return(C.a.v(o,0,255)<<24|J.P(u,0,255)<<16|J.P(x,0,255)<<8|J.P(v,0,255))>>>0
case 4:switch(z.d){case 1:x=J.k(a[0],0)?0:255
o=J.k(a[1],0)?0:255
break
case 2:x=J.h(a[0],85)
o=J.h(a[1],85)
break
case 4:z=a[0]
if(typeof z!=="number")return z.n()
x=z<<4>>>0
z=a[1]
if(typeof z!=="number")return z.n()
o=z<<4>>>0
break
case 8:x=a[0]
o=a[1]
break
case 16:z=a[0]
if(typeof z!=="number")return z.w()
x=C.b.l(z,8)
z=a[1]
if(typeof z!=="number")return z.w()
o=C.b.l(z,8)
break
default:x=null
o=null}z=this.b.Q
z.length
if(x>>>0!==x||x>=256)return H.a(z,x)
x=z[x]
if(o>>>0!==o||o>=256)return H.a(z,o)
return(J.P(z[o],0,255)<<24|J.u(x).v(x,0,255)<<16|C.a.v(x,0,255)<<8|C.a.v(x,0,255))>>>0
case 6:switch(z.d){case 1:v=J.k(a[0],0)?0:255
x=J.k(a[1],0)?0:255
u=J.k(a[2],0)?0:255
o=J.k(a[3],0)?0:255
break
case 2:v=J.h(a[0],85)
x=J.h(a[1],85)
u=J.h(a[2],85)
o=J.h(a[3],85)
break
case 4:z=a[0]
if(typeof z!=="number")return z.n()
v=z<<4>>>0
z=a[1]
if(typeof z!=="number")return z.n()
x=z<<4>>>0
z=a[2]
if(typeof z!=="number")return z.n()
u=z<<4>>>0
z=a[3]
if(typeof z!=="number")return z.n()
o=z<<4>>>0
break
case 8:v=a[0]
x=a[1]
u=a[2]
o=a[3]
break
case 16:z=a[0]
if(typeof z!=="number")return z.w()
v=C.b.l(z,8)
z=a[1]
if(typeof z!=="number")return z.w()
x=C.b.l(z,8)
z=a[2]
if(typeof z!=="number")return z.w()
u=C.b.l(z,8)
z=a[3]
if(typeof z!=="number")return z.w()
o=C.b.l(z,8)
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
return(J.P(z[o],0,255)<<24|J.P(u,0,255)<<16|J.P(x,0,255)<<8|J.P(v,0,255))>>>0}throw H.f(new U.x("Invalid color type: "+H.l(y)+"."))}},
oF:{
"^":"mm;a,b,c",
f_:function(a,b,c){a.cM(c.length)
a.bR(new H.bU(b))
a.bR(c)
a.cM(T.bc(c,T.bc(new H.bU(b),0)))},
kK:function(a,b){var z,y,x
z=a.b
if(typeof z!=="number")return H.c(z)
y=0
x=0
for(;x<z;++x)switch(this.a){case 1:y=this.kO(a,y,x,b)
break
case 2:y=this.kP(a,y,x,b)
break
case 3:y=this.kL(a,y,x,b)
break
case 4:y=this.hb(a,y,x,b)
break
case 5:y=this.hb(a,y,x,b)
break
default:y=this.kM(a,y,x,b)
break}},
kM:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p
z=b+1
y=d.length
if(b>=y)return H.a(d,b)
d[b]=0
x=a.a
if(typeof x!=="number")return H.c(x)
w=a.y===4
v=a.b
u=a.x
t=u.length
b=z
s=0
for(;r=s<x,r;++s){if(r){if(typeof v!=="number")return H.c(v)
q=c<v}else q=!1
if(q){q=c*x+s
if(q>>>0!==q||q>=t)return H.a(u,q)
p=u[q]}else p=0
z=b+1
if(b>=y)return H.a(d,b)
d[b]=p&255
b=z+1
if(z>=y)return H.a(d,z)
d[z]=p>>>8&255
z=b+1
if(b>=y)return H.a(d,b)
d[b]=p>>>16&255
if(w){b=z+1
if(r){if(typeof v!=="number")return H.c(v)
r=c<v}else r=!1
if(r){r=c*x+s
if(r>>>0!==r||r>=t)return H.a(u,r)
r=u[r]}else r=0
if(z>=y)return H.a(d,z)
d[z]=r>>>24&255}else b=z}return b},
kO:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=b+1
y=d.length
if(b>=y)return H.a(d,b)
d[b]=1
b=z+1
x=a.a
if(typeof x!=="number")return H.c(x)
if(0<x){x=a.b
if(typeof x!=="number")return H.c(x)
x=c<x}else x=!1
if(x){x=a.x
w=a.a
if(typeof w!=="number")return H.c(w)
w=c*w+0
if(w>>>0!==w||w>=x.length)return H.a(x,w)
w=x[w]
x=w}else x=0
if(z>=y)return H.a(d,z)
d[z]=x&255
z=b+1
x=a.a
if(typeof x!=="number")return H.c(x)
if(0<x){x=a.b
if(typeof x!=="number")return H.c(x)
x=c<x}else x=!1
if(x){x=a.x
w=a.a
if(typeof w!=="number")return H.c(w)
w=c*w+0
if(w>>>0!==w||w>=x.length)return H.a(x,w)
w=x[w]
x=w}else x=0
if(b>=y)return H.a(d,b)
d[b]=x>>>8&255
b=z+1
x=a.a
if(typeof x!=="number")return H.c(x)
if(0<x){x=a.b
if(typeof x!=="number")return H.c(x)
x=c<x}else x=!1
if(x){x=a.x
w=a.a
if(typeof w!=="number")return H.c(w)
w=c*w+0
if(w>>>0!==w||w>=x.length)return H.a(x,w)
w=x[w]
x=w}else x=0
if(z>=y)return H.a(d,z)
d[z]=x>>>16&255
x=a.y===4
if(x){z=b+1
w=a.a
if(typeof w!=="number")return H.c(w)
if(0<w){w=a.b
if(typeof w!=="number")return H.c(w)
w=c<w}else w=!1
if(w){w=a.x
v=a.a
if(typeof v!=="number")return H.c(v)
v=c*v+0
if(v>>>0!==v||v>=w.length)return H.a(w,v)
v=w[v]
w=v}else w=0
if(b>=y)return H.a(d,b)
d[b]=w>>>24&255
b=z}w=a.a
if(typeof w!=="number")return H.c(w)
v=a.b
u=a.x
t=u.length
s=1
for(;r=s<w,r;++s){q=s-1
if(q<w){if(typeof v!=="number")return H.c(v)
p=c<v}else p=!1
if(p){p=c*w+q
if(p>>>0!==p||p>=t)return H.a(u,p)
p=u[p]}else p=0
if(q<w){if(typeof v!=="number")return H.c(v)
o=c<v}else o=!1
if(o){o=c*w+q
if(o>>>0!==o||o>=t)return H.a(u,o)
o=u[o]}else o=0
if(q<w){if(typeof v!=="number")return H.c(v)
n=c<v}else n=!1
if(n){n=c*w+q
if(n>>>0!==n||n>=t)return H.a(u,n)
n=u[n]}else n=0
if(r){if(typeof v!=="number")return H.c(v)
m=c<v}else m=!1
if(m){m=c*w+s
if(m>>>0!==m||m>=t)return H.a(u,m)
m=u[m]}else m=0
if(r){if(typeof v!=="number")return H.c(v)
l=c<v}else l=!1
if(l){l=c*w+s
if(l>>>0!==l||l>=t)return H.a(u,l)
l=u[l]}else l=0
if(r){if(typeof v!=="number")return H.c(v)
k=c<v}else k=!1
if(k){k=c*w+s
if(k>>>0!==k||k>=t)return H.a(u,k)
k=u[k]}else k=0
z=b+1
if(b>=y)return H.a(d,b)
d[b]=(m&255)-(p&255)&255
b=z+1
if(z>=y)return H.a(d,z)
d[z]=(l>>>8&255)-(o>>>8&255)&255
z=b+1
if(b>=y)return H.a(d,b)
d[b]=(k>>>16&255)-(n>>>16&255)&255
if(x){if(q<w){if(typeof v!=="number")return H.c(v)
p=c<v}else p=!1
if(p){q=c*w+q
if(q>>>0!==q||q>=t)return H.a(u,q)
q=u[q]}else q=0
if(r){if(typeof v!=="number")return H.c(v)
r=c<v}else r=!1
if(r){r=c*w+s
if(r>>>0!==r||r>=t)return H.a(u,r)
r=u[r]}else r=0
b=z+1
if(z>=y)return H.a(d,z)
d[z]=(r>>>24&255)-(q>>>24&255)&255}else b=z}return b},
kP:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=b+1
y=d.length
if(b>=y)return H.a(d,b)
d[b]=2
x=a.a
if(typeof x!=="number")return H.c(x)
w=a.y===4
v=c-1
u=c===0
t=v>=0
s=a.b
r=a.x
q=r.length
b=z
p=0
for(;o=p<x,o;++p){if(u)n=0
else{if(o)if(t){if(typeof s!=="number")return H.c(s)
m=v<s}else m=!1
else m=!1
if(m){m=v*x+p
if(m>>>0!==m||m>=q)return H.a(r,m)
m=r[m]}else m=0
n=m&255}if(u)l=0
else{if(o)if(t){if(typeof s!=="number")return H.c(s)
m=v<s}else m=!1
else m=!1
if(m){m=v*x+p
if(m>>>0!==m||m>=q)return H.a(r,m)
m=r[m]}else m=0
l=m>>>8&255}if(u)k=0
else{if(o)if(t){if(typeof s!=="number")return H.c(s)
m=v<s}else m=!1
else m=!1
if(m){m=v*x+p
if(m>>>0!==m||m>=q)return H.a(r,m)
m=r[m]}else m=0
k=m>>>16&255}if(o){if(typeof s!=="number")return H.c(s)
m=c<s}else m=!1
if(m){m=c*x+p
if(m>>>0!==m||m>=q)return H.a(r,m)
m=r[m]}else m=0
if(o){if(typeof s!=="number")return H.c(s)
j=c<s}else j=!1
if(j){j=c*x+p
if(j>>>0!==j||j>=q)return H.a(r,j)
j=r[j]}else j=0
if(o){if(typeof s!=="number")return H.c(s)
i=c<s}else i=!1
if(i){i=c*x+p
if(i>>>0!==i||i>=q)return H.a(r,i)
i=r[i]}else i=0
z=b+1
if(b>=y)return H.a(d,b)
d[b]=(m&255)-n&255
b=z+1
if(z>=y)return H.a(d,z)
d[z]=(j>>>8&255)-l&255
z=b+1
if(b>=y)return H.a(d,b)
d[b]=(i>>>16&255)-k&255
if(w){if(u)h=0
else{if(o)if(t){if(typeof s!=="number")return H.c(s)
m=v<s}else m=!1
else m=!1
if(m){m=v*x+p
if(m>>>0!==m||m>=q)return H.a(r,m)
m=r[m]}else m=0
h=m>>>24&255}if(o){if(typeof s!=="number")return H.c(s)
o=c<s}else o=!1
if(o){o=c*x+p
if(o>>>0!==o||o>=q)return H.a(r,o)
o=r[o]}else o=0
b=z+1
if(z>=y)return H.a(d,z)
d[z]=(o>>>24&255)-h&255}else b=z}return b},
kL:function(a,b,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=b+1
y=a1.length
if(b>=y)return H.a(a1,b)
a1[b]=3
x=a.a
if(typeof x!=="number")return H.c(x)
w=a.y===4
v=a0-1
u=a0===0
t=a.b
s=a.x
r=s.length
q=v>=0
b=z
p=0
for(;o=p<x,o;++p){n=p===0
if(n)m=0
else{l=p-1
if(l>=0)if(l<x){if(typeof t!=="number")return H.c(t)
k=a0<t}else k=!1
else k=!1
if(k){l=a0*x+l
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
m=l&255}if(n)j=0
else{l=p-1
if(l>=0)if(l<x){if(typeof t!=="number")return H.c(t)
k=a0<t}else k=!1
else k=!1
if(k){l=a0*x+l
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
j=l>>>8&255}if(n)i=0
else{l=p-1
if(l>=0)if(l<x){if(typeof t!=="number")return H.c(t)
k=a0<t}else k=!1
else k=!1
if(k){l=a0*x+l
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
i=l>>>16&255}if(u)h=0
else{if(o)if(q){if(typeof t!=="number")return H.c(t)
l=v<t}else l=!1
else l=!1
if(l){l=v*x+p
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
h=l&255}if(u)g=0
else{if(o)if(q){if(typeof t!=="number")return H.c(t)
l=v<t}else l=!1
else l=!1
if(l){l=v*x+p
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
g=l>>>8&255}if(u)f=0
else{if(o)if(q){if(typeof t!=="number")return H.c(t)
l=v<t}else l=!1
else l=!1
if(l){l=v*x+p
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
f=l>>>16&255}if(o){if(typeof t!=="number")return H.c(t)
l=a0<t}else l=!1
if(l){l=a0*x+p
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
if(o){if(typeof t!=="number")return H.c(t)
k=a0<t}else k=!1
if(k){k=a0*x+p
if(k>>>0!==k||k>=r)return H.a(s,k)
k=s[k]}else k=0
if(o){if(typeof t!=="number")return H.c(t)
e=a0<t}else e=!1
if(e){e=a0*x+p
if(e>>>0!==e||e>=r)return H.a(s,e)
e=s[e]}else e=0
z=b+1
if(b>=y)return H.a(a1,b)
a1[b]=(l&255)-(m+h>>>1)&255
b=z+1
if(z>=y)return H.a(a1,z)
a1[z]=(k>>>8&255)-(j+g>>>1)&255
z=b+1
if(b>=y)return H.a(a1,b)
a1[b]=(e>>>16&255)-(i+f>>>1)&255
if(w){if(n)d=0
else{n=p-1
if(n>=0)if(n<x){if(typeof t!=="number")return H.c(t)
l=a0<t}else l=!1
else l=!1
if(l){n=a0*x+n
if(n>>>0!==n||n>=r)return H.a(s,n)
n=s[n]}else n=0
d=n>>>24&255}if(u)c=0
else{if(o)if(q){if(typeof t!=="number")return H.c(t)
n=v<t}else n=!1
else n=!1
if(n){n=v*x+p
if(n>>>0!==n||n>=r)return H.a(s,n)
n=s[n]}else n=0
c=n>>>24&255}if(o){if(typeof t!=="number")return H.c(t)
o=a0<t}else o=!1
if(o){o=a0*x+p
if(o>>>0!==o||o>=r)return H.a(s,o)
o=s[o]}else o=0
b=z+1
if(z>=y)return H.a(a1,z)
a1[z]=(o>>>24&255)-(d+c>>>1)&255}else b=z}return b},
dK:function(a,b,c){var z,y,x,w
z=a+b-c
y=z>a?z-a:a-z
x=z>b?z-b:b-z
w=z>c?z-c:c-z
if(y<=x&&y<=w)return a
else if(x<=w)return b
return c},
hb:function(a6,a7,a8,a9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
z=a7+1
y=a9.length
if(a7>=y)return H.a(a9,a7)
a9[a7]=4
x=a6.a
if(typeof x!=="number")return H.c(x)
w=a8-1
v=a8===0
u=!v
t=a6.b
s=a6.x
r=s.length
q=w>=0
a7=z
p=0
for(;o=p<x,o;++p){n=p===0
if(n)m=0
else{l=p-1
if(l>=0)if(l<x){if(typeof t!=="number")return H.c(t)
k=a8<t}else k=!1
else k=!1
if(k){l=a8*x+l
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
m=l&255}if(n)j=0
else{l=p-1
if(l>=0)if(l<x){if(typeof t!=="number")return H.c(t)
k=a8<t}else k=!1
else k=!1
if(k){l=a8*x+l
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
j=l>>>8&255}if(n)i=0
else{l=p-1
if(l>=0)if(l<x){if(typeof t!=="number")return H.c(t)
k=a8<t}else k=!1
else k=!1
if(k){l=a8*x+l
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
i=l>>>16&255}if(v)h=0
else{if(o)if(q){if(typeof t!=="number")return H.c(t)
l=w<t}else l=!1
else l=!1
if(l){l=w*x+p
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
h=l&255}if(v)g=0
else{if(o)if(q){if(typeof t!=="number")return H.c(t)
l=w<t}else l=!1
else l=!1
if(l){l=w*x+p
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
g=l>>>8&255}if(v)f=0
else{if(o)if(q){if(typeof t!=="number")return H.c(t)
l=w<t}else l=!1
else l=!1
if(l){l=w*x+p
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
f=l>>>16&255}if(!u||n)e=0
else{l=p-1
if(l>=0)if(l<x)if(q){if(typeof t!=="number")return H.c(t)
k=w<t}else k=!1
else k=!1
else k=!1
if(k){l=w*x+l
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
e=l&255}if(!u||n)d=0
else{l=p-1
if(l>=0)if(l<x)if(q){if(typeof t!=="number")return H.c(t)
k=w<t}else k=!1
else k=!1
else k=!1
if(k){l=w*x+l
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
d=l>>>8&255}if(!u||n)c=0
else{l=p-1
if(l>=0)if(l<x)if(q){if(typeof t!=="number")return H.c(t)
k=w<t}else k=!1
else k=!1
else k=!1
if(k){l=w*x+l
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
c=l>>>16&255}if(o){if(typeof t!=="number")return H.c(t)
l=a8<t}else l=!1
if(l){l=a8*x+p
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
if(o){if(typeof t!=="number")return H.c(t)
k=a8<t}else k=!1
if(k){k=a8*x+p
if(k>>>0!==k||k>=r)return H.a(s,k)
k=s[k]}else k=0
if(o){if(typeof t!=="number")return H.c(t)
b=a8<t}else b=!1
if(b){b=a8*x+p
if(b>>>0!==b||b>=r)return H.a(s,b)
b=s[b]}else b=0
a=this.dK(m,h,e)
a0=this.dK(j,g,d)
a1=this.dK(i,f,c)
z=a7+1
if(a7>=y)return H.a(a9,a7)
a9[a7]=(l&255)-a&255
a7=z+1
if(z>=y)return H.a(a9,z)
a9[z]=(k>>>8&255)-a0&255
z=a7+1
if(a7>=y)return H.a(a9,a7)
a9[a7]=(b>>>16&255)-a1&255
if(a6.y===4){if(n)a2=0
else{l=p-1
if(l>=0)if(l<x){if(typeof t!=="number")return H.c(t)
k=a8<t}else k=!1
else k=!1
if(k){l=a8*x+l
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
a2=l>>>24&255}if(v)a3=0
else{if(o)if(q){if(typeof t!=="number")return H.c(t)
l=w<t}else l=!1
else l=!1
if(l){l=w*x+p
if(l>>>0!==l||l>=r)return H.a(s,l)
l=s[l]}else l=0
a3=l>>>24&255}if(!u||n)a4=0
else{n=p-1
if(n>=0)if(n<x)if(q){if(typeof t!=="number")return H.c(t)
l=w<t}else l=!1
else l=!1
else l=!1
if(l){n=w*x+n
if(n>>>0!==n||n>=r)return H.a(s,n)
n=s[n]}else n=0
a4=n>>>24&255}if(o){if(typeof t!=="number")return H.c(t)
o=a8<t}else o=!1
if(o){o=a8*x+p
if(o>>>0!==o||o>=r)return H.a(s,o)
o=s[o]}else o=0
a5=this.dK(a2,a3,a4)
a7=z+1
if(z>=y)return H.a(a9,z)
a9[z]=(o>>>24&255)-a5&255}else a7=z}return a7}},
oP:{
"^":"cF;c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,a,b"},
oT:{
"^":"cF;c,d,e,f,r,x,y,z,Q,a,b"},
cF:{
"^":"j;"},
oW:{
"^":"cF;c,d,e,f,r,x,y,a,b"},
oX:{
"^":"cF;c,d,e,f,r,x,y,z,Q,a,b"},
p3:{
"^":"cF;c,d,e,f,r,x,a,b"},
p4:{
"^":"cF;c,d,e,f,a,b"},
p_:{
"^":"jH;B:b>,a"},
p1:{
"^":"jH;b,c,d,a"},
oQ:{
"^":"j;a,b,c,d,e,f,r,x",
jB:function(a){var z,y,x,w
this.a=a.u()
this.b=a.u()
this.c=a.u()
this.d=a.u()
z=J.av(J.m(a.c,a.d),8)
if(J.V(z,0)){this.e=new Uint16Array(H.i(z))
this.f=new Uint16Array(H.i(z))
this.r=new Uint16Array(H.i(z))
this.x=new Uint16Array(H.i(z))
if(typeof z!=="number")return H.c(z)
y=0
for(;y<z;++y){x=this.e
w=a.u()
if(y>=x.length)return H.a(x,y)
x[y]=w
w=this.f
x=a.u()
if(y>=w.length)return H.a(w,y)
w[y]=x
x=this.r
w=a.u()
if(y>=x.length)return H.a(x,y)
x[y]=w
w=this.x
x=a.u()
if(y>=w.length)return H.a(w,y)
w[y]=x}}},
static:{oR:function(a){var z=new U.oQ(null,null,null,null,null,null,null,null)
z.jB(a)
return z}}},
jE:{
"^":"j;a,b,B:c>",
it:function(a,b,c,d,e,f,g){if(e==null)e=a.u()
switch(e){case 0:this.lV(a,b,c,d)
break
case 1:this.lU(a,b,c,d,f==null?this.lR(a,c):f,g)
break
default:throw H.f(new U.x("Unsupported compression: "+H.l(e)))}},
ny:function(a,b,c,d){return this.it(a,b,c,d,null,null,0)},
lR:function(a,b){var z,y,x,w
z=H.i(b)
y=new Uint16Array(z)
if(typeof b!=="number")return H.c(b)
x=0
for(;x<b;++x){w=a.u()
if(x>=z)return H.a(y,x)
y[x]=w}return y},
lV:function(a,b,c,d){var z,y
z=J.h(b,c)
if(d===16)z=J.h(z,2)
if(J.V(z,J.m(a.c,a.d))){y=new Uint8Array(H.i(z))
this.c=y
C.h.ag(y,0,z,255)
return}this.c=a.ax(z).aq()},
lU:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q
z=J.h(b,c)
y=H.i(d===16?J.h(z,2):z)
x=new Uint8Array(y)
this.c=x
if(typeof c!=="number")return H.c(c)
w=f*c
v=e.length
if(w>=v){C.h.ag(x,0,y,255)
return}for(u=0,t=0;t<c;++t,w=s){s=w+1
if(w>>>0!==w||w>=v)return H.a(e,w)
z=e[w]
r=J.b(a.d,0)
y=a.a
x=a.e
q=J.b(r,z)
a.d=J.b(a.d,J.m(q,r))
this.kr(new U.a3(y,r,q,r,x),this.c,u)
if(typeof b!=="number")return H.c(b)
u+=b}},
kr:function(a,b,c){var z,y,x,w,v,u,t
for(z=a.c;!J.U(a.d,z);){y=a.a
x=a.d
a.d=J.b(x,1)
x=J.e(y,x)
$.$get$cO()[0]=x
x=$.$get$dw()
if(0>=x.length)return H.a(x,0)
w=x[0]
if(w<0){w=1-w
y=a.a
x=a.d
a.d=J.b(x,1)
v=J.e(y,x)
for(u=0;u<w;++u,c=t){t=c+1
if(c>>>0!==c||c>=b.length)return H.a(b,c)
b[c]=v}}else{++w
for(u=0;u<w;++u,c=t){t=c+1
y=a.a
x=a.d
a.d=J.b(x,1)
x=J.e(y,x)
if(c>>>0!==c||c>=b.length)return H.a(b,c)
b[c]=x}}}}},
oU:{
"^":"ct;d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,a,b,c",
by:function(){if(this.d!==943870035||this.cy==null)return!1
this.lP()
this.lQ()
this.lS()
this.cy=null
this.db=null
this.dx=null
this.dy=null
this.fr=null
return!0},
mC:function(){if(!this.by())return
return this.nG()},
nG:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
z=this.Q
if(z!=null)return z
z=U.aZ(this.a,this.b,4)
this.Q=z
z=z.x
C.q.ag(z,0,z.length,0)
z=this.Q.x.buffer
y=(z&&C.f).a0(z,0,null)
for(z=y.length,x=0;w=this.y,x<w.length;++x){v=w[x]
if(J.J(v.z,2)!==0)continue
u=J.I(v.x,255)
t=v.r
if(this.r===16);w=v.fx.x.buffer
s=(w&&C.f).a0(w,0,null)
for(r=v.a,w=s.length,q=0,p=0;q<v.f;++q,++r){o=v.a
n=this.a
if(typeof n!=="number")return H.c(n)
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
if(typeof n!=="number")return H.c(n)
if(m<n)if(o){n=this.b
if(typeof n!=="number")return H.c(n)
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
if(typeof u!=="number")return H.c(u)
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
case 1684107883:a4=P.a6(e,i)
a3=P.a6(d,h)
a2=P.a6(b,g)
a1=f
break
case 1836411936:a4=e*i>>>8
a3=d*h>>>8
a2=b*g>>>8
a1=f
break
case 1768188278:a4=U.e3(e,i)
a3=U.e3(d,h)
a2=U.e3(b,g)
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
case 1818850405:a4=P.O(e,i)
a3=P.O(d,h)
a2=P.O(b,g)
a1=f
break
case 1935897198:a4=C.a.v(255-(255-i)*(255-e),0,255)
a3=C.a.v(255-(255-h)*(255-d),0,255)
a2=C.a.v(255-(255-g)*(255-b),0,255)
a1=f
break
case 1684633120:a4=U.e4(e,i)
a3=U.e4(d,h)
a2=U.e4(b,g)
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
case 1870030194:a4=U.he(e,i,a,f)
a3=U.he(d,h,a,f)
a2=U.he(b,g,a,f)
a1=f
break
case 1934387572:a4=U.hf(e,i)
a3=U.hf(d,h)
a2=U.hf(b,g)
a1=f
break
case 1749838196:a4=U.hc(e,i)
a3=U.hc(d,h)
a2=U.hc(b,g)
a1=f
break
case 1984719220:a4=U.hg(e,i)
a3=U.hg(d,h)
a2=U.hg(b,g)
a1=f
break
case 1816947060:a4=U.hd(e,i)
a3=U.hd(d,h)
a2=U.hd(b,g)
a1=f
break
case 1884055924:a4=i<128?P.a6(e,2*i):P.O(e,2*(i-128))
a3=h<128?P.a6(d,2*h):P.O(d,2*(h-128))
a2=g<128?P.a6(b,2*g):P.O(b,2*(g-128))
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
case 1936553316:a4=C.b.b_(i+e-2*i*e/255)
a3=C.b.b_(h+d-2*h*d/255)
a2=C.b.b_(g+b-2*g*b/255)
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
a4=C.b.F(e*c+a4*a0)
a3=C.b.F(d*c+a3*a0)
a2=C.b.F(b*c+a2*a0)
a1=C.b.F(a*c+a1*a0)
y[l]=a4
a5=n+1
y[n]=a3
a6=a5+1
if(a5>=z)return H.a(y,a5)
y[a5]=a2
if(a6>=z)return H.a(y,a6)
y[a6]=a1}l+=4}}}return this.Q},
lK:function(){var z,y,x
this.d=this.cy.t()
z=this.cy.u()
this.e=z
if(z!==1){this.d=0
return}y=this.cy.ax(6)
for(x=0;x<6;++x)if(!J.k(J.e(y.a,J.b(y.d,x)),0)){this.d=0
return}this.f=this.cy.u()
this.b=this.cy.t()
this.a=this.cy.t()
this.r=this.cy.u()
this.x=this.cy.u()},
lP:function(){var z,y,x,w,v,u,t,s,r,q
z=this.dx
z.d=z.b
for(z=this.ch;y=this.dx,!J.U(y.d,y.c);){x=this.dx.t()
w=this.dx.u()
y=this.dx
v=y.a
u=y.d
y.d=J.b(u,1)
t=J.e(v,u)
s=this.dx.ae(t)
if(J.J(t,1)===0){y=this.dx
y.d=J.b(y.d,1)}t=this.dx.t()
y=this.dx
r=J.b(y.d,0)
v=y.a
u=y.e
q=J.b(r,t)
y.d=J.b(y.d,J.m(q,r))
if((t&1)===1){y=this.dx
y.d=J.b(y.d,1)}if(x===943868237)z.k(0,w,new U.oV(w,s,new U.a3(v,r,q,r,u)))}},
lQ:function(){var z,y,x,w,v,u,t,s
z=this.dy
z.d=z.b
y=z.t()
if((y&1)!==0)++y
x=this.dy.ax(y)
this.y=[]
if(y>0){z=x.u()
$.$get$du()[0]=z
z=$.$get$eE()
if(0>=z.length)return H.a(z,0)
w=z[0]
if(w<0){this.cx=!0
w=-w}for(v=0;v<w;++v){u=U.oZ(x)
this.y.push(u)}}for(v=0;z=this.y,v<z.length;++v)z[v].nx(x,this)
y=this.dy.t()
t=this.dy.ax(y)
if(y>0){t.u()
t.u()
t.u()
t.u()
t.u()
t.u()
z=t.a
s=t.d
t.d=J.b(s,1)
J.e(z,s)}},
lS:function(){var z,y,x,w,v,u,t
z=this.fr
z.d=z.b
y=z.u()
if(y===1){x=J.h(this.b,this.f)
z=H.i(x)
w=new Uint16Array(z)
if(typeof x!=="number")return H.c(x)
v=0
for(;v<x;++v){u=this.fr.u()
if(v>=z)return H.a(w,v)
w[v]=u}}else w=null
this.z=[]
v=0
while(!0){z=this.f
if(typeof z!=="number")return H.c(z)
if(!(v<z))break
z=this.z
u=this.fr
t=v===3?-1:v
t=new U.jE(t,null,null)
t.it(u,this.a,this.b,this.r,y,w,v)
z.push(t);++v}this.Q=U.jG(this.x,this.r,this.a,this.b,this.z)},
jC:function(a){var z,y
this.cy=U.S(a,!0,null,0)
this.lK()
if(this.d!==943870035)return
z=this.cy.t()
this.db=this.cy.ax(z)
z=this.cy.t()
this.dx=this.cy.ax(z)
z=this.cy.t()
this.dy=this.cy.ax(z)
y=this.cy
this.fr=y.ax(J.m(y.c,y.d))},
static:{jF:function(a){var z=new U.oU(null,null,null,null,null,null,null,null,P.Z(),!1,null,null,null,null,null,0,0,4294967295)
z.jC(a)
return z},he:function(a,b,c,d){var z,y,x,w,v,u
z=a/255
y=b/255
x=c/255
w=d/255
v=1-x
u=1-w
return C.a.v(C.b.F((2*z<x?2*y*z+y*v+z*u:w*x-2*(x-z)*(w-y)+y*v+z*u)*255),0,255)},e3:function(a,b){if(b===0)return 0
return C.a.v(C.b.F(255*(1-(1-a/255)/(b/255))),0,255)},e4:function(a,b){if(b===255)return 255
return C.a.v(C.d.F(a/255/(1-b/255)*255),0,255)},hf:function(a,b){var z,y,x
z=a/255
y=b/255
x=1-y
return C.b.b_(255*(x*y*z+y*(1-x*(1-z))))},hc:function(a,b){var z,y
z=b/255
y=a/255
if(y<0.5)return C.b.b_(510*z*y)
else return C.b.b_(255*(1-2*(1-z)*(1-y)))},hg:function(a,b){if(b<128)return U.e3(a,2*b)
else return U.e4(a,2*(b-128))},hd:function(a,b){var z
if(b<128)return C.a.v(a+2*b-255,0,255)
else{z=2*(b-128)
return z+a>255?255:a+z}},jG:function(b6,b7,b8,b9,c0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5
z=U.aZ(b8,b9,4)
y=z.x.buffer
x=(y&&C.f).a0(y,0,null)
w=P.Z()
for(y=c0.length,v=0;u=c0.length,v<u;c0.length===y||(0,H.aA)(c0),++v){t=c0[v]
w.k(0,t.a,t)}if(b7===8)s=1
else s=b7===16?2:-1
if(s===-1)throw H.f(new U.x("PSD: unsupported bit depth: "+H.l(b7)))
if(typeof b9!=="number")return H.c(b9)
y=x.length
r=u>=5
q=s===1
p=u===4
o=u>=2
u=u>=4
n=0
m=0
l=0
for(;n<b9;++n){if(typeof b8!=="number")return H.c(b8)
k=0
for(;k<b8;++k,l+=s)switch(b6){case 3:j=m+1
i=J.L(w.h(0,0))
h=J.y(i)
if(q)i=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.n()
i=h.h(i,l+1)
if(typeof i!=="number")return H.c(i)
i=(g<<8|i)>>>8}if(m<0||m>=y)return H.a(x,m)
x[m]=i
f=j+1
i=J.L(w.h(0,1))
h=J.y(i)
if(q)i=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.n()
i=h.h(i,l+1)
if(typeof i!=="number")return H.c(i)
i=(g<<8|i)>>>8}if(j<0||j>=y)return H.a(x,j)
x[j]=i
e=f+1
i=J.L(w.h(0,2))
h=J.y(i)
if(q)i=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.n()
i=h.h(i,l+1)
if(typeof i!=="number")return H.c(i)
i=(g<<8|i)>>>8}if(f<0||f>=y)return H.a(x,f)
x[f]=i
f=e+1
if(u){i=J.L(w.h(0,-1))
h=J.y(i)
if(q)i=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.n()
i=h.h(i,l+1)
if(typeof i!=="number")return H.c(i)
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
if(a!==0){x[m]=C.a.ak((d+a-255)*255,a)
x[j]=C.a.ak((c+a-255)*255,a)
x[i]=C.a.ak((b+a-255)*255,a)}m=f
break
case 9:i=J.L(w.h(0,0))
h=J.y(i)
if(q)i=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.n()
i=h.h(i,l+1)
if(typeof i!=="number")return H.c(i)
i=(g<<8|i)>>>8}i=J.h(i,100)
if(typeof i!=="number")return i.w()
i=C.b.l(i,8)
h=J.L(w.h(0,1))
g=J.y(h)
if(q)h=g.h(h,l)
else{a0=g.h(h,l)
if(typeof a0!=="number")return a0.n()
h=g.h(h,l+1)
if(typeof h!=="number")return H.c(h)
h=(a0<<8|h)>>>8}a=J.m(h,128)
h=J.L(w.h(0,2))
g=J.y(h)
if(q)h=g.h(h,l)
else{a0=g.h(h,l)
if(typeof a0!=="number")return a0.n()
h=g.h(h,l+1)
if(typeof h!=="number")return H.c(h)
h=(a0<<8|h)>>>8}b=J.m(h,128)
if(u){h=J.L(w.h(0,-1))
g=J.y(h)
if(q){h=g.h(h,l)
a1=h}else{a0=g.h(h,l)
if(typeof a0!=="number")return a0.n()
h=g.h(h,l+1)
if(typeof h!=="number")return H.c(h)
h=(a0<<8|h)>>>8
a1=h}}else a1=255
a2=(i+16)/116
a3=J.b(J.I(a,500),a2)
i=J.I(b,200)
if(typeof i!=="number")return H.c(i)
a4=a2-i
a5=Math.pow(a2,3)
a2=a5>0.008856?a5:(a2-0.13793103448275862)/7.787
if(typeof a3!=="number")H.K(H.N(a3))
a6=Math.pow(a3,3)
a3=a6>0.008856?a6:J.I(J.m(a3,0.13793103448275862),7.787)
a7=Math.pow(a4,3)
a4=a7>0.008856?a7:(a4-0.13793103448275862)/7.787
a3=J.I(J.h(a3,95.047),100)
a2=a2*100/100
a4=a4*108.883/100
i=J.G(a3)
a8=J.b(J.b(i.q(a3,3.2406),a2*-1.5372),a4*-0.4986)
a9=J.b(J.b(i.q(a3,-0.9689),a2*1.8758),a4*0.0415)
b0=J.b(J.b(i.q(a3,0.0557),a2*-0.204),a4*1.057)
if(J.V(a8,0.0031308)){if(typeof a8!=="number")H.K(H.N(a8))
a8=1.055*Math.pow(a8,0.4166666666666667)-0.055}else{if(typeof a8!=="number")return H.c(a8)
a8=12.92*a8}if(J.V(a9,0.0031308)){if(typeof a9!=="number")H.K(H.N(a9))
a9=1.055*Math.pow(a9,0.4166666666666667)-0.055}else{if(typeof a9!=="number")return H.c(a9)
a9=12.92*a9}if(J.V(b0,0.0031308)){if(typeof b0!=="number")H.K(H.N(b0))
b0=1.055*Math.pow(b0,0.4166666666666667)-0.055}else{if(typeof b0!=="number")return H.c(b0)
b0=12.92*b0}b1=[C.a.v(C.d.F(a8*255),0,255),C.a.v(C.d.F(a9*255),0,255),C.a.v(C.d.F(b0*255),0,255)]
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
case 1:i=J.L(w.h(0,0))
h=J.y(i)
if(q)b2=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.n()
i=h.h(i,l+1)
if(typeof i!=="number")return H.c(i)
b2=(g<<8|i)>>>8}if(o){i=J.L(w.h(0,-1))
h=J.y(i)
if(q){i=h.h(i,l)
a1=i}else{g=h.h(i,l)
if(typeof g!=="number")return g.n()
i=h.h(i,l+1)
if(typeof i!=="number")return H.c(i)
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
case 4:i=J.L(w.h(0,0))
h=J.y(i)
if(q)b3=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.n()
i=h.h(i,l+1)
if(typeof i!=="number")return H.c(i)
b3=(g<<8|i)>>>8}i=J.L(w.h(0,1))
h=J.y(i)
if(q)b4=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.n()
i=h.h(i,l+1)
if(typeof i!=="number")return H.c(i)
b4=(g<<8|i)>>>8}i=J.L(w.h(0,2))
h=J.y(i)
if(q)a2=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.n()
i=h.h(i,l+1)
if(typeof i!=="number")return H.c(i)
a2=(g<<8|i)>>>8}i=J.L(w.h(0,p?-1:3))
h=J.y(i)
if(q)b5=h.h(i,l)
else{g=h.h(i,l)
if(typeof g!=="number")return g.n()
i=h.h(i,l+1)
if(typeof i!=="number")return H.c(i)
b5=(g<<8|i)>>>8}if(r){i=J.L(w.h(0,-1))
h=J.y(i)
if(q){i=h.h(i,l)
a1=i}else{g=h.h(i,l)
if(typeof g!=="number")return g.n()
i=h.h(i,l+1)
if(typeof i!=="number")return H.c(i)
i=(g<<8|i)>>>8
a1=i}}else a1=255
if(typeof b3!=="number")return H.c(b3)
if(typeof b4!=="number")return H.c(b4)
if(typeof a2!=="number")return H.c(a2)
if(typeof b5!=="number")return H.c(b5)
i=1-(255-b5)/255
b1=[C.b.b_(255*(1-(255-b3)/255)*i),C.b.b_(255*(1-(255-b4)/255)*i),C.b.b_(255*(1-(255-a2)/255)*i)]
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
default:throw H.f(new U.x("Unhandled color mode: "+H.l(b6)))}}return z}}},
oV:{
"^":"j;a,Z:b>,B:c>"},
oY:{
"^":"j;a,b,c,d,D:e>,C:f>,r,x,y,z,Q,Z:ch>,cx,cy,db,dx,az:dy>,fr,fx,fy",
nx:function(a,b){var z,y
for(z=0;y=this.cx,z<y.length;++z)y[z].ny(a,this.e,this.f,b.r)
this.fx=U.jG(b.x,b.r,this.e,this.f,y)},
jD:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=a.t()
y=$.$get$b6()
y[0]=z
z=$.$get$cN()
if(0>=z.length)return H.a(z,0)
this.a=z[0]
y[0]=a.t()
if(0>=z.length)return H.a(z,0)
this.b=z[0]
y[0]=a.t()
if(0>=z.length)return H.a(z,0)
this.c=z[0]
y[0]=a.t()
if(0>=z.length)return H.a(z,0)
z=z[0]
this.d=z
this.e=z-this.b
this.f=this.c-this.a
this.cx=[]
x=a.u()
for(w=0;w<x;++w){z=a.u()
$.$get$du()[0]=z
z=$.$get$eE()
if(0>=z.length)return H.a(z,0)
v=z[0]
u=a.t()
this.cx.push(new U.jE(v,u,null))}t=a.t()
if(t!==943868237)throw H.f(new U.x("Invalid PSD layer signature: "+C.a.dj(t,16)))
this.r=a.t()
z=a.a
y=a.d
a.d=J.b(y,1)
this.x=J.e(z,y)
y=a.a
z=a.d
a.d=J.b(z,1)
this.y=J.e(y,z)
z=a.a
y=a.d
a.d=J.b(y,1)
this.z=J.e(z,y)
y=a.a
z=a.d
a.d=J.b(z,1)
if(!J.k(J.e(y,z),0))throw H.f(new U.x("Invalid PSD layer data"))
u=a.t()
s=a.ax(u)
if(u>0){u=s.t()
if(u>0){r=s.ax(u)
z=new U.p2(null,null,null,null,null,null,0)
u=J.m(r.c,r.d)
z.a=r.t()
z.b=r.t()
z.c=r.t()
z.d=r.t()
y=r.a
q=r.d
r.d=J.b(q,1)
z.e=J.e(y,q)
q=r.a
y=r.d
r.d=J.b(y,1)
z.f=J.e(q,y)
y=J.k(u,20)
q=r.d
if(y)r.d=J.b(q,2)
else{y=r.a
r.d=J.b(q,1)
z.f=J.e(y,q)
q=r.a
y=r.d
r.d=J.b(y,1)
z.e=J.e(q,y)
z.a=r.t()
z.b=r.t()
z.c=r.t()
z.d=r.t()}this.cy=z}u=s.t()
if(u>0)this.db=U.oR(s.ax(u))
z=s.a
y=s.d
s.d=J.b(y,1)
u=J.e(z,y)
this.ch=s.ae(u)
y=J.cm(u,4)
if(typeof y!=="number")return H.c(y)
p=4-y-1
if(p>0)s.d=J.b(s.d,p)
for(z=s.c,y=this.dx,q=this.fy;!J.U(s.d,z);){t=s.t()
if(t!==943868237)throw H.f(new U.x("PSD invalid signature for layer additional data: "+C.a.dj(t,16)))
o=s.ae(4)
u=s.t()
n=J.b(s.d,0)
m=s.a
l=s.e
k=J.b(n,u)
j=J.b(s.d,J.m(k,n))
s.d=j
if((u&1)===1)s.d=J.b(j,1)
y.k(0,o,U.p0(o,new U.a3(m,n,k,n,l)))
if(o==="lrFX"){i=y.h(0,"lrFX")
h=U.C(i.gB(i),null,0)
h.u()
g=h.u()
for(f=0;f<g;++f){h.ae(4)
e=h.ae(4)
d=h.t()
if(e==="dsdw"){c=new U.oT(null,null,null,null,null,null,null,null,null,null,null)
q.push(c)
c.a=h.t()
c.c=h.t()
c.d=h.t()
c.e=h.t()
c.f=h.t()
c.r=[h.u(),h.u(),h.u(),h.u(),h.u()]
c.x=h.ae(8)
m=h.a
l=h.d
h.d=J.b(l,1)
c.b=!J.k(J.e(m,l),0)
l=h.a
m=h.d
h.d=J.b(m,1)
c.y=!J.k(J.e(l,m),0)
m=h.a
l=h.d
h.d=J.b(l,1)
c.z=J.e(m,l)
c.Q=[h.u(),h.u(),h.u(),h.u(),h.u()]}else if(e==="isdw"){c=new U.oX(null,null,null,null,null,null,null,null,null,null,null)
q.push(c)
c.a=h.t()
c.c=h.t()
c.d=h.t()
c.e=h.t()
c.f=h.t()
c.r=[h.u(),h.u(),h.u(),h.u(),h.u()]
c.x=h.ae(8)
m=h.a
l=h.d
h.d=J.b(l,1)
c.b=!J.k(J.e(m,l),0)
l=h.a
m=h.d
h.d=J.b(m,1)
c.y=!J.k(J.e(l,m),0)
m=h.a
l=h.d
h.d=J.b(l,1)
c.z=J.e(m,l)
c.Q=[h.u(),h.u(),h.u(),h.u(),h.u()]}else if(e==="oglw"){c=new U.p3(null,null,null,null,null,null,null,null)
q.push(c)
c.a=h.t()
c.c=h.t()
c.d=h.t()
c.e=[h.u(),h.u(),h.u(),h.u(),h.u()]
c.f=h.ae(8)
m=h.a
l=h.d
h.d=J.b(l,1)
c.b=!J.k(J.e(m,l),0)
l=h.a
m=h.d
h.d=J.b(m,1)
c.r=J.e(l,m)
if(c.a===2)c.x=[h.u(),h.u(),h.u(),h.u(),h.u()]}else if(e==="iglw"){c=new U.oW(null,null,null,null,null,null,null,null,null)
q.push(c)
c.a=h.t()
c.c=h.t()
c.d=h.t()
c.e=[h.u(),h.u(),h.u(),h.u(),h.u()]
c.f=h.ae(8)
m=h.a
l=h.d
h.d=J.b(l,1)
c.b=!J.k(J.e(m,l),0)
l=h.a
m=h.d
h.d=J.b(m,1)
c.r=J.e(l,m)
if(c.a===2){m=h.a
l=h.d
h.d=J.b(l,1)
c.x=!J.k(J.e(m,l),0)
c.y=[h.u(),h.u(),h.u(),h.u(),h.u()]}}else if(e==="bevl"){c=new U.oP(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
q.push(c)
c.a=h.t()
c.c=h.t()
c.d=h.t()
c.e=h.t()
c.f=h.ae(8)
c.r=h.ae(8)
c.x=[h.u(),h.u(),h.u(),h.u(),h.u()]
c.y=[h.u(),h.u(),h.u(),h.u(),h.u()]
m=h.a
l=h.d
h.d=J.b(l,1)
c.z=J.e(m,l)
l=h.a
m=h.d
h.d=J.b(m,1)
c.Q=J.e(l,m)
m=h.a
l=h.d
h.d=J.b(l,1)
c.ch=J.e(m,l)
l=h.a
m=h.d
h.d=J.b(m,1)
c.b=!J.k(J.e(l,m),0)
m=h.a
l=h.d
h.d=J.b(l,1)
c.cx=!J.k(J.e(m,l),0)
l=h.a
m=h.d
h.d=J.b(m,1)
c.cy=J.e(l,m)
if(c.a===2){c.db=[h.u(),h.u(),h.u(),h.u(),h.u()]
c.dx=[h.u(),h.u(),h.u(),h.u(),h.u()]}}else if(e==="sofi"){c=new U.p4(null,null,null,null,null,null)
q.push(c)
c.a=h.t()
c.c=h.ae(4)
c.d=[h.u(),h.u(),h.u(),h.u(),h.u()]
m=h.a
l=h.d
h.d=J.b(l,1)
c.e=J.e(m,l)
l=h.a
m=h.d
h.d=J.b(m,1)
c.b=!J.k(J.e(l,m),0)
c.f=[h.u(),h.u(),h.u(),h.u(),h.u()]}else h.d=J.b(h.d,d)}}}}},
static:{oZ:function(a){var z=new U.oY(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,P.Z(),[],null,null,[])
z.jD(a)
return z}}},
jH:{
"^":"j;a",
static:{p0:function(a,b){var z,y,x
switch(a){case"lsct":z=new U.p1(null,null,0,a)
y=J.m(b.c,b.d)
z.b=b.t()
x=J.u(y)
if(x.a9(y,12)){if(b.ae(4)!=="8BIM")H.K(new U.x("Invalid key in layer additional data"))
z.c=b.ae(4)}if(x.a9(y,16))z.d=b.t()
return z
default:return new U.p_(b,a)}}}},
p2:{
"^":"j;a,b,c,d,e,f,r"},
oS:{
"^":"bV;b,a",
c5:function(a,b){this.b=U.jF(a)
return this.bz(b)},
bz:function(a){var z=this.b
if(z==null)return
return z.mC()}},
q6:{
"^":"j;a,b,c",
J:function(a){var z,y,x,w
if(a===0)return 0
if(this.c===0){this.c=8
z=this.a
y=z.a
x=z.d
z.d=J.b(x,1)
this.b=J.e(y,x)}for(w=0;z=this.c,a>z;){y=C.a.n(w,z)
x=this.b
if(z<0||z>=9)return H.a(C.k,z)
z=J.J(x,C.k[z])
if(typeof z!=="number")return H.c(z)
w=y+z
a-=this.c
this.c=8
z=this.a
y=z.a
x=z.d
z.d=J.b(x,1)
this.b=J.e(y,x)}if(a>0){if(z===0){this.c=8
z=this.a
y=z.a
x=z.d
z.d=J.b(x,1)
this.b=J.e(y,x)}z=C.a.n(w,a)
y=this.b
x=this.c-a
if(typeof y!=="number")return y.w()
y=C.b.w(y,x)
if(a>=9)return H.a(C.k,a)
w=z+(y&C.k[a])
this.c=x}return w}},
q8:{
"^":"j;a,b,c,d",
E:function(a){var z=this.a
if(C.aG.X(z))return H.l(C.aG.h(0,z))+": "+this.b+" "+this.c
return"<"+z+">: "+this.b+" "+this.c},
ft:function(a){var z,y,x
a.d=this.d
z=[]
for(y=this.c,x=0;x<y;++x)z.push(this.bx(a))
return z},
bx:function(a){var z,y,x,w
switch(this.b){case 1:case 2:z=a.a
y=a.d
a.d=J.b(y,1)
return J.e(z,y)
case 3:return a.u()
case 4:return a.t()
case 5:x=a.t()
w=a.t()
if(w===0)return 0
return x/w
case 6:throw H.f(new U.x("Unhandled value type: SBYTE"))
case 7:z=a.a
y=a.d
a.d=J.b(y,1)
return J.e(z,y)
case 8:throw H.f(new U.x("Unhandled value type: SSHORT"))
case 9:throw H.f(new U.x("Unhandled value type: SLONG"))
case 10:throw H.f(new U.x("Unhandled value type: SRATIONAL"))
case 11:throw H.f(new U.x("Unhandled value type: FLOAT"))
case 12:throw H.f(new U.x("Unhandled value type: DOUBLE"))}return 0}},
q9:{
"^":"j;D:a>,C:b>,c,d,e,f,B:r>,x,y,z,Q,ch,cx,cy",
mz:function(a,b,c,d){var z,y,x
this.r=b
this.x=0
this.y=0
z=J.av(J.b(this.a,7),8)
if(typeof d!=="number")return H.c(d)
y=0
x=0
for(;x<d;++x){this.eu(a,y,c)
if(typeof z!=="number")return H.c(z)
y+=z}},
eu:function(a,b,c){var z,y,x,w,v,u,t,s,r
this.d=0
z=0
y=0
x=0
w=null
v=null
u=null
t=!0
while(!0){s=this.a
if(typeof s!=="number")return H.c(s)
if(!(c<s))break
for(;t;){w=this.bJ(10)
if(w>=1024)return H.a(C.O,w)
v=C.O[w]
x=v&1
z=C.a.l(v,1)&15
if(z===12){u=this.aO(2)
w=(w<<2&12|u)>>>0
if(w>=16)return H.a(C.t,w)
v=C.t[w]
z=C.a.l(v,1)&7
y=C.a.l(v,4)&4095
c+=y
this.ap(4-z)}else if(z===0)throw H.f(new U.x("TIFFFaxDecoder0"))
else if(z===15)throw H.f(new U.x("TIFFFaxDecoder1"))
else{y=C.a.l(v,5)&2047
c+=y
this.ap(10-z)
if(x===0){s=this.f
r=this.d++
if(r>=s.length)return H.a(s,r)
s[r]=c
t=!1}}}if(c===this.a){if(this.Q===2)if(this.x!==0){s=this.y
if(typeof s!=="number")return s.i()
this.y=s+1
this.x=0}break}for(;!t;){w=this.aO(4)
if(w>=16)return H.a(C.I,w)
v=C.I[w]
x=v&1
z=v>>>1&15
y=v>>>5&2047
if(y===100){w=this.bJ(9)
if(w>=512)return H.a(C.S,w)
v=C.S[w]
x=v&1
z=C.a.l(v,1)&15
y=C.a.l(v,5)&2047
if(z===12){this.ap(5)
w=this.aO(4)
if(w>=16)return H.a(C.t,w)
v=C.t[w]
z=C.a.l(v,1)&7
y=C.a.l(v,4)&4095
this.aQ(a,b,c,y)
c+=y
this.ap(4-z)}else if(z===15)throw H.f(new U.x("TIFFFaxDecoder2"))
else{this.aQ(a,b,c,y)
c+=y
this.ap(9-z)
if(x===0){s=this.f
r=this.d++
if(r>=s.length)return H.a(s,r)
s[r]=c
t=!0}}}else{if(y===200){w=this.aO(2)
if(w>=4)return H.a(C.F,w)
v=C.F[w]
y=v>>>5&2047
z=v>>>1&15
this.aQ(a,b,c,y)
c+=y
this.ap(2-z)
s=this.f
r=this.d++
if(r>=s.length)return H.a(s,r)
s[r]=c}else{this.aQ(a,b,c,y)
c+=y
this.ap(4-z)
s=this.f
r=this.d++
if(r>=s.length)return H.a(s,r)
s[r]=c}t=!0}}if(c===this.a){if(this.Q===2)if(this.x!==0){s=this.y
if(typeof s!=="number")return s.i()
this.y=s+1
this.x=0}break}}s=this.f
r=this.d++
if(r>=s.length)return H.a(s,r)
s[r]=c},
mA:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
this.r=b
this.Q=3
this.x=0
this.y=0
z=J.av(J.b(this.a,7),8)
y=H.p(Array(2),[P.o])
x=J.u(e)
this.cy=x.L(e,1)
w=x.L(e,2)
if(typeof w!=="number")return w.w()
this.ch=w>>>1
x=x.L(e,4)
if(typeof x!=="number")return x.w()
this.cx=x>>>2
if(this.hy()!==1)throw H.f(new U.x("TIFFFaxDecoder3"))
this.eu(a,0,c)
if(typeof z!=="number")return H.c(z)
if(typeof d!=="number")return H.c(d)
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
for(;j<d;++j){if(this.hy()===0){l=this.e
this.e=this.f
this.f=l
this.z=0
for(k=c,u=-1,n=!0,m=0;x=J.u(k),x.I(k,this.a);){this.hj(u,n,y)
s=y[0]
r=y[1]
q=this.aO(7)
if(q>=128)return H.a(C.J,q)
q=C.J[q]&255
p=(q&120)>>>3
o=q&7
if(p===0){if(!n)this.aQ(a,v,k,J.m(r,k))
this.ap(7-o)
k=r
u=k}else if(p===1){this.ap(7-o)
i=m+1
if(n){k=x.i(k,this.dD())
x=this.f
if(m>=x.length)return H.a(x,m)
x[m]=k
h=this.dC()
this.aQ(a,v,k,h)
k=J.b(k,h)
x=this.f
m=i+1
if(i>=x.length)return H.a(x,i)
x[i]=k}else{h=this.dC()
this.aQ(a,v,k,h)
k=x.i(k,h)
x=this.f
if(m>=x.length)return H.a(x,m)
x[m]=k
k=J.b(k,this.dD())
x=this.f
m=i+1
if(i>=x.length)return H.a(x,i)
x[i]=k}u=k}else{if(p<=8){t=J.b(s,p-5)
x=this.f
i=m+1
if(m>=x.length)return H.a(x,m)
x[m]=t
n=!n
if(n)this.aQ(a,v,k,J.m(t,k))
this.ap(7-o)}else throw H.f(new U.x("TIFFFaxDecoder4"))
k=t
m=i
u=k}}x=this.f
i=m+1
if(m>=x.length)return H.a(x,m)
x[m]=k
this.d=i
m=i}else this.eu(a,v,c)
v+=z}},
mD:function(a,b,c,d,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
this.r=b
this.Q=4
this.x=0
this.y=0
z=J.av(J.b(this.a,7),8)
y=H.p(Array(2),[P.o])
x=J.J(a0,2)
if(typeof x!=="number")return x.w()
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
if(typeof d!=="number")return H.c(d)
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
for(x=m.length,l=c,k=-1,j=!0,i=0;v=J.u(l),v.I(l,this.a);){this.hj(k,j,y)
t=y[0]
s=y[1]
r=this.aO(7)
if(r>=128)return H.a(C.J,r)
r=C.J[r]&255
q=(r&120)>>>3
p=r&7
if(q===0){if(!j)this.aQ(a,o,l,J.m(s,l))
this.ap(7-p)
l=s
k=l}else if(q===1){this.ap(7-p)
h=i+1
if(j){l=v.i(l,this.dD())
if(i<0||i>=x)return H.a(m,i)
m[i]=l
g=this.dC()
this.aQ(a,o,l,g)
l=J.b(l,g)
i=h+1
if(h<0||h>=x)return H.a(m,h)
m[h]=l}else{g=this.dC()
this.aQ(a,o,l,g)
l=v.i(l,g)
if(i<0||i>=x)return H.a(m,i)
m[i]=l
l=J.b(l,this.dD())
i=h+1
if(h<0||h>=x)return H.a(m,h)
m[h]=l}k=l}else if(q<=8){u=J.b(t,q-5)
h=i+1
if(i<0||i>=x)return H.a(m,i)
m[i]=u
j=!j
if(j)this.aQ(a,o,l,J.m(u,l))
this.ap(7-p)
l=u
i=h
k=l}else if(q===11){if(this.aO(3)!==7)throw H.f(new U.x("TIFFFaxDecoder5"))
for(f=0,e=!1;!e;){for(;this.aO(1)!==1;)++f
if(f>5){f-=6
if(!j&&f>0){h=i+1
if(i<0||i>=x)return H.a(m,i)
m[i]=l
i=h}l=J.b(l,f)
if(f>0)j=!0
if(this.aO(1)===0){if(!j){h=i+1
if(i<0||i>=x)return H.a(m,i)
m[i]=l
i=h}j=!0}else{if(j){h=i+1
if(i<0||i>=x)return H.a(m,i)
m[i]=l
i=h}j=!1}e=!0}if(f===5){if(!j){h=i+1
if(i<0||i>=x)return H.a(m,i)
m[i]=l
i=h}l=J.b(l,f)
j=!0}else{l=J.b(l,f)
h=i+1
if(i<0||i>=x)return H.a(m,i)
m[i]=l
this.aQ(a,o,l,1)
l=J.b(l,1)
i=h
j=!1}}}else throw H.f(new U.x("TIFFFaxDecoder5 "+q))}if(i<0||i>=x)return H.a(m,i)
m[i]=l
this.d=i+1
if(typeof z!=="number")return H.c(z)
o+=z}},
dD:function(){var z,y,x,w,v,u,t
for(z=null,y=0,x=!0;x;){w=this.bJ(10)
if(w>=1024)return H.a(C.O,w)
v=C.O[w]
u=C.a.l(v,1)&15
if(u===12){z=this.aO(2)
w=(w<<2&12|z)>>>0
if(w>=16)return H.a(C.t,w)
v=C.t[w]
t=C.a.l(v,1)
y+=C.a.l(v,4)&4095
this.ap(4-(t&7))}else if(u===0)throw H.f(new U.x("TIFFFaxDecoder0"))
else if(u===15)throw H.f(new U.x("TIFFFaxDecoder1"))
else{y+=C.a.l(v,5)&2047
this.ap(10-u)
if((v&1)===0)x=!1}}return y},
dC:function(){var z,y,x,w,v,u,t
for(z=0,y=!1;!y;){x=this.aO(4)
if(x>=16)return H.a(C.I,x)
w=C.I[x]
v=w>>>5&2047
if(v===100){x=this.bJ(9)
if(x>=512)return H.a(C.S,x)
w=C.S[x]
u=C.a.l(w,1)&15
t=C.a.l(w,5)
if(u===12){this.ap(5)
x=this.aO(4)
if(x>=16)return H.a(C.t,x)
w=C.t[x]
t=C.a.l(w,1)
z+=C.a.l(w,4)&4095
this.ap(4-(t&7))}else if(u===15)throw H.f(new U.x("TIFFFaxDecoder2"))
else{z+=t&2047
this.ap(9-u)
if((w&1)===0)y=!0}}else{if(v===200){x=this.aO(2)
if(x>=4)return H.a(C.F,x)
w=C.F[x]
z+=w>>>5&2047
this.ap(2-(w>>>1&15))}else{z+=v
this.ap(4-(w>>>1&15))}y=!0}}return z},
hy:function(){var z,y,x
z=this.cx
if(z===0){if(this.bJ(12)!==1)throw H.f(new U.x("TIFFFaxDecoder6"))}else if(z===1){z=this.x
if(typeof z!=="number")return H.c(z)
y=8-z
if(this.bJ(y)!==0)throw H.f(new U.x("TIFFFaxDecoder8"))
if(y<4)if(this.bJ(8)!==0)throw H.f(new U.x("TIFFFaxDecoder8"))
for(;x=this.bJ(8),x!==1;)if(x!==0)throw H.f(new U.x("TIFFFaxDecoder8"))}if(this.cy===0)return 1
else return this.aO(1)},
hj:function(a,b,c){var z,y,x,w,v,u,t
z=this.e
y=this.d
x=this.z
w=x>0?x-1:0
w=b?(w&4294967294)>>>0:(w|1)>>>0
for(x=z.length,v=w;v<y;v+=2){if(v>=x)return H.a(z,v)
u=z[v]
if(J.V(u,a)){this.z=v
c[0]=u
break}}t=v+1
if(t<y){if(t>=x)return H.a(z,t)
c[1]=z[t]}},
aQ:function(a,b,c,d){var z,y,x,w,v,u,t,s
if(typeof c!=="number")return H.c(c)
z=8*b+c
if(typeof d!=="number")return H.c(d)
y=z+d
x=C.b.l(z,3)
w=z&7
if(w>0){v=C.a.n(1,7-w)
u=J.e(a.a,J.b(a.d,x))
while(!0){if(!(v>0&&z<y))break
u=J.aF(u,v)
v=v>>>1;++z}J.n(a.a,J.b(a.d,x),u)}x=C.b.l(z,3)
for(t=y-7;z<t;x=s){s=x+1
J.n(a.a,J.b(a.d,x),255)
z+=8}for(;z<y;){x=C.b.l(z,3)
t=J.aF(J.e(a.a,J.b(a.d,x)),C.a.n(1,7-(z&7)))
J.n(a.a,J.b(a.d,x),t);++z}},
bJ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.r
y=J.m(J.m(z.c,z.d),1)
x=this.y
if(J.k(this.c,1)){z=this.r
w=J.e(z.a,J.b(z.d,x))
if(x==null?y==null:x===y){v=0
u=0}else{if(typeof x!=="number")return x.i()
z=x+1
t=this.r
if(z===y){v=J.e(t.a,J.b(t.d,z))
u=0}else{v=J.e(t.a,J.b(t.d,z))
z=this.r
u=J.e(z.a,J.b(z.d,x+2))}}}else if(J.k(this.c,2)){z=this.r
z=J.J(J.e(z.a,J.b(z.d,x)),255)
if(z>>>0!==z||z>=256)return H.a(C.l,z)
w=C.l[z]
if(x==null?y==null:x===y){v=0
u=0}else{if(typeof x!=="number")return x.i()
z=x+1
t=this.r
if(z===y){z=J.J(J.e(t.a,J.b(t.d,z)),255)
if(z>>>0!==z||z>=256)return H.a(C.l,z)
v=C.l[z]
u=0}else{z=J.J(J.e(t.a,J.b(t.d,z)),255)
if(z>>>0!==z||z>=256)return H.a(C.l,z)
v=C.l[z]
z=this.r
z=J.J(J.e(z.a,J.b(z.d,x+2)),255)
if(z>>>0!==z||z>=256)return H.a(C.l,z)
u=C.l[z]}}}else throw H.f(new U.x("TIFFFaxDecoder7"))
z=this.x
if(typeof z!=="number")return H.c(z)
s=8-z
r=a-s
if(r>8){q=r-8
p=8}else{p=r
q=0}z=this.y
if(typeof z!=="number")return z.i()
this.y=z+1
if(s<0||s>=9)return H.a(C.k,s)
z=J.J(w,C.k[s])
if(typeof z!=="number")return z.n()
z=C.a.n(z,r)
if(p<0||p>=9)return H.a(C.A,p)
t=J.J(v,C.A[p])
if(typeof t!=="number")return t.w()
o=C.a.aR(t,8-p)
if(q!==0){o=C.a.n(o,q)
if(q>=9)return H.a(C.A,q)
t=J.J(u,C.A[q])
if(typeof t!=="number")return t.w()
o|=C.a.aR(t,8-q)
t=this.y
if(typeof t!=="number")return t.i()
this.y=t+1
this.x=q}else if(p===8){this.x=0
t=this.y
if(typeof t!=="number")return t.i()
this.y=t+1}else this.x=p
return(z|o)>>>0},
aO:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.r
y=J.m(J.m(z.c,z.d),1)
x=this.y
if(J.k(this.c,1)){z=this.r
w=J.e(z.a,J.b(z.d,x))
if(x==null?y==null:x===y)v=0
else{z=this.r
if(typeof x!=="number")return x.i()
v=J.e(z.a,J.b(z.d,x+1))}}else if(J.k(this.c,2)){z=this.r
z=J.J(J.e(z.a,J.b(z.d,x)),255)
if(z>>>0!==z||z>=256)return H.a(C.l,z)
w=C.l[z]
if(x==null?y==null:x===y)v=0
else{z=this.r
if(typeof x!=="number")return x.i()
z=J.J(J.e(z.a,J.b(z.d,x+1)),255)
if(z>>>0!==z||z>=256)return H.a(C.l,z)
v=C.l[z]}}else throw H.f(new U.x("TIFFFaxDecoder7"))
z=this.x
if(typeof z!=="number")return H.c(z)
u=8-z
t=a-u
s=u-a
z=J.u(w)
r=C.k[u]
if(s>=0){if(u<0||u>=9)return H.a(C.k,u)
z=z.L(w,r)
if(typeof z!=="number")return z.w()
q=C.a.aR(z,s)
z=this.x
if(typeof z!=="number")return z.i()
z+=a
this.x=z
if(z===8){this.x=0
z=this.y
if(typeof z!=="number")return z.i()
this.y=z+1}}else{if(u<0||u>=9)return H.a(C.k,u)
z=z.L(w,r)
if(typeof z!=="number")return z.n()
z=C.a.n(z,-s)
if(t<0||t>=9)return H.a(C.A,t)
r=J.J(v,C.A[t])
if(typeof r!=="number")return r.w()
q=(z|C.a.aR(r,8-t))>>>0
r=this.y
if(typeof r!=="number")return r.i()
this.y=r+1
this.x=t}return q},
ap:function(a){var z,y
z=this.x
if(typeof z!=="number")return z.p()
y=z-a
if(y<0){z=this.y
if(typeof z!=="number")return z.p()
this.y=z-1
this.x=8+y}else this.x=y},
jN:function(a,b,c){var z=this.a
if(typeof z!=="number")return H.c(z)
this.e=H.p(Array(z),[P.o])
z=this.a
if(typeof z!=="number")return H.c(z)
z=Array(z)
z.fixed$length=Array
this.f=H.p(z,[P.o])},
static:{hA:function(a,b,c){var z=new U.q9(b,c,a,0,null,null,null,null,null,0,2,0,0,null)
z.jN(a,b,c)
return z}}},
qa:{
"^":"j;a,D:b>,C:c>,d,e,mj:f<,bG:r<,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,f4:k3<,k4,r1,r2,rx",
mx:function(a){var z,y,x,w
this.rx=U.aZ(this.b,this.c,4)
z=0
y=0
while(!0){x=this.fx
if(typeof x!=="number")return H.c(x)
if(!(z<x))break
w=0
while(!0){x=this.fr
if(typeof x!=="number")return H.c(x)
if(!(w<x))break
this.ks(a,w,z);++w;++y}++z}return this.rx},
ks:function(a9,b0,b1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
if(this.x===0){this.ko(a9,b0,b1)
return}w=this.fr
if(typeof w!=="number")return H.c(w)
v=b1*w+b0
w=this.dx
if(v<0||v>=w.length)return H.a(w,v)
J.dE(a9,w[v])
w=this.cy
if(typeof w!=="number")return H.c(w)
u=b0*w
t=this.db
if(typeof t!=="number")return H.c(t)
s=b1*t
r=this.dy
if(v>=r.length)return H.a(r,v)
z=r[v]
r=this.r
if(typeof r!=="number")return H.c(r)
q=w*t*r
if(J.k(this.f,16))q*=2
y=null
if(J.k(this.f,8)||J.k(this.f,16)){if(J.k(this.e,1))y=a9
else if(J.k(this.e,5)){if(typeof q!=="number"||Math.floor(q)!==q)H.K(P.ak("Invalid length "+H.l(q)))
w=new Uint8Array(q)
y=new U.a3(w,0,w.length,0,!1)
x=new U.jh(9,0,0,0,0,null,null,null,null,new Uint8Array(4096),null,null,null,null)
try{x.i7(U.C(a9,z,0),J.dD(y))}catch(p){H.ad(p)}if(J.k(this.z,2)){o=0
while(!0){w=this.db
if(typeof w!=="number")return H.c(w)
if(!(o<w))break
w=this.r
t=this.cy
if(typeof t!=="number")return H.c(t)
n=J.h(w,o*t+1)
for(m=this.r,l=J.h(this.cy,m);w=J.u(m),w.I(m,l);m=w.i(m,1)){t=y
r=J.z(t)
k=J.e(r.ga5(t),J.b(r.gaf(t),n))
j=y
i=J.u(n)
h=i.p(n,this.r)
g=J.z(j)
h=J.b(k,J.e(g.ga5(j),J.b(g.gaf(j),h)))
J.n(r.ga5(t),J.b(r.gaf(t),n),h)
n=i.i(n,1)}++o}}}else if(J.k(this.e,32773)){if(typeof q!=="number"||Math.floor(q)!==q)H.K(P.ak("Invalid length "+H.l(q)))
w=new Uint8Array(q)
y=new U.a3(w,0,w.length,0,!1)
this.h5(a9,q,J.dD(y))}else if(J.k(this.e,32946)){f=J.d_(a9,0,z)
w=T.b7(C.G)
t=T.b7(C.P)
r=T.b_(f,0,null,0)
k=new T.jt(0,0,new Uint8Array(32768))
new T.dO(r,k,0,0,0,w,t).dJ()
t=k.c.buffer
e=(t&&C.f).a0(t,0,k.a)
y=new U.a3(e,0,e.length,0,!1)}else if(J.k(this.e,8)){e=new T.cc().bp(T.b_(J.d_(a9,0,z),1,null,0),!1)
y=new U.a3(e,0,e.length,0,!1)}else if(J.k(this.e,6)){d=new U.fB(null,null,null,null,null,null,Array(4),[],[],[],[],0,0)
d.is(J.d_(a9,0,z))
this.lc(d,this.rx,u,s,this.cy,this.db)
return}else throw H.f(new U.x("Unsupported Compression Type: "+H.l(this.e)))
if(y==null)return
c=s
b=0
a=0
while(!0){w=this.db
if(typeof w!=="number")return H.c(w)
if(a<w){w=this.c
if(typeof w!=="number")return H.c(w)
w=c<w}else w=!1
if(!w)break
w=c>=0
a0=u
a1=0
while(!0){t=this.cy
if(typeof t!=="number")return H.c(t)
if(a1<t){t=this.b
if(typeof t!=="number")return H.c(t)
t=a0<t}else t=!1
if(!t)break
if(J.k(this.r,1)){t=y
a2=b+1
r=J.z(t)
a3=J.e(r.ga5(t),J.b(r.gaf(t),b))
b=J.k(this.f,16)?a2+1:a2
if(J.k(this.d,3)&&this.k3!=null){t=this.k3
r=this.k4
if(typeof r!=="number")return r.i()
if(typeof a3!=="number")return H.c(a3)
r+=a3
k=t.length
if(r>>>0!==r||r>=k)return H.a(t,r)
r=t[r]
j=this.r1
if(typeof j!=="number")return j.i()
j+=a3
if(j>>>0!==j||j>=k)return H.a(t,j)
j=t[j]
i=this.r2
if(typeof i!=="number")return i.i()
i+=a3
if(i>>>0!==i||i>=k)return H.a(t,i)
i=t[i]
t=C.a.v(255,0,255)
i=J.P(i,0,255)
if(typeof i!=="number")return i.n()
j=J.P(j,0,255)
if(typeof j!=="number")return j.n()
r=J.P(r,0,255)
if(typeof r!=="number")return H.c(r)
a4=(t<<24|i<<16|j<<8|r)>>>0}else{t=C.a.v(255,0,255)
r=J.u(a3)
k=r.v(a3,0,255)
if(typeof k!=="number")return k.n()
j=r.v(a3,0,255)
if(typeof j!=="number")return j.n()
r=r.v(a3,0,255)
if(typeof r!=="number")return H.c(r)
a4=(t<<24|k<<16|j<<8|r)>>>0}t=this.rx
t.toString
if(a0>=0){r=t.a
if(typeof r!=="number")return H.c(r)
if(a0<r)if(w){r=t.b
if(typeof r!=="number")return H.c(r)
r=c<r}else r=!1
else r=!1}else r=!1
if(r){r=t.x
t=t.a
if(typeof t!=="number")return H.c(t)
t=c*t+a0
if(t>>>0!==t||t>=r.length)return H.a(r,t)
r[t]=a4}}else if(J.k(this.r,2)){t=y
a2=b+1
r=J.z(t)
a3=J.e(r.ga5(t),J.b(r.gaf(t),b))
b=J.k(this.f,16)?a2+1:a2
t=y
a2=b+1
r=J.z(t)
a5=J.e(r.ga5(t),J.b(r.gaf(t),b))
b=J.k(this.f,16)?a2+1:a2
t=J.P(a5,0,255)
if(typeof t!=="number")return t.n()
r=J.u(a3)
k=r.v(a3,0,255)
if(typeof k!=="number")return k.n()
j=r.v(a3,0,255)
if(typeof j!=="number")return j.n()
r=r.v(a3,0,255)
if(typeof r!=="number")return H.c(r)
i=this.rx
i.toString
if(a0>=0){h=i.a
if(typeof h!=="number")return H.c(h)
if(a0<h)if(w){h=i.b
if(typeof h!=="number")return H.c(h)
h=c<h}else h=!1
else h=!1}else h=!1
if(h){h=i.x
i=i.a
if(typeof i!=="number")return H.c(i)
i=c*i+a0
if(i>>>0!==i||i>=h.length)return H.a(h,i)
h[i]=(t<<24|k<<16|j<<8|r)>>>0}}else if(J.k(this.r,3)){a2=b+1
if(J.k(this.f,16)){t=y
r=J.z(t)
a6=J.e(r.ga5(t),J.b(r.gaf(t),b))
b=a2+1
t=y
r=J.z(t)
a7=J.e(r.ga5(t),J.b(r.gaf(t),b))
b=b+1+1
t=y
r=J.z(t)
a8=J.e(r.ga5(t),J.b(r.gaf(t),b))
b=b+1+1
t=C.a.v(255,0,255)
r=J.P(a8,0,255)
if(typeof r!=="number")return r.n()
k=J.P(a7,0,255)
if(typeof k!=="number")return k.n()
j=J.P(a6,0,255)
if(typeof j!=="number")return H.c(j)
i=this.rx
i.toString
if(a0>=0){h=i.a
if(typeof h!=="number")return H.c(h)
if(a0<h)if(w){h=i.b
if(typeof h!=="number")return H.c(h)
h=c<h}else h=!1
else h=!1}else h=!1
if(h){h=i.x
i=i.a
if(typeof i!=="number")return H.c(i)
i=c*i+a0
if(i>>>0!==i||i>=h.length)return H.a(h,i)
h[i]=(t<<24|r<<16|k<<8|j)>>>0}}else{t=y
r=J.z(t)
t=J.e(r.ga5(t),J.b(r.gaf(t),b))
r=y
b=a2+1
k=J.z(r)
r=J.e(k.ga5(r),J.b(k.gaf(r),a2))
k=y
a2=b+1
j=J.z(k)
k=J.e(j.ga5(k),J.b(j.gaf(k),b))
j=C.a.v(255,0,255)
k=J.P(k,0,255)
if(typeof k!=="number")return k.n()
r=J.P(r,0,255)
if(typeof r!=="number")return r.n()
t=J.P(t,0,255)
if(typeof t!=="number")return H.c(t)
i=this.rx
i.toString
if(a0>=0){h=i.a
if(typeof h!=="number")return H.c(h)
if(a0<h)if(w){h=i.b
if(typeof h!=="number")return H.c(h)
h=c<h}else h=!1
else h=!1}else h=!1
if(h){h=i.x
i=i.a
if(typeof i!=="number")return H.c(i)
i=c*i+a0
if(i>>>0!==i||i>=h.length)return H.a(h,i)
h[i]=(j<<24|k<<16|r<<8|t)>>>0}b=a2}}else if(J.U(this.r,4)){a2=b+1
if(J.k(this.f,16)){t=y
r=J.z(t)
a6=J.e(r.ga5(t),J.b(r.gaf(t),b))
b=a2+1
t=y
r=J.z(t)
a7=J.e(r.ga5(t),J.b(r.gaf(t),b))
b=b+1+1
t=y
r=J.z(t)
a8=J.e(r.ga5(t),J.b(r.gaf(t),b))
b=b+1+1
t=y
r=J.z(t)
a2=b+1+1
t=J.P(J.e(r.ga5(t),J.b(r.gaf(t),b)),0,255)
if(typeof t!=="number")return t.n()
r=J.P(a8,0,255)
if(typeof r!=="number")return r.n()
k=J.P(a7,0,255)
if(typeof k!=="number")return k.n()
j=J.P(a6,0,255)
if(typeof j!=="number")return H.c(j)
i=this.rx
i.toString
if(a0>=0){h=i.a
if(typeof h!=="number")return H.c(h)
if(a0<h)if(w){h=i.b
if(typeof h!=="number")return H.c(h)
h=c<h}else h=!1
else h=!1}else h=!1
if(h){h=i.x
i=i.a
if(typeof i!=="number")return H.c(i)
i=c*i+a0
if(i>>>0!==i||i>=h.length)return H.a(h,i)
h[i]=(t<<24|r<<16|k<<8|j)>>>0}b=a2}else{t=y
r=J.z(t)
t=J.e(r.ga5(t),J.b(r.gaf(t),b))
r=y
b=a2+1
k=J.z(r)
r=J.e(k.ga5(r),J.b(k.gaf(r),a2))
k=y
a2=b+1
j=J.z(k)
k=J.e(j.ga5(k),J.b(j.gaf(k),b))
j=y
b=a2+1
i=J.z(j)
j=J.P(J.e(i.ga5(j),J.b(i.gaf(j),a2)),0,255)
if(typeof j!=="number")return j.n()
k=J.P(k,0,255)
if(typeof k!=="number")return k.n()
r=J.P(r,0,255)
if(typeof r!=="number")return r.n()
t=J.P(t,0,255)
if(typeof t!=="number")return H.c(t)
i=this.rx
i.toString
if(a0>=0){h=i.a
if(typeof h!=="number")return H.c(h)
if(a0<h)if(w){h=i.b
if(typeof h!=="number")return H.c(h)
h=c<h}else h=!1
else h=!1}else h=!1
if(h){h=i.x
i=i.a
if(typeof i!=="number")return H.c(i)
i=c*i+a0
if(i>>>0!==i||i>=h.length)return H.a(h,i)
h[i]=(j<<24|k<<16|r<<8|t)>>>0}}}++a1;++a0}++a;++c}}else throw H.f(new U.x("Unsupported bitsPerSample: "+H.l(this.f)))},
lc:function(a,b,c,d,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=a.fC(a0,a1)
switch(a.Q.length){case 1:if(typeof a1!=="number")return H.c(a1)
y=z.length
x=0
w=0
for(;w<a1;++w){if(typeof a0!=="number")return H.c(a0)
v=w+d
u=v>=0
t=0
for(;t<a0;++t,x=s){s=x+1
if(x<0||x>=y)return H.a(z,x)
r=z[x]
q=t+c
p=C.a.v(255,0,255)
o=J.u(r)
n=o.v(r,0,255)
if(typeof n!=="number")return n.n()
m=o.v(r,0,255)
if(typeof m!=="number")return m.n()
o=o.v(r,0,255)
if(typeof o!=="number")return H.c(o)
b.toString
if(q>=0){l=b.a
if(typeof l!=="number")return H.c(l)
if(q<l)if(u){l=b.b
if(typeof l!=="number")return H.c(l)
l=v<l}else l=!1
else l=!1}else l=!1
if(l){l=b.x
k=b.a
if(typeof k!=="number")return H.c(k)
q=v*k+q
if(q>>>0!==q||q>=l.length)return H.a(l,q)
l[q]=(p<<24|n<<16|m<<8|o)>>>0}}}break
case 3:if(typeof a1!=="number")return H.c(a1)
y=z.length
x=0
w=0
for(;w<a1;++w){if(typeof a0!=="number")return H.c(a0)
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
p=J.P(h,0,255)
if(typeof p!=="number")return p.n()
o=J.P(i,0,255)
if(typeof o!=="number")return o.n()
n=J.P(j,0,255)
if(typeof n!=="number")return H.c(n)
m=t+c
b.toString
if(m>=0){l=b.a
if(typeof l!=="number")return H.c(l)
if(m<l)if(u){l=b.b
if(typeof l!=="number")return H.c(l)
l=v<l}else l=!1
else l=!1}else l=!1
if(l){l=b.x
k=b.a
if(typeof k!=="number")return H.c(k)
m=v*k+m
if(m>>>0!==m||m>=l.length)return H.a(l,m)
l[m]=(q<<24|p<<16|o<<8|n)>>>0}}}break
case 4:if(typeof a1!=="number")return H.c(a1)
y=z.length
x=0
w=0
for(;w<a1;++w){if(typeof a0!=="number")return H.c(a0)
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
q=J.u(e)
p=q.ak(e,255)
if(typeof p!=="number")return H.c(p)
p=J.b(J.h(g,1-p),e)
o=J.u(p)
if(o.I(p,0))p=0
else if(o.T(p,255))p=255
if(typeof p!=="number")return H.c(p)
o=q.ak(e,255)
if(typeof o!=="number")return H.c(o)
o=J.b(J.h(f,1-o),e)
n=J.u(o)
if(n.I(o,0))o=0
else if(n.T(o,255))o=255
if(typeof o!=="number")return H.c(o)
q=q.ak(e,255)
if(typeof q!=="number")return H.c(q)
q=J.b(J.h(r,1-q),e)
n=J.u(q)
if(n.I(q,0))q=0
else if(n.T(q,255))q=255
if(typeof q!=="number")return H.c(q)
n=t+c
m=C.a.v(255,0,255)
q=C.b.v(255-q,0,255)
o=C.b.v(255-o,0,255)
p=C.b.v(255-p,0,255)
b.toString
if(n>=0){l=b.a
if(typeof l!=="number")return H.c(l)
if(n<l)if(u){l=b.b
if(typeof l!=="number")return H.c(l)
l=v<l}else l=!1
else l=!1}else l=!1
if(l){l=b.x
k=b.a
if(typeof k!=="number")return H.c(k)
n=v*k+n
if(n>>>0!==n||n>=l.length)return H.a(l,n)
l[n]=(m<<24|q<<16|o<<8|p)>>>0}}}break
default:throw H.f("Unsupported color mode")}},
ko:function(a,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
y=this.fr
if(typeof y!=="number")return H.c(y)
x=a1*y+a0
y=this.dx
if(x<0||x>=y.length)return H.a(y,x)
J.dE(a,y[x])
y=this.cy
if(typeof y!=="number")return H.c(y)
w=a0*y
y=this.db
if(typeof y!=="number")return H.c(y)
v=a1*y
y=this.dy
if(x>=y.length)return H.a(y,x)
u=y[x]
z=null
if(J.k(this.e,32773)){y=J.cm(this.cy,8)
t=this.cy
s=y===0?J.h(J.av(t,8),this.db):J.h(J.b(J.av(t,8),1),this.db)
z=U.S(new Uint8Array(H.i(J.h(this.cy,this.db))),!1,null,0)
this.h5(a,s,J.dD(z))}else if(J.k(this.e,5)){z=U.S(new Uint8Array(H.i(J.h(this.cy,this.db))),!1,null,0)
new U.jh(9,0,0,0,0,null,null,null,null,new Uint8Array(H.i(4096)),null,null,null,null).i7(U.C(a,u,0),J.dD(z))
if(J.k(this.z,2)){r=0
while(!0){y=this.c
if(typeof y!=="number")return H.c(y)
if(!(r<y))break
y=this.r
t=this.b
if(typeof t!=="number")return H.c(t)
q=J.h(y,r*t+1)
for(p=this.r;y=J.u(p),y.I(p,J.h(this.b,this.r));p=y.i(p,1)){t=z
o=J.z(t)
n=J.e(o.ga5(t),J.b(o.gaf(t),q))
m=z
l=J.u(q)
k=l.p(q,this.r)
j=J.z(m)
k=J.b(n,J.e(j.ga5(m),J.b(j.gaf(m),k)))
J.n(o.ga5(t),J.b(o.gaf(t),q),k)
q=l.i(q,1)}++r}}}else if(J.k(this.e,2)){z=U.S(new Uint8Array(H.i(J.h(this.cy,this.db))),!1,null,0)
try{U.hA(this.go,this.cy,this.db).mz(z,a,0,this.db)}catch(i){H.ad(i)}}else if(J.k(this.e,3)){z=U.S(new Uint8Array(H.i(J.h(this.cy,this.db))),!1,null,0)
try{U.hA(this.go,this.cy,this.db).mA(z,a,0,this.db,this.id)}catch(i){H.ad(i)}}else if(J.k(this.e,4)){z=U.S(new Uint8Array(H.i(J.h(this.cy,this.db))),!1,null,0)
try{U.hA(this.go,this.cy,this.db).mD(z,a,0,this.db,this.k1)}catch(i){H.ad(i)}}else if(J.k(this.e,8))z=U.S(new T.cc().bp(T.b_(J.d_(a,0,u),1,null,0),!1),!1,null,0)
else if(J.k(this.e,32946)){y=T.nk(J.d_(a,0,u),null).b
t=y.c.buffer
z=U.S((t&&C.f).a0(t,0,y.a),!1,null,0)}else if(J.k(this.e,1))z=a
else throw H.f(new U.x("Unsupported Compression Type: "+H.l(this.e)))
if(z==null)return
h=new U.q6(z,0,0)
y=this.y
g=y?4278190080:4294967295
f=y?4294967295:4278190080
e=v
d=0
while(!0){y=this.db
if(typeof y!=="number")return H.c(y)
if(!(d<y))break
y=e>=0
c=w
b=0
while(!0){t=this.cy
if(typeof t!=="number")return H.c(t)
if(!(b<t))break
t=h.J(1)
o=this.rx
if(t===0){o.toString
if(c>=0){t=o.a
if(typeof t!=="number")return H.c(t)
if(c<t)if(y){t=o.b
if(typeof t!=="number")return H.c(t)
t=e<t}else t=!1
else t=!1}else t=!1
if(t){t=o.x
o=o.a
if(typeof o!=="number")return H.c(o)
o=e*o+c
if(o>>>0!==o||o>=t.length)return H.a(t,o)
t[o]=f}}else{o.toString
if(c>=0){t=o.a
if(typeof t!=="number")return H.c(t)
if(c<t)if(y){t=o.b
if(typeof t!=="number")return H.c(t)
t=e<t}else t=!1
else t=!1}else t=!1
if(t){t=o.x
o=o.a
if(typeof o!=="number")return H.c(o)
o=e*o+c
if(o>>>0!==o||o>=t.length)return H.a(t,o)
t[o]=g}}++b;++c}h.c=0;++d;++e}},
h5:function(a,b,c){var z,y,x,w,v,u,t,s,r
if(typeof b!=="number")return H.c(b)
z=J.as(c)
y=0
x=0
for(;x<b;){w=y+1
v=J.e(a.a,J.b(a.d,y))
$.$get$cO()[0]=v
v=$.$get$dw()
if(0>=v.length)return H.a(v,0)
u=v[0]
if(u>=0&&u<=127)for(v=u+1,y=w,t=0;t<v;++t,x=s,y=w){s=x+1
w=y+1
z.k(c,x,J.e(a.a,J.b(a.d,y)))}else{v=u<=-1&&u>=-127
y=w+1
if(v){r=J.e(a.a,J.b(a.d,w))
for(v=-u+1,t=0;t<v;++t,x=s){s=x+1
z.k(c,x,r)}}}}},
c2:function(a,b,c){var z=this.a
if(!z.X(b))return c
z=z.h(0,b)
a.d=z.d
return z.bx(a)},
eT:function(a,b){return this.c2(a,b,0)},
dL:function(a,b){var z=this.a
if(!z.X(b))return
return z.h(0,b).ft(a)},
jO:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=U.C(a,null,0)
y=a.u()
for(x=this.a,w=0;w<y;++w){v=a.u()
u=a.u()
t=a.t()
s=new U.q8(v,u,t,null)
if(u<13&&u>0){if(u>=14)return H.a(C.aE,u)
r=C.aE[u]}else r=0
if(t*r>4)s.d=a.t()
else{r=a.d
s.d=r
a.d=J.b(r,4)}x.k(0,v,s)
if(v===256){z.d=s.d
this.b=s.bx(z)}else if(v===257){z.d=s.d
this.c=s.bx(z)}else if(v===262){z.d=s.d
this.d=s.bx(z)}else if(v===259){z.d=s.d
this.e=s.bx(z)}else if(v===258){z.d=s.d
this.f=s.bx(z)}else if(v===277){z.d=s.d
this.r=s.bx(z)}else if(v===317){z.d=s.d
this.z=s.bx(z)}else if(v===320){q=s.ft(z)
this.k3=q
this.k4=0
r=q.length/3|0
this.r1=r
this.r2=r*2}}if(this.b==null||this.c==null||this.f==null||this.e==null)return
if(this.k3!=null&&J.k(this.f,8))for(r=this.k3,p=r.length,w=0;w<p;++w){o=r[w]
if(typeof o!=="number")return o.w()
r[w]=C.b.l(o,8)}if(J.k(this.d,0))this.y=!0
if(x.X(324)){this.cx=!0
this.cy=this.eT(z,322)
this.db=this.eT(z,323)
this.dx=this.dL(z,324)
this.dy=this.dL(z,325)}else{this.cx=!1
this.cy=this.c2(z,322,this.b)
if(!x.X(278))this.db=this.c2(z,323,this.c)
else{n=this.eT(z,278)
if(J.k(n,-1))this.db=this.c
else this.db=n}this.dx=this.dL(z,273)
this.dy=this.dL(z,279)}this.fr=J.av(J.m(J.b(this.b,this.cy),1),this.cy)
this.fx=J.av(J.m(J.b(this.c,this.db),1),this.db)
this.fy=J.h(J.h(this.cy,this.db),this.r)
this.go=this.c2(z,266,1)
this.id=this.c2(z,292,0)
this.k1=this.c2(z,293,0)
this.k2=this.c2(z,338,0)
switch(this.d){case 0:case 1:if(J.k(this.f,1)&&J.k(this.r,1))this.x=0
else if(J.k(this.f,4)&&J.k(this.r,1))this.x=1
else if(J.cm(this.f,8)===0)if(J.k(this.r,1))this.x=2
else if(J.k(this.r,2))this.x=3
else this.x=8
break
case 2:if(J.cm(this.f,8)===0)if(J.k(this.r,3))this.x=5
else if(J.k(this.r,4))this.x=6
else this.x=8
break
case 3:if(J.k(this.r,1))x=J.k(this.f,4)||J.k(this.f,8)||J.k(this.f,16)
else x=!1
if(x)this.x=4
break
case 4:if(J.k(this.f,1)&&J.k(this.r,1))this.x=0
break
case 6:if(J.k(this.e,7)&&J.k(this.f,8)&&J.k(this.r,3))this.x=5
else{if(x.X(530)){m=x.h(0,530).ft(z)
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
r=2}if(J.k(J.h(x,r),1))this.x=8
else if(J.k(this.f,8)&&J.k(this.r,3))this.x=7}break
default:if(J.cm(this.f,8)===0)this.x=8
break}},
static:{qb:function(a){var z=new U.qa(P.Z(),null,null,null,1,1,1,-1,!1,1,null,null,!1,null,null,null,null,null,null,null,1,0,0,null,null,null,null,null,null)
z.jO(a)
return z}}},
qc:{
"^":"ct;d,e,f,r,a,b,c"},
jh:{
"^":"j;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy",
i7:function(a,b){var z,y,x,w,v,u,t,s,r
this.x=b
z=J.M(b)
this.y=0
y=a.a
this.f=y
this.r=J.M(y)
this.b=a.d
if(J.k(J.e(this.f,0),0)&&J.k(J.e(this.f,1),1))throw H.f(new U.x("Invalid LZW Data"))
this.hp()
this.c=0
this.d=0
this.e=0
x=this.eF()
w=0
v=0
while(!0){if(x!==257){y=this.y
if(typeof y!=="number")return y.I()
if(typeof z!=="number")return H.c(z)
y=y<z}else y=!1
if(!y)break
if(x===256){this.hp();++v
x=this.eF()
this.cy=0
if(x===257)break
y=this.x
u=this.y
if(typeof u!=="number")return u.i()
this.y=u+1
J.n(y,u,x)
w=x}else{y=this.cx
if(typeof y!=="number")return H.c(y)
if(x<y){this.hk(x)
y=this.cy
if(typeof y!=="number")return y.p()
t=y-1
for(;t>=0;--t){y=this.x
u=this.y
if(typeof u!=="number")return u.i()
this.y=u+1
s=this.z
if(t>=4096)return H.a(s,t)
J.n(y,u,s[t])}y=this.z
u=this.cy
if(typeof u!=="number")return u.p();--u
if(u<0||u>=4096)return H.a(y,u)
this.fO(w,y[u])}else{this.hk(w)
y=this.cy
if(typeof y!=="number")return y.p()
t=y-1
for(;t>=0;--t){y=this.x
u=this.y
if(typeof u!=="number")return u.i()
this.y=u+1
s=this.z
if(t>=4096)return H.a(s,t)
J.n(y,u,s[t])}y=this.x
u=this.y
if(typeof u!=="number")return u.i()
this.y=u+1
s=this.z
r=this.cy
if(typeof r!=="number")return r.p();--r
if(r<0||r>=4096)return H.a(s,r)
J.n(y,u,s[r])
r=this.z
s=this.cy
if(typeof s!=="number")return s.p();--s
if(s<0||s>=4096)return H.a(r,s)
this.fO(w,r[s])}w=x}++v
x=this.eF()}},
fO:function(a,b){var z,y
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
hk:function(a){var z,y,x,w,v,u,t
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
eF:function(){var z,y,x
if(J.U(this.b,this.r))return 257
for(;z=this.e,y=this.a,z<y;){if(J.U(this.b,this.r))return 257
z=this.d
y=this.f
x=this.b
this.b=J.b(x,1)
x=J.e(y,x)
if(typeof x!=="number")return H.c(x)
this.d=((z<<8>>>0)+x&4294967295)>>>0
this.e+=8}z-=y
this.e=z
z=C.a.aR(this.d,z)
y-=9
if(y<0||y>=4)return H.a(C.a9,y)
return z&C.a9[y]},
hp:function(){var z,y
this.Q=new Uint8Array(4096)
z=new Uint32Array(4096)
this.ch=z
C.q.ag(z,0,4096,4098)
for(z=this.Q,y=0;y<256;++y){if(y>=z.length)return H.a(z,y)
z[y]=y}this.a=9
this.cx=258}},
q7:{
"^":"bV;b,c,a",
c5:function(a,b){var z,y,x
z=U.S(new Uint8Array(H.D(a)),!1,null,0)
y=this.hz(z)
if(y==null)return
x=y.r
if(b>=x.length)return H.a(x,b)
return x[b].mx(z)},
hz:function(a){var z,y,x,w,v,u,t,s,r
x=[]
w=new U.qc(null,null,null,x,0,0,4294967295)
v=a.u()
if(v!==18761&&v!==19789)return
if(v===19789){a.e=!0
w.d=!0}else{a.e=!1
w.d=!1}u=a.u()
w.e=u
if(u!==42)return
t=a.t()
w.f=t
z=U.C(a,null,0)
J.dE(z,t)
for(;t!==0;){y=null
try{y=U.qb(z)
u=y
s=J.z(u)
if(!(s.gD(u)!=null&&s.gC(u)!=null&&u.gbG()!=null&&u.gmj()!=null&&u.e!=null))break}catch(r){H.ad(r)
break}x.push(y)
u=x.length
if(u===1){if(0>=u)return H.a(x,0)
s=x[0]
w.a=s.b
if(0>=u)return H.a(x,0)
w.b=s.c}t=z.t()
if(t!==0)J.dE(z,t)}return x.length>0?w:null}},
hJ:{
"^":"j;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,aB,b8,b9,aX,aE,c7,aS,ba,bN,bA,bB,aK,d9,aC,aT,bb,aP,aF,aG,fb,oj,fc,ok,ol",
d4:function(){var z,y,x
z=this.a.aZ()
if(J.J(z,1)!==0)return!1
if(typeof z!=="number")return z.w()
if((z>>>1&7)>3)return!1
y=z>>>4&1
if(y===0)return!1
x=this.f
x.a=(z&1)===0
x.b=z>>>1&7
x.c=y
x.d=z>>>5
if(this.a.aZ()!==2752925)return!1
y=this.b
y.a=this.a.u()
y.b=this.a.u()
return!0},
by:function(){if(!this.kU())return
var z=this.b
this.d=U.aZ(z.a,z.b,4)
if(!this.l7())return
if(!this.ln())return
return this.d},
kU:function(){var z,y,x,w,v
if(!this.d4())return!1
this.k3=U.qR()
for(z=this.k2,y=0;y<4;++y){x=new Int32Array(2)
w=new Int32Array(2)
z[y]=new U.es(x,w,new Int32Array(2),null,null)}z=this.r
x=this.b
w=x.a
z.a=w
v=x.b
z.b=v
if(typeof w!=="number")return w.w()
z.c=C.b.l(w,8)>>>6
if(typeof v!=="number")return v.w()
z.d=C.b.l(v,8)>>>6
this.ch=0
this.z=0
this.Q=w
this.cx=v
this.cy=C.b.l(w+15,4)
x=J.b(x.b,15)
if(typeof x!=="number")return x.w()
this.db=C.b.l(x,4)
this.ry=0
x=this.f
this.c=U.ks(this.a.cR(x.d))
w=this.a
x=x.d
w.d=J.b(w.d,x)
z.e=this.c.V(1)
z.f=this.c.V(1)
if(!this.lt(this.y,this.k3))return!1
if(!this.lm())return!1
if(!this.lp(this.a))return!1
this.lr()
this.c.V(1)
this.lq()
return!0},
lt:function(a,b){var z,y,x,w
z=this.c.V(1)!==0
a.a=z
if(z){a.b=this.c.V(1)!==0
if(this.c.V(1)!==0){a.c=this.c.V(1)!==0
for(z=a.d,y=0;y<4;++y){if(this.c.V(1)!==0){x=this.c
w=x.V(7)
x=x.V(1)===1?-w:w}else x=0
z[y]=x}for(z=a.e,y=0;y<4;++y){if(this.c.V(1)!==0){x=this.c
w=x.V(6)
x=x.V(1)===1?-w:w}else x=0
z[y]=x}}if(a.b)for(y=0;y<3;++y){z=b.a
z[y]=this.c.V(1)!==0?this.c.V(8):255}}else a.b=!1
return!0},
lm:function(){var z,y,x,w,v
z=this.x
z.a=this.c.V(1)!==0
z.b=this.c.V(6)
z.c=this.c.V(3)
y=this.c.V(1)!==0
z.d=y
if(y)if(this.c.V(1)!==0){for(y=z.e,x=0;x<4;++x)if(this.c.V(1)!==0){w=this.c
v=w.V(6)
y[x]=w.V(1)===1?-v:v}for(y=z.f,x=0;x<4;++x)if(this.c.V(1)!==0){w=this.c
v=w.V(6)
y[x]=w.V(1)===1?-v:v}}if(z.b===0)y=0
else y=z.a===!0?1:2
this.aP=y
return!0},
lp:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=J.m(a.c,a.d)
y=C.a.H(1,this.c.V(2))
this.fy=y
x=y-1
w=x*3
y=J.u(z)
if(y.I(z,w))return!1
for(v=this.go,u=0,t=0;t<x;++t,w=o){s=J.b(a.d,u)
r=a.a
q=J.e(r,J.b(s,0))
p=J.e(r,J.b(s,1))
if(typeof p!=="number")return p.n()
p=J.aF(q,p<<8>>>0)
r=J.e(r,J.b(s,2))
if(typeof r!=="number")return r.n()
o=J.b(w,J.aF(p,r<<16>>>0))
if(J.V(o,z))o=z
r=J.m(o,w)
s=J.b(J.b(a.b,w),0)
q=a.a
p=a.e
r=new U.dn(new U.a3(q,s,r==null?J.M(q):J.b(s,r),s,p),null,null,null,!1)
r.b=254
r.c=0
r.d=-8
if(t>=8)return H.a(v,t)
v[t]=r
u+=3}y=U.ks(a.cg(y.p(z,w),J.b(J.m(a.d,a.b),w)))
if(x<0||x>=8)return H.a(v,x)
v[x]=y
return J.a7(w,z)&&!0},
lr:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.c.V(7)
y=this.c.V(1)!==0?this.c.cN(4):0
x=this.c.V(1)!==0?this.c.cN(4):0
w=this.c.V(1)!==0?this.c.cN(4):0
v=this.c.V(1)!==0?this.c.cN(4):0
u=this.c.V(1)!==0?this.c.cN(4):0
t=this.y
for(s=this.k2,r=t.d,q=0;q<4;++q){if(t.a){p=r[q]
if(!t.c)p+=z}else{if(q>0){s[q]=s[0]
continue}p=z}o=s[q]
n=o.a
m=p+y
if(m<0)m=0
else if(m>127)m=127
if(m>=128)return H.a(C.y,m)
n[0]=C.y[m]
if(p<0)m=0
else m=p>127?127:p
if(m>=128)return H.a(C.z,m)
n[1]=C.z[m]
m=o.b
n=p+x
if(n<0)n=0
else if(n>127)n=127
if(n>=128)return H.a(C.y,n)
m[0]=C.y[n]*2
n=p+w
if(n<0)n=0
else if(n>127)n=127
if(n>=128)return H.a(C.z,n)
m[1]=C.z[n]*101581>>>16
if(m[1]<8)m[1]=8
n=o.c
m=p+v
if(m<0)m=0
else if(m>117)m=117
if(m>=128)return H.a(C.y,m)
n[0]=C.y[m]
m=p+u
if(m<0)l=0
else l=m>127?127:m
if(l>=128)return H.a(C.z,l)
n[1]=C.z[l]
o.d=m}},
lq:function(){var z,y,x,w,v,u,t
z=this.k3
for(y=0;y<4;++y)for(x=0;x<8;++x)for(w=0;w<3;++w)for(v=0;v<11;++v){u=this.c.a7(C.cR[y][x][w][v])!==0?this.c.V(8):C.di[y][x][w][v]
z.b[y][x].a[w][v]=u}t=this.c.V(1)!==0
this.k4=t
if(t)this.r1=this.c.V(8)},
lv:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.aP
if(typeof z!=="number")return z.T()
if(z>0){y=this.x
for(z=y.e[0],x=y.f[0],w=this.y,v=w.e,u=0;u<4;++u){if(w.a){t=v[u]
if(!w.c){s=y.b
if(typeof s!=="number")return H.c(s)
t+=s}}else t=y.b
for(r=0;r<=1;++r){q=this.aF[u][r]
if(y.d===!0){if(typeof t!=="number")return t.i()
p=t+z
if(r!==0)p+=x}else p=t
if(typeof p!=="number")return p.I()
if(p<0)p=0
else if(p>63)p=63
if(p>0){s=y.c
if(typeof s!=="number")return s.T()
if(s>0){o=s>4?C.a.l(p,2):C.a.l(p,1)
n=9-s
if(o>n)o=n}else o=p
if(o<1)o=1
q.b=o
q.a=2*p+o
if(p>=40)s=2
else s=p>=15?1:0
q.d=s}else q.a=0
q.c=r!==0}}}},
l7:function(){var z,y,x,w,v,u,t,s,r,q
z=this.b
y=z.db
if(y!=null)this.fb=y
y=H.p(Array(4),[[P.w,U.ek]])
this.aF=y
for(x=0;x<4;++x)y[x]=[new U.ek(0,0,!1,0),new U.ek(0,0,!1,0)]
y=this.cy
if(typeof y!=="number")return H.c(y)
this.x1=H.p(Array(y),[U.kv])
x=0
while(!0){y=this.cy
if(typeof y!=="number")return H.c(y)
if(!(x<y))break
y=this.x1
w=new Uint8Array(16)
v=new Uint8Array(8)
u=new Uint8Array(8)
if(x>=y.length)return H.a(y,x)
y[x]=new U.kv(w,v,u);++x}this.y2=new Uint8Array(H.i(832))
y=this.cy
if(typeof y!=="number")return H.c(y)
this.r2=new Uint8Array(H.i(4*y))
y=this.cy
if(typeof y!=="number")return H.c(y)
w=16*y
this.aX=w
y=8*y
this.aE=y
v=this.aP
if(v>>>0!==v||v>=3)return H.a(C.w,v)
t=C.w[v]
s=t*w
r=(t/2|0)*y
this.aB=U.S(new Uint8Array(H.i(16*w+s)),!1,null,s)
w=this.aE
if(typeof w!=="number")return H.c(w)
this.b8=U.S(new Uint8Array(H.i(8*w+r)),!1,null,r)
w=this.aE
if(typeof w!=="number")return H.c(w)
this.b9=U.S(new Uint8Array(H.i(8*w+r)),!1,null,r)
this.c7=U.S(new Uint8Array(H.i(z.a)),!1,null,0)
z=J.b(z.a,1)
if(typeof z!=="number")return z.w()
z=C.b.l(z,1)
this.aS=U.S(new Uint8Array(H.i(z)),!1,null,0)
this.ba=U.S(new Uint8Array(H.i(z)),!1,null,0)
z=this.aP
if(z>>>0!==z||z>=3)return H.a(C.w,z)
q=C.w[z]
if(z===2){this.dx=0
this.dy=0}else{z=this.z
if(typeof z!=="number")return z.p()
z=C.a.a3(z-q,16)
this.dx=z
y=this.ch
if(typeof y!=="number")return y.p()
y=C.a.a3(y-q,16)
this.dy=y
if(z<0)this.dx=0
if(y<0)this.dy=0}this.fx=J.av(J.b(J.b(this.cx,15),q),16)
z=J.av(J.b(J.b(this.Q,15),q),16)
this.fr=z
if(J.V(z,this.cy))this.fr=this.cy
if(J.V(this.fx,this.db))this.fx=this.db
z=this.cy
if(typeof z!=="number")return z.i()
this.x2=H.p(Array(z+1),[U.hO])
z=this.cy
if(typeof z!=="number")return H.c(z)
this.bb=H.p(Array(z),[U.ku])
z=this.cy
if(typeof z!=="number")return H.c(z)
this.y1=H.p(Array(z),[U.ek])
x=0
while(!0){z=this.cy
if(typeof z!=="number")return H.c(z)
if(!(x<z))break
z=this.x2
if(x>=z.length)return H.a(z,x)
z[x]=new U.hO(0,0)
z=this.bb
y=new Int16Array(384)
w=new Uint8Array(16)
if(x>=z.length)return H.a(z,x)
z[x]=new U.ku(y,null,w,null,null,null,null);++x}y=this.x2
if(z>=y.length)return H.a(y,z)
y[z]=new U.hO(0,0)
this.lv()
U.qL()
this.e=new U.qK()
return!0},
ln:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
this.aT=0
z=this.rx
y=this.y
x=this.go
w=0
while(!0){v=this.fx
if(typeof v!=="number")return H.c(v)
if(!(w<v))break
v=this.fy
if(typeof v!=="number")return v.p()
v=(w&v-1)>>>0
if(v<0||v>=8)return H.a(x,v)
u=x[v]
while(!0){w=this.aC
v=this.cy
if(typeof v!=="number")return H.c(v)
if(!(w<v))break
v=this.x2
t=v.length
if(0>=t)return H.a(v,0)
s=v[0]
r=1+w
if(r>=t)return H.a(v,r)
q=v[r]
r=this.bb
if(w>=r.length)return H.a(r,w)
p=r[w]
if(y.b){w=this.c.a7(this.k3.a[0])
v=this.c
t=this.k3
this.ry=w===0?v.a7(t.a[1]):2+v.a7(t.a[2])}o=this.k4===!0&&this.c.a7(this.r1)!==0
this.lo()
if(!o)o=this.ls(q,u)
else{q.a=0
s.a=0
if(p.b!==!0){q.b=0
s.b=0}p.e=0
p.f=0}w=this.aP
if(typeof w!=="number")return w.T()
if(w>0){w=this.y1
v=this.aC
t=this.aF
r=this.ry
t.length
if(r>>>0!==r||r>=4)return H.a(t,r)
r=t[r]
t=r[p.b===!0?1:0]
if(v>=w.length)return H.a(w,v)
w[v]=t
n=w[v]
n.c=n.c||!o}++this.aC}w=this.x2
if(0>=w.length)return H.a(w,0)
s=w[0]
s.a=0
s.b=0
C.h.ag(z,0,4,0)
this.aC=0
this.m_()
w=this.aP
if(typeof w!=="number")return w.T()
if(w>0){w=this.aT
v=this.dy
if(typeof v!=="number")return H.c(v)
if(w>=v){v=this.fx
if(typeof v!=="number")return H.c(v)
v=w<=v
m=v}else m=!1}else m=!1
if(!this.kQ(m))return!1
w=++this.aT}return!0},
m_:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=this.aT
y=U.S(this.y2,!1,null,40)
x=U.S(this.y2,!1,null,584)
w=U.S(this.y2,!1,null,600)
v=z>0
u=0
while(!0){t=this.cy
if(typeof t!=="number")return H.c(t)
if(!(u<t))break
t=this.bb
if(u>=t.length)return H.a(t,u)
s=t[u]
if(u>0){for(r=-1;r<16;++r){t=r*32
y.aY(t-4,4,y,t+12)}for(r=-1;r<8;++r){t=r*32
q=t-4
t+=4
x.aY(q,4,x,t)
w.aY(q,4,w,t)}}else{for(r=0;r<16;++r)J.n(y.a,J.b(y.d,r*32-1),129)
for(r=0;r<8;++r){t=r*32-1
J.n(x.a,J.b(x.d,t),129)
J.n(w.a,J.b(w.d,t),129)}if(v){J.n(w.a,J.b(w.d,-33),129)
J.n(x.a,J.b(x.d,-33),129)
J.n(y.a,J.b(y.d,-33),129)}}t=this.x1
if(u>=t.length)return H.a(t,u)
p=t[u]
o=s.a
n=s.e
if(v){y.bO(-32,16,p.a)
x.bO(-32,8,p.b)
w.bO(-32,8,p.c)}else if(u===0){J.be(y.a,J.b(y.d,-33),J.b(J.b(y.d,-33),21),127)
J.be(x.a,J.b(x.d,-33),J.b(J.b(x.d,-33),9),127)
J.be(w.a,J.b(w.d,-33),J.b(J.b(w.d,-33),9),127)}if(s.b===!0){m=U.C(y,null,-16)
l=m.dk()
if(v){t=this.cy
if(typeof t!=="number")return t.p()
if(u>=t-1){t=J.e(p.a,15)
J.be(m.a,J.b(m.d,0),J.b(J.b(m.d,0),4),t)}else{t=this.x1
q=u+1
if(q>=t.length)return H.a(t,q)
m.bO(0,4,t[q].a)}}t=l.length
if(0>=t)return H.a(l,0)
k=l[0]
if(96>=t)return H.a(l,96)
l[96]=k
l[64]=k
l[32]=k
t=s.c
j=0
while(j<16){i=U.C(y,null,C.an[j])
q=t[j]
if(q>=10)return H.a(C.aB,q)
C.aB[q].$1(i)
q=j*16
this.h7(n,new U.a3(o,q,384,q,!1),i);++j
if(typeof n!=="number")return n.n()
n=(n<<2&4294967295)>>>0}}else{h=U.kw(u,z,s.c[0])
if(h>>>0!==h||h>=7)return H.a(C.ac,h)
C.ac[h].$1(y)
if(n!==0){j=0
while(j<16){i=U.C(y,null,C.an[j])
t=j*16
this.h7(n,new U.a3(o,t,384,t,!1),i);++j
if(typeof n!=="number")return n.n()
n=(n<<2&4294967295)>>>0}}}g=s.f
f=U.kw(u,z,s.d)
if(f>>>0!==f||f>=7)return H.a(C.V,f)
C.V[f].$1(x)
C.V[f].$1(w)
e=new U.a3(o,256,384,256,!1)
if(typeof g!=="number")return g.L()
if((g&255)!==0){t=this.e
if((g&170)!==0){t.bE(e,x)
t.bE(U.C(e,null,16),U.C(x,null,4))
q=U.C(e,null,32)
d=U.C(x,null,128)
t.bE(q,d)
t.bE(U.C(q,null,16),U.C(d,null,4))}else t.iC(e,x)}c=new U.a3(o,320,384,320,!1)
t=g>>>8
if((t&255)!==0){q=this.e
if((t&170)!==0){q.bE(c,w)
q.bE(U.C(c,null,16),U.C(w,null,4))
t=U.C(c,null,32)
d=U.C(w,null,128)
q.bE(t,d)
q.bE(U.C(t,null,16),U.C(d,null,4))}else q.iC(c,w)}t=this.db
if(typeof t!=="number")return t.p()
if(z<t-1){J.eR(p.a,0,16,y.aq(),480)
C.h.aj(p.b,0,8,x.aq(),224)
C.h.aj(p.c,0,8,w.aq(),224)}b=u*16
a=u*8
for(r=0;r<16;++r){t=this.aX
if(typeof t!=="number")return H.c(t)
this.aB.aY(b+r*t,16,y,r*32)}for(r=0;r<8;++r){t=this.aE
if(typeof t!=="number")return H.c(t)
q=r*32
this.b8.aY(a+r*t,8,x,q)
t=this.aE
if(typeof t!=="number")return H.c(t)
this.b9.aY(a+r*t,8,w,q)}++u}},
h7:function(a,b,c){var z,y,x,w,v,u
if(typeof a!=="number")return a.w()
switch(a>>>30){case 3:this.e.bE(b,c)
break
case 2:this.e.toString
z=J.b(J.e(b.a,J.b(b.d,0)),4)
y=J.Y(J.I(J.h(J.e(b.a,J.b(b.d,4)),35468),65536))
x=J.Y(J.I(J.h(J.e(b.a,J.b(b.d,4)),85627),65536))
w=J.Y(J.I(J.h(J.e(b.a,J.b(b.d,1)),35468),65536))
v=J.Y(J.I(J.h(J.e(b.a,J.b(b.d,1)),85627),65536))
u=J.G(z)
U.en(c,0,u.i(z,x),v,w)
U.en(c,1,u.i(z,y),v,w)
U.en(c,2,u.p(z,y),v,w)
U.en(c,3,u.p(z,x),v,w)
break
case 1:this.e.dl(b,c)
break
default:break}},
kC:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.aX
y=this.y1
if(a<0||a>=y.length)return H.a(y,a)
x=y[a]
w=U.C(this.aB,null,a*16)
v=x.b
u=x.a
if(u===0)return
if(this.aP===1){if(a>0)this.e.fD(w,z,u+4)
if(x.c)this.e.iS(w,z,u)
if(b>0)this.e.fE(w,z,u+4)
if(x.c)this.e.iT(w,z,u)}else{t=this.aE
y=a*8
s=U.C(this.b8,null,y)
r=U.C(this.b9,null,y)
q=x.d
if(a>0){y=u+4
this.e.co(w,1,z,16,y,v,q)
p=this.e
p.co(s,1,t,8,y,v,q)
p.co(r,1,t,8,y,v,q)}if(x.c){this.e.mX(w,z,u,v,q)
y=this.e
y.toString
o=U.C(s,null,4)
n=U.C(r,null,4)
y.cn(o,1,t,8,u,v,q)
y.cn(n,1,t,8,u,v,q)}if(b>0){y=u+4
this.e.co(w,z,1,16,y,v,q)
p=this.e
p.co(s,t,1,8,y,v,q)
p.co(r,t,1,8,y,v,q)}if(x.c){this.e.nY(w,z,u,v,q)
y=this.e
y.toString
if(typeof t!=="number")return H.c(t)
p=4*t
o=U.C(s,null,p)
n=U.C(r,null,p)
y.cn(o,t,1,8,u,v,q)
y.cn(n,t,1,8,u,v,q)}}},
kN:function(){var z,y
z=this.dx
while(!0){y=this.fr
if(typeof z!=="number")return z.I()
if(typeof y!=="number")return H.c(y)
if(!(z<y))break
this.kC(z,this.aT);++z}},
kQ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=this.aP
if(z>>>0!==z||z>=3)return H.a(C.w,z)
y=C.w[z]
z=this.aX
if(typeof z!=="number")return H.c(z)
x=y*z
z=this.aE
if(typeof z!=="number")return H.c(z)
w=(y/2|0)*z
z=-x
v=U.C(this.aB,null,z)
u=-w
t=U.C(this.b8,null,u)
s=U.C(this.b9,null,u)
r=this.aT
q=J.m(this.fx,1)
if(typeof q!=="number")return H.c(q)
p=r*16
o=(r+1)*16
if(a)this.kN()
if(this.id);if(r!==0){p-=y
this.bN=U.C(v,null,0)
this.bA=U.C(t,null,0)
this.bB=U.C(s,null,0)}else{this.bN=U.C(this.aB,null,0)
this.bA=U.C(this.b8,null,0)
this.bB=U.C(this.b9,null,0)}q=!(r>=q)
if(q)o-=y
n=this.cx
if(typeof n!=="number")return H.c(n)
if(o>n)o=n
this.aK=null
if(this.fb!=null&&p<o){n=this.ku(p,o-p)
this.aK=n
if(n==null)return!1}n=this.ch
if(typeof n!=="number")return H.c(n)
if(p<n){m=n-p
l=this.bN
k=l.d
j=this.aX
if(typeof j!=="number")return j.q()
l.d=J.b(k,j*m)
j=this.bA
k=j.d
l=this.aE
i=C.a.l(m,1)
if(typeof l!=="number")return l.q()
j.d=J.b(k,l*i)
l=this.bB
k=l.d
j=this.aE
if(typeof j!=="number")return j.q()
l.d=J.b(k,j*i)
l=this.aK
if(l!=null)l.d=J.b(l.d,J.h(this.b.a,m))
p=n}if(p<o){n=this.bN
n.d=J.b(n.d,this.z)
n=this.bA
l=n.d
k=this.z
if(typeof k!=="number")return k.w()
n.d=J.b(l,k>>>1)
k=this.bB
l=k.d
n=this.z
if(typeof n!=="number")return n.w()
k.d=J.b(l,n>>>1)
n=this.aK
if(n!=null)n.d=J.b(n.d,this.z)
n=this.ch
if(typeof n!=="number")return H.c(n)
this.lz(p-n,J.m(this.Q,this.z),o-p)}if(q){q=this.aB
n=this.aX
if(typeof n!=="number")return H.c(n)
q.aY(z,x,v,16*n)
n=this.b8
z=this.aE
if(typeof z!=="number")return H.c(z)
n.aY(u,w,t,8*z)
z=this.b9
n=this.aE
if(typeof n!=="number")return H.c(n)
z.aY(u,w,s,8*n)}return!0},
lz:function(a,b,c){if(J.aY(b,0)||J.aY(c,0))return!1
this.kE(a,b,c)
this.kD(a,b,c)
return!0},
dP:function(a,b,c,d,a0,a1,a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=new U.qS()
y=J.m(a4,1)
if(typeof y!=="number")return y.w()
y=C.b.l(y,1)
x=z.$2(J.e(c.a,J.b(c.d,0)),J.e(d.a,J.b(d.d,0)))
w=z.$2(J.e(a0.a,J.b(a0.d,0)),J.e(a1.a,J.b(a1.d,0)))
if(typeof x!=="number")return H.c(x)
if(typeof w!=="number")return H.c(w)
v=C.b.l(3*x+w+131074,2)
u=J.e(a.a,J.b(a.d,0))
t=v&255
s=v>>>16
if(typeof u!=="number")return H.c(u)
u=19077*u
r=u+26149*s+-3644112
if((r&-4194304)>>>0===0)q=C.b.l(r,14)
else q=r<0?0:255
J.n(a2.a,J.b(a2.d,0),q)
s=u-6419*t-13320*s+2229552
if((s&-4194304)>>>0===0)q=C.b.l(s,14)
else q=s<0?0:255
J.n(a2.a,J.b(a2.d,1),q)
u=u+33050*t+-4527440
if((u&-4194304)>>>0===0)q=C.b.l(u,14)
else q=u<0?0:255
J.n(a2.a,J.b(a2.d,2),q)
J.n(a2.a,J.b(a2.d,3),255)
u=b!=null
if(u){v=C.b.l(3*w+x+131074,2)
t=J.e(b.a,J.b(b.d,0))
s=v&255
r=v>>>16
if(typeof t!=="number")return H.c(t)
t=19077*t
p=t+26149*r+-3644112
if((p&-4194304)>>>0===0)q=C.b.l(p,14)
else q=p<0?0:255
J.n(a3.a,J.b(a3.d,0),q)
r=t-6419*s-13320*r+2229552
if((r&-4194304)>>>0===0)q=C.b.l(r,14)
else q=r<0?0:255
J.n(a3.a,J.b(a3.d,1),q)
t=t+33050*s+-4527440
if((t&-4194304)>>>0===0)q=C.b.l(t,14)
else q=t<0?0:255
J.n(a3.a,J.b(a3.d,2),q)
J.n(a3.a,J.b(a3.d,3),255)}for(o=1;o<=y;++o,w=m,x=n){n=z.$2(J.e(c.a,J.b(c.d,o)),J.e(d.a,J.b(d.d,o)))
m=z.$2(J.e(a0.a,J.b(a0.d,o)),J.e(a1.a,J.b(a1.d,o)))
t=J.G(x)
l=J.b(J.b(J.b(t.i(x,n),w),m),524296)
s=J.b(n,w)
if(typeof s!=="number")return H.c(s)
r=J.G(l)
s=r.i(l,2*s)
if(typeof s!=="number")return s.w()
s=C.b.l(s,3)
t=t.i(x,m)
if(typeof t!=="number")return H.c(t)
t=r.i(l,2*t)
if(typeof t!=="number")return t.w()
t=C.b.l(t,3)
if(typeof x!=="number")return H.c(x)
v=C.b.l(s+x,1)
if(typeof n!=="number")return H.c(n)
k=C.b.l(t+n,1)
r=2*o
p=r-1
j=J.e(a.a,J.b(a.d,p))
i=v&255
h=v>>>16
g=p*4
f=U.C(a2,null,g)
if(typeof j!=="number")return H.c(j)
j=19077*j
e=j+26149*h+-3644112
if((e&-4194304)>>>0===0)q=C.b.l(e,14)
else q=e<0?0:255
J.n(f.a,J.b(f.d,0),q)
h=j-6419*i-13320*h+2229552
if((h&-4194304)>>>0===0)q=C.b.l(h,14)
else q=h<0?0:255
J.n(f.a,J.b(f.d,1),q)
j=j+33050*i+-4527440
if((j&-4194304)>>>0===0)q=C.b.l(j,14)
else q=j<0?0:255
J.n(f.a,J.b(f.d,2),q)
J.n(f.a,J.b(f.d,3),255)
j=r-0
i=J.e(a.a,J.b(a.d,j))
h=k&255
f=k>>>16
j=U.C(a2,null,j*4)
if(typeof i!=="number")return H.c(i)
i=19077*i
e=i+26149*f+-3644112
if((e&-4194304)>>>0===0)q=C.b.l(e,14)
else q=e<0?0:255
J.n(j.a,J.b(j.d,0),q)
f=i-6419*h-13320*f+2229552
if((f&-4194304)>>>0===0)q=C.b.l(f,14)
else q=f<0?0:255
J.n(j.a,J.b(j.d,1),q)
i=i+33050*h+-4527440
if((i&-4194304)>>>0===0)q=C.b.l(i,14)
else q=i<0?0:255
J.n(j.a,J.b(j.d,2),q)
J.n(j.a,J.b(j.d,3),255)
if(u){if(typeof w!=="number")return H.c(w)
v=C.b.l(t+w,1)
if(typeof m!=="number")return H.c(m)
k=C.b.l(s+m,1)
t=J.e(b.a,J.b(b.d,p))
s=v&255
p=v>>>16
g=U.C(a3,null,g)
if(typeof t!=="number")return H.c(t)
t=19077*t
j=t+26149*p+-3644112
if((j&-4194304)>>>0===0)q=C.b.l(j,14)
else q=j<0?0:255
J.n(g.a,J.b(g.d,0),q)
p=t-6419*s-13320*p+2229552
if((p&-4194304)>>>0===0)q=C.b.l(p,14)
else q=p<0?0:255
J.n(g.a,J.b(g.d,1),q)
t=t+33050*s+-4527440
if((t&-4194304)>>>0===0)q=C.b.l(t,14)
else q=t<0?0:255
J.n(g.a,J.b(g.d,2),q)
J.n(g.a,J.b(g.d,3),255)
t=J.e(b.a,J.b(b.d,r))
s=k&255
p=k>>>16
r=U.C(a3,null,r*4)
if(typeof t!=="number")return H.c(t)
t=19077*t
j=t+26149*p+-3644112
if((j&-4194304)>>>0===0)q=C.b.l(j,14)
else q=j<0?0:255
J.n(r.a,J.b(r.d,0),q)
p=t-6419*s-13320*p+2229552
if((p&-4194304)>>>0===0)q=C.b.l(p,14)
else q=p<0?0:255
J.n(r.a,J.b(r.d,1),q)
t=t+33050*s+-4527440
if((t&-4194304)>>>0===0)q=C.b.l(t,14)
else q=t<0?0:255
J.n(r.a,J.b(r.d,2),q)
J.n(r.a,J.b(r.d,3),255)}}if(typeof a4!=="number")return a4.L()
if((a4&1)===0){if(typeof x!=="number")return H.c(x)
if(typeof w!=="number")return H.c(w)
v=C.b.l(3*x+w+131074,2)
z=a4-1
y=J.e(a.a,J.b(a.d,z))
t=v&255
s=v>>>16
r=z*4
p=U.C(a2,null,r)
if(typeof y!=="number")return H.c(y)
y=19077*y
j=y+26149*s+-3644112
if((j&-4194304)>>>0===0)q=C.b.l(j,14)
else q=j<0?0:255
J.n(p.a,J.b(p.d,0),q)
s=y-6419*t-13320*s+2229552
if((s&-4194304)>>>0===0)q=C.b.l(s,14)
else q=s<0?0:255
J.n(p.a,J.b(p.d,1),q)
y=y+33050*t+-4527440
if((y&-4194304)>>>0===0)q=C.b.l(y,14)
else q=y<0?0:255
J.n(p.a,J.b(p.d,2),q)
J.n(p.a,J.b(p.d,3),255)
if(u){v=C.b.l(3*w+x+131074,2)
z=J.e(b.a,J.b(b.d,z))
y=v&255
u=v>>>16
r=U.C(a3,null,r)
if(typeof z!=="number")return H.c(z)
z=19077*z
t=z+26149*u+-3644112
if((t&-4194304)>>>0===0)q=C.b.l(t,14)
else q=t<0?0:255
J.n(r.a,J.b(r.d,0),q)
u=z-6419*y-13320*u+2229552
if((u&-4194304)>>>0===0)q=C.b.l(u,14)
else q=u<0?0:255
J.n(r.a,J.b(r.d,1),q)
z=z+33050*y+-4527440
if((z&-4194304)>>>0===0)q=C.b.l(z,14)
else q=z<0?0:255
J.n(r.a,J.b(r.d,2),q)
J.n(r.a,J.b(r.d,3),255)}}},
kD:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
if(this.aK==null)return
z=this.b
y=J.h(z.a,4)
x=U.C(this.aK,null,0)
if(a===0){w=J.m(c,1)
v=a}else{v=a-1
x.d=J.m(x.d,z.a)
w=c}u=this.d.x.buffer
u=(u&&C.f).a0(u,0,null)
if(typeof y!=="number")return H.c(y)
t=U.S(u,!1,null,v*y+3)
u=this.ch
if(typeof u!=="number")return u.i()
if(typeof c!=="number")return H.c(c)
s=this.cx
if(u+a+c===s)w=J.m(J.m(s,u),v)
if(typeof w!=="number")return H.c(w)
r=0
for(;r<w;++r){if(typeof b!=="number")return H.c(b)
q=0
for(;q<b;++q){u=J.J(J.e(x.a,J.b(x.d,q)),255)
J.n(t.a,J.b(t.d,4*q),u)}x.d=J.b(x.d,z.a)
t.d=J.b(t.d,y)}},
kE:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.d.x.buffer
z=(z&&C.f).a0(z,0,null)
y=this.b
x=y.a
if(typeof x!=="number")return H.c(x)
w=U.S(z,!1,null,a*x*4)
v=U.C(this.bN,null,0)
u=U.C(this.bA,null,0)
t=U.C(this.bB,null,0)
if(typeof c!=="number")return H.c(c)
s=a+c
x=J.b(b,1)
if(typeof x!=="number")return x.w()
x=C.b.l(x,1)
r=J.h(y.a,4)
q=U.C(this.aS,null,0)
p=U.C(this.ba,null,0)
y.ch
if(a===0){this.dP(v,null,u,t,u,t,w,null,b)
o=c}else{this.dP(this.c7,v,q,p,u,t,U.C(w,null,J.bd(r)),w,b)
o=c+1}q.a=u.a
p.a=t.a
for(n=a;n+=2,n<s;){q.d=u.d
p.d=t.d
u.d=J.b(u.d,this.aE)
t.d=J.b(t.d,this.aE)
z=w.d
if(typeof r!=="number")return H.c(r)
w.d=J.b(z,2*r)
z=v.d
y=this.aX
if(typeof y!=="number")return H.c(y)
v.d=J.b(z,2*y)
y=this.aX
if(typeof y!=="number")return y.aa()
this.dP(U.C(v,null,-y),v,q,p,u,t,U.C(w,null,-r),w,b)}v.d=J.b(v.d,this.aX)
z=this.ch
if(typeof z!=="number")return z.i()
y=this.cx
if(typeof y!=="number")return H.c(y)
if(z+s<y){this.c7.bO(0,b,v)
this.aS.bO(0,x,u)
this.ba.bO(0,x,t);--o}else if((s&1)===0)this.dP(v,null,u,t,u,t,U.C(w,null,r),null,b)
return o},
ku:function(a,b){var z,y,x,w,v,u,t,s
z=this.b
y=z.a
x=z.b
if(a>=0)if(!J.aY(b,0)){if(typeof b!=="number")return H.c(b)
if(typeof x!=="number")return H.c(x)
z=a+b>x}else z=!0
else z=!0
if(z)return
if(a===0){this.fc=new Uint8Array(H.i(J.h(y,x)))
z=this.fb
w=new U.qV(z,y,x,0,0,0,1,!1,null,!1)
v=z.a
u=z.d
z.d=J.b(u,1)
t=J.e(v,u)
w.d=J.u(t).L(t,3)
if(typeof t!=="number")return t.w()
w.e=C.b.l(t,2)&3
w.f=C.b.l(t,4)&3
w.r=C.b.l(t,6)&3
if(w.gie()){z=w.d
if(z===0){s=J.h(w.b,w.c)
z=w.a
if(J.a7(J.m(z.c,z.d),s))w.r=1}else if(z===1){if(!w.km())w.r=1}else w.r=1}this.aG=w}z=this.aG
if(!z.x)if(!z.my(a,b,this.fc))return
z=this.fc
if(typeof y!=="number")return H.c(y)
return U.S(z,!1,null,a*y)},
ls:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.k3.b
y=this.k2
x=this.ry
if(x>>>0!==x||x>=4)return H.a(y,x)
w=y[x]
x=this.bb
y=this.aC
if(y>=x.length)return H.a(x,y)
v=x[y]
u=U.S(v.a,!1,null,0)
y=this.x2
if(0>=y.length)return H.a(y,0)
t=y[0]
u.nl(0,J.m(u.c,u.d),0)
if(v.b!==!0){s=U.S(new Int16Array(H.i(16)),!1,null,0)
y=a.b
x=t.b
r=this.eD(b,z[1],y+x,w.b,0,s)
y=r>0?1:0
t.b=y
a.b=y
if(r>1)this.mc(s,u)
else{y=J.b(J.e(s.a,J.b(s.d,0)),3)
if(typeof y!=="number")return y.w()
y=C.b.l(y,3)
for(q=0;q<256;q+=16)J.n(u.a,J.b(u.d,q),y)}p=z[0]
o=1}else{p=z[3]
o=0}n=a.a&15
m=t.a&15
for(l=0,k=0;k<4;++k){j=m&1
for(i=0,h=0;h<4;++h,i=g){r=this.eD(b,p,j+(n&1),w.a,o,u)
j=r>o?1:0
n=n>>>1|j<<7
y=!J.k(J.e(u.a,J.b(u.d,0)),0)?1:0
if(r>3)y=3
else if(r>1)y=2
g=i<<2|y
u.d=J.b(u.d,16)}n=n>>>4
m=m>>>1|j<<7
l=(l<<8|i)>>>0}f=m>>>4
for(e=n,d=0,c=0;c<4;c+=2){y=4+c
n=C.a.bm(a.a,y)
m=C.a.bm(t.a,y)
for(i=0,k=0;k<2;++k){j=m&1
for(h=0;h<2;++h,i=g){r=this.eD(b,z[2],j+(n&1),w.c,0,u)
j=r>0?1:0
n=n>>>1|j<<3
y=!J.k(J.e(u.a,J.b(u.d,0)),0)?1:0
if(r>3)y=3
else if(r>1)y=2
g=(i<<2|y)>>>0
u.d=J.b(u.d,16)}n=n>>>2
m=m>>>1|j<<5}d=(d|C.a.H(i,4*c))>>>0
e=(e|C.a.H(n<<4>>>0,c))>>>0
f=(f|C.a.H(m&240,c))>>>0}a.a=e
t.a=f
v.e=l
v.f=d
v.r=(d&43690)!==0?0:w.e
return(l|d)>>>0===0},
mc:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=H.i(16)
y=new Int32Array(z)
for(x=0;x<4;++x){w=12+x
v=J.b(J.e(a.a,J.b(a.d,x)),J.e(a.a,J.b(a.d,w)))
u=4+x
t=8+x
s=J.b(J.e(a.a,J.b(a.d,u)),J.e(a.a,J.b(a.d,t)))
r=J.m(J.e(a.a,J.b(a.d,u)),J.e(a.a,J.b(a.d,t)))
q=J.m(J.e(a.a,J.b(a.d,x)),J.e(a.a,J.b(a.d,w)))
p=J.G(v)
o=p.i(v,s)
if(x>=z)return H.a(y,x)
y[x]=o
p=p.p(v,s)
if(t>=z)return H.a(y,t)
y[t]=p
p=J.G(q)
t=p.i(q,r)
if(u>=z)return H.a(y,u)
y[u]=t
p=p.p(q,r)
if(w>=z)return H.a(y,w)
y[w]=p}for(n=0,x=0;x<4;++x){w=x*4
if(w>=z)return H.a(y,w)
m=J.b(y[w],3)
u=3+w
if(u>=z)return H.a(y,u)
t=J.G(m)
v=t.i(m,y[u])
p=1+w
if(p>=z)return H.a(y,p)
o=y[p]
w=2+w
if(w>=z)return H.a(y,w)
s=J.b(o,y[w])
r=J.m(y[p],y[w])
q=t.p(m,y[u])
u=J.G(v)
t=u.i(v,s)
if(typeof t!=="number")return t.w()
t=C.b.l(t,3)
J.n(b.a,J.b(b.d,n),t)
t=J.G(q)
w=t.i(q,r)
if(typeof w!=="number")return w.w()
w=C.b.l(w,3)
J.n(b.a,J.b(b.d,n+16),w)
u=u.p(v,s)
if(typeof u!=="number")return u.w()
u=C.b.l(u,3)
J.n(b.a,J.b(b.d,n+32),u)
t=t.p(q,r)
if(typeof t!=="number")return t.w()
t=C.b.l(t,3)
J.n(b.a,J.b(b.d,n+48),t)
n+=64}},
kV:function(a,b){var z,y,x,w,v,u,t
if(a.a7(b[3])===0)z=a.a7(b[4])===0?2:3+a.a7(b[5])
else if(a.a7(b[6])===0)z=a.a7(b[7])===0?5+a.a7(159):7+2*a.a7(165)+a.a7(145)
else{y=a.a7(b[8])
x=9+y
if(x>=11)return H.a(b,x)
w=2*y+a.a7(b[x])
if(w>=4)return H.a(C.aA,w)
v=C.aA[w]
for(u=v.length,z=0,t=0;t<u;++t)z+=z+a.a7(v[t])
z+=3+C.a.H(8,w)}return z},
eD:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r
b.length
if(e>=8)return H.a(b,e)
z=b[e].a
if(c>=3)return H.a(z,c)
y=z[c]
for(;e<16;e=x){if(a.a7(y[0])===0)return e
for(;a.a7(y[1])===0;){++e
if(e<0||e>=17)return H.a(C.L,e)
z=C.L[e]
if(z>=8)return H.a(b,z)
y=b[z].a[0]
if(e===16)return 16}x=e+1
if(x<0||x>=17)return H.a(C.L,x)
z=C.L[x]
if(z>=8)return H.a(b,z)
w=b[z].a
if(a.a7(y[2])===0){y=w[1]
v=1}else{v=this.kV(a,y)
y=w[2]}if(e<0||e>=16)return H.a(C.ao,e)
z=C.ao[e]
u=a.fT(C.a.l(a.b,1))
t=a.b
if(t<0||t>=128)return H.a(C.K,t)
s=C.K[t]
a.b=C.aC[t]
a.d-=s
t=u!==0?-v:v
r=d[e>0?1:0]
J.n(f.a,J.b(f.d,z),t*r)}return 16},
lo:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.aC
y=4*z
x=this.r2
w=this.rx
v=this.bb
if(z>=v.length)return H.a(v,z)
u=v[z]
z=this.c.a7(145)===0
u.b=z
if(!z){if(this.c.a7(156)!==0)t=this.c.a7(128)!==0?1:3
else t=this.c.a7(163)!==0?2:0
u.c[0]=t;(x&&C.h).ag(x,y,y+4,t)
C.h.ag(w,0,4,t)}else{s=u.c
for(r=0,q=0;q<4;++q,r=l){t=w[q]
for(p=0;p<4;++p){z=y+p
if(z>=x.length)return H.a(x,z)
v=x[z]
if(v>=10)return H.a(C.ab,v)
v=C.ab[v]
if(t<0||t>=10)return H.a(v,t)
o=v[t]
n=this.c.a7(o[0])
if(n>=18)return H.a(C.R,n)
m=C.R[n]
for(;m>0;){v=this.c
if(m>=9)return H.a(o,m)
v=2*m+v.a7(o[m])
if(v<0||v>=18)return H.a(C.R,v)
m=C.R[v]}t=-m
x[z]=t}l=r+4
C.h.aj(s,r,l,x,y)
w[q]=t}}if(this.c.a7(142)===0)z=0
else if(this.c.a7(114)===0)z=2
else z=this.c.a7(183)!==0?1:3
u.d=z},
static:{kw:function(a,b,c){if(c===0)if(a===0)return b===0?6:5
else return b===0?4:0
return c}}},
qS:{
"^":"r:6;",
$2:function(a,b){if(typeof b!=="number")return b.n()
return J.aF(a,b<<16>>>0)}},
dn:{
"^":"j;a,b,c,d,e",
V:function(a){var z,y
for(z=0;y=a-1,a>0;a=y)z=(z|C.a.n(this.a7(128),y))>>>0
return z},
cN:function(a){var z=this.V(a)
return this.V(1)===1?-z:z},
a7:function(a){var z,y,x
z=this.b
if(typeof a!=="number")return H.c(a)
y=this.fT(C.a.l(z*a,8))
z=this.b
if(z<=126){if(z<0)return H.a(C.K,z)
x=C.K[z]
this.b=C.aC[z]
this.d-=x}return y},
fT:function(a){var z,y,x,w,v
if(this.d<0){z=this.a
if(J.U(J.m(z.c,z.d),1)){z=this.a
y=z.a
x=z.d
z.d=J.b(x,1)
w=J.e(y,x)
x=this.c
if(typeof x!=="number")return x.n()
this.c=J.aF(w,x<<8>>>0)
this.d+=8}else{z=this.a
if(!J.U(z.d,z.c)){z=this.a
y=z.a
x=z.d
z.d=J.b(x,1)
x=J.e(y,x)
y=this.c
if(typeof y!=="number")return y.n()
this.c=J.aF(x,y<<8>>>0)
this.d+=8}else if(!this.e){z=this.c
if(typeof z!=="number")return z.n()
this.c=z<<8>>>0
this.d+=8
this.e=!0}}}v=this.d
z=this.c
if(typeof z!=="number")return z.w()
if(C.b.w(z,v)>a){y=a+1
this.b=this.b-y
this.c=z-C.a.n(y,v)
return 1}else{this.b=a
return 0}},
jU:function(a){this.b=254
this.c=0
this.d=-8},
static:{ks:function(a){var z=new U.dn(a,null,null,null,!1)
z.jU(a)
return z}}},
qK:{
"^":"j;",
fE:function(a,b,c){var z,y
z=U.C(a,null,0)
for(y=0;y<16;++y){z.d=J.b(a.d,y)
if(this.ht(z,b,c))this.dE(z,b)}},
fD:function(a,b,c){var z,y,x
z=U.C(a,null,0)
for(y=0;y<16;++y){x=a.d
if(typeof b!=="number")return H.c(b)
z.d=J.b(x,y*b)
if(this.ht(z,1,c))this.dE(z,1)}},
iT:function(a,b,c){var z,y,x
z=U.C(a,null,0)
for(y=3;y>0;--y){x=z.d
if(typeof b!=="number")return H.c(b)
z.d=J.b(x,4*b)
this.fE(z,b,c)}},
iS:function(a,b,c){var z,y
z=U.C(a,null,0)
for(y=3;y>0;--y){z.d=J.b(z.d,4)
this.fD(z,b,c)}},
nY:function(a,b,c,d,e){var z,y,x
z=U.C(a,null,0)
for(y=3;y>0;--y){x=z.d
if(typeof b!=="number")return H.c(b)
z.d=J.b(x,4*b)
this.cn(z,b,1,16,c,d,e)}},
mX:function(a,b,c,d,e){var z,y
z=U.C(a,null,0)
for(y=3;y>0;--y){z.d=J.b(z.d,4)
this.cn(z,1,b,16,c,d,e)}},
co:function(a,b,c,d,e,f,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=U.C(a,null,0)
for(;y=d-1,d>0;d=y){if(this.hu(z,b,e,f))if(this.hm(z,b,a0))this.dE(z,b)
else{if(typeof b!=="number")return H.c(b)
x=-3*b
w=J.e(z.a,J.b(z.d,x))
v=-2*b
u=J.e(z.a,J.b(z.d,v))
t=-b
s=J.e(z.a,J.b(z.d,t))
r=J.e(z.a,J.b(z.d,0))
q=J.e(z.a,J.b(z.d,b))
p=2*b
o=J.e(z.a,J.b(z.d,p))
n=$.$get$dq()
m=J.m(r,s)
if(typeof m!=="number")return H.c(m)
l=$.$get$dq()
if(typeof u!=="number")return H.c(u)
if(typeof q!=="number")return H.c(q)
k=1020+u-q
if(k>>>0!==k||k>=l.length)return H.a(l,k)
k=1020+3*m+l[k]
if(k>>>0!==k||k>=n.length)return H.a(n,k)
j=n[k]
i=C.d.O((27*j+63)/128)
h=C.d.O((18*j+63)/128)
g=C.d.O((9*j+63)/128)
k=$.$get$aL()
if(typeof w!=="number")return H.c(w)
n=255+w+g
if(n>>>0!==n||n>=k.length)return H.a(k,n)
n=k[n]
J.n(z.a,J.b(z.d,x),n)
n=$.$get$aL()
x=255+u+h
if(x>>>0!==x||x>=n.length)return H.a(n,x)
x=n[x]
J.n(z.a,J.b(z.d,v),x)
x=$.$get$aL()
if(typeof s!=="number")return H.c(s)
v=255+s+i
if(v>>>0!==v||v>=x.length)return H.a(x,v)
v=x[v]
J.n(z.a,J.b(z.d,t),v)
v=$.$get$aL()
if(typeof r!=="number")return H.c(r)
t=255+r-i
if(t>>>0!==t||t>=v.length)return H.a(v,t)
t=v[t]
J.n(z.a,J.b(z.d,0),t)
t=$.$get$aL()
v=255+q-h
if(v>>>0!==v||v>=t.length)return H.a(t,v)
v=t[v]
J.n(z.a,J.b(z.d,b),v)
v=$.$get$aL()
if(typeof o!=="number")return H.c(o)
t=255+o-g
if(t>>>0!==t||t>=v.length)return H.a(v,t)
t=v[t]
J.n(z.a,J.b(z.d,p),t)}z.d=J.b(z.d,c)}},
cn:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=U.C(a,null,0)
for(;y=d-1,d>0;d=y){if(this.hu(z,b,e,f))if(this.hm(z,b,g))this.dE(z,b)
else{if(typeof b!=="number")return H.c(b)
x=-2*b
w=J.e(z.a,J.b(z.d,x))
v=-b
u=J.e(z.a,J.b(z.d,v))
t=J.e(z.a,J.b(z.d,0))
s=J.e(z.a,J.b(z.d,b))
r=J.m(t,u)
if(typeof r!=="number")return H.c(r)
q=3*r
r=$.$get$cJ()
p=112+C.d.O((q+4)/8)
if(p<0||p>=r.length)return H.a(r,p)
o=r[p]
p=$.$get$cJ()
r=112+C.d.O((q+3)/8)
if(r<0||r>=p.length)return H.a(p,r)
n=p[r]
m=C.d.O((o+1)/2)
r=$.$get$aL()
if(typeof w!=="number")return H.c(w)
p=255+w+m
if(p>>>0!==p||p>=r.length)return H.a(r,p)
p=r[p]
J.n(z.a,J.b(z.d,x),p)
p=$.$get$aL()
if(typeof u!=="number")return H.c(u)
x=255+u+n
if(x>>>0!==x||x>=p.length)return H.a(p,x)
x=p[x]
J.n(z.a,J.b(z.d,v),x)
x=$.$get$aL()
if(typeof t!=="number")return H.c(t)
v=255+t-o
if(v>>>0!==v||v>=x.length)return H.a(x,v)
v=x[v]
J.n(z.a,J.b(z.d,0),v)
v=$.$get$aL()
if(typeof s!=="number")return H.c(s)
x=255+s-m
if(x>>>0!==x||x>=v.length)return H.a(v,x)
x=v[x]
J.n(z.a,J.b(z.d,b),x)}z.d=J.b(z.d,c)}},
dE:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
if(typeof b!=="number")return H.c(b)
z=J.e(a.a,J.b(a.d,-2*b))
y=-b
x=J.e(a.a,J.b(a.d,y))
w=J.e(a.a,J.b(a.d,0))
v=J.e(a.a,J.b(a.d,b))
u=J.m(w,x)
if(typeof u!=="number")return H.c(u)
t=$.$get$dq()
if(typeof z!=="number")return H.c(z)
if(typeof v!=="number")return H.c(v)
s=1020+z-v
if(s>>>0!==s||s>=t.length)return H.a(t,s)
r=3*u+t[s]
s=$.$get$cJ()
t=112+C.d.O((r+4)/8)
if(t<0||t>=s.length)return H.a(s,t)
q=s[t]
t=$.$get$cJ()
s=112+C.d.O((r+3)/8)
if(s<0||s>=t.length)return H.a(t,s)
p=t[s]
s=$.$get$aL()
if(typeof x!=="number")return H.c(x)
t=255+x+p
if(t>>>0!==t||t>=s.length)return H.a(s,t)
t=s[t]
J.n(a.a,J.b(a.d,y),t)
t=$.$get$aL()
if(typeof w!=="number")return H.c(w)
y=255+w-q
if(y>>>0!==y||y>=t.length)return H.a(t,y)
y=t[y]
J.n(a.a,J.b(a.d,0),y)},
hm:function(a,b,c){var z,y,x,w,v,u,t
if(typeof b!=="number")return H.c(b)
z=J.e(a.a,J.b(a.d,-2*b))
y=J.e(a.a,J.b(a.d,-b))
x=J.e(a.a,J.b(a.d,0))
w=J.e(a.a,J.b(a.d,b))
v=$.$get$dp()
if(typeof z!=="number")return H.c(z)
if(typeof y!=="number")return H.c(y)
u=255+z-y
t=v.length
if(u>>>0!==u||u>=t)return H.a(v,u)
if(v[u]<=c){if(typeof w!=="number")return H.c(w)
if(typeof x!=="number")return H.c(x)
u=255+w-x
if(u>>>0!==u||u>=t)return H.a(v,u)
u=v[u]>c
v=u}else v=!0
return v},
ht:function(a,b,c){var z,y,x,w,v,u,t
if(typeof b!=="number")return H.c(b)
z=J.e(a.a,J.b(a.d,-2*b))
y=J.e(a.a,J.b(a.d,-b))
x=J.e(a.a,J.b(a.d,0))
w=J.e(a.a,J.b(a.d,b))
v=$.$get$dp()
if(typeof y!=="number")return H.c(y)
if(typeof x!=="number")return H.c(x)
u=255+y-x
if(u>>>0!==u||u>=v.length)return H.a(v,u)
u=v[u]
v=$.$get$eo()
if(typeof z!=="number")return H.c(z)
if(typeof w!=="number")return H.c(w)
t=255+z-w
if(t>>>0!==t||t>=v.length)return H.a(v,t)
return 2*u+v[t]<=c},
hu:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
if(typeof b!=="number")return H.c(b)
z=J.e(a.a,J.b(a.d,-4*b))
y=J.e(a.a,J.b(a.d,-3*b))
x=J.e(a.a,J.b(a.d,-2*b))
w=J.e(a.a,J.b(a.d,-b))
v=J.e(a.a,J.b(a.d,0))
u=J.e(a.a,J.b(a.d,b))
t=J.e(a.a,J.b(a.d,2*b))
s=J.e(a.a,J.b(a.d,3*b))
r=$.$get$dp()
if(typeof w!=="number")return H.c(w)
if(typeof v!=="number")return H.c(v)
q=255+w-v
p=r.length
if(q>>>0!==q||q>=p)return H.a(r,q)
q=r[q]
o=$.$get$eo()
if(typeof x!=="number")return H.c(x)
n=255+x
if(typeof u!=="number")return H.c(u)
m=n-u
if(m>>>0!==m||m>=o.length)return H.a(o,m)
if(2*q+o[m]>c)return!1
if(typeof z!=="number")return H.c(z)
if(typeof y!=="number")return H.c(y)
q=255+z-y
if(q>>>0!==q||q>=p)return H.a(r,q)
if(r[q]<=d){q=255+y-x
if(q>>>0!==q||q>=p)return H.a(r,q)
if(r[q]<=d){q=n-w
if(q>>>0!==q||q>=p)return H.a(r,q)
if(r[q]<=d){if(typeof s!=="number")return H.c(s)
if(typeof t!=="number")return H.c(t)
q=255+s-t
if(q>>>0!==q||q>=p)return H.a(r,q)
if(r[q]<=d){q=255+t-u
if(q>>>0!==q||q>=p)return H.a(r,q)
if(r[q]<=d){q=255+u-v
if(q>>>0!==q||q>=p)return H.a(r,q)
q=r[q]<=d
r=q}else r=!1}else r=!1}else r=!1}else r=!1}else r=!1
return r},
bE:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=H.i(16)
y=new Int32Array(z)
for(x=0,w=0,v=0;v<4;++v){u=x+8
t=J.b(J.e(a.a,J.b(a.d,x)),J.e(a.a,J.b(a.d,u)))
s=J.m(J.e(a.a,J.b(a.d,x)),J.e(a.a,J.b(a.d,u)))
u=x+4
r=x+12
q=J.Y(J.I(J.h(J.e(a.a,J.b(a.d,u)),35468),65536))-J.Y(J.I(J.h(J.e(a.a,J.b(a.d,r)),85627),65536))
p=J.Y(J.I(J.h(J.e(a.a,J.b(a.d,u)),85627),65536))+J.Y(J.I(J.h(J.e(a.a,J.b(a.d,r)),35468),65536))
o=w+1
r=J.G(t)
u=r.i(t,p)
if(w>=z)return H.a(y,w)
y[w]=u
w=o+1
u=J.G(s)
n=u.i(s,q)
if(o>=z)return H.a(y,o)
y[o]=n
o=w+1
u=u.p(s,q)
if(w>=z)return H.a(y,w)
y[w]=u
w=o+1
r=r.p(t,p)
if(o>=z)return H.a(y,o)
y[o]=r;++x}for(m=0,w=0,v=0;v<4;++v){if(w>=z)return H.a(y,w)
l=J.b(y[w],4)
u=w+8
if(u>=z)return H.a(y,u)
r=J.G(l)
t=r.i(l,y[u])
s=r.p(l,y[u])
u=w+4
if(u>=z)return H.a(y,u)
r=J.Y(J.I(J.h(y[u],35468),65536))
n=w+12
if(n>=z)return H.a(y,n)
q=r-J.Y(J.I(J.h(y[n],85627),65536))
p=J.Y(J.I(J.h(y[u],85627),65536))+J.Y(J.I(J.h(y[n],35468),65536))
n=J.G(t)
U.bv(b,m,0,0,n.i(t,p))
u=J.G(s)
U.bv(b,m,1,0,u.i(s,q))
U.bv(b,m,2,0,u.p(s,q))
U.bv(b,m,3,0,n.p(t,p));++w
m+=32}},
dl:function(a,b){var z,y,x
z=J.b(J.e(a.a,J.b(a.d,0)),4)
for(y=0;y<4;++y)for(x=0;x<4;++x)U.bv(b,0,x,y,z)},
iC:function(a,b){if(!J.k(J.e(a.a,J.b(a.d,0)),0))this.dl(a,b)
if(!J.k(J.e(a.a,J.b(a.d,16)),0))this.dl(U.C(a,null,16),U.C(b,null,4))
if(!J.k(J.e(a.a,J.b(a.d,32)),0))this.dl(U.C(a,null,32),U.C(b,null,128))
if(!J.k(J.e(a.a,J.b(a.d,48)),0))this.dl(U.C(a,null,48),U.C(b,null,132))},
static:{X:function(a,b,c){if(typeof b!=="number")return H.c(b)
return J.Y(J.I(J.b(J.b(J.b(a,2*b),c),2),4))},zj:[function(a){var z,y
z=[U.X(J.e(a.a,J.b(a.d,-33)),J.e(a.a,J.b(a.d,-32)),J.e(a.a,J.b(a.d,-31))),U.X(J.e(a.a,J.b(a.d,-32)),J.e(a.a,J.b(a.d,-31)),J.e(a.a,J.b(a.d,-30))),U.X(J.e(a.a,J.b(a.d,-31)),J.e(a.a,J.b(a.d,-30)),J.e(a.a,J.b(a.d,-29))),U.X(J.e(a.a,J.b(a.d,-30)),J.e(a.a,J.b(a.d,-29)),J.e(a.a,J.b(a.d,-28)))]
for(y=0;y<4;++y)a.bO(y*32,4,z)},"$1","uj",2,0,2],za:[function(a){var z,y,x,w,v,u,t,s
z=J.e(a.a,J.b(a.d,-33))
y=J.e(a.a,J.b(a.d,-1))
x=J.e(a.a,J.b(a.d,31))
w=J.e(a.a,J.b(a.d,63))
v=J.e(a.a,J.b(a.d,95))
u=U.C(a,null,0)
t=u.dk()
s=U.X(z,y,x)
if(0>=t.length)return H.a(t,0)
t[0]=16843009*s
u.d=J.b(u.d,32)
s=u.dk()
t=U.X(y,x,w)
if(0>=s.length)return H.a(s,0)
s[0]=16843009*t
u.d=J.b(u.d,32)
t=u.dk()
s=U.X(x,w,v)
if(0>=t.length)return H.a(t,0)
t[0]=16843009*s
u.d=J.b(u.d,32)
s=u.dk()
t=U.X(w,v,v)
if(0>=s.length)return H.a(s,0)
s[0]=16843009*t},"$1","ua",2,0,2],z3:[function(a){var z,y,x
for(z=4,y=0;y<4;++y){x=J.b(J.e(a.a,J.b(a.d,y-32)),J.e(a.a,J.b(a.d,-1+y*32)))
if(typeof x!=="number")return H.c(x)
z+=x}z=C.b.l(z,3)
for(y=0;y<4;++y){x=y*32
J.be(a.a,J.b(a.d,x),J.b(J.b(a.d,x),4),z)}},"$1","u3",2,0,2],hL:function(a,b){var z,y,x,w,v,u,t
z=J.e(a.a,J.b(a.d,-33))
if(typeof z!=="number")return H.c(z)
y=255-z
for(x=0,w=0;w<b;++w){z=J.e(a.a,J.b(a.d,x-1))
if(typeof z!=="number")return H.c(z)
v=y+z
for(u=0;u<b;++u){z=$.$get$aL()
t=J.e(a.a,J.b(a.d,-32+u))
if(typeof t!=="number")return H.c(t)
t=v+t
if(t>>>0!==t||t>=z.length)return H.a(z,t)
t=z[t]
J.n(a.a,J.b(a.d,x+u),t)}x+=32}},zg:[function(a){U.hL(a,4)},"$1","ug",2,0,2],zh:[function(a){U.hL(a,8)},"$1","uh",2,0,2],zf:[function(a){U.hL(a,16)},"$1","uf",2,0,2],ze:[function(a){var z,y,x,w,v,u,t,s,r,q
z=J.e(a.a,J.b(a.d,-1))
y=J.e(a.a,J.b(a.d,31))
x=J.e(a.a,J.b(a.d,63))
w=J.e(a.a,J.b(a.d,95))
v=J.e(a.a,J.b(a.d,-33))
u=J.e(a.a,J.b(a.d,-32))
t=J.e(a.a,J.b(a.d,-31))
s=J.e(a.a,J.b(a.d,-30))
r=J.e(a.a,J.b(a.d,-29))
q=U.X(y,x,w)
J.n(a.a,J.b(a.d,96),q)
q=U.X(z,y,x)
J.n(a.a,J.b(a.d,97),q)
J.n(a.a,J.b(a.d,64),q)
q=U.X(v,z,y)
J.n(a.a,J.b(a.d,98),q)
J.n(a.a,J.b(a.d,65),q)
J.n(a.a,J.b(a.d,32),q)
q=U.X(u,v,z)
J.n(a.a,J.b(a.d,99),q)
J.n(a.a,J.b(a.d,66),q)
J.n(a.a,J.b(a.d,33),q)
J.n(a.a,J.b(a.d,0),q)
q=U.X(t,u,v)
J.n(a.a,J.b(a.d,67),q)
J.n(a.a,J.b(a.d,34),q)
J.n(a.a,J.b(a.d,1),q)
q=U.X(s,t,u)
J.n(a.a,J.b(a.d,35),q)
J.n(a.a,J.b(a.d,2),q)
q=U.X(r,s,t)
J.n(a.a,J.b(a.d,3),q)},"$1","ue",2,0,2],zd:[function(a){var z,y,x,w,v,u,t,s,r
z=J.e(a.a,J.b(a.d,-32))
y=J.e(a.a,J.b(a.d,-31))
x=J.e(a.a,J.b(a.d,-30))
w=J.e(a.a,J.b(a.d,-29))
v=J.e(a.a,J.b(a.d,-28))
u=J.e(a.a,J.b(a.d,-27))
t=J.e(a.a,J.b(a.d,-26))
s=J.e(a.a,J.b(a.d,-25))
r=U.X(z,y,x)
J.n(a.a,J.b(a.d,0),r)
r=U.X(y,x,w)
J.n(a.a,J.b(a.d,32),r)
J.n(a.a,J.b(a.d,1),r)
r=U.X(x,w,v)
J.n(a.a,J.b(a.d,64),r)
J.n(a.a,J.b(a.d,33),r)
J.n(a.a,J.b(a.d,2),r)
r=U.X(w,v,u)
J.n(a.a,J.b(a.d,96),r)
J.n(a.a,J.b(a.d,65),r)
J.n(a.a,J.b(a.d,34),r)
J.n(a.a,J.b(a.d,3),r)
r=U.X(v,u,t)
J.n(a.a,J.b(a.d,97),r)
J.n(a.a,J.b(a.d,66),r)
J.n(a.a,J.b(a.d,35),r)
r=U.X(u,t,s)
J.n(a.a,J.b(a.d,98),r)
J.n(a.a,J.b(a.d,67),r)
r=U.X(t,s,s)
J.n(a.a,J.b(a.d,99),r)},"$1","ud",2,0,2],zm:[function(a){var z,y,x,w,v,u,t,s,r
z=J.e(a.a,J.b(a.d,-1))
y=J.e(a.a,J.b(a.d,31))
x=J.e(a.a,J.b(a.d,63))
w=J.e(a.a,J.b(a.d,-33))
v=J.e(a.a,J.b(a.d,-32))
u=J.e(a.a,J.b(a.d,-31))
t=J.e(a.a,J.b(a.d,-30))
s=J.e(a.a,J.b(a.d,-29))
r=J.Y(J.I(J.b(J.b(w,v),1),2))
J.n(a.a,J.b(a.d,65),r)
J.n(a.a,J.b(a.d,0),r)
r=J.Y(J.I(J.b(J.b(v,u),1),2))
J.n(a.a,J.b(a.d,66),r)
J.n(a.a,J.b(a.d,1),r)
r=J.Y(J.I(J.b(J.b(u,t),1),2))
J.n(a.a,J.b(a.d,67),r)
J.n(a.a,J.b(a.d,2),r)
r=J.Y(J.I(J.b(J.b(t,s),1),2))
J.n(a.a,J.b(a.d,3),r)
r=U.X(x,y,z)
J.n(a.a,J.b(a.d,96),r)
r=U.X(y,z,w)
J.n(a.a,J.b(a.d,64),r)
r=U.X(z,w,v)
J.n(a.a,J.b(a.d,97),r)
J.n(a.a,J.b(a.d,32),r)
r=U.X(w,v,u)
J.n(a.a,J.b(a.d,98),r)
J.n(a.a,J.b(a.d,33),r)
r=U.X(v,u,t)
J.n(a.a,J.b(a.d,99),r)
J.n(a.a,J.b(a.d,34),r)
r=U.X(u,t,s)
J.n(a.a,J.b(a.d,35),r)},"$1","um",2,0,2],zl:[function(a){var z,y,x,w,v,u,t,s,r
z=J.e(a.a,J.b(a.d,-32))
y=J.e(a.a,J.b(a.d,-31))
x=J.e(a.a,J.b(a.d,-30))
w=J.e(a.a,J.b(a.d,-29))
v=J.e(a.a,J.b(a.d,-28))
u=J.e(a.a,J.b(a.d,-27))
t=J.e(a.a,J.b(a.d,-26))
s=J.e(a.a,J.b(a.d,-25))
r=J.Y(J.I(J.b(J.b(z,y),1),2))
J.n(a.a,J.b(a.d,0),r)
r=J.Y(J.I(J.b(J.b(y,x),1),2))
J.n(a.a,J.b(a.d,64),r)
J.n(a.a,J.b(a.d,1),r)
r=J.Y(J.I(J.b(J.b(x,w),1),2))
J.n(a.a,J.b(a.d,65),r)
J.n(a.a,J.b(a.d,2),r)
r=J.Y(J.I(J.b(J.b(w,v),1),2))
J.n(a.a,J.b(a.d,66),r)
J.n(a.a,J.b(a.d,3),r)
r=U.X(z,y,x)
J.n(a.a,J.b(a.d,32),r)
r=U.X(y,x,w)
J.n(a.a,J.b(a.d,96),r)
J.n(a.a,J.b(a.d,33),r)
r=U.X(x,w,v)
J.n(a.a,J.b(a.d,97),r)
J.n(a.a,J.b(a.d,34),r)
r=U.X(w,v,u)
J.n(a.a,J.b(a.d,98),r)
J.n(a.a,J.b(a.d,35),r)
r=U.X(v,u,t)
J.n(a.a,J.b(a.d,67),r)
r=U.X(u,t,s)
J.n(a.a,J.b(a.d,99),r)},"$1","ul",2,0,2],zc:[function(a){var z,y,x,w,v
z=J.e(a.a,J.b(a.d,-1))
y=J.e(a.a,J.b(a.d,31))
x=J.e(a.a,J.b(a.d,63))
w=J.e(a.a,J.b(a.d,95))
v=J.Y(J.I(J.b(J.b(z,y),1),2))
J.n(a.a,J.b(a.d,0),v)
v=J.Y(J.I(J.b(J.b(y,x),1),2))
J.n(a.a,J.b(a.d,32),v)
J.n(a.a,J.b(a.d,2),v)
v=J.Y(J.I(J.b(J.b(x,w),1),2))
J.n(a.a,J.b(a.d,64),v)
J.n(a.a,J.b(a.d,34),v)
v=U.X(z,y,x)
J.n(a.a,J.b(a.d,1),v)
v=U.X(y,x,w)
J.n(a.a,J.b(a.d,33),v)
J.n(a.a,J.b(a.d,3),v)
v=U.X(x,w,w)
J.n(a.a,J.b(a.d,65),v)
J.n(a.a,J.b(a.d,35),v)
J.n(a.a,J.b(a.d,99),w)
J.n(a.a,J.b(a.d,98),w)
J.n(a.a,J.b(a.d,97),w)
J.n(a.a,J.b(a.d,96),w)
J.n(a.a,J.b(a.d,66),w)
J.n(a.a,J.b(a.d,67),w)},"$1","uc",2,0,2],z8:[function(a){var z,y,x,w,v,u,t,s,r
z=J.e(a.a,J.b(a.d,-1))
y=J.e(a.a,J.b(a.d,31))
x=J.e(a.a,J.b(a.d,63))
w=J.e(a.a,J.b(a.d,95))
v=J.e(a.a,J.b(a.d,-33))
u=J.e(a.a,J.b(a.d,-32))
t=J.e(a.a,J.b(a.d,-31))
s=J.e(a.a,J.b(a.d,-30))
r=J.Y(J.I(J.b(J.b(z,v),1),2))
J.n(a.a,J.b(a.d,34),r)
J.n(a.a,J.b(a.d,0),r)
r=J.Y(J.I(J.b(J.b(y,z),1),2))
J.n(a.a,J.b(a.d,66),r)
J.n(a.a,J.b(a.d,32),r)
r=J.Y(J.I(J.b(J.b(x,y),1),2))
J.n(a.a,J.b(a.d,98),r)
J.n(a.a,J.b(a.d,64),r)
r=J.Y(J.I(J.b(J.b(w,x),1),2))
J.n(a.a,J.b(a.d,96),r)
r=U.X(u,t,s)
J.n(a.a,J.b(a.d,3),r)
r=U.X(v,u,t)
J.n(a.a,J.b(a.d,2),r)
r=U.X(z,v,u)
J.n(a.a,J.b(a.d,35),r)
J.n(a.a,J.b(a.d,1),r)
r=U.X(y,z,v)
J.n(a.a,J.b(a.d,67),r)
J.n(a.a,J.b(a.d,33),r)
r=U.X(x,y,z)
J.n(a.a,J.b(a.d,99),r)
J.n(a.a,J.b(a.d,65),r)
r=U.X(w,x,y)
J.n(a.a,J.b(a.d,97),r)},"$1","u8",2,0,2],zi:[function(a){var z
for(z=0;z<16;++z)a.aY(z*32,16,a,-32)},"$1","ui",2,0,2],z9:[function(a){var z,y,x
for(z=0,y=16;y>0;--y){x=J.e(a.a,J.b(a.d,z-1))
J.be(a.a,J.b(a.d,z),J.b(J.b(a.d,z),16),x)
z+=32}},"$1","u9",2,0,2],el:function(a,b){var z,y
for(z=0;z<16;++z){y=z*32
J.be(b.a,J.b(b.d,y),J.b(J.b(b.d,y),16),a)}},z_:[function(a){var z,y,x
for(z=16,y=0;y<16;++y){x=J.b(J.e(a.a,J.b(a.d,-1+y*32)),J.e(a.a,J.b(a.d,y-32)))
if(typeof x!=="number")return H.c(x)
z+=x}U.el(C.b.l(z,5),a)},"$1","u_",2,0,2],z1:[function(a){var z,y,x
for(z=8,y=0;y<16;++y){x=J.e(a.a,J.b(a.d,-1+y*32))
if(typeof x!=="number")return H.c(x)
z+=x}U.el(C.b.l(z,4),a)},"$1","u1",2,0,2],z0:[function(a){var z,y,x
for(z=8,y=0;y<16;++y){x=J.e(a.a,J.b(a.d,y-32))
if(typeof x!=="number")return H.c(x)
z+=x}U.el(C.b.l(z,4),a)},"$1","u0",2,0,2],z2:[function(a){U.el(128,a)},"$1","u2",2,0,2],zk:[function(a){var z
for(z=0;z<8;++z)a.aY(z*32,8,a,-32)},"$1","uk",2,0,2],zb:[function(a){var z,y,x
for(z=0,y=0;y<8;++y){x=J.e(a.a,J.b(a.d,z-1))
J.be(a.a,J.b(a.d,z),J.b(J.b(a.d,z),8),x)
z+=32}},"$1","ub",2,0,2],em:function(a,b){var z,y
for(z=0;z<8;++z){y=z*32
J.be(b.a,J.b(b.d,y),J.b(J.b(b.d,y),8),a)}},z4:[function(a){var z,y,x
for(z=8,y=0;y<8;++y){x=J.b(J.e(a.a,J.b(a.d,y-32)),J.e(a.a,J.b(a.d,-1+y*32)))
if(typeof x!=="number")return H.c(x)
z+=x}U.em(C.b.l(z,4),a)},"$1","u4",2,0,2],z5:[function(a){var z,y,x
for(z=4,y=0;y<8;++y){x=J.e(a.a,J.b(a.d,y-32))
if(typeof x!=="number")return H.c(x)
z+=x}U.em(C.b.l(z,3),a)},"$1","u5",2,0,2],z6:[function(a){var z,y,x
for(z=4,y=0;y<8;++y){x=J.e(a.a,J.b(a.d,-1+y*32))
if(typeof x!=="number")return H.c(x)
z+=x}U.em(C.b.l(z,3),a)},"$1","u6",2,0,2],z7:[function(a){U.em(128,a)},"$1","u7",2,0,2],bv:function(a,b,c,d,e){var z,y
z=b+c+d*32
y=J.e(a.a,J.b(a.d,z))
if(typeof e!=="number")return e.w()
y=J.b(y,C.b.l(e,3))
if(J.J(y,-256)===0);else{if(typeof y!=="number")return y.I()
y=y<0?0:255}J.n(a.a,J.b(a.d,z),y)},en:function(a,b,c,d,e){var z=J.G(c)
U.bv(a,0,0,b,z.i(c,d))
U.bv(a,0,1,b,z.i(c,e))
U.bv(a,0,2,b,z.p(c,e))
U.bv(a,0,3,b,z.p(c,d))},qL:function(){var z,y,x,w,v
if(!$.kt){for(z=-255;z<=255;++z){y=$.$get$dp()
x=255+z
w=z<0?-z:z
v=y.length
if(x>=v)return H.a(y,x)
y[x]=w
w=$.$get$eo()
if(x>=v)return H.a(y,x)
y=C.a.l(y[x],1)
if(x>=w.length)return H.a(w,x)
w[x]=y}for(z=-1020;z<=1020;++z){y=$.$get$dq()
x=1020+z
if(z<-128)w=-128
else w=z>127?127:z
if(x>=y.length)return H.a(y,x)
y[x]=w}for(z=-112;z<=112;++z){y=$.$get$cJ()
x=112+z
if(z<-16)w=-16
else w=z>15?15:z
if(x>=y.length)return H.a(y,x)
y[x]=w}for(z=-255;z<=510;++z){y=$.$get$aL()
x=255+z
if(z<0)w=0
else w=z>255?255:z
if(x>=y.length)return H.a(y,x)
y[x]=w}$.kt=!0}}}},
hM:{
"^":"j;a,b,c,d"},
hP:{
"^":"j;D:a>,C:b>,c,d,e,f"},
hQ:{
"^":"j;a,b,c,d,e"},
kr:{
"^":"j;a",
jT:function(){var z,y
for(z=this.a,y=0;y<3;++y)z[y]=new Uint8Array(11)},
static:{qJ:function(){var z=new U.kr(H.p(Array(3),[P.bj]))
z.jT()
return z}}},
qQ:{
"^":"j;a,b",
jV:function(){var z,y,x,w
for(z=this.b,y=0;y<4;++y){x=Array(8)
x.$builtinTypeInfo=[U.kr]
z[y]=x
for(w=0;w<8;++w)z[y][w]=U.qJ()}C.h.ag(this.a,0,3,255)},
static:{qR:function(){var z=new U.qQ(new Uint8Array(H.i(3)),Array(4))
z.jV()
return z}}},
hK:{
"^":"j;a,b,c,d,e,f"},
ek:{
"^":"j;a,b,c,d"},
hO:{
"^":"j;a,b"},
es:{
"^":"j;a,b,c,d,e"},
ku:{
"^":"j;a,b,c,d,e,f,r"},
kv:{
"^":"j;K:a*,b,aD:c<"},
qM:{
"^":"j;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id",
d4:function(){if(this.b.J(8)!==47)return!1
var z=this.c
z.f=2
z.a=this.b.J(14)+1
z.b=this.b.J(14)+1
z.d=this.b.J(1)!==0
if(this.b.J(3)!==0)return!1
return!0},
by:function(){var z,y,x
this.e=0
if(!this.d4())return
z=this.c
this.cU(z.a,z.b,!0)
this.fP()
this.d=U.aZ(z.a,z.b,4)
y=this.dy
x=z.a
z=z.b
if(!this.es(y,x,z,z,this.gly()))return
return this.d},
fP:function(){var z,y,x,w,v,u
z=this.c
y=J.h(z.a,z.b)
x=z.a
w=J.h(x,16)
z=J.G(y)
v=new Uint32Array(H.i(J.b(z.i(y,x),w)))
this.dy=v
u=v.buffer
this.fr=(u&&C.f).a0(u,0,null)
this.fx=z.i(y,x)
return!0},
lZ:function(a){var z,y,x,w,v,u,t,s
z=this.b.J(2)
y=this.dx
x=C.a.H(1,z)
if((y&x)>>>0!==0)return!1
this.dx=(y|x)>>>0
w=new U.qP(0,0,0,null,0)
this.db.push(w)
w.a=z
w.b=a[0]
w.c=a[1]
switch(z){case 0:case 1:y=this.b.J(3)+2
w.e=y
x=J.m(J.b(w.b,C.a.H(1,y)),1)
if(typeof x!=="number")return x.w()
y=C.b.l(x,y)
x=w.c
v=w.e
x=J.m(J.b(x,C.a.H(1,v)),1)
if(typeof x!=="number")return x.w()
w.d=this.cU(y,C.b.l(x,v),!1)
u=!0
break
case 3:t=this.b.J(8)+1
if(t>16)s=0
else if(t>4)s=1
else{y=t>2?2:3
s=y}y=J.m(J.b(w.b,C.a.H(1,s)),1)
if(typeof y!=="number")return y.w()
a[0]=C.b.l(y,s)
w.e=s
w.d=this.cU(t,1,!1)
u=this.kG(t,w)
break
case 2:u=!0
break
default:throw H.f(new U.x("Invalid WebP tranform type: "+z))}return u},
cU:function(a,b,c){var z,y,x,w,v,u,t,s,r
if(c){for(z=b,y=a;this.b.J(1)!==0;){x=[y,z]
if(!this.lZ(x))throw H.f(new U.x("Invalid Transform"))
y=x[0]
z=x[1]}c=!0}else{z=b
y=a}if(this.b.J(1)!==0){w=this.b.J(4)
if(!(w>=1&&w<=11))throw H.f(new U.x("Invalid Color Cache"))}else w=0
if(!this.lN(y,z,w,c))throw H.f(new U.x("Invalid Huffman Codes"))
if(w>0){v=C.a.H(1,w)
this.r=v
this.x=new U.qO(new Uint32Array(H.i(v)),32-w)}else this.r=0
v=this.c
v.a=y
v.b=z
u=this.z
v=C.a.H(1,u)
t=J.G(y)
s=J.m(t.i(y,v),1)
if(typeof s!=="number")return s.w()
this.Q=C.b.l(s,u)
this.y=u===0?4294967295:v-1
if(c){this.e=0
return}r=new Uint32Array(H.i(t.q(y,z)))
if(!this.es(r,y,z,z,null))throw H.f(new U.x("Failed to decode image data."))
this.e=0
return r},
es:function(a,b,c,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.e
if(typeof b!=="number")return H.c(b)
y=C.a.ak(z,b)
x=C.a.R(z,b)
w=this.cp(x,y)
v=this.e
if(typeof c!=="number")return H.c(c)
u=b*c
if(typeof a0!=="number")return H.c(a0)
t=b*a0
z=this.r
s=280+z
r=z>0?this.x:null
q=this.y
z=a1!=null
p=v
while(!0){o=this.b
n=o.b
if(!(!(J.U(n.d,n.c)&&o.a>=64)&&v<t))break
if((x&q)>>>0===0)w=this.cp(x,y)
o=this.b
if(o.a>=32)o.c3()
o=w.a
m=o[0].bP(this.b)
if(m<256){l=o[1].bP(this.b)
n=this.b
if(n.a>=32)n.c3()
k=o[2].bP(this.b)
j=o[3].bP(this.b)
o=a.length
if(v<0||v>=o)return H.a(a,v)
a[v]=(j<<24|l<<16|m<<8|k)>>>0;++v;++x
if(x>=b){++y
if(C.b.R(y,16)===0&&z)a1.$1(y)
if(r!=null)for(;p<v;){if(p<0)return H.a(a,p)
r.dX(0,a[p]);++p}x=0}}else if(m<280){i=this.dH(m-256)
h=o[4].bP(this.b)
o=this.b
if(o.a>=32)o.c3()
g=this.hx(b,this.dH(h))
if(v<g||u-v<i)return!1
else{for(f=0;f<i;++f){o=v+f
n=v+(f-g)
e=a.length
if(n>>>0!==n||n>=e)return H.a(a,n)
n=a[n]
if(o<0||o>=e)return H.a(a,o)
a[o]=n}v+=i}x+=i
for(;x>=b;){x-=b;++y
if(C.b.R(y,16)===0&&z)a1.$1(y)}if(v<t){if((x&q)>>>0!==0)w=this.cp(x,y)
if(r!=null)for(;p<v;){if(p<0||p>=a.length)return H.a(a,p)
r.dX(0,a[p]);++p}}}else if(m<s){d=m-280
for(;p<v;){if(p<0||p>=a.length)return H.a(a,p)
r.dX(0,a[p]);++p}o=r.a
if(d>=o.length)return H.a(o,d)
o=o[d]
n=a.length
if(v<0||v>=n)return H.a(a,v)
a[v]=o;++v;++x
if(x>=b){++y
if(C.b.R(y,16)===0&&z)a1.$1(y)
for(;p<v;){if(p<0)return H.a(a,p)
r.dX(0,a[p]);++p}x=0}}else return!1}if(z)a1.$1(y)
z=this.b
o=z.b
if(J.U(o.d,o.c)&&z.a>=64&&v<u)return!1
this.e=v
return!0},
l9:function(){var z,y,x,w,v
if(this.r>0)return!1
for(z=this.cx,y=this.cy,x=y.length,w=0;w<z;++w){if(w>=x)return H.a(y,w)
v=y[w].a
if(v[1].f>1)return!1
if(v[2].f>1)return!1
if(v[3].f>1)return!1}return!0},
od:[function(a){var z,y,x,w,v,u,t,s,r,q
z=this.f
y=a-z
if(y<=0)return
x=this.c
this.fQ(y,J.h(x.a,z))
w=x.a
x=J.G(w)
v=x.q(w,y)
u=x.q(w,this.f)
t=U.S(this.dy,!1,null,this.fx)
if(typeof v!=="number")return H.c(v)
z=J.G(u)
s=0
for(;s<v;++s){x=this.fy
r=z.i(u,s)
q=J.e(t.a,J.b(t.d,s))
if(typeof q!=="number")return q.w()
q=C.b.l(q,8)
if(r>>>0!==r||r>=x.length)return H.a(x,r)
x[r]=q&255}this.f=a},"$1","gkH",2,0,19],
kl:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.e
if(typeof a!=="number")return H.c(a)
y=C.a.ak(z,a)
x=C.a.R(z,a)
w=this.cp(x,y)
v=this.e
if(typeof b!=="number")return H.c(b)
u=a*b
t=a*c
s=this.y
while(!0){z=this.b
r=z.b
if(!(!(J.U(r.d,r.c)&&z.a>=64)&&v<t))break
if((x&s)>>>0===0)w=this.cp(x,y)
z=this.b
if(z.a>=32)z.c3()
z=w.a
q=z[0].bP(this.b)
if(q<256){z=this.fr
if(v<0||v>=z.length)return H.a(z,v)
z[v]=q;++v;++x
if(x>=a){++y
if(C.b.R(y,16)===0)this.ez(y)
x=0}}else if(q<280){p=this.dH(q-256)
o=z[4].bP(this.b)
z=this.b
if(z.a>=32)z.c3()
n=this.hx(a,this.dH(o))
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
if(C.b.R(y,16)===0)this.ez(y)}if(v<t&&(x&s)>>>0!==0)w=this.cp(x,y)}else return!1}this.ez(y)
this.e=v
return!0},
ez:function(a){var z,y,x,w,v,u,t,s,r
z=this.f
y=a-z
x=this.fr
z=J.h(this.c.a,z)
w=x.length
if(y>0){v=this.f
u=this.fy
t=J.h(this.go,v)
s=u.length
r=this.db
if(0>=r.length)return H.a(r,0)
r[0].mr(v,v+y,new U.a3(x,z,w,z,!1),new U.a3(u,t,s,t,!1))}this.f=a},
oi:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.c
y=J.h(z.a,this.f)
x=a-this.f
if(x<=0)return
this.fQ(x,y)
for(w=this.fx,v=this.f,u=0;u<x;++u,++v){t=v>=0
s=0
while(!0){r=z.a
if(typeof r!=="number")return H.c(r)
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
if(typeof l!=="number")return H.c(l)
if(s<l)if(t){l=r.b
if(typeof l!=="number")return H.c(l)
l=v<l}else l=!1
else l=!1
if(l){l=r.x
r=r.a
if(typeof r!=="number")return H.c(r)
r=v*r+s
if(r>>>0!==r||r>=l.length)return H.a(l,r)
l[r]=(p<<24|o<<16|n<<8|m)>>>0}++s;++w}}this.f=a},"$1","gly",2,0,19],
fQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.db
y=z.length
x=J.h(this.c.a,a)
w=this.f
v=w+a
u=this.fx
t=this.dy
s=J.G(u);(t&&C.q).aj(t,u,s.i(u,x),this.dy,b)
for(t=v-w,r=t-1,q=b;p=y-1,y>0;q=u,y=p){if(p<0||p>=z.length)return H.a(z,p)
o=z[p]
n=this.dy
m=o.b
switch(o.a){case 2:if(typeof m!=="number")return H.c(m)
o.mh(n,u,s.i(u,t*m))
break
case 0:o.nq(w,v,n,u)
if(v!==o.c){l=s.p(u,m)
k=J.b(l,m)
if(typeof m!=="number")return H.c(m);(n&&C.q).aj(n,l,k,n,s.i(u,r*m))}break
case 1:o.ms(w,v,n,u)
break
case 3:if(J.k(q,u)&&o.e>0){if(typeof m!=="number")return H.c(m)
j=o.b
i=o.e
j=J.m(J.b(j,C.a.H(1,i)),1)
if(typeof j!=="number")return j.w()
h=t*C.b.l(j,i)
g=J.m(s.i(u,t*m),h);(n&&C.q).aj(n,g,J.b(g,h),n,u)
o.i4(w,v,n,g,n,u)}else o.i4(w,v,n,q,n,u)
break}}},
lN:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o
if(d&&this.b.J(1)!==0){z=this.b.J(3)+2
y=C.a.H(1,z)
x=J.m(J.b(a,y),1)
if(typeof x!=="number")return x.w()
x=C.b.l(x,z)
y=J.m(J.b(b,y),1)
if(typeof y!=="number")return y.w()
y=C.b.l(y,z)
w=x*y
v=this.cU(x,y,!1)
this.z=z
for(u=1,t=0;t<w;++t){if(t>=v.length)return H.a(v,t)
s=v[t]>>>8&65535
v[t]=s
if(s>=u)u=s+1}}else{v=null
u=1}r=H.p(Array(u),[U.kE])
for(y=r.length,x=c>0,t=0;t<u;++t){q=U.kF()
if(t>=y)return H.a(r,t)
r[t]=q
for(p=0;p<5;++p){o=C.ia[p]
if(p===0&&x)o+=C.a.H(1,c)
if(!this.lL(o,r[t].a[p]))return!1}}this.ch=v
this.cx=u
this.cy=r
return!0},
lL:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
if(this.b.J(1)!==0){z=[0,0]
y=[0,0]
x=[0,0]
w=this.b.J(1)+1
v=this.b.J(1)
u=this.b
z[0]=u.J(v===0?1:8)
y[0]=0
u=w-1
x[0]=u
if(w===2){z[1]=this.b.J(8)
y[1]=1
x[1]=u}t=b.ml(x,y,z,a,w)}else{s=new Int32Array(19)
r=this.b.J(4)+4
if(r>19)return!1
x=new Int32Array(a)
for(q=0;q<r;++q){u=C.ht[q]
p=this.b.J(3)
if(u>=19)return H.a(s,u)
s[u]=p}t=this.lM(s,a,x)
if(t)t=b.i_(x,a)}return t},
lM:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new U.eB(new Uint8Array(H.i(128)),new Int16Array(H.i(128)),new Int16Array(H.i(128)),null,0,0)
z.cX(0)
if(!z.i_(a,19))return!1
if(this.b.J(1)!==0){y=this.b.J(3)
x=2+this.b.J(2+2*y)
if(x>b)return!1}else x=b
for(y=c.length,w=0,v=8;w<b;x=u){u=x-1
if(x===0)break
t=this.b
if(t.a>=32)t.c3()
s=z.bP(this.b)
if(s<16){r=w+1
if(w<0||w>=y)return H.a(c,w)
c[w]=s
if(s!==0)v=s
w=r}else{q=s-16
if(q>=3)return H.a(C.a7,q)
p=C.a7[q]
o=C.bk[q]
n=this.b.J(p)+o
if(w+n>b)return!1
else{m=s===16?v:0
for(;l=n-1,n>0;n=l,w=r){r=w+1
if(w<0||w>=y)return H.a(c,w)
c[w]=m}}}}return!0},
dH:function(a){var z
if(a<4)return a+1
z=C.a.l(a-2,1)
return C.a.H(2+(a&1),z)+this.b.J(z)+1},
hx:function(a,b){var z,y,x
if(b>120)return b-120
else{z=b-1
if(z<0)return H.a(C.ad,z)
y=C.ad[z]
if(typeof a!=="number")return H.c(a)
x=(y>>>4)*a+(8-(y&15))
return x>=1?x:1}},
kG:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=C.a.H(1,C.a.bm(8,b.e))
y=H.i(z)
x=new Uint32Array(y)
w=b.d.buffer
v=(w&&C.f).a0(w,0,null)
w=x.buffer
u=(w&&C.f).a0(w,0,null)
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
kW:function(a,b,c,d,e){var z
if(c===0)return 0
z=b*C.a.l(e,c)+C.b.l(d,c)
if(z>=a.length)return H.a(a,z)
return a[z]},
cp:function(a,b){var z,y,x
z=this.kW(this.ch,this.Q,this.z,a,b)
y=this.cy
if(z>=y.length)return H.a(y,z)
if(y[z]==null){x=U.kF()
if(z>=y.length)return H.a(y,z)
y[z]=x}y=this.cy
if(z>=y.length)return H.a(y,z)
return y[z]},
static:{ep:function(a,b){var z,y,x,w
z=new Uint32Array(H.i(2))
y=new U.qN(0,a,z,null)
z=z.buffer
z=(z&&C.f).a0(z,0,null)
y.d=z
x=a.a
w=a.d
a.d=J.b(w,1)
w=J.e(x,w)
if(0>=z.length)return H.a(z,0)
z[0]=w
w=a.a
x=a.d
a.d=J.b(x,1)
x=J.e(w,x)
if(1>=z.length)return H.a(z,1)
z[1]=x
x=a.a
w=a.d
a.d=J.b(w,1)
w=J.e(x,w)
if(2>=z.length)return H.a(z,2)
z[2]=w
w=a.a
x=a.d
a.d=J.b(x,1)
x=J.e(w,x)
if(3>=z.length)return H.a(z,3)
z[3]=x
x=a.a
w=a.d
a.d=J.b(w,1)
w=J.e(x,w)
if(4>=z.length)return H.a(z,4)
z[4]=w
w=a.a
x=a.d
a.d=J.b(x,1)
x=J.e(w,x)
if(5>=z.length)return H.a(z,5)
z[5]=x
x=a.a
w=a.d
a.d=J.b(w,1)
w=J.e(x,w)
if(6>=z.length)return H.a(z,6)
z[6]=w
w=a.a
x=a.d
a.d=J.b(x,1)
x=J.e(w,x)
if(7>=z.length)return H.a(z,7)
z[7]=x
return new U.qM(a,y,b,null,0,0,0,null,0,0,0,null,0,[],[],0,null,null,null,null,null,null)}}},
qN:{
"^":"j;a,b,c,d",
ir:function(){var z,y,x,w
z=this.a
if(z<32){y=this.c
x=C.a.aR(y[0],z)
y=y[1]
if(z<0)return H.a(C.C,z)
w=x+((y&C.C[z])>>>0)*(C.C[32-z]+1)}else{y=this.c
w=z===32?y[1]:C.a.aR(y[1],z-32)}return w},
J:function(a){var z,y
z=this.b
if(!(J.U(z.d,z.c)&&this.a>=64)&&a<25){z=this.ir()
if(a>=33)return H.a(C.C,a)
y=C.C[a]
this.a+=a
this.c3()
return(z&y)>>>0}else throw H.f(new U.x("Not enough data in input."))},
c3:function(){var z,y,x,w
while(!0){if(this.a>=8){z=this.b
z=!J.U(z.d,z.c)}else z=!1
if(!z)break
z=this.b
y=z.a
x=z.d
z.d=J.b(x,1)
w=J.e(y,x)
x=this.c
y=x[0]
z=x[1]
x[0]=(y>>>8)+(z&255)*16777216
x[1]=z>>>8
z=x[1]
y=J.h(w,16777216)
if(typeof y!=="number")return H.c(y)
x[1]=(z|y)>>>0
this.a-=8}}},
qO:{
"^":"j;a,b",
dX:function(a,b){var z,y
z=C.a.aR((b*506832829&4294967295)>>>0,this.b)
y=this.a
if(z>=y.length)return H.a(y,z)
y[z]=b},
fj:function(a){var z=this.a
if(a>>>0!==a||a>=z.length)return H.a(z,a)
return z[a]}},
qP:{
"^":"j;a,b,c,B:d>,e",
mr:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q
z=this.e
y=C.a.bm(8,z)
x=this.b
w=this.d
if(y<8){v=C.a.H(1,z)-1
u=C.a.H(1,y)-1
for(t=a;t<b;++t){if(typeof x!=="number")return H.c(x)
s=0
r=0
for(;r<x;++r){if((r&v)>>>0===0){s=J.e(c.a,J.b(c.d,0))
c.d=J.b(c.d,1)}z=J.u(s).L(s,u)
if(z>>>0!==z||z>=w.length)return H.a(w,z)
z=w[z]
J.n(d.a,J.b(d.d,0),z>>>8&255)
d.d=J.b(d.d,1)
if(typeof s!=="number")return s.w()
s=C.b.l(s,y)}}}else for(t=a;t<b;++t){if(typeof x!=="number")return H.c(x)
r=0
for(;r<x;++r){q=J.e(c.a,J.b(c.d,0))
c.d=J.b(c.d,1)
if(q>>>0!==q||q>=w.length)return H.a(w,q)
z=w[q]
J.n(d.a,J.b(d.d,0),z>>>8&255)
d.d=J.b(d.d,1)}}},
i4:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p
z=this.e
y=C.a.bm(8,z)
x=this.b
w=this.d
if(y<8){v=C.a.H(1,z)-1
u=C.a.H(1,y)-1
for(t=a;t<b;++t){if(typeof x!=="number")return H.c(x)
s=0
r=0
for(;r<x;++r,f=p){if((r&v)>>>0===0){q=J.b(d,1)
if(d>>>0!==d||d>=c.length)return H.a(c,d)
s=c[d]>>>8&255
d=q}p=J.b(f,1)
z=s&u
if(z<0||z>=w.length)return H.a(w,z)
z=w[z]
if(f>>>0!==f||f>=e.length)return H.a(e,f)
e[f]=z
s=C.a.bm(s,y)}}}else for(t=a;t<b;++t){if(typeof x!=="number")return H.c(x)
r=0
for(;r<x;++r,f=p,d=q){p=J.b(f,1)
q=J.b(d,1)
if(d>>>0!==d||d>=c.length)return H.a(c,d)
z=c[d]>>>8&255
if(z>=w.length)return H.a(w,z)
z=w[z]
if(f>>>0!==f||f>=e.length)return H.a(e,f)
e[f]=z}}},
ms:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.b
y=this.e
x=C.a.H(1,y)
w=x-1
x=J.m(J.b(z,x),1)
if(typeof x!=="number")return x.w()
y=C.b.l(x,y)
v=C.a.l(a,this.e)*y
for(u=a;u<b;){x=new Uint8Array(3)
t=new U.tc(x)
if(typeof z!=="number")return H.c(z)
s=J.G(d)
r=v
q=0
for(;q<z;++q){if((q&w)>>>0===0){p=this.d
o=r+1
if(r>=p.length)return H.a(p,r)
p=p[r]
x[0]=p>>>0&255
x[1]=p>>>8&255
x[2]=p>>>16&255
r=o}p=s.i(d,q)
n=s.i(d,q)
m=c.length
if(n>>>0!==n||n>=m)return H.a(c,n)
n=c[n]
l=n>>>8&255
k=(n>>>16&255)+t.f5(x[0],l)&4294967295&255
j=(((n&255)+t.f5(x[1],l)&4294967295)>>>0)+t.f5(x[2],k)&4294967295&255
if(p>>>0!==p||p>=m)return H.a(c,p)
c[p]=(n&4278255360|k<<16&4294967295|j)>>>0}d=s.i(d,z);++u
if((u&w)>>>0===0)v+=y}},
nq:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.b
if(a===0){y=J.u(d)
x=y.p(d,1)
w=c.length
if(x>>>0!==x||x>=w)return H.a(c,x)
c[x]
U.eq(c,d,4278190080)
if(typeof z!=="number")return H.c(z)
v=1
for(;v<z;++v){x=J.m(y.i(d,v),1)
if(x>>>0!==x||x>=w)return H.a(c,x)
u=c[x]
U.eq(c,y.i(d,v),u)}d=y.i(d,z);++a}y=this.e
x=C.a.H(1,y)
t=x-1
x=J.m(J.b(z,x),1)
if(typeof x!=="number")return x.w()
y=C.b.l(x,y)
s=C.a.l(a,this.e)*y
for(r=a;r<b;){x=J.u(d)
w=x.p(d,1)
q=c.length
if(w>>>0!==w||w>=q)return H.a(c,w)
c[w]
w=x.p(d,z)
if(w>>>0!==w||w>=q)return H.a(c,w)
U.eq(c,d,c[w])
w=this.d
p=s+1
if(s>=w.length)return H.a(w,s)
w=w[s]
o=$.$get$hN()[w>>>8&15]
if(typeof z!=="number")return H.c(z)
v=1
for(;v<z;++v){if((v&t)>>>0===0){w=this.d
n=p+1
if(p>=w.length)return H.a(w,p)
w=w[p]
o=$.$get$hN()[w>>>8&15]
p=n}w=J.m(x.i(d,v),1)
if(w>>>0!==w||w>=q)return H.a(c,w)
m=o.$3(c,c[w],J.m(x.i(d,v),z))
U.eq(c,x.i(d,v),m)}d=x.i(d,z);++r
if((r&t)>>>0===0)s+=y}},
mh:function(a,b,c){var z,y,x
for(;J.a7(b,c);b=x){if(b>>>0!==b||b>=a.length)return H.a(a,b)
z=a[b]
y=z>>>8&255
x=b+1
a[b]=(z&4278255360|(z&16711935)+((y<<16|y)>>>0)&16711935)>>>0}},
static:{eq:function(a,b,c){var z,y,x
if(b>>>0!==b||b>=a.length)return H.a(a,b)
z=a[b]
y=J.u(c)
x=y.L(c,4278255360)
if(typeof x!=="number")return H.c(x)
y=y.L(c,16711935)
if(typeof y!=="number")return H.c(y)
a[b]=(((z&4278255360)>>>0)+x&4278255360|(z&16711935)+y&16711935)>>>0},bk:function(a,b){return(((a^b)&4278124286)>>>1)+((a&b)>>>0)},bO:function(a){if(a<0)return 0
if(a>255)return 255
return a},er:function(a,b,c){return Math.abs(b-c)-Math.abs(a-c)},zn:[function(a,b,c){return 4278190080},"$3","ig",6,0,4],zo:[function(a,b,c){return b},"$3","un",6,0,4],zt:[function(a,b,c){if(c>>>0!==c||c>=a.length)return H.a(a,c)
return a[c]},"$3","us",6,0,4],zu:[function(a,b,c){var z=J.b(c,1)
if(z>>>0!==z||z>=a.length)return H.a(a,z)
return a[z]},"$3","ut",6,0,4],zv:[function(a,b,c){var z=J.m(c,1)
if(z>>>0!==z||z>=a.length)return H.a(a,z)
return a[z]},"$3","uu",6,0,4],zw:[function(a,b,c){var z,y,x
z=a.length
if(c>>>0!==c||c>=z)return H.a(a,c)
y=a[c]
x=c+1
if(x>=z)return H.a(a,x)
return U.bk(U.bk(b,a[x]),y)},"$3","uv",6,0,4],zx:[function(a,b,c){var z=J.m(c,1)
if(z>>>0!==z||z>=a.length)return H.a(a,z)
return U.bk(b,a[z])},"$3","uw",6,0,4],zy:[function(a,b,c){if(c>>>0!==c||c>=a.length)return H.a(a,c)
return U.bk(b,a[c])},"$3","ux",6,0,4],zz:[function(a,b,c){var z,y
z=J.m(c,1)
y=a.length
if(z>>>0!==z||z>=y)return H.a(a,z)
z=a[z]
if(c>>>0!==c||c>=y)return H.a(a,c)
return U.bk(z,a[c])},"$3","uy",6,0,4],zA:[function(a,b,c){var z,y,x
z=a.length
if(c>>>0!==c||c>=z)return H.a(a,c)
y=a[c]
x=c+1
if(x>=z)return H.a(a,x)
return U.bk(y,a[x])},"$3","uz",6,0,4],zp:[function(a,b,c){var z,y,x,w
z=J.m(c,1)
y=a.length
if(z>>>0!==z||z>=y)return H.a(a,z)
z=a[z]
if(c>>>0!==c||c>=y)return H.a(a,c)
x=a[c]
w=c+1
if(w>=y)return H.a(a,w)
w=a[w]
return U.bk(U.bk(b,z),U.bk(x,w))},"$3","uo",6,0,4],zq:[function(a,b,c){var z,y,x
z=a.length
if(c>>>0!==c||c>=z)return H.a(a,c)
y=a[c]
x=c-1
if(x<0)return H.a(a,x)
x=a[x]
return U.er(y>>>24,b>>>24,x>>>24)+U.er(y>>>16&255,b>>>16&255,x>>>16&255)+U.er(y>>>8&255,b>>>8&255,x>>>8&255)+U.er(y&255,b&255,x&255)<=0?y:b},"$3","up",6,0,4],zr:[function(a,b,c){var z,y,x
z=a.length
if(c>>>0!==c||c>=z)return H.a(a,c)
y=a[c]
x=c-1
if(x<0)return H.a(a,x)
x=a[x]
return(U.bO((b>>>24)+(y>>>24)-(x>>>24))<<24|U.bO((b>>>16&255)+(y>>>16&255)-(x>>>16&255))<<16|U.bO((b>>>8&255)+(y>>>8&255)-(x>>>8&255))<<8|U.bO((b&255)+(y&255)-(x&255)))>>>0},"$3","uq",6,0,4],zs:[function(a,b,c){var z,y,x,w,v,u
z=a.length
if(c>>>0!==c||c>=z)return H.a(a,c)
y=a[c]
x=c-1
if(x<0)return H.a(a,x)
x=a[x]
w=U.bk(b,y)
y=w>>>24
z=w>>>16&255
v=w>>>8&255
u=w>>>0&255
return(U.bO(y+C.a.a3(y-(x>>>24),2))<<24|U.bO(z+C.a.a3(z-(x>>>16&255),2))<<16|U.bO(v+C.a.a3(v-(x>>>8&255),2))<<8|U.bO(u+C.a.a3(u-(x>>>0&255),2)))>>>0},"$3","ur",6,0,4]}},
tc:{
"^":"j;B:a>",
f5:function(a,b){var z,y,x,w,v
z=$.$get$cO()
z[0]=a
y=$.$get$dw()
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
z[0]=b
if(0>=x)return H.a(y,0)
v=y[0]
$.$get$i7()[0]=w*v
y=$.$get$kU()
if(0>=y.length)return H.a(y,0)
return y[0]>>>5}},
qV:{
"^":"j;a,D:b>,C:c>,d,e,f,r,x,y,z",
gie:function(){var z=this.d
if(typeof z!=="number")return z.I()
z=z>1||this.e>=4||this.f>1||this.r!==0
if(z)return!1
return!0},
my:function(a,b,c){var z,y,x,w,v,u,t
if(!this.gie())return!1
z=this.e
if(z>=4)return H.a(C.af,z)
y=C.af[z]
if(this.d===0){z=this.b
if(typeof z!=="number")return H.c(z)
x=a*z
w=J.h(b,z)
z=this.a;(c&&C.h).aj(c,x,w,z.a,J.b(J.m(z.d,z.b),x))}else{if(typeof b!=="number")return H.c(b)
z=a+b
v=this.y
v.fy=c
if(this.z){u=v.c
z=v.kl(u.a,u.b,z)}else{u=v.dy
t=v.c
v=v.es(u,t.a,t.b,z,v.gkH())
z=v}if(!z)return!1}if(y!=null){z=this.b
y.$6(z,this.c,z,a,b,c)}if(this.f===1)if(!this.kB(c,this.b,this.c,a,b))return!1
if(typeof b!=="number")return H.c(b)
if(a+b===this.c)this.x=!0
return!0},
kB:function(a,b,c,d,e){var z
if(a!=null)if(!J.aY(b,0))if(!J.aY(c,0))if(d>=0)if(!J.a7(e,0)){if(typeof e!=="number")return H.c(e)
if(typeof c!=="number")return H.c(c)
z=d+e>c}else z=!0
else z=!0
else z=!0
else z=!0
else z=!0
if(z)return!1
return!0},
km:function(){var z,y,x,w,v
z=new U.hS(!1,!1,0,"","","",0,[],null,null,null,null,null,null,null,0,0,4294967295)
z.a=this.b
z.b=this.c
y=U.ep(this.a,z)
this.y=y
y.go=this.b
y.id=this.c
y.cU(z.a,z.b,!0)
y=this.y
x=y.db
w=x.length
if(w===1){if(0>=w)return H.a(x,0)
y=x[0].a===3&&y.l9()}else y=!1
if(y){this.z=!0
y=this.y
x=y.c
v=J.h(x.a,x.b)
y.fx=0
x=J.u(v)
w=x.R(v,4)
if(typeof w!=="number")return H.c(w)
w=new Uint8Array(H.i(x.i(v,4-w)))
y.fr=w
w=w.buffer
y.dy=(w&&C.f).bM(w,0,null)}else{this.z=!1
this.y.fP()}return!0}},
r_:{
"^":"j;M:a*,K:b*,D:c>,C:d>,f9:e',i2:f?,r,x,y"},
eB:{
"^":"j;a,b,c,d,e,f",
cX:function(a){var z,y
if(a===0)return!1
z=(a<<1>>>0)-1
this.e=z
z=H.i(z<<1>>>0)
y=new Int32Array(z)
this.d=y
if(1>=z)return H.a(y,1)
y[1]=-1
this.f=1
C.h.ag(this.a,0,128,255)
return!0},
i_:function(a,b){var z,y,x,w,v,u,t
for(z=a.length,y=0,x=0,w=0;w<b;++w){if(w>=z)return H.a(a,w)
if(a[w]>0){++y
x=w}}if(!this.cX(y))return!1
if(y===1){if(x<0||x>=b)return!1
return this.el(x,0,0)}v=H.i(b)
u=new Int32Array(v)
if(!this.l3(a,b,u))return!1
for(w=0;w<b;++w){if(w>=z)return H.a(a,w)
t=a[w]
if(t>0){if(w>=v)return H.a(u,w)
if(!this.el(w,u[w],t))return!1}}return this.f===this.e},
ml:function(a,b,c,d,e){var z,y,x
if(!this.cX(e))return!1
for(z=0;z<e;++z){if(z>=2)return H.a(b,z)
y=b[z]
if(y!==-1){x=c[z]
if(x>=d)return this.f===this.e
if(!this.el(x,y,a[z]))return this.f===this.e}}return this.f===this.e},
bP:function(a){var z,y,x,w,v,u,t,s,r
z=a.ir()
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
el:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o
if(c<=7){z=this.hD(b,c)
for(y=C.a.n(1,7-c),x=this.b,w=this.a,v=0;v<y;++v){u=(z|C.a.n(v,c))>>>0
if(u>=128)return H.a(x,u)
x[u]=a
w[u]=c}}else z=this.hD(C.a.w(b,c-7),7)
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
s+=w[q]+(C.a.w(b,r)&1);--t
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
hD:function(a,b){var z,y
z=C.Z[a&15]
y=C.a.l(a,4)
if(y>=16)return H.a(C.Z,y)
return C.a.aR((z<<4|C.Z[y])>>>0,8-b)},
l3:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o
z=H.i(16)
y=new Int32Array(z)
x=H.i(16)
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
kE:{
"^":"j;a",
h:function(a,b){var z,y
z=this.a
if(b>>>0!==b||b>=5)return H.a(z,b)
y=z[b]
if(y==null){y=new U.eB(new Uint8Array(H.i(128)),new Int16Array(H.i(128)),new Int16Array(H.i(128)),null,0,0)
y.cX(0)
z[b]=y
z=y}else z=y
return z},
jY:function(){var z,y,x,w
for(z=this.a,y=0;y<5;++y){x=new Uint8Array(128)
w=new Int16Array(128)
x=new U.eB(x,w,new Int16Array(128),null,0,0)
x.cX(0)
z[y]=x}},
static:{kF:function(){var z=new U.kE(H.p(Array(5),[U.eB]))
z.jY()
return z}}},
hS:{
"^":"ct;d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,a,b,c"},
qW:{
"^":"bV;b,c,a",
fg:function(a){var z=U.S(a,!1,null,0)
this.c=z
if(!this.he(z))return!1
return!0},
cQ:function(a){var z,y
z=U.S(a,!1,null,0)
this.c=z
if(!this.he(z))return
z=new U.hS(!1,!1,0,"","","",0,[],null,null,null,null,null,null,null,0,0,4294967295)
this.b=z
if(!this.hg(this.c,z))return
z=this.b
z.ch=this.a
switch(z.f){case 3:return z
case 2:y=this.c
y.d=z.dy
if(!U.ep(y,z).d4())return
return this.b
case 1:y=this.c
y.d=z.dy
if(!new U.hJ(y,z,null,null,null,new U.hM(null,null,null,null),new U.hP(null,null,null,null,null,null),new U.hK(null,null,null,null,new Int32Array(H.i(4)),new Int32Array(H.i(4))),new U.hQ(!1,!1,!0,new Int8Array(H.i(4)),new Int8Array(H.i(4))),null,null,null,null,null,null,null,null,null,null,null,H.p(Array(8),[U.dn]),!1,null,H.p(Array(4),[U.es]),null,null,null,null,new Uint8Array(H.i(4)),null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,null,null,null,null,null,null,null,null,null).d4())return
return this.b}return},
bz:function(a){var z,y,x,w
z=this.c
if(z==null||this.b==null)return
y=this.b
if(y.e){y=y.Q
x=y.length
if(a>=x||!1)return
if(a>=x)return H.a(y,a)
w=y[a]
return this.h2(z.cg(w.y,w.x),a)}x=y.f
if(x===2)return U.ep(z.cg(y.fr,y.dy),this.b).by()
else if(x===1)return new U.hJ(z.cg(y.fr,y.dy),this.b,null,null,null,new U.hM(null,null,null,null),new U.hP(null,null,null,null,null,null),new U.hK(null,null,null,null,new Int32Array(H.i(4)),new Int32Array(H.i(4))),new U.hQ(!1,!1,!0,new Int8Array(H.i(4)),new Int8Array(H.i(4))),null,null,null,null,null,null,null,null,null,null,null,H.p(Array(8),[U.dn]),!1,null,H.p(Array(4),[U.es]),null,null,null,null,new Uint8Array(H.i(4)),null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,null,null,null,null,null,null,null,null,null).by()
return},
c5:function(a,b){var z
this.cQ(a)
z=this.b
z.cx=0
z.cy=1
return this.bz(b)},
h2:function(a,b){var z,y,x,w,v
z=[]
y=new U.hS(!1,!1,0,"","","",0,z,null,null,null,null,null,null,null,0,0,4294967295)
if(!this.hg(a,y))return
if(y.f===0)return
x=this.b
y.cx=x.cx
y.cy=x.cy
y.ch=this.a
if(y.e){x=z.length
if(b>=x||!1)return
if(b>=x)return H.a(z,b)
w=z[b]
return this.h2(a.cg(w.y,w.x),b)}else{v=a.cg(y.fr,y.dy)
z=y.f
if(z===2)return U.ep(v,y).by()
else if(z===1)return new U.hJ(v,y,null,null,null,new U.hM(null,null,null,null),new U.hP(null,null,null,null,null,null),new U.hK(null,null,null,null,new Int32Array(H.i(4)),new Int32Array(H.i(4))),new U.hQ(!1,!1,!0,new Int8Array(H.i(4)),new Int8Array(H.i(4))),null,null,null,null,null,null,null,null,null,null,null,H.p(Array(8),[U.dn]),!1,null,H.p(Array(4),[U.es]),null,null,null,null,new Uint8Array(H.i(4)),null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,0,null,null,null,null,null,null,null,null,null).by()}return},
he:function(a){if(a.ae(4)!=="RIFF")return!1
a.t()
if(a.ae(4)!=="WEBP")return!1
return!0},
hg:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!1
while(!0){if(!(!J.U(a.d,a.c)&&!z))break
y=a.ae(4)
x=a.t()
w=x+1>>>1<<1>>>0
v=a.d
u=a.b
t=J.m(v,u)
switch(y){case"VP8X":if(!this.kX(a,b))return!1
break
case"VP8 ":b.dy=J.m(a.d,u)
b.fr=x
b.f=1
z=!0
break
case"VP8L":b.dy=J.m(a.d,u)
b.fr=x
b.f=2
z=!0
break
case"ALPH":v=a.a
s=a.e
v=new U.a3(v,0,J.M(v),0,s)
b.db=v
v.d=a.d
b.dx=x
a.d=J.b(a.d,w)
break
case"ANIM":b.f=3
r=a.t()
b.z=a.u()
b.c=(C.a.v(r&255,0,255)<<24|C.a.v(r>>>24&255,0,255)<<16|C.a.v(r>>>16&255,0,255)<<8|C.a.v(r>>>8&255,0,255))>>>0
break
case"ANMF":if(!this.kS(a,b,x))return!1
break
case"ICCP":b.r=a.ae(x)
break
case"EXIF":b.x=a.ae(x)
break
case"XMP ":b.y=a.ae(x)
break
default:q="UNKNOWN WEBP TAG: "+y
H.lg(q)
a.d=J.b(a.d,w)
break}v=J.m(J.m(a.d,u),t)
if(typeof v!=="number")return H.c(v)
p=w-v
if(p>0)a.d=J.b(a.d,p)}if(!b.d)b.d=b.db!=null
return b.f!==0},
kX:function(a,b){var z,y,x,w,v
z=a.a
y=a.d
a.d=J.b(y,1)
x=J.e(z,y)
if(J.u(x).L(x,192)!==0)return!1
if(typeof x!=="number")return x.w()
C.b.l(x,5)
z=C.b.l(x,4)
C.b.l(x,3)
C.b.l(x,2)
y=C.b.l(x,1)
if((x&1)!==0)return!1
if(a.aZ()!==0)return!1
w=J.b(a.aZ(),1)
v=J.b(a.aZ(),1)
b.a=w
b.b=v
b.e=(y&1)!==0
b.d=(z&1)!==0
return!0},
kS:function(a,b,c){var z,y,x,w
z=new U.r_(null,null,null,null,null,null,1,null,null)
z.a=J.h(a.aZ(),2)
z.b=J.h(a.aZ(),2)
z.c=J.b(a.aZ(),1)
z.d=J.b(a.aZ(),1)
z.e=a.aZ()
y=a.a
x=a.d
a.d=J.b(x,1)
w=J.e(y,x)
x=J.u(w)
y=x.L(w,127)
if(typeof y!=="number")return y.w()
y=y>>>7
z.r=y
z.f=x.L(w,1)!==0
z.x=J.m(a.d,a.b)
z.y=c-16
if(y!==0)return!1
b.Q.push(z)
return!0}},
iZ:{
"^":"j;a,b,c,d,e,f",
gD:function(a){var z=this.a
if(z.gY(z))z=0
else{z=z.gb1(z)
z=J.cZ(z.gac(z))}return z},
gC:function(a){var z=this.a
if(z.gY(z))z=0
else{z=z.gb1(z)
z=J.cY(z.gac(z))}return z},
h:function(a,b){return this.a.h(0,b)},
d2:function(a){var z=a.a
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
jh:function(a){var z,y,x,w,v,u,t,s,r
z=a.a
y=a.b
this.d2(U.d7("R",z,y,1))
this.d2(U.d7("G",z,y,1))
this.d2(U.d7("B",z,y,1))
if(a.y===4)this.d2(U.d7("A",z,y,1))
x=a.x.buffer
w=(x&&C.f).a0(x,0,null)
if(typeof y!=="number")return H.c(y)
x=w.length
v=0
u=0
for(;v<y;++v){if(typeof z!=="number")return H.c(z)
t=0
for(;t<z;++t){s=this.b
r=u+1
if(u<0||u>=x)return H.a(w,u)
s.dr(t,v,w[u]/255)
s=this.c
u=r+1
if(r<0||r>=x)return H.a(w,r)
s.dr(t,v,w[r]/255)
s=this.d
r=u+1
if(u<0||u>=x)return H.a(w,u)
s.dr(t,v,w[u]/255)
s=this.e
if(s!=null){u=r+1
if(r<0||r>=x)return H.a(w,r)
s.dr(t,v,w[r]/255)}else u=r}}},
static:{n3:function(a){var z=new U.iZ(P.Z(),null,null,null,null,null)
z.jh(a)
return z}}},
n4:{
"^":"j;Z:a>,D:b>,C:c>,d,B:e>",
bS:function(a,b){var z,y,x,w
z=this.b
if(typeof z!=="number")return H.c(z)
y=b*z+a
z=this.e
if(this.d===1){if(y>>>0!==y||y>=z.length)return H.a(z,y)
z=z[y]
if($.dM==null)U.iY()
x=$.dM
if(z>>>0!==z||z>=x.length)return H.a(x,z)
w=x[z]}else{if(y>>>0!==y||y>=z.length)return H.a(z,y)
w=z[y]}return w},
dr:function(a,b,c){var z,y,x
z=this.b
if(typeof z!=="number")return H.c(z)
y=b*z+a
z=this.d
if(z===2){z=this.e
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=c}else if(z===1){z=this.e
x=U.n_(c)
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=x}},
static:{d7:function(a,b,c,d){var z
if(d===1)z=new Uint16Array(H.i(J.h(b,c)))
else{z=J.G(b)
z=d===2?new Float32Array(H.i(z.q(b,c))):new Uint32Array(H.i(z.q(b,c)))}return new U.n4(a,b,c,d,z)}}},
tZ:{
"^":"r:20;",
$2:function(a,b){return Math.log(H.T(a*b+1))/b}},
tY:{
"^":"r:20;a",
$2:function(a,b){var z,y
z=P.O(0,a*b)
if(z>1){y=this.a.$2(z-1,0.184874)
if(typeof y!=="number")return H.c(y)
z=1+y}H.T(z)
H.T(0.4545)
return Math.pow(z,0.4545)*84.66}},
d8:{
"^":"j;D:a>,C:b>,fz:c<,fB:d<,f9:e',f,r,B:x>,y",
i:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.b
y=J.z(b)
x=P.a6(z,y.gC(b))
w=this.a
v=P.a6(w,y.gD(b))
for(y=this.x,u=y.length,t=0;t<x;++t)for(s=0;s<v;++s){if(typeof w!=="number")return H.c(w)
if(s<w){if(typeof z!=="number")return H.c(z)
r=t<z}else r=!1
if(r){if(typeof w!=="number")return H.c(w)
r=t*w+s
if(r>>>0!==r||r>=u)return H.a(y,r)
q=y[r]}else q=0
p=b.bh(s,t)
if(typeof p!=="number")return p.L()
r=C.a.v((q>>>24&255)+(p>>>24&255),0,255)
o=C.a.v((q>>>16&255)+(p>>>16&255),0,255)
n=C.a.v((q>>>8&255)+(p>>>8&255),0,255)
m=C.a.v((q&255)+(p&255),0,255)
if(typeof w!=="number")return H.c(w)
if(s<w){if(typeof z!=="number")return H.c(z)
l=t<z}else l=!1
if(l){if(typeof w!=="number")return H.c(w)
l=t*w+s
if(l>>>0!==l||l>=u)return H.a(y,l)
y[l]=(r<<24|o<<16|n<<8|m)>>>0}}return this},
p:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.b
y=J.z(b)
x=P.a6(z,y.gC(b))
w=this.a
v=P.a6(w,y.gD(b))
for(y=this.x,u=y.length,t=0;t<x;++t)for(s=0;s<v;++s){if(typeof w!=="number")return H.c(w)
if(s<w){if(typeof z!=="number")return H.c(z)
r=t<z}else r=!1
if(r){if(typeof w!=="number")return H.c(w)
r=t*w+s
if(r>>>0!==r||r>=u)return H.a(y,r)
q=y[r]}else q=0
p=b.bh(s,t)
if(typeof p!=="number")return p.L()
r=C.a.v((q>>>24&255)-(p>>>24&255),0,255)
o=C.a.v((q>>>16&255)-(p>>>16&255),0,255)
n=C.a.v((q>>>8&255)-(p>>>8&255),0,255)
m=C.a.v((q&255)-(p&255),0,255)
if(typeof w!=="number")return H.c(w)
if(s<w){if(typeof z!=="number")return H.c(z)
l=t<z}else l=!1
if(l){if(typeof w!=="number")return H.c(w)
l=t*w+s
if(l>>>0!==l||l>=u)return H.a(y,l)
y[l]=(r<<24|o<<16|n<<8|m)>>>0}}return this},
q:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.b
y=J.z(b)
x=P.a6(z,y.gC(b))
w=this.a
v=P.a6(w,y.gD(b))
for(y=this.x,u=y.length,t=0;t<x;++t)for(s=0;s<v;++s){if(typeof w!=="number")return H.c(w)
if(s<w){if(typeof z!=="number")return H.c(z)
r=t<z}else r=!1
if(r){if(typeof w!=="number")return H.c(w)
r=t*w+s
if(r>>>0!==r||r>=u)return H.a(y,r)
q=y[r]}else q=0
p=b.bh(s,t)
if(typeof p!=="number")return p.L()
r=C.a.v((q>>>24&255)*(p>>>24&255),0,255)
o=C.a.v((q>>>16&255)*(p>>>16&255),0,255)
n=C.a.v((q>>>8&255)*(p>>>8&255),0,255)
m=C.a.v((q&255)*(p&255),0,255)
if(typeof w!=="number")return H.c(w)
if(s<w){if(typeof z!=="number")return H.c(z)
l=t<z}else l=!1
if(l){if(typeof w!=="number")return H.c(w)
l=t*w+s
if(l>>>0!==l||l>=u)return H.a(y,l)
y[l]=(r<<24|o<<16|n<<8|m)>>>0}}return this},
cO:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.b
y=J.z(b)
x=P.a6(z,y.gC(b))
w=this.a
v=P.a6(w,y.gD(b))
for(y=this.x,u=y.length,t=0;t<x;++t)for(s=0;s<v;++s){if(typeof w!=="number")return H.c(w)
if(s<w){if(typeof z!=="number")return H.c(z)
r=t<z}else r=!1
if(r){if(typeof w!=="number")return H.c(w)
r=t*w+s
if(r>>>0!==r||r>=u)return H.a(y,r)
q=y[r]}else q=0
p=b.bh(s,t)
if(typeof p!=="number")return p.L()
r=C.a.v(q>>>24&255|p>>>24&255,0,255)
o=C.a.v(q>>>16&255|p>>>16&255,0,255)
n=C.a.v(q>>>8&255|p>>>8&255,0,255)
m=C.a.v((q&255|p&255)>>>0,0,255)
if(typeof w!=="number")return H.c(w)
if(s<w){if(typeof z!=="number")return H.c(z)
l=t<z}else l=!1
if(l){if(typeof w!=="number")return H.c(w)
l=t*w+s
if(l>>>0!==l||l>=u)return H.a(y,l)
y[l]=(r<<24|o<<16|n<<8|m)>>>0}}return this},
L:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.b
y=J.z(b)
x=P.a6(z,y.gC(b))
w=this.a
v=P.a6(w,y.gD(b))
for(y=this.x,u=y.length,t=0;t<x;++t)for(s=0;s<v;++s){if(typeof w!=="number")return H.c(w)
if(s<w){if(typeof z!=="number")return H.c(z)
r=t<z}else r=!1
if(r){if(typeof w!=="number")return H.c(w)
r=t*w+s
if(r>>>0!==r||r>=u)return H.a(y,r)
q=y[r]}else q=0
p=b.bh(s,t)
if(typeof p!=="number")return p.L()
r=C.a.v(q>>>24&255&p>>>24&255,0,255)
o=C.a.v(q>>>16&255&p>>>16&255,0,255)
n=C.a.v(q>>>8&255&p>>>8&255,0,255)
m=C.a.v((q&255&p&255)>>>0,0,255)
if(typeof w!=="number")return H.c(w)
if(s<w){if(typeof z!=="number")return H.c(z)
l=t<z}else l=!1
if(l){if(typeof w!=="number")return H.c(w)
l=t*w+s
if(l>>>0!==l||l>=u)return H.a(y,l)
y[l]=(r<<24|o<<16|n<<8|m)>>>0}}return this},
R:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.b
y=J.z(b)
x=P.a6(z,y.gC(b))
w=this.a
v=P.a6(w,y.gD(b))
for(y=this.x,u=y.length,t=0;t<x;++t)for(s=0;s<v;++s){if(typeof w!=="number")return H.c(w)
if(s<w){if(typeof z!=="number")return H.c(z)
r=t<z}else r=!1
if(r){if(typeof w!=="number")return H.c(w)
r=t*w+s
if(r>>>0!==r||r>=u)return H.a(y,r)
q=y[r]}else q=0
p=b.bh(s,t)
if(typeof p!=="number")return p.L()
r=C.a.R(q&255,p&255)
o=C.a.R(q>>>8&255,p>>>8&255)
n=C.a.R(q>>>16&255,p>>>16&255)
m=C.a.v(C.a.R(q>>>24&255,p>>>24&255),0,255)
n=C.a.v(n,0,255)
o=C.a.v(o,0,255)
r=C.a.v(r,0,255)
if(typeof w!=="number")return H.c(w)
if(s<w){if(typeof z!=="number")return H.c(z)
l=t<z}else l=!1
if(l){if(typeof w!=="number")return H.c(w)
l=t*w+s
if(l>>>0!==l||l>=u)return H.a(y,l)
y[l]=(m<<24|n<<16|o<<8|r)>>>0}}return this},
gm:function(a){return this.x.length},
h:function(a,b){var z=this.x
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.x
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c},
bh:function(a,b){var z,y
if(a>=0){z=this.a
if(typeof z!=="number")return H.c(z)
if(a<z){if(typeof b!=="number")return b.a9()
if(b>=0){z=this.b
if(typeof z!=="number")return H.c(z)
z=b<z}else z=!1}else z=!1}else z=!1
if(z){z=this.x
y=this.a
if(typeof b!=="number")return b.q()
if(typeof y!=="number")return H.c(y)
y=b*y+a
if(y>>>0!==y||y>=z.length)return H.a(z,y)
y=z[y]
z=y}else z=0
return z},
S:function(a){return this.gm(this).$0()},
static:{aZ:function(a,b,c){return new U.d8(a,b,0,0,0,1,1,new Uint32Array(H.i(J.h(a,b))),c)}}},
x:{
"^":"j;a",
E:function(a){return"ImageException: "+this.a}},
a3:{
"^":"j;a5:a>,b,c,af:d*,e",
gm:function(a){return J.m(this.c,this.d)},
h:function(a,b){return J.e(this.a,J.b(this.d,b))},
k:function(a,b,c){J.n(this.a,J.b(this.d,b),c)
return c},
aY:function(a,b,c,d){var z,y
z=this.a
y=this.d
if(c instanceof U.a3)J.eR(z,J.b(y,a),J.b(J.b(this.d,a),b),c.a,J.b(c.d,d))
else J.eR(z,J.b(y,a),J.b(J.b(this.d,a),b),c,d)},
bO:function(a,b,c){return this.aY(a,b,c,0)},
nl:function(a,b,c){J.be(this.a,J.b(this.d,a),J.b(J.b(this.d,a),b),c)},
fI:function(a,b,c){var z=J.b(c!=null?J.b(this.b,c):this.d,b)
return U.S(this.a,this.e,a,z)},
cR:function(a){return this.fI(a,0,null)},
cg:function(a,b){return this.fI(a,0,b)},
b3:function(a,b){this.d=J.b(this.d,b)},
ax:function(a){var z=this.cR(a)
this.d=J.b(this.d,J.m(z.c,z.d))
return z},
ae:function(a){var z,y,x,w,v
if(a==null){z=[]
for(y=this.c;!J.U(this.d,y);){x=this.a
w=this.d
this.d=J.b(w,1)
v=J.e(x,w)
if(J.k(v,0))return P.c9(z,0,null)
z.push(v)}throw H.f(new U.x("EOF reached without finding string terminator"))}return P.c9(this.ax(a).aq(),0,null)},
ca:function(){return this.ae(null)},
u:function(){var z,y,x,w
z=this.a
y=this.d
this.d=J.b(y,1)
x=J.J(J.e(z,y),255)
y=this.a
z=this.d
this.d=J.b(z,1)
w=J.J(J.e(y,z),255)
if(this.e){if(typeof x!=="number")return x.n()
if(typeof w!=="number")return H.c(w)
return(x<<8|w)>>>0}if(typeof w!=="number")return w.n()
if(typeof x!=="number")return H.c(x)
return(w<<8|x)>>>0},
aZ:function(){var z,y,x,w,v
z=this.a
y=this.d
this.d=J.b(y,1)
x=J.J(J.e(z,y),255)
y=this.a
z=this.d
this.d=J.b(z,1)
w=J.J(J.e(y,z),255)
z=this.a
y=this.d
this.d=J.b(y,1)
v=J.J(J.e(z,y),255)
if(this.e){if(typeof w!=="number")return w.n()
z=J.aF(v,w<<8>>>0)
if(typeof x!=="number")return x.n()
return J.aF(z,x<<16>>>0)}if(typeof w!=="number")return w.n()
z=J.aF(x,w<<8>>>0)
if(typeof v!=="number")return v.n()
return J.aF(z,v<<16>>>0)},
t:function(){var z,y,x,w,v,u
z=this.a
y=this.d
this.d=J.b(y,1)
x=J.J(J.e(z,y),255)
y=this.a
z=this.d
this.d=J.b(z,1)
w=J.J(J.e(y,z),255)
z=this.a
y=this.d
this.d=J.b(y,1)
v=J.J(J.e(z,y),255)
y=this.a
z=this.d
this.d=J.b(z,1)
u=J.J(J.e(y,z),255)
if(this.e){if(typeof x!=="number")return x.n()
if(typeof w!=="number")return w.n()
if(typeof v!=="number")return v.n()
if(typeof u!=="number")return H.c(u)
return(x<<24|w<<16|v<<8|u)>>>0}if(typeof u!=="number")return u.n()
if(typeof v!=="number")return v.n()
if(typeof w!=="number")return w.n()
if(typeof x!=="number")return H.c(x)
return(u<<24|v<<16|w<<8|x)>>>0},
iu:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.a
y=this.d
this.d=J.b(y,1)
x=J.J(J.e(z,y),255)
y=this.a
z=this.d
this.d=J.b(z,1)
w=J.J(J.e(y,z),255)
z=this.a
y=this.d
this.d=J.b(y,1)
v=J.J(J.e(z,y),255)
y=this.a
z=this.d
this.d=J.b(z,1)
u=J.J(J.e(y,z),255)
z=this.a
y=this.d
this.d=J.b(y,1)
t=J.J(J.e(z,y),255)
y=this.a
z=this.d
this.d=J.b(z,1)
s=J.J(J.e(y,z),255)
z=this.a
y=this.d
this.d=J.b(y,1)
r=J.J(J.e(z,y),255)
y=this.a
z=this.d
this.d=J.b(z,1)
q=J.J(J.e(y,z),255)
if(this.e){if(typeof x!=="number")return x.n()
z=C.a.H(x,56)
if(typeof w!=="number")return w.n()
y=C.a.H(w,48)
if(typeof v!=="number")return v.n()
p=C.a.H(v,40)
if(typeof u!=="number")return u.n()
o=C.a.H(u,32)
if(typeof t!=="number")return t.n()
if(typeof s!=="number")return s.n()
if(typeof r!=="number")return r.n()
if(typeof q!=="number")return H.c(q)
return(z|y|p|o|t<<24|s<<16|r<<8|q)>>>0}if(typeof q!=="number")return q.n()
z=C.a.H(q,56)
if(typeof r!=="number")return r.n()
y=C.a.H(r,48)
if(typeof s!=="number")return s.n()
p=C.a.H(s,40)
if(typeof t!=="number")return t.n()
o=C.a.H(t,32)
if(typeof u!=="number")return u.n()
if(typeof v!=="number")return v.n()
if(typeof w!=="number")return w.n()
if(typeof x!=="number")return H.c(x)
return(z|y|p|o|u<<24|v<<16|w<<8|x)>>>0},
iz:function(a,b,c){var z,y
if(!!J.B(this.a).$isbj)return this.iA(b,c)
z=J.b(J.b(this.b,this.d),b)
y=J.aY(c,0)?this.c:J.b(z,c)
return J.lE(this.a,z,y)},
iA:function(a,b){var z,y,x,w
z=b!=null?b:J.m(J.m(this.c,this.d),a)
y=this.a
x=J.B(y)
if(!!x.$isbj){w=x.ga5(y)
y=x.gij(y)
x=this.d
if(typeof y!=="number")return y.i()
if(typeof x!=="number")return H.c(x)
return J.eO(w,y+x+a,z)}return new Uint8Array(H.D(x.ay(y,J.b(this.d,a),J.b(J.b(this.d,a),z))))},
aq:function(){return this.iA(0,null)},
nS:function(a){var z,y,x
z=this.a
y=J.B(z)
if(!!y.$isbj){x=y.ga5(z)
z=y.gij(z)
y=this.d
if(typeof z!=="number")return z.i()
if(typeof y!=="number")return H.c(y)
return J.io(x,z+y+a,null)}z=this.aq().buffer
return(z&&C.f).bM(z,0,null)},
dk:function(){return this.nS(0)},
S:function(a){return this.gm(this).$0()},
static:{S:function(a,b,c,d){return new U.a3(a,d,c==null?J.M(a):J.b(d,c),d,b)},C:function(a,b,c){var z,y,x,w
z=a.a
y=J.b(a.d,c)
x=a.b
w=b==null?a.c:J.b(J.b(a.d,c),b)
return new U.a3(z,x,w,y,a.e)}}},
oB:{
"^":"j;m:a*,b,c",
ab:function(a){var z,y,x
if(this.a===this.c.length)this.cq()
z=this.c
y=this.a++
x=J.J(a,255)
if(y<0||y>=z.length)return H.a(z,y)
z[y]=x},
ef:function(a,b){var z,y,x,w
b=J.M(a)
for(;z=this.a,y=z+b,x=this.c,w=x.length,y>w;)this.hn(y-w)
C.h.bi(x,z,y,a)
this.a+=b},
bR:function(a){return this.ef(a,null)},
o1:function(a){if(this.b){if(typeof a!=="number")return a.w()
this.ab(C.b.l(a,8)&255)
this.ab(a&255)
return}this.ab(J.u(a).L(a,255))
if(typeof a!=="number")return a.w()
this.ab(C.b.l(a,8)&255)},
cM:function(a){if(this.b){if(typeof a!=="number")return a.w()
this.ab(C.b.l(a,24)&255)
this.ab(C.b.l(a,16)&255)
this.ab(C.b.l(a,8)&255)
this.ab(a&255)
return}this.ab(J.u(a).L(a,255))
if(typeof a!=="number")return a.w()
this.ab(C.b.l(a,8)&255)
this.ab(C.b.l(a,16)&255)
this.ab(C.b.l(a,24)&255)},
hn:function(a){var z,y,x
z=a!=null?a>32768?a:32768:32768
y=this.c
x=new Uint8Array(y.length+z)
y=this.c
C.h.bi(x,0,y.length,y)
this.c=x},
cq:function(){return this.hn(null)},
S:function(a){return this.a.$0()},
static:{de:function(a,b){return new U.oB(0,a,new Uint8Array(H.i(b==null?32768:b)))}}}}],["","",,O,{
"^":"",
f2:{
"^":"lH;d,e,f,a,b,c",
static:{wF:[function(a,b,c){var z,y,x,w,v,u
z=b.a1("L",G.F(1))
y=b.a1("scale",G.F(1))
x=b.N("nsamples",1)
w=G.bK(J.h(z,y),0)
v=G.pC(c)
u=P.O(1,x)
u=new O.f2(w,v,null,G.aR(a),G.aR(G.a1(a.gah(),a.a)),u)
u.bX(a,x)
u.f=v.b
return u},"$3","le",6,0,58]}},
f7:{
"^":"c1;d,e,a,b,c",
static:{wK:[function(a,b){var z,y,x,w,v,u,t
z=b.a1("L",G.F(1))
y=b.a1("scale",G.F(1))
x=new G.t(new Float32Array(H.i(3)))
x.G(0,0,0)
w=b.aU("from",x)
x=new G.t(new Float32Array(H.i(3)))
x.G(0,0,1)
v=J.m(w,b.aU("to",x))
x=J.h(z,y)
u=P.O(1,1)
t=G.aR(a)
u=new O.f7(null,null,t,G.aR(G.a1(a.gah(),a.a)),u)
u.bX(a,1)
t=t.cI(v)
u.d=t.au(0,t.S(0))
u.e=x
return u},"$2","uP",4,0,59]}},
fj:{
"^":"c1;d,e,f,a,b,c",
je:function(a,b,c){var z,y
z=new G.t(new Float32Array(H.i(3)))
z.G(0,0,0)
this.d=this.a.ai(z)
if(J.bx(c)){y=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[null])),[null])
$.ai.e7(c,y.a).at(new O.mX(this,c,y))}},
static:{mW:function(a,b,c){var z=P.O(1,1)
z=new O.fj(null,b,null,G.aR(a),G.aR(G.a1(a.gah(),a.a)),z)
z.bX(a,1)
z.je(a,b,c)
return z},xm:[function(a,b){var z,y,x
z=b.a1("I",G.F(1))
y=b.a1("scale",G.F(1))
x=b.bd("mapname","")
return O.mW(a,J.h(z,y),x)},"$2","uQ",4,0,60]}},
mX:{
"^":"r:8;a,b,c",
$1:function(a){var z,y,x
z=this.b
y=G.dQ(z,!1,1,8,1,!0,0)
x=this.a
if($.ai.e.X(y))x.f=$.ai.dn(y)
else{z=G.cy(a,z,!1,8,0)
x.f=z
$.ai.e.k(0,y,z)}this.c.bo(0)}},
fv:{
"^":"c1;d,e,f,a,b,c",
eX:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=a.e
y=a.f
this.e=a
x=1/P.O(z,y)
w=H.i(J.h(z,y))
v=new Float32Array(w)
if(typeof y!=="number")return H.c(y)
u=0
for(;u<y;++u){if(typeof z!=="number")return H.c(z)
t=u*z
s=u/y
r=Math.sin(3.141592653589793*(u+0.5)/y)
for(q=0;q<z;++q){p=q+t
o=J.h(this.e.nk(q/z,s,x),this.d).fk()
if(p>>>0!==p||p>=w)return H.a(v,p)
v[p]=o
v[p]=v[p]*r}}this.f=G.mg(v,z,y)},
jn:function(a,b,c,d){var z,y
if(J.bx(d)){z=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[null])),[null])
$.ai.e7(d,z.a).at(new O.nj(this,d,z))}y=G.cI(1,1,3)
y.k(0,0,G.F(1))
this.eX(G.cy(y,d,!1,8,0),d)},
static:{ni:function(a,b,c,d){var z=P.O(1,c)
z=new O.fv(b,null,null,G.aR(a),G.aR(G.a1(a.gah(),a.a)),z)
z.bX(a,c)
z.jn(a,b,c,d)
return z},xz:[function(a,b){var z,y,x,w
z=b.a1("L",G.F(1))
y=b.a1("scale",G.F(1))
x=b.bd("mapname","")
w=b.N("nsamples",1)
return O.ni(a,J.h(z,y),w,x)},"$2","uR",4,0,61]}},
nj:{
"^":"r:8;a,b,c",
$1:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.b
y=this.a
x=G.dQ(z,!1,1,8,y.d,!0,0)
if($.ai.e.X(x))y.eX($.ai.dn(x),z)
else{w=G.hp(a)
v=w.a
u=w.b
t=J.G(v)
s=0
while(!0){r=t.q(v,u)
if(typeof r!=="number")return H.c(r)
if(!(s<r))break
w.k(0,s,J.h(w.h(0,s),y.d.ec()));++s}q=G.cy(w,z,!1,8,0)
$.ai.e.k(0,x,q)
y.eX(q,z)}this.c.bo(0)}},
h8:{
"^":"c1;d,e,a,b,c",
static:{yl:[function(a,b){var z,y,x,w
z=b.a1("I",G.F(1))
y=b.a1("scale",G.F(1))
x=new G.t(new Float32Array(H.i(3)))
x.G(0,0,0)
w=G.ef(b.aU("from",x)).q(0,a)
a=J.h(z,y)
x=P.O(1,1)
x=new O.h8(null,a,G.aR(w),G.aR(G.a1(w.b,w.a)),x)
x.bX(w,1)
a=new G.t(new Float32Array(H.i(3)))
a.G(0,0,0)
x.d=w.ai(a)
return x},"$2","uS",4,0,62]}},
hb:{
"^":"c1;d,e,f,r,x,y,z,Q,ch,cx,cy,a,b,c",
jA:function(a,b,c,d){var z,y
z=new G.t(new Float32Array(H.i(3)))
z.G(0,0,0)
this.e=this.a.ai(z)
if(J.bx(c)){y=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[null])),[null])
$.ai.e7(c,y.a).at(new O.oO(this,c,d,y))}this.z=-1
this.Q=1
this.ch=-1
this.cx=1
this.x=0.001
this.y=1e30
this.r=G.k3(d,0.001,1e30)
if(typeof d!=="number")return H.c(d)
this.cy=Math.cos(H.T(Math.atan(H.T(Math.tan(H.T(0.017453292519943295*d/2))*Math.sqrt(H.T(2))))))},
static:{oN:function(a,b,c,d){var z=P.O(1,1)
z=new O.hb(null,null,b,null,null,null,null,null,null,null,null,G.aR(a),G.aR(G.a1(a.gah(),a.a)),z)
z.bX(a,1)
z.jA(a,b,c,d)
return z},yp:[function(a,b){var z,y,x,w
z=b.a1("I",G.F(1))
y=b.a1("scale",G.F(1))
x=b.j("fov",45)
w=b.bd("mapname","")
return O.oN(a,J.h(z,y),w,x)},"$2","uT",4,0,63]}},
oO:{
"^":"r:8;a,b,c,d",
$1:function(a){var z,y,x,w,v,u
z=this.b
y=G.dQ(z,!1,1,8,1,!0,0)
x=this.a
if($.ai.e.X(y))x.d=$.ai.dn(y)
else{z=G.cy(a,z,!1,8,0)
x.d=z
$.ai.e.k(0,y,z)}z=J.z(a)
w=J.I(z.gD(a),z.gC(a))
z=J.u(w)
if(z.T(w,1)){x.z=z.aa(w)
x.Q=w
x.ch=-1
x.cx=1}else{x.z=-1
x.Q=1
if(typeof w!=="number")return H.c(w)
x.ch=-1/w
x.cx=1/w}v=this.c
if(typeof v!=="number")return H.c(v)
u=Math.tan(H.T(0.017453292519943295*v/2))
z=z.q(w,w)
if(typeof z!=="number")return H.c(z)
x.cy=Math.cos(H.T(Math.atan(H.T(u*Math.sqrt(H.T(1+1/z))))))
this.d.bo(0)}},
hs:{
"^":"c1;d,e,f,r,a,b,c",
static:{yH:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=b.a1("I",G.F(1))
y=b.a1("scale",G.F(1))
x=b.j("coneangle",30)
w=b.j("conedeltaangle",5)
v=new G.t(new Float32Array(H.i(3)))
v.G(0,0,0)
u=b.aU("from",v)
v=new G.t(new Float32Array(H.i(3)))
v.G(0,0,1)
v=J.m(b.aU("to",v),u)
t=J.y(v)
s=t.au(v,t.S(v))
r=G.a5(0,0,0)
q=G.a5(0,0,0)
G.qT(s,r,q)
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
n=J.z(s)
k=G.a1(G.cA(p,o,v,0,m,l,t[2],0,n.gM(s),n.gK(s),n.gao(s),0,0,0,0,1),null)
n=J.z(u)
j=J.h(J.h(a,G.ef(G.a5(n.gM(u),n.gK(u),n.gao(u)))),G.a1(k.b,k.a))
n=J.h(z,y)
t=J.m(x,w)
l=P.O(1,1)
m=G.aR(j)
l=new O.hs(null,null,null,null,m,G.aR(G.a1(j.gah(),j.a)),l)
l.bX(j,1)
j=new G.t(new Float32Array(H.i(3)))
j.G(0,0,0)
l.d=m.ai(j)
l.e=n
if(typeof x!=="number")return H.c(x)
l.f=Math.cos(H.T(0.017453292519943295*x))
if(typeof t!=="number")return H.c(t)
l.r=Math.cos(H.T(0.017453292519943295*t))
return l},"$2","uU",4,0,64]}}}],["","",,D,{
"^":"",
fh:{
"^":"b1;a,b,c,d",
static:{xk:[function(a,b){return new D.fh(b.a_("Kr",G.F(1)),b.a_("Kt",G.F(1)),b.am("index",1.5),b.b2("bumpmap"))},"$2","v1",4,0,65]}},
fE:{
"^":"b1;a,b,c,d,e",
static:{xE:[function(a,b){var z,y,x
z=b.a_("Kd",G.F(0.5))
y=b.am("meanfreepath",1)
x=b.am("index",1.3)
return new D.fE(z,b.a_("Kr",G.F(1)),y,x,b.b2("bumpmap"))},"$2","v2",4,0,66]}},
fP:{
"^":"b1;a,b,c",
static:{xQ:[function(a,b){return new D.fP(b.a_("Kd",G.F(0.5)),b.am("sigma",0),b.b2("bumpmap"))},"$2","v3",4,0,67]}},
fQ:{
"^":"b1;a,b,c,d,e,f",
jy:function(a,b){var z,y,x
z=J.y(a)
y=z.dt(a,z.e_(a,".")).toLowerCase()
if(y.length===0){z="No suffix in measured BRDF filename \""+a+"\". Can't determine file type (.brdf / .merl)"
$.A.$2(2,z)
return}if(y===".brdf"){if($.$get$bD().X(a)){if(!!J.B($.$get$bD().h(0,a)).$isaO){$.$get$bD().h(0,a).at(new D.oh(this,a))
return}this.a=$.$get$bD().h(0,a)
return}x=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[null])),[null])
z=x.a
$.$get$bD().k(0,a,z)
$.ai.dg(a,!0,z).at(new D.oi(this,a,x))}else{this.c=90
this.d=90
this.e=180
if($.$get$c5().X(a)){if(!!J.B($.$get$c5().h(0,a)).$isaO){$.$get$c5().h(0,a).at(new D.oj(this,a))
return}this.b=$.$get$c5().h(0,a)
return}x=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[null])),[null])
z=x.a
$.$get$c5().k(0,a,z)
$.ai.dg(a,!0,z).at(new D.ok(this,a,x))}},
static:{og:function(a,b){var z=new D.fQ(null,null,null,null,null,b)
z.jy(a,b)
return z},xR:[function(a,b){var z=b.b2("bumpmap")
return D.og(b.c.bd("filename",b.d.bd("filename","")),z)},"$2","v4",4,0,68]}},
oh:{
"^":"r:0;a,b",
$1:function(a){this.a.a=$.$get$bD().h(0,this.b)}},
oi:{
"^":"r:0;a,b,c",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.b
y=G.hl(a,z)
if(0>=y.length)return H.a(y,0)
x=J.aH(y[0])
if(C.a.R(y.length-1-x,4+x)!==0){z="Excess or insufficient data in theta, phi BRDF file \""+z+"\""
$.A.$2(2,z)
this.c.bo(0)
return}w=H.i(x)
v=new Float32Array(w)
for(u=y.length,t=1,s=0;s<x;++s,t=r){r=t+1
if(t>=u)return H.a(y,t)
q=y[t]
if(s>=w)return H.a(v,s)
v[s]=q}p=G.a0(null,null)
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
if(w)H.K(H.N(l))
u=Math.sin(l)
if(w)H.K(H.N(l))
w=Math.cos(l)
q=typeof k!=="number"
if(q)H.K(H.N(k))
j=Math.cos(k)
if(q)H.K(H.N(k))
q=Math.sin(k)
i=new Float32Array(3)
if(0>=3)return H.a(i,0)
i[0]=u*j
if(1>=3)return H.a(i,1)
i[1]=u*q
if(2>=3)return H.a(i,2)
i[2]=w
w=typeof n!=="number"
if(w)H.K(H.N(n))
u=Math.sin(n)
if(w)H.K(H.N(n))
w=Math.cos(n)
q=typeof m!=="number"
if(q)H.K(H.N(m))
j=Math.cos(m)
if(q)H.K(H.N(m))
q=Math.sin(m)
h=new Float32Array(3)
if(0>=3)return H.a(h,0)
h[0]=u*j
if(1>=3)return H.a(h,1)
h[1]=u*q
if(2>=3)return H.a(h,2)
h[2]=w
g=G.F(0)
g.bU(v,y,t)
t+=x
f=G.lJ(new G.ac(i),new G.ac(h))
o.push(new G.nw(new G.t(new Float32Array(H.D(f.a))),G.bK(g,0)))
p=new G.ah(new G.t(new Float32Array(H.D(p.a.a))),new G.t(new Float32Array(H.D(p.b.a)))).ar(f)}w=$.$get$bD()
u=G.o0(o)
this.a.a=u
w.k(0,z,u)
this.c.bo(0)}},
oj:{
"^":"r:0;a,b",
$1:function(a){this.a.b=$.$get$c5().h(0,this.b)}},
ok:{
"^":"r:0;a,b,c",
$1:function(a){var z,y,x,w,v,u,t,s,r
z=U.S(a,!1,null,0)
y=z.t()
x=$.$get$b6()
x[0]=y
y=$.$get$cN()
if(0>=y.length)return H.a(y,0)
w=y[0]
x[0]=z.t()
if(0>=y.length)return H.a(y,0)
v=y[0]
x[0]=z.t()
if(0>=y.length)return H.a(y,0)
u=w*v*y[0]
y=this.a
x=y.c
t=y.d
if(typeof x!=="number")return x.q()
if(typeof t!=="number")return H.c(t)
s=y.e
if(typeof s!=="number")return H.c(s)
if(u!==x*t*s){$.A.$2(2,"Dimensions don't match")
this.c.bo(0)
return}y.b=new Float32Array(H.i(3*u))
y=y.e
if(typeof y!=="number")return H.c(y)
r=2*y
new Float32Array(H.i(r))
C.a.ak(u,r)
P.qn(1)}},
fR:{
"^":"b1;a,b,c,d",
static:{xU:[function(a,b){return new D.fR(b.a_("eta",$.$get$jm()),b.a_("k",$.$get$jl()),b.am("roughness",0.01),b.b2("bumpmap"))},"$2","v5",4,0,69]}},
fS:{
"^":"b1;a,b",
static:{xX:[function(a,b){return new D.fS(b.a_("Kr",G.F(0.9)),b.b2("bumpmap"))},"$2","v6",4,0,70]}},
h5:{
"^":"b1;a,b,c,d",
static:{yk:[function(a,b){return new D.h5(b.a_("Kd",G.F(0.25)),b.a_("Ks",G.F(0.25)),b.am("roughness",0.1),b.b2("bumpmap"))},"$2","v7",4,0,71]}},
hn:{
"^":"b1;a,b,c,d",
static:{yB:[function(a,b){var z=b.a_("Kr",G.F(1))
return new D.hn(b.a_("Ks",G.F(1)),z,b.am("roughness",0.1),b.b2("bumpmap"))},"$2","v8",4,0,72]}},
hy:{
"^":"b1;a,b,c,d,e",
static:{yJ:[function(a,b){return new D.hy(b.a_("Kd",G.F(0.5)),b.a_("Ks",G.F(0.5)),b.am("uroughness",0.1),b.am("vroughness",0.1),b.b2("bumpmap"))},"$2","v9",4,0,73]}},
hz:{
"^":"b1;a,b,c,d,e,f",
static:{yK:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=[0.0011,0.0024,0.014]
y=[2.55,3.21,3.77]
x=G.jT(z[0],z[1],z[2])
w=G.jT(y[0],y[1],y[2])
v=b.mT("name")
u=G.mR(v,x,w)
if(J.bx(v)&&!u){t="Named material '"+H.l(v)+"' not found.  Using defaults."
$.A.$2(1,t)}s=b.mR("scale",1)
r=b.a_("sigma_a",x)
q=b.a_("sigma_prime_s",w)
p=b.am("index",1.3)
return new D.hz(s,b.a_("Kr",G.F(1)),r,q,p,b.b2("bumpmap"))},"$2","va",4,0,74]}},
hC:{
"^":"b1;a,b,c,d,e,f",
static:{yS:[function(a,b){var z,y,x,w
z=b.a_("Kd",G.F(0.25))
y=b.a_("Ks",G.F(0.25))
x=b.a_("reflect",G.F(0.5))
w=b.a_("transmit",G.F(0.5))
return new D.hC(z,y,b.am("roughness",0.1),x,w,b.b2("bumpmap"))},"$2","vb",4,0,75]}},
hG:{
"^":"b1;a,b,c,d,e,f,r,x",
static:{yW:[function(a,b){var z,y,x,w,v,u
z=b.a_("Kd",G.F(0.25))
y=b.a_("Ks",G.F(0.25))
x=b.a_("Kr",G.F(0))
w=b.a_("Kt",G.F(0))
v=b.am("roughness",0.1)
u=b.am("index",1.5)
return new D.hG(z,y,x,w,b.a_("opacity",G.F(1)),v,u,b.b2("bumpmap"))},"$2","vc",4,0,76]}}}],["","",,F,{
"^":"",
fH:{
"^":"aK;e,f,a,b,c,d",
bs:function(a,b,c,d){var z,y,x,w,v,u
this.eh(a,b,c,d)
this.f=new Int32Array(H.i(J.h(J.h(c,d),2)))
for(b=this.b,z=0;y=J.u(b),y.a6(b,J.m(J.b(this.b,this.d),1));b=y.i(b,1))for(a=this.a;x=J.u(a),x.a6(a,J.m(J.b(this.a,this.c),1));a=x.i(a,1)){w=this.f
v=z+1
u=w.length
if(z<0||z>=u)return H.a(w,z)
w[z]=a
z=v+1
if(v<0||v>=u)return H.a(w,v)
w[v]=b}this.e=this.f.length/2|0},
bh:function(a,b){var z,y
a*=2
z=this.f
if(a>=z.length-1)return
J.n(b,0,z[a])
z=this.f
y=a+1
if(y>=z.length)return H.a(z,y)
y=z[y]
if(1>=b.length)return H.a(b,1)
b[1]=y},
static:{xI:[function(a){return new F.fH(null,null,null,null,null,null)},"$1","vf",2,0,77]}},
hi:{
"^":"aK;e,f,a,b,c,d",
bs:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o
this.eh(a,b,c,d)
this.f=new Int32Array(H.i(J.h(J.h(c,d),2)))
for(b=this.b,z=0;y=J.u(b),y.a6(b,J.m(J.b(this.b,this.d),1));b=y.i(b,1))for(a=this.a;x=J.u(a),x.a6(a,J.m(J.b(this.a,this.c),1));a=x.i(a,1)){w=this.f
v=z+1
u=w.length
if(z<0||z>=u)return H.a(w,z)
w[z]=a
z=v+1
if(v<0||v>=u)return H.a(w,v)
w[v]=b}t=new G.hh(P.i1(5489))
y=this.f.length/2|0
this.e=y
s=0
r=0
while(!0){if(typeof y!=="number")return H.c(y)
if(!(s<y))break
y=t.a.ih(4294967295)
x=this.e
if(typeof x!=="number")return H.c(x)
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
bh:function(a,b){var z,y
a*=2
z=this.f
if(a>=z.length-1)return
J.n(b,0,z[a])
z=this.f
y=a+1
if(y>=z.length)return H.a(z,y)
y=z[y]
if(1>=b.length)return H.a(b,1)
b[1]=y},
static:{ys:[function(a){return new F.hi(null,null,null,null,null,null)},"$1","vg",2,0,78]}},
dl:{
"^":"aK;e,f,r,x,a,b,c,d",
bs:function(a1,a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
this.eh(a1,a2,a3,a4)
z=J.G(a3)
y=z.q(a3,a4)
this.r=y
this.x=new Int32Array(H.i(J.h(y,2)))
y=this.e
z=z.ak(a3,y)
if(typeof a3!=="number")return a3.R()
if(typeof y!=="number")return H.c(y)
x=J.b(z,C.b.R(a3,y)===0?0:1)
z=J.u(a4).ak(a4,y)
if(typeof a4!=="number")return a4.R()
w=J.b(z,C.b.R(a4,y)===0?0:1)
z=H.i(J.h(J.h(x,w),2))
v=new Int32Array(z)
if(typeof w!=="number")return H.c(w)
u=0
t=0
for(;u<w;++u){if(typeof x!=="number")return H.c(x)
s=0
for(;s<x;++s){r=t+1
if(t<0||t>=z)return H.a(v,t)
v[t]=s
t=r+1
if(r<0||r>=z)return H.a(v,r)
v[r]=u}}q=z/2|0
if(this.f===!0){p=new G.hh(P.i1(5489))
for(t=1;t<q;++t){o=t*2
n=o+1
m=C.a.R(p.a.ih(4294967295),q)*2
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
f=J.b(this.a,h*y)
e=J.b(this.b,g*y)
for(d=J.G(f),c=J.G(e),u=0;u<y;++u){a2=c.i(e,u)
if(J.V(a2,J.m(J.b(this.b,this.d),1)))break
for(s=0;s<y;++s){a1=d.i(f,s)
if(J.V(a1,J.m(J.b(this.a,this.c),1)))break
b=this.x
a=j+1
a0=b.length
if(j<0||j>=a0)return H.a(b,j)
b[j]=a1
j=a+1
if(a<0||a>=a0)return H.a(b,a)
b[a]=a2}}}},
bh:function(a,b){var z,y
a*=2
z=this.x
if(a>=z.length-1)return
J.n(b,0,z[a])
z=this.x
y=a+1
if(y>=z.length)return H.a(z,y)
y=z[y]
if(1>=b.length)return H.a(b,1)
b[1]=y},
static:{yQ:[function(a){return new F.dl(a.N("tilesize",32),a.bC("randomize",!0),null,null,null,null,null,null)},"$1","vh",2,0,79]}}}],["","",,U,{
"^":"",
eS:{
"^":"cH;x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d,e,f,r",
static:{wg:[function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p
z=a.N("minsamples",4)
y=a.N("maxsamples",32)
x=a.aV("method","contrast")
w=J.B(x)
if(w.A(x,"contrast"))v=1
else v=w.A(x,"shapeid")?0:-1
if(v===-1){w="Adaptive sampling metric '"+H.l(x)+"' unknown. Using 'contrast'."
$.A.$2(1,w)}w=f.gbW()
u=f.gbV()
t=new Int32Array(H.i(2))
s=new U.eS(g,t,null,null,null,null,null,null,null,null,b,c,d,e,w,u,G.b4(P.O(z,y)))
if(g==null)$.A.$2(3,"A PixelSampler is required by AdaptiveSampler")
g.bs(b,c,d,e)
s.z=0
s.db=!1
g.bh(0,t)
if(J.V(z,y)){r=z
q=y}else{r=y
q=z}t=J.u(q)
if(t.L(q,t.p(q,1))!==0){$.A.$2(1,"Minimum pixel samples being rounded up to power of 2")
t=G.b4(q)
s.Q=t}else{s.Q=q
t=q}p=J.u(r)
if(p.L(r,p.p(r,1))!==0){$.A.$2(1,"Maximum pixel samples being rounded up to power of 2")
p=G.b4(r)
s.ch=p}else{s.ch=r
p=r}if(typeof t!=="number")return t.I()
if(t<2){$.A.$2(1,"Adaptive sampler needs at least two initial pixel samples. Using two.")
s.Q=2
t=2}if(t===p){p=J.h(p,2)
s.ch=p
p="Adaptive sampler must have more maximum samples than minimum. Using "+H.l(t)+" - "+H.l(p)
$.A.$2(1,p)}s.dy=0
if(G.bh()===1||G.bh()===2)s.dx=U.cG(b,c,d,e,w,u,g,1)
return s},"$7","vi",14,0,80]}},
eW:{
"^":"cH;x,y,z,Q,ch,cx,cy,db,dx,dy,fr,a,b,c,d,e,f,r",
j1:function(a,b,c,d,e,f,g){var z,y,x,w,v
z=64/Math.sqrt(H.T(g))
this.x=z
this.z=J.Y(J.I(this.a,z))
this.Q=J.Y(J.I(J.m(J.b(this.a,this.c),1),this.x))
this.ch=J.Y(J.I(this.b,this.x))
this.cx=J.Y(J.I(J.m(J.b(this.b,this.d),1),this.x))
z=this.z
this.cy=z
y=this.ch
this.db=y
this.y=0
if(typeof y!=="number")return y.n()
x=new G.hh(P.i1(z+(y<<8>>>0)))
for(z=this.dx,w=0;w<3;++w)z[w]=x.a.nm()
this.fr=0
if(G.bh()===1||G.bh()===2){v=new F.dl(32,!0,null,null,null,null,null,null)
v.bs(a,b,c,d)
this.dy=U.cG(a,b,c,d,e,f,v,1)}},
static:{lP:function(a,b,c,d,e,f,g){var z=new U.eW(null,null,null,null,null,null,null,null,[0,0,0],null,null,a,b,c,d,e,f,g)
z.j1(a,b,c,d,e,f,g)
return z},wn:[function(a,b,c,d,e,f,g){var z=a.N("pixelsamples",4)
return U.lP(b,c,d,e,f.gbW(),f.gbV(),z)},"$7","vj",14,0,122]}},
fm:{
"^":"cH;x,y,z,Q,a,b,c,d,e,f,r",
jg:function(a,b,c,d,e,f,g){var z,y
z=P.O(c,d)
this.x=J.h(J.h(this.r,z),z)
this.y=0
this.Q=0
if(G.bh()===1||G.bh()===2){y=new F.dl(32,!0,null,null,null,null,null,null)
y.bs(a,b,c,d)
this.z=U.cG(a,b,c,d,e,f,y,1)}},
static:{n2:function(a,b,c,d,e,f,g){var z=new U.fm(null,null,null,null,a,b,c,d,e,f,g)
z.jg(a,b,c,d,e,f,g)
return z},xo:[function(a,b,c,d,e,f,g){var z=a.N("pixelsamples",4)
return U.n2(b,c,d,e,f.gbW(),f.gbV(),z)},"$7","vk",14,0,82]}},
fL:{
"^":"cH;x,y,z,Q,ch,cx,cy,a,b,c,d,e,f,r",
ju:function(a,b,c,d,e,f,g,h){var z,y
z=this.x
if(z==null)$.A.$2(3,"A PixelSampler is required by LowDiscrepencySampler")
z.bs(a,b,c,d)
this.z=0
y=J.u(h)
if(y.L(h,y.p(h,1))!==0){this.Q=G.b4(h)
y="Pixel samples being rounded up to power of 2: "+H.l(h)+" => "+H.l(this.Q)
$.A.$2(1,y)}else this.Q=h
this.ch=null
this.cy=0
if(G.bh()===1||G.bh()===2)this.cx=U.cG(a,b,c,d,e,f,z,1)},
static:{oc:function(a,b,c,d,e,f,g,h){var z=new U.fL(g,new Int32Array(H.i(2)),null,null,null,null,null,a,b,c,d,e,f,G.b4(h))
z.ju(a,b,c,d,e,f,g,h)
return z},xK:[function(a,b,c,d,e,f,g){var z=a.N("pixelsamples",4)
return U.oc(b,c,d,e,f.gbW(),f.gbV(),g,z)},"$7","vl",14,0,83]}},
hj:{
"^":"cH;x,y,z,Q,a,b,c,d,e,f,r",
jG:function(a,b,c,d,e,f,g,h){var z=this.x
if(z==null)$.A.$2(3,"A PixelSampler is required by RandomSampler")
z.bs(a,b,c,d)
this.z=0
this.Q=0},
static:{cG:function(a,b,c,d,e,f,g,h){var z=new U.hj(g,new Int32Array(H.i(2)),null,null,a,b,c,d,e,f,h)
z.jG(a,b,c,d,e,f,g,h)
return z},yt:[function(a,b,c,d,e,f,g){var z=a.N("pixelsamples",10)
return U.cG(b,c,d,e,f.gbW(),f.gbV(),g,z)},"$7","vm",14,0,84]}},
hx:{
"^":"cH;x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,a,b,c,d,e,f,r",
static:{yI:[function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s
z=a.bC("jitter",!0)
y=a.N("pixelsamples",null)
if(y!=null){x=y
w=x}else{w=a.N("xsamples",2)
x=a.N("ysamples",2)}v=f.gbW()
u=f.gbV()
t=new U.hx(null,null,null,z,g,new Int32Array(H.i(2)),null,null,null,null,null,null,b,c,d,e,v,u,J.h(w,x))
if(g==null)$.A.$2(3,"A PixelSampler is required by StratifiedSampler")
g.bs(b,c,d,e)
t.cy=0
t.x=w
t.y=x
s=J.h(w,x)
t.z=s
if(typeof s!=="number")return H.c(s)
t.db=new Float32Array(H.i(2*s))
t.dx=new Float32Array(H.i(2*s))
t.dy=new Float32Array(H.i(J.h(w,x)))
t.fx=0
if(G.bh()===1||G.bh()===2)t.fr=U.cG(b,c,d,e,v,u,g,1)
return t},"$7","vn",14,0,85]}}}],["","",,M,{
"^":"",
f0:{
"^":"aW;f,C:r>,x,a,b,c,d,e",
bf:function(){var z,y,x,w,v
z=this.f
y=J.u(z)
x=y.aa(z)
y=y.aa(z)
w=new G.t(new Float32Array(H.i(3)))
w.G(x,y,0)
y=this.r
v=new G.t(new Float32Array(H.i(3)))
v.G(z,z,y)
return G.a0(w,v)},
bL:function(){var z,y,x
z=this.f
y=this.r
x=J.G(z)
return J.I(J.h(x.q(z,Math.sqrt(H.T(J.b(J.h(y,y),x.q(z,z))))),this.x),2)},
static:{wB:[function(a,b,c,d){var z,y,x,w,v
z=d.j("radius",1)
y=d.j("height",1)
x=d.j("phimax",360)
w=$.al
$.al=w+1
w=new M.f0(z,y,null,a,b,c,!1,w)
v=J.P(x,0,360)
if(typeof v!=="number")return H.c(v)
w.x=0.017453292519943295*v
return w},"$4","vo",8,0,86]}},
f1:{
"^":"aW;f,r,x,y,a,b,c,d,e",
bf:function(){var z,y,x,w,v,u
z=this.f
y=J.u(z)
x=y.aa(z)
y=y.aa(z)
w=this.r
v=new G.t(new Float32Array(H.i(3)))
v.G(x,y,w)
w=this.x
u=new G.t(new Float32Array(H.i(3)))
u.G(z,z,w)
return G.a0(v,u)},
bL:function(){var z,y,x,w
z=this.x
y=this.r
x=this.y
w=this.f
if(typeof w!=="number")return H.c(w)
return(z-y)*x*w},
static:{wE:[function(a,b,c,d){var z,y,x,w,v,u
z=d.j("radius",1)
y=d.j("zmin",-1)
x=d.j("zmax",1)
w=d.j("phimax",360)
v=$.al
$.al=v+1
v=new M.f1(z,null,null,null,a,b,c,!1,v)
v.r=P.a6(y,x)
v.x=P.O(y,x)
u=J.P(w,0,360)
if(typeof u!=="number")return H.c(u)
v.y=0.017453292519943295*u
return v},"$4","vp",8,0,87]}},
f6:{
"^":"aW;C:f>,r,x,y,a,b,c,d,e",
bf:function(){var z,y,x,w,v
z=this.r
y=J.u(z)
x=y.aa(z)
y=y.aa(z)
w=this.f
v=new G.t(new Float32Array(H.i(3)))
v.G(x,y,w)
w=this.f
y=new G.t(new Float32Array(H.i(3)))
y.G(z,z,w)
return G.a0(v,y)},
bL:function(){var z,y
z=this.r
y=this.x
return J.h(J.h(this.y,0.5),J.m(J.h(z,z),J.h(y,y)))},
static:{wJ:[function(a,b,c,d){var z,y,x,w,v,u
z=d.j("height",0)
y=d.j("radius",1)
x=d.j("innerradius",0)
w=d.j("phimax",360)
v=$.al
$.al=v+1
v=new M.f6(z,y,x,w,a,b,c,!1,v)
u=J.P(w,0,360)
if(typeof u!=="number")return H.c(u)
v.y=0.017453292519943295*u
return v},"$4","vq",8,0,88]}},
fn:{
"^":"aW;ao:f*,r,x,a,b,c,d,e",
b5:function(){return!1},
cb:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=J.m(this.r,1)
if(typeof z!=="number")return H.c(z)
y=J.m(this.x,1)
if(typeof y!=="number")return H.c(y)
y=H.i(3*(2*z*y))
x=new Uint32Array(y)
z=J.h(this.r,this.x)
if(typeof z!=="number")return H.c(z)
z=Array(z)
z.fixed$length=Array
w=H.p(z,[G.t])
z=this.r
if(typeof z!=="number")return H.c(z)
v=this.x
if(typeof v!=="number")return H.c(v)
v=H.i(2*z*v)
u=new Float32Array(v)
J.h(this.r,this.x)
z=w.length
t=0
s=0
r=0
while(!0){q=this.x
if(typeof q!=="number")return H.c(q)
if(!(t<q))break
p=0
while(!0){q=this.r
if(typeof q!=="number")return H.c(q)
if(!(p<q))break
if(r<0||r>=v)return H.a(u,r)
u[r]=p/(q-1)
q=r+1
o=J.m(this.x,1)
if(typeof o!=="number")return H.c(o)
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
w[s]=new G.t(m);++p;++s
r+=2}++t}z=new M.n5(this)
l=0
t=0
while(!0){v=J.m(this.x,1)
if(typeof v!=="number")return H.c(v)
if(!(t<v))break
k=t+1
p=0
while(!0){v=J.m(this.r,1)
if(typeof v!=="number")return H.c(v)
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
p=i}t=k}h=new G.q([],[],[],[],[],[],[],[],[])
h.f0("indices",x)
h.hW("uv",u)
h.f1("P",w)
a.push(M.eg(this.a,this.b,this.c,h,null))},
bf:function(){var z,y,x,w,v
z=J.e(this.f,0)
y=J.e(this.f,0)
x=1
while(!0){w=J.h(this.r,this.x)
if(typeof w!=="number")return H.c(w)
if(!(x<w))break
if(J.a7(J.e(this.f,x),z))z=J.e(this.f,x)
if(J.V(J.e(this.f,x),y))y=J.e(this.f,x);++x}w=new G.t(new Float32Array(H.i(3)))
w.G(0,0,z)
v=new G.t(new Float32Array(H.i(3)))
v.G(1,1,y)
return G.a0(w,v)},
static:{xp:[function(a,b,c,d){var z,y,x,w
z=d.N("nu",-1)
y=d.N("nv",-1)
x=d.bc("Pz")
w=$.al
$.al=w+1
return new M.fn(x,z,y,a,b,c,!1,w)},"$4","vr",8,0,89]}},
n5:{
"^":"r:6;a",
$2:function(a,b){var z=this.a.r
if(typeof z!=="number")return H.c(z)
return a+b*z}},
fq:{
"^":"aW;f,r,x,y,z,Q,ch,an:cx<,a,b,c,d,e",
bf:function(){var z,y,x,w
z=-this.Q
y=this.x
x=new G.t(new Float32Array(H.i(3)))
x.G(z,z,y)
y=this.Q
z=this.y
w=new G.t(new Float32Array(H.i(3)))
w.G(y,y,z)
return G.a0(x,w)},
bL:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=new M.nc()
y=new M.nb()
x=this.z
w=y.$1(J.ao(this.f))
if(typeof w!=="number")return H.c(w)
v=J.ao(this.f)
if(typeof v!=="number")return H.c(v)
u=J.ao(this.f)
if(typeof u!=="number")return H.c(u)
t=J.ao(this.f)
if(typeof t!=="number")return H.c(t)
s=J.ao(this.r)
if(typeof s!=="number")return H.c(s)
y=y.$1(J.ao(this.r))
if(typeof y!=="number")return H.c(y)
r=J.b(J.b(J.h(J.a8(this.f),J.a8(this.f)),J.h(J.a8(this.f),J.a8(this.r))),J.h(J.a8(this.r),J.a8(this.r)))
if(typeof r!=="number")return H.c(r)
q=J.b(z.$1(J.m(J.a8(this.f),J.a8(this.r))),z.$1(J.m(J.ag(this.f),J.ag(this.r))))
if(typeof q!=="number")return H.c(q)
p=J.h(J.ao(this.r),J.ao(this.r))
o=J.a8(this.f)
if(typeof o!=="number")return H.c(o)
n=J.a8(this.f)
if(typeof n!=="number")return H.c(n)
m=J.a8(this.f)
if(typeof m!=="number")return H.c(m)
l=J.a8(this.r)
if(typeof l!=="number")return H.c(l)
k=J.a8(this.r)
if(typeof k!=="number")return H.c(k)
j=J.a8(this.r)
if(typeof j!=="number")return H.c(j)
i=z.$1(J.m(J.ag(this.f),J.ag(this.r)))
if(typeof i!=="number")return H.c(i)
i=J.h(p,5*o*n+2*m*l-4*k*j+2*i)
if(typeof i!=="number")return H.c(i)
j=J.h(J.ao(this.f),J.ao(this.f))
k=J.a8(this.f)
if(typeof k!=="number")return H.c(k)
l=J.a8(this.f)
if(typeof l!=="number")return H.c(l)
m=J.a8(this.f)
if(typeof m!=="number")return H.c(m)
n=J.a8(this.r)
if(typeof n!=="number")return H.c(n)
o=J.a8(this.r)
if(typeof o!=="number")return H.c(o)
p=J.a8(this.r)
if(typeof p!=="number")return H.c(p)
z=z.$1(J.m(J.ag(this.f),J.ag(this.r)))
if(typeof z!=="number")return H.c(z)
z=J.h(j,-4*k*l+2*m*n+5*o*p+2*z)
if(typeof z!=="number")return H.c(z)
p=J.ao(this.f)
if(typeof p!=="number")return H.c(p)
o=J.ao(this.r)
if(typeof o!=="number")return H.c(o)
n=J.m(J.h(J.ao(this.r),J.ao(this.r)),J.h(J.a8(this.f),J.a8(this.f)))
m=J.a8(this.f)
if(typeof m!=="number")return H.c(m)
l=J.a8(this.r)
if(typeof l!=="number")return H.c(l)
l=J.m(J.m(J.b(n,5*m*l),J.h(J.a8(this.r),J.a8(this.r))),J.h(J.ag(this.f),J.ag(this.f)))
m=J.ag(this.f)
if(typeof m!=="number")return H.c(m)
n=J.ag(this.r)
if(typeof n!=="number")return H.c(n)
n=J.m(J.b(l,2*m*n),J.h(J.ag(this.r),J.ag(this.r)))
if(typeof n!=="number")return H.c(n)
return x/6*(2*w-2*v*u*t*s+2*y+2*r*q+i+z-2*p*o*n)},
jj:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q
this.Q=P.O(Math.sqrt(H.T(J.b(J.h(J.ao(this.f),J.ao(this.f)),J.h(J.a8(this.f),J.a8(this.f))))),Math.sqrt(H.T(J.b(J.h(J.ao(this.r),J.ao(this.r)),J.h(J.a8(this.r),J.a8(this.r))))))
this.x=P.a6(J.ag(this.f),J.ag(this.r))
this.y=P.O(J.ag(this.f),J.ag(this.r))
z=J.P(f,0,360)
if(typeof z!=="number")return H.c(z)
this.z=0.017453292519943295*z
if(J.k(J.ag(this.r),0)){y=this.f
this.f=this.r
this.r=y}x=new G.t(new Float32Array(H.D(J.L(this.f))))
do{x=x.i(0,J.h(J.m(this.r,this.f),2))
z=x.a
w=z.length
if(0>=w)return H.a(z,0)
v=z[0]
if(1>=w)return H.a(z,1)
u=z[1]
t=v*v+u*u
s=J.b(J.h(J.ao(this.r),J.ao(this.r)),J.h(J.a8(this.r),J.a8(this.r)))
if(2>=w)return H.a(z,2)
w=z[2]
u=J.ag(this.r)
if(typeof u!=="number")return H.c(u)
v=J.ag(this.r)
if(typeof v!=="number")return H.c(v)
z=J.h(J.h(s,z[2]),z[2])
r=J.ag(this.r)
if(typeof r!=="number")return H.c(r)
q=J.ag(this.r)
if(typeof q!=="number")return H.c(q)
q=J.I(z,t*r*q)
if(typeof q!=="number")return H.c(q)
q=(1/t-w*w/(t*u*v))/(1-q)
this.ch=q
if(typeof s!=="number")return H.c(s)
v=J.h(J.ag(this.r),J.ag(this.r))
if(typeof v!=="number")return H.c(v)
this.cx=(q*s-1)/v
z=this.ch
z.toString}while(z==1/0||z==-1/0||isNaN(z))},
static:{na:function(a,b,c,d,e,f){var z=$.al
$.al=z+1
z=new M.fq(d,e,null,null,null,null,null,null,a,b,c,!1,z)
z.jj(a,b,c,d,e,f)
return z},xs:[function(a,b,c,d){var z,y
z=new G.t(new Float32Array(H.i(3)))
z.G(0,0,0)
y=d.aU("p1",z)
z=new G.t(new Float32Array(H.i(3)))
z.G(1,1,1)
return M.na(a,b,c,y,d.aU("p2",z),d.j("phimax",360))},"$4","vs",8,0,90]}},
nc:{
"^":"r:0;",
$1:function(a){return J.h(a,a)}},
nb:{
"^":"r:0;",
$1:function(a){return J.h(J.h(J.h(a,a),a),a)}},
fJ:{
"^":"aW;f,r,x,a,b,c,d,e",
b5:function(){return!1},
cb:function(a8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
z=this.x
y=this.r
x=this.f
if(typeof x!=="number")return H.c(x)
w=0
for(;w<x;++w,y=u,z=v){v=[]
u=[]
for(t=0;t<y.length;++t){s=y[t]
r=new M.eD(null,null,null,!1,!1)
s.c=r
r.d=s.d
r.e=s.e
u.push(r)}for(t=0;t<z.length;++t)for(q=0;q<4;++q){if(t>=z.length)return H.a(z,t)
J.n(J.cn(z[t]),q,new M.i2([null,null,null],[null,null,null],[null,null,null,null]))
if(t>=z.length)return H.a(z,t)
v.push(J.e(J.cn(z[t]),q))}for(t=0;t<y.length;++t){s=y[t]
if(!s.e)if(s.d)s.c.a=M.fK(s,0.0625)
else s.c.a=M.fK(s,M.jf(s.cK()))
else s.c.a=M.jg(s,0.125)}s=P.Z()
p=new M.kL(s)
for(t=0;t<z.length;++t){o=z[t]
for(q=0;q<3;q=m){n=J.e(o.gaD(),q)
m=q+1
l=J.e(o.gaD(),C.a.R(m,3))
if(p.eg(n,l)==null){k=new M.eD(null,null,null,!1,!1)
u.push(k)
k.d=!0
k.e=J.e(o.gbq(),q)==null
k.b=J.e(J.cn(o),3)
if(k.e)k.a=J.b(J.h(n.gbj(),0.5),J.h(l.gbj(),0.5))
else{r=J.b(J.h(n.gbj(),0.375),J.h(l.gbj(),0.375))
k.a=r
r=J.b(r,J.h(o.io(n,l).gbj(),0.125))
k.a=r
j=o.b
if(q>=j.length)return H.a(j,q)
k.a=J.b(r,J.h(j[q].io(n,l).gbj(),0.125))}if(!s.X(n))s.k(0,n,P.c2(null,null,null,null,null))
J.n(s.h(0,n),l,k)}}}for(t=0;t<y.length;++t){k=y[t]
i=k.b.bF(k)
k.c.b=J.e(J.cn(k.b),i)}for(t=0;t<z.length;++t){o=z[t]
for(s=J.z(o),q=0;q<3;q=m){r=J.e(s.gaz(o),3).gbq()
j=s.gaz(o)
m=q+1
h=C.a.R(m,3)
J.n(r,q,J.e(j,h))
J.n(J.e(s.gaz(o),q).gbq(),h,J.e(s.gaz(o),3))
g=J.e(o.gbq(),q)
h=J.e(s.gaz(o),q).gbq()
J.n(h,q,g!=null?J.e(J.cn(g),g.bF(J.e(o.gaD(),q))):null)
r=o.gbq()
j=C.a.R(q+2,3)
g=J.e(r,j)
r=J.e(s.gaz(o),q).gbq()
J.n(r,j,g!=null?J.e(J.cn(g),g.bF(J.e(o.gaD(),q))):null)}}for(t=0;t<z.length;++t){o=z[t]
for(s=J.z(o),q=0;q<3;q=m){J.n(J.e(s.gaz(o),q).gaD(),q,J.e(o.gaD(),q).gmp())
n=J.e(o.gaD(),q)
r=o.gaD()
m=q+1
j=C.a.R(m,3)
k=p.eg(n,J.e(r,j))
J.n(J.e(s.gaz(o),q).gaD(),j,k)
J.n(J.e(s.gaz(o),j).gaD(),q,k)
J.n(J.e(s.gaz(o),3).gaD(),q,k)}}}x=Array(y.length)
x.fixed$length=Array
f=H.p(x,[G.t])
for(x=f.length,w=0;s=y.length,w<s;++w){s=y[w]
if(s.e){s=M.jg(s,0.2)
if(w>=x)return H.a(f,w)
f[w]=s}else{r=s.cK()
r=M.fK(s,1/(r+3/(8*M.jf(r))))
if(w>=x)return H.a(f,w)
f[w]=r}}for(w=0;w<s;++w){r=y[w]
if(w>=x)return H.a(f,w)
r.a=f[w]}e=[]
d=H.p([],[G.t])
C.e.sm(d,16)
for(w=0;w<y.length;++w){k=y[w]
x=new Float32Array(3)
c=new G.ac(x)
if(0>=3)return H.a(x,0)
x[0]=0
if(1>=3)return H.a(x,1)
x[1]=0
if(2>=3)return H.a(x,2)
x[2]=0
x=new Float32Array(3)
b=new G.ac(x)
if(0>=3)return H.a(x,0)
x[0]=0
if(1>=3)return H.a(x,1)
x[1]=0
if(2>=3)return H.a(x,2)
x[2]=0
a=k.cK()
if(a>d.length)C.e.sm(d,a)
k.im(d,0)
if(!k.e)for(q=0;q<a;++q){if(q>=d.length)return H.a(d,q)
x=d[q]
s=6.283185307179586*q/a
c=c.i(0,J.h(x,Math.cos(s)))
if(q>=d.length)return H.a(d,q)
x=d[q]
b=b.i(0,J.h(x,Math.sin(s)))}else{x=a-1
s=d.length
if(x<0||x>=s)return H.a(d,x)
r=d[x]
if(0>=s)return H.a(d,0)
c=J.m(r,d[0])
if(a===2){x=d.length
if(0>=x)return H.a(d,0)
s=d[0]
if(1>=x)return H.a(d,1)
b=J.m(J.b(s,d[1]),J.h(k.a,2))}else if(a===3){if(1>=d.length)return H.a(d,1)
b=J.m(d[1],k.a)}else{s=d.length
r=d[0]
if(a===4){if(0>=s)return H.a(d,0)
x=J.h(r,-1)
if(1>=d.length)return H.a(d,1)
x=J.b(x,J.h(d[1],2))
if(2>=d.length)return H.a(d,2)
x=J.b(x,J.h(d[2],2))
if(3>=d.length)return H.a(d,3)
b=J.b(J.b(x,J.h(d[3],-1)),J.h(k.a,-2))}else{a0=3.141592653589793/x
if(0>=s)return H.a(d,0)
if(x>=s)return H.a(d,x)
s=J.b(r,d[x])
b=J.h(s,Math.sin(a0))
for(q=1;q<x;++q){s=Math.cos(a0)
r=Math.sin(q*a0)
if(q>=d.length)return H.a(d,q)
b=J.b(b,J.h(d[q],(2*s-2)*r))}b=J.bd(b)}}}e.push(new G.b9(new Float32Array(H.D(G.dr(c,b).a))))}a1=z.length
x=H.i(3*a1)
a2=new Uint32Array(x)
a3=y.length
a4=P.Z()
for(w=0;w<a3;++w){if(w>=y.length)return H.a(y,w)
a4.k(0,y[w],w)}for(a5=0,w=0;w<a1;++w)for(t=0;t<3;++t,a5=a6){a6=a5+1
if(w>=z.length)return H.a(z,w)
s=a4.h(0,J.e(z[w].gaD(),t))
if(a5<0||a5>=x)return H.a(a2,a5)
a2[a5]=s}a7=new G.q([],[],[],[],[],[],[],[],[])
a7.f0("indices",a2)
a7.f1("P",f)
a7.hX("N",e)
a8.push(M.eg(this.a,this.b,this.c,a7,null))},
bf:function(){var z,y,x,w,v
z=G.a0(null,null)
for(y=this.r,x=y.length,w=0;w<x;++w){v=y[w].a
z=new G.ah(new G.t(new Float32Array(H.D(z.a.a))),new G.t(new Float32Array(H.D(z.b.a)))).ar(v)}return z},
aI:function(){var z,y,x,w,v,u
z=G.a0(null,null)
for(y=this.r,x=y.length,w=this.a,v=0;v<x;++v){u=w.ai(y[v].a)
z=new G.ah(new G.t(new Float32Array(H.D(z.a.a))),new G.t(new Float32Array(H.D(z.b.a)))).ar(u)}return z},
jt:function(a,b,c,d,e,f,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
if(typeof e!=="number")return H.c(e)
z=this.r
y=J.y(a0)
x=z.length
w=0
for(;w<e;++w){v=y.h(a0,w)
if(w>=x)return H.a(z,w)
z[w]=new M.eD(v,null,null,!1,!1)}if(typeof d!=="number")return H.c(d)
y=this.x
v=y.length
u=J.y(f)
w=0
t=0
for(;w<d;++w,t=q){s=[null,null,null]
r=new M.i2(s,[null,null,null],[null,null,null,null])
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
o.b=r}u=P.Z()
n=new M.kL(u)
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
h=n.eg(l,i)
if(h==null){s=[null,null]
p=[null,null]
h=new M.rY(s,p,null)
j=s.length
if(0>=j)return H.a(s,0)
s[0]=l
if(1>=j)return H.a(s,1)
s[1]=i
h.c=-1
if(0>=p.length)return H.a(p,0)
p[0]=r
h.c=m
if(!u.X(l))u.k(0,l,P.c2(null,null,null,null,null))
J.n(u.h(0,l),i,h)}else{J.n(J.e(h.gbq(),0).gbq(),h.gmQ(),r)
s=r.b
p=h.b
if(0>=p.length)return H.a(p,0)
p=p[0]
if(m>=s.length)return H.a(s,m)
s[m]=p}}}for(w=0;w<e;++w){if(w>=x)return H.a(z,w)
o=z[w]
r=o.b
do{r=r.e2(o)
y=r==null}while(!y&&!J.k(r,o.b))
o.e=y
g=o.cK()
y=o.e
if(!y&&g===6)o.d=!0
else if(y&&g===4)o.d=!0
else o.d=!1}},
static:{ob:function(a,b,c,d,e,f,g,h){var z,y,x
if(typeof e!=="number")return H.c(e)
z=H.p(Array(e),[M.eD])
if(typeof d!=="number")return H.c(d)
y=H.p(Array(d),[M.i2])
x=$.al
$.al=x+1
x=new M.fJ(h,z,y,a,b,c,!1,x)
x.jt(a,b,c,d,e,f,g,h)
return x},jf:function(a){if(a===3)return 0.1875
return 3/(8*a)},fK:function(a,b){var z,y,x,w
z=a.cK()
y=Array(z)
y.$builtinTypeInfo=[G.t]
a.il(y)
x=J.h(a.a,1-z*b)
for(w=0;w<z;++w)x=J.b(x,J.h(y[w],b))
return x},jg:function(a,b){var z,y,x,w
z=a.cK()
y=Array(z)
y.$builtinTypeInfo=[G.t]
a.il(y)
x=J.h(a.a,1-2*b)
if(0>=z)return H.a(y,0)
x=J.b(x,J.h(y[0],b))
w=z-1
if(w<0)return H.a(y,w)
return J.b(x,J.h(y[w],b))},xJ:[function(a,b,c,d){var z,y,x
z=d.N("nlevels",1)
y=d.i9("indices")
x=d.fd("P")
if(y==null||x==null)return
return M.ob(a,b,c,J.av(J.M(y),3),J.M(x),y,x,z)},"$4","vt",8,0,91]}},
kL:{
"^":"j;a",
eg:function(a,b){var z=this.a
if(z.X(a))if(z.h(0,a).X(b))return z.h(0,a).h(0,b)
if(z.X(b))if(z.h(0,b).X(a))return z.h(0,b).h(0,a)
return}},
eD:{
"^":"j;bj:a<,b,mp:c<,d,e",
cK:function(){var z,y
z=this.b
if(!this.e){for(y=1;z=z.e2(this),!J.k(z,this.b);)++y
return y}else{for(y=1;z=z.e2(this),z!=null;)++y
z=this.b
for(;z=z.ns(this),z!=null;)++y
return y+1}},
im:function(a,b){var z,y,x,w,v
z=this.e
y=this.b
if(!z){do{x=b+1
z=y.ii(this).gbj()
if(b>=a.length)return H.a(a,b)
a[b]=z
z=y.b
w=y.bF(this)
if(w<0||w>=z.length)return H.a(z,w)
y=z[w]
if(!J.k(y,this.b)){b=x
continue}else break}while(!0)}else{for(;v=y.e2(this),v!=null;y=v);x=b+1
z=y.ii(this).gbj()
if(b>=a.length)return H.a(a,b)
a[b]=z
b=x
do{x=b+1
z=y.nt(this).gbj()
if(b>=a.length)return H.a(a,b)
a[b]=z
z=y.b
w=C.a.R(y.bF(this)+2,3)
if(w>=z.length)return H.a(z,w)
y=z[w]
if(y!=null){b=x
continue}else break}while(!0)}},
il:function(a){return this.im(a,0)}},
i2:{
"^":"j;aD:a<,bq:b<,az:c>",
bF:function(a){var z,y
for(z=this.a,y=0;y<3;++y){if(y>=z.length)return H.a(z,y)
if(J.k(z[y],a))return y}$.A.$2(3,"Basic logic error in SDFace::vnum()")
return-1},
e2:function(a){var z,y
z=this.b
y=this.bF(a)
if(y<0||y>=z.length)return H.a(z,y)
return z[y]},
ns:function(a){var z,y
z=this.b
y=C.a.R(this.bF(a)+2,3)
if(y>=z.length)return H.a(z,y)
return z[y]},
ii:function(a){var z,y
z=this.a
y=C.a.R(this.bF(a)+1,3)
if(y>=z.length)return H.a(z,y)
return z[y]},
nt:function(a){var z,y
z=this.a
y=C.a.R(this.bF(a)+2,3)
if(y>=z.length)return H.a(z,y)
return z[y]},
io:function(a,b){var z,y,x
for(z=this.a,y=0;y<3;++y){if(y>=z.length)return H.a(z,y)
if(!J.k(z[y],a)){if(y>=z.length)return H.a(z,y)
x=!J.k(z[y],b)}else x=!1
if(x){if(y>=z.length)return H.a(z,y)
return z[y]}}$.A.$2(3,"Basic logic error in SDVertex::otherVert()")
return}},
rY:{
"^":"j;aD:a<,bq:b<,mQ:c<"},
fY:{
"^":"aW;f,r,x,y,z,Q,ch,cx,cy,db,dx,bj:dy<,a,b,c,d,e",
bf:function(){var z,y,x,w,v,u,t,s,r,q
if(!this.dx){z=G.a0(null,null)
y=this.f
x=this.x
w=J.G(y)
v=0
u=0
while(!0){t=w.q(y,x)
if(typeof t!=="number")return H.c(t)
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
z=new G.ah(new G.t(new Float32Array(H.D(z.a.a))),new G.t(new Float32Array(H.D(z.b.a)))).ar(new G.t(q));++v
u+=3}return z}else{z=G.a0(null,null)
y=this.f
x=this.x
w=J.G(y)
v=0
u=0
while(!0){t=w.q(y,x)
if(typeof t!=="number")return H.c(t)
if(!(v<t))break
t=u+3
s=J.I(J.e(this.dy,u),J.e(this.dy,t))
r=J.I(J.e(this.dy,u+1),J.e(this.dy,t))
t=J.I(J.e(this.dy,u+2),J.e(this.dy,t))
q=new Float32Array(3)
if(0>=3)return H.a(q,0)
q[0]=s
if(1>=3)return H.a(q,1)
q[1]=r
if(2>=3)return H.a(q,2)
q[2]=t
z=new G.ah(new G.t(new Float32Array(H.D(z.a.a))),new G.t(new Float32Array(H.D(z.b.a)))).ar(new G.t(q));++v
u+=4}return z}},
aI:function(){var z,y,x,w,v,u,t,s,r,q,p
if(!this.dx){z=G.a0(null,null)
y=this.f
x=this.x
w=J.G(y)
v=this.a
u=0
t=0
while(!0){s=w.q(y,x)
if(typeof s!=="number")return H.c(s)
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
p=v.ai(new G.t(p))
z=new G.ah(new G.t(new Float32Array(H.D(z.a.a))),new G.t(new Float32Array(H.D(z.b.a)))).ar(p);++u
t+=3}return z}else{z=G.a0(null,null)
y=this.f
x=this.x
w=J.G(y)
v=this.a
u=0
t=0
while(!0){s=w.q(y,x)
if(typeof s!=="number")return H.c(s)
if(!(u<s))break
s=t+3
r=J.I(J.e(this.dy,t),J.e(this.dy,s))
q=J.I(J.e(this.dy,t+1),J.e(this.dy,s))
s=J.I(J.e(this.dy,t+2),J.e(this.dy,s))
p=new Float32Array(3)
if(0>=3)return H.a(p,0)
p[0]=r
if(1>=3)return H.a(p,1)
p[1]=q
if(2>=3)return H.a(p,2)
p[2]=s
p=v.ai(new G.t(p))
z=new G.ah(new G.t(new Float32Array(H.D(z.a.a))),new G.t(new Float32Array(H.D(z.b.a)))).ar(p);++u
t+=4}return z}},
b5:function(){return!1},
cb:function(b1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0
z=H.i(30)
y=new Float32Array(z)
x=H.i(30)
w=new Float32Array(x)
v=Array(900)
v.fixed$length=Array
u=H.p(v,[G.t])
v=Array(900)
v.fixed$length=Array
t=H.p(v,[G.b9])
for(v=this.z,s=this.Q,r=J.G(v),q=J.G(s),p=0;p<30;++p){o=p/29
o=J.b(r.q(v,1-o),q.q(s,o))
if(p>=z)return H.a(y,p)
y[p]=o}for(v=this.ch,s=this.cx,r=J.G(v),q=J.G(s),p=0;p<30;++p){o=p/29
o=J.b(r.q(v,1-o),q.q(s,o))
if(p>=x)return H.a(w,p)
w[p]=o}v=H.i(1800)
n=new Float32Array(v)
m=this.dy
if(!this.dx){s=this.f
r=this.x
q=J.G(s)
o=H.i(J.h(q.q(s,r),4))
m=new Float32Array(o)
p=0
l=0
k=0
while(!0){j=q.q(s,r)
if(typeof j!=="number")return H.c(j)
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
a0=new G.ac(b)
if(0>=3)return H.a(b,0)
b[0]=0
if(1>=3)return H.a(b,1)
b[1]=0
if(2>=3)return H.a(b,2)
b[2]=0
b=new Float32Array(3)
a1=new G.ac(b)
if(0>=3)return H.a(b,0)
b[0]=0
if(1>=3)return H.a(b,1)
b[1]=0
if(2>=3)return H.a(b,2)
b[2]=0
a2=M.ow(r,q,o,y[c],j,g,f,w[d],m,a0,a1)
if(l<0||l>=e)return H.a(u,l)
u[l]=a2
b=new Float32Array(H.D(G.dr(a0,a1).a))
a=new G.b9(b)
a3=a.c9()
a3=Math.sqrt(a3)
a4=b.length
if(0>=a4)return H.a(b,0)
b[0]=b[0]/a3
if(1>=a4)return H.a(b,1)
b[1]=b[1]/a3
if(2>=a4)return H.a(b,2)
b[2]=b[2]/a3
if(l>=s)return H.a(t,l)
t[l]=a}z=H.i(5046)
a5=new Int32Array(z)
x=new M.ox(30)
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
a5[a8]=v}b0=new G.q([],[],[],[],[],[],[],[],[])
b0.f0("indices",a5)
b0.f1("P",u)
b0.hW("uv",n)
b0.hX("N",t)
b1.push(M.eg(this.a,this.b,this.c,b0,null))},
static:{ow:function(a,b,c,d,e,f,g,h,i,j,k){var z,y,x,w,v,u,t,s,r,q,p,o
z=P.O(a,e)*4
if(typeof z!=="number"||Math.floor(z)!==z)H.K(P.ak("Invalid length "+H.l(z)))
y=new Float32Array(z)
x=J.b(J.m(M.fZ(b,a,c,d),a),1)
if(typeof a!=="number")return H.c(a)
z=J.G(x)
w=y.length
v=0
u=0
for(;v<a;++v){t=M.dX(e,f,i,J.h(z.i(x,v),4),g,c,h,null)
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
y[s]=r}q=J.b(J.m(M.fZ(f,e,g,h),e),1)
p=M.dX(a,b,y,J.h(z.aa(x),4),c,1,d,j)
if(typeof e!=="number")return H.c(e)
z=J.G(q)
v=0
u=0
for(;v<e;++v){t=M.dX(a,b,i,J.h(J.h(z.i(q,v),c),4),c,1,d,null)
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
y[s]=r}M.dX(e,f,y,J.h(z.aa(q),4),g,1,h,k)
z=J.I(p[0],p[3])
w=J.I(p[1],p[3])
r=J.I(p[2],p[3])
o=new Float32Array(3)
if(0>=3)return H.a(o,0)
o[0]=z
if(1>=3)return H.a(o,1)
o[1]=w
if(2>=3)return H.a(o,2)
o[2]=r
return new G.t(o)},dX:function(a3,a4,a5,a6,a7,a8,a9,b0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
z=M.fZ(a4,a3,a7,a9)
y=J.u(z)
x=J.b(y.p(z,a3),1)
if(typeof a3!=="number")return H.c(a3)
w=4*a3
if(typeof w!=="number"||Math.floor(w)!==w)H.K(P.ak("Invalid length "+H.l(w)))
v=new Float32Array(w)
for(w=v.length,u=J.G(x),t=J.G(a6),s=J.y(a5),r=0;r<w;){q=t.i(a6,J.h(u.i(x,r),a8))
p=r+1
o=J.b(q,1)
v[r]=s.h(a5,q)
r=p+1
q=J.b(o,1)
n=s.h(a5,o)
if(p>=w)return H.a(v,p)
v[p]=n
p=r+1
o=J.b(q,1)
n=s.h(a5,q)
if(r>=w)return H.a(v,r)
v[r]=n
r=p+1
J.b(o,1)
n=s.h(a5,o)
if(p>=w)return H.a(v,p)
v[p]=n}for(u=a3-2,t=a3-1,s=J.y(a4),r=0;r<u;++r)for(n=t-r,q=0,m=0,l=4;q<n;m+=4,l+=4,q=o){k=J.I(J.m(s.h(a4,J.b(y.i(z,1),q)),a9),J.m(s.h(a4,J.b(y.i(z,1),q)),s.h(a4,J.b(J.m(J.b(y.i(z,q),2),a3),r))))
if(q>=w)return H.a(v,q)
j=J.h(v[q],k)
if(l>=w)return H.a(v,l)
i=v[l]
if(typeof k!=="number")return H.c(k)
h=1-k
i=J.b(j,J.h(i,h))
if(m>=w)return H.a(v,m)
v[m]=i
i=m+1
o=q+1
if(o>=w)return H.a(v,o)
j=J.h(v[o],k)
g=l+1
if(g>=w)return H.a(v,g)
g=J.b(j,J.h(v[g],h))
if(i>=w)return H.a(v,i)
v[i]=g
g=m+2
i=q+2
if(i>=w)return H.a(v,i)
i=J.h(v[i],k)
j=l+2
if(j>=w)return H.a(v,j)
j=J.b(i,J.h(v[j],h))
if(g>=w)return H.a(v,g)
v[g]=j
j=m+3
g=q+3
if(g>=w)return H.a(v,g)
g=J.h(v[g],k)
i=l+3
if(i>=w)return H.a(v,i)
h=J.b(g,J.h(v[i],h))
if(j>=w)return H.a(v,j)
v[j]=h}k=J.I(J.m(s.h(a4,y.i(z,1)),a9),J.m(s.h(a4,y.i(z,1)),s.h(a4,y.i(z,0))))
if(0>=w)return H.a(v,0)
u=J.h(v[0],k)
if(4>=w)return H.a(v,4)
n=v[4]
if(typeof k!=="number")return H.c(k)
j=1-k
f=J.b(u,J.h(n,j))
n=J.h(v[1],k)
if(5>=w)return H.a(v,5)
e=J.b(n,J.h(v[5],j))
n=J.h(v[2],k)
if(6>=w)return H.a(v,6)
d=J.b(n,J.h(v[6],j))
n=J.h(v[3],k)
if(7>=w)return H.a(v,7)
c=J.b(n,J.h(v[7],j))
if(b0!=null){y=J.m(s.h(a4,y.i(z,1)),s.h(a4,z))
if(typeof y!=="number")return H.c(y)
b=t/y
a=J.h(J.m(v[4],v[0]),b)
a0=J.h(J.m(v[5],v[1]),b)
a1=J.h(J.m(v[6],v[2]),b)
a2=J.h(J.m(v[7],v[3]),b)
y=J.G(c)
t=J.m(J.I(a,c),J.I(J.h(f,a2),y.q(c,c)))
w=b0.a
u=w.length
if(0>=u)return H.a(w,0)
w[0]=t
t=J.m(J.I(a0,c),J.I(J.h(e,a2),y.q(c,c)))
if(1>=u)return H.a(w,1)
w[1]=t
y=J.m(J.I(a1,c),J.I(J.h(d,a2),y.q(c,c)))
if(2>=u)return H.a(w,2)
w[2]=y}return[f,e,d,c]},fZ:function(a,b,c,d){var z,y,x,w,v
z=J.m(b,1)
for(y=J.y(a),x=J.u(d),w=z;v=J.G(w),x.T(d,y.h(a,v.i(w,1)));)w=v.i(w,1)
return w},ya:[function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=d.N("nu",-1)
y=d.N("uorder",-1)
x=d.bc("uknots")
w=J.y(x)
v=d.j("u0",w.h(x,J.m(y,1)))
u=d.j("u1",w.h(x,z))
t=d.N("nv",-1)
s=d.N("vorder",-1)
r=d.bc("vknots")
w=J.y(r)
q=d.j("v0",w.h(r,J.m(s,1)))
p=d.j("v1",w.h(r,t))
o=d.fd("P")
if(o!=null){w=J.y(o)
n=H.i(J.h(w.gm(o),3))
m=new Float32Array(n)
l=0
k=0
while(!0){j=w.gm(o)
if(typeof j!=="number")return H.c(j)
if(!(l<j))break
i=k+1
j=J.ao(w.h(o,l))
if(k>=n)return H.a(m,k)
m[k]=j
k=i+1
j=J.a8(w.h(o,l))
if(i>=n)return H.a(m,i)
m[i]=j
i=k+1
j=J.ag(w.h(o,l))
if(k>=n)return H.a(m,k)
m[k]=j;++l
k=i}h=n/3|0
g=!1}else{m=d.bc("Pw")
if(m==null){$.A.$2(2,"Must provide control points via 'P' or 'Pw' parameter to NURBS shape.")
return}w=J.y(m)
if(J.cm(w.gm(m),4)!==0){$.A.$2(2,"Number of 'Pw' control points provided to NURBS shape must be multiple of four")
return}h=J.av(w.gm(m),4)
g=!0}w=J.G(z)
if(!J.k(h,w.q(z,t))){w="NURBS shape was expecting "+H.l(z)+"*"+H.l(t)+"="+H.l(w.q(z,t))+" control points, was given "+H.l(J.M(m))
$.A.$2(2,w)
return}w=$.al
$.al=w+1
return new M.fY(z,y,t,s,v,u,q,p,x,r,g,m,a,b,c,!1,w)},"$4","vu",8,0,92]}},
ox:{
"^":"r:6;a",
$2:function(a,b){return b*this.a+a}},
h1:{
"^":"aW;f,r,x,y,a,b,c,d,e",
bf:function(){var z,y,x,w,v,u
z=this.f
y=J.u(z)
x=y.aa(z)
y=y.aa(z)
w=this.r
v=new G.t(new Float32Array(H.i(3)))
v.G(x,y,w)
w=this.x
u=new G.t(new Float32Array(H.i(3)))
u.G(z,z,w)
return G.a0(v,u)},
bL:function(){var z,y,x
z=this.y
y=1+4*this.r
H.T(y)
H.T(1.5)
y=Math.pow(y,1.5)
x=1+4*this.x
H.T(x)
H.T(1.5)
return z/12*(y-Math.pow(x,1.5))},
static:{ye:[function(a,b,c,d){var z,y,x,w,v,u
z=d.j("radius",1)
y=d.j("zmin",0)
x=d.j("zmax",1)
w=d.j("phimax",360)
v=$.al
$.al=v+1
v=new M.h1(z,null,null,null,a,b,c,!1,v)
v.r=P.a6(y,x)
v.x=P.O(y,x)
u=J.P(w,0,360)
if(typeof u!=="number")return H.c(u)
v.y=0.017453292519943295*u
return v},"$4","vv",8,0,93]}},
hr:{
"^":"aW;f,r,x,y,z,Q,a,b,c,d,e",
bf:function(){var z,y,x,w,v
z=this.f
y=J.u(z)
x=y.aa(z)
y=y.aa(z)
w=this.x
v=new G.t(new Float32Array(H.i(3)))
v.G(x,y,w)
w=this.y
y=new G.t(new Float32Array(H.i(3)))
y.G(z,z,w)
return G.a0(v,y)},
bL:function(){var z,y
z=this.r
y=this.f
if(typeof y!=="number")return H.c(y)
return z*y*(this.y-this.x)},
jL:function(a,b,c,d,e,f,g){var z,y
z=this.f
y=J.u(z)
this.x=C.b.v(P.a6(e,f),y.aa(z),z)
this.y=C.b.v(P.O(e,f),y.aa(z),z)
y=this.x
if(typeof z!=="number")return H.c(z)
this.z=Math.acos(H.T(C.d.v(y/z,-1,1)))
this.Q=Math.acos(H.T(C.d.v(this.y/z,-1,1)))
z=J.P(g,0,360)
if(typeof z!=="number")return H.c(z)
this.r=0.017453292519943295*z},
static:{pI:function(a,b,c,d,e,f,g){var z=$.al
$.al=z+1
z=new M.hr(d,null,null,null,null,null,a,b,c,!1,z)
z.jL(a,b,c,d,e,f,g)
return z},yG:[function(a,b,c,d){var z=d.j("radius",1)
return M.pI(a,b,c,z,d.j("zmin",J.bd(z)),d.j("zmax",z),d.j("phimax",360))},"$4","vw",8,0,94]}},
qk:{
"^":"aW;f,r,a,b,c,d,e",
bf:function(){var z,y,x,w,v,u,t
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
t=z.cd(v,u,y[x])
x=this.b
y=G.a0(x.ai(t[0]),x.ai(t[1]))
x=x.ai(t[2])
return G.cr(y).ar(x)},
aI:function(){var z,y,x,w,v,u,t
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
t=z.cd(v,u,y[x])
x=G.a0(t[0],t[1])
y=t[2]
return G.cr(x).ar(y)},
oo:[function(a){var z,y
z=this.f.y
y=this.r+a
if(y>=z.length)return H.a(z,y)
return z[y]},"$1","gaD",2,0,34],
bL:function(){var z,y,x,w,v,u,t
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
t=z.cd(v,u,y[x])
return 0.5*Math.sqrt(H.T(G.dr(t[1].p(0,t[0]),t[2].p(0,t[0])).c9()))}},
hE:{
"^":"aW;f,r,x,y,z,Q,ch,cx,cy,a,b,c,d,e",
ip:function(a){var z,y,x,w,v,u
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
return new G.t(y)},
cd:function(a,b,c){var z,y,x,w,v,u,t
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
bf:function(){var z,y,x,w,v
z=G.a0(null,null)
y=this.x
if(typeof y!=="number")return H.c(y)
x=this.b
w=0
for(;w<y;++w){v=x.ai(this.ip(w))
z=new G.ah(new G.t(new Float32Array(H.D(z.a.a))),new G.t(new Float32Array(H.D(z.b.a)))).ar(v)}return z},
aI:function(){var z,y,x,w
z=G.a0(null,null)
y=this.x
if(typeof y!=="number")return H.c(y)
x=0
for(;x<y;++x){w=this.ip(x)
z=new G.ah(new G.t(new Float32Array(H.D(z.a.a))),new G.t(new Float32Array(H.D(z.b.a)))).ar(w)}return z},
b5:function(){return!1},
cb:function(a){var z,y,x,w,v,u
for(z=this.r,y=this.a,x=this.b,w=0;w<z;++w){v=this.c
u=$.al
$.al=u+1
u=new M.qk(this,w,y,x,v,!1,u)
u.r=w*3
a.push(u)}},
jR:function(a,b,c,d,e,f,g,h,i,j,k){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.x
this.z=new Float32Array(H.i(J.h(z,3)))
if(typeof z!=="number")return H.c(z)
y=this.a
x=J.y(g)
w=0
v=0
for(;w<z;++w,v=s){u=y.ai(x.h(g,w))
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
static:{ql:function(a,b,c,d,e,f,g,h,i,j,k){var z,y,x,w
z=new G.t(new Float32Array(H.i(3)))
z.G(0,0,0)
y=new G.t(new Float32Array(H.i(3)))
y.G(0,0,0)
x=new G.t(new Float32Array(H.i(3)))
x.G(0,0,0)
w=$.al
$.al=w+1
w=new M.hE([z,y,x],d,e,f,null,h,i,j,k,a,b,c,!1,w)
w.jR(a,b,c,d,e,f,g,h,i,j,k)
return w},eg:[function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=d.i9("indices")
y=d.fd("P")
x=d.bc("uv")
if(x==null)x=d.bc("st")
if(z==null||y==null)return
z=new Uint32Array(H.D(z))
if(x!=null)x=new Float32Array(H.D(x))
w=d.bC("discarddegenerateUVs",!1)
if(x!=null){v=J.y(y)
u=v.gm(y)
t=J.y(x)
s=t.gm(x)
r=t.gm(x)
q=v.gm(y)
if(typeof q!=="number")return H.c(q)
if(r<2*q){if(typeof u!=="number")return H.c(u)
v="Not enough of 'uv's for triangle mesh. Expencted "+H.l(2*u)+", found "+H.l(s)+".  Discarding."
$.A.$2(1,v)
x=null}else{t=t.gm(x)
v=v.gm(y)
if(typeof v!=="number")return H.c(v)
if(t>2*v){if(typeof u!=="number")return H.c(u)
v="More 'uv's provided than will be used for triangle mesh.  ("+H.l(2*u)+" expcted, "+H.l(s)+" found)"
$.A.$2(1,v)}}}p=d.mV("S")
if(p!=null&&!J.k(J.M(p),J.M(y))){$.A.$2(1,"Number of 'S's for triangle mesh must match 'P's")
p=null}o=d.mS("N")
if(o!=null&&!J.k(J.M(o),J.M(y))){$.A.$2(1,"Number of 'N's for triangle mesh must match 'P's")
o=null}if(w===!0&&x!=null&&o!=null){n=J.M(o)
if(typeof n!=="number")return H.c(n)
v=z.length
t=J.y(x)
r=J.y(y)
m=0
l=0
for(;l<n;l+=3,m+=3){if(m>=v)return H.a(z,m)
q=r.h(y,z[m])
k=m+1
if(k>=v)return H.a(z,k)
q=J.m(q,r.h(y,z[k]))
j=m+2
if(j>=v)return H.a(z,j)
q=G.dr(q,J.m(r.h(y,z[j]),r.h(y,z[k]))).c9()
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
if(q){$.A.$2(1,"Degenerate uv coordinates in triangle mesh. Discarding all uvs.")
x=null
break}}}v=J.y(y)
u=v.gm(y)
for(n=z.length,l=0;l<n;++l){t=z[l]
if(typeof u!=="number")return H.c(u)
if(t>=u){v="TriangleMesh has out of-bounds vertex index "+t+" ("+H.l(u)+" 'P' values were given"
$.A.$2(1,v)
return}}h=d.mU("alpha")
if(!J.k(h,""))if(e.X(h)===!0)g=e.h(0,h)
else{t="Couldn't find float texture '"+H.l(h)+"' for 'alpha' parameter"
$.A.$2(1,t)
g=null}else g=J.k(d.j("alpha",1),0)?new G.d1(0):null
return M.ql(a,b,c,n/3|0,v.gm(y),z,y,o,p,x,g)},function(a,b,c,d){return M.eg(a,b,c,d,null)},"$5","$4","vx",8,2,95,0]}}}],["","",,U,{
"^":"",
eT:{
"^":"ba;a,b,c",
static:{wi:[function(a){var z,y,x
z=a.N("nsamples",2048)
y=a.j("maxdist",1/0)
x=new U.eT(null,a.j("mindist",0.0001),y)
x.a=G.b4(z)
return x},"$1","vD",2,0,96]}},
f3:{
"^":"ba;a,b,c",
j4:function(a,b){var z,y,x
for(z=this.c,y=z.length,x=0;x<y;++x)z[x]=G.F(0)},
static:{mb:function(a,b){var z,y
z=G.b4(b)
y=J.G(a)
y=J.h(y.i(a,1),y.i(a,1))
if(typeof y!=="number")return H.c(y)
y=new U.f3(a,z,H.p(Array(y),[G.bI]))
y.j4(a,b)
return y},wG:[function(a){return U.mb(a.N("lmax",4),a.N("nsamples",4096))},"$1","vE",2,0,97]}},
f4:{
"^":"ba;a,b,c,d,e,f,r,x,y",
j5:function(a,b,c,d){var z,y
this.a=a
this.b=b
this.c=c
this.d=d
this.r=null
z=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[null])),[null])
if(J.bx(this.d)){y=this.d
$.ai.dg(y,!0,z.a).at(new U.md(this,z))}},
static:{mc:function(a,b,c,d){var z=new U.f4(null,null,null,null,[],null,null,null,null)
z.j5(a,b,c,d)
return z},wH:[function(a){var z,y,x,w
z=a.N("maxdepth",5)
y=a.j("maxerror",0.05)
x=a.j("minsampledistance",0.25)
w=a.bd("pointsfile","")
if(G.pp()){y=J.h(y,4)
x=J.h(x,4)}return U.mc(z,y,x,w)},"$1","vF",2,0,98]}},
md:{
"^":"r:0;a,b",
$1:function(a){var z,y
z=H.ck(a,"$isw",[P.o],"$asw")
if(z){z=this.a
y=G.hl(a,z.d)
z=z.d
$.ai.c.k(0,z,y)}this.b.bo(0)}},
f5:{
"^":"ba;a,b,c,d,e",
static:{wI:[function(a){var z,y,x,w
z=a.N("maxdepth",5)
y=a.aV("strategy","all")
x=J.B(y)
if(x.A(y,"one"))w=1
else{if(x.A(y,"all"));else{x="Strategy '"+H.l(y)+"' for direct lighting unknown. Using 'all'."
$.A.$2(1,x)}w=0}return new U.f5(w,z,null,null,null)},"$1","vG",2,0,99]}},
fi:{
"^":"ba;a,b,c,d,e,f,r",
static:{xl:[function(a){var z,y
z=a.N("lmax",4)
y=a.N("nsamples",4096)
return new U.fi(a.a1("Kd",G.F(0.5)),a.a1("Ks",G.F(0.25)),a.j("roughness",0.1),z,G.b4(y),null,null)},"$1","vH",2,0,100]}},
fr:{
"^":"ba;a,b,c,d,e,f,r,x,y,z,Q",
jk:function(a,b,c,d,e,f){var z,y,x
this.c=G.b4(a)
z=G.b4(b)
this.d=z
this.r=c
this.x=d
this.Q=Array(z)
this.e=e
this.f=f
y=0
while(!0){z=this.d
if(typeof z!=="number")return H.c(z)
if(!(y<z))break
z=this.Q
x=[]
x.$builtinTypeInfo=[U.td]
if(y>=z.length)return H.a(z,y)
z[y]=x;++y}},
static:{nd:function(a,b,c,d,e,f){var z=new U.fr(null,null,null,null,null,null,null,null,null,null,null)
z.jk(a,b,c,d,e,f)
return z},xu:[function(a){return U.nd(a.N("nlights",64),a.N("nsets",4),a.j("rrthreshold",0.0001),a.N("maxdepth",5),a.j("glimit",10),a.N("gathersamples",16))},"$1","vI",2,0,101]}},
td:{
"^":"j;"},
fx:{
"^":"ba;a,b,c,d,e,f,r,x,y,z",
static:{xB:[function(a){var z,y,x,w,v,u,t
z=a.j("minweight",0.5)
y=a.j("minpixelspacing",2.5)
x=a.j("maxpixelspacing",15)
w=a.j("maxangledifference",10)
v=a.N("maxspeculardepth",5)
u=a.N("maxindirectdepth",3)
t=new U.fx(y,x,z,null,a.N("nsamples",4096),v,u,null,null,null)
if(typeof w!=="number")return H.c(w)
t.d=Math.cos(H.T(57.29577951308232*w))
return t},"$1","vJ",2,0,102]}},
h2:{
"^":"ba;a,b,c,d,e",
static:{yg:[function(a){return new U.h2(a.N("maxdepth",5),H.p(Array(3),[G.o4]),H.p(Array(3),[P.o]),H.p(Array(3),[G.it]),H.p(Array(3),[G.it]))},"$1","vK",2,0,103]}},
h4:{
"^":"ba;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr",
static:{yj:[function(a){var z,y,x,w,v,u,t,s,r,q
z=a.N("causticphotons",2e4)
y=a.N("indirectphotons",1e5)
x=a.N("nused",50)
w=a.N("maxspeculardepth",5)
v=a.N("maxphotondepth",5)
u=a.bC("finalgather",!0)
t=a.N("finalgathersamples",32)
s=a.j("maxdist",0.1)
r=a.j("gatherangle",10)
q=J.h(s,s)
if(typeof r!=="number")return H.c(r)
return new U.h4(z,y,x,[q],w,v,u,t,Math.cos(H.T(0.017453292519943295*r)),null,null,null,null,0,0,null,null,null)},"$1","lk",2,0,104]}},
hI:{
"^":"ba;a,b,c,d,e,f,r,x",
jS:function(a){var z=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[null])),[null])
if(J.bx(a))$.ai.dg(a,!0,z.a).at(new U.qG(this,a,z))},
static:{qF:function(a){var z=new U.hI(G.a0(null,null),null,null,null,[0,0,0],null,null,null)
z.jS(a)
return z},yZ:[function(a){return U.qF(a.bd("filename","probes.out"))},"$1","vL",2,0,105]}},
qG:{
"^":"r:0;a,b,c",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.ck(a,"$isw",[P.o],"$asw")
if(z){z=this.b
y=G.hl(a,z)
$.ai.c.k(0,z,y)}else{z=H.ck(a,"$isw",[P.au],"$asw")
y=z?a:null}z=this.a
x=J.y(y)
z.b=J.aH(x.h(y,0))
z.c=J.aH(x.h(y,1))
z.d=J.aH(x.h(y,2))
w=z.e
w[0]=J.aH(x.h(y,3))
w[1]=J.aH(x.h(y,4))
w[2]=J.aH(x.h(y,5))
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
if(typeof x!=="number")return x.i();++x
t=x*x
s=w[0]*w[1]*w[2]
z.f=H.p(Array(t*s),[G.bI])
for(r=12,q=0,p=0;p<s;++p)for(o=0;o<t;++o,q=n){x=z.f
n=q+1
w=G.F(0)
w.iR(y,r)
if(q<0||q>=x.length)return H.a(x,q)
x[q]=w
x=$.ea
if(x===0)x=3
else x=x===1?3:4
r+=x}this.c.bo(0)}},
hT:{
"^":"ba;a",
static:{zI:[function(a){return new U.hT(a.N("maxdepth",5))},"$1","vM",2,0,106]}}}],["","",,G,{
"^":"",
dH:{
"^":"az;a,b,c,d,e",
static:{wo:[function(a,b){var z,y,x,w,v,u
z=b.cD("mapping","uv")
y=J.B(z)
if(y.A(z,"uv")){y=b.c
x=new G.aD(y.j("uscale",b.d.j("uscale",1)),y.j("vscale",b.d.j("vscale",1)),y.j("udelta",b.d.j("udelta",0)),y.j("vdelta",b.d.j("vdelta",0)))}else if(y.A(z,"spherical"))x=new G.bL(G.a1(a.gah(),a.a))
else if(y.A(z,"cylindrical"))x=new G.bA(G.a1(a.gah(),a.a))
else if(y.A(z,"planar")){y=G.a5(1,0,0)
w=b.c
y=w.a2("v1",b.d.a2("v1",y))
v=G.a5(0,1,0)
v=w.a2("v2",b.d.a2("v2",v))
u=w.j("udelta",b.d.j("udelta",0))
w=w.j("vdelta",b.d.j("vdelta",0))
x=new G.bE(new G.ac(new Float32Array(H.D(J.L(y)))),new G.ac(new Float32Array(H.D(J.L(v)))),u,w)}else{y="2D texture mapping '"+H.l(z)+"' unknown"
$.A.$2(2,y)
x=new G.aD(1,1,0,0)}y=b.c
return new G.dH(x,y.j("v00",b.d.j("v00",0)),y.j("v01",b.d.j("v01",1)),y.j("v10",b.d.j("v10",0)),y.j("v11",b.d.j("v11",1)))},"$2","vN",4,0,22],wp:[function(a,b){var z,y,x,w,v,u,t
z=b.cD("mapping","uv")
y=J.B(z)
if(y.A(z,"uv")){y=b.c
x=new G.aD(y.j("uscale",b.d.j("uscale",1)),y.j("vscale",b.d.j("vscale",1)),y.j("udelta",b.d.j("udelta",0)),y.j("vdelta",b.d.j("vdelta",0)))}else if(y.A(z,"spherical"))x=new G.bL(G.a1(a.gah(),a.a))
else if(y.A(z,"cylindrical"))x=new G.bA(G.a1(a.gah(),a.a))
else if(y.A(z,"planar")){y=G.a5(1,0,0)
w=b.c
y=w.a2("v1",b.d.a2("v1",y))
v=G.a5(0,1,0)
v=w.a2("v2",b.d.a2("v2",v))
u=w.j("udelta",b.d.j("udelta",0))
w=w.j("vdelta",b.d.j("vdelta",0))
x=new G.bE(new G.ac(new Float32Array(H.D(J.L(y)))),new G.ac(new Float32Array(H.D(J.L(v)))),u,w)}else{y="2D texture mapping '"+H.l(z)+"' unknown"
$.A.$2(2,y)
x=new G.aD(1,1,0,0)}y=G.F(0)
w=b.c
y=w.a1("v00",b.d.a1("v00",y))
v=G.F(1)
v=w.a1("v01",b.d.a1("v01",v))
u=G.F(0)
u=w.a1("v10",b.d.a1("v10",u))
t=G.F(1)
return new G.dH(x,y,v,u,w.a1("v11",b.d.a1("v11",t)))},"$2","vO",4,0,22]}},
lX:{
"^":"az;a,b,c"},
lY:{
"^":"az;a,b,c,d",
static:{wy:[function(a,b){return G.ix(a,b,b.am("tex1",1),b.am("tex2",0))},"$2","vP",4,0,23],wz:[function(a,b){return G.ix(a,b,b.a_("tex1",G.F(1)),b.a_("tex2",G.F(0)))},"$2","vQ",4,0,23],ix:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q
z=b.c
y=z.N("dimension",b.d.N("dimension",2))
x=J.B(y)
if(!x.A(y,2)&&!x.A(y,3)){z=H.l(y)+" dimensional checkerboard texture not supported"
$.A.$2(1,z)
return}if(x.A(y,2)){w=z.aV("mapping",b.d.aV("mapping","uv"))
x=J.B(w)
if(x.A(w,"uv"))v=new G.aD(z.j("uscale",b.d.j("uscale",1)),z.j("vscale",b.d.j("vscale",1)),z.j("udelta",b.d.j("udelta",0)),z.j("vdelta",b.d.j("vdelta",0)))
else if(x.A(w,"spherical"))v=new G.bL(G.a1(a.gah(),a.a))
else if(x.A(w,"cylindrical"))v=new G.bA(G.a1(a.gah(),a.a))
else if(x.A(w,"planar")){x=G.a5(1,0,0)
x=z.a2("v1",b.d.a2("v1",x))
u=G.a5(0,1,0)
u=z.a2("v2",b.d.a2("v2",u))
t=z.j("udelta",b.d.j("udelta",0))
s=z.j("vdelta",b.d.j("vdelta",0))
v=new G.bE(new G.ac(new Float32Array(H.D(J.L(x)))),new G.ac(new Float32Array(H.D(J.L(u)))),t,s)}else{x="2D texture mapping '"+H.l(w)+"' unknown"
$.A.$2(1,x)
v=new G.aD(1,1,0,0)}r=z.aV("aamode",b.d.aV("aamode","closedform"))
z=J.B(r)
if(z.A(r,"none"))q=0
else{if(z.A(r,"closedform"));else{z="Antialiasing mode '"+H.l(r)+"' not understood by Checkerboard2DTexture; using 'closedform'"
$.A.$2(1,z)}q=1}return new G.lY(v,c,d,q)}else return new G.lX(new G.bB(a),c,d)}}},
dJ:{
"^":"az;a,b,c",
static:{wO:[function(a,b){var z,y,x,w,v,u
z=b.cD("mapping","uv")
y=J.B(z)
if(y.A(z,"uv")){y=b.c
x=new G.aD(y.j("uscale",b.d.j("uscale",1)),y.j("vscale",b.d.j("vscale",1)),y.j("udelta",b.d.j("udelta",0)),y.j("vdelta",b.d.j("vdelta",0)))}else if(y.A(z,"spherical"))x=new G.bL(G.a1(a.gah(),a.a))
else if(y.A(z,"cylindrical"))x=new G.bA(G.a1(a.gah(),a.a))
else if(y.A(z,"planar")){y=G.a5(1,0,0)
w=b.c
y=w.a2("v1",b.d.a2("v1",y))
v=G.a5(0,1,0)
v=w.a2("v2",b.d.a2("v2",v))
u=w.j("udelta",b.d.j("udelta",0))
w=w.j("vdelta",b.d.j("vdelta",0))
x=new G.bE(new G.ac(new Float32Array(H.D(J.L(y)))),new G.ac(new Float32Array(H.D(J.L(v)))),u,w)}else{y="2D texture mapping '"+H.l(z)+"' unknown"
$.A.$2(2,y)
x=new G.aD(1,1,0,0)}return new G.dJ(x,b.am("inside",1),b.am("outside",0))},"$2","vR",4,0,24],wP:[function(a,b){var z,y,x,w,v,u
z=b.cD("mapping","uv")
y=J.B(z)
if(y.A(z,"uv")){y=b.c
x=new G.aD(y.j("uscale",b.d.j("uscale",1)),y.j("vscale",b.d.j("vscale",1)),y.j("udelta",b.d.j("udelta",0)),y.j("vdelta",b.d.j("vdelta",0)))}else if(y.A(z,"spherical"))x=new G.bL(G.a1(a.gah(),a.a))
else if(y.A(z,"cylindrical"))x=new G.bA(G.a1(a.gah(),a.a))
else if(y.A(z,"planar")){y=G.a5(1,0,0)
w=b.c
y=w.a2("v1",b.d.a2("v1",y))
v=G.a5(0,1,0)
v=w.a2("v2",b.d.a2("v2",v))
u=w.j("udelta",b.d.j("udelta",0))
w=w.j("vdelta",b.d.j("vdelta",0))
x=new G.bE(new G.ac(new Float32Array(H.D(J.L(y)))),new G.ac(new Float32Array(H.D(J.L(v)))),u,w)}else{y="2D texture mapping '"+H.l(z)+"' unknown"
$.A.$2(2,y)
x=new G.aD(1,1,0,0)}return new G.dJ(x,b.a_("inside",G.F(1)),b.a_("outside",G.F(0)))},"$2","vS",4,0,24]}},
dL:{
"^":"az;a,b,c,d",
static:{wV:[function(a,b){var z=b.dU("octaves",8)
return new G.dL(b.c.j("roughness",b.d.j("roughness",0.5)),z,!1,new G.bB(a))},"$2","vT",4,0,25],wW:[function(a,b){var z=b.dU("octaves",8)
return new G.dL(b.c.j("roughness",b.d.j("roughness",0.5)),z,!0,new G.bB(a))},"$2","vU",4,0,25]}},
fu:{
"^":"az;a,b",
jm:function(a,b,c,d,e,f,g,h){var z,y,x
if(J.bx(b)){z=H.p(new P.ay(H.p(new P.a2(0,$.H,null),[null])),[null])
$.ai.e7(b,z.a).at(new G.ng(this,b,c,d,e,f,g,h,z))}H.T(f)
H.T(g)
y=Math.pow(f,g)
x=G.cI(1,1,h?3:1)
if(h)x.k(0,0,G.F(y))
else x.k(0,0,y)
this.a=G.cy(x,"",!1,8,0)},
static:{j_:function(a,b,c,d,e,f,g,h){var z=new G.fu(null,a)
z.jm(a,b,c,d,e,f,g,h)
return z},xx:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=b.cD("mapping","uv")
y=J.B(z)
if(y.A(z,"uv")){y=b.c
x=new G.aD(y.j("uscale",b.d.j("uscale",1)),y.j("vscale",b.d.j("vscale",1)),y.j("udelta",b.d.j("udelta",0)),y.j("vdelta",b.d.j("vdelta",0)))}else if(y.A(z,"spherical"))x=new G.bL(G.a1(a.gah(),a.a))
else if(y.A(z,"cylindrical"))x=new G.bA(G.a1(a.gah(),a.a))
else if(y.A(z,"planar")){y=G.a5(1,0,0)
w=b.c
y=w.a2("v1",b.d.a2("v1",y))
v=G.a5(0,1,0)
v=w.a2("v2",b.d.a2("v2",v))
u=w.j("udelta",b.d.j("udelta",0))
w=w.j("vdelta",b.d.j("vdelta",0))
x=new G.bE(new G.ac(new Float32Array(H.D(J.L(y)))),new G.ac(new Float32Array(H.D(J.L(v)))),u,w)}else{y="2D texture mapping '"+H.l(z)+"' unknown"
$.A.$2(2,y)
x=new G.aD(1,1,0,0)}y=b.c
t=y.j("maxanisotropy",b.d.j("maxanisotropy",8))
s=y.bC("trilinear",b.d.bC("trilinear",!1))
r=y.aV("wrap",b.d.aV("wrap","repeat"))
w=J.B(r)
if(w.A(r,"black"))q=1
else q=w.A(r,"clamp")?2:0
p=y.j("scale",b.d.j("scale",1))
o=y.j("gamma",b.d.j("gamma",1))
return G.j_(x,y.bd("filename",b.d.bd("filename","")),s,t,q,p,o,!1)},"$2","vV",4,0,26],xy:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=b.cD("mapping","uv")
y=J.B(z)
if(y.A(z,"uv")){y=b.c
x=new G.aD(y.j("uscale",b.d.j("uscale",1)),y.j("vscale",b.d.j("vscale",1)),y.j("udelta",b.d.j("udelta",0)),y.j("vdelta",b.d.j("vdelta",0)))}else if(y.A(z,"spherical"))x=new G.bL(G.a1(a.gah(),a.a))
else if(y.A(z,"cylindrical"))x=new G.bA(G.a1(a.gah(),a.a))
else if(y.A(z,"planar")){y=G.a5(1,0,0)
w=b.c
y=w.a2("v1",b.d.a2("v1",y))
v=G.a5(0,1,0)
v=w.a2("v2",b.d.a2("v2",v))
u=w.j("udelta",b.d.j("udelta",0))
w=w.j("vdelta",b.d.j("vdelta",0))
x=new G.bE(new G.ac(new Float32Array(H.D(J.L(y)))),new G.ac(new Float32Array(H.D(J.L(v)))),u,w)}else{y="2D texture mapping '"+H.l(z)+"' unknown"
$.A.$2(2,y)
x=new G.aD(1,1,0,0)}y=b.c
t=y.j("maxanisotropy",b.d.j("maxanisotropy",8))
s=y.bC("trilinear",b.d.bC("trilinear",!1))
r=y.aV("wrap",b.d.aV("wrap","repeat"))
w=J.B(r)
if(w.A(r,"black"))q=1
else q=w.A(r,"clamp")?2:0
p=y.j("scale",b.d.j("scale",1))
o=y.j("gamma",b.d.j("gamma",1))
return G.j_(x,y.bd("filename",b.d.bd("filename","")),s,t,q,p,o,!0)},"$2","vW",4,0,26]}},
ng:{
"^":"r:8;a,b,c,d,e,f,r,x,y",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.b
y=this.c
x=this.d
w=this.e
v=this.f
u=this.r
t=this.x
s=G.dQ(z,y,u,x,v,t,w)
r="TEXTURE "+H.l(s)
$.A.$2(4,r)
if($.ai.e.X(s)){this.a.a=$.ai.dn(s)
this.y.bo(0)
return}if(a!=null){a=!t?a.f7(1):G.hp(a)
if(!J.k(v,1)||!J.k(u,1))for(q=J.L(a).length,p=0;p<q;++p){t=a.d
if(p>=t.length)return H.a(t,p)
r=t[p]
if(typeof v!=="number")return H.c(v)
if(typeof u!=="number")H.K(H.N(u))
t[p]=Math.pow(r*v,u)}z=G.cy(a,z,y,x,w)
this.a.a=z
$.ai.e.k(0,s,z)}this.y.bo(0)}},
fN:{
"^":"az;a,b,c,d,e",
static:{xM:[function(a,b){return},"$2","vX",4,0,27],xN:[function(a,b){var z,y
z=b.dU("octaves",8)
y=b.c
return new G.fN(z,y.j("roughness",b.d.j("roughness",0.5)),y.j("scale",b.d.j("scale",1)),y.j("variation",b.d.j("variation",0.2)),new G.bB(a))},"$2","vY",4,0,27]}},
dT:{
"^":"az;a,b,c",
static:{xZ:[function(a,b){return new G.dT(b.am("tex1",0),b.am("tex2",1),b.am("amount",0.5))},"$2","vZ",4,0,28],y_:[function(a,b){return new G.dT(b.a_("tex1",G.F(0)),b.a_("tex2",G.F(1)),b.am("amount",0.5))},"$2","w_",4,0,28]}},
e8:{
"^":"az;a,b",
static:{yw:[function(a,b){return new G.e8(b.am("tex1",1),b.am("tex2",1))},"$2","w0",4,0,29],yx:[function(a,b){return new G.e8(b.a_("tex1",G.F(1)),b.a_("tex2",G.F(1)))},"$2","w1",4,0,29]}},
hF:{
"^":"az;a",
static:{yU:[function(a,b){return},"$2","w2",4,0,30],yV:[function(a,b){var z,y,x,w,v,u
z=b.cD("mapping","uv")
y=J.B(z)
if(y.A(z,"uv")){y=b.c
x=new G.aD(y.j("uscale",b.d.j("uscale",1)),y.j("vscale",b.d.j("vscale",1)),y.j("udelta",b.d.j("udelta",0)),y.j("vdelta",b.d.j("vdelta",0)))}else if(y.A(z,"spherical"))x=new G.bL(G.a1(a.gah(),a.a))
else if(y.A(z,"cylindrical"))x=new G.bA(G.a1(a.gah(),a.a))
else if(y.A(z,"planar")){y=G.a5(1,0,0)
w=b.c
y=w.a2("v1",b.d.a2("v1",y))
v=G.a5(0,1,0)
v=w.a2("v2",b.d.a2("v2",v))
u=w.j("udelta",b.d.j("udelta",0))
w=w.j("vdelta",b.d.j("vdelta",0))
x=new G.bE(new G.ac(new Float32Array(H.D(J.L(y)))),new G.ac(new Float32Array(H.D(J.L(v)))),u,w)}else{y="2D texture mapping '"+H.l(z)+"' unknown"
$.A.$2(2,y)
x=new G.aD(1,1,0,0)}return new G.hF(x)},"$2","w3",4,0,30]}},
et:{
"^":"az;a,b",
static:{zK:[function(a,b){return new G.et(new G.bB(a),!1)},"$2","w4",4,0,31],zL:[function(a,b){return new G.et(new G.bB(a),!0)},"$2","w5",4,0,31]}},
eu:{
"^":"az;a,b,c,d",
static:{zM:[function(a,b){var z=b.dU("octaves",8)
return new G.eu(b.c.j("roughness",b.d.j("roughness",0.5)),z,!1,new G.bB(a))},"$2","w6",4,0,12],zN:[function(a,b){var z=b.dU("octaves",8)
return new G.eu(b.c.j("roughness",b.d.j("roughness",0.5)),z,!0,new G.bB(a))},"$2","w7",4,0,12]}}}],["","",,S,{
"^":"",
f9:{
"^":"kx;a,b,c",
static:{wR:[function(a){return new S.f9(a.j("stepsize",1),null,null)},"$1","wa",2,0,118]}},
ho:{
"^":"kx;a,b,c",
static:{yC:[function(a){return new S.ho(a.j("stepsize",1),null,null)},"$1","wb",2,0,119]}}}],["","",,B,{
"^":"",
fc:{
"^":"iD;f,r,x,y,a,b,c,d,e",
aI:function(){var z=this.e
return G.a1(z.b,z.a).ed(this.f)},
static:{wU:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=b.a1("sigma_a",G.F(0))
y=b.a1("sigma_s",G.F(0))
x=b.j("g",0)
w=b.a1("Le",G.F(0))
v=new G.t(new Float32Array(H.i(3)))
v.G(0,0,0)
u=b.aU("p0",v)
v=new G.t(new Float32Array(H.i(3)))
v.G(1,1,1)
t=b.aU("p1",v)
s=b.j("a",1)
r=b.j("b",1)
q=b.a2("updir",G.a5(0,1,0))
v=new B.fc(G.a0(u,t),s,r,null,G.bK(z,0),G.bK(y,0),G.bK(w,0),x,G.a1(a.gah(),a.a))
p=J.y(q)
v.y=p.au(q,p.S(q))
return v},"$2","wc",4,0,120]}},
fo:{
"^":"ky;a,b,c,d,e,f",
aI:function(){var z=this.f
return G.a1(z.b,z.a).ed(this.e)},
np:[function(a,b,c,d,e){if(!this.e.n9(this.f.ai(b)))return 0
return G.ju(c,d,this.d)},"$4","ge3",8,0,15],
static:{xq:[function(a,b){var z,y,x,w,v,u
z=b.a1("sigma_a",G.F(0))
y=b.a1("sigma_s",G.F(0))
x=b.j("g",0)
w=b.a1("Le",G.F(0))
v=new G.t(new Float32Array(H.i(3)))
v.G(0,0,0)
u=b.aU("p0",v)
v=new G.t(new Float32Array(H.i(3)))
v.G(1,1,1)
return new B.fo(z,y,w,x,G.a0(u,b.aU("p1",v)),G.a1(a.gah(),a.a))},"$2","wd",4,0,121]}},
hR:{
"^":"iD;f,r,x,y,z,a,b,c,d,e",
aI:function(){var z=this.e
return G.a1(z.b,z.a).ed(this.z)},
static:{zE:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z=b.a1("sigma_a",G.F(0))
y=b.a1("sigma_s",G.F(0))
x=b.j("g",0)
w=b.a1("Le",G.F(0))
v=new G.t(new Float32Array(H.i(3)))
v.G(0,0,0)
u=b.aU("p0",v)
v=new G.t(new Float32Array(H.i(3)))
v.G(1,1,1)
t=b.aU("p1",v)
s=b.bc("density")
if(s==null){$.A.$2(2,"No 'density' values provided for volume grid?")
return}r=b.N("nx",1)
q=b.N("ny",1)
p=b.N("nz",1)
v=J.y(s)
o=J.G(r)
if(!J.k(v.gm(s),J.h(o.q(r,q),p))){v="VolumeGridDensity has "+H.l(v.gm(s))+" density values but nx*ny*nz = "+H.l(J.h(o.q(r,q),p))
$.A.$2(2,v)
return}v=G.a0(u,t)
return new B.hR(new Float64Array(H.D(s)),r,q,p,v,G.bK(z,0),G.bK(y,0),G.bK(w,0),x,G.a1(a.gah(),a.a))},"$2","we",4,0,81]}}}],["","",,K,{
"^":"",
A8:[function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z={}
y=window.location.search
y.toString
H.eH("")
H.ic(0)
P.p7(0,0,y.length,"startIndex",null)
x=H.vB(y,"?","",0)
w=x.length!==0?x:"cornell-path"
if(!C.e.b6(C.T,w)){$.A.$2(2,"Unknown Scene")
return}v=document.querySelector("#sceneMenu")
for(u=0;u<10;++u){t=C.T[u]
s=W.oz("","",null,!1)
s.value=t
s.textContent=t
if(t===w)s.selected=!0
v.appendChild(s)}y=J.lv(v)
H.p(new W.ey(0,y.a,y.b,W.eG(new K.uX(v)),y.c),[H.ar(y,0)]).d0()
w="scenes/"+w+".pbrt"
r=new T.pd(null,null,"",null,null,[],[],P.Z(),P.Z(),P.Z())
$.ai=r
A.pf()
y=A.qj()
q=P.Z()
p=A.pn()
o=new A.mY(P.Z(),P.Z(),new G.q([],[],[],[],[],[],[],[],[]),null,P.Z(),null,new G.q([],[],[],[],[],[],[],[],[]),"",null)
o.d="matte"
o.y=!1
r.f=new A.m7(r,null,null,1,y,3,q,p,o,[],[],[],[])
n=document.querySelector("#log")
m=document.querySelector("#renderCanvas")
l=J.ls(m)
z.a=P.l6(l.getImageData(0,0,m.width,m.height))
k=document.querySelector("#canvasContainer")
j=new G.po(!1,1,0,null,new G.q([],[],[],[],[],[],[],[],[]),null,new G.q([],[],[],[],[],[],[],[],[]),null,new G.q([],[],[],[],[],[],[],[],[]),null,new G.q([],[],[],[],[],[],[],[],[]),null,new G.q([],[],[],[],[],[],[],[],[]),null,new G.q([],[],[],[],[],[],[],[],[]),null,new G.q([],[],[],[],[],[],[],[],[]),null,new G.q([],[],[],[],[],[],[],[],[]),null,new G.q([],[],[],[],[],[],[],[],[]))
$.e7=j
j.c=1
i=new P.pM(null,null)
H.oI()
$.jY=$.e2
i.iU(0)
r.nE(w,"dartray_isolate.dart",new K.uY(n),j,new K.uZ(z,m,l)).at(new K.v_(m,k,i))},"$0","lm",0,0,3],
uX:{
"^":"r:0;a",
$1:function(a){var z,y,x
z=J.lx(this.a)
if(z>>>0!==z||z>=10)return H.a(C.T,z)
y=C.T[z]
z=window.location
x=(z&&C.jC).gno(z)+"/"+H.l(window.location.pathname)+"?"+y
window.location.replace(x)}},
uY:{
"^":"r:35;a",
$2:function(a,b){var z,y,x
P.dB(H.l(b))
if(a!==4){z=this.a
y=J.ly(z)
x=H.l(b)+"\n"
if(y==null)return y.i()
z.textContent=y+x}}},
uZ:{
"^":"r:36;a,b,c",
$1:function(a){var z,y,x
z=a.a
y=this.b
if(!J.k(z,y.width)||!J.k(a.b,y.height)){y.width=z
y.height=a.b
this.a.a=P.l6(this.c.getImageData(0,0,y.width,y.height))}z=a.x.buffer
x=(z&&C.f).a0(z,0,null)
z=this.a
C.jD.bi(J.L(z.a),0,x.length,x)
C.aJ.nv(this.c,z.a,0,0)}},
v_:{
"^":"r:37;a,b,c",
$1:function(a){var z,y,x,w,v,u,t,s,r
z=this.c
z.iW(0)
z="FINISHED Render: "+P.mi(0,0,J.av(J.h(z.gmJ(),1e6),$.jY),0,0,0).E(0)
$.A.$2(0,z)
if(G.jX().length!==0){z="STATS....\n"+G.jX()
$.A.$2(0,z)}if(a!=null){y=a.nP(2.2)
z=new U.oF(4,6,H.p(Array(256),[P.o]))
a=U.de(!0,32768)
a.bR([137,80,78,71,13,10,26,10])
x=U.de(!0,32768)
w=y.a
x.cM(w)
v=y.b
x.cM(v)
x.ab(8)
x.ab(y.y===3?2:6)
x.ab(0)
x.ab(0)
x.ab(0)
u=x.c.buffer
z.f_(a,"IHDR",(u&&C.f).a0(u,0,x.a))
t=new Uint8Array(H.i(J.b(J.h(J.h(w,v),y.y),v)))
z.kK(y,t)
z.f_(a,"IDAT",new T.r3().mK(t,z.b))
z.f_(a,"IEND",[])
z=a.c.buffer
s=(z&&C.f).a0(z,0,a.a)
r=document.createElement("img",null)
r.id="renderImage"
this.b.appendChild(r)
this.a.hidden=!0
J.lD(r,"data:image/png;base64,"+M.rj(s,!1,!1))}}}},1]]
setupProgram(dart,0)
J.B=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.j9.prototype
return J.j8.prototype}if(typeof a=="string")return J.db.prototype
if(a==null)return J.nP.prototype
if(typeof a=="boolean")return J.nO.prototype
if(a.constructor==Array)return J.d9.prototype
if(typeof a!="object")return a
if(a instanceof P.j)return a
return J.eJ(a)}
J.y=function(a){if(typeof a=="string")return J.db.prototype
if(a==null)return a
if(a.constructor==Array)return J.d9.prototype
if(typeof a!="object")return a
if(a instanceof P.j)return a
return J.eJ(a)}
J.as=function(a){if(a==null)return a
if(a.constructor==Array)return J.d9.prototype
if(typeof a!="object")return a
if(a instanceof P.j)return a
return J.eJ(a)}
J.u=function(a){if(typeof a=="number")return J.da.prototype
if(a==null)return a
if(!(a instanceof P.j))return J.ei.prototype
return a}
J.G=function(a){if(typeof a=="number")return J.da.prototype
if(typeof a=="string")return J.db.prototype
if(a==null)return a
if(!(a instanceof P.j))return J.ei.prototype
return a}
J.bw=function(a){if(typeof a=="string")return J.db.prototype
if(a==null)return a
if(!(a instanceof P.j))return J.ei.prototype
return a}
J.z=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.j)return a
return J.eJ(a)}
J.b=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.G(a).i(a,b)}
J.J=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a&b)>>>0
return J.u(a).L(a,b)}
J.I=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.u(a).au(a,b)}
J.k=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.B(a).A(a,b)}
J.U=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>=b
return J.u(a).a9(a,b)}
J.V=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.u(a).T(a,b)}
J.aY=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<=b
return J.u(a).a6(a,b)}
J.a7=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.u(a).I(a,b)}
J.cm=function(a,b){return J.u(a).R(a,b)}
J.h=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.G(a).q(a,b)}
J.bd=function(a){if(typeof a=="number")return-a
return J.u(a).aa(a)}
J.aF=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a|b)>>>0
return J.u(a).cO(a,b)}
J.m=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.u(a).p(a,b)}
J.av=function(a,b){return J.u(a).ak(a,b)}
J.e=function(a,b){if(a.constructor==Array||typeof a=="string"||H.lc(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.y(a).h(a,b)}
J.n=function(a,b,c){if((a.constructor==Array||H.lc(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.as(a).k(a,b,c)}
J.ln=function(a,b,c,d){return J.z(a).k7(a,b,c,d)}
J.lo=function(a,b,c,d){return J.z(a).m2(a,b,c,d)}
J.lp=function(a,b,c){return J.z(a).m3(a,b,c)}
J.cW=function(a){return J.u(a).hT(a)}
J.cX=function(a,b){return J.as(a).a4(a,b)}
J.io=function(a,b,c){return J.z(a).bM(a,b,c)}
J.eO=function(a,b,c){return J.z(a).a0(a,b,c)}
J.P=function(a,b,c){return J.u(a).v(a,b,c)}
J.eP=function(a,b){return J.bw(a).P(a,b)}
J.ip=function(a,b,c){return J.y(a).i5(a,b,c)}
J.iq=function(a,b){return J.as(a).aJ(a,b)}
J.dC=function(a,b){return J.bw(a).dT(a,b)}
J.be=function(a,b,c,d){return J.as(a).ag(a,b,c,d)}
J.Y=function(a){return J.u(a).O(a)}
J.lq=function(a,b){return J.as(a).aH(a,b)}
J.dD=function(a){return J.z(a).ga5(a)}
J.cn=function(a){return J.z(a).gaz(a)}
J.lr=function(a){return J.bw(a).gmq(a)}
J.ls=function(a){return J.z(a).gmv(a)}
J.L=function(a){return J.z(a).gB(a)}
J.bm=function(a){return J.z(a).gd6(a)}
J.lt=function(a){return J.as(a).gac(a)}
J.aG=function(a){return J.B(a).gav(a)}
J.cY=function(a){return J.z(a).gC(a)}
J.lu=function(a){return J.y(a).gY(a)}
J.bx=function(a){return J.y(a).gbe(a)}
J.co=function(a){return J.as(a).gad(a)}
J.ir=function(a){return J.as(a).gaw(a)}
J.M=function(a){return J.y(a).gm(a)}
J.aw=function(a){return J.z(a).gZ(a)}
J.lv=function(a){return J.z(a).gik(a)}
J.cp=function(a){return J.z(a).ge3(a)}
J.lw=function(a){return J.z(a).gnI(a)}
J.lx=function(a){return J.z(a).giF(a)}
J.ly=function(a){return J.z(a).gnN(a)}
J.cZ=function(a){return J.z(a).gD(a)}
J.ao=function(a){return J.z(a).gM(a)}
J.a8=function(a){return J.z(a).gK(a)}
J.ag=function(a){return J.z(a).gao(a)}
J.lz=function(a,b){return J.as(a).cE(a,b)}
J.lA=function(a){return J.as(a).nz(a)}
J.lB=function(a,b){return J.z(a).nH(a,b)}
J.by=function(a,b){return J.z(a).ce(a,b)}
J.lC=function(a,b){return J.z(a).sf9(a,b)}
J.eQ=function(a,b){return J.y(a).sm(a,b)}
J.dE=function(a,b){return J.z(a).saf(a,b)}
J.lD=function(a,b){return J.z(a).sbH(a,b)}
J.eR=function(a,b,c,d,e){return J.as(a).aj(a,b,c,d,e)}
J.lE=function(a,b,c){return J.as(a).ay(a,b,c)}
J.lF=function(a,b,c){return J.bw(a).as(a,b,c)}
J.is=function(a){return J.u(a).nO(a)}
J.aH=function(a){return J.u(a).F(a)}
J.d_=function(a,b,c){return J.as(a).iz(a,b,c)}
J.dF=function(a){return J.bw(a).nR(a)}
J.bS=function(a){return J.B(a).E(a)}
J.lG=function(a){return J.bw(a).nW(a)}
I.d=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.aJ=W.lW.prototype
C.aK=W.fp.prototype
C.e=J.d9.prototype
C.d=J.j8.prototype
C.a=J.j9.prototype
C.b=J.da.prototype
C.c=J.db.prototype
C.jC=W.oa.prototype
C.f=H.fU.prototype
C.B=H.on.prototype
C.q=H.os.prototype
C.jD=H.ou.prototype
C.h=H.fW.prototype
C.jE=W.ov.prototype
C.jF=J.oD.prototype
C.jG=J.ei.prototype
C.aH=new H.iI()
C.aI=new P.oA()
C.U=new P.rk()
C.i=new P.rT()
C.a2=new P.bg(0)
C.aL=function() {  function typeNameInChrome(o) {    var constructor = o.constructor;    if (constructor) {      var name = constructor.name;      if (name) return name;    }    var s = Object.prototype.toString.call(o);    return s.substring(8, s.length - 1);  }  function getUnknownTag(object, tag) {    if (/^HTML[A-Z].*Element$/.test(tag)) {      var name = Object.prototype.toString.call(object);      if (name == "[object Object]") return null;      return "HTMLElement";    }  }  function getUnknownTagGenericBrowser(object, tag) {    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";    return getUnknownTag(object, tag);  }  function prototypeForTag(tag) {    if (typeof window == "undefined") return null;    if (typeof window[tag] == "undefined") return null;    var constructor = window[tag];    if (typeof constructor != "function") return null;    return constructor.prototype;  }  function discriminator(tag) { return null; }  var isBrowser = typeof navigator == "object";  return {    getTag: typeNameInChrome,    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,    prototypeForTag: prototypeForTag,    discriminator: discriminator };}
C.a3=function(hooks) { return hooks; }
C.aM=function(hooks) {  if (typeof dartExperimentalFixupGetTag != "function") return hooks;  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);}
C.aN=function(hooks) {  var getTag = hooks.getTag;  var prototypeForTag = hooks.prototypeForTag;  function getTagFixed(o) {    var tag = getTag(o);    if (tag == "Document") {      // "Document", so we check for the xmlVersion property, which is the empty      if (!!o.xmlVersion) return "!Document";      return "!HTMLDocument";    }    return tag;  }  function prototypeForTagFixed(tag) {    if (tag == "Document") return null;    return prototypeForTag(tag);  }  hooks.getTag = getTagFixed;  hooks.prototypeForTag = prototypeForTagFixed;}
C.aO=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Firefox") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "GeoGeolocation": "Geolocation",    "Location": "!Location",    "WorkerMessageEvent": "MessageEvent",    "XMLDocument": "!Document"};  function getTagFirefox(o) {    var tag = getTag(o);    return quickMap[tag] || tag;  }  hooks.getTag = getTagFirefox;}
C.aP=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Trident/") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "HTMLDDElement": "HTMLElement",    "HTMLDTElement": "HTMLElement",    "HTMLPhraseElement": "HTMLElement",    "Position": "Geoposition"  };  function getTagIE(o) {    var tag = getTag(o);    var newTag = quickMap[tag];    if (newTag) return newTag;    if (tag == "Object") {      if (window.DataView && (o instanceof window.DataView)) return "DataView";    }    return tag;  }  function prototypeForTagIE(tag) {    var constructor = window[tag];    if (constructor == null) return null;    return constructor.prototype;  }  hooks.getTag = getTagIE;  hooks.prototypeForTag = prototypeForTagIE;}
C.a4=function getTagFallback(o) {  var constructor = o.constructor;  if (typeof constructor == "function") {    var name = constructor.name;    if (typeof name == "string" &&        // constructor name does not 'stick'.  The shortest real DOM object        name.length > 2 &&        // On Firefox we often get "Object" as the constructor name, even for        name !== "Object" &&        name !== "Function.prototype") {      return name;    }  }  var s = Object.prototype.toString.call(o);  return s.substring(8, s.length - 1);}
C.aQ=function(getTagFallback) {  return function(hooks) {    if (typeof navigator != "object") return hooks;    var ua = navigator.userAgent;    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;    if (ua.indexOf("Chrome") >= 0) {      function confirm(p) {        return typeof window == "object" && window[p] && window[p].name == p;      }      if (confirm("Window") && confirm("HTMLElement")) return hooks;    }    hooks.getTag = getTagFallback;  };}
C.V=I.d([U.u4(),U.uh(),U.uk(),U.ub(),U.u6(),U.u5(),U.u7()])
C.w=I.d([0,2,8])
C.b_=I.d([0,4,2,1])
C.a5=I.d([1,2,0])
C.F=I.d([292,260,226,226])
C.G=I.d([8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8])
C.a6=I.d([137,80,78,71,13,10,26,10])
C.H=I.d([0,0,32776,33792,1,10240,0,0])
C.b7=I.d([2,0,1])
C.a7=I.d([2,3,7])
C.bk=I.d([3,3,11])
C.a9=I.d([511,1023,2047,4095])
C.aa=I.d([0,16,32,48,64,80,96,112,128,144,160,176,192,208,224,240,256,272,288,304,320,336,352,368,384,400,416,432,448,464,480,496,512,528,544,560,576,592,608,624,640,656,672,688,704,720,736,752,768,784,800,816,832,848,864,880,896,912,928,944,960,976,992,1008,1024,1040,1056,1072,1088,1104,1120,1136,1152,1168,1184,1200,1216,1232,1248,1264,1280,1296,1312,1328,1344,1360,1376,1392,1408,1424,1440,1456,1472,1488,1504,1520,1536,1552,1568,1584,1600,1616,1632,1648,1664,1680,1696,1712,1728,1744,1760,1776,1792,1808,1824,1840,1856,1872,1888,1904,1920,1936,1952,1968,1984,2000,2016,2032,2048,2064,2080,2096,2112,2128,2144,2160,2176,2192,2208,2224,2240,2256,2272,2288,2304,2320,2336,2352,2368,2384,2400,2416,2432,2448,2464,2480,2496,2512,2528,2544,2560,2576,2592,2608,2624,2640,2656,2672,2688,2704,2720,2736,2752,2768,2784,2800,2816,2832,2848,2864,2880,2896,2912,2928,2944,2960,2976,2992,3008,3024,3040,3056,3072,3088,3104,3120,3136,3152,3168,3184,3200,3216,3232,3248,3264,3280,3296,3312,3328,3344,3360,3376,3392,3408,3424,3440,3456,3472,3488,3504,3520,3536,3552,3568,3584,3600,3616,3632,3648,3664,3680,3696,3712,3728,3744,3760,3776,3792,3808,3824,3840,3856,3872,3888,3904,3920,3936,3952,3968,3984,4000,4016,4032,4048,4064,4080])
C.ds=I.d([231,120,48,89,115,113,120,152,112])
C.ic=I.d([152,179,64,126,170,118,46,70,95])
C.id=I.d([175,69,143,80,85,82,72,155,103])
C.ie=I.d([56,58,10,171,218,189,17,13,152])
C.ir=I.d([114,26,17,163,44,195,21,10,173])
C.iC=I.d([121,24,80,195,26,62,44,64,85])
C.iN=I.d([144,71,10,38,171,213,144,34,26])
C.iY=I.d([170,46,55,19,136,160,33,206,71])
C.j8=I.d([63,20,8,114,114,208,12,9,226])
C.jj=I.d([81,40,11,96,182,84,29,16,36])
C.ho=I.d([C.ds,C.ic,C.id,C.ie,C.ir,C.iC,C.iN,C.iY,C.j8,C.jj])
C.ju=I.d([134,183,89,137,98,101,106,165,148])
C.jw=I.d([72,187,100,130,157,111,32,75,80])
C.ig=I.d([66,102,167,99,74,62,40,234,128])
C.fk=I.d([41,53,9,178,241,141,26,8,107])
C.ih=I.d([74,43,26,146,73,166,49,23,157])
C.ii=I.d([65,38,105,160,51,52,31,115,128])
C.ev=I.d([104,79,12,27,217,255,87,17,7])
C.ij=I.d([87,68,71,44,114,51,15,186,23])
C.ik=I.d([47,41,14,110,182,183,21,17,194])
C.il=I.d([66,45,25,102,197,189,23,18,22])
C.cO=I.d([C.ju,C.jw,C.ig,C.fk,C.ih,C.ii,C.ev,C.ij,C.ik,C.il])
C.im=I.d([88,88,147,150,42,46,45,196,205])
C.io=I.d([43,97,183,117,85,38,35,179,61])
C.ip=I.d([39,53,200,87,26,21,43,232,171])
C.iq=I.d([56,34,51,104,114,102,29,93,77])
C.is=I.d([39,28,85,171,58,165,90,98,64])
C.it=I.d([34,22,116,206,23,34,43,166,73])
C.iu=I.d([107,54,32,26,51,1,81,43,31])
C.iv=I.d([68,25,106,22,64,171,36,225,114])
C.iw=I.d([34,19,21,102,132,188,16,76,124])
C.ix=I.d([62,18,78,95,85,57,50,48,51])
C.c2=I.d([C.im,C.io,C.ip,C.iq,C.is,C.it,C.iu,C.iv,C.iw,C.ix])
C.iy=I.d([193,101,35,159,215,111,89,46,111])
C.iz=I.d([60,148,31,172,219,228,21,18,111])
C.ew=I.d([112,113,77,85,179,255,38,120,114])
C.fl=I.d([40,42,1,196,245,209,10,25,109])
C.iA=I.d([88,43,29,140,166,213,37,43,154])
C.iB=I.d([61,63,30,155,67,45,68,1,209])
C.iD=I.d([100,80,8,43,154,1,51,26,71])
C.fm=I.d([142,78,78,16,255,128,34,197,171])
C.iE=I.d([41,40,5,102,211,183,4,1,221])
C.iF=I.d([51,50,17,168,209,192,23,25,82])
C.cJ=I.d([C.iy,C.iz,C.ew,C.fl,C.iA,C.iB,C.iD,C.fm,C.iE,C.iF])
C.fn=I.d([138,31,36,171,27,166,38,44,229])
C.iG=I.d([67,87,58,169,82,115,26,59,179])
C.iH=I.d([63,59,90,180,59,166,93,73,154])
C.iI=I.d([40,40,21,116,143,209,34,39,175])
C.iJ=I.d([47,15,16,183,34,223,49,45,183])
C.iK=I.d([46,17,33,183,6,98,15,32,183])
C.iL=I.d([57,46,22,24,128,1,54,17,37])
C.iM=I.d([65,32,73,115,28,128,23,128,205])
C.iO=I.d([40,3,9,115,51,192,18,6,223])
C.iP=I.d([87,37,9,115,59,77,64,21,47])
C.hF=I.d([C.fn,C.iG,C.iH,C.iI,C.iJ,C.iK,C.iL,C.iM,C.iO,C.iP])
C.iQ=I.d([104,55,44,218,9,54,53,130,226])
C.iR=I.d([64,90,70,205,40,41,23,26,57])
C.iS=I.d([54,57,112,184,5,41,38,166,213])
C.iT=I.d([30,34,26,133,152,116,10,32,134])
C.fo=I.d([39,19,53,221,26,114,32,73,255])
C.iU=I.d([31,9,65,234,2,15,1,118,73])
C.ex=I.d([75,32,12,51,192,255,160,43,51])
C.iV=I.d([88,31,35,67,102,85,55,186,85])
C.iW=I.d([56,21,23,111,59,205,45,37,192])
C.iX=I.d([55,38,70,124,73,102,1,34,98])
C.aR=I.d([C.iQ,C.iR,C.iS,C.iT,C.fo,C.iU,C.ex,C.iV,C.iW,C.iX])
C.iZ=I.d([125,98,42,88,104,85,117,175,82])
C.j_=I.d([95,84,53,89,128,100,113,101,45])
C.j0=I.d([75,79,123,47,51,128,81,171,1])
C.j1=I.d([57,17,5,71,102,57,53,41,49])
C.j2=I.d([38,33,13,121,57,73,26,1,85])
C.j3=I.d([41,10,67,138,77,110,90,47,114])
C.ey=I.d([115,21,2,10,102,255,166,23,6])
C.j4=I.d([101,29,16,10,85,128,101,196,26])
C.j5=I.d([57,18,10,102,102,213,34,20,43])
C.j6=I.d([117,20,15,36,163,128,68,1,26])
C.dR=I.d([C.iZ,C.j_,C.j0,C.j1,C.j2,C.j3,C.ey,C.j4,C.j5,C.j6])
C.eY=I.d([102,61,71,37,34,53,31,243,192])
C.j7=I.d([69,60,71,38,73,119,28,222,37])
C.eZ=I.d([68,45,128,34,1,47,11,245,171])
C.j9=I.d([62,17,19,70,146,85,55,62,70])
C.ja=I.d([37,43,37,154,100,163,85,160,1])
C.jb=I.d([63,9,92,136,28,64,32,201,85])
C.ez=I.d([75,15,9,9,64,255,184,119,16])
C.eA=I.d([86,6,28,5,64,255,25,248,1])
C.eB=I.d([56,8,17,132,137,255,55,116,128])
C.jc=I.d([58,15,20,82,135,57,26,121,40])
C.bw=I.d([C.eY,C.j7,C.eZ,C.j9,C.ja,C.jb,C.ez,C.eA,C.eB,C.jc])
C.jd=I.d([164,50,31,137,154,133,25,35,218])
C.je=I.d([51,103,44,131,131,123,31,6,158])
C.jf=I.d([86,40,64,135,148,224,45,183,128])
C.jg=I.d([22,26,17,131,240,154,14,1,209])
C.jh=I.d([45,16,21,91,64,222,7,1,197])
C.ji=I.d([56,21,39,155,60,138,23,102,213])
C.eC=I.d([83,12,13,54,192,255,68,47,28])
C.jk=I.d([85,26,85,85,128,128,32,146,171])
C.jl=I.d([18,11,7,63,144,171,4,4,246])
C.jm=I.d([35,27,10,146,174,171,12,26,128])
C.dS=I.d([C.jd,C.je,C.jf,C.jg,C.jh,C.ji,C.eC,C.jk,C.jl,C.jm])
C.jn=I.d([190,80,35,99,180,80,126,54,45])
C.jo=I.d([85,126,47,87,176,51,41,20,32])
C.jp=I.d([101,75,128,139,118,146,116,128,85])
C.jq=I.d([56,41,15,176,236,85,37,9,62])
C.eD=I.d([71,30,17,119,118,255,17,18,138])
C.jr=I.d([101,38,60,138,55,70,43,26,142])
C.eE=I.d([146,36,19,30,171,255,97,27,20])
C.js=I.d([138,45,61,62,219,1,81,188,64])
C.jt=I.d([32,41,20,117,151,142,20,21,163])
C.jv=I.d([112,19,12,61,195,128,48,4,24])
C.df=I.d([C.jn,C.jo,C.jp,C.jq,C.eD,C.jr,C.eE,C.js,C.jt,C.jv])
C.ab=I.d([C.ho,C.cO,C.c2,C.cJ,C.hF,C.aR,C.dR,C.bw,C.dS,C.df])
C.I=I.d([3226,6412,200,168,38,38,134,134,100,100,100,100,68,68,68,68])
C.bH=I.d([8,8,4,2])
C.ac=I.d([U.u_(),U.uf(),U.ui(),U.u9(),U.u1(),U.u0(),U.u2()])
C.K=I.d([7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0])
C.y=I.d([4,5,6,7,8,9,10,10,11,12,13,14,15,16,17,17,18,19,20,20,21,21,22,22,23,23,24,25,25,26,27,28,29,30,31,32,33,34,35,36,37,37,38,39,40,41,42,43,44,45,46,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,76,77,78,79,80,81,82,83,84,85,86,87,88,89,91,93,95,96,98,100,101,102,104,106,108,110,112,114,116,118,122,124,126,128,130,132,134,136,138,140,143,145,148,151,154,157])
C.J=I.d([80,88,23,71,30,30,62,62,4,4,4,4,4,4,4,4,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41])
C.bO=I.d([1.400313,1.38,1.358438,1.34,1.329063,1.325,1.3325,1.34,1.334375,1.325,1.317812,1.31,1.300313,1.29,1.281563,1.27,1.249062,1.225,1.2,1.18,1.174375,1.175,1.1775,1.18,1.178125,1.175,1.172812,1.17,1.165312,1.16,1.155312,1.15,1.142812,1.135,1.131562,1.12,1.092437,1.04,0.950375,0.826,0.645875,0.468,0.35125,0.272,0.230813,0.214,0.20925,0.213,0.21625,0.223,0.2365,0.25,0.254188,0.26,0.28,0.3])
C.ad=I.d([24,7,23,25,40,6,39,41,22,26,38,42,56,5,55,57,21,27,54,58,37,43,72,4,71,73,20,28,53,59,70,74,36,44,88,69,75,52,60,3,87,89,19,29,86,90,35,45,68,76,85,91,51,61,104,2,103,105,18,30,102,106,34,46,84,92,67,77,101,107,50,62,120,1,119,121,83,93,17,31,100,108,66,78,118,122,33,47,117,123,49,63,99,109,82,94,0,116,124,65,79,16,32,98,110,48,115,125,81,95,64,114,126,97,111,80,113,127,96,112])
C.u=I.d([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63])
C.z=I.d([4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,119,122,125,128,131,134,137,140,143,146,149,152,155,158,161,164,167,170,173,177,181,185,189,193,197,201,205,209,213,217,221,225,229,234,239,245,249,254,259,264,269,274,279,284])
C.r=I.d([0,1,2,3,4,4,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,0,0,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29])
C.p=I.d([0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918e3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117])
C.ae=I.d([0,0,65490,45055,65535,34815,65534,18431])
C.c0=I.d([1.041462802142675,1.0328661533771188,1.0126146228964314,1.035046052483621,1.0078661447098567,1.042228038508128,1.0442596738499825,1.0535238290294409,1.018077622693812,1.0442729908727713,1.052936254192075,1.0537034271160244,1.053390186921597,1.0537782700979574,1.0527093770467102,1.0530449040446797,1.0550554640191208,1.055367361072482,1.0454306634683976,0.623489506392308,0.18038071613188977,-0.007630375920198454,-0.00015217847035781367,-0.007510225734725831,-0.002170863932849147,0.0006591946660236964,0.01227881531853978,-0.004466977563720803,0.017119799082865147,0.00492110897597598,0.0058762925143334985,0.02525939941555008])
C.C=I.d([0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535,131071,262143,524287,1048575,2097151,4194303,8388607,16777215,33554431,67108863,134217727,268435455,536870911,1073741823,2147483647,4294967295])
C.n=I.d([0,79764919,159529838,222504665,319059676,398814059,445009330,507990021,638119352,583659535,797628118,726387553,890018660,835552979,1015980042,944750013,1276238704,1221641927,1167319070,1095957929,1595256236,1540665371,1452775106,1381403509,1780037320,1859660671,1671105958,1733955601,2031960084,2111593891,1889500026,1952343757,2552477408,2632100695,2443283854,2506133561,2334638140,2414271883,2191915858,2254759653,3190512472,3135915759,3081330742,3009969537,2905550212,2850959411,2762807018,2691435357,3560074640,3505614887,3719321342,3648080713,3342211916,3287746299,3467911202,3396681109,4063920168,4143685023,4223187782,4286162673,3779000052,3858754371,3904687514,3967668269,881225847,809987520,1023691545,969234094,662832811,591600412,771767749,717299826,311336399,374308984,453813921,533576470,25881363,88864420,134795389,214552010,2023205639,2086057648,1897238633,1976864222,1804852699,1867694188,1645340341,1724971778,1587496639,1516133128,1461550545,1406951526,1302016099,1230646740,1142491917,1087903418,2896545431,2825181984,2770861561,2716262478,3215044683,3143675388,3055782693,3001194130,2326604591,2389456536,2200899649,2280525302,2578013683,2640855108,2418763421,2498394922,3769900519,3832873040,3912640137,3992402750,4088425275,4151408268,4197601365,4277358050,3334271071,3263032808,3476998961,3422541446,3585640067,3514407732,3694837229,3640369242,1762451694,1842216281,1619975040,1682949687,2047383090,2127137669,1938468188,2001449195,1325665622,1271206113,1183200824,1111960463,1543535498,1489069629,1434599652,1363369299,622672798,568075817,748617968,677256519,907627842,853037301,1067152940,995781531,51762726,131386257,177728840,240578815,269590778,349224269,429104020,491947555,4046411278,4126034873,4172115296,4234965207,3794477266,3874110821,3953728444,4016571915,3609705398,3555108353,3735388376,3664026991,3290680682,3236090077,3449943556,3378572211,3174993278,3120533705,3032266256,2961025959,2923101090,2868635157,2813903052,2742672763,2604032198,2683796849,2461293480,2524268063,2284983834,2364738477,2175806836,2238787779,1569362073,1498123566,1409854455,1355396672,1317987909,1246755826,1192025387,1137557660,2072149281,2135122070,1912620623,1992383480,1753615357,1816598090,1627664531,1707420964,295390185,358241886,404320391,483945776,43990325,106832002,186451547,266083308,932423249,861060070,1041341759,986742920,613929101,542559546,756411363,701822548,3316196985,3244833742,3425377559,3370778784,3601682597,3530312978,3744426955,3689838204,3819031489,3881883254,3928223919,4007849240,4037393693,4100235434,4180117107,4259748804,2310601993,2373574846,2151335527,2231098320,2596047829,2659030626,2470359227,2550115596,2947551409,2876312838,2788305887,2733848168,3165939309,3094707162,3040238851,2985771188])
C.o=I.d([619,720,127,481,931,816,813,233,566,247,985,724,205,454,863,491,741,242,949,214,733,859,335,708,621,574,73,654,730,472,419,436,278,496,867,210,399,680,480,51,878,465,811,169,869,675,611,697,867,561,862,687,507,283,482,129,807,591,733,623,150,238,59,379,684,877,625,169,643,105,170,607,520,932,727,476,693,425,174,647,73,122,335,530,442,853,695,249,445,515,909,545,703,919,874,474,882,500,594,612,641,801,220,162,819,984,589,513,495,799,161,604,958,533,221,400,386,867,600,782,382,596,414,171,516,375,682,485,911,276,98,553,163,354,666,933,424,341,533,870,227,730,475,186,263,647,537,686,600,224,469,68,770,919,190,373,294,822,808,206,184,943,795,384,383,461,404,758,839,887,715,67,618,276,204,918,873,777,604,560,951,160,578,722,79,804,96,409,713,940,652,934,970,447,318,353,859,672,112,785,645,863,803,350,139,93,354,99,820,908,609,772,154,274,580,184,79,626,630,742,653,282,762,623,680,81,927,626,789,125,411,521,938,300,821,78,343,175,128,250,170,774,972,275,999,639,495,78,352,126,857,956,358,619,580,124,737,594,701,612,669,112,134,694,363,992,809,743,168,974,944,375,748,52,600,747,642,182,862,81,344,805,988,739,511,655,814,334,249,515,897,955,664,981,649,113,974,459,893,228,433,837,553,268,926,240,102,654,459,51,686,754,806,760,493,403,415,394,687,700,946,670,656,610,738,392,760,799,887,653,978,321,576,617,626,502,894,679,243,440,680,879,194,572,640,724,926,56,204,700,707,151,457,449,797,195,791,558,945,679,297,59,87,824,713,663,412,693,342,606,134,108,571,364,631,212,174,643,304,329,343,97,430,751,497,314,983,374,822,928,140,206,73,263,980,736,876,478,430,305,170,514,364,692,829,82,855,953,676,246,369,970,294,750,807,827,150,790,288,923,804,378,215,828,592,281,565,555,710,82,896,831,547,261,524,462,293,465,502,56,661,821,976,991,658,869,905,758,745,193,768,550,608,933,378,286,215,979,792,961,61,688,793,644,986,403,106,366,905,644,372,567,466,434,645,210,389,550,919,135,780,773,635,389,707,100,626,958,165,504,920,176,193,713,857,265,203,50,668,108,645,990,626,197,510,357,358,850,858,364,936,638])
C.L=I.d([0,1,2,3,6,4,5,6,6,6,6,6,6,6,6,7,0])
C.af=I.d([null,U.uB(),U.uC(),U.uA()])
C.ag=I.d([0,0,26624,1023,65534,2047,65534,2047])
C.j=I.d([380,390.967743,401.935486,412.903229,423.870972,434.838715,445.806458,456.7742,467.741943,478.709686,489.677429,500.645172,511.612915,522.580627,533.54834,544.516052,555.483765,566.451477,577.419189,588.386902,599.354614,610.322327,621.290039,632.257751,643.225464,654.193176,665.160889,676.128601,687.096313,698.064026,709.031738,720])
C.cP=I.d([0.002775695896581197,0.003967382099064661,-0.0001460693678860675,0.00036198394557748065,-0.00025819258699309733,-0.000050133191628082274,-0.00024437242866157116,-0.00007806141994803895,0.04969030120754092,0.48515973574763166,1.029572585436059,1.0333210878457741,1.0368102644026933,1.0364884018886333,1.0365427939411784,1.036859540285454,1.0365645405660555,1.0363938240707142,1.0367205578770746,1.036523932944605,1.0361531226427443,1.0348785007827348,1.0042729660717318,0.8421848643235428,0.7375939489480157,0.6585315450029464,0.6053168244406628,0.5954979413242074,0.5941926127844314,0.5651768232663427,0.5606118601496856,0.5822861038101872])
C.cQ=I.d([0.9920977146972068,0.9887642605936913,0.9953904074450564,0.9952931735300822,0.9918144741163395,1.0002584039673432,0.9996847843734251,0.9998812076665717,0.9850401214637043,0.7902984905303128,0.5608219861746397,0.3313345851399653,0.13692410840839175,0.01891490655966415,-0.000005112977093255089,-0.00042395493167891873,-0.00041934593101534273,0.0017473028136486615,0.0037999160177631316,-0.0005510147490658864,-0.000043716662898480967,0.00758745017487328,0.02579565078055402,0.03816837653250055,0.04948958640803083,0.049595992290102905,0.04981481950581225,0.03984091106497802,0.03050102493723387,0.02124305476524108,0.00695965321043564,0.0041733649330980525])
C.t=I.d([28679,28679,31752,-32759,-31735,-30711,-29687,-28663,29703,29703,30727,30727,-27639,-26615,-25591,-24567])
C.m=I.d([255,255,255,255,255,255,255,255,255,255,255])
C.x=I.d([C.m,C.m,C.m])
C.fJ=I.d([176,246,255,255,255,255,255,255,255,255,255])
C.du=I.d([223,241,252,255,255,255,255,255,255,255,255])
C.h1=I.d([249,253,253,255,255,255,255,255,255,255,255])
C.cg=I.d([C.fJ,C.du,C.h1])
C.fD=I.d([255,244,252,255,255,255,255,255,255,255,255])
C.hi=I.d([234,254,254,255,255,255,255,255,255,255,255])
C.ax=I.d([253,255,255,255,255,255,255,255,255,255,255])
C.eO=I.d([C.fD,C.hi,C.ax])
C.fE=I.d([255,246,254,255,255,255,255,255,255,255,255])
C.hK=I.d([239,253,254,255,255,255,255,255,255,255,255])
C.ak=I.d([254,255,254,255,255,255,255,255,255,255,255])
C.d5=I.d([C.fE,C.hK,C.ak])
C.au=I.d([255,248,254,255,255,255,255,255,255,255,255])
C.hL=I.d([251,255,254,255,255,255,255,255,255,255,255])
C.jx=I.d([C.au,C.hL,C.m])
C.a1=I.d([255,253,254,255,255,255,255,255,255,255,255])
C.fF=I.d([251,254,254,255,255,255,255,255,255,255,255])
C.bT=I.d([C.a1,C.fF,C.ak])
C.eJ=I.d([255,254,253,255,254,255,255,255,255,255,255])
C.hD=I.d([250,255,254,255,254,255,255,255,255,255,255])
C.M=I.d([254,255,255,255,255,255,255,255,255,255,255])
C.bl=I.d([C.eJ,C.hD,C.M])
C.hB=I.d([C.x,C.cg,C.eO,C.d5,C.jx,C.bT,C.bl,C.x])
C.cU=I.d([217,255,255,255,255,255,255,255,255,255,255])
C.fx=I.d([225,252,241,253,255,255,254,255,255,255,255])
C.hA=I.d([234,250,241,250,253,255,253,254,255,255,255])
C.ch=I.d([C.cU,C.fx,C.hA])
C.X=I.d([255,254,255,255,255,255,255,255,255,255,255])
C.hj=I.d([223,254,254,255,255,255,255,255,255,255,255])
C.aS=I.d([238,253,254,254,255,255,255,255,255,255,255])
C.dr=I.d([C.X,C.hj,C.aS])
C.cp=I.d([249,254,255,255,255,255,255,255,255,255,255])
C.hG=I.d([C.au,C.cp,C.m])
C.h2=I.d([255,253,255,255,255,255,255,255,255,255,255])
C.cq=I.d([247,254,255,255,255,255,255,255,255,255,255])
C.cw=I.d([C.h2,C.cq,C.m])
C.cV=I.d([252,255,255,255,255,255,255,255,255,255,255])
C.h7=I.d([C.a1,C.cV,C.m])
C.av=I.d([255,254,254,255,255,255,255,255,255,255,255])
C.fS=I.d([C.av,C.ax,C.m])
C.cr=I.d([255,254,253,255,255,255,255,255,255,255,255])
C.ah=I.d([250,255,255,255,255,255,255,255,255,255,255])
C.b4=I.d([C.cr,C.ah,C.M])
C.bZ=I.d([C.ch,C.dr,C.hG,C.cw,C.h7,C.fS,C.b4,C.x])
C.dv=I.d([186,251,250,255,255,255,255,255,255,255,255])
C.aT=I.d([234,251,244,254,255,255,255,255,255,255,255])
C.cH=I.d([251,251,243,253,254,255,254,255,255,255,255])
C.hz=I.d([C.dv,C.aT,C.cH])
C.dw=I.d([236,253,254,255,255,255,255,255,255,255,255])
C.bM=I.d([251,253,253,254,254,255,255,255,255,255,255])
C.eF=I.d([C.a1,C.dw,C.bM])
C.hk=I.d([254,254,254,255,255,255,255,255,255,255,255])
C.eP=I.d([C.av,C.hk,C.m])
C.fK=I.d([254,254,255,255,255,255,255,255,255,255,255])
C.da=I.d([C.X,C.fK,C.M])
C.aF=I.d([C.m,C.M,C.m])
C.dc=I.d([C.hz,C.eF,C.eP,C.da,C.aF,C.x,C.x,C.x])
C.cW=I.d([248,255,255,255,255,255,255,255,255,255,255])
C.bS=I.d([250,254,252,254,255,255,255,255,255,255,255])
C.fL=I.d([248,254,249,253,255,255,255,255,255,255,255])
C.eX=I.d([C.cW,C.bS,C.fL])
C.h3=I.d([255,253,253,255,255,255,255,255,255,255,255])
C.cX=I.d([246,253,253,255,255,255,255,255,255,255,255])
C.aU=I.d([252,254,251,254,254,255,255,255,255,255,255])
C.aV=I.d([C.h3,C.cX,C.aU])
C.fG=I.d([255,254,252,255,255,255,255,255,255,255,255])
C.fM=I.d([248,254,253,255,255,255,255,255,255,255,255])
C.fz=I.d([253,255,254,254,255,255,255,255,255,255,255])
C.bX=I.d([C.fG,C.fM,C.fz])
C.hM=I.d([255,251,254,255,255,255,255,255,255,255,255])
C.hN=I.d([245,251,254,255,255,255,255,255,255,255,255])
C.hO=I.d([253,253,254,255,255,255,255,255,255,255,255])
C.hp=I.d([C.hM,C.hN,C.hO])
C.h4=I.d([255,251,253,255,255,255,255,255,255,255,255])
C.dx=I.d([252,253,254,255,255,255,255,255,255,255,255])
C.hr=I.d([C.h4,C.dx,C.X])
C.cs=I.d([255,252,255,255,255,255,255,255,255,255,255])
C.hP=I.d([249,255,254,255,255,255,255,255,255,255,255])
C.hQ=I.d([255,255,254,255,255,255,255,255,255,255,255])
C.bn=I.d([C.cs,C.hP,C.hQ])
C.h5=I.d([255,255,253,255,255,255,255,255,255,255,255])
C.jy=I.d([C.h5,C.ah,C.m])
C.bC=I.d([C.eX,C.aV,C.bX,C.hp,C.hr,C.bn,C.jy,C.aF])
C.cR=I.d([C.hB,C.bZ,C.dc,C.bC])
C.Y=I.d([0,1,2,3,4,5,6,7,8,8,9,9,10,10,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,16,16,16,16,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28])
C.db=I.d([0.005574062292492087,-0.004798283163144679,-0.00525365642986138,-0.006457148004449971,-0.005969351465800701,-0.002183671603768672,0.016781120601055327,0.09609635542906264,0.21217357081986446,0.3616913329068507,0.5396101154323253,0.7440881049217151,0.9220957114839405,1.0460304298411225,1.0513824989063714,1.0511991822135085,1.0510530911991052,1.051739723036051,1.0516043086790485,1.051194403206146,1.0511590325868068,1.051661246548303,1.0514038526836869,1.0515941029228475,1.051146043696084,1.0515123758830476,1.0508871369510702,1.050892370810238,1.0477492815668303,1.0493272144017338,1.0435963333422726,1.0392280772051465])
C.dd=I.d([1.1334479663682135,1.1266762330194116,1.1346827504710164,1.1357395805744794,1.1356371830149636,1.1361152989346193,1.1362179057706772,1.1364819652587022,1.1355107110714324,1.1364060941199556,1.1360363621722465,1.1360122641141395,1.135426688246703,1.1363099407179136,1.1355450412632506,1.1353732327376378,1.1349496420726002,1.1111113947168556,0.9059874042972714,0.6116078078746533,0.29539752170999634,0.0959542006711501,-0.011650792030826267,-0.012144633073395025,-0.011148167569748318,-0.011997606668458151,-0.005050685547539485,-0.007998274581954215,-0.009472281770823642,-0.0055329541006658815,-0.004542891402827449,-0.012541015360921132])
C.de=I.d([0.9942213815123685,0.9898693712297568,0.9829365828611696,0.9962786839985931,1.0198955019000133,1.016639550121036,1.0220913178757398,0.9965166604068244,1.0097766178917882,1.0215422470827016,0.6403195338779096,0.0025012379477078184,0.006533993955576994,0.0028334080462675826,-51209675389074505e-27,-0.009059229164664638,0.00339367183233312,-0.0030638741121828406,0.22203936168286292,0.6314114002481197,0.9748098557650096,0.9720956233359057,1.017377030286815,0.9987519432273413,0.9470172573960224,0.852586231543548,0.9489779858166084,0.9475187609652149,0.9959894419105979,0.8630135150380908,0.8915098785352314,0.8486649265284508])
C.ai=I.d([0,1,3,7,15,31,63,127,255,511,1023,2047,4095])
C.W=I.d([128,128,128,128,128,128,128,128,128,128,128])
C.ar=I.d([C.W,C.W,C.W])
C.eh=I.d([253,136,254,255,228,219,128,128,128,128,128])
C.dZ=I.d([189,129,242,255,227,213,255,219,128,128,128])
C.i7=I.d([106,126,227,252,214,209,255,255,128,128,128])
C.i5=I.d([C.eh,C.dZ,C.i7])
C.cy=I.d([1,98,248,255,236,226,255,255,128,128,128])
C.eo=I.d([181,133,238,254,221,234,255,154,128,128,128])
C.e_=I.d([78,134,202,247,198,180,255,219,128,128,128])
C.f3=I.d([C.cy,C.eo,C.e_])
C.cS=I.d([1,185,249,255,243,255,128,128,128,128,128])
C.f4=I.d([184,150,247,255,236,224,128,128,128,128,128])
C.c9=I.d([77,110,216,255,236,230,128,128,128,128,128])
C.dB=I.d([C.cS,C.f4,C.c9])
C.cT=I.d([1,101,251,255,241,255,128,128,128,128,128])
C.hR=I.d([170,139,241,252,236,209,255,255,128,128,128])
C.dL=I.d([37,116,196,243,228,255,255,255,128,128,128])
C.cu=I.d([C.cT,C.hR,C.dL])
C.b3=I.d([1,204,254,255,245,255,128,128,128,128,128])
C.ca=I.d([207,160,250,255,238,128,128,128,128,128,128])
C.f5=I.d([102,103,231,255,211,171,128,128,128,128,128])
C.bp=I.d([C.b3,C.ca,C.f5])
C.hv=I.d([1,152,252,255,240,255,128,128,128,128,128])
C.f6=I.d([177,135,243,255,234,225,128,128,128,128,128])
C.cb=I.d([80,129,211,255,194,224,128,128,128,128,128])
C.bG=I.d([C.hv,C.f6,C.cb])
C.a8=I.d([1,1,255,128,128,128,128,128,128,128,128])
C.b8=I.d([246,1,255,128,128,128,128,128,128,128,128])
C.b0=I.d([255,128,128,128,128,128,128,128,128,128,128])
C.dn=I.d([C.a8,C.b8,C.b0])
C.b5=I.d([C.ar,C.i5,C.f3,C.dB,C.cu,C.bp,C.bG,C.dn])
C.b9=I.d([198,35,237,223,193,187,162,160,145,155,62])
C.b6=I.d([131,45,198,221,172,176,220,157,252,221,1])
C.ff=I.d([68,47,146,208,149,167,221,162,255,223,128])
C.bV=I.d([C.b9,C.b6,C.ff])
C.h8=I.d([1,149,241,255,221,224,255,255,128,128,128])
C.e0=I.d([184,141,234,253,222,220,255,199,128,128,128])
C.fr=I.d([81,99,181,242,176,190,249,202,255,255,128])
C.cv=I.d([C.h8,C.e0,C.fr])
C.fX=I.d([1,129,232,253,214,197,242,196,255,255,128])
C.ep=I.d([99,121,210,250,201,198,255,202,128,128,128])
C.fs=I.d([23,91,163,242,170,187,247,210,255,255,128])
C.jz=I.d([C.fX,C.ep,C.fs])
C.hw=I.d([1,200,246,255,234,255,128,128,128,128,128])
C.dN=I.d([109,178,241,255,231,245,255,255,128,128,128])
C.cz=I.d([44,130,201,253,205,192,255,255,128,128,128])
C.d9=I.d([C.hw,C.dN,C.cz])
C.fQ=I.d([1,132,239,251,219,209,255,165,128,128,128])
C.cA=I.d([94,136,225,251,218,190,255,255,128,128,128])
C.e1=I.d([22,100,174,245,186,161,255,199,128,128,128])
C.f1=I.d([C.fQ,C.cA,C.e1])
C.i1=I.d([1,182,249,255,232,235,128,128,128,128,128])
C.f7=I.d([124,143,241,255,227,234,128,128,128,128,128])
C.e2=I.d([35,77,181,251,193,211,255,205,128,128,128])
C.hh=I.d([C.i1,C.f7,C.e2])
C.dA=I.d([1,157,247,255,236,231,255,255,128,128,128])
C.h9=I.d([121,141,235,255,225,227,255,255,128,128,128])
C.e3=I.d([45,99,188,251,195,217,255,224,128,128,128])
C.bN=I.d([C.dA,C.h9,C.e3])
C.i2=I.d([1,1,251,255,213,255,128,128,128,128,128])
C.ej=I.d([203,1,248,255,255,128,128,128,128,128,128])
C.hx=I.d([137,1,177,255,224,255,128,128,128,128,128])
C.dy=I.d([C.i2,C.ej,C.hx])
C.cx=I.d([C.bV,C.cv,C.jz,C.d9,C.f1,C.hh,C.bN,C.dy])
C.h_=I.d([253,9,248,251,207,208,255,192,128,128,128])
C.eR=I.d([175,13,224,243,193,185,249,198,255,255,128])
C.fg=I.d([73,17,171,221,161,179,236,167,255,234,128])
C.aW=I.d([C.h_,C.eR,C.fg])
C.ha=I.d([1,95,247,253,212,183,255,255,128,128,128])
C.hd=I.d([239,90,244,250,211,209,255,255,128,128,128])
C.i8=I.d([155,77,195,248,188,195,255,255,128,128,128])
C.dh=I.d([C.ha,C.hd,C.i8])
C.fR=I.d([1,24,239,251,218,219,255,205,128,128,128])
C.cc=I.d([201,51,219,255,196,186,128,128,128,128,128])
C.e4=I.d([69,46,190,239,201,218,255,228,128,128,128])
C.eW=I.d([C.fR,C.cc,C.e4])
C.bJ=I.d([1,191,251,255,255,128,128,128,128,128,128])
C.i3=I.d([223,165,249,255,213,255,128,128,128,128,128])
C.ek=I.d([141,124,248,255,255,128,128,128,128,128,128])
C.c4=I.d([C.bJ,C.i3,C.ek])
C.el=I.d([1,16,248,255,255,128,128,128,128,128,128])
C.hy=I.d([190,36,230,255,236,255,128,128,128,128,128])
C.ba=I.d([149,1,255,128,128,128,128,128,128,128,128])
C.dG=I.d([C.el,C.hy,C.ba])
C.bb=I.d([1,226,255,128,128,128,128,128,128,128,128])
C.cK=I.d([247,192,255,128,128,128,128,128,128,128,128])
C.bc=I.d([240,128,255,128,128,128,128,128,128,128,128])
C.hU=I.d([C.bb,C.cK,C.bc])
C.em=I.d([1,134,252,255,255,128,128,128,128,128,128])
C.en=I.d([213,62,250,255,255,128,128,128,128,128,128])
C.bd=I.d([55,93,255,128,128,128,128,128,128,128,128])
C.d2=I.d([C.em,C.en,C.bd])
C.d_=I.d([C.aW,C.dh,C.eW,C.c4,C.dG,C.hU,C.d2,C.ar])
C.dP=I.d([202,24,213,235,186,191,220,160,240,175,255])
C.fh=I.d([126,38,182,232,169,184,228,174,255,187,128])
C.fi=I.d([61,46,138,219,151,178,240,170,255,216,128])
C.hV=I.d([C.dP,C.fh,C.fi])
C.ft=I.d([1,112,230,250,199,191,247,159,255,255,128])
C.eq=I.d([166,109,228,252,211,215,255,174,128,128,128])
C.fu=I.d([39,77,162,232,172,180,245,178,255,255,128])
C.dz=I.d([C.ft,C.eq,C.fu])
C.fv=I.d([1,52,220,246,198,199,249,220,255,255,128])
C.fY=I.d([124,74,191,243,183,193,250,221,255,255,128])
C.fw=I.d([24,71,130,219,154,170,243,182,255,255,128])
C.f0=I.d([C.fv,C.fY,C.fw])
C.e5=I.d([1,182,225,249,219,240,255,224,128,128,128])
C.er=I.d([149,150,226,252,216,205,255,171,128,128,128])
C.dJ=I.d([28,108,170,242,183,194,254,223,255,255,128])
C.d3=I.d([C.e5,C.er,C.dJ])
C.es=I.d([1,81,230,252,204,203,255,192,128,128,128])
C.cB=I.d([123,102,209,247,188,196,255,233,128,128,128])
C.e6=I.d([20,95,153,243,164,173,255,203,128,128,128])
C.bY=I.d([C.es,C.cB,C.e6])
C.cd=I.d([1,222,248,255,216,213,128,128,128,128,128])
C.cE=I.d([168,175,246,252,235,205,255,255,128,128,128])
C.cC=I.d([47,116,215,255,211,212,255,255,128,128,128])
C.dm=I.d([C.cd,C.cE,C.cC])
C.cD=I.d([1,121,236,253,212,214,255,255,128,128,128])
C.et=I.d([141,84,213,252,201,202,255,219,128,128,128])
C.eu=I.d([42,80,160,240,162,185,255,205,128,128,128])
C.i4=I.d([C.cD,C.et,C.eu])
C.be=I.d([244,1,255,128,128,128,128,128,128,128,128])
C.bf=I.d([238,1,255,128,128,128,128,128,128,128,128])
C.d6=I.d([C.a8,C.be,C.bf])
C.hq=I.d([C.hV,C.dz,C.f0,C.d3,C.bY,C.dm,C.i4,C.d6])
C.di=I.d([C.b5,C.cx,C.d_,C.hq])
C.aj=I.d([0.0006061,0.0006808792,0.0007651456,0.0008600124,0.0009665928,0.001086,0.001220586,0.001372729,0.001543579,0.001734286,0.001946,0.002177777,0.002435809,0.002731953,0.003078064,0.003486,0.003975227,0.00454088,0.00515832,0.005802907,0.006450001,0.007083216,0.007745488,0.008501152,0.009414544,0.01054999,0.0119658,0.01365587,0.01558805,0.01773015,0.02005001,0.02251136,0.02520288,0.02827972,0.03189704,0.03621,0.04143771,0.04750372,0.05411988,0.06099803,0.06785001,0.07448632,0.08136156,0.08915364,0.09854048,0.1102,0.1246133,0.1417017,0.1613035,0.1832568,0.2074,0.2336921,0.2626114,0.2947746,0.3307985,0.3713,0.4162091,0.4654642,0.5196948,0.5795303,0.6456,0.7184838,0.7967133,0.8778459,0.959439,1.0390501,1.1153673,1.1884971,1.2581233,1.3239296,1.3856,1.4426352,1.4948035,1.5421903,1.5848807,1.62296,1.6564048,1.6852959,1.7098745,1.7303821,1.74706,1.7600446,1.7696233,1.7762637,1.7804334,1.7826,1.7829682,1.7816998,1.7791982,1.7758671,1.77211,1.7682589,1.764039,1.7589438,1.7524663,1.7441,1.7335595,1.7208581,1.7059369,1.6887372,1.6692,1.6475287,1.6234127,1.5960223,1.564528,1.5281,1.4861114,1.4395215,1.3898799,1.3387362,1.28764,1.2374223,1.1878243,1.1387611,1.090148,1.0419,0.9941976,0.9473473,0.9014531,0.8566193,0.8129501,0.7705173,0.7294448,0.6899136,0.6521049,0.6162,0.5823286,0.5504162,0.5203376,0.4919673,0.46518,0.4399246,0.4161836,0.3938822,0.3729459,0.3533,0.3348578,0.3175521,0.3013375,0.2861686,0.272,0.2588171,0.2464838,0.2347718,0.2234533,0.2123,0.2011692,0.1901196,0.1792254,0.1685608,0.1582,0.1481383,0.1383758,0.1289942,0.1200751,0.1117,0.1039048,0.09666748,0.08998272,0.08384531,0.07824999,0.07320899,0.06867816,0.06456784,0.06078835,0.05725001,0.05390435,0.05074664,0.04775276,0.04489859,0.04216,0.03950728,0.03693564,0.03445836,0.03208872,0.02984,0.02771181,0.02569444,0.02378716,0.02198925,0.0203,0.01871805,0.01724036,0.01586364,0.01458461,0.0134,0.01230723,0.01130188,0.01037792,0.009529306,0.008749999,0.0080352,0.0073816,0.0067854,0.0062428,0.005749999,0.0053036,0.0048998,0.0045342,0.0042024,0.0039,0.0036232,0.0033706,0.0031414,0.0029348,0.002749999,0.0025852,0.0024386,0.0023094,0.0021968,0.0021,0.002017733,0.0019482,0.0018898,0.001840933,0.0018,0.001766267,0.0017378,0.0017112,0.001683067,0.001650001,0.001610133,0.0015644,0.0015136,0.001458533,0.0014,0.001336667,0.00127,0.001205,0.001146667,0.0011,0.0010688,0.0010494,0.0010356,0.0010212,0.001,0.00096864,0.00092992,0.00088688,0.00084256,0.0008,0.00076096,0.00072368,0.00068592,0.00064544,0.0006,0.0005478667,0.0004916,0.0004354,0.0003834667,0.00034,0.0003072533,0.00028316,0.00026544,0.0002518133,0.00024,0.0002295467,0.00022064,0.00021196,0.0002021867,0.00019,0.0001742133,0.00015564,0.00013596,0.0001168533,0.0001,0.00008613333,0.0000746,0.000065,0.00005693333,0.00004999999,0.00004416,0.00003948,0.00003572,0.00003264,0.00003,0.00002765333,0.00002556,0.00002364,0.00002181333,0.00002,0.00001813333,0.0000162,0.0000142,0.00001213333,0.00001,0.000007733333,0.0000054,0.0000032,0.000001333333,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
C.dk=I.d([0.1657560486708618,0.11846442802747797,0.12408293329637447,0.11371272058349924,0.07899243451889913,0.03220560359310655,-0.010798365407877875,0.018051975516730392,0.005340719659873053,0.013654918729501336,-0.005956421354564284,-0.0018444365067353252,-0.010571884361529504,-0.002937552107800001,-0.010790476271835936,-0.008022430669750363,-0.002266916770249594,0.007020024049470663,-0.00815284690002993,0.6077286696925279,0.988315608654324,0.9939169104407882,1.0039338994753197,0.9923449986116712,0.9992653085885552,1.008462155761727,0.9835829682744122,1.0085023660099048,0.974511383265687,0.9854326957005994,0.9349576398096204,0.987139077923194])
C.N=I.d([360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528,529,530,531,532,533,534,535,536,537,538,539,540,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,599,600,601,602,603,604,605,606,607,608,609,610,611,612,613,614,615,616,617,618,619,620,621,622,623,624,625,626,627,628,629,630,631,632,633,634,635,636,637,638,639,640,641,642,643,644,645,646,647,648,649,650,651,652,653,654,655,656,657,658,659,660,661,662,663,664,665,666,667,668,669,670,671,672,673,674,675,676,677,678,679,680,681,682,683,684,685,686,687,688,689,690,691,692,693,694,695,696,697,698,699,700,701,702,703,704,705,706,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745,746,747,748,749,750,751,752,753,754,755,756,757,758,759,760,761,762,763,764,765,766,767,768,769,770,771,772,773,774,775,776,777,778,779,780,781,782,783,784,785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,801,802,803,804,805,806,807,808,809,810,811,812,813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830])
C.al=I.d(["INFO","WARNING","ERROR","SEVERE","DEBUG"])
C.am=I.d([-2872,-2849,-2827,-2804,-2782,-2760,-2737,-2715,-2692,-2670,-2647,-2625,-2603,-2580,-2558,-2535,-2513,-2490,-2468,-2446,-2423,-2401,-2378,-2356,-2333,-2311,-2289,-2266,-2244,-2221,-2199,-2176,-2154,-2132,-2109,-2087,-2064,-2042,-2019,-1997,-1975,-1952,-1930,-1907,-1885,-1862,-1840,-1817,-1795,-1773,-1750,-1728,-1705,-1683,-1660,-1638,-1616,-1593,-1571,-1548,-1526,-1503,-1481,-1459,-1436,-1414,-1391,-1369,-1346,-1324,-1302,-1279,-1257,-1234,-1212,-1189,-1167,-1145,-1122,-1100,-1077,-1055,-1032,-1010,-988,-965,-943,-920,-898,-875,-853,-830,-808,-786,-763,-741,-718,-696,-673,-651,-629,-606,-584,-561,-539,-516,-494,-472,-449,-427,-404,-382,-359,-337,-315,-292,-270,-247,-225,-202,-180,-158,-135,-113,-90,-68,-45,-23,0,22,44,67,89,112,134,157,179,201,224,246,269,291,314,336,358,381,403,426,448,471,493,515,538,560,583,605,628,650,672,695,717,740,762,785,807,829,852,874,897,919,942,964,987,1009,1031,1054,1076,1099,1121,1144,1166,1188,1211,1233,1256,1278,1301,1323,1345,1368,1390,1413,1435,1458,1480,1502,1525,1547,1570,1592,1615,1637,1659,1682,1704,1727,1749,1772,1794,1816,1839,1861,1884,1906,1929,1951,1974,1996,2018,2041,2063,2086,2108,2131,2153,2175,2198,2220,2243,2265,2288,2310,2332,2355,2377,2400,2422,2445,2467,2489,2512,2534,2557,2579,2602,2624,2646,2669,2691,2714,2736,2759,2781,2804,2826,2848])
C.O=I.d([6430,6400,6400,6400,3225,3225,3225,3225,944,944,944,944,976,976,976,976,1456,1456,1456,1456,1488,1488,1488,1488,718,718,718,718,718,718,718,718,750,750,750,750,750,750,750,750,1520,1520,1520,1520,1552,1552,1552,1552,428,428,428,428,428,428,428,428,428,428,428,428,428,428,428,428,654,654,654,654,654,654,654,654,1072,1072,1072,1072,1104,1104,1104,1104,1136,1136,1136,1136,1168,1168,1168,1168,1200,1200,1200,1200,1232,1232,1232,1232,622,622,622,622,622,622,622,622,1008,1008,1008,1008,1040,1040,1040,1040,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,1712,1712,1712,1712,1744,1744,1744,1744,846,846,846,846,846,846,846,846,1264,1264,1264,1264,1296,1296,1296,1296,1328,1328,1328,1328,1360,1360,1360,1360,1392,1392,1392,1392,1424,1424,1424,1424,686,686,686,686,686,686,686,686,910,910,910,910,910,910,910,910,1968,1968,1968,1968,2000,2000,2000,2000,2032,2032,2032,2032,16,16,16,16,10257,10257,10257,10257,12305,12305,12305,12305,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,878,878,878,878,878,878,878,878,1904,1904,1904,1904,1936,1936,1936,1936,-18413,-18413,-16365,-16365,-14317,-14317,-10221,-10221,590,590,590,590,590,590,590,590,782,782,782,782,782,782,782,782,1584,1584,1584,1584,1616,1616,1616,1616,1648,1648,1648,1648,1680,1680,1680,1680,814,814,814,814,814,814,814,814,1776,1776,1776,1776,1808,1808,1808,1808,1840,1840,1840,1840,1872,1872,1872,1872,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,14353,14353,14353,14353,16401,16401,16401,16401,22547,22547,24595,24595,20497,20497,20497,20497,18449,18449,18449,18449,26643,26643,28691,28691,30739,30739,-32749,-32749,-30701,-30701,-28653,-28653,-26605,-26605,-24557,-24557,-22509,-22509,-20461,-20461,8207,8207,8207,8207,8207,8207,8207,8207,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,524,524,524,524,524,524,524,524,524,524,524,524,524,524,524,524,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,492,492,492,492,492,492,492,492,492,492,492,492,492,492,492,492,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232])
C.l=I.d([0,-128,64,-64,32,-96,96,-32,16,-112,80,-48,48,-80,112,-16,8,-120,72,-56,40,-88,104,-24,24,-104,88,-40,56,-72,120,-8,4,-124,68,-60,36,-92,100,-28,20,-108,84,-44,52,-76,116,-12,12,-116,76,-52,44,-84,108,-20,28,-100,92,-36,60,-68,124,-4,2,-126,66,-62,34,-94,98,-30,18,-110,82,-46,50,-78,114,-14,10,-118,74,-54,42,-86,106,-22,26,-102,90,-38,58,-70,122,-6,6,-122,70,-58,38,-90,102,-26,22,-106,86,-42,54,-74,118,-10,14,-114,78,-50,46,-82,110,-18,30,-98,94,-34,62,-66,126,-2,1,-127,65,-63,33,-95,97,-31,17,-111,81,-47,49,-79,113,-15,9,-119,73,-55,41,-87,105,-23,25,-103,89,-39,57,-71,121,-7,5,-123,69,-59,37,-91,101,-27,21,-107,85,-43,53,-75,117,-11,13,-115,77,-51,45,-83,109,-19,29,-99,93,-35,61,-67,125,-3,3,-125,67,-61,35,-93,99,-29,19,-109,83,-45,51,-77,115,-13,11,-117,75,-53,43,-85,107,-21,27,-101,91,-37,59,-69,123,-5,7,-121,71,-57,39,-89,103,-25,23,-105,87,-41,55,-73,119,-9,15,-113,79,-49,47,-81,111,-17,31,-97,95,-33,63,-65,127,-1])
C.dI=I.d([0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576])
C.P=I.d([5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5])
C.D=I.d([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13])
C.Q=I.d([12,8,140,8,76,8,204,8,44,8,172,8,108,8,236,8,28,8,156,8,92,8,220,8,60,8,188,8,124,8,252,8,2,8,130,8,66,8,194,8,34,8,162,8,98,8,226,8,18,8,146,8,82,8,210,8,50,8,178,8,114,8,242,8,10,8,138,8,74,8,202,8,42,8,170,8,106,8,234,8,26,8,154,8,90,8,218,8,58,8,186,8,122,8,250,8,6,8,134,8,70,8,198,8,38,8,166,8,102,8,230,8,22,8,150,8,86,8,214,8,54,8,182,8,118,8,246,8,14,8,142,8,78,8,206,8,46,8,174,8,110,8,238,8,30,8,158,8,94,8,222,8,62,8,190,8,126,8,254,8,1,8,129,8,65,8,193,8,33,8,161,8,97,8,225,8,17,8,145,8,81,8,209,8,49,8,177,8,113,8,241,8,9,8,137,8,73,8,201,8,41,8,169,8,105,8,233,8,25,8,153,8,89,8,217,8,57,8,185,8,121,8,249,8,5,8,133,8,69,8,197,8,37,8,165,8,101,8,229,8,21,8,149,8,85,8,213,8,53,8,181,8,117,8,245,8,13,8,141,8,77,8,205,8,45,8,173,8,109,8,237,8,29,8,157,8,93,8,221,8,61,8,189,8,125,8,253,8,19,9,275,9,147,9,403,9,83,9,339,9,211,9,467,9,51,9,307,9,179,9,435,9,115,9,371,9,243,9,499,9,11,9,267,9,139,9,395,9,75,9,331,9,203,9,459,9,43,9,299,9,171,9,427,9,107,9,363,9,235,9,491,9,27,9,283,9,155,9,411,9,91,9,347,9,219,9,475,9,59,9,315,9,187,9,443,9,123,9,379,9,251,9,507,9,7,9,263,9,135,9,391,9,71,9,327,9,199,9,455,9,39,9,295,9,167,9,423,9,103,9,359,9,231,9,487,9,23,9,279,9,151,9,407,9,87,9,343,9,215,9,471,9,55,9,311,9,183,9,439,9,119,9,375,9,247,9,503,9,15,9,271,9,143,9,399,9,79,9,335,9,207,9,463,9,47,9,303,9,175,9,431,9,111,9,367,9,239,9,495,9,31,9,287,9,159,9,415,9,95,9,351,9,223,9,479,9,63,9,319,9,191,9,447,9,127,9,383,9,255,9,511,9,0,7,64,7,32,7,96,7,16,7,80,7,48,7,112,7,8,7,72,7,40,7,104,7,24,7,88,7,56,7,120,7,4,7,68,7,36,7,100,7,20,7,84,7,52,7,116,7,3,8,131,8,67,8,195,8,35,8,163,8,99,8,227,8])
C.R=I.d([-0.0,1,-1,2,-2,3,4,6,-3,5,-4,-5,-6,7,-7,8,-8,-9])
C.dW=I.d([1.0570490759328752,1.05384669128513,1.055049425814067,1.0530407754701832,1.0579930596460185,1.057843949481237,1.0583132387180239,1.0579712943137616,1.0561884233578465,1.057139928542649,1.0425795187752152,0.326030843740561,-0.0019255628442412243,-0.0012959221137046478,-0.0014357356276938696,-0.0012963697250337886,-0.00192270811623739,0.0012621152526221778,-0.0016095249003578276,-0.0013029983817879568,-0.0017666600873954916,-0.001232528114028005,0.010316809673254932,0.03128451264835436,0.08877387988174648,0.1387362174023654,0.15535067531939065,0.1487847717823703,0.16624255403475907,0.16997613960634927,0.15769743995852967,0.19069090525482305])
C.ao=I.d([0,1,4,8,5,2,3,6,9,12,13,10,7,11,14,15])
C.an=I.d([0,4,8,12,128,132,136,140,256,260,264,268,384,388,392,396])
C.Z=I.d([0,8,4,12,2,10,6,14,1,9,5,13,3,11,7,15])
C.ef=I.d([0.0026494153587602255,-0.005017501342973224,-0.012547236272489583,-0.009455496430838867,-0.012526086181600525,-0.007917069776043777,-0.007995573520417569,-0.009355943344446907,0.0654686119829993,0.3957287551763414,0.7524402229988666,0.9637647869021856,0.9985443385516233,0.9999297702528792,0.9993908675114045,0.999943722670714,0.9993912181341867,0.9991123731042448,0.9601958487827158,0.6318627933843244,0.2579740102876347,0.009401488852733564,-0.0030798345608649747,-0.0045230367033685034,-0.006893341038827404,-0.00903521955390154,-0.008591366716534021,-0.00836908691202894,-0.007868583233875431,-0.000008365757871108513,0.005430122544281718,-0.0027745589759259194])
C.ei=I.d([-3630,-3601,-3573,-3544,-3516,-3488,-3459,-3431,-3403,-3374,-3346,-3318,-3289,-3261,-3233,-3204,-3176,-3148,-3119,-3091,-3063,-3034,-3006,-2977,-2949,-2921,-2892,-2864,-2836,-2807,-2779,-2751,-2722,-2694,-2666,-2637,-2609,-2581,-2552,-2524,-2495,-2467,-2439,-2410,-2382,-2354,-2325,-2297,-2269,-2240,-2212,-2184,-2155,-2127,-2099,-2070,-2042,-2013,-1985,-1957,-1928,-1900,-1872,-1843,-1815,-1787,-1758,-1730,-1702,-1673,-1645,-1617,-1588,-1560,-1532,-1503,-1475,-1446,-1418,-1390,-1361,-1333,-1305,-1276,-1248,-1220,-1191,-1163,-1135,-1106,-1078,-1050,-1021,-993,-964,-936,-908,-879,-851,-823,-794,-766,-738,-709,-681,-653,-624,-596,-568,-539,-511,-482,-454,-426,-397,-369,-341,-312,-284,-256,-227,-199,-171,-142,-114,-86,-57,-29,0,28,56,85,113,141,170,198,226,255,283,311,340,368,396,425,453,481,510,538,567,595,623,652,680,708,737,765,793,822,850,878,907,935,963,992,1020,1049,1077,1105,1134,1162,1190,1219,1247,1275,1304,1332,1360,1389,1417,1445,1474,1502,1531,1559,1587,1616,1644,1672,1701,1729,1757,1786,1814,1842,1871,1899,1927,1956,1984,2012,2041,2069,2098,2126,2154,2183,2211,2239,2268,2296,2324,2353,2381,2409,2438,2466,2494,2523,2551,2580,2608,2636,2665,2693,2721,2750,2778,2806,2835,2863,2891,2920,2948,2976,3005,3033,3062,3090,3118,3147,3175,3203,3232,3260,3288,3317,3345,3373,3402,3430,3458,3487,3515,3544,3572,3600])
C.ap=I.d([298.7570554,302.4004341,306.1337728,309.960445,313.8839949,317.9081487,322.036826,326.2741526,330.6244747,335.092373,339.6826795,344.4004944,349.2512056,354.2405086,359.374429,364.6593471,370.1020239,375.7096303,381.4897785,387.4505563,393.6005651,399.9489613,406.5055016,413.2805933,420.2853492,427.5316483,435.0322035,442.8006357,450.8515564,459.2006593,467.8648226,476.8622231,486.2124627,495.936712,506.0578694,516.6007417,527.5922468,539.0616435,551.0407911,563.5644455,576.6705953,590.4008476,604.8008683,619.92089,635.8162974,652.5483053,670.1847459,688.8009889,708.4810171,729.3186941,751.4192606,774.9011125,799.8979226,826.5611867,855.0632966,885.6012714])
C.eG=I.d([0.02516838875551463,0.03942743816942372,0.006205957159642579,0.007112085980742955,0.0002176004464913943,7327183998429021e-27,-0.0216230662171817,0.015670209409407512,0.002801960318863622,0.32494773799897647,1.0164917292316602,1.0329476657890369,1.032158696299155,1.0358667411948619,1.015123547683494,1.0338076690093119,1.0371372378155013,1.0361377027692558,1.022982243255721,0.9691032733565232,-0.005178592389987857,0.001113126197106143,0.006667550303301177,0.0007402431568600196,0.021591567633473925,0.005148162005621723,0.0014561928645728216,0.00016414511045291513,-0.006463076496845329,0.010250854718507939,0.042387394733956134,0.02125271692686162])
C.eH=I.d([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0])
C.aq=I.d([-705,-700,-694,-689,-683,-678,-672,-667,-661,-656,-650,-645,-639,-634,-628,-623,-617,-612,-606,-601,-595,-590,-584,-579,-573,-568,-562,-557,-551,-546,-540,-535,-529,-524,-518,-513,-507,-502,-496,-491,-485,-480,-474,-469,-463,-458,-452,-447,-441,-435,-430,-424,-419,-413,-408,-402,-397,-391,-386,-380,-375,-369,-364,-358,-353,-347,-342,-336,-331,-325,-320,-314,-309,-303,-298,-292,-287,-281,-276,-270,-265,-259,-254,-248,-243,-237,-232,-226,-221,-215,-210,-204,-199,-193,-188,-182,-177,-171,-166,-160,-155,-149,-144,-138,-133,-127,-122,-116,-111,-105,-100,-94,-89,-83,-78,-72,-67,-61,-56,-50,-45,-39,-34,-28,-23,-17,-12,-6,0,5,11,16,22,27,33,38,44,49,55,60,66,71,77,82,88,93,99,104,110,115,121,126,132,137,143,148,154,159,165,170,176,181,187,192,198,203,209,214,220,225,231,236,242,247,253,258,264,269,275,280,286,291,297,302,308,313,319,324,330,335,341,346,352,357,363,368,374,379,385,390,396,401,407,412,418,423,429,434,440,446,451,457,462,468,473,479,484,490,495,501,506,512,517,523,528,534,539,545,550,556,561,567,572,578,583,589,594,600,605,611,616,622,627,633,638,644,649,655,660,666,671,677,682,688,693,699])
C.eU=I.d([0,0,32722,12287,65534,34815,65534,18431])
C.as=I.d([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577])
C.f2=I.d([1.0618958571272863,1.0615019980348779,1.0614335379927147,1.0622711654692485,1.0622036218416742,1.0625059965187085,1.0623938486985884,1.0624706448043137,1.0625048144827762,1.0624366131308856,1.0620694238892607,1.0613167586932164,1.061033402937702,1.0613868564828413,1.0614215366116762,1.0620336151299086,1.062549745480505,1.0624317487992085,1.062524914055448,1.0624277664486914,1.062474985409077,1.0625538581025402,1.0625326910104864,1.0623922312225325,1.062365098035413,1.0625256476715284,1.0612277619533155,1.0594262608698046,1.0599810758292072,1.0602547314449409,1.0601263046243634,1.0606565756823634])
C.at=I.d([0,5,16,5,8,5,24,5,4,5,20,5,12,5,28,5,2,5,18,5,10,5,26,5,6,5,22,5,14,5,30,5,1,5,17,5,9,5,25,5,5,5,21,5,13,5,29,5,3,5,19,5,11,5,27,5,7,5,23,5])
C.f9=I.d([1.0371892935878366,1.0587542891035364,1.0767271213688903,1.0762706844110288,1.0795289105258212,1.0743644742950074,1.0727028691194342,1.0732447452056488,1.0823760816041414,1.0840545681409282,0.9560756752630666,0.5519789685506467,0.08419109488724758,0.000087940070557041,-0.002308640833507125,-0.0011248136628651192,-7729761275498959e-26,-0.00027270769006770834,0.014466473094035592,0.2588311602716948,0.5290799982756673,0.9096662409710516,1.0690571327307956,1.0887326064796272,1.0637622289511852,1.020181291809426,1.0262196688979945,1.078308556061319,0.9833384962321887,1.070724634280262,1.0634247770423768,1.0150875475729566])
C.fa=I.d([-1463,-1452,-1440,-1429,-1417,-1406,-1394,-1383,-1372,-1360,-1349,-1337,-1326,-1315,-1303,-1292,-1280,-1269,-1257,-1246,-1235,-1223,-1212,-1200,-1189,-1177,-1166,-1155,-1143,-1132,-1120,-1109,-1097,-1086,-1075,-1063,-1052,-1040,-1029,-1017,-1006,-995,-983,-972,-960,-949,-937,-926,-915,-903,-892,-880,-869,-857,-846,-835,-823,-812,-800,-789,-777,-766,-755,-743,-732,-720,-709,-697,-686,-675,-663,-652,-640,-629,-618,-606,-595,-583,-572,-560,-549,-538,-526,-515,-503,-492,-480,-469,-458,-446,-435,-423,-412,-400,-389,-378,-366,-355,-343,-332,-320,-309,-298,-286,-275,-263,-252,-240,-229,-218,-206,-195,-183,-172,-160,-149,-138,-126,-115,-103,-92,-80,-69,-58,-46,-35,-23,-12,0,11,22,34,45,57,68,79,91,102,114,125,137,148,159,171,182,194,205,217,228,239,251,262,274,285,297,308,319,331,342,354,365,377,388,399,411,422,434,445,457,468,479,491,502,514,525,537,548,559,571,582,594,605,617,628,639,651,662,674,685,696,708,719,731,742,754,765,776,788,799,811,822,834,845,856,868,879,891,902,914,925,936,948,959,971,982,994,1005,1016,1028,1039,1051,1062,1074,1085,1096,1108,1119,1131,1142,1154,1165,1176,1188,1199,1211,1222,1234,1245,1256,1268,1279,1291,1302,1314,1325,1336,1348,1359,1371,1382,1393,1405,1416,1428,1439,1451])
C.A=I.d([0,128,192,224,240,248,252,254,255])
C.k=I.d([0,1,3,7,15,31,63,127,255])
C.S=I.d([62,62,30,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,588,588,588,588,588,588,588,588,1680,1680,20499,22547,24595,26643,1776,1776,1808,1808,-24557,-22509,-20461,-18413,1904,1904,1936,1936,-16365,-14317,782,782,782,782,814,814,814,814,-12269,-10221,10257,10257,12305,12305,14353,14353,16403,18451,1712,1712,1744,1744,28691,30739,-32749,-30701,-28653,-26605,2061,2061,2061,2061,2061,2061,2061,2061,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,750,750,750,750,1616,1616,1648,1648,1424,1424,1456,1456,1488,1488,1520,1520,1840,1840,1872,1872,1968,1968,8209,8209,524,524,524,524,524,524,524,524,556,556,556,556,556,556,556,556,1552,1552,1584,1584,2000,2000,2032,2032,976,976,1008,1008,1040,1040,1072,1072,1296,1296,1328,1328,718,718,718,718,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,490,490,490,490,490,490,490,490,490,490,490,490,490,490,490,490,4113,4113,6161,6161,848,848,880,880,912,912,944,944,622,622,622,622,654,654,654,654,1104,1104,1136,1136,1168,1168,1200,1200,1232,1232,1264,1264,686,686,686,686,1360,1360,1392,1392,12,12,12,12,12,12,12,12,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390])
C.aw=I.d([0,0,24576,1023,65534,34815,65534,18431])
C.ay=I.d([0,0,32754,11263,65534,34815,65534,18431])
C.a_=I.d([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0])
C.az=I.d([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258])
C.hb=I.d([0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0])
C.jH=I.d([0,0,32722,12287,65535,34815,65534,18431])
C.hc=I.d([0,0,65490,12287,65535,34815,65534,18431])
C.a0=I.d([0.000003917,0.000004393581,0.000004929604,0.000005532136,0.000006208245,0.000006965,0.000007813219,0.000008767336,0.000009839844,0.00001104323,0.00001239,0.00001388641,0.00001555728,0.00001744296,0.00001958375,0.00002202,0.00002483965,0.00002804126,0.00003153104,0.00003521521,0.000039,0.0000428264,0.0000469146,0.0000515896,0.0000571764,0.000064,0.00007234421,0.00008221224,0.00009350816,0.0001061361,0.00012,0.000134984,0.000151492,0.000170208,0.000191816,0.000217,0.0002469067,0.00028124,0.00031852,0.0003572667,0.000396,0.0004337147,0.000473024,0.000517876,0.0005722187,0.00064,0.00072456,0.0008255,0.00094116,0.00106988,0.00121,0.001362091,0.001530752,0.001720368,0.001935323,0.00218,0.0024548,0.002764,0.0031178,0.0035264,0.004,0.00454624,0.00515932,0.00582928,0.00654616,0.0073,0.008086507,0.00890872,0.00976768,0.01066443,0.0116,0.01257317,0.01358272,0.01462968,0.01571509,0.01684,0.01800736,0.01921448,0.02045392,0.02171824,0.023,0.02429461,0.02561024,0.02695857,0.02835125,0.0298,0.03131083,0.03288368,0.03452112,0.03622571,0.038,0.03984667,0.041768,0.043766,0.04584267,0.048,0.05024368,0.05257304,0.05498056,0.05745872,0.06,0.06260197,0.06527752,0.06804208,0.07091109,0.0739,0.077016,0.0802664,0.0836668,0.0872328,0.09098,0.09491755,0.09904584,0.1033674,0.1078846,0.1126,0.117532,0.1226744,0.1279928,0.1334528,0.13902,0.1446764,0.1504693,0.1564619,0.1627177,0.1693,0.1762431,0.1835581,0.1912735,0.199418,0.20802,0.2171199,0.2267345,0.2368571,0.2474812,0.2586,0.2701849,0.2822939,0.2950505,0.308578,0.323,0.3384021,0.3546858,0.3716986,0.3892875,0.4073,0.4256299,0.4443096,0.4633944,0.4829395,0.503,0.5235693,0.544512,0.56569,0.5869653,0.6082,0.6293456,0.6503068,0.6708752,0.6908424,0.71,0.7281852,0.7454636,0.7619694,0.7778368,0.7932,0.8081104,0.8224962,0.8363068,0.8494916,0.862,0.8738108,0.8849624,0.8954936,0.9054432,0.9148501,0.9237348,0.9320924,0.9399226,0.9472252,0.954,0.9602561,0.9660074,0.9712606,0.9760225,0.9803,0.9840924,0.9874812,0.9903128,0.9928116,0.9949501,0.9967108,0.9980983,0.999112,0.9997482,1,0.9998567,0.9993046,0.9983255,0.9968987,0.995,0.9926005,0.9897426,0.9864444,0.9827241,0.9786,0.9740837,0.9691712,0.9638568,0.9581349,0.952,0.9454504,0.9384992,0.9311628,0.9234576,0.9154,0.9070064,0.8982772,0.8892048,0.8797816,0.87,0.8598613,0.849392,0.838622,0.8275813,0.8163,0.8047947,0.793082,0.781192,0.7691547,0.757,0.7447541,0.7324224,0.7200036,0.7074965,0.6949,0.6822192,0.6694716,0.6566744,0.6438448,0.631,0.6181555,0.6053144,0.5924756,0.5796379,0.5668,0.5539611,0.5411372,0.5283528,0.5156323,0.503,0.4904688,0.4780304,0.4656776,0.4534032,0.4412,0.42908,0.417036,0.405032,0.393032,0.381,0.3689184,0.3568272,0.3447768,0.3328176,0.321,0.3093381,0.2978504,0.2865936,0.2756245,0.265,0.2547632,0.2448896,0.2353344,0.2260528,0.217,0.2081616,0.1995488,0.1911552,0.1829744,0.175,0.1672235,0.1596464,0.1522776,0.1451259,0.1382,0.1315003,0.1250248,0.1187792,0.1127691,0.107,0.1014762,0.09618864,0.09112296,0.08626485,0.0816,0.07712064,0.07282552,0.06871008,0.06476976,0.061,0.05739621,0.05395504,0.05067376,0.04754965,0.04458,0.04175872,0.03908496,0.03656384,0.03420048,0.032,0.02996261,0.02807664,0.02632936,0.02470805,0.0232,0.02180077,0.02050112,0.01928108,0.01812069,0.017,0.01590379,0.01483718,0.01381068,0.01283478,0.01192,0.01106831,0.01027339,0.009533311,0.008846157,0.00821,0.007623781,0.007085424,0.006591476,0.006138485,0.005723,0.005343059,0.004995796,0.004676404,0.004380075,0.004102,0.003838453,0.003589099,0.003354219,0.003134093,0.002929,0.002738139,0.002559876,0.002393244,0.002237275,0.002091,0.001953587,0.00182458,0.00170358,0.001590187,0.001484,0.001384496,0.001291268,0.001204092,0.001122744,0.001047,0.0009765896,0.0009111088,0.0008501332,0.0007932384,0.00074,0.0006900827,0.00064331,0.000599496,0.0005584547,0.00052,0.0004839136,0.0004500528,0.0004183452,0.0003887184,0.0003611,0.0003353835,0.0003114404,0.0002891656,0.0002684539,0.0002492,0.0002313019,0.0002146856,0.0001992884,0.0001850475,0.0001719,0.0001597781,0.0001486044,0.0001383016,0.0001287925,0.00012,0.0001118595,0.0001043224,0.0000973356,0.00009084587,0.0000848,0.00007914667,0.000073858,0.000068916,0.00006430267,0.00006,0.00005598187,0.0000522256,0.0000487184,0.00004544747,0.0000424,0.00003956104,0.00003691512,0.00003444868,0.00003214816,0.00003,0.00002799125,0.00002611356,0.00002436024,0.00002272461,0.0000212,0.00001977855,0.00001845285,0.00001721687,0.00001606459,0.00001499,0.00001398728,0.00001305155,0.00001217818,0.00001136254,0.0000106,0.000009885877,0.000009217304,0.000008592362,0.000008009133,0.0000074657,0.000006959567,0.000006487995,0.000006048699,0.000005639396,0.0000052578,0.000004901771,0.00000456972,0.000004260194,0.000003971739,0.0000037029,0.000003452163,0.000003218302,0.0000030003,0.000002797139,0.0000026078,0.00000243122,0.000002266531,0.000002113013,0.000001969943,0.0000018366,0.00000171223,0.000001596228,0.00000148809,0.000001387314,0.0000012934,0.00000120582,0.000001124143,0.000001048009,9770578e-13,91093e-11,8492513e-13,7917212e-13,7380904e-13,6881098e-13,64153e-11,5980895e-13,5575746e-13,519808e-12,4846123e-13,45181e-11])
C.b1=I.d([173,148,140])
C.b2=I.d([176,155,140,135])
C.ib=I.d([180,157,141,134,130])
C.bg=I.d([254,254,243,230,196,177,153,140,133,130,129])
C.aA=I.d([C.b1,C.b2,C.ib,C.bg])
C.hn=I.d([1.1565232050369776,1.156722500011914,1.1566203150243823,1.1555782088080084,1.15621755092157,1.1567674012207332,1.156802319480863,1.156767744548552,1.156356318295283,1.1567054702510189,1.1565134139372772,1.1564336176499312,1.1568023181530034,1.1473147688514642,1.1339317140561065,1.1293876490671435,1.1290515328639648,1.0504864823782283,1.0459696042230884,0.9936668716859569,0.9560166926539394,0.924674820335118,0.9149994470205176,0.8993946765845346,0.8954252075133111,0.8887056669381475,0.8822284381422811,0.8799831137382668,0.8763524461224458,0.8800036833170911,0.8806566542844112,0.883047064602769])
C.aB=I.d([U.u3(),U.ug(),U.uj(),U.ua(),U.ue(),U.um(),U.ud(),U.ul(),U.u8(),U.uc()])
C.ht=I.d([17,18,0,1,2,3,4,5,16,6,7,8,9,10,11,12,13,14,15])
C.hs=I.d([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7])
C.E=I.d([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15])
C.T=I.d(["anim-bluespheres","bump-sphere","bunny","cornell-mlt","cornell-path","miscquads","smoke-2","spotfog","teapot-area-light","teapot-metal"])
C.hI=I.d([0.05471118715729184,0.0556090664983034,0.060755873790918236,0.05623294861596237,0.04616994053570868,0.038012808167818095,0.02442422575667034,0.003898358058159218,-0.0005608225217273444,0.0009649387125519465,0.0003734119805151037,-0.000433673890931352,-0.00009353396225689203,-0.00012354967412842033,-0.0001452454808168746,-0.0002004769191554373,-0.0004993858769469367,0.027255083540032476,0.1606740590629706,0.35069788873150953,0.5735746553841896,0.7639209189071895,0.8914446674038152,0.9639460990957489,0.9887946427601628,0.998974499662272,0.9860514040356416,0.995325028053452,0.9743347837730537,0.9913436461687141,0.9886628777217475,0.9971385608973553])
C.aC=I.d([127,127,191,127,159,191,223,127,143,159,175,191,207,223,239,127,135,143,151,159,167,175,183,191,199,207,215,223,231,239,247,127,131,135,139,143,147,151,155,159,163,167,171,175,179,183,187,191,195,199,203,207,211,215,219,223,227,231,235,239,243,247,251,127,129,131,133,135,137,139,141,143,145,147,149,151,153,155,157,159,161,163,165,167,169,171,173,175,177,179,181,183,185,187,189,191,193,195,197,199,201,203,205,207,209,211,213,215,217,219,221,223,225,227,229,231,233,235,237,239,241,243,245,247,249,251,253,127])
C.aD=I.d([0.0001299,0.000145847,0.0001638021,0.0001840037,0.0002066902,0.0002321,0.000260728,0.000293075,0.000329388,0.000369914,0.0004149,0.0004641587,0.000518986,0.000581854,0.0006552347,0.0007416,0.0008450296,0.0009645268,0.001094949,0.001231154,0.001368,0.00150205,0.001642328,0.001802382,0.001995757,0.002236,0.002535385,0.002892603,0.003300829,0.003753236,0.004243,0.004762389,0.005330048,0.005978712,0.006741117,0.00765,0.008751373,0.01002888,0.0114217,0.01286901,0.01431,0.01570443,0.01714744,0.01878122,0.02074801,0.02319,0.02620736,0.02978248,0.03388092,0.03846824,0.04351,0.0489956,0.0550226,0.0617188,0.069212,0.07763,0.08695811,0.09717672,0.1084063,0.1207672,0.13438,0.1493582,0.1653957,0.1819831,0.198611,0.21477,0.2301868,0.2448797,0.2587773,0.2718079,0.2839,0.2949438,0.3048965,0.3137873,0.3216454,0.3285,0.3343513,0.3392101,0.3431213,0.3461296,0.34828,0.3495999,0.3501474,0.350013,0.349287,0.34806,0.3463733,0.3442624,0.3418088,0.3390941,0.3362,0.3331977,0.3300411,0.3266357,0.3228868,0.3187,0.3140251,0.308884,0.3032904,0.2972579,0.2908,0.2839701,0.2767214,0.2689178,0.2604227,0.2511,0.2408475,0.2298512,0.2184072,0.2068115,0.19536,0.1842136,0.1733273,0.1626881,0.1522833,0.1421,0.1321786,0.1225696,0.1132752,0.1042979,0.09564,0.08729955,0.07930804,0.07171776,0.06458099,0.05795001,0.05186211,0.04628152,0.04115088,0.03641283,0.03201,0.0279172,0.0241444,0.020687,0.0175404,0.0147,0.01216179,0.00991996,0.00796724,0.006296346,0.0049,0.003777173,0.00294532,0.00242488,0.002236293,0.0024,0.00292552,0.00383656,0.00517484,0.00698208,0.0093,0.01214949,0.01553588,0.01947752,0.02399277,0.0291,0.03481485,0.04112016,0.04798504,0.05537861,0.06327,0.07163501,0.08046224,0.08973996,0.09945645,0.1096,0.1201674,0.1311145,0.1423679,0.1538542,0.1655,0.1772571,0.18914,0.2011694,0.2133658,0.2257499,0.2383209,0.2510668,0.2639922,0.2771017,0.2904,0.3038912,0.3175726,0.3314384,0.3454828,0.3597,0.3740839,0.3886396,0.4033784,0.4183115,0.4334499,0.4487953,0.464336,0.480064,0.4959713,0.5120501,0.5282959,0.5446916,0.5612094,0.5778215,0.5945,0.6112209,0.6279758,0.6447602,0.6615697,0.6784,0.6952392,0.7120586,0.7288284,0.7455188,0.7621,0.7785432,0.7948256,0.8109264,0.8268248,0.8425,0.8579325,0.8730816,0.8878944,0.9023181,0.9163,0.9297995,0.9427984,0.9552776,0.9672179,0.9786,0.9893856,0.9995488,1.0090892,1.0180064,1.0263,1.0339827,1.040986,1.047188,1.0524667,1.0567,1.0597944,1.0617992,1.0628068,1.0629096,1.0622,1.0607352,1.0584436,1.0552244,1.0509768,1.0456,1.0390369,1.0313608,1.0226662,1.0130477,1.0026,0.9913675,0.9793314,0.9664916,0.9528479,0.9384,0.923194,0.907244,0.890502,0.87292,0.8544499,0.835084,0.814946,0.794186,0.772954,0.7514,0.7295836,0.7075888,0.6856022,0.6638104,0.6424,0.6215149,0.6011138,0.5811052,0.5613977,0.5419,0.5225995,0.5035464,0.4847436,0.4661939,0.4479,0.4298613,0.412098,0.394644,0.3775333,0.3608,0.3444563,0.3285168,0.3130192,0.2980011,0.2835,0.2695448,0.2561184,0.2431896,0.2307272,0.2187,0.2070971,0.1959232,0.1851708,0.1748323,0.1649,0.1553667,0.14623,0.13749,0.1291467,0.1212,0.1136397,0.106465,0.09969044,0.09333061,0.0874,0.08190096,0.07680428,0.07207712,0.06768664,0.0636,0.05980685,0.05628216,0.05297104,0.04981861,0.04677,0.04378405,0.04087536,0.03807264,0.03540461,0.0329,0.03056419,0.02838056,0.02634484,0.02445275,0.0227,0.02108429,0.01959988,0.01823732,0.01698717,0.01584,0.01479064,0.01383132,0.01294868,0.0121292,0.01135916,0.01062935,0.009938846,0.009288422,0.008678854,0.008110916,0.007582388,0.007088746,0.006627313,0.006195408,0.005790346,0.005409826,0.005052583,0.004717512,0.004403507,0.004109457,0.003833913,0.003575748,0.003334342,0.003109075,0.002899327,0.002704348,0.00252302,0.002354168,0.002196616,0.00204919,0.00191096,0.001781438,0.00166011,0.001546459,0.001439971,0.001340042,0.001246275,0.001158471,0.00107643,0.0009999493,0.0009287358,0.0008624332,0.0008007503,0.000743396,0.0006900786,0.0006405156,0.0005945021,0.0005518646,0.000512429,0.0004760213,0.0004424536,0.0004115117,0.0003829814,0.0003566491,0.0003323011,0.0003097586,0.0002888871,0.0002695394,0.0002515682,0.0002348261,0.000219171,0.0002045258,0.0001908405,0.0001780654,0.0001661505,0.0001550236,0.0001446219,0.0001349098,0.000125852,0.000117413,0.0001095515,0.0001022245,0.00009539445,0.0000890239,0.00008307527,0.00007751269,0.00007231304,0.00006745778,0.00006292844,0.00005870652,0.00005477028,0.00005109918,0.00004767654,0.00004448567,0.00004150994,0.00003873324,0.00003614203,0.00003372352,0.00003146487,0.00002935326,0.00002737573,0.00002552433,0.00002379376,0.0000221787,0.00002067383,0.00001927226,0.0000179664,0.00001674991,0.00001561648,0.00001455977,0.00001357387,0.00001265436,0.00001179723,0.00001099844,0.00001025398,0.000009559646,0.000008912044,0.000008308358,0.000007745769,0.000007221456,0.000006732475,0.000006276423,0.000005851304,0.000005455118,0.000005085868,0.000004741466,0.000004420236,0.000004120783,0.000003841716,0.000003581652,0.000003339127,0.000003112949,0.000002902121,0.000002705645,0.000002522525,0.000002351726,0.000002192415,0.000002043902,0.000001905497,0.000001776509,0.000001656215,0.000001544022,0.00000143944,0.000001341977,0.000001251141])
C.hW=I.d([49,65,89,38,83,89])
C.hX=I.d([23,114,69,56,80,144])
C.hZ=I.d([1.662125,1.687,1.703313,1.72,1.744563,1.77,1.791625,1.81,1.822125,1.834,1.85175,1.872,1.89425,1.916,1.931688,1.95,1.972438,2.015,2.121562,2.21,2.177188,2.13,2.160063,2.21,2.249938,2.289,2.326,2.362,2.397625,2.433,2.469187,2.504,2.535875,2.564,2.589625,2.605,2.595562,2.583,2.5765,2.599,2.678062,2.809,3.01075,3.24,3.458187,3.67,3.863125,4.05,4.239563,4.43,4.619563,4.817,5.034125,5.26,5.485625,5.717])
C.ia=I.d([280,256,256,256,40])
C.aE=I.d([0,1,1,2,4,8,1,1,2,4,8,4,8,0])
C.bi=I.d(["Apple","Chicken1","Chicken2","Cream","Ketchup","Marble","Potato","Skimmilk","Skin1","Skin2","Spectralon","Wholemilk","Lowfat Milk","Reduced Milk","Regular Milk","Espresso","Mint Mocha Coffee","Lowfat Soy Milk","Regular Soy Milk","Lowfat Chocolate Milk","Regular Chocolate Milk","Coke","Pepsi","Sprite","Gatorade","Chardonnay","White Zinfandel","Merlot","Budweiser Beer","Coors Light Beer","Clorox","Apple Juice","Cranberry Juice","Grape Juice","Ruby Grapefruit Juice","White Grapefruit Juice","Shampoo","Strawberry Shampoo","Head & Shoulders Shampoo","Lemon Tea","Orange Juice Powder","Pink Lemonade","Cappuccino Powder","Salt Powder","Sugar Powder","Suisse Mocha","Pacific Ocean Surface Water"])
C.fC=I.d([2.29,2.39,1.97])
C.hY=I.d([0.003,0.0034,0.046])
C.eN=I.d([C.fC,C.hY])
C.cf=I.d([0.15,0.21,0.38])
C.cY=I.d([0.015,0.077,0.19])
C.hl=I.d([C.cf,C.cY])
C.fZ=I.d([0.19,0.25,0.32])
C.dX=I.d([0.018,0.088,0.2])
C.dp=I.d([C.fZ,C.dX])
C.bA=I.d([7.38,5.47,3.15])
C.bu=I.d([0.0002,0.0028,0.0163])
C.i9=I.d([C.bA,C.bu])
C.d1=I.d([0.18,0.07,0.03])
C.dO=I.d([0.061,0.97,1.45])
C.fV=I.d([C.d1,C.dO])
C.d8=I.d([2.19,2.62,3])
C.aX=I.d([0.0021,0.0041,0.0071])
C.hS=I.d([C.d8,C.aX])
C.bQ=I.d([0.68,0.7,0.55])
C.bB=I.d([0.0024,0.009,0.12])
C.bh=I.d([C.bQ,C.bB])
C.cj=I.d([0.7,1.22,1.9])
C.dQ=I.d([0.0014,0.0025,0.0142])
C.cn=I.d([C.cj,C.dQ])
C.eb=I.d([0.74,0.88,1.01])
C.fb=I.d([0.032,0.17,0.48])
C.fO=I.d([C.eb,C.fb])
C.dq=I.d([1.09,1.59,1.79])
C.eM=I.d([0.013,0.07,0.145])
C.fU=I.d([C.dq,C.eM])
C.aY=I.d([11.6,20.4,14.9])
C.aZ=I.d([0,0,0])
C.e7=I.d([C.aY,C.aZ])
C.eT=I.d([2.55,3.21,3.77])
C.bs=I.d([0.0011,0.0024,0.014])
C.i6=I.d([C.eT,C.bs])
C.fp=I.d([0.9126,1.0748,1.25])
C.eS=I.d([0.0002,0.0004,0.0008])
C.ea=I.d([C.fp,C.eS])
C.fj=I.d([1.075,1.2213,1.3941])
C.h0=I.d([0.0002,0.0004,0.001])
C.d0=I.d([C.fj,C.h0])
C.bj=I.d([1.1874,1.3296,1.4602])
C.dK=I.d([0.0001,0.0003,0.0013])
C.ed=I.d([C.bj,C.dK])
C.hg=I.d([0.4376,0.5115,0.6048])
C.fq=I.d([0.1669,0.2287,0.3078])
C.by=I.d([C.hg,C.fq])
C.hT=I.d([0.19,0.26,0.35])
C.dg=I.d([0.0984,0.1519,0.204])
C.hC=I.d([C.hT,C.dg])
C.fB=I.d([0.1419,0.1625,0.274])
C.dt=I.d([0.0001,0.0005,0.0025])
C.cl=I.d([C.fB,C.dt])
C.dC=I.d([0.2434,0.2719,0.4597])
C.c5=I.d([0.0001,0.0005,0.0034])
C.c3=I.d([C.dC,C.c5])
C.eg=I.d([0.4282,0.5014,0.5791])
C.c8=I.d([0.0005,0.0016,0.0068])
C.fI=I.d([C.eg,C.c8])
C.eV=I.d([0.7359,0.9172,1.0688])
C.hJ=I.d([0.0007,0.003,0.01])
C.jB=I.d([C.eV,C.hJ])
C.hf=I.d([0.7143,1.1688,1.7169])
C.i0=I.d([0.6966,1.148,1.7169])
C.bo=I.d([C.hf,C.i0])
C.bx=I.d([0.6433,0.999,1.442])
C.c6=I.d([0.6375,0.9849,1.442])
C.bW=I.d([C.bx,C.c6])
C.bq=I.d([0.1299,0.1283,0.1395])
C.c1=I.d([0.123,0.1194,0.1306])
C.fP=I.d([C.bq,C.c1])
C.eQ=I.d([0.4009,0.4185,0.4324])
C.bz=I.d([0.1617,0.1258,0.0579])
C.hE=I.d([C.eQ,C.bz])
C.bv=I.d([0.1577,0.1748,0.3512])
C.dY=I.d([0.1547,0.1701,0.3443])
C.dF=I.d([C.bv,C.dY])
C.fN=I.d([0.1763,0.237,0.2913])
C.dj=I.d([0.1732,0.2322,0.2847])
C.cM=I.d([C.fN,C.dj])
C.bL=I.d([0.7639,1.6429,1.9196])
C.fW=I.d([0.7586,1.6429,1.9196])
C.cI=I.d([C.bL,C.fW])
C.bR=I.d([0.1486,0.321,0.736])
C.c7=I.d([0.1449,0.3141,0.7286])
C.f_=I.d([C.bR,C.c7])
C.bD=I.d([0.0295,0.0663,0.1521])
C.ee=I.d([0.0268,0.0608,0.1521])
C.jA=I.d([C.bD,C.ee])
C.f8=I.d([0.16,0.25,0.33])
C.bK=I.d([0.0175,0.0777,0.1372])
C.d4=I.d([C.f8,C.bK])
C.hH=I.d([0.1215,0.2101,0.4407])
C.e9=I.d([0.1014,0.1858,0.4084])
C.e8=I.d([C.hH,C.e9])
C.fy=I.d([0.27,0.63,0.83])
C.eL=I.d([0.2572,0.6145,0.8104])
C.dU=I.d([C.fy,C.eL])
C.cF=I.d([0.55,1.25,1.53])
C.br=I.d([0.5428,1.25,1.53])
C.bI=I.d([C.cF,C.br])
C.eK=I.d([0.2513,0.3517,0.4305])
C.bE=I.d([0.0896,0.1911,0.2636])
C.hm=I.d([C.eK,C.bE])
C.cL=I.d([0.3609,0.38,0.5632])
C.dD=I.d([0.0096,0.0131,0.0395])
C.ck=I.d([C.cL,C.dD])
C.bt=I.d([0.0288,0.071,0.0952])
C.dE=I.d([0.0184,0.0596,0.0805])
C.cG=I.d([C.bt,C.dE])
C.fe=I.d([0.0217,0.0788,0.1022])
C.fc=I.d([0.0189,0.0756,0.0989])
C.c_=I.d([C.fe,C.fc])
C.cZ=I.d([0.3674,0.4527,0.5211])
C.bm=I.d([0.0883,0.1637,0.2125])
C.cm=I.d([C.cZ,C.bm])
C.bF=I.d([0.34,0.58,0.88])
C.he=I.d([0.2602,0.4902,0.7727])
C.d7=I.d([C.bF,C.he])
C.fT=I.d([0.3377,0.5573,1.0122])
C.dV=I.d([0.1449,0.3441,0.7863])
C.ci=I.d([C.fT,C.dV])
C.dH=I.d([0.24,0.37,0.45])
C.dM=I.d([0.1165,0.2366,0.3195])
C.fH=I.d([C.dH,C.dM])
C.co=I.d([0.2574,0.3536,0.484])
C.h6=I.d([0.192,0.2654,0.3272])
C.dl=I.d([C.co,C.h6])
C.fd=I.d([0.76,0.8685,0.9363])
C.ec=I.d([0.5115,0.5863,0.6147])
C.dT=I.d([C.fd,C.ec])
C.bP=I.d([0.0795,0.1759,0.278])
C.hu=I.d([0.065,0.1597,0.2578])
C.eI=I.d([C.bP,C.hu])
C.cN=I.d([0.5098,0.6476,0.7944])
C.i_=I.d([0.1875,0.2893,0.3796])
C.bU=I.d([C.cN,C.i_])
C.fA=I.d([3.3645,3.3158,3.2428])
C.ct=I.d([3.1845,3.1324,3.0147])
C.ce=I.d([C.fA,C.ct])
C.v=new H.m4(47,{Apple:C.eN,Chicken1:C.hl,Chicken2:C.dp,Cream:C.i9,Ketchup:C.fV,Marble:C.hS,Potato:C.bh,Skimmilk:C.cn,Skin1:C.fO,Skin2:C.fU,Spectralon:C.e7,Wholemilk:C.i6,"Lowfat Milk":C.ea,"Reduced Milk":C.d0,"Regular Milk":C.ed,Espresso:C.by,"Mint Mocha Coffee":C.hC,"Lowfat Soy Milk":C.cl,"Regular Soy Milk":C.c3,"Lowfat Chocolate Milk":C.fI,"Regular Chocolate Milk":C.jB,Coke:C.bo,Pepsi:C.bW,Sprite:C.fP,Gatorade:C.hE,Chardonnay:C.dF,"White Zinfandel":C.cM,Merlot:C.cI,"Budweiser Beer":C.f_,"Coors Light Beer":C.jA,Clorox:C.d4,"Apple Juice":C.e8,"Cranberry Juice":C.dU,"Grape Juice":C.bI,"Ruby Grapefruit Juice":C.hm,"White Grapefruit Juice":C.ck,Shampoo:C.cG,"Strawberry Shampoo":C.c_,"Head & Shoulders Shampoo":C.cm,"Lemon Tea":C.d7,"Orange Juice Powder":C.ci,"Pink Lemonade":C.fH,"Cappuccino Powder":C.dl,"Salt Powder":C.dT,"Sugar Powder":C.eI,"Suisse Mocha":C.bU,"Pacific Ocean Surface Water":C.ce},C.bi)
C.aG=new H.mP([315,"artist",258,"bitsPerSample",265,"cellLength",264,"cellWidth",320,"colorMap",259,"compression",306,"dateTime",34665,"exifIFD",338,"extraSamples",266,"fillOrder",289,"freeByteCounts",288,"freeOffsets",291,"grayResponseCurve",290,"grayResponseUnit",316,"hostComputer",34675,"iccProfile",270,"imageDescription",257,"imageLength",256,"imageWidth",33723,"iptc",271,"make",281,"maxSampleValue",280,"minSampleValue",272,"model",254,"newSubfileType",274,"orientation",262,"photometricInterpretation",34377,"photoshop",284,"planarConfiguration",317,"predictor",296,"resolutionUnit",278,"rowsPerStrip",277,"samplesPerPixel",305,"software",279,"stripByteCounts",273,"stropOffsets",255,"subfileType",292,"t4Options",293,"t6Options",263,"thresholding",322,"tileWidth",323,"tileLength",324,"tileOffsets",325,"tileByteCounts",700,"xmp",282,"xResolution",283,"yResolution",529,"yCbCrCoefficients",530,"yCbCrSubsampling",531,"yCbCrPositioning"])
C.jI=new P.qH(!1)
$.j5=null
$.e6=1
$.jy="$cachedFunction"
$.jz="$cachedInvocation"
$.e2=null
$.dg=null
$.bf=0
$.cs=null
$.iv=null
$.ie=null
$.l1=null
$.lh=null
$.eI=null
$.eL=null
$.ih=null
$.lO=4294967295
$.d3=null
$.A=G.tN()
$.fM=null
$.bF=1
$.e7=null
$.ai=null
$.al=1
$.ea=0
$.cf=null
$.cQ=null
$.cR=null
$.i8=!1
$.H=C.i
$.iK=0
$.jY=null
$.bH=null
$.iE=null
$.iF=null
$.fC=null
$.kt=!1
$.fl=null
$.dM=null
$.iX=null
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
I.$lazy(y,x,w)}})(["fy","$get$fy",function(){return H.nC()},"fz","$get$fz",function(){return new P.mp(null)},"k4","$get$k4",function(){return H.bi(H.eh({toString:function(){return"$receiver$"}}))},"k5","$get$k5",function(){return H.bi(H.eh({$method$:null,toString:function(){return"$receiver$"}}))},"k6","$get$k6",function(){return H.bi(H.eh(null))},"k7","$get$k7",function(){return H.bi(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"kb","$get$kb",function(){return H.bi(H.eh(void 0))},"kc","$get$kc",function(){return H.bi(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"k9","$get$k9",function(){return H.bi(H.ka(null))},"k8","$get$k8",function(){return H.bi(function(){try{null.$method$}catch(z){return z.message}}())},"ke","$get$ke",function(){return H.bi(H.ka(void 0))},"kd","$get$kd",function(){return H.bi(function(){try{(void 0).$method$}catch(z){return z.message}}())},"kP","$get$kP",function(){return new T.i3(C.Q,C.a_,257,286,15)},"kO","$get$kO",function(){return new T.i3(C.at,C.D,0,30,15)},"kN","$get$kN",function(){return new T.i3(null,C.hs,0,19,7)},"eF","$get$eF",function(){return 1/P.uV(2)},"df","$get$df",function(){return P.Z()},"dY","$get$dY",function(){return P.Z()},"jv","$get$jv",function(){return P.Z()},"cD","$get$cD",function(){return P.Z()},"aV","$get$aV",function(){return P.Z()},"h7","$get$h7",function(){return P.Z()},"c7","$get$c7",function(){return P.Z()},"h6","$get$h6",function(){return P.Z()},"aT","$get$aT",function(){return P.Z()},"c8","$get$c8",function(){return P.Z()},"dZ","$get$dZ",function(){return P.Z()},"b2","$get$b2",function(){return P.Z()},"aS","$get$aS",function(){return P.Z()},"aU","$get$aU",function(){return P.Z()},"e_","$get$e_",function(){return P.Z()},"a9","$get$a9",function(){return G.t0()},"hq","$get$hq",function(){return G.p5(0)},"hw","$get$hw",function(){return[]},"ht","$get$ht",function(){return G.eb("Kd-Tree","Interior Nodes Created")},"dk","$get$dk",function(){return G.eb("Kd-Tree","Leaf Nodes Created")},"hv","$get$hv",function(){return G.eb("Kd-Tree","Maximum Primitives in Leaf")},"hu","$get$hu",function(){return G.eb("Kd-Tree","Maximum Depth of Leaf Nodes")},"hV","$get$hV",function(){return P.r4()},"iU","$get$iU",function(){return P.mN(null,null)},"cS","$get$cS",function(){return[]},"dp","$get$dp",function(){return H.dW(H.i(511))},"eo","$get$eo",function(){return H.dW(H.i(511))},"dq","$get$dq",function(){return H.jn(H.i(2041))},"cJ","$get$cJ",function(){return H.jn(H.i(225))},"aL","$get$aL",function(){return H.dW(H.i(766))},"hN","$get$hN",function(){return[U.ig(),U.un(),U.us(),U.ut(),U.uu(),U.uv(),U.uw(),U.ux(),U.uy(),U.uz(),U.uo(),U.up(),U.uq(),U.ur(),U.ig(),U.ig()]},"cO","$get$cO",function(){return H.dW(H.i(1))},"dw","$get$dw",function(){var z=$.$get$cO().buffer
z.toString
H.ce(z,0,null)
return new Int8Array(z,0)},"du","$get$du",function(){return H.or(H.i(1))},"eE","$get$eE",function(){var z=$.$get$du().buffer
z.toString
H.ce(z,0,null)
return new Int16Array(z,0)},"b6","$get$b6",function(){return H.ot(H.i(1))},"cN","$get$cN",function(){var z=$.$get$b6().buffer
z.toString
H.ce(z,0,null)
return new Int32Array(z,0)},"dv","$get$dv",function(){return P.mK($.$get$b6().buffer,0,null)},"i7","$get$i7",function(){return H.oq(H.i(1))},"kU","$get$kU",function(){return P.kg($.$get$i7().buffer,0,null)},"i6","$get$i6",function(){return H.op(H.i(1))},"kT","$get$kT",function(){return P.kg($.$get$i6().buffer,0,null)},"c5","$get$c5",function(){return P.Z()},"bD","$get$bD",function(){return P.Z()},"jm","$get$jm",function(){return G.F(0).ds(C.ap,C.bO)},"jl","$get$jl",function(){return G.F(0).ds(C.ap,C.hZ)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1,args:[,]},{func:1},{func:1,void:true,args:[U.a3]},{func:1,void:true},{func:1,ret:P.o,args:[P.hH,P.o,P.o]},{func:1,args:[,,]},{func:1,ret:P.o,args:[P.o,P.o]},{func:1,void:true,args:[U.dc,P.w]},{func:1,args:[G.bJ]},{func:1,args:[P.am]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,void:true,args:[P.o,P.o,P.o,P.o,P.o,P.bj]},{func:1,ret:G.eu,args:[G.v,G.Q]},{func:1,ret:P.ab,args:[E.bP]},{func:1,ret:P.ab,args:[P.am]},{func:1,ret:P.au,args:[G.t,G.ac,G.ac,P.au]},{func:1,void:true,args:[,],opt:[P.bM]},{func:1,args:[,],opt:[,]},{func:1,ret:P.am,args:[P.o]},{func:1,void:true,args:[P.o]},{func:1,ret:P.au,args:[P.au,P.au]},{func:1,ret:G.d1,args:[G.v,G.Q]},{func:1,ret:G.dH,args:[G.v,G.Q]},{func:1,ret:G.az,args:[G.v,G.Q]},{func:1,ret:G.dJ,args:[G.v,G.Q]},{func:1,ret:G.dL,args:[G.v,G.Q]},{func:1,ret:G.fu,args:[G.v,G.Q]},{func:1,ret:G.fN,args:[G.v,G.Q]},{func:1,ret:G.dT,args:[G.v,G.Q]},{func:1,ret:G.e8,args:[G.v,G.Q]},{func:1,ret:G.hF,args:[G.v,G.Q]},{func:1,ret:G.et,args:[G.v,G.Q]},{func:1,ret:E.fk,args:[[P.w,G.br],G.q]},{func:1,args:[,P.am]},{func:1,ret:P.o,args:[P.o]},{func:1,args:[P.o,P.am]},{func:1,args:[U.d8]},{func:1,args:[G.c6]},{func:1,ret:P.cl},{func:1,ret:E.f_,args:[[P.w,G.br],G.q]},{func:1,ret:E.eV,args:[[P.w,G.br],G.q]},{func:1,ret:P.ab,args:[,,]},{func:1,ret:E.fF,args:[[P.w,G.br],G.q]},{func:1,ret:K.fa,args:[G.q,G.cq,G.bX]},{func:1,ret:K.h_,args:[G.q,G.cq,G.bX]},{func:1,ret:K.h3,args:[G.q,G.cq,G.bX]},{func:1,void:true,args:[P.o,P.am]},{func:1,ret:P.ab},{func:1,args:[,P.bM]},{func:1,ret:R.ft,args:[G.q,G.bY],opt:[{func:1,args:[U.d8]}]},{func:1,ret:S.eZ,args:[G.q]},{func:1,ret:S.fg,args:[G.q]},{func:1,ret:S.fG,args:[G.q]},{func:1,ret:S.fT,args:[G.q]},{func:1,ret:S.hD,args:[G.q]},{func:1,void:true,args:[,P.bM]},{func:1,args:[P.k0,,]},{func:1,args:[,,,]},{func:1,ret:O.f2,args:[G.v,G.q,G.aW]},{func:1,ret:O.f7,args:[G.v,G.q]},{func:1,ret:O.fj,args:[G.v,G.q]},{func:1,ret:O.fv,args:[G.v,G.q]},{func:1,ret:O.h8,args:[G.v,G.q]},{func:1,ret:O.hb,args:[G.v,G.q]},{func:1,ret:O.hs,args:[G.v,G.q]},{func:1,ret:D.fh,args:[G.v,G.Q]},{func:1,ret:D.fE,args:[G.v,G.Q]},{func:1,ret:D.fP,args:[G.v,G.Q]},{func:1,ret:D.fQ,args:[G.v,G.Q]},{func:1,ret:D.fR,args:[G.v,G.Q]},{func:1,ret:D.fS,args:[G.v,G.Q]},{func:1,ret:D.h5,args:[G.v,G.Q]},{func:1,ret:D.hn,args:[G.v,G.Q]},{func:1,ret:D.hy,args:[G.v,G.Q]},{func:1,ret:D.hz,args:[G.v,G.Q]},{func:1,ret:D.hC,args:[G.v,G.Q]},{func:1,ret:D.hG,args:[G.v,G.Q]},{func:1,ret:F.fH,args:[G.q]},{func:1,ret:F.hi,args:[G.q]},{func:1,ret:F.dl,args:[G.q]},{func:1,ret:U.eS,args:[G.q,P.o,P.o,P.o,P.o,G.aM,G.aK]},{func:1,ret:B.hR,args:[G.v,G.q]},{func:1,ret:U.fm,args:[G.q,P.o,P.o,P.o,P.o,G.aM,G.aK]},{func:1,ret:U.fL,args:[G.q,P.o,P.o,P.o,P.o,G.aM,G.aK]},{func:1,ret:U.hj,args:[G.q,P.o,P.o,P.o,P.o,G.aM,G.aK]},{func:1,ret:U.hx,args:[G.q,P.o,P.o,P.o,P.o,G.aM,G.aK]},{func:1,ret:M.f0,args:[G.v,G.v,P.ab,G.q]},{func:1,ret:M.f1,args:[G.v,G.v,P.ab,G.q]},{func:1,ret:M.f6,args:[G.v,G.v,P.ab,G.q]},{func:1,ret:M.fn,args:[G.v,G.v,P.ab,G.q]},{func:1,ret:M.fq,args:[G.v,G.v,P.ab,G.q]},{func:1,ret:M.fJ,args:[G.v,G.v,P.ab,G.q]},{func:1,ret:M.fY,args:[G.v,G.v,P.ab,G.q]},{func:1,ret:M.h1,args:[G.v,G.v,P.ab,G.q]},{func:1,ret:M.hr,args:[G.v,G.v,P.ab,G.q]},{func:1,ret:M.hE,args:[G.v,G.v,P.ab,G.q],opt:[[P.cz,P.am,G.az]]},{func:1,ret:U.eT,args:[G.q]},{func:1,ret:U.f3,args:[G.q]},{func:1,ret:U.f4,args:[G.q]},{func:1,ret:U.f5,args:[G.q]},{func:1,ret:U.fi,args:[G.q]},{func:1,ret:U.fr,args:[G.q]},{func:1,ret:U.fx,args:[G.q]},{func:1,ret:U.h2,args:[G.q]},{func:1,ret:U.h4,args:[G.q]},{func:1,ret:U.hI,args:[G.q]},{func:1,ret:U.hT,args:[G.q]},{func:1,ret:P.o,args:[,,]},{func:1,void:true,args:[P.am]},{func:1,void:true,args:[P.am],opt:[,]},{func:1,ret:P.au},{func:1,ret:P.o,args:[,]},{func:1,args:[P.o]},{func:1,args:[P.o,,]},{func:1,ret:P.ab,args:[E.bP,E.bP]},{func:1,void:true,args:[U.dc,,]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[P.j],opt:[P.bM]},{func:1,ret:S.f9,args:[G.q]},{func:1,ret:S.ho,args:[G.q]},{func:1,ret:B.fc,args:[G.v,G.q]},{func:1,ret:B.fo,args:[G.v,G.q]},{func:1,ret:U.eW,args:[G.q,P.o,P.o,P.o,P.o,G.aM,G.aK]}]
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
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.w8(d||a)
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
Isolate.d=a.d
Isolate.dy=a.dy
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.lj(K.lm(),b)},[])
else (function(b){H.lj(K.lm(),b)})([])})})()