import { Component, computed, input } from '@angular/core';
import { CONSTANTS } from '../../constants';
import { ScrollListDirective } from '../../directives/scroll-list.directive';
import { User } from '../../models/user.model';
import { UserItemComponent } from '../user-item/user-item.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  imports: [UserItemComponent, ScrollListDirective],
})
export class UserListComponent {
  users = input.required<User[]>();

  usersLength = computed(() => Object.keys(this.users()).length);
  minNumber = CONSTANTS.LIST.DEFAULT_MIN_NUMBER;
  maxNumber = CONSTANTS.LIST.USERS_ITEMS_PER_PAGE;
  itemsPerPage = CONSTANTS.LIST.USERS_ITEMS_PER_PAGE;
}
