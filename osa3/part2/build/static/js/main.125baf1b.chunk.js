(this.webpackJsonppart3=this.webpackJsonppart3||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),l=t(2),o=t(3),m=t.n(o),i="http://localhost:3001/api/persons",s=function(){return m.a.get(i).then((function(e){return e.data}))},d=function(e){return m.a.post(i,e).then((function(e){return e.data}))},f=function(e,n){return m.a.put("".concat(i,"/").concat(e),n).then((function(e){return e.data}))},h=function(e){return m.a.delete("".concat(i,"/").concat(e)).then((function(e){return e.data}))},b=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"},n)},E=function(e){return r.a.createElement("form",{onSubmit:e.addName},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),r.a.createElement("div",null,"number:"," ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},p=function(e){var n=e.name;return r.a.createElement("li",null,n.name," ",n.number)},g=function(e){return r.a.createElement("div",null,r.a.createElement("form",null,r.a.createElement("div",null,"filter with:",r.a.createElement("input",{value:e.newName2,onChange:e.handleNameChange2}))),r.a.createElement("ul",null,e.namesToShow.map((function(e){return r.a.createElement(p,{key:e.name,name:e})}))))},v=(t(36),function(e){return e.persons.map((function(n){return r.a.createElement("div",null,r.a.createElement("p",null," ",n.name," ",n.number," ",r.a.createElement("button",{onClick:function(){!0===window.confirm("delete "+n.name+"?")&&h(n.id).then((function(t){console.log(t),s().then((function(t){e.setPersons(t),e.setErrorMessage("Deleted ".concat(n.name," ")),setTimeout((function(){e.setErrorMessage(null)}),5e3)}))}))}},"delete")))}))}),w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),o=Object(l.a)(c,2),m=o[0],i=o[1],p=Object(a.useState)(""),w=Object(l.a)(p,2),N=w[0],j=w[1],O=Object(a.useState)(!1),C=Object(l.a)(O,2),S=C[0],k=(C[1],Object(a.useState)("")),T=Object(l.a)(k,2),y=T[0],M=T[1],P=Object(a.useState)(null),A=Object(l.a)(P,2),D=A[0],J=A[1];Object(a.useEffect)((function(){s().then((function(e){u(e),console.log(e)}))}),[]);var x=t.filter((function(e){return e.name===m}));if(x.length>1){i("");t.map((function(e){return e.name}));console.log(x),h(t.pop().id).then((function(e){}));var B=x[0].id;if(console.log(B),!0===window.confirm(m+" is already added to phonebook, replace old number with a new one?")){var I={name:m,number:N,id:B};f(B,I).then((function(e){s().then((function(e){u(e)}))})),J("Changed ".concat(I.name," number to ").concat(I.number," ")),setTimeout((function(){J(null)}),5e3)}}var q=S?t:t.filter((function(e){return e.name===y}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(b,{message:D}),r.a.createElement(g,{newName2:y,handleNameChange2:function(e){M(e.target.value)},namesToShow:q}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(E,{addName:function(e){e.preventDefault();var n={name:m,number:N,id:t[t.length-1].id+1};n.name.length>0&&d(n).then((function(e){u(t.concat(e)),i(""),j("")})),J("Added ".concat(n.name," ")),setTimeout((function(){J(null)}),5e3)},newName:m,newNumber:N,handleNumberChange:function(e){j(e.target.value)},handleNameChange:function(e){i(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(v,{persons:t,setPersons:u,setErrorMessage:J,newName2:y}))};c.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.125baf1b.chunk.js.map