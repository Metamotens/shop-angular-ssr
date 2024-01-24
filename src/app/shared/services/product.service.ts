import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Product } from '../models/product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment.development';
import { tap } from 'rxjs';

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly http = inject(HttpClient);

  private state = signal<ProductState>({
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
  });

  products = computed(() => this.state().products);
  selectedProduct = computed(() => this.state().selectedProduct);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  getProducts(): void {
    this.http.get<Product[]>(`${environment.apiUrl}/products`)
      .pipe(
        tap(() => {
          this.state.update((state) => ({ ...state, loading: true }))
          console.info(`Loading products`)
        }))
      .subscribe({
        next: (products: Product[]) => { this.state.update((state) => ({ ...state, products, loading: false })) },
        error: (error) => { this.state.update((state) => ({ ...state, loading: false, error })) },
        complete: () => { console.info(`Products loaded: ${this.products().length}`) }
      })
  }

  getProduct(id: number): void {
    this.http.get<Product>(`${environment.apiUrl}/products/${id}`).pipe(
      tap(() => {
        this.state.update((state) => ({ ...state, loading: true }))
        console.info(`Loading product ${id}`)
      }))
      .subscribe({
        next: (selectedProduct: Product) => { this.state.update((state) => ({ ...state, selectedProduct, loading: false })) },
        error: (error) => { this.state.update((state) => ({ ...state, loading: false, error })) },
        complete: () => { console.info(`Product ${this.selectedProduct()?.id} loaded`) }
      })
  }
}
