import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ParcelCrudService } from '../../services/parcel-crud.service';
import { PassingService } from 'src/app/services/passing.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.css']
})


export class MeasureComponent implements OnInit {
  public measures! : any;
  public index! : number;
  private refreshList! : Subscription;

  constructor(private modalService : NgbModal
             ,private fb : FormBuilder
             ,private parcelCrudService : ParcelCrudService
             ,private transferData : PassingService) { 

              //to update data from modal component
              this.refreshList! = this.transferData.getrefreshModal().subscribe(()=>{
                this.refresh();
              })
    
  }
  
  ngOnInit(): void {
    this.parcelCrudService.fetchMeasures().subscribe((res) => {
      this.measures! = res;
    })
    this.transferData.getrefreshModal().subscribe((res)=>{
      console.log(res)
    });
    
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
  delete(id : any){
    this.parcelCrudService.deleteMeasure(id).subscribe(() => {
      this.refresh();
    });
  }
  unsub(){
    this.transferData.unsub();
  }
  
  
}
