import express from "express";
import { authRouter } from "../routers/auth.router";
import { categoryRouter } from "../routers/category.router";
import { productRouter } from "../routers/product.router";
import { uploadRouter } from "../routers/upload.router";
import fileUpload from "express-fileupload";
import { userRouter } from "../routers/user.router";

const app = express();

// Middlewares
app.use(express.json());
app.use(fileUpload());

// Routers
app.use("/auth", authRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/upload", uploadRouter);
app.use("/users", userRouter);

export { app };
