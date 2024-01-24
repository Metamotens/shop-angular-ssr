import { ChangeDetectionStrategy, Component, Input, Signal, afterNextRender, inject } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { CardComponent } from '../shared/ui/card/card.component';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent {
  @Input() id!: number;

  selectedProduct = this.productService.selectedProduct;
  loading = this.productService.loading;

  constructor(private productService: ProductService) {
    afterNextRender(() => {
      this.productService.getProduct(this.id);
    });
  }
}
