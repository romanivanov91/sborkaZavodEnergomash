<?php

// Используем для подключения к базе данных MySQL
class Database
{
    // Учётные данные базы данных
    private $host = "localhost";
    private $db_name = "sborkazavodenergomash";
    private $username = "root";
    private $password = "";
    public $conn;

    // Получаем соединение с базой данных
    public function getConnection()
    {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        } catch (PDOException $exception) {
            echo "Ошибка соединения с БД: " . $exception->getMessage();
        }

        return $this->conn;
    }

    public function createDateBase()
    {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host , $this->username, $this->password);
            $sqlCreateDb = 'CREATE DATABASE `sborkazavodenergomash`';
            $this->conn->exec($sqlCreateDb);
            $sqlCreateTable = '
                USE `sborkazavodenergomash`;
                CREATE TABLE `users` (
                    `id` int(11) NOT NULL,
                    `firstname` varchar(256) NOT NULL,
                    `lastname` varchar(256) NOT NULL,
                    `patronymic` varchar(256) NOT NULL,
                    `position` varchar(256) NOT NULL,
                    `email` varchar(256) NOT NULL,
                    `password` varchar(2048) NOT NULL,
                    `created` datetime NOT NULL DEFAULT current_timestamp(),
                    `modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                    `tempPass` bit
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
            ';
            $this->conn->exec($sqlCreateTable);
            echo ("База данных создана");
        } catch (PDOException $exception) {
            echo "База данных не создана: " . $exception->getMessage();
        }
        return $this->conn;
    }
}