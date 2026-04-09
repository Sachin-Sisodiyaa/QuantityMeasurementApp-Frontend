import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthStorageService } from '../services/auth-storage.service';
const publicAuthEndpoints = ['/api/v1/auth/login', '/api/v1/auth/register'];
export const authInterceptor = (request, next) => {
    const authStorage = inject(AuthStorageService);
    const router = inject(Router);
    const token = authStorage.getToken();
    const requiresToken = !!token && !publicAuthEndpoints.some((endpoint) => request.url.includes(endpoint));
    const authRequest = requiresToken
        ? request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
        : request;
    return next(authRequest).pipe(catchError((error) => {
        if (error.status === 401) {
            authStorage.clearSession();
            void router.navigateByUrl('/login');
        }
        return throwError(() => error);
    }));
};
