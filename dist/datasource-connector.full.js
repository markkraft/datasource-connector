!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("Handsontable",[],e):"object"==typeof exports?exports.Handsontable=e():t.Handsontable=e()}(window,function(){return function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},o.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e){function o(t){Handsontable.plugins.BasePlugin.call(this,t),this._superClass=Handsontable.plugins.BasePlugin,this.vocabularyArray=[]}o.prototype=Object.create(Handsontable.plugins.BasePlugin.prototype,{constructor:{writable:!0,configurable:!0,value:o}}),o.prototype.isEnabled=function(){return!!this.hot.getSettings().dataSourceConnector},o.prototype.afterInit=!1,o.prototype.enablePlugin=function(){this.afterInit||(this.addHook("afterInit",this.onAfterInit.bind(this)),this.addHook("beforeColumnSort",this.onBeforeColumnSort.bind(this)),this.addHook("afterColumnSort",this.onAfterColumnSort.bind(this))),this.addHook("afterChange",this.onAfterChange.bind(this)),this.addHook("afterRender",this.onAfterRender.bind(this)),this.addHook("afterCreateRow",this.onAfterCreateRow.bind(this)),this.addHook("afterCreateCol",this.onAfterCreateCol.bind(this)),this.addHook("afterColumnMove",this.onAfterColumnMove.bind(this)),this.addHook("beforeFilter",this.onBeforeFilter.bind(this)),this.addHook("afterFilter",this.onAfterFilter.bind(this)),this._superClass.prototype.enablePlugin.call(this)},o.prototype.data=[],o.prototype.colHeaders=[],o.prototype.disablePlugin=function(){this._superClass.prototype.disablePlugin.call(this)},o.prototype.updatePlugin=function(){this.disablePlugin(),this.enablePlugin(),this._superClass.prototype.updatePlugin.call(this)},o.prototype._sendData=function(t,e,n){var r=o._xhr();r.open("post",t+"/"+e),r.setRequestHeader("Content-Type","application/json"),r.send(JSON.stringify(n))},o._getData=function(t,e,n){var r=o._xhr();r.open("get",t,!0),r.onreadystatechange=function(){var t,o;4==r.readyState&&(200==(t=r.status)?(o=JSON.parse(r.responseText),e&&e(o)):n&&n(t))},r.send()},o._xhr=function(){try{return new XMLHttpRequest}catch(t){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(t){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}return null},o.prototype.onAfterChange=function(t,e){if(t){for(var o=[],n=0;n<t.length;n++){var r=this.hot.getCellMeta(t[n][0],t[n][1]),a={row:r.row_id,column:r.col_id,oldValue:t[n][2],newValue:t[n][3],meta:r};delete a.meta.instance,o.push(a)}var i=this.hot.getSettings().dataSourceConnector.controllerUrl;this._sendData(i,"afterchange",{changes:o,source:e})}},o.prototype.onAfterInit=function(){var t=this.hot.getSettings().dataSourceConnector.controllerUrl;o._getData(t+"/settings",t=>{this.hot.updateSettings(t.data)}),o._getData(t+"/data",t=>{var e=t.data;for(var o in e[0])this.colHeaders.push(o);this.hot.updateSettings({colHeaders:this.colHeaders});for(var n=[],r=0;r<e.length;r++){var a=[];for(var i in e[r])a.push(e[r][i]);n.push(a)}console.log("get data",n),this.hot.loadData(n);var s=[];for(var i in e[0])s.push(i);for(r=0;r<e.length;r++)for(var l=0;l<s.length;l++)this.hot.setCellMeta(r,l,"row_id",e[r][t.rowId]),this.hot.setCellMeta(r,l,"col_id",s[l]);this.afterInit=!0})},o.prototype.onAfterRender=function(t){},o.prototype.onBeforeColumnSort=function(t,e){return!1},o.prototype.onAfterColumnSort=function(t,e){var n=this.hot.getSettings().dataSourceConnector.controllerUrl,r={column:this.colHeaders[t],order:e},a="?";for(var i in r)a+=i+"="+r[i]+"&";return a=a.slice(0,-1),o._getData(n+"/aftercolumnsort"+a,t=>(data=t.data,this.hot.loadData(data),!1)),!1},o.prototype.onAfterCreateRow=function(t,e,o){var n={index:t,amount:e,source:o},r=this.hot.getSettings().dataSourceConnector.controllerUrl;this._sendData(r,"aftercreaterow",n)},o.prototype.onAfterCreateCol=function(t,e,o){var n={index:t,amount:e,source:o},r=this.hot.getSettings().dataSourceConnector.controllerUrl;this._sendData(r,"aftercreatecol",n)},o.prototype.onAfterColumnMove=function(t,e){var o={columns:t,target:e},n=this.hot.getSettings().dataSourceConnector.controllerUrl;this._sendData(n,"aftercolumnmove",o)},o.prototype.onBeforeFilter=function(t){return!1},o.prototype.onAfterFilter=function(t){var e=[];if(t.length>0){for(var n=0;n<t.length;n++){switch(operator=this.hot.getPlugin("filters").conditionCollection.columnTypes[t[n].column],operator){case"conjunction":operator=["and"];break;case"disjunction":operator=["or"];break;case"disjunctionAndVariable":operator=["or","and"]}for(let o=0;o<t[n].conditions.length;o++){if(operator[o]&&(t[n].conditions[o].operator=operator[o]),0!=t[n].conditions[o].args.length)if("string"==typeof t[n].conditions[o].args[0])e.push("["+this.colHeaders[t[n].column]+"]["+t[n].conditions[o].name+"]="+t[n].conditions[o].args[0]);else for(let r=0;r<t[n].conditions[o].args[0].length;r++)e.push("["+this.colHeaders[t[n].column]+"]["+t[n].conditions[o].name+"]="+t[n].conditions[o].args[0][r]);else e.push("["+this.colHeaders[t[0].column]+"]["+t[n].conditions[o].name+"]=true");o<t[n].conditions.length-1&&(tempOperator=t[n].conditions[o].operator||"and",e.push("["+this.colHeaders[t[n].column]+"][operator]="+tempOperator))}operatorWithVariable=!1}var r="?"+e.join("&"),a=this.hot.getSettings().dataSourceConnector.controllerUrl;o._getData(a+"/afterfilter"+r,t=>{for(var e=t.data,o=[],n=0;n<e.length;n++){var r=[];for(var a in e[n])r.push(e[n][a]);o.push(r)}this.hot.loadData(o)})}},o.prototype.destroy=function(){this._superClass.prototype.destroy.call(this)},Handsontable.plugins.registerPlugin("dataSourceConnectorPlugin",o)}]).default});