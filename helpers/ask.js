const inquirer = require("inquirer");

const prompt = inquirer.createPromptModule();
async function ask(type, name, message, options = null) {
  let res;
  options
    ? (res = await prompt([
        {
          type,
          name,
          message,
          [options["name"]]: options["value"],
        },
      ]))
    : (res = await prompt([
        {
          type,
          name,
          message,
        },
      ]));
  return res;
}
module.exports = ask;
