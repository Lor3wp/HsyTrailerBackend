const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const yourSchema = new Schema({
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
});

// Adding TTL index for expiration
yourSchema.index({ date: 1 }, { expireAfterSeconds: 20 * 60 }); // 20 minutes in seconds

const YourModel = mongoose.model("YourModel", yourSchema);

module.exports = YourModel;
