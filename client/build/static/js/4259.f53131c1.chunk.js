"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[4259],{2374:(e,t,a)=>{a.d(t,{Z:()=>o});a(2791);var r=a(184);const o=e=>{let{text:t}=e;return(0,r.jsxs)("div",{className:"flex justify-center items-center h-full",children:[(0,r.jsxs)("svg",{className:"animate-spin -ml-1 mr-3 h-8 w-8 text-green-600",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,r.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,r.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 20h4a7.963 7.963 0 01-2-5.291L6 17l0 .001zM12 20a7.963 7.963 0 01-2-5.291l2-2.72A5.965 5.965 0 0012 15v5h0zm4-2.709A7.962 7.962 0 0020 12h-4a7.963 7.963 0 01-2 5.291l2 2.719 0-.001z"})]}),(0,r.jsxs)("span",{className:"text-green-600 animate-wave",children:[" ","Hold on ",t," are Loading..."]})]})}},4259:(e,t,a)=>{a.r(t),a.d(t,{default:()=>H});var r=a(2791),o=a(9823),l=a(2374),i=a(5294),n=a(6088),s=a(3366),c=a(7462),d=a(3733),p=a(4419),u=a(8252),h=a(4036),m=a(8447),x=a(2003),v=a(5527),g=a(1402),f=a(6934),Z=a(5878),b=a(1217);function w(e){return(0,b.Z)("MuiDialog",e)}const W=(0,Z.Z)("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]);const S=r.createContext({});var j=a(2739),k=a(3967),y=a(184);const C=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],N=(0,f.ZP)(j.Z,{name:"MuiDialog",slot:"Backdrop",overrides:(e,t)=>t.backdrop})({zIndex:-1}),P=(0,f.ZP)(m.Z,{name:"MuiDialog",slot:"Root",overridesResolver:(e,t)=>t.root})({"@media print":{position:"absolute !important"}}),D=(0,f.ZP)("div",{name:"MuiDialog",slot:"Container",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.container,t["scroll".concat((0,h.Z)(a.scroll))]]}})((e=>{let{ownerState:t}=e;return(0,c.Z)({height:"100%","@media print":{height:"auto"},outline:0},"paper"===t.scroll&&{display:"flex",justifyContent:"center",alignItems:"center"},"body"===t.scroll&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&::after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})})),M=(0,f.ZP)(v.Z,{name:"MuiDialog",slot:"Paper",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.paper,t["scrollPaper".concat((0,h.Z)(a.scroll))],t["paperWidth".concat((0,h.Z)(String(a.maxWidth)))],a.fullWidth&&t.paperFullWidth,a.fullScreen&&t.paperFullScreen]}})((e=>{let{theme:t,ownerState:a}=e;return(0,c.Z)({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},"paper"===a.scroll&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},"body"===a.scroll&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!a.maxWidth&&{maxWidth:"calc(100% - 64px)"},"xs"===a.maxWidth&&{maxWidth:"px"===t.breakpoints.unit?Math.max(t.breakpoints.values.xs,444):"max(".concat(t.breakpoints.values.xs).concat(t.breakpoints.unit,", 444px)"),["&.".concat(W.paperScrollBody)]:{[t.breakpoints.down(Math.max(t.breakpoints.values.xs,444)+64)]:{maxWidth:"calc(100% - 64px)"}}},a.maxWidth&&"xs"!==a.maxWidth&&{maxWidth:"".concat(t.breakpoints.values[a.maxWidth]).concat(t.breakpoints.unit),["&.".concat(W.paperScrollBody)]:{[t.breakpoints.down(t.breakpoints.values[a.maxWidth]+64)]:{maxWidth:"calc(100% - 64px)"}}},a.fullWidth&&{width:"calc(100% - 64px)"},a.fullScreen&&{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,["&.".concat(W.paperScrollBody)]:{margin:0,maxWidth:"100%"}})})),B=r.forwardRef((function(e,t){const a=(0,g.Z)({props:e,name:"MuiDialog"}),o=(0,k.Z)(),l={enter:o.transitions.duration.enteringScreen,exit:o.transitions.duration.leavingScreen},{"aria-describedby":i,"aria-labelledby":n,BackdropComponent:m,BackdropProps:f,children:Z,className:b,disableEscapeKeyDown:W=!1,fullScreen:j=!1,fullWidth:B=!1,maxWidth:T="sm",onBackdropClick:R,onClose:z,open:A,PaperComponent:F=v.Z,PaperProps:E={},scroll:H="paper",TransitionComponent:K=x.Z,transitionDuration:L=l,TransitionProps:Y}=a,I=(0,s.Z)(a,C),X=(0,c.Z)({},a,{disableEscapeKeyDown:W,fullScreen:j,fullWidth:B,maxWidth:T,scroll:H}),V=(e=>{const{classes:t,scroll:a,maxWidth:r,fullWidth:o,fullScreen:l}=e,i={root:["root"],container:["container","scroll".concat((0,h.Z)(a))],paper:["paper","paperScroll".concat((0,h.Z)(a)),"paperWidth".concat((0,h.Z)(String(r))),o&&"paperFullWidth",l&&"paperFullScreen"]};return(0,p.Z)(i,w,t)})(X),G=r.useRef(),O=(0,u.Z)(n),_=r.useMemo((()=>({titleId:O})),[O]);return(0,y.jsx)(P,(0,c.Z)({className:(0,d.Z)(V.root,b),closeAfterTransition:!0,components:{Backdrop:N},componentsProps:{backdrop:(0,c.Z)({transitionDuration:L,as:m},f)},disableEscapeKeyDown:W,onClose:z,open:A,ref:t,onClick:e=>{G.current&&(G.current=null,R&&R(e),z&&z(e,"backdropClick"))},ownerState:X},I,{children:(0,y.jsx)(K,(0,c.Z)({appear:!0,in:A,timeout:L,role:"presentation"},Y,{children:(0,y.jsx)(D,{className:(0,d.Z)(V.container),onMouseDown:e=>{G.current=e.target===e.currentTarget},ownerState:X,children:(0,y.jsx)(M,(0,c.Z)({as:F,elevation:24,role:"dialog","aria-describedby":i,"aria-labelledby":O},E,{className:(0,d.Z)(V.paper,E.className),ownerState:X,children:(0,y.jsx)(S.Provider,{value:_,children:Z})}))})}))}))}));function T(e){return(0,b.Z)("MuiDialogContent",e)}(0,Z.Z)("MuiDialogContent",["root","dividers"]);const R=(0,Z.Z)("MuiDialogTitle",["root"]),z=["className","dividers"],A=(0,f.ZP)("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.dividers&&t.dividers]}})((e=>{let{theme:t,ownerState:a}=e;return(0,c.Z)({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},a.dividers?{padding:"16px 24px",borderTop:"1px solid ".concat((t.vars||t).palette.divider),borderBottom:"1px solid ".concat((t.vars||t).palette.divider)}:{[".".concat(R.root," + &")]:{paddingTop:0}})})),F=r.forwardRef((function(e,t){const a=(0,g.Z)({props:e,name:"MuiDialogContent"}),{className:r,dividers:o=!1}=a,l=(0,s.Z)(a,z),i=(0,c.Z)({},a,{dividers:o}),n=(e=>{const{classes:t,dividers:a}=e,r={root:["root",a&&"dividers"]};return(0,p.Z)(r,T,t)})(i);return(0,y.jsx)(A,(0,c.Z)({className:(0,d.Z)(n.root,r),ownerState:i,ref:t},l))}));var E=a(5399);function H(){const[e,t]=(0,r.useState)([]),[a,s]=(0,r.useState)(!0),[c,d]=(0,r.useState)(1),[p,u]=(0,r.useState)(0),[h,m]=(0,r.useState)(!1),[x,v]=(0,r.useState)(null);(0,r.useEffect)((()=>{(async e=>{let a="".concat("http://localhost:5000","/admins/allgallery?page=").concat(e,"&perPage=12");try{const e=await i.Z.get(a);t(e.data.data),u(e.data.totalPages),s(!1)}catch(r){s(!1)}})(c)}),[c]);const g=()=>{m(!1)};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8",children:null===e||void 0===e?void 0:e.map((e=>(0,y.jsxs)("div",{className:"relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform",onClick:()=>(e=>{v(e),m(!0)})(e),children:[(0,y.jsx)("img",{src:e.Document,alt:e.Title,className:"object-cover w-full h-full"}),(0,y.jsx)("div",{className:"absolute inset-0 flex items-center justify-center w-full h-full",children:(0,y.jsx)(E.Z,{className:"text-white opacity-70 w-16 h-16"})})]},e._id)))}),(0,y.jsx)("div",{className:"flex justify-center mt-4",children:(0,y.jsx)(n.Z,{count:p,page:c,onChange:(e,t)=>d(t),color:"primary"})}),a&&(0,y.jsx)(l.Z,{text:"Gallery"}),x&&(0,y.jsx)(B,{open:h,onClose:g,fullWidth:!0,maxWidth:"md",PaperProps:{className:"rounded-md   border-4 "},children:(0,y.jsx)(F,{children:(0,y.jsxs)("div",{className:"relative p-2 text-center",children:[(0,y.jsxs)("div",{className:"mb-4 overflow-hidden ",children:[(0,y.jsx)("img",{src:x.Document,alt:x.Title,className:"w-full h-96 object-cover rounded-lg "}),(0,y.jsx)("p",{className:"text-gray-600 ",children:x.Title})]}),(0,y.jsx)("div",{className:"absolute top-2 right-2",children:(0,y.jsx)("button",{onClick:g,className:"bg-green-500 hover:bg-red-600 text-white px-2 py-1 rounded-full",children:(0,y.jsx)(o.Z,{})})})]})})})]})}},9823:(e,t,a)=>{var r=a(4836);t.Z=void 0;var o=r(a(5649)),l=a(184),i=(0,o.default)((0,l.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");t.Z=i},5399:(e,t,a)=>{var r=a(4836);t.Z=void 0;var o=r(a(5649)),l=a(184),i=(0,o.default)((0,l.jsx)("path",{d:"M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"}),"Photo");t.Z=i}}]);
//# sourceMappingURL=4259.f53131c1.chunk.js.map