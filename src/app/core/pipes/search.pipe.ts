import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true
})

export class SearchPipe implements PipeTransform {

  transform(products: Product[], searchTerm: string) {
  //Implements the <transform> method, which is required by the <PipeTransform interface>.
  //The method includes two parameters, one represents an array of <Product> objects, and the other represents a string representing the search term.
    return products.filter((item) => item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
    //Filters the <products> array based on the <searchTerm> and checks if the <title> property of each <item> in the array includes the <searchTerm>.
    //The <filter> method returns a new array containing only the products that match the search term.
  }

}