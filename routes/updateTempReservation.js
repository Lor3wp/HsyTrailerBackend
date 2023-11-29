const CalendarEntry = require("../schema/CalendarEntry");
const express = require("express");
const router = express.Router();

router.post("/update-temp-reservation", async (req, res) => {
  const { uuid, station, timeSlot, product, date } = req.body;

  const isAdapter = false;
  const isPrepaid = false;

  // Create a default customerInfo object with TTLFillerData
  const defaultCustomerInfo = {
    name: "TTLFillerData",
    lastName: "TTLFillerData",
    phoneNumber: "TTLFillerData",
    email: "TTLFILLERDATA",
    address: "TTLFillerData",
    zipCode: "TTLFillerData",
    city: "TTLFillerData",
  };

  const customerInfo = defaultCustomerInfo;

  const expirationDate = new Date(Date.now() + 20 * 60 * 1000);
  const newCalendarEntry = new CalendarEntry({
    station,
    customerInfo: {
      name: customerInfo.name,
      lastName: customerInfo.lastName,
      phoneNumber: customerInfo.phoneNumber,
      email: customerInfo.email,
      address: customerInfo.address,
      zipCode: customerInfo.zipCode,
      city: customerInfo.city,
    },
    timeSlot,
    product,
    isAdapter,
    isPrepaid,
    date,
    expirationDate,
    uuid,
  });

  try {
    const updatedReservation = await CalendarEntry.findOneAndUpdate(
      { uuid: uuid },
      { $set: { ...newCalendarEntry.toObject(), _id: undefined } },
      { new: true } // Set new to true to return the updated document
    );

    if (updatedReservation) {
      console.log(savedCalendarEntry);
      res.status(201).json({
        message: `updating tempreservation was successful, expiration date: ${expirationDate}`,
        savedCalendarEntry,
      });
    } else {
      res.status(500).json({ error: "Failed to save calendar entry" });
    }
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
