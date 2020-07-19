import { Component, OnInit, Input } from "@angular/core";
import { Card } from "../../models/card";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { TodoState } from "../../store/todo.state";
import { map } from "rxjs/operators";

@Component({
    selector: "ns-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
    @Input() card: Card;
    total$: Observable<number>;
    constructor(private router: Router, private store: Store) {}

    ngOnInit() {
        this.total$ = this.store
            .select(TodoState.getTotalByStatus)
            .pipe(map((filterFn) => filterFn(this.card.completed)));
    }

    redirect = () =>
        this.router.navigate([`${this.card.list}/${this.card.completed}`]);
}
