const express = require("express");
const app = express();
const connection = require('./database/database');
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

app.set('view engine', 'ejs');
app.use(express.static("public"));

const Article = require("./articles/Article");
const Category = require("./categories/Category");


//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(express.json());

//conectar ao database
connection
    .authenticate()
    .then(() => {
        console.log("Connected with database")
    }).catch((error) => {
        console.log(error);
    });

app.use('/', categoriesController);
app.use('/', articlesController);


app.get ("/", (req, res) =>{
    Article.findAll({
        order:[
            ["id", "DESC"]
        ]
    }).then(articles => {
    res.render("index", {articles})
    });
});

app.get ("/:slug", (req, res) =>{
    var slug = req.params.slug;
    Article.findOne({
        where: { slug }
    }).then(article => {
        if(article != undefined){
            res.render("article", { article })
        } else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
    }
);

app.listen(8080, ()=>{
    console.log("The server is online")
});