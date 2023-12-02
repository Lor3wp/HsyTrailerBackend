const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
const reservedDatesRoute = require("./routes/reservedDates");
const reservationInfo = require("./routes/reservationInfo");
const deleteReservation = require("./routes/deleteReservation");
const addTempReservation = require("./routes/addTempReservation");
const updateTempReservation = require("./routes/updateTempReservation");
const deleteTempReservation = require("./routes/deleteTempReservation");
const addReservation = require("./routes/addReservation");
const CalendarEntry = require("./schema/CalendarEntry");
const updateReservationById = require("./routes/updateReservationById");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the CORS middleware
require("dotenv").config();

app.use(cors());
app.options('*', cors()); // Handle preflight requests
app.use(express.json());

const port = process.env.PORT || 3000;
const uri = process.env.DATABASE_URL;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
});

app.use("/api/", reservedDatesRoute);
app.use("/api/", reservationInfo);
app.use("/api/", deleteReservation);
app.use("/api/", addTempReservation);
app.use("/api/", updateTempReservation);
app.use("/api/", deleteTempReservation);
app.use("/api/", addReservation);
app.use('/api/', updateReservationById);
