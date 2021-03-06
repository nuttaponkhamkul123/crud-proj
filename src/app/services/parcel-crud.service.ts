import { Injectable } from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import { Observable, observable, throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Parcel } from '../models/parcel.model';


export class Measures { 
  _id !: String;
  measureName !: String;

}
@Injectable({
  providedIn: 'root'
})
export class ParcelCrudService {
  REST_API : String = 'http://localhost:8000/api';
  httpHeaders = new HttpHeaders().set('Content-Type' , 'application/json');
  

  constructor(private httpClient : HttpClient) { }
  //add Parcel 
  addParcel(obj : Parcel) : Observable<any> {
        console.log('adding Parcel : ' + obj)
        let API_URL = `${this.REST_API}/add-parcel`;
        return this.httpClient.post(API_URL,obj)
          .pipe(
            catchError(this.errorHandler)
          )
  }
  //add measure
  addMeasure(obj : Measures) : Observable<any> {
        console.log('adding Measure : ' + obj)
        let API_URL = `${this.REST_API}/measures/add-measure`;
        return this.httpClient.post(API_URL,obj)
          .pipe(
            catchError(this.errorHandler)
          )
  }
  //fetch all parcels
  fetchParcels() : Observable<Parcel[]>{
    
    return this.httpClient.get(`${this.REST_API}`) as Observable<Parcel[]>
  
  }
  fetchMeasures() : Observable<any>{
    
    return this.httpClient.get(`${this.REST_API}/measures/fetch-measures`)
  
  }

  //get book specifically 
  getParcels(id : any) : Observable<any> {
    return this.httpClient.get(`${this.REST_API}/fetch-parcel/${id}`,
    {
      headers : this.httpHeaders
      }).pipe(
       map((res : any) => {
          return res || []
        }),
        catchError(this.errorHandler)
      )
    }

  //get measure specifically 
  getMeasure(id : any) : Observable<any> {
    
    return this.httpClient.get(`${this.REST_API}/measures/fetch-measure/${id}`,
    {
      headers : this.httpHeaders
      }).pipe(
       map((res : any) => {
          return res || []
        }),
        catchError(this.errorHandler)
      )
    }

  //update Parcel
  updateParcel(id : any , newData : any) : Observable<any> {
    console.log(newData)
    return this.httpClient.put(`${this.REST_API}/update-parcel/${id}`,newData ,{
      headers : this.httpHeaders
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  //update Measure
  updateMeasure(id : any , newData : any) : Observable<any> {
    return this.httpClient.put(`${this.REST_API}/measures/update-measure/${id}`,newData ,{
      headers : this.httpHeaders
    }).pipe(
      catchError(this.errorHandler)
    )
  }

  //delete Parcel from id
  deleteParcel(id : any ) : Observable<any>{
    return this.httpClient.delete(`${this.REST_API}/delete-parcel/${id}` ,{
      headers : this.httpHeaders
    }).pipe(
      catchError(this.errorHandler)
    )
  }
  //delete Measure from id
  deleteMeasure(id : any ) : Observable<any>{
    return this.httpClient.delete(`${this.REST_API}/measures/delete-measure/${id}` ,{
      headers : this.httpHeaders
    }).pipe(
      catchError(this.errorHandler)
    )
  }

  
  errorHandler(err : HttpErrorResponse){
    let errMsg = '';
    if(err.error instanceof ErrorEvent){
      errMsg = err.error.message;
    }else{
      errMsg = `Error : ${err.status}\n : ${err.message}`;
    }
    console.log(errMsg);
    return throwError(errMsg);
  }
}
