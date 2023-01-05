import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from 'src/components/model/login';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  login(user: LoginForm): Observable<any> {
    return this.http.post(`https://jsonplaceholder.typicode.com/users`, user)
  }

}
