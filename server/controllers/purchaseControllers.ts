import { Request, Response } from 'express';
import { PurchaseInterface } from '../models/models-types';
import Product from '../models/product';
import Purchase from '../models/purchase';
import User from '../models/user';

// @desc    Create Purchase.
// @route   POST /purchase/new
// @access  Private

export const newPurchase = async (
  req: Request<unknown, unknown, PurchaseInterface>,
  res: Response<{ error: string } | { successPurchase: boolean }>,
) => {
  const { userId, products } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.json({ error: 'User not found.' });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
  if (!products)
    return res.status(400).json({
      error: `Products array is malformed`,
    });

  try {
    for (const p of products) {
      if (!p?.count || !p?.productId)
        return res.status(400).json({
          error: `Products array is malformed`,
        });

      const currentProduct = await Product.findById(p.productId);
      if (!currentProduct)
        return res.status(400).json({
          error: `The product  ${p.name} doesnt exist `,
        });

      if (
        (Number(currentProduct?.stock) || 0) < Number(p?.count as number) ||
        !currentProduct?.stock
      ) {
        return res.status(400).json({
          error: `The product ${p.name} exceeds our current stock ${currentProduct?.stock} `,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }

  try {
    for (const p of products) {
      const currentProduct = await Product.findById(p.productId);

      await Product.findByIdAndUpdate(p.productId, {
        stock:
          Number(currentProduct?.stock as number) - Number(p?.count as number),
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }

  let purchasedDone;
  try {
    purchasedDone = await Purchase.create({ userId, products });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }

  console.log({ purchasedDone });

  return res.status(200).json({
    successPurchase: true,
  });
};
