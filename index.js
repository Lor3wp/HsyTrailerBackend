const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const availableDatesRoute = require('./routes/availableTimes');
const CalendarEntry = require("./schema/CalendarEntry");
const mongoose = require("mongoose");

app.use(express.json());

const uri = "mongodb+srv://test:test@hsytrailer.oa2sewe.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  // Insert test data
  const testData = [
    {
      station: {
        stationName: 'Konala',
        address: 'Betonitie 3',
      },
      customerInfo: {
        name: 'Karoliina',
        lastName: 'Multas',
        phoneNumber: '040123123',
        email: 'karoliina@example.com',
        address: 'Nihtitorpankuja 1',
        zipCode: '02630',
        city: 'Espoo',
      },
      timeSlot: '10-12',
      product: {
        price: 5,
        name: 'trailer',
      },
      isAdapter: true,
      isPrepaid: false,
      date: new Date(),
      expirationDate: new Date('2300, 10, 17'),
    }
    // { date: new Date(), station: 'Konala', product: 'trailer', reserved: false },
    // { date: new Date(), station: 'Kivistö', product: 'trailer', reserved: false },
  ];

  try {
    await CalendarEntry.insertMany(testData);
    console.log('Test data inserted successfully');

    // Start the Express server after inserting test data
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error inserting test data:', error);
  }
});

app.get("/api/hello", (req, res) => {
  res.json({ moi: "moi" });
});

app.use("/api/", availableDatesRoute);

// HsyReservations.Reservation

// TODO: get and post methods

// Asiakas hakee vapaat päivämäärät kalenteria ja aikaa varten tietyltä asemalta sekä tietylle tuotteelle Karoliina
//
// Muokkaa omaa varausta nettisivu Karoliina
// -> nouda kaikki omat tiedot siitä varauksesta tai useammasta useammalta päivältä
// -> poista varaus jos on yli 24h varaukseen
//
// Täytä henkilötiedot nappi Pavel
// -> tarkista varattava tuote pv ja aika vapaus
// -> tee väliaikainen varaus exiresAt ehdolla joka tuhoutuu vartin jälkeen
// -> tarkista ettei asiakkaalla ole jo varausta sille päivälle (vain yksi varaus per asiakas per päivä)
//
// Lisää varaus Pavel 
// -> lisää varaus tietoineen tietokantaan
// -> poista väliaikainen varaus
//

// TODO: new mongodb collection for data collection
// -> kuinka kauan peräkärry oli vuokrattu
// -> asiakkaan palaute
// -> 
// 
// 
// {
// "station": {
//   "stationName": "Station A",
//   "address": "123 Main Street"
// },
// "customerInfo": {
//   "name": "Pavel",
//   "lastName": "Kozyar",
//   "phoneNumber": "555-555-5555",
//   "email": "Pavel@gmail.com",
//   "address": "Majurinkulma 2 a",
//   "zipCode": "020200",
//   "city": "espoo"
// },
// "timeSlot": {
//   "start": "11.00",
//   "end": "13.00"
// },
// "product": {
//   "price": {"$numberInt": "5"},
//   "name": "Trailer"
// },
// "isAdapter": true,
// "isPrepaid": false,
//   "date": "23.03.2023"
// }