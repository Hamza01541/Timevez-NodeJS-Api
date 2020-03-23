const express = require('express');
const app = express();
const connection = require('../database/connection/connection');
const ApplicationRoutes = require('./application-routes');
const appRoutes = new ApplicationRoutes();

class Application {

    /**
     * Initalize Application.
     */
    init() {
        connection.initConnection();
        // this.enableParsing();
        this.defineHeaders();
        appRoutes.registerRoutes();
    }

    enableParsing() {
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
    }

    /**
     * Define request headers.
     */
    defineHeaders() {
        app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
            next();
        });
    }
}

module.exports = Application;