import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('called intercept()');

        const role = sessionStorage.getItem('role');
        const token = sessionStorage.getItem('token');
        let user_id: any = null;
        let email: any = null;
        let username: any = null; 
        
        if (role === 'employee') {
            user_id = sessionStorage.getItem('userId');
            username = sessionStorage.getItem('userName');
            email = sessionStorage.getItem('email');
        } else {
            user_id = sessionStorage.getItem('adminId');
            username = sessionStorage.getItem('displayName');
            email = sessionStorage.getItem('email');
        }

        if (!token) {
            return next.handle(request);
        }

        const Request = request.clone({
            // headers: request.headers.set('Authorization', [`Bearer ${token}`, user_id, role]),
            headers: request.headers.set('Authorization', [`${token}`, user_id, role]),
            setHeaders: {
                user_id,
                email,
                username
            }
        });

        return next.handle(Request);
    }
}
