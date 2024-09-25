const request = require('supertest')
const {describe, test, beforeAll } = require('@jest/globals')
const app = require('../src/app')
const User = require('../src/models/User')
// const { db } = require() <-- when using sequelize

// if the goal is to test the HTTP request-response, but NOT depend on the database, we should mock
jest.mock("../src/models/User.js", () => ({
    create: jest.fn()
}))

// arrow function in one line  () => value
// arrow function that's bigger () => { return value }

// beforeAll( async () => await db.sync() );

describe("User routes", () => {
    describe("POST routes", () => {

        test("should create a user and return the name", async () => {
            // create a request, send it, expect stuff in the response
            const userData = {
                username: "testuser",
                password: "testpassword",
                email: "test@mail.com"
            };

            // mock the return value from sequelize
            const mockResponse = { ...userData, id: 1 }; // TODO sync database
            User.create.mockResolvedValue( mockResponse );

            // send the request
            const response = await request(app)
                .post("/users")
                .send( userData );

            // expect stuff in the response
            expect(response.status).toBe(200);
            expect(response.ok).toBe(true);
            expect(response.body).toEqual(expect.objectContaining(mockResponse))
            expect(User.create).toHaveBeenCalledWith(userData);
        })
    })
})