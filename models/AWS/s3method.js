const AWS = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;

// Set region, must match Bucket
AWS.config.region = 'us-west-2';

// Instatiate new S3 using env variables
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

module.exports = {
    getCollection: function(username, cb) {
        s3.getObject(
            {
                Bucket: S3_BUCKET,
                Key: `${username}/collection.json`,
            },
            (err, data) => {
                if (err) {
                    console.log(`Get collection error: ${err}`);
                    return cb({ error: 'There was an issue getting your collection.' });
                }

                return cb(JSON.parse(data.Body));
            }
        );
    },
    createCollection: function(username, collection, cb) {
        s3.upload(
            {
                Bucket: S3_BUCKET,
                Key: `${username}/collection.json`,
                Body: JSON.stringify(collection),
            },
            (err, data) => {
                if (err) {
                    console.log(`Create Collection Error: ${err}`);
                    return cb(false);
                }
                console.log(`File uploaded successfully at ${data.Location}`);
                return cb(true);
            }
        );
    },
    createDeck: function(username, deckName, deckList, cb) {
        s3.upload(
            {
                Bucket: S3_BUCKET,
                Key: `${username}/decks/${deckName}/decklist.json`,
                Body: JSON.stringify(deckList),
            },
            (err, data) => {
                if (err) {
                    console.log(`Create Deck Error: ${err}`);
                    return cb(false);
                }
                console.log(`File uploaded successfully at ${data.Location}`);
                return cb(true);
            }
        );
    },
    getDeck: function(username, deckName, cb) {
        s3.getObject(
            {
                Bucket: S3_BUCKET,
                Key: `${username}/decks/${deckName}/decklist.json`,
            },
            (err, data) => {
                if (err) {
                    console.log(`Get deck error: ${err}`);
                    return cb({ error: 'There was an error retriving this deck' });
                }

                return cb(JSON.parse(data.Body));
            }
        );
    },
    listDecks: function(username, cb) {
        s3.listObjects(
            {
                Bucket: S3_BUCKET,
                Prefix: `${username}/decks/`,
                Delimiter: '/',
            },
            (err, decks) => {
                if (err) {
                    console.log(`List decks error: ${err}`);
                    return cb({ error: 'There was an error lsiting your decks' });
                }

                return cb(this.listDecksHelper(decks.CommonPrefixes));
            }
        );
    },
    listDecksHelper: function(arr) {
        const decks = [];
        for (let i = 0; i < arr.length; i++) {
            decks.push(arr[i].Prefix.split('/')[2]);
        }

        return decks;
    },
    updateDeckList: function(username, deckName, cardsToAdd, cardsToRemove, cb) {
        //Get the deck
        this.getDeck(username, deckName, data => {
            console.log(data.main);

            if (cardsToRemove.main.length > 0) {
                const cardsToRemoveMain = cardsToRemove.main;
                const mainCounter = {};

                for (let i = 0; i < cardsToRemoveMain.length; i++) {
                    let name = cardsToRemoveMain[i].name;
                    if (mainCounter[name]) {
                        mainCounter[name]++;
                    } else {
                        mainCounter[name] = 1;
                    }
                }

                console.log('Cards to remove counter', mainCounter);

                for (let i = 0; i < data.main.length; i++) {
                    console.log('Name inside for loop', mainCounter[data.main[i].name]);
                    if (mainCounter[data.main[i].name] > 0) {
                        mainCounter[data.main[i].name]--;
                        data.main.splice(i, 1);
                        i--;
                    }
                }

                console.log(data.main);
            }

            if (cardsToRemove.sideboard.length > 0) {
                const cardsToRemoveSideboard = cardsToRemove.sideboard;
                const sideCounter = {};

                for (let i = 0; i < cardsToRemoveSideboard.length; i++) {
                    let name = cardsToRemoveSideboard[i].name;
                    if (sideCounter[name]) {
                        sideCounter[name]++;
                    } else {
                        sideCounter[name] = 1;
                    }
                }

                console.log(cardsToRemoveSideboard);
                console.log(sideCounter);

                for (let i = 0; i < data.sideboard.length; i++) {
                    if (sideCounter[data.sideboard[i].name] > 0) {
                        sideCounter[data.sideboard[i].name]--;
                        data.sideboard.splice(i, 1);
                        i--;
                    }
                }
            }

            const main = data.main.concat(cardsToAdd.main);
            const sideboard = data.sideboard.concat(cardsToAdd.sideboard);

            const newDeck = {
                main,
                sideboard,
            };

            console.log(newDeck);

            // 'Create' new deck with updated decklist
            this.createDeck(username, deckName, newDeck, succes => {
                if (succes) {
                    console.log('Deck updated');
                    return cb(newDeck);
                } else {
                    console.log('Deck failed to update');
                    return cb({
                        error: 'The collection failed to update. Please try again later.',
                    });
                }
            });
        });
    },
    updateCollection: function(username, cardsToAdd, cardsToRemove, cb) {
        this.getCollection(username, data => {
            const counter = {};

            if (cardsToRemove.length > 0) {
                for (let i = 0; i < cardsToRemove.length; i++) {
                    const name = cardsToRemove[i].name;

                    if (counter[name]) {
                        counter[name]++;
                    } else {
                        counter[name] = 1;
                    }
                }

                for (let i = 0; i < data.length; i++) {
                    counter[data[i].name];
                    if (counter[data[i].name] > 0) {
                        data.splice(i, 1);
                        counter[data[i].name]--;
                        i--;
                    }
                }
            }

            const collection = data.concat(cardsToAdd);

            this.createCollection(username, collection, succes => {
                if (succes) {
                    console.log('Collection updated');
                    return cb(collection);
                } else {
                    console.log('Collection failed to update');
                    return cb({
                        error: 'The collection failed to update. Please try again later.',
                    });
                }
            });
        });
    },
    deleteDeckList: function(username, deckName, cb) {
        s3.deleteObjects(
            {
                Bucket: S3_BUCKET,
                Delete: {
                    Objects: [{ Key: `${username}/decks/${deckName}/decklist.json` }],
                },
            },
            (err, data) => {
                if (err) {
                    console.log(`Delete decklist error: ${err}`);
                    return cb({ error: 'There was an error deleting this decklist' });
                }
                console.log(data);
                this.deleteDeck(username, deckName, data => {
                    if (data.error) {
                        console.log(`Delete deck error: ${err}`);
                        return cb({ error: 'There was an error deleting this deck' });
                    } else {
                        return cb({ success: 'Deck has been deleted' });
                    }
                });
            }
        );
    },
    deleteDeck: function(username, deckName, cb) {
        s3.deleteObjects(
            {
                Bucket: S3_BUCKET,
                Delete: {
                    Objects: [{ Key: `${username}/decks/${deckName}` }],
                },
            },
            (err, data) => {
                if (err) {
                    console.log(`Delete deck folder error: ${err}`);
                    return cb({ error: 'There was an error deleting this deck' });
                }
                console.log(data);
                return cb(data);
            }
        );
    },
};
