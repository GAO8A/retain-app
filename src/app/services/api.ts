import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
// allows us to use our http service in our ApiService

export class ApiService {
  headers: Headers = new Headers({
    'Content-Type':'application/json',
    Accept: 'application/json'
  });

  api_url: string = 'http://localhost:3500';

  // typescript uses this type to emit meta data
  constructor(private http: Http){
    // binds http to the context of the class
  }
  private getJson(response: Response){
    return response.json;
  }

  private checkForError(response: Response): Response { // signifies returning type of response.
    if (response.status >= 200 && response.status < 300){
      return response;
    } else {
      var error = new Error(response.statusText);
      error['response'] = response;
      console.error(error);
      throw error;
    }
  }

  get(path:string): Observable<any>{
    return this.http.get(`${this.api_url}${path}`,{headers: this.headers})
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  post(path:string, body): Observable<any>{
    return this.http.post(
      `${this.api_url}${path}`,
      JSON.stringify(body),
      {headers: this.headers})
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  delete(path:string): Observable<any>{
    return this.http.delete(`${this.api_url}${path}`,{headers: this.headers})
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }
}
