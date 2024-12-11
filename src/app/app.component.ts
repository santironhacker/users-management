import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { take } from 'rxjs';
import { ListActionsComponent } from './components/list-actions/list-actions.component';
import { LoaderTextComponent } from './components/loaders/loader-text/loader-text.component';
import { UserGroupComponent } from './components/user-group/user-group.component';
import { User } from './models/user.model';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserGroupComponent, ListActionsComponent, LoaderTextComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  usersService = inject(UsersService);

  allUsers: Signal<User[]> = computed(() => this.usersService.users());
  userGroups: Signal<Record<string, User[]>> = computed(() =>
    this.usersService.userGroups(),
  );
  isLoading: Signal<boolean> = computed(() => this.usersService.isLoading());

  ngOnInit(): void {
    this.usersService
      .getUsers()
      .pipe(take(1))
      .subscribe((_users: User[]) => {
        this.usersService.updateDisplayedUsers();
      });
  }
}
