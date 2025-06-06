import Client from '../models/Client.js';
import Library from '../models/Library.js';
import Book from '../models/Book.js';
import dotenv from "dotenv";

dotenv.config();

const clients = [
    {
        lastName: "DiCaprio",  
        firstName: "Leonardo",
        email : "leonardo.dicaprio@star.com"
    },
    {
        lastName: "Pitt",  
        firstName: "Brad",
        email : "brad.pitt@star.com",
    },
    
];

const seedClients = async () => {
    await Client.deleteMany({});
    console.log("Deleted existing clients");

    const allBooks = await Book.find({}, "_id");
    if (allBooks.length === 0) {
        console.log("No books found to assign to clients.");
        return;
    }

    const allLibraries = await Library.find({}, "_id");
    if (allLibraries.length === 0) {
        console.log("No libraries found to assign to clients.");
        return;
    }
    
    clients.forEach(client => {
        const randomBookIndex = Math.floor(Math.random() * allBooks.length);
        const getRandomBook = allBooks[randomBookIndex]._id;

        const randomLibraryIndex = Math.floor(Math.random() * allLibraries.length);
        const getRandomLibrary = allLibraries[randomLibraryIndex]._id;

        client.history = [
            {
                book: getRandomBook,
                library: getRandomLibrary,
                buyingDate: new Date()
            }
        ]
    });

    await Client.insertMany(clients);
    console.log("Seeded clients");
};

export default seedClients;