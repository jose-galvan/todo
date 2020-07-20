import { Todo } from "../models/todo";

export const CompleteTodos: Todo[] = [
    {
        _id: "5f150c70d48da200172e2cdf",
        description: "Boiler plate",
        createdAt: new Date("2020-07-20T03:16:00.750Z"),
        completed: true,
    },
    {
        _id: "5f150ca9d48da200172e2ce4",
        description: "home component",
        createdAt: new Date("2020-07-20T03:16:57.988Z"),
        completed: true,
    },
    {
        _id: "5f151389d48da200172e2d1f",
        description: "dependency injection",
        createdAt: new Date("2020-07-20T03:46:17.358Z"),
        completed: true,
    },
    {
        _id: "5f1513edd48da200172e2d21",
        description: "project structure",
        createdAt: new Date("2020-07-20T03:47:57.649Z"),
        completed: true,
    },
];

export const PendingTodos: Todo[] = [
    {
        _id: "5f150c70d48da200172e2cdf",
        description: "Install NGXS",
        createdAt: new Date("2020-07-20T03:16:00.750Z"),
        completed: false,
    },
    {
        _id: "5f150ca9d48da200172e2ce4",
        description: "Add Styles ",
        createdAt: new Date("2020-07-20T03:16:57.988Z"),
        completed: false,
    },
    {
        _id: "5f151389d48da200172e2d1f",
        description: "Add routing",
        createdAt: new Date("2020-07-20T03:46:17.358Z"),
        completed: false,
    },
    {
        _id: "5f1513edd48da200172e2d21",
        description: "Add unit testing",
        createdAt: new Date("2020-07-20T03:47:57.649Z"),
        completed: false,
    },
];
