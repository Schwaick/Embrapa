<?php 
require 'config.php';

config::setHeaders();

$params = json_decode(file_get_contents('php://input'),true);

$conn = config::getConn();

$stmt = $conn->prepare(
    'INSERT INTO usuarios (nome, email, celular, resumo_profissional, imagem, senha) VALUES (:nome,:email,:celular,:resumo_profissional,:imagem,:senha)'
);
$stmt->bindValue(':nome', $params['nome']);
$stmt->bindValue(':email', $params['email']);
$stmt->bindValue(':celular', $params['celular']);
$stmt->bindValue(':resumo_profissional', $params['resumo_profissional']);
$stmt->bindValue(':imagem', $params['imagem']);
$stmt->bindValue(':senha', password_hash($params['senha'], PASSWORD_BCRYPT));
$stmt->execute();
?>