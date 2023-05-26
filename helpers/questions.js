module.exports.normalizeChoice = (choice) => {
  if (choice === "exit") {
    process.exit();
  }
  if (choice.includes("Update")) {
    return { action: "UPDATE", value: "role" };
  }
  choice = choice.split(" ");
  if (choice.includes("View")) {
    choice = choice[2].replace(/\b(\w+)(s)\b/i, "$1");
    return { action: "VIEW", value: choice.toLowerCase() };
  }
  if (choice.includes("Add")) {
    choice = choice[1].replace(/\b(\w+)(s)\b/i, "$1");
    return { action: "ADD", value: choice.toLowerCase() };
  }
};
module.exports.choices = [
  "View all Employees",
  "Add Employee",
  "Update Employee Role",
  "View All Roles",
  "Add Role",
  "View All Departments",
  "Add Department",
  "exit",
];
