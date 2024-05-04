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

  getId(id: string) {
    console.log('getId', id);
    return this.httpClient.get<Product>(`api/products/${id}`);
  }

  // TODO: payload"product" é o que é enviado para o backend
  post(product: Omit<Product, 'id'>) {
    return this.httpClient.post('api/products', product);
  }

  put(id: string, product: Omit<Product, 'id'>) {
    return this.httpClient.put(`api/products/${id}`, product);
  }
}
