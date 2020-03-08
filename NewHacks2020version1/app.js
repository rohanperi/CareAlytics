var express = require("express");
var app = express ();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//var Country = require ("./models/")
var assert = require('assert');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/health_app";

/*
MongoClient.connect(url,function(err,db){
	if(err) throw err;
		var dbo = db.db("Countries");
		var query = {Country: "Sri Lanka"};
		dbo.collection("Countries").find(query.toArray(function(err, result){
			if(err) throw err;
			alert(result);
			db.close();	
		})

);
	*/
//connect to the database
mongoose.connect("mongodb://localhost/health_app");
app.set ("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));

var CountrySchema = new mongoose.Schema({
	Country: String,
	Population: Number,
	confirmedCases:Number,
	SuspectedCases:Number,
	Deaths: Number
});

//mongoose manages relatonships between data
var Country = mongoose.model("Country",CountrySchema);


Country.create({
	Country: "Canada",
	Population: 3000,
	confirmedCases: 2000,
	suspectedCases: 234,
	Deaths:232
	
},function(err,country ){
	if(err){
		console.log("Failed to create country object");
		console.log(err);
	}else{
		console.log("Country Created:");
		console.log(country);
	}
});

var countries  = [
	{Country: "Canada",
	Population: 3003430,
	confirmedCases: 2234000,
	suspectedCases: 223434,
	Deaths:2234
	}
];



	
//BASE ROUTE
app.get("/", function (req,res){
	res.render("landingPage");
});

//INDEX ROUTE:
app.get("/countries", function(req,res, next){ 
	var resultArray = [];
											  mongo.connect(url,function (err,db){
												  assert.equal (null,err);
	var cursor = db.collection('Countries').find();
												  cursor.forEach(function(doc,err){
													  assert.equal(null,err);
													  resultArray.push(doc);
												  },function(){
													  db.close();
													 
													 for(i=0;i<2;i++){
														 alert(resultArray[i]);
													 }
			  });
												  });
											  })
	


/*
Country.find({}, function (err,country){
		if(err){
			console.log("ERROR");
		}else{
			res.render("index",{country:country});
		}
	});*/
//CREATE ROUTE
app.post("/countries", function (req,res){
	/*
	var Country = req.body.Country;
	var Population = req.body.Population;
	var confirmedCases = req.body.ConfirmedCases;
	var suspectedCases = req.body.suspectedCases;
	var deaths = req.body.Deaths;
newCountryInfo = {Country:}
*/
	Country.create (req.body.Country, function(err,newCountry){
		if(err){
			res.render ("/");
		}
		else{
			res.redirect("/countries");
		}
	});
});


app.get("/country/:id", function(req,res){
	Country.findById(req.params.id, function (err, foundCountry){
			if(err){
		res.redirect("/");
	} else{
		res.render ("show", {county: foundCountry});
					 }
	});
});

app.listen(3000, function (){
	console.log("SERVER IS ON!")
});

