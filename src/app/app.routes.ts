import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {  
        path: 'categories',
        component: CategoriesComponent
    },
    {
        path: 'product/:id',
        component: ProductPageComponent
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];