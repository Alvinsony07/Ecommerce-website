import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { CartService } from '../../cart.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  product: Product | null = null;
  quantity: number = 1;
  isAddingToCart: boolean = false;
  
  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.apiService.getproductsbyid(id).subscribe((data: any) => {
      this.product = data as Product;
    });
  }

  addToCart(): void {
    if (this.product) {
      this.isAddingToCart = true;
      
      // Simulate a small delay for better UX
      setTimeout(() => {
        this.cartService.addToCart(this.product!, this.quantity);
        this.isAddingToCart = false;
        
        // Show success feedback (you can replace with a toast notification)
        alert(`${this.quantity} x ${this.product!.title} added to cart successfully!`);
      }, 500);
    }
  }

  buyNow(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.router.navigate(['/cart']);
    }
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  isInCart(): boolean {
    return this.product ? this.cartService.isInCart(this.product.id) : false;
  }

  getCartQuantity(): number {
    return this.product ? this.cartService.getItemQuantity(this.product.id) : 0;
  }
}