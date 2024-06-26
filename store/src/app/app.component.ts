import { Component, OnInit } from '@angular/core';
import { Cart } from './pages/models/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  template: `
  <app-header [cart]="cart"></app-header>
  <router-outlet></router-outlet>
  `,
  styles: []
})

export class AppComponent implements OnInit {
  cart: Cart = { items: []};

  constructor(
    private _cartService: CartService
  ) {

  }

  ngOnInit() {
    this._cartService.cartSubject.subscribe((_cart) => {
      this.cart = _cart;
    })
  }
}
