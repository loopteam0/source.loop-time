import { MoviesInt } from './interface';
import { HttpRequest , HttpInterceptor } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http/src/backend';


export class ServiceInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<MoviesInt>, next: HttpHandler) {
        const newRequest = req.clone({
            headers: req.headers.set(
                'Access-Control-Allow-Origin', 'true'
            )
        });

        return next.handle(newRequest);
    }
}