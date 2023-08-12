const mongoose = require("mongoose");

const chatFlowSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required:true,
    },
    createdAt: {
        type: Date,
        default:Date.now,
    },
    updatedAt: {
        type: Date,
        default:Date.now,
    },
    creator: {
        type:
            mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
        
    }
});

const ChatFlow = mongoose.model("ChatFlow", chatFlowSchema);

module.exports = ChatFlow;
