(this["webpackJsonpsecondary-isolations"]=this["webpackJsonpsecondary-isolations"]||[]).push([[0],{42:function(e,t,a){e.exports=a(80)},47:function(e,t,a){},54:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){},78:function(e,t,a){},79:function(e,t,a){},80:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(37),c=a.n(s),o=(a(47),a(18)),l=a(10),i=a(1),u=a.n(i),p=a(2),m=a(12),d=a(13),b=a(14),f=a(15),h=a(19),g=a(9),v=a(8),E=a(22),k=Object(g.f)((function(e){var t=e.history,a=(e.location,e.match,e.staticContext,e.to),n=e.onClick,s=e.kit,c=Object(E.a)(e,["history","location","match","staticContext","to","onClick","kit"]);return r.a.createElement("button",Object.assign({},c,{onClick:function(e){n&&n(e),t.push(a,s)}}))})),N=(a(54),function(e){return r.a.createElement("div",{className:"footer"},"Home"!==e.currComponent?r.a.createElement("button",{className:"nav-button back-button",onClick:function(){e.history.goBack()}},"Back"):null,"Home"!==e.currComponent?r.a.createElement(k,{to:"/",className:"nav-button home-button"},"Home"):null,"Home"===e.currComponent||"Kits"===e.currComponent?r.a.createElement(k,{to:"/create",className:e.loggedIn?"nav-button create-button-faded-in":"create-button-faded-out"},"Create Kit"):null,"Table"!==e.currComponent?r.a.createElement(k,{to:"/table",className:"nav-button table-button"},"Table (",e.rowCount," ",1===e.rowCount?"Sample":"Samples",")"):null,"Table"===e.currComponent?r.a.createElement("button",{className:"nav-button clear-table-button",onClick:function(){e.clearTable()}},"Clear Table"):null,"Table"===e.currComponent?r.a.createElement("button",{className:"nav-button print-button",onClick:function(){window.print()}},"Print"):null)}),S=(a(55),function(e){return r.a.createElement("div",{className:"page"},r.a.createElement("header",null,r.a.createElement("div",{className:"page-title",id:"home-title"},"Secondary Isolation Calculator"),r.a.createElement("div",{className:"home-subtitle"},"For"," ",r.a.createElement("a",{className:"miltenyi-link",href:"https://www.miltenyibiotec.com/US-en/",target:"_blank",rel:"noopener noreferrer"},"Miltenyi Biotec")," ","Kits")),r.a.createElement("div",{className:"home-container-species-buttons scrollable-body"},e.allSpecies.map((function(t){return r.a.createElement(k,{to:"/kits",className:"species-button",onClick:function(){return e.selectSpecies(t)},key:t},t)}))),r.a.createElement(N,Object.assign({},e,{currComponent:"Home"})))}),w=(a(56),function(e){var t=function(t){var a,n=t?e.currentPosKits:e.currentNegKits;return r.a.createElement("div",{className:"kit-section section-".concat(t?"positive":"negative","-selection")},r.a.createElement("div",{className:"kit-section-title"},t?"Positive":"Negative"," Selection"),r.a.createElement("div",{className:"kit-section-list"},(a=n,a.sort((function(e,t){var a=e.name.toUpperCase(),n=t.name.toUpperCase();return a<n?-1:a>n?1:0}))).map((function(t){return r.a.createElement("div",{className:"kit-info-container",key:t.id},r.a.createElement("div",{className:"kit-name-container"},r.a.createElement("div",{className:"kit-name"},t.name),r.a.createElement("div",null,r.a.createElement("a",{className:"kit-id",href:"https://www.miltenyibiotec.com/US-en/search.html?search=".concat(t.id,"&options=on#globalSearchFamilies=%5B%5D"),target:"_blank",rel:"noopener noreferrer"},t.id))),r.a.createElement("div",{className:"kit-info-container-right"},r.a.createElement(k,{to:"/edit/".concat(t.id),className:e.loggedIn?"edit-button":"edit-button logged-out-edit-button",kit:t},r.a.createElement("i",{className:"fas fa-pen"})),r.a.createElement("div",{className:"kit-options-row"},r.a.createElement("button",{className:"kit-options-button kit-remove-button subtract-button",onClick:function(){e.updateTable("subtract",t)}},r.a.createElement("i",{className:"fas fa-minus"})),r.a.createElement("div",{className:"kit-count"},e.tableData[t.species]&&e.tableData[t.species][t.id]&&e.tableData[t.species][t.id].samples.length||0),r.a.createElement("button",{className:"kit-options-button kit-add-button add-button",onClick:function(){e.updateTable("add",t)}},r.a.createElement("i",{className:"fas fa-plus"})))))}))))};return r.a.createElement("div",{className:"page"},r.a.createElement("header",null,r.a.createElement("div",{className:"page-title"},e.currentSpecies?"".concat(e.currentSpecies," Kits"):"No Species Selected")),r.a.createElement("div",{className:"kits-body scrollable-body"},t(!0),t(!1)),r.a.createElement(N,Object.assign({},e,{currComponent:"Kits"})))}),y=(a(57),function(e){var t=function(t){return t.samples.map((function(a,n){return r.a.createElement("tr",{className:"table-variables-row",key:n},function(t,a,n){var s=[];return t.forEach((function(t,c){0===c?s.push(r.a.createElement("td",{className:"medium-cell",key:c},r.a.createElement("input",{className:"user-input medium-cell",onChange:function(t){return e.handleTableInput("sampleID",a,n,t.target.value)},value:t}))):1===c?s.push(r.a.createElement("td",{className:"short-cell",key:c},r.a.createElement("input",{className:"user-input short-cell",onKeyPress:function(e){(e.charCode<48&&46!==e.charCode||e.charCode>57)&&e.preventDefault()},onChange:function(t){return e.handleTableInput("cellCount",a,n,t.target.value)},value:t}))):s.push(r.a.createElement("td",{key:c},t))})),s}(a,t,n))}))};return r.a.createElement("div",{className:"page"},r.a.createElement("div",{className:"scrollable-body",id:"divToPrint"},function(){var a=[],n=e.tableData,s=function(s){a.push(r.a.createElement("div",{className:"tables-container",key:s},r.a.createElement("div",{className:"tables-header"},r.a.createElement("div",{className:"tables-header-spacer"}),r.a.createElement(k,{to:"/kits",className:"species-name",onClick:function(){return e.selectSpecies(s)}},s),r.a.createElement("button",{className:"delete-button delete-species no-print-spacer",onClick:function(){return e.handleTableDeleteButton("species",s)}},r.a.createElement("i",{className:"fas fa-trash-alt"}))),function(a){var n=[],s=function(s){var c=a[s];n.push(r.a.createElement("table",{className:"kit-table",key:s},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{className:"kit-table-header-container",colSpan:c.constants.length+2},r.a.createElement("div",{className:"kit-table-header"},r.a.createElement("div",null,r.a.createElement("button",{className:"kit-table-row-button add-button no-print",onClick:function(){return e.updateTable("add",c)}},r.a.createElement("i",{className:"fas fa-plus"})),r.a.createElement("button",{className:"kit-table-row-button subtract-button no-print",onClick:function(){return e.updateTable("subtract",c)}},r.a.createElement("i",{className:"fas fa-minus"}))),r.a.createElement("div",{className:"kit-table-header-text-container"},r.a.createElement("div",{className:"kit-table-header-name"},c.name,":"," ",r.a.createElement("a",{className:"kit-table-header-id",href:"https://www.miltenyibiotec.com/US-en/search.html?search=".concat(c.id,"&options=on#globalSearchFamilies=%5B%5D"),target:"_blank",rel:"noopener noreferrer"},c.id)),r.a.createElement("div",{className:"kit-table-header-selection"},"(",c.type," Selection)")),r.a.createElement("div",null,r.a.createElement(k,{to:"/edit/".concat(c.id),className:e.loggedIn?"edit-button no-print":"edit-button logged-out-edit-button",kit:c},r.a.createElement("i",{className:"fas fa-pen"})),r.a.createElement("button",{className:"delete-button delete-kit no-print",onClick:function(){return e.handleTableDeleteButton("kit",c.species,c.id)}},r.a.createElement("i",{className:"fas fa-trash-alt"})))))),r.a.createElement("tr",{className:"kit-multipliers-row no-print"},r.a.createElement("th",{className:"kit-constants-title",colSpan:2},"Constants:"),c.constants.map((function(e,t){return r.a.createElement("th",{key:t},e[2])}))),r.a.createElement("tr",{className:"kit-constant-names-row"},r.a.createElement("th",{className:"medium-cell"},"Sample ID"),r.a.createElement("th",{className:"short-cell superscript-cell"},"Cell Count (10",r.a.createElement("sup",null,"6"),")"),c.constants.map((function(e,t){return r.a.createElement("th",{key:t},e[0]+" ("+e[1]+")")})))),r.a.createElement("tbody",null,t(c))))};for(var c in a)s(c);return n}(n[s])))};for(var c in n)s(c);return a}()),r.a.createElement(N,Object.assign({},e,{currComponent:"Table"})))}),C=a(21),D=a(41),x=a(40),I=a.n(x),O="development"==="production".trim()?"http://localhost:8000":void 0,K=I.a.create({withCredentials:!0,baseURL:O}),j={createKit:function(e){return K.post("/api/kit",e)},updateKitById:function(e,t){return K.put("/api/kit/".concat(e),t)},deleteKitById:function(e){return K.delete("/api/kit/".concat(e))},getAllKits:function(){return K.get("/api/kits")},getKitByID:function(e){return K.get("/api/kits/".concat(e))},logIn:function(e){return K.post("/api/login",e)},checkLoginStatus:function(){return K.get("/api/login")},logOut:function(){return K.post("/api/logout")}},T=(a(75),function(e){Object(f.a)(a,e);var t=Object(b.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).componentDidMount=Object(p.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.props.match.params.kitID?n.loadKitToEdit():n.loadSavedCreateData();case 1:case"end":return e.stop()}}),e)}))),n.fetchKitByID=function(){var e=Object(p.a)(u.a.mark((function e(t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Finding kit data based on URL..."),e.next=3,j.getKitByID(t).then((function(e){return e.data.data})).catch((function(e){console.error(e)}));case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.loadKitToEdit=Object(p.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.props.location.state){e.next=5;break}return e.next=3,n.setState(n.props.location.state);case 3:e.next=15;break;case 5:return e.next=7,n.fetchKitByID(n.props.match.params.kitID);case 7:if(t=e.sent){e.next=12;break}return console.log("Kit not found based on URL......"),n.props.history.push("/invalid"),e.abrupt("return");case 12:return e.next=14,n.setState(t);case 14:console.log("Kit data loaded based on URL.");case 15:n.updateLocalStorage("update");case 16:case"end":return e.stop()}}),e)}))),n.loadSavedCreateData=Object(p.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Fetching saved create kit data..."),t=JSON.parse(localStorage.getItem("createState")),e.next=4,n.setState(t);case 4:console.log("Saved create kit data loaded.");case 5:case"end":return e.stop()}}),e)}))),n.generateConstantsDatalists=Object(D.a)((function(e){if(e)return{constantNames:n.createUniqueElArr(e,0,!0),constantUnits:n.createUniqueElArr(e,1),constantCells:n.createUniqueElArr(e,3)}})),n.createUniqueElArr=function(e,t,a){var n,r=e.reduce((function(e,t){return e.push.apply(e,Object(o.a)(t.constants)),e}),[]),s=new Set,c=Object(l.a)(r);try{for(c.s();!(n=c.n()).done;){var i=n.value,u=i[t];a&&(u+=" ("+i[1]+")"),s.add(u)}}catch(p){c.e(p)}finally{c.f()}return Array.from(s).sort()},n.handleInputConstant=function(){var e=Object(p.a)(u.a.mark((function e(t,a,r){var s,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s=Object(v.cloneDeep)(n.state.constants),e.t0=r,e.next="constantName"===e.t0?4:"constantUnit"===e.t0?7:"constantValue"===e.t0?9:"constantCells"===e.t0?11:13;break;case 4:return(c=t.target.value.split("("))[1]?(s[a][0]=c[0].trim(),s[a][1]=c[1].slice(0,-1)):s[a][0]=c[0],e.abrupt("break",14);case 7:return s[a][1]=t.target.value,e.abrupt("break",14);case 9:return s[a][2]=t.target.value,e.abrupt("break",14);case 11:return s[a][3]=t.target.value,e.abrupt("break",14);case 13:console.log("Error modifying constants.");case 14:return e.next=16,n.setState({constants:s});case 16:n.updateLocalStorage(n.props.match.params.kitID?"update":"create");case 17:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),n.handleInput=function(){var e=Object(p.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"id"===t.target.name&&n.props.allKitIDs.has(t.target.value)?n.setState({duplicateID:!0}):n.setState({duplicateID:!1}),e.next=3,n.setState(Object(C.a)({},t.target.name,t.target.value));case 3:n.updateLocalStorage(n.props.match.params.kitID?"update":"create");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.capitalizeWords=function(e){return e.split(" ").map((function(e){return e[0].toUpperCase()+e.slice(1)})).join(" ")},n.processFields=function(e,t,a){return{namePrepped:n.capitalizeWords(String(e).trim()),speciesPrepped:n.capitalizeWords(t.trim()),constantsPrepped:a.map((function(e){return(e=e.map((function(e){return e.trim()})))[0]=n.capitalizeWords(e[0]),e}))}},n.checkForEmptyFields=function(e,t,a,r,s){var c,o=!1,i=Object(l.a)(s);try{for(i.s();!(c=i.n()).done;){var u=c.value;u[0]&&u[1]&&u[2]&&u[3]||(o=!0)}}catch(p){i.e(p)}finally{i.f()}return!(""!==e&&""!==t&&""!==a&&""!==r&&!o)&&(n.setState({alertMsg:"emptyFields",showAlert:!0}),!0)},n.validateFields=function(){var e=Object(v.cloneDeep)(n.state),t=e.id,a=e.name,r=e.species,s=e.type,c=e.constants;if(n.checkForEmptyFields(t,a,r,s,c))return!1;var o=n.processFields(a,r,c),l=o.namePrepped,i=o.speciesPrepped,u=o.constantsPrepped;return{id:String(t),name:l,species:i,type:s,constants:u}},n.handleSubmit=function(){var e=Object(p.a)(u.a.mark((function e(t,a){var r,s,c,o,l,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!1!==n.validateFields()){e.next=3;break}return e.abrupt("return");case 3:if(r=n.validateFields(),s=r.id,c=r.name,o=r.species,l=r.type,i=r.constants,"update"!==a){e.next=11;break}return e.next=7,j.updateKitById(s,{name:c,type:l,constants:i}).catch((function(e){return console.error(e)}));case 7:n.props.tableData[o]&&n.props.tableData[o][s]&&n.props.updateTableData({id:s,name:c,species:o,type:l,constants:i},"update"),n.setState({alertMsg:"update",showAlert:!0}),e.next=15;break;case 11:if("create"!==a){e.next=15;break}return e.next=14,j.createKit({id:s,name:c,species:o,type:l,constants:i}).catch((function(e){return console.error(e)}));case 14:n.setState({alertMsg:"create",showAlert:!0});case 15:return e.next=17,n.props.fetchKitsFromDatabase();case 17:return e.next=19,n.props.selectSpecies(n.props.currentSpecies);case 19:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),n.deleteKit=Object(p.a)(u.a.mark((function e(){var t,a,r,s,c,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Object(v.cloneDeep)(n.state),a=t.id,r=t.name,s=t.species,c=t.type,o=t.constants,e.next=3,j.deleteKitById(a).catch((function(e){return console.error(e)}));case 3:return e.next=5,n.props.fetchKitsFromDatabase();case 5:return e.next=7,n.props.selectSpecies(n.props.currentSpecies);case 7:if(!n.props.tableData[s]||!n.props.tableData[s][a]){e.next=10;break}return e.next=10,n.props.updateTableData({id:a,name:r,species:s,type:c,constants:o},"delete");case 10:console.log("Kit deleted from database.");case 11:case"end":return e.stop()}}),e)}))),n.handleAlert=Object(p.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=n.state.alertMsg,e.t0=t,e.next="delete"===e.t0?4:"update"===e.t0?9:"create"===e.t0?12:14;break;case 4:return e.next=6,n.deleteKit();case 6:case 9:return n.props.history.goBack(),n.clearStateAndStorage(),e.abrupt("break",15);case 12:return n.clearStateAndStorage(),e.abrupt("break",15);case 14:return e.abrupt("break",15);case 15:n.setState({showAlert:!1});case 16:case"end":return e.stop()}}),e)}))),n.updateLocalStorage=function(e){"create"===e?localStorage.setItem("createState",JSON.stringify(n.state)):"update"===e&&localStorage.setItem("updateState",JSON.stringify(n.state))},n.clearStateAndStorage=function(){localStorage.removeItem(n.props.match.params.kitID?"updateState":"createState"),n.setState({id:"",name:"",species:"",type:"",constants:[[null,null,null,null]]})},n.modifyConstantRows=function(){var e=Object(p.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("add"!==t){e.next=5;break}return e.next=3,n.setState({constants:[].concat(Object(o.a)(n.state.constants),[[null,null,null,null]])});case 3:e.next=8;break;case 5:if("subtract"!==t){e.next=8;break}return e.next=8,n.setState({constants:n.state.constants.slice(0,-1)});case 8:n.updateLocalStorage(n.props.match.params.kitID?"update":"create");case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.state={id:"",name:"",species:"",type:"",constants:[[null,null,null,null]],duplicateID:!1,showAlert:!1,alertMsg:""},n.typeRef=r.a.createRef(),n}return Object(d.a)(a,[{key:"render",value:function(){var e=this,t=this.generateConstantsDatalists(this.props.allKits);return r.a.createElement("div",{className:"page"},r.a.createElement("header",null,r.a.createElement("div",{className:"page-title"},this.props.match.params.kitID?r.a.createElement(r.a.Fragment,null,"Edit"," ",r.a.createElement("a",{className:"edit-kit-id",href:"https://www.miltenyibiotec.com/US-en/search.html?search=".concat(this.state.id,"&options=on#globalSearchFamilies=%5B%5D"),target:"_blank",rel:"noopener noreferrer"},this.state.id)):"Create Kit")),r.a.createElement("form",{className:"create-form",autoComplete:"off",onSubmit:function(t){e.handleSubmit(t,e.props.match.params.kitID?"update":"create")}},r.a.createElement("div",{className:"create-section-left"},r.a.createElement("table",{id:"create-edit-table"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",{className:"create-form-label",align:"right"},"ID"),r.a.createElement("td",{align:"left",colSpan:2},r.a.createElement("input",{type:"text",value:this.state.id,disabled:!!this.props.match.params.kitID,name:"id",placeholder:"000-000-000",onChange:this.handleInput,className:this.state.duplicateID&&!this.props.match.params.kitID?"form-top-input error":"form-top-input"}))),r.a.createElement("tr",null,r.a.createElement("td",{className:"create-form-label",align:"right"},"Name"),r.a.createElement("td",{align:"left",colSpan:2},r.a.createElement("input",{className:"form-top-input",type:"text",value:this.state.name,name:"name",placeholder:"CD000 Isolation Kit",onChange:this.handleInput}))),r.a.createElement("tr",null,r.a.createElement("td",{className:"create-form-label",align:"right"},"Species"),r.a.createElement("td",{align:"left",colSpan:2},r.a.createElement("input",{className:"form-top-input",type:"text",disabled:!!this.props.match.params.kitID,list:"species-choices",name:"species",onChange:this.handleInput,value:this.state.species,placeholder:"Dragon"}),r.a.createElement("datalist",{id:"species-choices"},this.props.allSpecies.map((function(e){return r.a.createElement("option",{key:e},e)}))))),r.a.createElement("tr",null,r.a.createElement("td",{className:"create-form-label",align:"right"},"Selection"),r.a.createElement("td",{align:"left",colSpan:2},r.a.createElement("input",{className:"form-top-input select-type",type:"text",list:"type-choices",name:"type",onKeyDown:function(e){e.preventDefault()},ref:this.typeRef,onMouseDown:function(){e.typeRef.current.value="",e.setState({type:""})},onChange:this.handleInput,value:this.state.type,placeholder:"Select one:"}),r.a.createElement("datalist",{id:"type-choices"},r.a.createElement("option",{value:"Positive"},"Positive"),r.a.createElement("option",{value:"Negative"},"Negative")))),r.a.createElement("tr",null,r.a.createElement("td",{className:"constants-header",colSpan:3},"Constants")))),r.a.createElement("div",{className:"scrollable-body table-of-constants-container"},r.a.createElement("table",{className:"table-of-constants"},r.a.createElement("thead",{className:"toc-head"},r.a.createElement("tr",{className:"toc-header"},r.a.createElement("th",{className:"toc-name-col create-form-label"},"Name"),r.a.createElement("th",{className:"create-form-label"},"Units"),r.a.createElement("th",{className:"create-form-label"},"Constant"),r.a.createElement("th",{className:"toc-cells-col create-form-label"},"Cells"))),r.a.createElement("tbody",null,this.state.constants.map((function(a,n){return r.a.createElement("tr",{key:n},r.a.createElement("td",null,r.a.createElement("input",{className:"form-bottom-input",type:"text",list:"constants-names",onChange:function(t){e.handleInputConstant(t,n,"constantName")},value:a[0]||"",placeholder:"Fireball Cocktail"}),r.a.createElement("datalist",{id:"constants-names"},t.constantNames.map((function(e){return r.a.createElement("option",{key:e},e)})))),r.a.createElement("td",null,r.a.createElement("input",{className:"form-bottom-input",type:"text",list:"units",onChange:function(t){e.handleInputConstant(t,n,"constantUnit")},value:a[1]||"",placeholder:"cups"}),r.a.createElement("datalist",{id:"units"},t.constantUnits.map((function(e){return r.a.createElement("option",{key:e},e)})))),r.a.createElement("td",null,r.a.createElement("input",{className:"form-bottom-input",type:"text",onChange:function(t){e.handleInputConstant(t,n,"constantValue")},value:a[2]||"",placeholder:"000"})),r.a.createElement("td",null,r.a.createElement("input",{className:"form-bottom-input",type:"text",list:"cells",onChange:function(t){e.handleInputConstant(t,n,"constantCells")},value:a[3]||"",placeholder:"10^00"}),r.a.createElement("datalist",{id:"cells"},t.constantCells.map((function(e){return r.a.createElement("option",{key:e},e)})))))}))))),r.a.createElement("div",{className:"create-add-subtract-container"},r.a.createElement("button",{className:"create-add-subtract-row-button create-add-button",type:"button",onClick:function(){return e.modifyConstantRows("add")}},"Add Row"),r.a.createElement("button",{className:"create-add-subtract-row-button create-subtract-button",type:"button",onClick:function(){return e.modifyConstantRows("subtract")}},"Remove Row"))),r.a.createElement("div",{className:"create-section-right"},r.a.createElement("button",{className:"create-master-button create-clear-button",type:"button",onClick:this.clearStateAndStorage},"Clear All"),r.a.createElement("input",{className:"create-master-button create-create-update-button hover-pointer",type:"submit",value:this.props.match.params.kitID?"Update Kit":"Create Kit"}),this.props.match.params.kitID?r.a.createElement("button",{className:"create-master-button create-delete-button",type:"button",onClick:function(){e.setState({alertMsg:"delete",showAlert:!0})}},"Delete Kit"):null)),r.a.createElement("div",{className:"delete"!==this.state.alertMsg&&this.state.showAlert?"alert-box":"alert-box-hidden"},r.a.createElement("div",{className:"alert-text"},"emptyFields"===this.state.alertMsg?"All fields must be filled.":"update"===this.state.alertMsg?"Isolation kit updated.":"New isolation kit created."),r.a.createElement("button",{className:"alert-button",onClick:this.handleAlert},"OK")),r.a.createElement("div",{className:"delete"===this.state.alertMsg&&this.state.showAlert?"alert-box alert-delete":"alert-box-hidden alert-delete"},r.a.createElement("div",{className:"alert-text"},"Permanently delete",r.a.createElement("br",null)," this isolation kit?"),r.a.createElement("div",{className:"alert-button-container"},r.a.createElement("button",{className:"alert-button alert-button-cancel",onClick:function(){return e.setState({showAlert:!1})}},"Cancel"),r.a.createElement("button",{className:"alert-button alert-button-delete",onClick:this.handleAlert},"DELETE"))),r.a.createElement(N,Object.assign({},this.props,{currComponent:"CreateOrEdit"})))}}]),a}(n.Component)),F=(a(76),function(e){return r.a.createElement("div",{className:"page"},r.a.createElement("div",{className:"error-container"},r.a.createElement("div",{className:"lock-icon"},r.a.createElement("div",{className:"lock-loop"}),r.a.createElement("div",{className:"lock-body"},r.a.createElement("div",{className:"lock-hole-top"}),r.a.createElement("div",{className:"lock-hole-bottom"}))),r.a.createElement("div",{className:"error-text"},"Please log in for full access.")),r.a.createElement(N,Object.assign({},e,{currComponent:"Error"})))}),P=function(e){var t=e.component,a=e.path,n=e.loggedIn,s=Object(E.a)(e,["component","path","loggedIn"]);return r.a.createElement(g.a,{path:a,render:function(e){return n?r.a.createElement(t,Object.assign({},e,s)):r.a.createElement(F,Object.assign({},e,s))}})},L=(a(77),function(e){Object(f.a)(a,e);var t=Object(b.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).handleChange=function(e){n.setState(Object(C.a)({},e.target.name,e.target.value))},n.handleSubmit=function(e,t){e.preventDefault(),"login"===t?n.logIn():"logout"===t&&n.logOut()},n.logIn=function(){if(""===n.state.password)return n.setState({passwordPlaceholder:"Please type a password"});j.logIn({username:n.state.username,password:n.state.password}).then((function(e){200===e.status&&(n.props.setLoggedInStatus(!0),n.setState({password:"",passwordPlaceholder:""}),console.log("Logged in."))})).catch((function(e){console.log("Login error:",e),n.setState({password:"",passwordPlaceholder:"Wrong password"})}))},n.logOut=function(){j.logOut().then((function(e){200===e.status&&(n.props.setLoggedInStatus(!1),console.log("Logged out."))})).catch((function(e){console.log("Login error: "),console.log(e)}))},n.state={username:"labmin",password:"",passwordPlaceholder:""},n}return Object(d.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"login-container"},r.a.createElement("div",{className:"login-mode"},this.props.loggedIn?"Full Access":"Visitor"),r.a.createElement("div",{className:"login-input-container"},r.a.createElement("input",{className:"login-input",onChange:this.handleChange,name:"password",autoComplete:"off",value:this.state.password,placeholder:this.state.passwordPlaceholder}),r.a.createElement("button",{className:this.props.loggedIn?"login-button logged-in-button":"login-button logged-out-button",onClick:function(t){e.handleSubmit(t,e.props.loggedIn?"logout":"login")}},this.props.loggedIn?"Log Out":"Log In")))}}]),a}(n.Component)),A=(a(78),function(e){return r.a.createElement("div",{className:"page"},r.a.createElement("div",{className:"invalid-container"},r.a.createElement("div",{className:"search-icon"},r.a.createElement("div",{className:"search-head"}),r.a.createElement("div",{className:"search-neck"}),r.a.createElement("div",{className:"search-handle"})),r.a.createElement("div",{className:"error-text invalid-text"},"Page could not be found.")),r.a.createElement(N,Object.assign({},e,{currComponent:"Error"})))}),U=(a(79),function(e){Object(f.a)(a,e);var t=Object(b.a)(a);function a(){var e;return Object(m.a)(this,a),(e=t.call(this)).componentDidMount=Object(p.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.fetchLocalStorage(),e.fetchKitsFromDatabase(),e.getUser();case 3:case"end":return t.stop()}}),t)}))),e.fetchLocalStorage=Object(p.a)(u.a.mark((function t(){var a,n,r,s,c,o;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("Fetching state from local storage..."),!(a=JSON.parse(localStorage.getItem("appState")))){t.next=6;break}return n=a.rowCount,r=a.currentSpecies,s=a.currentPosKits,c=a.currentNegKits,o=a.tableData,t.next=6,e.setState({rowCount:n,currentSpecies:r,currentPosKits:s,currentNegKits:c,tableData:o});case 6:console.log("State loaded.");case 7:case"end":return t.stop()}}),t)}))),e.fetchKitsFromDatabase=Object(p.a)(u.a.mark((function t(){var a,n,r,s,c,o,i,p,m,d,b,f,h;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("Fetching kits from database..."),t.next=3,j.getAllKits().then((function(e){return e.data.data})).catch((function(e){return console.error(e)}));case 3:a=t.sent,n=[],r=Object(l.a)(a);try{for(r.s();!(s=r.n()).done;)c=s.value,o=c.id,i=c.name,p=c.species,m=c.type,d=c.constants,n.push({id:o,name:i,species:p,type:m,constants:d})}catch(u){r.e(u)}finally{r.f()}return b=e.extractUniqueProps(n,"species"),f=Array.from(b).sort(),h=e.extractUniqueProps(n,"id"),t.next=12,e.setState({allKits:n,allSpecies:f,allKitIDs:h});case 12:console.log("All kits loaded.");case 13:case"end":return t.stop()}}),t)}))),e.extractUniqueProps=function(e,t){var a,n=new Set,r=Object(l.a)(e);try{for(r.s();!(a=r.n()).done;){var s=a.value;n.add(s[t])}}catch(c){r.e(c)}finally{r.f()}return n},e.getUser=function(){j.checkLoginStatus().then((function(t){t.data.user?(console.log("Existing session; logged in."),e.setState({loggedIn:!0})):(console.log("No existing session."),e.setState({loggedIn:!1}))})).catch((function(e){return console.error(e)}))},e.selectSpecies=function(){var t=Object(p.a)(u.a.mark((function t(a){var n,r,s,c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.state.allKits.filter((function(e){return e.species===a})),r=e.sortKits(n),s=r.currentPosKits,c=r.currentNegKits,t.next=4,e.setState({currentSpecies:a,currentPosKits:s,currentNegKits:c});case 4:e.updateLocalStorage();case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.sortKits=function(e){var t,a=[],n=[],r=Object(l.a)(e);try{for(r.s();!(t=r.n()).done;){var s=t.value;"Positive"===s.type?a.push(s):"Negative"===s.type&&n.push(s)}}catch(c){r.e(c)}finally{r.f()}return{currentPosKits:a,currentNegKits:n}},e.updateTable=function(){var t=Object(p.a)(u.a.mark((function t(a,n){var r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=Object(v.cloneDeep)(e.state.tableData),"add"!==a){t.next=7;break}return e.addRowToTable(n,r),t.next=5,e.modifyRowCount(a);case 5:t.next=13;break;case 7:if("subtract"!==a){t.next=13;break}if(!e.subtractRowFromTable(n,r)){t.next=11;break}return t.abrupt("return");case 11:return t.next=13,e.modifyRowCount(a);case 13:return t.next=15,e.setState({tableData:r});case 15:e.updateLocalStorage();case 16:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}(),e.addRowToTable=function(e,t){t[e.species]=t[e.species]||{};var a=t[e.species];a[e.id]=a[e.id]||{};var n=a[e.id];Object.keys(n).length||(Object.assign(n,e),n.samples=[]);var r=Array(e.constants.length+2).fill("");n.samples.push(r)},e.subtractRowFromTable=function(t,a){var n=a[t.species];if(!n||!n[t.id])return!0;var r=n[t.id].samples;r.pop(),r.length||e.deleteKitFromTable(a,t.species,t.id)},e.updateTableData=function(){var t=Object(p.a)(u.a.mark((function t(a,n){var r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=Object(v.cloneDeep)(e.state.tableData),"update"!==n){t.next=7;break}return e.updateKitInTable(a,r),t.next=5,e.setState({tableData:r});case 5:t.next=10;break;case 7:if("delete"!==n){t.next=10;break}return t.next=10,e.handleTableDeleteButton("kit",a.species,a.id);case 10:e.updateLocalStorage();case 11:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}(),e.updateKitInTable=function(t,a){var n=t.id,r=t.name,s=t.species,c=t.type,l=t.constants,i=a[s][n];for(var u in i.name=r,i.type=c,i.constants=l,i.samples){var p=i.samples[u],m=p[0],d=p[1];p=[m,d].concat(Object(o.a)(Array(l.length).fill(""))),e.calculateCells(p,l,d),i.samples[u]=p}},e.handleTableInput=function(){var t=Object(p.a)(u.a.mark((function t(a,n,r,s){var c,o;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=Object(v.cloneDeep)(e.state.tableData),o=c[n.species][n.id].samples[r],"sampleID"===a?o[0]=s:"cellCount"===a&&(o[1]=s,e.calculateCells(o,n.constants,s)),t.next=5,e.setState({tableData:c});case 5:e.updateLocalStorage();case 6:case"end":return t.stop()}}),t)})));return function(e,a,n,r){return t.apply(this,arguments)}}(),e.calculateCells=function(t,a,n){for(var r=2;r<t.length;r++){var s=a[r-2],c=s[3],o=s[2];if("n/a"!==c){var l=e.calculateVolume(c,o,n);t[r]=l?l.toLocaleString("en",{useGrouping:!0}):""}else t[r]=""!==n?o:""}},e.calculateVolume=function(t,a,n){var r=a*e.normalizeCellCount(t,n);return r>5e4&&(r=5e4),r<200?r.toFixed(1):Math.ceil(r)},e.normalizeCellCount=function(e,t){var a=t/Math.pow(10,(e&&e.split("^")[1])-6);return e.includes("up to")&&(a=Math.ceil(a)),a},e.handleTableDeleteButton=function(){var t=Object(p.a)(u.a.mark((function t(a,n,r){var s,c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s=e.state.rowCount,c=Object(v.cloneDeep)(e.state.tableData),"species"===a?s=e.deleteSpeciesFromTable(c,n,s):"kit"===a&&(s=e.deleteKitFromTable(c,n,r,s)),t.next=5,e.setState({rowCount:s,tableData:c});case 5:e.updateLocalStorage();case 6:case"end":return t.stop()}}),t)})));return function(e,a,n){return t.apply(this,arguments)}}(),e.deleteSpeciesFromTable=function(e,t,a){var n=e[t];for(var r in n)a-=n[r].samples.length;return delete e[t],a},e.deleteKitFromTable=function(e,t,a,n){return n&&(n-=e[t][a].samples.length),delete e[t][a],Object.keys(e[t]).length||delete e[t],n},e.clearTable=Object(p.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.setState({rowCount:0,tableData:{}});case 2:e.updateLocalStorage();case 3:case"end":return t.stop()}}),t)}))),e.setLoggedInStatus=function(t){e.setState({loggedIn:t})},e.updateLocalStorage=function(){var t=e.state,a=t.rowCount,n=t.currentSpecies,r=t.currentPosKits,s=t.currentNegKits,c=t.tableData;localStorage.setItem("appState",JSON.stringify({rowCount:a,currentSpecies:n,currentPosKits:r,currentNegKits:s,tableData:c}))},e.modifyRowCount=function(t){"add"===t?e.setState({rowCount:e.state.rowCount+1}):"subtract"===t&&e.setState({rowCount:e.state.rowCount-1})},e.state={loggedIn:!1,allKits:[],rowCount:0,currentSpecies:"",currentPosKits:[],currentNegKits:[],tableData:{},allSpecies:[],allKitIDs:{}},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(h.a,{className:"main"},r.a.createElement(L,{loggedIn:this.state.loggedIn,setLoggedInStatus:this.setLoggedInStatus}),r.a.createElement(g.c,null,r.a.createElement(g.a,{path:"/kits",render:function(t){return r.a.createElement(w,Object.assign({},t,{loggedIn:e.state.loggedIn,currentSpecies:e.state.currentSpecies,currentPosKits:e.state.currentPosKits,currentNegKits:e.state.currentNegKits,rowCount:e.state.rowCount,tableData:e.state.tableData,updateTable:e.updateTable}))}}),r.a.createElement(P,{path:["/edit/:kitID","/create"],component:T,loggedIn:this.state.loggedIn,allKits:this.state.allKits,rowCount:this.state.rowCount,allKitIDs:this.state.allKitIDs,currentSpecies:this.state.currentSpecies,allSpecies:this.state.allSpecies,tableData:this.state.tableData,fetchKitsFromDatabase:this.fetchKitsFromDatabase,selectSpecies:this.selectSpecies,updateTableData:this.updateTableData}),r.a.createElement(g.a,{path:"/table",render:function(t){return r.a.createElement(y,Object.assign({},t,{loggedIn:e.state.loggedIn,tableData:e.state.tableData,selectSpecies:e.selectSpecies,updateTable:e.updateTable,handleTableInput:e.handleTableInput,handleTableDeleteButton:e.handleTableDeleteButton,clearTable:e.clearTable}))}}),r.a.createElement(g.a,{path:"/",exact:!0,render:function(t){return r.a.createElement(S,Object.assign({},t,{loggedIn:e.state.loggedIn,rowCount:e.state.rowCount,allSpecies:e.state.allSpecies,selectSpecies:e.selectSpecies}))}}),r.a.createElement(g.a,{path:"/invalid",render:function(t){return r.a.createElement(A,Object.assign({},t,{rowCount:e.state.rowCount}))}}),r.a.createElement(g.a,{path:"/",render:function(t){return r.a.createElement(A,Object.assign({},t,{rowCount:e.state.rowCount}))}})))}}]),a}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(U,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[42,1,2]]]);
//# sourceMappingURL=main.62f8deca.chunk.js.map