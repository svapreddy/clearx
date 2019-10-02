(function () {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var arguments$1 = arguments;

		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments$1[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	var n="function"===typeof Symbol&&Symbol.for,p=n?Symbol.for("react.element"):60103,q=n?Symbol.for("react.portal"):60106,r=n?Symbol.for("react.fragment"):60107,t=n?Symbol.for("react.strict_mode"):60108,u=n?Symbol.for("react.profiler"):60114,v=n?Symbol.for("react.provider"):60109,w=n?Symbol.for("react.context"):60110,x=n?Symbol.for("react.concurrent_mode"):60111,y=n?Symbol.for("react.forward_ref"):60112,z=n?Symbol.for("react.suspense"):60113,A=n?Symbol.for("react.memo"):
	60115,B=n?Symbol.for("react.lazy"):60116,C="function"===typeof Symbol&&Symbol.iterator;function aa(a,b,e,c,d,g,h,f){if(!a){a=void 0;if(void 0===b){ a=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."); }else{var l=[e,c,d,g,h,f],m=0;a=Error(b.replace(/%s/g,function(){return l[m++]}));a.name="Invariant Violation";}a.framesToPop=1;throw a;}}
	function D(a){
	var arguments$1 = arguments;
	for(var b=arguments.length-1,e="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=0;c<b;c++){ e+="&args[]="+encodeURIComponent(arguments$1[c+1]); }aa(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",e);}var E={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},F={};
	function G(a,b,e){this.props=a;this.context=b;this.refs=F;this.updater=e||E;}G.prototype.isReactComponent={};G.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?D("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState");};G.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};function H(){}H.prototype=G.prototype;function I(a,b,e){this.props=a;this.context=b;this.refs=F;this.updater=e||E;}var J=I.prototype=new H;
	J.constructor=I;objectAssign(J,G.prototype);J.isPureReactComponent=!0;var K={current:null,currentDispatcher:null},L=Object.prototype.hasOwnProperty,M={key:!0,ref:!0,__self:!0,__source:!0};
	function N(a,b,e){
	var arguments$1 = arguments;
	var c=void 0,d={},g=null,h=null;if(null!=b){ for(c in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(g=""+b.key),b){ L.call(b,c)&&!M.hasOwnProperty(c)&&(d[c]=b[c]); } }var f=arguments.length-2;if(1===f){ d.children=e; }else if(1<f){for(var l=Array(f),m=0;m<f;m++){ l[m]=arguments$1[m+2]; }d.children=l;}if(a&&a.defaultProps){ for(c in f=a.defaultProps,f){ void 0===d[c]&&(d[c]=f[c]); } }return {$$typeof:p,type:a,key:g,ref:h,props:d,_owner:K.current}}
	function ba(a,b){return {$$typeof:p,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return "object"===typeof a&&null!==a&&a.$$typeof===p}function escape(a){var b={"=":"=0",":":"=2"};return "$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g,Q=[];function R(a,b,e,c){if(Q.length){var d=Q.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return {result:a,keyPrefix:b,func:e,context:c,count:0}}
	function S(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>Q.length&&Q.push(a);}
	function T(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d){ a=null; }var g=!1;if(null===a){ g=!0; }else { switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case p:case q:g=!0;}} }if(g){ return e(c,a,""===b?"."+U(a,0):b),1; }g=0;b=""===b?".":b+":";if(Array.isArray(a)){ for(var h=0;h<a.length;h++){d=a[h];var f=b+U(d,h);g+=T(d,f,e,c);} }else if(null===a||"object"!==typeof a?f=null:(f=C&&a[C]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f){ for(a=f.call(a),h=
	0;!(d=a.next()).done;){ d=d.value,f=b+U(d,h++),g+=T(d,f,e,c); } }else{ "object"===d&&(e=""+a,D("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,"")); }return g}function V(a,b,e){return null==a?0:T(a,"",b,e)}function U(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function ca(a,b){a.func.call(a.context,b,a.count++);}
	function da(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?W(a,c,e,function(a){return a}):null!=a&&(O(a)&&(a=ba(a,d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(P,"$&/")+"/")+e)),c.push(a));}function W(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(P,"$&/")+"/");b=R(b,g,c,d);V(a,da,b);S(b);}
	var X={Children:{map:function(a,b,e){if(null==a){ return a; }var c=[];W(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a){ return a; }b=R(null,null,b,e);V(a,ca,b);S(b);},count:function(a){return V(a,function(){return null},null)},toArray:function(a){var b=[];W(a,b,null,function(a){return a});return b},only:function(a){O(a)?void 0:D("143");return a}},createRef:function(){return {current:null}},Component:G,PureComponent:I,createContext:function(a,b){void 0===b&&(b=null);a={$$typeof:w,_calculateChangedBits:b,
	_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:v,_context:a};return a.Consumer=a},forwardRef:function(a){return {$$typeof:y,render:a}},lazy:function(a){return {$$typeof:B,_ctor:a,_status:-1,_result:null}},memo:function(a,b){return {$$typeof:A,type:a,compare:void 0===b?null:b}},Fragment:r,StrictMode:t,Suspense:z,createElement:N,cloneElement:function(a,b,e){
	var arguments$1 = arguments;
	null===a||void 0===a?D("267",a):void 0;var c=void 0,d=objectAssign({},a.props),g=a.key,h=a.ref,f=a._owner;
	if(null!=b){void 0!==b.ref&&(h=b.ref,f=K.current);void 0!==b.key&&(g=""+b.key);var l=void 0;a.type&&a.type.defaultProps&&(l=a.type.defaultProps);for(c in b){ L.call(b,c)&&!M.hasOwnProperty(c)&&(d[c]=void 0===b[c]&&void 0!==l?l[c]:b[c]); }}c=arguments.length-2;if(1===c){ d.children=e; }else if(1<c){l=Array(c);for(var m=0;m<c;m++){ l[m]=arguments$1[m+2]; }d.children=l;}return {$$typeof:p,type:a.type,key:g,ref:h,props:d,_owner:f}},createFactory:function(a){var b=N.bind(null,a);b.type=a;return b},isValidElement:O,version:"16.7.0",
	unstable_ConcurrentMode:x,unstable_Profiler:u,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:K,assign:objectAssign}},Y={default:X},Z=Y&&X||Y;var react_production_min=Z.default||Z;

	var react = createCommonjsModule(function (module) {

	{
	  module.exports = react_production_min;
	}
	});

	var scheduler_production_min = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports,"__esModule",{value:!0});var c=null,f=!1,h=3,k=-1,l=-1,m=!1,n=!1;function p(){if(!m){var a=c.expirationTime;n?q():n=!0;r(t,a);}}
	function u(){var a=c,b=c.next;if(c===b){ c=null; }else{var d=c.previous;c=d.next=b;b.previous=d;}a.next=a.previous=null;d=a.callback;b=a.expirationTime;a=a.priorityLevel;var e=h,Q=l;h=a;l=b;try{var g=d();}finally{h=e,l=Q;}if("function"===typeof g){ if(g={callback:g,priorityLevel:a,expirationTime:b,next:null,previous:null},null===c){ c=g.next=g.previous=g; }else{d=null;a=c;do{if(a.expirationTime>=b){d=a;break}a=a.next;}while(a!==c);null===d?d=c:d===c&&(c=g,p());b=d.previous;b.next=d.previous=g;g.next=d;g.previous=
	b;} }}function v(){if(-1===k&&null!==c&&1===c.priorityLevel){m=!0;try{do { u(); }while(null!==c&&1===c.priorityLevel)}finally{m=!1,null!==c?p():n=!1;}}}function t(a){m=!0;var b=f;f=a;try{if(a){ for(;null!==c;){var d=exports.unstable_now();if(c.expirationTime<=d){do { u(); }while(null!==c&&c.expirationTime<=d)}else { break }} }else if(null!==c){do { u(); }while(null!==c&&!w())}}finally{m=!1,f=b,null!==c?p():n=!1,v();}}
	var x=Date,y="function"===typeof setTimeout?setTimeout:void 0,z="function"===typeof clearTimeout?clearTimeout:void 0,A="function"===typeof requestAnimationFrame?requestAnimationFrame:void 0,B="function"===typeof cancelAnimationFrame?cancelAnimationFrame:void 0,C,D;function E(a){C=A(function(b){z(D);a(b);});D=y(function(){B(C);a(exports.unstable_now());},100);}
	if("object"===typeof performance&&"function"===typeof performance.now){var F=performance;exports.unstable_now=function(){return F.now()};}else { exports.unstable_now=function(){return x.now()}; }var r,q,w,G=null;"undefined"!==typeof window?G=window:"undefined"!==typeof commonjsGlobal&&(G=commonjsGlobal);
	if(G&&G._schedMock){var H=G._schedMock;r=H[0];q=H[1];w=H[2];exports.unstable_now=H[3];}else if("undefined"===typeof window||"function"!==typeof MessageChannel){var I=null,J=function(a){if(null!==I){ try{I(a);}finally{I=null;} }};r=function(a){null!==I?setTimeout(r,0,a):(I=a,setTimeout(J,0,!1));};q=function(){I=null;};w=function(){return !1};}else{"undefined"!==typeof console&&("function"!==typeof A&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"),
	"function"!==typeof B&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"));var K=null,L=!1,M=-1,N=!1,O=!1,P=0,R=33,S=33;w=function(){return P<=exports.unstable_now()};var T=new MessageChannel,U=T.port2;T.port1.onmessage=function(){L=!1;var a=K,b=M;K=null;M=-1;var d=exports.unstable_now(),e=!1;if(0>=P-d){ if(-1!==b&&b<=d){ e=!0; }else{N||(N=!0,E(V));K=a;M=b;return} }if(null!==a){O=!0;try{a(e);}finally{O=!1;}}};
	var V=function(a){if(null!==K){E(V);var b=a-P+S;b<S&&R<S?(8>b&&(b=8),S=b<R?R:b):R=b;P=a+S;L||(L=!0,U.postMessage(void 0));}else { N=!1; }};r=function(a,b){K=a;M=b;O||0>b?U.postMessage(void 0):N||(N=!0,E(V));};q=function(){K=null;L=!1;M=-1;};}exports.unstable_ImmediatePriority=1;exports.unstable_UserBlockingPriority=2;exports.unstable_NormalPriority=3;exports.unstable_IdlePriority=5;exports.unstable_LowPriority=4;
	exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3;}var d=h,e=k;h=a;k=exports.unstable_now();try{return b()}finally{h=d,k=e,v();}};
	exports.unstable_scheduleCallback=function(a,b){var d=-1!==k?k:exports.unstable_now();if("object"===typeof b&&null!==b&&"number"===typeof b.timeout){ b=d+b.timeout; }else { switch(h){case 1:b=d+-1;break;case 2:b=d+250;break;case 5:b=d+1073741823;break;case 4:b=d+1E4;break;default:b=d+5E3;} }a={callback:a,priorityLevel:h,expirationTime:b,next:null,previous:null};if(null===c){ c=a.next=a.previous=a,p(); }else{d=null;var e=c;do{if(e.expirationTime>b){d=e;break}e=e.next;}while(e!==c);null===d?d=c:d===c&&(c=a,p());
	b=d.previous;b.next=d.previous=a;a.next=d;a.previous=b;}return a};exports.unstable_cancelCallback=function(a){var b=a.next;if(null!==b){if(b===a){ c=null; }else{a===c&&(c=b);var d=a.previous;d.next=b;b.previous=d;}a.next=a.previous=null;}};exports.unstable_wrapCallback=function(a){var b=h;return function(){var d=h,e=k;h=b;k=exports.unstable_now();try{return a.apply(this,arguments)}finally{h=d,k=e,v();}}};exports.unstable_getCurrentPriorityLevel=function(){return h};
	exports.unstable_shouldYield=function(){return !f&&(null!==c&&c.expirationTime<l||w())};exports.unstable_continueExecution=function(){null!==c&&p();};exports.unstable_pauseExecution=function(){};exports.unstable_getFirstCallbackNode=function(){return c};
	});

	unwrapExports(scheduler_production_min);
	var scheduler_production_min_1 = scheduler_production_min.unstable_now;
	var scheduler_production_min_2 = scheduler_production_min.unstable_ImmediatePriority;
	var scheduler_production_min_3 = scheduler_production_min.unstable_UserBlockingPriority;
	var scheduler_production_min_4 = scheduler_production_min.unstable_NormalPriority;
	var scheduler_production_min_5 = scheduler_production_min.unstable_IdlePriority;
	var scheduler_production_min_6 = scheduler_production_min.unstable_LowPriority;
	var scheduler_production_min_7 = scheduler_production_min.unstable_runWithPriority;
	var scheduler_production_min_8 = scheduler_production_min.unstable_scheduleCallback;
	var scheduler_production_min_9 = scheduler_production_min.unstable_cancelCallback;
	var scheduler_production_min_10 = scheduler_production_min.unstable_wrapCallback;
	var scheduler_production_min_11 = scheduler_production_min.unstable_getCurrentPriorityLevel;
	var scheduler_production_min_12 = scheduler_production_min.unstable_shouldYield;
	var scheduler_production_min_13 = scheduler_production_min.unstable_continueExecution;
	var scheduler_production_min_14 = scheduler_production_min.unstable_pauseExecution;
	var scheduler_production_min_15 = scheduler_production_min.unstable_getFirstCallbackNode;

	var scheduler = createCommonjsModule(function (module) {

	{
	  module.exports = scheduler_production_min;
	}
	});

	function ca$1(a,b,c,d,e,f,g,h){if(!a){a=void 0;if(void 0===b){ a=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."); }else{var k=[c,d,e,f,g,h],l=0;a=Error(b.replace(/%s/g,function(){return k[l++]}));a.name="Invariant Violation";}a.framesToPop=1;throw a;}}
	function t$1(a){
	var arguments$1 = arguments;
	for(var b=arguments.length-1,c="https://reactjs.org/docs/error-decoder.html?invariant="+a,d=0;d<b;d++){ c+="&args[]="+encodeURIComponent(arguments$1[d+1]); }ca$1(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",c);}react?void 0:t$1("227");function da$1(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l);}catch(m){this.onError(m);}}
	var ea=!1,fa=null,ha=!1,ia=null,ja={onError:function(a){ea=!0;fa=a;}};function ka(a,b,c,d,e,f,g,h,k){ea=!1;fa=null;da$1.apply(ja,arguments);}function la(a,b,c,d,e,f,g,h,k){ka.apply(this,arguments);if(ea){if(ea){var l=fa;ea=!1;fa=null;}else { t$1("198"),l=void 0; }ha||(ha=!0,ia=l);}}var ma=null,na={};
	function oa(){if(ma){ for(var a in na){var b=na[a],c=ma.indexOf(a);-1<c?void 0:t$1("96",a);if(!pa[c]){b.extractEvents?void 0:t$1("97",a);pa[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;qa.hasOwnProperty(h)?t$1("99",h):void 0;qa[h]=f;var k=f.phasedRegistrationNames;if(k){for(e in k){ k.hasOwnProperty(e)&&ra(k[e],g,h); }e=!0;}else { f.registrationName?(ra(f.registrationName,g,h),e=!0):e=!1; }e?void 0:t$1("98",d,a);}}} }}
	function ra(a,b,c){sa[a]?t$1("100",a):void 0;sa[a]=b;ta[a]=b.eventTypes[c].dependencies;}var pa=[],qa={},sa={},ta={},ua=null,va=null,wa=null;function xa(a,b,c){var d=a.type||"unknown-event";a.currentTarget=wa(c);la(d,b,void 0,a);a.currentTarget=null;}function ya(a,b){null==b?t$1("30"):void 0;if(null==a){ return b; }if(Array.isArray(a)){if(Array.isArray(b)){ return a.push.apply(a,b),a; }a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}
	function za(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a);}var Aa=null;function Ba(a){if(a){var b=a._dispatchListeners,c=a._dispatchInstances;if(Array.isArray(b)){ for(var d=0;d<b.length&&!a.isPropagationStopped();d++){ xa(a,b[d],c[d]); } }else { b&&xa(a,b,c); }a._dispatchListeners=null;a._dispatchInstances=null;a.isPersistent()||a.constructor.release(a);}}
	var Ca={injectEventPluginOrder:function(a){ma?t$1("101"):void 0;ma=Array.prototype.slice.call(a);oa();},injectEventPluginsByName:function(a){var b=!1,c;for(c in a){ if(a.hasOwnProperty(c)){var d=a[c];na.hasOwnProperty(c)&&na[c]===d||(na[c]?t$1("102",c):void 0,na[c]=d,b=!0);} }b&&oa();}};
	function Da(a,b){var c=a.stateNode;if(!c){ return null; }var d=ua(c);if(!d){ return null; }c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1;}if(a){ return null; }c&&"function"!==typeof c?t$1("231",b,typeof c):void 0;
	return c}function Ea(a){null!==a&&(Aa=ya(Aa,a));a=Aa;Aa=null;if(a&&(za(a,Ba),Aa?t$1("95"):void 0,ha)){ throw a=ia,ha=!1,ia=null,a; }}var Fa=Math.random().toString(36).slice(2),Ga="__reactInternalInstance$"+Fa,Ha="__reactEventHandlers$"+Fa;function Ia(a){if(a[Ga]){ return a[Ga]; }for(;!a[Ga];){ if(a.parentNode){ a=a.parentNode; }else { return null; } }a=a[Ga];return 5===a.tag||6===a.tag?a:null}function Ja(a){a=a[Ga];return !a||5!==a.tag&&6!==a.tag?null:a}
	function Ka(a){if(5===a.tag||6===a.tag){ return a.stateNode; }t$1("33");}function La(a){return a[Ha]||null}function Ma(a){do { a=a.return; }while(a&&5!==a.tag);return a?a:null}function Na(a,b,c){if(b=Da(a,c.dispatchConfig.phasedRegistrationNames[b])){ c._dispatchListeners=ya(c._dispatchListeners,b),c._dispatchInstances=ya(c._dispatchInstances,a); }}
	function Oa(a){if(a&&a.dispatchConfig.phasedRegistrationNames){for(var b=a._targetInst,c=[];b;){ c.push(b),b=Ma(b); }for(b=c.length;0<b--;){ Na(c[b],"captured",a); }for(b=0;b<c.length;b++){ Na(c[b],"bubbled",a); }}}function Pa(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=Da(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=ya(c._dispatchListeners,b),c._dispatchInstances=ya(c._dispatchInstances,a));}function Qa(a){a&&a.dispatchConfig.registrationName&&Pa(a._targetInst,null,a);}
	function Ra(a){za(a,Oa);}var Sa=!("undefined"===typeof window||!window.document||!window.document.createElement);function Ta(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var Ua={animationend:Ta("Animation","AnimationEnd"),animationiteration:Ta("Animation","AnimationIteration"),animationstart:Ta("Animation","AnimationStart"),transitionend:Ta("Transition","TransitionEnd")},Va={},Wa={};
	Sa&&(Wa=document.createElement("div").style,"AnimationEvent"in window||(delete Ua.animationend.animation,delete Ua.animationiteration.animation,delete Ua.animationstart.animation),"TransitionEvent"in window||delete Ua.transitionend.transition);function Xa(a){if(Va[a]){ return Va[a]; }if(!Ua[a]){ return a; }var b=Ua[a],c;for(c in b){ if(b.hasOwnProperty(c)&&c in Wa){ return Va[a]=b[c]; } }return a}
	var Ya=Xa("animationend"),Za=Xa("animationiteration"),$a=Xa("animationstart"),ab=Xa("transitionend"),bb="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),cb=null,eb=null,fb=null;
	function gb(){if(fb){ return fb; }var a,b=eb,c=b.length,d,e="value"in cb?cb.value:cb.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++){ }var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++){ }return fb=e.slice(a,1<d?1-d:void 0)}function hb(){return !0}function ib(){return !1}
	function z$1(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a){ a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]); }this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?hb:ib;this.isPropagationStopped=ib;return this}
	objectAssign(z$1.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=hb);},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=hb);},persist:function(){this.isPersistent=hb;},isPersistent:ib,destructor:function(){var a=this.constructor.Interface,
	b;for(b in a){ this[b]=null; }this.nativeEvent=this._targetInst=this.dispatchConfig=null;this.isPropagationStopped=this.isDefaultPrevented=ib;this._dispatchInstances=this._dispatchListeners=null;}});z$1.Interface={type:null,target:null,currentTarget:function(){return null},eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
	z$1.extend=function(a){function b(){}function c(){return d.apply(this,arguments)}var d=this;b.prototype=d.prototype;var e=new b;objectAssign(e,c.prototype);c.prototype=e;c.prototype.constructor=c;c.Interface=objectAssign({},d.Interface,a);c.extend=d.extend;jb(c);return c};jb(z$1);function kb(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}function lb(a){a instanceof this?void 0:t$1("279");a.destructor();10>this.eventPool.length&&this.eventPool.push(a);}
	function jb(a){a.eventPool=[];a.getPooled=kb;a.release=lb;}var mb=z$1.extend({data:null}),nb=z$1.extend({data:null}),ob=[9,13,27,32],pb=Sa&&"CompositionEvent"in window,qb=null;Sa&&"documentMode"in document&&(qb=document.documentMode);
	var rb=Sa&&"TextEvent"in window&&!qb,sb=Sa&&(!pb||qb&&8<qb&&11>=qb),tb=String.fromCharCode(32),ub={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["compositionend","keypress","textInput","paste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"blur compositionend keydown keypress keyup mousedown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
	captured:"onCompositionStartCapture"},dependencies:"blur compositionstart keydown keypress keyup mousedown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"blur compositionupdate keydown keypress keyup mousedown".split(" ")}},vb=!1;
	function wb(a,b){switch(a){case "keyup":return -1!==ob.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "blur":return !0;default:return !1}}function xb(a){a=a.detail;return "object"===typeof a&&"data"in a?a.data:null}var yb=!1;function zb(a,b){switch(a){case "compositionend":return xb(b);case "keypress":if(32!==b.which){ return null; }vb=!0;return tb;case "textInput":return a=b.data,a===tb&&vb?null:a;default:return null}}
	function Ab(a,b){if(yb){ return "compositionend"===a||!pb&&wb(a,b)?(a=gb(),fb=eb=cb=null,yb=!1,a):null; }switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length){ return b.char; }if(b.which){ return String.fromCharCode(b.which) }}return null;case "compositionend":return sb&&"ko"!==b.locale?null:b.data;default:return null}}
	var Bb={eventTypes:ub,extractEvents:function(a,b,c,d){var e=void 0;var f=void 0;if(pb){ b:{switch(a){case "compositionstart":e=ub.compositionStart;break b;case "compositionend":e=ub.compositionEnd;break b;case "compositionupdate":e=ub.compositionUpdate;break b}e=void 0;} }else { yb?wb(a,c)&&(e=ub.compositionEnd):"keydown"===a&&229===c.keyCode&&(e=ub.compositionStart); }e?(sb&&"ko"!==c.locale&&(yb||e!==ub.compositionStart?e===ub.compositionEnd&&yb&&(f=gb()):(cb=d,eb="value"in cb?cb.value:cb.textContent,yb=
	!0)),e=mb.getPooled(e,b,c,d),f?e.data=f:(f=xb(c),null!==f&&(e.data=f)),Ra(e),f=e):f=null;(a=rb?zb(a,c):Ab(a,c))?(b=nb.getPooled(ub.beforeInput,b,c,d),b.data=a,Ra(b)):b=null;return null===f?b:null===b?f:[f,b]}},Cb=null,Db=null,Eb=null;function Hb(a){if(a=va(a)){"function"!==typeof Cb?t$1("280"):void 0;var b=ua(a.stateNode);Cb(a.stateNode,a.type,b);}}function Ib(a){Db?Eb?Eb.push(a):Eb=[a]:Db=a;}function Jb(){if(Db){var a=Db,b=Eb;Eb=Db=null;Hb(a);if(b){ for(a=0;a<b.length;a++){ Hb(b[a]); } }}}
	function Kb(a,b){return a(b)}function Lb(a,b,c){return a(b,c)}function Mb(){}var Nb=!1;function Ob(a,b){if(Nb){ return a(b); }Nb=!0;try{return Kb(a,b)}finally{if(Nb=!1,null!==Db||null!==Eb){ Mb(),Jb(); }}}var Pb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Qb(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return "input"===b?!!Pb[a.type]:"textarea"===b?!0:!1}
	function Rb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}function Sb(a){if(!Sa){ return !1; }a="on"+a;var b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function Tb(a){var b=a.type;return (a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
	function Ub(a){var b=Tb(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a);}});Object.defineProperty(a,b,{enumerable:c.enumerable});return {getValue:function(){return d},setValue:function(a){d=""+a;},stopTracking:function(){a._valueTracker=
	null;delete a[b];}}}}function Vb(a){a._valueTracker||(a._valueTracker=Ub(a));}function Wb(a){if(!a){ return !1; }var b=a._valueTracker;if(!b){ return !0; }var c=b.getValue();var d="";a&&(d=Tb(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}
	var Xb=react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Yb=/^(.*)[\\\/]/,D$1="function"===typeof Symbol&&Symbol.for,Zb=D$1?Symbol.for("react.element"):60103,$b=D$1?Symbol.for("react.portal"):60106,ac=D$1?Symbol.for("react.fragment"):60107,bc=D$1?Symbol.for("react.strict_mode"):60108,cc=D$1?Symbol.for("react.profiler"):60114,dc=D$1?Symbol.for("react.provider"):60109,ec=D$1?Symbol.for("react.context"):60110,fc=D$1?Symbol.for("react.concurrent_mode"):60111,gc=D$1?Symbol.for("react.forward_ref"):60112,hc=D$1?Symbol.for("react.suspense"):
	60113,ic=D$1?Symbol.for("react.memo"):60115,jc=D$1?Symbol.for("react.lazy"):60116,kc="function"===typeof Symbol&&Symbol.iterator;function lc(a){if(null===a||"object"!==typeof a){ return null; }a=kc&&a[kc]||a["@@iterator"];return "function"===typeof a?a:null}
	function mc(a){if(null==a){ return null; }if("function"===typeof a){ return a.displayName||a.name||null; }if("string"===typeof a){ return a; }switch(a){case fc:return "ConcurrentMode";case ac:return "Fragment";case $b:return "Portal";case cc:return "Profiler";case bc:return "StrictMode";case hc:return "Suspense"}if("object"===typeof a){ switch(a.$$typeof){case ec:return "Context.Consumer";case dc:return "Context.Provider";case gc:var b=a.render;b=b.displayName||b.name||"";return a.displayName||(""!==b?"ForwardRef("+b+
	")":"ForwardRef");case ic:return mc(a.type);case jc:if(a=1===a._status?a._result:null){ return mc(a) }} }return null}function nc(a){var b="";do{a:switch(a.tag){case 3:case 4:case 6:case 7:case 10:case 9:var c="";break a;default:var d=a._debugOwner,e=a._debugSource,f=mc(a.type);c=null;d&&(c=mc(d.type));d=f;f="";e?f=" (at "+e.fileName.replace(Yb,"")+":"+e.lineNumber+")":c&&(f=" (created by "+c+")");c="\n    in "+(d||"Unknown")+f;}b+=c;a=a.return;}while(a);return b}
	var oc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,pc=Object.prototype.hasOwnProperty,qc={},rc={};
	function sc(a){if(pc.call(rc,a)){ return !0; }if(pc.call(qc,a)){ return !1; }if(oc.test(a)){ return rc[a]=!0; }qc[a]=!0;return !1}function tc(a,b,c,d){if(null!==c&&0===c.type){ return !1; }switch(typeof b){case "function":case "symbol":return !0;case "boolean":if(d){ return !1; }if(null!==c){ return !c.acceptsBooleans; }a=a.toLowerCase().slice(0,5);return "data-"!==a&&"aria-"!==a;default:return !1}}
	function uc(a,b,c,d){if(null===b||"undefined"===typeof b||tc(a,b,c,d)){ return !0; }if(d){ return !1; }if(null!==c){ switch(c.type){case 3:return !b;case 4:return !1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b} }return !1}function E$1(a,b,c,d,e){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;}var F$1={};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){F$1[a]=new E$1(a,0,!1,a,null);});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];F$1[b]=new E$1(b,1,!1,a[1],null);});["contentEditable","draggable","spellCheck","value"].forEach(function(a){F$1[a]=new E$1(a,2,!1,a.toLowerCase(),null);});
	["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){F$1[a]=new E$1(a,2,!1,a,null);});"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){F$1[a]=new E$1(a,3,!1,a.toLowerCase(),null);});["checked","multiple","muted","selected"].forEach(function(a){F$1[a]=new E$1(a,3,!0,a,null);});
	["capture","download"].forEach(function(a){F$1[a]=new E$1(a,4,!1,a,null);});["cols","rows","size","span"].forEach(function(a){F$1[a]=new E$1(a,6,!1,a,null);});["rowSpan","start"].forEach(function(a){F$1[a]=new E$1(a,5,!1,a.toLowerCase(),null);});var vc=/[\-:]([a-z])/g;function wc(a){return a[1].toUpperCase()}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(vc,
	wc);F$1[b]=new E$1(b,1,!1,a,null);});"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(vc,wc);F$1[b]=new E$1(b,1,!1,a,"http://www.w3.org/1999/xlink");});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(vc,wc);F$1[b]=new E$1(b,1,!1,a,"http://www.w3.org/XML/1998/namespace");});F$1.tabIndex=new E$1("tabIndex",1,!1,"tabindex",null);
	function xc(a,b,c,d){var e=F$1.hasOwnProperty(b)?F$1[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(uc(b,c,e,d)&&(c=null),d||null===e?sc(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))));}
	function yc(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return ""}}function zc(a,b){var c=b.checked;return objectAssign({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}
	function Ac(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=yc(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value};}function Bc(a,b){b=b.checked;null!=b&&xc(a,"checked",b,!1);}
	function Cc(a,b){Bc(a,b);var c=yc(b.value),d=b.type;if(null!=c){ if("number"===d){if(0===c&&""===a.value||a.value!=c){ a.value=""+c; }}else { a.value!==""+c&&(a.value=""+c); } }else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?Dc(a,b.type,c):b.hasOwnProperty("defaultValue")&&Dc(a,b.type,yc(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked);}
	function Ec(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value)){ return; }b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b;}c=a.name;""!==c&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c);}
	function Dc(a,b,c){if("number"!==b||a.ownerDocument.activeElement!==a){ null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c); }}var Fc={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"blur change click focus input keydown keyup selectionchange".split(" ")}};function Gc(a,b,c){a=z$1.getPooled(Fc.change,a,b,c);a.type="change";Ib(c);Ra(a);return a}var Jc=null,Kc=null;function Lc(a){Ea(a);}
	function Mc(a){var b=Ka(a);if(Wb(b)){ return a }}function Nc(a,b){if("change"===a){ return b }}var Oc=!1;Sa&&(Oc=Sb("input")&&(!document.documentMode||9<document.documentMode));function Pc(){Jc&&(Jc.detachEvent("onpropertychange",Qc),Kc=Jc=null);}function Qc(a){"value"===a.propertyName&&Mc(Kc)&&(a=Gc(Kc,a,Rb(a)),Ob(Lc,a));}function Rc(a,b,c){"focus"===a?(Pc(),Jc=b,Kc=c,Jc.attachEvent("onpropertychange",Qc)):"blur"===a&&Pc();}function Sc(a){if("selectionchange"===a||"keyup"===a||"keydown"===a){ return Mc(Kc) }}
	function Tc(a,b){if("click"===a){ return Mc(b) }}function Uc(a,b){if("input"===a||"change"===a){ return Mc(b) }}
	var Vc={eventTypes:Fc,_isInputEventSupported:Oc,extractEvents:function(a,b,c,d){var e=b?Ka(b):window,f=void 0,g=void 0,h=e.nodeName&&e.nodeName.toLowerCase();"select"===h||"input"===h&&"file"===e.type?f=Nc:Qb(e)?Oc?f=Uc:(f=Sc,g=Rc):(h=e.nodeName)&&"input"===h.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)&&(f=Tc);if(f&&(f=f(a,b))){ return Gc(f,c,d); }g&&g(a,e,b);"blur"===a&&(a=e._wrapperState)&&a.controlled&&"number"===e.type&&Dc(e,"number",e.value);}},Wc=z$1.extend({view:null,detail:null}),Xc={Alt:"altKey",
	Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Yc(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Xc[a])?!!b[a]:!1}function Zc(){return Yc}
	var $c=0,ad=0,bd=!1,cd=!1,dd=Wc.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:Zc,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)},movementX:function(a){if("movementX"in a){ return a.movementX; }var b=$c;$c=a.screenX;return bd?"mousemove"===a.type?a.screenX-b:0:(bd=!0,0)},movementY:function(a){if("movementY"in a){ return a.movementY; }
	var b=ad;ad=a.screenY;return cd?"mousemove"===a.type?a.screenY-b:0:(cd=!0,0)}}),ed=dd.extend({pointerId:null,width:null,height:null,pressure:null,tangentialPressure:null,tiltX:null,tiltY:null,twist:null,pointerType:null,isPrimary:null}),fd={mouseEnter:{registrationName:"onMouseEnter",dependencies:["mouseout","mouseover"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["mouseout","mouseover"]},pointerEnter:{registrationName:"onPointerEnter",dependencies:["pointerout","pointerover"]},pointerLeave:{registrationName:"onPointerLeave",
	dependencies:["pointerout","pointerover"]}},gd={eventTypes:fd,extractEvents:function(a,b,c,d){var e="mouseover"===a||"pointerover"===a,f="mouseout"===a||"pointerout"===a;if(e&&(c.relatedTarget||c.fromElement)||!f&&!e){ return null; }e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||e.parentWindow:window;f?(f=b,b=(b=c.relatedTarget||c.toElement)?Ia(b):null):f=null;if(f===b){ return null; }var g=void 0,h=void 0,k=void 0,l=void 0;if("mouseout"===a||"mouseover"===a){ g=dd,h=fd.mouseLeave,k=fd.mouseEnter,l="mouse"; }
	else if("pointerout"===a||"pointerover"===a){ g=ed,h=fd.pointerLeave,k=fd.pointerEnter,l="pointer"; }var m=null==f?e:Ka(f);e=null==b?e:Ka(b);a=g.getPooled(h,f,c,d);a.type=l+"leave";a.target=m;a.relatedTarget=e;c=g.getPooled(k,b,c,d);c.type=l+"enter";c.target=e;c.relatedTarget=m;d=b;if(f&&d){ a:{b=f;e=d;l=0;for(g=b;g;g=Ma(g)){ l++; }g=0;for(k=e;k;k=Ma(k)){ g++; }for(;0<l-g;){ b=Ma(b),l--; }for(;0<g-l;){ e=Ma(e),g--; }for(;l--;){if(b===e||b===e.alternate){ break a; }b=Ma(b);e=Ma(e);}b=null;} }else { b=null; }e=b;for(b=[];f&&f!==e;){l=
	f.alternate;if(null!==l&&l===e){ break; }b.push(f);f=Ma(f);}for(f=[];d&&d!==e;){l=d.alternate;if(null!==l&&l===e){ break; }f.push(d);d=Ma(d);}for(d=0;d<b.length;d++){ Pa(b[d],"bubbled",a); }for(d=f.length;0<d--;){ Pa(f[d],"captured",c); }return [a,c]}},hd=Object.prototype.hasOwnProperty;function id(a,b){return a===b?0!==a||0!==b||1/a===1/b:a!==a&&b!==b}
	function jd(a,b){if(id(a,b)){ return !0; }if("object"!==typeof a||null===a||"object"!==typeof b||null===b){ return !1; }var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length){ return !1; }for(d=0;d<c.length;d++){ if(!hd.call(b,c[d])||!id(a[c[d]],b[c[d]])){ return !1; } }return !0}function kd(a){var b=a;if(a.alternate){ for(;b.return;){ b=b.return; } }else{if(0!==(b.effectTag&2)){ return 1; }for(;b.return;){ if(b=b.return,0!==(b.effectTag&2)){ return 1 } }}return 3===b.tag?2:3}function ld(a){2!==kd(a)?t$1("188"):void 0;}
	function md(a){var b=a.alternate;if(!b){ return b=kd(a),3===b?t$1("188"):void 0,1===b?null:a; }for(var c=a,d=b;;){var e=c.return,f=e?e.alternate:null;if(!e||!f){ break; }if(e.child===f.child){for(var g=e.child;g;){if(g===c){ return ld(e),a; }if(g===d){ return ld(e),b; }g=g.sibling;}t$1("188");}if(c.return!==d.return){ c=e,d=f; }else{g=!1;for(var h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling;}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling;}g?
	void 0:t$1("189");}}c.alternate!==d?t$1("190"):void 0;}3!==c.tag?t$1("188"):void 0;return c.stateNode.current===c?a:b}function nd(a){a=md(a);if(!a){ return null; }for(var b=a;;){if(5===b.tag||6===b.tag){ return b; }if(b.child){ b.child.return=b,b=b.child; }else{if(b===a){ break; }for(;!b.sibling;){if(!b.return||b.return===a){ return null; }b=b.return;}b.sibling.return=b.return;b=b.sibling;}}return null}
	var od=z$1.extend({animationName:null,elapsedTime:null,pseudoElement:null}),pd=z$1.extend({clipboardData:function(a){return "clipboardData"in a?a.clipboardData:window.clipboardData}}),qd=Wc.extend({relatedTarget:null});function rd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}
	var sd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},td={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
	116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ud=Wc.extend({key:function(a){if(a.key){var b=sd[a.key]||a.key;if("Unidentified"!==b){ return b }}return "keypress"===a.type?(a=rd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?td[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:Zc,charCode:function(a){return "keypress"===
	a.type?rd(a):0},keyCode:function(a){return "keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return "keypress"===a.type?rd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),vd=dd.extend({dataTransfer:null}),wd=Wc.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:Zc}),xd=z$1.extend({propertyName:null,elapsedTime:null,pseudoElement:null}),yd=dd.extend({deltaX:function(a){return "deltaX"in a?a.deltaX:"wheelDeltaX"in
	a?-a.wheelDeltaX:0},deltaY:function(a){return "deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null}),zd=[["abort","abort"],[Ya,"animationEnd"],[Za,"animationIteration"],[$a,"animationStart"],["canplay","canPlay"],["canplaythrough","canPlayThrough"],["drag","drag"],["dragenter","dragEnter"],["dragexit","dragExit"],["dragleave","dragLeave"],["dragover","dragOver"],["durationchange","durationChange"],["emptied","emptied"],["encrypted","encrypted"],
	["ended","ended"],["error","error"],["gotpointercapture","gotPointerCapture"],["load","load"],["loadeddata","loadedData"],["loadedmetadata","loadedMetadata"],["loadstart","loadStart"],["lostpointercapture","lostPointerCapture"],["mousemove","mouseMove"],["mouseout","mouseOut"],["mouseover","mouseOver"],["playing","playing"],["pointermove","pointerMove"],["pointerout","pointerOut"],["pointerover","pointerOver"],["progress","progress"],["scroll","scroll"],["seeking","seeking"],["stalled","stalled"],
	["suspend","suspend"],["timeupdate","timeUpdate"],["toggle","toggle"],["touchmove","touchMove"],[ab,"transitionEnd"],["waiting","waiting"],["wheel","wheel"]],Ad={},Bd={};function Cd(a,b){var c=a[0];a=a[1];var d="on"+(a[0].toUpperCase()+a.slice(1));b={phasedRegistrationNames:{bubbled:d,captured:d+"Capture"},dependencies:[c],isInteractive:b};Ad[a]=b;Bd[c]=b;}
	[["blur","blur"],["cancel","cancel"],["click","click"],["close","close"],["contextmenu","contextMenu"],["copy","copy"],["cut","cut"],["auxclick","auxClick"],["dblclick","doubleClick"],["dragend","dragEnd"],["dragstart","dragStart"],["drop","drop"],["focus","focus"],["input","input"],["invalid","invalid"],["keydown","keyDown"],["keypress","keyPress"],["keyup","keyUp"],["mousedown","mouseDown"],["mouseup","mouseUp"],["paste","paste"],["pause","pause"],["play","play"],["pointercancel","pointerCancel"],
	["pointerdown","pointerDown"],["pointerup","pointerUp"],["ratechange","rateChange"],["reset","reset"],["seeked","seeked"],["submit","submit"],["touchcancel","touchCancel"],["touchend","touchEnd"],["touchstart","touchStart"],["volumechange","volumeChange"]].forEach(function(a){Cd(a,!0);});zd.forEach(function(a){Cd(a,!1);});
	var Dd={eventTypes:Ad,isInteractiveTopLevelEventType:function(a){a=Bd[a];return void 0!==a&&!0===a.isInteractive},extractEvents:function(a,b,c,d){var e=Bd[a];if(!e){ return null; }switch(a){case "keypress":if(0===rd(c)){ return null; }case "keydown":case "keyup":a=ud;break;case "blur":case "focus":a=qd;break;case "click":if(2===c.button){ return null; }case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":a=dd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":a=
	vd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":a=wd;break;case Ya:case Za:case $a:a=od;break;case ab:a=xd;break;case "scroll":a=Wc;break;case "wheel":a=yd;break;case "copy":case "cut":case "paste":a=pd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":a=ed;break;default:a=z$1;}b=a.getPooled(e,b,c,d);Ra(b);return b}},Ed=Dd.isInteractiveTopLevelEventType,
	Fd=[];function Gd(a){var b=a.targetInst,c=b;do{if(!c){a.ancestors.push(c);break}var d;for(d=c;d.return;){ d=d.return; }d=3!==d.tag?null:d.stateNode.containerInfo;if(!d){ break; }a.ancestors.push(c);c=Ia(d);}while(c);for(c=0;c<a.ancestors.length;c++){b=a.ancestors[c];var e=Rb(a.nativeEvent);d=a.topLevelType;for(var f=a.nativeEvent,g=null,h=0;h<pa.length;h++){var k=pa[h];k&&(k=k.extractEvents(d,b,f,e))&&(g=ya(g,k));}Ea(g);}}var Hd=!0;
	function H$1(a,b){if(!b){ return null; }var c=(Ed(a)?Id:Jd).bind(null,a);b.addEventListener(a,c,!1);}function Kd(a,b){if(!b){ return null; }var c=(Ed(a)?Id:Jd).bind(null,a);b.addEventListener(a,c,!0);}function Id(a,b){Lb(Jd,a,b);}
	function Jd(a,b){if(Hd){var c=Rb(b);c=Ia(c);null===c||"number"!==typeof c.tag||2===kd(c)||(c=null);if(Fd.length){var d=Fd.pop();d.topLevelType=a;d.nativeEvent=b;d.targetInst=c;a=d;}else { a={topLevelType:a,nativeEvent:b,targetInst:c,ancestors:[]}; }try{Ob(Gd,a);}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,10>Fd.length&&Fd.push(a);}}}var Ld={},Md=0,Nd="_reactListenersID"+(""+Math.random()).slice(2);
	function Od(a){Object.prototype.hasOwnProperty.call(a,Nd)||(a[Nd]=Md++,Ld[a[Nd]]={});return Ld[a[Nd]]}function Pd(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a){ return null; }try{return a.activeElement||a.body}catch(b){return a.body}}function Qd(a){for(;a&&a.firstChild;){ a=a.firstChild; }return a}
	function Rd(a,b){var c=Qd(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b){ return {node:c,offset:b-a}; }a=d;}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode;}c=void 0;}c=Qd(c);}}function Sd(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Sd(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
	function Td(){for(var a=window,b=Pd();b instanceof a.HTMLIFrameElement;){try{a=b.contentDocument.defaultView;}catch(c){break}b=Pd(a.document);}return b}function Ud(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
	var Vd=Sa&&"documentMode"in document&&11>=document.documentMode,Wd={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")}},Xd=null,Yd=null,Zd=null,$d=!1;
	function ae(a,b){var c=b.window===b?b.document:9===b.nodeType?b:b.ownerDocument;if($d||null==Xd||Xd!==Pd(c)){ return null; }c=Xd;"selectionStart"in c&&Ud(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset});return Zd&&jd(Zd,c)?null:(Zd=c,a=z$1.getPooled(Wd.select,Yd,a,b),a.type="select",a.target=Xd,Ra(a),a)}
	var be={eventTypes:Wd,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:9===d.nodeType?d:d.ownerDocument,f;if(!(f=!e)){a:{e=Od(e);f=ta.onSelect;for(var g=0;g<f.length;g++){var h=f[g];if(!e.hasOwnProperty(h)||!e[h]){e=!1;break a}}e=!0;}f=!e;}if(f){ return null; }e=b?Ka(b):window;switch(a){case "focus":if(Qb(e)||"true"===e.contentEditable){ Xd=e,Yd=b,Zd=null; }break;case "blur":Zd=Yd=Xd=null;break;case "mousedown":$d=!0;break;case "contextmenu":case "mouseup":case "dragend":return $d=!1,ae(c,d);case "selectionchange":if(Vd){ break; }
	case "keydown":case "keyup":return ae(c,d)}return null}};Ca.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));ua=La;va=Ja;wa=Ka;Ca.injectEventPluginsByName({SimpleEventPlugin:Dd,EnterLeaveEventPlugin:gd,ChangeEventPlugin:Vc,SelectEventPlugin:be,BeforeInputEventPlugin:Bb});function de(a){var b="";react.Children.forEach(a,function(a){null!=a&&(b+=a);});return b}
	function ee(a,b){a=objectAssign({children:void 0},b);if(b=de(b.children)){ a.children=b; }return a}function fe(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++){ b["$"+c[e]]=!0; }for(c=0;c<a.length;c++){ e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0); }}else{c=""+yc(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e]);}null!==b&&(b.selected=!0);}}
	function ge(a,b){null!=b.dangerouslySetInnerHTML?t$1("91"):void 0;return objectAssign({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function he(a,b){var c=b.value;null==c&&(c=b.defaultValue,b=b.children,null!=b&&(null!=c?t$1("92"):void 0,Array.isArray(b)&&(1>=b.length?void 0:t$1("93"),b=b[0]),c=b),null==c&&(c=""));a._wrapperState={initialValue:yc(c)};}
	function ie(a,b){var c=yc(b.value),d=yc(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d);}function je(a){var b=a.textContent;b===a._wrapperState.initialValue&&(a.value=b);}var ke={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
	function le(a){switch(a){case "svg":return "http://www.w3.org/2000/svg";case "math":return "http://www.w3.org/1998/Math/MathML";default:return "http://www.w3.org/1999/xhtml"}}function me(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?le(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
	var ne=void 0,oe=function(a){return "undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)});}:a}(function(a,b){if(a.namespaceURI!==ke.svg||"innerHTML"in a){ a.innerHTML=b; }else{ne=ne||document.createElement("div");ne.innerHTML="<svg>"+b+"</svg>";for(b=ne.firstChild;a.firstChild;){ a.removeChild(a.firstChild); }for(;b.firstChild;){ a.appendChild(b.firstChild); }}});
	function pe(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b;}
	var qe={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,
	floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},re=["Webkit","ms","Moz","O"];Object.keys(qe).forEach(function(a){re.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);qe[b]=qe[a];});});function se(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||qe.hasOwnProperty(a)&&qe[a]?(""+b).trim():b+"px"}
	function te(a,b){a=a.style;for(var c in b){ if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=se(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e;} }}var ue=objectAssign({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
	function ve(a,b){b&&(ue[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML?t$1("137",a,""):void 0),null!=b.dangerouslySetInnerHTML&&(null!=b.children?t$1("60"):void 0,"object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML?void 0:t$1("61")),null!=b.style&&"object"!==typeof b.style?t$1("62",""):void 0);}
	function we(a,b){if(-1===a.indexOf("-")){ return "string"===typeof b.is; }switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return !1;default:return !0}}
	function xe(a,b){a=9===a.nodeType||11===a.nodeType?a:a.ownerDocument;var c=Od(a);b=ta[b];for(var d=0;d<b.length;d++){var e=b[d];if(!c.hasOwnProperty(e)||!c[e]){switch(e){case "scroll":Kd("scroll",a);break;case "focus":case "blur":Kd("focus",a);Kd("blur",a);c.blur=!0;c.focus=!0;break;case "cancel":case "close":Sb(e)&&Kd(e,a);break;case "invalid":case "submit":case "reset":break;default:-1===bb.indexOf(e)&&H$1(e,a);}c[e]=!0;}}}function ye(){}var ze=null,Ae=null;
	function Be(a,b){switch(a){case "button":case "input":case "select":case "textarea":return !!b.autoFocus}return !1}function Ce(a,b){return "textarea"===a||"option"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}var De="function"===typeof setTimeout?setTimeout:void 0,Ee="function"===typeof clearTimeout?clearTimeout:void 0;
	function Fe(a,b,c,d,e){a[Ha]=e;"input"===c&&"radio"===e.type&&null!=e.name&&Bc(a,e);we(c,d);d=we(c,e);for(var f=0;f<b.length;f+=2){var g=b[f],h=b[f+1];"style"===g?te(a,h):"dangerouslySetInnerHTML"===g?oe(a,h):"children"===g?pe(a,h):xc(a,g,h,d);}switch(c){case "input":Cc(a,e);break;case "textarea":ie(a,e);break;case "select":b=a._wrapperState.wasMultiple,a._wrapperState.wasMultiple=!!e.multiple,c=e.value,null!=c?fe(a,!!e.multiple,c,!1):b!==!!e.multiple&&(null!=e.defaultValue?fe(a,!!e.multiple,e.defaultValue,
	!0):fe(a,!!e.multiple,e.multiple?[]:"",!1));}}function Ge(a){for(a=a.nextSibling;a&&1!==a.nodeType&&3!==a.nodeType;){ a=a.nextSibling; }return a}function He(a){for(a=a.firstChild;a&&1!==a.nodeType&&3!==a.nodeType;){ a=a.nextSibling; }return a}var Ie=[],Je=-1;function I$1(a){0>Je||(a.current=Ie[Je],Ie[Je]=null,Je--);}function J$1(a,b){Je++;Ie[Je]=a.current;a.current=b;}var Ke={},K$1={current:Ke},L$1={current:!1},Le=Ke;
	function Me(a,b){var c=a.type.contextTypes;if(!c){ return Ke; }var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b){ return d.__reactInternalMemoizedMaskedChildContext; }var e={},f;for(f in c){ e[f]=b[f]; }d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function M$1(a){a=a.childContextTypes;return null!==a&&void 0!==a}function Ne(a){I$1(L$1,a);I$1(K$1,a);}function Oe(a){I$1(L$1,a);I$1(K$1,a);}
	function Pe(a,b,c){K$1.current!==Ke?t$1("168"):void 0;J$1(K$1,b,a);J$1(L$1,c,a);}function Qe(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext){ return c; }d=d.getChildContext();for(var e in d){ e in a?void 0:t$1("108",mc(b)||"Unknown",e); }return objectAssign({},c,d)}function Re(a){var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||Ke;Le=K$1.current;J$1(K$1,b,a);J$1(L$1,L$1.current,a);return !0}
	function Se(a,b,c){var d=a.stateNode;d?void 0:t$1("169");c?(b=Qe(a,b,Le),d.__reactInternalMemoizedMergedChildContext=b,I$1(L$1,a),I$1(K$1,a),J$1(K$1,b,a)):I$1(L$1,a);J$1(L$1,c,a);}var Te=null,Ue=null;function Ve(a){return function(b){try{return a(b)}catch(c){}}}
	function We(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){ return !1; }var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber){ return !0; }try{var c=b.inject(a);Te=Ve(function(a){return b.onCommitFiberRoot(c,a)});Ue=Ve(function(a){return b.onCommitFiberUnmount(c,a)});}catch(d){}return !0}
	function Xe(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.firstContextDependency=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childExpirationTime=this.expirationTime=0;this.alternate=null;}function N$1(a,b,c,d){return new Xe(a,b,c,d)}
	function Ye(a){a=a.prototype;return !(!a||!a.isReactComponent)}function Ze(a){if("function"===typeof a){ return Ye(a)?1:0; }if(void 0!==a&&null!==a){a=a.$$typeof;if(a===gc){ return 11; }if(a===ic){ return 14 }}return 2}
	function $e(a,b){var c=a.alternate;null===c?(c=N$1(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.effectTag=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childExpirationTime=a.childExpirationTime;c.expirationTime=a.expirationTime;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;c.firstContextDependency=a.firstContextDependency;c.sibling=a.sibling;
	c.index=a.index;c.ref=a.ref;return c}
	function af(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a){ Ye(a)&&(g=1); }else if("string"===typeof a){ g=5; }else { a:switch(a){case ac:return bf(c.children,e,f,b);case fc:return cf(c,e|3,f,b);case bc:return cf(c,e|2,f,b);case cc:return a=N$1(12,c,b,e|4),a.elementType=cc,a.type=cc,a.expirationTime=f,a;case hc:return a=N$1(13,c,b,e),a.elementType=hc,a.type=hc,a.expirationTime=f,a;default:if("object"===typeof a&&null!==a){ switch(a.$$typeof){case dc:g=10;break a;case ec:g=9;break a;case gc:g=11;break a;case ic:g=
	14;break a;case jc:g=16;d=null;break a} }t$1("130",null==a?a:typeof a,"");} }b=N$1(g,c,b,e);b.elementType=a;b.type=d;b.expirationTime=f;return b}function bf(a,b,c,d){a=N$1(7,a,d,b);a.expirationTime=c;return a}function cf(a,b,c,d){a=N$1(8,a,d,b);b=0===(b&1)?bc:fc;a.elementType=b;a.type=b;a.expirationTime=c;return a}function df(a,b,c){a=N$1(6,a,null,b);a.expirationTime=c;return a}
	function ef(a,b,c){b=N$1(4,null!==a.children?a.children:[],a.key,b);b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}function ff(a,b){a.didError=!1;var c=a.earliestPendingTime;0===c?a.earliestPendingTime=a.latestPendingTime=b:c<b?a.earliestPendingTime=b:a.latestPendingTime>b&&(a.latestPendingTime=b);gf(b,a);}
	function hf(a,b){a.didError=!1;a.latestPingedTime>=b&&(a.latestPingedTime=0);var c=a.earliestPendingTime,d=a.latestPendingTime;c===b?a.earliestPendingTime=d===b?a.latestPendingTime=0:d:d===b&&(a.latestPendingTime=c);c=a.earliestSuspendedTime;d=a.latestSuspendedTime;0===c?a.earliestSuspendedTime=a.latestSuspendedTime=b:c<b?a.earliestSuspendedTime=b:d>b&&(a.latestSuspendedTime=b);gf(b,a);}function jf(a,b){var c=a.earliestPendingTime;a=a.earliestSuspendedTime;c>b&&(b=c);a>b&&(b=a);return b}
	function gf(a,b){var c=b.earliestSuspendedTime,d=b.latestSuspendedTime,e=b.earliestPendingTime,f=b.latestPingedTime;e=0!==e?e:f;0===e&&(0===a||d<a)&&(e=d);a=e;0!==a&&c>a&&(a=c);b.nextExpirationTimeToWorkOn=e;b.expirationTime=a;}var kf=!1;function lf(a){return {baseState:a,firstUpdate:null,lastUpdate:null,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}
	function mf(a){return {baseState:a.baseState,firstUpdate:a.firstUpdate,lastUpdate:a.lastUpdate,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}function nf(a){return {expirationTime:a,tag:0,payload:null,callback:null,next:null,nextEffect:null}}function of(a,b){null===a.lastUpdate?a.firstUpdate=a.lastUpdate=b:(a.lastUpdate.next=b,a.lastUpdate=b);}
	function pf(a,b){var c=a.alternate;if(null===c){var d=a.updateQueue;var e=null;null===d&&(d=a.updateQueue=lf(a.memoizedState));}else { d=a.updateQueue,e=c.updateQueue,null===d?null===e?(d=a.updateQueue=lf(a.memoizedState),e=c.updateQueue=lf(c.memoizedState)):d=a.updateQueue=mf(e):null===e&&(e=c.updateQueue=mf(d)); }null===e||d===e?of(d,b):null===d.lastUpdate||null===e.lastUpdate?(of(d,b),of(e,b)):(of(d,b),e.lastUpdate=b);}
	function qf(a,b){var c=a.updateQueue;c=null===c?a.updateQueue=lf(a.memoizedState):rf(a,c);null===c.lastCapturedUpdate?c.firstCapturedUpdate=c.lastCapturedUpdate=b:(c.lastCapturedUpdate.next=b,c.lastCapturedUpdate=b);}function rf(a,b){var c=a.alternate;null!==c&&b===c.updateQueue&&(b=a.updateQueue=mf(b));return b}
	function sf(a,b,c,d,e,f){switch(c.tag){case 1:return a=c.payload,"function"===typeof a?a.call(f,d,e):a;case 3:a.effectTag=a.effectTag&-2049|64;case 0:a=c.payload;e="function"===typeof a?a.call(f,d,e):a;if(null===e||void 0===e){ break; }return objectAssign({},d,e);case 2:kf=!0;}return d}
	function tf(a,b,c,d,e){kf=!1;b=rf(a,b);for(var f=b.baseState,g=null,h=0,k=b.firstUpdate,l=f;null!==k;){var m=k.expirationTime;m<e?(null===g&&(g=k,f=l),h<m&&(h=m)):(l=sf(a,b,k,l,c,d),null!==k.callback&&(a.effectTag|=32,k.nextEffect=null,null===b.lastEffect?b.firstEffect=b.lastEffect=k:(b.lastEffect.nextEffect=k,b.lastEffect=k)));k=k.next;}m=null;for(k=b.firstCapturedUpdate;null!==k;){var r=k.expirationTime;r<e?(null===m&&(m=k,null===g&&(f=l)),h<r&&(h=r)):(l=sf(a,b,k,l,c,d),null!==k.callback&&(a.effectTag|=
	32,k.nextEffect=null,null===b.lastCapturedEffect?b.firstCapturedEffect=b.lastCapturedEffect=k:(b.lastCapturedEffect.nextEffect=k,b.lastCapturedEffect=k)));k=k.next;}null===g&&(b.lastUpdate=null);null===m?b.lastCapturedUpdate=null:a.effectTag|=32;null===g&&null===m&&(f=l);b.baseState=f;b.firstUpdate=g;b.firstCapturedUpdate=m;a.expirationTime=h;a.memoizedState=l;}
	function uf(a,b,c){null!==b.firstCapturedUpdate&&(null!==b.lastUpdate&&(b.lastUpdate.next=b.firstCapturedUpdate,b.lastUpdate=b.lastCapturedUpdate),b.firstCapturedUpdate=b.lastCapturedUpdate=null);vf(b.firstEffect,c);b.firstEffect=b.lastEffect=null;vf(b.firstCapturedEffect,c);b.firstCapturedEffect=b.lastCapturedEffect=null;}function vf(a,b){for(;null!==a;){var c=a.callback;if(null!==c){a.callback=null;var d=b;"function"!==typeof c?t$1("191",c):void 0;c.call(d);}a=a.nextEffect;}}
	function wf(a,b){return {value:a,source:b,stack:nc(b)}}var xf={current:null},yf=null,zf=null,Af=null;function Bf(a,b){var c=a.type._context;J$1(xf,c._currentValue,a);c._currentValue=b;}function Cf(a){var b=xf.current;I$1(xf,a);a.type._context._currentValue=b;}function Df(a){yf=a;Af=zf=null;a.firstContextDependency=null;}
	function Ef(a,b){if(Af!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b){ Af=a,b=1073741823; }b={context:a,observedBits:b,next:null};null===zf?(null===yf?t$1("293"):void 0,yf.firstContextDependency=zf=b):zf=zf.next=b;}return a._currentValue}var Ff={},O$1={current:Ff},Gf={current:Ff},Hf={current:Ff};function If(a){a===Ff?t$1("174"):void 0;return a}
	function Jf(a,b){J$1(Hf,b,a);J$1(Gf,a,a);J$1(O$1,Ff,a);var c=b.nodeType;switch(c){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:me(null,"");break;default:c=8===c?b.parentNode:b,b=c.namespaceURI||null,c=c.tagName,b=me(b,c);}I$1(O$1,a);J$1(O$1,b,a);}function Kf(a){I$1(O$1,a);I$1(Gf,a);I$1(Hf,a);}function Lf(a){If(Hf.current);var b=If(O$1.current);var c=me(b,a.type);b!==c&&(J$1(Gf,a,a),J$1(O$1,c,a));}function Mf(a){Gf.current===a&&(I$1(O$1,a),I$1(Gf,a));}
	function P$1(a,b){if(a&&a.defaultProps){b=objectAssign({},b);a=a.defaultProps;for(var c in a){ void 0===b[c]&&(b[c]=a[c]); }}return b}function Nf(a){var b=a._result;switch(a._status){case 1:return b;case 2:throw b;case 0:throw b;default:throw a._status=0,b=a._ctor,b=b(),b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b);},function(b){0===a._status&&(a._status=2,a._result=b);}),a._result=b,b;}}var Of=Xb.ReactCurrentOwner,Pf=(new react.Component).refs;
	function Qf(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:objectAssign({},b,c);a.memoizedState=c;d=a.updateQueue;null!==d&&0===a.expirationTime&&(d.baseState=c);}
	var Vf={isMounted:function(a){return (a=a._reactInternalFiber)?2===kd(a):!1},enqueueSetState:function(a,b,c){a=a._reactInternalFiber;var d=Rf();d=Sf(d,a);var e=nf(d);e.payload=b;void 0!==c&&null!==c&&(e.callback=c);pf(a,e);Uf(a,d);},enqueueReplaceState:function(a,b,c){a=a._reactInternalFiber;var d=Rf();d=Sf(d,a);var e=nf(d);e.tag=1;e.payload=b;void 0!==c&&null!==c&&(e.callback=c);pf(a,e);Uf(a,d);},enqueueForceUpdate:function(a,b){a=a._reactInternalFiber;var c=Rf();c=Sf(c,a);var d=nf(c);d.tag=
	2;void 0!==b&&null!==b&&(d.callback=b);pf(a,d);Uf(a,c);}};function Wf(a,b,c,d,e,f,g){a=a.stateNode;return "function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!jd(c,d)||!jd(e,f):!0}
	function Xf(a,b,c){var d=!1,e=Ke;var f=b.contextType;"object"===typeof f&&null!==f?f=Of.currentDispatcher.readContext(f):(e=M$1(b)?Le:K$1.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Me(a,e):Ke);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Vf;a.stateNode=b;b._reactInternalFiber=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
	function Zf(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Vf.enqueueReplaceState(b,b.state,null);}
	function $f(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=Pf;var f=b.contextType;"object"===typeof f&&null!==f?e.context=Of.currentDispatcher.readContext(f):(f=M$1(b)?Le:K$1.current,e.context=Me(a,f));f=a.updateQueue;null!==f&&(tf(a,f,c,e,d),e.state=a.memoizedState);f=b.getDerivedStateFromProps;"function"===typeof f&&(Qf(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&
	"function"!==typeof e.componentWillMount||(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Vf.enqueueReplaceState(e,e.state,null),f=a.updateQueue,null!==f&&(tf(a,f,c,e,d),e.state=a.memoizedState));"function"===typeof e.componentDidMount&&(a.effectTag|=4);}var ag=Array.isArray;
	function bg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;var d=void 0;c&&(1!==c.tag?t$1("289"):void 0,d=c.stateNode);d?void 0:t$1("147",a);var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e){ return b.ref; }b=function(a){var b=d.refs;b===Pf&&(b=d.refs={});null===a?delete b[e]:b[e]=a;};b._stringRef=e;return b}"string"!==typeof a?t$1("284"):void 0;c._owner?void 0:t$1("290",a);}return a}
	function cg(a,b){"textarea"!==a.type&&t$1("31","[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,"");}
	function dg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8;}}function c(c,d){if(!a){ return null; }for(;null!==d;){ b(c,d),d=d.sibling; }return null}function d(a,b){for(a=new Map;null!==b;){ null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling; }return a}function e(a,b,c){a=$e(a,b,c);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a){ return c; }d=b.alternate;if(null!==d){ return d=d.index,d<c?(b.effectTag=
	2,c):d; }b.effectTag=2;return c}function g(b){a&&null===b.alternate&&(b.effectTag=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag){ return b=df(c,a.mode,d),b.return=a,b; }b=e(b,c,d);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.elementType===c.type){ return d=e(b,c.props,d),d.ref=bg(a,b,c),d.return=a,d; }d=af(c.type,c.key,c.props,null,a.mode,d);d.ref=bg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==
	c.implementation){ return b=ef(c,a.mode,d),b.return=a,b; }b=e(b,c.children||[],d);b.return=a;return b}function m(a,b,c,d,g){if(null===b||7!==b.tag){ return b=bf(c,a.mode,d,g),b.return=a,b; }b=e(b,c,d);b.return=a;return b}function r(a,b,c){if("string"===typeof b||"number"===typeof b){ return b=df(""+b,a.mode,c),b.return=a,b; }if("object"===typeof b&&null!==b){switch(b.$$typeof){case Zb:return c=af(b.type,b.key,b.props,null,a.mode,c),c.ref=bg(a,null,b),c.return=a,c;case $b:return b=ef(b,a.mode,c),b.return=a,b}if(ag(b)||
	lc(b)){ return b=bf(b,a.mode,c,null),b.return=a,b; }cg(a,b);}return null}function w(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c){ return null!==e?null:h(a,b,""+c,d); }if("object"===typeof c&&null!==c){switch(c.$$typeof){case Zb:return c.key===e?c.type===ac?m(a,b,c.props.children,d,e):k(a,b,c,d):null;case $b:return c.key===e?l(a,b,c,d):null}if(ag(c)||lc(c)){ return null!==e?null:m(a,b,c,d,null); }cg(a,c);}return null}function y(a,b,c,d,e){if("string"===typeof d||"number"===typeof d){ return a=
	a.get(c)||null,h(b,a,""+d,e); }if("object"===typeof d&&null!==d){switch(d.$$typeof){case Zb:return a=a.get(null===d.key?c:d.key)||null,d.type===ac?m(b,a,d.props.children,e,d.key):k(b,a,d,e);case $b:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e)}if(ag(d)||lc(d)){ return a=a.get(c)||null,m(b,a,d,e,null); }cg(b,d);}return null}function B(e,g,h,k){for(var l=null,q=null,m=g,u=g=0,p=null;null!==m&&u<h.length;u++){m.index>u?(p=m,m=null):p=m.sibling;var v=w(e,m,h[u],k);if(null===v){null===m&&(m=p);break}a&&
	m&&null===v.alternate&&b(e,m);g=f(v,g,u);null===q?l=v:q.sibling=v;q=v;m=p;}if(u===h.length){ return c(e,m),l; }if(null===m){for(;u<h.length;u++){ if(m=r(e,h[u],k)){ g=f(m,g,u),null===q?l=m:q.sibling=m,q=m; } }return l}for(m=d(e,m);u<h.length;u++){ if(p=y(m,e,u,h[u],k)){ a&&null!==p.alternate&&m.delete(null===p.key?u:p.key),g=f(p,g,u),null===q?l=p:q.sibling=p,q=p; } }a&&m.forEach(function(a){return b(e,a)});return l}function R(e,g,h,k){var l=lc(h);"function"!==typeof l?t$1("150"):void 0;h=l.call(h);null==h?t$1("151"):void 0;
	for(var m=l=null,q=g,u=g=0,p=null,v=h.next();null!==q&&!v.done;u++,v=h.next()){q.index>u?(p=q,q=null):p=q.sibling;var A=w(e,q,v.value,k);if(null===A){q||(q=p);break}a&&q&&null===A.alternate&&b(e,q);g=f(A,g,u);null===m?l=A:m.sibling=A;m=A;q=p;}if(v.done){ return c(e,q),l; }if(null===q){for(;!v.done;u++,v=h.next()){ v=r(e,v.value,k),null!==v&&(g=f(v,g,u),null===m?l=v:m.sibling=v,m=v); }return l}for(q=d(e,q);!v.done;u++,v=h.next()){ v=y(q,e,u,v.value,k),null!==v&&(a&&null!==v.alternate&&q.delete(null===v.key?u:
	v.key),g=f(v,g,u),null===m?l=v:m.sibling=v,m=v); }a&&q.forEach(function(a){return b(e,a)});return l}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ac&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l){ switch(f.$$typeof){case Zb:a:{l=f.key;for(k=d;null!==k;){if(k.key===l){ if(7===k.tag?f.type===ac:k.elementType===f.type){c(a,k.sibling);d=e(k,f.type===ac?f.props.children:f.props,h);d.ref=bg(a,k,f);d.return=a;a=d;break a}else{c(a,k);break} }else { b(a,k); }k=
	k.sibling;}f.type===ac?(d=bf(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=af(f.type,f.key,f.props,null,a.mode,h),h.ref=bg(a,d,f),h.return=a,a=h);}return g(a);case $b:a:{for(k=f.key;null!==d;){if(d.key===k){ if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[],h);d.return=a;a=d;break a}else{c(a,d);break} }else { b(a,d); }d=d.sibling;}d=ef(f,a.mode,h);d.return=a;a=d;}return g(a)} }if("string"===typeof f||"number"===typeof f){ return f=
	""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f,h),d.return=a,a=d):(c(a,d),d=df(f,a.mode,h),d.return=a,a=d),g(a); }if(ag(f)){ return B(a,d,f,h); }if(lc(f)){ return R(a,d,f,h); }l&&cg(a,f);if("undefined"===typeof f&&!k){ switch(a.tag){case 1:case 0:h=a.type,t$1("152",h.displayName||h.name||"Component");} }return c(a,d)}}var eg=dg(!0),fg=dg(!1),gg=null,hg=null,ig=!1;
	function jg(a,b){var c=N$1(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c;}function kg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;default:return !1}}
	function lg(a){if(ig){var b=hg;if(b){var c=b;if(!kg(a,b)){b=Ge(c);if(!b||!kg(a,b)){a.effectTag|=2;ig=!1;gg=a;return}jg(gg,c);}gg=a;hg=He(b);}else { a.effectTag|=2,ig=!1,gg=a; }}}function mg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag;){ a=a.return; }gg=a;}function ng(a){if(a!==gg){ return !1; }if(!ig){ return mg(a),ig=!0,!1; }var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!Ce(b,a.memoizedProps)){ for(b=hg;b;){ jg(a,b),b=Ge(b); } }mg(a);hg=gg?Ge(a.stateNode):null;return !0}function og(){hg=gg=null;ig=!1;}var pg=Xb.ReactCurrentOwner;
	function Q$1(a,b,c,d){b.child=null===a?fg(b,null,c,d):eg(b,a.child,c,d);}function qg(a,b,c,d,e){c=c.render;var f=b.ref;Df(b,e);d=c(d,f);b.effectTag|=1;Q$1(a,b,d,e);return b.child}
	function rg(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!Ye(g)&&void 0===g.defaultProps&&null===c.compare&&void 0===c.defaultProps){ return b.tag=15,b.type=g,sg(a,b,g,d,e,f); }a=af(c.type,null,d,null,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(e<f&&(e=g.memoizedProps,c=c.compare,c=null!==c?c:jd,c(e,d)&&a.ref===b.ref)){ return tg(a,b,f); }b.effectTag|=1;a=$e(g,d,f);a.ref=b.ref;a.return=b;return b.child=a}
	function sg(a,b,c,d,e,f){return null!==a&&e<f&&jd(a.memoizedProps,d)&&a.ref===b.ref?tg(a,b,f):ug(a,b,c,d,f)}function vg(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c){ b.effectTag|=128; }}function ug(a,b,c,d,e){var f=M$1(c)?Le:K$1.current;f=Me(b,f);Df(b,e);c=c(d,f);b.effectTag|=1;Q$1(a,b,c,e);return b.child}
	function wg(a,b,c,d,e){if(M$1(c)){var f=!0;Re(b);}else { f=!1; }Df(b,e);if(null===b.stateNode){ null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2),Xf(b,c,d,e),$f(b,c,d,e),d=!0; }else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=Of.currentDispatcher.readContext(l):(l=M$1(c)?Le:K$1.current,l=Me(b,l));var m=c.getDerivedStateFromProps,r="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;r||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&
	"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Zf(b,g,d,l);kf=!1;var w=b.memoizedState;k=g.state=w;var y=b.updateQueue;null!==y&&(tf(b,y,d,g,e),k=b.memoizedState);h!==d||w!==k||L$1.current||kf?("function"===typeof m&&(Qf(b,c,m,d),k=b.memoizedState),(h=kf||Wf(b,c,h,d,w,k,l))?(r||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&
	g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.effectTag|=4)):("function"===typeof g.componentDidMount&&(b.effectTag|=4),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.effectTag|=4),d=!1);}else { g=b.stateNode,h=b.memoizedProps,g.props=b.type===b.elementType?h:P$1(b.type,h),k=g.context,l=c.contextType,"object"===typeof l&&null!==l?l=Of.currentDispatcher.readContext(l):(l=M$1(c)?Le:K$1.current,l=Me(b,l)),m=c.getDerivedStateFromProps,
	(r="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Zf(b,g,d,l),kf=!1,k=b.memoizedState,w=g.state=k,y=b.updateQueue,null!==y&&(tf(b,y,d,g,e),w=b.memoizedState),h!==d||k!==w||L$1.current||kf?("function"===typeof m&&(Qf(b,c,m,d),w=b.memoizedState),(m=kf||Wf(b,c,h,d,k,w,l))?(r||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||
	("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,w,l),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,w,l)),"function"===typeof g.componentDidUpdate&&(b.effectTag|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.effectTag|=256)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=256),b.memoizedProps=
	d,b.memoizedState=w),g.props=d,g.state=w,g.context=l,d=m):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=256),d=!1); }return xg(a,b,c,d,f,e)}
	function xg(a,b,c,d,e,f){vg(a,b);var g=0!==(b.effectTag&64);if(!d&&!g){ return e&&Se(b,c,!1),tg(a,b,f); }d=b.stateNode;pg.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.effectTag|=1;null!==a&&g?(b.child=eg(b,a.child,null,f),b.child=eg(b,null,h,f)):Q$1(a,b,h,f);b.memoizedState=d.state;e&&Se(b,c,!0);return b.child}function yg(a){var b=a.stateNode;b.pendingContext?Pe(a,b.pendingContext,b.pendingContext!==b.context):b.context&&Pe(a,b.context,!1);Jf(a,b.containerInfo);}
	function zg(a,b,c){var d=b.mode,e=b.pendingProps,f=b.memoizedState;if(0===(b.effectTag&64)){f=null;var g=!1;}else { f={timedOutAt:null!==f?f.timedOutAt:0},g=!0,b.effectTag&=-65; }if(null===a){ if(g){var h=e.fallback;a=bf(null,d,0,null);0===(b.mode&1)&&(a.child=null!==b.memoizedState?b.child.child:b.child);d=bf(h,d,c,null);a.sibling=d;c=a;c.return=d.return=b;}else { c=d=fg(b,null,e.children,c); } }else { null!==a.memoizedState?(d=a.child,h=d.sibling,g?(c=e.fallback,e=$e(d,d.pendingProps,0),0===(b.mode&1)&&(g=null!==
	b.memoizedState?b.child.child:b.child,g!==d.child&&(e.child=g)),d=e.sibling=$e(h,c,h.expirationTime),c=e,e.childExpirationTime=0,c.return=d.return=b):c=d=eg(b,d.child,e.children,c)):(h=a.child,g?(g=e.fallback,e=bf(null,d,0,null),e.child=h,0===(b.mode&1)&&(e.child=null!==b.memoizedState?b.child.child:b.child),d=e.sibling=bf(g,d,c,null),d.effectTag|=2,c=e,e.childExpirationTime=0,c.return=d.return=b):d=c=eg(b,h,e.children,c)),b.stateNode=a.stateNode; }b.memoizedState=f;b.child=c;return d}
	function tg(a,b,c){null!==a&&(b.firstContextDependency=a.firstContextDependency);if(b.childExpirationTime<c){ return null; }null!==a&&b.child!==a.child?t$1("153"):void 0;if(null!==b.child){a=b.child;c=$e(a,a.pendingProps,a.expirationTime);b.child=c;for(c.return=b;null!==a.sibling;){ a=a.sibling,c=c.sibling=$e(a,a.pendingProps,a.expirationTime),c.return=b; }c.sibling=null;}return b.child}
	function Ag(a,b,c){var d=b.expirationTime;if(null!==a&&a.memoizedProps===b.pendingProps&&!L$1.current&&d<c){switch(b.tag){case 3:yg(b);og();break;case 5:Lf(b);break;case 1:M$1(b.type)&&Re(b);break;case 4:Jf(b,b.stateNode.containerInfo);break;case 10:Bf(b,b.memoizedProps.value);break;case 13:if(null!==b.memoizedState){d=b.child.childExpirationTime;if(0!==d&&d>=c){ return zg(a,b,c); }b=tg(a,b,c);return null!==b?b.sibling:null}}return tg(a,b,c)}b.expirationTime=0;switch(b.tag){case 2:d=b.elementType;null!==
	a&&(a.alternate=null,b.alternate=null,b.effectTag|=2);a=b.pendingProps;var e=Me(b,K$1.current);Df(b,c);e=d(a,e);b.effectTag|=1;if("object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof){b.tag=1;if(M$1(d)){var f=!0;Re(b);}else { f=!1; }b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;var g=d.getDerivedStateFromProps;"function"===typeof g&&Qf(b,d,g,a);e.updater=Vf;b.stateNode=e;e._reactInternalFiber=b;$f(b,d,a,c);b=xg(null,b,d,!0,f,c);}else { b.tag=0,Q$1(null,b,e,c),b=b.child; }
	return b;case 16:e=b.elementType;null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2);f=b.pendingProps;a=Nf(e);b.type=a;e=b.tag=Ze(a);f=P$1(a,f);g=void 0;switch(e){case 0:g=ug(null,b,a,f,c);break;case 1:g=wg(null,b,a,f,c);break;case 11:g=qg(null,b,a,f,c);break;case 14:g=rg(null,b,a,P$1(a.type,f),d,c);break;default:t$1("306",a,"");}return g;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:P$1(d,e),ug(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:P$1(d,e),wg(a,b,
	d,e,c);case 3:yg(b);d=b.updateQueue;null===d?t$1("282"):void 0;e=b.memoizedState;e=null!==e?e.element:null;tf(b,d,b.pendingProps,null,c);d=b.memoizedState.element;if(d===e){ og(),b=tg(a,b,c); }else{e=b.stateNode;if(e=(null===a||null===a.child)&&e.hydrate){ hg=He(b.stateNode.containerInfo),gg=b,e=ig=!0; }e?(b.effectTag|=2,b.child=fg(b,null,d,c)):(Q$1(a,b,d,c),og());b=b.child;}return b;case 5:return Lf(b),null===a&&lg(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Ce(d,e)?g=null:null!==
	f&&Ce(d,f)&&(b.effectTag|=16),vg(a,b),1!==c&&b.mode&1&&e.hidden?(b.expirationTime=1,b=null):(Q$1(a,b,g,c),b=b.child),b;case 6:return null===a&&lg(b),null;case 13:return zg(a,b,c);case 4:return Jf(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=eg(b,null,d,c):Q$1(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:P$1(d,e),qg(a,b,d,e,c);case 7:return Q$1(a,b,b.pendingProps,c),b.child;case 8:return Q$1(a,b,b.pendingProps.children,c),b.child;case 12:return Q$1(a,b,b.pendingProps.children,
	c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;g=b.memoizedProps;f=e.value;Bf(b,f);if(null!==g){var h=g.value;f=h===f&&(0!==h||1/h===1/f)||h!==h&&f!==f?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,f):1073741823)|0;if(0===f){if(g.children===e.children&&!L$1.current){b=tg(a,b,c);break a}}else { for(g=b.child,null!==g&&(g.return=b);null!==g;){h=g.firstContextDependency;if(null!==h){do{if(h.context===d&&0!==(h.observedBits&f)){if(1===g.tag){var k=nf(c);k.tag=2;pf(g,k);}g.expirationTime<
	c&&(g.expirationTime=c);k=g.alternate;null!==k&&k.expirationTime<c&&(k.expirationTime=c);for(var l=g.return;null!==l;){k=l.alternate;if(l.childExpirationTime<c){ l.childExpirationTime=c,null!==k&&k.childExpirationTime<c&&(k.childExpirationTime=c); }else if(null!==k&&k.childExpirationTime<c){ k.childExpirationTime=c; }else { break; }l=l.return;}}k=g.child;h=h.next;}while(null!==h)}else { k=10===g.tag?g.type===b.type?null:g.child:g.child; }if(null!==k){ k.return=g; }else { for(k=g;null!==k;){if(k===b){k=null;break}g=k.sibling;
	if(null!==g){g.return=k.return;k=g;break}k=k.return;} }g=k;} }}Q$1(a,b,e.children,c);b=b.child;}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,Df(b,c),e=Ef(e,f.unstable_observedBits),d=d(e),b.effectTag|=1,Q$1(a,b,d,c),b.child;case 14:return e=b.type,f=P$1(e,b.pendingProps),f=P$1(e.type,f),rg(a,b,e,f,d,c);case 15:return sg(a,b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:P$1(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2),b.tag=1,M$1(d)?(a=
	!0,Re(b)):a=!1,Df(b,c),Xf(b,d,e,c),$f(b,d,e,c),xg(null,b,d,!0,a,c);default:t$1("156");}}function Bg(a){a.effectTag|=4;}var Cg=void 0,Gg=void 0,Hg=void 0,Ig=void 0;Cg=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag){ a.appendChild(c.stateNode); }else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b){ break; }for(;null===c.sibling;){if(null===c.return||c.return===b){ return; }c=c.return;}c.sibling.return=c.return;c=c.sibling;}};Gg=function(){};
	Hg=function(a,b,c,d,e){var f=a.memoizedProps;if(f!==d){var g=b.stateNode;If(O$1.current);a=null;switch(c){case "input":f=zc(g,f);d=zc(g,d);a=[];break;case "option":f=ee(g,f);d=ee(g,d);a=[];break;case "select":f=objectAssign({},f,{value:void 0});d=objectAssign({},d,{value:void 0});a=[];break;case "textarea":f=ge(g,f);d=ge(g,d);a=[];break;default:"function"!==typeof f.onClick&&"function"===typeof d.onClick&&(g.onclick=ye);}ve(c,d);g=c=void 0;var h=null;for(c in f){ if(!d.hasOwnProperty(c)&&f.hasOwnProperty(c)&&null!=f[c]){ if("style"===
	c){var k=f[c];for(g in k){ k.hasOwnProperty(g)&&(h||(h={}),h[g]=""); }}else{ "dangerouslySetInnerHTML"!==c&&"children"!==c&&"suppressContentEditableWarning"!==c&&"suppressHydrationWarning"!==c&&"autoFocus"!==c&&(sa.hasOwnProperty(c)?a||(a=[]):(a=a||[]).push(c,null)); } } }for(c in d){var l=d[c];k=null!=f?f[c]:void 0;if(d.hasOwnProperty(c)&&l!==k&&(null!=l||null!=k)){ if("style"===c){ if(k){for(g in k){ !k.hasOwnProperty(g)||l&&l.hasOwnProperty(g)||(h||(h={}),h[g]=""); }for(g in l){ l.hasOwnProperty(g)&&k[g]!==l[g]&&(h||
	(h={}),h[g]=l[g]); }}else { h||(a||(a=[]),a.push(c,h)),h=l; } }else{ "dangerouslySetInnerHTML"===c?(l=l?l.__html:void 0,k=k?k.__html:void 0,null!=l&&k!==l&&(a=a||[]).push(c,""+l)):"children"===c?k===l||"string"!==typeof l&&"number"!==typeof l||(a=a||[]).push(c,""+l):"suppressContentEditableWarning"!==c&&"suppressHydrationWarning"!==c&&(sa.hasOwnProperty(c)?(null!=l&&xe(e,c),a||k===l||(a=[])):(a=a||[]).push(c,l)); } }}h&&(a=a||[]).push("style",h);e=a;(b.updateQueue=e)&&Bg(b);}};Ig=function(a,b,c,d){c!==d&&Bg(b);};
	var Jg="function"===typeof WeakSet?WeakSet:Set;function Kg(a,b){var c=b.source,d=b.stack;null===d&&null!==c&&(d=nc(c));null!==c&&mc(c.type);b=b.value;null!==a&&1===a.tag&&mc(a.type);try{console.error(b);}catch(e){setTimeout(function(){throw e;});}}function Lg(a){var b=a.ref;if(null!==b){ if("function"===typeof b){ try{b(null);}catch(c){Mg(a,c);} }else { b.current=null; } }}
	function Ng(a,b){for(var c=a;;){if(5===c.tag){var d=c.stateNode;if(b){ d.style.display="none"; }else{d=c.stateNode;var e=c.memoizedProps.style;e=void 0!==e&&null!==e&&e.hasOwnProperty("display")?e.display:null;d.style.display=se("display",e);}}else if(6===c.tag){ c.stateNode.nodeValue=b?"":c.memoizedProps; }else if(13===c.tag&&null!==c.memoizedState){d=c.child.sibling;d.return=c;c=d;continue}else if(null!==c.child){c.child.return=c;c=c.child;continue}if(c===a){ break; }for(;null===c.sibling;){if(null===c.return||
	c.return===a){ return; }c=c.return;}c.sibling.return=c.return;c=c.sibling;}}
	function Og(a){"function"===typeof Ue&&Ue(a);switch(a.tag){case 0:case 11:case 14:case 15:var b=a.updateQueue;if(null!==b&&(b=b.lastEffect,null!==b)){var c=b=b.next;do{var d=c.destroy;if(null!==d){var e=a;try{d();}catch(f){Mg(e,f);}}c=c.next;}while(c!==b)}break;case 1:Lg(a);b=a.stateNode;if("function"===typeof b.componentWillUnmount){ try{b.props=a.memoizedProps,b.state=a.memoizedState,b.componentWillUnmount();}catch(f){Mg(a,f);} }break;case 5:Lg(a);break;case 4:Pg(a);}}
	function Qg(a){return 5===a.tag||3===a.tag||4===a.tag}
	function Rg(a){a:{for(var b=a.return;null!==b;){if(Qg(b)){var c=b;break a}b=b.return;}t$1("160");c=void 0;}var d=b=void 0;switch(c.tag){case 5:b=c.stateNode;d=!1;break;case 3:b=c.stateNode.containerInfo;d=!0;break;case 4:b=c.stateNode.containerInfo;d=!0;break;default:t$1("161");}c.effectTag&16&&(pe(b,""),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||Qg(c.return)){c=null;break a}c=c.return;}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag;){if(c.effectTag&2){ continue b; }
	if(null===c.child||4===c.tag){ continue b; }else { c.child.return=c,c=c.child; }}if(!(c.effectTag&2)){c=c.stateNode;break a}}for(var e=a;;){if(5===e.tag||6===e.tag){ if(c){ if(d){var f=b,g=e.stateNode,h=c;8===f.nodeType?f.parentNode.insertBefore(g,h):f.insertBefore(g,h);}else { b.insertBefore(e.stateNode,c); } }else { d?(g=b,h=e.stateNode,8===g.nodeType?(f=g.parentNode,f.insertBefore(h,g)):(f=g,f.appendChild(h)),g=g._reactRootContainer,null!==g&&void 0!==g||null!==f.onclick||(f.onclick=ye)):b.appendChild(e.stateNode); } }
	else if(4!==e.tag&&null!==e.child){e.child.return=e;e=e.child;continue}if(e===a){ break; }for(;null===e.sibling;){if(null===e.return||e.return===a){ return; }e=e.return;}e.sibling.return=e.return;e=e.sibling;}}
	function Pg(a){for(var b=a,c=!1,d=void 0,e=void 0;;){if(!c){c=b.return;a:for(;;){null===c?t$1("160"):void 0;switch(c.tag){case 5:d=c.stateNode;e=!1;break a;case 3:d=c.stateNode.containerInfo;e=!0;break a;case 4:d=c.stateNode.containerInfo;e=!0;break a}c=c.return;}c=!0;}if(5===b.tag||6===b.tag){a:for(var f=b,g=f;;){ if(Og(g),null!==g.child&&4!==g.tag){ g.child.return=g,g=g.child; }else{if(g===f){ break; }for(;null===g.sibling;){if(null===g.return||g.return===f){ break a; }g=g.return;}g.sibling.return=g.return;g=g.sibling;} }e?
	(f=d,g=b.stateNode,8===f.nodeType?f.parentNode.removeChild(g):f.removeChild(g)):d.removeChild(b.stateNode);}else if(4===b.tag?(d=b.stateNode.containerInfo,e=!0):Og(b),null!==b.child){b.child.return=b;b=b.child;continue}if(b===a){ break; }for(;null===b.sibling;){if(null===b.return||b.return===a){ return; }b=b.return;4===b.tag&&(c=!1);}b.sibling.return=b.return;b=b.sibling;}}
	function Sg(a,b){switch(b.tag){case 0:case 11:case 14:case 15:break;case 1:break;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&Fe(c,f,e,a,d,b);}break;case 6:null===b.stateNode?t$1("162"):void 0;b.stateNode.nodeValue=b.memoizedProps;break;case 3:break;case 12:break;case 13:c=b.memoizedState;d=void 0;a=b;null===c?d=!1:(d=!0,a=b.child,0===c.timedOutAt&&(c.timedOutAt=Rf()));null!==a&&Ng(a,d);c=b.updateQueue;
	if(null!==c){b.updateQueue=null;var g=b.stateNode;null===g&&(g=b.stateNode=new Jg);c.forEach(function(a){var c=Tg.bind(null,b,a);g.has(a)||(g.add(a),a.then(c,c));});}break;case 17:break;default:t$1("163");}}var Ug="function"===typeof WeakMap?WeakMap:Map;function Vg(a,b,c){c=nf(c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Wg(d);Kg(a,b);};return c}
	function Xg(a,b,c){c=nf(c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===Yg?Yg=new Set([this]):Yg.add(this));var c=b.value,e=b.stack;Kg(a,b);this.componentDidCatch(c,{componentStack:null!==e?e:""});});return c}
	function Zg(a){switch(a.tag){case 1:M$1(a.type)&&Ne(a);var b=a.effectTag;return b&2048?(a.effectTag=b&-2049|64,a):null;case 3:return Kf(a),Oe(a),b=a.effectTag,0!==(b&64)?t$1("285"):void 0,a.effectTag=b&-2049|64,a;case 5:return Mf(a),null;case 13:return b=a.effectTag,b&2048?(a.effectTag=b&-2049|64,a):null;case 4:return Kf(a),null;case 10:return Cf(a),null;default:return null}}
	var $g={readContext:Ef},ah=Xb.ReactCurrentOwner,bh=1073741822,ch=0,dh=!1,S$1=null,T$1=null,U$1=0,eh=-1,fh=!1,V$1=null,gh=!1,Yg=null;function jh(){if(null!==S$1){ for(var a=S$1.return;null!==a;){var b=a;switch(b.tag){case 1:var c=b.type.childContextTypes;null!==c&&void 0!==c&&Ne(b);break;case 3:Kf(b);Oe(b);break;case 5:Mf(b);break;case 4:Kf(b);break;case 10:Cf(b);}a=a.return;} }T$1=null;U$1=0;eh=-1;fh=!1;S$1=null;}function kh(a){for(;;){var b=a.alternate,c=a.return,d=a.sibling;if(0===(a.effectTag&1024)){S$1=a;a:{var e=b;b=a;var f=U$1;var g=b.pendingProps;switch(b.tag){case 2:break;case 16:break;case 15:case 0:break;case 1:M$1(b.type)&&Ne(b);break;case 3:Kf(b);Oe(b);g=b.stateNode;g.pendingContext&&(g.context=g.pendingContext,g.pendingContext=null);if(null===e||null===e.child){ ng(b),b.effectTag&=-3; }Gg(b);break;case 5:Mf(b);var h=If(Hf.current);f=b.type;if(null!==e&&null!=b.stateNode){ Hg(e,b,f,g,h),e.ref!==b.ref&&(b.effectTag|=
	128); }else if(g){var k=If(O$1.current);if(ng(b)){g=b;e=g.stateNode;var l=g.type,m=g.memoizedProps,r=h;e[Ga]=g;e[Ha]=m;f=void 0;h=l;switch(h){case "iframe":case "object":H$1("load",e);break;case "video":case "audio":for(l=0;l<bb.length;l++){ H$1(bb[l],e); }break;case "source":H$1("error",e);break;case "img":case "image":case "link":H$1("error",e);H$1("load",e);break;case "form":H$1("reset",e);H$1("submit",e);break;case "details":H$1("toggle",e);break;case "input":Ac(e,m);H$1("invalid",e);xe(r,"onChange");break;case "select":e._wrapperState=
	{wasMultiple:!!m.multiple};H$1("invalid",e);xe(r,"onChange");break;case "textarea":he(e,m),H$1("invalid",e),xe(r,"onChange");}ve(h,m);l=null;for(f in m){ m.hasOwnProperty(f)&&(k=m[f],"children"===f?"string"===typeof k?e.textContent!==k&&(l=["children",k]):"number"===typeof k&&e.textContent!==""+k&&(l=["children",""+k]):sa.hasOwnProperty(f)&&null!=k&&xe(r,f)); }switch(h){case "input":Vb(e);Ec(e,m,!0);break;case "textarea":Vb(e);je(e,m);break;case "select":case "option":break;default:"function"===typeof m.onClick&&
	(e.onclick=ye);}f=l;g.updateQueue=f;g=null!==f?!0:!1;g&&Bg(b);}else{m=b;e=f;r=g;l=9===h.nodeType?h:h.ownerDocument;k===ke.html&&(k=le(e));k===ke.html?"script"===e?(e=l.createElement("div"),e.innerHTML="<script>\x3c/script>",l=e.removeChild(e.firstChild)):"string"===typeof r.is?l=l.createElement(e,{is:r.is}):(l=l.createElement(e),"select"===e&&r.multiple&&(l.multiple=!0)):l=l.createElementNS(k,e);e=l;e[Ga]=m;e[Ha]=g;Cg(e,b,!1,!1);r=e;l=f;m=g;var w=h,y=we(l,m);switch(l){case "iframe":case "object":H$1("load",
	r);h=m;break;case "video":case "audio":for(h=0;h<bb.length;h++){ H$1(bb[h],r); }h=m;break;case "source":H$1("error",r);h=m;break;case "img":case "image":case "link":H$1("error",r);H$1("load",r);h=m;break;case "form":H$1("reset",r);H$1("submit",r);h=m;break;case "details":H$1("toggle",r);h=m;break;case "input":Ac(r,m);h=zc(r,m);H$1("invalid",r);xe(w,"onChange");break;case "option":h=ee(r,m);break;case "select":r._wrapperState={wasMultiple:!!m.multiple};h=objectAssign({},m,{value:void 0});H$1("invalid",r);xe(w,"onChange");break;case "textarea":he(r,
	m);h=ge(r,m);H$1("invalid",r);xe(w,"onChange");break;default:h=m;}ve(l,h);k=void 0;var B=l,R=r,v=h;for(k in v){ if(v.hasOwnProperty(k)){var q=v[k];"style"===k?te(R,q):"dangerouslySetInnerHTML"===k?(q=q?q.__html:void 0,null!=q&&oe(R,q)):"children"===k?"string"===typeof q?("textarea"!==B||""!==q)&&pe(R,q):"number"===typeof q&&pe(R,""+q):"suppressContentEditableWarning"!==k&&"suppressHydrationWarning"!==k&&"autoFocus"!==k&&(sa.hasOwnProperty(k)?null!=q&&xe(w,k):null!=q&&xc(R,k,q,y));} }switch(l){case "input":Vb(r);
	Ec(r,m,!1);break;case "textarea":Vb(r);je(r,m);break;case "option":null!=m.value&&r.setAttribute("value",""+yc(m.value));break;case "select":h=r;h.multiple=!!m.multiple;r=m.value;null!=r?fe(h,!!m.multiple,r,!1):null!=m.defaultValue&&fe(h,!!m.multiple,m.defaultValue,!0);break;default:"function"===typeof h.onClick&&(r.onclick=ye);}(g=Be(f,g))&&Bg(b);b.stateNode=e;}null!==b.ref&&(b.effectTag|=128);}else { null===b.stateNode?t$1("166"):void 0; }break;case 6:e&&null!=b.stateNode?Ig(e,b,e.memoizedProps,g):("string"!==
	typeof g&&(null===b.stateNode?t$1("166"):void 0),e=If(Hf.current),If(O$1.current),ng(b)?(g=b,f=g.stateNode,e=g.memoizedProps,f[Ga]=g,(g=f.nodeValue!==e)&&Bg(b)):(f=b,g=(9===e.nodeType?e:e.ownerDocument).createTextNode(g),g[Ga]=b,f.stateNode=g));break;case 11:break;case 13:g=b.memoizedState;if(0!==(b.effectTag&64)){b.expirationTime=f;S$1=b;break a}g=null!==g;f=null!==e&&null!==e.memoizedState;null!==e&&!g&&f&&(e=e.child.sibling,null!==e&&(h=b.firstEffect,null!==h?(b.firstEffect=e,e.nextEffect=h):(b.firstEffect=
	b.lastEffect=e,e.nextEffect=null),e.effectTag=8));if(g!==f||0===(b.effectTag&1)&&g){ b.effectTag|=4; }break;case 7:break;case 8:break;case 12:break;case 4:Kf(b);Gg(b);break;case 10:Cf(b);break;case 9:break;case 14:break;case 17:M$1(b.type)&&Ne(b);break;default:t$1("156");}S$1=null;}b=a;if(1===U$1||1!==b.childExpirationTime){g=0;for(f=b.child;null!==f;){ e=f.expirationTime,h=f.childExpirationTime,e>g&&(g=e),h>g&&(g=h),f=f.sibling; }b.childExpirationTime=g;}if(null!==S$1){ return S$1; }null!==c&&0===(c.effectTag&1024)&&(null===
	c.firstEffect&&(c.firstEffect=a.firstEffect),null!==a.lastEffect&&(null!==c.lastEffect&&(c.lastEffect.nextEffect=a.firstEffect),c.lastEffect=a.lastEffect),1<a.effectTag&&(null!==c.lastEffect?c.lastEffect.nextEffect=a:c.firstEffect=a,c.lastEffect=a));}else{a=Zg(a,U$1);if(null!==a){ return a.effectTag&=1023,a; }null!==c&&(c.firstEffect=c.lastEffect=null,c.effectTag|=1024);}if(null!==d){ return d; }if(null!==c){ a=c; }else { break }}return null}
	function lh(a){var b=Ag(a.alternate,a,U$1);a.memoizedProps=a.pendingProps;null===b&&(b=kh(a));ah.current=null;return b}
	function mh(a,b){dh?t$1("243"):void 0;dh=!0;ah.currentDispatcher=$g;var c=a.nextExpirationTimeToWorkOn;if(c!==U$1||a!==T$1||null===S$1){ jh(),T$1=a,U$1=c,S$1=$e(T$1.current,null,U$1),a.pendingCommitExpirationTime=0; }var d=!1;do{try{if(b){ for(;null!==S$1&&!nh();){ S$1=lh(S$1); } }else { for(;null!==S$1;){ S$1=lh(S$1); } }}catch(B){if(Af=zf=yf=null,null===S$1){ d=!0,Wg(B); }else{null===S$1?t$1("271"):void 0;var e=S$1,f=e.return;if(null===f){ d=!0,Wg(B); }else{a:{var g=a,h=f,k=e,l=B;f=U$1;k.effectTag|=1024;k.firstEffect=k.lastEffect=null;if(null!==l&&"object"===
	typeof l&&"function"===typeof l.then){var m=l;l=h;var r=-1,w=-1;do{if(13===l.tag){var y=l.alternate;if(null!==y&&(y=y.memoizedState,null!==y)){w=10*(1073741822-y.timedOutAt);break}y=l.pendingProps.maxDuration;if("number"===typeof y){ if(0>=y){ r=0; }else if(-1===r||y<r){ r=y; } }}l=l.return;}while(null!==l);l=h;do{if(y=13===l.tag){ y=void 0===l.memoizedProps.fallback?!1:null===l.memoizedState; }if(y){h=l.updateQueue;null===h?l.updateQueue=new Set([m]):h.add(m);if(0===(l.mode&1)){l.effectTag|=64;k.effectTag&=-1957;
	1===k.tag&&(null===k.alternate?k.tag=17:(f=nf(1073741823),f.tag=2,pf(k,f)));k.expirationTime=1073741823;break a}k=g.pingCache;null===k?(k=g.pingCache=new Ug,h=new Set,k.set(m,h)):(h=k.get(m),void 0===h&&(h=new Set,k.set(m,h)));h.has(f)||(h.add(f),k=oh.bind(null,g,m,f),m.then(k,k));-1===r?g=1073741823:(-1===w&&(w=10*(1073741822-jf(g,f))-5E3),g=w+r);0<=g&&eh<g&&(eh=g);l.effectTag|=2048;l.expirationTime=f;break a}l=l.return;}while(null!==l);l=Error((mc(k.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display."+
	nc(k));}fh=!0;l=wf(l,k);g=h;do{switch(g.tag){case 3:g.effectTag|=2048;g.expirationTime=f;f=Vg(g,l,f);qf(g,f);break a;case 1:if(m=l,r=g.type,w=g.stateNode,0===(g.effectTag&64)&&("function"===typeof r.getDerivedStateFromError||null!==w&&"function"===typeof w.componentDidCatch&&(null===Yg||!Yg.has(w)))){g.effectTag|=2048;g.expirationTime=f;f=Xg(g,m,f);qf(g,f);break a}}g=g.return;}while(null!==g)}S$1=kh(e);continue}}}break}while(1);dh=!1;Af=zf=yf=ah.currentDispatcher=null;if(d){ T$1=null,a.finishedWork=null; }
	else if(null!==S$1){ a.finishedWork=null; }else{d=a.current.alternate;null===d?t$1("281"):void 0;T$1=null;if(fh){e=a.latestPendingTime;f=a.latestSuspendedTime;g=a.latestPingedTime;if(0!==e&&e<c||0!==f&&f<c||0!==g&&g<c){hf(a,c);ph(a,d,c,a.expirationTime,-1);return}if(!a.didError&&b){a.didError=!0;c=a.nextExpirationTimeToWorkOn=c;b=a.expirationTime=1073741823;ph(a,d,c,b,-1);return}}b&&-1!==eh?(hf(a,c),b=10*(1073741822-jf(a,c)),b<eh&&(eh=b),b=10*(1073741822-Rf()),b=eh-b,ph(a,d,c,a.expirationTime,0>b?0:b)):(a.pendingCommitExpirationTime=
	c,a.finishedWork=d);}}function Mg(a,b){for(var c=a.return;null!==c;){switch(c.tag){case 1:var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Yg||!Yg.has(d))){a=wf(b,a);a=Xg(c,a,1073741823);pf(c,a);Uf(c,1073741823);return}break;case 3:a=wf(b,a);a=Vg(c,a,1073741823);pf(c,a);Uf(c,1073741823);return}c=c.return;}3===a.tag&&(c=wf(b,a),c=Vg(a,c,1073741823),pf(a,c),Uf(a,1073741823));}
	function Sf(a,b){0!==ch?a=ch:dh?a=gh?1073741823:U$1:b.mode&1?(a=qh?1073741822-10*(((1073741822-a+15)/10|0)+1):1073741822-25*(((1073741822-a+500)/25|0)+1),null!==T$1&&a===U$1&&--a):a=1073741823;qh&&(0===rh||a<rh)&&(rh=a);return a}function oh(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);if(null!==T$1&&U$1===c){ T$1=null; }else if(b=a.earliestSuspendedTime,d=a.latestSuspendedTime,0!==b&&c<=b&&c>=d){a.didError=!1;b=a.latestPingedTime;if(0===b||b>c){ a.latestPingedTime=c; }gf(c,a);c=a.expirationTime;0!==c&&sh(a,c);}}
	function Tg(a,b){var c=a.stateNode;null!==c&&c.delete(b);b=Rf();b=Sf(b,a);a=th(a,b);null!==a&&(ff(a,b),b=a.expirationTime,0!==b&&sh(a,b));}
	function th(a,b){a.expirationTime<b&&(a.expirationTime=b);var c=a.alternate;null!==c&&c.expirationTime<b&&(c.expirationTime=b);var d=a.return,e=null;if(null===d&&3===a.tag){ e=a.stateNode; }else { for(;null!==d;){c=d.alternate;d.childExpirationTime<b&&(d.childExpirationTime=b);null!==c&&c.childExpirationTime<b&&(c.childExpirationTime=b);if(null===d.return&&3===d.tag){e=d.stateNode;break}d=d.return;} }return e}
	function Uf(a,b){a=th(a,b);null!==a&&(!dh&&0!==U$1&&b>U$1&&jh(),ff(a,b),dh&&!gh&&T$1===a||sh(a,a.expirationTime),uh>vh&&(uh=0,t$1("185")));}function wh(a,b,c,d,e){var f=ch;ch=1073741823;try{return a(b,c,d,e)}finally{ch=f;}}var xh=null,W$1=null,yh=0,zh=void 0,X$1=!1,Ah=null,Y$1=0,rh=0,Bh=!1,Ch=null,Z$1=!1,Dh=!1,qh=!1,Eh=null,Fh=scheduler.unstable_now(),Gh=1073741822-(Fh/10|0),Hh=Gh,vh=50,uh=0,Ih=null;function Jh(){Gh=1073741822-((scheduler.unstable_now()-Fh)/10|0);}
	function Kh(a,b){if(0!==yh){if(b<yh){ return; }null!==zh&&scheduler.unstable_cancelCallback(zh);}yh=b;a=scheduler.unstable_now()-Fh;zh=scheduler.unstable_scheduleCallback(Lh,{timeout:10*(1073741822-b)-a});}function ph(a,b,c,d,e){a.expirationTime=d;0!==e||nh()?0<e&&(a.timeoutHandle=De(Mh.bind(null,a,b,c),e)):(a.pendingCommitExpirationTime=c,a.finishedWork=b);}function Mh(a,b,c){a.pendingCommitExpirationTime=c;a.finishedWork=b;Jh();Hh=Gh;Nh(a,c);}function Rf(){if(X$1){ return Hh; }Oh();if(0===Y$1||1===Y$1){ Jh(),Hh=Gh; }return Hh}
	function sh(a,b){null===a.nextScheduledRoot?(a.expirationTime=b,null===W$1?(xh=W$1=a,a.nextScheduledRoot=a):(W$1=W$1.nextScheduledRoot=a,W$1.nextScheduledRoot=xh)):b>a.expirationTime&&(a.expirationTime=b);X$1||(Z$1?Dh&&(Ah=a,Y$1=1073741823,Ph(a,1073741823,!1)):1073741823===b?Qh(1073741823,!1):Kh(a,b));}
	function Oh(){var a=0,b=null;if(null!==W$1){ for(var c=W$1,d=xh;null!==d;){var e=d.expirationTime;if(0===e){null===c||null===W$1?t$1("244"):void 0;if(d===d.nextScheduledRoot){xh=W$1=d.nextScheduledRoot=null;break}else if(d===xh){ xh=e=d.nextScheduledRoot,W$1.nextScheduledRoot=e,d.nextScheduledRoot=null; }else if(d===W$1){W$1=c;W$1.nextScheduledRoot=xh;d.nextScheduledRoot=null;break}else { c.nextScheduledRoot=d.nextScheduledRoot,d.nextScheduledRoot=null; }d=c.nextScheduledRoot;}else{e>a&&(a=e,b=d);if(d===W$1){ break; }if(1073741823===
	a){ break; }c=d;d=d.nextScheduledRoot;}} }Ah=b;Y$1=a;}var Rh=!1;function nh(){return Rh?!0:scheduler.unstable_shouldYield()?Rh=!0:!1}function Lh(){try{if(!nh()&&null!==xh){Jh();var a=xh;do{var b=a.expirationTime;0!==b&&Gh<=b&&(a.nextExpirationTimeToWorkOn=Gh);a=a.nextScheduledRoot;}while(a!==xh)}Qh(0,!0);}finally{Rh=!1;}}
	function Qh(a,b){Oh();if(b){ for(Jh(),Hh=Gh;null!==Ah&&0!==Y$1&&a<=Y$1&&!(Rh&&Gh>Y$1);){ Ph(Ah,Y$1,Gh>Y$1),Oh(),Jh(),Hh=Gh; } }else { for(;null!==Ah&&0!==Y$1&&a<=Y$1;){ Ph(Ah,Y$1,!1),Oh(); } }b&&(yh=0,zh=null);0!==Y$1&&Kh(Ah,Y$1);uh=0;Ih=null;if(null!==Eh){ for(a=Eh,Eh=null,b=0;b<a.length;b++){var c=a[b];try{c._onComplete();}catch(d){Bh||(Bh=!0,Ch=d);}} }if(Bh){ throw a=Ch,Ch=null,Bh=!1,a; }}function Nh(a,b){X$1?t$1("253"):void 0;Ah=a;Y$1=b;Ph(a,b,!1);Qh(1073741823,!1);}
	function Ph(a,b,c){X$1?t$1("245"):void 0;X$1=!0;if(c){var d=a.finishedWork;null!==d?Sh(a,d,b):(a.finishedWork=null,d=a.timeoutHandle,-1!==d&&(a.timeoutHandle=-1,Ee(d)),mh(a,c),d=a.finishedWork,null!==d&&(nh()?a.finishedWork=d:Sh(a,d,b)));}else { d=a.finishedWork,null!==d?Sh(a,d,b):(a.finishedWork=null,d=a.timeoutHandle,-1!==d&&(a.timeoutHandle=-1,Ee(d)),mh(a,c),d=a.finishedWork,null!==d&&Sh(a,d,b)); }X$1=!1;}
	function Sh(a,b,c){var d=a.firstBatch;if(null!==d&&d._expirationTime>=c&&(null===Eh?Eh=[d]:Eh.push(d),d._defer)){a.finishedWork=b;a.expirationTime=0;return}a.finishedWork=null;a===Ih?uh++:(Ih=a,uh=0);gh=dh=!0;a.current===b?t$1("177"):void 0;c=a.pendingCommitExpirationTime;0===c?t$1("261"):void 0;a.pendingCommitExpirationTime=0;d=b.expirationTime;var e=b.childExpirationTime;d=e>d?e:d;a.didError=!1;0===d?(a.earliestPendingTime=0,a.latestPendingTime=0,a.earliestSuspendedTime=0,a.latestSuspendedTime=0,a.latestPingedTime=
	0):(d<a.latestPingedTime&&(a.latestPingedTime=0),e=a.latestPendingTime,0!==e&&(e>d?a.earliestPendingTime=a.latestPendingTime=0:a.earliestPendingTime>d&&(a.earliestPendingTime=a.latestPendingTime)),e=a.earliestSuspendedTime,0===e?ff(a,d):d<a.latestSuspendedTime?(a.earliestSuspendedTime=0,a.latestSuspendedTime=0,a.latestPingedTime=0,ff(a,d)):d>e&&ff(a,d));gf(0,a);ah.current=null;1<b.effectTag?null!==b.lastEffect?(b.lastEffect.nextEffect=b,d=b.firstEffect):d=b:d=b.firstEffect;ze=Hd;e=Td();if(Ud(e)){if("selectionStart"in
	e){ var f={start:e.selectionStart,end:e.selectionEnd}; }else { a:{f=(f=e.ownerDocument)&&f.defaultView||window;var g=f.getSelection&&f.getSelection();if(g&&0!==g.rangeCount){f=g.anchorNode;var h=g.anchorOffset,k=g.focusNode;g=g.focusOffset;try{f.nodeType,k.nodeType;}catch(db){f=null;break a}var l=0,m=-1,r=-1,w=0,y=0,B=e,R=null;b:for(;;){for(var v;;){B!==f||0!==h&&3!==B.nodeType||(m=l+h);B!==k||0!==g&&3!==B.nodeType||(r=l+g);3===B.nodeType&&(l+=B.nodeValue.length);if(null===(v=B.firstChild)){ break; }R=B;B=v;}for(;;){if(B===
	e){ break b; }R===f&&++w===h&&(m=l);R===k&&++y===g&&(r=l);if(null!==(v=B.nextSibling)){ break; }B=R;R=B.parentNode;}B=v;}f=-1===m||-1===r?null:{start:m,end:r};}else { f=null; }} }f=f||{start:0,end:0};}else { f=null; }Ae={focusedElem:e,selectionRange:f};Hd=!1;for(V$1=d;null!==V$1;){e=!1;f=void 0;try{for(;null!==V$1;){if(V$1.effectTag&256){ a:{var q=V$1.alternate;h=V$1;switch(h.tag){case 0:case 11:case 15:break a;case 1:if(h.effectTag&256&&null!==q){var u=q.memoizedProps,A=q.memoizedState,Yf=h.stateNode,Vh=Yf.getSnapshotBeforeUpdate(h.elementType===
	h.type?u:P$1(h.type,u),A);Yf.__reactInternalSnapshotBeforeUpdate=Vh;}break a;case 3:case 5:case 6:case 4:case 17:break a;default:t$1("163");}} }V$1=V$1.nextEffect;}}catch(db){e=!0,f=db;}e&&(null===V$1?t$1("178"):void 0,Mg(V$1,f),null!==V$1&&(V$1=V$1.nextEffect));}for(V$1=d;null!==V$1;){q=!1;u=void 0;try{for(;null!==V$1;){var x=V$1.effectTag;x&16&&pe(V$1.stateNode,"");if(x&128){var C=V$1.alternate;if(null!==C){var p=C.ref;null!==p&&("function"===typeof p?p(null):p.current=null);}}switch(x&14){case 2:Rg(V$1);V$1.effectTag&=-3;break;case 6:Rg(V$1);
	V$1.effectTag&=-3;Sg(V$1.alternate,V$1);break;case 4:Sg(V$1.alternate,V$1);break;case 8:A=V$1;Pg(A);A.return=null;A.child=null;A.memoizedState=null;A.updateQueue=null;var G=A.alternate;null!==G&&(G.return=null,G.child=null,G.memoizedState=null,G.updateQueue=null);}V$1=V$1.nextEffect;}}catch(db){q=!0,u=db;}q&&(null===V$1?t$1("178"):void 0,Mg(V$1,u),null!==V$1&&(V$1=V$1.nextEffect));}p=Ae;C=Td();x=p.focusedElem;q=p.selectionRange;if(C!==x&&x&&x.ownerDocument&&Sd(x.ownerDocument.documentElement,x)){null!==q&&Ud(x)&&(C=q.start,p=q.end,
	void 0===p&&(p=C),"selectionStart"in x?(x.selectionStart=C,x.selectionEnd=Math.min(p,x.value.length)):(p=(C=x.ownerDocument||document)&&C.defaultView||window,p.getSelection&&(p=p.getSelection(),u=x.textContent.length,G=Math.min(q.start,u),q=void 0===q.end?G:Math.min(q.end,u),!p.extend&&G>q&&(u=q,q=G,G=u),u=Rd(x,G),A=Rd(x,q),u&&A&&(1!==p.rangeCount||p.anchorNode!==u.node||p.anchorOffset!==u.offset||p.focusNode!==A.node||p.focusOffset!==A.offset)&&(C=C.createRange(),C.setStart(u.node,u.offset),p.removeAllRanges(),
	G>q?(p.addRange(C),p.extend(A.node,A.offset)):(C.setEnd(A.node,A.offset),p.addRange(C))))));C=[];for(p=x;p=p.parentNode;){ 1===p.nodeType&&C.push({element:p,left:p.scrollLeft,top:p.scrollTop}); }"function"===typeof x.focus&&x.focus();for(x=0;x<C.length;x++){ p=C[x],p.element.scrollLeft=p.left,p.element.scrollTop=p.top; }}Ae=null;Hd=!!ze;ze=null;a.current=b;for(V$1=d;null!==V$1;){d=!1;x=void 0;try{for(C=c;null!==V$1;){var Fb=V$1.effectTag;if(Fb&36){var Gb=V$1.alternate;p=V$1;G=C;switch(p.tag){case 0:case 11:case 15:break;
	case 1:var Hc=p.stateNode;if(p.effectTag&4){ if(null===Gb){ Hc.componentDidMount(); }else{var ii=p.elementType===p.type?Gb.memoizedProps:P$1(p.type,Gb.memoizedProps);Hc.componentDidUpdate(ii,Gb.memoizedState,Hc.__reactInternalSnapshotBeforeUpdate);} }var Dg=p.updateQueue;null!==Dg&&uf(p,Dg,Hc,G);break;case 3:var Eg=p.updateQueue;if(null!==Eg){q=null;if(null!==p.child){ switch(p.child.tag){case 5:q=p.child.stateNode;break;case 1:q=p.child.stateNode;} }uf(p,Eg,q,G);}break;case 5:var ji=p.stateNode;null===Gb&&p.effectTag&
	4&&Be(p.type,p.memoizedProps)&&ji.focus();break;case 6:break;case 4:break;case 12:break;case 13:break;case 17:break;default:t$1("163");}}if(Fb&128){var Ic=V$1.ref;if(null!==Ic){var Fg=V$1.stateNode;switch(V$1.tag){case 5:var ce=Fg;break;default:ce=Fg;}"function"===typeof Ic?Ic(ce):Ic.current=ce;}}V$1=V$1.nextEffect;}}catch(db){d=!0,x=db;}d&&(null===V$1?t$1("178"):void 0,Mg(V$1,x),null!==V$1&&(V$1=V$1.nextEffect));}dh=gh=!1;"function"===typeof Te&&Te(b.stateNode);Fb=b.expirationTime;b=b.childExpirationTime;b=b>Fb?b:Fb;0===b&&(Yg=
	null);a.expirationTime=b;a.finishedWork=null;}function Wg(a){null===Ah?t$1("246"):void 0;Ah.expirationTime=0;Bh||(Bh=!0,Ch=a);}function Th(a,b){var c=Z$1;Z$1=!0;try{return a(b)}finally{(Z$1=c)||X$1||Qh(1073741823,!1);}}function Uh(a,b){if(Z$1&&!Dh){Dh=!0;try{return a(b)}finally{Dh=!1;}}return a(b)}function Wh(a,b,c){if(qh){ return a(b,c); }Z$1||X$1||0===rh||(Qh(rh,!1),rh=0);var d=qh,e=Z$1;Z$1=qh=!0;try{return a(b,c)}finally{qh=d,(Z$1=e)||X$1||Qh(1073741823,!1);}}
	function Xh(a,b,c,d,e){var f=b.current;a:if(c){c=c._reactInternalFiber;b:{2===kd(c)&&1===c.tag?void 0:t$1("170");var g=c;do{switch(g.tag){case 3:g=g.stateNode.context;break b;case 1:if(M$1(g.type)){g=g.stateNode.__reactInternalMemoizedMergedChildContext;break b}}g=g.return;}while(null!==g);t$1("171");g=void 0;}if(1===c.tag){var h=c.type;if(M$1(h)){c=Qe(c,h,g);break a}}c=g;}else { c=Ke; }null===b.context?b.context=c:b.pendingContext=c;b=e;e=nf(d);e.payload={element:a};b=void 0===b?null:b;null!==b&&(e.callback=b);
	pf(f,e);Uf(f,d);return d}function Yh(a,b,c,d){var e=b.current,f=Rf();e=Sf(f,e);return Xh(a,b,c,e,d)}function Zh(a){a=a.current;if(!a.child){ return null; }switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function $h(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return {$$typeof:$b,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
	Cb=function(a,b,c){switch(b){case "input":Cc(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;){ c=c.parentNode; }c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=La(d);e?void 0:t$1("90");Wb(d);Cc(d,e);}}}break;case "textarea":ie(a,c);break;case "select":b=c.value,null!=b&&fe(a,!!c.multiple,b,!1);}};
	function ai(a){var b=1073741822-25*(((1073741822-Rf()+500)/25|0)+1);b>=bh&&(b=bh-1);this._expirationTime=bh=b;this._root=a;this._callbacks=this._next=null;this._hasChildren=this._didComplete=!1;this._children=null;this._defer=!0;}ai.prototype.render=function(a){this._defer?void 0:t$1("250");this._hasChildren=!0;this._children=a;var b=this._root._internalRoot,c=this._expirationTime,d=new bi;Xh(a,b,null,c,d._onCommit);return d};
	ai.prototype.then=function(a){if(this._didComplete){ a(); }else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a);}};
	ai.prototype.commit=function(){var a=this._root._internalRoot,b=a.firstBatch;this._defer&&null!==b?void 0:t$1("251");if(this._hasChildren){var c=this._expirationTime;if(b!==this){this._hasChildren&&(c=this._expirationTime=b._expirationTime,this.render(this._children));for(var d=null,e=b;e!==this;){ d=e,e=e._next; }null===d?t$1("251"):void 0;d._next=e._next;this._next=b;a.firstBatch=this;}this._defer=!1;Nh(a,c);b=this._next;this._next=null;b=a.firstBatch=b;null!==b&&b._hasChildren&&b.render(b._children);}else { this._next=
	null,this._defer=!1; }};ai.prototype._onComplete=function(){if(!this._didComplete){this._didComplete=!0;var a=this._callbacks;if(null!==a){ for(var b=0;b<a.length;b++){ (0, a[b])(); } }}};function bi(){this._callbacks=null;this._didCommit=!1;this._onCommit=this._onCommit.bind(this);}bi.prototype.then=function(a){if(this._didCommit){ a(); }else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a);}};
	bi.prototype._onCommit=function(){if(!this._didCommit){this._didCommit=!0;var a=this._callbacks;if(null!==a){ for(var b=0;b<a.length;b++){var c=a[b];"function"!==typeof c?t$1("191",c):void 0;c();} }}};
	function ci(a,b,c){b=N$1(3,null,null,b?3:0);a={current:b,containerInfo:a,pendingChildren:null,pingCache:null,earliestPendingTime:0,latestPendingTime:0,earliestSuspendedTime:0,latestSuspendedTime:0,latestPingedTime:0,didError:!1,pendingCommitExpirationTime:0,finishedWork:null,timeoutHandle:-1,context:null,pendingContext:null,hydrate:c,nextExpirationTimeToWorkOn:0,expirationTime:0,firstBatch:null,nextScheduledRoot:null};this._internalRoot=b.stateNode=a;}
	ci.prototype.render=function(a,b){var c=this._internalRoot,d=new bi;b=void 0===b?null:b;null!==b&&d.then(b);Yh(a,c,null,d._onCommit);return d};ci.prototype.unmount=function(a){var b=this._internalRoot,c=new bi;a=void 0===a?null:a;null!==a&&c.then(a);Yh(null,b,null,c._onCommit);return c};ci.prototype.legacy_renderSubtreeIntoContainer=function(a,b,c){var d=this._internalRoot,e=new bi;c=void 0===c?null:c;null!==c&&e.then(c);Yh(b,d,a,e._onCommit);return e};
	ci.prototype.createBatch=function(){var a=new ai(this),b=a._expirationTime,c=this._internalRoot,d=c.firstBatch;if(null===d){ c.firstBatch=a,a._next=null; }else{for(c=null;null!==d&&d._expirationTime>=b;){ c=d,d=d._next; }a._next=d;null!==c&&(c._next=a);}return a};function di(a){return !(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}Kb=Th;Lb=Wh;Mb=function(){X$1||0===rh||(Qh(rh,!1),rh=0);};
	function ei(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b){ for(var c;c=a.lastChild;){ a.removeChild(c); } }return new ci(a,!1,b)}
	function fi(a,b,c,d,e){di(c)?void 0:t$1("200");var f=c._reactRootContainer;if(f){if("function"===typeof e){var g=e;e=function(){var a=Zh(f._internalRoot);g.call(a);};}null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e);}else{f=c._reactRootContainer=ei(c,d);if("function"===typeof e){var h=e;e=function(){var a=Zh(f._internalRoot);h.call(a);};}Uh(function(){null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e);});}return Zh(f._internalRoot)}
	function gi(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;di(b)?void 0:t$1("200");return $h(a,b,null,c)}
	var ki={createPortal:gi,findDOMNode:function(a){if(null==a){ return null; }if(1===a.nodeType){ return a; }var b=a._reactInternalFiber;void 0===b&&("function"===typeof a.render?t$1("188"):t$1("268",Object.keys(a)));a=nd(b);a=null===a?null:a.stateNode;return a},hydrate:function(a,b,c){return fi(null,a,b,!0,c)},render:function(a,b,c){return fi(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,b,c,d){null==a||void 0===a._reactInternalFiber?t$1("38"):void 0;return fi(a,b,c,!1,d)},unmountComponentAtNode:function(a){di(a)?
	void 0:t$1("40");return a._reactRootContainer?(Uh(function(){fi(null,null,a,!1,function(){a._reactRootContainer=null;});}),!0):!1},unstable_createPortal:function(){return gi.apply(void 0,arguments)},unstable_batchedUpdates:Th,unstable_interactiveUpdates:Wh,flushSync:function(a,b){X$1?t$1("187"):void 0;var c=Z$1;Z$1=!0;try{return wh(a,b)}finally{Z$1=c,Qh(1073741823,!1);}},unstable_createRoot:hi,unstable_flushControlled:function(a){var b=Z$1;Z$1=!0;try{wh(a);}finally{(Z$1=b)||X$1||Qh(1073741823,!1);}},__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{Events:[Ja,
	Ka,La,Ca.injectEventPluginsByName,qa,Ra,function(a){za(a,Qa);},Ib,Jb,Jd,Ea]}};function hi(a,b){di(a)?void 0:t$1("299","unstable_createRoot");return new ci(a,!0,null!=b&&!0===b.hydrate)}(function(a){var b=a.findFiberByHostInstance;return We(objectAssign({},a,{overrideProps:null,findHostInstanceByFiber:function(a){a=nd(a);return null===a?null:a.stateNode},findFiberByHostInstance:function(a){return b?b(a):null}}))})({findFiberByHostInstance:Ia,bundleType:0,version:"16.7.0",rendererPackageName:"react-dom"});
	var li={default:ki},mi=li&&ki||li;var reactDom_production_min=mi.default||mi;

	var reactDom = createCommonjsModule(function (module) {

	function checkDCE() {
	  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
	  if (
	    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
	    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
	  ) {
	    return;
	  }
	  try {
	    // Verify that the code above has been dead code eliminated (DCE'd).
	    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
	  } catch (err) {
	    // DevTools shouldn't crash React, no matter what.
	    // We should still report in case we break this code.
	    console.error(err);
	  }
	}

	{
	  // DCE check should happen before ReactDOM bundle executes so that
	  // DevTools can report bad minification during injection.
	  checkDCE();
	  module.exports = reactDom_production_min;
	}
	});

	var umd = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
		module.exports = factory();
	}(commonjsGlobal, (function () {
	var isMergeableObject = function isMergeableObject(value) {
		return isNonNullObject(value)
			&& !isSpecial(value)
	};

	function isNonNullObject(value) {
		return !!value && typeof value === 'object'
	}

	function isSpecial(value) {
		var stringValue = Object.prototype.toString.call(value);

		return stringValue === '[object RegExp]'
			|| stringValue === '[object Date]'
			|| isReactElement(value)
	}

	// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
	var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

	function isReactElement(value) {
		return value.$$typeof === REACT_ELEMENT_TYPE
	}

	function emptyTarget(val) {
		return Array.isArray(val) ? [] : {}
	}

	function cloneUnlessOtherwiseSpecified(value, options) {
		return (options.clone !== false && options.isMergeableObject(value))
			? deepmerge(emptyTarget(value), value, options)
			: value
	}

	function defaultArrayMerge(target, source, options) {
		return target.concat(source).map(function(element) {
			return cloneUnlessOtherwiseSpecified(element, options)
		})
	}

	function mergeObject(target, source, options) {
		var destination = {};
		if (options.isMergeableObject(target)) {
			Object.keys(target).forEach(function(key) {
				destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
			});
		}
		Object.keys(source).forEach(function(key) {
			if (!options.isMergeableObject(source[key]) || !target[key]) {
				destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
			} else {
				destination[key] = deepmerge(target[key], source[key], options);
			}
		});
		return destination
	}

	function deepmerge(target, source, options) {
		options = options || {};
		options.arrayMerge = options.arrayMerge || defaultArrayMerge;
		options.isMergeableObject = options.isMergeableObject || isMergeableObject;

		var sourceIsArray = Array.isArray(source);
		var targetIsArray = Array.isArray(target);
		var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

		if (!sourceAndTargetTypesMatch) {
			return cloneUnlessOtherwiseSpecified(source, options)
		} else if (sourceIsArray) {
			return options.arrayMerge(target, source, options)
		} else {
			return mergeObject(target, source, options)
		}
	}

	deepmerge.all = function deepmergeAll(array, options) {
		if (!Array.isArray(array)) {
			throw new Error('first argument should be an array')
		}

		return array.reduce(function(prev, next) {
			return deepmerge(prev, next, options)
		}, {})
	};

	var deepmerge_1 = deepmerge;

	return deepmerge_1;

	})));
	});

	var isArray = Array.isArray;
	var keyList = Object.keys;
	var hasProp = Object.prototype.hasOwnProperty;

	var fastDeepEqual = function equal(a, b) {
	  if (a === b) { return true; }

	  if (a && b && typeof a == 'object' && typeof b == 'object') {
	    var arrA = isArray(a)
	      , arrB = isArray(b)
	      , i
	      , length
	      , key;

	    if (arrA && arrB) {
	      length = a.length;
	      if (length != b.length) { return false; }
	      for (i = length; i-- !== 0;)
	        { if (!equal(a[i], b[i])) { return false; } }
	      return true;
	    }

	    if (arrA != arrB) { return false; }

	    var dateA = a instanceof Date
	      , dateB = b instanceof Date;
	    if (dateA != dateB) { return false; }
	    if (dateA && dateB) { return a.getTime() == b.getTime(); }

	    var regexpA = a instanceof RegExp
	      , regexpB = b instanceof RegExp;
	    if (regexpA != regexpB) { return false; }
	    if (regexpA && regexpB) { return a.toString() == b.toString(); }

	    var keys = keyList(a);
	    length = keys.length;

	    if (length !== keyList(b).length)
	      { return false; }

	    for (i = length; i-- !== 0;)
	      { if (!hasProp.call(b, keys[i])) { return false; } }

	    for (i = length; i-- !== 0;) {
	      key = keys[i];
	      if (!equal(a[key], b[key])) { return false; }
	    }

	    return true;
	  }

	  return a!==a && b!==b;
	};

	var toNumber = function (val) {
	  if (!isNaN(val)) {
	    return parseInt(val, 10)
	  }
	  return val
	};

	var assign = function (obj, key, val) {
	  if (hasEqual(obj[key], val)) { return false }
	  obj[key] = val;
	  return obj[key] === val
	};

	var freezeObject = function (obj) {
	  if (Object.freeze) { Object.freeze(obj); }
	  return obj
	};

	var hasEqual = function (obj1, obj2) {
	  return obj1 !== undefined && fastDeepEqual(obj1, obj2)
	};

	var split = function (path, seperator, escape) {
	  if ( seperator === void 0 ) seperator = '.';
	  if ( escape === void 0 ) escape = '\\';

	  if (!path) { return [] }
	  if (Array.isArray(path)) { return path }
	  var keys = [];
	  var key = '';
	  for (var i = 0, l = path.length; i < l; ++i) {
	    var charKey = path[i];
	    if ((charKey === seperator) && (path[i - 1] !== escape)) {
	      if (key.length > 0) {
	        keys.push(toNumber(key));
	      }
	      key = '';
	    } else {
	      if (charKey !== escape) {
	        key += path[i];
	      }
	    }
	  }
	  if (key.length > 0) {
	    keys.push(toNumber(key));
	  }
	  return keys
	};

	var get = function (obj, keys, defaultValue) {
	  if (obj === undefined) { return defaultValue }
	  if (!keys || keys.length === 0) {
	    return obj
	  }
	  keys = split(keys);
	  var key = keys[0];
	  var remaining = keys.slice(1);
	  if (!isNaN(key)) {
	    key *= 1;
	  }
	  return get(obj[key], remaining, defaultValue)
	};

	var set = function (obj, keys, value, dontReplace) {
	  var isDataUpdated = false;

	  if (obj === undefined) { return [false, isDataUpdated] }
	  if (!keys || keys.length === 0) { return [false, isDataUpdated] }

	  keys = split(keys);
	  var key = keys[0];
	  var next = keys[1];
	  var remaining = keys.slice(2);
	  if (next) {
	    if (!obj.hasOwnProperty(key)) {
	      var val = !isNaN(next) ? [] : {};
	      isDataUpdated = assign(obj, key, val);
	    }
	    var ref = set(obj[key], [next ].concat( remaining), value, dontReplace);
	    var _ = ref[0];
	    var _$1 = ref[1];
	    return [_, _$1 || isDataUpdated]
	  } else {
	    if (obj.hasOwnProperty(key) && dontReplace) { return [true, isDataUpdated] }
	    isDataUpdated = assign(obj, key, value);
	    return [true, isDataUpdated]
	  }
	};

	var has = function (obj, keys) {
	  var value = get(obj, keys);
	  if (value === undefined || value === null) { return false }
	  return true
	};

	var ensureExists = function (obj, keys, value) {
	  return set(obj, keys, value, true)
	};

	var arrayMethods = [ 'push', 'pop', 'splice', 'shift', 'unshift', 'sort' ];

	var arrayOps = function (obj, keys, method) {
	  var args = [], len = arguments.length - 3;
	  while ( len-- > 0 ) args[ len ] = arguments[ len + 3 ];

	  if (arrayMethods.indexOf(method) === -1) { return false }
	  var arr = get(obj, keys);
	  if (!Array.isArray(arr)) {
	    arr = [];
	    set(obj, keys, arr);
	  }
	  var origLength = arr.length;
	  arr[method].apply(arr, args);
	  return [true, arr.length !== origLength]
	};

	var insert = function (obj, keys, value, at) {
	  return arrayOps(obj, keys, 'splice', at, 0, value)
	};

	var push = function (obj, keys) {
	  var values = [], len = arguments.length - 2;
	  while ( len-- > 0 ) values[ len ] = arguments[ len + 2 ];

	  return arrayOps.apply(void 0, [ obj, keys, 'push' ].concat( values ))
	};

	var unshift = function (obj, keys) {
	  var args = [], len = arguments.length - 2;
	  while ( len-- > 0 ) args[ len ] = arguments[ len + 2 ];

	  return arrayOps.apply(void 0, [ obj, keys, 'unshift' ].concat( args ))
	};

	var pop = function (obj, keys) {
	  return arrayOps(obj, keys, 'pop')
	};

	var shift = function (obj, keys) {
	  return arrayOps(obj, keys, 'shift')
	};

	var splice = function (obj, keys) {
	  var args = [], len = arguments.length - 2;
	  while ( len-- > 0 ) args[ len ] = arguments[ len + 2 ];

	  return arrayOps.apply(void 0, [ obj, keys, 'splice' ].concat( args ))
	};

	var sort = function (obj, keys) {
	  var args = [], len = arguments.length - 2;
	  while ( len-- > 0 ) args[ len ] = arguments[ len + 2 ];

	  return arrayOps.apply(void 0, [ obj, keys, 'sort' ].concat( args ))
	};

	var empty = function (obj, keys) {
	  var isDataUpdated = false;
	  var value = get(obj, keys);
	  if (value === undefined) { return [true, isDataUpdated] }
	  var finalValue;
	  switch (true) {
	    case typeof value === 'string':
	      finalValue = '';
	      break
	    case typeof value === 'number':
	      finalValue = 0;
	      break
	    case typeof value === 'boolean':
	      finalValue = false;
	      break
	    case Array.isArray(value):
	      value.length = 0;
	      break
	    case typeof value === 'object':
	      for (var i in value) {
	        if (value.hasOwnProperty(i)) {
	          isDataUpdated = delete value[i] || isDataUpdated;
	        }
	      }
	      return [true, isDataUpdated]
	  }
	  return set(obj, keys, finalValue)
	};

	var coalesce = function (obj, keysArr, defaultValue) {
	  for (var i = 0, l = keysArr.length; i < l; ++i) {
	    var val = get(obj, keysArr[i]);
	    if (val !== undefined) {
	      return val
	    }
	  }
	  return defaultValue
	};

	var del = function (obj, keys) {
	  var isDataUpdated = false;
	  if (obj === undefined) { return [false, isDataUpdated] }
	  if (!keys || keys.length === 0) { return [false, isDataUpdated] }
	  keys = split(keys);
	  var key = keys[0];
	  var remaining = keys.slice(1);
	  if (keys.length === 1) {
	    if (Array.isArray(obj) && !isNaN(key)) {
	      isDataUpdated = obj.splice(key, 1);
	    } else if (obj.hasOwnProperty(key)) {
	      isDataUpdated = delete obj[key];
	    }
	    return [true, isDataUpdated]
	  } else {
	    return del(obj[key], [].concat( remaining ))
	  }
	};

	var merge = function (obj, keys, data) {
	  return set(obj, keys, umd(get(obj, keys), data))
	};

	var Segment = function Segment (config, store, dataObserver) {
	  this.config = config;
	  this.store = store;
	  this.dataObserver = dataObserver;
	  this.detachListeners = function () {};
	  this.keySeperator = '.';
	  this.listeningKeys = {};
	  this.bootstrap();
	  this.active = true;
	};

	var prototypeAccessors = { data: { configurable: true } };
	Segment.prototype.attachListeners = function attachListeners () {
	  var dataChanges = this.listenDataChanges();
	  var onUnmount = this.listenUnmount();
	  return function () {
	    dataChanges();
	    onUnmount();
	  }
	};
	Segment.prototype.normalizePaths = function normalizePaths () {
	  var listeningKeys = {};
	  var paths = this.config.paths;
	  for (var key in paths) {
	    if (paths.hasOwnProperty(key)) {
	      listeningKeys[key] = split(paths[key], this.keySeperator);
	    }
	  }
	  this.listeningKeys = listeningKeys;
	};
	Segment.prototype.listenDataChanges = function listenDataChanges () {
	    var this$1 = this;

	  var listeningKeys = Object.values(this.listeningKeys);
	  this.dataObserver.attachObserver(listeningKeys, this.dataUpdated.bind(this));
	  return function () {
	    this$1.dataObserver.detachObserver(this$1);
	  }
	};
	Segment.prototype.listenUnmount = function listenUnmount () {
	    var this$1 = this;

	  var target = this.config.to;
	  this.componentWillUnmount = target.componentWillUnmount;

	  target.componentWillUnmount = function () {
	    this$1.destroy();
	    if (typeof this$1.componentWillUnmount === 'function') {
	      this$1.componentWillUnmount.call(target);
	    }
	  };

	  return function () {
	    target.componentWillUnmount = this$1.componentWillUnmount;
	    delete this$1.componentWillUnmount;
	  }
	};
	prototypeAccessors.data.get = function () {
	  var segment = {};
	  var paths = this.config.paths;
	  for (var key in paths) {
	    segment[key] = this.store.get(paths[key]);
	  }
	  return freezeObject(umd({}, segment))
	};
	Segment.prototype.dataUpdated = function dataUpdated () {
	  this.assignState();
	};
	Segment.prototype.assignState = function assignState (initialAssignment) {
	    var assign;

	  var target, setState;
	  if (Array.isArray(this.config.to)) {
	    (assign = this.config.to, target = assign[0], setState = assign[1]);
	  } else {
	    target = this.config.to;
	  }
	  var data = this.data;
	  if (typeof setState === 'function') {
	    !initialAssignment && setState(data);
	  } else if (typeof target.setState === 'function') {
	    if (initialAssignment) {
	      target.state = target.state || {};
	      target.state.store = data;
	    } else {
	      target.setState({
	        store: data
	      });
	    }
	  } else {
	    target.store = data;
	  }
	  var events = this.config;
	  if (events && typeof events.afterUpdate === 'function') {
	    events.afterUpdate(data);
	  }
	  return data
	};
	Segment.prototype.bootstrap = function bootstrap () {
	  this.normalizePaths();
	  this.detachListeners = this.attachListeners();
	  this.interface = {
	    store: this.assignState(true),
	    destroy: this.destroy.bind(this)
	  };
	  freezeObject(this.interface);
	};
	Segment.prototype.destroy = function destroy () {
	  this.detachListeners();
	};

	Object.defineProperties( Segment.prototype, prototypeAccessors );

	var DataObserver = function DataObserver (store) {
	  this.store = store;
	  this.listeners = {};
	  this.counter = 0;
	};
	DataObserver.prototype.attachObserver = function attachObserver (keys, listener) {
	    var this$1 = this;

	  if (!listener) { return }
	  if (!keys || keys.length === 0) { return }
	  ++this.counter;
	  var id = "data-slice:" + (this.counter);
	  this.listeners[id] = {
	    keys: keys,
	    listener: listener
	  };
	  return function () {
	    delete this$1.listeners[id];
	  }
	};
	DataObserver.prototype.dataUpdatedAt = function dataUpdatedAt (changedKey) {
	  var seperator = '>>';
	  var targets = [];
	  var changedPath = split(changedKey).join(seperator);
	  for (var id in this.listeners) {
	    var ref = this.listeners[id];
	      var keys = ref.keys;
	      var listener = ref.listener;
	    keys = keys.filter(function (key) {
	      var keyPath = split(key).join(seperator);
	      return keyPath.startsWith(changedPath) || changedPath.startsWith(keyPath)
	    });
	    if (keys.length > 0) { targets.push([keys, listener]); }
	  }
	  targets.forEach(function (ref) {
	      var keys = ref[0];
	      var listener = ref[1];

	    try {
	      listener(keys);
	    } catch (ex) {
	      console.log('Error updating', listener, keys);
	    }
	  });
	};
	DataObserver.prototype.destroy = function destroy () {
	  this.listeners = {};
	};

	var Clearx = function Clearx (data, ref) {
	  if ( ref === void 0 ) ref = {};
	  var keySeperator = ref.keySeperator; if ( keySeperator === void 0 ) keySeperator = '.';

	  this.data = data;
	  this.segments = [];
	  this.dataObserver = new DataObserver(this);
	  this.keySeperator = keySeperator;
	};
	Clearx.prototype.triggerEvents = function triggerEvents (key) {
	  this.dataObserver.dataUpdatedAt(key);
	};
	Clearx.prototype.executeUtil = function executeUtil (key, ref) {
	    var status = ref[0];
	    var changed = ref[1];

	  if (changed) { this.triggerEvents(key); }
	  return status
	};
	Clearx.prototype.get = function get$1 (key, defaultValue) {
	  return get(this.data, key, defaultValue)
	};
	Clearx.prototype.set = function set$1 (key, value, doNotReplace) {
	    if ( doNotReplace === void 0 ) doNotReplace = false;

	  return this.executeUtil(key, set(this.data, key, value, doNotReplace))
	};
	Clearx.prototype.coalesce = function coalesce$1 (keys, defaultValue) {
	  return coalesce(this.data, keys, defaultValue)
	};
	Clearx.prototype.empty = function empty$1 (key) {
	  return this.executeUtil(key, empty(this.data, key))
	};
	Clearx.prototype.insert = function insert$1 (key, value, position) {
	  return this.executeUtil(key, insert(this.data, key, value, position))
	};
	Clearx.prototype.push = function push$1 (key) {
	    var values = [], len = arguments.length - 1;
	    while ( len-- > 0 ) values[ len ] = arguments[ len + 1 ];

	  return this.executeUtil(key, push.apply(void 0, [ this.data, key ].concat( values )))
	};
	Clearx.prototype.unshift = function unshift$1 (key) {
	    var values = [], len = arguments.length - 1;
	    while ( len-- > 0 ) values[ len ] = arguments[ len + 1 ];

	  return this.executeUtil(key, unshift.apply(void 0, [ this.data, key ].concat( values )))
	};
	Clearx.prototype.pop = function pop$1 (key) {
	  return this.executeUtil(key, pop(this.data, key))
	};
	Clearx.prototype.shift = function shift$1 (key) {
	  return this.executeUtil(key, shift(this.data, key))
	};
	Clearx.prototype.splice = function splice$1 (key) {
	    var args = [], len = arguments.length - 1;
	    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

	  return this.executeUtil(key, splice.apply(void 0, [ this.data, key ].concat( args )))
	};
	Clearx.prototype.sort = function sort$1 (key) {
	    var args = [], len = arguments.length - 1;
	    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

	  return this.executeUtil(key, sort.apply(void 0, [ this.data, key ].concat( args )))
	};
	Clearx.prototype.ensureExists = function ensureExists$1 (key, defaultValue) {
	  return this.executeUtil(key, ensureExists(this.data, key, defaultValue))
	};
	Clearx.prototype.delete = function delete$1 (key) {
	  return this.executeUtil(key, del(this.data, key))
	};
	Clearx.prototype.has = function has$1 (key) {
	  return has(this.data, key)
	};
	Clearx.prototype.merge = function merge$1 (key, data) {
	  return this.executeUtil(key, merge(this.data, key, data))
	};
	Clearx.prototype.bind = function bind (options) {
	  var segment = new Segment(Object.assign({}, {keySeperator: this.keySeperator},
	    options), this, this.dataObserver);
	  this.segments.push(segment);
	  return segment.interface
	};
	Clearx.prototype.destroy = function destroy () {
	  this.segments.forEach(function (segment) {
	    segment.destroy();
	  });
	  this.dataObserver.destroy();
	  this.data = {};
	};

	var Data = {
	  todos: []
	};

	var Store = new Clearx(Data);

	var getTodo = function (id) {
	  var todos = Store.get(['todos']);
	  for (var i = 0; i < todos.length; i++) {
	    if (todos[i].id === id) {
	      return {
	        index: i,
	        todo: todos[i]
	      }
	    }
	  }
	  return {}
	};

	// Instead of using ES6 class, just showcasing way to write tree shaking friendly code

	var deleteTodo = function (id) {
	  var todoInfo = getTodo(id);
	  Store.delete(['todos', todoInfo.index]);
	};

	var toggleTodo = function (id) {
	  var todoInfo = getTodo(id);
	  Store.set(['todos', todoInfo.index, 'done'], !todoInfo.todo.done);
	};

	var createTodo = function (text) {
	  Store.push(['todos'], {
	    text: text,
	    id: Date.now(),
	    done: false
	  });
	};

	var TodoItem = /*@__PURE__*/(function (superclass) {
	  function TodoItem () {
	    superclass.apply(this, arguments);
	  }

	  if ( superclass ) TodoItem.__proto__ = superclass;
	  TodoItem.prototype = Object.create( superclass && superclass.prototype );
	  TodoItem.prototype.constructor = TodoItem;

	  TodoItem.prototype.toggleTodo = function toggleTodo$1 () {
	    var ref = this.props;
	    var todo = ref.todo;
	    toggleTodo(todo.id);
	  };
	  TodoItem.prototype.deleteTodo = function deleteTodo$1 () {
	    var ref = this.props;
	    var todo = ref.todo;
	    deleteTodo(todo.id);
	  };
	  TodoItem.prototype.render = function render () {
	    var toggleTodo$$1 = this.toggleTodo.bind(this);
	    var deleteTodo$$1 = this.deleteTodo.bind(this);
	    var ref = this.props;
	    var todo = ref.todo;
	    return (
	      react.createElement( 'div', null,
	        todo.done &&
	          react.createElement( 'span', null, react.createElement( 'strike', null, todo.text ) ),
	        !todo.done &&
	          react.createElement( 'span', null, todo.text ),
	        react.createElement( 'button', { onClick: toggleTodo$$1 }, "done"),
	        react.createElement( 'button', { onClick: deleteTodo$$1 }, "delete")
	      )
	    )
	  };

	  return TodoItem;
	}(react.Component));

	var AddTodo = /*@__PURE__*/(function (superclass) {
	  function AddTodo (props) {
	    superclass.call(this, props);
	    this.state = {
	      todoText: ''
	    };
	    this.textChange = this.handleChange.bind(this);
	    this.addTodo = this.createTodo.bind(this);
	  }

	  if ( superclass ) AddTodo.__proto__ = superclass;
	  AddTodo.prototype = Object.create( superclass && superclass.prototype );
	  AddTodo.prototype.constructor = AddTodo;
	  AddTodo.prototype.createTodo = function createTodo$1 (event) {
	    var ref = this.state;
	    var todoText = ref.todoText;
	    if (todoText.length === 0) { return }
	    createTodo(todoText);
	    this.setState({ todoText: '' });
	    event.preventDefault();
	    return false
	  };
	  AddTodo.prototype.handleChange = function handleChange (event) {
	    this.setState({ todoText: event.target.value });
	  };
	  AddTodo.prototype.render = function render () {
	    var ref = this.props;
	    var todo = ref.todo;
	    return (
	      react.createElement( 'div', null,
	        react.createElement( 'form', { onSubmit: this.addTodo },
	          react.createElement( 'input', { value: this.state.todoText, onChange: this.textChange }),
	          react.createElement( 'button', { onClick: this.addTodo }, "Add")
	        ),
	        react.createElement( 'br', null ),
	        react.createElement( 'br', null )
	      )
	    )
	  };

	  return AddTodo;
	}(react.Component));

	var TodoList = /*@__PURE__*/(function (superclass) {
	  function TodoList (props) {
	    superclass.call(this, props);
	    // Just this is doing the magic!
	    Store.bind({
	      paths: {
	        todos: ['todos']
	      },
	      to: this
	    });
	  }

	  if ( superclass ) TodoList.__proto__ = superclass;
	  TodoList.prototype = Object.create( superclass && superclass.prototype );
	  TodoList.prototype.constructor = TodoList;
	  TodoList.prototype.render = function render () {
	    var localStore = this.state.store;
	    return (
	      react.createElement( react.Fragment, null,
	        react.createElement( 'h5', null, "Data displayed here as part of Todo List View" ),
	        react.createElement( 'div', { class: 'todoCount' }, " ", localStore.todos.length, " "),
	        localStore.todos.map(function (item) {
	          return (
	            react.createElement( TodoItem, { todo: item })
	          )
	        })
	      )
	    )
	  };

	  return TodoList;
	}(react.Component));

	var TodoApp = /*@__PURE__*/(function (superclass) {
	  function TodoApp (props) {
	    superclass.call(this, props);
	    // Just this is doing the magic!
	    Store.bind({
	      paths: {
	        todos: ['todos']
	      },
	      to: this
	    });
	  }

	  if ( superclass ) TodoApp.__proto__ = superclass;
	  TodoApp.prototype = Object.create( superclass && superclass.prototype );
	  TodoApp.prototype.constructor = TodoApp;
	  TodoApp.prototype.render = function render () {
	    var localStore = this.state.store;
	    return (
	      react.createElement( react.Fragment, null,
	        react.createElement( AddTodo, null ),
	        react.createElement( TodoList, null ),
	        react.createElement( 'hr', null ),
	        react.createElement( 'h5', null, "The todo data accessed and displayed here directly from global store." ),
	        react.createElement( 'div', { class: 'todoCount' }, " Todo count: ", Store.get(['todos']).length, " "),
	        react.createElement( 'code', null,
	          JSON.stringify(Store.get(['todos']))
	        ),
	        react.createElement( 'hr', null ),
	        react.createElement( 'h5', null, "The todo data accessed and displayed here from local sliced store." ),
	        react.createElement( 'div', { class: 'todoCount' }, " Todo count: ", localStore.todos.length, " "),
	        react.createElement( 'code', null,
	          JSON.stringify(localStore.todos)
	        )
	      )
	    )
	  };

	  return TodoApp;
	}(react.Component));

	reactDom.render(react.createElement( TodoApp, null ), document.body);

}());
//# sourceMappingURL=todoapp.bundle.js.map
