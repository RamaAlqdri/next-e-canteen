import { Product } from "./ProductModels";

export type Canteen = {
    _id?: string;
    user: { name: string };
    name: string;
    slug: string;
    image: string;
    description: string;
    items: [Product];
}