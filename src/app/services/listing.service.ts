import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private httpClient: HttpClient) { }

  getListings(pickCity, pickState, destCity, destState, token, sessid) {
    return this.httpClient.get(`https://localhost:44319/get?pickCity=${pickCity}&pickState=${pickState}&destCity=${destCity}&destState=${destState}&token=${token}&sessid=${sessid}`);
  }
}