import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, LoginForm } from 'src/components/model/login';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  isAuthanticated: boolean = false;

  login(user: LoginForm): Observable<Login> {
    const res = this.http.post<Login>(`http://localhost:8000/eckardapi/auth/login/`, user);
    
   
    return res;
  }

  logout(){
    
  }

}
