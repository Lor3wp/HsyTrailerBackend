const express = require('express');
const CalendarEntry = require('../schema/CalendarEntry');
const router = express.Router();

router.put('/update-reservation/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const reservation = await CalendarEntry.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
      runValidators: true,
      lean: true,
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
