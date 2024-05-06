
import { Component } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/products.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, Subscription, debounceTime, shareReplay } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardComponent,
    MatButtonModule,
    FormsModule,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();
  searchSubject = new Subject<string>();
  filteredProducts$: Observable<Product[]> = new Observable<Product[]>();
  private searchSubscription: Subscription = new Subscription();

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {
    this.loadProducts();
    this.filteredProducts$ = this.products$.pipe(shareReplay(1));
    this.searchSubscription = new Subscription();
  }

  ngOnInit() {
    this.initializeSearchSubscription();
  }

  loadProducts(): void {
    this.productsService.getAll().subscribe(products => {
      // Emite os produtos atualizados para todos os inscritos
      this.productsSubject.next(products);
    });
  }

  initializeSearchSubscription() {
    this.searchSubject.pipe(
      debounceTime(500)
    ).subscribe(searchTerm => {
      if (!searchTerm || searchTerm.length < 3) {
        this.filteredProducts$ = this.products$; // Show all products
      } else {
        this.filteredProducts$ = this.productsService.searchProducts(searchTerm);
      }
    });
  }

  onSearchTermChange(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;

    // Cancela qualquer subscrição existente antes de criar uma nova
    this.searchSubscription.unsubscribe();

    if (searchValue.length >= 3) {
      // Emite o valor para o searchSubject
      this.searchSubject.next(searchValue);
    } else if (searchValue.length === 0) {
      // Se o campo de pesquisa for limpo, exibe todos os produtos novamente
      this.filteredProducts$ = this.products$; // Show all products
    }

    // Cria uma nova subscrição com debounceTime
    this.searchSubscription = this.searchSubject.pipe(debounceTime(500)).subscribe();
  }

  handleOnEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

  handleOnDelete(product: Product) {
    this.productsService.delete(product.id).subscribe(() => {
      this.loadProducts();
    });
  }

  ngOnDestroy(): void {
    // Garante que a subscrição seja cancelada quando o componente for destruído
    this.searchSubscription.unsubscribe();
  }
}
