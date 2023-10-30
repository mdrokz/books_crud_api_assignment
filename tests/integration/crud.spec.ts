import { FastifyInstance } from "fastify";
import { getServer } from "../helpers/utils";

import supertest from 'supertest';

const serverUrl = 'http://localhost:8080';



describe('CRUD book integration tests', () => {
    let id: any;
    let server: FastifyInstance;

    beforeAll(async () => {
        server = await getServer();

        // await server.ready();
        // server.listen({
        //     port: 8080
        // }, (err, address) => {
        //     if (err) {
        //         console.error(err);
        //         process.exit(1);
        //     }
        //     console.log(`Server listening at ${address}`);
        // });
    });

    it('can create book', async () => {

        const book = {
            title: 'The Alchemist',
            author: 'Paulo Coelho'
        }

        let res = await server.inject({
            method: 'POST',
            url: '/books',
            body: book
        })

        expect(res.statusCode).toBe(201);

        let resBody = JSON.parse(res.body);

        expect(resBody).toBeDefined();

        expect(resBody.acknowledged).toBe(true);
    });

    it('can get books', async () => {
        // const res = await supertest(serverUrl).get('/books').expect(200);
        const res = await server.inject({
            method: 'GET',
            url: '/books'
        });

        expect(res.statusCode).toBe(200);

        expect(res.body).toBeDefined();

        const resBody = JSON.parse(res.body);

        expect(resBody.length).toBeGreaterThan(0);

        expect(resBody[0].title).toBe('The Alchemist');

        expect(resBody[0].author).toBe('Paulo Coelho');

        id = resBody[0]._id;
    });

    it('can update book', async () => {
        const book = {
            title: 'The Mage',
            author: 'Paulo Coel'
        };

        const res = await server.inject({
            method: 'PUT',
            url: `/books/${id}`,
            body: book
        });

        expect(res.statusCode).toBe(200);

        expect(res.body).toBeDefined();

        const resBody = JSON.parse(res.body);

        expect(resBody).toBeDefined();

        expect(resBody.title).toBe('The Mage');

        expect(resBody.author).toBe('Paulo Coel');

    });


    it('can delete book', async () => {
        const res = await server.inject({
            method: 'DELETE',
            url: `/books/${id}`
        });

        expect(res.statusCode).toBe(200);

        expect(res.body).toBeDefined();
    });

});