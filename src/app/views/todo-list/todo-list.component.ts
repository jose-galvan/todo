import { Component } from "@angular/core";
import { TodoState } from "../../store/todo.state";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { Todo } from "src/app/models/todo";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
@Component({
    selector: "ns-todo-list",
    templateUrl: "./todo-list.component.html",
    styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent {
    todos$: Observable<Todo[]>;
    title = "";
    titleClass = "";
    itemsToDisplay = false;

    constructor(private route: ActivatedRoute, private store: Store) {
        const completed =
            "true" === this.route.snapshot.paramMap.get("completed");
        this.title = completed ? "Done" : "ToDo";
        this.titleClass = completed ? "success" : "";

        this.todos$ = this.store
            .select(TodoState.getTodoFilteredByStatus)
            .pipe(map((filterFn) => filterFn(completed)));

        this.todos$.subscribe((e) => (this.itemsToDisplay = e.length > 0));
    }

}
