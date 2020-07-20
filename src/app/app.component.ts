import { Component } from "@angular/core";
import { setString } from "tns-core-modules/application-settings";
import { LoadTodos } from "./store/todo.actions";
import { AuthenticationService } from "./services/authentication.service";
import { Store, Select } from "@ngxs/store";
import { TodoState } from "./store/todo.state";
import { Observable } from "rxjs";
@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
})
export class AppComponent {
    @Select(TodoState.isBusy)
    isBusy$: Observable<boolean>;

    constructor(
        private store: Store,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this.ensureLoggedIn();
    }

    ensureLoggedIn() {
        this.authenticationService.login().subscribe(({ token }) => {
            setString("token", token);
            this.store.dispatch(new LoadTodos());
        });
    }
}
