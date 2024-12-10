import { Component } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-list-actions',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './list-actions.component.html',
  styleUrl: './list-actions.component.scss',
})
export class ListActionsComponent {}
