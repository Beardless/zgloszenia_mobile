import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SendProvider {
  constructor(private http: Http) {}

  send(data) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
        .post(
            'https://reporter.24wspolnota.pl/request/',
            JSON.stringify(data),
            options
        )
        .map((res: Response) => res.json());
  }

  sendMail(data, requestId) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(
        'https://reporter.24wspolnota.pl/request/'+requestId+'/'+data.uniqueId+'/sendMail',
        JSON.stringify(data),
        options
      )
      .map((res: Response) => res.json());
  }


}
