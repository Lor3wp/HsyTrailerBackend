# HsyTrailerBackend
Backend for hsy trailer innovation project

## API Endpoints

### <span>`GET`</span> - `/reservation-info-by-id/:id`
***Summary***

Get a reservation with specified id.

 ***Response***
`application/json`
```json
{
  "customerInfo": {
    "name": "John",
    "lastName": "Doe",
    "phoneNumber": "1234567890",
    "email": "john.doe@example.com",
    "address": "123 Main St",
    "zipCode": "12345",
    "city": "City"
  },
  "_id": "656b948c53fce92af70b34f4",
  "station": "Konala",
  "timeSlot": "20-23",
  "product": "trailer",
  "isPrepaid": false,
  "date": "2023-12-02T00:00:00.000Z",
  "uuid": "27345678-1234-1234-1234-123456789012",
  "__v": 0,
  "isAdapter": false,
  "feedback": "feedback",
  "rating": 3,
  "isItemReturned": true,
  "returnedAt": "2023-12-02T23:37:43.929Z"
}
```

### <span>`GET`</span> - `/reservation-info-by-email?email=email`
***Summary***

Get a reservation with specified email.

 ***Response***
`application/json`
```json
[
  {
    "customerInfo": {
      "name": "John",
      "lastName": "Doe",
      "phoneNumber": "1234567890",
      "email": "john.doe@example.com",
      "address": "123 Main St",
      "zipCode": "12345",
      "city": "City"
    },
    "_id": "656b948c53fce92af70b34f4",
    "station": "Konala",
    "timeSlot": "20-23",
    "product": "trailer",
    "isPrepaid": false,
    "date": "2023-12-02T00:00:00.000Z",
    "uuid": "27345678-1234-1234-1234-123456789012",
    "__v": 0,
    "isAdapter": false,
    "feedback": "wwaa",
    "rating": 3,
    "isItemReturned": true,
    "returnedAt": "2023-12-02T23:37:43.929Z"
  },
]
```

### <span>`GET`</span> - `/reserved-dates?station=stationName&product=productName`
***Summary***

Get reserved dates by station and product name.

 ***Response***
`application/json`
```json
[
  {
    "_id": "656e4f27bb540e0c09110f09",
    "timeSlot": "15-23",
    "date": "2023-12-06T00:00:00.000Z"
  },
  {
    "_id": "657080640d6149dd9976fa4d",
    "timeSlot": "15-17",
    "date": "2023-12-06T00:00:00.000Z"
  }
]
```

### <span>`GET`</span> - `/available-dates?station=stationName&product=productName`
***Summary***

Get available dates by station and product name.

 ***Response***
`application/json`
```json
[
  {
    "_id": "657080640d6149dd9976fa4d",
    "date": "2023-12-06T00:00:00.000Z"
  }
]
```

### <span>`POST`</span> - `/add-temp-reservation`
***Summary***

Create a temporary/timed reservation.

***Request***
`application/json`
```json
{
  "station": "Konala",
  "timeSlot": "15-17",
  "product": "trailer",
  "date": "2023-12-06",
  "uuid": "92445678-1234-1234-1234-123456789012"
}
```

 ***Response***
`application/json`
```json
{
  "message": "tempreservation successful, expiration date: Wed Dec 06 2023 16:28:36 GMT+0200 (Eastern European Standard Time)",
  "savedCalendarEntry": {
    "station": "Konala",
    "customerInfo": {
      "name": "TTLFillerData",
      "lastName": "TTLFillerData",
      "phoneNumber": "TTLFillerData",
      "email": "TTLFILLERDATA",
      "address": "TTLFillerData",
      "zipCode": "TTLFillerData",
      "city": "TTLFillerData"
    },
    "timeSlot": "15-17",
    "product": "trailer",
    "isPrepaid": false,
    "date": "2023-12-06T00:00:00.000Z",
    "returnedAt": null,
    "uuid": "92445678-1234-1234-1234-123456789012",
    "_id": "657080640d6149dd9976fa4d",
    "__v": 0
  }
}
```

### <span>`POST`</span> - `/add-reservation`
***Summary***

Create reservation.

