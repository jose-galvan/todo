import "zone.js/dist/zone.js";
import "zone.js/dist/async-test.js";
import "zone.js/dist/proxy.js ";

import { TestBed, async } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { TodoState, TodoStateModel } from "../app/store/todo.state";
import { AddTodo } from "../app/store/todo.actions";
import { Todo } from "../app/models/todo";
import { CompleteTodos, PendingTodos } from "../app/store/todo.mock.data";

describe("Todo State", () => {
    let store: Store;
    let todoState: (isBusy: boolean, todos: Todo[]) => TodoStateModel;
    let todos: Todo[];
    beforeEach(() => {
        todos = [...CompleteTodos, ...PendingTodos];
        todoState = (isBusy: boolean, todos: Todo[]): TodoStateModel => ({
            isBusy,
            todos,
        });
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([TodoState])],
        }).compileComponents();
        store = TestBed.get(Store);
    }));

    it(`Should Add Todo'`, async(() => {
        store.dispatch(new AddTodo("Boiler plate"));
        store
            .selectOnce((state) => state.store.todos)
            .subscribe((todos: Todo[]) => {
                expect(todos[0].description).toBe("Boiler plate");
            });
    }));

    describe("Selectors", () => {
        describe("getTodoFilteredByStatus, completed: true", () => {
            it(`Should return todos completed'`, async(() => {
                const state = todoState(false, todos);
                const result = TodoState.getTodoFilteredByStatus(state)(true);
                expect(result).toEqual(CompleteTodos);
                expect(result.length).toEqual(4);
            }));
        });

        describe("getTodoFilteredByStatus, completed: false", () => {
            it(`Should return pending Todos'`, async(() => {
                const state = todoState(false, todos);
                const result = TodoState.getTodoFilteredByStatus(state)(true);
                expect(result).toEqual(PendingTodos);
                expect(result.length).toEqual(4);
            }));
        });
    });
});
