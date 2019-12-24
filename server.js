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

// app.use('/map', express.static('images/rich.js'));

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