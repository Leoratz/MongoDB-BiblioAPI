import Library from "../models/Library.js";

export const getAllLibraries = async (req, res) => {
    const filters = {}

    const { page: queryPage, limit: queryLimit, ...queryFilters } = req.query;
    const limit = parseInt(queryLimit) || 10;
    const page = parseInt(queryPage) || 1;
    const skip = (page - 1) * limit;

    Object.entries(queryFilters).forEach(([key, value]) => {
        switch (key) {
            case "name":
                filters.name = { $regex: value, $options: "i" }; // insensitive regex
                break;
            case "address":
                filters.address = { $regex: value, $options: "i" };
                break;
        }
    });

    try {
        const libraries = await Library
            .find(filters)
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'books.bookRef',
                select: 'title author price'
            });
        res.status(200).json(libraries);
    } catch (error) {
        console.error("Error fetching libraries:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getLibraryById = async (req, res) => {
    const { id } = req.params;
    try {
        const library = await Library
            .findById(id)
            .populate({
                path: 'books.bookRef',
                select: 'title author price'
            });
        if (!library) {
            return res.status(404).json({ message: "Library not found" });
        }
        res.status(200).json(library);
    }
    catch (error) {
        console.error("Error fetching Library:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createLibrary = async (req, res) => {
    const {
        name,
        address, 
        books
    } = req.body;
    try {
        const newLibrary = new Library({ 
            name,
            address, 
            books  
        });
        await newLibrary.save();
        res.status(201).json(newLibrary);
    } catch (error) {
        console.error("Error creating library:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateLibrary = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        address,
        books
    } = req.body;

    try {
        const updatedLibrary = await Library.findByIdAndUpdate(id, {
            name,
            address, 
            books
        }, { new: true });

        if (!updatedLibrary) {
            return res.status(404).json({ message: "Library not found" });
        }

        res.status(200).json(updatedLibrary);
    } catch (error) {
        console.error("Error updating Library:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteLibrary = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedLibrary = await Library.findByIdAndDelete(id);
        if (!deletedLibrary) {
            return res.status(404).json({ message: "Library not found" });
        }
        res.status(200).json({ message: "Library deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting Library:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const AllStockBylibrary = async (req, res) => {
    try {

        const libraries = await Library.aggregate([
            {
                $unwind: "$books"
            },
            {
                $lookup: {
                    from: "books",
                    localField: "books.bookRef",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    totalStock: { $sum: "$books.stock" },
                }
            }
        ]);
        res.status(200).json(libraries);

    } catch (error) {
        console.error("Error counting books bought:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}