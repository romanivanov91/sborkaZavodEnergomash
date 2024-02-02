<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// Файлы необходимые для соединения с БД
include_once "./Config/Database.php";

// Получаем соединение с базой данных
$database = new Database();
$db = $database->getConnection();

// Получаем данные
$data = json_decode(file_get_contents("php://input"));


// $sth = $db->prepare("SELECT * FROM `category` WHERE `id` = :id");
// $sth->execute(array('id' => '21'));
// $array = $sth->fetch(PDO::FETCH_ASSOC);
// print_r($array);

$resultUsers = $db->prepare("SELECT ID, CONCAT(firstname, ' ', lastname, ' ', patronymic) AS 'FIO' FROM `users` WHERE 1"); // запрос на выборку пользователей
$resultUsers->execute();
$resultUsersArray = $resultUsers->fetchAll(PDO::FETCH_ASSOC);

//echo json_encode($resultProduct2020Array);

if (!empty($resultUsersArray)){
    echo json_encode($resultUsersArray);
} else {
    echo json_encode ("0 results users");
};


//$mysqli->close();

?>