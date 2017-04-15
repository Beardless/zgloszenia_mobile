import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SendProvider {
  constructor(private http: Http) {}

  send(data) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(data);
    return this.http.post('http://mockbin.org/bin/6acc292c-ff94-40bb-ab82-e804008639d8', body, options)
      .map((res: Response) => res.json());
  }
}
