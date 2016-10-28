<?php 
require 'config.php';

config::setHeaders();

$params = json_decode(file_get_contents('php://input'),true);

$conn = config::getConn();

$stmt = $conn->prepare(
    'SELECT * FROM subtopicos WHERE topico_id = :topicoid'
);

$stmt->bindValue(':topicoid', $params['topicoid']);
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result,JSON_NUMERIC_CHECK);
?>