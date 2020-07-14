class Employee {
    constructor(first_name, last_name, role_id, manager_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
        this.getFirstName = () => {
            return this.first_name;
        };
        this.getLastName = () => {
            return this.last_name;
        };
        this.getRoleId = () => {
            return this.role_id;
        };
        this.getManagerId = () => {
            return this.manager_id;
        }
    }
};

module.exports = Employee;

class Role {
    constructor(title, salary, department_id) {
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }
};

module.exports = Role;

class Department {
    constructor(name) {
        this.name = name;
    }
};

module.exports = Department;