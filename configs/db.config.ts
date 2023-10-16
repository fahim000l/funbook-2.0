const { MongoClient, ServerApiVersion } = require("mongodb");
import mongoose from "mongoose";
const uri: string | undefined = process.env.NEXT_PUBLIC_DB_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectMongo() {
  try {
    if (uri) {
      await mongoose.connect(uri);
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export { connectMongo };
