const { FieldValue, db } = require('../config/firestore');
const comments = db.collection('comments');

// standard data format
function dataFormat(data) {
    return {
        article: data.article,
        comment: data.comment,
        isRead: data.isRead,
        timestamp: new Date(data.timestamp.seconds * 1000)
    }
}

// standard error handler
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
                    data: dataFormat(doc.data())
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
            reply.send(dataFormat(comment.data()));
        else if (!comment.exists)
            reply.send({ info: `No such document for id ${id}!` });
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
        if (timestamp && isRead !== undefined) {
            const cond = JSON.parse(isRead);    // convert from string to boolean
            snapshot = await comments.where("isRead", "=", cond).orderBy("timestamp", timestamp).get(); // indexes must be created
        } else if (timestamp) {
            snapshot = await comments.orderBy("timestamp", timestamp).get();
        } else if (isRead !== undefined) {
            const cond = JSON.parse(isRead);
            snapshot = await comments.where("isRead", "=", cond).get();
        } else
            throw new Error("no arguments matched any queries. Check \'getFilteredComments\' function");

        if (!snapshot.empty) {
            snapshot.forEach(doc => {
                let temp = {
                    id: doc.id,
                    data: dataFormat(doc.data())
                }
                docs.push(temp);
            });
            reply.send(docs);
        } else
            throw new Error("snapshot is empty. Check \'getFilteredComments\' function");
    } catch (err) {
        errorHandler(err, reply);
    }
}

// add a comment
exports.addComment = async (req, reply) => {
    try {
        const comment = await comments.add({
            ...req.body,                    // fields from the client
            isRead: false,
            timestamp: FieldValue.serverTimestamp()
        });
        if (comment)
            reply.send({ info: `Comment created for id ${comment.id}` });
        else
            throw new Error(`comment not creaated. Check \'addComment\' function`);
    } catch (err) {
        errorHandler(err, reply);
    }
}

// update a comment
exports.updateComment = async (req, reply) => {
    try {
        const id = req.params.id;
        const updated = { ...req.body };
        const comment = await comments.doc(id);
        const doc = await comment.get();
        if (doc.exists) {
            comment.update(updated);
            reply.send({ info: `document updated for id ${id}`, updated });
        }
        else if (!doc.exists)
            reply.send({ info: `no such document for id ${id}!` });
        else
            throw new Error("check \'getSingleComment\' function");
        // reply.send({ id });
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