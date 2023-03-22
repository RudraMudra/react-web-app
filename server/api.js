var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");


var app = express();
app.use(cors());

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get("/", (req, res) =>{
    res.send("<h2>Shopping API</h2>");
});
app.get("/getusers", (req, res)=>{
    mongoClient.connect("mongodb://127.0.0.1:27017", (err, clientObj)=>{
        if(!err){
            var database = clientObj.db("shopdb");
            database.collection("tblusers").find({}).toArray((err, documents)=>{
                if(!err){
                    res.send(documents);
                }else{
                    console.log(err);
                }
            })
        }else{
            console.log(err);
        }
    })
});

app.post("/registeruser", (req, res)=>{
    var user = {
        "UserName": req.body.UserName,
        "Password" : req.body.Password,
        "Email" : req.body.Email,
        "Mobile" : req.body.Mobile
    };
    mongoClient.connect("mongodb://127.0.0.1:27017", (err, clientObj)=>{
        if(!err){
            var database = clientObj.db("shopdb");
            database.collection("tblusers").insertOne(user,(err, result)=>{
                if(!err){
                    console.log("Record inserted");
                }else{
                    console.log(err);
                }
            })
        }
    })
})

app.listen(4000);
console.log("server started http://127.0.0.1:4000");