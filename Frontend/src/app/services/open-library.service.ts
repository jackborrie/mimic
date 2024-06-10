import {Injectable} from '@angular/core';
import {RequestService} from "./request.service";
import {FilteredData} from "../models/filtered-data";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {OpenLibraryResult} from "../models/open-library-result";

@Injectable({
    providedIn: 'root'
})
export class OpenLibraryService {

    private url: string = 'https://openlibrary.org/search.json?q=';
    constructor(
        private _httpClient: HttpClient
    ) {
    }

    public search (title: string, page: number = 0, limit: number = 10) {
        let searchUrl = this.url + encodeURIComponent(title)

        searchUrl += "&fields=isbn,cover_i,author_key,author_name,first_publish_year,edition_count,title,subject,language"

        searchUrl += `&page=${page + 1}&limit=${limit}`;

        return this._httpClient.get(searchUrl, )
            .pipe(
                map(data => {
                    const result = new OpenLibraryResult()

                    result.parse(data)

                    return result;
                })
            );
    }
}
