import { Component } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-list-actions',
  standalone: true,
  imports: [DropdownComponent, SearchComponent],
  templateUrl: './list-actions.component.html',
  styleUrl: './list-actions.component.scss',
})
export class ListActionsComponent {}
