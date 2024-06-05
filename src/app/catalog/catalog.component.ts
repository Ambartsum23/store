import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { product } from '../home/product';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'fet-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnChanges {
  
  @Input() saqoneli: product[] = [];
  @Input() selected: { category: string, name: string } = { category: 'all', name: '' };
  filteredProducts: product[] = [];
  isLoggedIn: boolean = false;
  total: number = 5;

  constructor( private cartService: CartService, private authService: AuthService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selected'] || changes['saqoneli']) {
      this.filterProducts();
    }
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  filterProducts() {
    this.filteredProducts = this.saqoneli.filter(product => {
      const matchesCategory = this.selected.category === 'all' || product.category === this.selected.category;
      const matchesName = product.title.toLowerCase().includes(this.selected.name.toLowerCase());
      return matchesCategory && matchesName;
    });
  }

  isProductInCart(product: product): boolean {
    return !this.cartService.isCartEmpty() && this.cartService.getCartItems().some(item => item.product.id === product.id);
  }

  addToCart(product: product) {
    if (this.isLoggedIn) {
      this.cartService.addToCart(product);
    } else {
      alert('You need to be logged in to add products to the cart');
    }
  }

  placeAnOrder(item: product) {
    this.cartService.addToCart(item);
  }

  @ViewChild('textOrder') requestOrder!: ElementRef;
}
