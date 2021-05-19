const express = require("express");
const app = express();
const connection = require('./database/database')

app.set('view engine', 'ejs');
app.use(express.static("public"));


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

app.get ("/", (req, res) =>{
    res.render("index")
});

app.listen(8080, ()=>{
    console.log("The server is online")
});