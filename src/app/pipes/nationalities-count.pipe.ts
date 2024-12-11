import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'nationalitiesCount',
  standalone: true,
  pure: true,
})
export class NationalitiesCountPipe implements PipeTransform {
  @memo()
  transform(allUsers: any[], userNat: string): number {
    if (!allUsers || !allUsers.length) {
      return 0;
    }

    return allUsers.reduce((acc, user) => {
      return user.nat === userNat ? acc + 1 : acc;
    }, 0);
  }
}
