import Book from "../models/Book.js";
import Library from "../models/Library.js";
import dotenv from "dotenv";

dotenv.config();

const libraries = [
    {
        name: "La bouteille à l'encre",  
        address: "Courbevoie",
    },
    {
        name: "FNAC",  
        address: "La défense",
    },
    {
        name: "Gibert Joseph",  
        address: "Paris",
    }
];

const seedLibraries = async () => {
    await Library.deleteMany({});
    console.log("Deleted existing libraries");

    const allBooks = await Book.find({}, "_id");
    if (allBooks.length === 0) {
        console.log("No books found to assign to libraries.");
        return;
    }

    libraries.forEach(library => {
        library.books = allBooks.map(book => ({
            stock: Math.floor(Math.random() * 100),
            bookRef: book._id
        }));
    });
    

    await Library.insertMany(libraries);
    console.log("Seeded libraries");
};

export default seedLibraries;