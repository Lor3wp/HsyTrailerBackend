const express = require('express');
const router = express.Router();
const CalendarEntry = require('../schema/CalendarEntry');

router.get('/reservation-info-by-email', async (req, res) => {
  const { email } = req.query;

  try {
    const reservationInfo = await CalendarEntry.find({
      'customerInfo.email': email,
    }).select('');

    res.json(reservationInfo);
    console.log('Reservation information by email:', reservationInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/reservation-info-by-id/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const reservationInfo = await CalendarEntry.findById({_id: id});
    if (!reservationInfo) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservationInfo);
    console.log('Reservation information by email:', reservationInfo);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;