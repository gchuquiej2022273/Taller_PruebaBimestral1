import { Router } from "express";
import { verProducto, agregarCarrito, verCarrito } from "./store.controller.js";

import { validarJwt } from "../middlewares/validar-jwt.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";

const router = Router();

router.get("/productos", verProducto);


router.post(
    "/:id",
    [
        check("cantidad","La cantidad no puede ir vacia").not().isEmpty(),
        validarCampos
    ], agregarCarrito);

router.get("/verCarrito", verCarrito);

export default router;