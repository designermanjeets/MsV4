import { XHRBackend, Http, RequestOptions } from "@angular/http";
import { InterceptedHttp } from "./mshttp.service";
import { AuthenticationService } from '../_services/index';

export function httpFactory(
    xhrBackend: XHRBackend, 
    requestOptions: RequestOptions,
    authenticationService: AuthenticationService
    ): Http {
    return new InterceptedHttp(xhrBackend, requestOptions, authenticationService);
}