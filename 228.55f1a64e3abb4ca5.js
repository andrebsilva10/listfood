"use strict";(self.webpackChunklistfood=self.webpackChunklistfood||[]).push([[228],{6228:(_,o,s)=>{s.r(o),s.d(o,{InicioComponent:()=>m});var a=s(177),r=s(3326),t=s(3953),l=s(9885),c=s(4796);const u=()=>["/listas"];let m=(()=>{class i{constructor(e,n){this.userService=e,this.authService=n,this.nome=null}ngOnInit(){this.authService.isLoggedIn()?this.userService.getCurrentUser().subscribe(e=>{this.nome=e?e.nome:null},e=>{console.error("Erro ao obter usu\xe1rio:",e),this.nome=null}):this.nome=null}static#t=this.\u0275fac=function(n){return new(n||i)(t.rXU(l.D),t.rXU(c.u))};static#e=this.\u0275cmp=t.VBU({type:i,selectors:[["app-inicio"]],standalone:!0,features:[t.aNF],decls:11,vars:3,consts:[[1,"text-start","mb-10"],[1,"sm:flex","gap-32","items-center"],[1,"mb-10"],["src","assets/img/img_inicio.svg","alt","Cesta de mercado"],[1,"flex","flex-col","gap-10","sm:gap-28"],[1,"font-bold","text-3xl"],[1,"btn","btn-primary","text-base-100","font-bold","text-lg","w-full",3,"routerLink"]],template:function(n,E){1&n&&(t.j41(0,"div",0)(1,"p"),t.EFF(2),t.k0s()(),t.j41(3,"div",1)(4,"div",2),t.nrm(5,"img",3),t.k0s(),t.j41(6,"div",4)(7,"h1",5),t.EFF(8,"Compras inteligentes, sem extrapolar!"),t.k0s(),t.j41(9,"a",6),t.EFF(10,"Iniciar Compra"),t.k0s()()()),2&n&&(t.R7$(2),t.SpI("Ol\xe1, ",E.nome||"Estranho","!"),t.R7$(7),t.Y8G("routerLink",t.lJ4(2,u)))},dependencies:[a.MD,r.iI,r.Wk]})}return i})()}}]);