import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, CartItem } from './models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Load cart from localStorage on service initialization
    this.loadCartFromStorage();
  }

  // Add item to cart
  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      // If item already exists, update quantity
      existingItem.quantity += quantity;
    } else {
      // If item doesn't exist, add new item
      const cartItem: CartItem = {
        ...product,
        quantity: quantity
      };
      this.cartItems.push(cartItem);
    }
    
    this.updateCart();
  }

  // Remove item from cart completely
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCart();
  }

  // Update quantity of specific item
  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.updateCart();
      }
    }
  }

  // Increase quantity by 1
  increaseQuantity(productId: number): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity++;
      this.updateCart();
    }
  }

  // Decrease quantity by 1
  decreaseQuantity(productId: number): void {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.updateCart();
      } else {
        this.removeFromCart(productId);
      }
    }
  }

  // Check if item is in cart
  isInCart(productId: number): boolean {
    return this.cartItems.some(item => item.id === productId);
  }

  // Get quantity of specific item
  getItemQuantity(productId: number): number {
    const item = this.cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }

  // Get all cart items
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  // Get total number of items in cart
  getTotalItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Get total price of all items
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Clear entire cart
  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  // Private method to update cart and save to localStorage
  private updateCart(): void {
    this.cartItemsSubject.next([...this.cartItems]);
    this.saveCartToStorage();
  }

  // Save cart to localStorage with error handling
  private saveCartToStorage(): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
      }
    } catch (error) {
      console.warn('Could not save cart to localStorage:', error);
      // Fallback: continue with in-memory storage only
    }
  }

  // Load cart from localStorage with error handling
  private loadCartFromStorage(): void {
    try {
      if (typeof localStorage !== 'undefined') {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          this.cartItems = JSON.parse(savedCart);
          this.cartItemsSubject.next([...this.cartItems]);
        }
      }
    } catch (error) {
      console.warn('Could not load cart from localStorage:', error);
      this.cartItems = [];
    }
  }
}