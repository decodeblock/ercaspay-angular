import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ErcaspayOptions, PrivateErcaspayOptions } from './ercaspay-options';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../enviroments/environment';

export const ERCASPAY_SECRET_KEY = new InjectionToken<string>('ERCASPAY_SECRET_KEY');
export const ERCASPAY_API_KEY = new InjectionToken<string>('ERCASPAY_API_KEY');

@Injectable({
  providedIn: 'root',
})
export class ErcaspayAngularService {
  apiBaseUrl: string;

  constructor(
    @Inject(ERCASPAY_SECRET_KEY) private secretKey: string,
    @Inject(ERCASPAY_API_KEY) private apiKey: string,
    private http: HttpClient
  ) {
    this.apiBaseUrl = environment.apiBaseUrl;
    console.log('Service initialized with key:', this.apiKey);
  }

  // Method to initiate checkout payment
  initiatePayment(
    paymentDetails: Partial<PrivateErcaspayOptions>
  ): Observable<any> {
    const url = `${this.apiBaseUrl}/payment/initiate`; // Adjust this to the correct endpoint
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.secretKey}`,
    });
    return this.http.post(url, paymentDetails, { headers }).pipe(
      catchError((error) => {
        console.error('Payment initiation failed:', error);
        return throwError(error);
      })
    );
  }

  // Method to verify payment
  verifyPayment(reference: string): Observable<any> {
    const url = `${this.apiBaseUrl}/payments/verify/${reference}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
    });
    return this.http.get(url, { headers });
  }

  checkInput(obj: Partial<ErcaspayOptions>): string {
    if (!this.apiKey) {
      return 'ANGULAR-ERCASPAY: Please insert a your API key';
    }
    if (!obj.amount) {
      return 'ANGULAR-ERCASPAY: Ercaspay amount cannot be empty';
    }
    if (!obj.paymentReference) {
      return 'ANGULAR-ERCASPAY: Ercaspay paymentReference cannot be empty';
    }
    if (!obj.paymentMethods) {
      return 'ANGULAR-ERCASPAY: Ercaspay Payment Methods cannot be empty';
    }
    if (!obj.customerName) {
      return 'ANGULAR-ERCASPAY: Ercaspay Customer Name cannot be empty';
    }
    if (!obj.customerEmail) {
      return 'ANGULAR-ERCASPAY: Ercaspay email cannot be empty';
    }
    if (!obj.customerPhoneNumber) {
      return 'ANGULAR-ERCASPAY: Ercaspay Customer Phone Number cannot be empty';
    }
    if (!obj.currency) {
      return 'ANGULAR-ERCASPAY: Ercaspay Currency cannot be empty';
    }
    return '';
  }

  getErcaspayOptions(obj: ErcaspayOptions): ErcaspayOptions {
    const ercaspayOptions: ErcaspayOptions = {
      amount: obj.amount,
      paymentReference: obj.paymentReference,
      paymentMethods: obj.paymentMethods,
      customerName: obj.customerName,
      customerEmail: obj.customerEmail,
      customerPhoneNumber: obj.customerPhoneNumber || '',
      currency: obj.currency || 'NGN',
      feeBearer: obj.feeBearer || '',
      redirectUrl: obj.redirectUrl || '',
      description: obj.description || '',
      metadata: obj.metadata || {},
    };
    return ercaspayOptions;
  }
}

export const provideErcaspay = (secretKey: string, apiKey: string) => [
  { provide: ERCASPAY_SECRET_KEY, useValue: secretKey },
  { provide: ERCASPAY_API_KEY, useValue: apiKey },
  { provide: ErcaspayAngularService, useClass: ErcaspayAngularService },
];
