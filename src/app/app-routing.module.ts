import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './components/view/view.component';
import { AddComponent } from './components/add/add.component';
import { ViewByIdComponent } from './components/view-by-id/view-by-id.component';

const routes: Routes = [
  {path:'',redirectTo:'view',pathMatch:'full'},
  {path:'view',component:ViewComponent},
  {path:'add',component:AddComponent},
  {path:'viewById/:id',component:ViewByIdComponent},
  {path:'updateStudent/:id',component:AddComponent},
  {path:'deleteStudent/:id',component:ViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
