<?php 
require 'config.php';

config::setHeaders();

$params = json_decode(file_get_contents('php://input'),true);

$conn = config::getConn();

$stmt = $conn->prepare('
	UPDATE perguntas 
	SET resposta_id = :respostaid
	WHERE id = :perguntaid
');

$stmt->bindValue(':respostaid', $params['respostaid']);
$stmt->bindValue(':perguntaid', $params['perguntaid']);
$stmt->execute();
?>