'use strict'

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import userRouter from "../src/users/user.routes.js";
import adminRouter from "../src/usersAdmin/userA.routes.js";
import authRouter from "../src/auth/auth.routes.js";

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/gestorTienda/v1/users';
        this.adminpath = '/gestorTienda/v1/admis';
        this.authPath = '/gestorTienda/v1/auth';

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
        this.app.use(morgan('dev'))
    }

    router() {
        this.app.use(this.userPath, userRouter);
        this.app.use(this.adminpath, adminRouter);
        this.app.use(this.authPath, authRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server runnig on port', this.port);
        });
    }
}

export default Server;