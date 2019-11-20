const express = require("express");
const app = express();
const myLiffId = process.env.MY_LIFF_ID;

app.use(express.static('public'));

app.get('/send-id', function(req, res) {
    res.json({id: myLiffId});
});
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });