!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){const n=document.querySelector(".dataclip-form");n.addEventListener("submit",e=>{e.preventDefault();for(var t=document.querySelector(".dataclip-form").elements,n={},o=0;o<t.length-1;o++){var r=t.item(o);"checkbox"===r.type?n[r.name]=r.checked:("radio"===r.type&&!0===r.checked||"radio"!==r.type)&&(n[r.name]=r.value)}((e,t,n)=>new Promise((o,r)=>{const a=new XMLHttpRequest;a.open(e,t),a.responseType="json",n&&a.setRequestHeader("Content-Type","application/json"),a.onload=()=>{a.status>=400?r(a.response):o(a.response)},a.onerror=()=>{r("Something went wrong!")},a.send(JSON.stringify(n))}))("POST",document.querySelector(".dataclip-form").action,n).then(e=>{console.log(e),document.querySelector(".dataclip-form").reset();var t=document.createElement("p");t.setAttribute("id","thank-you"),t.setAttribute("class","dataclip-form__success__message");var n=document.createTextNode("Thank you.");t.appendChild(n),document.querySelector(".dataclip-form").appendChild(t),setTimeout((function(){document.getElementById("thank-you").style.display="none"}),5e3)}).catch(e=>{console.log(e),window.alert("Something went wrong. Please try again!")})})}]);
