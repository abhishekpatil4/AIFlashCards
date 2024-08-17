const router = require('express').Router();
const { generate } = require("../controllers/generate.controller");

router.get("/", generate);

module.exports = router;