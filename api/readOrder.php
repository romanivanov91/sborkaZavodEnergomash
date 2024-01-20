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

$resultOrder = $db->prepare('SELECT * FROM `sborka` WHERE YEAR='.$data->year); // запрос на выборку заказов по году
$resultOrder->execute();
$resultOrderArray = $resultOrder->fetchAll(PDO::FETCH_ASSOC);
$resultProduct = $db->prepare('SELECT p.* from product as p JOIN sborka as s on p.ID_Order=s.ID where s.YEAR =' .$data->year); // запрос на выборку изделий по году
$resultProduct->execute();
$resultProductArray = $resultProduct->fetchAll(PDO::FETCH_ASSOC);

//echo json_encode($resultProduct2020Array);

if (!empty($resultOrderArray)){
    // $arrOrder2020 = array();
    // $arrProduct2020 = array();
    // foreach($resultOrder2020 as $row){
    //     array_push($arrOrder2020, $row);
    // };
    // foreach ($resultProduct2020 as $row) {
    //     array_push($arrProduct2020, $row);
    // };
    foreach ($resultOrderArray as $key=>$row) {
        $products = array();
        foreach ($resultProductArray as $i => $val) {
            if ($row['ID'] == $val['ID_Order']) {
                $products[] = $val;
            }
        }
        $row += ['products' => $products];
        $resultOrderArray[$key] = $row;
    };
    echo json_encode($resultOrderArray);
} else {
    echo json_encode ("0 results order 2020");
};


//$mysqli->close();

?>