import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [MessageService],
})
export class ProductCreateComponent {
  //https://v17.angular.io/api/forms/Validators
  productService = inject(ProductService);
  router = inject(Router);
  messageService = inject(MessageService);

  addProductForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    isShow: new FormControl(true),
  });

  handleCreateProduct() {
    console.log(this.addProductForm);
    this.productService.createProduct(this.addProductForm.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Create Product',
          detail: 'Thanh Cong',
        });
        setTimeout(() => this.router.navigate(['/admin/products/list']), 1000);
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
  }
}
