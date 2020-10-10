var express = require("express");
var path = require("path");

var app = express();
var PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [
	{
		name: "Pepe Perez",
		phone: "8112345678",
		email: "pepeperez@gmail.com",
		uid: 1
	},
	{
		name: "Juan Juanes",
		phone: "8187654321",
		email: "juanjuanes@gmail.com",
		uid: 2
	}
];

var waitingList = [
	{
		name: "Ramiro Ramirez",
		phone: "8156781234",
		email: "ramiroramirez@gmail.com",
		uid: 3
	}
];

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
	res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
	res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req, res) {
	return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
	return res.json(waitingList);
});

app.post("/api/tables", function(req, res) {
  var newReservation = req.body;

  console.log(newReservation);
  
  if (reservations.length < 5) {
	reservations.push(newReservation);
	res.json(true);
  } else {
	waitingList.push(newReservation);
	res.json(false);
  }

});

app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});