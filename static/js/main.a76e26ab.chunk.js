(this["webpackJsonpcorona-map"]=this["webpackJsonpcorona-map"]||[]).push([[0],{23:function(e,t,a){e.exports=a(35)},28:function(e,t,a){},32:function(e,t,a){},33:function(e,t,a){},34:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var n=a(2),c=a.n(n),l=a(14),o=a.n(l),i=(a(28),a(20)),r=a(9),s=a(15),d=a(16),m=a(17),h=a(21),u=a(18),p=a(22),v=a(7),f={id:"clusters",type:"circle",source:"covid-19",paint:{"circle-color":["step",["get","confirmed"],"#03befc",20,"#f1f075",800,"#f28cb1",5e3,"#ba1818"],"circle-radius":["step",["zoom"],4,2,6,4,["interpolate",["cubic-bezier",0,.5,1,.5],["get","confirmed"],20,8,5e3,25]]}},g={id:"cluster-count",type:"symbol",source:"covid-19",layout:{"text-field":["get","confirmed"],"text-font":["DIN Offc Pro Medium","Arial Unicode MS Bold"],"text-size":["step",["zoom"],0,4,11]}},E=function(e){for(var t=[],a=!1,n=0,c=0,l=0;l<e.length;l++){var o=e[l],i=e[l+1];t[n]=t[n]||[],t[n][c]=t[n][c]||"",'"'===o&&a&&'"'===i?(t[n][c]+=o,++l):'"'!==o?","!==o||a?"\r"!==o||"\n"!==i||a?("\n"!==o||a)&&("\r"!==o||a)?t[n][c]+=o:(++n,c=0):(++n,c=0,++l):++c:a=!a}return t},y=function(e,t){for(var a=e+"";a.length<t;)a="0"+a;return a},b=function(e){return"".concat(y(e.getMonth()+1,2),"-").concat(y(e.getDate(),2),"-").concat(e.getFullYear())},_=function(e){e.setDate(e.getDate()-1)},w=function(){var e=window.location.hostname;return"localhost"===e||"127.0.0.1"===e},T=(a(32),function(e){var t=e.data,a=t.confirmed,n=t.deaths,l=t.recovered;return c.a.createElement("div",{className:"live-data-panel"},c.a.createElement("div",{className:"live-data-panel__tile confirmed"},c.a.createElement("div",{className:"live-data-panel__key"},"Confirmed"),c.a.createElement("div",{className:"live-data-panel__value"},a)),c.a.createElement("div",{className:"live-data-panel__tile deaths"},c.a.createElement("div",{className:"live-data-panel__key"},"Deaths"),c.a.createElement("div",{className:"live-data-panel__value"},n)),c.a.createElement("div",{className:"live-data-panel__tile recovered"},c.a.createElement("div",{className:"live-data-panel__key"},"Recovered"),c.a.createElement("div",{className:"live-data-panel__value"},l)))}),D=(a(33),function(e){var t=e.handleReload,a=e.handleThemeToggle,n=e.handleExpandTimeline;return c.a.createElement("div",{className:"controls"},c.a.createElement("div",{className:"controls__icon"},c.a.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"}))),c.a.createElement("div",{className:"controls__button",onClick:t},c.a.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z"}))),c.a.createElement("div",{className:"controls__button",onClick:a},c.a.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.21 0-4 1.791-4 4s1.79 4 4 4c2.209 0 4-1.791 4-4s-1.791-4-4-4zm-.004 3.999c-.564.564-1.479.564-2.044 0s-.565-1.48 0-2.044c.564-.564 1.479-.564 2.044 0s.565 1.479 0 2.044z"}))),c.a.createElement("div",{className:"controls__button",onClick:n},c.a.createElement("svg",{width:"24",height:"24",fillRule:"evenodd",clipRule:"evenodd"},c.a.createElement("path",{d:"M5.829 6c-.412 1.165-1.524 2-2.829 2-1.656 0-3-1.344-3-3s1.344-3 3-3c1.305 0 2.417.835 2.829 2h13.671c2.484 0 4.5 2.016 4.5 4.5s-2.016 4.5-4.5 4.5h-4.671c-.412 1.165-1.524 2-2.829 2-1.305 0-2.417-.835-2.829-2h-4.671c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h13.671c.412-1.165 1.524-2 2.829-2 1.656 0 3 1.344 3 3s-1.344 3-3 3c-1.305 0-2.417-.835-2.829-2h-13.671c-2.484 0-4.5-2.016-4.5-4.5s2.016-4.5 4.5-4.5h4.671c.412-1.165 1.524-2 2.829-2 1.305 0 2.417.835 2.829 2h4.671c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5h-13.671zm6.171 5c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"}))))});a(34);!function(){if("function"===typeof Object.defineProperty)try{Object.defineProperty(Array.prototype,"sortBy",{value:e})}catch(t){}function e(e){for(var t=this.length;t;){var a=this[--t];this[t]=[].concat(e.call(a,a,t),a)}this.sort((function(e,t){for(var a=0,n=e.length;a<n;++a)if(e[a]!=t[a])return e[a]<t[a]?-1:1;return 0}));for(t=this.length;t;)this[--t]=this[t][this[t].length-1];return this}Array.prototype.sortBy||(Array.prototype.sortBy=e)}();var C=function(e){var t=e.cls,a=e.children;return c.a.createElement("div",{className:t},a)},N=function(e){var t=e.timestamp,a=e.currentTimestamp,n={onClick:e.onClick,"data-timestamp":t,style:t===a?{pointerEvents:"none",opacity:".5"}:{}},l=new Date(t);return c.a.createElement("div",Object.assign({className:"timeline__node"},n),c.a.createElement("div",Object.assign({className:"timeline__node__circle"},n)),c.a.createElement("div",Object.assign({className:"timeline__node__timestamp"},n),function(e){return"".concat(y(e.getDate(),2),".").concat(y(e.getMonth()+1,2),".").concat(e.getFullYear())}(l)))},x=function(e){var t={className:"close-button",onClick:e.onClick};return c.a.createElement("div",t,c.a.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},c.a.createElement("path",{d:"M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"})))},j=function(e){var t=e.timestamps,a=e.expanded,n=e.selectedDate,l=e.handleCollapseTimeline,o=e.handleTimeSelect,i="timeline ".concat(a?"expanded":"");return c.a.createElement(C,{cls:i},c.a.createElement(x,{onClick:l}),t.sortBy((function(e){return new Date(e)})).map((function(e){return c.a.createElement(N,{key:e,timestamp:e,currentTimestamp:n,onClick:o})})))},k=function(e){function t(){var e;Object(d.a)(this,t),(e=Object(h.a)(this,Object(u.a)(t).call(this))).handleReload=function(){document.location.reload()},e.handleThemeToggle=function(){var t=e.state.mapStyle;t="satellite-v9"===t?"dark-v10":"satellite-v9",e.setState({mapStyle:t})},e.handleExpandTimeline=function(){e.setState({timelineExpanded:!0})},e.handleCollapseTimeline=function(){e.setState({timelineExpanded:!1})},e.handleTimeSelect=function(t){var a=t.target.dataset.timestamp;e.setState({selectedDate:a})},e.getDataTotal=function(){var t=new Headers({"Content-Type":"application/json",Accept:"application/json"}),a=w()?"./data-fallback/all/corona-total.json":"https://corona.lmao.ninja/all",n={headers:t,method:"GET",mode:"cors",type:"json",cache:"default"},c=new Request(a,n);try{fetch(c,n).then((function(t){t.json().then((function(t){e.setState({dataTotal:t})}))}))}catch(l){console.log(l)}},e.getDataCountries=function(t){var a=new Headers,n="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/".concat(t,".csv"),c={headers:a,method:"GET",mode:"cors",type:"text/csv",cache:"default"},l=new Request(n,c);try{fetch(l,c).then((function(a){a.text().then((function(a){e.setState((function(e){return{dataCountries:Object(s.a)({},e.dataCountries,Object(r.a)({},t,E(a))),latestDatasetFound:!0}}))}))}))}catch(m){console.log(m);var o=e.state,i=o.selectedDate;if(!o.latestDatasetFound){var d=new Date(i);_(d),e.setState({selectedDate:b(d)})}}};var a=new Date;return _(a),e.state={selectedDate:b(a),dataCountries:{},dataTotal:{},mapStyle:"dark-v10",latestDatasetFound:!1,timelineExpanded:!1},e}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){for(var e=this.state.selectedDate,t=new Date("03-01-2020"),a=new Date(e);a.getTime()>=t.getTime();)this.getDataCountries(b(a)),_(a);this.getDataTotal()}},{key:"render",value:function(){var e=this.handleReload,t=this.handleThemeToggle,a=this.handleExpandTimeline,n=this.handleCollapseTimeline,l=this.handleTimeSelect,o=this.state,i=o.selectedDate,r=o.dataTotal,s=o.dataCountries,d=o.mapStyle,m=o.timelineExpanded,h=s[i],u={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[]};if(h){var p=[],v=!0,f=!1,g=void 0;try{for(var E,y=h[Symbol.iterator]();!(v=(E=y.next()).done);v=!0){var b=E.value;"Province/State"!==b[0]&&p.push({type:"Feature",properties:{state:b[0],region:b[1],timestamp:b[2],confirmed:Number(b[3]),deaths:Number(b[4]),recovered:Number(b[5])},geometry:{type:"Point",coordinates:[Number(b[7]),Number(b[6])]}})}}catch(N){f=!0,g=N}finally{try{v||null==y.return||y.return()}finally{if(f)throw g}}u.features=p}var _={confirmed:r.cases,deaths:r.deaths,recovered:r.recovered},w={handleReload:e,handleThemeToggle:t,handleExpandTimeline:a},C={timestamps:Object.keys(s),expanded:m,selectedDate:i,handleCollapseTimeline:n,handleTimeSelect:l};return c.a.createElement("div",{className:"app"},c.a.createElement(D,w),c.a.createElement(j,C),c.a.createElement(T,{data:_}),c.a.createElement(S,{data:u,mapStyle:d}))}}]),t}(n.Component),S=function(e){var t=e.data,a=e.mapStyle,l=Object(n.useState)({width:"100vw",height:"100vh",latitude:45,longitude:10,zoom:4}),o=Object(i.a)(l,2),r=o[0],s=o[1],d="mapbox://styles/mapbox/".concat(a);return c.a.createElement(v.d,Object.assign({},r,{onViewportChange:s,mapboxApiAccessToken:"pk.eyJ1IjoiZ2lhbm5vdHIiLCJhIjoiY2s3aHFkcDkwMGMzYjNlbzNvMWl4bGFxbyJ9.2p2O5m7aiA6Bn9vjPe7HrQ",mapStyle:d}),c.a.createElement(v.c,{id:"covid-19",type:"geojson",data:t},c.a.createElement(v.a,f),c.a.createElement(v.a,g)),c.a.createElement("div",{style:{position:"absolute",bottom:"40px",left:"20px"}},c.a.createElement(v.b,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[23,1,2]]]);
//# sourceMappingURL=main.a76e26ab.chunk.js.map