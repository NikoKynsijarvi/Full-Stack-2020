(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},20:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(14),c=n.n(o),u=(n(20),n(4)),i=n(3),l=function(t){var e=t.message;return null===e?null:r.a.createElement("div",{className:"error"},e)},m=n(2),f=n.n(m),s="https://ancient-garden-96835.herokuapp.com/api/notes",p=function(){return f.a.get(s).then((function(t){return t.data}))},d=function(t){return f.a.post(s,t).then((function(t){return t.data}))},h=function(t,e){return f.a.put("".concat(s,"/").concat(t),e).then((function(t){return t.data}))},E=function(){return r.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},r.a.createElement("br",null),r.a.createElement("em",null,"Note app, Department of Computer Science, University of Jyv\xe4skyl\xe4 2020"))},b=function(t){var e=Object(a.useState)([]),n=Object(i.a)(e,2),o=n[0],c=n[1],m=Object(a.useState)(""),f=Object(i.a)(m,2),s=f[0],b=f[1],v=Object(a.useState)(!0),g=Object(i.a)(v,2),O=g[0],j=g[1],S=Object(a.useState)("some error happened..."),k=Object(i.a)(S,2),y=k[0],w=k[1];Object(a.useEffect)((function(){p().then((function(t){c(t)}))}),[]);var N=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"make not important":"make important";return r.a.createElement("li",{className:"note"},e.content,r.a.createElement("button",{onClick:n},a))},C=O?o:o.filter((function(t){return t.important}));return r.a.createElement("div",null,r.a.createElement("h1",null,"Notes"),r.a.createElement(l,{message:y}),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return j(!O)}},"show ",O?"important":"all")),r.a.createElement("ul",null,C.map((function(t){return r.a.createElement(N,{key:t.id,note:t,toggleImportance:function(){return function(t){"http://localhost:3001/notes/".concat(t);var e=o.find((function(e){return e.id===t})),n=Object(u.a)(Object(u.a)({},e),{},{important:!e.important});h(t,n).then((function(e){c(o.map((function(n){return n.id!=t?n:e})))})).catch((function(n){w("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){w(null)}),5e3),c(o.filter((function(e){return e.id!==t})))}))}(t.id)}})}))),r.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:s,date:(new Date).toISOString(),important:Math.random()>.5,id:o.length+1};d(e).then((function(t){c(o.concat(t)),b("")}))}},r.a.createElement("input",{value:s,onChange:function(t){b(t.target.value)}}),r.a.createElement("button",{type:"submit"},"save")),r.a.createElement(E,null))};c.a.render(r.a.createElement(b,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.a8d9d9f7.chunk.js.map