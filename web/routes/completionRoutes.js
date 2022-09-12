import { Shopify } from "@shopify/shopify-api";
import express from "express";
import CompletionModel from "../models/CompletionModel.js";

const completionRoutes = express.Router();

completionRoutes.post("/delete/:id", async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(
    req,
    res,
    req.app.get("use-online-tokens")
  );
  let status = 200;
  let error = null;
  let body = null;
  let id = req.params.id;
  try {
    const deletedCompletion = await CompletionModel.findByIdAndDelete(id);
    body = deletedCompletion;
  } catch (e) {
    console.log(`Failed to process products/edit: ${e.message}`);
    status = 500;
    error = e.message;
  }

  res.status(status).send({ success: status === 200, error, body: body });
});

completionRoutes.post("/edit/:id", async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(
    req,
    res,
    req.app.get("use-online-tokens")
  );
  let status = 200;
  let error = null;
  let body = null;
  let id = req.params.id;
  let content = req.query.content;
  console.log(content);
  try {
    const editedCompletion = await CompletionModel.findByIdAndUpdate(id, {
      completion: {
        content: content,
      },
    });
    console.log(editedCompletion);
    body = "posted";
  } catch (e) {
    console.log(`Failed to process products/edit: ${e.message}`);
    status = 500;
    error = e.message;
  }

  res.status(status).send({ success: status === 200, error, body: body });
});

export default completionRoutes;
