const commentController = require('./controllers');
const commentSchema = require('./schema');

// Declaration of the API routes
const routes = [
    {
        method: 'GET',
        url: '/api/comments',
        schema: commentSchema.getComments,
        handler: commentController.getComments
        // beforeHandler: or preHandler:
    },
    {
        method: 'GET',
        url: '/api/comments/:id',
        schema: commentSchema.getSingleComment,
        handler: commentController.getSingleComment
    },
    {
        method: 'GET',
        url: '/api/comments/search',    // example: /api/comments/search?timestamp=asc OR /api/comments/search?isRead=false
        schema: commentSchema.getFilteredComments,
        handler: commentController.getFilteredComments
    },
    {
        method: 'POST',
        url: '/api/comments',
        schema: commentSchema.addComment,
        handler: commentController.addComment
    },
    {
        method: 'PATCH',
        url: '/api/comments/:id',
        schema: commentSchema.updateComment,
        handler: commentController.updateComment
    },
    {
        method: 'DELETE',
        url: '/api/comments/:id',
        schema: commentSchema.deleteComment,
        handler: commentController.deleteComment
    }
];

module.exports = routes