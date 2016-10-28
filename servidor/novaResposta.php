<?php 
require 'config.php';

config::setHeaders();

$params = json_decode(file_get_contents('php://input'),true);

$conn = config::getConn();

$stmt = $conn->prepare(
    'INSERT INTO respostas (pergunta_id, usuario_id, resposta) 
    VALUES (:perguntaid,:usuarioid,:resposta)'
);
$stmt->bindValue(':perguntaid', $params['perguntaid']);
$stmt->bindValue(':usuarioid', $params['usuarioid']);
$stmt->bindValue(':resposta', $params['resposta']);
$stmt->execute();
?>