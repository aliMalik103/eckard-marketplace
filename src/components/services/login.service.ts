import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, LoginForm, User, UserDetails } from 'src/components/model/login';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class LoginService {

  isAuthanticated: boolean = false;
  user!: UserDetails

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthanticated = localStorage.getItem("isAuthanticated") == 'true' ? true : false;
    let userData = localStorage.getItem('user');
    if (userData != null) {
      this.user = JSON.parse(userData);
    }
  }



  login(user: LoginForm): Observable<User> {
    const res = this.http.post<User>(`${environment.API_BASE_URL}/auth/login/`, user).pipe(
      tap((users) => {
        if (users.data.valid) {
          this.user = users.data
          this.isAuthanticated = true;
          localStorage.setItem("isAuthanticated", "true");
          localStorage.setItem("user", JSON.stringify(this.user));
          this.router.navigate(['/market-place'])
        }
      })
    )
    return res;
  }

  logout() {
    this.isAuthanticated = false;
    localStorage.setItem("isAuthanticated", "false");
    localStorage.setItem("user", 'null');
    this.router.navigate([''])
  }

}
