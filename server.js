const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/employee101FE'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/employee101FE/'}),
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS','PATCH');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
