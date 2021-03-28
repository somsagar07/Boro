const express = require('express');
const router = express.Router();
const messageModel = require('../models/messages.js');

router.get('/', async(req, res) =>{
//    res.send('hello');
    try{
        const allMessages = await messageModel.find();
        res.json(allMessages);
    }
    catch (err) {
        res.json(err.message);
    }
});

router.post('/', async(req, res) =>{
    const newMessage = new messageModel({
        message: req.body.message,
        userName: req.body.userName
    });
    try{
        const savedMessage = await newMessage.save();
 //       res.json('Success....message has been posted');
    }
    catch (err) {
        res.json(err.message);
    }
})

module.exports = router;