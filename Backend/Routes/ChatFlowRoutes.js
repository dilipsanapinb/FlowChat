const express = require('express');

const chatFlowController = require('../Controllers/ChatFLow.controllers');

const protected = require('../Middlewares/Authentication.middleware');

const chatFlowRoute = express.Router();

// create new Chat

chatFlowRoute.post('/api/chat-flow', protected, chatFlowController.createChatFlow);

// get all chatFlows

chatFlowRoute.get('/api/chat-flows', chatFlowController.getAllChatFlows);

module.exports = chatFlowRoute;