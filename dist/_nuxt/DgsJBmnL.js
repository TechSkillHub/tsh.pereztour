import{_ as K,o as u,c as L,a as O,d as b,j as I,i as v,H as z,a5 as F,J as j,p as q,a6 as J,a7 as Q,M as W,f as p,h as s,F as y,m as R,g,n as H,a8 as V,k as $,t as C,a9 as X,aa as G,ab as Y,A as x,B as Z,ac as T,ad as P,ae as B,af as A,ag as ee,ah as te,ai as ne,aj as oe,s as ae,ak as se,al as re,am as ie,an as le}from"./BGy_bEaH.js";const ce={};function ue(t,a){const e=O;return u(),L(e,{name:"material-symbols:menu",size:"40",class:"text-white"})}const de=K(ce,[["render",ue]]),D=b({__name:"SocialIcon",props:{icon:{},url:{}},setup(t){return(a,e)=>{const r=O,n=z;return u(),L(n,{href:a.url,target:"_blank","aria-label":"Social Link"},{default:I(()=>[v(r,{name:a.icon,size:"20"},null,8,["name"])]),_:1},8,["href"])}}}),M=[{title:"X",url:"https://x.com/",icon:"fa6-brands:x-twitter"},{title:"instagram",url:"https://instagram.com/",icon:"fa6-brands:instagram"},{title:"Facebook",url:"https://facebook.com/",icon:"fa6-brands:facebook"},{title:"YouTube",url:"https://youtube.com/",icon:"fa6-brands:youtube"}],E=[{title:"Home",link:"/"},{title:"Quem somos",link:"/#quem-somos"},{title:"Destaques",link:"/#destaques"},{title:"Consultoria",link:"/#consultoria"},{title:"Contato",link:"/#contato"}],fe={class:"flex items-center justify-between container mx-auto w-full"},me={class:"md:hidden"},_e={class:"hidden md:block bg-gradient text-white p-6 rounded-full"},pe={class:"flex gap-2 text-sm font-sans items-center"},ve={class:"divide-y font-sans"},ge={class:"follow"},ye={class:"social flex space-x-5 mt-4"},he=b({__name:"Header",setup(t){const a=F(),e=j(!1),r=()=>{e.value=!e.value},n=j(0),i=()=>{n.value=window.scrollY};q(e,f=>{f?document.body.style.setProperty("overflow","hidden"):document.body.style.removeProperty("overflow")},{immediate:!0});const l=f=>{f.key==="Escape"&&e.value&&(e.value=!1)};return J(()=>{document.addEventListener("keydown",l),window.addEventListener("scroll",i)}),Q(()=>{window.removeEventListener("scroll",i)}),W(()=>{document.removeEventListener("keydown",l)}),(f,c)=>{const _=V,h=de,o=z,k=D;return u(),p(y,null,[s("nav",{class:H(["fixed w-full p-6 text-header h-header flex transition-all ease-in-out duration-700 z-40",g(n)>100?"!bg-[#171717] !bg-opacity-80 backdrop-blur-sm":""])},[s("div",fe,[s("div",null,[v(_)]),s("div",me,[s("button",{onClick:r},[v(h)])]),s("div",_e,[s("ul",pe,[(u(!0),p(y,null,R(g(E),(d,m)=>(u(),p("li",{key:m,class:""},[v(o,{to:d.link,class:H(["py-3 px-5 text-nowrap rounded-full",g(a).currentRoute.value.fullPath==d.link?"bg-gradient-active":""])},{default:I(()=>[$(C(d.title),1)]),_:2},1032,["to","class"])]))),128))])])])],2),s("aside",{class:H(["p-5 pt-header transform -top-header left-0 w-full bg-darkBg text-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30",g(e)?"translate-y-header":"-translate-y-full"])},[s("ul",ve,[(u(!0),p(y,null,R(g(E),(d,m)=>(u(),p("li",{key:m},[v(o,{to:d.link,onClick:c[0]||(c[0]=w=>e.value=!1),class:"my-4 inline-block"},{default:I(()=>[$(C(d.title),1)]),_:2},1032,["to"])]))),128))]),s("div",ge,[c[1]||(c[1]=s("p",{class:"italic font-sans text-sm mt-4"},"Nos siga nas redes sociais:",-1)),s("div",ye,[(u(!0),p(y,null,R(g(M),(d,m)=>(u(),L(k,{key:m,icon:d.icon,url:d.url},null,8,["icon","url"]))),128))])])],2)],64)}}}),ke=K(he,[["__scopeId","data-v-c0a9293e"]]),xe=b({props:{vnode:{type:Object,required:!0},route:{type:Object,required:!0},vnodeRef:Object,renderKey:String,trackRootNodes:Boolean},setup(t){const a=t.renderKey,e=t.route,r={};for(const n in t.route)Object.defineProperty(r,n,{get:()=>a===t.renderKey?t.route[n]:e[n],enumerable:!0});return X(Y,G(r)),()=>x(t.vnode,{ref:t.vnodeRef})}}),be=b({name:"NuxtPage",inheritAttrs:!1,props:{name:{type:String},transition:{type:[Boolean,Object],default:void 0},keepalive:{type:[Boolean,Object],default:void 0},route:{type:Object},pageKey:{type:[Function,String],default:null}},setup(t,{attrs:a,slots:e,expose:r}){const n=Z(),i=j(),l=T(Y,null);let f;r({pageRef:i});const c=T(P,null);let _;const h=n.deferHydration();if(n.isHydrating){const o=n.hooks.hookOnce("app:error",h);F().beforeEach(o)}return t.pageKey&&q(()=>t.pageKey,(o,k)=>{o!==k&&n.callHook("page:loading:start")}),()=>x(re,{name:t.name,route:t.route,...a},{default:o=>{const k=Re(l,o.route,o.Component),d=l&&l.matched.length===o.route.matched.length;if(!o.Component){if(_&&!d)return _;h();return}if(_&&c&&!c.isCurrent(o.route))return _;if(k&&l&&(!c||c!=null&&c.isCurrent(l)))return d?_:null;const m=B(o,t.pageKey);!n.isHydrating&&!Le(l,o.route,o.Component)&&f===m&&n.callHook("page:loading:end"),f=m;const w=!!(t.transition??o.route.meta.pageTransition??A),U=w&&we([t.transition,o.route.meta.pageTransition,A,{onAfterLeave:()=>{n.callHook("page:transition:finish",o.Component)}}].filter(Boolean)),N=t.keepalive??o.route.meta.keepalive??ee;return _=te(se,w&&U,ne(N,x(oe,{suspensible:!0,onPending:()=>n.callHook("page:start",o.Component),onResolve:()=>{ae(()=>n.callHook("page:finish",o.Component).then(()=>n.callHook("page:loading:end")).finally(h))}},{default:()=>{const S=x(xe,{key:m||void 0,vnode:e.default?x(y,void 0,e.default(o)):o.Component,route:o.route,renderKey:m||void 0,trackRootNodes:w,vnodeRef:i});return N&&(S.type.name=o.Component.type.name||o.Component.type.__name||"RouteProvider"),S}}))).default(),_}})}});function we(t){const a=t.map(e=>({...e,onAfterLeave:e.onAfterLeave?ie(e.onAfterLeave):void 0}));return le(...a)}function Re(t,a,e){if(!t)return!1;const r=a.matched.findIndex(n=>{var i;return((i=n.components)==null?void 0:i.default)===(e==null?void 0:e.type)});return!r||r===-1?!1:a.matched.slice(0,r).some((n,i)=>{var l,f,c;return((l=n.components)==null?void 0:l.default)!==((c=(f=t.matched[i])==null?void 0:f.components)==null?void 0:c.default)})||e&&B({route:a,Component:e})!==B({route:t,Component:e})}function Le(t,a,e){return t?a.matched.findIndex(n=>{var i;return((i=n.components)==null?void 0:i.default)===(e==null?void 0:e.type)})<a.matched.length-1:!1}const He={class:"bg-footer text-footer w-full py-8 z-10 relative"},Ie={class:"container flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0"},je={class:"md:w-1/3 md:justify-start"},Be={class:"md:w-1/3 flex justify-end gap-3"},Ke=b({__name:"Footer",setup(t){return(a,e)=>{const r=V,n=D;return u(),p("div",He,[s("div",Ie,[s("div",je,[v(r)]),e[0]||(e[0]=s("div",null,[s("p",{class:"text-center"},"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere arcu ut turpis elementum pellentesque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.")],-1)),s("div",Be,[(u(!0),p(y,null,R(g(M),(i,l)=>(u(),L(n,{key:l,icon:i.icon,url:i.url},null,8,["icon","url"]))),128))])]),e[1]||(e[1]=s("div",{class:"container mt-8 border-t border-offWhite pt-4"},[s("small",{class:"block text-center"},"© 2025 Perez Tour Consulting. Todos os direitos reservados.")],-1))])}}}),Ne={};function Se(t,a){const e=ke,r=be,n=Ke;return u(),p(y,null,[v(e),v(r,{class:"bg-darkBg"}),v(n)],64)}const Ce=K(Ne,[["render",Se],["__scopeId","data-v-4def1725"]]);export{Ce as default};
