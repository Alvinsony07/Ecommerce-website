import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../cart.service';
import { CartItem } from '../../models/product.interface';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalItems: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
    
    // Subscribe to cart changes
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totalPrice = this.cartService.getTotalPrice();
    this.totalItems = this.cartService.getTotalItemCount();
  }

  increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  removeItem(productId: number): void {
    if (confirm('Are you sure you want to remove this item from cart?')) {
      this.cartService.removeFromCart(productId);
    }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      this.cartService.clearCart();
    }
  }

  proceedToCheckout(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // Add your checkout logic here
    alert('Proceeding to checkout...');
    // Example: this.router.navigate(['/checkout']);
  }
}