const addTv = require("../../handlers/Lists/addTv");
const getAll = require("../../handlers/Lists/getAll");
const removeTv = require("../../handlers/Lists/removeTv");

const routerLists = require("express").Router();

routerLists.post("/", addTv);
routerLists.get("/", getAll);
routerLists.delete("/", removeTv);

module.exports = routerLists;
