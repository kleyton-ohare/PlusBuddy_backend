// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const dotenv = require('dotenv');
dotenv.config(); // parses the .env entries to a json format

// Declare a route
fastify.get('/', async (request, reply) => {
    return {
        appName: 'PlusBuddy',
        title: 'This is the backend serving PlusBuddy app',
        info: 'The app aims to bring information about HIV/AIDS',
    }
})

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
start()