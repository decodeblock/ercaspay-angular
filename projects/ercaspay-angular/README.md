# Ercaspay Angular Library

**Ercaspay Angular Library** provides a simple and customizable way to integrate the Ercaspay checkout button into Angular 14+ standalone applications. It allows developers to initiate payments with ease.

---

## Table of Contents

- [Ercaspay Angular Library](#ercaspay-angular-library)
  - [Table of Contents](#table-of-contents)
  - [1. Installation](#1-installation)
  - [2. Setup and Initialization](#2-setup-and-initialization)
    - [`src/app/app.config.ts`](#srcappappconfigts)
    - [Explanation:](#explanation)
  - [3. Usage Example](#3-usage-example)
    - [`src/app/app.component.ts`](#srcappappcomponentts)
    - [`src/app/app.component.html`](#srcappappcomponenthtml)
    - [Explanation:](#explanation-1)
  - [4. Configuration Options](#4-configuration-options)
  - [5. How It Works](#5-how-it-works)
  - [6. Styling](#6-styling)
  - [7. Event Handling](#7-event-handling)
  - [Conclusion](#conclusion)

---

## 1. Installation

To use the library, first install it using **npm**:

```bash
npm install @decodeblock/ercaspay-angular
```

- **Why**: This command downloads the library into your project, making it available for import and usage.

---

## 2. Setup and Initialization

To use Ercaspay, you need to initialize the service with your **public key** and **secret key**. This is done in your `appConfig` file using Angular's `providers`.

### `src/app/app.config.ts`

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideErcaspay } from '@decodeblock/ercaspay-angular';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]), // Provide app routes
    provideErcaspay(   
      'ECRS-TEST-SK-yourSecretKey', // Replace with your Ercaspay Secret Key
      'ECRS-TEST-AK-yourApiKey'     // Replace with your Ercaspay API Key
    ),
    provideHttpClient() // Provide HTTP client to make API requests
  ],
};
```

### Explanation:
1. **`provideErcaspay()`**: Initializes the Ercaspay library with your credentials.
2. **`provideHttpClient()`**: Required because the library uses HTTP to communicate with the Ercaspay API.
3. **Why**: Initialization ensures that the Ercaspay service is globally available for use across your app.

---

## 3. Usage Example

You can use the Ercaspay checkout button directly in your component.

### `src/app/app.component.ts`

```typescript
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ErcaspayCheckoutButtonComponent } from '@decodeblock/ercaspay-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ErcaspayCheckoutButtonComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  options = {
    amount: 10000, // Amount in kobo (10000 = 100 NGN)
    customerEmail: 'user@mail.com',
    paymentReference: this.generateUniqueReference(),
    paymentMethods: 'card,bank-transfer,ussd,qrcode',
    customerName: 'John Doe',
    currency: 'NGN',
    redirectUrl: 'http://localhost:4200/',
  };

  onSuccess(event: any) {
    console.log('Payment Success:', event);
  }

  onFailure(event: any) {
    console.log('Payment Failed:', event);
  }

  generateUniqueReference(): string {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000000);
    return `ref_${timestamp}_${randomNum}`;
  }
}
```

### `src/app/app.component.html`

```html
<div class="mt-3">
  <lib-ercaspay-checkout-button
    [buttonClass]="'btn btn-primary'"
    [ercaspayOptions]="options"
    (paymentSuccess)="onSuccess($event)"
    (paymentFailure)="onFailure($event)"
  >
    Pay with Ercaspay
  </lib-ercaspay-checkout-button>
</div>
```

---

### Explanation:
1. **`[buttonClass]`**: Passes custom button classes for styling (e.g., `btn btn-primary` for Bootstrap).
2. **`[ercaspayOptions]`**: Defines the payment options (amount, email, reference, etc.).
3. **`(paymentSuccess)` and `(paymentFailure)`**: Handles events emitted after payment success or failure.
4. **`generateUniqueReference()`**: Ensures every payment has a unique reference.

---

## 4. Configuration Options

Here are the options you can pass into the Ercaspay button component:

| Option             | Type      | Required | Description                               |
|--------------------|-----------|----------|-------------------------------------------|
| `amount`          | `number`  | Yes      | Payment amount in **kobo** (e.g., 10000 = 100 NGN). |
| `customerEmail`   | `string`  | Yes      | Email address of the customer.            |
| `paymentReference`| `string`  | Yes      | Unique payment reference for tracking.    |
| `paymentMethods`  | `string`  | No       | Payment methods (e.g., `card,bank-transfer`). |
| `customerName`    | `string`  | No       | Name of the customer.                     |
| `currency`        | `string`  | Yes      | Currency code (e.g., `NGN` for Naira).    |
| `redirectUrl`     | `string`  | No       | URL to redirect the user after payment.   |

---

## 5. How It Works

1. **Initialization**:
   - The library is initialized with your **API keys** using `provideErcaspay()` in the `appConfig`.
   - It allows the library to communicate securely with the Ercaspay API.

2. **Checkout Button**:
   - `lib-ercaspay-checkout-button` renders a button with customizable styles.
   - On click, the button triggers the Ercaspay checkout process using the provided options.

3. **Events**:
   - The library emits `paymentSuccess` or `paymentFailure` events after the transaction completes.
   - You can listen to these events to handle the response accordingly.

---

## 6. Styling

You can pass any custom class to the button using `[buttonClass]`.

Example using **Bootstrap** classes:

```css
.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.3rem;
  font-size: 1rem;
}

.btn-primary {
  color: white;
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0b5ed7;
}
```

---

## 7. Event Handling

You can listen for these two events:

1. **`paymentSuccess`**:
   - Triggered when the payment succeeds.
   - Example:
     ```typescript
     onSuccess(event: any) {
       console.log('Payment Success:', event);
     }
     ```

2. **`paymentFailure`**:
   - Triggered when the payment fails.
   - Example:
     ```typescript
     onFailure(event: any) {
       console.log('Payment Failed:', event);
     }
     ```

---

## Conclusion

This library makes it simple to integrate **Ercaspay** into your Angular standalone application. By following the steps above, you can easily initiate payments, customize the checkout button, and handle payment events.

Note: This library is far from complete, and more functionalities will be added in more recent versions.

For any issues or questions, please contact support or open a GitHub issue.
