import * as Hapi from 'hapi';
import PaintingController from './controler';
import PaintingModel from '../index';

export default function (server : Hapi.Server, urlPrefix : string) {
    // Initialize painting controller for server
    const controller = new PaintingController();
    server.bind(controller);

    // Painting routes
    server.route({
        method: 'GET',
        path: `${urlPrefix}/paintings`,
        handler: controller.getAll,
        options: {
            description: 'Get all the paintings',
            tags: ['api', 'v1', 'painting']
        }
    });
    server.route({
        method: 'POST',
        path: `${urlPrefix}/paintings`,
        handler: controller.create,
        options: {
            description: 'Add a specific painting.',
            tags: ['api', 'v1', 'painting']
        }
    });
}