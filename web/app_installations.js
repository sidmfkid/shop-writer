import { Shopify } from "@shopify/shopify-api";
import StoreModel from "./models/StoreModel.js";
export const AppInstallations = {
  includes: async function (shopDomain) {
    const shopSessions =
      await Shopify.Context.SESSION_STORAGE.findSessionsByShop(shopDomain);

    if (shopSessions.length > 0) {
      for (const session of shopSessions) {
        if (session.accessToken) {
          const isShopAvaialble = await StoreModel.findOne({
            shop: shopDomain,
          });

          if (isShopAvaialble === null || !isShopAvaialble.isActive) {
            if (isShopAvaialble === null) {
              await StoreModel.create({
                shop: shopDomain,
                isActive: true,
              });
            } else if (!isShopAvaialble.isActive) {
              await StoreModel.findOneAndUpdate(
                { shop: shopDomain },
                { isActive: true }
              );
            }
          }

          return true;
        }
      }
    }

    return false;
  },

  delete: async function (shopDomain) {
    const shopSessions =
      await Shopify.Context.SESSION_STORAGE.findSessionsByShop(shopDomain);
    if (shopSessions.length > 0) {
      await StoreModel.findOneAndUpdate(
        { shop: shopDomain },
        { isActive: false }
      );
      await Shopify.Context.SESSION_STORAGE.deleteSessions(
        shopSessions.map((session) => session.id)
      );
    }
  },
};
