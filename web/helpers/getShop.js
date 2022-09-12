import { Shopify } from "@shopify/shopify-api";




export default function getShop(app) {

return async (req,res,next) => {
    req.locals.app = app;
    next();

}

}