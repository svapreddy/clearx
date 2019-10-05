/** @license
 * Autodesk clearx
 * Date: 2019-10-05
 * License: Apache-2.0
 *
 * Bundled dependencies (npm packages): 
 * {"package":"nanoid@2.1.2","license":"MIT","link":"https://github.com/ai/nanoid#readme"}, {"package":"deepmerge@3.1.0","license":"MIT","link":"https://github.com/KyleAMathews/deepmerge"}, {"package":"fast-deep-equal@2.0.1","license":"MIT","link":"https://github.com/epoberezkin/fast-deep-equal#readme"}
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).ClearX=e()}(this,(function(){"use strict";if("production"!==process.env.NODE_ENV){if("undefined"!=typeof navigator&&"ReactNative"===navigator.product)throw new Error("React Native does not have a built-in secure random generator. If you don’t need unpredictable IDs, you can use `nanoid/non-secure`. For secure ID install `expo-random` locally and use `nanoid/async`.");if("undefined"==typeof self||!self.crypto&&!self.msCrypto)throw new Error("Your browser does not have secure random generator. If you don’t need unpredictable IDs, you can use nanoid/non-secure.")}var t=self.crypto||self.msCrypto;"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var e=function(t,e){return t(e={exports:{}},e.exports),e.exports}((function(t,e){t.exports=function(){var t=function(t){return function(t){return!!t&&"object"==typeof t}(t)&&!function(t){var r=Object.prototype.toString.call(t);return"[object RegExp]"===r||"[object Date]"===r||function(t){return t.$$typeof===e}(t)}(t)},e="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function r(t,e){return!1!==e.clone&&e.isMergeableObject(t)?o((r=t,Array.isArray(r)?[]:{}),t,e):t;var r}function n(t,e,n){return t.concat(e).map((function(t){return r(t,n)}))}function o(e,i,a){(a=a||{}).arrayMerge=a.arrayMerge||n,a.isMergeableObject=a.isMergeableObject||t;var s=Array.isArray(i);return s===Array.isArray(e)?s?a.arrayMerge(e,i,a):function(t,e,n){var i={};return n.isMergeableObject(t)&&Object.keys(t).forEach((function(e){i[e]=r(t[e],n)})),Object.keys(e).forEach((function(a){n.isMergeableObject(e[a])&&t[a]?i[a]=o(t[a],e[a],n):i[a]=r(e[a],n)})),i}(e,i,a):r(i,a)}return o.all=function(t,e){if(!Array.isArray(t))throw new Error("first argument should be an array");return t.reduce((function(t,r){return o(t,r,e)}),{})},o}()})),r=Array.isArray,n=Object.keys,o=Object.prototype.hasOwnProperty,i=function t(e,i){if(e===i)return!0;if(e&&i&&"object"==typeof e&&"object"==typeof i){var a,s,u,c=r(e),f=r(i);if(c&&f){if((s=e.length)!=i.length)return!1;for(a=s;0!=a--;)if(!t(e[a],i[a]))return!1;return!0}if(c!=f)return!1;var p=e instanceof Date,h=i instanceof Date;if(p!=h)return!1;if(p&&h)return e.getTime()==i.getTime();var l=e instanceof RegExp,d=i instanceof RegExp;if(l!=d)return!1;if(l&&d)return e.toString()==i.toString();var y=n(e);if((s=y.length)!==n(i).length)return!1;for(a=s;0!=a--;)if(!o.call(i,y[a]))return!1;for(a=s;0!=a--;)if(!t(e[u=y[a]],i[u]))return!1;return!0}return e!=e&&i!=i},a=function(t){return isNaN(t)?t:parseInt(t,10)},s=function(t,e,r){return!u(t[e],r)&&(t[e]=r,t[e]===r)},u=function(t,e){return void 0!==t&&i(t,e)},c=function(t,e,r){if(void 0===e&&(e="."),void 0===r&&(r="\\"),!t)return[];if(Array.isArray(t))return t;for(var n=[],o="",i=0,s=t.length;i<s;++i){var u=t[i];u===e&&t[i-1]!==r?(o.length>0&&n.push(a(o)),o=""):u!==r&&(o+=t[i])}return o.length>0&&n.push(a(o)),n},f=function(t,e,r){if(void 0===t)return r;if(!e||0===e.length)return t;var n=(e=c(e))[0],o=e.slice(1);return isNaN(n)||(n*=1),f(t[n],o,r)},p=function(t,e,r,n){var o=!1;if(void 0===t)return[!1,o];if(!e||0===e.length)return[!1,o];var i=(e=c(e))[0],a=e[1],u=e.slice(2);if(void 0!==a){if(!t.hasOwnProperty(i)){var f=isNaN(a)?{}:[];o=s(t,i,f)}var h=p(t[i],[a].concat(u),r,n);return[h[0],h[1]||o]}return t.hasOwnProperty(i)&&n?[!0,o]:[!0,o=s(t,i,r)]},h=function(t,e,r){return void 0===r&&(r=null),p(t,e,r,!0)},l=["push","pop","splice","shift","unshift","sort","slice"],d=function(t,e,r){for(var n=[],o=arguments.length-3;o-- >0;)n[o]=arguments[o+3];if(-1===l.indexOf(r))return!1;var i,a=f(t,e);Array.isArray(a)||p(t,e,a=[]);try{i=a[r].apply(a,n)}catch(t){}return[!0,!0,i]},y=function(t,e){for(var r=[],n=arguments.length-2;n-- >0;)r[n]=arguments[n+2];return d.apply(void 0,[t,e,"push"].concat(r))},v=function(t,e){for(var r=[],n=arguments.length-2;n-- >0;)r[n]=arguments[n+2];return d.apply(void 0,[t,e,"unshift"].concat(r))},g=function(t,e){for(var r=[],n=arguments.length-2;n-- >0;)r[n]=arguments[n+2];return d.apply(void 0,[t,e,"splice"].concat(r))},m=function(t,e){for(var r=[],n=arguments.length-2;n-- >0;)r[n]=arguments[n+2];var o=d.apply(void 0,[t,e,"slice"].concat(r));return o[2]},b=function(t,e){for(var r=[],n=arguments.length-2;n-- >0;)r[n]=arguments[n+2];return d.apply(void 0,[t,e,"sort"].concat(r))},A=function(t,e,r){void 0===r&&(r=1);var n=parseInt(f(t,e),10);return isNaN(n)&&(n=0),p(t,e,n+=r)},U=function(t,e){var r=!1;if(void 0===t)return[!1,r];if(!e||0===e.length)return[!1,r];var n=(e=c(e))[0],o=e.slice(1);if(1===e.length){if(Array.isArray(t)&&!isNaN(n)){var i=t.length;t.splice(n,1),r=i!==t.length}else t.hasOwnProperty(n)&&(r=delete t[n]);return[!0,r]}return U(t[n],[].concat(o))},O=function(t,e,r,n){void 0===e&&(e="."),this.paths=t,this.keySeperator=e,this.store=r,this.dataObserver=n,this.components=[],this._afterUpdateEvents=[],this._dataTransformers=[]},_={keys:{configurable:!0},dataTransformers:{configurable:!0},data:{configurable:!0},afterUpdateEvents:{configurable:!0},hasDataListener:{configurable:!0}};_.keys.get=function(){var t=this.paths;if(Array.isArray(t))return t;var e=[];if("string"==typeof t)e=[c(t,this.keySeperator)];else{if("[object Object]"!==t.toString())return t;for(var r in t)t.hasOwnProperty(r)&&e.push(c(t[r],this.keySeperator))}return e},O.prototype.observe=function(){if(0!==this.components.length&&!this.cancelObserver){var t=this.dataObserver,e=this.keys,r=this.updateComponents.bind(this);this.cancelDataListener=t.attachObserver(e,r)}},O.prototype.unobserve=function(){this.cancelDataListener&&(this.cancelDataListener(),delete this.cancelDataListener)},O.prototype.listenUnmount=function(t,e){var r=this;if(Array.isArray(t))return function(){};var n=t.componentWillUnmount;t.componentWillUnmount=function(){e(),"function"==typeof r.componentWillUnmount&&r.componentWillUnmount.call(t)},t.componentWillUnmount.__original=n},O.prototype.unlistenUnmount=function(t){if(t.componentWillUnmount){var e=t.componentWillUnmount.__original;e&&(t.componentWillUnmount=e)}},O.prototype.dataTransformer=function(t){"function"==typeof t&&(this._dataTransformers.push(t),this.updateComponents())},_.dataTransformers.get=function(){return this._dataTransformers.slice(0)},O.prototype.applyDataTransformers=function(t){return this._dataTransformers.forEach((function(e){try{t=e(t)}catch(r){console.log(e,"failing to transform",t)}})),t},O.prototype.updateData=function(){var t,r=this,n={},o=this.paths;if("string"==typeof o)o=c(o,this.keySeperator),n=this.store.get(o);else if(Array.isArray(o))n=o.map((function(t){var e=c(t,r.keySeperator);return r.store.get(e)}));else for(var i in o){var a=c(o[i],this.keySeperator);n[i]=this.store.get(a)}"object"==typeof(n=this.applyDataTransformers(n))&&(t=e({},n),Object.freeze&&Object.freeze(t),n=t),this._data=n},_.data.get=function(){return this._data||this.updateData(),this._data},O.prototype.updateComponents=function(){var t=this;this.updateData(),this.components.forEach((function(e){t.assignState(e)})),this.executeAfterUpdate()},O.prototype.assignStateFC=function(t,e){var r;if(Array.isArray(t)&&(r=t[1]),r)return!!e||(r(this.data),t[0]=this.data,!0)},O.prototype.assignStateCC=function(t,e){if("function"==typeof t.setState)return e?(t.state=t.state||{},t.state.store=this.data):t.setState({store:this.data}),!0},O.prototype.assignStateOthers=function(t){"object"==typeof t&&(t.data=this.data)},O.prototype.assignState=function(t,e){void 0===e&&(e=!1);var r=this.assignStateFC(t,e),n=this.assignStateCC(t,e);r||n||this.assignStateOthers(t,e)},O.prototype.onUpdate=function(t){"function"==typeof t&&this._afterUpdateEvents.push(t)},_.afterUpdateEvents.get=function(){return this._afterUpdateEvents.slice(0)},O.prototype.executeAfterUpdate=function(){var t=this;this._afterUpdateEvents.forEach((function(e){try{e(t.data)}catch(t){console.log(t)}}))},_.hasDataListener.get=function(){return!!this.cancelDataListener},O.prototype.addMark=function(t,e){var r=t;Array.isArray(t)&&(r=t[1]),r.__segment=e},O.prototype.removeMark=function(t){var e=t;Array.isArray(t)&&(e=t[1]),delete e.__segment},Object.defineProperties(O.prototype,_);var k=function(e,r,n,o,i){this.id=r||function(e){e=e||21;for(var r="",n=t.getRandomValues(new Uint8Array(e));0<e--;)r+="Uint8ArdomValuesObj012345679BCDEFGHIJKLMNPQRSTWXYZ_cfghkpqvwxyz-"[63&n[e]];return r}(),this.paths=e,this._helper=new O(e,n,o,i),this.keySeperator=n,this.store=o,this.dataObserver=i},x={data:{configurable:!0},components:{configurable:!0},active:{configurable:!0},afterUpdateEvents:{configurable:!0},dataTransformers:{configurable:!0}};k.prototype.findComponent=function(t){if(!this._helper)return-1;Array.isArray(t)&&(t=t[1]);for(var e=this._helper.components,r=0;r<e.length;r++){var n=e[r];if(Array.isArray(n)&&(n=n[1]),t===n)return r}return-1},x.data.get=function(){return this._helper.data},x.components.get=function(){return this._helper.components.slice(0)},x.active.get=function(){return this._helper.hasDataListener},x.afterUpdateEvents.get=function(){return this._helper.afterUpdateEvents},x.dataTransformers.get=function(){return this._helper.dataTransformers},k.prototype.link=function(t){if(!t)return{};var e=this._helper;if(!e)return{};var r=this.unlink.bind(this,t),n={data:this.data,unlink:r};return this.findComponent(t)>-1?n:(e.components.push(t),e.observe(),e.addMark(t,this),e.listenUnmount(t,r),e.assignState(t,!0),n)},k.prototype.unlink=function(t){if(t){var e=this._helper;if(e){var r=this.findComponent(t);r>-1&&(e.removeMark(t),e.components.splice(r,1),e.unlistenUnmount(t)),0===e.components.length&&e.unobserve()}}},k.prototype.unlinkAll=function(){this._helper.components.forEach(this.unlink.bind(this))},k.prototype.onUpdate=function(t){this._helper.onUpdate(t)},k.prototype.dataTransformer=function(t){this._helper.dataTransformer(t)},k.prototype.teardown=function(){this.unlinkAll(),delete this._helper,delete this.dataObserver},Object.defineProperties(k.prototype,x);var E=function(t){this.store=t,this.listeners={},this.counter=0};E.prototype.attachObserver=function(t,e){var r=this;if(e&&t&&0!==t.length){++this.counter;var n="data-slice:"+this.counter;return this.listeners[n]={keys:t,listener:e},function(){delete r.listeners[n]}}},E.prototype.dataUpdatedAt=function(t){var e=[],r=c(t).join(">>");for(var n in this.listeners){var o=this.listeners[n],i=o.keys,a=o.listener;(i=i.filter((function(t){var e=c(t).join(">>");return e.startsWith(r)||r.startsWith(e)}))).length>0&&e.push([i,a])}e.forEach((function(t){var e=t[0],r=t[1];try{r(e)}catch(t){console.log("Error updating",r,e)}}))},E.prototype.teardown=function(){this.listeners={}};var S=function(t,e){void 0===e&&(e={});var r=e.keySeperator;void 0===r&&(r="."),this.data=t,this.segments=[],this.dataObserver=new E(this),this.keySeperator=r};return S.prototype.triggerEvents=function(t){this.dataObserver.dataUpdatedAt(t)},S.prototype.executeUtil=function(t,e){var r=e[0];return e[1]&&this.triggerEvents(t),r},S.prototype.get=function(t,e){return f(this.data,t,e)},S.prototype.set=function(t,e,r){return void 0===r&&(r=!1),this.executeUtil(t,p(this.data,t,e,r))},S.prototype.coalesce=function(t,e){return function(t,e,r){for(var n=0,o=e.length;n<o;++n){var i=f(t,e[n]);if(null!=i)return i}return r}(this.data,t,e)},S.prototype.empty=function(t){return this.executeUtil(t,function(t,e){var r,n=!1,o=f(t,e);if(void 0===o)return[!0,n];switch(!0){case"string"==typeof o:r="";break;case"number"==typeof o:r=0;break;case"boolean"==typeof o:r=!1;break;case Array.isArray(o):return o.length=0,[!0,0===o.length];case"object"==typeof o:for(var i in o)o.hasOwnProperty(i)&&(n=delete o[i]||n);return[!0,n]}return p(t,e,r)}(this.data,t))},S.prototype.insert=function(t,e,r){return this.executeUtil(t,function(t,e,r,n){return void 0===n?y(t,e,r):d(t,e,"splice",n,0,r)}(this.data,t,e,r))},S.prototype.push=function(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];return this.executeUtil(t,y.apply(void 0,[this.data,t].concat(e)))},S.prototype.unshift=function(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];return this.executeUtil(t,v.apply(void 0,[this.data,t].concat(e)))},S.prototype.pop=function(t){return this.executeUtil(t,(e=this.data,d(e,t,"pop")));var e},S.prototype.shift=function(t){return this.executeUtil(t,(e=this.data,d(e,t,"shift")));var e},S.prototype.splice=function(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];return this.executeUtil(t,g.apply(void 0,[this.data,t].concat(e)))},S.prototype.slice=function(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];return m.apply(void 0,[this.data,t].concat(e))},S.prototype.sort=function(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];return this.executeUtil(t,b.apply(void 0,[this.data,t].concat(e)))},S.prototype.ensureExists=function(t,e){return this.executeUtil(t,h(this.data,t,e))},S.prototype.delete=function(t){return this.executeUtil(t,U(this.data,t))},S.prototype.has=function(t){return e=this.data,void 0!==f(e,t);var e},S.prototype.merge=function(t,r){return this.executeUtil(t,function(t,r,n){h(t,r,Array.isArray(n)?[]:{});var o=f(t,r),i=e(o,n);return p(t,r,i)}(this.data,t,r))},S.prototype.increment=function(t,e){return this.executeUtil(t,A(this.data,t,e))},S.prototype.decrement=function(t,e){return this.executeUtil(t,function(t,e,r){return void 0===r&&(r=1),A(t,e,-1*r)}(this.data,t,e))},S.prototype.toggle=function(t){return this.executeUtil(t,(e=this.data,n=!!f(e,r=t),p(e,r,!n)));var e,r,n},S.prototype.isEqual=function(t,e){return r=this.data,n=e,o=f(r,t),i(o,n);var r,n,o},S.prototype.paths=function(t,e,r){var n=new k(t,e,r||this.keySeperator,this,this.dataObserver);return this.segments.push(n),n},S.prototype.bind=function(t){void 0===t&&(t={});var e,r=t.to,n=t.afterUpdate,o=t.id,i=t.keySeperator,a=t.paths,s=r;if(Array.isArray(s)&&(s=r[1]),e=s.__segment)return e.link(r);(e=this.paths(a,o,i)).onUpdate(n);var u=e.link(r);return Array.isArray(r)?u:e},S.prototype.removeSegment=function(t){var e=this.segments.indexOf(t);e>-1&&(t.teardown(),this.segments.splice(e,1))},S.prototype.teardown=function(){this.segments.forEach((function(t){t.teardown()})),this.dataObserver.teardown(),delete this.dataObserver,this.data={}},S}));
//# sourceMappingURL=clearx.js.map
