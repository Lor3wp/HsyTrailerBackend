const express = require('express');
const router = express.Router();
const CalendarEntry = require('../schema/CalendarEntry');


router.delete('/delete-reservation/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await CalendarEntry.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      res.json({ message: 'Reservation deleted successfully' });
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;