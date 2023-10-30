import mongoose from "mongoose";

import fastify from "fastify";

import booksRoute from "../../src/routes/books";

import dbConnector from "../../src/db";

export async function connectToDatabase() {
    try {
        const client = await mongoose.connect(process.env.MONGO_URL!);
        return client;
    } catch (error) {
        console.error(error);
    }
}

export function getServer() {

    const server = fastify({
        logger: true
    });

    server.register(dbConnector);

    server.register(booksRoute);

    return server;

}