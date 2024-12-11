import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'address',
  standalone: true,
})
export class AddressPipe implements PipeTransform {
  transform(user: User, ...args: unknown[]): unknown {
    return `${user.location?.street.number}, ${user.location?.street.name}, ${user.location?.postcode}, ${user.location?.city}, ${user.location?.country}`;
  }
}
