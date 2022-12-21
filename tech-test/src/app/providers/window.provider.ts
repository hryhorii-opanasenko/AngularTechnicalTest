/* eslint-disable @typescript-eslint/ban-types */
import { FactoryProvider, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const WINDOW = new InjectionToken('WindowToken');

export const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: (platformId: Object): Window | null => (isPlatformBrowser(platformId) ? window : null),
  deps: [PLATFORM_ID],
};
