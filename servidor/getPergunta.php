<?php 
require 'config.php';

config::setHeaders();

//retorna todos os dados POST enviados pelo app na forma de array
$params = json_decode(file_get_contents('php://input'),true);

$conn = config::getConn();

$stmt = $conn->prepare(
    'SELECT p.id pid,p.descricao pdescricao,p.anexo panexo,p.resposta_id presposta,u.id uid,u.nome unome,u.imagem uimagem
    FROM perguntas p 
    INNER JOIN usuarios u ON p.usuario_id = u.id
    WHERE p.id = :perguntaid'
);

$stmt->bindValue(':perguntaid', $params['perguntaid']);
$stmt->execute();

//Retorna todos os dados na forma de array e depois transforma para json
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if(count($result) > 0) {
	echo json_encode($result[0],JSON_NUMERIC_CHECK);
} else {
	echo 0;
}
?>