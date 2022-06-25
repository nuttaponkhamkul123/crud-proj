import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassingService {
  private data = new BehaviorSubject('');
  private dataParcel = new BehaviorSubject('');
  private dataModal = new BehaviorSubject(false);
  private dataMList = new BehaviorSubject('')
  dataMsg = this.data.asObservable();
  parcelList$ = new Subject<void>();
  triggerModal(val:any){
    this.data.next(val);
    
  }
  //open parcel modal
  triggerModalParcel(val : any){
    this.dataParcel.next(val);
  }
  //get measure modal to component which it subscribed to
  getTriggerModal() : Observable<any>{
    return this.data.asObservable();
  }
  
  //get parcel modal to component which it subscribed to
  getTriggerParcelModal() : Observable<any>{
    return this.dataParcel.asObservable();
  }
  //refresh modal data
  getrefreshModal() : Observable<any> {
    return this.dataModal.asObservable();
  }
  //refresh modal data
  refreshModal(){
    this.dataModal.next(true);
  }
  //refresh measure list
  refreshMeasureList(){
      this.dataMList.next('test');
  }
  //refresh measure list
  getRefreshMeasureList(){
    return this.dataMList.asObservable();
  }
  
  
  
}
