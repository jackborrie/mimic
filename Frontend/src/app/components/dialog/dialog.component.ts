import {Component, ContentChildren, Input, OnDestroy, OnInit, QueryList, TemplateRef} from '@angular/core';
import {fromEvent, Subscription}                                                      from "rxjs";
import {MimicTemplate}                                               from "../../directives/mimic-template.directive";

@Component({
  selector: 'm-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit , OnDestroy{

    @ContentChildren(MimicTemplate)
    templates!: QueryList<MimicTemplate>;

    @Input()
    title: string | null = null;

    @Input()
    showClose: boolean = true;

    protected displayDialog: boolean = false;

    private _subscription: Subscription = new Subscription();

    ngOnInit() {
        const windowClick = fromEvent(window, 'click')
            .subscribe(e => {
                const target = e.target as HTMLElement;

                if (!target.classList.contains('dialog-container')) {
                    return;
                }

                console.log(target);

                this.hide();
            });

        this._subscription.add(windowClick);
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    public show() {
        this.displayDialog = true;
    }

    public hide () {
        this.displayDialog = false;
    }

    protected getTemplate(columnName: string): TemplateRef<any> | null {
        let template = null;
        (this.templates as QueryList<MimicTemplate>).forEach(item => {
            if (item.getType().toLowerCase() === columnName.toLowerCase()) {
                template = item.template;
                return;
            }
        });

        return template;
    }
}
