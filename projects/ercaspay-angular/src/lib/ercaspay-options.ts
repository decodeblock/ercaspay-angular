import { EventEmitter } from '@angular/core';

export interface ErcaspayOptions {
  /**
   * The amount to be paid by the customer. (In Kobo for Naira)
   */
  amount: number;
  /**
   * Merchant's Unique reference for the transaction.
   */
  paymentReference: string;
  /**
   * Comma seperated string of payment methods (card, bank-transfer, qrcode, ussd, etc.). If not specified, all available payment methods enabled on the merchant dashboard will be used.
   */
  paymentMethods: string;
  /**
   * Full name of the customer.
   */
  customerName: string;
  /**
   * Email address of the customer.
   */
  customerEmail: string;
  /**
   * Phone number of the customer.
   */
  customerPhoneNumber?: string;
  /**
   * The currency you want to receive payment in. If this is not specified, we use NGN as the default currency. A list of supported currencies are available on the landing page
   */
  currency: string;
  /**
   * The bearer of the charge (either customer or merchant). If not selected, we use the set default on the merchant account. This can be found under settings -> charges
   */
  feeBearer?: string;
  /**
   * A URL which user will be redirected to, on completion of the payment, if not specified, the default merchant redirect url will be used.
   */
  redirectUrl?: string;
  /**
   * Description for the transaction.
   */
  description?: string;
  /**
   *  Custom Details
   */
  metadata?: {};
}

export interface Device {
  browser: string;
  browserDetails: {};
}

export interface PayerDeviceDto {
  device: Device;
  ipAddress: string;
}

export interface DeviceDetails {
  payerDeviceDto: PayerDeviceDto;
  ipAddress: string;
}

export interface ErcaspayDIOptions {
  /**
   * An encripted version of a card details. Card details should be encripted with RSA algorithm
   */
  payload: string;
  /**
   * This contains the device details
   */
  deviceDetails: DeviceDetails;
  ipAddress?: string;
}

// ErcasPay Direct Intigration (DI)
export interface PrivateErcaspayDIOptions extends ErcaspayDIOptions {
  callback: (response?: any) => void;
  onClose: () => void;
  init: () => void;
}

export interface PrivateErcaspayDIOptionsWithEmitters extends ErcaspayDIOptions {
  callback: EventEmitter<any>;
  onClose: EventEmitter<void>;
  init: EventEmitter<void>;
}

// Ercaspay Checkout Interfaces
export interface PrivateErcaspayOptions extends ErcaspayOptions {
  callback: (response?: any) => void;
  onClose: () => void;
  init: () => void;
}

export interface PrivateErcaspayOptionsWithEmitters extends ErcaspayOptions {
  callback: EventEmitter<any>;
  onClose: EventEmitter<void>;
  init: EventEmitter<void>;
}
