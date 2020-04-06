var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "cms_db"
});

connection.connect(function(err){
    if(err) throw err;
    startCMS();
});

function startCMS(){
    inquirer
    .prompt({
        name: "whatToDo",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee"]
    })
    .then(function(answer){
        if(answer.whatToDo === "View Departments"){
            viewDepartments();
        }
        else if(answer.whatToDo === "View Roles"){
            viewRoles();
        }
        else if(answer.whatToDo === "View Employees"){
            viewEmployees();
        }
        else if(answer.whatToDo === "Add Department"){
            addDepartment();
        }
        else if(answer.whatToDo === "Add Role"){
            addRole();
        }
        else if(answer.whatToDo === "Add Employee"){
            addEmployee();
        } 
        else{connection.end();}
    });
}
//view current data
function viewDepartments(){
console.log("viewing departments");
connection.query("SELECT * FROM departments", (err, res)=>{
    if(err) throw err;
    console.log(res);
});
connection.end();
}

function viewRoles(){
console.log("viewing roles");
connection.query("SELECT * FROM roles", (err, res)=>{
    if(err) throw err;
    console.log(res);
});
connection.end();
}

function viewEmployees(){
console.log("viewing employees")
connection.query("SELECT * FROM employees", (err, res)=>{
    if(err) throw err;
    console.log(res);
});
connection.end();
}
//add new department data
function addDepartment(){
console.log("adding department")
inquirer
.prompt([{
    name: "new_department",
    type: "input",
    message: "what new department would you like to add? "
}
])
.then(function(answer){
    console.log(answer);
    connection.query(
        "INSERT INTO departments SET ?",
        {
            department: answer.new_department
        },
        function(err){
            if(err) throw err;
            console.log("added new department!")
            startCMS();
        }
    )
})
}
//add new role data
function addRole(){
console.log("adding role")
inquirer
.prompt([{
    name: "new_role",
    type: "input",
    message: "what is the title of the role you would like to add?"
},
{
    name: "new_role_salary",
    type: "input",
    message: "what is that role's salary?"
}
])
.then(function(answer){
    console.log(answer);
    connection.query(
        "INSERT INTO roles SET ?",
        {
            title: answer.new_role,
            salary: answer.new_role_salary
        }, function(err){
            if(err) throw err;
            console.log("added ew role!")
            startCMS();
        }
    )
})
}
//add employee data
function addEmployee(){
console.log("adding employees")
inquirer
.prompt([{
    name: "first_name",
    type: "input",
    message: "New employee first name?"
},{
    name: "last_name",
    type: "input",
    message: "New employee last name?"
},
{
    name: "role_id",
    type: "input",
    message: "what is this employee's role ID?"
},
{
    name: "manager_id",
    type: "input",
    message: "what is this employee's manager ID?"
}
])
.then(function(answer){
    console.log(answer);
    connection.query(
        "INSERT INTO employees SET ?",
        {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id,
            manager_id: answer.manager_id
        }, function (err){
            if(err) throw err;
            console.log("added new employee!")
            startCMS();
        }
    )
})
}
