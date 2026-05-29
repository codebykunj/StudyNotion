const {createContact} = require("../controller/Contact")
const express = require("express")
const route = express.Router()

route.post("/createContact",createContact);

module.exports = route;