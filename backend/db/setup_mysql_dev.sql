-- Active: 1725962865767@@127.0.0.1@3306@todoit_db
-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS todoit_db;

CREATE USER IF NOT EXISTS 'todoit' @'localhost' IDENTIFIED BY 'todoit_pwd';

GRANT ALL PRIVILEGES ON `todoit_db`.* TO 'todoit' @'localhost';

GRANT SELECT ON `todoit_db`.* TO 'todoit' @'localhost';

FLUSH PRIVILEGES;