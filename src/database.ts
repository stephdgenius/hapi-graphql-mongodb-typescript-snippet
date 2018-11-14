import mongoose from 'mongoose';

export default class Database {
    private mongoDb: any;

    public launch() {
        // We connect to the remote server
        mongoose.connect('mongodb://test:test12345@ds259742.mlab.com:59742/hapi-test', {useNewUrlParser: true});

        // We initialize the default connection of the mongoose module
        this.mongoDb = mongoose.connection;
    }
    private databaseServerEvents() {
        // Launch MongoDB events
        this.mongoDb.on('error', (error: any) => {
            console.log(`Unable to connect to database: ${error}`);
        });
        this.mongoDb.once('open', () => {
            console.log('🌐  Connnected to database');
        });
    }
}