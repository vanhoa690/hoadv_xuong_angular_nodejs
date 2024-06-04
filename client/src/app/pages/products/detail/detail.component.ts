import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../../types/Product';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BidService } from '../../../services/bid.service';
import { DatePipe } from '@angular/common';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, CountdownComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  bidService = inject(BidService);

  product!: Product | undefined;
  config: CountdownConfig = {
    leftTime: 3600,
  };
  bidForm: FormGroup = new FormGroup({
    price: new FormControl('', [Validators.min(1)]),
  });
  productId!: string;
  getProductDetail(id: string) {
    this.productService.getProductDetail(id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (error) => {
        // show thong bao error
        console.error(error);
      },
    });
  }
  ngOnInit() {
    // const id: string = this.route.snapshot.params[id
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.getProductDetail(this.productId);
    });
  }

  handleSubmit() {
    //check login chua: sang login, call api

    if (!this.product) return;
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.bidService
      .createBid({
        product: this.product._id,
        bids: this.product.bids.map((bid) => bid._id),
        user: userId,
        price: this.bidForm.value.price,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getProductDetail(this.productId);
        },
        error: (error) => {
          // show error
          console.error(error.message);
        },
      });
  }
}
