const ChatNode = require('../Models/ChatNode.model');

// create a new chat node
exports.createChatNode = async(req,res) => {
    try {
        const { type, content, options, position, chatFlow } = req.body;
        
        const chatNode = new ChatNode({
            type,
            content,
            options,
            position,
            chatFlow,
        });
        await chatNode.save();
        res.
            status(201).
            json({
                message: "Chat Node created successfully",
                chatNode
            })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong at create ChatNode")
    }
}

// Get All nodes for specific chat flow

exports.getAllChatNodes =async (req,res) => {
    try {
        const chatNodes = await ChatNode.find({ chatFlow: req.params.chatFlowId });
        res.
            status(200).
            json({chatNodes})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error at fetching chat nodes")
    }
}

// Edit a chat node by ID
exports.editChatNode = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedNode = await ChatNode.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!updatedNode) {
      return res.status(404).json({ message: 'Chat node not found' });
    }

    res.json({ message: 'Chat node updated successfully', node: updatedNode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating chat node' });
  }
};

// Delete a chat node by ID
exports.deleteChatNode = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNode = await ChatNode.findByIdAndDelete(id);

    if (!deletedNode) {
      return res.status(404).json({ message: 'Chat node not found' });
    }

    res.json({ message: 'Chat node deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting chat node' });
  }
};
