import mongoose from 'mongoose';

export function launch() {
    // We connect to the remote server
    mongoose.connect('mongodb://test:test12345@ds259742.mlab.com:59742/hapi-test', {useNewUrlParser: true});

    // We initialize the default connection of the mongoose module
    const mongoDb = mongoose.connection;

    // Launch MongoDB events
    mongoDb.on('error', (error) => {
        console.log(`Unable to connect to database: ${error}`);
    });
    mongoDb.once('open', () => {
        console.log('🌐  Connnected to database');
    });

    return true;
}