/*CREATE USER 'custom'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP
ON products.* TO 'custom'@'localhost';*/

DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
	item_id INTEGER(10)NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(30) NOT NULL,
	price DECIMAL(6,2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (item_id)
);

/*SELECT*FROM products;*/