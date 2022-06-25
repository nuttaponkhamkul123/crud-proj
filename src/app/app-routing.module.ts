import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddParcelComponent } from './components/add-parcel/add-parcel.component';
import { ParcelDetailComponent } from './components/modal/parcel-detail/parcel-detail.component';
import { ParcelListComponent } from './components/parcel-list/parcel-list.component';
import { MeasureComponent } from  './components/measure/measure.component';
import { ParcelHistoryComponent } from './components/parcel-history/parcel-history.component';


const routes: Routes = [
  {
    path : 'parcel/:id',
    pathMatch : 'full',
    component : ParcelHistoryComponent,
    data : {
      title : "พัสดุ"
    }
  },
  {
    path : '',
    pathMatch : 'full',
    redirectTo : 'parcel-list'
  },
  {
    path : 'parcel-list',
    component : ParcelListComponent,
    data :{
      title : "รายชื่อพัสดุ"
    }

  },
  {
    path : 'add-parcel',
    component : AddParcelComponent,
    data :{
      title : "เพิ่มพัสดุ"
    }
  },
  {
    path : 'edit-parcel/:id',
    component : ParcelDetailComponent,
    data :{
      title : "แก้ไขพัสดุ"
    }
  },
  {
    path : 'measure',
    pathMatch : 'full',
    component : MeasureComponent,
    data :{
      title : "รายชื่อหน่วยวัด"
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
