import{_ as i,u,r as d,o as f,a as p,h as m,w,q as h,v as x,e as o,b as C,n,t as y,T as b}from"./index-b4d9421d.js";import v from"./index-41bf3349.js";const g="success",S="warn",_="error",l=[g,S,_],E={__name:"index",props:{type:{type:String,required:!0,validator(e){const s=l.includes(e);if(!s)throw new Error(`你的 thpe 必须是 ${l.join("、")} 中的一个`);return s}},content:{type:String,required:!0},duration:{type:Number},destory:{type:Function}},setup(e){const s=e;u(c=>({"5de0b779":a}));const r={warn:{icon:"warn",fillClass:"fill-warn-300",textClass:"text-warn-300",containerClass:"bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100"},error:{icon:"error",fillClass:"fill-error-300",textClass:"text-error-300",containerClass:"bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100"},success:{icon:"success",fillClass:"fill-success-300",textClass:"text-success-300",containerClass:"bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100"}},t=d(!1),a="0.5s";return f(()=>{t.value=!0,setTimeout(()=>{t.value=!1,setTimeout(()=>{s.destory&&s.destory()},parseInt(a.replace("0.","").replace("s","")*100))},s.duration)}),(c,N)=>(p(),m(b,{name:"down"},{default:w(()=>[h(o("div",{class:n(["min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer",r[e.type].containerClass])},[C(v,{name:r[e.type].icon,fillClass:r[e.type].fillClass,class:"h-1.5 w-1.5 mr-1.5"},null,8,["name","fillClass"]),o("span",{class:n(["text-sm",r[e.type].textClass])},y(e.content),3)],2),[[x,t.value]])]),_:1}))}},V=i(E,[["__scopeId","data-v-7bab3ebb"]]);export{V as default};