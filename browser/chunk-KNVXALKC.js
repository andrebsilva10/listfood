import{Ea as v,K as a,L as m,Oa as g,Qa as h,Sa as x,Ta as S,U as c,Y as n,Z as r,_ as u,ia as o,ka as d,pa as p,qa as f,t as l}from"./chunk-36ASHJIO.js";var C=()=>["/listas"],F=(()=>{let t=class t{constructor(e,i){this.userService=e,this.authService=i,this.nome=null}ngOnInit(){this.authService.isLoggedIn()?this.userService.getCurrentUser().subscribe(e=>{this.nome=e?e.nome:null},e=>{console.error("Erro ao obter usu\xE1rio:",e),this.nome=null}):this.nome=null}};t.\u0275fac=function(i){return new(i||t)(m(S),m(x))},t.\u0275cmp=l({type:t,selectors:[["app-inicio"]],standalone:!0,features:[p],decls:11,vars:3,consts:[[1,"text-start","mb-10"],[1,"sm:flex","gap-32","items-center"],[1,"mb-10"],["src","../../assets/img/img_inicio.svg","alt","Cesta de mercado"],[1,"flex","flex-col","gap-10","sm:gap-28"],[1,"font-bold","text-3xl"],[1,"btn","btn-primary","text-base-100","font-bold","text-lg","w-full",3,"routerLink"]],template:function(i,b){i&1&&(n(0,"div",0)(1,"p"),o(2),r()(),n(3,"div",1)(4,"div",2),u(5,"img",3),r(),n(6,"div",4)(7,"h1",5),o(8,"Compras inteligentes, sem extrapolar!"),r(),n(9,"a",6),o(10,"Iniciar Compra"),r()()()),i&2&&(a(2),d("Ol\xE1, ",b.nome||"Estranho","!"),a(7),c("routerLink",f(2,C)))},dependencies:[v,h,g]});let s=t;return s})();export{F as InicioComponent};
