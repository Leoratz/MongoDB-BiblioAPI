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
        ref: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },
    }],
});

const Library = mongoose.model("Library", librarySchema);

export default Library;