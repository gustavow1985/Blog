const express = require('express');
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{ model: Category }]   //busca dados no model Categoy
    }).then(articles =>{
        res.render("admin/articles/index", { articles })
    });
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories })
    });
});

router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;


    Article.create({
        title: title,
        slug: slugify(title),
        body,
        categoryId: category //foreign KEY
    }).then(() => {
        res.redirect("/admin/articles")
    })
});

router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {id: id}
            }).then(() => {
                res.redirect("/admin/articles");
            })
        } else { // não for um n.º
            res.redirect("/admin/articles");
        }
    } else { // for NULL
        res.redirect("/admin/articles");
    }
});

router.get("/admin/articles/edit/:id", (req, res) =>{
    var id = req.params.id;
    Article.findByPk(id).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render("admin/articles/edit", { categories, article })
            })
        } else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    });
});

router.post("/articles/update", (req, res)=> {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.update({ title, body, categoryId: category, slug: slugify(title)}, {
        where: { id }
    }).then(() => {
        res.redirect("/admin/articles");
    }).catch(err => {
        res.redirect("/");
    });
});

router.get("/articles/page/:num", (req, res) => {
    var page = req.params.num;
    var limit = 2;
    var offset = 0;

    if(isNaN(page) || page == 0 || page == 1){
        offset
    }else{
        offset = (parseInt(page) -1) * limit;
    }

    Article.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [['id', 'DESC']]
    }).then(articles => {
        
        var next;
        if(offset+limit >= articles.count){
            next = false;            
        }else{
            next = true;
        }
        var result = {
            page: parseInt(page),
            next,
            articles
        }
        
        Category.findAll().then(categories => {
            res.render("admin/articles/page", { result, categories })
        })
    })
});

module.exports = router;