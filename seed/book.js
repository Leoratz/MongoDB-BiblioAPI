import Book from '../models/Book.js';
import dotenv from "dotenv";

dotenv.config();

const books = [
    {
        title: "Le Donjon de Naheulbeuk - Le conseil de Suak",
        author: "John Lang",
        publisher: "J'aiLu",
        publishedDate: "2011",
        description: "Le grand n'importe quoi règne une fois de plus en terre de Fangh !",
        pagesNumber: 462,
        type: "Fantasy",
        format: "Paperback",
        saga: "Le Donjon de Naheulbeuk",
        price: 8,
        bookRef: {
            classification: "ISBN",
            code: "978-2-290-04154-3"
        }
    },
    {
        title: "Enigmes - 200 jeux pour aiguiser votre esprit",
        publisher: "La Martinière",
        publishedDate: "2014",
        pagesNumber: 256,
        type: "Loisirs",
        format: "Paperback",
        price: 10,
        bookRef: {
            classification: "ISBN",
            code: "978-2-7324-6175-5"
        }
    },
    {
        title: "Bionicle chronicles #2 - Beware the Bohrok",
        author: "C.A. Hapka",
        publisher: "Scholastic",
        publishedDate: "2003",
        description: "After a long difficult journey...",
        pagesNumber: 94,
        type: ["Fantasy", "Animation"],
        format: "Paperback",
        saga: "Bionicle chronicles",
        price: 5,
        bookRef: {
            classification: "ISBN",
            code: "0-439-50117-2"
        } 
    }
];

const seedBooks = async () => {
    await Book.deleteMany({});
    console.log("Deleted existing books");
    await Book.insertMany(books);
    console.log("Seeded books");
};

export default seedBooks;