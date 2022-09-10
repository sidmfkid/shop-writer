import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
  shop: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true, default: false },
  subscription: {
    id: { type: String, required: false },
    status: { type: String, required: false },
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
});

const StoreModel = mongoose.model("Active_Stores", StoreSchema);

export default StoreModel;
