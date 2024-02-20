const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;


// middleware
app.use(cors())
app.use(express.json())






const uri = "mongodb+srv://PustBcs:HTzAYOWoKaWLmTGz@cluster0.wpfolqw.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const applicationCollection = client.db('PustDb').collection('applications')

    app.get('/applicants', async(req, res) => {
        const result =  await applicationCollection.find().toArray();
        res.send(result)
    })


    app.get('/applications', async(req, res) => {
        const email = req.query.email;
        const query = {email : email}
        const result =  await applicationCollection.find(query).toArray();
        res.send(result)
    })
   
    app.post('/applications', async(req, res) => {
        const query = req.body;
        // console.log(query)
        const result = await applicationCollection.insertOne(query);
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res) => {
    res.send('pust job hunter server running.......')
})

app.listen(port, () => {
    console.log(`pust bcs job hunter running on port ${port}`)
})