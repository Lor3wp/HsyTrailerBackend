const express = require('express');
const router = express.Router();
const CalendarEntry = require('../schema/CalendarEntry');

router.get('/reserved-dates', async (req, res) => {
  const { station, product } = req.query;

  try {
    const reservedDates = await CalendarEntry.find({
      station,
      product,
    }).select('date timeSlot');

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time components to midnight

    const reservedDatesInFuture = reservedDates.filter((item) => {
      const itemDate = new Date(item.date);
      itemDate.setHours(0, 0, 0, 0); // Set time components to midnight
      return itemDate >= currentDate;
    });

    res.json(reservedDatesInFuture);
    console.log('Reserved dates and timeslots in the future:', reservedDatesInFuture);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;