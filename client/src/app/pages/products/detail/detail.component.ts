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

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  bidService = inject(BidService);

  product!: Product | undefined;

  bidForm: FormGroup = new FormGroup({
    price: new FormControl('', [Validators.min(1)]),
  });

  ngOnInit() {
    // const id: string = this.route.snapshot.params[id
    this.route.params.subscribe((param) => {
      this.productService.getProductDetail(param['id']).subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (error) => {
          // show thong bao error
          console.error(error);
        },
      });
    });
  }

  handleSubmit() {
    //check login chua: sang login, call api

    if (!this.product) return;
    this.bidService
      .createBid({
        product: this.product._id,
        bids: this.product.bids.map((bid) => bid._id),
        user: '6659e052bd9a644c381cefea',
        price: this.bidForm.value.price,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          // show error
          console.error(error.message);
        },
      });
  }
}
