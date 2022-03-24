var express = require("express");
var Joy = require("joi");
var router = express.Router();

var famousPersion = require("../famous-person.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  var sex = req.query["gioi-tinh"];
  if (sex) {
    sex = sex == "nam" ? "male" : sex == "nu" ? "female" : sex;
    let famous = famousPersion.filter((user) => user.sex === sex);
    return res.render("index", { title: "Express", famousPersion: famous });
  }
  return res.render("index", { title: "Express", famousPersion });
});

// GET famous person's name
router.get("/:name", async function (req, res, next) {
  let { name } = req.params;
  let findUser = famousPersion.find((user) => user.shortcut === name);

  if (findUser)
    return res.render("user-detail", {
      title: name,
      famousPersion: findUser,
    });

  res.render("error", {
    message: "404 Not found",
    error: { status: 404, stack: "a" },
  });
});

module.exports = router;
