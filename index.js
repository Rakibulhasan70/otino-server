const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://otino:Y1MU6UCOEef5vbyF@cluster0.faflb.mongodb.net/?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect()
        const infoCollection = client.db('Otino').collection('info')

        // get all product 
        app.get('/info', async (req, res) => {
            const query = {};
            const cursor = infoCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        // add products 
        app.post('/product', async (req, res) => {
            const newProduct = req.body;
            const result = await infoCollection.insertOne(newProduct);
            res.send(result);
        })

    }
    finally {

    }
}

run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('otino is on fire')
})

app.listen(port, () => {
    console.log(`otino listening on port ${port}`);
})