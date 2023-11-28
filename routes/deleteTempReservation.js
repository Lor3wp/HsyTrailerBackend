const express = require("express");
const router = express.Router();
const CalendarEntry = require("../schema/CalendarEntry");

router.delete("/delete-temp-reservation/:uuid", async (req, res) => {
  const { uuid } = req.params;

  try {
    const result = await CalendarEntry.deleteOne({ uuid: uuid });

    if (result.deletedCount === 1) {
      res.json({ message: "Temp reservation deleted successfully" });
    } else {
      res.status(404).json({ message: "Temporary reservation not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
// change