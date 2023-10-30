import fastify from "fastify";

import booksRoute from "./routes/books";

import dbConnector from "./db";

const server = fastify({
    logger: true
});

server.register(dbConnector);

server.register(booksRoute);

server.listen({
    port: 8080
}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});