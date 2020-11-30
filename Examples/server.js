const express = require('express');
const path = require('path');
const fileUpload = require('../lib/index');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

const PORT = 8000;
// app.use('/form', express.static(__dirname + '/index.html'));

app.use(express.static('ls1'));
// app.use(express.static('ls2'));
app.post('/load/:json_file', (req, res) => {
  let data = fs.readFileSync(
    path.join(__dirname, '/uploads', req.params.json_file)
  );
  // const _data = JSON.parse(data)[0];
  // const found = _data.celldata.find((d) => d.r === 6 && d.c === 4);
  // found.v.v = '34.5';
  // console.log('CELL DATA', found);

  // const newData = Object.assign({}, _data);
  // res.send(JSON.stringify([newData]));
  res.send(data);
});

app.use(bodyParser.json({ limit: '10mb' }));
app.post('/update', (req, res) => {
  // console.log('UPDATE', req.body);
  fs.writeFile(
    path.join(__dirname, '/uploads', 'new.json'),
    JSON.stringify([req.body]),
    function writeJSON(err) {
      if (err) return console.log(err);
      res.status(200).send("OK");
    }
  );
});

// default options
// app.use(fileUpload());

// app.get('/ping', function (req, res) {
//   res.send('pong');
// });

// app.post('/upload', function (req, res) {
//   let sampleFile;
//   let uploadPath;

//   if (!req.files || Object.keys(req.files).length === 0) {
//     res.status(400).send('No files were uploaded.');
//     return;
//   }

//   console.log('req.files >>>', req.files); // eslint-disable-line

//   sampleFile = req.files.sampleFile;

//   uploadPath = __dirname + '/uploads/' + sampleFile.name;

//   sampleFile.mv(uploadPath, function (err) {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     res.send('File uploaded to ' + uploadPath);
//   });
// });

app.listen(PORT, function () {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});
