import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MyOffers } from '../model/my-offer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyOffersService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllListings(id: number): Observable<MyOffers[]> {
    const res = this.http.get<MyOffers[]>(`${environment.API_BASE_URL}/offer/active_listing/contact/${id}`).pipe(
      map((lists: any) => lists?.map((list: any) => ({
        ...list,
        offerAmount: list?.offer_Status == "Cancelled" ? null : list.offerAmount,
        offer_id: list?.offer_Status == "Cancelled" ? null : list.offer_id,
        // auctionEnd: moment.utc(list.auctionEnd).local().format().slice(0, 16),
      })))
    )
    return res;
  }

  getAllClosedListings(id: number): Observable<MyOffers[]> {
    const res = this.http.get<MyOffers[]>(`${environment.API_BASE_URL}/offer/closed_listing/contact/${id}`).pipe(
      map((lists: any) => lists?.map((list: any) => ({
        ...list,
        offerAmount: list?.offer_Status == "Cancelled" ? null : list.offerAmount,
        offer_id: list?.offer_Status == "Cancelled" ? null : list.offer_id,
        // auctionEnd: moment.utc(list.auctionEnd).local().format().slice(0, 16),
      })))
    )
    return res;
  }

  getAllCancelledListings(id: number): Observable<MyOffers[]> {
    const res = this.http.get<MyOffers[]>(`${environment.API_BASE_URL}/offer/cancelled_listing/contact/${id}`).pipe(
      map((lists: any) => lists?.map((list: any) => ({
        ...list,
        offerAmount: list?.offer_Status == "Cancelled" ? null : list.offerAmount,
        offer_id: list?.offer_Status == "Cancelled" ? null : list.offer_id,
        // auctionEnd: moment.utc(list.auctionEnd).local().format().slice(0, 16),
      })))
    )
    return res;
  }

  getAllMyOffers(id: number): Observable<MyOffers[]> {
    const res = this.http.get<MyOffers[]>(`${environment.API_BASE_URL}/offer/myoffers/contact/${id}`).pipe(
      map((lists: any) => lists?.map((list: any) => ({
        ...list,
        offerAmount: list.offer_Status == "Cancelled" ? null : list.offerAmount,
        offer_id: list.offer_Status == "Cancelled" ? null : list.offer_id,
        // auctionEnd: moment.utc(list.auctionEnd).local().format().slice(0, 16),
      })))
    )
    return res;
  }
  getofferDetails(id: number) {
    const res = this.http.get(`${environment.API_BASE_URL}/offer/${id}`)
    return res;
  }

  handleCreateNewOffer(body: any) {
    const res = this.http.post(`${environment.API_BASE_URL}/offer/`, body)
    return res
  }

  handleUpdateOffer(id: any, body: any) {
    const res = this.http.patch(`${environment.API_BASE_URL}/offer/${id}/`, body)
    return res
  }

  handleCancelOffer(id: any, body: any) {
    const res = this.http.patch(`${environment.API_BASE_URL}/offer/${id}/`, body)
    return res
  }

  handleCheckListStatus(id: any) {
    const res = this.http.get<any[]>(`${environment.API_BASE_URL}/offer/list/${id}/`)
    return res
  }

  handleOfferDealMessages() {
    const res = this.http.get<any[]>(`${environment.API_BASE_URL}/key_value/`)
    return res
  }

  handlePendingOfferTrancastions(id: any) {
    const res = this.http.get<any[]>(`${environment.API_BASE_URL}/offer/contact/${id}/pending_offer`)
    return res;
  }


}
