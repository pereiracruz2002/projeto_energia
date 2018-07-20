-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 18-Jul-2018 às 17:28
-- Versão do servidor: 5.7.21-0ubuntu0.16.04.1
-- PHP Version: 7.0.28-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sua_franquia`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `sf_arquivos_downloads`
--

CREATE TABLE `sf_arquivos_downloads` (
  `arquivos_downloads_id` int(11) NOT NULL,
  `data` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `nome` varchar(255) NOT NULL,
  `arquivo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `sf_arquivos_downloads`
--

INSERT INTO `sf_arquivos_downloads` (`arquivos_downloads_id`, `data`, `nome`, `arquivo`) VALUES
(8, '2017-11-06 12:56:54', 'Manual', 'views/sources/arquivos/320bc2c9131d0d50002615e89c90cdf1.docx'),
(10, '2017-11-06 13:36:39', 'teste', 'views/sources/arquivos/9dc9a093623bf348b741c259f459e832.jpg'),
(11, '2017-11-21 13:09:23', 'Arquivo novíssimo', 'views/sources/arquivos/0d495d17252c45a0ab193b65e191b7ab.png'),
(12, '2017-11-22 12:59:50', 'Mais um arquivo', 'views/sources/arquivos/76b64eea84e7a119ffdc473ea864c38c.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sf_arquivos_downloads`
--
ALTER TABLE `sf_arquivos_downloads`
  ADD PRIMARY KEY (`arquivos_downloads_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sf_arquivos_downloads`
--
ALTER TABLE `sf_arquivos_downloads`
  MODIFY `arquivos_downloads_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
