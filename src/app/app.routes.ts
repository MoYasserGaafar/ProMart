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
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';

export const routes: Routes = [
    {
        //path: 'auth', component: AuthLayoutComponent, 
        path: '',
        //Indicates that this route is the default route that will be loaded when no other route matches.
        //If the URL is just http://localhost:4200/, it redirects to the signin route.
        component: AuthLayoutComponent,
        canActivate: [isLoggedInGuard],

        children: [
            { path: '', redirectTo: 'signin', pathMatch: 'full' }, 
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

        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'admin-dashboard', component: AdminDashboardComponent, title: 'Admin Dashboard | ProMart' },
            { path: 'home', component: HomeComponent, title: 'Home | ProMart' },
            { path: 'products', component: ProductsComponent, title: 'Products | ProMart' },
            { path: 'product-details', component: ProductDetailsComponent, title: 'Product Details | ProMart' },
            { path: 'details/:id', component: DetailsComponent, title: 'Product Details | ProMart' },
            { path: 'categories', component: CategoriesComponent, title: 'Categories | ProMart' },
            { path: 'brands', component: BrandsComponent, title: 'Brands | ProMart' },
            { path: 'wishlist', component: WishlistComponent, title: 'Wishlist | ProMart' },
            { path: 'cart', component: CartComponent, title: 'Cart | ProMart' },
            { path: 'orders', component: OrdersComponent, title: 'Orders | ProMart' },
            { path: 'address/:id', component: AddressComponent, title: '' },
            { path: 'admin-dashboard', component: AdminDashboardComponent, title: 'Admin Dashboard | ProMart' }, //Admin Dashboard
            { path: 'admin-dashboard/all-users', component: AllUsersComponent, title: 'All Users | ProMart' }, //Admin Dashboard
            { path: 'admin-dashboard/all-orders', component: AllOrdersComponent, title: 'All Orders | ProMart' }, //Admin Dashboard
        ]
    },

    { path: '**', component: NotFoundComponent },
];