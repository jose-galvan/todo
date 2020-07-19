import { Component, OnInit } from "@angular/core";
import { TodoState } from "../../store/todo.state";
import { Observable } from "rxjs";
import { Select } from "@ngxs/store";
import { Todo } from "src/app/models/todo";
@Component({
    selector: "ns-todo-list",
    templateUrl: "./todo-list.component.html",
    styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit {
    @Select(TodoState.getTodos)
    todos$: Observable<Todo[]>;

    @Select(TodoState.getTotalTodo)
    total$: Observable<number>;

    constructor() {}

    ngOnInit() { }
}
