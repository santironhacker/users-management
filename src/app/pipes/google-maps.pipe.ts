import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'googleMaps',
  standalone: true,
})
export class GoogleMapsPipe implements PipeTransform {
  transform(user: User, ...args: unknown[]): unknown {
    return `https://maps.google.com/?q=${user.location?.coordinates.latitude},${user.location?.coordinates.longitude}`;
  }
}
