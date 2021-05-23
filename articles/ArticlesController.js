const express = require('express');
const router = express.Router();
const Category = require("../categories/Category")

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories })
    })
})
   

// router.get("/admin/articles", (req, res) => {
//     res.send("Articles router")
// });

module.exports = router;