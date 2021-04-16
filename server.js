'use strict';

const express = require('express');
const next = require('next');
const routes = require("./src/config/routes");

const isProductionMode = process.env.NODE_ENV === "production";
const port = 3000;

const app = next({dev: !isProductionMode});

app.prepare().then(() => {
    const server = express();
    const handleRoute = routes.getRequestHandler(app);

    server.all("*", handleRoute);

    server.listen(port, () => {
        console.log('we are on ' + port);
    }) ;
});