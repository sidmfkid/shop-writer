import mongoose from "mongoose";
const { Schema } = mongoose;

const CompletionSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Products" },
  prompt: String,
  completion: {
    content: String,
    good: Boolean,
    bad: Boolean,
  },
});

const CompletionModel = mongoose.model("Completions", CompletionSchema);

export default CompletionModel;
