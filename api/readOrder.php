<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// Файлы необходимые для соединения с БД
include_once "./Config/Database.php";

// Получаем соединение с базой данных
$database = new Database();
$db = $database->getConnection();

// $sth = $db->prepare("SELECT * FROM `category` WHERE `id` = :id");
// $sth->execute(array('id' => '21'));
// $array = $sth->fetch(PDO::FETCH_ASSOC);
// print_r($array);

$resultOrder2020 = $db->prepare('SELECT * FROM `sborka2020` WHERE 1'); // запрос на выборку заказов
$resultOrder2020->execute();
$resultOrder2020Array = $resultOrder2020->fetchAll(PDO::FETCH_ASSOC);
$resultProduct2020 = $db->prepare('SELECT * FROM `product2020` WHERE 1'); // запрос на выборку изделий
$resultProduct2020->execute();
$resultProduct2020Array = $resultProduct2020->fetchAll(PDO::FETCH_ASSOC);

//echo json_encode($resultProduct2020Array);

if (!empty($resultOrder2020Array)){
    // $arrOrder2020 = array();
    // $arrProduct2020 = array();
    // foreach($resultOrder2020 as $row){
    //     array_push($arrOrder2020, $row);
    // };
    // foreach ($resultProduct2020 as $row) {
    //     array_push($arrProduct2020, $row);
    // };
    foreach ($resultOrder2020Array as $key=>$row) {
        $products = array();
        foreach ($resultProduct2020Array as $i => $val) {
            if ($row['ID'] == $val['ID_Order']) {
                $products[] = $val;
            }
        }
        $row += ['products' => $products];
        $resultOrder2020Array[$key] = $row;
    };
    echo json_encode($resultOrder2020Array);
} else {
    echo json_encode ("0 results order 2020");
};


//$mysqli->close();

?>