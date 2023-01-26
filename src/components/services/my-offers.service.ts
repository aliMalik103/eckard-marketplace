import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MyOffers } from '../model/my-offer';

@Injectable({
  providedIn: 'root'
})
export class MyOffersService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllMyOffers(id: number): Observable<MyOffers[]> {
    const res = this.http.get<MyOffers[]>(`${environment.API_BASE_URL}/offer/contact/${id}`)
    return res;
  }
}
