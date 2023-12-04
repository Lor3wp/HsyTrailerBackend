const mongoose = require('mongoose');

const calendarEntrySchema = new mongoose.Schema({
  station: String,

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
  product: String,
  isAdapter: Boolean,
  isPrepaid: Boolean,
  date: Date,
  rating: Number,
  feedback: String,
  isItemReturned: Boolean,
  returnedAt: { type: Date, default: null },
  uuid: String,
});

calendarEntrySchema.index({ expirationDate: 1 }, { expireAfterSeconds: 20 * 60 }); // 20 minutes in seconds

const CalendarEntry = mongoose.model('calendarentries', calendarEntrySchema);

module.exports = CalendarEntry;
