import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'm-tag',
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent implements OnInit {
    protected _iconPos: 'left' | 'right' = 'left';

    @Input()
    text: string = '';

    @Input()
    icon: string | null = null;

    @Input()
    set iconPos(value: 'left' | 'right' | null) {
        this._iconPos = value ?? 'left';
    }

    @Input()
    color: string = 'var(--foreground-0)';

    public ngOnInit() {
    }
}
