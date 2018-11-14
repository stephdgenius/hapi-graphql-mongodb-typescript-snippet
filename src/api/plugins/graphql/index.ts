import * as Hapi from 'hapi';
import {graphqlHapi} from 'graphql-server-hapi';

// Interfaces
import {IPlugin, IPluginInfo} from '../interfaces';

// GraphQL schema
import schema from '../../graphql/schema';

// Async function for register plugin in Hapi
const register = async(server : Hapi.Server) : Promise < void > => {
    try {
        return server.register([
            require('inert'),
            require('vision'), {
                plugin: graphqlHapi,
                options: {
                    info: {
                        title: 'GraphQL',
                        description: 'GraphQL for Hapi',
                        version: '1.0.0'
                    },
                    path: `/graphql`,
                    graphqlOptions: {
                        schema
                    },
                    route: {
                        cors: true
                    }
                }
            }
        ]);
    } catch (err) {
        console.log(`Error registering GraphQL plugin: ${err}`);
    }
};

export default() : IPlugin => {
    return {
        register,
        info: () => {
            return {name: 'GraphQL', version: '1.0.0'};
        }
    };
};