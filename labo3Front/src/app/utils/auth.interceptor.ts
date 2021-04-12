import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('token') != null) {
      const token = localStorage.getItem('token');
      const clone = request.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
      return next.handle(clone);
    } else {
      return next.handle(request);
    }
  }
}
