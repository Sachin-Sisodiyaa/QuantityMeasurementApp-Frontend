import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { ApiError } from '../../core/models/auth.models';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

type AuthTab = 'login' | 'signup';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  activeTab: AuthTab = 'login';
  isLoginSubmitting = false;
  isSignupSubmitting = false;
  isGoogleSubmitting = false;

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  readonly signupForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    mobileNumber: [
      '',
      [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  });

  readonly passwordVisibility = {
    loginPassword: false,
    signupPassword: false,
    signupConfirm: false
  };

  constructor() {
    if (this.authService.isAuthenticated()) {
      void this.router.navigateByUrl('/dashboard');
    }
  }

  setTab(tab: AuthTab): void {
    this.activeTab = tab;
    this.clearFormErrors();
  }

  handleLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoginSubmitting = true;
    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(finalize(() => (this.isLoginSubmitting = false)))
      .subscribe({
        next: () => {
          this.toastService.show('Welcome back!');
          void this.router.navigateByUrl('/dashboard');
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.show(this.extractErrorMessage(error), true);
        }
      });
  }

  handleSignup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const { password, confirmPassword } = this.signupForm.getRawValue();
    if (password !== confirmPassword) {
      this.signupForm.controls.confirmPassword.setErrors({ mismatch: true });
      this.signupForm.controls.confirmPassword.markAsTouched();
      return;
    }

    this.isSignupSubmitting = true;
    this.authService
      .register({
        fullName: this.signupForm.controls.fullName.value,
        email: this.signupForm.controls.email.value,
        mobileNumber: this.signupForm.controls.mobileNumber.value,
        password: this.signupForm.controls.password.value
      })
      .pipe(finalize(() => (this.isSignupSubmitting = false)))
      .subscribe({
        next: () => {
          this.toastService.show('Account created successfully!');
          void this.router.navigateByUrl('/dashboard');
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.show(this.extractErrorMessage(error), true);
        }
      });
  }

  togglePassword(field: keyof typeof this.passwordVisibility): void {
    this.passwordVisibility[field] = !this.passwordVisibility[field];
  }

  handleGoogleLogin(): void {
    if (this.isGoogleSubmitting) {
      return;
    }

    this.isGoogleSubmitting = true;
    this.authService.loginWithGoogle();
  }

  shouldShowLoginError(controlName: keyof typeof this.loginForm.controls): boolean {
    const control = this.loginForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  shouldShowSignupError(controlName: keyof typeof this.signupForm.controls): boolean {
    const control = this.signupForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  getFieldError(controlName: string, mode: AuthTab): string {
    if (mode === 'login' && !this.shouldShowLoginError(controlName as keyof typeof this.loginForm.controls)) {
      return '';
    }
    if (mode === 'signup' && !this.shouldShowSignupError(controlName as keyof typeof this.signupForm.controls)) {
      return '';
    }

    if (mode === 'login') {
      const control =
        this.loginForm.controls[controlName as keyof typeof this.loginForm.controls];
      if (control.errors?.['required']) {
        return controlName === 'email' ? 'Email is required' : 'Password is required';
      }
      if (control.errors?.['email']) {
        return 'Enter a valid email address';
      }
      return 'Invalid value';
    }

    const control =
      this.signupForm.controls[controlName as keyof typeof this.signupForm.controls];
    if (control.errors?.['required']) {
      if (controlName === 'fullName') return 'Please enter your full name';
      if (controlName === 'mobileNumber') return 'Mobile number is required';
      if (controlName === 'email') return 'Email is required';
      if (controlName === 'password') return 'Password is required';
      return 'Confirm password is required';
    }
    if (control.errors?.['email']) {
      return 'Enter a valid email address';
    }
    if (control.errors?.['minlength']) {
      return 'Password must be at least 8 characters';
    }
    if (control.errors?.['pattern']) {
      return 'Mobile number must contain 10 to 15 digits';
    }
    if (control.errors?.['mismatch']) {
      return 'Passwords do not match';
    }
    return 'Invalid value';
  }

  private clearFormErrors(): void {
    for (const control of Object.values(this.loginForm.controls)) {
      control.setErrors(null);
    }
    for (const control of Object.values(this.signupForm.controls)) {
      control.setErrors(null);
    }
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    const apiError = error.error as ApiError;
    if (apiError?.message) {
      return apiError.message;
    }
    return 'Unable to process request. Check backend logs and try again.';
  }
}
