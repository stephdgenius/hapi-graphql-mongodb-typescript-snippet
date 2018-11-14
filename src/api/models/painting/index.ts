import mongoose, {Schema} from 'mongoose';

const paintingSchema = new mongoose.Schema({name: String, techniques: [String], url: String});
const PaintingModel = mongoose.model('Painting', paintingSchema);
export default PaintingModel;