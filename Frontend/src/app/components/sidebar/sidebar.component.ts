import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription}                    from 'rxjs';
import {AppStateService, ThemeInterface} from "../../services/app-state.service";
import {FileUploadStatus} from "../../views/books/books.component";
import {BookService} from "../../services/book.service";

@Component({
               selector   : 'app-sidebar',
               templateUrl: './sidebar.component.html',
               styleUrl   : './sidebar.component.scss'
           })
export class SidebarComponent implements OnInit, OnDestroy {

    private _subscription: Subscription = new Subscription();

    protected themes: ThemeInterface[] = [];

    protected currentTheme!: ThemeInterface;

    private _files: {[key: string]: FileUploadStatus} = {};

    protected uploading: boolean = false;

    public constructor (
        private _state: AppStateService,
        private _books: BookService
    ) {
    }

    changeTheme (theme: string) {
        this._state.setTheme(theme);
    }

    ngOnInit (): void {
        this.themes = this._state.getThemes();

        let themeSub = this._state.$onThemeChanged
            .subscribe((theme) => {
                this.currentTheme = theme;
            });

        this._subscription.add(themeSub);
    }

    getColor (theme: ThemeInterface): 'primary' | 'accent' | 'warn' {
        return 'primary';
    }

    ngOnDestroy (): void {
        this._subscription.unsubscribe();
    }

    handleFileUpload (event: any) {
        const files = event.target.files;

        if (files.length <= 0) {
            return;
        }

        this._doUpload(files)
    }

    handleFileDropped (files: FileList) {
        this._doUpload(files)
    }

    private _checkAllFilesUploaded () {
        let anyWaiting = false;
        for (let fileNames of Object.keys(this._files)) {
            if (!this._files[fileNames].complete) {
                anyWaiting = true;
                break;
            }
        }

        if (anyWaiting) {
            return;
        }

        this.uploading = false;
        this._books.getAllBooks();
    }

    private _doUpload(files: FileList) {
        this._files = {};
        this.uploading = true;
        for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
            const file = files[fileIdx];

            this._files[file.name] = {
                file: file,
                complete: false
            }

            this._books.uploadBook(file)
                .subscribe(result => {
                    this._files[file.name].complete = true;

                    this._checkAllFilesUploaded();
                }, error => {
                    this._files[file.name].complete = true;

                    console.error(error);
                    this.uploading = false;
                })
        }
    }
}
