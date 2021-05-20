const express = require('express');
const router = express.Router();

router.get("/articles", (req, res) => {
    res.send("Articles router")
});

router.get("/admin/articles/new", (req, res) => {
    res.send("New articles router")
});

module.exports = router;