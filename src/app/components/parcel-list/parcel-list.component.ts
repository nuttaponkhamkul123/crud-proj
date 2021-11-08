import { Component, OnInit, Output } from '@angular/core';
import { ParcelCrudService, ParcelCrudService as pcs } from 'src/app/services/parcel-crud.service';
import { PassingService } from 'src/app/services/passing.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-parcel-list',
  templateUrl: './parcel-list.component.html',
  styleUrls: ['./parcel-list.component.css']
})
export class ParcelListComponent implements OnInit {
  allItems : any = []
  modalEvent! : Subscription
  constructor(private pcs : ParcelCrudService,
              private transferData : PassingService,
              private modal : NgbModal) { }

  ngOnInit(): void {
    this.modalEvent = this.transferData.getrefreshModal().subscribe(()=>{
      this.refresh()
    });
    //get all item from db
    this.pcs.fetchParcels().subscribe((res) => 
    this.allItems = res)
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
