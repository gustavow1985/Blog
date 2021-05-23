const express = require('express');
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) =>{
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/admin/categories");
        })
    } else {
        res.redirect("/admin/categories/index")
    }
});

router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories", {
            categories
        });
    })
});

router.post("/categories/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where: {id: id}
            }).then(() => {
                res.redirect("/admin/categories");
            })
        } else { // não for um n.º
            res.redirect("/admin/categories");
        }
    } else { // for NULL
        res.redirect("/admin/categories");
    }
});

router.get("/admin/categories/edit/:id", (req, res) => {
    var id = req.params.id;
    Category.findByPk(id).then(categoria =>{
        if (categoria != undefined){
            res.render("admin/categories/edit", {categoria: categoria});
        } else {
            res.redirect("/admin/categories");
            console.log("undefined")
        }
    }).catch(error =>{
        res.redirect("/admin/categories");
    });
});

module.exports = router;
