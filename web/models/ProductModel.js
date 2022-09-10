import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
  shop: { type: Schema.Types.ObjectId, ref: "Active_Stores" },
  shopify_id: String,
  title: String,
  price: String,
  image: String,
  currentDescription: String,
  tags: [String],
  generatedContent: [{ type: Schema.Types.ObjectId, ref: "Completions" }],
});

const ProductModel = mongoose.model("Products", ProductSchema);

export default ProductModel;
