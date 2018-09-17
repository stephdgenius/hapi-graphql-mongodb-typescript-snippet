// import * as Database from './database';
import Server from './server';
import Api from './api';

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error : Error) => {
    // tslint:disable-next-line:no-console
    console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason : any) => {
    // tslint:disable-next-line:no-console
    console.error(`unhandledRejection ${reason}`);
});

// Define modules
const api = new Api();
const server = new Server();

/**
 * Function for start API
 *
 */
const start = async() => {
    try {
        const serverExec = await server.launch(api);
        await serverExec.start();
        console.log('Server running at:', serverExec.info.uri);
    } catch (err) {
        console.error('Error starting server: ', err.message);
        throw err;
    }
};

// Init Database
for (let index = 1; index < api.version + 1; index++) {
    // tslint:disable-next-line:no-var-requires
    const database = require(`./api/v${index}`);
    database.launch();
}

start();