import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Select } from "@ngxs/store";

import { HomeCards } from "../../models/card";
import { Todo } from "src/app/models/todo";
import { TodoState } from "../../store/todo.state";

@Component({
    selector: "ns-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
    cards = HomeCards;

    @Select(TodoState.getCreatedToday)
    latest$: Observable<Todo[]>;

    constructor() {}
}
