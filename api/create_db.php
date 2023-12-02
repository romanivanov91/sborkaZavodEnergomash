<?php

// Подключение к БД
// Файлы, необходимые для подключения к базе данных
include_once "./Config/Database.php";

// Получаем соединение с базой данных
$database = new Database();
$db = $database->getConnection();

if ($db) {
    echo json_encode ("База данных уже существует!");
} else {
    // запрос на создание базы данных sborkazavodenergomash с таблицей user
    $createDb = $database->createDateBase();
    if ($createDb) {
        echo json_encode ("База данных создана!");
    } else {
        echo json_encode ("Ошибка создания базы данных!");
    }
    
}
