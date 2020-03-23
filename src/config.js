/** Import dotenv to get access to environment variables defines in .env */
require('dotenv').config();

module.exports = {
    db_port: process.env.DB_PORT,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    api_url_prefix: process.env.API_URL_PREFIX,
    app_url: process.env.APP_URL
}