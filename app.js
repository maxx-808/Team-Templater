const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const { create } = require("domain");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [];

function addMember() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employee name",
        name: "name",
        validate: (answer) => {
          const numbers = answer.match(/^[0-9]\d*$/);
          if (!numbers && answer !== "" && answer.length > 1) {
            return true;
          } else {
            return "please enter a valid name";
          }
        },
      },
      {
        type: "list",
        message: "Enter employee role",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"],
      },
      {
        type: "input",
        message: "Enter employee ID #",
        name: "id",
        validate: (answer) => {
          const numbers = answer.match(/^[0-9]\d*$/);
          if (numbers && answer.length > 3) {
            return true;
          } else {
            return "please enter an ID #: must be 4 or more numbers long and be only numbers";
          }
        },
      },
      {
        type: "input",
        message: "Enter employee email",
        name: "email",
      },
    ])
    .then(function ({ name, role, id, email }) {
      let roleInfo = "";
      if (role === "Manager") {
        roleInfo = "office number";
      } else if (role === "Engineer") {
        roleInfo = "github username";
      } else {
        roleInfo = "school name";
      }
      inquirer
        .prompt([
          {
            message: `enter employees ${roleInfo}`,
            name: "roleInfo",
          },
          {
            type: "list",
            message: "Would you like to add more team members?",
            choices: ["yes", "no"],
            name: "moreMembers",
          },
        ])
        .then(function ({ roleInfo, moreMembers }) {
          let newMember;
          if (role === "Manager") {
            newMember = new Manager(name, id, email, roleInfo);
          } else if (role === "Engineer") {
            newMember = new Engineer(name, id, email, roleInfo);
          } else {
            newMember = new Intern(name, id, email, roleInfo);
          }
          employees.push(newMember);
          console.log(employees);

          // addHtml(newMember).then(function () {
          //   if (moreMembers === "yes") {
          //     addMember();
          //   } else {
          //     finishHtml();
          //   }
          // });

          if (moreMembers === "yes") {
            addMember();
          } else {
            createEmployees();
          }
        });
    });
  function createEmployees() {
    fs.writeFileSync(outputPath, render(employees), "utf-8");
  }
}

addMember();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
