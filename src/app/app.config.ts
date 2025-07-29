import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loaderInterceptor } from './core/Interceptors/loader/loader.interceptor';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './core/Interceptors/errors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideToastr(),provideAnimations(),provideRouter(routes,withInMemoryScrolling({scrollPositionRestoration:'top'}),withHashLocation()), provideClientHydration(withEventReplay()),provideHttpClient(withFetch(),withInterceptors([loaderInterceptor,errorInterceptor])),importProvidersFrom(NgxSpinnerModule)]
};
 