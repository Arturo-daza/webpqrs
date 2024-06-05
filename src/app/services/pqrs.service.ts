import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PQRSService {
  apiUri = 'http://localhost:3000/api/pqrs';

  constructor(private http: HttpClient) { }

  getAllPQRSData(token: any): Observable<any> {

    return this.http.get(this.apiUri, {
      headers:
      {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      }
    });
  }

  newPQRS(token: any, data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUri,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          accessToken: `${token}`
        }
      });
  }

  updatePQRS(token: any, id: any, data: any): Observable<any> {
    console.log(data)
    return this.http.put<any>(
      this.apiUri + '/' + id,
      data,
      { headers: {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      } });
  }

  getOnePQRS(token: any, id: any): Observable<any> {
    return this.http.get<any>(
      this.apiUri + '/' + id,
      { headers: {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      } });
  }

  deletePQRS(token: any, id: any) {
    return this.http.delete<any>(
      this.apiUri + "/" + id,
      { headers: {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      } });
  }

}
