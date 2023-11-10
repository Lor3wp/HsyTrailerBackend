const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require("fs");

const uri =
  "mongodb+srv://test:test@hsytrailer.oa2sewe.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tlsCAFile: "cacert.pem", // Path to CA certificate
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("HsyReservations"); // Replace with your actual database name
    const collection = database.collection("Reservation"); // Replace with your actual collection name

    // Query for documents with a "date" field matching "23.03.2023"
    const query = { date: "23.03.2023" };
    const result = await collection.find(query).toArray();

    // Print the results
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
run().catch(console.dir);

// HsyReservations.Reservation
