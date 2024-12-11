import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  skip,
  Subscription,
} from 'rxjs';
import { CONSTANTS } from '../../constants';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  usersService = inject(UsersService);

  CONSTANTS = CONSTANTS;
  searchSubscription!: Subscription;
  searchSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(
    CONSTANTS.EMPTY_STRING,
  );

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject$
      .asObservable()
      .pipe(
        debounceTime(CONSTANTS.SEARCH.DEBOUNCE_TIME),
        distinctUntilChanged(),
        skip(1),
      )
      .subscribe((query: string) => {
        this.usersService.updateSearchQuery(query);
      });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
