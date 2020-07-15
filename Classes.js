class EmployeeClass {
    constructor(id, first_name, last_name, role, manager) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role = role;
        this.manager = manager;
    }
};

class DepartmentClass {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
};

class RoleClass {
    constructor(id, title, salary){
        this.id = id;
        this.title = title;
        this.salary = salary;
    }
};

module.exports.EmployeeClass = EmployeeClass;
module.exports.DepartmentClass = DepartmentClass;
module.exports.RoleClass = RoleClass;