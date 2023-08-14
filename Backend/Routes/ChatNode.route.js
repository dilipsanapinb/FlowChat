const express = require('express');
const ChatNodeController = require('../Controllers/ChatNodeController');
const chatNodeRoute = express.Router();
const protected = require('../Middlewares/Authentication.middleware');

// create the chat node
chatNodeRoute.post('/api/chat-nodes', protected, ChatNodeController.createChatNode);

// get all chat nodes for specific chatFlow

chatNodeRoute.get('/api/chat-flows/:chatFlowId/chat-nodes', ChatNodeController.getAllChatNodes);

// edit the node

chatNodeRoute.put('/api/chat-nodes/:id', protected, ChatNodeController.editChatNode);

// Delete a chat node by ID
chatNodeRoute.delete('/api/chat-nodes/:id', protected, ChatNodeController.deleteChatNode);

module.exports=chatNodeRoute