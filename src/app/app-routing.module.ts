import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloatingIslandComponent } from './components/floating-island/floating-island.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'floating-island',
  },
  {
    path: 'floating-island',
    component: FloatingIslandComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
