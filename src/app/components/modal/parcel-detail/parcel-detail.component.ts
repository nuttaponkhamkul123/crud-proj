import { Component, OnInit,ViewChild } from '@angular/core';
import {NgbModal, NgbActiveModal,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormControl,Validators } from '@angular/forms';
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
  public mList :any = [];
  private currentParcelID! : string;
  public selected : any;
  
  constructor(private modalService : NgbModal,private transferData : PassingService,private fb : FormBuilder,private modalNg : NgbModal, private parcelCrud : ParcelCrudService) {
                this.clickEvent = this.transferData.getTriggerParcelModal().pipe(skip(1)).subscribe((val)=>{
                  //set value of inputs to parcel list using pipe and subscribe(skip 1 time to prevent modal trigger on start)
                  this.currentParcelID = val._id;
                  this.editParcelGroup.setValue({
                    parcelName : val.parcelName,
                    publicName : val.publicParcelName,
                    selMeasure : val.measureName
                  }) 
                  
                  
                  
                  
                  this.modalNg.open(this.modal);
                
                })

  }

   //create formbuilder group for gathering data from input
  editParcelGroup = this.fb.group({
    parcelName : ['test', Validators.required],
    publicName : ['test_public' , Validators.required],
    selMeasure : new FormControl('ไม่มีหน่วยวัด')
     })


  ngOnInit(): void {
    this.clickEvent = this.transferData.getRefreshMeasureList().subscribe((res)=>{
      this.listMeasures()
    })
    this.listMeasures()
  }
  listMeasures(){
    this.parcelCrud.fetchMeasures().subscribe((res)=>{
      this.mList = res
    })
  }
 
  saveParcel(){
  
    //create data to push into database
    let obj = {
      name : this.editParcelGroup.value.parcelName,
      publicName : this.editParcelGroup.value.publicName,
      measure : this.editParcelGroup.value.selMeasure
    }
    
    //send object into database
    this.parcelCrud.updateParcel(this.currentParcelID,obj).subscribe((res)=>{});

    //send refresh request to service and make parcel list refreshed
    this.transferData.refreshModal();
  }

}
