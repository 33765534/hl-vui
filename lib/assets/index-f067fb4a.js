import{u as c}from"./vue-router-8ae81c55.js";import{m as l,c as r,b as i,e as m,i as u,n as f,a as p}from"./index-b4d9421d.js";const g={__name:"index",props:{icon:{type:String,reqiured:!0},iconClass:{type:String},textClass:{type:String,default:"text-zinc-900 dark:text-zinc-200"},to:{type:String}},setup(e){const t=e,s=c(),n=()=>{t.to&&s.push(t.to)};return(o,d)=>{const a=l("m-svg-icon");return p(),r("div",{class:"w-5 flex flex-col items-center justify-center mx-0.5",onClick:n},[i(a,{name:e.icon,fillClass:e.iconClass,class:"w-2 h-2"},null,8,["name","fillClass"]),m("p",{class:f(["text-sm mt-0.5",e.textClass])},[u(o.$slots,"default")],2)])}}};export{g as default};