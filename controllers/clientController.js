import Client from "../models/Client.js";

export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);
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
    history: { book, library, buyingDate },
  } = req.body;

  try {
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      {
        lastName,
        firstName,
        email,
        history: {
          book,
          library,
          buyingDate,
        },
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
