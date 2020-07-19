import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { NgxsModule } from "@ngxs/store";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./views/home/home.component";
import { TodosService } from "./services/todos.service";
import { TodoState } from "./store/todo.state";
import { CardComponent } from "./components/card/card.component";
import { TodoListComponent } from "./views/todo-list/todo-list.component";
import { TodoListItemComponent } from "./components/todo-list-item/todo-list-item.component";
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NgxsModule.forRoot([TodoState]),
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        CardComponent,
        TodoListItemComponent,
        TodoListComponent,
    ],
    providers: [TodosService],
    schemas: [NO_ERRORS_SCHEMA],
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
