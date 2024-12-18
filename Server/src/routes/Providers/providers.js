const getProviders = require("../../handlers/API/Providers/getProviders");

const routerProviders = require("express").Router();

routerProviders.get("/", getProviders);

module.exports = routerProviders;
