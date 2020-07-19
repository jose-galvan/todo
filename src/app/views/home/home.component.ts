import { Component, OnInit } from "@angular/core";

import { HomeCards } from "../../models/card";
import { Todo } from "src/app/models/todo";
import { Observable } from "rxjs";
import { TodoState } from "../../store/todo.state";
import { Select } from "@ngxs/store";

@Component({
    selector: "ns-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    cards = HomeCards;
    @Select(TodoState.getDueToday)
    dueToday$: Observable<Todo[]>;
    constructor() {}

    ngOnInit() {}
}
