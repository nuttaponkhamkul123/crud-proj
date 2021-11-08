import { Component,Input, OnInit, ViewChild } from '@angular/core';
import {NgbModal, NgbActiveModal,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators } from '@angular/forms';
import {  ParcelCrudService } from '../../services/parcel-crud.service';
import { v4 as uuidv4 } from 'uuid';
import { PassingService } from 'src/app/services/passing.service';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @ViewChild('emModal') editModal : any;
  @ViewChild('measModal') addModal : any;

  private currentEditMeasure :any ;
  private clickEvent! : Subscription;
  private currentMid! : string;
  constructor(private fb : FormBuilder
    ,private modalService : NgbModal
    ,private parcelCrudService : ParcelCrudService
    ,private transferData : PassingService) {
    //skip is use to prevent modal trigger on start
      this.clickEvent = this.transferData.dataMsg.pipe(skip(1)).subscribe((res)=>{
        this.modalOpen(res)
      })
    }


  addMeasureGroup = this.fb.group ({
    measureName : ['',Validators.required]
  })
  ngOnInit(): void {
    
    
  }
  
  modalOpen(id? : any){
    
    if(id.id === undefined){
      //Open modal without ID(For add measure)
      
      this.modalService.open(this.addModal)
    }else{
      //Open modal with id(For edit measure)
      console.log(id.id)
      this.parcelCrudService.getMeasure(id.id).subscribe((res) =>{
          this.addMeasureGroup.setValue({
          measureName : res['measureName']
          
        })
        this.currentMid = res['_id'];
      })
      
      //console.log(this.addMeasureGroup.value.measureName)
      this.modalService.open(this.editModal);
      
      
    }
      
  }
  saveMeasure(){
    if(this.currentMid !== undefined){
      let mName = this.addMeasureGroup.value.measureName
      this.currentEditMeasure = {
        _id : this.currentMid,
        measureName : mName
      }
      console.log(this.currentEditMeasure)
      this.parcelCrudService.updateMeasure(this.currentEditMeasure._id, {'measureName' : this.currentEditMeasure.measureName}).subscribe((res) => {});
      
    }else{
      console.log("ud val")
      this.currentEditMeasure = {
        _id : uuidv4(),
        measureName : this.addMeasureGroup.value.measureName
      }
      
      this.parcelCrudService.addMeasure(this.currentEditMeasure).subscribe((res) => {
        
      });
    }
    
    
  }

  unsub(){
    this.transferData.unsub();
  }

}
