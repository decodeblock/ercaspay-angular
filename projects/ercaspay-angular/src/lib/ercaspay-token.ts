import { InjectionToken } from '@angular/core';

export const SECRET_KEY_TOKEN = new InjectionToken<string>('paystack.secretkey');
export const API_KEY_TOKEN = new InjectionToken<string>('paystack.apikey');
