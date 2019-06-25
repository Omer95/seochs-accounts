const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

var globVal = 2000;

exports.scheduledJob = functions.pubsub.schedule('every 1 minutes').onRun((context) => {
    console.log('Hello');
    const db = admin.database();
    return db.ref('/plots').once('value').then(snap=> {
        Object.keys(snap.val()).forEach(plot=> {
            console.log(plot);
            return db.ref(`/plots/${plot}/debits`).push({
                description: 'security fees',
                debitAmount: 2000,
                date: new Date()
            });
        });
    }).catch(error => {
        console.log(error);
    });
});
