HOT TIN FOOD HEATER WEBSITE
============================

Files:
- index.html       Customer product/order page
- admin.html       Admin dashboard
- styles.css       Black/red responsive styling + animations
- script.js        Checkout, QR payment modal, localStorage orders
- payment-qr.png   QR cropped from the payment screenshot supplied by the user

How to run:
1. Keep all files in the same folder.
2. Open index.html in a browser.
3. Submit an order -> scan the QR -> click "I have paid ₹599".
4. Open admin.html to see the order.

Important:
This is a front-end demo. Orders are stored in the browser's localStorage, not a real database.
For production, connect the order/payment flow to a secure backend and verify UPI payments server-side before marking orders paid.

UPDATED PAYMENT FLOW
--------------------
Customer now sees:
- Exact amount to pay: ₹599
- UTR / Transaction Number field
- "Submit payment details" button

Admin now sees:
- Amount Paid
- UTR number
- Payment status: Payment submitted / Verify

This is still a front-end demo. UTR is stored in browser localStorage and is NOT independently verified against a bank/UPI provider. For production, verify the payment on a secure backend before treating an order as paid.

UPDATED ₹599 QR
----------------
The customer payment QR now uses:
upi://pay?pa=gunaalrajan22-1@okicici&pn=Hot%20Tin&am=599.00&cu=INR&tn=Hot%20Tin%20Food%20Heater
So a compatible UPI app should open the payment screen with ₹599 as the requested amount.

Important: a QR can request ₹599, but a front-end website cannot prove that the customer actually paid ₹599. The admin should verify the UTR/payment before dispatch. For true automatic verification, connect a payment gateway/backend.
