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

clientSchema.index({ lastName: 1, firstName: 1 });
clientSchema.index({ email: 1 });
clientSchema.index({ "history.book": 1 });
clientSchema.index({ "history.buyingDate": -1 });

const Client = mongoose.model("Client", clientSchema);

export default Client;