SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
SET time_zone = "+08:00";

drop schema if exists urlshortener;
CREATE schema urlshortener DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE urlshortener;

DROP TABLE IF EXISTS url;
CREATE TABLE IF NOT EXISTS url (
  	id int auto_increment NOT NULL,
    long_url VARCHAR(1000) NOT NULL,
	code VARCHAR(8) UNIQUE NOT NULL,
  	PRIMARY KEY (id)
);
