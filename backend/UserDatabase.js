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
                            "numOfAttempts": info.numOfAttempts
                            }
                        }
                    }
                );
        })
    }
}
