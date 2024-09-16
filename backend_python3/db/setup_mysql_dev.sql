-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS todoit_db;

CREATE USER IF NOT EXISTS 'todoit' @'localhost' IDENTIFIED BY 'todoit_pwd';

GRANT ALL PRIVILEGES ON `todoit_db`.* TO 'todoit' @'localhost';

GRANT SELECT ON `performance_schema`.* TO 'todoit' @'localhost';

FLUSH PRIVILEGES;