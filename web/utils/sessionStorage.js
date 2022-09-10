import dotenv from "dotenv";
dotenv.config();

import SessionModel from "../models/SessionModel.js";
import { Shopify } from "@shopify/shopify-api";
import Cryptr from "cryptr";
const cryption = new Cryptr(process.env.ENCRYPTION_STRING);

const storeCallback = async (session) => {
  const result = await SessionModel.findOne({ id: session.id });

  if (result === null) {
    await SessionModel.create({
      id: session.id,
      content: cryption.encrypt(JSON.stringify(session)),
      shop: session.shop,
    });
  } else {
    await SessionModel.findOneAndUpdate(
      { id: session.id },
      {
        content: cryption.encrypt(JSON.stringify(session)),
        shop: session.shop,
      }
    );
  }

  return true;
};

const loadCallback = async (id) => {
  const sessionResult = await SessionModel.findOne({ id });
  if (sessionResult.content.length > 0) {
    return JSON.parse(cryption.decrypt(sessionResult.content));
  }
  return undefined;
};

const deleteCallback = async (id) => {
  await SessionModel.deleteMany({ id });
  return true;
};

const sessionStorage = new Shopify.Session.CustomSessionStorage(
  storeCallback,
  loadCallback,
  deleteCallback
);

export default sessionStorage;
