import { Component, OnInit, Input } from "@angular/core";

import { Todo } from "../../models/todo";
import { Store, Select } from "@ngxs/store";
import { CompleteTodo } from "../../store/todo.actions";
import { Observable } from "rxjs";
import { TodoState } from "../../store/todo.state";

@Component({
    selector: "ns-todo-list-item",
    templateUrl: "./todo-list-item.component.html",
    styleUrls: ["./todo-list-item.component.scss"],
})
export class TodoListItemComponent implements OnInit {
    @Input() todo: Todo;
    @Select(TodoState.getTotalTodo)
    total$: Observable<number>;
    constructor(private store: Store) {}

    ngOnInit() {}

    onTap = () => this.store.dispatch(new CompleteTodo(this.todo));
}
