import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent {
  cart: Cart = {} as Cart
  //Declares a property named <cart> of type <Cart>. It holds the current state of the user's cart.
  isLoading: boolean = true
  private readonly _CartService = inject(CartService)
  //Injects the <CartService> service into the component.
  private readonly toastr = inject(ToastrService)
  //Injects the <ToastrService> service into the component.

  getLoggedUserCart = () => {
    this._CartService.getLoggedUserCart().subscribe({
    //Calls the <getLoggedUserCart> method of the <_CartService> instance for making a network request to retrieve the logged user's cart data.
    //The result of the <getLoggedUserCart> method is an Observable, which is subscribed to using the subscribe method.
      next: (res) => {
        console.log(res);
        this.cart = res;
        this.isLoading = false
        //The <next> callback is called when the Observable emits a value. In this case, the emitted value is logged to the console. 
        //This could be used to update the component's state with the retrieved cart data.
        //Updates the <this.cart> property with the value of <res>.
        //<this.isLoading>: Used to indicate whether the component is currently loading data.
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false
        //The <error> callback is called if an error occurs during the network request. In this case, the error is logged to the console. 
        //This could be used to handle potential errors and display an appropriate message to the user.
      }
    })
  }

  deleteItem = (productId: string) => {
    this._CartService.removeItemFromCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        //this.getLoggedUserCart()

        this._CartService.cartCounter.next(res.numOfCartItems) //BehaviorSubject
        //By emitting a new value through the <next> method, any component subscribed to the <cartCounter> Observable will automatically receive the updated information.
        //By removing an item from the cart, the <cartCounter> Observable will automatically receive the updated information.
        
        this.cart = res;
        this.toastr.success('Product removed successfully from Cart', '', {
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000
        });
        //Method call that uses the toastr service to display a success notification.
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  clearCart = () => {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.cartCounter.next(0)
        this.toastr.success('Cart cleared successfully', '', {
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000
        });
        this.getLoggedUserCart()
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateQuantity = (productId: string, count: number) => {
    this._CartService.updateProductQuantity(productId,count).subscribe({
      next: (res) => {
        console.log(res);
        //this.getLoggedUserCart()
        this.cart = res;
        this.toastr.success('Product updated successfully', '', {
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  ngOnInit(): void {
    this.getLoggedUserCart()
    //Calls the <getLoggedUserCart> method to fetch the user's cart data when the component is initialized.
  }
}