'use strict'

const dotenv = require('dotenv');
dotenv.config();        // parses the .env entries to a json format

const server = require('./app')({
    logger: {
        level: 'info',
        prettyPrint: true
    }
})

server.listen(process.env.PORT, '0.0.0.0', (err, address) => {
    if (err) {
        console.log(err)
        process.exit(1)
    }

    server.log.info(`server listening on ${address}`);

    process.on('SIGINT', () => server.close());
    process.on('SIGTERM', () => server.close());
});