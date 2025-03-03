import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../core/interfaces/user';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss'
})

export class AllUsersComponent {
  users: User[] = []

  private readonly _AuthService = inject(AuthService)

  ngOnInit(): void {
    this._AuthService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res.users;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}