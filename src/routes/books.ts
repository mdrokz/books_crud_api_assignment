import { ObjectId, } from "@fastify/mongodb";
import { FastifyInstance } from "fastify";
import { Collection, Document } from "mongodb";

export default async function (fastify: FastifyInstance, options: {}) {

    await fastify.ready(async (err) => {
        console.error(err);
    });

    if (!fastify.mongo.db) {
        throw new Error('MongoDB is not connected');
    }
    const collection = fastify.mongo.db.collection('books');

    collection.createIndex({ title: 'text', author: 'text' });

    fastify.get('/books', async (request, reply) => {
        try {
            const books = await collection.find().toArray();
            reply.code(200).send(books);
        } catch (e) {
            console.error(e);
            reply.code(500).send({ error: 'Failed to retrieve books' });
        }
    });

    fastify.get<{
        Params: { id: string }
    }>('/books/:id', async (request, reply) => {
        try {
            const book = await collection.findOne({ _id: new ObjectId(request.params.id) });

            if (!book) {
                return reply.code(404).send({ error: 'Book not found' });
            }

            reply.code(200).send(book);
        } catch (e) {
            console.error(e);
            reply.code(500).send({ error: 'Failed to retrieve book' });
        }
    });

    fastify.post<{
        Body: { title: string, author: string }
    }>('/books', async (request, reply) => {
        try {
            const { title, author } = request.body;
            if (!title || !author) {
                return reply.code(400).send({ error: 'Title and author are required' });
            }

            const result = await collection.insertOne({ title, author });

            if (!result.acknowledged) {
                return reply.code(500).send({ error: 'Failed to create book' });
            }

            reply.code(201).send(result);
        } catch (e) {
            console.error(e);
            reply.code(500).send({ error: 'Failed to create book' });
        }
    });

    fastify.put<{
        Params: { id: string },
        Body: { title: string, author: string }
    }>('/books/:id', async (request, reply) => {
        try {
            const { title, author } = request.body;
            if (!title || !author) {
                return reply.code(400).send({ error: 'Title and author are required' });
            }

            const result = await collection.findOneAndUpdate(
                { _id: new ObjectId(request.params.id) },
                { $set: { title, author } },
                { returnDocument: 'after' }
            );

            if (!result) {
                return reply.code(404).send({ error: 'Book not found' });
            }

            reply.code(200).send(result);
        } catch (e) {
            console.error(e);
            reply.code(500).send({ error: 'Failed to update book' });
        }
    });

    fastify.delete<{
        Params: { id: string }
    }>('/books/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const book = await collection.findOneAndDelete({
                _id: new ObjectId(id)
            });

            if (!book) {
                return reply.code(404).send({ error: 'Book not found' });
            }

            reply.code(200).send(book);
        } catch (e) {
            console.error(e);
            reply.code(500).send({ error: 'Failed to delete book' });
        }
    });
}