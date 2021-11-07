import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Measures, ParcelCrudService } from '../../services/parcel-crud.service';
import { v4 as uuidv4 } from 'uuid';
import { PassingService } from 'src/app/services/passing.service';


@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.css']
})


export class MeasureComponent implements OnInit {
  public measures! : any[];
  public index! : number;
  
  constructor(private modalService : NgbModal
             ,private fb : FormBuilder
             ,private parcelCrudService : ParcelCrudService
             ,private transferData : PassingService) { 
    
  }
  
  ngOnInit(): void {
    this.parcelCrudService.fetchMeasures().subscribe((res) => {
      this.measures! = res;
    })
    
  }
  refresh(){
    this.parcelCrudService.fetchMeasures().subscribe((res) => {
      this.measures! = res;
    })
  }
  
  open(id? : any){
    if(id === undefined){
      this.transferData.triggerModal({id : undefined});
    }else{
      this.transferData.triggerModal({id : id});
    }
  }

  unsub(){
    this.transferData.unsub();
  }
  
  
}
