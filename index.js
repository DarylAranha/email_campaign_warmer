const fs = require('fs');
const express = require('express');
const multer = require('multer');
const xlsx = require('node-xlsx');

const emailHelper = require('./lib/emailHelper');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'data/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})  
let upload = multer({ storage: storage });

const port = 3005;
let app = express();
app.set('view engine', 'ejs');

// api for
// - marking emails read
app.post('/email/markRead',  upload.single('file'), function(req, res) {
    console.log('File:', req.file);

    if (typeof(req.file) !== 'object') {
        console.log('No file sent');
        return res.sendStatus(400);
    }

    const emailData = xlsx.parse(`${__dirname}/data/${req.file.originalname}`);

    console.log(emailData);
    // skipping first row because its header
    header = emailData[0]['data'][0];
    for(let i = 1; i < emailData[0]['data'].length; i++)
    {
        let sheet = emailData[0]['data'][i];
        console.log(sheet);
        emailHelper.init({
            user: sheet[0],
            password: sheet[1],
            host: sheet[2],
            port: sheet[3],
            tls: true,
            tlsOptions: {
                rejectUnauthorized: false
            },
            keepalive: false
        }, ['UNSEEN']);
    }

    return res.sendStatus(200);
});


app.get('/', function (req, res) {
    res.render('index');
});


app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
