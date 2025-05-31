import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-cards',
  imports: [RouterLink],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
goToProduct(_t3: any) {
throw new Error('Method not implemented.');
}
@Input () product: any;
}
