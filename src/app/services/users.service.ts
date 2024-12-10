import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResult } from '../models/api-result.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://randomuser.me/api';

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
}
