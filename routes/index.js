// The schemas below is to generate the Swagger documentation
// More info:
// https://www.npmjs.com/package/fastify-swagger

const commentController = require('../controllers/comment');

// Declaration of the API routes
const routes = [
    {
        method: 'GET',
        url: '/api/comments',
        schema: {
            summary: 'retrives all the comments',
            description: 'It retrieves all the comments from the database',
            tags: ['comments'],
        },
        handler: commentController.getComments
    },
    {
        method: 'GET',
        url: '/api/comments/:id',
        schema: {
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
        },
        handler: commentController.getSingleComment
    },
    {
        method: 'GET',
        url: '/api/comments/search',    // example: /api/comments/search?timestamp=asc OR /api/comments/search?isRead=false
        schema: {
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
        },
        handler: commentController.getFilteredComments
    },
    {
        method: 'POST',
        url: '/api/comments',
        schema: {
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
        },
        handler: commentController.addComment
    },
    {
        method: 'PATCH',
        url: '/api/comment/:id',
        schema: {
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
        },
        handler: commentController.updateComment
    },
    {
        method: 'DELETE',
        url: '/api/comments/:id',
        schema: {
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
        },
        handler: commentController.deleteComment
    }
];

module.exports = routes