import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmailInfo } from '../models/email-info';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private httpClient: HttpClient) { }

  getListings(pickCity, pickState, destCity, destState, token) {
    return this.httpClient.get(`api/parse?pickCity=${pickCity}&pickState=${pickState}&destCity=${destCity}&destState=${destState}&token=${token}`);
  }

  sendMail(emailInfo: EmailInfo) {
    return this.httpClient.post(
      'api/sendmail',
      emailInfo
    );
  }
}
