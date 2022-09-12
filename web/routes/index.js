import express from "express";
import completionRoutes from "./completionRoutes.js";
import productRoutes from "./productRoutes.js";

const apiRouter = express.Router();

apiRouter.use("/completions", completionRoutes);
apiRouter.use("/products", productRoutes);

export default apiRouter;
