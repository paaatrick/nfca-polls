(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{143:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(185);t.default=function(){return r.a.createElement(l.a,null,"hello world!")}},160:function(e,t,a){var n;e.exports=(n=a(172))&&n.default||n},171:function(e){e.exports={data:{site:{siteMetadata:{title:"NFCA Polls"}}}}},172:function(e,t,a){"use strict";a.r(t);a(36);var n=a(0),r=a.n(n),l=a(4),o=a.n(l),i=a(60),c=a(2),s=function(e){var t=e.location,a=c.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(i.a,Object.assign({location:t,pageResources:a},a.json))};s.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=s},173:function(e){e.exports={data:{allRankingsJson:{edges:[{node:{year:2019}},{node:{year:2018}},{node:{year:2017}},{node:{year:2016}},{node:{year:2015}},{node:{year:2014}}]}}}},185:function(e,t,a){"use strict";var n=a(171),r=a(0),l=a.n(r),o=a(4),i=a.n(o),c=a(34),s=a.n(c),u=(a(160),l.a.createContext({})),m=function(e){return l.a.createElement(u.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):l.a.createElement("div",null,"Loading (StaticQuery)")})};m.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func};var p=a(156),d=a(224),h=a.n(d),f=a(225),E=a.n(f),g=a(186),w=a.n(g),y=function(e){var t=e.title;return l.a.createElement(w.a,null,l.a.createElement("title",null,t),l.a.createElement("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css?family=Roboto:300,400,500"}))},v=a(7),b=a.n(v),x=a(209),k=a.n(x),O=a(219),T=a.n(O),S=a(216),N=a.n(S),j=a(212),q=a.n(j),R=a(211),C=a.n(R),P=a(213),B=a.n(P),D=a(163),F=a.n(D),J=(a(36),a(173)),M=a(17),z=a(188),G=a.n(z),I=a(204),L=a.n(I),A=a(205),Q=a.n(A),U=a(208),W=a.n(U),H=function(e){function t(){return e.apply(this,arguments)||this}return b()(t,e),t.prototype.render=function(){var e=this.props.classes;return l.a.createElement(m,{query:"660008685",render:function(t){var a=t.allRankingsJson.edges.map(function(e){return e.node.year});return l.a.createElement(M.Location,null,function(t){var n=t.location;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:e.toolbar}),l.a.createElement(G.a,null),l.a.createElement(L.a,{disablePadding:!0},a.map(function(e,t){return l.a.createElement(Q.a,{button:!0,key:e,selected:n.pathname==="/"+e,component:function(t){return l.a.createElement(s.a,Object.assign({to:"/"+e},t))}},l.a.createElement(W.a,{primary:e}))})))})},data:J})},t}(l.a.Component),K=Object(p.withStyles)(function(e){return{toolbar:e.mixins.toolbar}},{withTheme:!0})(H),V=function(e){function t(t){var a;return(a=e.call(this,t)||this).handleDrawerToggle=function(){a.setState(function(e){return{drawerOpen:!e.drawerOpen}})},a.state={drawerOpen:!1},a}return b()(t,e),t.prototype.render=function(){var e=this.props,t=e.classes,a=e.theme,n=e.title,r=this.state.drawerOpen;return l.a.createElement(l.a.Fragment,null,l.a.createElement(k.a,{position:"fixed",className:t.appBar},l.a.createElement(C.a,null,l.a.createElement(q.a,{color:"inherit","aria-label":"Open drawer",onClick:this.handleDrawerToggle,className:t.menuButton},l.a.createElement(B.a,null)),l.a.createElement(F.a,{variant:"h6",color:"inherit",noWrap:!0},n))),l.a.createElement("nav",{className:t.drawer},l.a.createElement(N.a,{smUp:!0},l.a.createElement(T.a,{container:this.props.container,variant:"temporary",anchor:"rtl"===a.direction?"right":"left",open:r,onClose:this.handleDrawerToggle,classes:{paper:t.drawerPaper}},l.a.createElement(K,null))),l.a.createElement(N.a,{xsDown:!0},l.a.createElement(T.a,{classes:{paper:t.drawerPaper},variant:"permanent",open:!0},l.a.createElement(K,null)))))},t}(l.a.Component),X=Object(p.withStyles)(function(e){var t,a;return{appBar:{zIndex:e.zIndex.drawer+1},drawer:(t={},t[e.breakpoints.up("sm")]={width:240,flexShrink:0},t),drawerPaper:{width:240},menuButton:(a={marginRight:20},a[e.breakpoints.up("sm")]={display:"none"},a)}},{withTheme:!0})(V),Y=Object(p.withStyles)(function(e){return{footer:{flexShrink:0,backgroundColor:e.palette.background.paper,marginTop:8*e.spacing.unit,padding:6*e.spacing.unit+"px 0"}}},{withTheme:!0})(function(e){var t=e.classes;return l.a.createElement("footer",{className:t.footer},l.a.createElement(F.a,{variant:"h6",align:"center",gutterBottom:!0},"Footer"),l.a.createElement(F.a,{variant:"subtitle1",align:"center",color:"textSecondary",component:"p"},"Something here to give the footer a purpose!"))}),Z=Object(p.createMuiTheme)({palette:{primary:h.a}});t.a=Object(p.withStyles)(function(e){return{root:{display:"flex"},main:{flexGrow:1,display:"flex",flexDirection:"column",height:"100vh"},content:{flexGrow:1,padding:3*e.spacing.unit},toolbar:e.mixins.toolbar}},{withTheme:!0})(function(e){var t=e.children,a=e.classes;return l.a.createElement(m,{query:"3526667535",render:function(e){var n=e.site.siteMetadata.title;return l.a.createElement(p.MuiThemeProvider,{theme:Z},l.a.createElement(y,{title:n}),l.a.createElement(E.a,null),l.a.createElement("div",{className:a.root},l.a.createElement(X,{title:n}),l.a.createElement("main",{className:a.main},l.a.createElement("div",{className:a.toolbar}),l.a.createElement("div",{className:a.content},t),l.a.createElement(Y,null))))},data:n})})}}]);
//# sourceMappingURL=component---src-pages-index-js-7665b4062abc4dec98f1.js.map