const express = require('express');
const app = express();
const {
    userRoute,
    roleRoute,
    attendanceRoute
} = require('../routes');

class ApplicationRoutes {

    constructor() {
        this.enableParsing();
        this.initAppListener();
        this.registerRoutes();
    }

    /**
     * Enables parsing of json object in the body of request (i.e. req.body).
     */
      enableParsing() {
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
    }

    /**
     * Listen port.
     * List for all endpoints having defined port number.
     */
    initAppListener() {
        const port = process.env.DB_PORT;
        app.listen(port, () => console.log(`Listening on port:${port}`));
    }

    /**
     * Register routes.
     */
    registerRoutes() {
        app.use('/api/user', userRoute);
        app.use('/api/role', roleRoute);
        app.use('/api/attendance', attendanceRoute);
    }
}

module.exports = ApplicationRoutes;