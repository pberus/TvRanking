const signUp = require("../../handlers/Auth/signUp");
const signIn = require("../../handlers/Auth/signIn");

const routerAuth = require("express").Router();

routerAuth.post("/", signUp);
routerAuth.get("/", signIn);

module.exports = routerAuth;
