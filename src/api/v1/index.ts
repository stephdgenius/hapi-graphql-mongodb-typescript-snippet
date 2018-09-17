import mongoose, {Schema} from 'mongoose';

export function launch() {
    // We connect to the remote server
    mongoose.connect('mongodb://badmin:DBba4560@ds249992.mlab.com:49992/bevoiceafrica', {useNewUrlParser: true});

    // We initialize the default connection of the mongoose module
    const mongoDb = mongoose.connection;

    // Launch MongoDB events
    mongoDb.on('error', (error) => {
        console.log(`Unable to connect to database: ${error}`);
    });
    mongoDb.once('open', () => {
        console.log('Connnected to BA Database');
    });

    return console.log('Database launch complete');
}