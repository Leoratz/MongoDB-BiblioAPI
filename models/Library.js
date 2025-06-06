import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    books: [{
        stock: {
            type: Number,
            default: 0,
            min: 0
        },
        bookRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },
    }],
});

librarySchema.index({ name: 1 });
librarySchema.index({ address: 1 });
librarySchema.index({ "books.bookRef": 1 });
librarySchema.index({ "books.stock": -1 });

const Library = mongoose.model("Library", librarySchema);

export default Library;