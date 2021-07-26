import { Schema, model } from 'mongoose';
import { PurchaseInterface } from './models-types';

const purchaseSchema = new Schema<PurchaseInterface>({
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
      unitPrice: {
        type: Number,
        required: true,
      },
      productId: {
        type: String,
        required: true,
      },
    },
  ],
  userId: {
    type: String,
    required: true,
  },
});

export default model<PurchaseInterface>('purchase', purchaseSchema);
