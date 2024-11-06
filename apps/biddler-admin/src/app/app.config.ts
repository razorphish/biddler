import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { jwtInterceptor, serverErrorInterceptor } from '@lib/interceptors';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
        provideHttpClient(withInterceptors([serverErrorInterceptor, jwtInterceptor])),
    ],
};
