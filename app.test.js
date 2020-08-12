'use strict'
const build = require('./app');

describe('testing the root path', () => {
    let app;

    beforeAll(async () => {
        app = build();
    });

    beforeEach(() => {
        jest.setTimeout(10e4);
        jest.resetAllMocks();
    });

    afterAll(async () => {
        await server.close();
    });

    it('should response the GET method', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/'
        })

        expect(response.statusCode).toEqual(200);
    });
});