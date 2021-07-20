const express = require('express');
const router = express.Router();

// import controller
const { urlScrape } = require('../controllers/scrapper');

router.get('/scrapper/listing', urlScrape);


module.exports = router;