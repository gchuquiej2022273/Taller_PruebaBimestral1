'use strict'

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import session from 'express-session';
import { dbConnection } from "./mongo.js";
import userRouter from "../src/users/user.routes.js";
import adminRouter from "../src/usersAdmin/userA.routes.js";
import authRouter from "../src/auth/auth.routes.js";
import producRouter from "../src/product/produc.routes.js"
import categoriaRoutes from "../src/categoria/category.routes.js";
import storeRoutes from "../src/Store/store.routes.js";
import facturaRoutes from "../src/factura/factura.routes.js";

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/gestorTienda/v1/users';
        this.adminpath = '/gestorTienda/v1/admis';
        this.authPath = '/gestorTienda/v2/auth';
        this.productPath = '/gestorTienda/v1/producto';
        this.categoryPath = '/gestorTienda/v1/categoria';
        this.storePath = '/gestorTienda/v1/store';
        this.facturaPath = '/gestorTienda/v1/factura';

        this.middlewares();
        this.dbConnection();
        this.router();
    }

    async dbConnection() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(session({secret: 'secreto',
        resave: false,
        saveUninitialized: true}));
    }

    router() {
        this.app.use(this.userPath, userRouter);
        this.app.use(this.adminpath, adminRouter);
        this.app.use(this.authPath, authRouter);
        this.app.use(this.productPath, producRouter);
        this.app.use(this.categoryPath, categoriaRoutes);
        this.app.use(this.storePath, storeRoutes);
        this.app.use(this.facturaPath, facturaRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server runnig on port', this.port);
        });
    }
}

export default Server;