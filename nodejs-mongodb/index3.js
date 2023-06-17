const MongoClient = require("mongodb").MongoClient;
let url = "mongodb://0.0.0.0:27017/mydb";

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    let dbo = db.db("mydb");
    let myobj = { name: "Company Inc", address: "123/456"};
    dbo.collection("customers").insertOne(myobj, (err, res) => {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    })
})