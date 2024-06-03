import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserLogin } from '../../../types/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  handleSubmit() {
    console.log(this.registerForm.value);

    this.authService.login(this.registerForm.value).subscribe({
      next: (data) => {
        localStorage.setItem('userId', (data as UserLogin ).user._id);
        localStorage.setItem('token', (data as UserLogin ).token);

        setTimeout(() => this.router.navigate(['/']), 1000);
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
  }
}
