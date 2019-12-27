const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const myLiffId = process.env.MY_LIFF_ID;
const voteId = process.env.VOTE_LIFF_ID;
const giftId = process.env.GIFT_LIFF_ID;


app.use(express.static('public'));
app.use(express.static('vote'));
app.use(express.static('gift'));
app.use(express.static('images'));
app.use(express.static('test'));
app.use(express.static('group'));
const books = require('./db')
const request = require('request');

// app.use('/map', express.static('images/rich.js'));
app.get('/api', (req, res) => {
    res.json(books)
  })

app.get('/callapi', (req, res) => {
 
      const odata = request("GET", "https://ics-line-liff.herokuapp.com/api", {});
      var sapRespond = JSON.parse(odata.getBody());
        console.log(sapRespond)
})

app.get('/send-id', function(req, res) {
    res.json({id: myLiffId});
});

app.get('/vote-id', function(req, res) {
    res.json({id: voteId});
});

app.get('/gift-id', function(req, res) {
    res.json({id: giftId});
});


app.listen(port, () => console.log(`app listening on port ${port}!`));