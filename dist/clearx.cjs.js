'use strict';Object.defineProperty(exports,"__esModule",{value:!0});function _interopDefault(a){return a&&"object"==typeof a&&"default"in a?a["default"]:a}var deepmerge=_interopDefault(require("deepmerge")),equal=_interopDefault(require("fast-deep-equal"));let counter=0,generate=()=>(counter+=1,`clearx-${counter}`);const toNumber=a=>isNaN(a)?a:1*a,assign=(a,b,c)=>!hasEqual(a[b],c)&&(a[b]=c,a[b]===c),freezeObject=a=>(Object.freeze&&Object.freeze(a),a),hasEqual=(a,b)=>void 0!==a&&equal(a,b),split=(a,b=".",c="\\")=>{if(!a)return[];if(Array.isArray(a))return a;const d=[];let e="";for(let f=0,g=a.length;f<g;++f){const g=a[f];g===b&&a[f-1]!==c?(0<e.length&&d.push(toNumber(e)),e=""):g!==c&&(e+=a[f])}return 0<e.length&&d.push(toNumber(e)),d},get=(a,b,c)=>{if(void 0===a)return c;if(!b||0===b.length)return a;b=split(b);let[d,...e]=b;return isNaN(d)||(d*=1),get(a[d],e,c)},set=(a,b,c,d)=>{let e=!1;if(a===void 0)return[!1,e];if(!b||0===b.length)return[!1,e];b=split(b);const[f,g,...h]=b;if(void 0!==g){if(!a.hasOwnProperty(f)){const b=isNaN(g)?{}:[];e=assign(a,f,b)}const[b,i]=set(a[f],[g,...h],c,d);return[b,i||e]}return a.hasOwnProperty(f)&&d?[!0,e]:(e=assign(a,f,c),[!0,e])},has=(a,b)=>{const c=get(a,b);return void 0!==c},ensureExists=(a,b,c=null)=>set(a,b,c,!0),arrayMethods=["push","pop","splice","shift","unshift","sort","slice"],arrayOps=(a,b,c,...d)=>{if(-1===arrayMethods.indexOf(c))return!1;let e=get(a,b);Array.isArray(e)||(e=[],set(a,b,e));let f;try{f=e[c].apply(e,d)}catch(a){// Probably freeze!
}return[!0,!0,f]},push=(a,b,...c)=>arrayOps(a,b,"push",...c),insert=(a,b,c,d)=>void 0===d?push(a,b,c):arrayOps(a,b,"splice",d,0,c),unshift=(a,b,...c)=>arrayOps(a,b,"unshift",...c),pop=(a,b)=>arrayOps(a,b,"pop"),shift=(a,b)=>arrayOps(a,b,"shift"),splice=(a,b,...c)=>arrayOps(a,b,"splice",...c),slice=(a,b,...c)=>{const d=arrayOps(a,b,"slice",...c);return d[2]},sort=(a,b,...c)=>arrayOps(a,b,"sort",...c),increment=(a,b,c=1)=>{let d=1*get(a,b);return isNaN(d)&&(d=0),d+=c,set(a,b,d)},decrement=(a,b,c=1)=>increment(a,b,-1*c),toggle=(a,b)=>{const c=!!get(a,b);return set(a,b,!c)},empty=(a,b)=>{let c=!1;const d=get(a,b);if(d===void 0)return[!0,c];let e;switch(!0){case"string"==typeof d:e="";break;case"number"==typeof d:e=0;break;case"boolean"==typeof d:e=!1;break;case Array.isArray(d):return d.length=0,[!0,0===d.length];case"object"==typeof d:for(const a in d)d.hasOwnProperty(a)&&(c=delete d[a]||c);return[!0,c];}return set(a,b,e)},coalesce=(a,b,c)=>{for(let d=0,e=b.length;d<e;++d){const c=get(a,b[d]);if(c!==void 0&&null!==c)return c}return c},del=(a,b)=>{let c=!1;if(a===void 0)return[!1,c];if(!b||0===b.length)return[!1,c];b=split(b);const[d,...e]=b;if(1===b.length){if(Array.isArray(a)&&!isNaN(d)){const b=a.length;a.splice(d,1),c=b!==a.length}else a.hasOwnProperty(d)&&(c=delete a[d]);return[!0,c]}return del(a[d],[...e])},merge=(a,b,c)=>{ensureExists(a,b,Array.isArray(c)?[]:{});const d=get(a,b),e=deepmerge(d,c);return set(a,b,e)},isEqual=(a,b,c)=>{const d=get(a,b);return equal(d,c)};class SegmentHelper{constructor(a,b=".",c,d){this.paths=a,this.delimiter=b,this.store=c,this.dataObserver=d,this.components=[],this._afterUpdateEvents=[],this._dataTransformers=[]}get keys(){const a=this.paths;if(Array.isArray(a))return a;let b=[];if("string"==typeof a)b=[split(a,this.delimiter)];else if("[object Object]"===a.toString())for(const c in a)a.hasOwnProperty(c)&&b.push(split(a[c],this.delimiter));else return a;return b}observe(a){if(0===this.components.length&&!a)return;if(this.cancelObserver)return;const b=this.dataObserver,c=this.keys,d=this.updateComponents.bind(this);this.cancelDataListener=b.attachObserver(c,d)}unobserve(){this.cancelDataListener&&(this.cancelDataListener(),delete this.cancelDataListener)}listenUnmount(a,b){if(Array.isArray(a))return()=>{};const c=a.componentWillUnmount;a.componentWillUnmount=()=>{b(),"function"==typeof this.componentWillUnmount&&this.componentWillUnmount.call(a)},a.componentWillUnmount.__original=c}unlistenUnmount(a){const b=a.componentWillUnmount;if(b){const b=a.componentWillUnmount.__original;b&&(a.componentWillUnmount=b)}}dataTransformer(a){return"function"==typeof a?(this._dataTransformers.push(a),this.updateComponents(),()=>{const b=this._dataTransformers.indexOf(a);-1<b&&this._dataTransformers.splice(b,1)}):()=>{}}get dataTransformers(){return this._dataTransformers.slice(0)}applyDataTransformers(a){return this._dataTransformers.forEach(b=>{try{a=b(a)}catch(c){console.log(b,"failing to transform",a)}}),a}updateData(){let a={},b=this.paths;if("string"==typeof b)b=split(b,this.delimiter),a=this.store.get(b);else if(Array.isArray(b))a=b.map(a=>{const b=split(a,this.delimiter);return this.store.get(b)});else for(const c in b){const d=split(b[c],this.delimiter);a[c]=this.store.get(d)}a=this.applyDataTransformers(a),"object"==typeof a&&(a=freezeObject(deepmerge({},a))),this._data=a}get data(){return this._data||this.updateData(),this._data}updateComponents(){this.updateData(),this.components.forEach(a=>{this.assignState(a)}),this.executeAfterUpdate()}assignStateFC(a,b){let c;if(Array.isArray(a)&&(c=a[1]),!!c)return!!b||(a[0]=this._data,c(this._data),!0)}assignStateCC(a,b){if("function"==typeof a.setState)return b?(a.state=a.state||{},a.state.store=a.state.store||{},a.state.store={...a.state.store,...this.data}):a.setState({...a.state,store:{...a.state.store,...this.data}}),!0}assignStateOthers(a){"object"==typeof a&&(a.data=this.data)}assignState(a,b=!1){const c=this.assignStateFC(a,b),d=this.assignStateCC(a,b);c||d||this.assignStateOthers(a,b)}onUpdate(a){return"function"==typeof a?(this._afterUpdateEvents.push(a),()=>{const b=this._afterUpdateEvents.indexOf(a);-1<b&&this._afterUpdateEvents.splice(b,1)}):()=>{}}get afterUpdateEvents(){return this._afterUpdateEvents.slice(0)}executeAfterUpdate(){this._afterUpdateEvents.forEach(a=>{try{a(this.data)}catch(a){console.log(a)}})}get hasDataListener(){return!!this.cancelDataListener}addMark(a,b){let c=a;Array.isArray(a)&&(c=a[1]),c.__segment=b}removeMark(a){let b=a;Array.isArray(a)&&(b=a[1]),delete b.__segment}}class Segment{constructor(a,b,c,d,e){this.id=b||generate(),this.paths=a,this._helper=new SegmentHelper(a,c,d,e),this.delimiter=c,this.store=d,this.dataObserver=e}findComponent(a){if(!this._helper)return-1;Array.isArray(a)&&(a=a[1]);const b=this._helper.components;for(let c,d=0;d<b.length;d++)if(c=b[d],Array.isArray(c)&&(c=c[1]),a===c)return d;return-1}get data(){return this._helper?this._helper.data:{}}get components(){return this._helper?this._helper.components.slice(0):[]}get active(){return!!this._helper&&this._helper.hasDataListener}get afterUpdateEvents(){return this._helper?this._helper.afterUpdateEvents:[]}get dataTransformers(){return this._helper?this._helper.dataTransformers:[]}link(a){if(!a)return{};const b=this._helper;if(!b)return{};const c=this.store,d=c._unlinkComponentFromAllSegments.bind(c,a),e=[this.data,d];return-1<this.findComponent(a)?e:(b.components.push(a),b.observe(this.keepSyncing),b.addMark(a,this),b.listenUnmount(a,d),b.assignState(a,!0),e)}unlink(a){if(!a)return!1;const b=this._helper;if(!b)return!1;const c=this.findComponent(a);return-1<c&&(b.removeMark(a),b.components.splice(c,1),b.unlistenUnmount(a)),0!==b.components.length||this.keepSyncing||b.unobserve(),-1<c}sync(a=!0){return!!this._helper&&(this.keepSyncing=a,a&&!this.active&&this._helper.observe(!0),!a&&this.active&&this._helper.unobserve(),!0)}unlinkAll(){return!!this._helper&&(this._helper.components.forEach(this.unlink.bind(this)),!0)}onUpdate(a){return this._helper?this._helper.onUpdate(a):()=>{}}dataTransformer(a){return this._helper?this._helper.dataTransformer(a):()=>{}}teardown(){return!this._helper||(this.unlinkAll(),this._helper.unobserve(),delete this._helper,delete this.dataObserver,this.store.removeSegment(this),!0)}}class DataObserver{constructor(a){this.store=a,this.listeners={},this.counter=0}attachObserver(a,b){if(!b)return;if(!a||0===a.length)return;++this.counter;const c=`data-slice:${this.counter}`;return this.listeners[c]={keys:a,listener:b},()=>{delete this.listeners[c]}}dataUpdatedAt(a){const b=[],c=split(a).join(">>");for(const d in this.listeners){let{keys:a,listener:e}=this.listeners[d];a=a.filter(a=>{const b=split(a).join(">>");return b.startsWith(c)||c.startsWith(b)}),0<a.length&&b.push([a,e])}b.forEach(([a,b])=>{try{b(a)}catch(c){console.log("Error updating",b,a)}})}teardown(){this.listeners={}}}class ClearX{constructor(a){this.data=a,this.segments=[],this.dataObserver=new DataObserver(this),this.delimiter=".",this.onUpdateEvents=[]}triggerEvents(a){this.dataObserver.dataUpdatedAt(a)}executeUtil(a,[b,c,d]){return c&&this.triggerEvents(a),this.executeOnUpdateEvents(c,a),b}get(a,b){return get(this.data,a,b)}set(a,b,c=!1){return this.executeUtil(a,set(this.data,a,b,c))}coalesce(a,b){return coalesce(this.data,a,b)}empty(a){return this.executeUtil(a,empty(this.data,a))}insert(a,b,c){return this.executeUtil(a,insert(this.data,a,b,c))}push(a,...b){return this.executeUtil(a,push(this.data,a,...b))}unshift(a,...b){return this.executeUtil(a,unshift(this.data,a,...b))}pop(a){return this.executeUtil(a,pop(this.data,a))}shift(a){return this.executeUtil(a,shift(this.data,a))}splice(a,...b){return this.executeUtil(a,splice(this.data,a,...b))}slice(a,...b){return slice(this.data,a,...b)}sort(a,...b){return this.executeUtil(a,sort(this.data,a,...b))}ensureExists(a,b){return this.executeUtil(a,ensureExists(this.data,a,b))}delete(a){return this.executeUtil(a,del(this.data,a))}has(a){return has(this.data,a)}merge(a,b){return this.executeUtil(a,merge(this.data,a,b))}increment(a,b){return this.executeUtil(a,increment(this.data,a,b))}decrement(a,b){return this.executeUtil(a,decrement(this.data,a,b))}toggle(a){return this.executeUtil(a,toggle(this.data,a))}isEqual(a,b){return isEqual(this.data,a,b)}paths(a,b){const c=new Segment(a,b,this.delimiter,this,this.dataObserver);return this.segments.push(c),c}bind(a={}){const{to:b,afterUpdate:c,id:d,paths:e,dataTransformer:f}=a;let g=b;Array.isArray(g)&&(g=b[1]);let h;if(h=g.__segment,h)return h.link(b);h=this.paths(e,d,this.delimiter),h.onUpdate(c),h.dataTransformer(f);const i=h.link(b);return Array.isArray(b)?i:h}removeSegment(a){const b=this.segments.indexOf(a);return!!(-1<b)&&(a.teardown(),this.segments.splice(b,1),!0)}onUpdate(a){return"function"==typeof a?(this.onUpdateEvents.push(a),()=>{const b=this.onUpdateEvents.indexOf(a);-1<b&&this.onUpdateEvents.splice(b,1)}):()=>{}}executeOnUpdateEvents(a,b){this.onUpdateEvents.forEach(c=>{try{c(a,b,this.data,this)}catch(a){console.log("onUpdate",c,b)}})}_unlinkComponentFromAllSegments(a){this.segments.forEach(b=>{b.unlink(a)})}teardown(){return this.segments.forEach(a=>{a.teardown()}),this.dataObserver.teardown(),delete this.dataObserver,this.data={},!0}}exports.ClearX=ClearX;
//# sourceMappingURL=clearx.cjs.js.map
