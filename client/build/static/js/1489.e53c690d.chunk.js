"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[1489],{1489:(e,s,a)=>{a.r(s),a.d(s,{default:()=>u});a(2791);var t=a(2506),l=a(8007),n=a(7490),i=a(4264),r=a(7689),d=a(5294),c=a(8329),o=a(6307),m=a(184);const u=()=>{const e=l.Ry({username:l.Z_().required("Required"),password:l.Z_().required("Required")}),s=(0,r.s0)(),{setAlert:a}=(0,i.wS)(),{setadmin:u}=(0,o.z)();return(0,m.jsx)("div",{className:"flex justify-center items-center h-screen bg-blue-900",children:(0,m.jsxs)(n.E.div,{initial:{opacity:0,scale:.5},animate:{opacity:1,scale:1},transition:{duration:.5},className:"bg-white p-8 rounded shadow-md w-full max-w-sm",children:[(0,m.jsx)("h1",{className:"text-3xl font-bold mb-6 text-center text-blue-900",children:"Admin Login"}),(0,m.jsx)(t.J9,{initialValues:{username:"",password:""},validationSchema:e,onSubmit:async(e,t)=>{let{setSubmitting:l}=t,n="".concat("http://localhost:5000","/admins");try{const t=await d.Z.post(n,{email:e.username,password:e.password});u(t.data.data);const l=JSON.stringify(t.data.data);c.Z.set("Admin",l,{expires:2}),a({type:"success",message:t.data.message}),s("/admin")}catch(i){a({type:"error",message:i.response.data.error})}},children:e=>{let{isSubmitting:s}=e;return(0,m.jsxs)(t.l0,{children:[(0,m.jsxs)("div",{className:"mb-6",children:[(0,m.jsx)("label",{htmlFor:"username",className:"block font-medium mb-1 text-blue-900",children:"Username"}),(0,m.jsx)(t.gN,{type:"text",id:"username",name:"username",className:"w-full p-3 border border-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"}),(0,m.jsx)(t.Bc,{name:"username",component:"div",className:"text-red-500"})]}),(0,m.jsxs)("div",{className:"mb-6",children:[(0,m.jsx)("label",{htmlFor:"password",className:"block font-medium mb-1 text-blue-900",children:"Password"}),(0,m.jsx)(t.gN,{type:"password",id:"password",name:"password",className:"w-full p-3 border border-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"}),(0,m.jsx)(t.Bc,{name:"password",component:"div",className:"text-red-500"})]}),(0,m.jsx)(n.E.button,{type:"submit",className:"bg-blue-900 text-white px-4 py-3 rounded w-full hover:bg-blue-800 transition-colors",disabled:s,whileHover:{scale:1.05},whileTap:{scale:.95},children:s?"Logging in...":"Log In"})]})}}),(0,m.jsxs)("div",{className:"flex justify-center mt-6",children:[(0,m.jsx)(n.E.div,{className:"bg-purple-600 w-6 h-6 rounded-full mr-2",initial:{scale:0},animate:{scale:1},transition:{delay:.5}}),(0,m.jsx)(n.E.div,{className:"bg-purple-600 w-6 h-6 rounded-full",initial:{scale:0},animate:{scale:1},transition:{delay:.6}})]})]})})}}}]);
//# sourceMappingURL=1489.e53c690d.chunk.js.map