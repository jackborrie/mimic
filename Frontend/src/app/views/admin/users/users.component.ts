import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
    protected products: any[] = [
        {username: 'test', email: 'test@test.com'},
        {username: 'test', email: 'test@test.com'},
        {username: 'test', email: 'test@test.com'},
        {username: 'test', email: 'test@test.com'},
        {username: 'test', email: 'test@test.com'}
    ]
}
