import { Component, OnInit, Output } from '@angular/core';
import { ParcelCrudService, ParcelCrudService as pcs } from 'src/app/services/parcel-crud.service';
import { PassingService } from 'src/app/services/passing.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, takeUntil } from 'rxjs';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { Parcel } from 'src/app/models/parcel.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-parcel-list',
  templateUrl: './parcel-list.component.html',
  styleUrls: ['./parcel-list.component.css']
})
export class ParcelListComponent implements OnInit {
  allItems : Parcel[] ;
  modalEvent! : Subscription
  isAdded :Boolean = false;
  constructor(private pcs : ParcelCrudService,
              private transferData : PassingService,
              private modal : NgbModal,
              private alertService : AlertServiceService,
              private router : Router) { }

  ngOnInit(): void {
    this.modalEvent = this.transferData.getrefreshModal().subscribe(()=>{
      this.refresh()
      
    });
    this.watchModalUpdate();
    //get all item from db
    this.pcs.fetchParcels().subscribe((res) => {
      this.allItems = res
      this.isAdded = !this.isAdded
    }
    )
  }

  watchModalUpdate() : void {
    this.transferData.parcelList$.subscribe(() => {
      this.refresh();
    })
  }
  isAlertToggle() : Boolean{
    return this.alertService.getAddParcelAlert()
  }
  refresh(){
    this.pcs.fetchParcels().subscribe((res) => 
    this.allItems = res)
   

  }
  showDetail(parcel : Parcel) : void {
    this.router.navigate([`/parcel/${parcel._id}`])
  }
  deleteParcel(id : String){
    this.pcs.deleteParcel(id).subscribe((res) => res)
    //delete parcel and refetch data
    this.pcs.fetchParcels().subscribe((res) => 
        this.allItems = res)
  }
  editParcel(obj : any) {
    this.transferData.triggerModalParcel(obj)
  }
  

}
