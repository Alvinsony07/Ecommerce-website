import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { CardsComponent } from '../../components/cards/cards.component';
@Component({
  selector: 'app-home',
  imports:  [CardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  products: any;
 constructor(private apiService: ApiService) {
this.apiService.getproducts().subscribe((data) => {
this.products = data ;
});
}
}
