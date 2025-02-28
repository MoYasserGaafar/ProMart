import { Component, OnInit } from '@angular/core';
import { Brand } from '../../core/interfaces/brand';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})

export class BrandsComponent implements OnInit {
  allBrands: Brand[] = [];
  //Declares a property named <allBrands> and its type is an array of <Brand> objects.
  constructor(private _BrandsService:BrandsService) {}
  //Component's constructor which gets called when the component is created.
  //Injects a <BrandsService> service using dependency injection, and it has a private access.

  getBrands = () => {
  //Defines <getBrands> method using an arrow function syntax, and the function doesn't take any arguments.
    this._BrandsService.getBrands().subscribe({
    //Calls <getBrands> method on the injected <_BrandsService>, makes an API call, and subscribe to the observable returned by the <getBrands> service method.
      next: (res) => {
      //Defines a callback function for the <next> event emitted by the observable which receives a response from the service call.
        this.allBrands = res.data;
        //Assigns the data retrieved from the response to the <allBrands> property of the component.
      },
      error: (err) => {
      //Defines a callback function for the <error> event emitted by the observable in case of an error which receives an error object.
        console.log(err);
        //Logs the error to the console for debugging purposes.
      }
    })
  }

  ngOnInit(): void {
  //Defines the <ngOnInit> lifecycle hook method that is called after the component is initialized.
    this.getBrands();
    //Calls the <getBrands> method to retrieve the list of brands when the component is initialized.
  }
}