import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductsService } from '../../shared/services/products.service';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {

  productsService = inject(ProductsService);

  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  onSubmit() {
    console.log('Valor do form', this.form.value);
    console.log('Valor do input', this.form.controls.title.value);

    this.productsService.post({
      title: this.form.controls.title.value,
    }).subscribe(() => {
      alert('Produto criado com sucesso!');
      this.form.reset();
    })
  }
}
