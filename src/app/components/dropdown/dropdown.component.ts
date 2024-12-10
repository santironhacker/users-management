import { Component } from '@angular/core';
import { GROUP_OPTIONS, GroupOption } from '../../models/group-options.model';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  groupOptions: GroupOption[] = GROUP_OPTIONS;
  onOptionSelected(event: Event): void {
    const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
    console.log('option', selectElement?.value);
  }
}
