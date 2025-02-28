import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'soldOut',
  standalone: true
})

export class SoldOutPipe implements PipeTransform {

  transform(quantity: number, limit:number): string | null {
  //Implements the <transform> method, which is required by the <PipeTransform interface>.
  //The method includes two parameters, one represents the current quantity of a product, and the other represents the maximum quantity allowed.
  //The method returns either a string or null value.
    if (quantity > limit) {
      return null;
      //If <quantity> is greater than <limit>, the pipe returns <null>.
    } else {
      return `Only ${quantity} in the stock`;
      //If <<quantity> is less than or equal to <limit>, the pipe returns a string indicating the remaining quantity.
    }
  }

}