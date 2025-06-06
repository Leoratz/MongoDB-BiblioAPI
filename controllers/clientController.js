import Client from "../models/Client.js";
import Library from "../models/Library.js";

export const getAllClients = async (req, res) => {
  const filters = {}

  const { page: queryPage, limit: queryLimit, ...queryFilters } = req.query;
  const limit = parseInt(queryLimit) || 10;
  const page = parseInt(queryPage) || 1;
  const skip = (page - 1) * limit;

  Object.entries(queryFilters).forEach(([key, value]) => {
    switch (key) {
      case "lastName":
        filters.lastName = { $regex: value, $options: "i" };
        break;
      case "email":
        filters.email = { $regex: value, $options: "i" };
        break;
    }
  });

  try {
    const clients = await Client
      .find(filters)
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'history.book',
        select: 'title author'
      })
      .populate({
        path: 'history.library',
        select: 'name address'
      });
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client
      .findById(id)
      .populate({
        path: 'history.book',
        select: 'title author'
      })
      .populate({
        path: 'history.library',
        select: 'name address'
      });
    if (!client) return res.status(404).json("Client not found");
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createClient = async (req, res) => {
  const {
    lastName,
    firstName,
    email,
    history
  } = req.body;

  let formattedHistory = {};
  if (Array.isArray(history)) {
    formattedHistory = history.map(item => ({
      book: item.book,
      library: item.library,
      buyingDate: item.buyingDate,
    }));
  } else if (history && history.book){
    formattedHistory = [{
      book: history.book,
      library: history.library,
      buyingDate: history.buyingDate
    }]
  }

  try {
    const newClient = new Client({
      lastName,
      firstName,
      email,
      history: formattedHistory
    });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateClient = async (req, res) => {
  const { id } = req.params;
  const {
    lastName,
    firstName,
    email,
    history: [{
      book,
      library,
      buyingDate
    }],
  } = req.body;

  try {
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      {
        lastName,
        firstName,
        email,
        history: [{
          book,
          library,
          buyingDate
        }],
      },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) return res.status(404).json("Client not found");
    res.json("Client successfully deleted");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const buyBook = async (req, res) => {
  const { clientId } = req.params;
  const { bookId, libraryId } = req.body;
  
  try {
    const library = await Library.findById(libraryId);
    const bookInStock = library.books.find(book => book.bookRef.toString() === bookId);

    if (!bookInStock || bookInStock.stock <= 0) {
      return res.status(404).json({ message: "Book not in stock in this library" });
    }

    bookInStock.stock -= 1;
    await library.save();

    const client = await Client.findById(clientId);
    client.history.push({
      book: bookId,
      library: libraryId,
      buyingDate: new Date()
    })
    await client.save();

    res.status(200).json({ message: "Book purchased successfully", book: bookInStock });
  } catch (error) {
      console.error("Error buying book:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};



export const mediumPurchaseByClient = async (req, res) => {
  try {
    const clients = await Client.find().populate('history.book').populate('history.library');
    
    if (clients.length === 0) {
      return res.status(404).json({ message: "No clients found" });
    }

    const totalPurchases = clients.reduce((accumulateur, client) => {
      return accumulateur + client.history.length;
    }, 0);

    const mediumPurchase = totalPurchases / clients.length;

    res.status(200).json({ "Moyenne d'\achat:": mediumPurchase });

  } catch (error) {
    console.error("Error calculating medium purchase by client:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};