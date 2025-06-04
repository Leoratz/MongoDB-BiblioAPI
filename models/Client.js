import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({

    lastName: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /.+\@.+\..+/
    },
    history: [{
        bookRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },
        libraryRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Library",
            required: true
        },
        buyingDate: {
            type: Date,
            default: Date.now
        }
    }]
});

const Client = mongoose.model("Client", clientSchema);

export default Client;