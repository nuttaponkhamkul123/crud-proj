import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddParcelComponent } from './components/add-parcel/add-parcel.component';
import { ParcelDetailComponent } from './components/modal/parcel-detail/parcel-detail.component';
import { ParcelListComponent } from './components/parcel-list/parcel-list.component';
import { MeasureComponent } from  './components/measure/measure.component';


const routes: Routes = [
  {
    path : '',
    pathMatch : 'full',
    redirectTo : 'parcel-list'
  },
  {
    path : 'parcel-list',
    component : ParcelListComponent,

  },
  {
    path : 'add-parcel',
    component : AddParcelComponent
  },
  {
    path : 'edit-parcel/:id',
    component : ParcelDetailComponent
  },
  {
    path : 'measure',
    pathMatch : 'full',
    component : MeasureComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
