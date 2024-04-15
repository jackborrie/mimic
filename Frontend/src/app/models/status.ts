export class StatusUser {
    id!: string;
    username!: string;
    email!: string;
    roles!: string[];
}


export class Status {
    user!: StatusUser;
}
