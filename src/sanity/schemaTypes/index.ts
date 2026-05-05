import { productSchema } from "./product";
import { makerSchema } from "./maker";

export const schema = {
  types: [makerSchema, productSchema],
};
