CREATE SCHEMA `project2` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `project2`.`user` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `phone` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  `districtId` INT NOT NULL,
  PRIMARY KEY (`userId`));

CREATE TABLE `project2`.`district` (
  `districtId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `cityId` INT NOT NULL,
  PRIMARY KEY (`districtId`));

CREATE TABLE `project2`.`city` (
  `cityId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`cityId`));

CREATE TABLE `project2`.`category` (
  `categoryId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`categoryId`));

CREATE TABLE `project2`.`report` (
  `reportId` INT NOT NULL AUTO_INCREMENT,
  `productId` INT NOT NULL,
  `content` VARCHAR(1000) NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`reportId`));

CREATE TABLE `project2`.`product` (
  `productId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `districtId` INT NOT NULL,
  `date` DATE NOT NULL,
  `userId` INT NOT NULL,
  `isSold` INT NOT NULL DEFAULT 0,
  `isVerified` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`productId`));

CREATE TABLE `project2`.`categorylink` (
  `productId` INT NOT NULL,
  `categoryId` INT NOT NULL,
  PRIMARY KEY (`productId`, `categoryId`));

CREATE TABLE `project2`.`comment` (
  `commentId` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(500) NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`commentId`));

CREATE TABLE `project2`.`commentlink` (
  `commentId` INT NOT NULL,
  `userId` INT NOT NULL,
  `productId` INT NOT NULL,
  PRIMARY KEY (`commentId`, `userId`, `productId`));

CREATE TABLE `project2`.`admin` (
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`username`));

USE project2;

ALTER TABLE product ADD CONSTRAINT fk_product_user FOREIGN KEY (userId) references user(userId) ON DELETE CASCADE;
ALTER TABLE user add constraint fk_user_district foreign key(districtId) references district(districtId) ON DELETE CASCADE;
alter table district add constraint fk_district_city foreign key (cityId) references city(cityId) ON DELETE CASCADE;
alter table categorylink add constraint fk_catlink_category foreign key (categoryId) references category(categoryId) ON DELETE CASCADE;
alter table report add constraint fk_rp_product foreign key (productId) references product(productId) ON DELETE CASCADE;
alter table categorylink add constraint fk_catlink_product foreign key (productId) references product(productId) ON DELETE CASCADE;
alter table commentlink add constraint fk_cmtlink_comment foreign key (commentId) references comment(commentId) ON DELETE CASCADE;
alter table commentlink add constraint fk_cmtlink_user foreign key (userId) references user(userId) ON DELETE CASCADE;
alter table commentlink add constraint fk_cmtlink_product foreign key (productId) references product(productId) ON DELETE CASCADE;
