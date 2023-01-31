import { Account, ContactListing, IncomListing, Project } from './../model/my-listings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContactAccount, MyListing, MyListings, ListingCost } from '../model/my-listings';
import * as moment from 'moment'
import { tap, map, catchError } from 'rxjs/operators';



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
    offer: [],
    immediatePrice: null
  }
  isListEdit: boolean = false
  isListDraft: boolean = true
  userAccountsAndProjects!: any[]


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
      offer: [],
      immediatePrice: null

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


  getAllMyListings(id: number): Observable<ContactListing[]> {
    const res = this.http.get<ContactListing[]>(`${environment.API_BASE_URL}/listing/contact/${id}`).pipe(
      map(lists => lists?.map(list => ({
        ...list,
        auctionEnd: moment.utc(list.auctionEnd).local().format().slice(0, 16),
      })))
    )
    return res;
  }

  getMyList(id: number): Observable<MyListings> {
    const res = this.http.get<MyListings>(`${environment.API_BASE_URL}/listing/${id}`).pipe(
      map(list => {
        return {
          ...list,
          auctionEnd: moment.utc(list.auctionEnd).local().format().slice(0, 16),
          listingStart: moment.utc(list.listingStart).local().format().slice(0, 16)
        }

      }

      )
    )
    return res;
  }

  createNewListing(newList: MyListing): Observable<MyListing> {
    newList.auctionEnd = moment.utc(newList.auctionEnd)
    newList.listingStart = moment.utc(newList.listingStart)
    const res = this.http.post<MyListing>(`${environment.API_BASE_URL}/listing/`, newList)
    return res
  }

  updateListing(updateList: MyListing): Observable<MyListing> {
    updateList.auctionEnd = moment.utc(updateList.auctionEnd)
    updateList.listingStart = moment.utc(updateList.listingStart)
    const res = this.http.patch<MyListing>(`${environment.API_BASE_URL}/listing/${updateList.id}/`, updateList)
    return res
  }

  handleGetUserAccounts(id: number): Observable<Account[]> {
    const res = this.http.get<Account[]>(`${environment.API_BASE_URL}/account/getbycontact/${id}/`)
    return res;
  }

  handleGetProjects(id: number): Observable<ContactAccount[]> {
    const res = this.http.get<ContactAccount[]>(`${environment.API_BASE_URL}/investment/getbyaccount/${id}/`)
    return res;
  }

  handleGetListingCost(accountId: number, projectId: number): Observable<ListingCost> {
    const res = this.http.get<ListingCost>(`${environment.API_BASE_URL}/investment/account/${accountId}/project/${projectId}`)
    return res;
  }

  handleGetIncomeListing(accountId: number, projectId: number): Observable<IncomListing> {
    const res = this.http.get<IncomListing>(`${environment.API_BASE_URL}/income/account/${accountId}/project/${projectId}`)
    return res;
  }

  handleGetCashFlow(projectId: number) {
    const res = this.http.get(`${environment.API_BASE_URL}/project/${projectId}/recent_prices`)
    return res;
  }

  handleGetCashConfig(contactId: number) {
    const res = this.http.get(`${environment.API_BASE_URL}/cash_config/contact/${contactId}`)
    return res;
  }

  handleCreateCashConfig(body: any) {
    const res = this.http.post(`${environment.API_BASE_URL}/cash_config/`, body)
    return res;
  }

  handleUpdateCashConfig(body: any) {
    console.log(body)
    const res = this.http.patch(`${environment.API_BASE_URL}/cash_config/${body.id}`, body)
    return res;
  }

  handleCalculateCashFlow(basicCashFlow: any, cashFlow: any, listDetails: any) {
    let gasArray = 0;
    let oilArray = 0;
    let currentGas = cashFlow.gas;
    let currentOil = cashFlow.oil;

    for (let i = 1; i <= basicCashFlow.noOfMonths; i++) {
      let gasDecline = currentGas * (basicCashFlow.decline / 100);
      let oilDecline = currentOil * (basicCashFlow.decline / 100);
      currentGas = currentGas - gasDecline;
      currentOil = currentOil - oilDecline;
      gasArray += currentGas;
      oilArray += currentOil;
    }

    gasArray *= basicCashFlow.gasPrice;
    oilArray *= basicCashFlow.oilPrice;
    gasArray /= cashFlow.totalProjectNma;
    oilArray /= cashFlow.totalProjectNma;
    return (gasArray + oilArray) * listDetails.nma ? (gasArray + oilArray) * listDetails.nma : 0;
  }

}
