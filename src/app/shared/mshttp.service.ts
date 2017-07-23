import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthenticationService } from '../_services/index';

@Injectable()
export class MshttpService {

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService
    ) {}

  get(url) {
    let headers = new Headers({ 'secret': 'longobnoxiouspassphrase ' , 'token' : this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers({ 'secret': 'longobnoxiouspassphrase ' , 'token' : this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, {
      headers: headers
    });
  }

  delete(url, data) {
    let headers = new Headers({ 'secret': 'longobnoxiouspassphrase ' , 'token' : this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(url, {
      headers: headers
    });
  }
}
