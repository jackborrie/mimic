import {Model} from "./model";

export class OpenLibraryBook extends Model{
    coverId: number | null = null;
    title: string | null = null;
    authorName: string[] = [];
    isbn: string | null = null;

    public override parse(json: { [p: string]: any }) {
        super.parse(json);

        //special cases that I want to tidy up

        // @ts-ignore
        this.coverId = this['coverI'];
        // @ts-ignore
        delete this['coverI'];
    }

}

export class OpenLibraryResult extends Model{
    start: number | null = null;
    numberFound : number | null = null;
    docs: OpenLibraryBook[] = [];

    public override parse(json: { [p: string]: any }) {
        const docs: OpenLibraryBook[] = [];
        super.parse(json);
        if (json['docs'] != null) {
            for (let book of json['docs']) {
                let b = new OpenLibraryBook();

                b.parse(book);

                docs.push(b);
            }
        }

        this.docs = docs;

        // @ts-ignore
        if (this['numFound'] != null) {
            // @ts-ignore
            this.numberFound = this['numFound'];
            // @ts-ignore
            delete this['numFound'];
        }
    }
}
