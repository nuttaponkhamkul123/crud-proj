import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassingService {
  private data = new BehaviorSubject('');
  dataMsg = this.data.asObservable();
  triggerModal(val:any){
    this.data.next(val);
    
  }
  getTriggerModal() : Observable<any>{
    console.log("a")
    return this.data.asObservable();
  }
  
  
  
}