***Request***
`application/json`
```json
{
  "station": "Konala",
  "customerInfo": {
    "name": "John",
    "lastName": "Doe",
    "phoneNumber": "1234567890",
    "email": "john.doe@example.com",
    "address": "123 Main St",
    "zipCode": "12345",
    "city": "City"
  },
  "timeSlot": "15-23",
  "product": "trailer",
  "isAdapter": false,
  "isPrepaid": false,
  "date": "2023-12-06",
  "uuid": "92445678-1234-1234-1234-123456789012"
}
```

 ***Response***
`application/json`
```json
{
  "message": "Reservation updated successfully",
  "updatedReservation": {
    "customerInfo": {
      "name": "John",
      "lastName": "Doe",
      "phoneNumber": "1234567890",
      "email": "john.doe@example.com",
      "address": "123 Main St",
      "zipCode": "12345",
      "city": "City"
    },
    "_id": "656e4f27bb540e0c09110f09",
    "station": "Konala",
    "timeSlot": "15-23",
    "product": "trailer",
    "isPrepaid": false,
    "date": "2023-12-06T00:00:00.000Z",
    "returnedAt": null,
    "uuid": "92445678-1234-1234-1234-123456789012",
    "__v": 0,
    "isAdapter": false
  }
}
```

### <span>`POST`</span> - `/update-temp-reservation`
***Summary***

Update temporary reservation.

***Request***
`application/json`
```json
{
  "station": "Ruskeasanta",
  "timeSlot": "14-17",
  "product": "trailer",
  "date": "2023-12-08",
  "isAdapter": false,
  "uuid": "92445678-1234-1234-1234-123456789012"
}
```

 ***Response***
`application/json`
```json
{
  "message": "Updating tempreservation was successful, expiration date: Wed Dec 06 2023 18:07:37 GMT+0200 (Eastern European Standard Time)",
  "updatedReservation": {
    "customerInfo": {
      "name": "TTLFillerData",
      "lastName": "TTLFillerData",
      "phoneNumber": "TTLFillerData",
      "email": "TTLFILLERDATA",
      "address": "TTLFillerData",
      "zipCode": "TTLFillerData",
      "city": "TTLFillerData"
    },
    "_id": "656e4f27bb540e0c09110f09",
    "station": "Ruskeasanta",
    "timeSlot": "14-17",
    "product": "trailer",
    "isPrepaid": false,
    "date": "2023-12-08T00:00:00.000Z",
    "returnedAt": null,
    "uuid": "92445678-1234-1234-1234-123456789012",
    "__v": 0,
    "isAdapter": false
  }
}
```

### <span>`PUT`</span> - `/update-reservation/:id`
***Summary***

Update reservation with specified id.

***Request***
`application/json`
```json
{
  "rating": 5,
  "feedback": "feedback"
}
```

 ***Response***
`application/json`
```json
{
  "_id": "656b9eb6def9005f890156ab",
  "station": "dd",
  "customerInfo": {
    "name": "John",
    "lastName": "Doe",
    "phoneNumber": "1234567890",
    "email": "john.doe@example.com",
    "address": "123 Main St",
    "zipCode": "12345",
    "city": "City"
  },
  "timeSlot": "20-23",
  "product": "bike",
  "isPrepaid": false,
  "date": "2023-12-02T00:00:00.000Z",
  "returnedAt": "2023-12-02T21:16:46.571Z",
  "uuid": "72345678-1234-1234-1234-123456789012",
  "__v": 0,
  "isAdapter": false,
  "isItemReturned": true,
  "feedback": "feedback",
  "rating": 5
}
```

### <span>`DELETE`</span> - `/delete-reservation/:id`
***Summary***

Delete a reservation with specified id.

***Request***
`application/json`

 ***Response***
`application/json`
```json
{
  "message": "Reservation deleted successfully"
}
```

### <span>`DELETE`</span> - `/delete-temp-reservation/:uudi`
***Summary***

Delete temporary reservation with specified uuid.

***Request***
`application/json`

 ***Response***
`application/json`
```json
{
  "message": "Temp reservation deleted successfully"
}
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Lor3wp/HsyTrailerBackend/blob/main/LICENSE) file for details.
