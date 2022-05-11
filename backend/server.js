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

app.get('/getRoutes', function (req, res, next) {

    dbClient.connect ((err, client) => {
        if (err)
            console.log(err);
        const db = client.db(dbName);
        
        db.collection("routes").find({}).toArray((err, routes) => {
            let resObj = {
                routes: []
            };

            routes.forEach((element) => {
                resObj.routes.push({
                    name: element.name,
                    description: element.description,
                    feet: element.feet,
                    grade: element.grade,
                    holds: element.holds
                });
            });
            res.status(200).send(JSON.stringify(resObj));
        });
    });
});

app.post('/filterRoutes', function (req, res, next) {
    let query = {
        grade: {$gte: req.body.gradeLow, $lte: req.body.gradeHigh},
    };

    dbClient.connect ((err, client) => {
        if (err)
            console.log(err);
        const db = client.db(dbName);
        
        db.collection("routes").find(query).toArray((err, routes) => {
            let resObj = {
                routes: []
            };

            routes.forEach((element) => {
                resObj.routes.push({
                    name: element.name,
                    description: element.description,
                    feet: element.feet,
                    grade: element.grade,
                    holds: element.holds
                });
            });
            res.status(200).send(JSON.stringify(resObj));
        });
    });

});

app.listen(PORT, ()=>console.log("Listening on port: ", PORT));