import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardsComponent } from '../../components/cards/cards.component';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, CardsComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: string[] = [];
  selectedCategory: string = '';
  products: any[] = [];
  filteredProducts: any[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCategories();
    this.loadAllProducts();
  }

  loadCategories() {
    this.apiService.getcategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadAllProducts() {
    this.apiService.getproducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.filteredProducts = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    if (category === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
    }
  }

  formatCategoryName(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'electronics': 'fas fa-laptop',
      'jewelery': 'fas fa-gem',
      "men's clothing": 'fas fa-tshirt',
      "women's clothing": 'fas fa-female'
    };
    return icons[category.toLowerCase()] || 'fas fa-tag';
  }
}