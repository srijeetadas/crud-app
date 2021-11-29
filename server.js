const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const connectionString = "mongodb+srv://srijeetadas72:gungundas@cluster1.voqfk.mongodb.net/test?retryWrites=true&w=majority"

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
            .then(results => {
            console.log(results)
        })
        .catch(error => console.error(error))
        res.sendFile(__dirname + '/index.html')
        // Note: __dirname is the current directory you're in. Try logging it and see what you get!
        // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
      })
    
      app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
    .then(result => {
      console.log(result)
      res.redirect('/')
    })
    .catch(error => console.error(error))
      })
    app.listen(3000, function() {
        console.log('listening on 3000')
      })
  })
