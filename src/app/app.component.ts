import { Component } from "@angular/core";
import { InitList } from "./store/todo.actions";
import { Store } from "@ngxs/store";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
})
export class AppComponent {
    constructor(private store: Store) {
        this.store.dispatch(new InitList());
    }
}
