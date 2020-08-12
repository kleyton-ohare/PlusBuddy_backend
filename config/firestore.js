const admin = require('firebase-admin');
const serviceAccount = require('../secure/plusbuddy-key.json');

// Connection with the database
admin.initializeApp({
    // credential: admin.credential.cert(serviceAccount)
    credential: admin.credential.applicationDefault()
});

module.exports = {
    FieldValue: admin.firestore.FieldValue,
    db: admin.firestore()
}

// Initialize the database by either
// using the file stored on line 2 and the command on line 6
// or (which is more secure)
// by setting an env. variable in PowerShell
// $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\$USERNAME$\Desktop\PlusBuddy\backend\secure\plusbuddy-key.json"
// and the command on line 7