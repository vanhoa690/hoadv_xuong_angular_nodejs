import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../../types/Product';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BidService } from '../../../services/bid.service';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ReactiveFormsModule, CountdownComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  bidService = inject(BidService);

  product!: Product | undefined;
  productId!: string;
  bidForm: FormGroup = new FormGroup({
    price: new FormControl(0, Validators.min(0)),
  });
  config: CountdownConfig = {
    leftTime: 3600,
  };

  ngOnInit() {
    // const id: string = this.route.snapshot.params[id
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
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

  handleSubmitBid() {
    console.log(this.bidForm.value);
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.bidService
      .createBid({
        price: this.bidForm.value.price,
        product: this.productId,
        user: userId,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          // show thong bao error
          console.error(error);
        },
      });
  }
}
