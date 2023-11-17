// Asiakas hakee vapaat päivämäärät kalenteria ja aikaa varten tietyltä asemalta sekä tietylle tuotteelle Karoliina
const express = require('express');
const router = express.Router();
const CalendarEntry = require('../schema/CalendarEntry');

// Get available dates by station and selected product 
router.get('/available-dates', async (req, res) => {
  const { station, product } = req.query;

  try {
    const availableDates = await CalendarEntry.find({
      station,
      product,
      reserved: false,
    }).select('date');
    res.json(availableDates);
    console.log('available dates HERE', availableDates);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;