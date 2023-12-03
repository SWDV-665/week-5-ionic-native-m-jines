import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, catchError} from "rxjs/operators";
import {Subject} from "rxjs";
import { throwError } from 'rxjs';

export interface GroceryItem {
  _id: string;
  name: string;
  quantity:number;
} 

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  
  items: any =[];

  dataChanged$:Observable<boolean>;

  private dataChangeSubject: Subject <boolean>;

  baseURL = "http://localhost:8080";
  constructor(public http: HttpClient) {
    console.log("Hello GroceriesServiceService");
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
   }

   getItems(): Observable<GroceryItem[]> {
    return this.http.get<GroceryItem[]>(this.baseURL + '/api/groceries').pipe(
      catchError(this.handleError)
    );
  }  

private extractData(res: Response){
  let body=res;
  return body || {};
}

private handleError(error: Response | any) {
  let errMsg: string;
  if (error instanceof Response) {
    const err = error || '';
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return throwError(errMsg);
}

removeItem(id: any){
    console.log("#### Remove ITem -id = ", id)
    this.http.delete(this.baseURL + '/api/groceries/'+ id).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    })

  }

addItem(item:any){
  this.http.post(this.baseURL + '/api/groceries', item).subscribe(res => {
    this.items=res;
    this.dataChangeSubject.next(true);
  });
}

editItem(item: any, index:any){
  console.log("Editing item = ", item);
  this.http.put(this.baseURL + "/api/groceries/" +item._id, item).subscribe(res=> {
    this.items = res;
    this.dataChangeSubject.next(true);
  });
  }

}