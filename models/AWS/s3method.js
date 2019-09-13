const AWS = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;

// Set region, must match Bucket
AWS.config.region = "us-west-2";

// Instatiate new S3 using env variables
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


module.exports = {

    getCollection: function(username, cb) {
        s3.getObject({
            Bucket: S3_BUCKET,
            Key: `${username}/collection.json`,
        }, (err, data) => {
            if (err) return console.log(err);

            return cb(JSON.parse(data.Body));
        })
    },
    createCollection: function(username, collection, cb) {
        s3.upload({
            Bucket: S3_BUCKET,
            Key: `${username}/collection.json`,
            Body: JSON.stringify(collection)
        }, (err, data) => {
            if (err) {
                console.log(`Create Collection Error: ${err}`);
                return cb(false);
            }
            console.log(`File uploaded successfully at ${data.Location}`);
            return cb(true);
        })
    },
    createDeck: function(username, deckName, deckList, cb) {
        s3.upload({
            Bucket: S3_BUCKET,
            Key: `${username}/decks/${deckName}/decklist.json`,
            Body: JSON.stringify(deckList)
        }, (err, data) => {
            if (err) {
                console.log(`Create Deck Error: ${err}`);
                return cb(false);
            }
            console.log(`File uploaded successfully at ${data.Location}`);
            return cb(true);
        })
    },
    getDeck: function(username, deckName, cb) {
        s3.getObject({
            Bucket: S3_BUCKET,
            Key: `${username}/decks/${deckName}/decklist.json`,
        }, (err, data) => {
            if (err) {
                console.log(`Get deck error: ${err}`);
                return cb({error: 'There was an error retriving this deck'})
            }

            return cb(JSON.parse(data.Body));
        })
    }
    
}
