import { cache } from "react";
import ProductModel, { Product } from "../models/ProductModels";
import dbConnect from "../dbConnect";

export const revalidate = 3600;

const getLatest = cache(async () => {
  await dbConnect();
  const products = await ProductModel.find({})
    .sort({ _id: -1 })
    .limit(4)
    .lean();
  return products as Product[];
});

const getFeatured = cache(async () => {
  await dbConnect();
  const products = await ProductModel.find({ isFeatured: true }).limit(3).lean();
  return products as Product[];
});

const getBySlug = cache(async (slug: string)=>{
    await dbConnect()
    const product = await ProductModel.findOne({slug}).lean()
    return product as Product
})

const productsService = {
  getLatest,
  getFeatured,
  getBySlug,
};
export default productsService;
