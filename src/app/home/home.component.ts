import { Component, OnInit, ViewChild } from '@angular/core';
import { product as item } from './product';
import { ProductsService } from '../services/products.service';
import { BehaviorSubject, Observable, Subject, fromEvent } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fet-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string = '';
  
  products: item[] = [];
  a:string = '';
  b:string = '';

  selectedChange: { category: string, name: string } = { category: 'all', name: '' };

  constructor (private prodsvc: ProductsService, private activeRoute: ActivatedRoute) {}

  parentFilter(event: { category: string, name: string }) {
    this.selectedChange = event;
  }

  observable$ = fromEvent(document, 'click');

  ngOnInit() {
    this.prodsvc.getProducts();
    this.prodsvc.product$.subscribe((data: any) => {
      this.products = data;
    });

    
  }


}
