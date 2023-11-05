<?php

// Заголовки
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// Файлы необходимые для соединения с БД
include_once "./Config/Database.php";
include_once "./Objects/User.php";
 
// Получаем соединение с базой данных
$database = new Database();
$db = $database->getConnection();
 
// Создание объекта "User"
$user = new User($db);
 
// Получаем данные
$data = json_decode(file_get_contents("php://input"));
 
// Устанавливаем значения
$user->email = $data->email;
$email_exists = $user->emailExists();
 
// Подключение файлов JWT
include_once "config/core.php";
include_once "libs/php-jwt/src/BeforeValidException.php";
include_once "libs/php-jwt/src/ExpiredException.php";
include_once "libs/php-jwt/src/SignatureInvalidException.php";
include_once "libs/php-jwt/src/JWT.php";
use \Firebase\JWT\JWT;

//Функция для генерации рандомного временного пароля
function randomPassword() {
    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 8; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}
 
// Существует ли электронная почта в базе данных
if ($email_exists) {
 
    //Генерируем новый пароль
    $new_pass = randomPassword();
 
    // Код ответа
    http_response_code(200);
 
    // Создание jwt
    //$jwt = JWT::encode($token, $key, 'HS256');
    echo json_encode(
        array(
            "Ваш новый пароль" => $new_pass
        )
    );
}
 
// Если электронная почта не существует,
// Сообщим пользователю, что пользователь не найден
else {
 
  // Код ответа
  http_response_code(401);

  // Скажем пользователю что войти не удалось
  echo json_encode(array("message" => "Пользователь не найден"));
}
?>