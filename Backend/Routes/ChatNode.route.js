const express = require('express');
const ChatNodeController = require('../Controllers/ChatNodeController');
const chatNodeRoute = express.Router();
const protected = require('../Middlewares/Authentication.middleware');

// create the chat node
chatNodeRoute.post('/api/chat-nodes', protected, ChatNodeController.createChatNode);

// get all chat nodes for specific chatFlow

chatNodeRoute.get('/api/chat-flows/:chatFlowId/chat-nodes',ChatNodeController.getAllChatNodes)

module.exports=chatNodeRoute