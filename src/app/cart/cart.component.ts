import { Component, OnInit } from '@angular/core';
import { product } from '../home/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'fet-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: { product: product, quantity: number }[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(productId: string) {
    const index = this.cartItems.findIndex(item => item.product.id.toString() === productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartService.removeFromCart(productId);
    }
}

  decreaseQuantity(product: product) {
    this.cartService.decreaseQuantity(product);
  }

  increaseQuantity(product: product) {
    this.cartService.increaseQuantity(product);
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  isCartEmpty(): boolean {
    return this.cartService.isCartEmpty();
  }
  placeOrder() {
    if (!this.isCartEmpty()) {
      alert('The shooping was successfully completed!');
      this.cartService.clearCart();
      this.cartItems = [];
    }
  }
}
