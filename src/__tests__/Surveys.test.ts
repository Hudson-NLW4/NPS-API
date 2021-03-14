import request from 'supertest';
import { app } from '../app';

describe("Surveys", () => {

    it("should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys")
        .send({
            title: "Algum título",
            description: "Alguma descrição útil"
        })

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    })

    it("should be able to create a new survey", async () => {
        await request(app).post("/surveys")
        .send({
            title: "Algum título",
            description: "Alguma descrição útil"
        })

        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2);
    })


})