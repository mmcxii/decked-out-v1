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

    getCollection: function(username) {
        s3.getObject({
            Bucket: S3_BUCKET,
            Key: `${username}/collection.json`,
        }, (err, data) => {
            if (err) return console.log(err);

            return JSON.parse(data.Body);
        })
    },
    createCollection: function(username, collection) {
        s3.upload({
            Bucket: S3_BUCKET,
            Key: `${username}/collection.json`,
            Body: JSON.stringify(collection)
        }, (err, data) => {
            if (err) {
                console.log(`Create Collection Error: ${err}`);
                return false
            }
            console.log(`File uploaded successfully at ${data.Location}`);
            return true;
        })
    }
    
}
