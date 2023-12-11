import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const router = inject( Router );

  console.log('isAuthenticated');


  const url = state.url;
  console.log({ url });

  console.log('status:', authService.authStatus());

  if( authService.authStatus() === AuthStatus.authenticated ) {
    console.log('Esta autenticado');
    return true;
  }

  /*if( authService.authStatus() === AuthStatus.checking ) {
    console.log('Esta checking');
    return false;
  }*/

  router.navigateByUrl('/auth/login');
  return false;
};
