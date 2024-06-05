import { Injectable } from '@angular/core';
import { product } from '../home/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { product: product, quantity: number }[] = [];
  cartItemsChanged: Subject<void> = new Subject<void>();

  addToCart(product: product) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.cartItemsChanged.next();
  }

  removeFromCart(productId: string) {
    const index = this.cartItems.findIndex(item => item.product.id.toString() === productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartItemsChanged.next();
    }
  }

  increaseQuantity(product: product) {
    const item = this.cartItems.find(item => item.product.id === product.id);
    if (item) {
      item.quantity++;
      this.cartItemsChanged.next();
    }
  }

  decreaseQuantity(product: product) {
    const item = this.cartItems.find(item => item.product.id === product.id);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.cartItemsChanged.next();
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsChanged.next();
  }

  isProductInCart(product: product): boolean {
    return this.cartItems.some(item => item.product.id === product.id);
  }
}
