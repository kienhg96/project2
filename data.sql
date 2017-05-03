-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project2
-- ------------------------------------------------------
-- Server version	5.7.16-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('hoangkien','$2a$10$KVKv3in8ZyjfbYEVtLF2N.b03MTzNCYNTgT6oCDsbxvf3781rBN.y');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Đồ điện tử 1'),(2,'Đồ nội thất'),(7,'Điện lạnh');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorylink`
--

DROP TABLE IF EXISTS `categorylink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorylink` (
  `productId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  PRIMARY KEY (`productId`,`categoryId`),
  KEY `fk_catlink_category` (`categoryId`),
  CONSTRAINT `fk_catlink_category` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`) ON DELETE CASCADE,
  CONSTRAINT `fk_catlink_product` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorylink`
--

LOCK TABLES `categorylink` WRITE;
/*!40000 ALTER TABLE `categorylink` DISABLE KEYS */;
INSERT INTO `categorylink` VALUES (2,1),(5,1),(8,1),(2,2),(4,2),(6,2);
/*!40000 ALTER TABLE `categorylink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `cityId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cityId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Hà Nội'),(2,'Hải Phòng');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `commentId` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(500) NOT NULL,
  `dateTime` datetime DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  PRIMARY KEY (`commentId`),
  KEY `fk_comment_userId` (`userId`),
  KEY `fk_comment_productId` (`productId`),
  CONSTRAINT `fk_comment_productId` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE,
  CONSTRAINT `fk_comment_userId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'Hello','2017-04-19 22:00:47',9,5),(2,'Hi','2017-04-19 22:13:06',1,5),(3,'Tốt nhỉ','2017-04-19 22:23:46',9,2),(4,'Rất tốt','2017-04-20 08:08:17',9,5),(5,'Hay','2017-04-20 08:09:20',9,5),(6,'Thêm vào trước','2017-04-20 08:10:19',9,5),(7,'CÓ progress','2017-04-20 08:16:22',9,5),(8,'Demo tốt','2017-04-20 08:23:28',9,5),(11,'ád','2017-04-20 08:51:05',9,6),(12,'dfs','2017-04-20 11:17:07',9,1),(13,'cxvxcv','2017-04-20 11:17:17',1,1),(14,'Tốt đấy','2017-04-20 11:17:26',1,1),(15,'fdaf','2017-04-20 12:25:51',9,1),(16,'LIKE','2017-04-20 12:28:45',9,2),(17,'good','2017-04-20 13:20:45',9,4),(18,'hjgjhg','2017-04-21 10:32:35',9,2),(19,'ngon','2017-04-21 13:57:22',1,9),(20,'(y)','2017-04-21 13:57:32',1,9);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `district`
--

DROP TABLE IF EXISTS `district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `district` (
  `districtId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `cityId` int(11) NOT NULL,
  PRIMARY KEY (`districtId`),
  KEY `fk_district_city` (`cityId`),
  CONSTRAINT `fk_district_city` FOREIGN KEY (`cityId`) REFERENCES `city` (`cityId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `district`
--

LOCK TABLES `district` WRITE;
/*!40000 ALTER TABLE `district` DISABLE KEYS */;
INSERT INTO `district` VALUES (1,'Hai Bà Trưng',1),(2,'Cầu Giấy',1),(3,'Tp. Hải Phòng',2);
/*!40000 ALTER TABLE `district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `productId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `date` date NOT NULL,
  `userId` int(11) NOT NULL,
  `isVerified` int(11) NOT NULL DEFAULT '0',
  `isSold` int(11) NOT NULL DEFAULT '0',
  `districtId` int(11) DEFAULT NULL,
  PRIMARY KEY (`productId`),
  KEY `fk_product_user` (`userId`),
  KEY `fk_product_districtId` (`districtId`),
  CONSTRAINT `fk_product_districtId` FOREIGN KEY (`districtId`) REFERENCES `district` (`districtId`),
  CONSTRAINT `fk_product_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Quần áo','quần áo',12000,'2017-04-19',9,0,0,1),(2,'Bàn','Bàn ghế',600000,'2017-04-19',9,0,0,1),(4,'Bàn của người vô danh','Bàn ghế của người vô danh',500000,'2017-04-19',1,0,1,2),(5,'Sản phẩm 1','Sản phẩm demo',30000,'2017-04-19',1,0,0,1),(6,'Sản phẩm mới','Mới',12000,'2017-04-20',9,0,0,1),(8,'Hàng tốt đây','Hàng ngon',12000,'2017-04-21',1,0,0,1),(9,'sản phẩm tốt','Rất tốt',32000,'2017-04-21',1,0,0,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productimage`
--

DROP TABLE IF EXISTS `productimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productimage` (
  `imageId` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`imageId`),
  KEY `fk_productimage_productId` (`productId`),
  CONSTRAINT `fk_productimage_productId` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productimage`
--

LOCK TABLES `productimage` WRITE;
/*!40000 ALTER TABLE `productimage` DISABLE KEYS */;
INSERT INTO `productimage` VALUES (1,1,'1-1492575085775.png'),(2,2,'2-1492575142275.png'),(3,2,'2-1492575142283.png'),(4,4,'4-1492575532167.png'),(5,5,'5-1492592883049.png'),(6,6,'6-1492651436463.png'),(8,8,'8-1492756865156.png'),(9,9,'9-1492757091564.png');
/*!40000 ALTER TABLE `productimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report` (
  `reportId` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`reportId`),
  KEY `fk_rp_product` (`productId`),
  CONSTRAINT `fk_rp_product` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,2,'Nội dung xấu','2017-04-26'),(2,5,'Nội dung sai','2017-04-26');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(45) NOT NULL,
  `password` varchar(128) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `districtId` int(11) NOT NULL,
  `fullName` varchar(128) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `avatar` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `fk_user_district` (`districtId`),
  CONSTRAINT `fk_user_district` FOREIGN KEY (`districtId`) REFERENCES `district` (`districtId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'NONE',NULL,NULL,1,'ANONYMOUS_USER','2017-04-17',NULL),(9,'01686433122','$2a$10$AwIR5/XNdt9jrtAY6mYB7O.MtNeaI8en4SPuKouXFobqkBVHBUfZW','kienhg96@gmail.com',1,'Hoàng Kiên','2017-04-18',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-03 14:45:25
