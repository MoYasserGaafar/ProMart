import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'soldOut',
  standalone: true
})

export class SoldOutPipe implements PipeTransform {

  transform(quantity: number, limit:number): string | null {
    if (quantity > limit) {
      return null;
    } else {
      return `Only ${quantity} in the stock`;
    }
  }

}