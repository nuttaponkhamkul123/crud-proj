import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddParcelComponent } from './components/add-parcel/add-parcel.component';
import { ParcelDetailComponent } from './components/parcel-detail/parcel-detail.component';
import { ParcelListComponent } from './components/parcel-list/parcel-list.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MeasureComponent } from './components/measure/measure.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AddParcelComponent,
    ParcelDetailComponent,
    ParcelListComponent,
    SidebarComponent,
    MeasureComponent,
    ModalComponent
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
