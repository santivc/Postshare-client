import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';


const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [UsuarioGuard]
  },
  {
    path: 'auth',
    children: [
      { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule), },
      { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule) },
      { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
    ]
  },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main/tabs/tab1'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
