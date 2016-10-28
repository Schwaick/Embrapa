<?php 
require 'config.php';

config::setHeaders();

$params = json_decode(file_get_contents('php://input'),true);

$conn = config::getConn();

if($params['tipo']=='+') {
	$stmt = $conn->prepare('
		UPDATE respostas 
		SET relevancia = relevancia + 1
		WHERE id = :respostaid'
	);
} else {
	$stmt = $conn->prepare('
		UPDATE respostas 
		SET relevancia = IF(relevancia>0,relevancia-1,0)
		WHERE id = :respostaid
	');
}

$stmt->bindValue(':respostaid', $params['respostaid']);
$stmt->execute();

if($params['comando']=='insert') {
	$stmt = $conn->prepare('
		INSERT INTO votos(usuario_id,resposta_id,tipo) 
		VALUES (:usuarioid,:respostaid,:tipo)
	');
} else {
	$stmt = $conn->prepare('
		UPDATE votos SET tipo = :tipo 
		WHERE usuario_id = :usuarioid AND resposta_id = :respostaid
	');
}

$stmt->bindValue(':usuarioid', $params['usuarioid']);
$stmt->bindValue(':respostaid', $params['respostaid']);
$stmt->bindValue(':tipo', $params['tipo']);
$stmt->execute();
?>