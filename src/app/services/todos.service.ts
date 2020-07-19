import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { Todo } from "../models/todo";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: "root",
})
export class TodosService {
    BASE_URL = `${environment.api}task/`;

    constructor(private http: HttpClient) {}

    Add(todo: Todo): Observable<any> {
        return this.http.post<any>(this.BASE_URL, todo);
    }

    GetAll(): Observable<any> {
        return this.http.get<any>(this.BASE_URL);
    }

    GetCompleted(): Observable<Todo[]> {
        const options = {
            params: new HttpParams().set("completed", "true"),
        };
        return this.http.get<Todo[]>(this.BASE_URL, options);
    }

    CompleteTodo(id: string): Observable<any> {
        return this.http.put<any>(`${this.BASE_URL}${id}`, { completed: true });
    }

    DeleteTodo(id: string): Observable<any> {
        return this.http.delete(`${this.BASE_URL}${id}`);
    }
}
