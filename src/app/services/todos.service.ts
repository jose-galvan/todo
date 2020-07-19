import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: "root",
})
export class TodosService {
    BASE_URL = `${environment.api}task/`;

    constructor(private http: HttpClient) {}

    Add(description: string): Observable<any> {
        return this.http.post(this.BASE_URL, { description });
    }

    GetAll(): Observable<any> {
        return this.http.get(this.BASE_URL);
    }

    CompleteTodo(id: string): Observable<any> {
        return this.http.put(`${this.BASE_URL}${id}`, { completed: true });
    }

    DeleteTodo(id: string): Observable<any> {
        return this.http.delete(`${this.BASE_URL}${id}`);
    }
}
