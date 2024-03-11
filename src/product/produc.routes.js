import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";

import { productoPost, getProducto, getMasVendido, getFiltrarCate, getAllProcuto, getProducAgot ,putProducto} from "./produc.controller.js";

import { noExiteCategoria, existeProducto } from "../helpers/db-validator.js";

import { validarRole } from "../middlewares/validar-role.js";

import { validarJwt } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJwt,
        validarRole,
        check("nameProducto").custom(existeProducto),
        check("nameProducto", "The product name is mandatory").not().isEmpty(),
        check("cantidad", "the stoncks is mandatory").isNumeric(),
        check("precio", "El precio es numerico").isDecimal(),
        check("categoria", "The categoria is mandatory").not().isEmpty(),
        check("categoria").custom(noExiteCategoria),
        validarCampos,
    ], productoPost);

router.get(
    "/get",
    [
        validarJwt,
        check("nameProducto", "Es necesario El nombre del producto").not().isEmpty(),
        validarCampos,
    ], getProducto);

router.get(
    "/masVentido",
    validarJwt,
    getMasVendido,
);

router.get(
    "/fil",
    [
        validarJwt,
        check("categoria", "Se necesita una categoria para buscar").not().isEmpty(),
        validarCampos,
    ], getFiltrarCate);

router.get("/all",
    validarJwt,
    validarRole,
    getAllProcuto);

router.get(
    "/agotado",
    validarJwt,
    validarRole,
    getProducAgot
)

router.put(
    "/:id",
    [
        validarJwt,
        validarRole,
        check("nameProducto", "The product name is mandatory").not().isEmpty(),
        check("cantidad", "the stoncks is mandatory").isNumeric(),
        check("precio", "El precio es numerico").isDecimal(),
        check("categoria", "The categoria is mandatory").not().isEmpty(),
        check("categoria").custom(noExiteCategoria),
        validarCampos,
    ],putProducto);
export default router;