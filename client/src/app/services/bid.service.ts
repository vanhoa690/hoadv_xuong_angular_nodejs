import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Bid, BidForm } from '../../types/Bid';

@Injectable({
  providedIn: 'root',
})
export class BidService {
  apiUrl = 'http://localhost:3000/bids';

  http = inject(HttpClient);

  getAllBids() {
    return this.http.get<Bid[]>(this.apiUrl);
  }
  createBid(data: BidForm) {
    return this.http.post(this.apiUrl, data);
  }

  editBid(id: string, data: BidForm) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteBid(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getBidDetail(id: string) {
    return this.http.get<Bid>(`${this.apiUrl}/${id}`);
  }
}
