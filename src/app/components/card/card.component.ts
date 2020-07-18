import { Component, OnInit, Input } from "@angular/core";
@Component({
    selector: "ns-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
    @Input() total: number;
    @Input() legend: string;
    @Input() icon: string;

    constructor() {}

    ngOnInit() {}
}
