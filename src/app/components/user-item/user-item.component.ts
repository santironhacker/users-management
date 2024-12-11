import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatestWith, map } from 'rxjs';
import { User } from '../../models/user.model';
import { AddressPipe } from '../../pipes/address.pipe';
import { GoogleMapsPipe } from '../../pipes/google-maps.pipe';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [CommonModule, AddressPipe, GoogleMapsPipe],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss',
})
export class UserItemComponent {
  eventsService = inject(EventsService);

  user = input.required<User>();
  allUsers = input.required<User[]>();
  userItemClickedStatus: WritableSignal<boolean> = signal<boolean>(false);

  isDisplayUserDetails = toSignal<boolean, boolean>(
    this.eventsService.groupButtonClicked$.pipe(
      combineLatestWith(toObservable(this.userItemClickedStatus)),
      map(([groupButtonClicked, userClickStatus]) => {
        return groupButtonClicked || userClickStatus;
      }),
    ),
    {
      initialValue: false,
    },
  );

  handleClickUser(): void {
    this.userItemClickedStatus.update((status) => !status);
  }

  /**
   * Get the count of users with same nationality
   */
  get nationalitiesCount(): number {
    if (!this.allUsers().length) {
      return 0;
    }

    return this.allUsers().reduce((acc, user) => {
      return user.nat === this.user().nat ? acc + 1 : acc;
    }, 0);
  }
}
