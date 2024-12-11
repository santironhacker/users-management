import { Component, inject } from '@angular/core';
import { GROUP_OPTIONS, GroupOption } from '../../models/group-options.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  usersService = inject(UsersService);

  groupOptions: GroupOption[] = GROUP_OPTIONS;

  onOptionSelected(event: Event): void {
    const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
    this.usersService.updateGroupingCriterion(selectElement?.value);
  }
}
