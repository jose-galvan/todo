import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "../models/user";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: "root",
})
export class AuthenticationService {
    BASE_URL = `${environment.api}user/`;

    constructor(private http: HttpClient) {}

    register(user: User): Observable<User> {
        return this.http.post<User>(`${this.BASE_URL}register`, user);
    }

    login(): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}login`, {
            ...environment.user,
        });
    }
}
