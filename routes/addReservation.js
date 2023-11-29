const CalendarEntry = require("../schema/CalendarEntry");
const express = require("express");
const router = express.Router();

router.post("/add-reservation", async (req, res) => {
  const {
    station,
    customerInfo: {
      name,
      lastName,
      phoneNumber,
      email,
      address,
      zipCode,
      city,
    },
    timeSlot,
    product,
    isAdapter,
    isPrepaid,
    date,
    uuid,
  } = req.body;

  const newCalendarEntry = new CalendarEntry({
    station,
    customerInfo: {
      name,
      lastName,
      phoneNumber,
      email,
      address,
      zipCode,
      city,
    },
    timeSlot,
    product,
    isAdapter,
    isPrepaid,
    date,
  });

  try {
    const updatedReservation = await CalendarEntry.findOneAndUpdate(
      { uuid: uuid },
      { $set: { ...newCalendarEntry.toObject(), _id: undefined } },
      { new: true } // Set new to true to return the updated document
    );

    if (updatedReservation) {
      res.status(200).json({
        message: "Reservation updated successfully",
        updatedReservation,
      });
    } else {
      res
        .status(404)
        .json({ error: "Reservation not found with the specified uuid" });
    }
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
