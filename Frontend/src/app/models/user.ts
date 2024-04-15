import {Role} from './role';
import {Model} from './model';

export class User extends Model {
    id: string | undefined;
    username: string | undefined;
    email: string | undefined;
    roles: Role[] | undefined;
}
