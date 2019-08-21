-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2019 at 03:20 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `logo` varchar(100) NOT NULL,
  `role` enum('school','admin') NOT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `delete_date` datetime DEFAULT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `name`, `address`, `email`, `phone`, `logo`, `role`, `create_date`, `update_date`, `delete_date`, `status`) VALUES
(1, 'imran', 'imran', 'imran khan', 'Mulund West, Mumbai', 'iamkhan007@gmail.com', '8999315879', 'image.jpg', 'school', '2019-08-01 00:00:00', '2019-08-21 12:21:45', '0000-00-00 00:00:00', 1),
(2, 'ikp', 'ikp', 'shoeb', 'Kurla East', 'shoeb@minkville.com', '8999315879', 'hello.jpg', 'admin', '2019-08-01 00:00:00', '2019-08-21 12:35:58', NULL, 1),
(3, 'ikp1', 'ikp', 'shoeb', '', 'shoeb@minkville.com', '8999315879', 'hello.jpg', 'school', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL, 1),
(4, 'khan', 'imran', 'imran khan', 'Mulund West, Mumbai', 'iamkhan007@gmail.com', '8999315879', 'image.jpg', 'school', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `class_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `class_name` varchar(50) NOT NULL,
  `teacher_name` varchar(50) NOT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `delete_date` datetime NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`class_id`, `account_id`, `class_name`, `teacher_name`, `create_date`, `update_date`, `delete_date`, `status`) VALUES
(1, 1, 'Nursary', 'Priyanka', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(2, 1, 'Jr KG', 'Ayesha', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(3, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:40:34', '2019-08-21 17:40:34', '0000-00-00 00:00:00', 1),
(4, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:41:03', '2019-08-21 17:41:03', '0000-00-00 00:00:00', 1),
(5, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:45:22', '2019-08-21 17:45:22', '0000-00-00 00:00:00', 1),
(6, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:45:25', '2019-08-21 17:45:25', '0000-00-00 00:00:00', 1),
(7, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:45:27', '2019-08-21 17:45:27', '0000-00-00 00:00:00', 1),
(8, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:45:27', '2019-08-21 17:45:27', '0000-00-00 00:00:00', 1),
(9, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:45:27', '2019-08-21 17:45:27', '0000-00-00 00:00:00', 1),
(10, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:45:28', '2019-08-21 17:45:28', '0000-00-00 00:00:00', 1),
(11, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:46:45', '2019-08-21 17:46:45', '0000-00-00 00:00:00', 1),
(12, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:46:46', '2019-08-21 17:46:46', '0000-00-00 00:00:00', 1),
(13, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:46:58', '2019-08-21 17:46:58', '0000-00-00 00:00:00', 1),
(14, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:47:08', '2019-08-21 17:47:08', '0000-00-00 00:00:00', 1),
(15, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:53:10', '2019-08-21 17:53:10', '0000-00-00 00:00:00', 1),
(16, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:53:12', '2019-08-21 17:53:12', '0000-00-00 00:00:00', 1),
(17, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:54:51', '2019-08-21 17:54:51', '0000-00-00 00:00:00', 1),
(18, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:54:53', '2019-08-21 17:54:53', '0000-00-00 00:00:00', 1),
(19, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:55:51', '2019-08-21 17:55:51', '0000-00-00 00:00:00', 1),
(20, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:56:22', '2019-08-21 17:56:22', '0000-00-00 00:00:00', 1),
(21, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:57:01', '2019-08-21 17:57:01', '0000-00-00 00:00:00', 1),
(22, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:57:12', '2019-08-21 17:57:12', '0000-00-00 00:00:00', 1),
(23, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:57:21', '2019-08-21 17:57:21', '0000-00-00 00:00:00', 1),
(24, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:57:30', '2019-08-21 17:57:30', '0000-00-00 00:00:00', 1),
(25, 1, 'Jr KG', 'Ayesha', '2019-08-21 17:58:35', '2019-08-21 17:58:35', '0000-00-00 00:00:00', 1),
(26, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:07:39', '2019-08-21 18:07:39', '0000-00-00 00:00:00', 1),
(27, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:16:00', '2019-08-21 18:16:00', '0000-00-00 00:00:00', 1),
(28, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:20:54', '2019-08-21 18:20:54', '0000-00-00 00:00:00', 1),
(29, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:25:57', '2019-08-21 18:25:57', '0000-00-00 00:00:00', 1),
(30, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:26:10', '2019-08-21 18:26:10', '0000-00-00 00:00:00', 1),
(31, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:30:31', '2019-08-21 18:30:31', '0000-00-00 00:00:00', 1),
(32, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:30:34', '2019-08-21 18:30:34', '0000-00-00 00:00:00', 1),
(33, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:30:43', '2019-08-21 18:30:43', '0000-00-00 00:00:00', 1),
(34, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:33:09', '2019-08-21 18:33:09', '0000-00-00 00:00:00', 1),
(35, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:33:26', '2019-08-21 18:33:26', '0000-00-00 00:00:00', 1),
(36, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:33:35', '2019-08-21 18:33:35', '0000-00-00 00:00:00', 1),
(37, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:35:41', '2019-08-21 18:35:41', '0000-00-00 00:00:00', 1),
(38, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:35:46', '2019-08-21 18:35:46', '0000-00-00 00:00:00', 1),
(39, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:36:44', '2019-08-21 18:36:44', '0000-00-00 00:00:00', 1),
(40, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:36:46', '2019-08-21 18:36:46', '0000-00-00 00:00:00', 1),
(41, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:38:04', '2019-08-21 18:38:04', '0000-00-00 00:00:00', 1),
(42, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:38:05', '2019-08-21 18:38:05', '0000-00-00 00:00:00', 1),
(43, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:38:06', '2019-08-21 18:38:06', '0000-00-00 00:00:00', 1),
(44, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:38:06', '2019-08-21 18:38:06', '0000-00-00 00:00:00', 1),
(45, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:38:06', '2019-08-21 18:38:06', '0000-00-00 00:00:00', 1),
(46, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:38:06', '2019-08-21 18:38:06', '0000-00-00 00:00:00', 1),
(47, 1, 'Jr KG', 'Ayesha', '2019-08-21 18:38:19', '2019-08-21 18:38:19', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `robot`
--

CREATE TABLE `robot` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `serial_number` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `delete_date` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `robot`
--

INSERT INTO `robot` (`id`, `account_id`, `serial_number`, `type`, `create_date`, `update_date`, `delete_date`, `status`) VALUES
(2, 1, '', '', '2019-08-21 16:20:09', '2019-08-21 16:20:09', NULL, 1),
(3, 1, '1234', 'snow', '2019-08-21 16:22:28', '2019-08-21 16:22:28', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `gender` enum('Male','Female','','') NOT NULL,
  `photo` varchar(100) NOT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `delete_date` datetime NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `account_id`, `class_id`, `first_name`, `last_name`, `gender`, `photo`, `create_date`, `update_date`, `delete_date`, `status`) VALUES
(2, 1, 1, 'Imran', 'Khan', 'Male', 'image.jpg', '2019-08-21 15:54:12', '2019-08-21 15:54:12', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `temperature`
--

CREATE TABLE `temperature` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `temperature` double NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`class_id`);

--
-- Indexes for table `robot`
--
ALTER TABLE `robot`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `temperature`
--
ALTER TABLE `temperature`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT for table `robot`
--
ALTER TABLE `robot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `temperature`
--
ALTER TABLE `temperature`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
