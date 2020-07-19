import { Injectable } from "@angular/core";
import { State, Action, Selector, StateContext, StateToken } from "@ngxs/store";

import { Todo } from "../models/todo";
import {
    LoadTodos,
    AddTodo,
    DeleteTodo,
    CompleteTodo,
} from "./todo.actions";
import { append, patch, removeItem, updateItem } from "@ngxs/store/operators";
import { TodosService } from "../services/todos.service";

const TODOS_STATE_TOKEN = new StateToken<TodoStateModel[]>("todos");

export interface TodoStateModel {
    todos: Todo[];
}

@State<TodoStateModel>({
    name: TODOS_STATE_TOKEN,
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
            return state.todos.filter((e) => e.completed == status);
        };
    }

    @Selector()
    static getTotalByStatus(state: TodoStateModel) {
        return (status: boolean) => {
            return state.todos.filter((e) => e.completed == status).length;
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
            (e) => !e.completed && e.createdAt.toDateString() === today
        );
    }

    @Selector()
    static getOne(state: TodoStateModel) {
        return state.todos;
    }

    @Action(LoadTodos)
    loadTodos(ctx: StateContext<TodoStateModel>) {
        if (!this.todosService) {
            console.log("todo service not injected");
            return;
        }
        this.todosService.GetAll().subscribe(({ data }) => {
            const todos: Todo[] = data.map((e) => {
                return e;
            });
            ctx.setState(patch({ todos }));
        });
    }

    @Action(AddTodo)
    addTodo(ctx: StateContext<TodoStateModel>, { payload }: AddTodo) {
        this.todosService.Add(payload).subscribe(({ data }) => {
            ctx.setState(
                patch({
                    todos: append([data]),
                })
            );
        });
    }

    @Action(DeleteTodo)
    delete(
        { setState }: StateContext<TodoStateModel>,
        { payload }: DeleteTodo
    ) {
        setState(
            patch<TodoStateModel>({
                todos: removeItem((todo) => todo._id === payload),
            })
        );
    }

    @Action(CompleteTodo)
    complete(
        { setState }: StateContext<TodoStateModel>,
        { payload }: CompleteTodo
    ) {
        setState(
            patch<TodoStateModel>({
                todos: updateItem<Todo>(
                    (todo) => todo._id === payload._id,
                    patch<Todo>(payload)
                ),
            })
        );
    }
}
