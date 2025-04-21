-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: identity_service
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` bigint NOT NULL,
  `category_description` varchar(255) DEFAULT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'laptop','Laptop');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_seq`
--

DROP TABLE IF EXISTS `category_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_seq`
--

LOCK TABLES `category_seq` WRITE;
/*!40000 ALTER TABLE `category_seq` DISABLE KEYS */;
INSERT INTO `category_seq` VALUES (151);
/*!40000 ALTER TABLE `category_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `UKdwk6cx0afu8bs9o4t536v1j5v` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Hà Nội','abc@gmail.com','12345678'),(2,'axy','1234','111111');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `UKfopic1oh5oln2khj8eat6ino0` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'xson2582002@gmail.com','0355611838'),(2,'XYZZZZZ@gmail.com','12345678'),(3,'1234','111111'),(4,'xson@gmail.com','0355611838');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invalidated_token`
--

DROP TABLE IF EXISTS `invalidated_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invalidated_token` (
  `id` varchar(255) NOT NULL,
  `expiry_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invalidated_token`
--

LOCK TABLES `invalidated_token` WRITE;
/*!40000 ALTER TABLE `invalidated_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `invalidated_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `order_detail_id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`order_detail_id`),
  KEY `FKrws2q0si6oyd6il8gqe2aennc` (`order_id`),
  KEY `FKb8bg2bkty0oksa3wiq5mp5qnc` (`product_id`),
  CONSTRAINT `FKb8bg2bkty0oksa3wiq5mp5qnc` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `FKrws2q0si6oyd6il8gqe2aennc` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (1,10,1111111.00,1,1),(2,10,200000.00,2,3),(3,10,200000.00,3,3),(4,10,200000.00,4,3),(5,10,200000.00,5,3);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('CHỜ_XỬ_LÝ','ĐANG_GIAO','HOÀN_THÀNH','ĐÃ_HỦY') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'CHỜ_XỬ_LÝ',
  `total_amount` decimal(10,2) NOT NULL,
  `customer_id` int NOT NULL,
  `employee_id` int DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_employees` (`employee_id`),
  KEY `fk_orders_customers` (`customer_id`),
  CONSTRAINT `fk_orders_customers` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `fk_orders_employees` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2025-04-15 16:40:07','ĐANG_GIAO',11111110.00,2,NULL),(2,'2025-04-15 16:59:57','CHỜ_XỬ_LÝ',2000000.00,2,NULL),(3,'2025-04-15 17:02:44','CHỜ_XỬ_LÝ',2000000.00,2,NULL),(4,'2025-04-15 22:48:58','CHỜ_XỬ_LÝ',2000000.00,2,NULL),(5,'2025-04-16 10:32:53','CHỜ_XỬ_LÝ',2000000.00,2,NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` bigint NOT NULL AUTO_INCREMENT,
  `payment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_method` enum('CHUYEN_KHOAN','THE_TIN_DUNG','TIEN_MAT','VI_DIEN_TU') NOT NULL,
  `payment_status` enum('CHUA_THANH_TOAN','DA_THANH_TOAN','HOAN_TIEN') NOT NULL,
  `order_id` int NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `FKlouu98csyullos9k25tbpk4va` (`order_id`),
  CONSTRAINT `FKlouu98csyullos9k25tbpk4va` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,NULL,'TIEN_MAT','CHUA_THANH_TOAN',2),(2,NULL,'TIEN_MAT','CHUA_THANH_TOAN',2),(3,NULL,'TIEN_MAT','CHUA_THANH_TOAN',2),(4,NULL,'TIEN_MAT','CHUA_THANH_TOAN',2),(5,'2025-04-15 22:55:25','TIEN_MAT','CHUA_THANH_TOAN',2),(6,'2025-04-16 10:47:13','TIEN_MAT','CHUA_THANH_TOAN',2);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES ('UPDATE_DATA','update data'),('VIEW_DATA','view data');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `stock_quantity` int NOT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_products_categories` (`category_id`),
  CONSTRAINT `fk_products_categories` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'2025-04-01 09:00:12','Laptop','bfdac5f5-878c-41c7-a533-4493e05200fb_226de35775c93ee5584376674607fde9.jpg',1111111.00,'Product02',12,1),(3,'2025-04-01 09:00:47','Television',NULL,200000.00,'Product02',12,1),(4,'2025-04-01 09:00:52','Television',NULL,200000.00,'Product02',12,1),(6,'2025-04-01 09:01:04','PC','17701957-d86d-48bf-be52-4601aee96ed0_tenfile.png',12345678.00,'Product1522',10,1),(7,'2025-04-01 09:01:06','PC','b3845eb7-401d-48ae-a447-094f3aa867fb_tenfile.png',12345678.00,'Product15225',10,1),(8,'2025-04-01 09:01:09','PC','a43fef1f-d9d4-4510-99ba-6d5a7afaf32b_tenfile.png',12345678.00,'Product152256',10,1),(9,'2025-04-01 09:01:13','PC','5e02d265-14c7-4225-880f-09fef3f68aff_tenfile.png',12345678.00,'Product15122',10,1),(10,'2025-04-01 09:01:15','PC','31ac6dfd-ea10-4160-942a-151743debf73_tenfile.png',12345678.00,'Product15122224',10,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_seq`
--

DROP TABLE IF EXISTS `product_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_seq`
--

LOCK TABLES `product_seq` WRITE;
/*!40000 ALTER TABLE `product_seq` DISABLE KEYS */;
INSERT INTO `product_seq` VALUES (151);
/*!40000 ALTER TABLE `product_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_suppliers`
--

DROP TABLE IF EXISTS `product_suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_suppliers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `last_supply_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `supply_price` decimal(10,2) NOT NULL,
  `product_id` int NOT NULL,
  `supplier_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmymnd7phgm081dt3iv276yl8a` (`supplier_id`),
  KEY `FK25qaqugu4rwup73wmfbh3glk` (`product_id`),
  CONSTRAINT `FK25qaqugu4rwup73wmfbh3glk` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `FKmymnd7phgm081dt3iv276yl8a` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_suppliers`
--

LOCK TABLES `product_suppliers` WRITE;
/*!40000 ALTER TABLE `product_suppliers` DISABLE KEYS */;
INSERT INTO `product_suppliers` VALUES (1,'2025-04-11 11:22:35',1000.00,1,2),(2,'2025-04-11 11:26:07',1000.00,3,2),(3,'2025-04-11 11:28:32',1000.00,6,2);
/*!40000 ALTER TABLE `product_suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('ADMIN','role admin'),('CUSTOMER','role customer');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `role_name` varchar(255) NOT NULL,
  `permissions_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_name`,`permissions_name`),
  KEY `FKf5aljih4mxtdgalvr7xvngfn1` (`permissions_name`),
  CONSTRAINT `FKcppvu8fk24eqqn6q4hws7ajux` FOREIGN KEY (`role_name`) REFERENCES `role` (`name`),
  CONSTRAINT `FKf5aljih4mxtdgalvr7xvngfn1` FOREIGN KEY (`permissions_name`) REFERENCES `permission` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES ('ADMIN','UPDATE_DATA'),('CUSTOMER','VIEW_DATA');
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `supplier_id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `supplier_name` varchar(255) NOT NULL,
  PRIMARY KEY (`supplier_id`),
  UNIQUE KEY `UKq5uvp89ra4ksaty5ghyaw4kjr` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (2,'USA','Nguyễn Vnaw B',NULL,'fukingsheet@gmail.com','0998252722','ACER'),(4,'55555555555555','2222222222','2025-04-11 09:57:51','44444444444','33333333333','1111111111');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `dob` date DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `user_type` enum('CUSTOMER','EMPLOYEE') DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr1usl9qoplqsbrhha5e0niqng` (`employee_id`),
  KEY `FKdptx0i3ky01svofwjytq5iry0` (`customer_id`),
  CONSTRAINT `FK211dk0pe7l3aibwce8yy61ota` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `FKdptx0i3ky01svofwjytq5iry0` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('16a7a715-b575-4caf-a795-f2297e91a994','1990-10-02','123sss','xxaavvv','$2a$10$uA1/L.4r115ZPi6/Yy1EaeYiS8UG.SUJEzfEHzItH73UEdfpmYNSi','NGyenvanAA','EMPLOYEE',NULL,NULL),('2537ea1d-2508-4ff3-aa39-661d15f5aaee',NULL,NULL,NULL,'$2a$10$S9TefVuo99vy4XNsTsB2mu3uJQmOckVHjAOBTQopLo26a4iCyI5Ke','adminn',NULL,NULL,NULL),('2c35909d-f800-4662-aa10-e3b97aed6be5','1990-10-02','Nguyễns ','Ích Sơna','$2a$10$QjwyAm/i.BolKYlekNHoueUTDxzEd9D6zpSThAc60mZO43QPL9plG','xxxxxxxxxxxxxxxxxxx','EMPLOYEE',NULL,NULL),('4a6e466b-59fe-4989-a566-7344745de244','1990-10-02','Nguyễns ','Ích Sơna','$2a$10$jiSt/QVtUop/Xwzc81QXJ.Y/hfiTWROnusYXia2.CYUs.I6pGWnDy','Nguyenichson1123','CUSTOMER',NULL,NULL),('67147403-5722-4e8b-a5a4-351d5108e110',NULL,'111111','222222222','$2a$10$Y5RShs2ruzbVWkK.ezl3Y.YVEYwfG6DPCU1apLs51BxugaxZotqnm','NGyenvanAAbbx','CUSTOMER',NULL,NULL),('71954acf-9a37-40f9-a4b1-5ec960b7ad47','1990-10-02','Nguyễns ','Ích Sơna','$2a$10$jO7e5P5O7dOky.302VbpZ.Juuz5tY5dtAfj2ogXBScW5e3.hJuQFy','nguyenxxxa','CUSTOMER',NULL,NULL),('8249a6ec-dad4-4cee-b154-33c3f398abe5','1990-10-02','AAAAAAABBBBBB','XSSSSSSS','$2a$10$QL6B1DKhsSi3A23NX75AzO4.tXI5URkDZQFyeH2vNKOTvRifoBVNK','NGyenvanAABB','EMPLOYEE',NULL,NULL),('84bf89ab-560b-42e9-89ca-ad5de432f457',NULL,'NGUYESS','XXX','$2a$10$WrCL2K5US4EqHef49fFdw.KlS2d0dX9ths9DmR84vZ.Rpd2IIGsOC','NguyenvanB','CUSTOMER',NULL,NULL),('96a1d403-0456-41dc-abf1-0d94a8484a0b','1990-10-02','Nguyễns ','Ích Sơna','$2a$10$IXQB6kwW1wSgzzVtb1ImmONgA9lbPpFqFytVvCUn461AlOx2obaqa','Nguyen ich son',NULL,NULL,NULL),('9acac109-9abf-4302-ad40-b7c77d323a16','1990-02-02','1234','13224','$2a$10$Z1pwdLG3nA9fnQ29T5Uf6.CtJlQbBhoi2VlVReNfozckjiaE9NaTy','nguyenxxx2xa','EMPLOYEE',NULL,3),('b49ceb9e-c681-47b7-8bce-795cecc8e480','1990-02-02','123456','123456','$2a$10$tZJ51JihnVBKmDd9cUBs.OswhNyK7/1reBBcEFzgTaG30Kjk0TR6a','sonsonson','EMPLOYEE',NULL,4),('bf62c360-61ec-4815-a0f7-3f8a9091b629','1990-02-02','1234','13224','$2a$10$gtWuyzRnRPggNlYMEYzTuuTqFMIbD0RkpG.BhxGlQ8MQt69LrOC9W','abcxyz123','CUSTOMER',2,NULL),('cda79818-313a-4018-aa2d-beabdfc00937','1990-10-02','Nguyễns ','Ích Sơna','$2a$10$yWiv37UF/5MnRheFVdrMs.CtS/WFFzL9xoimH/qu4.DxE.MZjdp3q','Nguyenichson2',NULL,NULL,NULL),('e1932966-5f09-4c72-9cc0-fdbb71cd583e',NULL,NULL,NULL,'$2a$10$CIMV0e2EG0..V3HUDutDmuCuI95Uhc3mM2FHsNpJm.CzVWmxjcqLC','admin',NULL,1,2),('e948e4e2-1ce5-455b-8fcc-470055215a23','1990-10-02','aaaaaaavvvvvvv','xcssssss','$2a$10$D6uus.8XxAiGPn.M2Hg3Zem0qLzP.cikfBNyozWsULaby/T9NP3n2','MSSUXX222','EMPLOYEE',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` varchar(255) NOT NULL,
  `roles_name` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`,`roles_name`),
  KEY `FK6pmbiap985ue1c0qjic44pxlc` (`roles_name`),
  CONSTRAINT `FK55itppkw3i07do3h7qoclqd4k` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK6pmbiap985ue1c0qjic44pxlc` FOREIGN KEY (`roles_name`) REFERENCES `role` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES ('16a7a715-b575-4caf-a795-f2297e91a994','ADMIN'),('2c35909d-f800-4662-aa10-e3b97aed6be5','ADMIN'),('4a6e466b-59fe-4989-a566-7344745de244','ADMIN'),('71954acf-9a37-40f9-a4b1-5ec960b7ad47','ADMIN'),('8249a6ec-dad4-4cee-b154-33c3f398abe5','ADMIN'),('9acac109-9abf-4302-ad40-b7c77d323a16','ADMIN'),('b49ceb9e-c681-47b7-8bce-795cecc8e480','ADMIN'),('cda79818-313a-4018-aa2d-beabdfc00937','ADMIN'),('e1932966-5f09-4c72-9cc0-fdbb71cd583e','ADMIN'),('e948e4e2-1ce5-455b-8fcc-470055215a23','ADMIN'),('67147403-5722-4e8b-a5a4-351d5108e110','CUSTOMER'),('84bf89ab-560b-42e9-89ca-ad5de432f457','CUSTOMER'),('bf62c360-61ec-4815-a0f7-3f8a9091b629','CUSTOMER');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'identity_service'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-21  8:58:25
