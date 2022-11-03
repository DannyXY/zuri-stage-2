var express = require("express");
var server = express();
var cors = require("cors");
require("dotenv").config();
var bodyParser = require("body-parser");
const EnumType = {
  addition: "+",
  subtraction: "-",
  multiplication: "*",
};

server.use(cors());

var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

server.use(jsonParser);
server.use(urlencodedParser);

server.post("/details", (req, res) => {
  const { operation_type, x, y } = req.body;
  if (!EnumType[operation_type]) {
    res.status(405).json({
      success: false,
      msg: "method not allowed",
    });
  } else {
    result = 0;
    if (operation_type == "addition") {
      result = x + y;
    } else if (operation_type == "multiplication") {
      result = x * y;
    } else {
      result = x - y;
    }
    const data = {
      slackUsername: "dannyx",
      operation_type: EnumType.operation_type,
      result: result,
    };

    res.status(200).json(data);
  }
});

server.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});
