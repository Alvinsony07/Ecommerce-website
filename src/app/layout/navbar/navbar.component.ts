import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartItemCount = 0;
  isLoggedIn = false;
  userName = '';
  private cartSubscription?: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to cart changes to update the cart count in real-time
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = this.cartService.getTotalItemCount();
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  getCartItemCount(): number {
    return this.cartItemCount;
  }

  logout() {
    this.isLoggedIn = false;
    this.userName = '';
    // Add logout logic here
  }
}