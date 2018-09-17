import {paintingRoute} from '../models';
export default class ApiRouter {

    public async init(server : any, urlPrefix : string) {
        server.route([
            {
                method: 'GET',
                path: `/`,
                handler() {
                    return `<h1>BA APIs</h1>`;
                }
            }
        ]);
        paintingRoute(server, urlPrefix);
    }
}