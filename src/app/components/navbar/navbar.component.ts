import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';  
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule, NgClass, NgIf], 
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  private readonly _TranslationService = inject(TranslationService);
  readonly _TranslateService = inject(TranslateService);

  whishListCounter: number = 0;
  cartCounter: number = 0;
  isDarkMode: boolean = false;

  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _Router = inject(Router);
  private readonly _AuthService = inject(AuthService);

  get isAdminDashboard(): boolean {
    return this.router.url.includes('admin-dashboard');
  }

  getLoggedUserCart = () => {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this._CartService.cartCounter.next(res.numOfCartItems);
      }
    });
  };

  getLoggedUserWishlist = () => {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this._WishlistService.wishlistCounter.next(res.data.length);
      }
    });
  };

  selectLang(lang: string) {
    this._TranslationService.changeLang(lang);
  }

  logout(): void {
    this._AuthService.logout(); 
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('darkMode', this.isDarkMode ? 'enabled' : 'disabled');
  }

  ngOnInit(): void {
    this._TranslationService.changeDirection();

    this.getLoggedUserCart();
    this._CartService.cartCounter.subscribe({
      next: (counter) => {
        this.cartCounter = counter;
      }
    });

    this.getLoggedUserWishlist();
    this._WishlistService.wishlistCounter.subscribe({
      next: (counter) => {
        this.whishListCounter = counter;
      }
    });

    this.isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }
}