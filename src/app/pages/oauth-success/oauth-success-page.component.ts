import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';

import { ApiError } from '../../core/models/auth.models';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-oauth-success-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './oauth-success-page.component.html',
  styleUrl: './oauth-success-page.component.scss'
})
export class OauthSuccessPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  message = 'Completing Google sign-in...';
  hasError = false;

  constructor() {
    this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          const token = params.get('token');

          if (!token) {
            throw new Error('Missing OAuth token in redirect URL.');
          }

          return this.authService.completeOAuth(token);
        })
      )
      .subscribe({
        next: () => {
          this.message = 'Connected. Redirecting to dashboard...';
          setTimeout(() => {
            void this.router.navigateByUrl('/dashboard');
          }, 500);
        },
        error: (error: HttpErrorResponse | Error) => {
          this.hasError = true;
          if (error instanceof HttpErrorResponse) {
            if (typeof error.error === 'string' && error.error.trim()) {
              this.message = error.error;
              return;
            }
            const apiError = error.error as ApiError;
            this.message = apiError?.message ?? apiError?.error ?? 'OAuth callback failed.';
          } else {
            this.message = error.message;
          }
        }
      });
  }
}
