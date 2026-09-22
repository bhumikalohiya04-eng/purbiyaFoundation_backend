const mysql = require ("mysql2");

const connection = mysql.createConnection({
    host: "mysql-2e2d521d-suresh-c910.f.aivencloud.com",
    port:"12859",
    user: "avnadmin",
    password: "AVNS_gJ5iyVv9Jm34heIdxmW",
    database: "defaultdb"
});

connection.connect((err) => {
    if(err) {
        console.log("err");
    }
    else{
        console.log("MySql Connected");
        
    }
});

module.exports = connection;
