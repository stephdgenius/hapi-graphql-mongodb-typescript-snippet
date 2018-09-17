import * as Hapi from 'hapi';

// Interfaces
import {IPlugin, IPluginInfo} from '../interfaces';

// Async function for register plugin in Hapi
const register = async(server : Hapi.Server, urlPrefix : string) : Promise < void > => {
    try {
        return server.register([
            require('inert'),
            require('vision'), {
                plugin: require('hapi-swagger'),
                options: {
                    info: {
                        title: 'Painting Api',
                        description: 'Painting Api Documentation',
                        version: '1.0.0'
                    },
                    tags: [
                        {
                            name: 'Painting',
                            description: 'Api painting interface.'
                        }
                    ],
                    swaggerUI: true,
                    documentationPage: true,
                    documentationPath: `${urlPrefix}/docs`
                }
            }
        ]);
    } catch (err) {
        console.log(`Error registering swagger plugin: ${err}`);
    }
};

export default() : IPlugin => {
    return {
        register,
        info: () => {
            return {name: 'Swagger Documentation', version: '1.0.0'};
        }
    };
};