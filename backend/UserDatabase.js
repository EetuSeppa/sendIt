const MongoClient = require('mongodb').MongoClient;
const dbName = "sendIt";


module.exports = {
    addUser : function (username, dbClient) {
        dbClient.connect ((err, client) => {
            if (err) {
                console.log(err);
            }
            const db = client.db(dbName);
            db.collection("users")
              .findOne({name: username})
              .then((document) => {
                  //If username hasn't been added previously, add new user
                  if (!document) {
                    db.collection("users")
                    .insertOne({
                        name: username,
                        climbedRoutes: []
                    });
                  }
              });
        })
    },

    addRouteToUser: function (info, dbClient) {
        dbClient.connect ((err, client) => {
            if (err) {
                console.log(err);
            }
            const db = client.db(dbName);
            const result = db.collection("users")
                .updateOne(
                    {name: info.username},
                    {$push: {
                        climbedRoutes: {
                            "name": info.routeName,
                            "numOfAttempts": info.numOfAttempts,
                            "date": new Date()
                            }
                        }
                    }
                );
        })
    },


    retrieveClimbedRoutes: function (info, dbClient) {
        return new Promise(function(resolve, reject) {
        //Construct query for finding information of routes
            getRouteNames(info, dbClient).then(routeNames => {
                dbClient.connect((err, client) => {
            
                let queryArr = [];
                let resObj = {
                    routes: []
                };
                let query;

                const db = client.db(dbName);
                if (routeNames.length > 0) {
                    routeNames.forEach((element) => {
                        queryArr.push({name: element.name});
                    });

                    query = {$or: queryArr};
                } else {
                    resolve(null);
                    return null;
                }

                //Find route information
                db.collection("routes").find(query).toArray((err, routes) => {
                    if (err) {
                        console.log(err);
                    }
                    if (routes.length > 0) {
                        routes.forEach((element) => {
                            resObj.routes.push({
                                name: element.name,
                                description: element.description,
                                feet: element.feet,
                                grade: element.grade,
                                holds: element.holds,
                                date: element.date,
                                dateCompleted: (routeNames.find(route => route.name == element.name)).date,
                                numOfAttempts: (routeNames.find(route => route.name == element.name)).numOfAttempts,
                                username: element.username
                        });
                    });
                    }
                    if (resObj !== undefined)
                        resolve(resObj);
                });
            });
            })
            })
    }
}

let getRouteNames = function (info, dbClient) {
    return new Promise (function (resolve) {
    let routeNames = [];
    dbClient.connect ((err, client) => {
        if (err) {
            console.log(err);
        };

        //Find all routes climbed by user
        const db = client.db(dbName);
        db.collection("users").findOne({name: info.username})
        .then((document) => {
            document.climbedRoutes.forEach((element) => {
                routeNames.push(element);
            });
            resolve(routeNames);
        });
    });
    })
}