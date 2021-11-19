import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {
  private isAddParcel : Boolean = false;
  constructor() { }

  toggleAlert(){
    setTimeout(()=>{
      this.isAddParcel = !this.isAddParcel;
    },3000)
    this.isAddParcel = !this.isAddParcel;
  }
  getAddParcelAlert(){
    return this.isAddParcel;
  }
}
