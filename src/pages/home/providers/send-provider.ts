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
    return this.http.post('http://mockbin.org/bin/8b455293-429e-41da-9fd4-a1ac2f788405', body, headers)
      .map((res: Response) => res.json());
  }
}
