(self.webpackChunkclient=self.webpackChunkclient||[]).push([[736],{7394:(t,e,r)=>{"use strict";var o=r(4836);e.Z=void 0;var n=o(r(5649)),a=r(184),l=(0,n.default)((0,a.jsx)("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}),"ArrowBack");e.Z=l},5649:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o.createSvgIcon}});var o=r(4421)},4395:(t,e,r)=>{"use strict";r.d(e,{Z:()=>k});var o=r(3366),n=r(7462),a=r(2791),l=r(3733),i=r(4419),s=r(6934),c=r(1402),u=r(4036),p=r(5527),d=r(5878),f=r(1217);function v(t){return(0,f.Z)("MuiAppBar",t)}(0,d.Z)("MuiAppBar",["root","positionFixed","positionAbsolute","positionSticky","positionStatic","positionRelative","colorDefault","colorPrimary","colorSecondary","colorInherit","colorTransparent","colorError","colorInfo","colorSuccess","colorWarning"]);var Z=r(184);const g=["className","color","enableColorOnDark","position"],m=(t,e)=>t?"".concat(null==t?void 0:t.replace(")",""),", ").concat(e,")"):e,b=(0,s.ZP)(p.Z,{name:"MuiAppBar",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,e["position".concat((0,u.Z)(r.position))],e["color".concat((0,u.Z)(r.color))]]}})((t=>{let{theme:e,ownerState:r}=t;const o="light"===e.palette.mode?e.palette.grey[100]:e.palette.grey[900];return(0,n.Z)({display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",flexShrink:0},"fixed"===r.position&&{position:"fixed",zIndex:(e.vars||e).zIndex.appBar,top:0,left:"auto",right:0,"@media print":{position:"absolute"}},"absolute"===r.position&&{position:"absolute",zIndex:(e.vars||e).zIndex.appBar,top:0,left:"auto",right:0},"sticky"===r.position&&{position:"sticky",zIndex:(e.vars||e).zIndex.appBar,top:0,left:"auto",right:0},"static"===r.position&&{position:"static"},"relative"===r.position&&{position:"relative"},!e.vars&&(0,n.Z)({},"default"===r.color&&{backgroundColor:o,color:e.palette.getContrastText(o)},r.color&&"default"!==r.color&&"inherit"!==r.color&&"transparent"!==r.color&&{backgroundColor:e.palette[r.color].main,color:e.palette[r.color].contrastText},"inherit"===r.color&&{color:"inherit"},"dark"===e.palette.mode&&!r.enableColorOnDark&&{backgroundColor:null,color:null},"transparent"===r.color&&(0,n.Z)({backgroundColor:"transparent",color:"inherit"},"dark"===e.palette.mode&&{backgroundImage:"none"})),e.vars&&(0,n.Z)({},"default"===r.color&&{"--AppBar-background":r.enableColorOnDark?e.vars.palette.AppBar.defaultBg:m(e.vars.palette.AppBar.darkBg,e.vars.palette.AppBar.defaultBg),"--AppBar-color":r.enableColorOnDark?e.vars.palette.text.primary:m(e.vars.palette.AppBar.darkColor,e.vars.palette.text.primary)},r.color&&!r.color.match(/^(default|inherit|transparent)$/)&&{"--AppBar-background":r.enableColorOnDark?e.vars.palette[r.color].main:m(e.vars.palette.AppBar.darkBg,e.vars.palette[r.color].main),"--AppBar-color":r.enableColorOnDark?e.vars.palette[r.color].contrastText:m(e.vars.palette.AppBar.darkColor,e.vars.palette[r.color].contrastText)},{backgroundColor:"var(--AppBar-background)",color:"inherit"===r.color?"inherit":"var(--AppBar-color)"},"transparent"===r.color&&{backgroundImage:"none",backgroundColor:"transparent",color:"inherit"}))})),k=a.forwardRef((function(t,e){const r=(0,c.Z)({props:t,name:"MuiAppBar"}),{className:a,color:s="primary",enableColorOnDark:p=!1,position:d="fixed"}=r,f=(0,o.Z)(r,g),m=(0,n.Z)({},r,{color:s,position:d,enableColorOnDark:p}),k=(t=>{const{color:e,position:r,classes:o}=t,n={root:["root","color".concat((0,u.Z)(e)),"position".concat((0,u.Z)(r))]};return(0,i.Z)(n,v,o)})(m);return(0,Z.jsx)(b,(0,n.Z)({square:!0,component:"header",ownerState:m,elevation:4,className:(0,l.Z)(k.root,a,"fixed"===d&&"mui-fixed"),ref:e},f))}))},4663:(t,e,r)=>{"use strict";r.d(e,{Z:()=>g});var o=r(3366),n=r(7462),a=r(2791),l=r(3733),i=r(4419),s=r(1402),c=r(6934),u=r(5878),p=r(1217);function d(t){return(0,p.Z)("MuiToolbar",t)}(0,u.Z)("MuiToolbar",["root","gutters","regular","dense"]);var f=r(184);const v=["className","component","disableGutters","variant"],Z=(0,c.ZP)("div",{name:"MuiToolbar",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,!r.disableGutters&&e.gutters,e[r.variant]]}})((t=>{let{theme:e,ownerState:r}=t;return(0,n.Z)({position:"relative",display:"flex",alignItems:"center"},!r.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}},"dense"===r.variant&&{minHeight:48})}),(t=>{let{theme:e,ownerState:r}=t;return"regular"===r.variant&&e.mixins.toolbar})),g=a.forwardRef((function(t,e){const r=(0,s.Z)({props:t,name:"MuiToolbar"}),{className:a,component:c="div",disableGutters:u=!1,variant:p="regular"}=r,g=(0,o.Z)(r,v),m=(0,n.Z)({},r,{component:c,disableGutters:u,variant:p}),b=(t=>{const{classes:e,disableGutters:r,variant:o}=t,n={root:["root",!r&&"gutters",o]};return(0,i.Z)(n,d,e)})(m);return(0,f.jsx)(Z,(0,n.Z)({as:c,className:(0,l.Z)(b.root,a),ref:e,ownerState:m},g))}))},3199:(t,e,r)=>{"use strict";r.d(e,{Z:()=>o});const o=r(2254).Z},4421:(t,e,r)=>{"use strict";r.r(e),r.d(e,{capitalize:()=>n.Z,createChainedFunction:()=>a,createSvgIcon:()=>l.Z,debounce:()=>i.Z,deprecatedPropType:()=>s,isMuiElement:()=>c.Z,ownerDocument:()=>u.Z,ownerWindow:()=>p.Z,requirePropFactory:()=>d,setRef:()=>f,unstable_ClassNameGenerator:()=>x,unstable_useEnhancedEffect:()=>v.Z,unstable_useId:()=>Z.Z,unsupportedProp:()=>g,useControlled:()=>m.Z,useEventCallback:()=>b.Z,useForkRef:()=>k.Z,useIsFocusVisible:()=>h.Z});var o=r(5902),n=r(4036);const a=r(8949).Z;var l=r(6189),i=r(3199);const s=function(t,e){return()=>null};var c=r(9103),u=r(8301),p=r(7602);r(7462);const d=function(t,e){return()=>null};const f=r(2971).Z;var v=r(162),Z=r(7384);const g=function(t,e,r,o,n){return null};var m=r(4556),b=r(9683),k=r(2071),h=r(3031);const x={configure:t=>{o.Z.configure(t)}}},9103:(t,e,r)=>{"use strict";r.d(e,{Z:()=>n});var o=r(2791);const n=function(t,e){var r,n;return o.isValidElement(t)&&-1!==e.indexOf(null!=(r=t.type.muiName)?r:null==(n=t.type)||null==(n=n._payload)||null==(n=n.value)?void 0:n.muiName)}},8301:(t,e,r)=>{"use strict";r.d(e,{Z:()=>o});const o=r(4913).Z},7602:(t,e,r)=>{"use strict";r.d(e,{Z:()=>o});const o=r(5202).Z},4556:(t,e,r)=>{"use strict";r.d(e,{Z:()=>o});const o=r(8637).Z},162:(t,e,r)=>{"use strict";r.d(e,{Z:()=>o});const o=r(2876).Z},7384:(t,e,r)=>{"use strict";r.d(e,{Z:()=>o});const o=r(8252).Z},8949:(t,e,r)=>{"use strict";function o(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return e.reduce(((t,e)=>null==e?t:function(){for(var r=arguments.length,o=new Array(r),n=0;n<r;n++)o[n]=arguments[n];t.apply(this,o),e.apply(this,o)}),(()=>{}))}r.d(e,{Z:()=>o})},2254:(t,e,r)=>{"use strict";function o(t){let e,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:166;function o(){for(var o=arguments.length,n=new Array(o),a=0;a<o;a++)n[a]=arguments[a];clearTimeout(e),e=setTimeout((()=>{t.apply(this,n)}),r)}return o.clear=()=>{clearTimeout(e)},o}r.d(e,{Z:()=>o})},4913:(t,e,r)=>{"use strict";function o(t){return t&&t.ownerDocument||document}r.d(e,{Z:()=>o})},5202:(t,e,r)=>{"use strict";r.d(e,{Z:()=>n});var o=r(4913);function n(t){return(0,o.Z)(t).defaultView||window}},8637:(t,e,r)=>{"use strict";r.d(e,{Z:()=>n});var o=r(2791);function n(t){let{controlled:e,default:r,name:n,state:a="value"}=t;const{current:l}=o.useRef(void 0!==e),[i,s]=o.useState(r);return[l?e:i,o.useCallback((t=>{l||s(t)}),[])]}},8252:(t,e,r)=>{"use strict";var o;r.d(e,{Z:()=>i});var n=r(2791);let a=0;const l=(o||(o=r.t(n,2)))["useId".toString()];function i(t){if(void 0!==l){const e=l();return null!=t?t:e}return function(t){const[e,r]=n.useState(t),o=t||e;return n.useEffect((()=>{null==e&&(a+=1,r("mui-".concat(a)))}),[e]),o}(t)}},4836:t=>{t.exports=function(t){return t&&t.__esModule?t:{default:t}},t.exports.__esModule=!0,t.exports.default=t.exports}}]);
//# sourceMappingURL=736.f844abfb.chunk.js.map