import { Component, OnInit, Input } from "@angular/core";

import { Todo } from "../../models/todo";
import { Store } from "@ngxs/store";
import { CompleteTodo } from "../../store/todo.actions";
@Component({
    selector: "ns-todo-list-item",
    templateUrl: "./todo-list-item.component.html",
    styleUrls: ["./todo-list-item.component.scss"],
})
export class TodoListItemComponent implements OnInit {
    @Input() todo: Todo;

    constructor(private store: Store) {}

    ngOnInit() {}

    onTap = () => this.store.dispatch(new CompleteTodo(this.todo));
}
