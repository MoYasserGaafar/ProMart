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
  isLoading: boolean = true
  private readonly _CartService = inject(CartService)
  private readonly toastr = inject(ToastrService)

  getLoggedUserCart = () => {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cart = res;
        this.isLoading = false
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false
      }
    })
  }

  deleteItem = (productId: string) => {
    this._CartService.removeItemFromCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        //this.getLoggedUserCart()

        this._CartService.cartCounter.next(res.numOfCartItems) //BehaviorSubject
        
        this.cart = res;
        this.toastr.success('Product removed successfully from Cart', '', {
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
  }
}