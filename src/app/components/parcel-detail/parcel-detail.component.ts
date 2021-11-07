import { Component, OnInit,ViewChild } from '@angular/core';
import {NgbModal, NgbActiveModal,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators } from '@angular/forms';
import {  ParcelCrudService } from '../../services/parcel-crud.service';
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
  constructor(private modalService : NgbModal,
              private transferData : PassingService,
              private fb : FormBuilder,
              private modalNg : NgbModal) {
                this.clickEvent = this.transferData.getTriggerParcelModal().pipe(skip(1)).subscribe((val)=>{
                  //{_id: 'f6144134-0162-4414-8766-06027bebd839', parcelName: 'ทดสอบ', publicParcelName: 'การทดสอบ', measureName: 'centimeter'}
                  this.editParcelGroup.setValue({
                    parcelName : [val.parcelName],
                    publicName : [val.publicParcelName],
                    measureName : [val.measureName]
                  })  
                  this.modalNg.open(this.modal);
                })

               }

  editParcelGroup = this.fb.group({
           parcelName : ['test', Validators.required],
           publicName : ['test_public' , Validators.required],
           measureName : ['test_measure' , Validators.required]
            })
  ngOnInit(): void {
    
    
  }

}
