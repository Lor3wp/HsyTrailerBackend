const CalendarEntry = require("../schema/CalendarEntry");
const express = require("express");
const router = express.Router();

// Helper function to check if there's an existing reservation


router.post("/update-temp-reservation", async (req, res) => {
  const { uuid, station, timeSlot, product, date, isAdapter } = req.body;
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
    const existingReservation = await CalendarEntry.findOne({ uuid: uuid });
    if (!existingReservation) {
      const savedCalendarEntry = await newCalendarEntry.save();

      res
        .status(201)
        .json(savedCalendarEntry, { message: "succesful temp reservation" });
    } else {
      try {
        const updatedReservation = await CalendarEntry.findOneAndUpdate(
          { uuid: uuid },
          { $set: { ...newCalendarEntry.toObject(), _id: undefined } },
          { new: true } // Set new to true to return the updated document
        );

        if (updatedReservation) {
          console.log(updatedReservation);
          res.status(201).json({
            message: `Updating tempreservation was successful, expiration date: ${expirationDate}`,
            updatedReservation,
          });
        } else {
          res.status(500).json({ error: "Failed to update calendar entry" });
        }
      } catch (error) {
        res.json("error");
      }
    }
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
