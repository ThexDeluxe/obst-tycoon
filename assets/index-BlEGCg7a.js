(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e,t,n,r,i,a,o,s,c,l,u,d=Symbol.for(`pv`),f={},p=[],m=/^m(i|n|o|s|text|space)$/,h=Array.isArray,g=p.slice,_=Object.assign;function v(e){e&&e.parentNode&&e.remove()}function y(e,t,n){var r,i,a,o={},s=arguments.length;for(a in t)a==`key`?r=t[a]:a==`ref`&&typeof e!=`function`?i=t[a]:o[a]=t[a];return s>2&&(o.children=s>3?g.call(arguments,2):n),b(e,o,r,i,null)}function b(n,r,i,a,o){var s={type:n,props:r,key:i,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:d,__v:o||++t,__i:-1,__u:0};return!o&&e.vnode&&e.vnode(s),s}function x(e){return e.children}function S(e,t){this.props=e,this.context=t,this.__g=0}function C(e,t){if(t==null)return e.__&&C(e.__,e.__i+1);for(var n;t<e.__k.length;t++)if((n=e.__k[t])&&n.__e)return n.__e;return typeof e.type!=`function`||e.props.__P?null:C(e)}function w(t){var n,r=t.__v,i=r.__e,a=[],o=[],s=t.__P;s&&((n=_({constructor:d},r)).__v=r.__v+1,e.vnode&&e.vnode(n),ne(s,n,r,t.__n,s.namespaceURI,32&r.__u?[i]:null,a,i||C(r),32&r.__u,o),n.__v=r.__v,n.__.__k[n.__i]=n,ae(a,n,o),r.__=r.__e=null,n.__e!=i&&T(n))}function T(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),T(e)}function E(t){(8&t.__g||(t.__g|=8,r.push(t),a++))&&i==e.debounceRendering||((i=e.debounceRendering)||queueMicrotask)(D)}function D(){try{for(var e,t=1;r.length;)r.length>t&&r.sort(o),e=r.shift(),t=r.length,8&e.__g&&w(e)}finally{(a=r.length)&&(i||queueMicrotask)(D)}}function O(e,t,n,r,i,a,o,s,c,l,u){var d,m,h,g,_,v,y=r.__k||p,b=t.length;for(c=k(n,t,y,c,b),d=0;d<b;d++)(h=n.__k[d])!=null&&(m=~h.__i&&y[h.__i]||f,h.__i=d,v=ne(e,h,m,i,a,o,s,c,l,u),g=h.__e,(m.ref!=h.ref||8&m.__u)&&(m.ref&&se(m.ref,null,h,m),h.ref&&u.push(h.ref,h.__c||g,h)),_||=g,4&h.__u?(c=A(h,c,e,!m.__v),m.__e&&(m.__e=null)):typeof h.type==`function`&&v!==void 0?c=v:g&&(c=g.nextSibling),h.__u&=-21);return n.__e=_,c}function k(e,t,n,r,i){var a,o,s,c,l,u,f,p,m,g=n.length,_=g,v=0,y=0,S=e.__k=Array(i);for(a=0;a<i;a++)(o=t[a])!=null&&typeof o!=`boolean`&&typeof o!=`function`?(typeof o!=`object`||o.constructor===String?o=S[a]=b(null,o):h(o)?o=S[a]=b(x,{children:o}):o.constructor===d&&o.__b?o=S[a]=b(o.type,o.props,o.key,o.ref,o.__v):S[a]=o,c=a+v,o.__=e,o.__b=e.__b+1,s=null,~(l=o.__i=j(o,n,c,_))&&(_--,(s=n[l])&&(s.__u|=2)),s&&s.__v?(o.__u|=16,l==c-1?v--:l==c+1?v++:l!=c&&(l>c?v--:v++,y=1)):(~l||(i>g?v--:i<g&&v++),typeof o.type!=`function`&&(o.__u|=4))):S[a]=null;if(y){for(u=[],f=[],a=0;a<i;a++)if((o=S[a])&&16&o.__u){for(v=0,p=u.length;v<p;)u[m=v+p>>1]<o.__i?v=m+1:p=m;u[v]=o.__i,f[a]=v+1}for(v=u.length;a--;)f[a]&&(f[a]==v?v--:S[a].__u|=4)}if(_)for(a=0;a<g;a++)!(s=n[a])||2&s.__u||(s.__e==r&&(r=C(s)),ce(s,s));return r}function A(e,t,n,r){var i,a,o,s;if(typeof e.type==`function`){if(e.props.__P)return t;if(i=e.__k)for(a=0;a<i.length;a++)i[a]&&(i[a].__=e,t=A(i[a],t,n,!1));return t}for(t&&!t.parentNode&&(t=C(e))&&!t.parentNode&&(t=null),o=e.__e,s=t;s&&s.nodeType==8;)s=s.nextSibling;for(o!=s&&(!r&&n.moveBefore&&o.parentNode?n.moveBefore(o,t):n.insertBefore(o,t||null)),t=o;(t&&=t.nextSibling)&&t.nodeType==8&&!t.data.startsWith(`$s`););return t}function j(e,t,n,r){var i,a=e.key,o=e.type,s=t[n],c=s&&!(2&s.__u);if(s===null&&a==null||c&&a==s.key&&o==s.type)return n;if(r>+!!c){for(i=n-1;i>=0;i--)if((s=t[i])&&!(2&s.__u)&&a==s.key&&o==s.type)return i;for(i=n+1;i<t.length;i++)if((s=t[i])&&!(2&s.__u)&&a==s.key&&o==s.type)return i}return-1}function ee(e,t,n){n??=``,t[0]==`-`?e.setProperty(t,n):e[t]=n}function M(e,t,n,r,i){var a,o;if(t==`style`){if(typeof n==`string`)e.style.cssText=n;else{if(typeof r==`string`&&(e.style.cssText=r=``),r)for(t in r)n&&t in n||ee(e.style,t);if(n)for(t in n)r&&n[t]==r[t]||ee(e.style,t,n[t])}}else if(t[0]==`o`&&t[1]==`n`)typeof n!=`function`&&(n=null),typeof r!=`function`&&(r=null),(e.__e||={})[t]=n,n&&r||(o=u[t]||(u[t]=te(t)),(e.__a||={})[t]=l,a=t!=(t=t.replace(c,`$1`)),(t=t.slice(2))[0]<`a`&&(t=t.toLowerCase()),n?e.addEventListener(t,o,a):e.removeEventListener(t,o,a));else{if(i==`http://www.w3.org/2000/svg`)t=t.replace(/xlink(H|:h)/,`h`).replace(/sName$/,`s`);else if(t!=`width`&&t!=`height`&&t!=`href`&&t!=`list`&&t!=`form`&&t!=`tabIndex`&&t!=`download`&&t!=`rowSpan`&&t!=`colSpan`&&t!=`role`&&t!=`popover`&&t in e)try{e[t]=n??``;return}catch{}if(typeof n==`function`)return;n==null||!1===n&&t[4]!=`-`?e.removeAttribute(t):e.setAttribute(t,t==`popover`&&n==1?``:n)}}function te(t){return function(n){var r=this.__e;if(r){if(r=r[t],n[s]==null)n[s]=l++;else if(n[s]<this.__a[t])return;return r(e.event?e.event(n):n)}}}function ne(t,n,r,i,a,o,s,c,l,u){var f,m,g,y,b,w,T,E,D,k,A,j,ee,M,te,ne,ae,se,ue=n.type;if(n.constructor!==d)return null;128&r.__u&&(l=32&r.__u,f=r.__c.__z)&&(n.__u|=l,m=o=[],f.nodeType==8?c=re(f,o):o.push(f),c=o[0]||c),(f=e.__b)&&f(n);n:if(typeof ue==`function`){g=s.length;try{if(E=n.props,D=(f=ue.prototype)&&f.render,k=(f=ue.contextType)&&i[f.__c],A=f?k?k.props.value:f.__:i,(y=r.__c)?(n.__c=y,2&y.__g&&(y.__g|=1)):(D?n.__c=y=new ue(E,A):(n.__c=y=new S(E,A),y.constructor=ue,y.render=le),k&&k.sub(y),y.state||(y.state={}),y.__n=i,y.__g|=8,y.__h=[],y.__k=[]),D&&(y.__s||(y.__s=y.state),ue.getDerivedStateFromProps&&(y.__s==y.state&&(y.__s=_({},y.__s)),_(y.__s,ue.getDerivedStateFromProps(E,y.__s)))),b=y.props,w=y.state,y.__v=n,r.__c){if(E!==b&&D&&!ue.getDerivedStateFromProps&&y.componentWillReceiveProps&&y.componentWillReceiveProps(E,A),n.__v==r.__v&&!(8&y.__g)||!(4&y.__g)&&y.shouldComponentUpdate&&!1===y.shouldComponentUpdate(E,y.__s,A)){n.__v!=r.__v&&(y.props=E,y.state=y.__s,y.__g&=-9),n.__e=r.__e,n.__k=r.__k,n.__k.some(function(e){e&&(e.__=n)}),p.push.apply(y.__h,y.__k),y.__k=[],y.__h.length&&s.push(y),c=C(r);break n}y.componentWillUpdate&&y.componentWillUpdate(E,y.__s,A),D&&y.componentDidUpdate&&y.__h.push(function(){y.componentDidUpdate(b,w,T)})}else D&&!ue.getDerivedStateFromProps&&y.componentWillMount&&y.componentWillMount(),D&&y.componentDidMount&&y.__h.push(y.componentDidMount);y.context=A,y.props=E,y.__P=t,y.__g&=-5,j=e.__r,ee=D?25:0;do y.__g&=-9,j&&j(n),f=y.render(y.props,y.state=y.__s,y.context);while(8&y.__g&&++ee<25);D&&(p.push.apply(y.__h,y.__k),y.__k=[]),y.state=y.__s,y.getChildContext&&(i=_({},i,y.getChildContext())),D&&r.__c&&y.getSnapshotBeforeUpdate&&(T=y.getSnapshotBeforeUpdate(b,w)),M=f&&f.type===x&&f.key==null?f.props.children:f,E.__P&&(f=c,a=(t=E.__P).namespaceURI,l=o=null,r.props&&r.props.__P!=t&&(r.__k.some(function(e){e&&ce(e,e)}),r.__k=null),c=r.__k?C(r,0):null),c=O(t,h(M)?M:[M],n,r,i,a,o,s,c,l,u),E.__P&&(n.__e=null,c=f),n.__u&=-161,m&&m.some(v),y.__h.length&&s.push(y),1&y.__g&&(y.__g&=-4)}catch(t){if(s.length=g,n.__v=null,l||o){if(t&&t.then){if(n.__u|=128|l,o){for(~(ae=o.indexOf(c||void 0))||(ae=o.length);(se=o[ae-1])&&se.nodeType==8;)ae--;for(;ae<o.length;ae++)if(se=o[ae]){if(o[ae]=null,te){if(se==ne)break}else{if(se.nodeType!=8)break;se.data.startsWith(`$s`)&&(ne=re(te=se))}}}if(!te){for(;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;te=c}(f=re(te=n.__c.__z||(n.__c.__z=te)))?(n.__e=te,c=f):n.__e=c,c&&=c.nextSibling}else o&&o.some(v)}else n.__e=r.__e;n.__k||=r.__k||[],t&&t.then||ie(n),e.__e(t,n,r)}}else c=n.__e=oe(r.__e,n,r,i,a,o,s,l,u,t);return(f=e.diffed)&&f(n),c}function re(e,t){if(e&&e.nodeType==8&&e.data.startsWith(`$s`))for(var n=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith(`$s`))n++;else if(e.data.startsWith(`/$s`)&&!--n)return e}t&&t.push(e)}}function ie(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(ie))}function ae(t,n,r){for(var i=0;i<r.length;)se(r[i++],r[i++],r[i++]);e.__c&&e.__c(n,t),t.some(function(n){try{t=n.__h,n.__h=[],t.some(function(e){e.call(n)})}catch(t){e.__e(t,n.__v)}})}function oe(t,n,r,i,a,o,s,c,l,u){var d,p,_,y,b,x,S,w,T=r.props||f,E=n.props,D=n.type;if(D==`svg`?a=`http://www.w3.org/2000/svg`:D==`math`?a=`http://www.w3.org/1998/Math/MathML`:a||=`http://www.w3.org/1999/xhtml`,o){for(d=0;d<o.length;d++)if((b=o[d])&&(D?b.localName==D:b.nodeType==3)){t=b,o[d]=null;break}}if(!t){if(w=u.ownerDocument||document,!D)return w.createTextNode(E);t=w.createElementNS(a,D,E.is?E:u),c&&=(e.__m&&e.__m(n,o),!1),o=null}if(D){if(u=D==`template`&&t.content||t,o=D==`textarea`&&E.defaultValue!=null?null:o&&g.call(u.childNodes),!c&&o)for(T={},d=0;d<t.attributes.length;d++)T[(b=t.attributes[d]).name]=b.value;for(d in T)b=T[d],d==`dangerouslySetInnerHTML`?_=b:d==`children`||d in E||d==`value`&&`defaultValue`in E||d==`checked`&&`defaultChecked`in E||M(t,d,null,b,a);for(d in E)b=E[d],d==`children`?y=b:d==`dangerouslySetInnerHTML`?p=b:d==`value`?x=b:d==`checked`?S=b:c&&typeof b!=`function`||T[d]===b||M(t,d,b,T[d],a);p?(c||_&&(p.__html==_.__html||p.__html==t.innerHTML)||(t.innerHTML=p.__html),n.__k=[]):(_&&(t.textContent=``),(D==`foreignObject`||a==`http://www.w3.org/1998/Math/MathML`&&m.test(D))&&(a=`http://www.w3.org/1999/xhtml`),O(u,h(y)?y:[y],n,r,i,a,o,s,o?o[0]:r.__k&&C(r,0),c,l),o&&o.some(v)),c&&D!=`textarea`||(d=`value`,D==`progress`&&x==null?t.removeAttribute(d):x==null||x===t[d]&&(D!=`progress`||x)||M(t,d,x,T[d],a),d=`checked`,S!=null&&S!=t[d]&&M(t,d,S,T[d],a))}else T===E||c&&t.data==E||(t.data=E);return t}function se(t,n,r,i){try{typeof t==`function`?n?n.__x=t(n)||1:(i&&=i.__c||i.__e)&&(n=i.__x)&&(i.__x=null,typeof n==`function`?n():t(null)):t.current=n}catch(t){e.__e(t,r)}}function ce(t,n,r){var i,a,o,s;if(e.unmount&&e.unmount(t),!(i=t.ref)||i.current&&i.current!=t.__e||se(i,null,n,t),i=t.__c){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(t){e.__e(t,n)}i.__P=i.__n=null}if(i=t.__k)for(s=0;s<i.length;s++)i[s]&&ce(i[s],n,typeof t.type!=`function`||r&&!t.props.__P);!r&&(i=t.__c)&&(i=i.__z)&&(a=re(i,o=[]))&&(i==t.__e&&o.some(v),v(a),v(i)),r||v(t.__e),t.__e=t.__c=t.__=null}function le(e,t,n){return this.constructor(e,n)}function ue(t,n){var r,i,a,o;e.__&&e.__(t,n),n.nodeType==9&&(n=n.documentElement),i=(r=t&&32&t.__u)?null:n.__k,n.__k=b(x,{children:[t]}),a=[],o=[],ne(n,n.__k,i||f,f,n.namespaceURI,i?null:n.firstChild?g.call(n.childNodes):null,a,i?i.__e:n.firstChild,r,o),ae(a,n.__k,o),n.__k.props.children=null}e={__e:function(e,t,n,r){for(var i,o,s;t=t.__;)if((i=t.__c)&&!(1&i.__g)){i.__g|=4;try{if((s=(o=i.constructor)&&o.getDerivedStateFromError)&&i.setState(o.getDerivedStateFromError(e)),i.componentDidCatch&&(i.componentDidCatch(e,r||{}),s=1),s&&8&i.__g)return void(i.__g|=2)}catch(t){e=t}}throw a=0,e}},t=0,n=function(e){return e!=null&&e.constructor===d},S.prototype.setState=function(e,t){var n=this.__s;n&&n!=this.state||(n=this.__s=_({},this.state)),typeof e==`function`&&(e=e(_({},n),this.props)),e&&(_(n,e),this.__v&&(t&&this.__k.push(t),E(this)))},S.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),E(this))},S.prototype.render=x,r=[],a=0,o=function(e,t){return e.__v.__b-t.__v.__b},s=Symbol(),c=/(PointerCapture)$|Capture$/i,l=0,u={};var de,N,fe,pe,me=Object.is,he=0,ge=[],_e=[],ve=e,ye=ve.__b,be=ve.__r,xe=ve.diffed,Se=ve.__c,Ce=ve.unmount,we=ve.__;function P(e,t){ve.__h&&ve.__h(N,e,he||t),he=0;var n=N.__H||(N.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function Te(e){return he=1,Ee(Pe,e)}function Ee(e,t,n){var r=P(de++,2);if(r.t=e,!r.__c&&(r.__=[n?n(t):Pe(void 0,t),function(e){var t=(r.__N||r.__)[0],n=r.t(t,e);me(t,n)||(r.__N=[n,r.__[1]],r.__c.setState({}))}],r.__c=N,!N.__f)){N.__f=!0;var i=N.shouldComponentUpdate;N.shouldComponentUpdate=function(e,t,n){var r=this.__H;if(!r)return!0;var a=!1,o=this.props!=e;if(r.__.some(function(e){e.__N&&(a=!0,me(e.__[0],e.__N[0])||(o=!0))}),i){var s=i.call(this,e,t,n);return a?s||o:s}return!a||o}}return r.__}function De(e,t){var n=P(de++,3);!ve.__s&&Ne(n.__H,t)&&(n.__P=!0,n.__=e,n.u=t,N.__H.__h.push(n))}function F(e){return he=5,Oe(function(){return{current:e}},[])}function Oe(e,t){var n=P(de++,7);return Ne(n.__H,t)&&(n.__=e(),n.__H=t),n.__}function I(){var e;do{for(;e=_e.shift();)try{je(e)}catch(t){ve.__e(t,{__:(e=e.__P)&&e.__v})}for(;e=ge.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(je),t.__h.some(Me),t.__h=[]}catch(n){t.__h=[],ve.__e(n,e.__v)}}}while(_e.length)}ve.__b=function(e){N=null,ye&&ye(e)},ve.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),we&&we(e,t)},ve.__r=function(e){be&&be(e),de=0;var t=(N=e.__c).__H;t&&(fe==N?N.__h=[]:(t.__h.some(je),t.__h.some(Me),de=0),t.__h=[],t.__.some(function(e){e.__N&&(e.__=e.__N),e.u=e.__N=void 0})),fe=N},ve.diffed=function(e){xe&&xe(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&Ae(ge.push(t)),t.__H.__.some(function(e){e.u&&(e.__H=e.u)})),fe=N=null},ve.__c=function(e,t){t.some(function(e){try{e.__h.some(je),e.__h=e.__h.filter(function(e){return!e.__||Me(e)})}catch(t){e.__h=[function(){throw t}]}}),Se&&Se(e,t)},ve.unmount=function(e){Ce&&Ce(e);var t,n,r=e.__c;r&&r.__H&&(r.__H.__.some(function(r){try{if(r.__P&&r.__c){if(n===void 0){for(n=e.__;n&&(!n.__c||!n.__c.__P);)n=n.__;n&&=n.__c}r.__P=n,Ae(_e.push(r))}else je(r)}catch(e){t=e}}),r.__H=void 0,t&&ve.__e(t,r.__v))};var L=typeof requestAnimationFrame==`function`;function ke(e){var t,n=function(){clearTimeout(r),L&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);L&&(t=requestAnimationFrame(n))}function Ae(e){e!=1&&pe==ve.requestAnimationFrame||((pe=ve.requestAnimationFrame)||ke)(I)}function je(e){var t=N,n=e.__c;typeof n==`function`&&(e.__c=void 0,n()),N=t}function Me(e){var t=N;e.__c=e.__(),N=t}function Ne(e,t){return!e||e.length!=t.length||t.some(function(t,n){return!me(t,e[n])})}function Pe(e,t){return typeof t==`function`?t(e):t}var Fe=Symbol.for(`preact-signals`);function Ie(){if(Ve>1)Ve--;else{var e,t=!1;for((function(){var e=Ge;for(Ge=void 0;e!==void 0;){var t=e.S;if(t.v===e.v)for(var n=t.t;n!==void 0;n=n.x)n.i===e.i&&(n.i=t.i);e=e.o}})();Be!==void 0;){var n=Be;for(Be=void 0,He++;n!==void 0;){var r=n.u;if(n.u=void 0,n.f&=-3,!(8&n.f)&&Xe(n))try{n.c()}catch(n){t||=(e=n,!0)}n=r}}if(He=0,Ve--,t)throw e}}function Le(e){if(Ve>0)return e();We=++Ue,Ve++;try{return e()}finally{Ie()}}var Re,R=void 0;function ze(e){var t=R,n=Re;R=void 0,Re=void 0;try{return e()}finally{R=t,Re=n}}var Be=void 0,Ve=0,He=0,Ue=0,We=0,Ge=void 0,Ke=0;function qe(e){if(R!==void 0){var t=e.n;if(t===void 0||t.t!==R)return t={i:0,S:e,p:R.s,n:void 0,t:R,e:void 0,x:void 0,r:t},R.s!==void 0&&(R.s.n=t),R.s=t,e.n=t,32&R.f&&e.S(t),t;if(t.i===-1)return t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=R.s,t.n=void 0,R.s.n=t,R.s=t),t}}function Je(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=t?.watched,this.Z=t?.unwatched,this.name=t?.name}Je.prototype.brand=Fe,Je.prototype.h=function(){return!0},Je.prototype.S=function(e){var t=this,n=this.t;n!==e&&e.e===void 0&&(e.x=n,this.t=e,n===void 0?ze(function(){var e;(e=t.W)==null||e.call(t)}):n.e=e)},Je.prototype.U=function(e){var t=this;if(this.t!==void 0){var n=e.e,r=e.x;n!==void 0&&(n.x=r,e.e=void 0),r!==void 0&&(r.e=n,e.x=void 0),e===this.t&&(this.t=r,r===void 0&&ze(function(){var e;(e=t.Z)==null||e.call(t)}))}},Je.prototype.subscribe=function(e){var t=this;return at(function(){var n=t.value;ze(function(){return e(n)})},{name:`sub`})},Je.prototype.valueOf=function(){return this.value},Je.prototype.toString=function(){return this.value+``},Je.prototype.toJSON=function(){return this.value},Je.prototype.peek=function(){var e=this;return ze(function(){return e.value})},Object.defineProperty(Je.prototype,"value",{get:function(){var e=qe(this);return e!==void 0&&(e.i=this.i),this.v},set:function(e){if(e!==this.v){if(He>100)throw Error(`Cycle detected`);(function(e){Ve!==0&&He===0&&e.l!==We&&(e.l=We,Ge={S:e,v:e.v,i:e.i,o:Ge})})(this),this.v=e,this.i++,Ke++,Ve++;try{for(var t=this.t;t!==void 0;t=t.x)t.t.N()}finally{Ie()}}}});function Ye(e,t){return new Je(e,t)}function Xe(e){for(var t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function Ze(e){for(var t=e.s;t!==void 0;t=t.n){var n=t.S.n;if(n!==void 0&&(t.r=n),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function Qe(e){for(var t=e.s,n=void 0;t!==void 0;){var r=t.p;t.i===-1?(t.S.U(t),r!==void 0&&(r.n=t.n),t.n!==void 0&&(t.n.p=r)):n=t,t.S.n=t.r,t.r!==void 0&&(t.r=void 0),t=r}e.s=n}function $e(e,t){Je.call(this,void 0,t),this.x=e,this.s=void 0,this.g=Ke-1,this.f=4}$e.prototype=new Je,$e.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Ke))return!0;if(this.g=Ke,this.f|=1,this.i>0&&!Xe(this))return this.f&=-2,!0;var e=R;try{Ze(this),R=this;var t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return R=e,Qe(this),this.f&=-2,!0},$e.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(var t=this.s;t!==void 0;t=t.n)t.S.S(t)}Je.prototype.S.call(this,e)},$e.prototype.U=function(e){if(this.t!==void 0&&(Je.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(var t=this.s;t!==void 0;t=t.n)t.S.U(t)}},$e.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var e=this.t;e!==void 0;e=e.x)e.t.N()}},Object.defineProperty($e.prototype,"value",{get:function(){if(1&this.f)throw Error(`Cycle detected`);var e=qe(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}});function et(e,t){return new $e(e,t)}function tt(e){var t=e.j;if(e.j=void 0,typeof t==`function`){Ve++;var n=R;R=void 0;try{t()}catch(t){throw e.f&=-2,e.f|=8,nt(e),t}finally{R=n,Ie()}}}function nt(e){for(var t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,tt(e)}function rt(e){if(R!==this)throw Error(`Out-of-order effect`);Qe(this),R=e,this.f&=-2;try{8&this.f&&nt(this)}finally{Ie()}}function it(e,t){this.x=e,this.j=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=t?.name,Re&&Re.push(this)}it.prototype.c=function(){var e=this.S();try{if(8&this.f||this.x===void 0)return;var t=this.x();typeof t==`function`&&(this.j=t)}finally{e()}},it.prototype.S=function(){if(1&this.f)throw Error(`Cycle detected`);this.f|=1,this.f&=-9,tt(this),Ze(this),Ve++;var e=R;return R=this,rt.bind(this,e)},it.prototype.N=function(){2&this.f||(this.f|=2,this.u=Be,Be=this)},it.prototype.d=function(){this.f|=8,1&this.f||nt(this)},it.prototype.dispose=function(){this.d()};function at(e,t){var n=new it(e,t);try{n.c()}catch(e){throw n.d(),e}var r=n.d.bind(n);return r[Symbol.dispose]=r,r}var ot,st,ct=typeof window<`u`&&!!window.__PREACT_SIGNALS_DEVTOOLS__,lt=[];at(function(){ot=this.N})();function ut(t,n){e[t]=n.bind(null,e[t]||function(){})}function dt(e){if(st){var t=st;st=void 0,t()}st=e&&e.S()}function ft(e){var t=this,r=e.data,i=mt(r);i.name=`ReactiveDom`,i.value=r;var a=Oe(function(){for(var e=t,r=t.__v;r=r.__;)if(r.__c){r.__c.__$f|=4;break}var a=et(function(){var e=i.value.value;return e===0?0:!0===e?``:e||``}),o=et(function(){return!Array.isArray(a.value)&&!n(a.value)}),s=at(function(){if(this.N=_t,o.value){var t=a.value;e.__v&&e.__v.__e&&e.__v.__e.nodeType===3&&(e.__v.__e.data=t)}}),c=t.__$u.d;return t.__$u.d=function(){s(),c.call(this)},[o,a]},[]),o=a[0],s=a[1];return o.value?s.peek():s.value}ft.displayName=`ReactiveTextNode`,Object.defineProperties(Je.prototype,{constructor:{configurable:!0,value:y(x,null).constructor},type:{configurable:!0,value:ft},props:{configurable:!0,get:function(){var e=this;return{data:{get value(){return e.value}}}}},__b:{configurable:!0,value:1}}),ut(`__b`,function(e,t){if(dt(),typeof t.type==`string`){var n,r=t.props;for(var i in r)if(i!==`children`){var a=r[i];a instanceof Je&&(n||(t.__np=n={}),n[i]=a,r[i]=a.peek())}}e(t)}),ut(`__r`,function(e,t){if(e(t),t.type!==x){dt();var n,r=t.__c;r&&(r.__$f&=-2,(n=r.__$u)===void 0&&(r.__$u=n=function(e,t){var n;return at(function(){n=this},{name:t}),n.c=e,n}(function(e){return function(){var t;ct&&((t=this.y)==null||t.call(this)),e.__$f|=1,e.setState({})}}(r),typeof t.type==`function`?t.type.displayName||t.type.name:``))),dt(n)}}),ut(`__e`,function(e,t,n,r){dt(),e(t,n,r)}),ut(`diffed`,function(e,t){dt();var n;if(typeof t.type==`string`&&(n=t.__e)){var r=t.__np,i=t.props,a=n.U;if(a)for(var o in a){var s=a[o];s===void 0||r&&o in r||(s.d(),a[o]=void 0)}if(r)for(var c in a||(a={},n.U=a),r){var l=a[c],u=r[c];l===void 0?(l=pt(n,c,u,i),a[c]=l):l.o(u,i)}}e(t)});function pt(e,t,n,r){var i=t in e&&e.ownerSVGElement===void 0,a=Ye(n);return{o:function(e,t){a.value=e,r=t},d:at(function(){this.N=_t;var n=a.value.value;r[t]!==n&&(r[t]=n,i?e[t]=n:n!=null&&(!1!==n||t[4]===`-`)?e.setAttribute(t,n):e.removeAttribute(t))})}}ut(`unmount`,function(e,t){if(typeof t.type==`string`){var n=t.__e;if(n){var r=n.U;if(r)for(var i in n.U=void 0,r){var a=r[i];a&&a.d()}}var o=t.__np;if(o){var s=t.props;for(var c in o)s[c]=o[c]}t.__np=void 0}else{var l=t.__c;if(l){l.__$f|=8;var u=l.__$u;u&&(l.__$u=void 0,u.d())}}e(t)}),ut(`__h`,function(e,t,n,r){r<3&&(t.__$f|=2),e(t,n,r)}),S.prototype.shouldComponentUpdate=function(e,t){if(this.__R)return!0;var n=this.__$u,r=n&&n.s!==void 0;for(var i in t)return!0;if(this.__f||typeof this.u==`boolean`&&!0===this.u){var a=2&this.__$f;if(!(r||a||4&this.__$f)||1&this.__$f)return!0}else if(!(r||4&this.__$f)||3&this.__$f)return!0;for(var o in e)if(o!==`__source`&&e[o]!==this.props[o])return!0;for(var s in this.props)if(!(s in e))return!0;return!1};function mt(e,t){return Oe(function(){return Ye(e,t)},[])}var ht=function(e){queueMicrotask(function(){queueMicrotask(e)})};function gt(){Le(function(){for(var e;e=lt.shift();)ot.call(e)})}function _t(){lt.push(this)===1&&(e.requestAnimationFrame||ht)(gt)}var vt={sale:.5,unload:.14,click:.05,dice:.3},yt=class{ctx=null;master=null;fx=null;amb=null;noise=null;city=null;cityFilter=null;last=new Map;volumes={muted:!1,effects:.7,ambience:.4};active=!0;cricketTimer=0;evening=!1;unlock(){if(this.ctx){this.ctx.state===`suspended`&&this.active&&this.ctx.resume().catch(()=>void 0);return}let e=window.AudioContext??window.webkitAudioContext;if(!e)return;try{this.ctx=new e}catch{return}let t=this.ctx;this.master=t.createGain(),this.master.connect(t.destination),this.fx=t.createGain(),this.fx.connect(this.master),this.amb=t.createGain(),this.amb.connect(this.master);let n=t.sampleRate*2;this.noise=t.createBuffer(1,n,t.sampleRate);let r=this.noise.getChannelData(0),i=0;for(let e=0;e<n;e++){let t=Math.random()*2-1;i=(i+.02*t)/1.02,r[e]=i*3.5}this.startCity(),this.applyVolumes()}get running(){return!!this.ctx&&this.ctx.state===`running`}setVolumes(e){this.volumes={...e},this.applyVolumes()}setActive(e){if(this.active=e,!this.ctx||!this.master)return;let t=this.ctx.currentTime;this.master.gain.cancelScheduledValues(t),this.master.gain.setTargetAtTime(e&&!this.volumes.muted?1:0,t,e?.08:.01),e?this.ctx.resume().catch(()=>void 0):this.ctx.suspend().catch(()=>void 0)}applyVolumes(){if(!this.ctx||!this.master||!this.fx||!this.amb)return;let e=this.ctx.currentTime;this.master.gain.setTargetAtTime(this.volumes.muted||!this.active?0:1,e,.05),this.fx.gain.setTargetAtTime(this.volumes.effects,e,.05),this.amb.gain.setTargetAtTime(this.volumes.ambience,e,.2)}startCity(){let e=this.ctx,t=e.createBufferSource();t.buffer=this.noise,t.loop=!0,this.cityFilter=e.createBiquadFilter(),this.cityFilter.type=`lowpass`,this.cityFilter.frequency.value=420,this.city=e.createGain(),this.city.gain.value=0,t.connect(this.cityFilter).connect(this.city).connect(this.amb),t.start()}ambience(e,t,n){if(!this.ctx||!this.city||!this.cityFilter)return;let r=this.ctx.currentTime,i=e>=7&&e<20?1:.55,a=n>=4?.45:n>=2?.75:1;this.city.gain.setTargetAtTime((.12+.35*Math.min(1,t))*i*a,r,.8),this.cityFilter.frequency.setTargetAtTime(300+260*Math.min(1,t),r,1),this.evening=e>=20,this.evening&&this.active&&!this.cricketTimer?this.cricketTimer=window.setInterval(()=>this.cricket(),700):this.evening&&this.active||!this.cricketTimer||(clearInterval(this.cricketTimer),this.cricketTimer=0)}cricket(){if(!this.ctx||!this.amb||!this.running||Math.random()<.35)return;let e=this.ctx,t=e.currentTime;for(let n=0;n<3;n++){let r=e.createOscillator(),i=e.createGain();r.frequency.value=4300+Math.random()*300,i.gain.setValueAtTime(0,t+n*.06),i.gain.linearRampToValueAtTime(.025,t+n*.06+.01),i.gain.linearRampToValueAtTime(0,t+n*.06+.04),r.connect(i).connect(this.amb),r.start(t+n*.06),r.stop(t+n*.06+.05)}}play(e){if(!this.ctx||!this.fx||this.volumes.muted||!this.active||this.ctx.state!==`running`)return;let t=this.ctx.currentTime,n=vt[e];n&&t-(this.last.get(e)??-1)<n||(this.last.set(e,t),Ct[e](this.ctx,this.fx,this.noise,t))}};function bt(e,t,n,r,i,a,o=`sine`,s){let c=e.createOscillator(),l=e.createGain();c.type=o,c.frequency.setValueAtTime(r,n),s&&c.frequency.exponentialRampToValueAtTime(s,n+i),l.gain.setValueAtTime(0,n),l.gain.linearRampToValueAtTime(a,n+.006),l.gain.exponentialRampToValueAtTime(1e-4,n+i),c.connect(l).connect(t),c.start(n),c.stop(n+i+.02)}function xt(e,t,n,r,i,a,o,s,c){let l=e.createBufferSource();l.buffer=n;let u=e.createBiquadFilter();u.type=o,u.frequency.setValueAtTime(s,r),c&&u.frequency.exponentialRampToValueAtTime(c,r+i),u.Q.value=1.2;let d=e.createGain();d.gain.setValueAtTime(0,r),d.gain.linearRampToValueAtTime(a,r+.01),d.gain.exponentialRampToValueAtTime(1e-4,r+i),l.connect(u).connect(d).connect(t),l.start(r,Math.random()),l.stop(r+i+.05)}function St(e,t,n,r,i){bt(e,t,r,130,.16,i,`sine`,55),xt(e,t,n,r,.06,i*.5,`lowpass`,900)}var Ct={sale:(e,t,n,r)=>{bt(e,t,r,1760,.22,.05),bt(e,t,r+.05,2349,.3,.04)},truck:(e,t,n,r)=>{let i=e.createOscillator(),a=e.createBiquadFilter(),o=e.createGain();i.type=`sawtooth`,i.frequency.setValueAtTime(70,r),i.frequency.linearRampToValueAtTime(48,r+1.1),a.type=`lowpass`,a.frequency.value=280,o.gain.setValueAtTime(0,r),o.gain.linearRampToValueAtTime(.12,r+.2),o.gain.linearRampToValueAtTime(1e-4,r+1.2),i.connect(a).connect(o).connect(t),i.start(r),i.stop(r+1.25),xt(e,t,n,r+.9,.35,.05,`bandpass`,3200,1800)},unload:(e,t,n,r)=>St(e,t,n,r,.12),warn:(e,t,n,r)=>{bt(e,t,r,220,.14,.09,`square`),bt(e,t,r+.2,196,.18,.09,`square`)},click:(e,t,n,r)=>xt(e,t,n,r,.025,.06,`highpass`,2500),sheetOpen:(e,t,n,r)=>xt(e,t,n,r,.18,.05,`bandpass`,600,2400),sheetClose:(e,t,n,r)=>xt(e,t,n,r,.16,.045,`bandpass`,2200,500),build:(e,t,n,r)=>{for(let i=0;i<3;i++)St(e,t,n,r+i*.16,.12);bt(e,t,r+.55,880,.35,.05),bt(e,t,r+.62,1320,.4,.04)},stamp:(e,t,n,r)=>{St(e,t,n,r,.18),xt(e,t,n,r+.01,.12,.05,`highpass`,1800)},good:(e,t,n,r)=>{bt(e,t,r,660,.18,.06,`triangle`),bt(e,t,r+.1,990,.25,.06,`triangle`)},bad:(e,t,n,r)=>{bt(e,t,r,440,.2,.06,`triangle`),bt(e,t,r+.12,311,.3,.06,`triangle`)},dirty:(e,t,n,r)=>{bt(e,t,r,98,.6,.12,`sine`,70),xt(e,t,n,r,.4,.03,`lowpass`,300)},dice:(e,t,n,r)=>{for(let i=0;i<5;i++)xt(e,t,n,r+i*.05+Math.random()*.02,.03,.06,`bandpass`,2600+Math.random()*800)},roundWin:(e,t,n,r)=>bt(e,t,r,784,.18,.05,`triangle`),roundLose:(e,t,n,r)=>bt(e,t,r,262,.22,.05,`triangle`),conquer:(e,t,n,r)=>{bt(e,t,r,523,.18,.07,`triangle`),bt(e,t,r+.14,659,.18,.07,`triangle`),bt(e,t,r+.28,784,.45,.08,`triangle`)},defeat:(e,t,n,r)=>{bt(e,t,r,196,.3,.08,`triangle`),bt(e,t,r+.22,147,.5,.08,`triangle`)},alarm:(e,t,n,r)=>{for(let n=0;n<3;n++)bt(e,t,r+n*.22,880,.12,.06,`square`)}},wt=new yt,z=[`underground`,`station`,`oldtown`,`scene`,`shopping`,`banking`],Tt=[`apple`,`banana`,`strawberry`,`grape`,`mango`,`dragonfruit`],Et={ticksPerSecond:10,secondsPerGameHour:15,dayStartHour:6,dayEndHour:22,speeds:[0,1,2,4],maxTicksPerFrame:12},Dt=Et.ticksPerSecond*Et.secondsPerGameHour,Ot=Et.dayEndHour-Et.dayStartHour,kt=Dt*Ot;function At(e){return Math.round(e*Et.ticksPerSecond)}var jt={money:150,dealers:1,shelves:2,fighters:0,district:`underground`},Mt={apple:{id:`apple`,crateCost:10,unitPrice:1,shelfDays:8,cooledDays:16,color:13123631},banana:{id:`banana`,crateCost:12,unitPrice:1.2,shelfDays:4,cooledDays:null,color:15254855},strawberry:{id:`strawberry`,crateCost:18,unitPrice:1.8,shelfDays:2,cooledDays:4,color:14235210},grape:{id:`grape`,crateCost:21,unitPrice:2.1,shelfDays:3,cooledDays:6,color:8014476},mango:{id:`mango`,crateCost:28,unitPrice:2.8,shelfDays:5,cooledDays:8,color:15769648},dragonfruit:{id:`dragonfruit`,crateCost:36,unitPrice:3.6,shelfDays:6,cooledDays:10,color:14174094}},Nt={kioskPerDay:3,kioskFactor:2,lowFreshness:.4,lowFreshnessPrice:.6,qualityStep:.1,coldRoomCrates:12,coldRoomCost:600,rangeDays:3,extrapolateAfterHours:4,minAvailShare:.25,ampelGreen:1.5,ampelYellow:.5,startCrates:[{fruit:`apple`,crates:4}]},Pt={hour:6,arriveSeconds:5,unloadSecondsPerCrate:.3,leaveSeconds:4},Ft=[{id:`brinkmann`,fruits:[`apple`],capacity:12,priceFactor:1,quality:2,trait:`honest`,owner:`free`,loyalty:60,fear:0},{id:`lindenau`,fruits:[`apple`,`strawberry`],capacity:10,priceFactor:1.1,quality:3,trait:`stubborn`,owner:`free`,loyalty:45,fear:0},{id:`kessler`,fruits:[`banana`,`mango`],capacity:12,priceFactor:1,quality:2,trait:`greedy`,owner:`free`,loyalty:40,fear:0},{id:`sonnenhang`,fruits:[`grape`,`strawberry`],capacity:10,priceFactor:.95,quality:2,trait:`fearful`,owner:`free`,loyalty:45,fear:10},{id:`petersen`,fruits:[`banana`,`grape`],capacity:12,priceFactor:.9,quality:1,trait:`fearful`,owner:`gang`,loyalty:20,fear:30},{id:`exotica`,fruits:[`dragonfruit`,`mango`],capacity:10,priceFactor:1.05,quality:3,trait:`greedy`,owner:`gang`,loyalty:15,fear:20}],It={stubborn:{threshold:15,price:1,loyalty:1,fear:.7,fearGain:.7,pressure:-.2,dirty:0},fearful:{threshold:0,price:1,loyalty:1,fear:1.6,fearGain:1.5,pressure:.2,dirty:0},greedy:{threshold:5,price:1.8,loyalty:.6,fear:1,fearGain:1,pressure:0,dirty:.1},honest:{threshold:0,price:.8,loyalty:1.4,fear:1,fearGain:1,pressure:0,dirty:-.25}},Lt={durations:[3,7,14],defaultDays:7,pricePctMin:70,pricePctMax:150,pricePctStep:5,suggestChance:.75,exclusivePct:20,baseChance:.65,priceWeight:2,loyaltyWeight:.6,fearWeight:.5,memoryWeight:5,minChance:.02,maxChance:.98,renewMinChance:.5,firstContractMinChance:.5,rejectCooldownDays:1,cancelLoyalty:-10,loyaltyPerDay:1,backlogLoyalty:-2,fearDiscount:.002,producerPrice:.6},Rt={advance:{kind:`clean`,chance:.95,cost:0,heat:0,loyalty:20,deliveries:3},bind:{kind:`clean`,chance:.85,cost:0,heat:0,loyalty:10,days:14},helpers:{kind:`clean`,chance:.9,cost:0,heat:0,fighters:2,days:3,capacity:.3},protect:{kind:`pressure`,chance:.65,cost:0,heat:3,fear:25,fighters:2,price:-.15},refuse:{kind:`pressure`,chance:.9,cost:0,heat:1,fear:15,days:2},poach:{kind:`pressure`,chance:.7,cost:150,heat:4,fear:10,capacity:-.5},soil:{kind:`dirty`,chance:.6,cost:400,heat:12,price:-.3},inspect:{kind:`dirty`,chance:.7,cost:200,heat:8,days:5},takeover:{kind:`dirty`,chance:.8,cost:4e3,heat:15,fearMin:70}},zt={cooldownDays:2,actionMinChance:.05,actionMaxChance:.98,bindBonus:.1,memorySlots:4,defectShare:.5,failHeatFactor:2,failLoyalty:-20,fearDecay:5,loyaltyDrift:1,betrayFear:60,betrayLoyalty:20,betrayChance:.1,testifyHeat:25},Bt={chancePerDay:.5,hail:{days:3,capacity:.5,helpCost:100,helpLoyalty:15,penaltyFear:10,penaltyMoney:60},renegotiate:{pricePct:10,acceptLoyalty:5,refuseLoyalty:-15},harvest:{extra:.5,price:.5},bio:{quality:1,pricePct:15,refuseLoyalty:-5}},Vt={max:100,decayPerDay:3,watched:30,investigation:60,charges:85},Ht={demandPerSpot:130,saturatedFactor:.25,overflow:.5,premiumMax:1.6},Ut={underground:{apple:3,banana:3,strawberry:1,grape:1,mango:.5,dragonfruit:.5},station:{apple:3,banana:4,strawberry:1,grape:1,mango:1,dragonfruit:.5},oldtown:{apple:1.5,banana:1,strawberry:3,grape:2,mango:2,dragonfruit:1.5},scene:{apple:1,banana:1,strawberry:3,grape:4,mango:1.5,dragonfruit:1},shopping:{apple:1,banana:1,strawberry:2.5,grape:2,mango:3,dragonfruit:2},banking:{apple:.5,banana:.5,strawberry:1.5,grape:2,mango:3,dragonfruit:4}},Wt={base:.7},Gt={underground:{id:`underground`,customers:16,priceLevel:1,garrison:0,regenPerDay:0,rush:[[7,9],[17,20]],pedestrianShare:.13},station:{id:`station`,customers:26,priceLevel:1.15,garrison:4,regenPerDay:1,rush:[[6,9],[16,19]],pedestrianShare:.2},oldtown:{id:`oldtown`,customers:30,priceLevel:1.3,garrison:10,regenPerDay:1,rush:[[11,18]],pedestrianShare:.2},scene:{id:`scene`,customers:28,priceLevel:1.4,garrison:16,regenPerDay:1,rush:[[12,15],[19,22]],pedestrianShare:.14},shopping:{id:`shopping`,customers:34,priceLevel:1.6,garrison:24,regenPerDay:2,rush:[[10,19]],pedestrianShare:.18},banking:{id:`banking`,customers:38,priceLevel:2,garrison:40,regenPerDay:2,rush:[[7,9],[12,14],[17,19]],pedestrianShare:.15}},Kt=1.5,qt=.5,Jt={baseCost:60,costGrowth:1.4,maxPerSpot:2,buyChance:.85,speed:2.2,setupSeconds:1,crates:1,distanceHalf:70,waitSeconds:1},Yt=[{id:`handcart`,cost:400,crates:2,speed:2.2,unlock:`oldtown`},{id:`cargobike`,cost:2500,crates:4,speed:3.2,unlock:`shopping`}],Xt={cratesPerShelf:6,baseCost:40,costGrowth:1.45},Zt={baseCost:25,costPerOwned:3,max:60},Qt={attackerDice:3,defenderDice:2,maxAutoRounds:200},$t=[20,30,40,40,50,60,60,80,150,300,400,600,1500],en={firstEarnings:15,dealers:2,shelves:3,fighters:5,fruits:2},tn={maxPedestrians:320,minPedestrianFraction:.35,pedSpeedMin:.9,pedSpeedMax:1.4,pedFadeSeconds:.8,pedTurnChance:.18,pedGreenChance:.15,customerSearchRadius:7,customerStandSeconds:2.5,cars:26,buses:3,carSpeed:4.2,busSpeed:3.2,populationCheckSeconds:.5},nn={slots:3,autosaveSeconds:30},rn={zoomLevels:[10,15,21,30,42,58],defaultZoomIndex:2,tiltDegrees:35,baseYawDegrees:45,panKeySpeed:22},an={shadowMapSize:2048,maxPixelRatio:2,chunkSize:16},on=1e3,sn=1001,cn=1002,ln=1003,un=1004,dn=1005,fn=1006,pn=1007,mn=1008,hn=1009,gn=1010,_n=1011,vn=1012,yn=1013,bn=1014,xn=1015,Sn=1016,Cn=1017,wn=1018,Tn=1020,En=35902,Dn=35899,On=1021,kn=1022,An=1023,jn=1026,Mn=1027,Nn=1028,Pn=1029,Fn=1030,In=1031,Ln=1033,Rn=33776,zn=33777,Bn=33778,Vn=33779,Hn=35840,Un=35841,Wn=35842,Gn=35843,Kn=36196,qn=37492,Jn=37496,Yn=37488,Xn=37489,Zn=37490,Qn=37491,$n=37808,er=37809,tr=37810,nr=37811,rr=37812,ir=37813,ar=37814,or=37815,sr=37816,cr=37817,lr=37818,ur=37819,dr=37820,fr=37821,pr=36492,mr=36494,hr=36495,gr=36283,_r=36284,vr=36285,yr=36286,br=2300,xr=2301,Sr=2302,Cr=2303,wr=2400,Tr=2401,Er=2402,Dr=3200,Or=`srgb`,kr=`srgb-linear`,Ar=`linear`,jr=`srgb`,Mr=7680,Nr=35044,Pr=35048,Fr=2e3;function Ir(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Lr(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Rr(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function zr(){let e=Rr(`canvas`);return e.style.display=`block`,e}var Br={};function Vr(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Hr(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function B(...e){e=Hr(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function V(...e){e=Hr(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Ur(...e){let t=e.join(` `);t in Br||(Br[t]=!0,B(...e))}function Wr(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Gr={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},Kr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},qr=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Jr=1234567,Yr=Math.PI/180,Xr=180/Math.PI;function Zr(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(qr[e&255]+qr[e>>8&255]+qr[e>>16&255]+qr[e>>24&255]+`-`+qr[t&255]+qr[t>>8&255]+`-`+qr[t>>16&15|64]+qr[t>>24&255]+`-`+qr[n&63|128]+qr[n>>8&255]+`-`+qr[n>>16&255]+qr[n>>24&255]+qr[r&255]+qr[r>>8&255]+qr[r>>16&255]+qr[r>>24&255]).toLowerCase()}function Qr(e,t,n){return Math.max(t,Math.min(n,e))}function $r(e,t){return(e%t+t)%t}function ei(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function ti(e,t,n){return e===t?0:(n-e)/(t-e)}function ni(e,t,n){return(1-n)*e+n*t}function ri(e,t,n,r){return ni(e,t,1-Math.exp(-n*r))}function ii(e,t=1){return t-Math.abs($r(e,t*2)-t)}function ai(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function oi(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function si(e,t){return e+Math.floor(Math.random()*(t-e+1))}function ci(e,t){return e+Math.random()*(t-e)}function li(e){return e*(.5-Math.random())}function ui(e){e!==void 0&&(Jr=e);let t=Jr+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function di(e){return e*Yr}function fi(e){return e*Xr}function pi(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function mi(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function hi(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function gi(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:B(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function _i(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function vi(e,t){if(t.constructor===Float32Array)return e;let n=_i(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function yi(e,t){if(t.constructor===Float32Array)return e;let n=_i(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}var bi={DEG2RAD:Yr,RAD2DEG:Xr,generateUUID:Zr,clamp:Qr,euclideanModulo:$r,mapLinear:ei,inverseLerp:ti,lerp:ni,damp:ri,pingpong:ii,smoothstep:ai,smootherstep:oi,randInt:si,randFloat:ci,randFloatSpread:li,seededRandom:ui,degToRad:di,radToDeg:fi,isPowerOfTwo:pi,ceilPowerOfTwo:mi,floorPowerOfTwo:hi,setQuaternionFromProperEuler:gi,normalize:yi,denormalize:vi},H=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Qr(this.x,e.x,t.x),this.y=Qr(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Qr(this.x,e,t),this.y=Qr(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qr(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Qr(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},xi=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:B(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qr(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ci.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ci.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Qr(this.x,e.x,t.x),this.y=Qr(this.y,e.y,t.y),this.z=Qr(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Qr(this.x,e,t),this.y=Qr(this.y,e,t),this.z=Qr(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qr(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Si.copy(this).projectOnVector(e),this.sub(Si)}reflect(e){return this.sub(Si.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Qr(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Si=new U,Ci=new xi,W=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Ur(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(wi.makeScale(e,t)),this}rotate(e){return Ur(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(wi.makeRotation(-e)),this}translate(e,t){return Ur(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(wi.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},wi=new W,Ti=new W().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ei=new W().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Di(){let e={enabled:!0,workingColorSpace:kr,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=ki(e.r),e.g=ki(e.g),e.b=ki(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Ai(e.r),e.g=Ai(e.g),e.b=Ai(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ar:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[kr]:{primaries:t,whitePoint:r,transfer:Ar,toXYZ:Ti,fromXYZ:Ei,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Or},outputColorSpaceConfig:{drawingBufferColorSpace:Or}},[Or]:{primaries:t,whitePoint:r,transfer:jr,toXYZ:Ti,fromXYZ:Ei,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Or}}}),e}var Oi=Di();function ki(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Ai(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var ji,Mi=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ji===void 0&&(ji=Rr(`canvas`)),ji.width=e.width,ji.height=e.height;let t=ji.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=ji}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Rr(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=ki(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(ki(t[e]/255)*255):t[e]=ki(t[e]);return{data:t,width:e.width,height:e.height}}return B(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Ni=0,Pi=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ni++}),this.uuid=Zr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Fi(r[t].image)):e.push(Fi(r[t]))}else e=Fi(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Fi(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Mi.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(B(`Texture: Unable to serialize Texture.`),{})}var Ii=0,Li=new U,Ri=class e extends Kr{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=sn,i=sn,a=fn,o=mn,s=An,c=hn,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ii++}),this.uuid=Zr(),this.name=``,this.source=new Pi(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new H(0,0),this.repeat=new H(1,1),this.center=new H(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new W,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Li).x}get height(){return this.source.getSize(Li).y}get depth(){return this.source.getSize(Li).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){B(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?B(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case on:e.x-=Math.floor(e.x);break;case sn:e.x=e.x<0?0:1;break;case cn:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case on:e.y-=Math.floor(e.y);break;case sn:e.y=e.y<0?0:1;break;case cn:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ri.DEFAULT_IMAGE=null,Ri.DEFAULT_MAPPING=300,Ri.DEFAULT_ANISOTROPY=1;var zi=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Qr(this.x,e.x,t.x),this.y=Qr(this.y,e.y,t.y),this.z=Qr(this.z,e.z,t.z),this.w=Qr(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Qr(this.x,e,t),this.y=Qr(this.y,e,t),this.z=Qr(this.z,e,t),this.w=Qr(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qr(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Bi=class extends Kr{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new zi(0,0,e,t),this.scissorTest=!1,this.viewport=new zi(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new Ri({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:fn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Pi(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Vi=class extends Bi{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Hi=class extends Ri{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ln,this.minFilter=ln,this.wrapR=sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Ui=class extends Ri{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ln,this.minFilter=ln,this.wrapR=sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Wi=class e{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Gi.setFromMatrixColumn(e,0).length(),i=1/Gi.setFromMatrixColumn(e,1).length(),a=1/Gi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qi,e,Ji)}lookAt(e,t,n){let r=this.elements;return Zi.subVectors(e,t),Zi.lengthSq()===0&&(Zi.z=1),Zi.normalize(),Yi.crossVectors(n,Zi),Yi.lengthSq()===0&&(Math.abs(n.z)===1?Zi.x+=1e-4:Zi.z+=1e-4,Zi.normalize(),Yi.crossVectors(n,Zi)),Yi.normalize(),Xi.crossVectors(Zi,Yi),r[0]=Yi.x,r[4]=Xi.x,r[8]=Zi.x,r[1]=Yi.y,r[5]=Xi.y,r[9]=Zi.y,r[2]=Yi.z,r[6]=Xi.z,r[10]=Zi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],M=r[3],te=r[7],ne=r[11],re=r[15];return i[0]=a*x+o*T+s*k+c*M,i[4]=a*S+o*E+s*A+c*te,i[8]=a*C+o*D+s*j+c*ne,i[12]=a*w+o*O+s*ee+c*re,i[1]=l*x+u*T+d*k+f*M,i[5]=l*S+u*E+d*A+f*te,i[9]=l*C+u*D+d*j+f*ne,i[13]=l*w+u*O+d*ee+f*re,i[2]=p*x+m*T+h*k+g*M,i[6]=p*S+m*E+h*A+g*te,i[10]=p*C+m*D+h*j+g*ne,i[14]=p*w+m*O+h*ee+g*re,i[3]=_*x+v*T+y*k+b*M,i[7]=_*S+v*E+y*A+b*te,i[11]=_*C+v*D+y*j+b*ne,i[15]=_*w+v*O+y*ee+b*re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Gi.set(r[0],r[1],r[2]).length(),o=Gi.set(r[4],r[5],r[6]).length(),s=Gi.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Ki.copy(this);let c=1/a,l=1/o,u=1/s;return Ki.elements[0]*=c,Ki.elements[1]*=c,Ki.elements[2]*=c,Ki.elements[4]*=l,Ki.elements[5]*=l,Ki.elements[6]*=l,Ki.elements[8]*=u,Ki.elements[9]*=u,Ki.elements[10]*=u,t.setFromRotationMatrix(Ki),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Fr,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Fr,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Gi=new U,Ki=new Wi,qi=new U(0,0,0),Ji=new U(1,1,1),Yi=new U,Xi=new U,Zi=new U,Qi=new Wi,$i=new xi,ea=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(Qr(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-Qr(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(Qr(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-Qr(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(Qr(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-Qr(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:B(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Qi.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Qi,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $i.setFromEuler(this),this.setFromQuaternion($i,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ea.DEFAULT_ORDER=`XYZ`;var ta=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},na=0,ra=new U,ia=new xi,aa=new Wi,oa=new U,sa=new U,ca=new U,la=new xi,ua=new U(1,0,0),da=new U(0,1,0),fa=new U(0,0,1),pa={type:`added`},ma={type:`removed`},ha={type:`childadded`,child:null},ga={type:`childremoved`,child:null},_a=class e extends Kr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:na++}),this.uuid=Zr(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new U,n=new ea,r=new xi,i=new U(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Wi},normalMatrix:{value:new W}}),this.matrix=new Wi,this.matrixWorld=new Wi,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ta,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ia.setFromAxisAngle(e,t),this.quaternion.multiply(ia),this}rotateOnWorldAxis(e,t){return ia.setFromAxisAngle(e,t),this.quaternion.premultiply(ia),this}rotateX(e){return this.rotateOnAxis(ua,e)}rotateY(e){return this.rotateOnAxis(da,e)}rotateZ(e){return this.rotateOnAxis(fa,e)}translateOnAxis(e,t){return ra.copy(e).applyQuaternion(this.quaternion),this.position.add(ra.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ua,e)}translateY(e){return this.translateOnAxis(da,e)}translateZ(e){return this.translateOnAxis(fa,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(aa.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?oa.copy(e):oa.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),sa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?aa.lookAt(sa,oa,this.up):aa.lookAt(oa,sa,this.up),this.quaternion.setFromRotationMatrix(aa),r&&(aa.extractRotation(r.matrixWorld),ia.setFromRotationMatrix(aa),this.quaternion.premultiply(ia.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(V(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(pa),ha.child=e,this.dispatchEvent(ha),ha.child=null):V(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ma),ga.child=e,this.dispatchEvent(ga),ga.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),aa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),aa.multiply(e.parent.matrixWorld)),e.applyMatrix4(aa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(pa),ha.child=e,this.dispatchEvent(ha),ha.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sa,e,ca),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sa,la,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};_a.DEFAULT_UP=new U(0,1,0),_a.DEFAULT_MATRIX_AUTO_UPDATE=!0,_a.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var va=class extends _a{constructor(){super(),this.isGroup=!0,this.type=`Group`}},ya={type:`move`},ba=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new va,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new va,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new va,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ya)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new va;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},xa={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sa={h:0,s:0,l:0},Ca={h:0,s:0,l:0};function wa(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var G=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Or){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Oi.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Oi.workingColorSpace){return this.r=e,this.g=t,this.b=n,Oi.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Oi.workingColorSpace){if(e=$r(e,1),t=Qr(t,0,1),n=Qr(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=wa(i,r,e+1/3),this.g=wa(i,r,e),this.b=wa(i,r,e-1/3)}return Oi.colorSpaceToWorking(this,r),this}setStyle(e,t=Or){function n(t){t!==void 0&&parseFloat(t)<1&&B(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:B(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);B(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Or){let n=xa[e.toLowerCase()];return n===void 0?B(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}copyLinearToSRGB(e){return this.r=Ai(e.r),this.g=Ai(e.g),this.b=Ai(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Or){return Oi.workingToColorSpace(Ta.copy(this),e),Math.round(Qr(Ta.r*255,0,255))*65536+Math.round(Qr(Ta.g*255,0,255))*256+Math.round(Qr(Ta.b*255,0,255))}getHexString(e=Or){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Oi.workingColorSpace){Oi.workingToColorSpace(Ta.copy(this),t);let n=Ta.r,r=Ta.g,i=Ta.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Oi.workingColorSpace){return Oi.workingToColorSpace(Ta.copy(this),t),e.r=Ta.r,e.g=Ta.g,e.b=Ta.b,e}getStyle(e=Or){Oi.workingToColorSpace(Ta.copy(this),e);let t=Ta.r,n=Ta.g,r=Ta.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Sa),this.setHSL(Sa.h+e,Sa.s+t,Sa.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Sa),e.getHSL(Ca);let n=ni(Sa.h,Ca.h,t),r=ni(Sa.s,Ca.s,t),i=ni(Sa.l,Ca.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ta=new G;G.NAMES=xa;var Ea=class extends _a{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ea,this.environmentIntensity=1,this.environmentRotation=new ea,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Da=new U,Oa=new U,ka=new U,Aa=new U,ja=new U,Ma=new U,Na=new U,Pa=new U,Fa=new U,Ia=new U,La=new zi,Ra=new zi,za=new zi,Ba=class e{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Da.subVectors(e,t),r.cross(Da);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Da.subVectors(r,t),Oa.subVectors(n,t),ka.subVectors(e,t);let a=Da.dot(Da),o=Da.dot(Oa),s=Da.dot(ka),c=Oa.dot(Oa),l=Oa.dot(ka),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Aa)!==null&&Aa.x>=0&&Aa.y>=0&&Aa.x+Aa.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Aa)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Aa.x),s.addScaledVector(a,Aa.y),s.addScaledVector(o,Aa.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return La.setScalar(0),Ra.setScalar(0),za.setScalar(0),La.fromBufferAttribute(e,t),Ra.fromBufferAttribute(e,n),za.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(La,i.x),a.addScaledVector(Ra,i.y),a.addScaledVector(za,i.z),a}static isFrontFacing(e,t,n,r){return Da.subVectors(n,t),Oa.subVectors(e,t),Da.cross(Oa).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Da.subVectors(this.c,this.b),Oa.subVectors(this.a,this.b),Da.cross(Oa).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;ja.subVectors(r,n),Ma.subVectors(i,n),Pa.subVectors(e,n);let s=ja.dot(Pa),c=Ma.dot(Pa);if(s<=0&&c<=0)return t.copy(n);Fa.subVectors(e,r);let l=ja.dot(Fa),u=Ma.dot(Fa);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(ja,a);Ia.subVectors(e,i);let f=ja.dot(Ia),p=Ma.dot(Ia);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Ma,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Na.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Na,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(ja,a).addScaledVector(Ma,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Va=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ua.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ua.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ua.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Ua):Ua.fromBufferAttribute(r,t),Ua.applyMatrix4(e.matrixWorld),this.expandByPoint(Ua);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Wa.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Wa.copy(e.boundingBox)),Wa.applyMatrix4(e.matrixWorld),this.union(Wa)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ua),Ua.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Za),Qa.subVectors(this.max,Za),Ga.subVectors(e.a,Za),Ka.subVectors(e.b,Za),qa.subVectors(e.c,Za),Ja.subVectors(Ka,Ga),Ya.subVectors(qa,Ka),Xa.subVectors(Ga,qa);let t=[0,-Ja.z,Ja.y,0,-Ya.z,Ya.y,0,-Xa.z,Xa.y,Ja.z,0,-Ja.x,Ya.z,0,-Ya.x,Xa.z,0,-Xa.x,-Ja.y,Ja.x,0,-Ya.y,Ya.x,0,-Xa.y,Xa.x,0];return!to(t,Ga,Ka,qa,Qa)||(t=[1,0,0,0,1,0,0,0,1],!to(t,Ga,Ka,qa,Qa))?!1:($a.crossVectors(Ja,Ya),t=[$a.x,$a.y,$a.z],to(t,Ga,Ka,qa,Qa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ua).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ua).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Ha[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ha[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ha[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ha[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ha[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ha[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ha[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ha[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ha)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ha=[new U,new U,new U,new U,new U,new U,new U,new U],Ua=new U,Wa=new Va,Ga=new U,Ka=new U,qa=new U,Ja=new U,Ya=new U,Xa=new U,Za=new U,Qa=new U,$a=new U,eo=new U;function to(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){eo.fromArray(e,a);let o=i.x*Math.abs(eo.x)+i.y*Math.abs(eo.y)+i.z*Math.abs(eo.z),s=t.dot(eo),c=n.dot(eo),l=r.dot(eo);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var no=new U,ro=new H,io=0,ao=class extends Kr{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:io++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Nr,this.updateRanges=[],this.gpuType=xn,this.version=0,this._normalizationScale=e===void 0?void 0:_i(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ro.fromBufferAttribute(this,t),ro.applyMatrix3(e),this.setXY(t,ro.x,ro.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)no.fromBufferAttribute(this,t),no.applyMatrix3(e),this.setXYZ(t,no.x,no.y,no.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)no.fromBufferAttribute(this,t),no.applyMatrix4(e),this.setXYZ(t,no.x,no.y,no.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)no.fromBufferAttribute(this,t),no.applyNormalMatrix(e),this.setXYZ(t,no.x,no.y,no.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)no.fromBufferAttribute(this,t),no.transformDirection(e),this.setXYZ(t,no.x,no.y,no.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?vi(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?yi(e,this.array):Math.round(e*t)}},oo=class extends ao{constructor(e,t,n){super(new Uint16Array(e),t,n)}},so=class extends ao{constructor(e,t,n){super(new Uint32Array(e),t,n)}},co=class extends ao{constructor(e,t,n){super(new Float32Array(e),t,n)}},lo=new Va,uo=new U,fo=new U,po=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?lo.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;uo.subVectors(e,this.center);let t=uo.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(uo,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(uo.copy(e.center).add(fo)),this.expandByPoint(uo.copy(e.center).sub(fo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},mo=0,ho=new Wi,go=new _a,_o=new U,vo=new Va,yo=new Va,bo=new U,xo=class e extends Kr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:mo++}),this.uuid=Zr(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Ir(e)?so:oo)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new W().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return ho.makeRotationFromQuaternion(e),this.applyMatrix4(ho),this}rotateX(e){return ho.makeRotationX(e),this.applyMatrix4(ho),this}rotateY(e){return ho.makeRotationY(e),this.applyMatrix4(ho),this}rotateZ(e){return ho.makeRotationZ(e),this.applyMatrix4(ho),this}translate(e,t,n){return ho.makeTranslation(e,t,n),this.applyMatrix4(ho),this}scale(e,t,n){return ho.makeScale(e,t,n),this.applyMatrix4(ho),this}lookAt(e){return go.lookAt(e),go.updateMatrix(),this.applyMatrix4(go.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_o).negate(),this.translate(_o.x,_o.y,_o.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new co(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&B(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Va);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)V(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];vo.setFromBufferAttribute(n),this.morphTargetsRelative?(bo.addVectors(this.boundingBox.min,vo.min),this.boundingBox.expandByPoint(bo),bo.addVectors(this.boundingBox.max,vo.max),this.boundingBox.expandByPoint(bo)):(this.boundingBox.expandByPoint(vo.min),this.boundingBox.expandByPoint(vo.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&V(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new po);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)V(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new U,1/0);else if(e){let n=this.boundingSphere.center;if(vo.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];yo.setFromBufferAttribute(n),this.morphTargetsRelative?(bo.addVectors(vo.min,yo.min),vo.expandByPoint(bo),bo.addVectors(vo.max,yo.max),vo.expandByPoint(bo)):(vo.expandByPoint(yo.min),vo.expandByPoint(yo.max))}vo.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)bo.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(bo));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)bo.fromBufferAttribute(a,t),o&&(_o.fromBufferAttribute(e,t),bo.add(_o)),r=Math.max(r,n.distanceToSquared(bo))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&V(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){V(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new ao(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new U,s[e]=new U;let l=new U,u=new U,d=new U,f=new H,p=new H,m=new H,h=new U,g=new U;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new U,b=new U,x=new U,S=new U;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new ao(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new U,i=new U,a=new U,o=new U,s=new U,c=new U,l=new U,u=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)bo.fromBufferAttribute(e,t),bo.normalize(),e.setXYZ(t,bo.x,bo.y,bo.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new ao(a,r,i)}if(this.index===null)return B(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},So=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Nr,this.updateRanges=[],this.version=0,this.uuid=Zr()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Co(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),r=new this.constructor(n,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Co(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function Co(e){return e.buffer._uuid===void 0&&(e.buffer._uuid=Zr()),e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e.buffer._uuid:e.buffer._uuid+`:`+e.byteOffset+`:`+e.byteLength}var wo=new U,To=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r,this._normalizationScale=e===void 0?void 0:_i(e.array)}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)wo.fromBufferAttribute(this,t),wo.applyMatrix4(e),this.setXYZ(t,wo.x,wo.y,wo.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wo.fromBufferAttribute(this,t),wo.applyNormalMatrix(e),this.setXYZ(t,wo.x,wo.y,wo.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wo.fromBufferAttribute(this,t),wo.transformDirection(e),this.setXYZ(t,wo.x,wo.y,wo.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){Vr(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new ao(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Vr(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t===void 0?vi(e,this.data.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?yi(e,this.data.array):Math.round(e*t)}},Eo=new U,Do=new U,Oo=new W,ko=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Eo.subVectors(n,t).cross(Do.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Eo),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Oo.getNormalMatrix(e),r=this.coplanarPoint(Eo).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Ao=0,jo=class extends Kr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ao++}),this.uuid=Zr(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new G(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mr,this.stencilZFail=Mr,this.stencilZPass=Mr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){B(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?B(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new G().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new ko().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new H().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new H().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Mo=class extends jo{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new G(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},No,Po=new U,Fo=new U,Io=new U,Lo=new H,Ro=new H,zo=new Wi,Bo=new U,Vo=new U,Ho=new U,Uo=new H,Wo=new H,Go=new H,Ko=class extends _a{constructor(e=new Mo){if(super(),this.isSprite=!0,this.type=`Sprite`,No===void 0){No=new xo;let e=new So(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);No.setIndex([0,1,2,0,2,3]),No.setAttribute(`position`,new To(e,3,0,!1)),No.setAttribute(`uv`,new To(e,2,3,!1))}this.geometry=No,this.material=e,this.center=new H(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&V(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Fo.setFromMatrixScale(this.matrixWorld),zo.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Io.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Fo.multiplyScalar(-Io.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;qo(Bo.set(-.5,-.5,0),Io,a,Fo,r,i),qo(Vo.set(.5,-.5,0),Io,a,Fo,r,i),qo(Ho.set(.5,.5,0),Io,a,Fo,r,i),Uo.set(0,0),Wo.set(1,0),Go.set(1,1);let o=e.ray.intersectTriangle(Bo,Vo,Ho,!1,Po);if(o===null&&(qo(Vo.set(-.5,.5,0),Io,a,Fo,r,i),Wo.set(0,1),o=e.ray.intersectTriangle(Bo,Ho,Vo,!1,Po),o===null))return;let s=e.ray.origin.distanceTo(Po);s<e.near||s>e.far||t.push({distance:s,point:Po.clone(),uv:Ba.getInterpolation(Po,Bo,Vo,Ho,Uo,Wo,Go,new H),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function qo(e,t,n,r,i,a){Lo.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Ro.copy(Lo):(Ro.x=a*Lo.x-i*Lo.y,Ro.y=i*Lo.x+a*Lo.y),e.copy(t),e.x+=Ro.x,e.y+=Ro.y,e.applyMatrix4(zo)}var Jo=new U,Yo=new U,Xo=new U,Zo=new U,Qo=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Jo)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Jo.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Jo.copy(this.origin).addScaledVector(this.direction,t),Jo.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Yo.copy(e).add(t).multiplyScalar(.5),Xo.copy(t).sub(e).normalize(),Zo.copy(this.origin).sub(Yo);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Xo),o=Zo.dot(this.direction),s=-Zo.dot(Xo),c=Zo.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Yo).addScaledVector(Xo,d),f}intersectSphere(e,t){if(e.radius<0)return null;Jo.subVectors(e.center,this.origin);let n=Jo.dot(this.direction),r=Jo.dot(Jo)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Jo)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,ee,M;if(y>=b&&y>=x?(w=s,D=u,A=p,M=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,ee=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,ee=_)):b>=x?(w=c,D=d,A=m,M=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,ee=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,ee=v)):(w=l,D=f,A=h,M=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,ee=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,ee=g)),w===0)return null;let te=S/w,ne=C/w,re=1/w,ie=T-te*D,ae=E-ne*D,oe=O-te*A,se=k-ne*A,ce=j-te*M,le=ee-ne*M,ue=ce*se-le*oe,de=ie*le-ae*ce,N=oe*ae-se*ie;if(r){if(ue<0||de<0||N<0)return null}else if((ue<0||de<0||N<0)&&(ue>0||de>0||N>0))return null;let fe=ue+de+N;if(fe===0)return null;let pe=re*(ue*D+de*A+N*M);return(fe>0?pe<0:pe>0)?null:this.at(pe/fe,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},$o=class extends jo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new G(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ea,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},es=new Wi,ts=new Qo,ns=new po,rs=new U,is=new U,as=new U,os=new U,ss=new U,cs=new U,ls=new U,us=new U,K=class extends _a{constructor(e=new xo,t=new $o){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){cs.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(ss.fromBufferAttribute(s,e),a?cs.addScaledVector(ss,r):cs.addScaledVector(ss.sub(t),r))}t.add(cs)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ns.copy(n.boundingSphere),ns.applyMatrix4(i),ts.copy(e.ray).recast(e.near),ns.containsPoint(ts.origin)===!1&&(ts.intersectSphere(ns,rs)===null||ts.origin.distanceToSquared(rs)>(e.far-e.near)**2)||(es.copy(i).invert(),ts.copy(e.ray).applyMatrix4(es),(n.boundingBox===null||ts.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,ts)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=fs(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=fs(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=fs(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=fs(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function ds(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;us.copy(s),us.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(us);return l<n.near||l>n.far?null:{distance:l,point:us.clone(),object:e}}function fs(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,is),e.getVertexPosition(c,as),e.getVertexPosition(l,os);let u=ds(e,t,n,r,is,as,os,ls);if(u){let e=new U;Ba.getBarycoord(ls,is,as,os,e),i&&(u.uv=Ba.getInterpolatedAttribute(i,s,c,l,e,new H)),a&&(u.uv1=Ba.getInterpolatedAttribute(a,s,c,l,e,new H)),o&&(u.normal=Ba.getInterpolatedAttribute(o,s,c,l,e,new U),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new U,materialIndex:0};Ba.getNormal(is,as,os,t.normal),u.face=t,u.barycoord=e}return u}var ps=class extends Ri{constructor(e=null,t=1,n=1,r,i,a,o,s,c=ln,l=ln,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ms=class extends ao{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},hs=new Wi,gs=new Wi,_s=[],vs=new Va,ys=new Wi,bs=new K,xs=new po,Ss=class extends K{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ms(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,ys)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Va),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,hs),vs.copy(e.boundingBox).applyMatrix4(hs),this.boundingBox.union(vs)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new po),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,hs),xs.copy(e.boundingSphere).applyMatrix4(hs),this.boundingSphere.union(xs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture===null?null:e.morphTexture.clone(),this.instanceColor=e.instanceColor===null?null:e.instanceColor.clone(),this.count=e.count,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(bs.geometry=this.geometry,bs.material=this.material,bs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xs.copy(this.boundingSphere),xs.applyMatrix4(n),e.ray.intersectsSphere(xs)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,hs),gs.multiplyMatrices(n,hs),bs.matrixWorld=gs,bs.raycast(e,_s);for(let e=0,n=_s.length;e<n;e++){let n=_s[e];n.instanceId=i,n.object=this,t.push(n)}_s.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ms(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ps(new Float32Array(r*this.count),r,this.count,Nn,xn));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Cs=new po,ws=new H(.5,.5),Ts=new U,Es=class{constructor(e=new ko,t=new ko,n=new ko,r=new ko,i=new ko,a=new ko){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Fr,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Cs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Cs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Cs)}intersectsSprite(e){return Cs.center.set(0,0,0),Cs.radius=.7071067811865476+ws.distanceTo(e.center),Cs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Cs)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Ts.x=r.normal.x>0?e.max.x:e.min.x,Ts.y=r.normal.y>0?e.max.y:e.min.y,Ts.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ts)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ds=new Wi,Os=class e{constructor(){this.coordinateSystem=Fr,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];Ds.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new Es),n[e].setFromProjectionMatrix(Ds,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Es),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},ks=class extends Ri{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},As=class extends Ri{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},js=class extends Ri{constructor(e,t,n=bn,r,i,a,o=ln,s=ln,c,l=jn,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Pi(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ms=class extends js{constructor(e,t=bn,n=301,r,i,a=ln,o=ln,s,c=jn){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ns=class extends Ri{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ps=class e extends xo{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new co(c,3)),this.setAttribute(`normal`,new co(l,3)),this.setAttribute(`uv`,new co(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new U;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Fs=class e extends xo{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new U,l=new H;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new co(a,3)),this.setAttribute(`normal`,new co(o,3)),this.setAttribute(`uv`,new co(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Is=class e extends xo{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new co(u,3)),this.setAttribute(`normal`,new co(d,3)),this.setAttribute(`uv`,new co(f,2));function _(){let a=new U,_=new U,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new H,m=new U,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ls=class e extends Is{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Rs=class e extends xo{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new co(p,3)),this.setAttribute(`normal`,new co(m,3)),this.setAttribute(`uv`,new co(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},zs=class e extends xo{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new U,p=new H;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new co(s,3)),this.setAttribute(`normal`,new co(c,3)),this.setAttribute(`uv`,new co(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Bs=class e extends xo{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new U,d=new U,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new co(p,3)),this.setAttribute(`normal`,new co(m,3)),this.setAttribute(`uv`,new co(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function Vs(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Us(i))i.isRenderTargetTexture?(B(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Us(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Hs(e){let t={};for(let n=0;n<e.length;n++){let r=Vs(e[n]);for(let e in r)t[e]=r[e]}return t}function Us(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Ws(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Gs(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Oi.workingColorSpace}var Ks={clone:Vs,merge:Hs},qs=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Js=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ys=class extends jo{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qs,this.fragmentShader=Js,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vs(e.uniforms),this.uniformsGroups=Ws(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new G().setHex(r.value);break;case`v2`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new zi().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new W().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Wi().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Xs=class extends Ys{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Zs=class extends jo{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new G(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new G(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ea,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Qs=class extends jo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Dr,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},$s=class extends jo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ec(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function tc(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var nc=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},rc=class extends nc{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wr,endingEnd:wr}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Tr:i=e,o=2*t-n;break;case Er:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Tr:a=e,s=2*n-t;break;case Er:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},ic=class extends nc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},ac=class extends nc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},oc=class extends nc{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=lc(n,t,g,y,r);i[p]=sc(x,o,_,b,m)}return i}};function sc(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function cc(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function lc(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=sc(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=cc(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var uc=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=ec(t,this.TimeBufferType),this.values=ec(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ec(e.times,Array),values:ec(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),tc(e.settings)&&(n.settings={inTangents:ec(e.settings.inTangents,Array),outTangents:ec(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ac(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ic(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new rc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new oc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case br:t=this.InterpolantFactoryMethodDiscrete;break;case xr:t=this.InterpolantFactoryMethodLinear;break;case Sr:t=this.InterpolantFactoryMethodSmooth;break;case Cr:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return B(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return br;case this.InterpolantFactoryMethodLinear:return xr;case this.InterpolantFactoryMethodSmooth:return Sr;case this.InterpolantFactoryMethodBezier:return Cr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;tc(this.settings)&&(dc(this.settings.inTangents,e),dc(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;tc(this.settings)&&(fc(this.settings.inTangents,e),fc(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(V(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(V(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){V(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){V(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Lr(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){V(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Sr,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,tc(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function dc(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function fc(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}uc.prototype.ValueTypeName=``,uc.prototype.TimeBufferType=Float32Array,uc.prototype.ValueBufferType=Float32Array,uc.prototype.DefaultInterpolation=xr;var pc=class extends uc{constructor(e,t,n){super(e,t,n)}};pc.prototype.ValueTypeName=`bool`,pc.prototype.ValueBufferType=Array,pc.prototype.DefaultInterpolation=br,pc.prototype.InterpolantFactoryMethodLinear=void 0,pc.prototype.InterpolantFactoryMethodSmooth=void 0;var mc=class extends uc{constructor(e,t,n,r){super(e,t,n,r)}};mc.prototype.ValueTypeName=`color`;var hc=class extends uc{constructor(e,t,n,r){super(e,t,n,r)}};hc.prototype.ValueTypeName=`number`;var gc=class extends nc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)xi.slerpFlat(i,0,a,c-o,a,c,s);return i}},_c=class extends uc{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new gc(this.times,this.values,this.getValueSize(),e)}};_c.prototype.ValueTypeName=`quaternion`,_c.prototype.InterpolantFactoryMethodSmooth=void 0;var vc=class extends uc{constructor(e,t,n){super(e,t,n)}};vc.prototype.ValueTypeName=`string`,vc.prototype.ValueBufferType=Array,vc.prototype.DefaultInterpolation=br,vc.prototype.InterpolantFactoryMethodLinear=void 0,vc.prototype.InterpolantFactoryMethodSmooth=void 0;var yc=class extends uc{constructor(e,t,n,r){super(e,t,n,r)}};yc.prototype.ValueTypeName=`vector`;var bc=class extends _a{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new G(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},xc=class extends bc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(_a.DEFAULT_UP),this.updateMatrix(),this.groundColor=new G(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Sc=new Wi,Cc=new U,wc=new U,Tc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new H(512,512),this.mapType=hn,this.map=null,this.mapPass=null,this.matrix=new Wi,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Es,this._frameExtents=new H(1,1),this._viewportCount=1,this._viewports=[new zi(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Cc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Cc),wc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wc),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Sc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Sc,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Sc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ec=new U,Dc=new xi,Oc=new U,kc=class extends _a{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Wi,this.projectionMatrix=new Wi,this.projectionMatrixInverse=new Wi,this.coordinateSystem=Fr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ec,Dc,Oc),Oc.x===1&&Oc.y===1&&Oc.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ec,Dc,Oc.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ec,Dc,Oc),Oc.x===1&&Oc.y===1&&Oc.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ec,Dc,Oc.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ac=new U,jc=new H,Mc=new H,Nc=class extends kc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Xr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Yr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Xr*2*Math.atan(Math.tan(Yr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ac.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ac.x,Ac.y).multiplyScalar(-e/Ac.z),Ac.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ac.x,Ac.y).multiplyScalar(-e/Ac.z)}getViewSize(e,t){return this.getViewBounds(e,jc,Mc),t.subVectors(Mc,jc)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Yr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Pc=class extends kc{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Fc=class extends Tc{constructor(){super(new Pc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ic=class extends bc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(_a.DEFAULT_UP),this.updateMatrix(),this.target=new _a,this.shadow=new Fc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Lc=-90,Rc=1,zc=class extends _a{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Nc(Lc,Rc,e,t);r.layers=this.layers,this.add(r);let i=new Nc(Lc,Rc,e,t);i.layers=this.layers,this.add(i);let a=new Nc(Lc,Rc,e,t);a.layers=this.layers,this.add(a);let o=new Nc(Lc,Rc,e,t);o.layers=this.layers,this.add(o);let s=new Nc(Lc,Rc,e,t);s.layers=this.layers,this.add(s);let c=new Nc(Lc,Rc,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Bc=class extends Nc{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},Vc=`\\[\\]\\.:\\/`,Hc=RegExp(`[\\[\\]\\.:\\/]`,`g`),Uc=`[^\\[\\]\\.:\\/]`,Wc=`[^`+Vc.replace(`\\.`,``)+`]`,Gc=`((?:WC+[\\/:])*)`.replace(`WC`,Uc),Kc=`(WCOD+)?`.replace(`WCOD`,Wc),qc=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Uc),Jc=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Uc),Yc=RegExp(`^`+Gc+Kc+qc+Jc+`$`),Xc=[`material`,`materials`,`bones`,`map`],Zc=class{constructor(e,t,n){let r=n||Qc.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Qc=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Hc,``)}static parseTrackName(e){let t=Yc.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Xc.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){B(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){V(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){V(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){V(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){V(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){V(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){V(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){V(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;V(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){V(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){V(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Qc.Composite=Zc,Qc.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Qc.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Qc.prototype.GetterByBindingType=[Qc.prototype._getValue_direct,Qc.prototype._getValue_array,Qc.prototype._getValue_arrayElement,Qc.prototype._getValue_toArray],Qc.prototype.SetterByBindingTypeAndVersioning=[[Qc.prototype._setValue_direct,Qc.prototype._setValue_direct_setNeedsUpdate,Qc.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Qc.prototype._setValue_array,Qc.prototype._setValue_array_setNeedsUpdate,Qc.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Qc.prototype._setValue_arrayElement,Qc.prototype._setValue_arrayElement_setNeedsUpdate,Qc.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Qc.prototype._setValue_fromArray,Qc.prototype._setValue_fromArray_setNeedsUpdate,Qc.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var $c=new Wi,el=class{constructor(e,t,n=0,r=1/0){this.ray=new Qo(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new ta,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):V(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return $c.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4($c),this}intersectObject(e,t=!0,n=[]){return nl(e,this,n,t),n.sort(tl),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)nl(e[r],this,n,t);return n.sort(tl),n}};function tl(e,t){return e.distance-t.distance}function nl(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)nl(r[e],t,n,!0)}}(class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function rl(e,t,n,r){let i=il(r);switch(n){case On:return e*t;case Nn:return e*t/i.components*i.byteLength;case Pn:return e*t/i.components*i.byteLength;case Fn:return e*t*2/i.components*i.byteLength;case In:return e*t*2/i.components*i.byteLength;case kn:return e*t*3/i.components*i.byteLength;case An:return e*t*4/i.components*i.byteLength;case Ln:return e*t*4/i.components*i.byteLength;case Rn:case zn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Bn:case Vn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Un:case Gn:return Math.max(e,16)*Math.max(t,8)/4;case Hn:case Wn:return Math.max(e,8)*Math.max(t,8)/2;case Kn:case qn:case Yn:case Xn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Jn:case Zn:case Qn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case $n:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case er:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case tr:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case nr:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case rr:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case ir:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ar:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case or:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case sr:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case cr:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case lr:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case ur:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case dr:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case fr:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case pr:case mr:case hr:return Math.ceil(e/4)*Math.ceil(t/4)*16;case gr:case _r:return Math.ceil(e/4)*Math.ceil(t/4)*8;case vr:case yr:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function il(e){switch(e){case hn:case gn:return{byteLength:1,components:1};case vn:case _n:case Sn:return{byteLength:2,components:1};case Cn:case wn:return{byteLength:2,components:4};case bn:case yn:case xn:return{byteLength:4,components:1};case En:case Dn:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?B(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function al(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function ol(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var q={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},J={common:{diffuse:{value:new G(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new W}},envmap:{envMap:{value:null},envMapRotation:{value:new W},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new W}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new W}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new W},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new W},normalScale:{value:new H(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new W},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new W}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new W}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new W}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new G(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new G(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0},uvTransform:{value:new W}},sprite:{diffuse:{value:new G(16777215)},opacity:{value:1},center:{value:new H(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}}},sl={basic:{uniforms:Hs([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.fog]),vertexShader:q.meshbasic_vert,fragmentShader:q.meshbasic_frag},lambert:{uniforms:Hs([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.fog,J.lights,{emissive:{value:new G(0)},envMapIntensity:{value:1}}]),vertexShader:q.meshlambert_vert,fragmentShader:q.meshlambert_frag},phong:{uniforms:Hs([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.fog,J.lights,{emissive:{value:new G(0)},specular:{value:new G(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:q.meshphong_vert,fragmentShader:q.meshphong_frag},standard:{uniforms:Hs([J.common,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.roughnessmap,J.metalnessmap,J.fog,J.lights,{emissive:{value:new G(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:q.meshphysical_vert,fragmentShader:q.meshphysical_frag},toon:{uniforms:Hs([J.common,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.gradientmap,J.fog,J.lights,{emissive:{value:new G(0)}}]),vertexShader:q.meshtoon_vert,fragmentShader:q.meshtoon_frag},matcap:{uniforms:Hs([J.common,J.bumpmap,J.normalmap,J.displacementmap,J.fog,{matcap:{value:null}}]),vertexShader:q.meshmatcap_vert,fragmentShader:q.meshmatcap_frag},points:{uniforms:Hs([J.points,J.fog]),vertexShader:q.points_vert,fragmentShader:q.points_frag},dashed:{uniforms:Hs([J.common,J.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:q.linedashed_vert,fragmentShader:q.linedashed_frag},depth:{uniforms:Hs([J.common,J.displacementmap]),vertexShader:q.depth_vert,fragmentShader:q.depth_frag},normal:{uniforms:Hs([J.common,J.bumpmap,J.normalmap,J.displacementmap,{opacity:{value:1}}]),vertexShader:q.meshnormal_vert,fragmentShader:q.meshnormal_frag},sprite:{uniforms:Hs([J.sprite,J.fog]),vertexShader:q.sprite_vert,fragmentShader:q.sprite_frag},background:{uniforms:{uvTransform:{value:new W},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:q.background_vert,fragmentShader:q.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new W}},vertexShader:q.backgroundCube_vert,fragmentShader:q.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:q.cube_vert,fragmentShader:q.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:q.equirect_vert,fragmentShader:q.equirect_frag},distance:{uniforms:Hs([J.common,J.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:q.distance_vert,fragmentShader:q.distance_frag},shadow:{uniforms:Hs([J.lights,J.fog,{color:{value:new G(0)},opacity:{value:1}}]),vertexShader:q.shadow_vert,fragmentShader:q.shadow_frag}};sl.physical={uniforms:Hs([sl.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new W},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new W},clearcoatNormalScale:{value:new H(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new W},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new W},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new W},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new W},sheen:{value:0},sheenColor:{value:new G(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new W},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new W},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new W},transmissionSamplerSize:{value:new H},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new W},attenuationDistance:{value:0},attenuationColor:{value:new G(0)},specularColor:{value:new G(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new W},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new W},anisotropyVector:{value:new H},anisotropyMap:{value:null},anisotropyMapTransform:{value:new W}}]),vertexShader:q.meshphysical_vert,fragmentShader:q.meshphysical_frag};var cl={r:0,b:0,g:0},ll=new Wi,ul=new W;ul.set(-1,0,0,0,1,0,0,0,1);function dl(e,t,n,r,i,a){let o=new G(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new K(new Ps(1,1,1),new Ys({name:`BackgroundCubeMaterial`,uniforms:Vs(sl.backgroundCube.uniforms),vertexShader:sl.backgroundCube.vertexShader,fragmentShader:sl.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ll.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ul),l.material.toneMapped=Oi.getTransfer(i.colorSpace)!==jr,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new K(new Rs(2,2),new Ys({name:`BackgroundMaterial`,uniforms:Vs(sl.background.uniforms),vertexShader:sl.background.vertexShader,fragmentShader:sl.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Oi.getTransfer(i.colorSpace)!==jr,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(cl,Gs(e)),n.buffers.color.setClear(cl.r,cl.g,cl.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function fl(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function pl(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function ml(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(B(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&B(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&B(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function hl(e){let t=this,n=null,r=0,i=!1,a=!1,o=new ko,s=new W,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var gl=class extends Vi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ks(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ps(5,5,5),i=new Ys({name:`CubemapFromEquirect`,uniforms:Vs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new K(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=fn),new zc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},_l=256,vl=3,yl=20,bl=256,xl=16,Sl=3,Cl=new U,wl=new G,Tl=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new zc(1,10,null),this._boxMesh=new K(new Ps(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Cl}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(wl));let h=new zc(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ml(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(_l,hi(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?_l:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=El(e,!1,!1),n=Math.log2(e)-vl;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=El(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ml()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=jl()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Ol(),this._integrationMaterial=kl());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/xl);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-Sl)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(bl*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Al());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function El(e,t,n){return new gl(e,{minFilter:mn,generateMipmaps:t,type:Sn,colorSpace:kr,depthBuffer:n})}function Dl(e,t,n){return new Ys({name:e,uniforms:t,vertexShader:q.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function Ol(){return Dl(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${bl}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function kl(){return Dl(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:xl}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Al(){return Dl(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${yl}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function jl(){return Dl(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Ml(){return Dl(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Nl(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new gl(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Tl(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Tl(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Pl(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ur(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Fl(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?so:oo)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function Il(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Ll(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:V(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Rl(e,t,n){let r=new WeakMap,i=new zi;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Hi(h,p,m,u);g.type=xn,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new H(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function zl(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Bl={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Vl(e,t,n,r,i,a){let o=new Vi(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new xo;u.setAttribute(`position`,new co([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new co([0,2,0,0,2,0],2));let d=new Xs({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new K(u,d),p=new Pc(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Vi(t,n,{type:Sn,depthBuffer:!1,stencilBuffer:!1}),c=new Vi(t,n,{type:Sn,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new js(t,n),a===!0&&(l.format=Mn,l.type=Tn)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},Oi.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=Bl[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var Hl=new Ri,Ul=new js(1,1),Wl=new Ms(1),Gl=new Hi,Kl=new Ui,ql=new ks,Jl=[],Yl=[],Xl=new Float32Array(16),Zl=new Float32Array(9),Ql=new Float32Array(4);function $l(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Jl[i];if(a===void 0&&(a=new Float32Array(i),Jl[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function eu(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function tu(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function nu(e,t){let n=Yl[t];n===void 0&&(n=new Int32Array(t),Yl[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function ru(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function iu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(eu(n,t))return;e.uniform2fv(this.addr,t),tu(n,t)}}function au(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(eu(n,t))return;e.uniform3fv(this.addr,t),tu(n,t)}}function ou(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(eu(n,t))return;e.uniform4fv(this.addr,t),tu(n,t)}}function su(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(eu(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),tu(n,t)}else{if(eu(n,r))return;Ql.set(r),e.uniformMatrix2fv(this.addr,!1,Ql),tu(n,r)}}function cu(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(eu(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),tu(n,t)}else{if(eu(n,r))return;Zl.set(r),e.uniformMatrix3fv(this.addr,!1,Zl),tu(n,r)}}function lu(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(eu(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),tu(n,t)}else{if(eu(n,r))return;Xl.set(r),e.uniformMatrix4fv(this.addr,!1,Xl),tu(n,r)}}function uu(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function du(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(eu(n,t))return;e.uniform2iv(this.addr,t),tu(n,t)}}function fu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(eu(n,t))return;e.uniform3iv(this.addr,t),tu(n,t)}}function pu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(eu(n,t))return;e.uniform4iv(this.addr,t),tu(n,t)}}function mu(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function hu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(eu(n,t))return;e.uniform2uiv(this.addr,t),tu(n,t)}}function gu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(eu(n,t))return;e.uniform3uiv(this.addr,t),tu(n,t)}}function _u(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(eu(n,t))return;e.uniform4uiv(this.addr,t),tu(n,t)}}function vu(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function yu(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?vu(Ul):Hl,n.setTexture2D(t||a,i)}function bu(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Kl,i)}function xu(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?vu(Wl):ql,n.setTextureCube(t||a,i)}function Su(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Gl,i)}function Cu(e){switch(e){case 5126:return ru;case 35664:return iu;case 35665:return au;case 35666:return ou;case 35674:return su;case 35675:return cu;case 35676:return lu;case 5124:case 35670:return uu;case 35667:case 35671:return du;case 35668:case 35672:return fu;case 35669:case 35673:return pu;case 5125:return mu;case 36294:return hu;case 36295:return gu;case 36296:return _u;case 35678:case 36198:case 36298:case 36306:case 35682:return yu;case 35679:case 36299:case 36307:return bu;case 35680:case 36300:case 36308:case 36293:return xu;case 36289:case 36303:case 36311:case 36292:return Su}}function wu(e,t){e.uniform1fv(this.addr,t)}function Tu(e,t){let n=$l(t,this.size,2);e.uniform2fv(this.addr,n)}function Eu(e,t){let n=$l(t,this.size,3);e.uniform3fv(this.addr,n)}function Du(e,t){let n=$l(t,this.size,4);e.uniform4fv(this.addr,n)}function Ou(e,t){let n=$l(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function ku(e,t){let n=$l(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Au(e,t){let n=$l(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function ju(e,t){e.uniform1iv(this.addr,t)}function Mu(e,t){e.uniform2iv(this.addr,t)}function Nu(e,t){e.uniform3iv(this.addr,t)}function Pu(e,t){e.uniform4iv(this.addr,t)}function Fu(e,t){e.uniform1uiv(this.addr,t)}function Iu(e,t){e.uniform2uiv(this.addr,t)}function Lu(e,t){e.uniform3uiv(this.addr,t)}function Ru(e,t){e.uniform4uiv(this.addr,t)}function zu(e,t,n){let r=this.cache,i=t.length,a=nu(n,i);eu(r,a)||(e.uniform1iv(this.addr,a),tu(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?vu(Ul):Hl;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Bu(e,t,n){let r=this.cache,i=t.length,a=nu(n,i);eu(r,a)||(e.uniform1iv(this.addr,a),tu(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Kl,a[e])}function Vu(e,t,n){let r=this.cache,i=t.length,a=nu(n,i);eu(r,a)||(e.uniform1iv(this.addr,a),tu(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?vu(Wl):ql;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function Hu(e,t,n){let r=this.cache,i=t.length,a=nu(n,i);eu(r,a)||(e.uniform1iv(this.addr,a),tu(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Gl,a[e])}function Uu(e){switch(e){case 5126:return wu;case 35664:return Tu;case 35665:return Eu;case 35666:return Du;case 35674:return Ou;case 35675:return ku;case 35676:return Au;case 5124:case 35670:return ju;case 35667:case 35671:return Mu;case 35668:case 35672:return Nu;case 35669:case 35673:return Pu;case 5125:return Fu;case 36294:return Iu;case 36295:return Lu;case 36296:return Ru;case 35678:case 36198:case 36298:case 36306:case 35682:return zu;case 35679:case 36299:case 36307:return Bu;case 35680:case 36300:case 36308:case 36293:return Vu;case 36289:case 36303:case 36311:case 36292:return Hu}}var Wu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Cu(t.type)}},Gu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Uu(t.type)}},Ku=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},qu=/(\w+)(\])?(\[|\.)?/g;function Ju(e,t){e.seq.push(t),e.map[t.id]=t}function Yu(e,t,n){let r=e.name,i=r.length;for(qu.lastIndex=0;;){let a=qu.exec(r),o=qu.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Ju(n,l===void 0?new Wu(s,e,t):new Gu(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Ku(s),Ju(n,e)),n=e}}}var Xu=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Yu(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Zu(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Qu=37297,$u=0;function ed(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var td=new W;function nd(e){Oi._getMatrix(td,Oi.workingColorSpace,e);let t=`mat3( ${td.elements.map(e=>e.toFixed(4))} )`;switch(Oi.getTransfer(e)){case Ar:return[t,`LinearTransferOETF`];case jr:return[t,`sRGBTransferOETF`];default:return B(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function rd(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+ed(e.getShaderSource(t),r)}return i}function id(e,t){let n=nd(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var ad={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function od(e,t){let n=ad[t];return n===void 0?(B(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var sd=new U;function cd(){return Oi.getLuminanceCoefficients(sd),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${sd.x.toFixed(4)}, ${sd.y.toFixed(4)}, ${sd.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function ld(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(fd).join(`
`)}function ud(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function dd(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function fd(e){return e!==``}function pd(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function md(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var hd=/^[ \t]*#include +<([\w\d./]+)>/gm;function gd(e){return e.replace(hd,_d)}function _d(e,t){let n=q[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return gd(n)}var vd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yd(e){return e.replace(vd,bd)}function bd(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function xd(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Sd={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Cd(e){return Sd[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var wd={302:`ENVMAP_MODE_REFRACTION`};function Td(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:wd[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Ed={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Dd(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Ed[e.combine]||`ENVMAP_BLENDING_NONE`}function Od(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Cd(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=Td(n),d=Dd(n),f=ld(n),p=ud(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(fd).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(fd).join(`
`),g.length>0&&(g+=`
`)):(h=[xd(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(fd).join(`
`),g=[xd(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:q.tonemapping_pars_fragment,n.toneMapping===0?``:od(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,q.colorspace_pars_fragment,id(`linearToOutputTexel`,n.outputColorSpace),cd(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(fd).join(`
`)),o=gd(o),o=pd(o,n),o=md(o,n),s=gd(s),s=pd(s,n),s=md(s,n),o=yd(o),s=yd(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=Zu(i,i.VERTEX_SHADER,v),x=Zu(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=rd(i,b,`vertex`),n=rd(i,x,`fragment`);V(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):B(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new Xu(i,m),w=dd(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,Qu)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=$u++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var kd=0,Ad=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new jd(e),t.set(e,n)),n}},jd=class{constructor(e){this.id=kd++,this.code=e,this.usedTimes=0}};function Md(e){return e===1030||e===37490||e===36285}function Nd(e,t,n,r,i,a){let o=new ta,s=new Ad,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&B(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=sl[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),ee=m.isInstancedMesh===!0,M=m.isBatchedMesh===!0,te=!!i.map,ne=!!i.matcap,re=!!b,ie=re&&b.isPMREMTexture===!0,ae=!!i.aoMap,oe=!!i.lightMap,se=!!i.bumpMap&&i.wireframe===!1,ce=!!i.normalMap,le=!!i.displacementMap,ue=!!i.emissiveMap,de=!!i.metalnessMap,N=!!i.roughnessMap,fe=i.anisotropy>0,pe=i.clearcoat>0,me=i.diffuseRoughness>0,he=i.dispersion>0,ge=i.retroreflectivity>0,_e=i.iridescence>0,ve=i.sheen>0,ye=i.transmission>0,be=fe&&!!i.anisotropyMap,xe=pe&&!!i.clearcoatMap,Se=pe&&!!i.clearcoatNormalMap,Ce=pe&&!!i.clearcoatRoughnessMap,we=me&&!!i.diffuseRoughnessMap,P=_e&&!!i.iridescenceMap,Te=_e&&!!i.iridescenceThicknessMap,Ee=ve&&!!i.sheenColorMap,De=ve&&!!i.sheenRoughnessMap,F=!!i.specularMap,Oe=!!i.specularColorMap,I=!!i.specularIntensityMap,L=ye&&!!i.transmissionMap,ke=ye&&!!i.thicknessMap,Ae=!!i.gradientMap,je=!!i.alphaMap,Me=i.alphaTest>0,Ne=!!i.alphaHash,Pe=!!i.extensions,Fe=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Fe=e.toneMapping);let Ie=ie?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Le={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:M,batchingColor:M&&m._colorsTexture!==null,instancing:ee,instancingColor:ee&&m.instanceColor!==null,instancingMorph:ee&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Oi.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:te,matcap:ne,envMap:re,envMapMode:re&&b.mapping,envMapPMREM:ie,envMapMaxLod:ie?Ie.length-1:null,envMapSize:ie?Ie[0].width:null,aoMap:ae,lightMap:oe,bumpMap:se,normalMap:ce,displacementMap:le,emissiveMap:ue,normalMapObjectSpace:ce&&i.normalMapType===1,normalMapTangentSpace:ce&&i.normalMapType===0,packedNormalMap:ce&&i.normalMapType===0&&Md(i.normalMap.format),metalnessMap:de,roughnessMap:N,anisotropy:fe,anisotropyMap:be,clearcoat:pe,clearcoatMap:xe,clearcoatNormalMap:Se,clearcoatRoughnessMap:Ce,diffuseRoughness:me,diffuseRoughnessMap:we,dispersion:he,retroreflection:ge,iridescence:_e,iridescenceMap:P,iridescenceThicknessMap:Te,sheen:ve,sheenColorMap:Ee,sheenRoughnessMap:De,specularMap:F,specularColorMap:Oe,specularIntensityMap:I,transmission:ye,transmissionMap:L,thicknessMap:ke,gradientMap:Ae,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:je,alphaTest:Me,alphaHash:Ne,combine:i.combine,mapUv:te&&p(i.map.channel),aoMapUv:ae&&p(i.aoMap.channel),lightMapUv:oe&&p(i.lightMap.channel),bumpMapUv:se&&p(i.bumpMap.channel),normalMapUv:ce&&p(i.normalMap.channel),displacementMapUv:le&&p(i.displacementMap.channel),emissiveMapUv:ue&&p(i.emissiveMap.channel),metalnessMapUv:de&&p(i.metalnessMap.channel),roughnessMapUv:N&&p(i.roughnessMap.channel),anisotropyMapUv:be&&p(i.anisotropyMap.channel),clearcoatMapUv:xe&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:Se&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:we&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:P&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:De&&p(i.sheenRoughnessMap.channel),specularMapUv:F&&p(i.specularMap.channel),specularColorMapUv:Oe&&p(i.specularColorMap.channel),specularIntensityMapUv:I&&p(i.specularIntensityMap.channel),transmissionMapUv:L&&p(i.transmissionMap.channel),thicknessMapUv:ke&&p(i.thicknessMap.channel),alphaMapUv:je&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(ce||fe),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(te||je),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&ce===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Fe,decodeVideoTexture:te&&i.map.isVideoTexture===!0&&Oi.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ue&&i.emissiveMap.isVideoTexture===!0&&Oi.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Pe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Pe&&i.extensions.multiDraw===!0||M)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=sl[t];n=Ks.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new Od(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function Pd(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Fd(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Id(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ld(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Fd),r.length>1&&r.sort(t||Id),i.length>1&&i.sort(t||Id)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Rd(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Ld,e.set(t,[i])):n>=r.length?(i=new Ld,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function zd(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new U,color:new G};break;case`SpotLight`:n={position:new U,direction:new U,color:new G,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new U,color:new G,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new U,skyColor:new G,groundColor:new G};break;case`RectAreaLight`:n={color:new G,position:new U,halfWidth:new U,halfHeight:new U}}return e[t.id]=n,n}}}function Bd(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Vd=0;function Hd(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Ud(e){let t=new zd,n=Bd(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new U);let i=new U,a=new Wi,o=new Wi;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Hd);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=J.LTC_FLOAT_1,r.rectAreaLTC2=J.LTC_FLOAT_2):(r.rectAreaLTC1=J.LTC_HALF_1,r.rectAreaLTC2=J.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Vd++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Wd(e){let t=new Ud(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function Gd(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Wd(e),t.set(n,[a])):r>=i.length?(a=new Wd(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Kd=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qd=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Jd=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],Yd=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Xd=new Wi,Zd=new U,Qd=new U;function $d(e,t,n){let r=new Es,i=new H,a=new H,o=new zi,s=new Qs,c=new $s,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new Ys({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new H},radius:{value:4}},vertexShader:Kd,fragmentShader:qd}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new xo;m.setAttribute(`position`,new ao(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new K(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(B(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){B(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){B(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Vi(i.x,i.y,{format:Fn,type:Sn,minFilter:fn,magFilter:fn,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new js(i.x,i.y,xn),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=jn,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=ln,d.map.depthTexture.magFilter=ln}else l.isPointLight?(d.map=new gl(i.x),d.map.depthTexture=new Ms(i.x,bn)):(d.map=new Vi(i.x,i.y),d.map.depthTexture=new js(i.x,i.y,bn)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=jn,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=fn,d.map.depthTexture.magFilter=fn):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=ln,d.map.depthTexture.magFilter=ln);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let _=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Zd.setFromMatrixPosition(l.matrixWorld),e.position.copy(Zd),Qd.copy(e.position),Qd.add(Jd[t]),e.up.copy(Yd[t]),e.lookAt(Qd),e.updateMatrixWorld(),n.makeTranslation(-Zd.x,-Zd.y,-Zd.z),Xd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Xd,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,_,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Vi(i.x,i.y,{format:Fn,type:Sn}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=y(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)b(l[e],i,a,o,s,c)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function ef(e,t){function n(){let t=!1,n=new zi,r=null,i=new zi(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?de(e.DEPTH_TEST):N(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Gr[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?de(e.STENCIL_TEST):N(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new G(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,te=0,ne=e.getParameter(e.VERSION);ne.indexOf(`WebGL`)===-1?ne.indexOf(`OpenGL ES`)!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),M=te>=2):(te=parseFloat(/^WebGL (\d)/.exec(ne)[1]),M=te>=1);let re=null,ie={},ae=e.getParameter(e.SCISSOR_BOX),oe=e.getParameter(e.VIEWPORT),se=new zi().fromArray(ae),ce=new zi().fromArray(oe);function le(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ue={};ue[e.TEXTURE_2D]=le(e.TEXTURE_2D,e.TEXTURE_2D,1),ue[e.TEXTURE_CUBE_MAP]=le(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[e.TEXTURE_2D_ARRAY]=le(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ue[e.TEXTURE_3D]=le(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),de(e.DEPTH_TEST),o.setFunc(3),ye(!1),be(1),de(e.CULL_FACE),_e(0);function de(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function N(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function fe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function pe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function me(t){return h!==t&&(e.useProgram(t),h=t,!0)}let he={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};he[103]=e.MIN,he[104]=e.MAX;let ge={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function _e(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(N(e.BLEND),g=!1);else if(g===!1&&(de(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:V(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:V(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:V(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:V(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(he[n],he[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ge[r],ge[i],ge[o],ge[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ve(t,n){t.side===2?N(e.CULL_FACE):de(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ye(r),t.blending===1&&t.transparent===!1?_e(0):_e(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Se(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?de(e.SAMPLE_ALPHA_TO_COVERAGE):N(e.SAMPLE_ALPHA_TO_COVERAGE)}function ye(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function be(t){t===0?N(e.CULL_FACE):(de(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function xe(t){t!==k&&(M&&e.lineWidth(t),k=t)}function Se(t,n,r){t?(de(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):N(e.POLYGON_OFFSET_FILL)}function Ce(t){t?de(e.SCISSOR_TEST):N(e.SCISSOR_TEST)}function we(t){t===void 0&&(t=e.TEXTURE0+ee-1),re!==t&&(e.activeTexture(t),re=t)}function P(t,n,r){r===void 0&&(r=re===null?e.TEXTURE0+ee-1:re);let i=ie[r];i===void 0&&(i={type:void 0,texture:void 0},ie[r]=i),(i.type!==t||i.texture!==n)&&(re!==r&&(e.activeTexture(r),re=r),e.bindTexture(t,n||ue[t]),i.type=t,i.texture=n)}function Te(){let t=ie[re];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ee(){try{e.compressedTexImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function De(){try{e.compressedTexImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function F(){try{e.texSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Oe(){try{e.texSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function I(){try{e.compressedTexSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function L(){try{e.compressedTexSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function ke(){try{e.texStorage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ae(){try{e.texStorage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function je(){try{e.texImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Me(){try{e.texImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ne(t){return d[t]===void 0?e.getParameter(t):d[t]}function Pe(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Fe(t){se.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),se.copy(t))}function Ie(t){ce.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ce.copy(t))}function Le(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function Re(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function R(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},re=null,ie={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new G(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,se.set(0,0,e.canvas.width,e.canvas.height),ce.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:de,disable:N,bindFramebuffer:fe,drawBuffers:pe,useProgram:me,setBlending:_e,setMaterial:ve,setFlipSided:ye,setCullFace:be,setLineWidth:xe,setPolygonOffset:Se,setScissorTest:Ce,activeTexture:we,bindTexture:P,unbindTexture:Te,compressedTexImage2D:Ee,compressedTexImage3D:De,texImage2D:je,texImage3D:Me,pixelStorei:Pe,getParameter:Ne,updateUBOMapping:Le,uniformBlockBinding:Re,texStorage2D:ke,texStorage3D:Ae,texSubImage2D:F,texSubImage3D:Oe,compressedTexSubImage2D:I,compressedTexSubImage3D:L,scissor:Fe,viewport:Ie,reset:R}}function tf(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new H,u=new WeakMap,d=new Set,f,p=new WeakMap,m=new Set,h=new FinalizationRegistry(e=>m.delete(e)),g=!1;try{g=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function _(e,t){return g?new OffscreenCanvas(e,t):Rr(`canvas`)}function v(e,t,n){let r=1,i=ke(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=_(n,a));let o=t?_(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),B(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&B(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function y(e){return e.generateMipmaps}function b(t){e.generateMipmap(t)}function x(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];B(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||B(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Ar:Oi.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function C(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,B(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function w(e,t){return y(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function T(e){let t=new WeakRef(e);r.get(e).__ref=t,m.add(t),h.register(e,t,t)}function E(e){let t=r.get(e).__ref;t!==void 0&&(m.delete(t),h.unregister(t))}function D(e){k(e.target)}function O(e){A(e.target)}function k(e){e.removeEventListener(`dispose`,D),E(e),ee(e),e.isVideoTexture&&u.delete(e),e.isHTMLTexture&&d.delete(e)}function A(e){e.removeEventListener(`dispose`,O),E(e),te(e)}function j(){for(let e of m){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?A(t):k(t))}m.clear(),d.clear()}function ee(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&M(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function M(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function te(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&k(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let ne=0;function re(){ne=0}function ie(){return ne}function ae(e){ne=e}function oe(){let e=ne;return e>=i.maxTextures&&B(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),ne+=1,e}function se(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ce(t,i){let a=r.get(t);if(t.isVideoTexture&&I(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)B(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)B(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ve(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function le(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ve(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function ue(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ve(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function de(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?ye(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let N={[on]:e.REPEAT,[sn]:e.CLAMP_TO_EDGE,[cn]:e.MIRRORED_REPEAT},fe={[ln]:e.NEAREST,[un]:e.NEAREST_MIPMAP_NEAREST,[dn]:e.NEAREST_MIPMAP_LINEAR,[fn]:e.LINEAR,[pn]:e.LINEAR_MIPMAP_NEAREST,[mn]:e.LINEAR_MIPMAP_LINEAR},pe={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function me(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&B(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,N[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,N[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,N[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,fe[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,fe[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,pe[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function he(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,D),T(n));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=se(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&M(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ge(e,t,n){return Math.floor(Math.floor(e/n)/t)}function _e(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ge(n.start,r.width,4),c=ge(t.start,r.width,4);n.start<=i+1&&a===c&&ge(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function ve(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=he(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Oi.getPrimaries(Oi.workingColorSpace),r=o.colorSpace===``?null:Oi.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=v(o.image,!1,i.maxTextureSize);t=L(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=S(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);me(c,o);let h,g=o.mipmaps,_=o.isVideoTexture!==!0,x=f.__version===void 0||l===!0,T=u.dataReady,E=w(o,t);if(o.isDepthTexture)m=C(o.format===Mn,o.type),x&&(_?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else _?(x&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&_e(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){_&&x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(_){if(T){if(o.layerUpdates.size>0){let t=rl(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else _?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):_?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(_){if(x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=rl(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)_?(x&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(x){if(_)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(_&&x){let t=ke(g[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(_){if(x){let r=ke(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);y(o)&&o.mipmapsAutoUpdate===!0&&b(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ye(t,o,s){if(o.image.length!==6)return;let c=he(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Oi.getPrimaries(Oi.workingColorSpace),r=o.colorSpace===``?null:Oi.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=v(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=L(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),x=S(o.internalFormat,g,_,o.normalized,o.colorSpace),T=o.isVideoTexture!==!0,E=u.__version===void 0||c===!0,D=l.dataReady,O=w(o,h);me(e.TEXTURE_CUBE_MAP,o);let k;if(o.isDepthTexture){if(x=C(o.format===Mn,o.type),E){if(T)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,x,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,h.width,h.height,0,g,_,null)}}else if(f){T&&E&&n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,h.width,h.height);for(let t=0;t<6;t++){k=m[t].mipmaps;for(let r=0;r<k.length;r++){let i=k[r];o.format===1023?T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,g,_,i.data):g===null?B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):T?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,i.data)}}}else{if(k=o.mipmaps,T&&E){k.length>0&&O++;let t=ke(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,t.width,t.height)}for(let t=0;t<6;t++)if(p){T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,i.width,i.height,0,g,_,i.data)}}else{T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,g,_,m[t]);for(let r=0;r<k.length;r++){let i=k[r];T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,g,_,i.image[t])}}}y(o)&&o.mipmapsAutoUpdate===!0&&b(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function be(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=S(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Oe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,F(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function xe(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=C(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Oe(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,F(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,F(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=S(o.internalFormat,c,l,o.normalized,o.colorSpace);Oe(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,F(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,F(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Se(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?de(i.depthTexture,0):ce(i.depthTexture,0);let u=c.__webglTexture,d=F(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Oe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Oe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Ce(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Se(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?Se(i.__webglFramebuffer[0],t,0):Se(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),xe(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),xe(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function we(t,n,i){let a=r.get(t);n!==void 0&&be(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Ce(t)}function P(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,O),T(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Oe(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=S(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=F(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),xe(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),me(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)be(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else be(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);y(i)?b(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),me(c,a),be(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),y(a)&&b(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),me(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)be(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else be(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);y(i)?b(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&Ce(t)}function Te(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(y(a)&&a.mipmapsAutoUpdate===!0){let t=x(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),b(t),n.unbindTexture()}}}let Ee=[];function De(t){if(t.samples>0){if(Oe(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Ee.length=0,Ee.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&Ee.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ee))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function F(e){return Math.min(i.maxSamples,e.samples)}function Oe(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function I(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function L(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Oi.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&B(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):V(`WebGLTextures: Unsupported texture color space:`,n)),t}function ke(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=oe,this.resetTextureUnits=re,this.getTextureUnits=ie,this.setTextureUnits=ae,this.setTexture2D=ce,this.setTexture2DArray=le,this.setTexture3D=ue,this.setTextureCube=de,this.rebindTextures=we,this.setupRenderTarget=P,this.updateRenderTargetMipmap=Te,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=be,this.useMultisampledRTT=Oe,this.dispose=j}function nf(e,t){function n(n,r=``){let i,a=Oi.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var rf=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,af=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,of=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ns(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ys({vertexShader:rf,fragmentShader:af,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new K(new Rs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},sf=class extends Kr{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new of,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new H,C=null,w=null,T=new Nc;T.viewport=new zi;let E=new Nc;E.viewport=new zi;let D=[T,E],O=new Bc,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new ba,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new ba,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new ba,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,M);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,ae.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&B(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&B(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,M),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?Mn:jn,a=_.stencil?Tn:bn);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Vi(d.textureWidth,d.textureHeight,{format:An,type:hn,depthTexture:new js(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Vi(f.framebufferWidth,f.framebufferHeight,{format:An,type:hn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ae.setContext(r),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function M(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}function te(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;te(O,i);for(let e=0;e<a.length;e++)te(a[e],i);O.projectionMatrix.copy(T.projectionMatrix),O.projectionMatrixInverse.copy(T.projectionMatrixInverse),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),ne(e,O,i)};function ne(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Xr*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let re=null;function ie(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Nc,o.layers.enable(n),o.viewport=new zi,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Ns,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}re&&re(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let ae=new al;ae.setAnimationLoop(ie),this.setAnimationLoop=function(e){re=e},this.dispose=function(){}}},cf=new Wi,lf=new W;lf.set(-1,0,0,0,1,0,0,0,1);function uf(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Gs(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(cf.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(lf),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function df(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?B(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):B(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var ff=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),pf=null;function mf(){return pf===null&&(pf=new ps(ff,16,16,Fn,Sn),pf.name=`DFG_LUT`,pf.minFilter=fn,pf.magFilter=fn,pf.wrapS=sn,pf.wrapT=sn,pf.generateMipmaps=!1,pf.needsUpdate=!0),pf}var hf=class{constructor(e={}){let{canvas:t=zr(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=hn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Ln,In,Pn]),g=new Set([hn,bn,vn,Tn,Cn,wn]),_=new Uint32Array(4),v=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=Or;let j=0,ee=0,M=null,te=-1,ne=null,re=new zi,ie=new zi,ae=null,oe=new G(0),se=0,ce=t.width,le=t.height,ue=1,de=null,N=null,fe=new zi(0,0,ce,le),pe=new zi(0,0,ce,le),me=!1,he=new Es,ge=new Os,_e=!1,ve=!1,ye=new Wi,be=new U,xe=new zi,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ce=!1;function we(){return M===null?ue:1}let P=n;function Te(e,n){return t.getContext(e,n)}let Ee,De,F,Oe,I,L,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,R,ze,Be,Ve,He,Ue,We;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,qe,!1),t.addEventListener(`webglcontextrestored`,Je,!1),t.addEventListener(`webglcontextcreationerror`,Ye,!1),P===null){let t=`webgl2`;if(P=Te(t,e),P===null)throw Te(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Ge()}catch(e){throw t.removeEventListener(`webglcontextlost`,qe,!1),t.removeEventListener(`webglcontextrestored`,Je,!1),t.removeEventListener(`webglcontextcreationerror`,Ye,!1),V(`WebGLRenderer: `+e.message),e}function Ge(){Ee=new Pl(P),Ee.init(),He=new nf(P,Ee),De=new ml(P,Ee,e,He),F=new ef(P,Ee),De.reversedDepthBuffer&&d&&F.buffers.depth.setReversed(!0),O=P.createFramebuffer(),k=P.createFramebuffer(),A=P.createFramebuffer(),Oe=new Ll(P),I=new Pd,L=new tf(P,Ee,F,I,De,He,Oe),ke=new Nl(T),Ae=new ol(P),Ue=new fl(P,Ae),je=new Fl(P,Ae,Oe,Ue),Me=new zl(P,je,Ae,Ue,Oe),ze=new Rl(P,De,L),Le=new hl(I),Ne=new Nd(T,ke,Ee,De,Ue,Le),Pe=new uf(T,I),Fe=new Rd,Ie=new Gd(Ee),R=new dl(T,ke,F,Me,p,s),Re=new $d(T,Me,De),We=new df(P,Oe,De,F),Be=new pl(P,Ee,Oe),Ve=new Il(P,Ee,Oe),Oe.programs=Ne.programs,T.capabilities=De,T.extensions=Ee,T.properties=I,T.renderLists=Fe,T.shadowMap=Re,T.state=F,T.info=Oe}m!==1009&&(w=new Vl(m,t.width,t.height,o,r,i));let Ke=new sf(T,P);this.xr=Ke,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let e=Ee.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ee.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(e){e!==void 0&&(ue=e,this.setSize(ce,le,!1))},this.getSize=function(e){return e.set(ce,le)},this.setSize=function(e,n,r=!0){Ke.isPresenting?B(`WebGLRenderer: Can't change size while VR device is presenting.`):(ce=e,le=n,t.width=Math.floor(e*ue),t.height=Math.floor(n*ue),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(ce*ue,le*ue).floor()},this.setDrawingBufferSize=function(e,n,r){ce=e,le=n,ue=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)V(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){B(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(re)},this.getViewport=function(e){return e.copy(fe)},this.setViewport=function(e,t,n,r){e.isVector4?fe.set(e.x,e.y,e.z,e.w):fe.set(e,t,n,r),F.viewport(re.copy(fe).multiplyScalar(we()).round())},this.getScissor=function(e){return e.copy(pe)},this.setScissor=function(e,t,n,r){e.isVector4?pe.set(e.x,e.y,e.z,e.w):pe.set(e,t,n,r),F.scissor(ie.copy(pe).multiplyScalar(we()).round())},this.getScissorTest=function(){return me},this.setScissorTest=function(e){F.setScissorTest(me=e)},this.setOpaqueSort=function(e){de=e},this.setTransparentSort=function(e){N=e},this.getClearColor=function(e){return e.copy(R.getClearColor())},this.setClearColor=function(){R.setClearColor(...arguments)},this.getClearAlpha=function(){return R.getClearAlpha()},this.setClearAlpha=function(){R.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=h.has(t)}if(e){let e=M.texture.type,t=g.has(e),n=R.getClearColor(),r=R.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,P.clearBufferuiv(P.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,P.clearBufferiv(P.COLOR,0,v))}else r|=P.COLOR_BUFFER_BIT}t&&(r|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&P.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,qe,!1),t.removeEventListener(`webglcontextrestored`,Je,!1),t.removeEventListener(`webglcontextcreationerror`,Ye,!1),R.dispose(),Fe.dispose(),Ie.dispose(),L.dispose(),I.dispose(),ke.dispose(),Me.dispose(),je.dispose(),Ue.dispose(),We.dispose(),Ne.dispose(),Ke.dispose(),Ke.removeEventListener(`sessionstart`,nt),Ke.removeEventListener(`sessionend`,rt),it.stop()};function qe(e){e.preventDefault(),Vr(`WebGLRenderer: Context Lost.`),E=!0}function Je(){Vr(`WebGLRenderer: Context Restored.`),E=!1;let e=Oe.autoReset,t=Re.enabled,n=Re.autoUpdate,r=Re.needsUpdate,i=Re.type;Ge(),Oe.autoReset=e,Re.enabled=t,Re.autoUpdate=n,Re.needsUpdate=r,Re.type=i}function Ye(e){V(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Xe(e){let t=e.target;t.removeEventListener(`dispose`,Xe),Ze(t)}function Ze(e){Qe(e),I.remove(e)}function Qe(e){let t=I.get(e).programs;t!==void 0&&(t.forEach(function(e){Ne.releaseProgram(e)}),e.isShaderMaterial&&Ne.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Se);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=ht(e,t,n,r,i);F.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=je.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ue.setup(i,r,s,n,c);let h,g=Be;if(c!==null&&(h=Ae.get(c),g=Ve,g.setIndex(h)),i.isMesh)r.wireframe===!0?(F.setLineWidth(r.wireframeLinewidth*we()),g.setMode(P.LINES)):g.setMode(P.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),F.setLineWidth(e*we()),i.isLineSegments?g.setMode(P.LINES):i.isLineLoop?g.setMode(P.LINE_LOOP):g.setMode(P.LINE_STRIP)}else i.isPoints?g.setMode(P.POINTS):i.isSprite&&g.setMode(P.TRIANGLES);if(i.isBatchedMesh){if(Ee.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ae.get(c).bytesPerElement:1,o=I.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(P,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function $e(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),_e===!0&&Le.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,dt(e,t,r),e.side=0,e.needsUpdate=!0,dt(e,t,r),e.side=2):dt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Ie.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),ve=this.localClippingEnabled,_e=Le.init(this.clippingPlanes,ve),_e===!0&&Le.setGlobalState(this.clippingPlanes,t),D!==null&&Re.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];$e(o,n,t,e),r.add(o)}else $e(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=I.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Ee.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let et=null;function tt(e){et&&et(e)}function nt(){it.stop()}function rt(){it.start()}let it=new al;it.setAnimationLoop(tt),typeof self<`u`&&it.setContext(self),this.setAnimationLoop=function(e){et=e,Ke.setAnimationLoop(e),e===null?it.stop():it.start()},Ke.addEventListener(`sessionstart`,nt),Ke.addEventListener(`sessionend`,rt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){V(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ke.enabled===!0&&Ke.isPresenting===!0,r=w!==null&&(M===null||n)&&w.begin(T,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ke.enabled===!0&&Ke.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ke.cameraAutoUpdate===!0&&Ke.updateCamera(t),t=Ke.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,M),x=Ie.get(e,C.length),x.init(t),x.state.textureUnits=L.getTextureUnits(),C.push(x),ye.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?ge.setFromArrayCamera(t):he.setFromProjectionMatrix(ye,Fr,t.reversedDepth),ve=this.localClippingEnabled,_e=Le.init(this.clippingPlanes,ve),b=Fe.get(e,S.length),b.init(),S.push(b),this.info.render.frame++,Ke.enabled===!0&&Ke.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&at(e,t,-1/0,T.sortObjects)}at(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(de,N),Ce=Ke.enabled===!1||Ke.isPresenting===!1||Ke.hasDepthSensing()===!1,Ce&&R.addToRenderList(b,e),this.info.autoReset===!0&&this.info.reset(),_e===!0&&Le.beginShadows();let i=x.state.shadowsArray;if(Re.render(i,e,t),_e===!0&&Le.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];st(n,r,e,a)}Ce&&R.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];ot(b,e,n,n.viewport)}}else r.length>0&&st(n,r,e,t),Ce&&R.render(e),ot(b,e,t)}M!==null&&ee===0&&(L.updateMultisampleRenderTarget(M),L.updateRenderTargetMipmap(M)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Ue.resetDefaultState(),te=-1,ne=null,C.pop(),C.length>0?(x=C[C.length-1],L.setTextureUnits(x.state.textureUnits),_e===!0&&Le.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function at(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?ge:he;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&xe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ye);let i=Me.update(e),a=e.material;a.visible&&b.push(e,i,a,n,xe.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?ge:he;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=Me.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),xe.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),xe.copy(e.boundingSphere.center)),xe.applyMatrix4(e.matrixWorld).applyMatrix4(ye)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,xe.z,s,t)}}else a.visible&&b.push(e,i,a,n,xe.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)at(i[e],t,n,r)}function ot(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),_e===!0&&Le.setGlobalState(T.clippingPlanes,n),r&&F.viewport(re.copy(r)),i.length>0&&ct(i,t,n),a.length>0&&ct(a,t,n),o.length>0&&ct(o,t,n),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function st(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Ee.has(`EXT_color_buffer_half_float`)||Ee.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Vi(1,1,{generateMipmaps:!0,type:e?Sn:hn,minFilter:mn,samples:Math.max(4,De.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Oi.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||re;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(oe),se=T.getClearAlpha(),se<1&&T.setClearColor(16777215,.5),T.clear(),Ce&&R.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),_e===!0&&Le.setGlobalState(T.clippingPlanes,r),ct(e,n,r),L.updateMultisampleRenderTarget(a),L.updateRenderTargetMipmap(a),Ee.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,lt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(L.updateMultisampleRenderTarget(a),L.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(oe,se),d!==void 0&&(r.viewport=d),T.toneMapping=u}function ct(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&lt(o,t,n,s,l,c)}}function lt(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function ut(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function dt(e,t,n){t.isScene!==!0&&(t=Se);let r=I.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Ne.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Ne.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ke.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Xe),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return mt(e,s),d}else s.uniforms=Ne.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Ne.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Le.uniform),mt(e,s),r.needsLights=_t(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=ut(x.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function ft(e,t,n,r,i){let a=I.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=dt(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function pt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Xu.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function mt(e,t){let n=I.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function ht(e,t,n,r,i){t.isScene!==!0&&(t=Se),L.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=M===null?T.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Oi.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ke.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=I.get(r),b=x.state.lights;if(_e===!0&&(ve===!0||e!==ne)){let t=e===ne&&r.id===te;Le.setState(r,e,t)}let S=!1,C=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==b.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?S=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Le.numPlanes||v.numIntersection!==Le.numIntersection)?S=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===ut(x.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(C=!0):S=!0:S=!0:(S=!0,v.__version=r.version);let w=v.currentProgram;(S===!0||C===!0)&&(w=C===!0?ft(r,t,i,s,h):dt(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,w,v));let E=!1,O=!1,k=!1,A=w.getUniforms(),j=v.uniforms;if(F.useProgram(w.program)&&(E=!0,O=!0,k=!0),r.id!==te&&(te=r.id,O=!0),E||ne!==e){F.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),A.setValue(P,`projectionMatrix`,e.projectionMatrix),A.setValue(P,`viewMatrix`,e.matrixWorldInverse);let t=A.map.cameraPosition;t!==void 0&&t.setValue(P,be.setFromMatrixPosition(e.matrixWorld)),De.logarithmicDepthBuffer&&A.setValue(P,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&A.setValue(P,`isOrthographic`,e.isOrthographicCamera===!0),ne!==e&&(ne=e,O=!0,k=!0)}if(v.needsLights&&(b.state.sunShadowMap.length>0&&A.setValue(P,`sunShadowMap`,b.state.sunShadowMap,L),b.state.directionalShadowMap.length>0&&A.setValue(P,`directionalShadowMap`,b.state.directionalShadowMap,L),b.state.spotShadowMap.length>0&&A.setValue(P,`spotShadowMap`,b.state.spotShadowMap,L),b.state.pointShadowMap.length>0&&A.setValue(P,`pointShadowMap`,b.state.pointShadowMap,L)),i.isSkinnedMesh){A.setOptional(P,i,`bindMatrix`),A.setOptional(P,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),A.setValue(P,`boneTexture`,e.boneTexture,L))}i.isBatchedMesh&&(A.setOptional(P,i,`batchingTexture`),A.setValue(P,`batchingTexture`,i._matricesTexture,L),A.setOptional(P,i,`batchingIdTexture`),A.setValue(P,`batchingIdTexture`,i._indirectTexture,L),A.setOptional(P,i,`batchingColorTexture`),i._colorsTexture!==null&&A.setValue(P,`batchingColorTexture`,i._colorsTexture,L));let ee=n.morphAttributes;if((ee.position!==void 0||ee.normal!==void 0||ee.color!==void 0)&&ze.update(i,n,w),(O||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,A.setValue(P,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(j.envMapIntensity.value=t.environmentIntensity),j.dfgLUT!==void 0&&(j.dfgLUT.value=mf()),O){if(A.setValue(P,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&gt(j,k),a&&r.fog===!0&&Pe.refreshFogUniforms(j,a),Pe.refreshMaterialUniforms(j,r,ue,le,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=y,t=0;for(let n of x.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;j.probesSH.value=e.textures,j.probesMin.value=e.min,j.probesMax.value=e.max,j.probesResolution.value=e.resolution}Xu.upload(P,pt(v),j,L)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Xu.upload(P,pt(v),j,L),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&A.setValue(P,`center`,i.center),A.setValue(P,`modelViewMatrix`,i.modelViewMatrix),A.setValue(P,`normalMatrix`,i.normalMatrix),A.setValue(P,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];We.update(n,w),We.bind(n,w)}}return w}function gt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function _t(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=I.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),I.get(e.texture).__webglTexture=t,I.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=I.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){M=e,j=t,ee=n;let r=null,i=!1,a=!1;if(e){let o=I.get(e);if(o.__useDefaultFramebuffer!==void 0){F.bindFramebuffer(P.FRAMEBUFFER,o.__webglFramebuffer),re.copy(e.viewport),ie.copy(e.scissor),ae=e.scissorTest,F.viewport(re),F.scissor(ie),F.setScissorTest(ae),te=-1;return}if(o.__webglFramebuffer===void 0)L.setupRenderTarget(e);else if(o.__hasExternalTextures)L.rebindTextures(e,I.get(e.texture).__webglTexture,I.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&I.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);L.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=I.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&L.useMultisampledRTT(e)===!1?I.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,re.copy(e.viewport),ie.copy(e.scissor),ae=e.scissorTest}else re.copy(fe).multiplyScalar(ue).floor(),ie.copy(pe).multiplyScalar(ue).floor(),ae=me;if(n!==0&&(r=O),F.bindFramebuffer(P.FRAMEBUFFER,r)&&F.drawBuffers(e,r),F.viewport(re),F.scissor(ie),F.setScissorTest(ae),i){let r=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=I.get(e.textures[t]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,t.__webglTexture,n)}te=-1};function vt(e){let t=I.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=De.textureFormatReadable(e.format),t.__typeReadable=De.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){F.bindFramebuffer(P.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let u=vt(o);if(u.__formatReadable===!1){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&P.readPixels(t,n,r,i,He.convert(c),He.convert(l),a)}finally{let e=M===null?null:I.get(M).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){F.bindFramebuffer(P.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let d=vt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.bufferData(P.PIXEL_PACK_BUFFER,a.byteLength,P.STREAM_READ),P.readPixels(t,n,r,i,He.convert(l),He.convert(u),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let p=M===null?null:I.get(M).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,p);let m=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Wr(P,m,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,a),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(f),P.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;L.setTexture2D(e,0),P.copyTexSubImage2D(P.TEXTURE_2D,n,0,0,o,s,i,a),F.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=He.convert(t.format),_=He.convert(t.type),v;t.isData3DTexture?(L.setTexture3D(t,0),v=P.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(L.setTexture2DArray(t,0),v=P.TEXTURE_2D_ARRAY):(L.setTexture2D(t,0),v=P.TEXTURE_2D),F.activeTexture(P.TEXTURE0),F.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,t.flipY),F.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),F.pixelStorei(P.UNPACK_ALIGNMENT,t.unpackAlignment);let y=F.getParameter(P.UNPACK_ROW_LENGTH),b=F.getParameter(P.UNPACK_IMAGE_HEIGHT),x=F.getParameter(P.UNPACK_SKIP_PIXELS),S=F.getParameter(P.UNPACK_SKIP_ROWS),C=F.getParameter(P.UNPACK_SKIP_IMAGES);F.pixelStorei(P.UNPACK_ROW_LENGTH,h.width),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,h.height),F.pixelStorei(P.UNPACK_SKIP_PIXELS,l),F.pixelStorei(P.UNPACK_SKIP_ROWS,u),F.pixelStorei(P.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=I.get(e),r=I.get(t),h=I.get(n.__renderTarget),g=I.get(r.__renderTarget);F.bindFramebuffer(P.READ_FRAMEBUFFER,h.__webglFramebuffer),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(e).__webglTexture,i,d+n),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(t).__webglTexture,a,m+n)),P.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,P.DEPTH_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||I.has(e)){let n=I.get(e),r=I.get(t);F.bindFramebuffer(P.READ_FRAMEBUFFER,k),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,n.__webglTexture,i),T?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,r.__webglTexture,a),i===0?T?P.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):P.copyTexSubImage2D(v,a,f,p,l,u,o,s):P.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,P.COLOR_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?P.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h);F.pixelStorei(P.UNPACK_ROW_LENGTH,y),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,b),F.pixelStorei(P.UNPACK_SKIP_PIXELS,x),F.pixelStorei(P.UNPACK_SKIP_ROWS,S),F.pixelStorei(P.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&P.generateMipmap(v),F.unbindTexture()},this.initRenderTarget=function(e){I.get(e).__webglFramebuffer===void 0&&L.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?L.setTextureCube(e,0):e.isData3DTexture?L.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?L.setTexture2DArray(e,0):L.setTexture2D(e,0),F.unbindTexture()},this.resetState=function(){j=0,ee=0,M=null,F.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Fr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Oi._getDrawingBufferColorSpace(e),t.unpackColorSpace=Oi._getUnpackColorSpace()}},gf=`Anna.Ben.Clara.David.Elena.Felix.Greta.Hannah.Jan.Jonas.Julia.Karl.Laura.Lea.Leon.Lukas.Marie.Max.Mia.Niklas.Nina.Paul.Sophie.Tim.Tobias.Lena.Emma.Finn.Sarah.Moritz.Katharina.Simon.Lisa.Erik.Johanna.Philipp.Ayşe.Mehmet.Elif.Can.Olga.Piotr.Marta.Luca.Sofia.Ahmad.Yasmin.Stefan.Sabine.Thomas.Andrea.Michael.Petra`.split(`.`),_f=`Müller.Schmidt.Schneider.Fischer.Weber.Meyer.Wagner.Becker.Schulz.Hoffmann.Schäfer.Koch.Bauer.Richter.Klein.Wolf.Schröder.Neumann.Schwarz.Zimmermann.Braun.Krüger.Hofmann.Hartmann.Lange.Schmitt.Werner.Schmitz.Krause.Meier.Lehmann.Schmid.Schulze.Maier.Köhler.Herrmann.König.Walter.Mayer.Huber.Kaiser.Fuchs.Peters.Lang.Scholz.Yılmaz.Kaya.Nowak.Kowalski.Jung.Hahn.Vogel.Friedrich.Keller.Günther.Frank.Berger`.split(`.`),vf={apple:`Äpfel`,banana:`Bananen`,strawberry:`Erdbeeren`,grape:`Trauben`,mango:`Mangos`,dragonfruit:`Drachenfrüchte`},yf={underground:`Untergrund`,station:`Bahnhofsviertel`,oldtown:`Altstadt`,scene:`Szeneviertel`,shopping:`Einkaufsmeile`,banking:`Bankenviertel`},bf={handcart:`Handkarren`,cargobike:`Lastenräder`},xf=[`Hof Brinkmann`,`Obsthof Lindenau`,`Tropenhaus Kessler`,`Weingut Sonnenhang`,`Hof Petersen`,`Glashaus Exotica`],Sf=[`Henning Brinkmann`,`Greta Lindenau`,`Ralf Kessler`,`Ilse Hartmann`,`Jens Petersen`,`Vera Nowak`],Cf={stubborn:`stur`,fearful:`ängstlich`,greedy:`gierig`,honest:`ehrlich`},wf={advance:`Vorschuss zahlen`,bind:`Langfristig binden`,helpers:`Erntehelfer stellen`,protect:`Schutz anbieten`,refuse:`Abnahme verweigern`,poach:`Helfer abwerben`,soil:`Bodenproben fälschen`,inspect:`Tipp ans Lebensmittelamt`,takeover:`Hof übernehmen`},Tf=`Kohl-Kalle`;function Ef(e){return Math.round(e/5)*5}function Df(e){let t=Math.max(1,e.dealers.length);return Ef(Jt.baseCost*Jt.costGrowth**(t-1))}function Of(e){return Ef(Xt.baseCost*Xt.costGrowth**+Math.max(0,e.shelves-jt.shelves))}function kf(e){return Zt.baseCost+Zt.costPerOwned*e.fighters}function Af(e){return e.shelves*Xt.cratesPerShelf}function jf(e){return e.warehouse.shelfSlots.length}function Mf(e,t){return e.districts[t]?.owner===`player`}function Nf(e){return z.indexOf(e)}function Pf(e,t,n){if(Mf(e,n))return!1;for(let r=0;r<e.districts.length;r++)if(Mf(e,r)&&t.links[r][n])return!0;return!1}function Ff(e){return e.districts.filter(e=>e.owner===`player`).length}function If(e,t){return Ft.some((n,r)=>n.fruits.includes(t)&&e.farms[r]?.owner!==`gang`)}function Lf(e,t){let n=0;for(let r of t.spots)Mf(e,r.districtIndex)&&(n+=Jt.maxPerSpot);return n}function Rf(e){return e.upgrade>0?Yt[e.upgrade-1].crates:Jt.crates}function zf(e){return e.upgrade>0?Yt[e.upgrade-1].speed:Jt.speed}function Bf(e){return Yt[e.upgrade]??null}function Vf(e,t){if(!t)return e.crates.length;let n=0;for(let r of e.crates)r.fruit===t&&n++;return n}function Hf(e,t=`rng`){let n=e,r=n[t]=n[t]+1831565813|0;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}function Uf(e,t,n,r=`rng`){return t+Hf(e,r)*(n-t)}function Wf(e,t,n=`rng`){if(t<=0)return 0;let r=Math.exp(-t),i=0,a=1;do i++,a*=Hf(e,n);while(a>r&&i<1e3);return i-1}function Gf(e){return e^1540483477}function Kf(){let e={};for(let t of Tt)e[t]=0;return e}function qf(e){return 1+Nt.qualityStep*(e-2)}function Jf(e,t,n){let r=Mt[e];return 1/((t&&r.cooledDays!==null?r.cooledDays:r.shelfDays)*qf(n)*kt)}function Yf(e,t=1){for(let n of e.crates)n.fresh>0&&(n.fresh=Math.max(0,n.fresh-Jf(n.fruit,n.cooled,n.quality)*t));for(let n of e.dealers)for(let e of n.load)e.fresh>0&&(e.fresh=Math.max(0,e.fresh-Jf(e.fruit,!1,e.quality)*t))}function Xf(e){return e<Nt.lowFreshness?Nt.lowFreshnessPrice:1}function Zf(e){let t=e.coldRoom?Nt.coldRoomCrates:0,n=e.crates.filter(e=>Mt[e.fruit].cooledDays!==null&&e.fresh>0);n.sort((e,t)=>Mt[e.fruit].shelfDays-Mt[t.fruit].shelfDays||e.fresh-t.fresh||e.id-t.id);let r=new Set;for(let e=0;e<n.length&&r.size<t;e++)r.add(n[e].id);for(let t of e.crates)t.cooled=r.has(t.id)}function Qf(e){return e.crates.length<Af(e)}function $f(e,t,n,r=1){return Qf(e)?(e.crates.push({id:e.nextId++,fruit:t,fresh:r,quality:n,cooled:!1}),!0):!1}function ep(e,t){let n=-1;for(let r=0;r<e.crates.length;r++){let i=e.crates[r];i.fruit!==t||i.fresh<=0||(n<0||i.fresh<e.crates[n].fresh)&&(n=r)}if(n<0)return null;let[r]=e.crates.splice(n,1);return{fresh:r.fresh,quality:r.quality}}function tp(e){let t=e.crates.length;e.crates=e.crates.filter(e=>e.fresh>0);let n=0;for(let t of e.dealers){for(let e of t.load)e.fresh<=0&&(n+=e.units);t.load=t.load.filter(e=>e.fresh>0)}return t-e.crates.length+Math.round(n/20)}var np=new WeakMap;function rp(e,t,n){let r=np.get(e);return r||(r=z.map((t,n)=>{let r=e.spots.filter(e=>e.districtIndex===n).length,i=Ut[t],a=0;for(let e of Tt)a+=i[e];return Tt.map(e=>Ht.demandPerSpot*r*i[e]/a)}),np.set(e,r)),r[t][Tt.indexOf(n)]}function ip(e,t,n,r,i=0){let a=rp(t,n,r);return a<=0?1/0:(e.districtSold[n][r]+i)/a}function ap(e,t,n,r,i=0){return Math.max(0,Math.min(1,1-ip(e,t,n,r,i)))}function op(e){return 1+(Ht.premiumMax-1)*e}function sp(e){return e<1?1:Math.max(0,Ht.saturatedFactor*(1-(e-1)/Ht.overflow))}function cp(e,t){let n=0;for(let r of e.crates)r.fruit===t&&r.fresh>0&&(n+=20);for(let r of e.dealers)for(let e of r.load)e.fruit===t&&(n+=e.units);return n}function lp(e,t){for(let n of Tt)cp(e,n)>0&&(e.availToday[n]+=t)}function up(e){let t=Kf();for(let n of Tt){let r=Math.max(Nt.minAvailShare,Math.min(1,e.availToday[n]/kt));t[n]=Math.round(e.soldToday[n]/r)}return t}function dp(e,t){let n=e.salesDays.slice(-Nt.rangeDays),r=e.availToday[t]/Dt,i=r>=Nt.extrapolateAfterHours?e.soldToday[t]/r*(Et.dayEndHour-Et.dayStartHour):0;if(!n.length)return i;let a=0;for(let e of n)a+=e[t];return Math.max(a/n.length,i)}var fp=999999,pp=(e,t,n)=>Math.max(t,Math.min(n,e)),mp=e=>Math.round(e*100)/100;function hp(){return Ft.map(e=>({owner:e.owner,loyalty:e.loyalty,fear:e.fear,quality:e.quality,priceBonus:0,contract:null,lastTerms:null,credit:0,guards:0,helpersUntil:-1,helpers:0,hailUntil:-1,bonusCrates:0,refusedUntil:-1,closedUntil:-1,poached:!1,licenseLost:!1,cooldowns:{},lastPressure:-99,talkDay:0,memory:[]}))}var gp=new Set([`advance`,`helpers`,`hailHelp`,`bind`]),_p=new Set([`protect`,`refuse`,`soil`,`hailPenalty`,`cancel`,`takeover`]),vp={advance:`{n} weiß noch, dass du im Voraus bezahlt hast.`,helpers:`{n} denkt gern an deine Erntehelfer zurück.`,hailHelp:`{n} hat nicht vergessen, wie du nach dem Hagel geholfen hast.`,bind:`{n} schätzt den langen Vertrag mit dir.`,protect:`{n} schaut nervös zu deinen Leuten am Hoftor.`,refuse:`{n} weiß noch, wie du die Ware einfach stehen gelassen hast.`,soil:`{n} hat die gefälschten Bodenproben nicht vergessen.`,hailPenalty:`{n} hat dir die Vertragsstrafe nach dem Hagel nicht verziehen.`,cancel:`{n} erinnert sich an den gekündigten Vertrag.`,takeover:`{n} arbeitet jetzt für dich. Freiwillig war das nicht.`};function yp(e,t){let n=e.memory.indexOf(t);n>=0&&e.memory.splice(n,1),e.memory.push(t),e.memory.length>zt.memorySlots&&e.memory.shift()}function bp(e){let t=0;for(let n of e.memory)t+=gp.has(n)?1:_p.has(n)?-1:0;return t}function xp(e,t){let n=e.farms[t],r=n.memory[n.memory.length-1];return r?vp[r].replace(`{n}`,Sf[t]):null}function Sp(e,t,n=e.day){let r=e.farms[t],i=Ft[t].capacity;return r.helpersUntil>=n&&(i*=1+Rt.helpers.capacity),r.hailUntil>=n&&(i*=Bt.hail.capacity),Math.floor(i)}function Cp(e,t,n){return Mt[n].crateCost*Ft[t].priceFactor*(1+e.farms[t].priceBonus)}function wp(e,t,n,r){let i=e.farms[t],a=Cp(e,t,n);if(i.owner===`player`)return mp(a*Lt.producerPrice);let o=r===void 0?i.contract?.lockedPrices?.[n]:void 0;if(o!==void 0)return o;let s=a*(r??i.contract?.pricePct??100)/100;return s*=1-i.fear*Lt.fearDiscount,i.guards>0&&(s*=1+Rt.protect.price),i.licenseLost&&(s*=1+Rt.soil.price),mp(s)}function Tp(e,t){return!!e&&t>=e.startDay&&t<=e.endDay}function Ep(e,t){return!!e.contract&&e.contract.endDay>=t}function Dp(e){let t=0;for(let n of Object.values(e.crates))t+=n??0;return t}function Op(e,t,n){let r=e.farms[t];if(r.owner===`player`)return 1;if(r.owner===`gang`)return 0;if(r.licenseLost)return Lt.maxChance;let i=It[Ft[t].trait],a=(n.pricePct-100)*Lt.priceWeight*i.price+(r.loyalty-50)*Lt.loyaltyWeight*i.loyalty+r.fear*Lt.fearWeight*i.fear+bp(r)*Lt.memoryWeight-i.threshold;return n.exclusive&&(a-=Lt.exclusivePct*Lt.priceWeight),pp(Lt.baseChance+a/100,Lt.minChance,Lt.maxChance)}function kp(e,t,n){let r=0;return e.farms.forEach((i,a)=>{a!==n&&Ep(i,e.day+1)&&(r+=i.contract.crates[t]??0)}),r}function Ap(e,t,n){let r=0;for(let i=0;i<z.length;i++)Mf(e,i)&&(r+=rp(t,i,n));return r/20}function jp(e,t,n){let r=e.farms[n],i=Ft[n].fruits,a=Ft[n].capacity,o={};if(r.lastTerms)for(let e of i)o[e]=r.lastTerms.crates[e]??0;else{let r=i.map(r=>Math.max(0,Math.round(Ap(e,t,r)-kp(e,r,n)))),s=r.reduce((e,t)=>e+t,0),c=s>a?a/s:1;i.forEach((e,t)=>o[e]=Math.floor(r[t]*c)),i.every(e=>!o[e])&&(o[i[0]]=Math.min(a,2))}let s={crates:o,pricePct:100,days:r.lastTerms?.days??Lt.defaultDays,exclusive:r.lastTerms?.exclusive??!1};return s.pricePct=Mp(e,n,s),s}function Mp(e,t,n){for(let r=Lt.pricePctMin;r<=Lt.pricePctMax;r+=Lt.pricePctStep)if(Op(e,t,{...n,pricePct:r})>=Lt.suggestChance)return r;return Lt.pricePctMax}function Np(e,t,n){let r=e.farms[t];if(!r)return`Diesen Hof gibt es nicht.`;if(r.owner===`gang`)return`${xf[t]} gehört der Gemüsegang und liefert nur an sie.`;if(r.owner===`player`)return null;if(r.talkDay>e.day)return`${Sf[t]} will erst morgen wieder verhandeln.`;let i=Dp(n);if(i<=0)return`Der Vertrag braucht mindestens eine Kiste pro Tag.`;if(i>Ft[t].capacity)return`${xf[t]} schafft höchstens ${Ft[t].capacity} Kisten pro Tag.`;for(let e of Object.keys(n.crates))if(!Ft[t].fruits.includes(e)&&(n.crates[e]??0)>0)return`${xf[t]} baut keine ${vf[e]} an.`;return Lt.durations.includes(n.days)?n.pricePct<Lt.pricePctMin||n.pricePct>Lt.pricePctMax?`Dieser Preis ist nicht verhandelbar.`:null:`Laufzeit 3, 7 oder 14 Tage.`}function Pp(e,t){return Ft[e].fruits.filter(e=>(t.crates[e]??0)>0).map(e=>`${t.crates[e]} ${vf[e]}`).join(` und `)}function Fp(e,t,n,r,i){let a=Np(e,t,n);if(a)return r(e,`warning`,a),!1;let o=e.farms[t];if(o.owner===`player`)return o.contract=Ip(e,n,!0),!0;let s=Op(e,t,n),c=e.stats.contracts===0&&s>=Lt.firstContractMinChance;if(Hf(e)<s||c)return o.contract=Ip(e,n,!1),o.lastTerms={...n,crates:{...n.crates}},e.stats.contracts++,i(`contract`),r(e,`story`,`Vertrag mit ${xf[t]}: ${Pp(t,n)} pro Tag, ${n.days} Tage${n.exclusive?`, exklusiv`:``}.`),!0;o.talkDay=e.day+Lt.rejectCooldownDays,i(`bad`);let l=xp(e,t);return r(e,`warning`,`${Sf[t]} lehnt ab und will erst morgen wieder verhandeln.${l?` ${l}`:``}`),!1}function Ip(e,t,n){return{crates:{...t.crates},pricePct:t.pricePct,days:t.days,startDay:e.day+1,endDay:n?fp:e.day+t.days,exclusive:n||t.exclusive,priceLock:!1,lockedPrices:null}}function Lp(e,t,n,r){let i=e.farms[t],a=i.contract??null,o=a?{crates:a.crates,pricePct:a.pricePct,days:a.days,exclusive:a.exclusive}:i.lastTerms;return!o||i.owner!==`free`?!1:Op(e,t,o)<Lt.renewMinChance?(n(e,`warning`,`${Sf[t]} will zu diesen Bedingungen nicht verlängern. Biete einen neuen Vertrag an.`),r(`bad`),!1):(a&&a.endDay>=e.day?a.endDay+=o.days:i.contract=Ip(e,o,!1),i.lastTerms={...o,crates:{...o.crates}},e.stats.contracts++,r(`contract`),n(e,`story`,`Vertrag mit ${xf[t]} verlängert bis Tag ${i.contract.endDay+1}.`),!0)}function Rp(e,t,n){let r=e.farms[t];r.contract&&(r.owner===`free`&&(r.loyalty=pp(r.loyalty+Lt.cancelLoyalty,0,100),yp(r,`cancel`)),r.contract=null,r.credit=0,n(e,`info`,`Vertrag mit ${xf[t]} gekündigt.`))}function zp(e,t,n){let r=e.farms[t],i=r.contract;if(!Tp(i,n)||r.closedUntil>=n||r.refusedUntil>=n||r.owner===`gang`)return[];let a=[],o=Sp(e,t,n),s=r.helpersUntil>=n?1+Rt.helpers.capacity:1;for(let n of Ft[t].fruits){let c=Math.round((i.crates[n]??0)*s),l=Math.min(c,o);o-=l;let u=wp(e,t,n);for(let e=0;e<l;e++)a.push({fruit:n,quality:r.quality,price:u,source:t})}if(r.bonusCrates>0&&n===e.day){let n=Ft[t].fruits.filter(e=>(i.crates[e]??0)>0);for(let i=0;i<r.bonusCrates;i++){let o=n[i%n.length]??Ft[t].fruits[0];a.push({fruit:o,quality:r.quality,price:mp(wp(e,t,o)*Bt.harvest.price),source:t})}}return a}function Bp(e,t=e.day){let n=[];for(let r=0;r<e.farms.length;r++)for(let i of zp(e,r,t))n.push(i);return n}function Vp(e,t){let n=0;for(let r=0;r<e.farms.length;r++)for(let i of zp(e,r,e.day+1))i.fruit===t&&n++;return n}function Hp(e,t){let n=t.source>=0?e.farms[t.source]:null;return n?Math.min(n.credit,t.price):0}function Up(e,t){for(let n of t){let t=e.farms[n];t&&(t.loyalty=pp(t.loyalty+Lt.backlogLoyalty,0,100))}}function Wp(e,t){let n=e.farms[t];return n.owner===`player`?[`helpers`]:n.owner===`gang`?[`protect`,`poach`,`inspect`,`soil`,`takeover`]:Ep(n,e.day)?n.fear>(Rt.takeover.fearMin??70)?[`advance`,`bind`,`helpers`,`protect`,`takeover`]:[`advance`,`bind`,`helpers`,`protect`,`refuse`]:[`protect`,`poach`,`soil`,`takeover`]}function Gp(e,t){let n=e.farms[t].contract;if(!n)return 0;let r=0;for(let i of Ft[t].fruits)r+=(n.crates[i]??0)*wp(e,t,i);return r}function Kp(e,t,n){let r=Rt[n];return n===`advance`?Math.round(Gp(e,t)*(r.deliveries??3)):r.cost}function qp(e,t,n){let r=Rt[n],i=It[Ft[t].trait];if(n===`bind`){let n=e.farms[t].contract;return n?pp(Op(e,t,{crates:n.crates,pricePct:n.pricePct,days:r.days??14,exclusive:n.exclusive})+zt.bindBonus,zt.actionMinChance,zt.actionMaxChance):0}let a=r.kind===`pressure`?i.pressure:r.kind===`dirty`?i.dirty:0;return pp(r.chance+a,zt.actionMinChance,zt.actionMaxChance)}function Jp(e,t,n){let r=e.farms[t],i=Rt[n],a=r.cooldowns[n]??0;if(a>e.day)return`wieder ab Tag ${a+1}`;if(e.money<Kp(e,t,n))return`zu wenig Geld`;switch(n){case`advance`:case`refuse`:return!Ep(r,e.day)||r.owner!==`free`?`nur mit Vertrag`:n===`refuse`&&r.refusedUntil>=e.day?`läuft schon`:null;case`bind`:return!Ep(r,e.day)||r.owner!==`free`?`nur mit Vertrag`:r.contract.priceLock?`schon gebunden`:null;case`helpers`:return r.owner===`gang`?`nicht bei der Gang`:Ep(r,e.day)?r.helpersUntil>=e.day?`helfen schon`:e.fighters<(i.fighters??2)?`${i.fighters} Kämpfer nötig`:null:`nur mit Vertrag`;case`protect`:return r.owner===`player`?`gehört dir`:r.guards>0?`schon geschützt`:e.fighters<(i.fighters??2)?`${i.fighters} Kämpfer nötig`:null;case`poach`:return r.poached?`schon abgeworben`:r.owner===`player`||r.contract?.exclusive?`liefert nur an dich`:null;case`soil`:return r.owner===`player`?`gehört dir`:r.licenseLost?`schon geschehen`:null;case`inspect`:return r.owner===`gang`?r.closedUntil>=e.day?`schon geschlossen`:null:`nur bei Gang-Höfen`;case`takeover`:return r.owner===`player`?`gehört dir`:r.fear<=(i.fearMin??70)?`Angst über ${i.fearMin} nötig`:null}}function Yp(e,t){t<=0||(e.heat=pp(e.heat+t,0,Vt.max),e.heatDay=e.day)}function Xp(e,t,n){let r=e.farms[t];r.fear=pp(r.fear+n*It[Ft[t].trait].fearGain,0,100)}function Zp(e){let t=Rt[e];switch(e){case`advance`:return`Loyalität +${t.loyalty}, wird mit Lieferungen verrechnet`;case`bind`:return`${t.days} Tage, Preis fest, Loyalität +${t.loyalty}`;case`helpers`:return`${t.fighters} Kämpfer für ${t.days} Tage, +${Math.round(t.capacity*100)} % Kisten`;case`protect`:return`${t.fighters} Kämpfer bleiben dort, Angst +${t.fear}, Preis ${Math.round(t.price*100)} %`;case`refuse`:return`${t.days} Tage keine Lieferung, Angst +${t.fear}`;case`poach`:return`Kapazität für andere ${Math.round(t.capacity*100)} %, Angst +${t.fear}`;case`soil`:return`verkauft nur noch an dich, Preis ${Math.round(t.price*100)} %`;case`inspect`:return`Gang-Hof ${t.days} Tage geschlossen`;case`takeover`:return`Hof gehört dir, Preis = Erzeugerkosten`}}function Qp(e,t,n,r,i){let a=e.farms[t],o=Rt[n];if(!a||!Rt[n]||!Wp(e,t).includes(n))return!1;let s=Jp(e,t,n);if(s)return r(e,`warning`,`${wf[n]}: ${s}.`),!1;let c=Kp(e,t,n);e.money-=c,e.spentToday+=c,a.cooldowns[n]=e.day+zt.cooldownDays,e.stats.actions++,o.kind!==`clean`&&(a.lastPressure=e.day),o.kind===`pressure`&&e.stats.pressureActions++,o.kind===`dirty`&&e.stats.dirtyActions++;let l=Hf(e)<qp(e,t,n),u=Sf[t];if(!l)return o.kind===`dirty`?(Yp(e,o.heat*zt.failHeatFactor),a.loyalty=pp(a.loyalty+zt.failLoyalty,0,100)):Yp(e,o.heat),n===`advance`&&(a.credit+=c),i(`bad`),r(e,`warning`,`${wf[n]} bei ${xf[t]} misslungen${c>0?`, ${c} € sind weg`:``}.`),!1;switch(Yp(e,o.heat),n){case`advance`:a.credit+=c,a.loyalty=pp(a.loyalty+(o.loyalty??0),0,100),yp(a,`advance`),r(e,`info`,`${u} nimmt den Vorschuss gern. Er wird mit den nächsten Lieferungen verrechnet.`);break;case`bind`:{let n=a.contract;n.endDay=Math.max(n.endDay,e.day+(o.days??14)),n.days=o.days??14,n.priceLock=!0,n.lockedPrices={};for(let r of Ft[t].fruits)n.lockedPrices[r]=wp(e,t,r);a.loyalty=pp(a.loyalty+(o.loyalty??0),0,100),yp(a,`bind`),r(e,`info`,`${xf[t]} ist bis Tag ${n.endDay+1} gebunden, der Preis steht fest.`);break}case`helpers`:e.fighters-=o.fighters??2,a.helpers=o.fighters??2,a.helpersUntil=e.day+(o.days??3),yp(a,`helpers`),r(e,`info`,`${o.fighters} deiner Leute helfen ${o.days} Tage bei der Ernte auf ${xf[t]}.`);break;case`protect`:e.fighters-=o.fighters??2,a.guards=o.fighters??2,Xp(e,t,o.fear??0),yp(a,`protect`),r(e,`info`,`Zwei deiner Leute stehen jetzt am Tor von ${xf[t]}. ${u} hat verstanden.`);break;case`refuse`:a.refusedUntil=e.day+(o.days??2),Xp(e,t,o.fear??0),yp(a,`refuse`),r(e,`info`,`Du lässt die Ware von ${xf[t]} ${o.days} Tage stehen. ${u} verliert Geld und wird nervös.`);break;case`poach`:a.poached=!0,Xp(e,t,o.fear??0),r(e,`info`,`Die Erntehelfer von ${xf[t]} arbeiten jetzt woanders.`);break;case`soil`:a.licenseLost=!0,yp(a,`soil`),a.owner===`gang`?(a.owner=`free`,r(e,`unlock`,`${xf[t]} hat die Zulassung verloren. Die Gang bekommt dort nichts mehr, nur du darfst noch kaufen.`)):r(e,`info`,`${xf[t]} hat die Zulassung verloren und verkauft nur noch an dich.`);break;case`inspect`:a.closedUntil=e.day+(o.days??5),r(e,`info`,`Das Lebensmittelamt schließt ${xf[t]} für ${o.days} Tage. Die Gang muss sehen, wo sie bleibt.`);break;case`takeover`:$p(e,t),r(e,`unlock`,`${xf[t]} gehört jetzt dir. ${u} liefert zu Erzeugerkosten.`)}return i(o.kind===`dirty`?`dirty`:`good`),!0}function $p(e,t){let n=e.farms[t],r=n.contract;n.owner=`player`,n.licenseLost=!1,e.fighters+=n.guards,n.guards=0,yp(n,`takeover`);let i={},a=Ft[t].fruits;if(r)for(let e of a)i[e]=r.crates[e]??0;else a.forEach((e,n)=>i[e]=Math.floor(Ft[t].capacity/a.length)+(n===0?Ft[t].capacity%a.length:0));n.contract=Ip(e,{crates:i,pricePct:100,days:14,exclusive:!0},!0),n.contract.startDay=e.day+1}function em(e,t){let n=e.farms[t];e.fighters+=n.guards,n.guards=0}var tm=[`hail`,`renegotiate`,`harvest`,`bio`];function nm(e,t,n){let r=e.farms[t];if(e.pending.some(e=>e.farm===t))return!1;let i=Tp(r.contract,e.day);switch(n){case`hail`:return i&&r.hailUntil<e.day;case`renegotiate`:return i&&r.owner===`free`&&!r.contract.priceLock&&!r.licenseLost;case`harvest`:return i&&r.bonusCrates===0;case`bio`:return r.owner!==`gang`&&r.quality<3&&i;case`contractEnd`:return!1}}function rm(e,t,n){let r=e.day;for(let i of[...e.pending])i.day<r&&am(e,i.id,null,t,n);if(e.farms.forEach((i,a)=>{let o=i.contract;o&&o.endDay<r&&(i.lastTerms={crates:{...o.crates},pricePct:o.pricePct,days:o.days,exclusive:o.exclusive},i.contract=null,i.credit>0&&(i.credit=0),t(e,`warning`,`Der Vertrag mit ${xf[a]} ist ausgelaufen.`)),i.helpers>0&&i.helpersUntil<r&&(e.fighters+=i.helpers,i.helpers=0),i.bonusCrates>0&&!Tp(i.contract,r)&&(i.bonusCrates=0),i.lastPressure<r-1&&i.guards===0&&(i.fear=pp(i.fear-zt.fearDecay,0,100)),i.owner===`free`&&(Tp(i.contract,r-1)?i.loyalty=pp(i.loyalty+Lt.loyaltyPerDay,0,100):i.loyalty<Ft[a].loyalty?i.loyalty=Math.min(Ft[a].loyalty,i.loyalty+zt.loyaltyDrift):i.loyalty>Ft[a].loyalty&&(i.loyalty=Math.max(Ft[a].loyalty,i.loyalty-zt.loyaltyDrift))),i.owner===`free`&&i.fear>zt.betrayFear&&i.loyalty<zt.betrayLoyalty&&Hf(e)<zt.betrayChance&&(Hf(e)<zt.defectShare?(i.owner=`gang`,i.contract=null,i.credit=0,em(e,a),t(e,`danger`,`${Sf[a]} ist zur Gemüsegang übergelaufen. ${xf[a]} liefert jetzt an ${Tf}.`)):(Yp(e,zt.testifyHeat),t(e,`danger`,`${Sf[a]} hat bei der Polizei ausgesagt. Ermittlungsdruck +${zt.testifyHeat}.`)),n(`alarm`)),i.owner===`free`&&i.contract&&i.contract.endDay===r&&e.pending.push({id:e.nextId++,kind:`contractEnd`,farm:a,day:r})}),e.heatDay<r-1&&(e.heat=Math.max(0,e.heat-Vt.decayPerDay)),Hf(e)<Bt.chancePerDay){let t=tm[Math.floor(Hf(e)*tm.length)],i=e.farms.map((e,t)=>t).filter(n=>nm(e,n,t));if(i.length){let a=i[Math.floor(Hf(e)*i.length)];t===`hail`&&(e.farms[a].hailUntil=r+Bt.hail.days-1),e.pending.push({id:e.nextId++,kind:t,farm:a,day:r}),n(t===`hail`?`bad`:`good`)}}}function im(e,t){let n=t.farm,r=xf[n],i=Sf[n],a=Bt;switch(t.kind){case`contractEnd`:{let t=e.farms[n].contract,a=t?Op(e,n,{crates:t.crates,pricePct:t.pricePct,days:t.days,exclusive:t.exclusive}):0,o=xp(e,n);return{title:`Vertrag läuft aus: ${r}`,text:`Heute kommt die letzte Lieferung. ${a>=Lt.renewMinChance?`${i} würde zu den gleichen Bedingungen weitermachen.`:`${i} will neu verhandeln.`}${o?` ${o}`:``}`,options:[a>=Lt.renewMinChance?`Verlängern`:`Verhandeln`,`Auslaufen`],portrait:`farmer`}}case`hail`:return{title:`Hagel auf ${r}`,text:`Drei Tage nur halbe Ernte. ${i} hofft auf dich.`,options:[`Aushelfen (${a.hail.helpCost} €)`,`Vertragsstrafe`],portrait:`farmer`};case`renegotiate`:return{title:`${i} will nachverhandeln`,text:`${Tf} bietet für die Ware von ${r} mehr als du.`,options:[`${a.renegotiate.pricePct} % mehr zahlen`,`Ablehnen`],portrait:`boss`};case`harvest`:return{title:`Gute Ernte auf ${r}`,text:`${Math.round(a.harvest.extra*100)} % mehr Kisten zum halben Preis mit der nächsten Lieferung, wenn das Lager Platz hat.`,options:[`Annehmen`,`Ablehnen`],portrait:`farmer`};case`bio`:return{title:`Bio-Siegel für ${r}`,text:`Ein Stern mehr Qualität, aber ${i} will ${a.bio.pricePct} % mehr.`,options:[`Zustimmen`,`Ablehnen`],portrait:`farmer`}}}function am(e,t,n,r,i){let a=e.pending.findIndex(e=>e.id===t);if(a<0)return;let o=e.pending[a];e.pending.splice(a,1);let s=e.farms[o.farm],c=o.farm,l=Bt;switch(o.kind){case`contractEnd`:n===0&&Lp(e,c,r,i);break;case`hail`:if(n===0){if(e.money<l.hail.helpCost){r(e,`warning`,`Für die Hilfe fehlen ${Math.ceil(l.hail.helpCost-e.money)} €.`);break}e.money-=l.hail.helpCost,e.spentToday+=l.hail.helpCost,s.loyalty=pp(s.loyalty+l.hail.helpLoyalty,0,100),yp(s,`hailHelp`),i(`good`)}else n===1&&(Xp(e,c,l.hail.penaltyFear),s.lastPressure=e.day,e.money+=l.hail.penaltyMoney,yp(s,`hailPenalty`),i(`bad`));break;case`renegotiate`:n===0&&s.contract?(s.contract.pricePct=Math.min(Lt.pricePctMax,s.contract.pricePct+l.renegotiate.pricePct),s.loyalty=pp(s.loyalty+l.renegotiate.acceptLoyalty,0,100),i(`good`)):(s.loyalty=pp(s.loyalty+l.renegotiate.refuseLoyalty,0,100),n===1&&i(`bad`));break;case`harvest`:if(n===0&&s.contract){let e=0;for(let t of Ft[c].fruits)e+=s.contract.crates[t]??0;s.bonusCrates=Math.max(1,Math.round(e*l.harvest.extra)),i(`good`)}break;case`bio`:n===0?(s.quality=Math.min(3,s.quality+l.bio.quality),s.priceBonus+=l.bio.pricePct/100,i(`good`)):n===1&&(s.loyalty=pp(s.loyalty+l.bio.refuseLoyalty,0,100))}}function om(e,t){let n=e.farms[t];if(n.owner===`gang`)return n.closedUntil>=e.day?`geschlossen bis Tag ${n.closedUntil+1}`:`liefert an ${Tf}`;if(n.owner===`player`)return`gehört dir`;let r=n.contract;return r&&r.endDay>=e.day?r.startDay>e.day?`Vertrag ab morgen`:`Vertrag bis Tag ${r.endDay+1}`:`frei`}function sm(e){return Bp(e,e.day)}function cm(e,t,n){let r=0;for(let i=0;i<e.farms.length;i++)for(let a of zp(e,i,e.day+n))a.fruit===t&&r++;if(n===1)for(let n of e.backlog)n.fruit===t&&r++;return r}function lm(e,t){let n=[...e.backlog,...t];e.backlog=[],n.length&&(e.delivery={phase:`arrive`,t:0,queue:n,total:n.length,unloaded:0,daily:Math.max(1,t.length)})}function um(e,t,n){let r=e.delivery;if(r){if(r.t++,r.phase===`arrive`)r.t>=At(Pt.arriveSeconds)&&(r.phase=`unload`,r.t=0,t.arrived=!0);else if(r.phase===`unload`){if(r.t%Math.max(1,At(Pt.unloadSecondsPerCrate))!==0)return;let i=r.queue[0];if(!i){r.phase=`leave`,r.t=0,Zf(e);return}let a=Hp(e,i),o=i.price-a;if(e.money<o){let t=r.queue.length;r.queue=[],n(e,`warning`,`Kein Geld für die Lieferung: ${t} ${t===1?`Kiste geht`:`Kisten gehen`} zurück.`);return}if(!$f(e,i.fruit,i.quality)){let t=r.queue.splice(0,r.queue.length).slice(-r.daily);for(let n of t)e.backlog.push(n);Up(e,new Set(t.map(e=>e.source).filter(e=>e>=0))),n(e,`warning`,`Lager voll: ${Tt.map(e=>[e,t.filter(t=>t.fruit===e).length]).filter(([,e])=>e>0).map(([e,t])=>`${t} ${vf[e]}`).join(`, `)} bleiben auf dem Hof und kommen morgen.`);return}r.queue.shift(),a>0&&(e.farms[i.source].credit=Math.round((e.farms[i.source].credit-a)*100)/100),e.money-=o,e.spentToday+=o,e.stats.cratesBought++,r.unloaded++,t.unloaded++}else r.t>=At(Pt.leaveSeconds)&&(e.delivery=null)}}function dm(e){return Et.dayStartHour+e.dayTick/Dt}function fm(e){let t=dm(e),n=Math.floor(t),r=Math.floor((t-n)*60);return`${String(n).padStart(2,`0`)}:${String(r).padStart(2,`0`)}`}function pm(e,t){let n=Gt[e];for(let[e,r]of n.rush)if(t>=e&&t<r)return n.customers*Kt;return n.customers}function mm(e){return e*e*(3-2*e)}function hm(e,t){let n=Math.floor(t),r=t-n,i=qt/2;if(r<i){let t=.5+r/qt,i=pm(e,n-1);return i+(pm(e,n)-i)*mm(t)}if(r>1-i){let t=(r-(1-i))/qt,a=pm(e,n);return a+(pm(e,n+1)-a)*mm(t)}return pm(e,n)}function gm(e){return Gt[e].customers*Kt}var _m=3;function vm(e){return Math.max(0,Math.min(1,(dm(e)-Et.dayStartHour)/Ot))}function ym(e,t){let n=cp(e,t);if(e.delivery)for(let r of e.delivery.queue)r.fruit===t&&(n+=20);let r=dp(e,t),i=0;for(let n=1;n<=_m;n++)i+=cm(e,t,n);if(r<=0)return{fruit:t,units:n,perDay:r,days:n>0||i>0?1/0:0,incoming:i};let a=n,o=(1-vm(e))*r;if(a<o)return{fruit:t,units:n,perDay:r,days:a/r,incoming:i};a-=o;let s=o/r;for(let o=1;o<=_m;o++){if(a+=cm(e,t,o)*20,a<r)return{fruit:t,units:n,perDay:r,days:s+a/r,incoming:i};a-=r,s+=1}return{fruit:t,units:n,perDay:r,days:s+a/r,incoming:i}}function bm(e){return e>=Nt.ampelGreen?`green`:e>=Nt.ampelYellow?`yellow`:`red`}function xm(e){let t=null;for(let n of Tt){let r=ym(e,n);r.units<=0&&r.incoming<=0||(!t||r.days<t.days)&&(t=r)}return t?{ampel:bm(t.days),range:t}:{ampel:`red`,range:null}}function Sm(e,t){if(!Number.isFinite(t.days)||t.perDay<=0)return null;let n=dm(e)+t.days*Ot;return n<Et.dayEndHour?n:null}var Cm=class{mapW;mapH;camera;target=new U;zoomIndex=rn.defaultZoomIndex;zoom=rn.zoomLevels[rn.defaultZoomIndex];rotIndex=0;yaw=bi.degToRad(rn.baseYawDegrees);pitch=bi.degToRad(rn.tiltDegrees);aspect=1;viewH=1;follow=null;tmp=new U;constructor(e,t){this.mapW=e,this.mapH=t,this.camera=new Pc(-1,1,1,-1,-200,400)}setViewport(e,t){this.aspect=e/Math.max(1,t),this.viewH=t,this.applyProjection()}applyProjection(){let e=this.zoom/2;this.camera.top=e,this.camera.bottom=-e,this.camera.left=-e*this.aspect,this.camera.right=e*this.aspect,this.camera.updateProjectionMatrix()}get visibleHeight(){return this.zoom}get visibleWidth(){return this.zoom*this.aspect}zoomStep(e){this.zoomIndex=bi.clamp(this.zoomIndex+e,0,rn.zoomLevels.length-1)}rotate(e){this.rotIndex=(this.rotIndex+e+4)%4}get rotation(){return this.rotIndex}axes(){return{rx:Math.cos(this.yaw),rz:-Math.sin(this.yaw),fx:-Math.sin(this.yaw),fz:-Math.cos(this.yaw)}}panPixels(e,t){let n=this.zoom/Math.max(1,this.viewH),{rx:r,rz:i,fx:a,fz:o}=this.axes(),s=t*n/Math.sin(this.pitch);this.target.x+=-r*e*n+a*s,this.target.z+=-i*e*n+o*s,this.follow=null,this.clamp()}panUnits(e,t){let{rx:n,rz:r,fx:i,fz:a}=this.axes();this.target.x+=n*e+i*t,this.target.z+=r*e+a*t,(e||t)&&(this.follow=null),this.clamp()}lookAt(e,t){this.target.set(e,0,t),this.clamp()}clamp(){this.target.x=bi.clamp(this.target.x,0,this.mapW),this.target.z=bi.clamp(this.target.z,0,this.mapH)}update(e){let t=1-Math.exp(-e*12),n=rn.zoomLevels[this.zoomIndex];Math.abs(this.zoom-n)>.001&&(this.zoom+=(n-this.zoom)*t,Math.abs(this.zoom-n)<.01&&(this.zoom=n),this.applyProjection());let r=bi.degToRad(rn.baseYawDegrees+this.rotIndex*90)-this.yaw;for(;r>Math.PI;)r-=Math.PI*2;for(;r<-Math.PI;)r+=Math.PI*2;if(this.yaw+=r*t,this.follow){let t=this.follow();if(t){let n=1-Math.exp(-e*6);this.target.x+=(t.x-this.target.x)*n,this.target.z+=(t.y-this.target.z)*n,this.clamp()}else this.follow=null}this.tmp.set(Math.sin(this.yaw)*Math.cos(this.pitch),Math.sin(this.pitch),Math.cos(this.yaw)*Math.cos(this.pitch)),this.camera.position.copy(this.target).addScaledVector(this.tmp,120),this.camera.lookAt(this.target)}},wm=`||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||(||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||(||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||(.##.BBB||||||||||||||||||||||PPPPP.##.DDDDDDDDDdddddddddDDDDDDDDDd.##.DDDDDDDdddddddDDDDDDDd.##.(.##.BBBSSSSSSSSSSSSSSSSSSSSSSPPPPP.##.DDDDDDDDDdddddddddDDDDDDDDDd.##.DDDDDDDdddddddDDDDDDDd.##.(.##.BBBSSSSSSSSSSSSSSSSSSSSSSPPPPP.##.DDDDDDDDDdddddddddDDDDDDDDDd.##.DDDDDDDdddddddDDDDDDDd.##.(.##.BBBSSSSSSSSSSSSSSSSSSSSSSPPPPP.##.DDDDDDDDDdddddddddDDDDDDDDDd.##.DDDDDDDdddddddDDDDDDDd.##.(.##.bbbSSSSSSSSSSSSSSSSSSSSSSppppp.##.DDDDDDDDDdddddddddDDDDDDDDDd.##.DDDDDDDdddddddDDDDDDDd.##.(.##.bbbSSSSSSSSSSSSSSSSSSSSSSppppp.##.DDDDDDDDDdddddddddDDDDDDDDDd.##.DDDDDDDdddddddDDDDDDDd.##.(.##.bbbSSSSSSSSSSSSSSSSSSSSSSppppp.##::T:::T:::T:::T:::T:::T:::T::.##.:T:::T:::T:::T:::T:::T:##.(.##.T::::::::::::::::::::::::::::T.##:::::::::::::::::::::::::::::.##.:::::::::::::::::::::::##.(.##.::::::::::::::::::::::::::::::.##:::::::::::::::::::::::::::::.==.:::::::::::::::::::::::##.(.##.::::::::::::::::::::::::::::::.##=#######=############=#######=##=########=#########=###=##.(.##.::::::::::::::::::::::::::::::.##=#######=############=#######=##=########=#########=###=##.(.##.::::::::T:::::::::::::T:::::::.##:::::::::::::::::::::::::::::.==.:::::::::::::::::::::::##.(.##.::::::::::::::::::::::::::::::.==:::::::::::::::::::::::::::::.##.:::::::::::::::::::::::##.(.##.::::::::::::::::::::::::::::::.##::T:::T:::T:::T:::T:::T:::T::.##.:T:::T:::T:::T:::T:::T:##.(.##.::::::::::::::::::::::::::::::.##.DDDDDDDdddddddDDDDDDDddddddd.##.DDDDDDDdddddddDDDDDDDd.##.(.##.T::::Q::::::::::Q:::::::::Q::T.##.DDDDDDDdddddddDDDDDDDddddddd.##.DDDDDDDdddddddDDDDDDDd.##.(.==................................##.DDDDDDDdddddddDDDDDDDddddddd.##.DDDDDDDdddddddDDDDDDDd.##.(=##=######=#############=#########=##.DDDDDDDdddddddDDDDDDDddddddd.==.DDDDDDDdddddddDDDDDDDd.##.(=##=######=#############=#########=##.DDDDDDDdddddddDDDDDDDddddddd.##.DDDDDDDdddddddDDDDDDDd.##.(.==................................##.DDDDDDDdddddddDDDDDDDddddddd.##.DDDDDDDdddddddDDDDDDDd.##.(.##.PPPPPpppppPPPPPpppppPPPPPppppp.##.DDDDDDDdddddddDDDDDDDddddddd.##.DDDDDDDdddddddDDDDDDDd.##.(.##.PPPPPpppppPPPPPpppppPPPPPppppp.##.DDDDDDDdddddddDDDDDDDddddddd.##.DDDDDDDdddddddDDDDDDDd.##.(.##.PPPPPpppppPPPPPpppppPPPPPppppp.##.DDDDDDDdddddddDDDDDDDddddddd.##.DDDDDDDdddddddDDDDDDDd.##.(.==................................==..............................==........................==.(=##=###########=############=#####=##=############=###############=##=##########=###########=##=(=##=###########=############=#####=##=############=###############=##=##########=###########=##=(.==................................==..............................==........................==.(.##.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.##.BBBBBBB::::::::::::PPPPPPPPP.##.::::::::::T:::::::::::.##.(.##.,WWWWWWWWWWWWWWWWWWWWWWWWGGGGG.##.BBBBBBB::KKKKKKKK::PPPPPPPPP.##.:XXXXXXX::::xxxxxxxx::.##.(.##.,WWWWWWWWWWWWWWWWWWWWWWWWGGGGG.##.BBBBBBB::KKKKKKKK::PPPPPPPPP.##.:XXXXXXX::::xxxxxxxx::.##.(.##.,WWWWWWWWWWWWWWWWWWWWWWWWGGGGG.##.BBBBBBB::KKKKKKKK::PPPPPPPPP.##.:XXXXXXX::::xxxxxxxx::.##.(.##.,WWWWWWWWWWWWWWWWWWWWWWWWggggg.##.bbbbbbb::KKKKKKKK::ppppppppp.##.:XXXXXXX:T::xxxxxxxx::.##.(.##.,WWWWWWWWWWWWWWWWWWWWWWWWggggg.##.bbbbbbb::KKKKKKKK::ppppppppp.##.:XXXXXXX::::xxxxxxxx::.##.(.##.,WWWWWWWWWWWWWWWWWWWWWWWWggggg.##.bbbbbbb::KKKKKKKK::ppppppppp.##.:XXXXXXX::::xxxxxxxx::.##.(.##.,WWWWWWWWWWWWWWWWWWWWWWWW,T,,,.##.bbbbbbb::KKKKKKKK::ppppppppp.##.:XXXXXXX::::xxxxxxxx::.##.(.##.,WWWWWWWWWWWWWWWWWWWWWWWWBBBBB.==.BBBBBBB::::::::::::PPPPPPPPP.==.::::::::::::xxxxxxxx::.##.(.##.,WWWWWWWWWWWWWWWWWWWWWWWWBBBBB.##.LLLLLLL::::::::::::::LLLLLLL.##.::::::::::::::::::::::.##.(.##.,WWWWWWWWWWWWWWWWWWWWWWWWBBBBB.##.LLLLLLLT::::::::::::TLLLLLLL.##.:DDDDDD::T::::::::::::.##.(.##.,WWWWWWWWWWWWWWWWWWWWWWWWBBBBB.##.LLLLLLL::::::::::::::LLLLLLL.##.:DDDDDD:::::::::::::::.##.(.##.,WWWWWWWWWWWWWWWWWWWWWWWWBBBBB.##.lllllll::::::::::::::lllllll.##.:DDDDDD:::::::::::::T:.##.(.##.,WWWWWWWWWWWWWWWWWWWWWWWWBBBBB.##.lllllll::::::::::::::lllllll.##.:DDDDDD:::::::::::::::.##.(.==................................##.lllllll:::::FFFF:::::lllllll.##........................##.(=##=########=#############=#######=##.LLLLLLL:::::FFFF:::::LLLLLLL.##=########=#######=#####=##.(=##=########=#############=#######=##.::::::::::::FFFF::::::::::::.##=########=#######=#####=##.(.==................................==.::::::::::::FFFF::::::::::::.==........................##.(.##.BBBBBBBBT::::::::HHHHHHHhhhhhh.##.LLLLLLL::::::::::::::LLLLLLL.##.::::::::::::::::::::::.##.(.##.BBBBBBBB:::::::::HHHHHHHhhhhhh.##.LLLLLLL::::::::::::::LLLLLLL.##.:T:::T:::T:::T:::T:::T.##.(.##.BBBBBBBB:::EEE:::HHHHHHHhhhhhh.##.LLLLLLL::::::::::::::LLLLLLL.##.::::::::::::::::::::::.##.(.##.BBBBBBBB:::EEE:::HHHHHHHhhhhhh.##.lllllll::::::::::::::lllllll.##.::::::::::::::::::::::.##.(.##.bbbbbbbb:::::::::HHHHHHHhhhhhh.##.lllllll::::::::::::::lllllll.##.::::::::::::::::::::::.##.(.##.bbbbbbbb::::::::THHHHHHHhhhhhh.##.lllllll::::::::::::::lllllll.##.::::::::::::::::::::::.##.(.##.bbbbbbbb,,,,,,,,,HHHHHHHhhhhhh.##.LLLLLLL::::::::::::::LLLLLLL.##.:::::::::::::YYYYYYYY:.##.(.##.bbbbbbbbBBBBBbbbbbBBBBBbbbbbBB.##.PPPPPPPT::::::::::::TPPPPPPP.##.::XXXXXXX::::YYYYYYYY:.##.(.##.BBBBBBBBBBBBBbbbbbBBBBBbbbbbBB.##.PPPPPPP::::::::::::::PPPPPPP.##.::XXXXXXX::::YYYYYYYY:.##.(.##.BBBBBBBBBBBBBbbbbbBBBBBbbbbbBB.==.PPPPPPPLLLLllllLLLLllPPPPPPP.==.::XXXXXXX::::YYYYYYYY:.##.(.##.BBBBBBBBBBBBBbbbbbBBBBBbbbbbBB.##.PPPPPPPLLLLllllLLLLllPPPPPPP.##.::XXXXXXX::::YYYYYYYY:.##.(.##.BBBBBBBBBBBBBbbbbbBBBBBbbbbbBB.##.pppppppLLLLllllLLLLllppppppp.##.::XXXXXXX::::YYYYYYYY:.##.(.##.bbbbbbbbBBBBBbbbbbBBBBBbbbbbBB.##.pppppppLLLLllllLLLLllppppppp.##.::XXXXXXX::::YYYYYYYY:.##.(.##.bbbbbbbbBBBBBbbbbbBBBBBbbbbbBB.##.pppppppLLLLllllLLLLllppppppp.##.::XXXXXXX::::YYYYYYYY:.##.(.##.bbbbbbbbBBBBBbbbbbBBBBBbbbbbBB.##.pppppppLLLLllllLLLLllppppppp.##.::::::::::::::::::::::.##.(.==................................==..............................==........................==.(=##=########=#####################=##=####=###############=#######=##=##########=###########=##=(=##=########=#####################=##=####=###############=#######=##=##########=###########=##=(.==................................==.............==...............==........................==.(.##.BBBBbbbbBBBBbbbb,,,,,,,,,,,,::,,,,,,,,,,,,LLL.##.UUUUUUUuuuuuu.##.::::::::::::::::::::::.##.(.##.BBBBbbbbBBBBbbbb,,T,,,,,,,,,::,,,T,,,,,,,,LLL.##.UUUUUUUuuuuuu.##.:xxxxxxx::T::XXXXXXXX:.##.(.##.BBBBbbbbBBBBbbbb,,,,,,,VVV,,::,,,,,,,,,,,,LLL.##.UUUUUUUuuuuuu.##.:xxxxxxx:::::XXXXXXXX:.##.(.##.BBBBbbbbBBBBbbbb,,,,,,,VVV,,::,,,,,,,,T,,,LLL.##.UUUUUUUuuuuuu.##.:xxxxxxx:::::XXXXXXXX:.##.(.##.BBBBbbbbBBBBbbbb,,,,,,,,,,,,::,,,,,,,,,,,,lll.##.UUUUUUUuuuuuu.##.:xxxxxxx:::::XXXXXXXX:.##.(.##.BBBBbbbbBBBBbbbb::::::::::::::::::::::::::lll.==.UUUUUUUuuuuuu.==.:xxxxxxx:T:::XXXXXXXX:.##.(.##.BBBBbbbbBBBBbbbb::::::::::::::::::::::::::lll.##.UUUUUUUuuuuuu.##.:xxxxxxx:::::XXXXXXXX:.##.(.##.BBBBbbbbBBBBbbbb,,,,,T,,,,,,::,,,,,,T,,,,,lll.##.UUUUUUUuuuuuu.##.:xxxxxxx:::::XXXXXXXX:.##.(.##.BBBBbbbbBBBBbbbb,,,,,,,,,,,,::,,,,,,,,,T,,LLL.##.UUUUUUUuuuuuu.##.:xxxxxxx:::::XXXXXXXX:.##.(.##.BBBBbbbbBBBBbbbb,,,T,,,,,,,,::,,,,T,,,,,,,LLL.##.UUUUUUUuuuuuu.##.:xxxxxxx:::::XXXXXXXX:.##.(.##.BBBBbbbbBBBBbbbb,,,,,,,,,T,,::,,,,,,,,,,,,LLL.##.UUUUUUUuuuuuu.##.::::::::::T::XXXXXXXX:.##.(.##.BBBBbbbbBBBBbbbb,,,,,,,,,,,,::,,,,,,,,,,,,LLL.##.:::::::::::::.##.::::::::::::::::::::::.##.(.==................................==.............==...............==........................==.(=##=######################=#######=##=###########=##=#######=#####=##=##########=###########=##=(=##=######################=#######=##=###########=##=#######=#####=##=##########=###########=##=(.==................................==.............==...............==........................==.(.##.PPPPPPppppppPPPP::::::ppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.##.DDDDDDDdddddddDDDDDDDd.##.(.##.PPPPPPppppppPPPP::::::ppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.##.DDDDDDDdddddddDDDDDDDd.##.(.##.PPPPPPppppppPPPP::::::ppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.##.DDDDDDDdddddddDDDDDDDd.##.(.##.PPPPPPppppppPPPPPPppppppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.==.DDDDDDDdddddddDDDDDDDd.##.(.##.PPPPPPppppppPPPPPPppppppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.##.DDDDDDDdddddddDDDDDDDd.##.(.##.PPPPPPppppppPPPPPPppppppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.##.DDDDDDDdddddddDDDDDDDd.##.(.##.PPPPPPppppppPPPPPPppppppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.##.DDDDDDDdddddddDDDDDDDd.##.(.##.PPPPPPppppppPPPPPPppppppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.##.DDDDDDDdddddddDDDDDDDd.##.(.##.PPPPPPppppppPPPPPPppppppPPPPPPppppppPPPPPPppp.##.BBBBBBBbbbbbb.##.DDDDDDDdddddddDDDDDDDd.##.(.==................................==.............==...............==........................==.(=##############################################################################################=(=##############################################################################################=(.==................................==..............................==........................==.`.split(`(`),Tm=[{id:`underground`,rects:[[0,27,34,64]]},{id:`station`,rects:[[0,0,34,26]]},{id:`oldtown`,rects:[[35,27,66,64]]},{id:`shopping`,rects:[[35,0,95,26]]},{id:`banking`,rects:[[67,27,95,95]]},{id:`scene`,rects:[[0,65,66,95]]}],Em=[[`underground`,`station`],[`underground`,`oldtown`],[`underground`,`scene`],[`station`,`oldtown`],[`station`,`shopping`],[`oldtown`,`shopping`],[`oldtown`,`banking`],[`oldtown`,`scene`],[`shopping`,`banking`],[`scene`,`banking`]],Dm={underground:[17,54],station:[18,14],oldtown:[51,42],shopping:[60,14],banking:[80,50],scene:[33,72]},Om=[{id:`u-1`,name:`Lagerstraße`,x:24,y:44,district:`underground`},{id:`u-2`,name:`U-Bahn-Platz`,x:16,y:52,district:`underground`},{id:`u-3`,name:`Garagenhof`,x:34,y:40,district:`underground`},{id:`b-1`,name:`Bahnhofsvorplatz West`,x:9,y:12,district:`station`},{id:`b-2`,name:`Busbahnhof`,x:18,y:16,district:`station`},{id:`b-3`,name:`Haupteingang`,x:26,y:12,district:`station`},{id:`b-4`,name:`Bahnhofsvorplatz Ost`,x:31,y:16,district:`station`},{id:`a-1`,name:`Marktplatz Nord`,x:48,y:41,district:`oldtown`},{id:`a-2`,name:`Am Brunnen`,x:55,y:50,district:`oldtown`},{id:`a-3`,name:`Ladenpassage West`,x:41,y:47,district:`oldtown`},{id:`a-4`,name:`Ladenpassage Ost`,x:61,y:47,district:`oldtown`},{id:`a-5`,name:`Kirchplatz`,x:50,y:38,district:`oldtown`},{id:`e-1`,name:`Boulevard West`,x:42,y:10,district:`shopping`},{id:`e-2`,name:`Kaufhausecke`,x:52,y:15,district:`shopping`},{id:`e-3`,name:`Boulevard Mitte`,x:62,y:10,district:`shopping`},{id:`e-4`,name:`Galerie`,x:74,y:15,district:`shopping`},{id:`e-5`,name:`Boulevard Ost`,x:86,y:10,district:`shopping`},{id:`k-1`,name:`Turmplatz`,x:80,y:36,district:`banking`},{id:`k-2`,name:`Bankenplatz`,x:80,y:51,district:`banking`},{id:`k-3`,name:`Börsenecke`,x:88,y:51,district:`banking`},{id:`k-4`,name:`Konzernhof`,x:81,y:72,district:`banking`},{id:`k-5`,name:`Bankenallee`,x:74,y:44,district:`banking`},{id:`s-1`,name:`Parkweg`,x:32,y:70,district:`scene`},{id:`s-2`,name:`Parkpromenade`,x:40,y:72,district:`scene`},{id:`s-3`,name:`Campus`,x:58,y:78,district:`scene`},{id:`s-4`,name:`Kulturplatz`,x:22,y:84,district:`scene`}],km={lot:{x:5,y:31,w:24,h:13},hall:{x:5,y:31,w:16,h:13},yard:{x:22,y:31,w:7,h:13},office:{x:5,y:40,w:4,h:4},door:[12,44],doorWidth:2,yardGate:[25,44],shelfSlots:[[9,38],[13,38],[17,38],[5,38],[9,35],[13,35],[17,35],[5,35],[9,32],[13,32],[17,32],[5,32]]},Am=[[[2,28],[36,28],[36,65],[2,65]],[[36,28],[68,28],[68,65],[36,65]],[[68,28],[94,28],[94,65],[68,65]],[[2,65],[36,65],[36,94],[2,94]],[[36,65],[68,65],[68,94],[36,94]],[[68,65],[94,65],[94,94],[68,94]],[[36,13],[68,13],[68,28],[36,28]],[[68,13],[94,13],[94,28],[68,28]],[[2,21],[36,21],[36,28],[2,28]],[[68,65],[68,28],[36,28],[36,65]],[[2,94],[94,94],[94,65],[2,65]],[[36,13],[36,94],[68,94],[68,13]]],jm=[{points:[[2,28],[68,28],[68,65],[2,65]],stops:[[18,28],[50,28],[68,46],[24,65]]},{points:[[36,13],[94,13],[94,94],[36,94]],stops:[[52,13],[80,13],[94,50],[60,94]]}],Mm={width:300,height:200,city:{x:150,y:100,w:70,h:52},farms:[[52,46],[44,150],[250,44],[258,152],[150,22],[150,182]]},Y={ROAD:0,SIDEWALK:1,CROSSWALK:2,PLAZA:3,GREEN:4,BUILDING:5,WAREHOUSE:6},Nm={R:{style:`rowhouse`,height:1.7,vary:.5},r:{style:`rowhouse`,height:1.7,vary:.5},B:{style:`brick`,height:3.5,vary:2.5},b:{style:`brick`,height:3.5,vary:2.5},P:{style:`plaster`,height:4,vary:3},p:{style:`plaster`,height:4,vary:3},L:{style:`shop`,height:3,vary:1.5},l:{style:`shop`,height:3,vary:1.5},D:{style:`store`,height:5.5,vary:2.5},d:{style:`store`,height:5.5,vary:2.5},X:{style:`tower`,height:13,vary:6},x:{style:`tower`,height:11,vary:5},Y:{style:`tower`,height:22,vary:0},S:{style:`station`,height:3.4,vary:0},K:{style:`church`,height:4.5,vary:0},H:{style:`hall`,height:2.8,vary:.8},h:{style:`hall`,height:2.8,vary:.8},G:{style:`garage`,height:1.3,vary:.3},g:{style:`garage`,height:1.3,vary:.3},U:{style:`uni`,height:4,vary:1.5},u:{style:`uni`,height:4,vary:1.5},M:{style:`mensa`,height:1.8,vary:0},A:{style:`office`,height:3,vary:0},E:{style:`subway`,height:.6,vary:0},F:{style:`fountain`,height:.35,vary:0},Z:{style:`fence`,height:.6,vary:0},T:{style:`tree`,height:0,vary:0},"|":{style:`rail`,height:.05,vary:0},Q:{style:`shelter`,height:.9,vary:0},V:{style:`pavilion`,height:1.2,vary:0}},Pm={"#":Y.ROAD,".":Y.SIDEWALK,"=":Y.CROSSWALK,":":Y.PLAZA,",":Y.GREEN,W:Y.WAREHOUSE};function Fm(e,t){let n=Math.imul(e^2654435769,2246822507)^Math.imul(t+2135587861,3266489909);return n^=n>>>15,n=Math.imul(n,739982445),n^=n>>>12,(n>>>0)/4294967296}function Im(e,t=[]){let n=[0],r=0;for(let t=1;t<=e.length;t++){let i=e[t-1],a=e[t%e.length];r+=Math.abs(a[0]-i[0])+Math.abs(a[1]-i[1]),n.push(r)}let i=[];for(let[r,a]of t){let t=0,o=1/0;for(let i=0;i<e.length;i++){let s=e[i],c=e[(i+1)%e.length],l=Math.abs(c[0]-s[0])+Math.abs(c[1]-s[1]);for(let e=0;e<=l;e+=.5){let u=l===0?0:e/l,d=s[0]+(c[0]-s[0])*u,f=s[1]+(c[1]-s[1])*u,p=(d-r)**2+(f-a)**2;p<o&&(o=p,t=n[i]+e)}}i.push(t)}return{points:e,cum:n,length:r,stops:i}}function Lm(){let e=wm,t=e.length,n=e[0].length,r=n*t,i=new Uint8Array(r),a=new Int32Array(r).fill(-1),o=Array(r);for(let r=0;r<t;r++){let t=e[r];if(t.length!==n)throw Error(`Kartenzeile ${r} hat ${t.length} statt ${n} Zeichen`);for(let e=0;e<n;e++){let a=t[e];if(o[r*n+e]=a,a in Pm)i[r*n+e]=Pm[a];else if(a in Nm)i[r*n+e]=Nm[a].style===`tree`?Y.GREEN:Y.BUILDING;else throw Error(`Unbekanntes Kartenzeichen "${a}" bei ${e},${r}`)}}let s=[],c=[],l=[];for(let e=0;e<r;e++){let r=o[e];if(!(r in Nm)||a[e]!==-1)continue;let i=Nm[r];if(i.style===`tree`){c.push(e);continue}let u=s.length,d={id:u,char:r,style:i.style,x0:n,y0:t,x1:-1,y1:-1,tiles:[],height:0,variant:0};for(l.length=0,l.push(e),a[e]=u;l.length;){let e=l.pop();d.tiles.push(e);let i=e%n,s=e/n|0;d.x0=Math.min(d.x0,i),d.y0=Math.min(d.y0,s),d.x1=Math.max(d.x1,i),d.y1=Math.max(d.y1,s);let c=[i>0?e-1:-1,i<n-1?e+1:-1,s>0?e-n:-1,s<t-1?e+n:-1];for(let e of c)e>=0&&a[e]===-1&&o[e]===r&&(a[e]=u,l.push(e))}d.variant=Fm(d.x0*31+d.y0,d.tiles.length),d.height=i.height+i.vary*Fm(d.y0*17+3,d.x0+11),i.vary>0&&(d.height=Math.round(d.height*2)/2),s.push(d)}let u=new Uint8Array(r).fill(0);for(let e of Tm){let t=z.indexOf(e.id);for(let[r,i,a,o]of e.rects)for(let e=i;e<=o;e++)for(let i=r;i<=a;i++)u[e*n+i]=t}let d=new Float32Array(r),f=new Float32Array(r),p=new Float32Array(r);for(let e=0;e<r;e++){let t=i[e];d[e]=t===Y.SIDEWALK||t===Y.CROSSWALK||t===Y.PLAZA?1:t===Y.GREEN?1.6:0,p[e]=+(t===Y.ROAD||t===Y.CROSSWALK),f[e]=t===Y.ROAD||t===Y.CROSSWALK?1:t===Y.SIDEWALK||t===Y.PLAZA?1.15:0}let m=km,h=m.door[1]*n+m.door[0];d[h]=1,f[h]=1;let g=Om.map((e,t)=>{let r=e.y*n+e.x;if(!d[r])throw Error(`Verkaufsplatz ${e.id} liegt nicht auf einem begehbaren Feld`);return{index:t,id:e.id,name:e.name,x:e.x,y:e.y,tile:r,district:e.district,districtIndex:z.indexOf(e.district)}}),_=z.map(()=>[]);for(let e=0;e<r;e++){let t=i[e];(t===Y.SIDEWALK||t===Y.PLAZA)&&_[u[e]].push(e)}let v=[];for(let e=1;e<t-1;e++)for(let t=1;t<n-1;t++){let r=e*n+t;i[r]===Y.SIDEWALK&&(t+e*3)%7==0&&(i[r-1]===Y.ROAD||i[r+1]===Y.ROAD||i[r-n]===Y.ROAD||i[r+n]===Y.ROAD)&&v.push({x:t,y:e})}let y=z.map(()=>z.map(()=>!1));for(let[e,t]of Em){let n=z.indexOf(e),r=z.indexOf(t);y[n][r]=y[r][n]=!0}let b=z.map(()=>[]);for(let e=0;e<r;e++)b[u[e]].push(e);return{w:n,h:t,rows:e,tiles:i,buildingOf:a,buildings:s,district:u,spots:g,warehouse:{x:m.lot.x,y:m.lot.y,w:m.lot.w,h:m.lot.h,hall:m.hall,yard:m.yard,office:m.office,doorX:m.door[0],doorY:m.door[1],door:h,doorWidth:m.doorWidth,shelfSlots:m.shelfSlots},links:y,labels:z.map(e=>Dm[e]),districtTiles:b,costs:{foot:d,mixed:f,road:p},footTilesByDistrict:_,carRoutes:Am.map(e=>Im(e)),busRoutes:jm.map(e=>Im(e.points,e.stops)),trees:c,lamps:v}}var Rm=null;function zm(){return Rm||=Lm(),Rm}function Bm(e,t,n){let r=e.length,i=t%r;i<0&&(i+=r);let a=e.points,o=0;for(;o<a.length-1&&e.cum[o+1]<=i;)o++;let s=a[o],c=a[(o+1)%a.length],l=e.cum[o+1]-e.cum[o],u=l>0?(i-e.cum[o])/l:0;n.x=s[0]+(c[0]-s[0])*u,n.y=s[1]+(c[1]-s[1])*u,n.dx=Math.sign(c[0]-s[0]),n.dy=Math.sign(c[1]-s[1])}var X={PX:1,NX:2,PY:4,NY:8,PZ:16,NZ:32,ALL:63,SIDES:51},Vm=new G,Hm=class{pos=[];nor=[];col=[];r=1;g=1;b=1;get vertexCount(){return this.pos.length/3}color(e){return Vm.setHex(e),this.r=Vm.r,this.g=Vm.g,this.b=Vm.b,this}shade(e){return this.r*=e,this.g*=e,this.b*=e,this}tri(e,t,n,r,i,a,o,s,c){let l=r-e,u=i-t,d=a-n,f=o-e,p=s-t,m=c-n,h=u*m-d*p,g=d*f-l*m,_=l*p-u*f,v=Math.hypot(h,g,_)||1;h/=v,g/=v,_/=v,this.pos.push(e,t,n,r,i,a,o,s,c),this.nor.push(h,g,_,h,g,_,h,g,_);let{r:y,g:b,b:x}=this;this.col.push(y,b,x,y,b,x,y,b,x)}quad(e,t,n,r,i,a,o,s,c,l,u,d){this.tri(e,t,n,r,i,a,o,s,c),this.tri(e,t,n,o,s,c,l,u,d)}flat(e,t,n,r,i){this.quad(e,i,t,e,i,r,n,i,r,n,i,t)}box(e,t,n,r,i,a,o=X.ALL){o&X.PY&&this.quad(e,i,n,e,i,a,r,i,a,r,i,n),o&X.NY&&this.quad(e,t,n,r,t,n,r,t,a,e,t,a),o&X.PX&&this.quad(r,t,n,r,i,n,r,i,a,r,t,a),o&X.NX&&this.quad(e,t,a,e,i,a,e,i,n,e,t,n),o&X.PZ&&this.quad(r,t,a,r,i,a,e,i,a,e,t,a),o&X.NZ&&this.quad(e,t,n,e,i,n,r,i,n,r,t,n)}cbox(e,t,n,r,i,a,o=X.ALL){this.box(e-r/2,t-i/2,n-a/2,e+r/2,t+i/2,n+a/2,o)}gable(e,t,n,r,i,a,o,s){if(o){let o=(t+r)/2,c=i+a;this.quad(e,i,t,e,c,o,n,c,o,n,i,t),this.quad(n,i,r,n,c,o,e,c,o,e,i,r),s!==void 0&&this.color(s),this.tri(e,i,r,e,c,o,e,i,t),this.tri(n,i,t,n,c,o,n,i,r)}else{let o=(e+n)/2,c=i+a;this.quad(e,i,r,o,c,r,o,c,t,e,i,t),this.quad(n,i,t,o,c,t,o,c,r,n,i,r),s!==void 0&&this.color(s),this.tri(e,i,t,o,c,t,n,i,t),this.tri(n,i,r,o,c,r,e,i,r)}}wallQuad(e,t,n,r,i,a){let o=.012;switch(e){case`px`:this.quad(t+o,i,n,t+o,a,n,t+o,a,r,t+o,i,r);break;case`nx`:this.quad(t-o,i,r,t-o,a,r,t-o,a,n,t-o,i,n);break;case`pz`:this.quad(r,i,t+o,r,a,t+o,n,a,t+o,n,i,t+o);break;case`nz`:this.quad(n,i,t-o,n,a,t-o,r,a,t-o,r,i,t-o)}}cylinder(e,t,n,r,i,a=8,o=!0){for(let s=0;s<a;s++){let c=s/a*Math.PI*2,l=(s+1)/a*Math.PI*2,u=e+Math.cos(c)*i,d=t+Math.sin(c)*i,f=e+Math.cos(l)*i,p=t+Math.sin(l)*i;this.quad(u,n,d,u,r,d,f,r,p,f,n,p),o&&this.tri(e,r,t,f,r,p,u,r,d)}}cone(e,t,n,r,i,a=7){for(let o=0;o<a;o++){let s=o/a*Math.PI*2,c=(o+1)/a*Math.PI*2;this.tri(e+Math.cos(s)*i,n,t+Math.sin(s)*i,e,r,t,e+Math.cos(c)*i,n,t+Math.sin(c)*i),this.tri(e,n,t,e+Math.cos(s)*i,n,t+Math.sin(s)*i,e+Math.cos(c)*i,n,t+Math.sin(c)*i)}}build(){let e=new xo;return e.setAttribute(`position`,new ao(new Float32Array(this.pos),3)),e.setAttribute(`normal`,new ao(new Float32Array(this.nor),3)),e.setAttribute(`color`,new ao(new Float32Array(this.col),3)),e.computeBoundingSphere(),e.computeBoundingBox(),e}},Z={sky:12375007,outside:8365150,road:6119528,roadEdge:5593183,marking:15856108,sidewalk:13290438,sidewalkAlt:12829887,plaza:14274751,plazaAlt:13616562,grass:9419876,grassAlt:8893789,lot:11119268,gravel:9405819,rail:5985874,sleeper:7297865,brick:[11887690,10901313,12611919,10377800],plaster:[15326401,14469283,14996664,13818063,14467496,13225942],roofFlat:7632764,roofParapet:9080209,roofTiles:[9390907,8209974,6250600,7098696],window:4086386,windowLight:7048099,frame:15921128,door:5916214,stationWall:13281408,stationRoof:6254460,hall:[11187388,10398643,12039078],hallRoof:8423823,gate:5989226,uni:14210508,uniBand:5205378,mensa:14866370,office:14144198,officeBand:2899558,stone:12433064,water:7252425,fence:8159879,awning:[5212763,11880250,4156058,13805120,8018572],glass:10272978,shelterFrame:5660778,wood:10120010,pavilionRoof:8075822,foliage:[5212732,6003012,4487734,6856520],trunk:7031603,lamp:4869973,spot:4098639,store:[15130834,14014678,13616822,14472131],storeBand:5269885,towerGlass:[6258070,7047840,5665932,8033704],towerBand:13226454,towerMullion:9413554,towerLobby:3095880,churchWall:13944749,churchRoof:5200479,garage:10197136,gangRed:12597547,spotParking:3829664,whWall:11561548,whWallTop:15129803,whFloor:13883092,whOffice:15260868,whCold:12375779,whInner:15789024,rack:8029068,crateWood:12094298,desk:9202250,chair:3950160,site:14263361},Um=[7174794,9071962,5926492,10129274,8019050,5201781,10849135,7303023,9206362,6057855,10189684,7043939],Wm=[4015186,4931640,3093824,5790302,4147775],Gm=[15780008,14198914,11566938,9067068,15120532],Km=[12106946,3029578,10107698,15263455,4153215,4869458,8030826,13215066],qm={tree(e){e.color(16777215),e.cone(0,0,.35,1.05,.42,7),e.cone(0,0,.75,1.45,.32,7)},lamp(e){e.color(Z.lamp),e.cylinder(0,0,0,1.35,.035,5),e.box(0,1.3,-.025,.32,1.35,.025)},car(e){e.color(16777215),e.box(-.22,.1,-.45,.22,.34,.45),e.color(3752780),e.box(-.2,.34,-.25,.2,.55,.2),e.color(2237994);for(let[t,n]of[[-.23,-.28],[.23,-.28],[-.23,.28],[.23,.28]])e.box(t-.03,0,n-.09,t+.03,.17,n+.09);e.color(16774352),e.box(-.18,.2,.45,-.08,.26,.46),e.box(.08,.2,.45,.18,.26,.46)},bus(e){e.color(15262416),e.box(-.3,.12,-1,.3,.82,1),e.color(3104124),e.box(-.305,.12,-1,.305,.3,1),e.color(3752780),e.box(-.31,.45,-.9,.31,.72,.95),e.box(-.25,.42,1,.25,.75,1.01),e.color(2237994);for(let[t,n]of[[-.3,-.65],[.3,-.65],[-.3,.65],[.3,.65]])e.box(t-.03,0,n-.12,t+.03,.22,n+.12)},stand(e){e.color(9202250),e.box(-.3,.3,-.13,.3,.34,.13);for(let t of[-.27,.27])for(let n of[-.1,.1])e.box(t-.02,0,n-.02,t+.02,.3,n+.02);e.color(Z.crateWood),e.box(-.27,.34,-.11,-.02,.46,.11),e.box(.02,.34,-.11,.27,.46,.11),e.box(-.24,0,-.1,0,.14,.1)},umbrella(e){e.color(7301732),e.cylinder(0,0,0,1,.018,4),e.color(16777215);let t=.5;for(let n=0;n<8;n++){let r=n/8*Math.PI*2,i=(n+1)/8*Math.PI*2;e.tri(Math.cos(r)*t,.86,Math.sin(r)*t,0,1.06,0,Math.cos(i)*t,.86,Math.sin(i)*t),e.tri(0,.86,0,Math.cos(r)*t,.86,Math.sin(r)*t,Math.cos(i)*t,.86,Math.sin(i)*t)}},handcart(e){e.color(8018492),e.box(-.2,.18,-.3,.2,.22,.25),e.color(Z.crateWood),e.box(-.18,.22,-.28,.18,.4,.22),e.color(3817285),e.box(-.23,.02,-.05,-.2,.2,.13),e.box(.2,.02,-.05,.23,.2,.13),e.color(5922662),e.box(-.16,.2,.25,-.13,.5,.5),e.box(.13,.2,.25,.16,.5,.5)},scooter(e){e.color(3817285),e.box(-.05,.04,-.3,.05,.08,.3),e.box(-.03,.08,.26,.03,.62,.3),e.box(-.16,.6,.27,.16,.63,.3),e.color(3112266),e.box(-.13,.08,-.32,.13,.34,-.08),e.color(2237994),e.box(-.025,0,-.32,.025,.09,-.22),e.box(-.025,0,.22,.025,.09,.32)},cargobike(e){e.color(2237994);for(let t of[-.38,.32])e.box(-.03,0,t-.11,.03,.22,t+.11);e.color(4869973),e.box(-.03,.18,-.38,.03,.24,.1),e.box(-.03,.18,-.1,.03,.5,-.06),e.box(-.03,.5,-.15,.03,.54,0),e.color(3112266),e.box(-.22,.2,.1,.22,.48,.55),e.color(Z.crateWood),e.box(-.18,.48,.14,.18,.56,.5)},foodtruck(e){e.color(15262938),e.box(-.32,.12,-.7,.32,.86,.45),e.color(3112266),e.box(-.325,.12,-.7,.325,.3,.45),e.color(15262938),e.box(-.3,.12,.45,.3,.6,.75),e.color(3752780),e.box(-.28,.42,.6,.28,.58,.76),e.box(-.33,.45,-.55,-.32,.72,.25),e.color(2237994);for(let[t,n]of[[-.32,-.45],[.32,-.45],[-.32,.5],[.32,.5]])e.box(t-.03,0,n-.11,t+.03,.22,n+.11)},truck(e){e.color(15921386),e.box(-.42,.18,-1.15,.42,1.25,.55),e.color(3112266),e.box(-.425,.42,-1.1,.425,.62,.5),e.color(15262938),e.box(-.4,.18,.55,.4,.95,1.15),e.color(3752780),e.box(-.38,.62,1,.38,.9,1.16),e.box(-.41,.62,.62,-.4,.88,1),e.box(.4,.62,.62,.41,.88,1),e.color(2237994);for(let[t,n]of[[-.42,-.75],[.42,-.75],[-.42,.8],[.42,.8]])e.box(t-.04,0,n-.17,t+.04,.3,n+.17);e.color(16774352),e.box(-.32,.3,1.15,-.18,.4,1.17),e.box(.18,.3,1.15,.32,.4,1.17)},crate(e){e.color(Z.crateWood),e.box(-.22,0,-.17,.22,.27,.17)}},Jm=new Map;function Ym(e){let t=Jm.get(e);if(!t){let n=new Hm;qm[e](n),t=n.build(),Jm.set(e,t)}return t}var Xm=null;function Zm(e){Xm||=new Zs({vertexColors:!0});let t=new K(Ym(e),Xm);return t.castShadow=!0,t.receiveShadow=!0,t}var Qm=.07,$m=.06;function eh(e,t){let n=Math.imul(e*374761393+t*668265263,1274126177);return n^=n>>>13,n=Math.imul(n,1103515245),n^=n>>>16,(n>>>0)/4294967296}function th(e,t,n){return t<0||n<0||t>=e.w||n>=e.h?-1:e.tiles[n*e.w+t]}function nh(e){return e===Y.ROAD||e===Y.CROSSWALK}function rh(e,t,n,r){let i=th(t,n,r),a=n,o=r,s=n+1,c=r+1,l=e=>{let i=X.PY,a=(e,i)=>{let a=th(t,n+e,r+i);return a===-1||nh(a)||a===Y.BUILDING};return a(1,0)&&(i|=X.PX),a(-1,0)&&(i|=X.NX),a(0,1)&&(i|=X.PZ),a(0,-1)&&(i|=X.NZ),i},u=(n+r)%2==0;switch(i){case Y.ROAD:{e.color(Z.road),e.flat(a,o,s,c,0),e.color(Z.marking);let i=th(t,n,r-1),l=th(t,n,r+1),u=th(t,n,r+2);!nh(i)&&l===Y.ROAD&&!nh(u)&&e.flat(n+.2,r+1-.035,n+.8,r+1+.035,.004);let d=th(t,n-1,r),f=th(t,n+1,r),p=th(t,n+2,r);!nh(d)&&f===Y.ROAD&&!nh(p)&&e.flat(n+1-.035,r+.2,n+1+.035,r+.8,.004);break}case Y.CROSSWALK:{e.color(Z.road),e.flat(a,o,s,c,0),e.color(Z.marking);let i=th(t,n-1,r)===Y.ROAD||th(t,n+1,r)===Y.ROAD;for(let t=0;t<3;t++){let a=.1+t*.3;i?e.flat(n+.08,r+a,n+.92,r+a+.18,.004):e.flat(n+a,r+.08,n+a+.18,r+.92,.004)}break}case Y.SIDEWALK:e.color(u?Z.sidewalk:Z.sidewalkAlt),e.box(a,0,o,s,Qm,c,l(Qm));break;case Y.PLAZA:e.color(u?Z.plaza:Z.plazaAlt),e.box(a,0,o,s,Qm,c,l(Qm));break;case Y.GREEN:e.color(eh(n,r)<.5?Z.grass:Z.grassAlt),e.box(a,0,o,s,$m,c,l($m));break;case Y.WAREHOUSE:e.color(Z.lot),e.box(a,0,o,s,$m,c,l($m));break;case Y.BUILDING:e.color(Z.sidewalkAlt),e.flat(a,o,s,c,.01)}}function ih(e,t,n,r){let i=0,a=(i,a)=>{let o=n+i,s=r+a;return o<0||s<0||o>=e.w||s>=e.h||e.buildingOf[s*e.w+o]!==t.id};return a(1,0)&&(i|=X.PX),a(-1,0)&&(i|=X.NX),a(0,1)&&(i|=X.PZ),a(0,-1)&&(i|=X.NZ),i}function ah(e,t,n,r,i){let a=th(e,t+r,n+i);return a===Y.SIDEWALK||a===Y.PLAZA||a===Y.CROSSWALK}var oh=[{side:`px`,face:X.PX,dx:1,dy:0},{side:`nx`,face:X.NX,dx:-1,dy:0},{side:`pz`,face:X.PZ,dx:0,dy:1},{side:`nz`,face:X.NZ,dx:0,dy:-1}];function sh(e,t,n){return e===`px`?t+1:e===`nx`?t:e===`pz`?n+1:n}function ch(e,t,n){return e===`px`||e===`nx`?[n,n+1]:[t,t+1]}function lh(e,t,n,r,i,a={}){let o=sh(t,n,r),[s,c]=ch(t,n,r),l=Math.max(1,Math.floor(i-.15));for(let n=a.firstFloor??0;n<l;n++){let r=n+.32,i=n+.78;a.band?(e.color(a.color??Z.uniBand),e.wallQuad(t,o,s+.04,c-.04,r,i)):(a.frame&&(e.color(Z.frame),e.wallQuad(t,o,s+.27,c-.27,r-.04,i+.03)),e.color(a.color??Z.window),uh(e,t,o,s+.31,c-.31,r,i))}}function uh(e,t,n,r,i,a,o){let s=t===`px`||t===`pz`?.01:-.01;e.wallQuad(t,n+s,r,i,a,o)}function dh(e,t,n,r,i){e.color(Z.roofParapet);let a=.08,o=.12;t&X.PX&&e.box(n+1-a,i,r,n+1,i+o,r+1),t&X.NX&&e.box(n,i,r,n+a,i+o,r+1),t&X.PZ&&e.box(n,i,r+1-a,n+1,i+o,r+1),t&X.NZ&&e.box(n,i,r,n+1,i+o,r+a)}function fh(e){return e.tiles.length===(e.x1-e.x0+1)*(e.y1-e.y0+1)}function ph(e,t){return e[Math.floor(t*e.length)%e.length]}function mh(e,t,n){let r=t.w,i=n.height,a=n.variant;switch(n.style){case`rowhouse`:{let o=a<.55?ph(Z.brick,a*1.8):ph(Z.plaster,(a-.55)*2.2);for(let a of n.tiles){let s=a%r,c=a/r|0,l=ih(t,n,s,c);e.color(o),e.box(s,0,c,s+1,i,c+1,l|X.PY);for(let n of oh)if(l&n.face&&(lh(e,n.side,s,c,i,{frame:!0}),ah(t,s,c,n.dx,n.dy)&&(s+c)%2==0)){e.color(Z.door);let[t,r]=ch(n.side,s,c);e.wallQuad(n.side,sh(n.side,s,c),t+.62,r-.12,.02,.62)}}if(fh(n)){let t=n.x1-n.x0>=n.y1-n.y0,r=.08;e.color(ph(Z.roofTiles,eh(n.x0,n.y0))),e.gable(n.x0-r,n.y0-r,n.x1+1+r,n.y1+1+r,i,.75,t,o),e.color(8017224);let a=n.x0+.6+eh(n.y0,n.x0)*(n.x1-n.x0),s=n.y0+.5+eh(n.x0+3,n.y0)*(n.y1-n.y0);e.box(a-.1,i+.2,s-.1,a+.1,i+.95,s+.1)}break}case`brick`:case`plaster`:case`shop`:case`office`:{let o=n.style===`brick`?ph(Z.brick,a):n.style===`office`?Z.office:ph(Z.plaster,a),s=ph(Z.awning,eh(n.x0*7,n.y0*3));for(let a of n.tiles){let c=a%r,l=a/r|0,u=ih(t,n,c,l);e.color(o),e.box(c,0,l,c+1,i,l+1,u),e.color(Z.roofFlat),e.flat(c,l,c+1,l+1,i),dh(e,u,c,l,i);for(let r of oh){if(!(u&r.face))continue;let a=sh(r.side,c,l),[o,d]=ch(r.side,c,l),f=ah(t,c,l,r.dx,r.dy);if(n.style===`shop`&&f){lh(e,r.side,c,l,i,{frame:!0,firstFloor:1}),e.color(Z.frame),e.wallQuad(r.side,a,o+.06,d-.06,.08,.86),e.color(Z.windowLight),uh(e,r.side,a,o+.1,d-.1,.12,.8),e.color(s);let t=.42,n=1.02,u=.84;r.side===`px`&&e.quad(a,n,o,a,n,d,a+t,u,d,a+t,u,o),r.side===`nx`&&e.quad(a,n,d,a,n,o,a-t,u,o,a-t,u,d),r.side===`pz`&&e.quad(d,n,a,o,n,a,o,u,a+t,d,u,a+t),r.side===`nz`&&e.quad(o,n,a,d,n,a,d,u,a-t,o,u,a-t)}else n.style===`office`?(lh(e,r.side,c,l,i,{frame:!1,color:Z.window}),e.color(Z.officeBand),e.wallQuad(r.side,a,o,d,i-.32,i-.12)):lh(e,r.side,c,l,i,{frame:!0})}}if(n.tiles.length>=6){e.color(10132897);let t=Math.floor(eh(n.x0,n.y1)*n.tiles.length),a=n.tiles[t],o=a%r,s=a/r|0;e.box(o+.25,i,s+.3,o+.7,i+.28,s+.7)}break}case`station`:{let i=2.4;for(let a of n.tiles){let o=a%r,s=a/r|0,c=ih(t,n,o,s);e.color(Z.stationWall),e.box(o,0,s,o+1,i,s+1,c);for(let t of oh){if(!(c&t.face))continue;let n=sh(t.side,o,s),[r,i]=ch(t.side,o,s);e.color(Z.frame),e.wallQuad(t.side,n,r+.2,i-.2,.25,1.95),e.color(Z.window),uh(e,t.side,n,r+.26,i-.26,.3,1.9)}}e.color(Z.stationRoof),e.gable(n.x0-.1,n.y0-.1,n.x1+1.1,n.y1+1.1,i,1.3,!0,Z.stationWall);let a=Math.floor((n.x0+n.x1+1)/2),o=n.y1+.2;e.color(Z.stationWall),e.box(a-.75,0,o-1.2,a+.75,5.2,o),e.color(Z.frame),e.wallQuad(`pz`,o,a-.42,a+.42,4.1,4.94),e.color(3095108),e.wallQuad(`pz`,o+.01,a-.32,a+.32,4.2,4.84),e.color(Z.stationRoof),e.gable(a-.85,o-1.3,a+.85,o+.1,5.2,.9,!1,Z.stationWall);break}case`hall`:{let o=ph(Z.hall,a);for(let a of n.tiles){let s=a%r,c=a/r|0,l=ih(t,n,s,c);e.color(o),e.box(s,0,c,s+1,i,c+1,l);for(let n of oh){if(!(l&n.face))continue;let r=sh(n.side,s,c),[a,o]=ch(n.side,s,c);e.color(Z.windowLight),e.wallQuad(n.side,r,a+.05,o-.05,i-.62,i-.3);let u=n.side===`px`||n.side===`nx`?c:s;ah(t,s,c,n.dx,n.dy)&&u%4==1&&(e.color(Z.gate),e.wallQuad(n.side,r,a+.1,o+.5,.02,1.45))}}if(fh(n)){let t=n.x1-n.x0>=n.y1-n.y0;e.color(Z.hallRoof),e.gable(n.x0-.05,n.y0-.05,n.x1+1.05,n.y1+1.05,i,.55,t,o)}else{e.color(Z.hallRoof);for(let t of n.tiles)e.flat(t%r,t/r|0,t%r+1,(t/r|0)+1,i)}break}case`uni`:case`mensa`:{let a=n.style===`uni`?Z.uni:Z.mensa;for(let o of n.tiles){let s=o%r,c=o/r|0,l=ih(t,n,s,c);e.color(a),e.box(s,0,c,s+1,i,c+1,l),e.color(Z.roofFlat),e.flat(s,c,s+1,c+1,i),dh(e,l,s,c,i);for(let t of oh)if(l&t.face){if(n.style===`mensa`){let n=sh(t.side,s,c),[r,i]=ch(t.side,s,c);e.color(Z.glass),e.wallQuad(t.side,n,r+.04,i-.04,.12,1.2)}else lh(e,t.side,s,c,i,{band:!0})}}break}case`store`:{let o=ph(Z.store,a),s=ph(Z.awning,eh(n.x0*5,n.y0*11));for(let a of n.tiles){let c=a%r,l=a/r|0,u=ih(t,n,c,l);e.color(o),e.box(c,0,l,c+1,i,l+1,u),e.color(Z.roofFlat),e.flat(c,l,c+1,l+1,i),dh(e,u,c,l,i);for(let n of oh){if(!(u&n.face))continue;let r=sh(n.side,c,l),[a,o]=ch(n.side,c,l);ah(t,c,l,n.dx,n.dy)&&(e.color(Z.windowLight),e.wallQuad(n.side,r,a+.02,o-.02,.1,1.05),e.color(s),uh(e,n.side,r,a,o,1.12,1.42)),e.color(Z.storeBand);for(let t=2;t<Math.floor(i-.2);t++)e.wallQuad(n.side,r,a+.03,o-.03,t+.25,t+.75)}}if(n.tiles.length>=8){e.color(10132897);let t=n.tiles[Math.floor(eh(n.x0,n.y1)*n.tiles.length)];e.box(t%r+.2,i,(t/r|0)+.2,t%r+.8,i+.35,(t/r|0)+.8)}break}case`tower`:{let o=ph(Z.towerGlass,a);for(let a of n.tiles){let s=a%r,c=a/r|0,l=ih(t,n,s,c);e.color(o),e.box(s,0,c,s+1,i,c+1,l),e.color(Z.roofFlat),e.flat(s,c,s+1,c+1,i);for(let t of oh){if(!(l&t.face))continue;let n=sh(t.side,s,c),[r,a]=ch(t.side,s,c);e.color(Z.towerLobby),e.wallQuad(t.side,n,r,a,.05,1.2),e.color(Z.towerBand);for(let o=2;o<Math.floor(i);o++)e.wallQuad(t.side,n,r,a,o-.08,o+.08);(t.side===`px`||t.side===`nx`?c:s)&1||(e.color(Z.towerMullion),e.wallQuad(t.side,n,r+.47,r+.53,1.2,i))}dh(e,l,s,c,i)}let s=(n.x0+n.x1+1)/2,c=(n.y0+n.y1+1)/2,l=(n.x1-n.x0+1)*.28,u=(n.y1-n.y0+1)*.28;if(n.char===`Y`){e.color(4869973),e.cylinder(s,c,i,i+.25,Math.min(l,u)*1.6,16),e.color(15921902),e.cylinder(s,c,i+.25,i+.27,Math.min(l,u)*1.35,24,!0),e.color(4869973),e.cylinder(s,c,i+.27,i+.29,Math.min(l,u)*1.2,24,!0),e.color(15921902);let t=Math.min(l,u)*.55;e.box(s-t,i+.29,c-t,s-t*.6,i+.31,c+t),e.box(s+t*.6,i+.29,c-t,s+t,i+.31,c+t),e.box(s-t*.6,i+.29,c-t*.15,s+t*.6,i+.31,c+t*.15)}else e.color(Z.roofParapet),e.box(s-l,i,c-u,s+l,i+1,c+u),e.color(10132897),e.box(s-l*.5,i+1,c-u*.5,s+l*.2,i+1.4,c+u*.3);break}case`church`:{let t=n.x0,r=n.y0,i=n.x1+1,a=n.y1+1,o=3.2;e.color(Z.churchWall),e.box(t+.3,0,r+2.2,i-.3,o,a-.2),e.color(Z.churchRoof),e.gable(t+.15,r+2.05,i-.15,a-.05,o,2.2,!1,Z.churchWall);let s=(t+i)/2;e.color(Z.churchWall),e.box(s-1,0,r+.2,s+1,8.5,r+2.2),e.color(Z.window);for(let t of[2.5,5.5,7.4])e.wallQuad(`pz`,r+2.2,s-.25,s+.25,t,t+.8);e.color(Z.churchRoof),e.gable(s-1.05,r+.15,s+1.05,r+2.25,8.5,3.2,!0,Z.churchRoof),e.color(Z.window);for(let n=r+3;n<a-.6;n+=1.4)e.wallQuad(`px`,i-.3,n,n+.5,.8,2.4),e.wallQuad(`nx`,t+.3,n,n+.5,.8,2.4);break}case`garage`:for(let a of n.tiles){let o=a%r,s=a/r|0,c=ih(t,n,o,s);e.color(Z.garage),e.box(o,0,s,o+1,i,s+1,c|X.PY);for(let n of oh){if(!(c&n.face)||!ah(t,o,s,n.dx,n.dy))continue;let[r,a]=ch(n.side,o,s);e.color(Z.gate),e.wallQuad(n.side,sh(n.side,o,s),r+.1,a-.1,.02,i-.25)}}break;case`subway`:{let t=n.x0+.2,r=n.y0+.2,i=n.x1+.8,a=n.y1+.8;e.color(3817285),e.box(t,0,r,i,.12,a),e.color(1974822),e.box(t+.25,.12,r+.25,i-.25,.13,a-.25),e.color(Z.shelterFrame);for(let[n,o]of[[t,r],[i-.08,r],[t,a-.08],[i-.08,a-.08]])e.box(n,0,o,n+.08,1.1,o+.08);e.color(Z.glass),e.box(t-.05,1.1,r-.05,i+.05,1.18,a+.05),e.color(Z.shelterFrame),e.box(i+.1,0,a-.1,i+.18,2.2,a-.02),e.color(2316200),e.box(i-.1,1.8,a-.12,i+.46,2.36,a),e.color(16777215),e.box(i+0,1.88,a+0,i+.07,2.28,a+.01),e.box(i+.29,1.88,a+0,i+.36,2.28,a+.01),e.box(i+0,1.88,a+0,i+.36,1.95,a+.01);break}case`fountain`:{let t=n.x0+.1,r=n.y0+.1,i=n.x1+.9,a=n.y1+.9,o=.18,s=.38;e.color(Z.stone),e.box(t,0,r,i,s,r+o),e.box(t,0,a-o,i,s,a),e.box(t,0,r+o,t+o,s,a-o),e.box(i-o,0,r+o,i,s,a-o),e.color(Z.water),e.flat(t+o,r+o,i-o,a-o,.28);let c=(t+i)/2,l=(r+a)/2;e.color(Z.stone),e.cylinder(c,l,0,.9,.16,8),e.cylinder(c,l,.9,1,.45,10),e.color(Z.water),e.cylinder(c,l,1,1.25,.08,6);break}case`fence`:e.color(Z.fence);for(let i of n.tiles){let a=i%r,o=i/r|0,s=(e,i)=>{let s=a+e,c=o+i;return s>=0&&c>=0&&s<r&&c<t.h&&t.buildingOf[c*r+s]===n.id},c=s(1,0)||s(-1,0),l=s(0,1)||s(0,-1);(c||!l)&&(e.box(a,.18,o+.46,a+1,.24,o+.54),e.box(a,.5,o+.46,a+1,.56,o+.54),e.box(a,.1,o+.49,a+1,.56,o+.51)),l&&(e.box(a+.46,.18,o,a+.54,.24,o+1),e.box(a+.46,.5,o,a+.54,.56,o+1),e.box(a+.49,.1,o,a+.51,.56,o+1)),e.box(a+.44,0,o+.44,a+.56,.62,o+.56)}break;case`rail`:for(let t of n.tiles){let n=t%r,i=t/r|0;e.color(Z.gravel),e.box(n,0,i,n+1,.05,i+1,X.PY),e.color(Z.sleeper),e.box(n+.1,.05,i+.15,n+.28,.08,i+.85,X.PY|X.SIDES),e.box(n+.6,.05,i+.15,n+.78,.08,i+.85,X.PY|X.SIDES),e.color(Z.rail),e.box(n,.08,i+.27,n+1,.13,i+.33,X.PY|X.PZ|X.NZ),e.box(n,.08,i+.67,n+1,.13,i+.73,X.PY|X.PZ|X.NZ)}break;case`shelter`:for(let t of n.tiles){let n=t%r,i=t/r|0;e.color(Z.plaza),e.box(n,0,i,n+1,Qm,i+1,X.PY),e.color(Z.shelterFrame),e.box(n+.05,0,i+.1,n+.12,.95,i+.17),e.box(n+.88,0,i+.1,n+.95,.95,i+.17),e.box(n,.95,i+.05,n+1,1.02,i+.75),e.color(Z.glass),e.box(n+.12,.15,i+.12,n+.88,.9,i+.15),e.color(9071178),e.box(n+.2,.25,i+.2,n+.8,.3,i+.4)}break;case`pavilion`:{let t=n.x0+.15,r=n.y0+.15,i=n.x1+.85,a=n.y1+.85;e.color(Z.wood),e.box(t,0,r,i,.14,a);for(let[n,o]of[[t+.1,r+.1],[i-.1,r+.1],[t+.1,a-.1],[i-.1,a-.1]])e.box(n-.07,.14,o-.07,n+.07,1.2,o+.07);e.color(Z.pavilionRoof),e.gable(t-.2,r-.2,i+.2,a+.2,1.2,.7,!0,Z.wood),e.color(Z.wood),e.box(t+.5,.14,r+.8,i-.5,.5,a-.8);break}}}var hh=new Wi,gh=new xi,_h=new U,vh=new U,yh=new U(0,1,0);function bh(e){let t=new va;t.name=`city`;let n=new Zs({vertexColors:!0}),r=an.chunkSize,i=Math.ceil(e.w/r),a=Math.ceil(e.h/r),o=[];for(let e=0;e<i*a;e++)o.push(new Hm);for(let t=0;t<e.h;t++)for(let n=0;n<e.w;n++)rh(o[Math.floor(t/r)*i+Math.floor(n/r)],e,n,t);for(let t of e.buildings)mh(o[Math.floor(t.y0/r)*i+Math.floor(t.x0/r)],e,t);for(let t of e.spots){let e=o[Math.floor(t.y/r)*i+Math.floor(t.x/r)];e.color(Z.spot);let n=.07600000000000001,a=t.x+.08,s=t.y+.08,c=t.x+.92,l=t.y+.92,u=.07;e.flat(a,s,c,s+u,n),e.flat(a,l-u,c,l,n),e.flat(a,s+u,a+u,l-u,n),e.flat(c-u,s+u,c,l-u,n)}let s=0;for(let e of o){if(e.vertexCount===0)continue;let r=new K(e.build(),n);r.castShadow=!0,r.receiveShadow=!0,r.matrixAutoUpdate=!1,t.add(r),s++}let c=new Zs({color:Z.outside}),l=new K(new Rs(e.w+160,e.h+160),c);l.rotation.x=-Math.PI/2,l.position.set(e.w/2,-.02,e.h/2),l.receiveShadow=!0,t.add(l),s++;let u=[...e.trees];for(let t=0;t<e.w*e.h;t++){if(e.tiles[t]!==Y.GREEN||e.trees.includes(t))continue;let n=t%e.w,r=t/e.w|0,i=!1;for(let t=-1;t<=1&&!i;t++)for(let a=-1;a<=1;a++){let o=th(e,n+a,r+t);(o===Y.ROAD||o===Y.CROSSWALK||o===Y.SIDEWALK||o===Y.PLAZA)&&(i=!0)}!i&&eh(n*13,r*7)<.16&&u.push(t)}let d=new Hm().color(Z.trunk);d.cylinder(0,0,0,.4,.06,5);let f=new Ss(Ym(`tree`),new Zs({vertexColors:!0}),u.length),p=new Ss(d.build(),n,u.length),m=new G;u.forEach((t,n)=>{let r=t%e.w+.5+(eh(t,1)-.5)*.3,i=(t/e.w|0)+.5+(eh(t,2)-.5)*.3,a=.8+eh(t,3)*.45;gh.setFromAxisAngle(yh,eh(t,4)*Math.PI),hh.compose(_h.set(r,$m,i),gh,vh.set(a,a,a)),f.setMatrixAt(n,hh),p.setMatrixAt(n,hh),f.setColorAt(n,m.setHex(Z.foliage[Math.floor(eh(t,5)*Z.foliage.length)]))}),f.castShadow=p.castShadow=!0,f.receiveShadow=!0,t.add(f,p),s+=2;let h=new Hm().color(16773577);h.box(.22,1.24,-.07,.4,1.31,.07);let g=new Ss(Ym(`lamp`),n,e.lamps.length),_=new Ss(h.build(),new Zs({vertexColors:!0,emissive:0}),e.lamps.length);return _.instanceMatrix.setUsage(Pr),e.lamps.forEach((t,n)=>{let r,i=0,a=0;th(e,t.x+1,t.y)===Y.ROAD?(r=0,i=.38):th(e,t.x-1,t.y)===Y.ROAD?(r=Math.PI,i=-.38):th(e,t.x,t.y+1)===Y.ROAD?(r=-Math.PI/2,a=.38):(r=Math.PI/2,a=-.38),gh.setFromAxisAngle(yh,r),hh.compose(_h.set(t.x+.5+i,Qm,t.y+.5+a),gh,vh.set(1,1,1)),g.setMatrixAt(n,hh),_.setMatrixAt(n,hh)}),g.castShadow=!0,t.add(g,_),s+=2,{group:t,material:n,lampHeads:_,drawCallsStatic:s}}var xh=new Set([`brick`,`plaster`,`shop`,`store`,`tower`,`uni`,`mensa`,`office`,`garage`]);function Sh(e){let t=[];for(let n=0;n<e.districtTiles.length;n++){let r=new Hm().color(Z.gangRed),i=new Hm().color(Z.gangRed);for(let t of e.districtTiles[n]){let a=t%e.w,o=t/e.w|0,s=e.tiles[t];if(s===Y.BUILDING){let n=e.buildings[e.buildingOf[t]];n&&xh.has(n.style)&&r.flat(a,o,a+1,o+1,n.height+.03);continue}let c=s===Y.ROAD||s===Y.CROSSWALK?.02:.09;r.flat(a,o,a+1,o+1,c);let l=(t,r)=>t>=0&&r>=0&&t<e.w&&r<e.h&&e.district[r*e.w+t]!==n,u=.55;l(a+1,o)&&i.quad(a+1,0,o,a+1,u,o,a+1,u,o+1,a+1,0,o+1),l(a-1,o)&&i.quad(a,0,o+1,a,u,o+1,a,u,o,a,0,o),l(a,o+1)&&i.quad(a+1,0,o+1,a+1,u,o+1,a,u,o+1,a,0,o+1),l(a,o-1)&&i.quad(a,0,o,a,u,o,a+1,u,o,a+1,0,o)}let a=new $o({color:16777215,vertexColors:!0,transparent:!0,opacity:.3,depthWrite:!1}),o=new K(r.build(),a),s=new $o({color:16777215,vertexColors:!0,transparent:!0,opacity:.45,depthWrite:!1,side:2}),c=new K(i.build(),s);o.add(c),o.renderOrder=2,c.renderOrder=2,o.matrixAutoUpdate=!1,c.matrixAutoUpdate=!1,t.push(o)}return t}var Ch=.27,wh=.25,Th=.13,Eh=class{capacity;group=new va;legs;torso;head;vest;tray;count=0;vestCount=0;trayCount=0;m=new Wi;m2=new Wi;q=new xi;p=new U;s=new U;c=new G;axisY=new U(0,1,0);axisX=new U(1,0,0);constructor(e){this.capacity=e;let t=new Zs({color:16777215}),n=new Ps(.075,Ch,.09);n.translate(0,-.27/2,0);let r=new Ps(.22,wh,.13),i=new Ps(Th,Th,Th),a=new Ps(.235,.17,.145),o=new Ps(.26,.17,.2);this.legs=new Ss(n,t,e*2),this.torso=new Ss(r,t,e),this.head=new Ss(i,t,e),this.vest=new Ss(a,t,e),this.tray=new Ss(o,t,e);for(let e of[this.legs,this.torso,this.head,this.vest,this.tray])e.instanceMatrix.setUsage(Pr),e.castShadow=!0,e.frustumCulled=!1,e.count=0,e.setColorAt(0,this.c.setHex(16777215)),this.group.add(e)}begin(){this.count=0,this.vestCount=0,this.trayCount=0}add(e){if(this.count>=this.capacity)return;let t=this.count++,{m:n,m2:r,q:i,p:a,s:o,c:s}=this,c=Math.PI/2-e.ang,l=e.scale,u=e.moving?Math.sin(e.phase)*.55:0,d=(Ch+(e.moving?Math.abs(Math.cos(e.phase))*.025:0))*l;i.setFromAxisAngle(this.axisY,c),n.compose(a.set(e.x,d+wh/2*l,e.z),i,o.set(l,l,l)),this.torso.setMatrixAt(t,n),this.torso.setColorAt(t,s.setHex(e.shirt)),n.compose(a.set(e.x,d+.32*l,e.z),i,o),this.head.setMatrixAt(t,n),this.head.setColorAt(t,s.setHex(e.skin));for(let c=0;c<2;c++){let l=c===0?-.055:.055;n.compose(a.set(e.x,d,e.z),i,o),r.makeTranslation(l,0,0),n.multiply(r),r.makeRotationAxis(this.axisX,c===0?u:-u),n.multiply(r),this.legs.setMatrixAt(t*2+c,n),this.legs.setColorAt(t*2+c,s.setHex(e.pants))}if(e.vest){let t=this.vestCount++;n.compose(a.set(e.x,d+.15499999999999997*l,e.z),i,o),this.vest.setMatrixAt(t,n),this.vest.setColorAt(t,s.setHex(e.vest))}if(e.tray){let t=this.trayCount++;n.compose(a.set(e.x,d+.1*l,e.z),i,o),r.makeTranslation(0,0,.17),n.multiply(r),this.tray.setMatrixAt(t,n),this.tray.setColorAt(t,s.setHex(e.trayColor))}}end(){this.torso.count=this.count,this.head.count=this.count,this.legs.count=this.count*2,this.vest.count=this.vestCount,this.tray.count=this.trayCount;for(let e of[this.legs,this.torso,this.head,this.vest,this.tray])e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0)}get drawCalls(){let e=0;for(let t of[this.legs,this.torso,this.head,this.vest,this.tray])t.count>0&&e++;return e}},Dh=24,Oh=1.4,kh=class{items=[];next=0;pt={x:0,y:0};constructor(e){for(let t=0;t<Dh;t++){let t=document.createElement(`div`);t.className=`floater`,t.style.display=`none`,e.appendChild(t),this.items.push({el:t,x:0,y:0,z:0,age:0,active:!1})}}spawn(e,t,n){let r=this.items[this.next];this.next=(this.next+1)%Dh,r.x=e,r.y=1,r.z=t,r.age=0,r.active=!0,r.el.textContent=n,r.el.style.display=`block`}update(e,t){for(let n of this.items){if(!n.active)continue;if(n.age+=e,n.age>=Oh){n.active=!1,n.el.style.display=`none`;continue}t(n.x,n.y+n.age*.55,n.z,this.pt);let r=1-Math.max(0,(n.age-Oh*.6)/(Oh*.4));n.el.style.transform=`translate(${this.pt.x.toFixed(1)}px, ${this.pt.y.toFixed(1)}px) translate(-50%, -100%)`,n.el.style.opacity=r.toFixed(2)}}clear(){for(let e of this.items)e.active=!1,e.el.style.display=`none`}},Ah=`<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11V7.5a1.5 1.5 0 0 1 3 0V11M10 10V6.5a1.5 1.5 0 0 1 3 0V10M13 10V7.5a1.5 1.5 0 0 1 3 0V12M16 11a1.5 1.5 0 0 1 3 0v3a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-2-3.5a1.5 1.5 0 0 1 2.6-1.5L9 14"/></svg>`,jh=`<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`,Mh=`<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/></svg>`,Nh=class{root;districtEls=[];districtKey=[];shelfEl;shelfKey=``;warehouseEl;handlers={onDistrict:()=>{},onShelf:()=>{},onWarehouse:()=>{}};pt={x:0,y:0};constructor(e){this.root=e,z.forEach((t,n)=>{let r=document.createElement(`button`);r.className=`dlabel`,r.addEventListener(`click`,()=>this.handlers.onDistrict(n)),e.appendChild(r),this.districtEls.push(r),this.districtKey.push(``)}),this.shelfEl=document.createElement(`button`),this.shelfEl.className=`plus-btn`,this.shelfEl.setAttribute(`aria-label`,`Regal kaufen`),this.shelfEl.addEventListener(`click`,()=>this.handlers.onShelf()),e.appendChild(this.shelfEl),this.warehouseEl=document.createElement(`button`),this.warehouseEl.className=`wh-bubble`,this.warehouseEl.textContent=``,this.warehouseEl.addEventListener(`click`,()=>this.handlers.onWarehouse()),e.appendChild(this.warehouseEl)}place(e,t,n){let r=window.innerWidth,i=window.innerHeight;t<-120||n<-60||t>r+120||n>i+60?e.style.display=`none`:(e.style.display=``,e.style.transform=`translate(${t.toFixed(1)}px, ${n.toFixed(1)}px) translate(-50%, -100%)`)}update(e,t,n,r,i,a,o){if(this.root.style.display=o?``:`none`,!o)return;let s=this.pt;if(t.forEach((t,i)=>{let a=this.districtEls[i],o=`${t.owner}|${t.gang}|${t.attackable}|${r===i}`;if(o!==this.districtKey[i]){this.districtKey[i]=o;let e=yf[z[i]];t.owner===`player`?(a.className=`dlabel own`,a.innerHTML=`${Mh}<span>${e}</span>`,a.disabled=!0):(a.disabled=!1,a.className=`dlabel gang ${t.attackable?`attackable`:`locked`} ${r===i?`hint`:``}`,a.innerHTML=`<span class="dl-top">${t.attackable?Ah:jh}<b>${e}</b></span><span class="dl-sub">Gemüsegang: ${t.gang} Kämpfer${t.attackable?` · Angreifen`:``}</span>`)}let[c,l]=n[i];e(c+.5,t.owner===`player`?1.5:3,l+.5,s),this.place(a,s.x,s.y)}),i){let t=`${i.cost}|${i.affordable}|${i.hint}`;t!==this.shelfKey&&(this.shelfKey=t,this.shelfEl.className=`plus-btn ${i.affordable?``:`poor`} ${i.hint?`hint`:``}`,this.shelfEl.innerHTML=`<span class="plus">+</span><span class="price">${i.cost} €</span>`),e(i.x,i.y,i.z,s),this.place(this.shelfEl,s.x,s.y)}else this.shelfEl.style.display=`none`;a?(this.warehouseEl.textContent!==a.text&&(this.warehouseEl.textContent=a.text,this.warehouseEl.className=`wh-bubble ${a.info?`info`:``}`),e(a.x,a.y,a.z,s),this.place(this.warehouseEl,s.x,s.y)):this.warehouseEl.style.display=`none`}},Ph=Math.SQRT2,Fh=class{world;g;parent;seen;closed;gen=1;heap;heapF;heapSize=0;cache=new Map;constructor(e){this.world=e;let t=e.w*e.h;this.g=new Float32Array(t),this.parent=new Int32Array(t),this.seen=new Uint32Array(t),this.closed=new Uint32Array(t),this.heap=new Int32Array(t*8),this.heapF=new Float32Array(t*8)}push(e,t){let n=this.heapSize++,r=this.heap,i=this.heapF;for(;n>0;){let e=n-1>>1;if(i[e]<=t)break;r[n]=r[e],i[n]=i[e],n=e}r[n]=e,i[n]=t}pop(){let e=this.heap,t=this.heapF,n=e[0],r=--this.heapSize;if(r>0){let n=e[r],i=t[r],a=0;for(;;){let n=a*2+1;if(n>=r)break;let o=n+1,s=o<r&&t[o]<t[n]?o:n;if(t[s]>=i)break;e[a]=e[s],t[a]=t[s],a=s}e[a]=n,t[a]=i}return n}find(e,t,n,r=!0){let i=r?`${n}:${e}:${t}`:``;if(r){let e=this.cache.get(i);if(e!==void 0)return e}let a=this.search(e,t,n);return r&&(this.cache.size>4e3&&this.cache.clear(),this.cache.set(i,a)),a}lastCost=0;search(e,t,n){let r=this.world,i=r.costs[n],a=r.w,o=r.h;if(e===t)return this.lastCost=0,[e];if(!i[t]||!i[e])return null;this.gen++,this.gen>4294967280&&(this.seen.fill(0),this.closed.fill(0),this.gen=1);let s=this.gen,c=this.g,l=this.parent,u=this.seen,d=this.closed;this.heapSize=0;let f=t%a,p=t/a|0,m=e=>{let t=Math.abs(e%a-f),n=Math.abs((e/a|0)-p);return t>n?t+(Ph-1)*n:n+(Ph-1)*t};for(c[e]=0,l[e]=-1,u[e]=s,this.push(e,m(e));this.heapSize>0;){let e=this.pop();if(d[e]===s)continue;if(d[e]=s,e===t)break;let n=e%a,r=e/a|0,f=c[e];for(let t=-1;t<=1;t++){let p=r+t;if(!(p<0||p>=o))for(let o=-1;o<=1;o++){if(o===0&&t===0)continue;let h=n+o;if(h<0||h>=a)continue;let g=p*a+h,_=i[g];if(!_||d[g]===s)continue;let v=_;if(o!==0&&t!==0){if(!i[r*a+h]||!i[p*a+n])continue;v=_*Ph}let y=f+v;(u[g]!==s||y<c[g])&&(u[g]=s,c[g]=y,l[g]=e,this.push(g,y+m(g)))}}}if(d[t]!==s)return null;this.lastCost=c[t];let h=[];for(let e=t;e!==-1;e=l[e])h.push(e);return h.reverse(),h}},Ih=new WeakMap;function Lh(e){let t=Ih.get(e);return t||(t=new Fh(e),Ih.set(e,t)),t}function Rh(e,t,n,r,i=!0){return Lh(e).find(t,n,r,i)}function zh(e,t){let n=0;for(let r=1;r<t.length;r++){let i=t[r-1],a=t[r],o=Math.abs(i%e.w-a%e.w),s=Math.abs((i/e.w|0)-(a/e.w|0));n+=o&&s?Ph:1}return n}function Bh(e,t){return Mt[e].unitPrice*Gt[t].priceLevel}var Vh=[],Hh=[];function Uh(e,t,n){if(!t.load.length)return null;if(t.load.length===1)return t.load[0];let r=0;Hh.length=t.load.length;for(let e=0;e<t.load.length;e++)Hh[e]=Ut[n][t.load[e].fruit],r+=Hh[e];let i=Hf(e)*r;for(let e=0;e<t.load.length;e++)if(i-=Hh[e],i<0)return t.load[e];return t.load[t.load.length-1]}function Wh(e,t,n){let r=dm(e);for(let i of t.spots){Vh.length=0;for(let t of e.dealers)t.mode===`selling`&&t.spot===i.index&&t.load.length&&Vh.push(t);if(!Vh.length)continue;let a=Wf(e,hm(i.district,r)/Dt);for(let r=0;r<a;r++){let r=Vh[Math.floor(Hf(e)*Vh.length)],a=Uh(e,r,i.district);if(!a)continue;let o=ip(e,t,i.districtIndex,a.fruit);if(Hf(e)>=Jt.buyChance*sp(o))continue;let s=Math.max(0,Math.min(1,1-o)),c=Bh(a.fruit,i.district)*op(s)*qf(a.quality)*Xf(a.fresh);a.units--,a.units<=0&&r.load.splice(r.load.indexOf(a),1),e.money+=c,e.earnedTotal+=c,e.earnedToday+=c,e.stats.sold++,e.soldToday[a.fruit]++,e.districtSold[i.districtIndex][a.fruit]++,r.soldToday++,r.earnedToday+=c,r.earnedTotal+=c,n?.push({x:r.x,y:r.y,amount:c,spotTile:i.tile})}}}function Gh(e,t){let[n,r]=e.warehouse.shelfSlots[t];return{x:n,y:r,w:3,h:1}}function Kh(e){let t=e.warehouse;return{x:t.doorX+t.doorWidth/2,y:t.hall.y+t.hall.h-2.2}}function qh(e,t){let n=Kh(e),r=t%6,i=Math.floor(t/6)%3;return{x:n.x+1.6+r*.55,y:n.y+.2+i*.55}}function Jh(e,t){let n=e.warehouse.yard,r=t%6,i=Math.floor(t/6);return{x:n.x+.75+r*((n.w-1.5)/5),y:n.y+1.4+i*1.05}}var Yh=-1,Xh=-2,Zh={x:0,y:0},Qh=new WeakMap;function $h(e){let t=Qh.get(e);return t||(t=e.spots.map(t=>{let n=Rh(e,e.warehouse.door,t.tile,`foot`);return n?zh(e,n):9999}),Qh.set(e,t)),t}function eg(e,t,n){let r=0;for(let i of e.dealers)i!==n&&i.spot===t&&r++;return r}function tg(e,t,n,r,i){let a=0;for(let o of e.dealers)if(o!==i&&o.spot!==null&&t.spots[o.spot].districtIndex===n)for(let e of o.load)e.fruit===r&&(a+=e.units);return a}function ng(e){return Xf(e)*(1+2*Math.max(0,.5-e))}function rg(e,t,n,r,i,a,o=0,s=1){let c=t.spots[r],l=ip(e,t,c.districtIndex,i,tg(e,t,c.districtIndex,i,n)+o),u=Math.max(0,Math.min(1,1-l)),d=$h(t)[r];return hm(c.district,dm(e))*Bh(i,c.district)*op(u)*sp(l)*ng(s)/(a+1)/(1+d/Jt.distanceHalf)}function ig(e,t){let n=t[0];for(let e of t)e.score>n.score&&(n=e);if(Hf(e)<e.salesQuality)return n;let r=t.filter(e=>e.score>0);return r.length?r[Math.floor(Hf(e)*r.length)]:n}function ag(e,t,n){if(n.spot===null)return!1;let r=t.spots[n.spot].districtIndex;return n.load.every(n=>sp(ip(e,t,r,n.fruit))<=0)}function og(e,t,n){let r=new Map;for(let t of e.crates)t.fresh>0&&r.set(t.fruit,Math.min(r.get(t.fruit)??1,t.fresh));let i=Tt.filter(e=>r.has(e)),a=n.load.map(e=>e.fruit),o=a.length?[a[0]]:i;if(!o.length)return null;let s=e=>a.length?n.load.find(t=>t.fruit===e)?.fresh??1:r.get(e)??1,c=[];for(let r of t.spots){if(!Mf(e,r.districtIndex))continue;let i=eg(e,r.index,n);if(!(i>=Jt.maxPerSpot))for(let a of o)c.push({spot:r.index,fruit:a,score:rg(e,t,n,r.index,a,i,0,s(a)),occ:i})}if(!c.length)return null;let l=ig(e,c);if(l.score<=0)return null;let u=[l.fruit],d=a.length?0:Rf(e)-1,f=new Map;for(let t of e.crates)t.fresh>0&&f.set(t.fruit,(f.get(t.fruit)??0)+1);f.set(l.fruit,(f.get(l.fruit)??0)-1);for(let a=0;a<d;a++){let a=[];for(let o of i){if((f.get(o)??0)<=0)continue;let i=u.filter(e=>e===o).length*20;a.push({fruit:o,score:rg(e,t,n,l.spot,o,l.occ,i,r.get(o)??1)})}if(!a.length)break;let o=ig(e,a);u.push(o.fruit),f.set(o.fruit,(f.get(o.fruit)??0)-1)}return{spot:l.spot,fruits:u}}function sg(e){let t=new Set(e.dealers.map(e=>e.name));for(let n=0;n<30;n++){let n=`${gf[Math.floor(Hf(e)*gf.length)]} ${_f[Math.floor(Hf(e)*_f.length)]}`;if(!t.has(n))return n}return`${gf[0]} ${_f[e.dealers.length%_f.length]}`}function cg(e,t){let n={id:e.nextId++,name:sg(e),look:Hf(e),mode:`idle`,timer:0,x:0,y:0,px:0,py:0,ang:-Math.PI/2,path:null,pathIdx:0,endX:0,endY:0,spot:null,slot:0,load:[],soldToday:0,earnedToday:0,earnedTotal:0};e.dealers.push(n);let r=qh(t,e.dealers.length-1);return n.x=n.px=r.x,n.y=n.py=r.y,n}function lg(e,t,n,r){if(n>=0)r.x=n%e.w+.5,r.y=(n/e.w|0)+.5;else if(n===Yh){let t=Kh(e);r.x=t.x,r.y=t.y}else r.x=t.endX,r.y=t.endY}function ug(e,t){if(t.path&&t.pathIdx>0){for(let e=Math.min(t.pathIdx-1,t.path.length-1);e>=0;e--)if(t.path[e]>=0)return t.path[e]}if(t.spot!==null&&(t.mode===`setup`||t.mode===`selling`||t.mode===`packing`))return e.spots[t.spot].tile;let n=Math.floor(t.y)*e.w+Math.floor(t.x);return e.costs.foot[n]?n:e.warehouse.door}function dg(e,t,n){let r=0;for(let i of n){let n=ep(e,i);n&&(t.load.push({fruit:i,units:20,fresh:n.fresh,quality:n.quality}),r++)}return r}function fg(e,t,n,r){let i=t.spots[r],a=Rh(t,n.mode===`idle`||n.mode===`loading`?t.warehouse.door:ug(t,n),i.tile,`foot`);if(!a)return!1;n.slot=+!!e.dealers.some(e=>e!==n&&e.spot===r&&e.slot===0),n.spot=r,n.endX=i.x+.5+(n.slot===0?-.25:.25),n.endY=i.y+.5;let o=[];(n.mode===`idle`||n.mode===`loading`)&&o.push(Yh);for(let e of a)o.push(e);return o.push(Xh),n.path=o,n.pathIdx=0,n.mode=`toSpot`,!0}function pg(e,t,n){let r=Rh(t,ug(t,n),t.warehouse.door,`foot`);n.spot=null;let i=qh(t,e.dealers.indexOf(n));n.endX=i.x,n.endY=i.y,r?(n.path=[...r,Yh,Xh],n.pathIdx=0,n.mode=`toWarehouse`):mg(e,t,n)}function mg(e,t,n){let r=qh(t,e.dealers.indexOf(n));n.x=n.px=r.x,n.y=n.py=r.y,n.path=null,n.spot=null,n.mode=`idle`,n.timer=0,n.ang=-Math.PI/2}function hg(e,t,n){if(!n.path)return!0;let r=zf(e)/Et.ticksPerSecond;for(;r>1e-6&&n.pathIdx<n.path.length;){lg(t,n,n.path[n.pathIdx],Zh);let e=Zh.x-n.x,i=Zh.y-n.y,a=Math.hypot(e,i);a>1e-4&&(n.ang=Math.atan2(i,e)),a<=r?(n.x=Zh.x,n.y=Zh.y,r-=a,n.pathIdx++):(n.x+=e/a*r,n.y+=i/a*r,r=0)}return n.pathIdx>=n.path.length&&(n.path=null,!0)}function gg(e,t){let n=At(Jt.setupSeconds);for(let r of e.dealers)switch(r.px=r.x,r.py=r.y,r.mode){case`idle`:{if(--r.timer>0||(r.timer=At(Jt.waitSeconds),r.load.length===0&&e.crates.length===0))break;let i=og(e,t,r);if(!i||(r.load.length===0&&dg(e,r,i.fruits),r.load.length===0))break;r.spot=i.spot,r.mode=`loading`,r.timer=n;break}case`loading`:if(--r.timer>0)break;if(r.spot===null||!Mf(e,t.spots[r.spot].districtIndex)){r.mode=`idle`,r.spot=null;break}fg(e,t,r,r.spot)||(r.mode=`idle`,r.spot=null);break;case`toSpot`:if(r.spot===null||!Mf(e,t.spots[r.spot].districtIndex)){pg(e,t,r);break}hg(e,t,r)&&(r.mode=`setup`,r.timer=n,r.ang=Math.PI/2);break;case`setup`:--r.timer<=0&&(r.mode=`selling`);break;case`selling`:(r.load.length===0||r.spot===null||!Mf(e,t.spots[r.spot].districtIndex)||(e.totalTicks+r.id)%50==0&&ag(e,t,r))&&(r.mode=`packing`,r.timer=n);break;case`packing`:if(--r.timer>0)break;pg(e,t,r);break;case`toWarehouse`:hg(e,t,r)&&mg(e,t,r)}}function _g(e){let t=At(Jt.setupSeconds);return e.mode===`setup`?1-e.timer/t:e.mode===`packing`?e.timer/t:0}function vg(e){let t=0;for(let n of e.load)t+=n.units;return t}var yg=14605008,bg=4168277,xg=2961976,Sg=3107647,Cg=9058858,wg=6169624,Tg=4165461,Eg=11549230,Dg=20,Og=42,kg=class{world;group=new va;stands;umbrellas;carts;ring;m=new Wi;q=new xi;p=new U;s=new U(1,1,1);c=new G;up=new U(0,1,0);fig={x:0,z:0,ang:0,moving:!1,phase:0,scale:1,shirt:0,pants:0,skin:0,vest:0,tray:!1,trayColor:0};constructor(e,t){this.world=e;let n=new Zs({vertexColors:!0});this.stands=new Ss(Ym(`stand`),n,t),this.umbrellas=new Ss(Ym(`umbrella`),n,t),this.umbrellas.setColorAt(0,this.c.setHex(Tg)),this.carts=[new Ss(Ym(`handcart`),n,t),new Ss(Ym(`cargobike`),n,t)],this.ring=new Ss(new Ps(.1,.02,.05),new $o({color:16777215}),t*Dg),this.ring.setColorAt(0,this.c.setHex(16777215));for(let e of[this.stands,this.umbrellas,...this.carts,this.ring])e.instanceMatrix.setUsage(Pr),e.castShadow=e!==this.ring,e.frustumCulled=!1,e.count=0,this.group.add(e)}addStand(e,t,n,r,i){this.q.setFromAxisAngle(this.up,0),this.m.compose(this.p.set(t,.08,n+.36),this.q,this.s.set(r,r,r)),this.stands.setMatrixAt(e,this.m),this.m.compose(this.p.set(t+.2,.08,n+.12),this.q,this.s),this.umbrellas.setMatrixAt(e,this.m),this.umbrellas.setColorAt(e,this.c.setHex(i)),this.s.set(1,1,1)}update(e,t,n,r){let i=this.world,a=this.fig,o=0,s=0,c=[0,0];for(let i of e.dealers){let l=i.px+(i.x-i.px)*t,u=i.py+(i.y-i.py)*t,d=i.mode===`setup`||i.mode===`selling`||i.mode===`packing`,f=i.load.length>0&&(i.mode===`toSpot`||i.mode===`loading`);if(a.x=l,a.z=u,a.ang=d?Math.PI/2:i.ang,a.moving=i.x!==i.px||i.y!==i.py,a.phase=n*9+i.id,a.scale=1,a.shirt=yg,a.vest=bg,a.pants=Wm[Math.floor(i.look*31)%Wm.length],a.skin=Gm[Math.floor(i.look*97)%Gm.length],a.tray=f&&e.upgrade===0,a.trayColor=i.load.length?Mt[i.load[0].fruit].color:10066329,r.add(a),f&&e.upgrade>0){let t=this.carts[Math.min(1,e.upgrade-1)],n=c[Math.min(1,e.upgrade-1)]++;this.q.setFromAxisAngle(this.up,Math.PI/2-a.ang);let r=e.upgrade===1?.42:.05;this.m.compose(this.p.set(l+Math.cos(a.ang)*r,.08,u+Math.sin(a.ang)*r),this.q,this.s),t.setMatrixAt(n,this.m)}if(d){let e=i.mode===`selling`?1:Math.max(.05,_g(i));if(this.addStand(o++,l,u,e,Tg),i.mode!==`selling`){let e=_g(i);for(let t=0;t<Dg;t++){let n=t/Dg*Math.PI*2-Math.PI/2;this.q.setFromAxisAngle(this.up,-n),this.m.compose(this.p.set(l+Math.cos(n)*.62,.12,u+.2+Math.sin(n)*.62),this.q,this.s),this.ring.setMatrixAt(s,this.m),this.ring.setColorAt(s,this.c.setHex(t/Dg<e?3112266:14080984)),s++}}}}let l=Math.min(Og,e.fighters+(e.battle?.result,0));for(let e=0;e<l;e++){let t=Jh(i,e);a.x=t.x,a.z=t.y,a.ang=Math.PI/2,a.moving=!1,a.scale=1.02,a.shirt=xg,a.vest=Sg,a.pants=2369323,a.skin=Gm[e*7%Gm.length],a.tray=!1,r.add(a)}for(let t of i.spots){if(e.districts[t.districtIndex].owner!==`gang`)continue;let n=t.x+.5,i=t.y+.5;this.addStand(o++,n,i,1,Eg),a.x=n,a.z=i,a.ang=Math.PI/2,a.moving=!1,a.scale=1,a.shirt=Cg,a.vest=wg,a.pants=2764081,a.skin=Gm[t.index*3%Gm.length],a.tray=!1,r.add(a)}for(let t=0;t<e.districts.length;t++){let n=e.districts[t];if(n.owner!==`gang`||n.gang<=0)continue;let[o,s]=i.labels[t],c=Math.min(5,Math.ceil(n.gang/5));for(let e=0;e<c;e++){let n=e/c*Math.PI*2+t;a.x=o+.5+Math.cos(n)*.9,a.z=s+1.6+Math.sin(n)*.6,a.ang=n+Math.PI,a.moving=!1,a.scale=1.03,a.shirt=Cg,a.vest=wg,a.pants=2764081,a.skin=Gm[(e+t)%Gm.length],a.tray=!1,r.add(a)}}this.stands.count=o,this.umbrellas.count=o,this.ring.count=s,this.carts[0].count=c[0],this.carts[1].count=c[1];for(let e of[this.stands,this.umbrellas,this.ring,...this.carts])e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0)}},Ag={x:0,y:0,dx:0,dy:0},jg={x:0,y:0,dx:0,dy:0},Mg=class{group=new va;cars;buses;m=new Wi;q=new xi;p=new U;s=new U(1,1,1);c=new G;up=new U(0,1,0);constructor(e){let t=new Zs({vertexColors:!0});this.cars=new Ss(Ym(`car`),t,e),this.buses=new Ss(Ym(`bus`),t,8);for(let e of[this.cars,this.buses])e.instanceMatrix.setUsage(Pr),e.castShadow=!0,e.receiveShadow=!0,e.frustumCulled=!1,e.count=0,e.setColorAt(0,this.c.setHex(16777215)),this.group.add(e)}update(e,t,n){let r=0,i=0;for(let a of t){let t=a.kind===`bus`?e.busRoutes[a.route]:e.carRoutes[a.route];if(!t)continue;let o=a.ps+(a.s-a.ps)*n;Bm(t,o-.5,Ag),Bm(t,o+.5,jg);let s=jg.x-Ag.x,c=jg.y-Ag.y,l=Math.hypot(s,c)||1;s/=l,c/=l;let u=(Ag.x+jg.x)/2,d=(Ag.y+jg.y)/2,f=u-c*.5,p=d+s*.5,m=Math.atan2(s,c);this.q.setFromAxisAngle(this.up,m),this.m.compose(this.p.set(f,0,p),this.q,this.s),a.kind===`bus`?this.buses.setMatrixAt(i++,this.m):(this.cars.setMatrixAt(r,this.m),this.cars.setColorAt(r,this.c.setHex(Km[a.color%Km.length])),r++)}this.cars.count=r,this.buses.count=i;for(let e of[this.cars,this.buses])e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0)}},Ng=.1,Pg=1.1,Fg=.15,Ig={w:.5,h:.32,d:.42},Lg=class{world;group=new va;staticMesh=null;shelvesBuilt=-1;crateBody;crateTop;mat=new Zs({vertexColors:!0});crateSlots=[];coldSlots=[];coldBuilt=!1;m=new Wi;q=new xi;p=new U;s=new U(1,1,1);c=new G;officeWorkers=[];constructor(e){this.world=e;let t=new Hm().color(Z.crateWood);t.box(-Ig.w/2,0,-Ig.d/2,Ig.w/2,Ig.h,Ig.d/2),t.color(9333314),t.box(-Ig.w/2-.005,.12,-Ig.d/2-.005,Ig.w/2+.005,.17,Ig.d/2+.005);let n=new Hm().color(16777215);n.box(-Ig.w/2+.04,0,-Ig.d/2+.04,Ig.w/2-.04,.07,Ig.d/2-.04);let r=e.warehouse.shelfSlots.length*Xt.cratesPerShelf+12;this.crateBody=new Ss(t.build(),this.mat,r),this.crateTop=new Ss(n.build(),new Zs({color:16777215}),r);for(let e of[this.crateBody,this.crateTop])e.instanceMatrix.setUsage(Pr),e.castShadow=!0,e.receiveShadow=!0,e.frustumCulled=!1,e.count=0,this.group.add(e);this.crateTop.setColorAt(0,this.c.setHex(16777215))}sync(e,t=!1){if(e===this.shelvesBuilt&&t===this.coldBuilt)return;this.shelvesBuilt=e,this.coldBuilt=t,this.coldSlots=[],this.staticMesh&&(this.group.remove(this.staticMesh),this.staticMesh.geometry.dispose());let n=this.world,r=n.warehouse,i=r.hall,a=new Hm;this.crateSlots=[],this.officeWorkers=[];let o=i.x,s=i.y,c=i.x+i.w,l=i.y+i.h;a.color(Z.whFloor),a.box(o,0,s,c,Ng,l),a.color(14266684);let u=.10300000000000001,d=r.doorX-2,f=r.doorX+r.doorWidth+2;for(let e=d;e<f;e+=.5)a.flat(e,l-2.6,e+.22,l-2.5,u);a.flat(d,l-2.6,d+.08,l-.15,u),a.flat(f-.08,l-2.6,f,l-.15,u),a.color(15198694);for(let e of[34.4,37.4])a.flat(o+.3,e,c-.3,e+.06,u);let p=(e,t,n,r)=>{a.color(Z.whWall),a.box(e,Ng,t,n,Pg,r),a.color(Z.whWallTop),a.box(e-.01,Pg,t-.01,n+.01,1.1500000000000001,r+.01)};p(o,s,c,s+Fg),p(o,s,o+Fg,l),p(c-Fg,s,c,l),p(o,l-Fg,r.doorX,l),p(r.doorX+r.doorWidth,l-Fg,c,l),a.color(6975864),a.box(r.doorX-.08,Ng,l-Fg,r.doorX,1.6,l),a.box(r.doorX+r.doorWidth,Ng,l-Fg,r.doorX+r.doorWidth+.08,1.6,l),a.box(r.doorX-.08,1.5,l-Fg,r.doorX+r.doorWidth+.08,1.62,l);let m=r.office;a.color(Z.whOffice),a.flat(m.x+Fg,m.y,m.x+m.w,m.y+m.h-Fg,.10400000000000001),a.color(Z.glass),a.box(m.x+Fg,Ng,m.y,m.x+m.w-1.2,.95,m.y+.05),a.box(m.x+m.w-.05,Ng,m.y,m.x+m.w,.95,m.y+m.h-Fg),a.color(Z.desk);let h=m.x+.7,g=m.y+1.4;a.box(h,.42,g,h+1.3,.48,g+.55),a.box(h+.05,Ng,g+.05,h+.12,.42,g+.5),a.box(h+1.18,Ng,g+.05,h+1.25,.42,g+.5),a.color(3093824),a.box(h+.5,.48,g+.08,h+.85,.72,g+.13),a.color(Z.chair),a.box(h+.5,.22,g+.65,h+.85,.28,g+.95),a.color(9410204),a.box(m.x+.25,Ng,m.y+m.h-.75,m.x+.75,.95,m.y+m.h-.3),a.color(8018492),a.cylinder(m.x+3.4,m.y+3.2,Ng,.4,.15,6),a.color(5212732),a.cone(m.x+3.4,m.y+3.2,.35,.95,.25,6),this.officeWorkers.push({x:h+.67,z:g+.8,ang:-Math.PI/2,moving:!1,phase:0,scale:.95,shirt:15262938,pants:4015186,skin:15120532,vest:0,tray:!1,trayColor:0});for(let t=0;t<r.shelfSlots.length;t++){let r=Gh(n,t);if(t<e)this.buildShelf(a,r.x,r.y);else{a.color(14266684);let e=.06,t=r.x+.15,n=r.y+.12,i=r.x+3-.15,o=r.y+.88;for(let r=t;r<i;r+=.36)a.flat(r,n,Math.min(i,r+.2),n+e,u),a.flat(r,o-e,Math.min(i,r+.2),o,u);a.flat(t,n,t+e,o,u),a.flat(i-e,n,i,o,u)}}let _=c-2.2,v=l-1.6;a.color(14725168),a.box(_-.35,.15,v-.5,_+.35,.65,v+.4),a.color(2830131),a.box(_-.3,.65,v-.15,_+.3,1.15,v+.35),a.box(_-.3,Ng,v-.62,_-.25,1.4,v-.55),a.box(_+.25,Ng,v-.62,_+.3,1.4,v-.55),a.color(5593438),a.box(_-.22,.12000000000000001,v-1.15,_-.14,.17,v-.55),a.box(_+.14,.12000000000000001,v-1.15,_+.22,.17,v-.55),a.color(2237994);for(let[e,t]of[[_-.36,v-.35],[_+.36,v-.35],[_-.36,v+.25],[_+.36,v+.25]])a.box(e-.05,0,t-.12,e+.05,.25,t+.12);t&&this.buildColdRoom(a),this.buildYard(a),this.staticMesh=new K(a.build(),this.mat),this.staticMesh.castShadow=!0,this.staticMesh.receiveShadow=!0,this.group.add(this.staticMesh)}buildShelf(e,t,n){let r=[.16,.62],i=n+.12,a=n+.88;e.color(Z.rack);for(let n of r)e.box(t+.1,n,i,t+3-.1,n+.04,a);for(let n of[t+.1,t+3/2-.03,t+3-.16])e.box(n,Ng,i,n+.06,1.15,i+.06),e.box(n,Ng,a-.06,n+.06,1.15,a);e.color(14249770),e.box(t+.1,1.12,i,t+3-.1,1.16,i+.04),e.box(t+.1,1.12,a-.04,t+3-.1,1.16,a);let o=Xt.cratesPerShelf/2;for(let e of r)for(let r=0;r<o;r++)this.crateSlots.push({x:t+.1+2.8/o*(r+.5),y:e+.04,z:n+.5})}buildColdRoom(e){let t=15.2,n=20.6,r=39.35,i=41.45;e.color(13624302),e.flat(t,r,n,i,.10400000000000001),e.color(15988471),e.box(t,Ng,r,n,1,39.43),e.box(t,Ng,r,15.28,1,i),e.box(20.520000000000003,Ng,r,n,1,i),e.box(t,Ng,41.370000000000005,16.8,1,i),e.box(17.8,Ng,41.370000000000005,n,1,i),e.color(4030389),e.box(15.19,1,39.34,20.610000000000003,1.06,41.46),e.color(10466495),e.box(15.5,.88,39.45,16.2,1,39.75);for(let e=0;e<2;e++)for(let t=0;t<6;t++)this.coldSlots.push({x:15.75+t*.82,y:.11+e*.33,z:39.800000000000004})}buildYard(e){let t=this.world.warehouse.yard,n=t.x,r=t.y,i=t.x+t.w,a=t.y+t.h;e.color(8224640),e.box(n,0,r,i,.09,a),e.color(15328991),e.flat(n+.4,r+.6,i-.4,r+.66,.093),e.color(Z.fence);let o=this.world.warehouse.yard.x+2.5,s=o+2,c=(t,n,r,i)=>{e.box(t,.09,n,r,.95,i)};c(n,r,i,r+.06),c(i-.06,r,i,a),c(n,r,n+.06,a),c(n,a-.06,o,a),c(s,a-.06,i,a),e.color(4869973),e.box(i-1.4,.09,r+.4,i-1.32,1.6,r+.48),e.box(i-.5,.09,r+.4,i-.42,1.6,r+.48),e.box(i-1.4,1.55,r+.4,i-.42,1.63,r+.48),e.color(8006692),e.cylinder(i-.91,r+.44,.55,1.4,.17,8),e.color(Z.wood),e.box(n+.4,.3,a-1,n+2,.36,a-.7),e.box(n+.5,.09,a-.95,n+.58,.3,a-.75),e.box(n+1.82,.09,a-.95,n+1.9,.3,a-.75),e.color(2500908),e.cylinder(i-.7,a-.8,.09,.3,.32,10),e.cylinder(i-.7,a-.8,.3,.5,.32,10)}updateCrates(e){let t=0,n=0,r=0;for(let i of e){let e=i.cooled&&r<this.coldSlots.length?this.coldSlots[r++]:this.crateSlots[n++];e&&(this.q.identity(),this.m.compose(this.p.set(e.x,e.y,e.z),this.q,this.s),this.crateBody.setMatrixAt(t,this.m),this.m.compose(this.p.set(e.x,e.y+Ig.h-.02,e.z),this.q,this.s),this.crateTop.setMatrixAt(t,this.m),this.crateTop.setColorAt(t,this.c.setHex(Mt[i.fruit].color).multiplyScalar(.45+.55*Math.max(0,i.fresh))),t++)}this.crateBody.count=t,this.crateTop.count=t,this.crateBody.instanceMatrix.needsUpdate=!0,this.crateTop.instanceMatrix.needsUpdate=!0,this.crateTop.instanceColor&&(this.crateTop.instanceColor.needsUpdate=!0)}nextShelfAnchor(e){if(e>=this.world.warehouse.shelfSlots.length)return null;let t=Gh(this.world,e);return{x:t.x+3/2,y:.9,z:t.y+.5}}},Rg=new U,zg=class{canvas;world;renderer;scene=new Ea;rig;sun;city;warehouse;figures;people;vehicles;overlays;overlayAlpha;selectRing;truck=Zm(`truck`);floaters;labels;raycaster=new el;ground=new ko(new U(0,1,0),0);fig={x:0,z:0,ang:0,moving:!1,phase:0,scale:1,shirt:0,pants:0,skin:0,vest:0,tray:!1,trayColor:0};selectedPedId=null;hints={dealerId:null,district:null,shelf:!1,labels:!0};lastState=null;lastAlpha=0;crateTimer=0;stats={drawCalls:0,triangles:0};constructor(e,t,n,r,i){this.canvas=e,this.world=t,this.renderer=new hf({canvas:e,antialias:!0,powerPreference:`high-performance`}),this.renderer.shadowMap.type=1,this.scene.background=new G(Z.sky),this.rig=new Cm(t.w,t.h),this.focusWarehouse(),this.scene.add(new xc(15003123,9076850,1.35)),this.sun=new Ic(16773856,2.3),this.sun.shadow.mapSize.set(an.shadowMapSize,an.shadowMapSize),this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.02,this.scene.add(this.sun,this.sun.target),this.city=bh(t),this.scene.add(this.city.group),this.warehouse=new Lg(t),this.scene.add(this.warehouse.group),this.figures=new Eh(1e3),this.scene.add(this.figures.group),this.people=new kg(t,96),this.scene.add(this.people.group),this.vehicles=new Mg(40),this.scene.add(this.vehicles.group),this.overlays=Sh(t),this.overlayAlpha=this.overlays.map(()=>-1);for(let e of this.overlays)this.scene.add(e);this.truck.visible=!1,this.scene.add(this.truck),this.selectRing=new K(new zs(.3,.38,24),new $o({color:3116878})),this.selectRing.rotation.x=-Math.PI/2,this.selectRing.visible=!1,this.scene.add(this.selectRing),this.floaters=new kh(r),this.labels=new Nh(i),this.applySettings(n)}focusWarehouse(){let e=this.world.warehouse;this.rig.lookAt(e.x+e.w/2-1,e.y+e.h/2+1)}applySettings(e){let t=window.devicePixelRatio||1,n=e.quality===`high`?an.maxPixelRatio:e.quality===`medium`?1.5:1;this.renderer.setPixelRatio(Math.min(t,n)),this.renderer.shadowMap.enabled=e.shadows,this.sun.castShadow=e.shadows,this.renderer.shadowMap.needsUpdate=!0,this.scene.traverse(e=>{let t=e.material;t&&!Array.isArray(t)&&(t.needsUpdate=!0)}),this.resize()}resize(){let e=this.canvas.clientWidth||window.innerWidth,t=this.canvas.clientHeight||window.innerHeight;this.renderer.setSize(e,t,!1),this.rig.setViewport(e,t)}updateSun(){let e=this.rig.target;this.sun.position.set(e.x-18,34,e.z+10),this.sun.target.position.set(e.x,0,e.z);let t=Math.max(this.rig.visibleWidth,this.rig.visibleHeight)*.75+6,n=this.sun.shadow.camera;n.right!==t&&(n.left=-t,n.right=t,n.top=t,n.bottom=-t,n.near=1,n.far=120,n.updateProjectionMatrix())}pedFigure(e,t,n){let r=this.fig;r.x=e.px+(e.x-e.px)*t,r.z=e.py+(e.y-e.py)*t,r.ang=e.ang,r.moving=e.mode!==1&&(e.x!==e.px||e.y!==e.py),r.phase=n*e.speed*7+e.id;let i=e.fade<1?e.fade*e.fade*(3-2*e.fade):1;return r.scale=(.92+e.look*7.3%1*.14)*i,r.shirt=Um[Math.floor(e.look*Um.length)%Um.length],r.pants=Wm[Math.floor(e.look*37)%Wm.length],r.skin=Gm[Math.floor(e.look*113)%Gm.length],r.vest=0,r.tray=!1,r}updateOverlays(e,t){for(let n=0;n<this.overlays.length;n++){let r=+(e.districts[n].owner===`gang`),i=this.overlayAlpha[n];i<0?i=r:i+=Math.sign(r-i)*Math.min(Math.abs(r-i),t*.7),this.overlayAlpha[n]=i;let a=this.overlays[n];a.visible=i>.001,a.material.opacity=.3*i;let o=a.children[0];o.material.opacity=.45*i}}updateTruck(e,t){let n=e.delivery;if(!n){this.truck.visible=!1;return}let r=this.world.warehouse,i=r.doorX+r.doorWidth/2+.6,a=r.doorY+2.5,o=n.t+t,s=i;if(n.phase===`arrive`){let e=Math.min(1,o/At(Pt.arriveSeconds));s=-6+(i+6)*(1-(1-e)*(1-e))}else if(n.phase===`leave`){let e=Math.min(1,o/At(Pt.leaveSeconds));s=i+24*e*e}this.truck.visible=!0,this.truck.position.set(s,0,a),this.truck.rotation.y=Math.PI/2}warehouseNote(e){if(e.delivery){let t=e.delivery;return t.phase===`arrive`?`Lieferung: ${t.total} Kisten`:`Lieferung: ${t.unloaded} von ${t.total} Kisten`}if(e.crates.length===0&&e.dealers.some(e=>e.mode===`idle`&&e.load.length===0))return`Lager leer: Lager antippen`;let t=null;for(let n of Tt){let r=ym(e,n);if(r.perDay<=0)continue;let i=Sm(e,r);i!==null&&(!t||i<t.at)&&(t={fruit:vf[n],at:i})}return t?`${t.fruit} reichen bis ${Math.floor(t.at)} Uhr`:null}noteTimer=0;noteText=null;labelStates=[];frame(e,t,n){this.lastState=e,this.lastAlpha=t,this.rig.update(n),this.updateSun(),this.warehouse.sync(e.shelves,e.coldRoom),this.crateTimer-=n,this.crateTimer<=0&&(this.crateTimer=.2,this.warehouse.updateCrates(e.crates)),this.updateTruck(e,t),this.updateOverlays(e,n);let r=(e.totalTicks+t)/10,i=this.figures;i.begin();for(let n of e.peds)i.add(this.pedFigure(n,t,r));for(let e of this.warehouse.officeWorkers)i.add(e);this.people.update(e,t,r,i),i.end(),this.vehicles.update(this.world,e.vehicles,t);let a=null,o=0,s=this.hints.dealerId===null?void 0:e.dealers.find(e=>e.id===this.hints.dealerId);if(s)a=s.px+(s.x-s.px)*t,o=s.py+(s.y-s.py)*t;else if(this.selectedPedId!==null){let n=e.peds.find(e=>e.id===this.selectedPedId);n&&(a=n.px+(n.x-n.px)*t,o=n.py+(n.y-n.py)*t)}a===null?this.selectRing.visible=!1:(this.selectRing.visible=!0,this.selectRing.position.set(a,.12,o)),this.renderer.render(this.scene,this.rig.camera);let c=this.renderer.info.render;this.stats.drawCalls=c.calls,this.stats.triangles=c.triangles;let l=(e,t,n,r)=>this.project(e,t,n,r);this.floaters.update(n,l),this.labelStates.length=e.districts.length;for(let t=0;t<e.districts.length;t++){let n=e.districts[t];this.labelStates[t]={owner:n.owner,gang:n.gang,attackable:Pf(e,this.world,t)}}let u=this.warehouse.nextShelfAnchor(e.shelves),d=Of(e),f=this.world.warehouse;this.noteTimer-=n,this.noteTimer<=0&&(this.noteTimer=.5,this.noteText=this.warehouseNote(e)),this.labels.update(l,this.labelStates,this.world.labels,this.hints.district,u?{...u,cost:d,affordable:e.money>=d,hint:this.hints.shelf}:null,this.noteText?{x:f.doorX+1,y:2.2,z:f.hall.y+f.hall.h-1,text:this.noteText,info:!!e.delivery}:null,this.hints.labels)}project(e,t,n,r){Rg.set(e,t,n).project(this.rig.camera);let i=this.canvas.getBoundingClientRect();r.x=i.left+(Rg.x+1)/2*i.width,r.y=i.top+(1-Rg.y)/2*i.height}groundAt(e,t){let n=this.canvas.getBoundingClientRect(),r=new H((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1);this.raycaster.setFromCamera(r,this.rig.camera);let i=new U;return this.raycaster.ray.intersectPlane(this.ground,i)?{x:i.x,y:i.z}:null}nearestDealer(e,t,n){let r=this.lastState;if(!r)return null;let i=this.lastAlpha,a={x:0,y:0},o=null,s=n*n;for(let n of r.dealers){this.project(n.px+(n.x-n.px)*i,.35,n.py+(n.y-n.py)*i,a);let r=(a.x-e)**2+(a.y-t)**2;r<s&&(s=r,o=n.id)}return o}nearestPed(e,t,n){let r=this.lastState;if(!r)return null;let i=this.lastAlpha,a={x:0,y:0},o=null,s=n*n;for(let n of r.peds){this.project(n.px+(n.x-n.px)*i,.35,n.py+(n.y-n.py)*i,a);let r=(a.x-e)**2+(a.y-t)**2;r<s&&(s=r,o=n.id)}return o}districtAt(e,t){let n=this.groundAt(e,t);if(!n)return null;let r=Math.floor(n.x),i=Math.floor(n.y);return r<0||i<0||r>=this.world.w||i>=this.world.h?null:this.world.district[i*this.world.w+r]}get drawCallsStatic(){return this.city.drawCallsStatic}},Bg=class{el;rig;cb;pointers=new Map;dragging=!1;pinchBase=0;lastTap={time:0,x:0,y:0};wheelAcc=0;multiTouch=!1;constructor(e,t,n){this.el=e,this.rig=t,this.cb=n,e.addEventListener(`pointerdown`,this.down),e.addEventListener(`pointermove`,this.move),e.addEventListener(`pointerup`,this.up),e.addEventListener(`pointercancel`,this.cancel),e.addEventListener(`wheel`,this.wheel,{passive:!1}),e.addEventListener(`contextmenu`,e=>e.preventDefault())}dispose(){this.el.removeEventListener(`pointerdown`,this.down),this.el.removeEventListener(`pointermove`,this.move),this.el.removeEventListener(`pointerup`,this.up),this.el.removeEventListener(`pointercancel`,this.cancel),this.el.removeEventListener(`wheel`,this.wheel)}down=e=>{this.el.setPointerCapture?.(e.pointerId),this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,startTime:performance.now()}),this.pointers.size===1&&(this.dragging=!1,this.multiTouch=!1),this.pointers.size===2&&(this.multiTouch=!0,this.pinchBase=this.pinchDistance())};pinchDistance(){let[e,t]=[...this.pointers.values()];return Math.hypot(e.x-t.x,e.y-t.y)}move=e=>{let t=this.pointers.get(e.pointerId);if(!t)return;let n=e.clientX-t.x,r=e.clientY-t.y;if(this.pointers.size===1)!this.dragging&&Math.hypot(e.clientX-t.startX,e.clientY-t.startY)>8&&(this.dragging=!0),this.dragging&&this.rig.panPixels(n,r);else if(this.pointers.size===2){this.rig.panPixels(n/2,r/2),t.x=e.clientX,t.y=e.clientY;let i=this.pinchDistance();if(this.pinchBase>0){let e=i/this.pinchBase;e>1.28?(this.rig.zoomStep(-1),this.pinchBase=i):e<1/1.28&&(this.rig.zoomStep(1),this.pinchBase=i)}return}t.x=e.clientX,t.y=e.clientY};up=e=>{let t=this.pointers.get(e.pointerId);if(this.pointers.delete(e.pointerId),t){if(this.pointers.size===0&&!this.dragging&&!this.multiTouch&&performance.now()-t.startTime<500){let t=performance.now();t-this.lastTap.time<320&&Math.hypot(e.clientX-this.lastTap.x,e.clientY-this.lastTap.y)<30?(this.lastTap.time=0,this.cb.onDoubleTap(e.clientX,e.clientY)):(this.lastTap={time:t,x:e.clientX,y:e.clientY},this.cb.onTap(e.clientX,e.clientY))}if(this.pointers.size===1){let e=[...this.pointers.values()][0];e.startX=e.x,e.startY=e.y}}};cancel=e=>{this.pointers.delete(e.pointerId)};wheel=e=>{for(e.preventDefault(),this.wheelAcc+=e.deltaY;this.wheelAcc>60;)this.rig.zoomStep(1),this.wheelAcc-=120;for(;this.wheelAcc<-60;)this.rig.zoomStep(-1),this.wheelAcc+=120;Math.abs(this.wheelAcc)<60&&(this.wheelAcc*=.5)}};function Vg(e){return new Promise((t,n)=>{e.oncomplete=e.onsuccess=()=>t(e.result),e.onabort=e.onerror=()=>n(e.error)})}function Hg(e,t){let n,r=()=>{if(n)return n;let r=indexedDB.open(e);return r.onupgradeneeded=()=>r.result.createObjectStore(t),n=Vg(r),n.then(e=>{e.onclose=()=>n=void 0},()=>{n=void 0}),n};return(e,n)=>r().then(r=>n(r.transaction(t,e).objectStore(t)))}var Ug;function Wg(){return Ug||=Hg(`keyval-store`,`keyval`),Ug}function Gg(e,t=Wg()){return t(`readonly`,t=>Vg(t.get(e)))}function Kg(e,t,n=Wg()){return n(`readwrite`,n=>(n.put(t,e),Vg(n.transaction)))}function qg(e,t=Wg()){return t(`readwrite`,t=>(t.delete(e),Vg(t.transaction)))}var Jg=`ambientRng`,Yg=[1,0,0,1,-1,0,0,-1];function Xg(e,t,n){let r=e.tiles[t];return r===Y.SIDEWALK||r===Y.CROSSWALK||r===Y.PLAZA||n&&r===Y.GREEN}function Zg(e,t){let n=z[t],r=Gt[n],i=Math.min(dm(e),Et.dayEndHour-.01),a=Math.max(tn.minPedestrianFraction,hm(n,i)/gm(n));return Math.round(tn.maxPedestrians*r.pedestrianShare*Math.min(1,a))}function Qg(e,t,n,r){let i=t.w,a=n%i+.5,o=(n/i|0)+.5,s={id:e.nextId++,x:a,y:o,px:a,py:o,from:n,to:n,t:1,speed:Uf(e,tn.pedSpeedMin,tn.pedSpeedMax,Jg),ang:Hf(e,Jg)*Math.PI*2,look:Hf(e,Jg),mode:0,timer:0,fade:+!r,leaving:!1,path:null,pathIdx:0};return e.peds.push(s),s}function $g(e,t,n){let r=t.w,i=n.to,a=i%r,o=i/r|0,s=t.tiles[i]===Y.GREEN,c=t.tiles[i]===Y.CROSSWALK,l=n.from,u=a-l%r,d=o-(l/r|0),f=s||Hf(e,Jg)<tn.pedGreenChance,p=-1,m=-1,h=0,g=e_;for(let e=0;e<4;e++){let n=Yg[e*2],i=Yg[e*2+1],s=a+n,c=o+i;if(s<0||c<0||s>=r||c>=t.h)continue;let l=c*r+s;Xg(t,l,f)&&(n===-u&&i===-d&&(u!==0||d!==0)?m=l:(n===u&&i===d&&(p=l),g[h++]=l))}return c&&p>=0||p>=0&&Hf(e,Jg)>tn.pedTurnChance?p:h>0?g[Math.floor(Hf(e,Jg)*h)]:m>=0?m:i}var e_=new Int32Array(4);function t_(e,t,n){let r=t.w;n.px=n.x,n.py=n.y;let i=1/At(tn.pedFadeSeconds);if(n.leaving?n.fade=Math.max(0,n.fade-i):n.fade<1&&(n.fade=Math.min(1,n.fade+i)),n.mode===1){--n.timer<=0&&(n.mode=0);return}let a=n.speed/Et.ticksPerSecond,o=n.from%r+.5,s=(n.from/r|0)+.5,c=n.to%r+.5,l=(n.to/r|0)+.5,u=Math.hypot(c-o,l-s)||1;if(n.t+=a/u,n.t>=1){if(--n.t,n.from=n.to,n.mode===2&&n.path){if(n.pathIdx++,n.pathIdx>=n.path.length){n.mode=1,n.timer=At(tn.customerStandSeconds),n.path=null,n.t=1,n.x=n.from%r+.5,n.y=(n.from/r|0)+.5;return}n.to=n.path[n.pathIdx]}else n.to=$g(e,t,n);n.to===n.from&&(n.t=1)}let d=n.from%r+.5,f=(n.from/r|0)+.5,p=n.to%r+.5,m=(n.to/r|0)+.5,h=Math.min(1,n.t);n.x=d+(p-d)*h,n.y=f+(m-f)*h,(p!==d||m!==f)&&(n.ang=Math.atan2(m-f,p-d))}function n_(e,t){return e.district[t.to]}var r_=new Int32Array(z.length);function i_(e,t,n){r_.fill(0);for(let n of e.peds)n.leaving||r_[n_(t,n)]++;for(let r=0;r<z.length;r++){let i=Zg(e,r),a=t.footTilesByDistrict[r],o=i-r_[r],s=n?1e3:2,c=0;for(;o>0&&c<s&&a.length;){let r=a[Math.floor(Hf(e,Jg)*a.length)];Qg(e,t,r,!n),o--,c++}if(o<0)for(let n of e.peds){if(c>=s||o>=0)break;n.leaving||n.mode!==0||n_(t,n)!==r||(n.leaving=!0,o++,c++)}}}function a_(e,t){if(e.peds.length=0,e.vehicles.length=0,e.ambient){i_(e,t,!0);for(let n=0;n<tn.cars;n++){let r=n%t.carRoutes.length;e.vehicles.push({id:e.nextId++,kind:`car`,route:r,s:Hf(e,Jg)*t.carRoutes[r].length,ps:0,speed:tn.carSpeed*Uf(e,.85,1.15,Jg),color:Math.floor(Hf(e,Jg)*8),wait:0,nextStop:0})}for(let n=0;n<tn.buses&&t.busRoutes.length;n++){let r=t.busRoutes[0];e.vehicles.push({id:e.nextId++,kind:`bus`,route:0,s:r.length/tn.buses*n,ps:0,speed:tn.busSpeed,color:0,wait:0,nextStop:0})}for(let n of e.vehicles)n.ps=n.s,n.kind===`bus`&&(n.nextStop=s_(t,n.route,n.s))}}function o_(e,t){if(!e.ambient)return;--e.ambientTimer<=0&&(e.ambientTimer=At(tn.populationCheckSeconds),i_(e,t,!1));let n=e.peds;for(let r=0;r<n.length;r++)t_(e,t,n[r]);for(let e=n.length-1;e>=0;e--)n[e].leaving&&n[e].fade<=0&&(n[e]=n[n.length-1],n.pop());for(let n of e.vehicles)n.ps=n.s,n.wait>0?n.wait--:(n.s+=n.speed/Et.ticksPerSecond,n.kind===`bus`&&n.s>=n.nextStop&&(n.s=n.nextStop,n.wait=At(3),n.nextStop=s_(t,n.route,n.s+.01)))}function s_(e,t,n){let r=e.busRoutes[t];if(!r.stops.length)return 1/0;let i=Math.floor(n/r.length)*r.length,a=n-i,o=1/0;for(let e of r.stops){let t=e>=a?i+e:i+r.length+e;t<o&&(o=t)}return o}function c_(e,t,n){if(!e.ambient)return;let r=t.w,i=n%r+.5,a=(n/r|0)+.5,o=-1,s=Math.floor(Hf(e,Jg)*8);for(let e=0;e<8&&o<0;e++){let i=(s+e)%8,a=[1,1,0,-1,-1,-1,0,1][i],c=[0,1,1,1,0,-1,-1,-1][i],l=n%r+a,u=(n/r|0)+c;if(l<0||u<0||l>=r||u>=t.h)continue;let d=u*r+l;Xg(t,d,!1)&&(o=d)}if(o<0)return;let c=null,l=tn.customerSearchRadius*tn.customerSearchRadius;for(let t of e.peds){if(t.mode!==0||t.leaving||t.fade<1)continue;let e=(t.x-i)**2+(t.y-a)**2;e<l&&(l=e,c=t)}if(c){let e=Rh(t,c.to,o,`foot`);if(e&&e.length>1){c.mode=2,c.path=e,c.pathIdx=1,c.from=e[0],c.to=e[1],c.t=0;return}}let u=Qg(e,t,o,!0);u.mode=1,u.timer=At(tn.customerStandSeconds),u.ang=Math.atan2(a-u.y,i-u.x)}function l_(e,t={}){let n=t.seed??20261114,r={version:5,seed:n,rng:Gf(n),ambientRng:Gf(n*31+7),day:0,dayTick:0,totalTicks:0,nextId:1,ambient:t.ambient??!0,peds:[],vehicles:[],ambientTimer:0,queue:[],messages:[],money:jt.money,earnedTotal:0,earnedToday:0,history:[],crates:[],shelves:jt.shelves,coldRoom:!1,delivery:null,backlog:[],kioskToday:0,soldToday:Kf(),salesDays:[],availToday:Kf(),districtSold:z.map(()=>Kf()),salesQuality:Wt.base,spentToday:0,spoiledToday:0,dealers:[],fighters:jt.fighters,upgrade:0,districts:z.map(e=>e===jt.district?{owner:`player`,gang:0}:{owner:`gang`,gang:Gt[e].garrison}),battle:null,farms:hp(),pending:[],heat:0,heatDay:-99,story:0,won:!1,stats:{cratesBought:0,contracts:0,actions:0,pressureActions:0,dirtyActions:0,sold:0,battlesWon:0,battlesLost:0,fightersLost:0,gangDefeated:0}};for(let t=0;t<jt.dealers;t++)cg(r,e);for(let e of Nt.startCrates)for(let t=0;t<e.crates;t++)r.crates.push({id:r.nextId++,fruit:e.fruit,fresh:1,quality:2,cooled:!1});return a_(r,e),r}var u_=`obst-tycoon-save`,d_=class extends Error{};function f_(e){let t=zm(),n=l_(t,{seed:typeof e.seed==`number`?e.seed:1,ambient:e.ambient!==!1});typeof e.day==`number`&&e.day>=0&&(n.day=Math.floor(e.day)),typeof e.money==`number`&&Number.isFinite(e.money)&&(n.money=Math.max(jt.money,Math.round(e.money)));let r=Array.isArray(e.staff)?e.staff.length:0;for(;n.dealers.length<Math.min(r,Lf(n,t));)cg(n,t);return n}function p_(e){let t=e;t.crates=(t.crates??[]).map(e=>({id:e.id,fruit:e.fruit,fresh:1,quality:2,cooled:!1}));for(let e of t.dealers??[])e.load=(e.load??[]).map(e=>({...e,fresh:1,quality:2}));return t.coldRoom=!1,t.delivery=null,t.backlog=[],t.orders=Kf(),t.kioskToday=0,t.soldToday=Kf(),t.salesDays=[],t.availToday=Kf(),t.districtSold=z.map(()=>Kf()),t.salesQuality=Wt.base,t.spentToday=0,t.spoiledToday=0,t.story=0,e}function m_(e){let t=e;return delete t.orders,t.farms=hp(),t.pending=[],t.heat=0,t.heatDay=-99,t.backlog=[],t.delivery=null,t.stats=Object.assign({contracts:0,actions:0,pressureActions:0,dirtyActions:0},t.stats??{}),t.story=0,e}var h_={1:e=>e,2:f_,3:p_,4:m_};function g_(e,t){let n={format:u_,version:5,savedAt:new Date().toISOString(),label:t,state:{...e,version:5}};return JSON.stringify(n)}function __(e,t){let n=t,r=e;for(;n<5;){let e=h_[n];if(!e)throw new d_(`Keine Migration von Version ${n} vorhanden.`);try{r=e(r)}catch{throw new d_(`Der Spielstand ist beschädigt (Migration von Version ${n}).`)}n++,r.version=n}return r}function v_(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function y_(e){let t;try{t=JSON.parse(e)}catch{throw new d_(`Die Datei ist kein gültiges JSON.`)}if(!v_(t)||t.format!==`obst-tycoon-save`)throw new d_(`Die Datei ist kein Spielstand von Obst-Tycoon.`);let n=t.version;if(typeof n!=`number`||!Number.isInteger(n)||n<1)throw new d_(`Die Versionsnummer fehlt oder ist ungültig.`);if(n>5)throw new d_(`Der Spielstand stammt aus einer neueren Version des Spiels.`);if(!v_(t.state))throw new d_(`Der Spielstand enthält keine Spieldaten.`);let r=__(t.state,n);return b_(r),{format:u_,version:5,savedAt:typeof t.savedAt==`string`?t.savedAt:``,label:typeof t.label==`string`?t.label:``,state:r}}function b_(e){let t=e=>{throw new d_(`Der Spielstand ist beschädigt (${e}).`)};(typeof e.day!=`number`||e.day<0)&&t(`Tag`),typeof e.dayTick!=`number`&&t(`Uhrzeit`),(typeof e.rng!=`number`||typeof e.ambientRng!=`number`)&&t(`Zufallsgenerator`),Array.isArray(e.peds)&&Array.isArray(e.vehicles)||t(`Passanten`),Array.isArray(e.queue)||(e.queue=[]),Array.isArray(e.messages)||(e.messages=[]),typeof e.money==`number`&&Number.isFinite(e.money)||t(`Kontostand`),Array.isArray(e.dealers)&&Array.isArray(e.crates)&&Array.isArray(e.districts)||t(`Verkäufer oder Lager`),(typeof e.shelves!=`number`||typeof e.fighters!=`number`)&&t(`Lager oder Kämpfer`),e.stats||t(`Statistik`),Array.isArray(e.history)||(e.history=[]),e.soldToday&&e.availToday&&Array.isArray(e.districtSold)&&Array.isArray(e.salesDays)||t(`Lager`),Array.isArray(e.farms)&&Array.isArray(e.pending)&&typeof e.heat==`number`||t(`Höfe`)}var x_=[`auto`,...Array.from({length:nn.slots},(e,t)=>`slot${t+1}`)];function S_(e){return e===`auto`?`Autosave`:`Speicherplatz ${e.slice(4)}`}var C_=null;function w_(){return C_||=Hg(`obst-tycoon`,`saves`),C_}function T_(e){return`Tag ${e.day+1}, ${fm(e)}, ${Math.round(e.money)} €`}async function E_(e,t){await Kg(e,g_(t,T_(t)),w_())}async function D_(e){let t=await Gg(e,w_());return t?y_(t):null}async function O_(e){await qg(e,w_())}async function k_(){let e=[];for(let t of x_)try{let n=await Gg(t,w_());if(!n){e.push(null);continue}let r=JSON.parse(n);e.push({slot:t,label:r.label??``,savedAt:r.savedAt??``})}catch{e.push(null)}return e}function A_(e){let t=g_(e,T_(e)),n=new Blob([t],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=`obst-tycoon-tag-${e.day+1}.json`,document.body.appendChild(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}function j_(){return new Promise((e,t)=>{let n=document.createElement(`input`);n.type=`file`,n.accept=`.json,application/json`,n.onchange=()=>{let r=n.files?.[0];if(!r)return e(null);r.text().then(t=>e(y_(t))).catch(t)},n.click()})}function M_(e){return 1+Math.floor(Hf(e)*6)}function N_(e,t){let n=0,r=0,i=Math.min(e.length,t.length);for(let a=0;a<i;a++)e[a]>t[a]?r++:n++;return{attackerLoss:n,defenderLoss:r}}function P_(e,t,n){if(e.battle&&e.battle.result===`running`)return`Es läuft bereits ein Kampf.`;if(!Pf(e,t,n))return`Dieses Viertel grenzt nicht an dein Gebiet.`;if(e.fighters<1)return`Du brauchst Straßenkämpfer für einen Angriff.`;let r=e.districts[n].gang;return e.battle={district:n,attackers:e.fighters,defenders:r,startAttackers:e.fighters,startDefenders:r,rounds:0,last:null,result:`running`},e.fighters=0,null}function F_(e,t,n){let r=e.battle;if(!r||r.result!==`running`)return null;let i=[],a=[];for(let t=0;t<Math.min(Qt.attackerDice,r.attackers);t++)i.push(M_(e));for(let t=0;t<Math.min(Qt.defenderDice,r.defenders);t++)a.push(M_(e));i.sort((e,t)=>t-e),a.sort((e,t)=>t-e);let{attackerLoss:o,defenderLoss:s}=N_(i,a);return r.attackers-=o,r.defenders-=s,r.rounds++,r.last={attacker:i,defender:a,attackerLoss:o,defenderLoss:s},e.stats.fightersLost+=o,e.stats.gangDefeated+=s,r.defenders<=0?R_(e,t,`won`,n):r.attackers<=0&&R_(e,t,`lost`,n),r.last}function I_(e,t,n){for(let r=0;r<Qt.maxAutoRounds&&e.battle?.result===`running`;r++)F_(e,t,n)}function L_(e,t,n){e.battle?.result===`running`&&R_(e,t,`retreated`,n)}function R_(e,t,n,r){let i=e.battle;i.result=n;let a=yf[z[i.district]],[o,s]=t.labels[i.district];n===`won`?(e.districts[i.district]={owner:`player`,gang:0},e.fighters+=i.attackers,e.stats.battlesWon++,r(e,`unlock`,`${a} erobert. Deine Verkäufer finden dort neue Plätze.`,o,s),z[i.district]===`banking`&&(e.won=!0)):(e.districts[i.district].gang=Math.max(0,i.defenders),e.fighters+=Math.max(0,i.attackers),n===`lost`?(e.stats.battlesLost++,r(e,`danger`,`Angriff auf ${a} gescheitert. Die Gang hat noch ${i.defenders} Kämpfer.`,o,s)):r(e,`info`,`Rückzug aus ${a}. ${i.attackers} Kämpfer kehren in den Hof zurück.`,o,s))}function z_(e,t){e.queue.push(t)}function B_(e,t,n,r,i){e.messages.push({id:e.nextId++,day:e.day,dayTick:e.dayTick,kind:t,text:n,x:r,y:i}),e.messages.length>60&&e.messages.splice(0,e.messages.length-60)}function V_(e,t){B_(e,`warning`,t)}function H_(e,t){return e.money<t?(V_(e,`Dafür fehlen noch ${Math.ceil(t-e.money)} €.`),!1):(e.money-=t,e.spentToday+=t,!0)}function U_(e,t,n,r=()=>{}){switch(n.type){case`kioskBuy`:if(!If(e,n.fruit))return V_(e,`${vf[n.fruit]} hat nur die Gemüsegang. Der Kiosk kommt nicht ran.`);if(e.kioskToday>=Nt.kioskPerDay)return V_(e,`Der Kiosk gibt höchstens ${Nt.kioskPerDay} Kisten pro Tag ab.`);if(Af(e)<=e.crates.length)return V_(e,`Das Lager ist voll. Tippe auf das Plus im Lager, um ein Regal dazuzukaufen.`);if(!H_(e,Mt[n.fruit].crateCost*Nt.kioskFactor))return;$f(e,n.fruit,2),e.kioskToday++,Zf(e);break;case`offerContract`:if(!e.farms[n.farm])return;Fp(e,n.farm,n.offer,B_,r);break;case`renewContract`:if(!e.farms[n.farm])return;Lp(e,n.farm,B_,r);break;case`cancelContract`:if(!e.farms[n.farm])return;Rp(e,n.farm,B_);break;case`farmAction`:if(!e.farms[n.farm])return;Qp(e,n.farm,n.action,B_,r);break;case`withdrawGuards`:if(!e.farms[n.farm])return;em(e,n.farm);break;case`answerEvent`:am(e,n.id,n.choice,B_,r);break;case`buyColdRoom`:if(e.coldRoom||!H_(e,Nt.coldRoomCost))return;e.coldRoom=!0,Zf(e),r(`build`),B_(e,`info`,`Kühlraum gebaut: ${Nt.coldRoomCrates} Kisten bleiben doppelt so lange frisch.`);break;case`hireDealer`:if(e.dealers.length>=Lf(e,t))return V_(e,`Alle Verkaufsplätze sind besetzt. Erobere ein neues Viertel.`);if(!H_(e,Df(e)))return;B_(e,`info`,`${cg(e,t).name} verkauft jetzt für dich.`);break;case`buyShelf`:if(e.shelves>=jf(t))return V_(e,`Das Lager ist voll ausgebaut.`);if(!H_(e,Of(e)))return;e.shelves++,r(`build`);break;case`hireFighter`:{let t=Math.max(1,Math.floor(n.count??1));for(let n=0;n<t;n++){if(e.fighters>=Zt.max)return V_(e,`Der Hof ist voll.`);if(!H_(e,kf(e)))return;e.fighters++}break}case`buyUpgrade`:{let t=Bf(e);if(!t)return;if(e.districts[z.indexOf(t.unlock)].owner!==`player`)return V_(e,`Diese Ausrüstung gibt es erst nach der nächsten Eroberung.`);if(!H_(e,t.cost))return;e.upgrade++,B_(e,`unlock`,`${bf[t.id]} gekauft: Jeder Verkäufer trägt jetzt ${t.crates} Kisten.`);break}case`attack`:{let r=P_(e,t,n.district);r&&V_(e,r);break}case`battleRoll`:F_(e,t,B_);break;case`battleAuto`:I_(e,t,B_);break;case`battleRetreat`:L_(e,t,B_);break;case`battleClose`:e.battle&&e.battle.result!==`running`&&(e.battle=null);break;case`debugMoney`:e.money+=n.amount;break;case`debugConquer`:e.districts[n.district]&&(e.districts[n.district]={owner:`player`,gang:0})}}var W_=(e,t)=>Mf(e,Nf(t));function G_(e){return Tt.filter(t=>e.farms.some(n=>Ep(n,e.day)&&(n.contract.crates[t]??0)>0)).length}var K_=[{title:`Erster Vertrag`,text:`Ohne Bauern kein Obst. Tippe unten auf Höfe, wähle Hof Brinkmann und biete ihm einen Vertrag an.`,hint:`farm`,farm:0,done:e=>e.stats.contracts>0||G_(e)>0},{title:`Erster Umsatz`,text:`Dein Verkäufer holt die Kisten selbst und sucht sich einen Platz. Verdiene ${en.firstEarnings} €.`,hint:`none`,done:e=>e.earnedTotal>=en.firstEarnings},{title:`Lagerampel`,text:`Bring die Lagerampel oben auf Grün: Bestand und Lieferungen sollen anderthalb Tage reichen.`,hint:`stock`,done:e=>e.day>=1&&xm(e).ampel===`green`},{title:`Verstärkung`,text:`Heuere einen zweiten Verkäufer an: Tippe unten auf Leute.`,hint:`people`,done:e=>e.dealers.length>=en.dealers},{title:`Mehr Platz`,text:`Tippe im Lager auf das Plus über dem freien Regalplatz.`,hint:`shelf`,done:e=>e.shelves>=en.shelves},{title:`Gemischte Ware`,text:`Jedes Viertel kauft je Sorte nur eine begrenzte Menge. Schließe einen Vertrag für eine zweite Sorte, etwa Bananen bei Kessler.`,hint:`farm`,farm:2,done:e=>G_(e)>=en.fruits},{title:`Eigene Leute`,text:`Stelle ${en.fighters} Straßenkämpfer zusammen. Sie warten im Hof neben dem Lager.`,hint:`people`,done:e=>e.fighters>=en.fighters||e.stats.battlesWon>0},{title:`Erster Druck`,text:`Ein Bauer, der dich fürchtet, liefert billiger: Biete einem Hof Schutz an oder wirb Helfer ab. Die Ermittler sehen zu. Wer sauber bleiben will, zahlt einen Vorschuss.`,hint:`farm`,done:e=>e.stats.actions>0},{title:`Raus aus dem Untergrund`,text:`Erobere das Bahnhofsviertel: Tippe auf das rote Schild und greife an.`,hint:`district`,district:Nf(`station`),done:e=>W_(e,`station`)},{title:`Mitten in der Stadt`,text:`Erobere die Altstadt.`,hint:`district`,district:Nf(`oldtown`),done:e=>W_(e,`oldtown`)},{title:`Neue Kundschaft`,text:`Erobere die Einkaufsmeile oder das Szeneviertel.`,hint:`district`,done:e=>W_(e,`shopping`)||W_(e,`scene`)},{title:`Ganz oben`,text:`Erobere das Bankenviertel. Dort zahlen sie für Drachenfrüchte jeden Preis, aber die wachsen nur im Glashaus der Gang.`,hint:`district`,district:Nf(`banking`),done:e=>W_(e,`banking`)},{title:`Die ganze Stadt`,text:`Erobere die übrigen Viertel.`,hint:`district`,done:e=>z.every((t,n)=>Mf(e,n))}];function q_(e,t){for(;e.story<K_.length&&K_[e.story].done(e);){let n=$t[e.story]??0;e.money+=n,t(e,`story`,`Auftrag erledigt: ${K_[e.story].title}. Belohnung ${n} €.`),e.story++}}function J_(){return{dayEnded:!1,sales:[],delivery:{arrived:!1,unloaded:0},cues:[]}}function Y_(e){lm(e,sm(e))}function X_(e,t){for(;e.delivery;)um(e,t.delivery,B_);let n=tp(e);e.spoiledToday+=n,e.history.push(Math.round(e.earnedToday)),e.history.length>14&&e.history.splice(0,e.history.length-14),e.salesDays.push(up(e)),e.salesDays.length>Nt.rangeDays&&e.salesDays.splice(0,e.salesDays.length-Nt.rangeDays);let r=e.spoiledToday>0?`, ${e.spoiledToday} ${e.spoiledToday===1?`Kiste`:`Kisten`} verdorben`:``;B_(e,`money`,`Tag ${e.day+1}: Einnahmen ${Math.round(e.earnedToday)} €, Ausgaben ${Math.round(e.spentToday)} €, Saldo ${Math.round(e.earnedToday-e.spentToday)} €${r}.`),e.earnedToday=0,e.spentToday=0,e.spoiledToday=0,e.kioskToday=0,e.soldToday=Kf(),e.availToday=Kf(),e.districtSold=z.map(()=>Kf());for(let t of e.dealers)t.soldToday=0,t.earnedToday=0;z.forEach((t,n)=>{let r=e.districts[n];r.owner===`gang`&&(r.gang=Math.min(Gt[t].garrison,r.gang+Gt[t].regenPerDay))}),e.day++,e.dayTick=0,t.dayEnded=!0,rm(e,B_,e=>t.cues.push(e)),Y_(e)}function Z_(e,t,n){e.dayTick++,e.totalTicks++,Yf(e),um(e,n.delivery,B_),e.totalTicks%50==0&&Zf(e),e.totalTicks%30==0&&lp(e,30),gg(e,t);let r=n.sales.length;if(Wh(e,t,n.sales),e.ambient)for(let i=r;i<n.sales.length;i++)c_(e,t,n.sales[i].spotTile);n.sales.length>200&&n.sales.splice(0,n.sales.length-200),e.totalTicks%5==0&&q_(e,B_),o_(e,t),e.dayTick>=kt&&X_(e,n)}function Q_(e,t,n,r){if(n.type===`debugSkipHours`){let i=Math.round(n.hours*Dt);for(let n=0;n<i&&!$_(e);n++)Z_(e,t,r)}else U_(e,t,n,e=>r.cues.push(e)),q_(e,B_)}function $_(e){return e.battle!==null}function ev(e,t,n){if(!e.queue.length)return;let r=e.queue.splice(0,e.queue.length);for(let i of r)Q_(e,t,i,n)}function tv(e,t,n){ev(e,t,n),$_(e)||Z_(e,t,n)}var nv=new Intl.NumberFormat(`de-DE`,{style:`currency`,currency:`EUR`,maximumFractionDigits:0}),rv=new Intl.NumberFormat(`de-DE`,{style:`currency`,currency:`EUR`,minimumFractionDigits:2,maximumFractionDigits:2}),iv=new Intl.NumberFormat(`de-DE`,{maximumFractionDigits:0}),av=new Intl.NumberFormat(`de-DE`,{maximumFractionDigits:1,minimumFractionDigits:1}),ov=new Intl.NumberFormat(`de-DE`,{style:`percent`,maximumFractionDigits:0}),sv=e=>nv.format(Math.round(e)),cv=e=>rv.format(e),lv=e=>iv.format(e),uv=e=>av.format(e),dv=e=>ov.format(e),fv=`obst-tycoon-settings`,pv=typeof window<`u`&&(navigator.maxTouchPoints>0||`ontouchstart`in window);function mv(){return{muted:!1,effectsVolume:.7,ambienceVolume:.4,shadows:!0,quality:pv?`medium`:`high`,saleNumbers:!0,autosaveSeconds:nn.autosaveSeconds,debug:!1,tutorial:!0}}function hv(){try{let e=localStorage.getItem(fv);if(e)return{...mv(),...JSON.parse(e)}}catch{}return mv()}var gv=Ye(hv());function _v(e){gv.value={...gv.value,...e};try{localStorage.setItem(fv,JSON.stringify(gv.value))}catch{}}var vv=Ye(0),yv=Ye(`menu`),bv=Ye(1),xv=Ye(null),Sv=Ye(!1),Q=Ye(null),Cv=Ye(null),wv=Ye(null),Tv=Ye(null),Ev=Ye(0),Dv=Ye(`overview`),Ov=Ye(`normal`),kv=Ye(null),Av=Ye(!1),jv=Ye(null),Mv=0;function Nv(e){let t=++Mv;jv.value={text:e,id:t},setTimeout(()=>{jv.value?.id===t&&(jv.value=null)},5e3)}var Pv=Ye([]),Fv=0;function Iv(e,t=`info`){let n=++Fv;xv.value={text:e,kind:t,id:n},setTimeout(()=>{xv.value?.id===n&&(xv.value=null)},3200)}var Lv={build:`build`,contract:`stamp`,good:`good`,bad:`bad`,dirty:`dirty`,alarm:`alarm`},Rv=class{canvas;world;view;state;out=J_();acc=0;lastTime=0;uiTimer=0;autosaveTimer=0;raf=0;keys=new Set;hiddenSpeed=null;input;lastMessageId=0;lastStory=-1;lastAmpel=null;audioActive=!0;fps=0;tps=0;fpsFrames=0;fpsTime=0;tickCount=0;demo=!1;keyHook=null;constructor(e,t){this.canvas=e,this.world=zm(),this.state=t;let n=gv.value;this.view=new zg(e,this.world,{shadows:n.shadows,quality:n.quality},document.getElementById(`floaters`)??document.body,document.getElementById(`labels`)??document.body),this.view.labels.handlers={onDistrict:e=>this.openDistrict(e),onShelf:()=>this.command({type:`buyShelf`}),onWarehouse:()=>Q.value=`stock`},this.input=new Bg(e,this.view.rig,{onTap:(e,t)=>this.onTap(e,t),onDoubleTap:(e,t)=>this.onDoubleTap(e,t)}),window.addEventListener(`resize`,this.onResize),window.addEventListener(`keydown`,this.onKeyDown),window.addEventListener(`keyup`,this.onKeyUp),window.addEventListener(`blur`,this.onBlur),document.addEventListener(`visibilitychange`,this.onVisibility),window.addEventListener(`pagehide`,this.onPageHide),this.lastTime=performance.now(),this.raf=requestAnimationFrame(this.loop)}dispose(){cancelAnimationFrame(this.raf),this.input.dispose(),window.removeEventListener(`resize`,this.onResize),window.removeEventListener(`keydown`,this.onKeyDown),window.removeEventListener(`keyup`,this.onKeyUp),window.removeEventListener(`blur`,this.onBlur),document.removeEventListener(`visibilitychange`,this.onVisibility),window.removeEventListener(`pagehide`,this.onPageHide),this.view.renderer.dispose()}load(e,t){this.state=e,this.demo=t,this.acc=0,this.autosaveTimer=0,this.view.selectedPedId=null,this.view.rig.follow=null,this.view.focusWarehouse(),this.view.floaters.clear(),this.lastMessageId=e.messages.length?e.messages[e.messages.length-1].id:0,this.lastStory=e.story,this.lastAmpel=xm(e).ampel,wv.value=null,Cv.value=null,Q.value=null,Pv.value=[]}applySettings(e){this.view.applySettings({shadows:e.shadows,quality:e.quality})}command(e){z_(this.state,e),ev(this.state,this.world,this.out),this.pollMessages(),vv.value++}setSpeed(e){bv.value=Math.max(0,Math.min(Et.speeds.length-1,e))}togglePause(){bv.value===0?this.setSpeed(this.lastSpeed||1):(this.lastSpeed=bv.value,this.setSpeed(0))}lastSpeed=1;autosave(){this.demo||E_(`auto`,this.state).catch(()=>{})}openDistrict(e){this.state.districts[e]?.owner===`gang`&&(Cv.value=e,Q.value=`attack`,wv.value=null)}focus(e,t){this.view.rig.follow=null,this.view.rig.lookAt(e,t)}followDealer(e){this.view.rig.follow=()=>{let t=this.state.dealers.find(t=>t.id===e);return t?{x:t.x,y:t.y}:null}}pollMessages(){let e=this.state.messages;if(!e.length||e[e.length-1].id<=this.lastMessageId)return;let t=e.filter(e=>e.id>this.lastMessageId);if(this.lastMessageId=e[e.length-1].id,this.demo)return;let n=performance.now(),r=t.map(e=>({id:e.id,kind:e.kind,text:e.text,x:e.x,y:e.y,time:n}));Pv.value=[...Pv.value,...r].slice(-3)}onStoryChange(){let e=K_[this.state.story];if(e&&!this.demo&&(e.hint===`shelf`&&this.view.focusWarehouse(),e.hint===`district`&&e.district!==void 0)){let[t,n]=this.world.labels[e.district];this.focus(t,n+6)}}updateAudio(e,t){let n=!document.hidden&&(e||t>0||$_(this.state));if(n!==this.audioActive&&(this.audioActive=n,wt.setActive(n)),wt.ambience(dm(this.state),this.state.peds.length/tn.maxPedestrians,t),e||this.demo)return;let r=xm(this.state).ampel;r===`red`&&this.lastAmpel!==null&&this.lastAmpel!==`red`&&wt.play(`warn`),this.lastAmpel=r}onResize=()=>this.view.resize();onVisibility=()=>{document.hidden?(this.audioActive=!1,wt.setActive(!1),this.autosave(),this.hiddenSpeed===null&&(this.hiddenSpeed=bv.value,this.setSpeed(0))):this.hiddenSpeed!==null&&(this.setSpeed(this.hiddenSpeed),this.hiddenSpeed=null,this.lastTime=performance.now(),this.acc=0)};onPageHide=()=>this.autosave();onBlur=()=>this.keys.clear();onKeyDown=e=>{if(yv.value!==`game`)return;let t=e.target;if(!t||t.tagName!==`INPUT`&&t.tagName!==`TEXTAREA`&&t.tagName!==`SELECT`){switch(this.keys.add(e.code),e.code){case`Space`:e.preventDefault(),this.togglePause();break;case`Digit1`:this.setSpeed(1);break;case`Digit2`:this.setSpeed(2);break;case`Digit3`:this.setSpeed(3);break;case`KeyQ`:this.view.rig.rotate(-1);break;case`KeyE`:this.view.rig.rotate(1);break;case`F3`:e.preventDefault(),gv.value={...gv.value,debug:!gv.value.debug}}this.keyHook?.(e)}};onKeyUp=e=>this.keys.delete(e.code);onTap(e,t){let n=this.view.nearestDealer(e,t,30);if(n!==null){wv.value=n,Q.value=null,this.view.selectedPedId=null;return}wv.value=null;let r=this.view.districtAt(e,t);if(r!==null&&this.state.districts[r].owner===`gang`){this.openDistrict(r);return}if(Q.value){Q.value=null;return}let i=this.view.nearestPed(e,t,26);this.view.selectedPedId=i,i===null&&(this.view.rig.follow=null)}onDoubleTap(e,t){let n=this.view.nearestDealer(e,t,32);if(n!==null){wv.value=n,this.followDealer(n);return}let r=this.view.nearestPed(e,t,30);r!==null&&(this.view.selectedPedId=r,this.view.rig.follow=()=>{let e=this.state.peds.find(e=>e.id===r);return e?{x:e.x,y:e.y}:null})}handleKeys(e){let t=0,n=0;if((this.keys.has(`KeyA`)||this.keys.has(`ArrowLeft`))&&--t,(this.keys.has(`KeyD`)||this.keys.has(`ArrowRight`))&&(t+=1),(this.keys.has(`KeyW`)||this.keys.has(`ArrowUp`))&&(n+=1),(this.keys.has(`KeyS`)||this.keys.has(`ArrowDown`))&&--n,t||n){let r=rn.panKeySpeed*(this.view.rig.visibleHeight/20)*e;this.view.rig.panUnits(t*r,n*r)}}loop=e=>{this.raf=requestAnimationFrame(this.loop);let t=Math.min(.1,(e-this.lastTime)/1e3);this.lastTime=e,this.handleKeys(t);let n=yv.value===`menu`,r=n?+!!this.demo:Et.speeds[bv.value],i=this.out;i.dayEnded=!1;let a=r>0&&!$_(this.state);if(a){this.acc+=t*r*Et.ticksPerSecond;let e=Math.floor(this.acc);e>Et.maxTicksPerFrame&&(e=Et.maxTicksPerFrame,this.acc=e);for(let t=0;t<e;t++)tv(this.state,this.world,i),this.tickCount++;this.acc-=e}else ev(this.state,this.world,i);let o=a?Math.min(1,Math.max(0,this.acc)):1;if(!this.demo&&!n){i.sales.length&&wt.play(`sale`),i.delivery.arrived&&wt.play(`truck`),i.delivery.unloaded>0&&wt.play(`unload`);for(let e of i.cues)wt.play(Lv[e])}if(i.delivery.arrived=!1,i.delivery.unloaded=0,i.cues.length=0,i.sales.length){if(gv.value.saleNumbers&&!this.demo&&!n){let e=Math.max(0,i.sales.length-3);for(let t=e;t<i.sales.length;t++){let e=i.sales[t];this.view.floaters.spawn(e.x,e.y+.3,`+${cv(e.amount)}`)}}i.sales.length=0}let s=K_[this.state.story];this.view.hints.dealerId=wv.value,this.view.hints.district=!n&&s?.hint===`district`?s.district??null:null,this.view.hints.shelf=!n&&s?.hint===`shelf`,this.view.hints.labels=!n,this.view.frame(this.state,o,t),this.state.story!==this.lastStory&&(this.lastStory>=0&&this.onStoryChange(),this.lastStory=this.state.story),i.dayEnded&&this.autosave(),this.fpsFrames++,this.fpsTime+=t,this.fpsTime>=1&&(this.fps=Math.round(this.fpsFrames/this.fpsTime),this.tps=Math.round(this.tickCount/this.fpsTime),this.fpsFrames=0,this.tickCount=0,this.fpsTime=0),this.uiTimer+=t,this.uiTimer>=.25&&(this.uiTimer=0,this.pollMessages(),this.updateAudio(n,r),vv.value++),n||(this.autosaveTimer+=t),this.autosaveTimer>=gv.value.autosaveSeconds&&(this.autosaveTimer=0,this.autosave())}},zv=null;function Bv(){return zv}function Vv(e){zv=e}function Hv(e,t){let n=new Map,r=0,i=e+t,a=Array(i).fill(1);for(;;){let o=a.slice(0,e).sort((e,t)=>t-e),s=a.slice(e).sort((e,t)=>t-e),c=0,l=0;for(let n=0;n<Math.min(e,t);n++)o[n]>s[n]?l++:c++;let u=`${c},${l}`;n.set(u,(n.get(u)??0)+1),r++;let d=0;for(;d<i&&a[d]===6;)a[d++]=1;if(d===i)break;a[d]++}return[...n.entries()].map(([e,t])=>{let[n,i]=e.split(`,`).map(Number);return{a:n,d:i,p:t/r}})}var Uv=new Map;function Wv(e,t){let n=`${e}v${t}`,r=Uv.get(n);return r||(r=Hv(e,t),Uv.set(n,r)),r}var Gv=new Map;function Kv(e,t){if(t<=0)return 1;if(e<=0)return 0;let n=e*1e3+t,r=Gv.get(n);if(r!==void 0)return r;let i=0;for(let n of Wv(Math.min(3,e),Math.min(2,t)))i+=n.p*Kv(e-n.a,t-n.d);return Gv.set(n,i),i}var qv=Symbol.for(`pv`),Jv=0;Array.isArray;function $(t,n,r,i,a,o){n||={};var s,c,l=n;if(`ref`in l&&typeof t!=`function`)for(c in l={},n)c==`ref`?s=n[c]:l[c]=n[c];var u={type:t,props:l,key:r,ref:s,__k:null,__:null,__b:0,__e:null,__c:null,constructor:qv,__v:--Jv,__i:-1,__u:0};return(a||o)&&(u.__source=a,u.__self=o),e.vnode&&e.vnode(u),u}function Yv({value:e,state:t}){return $(`svg`,{class:`die ${t}`,viewBox:`0 0 100 100`,width:`46`,height:`46`,"aria-label":`Würfel ${e}`,children:[$(`rect`,{x:`4`,y:`4`,width:`92`,height:`92`,rx:`16`}),({1:[[50,50]],2:[[28,28],[72,72]],3:[[28,28],[50,50],[72,72]],4:[[28,28],[72,28],[28,72],[72,72]],5:[[28,28],[72,28],[50,50],[28,72],[72,72]],6:[[28,26],[72,26],[28,50],[72,50],[28,74],[72,74]]}[e]??[]).map(([e,t],n)=>$(`circle`,{cx:e,cy:t,r:`9`},n))]})}function Xv({n:e,side:t}){let n=Math.min(e,30);return $(`div`,{class:`troops ${t}`,children:[Array.from({length:n},(e,t)=>$(`i`,{},t)),e>n&&$(`span`,{children:[`+`,e-n]})]})}function Zv(){vv.value;let e=Bv(),t=e?.state.battle,[n,r]=Te(!1),[i,a]=Te(0),[o,s]=Te([1,1,1,1,1]);if(De(()=>{if(t&&t.rounds!==i){r(!0);let e=0,n=setInterval(()=>{s(Array.from({length:5},()=>1+Math.floor(Math.random()*6))),++e>=6&&(clearInterval(n),r(!1),a(t.rounds))},70);return()=>clearInterval(n)}},[t?.rounds]),De(()=>{if(!t||!t.last)return;wt.play(`dice`);let e=setTimeout(()=>{t.result===`won`?wt.play(`conquer`):t.result===`lost`?wt.play(`defeat`):wt.play(t.last.defenderLoss>=t.last.attackerLoss?`roundWin`:`roundLose`)},450);return()=>clearTimeout(e)},[t?.rounds]),!e||!t)return null;let c=yf[z[t.district]],l=t.last,u=t.result!==`running`,d=l?Math.min(l.attacker.length,l.defender.length):0,f=(e,t)=>{if(!l||n||t>=d)return`none`;let r=l.attacker[t]>l.defender[t];return e===`a`?r?`win`:`lose`:r?`lose`:`win`},p=Kv(t.attackers,t.defenders);return $(`div`,{class:`modal-backdrop battle-backdrop`,children:$(`div`,{class:`battle panel`,children:[$(`header`,{children:[$(`h2`,{children:[`Kampf um `,c]}),!u&&$(`span`,{class:`small-text muted`,children:[`Siegchance `,dv(p)]})]}),$(`div`,{class:`battle-body`,children:[$(`div`,{class:`side own`,children:[$(`span`,{class:`side-name`,children:`Deine Kämpfer`}),$(`span`,{class:`side-count`,children:t.attackers}),$(Xv,{n:t.attackers,side:`own`}),$(`div`,{class:`dice`,children:(n?o.slice(0,Math.min(3,t.attackers+(l?.attackerLoss??0))):l?.attacker??[]).map((e,t)=>$(Yv,{value:e,state:f(`a`,t)},t))})]}),$(`div`,{class:`versus`,children:`gegen`}),$(`div`,{class:`side gang`,children:[$(`span`,{class:`side-name`,children:`Gemüsegang`}),$(`span`,{class:`side-count`,children:t.defenders}),$(Xv,{n:t.defenders,side:`gang`}),$(`div`,{class:`dice`,children:(n?o.slice(3,3+Math.min(2,t.defenders+(l?.defenderLoss??0))):l?.defender??[]).map((e,t)=>$(Yv,{value:e,state:f(`d`,t)},t))})]})]}),$(`p`,{class:`battle-info small-text`,children:u&&!n?t.result===`won`?`Sieg. ${c} gehört jetzt dir. ${t.attackers} Kämpfer kehren in den Hof zurück.`:t.result===`lost`?`Niederlage. Die Gemüsegang hält ${c} mit ${t.defenders} Kämpfern.`:`Rückzug. ${t.attackers} Kämpfer kehren zurück, die Gang hat noch ${t.defenders}.`:l&&!n?`Du verlierst ${l.attackerLoss}, die Gang verliert ${l.defenderLoss}. Der höhere Würfel gewinnt, bei Gleichstand die Gang.`:`Du würfelst mit bis zu drei Würfeln, die Gang mit bis zu zwei. Die höchsten Würfel werden verglichen.`}),$(`footer`,{children:u?$(`button`,{class:`btn primary big`,disabled:n,onClick:()=>e.command({type:`battleClose`}),children:`Weiter`}):$(x,{children:[$(`button`,{class:`btn`,disabled:n,onClick:()=>e.command({type:`battleRetreat`}),children:`Rückzug`}),$(`button`,{class:`btn`,disabled:n,onClick:()=>e.command({type:`battleAuto`}),children:`Bis zum Ende`}),$(`button`,{class:`btn danger-solid big`,disabled:n,onClick:()=>e.command({type:`battleRoll`}),children:`Würfeln`})]})})]})})}var Qv={grass:13360311,grassLight:14280137,field:12044686,fieldDark:10927229,road:13220247,roadEdge:12102023,city:11976900,brick:11029822,roof:9258299,wood:9201480,glass:10275270,green:3112266,red:12597547,gold:14724407,white:16250349},$v=Mm.farms;function ey(e,t={}){return new Zs({color:e,...t})}function ty(e,t,n,r,i,a,o,s,c={}){let l=new K(new Ps(t,n,r),ey(i,c));return l.position.set(a,o,s),l.castShadow=!1,l.receiveShadow=!0,e.add(l),l}function ny(e,t,n,r,i=1){let a=new K(new Is(.35*i,.5*i,3.2*i,5),ey(7951418));a.position.set(t,1.6*i,n),e.add(a);let o=new K(new Ls(2.8*i,5.2*i,7),ey(6130510));o.position.set(t,5.2*i,n),e.add(o);let s=new K(new Bs(.62*i,6,5),ey(r));s.position.set(t+1.25*i,4.7*i,n+.6*i),e.add(s)}function ry(e,t,n,r){for(let i=0;i<n;i++){let a=(i-(n-1)/2)*3.2;ty(e,r,.24,1.8,i%2?Qv.fieldDark:Qv.field,0,.16,a);for(let n=-r/2+2;n<r/2-1;n+=4){let r=new K(new Ls(.75,1.6,5),ey(6523725));r.position.set(n,1,a),e.add(r);let i=new K(new Bs(.32,5,4),ey(t));i.position.set(n+.55,1.25,a+.35),e.add(i)}}}function iy(e,t,n,r,i,a=5){ty(e,t,6,n,r,0,3,0);let o=new K(new Ls(Math.max(t,n)*.72,a,4),ey(i));o.position.set(0,6+a/2-.2,0),o.rotation.y=Math.PI/4,e.add(o),ty(e,2.1,3.4,.18,6900022,0,1.7,n/2+.11),ty(e,2.2,1.7,.2,10208459,-t/3,3.5,n/2+.12),ty(e,2.2,1.7,.2,10208459,t/3,3.5,n/2+.12)}function ay(e,t,n){ty(e,t,5.5,n,10205613,0,2.75,0,{transparent:!0,opacity:.55,depthWrite:!1});let r=new K(new Ls(Math.max(t,n)*.72,4.5,4),ey(9288118,{transparent:!0,opacity:.58,depthWrite:!1}));r.position.set(0,7.2,0),r.rotation.y=Math.PI/4,e.add(r);for(let r=-t/2+2;r<t/2;r+=4)ty(e,.28,7,n+.3,15068901,r,3.5,0);for(let r=-n/2+2;r<n/2;r+=4)ty(e,t+.3,.22,.22,15068901,0,5.2,r)}function oy(e){let t=document.createElement(`canvas`);t.width=512,t.height=112;let n=t.getContext(`2d`);n&&(n.fillStyle=`rgba(255,255,255,0.94)`,n.fillRect(8,8,496,96),n.strokeStyle=`rgba(42,58,48,0.18)`,n.lineWidth=4,n.strokeRect(8,8,496,96),n.fillStyle=`#26352c`,n.font=`700 38px Inter, Arial, sans-serif`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(e,256,57,460));let r=new Ko(new Mo({map:new As(t),transparent:!0,depthWrite:!1}));return r.scale.set(46,10,1),r}var sy=class{canvas;onSelect;renderer;scene=new Ea;camera=new Pc(-1,1,1,-1,.1,1e3);raycaster=new el;hitTargets=[];markers=[];target=new U(Mm.width/2,0,Mm.height/2);insets={top:0,right:0,bottom:0,left:0};pointer={id:-1,x:0,y:0,startX:0,startY:0,dragging:!1};pointers=new Map;pinchDistance=0;multiTouch=!1;resizeObserver=null;raf=0;baseHeight=240;zoom=1;selected=0;constructor(e,t){this.canvas=e,this.onSelect=t,this.renderer=new hf({canvas:e,antialias:!0,powerPreference:`low-power`}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),this.renderer.outputColorSpace=`srgb`,this.scene.background=new G(14477524),this.scene.add(new xc(16054253,9146486,2));let n=new Ic(16773848,2.1);n.position.set(-80,220,150),this.scene.add(n),this.buildLandscape(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),e.addEventListener(`pointerdown`,this.onPointerDown),e.addEventListener(`pointermove`,this.onPointerMove),e.addEventListener(`pointerup`,this.onPointerUp),e.addEventListener(`pointercancel`,this.onPointerCancel),e.addEventListener(`wheel`,this.onWheel,{passive:!1}),this.resize(),this.frame()}buildLandscape(){let e=new K(new Rs(Mm.width*12,Mm.height*12),ey(Qv.grass));e.rotation.x=-Math.PI/2,e.position.set(Mm.width/2,-.12,Mm.height/2),this.scene.add(e);let t=[[18,80,54,34,Qv.field],[200,86,62,28,Qv.fieldDark],[96,150,36,30,Qv.grassLight],[178,10,44,26,Qv.field],[84,20,40,30,Qv.fieldDark],[190,150,40,30,Qv.field]];for(let[e,n,r,i,a]of t){let t=new K(new Rs(r,i),ey(a));t.rotation.x=-Math.PI/2,t.position.set(e+r/2,.015,n+i/2),this.scene.add(t)}let n=Mm.city,r=new K(new Ps(n.w,.5,n.h),ey(Qv.city));r.position.set(n.x,.18,n.y),this.scene.add(r);for(let[e,t,r,i,a]of[[-23,-10,12,12,9214366],[-7,-13,10,16,11187381],[9,-9,12,12,8885914],[24,-11,10,17,10529453],[-20,9,13,12,10201255],[0,10,16,13,8294033],[22,9,12,12,11581878]])ty(this.scene,r,9+r%4,i,a,n.x+e,5,n.y+t);ty(this.scene,16,8,11,8227213,n.x+2,4,n.y+22);let i=oy(`STADT · LAGER`);i.position.set(n.x,18,n.y+34),this.scene.add(i);for(let[e,t]of $v){let r=e-n.x,i=t-n.y,a=Math.hypot(r,i),o=new K(new Ps(a,.12,5.4),ey(Qv.road));o.position.set((e+n.x)/2,.06,(t+n.y)/2),o.rotation.y=-Math.atan2(i,r),this.scene.add(o);let s=new K(new Ps(a,.04,.65),ey(Qv.roadEdge));s.position.set((e+n.x)/2,.13,(t+n.y)/2+2.7),s.rotation.y=-Math.atan2(i,r),this.scene.add(s)}$v.forEach(([e,t],n)=>this.buildFarm(n,e,t))}buildFarm(e,t,n){let r=new K(new Ps(33,.25,27),ey(e%2?Qv.grassLight:Qv.field));r.position.set(t,.12,n),this.scene.add(r);let i=new K(new Fs(16.5,32),ey(16777215,{transparent:!0,opacity:.001,depthWrite:!1}));i.rotation.x=-Math.PI/2,i.position.set(t,.3,n),i.userData.farmIndex=e,this.hitTargets.push(i),this.scene.add(i);let a=new va;if(a.position.set(t,.25,n),this.scene.add(a),e===0){iy(a,12,10,14141092,10175545,5.5);for(let[e,t]of[[-12,-8],[-12,0],[-12,8],[12,-8],[12,0],[12,8]])ny(a,e,t,13123631,.9);ry(a,13123631,2,12)}else if(e===1){iy(a,10,9,14734005,5667923,4.8);for(let[e,t]of[[-12,-8],[-7,-8],[-12,0],[-7,0],[8,-8],[13,-8],[8,0],[13,0],[-2,10],[4,10]])ny(a,e,t,14235210,.85)}else if(e===2){ay(a,17,12);for(let[e,t]of[[-11,10],[10,10],[-12,-10],[12,-10]])ny(a,e,t,15769648,1.05)}else if(e===3){iy(a,14,10,14206632,7621474,5.5);for(let e=0;e<4;e++){let t=-11+e*7,n=new K(new Is(.22,.22,22,5),ey(8085574));n.rotation.z=Math.PI/2,n.position.set(0,2.4,t),a.add(n);for(let e=-10;e<=10;e+=4){let n=new K(new Bs(1.35,6,5),ey(6260811));n.position.set(e,3.3,t),a.add(n);let r=new K(new Bs(.45,5,4),ey(7686026));r.position.set(e+.5,2.4,t+.8),a.add(r)}}}else if(e===4){iy(a,15,11,12364174,7359037,6),ty(a,8,7,8,10193525,-12,3.5,9),ry(a,15254855,4,17);for(let[e,t]of[[-14,-10],[14,-10],[14,10]])ny(a,e,t,15254855,.8)}else{ay(a,19,13);let e=new K(new Ps(12,5,10),ey(10996161,{transparent:!0,opacity:.55,depthWrite:!1}));e.position.set(0,2.5,13),a.add(e);for(let[e,t]of[[-13,-10],[13,-10],[-13,12],[13,12]])ny(a,e,t,14174094,.9);ry(a,14174094,2,15)}let o=new K(new zs(15.5,16.5,48),new $o({color:9148048,transparent:!0,opacity:.9,depthWrite:!1}));o.rotation.x=-Math.PI/2,o.position.set(t,.42,n),this.scene.add(o);let s=new K(new zs(18,19.4,48),new $o({color:Qv.gold,transparent:!0,opacity:.95,depthWrite:!1}));s.rotation.x=-Math.PI/2,s.position.set(t,.48,n),s.visible=e===this.selected,this.scene.add(s);let c=new K(new Bs(1.8,10,8),new $o({color:Qv.red}));c.position.set(t+12,13,n-10),c.visible=!1,this.scene.add(c);let l=new K(new Ps(Math.hypot(t-Mm.city.x,n-Mm.city.y),.07,.7),new $o({color:Qv.green,transparent:!0,opacity:0,depthWrite:!1}));l.position.set((t+Mm.city.x)/2,.18,(n+Mm.city.y)/2),l.rotation.y=-Math.atan2(n-Mm.city.y,t-Mm.city.x),this.scene.add(l),this.markers.push({ownerRing:o,selectedRing:s,alert:c,route:l});let u=oy(xf[e].replace(/^(Hof|Obsthof|Tropenhaus|Weingut|Glashaus) /,``));u.position.set(t,17,n+17),this.scene.add(u)}update(e,t,n,r){this.selected=r,e.forEach((e,i)=>{let a=this.markers[i];if(!a)return;a.ownerRing.material.color.setHex(e.owner===`gang`?Qv.red:e.owner===`player`?Qv.green:9148048),a.selectedRing.visible=i===r;let o=!!e.contract&&e.contract.endDay>=t;a.route.material.opacity=e.owner===`player`||o?.88:0,a.alert.visible=n.some(e=>e.farm===i)||!!e.contract&&e.contract.endDay-t<=2&&e.contract.endDay>=t})}setInsets(e,t,n,r){let i=this.insets;Math.abs(i.top-e)+Math.abs(i.right-t)+Math.abs(i.bottom-n)+Math.abs(i.left-r)<2||(this.insets={top:e,right:t,bottom:n,left:r},this.resize())}resize(){let e=this.canvas.clientWidth||window.innerWidth,t=this.canvas.clientHeight||window.innerHeight;this.renderer.setSize(e,t,!1);let n=Math.max(120,e-this.insets.left-this.insets.right),r=Math.max(90,t-this.insets.top-this.insets.bottom),i=Mm.width+30,a=Mm.height*.84+45,o=Math.max(i/n,a/r);this.baseHeight=o*t,this.applyCamera()}applyCamera(){let e=this.baseHeight/this.zoom,t=this.canvas.clientWidth||window.innerWidth,n=this.canvas.clientHeight||window.innerHeight,r=t/Math.max(1,n);this.camera.top=e/2,this.camera.bottom=-e/2,this.camera.left=-e*r/2,this.camera.right=e*r/2;let i=(this.insets.right-this.insets.left)/2,a=(this.insets.bottom-this.insets.top)/2;i||a?this.camera.setViewOffset(t,n,Math.round(i),Math.round(a),t,n):this.camera.clearViewOffset(),this.camera.updateProjectionMatrix(),this.camera.position.set(this.target.x,this.target.y+390,this.target.z+250),this.camera.lookAt(this.target)}frame=()=>{this.raf=requestAnimationFrame(this.frame),this.applyCamera(),this.renderer.render(this.scene,this.camera)};onPointerDown=e=>{if(this.canvas.setPointerCapture?.(e.pointerId),this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),this.pointers.size===1)this.pointer.id=e.pointerId,this.pointer.x=this.pointer.startX=e.clientX,this.pointer.y=this.pointer.startY=e.clientY,this.pointer.dragging=!1,this.multiTouch=!1;else if(this.pointers.size===2){this.multiTouch=!0;let[e,t]=[...this.pointers.values()];this.pinchDistance=Math.hypot(e.x-t.x,e.y-t.y)}};onPointerMove=e=>{let t=this.pointers.get(e.pointerId);if(!t)return;let n=e.clientX-t.x,r=e.clientY-t.y;if(t.x=e.clientX,t.y=e.clientY,this.pointers.size===2){let[e,t]=[...this.pointers.values()],n=Math.hypot(e.x-t.x,e.y-t.y);this.pinchDistance>0&&(this.zoom=Math.max(.8,Math.min(2.5,this.zoom*(n/this.pinchDistance))),this.applyCamera()),this.pinchDistance=n}else if(e.pointerId===this.pointer.id&&(!this.pointer.dragging&&Math.hypot(e.clientX-this.pointer.startX,e.clientY-this.pointer.startY)>7&&(this.pointer.dragging=!0),this.pointer.dragging)){let e=this.baseHeight/this.zoom/Math.max(1,this.canvas.clientHeight);this.target.x-=n*e,this.target.z+=r*e,this.target.x=Math.max(0,Math.min(Mm.width,this.target.x)),this.target.z=Math.max(0,Math.min(Mm.height,this.target.z))}};onPointerUp=e=>{let t=this.multiTouch;if(this.pointers.delete(e.pointerId),t)this.pointers.size===0&&(this.pointer.id=-1,this.pointer.dragging=!1,this.multiTouch=!1,this.pinchDistance=0);else if(e.pointerId===this.pointer.id){if(!this.pointer.dragging){let t=this.canvas.getBoundingClientRect(),n=new H((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1);this.raycaster.setFromCamera(n,this.camera);let r=(this.raycaster.intersectObjects(this.hitTargets,!1)[0]?.object)?.userData.farmIndex;typeof r==`number`&&this.onSelect(r)}this.pointer.id=-1}};onPointerCancel=e=>{this.pointers.delete(e.pointerId),this.pointer.id=-1,this.pointer.dragging=!1,this.multiTouch=this.pointers.size>0,this.pinchDistance=0};onWheel=e=>{e.preventDefault(),this.zoom=Math.max(.8,Math.min(2.5,this.zoom*(e.deltaY>0?.92:1.08))),this.applyCamera()};dispose(){cancelAnimationFrame(this.raf),this.resizeObserver?.disconnect(),this.canvas.removeEventListener(`pointerdown`,this.onPointerDown),this.canvas.removeEventListener(`pointermove`,this.onPointerMove),this.canvas.removeEventListener(`pointerup`,this.onPointerUp),this.canvas.removeEventListener(`pointercancel`,this.onPointerCancel),this.canvas.removeEventListener(`wheel`,this.onWheel),this.scene.traverse(e=>{let t=e;t.geometry?.dispose?.(),Array.isArray(t.material)?t.material.forEach(e=>e.dispose()):t.material?.dispose?.();let n=e;(n.material instanceof Mo?n.material.map:null)?.dispose()}),this.renderer.dispose()}};function cy(e){let t=e.size??20;return $(`svg`,{class:e.class,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":1.9,"stroke-linecap":`round`,"stroke-linejoin":`round`,"aria-hidden":`true`,children:e.children})}var ly=e=>$(cy,{...e,children:[$(`path`,{d:`M3 10l9-6 9 6v10H3z`}),$(`path`,{d:`M7 20v-7h10v7`}),$(`path`,{d:`M7 16h10`})]}),uy=e=>$(cy,{...e,children:[$(`circle`,{cx:`12`,cy:`12`,r:`3`}),$(`path`,{d:`M12 2.8v2.4M12 18.8v2.4M4.2 7.5l2 1.2M17.8 15.3l2 1.2M4.2 16.5l2-1.2M17.8 8.7l2-1.2`}),$(`circle`,{cx:`12`,cy:`12`,r:`7`})]}),dy=e=>$(cy,{...e,children:$(`path`,{d:`M8 5v14M16 5v14`})}),fy=e=>$(cy,{...e,children:$(`path`,{d:`M7 5l11 7-11 7z`,fill:`currentColor`})}),py=e=>$(cy,{...e,children:$(`path`,{d:`M2 7l5 5-5 5zM8.5 7l5 5-5 5zM15 7l5 5-5 5z`,fill:`currentColor`})}),my=e=>$(cy,{...e,children:[$(`path`,{d:`M4 12a8 8 0 1 0 2.4-5.7`}),$(`path`,{d:`M4 4v4.5h4.5`})]}),hy=e=>$(cy,{...e,children:[$(`path`,{d:`M20 12a8 8 0 1 1-2.4-5.7`}),$(`path`,{d:`M20 4v4.5h-4.5`})]}),gy=e=>$(cy,{...e,children:$(`path`,{d:`M12 5v14M5 12h14`})}),_y=e=>$(cy,{...e,children:$(`path`,{d:`M5 12h14`})}),vy=e=>$(cy,{...e,children:$(`path`,{d:`M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5`})}),yy=e=>$(cy,{...e,children:$(`path`,{d:`M6 6l12 12M18 6L6 18`})}),by=e=>$(cy,{...e,children:[$(`path`,{d:`M12 3l10 18H2z`}),$(`path`,{d:`M12 10v5M12 18v.5`})]}),xy=e=>$(cy,{...e,children:[$(`circle`,{cx:`12`,cy:`12`,r:`9`}),$(`path`,{d:`M12 11v6M12 7.5v.5`})]}),Sy=e=>$(cy,{...e,children:[$(`path`,{d:`M2 6h12v10H2zM14 10h4l3 3v3h-7`}),$(`circle`,{cx:`6`,cy:`18`,r:`1.8`}),$(`circle`,{cx:`17`,cy:`18`,r:`1.8`})]}),Cy=e=>$(cy,{...e,children:$(`path`,{d:`M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z`})}),wy=e=>$(cy,{...e,children:[$(`rect`,{x:`7`,y:`2.5`,width:`10`,height:`19`,rx:`2`}),$(`path`,{d:`M2 14a8 8 0 0 0 5 6M22 10a8 8 0 0 0-5-6`})]}),Ty=e=>$(cy,{...e,children:[$(`path`,{d:`M3 8h18v12H3z`}),$(`path`,{d:`M3 8l2-4h14l2 4`}),$(`path`,{d:`M8 12v5M12 12v5M16 12v5`})]}),Ey=e=>$(cy,{...e,children:[$(`path`,{d:`M7 11V7.5a1.5 1.5 0 0 1 3 0V11M10 10V6.5a1.5 1.5 0 0 1 3 0V10M13 10V7.5a1.5 1.5 0 0 1 3 0V12`}),$(`path`,{d:`M16 11a1.5 1.5 0 0 1 3 0v3a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-2-3.5a1.5 1.5 0 0 1 2.6-1.5L9 14`})]}),Dy=e=>$(cy,{...e,children:[$(`circle`,{cx:`10`,cy:`8`,r:`3.4`}),$(`path`,{d:`M3.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6`}),$(`path`,{d:`M19 7v6M16 10h6`})]}),Oy=e=>$(cy,{...e,children:[$(`rect`,{x:`5`,y:`11`,width:`14`,height:`9`,rx:`2`}),$(`path`,{d:`M8 11V8a4 4 0 0 1 8 0v3`})]}),ky=e=>$(cy,{...e,children:[$(`circle`,{cx:`12`,cy:`12`,r:`8.5`}),$(`circle`,{cx:`12`,cy:`12`,r:`4.5`}),$(`circle`,{cx:`12`,cy:`12`,r:`1`,fill:`currentColor`})]}),Ay=e=>$(cy,{...e,children:$(`path`,{d:`M5 12.5l4.2 4.2L19 7`})}),jy=e=>$(cy,{...e,children:[$(`path`,{d:`M4 9.5h3.5L12 5.5v13l-4.5-4H4z`}),$(`path`,{d:`M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11`})]}),My=e=>$(cy,{...e,children:[$(`path`,{d:`M4 9.5h3.5L12 5.5v13l-4.5-4H4z`}),$(`path`,{d:`M16 9.5l5 5M21 9.5l-5 5`})]}),Ny=e=>$(cy,{...e,children:[$(`path`,{d:`M3 20h18`}),$(`path`,{d:`M5 20v-8l5-4 5 4v8`}),$(`path`,{d:`M8.5 20v-4h3v4`}),$(`path`,{d:`M17 20v-9.5a2 2 0 0 1 4 0V20`})]}),Py=e=>$(cy,{...e,children:[$(`circle`,{cx:`10.5`,cy:`10.5`,r:`6`}),$(`path`,{d:`M15 15l5.5 5.5`})]});function Fy({text:e,children:t,class:n}){return $(`span`,{class:`num ${n??``}`,role:`button`,tabIndex:0,onClick:t=>{t.stopPropagation(),Nv(e)},children:t})}var Iy=[{skin:`#e8b98f`,hair:`#9a9a96`,style:`short`,hat:`straw`,hatColor:`#e2c46a`,beard:`full`,shirt:`#b8433a`,collar:`#8e2f28`,brows:`calm`,bg:`#e6efe0`},{skin:`#f0c7a4`,hair:`#b9b4ae`,style:`bun`,hat:null,beard:null,shirt:`#3f6b4a`,collar:`#2f5238`,brows:`stern`,bg:`#e9eee4`},{skin:`#d9a477`,hair:`#3a2a20`,style:`slick`,hat:null,beard:`mustache`,shirt:`#e3a72f`,collar:`#c4861a`,brows:`calm`,bg:`#f3ecd9`},{skin:`#f2cdb0`,hair:`#6b4a32`,style:`long`,hat:`scarf`,hatColor:`#7a5aa0`,beard:null,glasses:!0,shirt:`#8b6fb0`,collar:`#6c5490`,brows:`worried`,bg:`#ece6f2`},{skin:`#f3c9a8`,hair:`#c4622d`,style:`curly`,hat:`cap`,hatColor:`#3d5a80`,beard:`stubble`,shirt:`#4a6fa5`,collar:`#35557f`,brows:`worried`,bg:`#e3eaf2`},{skin:`#e9bf9b`,hair:`#1f1d22`,style:`bob`,hat:null,beard:null,shirt:`#f4f4f2`,collar:`#d9dcdc`,lips:`#b0353f`,brows:`calm`,bg:`#e4eef0`}],Ly={skin:`#dcae88`,hair:`#2b2622`,style:`bald`,hat:`flat`,hatColor:`#3b3f45`,beard:`stubble`,shirt:`#2e3238`,collar:`#e8e8e4`,tie:`#5f8f3a`,brows:`stern`,bg:`#f2e3e0`};function Ry({l:e}){switch(e.style){case`short`:return $(`path`,{d:`M14 21c0-7 4.5-11 10-11s10 4 10 11c-1-3-3-5-5-5.5-3 1.5-7 1.5-10 0-2 .5-4 2.5-5 5.5z`,fill:e.hair});case`bun`:return $(x,{children:[$(`circle`,{cx:`24`,cy:`9`,r:`4.2`,fill:e.hair}),$(`path`,{d:`M14 22c-.5-7.5 4-12 10-12s10.5 4.5 10 12c-1.5-4-4.5-6.5-10-6.5S15.5 18 14 22z`,fill:e.hair})]});case`bob`:return $(`path`,{d:`M13 28c-1.5-10 3-17 11-17s12.5 7 11 17c-1-1-1.5-4-2-8-3.5 1-11 1-18 0-.5 4-1 7-2 8z`,fill:e.hair});case`slick`:return $(`path`,{d:`M14.5 20c.5-6.5 4.5-9.5 9.5-9.5 5.5 0 9.5 3 9.5 9.5-2-3.5-5-4.5-9.5-4.5-3.5 0-7 1-9.5 4.5z`,fill:e.hair});case`long`:return $(`path`,{d:`M13.5 32c-2-12 2-20 10.5-20s12.5 8 10.5 20c-1-3-1.5-8-2-11-4 1-11 1-17 0-.5 3-1 8-2 11z`,fill:e.hair});case`curly`:return $(`g`,{fill:e.hair,children:[$(`circle`,{cx:`17`,cy:`16`,r:`3.4`}),$(`circle`,{cx:`21.5`,cy:`13`,r:`3.6`}),$(`circle`,{cx:`27`,cy:`13`,r:`3.6`}),$(`circle`,{cx:`31`,cy:`16.5`,r:`3.3`})]});case`bald`:return $(`path`,{d:`M14.2 24c-.6-2 .2-3.5 1.2-4M33.8 24c.6-2-.2-3.5-1.2-4`,stroke:e.hair,"stroke-width":`2`,fill:`none`})}}function zy({l:e}){let t=e.hatColor??`#555`;switch(e.hat){case`straw`:return $(x,{children:[$(`ellipse`,{cx:`24`,cy:`15.5`,rx:`15`,ry:`3.2`,fill:t}),$(`path`,{d:`M16.5 15c0-5 3.5-8 7.5-8s7.5 3 7.5 8z`,fill:t}),$(`path`,{d:`M16.6 13.4h14.8`,stroke:`#a5423a`,"stroke-width":`1.6`})]});case`cap`:return $(x,{children:[$(`path`,{d:`M15 17c0-6 4-9.5 9-9.5s9 3.5 9 9.5z`,fill:t}),$(`path`,{d:`M29 16.5c3 0 6.5.6 8.5 1.8-2.5.7-6 .7-9 .2z`,fill:t})]});case`flat`:return $(x,{children:[$(`path`,{d:`M14.5 17.5c-.5-5.5 4-9 10-9 5.5 0 9.5 2.5 10 7.5-3.5 1.5-12 2.5-20 1.5z`,fill:t}),$(`path`,{d:`M30 15.5c2.5.3 5 1 6 2-2 .6-4.5.6-6.5.3z`,fill:t})]});case`scarf`:return $(`path`,{d:`M13 26c-1-10 4-16 11-16s12 6 11 16c-1.5-5-2.5-8-3.5-9-4 1.2-11 1.2-15 0-1 1-2 4-3.5 9z`,fill:t});default:return null}}function By({l:e}){let t=21.2;return $(x,{children:[(e.brows===`stern`?[`M18.6 20.3l3.6 1.3`,`M29.4 20.3l-3.6 1.3`]:e.brows===`worried`?[`M18.8 21.6l3.4-1.2`,`M29.2 21.6l-3.4-1.2`]:[`M18.8 ${t}h3.4`,`M25.8 ${t}h3.4`]).map((e,t)=>$(`path`,{d:e,stroke:`#3a2c24`,"stroke-width":`1.1`,"stroke-linecap":`round`},t)),$(`circle`,{cx:`20.6`,cy:`23.6`,r:`1.05`,fill:`#2a211c`}),$(`circle`,{cx:`27.4`,cy:`23.6`,r:`1.05`,fill:`#2a211c`}),e.glasses&&$(`g`,{stroke:`#2c2c30`,"stroke-width":`0.9`,fill:`none`,children:[$(`circle`,{cx:`20.6`,cy:`23.6`,r:`2.6`}),$(`circle`,{cx:`27.4`,cy:`23.6`,r:`2.6`}),$(`path`,{d:`M23.2 23.6h1.6`})]}),$(`path`,{d:`M23.6 24.8l-.8 3h1.6`,stroke:`#b07c5c`,"stroke-width":`0.8`,fill:`none`,"stroke-linecap":`round`}),e.beard===`full`&&$(`path`,{d:`M17 26c0 6 3 9.5 7 9.5s7-3.5 7-9.5c-1.5 2-3 2.5-4 2.5-1.5-1-4.5-1-6 0-1 0-2.5-.5-4-2.5z`,fill:`#a9a8a3`}),e.beard===`mustache`&&$(`path`,{d:`M20.5 29.6c1.2-1.3 2.4-1.5 3.5-.8 1.1-.7 2.3-.5 3.5.8-1.4.2-2.5.2-3.5-.3-1 .5-2.1.5-3.5.3z`,fill:e.hair}),e.beard===`stubble`&&$(`path`,{d:`M18 28.5c1 4.5 3.5 6.6 6 6.6s5-2.1 6-6.6`,stroke:e.hair,"stroke-opacity":`0.35`,"stroke-width":`2.6`,fill:`none`}),$(`path`,{d:`M21.7 31c1.5.8 3.1.8 4.6 0`,stroke:e.lips??`#8a4a3c`,"stroke-width":e.lips?1.6:1,"stroke-linecap":`round`,fill:`none`})]})}function Vy({l:e,size:t}){return $(`svg`,{class:`portrait`,width:t,height:t,viewBox:`0 0 48 48`,"aria-hidden":`true`,children:[$(`circle`,{cx:`24`,cy:`24`,r:`24`,fill:e.bg}),$(`clipPath`,{id:`pclip`,children:$(`circle`,{cx:`24`,cy:`24`,r:`24`})}),$(`g`,{"clip-path":`url(#pclip)`,children:[$(`path`,{d:`M6 50c1-9 8-13.5 18-13.5S41 41 42 50z`,fill:e.shirt}),$(`path`,{d:`M19 37.2l5 5 5-5`,stroke:e.collar??e.shirt,"stroke-width":`2.4`,fill:`none`}),e.tie&&$(`path`,{d:`M23 38.5h2l1 9h-4z`,fill:e.tie}),$(`rect`,{x:`21`,y:`31`,width:`6`,height:`7`,rx:`2`,fill:e.skin}),e.style===`long`||e.hat===`scarf`?$(Ry,{l:e}):null,$(`ellipse`,{cx:`24`,cy:`23.5`,rx:`9.6`,ry:`11`,fill:e.skin}),$(`ellipse`,{cx:`14.6`,cy:`24.5`,rx:`1.6`,ry:`2.4`,fill:e.skin}),$(`ellipse`,{cx:`33.4`,cy:`24.5`,rx:`1.6`,ry:`2.4`,fill:e.skin}),$(By,{l:e}),e.style!==`long`&&e.hat!==`scarf`?$(Ry,{l:e}):null,$(zy,{l:e})]})]})}function Hy({farm:e,size:t=44}){return $(Vy,{l:Iy[e]??Iy[0],size:t})}function Uy({size:e=44}){return $(Vy,{l:Ly,size:e})}var Wy=e=>`#${e.toString(16).padStart(6,`0`)}`;function Gy(e){return e>=.7?`pos`:e<.4?`neg`:`mid`}function Ky(){vv.value;let e=F(null),t=F(null);return De(()=>{let n=e.current;if(!n)return;let r=new sy(n,e=>{Ev.value=e,kv.value=null,Ov.value===`collapsed`&&(Ov.value=`normal`)});return t.current=r,()=>{r.dispose(),t.current=null}},[]),De(()=>{let e=Bv();e&&t.current?.update(e.state.farms,e.state.day,e.state.pending,Ev.value);let n=document.querySelector(`.topbar`)?.getBoundingClientRect().bottom??0,r=document.querySelector(`.actionbar`)?.getBoundingClientRect().top??window.innerHeight,i=document.querySelector(`.sheet-farms`)?.getBoundingClientRect(),a=!!i&&i.left>window.innerWidth*.3,o=window.innerHeight-(i&&!a?Math.min(i.top,r):r),s=i&&a?window.innerWidth-i.left:0;t.current?.setInsets(n+6,s+6,o+6,6)},[vv.value,Ev.value,Ov.value]),$(`div`,{class:`farms-world`,"aria-label":`Umlandkarte mit sechs Höfen`,children:[$(`canvas`,{ref:e,"aria-label":`3D-Karte: Hof antippen, ziehen zum Verschieben, Mausrad zum Zoomen`}),$(`span`,{class:`farms-world-hint`,children:`Hof antippen · Ziehen zum Verschieben · Pinch / Mausrad zum Zoomen`})]})}function qy({n:e}){return $(`span`,{class:`stars`,"aria-label":`${e} Sterne`,children:[1,2,3].map(t=>$(Cy,{size:12,class:t<=e?`on`:`off`},t))})}function Jy({label:e,value:t,kind:n,text:r}){return $(Fy,{text:r,class:`fbar`,children:[$(`span`,{class:`fbar-label`,children:[e,` `,$(`b`,{children:Math.round(t)})]}),$(`span`,{class:`bar`,children:$(`span`,{class:`fill ${n}`,style:{width:`${Math.max(0,Math.min(100,t))}%`}})})]})}function Yy(e,t){return`${Ft[e].fruits.filter(e=>(t.crates[e]??0)>0).map(e=>`${t.crates[e]} ${vf[e]}`).join(` und `)} pro Tag, ${t.days} Tage, ${t.pricePct} %${t.exclusive?`, exklusiv`:``}`}function Xy(e,t){let n={};for(let r of Ft[e].fruits)n[r]=t.crates[r]??0;return{farm:e,crates:n,pricePct:t.pricePct,days:t.days,exclusive:t.exclusive}}function Zy(e){return{crates:{...e.crates},pricePct:e.pricePct,days:e.days,exclusive:e.exclusive}}function Qy({i:e}){vv.value;let t=Bv(),n=t.state,r=kv.value,i=Zy(r),a=n.farms[e].owner===`player`,o=Op(n,e,i),s=Ft[e].capacity,c=Dp(i),l=e=>kv.value={...r,...e};return $(`div`,{class:`contract-editor`,children:[Ft[e].fruits.map(t=>$(`div`,{class:`ce-row`,children:[$(`span`,{class:`dot`,style:{background:Wy(Mt[t].color)}}),$(`span`,{class:`ce-label`,children:vf[t]}),$(`button`,{class:`icon-btn small-btn`,"aria-label":`weniger`,disabled:(r.crates[t]??0)<=0,onClick:()=>l({crates:{...r.crates,[t]:(r.crates[t]??0)-1}}),children:`−`}),$(`b`,{class:`mono ce-val`,children:r.crates[t]??0}),$(`button`,{class:`icon-btn small-btn`,"aria-label":`mehr`,disabled:c>=s,onClick:()=>l({crates:{...r.crates,[t]:(r.crates[t]??0)+1}}),children:`+`}),$(`small`,{class:`muted`,children:[`je `,cv(wp(n,e,t,r.pricePct))]})]},t)),!a&&$(x,{children:[$(`div`,{class:`ce-row`,children:[$(`span`,{class:`ce-label`,children:`Preis`}),$(`button`,{class:`icon-btn small-btn`,"aria-label":`billiger`,disabled:r.pricePct<=Lt.pricePctMin,onClick:()=>l({pricePct:r.pricePct-Lt.pricePctStep}),children:`−`}),$(`b`,{class:`mono ce-val`,children:[r.pricePct,` %`]}),$(`button`,{class:`icon-btn small-btn`,"aria-label":`teurer`,disabled:r.pricePct>=Lt.pricePctMax,onClick:()=>l({pricePct:r.pricePct+Lt.pricePctStep}),children:`+`}),$(`small`,{class:`muted`,children:`vom Grundpreis`})]}),$(`div`,{class:`ce-row`,children:[$(`span`,{class:`ce-label`,children:`Laufzeit`}),$(`div`,{class:`seg`,children:Lt.durations.map(e=>$(`button`,{class:r.days===e?`on`:``,onClick:()=>l({days:e}),children:[e,` Tage`]},e))})]}),$(`label`,{class:`ce-row toggle`,children:[$(`span`,{class:`ce-label`,children:`Exklusiv`}),$(`input`,{type:`checkbox`,checked:r.exclusive,onChange:e=>l({exclusive:e.target.checked})}),$(`small`,{class:`muted`,children:[`liefert an niemanden sonst, kostet `,Lt.exclusivePct,` % oder Angst`]})]})]}),$(`div`,{class:`ce-foot`,children:[!a&&$(Fy,{text:`Annahmechance: Preis, Loyalität, Angst und frühere Erfahrungen gegen die Schwelle des Bauern.`,children:[`Chance `,$(`b`,{class:Gy(o),children:dv(o)})]}),$(`button`,{class:`btn`,onClick:()=>kv.value=null,children:`Abbrechen`}),$(`button`,{class:`btn primary`,disabled:c<=0,onClick:()=>{t.command({type:`offerContract`,farm:e,offer:i}),kv.value=null},children:a?`Übernehmen`:`Abschicken`})]})]})}function $y({i:e}){vv.value;let t=Bv(),n=t.state,r=n.farms[e];if(kv.value?.farm===e)return $(Qy,{i:e});if(r.owner===`gang`)return $(`p`,{class:`small-text muted fc-note`,children:[`Liefert an `,Tf,`. Einen Vertrag gibt es erst, wenn der Hof nicht mehr der Gang gehört.`,r.closedUntil>=n.day?` Vom Lebensmittelamt geschlossen bis Tag ${r.closedUntil+1}.`:``]});let i=r.contract;if(i&&i.endDay>=n.day){let a=Ft[e].fruits.filter(e=>(i.crates[e]??0)>0).map(e=>`${i.crates[e]} ${vf[e]}`),o=r.owner===`player`;return $(`div`,{class:`contract-box`,children:[$(Fy,{text:o?`Eigener Hof: Die Ware kommt jeden Morgen zu Erzeugerkosten, ohne Vertragsende.`:`Vertrag: Die Lieferung kommt jeden Morgen um 06:00 und wird beim Abladen bezahlt.`,children:[$(`b`,{children:[o?`Eigener Hof`:`Vertrag`,`:`]}),` `,a.join(` und `),` pro Tag`,o?` zu Erzeugerkosten`:`, ${i.pricePct} %, ${i.startDay>n.day?`ab morgen`:`bis Tag ${i.endDay+1}`}`,i.exclusive&&!o?`, exklusiv`:``,i.priceLock?`, Preis fest`:``,r.credit>0?`, Vorschuss ${sv(r.credit)}`:``]}),$(`div`,{class:`row-btns`,children:[!o&&i.endDay-n.day<=2&&$(`button`,{class:`btn small primary`,onClick:()=>t.command({type:`renewContract`,farm:e}),children:`Verlängern`}),$(`button`,{class:`btn small`,onClick:()=>kv.value=Xy(e,{crates:i.crates,pricePct:i.pricePct,days:i.days,exclusive:i.exclusive}),children:o?`Mengen ändern`:`Ändern`}),!o&&$(`button`,{class:`btn small`,onClick:()=>t.command({type:`cancelContract`,farm:e}),children:`Kündigen`})]})]})}let a=jp(n,t.world,e),o=Op(n,e,a),s=r.talkDay>n.day;return $(`div`,{class:`contract-box`,children:[$(`button`,{class:`btn primary offer-btn`,disabled:s,onClick:()=>t.command({type:`offerContract`,farm:e,offer:a}),children:[$(`span`,{children:[$(`b`,{children:`Vertrag anbieten`}),$(`small`,{children:s?`${Sf[e]} verhandelt erst morgen wieder`:Yy(e,a)})]}),!s&&$(`span`,{class:`chance ${Gy(o)}`,children:dv(o)})]}),$(`button`,{class:`link-btn`,disabled:s,onClick:()=>kv.value=Xy(e,a),children:`Bedingungen ändern`})]})}var eb={clean:`sauber`,pressure:`Druck`,dirty:`schmutzig`};function tb({i:e,id:t}){vv.value;let n=Bv(),r=n.state,i=Rt[t],a=Jp(r,e,t),o=Kp(r,e,t),s=qp(r,e,t);return $(`button`,{class:`action-card ${i.kind}`,disabled:!!a,onClick:()=>n.command({type:`farmAction`,farm:e,action:t}),children:[$(`span`,{class:`ac-top`,children:[$(`b`,{children:wf[t]}),$(`span`,{class:`kind ${i.kind}`,children:i.heat>0?`Druck +${i.heat}`:eb[i.kind]})]}),$(`small`,{children:Zp(t)}),$(`span`,{class:`ac-foot`,children:[$(`span`,{children:o>0?sv(o):t===`helpers`||t===`protect`?`${i.fighters} Kämpfer`:`kostenlos`}),$(`span`,{class:Gy(s),children:a??`Chance ${dv(s)}`})]})]})}var nb={advance:`Du hast im Voraus bezahlt.`,helpers:`Du hast Erntehelfer gestellt.`,hailHelp:`Du hast nach dem Hagel geholfen.`,bind:`Du hast einen langfristigen Vertrag angeboten.`,protect:`Du hast Schutz durch deine Leute angeboten.`,refuse:`Du hast eine Lieferung nicht abgenommen.`,soil:`Du hast Bodenproben fälschen lassen.`,hailPenalty:`Du hast nach dem Hagel eine Vertragsstrafe verlangt.`,cancel:`Du hast den Vertrag gekündigt.`,takeover:`Du hast den Hof übernommen.`};function rb({i:e,tab:t}){vv.value;let n=Bv(),r=n.state,i=r.farms[e],a=Ft[e],o=xp(r,e),s=i.owner===`gang`?`Gang`:i.owner===`player`?`gehört dir`:`frei`;return $(`div`,{class:`farm-card`,children:[$(`div`,{class:`fc-head`,children:[$(Hy,{farm:e,size:48}),$(`div`,{class:`fc-title`,children:[$(`b`,{children:xf[e]}),$(`small`,{children:[Sf[e],`, `,Cf[a.trait]]}),$(`small`,{class:`muted`,children:om(r,e)})]}),$(`span`,{class:`owner-tag ${i.owner}`,children:s})]}),t===`overview`&&$(x,{children:[$(`div`,{class:`fc-stats small-text`,children:[$(Fy,{text:`Kapazität: So viele Kisten liefert der Hof höchstens pro Tag. Erntehelfer bringen mehr, Hagel halbiert sie.`,children:[$(`b`,{children:Sp(r,e)}),` Kisten/Tag`]}),a.fruits.map(t=>$(Fy,{text:`Preis einer Kiste ${vf[t]} beim jetzigen Vertrag oder zum Grundpreis. Angst und Schutz senken ihn.`,children:[$(`span`,{class:`dot`,style:{background:Wy(Mt[t].color)}}),` `,cv(wp(r,e,t))]},t)),$(Fy,{text:`Qualität: Jeder Stern über zwei bringt 10 % mehr Haltbarkeit und Verkaufspreis, jeder darunter 10 % weniger.`,children:$(qy,{n:i.quality})})]}),$(`div`,{class:`fc-bars`,children:[$(Jy,{label:`Loyalität`,value:i.loyalty,kind:`loyalty`,text:`Loyalität steigt langsam mit laufenden Verträgen und sauberen Aktionen, sinkt bei Druck, Kündigung und vollem Lager.`}),$(Jy,{label:`Angst`,value:i.fear,kind:`fear`,text:`Angst senkt sofort die Preise und sinkt um 5 pro Tag ohne neuen Druck. Über 60 Angst und unter 20 Loyalität läuft ein Bauer über oder sagt aus.`})]}),i.owner===`free`&&!Ep(i,r.day)?$($y,{i:e}):$(`div`,{class:`farm-overview-contract`,children:[$(`span`,{children:[$(`b`,{children:`Vertrag & Lieferung`}),$(`small`,{children:om(r,e)})]}),$(`button`,{class:`btn small`,onClick:()=>Dv.value=`contract`,children:`Verwalten`})]}),o&&$(`p`,{class:`fc-memory`,children:o})]}),t===`contract`&&$(`div`,{class:`farm-tab-content`,children:[$(`h3`,{children:`Liefervertrag`}),$($y,{i:e})]}),t===`actions`&&$(`div`,{class:`farm-tab-content`,children:[$(`p`,{class:`farm-tab-note`,children:`Aktionen verändern Loyalität, Angst, Kapazität oder Ermittlungsdruck. Kosten und Erfolgschance stehen direkt an jeder Aktion.`}),$(`div`,{class:`fc-actions`,children:Wp(r,e).map(t=>$(tb,{i:e,id:t},t))}),i.guards>0&&$(`button`,{class:`link-btn`,onClick:()=>n.command({type:`withdrawGuards`,farm:e}),children:[`Schutz beenden: `,i.guards,` Kämpfer zurück in den Hof`]})]}),t===`history`&&$(`div`,{class:`farm-tab-content`,children:[$(`h3`,{children:`Was sich der Bauer merkt`}),i.memory.length?$(`ol`,{class:`farm-history`,children:[...i.memory].reverse().map((e,t)=>$(`li`,{children:nb[e]},`${e}-${t}`))}):$(`p`,{class:`muted small-text`,children:`Noch keine besonderen Erinnerungen. Wie du mit dem Hof umgehst, prägt die nächsten Verhandlungen.`})]})]})}function ib(){vv.value;let e=Math.max(0,Math.min(Ft.length-1,Ev.value));return $(`div`,{class:`farms-panel`,children:[$(`nav`,{class:`farm-tabs`,"aria-label":`Hofverwaltung`,children:[{id:`overview`,label:`Übersicht`},{id:`contract`,label:`Vertrag`},{id:`actions`,label:`Aktionen`},{id:`history`,label:`Verlauf`}].map(e=>$(`button`,{class:`farm-tab`,type:`button`,"aria-pressed":Dv.value===e.id,onClick:()=>Dv.value=e.id,children:e.label},e.id))}),$(`div`,{class:`farm-scroll`,children:$(rb,{i:e,tab:Dv.value})})]})}function ab({p:e}){vv.value;let t=Bv(),n=im(t.state,e),r=()=>{Ev.value=e.farm,kv.value=null,Dv.value=`overview`,Ov.value=`normal`,Q.value=`farms`};return $(`div`,{class:`event-card panel`,children:[$(`button`,{class:`ev-body`,onClick:r,children:[n.portrait===`boss`?$(Uy,{size:38}):$(Hy,{farm:e.farm,size:38}),$(`span`,{children:[$(`b`,{children:n.title}),$(`small`,{children:n.text})]})]}),$(`div`,{class:`ev-btns`,children:[$(`button`,{class:`btn small primary`,onClick:()=>{e.kind===`contractEnd`&&n.options[0]===`Verhandeln`?(r(),t.command({type:`answerEvent`,id:e.id,choice:1})):t.command({type:`answerEvent`,id:e.id,choice:0})},children:n.options[0]}),$(`button`,{class:`btn small`,onClick:()=>t.command({type:`answerEvent`,id:e.id,choice:1}),children:n.options[1]})]})]})}function ob(e){return e>=Vt.charges?{cls:`charges`,text:`Anklage droht`}:e>=Vt.investigation?{cls:`investigation`,text:`Ermittlungen`}:e>=Vt.watched?{cls:`watched`,text:`beobachtet`}:{cls:`calm`,text:`ruhig`}}function sb({label:e,value:t,onChange:n}){return $(`label`,{class:`row toggle`,children:[$(`span`,{children:e}),$(`input`,{type:`checkbox`,checked:t,onChange:e=>n(e.target.checked)})]})}function cb({label:e,value:t,onChange:n}){return $(`label`,{class:`row slider`,children:[$(`span`,{children:e}),$(`input`,{type:`range`,min:0,max:1,step:.1,value:t,onInput:e=>n(Number(e.target.value))})]})}function lb(){vv.value;let e=gv.value,t=Bv(),[n,r]=Te([]),i=()=>{k_().then(r).catch(()=>r([]))};De(i,[]);let a=e=>{_v(e),t?.applySettings(gv.value)};return $(`div`,{class:`stack`,children:[$(`h3`,{children:`Ton`}),$(sb,{label:`Ton aus`,value:e.muted,onChange:e=>a({muted:e})}),$(cb,{label:`Effekte`,value:e.effectsVolume,onChange:e=>a({effectsVolume:e})}),$(cb,{label:`Umgebung`,value:e.ambienceVolume,onChange:e=>a({ambienceVolume:e})}),$(`h3`,{children:`Grafik`}),$(sb,{label:`Schatten`,value:e.shadows,onChange:e=>a({shadows:e})}),$(`label`,{class:`row`,children:[$(`span`,{children:`Grafikqualität`}),$(`select`,{value:e.quality,onChange:e=>a({quality:e.target.value}),children:[$(`option`,{value:`low`,children:`Niedrig`}),$(`option`,{value:`medium`,children:`Mittel`}),$(`option`,{value:`high`,children:`Hoch`})]})]}),$(sb,{label:`Umsatzzahlen anzeigen`,value:e.saleNumbers,onChange:e=>a({saleNumbers:e})}),$(sb,{label:`Debug-Anzeige (F3)`,value:e.debug,onChange:e=>a({debug:e})}),$(`h3`,{children:`Speichern`}),$(`label`,{class:`row`,children:[$(`span`,{children:`Autosave-Intervall`}),$(`select`,{value:String(e.autosaveSeconds),onChange:e=>a({autosaveSeconds:Number(e.target.value)}),children:[$(`option`,{value:`30`,children:`30 Sekunden`}),$(`option`,{value:`60`,children:`60 Sekunden`}),$(`option`,{value:`120`,children:`2 Minuten`}),$(`option`,{value:`300`,children:`5 Minuten`})]})]}),x_.filter(e=>e!==`auto`).map(e=>{let r=n[x_.indexOf(e)];return $(`button`,{class:`btn slot`,onClick:async()=>{if(t)try{await E_(e,t.state),Iv(`Gespeichert in ${S_(e)}.`),i()}catch{Iv(`Speichern ist fehlgeschlagen.`,`error`)}},children:[$(`span`,{children:[`Speichern in `,S_(e)]}),$(`small`,{children:r?r.label:`leer`})]},e)}),$(`button`,{class:`btn`,onClick:()=>t&&A_(t.state),children:`Als Datei exportieren`}),$(`button`,{class:`btn`,onClick:()=>{t?.autosave(),yv.value=`menu`},children:`Zum Hauptmenü`}),!1]})}var ub=e=>`#${e.toString(16).padStart(6,`0`)}`;function db(e){return Number.isFinite(e)?e<=0?`leer`:e<1?`${Math.max(1,Math.round(e*16))} Std.`:`${uv(e)} Tage`:`lange`}function fb(e,t){let n=Bv().state,r=null,i=null;for(let a=0;a<z.length;a++){if(!Mf(n,a)||rp(e,a,t)<=0)continue;let o=ap(n,e,a,t);o<=0?i??=yf[z[a]]:(!r||o>r.open)&&(r={name:yf[z[a]],open:o})}let a=[];return r&&r.open>.5&&a.push(`${r.name} sucht`),i&&a.push(`${i} satt`),a.join(`, `)}function pb(e){return Ft.map((e,t)=>t).filter(t=>Ft[t].fruits.includes(e))}function mb(){vv.value;let e=Bv(),t=e.state,n=Af(t),r=t.crates.filter(e=>e.cooled).length,i=Tv.value;return $(x,{children:[$(`div`,{class:`stock-list`,children:Tt.map(r=>{let a=If(t,r),o=ym(t,r),s=o.perDay>0||o.units>0?bm(o.days):`none`,c=Vf(t,r),l=Vp(t,r),u=Mt[r].crateCost*Nt.kioskFactor,d=a&&t.kioskToday<Nt.kioskPerDay&&t.crates.length<n&&t.money>=u,f=t.crates.filter(e=>e.fruit===r).reduce((e,t)=>Math.min(e,t.fresh),1);return $(`div`,{class:`stock-item ${i===r?`open`:``}`,children:[$(`div`,{class:`stock-row ${a?``:`locked`}`,children:[$(`button`,{class:`sr-name`,onClick:()=>Tv.value=i===r?null:r,children:[$(`span`,{class:`crate-icon`,style:{background:ub(Mt[r].color)},children:c>0?$(`b`,{children:c}):null}),$(`span`,{class:`sr-main`,children:[$(`b`,{children:vf[r]}),a?$(`small`,{class:`muted`,children:fb(e.world,r)||(c?`älteste Kiste ${dv(f)} frisch`:`kein Bestand`)}):$(`small`,{class:`muted`,children:[$(Oy,{size:11}),` wächst nur auf Gang-Höfen`]})]})]}),$(Fy,{class:`range ${s}`,text:o.perDay>0?`Reichweite: ${lv(o.units)} Stück im Bestand und die Lieferungen der nächsten Tage bei etwa ${lv(o.perDay)} verkauften Stück pro Tag.`:`Reichweite: Von dieser Sorte wurde in den letzten Tagen nichts verkauft.`,children:o.perDay>0?db(o.days):o.units>0?`${lv(o.units)} St.`:`–`}),$(Fy,{class:`sr-tomorrow`,text:`Lieferung morgen um 06:00 aus deinen Verträgen mit den Höfen, bezahlt beim Abladen.`,children:[$(`small`,{children:`morgen`}),` `,$(`b`,{class:`mono`,children:l})]}),$(`button`,{class:`btn small kiosk-btn`,disabled:!d,onClick:()=>e.command({type:`kioskBuy`,fruit:r}),children:[`Kiosk `,sv(u)]})]}),i===r&&$(`div`,{class:`sr-farms`,children:pb(r).map(e=>$(`button`,{class:`sr-farm`,onClick:()=>{Ev.value=e,kv.value=null,Q.value=`farms`},children:[$(`b`,{children:xf[e]}),$(`span`,{class:`muted`,children:om(t,e)}),$(`span`,{class:`link`,children:`Zum Hof`})]},e))})]},r)})}),$(`div`,{class:`stock-foot small-text`,children:[$(Fy,{text:`Belegung: Kisten im Lager. Jedes Regal fasst 6 Kisten, mehr Regale über das Plus in der Halle.`,children:[`Lager `,t.crates.length,`/`,n]}),$(Fy,{text:t.coldRoom?`Im Kühlraum hält Obst etwa doppelt so lange. Belegt wird er automatisch mit den verderblichsten Sorten.`:`Ohne Kühlraum verdirbt Obst nach der normalen Haltbarkeit. Bauen lässt er sich unter Bauen.`,children:t.coldRoom?`Kühlung ${r}/${Nt.coldRoomCrates}`:`kein Kühlraum`}),$(Fy,{text:`Kiosk um die Ecke: höchstens ${Nt.kioskPerDay} Kisten pro Tag zum doppelten Grundpreis, sofort im Lager.`,children:[`Kiosk `,t.kioskToday,`/`,Nt.kioskPerDay]}),$(Fy,{text:`Vertriebsqualität: wie gut deine Verkäufer Sorten und Viertel wählen. Steigt nur durch Ausbau des Hauptquartiers.`,children:[`Vertrieb `,dv(t.salesQuality)]})]}),$(`p`,{class:`sheet-intro`,children:`Nachschub kommt nur über Verträge mit Höfen. Tippe eine Sorte an, um zu sehen, wer sie anbaut. Jedes Viertel kauft je Sorte nur eine begrenzte Menge, gemischt verdienst du mehr.`})]})}function hb(e,t,n){let r=t.spot===null?``:e.spots[t.spot].name;switch(t.mode){case`idle`:return t.load.length?`Sucht einen freien Platz`:n?`Holt Obst`:`Wartet auf Obst`;case`loading`:return`Nimmt Kisten auf`;case`toSpot`:return`Unterwegs: ${r}`;case`setup`:return`Baut auf: ${r}`;case`selling`:return`Verkauft: ${r}`;case`packing`:return`Baut ab`;case`toWarehouse`:return`Zurück zum Lager`}}function gb(){vv.value;let e=Bv(),t=e.state,n=Df(t),r=Lf(t,e.world),i=t.dealers.length>=r,a=kf(t),o=0;for(let e=0;e<5;e++)o+=a+e*Zt.costPerOwned;let s=Bf(t),c=s?Mf(t,z.indexOf(s.unlock)):!1;return $(x,{children:[$(`div`,{class:`people-grid`,children:[$(`div`,{class:`people-card`,children:[$(`span`,{class:`pc-title`,children:`Verkäufer`}),$(Fy,{text:`Verkäufer arbeiten selbstständig. Höchstens zwei pro Verkaufsplatz, in deinen Vierteln gibt es Platz für ${r}.`,children:[$(`b`,{class:`pc-count`,children:t.dealers.length}),$(`small`,{children:[` von `,r]})]}),$(`button`,{class:`btn primary`,disabled:i||t.money<n,onClick:()=>e.command({type:`hireDealer`}),children:[$(Dy,{size:16}),` `,sv(n)]}),i&&$(`small`,{class:`neg`,children:`Alle Plätze besetzt`})]}),$(`div`,{class:`people-card`,children:[$(`span`,{class:`pc-title`,children:`Kämpfer`}),$(Fy,{text:`Straßenkämpfer warten im Hof und erobern Viertel im Würfelduell. Jeder weitere kostet ${Zt.costPerOwned} € mehr.`,children:[$(`b`,{class:`pc-count`,children:t.fighters}),$(`small`,{children:` im Hof`})]}),$(`div`,{class:`row-btns`,children:[$(`button`,{class:`btn primary`,disabled:t.money<a||t.fighters>=Zt.max,onClick:()=>e.command({type:`hireFighter`}),children:[$(Ey,{size:16}),` `,sv(a)]}),$(`button`,{class:`btn`,disabled:t.money<o||t.fighters+5>Zt.max,onClick:()=>e.command({type:`hireFighter`,count:5}),children:[`5 für `,sv(o)]})]})]})]}),s&&$(`div`,{class:`upgrade`,children:[$(`div`,{children:[$(`b`,{children:[bf[s.id],` für alle`]}),$(`small`,{children:[`Jeder Verkäufer trägt `,s.crates,` Kisten statt `,Rf(t),s.speed>Yt[0].speed?` und ist schneller`:``,`.`]})]}),c?$(`button`,{class:`btn small primary`,disabled:t.money<s.cost,onClick:()=>e.command({type:`buyUpgrade`}),children:sv(s.cost)}):$(`span`,{class:`small-text muted`,children:[$(Oy,{size:12}),` nach Eroberung: `,yf[s.unlock]]})]}),$(`div`,{class:`dealer-list`,children:t.dealers.map(n=>$(`button`,{class:`dealer-row`,onClick:()=>{wv.value=n.id,Q.value=null,e.followDealer(n.id)},children:[$(`b`,{children:n.name}),$(`span`,{class:`muted`,children:hb(e.world,n,t.crates.length>0)}),$(`span`,{class:`mono`,children:sv(n.earnedToday)})]},n.id))})]})}function _b(){vv.value;let e=Bv(),t=e.state,n=Of(t),r=t.shelves<jf(e.world);return $(`div`,{class:`build-list`,children:[$(`div`,{class:`build-item`,children:[$(`div`,{children:[$(`b`,{children:`Regal`}),$(`small`,{children:[`+`,Xt.cratesPerShelf,` Kisten Platz, jetzt `,t.shelves,` von `,jf(e.world),`. Auch über das Plus in der Halle.`]})]}),$(`button`,{class:`btn primary`,disabled:!r||t.money<n,onClick:()=>e.command({type:`buyShelf`}),children:r?sv(n):`voll`})]}),$(`div`,{class:`build-item`,children:[$(`div`,{children:[$(`b`,{children:`Kühlraum`}),$(`small`,{children:[Nt.coldRoomCrates,` Kisten bleiben etwa doppelt so lange frisch. Bananen lassen sich nicht kühlen.`]})]}),$(`button`,{class:`btn primary`,disabled:t.coldRoom||t.money<Nt.coldRoomCost,onClick:()=>e.command({type:`buyColdRoom`}),children:t.coldRoom?`gebaut`:sv(Nt.coldRoomCost)})]})]})}function vb(){vv.value;let e=Bv().state,t=Ff(e);return $(x,{children:[$(`div`,{class:`act-head`,children:[$(`span`,{class:`act-tag`,children:`Akt 1`}),$(`b`,{children:`Die Straße`}),$(`p`,{class:`sheet-intro`,children:`Vom Untergrund ins Bankenviertel: Bring alle sechs Viertel der Stadt unter deine Kontrolle.`}),$(`div`,{class:`bar`,children:$(`div`,{style:{width:`${t/z.length*100}%`,background:`var(--green)`}})}),$(`small`,{class:`muted`,children:[t,` von `,z.length,` Vierteln`]})]}),$(`h3`,{children:`Aufträge`}),$(`ul`,{class:`task-list`,children:K_.map((t,n)=>$(`li`,{class:n<e.story?`done`:n===e.story?`current`:``,children:[n<e.story?$(Ay,{size:14}):$(`span`,{class:`task-dot`}),$(`span`,{children:[$(`b`,{children:t.title}),n===e.story?` · ${t.text}`:``]})]},n))})]})}function yb(e){return e>=.85?`sehr gut`:e>=.6?`gut`:e>=.4?`offen`:e>=.15?`schlecht`:`sehr schlecht`}function bb(){vv.value;let e=Bv(),t=e.state,n=Cv.value;if(n===null||!t.districts[n])return null;let r=z[n],i=t.districts[n],a=Gt[r],o=Pf(t,e.world,n),s=Kv(t.fighters,i.gang),c=Ut[r],l=[...Tt].sort((e,t)=>c[t]-c[e]).slice(0,2).map(e=>vf[e]),u=e.world.spots.filter(e=>e.district===r).length;return i.owner===`player`?$(`p`,{class:`sheet-intro`,children:[yf[r],` gehört dir.`]}):$(x,{children:[$(`div`,{class:`attack-head`,children:[$(`div`,{children:[$(`span`,{class:`gang-tag`,children:`Gemüsegang`}),$(`b`,{children:[i.gang,` Kämpfer`]})]}),$(`div`,{children:[$(`span`,{class:`own-tag`,children:`Deine Leute`}),$(`b`,{children:[t.fighters,` Kämpfer`]})]})]}),$(`p`,{class:`sheet-intro`,children:[`Nach der Eroberung: `,u,` neue Verkaufsplätze, Preise `,dv(a.priceLevel-1),` höher als im Untergrund , gefragt sind vor allem `,l.join(` und `),`. Pro Platz kauft das Viertel etwa `,lv(Ht.demandPerSpot),` Stück am Tag.`]}),o?t.fighters===0?$(`button`,{class:`btn primary big`,onClick:()=>Q.value=`people`,children:[$(Ey,{size:18}),` Erst Kämpfer anheuern`]}):$(x,{children:[$(`p`,{class:`small-text`,children:$(Fy,{text:`Siegchance: exakt berechnet aus deinen und den gegnerischen Kämpfern, wenn bis zum Ende gewürfelt wird.`,children:[`Siegchance: `,$(`b`,{class:s>=.6?`pos`:s<.4?`neg`:``,children:dv(s)}),` (`,yb(s),`)`]})}),$(`div`,{class:`sheet-actions`,children:[$(`button`,{class:`btn danger-solid big`,onClick:()=>{e.command({type:`attack`,district:n}),Q.value=null},children:[$(Ey,{size:18}),` Angreifen mit `,t.fighters,` Kämpfern`]}),$(`button`,{class:`btn big`,onClick:()=>Q.value=`people`,children:`Mehr Kämpfer`})]})]}):$(`p`,{class:`small-text muted`,children:[$(Oy,{size:12}),` Dieses Viertel grenzt noch nicht an dein Gebiet. Erobere zuerst ein Nachbarviertel.`]})]})}function xb(){let e=Bv();if(!e)return;let t=K_[e.state.story];if(!t)Q.value=`act`;else switch(t.hint){case`stock`:Q.value=`stock`;break;case`people`:Q.value=`people`;break;case`build`:Q.value=`build`;break;case`farm`:t.farm!==void 0&&(Ev.value=t.farm),kv.value=null,Ov.value=`normal`,Q.value=`farms`;break;case`shelf`:Q.value=null,e.view.focusWarehouse();break;case`district`:{let n=t.district??z.findIndex((t,n)=>Pf(e.state,e.world,n));if(n>=0){let[t,r]=e.world.labels[n];e.focus(t,r+6),e.openDistrict(n)}break}default:Q.value=`act`}}var Sb={green:`Lager reicht`,yellow:`Lager knapp`,red:`Lager leer`,none:`Lager`};function Cb(){vv.value;let e=Bv();if(!e)return null;let t=e.state,n=K_[t.story],{ampel:r,range:i}=xm(t),a=gv.value.muted,o=ob(t.heat);return $(`div`,{class:`topbar`,children:[$(`div`,{class:`money panel`,children:[$(Fy,{text:`Kontostand. Einnahmen kommen aus dem Verkauf, Ausgaben sind Lieferungen, Kiosk, Leute und Bauten.`,children:$(`span`,{class:`money-value`,children:sv(t.money)})}),$(`span`,{class:`money-sub`,children:[`Tag `,t.day+1,` · `,fm(t)]})]}),$(`button`,{class:`ampel panel ${r}`,onClick:()=>wb(`stock`),title:`Lagerampel`,children:[$(`span`,{class:`ampel-dot`}),$(`span`,{class:`ampel-text`,children:[$(`b`,{children:Sb[r]}),$(`small`,{children:i?`${vf[i.fruit]} ${i.perDay>0?db(i.days):``}`:`${t.crates.length} Kisten`})]})]}),$(Fy,{class:`heat panel ${o.cls}`,text:`Ermittlungsdruck ${Math.round(t.heat)} von 100 (${o.text}): steigt durch Druck und schmutzige Aktionen bei Bauern, sinkt um ${Vt.decayPerDay} pro Tag ohne neuen Druck.`,children:[$(Py,{size:17}),$(`b`,{class:`mono`,children:Math.round(t.heat)})]}),$(`button`,{class:`objective panel`,onClick:xb,title:`Auftrag: antippen für Hilfe`,children:[$(ky,{size:18}),$(`span`,{class:`obj-text`,children:n?$(x,{children:[$(`b`,{children:[n.title,`:`]}),` `,n.text]}):$(`b`,{children:`Die ganze Stadt gehört dir.`})})]}),$(`div`,{class:`controls panel`,children:[$(`button`,{class:`icon-btn`,"aria-label":a?`Ton an`:`Ton aus`,title:`Ton`,onClick:()=>_v({muted:!a}),children:$(a?My:jy,{size:18})}),$(`button`,{class:`icon-btn ${bv.value===0?`active`:``}`,"aria-label":bv.value===0?`Weiter`:`Pause`,title:`Pause (Leertaste)`,onClick:()=>e.togglePause(),children:bv.value===0?$(fy,{size:16}):$(dy,{size:16})}),$(`button`,{class:`icon-btn speed-btn ${bv.value>1?`active`:``}`,"aria-label":`Tempo`,title:`Tempo 1x, 2x, 4x`,onClick:()=>e.setSpeed(bv.value>=3?1:bv.value+1),children:[$(py,{size:15}),$(`span`,{children:bv.value===0?`1x`:[``,`1x`,`2x`,`4x`][bv.value]})]}),$(`button`,{class:`icon-btn`,"aria-label":`Einstellungen`,title:`Einstellungen`,onClick:()=>wb(`settings`),children:$(uy,{size:18})})]})]})}function wb(e){e===`farms`&&Q.value!==`farms`&&(Ov.value=`normal`),Q.value=Q.value===e?null:e,wv.value=null}function Tb(){vv.value;let e=Bv();if(!e)return null;let t=e.state,n=K_[t.story]?.hint,{ampel:r}=xm(t),i=t.farms.filter(e=>Ep(e,t.day)).length,a=[{id:`stock`,icon:Ty,label:`Lager`,sub:`${t.crates.length}/${Af(t)} Kisten`,warn:r===`red`},{id:`farms`,icon:Ny,label:`Höfe`,sub:`${i} ${i===1?`Vertrag`:`Verträge`}`,badge:t.pending.length},{id:`people`,icon:Dy,label:`Leute`,sub:`${t.dealers.length} V · ${t.fighters} K`},{id:`build`,icon:ly,label:`Bauen`,sub:`${t.shelves} Regale`},{id:`act`,icon:Ey,label:`Akt 1`,sub:`${Ff(t)}/6 Viertel`}],o={stock:`stock`,people:`people`,build:`build`,farm:`farms`};return $(`div`,{class:`actionbar`,children:a.map(e=>$(`button`,{class:`action panel ${Q.value===e.id?`active`:``} ${o[n??``]===e.id||e.warn?`hint`:``} ${e.warn?`warn`:``}`,onClick:()=>wb(e.id),children:[$(e.icon,{size:20}),e.badge?$(`span`,{class:`badge`,children:e.badge}):null,$(`span`,{class:`action-text`,children:[$(`b`,{children:e.label}),$(`small`,{children:e.sub})]})]},e.id))})}var Eb={stock:`Lager`,farms:`Höfe`,people:`Leute`,build:`Bauen`,act:`Akt 1: Die Straße`,attack:`Viertel`,settings:`Einstellungen`};function Db(){vv.value;let e=Bv(),t=Q.value,n=F(null);if(!e||!t)return null;let r=t===`attack`&&Cv.value!==null?yf[z[Cv.value]]:Eb[t];return $(`section`,{class:`sheet panel sheet-${t} ${t===`farms`?`farm-sheet-${Ov.value}`:``}`,children:[$(`header`,{onPointerDown:e=>{n.current={y:e.clientY},e.target.closest(`button`)||e.currentTarget.setPointerCapture?.(e.pointerId)},onPointerUp:e=>{let r=n.current;if(n.current=null,!r)return;let i=e.clientY-r.y;if(t===`farms`&&Math.abs(i)>35){let e=Ov.value;i<0?Ov.value=e===`collapsed`?`normal`:`expanded`:e===`expanded`?Ov.value=`normal`:e===`normal`?Ov.value=`collapsed`:Q.value=null}else i>40&&(Q.value=null)},children:[$(`span`,{class:`grabber`}),$(`h2`,{children:r}),$(`button`,{class:`icon-btn`,"aria-label":`Schließen`,onClick:()=>Q.value=null,children:$(yy,{size:18})})]}),$(`div`,{class:`sheet-body`,children:[t===`stock`&&$(mb,{}),t===`farms`&&$(ib,{}),t===`people`&&$(gb,{}),t===`build`&&$(_b,{}),t===`act`&&$(vb,{}),t===`attack`&&$(bb,{}),t===`settings`&&$(lb,{})]})]})}function Ob(){vv.value;let e=Bv(),t=wv.value;if(!e||t===null||Q.value)return null;let n=e.state.dealers.find(e=>e.id===t);return n?$(`div`,{class:`dealer-card panel`,children:[$(`div`,{class:`row`,children:[$(`b`,{children:n.name}),$(`button`,{class:`icon-btn`,"aria-label":`Schließen`,onClick:()=>wv.value=null,children:$(yy,{size:16})})]}),$(`span`,{class:`muted small-text`,children:hb(e.world,n,e.state.crates.length>0)}),$(`span`,{class:`small-text`,children:[`Trägt: `,n.load.length?n.load.map(e=>`${e.units} ${vf[e.fruit]}`).join(`, `):`nichts`,` (`,vg(n),` Stück)`]}),$(`span`,{class:`small-text`,children:[`Heute: `,lv(n.soldToday),` verkauft, `,cv(n.earnedToday)]})]}):null}function kb(){let e=jv.value;return e?$(`button`,{class:`explain panel`,onClick:()=>jv.value=null,children:[$(xy,{size:16}),$(`span`,{children:e.text})]}):null}function Ab(){vv.value;let e=Bv();if(!e||!e.state.won||Av.value||e.state.battle)return null;let t=e.state;return $(`div`,{class:`modal-backdrop`,children:$(`div`,{class:`modal panel win`,children:[$(`header`,{children:$(`h2`,{children:`Vom Untergrund ins Bankenviertel`})}),$(`div`,{class:`modal-body`,children:[$(`p`,{children:`Das Bankenviertel gehört dir. Aus einer Lagerhalle im Untergrund ist ein Obsthandel geworden, den die ganze Stadt kennt.`}),$(`ul`,{class:`events`,children:[$(`li`,{children:[`Spieltage: `,t.day+1]}),$(`li`,{children:[`Verkauft: `,lv(t.stats.sold),` Stück, `,sv(t.earnedTotal),` Umsatz`]}),$(`li`,{children:[`Viertel: `,Ff(t),` von `,z.length,`, Kämpfe gewonnen: `,t.stats.battlesWon,`, verloren: `,t.stats.battlesLost]})]}),$(`p`,{class:`muted small-text`,children:`Das Spiel geht weiter, solange du willst.`})]}),$(`footer`,{children:$(`button`,{class:`btn primary`,onClick:()=>Av.value=!0,children:`Weiterspielen`})})]})})}var jb={warning:by,danger:by,unlock:Cy,story:ky,money:Ty,delivery:Sy,info:xy};function Mb(){vv.value;let e=Bv(),t=performance.now(),n=Pv.value.filter(e=>t-e.time<6e3),r=e&&!Q.value&&!e.state.battle?e.state.pending.slice(0,2):[];return!e||!n.length&&!r.length?null:$(`div`,{class:`notices`,children:[r.map(e=>$(ab,{p:e},e.id)),r.length>0&&e.state.pending.length>r.length&&$(`span`,{class:`more-events`,children:[`+`,e.state.pending.length-r.length,` weitere unter Höfe`]}),n.map(t=>{let n=jb[t.kind]??xy;return $(`button`,{class:`notice panel ${t.kind}`,onClick:()=>{t.x!==void 0&&t.y!==void 0&&e.focus(t.x+.5,t.y+4),Pv.value=Pv.value.filter(e=>e.id!==t.id)},children:[$(n,{size:16}),$(`span`,{children:t.text})]},t.id)})]})}function Nb(){let e=document,t=document.documentElement;if(document.fullscreenElement||e.webkitFullscreenElement){document.exitFullscreen?.().catch(()=>void 0);return}let n=t.requestFullscreen?.bind(t)??t.webkitRequestFullscreen?.bind(t);Promise.resolve(n?.()).then(()=>screen.orientation?.lock?.(`landscape`)).catch(()=>void 0)}function Pb(){let e=Bv();if(!e)return null;let t=e.view.rig;return $(`div`,{class:`cam-controls`,children:[$(`button`,{class:`icon-btn round`,"aria-label":`Links drehen (Q)`,onClick:()=>t.rotate(-1),children:$(my,{size:17})}),$(`button`,{class:`icon-btn round`,"aria-label":`Rechts drehen (E)`,onClick:()=>t.rotate(1),children:$(hy,{size:17})}),$(`button`,{class:`icon-btn round`,"aria-label":`Vergrößern`,onClick:()=>t.zoomStep(-1),children:$(gy,{size:17})}),$(`button`,{class:`icon-btn round`,"aria-label":`Verkleinern`,onClick:()=>t.zoomStep(1),children:$(_y,{size:17})}),$(`button`,{class:`icon-btn round`,"aria-label":`Vollbild`,onClick:Nb,children:$(vy,{size:17})})]})}function Fb(){vv.value;let e=Bv();if(!e||!gv.value.debug)return null;let t=e.state;return $(`div`,{class:`debug mono`,children:[$(`div`,{children:[`FPS `,e.fps]}),$(`div`,{children:[`Draw Calls `,e.view.stats.drawCalls]}),$(`div`,{children:[`Dreiecke `,lv(e.view.stats.triangles)]}),$(`div`,{children:[`Ticks/s `,e.tps]}),$(`div`,{children:[`Entitäten `,t.peds.length+t.vehicles.length+t.dealers.length,` (Passanten `,t.peds.length,`, Verkäufer `,t.dealers.length,`, Fahrzeuge`,` `,t.vehicles.length,`)`]})]})}function Ib(){let e=xv.value;return e?$(`div`,{class:`toast ${e.kind}`,children:e.text}):null}function Lb(){return Sv.value?null:$(`div`,{class:`portrait-hint`,children:$(`div`,{class:`panel`,children:[$(wy,{size:40}),$(`p`,{children:`Das Spiel ist für das Querformat gedacht. Bitte das Gerät drehen.`}),$(`button`,{class:`btn`,onClick:()=>Sv.value=!0,children:`Trotzdem fortfahren`})]})})}function Rb({onNew:e,onLoad:t}){let[n,r]=Te([]),[i,a]=Te(`main`),o=()=>{k_().then(r).catch(()=>r([]))};De(o,[]);let s=n.filter(e=>!!e).sort((e,t)=>e.savedAt<t.savedAt?1:-1)[0],c=async e=>{try{let n=await D_(e);n&&t(n.state)}catch(e){Iv(e instanceof d_?e.message:`Der Spielstand konnte nicht geladen werden.`,`error`)}};return $(`div`,{class:`menu-screen`,children:$(`div`,{class:`menu-card`,children:[$(`div`,{class:`menu-title`,children:[$(`h1`,{children:`Obst-Tycoon`}),$(`p`,{children:`Vom Untergrund ins Bankenviertel: Kaufe Obst kistenweise, schick Verkäufer auf die Straße und erobere die Stadt von der Gemüsegang.`})]}),i===`main`&&$(`div`,{class:`menu-buttons`,children:[$(`button`,{class:`btn primary`,onClick:e,children:`Neues Spiel`}),$(`button`,{class:`btn`,disabled:!s,onClick:()=>s&&c(s.slot),children:[`Weiterspielen`,s?` (${s.label})`:``]}),$(`button`,{class:`btn`,onClick:()=>a(`load`),children:`Laden`}),$(`button`,{class:`btn`,onClick:()=>a(`delete`),children:`Löschen`}),$(`button`,{class:`btn`,onClick:async()=>{try{let e=await j_();e&&t(e.state)}catch(e){Iv(e instanceof d_?e.message:`Die Datei konnte nicht gelesen werden.`,`error`)}},children:`Importieren`})]}),i!==`main`&&$(`div`,{class:`menu-buttons`,children:[x_.map((e,t)=>{let r=n[t];return $(`button`,{class:`btn slot ${i===`delete`?`danger`:``}`,disabled:!r,onClick:async()=>{r&&(i===`load`?await c(e):(await O_(e),Iv(`${S_(e)} gelöscht.`),o()))},children:[$(`span`,{children:S_(e)}),$(`small`,{children:r?r.label:`leer`})]},e)}),$(`button`,{class:`btn`,onClick:()=>a(`main`),children:`Zurück`})]})]})})}function zb(e){let t=Bv();t&&(t.load(e,!1),t.setSpeed(1),Av.value=e.won,yv.value=`game`)}function Bb(){return De(()=>{let e=Bv();e&&(e.keyHook=e=>{if(yv.value!==`game`)return;if(e.code===`Escape`){Q.value?Q.value=null:wv.value=null;return}if(e.ctrlKey||e.metaKey||e.altKey)return;let t={KeyL:`stock`,KeyH:`farms`,KeyP:`people`,KeyB:`build`,KeyT:`act`}[e.code];t===`farms`&&Q.value!==`farms`&&(Ov.value=`normal`),t&&(Q.value=Q.value===t?null:t)})},[]),gv.value,yv.value===`menu`?$(x,{children:[$(Rb,{onNew:()=>zb(l_(zm(),{seed:Math.random()*2**31|0})),onLoad:e=>zb(e)}),$(Ib,{})]}):$(x,{children:[Q.value===`farms`&&$(Ky,{}),$(Cb,{}),$(Mb,{}),$(kb,{}),$(Db,{}),$(Ob,{}),$(Tb,{}),$(Pb,{}),$(Fb,{}),$(Zv,{}),$(Ab,{}),$(Ib,{}),$(Lb,{})]})}var Vb=new Rv(document.getElementById(`game-canvas`),l_(zm(),{seed:7}));Vb.demo=!0,Vv(Vb),at(()=>{Vb.applySettings(gv.value)}),at(()=>{document.body.classList.toggle(`in-game`,yv.value===`game`)});var Hb=()=>wt.unlock();for(let e of[`pointerdown`,`touchend`,`click`,`keydown`])window.addEventListener(e,Hb,{capture:!0});at(()=>{let e=gv.value;wt.setVolumes({muted:e.muted,effects:e.effectsVolume,ambience:e.ambienceVolume})}),document.addEventListener(`click`,e=>{e.target?.closest?.(`button, [role="button"]`)&&wt.play(`click`)},{capture:!0});var Ub=Q.value;at(()=>{let e=Q.value;e&&!Ub?wt.play(`sheetOpen`):!e&&Ub&&wt.play(`sheetClose`),Ub=e}),ue($(Bb,{}),document.getElementById(`ui`)),window.__game=Vb;