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

//here were are presenting the bamazon products to a connected user
function shopping() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_qty]);
    }
    console.log(table.toString());

    //here we will prompt the user to select a product ID and a qty
    inquirer.prompt(
        {
        name: 'selection',
        type: 'input',
        message: 'What is the Item ID you want to buy?',
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            }
            else {
                return false;
            }
        }
    })
    .then(function(answers) {
        var requestedId = answers.selection;
        //console.log('The requested ID Is ' + requestedId);
        if (requestedId >= 1 && requestedId <= 10) {
            console.log('\n...Fantastic! We have this item...\n')
            console.log('\n...Next step...\n');

            inquirer.prompt(
                {
                    name: 'quantity',
                    type: 'input',
                    message: 'How many of these do you want to buy?',
                    validate: function(value) {
                        if (isNaN(value) == false) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                })
                .then(function(answers){
                    var requestedQty = answers.quantity;
                    console.log(requestedQty);
                })
        } else {
            console.log("We do not have this item in stock at this time! Please select another item!");
            shopping();
        }
    })
  });
  connection.end();
}


//here we will check to see if there is enough stock

//here we will log the insufficent stock to fulfill the order

//udpate the remaining stock and log the purchase cost

//make the table a function

