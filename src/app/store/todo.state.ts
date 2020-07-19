import { Injectable } from "@angular/core";
import { State, Action, Selector, StateContext, StateToken } from "@ngxs/store";

import { Todo } from "../models/todo";
import {
    InitList,
    AddTodo,
    DeleteTodo,
    UpdateTodo,
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
    static getTodos(state: TodoStateModel) {
        return state.todos.filter((e) => !e.Completed);
    }

    @Selector()
    static getTotalTodo(state: TodoStateModel) {
        return state.todos.filter((e) => !e.Completed).length;
    }

    @Selector()
    static getCompleted(state: TodoStateModel) {
        return state.todos.filter((e) => e.Completed);
    }

    @Selector()
    static getTotalDone(state: TodoStateModel) {
        return state.todos.filter((e) => e.Completed).length;
    }

    @Selector()
    static getAll(state: TodoStateModel) {
        return state.todos;
    }

    @Selector()
    static getOne(state: TodoStateModel) {
        return state.todos;
    }

    @Action(InitList)
    seedList(ctx: StateContext<TodoStateModel>) {
        const todos = this.todosService.getAll();
        ctx.setState(patch({ todos }));
    }

    @Action(AddTodo)
    addTodo(ctx: StateContext<TodoStateModel>, { payload }: AddTodo) {
        ctx.setState(
            patch({
                todos: append([payload]),
            })
        );
    }

    @Action(DeleteTodo)
    delete(
        { setState }: StateContext<TodoStateModel>,
        { payload }: DeleteTodo
    ) {
        setState(
            patch<TodoStateModel>({
                todos: removeItem((todo) => todo.Id === payload),
            })
        );
    }

    @Action(UpdateTodo)
    update(
        { setState }: StateContext<TodoStateModel>,
        { payload }: UpdateTodo
    ) {
        setState(
            patch<TodoStateModel>({
                todos: updateItem<Todo>(
                    (todo) => todo.Id === payload.Id,
                    patch<Todo>(payload)
                ),
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
                    (todo) => todo.Id === payload.Id,
                    patch<Todo>(payload)
                ),
            })
        );
    }
}
