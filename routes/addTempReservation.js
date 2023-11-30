const CalendarEntry = require("../schema/CalendarEntry");
const express = require("express");
const router = express.Router();

router.post("/add-temp-reservation", async (req, res) => {
  const { uuid, station, timeSlot, product, date } = req.body;

  // Check if there are less than 4 reservations for the given day and time slot
  try {
    const existingReservationsCount = await CalendarEntry.countDocuments({
      station,
      timeSlot,
      date,
      product,
    });

    if (existingReservationsCount < 4) {
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

      const savedCalendarEntry = await newCalendarEntry.save();

      if (savedCalendarEntry) {
        console.log(savedCalendarEntry);
        res.status(201).json({
          message: `tempreservation successful, expiration date: ${expirationDate}`,
          savedCalendarEntry,
        });
      } else {
        res.status(500).json({ error: "Failed to save calendar entry" });
      }
    }
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
