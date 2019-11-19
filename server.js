const express = require("express");
const app = express();
app.get('/vote', function(req, res) {
    app.use(express.static(__dirname));
    res.sendFile(__dirname+'/html/liff.html')
});

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });