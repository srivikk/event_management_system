const express = require('express');
const path = require('path');
var session = require('express-session');
const router = express.Router();


router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/', (req, res) => {
    res.render('event_index')
});

module.exports = router;