import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ErcaspayAngularService } from '../ercaspay-angular.service';
import { ErcaspayOptions, PrivateErcaspayOptions } from '../ercaspay-options';

@Component({
  selector: 'lib-ercaspay-checkout-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="initiatePayment()" [ngClass]="buttonClass">
      <ng-content></ng-content>
    </button>
  `,
})
export class ErcaspayCheckoutButtonComponent {
  @Input() ercaspayOptions: ErcaspayOptions = {
    amount: 0,
    paymentReference: '',
    paymentMethods: '',
    customerName: '',
    customerEmail: '',
    currency: '',
    customerPhoneNumber: '',
    feeBearer: '',
    redirectUrl: '',
    description: '',
    metadata: ''
  }; // Payment options
  @Input() buttonClass: string = ''; // Custom CSS class
  @Input() buttonStyle: { [key: string]: string } = {}; // Inline styles

  @Output() paymentInit = new EventEmitter();
  @Output() paymentSuccess = new EventEmitter();
  @Output() paymentFailure = new EventEmitter();

  public _ercaspayOptions!: Partial<PrivateErcaspayOptions>; // tslint:disable-line

  constructor(private ercaspayService: ErcaspayAngularService) {}

  initiatePayment() {
    let errorText = '';
    if (this.ercaspayOptions && Object.keys(this.ercaspayOptions).length >= 2) {
      errorText = this.valdateInput(this.ercaspayOptions);
      this.generateOptions(this.ercaspayOptions);
    } else {
      errorText = this.valdateInput(this.ercaspayOptions);
      this.generateOptions(this.ercaspayOptions);
    }
    if (errorText) {
      console.error(errorText);
    }

    // Handle logic to initialize payment
    console.log('Initializing payment with options:', this._ercaspayOptions);
    this.ercaspayService.initiatePayment(this._ercaspayOptions).subscribe(
      (response) => {
        console.log('Checkout initiated:', response.responseBody.checkoutUrl);
        this.paymentSuccess.emit(...response);
        window.open(response.responseBody.checkoutUrl, '_blank');
      },
      (error) => {
        console.error('Checkout initiation failed:', error);
        // Handle errors
      }
    );
  }

  valdateInput(obj: ErcaspayOptions) {
    if (!this.paymentSuccess.observers.length) {
      return 'ANGULAR-ERCASPAY: Insert a callback output like so (callback)=\'PaymentComplete($event)\' to check payment status';
    }
    return this.ercaspayService.checkInput(obj);
  }

  generateOptions(obj: ErcaspayOptions) {
    this._ercaspayOptions = this.ercaspayService.getErcaspayOptions(obj);
    this._ercaspayOptions.callback = (...response) => {
      this.paymentSuccess.emit(...response);
    };
  }
}
