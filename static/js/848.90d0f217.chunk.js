"use strict";(self.webpackChunknotes_app=self.webpackChunknotes_app||[]).push([[848],{8848:function(e,t,r){r.r(t),r.d(t,{CapacitorSQLiteWeb:function(){return p}});var n=r(5861),s=r(5671),a=r(3144),i=r(136),u=r(3668),c=r(7757),o=r.n(c),p=function(e){(0,i.Z)(r,e);var t=(0,u.Z)(r);function r(){var e;return(0,s.Z)(this,r),(e=t.apply(this,arguments)).jeepSqliteElement=null,e.isWebStoreOpen=!1,e}return(0,a.Z)(r,[{key:"initWebStore",value:function(){var e=(0,n.Z)(o().mark((function e(){var t=this;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,customElements.whenDefined("jeep-sqlite");case 2:if(this.jeepSqliteElement=document.querySelector("jeep-sqlite"),this.ensureJeepSqliteIsAvailable(),this.jeepSqliteElement.addEventListener("jeepSqliteImportProgress",(function(e){t.notifyListeners("sqliteImportProgressEvent",e.detail)})),this.jeepSqliteElement.addEventListener("jeepSqliteExportProgress",(function(e){t.notifyListeners("sqliteExportProgressEvent",e.detail)})),this.isWebStoreOpen){e.next=10;break}return e.next=9,this.jeepSqliteElement.isStoreOpen();case 9:this.isWebStoreOpen=e.sent;case 10:return e.abrupt("return");case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"saveToStore",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.saveToStore(t);case 5:return e.abrupt("return");case 8:throw e.prev=8,e.t0=e.catch(2),new Error("".concat(e.t0));case 11:case"end":return e.stop()}}),e,this,[[2,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"echo",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),e.next=3,this.jeepSqliteElement.echo(t);case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"createConnection",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.createConnection(t);case 5:return e.abrupt("return");case 8:throw e.prev=8,e.t0=e.catch(2),new Error("".concat(e.t0));case 11:case"end":return e.stop()}}),e,this,[[2,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"open",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.open(t);case 5:return e.abrupt("return");case 8:throw e.prev=8,e.t0=e.catch(2),new Error("".concat(e.t0));case 11:case"end":return e.stop()}}),e,this,[[2,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"closeConnection",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.closeConnection(t);case 5:return e.abrupt("return");case 8:throw e.prev=8,e.t0=e.catch(2),new Error("".concat(e.t0));case 11:case"end":return e.stop()}}),e,this,[[2,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"getVersion",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.getVersion(t);case 5:return r=e.sent,e.abrupt("return",r);case 9:throw e.prev=9,e.t0=e.catch(2),new Error("".concat(e.t0));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()},{key:"checkConnectionsConsistency",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),e.prev=1,e.next=4,this.jeepSqliteElement.checkConnectionsConsistency(t);case 4:return r=e.sent,e.abrupt("return",r);case 8:throw e.prev=8,e.t0=e.catch(1),new Error("".concat(e.t0));case 11:case"end":return e.stop()}}),e,this,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"close",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.close(t);case 5:return e.abrupt("return");case 8:throw e.prev=8,e.t0=e.catch(2),new Error("".concat(e.t0));case 11:case"end":return e.stop()}}),e,this,[[2,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"getTableList",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.getTableList(t);case 5:return r=e.sent,e.abrupt("return",r);case 9:throw e.prev=9,e.t0=e.catch(2),new Error("".concat(e.t0));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()},{key:"execute",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.execute(t);case 5:return r=e.sent,e.abrupt("return",r);case 9:throw e.prev=9,e.t0=e.catch(2),new Error("".concat(e.t0));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()},{key:"executeSet",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.executeSet(t);case 5:return r=e.sent,e.abrupt("return",r);case 9:throw e.prev=9,e.t0=e.catch(2),new Error("".concat(e.t0));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()},{key:"run",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.run(t);case 5:return r=e.sent,e.abrupt("return",r);case 9:throw e.prev=9,e.t0=e.catch(2),new Error("".concat(e.t0));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()},{key:"query",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.query(t);case 5:return r=e.sent,e.abrupt("return",r);case 9:throw e.prev=9,e.t0=e.catch(2),new Error("".concat(e.t0));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()},{key:"isDBExists",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.isDBExists(t);case 5:return r=e.sent,e.abrupt("return",r);case 9:throw e.prev=9,e.t0=e.catch(2),new Error("".concat(e.t0));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()},{key:"isDBOpen",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.isDBOpen(t);case 5:return r=e.sent,e.abrupt("return",r);case 9:throw e.prev=9,e.t0=e.catch(2),new Error("".concat(e.t0));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()},{key:"isDatabase",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.isDatabase(t);case 5:return r=e.sent,e.abrupt("return",r);case 9:throw e.prev=9,e.t0=e.catch(2),new Error("".concat(e.t0));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()},{key:"isTableExists",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.isTableExists(t);case 5:return r=e.sent,e.abrupt("return",r);case 9:throw e.prev=9,e.t0=e.catch(2),new Error("".concat(e.t0));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()},{key:"deleteDatabase",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.deleteDatabase(t);case 5:return e.abrupt("return");case 8:throw e.prev=8,e.t0=e.catch(2),new Error("".concat(e.t0));case 11:case"end":return e.stop()}}),e,this,[[2,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"isJsonValid",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.isJsonValid(t);case 5:return r=e.sent,e.abrupt("return",r);case 9:throw e.prev=9,e.t0=e.catch(2),new Error("".concat(e.t0));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()},{key:"importFromJson",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.importFromJson(t);case 5:return r=e.sent,e.abrupt("return",r);case 9:throw e.prev=9,e.t0=e.catch(2),new Error("".concat(e.t0));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()},{key:"exportToJson",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.exportToJson(t);case 5:return r=e.sent,e.abrupt("return",r);case 9:throw e.prev=9,e.t0=e.catch(2),new Error("".concat(e.t0));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()},{key:"createSyncTable",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.createSyncTable(t);case 5:return r=e.sent,e.abrupt("return",r);case 9:throw e.prev=9,e.t0=e.catch(2),new Error("".concat(e.t0));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()},{key:"setSyncDate",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.setSyncDate(t);case 5:return e.abrupt("return");case 8:throw e.prev=8,e.t0=e.catch(2),new Error("".concat(e.t0));case 11:case"end":return e.stop()}}),e,this,[[2,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"getSyncDate",value:function(){var e=(0,n.Z)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.getSyncDate(t);case 5:return r=e.sent,e.abrupt("return",r);case 9:throw e.prev=9,e.t0=e.catch(2),new Error("".concat(e.t0));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()},{key:"deleteExportedRows",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.deleteExportedRows(t);case 5:return e.abrupt("return");case 8:throw e.prev=8,e.t0=e.catch(2),new Error("".concat(e.t0));case 11:case"end":return e.stop()}}),e,this,[[2,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"addUpgradeStatement",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.addUpgradeStatement(t);case 5:return e.abrupt("return");case 8:throw e.prev=8,e.t0=e.catch(2),new Error("".concat(e.t0));case 11:case"end":return e.stop()}}),e,this,[[2,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"copyFromAssets",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.copyFromAssets(t);case 5:return e.abrupt("return");case 8:throw e.prev=8,e.t0=e.catch(2),new Error("".concat(e.t0));case 11:case"end":return e.stop()}}),e,this,[[2,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"getDatabaseList",value:function(){var e=(0,n.Z)(o().mark((function e(){var t;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen(),e.prev=2,e.next=5,this.jeepSqliteElement.getDatabaseList();case 5:return t=e.sent,e.abrupt("return",t);case 9:throw e.prev=9,e.t0=e.catch(2),new Error("".concat(e.t0));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(){return e.apply(this,arguments)}}()},{key:"ensureJeepSqliteIsAvailable",value:function(){if(null===this.jeepSqliteElement)throw new Error("The jeep-sqlite element is not present in the DOM! Please check the @capacitor-community/sqlite documentation for instructions regarding the web platform.")}},{key:"ensureWebstoreIsOpen",value:function(){if(!this.isWebStoreOpen)throw new Error('WebStore is not open yet. You have to call "initWebStore()" first.')}},{key:"getUrl",value:function(){var e=(0,n.Z)(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw this.unimplemented("Not implemented on web.");case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getMigratableDbList",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw console.log("getMigratableDbList",t),this.unimplemented("Not implemented on web.");case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"addSQLiteSuffix",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw console.log("addSQLiteSuffix",t),this.unimplemented("Not implemented on web.");case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"deleteOldDatabases",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw console.log("deleteOldDatabases",t),this.unimplemented("Not implemented on web.");case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"isSecretStored",value:function(){var e=(0,n.Z)(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw this.unimplemented("Not implemented on web.");case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"setEncryptionSecret",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw console.log("setEncryptionSecret",t),this.unimplemented("Not implemented on web.");case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"changeEncryptionSecret",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw console.log("changeEncryptionSecret",t),this.unimplemented("Not implemented on web.");case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"clearEncryptionSecret",value:function(){var e=(0,n.Z)(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw console.log("clearEncryptionSecret"),this.unimplemented("Not implemented on web.");case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getNCDatabasePath",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw console.log("getNCDatabasePath",t),this.unimplemented("Not implemented on web.");case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"createNCConnection",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw console.log("createNCConnection",t),this.unimplemented("Not implemented on web.");case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"closeNCConnection",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw console.log("closeNCConnection",t),this.unimplemented("Not implemented on web.");case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"isNCDatabase",value:function(){var e=(0,n.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw console.log("isNCDatabase",t),this.unimplemented("Not implemented on web.");case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),r}(r(9565).Uw)}}]);