-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: class_scoring
-- ------------------------------------------------------
-- Server version	8.0.12

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
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'数学'),(2,'语文'),(3,'英语'),(8,'体育');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `condition`
--

LOCK TABLES `condition` WRITE;
/*!40000 ALTER TABLE `condition` DISABLE KEYS */;
INSERT INTO `condition` VALUES (1,'练习册',1,'数学',1,'2018-10-04 07:55:57',1),(2,'练习册',1,'数学',1,'2018-10-04 07:55:57',1),(3,'练习册',1,'数学',1,'2018-10-04 07:55:57',1),(4,'练习册',1,'数学',1,'2018-10-04 07:55:57',1),(5,'练习册',1,'数学',1,'2018-10-04 07:55:57',1),(6,'练习册',1,'数学',1,'2018-10-04 07:55:57',1),(7,'A号本',1,'数学',2,'2018-10-04 07:55:57',1),(8,'A号本',1,'数学',2,'2018-10-04 07:55:57',1),(9,'A号本',1,'数学',2,'2018-10-04 07:55:57',1),(10,'A号本',1,'数学',2,'2018-10-04 07:55:57',1),(11,'A号本',1,'数学',2,'2018-10-04 07:55:57',1),(12,'A号本',1,'数学',2,'2018-10-04 07:55:58',1),(13,'A号本',1,'数学',2,'2018-10-04 07:55:58',1),(14,'讲义卷',1,'数学',2,'2018-10-04 07:55:58',1),(15,'讲义卷',1,'数学',2,'2018-10-04 07:55:58',1),(16,'上课表现',1,'数学',1,'2018-10-04 07:55:58',1),(17,'上课表现',1,'数学',1,'2018-10-04 07:55:58',1),(18,'上课表现',2,NULL,2,'2018-10-04 07:56:12',1),(19,'上课表现',3,NULL,2,'2018-10-04 08:05:35',1),(20,'上课表现',1,NULL,2,'2018-10-07 08:04:16',1),(21,'上课表现',3,NULL,2,'2018-10-07 08:10:59',1),(22,'上课表现',3,NULL,2,'2018-10-15 08:42:27',5),(23,'上课表现',3,NULL,2,'2018-10-15 08:45:33',6),(28,'上课表现',8,NULL,2,'2018-10-22 09:09:29',1),(29,'上课表现',8,NULL,2,'2018-10-22 09:13:04',1),(30,'上课表现',8,NULL,2,'2018-10-22 09:13:05',1),(31,'上课表现',8,NULL,2,'2018-10-22 09:13:05',1),(32,'上课表现',1,NULL,2,'2018-10-22 09:22:18',1),(33,'上课表现',1,NULL,2,'2018-10-22 09:22:19',1);
/*!40000 ALTER TABLE `condition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (2,'张是',2),(3,'张三',3),(4,'张四',4),(5,'张五',5),(6,'张六',6),(8,'张八',8),(9,'张九',9),(10,'张十',10),(11,'张一',11),(12,'张二',12),(13,'张三',13),(14,'张四',14),(15,'张五',15),(16,'张六',16),(17,'张七',17),(18,'张八',18),(19,'张九',19),(20,'张十',20),(21,'张一',21),(22,'张二',22),(23,'张三',23),(24,'张四',24),(25,'张五',25),(26,'张六',26),(27,'张七',27),(28,'张八',28),(29,'张九',29),(30,'张十',30),(31,'张一',31),(32,'张二',32),(33,'张三',33),(34,'张四',34),(35,'张五',35),(36,'张六',36),(37,'张七',37),(38,'张八',38),(39,'张九',39),(40,'张十',40),(41,'张一',41),(42,'张二',42),(43,'张三',43),(44,'张四',44),(45,'张五',45),(1,'孙一',53),(46,'张刘',56);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `student_condition`
--

LOCK TABLES `student_condition` WRITE;
/*!40000 ALTER TABLE `student_condition` DISABLE KEYS */;
INSERT INTO `student_condition` VALUES (5,1),(18,2),(22,3),(27,4),(33,5),(46,6),(2,7),(11,8),(25,9),(32,10),(33,11),(45,12),(46,13),(7,14),(11,15),(1,16),(41,17),(35,18),(23,19),(17,20),(23,21),(23,22),(23,23),(35,28),(32,29),(33,30),(28,31),(33,32),(30,33);
/*!40000 ALTER TABLE `student_condition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'王尼玛','vx123','000',1),(2,'赵铁蛋','vx456','111',1),(3,'刘翠花','vx789','222',0),(4,'张三','vx111','123',0),(5,'张四','vx1111','1111',0),(6,'张五','vx12345','12345',0),(7,'李四','vx1122','1122',0),(8,'李武','vx1112','1112',0),(9,'王五','vx1100','1100',0);
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

-- Dump completed on 2018-10-23 13:47:53
