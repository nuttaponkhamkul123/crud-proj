import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassingService {
  private data = new BehaviorSubject('');
  private dataParcel = new BehaviorSubject('');
  dataMsg = this.data.asObservable();
  triggerModal(val:any){
    this.data.next(val);
    
  }
  triggerModalParcel(val : any){
    console.log("pval : "  + JSON.stringify(val))
    this.dataParcel.next(val);
  }
  getTriggerModal() : Observable<any>{
    return this.data.asObservable();
  }

  getTriggerParcelModal() : Observable<any>{
    console.log("pmodal trigged")
    return this.dataParcel.asObservable();
  }
  
  unsub(){
    this.data.unsubscribe();
    this.dataParcel.unsubscribe();
  }
  
  
}
