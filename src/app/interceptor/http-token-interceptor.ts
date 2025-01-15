import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService); // Use inject to get the TokenService instance

  // Check if the access token is valid
  if (!tokenService.isAccessTokenValid()) {
    const refreshToken = tokenService.refreshToken;
    if (refreshToken) {
      // Clone the request and add the refresh token to the Authorization header
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${refreshToken}`
        }
      });
      return next(authReq); // Pass the modified request forward
    }
  }

  // If access token is valid, add it to the Authorization header
  const accessToken = tokenService.accessToken;
  if (accessToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return next(authReq); // Pass the modified request forward
  }

  // If no token is available, proceed with the original request
  return next(req);
};
