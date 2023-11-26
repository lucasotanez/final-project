CREATE SCHEMA IF NOT EXISTS `chefslist`;

CREATE TABLE chefslist.Users (
    ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Username VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE chefslist.Ingredients (
    ID INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Date DATE NOT NULL,
    Count INT NOT NULL
);

CREATE TABLE chefslist.SavedRecipes (
    ID INT NOT NULL,
    RID INT NOT NULL
);

CREATE TABLE chefslist.Recipes (
    RID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Directions VARCHAR(255) NOT NULL,
    Ingredients VARCHAR(255) NOT NULL
);