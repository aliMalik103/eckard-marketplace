import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, LoginForm } from 'src/components/model/login';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  isAuthanticated: boolean = false;

  login(user: LoginForm): Observable<Login> {
    const res = this.http.post<Login>(`https://jsonplaceholder.typicode.com/users`, user)
    this.isAuthanticated = true;
    this.router.navigate(['/market-place'])
    return res;
  }

  logout() {
    this.isAuthanticated = false;
    this.router.navigate([''])
  }

}
