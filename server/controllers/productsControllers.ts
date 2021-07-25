import { Request, Response } from 'express';
import { _LeanDocument } from 'mongoose';
import { ProductInterface } from '../models/models-types';
import Product from '../models/product';

// @desc    Create Product.
// @route   POST /product/create
// @access  Private

export const createProduct = async (
  req: Request<unknown, unknown, ProductInterface>,
  res: Response<{ error: string } | { productCreated: ProductInterface }>,
) => {
  const { name, price, stock, image } = req.body;

  //validations
  if (!name || !price || !stock || !image)
    return res
      .status(400)
      .json({ error: 'Not all required info have been entered.' });

  let existingProduct;
  try {
    existingProduct = await Product.findOne({ name });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }

  if (existingProduct)
    return res
      .status(400)
      .json({ error: 'A product with this name already exists.' });

  //create new product
  let productCreated;
  try {
    productCreated = await Product.create({
      name,
      price,
      stock,
      image,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }

  console.log({ productCreated });

  return res.status(200).json({
    productCreated: {
      id: productCreated._id,
      name: productCreated.name,
      price: productCreated.price,
      stock: productCreated.stock,
      image: productCreated.image,
    },
  });
};

// @desc    Get Products.
// @route   GET /products
// @access  Public

export const getProducts = async (
  req: Request<unknown, unknown, ProductInterface>,
  res: Response<{ error: string } | { products: ProductInterface[] }>,
) => {
  const productsFound = await Product.find({});

  return res.status(200).json({
    products: productsFound.map((p) => ({
      id: p._id,
      image: p.image,
      stock: p.stock,
      price: p.price,
      name: p.name,
    })),
  });
};

// @desc    Delete Product.
// @route   DELETE /product/delete
// @access  Private

export const deleteProduct = async (
  req: Request<unknown, unknown, ProductInterface>,
  res: Response<{ error: string } | { productDeleteId: string }>,
) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      error: 'Product id is required',
    });
  }

  let productDeleted;
  try {
    productDeleted = await Product.findByIdAndDelete(id);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }

  return res.status(200).json({
    productDeleteId: productDeleted?._id,
  });
};
