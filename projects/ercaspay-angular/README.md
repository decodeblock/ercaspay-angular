```md
# Ercaspay Angular Library

A simple Angular library to integrate the Ercaspay payment gateway into your Angular 14+ application using standalone components.

## Installation

```bash
npm install ercaspay-angular
```

## Usage

### Standalone Component Setup

In your root component, import `ErcaspayAngularService` and provide it in the `providers`:

```typescript
import { ErcaspayAngularService } from 'ercaspay-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [
    {
      provide: ErcaspayAngularService,
      useFactory: () => new ErcaspayAngularService('your-public-key-here')
    }
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-app';
}
```

### Usage in Standalone Component

You can use the `ercaspay-checkout-button` component in your template:

```html
<lib-ercaspay-checkout-button 
  [options]="paymentOptions" 
  (paymentSuccess)="onPaymentSuccess($event)" 
  (paymentFailure)="onPaymentFailure($event)">
  Pay with Ercaspay
</lib-ercaspay-checkout-button>
```

### Component Inputs

- `options`: Payment options object. Example:

  ```typescript
  paymentOptions = {
    amount: 50000,
    customerEmail: 'user@mail.com',
    paymentReference: 'random-reference',
    paymentMethods: 'card',
    currency: 'NGN'
  };
  ```

### Component Outputs

- `paymentSuccess`: Emits when the payment is successful.
- `paymentFailure`: Emits when the payment fails.

### Example:

```typescript
export class PaymentComponent {
  paymentOptions = {
    amount: 50000,
    customerEmail: 'user@mail.com',
    paymentReference: 'random-reference',
    paymentMethods: 'card',
    currency: 'NGN'
  };

  onPaymentSuccess(response: any) {
    console.log('Payment successful', response);
  }

  onPaymentFailure(error: any) {
    console.log('Payment failed', error);
  }
}
```

## Contributing

We welcome contributions! Please fork the repository and create a pull request with any changes or improvements.

## License

MIT License
```
