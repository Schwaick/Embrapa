
-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tempo de Geração: 27/10/2016 às 03:13:07
-- Versão do Servidor: 10.0.25-MariaDB-wsrep
-- Versão do PHP: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de Dados: `banco`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `codigos`
--

CREATE TABLE IF NOT EXISTS `codigos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` int(10) unsigned NOT NULL,
  `codigo` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `perguntas`
--

CREATE TABLE IF NOT EXISTS `perguntas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` int(10) unsigned NOT NULL,
  `subtopico_id` int(10) unsigned NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `descricao` text NOT NULL,
  `anexo` blob,
  `resposta_id` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `subtopico_id` (`subtopico_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=25 ;



-- --------------------------------------------------------

--
-- Estrutura da tabela `respostas`
--

CREATE TABLE IF NOT EXISTS `respostas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pergunta_id` int(10) unsigned NOT NULL,
  `usuario_id` int(10) unsigned NOT NULL,
  `resposta` text NOT NULL,
  `relevancia` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `pergunta_id` (`pergunta_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;


-- --------------------------------------------------------

--
-- Estrutura da tabela `subtopicos`
--

CREATE TABLE IF NOT EXISTS `subtopicos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `topico_id` int(10) unsigned NOT NULL,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `topico_id` (`topico_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=24 ;

--
-- Extraindo dados da tabela `subtopicos`
--

INSERT INTO `subtopicos` (`id`, `topico_id`, `nome`) VALUES
(1, 1, 'Pragas'),
(2, 1, 'Inseticidas'),
(3, 1, 'Plantio'),
(4, 1, 'Clima'),
(5, 1, 'Preços'),
(6, 1, 'Outro'),
(7, 2, 'Pragas'),
(8, 2, 'Inseticidas'),
(9, 2, 'Clima'),
(10, 2, 'Preços'),
(11, 2, 'Outro'),
(12, 3, 'Pragas'),
(13, 3, 'Clima'),
(14, 3, 'Preços'),
(15, 3, 'Outro'),
(16, 4, 'Pragas'),
(17, 4, 'Inseticidas'),
(18, 4, 'Clima'),
(19, 4, 'Preços'),
(20, 4, 'Outro'),
(21, 5, 'Clima'),
(22, 5, 'Preços'),
(23, 5, 'Outro');

-- --------------------------------------------------------

--
-- Estrutura da tabela `topicos`
--

CREATE TABLE IF NOT EXISTS `topicos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Extraindo dados da tabela `topicos`
--

INSERT INTO `topicos` (`id`, `nome`) VALUES
(1, 'Soja'),
(2, 'Algodão'),
(3, 'Feijão'),
(4, 'Arroz'),
(5, 'Batata');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `resumo_profissional` text NOT NULL,
  `imagem` blob,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=22 ;


-- --------------------------------------------------------

--
-- Estrutura da tabela `votos`
--

CREATE TABLE IF NOT EXISTS `votos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` int(10) unsigned NOT NULL,
  `resposta_id` int(10) unsigned NOT NULL,
  `tipo` char(1) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;


--
-- Restrições para as tabelas dumpadas
--

--
-- Restrições para a tabela `codigos`
--
ALTER TABLE `codigos`
  ADD CONSTRAINT `codigos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Restrições para a tabela `perguntas`
--
ALTER TABLE `perguntas`
  ADD CONSTRAINT `perguntas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `perguntas_ibfk_2` FOREIGN KEY (`subtopico_id`) REFERENCES `subtopicos` (`id`),
  ADD CONSTRAINT `perguntas_ibfk_3` FOREIGN KEY (`subtopico_id`) REFERENCES `subtopicos` (`id`);

--
-- Restrições para a tabela `respostas`
--
ALTER TABLE `respostas`
  ADD CONSTRAINT `respostas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `respostas_ibfk_2` FOREIGN KEY (`pergunta_id`) REFERENCES `perguntas` (`id`);

--
-- Restrições para a tabela `subtopicos`
--
ALTER TABLE `subtopicos`
  ADD CONSTRAINT `subtopicos_ibfk_1` FOREIGN KEY (`topico_id`) REFERENCES `topicos` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
