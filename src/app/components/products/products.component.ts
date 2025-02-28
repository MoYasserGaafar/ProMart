import { DatePipe, CurrencyPipe, UpperCasePipe, LowerCasePipe, TitleCasePipe, SlicePipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { SoldOutPipe } from '../../core/pipes/sold-out.pipe';
import { Product } from '../../core/interfaces/product';
import { ProductsService } from '../../core/services/products.service';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, FormsModule, NgxSpinnerModule,
    DatePipe, CurrencyPipe, UpperCasePipe, TitleCasePipe, SoldOutPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent {
  productId: string = ""
  allProducts: Product[] = [];
  //Indicates that <allProducts> of type <Product[]> is an array of objects that conform to the Product interface.
  wishlistData: string[] = [];

  cancelSubscription: Subscription = new Subscription()
  //Declares a Subscription object that will be used to manage the lifecycle of an Observable subscription.

  constructor(
    private _ProductsService: ProductsService, 
    //Injects the <ProductsService> into the component to fetch product data from an API.
    private token: AuthService,
    //Injects the <AuthService> into the component to handle user authentication and token management.
    //private spinner: NgxSpinnerService
    //Injects the <NgxSpinnerService> into the component to display a loading spinner while data is being fetched.
  ) {
    this.token.saveUserData()
    //Calls the <saveUserData> method on the injected <AuthService> instance.
  }
  private readonly _CartService = inject(CartService)
  //Injects the <CartService> service into the component.
  //<readonly: keyword: Indicates that the value of this property cannot be modified after it's initialized.
  private readonly _WishlistService = inject(WishlistService)
  //Injects the <WishlistService> service into the component.
  private readonly toastr = inject(ToastrService)
  //Injects the <ToastrService> service into the component.

  getProducts = () => {
    //<getProducts>: Method that uses the injected <_ProductsService> to fetch product data.
    //this.spinner.show('main-spinner')
    //Calls the <show> method on the injected <NgxSpinnerService> to display a loading indicator to the user while the data is being fetched.

    //this._ProductsService.getProducts().subscribe({ })
    this.cancelSubscription = this._ProductsService.getProducts().subscribe({
      //Calls the <getProducts> method on the injected <_ProductsService>.
      //Subscribes to the observable returned by <getProducts> to handle the response.
      //<this.cancelSubscription>: This assigns the result of the following operation to the cancelSubscription property.

      next: (res) => {
        //console.log(response);
        
        this.allProducts = res.data;
        console.log(this.allProducts)
        //Updates the <allProducts> property of the component with the data extracted from the response.
        //this.spinner.hide('main-spinner')
        //calls the <hide> method on the injected <NgxSpinnerService> to hide the loading indicator after the data has been fetched successfully.
      }, //Defines a callback function to handle the successful response.
      error: (err) => {
        console.log(err);
      } //Defines a callback function to handle an error response.
    });
  }

  /*
  navigateProductDetails = (product: Product) => {
    console.log(product)
    this._Router.navigate([`/details/${product._id}`])
  }
  */

  addToCart = (productId: string) => {
    this._CartService.addProductToCart(productId).subscribe({
    //Calls the <addProductToCart> method of the <_CartService> instance and passes the <productId> argument to the method.
    //The result of the <addProductToCart> method is an Observable, which is subscribed to using the subscribe method.
      next: (res) => {
        //this._CartService.cartCounter = res.numOfCartItems
        //Updates the <cartCounter> property of the <_CartService> with the number of items in the <cart> as returned by the server response.
        this._CartService.cartCounter.next(res.numOfCartItems) //BehaviorSubject
        //By emitting a new value through the <next> method, any component subscribed to the <cartCounter> Observable will automatically receive the updated information.

        console.log(res);
        this.toastr.success('Product added successfully to Cart', '', {
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000
        });
        //Method call that uses the toastr service to display a success notification.
      },
      //The <next> callback is called when the Observable emits a value. In this case, the emitted value is logged to the console. 
      //This could be used to handle the successful addition of the product to the cart.
      error: (err) => {
        console.log(err);
      }
      //The <error> callback is called if an error occurs. In this case, the error is logged to the console. 
      //This could be used to handle potential errors during the process of adding the product to the cart.
    })
  }

  addToWishlist = (productId: string) => {
    //console.log("product_id", productId)
    this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        this._WishlistService.wishlistCounter.next(res.data.length) //BehaviorSubject

        console.log(res);
        this.wishlistData = res.data
        this.toastr.success('Product added successfully to Wishlist', '', {
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000
        });
        //Method call that uses the toastr service to display a success notification.
      },
      //The <next> callback is called when the Observable emits a value. In this case, the emitted value is logged to the console. 
      //This could be used to handle the successful addition of the product to the cart.
      error: (err) => {
        console.log(err);
      }
      //The <error> callback is called if an error occurs. In this case, the error is logged to the console. 
      //This could be used to handle potential errors during the process of adding the product to the cart.
    })
  }

  removeFromWishlist = (productId: string) => {
    this._WishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        this._WishlistService.wishlistCounter.next(res.data.length) //BehaviorSubject

        console.log(res);
        this.wishlistData = res.data
        this.toastr.success('Product removed successfully from Wishlist', '', {
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000
        });
        //Method call that uses the toastr service to display a success notification.
      },
      //The <next> callback is called when the Observable emits a value. In this case, the emitted value is logged to the console. 
      //This could be used to handle the successful addition of the product to the cart.
      error: (err) => {
        console.log(err);
      }
      //The <error> callback is called if an error occurs. In this case, the error is logged to the console. 
      //This could be used to handle potential errors during the process of adding the product to the cart.
    })
  }
  
  ngOnInit(): void {
  //Implements the <ngOnInit> lifecycle hook.
    this.getProducts();
    //Calls the <getProducts> method to fetch product data when the component is initialized.
  }

  ngOnDestroy(): void {
  //Declares the <ngOnDestroy> lifecycle hook.
    this.cancelSubscription.unsubscribe()
    //Unsubscribes from an Observable when the component is about to be destroyed.
  }
}