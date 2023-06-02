const mysql = require("mysql");
const config = require("./config");

const dbPoolPromise = new Promise((resolve, reject) => {
config.configData().then((res) => {
        const dbConnectionInfo = {
            user: res.database.user,
            password: res.database.password,
            host: res.database.host,
            database: res.database.database,
        };

        var dbPool = mysql.createPool(dbConnectionInfo);
        resolve(dbPool);
    });
});

module.exports = dbPoolPromise;
