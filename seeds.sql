/*here we create the database*/
DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

/*here we direct to the db to use*/
USE bamazon;

/*here we create the table to hold our product inventory*/
CREATE TABLE products (
    item_id INT NOT NULL,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_qty INTEGER (10) NULL,
    PRIMARY KEY (item_id)
);

/*here we retrieve all of our product inventory*/
SELECT * FROM products;