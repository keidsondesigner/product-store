import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<Product[]>('api/products');
  }

  // TODO: payload"product" é o que é enviado para o backend
  post(product: Omit<Product, 'id'>) {
    return this.httpClient.post('api/products', product);
  }
}
