// ========================================
// src/app/core/interceptors/auth.interceptor.ts
// ========================================
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  // Ajouter le token si disponible
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si 401, essayer de rafraîchir le token
      if (error.status === 401 && authService.getRefreshToken()) {
        return authService.refreshToken().pipe(
          switchMap((response) => {
            const newReq = req.clone({
              setHeaders: { Authorization: `Bearer ${response.token}` }
            });
            return next(newReq);
          }),
          catchError(() => {
            // Refresh échoué, déconnecter
            authService.logout();
            router.navigate(['/admin/login']);
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};

// ========================================
// src/app/core/guards/auth.guard.ts
// ========================================
