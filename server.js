const express = require("express");
const app = express();
const myLiffId = "1553436015-g2jwRx3G";

app.get('/send-id', function(req, res) {
    // res.json({id: myLiffId});
    app.use(express.static('public'));

});

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });