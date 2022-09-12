// import Shopify from "../utils/Shopify.js";
import { Shopify, LATEST_API_VERSION } from "@shopify/shopify-api";
import { Configuration, OpenAIApi } from "openai";

import { Product } from "@shopify/shopify-api/dist/rest-resources/2022-07/index.js";

import express from "express";
import ProductModel from "../models/ProductModel.js";
import CompletionModel from "../models/CompletionModel.js";
import dotenv from "dotenv";
dotenv.config();

const { OPEN_API_KEY } = process.env;

const productRoutes = express.Router();

productRoutes.get("/count", async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(
    req,
    res,
    req.app.get("use-online-tokens")
  );
  const { Product } = await import(
    `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
  );

  const countData = await Product.count({ session });
  res.status(200).send(countData);
});

productRoutes.get("/create", async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(
    req,
    res,
    req.app.get("use-online-tokens")
  );
  let status = 200;
  let error = null;

  try {
    await productCreator(session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

productRoutes.get("/import", async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(
    req,
    res,
    req.app.get("use-online-tokens")
  );
  let status = 200;
  let error = null;
  let data = [];
  console.log(session);
  try {
    data = await Product.all({
      session: session,
    });

    res.status(status).json(data);
  } catch (e) {
    console.log(`Failed to process products/all: ${e.message} on route IMPORT`);
    status = 500;
    error = e.message;
    res.status(status).send(error);
  }
});

// All endpoints after this point will have access to a request.body
// attribute, as a result of the express.json() middleware
// app.use(bodyParser.urlencoded({ extended: false}));

// app.use(bodyParser.json());

productRoutes.post("/import", async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(
    req,
    res,
    req.app.get("use-online-tokens")
  );
  let status = 200;
  let error = null;
  let data = [];
  let body;
  let newProducts;

  try {
    if (!req.query.products) {
      return res
        .status(status)
        .send({ success: status === 300, error, body: "MISSING PARAMS" });
    }
    data = await Product.all({
      session: session,
    });
    const { products } = req.query;
    const productArr = products.split(",");
    const productsFormattedArr = data.map((d) => {
      const match = productArr.filter((n) => d.id.toString() === n);
      if (match.length > 0) {
        return {
          shopify_id: d.id,
          title: d.title,
          price: d.variants[0].price,
          currentDescription: d.body_html,
          tags: d.tags,
        };
      } else {
        return;
      }
    });
    const finalArr = productsFormattedArr.filter((n) => n !== undefined);

    const isShopAvailable = await StoreModel.find({ shop: session.shop });

    if (isShopAvailable.length) {
      console.log(isShopAvailable, "updatedshop");

      const oldProducts = await ProductModel.find({});

      const filteredProd = finalArr.filter((v) => {
        let num = oldProducts.filter(
          (g) => v?.shopify_id?.toString() === g.shopify_id?.toString()
        );
        if (num.length === 0) {
          return v;
        }
        return;
      });

      console.log(filteredProd);

      if (filteredProd.length > 0) {
        newProducts = await ProductModel.insertMany(filteredProd).catch((e) =>
          console.log(e)
        );

        console.log(newProducts);
        const newProductIds = newProducts.map((v) => v._id);

        const updateShop = await StoreModel.findOneAndUpdate(
          { shop: session.shop },
          { $push: { products: newProductIds } }
        );
        body = updateShop;
      }

      return res
        .status(status)
        .send({ success: status === 200, error, body: body });
    } else {
      const newProducts = await ProductModel.insertMany(finalArr).catch((e) =>
        console.log(e)
      );
      console.log(newProducts);

      const newProductIds = newProducts.map((v) => v._id);

      const createdShop = await StoreModel.create({
        shop: session.shop,
        isActive: true,
        products: newProductIds,
      });
      // const newProducts = await ProductModel.insertMany(finalArr).catch(e => console.log(e));

      body = createdShop.populate("products");
      console.log(body, "createdShop");

      return res
        .status(status)
        .send({ success: status === 200, error, body: body });
    }

    console.log(body, "posted");

    res.status(status).send({ success: status === 200, error, body: body });
  } catch (e) {
    console.log(`Failed to process products/all: ${e.message}`);
    status = 500;
    error = e.message;
    res.status(status).send(error);
  }
});

productRoutes.get("/edit/:id", async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(
    req,
    res,
    req.app.get("use-online-tokens")
  );
  let status = 200;
  let error = null;
  let body = null;
  const id = req.params.id;
  // console.log(id);
  try {
    const product = await ProductModel.findOne({ shopify_id: id }).populate({
      path: "generatedContent",
    });
    // console.log(product);

    // const selectedProduct = products.products.filter(
    //   (n) => n.shopify_id.toString() === id.toString()
    // );

    const productObj = product;
    body = productObj;
  } catch (e) {
    console.log(`Failed to process products/edit: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error, body: body });
});

productRoutes.post("/edit/:id", async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(
    req,
    res,
    req.app.get("use-online-tokens")
  );
  let status = 200;
  let error = null;
  let body = null;
  let newCompletion = null;
  // const id = req.params;
  try {
    const configuration = new Configuration({
      apiKey: OPEN_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    body = req.query;
    const id = req.params.id;
    const prompt = `${body.description}`;

    const response = await openai.createCompletion({
      model: "text-davinci-001",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 500,
    });

    const product = await ProductModel.findOne({
      shopify_id: id,
    });

    const generatedContent = {
      product: product._id,
      prompt: prompt,
      completion: { content: response.data.choices[0].text },
    };

    // const newProduct = product[0].generatedContent.push(generatedContent);
    const completion = await CompletionModel.create(generatedContent);

    const updatedProduct = await ProductModel.findOneAndUpdate(
      { shopify_id: id },
      { $push: { generatedContent: completion._id } }
    );

    const productUpdates = await ProductModel.findOne({
      shopify_id: id,
    }).populate({ path: "generatedContent" });

    body = productUpdates;
    newCompletion = response.data;
  } catch (e) {
    console.log(`Failed to process products/edit: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res
    .status(status)
    .send({ success: status === 200, error, body: body, ai: newCompletion });
});
export default productRoutes;
