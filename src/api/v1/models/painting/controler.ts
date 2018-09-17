import {PaintingModel} from './schema';
export default class PaintingController {
    // tslint:disable-next-line:no-empty
    constructor() {}

    public async getAll(req : any, reply : any) {
        return PaintingModel.find();
    }
    public async create(req : any, reply : any) {
        const {name, url, techniques} = req.payload;
        const painting = new PaintingModel({name, url, techniques});

        return painting.save();
    }
}