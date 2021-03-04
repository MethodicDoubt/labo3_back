import { Pipe, PipeTransform } from '@angular/core';
import { NbViewportRulerAdapter } from '@nebular/theme';
import { User } from '../models/user.model';

@Pipe({
  name: 'pipeAddress'
})
export class PipeAddressPipe implements PipeTransform {

  transform(user: User): string {
    return user.address.street + ' ' + user.address.number + ', ' + user.address.zip + ' ' + user.address.city;
  }

}
