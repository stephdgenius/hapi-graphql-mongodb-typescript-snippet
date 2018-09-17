import mongoose, {Schema} from 'mongoose';

const paintingSchema = new mongoose.Schema({name: String, techniques: [String], url: String});
export const PaintingModel = mongoose.model('Painting', paintingSchema);