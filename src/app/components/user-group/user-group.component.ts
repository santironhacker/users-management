import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { User } from '../../models/user.model';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-group',
  standalone: true,
  imports: [CommonModule, UserListComponent],
  templateUrl: './user-group.component.html',
  styleUrl: './user-group.component.scss',
})
export class UserGroupComponent {
  userGroups = input.required<Record<string, User[]>>();
}
