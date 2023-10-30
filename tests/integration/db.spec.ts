import mongoose from "mongoose";
import { connectToDatabase } from "../helpers/utils";

describe('Database integration tests', () => {
    let client: mongoose.Mongoose;

    let id: any;

    const Book = mongoose.model('Book', new mongoose.Schema({
        title: String,
        author: String,
    }));

    it('should connect to database', async () => {
        const c = await connectToDatabase();
        expect(c).toBeDefined();
        client = c!;
    });

    it('can insert to books collection', async () => {


        const book = new Book({ title: 'The Alchemist', author: 'Paulo Coelho' });

        let r = await book.save();

        expect(r).toBeDefined();

        expect(r.title).toBe('The Alchemist');

        expect(r.author).toBe('Paulo Coelho');

        id = r._id;
    });

    it('can get books from collection', async () => {
        const books = await Book.find({});

        expect(books).toBeDefined();

        expect(books.length).toBeGreaterThan(0);

        expect(books[0].title).toBe('The Alchemist');

        expect(books[0].author).toBe('Paulo Coelho');
    });

    it('can update book', async () => {
        const res = await Book.updateOne({ _id: id }, { title: 'The Mage', author: 'Paulo Coel' });

        expect(res).toBeDefined();

        expect(res.modifiedCount).toBe(1);

        const book = await Book.findById(id);

        expect(book).toBeDefined();

        expect(book!.title).toBe('The Mage');

        expect(book!.author).toBe('Paulo Coel');
    });

    it('can get book by id', async () => {
        const book = await Book.findById(id);

        expect(book).toBeDefined();

        expect(book!.title).toBe('The Mage');

        expect(book!.author).toBe('Paulo Coel');
    });


    it('can delete book', async () => {
        const res = await Book.deleteOne({ _id: id });

        expect(res).toBeDefined();

        expect(res.deletedCount).toBe(1);
    });


    it('should disconnect from database', async () => {
        await client.disconnect();
        expect(client.connection.readyState).toBe(0);
    });


});