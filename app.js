const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shivaSchema = new Schema({
  name: { type: String }
});

var mySchema = mongoose.model('shiva_collection', shivaSchema);

const app = express();

app.use(bodyParser.json());

app.get('/shiva_url', async (req, res) => {

  mySchema.find({}, function(err, data) {
    if(err){
      res.send("========================Something wrong=======================");
      next();
    }

    res.status(200).json({
    data: data,
    });

  });

});

mongoose.connect(
  //`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,
  'mongodb+srv://prem:12345@cluster0.vfu2v.mongodb.net/shiva_db?retryWrites=true&w=majority',

  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log("errrrrrrrrrrrrr================="+err);
    } else {
      app.listen(3000);
    }
  }
);
