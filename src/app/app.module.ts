import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { NgxsModule } from "@ngxs/store";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NativeScriptFormsModule } from "@nativescript/angular/forms/forms.module";
import { NativeScriptHttpClientModule } from "@nativescript/angular/http-client";

import { TodosService } from "./services/todos.service";
import { AuthenticationService } from "./services/authentication.service";
import { TokenInterceptor } from "./utils/token.interceptor";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./views/home/home.component";
import { TodoState } from "./store/todo.state";
import { CardComponent } from "./components/card/card.component";
import { TodoListComponent } from "./views/todo-list/todo-list.component";
import { TodoListItemComponent } from "./components/todo-list-item/todo-list-item.component";

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NgxsModule.forRoot([TodoState]),
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        CardComponent,
        TodoListItemComponent,
        TodoListComponent,
    ],
    providers: [
        TodosService,
        AuthenticationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
