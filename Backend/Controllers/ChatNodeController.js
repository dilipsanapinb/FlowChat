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