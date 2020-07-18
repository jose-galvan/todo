import { Injectable } from "@angular/core";
import { Todo } from "../models/todo";

@Injectable({
    providedIn: "root",
})
export class TodosService {
    private todos: Todo[] = [
        {
            Id: 1,
            Title: "Do the dishes",
            Description: "...",
            Due: null,
            Completed: false,
            CompletedDate: null,
        },
        {
            Id: 2,
            Title: "Do the laundry",
            Description: "..",
            Due: null,
            Completed: false,
            CompletedDate: null,
        },
        {
            Id: 3,
            Title: "Get the groceries",
            Description: "On Cornershop",
            Due: null,
            Completed: false,
            CompletedDate: null,
        },
        {
            Id: 4,
            Title: "Finish todo app",
            Description: "Development of new app",
            Due: null,
            Completed: false,
            CompletedDate: null,
        },
    ];

    getAll(): Todo[] {
        return this.todos;
    }
}
