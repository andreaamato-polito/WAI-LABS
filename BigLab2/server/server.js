'use strict';

const express = require('express');
const morgan = require('morgan');

app = express();
const PORT = 3000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello world, from your server');
});

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));