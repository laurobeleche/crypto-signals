-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: criptoalpha.com
-- Tempo de geração: 04-Maio-2023 às 22:01
-- Versão do servidor: 5.7.23-23
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `femmed39_criptoalpha`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telegram` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `apikey` varchar(256) NOT NULL,
  `secret` varchar(256) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hash` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `nome`, `email`, `senha`, `telegram`, `admin`, `apikey`, `secret`, `updated_at`, `created_at`, `hash`, `status`) VALUES
(2, 'Lauro', 'laurobeleche@gmail.com', '$2y$10$OW2DEkMdjBFkYa3QAyBnGuALGliNiifPPw4Xdvduzy95ay/MVpY6e', '', 0, 'PvqSzvPrPMzeBcRSPT', 'rzkd8hvLv8nvF9JQjgyCiZQ0H6djGs1XTeqw', '2023-05-04 19:46:38', '2023-04-15 13:52:41', '', 0),
(3, 'Lauro', 'laurolmb@hotmail.com', '$2y$10$kcnNiUfPeUPwZiiUrhHwWO7ZNWTZncchn07J9uDx4jEZIIp88UOhO', '', 0, '', '', '2023-05-02 19:27:17', '2023-05-02 19:27:17', '', 0),
(4, 'Mayko Rei', 'maykorj@hotmail.com', '$2y$10$3Vihy8ebokh7CsVlmncoQOWs8nvknMCR3Eqz8WPi33rM0aLDyWGDW', '', 0, 'Y4IKLNEX9E1f6FnbJm', 'Ao1ye6sRi0jsdby9YABSq6ePw3KHTc10fc68', '2023-05-02 19:55:53', '2023-05-02 19:48:03', '', 0),
(5, 'Kauã ', 'icloudmoura@gmail.com', '$2y$10$FoMr.ESXQGrStCNuTVo6ButX2HiPWvnjto/ZFST8ogJEIM8Qs.68a', '', 0, '', '', '2023-05-02 20:55:03', '2023-05-02 20:55:03', '', 0),
(6, 'XeXa', 'XeXa.godoy@protonmail.ch', '$2y$10$FseGUeiAP6t3gkmqW3kvLusdfZ4V89Y3CQbsuT138teixRrAj8NzK', '', 0, '', '', '2023-05-03 17:22:57', '2023-05-03 17:22:57', '', 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
