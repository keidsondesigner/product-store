import { Component, EventEmitter, Output, computed, input } from '@angular/core';
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

  @Output() edit = new EventEmitter();

  // computed observa "product" e suas mudanças
  // Só fazer Get dos valores
  productTitle = computed(() => this.product().title);

  // onEdit() {
  //   this.edit.emit();
  // }
}
