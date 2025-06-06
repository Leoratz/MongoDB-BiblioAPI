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
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        },
        library: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Library",
        },
        buyingDate: {
            type: Date
        }
    }]
});

const Client = mongoose.model("Client", clientSchema);

export default Client;