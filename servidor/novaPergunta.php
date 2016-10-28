<?php 
require 'config.php';

config::setHeaders();

$params = json_decode(file_get_contents('php://input'),true);

$conn = config::getConn();

$stmt = $conn->prepare(
    'INSERT INTO perguntas (usuario_id,subtopico_id,titulo,descricao,anexo) 
    VALUES (:usuarioid,:subtopicoid,:titulo,:descricao,:anexo)'
);
$stmt->bindValue(':usuarioid', $params['usuarioid']);
$stmt->bindValue(':subtopicoid', $params['subtopicoid']);
$stmt->bindValue(':titulo', $params['titulo']);
$stmt->bindValue(':descricao', $params['descricao']);
$stmt->bindValue(':anexo', $params['anexo']);
$stmt->execute();
?>