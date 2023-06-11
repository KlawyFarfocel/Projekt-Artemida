-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2023 at 03:45 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `artemida`
--
CREATE DATABASE IF NOT EXISTS `artemida` DEFAULT CHARACTER SET utf8 COLLATE utf8_polish_ci;
USE `artemida`;

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `calculate_skladka_totals`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `calculate_skladka_totals` (IN `user_id` INT, OUT `nieoplacona_total` DECIMAL(10,2), OUT `oplacona_total` DECIMAL(10,2))   BEGIN
  SELECT SUM(kwota) INTO nieoplacona_total
  FROM skladka
  WHERE czlonek_id = user_id AND status = 'Nieopłacona';

  SELECT SUM(kwota) INTO oplacona_total
  FROM skladka
  WHERE czlonek_id = user_id AND status = "Opłacona";

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dane`
--

DROP TABLE IF EXISTS `dane`;
CREATE TABLE IF NOT EXISTS `dane` (
  `user_id` bigint(20) NOT NULL,
  `dane_id` int(11) NOT NULL AUTO_INCREMENT,
  `imie` varchar(50) NOT NULL,
  `nazwisko` varchar(40) NOT NULL,
  `pesel` varchar(11) NOT NULL,
  `legitymacja` varchar(255) NOT NULL,
  `miasto` varchar(255) NOT NULL,
  `kod` varchar(6) NOT NULL,
  `ulica` varchar(255) DEFAULT NULL,
  `mieszkanie` varchar(11) DEFAULT NULL,
  `budynek` varchar(11) NOT NULL,
  `e_mail` varchar(255) NOT NULL,
  `telefon` varchar(12) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`dane_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `dane`
--

INSERT INTO `dane` (`user_id`, `dane_id`, `imie`, `nazwisko`, `pesel`, `legitymacja`, `miasto`, `kod`, `ulica`, `mieszkanie`, `budynek`, `e_mail`, `telefon`, `updated_at`, `created_at`) VALUES
(1, 1, 'Michał', 'Panczo', '12345678111', '12312412', 'Limanowaaa', '34-122', 'Michał', '2', '2', 'samp23le@gmail.com', '+48222333223', '2023-04-19 12:17:43', NULL),
(2, 3, 'Witold', 'Tacikiewicz', '12345678912', '1w2re23', 'Limanowa', '34-600', 'Marka', '32', '22', 'giganig@gmail.com', '+48222333221', '2023-04-19 12:17:43', '2023-05-05 12:11:36'),
(6, 4, 'Marcin', 'Majkut', '12345678911', 'rerekumkum123', 'Limanowa', '34-600', 'Marka', '32', '22', 'frogson@gmail.com', '+48222333226', '2023-04-19 12:17:43', '2023-05-05 12:11:36'),
(17, 7, 'Majkel', 'Dżonak', '12345432198', 'TYMBE-1112-ANVE', 'Tymbark', '34-700', 'Laicka', NULL, '32', 'weasczwsq@wp.pl', '333222111', '2023-05-16 10:49:04', '2023-05-16 10:49:04');

-- --------------------------------------------------------

--
-- Table structure for table `ewidencja`
--

