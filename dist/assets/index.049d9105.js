import{r as d,o as c,c as m,m as i,l as g,a as u,b as l,t as _,d as y,e as k,f as v,g as b}from"./vendor.4d515961.js";const w=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}};w();var p=(e,o)=>{const t=e.__vccOpts||e;for(const[n,r]of o)t[n]=r;return t};const C={};function x(e,o){const t=d("RouterView");return c(),m(t)}var M=p(C,[["render",x]]);const $={data(){return{countries:[],markers:{},location:[],error:"",mapbox_id:"pk.eyJ1IjoidHNlMDE4IiwiYSI6ImNsMGdmaG1sbTEyYjgzZG9kZWV5djloY2cifQ.ssfsQBAUFFKfOMv8dFhR5Q"}},async created(){this.countries=await this.$store.dispatch("fetchCountryApi"),this.countries=this.$store.getters.getCountries,this.error=this.$store.getters.getError,this.markers=this.creatingGeoJsonMarkers(),this.creatingMapFromMapBox()},computed(){this.error=this.$store.getters.getError},methods:{creatingMapFromMapBox(){i.accessToken=this.mapbox_id;const e=new i.Map({container:"map",style:"mapbox://styles/mapbox/streets-v11",center:[10,53],zoom:5}),o=[];for(const t of this.markers.features){const n=t.geometry.coordinates,r=Object.values(n);o.push(r),e.on("load",()=>{o.map((s,a)=>{setTimeout(()=>{e.jumpTo({center:s})},2e3*a)})})}this.createMarkers(e),this.searchLocationGeoCoder(e),this.navigationControllers(e),this.borderColor(e),this.locateTheUser(e)},creatingGeoJsonMarkers(){const e=this.countries.map(o=>({type:"Feature",properties:{message:o.name.official,iconSize:[30,30],title:o.name.official,capital:o.capital,languages:o.languages,continents:o.continents[0],flags:o.cca2.toLowerCase(),description:o.name.offical,population:o.population},geometry:{type:"Point",coordinates:[o.latlng[1],o.latlng[0]]}}));return{type:"FeatureCollection",features:e}},searchLocationGeoCoder(e){const o=new g({accessToken:i.accessToken,mapboxgl:i,placeholder:"Search for a country",flyTo:{bearing:0,speed:.2,curve:4,easing:t=>t}});o.on("result",function({result:t}){console.log(t.place_name)}),document.getElementById("geocoder").appendChild(o.onAdd(e))},createMarkers(e){for(const o of this.markers.features){const t=document.createElement("div"),n=o.properties.iconSize[0],r=o.properties.iconSize[1],s=o.properties.title,a=o.properties.capital,f=o.properties.population;t.className="marker",t.style.backgroundImage=`url(https://countryflagsapi.com/svg/${o.properties.flags})`,t.style.backgroundRepeat="no-repeat",t.style.width=`${n}px`,t.style.height=`${r}px`,t.style.backgroundSize="100%";const h=new i.Popup({closeButton:!1,closeOnClick:!1}).setHTML("<strong>"+s+"</strong><br>Capital: "+a+"<br>Population: "+f);new i.Marker(t).setLngLat(o.geometry.coordinates).setPopup(h).addTo(e)}},navigationControllers(e){e.addControl(new i.NavigationControl)},borderColor(e){e.on("load",()=>{e.addSource("country-boundaries-simplified",{type:"vector",url:"mapbox://examples.countries-simplification"}),e.addLayer({id:"countries-simplification-data",type:"line",source:"country-boundaries-simplified","source-layer":"countries_polygons",layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#"+Math.floor(Math.random()*16777215).toString(16),"line-width":4}})})},locateTheUser(e){e.addControl(new i.GeolocateControl({positionOptions:{enableHighAccuracy:!0},trackUserLocation:!0,showUserHeading:!0}))}}},B={key:0},E={key:1},L=l("div",{id:"geocoder",class:"geocoder"},null,-1),T=l("div",{id:"map"},null,-1),S=[L,T];function A(e,o,t,n,r,s){return r.error?(c(),u("section",B,[l("p",null," Errors: "+_(r.error),1)])):(c(),u("section",E,S))}var N=p($,[["render",A]]);const O={components:{MapBox:N}};function F(e,o,t,n,r,s){const a=d("MapBox");return c(),m(a)}var G=p(O,[["render",F]]),j=[{name:"home",path:"/",component:G}],I={state(){return{countries:[],errors:""}},mutations:{setCountries(e,o){e.countries=o},setError(e,o){e.errors=o}},actions:{async fetchCountryApi(e){const t=await fetch("https://restcountries.com/v3.1/all");try{if(t.status>=200&&t.status<300){const n=await t.json();e.commit("setCountries",n)}else throw t.status===404?new Error("url ikke eksistere"):new Error("noe gikk galt!")}catch(n){e.commit("setError",n)}}},getters:{getCountries(e){return e.countries},getError(e){return e.errors}}},P={modules:{countryDatabase:I}};const z=y(P),H=k({routes:j,history:v(),scrollBehavior(){window.scrollTo({top:0,left:0,behavior:"smooth"})}});b(M).use(z).use(H).mount("#app");