import * as Hapi from 'hapi';
import Path from 'path';

// Interfaces
import {IPlugin} from './api/plugins/interfaces';

export default class Server {
    public launch(api : any) {
        return new Promise < Hapi.Server > ((resolve, reject) => {
            try {
                const server = new Hapi.Server({
                    host: 'localhost',
                    port: 4000,
                    routes: {
                        cors: {
                            origin: ['*']
                        },
                        files: {
                            relativeTo: Path.join(__dirname, 'public')
                        }
                    }
                });

                this
                    .loader(server, api)
                    .then(() => {
                        resolve(server);
                    });

            } catch (error) {
                reject(error);
                console.log('❌  Error when starting server: ', error);
                throw error;
            }
        });
    }

    /**
     * This function load plugins about version of API
     * @param server
     * @param version
     */
    private async loadPlugins(server : Hapi.Server) {
        const pluginPromises : Array < Promise < any >> = [];
        let pluginsList : string[] = [];

        // Import plugins list
        const allPlugins = import (`./api/plugins`).then((plugins) => {
            try {
                pluginsList = plugins.list;

                // We go through the list of plugins
                pluginsList.forEach((pluginName : string) => {
                    const plugin : IPlugin = require(`./api/plugins/${pluginName}`).default();
                    // tslint:disable-next-line:max-line-length
                    console.log(`✅  Register Plugin ${plugin.info().name} v${plugin.info().version}`);

                    // Register plugin
                    pluginPromises.push(plugin.register(server));
                });
                Promise.all(pluginPromises).then(() => {
                    console.log(`✅  All plugins loaded sucessfully`);
                });
            } catch (error) {
                console.log(`❌  Error registring plugins: ${error}`);
            }
        });
    }

    /**
     * This function load router about version of API
     * @param server
     * @param version
     */
    private async loadRouter(server : Hapi.Server, version : number) {
        try {
            // Import router of selected API
            const router = import (`./api/v${version}/router/router`).then((routes) => {
                const apiRouter = new routes.default;
                apiRouter
                    .init(server, `/v${version}`)
                    .then(() => {
                        console.log(`✅  API v${version} routes registered sucessfully`);
                    });
            });
        } catch (error) {
            console.log(`❌  Error laoding API v${version} routes: ${error}`);
        }
    }

    /**
     * Load all APIs routes and plugins
     * @param server
     * @param api
     */
    private async loader(server : Hapi.Server, api : any) {
        console.log('🔄  Loading all APIs routes and plugins...');
        await this.loadPlugins(server);
        for (let index = 1; index < api.version + 1; index++) {
            await this.loadRouter(server, index);
        }
    }
}