const getDetail = require("../../handlers/API/Detail/getDetail");

const routerDetail = require("express").Router();

routerDetail.get("/", getDetail);

module.exports = routerDetail;
