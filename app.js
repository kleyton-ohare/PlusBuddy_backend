'use strict'

const fastify = require('fastify');
const swagger = require('./config/swagger');
const routes = require('./routes');

// function build(opts = {}) {
const build = (opts = {}) => {
    const app = fastify(opts)

    app.register(require('fastify-cors'), { origin: true })

    app.register(require('fastify-swagger'), swagger.options)

    // Initial route
    app.get('/', async function (request, reply) {
        return {
            appName: 'PlusBuddy',
            title: 'This is the backend serving PlusBuddy app',
            info: 'The app aims to bring information about HIV/AIDS',
        }
    })

    // Initialise the routes
    routes.forEach((value, index) => {
        app.route(value);
    })

    return app
}

module.exports = build;