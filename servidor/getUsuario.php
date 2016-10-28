<?php 
require 'config.php';

config::setHeaders();

$params = json_decode(file_get_contents('php://input'),true);

$conn = config::getConn();

if(array_key_exists("celular", $params)) {
	if(array_key_exists("senha", $params)) {
		//Chamado na home/login
		$stmt = $conn->prepare(
			'SELECT id,nome,email,celular,resumo_profissional,imagem,senha FROM usuarios WHERE celular = :celular LIMIT 1'
			);
		$stmt->bindValue(':celular', $params['celular']);
		$stmt->execute();

		$row = $stmt->fetch(PDO::FETCH_ASSOC);
		if($row != false) {
			if (password_verify($params['senha'],$row['senha'])) {
				echo json_encode($row,JSON_NUMERIC_CHECK);
			} else {echo 0;}
		} else { echo -1; }
	} else {
		//Chamado no cadastro de usuários
		$stmt = $conn->prepare(
		'SELECT id,nome,email,celular,resumo_profissional,imagem FROM usuarios WHERE celular = :celular LIMIT 1'
		);
		$stmt->bindValue(':celular', $params['celular']);
		$stmt->execute();

		$row = $stmt->fetch(PDO::FETCH_ASSOC);
		if($row != false) {
			echo json_encode($row,JSON_NUMERIC_CHECK);
		} else { echo 0; }
	}
} else {
	//Chamado no perfil
	$stmt = $conn->prepare(
		'SELECT id,nome,email,celular,resumo_profissional,imagem FROM usuarios WHERE id = :usuarioid LIMIT 1'
		);
	$stmt->bindValue(':usuarioid', $params['usuarioid']);
	$stmt->execute();

	$row = $stmt->fetch(PDO::FETCH_ASSOC);
	if($row != false) {
		echo json_encode($row,JSON_NUMERIC_CHECK);
	} else { echo 0; }
}
?>