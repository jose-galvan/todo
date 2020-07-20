import { Todo } from "../models/todo";

export enum ActionsType {
    LOAD_TODOS = "[TODO] Load todo list",
    ADD_NEW = "[TODO] Add New",
    COMPLETE_TODO = "[TODO] Complete todo",
    DELETE_TODO = "[TODO] Delete todo"
}

export class LoadTodos {
    static readonly type = ActionsType.LOAD_TODOS;
    constructor() {}
}

export class AddTodo {
    static readonly type = ActionsType.ADD_NEW;
    constructor(public payload: string) {}
}

export class CompleteTodo {
    static readonly type = ActionsType.COMPLETE_TODO;
    constructor(public payload: Todo) {}
}

export class DeleteTodo {
    static readonly type = ActionsType.DELETE_TODO;
    constructor(public payload: string) {}
}
