const inquirer = require("inquirer");

const prompt = inquirer.createPromptModule();

const ask = require("./ask");
const { db } = require("../db/db");

module.exports.addDept = async () => {
  let { deptName } = await ask(
    "input",
    "deptName",
    "What is the name of the department"
  );
  return `INSERT INTO department (name) VALUES ('${deptName}');`;
};
// module.exports.addRole = async () => {
//   let { title } = await ask("input", "title", "Enter role title");
//   console.log(title);
//   //   return `INSERT INTO ${value} (name) VALUES ('${deptName}');`;
// };
module.exports.addRole = async () => {
  let res = await prompt([
    {
      type: "input",
      name: "title",
      message: "Enter role title",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter role salary",
    },
    {
      type: "input",
      name: "deptName",
      message: "Enter department for role",
    },
  ]);
  const { title, salary, deptName } = res;

  let tableExists = await exists("department", "name", deptName);
  let titleExists = await exists("department", "title", title);
  if (tableExists) {
    return "SELECT * FROM department;";
  } else {
    return { status: 0, msg: "Department doesnt exists" };
  }
  //   return `INSERT INTO ${value} (name) VALUES ('${deptName}');`;
};
async function exists(table, attr, val) {
  let res = await new Promise((res, rej) => {
    setTimeout(() => {
      db.query(
        `SELECT * FROM ${table} WHERE ${attr} = '${val}';`,
        (err, data) => {
          if (data) {
            res(data);
          } else {
            rej("Department doesnt exists");
          }
        }
      );
    }, 0.5);
  });

  if (res.length > 0) {
    return 1;
  } else {
    return 0;
  }
}
