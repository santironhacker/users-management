import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { take } from 'rxjs';
import { ListActionsComponent } from './components/list-actions/list-actions.component';
import { UserGroupComponent } from './components/user-group/user-group.component';
import { User } from './models/user.model';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserGroupComponent, ListActionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  usersService = inject(UsersService);

  users: User[] = [];
  userGroups: Signal<Record<string, User[]>> = computed(() =>
    this.usersService.userGroups(),
  );

  ngOnInit(): void {
    this.usersService
      .getUsers()
      .pipe(take(1))
      .subscribe((_users: User[]) => {
        this.usersService.updateDisplayedUsers();
      });
  }
}
