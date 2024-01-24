import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() product!: Product | null;
}
