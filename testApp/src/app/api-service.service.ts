import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import  {map, catchError} from 'rxjs/operators';
import { throwError, Observable, pipe} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJBc2hvayIsImVtYWlsIjoiYXNob2tAc3Blcmljb3JuLmNvbSIsInJvbGUiOjQsImlhdCI6MTU5MTYwMDkxNywiZXhwIjoxNTkzMjc4OTE4NjA5fQ.O38c12nGe9MHTR6i9KPy8SzQYBbrJ10FxEwTcO25JQ0'
 };
  constructor(private http: HttpClient,) { }

  login(link, data) {
    return this.http.post(link, data)
    .pipe((
      map(this.checkResponse),
      catchError(error => throwError(error))
    ));
  }

  
  Register(link, data) {
    return this.http.post(link, data)
    .pipe((
      map(this.checkResponse),
      catchError(error => throwError(error))
    ));
  }

  getUserDetails(link) {
    return this.http.get(link, {headers: this.headers})
    .pipe((
      map(this.checkResponse),
      catchError(error => throwError(error))
    ));
  }

  checkResponse(response: any) {
    let results: any = response; 
    if (results.status === true) { 
        return results;
    } else { 
        return results;
    }
}
}
