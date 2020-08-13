const admin = require('firebase-admin');
const serviceAccount = require('../secure/my_secret.json');

// Connection with the database
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = {
    FieldValue: admin.firestore.FieldValue,
    db: admin.firestore()
}
