const app = require('./app');
const env = require('./config/env');
const { isExistDb, sequelize } = require('./config/database');

require('./models');

const start = async () => {
    try {
        await isExistDb();

        await sequelize.authenticate();
        console.log('Database connected');

        await sequelize.sync({ alter: true });
        console.log('Database synchronized');

        const server = app.listen(env.PORT, () => {
            console.log(`Server is running on port ${env.PORT}`);
        });

        const processKillEvents = ['SIGINT', 'SIGTERM'];

        processKillEvents.forEach(signal => {
            process.on(signal, () => {
                console.log('Kill Command');

                server.close(() => {
                    console.log('Server closed');
                    sequelize.close();
                });
            });
        });

    } catch (error) {
        console.error('Server startup error:', error);
        process.exit(1);
    }
};

start();