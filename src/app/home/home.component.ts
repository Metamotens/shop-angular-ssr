import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, WritableSignal, afterNextRender, inject } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../shared/ui/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, RouterLink],
  templateUrl: './home.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  productService: ProductService = inject(ProductService);

  products = this.productService.products;
  loading = this.productService.loading;

  constructor() {
    !this.loading() && this.productService.getProducts();
  }
}
