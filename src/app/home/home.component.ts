import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { Todo } from "../models/todo";
import { Observable } from "rxjs";
import { TodoState } from "../store/todo.state";
@Component({
    selector: "ns-home",
    templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
    todos$: Observable<Todo[]>;

    constructor(private store: Store) {
        this.todos$ = store.select(TodoState.getAll);
    }

    ngOnInit() {}
}
