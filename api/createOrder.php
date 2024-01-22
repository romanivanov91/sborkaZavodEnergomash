<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$db_host='localhost'; // ваш хост
$db_name='sborkazavodenergomash'; // ваша бд
$db_user='root'; // пользователь бд
$db_pass=''; // пароль к бд
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);// включаем сообщения об ошибках
$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name); // коннект с сервером бд
$mysqli->set_charset("utf8mb4"); // задаем кодировку

if (!$mysqli)
{
    echo json_encode (mysqli_connect_error());
};

// Получаем данные
$data = json_decode(file_get_contents("php://input"));

$maxNumOrderYear = $mysqli->query('SELECT max(№) FROM sborka where YEAR = .$data->year'); // запрос самого последнего номера заказа

echo json_encode($maxNumOrderYear);


// $zaprosSQL = `
//     INSERT INTO sborka2020 ()
//     VALUES ()
// `;

// $createOrder = $mysqli->query('INSERT INTO `sborka2020` VALUES ('); // создание записи заказа 


// if ($resultOrder2020->num_rows > 0){
//     $arrOrder2020 = array();
//     $arrProduct2020 = array();
//     foreach($resultOrder2020 as $row){
//         array_push($arrOrder2020, $row);
//     };
//     foreach ($resultProduct2020 as $row) {
//         array_push($arrProduct2020, $row);
//     };
//     foreach ($arrOrder2020 as $key=>$row) {
//         $products = array();
//         foreach ($arrProduct2020 as $i => $val) {
//             if ($row['ID'] == $val['ID_Order']) {
//                 $products[] = $val;
//             }
//         }
//         $row += ['products' => $products];
//         $arrOrder2020[$key] = $row;
//     };
//     echo json_encode($arrOrder2020);
// } else {
//     echo json_encode ("0 results order 2020");
// };


$mysqli->close();

?>