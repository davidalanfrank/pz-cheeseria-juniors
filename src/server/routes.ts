import * as express from "express";
const cheeses = require("./data/cheeses.json");
var bodyParser = require("body-parser");
const router = express.Router();
var jsonParser = bodyParser.json();

var mockDatabase: string[] = [];

router.get("/api/cheeses", (req, res, next) => {
  res.json(cheeses);
});

router.get("/api/recent-purchases", (req, res, next) => {
  if (mockDatabase.length < 1) {
    res.send({ status: 204, message: "No purchase history." });
  } else {
    res.send({
      status: 200,
      message: "Successfully returning recent purchases",
      data: mockDatabase,
    });
  }
});

router.post("/api/purchase", jsonParser, (req, res, next) => {
  if (req.body != null) {
    mockDatabase.push(req.body);
    res.status(200).send({ message: "Purchase successful." });
  } else {
    res.status(400).send({ error: "Could not process purchase." });
  }
});

export default router;
