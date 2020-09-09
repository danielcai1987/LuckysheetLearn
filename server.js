const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 8000;

app.use(express.static("Luckysheet"));

app.post("/load/:json_file", (req, res) => {
  let data = fs.readFileSync(
    path.join(__dirname, "/data", req.params.json_file)
  );
  res.send(data);
});

app.listen(PORT, function () {
  console.log("Express server listening on port ", PORT);
});
