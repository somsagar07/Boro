const express = require('express');
const router = express.Router();
const postModel = require('../models/posts.js');
const userModel = require('../models/users.js');

router.post('/', async (req, res) => {
    const newPost = new postModel({
        name: req.body.name,
        query: req.body.query,
        lattitude: req.body.lattitude,
        longitude: req.body.longitude,
        class: req.body.class,
        phoneNumber: req.body.phoneNumber
    });

    try{
        const savePost = await newPost.save();
        res.json('Success....Post has been saved');
    }
    catch (error) {
        res.json(error.message);
    }    
});
 
router.get('/', async (req, res) => {
    try{
        const allPosts = await postModel.find();
        res.json(allPosts);
    }
    catch (error) {
        res.json(error.message);
    }
    
});

router.post('/verifyUser', async (req, res) =>{
    try {
        const user = await userModel.findOne({userName: req.body.userName, passWord: req.body.passWord});

        if (user === null)  res.json('Invalid user');
        else res.json('verified');

    } catch (err) {
        res.json(err.message);
    }
});


module.exports = router;