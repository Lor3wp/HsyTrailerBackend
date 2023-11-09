const crypto = require("crypto");
const axios = require("axios");
const { query } = require("express");

// Define your Paytrail credentials and request data
const secret = "SAIPPUAKAUPPIAS";
const merchantId = "375917";

const baseUrl = "https://services.paytrail.com";

// Your request body
const requestBody = {
  stamp: "unique-identifier-for-merchant",
  reference: "3759170",
  amount: 1525,
  currency: "EUR",
  language: "FI",
  items: [
    {
      unitPrice: 1525,
      units: 1,
      vatPercentage: 24,
      productCode: "#1234",
      deliveryDate: "2018-09-01",
    },
  ],
  customer: {
    email: "test.customer@example.com",
  },
  redirectUrls: {
    success: "https://ecom.example.com/cart/success",
    cancel: "https://ecom.example.com/cart/cancel",
  },
};

// Calculate the current timestamp in ISO 8601 format
const timestamp = new Date().toISOString();

// Generate a unique nonce (you should use your own method to generate a nonce)
const nonce = "YOUR_NONCE";

// Function to calculate HMAC signature
const calculateHmac = (secret, params, body) => {
  const hmacPayload = Object.keys(params)
    .sort()
    .map((key) => [key, params[key]].join(":"))
    .concat(body ? JSON.stringify(body) : "")
    .join("\n");

  return crypto.createHmac("sha256", secret).update(hmacPayload).digest("hex");
};

// Prepare request parameters
const requestParams = {
  "checkout-account": merchantId,
  "checkout-algorithm": "sha256",
  "checkout-method": "POST",
  "checkout-nonce": "564635208570151",
  "checkout-timestamp": "2018-07-06T10:01:31.904Z",
};

const params = {
  amount: requestBody.amount,
  groups: "mobile,creditcard",
  language: requestBody.language,
};
const signature = calculateHmac(secret, requestParams, requestBody);

// Include the calculated signature in your request headers
requestParams.signature = signature;

// Create URL query string
const queryString = Object.keys(params)
  .map((key) => `${key}=${encodeURIComponent(params[key])}`)
  .join("&");

// Make a GET request to Paytrail API with Axios
axios
  .post(`${baseUrl}/payments`, {
    headers: {
      "checkout-account": merchantId,
      "checkout-algorithm": "sha256",
      "checkout-method": "POST",
      "checkout-nonce": "564635208570151",
      "checkout-timestamp": "2018-07-06T10:01:31.904Z",
      signature: signature,
    },
    data: requestBody, // Include the request body
  })
  .then((response) => {
    console.log("Response:", response.data);
  })
  .catch((error) => {
    if (error.response) {
      console.error("API Error:", error);
    } else {
      console.error("Request failed:", error.message);
    }
  });

console.log(`${baseUrl}/merchants/grouped-payment-providers?${queryString}`);
console.log("3708f6497ae7cc55a2e6009fc90aa10c3ad0ef125260ee91b19168750f6d74f6");
console.log(signature);
