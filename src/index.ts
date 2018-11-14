// import * as Database from './database';
import Server from './server';
import Database from './database';
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
const database = new Database();

/**
 * Function for start Server
 *
 */
const start = async() => {
    try {
        // Init Database Server
        database.launch();

        // Init API Server
        const serverExec = await server.launch(api);
        await serverExec.start();
        console.log('🌐  Server running at:', serverExec.info.uri);
    } catch (err) {
        console.error('❌  Error starting server: ', err.message);
        throw err;
    }
};

start();