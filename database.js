var mysql = require("mysql");
require('dotenv').config();


var connection = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABSAE,
    user: process.env.USER,
    password: process.env.PASSWORD    
})







module.exports = connection