const { FieldValue, db } = require('../config/firestore');
const comments = db.collection('comments');

function errorHandler(err, reply) {
    reply.status(500).send({ error: "Internal server error", info: err.toString() });
}

// get all the comments
exports.getComments = async (req, reply) => {
    try {
        let docs = [];      // empty array to store the temp documents.
        const snapshot = await comments.get();
        if (!snapshot.empty) {
            snapshot.forEach(doc => {
                let temp = {
                    id: doc.id,
                    data: doc.data()
                }
                docs.push(temp);
            });
            reply.send(docs);
        } else if (snapshot.empty)
            reply.send({ info: "No comments, collection is empty!" });
        else
            throw new Error("check \'getComments\' function");
    } catch (err) {
        errorHandler(err, reply);
    }
}

// get a single comment
exports.getSingleComment = async (req, reply) => {
    try {
        const id = req.params.id;
        const comment = await comments.doc(id).get();
        if (comment.exists)
            reply.send(comment.data());
        else if (!comment.exists)
            reply.send({ info: `No such document for id: ${id}!` });
        else
            throw new Error("check \'getSingleComment\' function");
    } catch (err) {
        errorHandler(err, reply);
    }
}

// get filtered comments - timestamp / isRead
exports.getFilteredComments = async (req, reply) => {
    try {
        let snapshot;
        let docs = [];
        const timestamp = req.query.timestamp;
        const isRead = req.query.isRead;
        if (timestamp) {
            snapshot = await comments.orderBy("timestamp", timestamp).get();
        } else if (isRead) {
            const cond = JSON.parse(isRead);    // convert from string to boolean
            snapshot = await comments.where("isRead", "=", cond).get();
        } else
            throw new Error("no arguments matched any queries. Check \'getFilteredComments\' function");

        if (!snapshot.empty) {
            snapshot.forEach(doc => {
                let temp = {
                    id: doc.id,
                    data: doc.data()
                }
                docs.push(temp);
            });
        }
        // console.log(docs);
        reply.send(docs);
        // const filtered = await comments.orderBy(filter);
    } catch (err) {
        errorHandler(err, reply);
    }
}

// add a comment
exports.addComment = async (req, reply) => {
    try {
        const comment = await comments.add({
            ...req.body,                    // fields from the client
            timestamp: FieldValue.serverTimestamp(),
            isRead: false
        });
        reply.send({ info: `Comment created. ID: ${comment.id}` });
    } catch (err) {
        errorHandler(err, reply);
    }
}

// deletes a comment
exports.deleteComment = async (req, reply) => {
    try {
        const comment = await comments.doc(req.params.id);
        const doc = await comment.get();
        if (doc.exists) {
            comment.delete();
            reply.send({ info: `Document id ${doc.id} deleted!` });
        } else if (!doc.exists)
            reply.send({ info: "No such document!" });
        else
            throw new Error("check \'deleteComment\' function");
    } catch (err) {
        errorHandler(err, reply);
    }
}