import Library from "../models/Library.js";

export const getAllLibraries = async (req, res) => {
    try {
        const libraries = await Library.find();
        res.status(200).json(libraries);
    } catch (error) {
        console.error("Error fetching libraries:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}