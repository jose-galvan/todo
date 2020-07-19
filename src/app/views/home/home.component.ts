import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";

import { HomeCards } from "../../models/card";
import { Todo } from "../../models/todo";
import { TodoState } from "../../store/todo.state";
import { AddTodo } from "../../store/todo.actions";

@Component({
    selector: "ns-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
    cards = HomeCards;
    description = "";

    @Select(TodoState.getCreatedToday)
    latest$: Observable<Todo[]>;

    constructor(private store: Store) {}

    addNew() {
        this.store
            .dispatch(new AddTodo(this.description))
            .subscribe((_) => (this.description = ""));
    }
}
