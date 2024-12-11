import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CONSTANTS } from '../../constants';
import { ScrollListDirective } from '../../directives/scroll-list.directive';
import { User } from '../../models/user.model';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, UserListComponent, ScrollListDirective],
  templateUrl: './user-group.component.html',
  styleUrl: './user-group.component.scss',
})
export class UserGroupComponent {
  userGroups = input.required<Record<string, User[]>>();
  filteredUsers = input.required<User[]>();

  groupsLength = computed(() => Object.keys(this.userGroups()).length);
  minNumber = CONSTANTS.LIST.DEFAULT_MIN_NUMBER;
  maxNumber = CONSTANTS.LIST.USER_GROUPS_ITEMS_PER_PAGE;
  itemsPerPage = CONSTANTS.LIST.USER_GROUPS_ITEMS_PER_PAGE;
}
