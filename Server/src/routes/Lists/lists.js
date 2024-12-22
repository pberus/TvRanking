const addTv = require("../../handlers/Lists/addTv");
const getAll = require("../../handlers/Lists/getAll");

const routerLists = require("express").Router();

routerLists.post("/", addTv);
routerLists.get("/", getAll);

module.exports = routerLists;
