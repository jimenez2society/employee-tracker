const inquirer = require("inquirer");
const ask = require("./helpers/ask");
const { choices, normalizeChoice } = require("./helpers/Questions");
const { db } = require("./db/db");
const { table } = require("table");
const figlet = require("figlet");
const { addDept, addRole } = require("./helpers/insertData");
require("colors");
async function begin() {
  let res = await ask("list", "choice", "What would you like to do?", {
    name: "choices",
    value: choices,
  });
  let { action, value } = normalizeChoice(res.choice);
  let query;
  switch (action) {
    case "VIEW":
      query = `SELECT * FROM ${value};`;
      break;
    case "ADD":
      if (value === "department") {
        query = await addDept();
      } else if (value === "role") {
        let res = await addRole();
        if (!res) {
          console.log("Sorry department doesnt exist");
          await begin();
        } else {
          action = "VIEW";
          query = await res;
          console.log("GOOD");
        }
      }
      break;
  }
  db.query(query, (err, data) => {
    if (action === "VIEW") {
      const keys = Object.keys(data[0]);
      let values = data.map((d) => {
        return Object.values(d);
      });
      figlet(value.replace(/$/i, "s").toUpperCase(), async (err, data) => {
        console.log(" ");
        console.log(data);
        console.log(" ");
        console.log(table([[...keys], ...values]));
        let continueAsk = await ask(
          "confirm",
          "continue",
          "Would you like to continue?"
        );
        if (!continueAsk.continue) {
          process.exit();
        } else {
          begin();
        }
      });
    } else {
      console.log(data);
      begin();
    }
  });
}
begin();
// title VARCHAR(30),
//     salary DECIMAL,
//     department_id INT,
//     FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
