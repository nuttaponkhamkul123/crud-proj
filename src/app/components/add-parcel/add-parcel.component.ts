import { Component, OnInit,NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Parcel, ParcelCrudService } from '../../services/parcel-crud.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';
import { PassingService } from 'src/app/services/passing.service';
@Component({
  selector: 'app-add-parcel',
  templateUrl: './add-parcel.component.html',
  styleUrls: ['./add-parcel.component.css']
})
export class AddParcelComponent implements OnInit {
  
  public mList : any = [];
  private refrestList! : Subscription;
  constructor(private parcelCrudService : ParcelCrudService,
    private formBuilder : FormBuilder,private router : Router,private passingService : PassingService) { 
    
  }
  //all the field is required 
    addParcelForm = this.formBuilder.group({
      parcelName : ['',Validators.required],
      publicParcelName : ['',Validators.required],
      quantity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      selMeasure : ['No Measure' , Validators.required]
    })
  
  ngOnInit(): void {
    this.refrestList = this.passingService.getRefreshMeasureList().subscribe(()=>{
        this.updateList()
    })
    this.updateList()
  }
  updateList(){
    this.parcelCrudService.fetchMeasures().subscribe((res)=>{
      this.mList = res
    })
  }
  onSubmit(){
    let obj = new Parcel();
    obj._id = uuidv4();
    obj.name = this.addParcelForm.get("parcelName")!.value;
    obj.publicName = this.addParcelForm.get("publicParcelName")!.value;
    obj.quantity = this.addParcelForm.get("quantity")!.value;
    obj.measure = this.addParcelForm.get("selMeasure")!.value;
    
    
    
    this.parcelCrudService.addParcel(obj).subscribe(() => {
      console.log("added parcel")
      this.router.navigateByUrl('/');
    });
  }
  

}
