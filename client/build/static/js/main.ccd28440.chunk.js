(this["webpackJsonpsecondary-isolations"]=this["webpackJsonpsecondary-isolations"]||[]).push([[0],{42:function(e,t,a){e.exports=a(78)},47:function(e,t,a){},54:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){},78:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(39),c=a.n(s),o=(a(47),a(17)),l=a(10),i=a(1),u=a.n(i),p=a(2),d=a(6),m=a(7),b=a(12),f=a(8),h=a(9),g=a(20),v=a(15),E=a(14),k=a(23),S=Object(v.g)((function(e){var t=e.history,a=(e.location,e.match,e.staticContext,e.to),n=e.onClick,s=e.kit,c=Object(k.a)(e,["history","location","match","staticContext","to","onClick","kit"]);return r.a.createElement("button",Object.assign({},c,{onClick:function(e){n&&n(e),t.push(a,s)}}))})),y=(a(54),function(e){Object(h.a)(a,e);var t=Object(f.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"page"},r.a.createElement("header",null,r.a.createElement("h3",{className:"page-title"},"Secondary Isolation Calculator"),r.a.createElement("h5",{className:"home-subtitle"},"For"," ",r.a.createElement("a",{className:"miltenyi-link",href:"https://www.miltenyibiotec.com/US-en/",target:"_blank",rel:"noopener noreferrer"},"Miltenyi Biotec")," ","Kits")),r.a.createElement("div",{className:"home-container-species-buttons"},this.props.allSpecies.map((function(t){return r.a.createElement(S,{to:"/kits",className:"species-button",onClick:function(){return e.props.selectSpecies(t)},key:t},t)}))),r.a.createElement("footer",null,r.a.createElement(S,{to:"/table",className:"nav-button table-button"},"Table (",this.props.rowCount," Samples)")))}}]),a}(n.Component)),K=(a(55),function(e){Object(h.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).sortKitsByName=function(e){return e.sort((function(e,t){var a=e.name.toUpperCase(),n=t.name.toUpperCase();return a<n?-1:a>n?1:0}))},e}return Object(m.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"page"},r.a.createElement("header",null,r.a.createElement("h3",{className:"page-title"},this.props.currentSpecies)),r.a.createElement("div",{className:"kits-body"},r.a.createElement("div",{className:"kit-section section-positive-selection"},r.a.createElement("h5",{className:"kit-section-title"},"Positive Selection"),r.a.createElement("div",{className:"kit-section-list"},this.props.currentPosKits&&this.sortKitsByName(this.props.currentPosKits).map((function(t){return r.a.createElement("div",{className:"kit-info-container",key:t.id},r.a.createElement("div",{className:"kit-name-container"},r.a.createElement("b",null,t.name),r.a.createElement("div",null,t.id)),r.a.createElement(S,{to:"/edit/".concat(t.id),className:e.props.loggedIn?"nav-button":"logged-out",kit:t},"Edit Kit"),r.a.createElement("div",{className:"kit-options-container"},r.a.createElement("button",{className:"kit-options-button kit-remove-button",onClick:function(){e.props.updateTable("subtract",t)}},r.a.createElement("b",null,"-")),r.a.createElement("div",{className:"kit-count"},e.props.tableKitIDs[t.id]||0),r.a.createElement("button",{className:"kit-options-button kit-add-button",onClick:function(){e.props.updateTable("add",t)}},r.a.createElement("b",null,"+"))))})))),r.a.createElement("div",{className:"kit-section section-negative-selection"},r.a.createElement("h5",{className:"kit-section-title"},"Negative Selection"),r.a.createElement("div",{className:"kit-section-list"},this.props.currentNegKits&&this.sortKitsByName(this.props.currentNegKits).map((function(t){return r.a.createElement("div",{className:"kit-info-container",key:t.id},r.a.createElement("div",{className:"kit-name-container"},r.a.createElement("b",null,t.name),r.a.createElement("div",null,t.id)),r.a.createElement(S,{to:"/edit/".concat(t.id),className:e.props.loggedIn?"nav-button":"logged-out",kit:t},"Edit Kit"),r.a.createElement("div",{className:"kit-options-container"},r.a.createElement("button",{className:"kit-options-button kit-remove-button",onClick:function(){e.props.updateTable("subtract",t)}},r.a.createElement("b",null,"-")),r.a.createElement("div",{className:"kit-count"},e.props.tableKitIDs[t.id]||0),r.a.createElement("button",{className:"kit-options-button kit-add-button",onClick:function(){e.props.updateTable("add",t)}},r.a.createElement("b",null,"+"))))}))))),r.a.createElement("footer",null,r.a.createElement(S,{to:"/",className:"nav-button home-button"},"Home"),r.a.createElement(S,{to:"/create",className:this.props.loggedIn?"nav-button":"logged-out"},"Create Kit"),r.a.createElement(S,{to:"/table",className:"nav-button table-button"},"Table (",this.props.rowCount," Samples)")))}}]),a}(n.Component)),w=(a(56),function(e){Object(h.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,s=new Array(n),c=0;c<n;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).generateRows=function(t){for(var a=e.props.tableKitIDs[t.id],n=1,s=[],c=function(){var a=n,c=t.id+" "+a;s.push(r.a.createElement("tr",{key:a},r.a.createElement("td",{className:"user-input-cell"},r.a.createElement("input",{className:"user-input",onChange:function(a){return e.props.updateRowCellCount("sampleID",t.species,c,a.target.value)},value:e.props.tableRowsHash[t.species][c][0]||""})),r.a.createElement("td",{className:"user-input-cell"},r.a.createElement("input",{className:"user-input",onKeyPress:function(e){(e.charCode<48&&46!==e.charCode||e.charCode>57)&&e.preventDefault()},onChange:function(a){return e.props.updateRowCellCount("cellCount",t.species,c,a.target.value)},value:e.props.tableRowsHash[t.species][c][1]||""})),t.constants.map((function(a,n){return a[0].includes("(min)")||a[0].includes("(times x mL)")||a[0].includes("(g x min)")?r.a.createElement("td",{key:n},a[1]):r.a.createElement("td",{key:n},Number(a[1])*e.props.tableRowsHash[t.species][c][1]/10||"")})))),++n};n<=a;)c();return s},e}return Object(m.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"page"},r.a.createElement("div",{className:"groups-container",id:"divToPrint"},this.props.arrayedKitData.map((function(t){return r.a.createElement("div",{className:"tables-container",key:t[0]},r.a.createElement("div",{className:"tables-header"},r.a.createElement("div",null),r.a.createElement(S,{to:"/kits",className:"species-name",onClick:function(){return e.props.selectSpecies(t[0])},key:t[0]},t[0]),r.a.createElement("button",{className:"delete-button delete-species no-print",onClick:function(){return e.props.deleteSpeciesFromTable(t[0])}},"x")),t[1].map((function(t){return r.a.createElement("table",{className:"kit-table",key:t.id},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{colSpan:t.constants.length+2},r.a.createElement("div",{className:"kit-table-title"},r.a.createElement(S,{to:"/edit/".concat(t.id),className:e.props.loggedIn?"nav-button no-print":"logged-out",kit:t},"Edit Kit"),r.a.createElement("div",null,r.a.createElement("div",null,t.name,": ",t.id),r.a.createElement("div",null,"(",t.type," Selection)")),r.a.createElement("button",{className:"delete-button delete-kit no-print",onClick:function(){return e.props.deleteKitFromTable(t.id,t.species)}},"x")))),r.a.createElement("tr",{className:"kit-multipliers-row"},r.a.createElement("th",{colSpan:2},"Constants:"),t.constants.map((function(e,t){return r.a.createElement("th",{key:t},e[1])}))),r.a.createElement("tr",null,r.a.createElement("th",null,"Sample ID"),r.a.createElement("th",null,"Cell Count (10",r.a.createElement("sup",null,"6"),")"),t.constants.map((function(e,t){return r.a.createElement("th",{key:t},e[0])})))),r.a.createElement("tbody",null,e.generateRows(t)),r.a.createElement("tfoot",{className:"no-print"},r.a.createElement("tr",null,r.a.createElement("td",{colSpan:t.constants.length+2},r.a.createElement("div",{className:"kit-table-footer"},r.a.createElement("button",{className:"kit-table-row-button add-row-button",onClick:function(){return e.props.updateTable("add",t)}},"Add Row"),r.a.createElement("button",{className:"kit-table-row-button subtract-row-button",onClick:function(){return e.props.updateTable("subtract",t)}},"Subtract Row"))))))})))}))),r.a.createElement("footer",null,r.a.createElement("button",{className:"nav-button",onClick:function(){e.props.history.goBack()}},"Back"),r.a.createElement(S,{to:"/",className:"nav-button home-button"},"Home"),r.a.createElement("button",{className:"nav-button clear-table-button",onClick:function(){e.props.clearTable()}},"Clear Table"),r.a.createElement("button",{className:"nav-button",onClick:function(){window.print()}},"Print")))}}]),a}(n.Component)),C=a(22),D=a(25),N=a.n(D).a.create({withCredentials:!0}),I={createKit:function(e){return N.post("/api/kit",e)},updateKitById:function(e,t){return N.put("/api/kit/".concat(e),t)},deleteKitById:function(e){return N.delete("/api/kit/".concat(e))},getAllKits:function(){return N.get("/api/kits")},logIn:function(e){return N.post("/api/login",e)},checkLoginStatus:function(){return N.get("/api/login")},logOut:function(){return N.post("/api/logout")}},x=(a(74),function(e){Object(h.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).componentDidMount=Object(p.a)(u.a.mark((function e(){var t,a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.props.match.params.kitID){e.next=17;break}if(!n.props.location.state){e.next=9;break}return t=n.extractConstantNames(n.props.location.state.constants),e.next=5,n.setState(n.props.location.state);case 5:return e.next=7,n.setState({constants:t});case 7:e.next=14;break;case 9:return console.log("Fetching saved update kit data..."),a=JSON.parse(localStorage.getItem("updateState")),e.next=13,n.setState(a);case 13:console.log("Saved update kit data loaded.");case 14:n.updateLocalStorage("update"),e.next=22;break;case 17:return console.log("Fetching saved create kit data..."),r=JSON.parse(localStorage.getItem("createState")),e.next=21,n.setState(r);case 21:console.log("Saved create kit data loaded.");case 22:case"end":return e.stop()}}),e)}))),n.extractConstantNames=function(e){return e.map((function(e){var t=e[0].split(" (");return t[1]="(".concat(t[1]),[].concat(Object(o.a)(t),[e[1]])}))},n.updateLocalStorage=function(e){"create"===e?localStorage.setItem("createState",JSON.stringify(n.state)):"update"===e&&localStorage.setItem("updateState",JSON.stringify(n.state))},n.handleInput=function(){var e=Object(p.a)(u.a.mark((function e(t,a,r){var s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s=Object(E.cloneDeep)(n.state.constants),!r){e.next=7;break}return"constantName"===r?s[a][0]=t.target.value:"constantUnit"===r?s[a][1]=t.target.value:"constantValue"===r&&(s[a][2]=t.target.value),e.next=5,n.setState({constants:s});case 5:e.next=10;break;case 7:return e.next=9,n.setState(Object(C.a)({},t.target.name,t.target.value));case 9:n.props.allKitIDs.has(n.state.id)?n.setState({duplicateID:!0}):n.setState({duplicateID:!1});case 10:n.updateLocalStorage(n.props.match.params.kitID?"update":"create");case 11:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),n.checkID=function(){n.props.allKitIDs.has(n.state.id)&&alert("This kit ID is already in use.")},n.capitalizeWords=function(e){return e.split(" ").map((function(e){return e[0].toUpperCase()+e.slice(1)})).join(" ")},n.capitalizeFields=function(e,t,a){return{nameCap:n.capitalizeWords(e),speciesCap:n.capitalizeWords(t),constantsCap:a.map((function(e){e[0]=n.capitalizeWords(e[0]);var t=[];return t.push(e[0].concat(" "+e[1])),t.push(e[2]),t}))}},n.checkForEmptyFields=function(e,t,a,n,r){var s,c=!1,o=Object(l.a)(r);try{for(o.s();!(s=o.n()).done;){var i=s.value;i[0]&&i[1]&&i[2]||(c=!0)}}catch(u){o.e(u)}finally{o.f()}return!(""!==e&&""!==t&&""!==a&&""!==n&&!c)&&(alert("All fields must be filled."),!0)},n.validateFields=function(){var e=Object(E.cloneDeep)(n.state),t=e.id,a=e.name,r=e.species,s=e.type,c=e.constants;if(n.checkForEmptyFields(t,a,r,s,c))return!1;var o=n.capitalizeFields(a,r,c);return{id:t,name:o.nameCap,species:o.speciesCap,type:s,constants:o.constantsCap}},n.handleSubmit=function(){var e=Object(p.a)(u.a.mark((function e(t,a){var r,s,c,o,l,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!1!==n.validateFields()){e.next=3;break}return e.abrupt("return");case 3:if(r=n.validateFields(),s=r.id,c=r.name,o=r.species,l=r.type,i=r.constants,"update"!==a){e.next=9;break}return e.next=7,I.updateKitById(s,{name:c,species:o,type:l,constants:i});case 7:e.next=11;break;case 9:return e.next=11,I.createKit({id:s,name:c,species:o,type:l,constants:i});case 11:return"update"===a&&(n.props.updateTableKitData(s),n.props.history.goBack()),e.next=14,n.clearStateAndStorage();case 14:return alert("update"===a?"Kit updated in database!":"New kit added to database!"),e.next=17,n.props.fetchKitsFromDatabase();case 17:return e.next=19,n.props.selectSpecies(n.props.currentSpecies);case 19:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),n.clearStateAndStorage=function(){localStorage.removeItem(n.props.match.params.kitID?"updateState":"createState"),n.setState({id:"",name:"",species:"",type:"",constants:[[null,null,null]]})},n.modifyConstantRows=function(){var e=Object(p.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("add"!==t){e.next=5;break}return e.next=3,n.setState({constants:[].concat(Object(o.a)(n.state.constants),[[null,null,null]])});case 3:e.next=8;break;case 5:if("subtract"!==t){e.next=8;break}return e.next=8,n.setState({constants:n.state.constants.slice(0,-1)});case 8:n.updateLocalStorage(n.props.match.params.kitID?"update":"create");case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.deleteKit=function(){var e=Object(p.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.clearStateAndStorage(),e.next=3,I.deleteKitById(t);case 3:return e.next=5,n.props.fetchKitsFromDatabase();case 5:return e.next=7,n.props.selectSpecies(n.props.currentSpecies);case 7:n.props.history.goBack(),console.log("Kit deleted from database.");case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.createArrayOfNonRepeatingElements=function(e,t){var a,n=new Set,r=Object(l.a)(e);try{for(r.s();!(a=r.n()).done;){var s=a.value;n.add(s[t])}}catch(c){r.e(c)}finally{r.f()}return Array.from(n).sort()},n.state={id:"",name:"",species:"",type:"",constants:[[null,null,null]],duplicateID:!1},n}return Object(m.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"page"},r.a.createElement("header",null,r.a.createElement("h3",{className:"page-title"},this.props.match.params.kitID?r.a.createElement(r.a.Fragment,null,"Edit Kit (",r.a.createElement("a",{href:"https://www.miltenyibiotec.com/US-en/search.html?search=".concat(this.props.match.params.kitID,"&options=on#globalSearchFamilies=%5B%5D"),target:"_blank",rel:"noopener noreferrer"},this.props.match.params.kitID),")"):"Create Kit")),r.a.createElement("div",{className:"create-body"},r.a.createElement("div",null,"All fields required."),r.a.createElement("form",{className:"create-form",autoComplete:"off",onSubmit:function(t){e.handleSubmit(t,e.props.match.params.kitID?"update":"create")}},r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",{align:"right"},"ID:"),r.a.createElement("td",{align:"left",colSpan:2},r.a.createElement("input",{type:"text",value:this.state.id,disabled:!!this.props.match.params.kitID,name:"id",placeholder:"000-000-000",onChange:this.handleInput,onBlur:this.checkID,className:this.state.duplicateID&&!this.props.match.params.kitID?"error":""}))),r.a.createElement("tr",null,r.a.createElement("td",{align:"right"},"Name:"),r.a.createElement("td",{align:"left",colSpan:2},r.a.createElement("input",{type:"text",value:this.state.name,name:"name",placeholder:"CD000 Isolation Kit",onChange:this.handleInput}))),r.a.createElement("tr",null,r.a.createElement("td",{align:"right"},"Species:"),r.a.createElement("td",{align:"left",colSpan:2},r.a.createElement("input",{type:"text",list:"species-choices",name:"species",onChange:this.handleInput,value:this.state.species,placeholder:this.state.species?"":"Unicorn"}),r.a.createElement("datalist",{id:"species-choices"},this.props.allSpecies.map((function(e){return r.a.createElement("option",{key:e},e)}))))),r.a.createElement("tr",null,r.a.createElement("td",{align:"right"},"Type:"),r.a.createElement("td",{align:"left",colSpan:2},r.a.createElement("select",{name:"type",value:"Positive"===this.state.type?"Positive":"Negative"===this.state.type?"Negative":"Select one:",onChange:this.handleInput},r.a.createElement("option",{hidden:!0},"Select one:"),r.a.createElement("option",{value:"Positive"},"Positive"),r.a.createElement("option",{value:"Negative"},"Negative")))),r.a.createElement("tr",null,r.a.createElement("td",{colSpan:3},"Constants")),r.a.createElement("tr",null,r.a.createElement("td",{colSpan:3},"Be sure to include units.")),r.a.createElement("tr",null,r.a.createElement("td",null,"Name"),r.a.createElement("td",null,"Units"),r.a.createElement("td",null,"Constant")),this.state.constants.map((function(t,a){return r.a.createElement("tr",{key:a},r.a.createElement("td",{align:"right"},r.a.createElement("input",{type:"text",list:"constants-names",onChange:function(t){e.handleInput(t,a,"constantName")},value:t[0]||"",placeholder:t[0]?"":"Reagent"}),r.a.createElement("datalist",{id:"constants-names"},e.createArrayOfNonRepeatingElements(e.props.allConstantNames,0).map((function(e){return r.a.createElement("option",{key:e},e)})))),r.a.createElement("td",null,r.a.createElement("input",{type:"text",list:"units",onChange:function(t){e.handleInput(t,a,"constantUnit")},value:t[1]||"",placeholder:t[1]?"":"(unit)"}),r.a.createElement("datalist",{id:"units"},e.createArrayOfNonRepeatingElements(e.props.allConstantNames,1).map((function(e){return r.a.createElement("option",{key:e},e)})))),r.a.createElement("td",{align:"left"},r.a.createElement("input",{type:"text",onChange:function(t){e.handleInput(t,a,"constantValue")},value:t[2]||"",placeholder:t[2]?"":"000"})))})))),r.a.createElement("div",{className:"create-add-subtract-container"},r.a.createElement("button",{className:"create-row-button add-row-button",type:"button",onClick:function(){return e.modifyConstantRows("add")}},"Add Row"),r.a.createElement("button",{className:"create-row-button subtract-row-button",type:"button",onClick:function(){return e.modifyConstantRows("subtract")}},"Subtract Row")),r.a.createElement("button",{type:"button",onClick:this.clearStateAndStorage},"Clear All"),r.a.createElement("input",{type:"submit",value:this.props.match.params.kitID?"Update Kit":"Create Kit"}),this.props.match.params.kitID?r.a.createElement("button",{type:"button",onClick:function(){window.confirm("Confirm permanently deleting this kit from the database?")&&e.deleteKit(e.state.id)}},"Delete Kit"):null)),r.a.createElement("footer",null,r.a.createElement("button",{className:"nav-button",onClick:function(){e.props.history.goBack()}},"Back"),r.a.createElement(S,{to:"/",className:"nav-button home-button"},"Home"),r.a.createElement(S,{to:"/table",className:"nav-button table-button"},"Table (",this.props.rowCount," Samples)")))}}]),a}(n.Component)),O=function(e){var t=e.component,a=e.path,n=e.loggedIn,s=Object(k.a)(e,["component","path","loggedIn"]);return r.a.createElement(v.b,{path:a,render:function(e){return n?r.a.createElement(t,Object.assign({},e,s)):r.a.createElement(v.a,{to:"/error"})}})},j=(a(75),function(e){Object(h.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).handleChange=function(e){n.setState(Object(C.a)({},e.target.name,e.target.value))},n.handleSubmit=function(){var e=Object(p.a)(u.a.mark((function e(t,a){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),"login"!==a){e.next=11;break}if(!n.props.loggedIn){e.next=6;break}return e.abrupt("return",n.setState({password:"",passwordPlaceholder:"Already logged in!"}));case 6:if(""!==n.state.password){e.next=8;break}return e.abrupt("return",n.setState({passwordPlaceholder:"Password needed!"}));case 8:I.logIn({username:n.state.username,password:n.state.password}).then((function(e){200===e.status&&(n.props.setLoggedInStatus(!0),n.setState({password:"",passwordPlaceholder:""}))})).catch((function(e){console.log("Login error:",e),n.setState({password:"",passwordPlaceholder:"Wrong password!"})})),e.next=12;break;case 11:"logout"===a&&I.logOut().then((function(e){200===e.status&&n.props.setLoggedInStatus(!1)})).catch((function(e){console.log("login error: "),console.log(e)}));case 12:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),n.state={username:"admin",password:"",passwordPlaceholder:""},n}return Object(m.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("input",{onChange:this.handleChange,name:"password",autoComplete:"off",value:this.state.password,placeholder:this.state.passwordPlaceholder}),r.a.createElement("button",{className:"nav-button",onClick:function(t){e.handleSubmit(t,"login")}},"Log In"),r.a.createElement("button",{className:"nav-button",onClick:function(t){e.handleSubmit(t,"logout")}},"Log Out"),r.a.createElement("div",null,this.props.loggedIn?"Full Access Mode":"Visitor Mode"))}}]),a}(n.Component)),T=(a(76),function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"You are not logged in."),r.a.createElement("button",{className:"nav-button",onClick:function(){e.history.goBack()}},"Back"))}),R=(a(77),function(e){Object(h.a)(a,e);var t=Object(f.a)(a);function a(){var e;return Object(d.a)(this,a),(e=t.call(this)).componentDidMount=Object(p.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.fetchLocalStorage(),t.next=3,e.fetchKitsFromDatabase();case 3:e.getUser();case 4:case"end":return t.stop()}}),t)}))),e.getUser=function(){I.checkLoginStatus().then((function(t){t.data.user?(console.log("Existing session; logged in."),e.setState({loggedIn:!0})):(console.log("No existing session."),e.setState({loggedIn:!1}))}))},e.setLoggedInStatus=function(t){e.setState({loggedIn:t})},e.fetchLocalStorage=Object(p.a)(u.a.mark((function t(){var a,n,r,s,c,o,l,i,p;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("Fetching state from local storage..."),!(a=JSON.parse(localStorage.getItem("appState")))){t.next=6;break}return n=a.rowCount,r=a.currentSpecies,s=a.currentPosKits,c=a.currentNegKits,o=a.tableKitIDs,l=a.tableKitData,i=a.arrayedKitData,p=a.tableRowsHash,t.next=6,e.setState({rowCount:n,currentSpecies:r,currentPosKits:s,currentNegKits:c,tableKitIDs:o,tableKitData:l,arrayedKitData:i,tableRowsHash:p});case 6:console.log("State loaded.");case 7:case"end":return t.stop()}}),t)}))),e.fetchKitsFromDatabase=Object(p.a)(u.a.mark((function t(){var a,n,r,s,c,o,i,p,d,m,b,f,h,g;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("Fetching kits from database..."),t.next=3,I.getAllKits();case 3:a=t.sent,n=a.data.data,r=[],s=Object(l.a)(n);try{for(s.s();!(c=s.n()).done;)o=c.value,i=o.id,p=o.name,d=o.species,m=o.type,b=o.constants,r.push({id:i,name:p,species:d,type:m,constants:b})}catch(u){s.e(u)}finally{s.f()}return f=e.extractAllSpecies(r).sort(),h=e.createKitIDHash(r),g=e.extractConstantNames(r),t.next=13,e.setState({allKits:r,allConstantNames:g,allSpecies:f,allKitIDs:h});case 13:console.log("All kits loaded.");case 14:case"end":return t.stop()}}),t)}))),e.createKitIDHash=function(e){var t,a=new Set,n=Object(l.a)(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;a.add(r.id)}}catch(s){n.e(s)}finally{n.f()}return a},e.extractConstantNames=function(e){var t,a=[],n=Object(l.a)(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;a.push.apply(a,Object(o.a)(r.constants))}}catch(p){n.e(p)}finally{n.f()}for(var s=new Set,c=0,i=a;c<i.length;c++){var u=i[c];s.add(u[0])}return Array.from(s).sort().map((function(e){var t=e.split(" (");return t[1]="(".concat(t[1]),t}))},e.extractAllSpecies=function(e){var t,a=new Set,n=Object(l.a)(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;a.add(r.species)}}catch(s){n.e(s)}finally{n.f()}return Array.from(a)},e.updateLocalStorage=function(){localStorage.setItem("appState",JSON.stringify(e.state))},e.modifyRowCount=function(t){"add"===t?e.setState({rowCount:e.state.rowCount+1}):"subtract"===t&&e.setState({rowCount:e.state.rowCount-1})},e.selectSpecies=function(){var t=Object(p.a)(u.a.mark((function t(a){var n,r,s,c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.state.allKits.filter((function(e){return e.species===a})),r=e.sortKits(n),s=r.currentPosKits,c=r.currentNegKits,t.next=4,e.setState({currentSpecies:a,currentPosKits:s,currentNegKits:c});case 4:e.updateLocalStorage();case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.sortKits=function(e){var t,a=[],n=[],r=Object(l.a)(e);try{for(r.s();!(t=r.n()).done;){var s=t.value;"Positive"===s.type?a.push(s):"Negative"===s.type&&n.push(s)}}catch(c){r.e(c)}finally{r.f()}return{currentPosKits:a,currentNegKits:n}},e.updateTable=function(){var t=Object(p.a)(u.a.mark((function t(a,n){var r,s,c,o,l;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=Object.assign({},e.state.tableKitIDs),"add"!==a){t.next=17;break}return r[n.id]=(r[n.id]||0)+1,s=r[n.id],c=n.id+" "+s,t.next=7,e.modifyTableRowsHash(a,n.species,c);case 7:return t.next=9,e.modifyRowCount(a);case 9:return t.next=11,e.setState({tableKitIDs:r});case 11:if(1!==r[n.id]){t.next=14;break}return t.next=14,e.addKitData(n.id);case 14:console.log("App state after ADD:",e.state),t.next=32;break;case 17:if("subtract"!==a){t.next=32;break}if(!r[n.id]){t.next=28;break}return o=r[n.id],l=n.id+" "+o,--r[n.id],t.next=24,e.setState({tableKitIDs:r});case 24:return t.next=26,e.modifyTableRowsHash(a,n.species,l);case 26:return t.next=28,e.modifyRowCount(a);case 28:if(r[n.id]){t.next=31;break}return t.next=31,e.removeKitData(n.id);case 31:console.log("App state after REMOVE:",e.state);case 32:e.updateLocalStorage();case 33:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}(),e.addKitData=function(){var t=Object(p.a)(u.a.mark((function t(a){var n,r,s,c,i;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=Object(l.a)(e.state.allKits),t.prev=1,n.s();case 3:if((r=n.n()).done){t.next=13;break}if((s=r.value).id!==a){t.next=11;break}return c=[].concat(Object(o.a)(e.state.tableKitData),[s]),i=e.hashifyKitData(c),t.next=10,e.setState({tableKitData:c,arrayedKitData:i});case 10:return t.abrupt("return");case 11:t.next=3;break;case 13:t.next=18;break;case 15:t.prev=15,t.t0=t.catch(1),n.e(t.t0);case 18:return t.prev=18,n.f(),t.finish(18);case 21:return console.log("Kit not found in allKits."),t.abrupt("return");case 23:case"end":return t.stop()}}),t,null,[[1,15,18,21]])})));return function(e){return t.apply(this,arguments)}}(),e.removeKitData=function(t){var a=e.state.tableKitData.filter((function(e){return e.id!==t})),n=e.hashifyKitData(a);e.setState({tableKitData:a,arrayedKitData:n})},e.updateTableKitData=function(t){var a,n={},r=Object(l.a)(e.state.allKits);try{for(r.s();!(a=r.n()).done;){var s=a.value;if(s.id===t){n=s;break}}}catch(u){r.e(u)}finally{r.f()}for(var c=Object(E.cloneDeep)(e.state.tableKitData),o=0;o<c.length;o++)c[o].id===t&&(c[o]=n);var i=e.hashifyKitData(c);e.setState({tableKitData:c,arrayedKitData:i})},e.hashifyKitData=function(t){var a,n={},r=Object(l.a)(t);try{for(r.s();!(a=r.n()).done;){var s=a.value;n[s.species]=(n[s.species]||[]).concat(s)}}catch(c){r.e(c)}finally{r.f()}return e.arrayifyKitData(n)},e.arrayifyKitData=function(e){var t=[];for(var a in e){var n=[a,e[a]];t.push(n)}return t},e.modifyTableRowsHash=function(){var t=Object(p.a)(u.a.mark((function t(a,n,r){var s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s=Object(E.cloneDeep)(e.state.tableRowsHash),"add"===a?(s[n]||(s[n]={}),s[n][r]=[void 0,void 0]):"subtract"===a&&delete s[n][r],t.next=4,e.setState({tableRowsHash:s});case 4:e.updateLocalStorage();case 5:case"end":return t.stop()}}),t)})));return function(e,a,n){return t.apply(this,arguments)}}(),e.updateRowCellCount=function(){var t=Object(p.a)(u.a.mark((function t(a,n,r,s){var c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=Object(E.cloneDeep)(e.state.tableRowsHash),"cellCount"===a?c[n][r][1]=s:"sampleID"===a&&(c[n][r][0]=s),t.next=4,e.setState({tableRowsHash:c});case 4:e.updateLocalStorage();case 5:case"end":return t.stop()}}),t)})));return function(e,a,n,r){return t.apply(this,arguments)}}(),e.deleteSpeciesFromTable=function(){var t=Object(p.a)(u.a.mark((function t(a){var n,r,s,c,o,l,i,p,d,m,b,f;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(n=Object(E.cloneDeep)(e.state),r=n.rowCount,s=n.tableKitIDs,c=n.tableKitData,o=n.arrayedKitData,l=n.tableRowsHash,i=l[a],p=Object.keys(i).length,r-=p,delete l[a],d=[],c=c.filter((function(e){return e.species!==a||(d.push(e.id),!1)})),m=0,b=d;m<b.length;m++)f=b[m],delete s[f];return o=o.filter((function(e){return e[0]!==a})),t.next=12,e.setState({rowCount:r,tableKitIDs:s,tableKitData:c,arrayedKitData:o,tableRowsHash:l});case 12:e.updateLocalStorage();case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.deleteKitFromTable=function(){var t=Object(p.a)(u.a.mark((function t(a,n){var r,s,c,o,l,i,p,d,m,b;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(d in r=Object(E.cloneDeep)(e.state),s=r.rowCount,c=r.tableKitIDs,o=r.tableKitData,l=r.tableRowsHash,i=0,p=l[n])d.slice(0,-2)===a&&(++i,delete p[d]);for(m in s-=i,c)m===a&&delete c[m];return o=o.filter((function(e){return e.id!==a})),b=e.hashifyKitData(o),t.next=11,e.setState({rowCount:s,tableKitIDs:c,tableKitData:o,arrayedKitData:b,tableRowsHash:l});case 11:e.updateLocalStorage();case 12:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}(),e.clearTable=Object(p.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.setState({rowCount:0,tableKitIDs:{},tableKitData:[],arrayedKitData:[],tableRowsHash:{}});case 2:e.updateLocalStorage();case 3:case"end":return t.stop()}}),t)}))),e.state={loggedIn:!1,allKits:[],allConstantNames:[],rowCount:0,currentSpecies:"No Species Selected",currentPosKits:[],currentNegKits:[],tableKitIDs:{},tableKitData:[],arrayedKitData:[],tableRowsHash:{},allSpecies:[],allKitIDs:{}},e.selectSpecies=e.selectSpecies.bind(Object(b.a)(e)),e.updateTable=e.updateTable.bind(Object(b.a)(e)),e.clearTable=e.clearTable.bind(Object(b.a)(e)),e.deleteSpeciesFromTable=e.deleteSpeciesFromTable.bind(Object(b.a)(e)),e.deleteKitFromTable=e.deleteKitFromTable.bind(Object(b.a)(e)),e.fetchKitsFromDatabase=e.fetchKitsFromDatabase.bind(Object(b.a)(e)),e.updateTableKitData=e.updateTableKitData.bind(Object(b.a)(e)),e.setLoggedInStatus=e.setLoggedInStatus.bind(Object(b.a)(e)),e}return Object(m.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(g.a,{className:"main"},r.a.createElement(j,{loggedIn:this.state.loggedIn,setLoggedInStatus:this.setLoggedInStatus}),r.a.createElement(v.d,null,r.a.createElement(v.b,{path:"/kits",render:function(t){return r.a.createElement(K,Object.assign({},t,{loggedIn:e.state.loggedIn,currentSpecies:e.state.currentSpecies,currentPosKits:e.state.currentPosKits,currentNegKits:e.state.currentNegKits,rowCount:e.state.rowCount,tableKitIDs:e.state.tableKitIDs,updateTable:e.updateTable}))}}),r.a.createElement(O,{path:"/edit/:kitID",component:x,loggedIn:this.state.loggedIn,allConstantNames:this.state.allConstantNames,rowCount:this.state.rowCount,allKitIDs:this.state.allKitIDs,currentSpecies:this.state.currentSpecies,allSpecies:this.state.allSpecies,fetchKitsFromDatabase:this.fetchKitsFromDatabase,selectSpecies:this.selectSpecies,updateTableKitData:this.updateTableKitData}),r.a.createElement(O,{path:"/create",component:x,loggedIn:this.state.loggedIn,allConstantNames:this.state.allConstantNames,allKits:this.allKits,rowCount:this.state.rowCount,allKitIDs:this.state.allKitIDs,currentSpecies:this.state.currentSpecies,allSpecies:this.state.allSpecies,fetchKitsFromDatabase:this.fetchKitsFromDatabase,selectSpecies:this.selectSpecies}),r.a.createElement(v.b,{path:"/table",render:function(t){return r.a.createElement(w,Object.assign({},t,{loggedIn:e.state.loggedIn,tableKitIDs:e.state.tableKitIDs,tableKitData:e.state.tableKitData,arrayedKitData:e.state.arrayedKitData,tableRowsHash:e.state.tableRowsHash,selectSpecies:e.selectSpecies,updateTable:e.updateTable,updateRowCellCount:e.updateRowCellCount,deleteSpeciesFromTable:e.deleteSpeciesFromTable,deleteKitFromTable:e.deleteKitFromTable,clearTable:e.clearTable}))}}),r.a.createElement(v.b,{path:"/",exact:!0,render:function(t){return r.a.createElement(y,Object.assign({},t,{rowCount:e.state.rowCount,allSpecies:e.state.allSpecies,selectSpecies:e.selectSpecies}))}}),r.a.createElement(v.b,{path:"/error",render:function(e){return r.a.createElement(T,e)}})))}}]),a}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(R,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[42,1,2]]]);
//# sourceMappingURL=main.ccd28440.chunk.js.map