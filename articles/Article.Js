const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Category.hasMany(Article); //uma categoria tem muitos artigos - relacionamento 1 para muitos (hasMany)
Article.belongsTo(Category); //um artigo pertence a uma categoria - relacionamento 1 para 1 no sequelize (belongsTo)

// Article.sync({force: true}); //cria tabela novamente sempre que o programa for executado

module.exports = Article;