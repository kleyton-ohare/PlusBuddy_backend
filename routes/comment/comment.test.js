'use strict'
const build = require('../../app');
const controllers = require('./controllers');

describe('testing \'api/comments\' routes', () => {
    let app;

    beforeAll(async () => {
        app = build();
        await app.ready();
    });

    beforeEach(() => {
        jest.setTimeout(10e4);
        jest.resetAllMocks();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should retrieve all the comments', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/comments'
        });

        expect(response.statusCode).toEqual(200);
    });

    it('should retrieve one comment using an id', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/comments/1'
        });
        expect(response.statusCode).toEqual(200);
    });

    it('should search for timestamp=ASC', async () => {
        const response = await app.inject({
            method: 'GET',
            url: 'api/comments/timestamp=asc'
        });
        expect(response.statusCode).toEqual(200);
    });

    it('should search for timestamp=DESC', async () => {
        const response = await app.inject({
            method: 'GET',
            url: 'api/comments/timestamp=desc'
        });
        expect(response.statusCode).toEqual(200);
    });

    it('should search for isRead=true', async () => {
        const response = await app.inject({
            method: 'GET',
            url: 'api/comments/isRead=true'
        });
        expect(response.statusCode).toEqual(200);
    });

    it('should search for isRead=false', async () => {
        const response = await app.inject({
            method: 'GET',
            url: 'api/comments/isRead=false'
        });
        expect(response.statusCode).toEqual(200);
    });

    it('should search for timestamp=ASC & isRead=true', async () => {
        const response = await app.inject({
            method: 'GET',
            url: 'api/comments/timestamp=asc&isRead=true'
        });
        expect(response.statusCode).toEqual(200);
    });

    it('should search for timestamp=ASC & isRead=false', async () => {
        const response = await app.inject({
            method: 'GET',
            url: 'api/comments/timestamp=asc&isRead=false'
        });
        expect(response.statusCode).toEqual(200);
    });

    it('should search for timestamp=DESC & isRead=true', async () => {
        const response = await app.inject({
            method: 'GET',
            url: 'api/comments/timestamp=desc&isRead=true'
        });
        expect(response.statusCode).toEqual(200);
    });

    it('should search for timestamp=DESC & isRead=false', async () => {
        const response = await app.inject({
            method: 'GET',
            url: 'api/comments/timestamp=desc&isRead=false'
        });
        expect(response.statusCode).toEqual(200);
    });

    it('should post a comment', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/api/comments',
            body: {
                article: "Testing Post",
                comment: "It should pass",
            }
        });
        expect(response.statusCode).toEqual(200);
    });

    it('should fail because of no body', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/api/comments',
        });
        expect(response.statusCode).toEqual(400);
    });

    it('should patch a comment using its id', async () => {
        const response = await app.inject({
            method: 'PATCH',
            url: '/api/comments/1',
            body: {
                article: "Testing Patch",
                comment: "It should pass",
            }
        });
        expect(response.statusCode).toEqual(200);
    });

    it('should fail because of no id', async () => {
        const response = await app.inject({
            method: 'PATCH',
            url: '/api/comments',
            body: {
                article: "Testing Patch",
                comment: "It should pass",
            }
        });
        expect(response.statusCode).toEqual(404);
    });

    it('should fail because of no body', async () => {
        const response = await app.inject({
            method: 'PATCH',
            url: '/api/comments',
        });
        expect(response.statusCode).toEqual(404);
    });

    it('should delete a comment', async () => {
        const response = await app.inject({
            method: 'DELETE',
            url: '/api/comments/1',
        });
        expect(response.statusCode).toEqual(200);
    });

    it('should fail to delete because of no id', async () => {
        const response = await app.inject({
            method: 'DELETE',
            url: '/api/comments',
        });
        expect(response.statusCode).toEqual(404);
    });
});