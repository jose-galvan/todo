import { Component, OnInit } from "@angular/core";
import { TodoState } from "../../store/todo.state";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { Todo } from "src/app/models/todo";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
@Component({
    selector: "ns-todo-list",
    templateUrl: "./todo-list.component.html",
    styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit {
    todos$: Observable<Todo[]>;

    constructor(private route: ActivatedRoute, private store: Store) {
        const completed = this.route.snapshot.paramMap.get("completed");
        
        this.todos$ = this.store
            .select(TodoState.getTodoFilteredByStatus)
            .pipe(map((filterFn) => filterFn(completed === "true")));
    }

    ngOnInit() {}
}
