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
import { tap } from "rxjs/operators";

export interface TodoStateModel {
    todos: Todo[];
    isBusy: boolean;
}

@State<TodoStateModel>({
    name: "todos",
    defaults: {
        todos: [],
        isBusy: false,
    },
})
@Injectable()
export class TodoState {
    constructor(private todosService: TodosService) {}

    @Selector()
    static isBusy(state: TodoStateModel) {
        return state.isBusy;
    }

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
    static getLatest(state: TodoStateModel) {
        const today = new Date().toDateString();
        return state.todos.filter(
            (e) =>
                !e.completed && new Date(e.createdAt).toDateString() === today
        );
    }

    @Action(LoadTodos)
    loadTodos({ setState }: StateContext<TodoStateModel>) {
        setState(
            patch<TodoStateModel>({ isBusy: true })
        );
        return this.todosService.GetAll().pipe(
            tap(({ data }) => {
                setState(patch({ todos: data, isBusy: false }));
            })
        );
    }

    @Action(AddTodo)
    addTodo({ setState }: StateContext<TodoStateModel>, { payload }: AddTodo) {
        setState(
            patch<TodoStateModel>({ isBusy: true })
        );
        return this.todosService.Add(payload).pipe(
            tap(({ data }) => {
                setState(
                    patch({
                        todos: insertItem(data),
                        isBusy: false,
                    })
                );
            })
        );
    }

    @Action(DeleteTodo)
    delete(
        { setState }: StateContext<TodoStateModel>,
        { payload }: DeleteTodo
    ) {
        setState(
            patch<TodoStateModel>({ isBusy: true })
        );
        return this.todosService.DeleteTodo(payload).pipe(
            tap(() => {
                setState(
                    patch<TodoStateModel>({
                        todos: removeItem((todo) => todo._id === payload),
                        isBusy: false,
                    })
                );
            })
        );
    }

    @Action(CompleteTodo)
    complete(
        { setState }: StateContext<TodoStateModel>,
        { payload }: CompleteTodo
    ) {
        setState(
            patch<TodoStateModel>({ isBusy: true })
        );
        return this.todosService.CompleteTodo(payload._id).pipe(
            tap(({ data }) => {
                setState(
                    patch<TodoStateModel>({
                        todos: updateItem<Todo>(
                            (todo) => todo._id === payload._id,
                            patch({ ...data })
                        ),
                        isBusy: false,
                    })
                );
            })
        );
    }
}
