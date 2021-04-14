import { ArchivComponent } from './archiv/archiv.component';
import { PageListComponent } from './page-list/page-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'todo', component: PageListComponent},
  {path:'archiv', component: ArchivComponent},
  {path:'', redirectTo:'/todo', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
