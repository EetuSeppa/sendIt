const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
const PORT = 8000;
const db = process.argv[2]; //Read db address from command line arguments
const dbName = "sendIt"

const dbClient = new MongoClient(db);

app.use(express.json());
app.use(cors());

app.post('/saveRoute', function (req, res, next) {
    dbClient.connect ((err, client) => {
        if (err) {
            console.log(err);
        }
        const db = client.db(dbName);
        db.collection("routes").insertOne({
            name: req.body.name,
            description: req.body.description,
            feet: req.body.feet,
            grade: req.body.grade,
            holds: req.body.holds
        });
    });
   res.status(202).send();
});

app.listen(PORT, ()=>console.log("Listening on port: ", PORT));