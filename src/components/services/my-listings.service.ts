import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MyListing, MyListings } from '../model/my-listings';
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

    const now = new Date();
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const today = moment(todayMidnight).format('yyyy-MM-DDTHH:MM')
    this.newListing.listingStart = today

    const fourWeeksFromNow = new Date(now.getTime() + (4 * 7 * 24 * 60 * 60 * 1000));
    const fourWeeksMidnight = new Date(fourWeeksFromNow.getFullYear(), fourWeeksFromNow.getMonth(), fourWeeksFromNow.getDate());
    const auctionEndDate = moment(fourWeeksMidnight).format('yyyy-MM-DDTHH:MM')
    this.newListing.auctionEnd = auctionEndDate
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
