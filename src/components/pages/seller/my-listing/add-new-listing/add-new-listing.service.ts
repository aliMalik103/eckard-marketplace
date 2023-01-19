import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, AuctionType, Constraint, ContactAccount, ListingType, Project, Status, Tract } from 'src/components/model/my-listings';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AddNewListingService implements OnInit {

  projectsOptions: Array<string> = [
    'ANY Project',
    'ELA Bryant',
    'ELA Cooley',
    'ELA Mobley',
    '221203 AUE'
  ]

  selectAllOperators!: boolean;
  selectAllCountries!: boolean;
  selectAllProject!: boolean;



  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    console.log("add new listings service")
  }

  toggleSelection(flag: boolean, value: any) {
    switch (value) {
      case 'selectAllOperators':
        this.selectAllOperators = flag
        break;
      case 'selectAllCountries':
        this.selectAllCountries = flag
        break;
      case 'selectAllProject':
        this.selectAllProject = flag
        break;
      default:
        return
    }
  }

  getSelectedValues() {

  }

  handleRemoveAndAddClass() {
    this.toggleActiveClass(['listingDetails-tab', 'listingDetails'], false);
    this.toggleActiveClass(['addTracts-tab', 'addTracts'], true);
  }

  handleGetListType(): Observable<ListingType[]> {
    const res = this.http.get<ListingType[]>(`${environment.API_BASE_URL}/listing_type/`).pipe(
      tap(response => console.log("listing type", response))
    )
    return res;
  }

  handleAuctionType(): Observable<AuctionType[]> {
    const res = this.http.get<AuctionType[]>(`${environment.API_BASE_URL}/auction_type/`).pipe(
      tap(response => console.log("auction type", response))

    )
    return res;
  }

  handleConstraint(): Observable<Constraint[]> {
    const res = this.http.get<Constraint[]>(`${environment.API_BASE_URL}/constraint/`).pipe(
      tap(response => console.log("constraint type", response))

    )
    return res;

  }

  handleGetAllProjects(): Observable<Project[]> {
    const res = this.http.get<Project[]>(`${environment.API_BASE_URL}/project/`).pipe(
      tap(response => console.log("Project type", response))

    )
    return res;
  }

  handleGetAllAccounts(): Observable<Account[]> {
    const res = this.http.get<Account[]>(`${environment.API_BASE_URL}/account/`).pipe(
      tap(response => console.log("Account type", response))

    )
    return res;
  }

  handleGetStatus(): Observable<Status[]> {
    const res = this.http.get<Status[]>(`${environment.API_BASE_URL}/status/`).pipe(
      tap(response => console.log("Account type", response))

    )
    return res;
  }

  handleGetTracts(): Observable<Tract[]> {
    const res = this.http.get<Tract[]>(`${environment.API_BASE_URL}/tract/`).pipe(
      tap(response => console.log("Account type", response))

    )
    return res;
  }

  
  private toggleActiveClass(elements: string[], isAdd: boolean) {
    elements.forEach(element => {
      let currentElement = document.getElementById(element);
      if (isAdd) {
        currentElement?.classList.add("active");
        currentElement?.classList.add("show");
      } else {
        currentElement?.classList.remove("active");
        currentElement?.classList.remove("show");
      }
    });
  }
}
