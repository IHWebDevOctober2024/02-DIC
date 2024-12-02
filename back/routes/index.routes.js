const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/", isAuthenticated, (req, res, next) => {
  console.log(req);
  
  res.json("All good in here, we know that you are");
});

module.exports = router;
