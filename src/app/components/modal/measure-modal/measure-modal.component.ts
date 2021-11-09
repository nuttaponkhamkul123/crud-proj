import { Component,Input, OnInit, ViewChild } from '@angular/core';
import {NgbModal, NgbActiveModal,NgbModalRef, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators } from '@angular/forms';
import {  ParcelCrudService } from '../../../services/parcel-crud.service';
import { v4 as uuidv4 } from 'uuid';
import { PassingService } from 'src/app/services/passing.service';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-measure-modal',
  templateUrl: './measure-modal.component.html',
  styleUrls: ['./measure-modal.component.css']
})
export class MeasureModalComponent implements OnInit {
  @ViewChild('emModal') editModal : any;
  @ViewChild('measModal') addModal : any;

  private currentEditMeasure :any ;
  private clickEvent! : Subscription;
  private currentMid! : string;
  private modalOption : NgbModalOptions;
  constructor(private fb : FormBuilder
    ,private modalService : NgbModal
    ,private parcelCrudService : ParcelCrudService
    ,private transferData : PassingService
    ) {
    //skip is use to prevent modal trigger on start
      this.clickEvent = this.transferData.dataMsg.pipe(skip(1)).subscribe((res)=>{
        this.modalOpen(res)
      })
      this.modalOption = {
        backdrop : 'static',
        keyboard : false
      }
    }

  //create formGroup for formbuilder
  addMeasureGroup = this.fb.group ({
    measureName : ['',Validators.required]
  })
  ngOnInit(): void {}
  
  modalOpen(id? : any){
    if(id.id === undefined){
      //Open modal without ID(For add measure)
      this.modalService.open(this.addModal,this.modalOption)
    }else{
      //Open modal with id(For edit measure)
      this.parcelCrudService.getMeasure(id.id).subscribe((res) =>{
          //set value to response data from backend
          this.addMeasureGroup.setValue({
          measureName : res['measureName']
          
        })
        this.currentMid = res['_id'];
      })
      
      //console.log(this.addMeasureGroup.value.measureName)
      this.modalService.open(this.editModal,this.modalOption);
    }
  }
  closeModal(){
    this.currentMid != undefined
    this.addMeasureGroup.setValue({
      measureName : ''
    })
  }
  saveMeasure(mode? : any){
    
    if(mode){
      ///////edit current measure
      let mName = this.addMeasureGroup.value.measureName
      //set current id as object
      this.currentEditMeasure = {
        _id : this.currentMid,
        measureName : mName
      }
      //send request to backend and update measure value by id and measure name
      this.parcelCrudService.updateMeasure(this.currentEditMeasure._id, {'measureName' : this.currentEditMeasure.measureName}).subscribe((res) => {});
      this.currentMid != undefined;
      this.currentEditMeasure = [];
      this.addMeasureGroup.setValue({
        measureName : ''
      })
      this.transferData.refreshModal();
      this.transferData.refreshMeasureList()
    }else{

     ///// add measure section
      console.log("add value")
      this.currentEditMeasure = {
        _id : uuidv4(),
        measureName : this.addMeasureGroup.value.measureName
      }
      
      ///add measure and refresh list
      this.parcelCrudService.addMeasure(this.currentEditMeasure).subscribe((res) => {});
      this.transferData.refreshModal();
      this.transferData.refreshMeasureList()
    }
    
    
  }

 

}
