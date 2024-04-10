export class StatusUser {
    id: string | undefined;
    username: string | undefined;
    email: string | undefined;
    roles: string[] | undefined;
}


export class Status {
    user: StatusUser | undefined;
}
