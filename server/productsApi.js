var mongoClient = require("mongodb").MongoClient;
var express =require("express");
var cors = require("cors");
const { application, response } = require("express");

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();

app.use(cors());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.get("/products", (req, res)=>{
    mongoClient.connect(connectionString,(err, clientObject)=>{
        if(!err){
            var database = clientObject.db("shopdb");
            database.collection("tblproducts").find({}).toArray((err, documents)=>{
                if(!err){
                    res.send(documents);
                }
            })
        }
    })
});

app.get("/details/:id",(req,res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString, (err, clientObject)=>{
        if(!err){
            var database = clientObject.db("shopdb");
            database.collection("tblproducts").find({ProductId:id}).toArray((err, documents)=>{
                if(!err){
                    res.send(documents);
                }
            })
        }
    })
})

app.post("/addproduct", (req, res)=>{
    var product = {
        "ProductId": parseInt(req.body.ProductId),
        "Name": req.body.Name,
        "Price": parseFloat(req.body.Price),
        "Stock": (req.body.Stock=="true")?true:false
    };
    mongoClient.connect(connectionString, (err, clientObject)=>{
        var database = clientObject.db("shopdb");
        database.collection("tblproducts").insertOne(product, (err, result)=>{
            if(!err){
                console.log("Record Inserted")
            };
        })
    })
});

app.delete("/delete/:id", (req, res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString, (err, clientObject)=>{
        if(!err){
            var database = clientObject.db("shopdb");
            database.collection("tblproducts").deleteOne({ProductId:id}, (err, result)=>{
                if(!err){
                    console.log("Record Deleted");
                    res.redirect("/products");
                }
            })
        }
    })
});

app.put("/updateproduct/:id",(req, res)=> {
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString, (err, clientObject)=>{
        if(!err) {
            var database = clientObject.db("shopdb");
            var findQuery = {ProductId:id};
            var product = {
                "Name": req.body.Name, 
                "Price": parseFloat(req.body.Price),
                "Stock": (req.body.Stock=="true")?true:false
            };
            var updateQuery = {$set:product};
            database.collection("tblproducts").updateOne(findQuery, updateQuery, (err, result)=>{
                if(!err) {
                    console.log("Record Update");
                }
            })
        }
    })
});

app.listen(5000);
console.log("server started at : http://localhost:5000");