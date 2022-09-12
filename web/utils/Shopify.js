import { Shopify, LATEST_API_VERSION } from "@shopify/shopify-api";
import dotenv from "dotenv";
dotenv.config();

const dbUrl = "mongodb://localhost:27017" || process.env.DB_URL;
// const shop = () => {};
Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https?:\/\//, ""),
  HOST_SCHEME: process.env.HOST.split("://")[0],
  API_VERSION: LATEST_API_VERSION,
  IS_EMBEDDED_APP: true,
  SESSION_STORAGE: new Shopify.Session.MongoDBSessionStorage(
    dbUrl,
    "shop-writer"
  ),

  // This should be replaced with your preferred storage strategy
  // SESSION_STORAGE: new Shopify.Session.SQLiteSessionStorage(DB_PATH),
});

export default Shopify;
