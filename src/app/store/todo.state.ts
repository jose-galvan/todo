import { Injectable } from "@angular/core";
import { State, Action, Selector, StateContext } from "@ngxs/store";
import {
    insertItem,
    patch,
    removeItem,
    updateItem,
} from "@ngxs/store/operators";

import { Todo } from "../models/todo";
import { LoadTodos, AddTodo, DeleteTodo, CompleteTodo } from "./todo.actions";
import { TodosService } from "../services/todos.service";

export interface TodoStateModel {
    todos: Todo[];
}

@State<TodoStateModel>({
    name: "todos",
    defaults: {
        todos: [],
    },
})
@Injectable()
export class TodoState {
    constructor(private todosService: TodosService) {}

    @Selector()
    static getTodoFilteredByStatus(state: TodoStateModel) {
        return (status: boolean) => {
            return state.todos.filter((e) => e.completed === status);
        };
    }

    @Selector()
    static getTotalByStatus(state: TodoStateModel) {
        return (status: boolean) => {
            return state.todos.filter((e) => e.completed === status).length;
        };
    }

    @Selector()
    static getAll(state: TodoStateModel) {
        return state.todos;
    }

    @Selector()
    static getCreatedToday(state: TodoStateModel) {
        const today = new Date().toDateString();
        return state.todos.filter(
            (e) =>
                !e.completed && new Date(e.createdAt).toDateString() === today
        );
    }

    @Action(LoadTodos)
    loadTodos(ctx: StateContext<TodoStateModel>) {
        this.todosService.GetAll().subscribe(({ data }) => {
            ctx.setState(patch({ todos: data }));
        });
    }

    @Action(AddTodo)
    addTodo(ctx: StateContext<TodoStateModel>, { payload }: AddTodo) {
        this.todosService.Add(payload).subscribe(({ data }) => {
            ctx.setState(
                patch({
                    todos: insertItem(data),
                })
            );
        });
    }

    @Action(DeleteTodo)
    delete(
        { setState }: StateContext<TodoStateModel>,
        { payload }: DeleteTodo
    ) {
        this.todosService.DeleteTodo(payload).subscribe((_) => {
            setState(
                patch<TodoStateModel>({
                    todos: removeItem((todo) => todo._id === payload),
                })
            );
        });
    }

    @Action(CompleteTodo)
    complete(
        { setState }: StateContext<TodoStateModel>,
        { payload }: CompleteTodo
    ) {
        payload.completed = true;
        this.todosService.CompleteTodo(payload._id).subscribe(() => {
            setState(
                patch<TodoStateModel>({
                    todos: updateItem<Todo>(
                        (todo) => todo._id === payload._id,
                        patch<Todo>(payload)
                    ),
                })
            );
        });
    }
}
