import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/products.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products: Product[] = [];

  productsService = inject(ProductsService);
  router = inject(Router);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getAll().subscribe(products => {
      this.products = products;
    });
  }

  handleOnEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

  handleOnDelete(product: Product) {
    this.productsService.delete(product.id).subscribe(() => {
      // this.products = this.products.filter(p => p.id !== product.id);
      this.loadProducts();
    });
  }
}
