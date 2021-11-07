import { Component, OnInit, Output } from '@angular/core';
import { ParcelCrudService, ParcelCrudService as pcs } from 'src/app/services/parcel-crud.service';
import { PassingService } from 'src/app/services/passing.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-parcel-list',
  templateUrl: './parcel-list.component.html',
  styleUrls: ['./parcel-list.component.css']
})
export class ParcelListComponent implements OnInit {
  allItems : any = []
  
  constructor(private pcs : ParcelCrudService,
              private transferData : PassingService,
              private modal : NgbModal) { }

  ngOnInit(): void {
    //get all item from db
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
    //{_id: 'f6144134-0162-4414-8766-06027bebd839', parcelName: 'ทดสอบ', publicParcelName: 'การทดสอบ', measureName: 'centimeter'}
    
    this.transferData.triggerModalParcel(obj)
  }
  

}
