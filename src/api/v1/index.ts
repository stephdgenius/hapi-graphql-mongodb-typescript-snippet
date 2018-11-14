import PaintingRoute from '../models/painting/v1/route';
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
        PaintingRoute(server, urlPrefix);
    }
}