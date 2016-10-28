<?php 
require 'config.php';

config::setHeaders();

$params = json_decode(file_get_contents('php://input'),true);

$conn = config::getConn();

if(array_key_exists("perguntaid", $params)) {
	//Arquivo pergunta
	//Primeiro selecionamos a resposta correta da pergunta(decidida pelo usuário que fez a pergunta)
	$stmt = $conn->prepare('
		SELECT r.id rid,r.resposta,u.id uid,u.nome unome,u.imagem uimagem,r.relevancia
	    FROM respostas r 
	    INNER JOIN usuarios u ON r.usuario_id = u.id
	    INNER JOIN perguntas p ON r.pergunta_id = p.id
	    WHERE r.pergunta_id = :perguntaid AND p.resposta_id = r.id
	');
	$stmt->bindValue(':perguntaid', $params['perguntaid']);
	$stmt->execute();

	//Depois retornamos as outras respostas ordenadas pela relevancia em ordem decrescente
	$stmt2 = $conn->prepare('
		SELECT r.id rid,r.resposta,u.id uid,u.nome unome,u.imagem uimagem,r.relevancia
	    FROM respostas r 
	    INNER JOIN usuarios u ON r.usuario_id = u.id
	    INNER JOIN perguntas p ON r.pergunta_id = p.id
	    WHERE r.pergunta_id = :perguntaid AND p.resposta_id != r.id
	    ORDER BY r.relevancia DESC, r.id ASC
	');

	$stmt2->bindValue(':perguntaid', $params['perguntaid']);
	$stmt2->execute();

	//Unimos os dois selects retornando um array contendo tudo
	$result = array_merge($stmt->fetchAll(PDO::FETCH_ASSOC),$stmt2->fetchAll(PDO::FETCH_ASSOC));
} else {
	//Arquivo minhas respostas
	$stmt = $conn->prepare('
	    SELECT r.id rid,r.resposta resposta,r.pergunta_id rperid,u.id uid,u.nome unome,u.imagem uimagem,r.relevancia relevancia
	    FROM respostas r 
	    INNER JOIN usuarios u ON r.usuario_id = u.id
	    WHERE u.id = :usuarioid
	    ORDER BY r.id DESC
	');

	$stmt->bindValue(':usuarioid', $params['usuarioid']);
	$stmt->execute();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

if(count($result) > 0) {
	echo json_encode($result,JSON_NUMERIC_CHECK);
} else {
	echo 0;
}
?>