<?php 
require 'config.php';

config::setHeaders();

$params = json_decode(file_get_contents('php://input'),true);

$conn = config::getConn();

$stmt = $conn->prepare('
	SELECT v.id, v.resposta_id, v.tipo
    FROM votos v
    JOIN respostas r ON v.resposta_id = r.id
    WHERE v.usuario_id = :usuarioid AND r.pergunta_id = :perguntaid
');

$stmt->bindValue(':usuarioid', $params['usuarioid']);
$stmt->bindValue(':perguntaid', $params['perguntaid']);
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if(count($result) > 0) {
	echo json_encode($result,JSON_NUMERIC_CHECK);
} else {
	echo 0;
}
?>