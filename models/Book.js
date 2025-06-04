import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: [String],
        required: true,
        trim: true
    },
    publisher: {
        type: String,
        trim: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    description: {
        type: Text,
        trim: true
    },
    pagesNumber: {
        type: Number,
        required: true,
        min: 1
    },
    type: {
        type: [String],
        enum: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Fantasy', 'Mystery', 'Romance', 'Other'],
        required: true
    },
    format: {
        type: String,
        enum: ['Hardcover', 'Paperback', 'Ebook', 'Audiobook'],
    },
    saga: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    salesNumber: {
        type: Number,
        default: 0,
        min: 0
    },
    ref: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;