import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { OrdersComponent } from './components/orders/orders.component';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DetailsComponent } from './components/details/details.component';
import { AddressComponent } from './components/address/address.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
    //Specifies the URL path for this route and the component to be loaded when the URL matches the path.
    {
        //path: 'auth', component: AuthLayoutComponent, 
        path: '',
        //Indicates that this route is the default route that will be loaded when no other route matches.
        //If the URL is just http://localhost:4200/, it redirects to the signin route.
        component: AuthLayoutComponent,
        canActivate: [isLoggedInGuard],

        children: [
            { path: '', redirectTo: 'signin', pathMatch: 'full' }, 
            //Indicates the default child route.
            { path: 'signin', component: SigninComponent, title: 'Sign In | ProMart' },
            { path: 'signup', component: SignupComponent, title: 'Sign Up | ProMart' },
            { path: 'forgotPassword', component: ForgotPasswordComponent, title: 'Forgot Password' }
        ]
    },

    {
        //path: 'main', component: MainLayoutComponent,
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        //Defines an array of guards that must pass before the route can be activated.
        //The <MainLayoutComponent> will be loaded for this route, but only if the <authGuard> returns true.

        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            //Indicates the default child route.
            { path: 'home', component: HomeComponent, title: 'Home | ProMart' },
            { path: 'cart', component: CartComponent, title: 'Cart | ProMart' },
            { path: 'products', component: ProductsComponent, title: 'Products | ProMart' },
            { path: 'product-details', component: ProductDetailsComponent, title: 'Product Details | ProMart' },
            { path: 'categories', component: CategoriesComponent, title: 'Categories | ProMart' },
            { path: 'brands', component: BrandsComponent, title: 'Brands | ProMart' },
            { path: 'orders', component: OrdersComponent, title: 'Orders | ProMart' },
            { path: 'wishlist', component: WishlistComponent, title: 'Wishlist | ProMart' },
            { path: 'details/:id', component: DetailsComponent, title: '' },
            { path: 'address/:id', component: AddressComponent, title: '' },
        ]
    },

    { path: '**', component: NotFoundComponent },
];
