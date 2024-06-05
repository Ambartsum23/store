import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private subject = new Subject<any>()
  product$ = this.subject.asObservable()
  private productAPI = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<any>('https://dummyjson.com/products').pipe(
      map((response)=>{
        if(response){
          return response.products.map((product:any)=> {
            return{...product, title:product.title.toUpperCase()}
          })
        }
      })
    ).subscribe({
      next: (data) => this.subject.next(data),
      error: (err) => this.subject.error(err)
    })
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.productAPI);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.productAPI}/${id}`);
  }

}
