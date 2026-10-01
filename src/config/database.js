const env = require('./env');
const { Sequelize } = require('sequelize');

const adminSequelize = new Sequelize(
    env.DB_DEFAULT_NAME,
    env.DB_USER,
    env.DB_PASSWORD,
    {
        port: env.DB_PORT,
        host: env.DB_HOST,
        dialect: env.DB_DIALECT
    }
);

const sequelize = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASSWORD,
    {
        port: env.DB_PORT,
        host: env.DB_HOST,
        dialect: env.DB_DIALECT
    }
);

const isExistDb = async () => {
    const [result] = await adminSequelize.query(
        'SELECT datname FROM pg_database WHERE datname = :dbName',
        {
            replacements: {
                dbName: env.DB_NAME
            }
        }
    );

    if (result.length === 0) {
        console.log('Creating database...');

        await adminSequelize.query(
            `CREATE DATABASE "${env.DB_NAME}"`
        );

        console.log('Database created');
    } else {
        console.log('Database already exists');
    }
};

module.exports = {
    isExistDb,
    sequelize
}; 