import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../../types/Product';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  product!: Product | undefined;

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
}
