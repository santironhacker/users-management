import { HttpClient } from '@angular/common/http';
import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CONSTANTS } from '../constants';
import { ApiResult } from '../models/api-result.model';
import { DEFAULT_GROUP_OPTION_KEY } from '../models/group-options.model';
import { User } from '../models/user.model';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private groupingCriterion: WritableSignal<string> = signal<string>(
    DEFAULT_GROUP_OPTION_KEY,
  );
  private searchQuery: WritableSignal<string> = signal<string>(
    CONSTANTS.EMPTY_STRING,
  );
  users = toSignal<User[], User[]>(this.getUsers(), {
    initialValue: [] as User[],
  });
  userGroups: WritableSignal<Record<string, User[]>> = signal({});
  isLoading: WritableSignal<boolean> = signal(true);

  filteredUsers: Signal<User[]> = computed(() => {
    const query: string = this.searchQuery();
    const users: User[] = this.users();

    if (!query) return users;

    return users.filter(
      (user: User) =>
        user.firstname?.toLowerCase().includes(query.toLowerCase()) ||
        user.lastname?.toLowerCase().includes(query.toLowerCase()),
    );
  });

  constructor(
    private httpClient: HttpClient,
    private eventsService: EventsService,
  ) {}

  /**
   * Fetches 5000 mock users from the api
   * @param {number} page
   * @returns {Observable<User[]>}
   */
  getUsers(page = 1): Observable<User[]> {
    let fetchingUrl = this.httpClient.get<ApiResult>(
      `${environment.apiUrl}?results=5000&seed=awork&page=${page}`,
    );
    if (!environment.production) {
      fetchingUrl = this.httpClient.get<ApiResult>(environment.apiUrl);
    }
    return fetchingUrl.pipe(
      map((apiResult) => User.mapFromUserResult(apiResult.results)),
      finalize(() => {
        this.updateDisplayedUsers();
      }),
    );
  }

  updateGroupingCriterion(criterion: string): void {
    this.groupingCriterion.set(criterion);
    this.updateDisplayedUsers();
  }

  updateSearchQuery(query: string): void {
    this.searchQuery.set(query);
    this.updateDisplayedUsers();
  }

  groupUsers(): Promise<Record<string, User[]>> {
    const users: User[] = this.filteredUsers();
    const criterion: string = this.groupingCriterion();

    return new Promise((resolve, reject) => {
      const worker: Worker = new Worker(
        new URL('../group-users.worker.ts', import.meta.url),
      );

      worker.onmessage = ({ data }) => {
        resolve(data);
        worker.terminate();
      };

      worker.onerror = (error) => {
        reject(error);
        worker.terminate();
      };

      worker.postMessage({ users, criterion });
    });
  }

  private updateDisplayedUsers(): void {
    this.isLoading.set(true);
    this.groupUsers().then((groups) => {
      if (!environment.production) {
        console.log('[users.component.ts] userGroups', groups);
      }
      this.userGroups.set(groups);
      this.eventsService.triggerGroupButtonClick();
      this.isLoading.set(false);
    });
  }
}
