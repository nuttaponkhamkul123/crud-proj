import { Component, OnInit, Output } from '@angular/core';
import { ParcelCrudService, ParcelCrudService as pcs } from 'src/app/services/parcel-crud.service';

@Component({
  selector: 'app-parcel-list',
  templateUrl: './parcel-list.component.html',
  styleUrls: ['./parcel-list.component.css']
})
export class ParcelListComponent implements OnInit {
  allItems : any = []
  constructor(private pcs : ParcelCrudService) { }

  ngOnInit(): void {
    this.pcs.fetchParcels().subscribe((res) => 
    this.allItems = res)
  }
  
  deleteParcel(id : string){
    this.pcs.deleteParcel(id).subscribe((res) => res)
    this.pcs.fetchParcels().subscribe((res) => 
        this.allItems = res)
  }
  

}
