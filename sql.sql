CREATE SCHEMA `project2` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `project2`.`user` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `phone` VARCHAR(64) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `email` VARCHAR(64) NULL,
  `districtId` INT NOT NULL,
  PRIMARY KEY (`userId`));

CREATE TABLE `project2`.`district` (
  `districtId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `cityId` INT NOT NULL,
  PRIMARY KEY (`districtId`));

CREATE TABLE `project2`.`city` (
  `cityId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NULL,
  PRIMARY KEY (`cityId`));

CREATE TABLE `project2`.`category` (
  `categoryId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`categoryId`));

CREATE TABLE `project2`.`report` (
  `reportId` INT NOT NULL AUTO_INCREMENT,
  `productId` INT NOT NULL,
  `content` VARCHAR(512) NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`reportId`));

CREATE TABLE `project2`.`product` (
  `productId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `description` VARCHAR(1024) NOT NULL,
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
  `content` VARCHAR(512) NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`commentId`));

CREATE TABLE `project2`.`commentlink` (
  `commentId` INT NOT NULL,
  `userId` INT NOT NULL,
  `productId` INT NOT NULL,
  PRIMARY KEY (`commentId`, `userId`, `productId`));

CREATE TABLE `project2`.`admin` (
  `username` VARCHAR(64) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
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

--
alter table user add column fullName VARCHAR(128);
alter table user modify column password varchar(128);

-- 2017-04-10
CREATE TABLE `project2`.`productimage` (
  imageId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  productId INT NOT NULL,
  name VARCHAR(32),
  CONSTRAINT fk_productimage_productId FOREIGN KEY (productId) REFERENCES `project2`.product(productId)
);
--
ALTER TABLE `project2`.product 
  DROP COLUMN districtId;
-- 
ALTER TABLE `project2`.user 
  ADD COLUMN `date` date;
-- 2017-04-11
-- CREATE TABLE project2.subcategory (
--   subCategoryId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   categoryId INT NOT NULL, 
--   name VARCHAR(64),
--   CONSTRAINT fk_subcategory_categoryId FOREIGN KEY (categoryId) REFERENCES project2.category(categoryId)
-- );

--
ALTER TABLE project2.user 
  ADD COLUMN avatar VARCHAR(32);
-- 2017-04-12
ALTER TABLE project2.comment
  DROP COLUMN date,
  ADD COLUMN dateTime DATETIME;
--
DROP TABLE project2.commentlink;
ALTER TABLE project2.comment
  ADD COLUMN userId INT NOT NULL,
  ADD COLUMN productId INT NOT NULL,
  ADD CONSTRAINT fk_comment_userId FOREIGN KEY (userId) REFERENCES project2.user(userId),
  ADD CONSTRAINT fk_comment_productId FOREIGN KEY (productId) REFERENCES project2.product(productId);


-- 
ALTER TABLE project2.product
  ADD COLUMN districtId INT,
  ADD CONSTRAINT fk_product_districtId FOREIGN KEY (districtId) REFERENCES project2.district(districtId);

-- 19/04/2017
-- Create ANONYMOUS_USER
INSERT INTO user SET userId = 1, phone = 'NONE', districtId = 1, fullName = 'ANONYMOUS_USER';

-- 26/04/2017
alter table comment drop foreign key fk_comment_userId;
alter table comment drop foreign key fk_comment_productId;

alter table comment add CONSTRAINT fk_comment_userId FOREIGN KEY (userId) REFERENCES project2.user(userId) ON DELETE CASCADE;
alter table comment ADD CONSTRAINT fk_comment_productId FOREIGN KEY (productId) REFERENCES project2.product(productId)  ON DELETE CASCADE;
alter table productimage drop foreign key fk_productimage_productId;
alter table productimage add CONSTRAINT fk_productimage_productId FOREIGN KEY (productId) REFERENCES `project2`.product(productId)  ON DELETE CASCADE;
alter table report drop foreign key fk_rp_product;
alter table report add constraint fk_rp_product foreign key (productId) references product(productId) ON DELETE CASCADE;
alter table categorylink drop foreign key fk_catlink_category;
alter table categorylink add constraint fk_catlink_category foreign key (categoryId) 
  references category(categoryId) ON DELETE CASCADE;
