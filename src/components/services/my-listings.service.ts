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

  newListing: MyListing = {
    listing_type: null,
    status: null,
    listingName: '',
    listingStart: null,
    auction_type: '',
    auctionEnd: '',
    comments: '',
    account: null,
    project: null,
    nma: null,
    minimumAsk: null,
    buyNowPrice: null,
    constraints: [],
    offer: []
  }
  isListEdit: boolean = false

  constructor(private http: HttpClient, private router: Router) { }


  handleResetSetNewList() {
    this.newListing = {
      listing_type: null,
      status: null,
      listingName: '',
      listingStart: null,
      auction_type: '',
      auctionEnd: '',
      comments: '',
      account: null,
      project: null,
      nma: null,
      minimumAsk: null,
      buyNowPrice: null,
      constraints: [],
      offer: []
    }
    this.isListEdit = false
  }


  getAllMyListings(): Observable<MyListings[]> {
    const res = this.http.get<MyListings[]>(`${environment.API_BASE_URL}/listing/`)
    return res;
  }

  createNewListing(newList: MyListing): Observable<MyListing> {
    const res = this.http.post<MyListing>(`${environment.API_BASE_URL}/listing/`, newList)
    return res
  }

  updateListing(updateList: MyListing): Observable<MyListing> {
    const res = this.http.patch<MyListing>(`${environment.API_BASE_URL}/listing/${updateList.id}/`, updateList)
    return res
  }

}
