import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent {
  product!: Product
  //Declares a public property named <product> of type <Product>, which is an an interface representing a product object. 
  //<!>: Indicates that the property is initialized to undefined but will be assigned a value later, preventing potential errors due to its initial undefined state.
  private readonly _ProductsService = inject(ProductsService)
  //Injects the <ProductsService> service into the component.
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  //Injects the <ActivatedRoute> service into the component.
  //<ActivatedRoute>: Provides information about the current route, including its parameters.

  ngOnInit(): void {
    //Defines the <ngOnInit> lifecycle hook method of the component which is automatically called when the component is initialized.
    let id: string | null = ""

    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Adds smooth scrolling for a better user experience (optional).
    });
    
    //Declares a local variable named <id>  initialized to an empty string, and it will store the product ID retrieved from the route parameter.
    this._ActivatedRoute.paramMap.subscribe({
    //Subscribes to the <paramMap> observable of the <ActivatedRoute> service which emits the route parameters whenever they change.
      next: (param) => {
      //Defines a callback function that will be executed when the paramMap observable emits a new value.
        //console.log(param.get('id'));
        //<id> parameter: Used to fetch the specific product or item data from a service or database, which would then be displayed in the component's template.
        id = param.get('id')
        //Retrieves the value of the <id> parameter from the route parameters <param> and assigns it to the <id> variable.
      }
    })

    this._ProductsService.getProduct(id).subscribe({
    //Calls the <getProduct> method of the injected <ProductsService>, passing the retrieved id as an argument, that fetches product data based on the ID.
    //Subscribes to the observable returned by the <getProduct> method.
      next: (res) => {
        console.log(res.data);
        this.product = res.data
        //Assigns the product data <res.data> to the component's product property which will be used to display product information in the component's template.
      }
    })
  }

  //console.log(this._ActivatedRoute.snapshot.params['id']);
  //Accesses the current snapshot of the <ActivatedRoute> service, which provides information about the current route, then gets the parameters associated with the current route, and accesses the value of the parameter named <id>.
}