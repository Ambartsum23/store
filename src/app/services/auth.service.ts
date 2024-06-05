import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>('https://dummyjson.com/auth/login', { username, password })
      .pipe(tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.userValue;
  }

  getUser(): any {
    return this.userValue;
  }
}
