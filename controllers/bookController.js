import Book from "../models/Book.js";

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    }
    catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createBook = async (req, res) => {
    const {
        title,
        author,
        genre,
        publisher,
        publishedDate,
        description,
        pagesNumber,
        type,
        format,
        saga,
        price,
        salesNumber,
        bookRef: {
            classification,
            code
        }
    } = req.body;
    try {
        const newBook = new Book({ 
            title, 
            author, 
            genre,
            publisher,
            publishedDate,
            description,
            pagesNumber,
            type,
            format,
            saga,
            price,
            salesNumber,
            bookRef: {
                classification,
                code
            }
        });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        author,
        genre,
        publisher,
        publishedDate,
        description,
        pagesNumber,
        type,
        format,
        saga,
        price,
        salesNumber,
        bookRef: {
            classification,
            code
        }
    } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, {
            title, 
            author, 
            genre,
            publisher,
            publishedDate,
            description,
            pagesNumber,
            type,
            format,
            saga,
            price,
            salesNumber,
            bookRef: {
                classification,
                code
            }
        }, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};