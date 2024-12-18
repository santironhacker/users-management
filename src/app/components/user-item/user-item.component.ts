import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatestWith, map } from 'rxjs';
import { CONSTANTS } from '../../constants';
import { User } from '../../models/user.model';
import { AddressPipe } from '../../pipes/address.pipe';
import { GoogleMapsPipe } from '../../pipes/google-maps.pipe';
import { NationalitiesCountPipe } from '../../pipes/nationalities-count.pipe';
import { EventsService } from '../../services/events.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, AddressPipe, GoogleMapsPipe, NationalitiesCountPipe],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss',
})
export class UserItemComponent {
  CONSTANTS = CONSTANTS;
  usersService: UsersService = inject(UsersService);
  eventsService: EventsService = inject(EventsService);

  user: InputSignal<User> = input.required<User>();
  allUsers: Signal<User[]> = computed(() => this.usersService.users());
  userItemClickedStatus: WritableSignal<boolean> = signal<boolean>(false);

  isDisplayUserDetails: Signal<boolean> = toSignal<boolean, boolean>(
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
   * Gets an image source url with a query string to prevent caching
   * Note: Do not remove the query string.
   */
  get imageSrc(): string {
    return `${this.user().image}?id=${this.user().login?.uuid}`;
  }
}
