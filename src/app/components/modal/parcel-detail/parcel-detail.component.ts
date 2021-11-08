import { Component, OnInit,ViewChild } from '@angular/core';
import {NgbModal, NgbActiveModal,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators } from '@angular/forms';
import {  ParcelCrudService } from '../../../services/parcel-crud.service';
import { v4 as uuidv4 } from 'uuid';
import { PassingService } from 'src/app/services/passing.service';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';



@Component({
  selector: 'app-parcel-detail',
  templateUrl: './parcel-detail.component.html',
  styleUrls: ['./parcel-detail.component.css']
})
export class ParcelDetailComponent implements OnInit {
  @ViewChild('apModal') modal : any;
  private clickEvent! : Subscription;
  private currentParcelID! : string;
  constructor(private modalService : NgbModal,private transferData : PassingService,private fb : FormBuilder,private modalNg : NgbModal, private parcelCrud : ParcelCrudService) {
                this.clickEvent = this.transferData.getTriggerParcelModal().pipe(skip(1)).subscribe((val)=>{
                  //set value of inputs to parcel list using pipe and subscribe
                  this.currentParcelID = val._id;
                  this.editParcelGroup.setValue({
                    parcelName : val.parcelName,
                    publicName : val.publicParcelName,
                    measureName : val.measureName
                  })  
                  this.modalNg.open(this.modal);
                })

  }


  //create formbuilder group for gathering data from input
  editParcelGroup = this.fb.group({
           parcelName : ['test', Validators.required],
           publicName : ['test_public' , Validators.required],
           measureName : ['test_measure' , Validators.required]
            })
  ngOnInit(): void {}
  saveParcel(){
  

    
    let obj = {
      name : this.editParcelGroup.value.parcelName,
      publicName : this.editParcelGroup.value.publicName,
      measure : this.editParcelGroup.value.measureName
    }
    
    this.parcelCrud.updateParcel(this.currentParcelID,obj).subscribe((res)=>{});
    this.transferData.refreshModal();
  }

}
