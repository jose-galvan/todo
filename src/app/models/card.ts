export class Card {
    legend: string;
    iconClass: string;
    list: string;
    completed: boolean;
}

export const HomeCards: Card[] = [
    {
        legend: "Todo",
        iconClass: "far grey",
        list: "todos",
        completed: false,
    },
    {
        legend: "Done",
        iconClass: "fas success",
        list: "todos",
        completed: true,
    }
];
