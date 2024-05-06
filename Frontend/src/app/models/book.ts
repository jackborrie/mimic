import {Model} from "./model";
import {Tag} from "./tag";

export class Book extends Model {
    public id: number | null = null;
    public title: string | null = null;

    public tags: Tag[] = [];

    public override serialise(json: { [p: string]: any }) {
        super.serialise(json);

        console.log(json)
    }
}
