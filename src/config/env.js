require('dotenv').config({ quiet: true });

const env = {
    PORT: Number(process.env.PORT),
     DB_HOST : process.env.DB_HOST,
     DB_PORT : Number(process.env.DB_PORT),
     DB_NAME : process.env.DB_NAME,
     DB_DEFAULT_NAME: process.env.DB_DEFAULT_NAME,
     DB_USER : process.env.DB_USER,
     DB_PASSWORD : process.env.DB_PASSWORD,
     DB_DIALECT : process.env.DB_DIALECT,
     JWT_SECRET : process.env.JWT_SECRET,
     JWT_EXPIRES_IN : process.env.JWT_EXPIRES_IN,

}

module.exports = env;