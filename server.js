const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const myLiffId = process.env.MY_LIFF_ID;
const voteId = process.env.GIFT_LIFF_ID;

app.use(express.static('public'));
app.use(express.static('vote'));
app.use(express.static('gift'));
app.use('/rich', express.static('images/linerichmessage.jpg'));

app.get('/send-id', function(req, res) {
    res.json({id: myLiffId});
});

app.get('/vote-id', function(req, res) {
    res.json({id: voteId});
});


app.listen(port, () => console.log(`app listening on port ${port}!`));