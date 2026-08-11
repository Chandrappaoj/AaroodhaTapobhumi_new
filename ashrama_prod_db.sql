-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: ashrama_db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (2,'admin','admin123','admin@ashrama.org','2026-01-10 08:40:25');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_submissions`
--

DROP TABLE IF EXISTS `contact_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_submissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` enum('new','read','replied') DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_submissions`
--

LOCK TABLES `contact_submissions` WRITE;
/*!40000 ALTER TABLE `contact_submissions` DISABLE KEYS */;
INSERT INTO `contact_submissions` VALUES (1,'ಸುರೇಶ್ ಬಾಬು','9876543213','suresh@example.com','ಆಶ್ರಮ ಭೇಟಿ','ನಾನು ಮುಂದಿನ ವಾರ ಆಶ್ರಮಕ್ಕೆ ಭೇಟಿ ನೀಡಲು ಬಯಸುತ್ತೇನೆ. ದಯವಿಟ್ಟು ಸಮಯವನ್ನು ತಿಳಿಸಿ.','new','2026-01-10 08:36:26'),(2,'ಅನಿತಾ ದೇಶಪಾಂಡೆ','9876543214','anita@example.com','ದಾನ ಮಾಹಿತಿ','ದಾನ ಮಾಡುವ ವಿಧಾನದ ಬಗ್ಗೆ ಮಾಹಿತಿ ಬೇಕು.','read','2026-01-10 08:36:26'),(3,'ಮಹೇಶ್ ಕುಲಕರ್ಣಿ','9876543215','mahesh@example.com','ಕಾರ್ಯಕ್ರಮ ವಿಚಾರಣೆ','ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳ ಬಗ್ಗೆ ತಿಳಿಸಿ.','new','2026-01-10 08:36:26');
/*!40000 ALTER TABLE `contact_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `donations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `donor_name` varchar(255) NOT NULL,
  `donor_email` varchar(255) DEFAULT NULL,
  `donor_phone` varchar(20) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` enum('pending','completed','failed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
INSERT INTO `donations` VALUES (1,'ರಾಜೇಶ್ ಕುಮಾರ್','rajesh@example.com','9876543210',5000.00,'UPI','TXN123456789','ಅನ್ನದಾನ','ಓಂ ನಮಃ ಶಿವಾಯ','completed','2026-01-10 08:36:26'),(2,'ಪ್ರಿಯಾ ಶರ್ಮಾ','priya@example.com','9876543211',10000.00,'Bank Transfer','TXN987654321','ಆಶ್ರಮ ನಿರ್ಮಾಣ','ಆಶ್ರಮದ ಅಭಿವೃದ್ಧಿಗಾಗಿ','completed','2026-01-10 08:36:26'),(3,'ವಿಜಯ ಪಾಟೀಲ್','vijay@example.com','9876543212',2500.00,'UPI','TXN456789123','ಗೋಸೇವೆ','','completed','2026-01-10 08:36:26');
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title_kannada` varchar(255) NOT NULL,
  `title_english` varchar(255) NOT NULL,
  `description_kannada` text NOT NULL,
  `description_english` text NOT NULL,
  `event_date` date NOT NULL,
  `event_time` time DEFAULT NULL,
  `location_kannada` varchar(255) DEFAULT NULL,
  `location_english` varchar(255) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'ಮಹಾಶಿವರಾತ್ರಿ ಮಹೋತ್ಸವ','Maha Shivaratri Festival','ಭಗವಾನ್ ಶಿವನ ಪೂಜೆ ಮತ್ತು ವಿಶೇಷ ಆರಾಧನೆ. ರಾತ್ರಿಯಿಡೀ ಭಜನೆ ಮತ್ತು ಧ್ಯಾನ ಕಾರ್ಯಕ್ರಮಗಳು.','Special worship and prayers to Lord Shiva. All-night bhajan and meditation programs.','2026-02-26','18:00:00','ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ, ಖಂಡೇರಾಯನಹಳ್ಳಿ','Sri Aaroodha Tapobhumi, Khanderayanahalli','/uploads/events/shivaratri.jpg',1,'2026-01-10 08:36:26','2026-01-10 08:36:26'),(2,'ಗುರು ಪೂರ್ಣಿಮಾ ಸಮಾರಂಭ','Guru Purnima Celebration','ಗುರುಗಳ ಸ್ಮರಣೆ ಮತ್ತು ಆಶೀರ್ವಾದ. ವಿಶೇಷ ಪೂಜೆ ಮತ್ತು ಪ್ರವಚನ.','Remembrance and blessings of Gurus. Special puja and discourse.','2026-07-13','09:00:00','ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ','Sri Aaroodha Tapobhumi','/uploads/events/guru-purnima.jpg',1,'2026-01-10 08:36:26','2026-01-10 08:36:26'),(3,'ದೀಪಾವಳಿ ಮಹೋತ್ಸವ','Deepavali Festival','ದೀಪಗಳ ಹಬ್ಬ. ಲಕ್ಷ್ಮೀ ಪೂಜೆ ಮತ್ತು ವಿಶೇಷ ಆರತಿ.','Festival of Lights. Lakshmi Puja and special aarti.','2026-10-19','17:30:00','ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ','Sri Aaroodha Tapobhumi','/uploads/events/deepavali.jpg',1,'2026-01-10 08:36:26','2026-01-10 08:36:26'),(4,'ಯುಗಾದಿ','Ugadi','ಹೊಸ ವರ್ಷದ ಆರಂಭ. ಮನೆಗಳಲ್ಲಿ ಹಬ್ಬದ ಊಟ, ಪೂಜೆ ಮತ್ತು ಸಂಭ್ರಮ.','Marks the Hindu New Year celebrated with prayers and festive meals.','2026-03-20','05:00:00','ಮುಖ್ಯ ದೇವಾಲಯ ಮಂದಿರ','Main Temple Hall',NULL,1,'2026-01-10 14:50:11','2026-01-10 16:27:06');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title_kannada` varchar(255) DEFAULT NULL,
  `title_english` varchar(255) DEFAULT NULL,
  `description_kannada` text DEFAULT NULL,
  `description_english` text DEFAULT NULL,
  `image_url` varchar(500) NOT NULL,
  `category` varchar(100) DEFAULT 'general',
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` VALUES (7,'ಭಾರತೀಶ','Bharathisha',NULL,NULL,'/ashrama-api/uploads/6962f6d72ced2_1768093399.png','ashrama',0,1,'2026-01-11 01:03:19'),(8,'ಆರೂಢ','Aaroodha',NULL,NULL,'/ashrama-api/uploads/6962f72359c8d_1768093475.png','festivals',0,1,'2026-01-11 01:04:35'),(9,'ನಾಗರಾಜಾನಂದ-ಸ್ವಾಮೀಜಿ','Nagarajananda-Swamiji',NULL,NULL,'/ashrama-api/uploads/6962f75abb7e9_1768093530.png','ashrama',0,1,'2026-01-11 01:05:30'),(10,'ಸಿದ್ಧಾರೂಢ-1','Siddaroodha-1',NULL,NULL,'/ashrama-api/uploads/6962f79acc65f_1768093594.png','events',0,1,'2026-01-11 01:06:34'),(12,'ಸಿದ್ಧಾರೂಢ-15','Siddaroodha-15',NULL,NULL,'/ashrama-api/uploads/6963923fd15d8_1768133183.png','ashrama',0,1,'2026-01-11 12:06:23'),(13,'ಸಿದ್ಧಾರೂಢ-16','Siddaroodha-16',NULL,NULL,'/ashrama-api/uploads/696392b6cf2fe_1768133302.png','festivals',0,1,'2026-01-11 12:08:22'),(14,'ಸಿದ್ಧಾರೂಢ-17','Siddaroodha-17',NULL,NULL,'/ashrama-api/uploads/696392e967a20_1768133353.png','festivals',0,1,'2026-01-11 12:09:13'),(15,'ಸಿದ್ಧಾರೂಢ-18','Siddaroodha-18',NULL,NULL,'/ashrama-api/uploads/6963932ed94b7_1768133422.png','festivals',0,1,'2026-01-11 12:10:22'),(16,'ಸಿದ್ಧಾರೂಢ-೧೯','Siddaroodha-19',NULL,NULL,'/ashrama-api/uploads/69639359d3b5e_1768133465.png','festivals',0,1,'2026-01-11 12:11:05'),(17,'','Gurunathswamij 24',NULL,NULL,'/ashrama-api/uploads/6964ca1d5d06c_1768213021_0.png','events',0,1,'2026-01-12 10:17:01'),(18,'','Siddaroodha 21',NULL,NULL,'/ashrama-api/uploads/6964ca1d5f343_1768213021_1.png','events',0,1,'2026-01-12 10:17:01'),(19,'','Siddaroodha 20',NULL,NULL,'/ashrama-api/uploads/6964ca1d5fda9_1768213021_2.png','events',0,1,'2026-01-12 10:17:01'),(20,'','SiddhroadhSwami  13614',NULL,NULL,'/ashrama-api/uploads/6964ca1d60fbd_1768213021_3.jpg','events',0,1,'2026-01-12 10:17:01'),(21,'','SiddhroadhSwami  13565',NULL,NULL,'/ashrama-api/uploads/6964ca1d61fb0_1768213021_4.jpg','events',0,1,'2026-01-12 10:17:01'),(22,'','SiddhroadhSwami  12512',NULL,NULL,'/ashrama-api/uploads/6964ca1d62f40_1768213021_5.jpg','events',0,1,'2026-01-12 10:17:01'),(23,'','SiddhroadhSwami  6607',NULL,NULL,'/ashrama-api/uploads/6964ca1d64b97_1768213021_6.jpg','events',0,1,'2026-01-12 10:17:01'),(24,'','SiddhroadhSwami  5891',NULL,NULL,'/ashrama-api/uploads/6964ca1d68650_1768213021_7.jpg','events',0,1,'2026-01-12 10:17:01'),(25,'','SiddhroadhSwami  5732',NULL,NULL,'/ashrama-api/uploads/6964ca1d6e63c_1768213021_8.jpg','events',0,1,'2026-01-12 10:17:01'),(26,'','SiddhroadhSwami  5239',NULL,NULL,'/ashrama-api/uploads/6964ca1d72466_1768213021_9.jpg','events',0,1,'2026-01-12 10:17:01'),(27,'','SiddhroadhSwami  5164',NULL,NULL,'/ashrama-api/uploads/6964ca1d7962c_1768213021_10.jpg','events',0,1,'2026-01-12 10:17:01'),(28,'','SiddhroadhSwami  4867',NULL,NULL,'/ashrama-api/uploads/6964ca1d7bf68_1768213021_11.jpg','events',0,1,'2026-01-12 10:17:01'),(29,'','SiddhroadhSwami  4769',NULL,NULL,'/ashrama-api/uploads/6964ca1d7f5bf_1768213021_12.jpg','events',0,1,'2026-01-12 10:17:01'),(30,'','SiddhroadhSwami  4052',NULL,NULL,'/ashrama-api/uploads/6964ca1d838e1_1768213021_13.jpg','events',0,1,'2026-01-12 10:17:01'),(31,'','SiddhroadhSwami  2159',NULL,NULL,'/ashrama-api/uploads/6964ca1d85aaa_1768213021_14.jpg','events',0,1,'2026-01-12 10:17:01'),(32,'ಸಿದ್ಧಾರೂಢ 967','SiddhroadhSwami  967',NULL,NULL,'/ashrama-api/uploads/6964ca1d867d9_1768213021_15.jpg','events',0,1,'2026-01-12 10:17:01'),(33,'ಸಿದ್ಧಾರೂಢ 798','SiddhroadhSwami  798',NULL,NULL,'/ashrama-api/uploads/6964ca1d877e3_1768213021_16.jpg','events',0,1,'2026-01-12 10:17:01'),(34,'ಸಿದ್ಧಾರೂಢ 14504','SiddhroadhSwami  14504',NULL,NULL,'/ashrama-api/uploads/6964ca1d88633_1768213021_17.jpg','events',0,1,'2026-01-12 10:17:01'),(35,'ಸಿದ್ಧಾರೂಢ 11534','SiddhroadhSwami  11534',NULL,NULL,'/ashrama-api/uploads/6964ca1d89228_1768213021_18.jpg','events',0,1,'2026-01-12 10:17:01');
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_images`
--

DROP TABLE IF EXISTS `site_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `site_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_key` varchar(100) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `title_kannada` varchar(255) DEFAULT NULL,
  `title_english` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `image_key` (`image_key`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_images`
--

LOCK TABLES `site_images` WRITE;
/*!40000 ALTER TABLE `site_images` DISABLE KEYS */;
INSERT INTO `site_images` VALUES (1,'hero_image','/ashrama-api/uploads/hero-ashrama.jpg','ಮುಖ್ಯ ಚಿತ್ರ','Hero Image','Main hero image for homepage','2026-01-10 14:04:35'),(2,'about_image','/ashrama-api/uploads/about-ashrama.jpg','ಆಶ್ರಮ ಬಗ್ಗೆ','About Ashrama','Image for about section','2026-01-10 14:04:35'),(3,'contact_image','/ashrama-api/uploads/contact-bg.jpg','ಸಂಪರ್ಕ ಹಿನ್ನೆಲೆ','Contact Background','Background image for contact page','2026-01-10 14:04:35'),(4,'swamiji_photo','/ashrama-api/uploads/swamiji-main.jpg','ಸ್ವಾಮೀಜಿ ಫೋಟೋ','Swamiji Photo','Main photo of Swamiji','2026-01-10 14:04:35');
/*!40000 ALTER TABLE `site_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trustees`
--

DROP TABLE IF EXISTS `trustees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trustees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_kannada` varchar(255) NOT NULL,
  `name_english` varchar(255) NOT NULL,
  `position_kannada` varchar(255) NOT NULL,
  `position_english` varchar(255) NOT NULL,
  `bio_kannada` text DEFAULT NULL,
  `bio_english` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trustees`
--

LOCK TABLES `trustees` WRITE;
/*!40000 ALTER TABLE `trustees` DISABLE KEYS */;
INSERT INTO `trustees` VALUES (6,'ಶ್ರೀ ನಾಗರಾಜಾನಂದ ಸ್ವಾಮೀಜಿ','Sri Nagarajananda Swamiji','ಪೀಠಾಧಿಪತಿ – ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿ','Presiding Officer – Shri Arudha Tapobhumi','ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿಯ ಪೀಠಾಧಿಪತಿಗಳಾಗಿ, ಭಕ್ತಿ, ಆತ್ಮಜ್ಞಾನ ಮತ್ತು ಸೇವೆಯ ಮಾರ್ಗದಲ್ಲಿ ಆಶ್ರಮದ ಆಧ್ಯಾತ್ಮಿಕ ಕಾರ್ಯಗಳನ್ನು ನೇತೃತ್ವ ನೀಡಿ ಮಾರ್ಗದರ್ಶನ ಮಾಡುತ್ತಿದ್ದಾರೆ.','As the Peetadhipathi of Sri Aaroodha Tapobhumi, he provides spiritual leadership and guidance, upholding the Ashrama’s path of devotion, self-realization, and service.','/ashrama-api/uploads/69633190738fd_1768108432.png',1,1,'2026-01-11 05:13:52','2026-01-11 05:13:52'),(8,'ಶ್ರೀಮತಿ ಲಕ್ಷ್ಮೀ ದೇವಿ','Shrimati Lakshmi Devi','Secretary','Secretary','ಆಶ್ರಮದ ದಿನನಿತ್ಯದ ಕಾರ್ಯಾಚರಣೆಗಳು ಮತ್ತು ಸೇವಾ ಚಟುವಟಿಕೆಗಳನ್ನು ಸಮನ್ವಯಗೊಳಿಸುತ್ತಿದ್ದಾರೆ.\r\n','Managing daily operations and coordinating seva activities with devotion and efficiency.\r\n','/ashrama-api/uploads/6963b9eac22ca_1768143338.jpg',4,1,'2026-01-11 14:55:38','2026-01-11 14:55:38'),(9,'ಶ್ರೀ ವೆಂಕಟೇಶ್ ರಾವ್','Mr. Venkatesh Rao','ಖಜಾಂಚಿ','Treasurer','ಆರ್ಥಿಕ ವ್ಯವಹಾರಗಳ ನಿರ್ವಹಣೆ ಮತ್ತು ಪಾರದರ್ಶಕತೆಯನ್ನು ಖಚಿತಪಡಿಸುತ್ತಿದ್ದಾರೆ.','Overseeing financial management and ensuring transparency in all transactions.','/ashrama-api/uploads/6963ba40713b7_1768143424.jpg',5,1,'2026-01-11 14:57:04','2026-01-11 14:57:04'),(10,'ಚಂದ್ರಶೇಖರ ಒಡೆಯರ್ ಜೆ','Chandrashekar Odeyar J','ವೆಬ್‌ಸೈಟ್ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ತಾಂತ್ರಿಕ ಬೆಂಬಲ','Website Development and Technical Support','ಶ್ರೀ ಆರೂಢ ತಪೋಭೂಮಿಯ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ವಿನ್ಯಾಸ ಮತ್ತು ತಾಂತ್ರಿಕ ಅಭಿವೃದ್ಧಿಯನ್ನು ಸಮರ್ಪಣೆಯಿಂದ ನಿರ್ಮಿಸಿ, ಆಶ್ರಮದ ಆಧ್ಯಾತ್ಮಿಕ ಸೇವೆಯನ್ನು ಡಿಜಿಟಲ್ ಮಾಧ್ಯಮದಲ್ಲಿ ಜನರಿಗೆ ತಲುಪಿಸುವಲ್ಲಿ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತಿದ್ದಾರೆ.','Building and managing the official website of Sri Aaroodha Tapobhumi with dedication, enabling the Ashrama’s spiritual mission to reach devotees through digital platforms.','/ashrama-api/uploads/6964aa79ad076_1768204921.png',2,1,'2026-01-11 15:02:55','2026-01-12 08:02:01');
/*!40000 ALTER TABLE `trustees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `videos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title_kannada` varchar(255) NOT NULL,
  `title_english` varchar(255) NOT NULL,
  `description_kannada` text DEFAULT NULL,
  `description_english` text DEFAULT NULL,
  `video_url` varchar(500) NOT NULL,
  `thumbnail_url` varchar(500) DEFAULT NULL,
  `category` varchar(100) DEFAULT 'general',
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES (4,'ನಚಿಕೇತನ ಕಥೆ, ನಮಗೆ ಸುಖ ಕೊಡುವುದು ಯಾವುದು?','The story of Nachiketa, what gives us happiness?',NULL,'','https://www.youtube.com/watch?v=iErWSamy0Y4',NULL,'general',0,1,'2026-01-10 17:59:15'),(5,'ಜಯ ಗುರುದೇವ ಜಯ ಗುರುದೇವ, ಶ್ರೀ ನಾಗರಾಜಾನಂದ ಸ್ವಾಮೀಜಿ','Jaya Gurudeva Jaya Gurudeva, Sri Nagarajananda Swamiji',NULL,'','https://www.youtube.com/watch?v=1xca4P_eHWs&list=RD1xca4P_eHWs&start_radio=1',NULL,'general',0,1,'2026-01-10 18:14:01'),(6,'ಜನನ ಮರಣವೆಂಬ ಸಾಂಸಾರದಿಂದ ದಾಟುವುದು ಹೇಗೆ, ಶ್ರೀ ಶಿವಾನಂದ ಭಾರತೀ ಸ್ವಾಮೀಜಿ','How to transcend the cycle of birth and death, Sri Sivananda Bharati Swamiji',NULL,'','https://www.youtube.com/watch?v=MV6NOEnQAvI',NULL,'general',0,1,'2026-01-10 18:16:02');
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-10 20:30:56
