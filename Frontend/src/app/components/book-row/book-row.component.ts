import {AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {convertRemToPixels}                                                                         from "../../lib/helpers";
import {Book}                                                                                       from "../../models/book";

@Component({
    selector: 'app-book-row',
    templateUrl: './book-row.component.html',
    styleUrl: './book-row.component.scss'
})
export class BookRowComponent implements AfterViewInit {

    @ViewChild('bookWrapper')
    protected bookWrapper!: ElementRef;

    private _mouseDown: boolean = false;
    private _dragging: boolean = false;

    protected currentIndex: number = 0; // The current step index.
    private _diff: number = 0; // The current difference when dragging.
    private _currentTranslation: number = 0; // The current translation in pixels.
    private _totalWidth: number = 0; // The total width of the book wrapper element.
    protected maxStep: number = 0; // Maximum number of steps in a book row.
    private _initialX: number = 0; // Initial X of the mouse when dragging.
    private canScroll: boolean = false;

    @Input()
    public books: Book[] = [];

    @Input()
    public title: string = '';

    public constructor(
        private _renderer: Renderer2
    ) {
    }

    public ngAfterViewInit() {
        setTimeout(() => {
            const bookWidth = this.books.length * 150 + (this.books.length - 1) * convertRemToPixels(1);
            this.canScroll = bookWidth > this.bookWrapper.nativeElement.offsetWidth;
            this._totalWidth = bookWidth - this.bookWrapper.nativeElement.offsetWidth;
            this.maxStep = this.calculateStep(-this._totalWidth);
        });
    }

    protected handleMouseDown(event: MouseEvent) {
        this._mouseDown = true;
        this._initialX = event.pageX;
    }

    @HostListener('window:mousemove', ['$event'])
    protected handleMouseMove(event: MouseEvent) {
        if (!this._mouseDown || !this.canScroll) {
            return;
        }

        this._dragging = true;

        this._diff = this._currentTranslation + event.pageX - this._initialX;

        if (this._diff > 0) {
            this._diff = 0;
        }

        if (-this._diff > this._totalWidth) {
            this._diff = -this._totalWidth;
        }

        this._renderer.setStyle(this.bookWrapper.nativeElement, 'transform', `translateX(${this._diff}px)`)
    }

    private calculateStep(diff: number): number {
        let step = 75;

        let inverseDiff = -diff;

        for (let bookIdx = 0; bookIdx < this.books.length; bookIdx++) {
            if (inverseDiff < step) {
                return bookIdx;
            }

            if (bookIdx !== this.books.length - 1) {
                step += 150 + convertRemToPixels(1);
            }
        }

        return -1;
    }

    private getOffsetFromStep(step: number): number {
        return -(step * 150 + step * convertRemToPixels(1));
    }

    @HostListener('window:mouseup', ['$event'])
    protected handleMouseUp(event: MouseEvent) {
        this._mouseDown = false;

        if (!this._dragging) {
            return;
        }

        this._dragging = false;

        this._currentTranslation = this._diff;
        const step = this.calculateStep(this._currentTranslation);
        this.setCurrentStep(step);
    }

    protected setCurrentStep(step: number) {
        if (step < 0) {
            step = 0;
        }

        if (step > this.maxStep) {
            step = this.maxStep;
        }

        let offset = this.getOffsetFromStep(step)

        if (this.books.length > 3 && -offset > this._totalWidth) {
            offset = -this._totalWidth;
        }

        this.currentIndex = step;
        this._currentTranslation = offset;
        this._renderer.setStyle(this.bookWrapper.nativeElement, 'transform', `translateX(${offset}px)`);
    }

    protected getCurrentCursor (): string {
        if (!this.canScroll) {
            return 'default';
        }

        return this._dragging ? 'grabbing' : 'grab';
    }
}
