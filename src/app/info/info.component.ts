import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'fet-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  product: any;
  productID: any;
  productImages: string[] = [];
  currentImageIndex: number = 0; 
  reviews: { name: string, text: string, date: Date }[] = [];
  loggedIn: boolean = false; 
  reviewerName: string = '';
  reviewText: string = '';
  total: number = 5;

  constructor(
    private productService: ProductsService, 
    private activeRoute: ActivatedRoute,
    private cartService: CartService,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((data) => {
      this.productID = +data['id'];
      this.productService.getProductById(this.productID).subscribe((productData) => {
        this.product = productData;
        this.productImages = productData.images;
      });
    });

    this.loggedIn = this.authService.isLoggedIn();
    if (this.loggedIn) {
      this.reviewerName = this.authService.getUser().username;
    }
  }

  addReview() {
    if (!this.loggedIn) {
      alert('You must be logged in to leave a review.');
      return;
    }
    const review = {
      name: this.reviewerName,
      text: this.reviewText,
      date: new Date()
    };
    this.reviews.push(review);
    this.reviewText = '';
  }

  addToCart(product: any) {
    if (!this.loggedIn) {
      alert('You must be logged in to add an item to your basket.');
      return;
    }
    this.cartService.addToCart(product);
    alert('Product added to basket');
  }

  showImage(index: number) {
    this.currentImageIndex = index;
  }

  nextImage() {
    if (this.currentImageIndex < this.productImages.length - 1) {
      this.currentImageIndex++;
    }
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  isProductInCart(product: any): boolean {
    return this.cartService.isProductInCart(product);
  }
}
