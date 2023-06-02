const dbPool = require( '../config/db-mysql');

function promiseQueryFunc (query, values) {
	return new Promise((resolve, reject) => {
		dbPool.then(res => {
			res.getConnection((err, dbConnection) => {
				if (err) {
					reject({
						status: 500,
						message: 'Database Error',
						errorMessage: err
					});
				} 

				dbConnection.query(query, values, (err, results) => {
					dbConnection.release();
					if (err) return reject(err);
					resolve(results);
				});
			});
		})
	});
};

module.exports = {
    promiseQueryFunc
}
