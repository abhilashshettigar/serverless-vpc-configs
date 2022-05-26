'use strict';
// const path = require('path'); Use if Required (For env path)
require('dotenv'); //.config({ path: path.resolve(__dirname, '../src/config/.env') });
const mysql = require('mysql2/promise');

module.exports.hello = async (event, context, callback) => {
    try {
        let dbConnection = await mysql.createConnection({
            host: process.env.MYSQL_DATABASE_HOST,
            port: process.env.MYSQL_DATABASE_PORT,
            user: process.env.MYSQL_DATABASE_USERNAME,
            password: process.env.MYSQL_DATABASE_PASSWORD,
            database: process.env.MYSQL_DATABASE_NAME + '_' + process.env.DB_ENV,
        });
        // console.log('DB Connect Successfullty', dbConnection);
        console.log('DB Connect Successfullty')
        const test = await dbConnection.query('SELECT DATABASE()');
        console.log('Test===========',test)
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Go Serverless v1.0! Your function executed successfully!',
                // input: event,
            }),
        };
        return response;
    } catch (error) {
        console.log('ERROR =', error);
        throw error;
    }
};
