const Sequeliza = require('sequelize');
const connection = new Sequeliza('blog', 'root', 'Asa123123', {
    host: 'localhost',
    dialect: 'mysql',
    timezone:"-03:00" //ajusta timezone
});

module.exports = connection;