-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Окт 04 2023 г., 07:56
-- Версия сервера: 10.4.28-MariaDB
-- Версия PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `sborkazavodenergomash`
--

-- --------------------------------------------------------

--
-- Структура таблицы `product2020`
--

CREATE TABLE `product2020` (
  `ID` int(11) NOT NULL,
  `ID_Order` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `ingener` varchar(255) DEFAULT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `installationOfCabinets` varchar(255) DEFAULT NULL,
  `brigade` varchar(255) DEFAULT NULL,
  `shipment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `product2020`
--

INSERT INTO `product2020` (`ID`, `ID_Order`, `name`, `quantity`, `ingener`, `supplier`, `installationOfCabinets`, `brigade`, `shipment`) VALUES
(1, 1, 'ГРЩ', 10, 'Иванов Р.', 'Регина', NULL, NULL, NULL),
(2, 2, 'КТП', 5, 'Моисеев', 'Троф', NULL, NULL, NULL),
(3, 1, 'ЩО', 10, NULL, NULL, NULL, NULL, NULL),
(4, 1, 'ЩР', 5, NULL, NULL, NULL, NULL, NULL),
(5, 2, 'ШУЭ', 3, NULL, NULL, NULL, NULL, NULL),
(6, 2, 'Я5111-4074', 2, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `sborka2020`
--

CREATE TABLE `sborka2020` (
  `ID` int(11) NOT NULL,
  `YEAR` int(11) NOT NULL,
  `№` int(11) NOT NULL,
  `customer` varchar(255) NOT NULL,
  `launchDate` date NOT NULL,
  `dateOfShipment` date NOT NULL,
  `responsibleManager` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `sborka2020`
--

INSERT INTO `sborka2020` (`ID`, `YEAR`, `№`, `customer`, `launchDate`, `dateOfShipment`, `responsibleManager`) VALUES
(1, 2020, 1, 'Энергомаш', '2023-07-02', '2023-07-05', 'Иванов А'),
(2, 2020, 2, 'ЭнергоАлянс', '2023-07-02', '2023-07-05', 'Артемьева');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(256) NOT NULL,
  `lastname` varchar(256) NOT NULL,
  `patronymic` varchar(256) NOT NULL,
  `position` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(2048) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `patronymic`, `position`, `email`, `password`, `created`, `modified`) VALUES
(4, 'Иванов', 'Роман', 'Евгеньевич', 'Инженер', 'romanivanov91@yandex.ru', '$2y$10$HicanhztfRjDODM176bpgOXrjhYADcGFU27iidwv1gGZIZ2kXebS.', '2023-09-05 13:18:19', '2023-09-30 03:35:29'),
(5, 'Александров', 'Олег', 'Арсентьевич', 'слесарь', 'slesar@ya.ru', '$2y$10$6TeoFtYtnVFvUxg3zzpCGudnT2ciS8JePXQDkva1GQN4tNQ90ljMm', '2023-09-05 13:21:20', '2023-09-05 10:21:20'),
(6, 'Блинов', 'Блин', 'Блинович', 'Блин', 'blin@bl.bl', '$2y$10$.GNqI/UR8z.e725e6.vL2uS4BfbWoGUdCh6pKcxu8WmyXPnW9wlNK', '2023-09-05 13:32:24', '2023-09-05 10:32:24'),
(7, 'Барсиков', 'Барсик', 'Барсикович', 'ацуацацау', 'vervesdv@gtrgrtg', '$2y$10$DMHWcJav3Insi5D07xwUP.7uoWsKAfr5YItRMEus0Jo6eplVNrHgK', '2023-09-05 13:37:13', '2023-09-05 10:37:13'),
(8, 'hrthrt', 'htrhrth', 'hrthtrh', 'hrtrth', 'trhtrh@grtgt', '$2y$10$K7X5mE/xVNkGFzq4.QPtHuRxEHYT9AOIThI8FoOW/5uGbfr18J3uy', '2023-09-05 13:43:15', '2023-09-05 10:43:15'),
(9, 'Иванов', 'Константин', 'Анатольевич', 'Спец', 'kostin@ya.ru', '$2y$10$elInL/nvbDN8LWbu5EuJmuKn6x3/qa1eA.HD04JFD9uA.pgU21BVq', '2023-09-05 14:03:06', '2023-09-05 11:03:06'),
(10, 'Кординалов', 'Кординал', 'Кординалович', 'акупукп', 'rgerg@fvrgher.ru', '$2y$10$2CxRTAR.A0u9iLg0ZYzXOen6fO/QMEUx7HPiTvYJ0LvqbHeQDhbi6', '2023-09-05 14:06:26', '2023-09-05 11:06:26'),
(11, 'gergregerg', 'regerge', 'ergreger', 'regregre', 'romanivanov91@yandex.ru', '$2y$10$rcW1CBAMcRCKoof33UPUl.4IfMHkutui39x0fFFh7tmzamBEC1Mx6', '2023-09-05 14:23:12', '2023-09-05 11:23:12'),
(12, 'tyjtyj', 'jtyjtyjtyj', 'tyjtyj', 'fefwffe', 'romanivanov91@yandex.r', '$2y$10$UcikhwZN10mHXLgXDIEaLucddWuXxl/6pcqOfo2AScGoukRFCM07K', '2023-09-05 14:24:00', '2023-09-05 11:24:00'),
(13, 'Иванов', 'Роман', '', '', 'romanivanov91@yandex.ru', '$2y$10$37v8s9eDqHGxAsQjMwufZeFoOdKqFY4B5OWL4vZjgJit3e1O.r4sC', '2023-09-05 14:24:30', '2023-09-05 11:24:30'),
(14, 'ркеркер', 'кркеркр', 'керкерке', 'керкер', 'gergerg@rthgrth', '$2y$10$Ffx182hOAdUolnBpojqI2OA/.v5uAJpR5zfE6BheoCI77LxiaEdJ6', '2023-09-06 13:04:55', '2023-09-06 10:04:55'),
(15, 'Капитонов', 'Капитон', 'Капитонович', 'Капитошка', 'kapitom@yandex.ru', '$2y$10$I6lw7B2QBtF3BveBJd.qaeAorXz0AdqP3WYvRMcexvJn.C79f0YXW', '2023-09-06 13:10:28', '2023-09-06 10:10:28'),
(16, 'Кентов', 'Инокентий', 'Кентович', 'кент', 'kent@yandex.ru', '$2y$10$HOLNhXBpIZMIi6UDoW8/Ke1e76yl0c2c6zsVFOwK8JvUUzO.kjC6S', '2023-09-23 07:04:51', '2023-09-23 04:04:51'),
(17, 'Кентавров', 'Кентавр123', 'Кентаврович', 'Кентарол', 'kentavr@yandex.ru', '$2y$10$sr/EFJW6WUPvaXYPla4LaOqhdQb2SVzwKhrWQrpXXnZ1Uy5k4ezTa', '2023-09-23 07:14:46', '2023-09-23 11:56:30');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `product2020`
--
ALTER TABLE `product2020`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_product2020_ID_sborka2020` (`ID_Order`);

--
-- Индексы таблицы `sborka2020`
--
ALTER TABLE `sborka2020`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `product2020`
--
ALTER TABLE `product2020`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `sborka2020`
--
ALTER TABLE `sborka2020`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `product2020`
--
ALTER TABLE `product2020`
  ADD CONSTRAINT `FK_product2020_ID_sborka2020` FOREIGN KEY (`ID_Order`) REFERENCES `sborka2020` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
