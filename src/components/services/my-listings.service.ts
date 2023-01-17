import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MyListing, MyListings } from '../model/my-listings';

@Injectable({
  providedIn: 'root'
})
export class MyListingsService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllMyListings(): Observable<MyListings[]> {
    const res = this.http.get<MyListings[]>(`${environment.API_BASE_URL}/listing/`)
    return res;
  }

  createNewListing(newList: MyListing): Observable<MyListing> {
    const res = this.http.post<MyListing>(`${environment.API_BASE_URL}/listing/`, newList)
    return res
  }

}