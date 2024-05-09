import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { CartService } from 'src/app/services/cart.service';
import { Cart, CartItem } from '../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  cart: Cart = { items: [{
    product: 'https://via.placeholder.com/150',
    name: 'sneakers',
    price: 150,
    quantity: 1,
    id: 1
  }]};

  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];
  dataSource: Array<CartItem> = [];

  constructor(
    private _cartService: CartService,
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this._cartService.cartSubject.subscribe((_cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items: CartItem[]): number {
    return this._cartService.getTotal(items);
  }

  onClearCart(): void {
    this._cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this._cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem) : void {
    this._cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this._cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this._http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    
    }).subscribe(async(res: any) => {
      let stripe = await loadStripe('pk_test_51P5N0USJDEDTr4gM29hH8ub0hKjPR0iNRdAmFfy6IZoAXQUjycclilSWs9S7vTPSsi2ceC53erww3Yk1BLynkMAM00R1CoQKUY');

      stripe?.redirectToCheckout({
        sessionId: res.id
      });
    });
  }

}
