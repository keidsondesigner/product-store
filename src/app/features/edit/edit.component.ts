import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/products.interface';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  productsService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  // Pego os dados da rota;
  product: Product = inject(ActivatedRoute).snapshot.data['product'];
  router = inject(Router);

  onSubmit(product:  Omit<Product, 'id'>) {
    this.productsService.put(this.product.id, product).subscribe(() => {
      this.matSnackBar.open('Produto editado com sucesso!', 'Ok');
      this.router.navigate(['/']);
    })
  }
}
