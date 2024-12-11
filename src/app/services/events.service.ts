import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private groupButtonClickedSource = new BehaviorSubject<boolean>(false);
  groupButtonClicked$ = this.groupButtonClickedSource.asObservable();

  triggerGroupButtonClick(): void {
    this.groupButtonClickedSource.next(true);
  }

  resetGroupButtonClick(): void {
    this.groupButtonClickedSource.next(false);
  }
}
