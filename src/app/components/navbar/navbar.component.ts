import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  constructor(private router: Router) {}
  
  private readonly _TranslationService = inject(TranslationService)
  //Injects the <TranslationService> service into the current class and stores it in a private and readonly property named <_TranslationService>.
  readonly _TranslateService = inject(TranslateService)
  //Injects the <TranslateService> and stores it in a read-only property.

  whishListCounter: number = 0
  cartCounter: number = 0

  //Declares a public property named <counter> and initializes it to <0>. It is likely used to display the number of items in the cart.
  private readonly _CartService = inject(CartService)
  //Injects the <CartService> into a private read-only property named <_CartService>.
  private readonly _WishlistService = inject(WishlistService)
  //Injects the <CartService> into a private read-only property named <_CartService>.
  private readonly _Router = inject(Router)
  private readonly _AuthService = inject(AuthService)
  
  get isAdminDashboard(): boolean {
    return this.router.url.includes('admin-dashboard');
  }

  //Get Cart counter when relaoding Home page
  getLoggedUserCart = () => {
    this._CartService.getLoggedUserCart().subscribe({
    //Calls the <getLoggedUserCart> method of the <_CartService> instance for making a network request to retrieve the logged user's cart data.
    //The result of the <getLoggedUserCart> method is an Observable, which is subscribed to using the subscribe method.
      next: (res) => {
        this._CartService.cartCounter.next(res.numOfCartItems)
        //Updates a property called <cartCounter> within the service named <_CartService>. It uses the <next> method on the counter object, passing the number of cart items extracted from the response.
      }
    })
  }

  getLoggedUserWishlist = () => {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this._WishlistService.wishlistCounter.next(res.data.length)
      }
    })
  }

  selectLang(lang: string) {
  //Declares a public method named <selectLang> that takes a string parameter named <lang> to handle language selection.
    this._TranslationService.changeLang(lang)
    //Calls the <changeLang> method on the injected <TranslationService>, passing the selected language <lang> as an argument. 
    //This method is responsible for setting the current language and triggering a re-translation of the UI.
  }

  logout(): void {
    this._AuthService.logout(); // Perform logout logic 
  }

  ngOnInit(): void {
    this._TranslationService.changeDirection()
    //Calls the <changeDirection> method on the injected <TranslationService>.

    this.getLoggedUserCart()
    //this.counter = this._CartService.cartCounter
    //Assigns the <cartCounter> value from the injected <CartService> to the component's counter property.
    this._CartService.cartCounter.subscribe({
    //Subscribes to the <cartCounter> Observable, which is an Observable of the number of items in the cart.
      next: (counter) => {
      //Defines the <next> callback function, which is called whenever the <cartCounter> Observable emits a new value.
        this.cartCounter = counter
      }
    }) //BehaviorSubject

    this.getLoggedUserWishlist()
    this._WishlistService.wishlistCounter.subscribe({
      //Subscribes to the <cartCounter> Observable, which is an Observable of the number of items in the cart.
        next: (counter) => {
        //Defines the <next> callback function, which is called whenever the <cartCounter> Observable emits a new value.
          this.whishListCounter = counter
        }
      }) //BehaviorSubject
  }
}