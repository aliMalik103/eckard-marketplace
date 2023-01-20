import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContactAccount, MyListing, MyListings } from '../model/my-listings';
import * as moment from 'moment'


@Injectable({
  providedIn: 'root'
})
export class MyListingsService {


  newListing: MyListing = {
    listing_type: 1,
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
  isListDraft: boolean = true
  userAccountsAndProjects!: ContactAccount[]


  constructor(private http: HttpClient, private router: Router) {
    this.handleSetDate()
  }


  handleResetSetNewList() {
    this.newListing = {
      listing_type: 1,
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
    this.isListDraft = true;
    this.handleSetDate()


  }

  handleSetDate() {

    const todayMidnight = moment().startOf('day');
    const today = todayMidnight.format().slice(0, 16)
    this.newListing.listingStart = today
    const fourWeeksFromNow = moment().add(4, 'weeks').startOf('day');
    this.newListing.auctionEnd = fourWeeksFromNow.format().slice(0, 16)
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

  handleGetUserAccounts(id: number): Observable<ContactAccount[]> {
    const res = this.http.get<ContactAccount[]>(`${environment.API_BASE_URL}/account/getbycontact/${id}`)
    return res;
  }

}
