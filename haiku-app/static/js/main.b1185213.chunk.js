(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){},16:function(e,t,n){},21:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(2),i=n.n(c),l=(n(15),n(16),n(3)),r=n(4),s=n(7),u=n(5),m=n(8),h=n(6),p=n.n(h),d=(n(21),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={line_count:0,line:""},n.updateCount=function(e){n.setState({line:e.target.value,line_count:p()(e.target.value)})},n}return Object(m.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){if(this.state.line_count==this.props.syllable_count)var e="match";else e="nomatch";return o.a.createElement("div",{className:"HaikuLine"},o.a.createElement("input",{type:"text",class:e,onChange:this.updateCount}),o.a.createElement("img",{class:"dotimg",src:"/haiku-app/img/"+this.state.line_count+"_"+this.props.syllable_count+".png"}))}}]),t}(a.Component));var v=function(){return o.a.createElement("div",{className:"App"},o.a.createElement("div",{class:"header"},"Haiku Writer"),o.a.createElement(d,{syllable_count:"5"}),o.a.createElement(d,{syllable_count:"7"}),o.a.createElement(d,{syllable_count:"5"}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,n){e.exports=n(22)}},[[9,1,2]]]);
//# sourceMappingURL=main.b1185213.chunk.js.map