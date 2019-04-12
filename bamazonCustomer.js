//require npm packages
var inquirer = require('inquirer');
var mysql = require('mysql');

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
      console.log("you are connected to our store! " + connection.threadId);
      afterConnection();
  });

//here were are preseting the bamazon products to a connected user
function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end(); //move this after adding more features
    });
}

//here we will prompt the user to select a product ID and a qty

//here we will check to see if there is enough stock

//here we will log the insufficent stock to fulfill the order

//udpate the remaining stock and log the purchase cost