import { Component, inject } from '@angular/core';
import { Product } from '../../../../../types/Product';
import { ProductService } from '../../../../services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ProductListComponent {
  products: Product[] = [];
  productService = inject(ProductService);

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
          this.products = this.products.filter((product) => product._id !== id);
        },
        error: (error) => {
          console.error(error.message);
        },
      });
    }
  }
}
