import Book from "../models/Book.js";

export const getAllBooks = async (req, res) => {
    const filters = {}

    const { page: queryPage, limit: queryLimit, ...queryFilters } = req.query;
    const limit = parseInt(queryLimit) || 10;
    const page = parseInt(queryPage) || 1;
    const skip = (page - 1) * limit;

    Object.entries(queryFilters).forEach(([key, value]) => {
        switch (key) {
            case "title":
                filters.title = { $regex: value, $options: "i" };
                break;
            case "author":
                filters.author = { $regex: value, $options: "i" };
                break;
            case "genre":
                filters.genre = { $regex: value, $options: "i" };
                break;
            case "publisher":
                filters.publisher = { $regex: value, $options: "i" };
                break;
            case "classification":
                filters["bookRef.classification"] = { $regex: value, $options: "i" };
                break;
            case "code":
                filters["bookRef.code"] = { $regex: value, $options: "i" };
                break;
        }
    });

    try {
        const books = await Book.find(filters).skip(skip).limit(limit);
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

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getBookStats = async (req, res) => {
  try {
    const statsByFormat = await Book.aggregate([
      { $group: { _id: "$format", totalSales: { $sum: "$salesNumber" }, count: { $sum: 1 } } }
    ]);

    const statsByAuthor = await Book.aggregate([
      { $unwind: "$author" },
      { $group: { _id: "$author", totalSales: { $sum: "$salesNumber" }, count: { $sum: 1 } } }
    ]);

    res.status(200).json({ statsByFormat, statsByAuthor });
  } catch (error) {
    console.error("Error fetching book stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};