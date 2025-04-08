-- DROP DATABASE
DROP DATABASE IF EXISTS parts;

-- CREATE DATABASE
CREATE DATABASE parts;

\c parts 
--DROP PART TABLE IF THEY EXIST
DROP TABLE IF EXISTS part;

--Create part table
CREATE TABLE part (
    id SERIAL PRIMARY KEY,
    part_number VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,    
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    title VARCHAR(25)
    );