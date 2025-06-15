const colors = require("colors");
const ERROR = (errorMessage) => {
  console.log(`${errorMessage}`.red);
};

const SUCCESS = (successMessage) => {
  console.log(`${successMessage}`.green);
};

const LOG = (message) => {
  console.log(message);
};

module.exports = { ERROR, SUCCESS, LOG };
