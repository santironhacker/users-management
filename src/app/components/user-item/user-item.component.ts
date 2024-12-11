import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  /**
   * Gets an image source url with a query string to prevent caching
   * Note: Do not remove the query string.
   */
  get imageSrc(): string {
    return `${this.user().image}?id=${this.user().login?.uuid}`;
  }
}
