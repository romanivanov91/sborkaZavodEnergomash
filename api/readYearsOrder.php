<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// Файлы необходимые для соединения с БД
include_once "./Config/Database.php";

// Получаем соединение с базой данных
$database = new Database();
$db = $database->getConnection();

$resultYearsOrder = $db->prepare('SELECT DISTINCT `YEAR` FROM `sborka` WHERE 1 ORDER BY `YEAR`'); // запрос на выборку годов заказов
$resultYearsOrder->execute();
$resultYearsOrderArray = $resultYearsOrder->fetchAll(PDO::FETCH_ASSOC);

//echo json_encode($resultProduct2020Array);

if (!empty($resultYearsOrderArray)){
    $years = array();
    foreach ($resultYearsOrderArray as $key=>$row) {
        $years[] = $row['YEAR'];
    }
    echo json_encode($years);
} else {
    echo json_encode ("0 years");
};

?>