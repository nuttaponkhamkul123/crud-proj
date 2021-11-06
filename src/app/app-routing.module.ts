import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddParcelComponent } from './components/add-parcel/add-parcel.component';
import { ParcelDetailComponent } from './components/parcel-detail/parcel-detail.component';
import { ParcelListComponent } from './components/parcel-list/parcel-list.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
