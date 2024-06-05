import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'fet-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent {

  list: any

  constructor(private products : ProductsService) {}


  ngOnInit(){
    this.products.product$.subscribe((data) => {
      this.list = data
    })
  }

}
