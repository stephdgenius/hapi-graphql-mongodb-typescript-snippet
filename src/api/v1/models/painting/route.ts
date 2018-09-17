import * as Hapi from 'hapi';
import {paintingModel, paintingController} from '../index';

export default function (server : Hapi.Server, urlPrefix : string) {
    // Initialize painting controller for server
    const controller = new paintingController();
    server.bind(controller);

    // Painting routes
    server.route([
        {
            method: 'GET',
            path: `${urlPrefix}/paintings`,
            handler: controller.getAll
        }, {
            method: 'POST',
            path: `${urlPrefix}/paintings`,
            handler: controller.create
        }
    ]);
}