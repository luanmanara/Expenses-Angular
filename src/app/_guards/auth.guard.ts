import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const isLoggedIn = (window.sessionStorage.getItem("isLoggedIn") === 'true');

  if(isLoggedIn){
    return true;
  }

  router.navigate(["/login"]);
  return false;
  
};
