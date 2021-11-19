import { Component, OnInit, Output } from '@angular/core';
import { ParcelCrudService, ParcelCrudService as pcs } from 'src/app/services/parcel-crud.service';
import { PassingService } from 'src/app/services/passing.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AlertServiceService } from 'src/app/services/alert-service.service';
@Component({
  selector: 'app-parcel-list',
  templateUrl: './parcel-list.component.html',
  styleUrls: ['./parcel-list.component.css']
})
export class ParcelListComponent implements OnInit {
  allItems : any = []
  modalEvent! : Subscription
  isAdded :Boolean = false;
  constructor(private pcs : ParcelCrudService,
              private transferData : PassingService,
              private modal : NgbModal,
              private alertService : AlertServiceService) { }

  ngOnInit(): void {
    this.modalEvent = this.transferData.getrefreshModal().subscribe(()=>{
      this.refresh()
      
    });
    
    //get all item from db
    this.pcs.fetchParcels().subscribe((res) => {
      this.allItems = res
      this.isAdded = !this.isAdded
    }
    )
  }
  isAlertToggle() : Boolean{
    return this.alertService.getAddParcelAlert()
  }
  refresh(){
    this.pcs.fetchParcels().subscribe((res) => 
    this.allItems = res)
   

  }
  deleteParcel(id : string){
    this.pcs.deleteParcel(id).subscribe((res) => res)
    //delete parcel and refetch data
    this.pcs.fetchParcels().subscribe((res) => 
        this.allItems = res)
  }
  editParcel(obj : any) {
    this.transferData.triggerModalParcel(obj)
  }
  

}
