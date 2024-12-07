const getLenguages = require("../../handlers/API/Lenguages/getLenguages");

const routerLenguages = require("express").Router();

routerLenguages.get("/", getLenguages);

module.exports = routerLenguages;
