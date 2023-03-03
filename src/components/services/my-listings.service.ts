import { Account, ContactListing, IncomListing, Project } from './../model/my-listings';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    auction_type: null,
    auctionEnd: '',
    comments: '',
    account: null,
    project: null,
    nma: null,
    minimumAsk: null,
    buyNowPrice: null,
    constraints: [],
    offer: [],
    directSaleToken: ''
  }
  isListEdit: boolean = false
  showOffers: boolean = false
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
      auction_type: null,
      auctionEnd: '',
      comments: '',
      account: null,
      project: null,
      nma: null,
      minimumAsk: null,
      buyNowPrice: null,
      constraints: [],
      offer: [],
      directSaleToken: ''

    }
    this.isListEdit = false
    this.isListDraft = true;
    this.showOffers = false
    this.handleSetDate()


  }

  handleSetDate() {

    const todayMidnight = moment().startOf('day');
    const today = todayMidnight.format().slice(0, 16)
    this.newListing.listingStart = today
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
    const startLocalTime = moment(newList.listingStart);
    const endLocalTime = moment(newList.auctionEnd);
    newList.auctionEnd = endLocalTime.utc().format();
    newList.listingStart = startLocalTime.utc().format();
    newList.auction_type = newList.auction_type.id
    return this.http.post<MyListing>(`${environment.API_BASE_URL}/listing/`, newList)
  }

  updateListing(updateList: MyListing): Observable<MyListing> {
    const startLocalTime = moment(updateList.listingStart);
    const endLocalTime = moment(updateList.auctionEnd);
    updateList.auctionEnd = endLocalTime.utc().format();
    updateList.listingStart = startLocalTime.utc().format();
    updateList.auction_type = updateList.auction_type.id
    return this.http.patch<MyListing>(`${environment.API_BASE_URL}/listing/${updateList.id}/`, updateList);
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
    body = {
      contact: body.contact,
      json_fields: {
        months: body.months,
        decline: body.decline,
        oil: body.oil,
        gas: body.gas
      }
    }
    const res = this.http.post(`${environment.API_BASE_URL}/cash_config/`, body)
    return res;
  }

  handleUpdateCashConfig(body: any) {
    body = {
      contact: body.contact,
      id: body.id,
      json_fields: {
        months: body.months,
        decline: body.decline,
        oil: body.oil,
        gas: body.gas
      }
    }
    const res = this.http.patch(`${environment.API_BASE_URL}/cash_config/${body.id}`, body)
    return res;
  }

  handlePendingListsTrancastions(id: any) {
    const res = this.http.get<any[]>(`${environment.API_BASE_URL}/listing/contact/${id}/pending_list`)
    return res;
  }

  handleCalculateCashFlow(user: any, basicCashFlow: any, cashFlow: any, listDetails: any) {
    const body = {
      contact: user.id,
      project: listDetails?.project?.id,
      json_fields: {
        months: basicCashFlow.months,
        decline: basicCashFlow.decline,
        oil: basicCashFlow.oil,
        gas: basicCashFlow.gas
      }
    }
    this.handleCreateHistory(body).subscribe(
      (response) => {
        console.log("Re-calculate history save", response)
      },
      (error: any) => {
        console.error("Error create history  : ", error);
      })
    let gasArray = 0;
    let oilArray = 0;
    let currentGas = cashFlow.gas;
    let currentOil = cashFlow.oil;

    for (let i = 1; i <= basicCashFlow.months; i++) {
      let gasDecline = currentGas * (basicCashFlow.decline / 100);
      let oilDecline = currentOil * (basicCashFlow.decline / 100);
      currentGas = currentGas - gasDecline;
      currentOil = currentOil - oilDecline;
      gasArray += currentGas;
      oilArray += currentOil;
    }

    gasArray *= basicCashFlow.gas;
    oilArray *= basicCashFlow.oil;
    gasArray /= cashFlow.totalProjectNma;
    oilArray /= cashFlow.totalProjectNma;
    return (gasArray + oilArray) * listDetails.nma ? (gasArray + oilArray) * listDetails.nma : 0;
  }

  handleCreateHistory(body: any) {
    const res = this.http.post(`${environment.API_BASE_URL}/history/`, body)
    return res;
  }

  handleGetSellerPendingTransactions(id: any): Observable<any> {
    const res = this.http.get(`${environment.API_BASE_URL}/transaction/seller/${id}`)
    return res;
  }

  handleGetBuyerPendingTransactions(id: any): Observable<any> {
    const res = this.http.get(`${environment.API_BASE_URL}/transaction/buyer/${id}`)
    return res;
  }

  handleGetEckardTransactions(status: string) {
    const params = new HttpParams().set('statusName', status);
    const res = this.http.get(`${environment.API_BASE_URL}/transaction/status`, { params })
    return res;
  }

  handleUpdateEckardTransactions(transaction: any) {
    const body = {
      status: transaction.status.id
    }
    const res = this.http.patch(`${environment.API_BASE_URL}/transaction/${transaction.id}/`, body)
    return res;
  }
  handleGetTransactions(transaction: any) {
    const res = this.http.get(`${environment.API_BASE_URL}/transaction/${transaction.id}/`)
    return res;
  }

  handleDeleteFTM(id: any, flag: any) {
    const params = new HttpParams().set('forceDelete', flag);
    const res = this.http.delete(`${environment.API_BASE_URL}/fund_transfer_method/${id}/`, { params })
    return res;
  }


  handleGetEckardTransactionsMethods() {
    const res = this.http.get(`${environment.API_BASE_URL}/fund_transfer_method/old_records/`)
    return res;
  }

}
