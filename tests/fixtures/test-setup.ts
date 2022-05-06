import pool from './../../src/utils/db';

// beforeAll(async () => {

// });

// Create the tables
beforeEach(async () => {
  await pool.query(`
CREATE TABLE manufacturer(id UUID, name VARCHAR(255) NOT NULL, PRIMARY KEY(id));

CREATE TABLE equipment(
id UUID NOT NULL,
manufacturer_id UUID,
model VARCHAR(255) NOT NULL,
serialNumber VARCHAR(255) NOT NULL,
PRIMARY KEY(id),
CONSTRAINT fk_manufacturer
FOREIGN KEY(manufacturer_id)
REFERENCES manufacturer(id) on delete cascade
);
`);
});

// Cleans up database between each test
afterEach(async () => {
  await pool.query('DROP TABLE IF EXISTS equipment');
  await pool.query('DROP TABLE IF EXISTS manufacturer');
});
