const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = new express();
app.use(bodyParser.json());
app.use(cors());

// mongoose.connect('mongodb+srv://rook:rook55555@cluster0.uvqch.mongodb.net/missionAviato?retryWrites=true&w=majority',
//  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
//  () => console.log('Database Connection Established.....'));
mongoose.connect('mongodb://localhost/projectAviato',
 { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
 () => console.log('Database Connection Established.....'));

 const postRoute = require('./routes/posts');
 app.use('/posts', postRoute);
 


app.listen(5000, () => console.log('Listening to port 5000'));