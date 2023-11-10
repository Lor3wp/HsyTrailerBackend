const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const uri =
  "mongodb+srv://test:test@hsytrailer.oa2sewe.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/api/hello", (req, res) => {
  dbHandshake();
  res.json({ moi: "moi" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function dbHandshake() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("HsyReservations"); // Replace with your actual database name
    const collection = database.collection("Reservation"); // Replace with your actual collection name

    // Query for documents with a "date" field matching "23.03.2023"
    const query = { date: "23.03.2023" };
    const result = await collection.find(query).toArray();

    // Print the results
    return result;
    console.log("Results:");
    console.log(result);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

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