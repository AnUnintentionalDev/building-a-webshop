import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../pages/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartSubject = new BehaviorSubject<Cart>({ items: []});

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  addToCart(item: CartItem) : void {
    const items = [...this.cartSubject.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);

    if(itemInCart) {
      itemInCart.quantity += 1;

    } else {
      items.push(item);
    }

    this.cartSubject.next({items});
    this._snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 });
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;

    let filteredItems = this.cartSubject.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;

        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }

      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this.cartSubject.next({ items: filteredItems });
    this._snackBar.open('1 item removed from cart.', 'Ok', { duration: 3000 });

  }

  getTotal(items: CartItem[]): number {
    return items.map(item => item.price * item.quantity).reduce((prev, curr) => prev + curr, 0);
  }

  clearCart(): void {
    this.cartSubject.next({ items: []});
    this._snackBar.open('Cart is cleared', 'Ok', { duration: 3000 });
  }

  removeFromCart(item: CartItem, update = true): CartItem[] {
    const filteredItems = this.cartSubject.value.items.filter((_item) => _item.id !== item.id);

    if(update) {
      this.cartSubject.next({ items: filteredItems});
      this._snackBar.open('1 item removed from the cart.', 'Ok',  { duration: 3000 });
    }

    return filteredItems;
  }
}
