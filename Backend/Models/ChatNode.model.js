const mongoose = require('mongoose');

const chatNodeSchema = new mongoose.Schema({
    type: {
        type: String,
        // possible types
        enum: [
            'test',
            'image',
            'button',
            'input',
        ],
        required: true
    },
    content: {
        type: String,
    },
    options: {
        type: [String]
    },
    position: {
        type: Number,
    },
    chatFlow: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatFlow',
        required: true
    },
});

const ChatNode = mongoose.model('ChatNode', chatNodeSchema);

module.exports = ChatNode;