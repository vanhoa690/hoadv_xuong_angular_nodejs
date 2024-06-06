import { Component, inject } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../../../types/Category';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class ProductEditComponent {
  categories: Category[] = [];
  categoryService = inject(CategoryService);
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  productId!: string;

  addProductForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    isShow: new FormControl(true),
    bidTime: new FormControl(''),
    startAt: new FormControl(''),
  });

  ngOnInit() {
    // const id: string = this.route.snapshot.params[id
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.productService.getProductDetail(param['id']).subscribe({
        next: (data) => {
          const now = new Date(data.startAt);
          now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
          const startAt = now.toISOString().slice(0, 16);
          this.addProductForm.patchValue({ ...data, startAt: startAt });
        },
        error: (error) => {
          // show thong bao error
          console.error(error);
        },
      });
    });
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
  }

  handleUpdateProduct() {
    this.productService
      .editProduct(this.productId, this.addProductForm.value)
      .subscribe({
        next: () => {
          console.log('thong bao + chuyen trang');
        },
        error: (error) => {
          // show error
          console.error(error.message);
        },
      });
  }
}
