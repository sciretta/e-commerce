import { Schema, model } from 'mongoose';
import { ProductInterface } from './models-types';

const productSchema = new Schema<ProductInterface>({
  name: { type: String, trim: true, required: true },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default model<ProductInterface>('product', productSchema);
