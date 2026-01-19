// ===== Wait for DOM =====
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing GIF Converter...');

    // ===== Initialize Language =====
    const savedLang = window.i18n.getCurrentLanguage();
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = savedLang;
        langSelect.addEventListener('change', function (e) {
            window.i18n.setLanguage(e.target.value);
        });
    }
    // Apply initial translations
    window.i18n.applyTranslations(savedLang);
    document.documentElement.lang = savedLang;

    // ===== DOM Elements =====
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    const previewContainer = document.getElementById('previewContainer');
    const videoPreview = document.getElementById('videoPreview');
    const removeVideoBtn = document.getElementById('removeVideo');
    const videoDuration = document.getElementById('videoDuration');
    const videoResolution = document.getElementById('videoResolution');
    const videoSize = document.getElementById('videoSize');

    const settingsSection = document.querySelector('[data-settings-section]');
    const outputWidth = document.getElementById('outputWidth');
    const frameRate = document.getElementById('frameRate');
    const colorCount = document.getElementById('colorCount');
    const maxDuration = document.getElementById('maxDuration');
    const squareCrop = document.getElementById('squareCrop');
    const convertBtn = document.getElementById('convertBtn');

    const resultSection = document.getElementById('resultSection');
    const gifPreview = document.getElementById('gifPreview');
    const gifSize = document.getElementById('gifSize');
    const gifDimensions = document.getElementById('gifDimensions');
    const downloadBtn = document.getElementById('downloadBtn');
    const newConvertBtn = document.getElementById('newConvertBtn');

    // Chroma Key Elements
    const chromaKeyEnabled = document.getElementById('chromaKeyEnabled');
    const chromaKeySettings = document.getElementById('chromaKeySettings');
    const chromaKeyColor = document.getElementById('chromaKeyColor');
    const colorPreview = document.getElementById('colorPreview');
    const eyedropperBtn = document.getElementById('eyedropperBtn');
    const chromaKeyTolerance = document.getElementById('chromaKeyTolerance');
    const toleranceValue = document.getElementById('toleranceValue');

    // Check if elements exist
    if (!uploadArea || !fileInput) {
        console.error('Required elements not found!');
        return;
    }

    console.log('All elements found, setting up event listeners...');

    // ===== State =====
    let currentFile = null;
    let gifBlob = null;
    let isEyedropperActive = false;

    // ===== Create inline worker blob URL =====
    // This embeds the worker code directly to avoid CORS issues
    const workerCode = `// gif.worker.js 0.2.0 - https://github.com/jnordberg/gif.js
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){var NeuQuant=require("./TypedNeuQuant.js");var LZWEncoder=require("./LZWEncoder.js");function ByteArray(){this.page=-1;this.pages=[];this.newPage()}ByteArray.pageSize=4096;ByteArray.charMap={};for(var i=0;i<256;i++)ByteArray.charMap[i]=String.fromCharCode(i);ByteArray.prototype.newPage=function(){this.pages[++this.page]=new Uint8Array(ByteArray.pageSize);this.cursor=0};ByteArray.prototype.getData=function(){var rv="";for(var p=0;p<this.pages.length;p++){for(var i=0;i<ByteArray.pageSize;i++){rv+=ByteArray.charMap[this.pages[p][i]]}}return rv};ByteArray.prototype.writeByte=function(val){if(this.cursor>=ByteArray.pageSize)this.newPage();this.pages[this.page][this.cursor++]=val};ByteArray.prototype.writeUTFBytes=function(string){for(var l=string.length,i=0;i<l;i++)this.writeByte(string.charCodeAt(i))};ByteArray.prototype.writeBytes=function(array,offset,length){for(var l=length||array.length,i=offset||0;i<l;i++)this.writeByte(array[i])};function GIFEncoder(width,height){this.width=~~width;this.height=~~height;this.transparent=null;this.transIndex=0;this.repeat=-1;this.delay=0;this.image=null;this.pixels=null;this.indexedPixels=null;this.colorDepth=null;this.colorTab=null;this.neuQuant=null;this.usedEntry=new Array;this.palSize=7;this.dispose=-1;this.firstFrame=true;this.sample=10;this.dither=false;this.globalPalette=false;this.out=new ByteArray}GIFEncoder.prototype.setDelay=function(milliseconds){this.delay=Math.round(milliseconds/10)};GIFEncoder.prototype.setFrameRate=function(fps){this.delay=Math.round(100/fps)};GIFEncoder.prototype.setDispose=function(disposalCode){if(disposalCode>=0)this.dispose=disposalCode};GIFEncoder.prototype.setRepeat=function(repeat){this.repeat=repeat};GIFEncoder.prototype.setTransparent=function(color){this.transparent=color};GIFEncoder.prototype.addFrame=function(imageData){this.image=imageData;this.colorTab=this.globalPalette&&this.globalPalette.slice?this.globalPalette:null;this.getImagePixels();this.analyzePixels();if(this.globalPalette===true)this.globalPalette=this.colorTab;if(this.firstFrame){this.writeLSD();this.writePalette();if(this.repeat>=0){this.writeNetscapeExt()}}this.writeGraphicCtrlExt();this.writeImageDesc();if(!this.firstFrame&&!this.globalPalette)this.writePalette();this.writePixels();this.firstFrame=false};GIFEncoder.prototype.finish=function(){this.out.writeByte(59)};GIFEncoder.prototype.setQuality=function(quality){if(quality<1)quality=1;this.sample=quality};GIFEncoder.prototype.setDither=function(dither){if(dither===true)dither="FloydSteinberg";this.dither=dither};GIFEncoder.prototype.setGlobalPalette=function(palette){this.globalPalette=palette};GIFEncoder.prototype.getGlobalPalette=function(){return this.globalPalette&&this.globalPalette.slice&&this.globalPalette.slice(0)||this.globalPalette};GIFEncoder.prototype.writeHeader=function(){this.out.writeUTFBytes("GIF89a")};GIFEncoder.prototype.analyzePixels=function(){if(!this.colorTab){this.neuQuant=new NeuQuant(this.pixels,this.sample);this.neuQuant.buildColormap();this.colorTab=this.neuQuant.getColormap()}if(this.dither){this.ditherPixels(this.dither.replace("-serpentine",""),this.dither.match(/-serpentine/)!==null)}else{this.indexPixels()}this.pixels=null;this.colorDepth=8;this.palSize=7;if(this.transparent!==null){this.transIndex=this.findClosest(this.transparent,true)}};GIFEncoder.prototype.indexPixels=function(imgq){var nPix=this.pixels.length/3;this.indexedPixels=new Uint8Array(nPix);var k=0;for(var j=0;j<nPix;j++){var index=this.findClosestRGB(this.pixels[k++]&255,this.pixels[k++]&255,this.pixels[k++]&255);this.usedEntry[index]=true;this.indexedPixels[j]=index}};GIFEncoder.prototype.ditherPixels=function(kernel,serpentine){var kernels={FalseFloydSteinberg:[[3/8,1,0],[3/8,0,1],[2/8,1,1]],FloydSteinberg:[[7/16,1,0],[3/16,-1,1],[5/16,0,1],[1/16,1,1]],Stucki:[[8/42,1,0],[4/42,2,0],[2/42,-2,1],[4/42,-1,1],[8/42,0,1],[4/42,1,1],[2/42,2,1],[1/42,-2,2],[2/42,-1,2],[4/42,0,2],[2/42,1,2],[1/42,2,2]],Atkinson:[[1/8,1,0],[1/8,2,0],[1/8,-1,1],[1/8,0,1],[1/8,1,1],[1/8,0,2]]};if(!kernel||!kernels[kernel]){throw"Unknown dithering kernel: "+kernel}var ds=kernels[kernel];var index=0,height=this.height,width=this.width,data=this.pixels;var direction=serpentine?-1:1;this.indexedPixels=new Uint8Array(this.pixels.length/3);for(var y=0;y<height;y++){if(serpentine)direction=direction*-1;for(var x=direction==1?0:width-1,xend=direction==1?width:0;x!==xend;x+=direction){index=y*width+x;var idx=index*3;var r1=data[idx];var g1=data[idx+1];var b1=data[idx+2];idx=this.findClosestRGB(r1,g1,b1);this.usedEntry[idx]=true;this.indexedPixels[index]=idx;idx*=3;var r2=this.colorTab[idx];var g2=this.colorTab[idx+1];var b2=this.colorTab[idx+2];var er=r1-r2;var eg=g1-g2;var eb=b1-b2;for(var i=direction==1?0:ds.length-1,end=direction==1?ds.length:0;i!==end;i+=direction){var x1=ds[i][1];var y1=ds[i][2];if(x1+x>=0&&x1+x<width&&y1+y>=0&&y1+y<height){var d=ds[i][0];idx=index+x1+y1*width;idx*=3;data[idx]=Math.max(0,Math.min(255,data[idx]+er*d));data[idx+1]=Math.max(0,Math.min(255,data[idx+1]+eg*d));data[idx+2]=Math.max(0,Math.min(255,data[idx+2]+eb*d))}}}}};GIFEncoder.prototype.findClosest=function(c,used){return this.findClosestRGB((c&16711680)>>16,(c&65280)>>8,c&255,used)};GIFEncoder.prototype.findClosestRGB=function(r,g,b,used){if(this.colorTab===null)return-1;if(this.neuQuant&&!used){return this.neuQuant.lookupRGB(r,g,b)}var c=b|g<<8|r<<16;var minpos=0;var dmin=256*256*256;var len=this.colorTab.length;for(var i=0,index=0;i<len;index++){var dr=r-(this.colorTab[i++]&255);var dg=g-(this.colorTab[i++]&255);var db=b-(this.colorTab[i++]&255);var d=dr*dr+dg*dg+db*db;if((!used||this.usedEntry[index])&&d<dmin){dmin=d;minpos=index}}return minpos};GIFEncoder.prototype.getImagePixels=function(){var w=this.width;var h=this.height;this.pixels=new Uint8Array(w*h*3);var data=this.image;var srcPos=0;var count=0;for(var i=0;i<h;i++){for(var j=0;j<w;j++){this.pixels[count++]=data[srcPos++];this.pixels[count++]=data[srcPos++];this.pixels[count++]=data[srcPos++];srcPos++}}};GIFEncoder.prototype.writeGraphicCtrlExt=function(){this.out.writeByte(33);this.out.writeByte(249);this.out.writeByte(4);var transp,disp;if(this.transparent===null){transp=0;disp=0}else{transp=1;disp=2}if(this.dispose>=0){disp=dispose&7}disp<<=2;this.out.writeByte(0|disp|0|transp);this.writeShort(this.delay);this.out.writeByte(this.transIndex);this.out.writeByte(0)};GIFEncoder.prototype.writeImageDesc=function(){this.out.writeByte(44);this.writeShort(0);this.writeShort(0);this.writeShort(this.width);this.writeShort(this.height);if(this.firstFrame||this.globalPalette){this.out.writeByte(0)}else{this.out.writeByte(128|0|0|0|this.palSize)}};GIFEncoder.prototype.writeLSD=function(){this.writeShort(this.width);this.writeShort(this.height);this.out.writeByte(128|112|0|this.palSize);this.out.writeByte(0);this.out.writeByte(0)};GIFEncoder.prototype.writeNetscapeExt=function(){this.out.writeByte(33);this.out.writeByte(255);this.out.writeByte(11);this.out.writeUTFBytes("NETSCAPE2.0");this.out.writeByte(3);this.out.writeByte(1);this.writeShort(this.repeat);this.out.writeByte(0)};GIFEncoder.prototype.writePalette=function(){this.out.writeBytes(this.colorTab);var n=3*256-this.colorTab.length;for(var i=0;i<n;i++)this.out.writeByte(0)};GIFEncoder.prototype.writeShort=function(pValue){this.out.writeByte(pValue&255);this.out.writeByte(pValue>>8&255)};GIFEncoder.prototype.writePixels=function(){var enc=new LZWEncoder(this.width,this.height,this.indexedPixels,this.colorDepth);enc.encode(this.out)};GIFEncoder.prototype.stream=function(){return this.out};module.exports=GIFEncoder},{"./LZWEncoder.js":2,"./TypedNeuQuant.js":3}],2:[function(require,module,exports){var EOF=-1;var BITS=12;var HSIZE=5003;var masks=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function LZWEncoder(width,height,pixels,colorDepth){var initCodeSize=Math.max(2,colorDepth);var accum=new Uint8Array(256);var htab=new Int32Array(HSIZE);var codetab=new Int32Array(HSIZE);var cur_accum,cur_bits=0;var a_count;var free_ent=0;var maxcode;var clear_flg=false;var g_init_bits,ClearCode,EOFCode;function char_out(c,outs){accum[a_count++]=c;if(a_count>=254)flush_char(outs)}function cl_block(outs){cl_hash(HSIZE);free_ent=ClearCode+2;clear_flg=true;output(ClearCode,outs)}function cl_hash(hsize){for(var i=0;i<hsize;++i)htab[i]=-1}function compress(init_bits,outs){var fcode,c,i,ent,disp,hsize_reg,hshift;g_init_bits=init_bits;clear_flg=false;n_bits=g_init_bits;maxcode=MAXCODE(n_bits);ClearCode=1<<init_bits-1;EOFCode=ClearCode+1;free_ent=ClearCode+2;a_count=0;ent=nextPixel();hshift=0;for(fcode=HSIZE;fcode<65536;fcode*=2)++hshift;hshift=8-hshift;hsize_reg=HSIZE;cl_hash(hsize_reg);output(ClearCode,outs);outer_loop:while((c=nextPixel())!=EOF){fcode=(c<<BITS)+ent;i=c<<hshift^ent;if(htab[i]===fcode){ent=codetab[i];continue}else if(htab[i]>=0){disp=hsize_reg-i;if(i===0)disp=1;do{if((i-=disp)<0)i+=hsize_reg;if(htab[i]===fcode){ent=codetab[i];continue outer_loop}}while(htab[i]>=0)}output(ent,outs);ent=c;if(free_ent<1<<BITS){codetab[i]=free_ent++;htab[i]=fcode}else{cl_block(outs)}}output(ent,outs);output(EOFCode,outs)}function encode(outs){outs.writeByte(initCodeSize);remaining=width*height;curPixel=0;compress(initCodeSize+1,outs);outs.writeByte(0)}function flush_char(outs){if(a_count>0){outs.writeByte(a_count);outs.writeBytes(accum,0,a_count);a_count=0}}function MAXCODE(n_bits){return(1<<n_bits)-1}function nextPixel(){if(remaining===0)return EOF;--remaining;var pix=pixels[curPixel++];return pix&255}function output(code,outs){cur_accum&=masks[cur_bits];if(cur_bits>0)cur_accum|=code<<cur_bits;else cur_accum=code;cur_bits+=n_bits;while(cur_bits>=8){char_out(cur_accum&255,outs);cur_accum>>=8;cur_bits-=8}if(free_ent>maxcode||clear_flg){if(clear_flg){maxcode=MAXCODE(n_bits=g_init_bits);clear_flg=false}else{++n_bits;if(n_bits==BITS)maxcode=1<<BITS;else maxcode=MAXCODE(n_bits)}}if(code==EOFCode){while(cur_bits>0){char_out(cur_accum&255,outs);cur_accum>>=8;cur_bits-=8}flush_char(outs)}}this.encode=encode}module.exports=LZWEncoder},{}],3:[function(require,module,exports){var ncycles=100;var netsize=256;var maxnetpos=netsize-1;var netbiasshift=4;var intbiasshift=16;var intbias=1<<intbiasshift;var gammashift=10;var gamma=1<<gammashift;var betashift=10;var beta=intbias>>betashift;var betagamma=intbias<<gammashift-betashift;var initrad=netsize>>3;var radiusbiasshift=6;var radiusbias=1<<radiusbiasshift;var initradius=initrad*radiusbias;var radiusdec=30;var alphabiasshift=10;var initalpha=1<<alphabiasshift;var alphadec;var radbiasshift=8;var radbias=1<<radbiasshift;var alpharadbshift=alphabiasshift+radbiasshift;var alpharadbias=1<<alpharadbshift;var prime1=499;var prime2=491;var prime3=487;var prime4=503;var minpicturebytes=3*prime4;function NeuQuant(pixels,samplefac){var network;var netindex;var bias;var freq;var radpower;function init(){network=[];netindex=new Int32Array(256);bias=new Int32Array(netsize);freq=new Int32Array(netsize);radpower=new Int32Array(netsize>>3);var i,v;for(i=0;i<netsize;i++){v=(i<<netbiasshift+8)/netsize;network[i]=new Float64Array([v,v,v,0]);freq[i]=intbias/netsize;bias[i]=0}}function unbiasnet(){for(var i=0;i<netsize;i++){network[i][0]>>=netbiasshift;network[i][1]>>=netbiasshift;network[i][2]>>=netbiasshift;network[i][3]=i}}function altersingle(alpha,i,b,g,r){network[i][0]-=alpha*(network[i][0]-b)/initalpha;network[i][1]-=alpha*(network[i][1]-g)/initalpha;network[i][2]-=alpha*(network[i][2]-r)/initalpha}function alterneigh(radius,i,b,g,r){var lo=Math.abs(i-radius);var hi=Math.min(i+radius,netsize);var j=i+1;var k=i-1;var m=1;var p,a;while(j<hi||k>lo){a=radpower[m++];if(j<hi){p=network[j++];p[0]-=a*(p[0]-b)/alpharadbias;p[1]-=a*(p[1]-g)/alpharadbias;p[2]-=a*(p[2]-r)/alpharadbias}if(k>lo){p=network[k--];p[0]-=a*(p[0]-b)/alpharadbias;p[1]-=a*(p[1]-g)/alpharadbias;p[2]-=a*(p[2]-r)/alpharadbias}}}function contest(b,g,r){var bestd=~(1<<31);var bestbiasd=bestd;var bestpos=-1;var bestbiaspos=bestpos;var i,n,dist,biasdist,betafreq;for(i=0;i<netsize;i++){n=network[i];dist=Math.abs(n[0]-b)+Math.abs(n[1]-g)+Math.abs(n[2]-r);if(dist<bestd){bestd=dist;bestpos=i}biasdist=dist-(bias[i]>>intbiasshift-netbiasshift);if(biasdist<bestbiasd){bestbiasd=biasdist;bestbiaspos=i}betafreq=freq[i]>>betashift;freq[i]-=betafreq;bias[i]+=betafreq<<gammashift}freq[bestpos]+=beta;bias[bestpos]-=betagamma;return bestbiaspos}function inxbuild(){var i,j,p,q,smallpos,smallval,previouscol=0,startpos=0;for(i=0;i<netsize;i++){p=network[i];smallpos=i;smallval=p[1];for(j=i+1;j<netsize;j++){q=network[j];if(q[1]<smallval){smallpos=j;smallval=q[1]}}q=network[smallpos];if(i!=smallpos){j=q[0];q[0]=p[0];p[0]=j;j=q[1];q[1]=p[1];p[1]=j;j=q[2];q[2]=p[2];p[2]=j;j=q[3];q[3]=p[3];p[3]=j}if(smallval!=previouscol){netindex[previouscol]=startpos+i>>1;for(j=previouscol+1;j<smallval;j++)netindex[j]=i;previouscol=smallval;startpos=i}}netindex[previouscol]=startpos+maxnetpos>>1;for(j=previouscol+1;j<256;j++)netindex[j]=maxnetpos}function inxsearch(b,g,r){var a,p,dist;var bestd=1e3;var best=-1;var i=netindex[g];var j=i-1;while(i<netsize||j>=0){if(i<netsize){p=network[i];dist=p[1]-g;if(dist>=bestd)i=netsize;else{i++;if(dist<0)dist=-dist;a=p[0]-b;if(a<0)a=-a;dist+=a;if(dist<bestd){a=p[2]-r;if(a<0)a=-a;dist+=a;if(dist<bestd){bestd=dist;best=p[3]}}}}if(j>=0){p=network[j];dist=g-p[1];if(dist>=bestd)j=-1;else{j--;if(dist<0)dist=-dist;a=p[0]-b;if(a<0)a=-a;dist+=a;if(dist<bestd){a=p[2]-r;if(a<0)a=-a;dist+=a;if(dist<bestd){bestd=dist;best=p[3]}}}}}return best}function learn(){var i;var lengthcount=pixels.length;var alphadec=30+(samplefac-1)/3;var samplepixels=lengthcount/(3*samplefac);var delta=~~(samplepixels/ncycles);var alpha=initalpha;var radius=initradius;var rad=radius>>radiusbiasshift;if(rad<=1)rad=0;for(i=0;i<rad;i++)radpower[i]=alpha*((rad*rad-i*i)*radbias/(rad*rad));var step;if(lengthcount<minpicturebytes){samplefac=1;step=3}else if(lengthcount%prime1!==0){step=3*prime1}else if(lengthcount%prime2!==0){step=3*prime2}else if(lengthcount%prime3!==0){step=3*prime3}else{step=3*prime4}var b,g,r,j;var pix=0;i=0;while(i<samplepixels){b=(pixels[pix]&255)<<netbiasshift;g=(pixels[pix+1]&255)<<netbiasshift;r=(pixels[pix+2]&255)<<netbiasshift;j=contest(b,g,r);altersingle(alpha,j,b,g,r);if(rad!==0)alterneigh(rad,j,b,g,r);pix+=step;if(pix>=lengthcount)pix-=lengthcount;i++;if(delta===0)delta=1;if(i%delta===0){alpha-=alpha/alphadec;radius-=radius/radiusdec;rad=radius>>radiusbiasshift;if(rad<=1)rad=0;for(j=0;j<rad;j++)radpower[j]=alpha*((rad*rad-j*j)*radbias/(rad*rad))}}}function buildColormap(){init();learn();unbiasnet();inxbuild()}this.buildColormap=buildColormap;function getColormap(){var map=[];var index=[];for(var i=0;i<netsize;i++)index[network[i][3]]=i;var k=0;for(var l=0;l<netsize;l++){var j=index[l];map[k++]=network[j][0];map[k++]=network[j][1];map[k++]=network[j][2]}return map}this.getColormap=getColormap;this.lookupRGB=inxsearch}module.exports=NeuQuant},{}],4:[function(require,module,exports){var GIFEncoder,renderFrame;GIFEncoder=require("./GIFEncoder.js");renderFrame=function(frame){var encoder,page,stream,transfer;encoder=new GIFEncoder(frame.width,frame.height);if(frame.index===0){encoder.writeHeader()}else{encoder.firstFrame=false}encoder.setTransparent(frame.transparent);encoder.setRepeat(frame.repeat);encoder.setDelay(frame.delay);encoder.setQuality(frame.quality);encoder.setDither(frame.dither);encoder.setGlobalPalette(frame.globalPalette);encoder.addFrame(frame.data);if(frame.last){encoder.finish()}if(frame.globalPalette===true){frame.globalPalette=encoder.getGlobalPalette()}stream=encoder.stream();frame.data=stream.pages;frame.cursor=stream.cursor;frame.pageSize=stream.constructor.pageSize;if(frame.canTransfer){transfer=function(){var i,len,ref,results;ref=frame.data;results=[];for(i=0,len=ref.length;i<len;i++){page=ref[i];results.push(page.buffer)}return results}();return self.postMessage(frame,transfer)}else{return self.postMessage(frame)}};self.onmessage=function(event){return renderFrame(event.data)}},{"./GIFEncoder.js":1}]},{},[4]);`;

    const workerBlob = new Blob([workerCode], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(workerBlob);
    console.log('Worker blob URL created:', workerUrl);

    // ===== Chroma Key Setup =====
    if (chromaKeyEnabled) {
        chromaKeyEnabled.addEventListener('change', function () {
            if (chromaKeySettings) {
                chromaKeySettings.classList.toggle('hidden', !this.checked);
            }
            // Auto-show preview when chroma key is enabled
            if (this.checked && videoPreview && videoPreview.src && videoPreview.readyState >= 2) {
                setTimeout(() => showChromaPreview(), 100);
            } else {
                // Hide preview when disabled
                const chromaPreviewContainer = document.getElementById('chromaPreviewContainer');
                if (chromaPreviewContainer) {
                    chromaPreviewContainer.classList.add('hidden');
                }
            }
        });
    }

    if (chromaKeyColor && colorPreview) {
        chromaKeyColor.addEventListener('input', function () {
            colorPreview.style.backgroundColor = this.value;
        });
    }

    if (chromaKeyTolerance && toleranceValue) {
        chromaKeyTolerance.addEventListener('input', function () {
            toleranceValue.textContent = this.value;
        });
    }

    // Eyedropper functionality
    if (eyedropperBtn) {
        eyedropperBtn.addEventListener('click', function () {
            if (!videoPreview || !videoPreview.src) {
                alert(window.i18n.t('errorVideoLoad'));
                return;
            }

            isEyedropperActive = !isEyedropperActive;
            eyedropperBtn.classList.toggle('active', isEyedropperActive);
            videoPreview.style.cursor = isEyedropperActive ? 'crosshair' : 'default';

            if (isEyedropperActive) {
                videoPreview.addEventListener('click', pickColorFromVideo);
            } else {
                videoPreview.removeEventListener('click', pickColorFromVideo);
            }
        });
    }

    function pickColorFromVideo(e) {
        if (!isEyedropperActive) return;

        const rect = videoPreview.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Scale to video coordinates
        const scaleX = videoPreview.videoWidth / rect.width;
        const scaleY = videoPreview.videoHeight / rect.height;
        const videoX = Math.floor(x * scaleX);
        const videoY = Math.floor(y * scaleY);

        // Create temporary canvas to get pixel color
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = videoPreview.videoWidth;
        tempCanvas.height = videoPreview.videoHeight;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(videoPreview, 0, 0);

        const pixel = tempCtx.getImageData(videoX, videoY, 1, 1).data;
        const hexColor = '#' +
            pixel[0].toString(16).padStart(2, '0') +
            pixel[1].toString(16).padStart(2, '0') +
            pixel[2].toString(16).padStart(2, '0');

        if (chromaKeyColor) chromaKeyColor.value = hexColor;
        if (colorPreview) colorPreview.style.backgroundColor = hexColor;

        // Deactivate eyedropper
        isEyedropperActive = false;
        eyedropperBtn.classList.remove('active');
        videoPreview.style.cursor = 'default';
        videoPreview.removeEventListener('click', pickColorFromVideo);
    }

    // ===== Chroma Key Preview =====
    const chromaPreviewContainer = document.getElementById('chromaPreviewContainer');
    const chromaPreviewCanvas = document.getElementById('chromaPreviewCanvas');
    const playPausePreviewBtn = document.getElementById('playPausePreviewBtn');
    const pickFromPreviewBtn = document.getElementById('pickFromPreviewBtn');
    const previewCanvasWrapper = document.getElementById('previewCanvasWrapper');

    let isPreviewPlaying = false;
    let previewAnimationId = null;
    let isPickingFromPreview = false;

    // Update preview when color or tolerance changes
    if (chromaKeyColor) {
        chromaKeyColor.addEventListener('change', updateChromaPreviewIfVisible);
    }
    if (chromaKeyTolerance) {
        chromaKeyTolerance.addEventListener('input', updateChromaPreviewIfVisible);
    }

    function updateChromaPreviewIfVisible() {
        if (chromaPreviewContainer && !chromaPreviewContainer.classList.contains('hidden')) {
            if (!isPreviewPlaying) {
                showChromaPreview();
            }
        }
    }

    // Play/Pause Preview
    if (playPausePreviewBtn) {
        playPausePreviewBtn.addEventListener('click', function () {
            if (isPreviewPlaying) {
                stopPreviewAnimation();
            } else {
                startPreviewAnimation();
            }
        });
    }

    function startPreviewAnimation() {
        if (!videoPreview || !chromaPreviewCanvas) return;

        isPreviewPlaying = true;
        updatePlayPauseIcon();

        // Start video playback
        videoPreview.play();

        function animate() {
            if (!isPreviewPlaying) return;
            showChromaPreview();
            previewAnimationId = requestAnimationFrame(animate);
        }
        animate();
    }

    function stopPreviewAnimation() {
        isPreviewPlaying = false;
        updatePlayPauseIcon();

        // Pause video
        videoPreview.pause();

        if (previewAnimationId) {
            cancelAnimationFrame(previewAnimationId);
            previewAnimationId = null;
        }
    }

    function updatePlayPauseIcon() {
        const playIcon = document.getElementById('playIcon');
        const pauseIcon = document.getElementById('pauseIcon');
        if (playIcon && pauseIcon) {
            playIcon.classList.toggle('hidden', isPreviewPlaying);
            pauseIcon.classList.toggle('hidden', !isPreviewPlaying);
        }
    }

    // Pick color from preview
    if (pickFromPreviewBtn) {
        pickFromPreviewBtn.addEventListener('click', function () {
            isPickingFromPreview = !isPickingFromPreview;
            pickFromPreviewBtn.classList.toggle('active', isPickingFromPreview);
            if (previewCanvasWrapper) {
                previewCanvasWrapper.style.cursor = isPickingFromPreview ? 'crosshair' : 'default';
            }
        });
    }

    // Click on preview canvas to pick color
    if (chromaPreviewCanvas) {
        chromaPreviewCanvas.addEventListener('click', function (e) {
            if (!isPickingFromPreview) return;

            const rect = chromaPreviewCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Scale to canvas coordinates
            const scaleX = chromaPreviewCanvas.width / rect.width;
            const scaleY = chromaPreviewCanvas.height / rect.height;
            const canvasX = Math.floor(x * scaleX);
            const canvasY = Math.floor(y * scaleY);

            // Get pixel color from original video frame (not the chroma-keyed preview)
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = chromaPreviewCanvas.width;
            tempCanvas.height = chromaPreviewCanvas.height;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(videoPreview, 0, 0, tempCanvas.width, tempCanvas.height);

            const pixel = tempCtx.getImageData(canvasX, canvasY, 1, 1).data;
            const hexColor = '#' +
                pixel[0].toString(16).padStart(2, '0') +
                pixel[1].toString(16).padStart(2, '0') +
                pixel[2].toString(16).padStart(2, '0');

            if (chromaKeyColor) chromaKeyColor.value = hexColor;
            if (colorPreview) colorPreview.style.backgroundColor = hexColor;

            // Deactivate pick mode
            isPickingFromPreview = false;
            pickFromPreviewBtn.classList.remove('active');
            if (previewCanvasWrapper) {
                previewCanvasWrapper.style.cursor = 'default';
            }

            // Update preview with new color
            showChromaPreview();
        });
    }

    function showChromaPreview() {
        if (!chromaPreviewCanvas || !chromaPreviewContainer || !videoPreview) return;

        const width = Math.min(480, videoPreview.videoWidth);
        const aspectRatio = videoPreview.videoHeight / videoPreview.videoWidth;
        const height = Math.round(width * aspectRatio);

        chromaPreviewCanvas.width = width;
        chromaPreviewCanvas.height = height;
        const ctx = chromaPreviewCanvas.getContext('2d');

        // Draw checkered background pattern (to show transparency)
        drawCheckerPattern(ctx, width, height);

        // Draw video frame
        ctx.drawImage(videoPreview, 0, 0, width, height);

        // Get image data and apply chroma key
        const imageData = ctx.getImageData(0, 0, width, height);
        const chromaColor = chromaKeyColor ? chromaKeyColor.value : '#00ff00';
        const tolerance = chromaKeyTolerance ? parseInt(chromaKeyTolerance.value) : 30;

        applyChromaKeyPreview(imageData, chromaColor, tolerance);

        // Put the processed image back
        ctx.putImageData(imageData, 0, 0);

        // Show the preview container
        chromaPreviewContainer.classList.remove('hidden');
    }

    function drawCheckerPattern(ctx, width, height) {
        const size = 10;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#cccccc';

        for (let y = 0; y < height; y += size) {
            for (let x = 0; x < width; x += size) {
                if ((Math.floor(x / size) + Math.floor(y / size)) % 2 === 0) {
                    ctx.fillRect(x, y, size, size);
                }
            }
        }
    }

    function applyChromaKeyPreview(imageData, chromaColor, tolerance) {
        const data = imageData.data;
        const keyColor = hexToRgb(chromaColor);
        const maxDistance = (tolerance / 100) * 441.67;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const distance = colorDistance(r, g, b, keyColor.r, keyColor.g, keyColor.b);

            if (distance <= maxDistance) {
                // Make pixel transparent (show checkered pattern underneath)
                data[i + 3] = 0;
            }
        }
    }

    // ===== File Upload =====
    uploadArea.addEventListener('click', function (e) {
        console.log('Upload area clicked');
        if (!uploadArea.classList.contains('processing')) {
            fileInput.click();
        }
    });

    uploadArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', function (e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('drag-over');

        console.log('File dropped');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            console.log('File type:', files[0].type);
            if (files[0].type.startsWith('video/')) {
                handleFile(files[0]);
            } else {
                alert(window.i18n.t('errorDropVideo'));
            }
        }
    });

    fileInput.addEventListener('change', function (e) {
        console.log('File input changed');
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    function handleFile(file) {
        console.log('Handling file:', file.name, file.type, file.size);
        currentFile = file;

        // Show video preview
        const url = URL.createObjectURL(file);
        videoPreview.src = url;

        videoPreview.onloadedmetadata = function () {
            console.log('Video metadata loaded');
            // Display video info
            const duration = formatDuration(videoPreview.duration);
            const resolution = `${videoPreview.videoWidth}x${videoPreview.videoHeight}`;
            const size = formatFileSize(file.size);

            videoDuration.textContent = duration;
            videoResolution.textContent = resolution;
            videoSize.textContent = size;

            // Show preview and settings
            previewContainer.classList.remove('hidden');
            settingsSection.classList.remove('hidden');
            convertBtn.disabled = false;

            // Update estimated size
            updateEstimatedSize();

            // Scroll to preview
            previewContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };

        videoPreview.onerror = function (e) {
            console.error('Video load error:', e);
            alert(window.i18n.t('errorVideoLoad'));
        };
    }

    // ===== Remove Video =====
    removeVideoBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        resetUpload();
    });

    function resetUpload() {
        currentFile = null;
        videoPreview.src = '';
        fileInput.value = '';

        previewContainer.classList.add('hidden');
        settingsSection.classList.add('hidden');
        resultSection.classList.add('hidden');
        convertBtn.disabled = true;

        uploadArea.classList.remove('processing');
        progressFill.style.width = '0%';
        progressText.textContent = window.i18n.t('processing');
    }

    // ===== Helper function for chroma key =====
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function colorDistance(r1, g1, b1, r2, g2, b2) {
        return Math.sqrt(
            Math.pow(r1 - r2, 2) +
            Math.pow(g1 - g2, 2) +
            Math.pow(b1 - b2, 2)
        );
    }

    function applyChromaKey(imageData, chromaColor, tolerance) {
        const data = imageData.data;
        const keyColor = hexToRgb(chromaColor);
        const maxDistance = (tolerance / 100) * 441.67; // Max possible distance is sqrt(255^2 * 3)

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const distance = colorDistance(r, g, b, keyColor.r, keyColor.g, keyColor.b);

            if (distance <= maxDistance) {
                // Make pixel transparent (set to transparent color)
                data[i] = 0;     // R
                data[i + 1] = 0; // G
                data[i + 2] = 0; // B
                data[i + 3] = 0; // A (fully transparent)
            }
        }

        return imageData;
    }

    // ===== Convert using gif.js with inline blob worker =====
    convertBtn.addEventListener('click', async function () {
        if (!currentFile) return;

        try {
            // Show progress
            uploadArea.classList.add('processing');
            convertBtn.disabled = true;
            progressFill.style.width = '0%';
            progressText.textContent = window.i18n.t('preparing');

            // Get settings
            const targetWidth = outputWidth.value === 'original' ? videoPreview.videoWidth : parseInt(outputWidth.value);
            const fps = parseInt(frameRate.value);
            const colors = colorCount ? parseInt(colorCount.value) : 128;
            const maxDur = parseInt(maxDuration.value);
            const useSquareCrop = squareCrop && squareCrop.checked;

            // Get chroma key settings
            const useChromaKey = chromaKeyEnabled && chromaKeyEnabled.checked;
            const chromaColor = chromaKeyColor ? chromaKeyColor.value : '#00ff00';
            const tolerance = chromaKeyTolerance ? parseInt(chromaKeyTolerance.value) : 30;

            // Calculate dimensions
            let width, height, srcX, srcY, srcW, srcH;

            if (useSquareCrop) {
                // Square crop: use the smaller dimension
                const minDim = Math.min(videoPreview.videoWidth, videoPreview.videoHeight);
                srcX = (videoPreview.videoWidth - minDim) / 2;
                srcY = (videoPreview.videoHeight - minDim) / 2;
                srcW = minDim;
                srcH = minDim;
                width = targetWidth;
                height = targetWidth; // Square
            } else {
                // Normal: maintain aspect ratio
                const aspectRatio = videoPreview.videoHeight / videoPreview.videoWidth;
                srcX = 0;
                srcY = 0;
                srcW = videoPreview.videoWidth;
                srcH = videoPreview.videoHeight;
                width = targetWidth;
                height = Math.round(targetWidth * aspectRatio);
            }

            // Calculate actual duration
            const actualDuration = Math.min(videoPreview.duration, maxDur);
            const frameInterval = 1000 / fps;
            const totalFrames = Math.floor(actualDuration * fps);

            console.log(`Converting: ${width}x${height}, ${fps}fps, ${totalFrames} frames, colors: ${colors}, square: ${useSquareCrop}, chroma: ${useChromaKey}`);

            // Create canvas for frame extraction
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            // Create GIF encoder with inline blob worker
            // gif.js quality: 1-20 (1=best, 20=worst). Convert from color count.
            const gifQuality = colors > 128 ? 1 : colors > 64 ? 5 : colors > 32 ? 10 : 20;
            const gifOptions = {
                workers: 2,
                quality: gifQuality,
                width: width,
                height: height,
                workerScript: workerUrl
            };

            // If using chroma key, set transparent color
            if (useChromaKey) {
                gifOptions.transparent = 0x000000; // Transparent black
            }

            const gif = new GIF(gifOptions);

            // Extract frames
            progressText.textContent = window.i18n.t('extractingFrames');

            for (let i = 0; i < totalFrames; i++) {
                const time = i / fps;
                videoPreview.currentTime = time;

                // Wait for video to seek
                await new Promise(resolve => {
                    videoPreview.onseeked = resolve;
                });

                // Draw frame to canvas (with optional square crop)
                ctx.drawImage(videoPreview, srcX, srcY, srcW, srcH, 0, 0, width, height);

                // Apply chroma key if enabled
                if (useChromaKey) {
                    const imageData = ctx.getImageData(0, 0, width, height);
                    applyChromaKey(imageData, chromaColor, tolerance);
                    ctx.putImageData(imageData, 0, 0);
                }

                // Add frame to GIF
                gif.addFrame(ctx, { copy: true, delay: frameInterval });

                // Update progress
                const progress = Math.round((i / totalFrames) * 50);
                progressFill.style.width = `${progress}%`;
                const extractingText = window.i18n.t('extractingFrames');
                progressText.textContent = `${extractingText} ${i + 1}/${totalFrames}`;
            }

            // Render GIF
            progressText.textContent = window.i18n.t('generatingGif');

            gif.on('progress', function (p) {
                const progress = 50 + Math.round(p * 50);
                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${window.i18n.t('generatingGif')} ${Math.round(p * 100)}%`;
            });

            gif.on('finished', function (blob) {
                console.log('GIF created:', blob.size, 'bytes');
                gifBlob = blob;

                // Display result
                const gifUrl = URL.createObjectURL(blob);
                gifPreview.src = gifUrl;

                // Get GIF info
                gifSize.textContent = formatFileSize(blob.size);
                gifDimensions.textContent = `${width}x${height}`;

                // Show result section
                resultSection.classList.remove('hidden');
                uploadArea.classList.remove('processing');
                convertBtn.disabled = false;

                // Scroll to result
                resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });

            gif.render();

        } catch (error) {
            console.error('Conversion failed:', error);
            alert(window.i18n.t('errorConversion') + '\n\nError: ' + error.message);
            uploadArea.classList.remove('processing');
            convertBtn.disabled = false;
        }
    });

    // ===== Download =====
    downloadBtn.addEventListener('click', function () {
        if (!gifBlob) return;

        const url = URL.createObjectURL(gifBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted-${Date.now()}.gif`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // ===== Share on X (Twitter) =====
    const shareXBtn = document.getElementById('shareXBtn');
    if (shareXBtn) {
        shareXBtn.addEventListener('click', function () {
            // Create tweet text (note: cannot attach images via Web Intent - requires API)
            const tweetText = encodeURIComponent('GIF Converter で動画からGIFを作成しました！✨\n\n#GIFConverter #GIF');
            const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

            // Open Twitter compose window
            window.open(tweetUrl, '_blank', 'width=550,height=420');
        });
    }

    // ===== New Convert =====
    newConvertBtn.addEventListener('click', function () {
        resetUpload();
        uploadArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // ===== Utilities =====
    function formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }

    // ===== Size Estimation =====
    const estimatedSizeEl = document.getElementById('estimatedSize');
    const estimateFramesEl = document.getElementById('estimateFrames');
    const estimateResolutionEl = document.getElementById('estimateResolution');

    function updateEstimatedSize() {
        if (!videoPreview || !videoPreview.duration) return;

        // Get current settings
        const targetWidth = outputWidth.value === 'original' ? videoPreview.videoWidth : parseInt(outputWidth.value);
        const fps = parseInt(frameRate.value);
        const colors = colorCount ? parseInt(colorCount.value) : 128;
        const maxDur = parseInt(maxDuration.value);
        const useSquareCrop = squareCrop && squareCrop.checked;

        // Calculate dimensions
        let width, height;
        if (useSquareCrop) {
            width = targetWidth;
            height = targetWidth;
        } else {
            const aspectRatio = videoPreview.videoHeight / videoPreview.videoWidth;
            width = targetWidth;
            height = Math.round(targetWidth * aspectRatio);
        }

        // Calculate frame count
        const actualDuration = Math.min(videoPreview.duration, maxDur);
        const totalFrames = Math.floor(actualDuration * fps);

        // Estimate file size based on empirical formula
        // Color count affects compression significantly
        const colorFactor = colors / 256; // 0.125 to 1.0
        const pixelsPerFrame = width * height;

        // Empirical compression ratio for GIF (varies greatly by content)
        // Average ~0.05-0.2 bytes per pixel, affected by color count
        const bytesPerPixel = 0.08 * colorFactor + 0.02;

        const estimatedBytes = pixelsPerFrame * totalFrames * bytesPerPixel;

        // Update display
        if (estimatedSizeEl) {
            estimatedSizeEl.textContent = formatFileSize(estimatedBytes);
        }
        if (estimateFramesEl) {
            const framesText = window.i18n.t('frames');
            estimateFramesEl.textContent = `${totalFrames} ${framesText}`;
        }
        if (estimateResolutionEl) {
            estimateResolutionEl.textContent = `${width}×${height}`;
        }
    }

    // Add event listeners for settings changes
    if (outputWidth) outputWidth.addEventListener('change', updateEstimatedSize);
    if (frameRate) frameRate.addEventListener('change', updateEstimatedSize);
    if (colorCount) colorCount.addEventListener('change', updateEstimatedSize);
    if (maxDuration) maxDuration.addEventListener('change', updateEstimatedSize);

    // ===== Smooth scroll for nav links =====
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== Platform Tab Switching =====
    const discordTab = document.getElementById('discordTab');
    const twitchTab = document.getElementById('twitchTab');
    const discordContent = document.getElementById('discordContent');
    const twitchContent = document.getElementById('twitchContent');

    if (discordTab && twitchTab) {
        discordTab.addEventListener('click', function () {
            discordTab.classList.add('active');
            twitchTab.classList.remove('active');
            if (discordContent) discordContent.classList.remove('hidden');
            if (twitchContent) twitchContent.classList.add('hidden');
        });

        twitchTab.addEventListener('click', function () {
            twitchTab.classList.add('active');
            discordTab.classList.remove('active');
            if (twitchContent) twitchContent.classList.remove('hidden');
            if (discordContent) discordContent.classList.add('hidden');
        });
    }

    // ===== Presets =====
    const presetDiscordEmoji = document.getElementById('presetDiscordEmoji');
    const presetDiscordSticker = document.getElementById('presetDiscordSticker');
    const presetTwitchEmote = document.getElementById('presetTwitchEmote');

    function applyPreset(settings) {
        if (outputWidth) outputWidth.value = settings.width;
        if (frameRate) frameRate.value = settings.fps;
        if (colorCount) colorCount.value = settings.colors;
        if (maxDuration) maxDuration.value = settings.duration;
        if (squareCrop) squareCrop.checked = settings.square;
        updateEstimatedSize();
    }

    if (presetDiscordEmoji) {
        presetDiscordEmoji.addEventListener('click', function () {
            applyPreset({ width: '128', fps: '8', colors: '64', duration: '3', square: true });
        });
    }

    if (presetDiscordSticker) {
        presetDiscordSticker.addEventListener('click', function () {
            applyPreset({ width: '320', fps: '10', colors: '64', duration: '5', square: true });
        });
    }

    if (presetTwitchEmote) {
        presetTwitchEmote.addEventListener('click', function () {
            applyPreset({ width: '112', fps: '8', colors: '128', duration: '3', square: true });
        });
    }

    console.log('GIF Converter initialized successfully!');
});
