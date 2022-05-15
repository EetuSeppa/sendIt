const users = require('./UserDatabase');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const { addRouteToUser } = require('./UserDatabase');

const app = express();
const PORT = 8000;
const db = process.argv[2]; //Read db address from command line arguments
const dbName = "sendIt";

const dbClient = new MongoClient(db);

app.use(express.json());
app.use(cors());

app.post('/addUser', function (req, res, next) {
    users.addUser(req.body.username, dbClient);
});

app.post('/getClimbedRoutes', function (req, res, next) {
   users.retrieveClimbedRoutes(req.body, dbClient).then((result)=> {
       if (result) {
            res.send(JSON.stringify(result));
        } else {
            res.send().status(404);
        }
   })
});

app.post('/addRouteReview', function (req, res, next) {
    dbClient.connect ((err, client) => {
        if (err) {
            console.log(err);
        }
        //Adds a climbed route to user element
        users.addRouteToUser(req.body, dbClient);
    })
});

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
            holds: req.body.holds,
            date: new Date(),
            username: req.body.username
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

            if (routes.length > 0) {

                routes.forEach((element) => {
                    resObj.routes.push({
                        name: element.name,
                        description: element.description,
                        feet: element.feet,
                        grade: element.grade,
                        holds: element.holds,
                        username: element.username,
                        date: element.date
                    });
                });
                res.status(200).send(JSON.stringify(resObj));
            } else {
                res.status(200).send();
            }
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