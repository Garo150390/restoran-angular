import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';

import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent
  }
];

@NgModule({
  imports: [
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule, LocalizeRouterModule]
})
export class BlogsRoutingModule { }
