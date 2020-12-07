// TODO: Write code to define and export the Employee class

class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.email = email;
    this.id = id;
    this.role = "Employee";
  }

  getName() {
    console.log(this.name);
    return this.name;
  }

  getId() {
    console.log(this.id);
    return this.id;
  }

  getEmail() {
    console.log(this.email);
    return this.email;
  }

  getRole() {
    return this.role;
  }
}

module.exports = Employee;
