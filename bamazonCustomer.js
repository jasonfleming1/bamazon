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
connection.connect(function (err) {
  if (err) throw err;
  console.log("Welcome to our store!");
  showStore();
});

//here were are presenting the bamazon products to a connected user
function shopping() {
    inquirer.prompt([
        {
          name: "selection",
          type: "input",
          message: "What is the Item ID you want to buy?",
          validate: function (value) {
            return isNaN(value) === true || value < 1 ? false : true;
          }
        },
        {
          name: "quantity",
          type: "input",
          message: "How many do you want to buy?",
          validate: function (value) {
            return isNaN(value) === true || value < 1 ? false : true;
          }
        }
    ])
      .then(function (answers) {
        var userProduct = answers.selection;
        var userQty = answers.quantity;
        checkStore(userProduct);
        //console.log(userProduct);
        console.log(userQty);
      });
    }

//Function to show store to user
  function showStore() {
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        table.push([
          res[i].item_id,
          res[i].product_name,
          res[i].department_name,
          res[i].price,
          res[i].stock_qty
        ]);
      }
      console.log(table.toString());
      shopping();
    });
  }

//Read function
function checkStore(userValue) {
  var query = "SELECT * FROM products WHERE item_id = ?";
          connection.query(query, userValue, function(err, res) {
            if (err) throw err;
            console.log(res);
        });
}