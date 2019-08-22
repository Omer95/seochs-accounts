const functions = require('firebase-functions');
const admin = require('firebase-admin');
const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');

const doc = new GoogleSpreadsheet('1V9YDe6B2JWMJEn-mEt2boX-mBY-RPn_VPttvDJKpjXc');

// authenticate
const creds_json = {
    client_email: 'seochs-spreadsheet@seochs-accounts.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3KL6U0Vh2SP1B\n9aFsiBV14AUNyPzYPiFI0fZcK/3f9Qso7VwMBqPRZo4qPNuyRY2y7TJ2B75dWFIz\ng48bG/1Vntu+MMkW+lH/8YIqNDbqK+KBkCicCbwSlWkxi3TwOhnrHFIi6xQzHdQH\nSjkloZrFz5Ge/40MYNzRU9xTQyYtm9U1Cyt6waGiGA3dq6SV5OG/jGt6vajAasnA\nCL4L+pB/vqFE6BhkNLY6blxu5QbNa+9BQD4WBkJQ+adeEzHA8TDt9bMPhnlyina5\nl8WvXc0strW2Y+udQcqhW4HG5us8uaQ9kVpehqeq/i+JcxF7ZBTvrdQ1RK/FCVyb\niEIu3NMXAgMBAAECggEAFf/wXaVZl/eYvT6jkYrfnQV38JnGzl3ZbKA/lFRPuFdR\nbFc6T6glLtE/2+Xsc5jJdjI/IJCPNodrHuHl+K500D8hC31bogVrf6/CtTleq+Od\nNM0b0PDrD1u1Q2y0nT2KqxlUlPoh4SlA3vv01PF4ytrC6yisiKNCfWgya36CIZxv\ns+0dev5bGmh8WPNTaCYQwST9JUcWTmV8Qs7t9d6SW7vTpDH+dXSjdE5P7fZaT2yp\nQ5AGPphEyccufoh7HF+iQe64c9Xp1t7oKxbr3veBFTsyK/Cpneriq9BhkeZ/bSnj\nGmUeZOLB3Cyj9Gmc4gbTHlFM8RO9d86qUaMDqqwUhQKBgQDvQJfH3H9yInfMORIC\nSD09P/FGzmNN/3x6ilsU//G6Adx8UkrmKSnIP7sXwl6MxgA56g3pjs2i5bRWwPK2\n8uSaiaU1CE4oUyPokaOmGykw14YBHsGC213FujJZh37nyH06Vq+dpyq92EjcD0cp\nU+0kvGLHmPzV1NzVxTEmZEG4ywKBgQDD+vX69OT4xJbfB84mNDgJ/V4inwXJSwhh\nd1I9jiqTkHwbuMxRz2fjcFpFs0Okfg7uPVww5caNvKZw3h2R31enDSG4UJum7O+t\nyzCegFFK50E2h/FoBIPtcYOpW5gqns/jRwMZiVeg/TPRWn/P8tVbu10clnK1Bnk9\nW2fJkn5hZQKBgHsZiP7UfN6EzY7Obm2uLZQuKj58QqwHIE0MkwCjEATcoE13KgJy\ne4UFBYacA3n7BnLF8pKRX0zJU5ivfjKTlvvMhqxasZwd6wPmq4TzxKXUvqYk5Pwn\nUoBB5VYbWTh497XklEdRk7RKbHKNidfBzupv44M/PBfphhaXd0qBmy8xAoGBAJU8\nGG2maGmqwbxKJEfhQb8RqcoxT+Wtdk9J3l0zUeaWgntVqHivuEtv9b3XuS2cNGBk\nZzxw7FZoDlIqQVggO43gqQnCkBR3nje4X2iDC+Q+3uDYehKcRZ3c78ZaEjB6SJGo\nNIsQk6LqzLeh82v1XVUCAvBO/EAvEsmPPiQ3onclAoGBAIU/mJllxJekb7m0UIIk\nUDavO9boW8k+8WgpMgZa3DbVBgMXIYGDmPlrn3f0OA9hQQv5B18+nSgQ0YmX/fKl\nnFAkEyuHYAofDhrTpY+yKet5kDTOTtsXZw3Xd1ZS3jD2uhUPZWBJ1bOo84OxDwyE\nMJpmNR0nQbYPA0V3gZv34Qht\n-----END PRIVATE KEY-----\n'
}

doc.useServiceAccountAuth(creds_json, (error) => {
    console.log(error);
    console.log(doc.getRows(1, (err, rows) => {
        console.log(rows);
        console.log(err);
    }));
});

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
                date: Date()
            });
        });
        
    }).catch(error => {
        console.log(error);
    });
});
