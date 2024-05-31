import { Component, inject } from '@angular/core';
import { Product } from '../../../../../types/Product';
import { ProductService } from '../../../../services/product.service';
import { RouterLink } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ProductListComponent {
  toast = inject(NgToastService);
  productService = inject(ProductService);
  products: Product[] = [];

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
  }

  handleDeleteProduct(id: string) {
    if (window.confirm('Xoa that nhe')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.toast.success('This is new error Success', 'SUCCESS', 5000);
          this.products = this.products.filter((product) => product._id !== id);
        },
        error: (error) => {
          console.error(error.message);
        },
      });
    }
  }
}
