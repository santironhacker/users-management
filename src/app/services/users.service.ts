import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResult } from '../models/api-result.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://randomuser.me/api';
  private users = toSignal<User[], User[]>(this.getUsers(), {
    initialValue: [] as User[],
  });
  private groupingCriterion = signal<string | null>(null);
  userGroups: WritableSignal<Record<string, User[]>> = signal({});

  constructor(private httpClient: HttpClient) {}

  /**
   * Fetches 5000 mock users from the api
   * @param {number} page
   * @returns {Observable<User[]>}
   */
  getUsers(page = 1): Observable<User[]> {
    let fetchingUrl = this.httpClient.get<ApiResult>(
      `${this.apiUrl}?results=10&seed=awork&page=${page}`,
    );
    if (!environment.production) {
      fetchingUrl = this.httpClient.get<ApiResult>('testing/users-data.json');
    }
    return fetchingUrl.pipe(
      map((apiResult) =>
        User.mapFromUserResult(apiResult.results).slice(0, 100),
      ),
    );
  }

  updateSearchQuery(query: string): void {
    this.groupingCriterion.set(query);
    this.updateDisplayedUsers();
  }

  groupUsers(): Promise<Record<string, User[]>> {
    const users = this.users();
    const criterion = this.groupingCriterion();

    return new Promise((resolve, reject) => {
      const worker = new Worker(
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

  updateDisplayedUsers(): void {
    this.groupUsers().then((groups) => {
      console.log('[users.component.ts] userGroups', groups);
      this.userGroups.set(groups);
    });
  }
}
