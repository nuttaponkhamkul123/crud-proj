import { Component, OnInit,NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Parcel, ParcelCrudService } from '../../services/parcel-crud.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-add-parcel',
  templateUrl: './add-parcel.component.html',
  styleUrls: ['./add-parcel.component.css']
})
export class AddParcelComponent implements OnInit {
  
  public isList : boolean = false;
  public mList : any = [];
  constructor(private parcelCrudService : ParcelCrudService,
    private formBuilder : FormBuilder,private router : Router) { 
    
  }
  //all the field is required 
    addParcelForm = this.formBuilder.group({
      parcelName : ['',Validators.required],
      publicParcelName : ['',Validators.required],
      measureName : ['',Validators.required],
      quantity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      isMList : [false],
      selMeasure : this.mList
    })
  
  ngOnInit(): void {
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
    if(this.isList == true){
      obj.measure = this.addParcelForm.get("selMeasure")!.value;
    }else{
      obj.measure = this.addParcelForm.get("measureName")!.value;
    }
    
    
    this.parcelCrudService.addParcel(obj).subscribe(() => {
      console.log("added parcel")
      this.router.navigateByUrl('/');
    });
  }
  changeMode(){
    this.isList = !this.isList
    console.log(this.addParcelForm.get("selMeasure")!.value)
    if(this.isList === true){
      this.addParcelForm.get('measureName')?.disable();
      this.addParcelForm.controls['measureName'].setValue("");
    }else{
      this.addParcelForm.get('measureName')?.enable();
      
    }
  }

}
