import {paintingRoute} from '../models';
import Path from 'path';
export default class ApiRouter {

    public async init(server : any, urlPrefix : string) {
        server.route([
            {
                method: 'GET',
                path: `/{path*}`,
                handler: {
                    file: 'index.html'
                }
            }
        ]);
        paintingRoute(server, urlPrefix);
    }
}