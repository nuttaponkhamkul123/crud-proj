import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassingService {
  private data = new BehaviorSubject('');
  private dataParcel = new BehaviorSubject('');
  private dataModal = new BehaviorSubject(false);
  private dataMList = new BehaviorSubject('')
  dataMsg = this.data.asObservable();
  triggerModal(val:any){
    this.data.next(val);
    
  }
  triggerModalParcel(val : any){
    //console.log("pval : "  + JSON.stringify(val))
    this.dataParcel.next(val);
  }
  getTriggerModal() : Observable<any>{
    return this.data.asObservable();
  }

  getTriggerParcelModal() : Observable<any>{
    return this.dataParcel.asObservable();
  }
  getrefreshModal() : Observable<any> {
    return this.dataModal.asObservable();
  }
  refreshModal(){
    this.dataModal.next(true);
  }
  refreshMeasureList(){
      this.dataMList.next('test');
  }
  getRefreshMeasureList(){
    return this.dataMList.asObservable();
  }
  
  
  
}
