import {Model} from "./model";

export class Tag extends Model {

    public id: string | null = null;
    public text: string = '';
    public color: string = '';
    public icon: string = '';
    public iconPos: 'left' | 'right' = 'left';


}
