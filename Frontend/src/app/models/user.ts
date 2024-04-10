import {Role} from './role';

export class User {
    id: string | undefined;
    username: string | undefined;
    email: string | undefined;
    roles: Role[] | undefined;
}
