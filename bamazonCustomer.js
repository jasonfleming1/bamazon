//require npm packages
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");
var table = new Table({
  head: ["Item ID", "Product", "Department", "Price", "Av Qty"],
  colWidths: [11, 40, 20, 8, 8]
});

//here we define our connection to bamazonDB
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

//here we manage the connections
connection.connect(function(err) {
  if (err) throw err;
  console.log("Welcome to our store!");
  shopping();
});

//here were are preseting the bamazon products to a connected user (need to put this into a function)
function shopping() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_qty]);
    }
    console.log(table.toString());

    //here we will prompt the user to select a product ID and a qty
    inquirer.prompt([
        {
        name: 'choice',
        type: 'input',
        message: 'What is the Item ID you want to buy?'
    }, 
    { 
        name: 'choice',
        type: 'input',
        message: 'How many do you want to buy?'
    }
    ]);
  });
  connection.end();
}


//here we will check to see if there is enough stock

//here we will log the insufficent stock to fulfill the order

//udpate the remaining stock and log the purchase cost
