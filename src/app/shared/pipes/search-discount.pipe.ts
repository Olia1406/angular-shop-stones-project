import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchDiscount'
})
export class SearchDiscountPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
