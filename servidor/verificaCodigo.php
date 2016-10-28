<?php 
require 'config.php';

//Arquivo chamado quando o usuário clicar no link enviado por email para redefinir senha

$conn = config::getConn();

$stmt = $conn->prepare(
    'SELECT usuario_id FROM codigos WHERE codigo = :codigo LIMIT 1'
);

$stmt->bindValue(':codigo', $_GET['cd']);
$stmt->execute();
$row = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html>
<head>
	<title>Verificar código</title>
	<meta charset="UTF-8">
</head>
<body>
<?php
if($row != false) {
	$stmt = $conn->prepare(
    'UPDATE usuarios SET senha=:senha WHERE id=:id;DELETE FROM codigos WHERE usuario_id=:id'
	);

	$stmt->bindValue(':id', $_GET['id']);
	$stmt->bindValue(':senha', password_hash($_GET['senha'], PASSWORD_BCRYPT));
	$stmt->execute();

	echo "<span>Senha alterada!</span>";
} else {
	echo "<span style='color:red;'>Código inexistente!</span>";
}
?>
</body>
</html>
