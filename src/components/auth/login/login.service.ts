import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, LoginForm } from 'src/components/model/login';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthanticated = localStorage.getItem("isAuthanticated") == 'true' ? true : false;
  }

  isAuthanticated: boolean = false;


  login(user: LoginForm): Observable<Login> {
    const res = this.http.post<Login>(`http://52.24.239.223/:8000/auth/login/`, user)
    localStorage.setItem("isAuthanticated", "true");

    this.isAuthanticated = true;
    this.router.navigate(['/market-place'])
    return res;
  }

  logout() {
    this.isAuthanticated = false;
    localStorage.setItem("isAuthanticated", "false");

    this.router.navigate([''])


  }

}
