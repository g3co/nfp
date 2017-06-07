var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var test = require('assert');

var uri = [
    'mongodb://mongoRoot:123muscle@',//credentials
    'nfpcluster-shard-00-00-z8lk8.mongodb.net:27017,',//primary
    'nfpcluster-shard-00-01-z8lk8.mongodb.net:27017,',
    'nfpcluster-shard-00-02-z8lk8.mongodb.net:27017',
    '/admin?ssl=true&replicaSet=NFPCluster-shard-0&authSource=admin'
    ].join('');//<DATABASE>?ssl=true&replicaSet=NFPCluster-shard-0&authSource=admin

app.get('/', function (req, res) {
    MongoClient.connect(uri, function(err, db) {

        var nfp_db = db.db('netfightpromotion');

        var testCollection = nfp_db.collection('test_collection');

        console.log(testCollection
            .findOne(
                {hello: 'world'},
                function(err, item) {
                    console.log(item);
                    item.testFunc('solo');
                }
            ));

        /*console.log(testCollection
            .insert(
                {hello: 'world', testFunc: function(s) {console.log('test func executed with: '+ s)}},
                {w: 1, serializeFunctions: true},
                function(err, result) {
                    console.log(result);


                }
            ));*/

        /*// Use the admin database for the operation
        var adminDb = db.admin();
        // List all the available databases
        adminDb.listDatabases(function(err, dbs) {
            if(dbs && dbs.databases && dbs.databases.length) {
                for(var dd in dbs.databases) {
                    console.log(dbs.databases[dd]);
                }
            }
            db.close();
        });*/
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});