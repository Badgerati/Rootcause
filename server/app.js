var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('rootcause.db');

// Setup database
db.serialize(function() {
	db.run("CREATE TABLE IF NOT EXISTS Question (QuestionId INTEGER, Question TEXT, IsAnswer INTEGER, IsRoot INTEGER)");
	db.run("CREATE TABLE IF NOT EXISTS Option (OptionId INTEGER, Option TEXT)");
	db.run("CREATE TABLE IF NOT EXISTS QuestionOption(QuestionId INTEGER, OptionId INTEGER)");
	db.run("CREATE TABLE IF NOT EXISTS OptionQuestion(OptionId INTEGER, QuestionId INTEGER)");
});


var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Retrieves the root node if there is one
app.get('/RetrieveRoot', function(req, res) {
	db.get("SELECT * FROM Question WHERE IsRoot = 1", function(err, row) {
		if (err) {
			console.err(err);
			res.status(500);
		}
		else {
			res.json(QuestionAsJson(row));
		}
	});
});

// Retrieves details of a Question from the passed QuestionId
app.get('/RetrieveQuestion', function(req, res) {
	var id = req.query.QuestionId;
	db.run("SELECT * FROM Question WHERE QuestionId = ?", id, function(err, row) {
		if (err) {
			console.err(err);
			res.status(500);
		}
		else {
			res.json(QuestionAsJson(row));
		}
	});
});


function QuestionAsJson(row) {
	if (row == null) {
		return {};
	}

	return {
		'questionId': row.QuestionId,
		'question': row.Question,
		'isAnswer': row.IsAnswer,
		'isRoot': row.IsRoot
	};
}

app.listen(3000);
console.log('Server listening on 127.0.0.1:3000');