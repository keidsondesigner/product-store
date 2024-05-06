import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/products.interface';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [];

  constructor(private httpClient: HttpClient) {}


  getAll() {
    return this.httpClient.get<Product[]>('api/products');
  }

  getId(id: string) {
    console.log('getId', id);
    return this.httpClient.get<Product>(`api/products/${id}`);
  }

  // pesquisa produto por id ou por title
  searchProducts(searchTerm: string): Observable<Product[]> {
    return this.getAll().pipe(
      map(products => products.filter(product =>
        product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
  }

  // TODO: payload"product" é o que é enviado para o backend
  post(product: Omit<Product, 'id'>) {
    return this.httpClient.post('api/products', product);
  }

  put(id: string, product: Omit<Product, 'id'>) {
    return this.httpClient.put(`api/products/${id}`, product);
  }

  delete(id: string) {
    return this.httpClient.delete(`api/products/${id}`);
  }
}
