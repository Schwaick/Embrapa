<?php 
require 'config.php';

config::setHeaders();

$params = json_decode(file_get_contents('php://input'),true);

$conn = config::getConn();

$stmt = $conn->prepare('
	UPDATE usuarios 
	SET nome = :nome, email = :email, celular = :celular, resumo_profissional = :resumo_profissional, imagem = :imagem, senha = :senha
	WHERE id = :id'
);
$stmt->bindValue(':id', $params['id']);
$stmt->bindValue(':nome', $params['nome']);
$stmt->bindValue(':email', $params['email']);
$stmt->bindValue(':celular', $params['celular']);
$stmt->bindValue(':resumo_profissional', $params['resumo_profissional']);
$stmt->bindValue(':imagem', $params['imagem']);
$stmt->bindValue(':senha', password_hash($params['nsenha'], PASSWORD_BCRYPT));
$stmt->execute();
?>