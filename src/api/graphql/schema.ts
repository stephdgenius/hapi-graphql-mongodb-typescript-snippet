import {GraphQLObjectType, GraphQLString, GraphQLSchema} from 'graphql';

import PaintingType from './paintingType';
import PaintingModel from '../models/painting';

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        painting: {
            type: PaintingType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                // Logic for serving data
                return PaintingModel    .findById(args.id);
            }
        }
    }
});

const schema = new GraphQLSchema({query: rootQuery});

export default schema;