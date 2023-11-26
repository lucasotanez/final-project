CREATE SCHEMA IF NOT EXISTS GROCERY_SCHEMA;

USE GROCERY_SCHEMA;

CREATE TABLE IF NOT EXISTS users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS groceries (
	user_id INT NOT NULL,
	grocery_name VARCHAR(255) NOT NULL,
	quantity INT NOT NULL,
	expiration_date DATE NOT NULL,
	CONSTRAINT FK_grocery_owned FOREIGN KEY(user_id) REFERENCES users(user_id),
    PRIMARY KEY (user_id, grocery_name)
);

/* This is our static database of recipes. We could have another startup SQL script
    that inserts all recipes we want to hold. */
CREATE TABLE recipes (
	recipe_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	recipe_title VARCHAR(255),
    recipe_ingredients TEXT,
	recipe_directions TEXT,
	recipe_link TEXT
);

/* Each recipe's individual ingredients will be stored in this table. */
CREATE TABLE recipe_ingredients_ner (
	recipe_id INT NOT NULL,
    ingredient VARCHAR(255) NOT NULL,
    CONSTRAINT FK_ingredient_recipe FOREIGN KEY(recipe_id) REFERENCES recipes(recipe_id)
)

