import { Component, OnInit,NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ParcelCrudService } from '../../services/parcel-crud.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';
import { PassingService } from 'src/app/services/passing.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { Parcel } from 'src/app/models/parcel.model';

@Component({
  selector: 'app-add-parcel',
  templateUrl: './add-parcel.component.html',
  styleUrls: ['./add-parcel.component.css']
})
export class AddParcelComponent implements OnInit {
  
  public mList : any = [];
  private refrestList! : Subscription;
  constructor(private parcelCrudService : ParcelCrudService,
    private formBuilder : FormBuilder,private router : Router,private passingService : PassingService,private alertService : AlertServiceService) { 
    
  }
  //all the field is required 
    addParcelForm = this.formBuilder.group({
      parcelName : ['',Validators.required],
      publicParcelName : ['',Validators.required],
      parcel_number : ['' , Validators.required],
      quantity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      selMeasure : ['No Measure' , Validators.required]
    })
  
  ngOnInit(): void {
    
    //receive measure dropdown update
    this.refrestList = this.passingService.getRefreshMeasureList().subscribe(()=>{
        this.updateList()
    })

    //update measure dropdown list
    this.updateList()
  }
  updateList(){
    this.parcelCrudService.fetchMeasures().subscribe((res)=>{
      this.mList = res
    })
  }
  onSubmit(){

    //create object to send to backend
    const obj : Parcel = {
      _id :uuidv4(),
      parcel_number : this.addParcelForm.get("parcel_number")?.value,
      name : this.addParcelForm.get("parcelName")!.value,
      publicName : this.addParcelForm.get("publicParcelName")!.value,
      quantity : this.addParcelForm.get("quantity")!.value,
      measure : this.addParcelForm.get("selMeasure")!.value,
    };
    
    this.parcelCrudService.addParcel(obj).subscribe(() => {
      this.alertService.toggleAlert();
      this.router.navigateByUrl('/');
      
    });
  }
  

}
