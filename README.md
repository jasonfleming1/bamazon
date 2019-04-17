# bamazon
---
- **Developer:** Jason Fleming
- **Deployment Date** April 17, 2019
- **Built With** Node.js, mySQL, cli-table npm, inquirer npm, and JavaScript

### Description & Requirements
---
In this activity, you'll be creating bamazon, an Amazon-like storefront with the MySQL. The app will take in orders from customers and deplete stock from the store's inventory.

### Functionality
--- 
1. landingPage

    *inquirer*
    
    presents the user with a question about whehter or not they would like to see the store inventory. if true, then call the storeInventory function

    ![image of landingPage](/assets/landingPage.gif)

    
--- 
2. storeInventory

    *cli-table, nested showStore function with select * call*

    presents the sql data in a command line table using the cli-table npm. We are showing all db columns Item ID, Product, Department, Price, and Available Quantity. We've nested a function called showStore that logs  "Our Current Inventory" and runs a select * query that populates our cli table with db entries. Finally we call our "askShopper" function.

    ![image of storeInventory](/assets/storeInventory.gif)

--- 
3. askShopper

     *inquirer*

    asks the user if they want to buy an item. If true, we call the isShopping function. See isShopping for gif

    ![image of askShopper](/assets/askShopper.gif)

--- 
4. isShopping 

    *inquirer, sql select + where, cli-table*

    presents the user with two questions asking the item_id and quantity they want to purchase. If the requested qty exceeds the store's inventory an apology is logged and we call the "landingPage" function returning the user to the beginning of the app. Else, the user is presented with a summary of their order including a total cost (item price * quantity) and we set two variables (updatedStock (stock_qty db value - requested.qty) && purchasedItem(requested.item) FInally we call the purchaseCheckout function passing in updatedStock and purchasedItem variables.

    ![image of isShopping](/assets/isShopping.gif)

--- 
5. purchaseCheckout

      *inquirer, sql update where statement*

    ask the user to confirm that they want to purchase the summarized order. If yes we log a static expected delivery time response and we run an update statement that finds the db item_id that matches our passed in value and updates the database with the new stock quantity. Finally, for QC's sake, we're calling another function called updatedStock. if the user decides not to buy the summarized items we log an apology and call our landingPage function to return the user to the store to facilitate another purchase. See "6. updatedStock" for functionality

    ![image of purchaseCheckout](/assets/purchaseCheckout.gif)

--- 
6. updatedStock

      *reused storeInventory and showStore functions*

    sql query against our database to show the new stock quantity

    ![image of updatedStock](/assets/updatedStock.gif)
