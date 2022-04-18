import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { LoginComponent } from './auth/login/login.component';
import { CategorysComponent } from './categorys/categorys.component';
import { DeashbardComponent } from './deashbard/deashbard.component';
import { NewPostComponent } from './new-post/new-post.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'',component:DeashbardComponent, canActivate: [AuthGuard]},
  {path: 'login',component:LoginComponent},
  {path:'categorys',component:CategorysComponent, canActivate: [AuthGuard]},
  {path: 'posts', component: AllPostsComponent, canActivate: [AuthGuard]},
  {path : 'posts/new', component : NewPostComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
