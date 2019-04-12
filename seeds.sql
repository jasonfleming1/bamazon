/*here we create the database*/
DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

/*here we direct to the db to use*/
USE bamazon;

/*here we create the table to hold our product inventory*/
CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_qty INTEGER (10) NULL,
    PRIMARY KEY (item_id)
);

/*here we retrieve all of our product inventory*/
SELECT * FROM products;

/*here we insert some product to our inventory*/
insert into products (product_name,department_name,price,stock_qty) values ("Xtreme Bike","Fitness", 1200.00, 300);
insert into products (product_name,department_name,price,stock_qty) values ("EXCEL Jump Rope","Fitness", 25.51, 1300);
insert into products (product_name,department_name,price,stock_qty) values ("Yogi's Yoga Mat","Fitness", 79.99, 2);
insert into products (product_name,department_name,price,stock_qty) values (".:: RIPPPED ::. dumbbells - 30 lbs","Fitness", 120.30, 13);
insert into products (product_name,department_name,price,stock_qty) values ("LyfeWater","Fitness", 3.99, 5966);
insert into products (product_name,department_name,price,stock_qty) values ("Yo-Yo My => Pro Yo-Yo","Toys and Games", 12.00, 2);
insert into products (product_name,department_name,price,stock_qty) values ("Basic Yo Yo","Toys and Games", 1.99, 300);
insert into products (product_name,department_name,price,stock_qty) values ("Kite","Toys and Games", 31.00, 60);
insert into products (product_name,department_name,price,stock_qty) values ("Cowboy Costume","Toys and Games", 12.00, 12);
insert into products (product_name,department_name,price,stock_qty) values ("Beginner's Magic Tricks","Toys and Games", 9.00, 15);
