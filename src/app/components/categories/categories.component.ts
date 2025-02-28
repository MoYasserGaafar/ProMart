import { Component, OnInit } from '@angular/core';
import { Category } from '../../core/interfaces/category';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})

export class CategoriesComponent implements OnInit {
  allCategories: Category[] = [];
  //Declares a property named <allCategories> and its type is an array of <Brand> objects.
  constructor(private _CategoriesService:CategoriesService) {}
  //Component's constructor which gets called when the component is created.
  //Injects a <CategoriesService> service using dependency injection, and it has a private access.

  getCategories = () => {
  //Defines <getCategories> method using an arrow function syntax, and the function doesn't take any arguments.
    this._CategoriesService.getCategories().subscribe({
    //Calls <getBrands> method on the injected <_CategoriesService>, makes an API call, and subscribe to the observable returned by the <getCategories> service method.
      next: (res) => {
      //Defines a callback function for the <next> event emitted by the observable which receives a response from the service call.
        this.allCategories = res.data;
        //Assigns the data retrieved from the response to the <allCategories> property of the component.
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
    this.getCategories();
    //Calls the <getCategories> method to retrieve the list of brands when the component is initialized.
  }
}