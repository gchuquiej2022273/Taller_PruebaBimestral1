import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";

import { productoPost } from "./produc.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("nameProducto", "The product name is mandatory").not().isEmpty(),
        check("cantidad", "the stoncks is mandatory").isNumeric(),
        check("precio", "El precio es numerico").isDecimal(),
        check("categoria", "The categoria is mandatory").not().isEmpty(),
        validarCampos,
    ],productoPost);

export default router;