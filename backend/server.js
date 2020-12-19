const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

let mongoURL = 'mongodb://mongo-service/database'

let Example = require('./models/example.model')


app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api', (req, res) => {
    res.send({
        "data": "hello world!"
    })
})

app.post("/api/example", (req, res) => {
    let userData = {
        id: Math.floor(Math.random() * 100000),
        data: req.body.string,
    }
    new Example(userData).save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            console.log(err)
            res.status(400).send("unable to save to database");
        });
})

app.get("/api/examples", (req, res) => {

    Example.find({}, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
})




mongoose.connect(mongoURL, { useNewUrlParser: true })
    .then(
        () => {
            console.log("connected to mongo");
        }
    ).catch((error) => {
        console.log("unable to connect to mongoDB")
        console.log(mongoURL);
    });


app.listen(3000, function() {
    console.log('listening on 3000')
});