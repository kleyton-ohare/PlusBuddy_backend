// Swagger is documentation generator for Fastify.
// It uses the schemas you declare in your routes to generate a swagger compliant doc.
// Link to npm fastify-swagger:
// https://www.npmjs.com/package/fastify-swagger

exports.options = {
    routePrefix: '/documentation', // This is the route to access the documentation
    exposeRoute: true,
    swagger: {
        info: {
            title: 'PlusBuddy API',
            description: 'Building a blazing fast REST API with Node.js, Firestore, Fastify and Swagger',
            version: '1.0.0',
            contact: {
                name: 'the Developer',
                email: 'kleyton.ohare@gmail.com',
                // url: 'https://helloyou.netlify.app'
            },
        },
        externalDocs: {
            url: 'https://github.com/kleyton-ohare/PlusBuddy_backend',
            description: 'Git repository',
        },
        host: 'localhost:8080',          // UPDATE this from App Engine
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [             // tags are used to group the end-points
            { name: 'comments', description: 'Endpoints for comments on articles' },
            // { name: 'suggestions', description: 'Endpoints for suggestions about the app' }
        ],
        // definitions: {
        //     User: {
        //         $id: 'User',
        //         type: 'object',
        //         required: ['id', 'email'],
        //         properties: {
        //             id: { type: 'string', format: 'uuid' },
        //             firstName: { type: 'string', nullable: true },
        //             lastName: { type: 'string', nullable: true },
        //             email: { type: 'string', format: 'email' }
        //         }
        //     }
        // },
        securityDefinitions: {
            apiKey: {
                type: 'apiKey',
                name: 'apiKey',
                in: 'header'
            }
        },
    }
}