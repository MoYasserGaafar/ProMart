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
  wishlistData: string[] = []
  isLoading: boolean = true
  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly toastr = inject(ToastrService)

  getLoggedUserWishlist = () => {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlist = res;
        this.isLoading = false
        this.wishlistData = res.data.map((product: any) => product._id)
      },
      complete: () => {
        this.isLoading = false
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false
      }
    })
  }

  removeItem(productId: string) {
    this._WishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        this.getLoggedUserWishlist();
        this._WishlistService.wishlistCounter.next(res.data.length);
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
  }
}