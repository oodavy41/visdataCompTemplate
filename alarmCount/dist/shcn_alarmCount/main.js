shcn_alarmCount(function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=6)}([function(t,n){t.exports=React},function(t,n,e){var r=e(2);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(4)(r,o);r.locals&&(t.exports=r.locals)},function(t,n,e){(n=e(3)(!1)).push([t.i,".alarmCounterMain {\r\n  padding: 5px;\r\n  border-radius: 2px;\r\n  transition: all 0.2s linear;\r\n}\r\n\r\n.alarmMain ::-webkit-scrollbar-thumb {\r\n  background-color: rgba(119, 152, 243, 0.2);\r\n  border-radius: 5px;\r\n}\r\n\r\n.alarmBoard {\r\n  background-size: 100% 100%;\r\n  width: 500px;\r\n  margin: 10px;\r\n  padding: 10px;\r\n}\r\n.hidden {\r\n  transition: all 0.2s linear;\r\n  opacity: 0;\r\n  visibility: hidden;\r\n  /* display: none; */\r\n}\r\n.shown {\r\n  visibility: visible;\r\n  opacity: 1;\r\n}\r\n\r\n.alarmBroadcast {\r\n  background-image: none;\r\n  position: absolute;\r\n  top: 40px;\r\n  right: 16px;\r\n}\r\n\r\n.alarmBroadcast .closeAlarm {\r\n  visibility: hidden;\r\n}\r\n\r\n.alarmBoard h3 {\r\n  float: right;\r\n  font-size: 18px;\r\n  font-weight: 400;\r\n  text-align: right;\r\n  color: #ee4444;\r\n  margin: 3px 0;\r\n  line-height: 21px;\r\n}\r\n.alarmBoard ul {\r\n  margin: 1px 1px 0;\r\n}\r\n.alarmBoard ul li {\r\n  font-size: 22px;\r\n  font-weight: 200;\r\n  line-height: 30px;\r\n  color: #ffffff;\r\n  text-align: justify;\r\n}\r\n\r\n.closeAlarm {\r\n  float: right;\r\n  color: red;\r\n  font-size: 30px;\r\n  cursor: pointer;\r\n}\r\n\r\n.type {\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 475px;\r\n  color: #2196f3;\r\n  display: inline-block;\r\n  width: 80px;\r\n  height: 27px;\r\n  line-height: 27px;\r\n  text-align: center;\r\n  font-weight: 400;\r\n  font-size: 27px;\r\n}\r\n\r\n.fireIMG {\r\n  position: absolute;\r\n  top: 150px;\r\n  right: 200px;\r\n}\r\n",""]),t.exports=n},function(t,n,e){"use strict";t.exports=function(t){var n=[];return n.toString=function(){return this.map((function(n){var e=function(t,n){var e=t[1]||"",r=t[3];if(!r)return e;if(n&&"function"==typeof btoa){var o=(a=r,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(l," */")),i=r.sources.map((function(t){return"/*# sourceURL=".concat(r.sourceRoot).concat(t," */")}));return[e].concat(i).concat([o]).join("\n")}var a,s,l;return[e].join("\n")}(n,t);return n[2]?"@media ".concat(n[2]," {").concat(e,"}"):e})).join("")},n.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var r=0;r<t.length;r++){var o=[].concat(t[r]);e&&(o[2]?o[2]="".concat(e," and ").concat(o[2]):o[2]=e),n.push(o)}},n}},function(t,n,e){var r,o,i={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),s=function(t,n){return n?n.querySelector(t):document.querySelector(t)},l=function(t){var n={};return function(t,e){if("function"==typeof t)return t();if(void 0===n[t]){var r=s.call(this,t,e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}n[t]=r}return n[t]}}(),c=null,u=0,f=[],p=e(5);function d(t,n){for(var e=0;e<t.length;e++){var r=t[e],o=i[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(y(r.parts[a],n))}else{var s=[];for(a=0;a<r.parts.length;a++)s.push(y(r.parts[a],n));i[r.id]={id:r.id,refs:1,parts:s}}}}function h(t,n){for(var e=[],r={},o=0;o<t.length;o++){var i=t[o],a=n.base?i[0]+n.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):e.push(r[a]={id:a,parts:[s]})}return e}function m(t,n){var e=l(t.insertInto);if(!e)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=f[f.length-1];if("top"===t.insertAt)r?r.nextSibling?e.insertBefore(n,r.nextSibling):e.appendChild(n):e.insertBefore(n,e.firstChild),f.push(n);else if("bottom"===t.insertAt)e.appendChild(n);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=l(t.insertAt.before,e);e.insertBefore(n,o)}}function v(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var n=f.indexOf(t);n>=0&&f.splice(n,1)}function b(t){var n=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var r=function(){0;return e.nc}();r&&(t.attrs.nonce=r)}return g(n,t.attrs),m(t,n),n}function g(t,n){Object.keys(n).forEach((function(e){t.setAttribute(e,n[e])}))}function y(t,n){var e,r,o,i;if(n.transform&&t.css){if(!(i="function"==typeof n.transform?n.transform(t.css):n.transform.default(t.css)))return function(){};t.css=i}if(n.singleton){var a=u++;e=c||(c=b(n)),r=j.bind(null,e,a,!1),o=j.bind(null,e,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(e=function(t){var n=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",g(n,t.attrs),m(t,n),n}(n),r=C.bind(null,e,n),o=function(){v(e),e.href&&URL.revokeObjectURL(e.href)}):(e=b(n),r=M.bind(null,e),o=function(){v(e)});return r(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;r(t=n)}else o()}}t.exports=function(t,n){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(n=n||{}).attrs="object"==typeof n.attrs?n.attrs:{},n.singleton||"boolean"==typeof n.singleton||(n.singleton=a()),n.insertInto||(n.insertInto="head"),n.insertAt||(n.insertAt="bottom");var e=h(t,n);return d(e,n),function(t){for(var r=[],o=0;o<e.length;o++){var a=e[o];(s=i[a.id]).refs--,r.push(s)}t&&d(h(t,n),n);for(o=0;o<r.length;o++){var s;if(0===(s=r[o]).refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete i[s.id]}}}};var x,w=(x=[],function(t,n){return x[t]=n,x.filter(Boolean).join("\n")});function j(t,n,e,r){var o=e?"":r.css;if(t.styleSheet)t.styleSheet.cssText=w(n,o);else{var i=document.createTextNode(o),a=t.childNodes;a[n]&&t.removeChild(a[n]),a.length?t.insertBefore(i,a[n]):t.appendChild(i)}}function M(t,n){var e=n.css,r=n.media;if(r&&t.setAttribute("media",r),t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}function C(t,n,e){var r=e.css,o=e.sourceMap,i=void 0===n.convertToAbsoluteUrls&&o;(n.convertToAbsoluteUrls||i)&&(r=p(r)),o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}},function(t,n){t.exports=function(t){var n="undefined"!=typeof window&&window.location;if(!n)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var e=n.protocol+"//"+n.host,r=e+n.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(t,n){var o,i=n.trim().replace(/^"(.*)"$/,(function(t,n){return n})).replace(/^'(.*)'$/,(function(t,n){return n}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?e+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")}))}},function(t,n,e){"use strict";e.r(n);var r=e(0),o=e.n(r);e(1);class i extends r.Component{constructor(t){super(t),this.state={fireWarnShow:!1,police:[1,0,2]}}componentWillUnmount(){}componentDidMount(){let{police:t}=this.state;setInterval(()=>{t[0]+=Math.round(Math.random()),t[1]+=Math.round(Math.random()),t[2]+=Math.round(Math.random()),t[0]>=5&&(t[0]=1,t[1]=0,t[2]=2),this.setState({police:[t[0],t[1],t[2]]})},18e5)}render(){let{police:t}=this.state;return o.a.createElement("div",{className:"alarmCounterMain"},o.a.createElement("div",{style:{width:"100%",height:22,display:"flex",justifyContent:"space-around",fontSize:18,color:"#fff",lineHeight:"21px"}},o.a.createElement("span",null,"110接警量"),o.a.createElement("span",null,"119接警量"),o.a.createElement("span",null,"120接警量")),o.a.createElement("div",{style:{width:"100%",height:96,display:"flex",justifyContent:"space-around",fontSize:36,color:"#fff"}},o.a.createElement("div",{style:{width:115,height:96,backgroundColor:"#144770",textAlign:"center",lineHeight:"96px",borderRadius:"2px"}},t[0]),o.a.createElement("div",{style:{width:115,height:96,backgroundColor:"#144770",textAlign:"center",lineHeight:"96px",borderRadius:"2px"}},t[1]),o.a.createElement("div",{style:{width:115,height:96,backgroundColor:"#144770",textAlign:"center",lineHeight:"96px",borderRadius:"2px"}},t[2])))}}class a extends r.Component{render(){return o.a.createElement("div",{style:{width:"100%",height:"100%"}},o.a.createElement(i,null))}}n.default=a}]));