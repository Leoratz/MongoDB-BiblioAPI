import mongoose from "mongoose";

import seedBooks from "./book.js";
import seedClients from "./client.js";
import seedLibraries from "./library.js";

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        await seedBooks();
        await seedLibraries();
        await seedClients();
        process.exit(0);
    } catch (error) {
        console.error("Error during seeding:", error);
        process.exit(1);
    }
}

seed();