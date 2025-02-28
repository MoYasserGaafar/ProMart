import { Component, inject } from '@angular/core';
import { Wishlist } from '../../core/interfaces/wishlist';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  wishlist: Wishlist = {} as Wishlist
  //Declares a property named <wishlist> of type <Wishlist>. It holds the current state of the user's wishlist.
  wishlistData: string[] = []
  isLoading: boolean = true
  private readonly _WishlistService = inject(WishlistService)
  //Injects the <WishlistService> service into the component.
  private readonly _CartService = inject(CartService)
  //Injects the <CartService> service into the component.
  private readonly toastr = inject(ToastrService)
  //Injects the <ToastrService> service into the component.

  getLoggedUserWishlist = () => {
    this._WishlistService.getLoggedUserWishlist().subscribe({
    //Calls the <getLoggedUserWishlist> method of the <_WishlistService> instance for making a network request to retrieve the logged user's cart data.
    //The result of the <getLoggedUserWishlist> method is an Observable, which is subscribed to using the subscribe method.
      next: (res) => {
        console.log(res);
        this.wishlist = res;
        this.isLoading = false
        //The <next> callback is called when the Observable emits a value. In this case, the emitted value is logged to the console. 
        //This could be used to update the component's state with the retrieved cart data.
        //Updates the <this.wishlist> property with the value of <res>.
        //<this.isLoading>: Used to indicate whether the component is currently loading data.
        this.wishlistData = res.data.map((product: any) => product._id)
      },
      complete: () => {
        this.isLoading = false
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false
        //The <error> callback is called if an error occurs during the network request. In this case, the error is logged to the console. 
        //This could be used to handle potential errors and display an appropriate message to the user.
      }
    })
  }

  removeItem(productId: string) {
    this._WishlistService.removeProductFromWishlist(productId).subscribe({
    //Calls a method on <_WishlistService> to remove a product from the wishlist using the provided <productId>.
      next: (res) => {
        this.getLoggedUserWishlist();
        this._WishlistService.wishlistCounter.next(res.data.length);
        //Updates a counter variable <MwishlistCounter> on the <_WishlistService> with the new length of the wishlist after removal extracted from <res.data>.
        this.toastr.success('Product removed successfully from Wishlist', '', {
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000
        });
      }
    });
  }

  addProductToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {

        this._CartService.cartCounter.next(res.numOfCartItems);
        this.toastr.success('Product added successfully to Cart', '', {
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000
        });
      }
    });
  }

  ngOnInit(): void {
    this.getLoggedUserWishlist()
    //Calls the <getLoggedUserCart> method to fetch the user's cart data when the component is initialized.
  }
}