DROP TABLE IF EXISTS `ewidencja`;
CREATE TABLE IF NOT EXISTS `ewidencja` (
  `ewidencja_id` int(11) NOT NULL AUTO_INCREMENT,
  `zwierze_id` int(11) NOT NULL,
  `do_odst_max` int(11) NOT NULL,
  `do_odst_min` int(11) NOT NULL,
  `do_odst_obecny` int(11) NOT NULL,
  `data_koncowa` date NOT NULL,
  `obwod_id` int(11) NOT NULL,
  PRIMARY KEY (`ewidencja_id`),
  KEY `obwod_id` (`obwod_id`),
  KEY `zwierze_id` (`zwierze_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kapital`
--

DROP TABLE IF EXISTS `kapital`;
CREATE TABLE IF NOT EXISTS `kapital` (
  `klub_id` int(11) NOT NULL,
  `kapital` bigint(20) NOT NULL,
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `kapital`
--

INSERT INTO `kapital` (`klub_id`, `kapital`, `update_at`) VALUES
(2, 0, '2023-06-11 11:42:34'),
(1, 8247, '2023-06-11 13:17:55'),
(0, 0, '2023-06-11 11:45:16');

-- --------------------------------------------------------

--
-- Table structure for table `klub`
--

DROP TABLE IF EXISTS `klub`;
CREATE TABLE IF NOT EXISTS `klub` (
  `klub_id` int(11) NOT NULL,
  `nazwa` varchar(255) NOT NULL,
  `meetingdate` timestamp NOT NULL DEFAULT current_timestamp(),
  `meetingplace` varchar(255) NOT NULL,
  `prezes` int(11) NOT NULL,
  `sekretarz` int(11) NOT NULL,
  `skarbnik` int(11) NOT NULL,
  `lowczy_glowny` int(11) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`klub_id`),
  KEY `klub_id` (`klub_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `klub`
--

INSERT INTO `klub` (`klub_id`, `nazwa`, `meetingdate`, `meetingplace`, `prezes`, `sekretarz`, `skarbnik`, `lowczy_glowny`, `updated_at`, `created_at`) VALUES
(0, 'brak', '2023-06-06 23:58:34', 'brak', 0, 0, 0, 0, '2023-05-23 14:30:18', NULL),
(1, 'Dziki ale w jest nieme', '2023-06-07 12:50:00', 'Gruzja', 1, 2, 0, 0, '2023-06-07 09:46:23', NULL),
(2, 'rzabka', '2023-06-11 11:42:34', 'Remiza', 23, 17, 6, 0, NULL, NULL);

--
-- Triggers `klub`
--
DROP TRIGGER IF EXISTS `klub_add`;
DELIMITER $$
CREATE TRIGGER `klub_add` AFTER INSERT ON `klub` FOR EACH ROW BEGIN
    INSERT INTO `kapital` VALUES(NEW.klub_id, 0, DEFAULT);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `odstrzal`
--

DROP TABLE IF EXISTS `odstrzal`;
CREATE TABLE IF NOT EXISTS `odstrzal` (
  `odstrzal_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `polowanie_id` int(11) DEFAULT NULL,
  `data` date NOT NULL,
  `zwierze_id` int(11) NOT NULL,
  `potwierdzenie` enum('nie','tak') NOT NULL DEFAULT 'nie',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`odstrzal_id`),
  KEY `polowanie_id` (`polowanie_id`),
  KEY `user_id` (`user_id`),
  KEY `user_id_2` (`user_id`,`polowanie_id`,`zwierze_id`),
  KEY `zwierze_id` (`zwierze_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `odstrzal`
--

INSERT INTO `odstrzal` (`odstrzal_id`, `user_id`, `polowanie_id`, `data`, `zwierze_id`, `potwierdzenie`, `updated_at`, `created_at`) VALUES
(1, 1, NULL, '2023-04-17', 23, 'tak', '2023-05-30 21:23:26', '2023-05-30 21:23:44'),
(2, 1, NULL, '2023-04-17', 43, 'tak', '2023-05-30 21:23:26', '2023-05-30 21:23:44'),
(3, 2, 14, '2000-01-01', 38, 'tak', '2023-05-31 07:44:37', '2023-05-30 19:25:20'),
(4, 2, 14, '2000-01-01', 38, 'tak', '2023-05-31 07:44:37', '2023-05-30 19:25:20'),
(5, 0, 14, '2000-01-01', 38, 'nie', '2023-05-30 19:36:25', '2023-05-30 19:36:25'),
(6, 0, 14, '2000-01-01', 38, 'nie', '2023-05-30 19:36:25', '2023-05-30 19:36:25'),
(7, 0, 14, '2000-01-01', 39, 'nie', '2023-05-30 19:36:25', '2023-05-30 19:36:25'),
(8, 0, 14, '2000-01-01', 39, 'nie', '2023-05-30 19:36:25', '2023-05-30 19:36:25'),
(9, 0, 20, '2000-01-01', 21, 'nie', '2023-05-30 19:40:02', '2023-05-30 19:40:02'),
(10, 0, 20, '2000-01-01', 21, 'nie', '2023-05-30 19:40:02', '2023-05-30 19:40:02'),
(11, 0, 20, '2000-01-01', 24, 'nie', '2023-05-30 19:40:02', '2023-05-30 19:40:02'),
(12, 0, 20, '2000-01-01', 24, 'nie', '2023-05-30 19:40:02', '2023-05-30 19:40:02'),
(13, 0, 20, '2000-01-01', 24, 'nie', '2023-05-30 19:40:02', '2023-05-30 19:40:02'),
(14, 0, 20, '2000-01-01', 24, 'nie', '2023-05-30 19:40:02', '2023-05-30 19:40:02'),
(15, 2, 21, '2000-01-01', 19, 'tak', '2023-05-31 07:47:25', '2023-05-30 20:36:31'),
(16, 2, 21, '2000-01-01', 19, 'tak', '2023-05-31 07:47:25', '2023-05-30 20:36:31'),
(17, 2, 21, '2000-01-01', 19, 'tak', '2023-05-31 07:52:56', '2023-05-30 20:36:31'),
(18, 0, 23, '2000-01-01', 28, 'nie', '2023-05-31 08:53:02', '2023-05-31 08:53:02'),
(19, 0, 23, '2000-01-01', 28, 'nie', '2023-05-31 08:53:02', '2023-05-31 08:53:02'),
(20, 0, 23, '2000-01-01', 28, 'nie', '2023-05-31 08:53:02', '2023-05-31 08:53:02'),
(21, 0, 23, '2000-01-01', 28, 'nie', '2023-05-31 08:53:02', '2023-05-31 08:53:02'),
(22, 0, 23, '2000-01-01', 12, 'nie', '2023-05-31 08:53:26', '2023-05-31 08:53:26'),
(23, 0, 23, '2000-01-01', 12, 'nie', '2023-05-31 08:53:26', '2023-05-31 08:53:26'),
(24, 0, 25, '2000-01-01', 12, 'nie', '2023-05-31 08:53:26', '2023-05-31 08:53:26'),
(25, 1, 25, '2000-01-01', 13, 'tak', '2023-06-06 23:31:03', '2023-05-31 08:53:26'),
(26, 2, 27, '2000-01-01', 13, 'tak', '2023-05-31 09:01:34', '2023-05-31 09:01:14'),
(27, 2, 27, '2000-01-01', 13, 'tak', '2023-05-31 09:01:34', '2023-05-31 09:01:14'),
(28, 2, 27, '2000-01-01', 13, 'tak', '2023-05-31 09:01:34', '2023-05-31 09:01:14'),
(29, 2, 27, '2000-01-01', 13, 'tak', '2023-05-31 09:01:34', '2023-05-31 09:01:14'),
(30, 0, 25, '2000-01-01', 13, 'nie', '2023-05-31 08:53:26', '2023-05-31 08:53:26'),
(31, 22, 29, '2000-01-01', 22, 'tak', '2023-06-07 09:57:49', '2023-06-07 09:57:08'),
(32, 22, 29, '2000-01-01', 22, 'tak', '2023-06-07 09:57:49', '2023-06-07 09:57:08'),
(33, 22, 29, '2000-01-01', 22, 'tak', '2023-06-07 09:57:49', '2023-06-07 09:57:08'),
(34, 0, 29, '2000-01-01', 41, 'nie', '2023-06-07 09:57:08', '2023-06-07 09:57:08'),
(35, 0, 29, '2000-01-01', 41, 'nie', '2023-06-07 09:57:08', '2023-06-07 09:57:08'),
(36, 1, 28, '2023-06-11', 42, 'nie', '2023-06-11 12:58:04', '2023-06-11 12:58:04'),
(37, 1, 28, '2023-06-11', 40, 'nie', '2023-06-11 12:58:17', '2023-06-11 12:58:17');

-- --------------------------------------------------------

--
-- Table structure for table `ogloszenia`
--

DROP TABLE IF EXISTS `ogloszenia`;
CREATE TABLE IF NOT EXISTS `ogloszenia` (
  `ogloszenie_id` int(11) NOT NULL AUTO_INCREMENT,
  `czlonek_id` bigint(20) DEFAULT NULL,
  `nadawca` varchar(50) NOT NULL,
  `priorytet` set('niski','wysoki','sredni') NOT NULL,
  `temat` varchar(100) NOT NULL,
  `tresc` text NOT NULL,
  `data` date DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ogloszenie_id`),
  KEY `czlonek_id` (`czlonek_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53981 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `ogloszenia`
--

INSERT INTO `ogloszenia` (`ogloszenie_id`, `czlonek_id`, `nadawca`, `priorytet`, `temat`, `tresc`, `data`, `updated_at`, `created_at`) VALUES
(3, 1, '1', 'sredni', 'Jo', 'Jo zeh nie wiedziol co klikom', '2023-06-02', '2023-06-02 13:49:58', '2023-06-02 13:49:58'),
(4, 2, '1', 'sredni', 'Jo', 'Jo zeh nie wiedziol co klikom', '2023-06-02', '2023-06-02 13:49:58', '2023-06-02 13:49:58'),
(6, 6, '1', 'sredni', 'Jo', 'Jo zeh nie wiedziol co klikom', '2023-06-02', '2023-06-02 13:49:58', '2023-06-02 13:49:58'),
(8, 1, '1', 'niski', 'da', 'adwa', '2023-06-06', '2023-06-06 11:22:58', '2023-06-06 11:22:58'),
(9, 2, '1', 'niski', 'da', 'adwa', '2023-06-06', '2023-06-06 11:22:58', '2023-06-06 11:22:58'),
(11, 6, '1', 'niski', 'da', 'adwa', '2023-06-06', '2023-06-06 11:22:58', '2023-06-06 11:22:58'),
(13, 6, '1', 'wysoki', 'xdddd', 'adwa', '2023-06-06', '2023-06-06 11:28:53', '2023-06-06 11:28:53'),
(14, 1, '1', 'wysoki', 'xdddd', 'adwa', '2023-06-06', '2023-06-06 11:28:53', '2023-06-06 11:28:53'),
(53972, 6, '1', 'wysoki', 'e', 'spisz', '2023-06-06', '2023-06-06 11:59:55', '2023-06-06 11:59:55'),
(53973, 1, '1', 'wysoki', 'e', 'spisz', '2023-06-06', '2023-06-06 11:59:55', '2023-06-06 11:59:55'),
(53976, 6, '1', 'niski', '\';\'', 'fe', '2023-06-06', '2023-06-06 12:07:38', '2023-06-06 12:07:38'),
(53977, 1, '1', 'niski', '\';\'', 'fe', '2023-06-06', '2023-06-06 12:07:38', '2023-06-06 12:07:38'),
(53978, 1, '1', 'wysoki', 'Jolka jolka', 'Czy pamiętasz ?', '2023-06-07', '2023-06-07 09:50:44', '2023-06-07 09:50:44'),
(53979, 2, '1', 'wysoki', 'Jolka jolka', 'Czy pamiętasz ?', '2023-06-07', '2023-06-07 09:50:44', '2023-06-07 09:50:44');

-- --------------------------------------------------------

--
-- Table structure for table `polowania`
--

DROP TABLE IF EXISTS `polowania`;
CREATE TABLE IF NOT EXISTS `polowania` (
  `polowanie_id` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(255) DEFAULT NULL,
  `lokalizacja` varchar(255) NOT NULL,
  `miejsce_zb` varchar(255) NOT NULL,
  `supervisor` bigint(20) NOT NULL,
  `kontakt` varchar(255) NOT NULL,
  `data_pocz` datetime NOT NULL,
  `data_koncowa` datetime NOT NULL,
  `typ` enum('indywidualne','zbiorowe','sokolnicze') NOT NULL,
  `klub_id` int(11) NOT NULL,
  `koniec` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`polowanie_id`),
  KEY `supervisor` (`supervisor`,`klub_id`),
  KEY `pol_klb` (`klub_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `polowania`
--

INSERT INTO `polowania` (`polowanie_id`, `nazwa`, `lokalizacja`, `miejsce_zb`, `supervisor`, `kontakt`, `data_pocz`, `data_koncowa`, `typ`, `klub_id`, `koniec`, `created_at`, `updated_at`) VALUES
(27, 'jelenie', 'Lima', 'nowa', 2, '11122233', '2023-05-31 13:00:49', '2023-05-31 13:03:12', 'zbiorowe', 1, 1, '2023-05-31 11:03:12', '2023-05-31 11:03:12'),
(28, 'Polowanie ja Stalina', 'Limanowa', 'Remiza', 1, '+22233322211', '2023-06-07 13:43:35', '2023-06-07 15:00:00', 'indywidualne', 1, 0, '2023-06-07 09:44:46', '2023-06-07 09:44:46'),
(29, 'Polowanie na Lenina', 'Leningrad', 'Remiza', 1, '+22211133211', '2023-06-07 13:56:10', '2023-06-07 13:58:09', 'indywidualne', 1, 1, '2023-06-07 11:58:09', '2023-06-07 11:58:09');

-- --------------------------------------------------------

--
-- Table structure for table `skladka`
--

DROP TABLE IF EXISTS `skladka`;
CREATE TABLE IF NOT EXISTS `skladka` (
  `skladka_id` int(11) NOT NULL AUTO_INCREMENT,
  `termin` datetime NOT NULL,
  `kwota` float NOT NULL,
  `czlonek_id` bigint(20) NOT NULL,
  `opis` varchar(255) NOT NULL,
  `data_zapl` datetime NOT NULL DEFAULT '0000-01-01 00:00:00',
  `status` enum('Opłacona','Nieopłacona') NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`skladka_id`),
  KEY `czlonek_id` (`czlonek_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `skladka`
--

INSERT INTO `skladka` (`skladka_id`, `termin`, `kwota`, `czlonek_id`, `opis`, `data_zapl`, `status`, `updated_at`, `created_at`) VALUES
(3, '2023-05-23 19:12:30', 950, 1, 'Okres', '2023-05-23 19:13:38', 'Nieopłacona', '2023-06-11 13:40:36', '2023-05-23 15:12:43'),
(4, '2023-05-23 19:12:30', 950, 2, 'Okres', '0000-01-01 00:00:00', 'Nieopłacona', '2023-05-23 15:12:43', '2023-05-23 15:12:43'),
(6, '2023-05-23 19:12:30', 950, 6, 'Okres', '0000-01-01 00:00:00', 'Nieopłacona', '2023-05-23 15:12:43', '2023-05-23 15:12:43'),
(10, '2023-05-23 20:20:44', 123, 2, 'asd', '0000-01-01 00:00:00', 'Nieopłacona', '2023-05-23 16:20:53', '2023-05-23 16:20:53'),
(12, '2023-05-23 20:20:44', 123, 6, 'asd', '0000-01-01 00:00:00', 'Nieopłacona', '2023-05-23 16:20:53', '2023-05-23 16:20:53'),
(15, '2023-05-23 20:27:35', 41, 1, 'Okres1', '0000-01-01 00:00:00', 'Nieopłacona', '2023-05-23 16:28:25', '2023-05-23 16:28:25'),
(16, '2023-05-23 20:27:35', 41, 2, 'Okres1', '0000-01-01 00:00:00', 'Nieopłacona', '2023-05-23 16:28:25', '2023-05-23 16:28:25'),
(18, '2023-05-23 20:27:35', 41, 6, 'Okres1', '0000-01-01 00:00:00', 'Nieopłacona', '2023-05-23 16:28:25', '2023-05-23 16:28:25'),
(21, '2023-06-02 09:37:07', 954, 1, 'Okres', '0000-01-01 00:00:00', 'Nieopłacona', '2023-06-02 05:37:54', '2023-06-02 05:37:54'),
(22, '2023-06-02 09:37:07', 954, 2, 'Okres', '0000-01-01 00:00:00', 'Nieopłacona', '2023-06-02 05:37:54', '2023-06-02 05:37:54'),
(24, '2023-06-02 09:37:07', 954, 6, 'Okres', '0000-01-01 00:00:00', 'Nieopłacona', '2023-06-02 05:37:54', '2023-06-02 05:37:54'),
(27, '2023-06-07 13:51:19', 222, 1, 'Okresowa', '2023-06-07 13:52:06', 'Opłacona', '2023-06-07 11:52:06', '2023-06-07 09:51:40'),
(28, '2023-06-07 13:51:19', 222, 2, 'Okresowa', '2023-06-07 13:52:01', 'Opłacona', '2023-06-07 11:52:01', '2023-06-07 09:51:40'),
(30, '2023-06-07 13:51:19', 222, 2, 'Okresowa', '2023-06-07 13:52:01', 'Opłacona', '2023-06-07 11:52:01', '2023-06-07 09:51:40'),
(31, '2023-06-07 13:51:19', 1000, 2, 'Okresowa', '2023-06-07 13:52:01', 'Opłacona', '2023-06-07 11:52:01', '2023-06-07 09:51:40'),
(32, '2023-06-11 15:17:45', 250, 1, 'Na koks', '0000-01-01 00:00:00', 'Nieopłacona', '2023-06-11 11:17:55', '2023-06-11 11:17:55'),
(33, '2023-06-11 15:17:45', 250, 2, 'Na koks', '0000-01-01 00:00:00', 'Nieopłacona', '2023-06-11 11:17:55', '2023-06-11 11:17:55');

--
-- Triggers `skladka`
--
DROP TRIGGER IF EXISTS `ad`;
DELIMITER $$
CREATE TRIGGER `ad` AFTER INSERT ON `skladka` FOR EACH ROW BEGIN
    DECLARE marko_value INT;
    SELECT klub_id INTO marko_value FROM users WHERE id = NEW.czlonek_id;
    UPDATE kapital SET kapital = kapital + NEW.kwota WHERE klub_id = marko_value;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `temp`
--

DROP TABLE IF EXISTS `temp`;
CREATE TABLE IF NOT EXISTS `temp` (
  `temp_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `polowanie_id` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`temp_id`),
  KEY `user_id` (`user_id`,`polowanie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `temp`
--

INSERT INTO `temp` (`temp_id`, `user_id`, `polowanie_id`, `updated_at`, `created_at`) VALUES
(2, 1, 22, '2023-05-31 08:50:23', '2023-05-31 08:50:23'),
(3, 1, 24, '2023-05-31 08:53:47', '2023-05-31 08:53:47'),
(5, 1, 25, '2023-06-06 22:48:40', '2023-06-06 22:48:40'),
(6, 1, 25, '2023-06-06 22:54:17', '2023-06-06 22:54:17'),
(7, 1, 28, '2023-06-07 09:44:52', '2023-06-07 09:44:52'),
(8, 1, 28, '2023-06-07 09:45:14', '2023-06-07 09:45:14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `legitymacja` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `klub_id` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `id` (`id`),
  KEY `klub_id` (`klub_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `legitymacja`, `email`, `email_verified_at`, `password`, `klub_id`, `created_at`, `updated_at`) VALUES
(1, 'majkel', 'majkel@gmail.com', '2023-04-11 19:51:04', '$2y$12$ygF0eE8aXGWdjDclFBNHI.0uO/PqD.BMTNoqaQhnl.9uvEqcDdmjO', 1, '2023-04-11 19:51:04', '2023-04-11 19:51:04'),
(2, 'mareczq', 'majkelel@gmail.com', '2023-04-11 19:51:04', 'zaq1@WSX', 1, '2023-04-11 19:51:04', '2023-06-06 21:06:42'),
(6, '123d12d1wDe1', 'wewewe@we.pl', NULL, 'zaq1@WSX', 0, '2023-05-04 17:47:19', '2023-05-06 19:33:11'),
(17, 'TYMBE-1112-ANVE', 'weasczwsq@wp.pl', NULL, '$2y$12$bWXODxqKRIi08.7po1ulKeI0F61l4ETK.DBYNhrKv5VLy0rcylyhi', 0, '2023-05-16 08:49:04', '2023-05-16 08:49:04');

-- --------------------------------------------------------

--
-- Table structure for table `zezwolenia`
--

DROP TABLE IF EXISTS `zezwolenia`;
CREATE TABLE IF NOT EXISTS `zezwolenia` (
  `zezwolenie_id` int(11) NOT NULL AUTO_INCREMENT,
  `organ` varchar(30) NOT NULL,
  `data_wydania` date NOT NULL,
  `typ` enum('podstawowe','selekcjonerskie','sokolnicze') NOT NULL,
  `data_wyga` date NOT NULL,
  `numer_zez` varchar(255) NOT NULL,
  `czlonek_id` bigint(20) NOT NULL,
  PRIMARY KEY (`zezwolenie_id`),
  KEY `czlonek_id` (`czlonek_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `zezwolenia`
--

INSERT INTO `zezwolenia` (`zezwolenie_id`, `organ`, `data_wydania`, `typ`, `data_wyga`, `numer_zez`, `czlonek_id`) VALUES
(1, 'Komenda Powiatowa', '2023-04-12', 'podstawowe', '2025-04-24', '2137/leg/KRK', 1);

-- --------------------------------------------------------

--
-- Table structure for table `zwierze`
--

DROP TABLE IF EXISTS `zwierze`;
CREATE TABLE IF NOT EXISTS `zwierze` (
  `zwierze_id` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(255) NOT NULL,
  `podgrupa` varchar(255) NOT NULL,
  `wielkosc` varchar(255) NOT NULL,
  `wiek` enum('brak','I','II','III') NOT NULL,
  PRIMARY KEY (`zwierze_id`),
  KEY `zwierze_id` (`zwierze_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `zwierze`
--

INSERT INTO `zwierze` (`zwierze_id`, `nazwa`, `podgrupa`, `wielkosc`, `wiek`) VALUES
(1, 'byki', 'łosie', 'gruba', 'brak'),
(2, 'klępy', 'łosie', 'gruba', 'brak'),
(3, 'łoszaki', 'łosie', 'gruba', 'brak'),
(4, 'byki', 'jelenie', 'gruba', 'I'),
(5, 'byki', 'jelenie', 'gruba', 'II'),
(6, 'byki', 'jelenie', 'gruba', 'III'),
(7, 'łanie', 'jelenie', 'gruba', 'brak'),
(8, 'cielęta', 'jelenie', 'gruba', 'brak'),
(9, 'byki', 'daniele', 'gruba', 'I'),
(10, 'byki', 'daniele', 'gruba', 'II'),
(11, 'byki', 'daniele', 'gruba', 'III'),
(12, 'łanie', 'daniele', 'gruba', 'brak'),
(13, 'cielęta', 'daniele', 'gruba', 'brak'),
(14, 'kozły', 'sarny', 'gruba', 'I'),
(15, 'kozły', 'sarny', 'gruba', 'II'),
(16, 'kozy', 'sarny', 'gruba', 'brak'),
(17, 'koźlęta', 'sarny', 'gruba', 'brak'),
(18, 'tryki', 'muflony', 'gruba', 'brak'),
(19, 'owce', 'muflony', 'gruba', 'brak'),
(20, 'jagnięta', 'muflony', 'gruba', 'brak'),
(21, 'lochy', 'dziki', 'gruba', 'brak'),
(22, 'odyńce', 'dziki', 'gruba', 'brak'),
(23, 'pozostałe', 'dziki', 'gruba', 'brak'),
(24, 'warchlaki', 'dziki', 'gruba', 'brak'),
(25, 'jenoty', 'jenoty', 'drobna', 'brak'),
(26, 'borsuki', 'borsuki', 'drobna', 'brak'),
(27, 'tumak', 'kuny', 'drobna', 'brak'),
(28, 'kamionka', 'kuny', 'drobna', 'brak'),
(29, 'amerykańskie', 'norki', 'drobna', 'brak'),
(30, 'zwyczajne', 'tchórze', 'drobna', 'brak'),
(31, 'pracze', 'szopy', 'drobna', 'brak'),
(32, 'piżmaki', 'piżmaki', 'drobna', 'brak'),
(33, 'szaraki', 'zające', 'drobna', 'brak'),
(34, 'dzikie', 'króliki', 'drobna', 'brak'),
(35, 'jarząbki', 'jarząbki', 'drobna', 'brak'),
(36, 'bażanty', 'bażanty', 'drobna', 'brak'),
(37, 'kuropatwy', 'kuropatwy', 'drobna', 'brak'),
(38, 'gęgawy', 'gęsi', 'drobna', 'brak'),
(39, 'zbożowe', 'gęsi', 'drobna', 'brak'),
(40, 'białoczelne', 'gęsi', 'drobna', 'brak'),
(41, 'krzyżówki', 'kaczki', 'drobna', 'brak'),
(42, 'cyraneczki', 'kaczki', 'drobna', 'brak'),
(43, 'głowienki', 'kaczki', 'drobna', 'brak'),
(44, 'czernice', 'kaczki', 'drobna', 'brak'),
(45, 'grzywacze', 'gołębie', 'drobna', 'brak'),
(46, 'słonki', 'słonki', 'drobna', 'brak'),
(47, 'łyski', 'łyski', 'drobna', 'brak');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dane`
--
ALTER TABLE `dane`
  ADD CONSTRAINT `dan_usr` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ewidencja`
--
ALTER TABLE `ewidencja`
  ADD CONSTRAINT `ewidencja_ibfk_1` FOREIGN KEY (`zwierze_id`) REFERENCES `zwierze` (`zwierze_id`);

--
-- Constraints for table `odstrzal`
--
ALTER TABLE `odstrzal`
  ADD CONSTRAINT `odstrzal_ibfk_1` FOREIGN KEY (`zwierze_id`) REFERENCES `zwierze` (`zwierze_id`);

--
-- Constraints for table `ogloszenia`
--
ALTER TABLE `ogloszenia`
  ADD CONSTRAINT `ogl_usr` FOREIGN KEY (`czlonek_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `polowania`
--
ALTER TABLE `polowania`
  ADD CONSTRAINT `pol_klb` FOREIGN KEY (`klub_id`) REFERENCES `klub` (`klub_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pol_usr` FOREIGN KEY (`supervisor`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `skladka`
--
ALTER TABLE `skladka`
  ADD CONSTRAINT `sk_usr` FOREIGN KEY (`czlonek_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `temp`
--
ALTER TABLE `temp`
  ADD CONSTRAINT `temp_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`klub_id`) REFERENCES `klub` (`klub_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `zezwolenia`
--
ALTER TABLE `zezwolenia`
  ADD CONSTRAINT `zezwolenia_ibfk_1` FOREIGN KEY (`czlonek_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
