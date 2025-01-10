const getDetail = require("../../handlers/Detail/getDetail");

const routerDetail = require("express").Router();

routerDetail.get("/", getDetail);

module.exports = routerDetail;
