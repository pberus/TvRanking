const search = require("../../handlers/API/Search/search");
const popoverSearch = require("../../handlers/API/Search/popover");
const queryEmpty = require("../../handlers/API/Search/queryEmpty");

const routerSearch = require("express").Router();

routerSearch.get("/resultsPage/:tv", search);
routerSearch.get("/resultsPage", queryEmpty);
routerSearch.get("/popover/:tv", popoverSearch);

module.exports = routerSearch;
