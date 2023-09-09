<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$postData = json_decode(file_get_contents('php://input'));

echo json_encode ($postData);

?>