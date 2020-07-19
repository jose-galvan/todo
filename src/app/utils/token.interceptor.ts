import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { getString } from "tns-core-modules/application-settings";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let headers: HttpHeaders = req.headers;
        headers = headers.set("Content-Type", "application/json");
        if (req.url.includes("login")) {
            const loginReq = req.clone({ headers });
            return next.handle(loginReq);
        }

        const token = getString("token");
        headers = headers.append("Authorization", `Bearer ${token}`);
        const authreq = req.clone({ headers });
        return next.handle(authreq);
    }
}
