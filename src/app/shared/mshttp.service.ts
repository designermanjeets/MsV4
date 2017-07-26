import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { environment } from "environments/environment";
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class InterceptedHttp extends Http {
    constructor(
      backend: ConnectionBackend, 
      defaultOptions: RequestOptions,
      private router: Router,
      ) {
        super(backend, defaultOptions);
      }
    
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body?: any, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    private updateUrl(req: string) {
        return  environment.origin + req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        
        options.headers.append('Access-Control-Allow-Origin', environment.origin);
        options.headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
        options.headers.append('Access-Control-Allow-Headers', 'Content-Type'); 
        //options.headers.append('secret', 'longobnoxiouspassphrase');     // Not sure of Token to work with Interceptors
        //options.headers.append('token', JSON.parse(localStorage.getItem('currentUser')).token);
        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status  == 401) {
                this.router.navigate(['/login']);
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });
 
    }

}