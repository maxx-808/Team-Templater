// TODO: Write code to define and export the Employee class
class Employee {
  constructor(name, id, email, github) {
    this.name = name;
    this.email = email;
    this.github = github;
    this.id = id;
    const testValue = "";
    id = testValue;
    // const position = "";
  }

  getName() {
    console.log(`employee name is ${this.testValue}`);
  }
}

module.exports = Employee;
