const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const myLiffId = process.env.MY_LIFF_ID;
const gifTId = process.env.GIFT_LIFF_ID;

app.use(express.static('public'));
app.use(express.static('gift'));

app.get('/send-id', function(req, res) {
    res.json({id: myLiffId});
});

app.get('/gift-id', function(req, res) {
    res.json({id: gifTId});
});
app.listen(port, () => console.log(`app listening on port ${port}!`));