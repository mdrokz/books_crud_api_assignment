import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";


export default fastifyPlugin(async function (fastify: FastifyInstance, opts: {}) {
    fastify.register(require('@fastify/mongodb'), {
        // force to close the mongodb connection when app stopped
        // the default value is false
        forceClose: true,

        // url: 'mongodb://root:admin123@localhost:27017/books?authSource=admin'
        url: process.env.MONGO_URL
    }).after((err) => {
        if (err) {
            console.error('Failed to register MongoDB plugin:', err);
        }
    });
});