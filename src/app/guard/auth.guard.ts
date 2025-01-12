import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token-service';
import { AuthenticationService } from '../services/auth.service';
import { Observable, of, switchMap, catchError } from 'rxjs';

export const authGuard: CanActivateFn = () => {
    const tokenService = inject(TokenService);
    const router = inject(Router);
    const authService = inject(AuthenticationService)


    if(!tokenService.accessToken || !tokenService.refreshToken){
      router.navigate(['login']);
      return false;
    }

    if (!tokenService.isAccessTokenValid()) {
    return authService.refreshToken().pipe(
      switchMap((newTokens) => {
        if (newTokens.accessToken && newTokens.refreshToken) {
          tokenService.accessToken = newTokens.accessToken;
          tokenService.refreshToken = newTokens.refreshToken;
          return of(true);
        } else {
          tokenService.clearTokens();
          router.navigate(['login']);
          return of(false);
        }
      }),
      catchError(() => {
        tokenService.clearTokens();     
        router.navigate(['login']);
        return of(false);
      })
    ) as unknown as boolean; // Necessary because Angular expects a boolean return
   
  }

  return true;

};