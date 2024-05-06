import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  // Com Signals
  // product = input.required<Product>();

  @Input() product: Product = {
    id: '',
    title: '',
  };



  // Signals "computed" observa "product" e suas mudanças
  // Só fazer Get dos valores
  // productTitle = computed(() => this.product().title);

  // onEditEvent() {
  //   this.edit.emit();
  // }
}
