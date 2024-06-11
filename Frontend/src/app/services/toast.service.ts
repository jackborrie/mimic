import {Injectable}                      from '@angular/core';
import {BehaviorSubject, Subject, timer} from "rxjs";

export class Toast {

    public constructor(public title: string, public level: 'info' | 'warn' | 'error' | 'success' = 'info', public allowHide: boolean = false) {
    }
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    private toasts: Toast[] = [];

    public $toastChanged: Subject<Toast[]> = new Subject<Toast[]>()

    constructor() {
    }

    public showToast (toast: Toast) {
        this.toasts.push(toast);

        this.$toastChanged.next(this.toasts);

        const t = timer(3000);

        t.subscribe(() => {
            const t = this.toasts.indexOf(toast)
            if (t < 0) {
                return;
            }
            this.toasts.splice(t, 1);
            this.$toastChanged.next(this.toasts);
        })
    }

    public hideToast (toast: Toast) {
        const t = this.toasts.indexOf(toast)
        if (t < 0) {
            return;
        }
        this.toasts.splice(t, 1);
        this.$toastChanged.next(this.toasts);
    }
}
