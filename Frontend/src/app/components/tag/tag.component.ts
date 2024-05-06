import { Component, Input } from '@angular/core';

@Component({
  selector: 'm-tag',
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {
    @Input()
    text: string = '';

    @Input()
    icon: string | null = null;

    @Input()
    iconPos: 'left' | 'right' = 'left';

    @Input()
    color: string = 'var(--foreground-0)';
}
