import {Directive, ElementRef, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[drag-n-drop]'
})
export class DragNDropDirective {

    @HostBinding('class.fileover')
    fileOver: boolean = false;

    @Output()
    fileDropped: EventEmitter<FileList> = new EventEmitter();

    constructor(
        private _el: ElementRef
    ) {
    }

    @HostListener('dragover', ['$event'])
    public onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver = true;
    }

    @HostListener('dragleave', ['$event'])
    public onDragLeave(event: DragEvent) {
        this.fileOver = false;
        event.preventDefault();
        event.stopPropagation();
    }

    @HostListener('drop', ['$event'])
    public onDrop(event: any) {
        event.preventDefault();
        event.stopPropagation();

        this.fileOver = false
        const files = event.dataTransfer.files;

        if (files.length > 0) {
            this.fileDropped.next(files);
        }
    }
}
