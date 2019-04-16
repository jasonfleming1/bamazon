//===============bamazon dependencies===============
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");

//===============database connection===============
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("Welcome to our store!");
  landingPage();
});

//===============ask user if they want to see inventory===============

function landingPage() {
  inquirer
    .prompt([
      {
        name: "showInventory",
        type: "confirm",
        message:
          "Welcome to our store! Do you want to see our inventory of items for purchase?",
        default: true
      }
    ])
    .then(function(user) {
      if (user.showInventory === true) {
        storeInventory();
      } else {
        console.log("No problem! Please visit us again");
      }
    });
}

//===============show bamazon inventory=============

function storeInventory() {
  var table = new Table({
    head: ["Item ID", "Product", "Department", "Price", "Av Qty"],
    colWidths: [11, 40, 20, 8, 8]
  });

  showStore();

  function showStore() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

      for (var i = 0; i < res.length; i++) {
        var store = res[i].item_id,
          productName = res[i].product_name,
          departmentName = res[i].department_name,
          price = res[i].price,
          stockQuantity = res[i].stock_qty;

        table.push([store, productName, departmentName, price, stockQuantity]);
      }
      console.log("\n Our Current Inventory\n");
      console.log(table.toString());
      askShopper();
    });
  }
}

//===============ask the user if they want to buy something=============

function askShopper() {
  inquirer
    .prompt([
      {
        name: "toShop",
        type: "confirm",
        message: "Do you want to buy one of our items?",
        default: true
      }
    ])
    .then(function(reply) {
      if (reply.toShop === true) {
        isShopping();
      } else {
        console.log("No problem! Please visit us again");
      }
    });
}

//===============get the user's order=============

function isShopping() {
  inquirer
    .prompt([
      {
        name: "selection",
        type: "input",
        message: "What is the Item ID you want to buy?",
      },
      {
        name: "quantity",
        type: "input",
        message: "How many do you want to buy?",
      }
    ])
    .then(function(answer) {
      var query = "SELECT * FROM products WHERE item_id = ?";
      console.log(answer.selection + " and the qty " + answer.quantity)
      connection.query(query, answer.selection, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {

          if (answer.quantity > res[i].stock_qty) {
            console.log(
              "We are very sorry we do not have enough of this item in our inventory"
            ); //copy liri formatting
            landingPage();
          } else {
            console.log("Success! Please review your order here");
            console.log("============="); //liri formatting
            console.log("Item: " + res[i].product_name);
            console.log("Price per item : " + "$" + res[i].price);
            console.log("Quantity Ordered: " + answer.quantity);
            console.log("============="); //liri formatting
            console.log("Your bill: $" + res[i].price * answer.quantity);
            console.log("============="); //liri formatting

            var updateStock = res[i].stock_qty - answer.quantity;
            var purchasedItem = answer.selection;

            purchaseCheckout(updateStock, purchasedItem);
          }
        }
      });
    });
}

//===============user checkout=============

function purchaseCheckout(updateStock, purchasedItem) {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "checkoutNow",
        message: "Are you ready to complete your purchase?",
        default: true
      }
    ])
    .then(function(doPurchase) {
      if (doPurchase.checkoutNow === true) {
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_qty: updateStock
            },
            {
              item_id: purchasedItem
            }
          ],
          function(err, res) {}
        );

        console.log("============="); //liri formatting
        console.log("Your order is now complete. Thank you"); //liri formatting
        console.log("============="); //liri formatting
      } else {
        console.log("============="); //liri formatting
        console.log("No problem! Please visit us again");
        console.log("============="); //liri formatting
        landingPage();
      }
    });
}
