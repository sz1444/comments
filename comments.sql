-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 15 Gru 2018, 15:26
-- Wersja serwera: 10.1.37-MariaDB
-- Wersja PHP: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `comments`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `comment` text COLLATE utf8_polish_ci NOT NULL,
  `author` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rating` int(11) NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `comments`
--

INSERT INTO `comments` (`id`, `title`, `comment`, `author`, `date`, `rating`, `idUser`) VALUES
(95, '', 'JakieÅ› komentarz!', '', '2018-12-15 15:12:20', 1, 12),
(98, '', 'zmiana koma', '', '2018-12-15 15:12:26', 1, 12);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `datauser`
--

CREATE TABLE `datauser` (
  `idUser` int(11) NOT NULL,
  `login` text COLLATE utf8_polish_ci NOT NULL,
  `password` text COLLATE utf8_polish_ci NOT NULL,
  `email` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `datauser`
--

INSERT INTO `datauser` (`idUser`, `login`, `password`, `email`) VALUES
(12, 'zxcvbnm', '709751297f909732e60a6229070145e55e800551', 'zxcvbnm@wp.pl');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `love`
--

CREATE TABLE `love` (
  `idLike` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `love`
--

INSERT INTO `love` (`idLike`, `idUser`, `id`) VALUES
(153, 12, 95),
(155, 12, 98);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeksy dla tabeli `datauser`
--
ALTER TABLE `datauser`
  ADD PRIMARY KEY (`idUser`);

--
-- Indeksy dla tabeli `love`
--
ALTER TABLE `love`
  ADD PRIMARY KEY (`idLike`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT dla tabeli `datauser`
--
ALTER TABLE `datauser`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT dla tabeli `love`
--
ALTER TABLE `love`
  MODIFY `idLike` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
