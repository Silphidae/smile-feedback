module.exports = {
    getResults: function(req, res) {
        var results = [];
        var pg = require('pg');
        var connectionString = process.env.DATABASE_URL;
        pg.connect(connectionString, function(err, client, end) {
            if (err) {
                done();
                return res.status(500).json({success: false, data: err})
            }
            var query = client.query('SELECT * FROM feedback');
            query.on("row", function (row, result) {
                results.push(row);
            });
            query.on("end", function (result) {
                client.end();
                return res.json(results);
            });
        });
    },

    addResult : function(req, res){
        var results = [];
        var pg = require('pg');
        var connectionString = process.env.DATABASE_URL;
        pg.connect(connectionString, function(err, client, end) {
            if (err) {
                done();
                return res.status(500).json( {
                    success: false, data: err
                });
            };
            client.query("INSERT INTO feedback(result) values('" + req.query.result + "')");
            var query = client.query("SELECT * FROM feedback");
            query.on('row', function (row) {
                results.push(row);
            });
            query.on("end", function () {
                client.end();
                return res.json(results);
            });
        });
    },

    delResults : function(req, res){
        var results = [];
        var pg = require('pg');
        var connectionString = process.env.DATABASE_URL;
        pg.connect(connectionString, function(err, client, end) {
            if (err) {
                done();
                return res.status(500).json( {
                    success: false, data: err
                });
            };
            client.query("DELETE FROM feedback");
            var query = client.query("SELECT * FROM feedback");
            query.on('row', function (row) {
                results.push(row);
            });
            query.on("end", function () {
                client.end();
                return res.json(results);
            });
        });
    },

    createTable : function(req, res){
        var pg = require('pg');
        var connectionString = process.env.DATABASE_URL;
        var client = new pg.Client(connectionString);
        client.connect();
        var query = client.query("CREATE TABLE feedback(id SERIAL PRIMARY KEY, result INTEGER not null);");
        query.on("end", function () {
            client.end();
        });
    },

    dropTable : function(req, res){
        var pg = require('pg');
        var connectionString = process.env.DATABASE_URL;
        var client = new pg.Client(connectionString);
        client.connect();
        var query = client.query( "DROP TABLE feedback;");
        query.on("end", function () {
            client.end();
        });
    }
};