import{u as a}from"./vue-router-8ae81c55.js";import{m as f,c as u,e as c,i as s,n as k,a as d,b as m}from"./index-b4d9421d.js";const b={class:"h-full flex items-center justify-center m-auto font-bold text-base text-zinc-900 dark:text-zinc-200"},z={__name:"index",props:{clickLeft:Function,clickRight:Function,sticky:Boolean},setup(i){const e=i,l=a(),o=()=>{if(e.clickLeft){e.clickLeft();return}l.back()},n=()=>{e.clickRight&&e.clickRight()};return(t,h)=>{const r=f("m-svg-icon");return d(),u("div",{class:k(["w-full h-5 border-b flex items-center z-10 bg-white dark:bg-zinc-800 border-b-zinc-200 dark:border-b-zinc-700",[i.sticky?"sticky top-0 left-0":"relative"]])},[c("div",{onClick:o,class:"h-full w-5 absolute left-0 flex items-center justify-center"},[s(t.$slots,"left",{},()=>[m(r,{name:"back",class:"w-2 h-2",fillClass:"fill-zinc-900 dark:fill-zinc-200"})])]),c("div",b,[s(t.$slots,"default")]),c("div",{onClick:n,class:"h-full w-5 absolute right-0 flex items-center justify-center"},[s(t.$slots,"right")])],2)}}};export{z as default};