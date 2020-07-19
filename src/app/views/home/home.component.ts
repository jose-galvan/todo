import { Component, OnInit } from "@angular/core";

import { HomeCards } from "../../models/card";

@Component({
    selector: "ns-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    cards = HomeCards;

    constructor() {}

    ngOnInit() {}
}
