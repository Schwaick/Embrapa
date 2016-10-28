<?php 
require 'config.php';

config::setHeaders();

//retorna todos os dados POST enviados pelo app na forma de array
$params = json_decode(file_get_contents('php://input'),true);

$conn = config::getConn();

$stmt = $conn->prepare(
	'SELECT id,nome,email FROM usuarios WHERE celular = :celular LIMIT 1'
	);
$stmt->bindValue(':celular', $params['celular']);
$stmt->execute();

$row = $stmt->fetch(PDO::FETCH_ASSOC);

//Se existe o usuário
if($row != false) {
	//Gera código aleatório de tamanho 15
	$length = 15;
	$codigo = substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);

	$stmt = $conn->prepare(
	'INSERT INTO codigos(usuario_id,codigo) VALUES (:id,:codigo)'
	);
	$stmt->bindValue(':id', $row['id']);
	$stmt->bindValue(':codigo', $codigo);
	$stmt->execute();

	//Dados de configuração do email a ser enviado
	$servidor = config::$urlServidor;
	$id=$row['id'];
	$senha=$params['senha'];
	$body = "Ola {$row['nome']}, clique <a href='$servidor/verificaCodigo.php?id=$id&senha=$senha&cd=$codigo'>aqui</a> para confirmar a nova senha.";

	$mail = config::getMail();

	$mail->setFrom(config::$emailServidor, config::$aliasServidor);
	$mail->addAddress($row['email']);

	$mail->Subject = 'Senha(TROCAR PELO ASSUNTO)';
	$mail->Body = $body;
	$mail->isHTML(true);

	if(!$mail->send()) {
    	echo 0;
	} else {
	    echo 1;
	}
} else { echo -1; }
?>