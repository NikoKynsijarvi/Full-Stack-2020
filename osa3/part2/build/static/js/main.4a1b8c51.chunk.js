(this.webpackJsonppart3=this.webpackJsonppart3||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),u=t(13),r=t.n(u),c=t(2),l=t(3),m=t.n(l),i="/api/persons",s=function(){return m.a.get(i).then((function(e){return e.data}))},f=function(e){return m.a.post(i,e).then((function(e){return e.data}))},d=function(e,n){return m.a.put("".concat(i,"/").concat(e),n).then((function(e){return e.data}))},h=function(e){return m.a.delete("".concat(i,"/").concat(e)).then((function(e){return e.data}))},b=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{className:"error"},n)},g=function(e){return o.a.createElement("form",{onSubmit:e.addName},o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),o.a.createElement("div",null,"number:"," ",o.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},E=function(e){var n=e.name;return o.a.createElement("li",null,n.name," ",n.number)},p=function(e){return o.a.createElement("div",null,o.a.createElement("form",null,o.a.createElement("div",null,"filter with:",o.a.createElement("input",{value:e.newName2,onChange:e.handleNameChange2}))),o.a.createElement("ul",null,e.namesToShow.map((function(e){return o.a.createElement(E,{key:e.name,name:e})}))))},v=(t(36),function(e){return e.persons.map((function(n){return o.a.createElement("div",null,o.a.createElement("p",null," ",n.name," ",n.number," ",o.a.createElement("button",{onClick:function(){!0===window.confirm("delete "+n.name+"?")&&h(n.id).then((function(t){console.log(t),s().then((function(t){e.setPersons(t),e.setErrorMessage("Deleted ".concat(n.name," ")),setTimeout((function(){e.setErrorMessage(null)}),5e3)}))}))}},"delete")))}))}),w=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],u=n[1],r=Object(a.useState)(""),l=Object(c.a)(r,2),m=l[0],i=l[1],E=Object(a.useState)(""),w=Object(c.a)(E,2),N=w[0],j=w[1],O=Object(a.useState)(!1),C=Object(c.a)(O,2),S=C[0],T=(C[1],Object(a.useState)("")),k=Object(c.a)(T,2),y=k[0],M=k[1],P=Object(a.useState)(null),A=Object(c.a)(P,2),D=A[0],J=A[1];Object(a.useEffect)((function(){s().then((function(e){u(e),console.log(e)}))}),[]);var q=t.filter((function(e){return e.name===m}));if(console.log(q),q.length>1){i("");t.map((function(e){return e.name}));console.log(q),h(t.pop().id).then((function(e){}));var x=q[0].id;if(console.log(x),!0===window.confirm(m+" is already added to phonebook, replace old number with a new one?")){var B={name:m,number:N,id:x};d(x,B).then((function(e){s().then((function(e){u(e)}))})),J("Changed ".concat(B.name," number to ").concat(B.number," ")),setTimeout((function(){J(null)}),5e3)}}var I=S?t:t.filter((function(e){return e.name===y}));return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(b,{message:D}),o.a.createElement(p,{newName2:y,handleNameChange2:function(e){M(e.target.value)},namesToShow:I}),o.a.createElement("h2",null,"Add a new"),o.a.createElement(g,{addName:function(e){e.preventDefault();var n={name:m,number:N,id:t[t.length-1].id+1};f(n).then((function(e){u(t.concat(e)),i(""),j(""),console.log("joo"),J("Added ".concat(n.name," ")),setTimeout((function(){J(null)}),5e3)})).catch((function(e){console.log(e.response.data),n.number.length<8?(J("".concat(N," is too short")),setTimeout((function(){J(null)}),5e3),i(""),j("")):n.name.length<3?(J("".concat(m," is too short, give longer name")),setTimeout((function(){J(null)}),5e3),i(""),j("")):(J("Name must be unique"),setTimeout((function(){J(null)}),5e3),i(""),j(""))}))},newName:m,newNumber:N,handleNumberChange:function(e){j(e.target.value)},handleNameChange:function(e){i(e.target.value)}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(v,{persons:t,setPersons:u,setErrorMessage:J,newName2:y}))};r.a.render(o.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.4a1b8c51.chunk.js.map