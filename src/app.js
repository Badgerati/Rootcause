var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');

db.serialize(function() {
	db.run('CREATE TABLE IF NOT EXISTS Stuff (Value TEXT)');

	db.run('DELETE FROM Stuff');

	var stmt = db.prepare('INSERT INTO Stuff VALUES (?)');
	stmt.run('Ipsum 0');
	stmt.finalize();
});


var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/retrieve', function(req, res) {
	db.get('SELECT Value FROM Stuff', function(err, row) {
		res.json({'value': row.Value});
	});
});

app.get('/update', function(req, res) {
	var value = req.query.value;
	db.run('UPDATE Stuff SET Value = ?', value, function(err, row) {
		if (err) {
			console.err(err);
			res.status(500);
		}
		else {
			res.status(200);
		}

		res.end();
	});
});


app.listen(1337);
console.log('Server listening on 127.0.0.1:1337');
