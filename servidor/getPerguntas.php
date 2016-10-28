<?php 
require 'config.php';

config::setHeaders();

$params = json_decode(file_get_contents('php://input'),true);

$conn = config::getConn();

if(array_key_exists("subtopicoid", $params)) {
	$stmt = $conn->prepare(
	    'SELECT id,titulo,resposta_id FROM perguntas WHERE subtopico_id = :subtopicoid'
	);

	$stmt->bindValue(':subtopicoid', $params['subtopicoid']);
} else {
	$stmt = $conn->prepare(
	    'SELECT id,titulo,resposta_id FROM perguntas WHERE usuario_id = :usuarioid'
	);

	$stmt->bindValue(':usuarioid', $params['usuarioid']);
}

$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if(count($result) > 0) {
	echo json_encode($result,JSON_NUMERIC_CHECK);
} else {
	echo 0;
}
?>