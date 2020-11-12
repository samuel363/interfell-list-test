import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseDate'
})
export class ParseDatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const d = new Date(value);

    return [d.getMonth() + 1,
      d.getDate(),
      d.getFullYear()].join('/') + ' ' +
     [d.getHours(),
      d.getMinutes(),
      d.getSeconds()].join(':');
  }

}
