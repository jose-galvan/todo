import { Component } from "@angular/core";
import { setString } from "tns-core-modules/application-settings";
import { LoadTodos } from "./store/todo.actions";
import { AuthenticationService } from "./services/authentication.service";
import { Store } from "@ngxs/store";
@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
})
export class AppComponent {
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
