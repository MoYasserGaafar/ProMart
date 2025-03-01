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
  wishlistData: string[] = [];

  cancelSubscription: Subscription = new Subscription()

  constructor(
    private _ProductsService: ProductsService, 
    private token: AuthService,
  ) {
    this.token.saveUserData()
  }
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly toastr = inject(ToastrService)

  getProducts = () => {
    //this._ProductsService.getProducts().subscribe({ })
    this.cancelSubscription = this._ProductsService.getProducts().subscribe({

      next: (res) => {
        //console.log(response);
        
        this.allProducts = res.data;
        console.log(this.allProducts)
      }, 
      error: (err) => {
        console.log(err);
      } 
    });
  }

  addToCart = (productId: string) => {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        //this._CartService.cartCounter = res.numOfCartItems
        this._CartService.cartCounter.next(res.numOfCartItems) //BehaviorSubject

        console.log(res);
        this.toastr.success('Product added successfully to Cart', '', {
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
      },
      error: (err) => {
        console.log(err);
      }
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
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.cancelSubscription.unsubscribe()
  }
}