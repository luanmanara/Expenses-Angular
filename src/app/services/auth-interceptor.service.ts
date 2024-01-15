import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Recupere o token do sessionStorage
    const token = JSON.parse(window.sessionStorage.getItem('currentUser')??'{}').token;

    if(token){
      // Clone a requisição original e adicione o token como header
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      // Envie a requisição com os headers atualizados
      return next.handle(authReq);
    }

    return next.handle(request);
  }
}