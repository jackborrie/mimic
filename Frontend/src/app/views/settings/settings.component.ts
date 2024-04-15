import { Component, OnDestroy, OnInit } from '@angular/core';
import {NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit, OnDestroy {

    private _subscriptions: Subscription = new Subscription();
    protected url: string = '';

    public constructor(private _router: Router) {
    }

    ngOnInit(): void {
        let routerSubscription = this._router.events
            .subscribe((event) => {
                if (!(event instanceof NavigationEnd)) {
                    return;
                }

                this.url = event.url;
            });

        this.url = this._router.url;

        this._subscriptions.add(routerSubscription);
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }


    protected currentRoute (url: string): boolean {
        return this.url.includes(url);
    }
}
