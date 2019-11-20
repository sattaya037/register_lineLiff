const express = require("express");
const app = express();
const myLiffId = "1553436015-g2jwRx3G";
app.use(express.static('public'));

app.get('/send-id', function(req, res) {
    res.json({id: myLiffId});

});

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });