const ChatFlow = require('../Models/ChatFlow.model');

// create a new Chat Flow

exports.createChatFlow = async (req, res) => {
    try {
        const { title, description, creator } = req.body;

        const chatFlow = new ChatFlow({ title, description, creator });
        await chatFlow.save();
        res.
            status(201).
            json({
                message:
                    'Chat flow created successfully',
                chatFlow
            })
    } catch (error) {
        console.log(error.message);
        res.
            status(500).
            send("Error at creating chat flow")
    }
}

// get all chatFlow

exports.getAllChatFlows =async (req,res) => {
    try {
        const chatFlows = await ChatFlow.find().populate('creator');
        res.
            status(200).
            json({chatFlows})
    } catch (error) {
        console.log(error.message);
        res.
            status(500).
            send('Error at fetching chat flows')
    }
}