import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";

import { TodoState } from "../../store/todo.state";
import { Router } from "@angular/router";

@Component({
    selector: "ns-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    @Select(TodoState.getTotalTodo)
    todo$: Observable<number>;

    @Select(TodoState.getTotalDone)
    done$: Observable<number>;

    constructor(private router: Router) {}

    ngOnInit() {}

    displayTodos() {
        this.router.navigate(['/todos']);
    }
}
