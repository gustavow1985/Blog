const Sequeliza = require('sequelize');
const connection = new Sequeliza('blog', 'root', 'Asa123123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;