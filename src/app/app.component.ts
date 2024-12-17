import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErcaspayCheckoutButtonComponent } from '../../projects/ercaspay-angular/src/public-api';

@Component({
  selector: 'app-root',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [RouterOutlet, ErcaspayCheckoutButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Decodeblock';

  options = {
    amount: 10000,
    customerEmail: "user@mail.com",
    paymentReference: this.generateUniqueReference(),
    paymentMethods: "card,bank-transfer,ussd,qrcode",
    customerName: "John Doe",
    currency: "NGN",
    redirectUrl: 'http://localhost:4200/'
  };

  onSuccess(event: any) {
    console.log('Payment Success:', event);
  }

  onFailure(event: any) {
    console.log('Payment Failed:', event);
  }

  generateUniqueReference(): string {
    const timestamp = Date.now(); // Current timestamp
    const randomNum = Math.floor(Math.random() * 1000000); // Random number
    return `ref_${timestamp}_${randomNum}`; // Concatenate to form the unique reference
  }
}
