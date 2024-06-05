import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service'; 
import { AuthService } from '../services/auth.service';
import { AppModule } from '../app.module';

@Component({
  selector: 'fet-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItemCount: number = 0;
  isDropdownOpen: boolean = false;
  user: any = null;

  constructor(
    private router: Router, 
    private activeRoute: ActivatedRoute, 
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItemsChanged.subscribe(() => {
      this.cartItemCount = this.cartService.getCartItems().length;
    });

    this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(event: Event) {
    event.preventDefault(); 
    this.authService.logout();
    this.isDropdownOpen = false;
    this.router.navigate(['/home']);
  }

  redirect() {
    this.router.navigate(['catalog'], { relativeTo: this.activeRoute });
  }
}
