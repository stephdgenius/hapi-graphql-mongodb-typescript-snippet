import * as Hapi from 'hapi';
import {graphiqlHapi} from 'graphql-server-hapi';

// Interfaces
import {IPlugin, IPluginInfo} from '../interfaces';

// Async function for register plugin in Hapi
const register = async(server : Hapi.Server, urlPrefix : string) : Promise < void > => {
    try {
        return server.register([
            require('inert'),
            require('vision'), {
                plugin: graphiqlHapi,
                options: {
                    info: {
                        title: 'GraphiQL',
                        description: 'GraphiQL for Hapi',
                        version: '1.0.0'
                    },
                    path: `${urlPrefix}/graphiql`,
                    graphiqlOptions: {
                        endpointURL: `${urlPrefix}/graphql`
                    },
                    route: {
                        cors: true
                    }
                }
            }
        ]);
    } catch (err) {
        console.log(`Error registering GraphiQL plugin: ${err}`);
    }
};

export default() : IPlugin => {
    return {
        register,
        info: () => {
            return {name: 'GraphiQL', version: '1.0.0'};
        }
    };
};