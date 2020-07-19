import { Todo } from "../models/todo";

export enum ActionsType {
    INIT_LIST = "[TODO] Seed list",
    ADD_NEW = "[TODO] Add New",
    EDIT_TODO = "[TODO] Edit todo",
    COMPLETE_TODO = "[TODO] Complete todo",
    DELETE_TODO = "[TODO] Delete todo",
}

export class InitList {
    static readonly type = ActionsType.INIT_LIST;
    constructor() {}
}

export class AddTodo {
    static readonly type = ActionsType.ADD_NEW;
    constructor(public payload: Todo) {}
}

export class UpdateTodo {
    static readonly type = ActionsType.EDIT_TODO;
    constructor(public payload: Todo) {}
}

export class CompleteTodo {
    static readonly type = ActionsType.COMPLETE_TODO;
    constructor(public payload: Todo) {}
}

export class DeleteTodo {
    static readonly type = ActionsType.DELETE_TODO;
    constructor(public payload: number) {}
}
