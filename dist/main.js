!function(e){var o={};function t(n){if(o[n])return o[n].exports;var s=o[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,t),s.l=!0,s.exports}t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,o){if(1&o&&(e=t(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var s in e)t.d(n,s,function(o){return e[o]}.bind(null,s));return n},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},t.p="",t(t.s=1)}([function(e,o){e.exports=globalObj={loopRight:"",loopLeft:"",degrees:0,dropCount:0,x:0,y:0}},function(e,o,t){console.log("Hello, World!"),rotate=t(2),resizeFunc=t(3),moveSprite=t(4),globalVar=t(8),degrees=0,dropCount=0,document.addEventListener("keydown",moveSprite),document.getElementsByTagName("BODY")[0].onresize=function(){resizeFunc()}},function(e,o){var t,n,s,l,r=document.getElementById("clock-runner"),c=document.getElementById("),m=document.querySelector(".container"),d=0,i=0;rotateElem=function(e,o){document.getElementById(e).style.transform="rotate("+d+"deg)",looper=setTimeout('rotateElem("'+e+'",'+o+")",o),++d>359&&(degress=1),document.getElementById("status").innerHTML="rotate(deg)"},document.addEventListener("keydown",(function(e){"ArrowUp"===e.key?(clockDrop=document.getElementById("clock"),bomb=this.createElement("DIV"),bomb.classList.add("bomb"),bomb.setAttribute("id",`bomb-${i}`),console.log("bodyPos"),console.log(bodyPos),console.log("bodyPos.width"),console.log(bodyPos.width),console.log("bodyPos.height"),console.log(bodyPos.height),bomb.style.left=s+"px",bomb.style.top=l+"px",m.append(bomb),newBomb=document.getElementById(`bomb-${i}`),newBomb.classList.add("glow"),i++):"ArrowDown"===e.key?(c.style.backgroundImage="url('')",r.style.background="url('../../../public/assets/images/hazmat-runner-frontside.png')",r.classList.remove("move-left"),r.classList.remove("move-right"),r.classList.remove("move-forward"),r.classList.remove("move-backward"),r.classList.add("move-backward")):"ArrowRight"===e.key?(c.style.backgroundImage="url('')",r.style.background="url('../assets/images/clock-runner-xs-R.png')",r.classList.remove("move-left"),r.classList.remove("move-right"),r.classList.remove("move-forward"),r.classList.remove("move-backward"),r.classList.add("move-right"),function(e,o){elem=document.getElementById(e),elem.style.transform="rotate("+d+"deg)",clearInterval(n),clearInterval(t),dropElem=document.getElementById("dropper"),position=dropElem.getBoundingClientRect(),bodyPos=document.body.getBoundingClientRect(),containerPos=m.getBoundingClientRect(),widthOffset=position.width/2,heightOffset=position.height/2,s=position.left+widthOffset,l=position.top+heightOffset,t=setTimeout("rotateAnimationRight('"+e+"',"+o+")",o),d++}("clock-runner",50)):"ArrowLeft"===e.key?(c.style.backgroundImage="url('')",r.style.background="url('../assets/images/clock-runner-xs-L.png')",r.classList.remove("move-left"),r.classList.add("move-left"),r.classList.remove("move-right"),r.classList.remove("move-forward"),r.classList.remove("move-backward"),function(e,o){elem=document.getElementById(e),elem.style.transform="rotate("+d+"deg)",clearInterval(t),clearInterval(n),n=setTimeout("rotateAnimationLeft('"+e+"',"+o+")",o),d--}("clock-runner",50)):"i"===e.key||"I"===e.key?(clockDrop=document.getElementById("clock"),bomb=this.createElement("DIV"),bomb.classList.add("bomb"),clockDrop.append(bomb)):"j"===e.key||"J"===e.key?(console.log("Space key selected!"),clockDrop=document.getElementById("clock"),bomb=this.createElement("DIV"),bomb.classList.add("bomb"),clockDrop.append(bomb)):"k"===e.key||"K"===e.key?(console.log("Space key selected!"),clockDrop=document.getElementById("clock"),bomb=this.createElement("DIV"),bomb.classList.add("bomb"),clockDrop.append(bomb)):"l"!==e.key&&"L"!==e.key||(console.log("Space key selected!"),clockDrop=document.getElementById("clock"),bomb=this.createElement("DIV"),bomb.classList.add("bomb"),clockDrop.append(bomb))})),document.addEventListener("click",(function(e){xPos=e.clientX,yPos=e.clientY,clockDrop=document.getElementById("clock"),bomb=this.createElement("DIV"),bomb.classList.add("bomb"),m.append(bomb),bomb.style.left=xPos+"px",bomb.style.top=yPos+"px"})),resizeFunc=function(){console.log(position.width),console.log(position.height),droppedBombs=document.getElementsByClassName("bomb");for(let e=0;e<droppedBombs.length;e++)console.log(droppedBombs[e]),respResize,droppedBombs[e].style.left="25px",droppedBombs[e].style.top="25px"},document.getElementsByTagName("BODY")[0].onresize=function(){resizeFunc()}},function(e,o){e.exports=resizeFunc=function(){var e=document.getElementById("dropper").getBoundingClientRect();console.log(e.width),console.log(e.height);var o=document.getElementsByClassName("bomb");for(let e=0;e<o.length;e++)console.log(o[e]),o[e].style.left="25px",o[e].style.top="25px"}},function(e,o,t){var n=t(5),s=t(7);e.exports=moveSprite=function(e){var o=document.getElementById("clock-runner"),t=document.getElementById("dropper"),l=document.querySelector(".container");"ArrowUp"===e.key?(clockDrop=document.getElementById("clock"),bomb=this.createElement("DIV"),bomb.classList.add("bomb"),bomb.setAttribute("id",`bomb-${dropCount}`),console.log("bodyPos"),console.log(bodyPos),console.log("bodyPos.width"),console.log(bodyPos.width),console.log("bodyPos.height"),console.log(bodyPos.height),bomb.style.left=x+"px",bomb.style.top=y+"px",l.append(bomb),newBomb=document.getElementById(`bomb-${dropCount}`),newBomb.classList.add("glow"),dropCount++):"ArrowDown"===e.key?(t.style.backgroundImage="url('')",o.style.background="url('../../../public/assets/images/hazmat-runner-frontside.png')",o.classList.remove("move-left"),o.classList.remove("move-right"),o.classList.remove("move-forward"),o.classList.remove("move-backward"),o.classList.add("move-backward")):"ArrowRight"===e.key?(t.style.backgroundImage="url('')",o.style.background="url('../assets/images/clock-runner-xs-R.png')",o.classList.remove("move-left"),o.classList.remove("move-right"),o.classList.remove("move-forward"),o.classList.remove("move-backward"),o.classList.add("move-right"),n("clock-runner",50)):"ArrowLeft"===e.key?(t.style.backgroundImage="url('')",o.style.background="url('../assets/images/clock-runner-xs-L.png')",o.classList.remove("move-left"),o.classList.add("move-left"),o.classList.remove("move-right"),o.classList.remove("move-forward"),o.classList.remove("move-backward"),s("clock-runner",50)):"i"===e.key||"I"===e.key?(clockDrop=document.getElementById("clock"),bomb=this.createElement("DIV"),bomb.classList.add("bomb")):"j"===e.key||"J"===e.key?(console.log("Space key selected!"),clockDrop=document.getElementById("clock"),bomb=this.createElement("DIV"),bomb.classList.add("bomb")):"k"===e.key||"K"===e.key?(console.log("Space key selected!"),clockDrop=document.getElementById("clock"),bomb=this.createElement("DIV"),bomb.classList.add("bomb")):"l"!==e.key&&"L"!==e.key||(console.log("Space key selected!"),clockDrop=document.getElementById("clock"),bomb=this.createElement("DIV"),bomb.classList.add("bomb"))}},function(e,o,t){globalObj=t(0),degrees=t(0).degrees,setTimeoutFunc=t(6),e.exports=rotateAnimationRight=function(e,o,t){container=document.getElementById("game-screen"),console.log("el"),console.log(e),elem=document.getElementById(e),elem.style.transform="rotate("+t+"deg)","undefined"!=typeof loopLeft&&clearInterval(loopLeft),"undefined"!=typeof loopRight&&clearInterval(loopRight),dropElem=document.getElementById("dropper"),position=dropElem.getBoundingClientRect(),bodyPos=document.body.getBoundingClientRect(),containerPos=container.getBoundingClientRect(),widthOffset=position.width/2,heightOffset=position.height/2,x=position.left+widthOffset,y=position.top+heightOffset,loopRight=setTimeout("rotateAnimationRight('"+e+"',"+o+")",o),t++}},function(e,o){e.exports=loopRight=setTimeout("rotateAnimationRight('"+el+"',"+speed+")",speed)},function(e,o){},function(e,o){e.exports=function(){console.log("globalVar function fires")}}]);