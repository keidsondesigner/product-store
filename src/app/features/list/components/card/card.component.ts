import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../../shared/interfaces/products.interface';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ MatCardModule, MatButtonModule ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  product = input.required<Product>();

  productTitle = computed(() => this.product().title);
  // computed  oberva "product", e suas mudanças, só posso fazer get dos valores;
}
