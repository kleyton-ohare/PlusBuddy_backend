// schemas serving for validaty as well as Swagger documentation

exports.getComments = {
    summary: 'retrives all the comments',
    description: 'It retrieves all the comments from the database',
    tags: ['comments'],
}

exports.getSingleComment = {
    summary: 'retrives a comment',
    description: 'It retrieves one specific comment, using its id, from the database',
    tags: ['comments'],
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                description: 'comment id',
            }
        }
    }
}

exports.getFilteredComments = {
    summary: 'searches for comments',
    description: 'It searches comments from the database by either \'timestamp\' or \'isRead\'\ntimestamp options: \'asc\' or \'desc\'\nisRead options: \'true\' or \' false\'',
    tags: ['comments'],
    querystring: {
        type: 'object',
        properties: {
            timestamp: {
                type: 'string',
                description: 'either \'asc\' (ascending) or \'desc\' (descending',
            },
            isRead: {
                type: 'boolean',
                description: 'either \'true\' or \'false\''
            }
        }
    }
}

exports.addComment = {
    summary: 'adds a comment',
    description: 'It adds a new entry to the database\nThe added entry is the user\'s comment\nThe article property should be inserted automatically to identify which article the comment is about\nTwo extra properties (isRead and timestamp) will be inserted by the server\n    - Default value for isRead: (boolean) false\n    - Default value for timestamp: (date) server Timestamp',
    tags: ['comments'],
    body: {
        type: 'object',
        properties: {
            article: { type: 'string' },
            comment: { type: 'string' }

        }
    }
}

exports.updateComment = {
    summary: 'updates a comment',
    description: 'It updates an existant entry in the database\nThe existant entry is the user\'s comment',
    tags: ['comments'],
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                description: 'comment id',
            }
        }
    },
    body: {
        type: 'object',
        properties: {
            article: { type: 'string' },
            comment: { type: 'string' },
            isRead: { type: 'boolean' },
            timestamp: { type: 'string' } // includes dates
        }
    }
}

exports.deleteComment = {
    summary: 'deletes a user\'s name',
    description: 'It deletes an entry from the database\nThe deleted entry is the user\'s comment',
    tags: ['comments'],
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                description: 'comment id',
            }
        }
    }
}