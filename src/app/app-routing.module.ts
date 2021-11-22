import { HomeComponent } from './home/home.component';
import { ChartComponent } from './chart/chart.component';
import { MyTableComponent } from './my-table/my-table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home', component:HomeComponent},
  {path:'table', component:MyTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
