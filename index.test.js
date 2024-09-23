const app = require('./src/app')
const {describe, test, it, expect} = require('@jest/globals')
const request = require('supertest');

describe('basic express server test', () => {

    test("GET request - jest style", async () => {
        const response = await request(app).get("/data");
        expect(response.ok).toBe(true);
        expect(response.type).toBe("application/json")
        expect(response.body.method).toBe("GET")
        expect(response.body.str).toBe("Hello, world")
        expect(response.body.num).toBeGreaterThanOrEqual(0);
        expect(response.body.num).toBeLessThan(1);
    })
})
