-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 11-Jul-2018 às 09:31
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
-- Estrutura da tabela `sf_usuario_admin`
--

CREATE TABLE `sf_usuario_admin` (
  `IDAdm` int(11) NOT NULL,
  `telefone` varchar(25) COLLATE latin1_general_ci NOT NULL,
  `cargo` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `subnivel` int(2) NOT NULL,
  `somente_slns` int(2) DEFAULT '0',
  `acessaConteudo` int(1) NOT NULL DEFAULT '1',
  `acessaSlideshow` int(1) NOT NULL DEFAULT '1',
  `acessaGaleriaImagens` int(1) NOT NULL DEFAULT '1',
  `acessaGaleriaVideos` int(1) NOT NULL DEFAULT '1',
  `acessaPodcast` int(1) NOT NULL DEFAULT '1',
  `acessaCalendario` int(1) NOT NULL DEFAULT '1',
  `acessaEmailMkt` int(1) NOT NULL DEFAULT '1',
  `acessaSeo` int(1) NOT NULL DEFAULT '1',
  `acessaTags` int(1) NOT NULL DEFAULT '1',
  `acessaEmpresas` int(1) NOT NULL DEFAULT '1',
  `acessaFranquias` int(1) NOT NULL DEFAULT '1',
  `acessaPontos` int(1) NOT NULL DEFAULT '1',
  `acessaUsuarios` int(1) NOT NULL DEFAULT '1',
  `acessaClassificados` int(1) NOT NULL DEFAULT '1',
  `acessaLoja` int(1) NOT NULL DEFAULT '1',
  `acessaLiberarCadastros` int(1) NOT NULL DEFAULT '1',
  `acessaBanners` int(1) NOT NULL DEFAULT '1',
  `acessaExportar` int(1) NOT NULL DEFAULT '1',
  `acessaEstatisticas` int(1) NOT NULL DEFAULT '1',
  `acessaSegmentos` int(1) NOT NULL DEFAULT '1',
  `acessaTextosEstaticos` int(1) NOT NULL DEFAULT '1',
  `acessaLeads` int(1) NOT NULL DEFAULT '1',
  `acessaConfiguracoesPortal` int(1) NOT NULL DEFAULT '1',
  `acessaSac` int(1) NOT NULL DEFAULT '1',
  `acessaTv` int(1) NOT NULL DEFAULT '1',
  `acessaMinutoConhecimento` int(1) NOT NULL DEFAULT '0',
  `acessaJornal` int(1) NOT NULL DEFAULT '0',
  `acessaExpansoft` int(1) NOT NULL DEFAULT '0',
  `acessoInfoMoney` int(1) NOT NULL DEFAULT '0',
  `dataAlteracaoSenha` date DEFAULT NULL,
  `acessaDashboard` int(1) NOT NULL DEFAULT '0',
  `acessaLiberaShopping` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Extraindo dados da tabela `sf_usuario_admin`
--

INSERT INTO `sf_usuario_admin` (`IDAdm`, `telefone`, `cargo`, `subnivel`, `somente_slns`, `acessaConteudo`, `acessaSlideshow`, `acessaGaleriaImagens`, `acessaGaleriaVideos`, `acessaPodcast`, `acessaCalendario`, `acessaEmailMkt`, `acessaSeo`, `acessaTags`, `acessaEmpresas`, `acessaFranquias`, `acessaPontos`, `acessaUsuarios`, `acessaClassificados`, `acessaLoja`, `acessaLiberarCadastros`, `acessaBanners`, `acessaExportar`, `acessaEstatisticas`, `acessaSegmentos`, `acessaTextosEstaticos`, `acessaLeads`, `acessaConfiguracoesPortal`, `acessaSac`, `acessaTv`, `acessaMinutoConhecimento`, `acessaJornal`, `acessaExpansoft`, `acessoInfoMoney`, `dataAlteracaoSenha`, `acessaDashboard`, `acessaLiberaShopping`) VALUES
(2017, '', '', 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, '2017-01-01', 0, 0),
(2340, '', '', 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, '2017-01-01', 1, 0),
(3413, '', '', 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, NULL, 0, 0),
(3553, '+55 (11) 1111-1111', 'Administrador', 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, '2017-07-26', 1, 1),
(3652, '', '', 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, '2017-01-01', 0, 0),
(3712, '', '', 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, '2017-01-01', 0, 0),
(3713, '', '', 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, '2017-01-01', 0, 0),
(3830, '', '', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, '2017-01-01', 0, 0),
(3982, '', '', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, '2017-01-01', 0, 0),
(4031, '', '', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2017-07-25', 0, 0),
(4308, '', '', 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, '2017-01-01', 0, 0),
(4397, '', '', 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, NULL, 0, 0),
(4528, '', '', 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, '2017-01-01', 0, 0),
(4899, '', '', 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, '2017-08-22', 0, 0),
(5032, '', '', 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2017-08-17', 0, 0),
(5033, '', '', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2017-01-01', 0, 0),
(5101, '', '', 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '0000-00-00', 1, 1),
(5197, '', '', 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2017-10-09', 1, 1),
(5242, '', '', 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, '2017-10-10', 1, 1),
(5243, '', '', 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, '2017-10-10', 1, 1),
(5244, '(11) 43454-3545', 'Programador', 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 0, 0),
(5246, '(11) 34343-4343', 'Programador', 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, NULL, 0, 0),
(5248, '(11) 65656-6565', 'programador', 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, NULL, 0, 1),
(5256, '113423434324', 'testador', 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, NULL, 0, 0),
(5297, '', '', 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, NULL, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sf_usuario_admin`
--
ALTER TABLE `sf_usuario_admin`
  ADD PRIMARY KEY (`IDAdm`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sf_usuario_admin`
--
ALTER TABLE `sf_usuario_admin`
  MODIFY `IDAdm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5298;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `sf_usuario_admin`
--
ALTER TABLE `sf_usuario_admin`
  ADD CONSTRAINT `FK_admin_usuario` FOREIGN KEY (`IDAdm`) REFERENCES `sf_usuario` (`IDUser`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
