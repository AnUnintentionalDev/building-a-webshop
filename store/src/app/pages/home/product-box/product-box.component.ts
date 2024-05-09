import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html'
})
export class ProductBoxComponent implements OnInit {

  @Input() product: Product | undefined;

  @Input() fullWidthMode: boolean = false;

  @Output() addToCartEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(): void {
    this.addToCartEvent.emit(this.product);
  }

}
