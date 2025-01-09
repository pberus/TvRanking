const addTv = require("../../handlers/Lists/addTv");
const getAll = require("../../handlers/Lists/getAll");
const removeTv = require("../../handlers/Lists/removeTv");
const getFiltered = require("../../handlers/Lists/getFiltered");

const routerLists = require("express").Router();

routerLists.post("/", addTv);
routerLists.get("/filter", getFiltered);
routerLists.get("/", getAll);
routerLists.delete("/", removeTv);

module.exports = routerLists;
