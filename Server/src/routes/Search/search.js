const search = require("../../handlers/API/Search/search");
const popoverSearch = require("../../handlers/API/Search/popover");

const routerSearch = require("express").Router();

routerSearch.get("/resultsPage/:tv", search);
routerSearch.get("/popover/:tv", popoverSearch);

module.exports = routerSearch;
