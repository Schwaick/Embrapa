<?php 
require 'config.php';

config::setHeaders();

$params = json_decode(file_get_contents('php://input'),true);

$conn = config::getConn();

$stmt = $conn->prepare(
    'INSERT INTO codigos (usuario_id, codigo) VALUES (:usuarioid,:codigo)'
);

$stmt->bindValue(':usuarioid', $params['usuarioid']);
$stmt->bindValue(':codigo', $params['codigo']);
$stmt->execute();
?>