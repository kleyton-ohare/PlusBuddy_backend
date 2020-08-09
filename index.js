// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
// const swagger = require('./config/swagger');
const db = require('./config/firestore');
const dotenv = require('dotenv');
dotenv.config(); // parses the .env entries to a json format

// Declare a route
fastify.get('/', async (request, reply) => {
    return {
        appName: 'PlusBuddy',
        title: 'This is the backend serving PlusBuddy app',
        info: 'The app aims to bring information about HIV/AIDS',
        db
    }
})

// Register Fastify CORS
fastify.register(require('fastify-cors'), {
    origin: true    // enables 'Access-Control-Allow-Origin'
})

// Register Swagger
fastify.register(require('fastify-swagger'))
//, swagger.options);

// Run the server!
const start = async () => {
    try {
        await fastify.listen(process.env.PORT, '0.0.0.0');
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
start();