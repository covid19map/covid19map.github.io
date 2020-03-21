(this["webpackJsonpcorona-cub"]=this["webpackJsonpcorona-cub"]||[]).push([[0],{28:function(e,t,a){e.exports=a(44)},33:function(e,t,a){},42:function(e,t,a){},43:function(e,t,a){},44:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a.n(n),c=a(19),o=a.n(c),i=(a(33),a(8)),l=a.n(i),d=a(14),s=a(20),u=a(21),m=a(26),f=a(22),v=a(27),p=a(23),h=a(10),y=a(7),g={id:"clusters",type:"circle",source:"covid-19",paint:{"circle-color":["step",["get","confirmed"],"#03befc",20,"#f1f075",800,"#f28cb1",5e3,"#ba1818"],"circle-radius":["step",["zoom"],4,2,6,4,["interpolate",["cubic-bezier",0,.5,1,.5],["get","confirmed"],20,8,5e3,25]]}},b={id:"cluster-count",type:"symbol",source:"covid-19",layout:{"text-field":["get","confirmed"],"text-font":["DIN Offc Pro Medium","Arial Unicode MS Bold"],"text-size":["step",["zoom"],0,4,11]}},E=(a(41),function(e){var t=e.data,a=e.mapStyle,c=Object(n.useState)({width:"100vw",height:"100vh",latitude:45,longitude:10,zoom:4}),o=Object(h.a)(c,2),i=o[0],l=o[1],d="mapbox://styles/mapbox/".concat(a);return r.a.createElement(y.d,Object.assign({},i,{onViewportChange:l,mapboxApiAccessToken:"pk.eyJ1IjoiZ2lhbm5vdHIiLCJhIjoiY2s3aHFkcDkwMGMzYjNlbzNvMWl4bGFxbyJ9.2p2O5m7aiA6Bn9vjPe7HrQ",mapStyle:d}),r.a.createElement(y.c,{id:"covid-19",type:"geojson",data:t},r.a.createElement(y.a,g),r.a.createElement(y.a,b)),r.a.createElement("div",{style:{position:"absolute",bottom:"40px",right:"20px"}},r.a.createElement(y.b,null)))}),x=new Intl.NumberFormat("en-US"),k=function(e){return x.format(e)},N=(new Intl.NumberFormat("en-IN",{maximumSignificantDigits:3}),a(42),function(){return r.a.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},r.a.createElement("path",{d:"M24 11.871l-5-4.871v3h-19v4h19v3z"}))}),S=function(e){var t=e.data,a=e.handleToggleComputations,c=e.computationsExpanded,o=t.confirmed,i=t.deaths,l=t.recovered,d=("data-panel-computations ".concat(c?"expanded":""),"data-panel-computations-toggle ".concat(c?"expanded":""));return r.a.createElement(n.Fragment,null,r.a.createElement("div",{className:"data-panel"},r.a.createElement("div",{className:"data-panel__tile confirmed"},r.a.createElement("div",{className:"data-panel__key"},"Confirmed"),r.a.createElement("div",{className:"data-panel__value"},k(o))),r.a.createElement("div",{className:"data-panel__tile deaths"},r.a.createElement("div",{className:"data-panel__key"},"Deaths"),r.a.createElement("div",{className:"data-panel__value"},k(i))),r.a.createElement("div",{className:"data-panel__tile recovered"},r.a.createElement("div",{className:"data-panel__key"},"Recovered"),r.a.createElement("div",{className:"data-panel__value"},k(l))),r.a.createElement("div",{className:d,onClick:a},r.a.createElement(N,null))),null)},w=a(25),C=(a(43),function(){return r.a.createElement("div",{className:"loader-wrapper"},r.a.createElement("div",{className:"loader-title"},"COVID-19 Map"),r.a.createElement("div",{className:"loader"},Object(w.a)(Array(25).keys()).map((function(e){return r.a.createElement("div",{key:e})}))))}),j=function(e,t){return e+t},O=function(e,t){return e||t},_=function(e){return"object"!==typeof e&&(e=[e]),e},F=function(e,t){return t.map((function(t){return t[e]})).reduce(j)},T=function(e,t){var a={};return Object.keys(t).forEach((function(n){a[n]=function(e,t){return"object"===typeof e?e.map((function(e){return F(e,t)})).reduce(j):F(e,t)}(e,t[n])})),a},D=function(e,t,a){return a.filter((function(a){return n=t,_(e).map((function(e){return a[e]})).map((function(e){return n.includes(e)})).reduce(O);var n}))},I={15848205e5:[{provice:"Gotham",country:"Deinemutterland",latlng:[51,9],confirmed:1e4,recovered:1,deaths:5e3,active:4999},{provice:"Central City",country:"Fickfisch",latlng:[52,10],confirmed:1e5,recovered:1e3,deaths:6e4,active:39e3},{provice:"Star",country:"Bagdad",latlng:[50,7],confirmed:20,recovered:0,deaths:0,active:20}],15848208e5:[{provice:"Gotham",country:"Deinemutterland",latlng:[51,9],confirmed:2e4,recovered:10,deaths:15e3,active:9990},{provice:"Central City",country:"Fickfisch",latlng:[52,10],confirmed:1e5,recovered:4e4,deaths:6e4,active:0},{provice:"Star",country:"Bagdad",latlng:[50,7],confirmed:50,recovered:10,deaths:20,active:20}],1584820813832:[{provice:"Gotham",country:"Deinemutterland",latlng:[51,9],confirmed:1e5,recovered:20,deaths:5e4,active:49980},{provice:"Central City",country:"Fickfisch",latlng:[52,10],confirmed:16e4,recovered:8e4,deaths:65e3,active:15e3},{provice:"Star",country:"Bagdad",latlng:[50,7],confirmed:200,recovered:40,deaths:80,active:80}]},z=function(e){switch(e){case"satellite-v9":return"light-v10";case"light-v10":return"dark-v10";case"dark-v10":return"streets-v11";case"streets-v11":return"satellite-v9";default:console.log("Sorry, the style '".concat(e,"' doesn't exist."))}},B=function(){return Object(p.usePromiseTracker)({delay:3e3}).promiseInProgress&&r.a.createElement(C,null)},M=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(m.a)(this,Object(f.a)(t).call(this))).handleReload=function(){document.location.reload()},e.handleSwitchTheme=function(){var t=e.state.mapStyle;e.setState({mapStyle:z(t)})},e.handleSetLive=function(){e.setState({currentTime:Date.now()})},e.handleToggleCharts=function(){e.setState({chartsExpanded:!e.state.chartsExpanded})},e.handleCollapseCharts=function(){e.setState({chartsExpanded:!1})},e.handleToggleFilters=function(){e.setState({filtersExpanded:!e.state.filtersExpanded})},e.handleCollapseFilters=function(){e.setState({filtersExpanded:!1})},e.setCountryFilter=function(t){var a=e.state.data,n=a.fetched;a.filtered=function(e,t,a){var n={};return Object.keys(a).forEach((function(r){n[r]=D(e,t,a[r])})),n}(["province","country"],t,n),e.setState({data:a})},e.setTime=function(t){e.setState({currentTime:t})},e.getLiveData=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",I);case 1:case"end":return e.stop()}}),e)}))),e.state={mapStyle:"dark-v10",data:{fetched:{},filtered:{}},survey:{},currentTime:1584820813832,filteredRegions:[],chartsExpanded:!1,filtersExpanded:!1},e.rootNode=null,e}return Object(v.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=Object(d.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getLiveData();case 2:t=e.sent,this.setState({data:{fetched:t,filtered:t}});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=(this.handleToggleCharts,this.handleCollapseCharts,this.handleToggleFilters,this.handleCollapseFilters,e.mapStyle),a=e.data,n=(a.fetched,a.filtered),c=(e.survey,e.currentTime),o=(e.filteredRegions,e.chartsExpanded,e.filtersExpanded,{confirmed:T("confirmed",n)[c],recovered:T("recovered",n)[c],deaths:T("deaths",n)[c]}),i=function(e){var t={type:"FeatureCollection",features:[]};if(e){var a=[],n=!0,r=!1,c=void 0;try{for(var o,i=e[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var l=o.value,d=l.province,s=l.country,u=l.confirmed,m=l.recovered,f=l.deaths,v=l.latlng,p=Object(h.a)(v,2),y=p[0],g=p[1];a.push({type:"Feature",properties:{province:d,country:s,confirmed:Number(u),recovered:Number(m),deaths:Number(f)},geometry:{type:"Point",coordinates:[Number(g),Number(y)]}})}}catch(b){r=!0,c=b}finally{try{n||null==i.return||i.return()}finally{if(r)throw c}}t.features=a}return t}(n[c]);return r.a.createElement("div",{className:"app"},r.a.createElement(B,null),r.a.createElement(S,{data:o}),i&&r.a.createElement(E,{data:i,mapStyle:t}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[28,1,2]]]);
//# sourceMappingURL=main.c0d27645.chunk.js.map