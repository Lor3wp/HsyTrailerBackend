const mongoose = require('mongoose');

const calendarEntrySchema = new mongoose.Schema({
  station: {
    stationName: String,
    address: String,
  },
  customerInfo: {
    name: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    address: String,
    zipCode: String,
    city: String,
  },
  timeSlot: String,
  product: {
    price: Number,
    name: String,
  },
  isAdapter: Boolean,
  isPrepaid: Boolean,
  date: Date,
  expirationDate: Date,
}
);


calendarEntrySchema.index({expirationDate: 1}, {expireAfterSeconds: 20 * 60}); // 20 minutes in seconds

const CalendarEntry = mongoose.model('CalendarEntry', calendarEntrySchema);

module.exports = CalendarEntry;