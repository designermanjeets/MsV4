import { XHRBackend, Http, RequestOptions } from "@angular/http";
import { InterceptedHttp } from "./mshttp.service";
import { Router, ActivatedRoute } from '@angular/router';

export function httpFactory(
    xhrBackend: XHRBackend, 
    requestOptions: RequestOptions,
    router: Router
    ): Http {
    return new InterceptedHttp(xhrBackend, requestOptions, router);
}