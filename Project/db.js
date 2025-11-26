const pg = require('pg');
const con = new pg.Pool({

user:'postgres',
host:'localhost',
database:'MyDatabase',
password: 'Yogesh@1432',
port: 5432, // default PostgreSQL port

});

module.exports =con;