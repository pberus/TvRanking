const search = require("../../handlers/API/Search/search");

const routerSearch = require("express").Router();

routerSearch.get("/:tv", search);

module.exports = routerSearch;
