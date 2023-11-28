const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
const reservedDatesRoute = require("./routes/reservedDates");
const reservationInfo = require("./routes/reservationInfo");
const deleteReservation = require("./routes/deleteReservation");
const addTempReservation = require("./routes/addTempReservation");
const deleteTempReservation = require("./routes/deleteTempReservation");
const addReservation = require("./routes/addReservation");
const CalendarEntry = require("./schema/CalendarEntry");
const mongoose = require("mongoose");

app.use(express.json());

const availableDatesRoute = require("./routes/availableTimes");

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(express.json());


const uri = "mongodb+srv://test:test@hsytrailer.oa2sewe.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

});



app.use("/api/", reservedDatesRoute);
app.use("/api/", reservationInfo);
app.use("/api/", deleteReservation);
app.use("/api/", addTempReservation);
app.use("/api/", deleteTempReservation);
app.use("/api/", addReservation);

