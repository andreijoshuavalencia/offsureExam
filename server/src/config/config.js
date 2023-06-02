let configData = function () {
    
    return new Promise (async function (resolve, reject) {
        const config = {
            database: {
                user: 'root',
                password: 'andreijoshua',
                host:'localhost',
                database: 'offsuredata'
            }
        }
        resolve(Object.assign(config))
    })
}

module.exports = {
    configData
}