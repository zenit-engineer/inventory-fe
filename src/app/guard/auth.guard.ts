import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token-service';
import { AuthenticationService } from '../services/auth.service';
import { Observable, of, switchMap, catchError } from 'rxjs';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = () => {
    const tokenService = inject(TokenService);
    const router = inject(Router);
    const authService = inject(AuthenticationService);
    const messageService = inject(MessageService);

    if(!tokenService.accessToken || !tokenService.refreshToken){
      router.navigate(['login']);
      return false;
    }

    if(!tokenService.isAccessTokenValid()) {
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
        messageService.add({
                  severity: 'error',
                  summary: 'Authentication Failed: Expired Token',
                  detail: 'Please sign in again',
                  life: 5000
              });        
        setTimeout(() => {
          router.navigate(['login']);
        }, 500); // Delay navigation to allow message display
        return of(false);
      })
    ) as unknown as boolean; // Necessary because Angular expects a boolean return
   
  }

  return true;

};