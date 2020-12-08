const express = require('express');
const app = express();
const port = 8081;
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
    app.use(express.static('public'));

});

app.listen(port, () => console.log(`Time Bomber app listening on port ${port}!`));