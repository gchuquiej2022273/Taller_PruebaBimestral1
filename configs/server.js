'use strict'

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";

class Server{

    constructor(){
        this.app=express();
        this.port = process.env.PORT;

        this.middlewares();
        this.dbConnection();
        this.router();
    }

    async dbConnection(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'))
    }

    router(){

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server runnig on port', this.port);
        });
    }
}

export default Server;