import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from "./data-access/rest/guard";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

/**
 *  @author Gustavo de Oliveira Fernandes/gusta-of
 *
 *  PreloadAllModules: Uma estratégia para o pré-carregamento de todos os módulos o mais rápido possível,
 *  ajuda na otimização do carregamento das telas e componentes
 **/
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  providers: [
    AuthGuard,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
