import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/pages/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private _cart: Cart = { items : [] };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
    .map((item) => item.quantity)
    .reduce((prev, curr) => prev + curr , 0);

    

  }

  constructor(
    private _cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  getTotal(items: CartItem[]): number {
    return this._cartService.getTotal(items);
  }

  onClearCart() {
    this._cartService.clearCart();
  }
}
