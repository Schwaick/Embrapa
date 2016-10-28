<?php 
require 'config.php';

config::setHeaders();

$conn = config::getConn();

$stmt = $conn->prepare(
    'SELECT * FROM topicos'
);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result,JSON_NUMERIC_CHECK);
?>