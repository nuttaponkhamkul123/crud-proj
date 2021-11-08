import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddParcelComponent } from './components/add-parcel/add-parcel.component';
import { ParcelDetailComponent } from './components/modal/parcel-detail/parcel-detail.component';
import { ParcelListComponent } from './components/parcel-list/parcel-list.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MeasureComponent } from './components/measure/measure.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MeasureModalComponent } from './components/modal/measure-modal/measure-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AddParcelComponent,
    ParcelDetailComponent,
    ParcelListComponent,
    SidebarComponent,
    MeasureComponent,
    MeasureModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule  {

    

 }
